import { cn } from "@/lib/utils";
import React from "react";

const TitleHeroSection = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<h2 ref={ref} className={cn(className)} {...props} />
));
TitleHeroSection.displayName = "TitleHeroSection";

const DescripTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn(className)} {...props} />
));
DescripTitle.displayName = "DescripTitle";

const Static1 = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn(className)} {...props} />
));
Static1.displayName = "Static1";

const Static2 = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn(className)} {...props} />
));

Static2.displayName = "Static2";

export { Static1, Static2, DescripTitle, TitleHeroSection };
