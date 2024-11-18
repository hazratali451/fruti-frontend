import { useEffect, useState } from "react";

const useScreen = () => {
	const [screen, setScreen] = useState(0);

	useEffect(() => {
		const updateScreen = () => {
			setScreen(window.innerWidth);
		};
		window.addEventListener("resize", updateScreen);
		updateScreen();
		return () => window.removeEventListener("resize", updateScreen);
	}, []);

	return screen;
};

export default useScreen;
