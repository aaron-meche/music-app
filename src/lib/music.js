import { writable } from 'svelte/store';
import { devtoken } from "$lib/env"

export const isAuthorized = writable(false);
export const music_instance = writable(null)

async function initializeMusicKit(developerToken, callback) {
    await MusicKit.configure({
        developerToken,
        app: {
            name: 'Music App',
            build: '1.0.0',
        },
    });

    const music = MusicKit.getInstance();
    isAuthorized.set(music.isAuthorized);
    music_instance.set(music)

    if (callback) callback(music)
    return music;
}

export async function initMusicInstance(callback) {
    await initializeMusicKit(devtoken, async (res) => {
        callback(res)
    });
}

export async function fetchAppleMusic(instance, path, callback) {
    const response = await instance.api.music(path, {
        limit: 25,
        offset: 0,
    });

    if (callback) callback(response?.data?.data || null);
}

export async function getMusicData(instance, path, input, callback) {
    const pageSize = 16
    const response = await instance.api.music(path, {
        limit: 16,
        offset: input?.page * pageSize || 0,
        include: 'tracks',
    });
    if (callback) callback(response)
    return response
}