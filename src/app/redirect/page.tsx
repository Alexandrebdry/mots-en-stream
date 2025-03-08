'use client';
import React, {useEffect} from 'react';
import {TwitchTokenDto} from "@/lib/services/twitch/dto/twitchTokenDto";
import {useAuth} from "@/lib/store/userContext";
import {useRouter} from "next/navigation";
import {getTwitchUser, validateTwitchToken} from "@/lib/services/workers/twitchAuthService";

export default function Page() {

    const {setUserInformation, setTokenInformation} = useAuth();
    const router = useRouter();

    const getAccessToken = () => {
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            return params.get('access_token');
        }
        return null;
    };

    useEffect(() => {
       const getUser = async () => {
           const token = getAccessToken();
           if(token) {
               const validToken : TwitchTokenDto = await validateTwitchToken(token);
               if(validToken) {
                   setTokenInformation({token, ...validToken});
                   setUserInformation(await getTwitchUser(token));
                   router.push('/party')
               }
           }
       }

       getUser();

    }, []);

    return <div>Redirection en cours...</div>;
};