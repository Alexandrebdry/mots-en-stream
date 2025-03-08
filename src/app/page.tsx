import TwitchAuthButton from "@/component/twitch";

export default function Home() {
  return (
    <main className="container mx-auto m-12 flex flex-col gap-8">
        <h1>Pour lancer le jeu. Veuillez-vous connecter</h1>
        <div>
            <TwitchAuthButton/>
        </div>
    </main>
  );
}
