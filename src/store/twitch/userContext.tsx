'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {TwitchUserDto} from "@/infrastructure/twitch/dto/twitchUserDto";
import {TwitchTokenDto} from "@/infrastructure/twitch/dto/twitchTokenDto";
import Cookies from 'universal-cookie';
import {getTwitchUser, validateTwitchToken} from "@/application/auth/twitchAuthService";


const cookies = new Cookies();

type Token = {
    token: string;
} & TwitchTokenDto;

interface AuthContextType {
    getUser: () => TwitchUserDto;
    setUserInformation: (data: TwitchUserDto) => void;
    getToken: () => Token;
    setTokenInformation: (data: Token) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: { children: ReactNode }) => {

    const [user,setUser] = useState<TwitchUserDto>({} as TwitchUserDto);
    const [token, setToken] = useState<Token>({} as Token);
    const setUserInformation = (data: TwitchUserDto) : void => {
        setUser(data);
    }
    const getUser = () : TwitchUserDto =>  user;

    const setTokenInformation = (data: Token) : void => {
        setToken(data);
        cookies.set('twitch_token', data, { path: '/' });
    }

    const getToken = () : Token => token;

    return (
        <AuthContext.Provider value={{getUser, setUserInformation, getToken, setTokenInformation}}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = () => useContext(AuthContext);
