
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { ConnectButton } from "@mysten/dapp-kit";
import "../../styles/global.css"
import { Separator } from "radix-ui";

export function HeaderComponent() {

  return (
    <Container>
      <Box>
        <Flex
          gap={"2"}
          align={"center"}
          justify={"between"}
          width="100%"
          p={"4"}
        >
          <Text
            size={"9"}
            weight={"bold"}
            color="teal"
          >
            $$$
          </Text>
          <ConnectButton connectText="Connect Wallet" />
        </Flex>

        <Separator.Root className="SeparatorRoot" />
      </Box>
    </Container>

  );
}