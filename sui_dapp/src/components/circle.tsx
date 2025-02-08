import { motion } from "framer-motion";
import { JSX } from "react";
import { teal } from "@radix-ui/colors";

export function circle(isClicked: boolean): JSX.Element | null {
    if (isClicked) {
     return (
         <motion.div
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1, rotate: 360 }}
             transition={{ duration: 0.4, ease: "easeInOut" }}
             style={{
                 width: "100px",
                 height: "100px",
                 border: `3px solid ${teal.teal8}`, 
                 borderRadius: "50%",
                 backgroundColor: "transparent", 
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
             }}
         />
     );
    } else {
     return null;
    }
 }