'use client';

import ButtonTwitch from "@/component/twitch/button";
import authTwitch from "@/component/twitch/auth";

export default function TwitchAuthButton () {

    return (<ButtonTwitch onClick={authTwitch} />)

}
