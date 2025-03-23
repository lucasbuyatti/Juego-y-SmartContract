import { Theme } from "@radix-ui/themes";
import { HeaderComponent } from "./components/HeaderComponent";
import { GameComponent } from "./components/GameComponent";
import { DataListComponent } from "./components/DataListComponent";


export function App() {
  return (
    <>
      <Theme 
      appearance="dark" 
      accentColor="teal"
      panelBackground="translucent"
      >
        <HeaderComponent/>
        <GameComponent/>
        <DataListComponent/>
      </Theme>
    </>

  );
}