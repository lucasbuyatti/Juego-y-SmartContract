import { Box } from "@radix-ui/themes";

export function Board() {

    return (
        <>
            {Array.from({ length: 9 }).map((_, index) => (
                <Box
                    key={index}
                    style={{
                        border: "1px solid var(--teal-8)",
                        backgroundColor: "var(--teal-5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    {index + 1}
                </Box>
            ))}
        </>
    );
}

