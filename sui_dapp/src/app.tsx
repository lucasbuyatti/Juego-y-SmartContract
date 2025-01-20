import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Text, Theme } from "@radix-ui/themes";
import { Header } from "./components/header/Header";
import { GameTaTeTi } from "./components/game/game";


export function App() {

  return (
    <>
      <Theme 
      appearance="dark" 
      accentColor="violet"
      panelBackground="translucent"
      >
        <Header/>
        <GameTaTeTi/>

      </Theme>
    </>

  );
}