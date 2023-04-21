export const routes = {
	home: '/',
	logIn: '/log-in',
	note: (id: string) => `/note/${id}`,
	newNote: '/note/new',
	folder: (id: string) => `/folder/${id}`
};
