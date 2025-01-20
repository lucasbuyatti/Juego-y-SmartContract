
import { Box, Text, Theme } from "@radix-ui/themes";
import { ConnectButton } from "@mysten/dapp-kit";

export function Header() {

  // const [balance, setBalance] = useState<number | null>(null);
  // const currentAccount = useCurrentAccount();
  // const suiClient = new SuiClient({ url: getFullnodeUrl("devnet") });
  // const getBalanceByOwner = async () => {
  //   try {
  //     const balance = await suiClient.getBalance({ owner: currentAccount == null ? "" : currentAccount.address.toString() });
  //     setBalance(balance.coinObjectCount);
  //   } catch (error) {
  //     console.error("Error fetching balance:", error);
  //     setBalance(null);
  //   }
  // };
  // useEffect(() => {
  //   getBalanceByOwner();
  //   const interval = setInterval(() => {
  //     getBalanceByOwner();
  //   }, 60000);
  //   return () => clearInterval(interval);
  // });
  

  return (
   

    
    <Box
      style={{
        width: "100%",
        height: "12vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "2rem",
        padding: "0 5vh",
        borderBottom: "1px solid white",
      }}
    >
      <Text
        size={"9"}
        style={{
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        $$$
      </Text>

      <ConnectButton connectText="Connect Wallet" />
    </Box>

      
      /* <Box
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
      </Box> */

  );
}