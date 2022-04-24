<script lang="ts">
  import ListItem from 'onyx-ui/components/list/ListItem.svelte';
  import { subsonic } from '../services/subsonic';
  import { queueAndPlay, queue } from '../components/AudioPlayer.svelte';
  import { push } from 'svelte-spa-router';

  export let item;

  async function play() {
    const response = await subsonic.browsing.getAlbum(item.id);
    queueAndPlay(response.album.song);
    push("/player");
  }

  async function view() {
    const response = await subsonic.browsing.getAlbum(item.id);
    push("/albums/" + item.id);
  }

  async function queueAlbum() {
    const response = await subsonic.browsing.getAlbum(item.id);
    queue(response.album.song);
    push("/player");
  }

</script>

<ListItem
  primaryText={item.name}
  secondaryText={item.artist}
  accentText={item.year}
  navi={{
    itemId: item.id,
    onSelect: view
  }}
  contextMenu={{
    title: "Listen",
    items: [
      {
        label: 'Play',
        workingLabel: 'Working...',
        onSelect: play
      },
      {
        label: 'Queue',
        workingLabel: 'Working...',
        onSelect: queueAlbum
      },
    ],
  }}
/>
