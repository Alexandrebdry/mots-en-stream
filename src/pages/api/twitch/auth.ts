import {NextApiRequest, NextApiResponse} from "next";
import {fetchTwitchUser} from "@/lib/services/twitch/twitchApi";
import {ApiError} from "@/lib/model/api/error";
import {TwitchUserDto} from "@/lib/services/twitch/dto/twitchUserDto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            return res.status(400).json({message: 'Token is required'});
        }

        const token = authorizationHeader.split(' ')[1];

        try {
            const userData : TwitchUserDto = await fetchTwitchUser(token) ;
            res.status(200).json(userData);
        } catch (error) {
            const apiError = error as ApiError;
            res.status(400).json({message: apiError.message});
        }
    } else {
        res.status(405).json({message: 'Method not allowed'});
    }
}