import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HelperUseParams } from "@/lib/helper/updateParams";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface DataDomain {
	domain: string;
}

export interface comboBox {
	data: DataDomain[];
}

export const ComboboxInput = ({ data }: comboBox) => {
	const addDomainQuery = HelperUseParams();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const SearchDomain = searchParams.get("domain");
	const [dataDomain, setDataDomain] = useState(data);
	const [selected, setSelected] = useState("");

	const handleAddNewDomain = () => {
		const newDomain = SearchDomain as string;
		setDataDomain([...dataDomain, { domain: newDomain }]);
	};
	console.log(dataDomain);
	useEffect(() => {
		dataDomain;
	}, []);

	const filteredDomain =
		SearchDomain === null
			? dataDomain
			: dataDomain.filter((data) =>
					data.domain
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(SearchDomain.toLowerCase().replace(/\s+/g, ""))
			  );

	console.log(selected);
	return (
		<div className='fixed top-16 w-72'>
			<Combobox value={selected} onChange={setSelected}>
				<div className='relative mt-1'>
					<div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
						<Combobox.Input
							className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
							displayValue={(domain: any) => domain.domain}
							onChange={(e) => {
								router.push(
									`${pathname}?${addDomainQuery("domain", e.target.value)}`
								);
							}}
						/>
						<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'></Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
							{filteredDomain.length === 0 ? (
								<>
									<div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
										Nothing found.
									</div>
									<Button onClick={() => handleAddNewDomain()}>
										Tambahkan Domain
									</Button>
								</>
							) : (
								filteredDomain.map((person, index) => (
									<Combobox.Option
										key={index}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-teal-600 text-white" : "text-gray-900"
											}`
										}
										value={person}>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}>
													{person.domain}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? "text-white" : "text-teal-600"
														}`}>
														d awd
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
};
