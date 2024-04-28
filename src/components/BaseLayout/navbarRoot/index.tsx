import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface dataLink {
	name: string;
	url: string;
}
export interface NavbarRootProps {
	children?: React.ReactNode;
	logo?: string;
	sizeLogo?: number;
	data: dataLink[];
	className?: string;
	styleLogo?: string;
}

export const NavbarRoot = ({
	children,
	data,
	logo,
	styleLogo,
	className,
	sizeLogo,
}: NavbarRootProps) => {
	const [kontrol, setKontrol] = useState(false);
	return (
		<div
			className={`w-full text-neutral-200  py-4 flex justify-center items-center h-auto  bg-opacity-40 ${className}`}>
			<div className='flex justify-between items-center h-full w-full'>
				<div className='flex flex-row gap-2 justify-center items-center'>
					{logo && (
						<Image
							src={`${logo}`}
							alt='logo'
							width={sizeLogo}
							height={sizeLogo}
							className={`${styleLogo}`}
						/>
					)}
					<div>
						<h1 className='text-2xl font-bold'>CrotLink</h1>
						<Button
							onClick={() => {
								setKontrol(!kontrol);
							}}>
							Klik
						</Button>
					</div>
				</div>
				<div className='flex flex-row gap-5 justify-center items-center'>
					{kontrol && <div>awodkoakdoaaowdkoa</div>}
					{data.map((item, index) => {
						return (
							<Link key={index} href={item.url}>
								{item.name}
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};
