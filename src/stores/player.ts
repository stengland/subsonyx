import { writable } from 'svelte/store';
import type { PlaybackProgress } from '../models/PlaybackProgress';

export const player = writable<PlaybackProgress>({
  track: undefined,
  playing: false,
  currentTime: 0,
  duration: 0,
});
