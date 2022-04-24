<script lang="ts">
  import Button from 'onyx-ui/components/buttons/Button.svelte';
  import { Color } from 'onyx-ui/enums';
  import Card from 'onyx-ui/components/card/Card.svelte';
  import CardContent from 'onyx-ui/components/card/CardContent.svelte';
  import CardHeader from 'onyx-ui/components/card/CardHeader.svelte';
  import Typography from 'onyx-ui/components/Typography.svelte';
  import View from 'onyx-ui/components/view/View.svelte';
  import ViewContent from 'onyx-ui/components/view/ViewContent.svelte';
  import Artist from '../components/Artist';
  import { onMount, onDestroy } from 'svelte';
  import { subsonic } from '../services/subsonic';
  import { queueAndPlay } from '../components/AudioPlayer.svelte';

  let index = [];

  onMount(async () => {
    const response = await subsonic.browsing.getArtists();
    console.log(response);
    index = response.artists.index;
  });

</script>

<View>
  <ViewContent>
    <Card>
      <CardHeader title="Artists" />
      <CardContent>
        {#each index as item}
        <h1 class="index">{item.name}</h1>
        {#each item.artist as artist}
          <Artist {artist} />
        {/each}
        {/each}
      </CardContent>
    </Card>
  </ViewContent>
</View>


<style>
.index {
  border-top: 1px solid;
  border-bottom: 1px solid;
  font-size: 1em;
}
</style>
