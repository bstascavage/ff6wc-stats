window.onload = async () => {
	const fragment = new URLSearchParams(window.location.hash.slice(1));
	const [accessToken, tokenType, state] = [
		fragment.get("access_token"),
		fragment.get("token_type"),
		fragment.get("state"),
	];

	if (accessToken) {
		document.cookie = `discord_access_token=${accessToken}`;
		document.cookie = `discord_token_type=${tokenType}`;
	}

	window.location.replace(window.location.href.split("/redirect")[0]);
};
