import TwitchAuthButton from "@/component/twitch";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TwitchAuthButton/>
    </main>
  );
}
