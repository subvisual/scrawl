export const ROUTES = {
	home: '/',
	logIn: '/log-in',
	new: '/new',
	folder: (slug: string) => `/folders/${slug}`,
	note: (slug: string) => `/notes/${slug}`
};
