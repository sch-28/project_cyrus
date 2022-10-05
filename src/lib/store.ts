// from https://stackoverflow.com/a/68785061
import { browser } from '$app/env';
import type { Detail_Response } from 'src/routes/property/[filter]/[ref]/detail_api';
import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';

const storage = <T>(key: string, initValue: T): Writable<T> => {
	const store = writable(initValue);
	if (!browser) return store;

	const storedValueStr = localStorage.getItem(key);
	if (storedValueStr != null) store.set(JSON.parse(storedValueStr));

	store.subscribe((val) => {
		if (val == null || val == undefined) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(val));
		}
	});

	window.addEventListener('storage', () => {
		const storedValueStr = localStorage.getItem(key);
		if (storedValueStr == null) return;

		const localValue: T = JSON.parse(storedValueStr);
		if (localValue !== get(store)) store.set(localValue);
	});

	return store;
};

export default storage;

export interface Favorites {
	favorites: { ref: string; results: Detail_Response; filter: string }[];
}

export const favorites = storage<Favorites>('favorites', { favorites: [] });
