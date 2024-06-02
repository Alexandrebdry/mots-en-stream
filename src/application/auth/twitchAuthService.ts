import {fetchTwitchUser, validateToken} from "@/infrastructure/twitch/twitchApi";

export async function getTwitchUser(token: string) {
    return await fetchTwitchUser(token);
}

export async function validateTwitchToken(token: string) {
    return await validateToken(token);
}

