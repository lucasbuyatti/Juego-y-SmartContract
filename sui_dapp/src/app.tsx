import { Theme } from "@radix-ui/themes";
import { Header } from "./components/header/Header";
import { Game } from "./components/game/game";
import { Info } from "./components/info/info";

export function App() {

  return (
    <>
      <Theme
        appearance="dark"
        accentColor="teal"
        panelBackground="translucent"
      >
        <Header />
        <Game />
        <Info />
      </Theme>
    </>

  );
}