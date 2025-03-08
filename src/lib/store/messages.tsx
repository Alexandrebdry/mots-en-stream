'use client';
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {parseMessage, TwtichMessage} from "@/lib/services/twitch/twtichMessage";
import {useRouter} from "next/navigation";
import {useAuth} from "@/lib/store/userContext";
import {TwitchUserDto} from "@/lib/services/twitch/dto/twitchUserDto";

type MessageContextType = {
    messages: TwtichMessage[];
}

const MessageContext = createContext<MessageContextType>({} as MessageContextType);

export function MessageProvider({children}: { children: ReactNode }) {

    const router = useRouter();

    const { getUser, getToken } = useAuth();
    const user: TwitchUserDto = getUser();
    const {token} = getToken();

    const [messages, setMessages] = useState<TwtichMessage[]>([]);



    useEffect(() => {

        if(!user?.login && !token) router.push('/');

        const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
        socket.onopen = () => {
            console.log('Connected to Twitch chat');
            socket.send(`PASS oauth:${token}`);
            socket.send(`NICK ${user.login}`);
            socket.send(`JOIN #${user.login}`);

        };

        socket.onmessage = (event) => {
            const message = parseMessage(event.data);
            setMessages(prevMessages => [...prevMessages, message]);
        };


        socket.onclose = () => {
            console.log('Disconnected from Twitch chat');
        };

        return () => {
            socket.close();
        };

    }, [router, token, user.login]);

    return (
        <MessageContext.Provider value={{messages}}>
            {children}
        </MessageContext.Provider>
    )
}

export const useMessages = () => useContext(MessageContext);