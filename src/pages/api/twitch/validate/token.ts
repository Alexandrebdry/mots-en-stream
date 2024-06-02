import type { NextApiRequest, NextApiResponse } from 'next';

import {ApiError} from "@/model/api/error";
import {validateTwitchToken} from "@/application/auth/twitchAuthService";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({message: 'Token is required' });
        }

        try {
            const validationData = await validateTwitchToken(token);
            res.status(200).json(validationData);
        } catch (error) {
            const apiError = error as ApiError;
            res.status(400).json({message: apiError.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}