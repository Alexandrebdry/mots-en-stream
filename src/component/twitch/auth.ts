export default function authTwitch () {

    const redirectURI = 'http://localhost:3000/redirect';
    const responseType = 'token';
    const scopes = 'chat:read';

    window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=${responseType}&scope=${encodeURIComponent(scopes)}`;
}