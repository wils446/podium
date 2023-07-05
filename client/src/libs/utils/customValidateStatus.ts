export const customValidateStatus = (response: Response) => {
	if (response.status === 401 && typeof window === "undefined") return true;

	if (response.status >= 500) return false;
	return true;
};
