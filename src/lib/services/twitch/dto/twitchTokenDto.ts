export interface TwitchTokenDto {
    client_id: string;
    login: string;
    scopes: string[];
    user_id: string;
    expires_in: number;
}