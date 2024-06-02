import {TwitchUserDto} from "@/infrastructure/twitch/dto/twitchUserDto";
import {TwitchTokenDto} from "@/infrastructure/twitch/dto/twitchTokenDto";

export async function validateToken(token: string): Promise<TwitchTokenDto> {
    const response = await fetch('https://id.twitch.tv/oauth2/validate', {
        headers: {
            'Authorization': `OAuth ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Invalid token');
    }

    return await response.json();
}

export async function fetchTwitchUser(token: string) : Promise<TwitchUserDto> {
    const response = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || ''
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data?.data?.[0];

}