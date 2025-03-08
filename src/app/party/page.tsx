'use client';

import {GameStarting} from "@/app/party/components/GameStarting";
import {InGame} from "@/app/party/components/InGame";
import {useGame} from "@/lib/store/game";

export default function Page() {

   const {hasGameStarted} = useGame();

    if(!hasGameStarted) return <GameStarting/>
    return <InGame/>;

}