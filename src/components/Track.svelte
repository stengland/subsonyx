<script lang="ts">
  import ListItem from 'onyx-ui/components/list/ListItem.svelte';
  import { load, queueOne } from '../components/AudioPlayer.svelte';
  import { push } from 'svelte-spa-router';

  export let item;

  async function play() {
    load(item);
    push("/player");
  }

  async function queue() {
    queueOne(item);
    push("/player");
  }

</script>

<ListItem
  primaryText={item.title}
  secondaryText={item.artist}
  accentText={item.album}
  navi={{
    itemId: item.id,
    onSelect: async () => play(item)
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
        onSelect: queue
      },
    ],
  }}
/>
