import { writable } from 'svelte/store';

export const playlist = writable({entry:[]});

export const history = writable([]);

history.subscribe(value => {
	console.log(value);
}); // logs '0'

playlist.subscribe(value => {
	console.log(value);
}); // logs '0'
