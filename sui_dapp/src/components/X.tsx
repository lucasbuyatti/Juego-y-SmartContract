import { motion } from "framer-motion";
import { JSX } from "react";
import { teal } from "@radix-ui/colors";

export function Ex(): JSX.Element | null {

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
                width: "100px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
            }}
        >
            <svg
                width="80%"
                height="80%"
                viewBox="0 0 100 100"
                style={{ overflow: 'visible' }} // Para evitar recortar los bordes
            >
                <motion.line
                    x1="10" y1="10"
                    x2="90" y2="90"
                    stroke={teal.teal8}
                    strokeWidth="8"
                    strokeLinecap="butt" // Extremos planos
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.1
                    }}
                />
                
                <motion.line
                    x1="10" y1="90"
                    x2="90" y2="10"
                    stroke={teal.teal8}
                    strokeWidth="8"
                    strokeLinecap="butt" // Extremos planos
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.2
                    }}
                />
            </svg>
        </motion.div>
    );
}