export default {
	title: "Aviral Chawla",
	pages: [
		{name: "About", path: "/about"},
		{name: "Projects", open: true, pages: [
			{name: "Neighbor-Hop Mutation", path: "/projects/neighbor-hop"},
		]},
	],
	head: '<link rel="icon" href="/photos/webicon.png" type="image/png" sizes="16x16">',
	root: "src",
	footer: "",
	theme: "light",
	pager: false
};
