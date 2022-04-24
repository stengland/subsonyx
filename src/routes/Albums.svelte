<script lang="ts">
  import Button from 'onyx-ui/components/buttons/Button.svelte';
  import { Color } from 'onyx-ui/enums';
  import Card from 'onyx-ui/components/card/Card.svelte';
  import CardContent from 'onyx-ui/components/card/CardContent.svelte';
  import CardHeader from 'onyx-ui/components/card/CardHeader.svelte';
  import Typography from 'onyx-ui/components/Typography.svelte';
  import View from 'onyx-ui/components/view/View.svelte';
  import ViewContent from 'onyx-ui/components/view/ViewContent.svelte';
  import Album from '../components/Album';
  import { onMount, onDestroy } from 'svelte';
  import { subsonic } from '../services/subsonic';
  import { queueAndPlay } from '../components/AudioPlayer.svelte';

  let album = [];

  onMount(async () => {
    const response = await subsonic.browsing.getAlbumList({type: "newest"});
    console.log(response);
    album = response.albumList.album;
  });

</script>

<View>
  <ViewContent>
    <Card>
      <CardHeader title="Album" />
      <CardContent>
        {#each album as item}
          <Album {item} />
        {/each}
      </CardContent>
    </Card>
  </ViewContent>
</View>
