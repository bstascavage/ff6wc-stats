var globalElemToHide = [
	{
		class: "navigation",
		display: "inline",
	},
	{
		class: "page-content",
		display: "inline",
	},
	{
		class: "site-footer",
		display: "block",
	},
];

async function parseDiscordCallback() {
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
	discordAccessToken = getCookieValue("discord_access_token");
	discordTokenType = getCookieValue("discord_token_type");

	var login_button_text = "Login";
	// var login_button_link =
	// 	"https://discord.com/api/oauth2/authorize?client_id=994734074704957602&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fredirect&response_type=token&scope=identify%20email";

	var login_button_link =
		"https://discord.com/api/oauth2/authorize?client_id=994734074704957602&redirect_uri=https%3A%2F%2Fsetokiaba.com%2Fredirect&response_type=token&scope=identify%20email";
	if (discordAccessToken) {
		const userdata = await getDiscordUserInfo(
			discordAccessToken,
			discordTokenType
		);
		login_button_text = userdata.username;
		login_button_link = "/stats";
	}

	document.getElementById("discord-login").innerHTML = login_button_text;
	document.getElementById("discord-login").href = login_button_link;

	// if (!accessToken) {
	// 	const randomString = generateRandomString();
	// 	localStorage.setItem('oauth-state', randomString);

	// 	document.getElementById('login').href += `& state=${ btoa(randomString) } `;
	// 	return (document.getElementById('login').style.display = 'block');
	// }

	// if (localStorage.getItem('oauth-state') !== atob(decodeURIComponent(state))) {
	// 	return console.log('You may have been clickjacked!');
	// }
}

async function getDiscordUserInfo(access_token, token_type) {
	return await fetch("https://discord.com/api/users/@me", {
		headers: {
			authorization: `${token_type} ${access_token} `,
		},
	})
		.then((result) => result.json())
		.then((responseJson) => {
			return responseJson;
		})
		.catch(console.error);
}

async function loadPage(elemToHide) {
	await parseDiscordCallback();

	// Loading header, content and site-footer first
	for (i = 0; i < globalElemToHide.length; i++) {
		var elems = document.getElementsByClassName(globalElemToHide[i].class);
		for (j = 0; j < elems.length; j++) {
			elems[j].style.display = globalElemToHide[i].display;
		}
	}

	if (elemToHide) {
		// Then load the specific page's content
		for (i = 0; i < elemToHide.length; i++) {
			var elems = document.getElementsByClassName(elemToHide[i].class);
			for (j = 0; j < elems.length; j++) {
				elems[j].style.display = elemToHide[i].display;
			}
		}
	}
}

function generateRandomString() {
	let randomString = "";
	const randomNumber = Math.floor(Math.random() * 10);

	for (let i = 0; i < 20 + randomNumber; i++) {
		randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
	}

	return randomString;
}

const getCookieValue = (name) =>
	document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
