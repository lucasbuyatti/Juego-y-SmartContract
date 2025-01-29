import React from "react";
import ReactDOM from "react-dom/client";
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from "./app";
import { tealTheme } from "./styles/theme";
import "./styles/global.css";
import "@mysten/dapp-kit/dist/index.css";
import "@radix-ui/themes/styles.css";
import { actualNode, networkConfig } from "./components/utils/suiconfig";
import { SocketProvider } from "./components/utils/socket";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={actualNode}>
        <WalletProvider autoConnect={true} theme={tealTheme}>
          <SocketProvider>
            <App />
          </SocketProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);