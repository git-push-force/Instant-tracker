export const getScreenSize = (): { width: number; height: number } => {
	return {
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	};
};
