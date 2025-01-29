import { Box, Button, Container, Flex, Grid } from "@radix-ui/themes";

export function Game() {

  return (

    <Container mt={"4"} mb={"9"}>
      <Container m={"3"} mb={"6"}>
        <Flex align={"center"} justify={"center"} gap={"2"}>
          <Button color="teal" >Play</Button>
        </Flex>
      </Container>
      <Grid columns="repeat(3, 8rem)" rows="repeat(3, minmax(8rem, auto))" gap="2" width="auto" justify={"center"} >

        <Box style={{ border: "1px solid var(--teal-8)", backgroundColor: "var(--teal-5)" }}></Box>
        <Box style={{ border: "1px solid var(--teal-8)", backgroundColor: "var(--teal-5)" }}></Box>
        <Box style={{ border: "1px solid var(--teal-8)", backgroundColor: "var(--teal-5)" }}></Box>
        <Box style={{ border: "1px solid var(--teal-8)", backgroundColor: "var(--teal-5)" }}></Box>
        <Box style={{ border: "1px solid var(--teal-8)", backgroundColor: "var(--teal-5)" }}></Box>
        <Box style={{ border: "1px solid var(--teal-8)", backgroundColor: "var(--teal-5)" }}></Box>
        <Box style={{ border: "1px solid var(--teal-8)", backgroundColor: "var(--teal-5)" }}></Box>
        <Box style={{ border: "1px solid var(--teal-8)", backgroundColor: "var(--teal-5)" }}></Box>
        <Box style={{ border: "1px solid var(--teal-8)", backgroundColor: "var(--teal-5)" }}></Box>
      </Grid>
    </Container>
  );
}