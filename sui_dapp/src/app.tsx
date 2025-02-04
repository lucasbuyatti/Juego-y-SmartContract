import { Theme } from "@radix-ui/themes";
import { HeaderComponent } from "./components/header/headerComponent";
import { GameComponent } from "./components/game/gameComponent";
import { DataListComponent } from "./components/datalist/dataListComponent";

export function App() {

  return (

    <Theme
      appearance="dark"
      accentColor="teal"
      panelBackground="translucent"
    >
      
        <HeaderComponent />
        <GameComponent />
        <DataListComponent />
    </Theme>

  );
}