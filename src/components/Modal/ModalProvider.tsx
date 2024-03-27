"use client";
"use client";

import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
} from "react";
import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import { ReactNode, createContext, useContext, useState } from "react";

interface ModalContextProps {
	show: (content: ReactNode) => void;
	hide: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
	const [modalContent, setModalContent] = useState<ReactNode | null>(null);
	const [showModal, setShowModal] = useState(false);

	const show = (content: ReactNode) => {
		setModalContent(content);
		setShowModal(true);
	};

	const hide = () => {
		setShowModal(false);
		setTimeout(() => {
			setModalContent(null);
		}, 300); // Adjust this timeout as per your transition duration
	};

	return (
		<ModalContext.Provider value={{ show, hide }}>
			{children}
			{showModal && (
				<Modal showModal={showModal} setShowModal={setShowModal}>
					{modalContent}
				</Modal>
			)}
		</ModalContext.Provider>
	);
}

export function useModal() {
	return useContext(ModalContext);
}

export default function Modal({
	children,
	showModal,
	setShowModal,
}: {
	children: React.ReactNode;
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
	const desktopModalRef = useRef(null);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setShowModal(false);
			}
		},
		[setShowModal]
	);

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [onKeyDown]);

	const { isMobile, isDesktop } = useWindowSize();

	return (
		<AnimatePresence>
			{showModal && (
				<>
					{isMobile && <Leaflet setShow={setShowModal}>{children}</Leaflet>}
					{isDesktop && (
						<>
							<FocusTrap focusTrapOptions={{ initialFocus: false }}>
								<motion.div
									ref={desktopModalRef}
									key='desktop-modal'
									className='fixed inset-0 z-40 hidden min-h-screen items-center justify-center md:flex'
									initial={{ scale: 0.95 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0.95 }}
									onMouseDown={(e) => {
										if (desktopModalRef.current === e.target) {
											setShowModal(false);
										}
									}}>
									{children}
								</motion.div>
							</FocusTrap>
							<motion.div
								key='desktop-backdrop'
								className='fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={() => setShowModal(false)}
							/>
						</>
					)}
				</>
			)}
		</AnimatePresence>
	);
}

export function useWindowSize() {
	const [windowSize, setWindowSize] = useState<{
		width: number | undefined;
		height: number | undefined;
	}>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		// Add event listener
		window.addEventListener("resize", handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount

	return {
		windowSize,
		isMobile: typeof windowSize?.width === "number" && windowSize?.width < 768,
		isDesktop:
			typeof windowSize?.width === "number" && windowSize?.width >= 768,
	};
}

export function Leaflet({
	setShow,
	children,
}: {
	setShow: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
}) {
	const leafletRef = useRef<HTMLDivElement>(null);
	const controls = useAnimation();
	const transitionProps = { type: "spring", stiffness: 500, damping: 30 };
	useEffect(() => {
		controls.start({
			y: 20,
			transition: transitionProps,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function handleDragEnd(_: any, info: any) {
		const offset = info.offset.y;
		const velocity = info.velocity.y;
		const height = leafletRef.current?.getBoundingClientRect().height || 0;
		if (offset > height / 2 || velocity > 800) {
			await controls.start({ y: "100%", transition: transitionProps });
			setShow(false);
		} else {
			controls.start({ y: 0, transition: transitionProps });
		}
	}

	return (
		<AnimatePresence>
			<motion.div
				ref={leafletRef}
				key='leaflet'
				className='group fixed inset-x-0 bottom-0 z-40 w-screen cursor-grab bg-white pb-5 active:cursor-grabbing sm:hidden'
				initial={{ y: "100%" }}
				animate={controls}
				exit={{ y: "100%" }}
				transition={transitionProps}
				drag='y'
				dragDirectionLock
				onDragEnd={handleDragEnd}
				dragElastic={{ top: 0, bottom: 1 }}
				dragConstraints={{ top: 0, bottom: 0 }}>
				<div
					className={`rounded-t-4xl -mb-1 flex h-7 w-full items-center justify-center border-t border-gray-200`}>
					<div className='-mr-1 h-1 w-6 rounded-full bg-gray-300 transition-all group-active:rotate-12' />
					<div className='h-1 w-6 rounded-full bg-gray-300 transition-all group-active:-rotate-12' />
				</div>
				{children}
			</motion.div>
			<motion.div
				key='leaflet-backdrop'
				className='fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={() => setShow(false)}
			/>
		</AnimatePresence>
	);
}
