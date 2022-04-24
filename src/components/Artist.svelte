<script lang="ts">
  import ListItem from 'onyx-ui/components/list/ListItem.svelte';
  import { push } from 'svelte-spa-router';

  export let artist;

  async function view() {
    push("/artist/" + artist.id);
  }

</script>


<ListItem
  primaryText={artist.name}
  navi={{
    itemId: artist.id,
    onSelect: view
  }}
/>


