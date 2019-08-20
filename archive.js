const CONFIG = {
	"projects": [
		{"id": "", "name": "Home", "tags": []},
		{"id": "flexport", "name": "Flexport", "tags": ["internship", "frontend UI"]},
		{"id": "alphabetboard", "name": "Alphabet Board", "tags": ["draft", "coursework", "electronics"]},
		{"id": "nostrum", "name": "Nostrum", "tags": ["draft", "coursework", "webdev"]},
		{"id": "crucible", "name": "The Crucible", "tags": ["draft", "Berkeley Innovation", "design"]},
		{"id": "paypal", "name": "PayPal", "tags": ["internship", "webdev", "frontend UI"]},
		{"id": "mapd", "name": "MapD (now Omnisci)", "tags": ["draft", "Berkeley Innovation", "design"]},
		{"id": "keewi", "name": "Keewi", "tags": ["internship", "webdev"]},
		// {"id": "proclub", "name": "Programming Club", "tags": ["draft", "high school", "webdev"]},
		{"id": "solarunion", "name": "SolarUnion", "tags": ["internship", "webdev"]},
		{"id": "launch", "name": "Launch", "tags": ["high school", "Android"]},
		{"id": "totalphase", "name": "Total Phase", "tags": ["internship"]},
		{"id": "cgs", "name": "Threat Detected", "tags": ["high school", "game"]},
		{"id": "graphicdesign", "name": "Graphic Design", "tags": ["high school", "graphic design"]},
		{"id": "profpics", "name": "Custom Profile Pictures", "tags": ["high school", "webdev"]},
		{"id": "clubwebsites", "name": "Club Websites", "tags": ["draft", "high school", "webdev"]},
		{"id": "willowlakebnb", "name": "Willow Lake", "tags": ["high school", "webdev"]},
		{"id": "yogawithmiki", "name": "Yoga with Miki", "tags": ["middle school", "webdev"]},
		{"id": "woodellcomputers", "name": "Woodell Computers", "tags": ["middle school", "webdev"]},
		{"id": "neopets", "name": "Neopets", "tags": ["draft", "old"]},
	],
};

let state = {
	currentProject: "",
}

const projectList = CONFIG.projects.map(x => x.id);

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
		let file = `${projectStr}/readme.md`;
		return fetch(file)
		.then(res => res.body.getReader().read())
		.then(res => new TextDecoder("utf-8").decode(res.value));
	},
	renderContent: (mdStr) => {
		document.getElementById("content").innerHTML = marked(mdStr);
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
		const tags = footerContentObj.tags.map(tagTemplate);
		document.getElementById("tags").innerHTML = tags.length > 0 ? `Tags: ${tags.join("")}` : "";
	}
}

function render(state) {
	Nav.renderContent(Nav.getContent(state.currentProject));
	Page.getContent(state.currentProject).then(Page.renderContent);
	Footer.renderContent(Footer.getContent(state.currentProject));
}

state.currentProject = new URL(window.location.href).searchParams.get("id");
render(state);
