import React from "react";
import { Avatar, AvatarGroup, Tooltip } from "@nextui-org/react";
import { cn } from "@/lib/utils";

interface data {
	link: string;
	posisi: string;
	name: string;
	avatar: string;
}

interface AvatarGroupProps {
	data?: data[];
	className?: string;
}

export const AvatarGroupComp = ({ data, className }: AvatarGroupProps) => {
	const handleButtonLink = (link: string) => {
		window.open(link as string, "_blank");
	};
	return (
		<AvatarGroup
			className={cn(className, "w-full h-full z-[200] gap-5 flex  text-white")}>
			{data &&
				data.map((avatar, index) => {
					return (
						<Tooltip
							key={index}
							showArrow
							placement='right'
							content='I am a tooltip'
							classNames={{
								base: ["before:bg-neutral-400 dark:before:bg-white z-[201]"],

								content: [
									"py-2 px-4 shadow-xl z-[201]",
									"text-black z-[201] bg-gradient-to-br from-white to-neutral-400",
									"z-[201]",
								],
							}}>
							<Avatar
								className={cn(className, "z-[201]")}
								onClick={() => {
									handleButtonLink;
								}}
								src='https://4.bp.blogspot.com/-y255IxGZwvA/UAQ2JzUsawI/AAAAAAAAAW4/y4sUQoHtPZk/s1600/Wallpaper+pemandangan+air+terjun.jpg'
							/>
						</Tooltip>
					);
				})}
		</AvatarGroup>
	);
};
