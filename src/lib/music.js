import { writable } from 'svelte/store';

export const musickitInstance = writable(null);
export const isAuthorized = writable(false);

export async function initializeMusicKit(developerToken) {
    await MusicKit.configure({
        developerToken,
        app: {
            name: 'Music App',
            build: '1.0.0',
        },
    });

    const music = MusicKit.getInstance();
    musickitInstance.set(music);
    isAuthorized.set(music.isAuthorized);

    return music;
}