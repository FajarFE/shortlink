import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLMotionProps<"div"> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
	({ className, ...props }, ref) => (
		<motion.div
			ref={ref}
			initial={{
				x: 100,
			}}
			whileInView={{
				x: -0,
			}}
			transition={{
				type: "spring",
				delay: 0.3,
			}}
			className={cn(className)}
			{...props}
		/>
	)
);

Container.displayName = "Container";

export { Container };
