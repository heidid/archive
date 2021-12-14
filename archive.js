const CONFIG = {
	"projects": [
		{"id": "", "name": "Home", "tags": []},
    {"id": "edupad", "name": "EduPad", "tags": ["coursework", "design"]},
		{"id": "nyt", "name": "New York Times", "tags": ["internship", "frontend UI", "⚠️draft"]},
		{"id": "wdd", "name": "Web Design DeCal", "tags": ["teaching", "⚠️draft"]},
		{"id": "sitelab", "name": "SITELAB Urban Studio", "tags": ["Berkeley Innovation", "urban design", "⚠️draft"]},
		{"id": "la140", "name": "Patricia's Green study", "tags": ["coursework", "urban design", "⚠️draft"]},
		{"id": "flexport", "name": "Flexport", "tags": ["internship", "frontend UI"]},
		{"id": "alphabetboard", "name": "Alphabet Board", "tags": ["⚠️draft", "coursework", "electronics"]},
		{"id": "nostrum", "name": "Nostrum", "tags": ["coursework", "webdev"]},
		{"id": "crucible", "name": "The Crucible", "tags": ["⚠️draft", "Berkeley Innovation", "design"]},
		{"id": "paypal", "name": "PayPal", "tags": ["internship", "webdev", "frontend UI"]},
		{"id": "mapd", "name": "MapD (now Omnisci)", "tags": ["⚠️draft", "Berkeley Innovation", "design"]},
		{"id": "keewi", "name": "Keewi", "tags": ["internship", "webdev", "mobile app", "design"]},
		// {"id": "proclub", "name": "Programming Club", "tags": ["⚠️draft", "high school", "webdev"]},
		{"id": "solarunion", "name": "SolarUnion", "tags": ["internship", "webdev"]},
		{"id": "launch", "name": "Launch", "tags": ["high school", "mobile app"]},
		{"id": "totalphase", "name": "Total Phase", "tags": ["internship"]},
		{"id": "cgs", "name": "Threat Detected", "tags": ["high school", "game", "graphic design"]},
		{"id": "graphicdesign", "name": "Graphic Design", "tags": ["high school", "graphic design"]},
		{"id": "profpics", "name": "Custom Profile Pictures", "tags": ["high school", "webdev"]},
		{"id": "clubwebsites", "name": "Club Websites", "tags": ["high school", "webdev"]},
		{"id": "willowlakebnb", "name": "Willow Lake", "tags": ["high school", "webdev"]},
		{"id": "yogawithmiki", "name": "Yoga with Miki", "tags": ["old", "middle school", "webdev"]},
		{"id": "woodellcomputers", "name": "Woodell Computers", "tags": ["old", "middle school", "webdev"]},
		{"id": "neopets", "name": "Neopets", "tags": ["⚠️draft", "old"]},
	],
};

let state = {
	currentProject: "",
}

const projectList = CONFIG.projects.map(p => p.id);

const tagTemplate = (tag) => `<span class="tag">${tag}</span>`;

const Nav = {
	getContent: (projectStr) => {
		const navItemTemplate = (id, name, tags) => `<li${id === projectStr ? ' class="active"' : ""}><a href="?id=${id}">${name}</a>${tags.map(tagTemplate).join("")}</li>`;
		const liArr = CONFIG.projects.map(p => navItemTemplate(p.id, p.name, p.tags));
		return liArr;
	},
	renderContent: (liArr) => {
		document.getElementById("nav").innerHTML = liArr.join("");
	}
} 

const Page = {
	getContent: (projectStr) => {
		let file = `${projectStr !== null && projectStr !== "" ? projectStr + '/' : ''}readme.md`;
		return fetch(file)
		.then(res => res.body.getReader().read())
		.then(res => new TextDecoder("utf-8").decode(res.value))
		.then(res => marked.parse(res, { baseUrl: `${projectStr !== null && projectStr !== "" ? projectStr : ''}/` }));
	},
	renderContent: (markupStr) => {
		document.getElementById("content").innerHTML = markupStr;
		if (!state.currentProject || state.currentProject === "") {
			TagLists.renderContent(TagLists.getContent());
		}
	}
}

const Footer = {
	getContent: (projectStr) => {
		const index = CONFIG.projects.findIndex((p) => p.id === projectStr);
		return {
			tags: CONFIG.projects[index].tags,
		};
	},
	renderContent: (footerContentObj) => {
		if (footerContentObj.tags.length > 0) {
			const tags = footerContentObj.tags.map(tagTemplate);
			document.getElementById("tags").innerHTML = `Tags: ${tags.join("")}`;
		}
	}
}

const TagLists = {
	getContent: () => {
		let map = {};
		CONFIG.projects.forEach(p => {
			p.tags.forEach(tag => {
				if (!map.hasOwnProperty(tag)) {
					map[tag] = [];
				}
				if (!map[tag].includes(p)) {
					map[tag].push(p);
				}
			});
		});
		return map;
	},
	renderContent: (map) => {
		const tagsInAlphaOrder = Object.keys(map).sort();
		const lists = tagsInAlphaOrder.map((tag) => {
			return `<div>${marked.parse(`${tag}\n${map[tag].map(p => `- [${p.name}](?id=${p.id})`).join('\n')}`)}</div>`;
		});
		console.log(lists)
		document.getElementById("tagLists").innerHTML = lists.join("");
	}
}

function render(state) {
	Nav.renderContent(Nav.getContent(state.currentProject));
	Page.getContent(state.currentProject).then(Page.renderContent);
	if (state.currentProject && state.currentProject !== "") {
		Footer.renderContent(Footer.getContent(state.currentProject));
	}
}

state.currentProject = new URL(window.location.href).searchParams.get("id");
render(state);
