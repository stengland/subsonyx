<script lang="ts">
  import Button from 'onyx-ui/components/buttons/Button.svelte';
  import { Color } from 'onyx-ui/enums';
  import Card from 'onyx-ui/components/card/Card.svelte';
  import CardContent from 'onyx-ui/components/card/CardContent.svelte';
  import CardHeader from 'onyx-ui/components/card/CardHeader.svelte';
  import Typography from 'onyx-ui/components/Typography.svelte';
  import View from 'onyx-ui/components/view/View.svelte';
  import ViewContent from 'onyx-ui/components/view/ViewContent.svelte';
  import Track from '../components/Track';
  import { onMount, onDestroy } from 'svelte';
  import { subsonic } from '../services/subsonic';
  import { queueAndPlay, queue } from '../components/AudioPlayer.svelte';
  import { push } from 'svelte-spa-router';

  export let params;
  let album;

  onMount(async () => {
    const response = await subsonic.browsing.getAlbum(params.albumId);
    console.log(response);
    album = response.album;
  });

  function play() {
    queueAndPlay(album.song);
    push("/player");
  }

  function queueAlbum() {
    queue(album.song);
    push("/player");
  }

</script>

<View>
  <ViewContent>
    <Card>
      <CardHeader title="Album" />
      {#if album}
      <CardContent>
        <Typography type="title" padding="horizontal" align="center">{album.name}</Typography>
        <Typography type="titleSmall" align="center">{album.artist}</Typography>
        <Typography type="caption" align="center">{album.year}</Typography>
          <Button
            title="Play"
            color={Color.Primary}
            navi={{
              itemId: `primary`,
              onSelect: play,
            }}
          />
          <Button
            title="Queue"
            navi={{
              itemId: `secondary`,
              onSelect: queueAlbum,
            }}
          />
        {#each album.song as item}
          <Track {item} />
        {/each}
      </CardContent>
      {/if}
    </Card>
  </ViewContent>
</View>
