<script lang="ts">
  import OnyxApp from 'onyx-ui/components/app/OnyxApp.svelte';
  import { Priority } from 'onyx-ui/enums';
  import { KeyManager, Onyx } from 'onyx-ui/services';
  import Router, { location, pop } from 'svelte-spa-router';
  import Dashboard from 'onyx-ui/components/app/Dashboard.svelte';
  import AppMenu from './components/AppMenu.svelte';
  import Player from './routes/Player.svelte';
  import Album from './routes/Album.svelte';
  import Albums from './routes/Albums.svelte';
  import Artist from './routes/Artist.svelte';
  import Artists from './routes/Artists.svelte';
  import Redirect from './routes/Redirect.svelte';
  import AppSettings from './routes/AppSettings.svelte';
  import { settings } from './stores/settings';

  const routes = {
    '/player': Player,
    '/albums': Albums,
    '/albums/:albumId': Album,
    '/artists': Artists,
    '/artist/:artistId': Artist,
    '/settings/:cardId': AppSettings,
    '*': Redirect,
  };

  // TODO: Fix this in a better way
  document.addEventListener('keydown', (ev) => {
    if (
      ev.key === 'Backspace' &&
      $location !== '/player' &&
      (ev.target as any).contentEditable !== 'true'
    ) {
      ev.preventDefault();
    }
  });

  const keyMan = KeyManager.subscribe(
    {
      onBackspace: () => {
        // If on the main screen, let KaiOS minimize the app
        if ($location === '/player') {
          console.log('exit app');
          return false;
        } else {
          pop();
          return true;
        }
      },
    },
  );

  $: Onyx.settings.update($settings);

</script>

<OnyxApp>
  <AppMenu slot="app-menu" />
  <Router {routes} />
    <Dashboard slot="dashboard">
      <div class="footer">
        <div>Menu</div>
        <div>Player</div>
        <div>Options</div>
      </div>
    </Dashboard>
</OnyxApp>
<style>
  .footer {
    display: flex;
    padding: 5px;
    text-align: center;
    font-weight: var(--bold-font-weight);
    flex-shrink: 0;
  }
  .footer > div {
    flex: 1;
  }
  .footer > div:first-child {
    text-align: left;
  }
  .footer > div:last-child {
    text-align: right;
  }
</style>
