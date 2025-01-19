import { useEffect, useState } from "react";
import { Box, Button, Text, Theme } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

const suiClient = new SuiClient({url: getFullnodeUrl("devnet")});

export function Header() {
  const [actualAppereance, setActualAppereance] = useState<"dark" | "light">("dark");

  const toggleAppearance = () => {
    setActualAppereance(actualAppereance === "dark" ? "light" : "dark");
  };

  const [balance, setBalance] = useState<number | null>(null);
  const currentAccount = useCurrentAccount();

  const getBalanceByOwner = async () => {
    try {
      const balance = await suiClient.getBalance({ owner: currentAccount == null ? "" : currentAccount.address.toString() });
      setBalance(balance.coinObjectCount);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(null);
    }
  };

  

  useEffect(() => {
    getBalanceByOwner();
    const interval = setInterval(() => {
      getBalanceByOwner();
    }, 60000);
    return () => clearInterval(interval);
  });

  return (
    <Theme appearance={actualAppereance}>

      <Box
        style=
        {{
          width: "100%",
          height: "12vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "2rem",
          padding: "0 5vh",
        }}
      >
        <Text
          size={"9"}
          style=
          {{
            fontWeight: "bold",
            //color: currWallet.isConnected === true ? "" : actualAppereance === "dark" ? "" : "#1c2024",
          }}>
          $$$
        </Text>

        <ConnectButton
          connectText="Connect Wallet"
          style=
          {{
            backgroundColor: actualAppereance === "dark" ? "" : "#1c2024",
            color: actualAppereance === "dark" ? "#000" : "#fff",
          }} />
        <Button
          onClick={toggleAppearance}
          size={"4"}
          style=
          {{
            backgroundColor: actualAppereance === "dark" ? "#f0f2f5" : "#1c2024",
            color: actualAppereance === "dark" ? "#000" : "#fff"
          }}>
          {actualAppereance === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Box>

      <Box
  style={{
    display: "flex",
    justifyContent: "center",
  }}
>
  <Box
    style={{
      width: "60%",
      height: "100%",
      display: "inline-grid",
      padding: "0.5rem",
      alignItems: "left",
      justifyContent: "center",
    }}
  >
    <Box
      style={{
        padding: "0.5rem",
      }}
    >
      <Text>Current Balance: {balance !== null ? balance : 'Loading...'}</Text>
    </Box>
  </Box>
</Box>

    </Theme>
  );
}