<script lang="ts">
  import { settings } from '../stores/settings';
  import Button from 'onyx-ui/components/buttons/Button.svelte';
  import Card from 'onyx-ui/components/card/Card.svelte';
  import CardContent from 'onyx-ui/components/card/CardContent.svelte';
  import CardHeader from 'onyx-ui/components/card/CardHeader.svelte';
  import Typography from 'onyx-ui/components/Typography.svelte';
  import View from 'onyx-ui/components/view/View.svelte';
  import ViewContent from 'onyx-ui/components/view/ViewContent.svelte';
  import Track from '../components/Track';
  import { KeyManager } from 'onyx-ui/services';
  import { KaiOS } from '../services/kaios';
  import { player } from '../stores/player';
  import { play, pause, next, prev } from '../components/AudioPlayer.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { subsonic } from '../services/subsonic';
  import { playlist } from '../stores/playlist';

  let keyMan = KeyManager.subscribe(
    {
      onArrowUpLong: () => KaiOS.system.volumeUp(),
      onArrowDownLong: () => KaiOS.system.volumeDown(),
      onArrowRight: () => next(),
      onArrowLeft: () => prev(),
      onEnter: () => ($player.playing ? pause() : play()),
    }
  );

  onDestroy(() => keyMan.unsubscribe());

  function formatTime(rawSeconds) {
    let isNegative = false;
    if (rawSeconds < 0) {
        isNegative = true;
        rawSeconds = Math.abs(rawSeconds);
    }
    const hours = Math.floor(rawSeconds / 60 / 60);
    const minutes = Math.floor((rawSeconds / 60) % 60);
    const seconds = Math.floor(rawSeconds % 60);
    let time = '';
    time += hours > 0 ? hours.toString() + ':' : '';
    time +=
        hours > 0
            ? minutes.toString().padStart(2, '0') + ':'
            : minutes.toString() + ':';
    time += seconds.toString().padStart(2, '0');
    return isNegative ? `-${time}` : time;
  }

</script>

<View>
  <ViewContent>
    <Card>
      <CardHeader title="Player"/>
      <CardContent>
      {#if $player.track }
      <Typography type="title" padding="horizontal" align="center">{$player.track.title}</Typography>
      <Typography type="titleSmall" align="center">{$player.track.artist}</Typography>
      <Typography type="caption" align="center">{$player.track.album}</Typography>
      <Typography type="bodyLarge" align="center">{formatTime($player.currentTime)} / {formatTime($player.duration)}</Typography>
      {/if}
      <Typography type="title" padding="horizontal" align="center">Playist</Typography>
      {#each $playlist.entry as item}
        <Track {item} />
      {/each}
      </CardContent>
    </Card>
  </ViewContent>
</View>
