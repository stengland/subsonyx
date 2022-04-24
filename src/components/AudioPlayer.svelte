<script context="module" lang="ts">
  import type { PlaybackProgress } from '../models/PlaybackProgress';
  import { player } from '../stores/player';
  import { playlist, history, current } from '../stores/playlist';
  import { subsonic } from '../services/subsonic';

  let audio = new Audio();
  (audio as any).mozAudioChannelType = 'content';

  audio.ontimeupdate = () => {
    updateStatus({
      currentTime: audio.currentTime,
    });
  };

  audio.onended = () => {
    next();
  };

  export async function load(track: object) {
    history.update(h => {
      return h.concat([track]);
    });
    const stream = subsonic.media.stream({
      id: track.id,
      format: 'opus'
    })

    audio.src = stream;
    audio.currentTime = 0;

    player.set({
      track,
      currentTime: 0,
      duration: track.duration || 0,
      playing: true,
    });

    audio.play();
  }

  export function play() {
    audio.play();
    updateStatus({ playing: true });
  }

  export function queueAndPlay(tracks: []) {
    playlist.update(q => {
      q.entry = [...tracks];
      return q;
    });
    next();
  }


  export function queue(tracks: []) {
    playlist.update(q => {
      q.entry = q.entry.concat([...tracks]);
      return q;
    });
  }

  export function queueOne(track: {}) {
    queue([track]);
  }

  export function pause() {
    audio.pause();
    updateStatus({ playing: false });
  }

  export function stop() {
    audio.src = '';
    audio.currentTime = 0;
    player.set({
      track: undefined,
      playing: false,
      currentTime: 0,
      duration: 0,
    });
  }

  export function skip(seconds: number) {
    const newTime = clamp(audio.currentTime + seconds, 0, audio.duration);
    audio.currentTime = audio.currentTime + seconds;
    updateStatus({ currentTime: newTime });
  }

  export function next() {
    playlist.update(q => {
      let nextTrack = q.entry.shift()
      if (nextTrack) {
        load(nextTrack);
      }
      if (q[0]) {
        let preload = new Audio();
        preload.preload = "auto";
        preload.src = subsonic.media.stream({
          id: q[0].id,
          format: 'opus'
        })
      }
      return q;
    });
  }

  export function prev() {
    history.update(h => {
      let curTrack = h.pop();
      let prevTrack = h[h.length -1]
      console.log(prevTrack);
      playlist.update(q => {
        q.entry = [curTrack].concat(q.entry);
        return q;
      });
      if (prevTrack) {
        load(prevTrack);
      } else {
        stop();
      }
      return h;
    });
  }

  function updateStatus(changes: Partial<PlaybackProgress>) {
    player.update((a) => ({
      ...a,
      ...changes,
    }));
  }
</script>
