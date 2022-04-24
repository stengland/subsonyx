import * as Subsonic from "subsonicjs"
import { settings } from '../stores/settings';
import { playlist, history } from '../stores/playlist';
import md5 from "md5"
import { get } from 'svelte/store';
import { Onyx } from 'onyx-ui/services';
import { push } from 'svelte-spa-router';

export let subsonic;

export async function updateServer() {
    const value = get(settings);
    const salt = Math.random();
    const token = md5(value.password+salt);

    if (value.server && value.username && value.password) {
        subsonic = Subsonic(value.username, token, salt, value.server)

        const pingServer = await subsonic.system.ping();
        console.log(pingServer);

        if (pingServer.status != "ok") {
            serverError(pingServer.error.message);
        } else {
            const q = await subsonic.playqueue.getPlayQueue();
            playlist.set(q.playQueue);
            playlist.subscribe(updateServerPlayQueue);
        }
    } else {
        serverError("Please input your server details");
    }
}

function serverError(err: string) {
    Onyx.alert.show({
        title: 'Server Error',
        body: err,
        actions: {
            center: { label: 'OK', fn: () => push('/settings/server') },
        },
    })
}

function updateServerPlayQueue(playlist) {
    let h = get(history);
    let current = h.slice(-1);
    subsonic.playqueue.savePlayQueue({
        id: current.concat(playlist.entry).map(t => t.id).join(','),
    });
}

updateServer();

