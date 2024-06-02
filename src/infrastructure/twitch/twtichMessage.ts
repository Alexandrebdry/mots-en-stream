
export type TwtichMessage = {
    message: string;
    author: string;
}

export function parseMessage  (message:string)  {

    const splitMessage = message.split('!');

    return {
        author: splitMessage[0].substring(1),
        message: splitMessage?.[1]?.split(':')?.[1]?.trim()
    }

}