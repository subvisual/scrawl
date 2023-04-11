export const routes = {
	home: '/',
	logIn: '/log-in',
	note: (slug: string) => `/note/${slug}`,
	newNote: '/note/new',
	folder: (slug: string) => `/folder/${slug}`
};
