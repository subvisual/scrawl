import { decrypt, decryptFields, encryptFields } from './crypto';
import supabase from './supabase';

export type User = {
	username: string;
	key: string;
};

export async function getUser(user: User) {
	return supabase.from('users').select('*').match({
		username: user.username,
		key: user.key
	});
}

export async function createUser(user: User) {
	return supabase
		.from('users')
		.insert([{ key: user.key, username: user.username }]);
}

export async function getNotes(user: User) {
	const { data } = await supabase
		.from('notes')
		.select(`id, title, folder, tags`)
		.eq('user', user.username)
		.order('created_at', { ascending: false });

	return data?.map((note) => ({
		...note,
		...decryptFields<NoteType>(user.key, note)
	}));
}

export async function createNote(user: User, params: Partial<NoteType>) {
	const req = await supabase
		.from('notes')
		.insert([encryptFields(user.key, params)])
		.select('id');

	console.log(req);
	return req;
}

export async function getNote(user: User, id: string) {
	const { data } = await supabase
		.from('notes')
		.select(`id, title, folder, tags, content`)
		.match({
			id,
			user: user.username
		});

	return data?.map((note) => ({
		...note,
		...decryptFields<NoteType>(user.key, note)
	}));
}

export async function updateNote(
	user: User,
	id: string,
	params: Partial<NoteType>
) {
	const data = encryptFields(user.key, params);

	return supabase.from('notes').update([data]).match({ id }).select('id');
}

export async function getFolders(user: User) {
	const { data } = await supabase
		.from('folders')
		.select(`id, title`)
		.eq('user', user.username)
		.order('created_at', { ascending: false });

	if (!data) {
		return null;
	}

	return data.map((folder) => decryptFields<FolderType>(user.key, folder));
}

export async function getFolder(user: User, id: string) {
	const { data } = await supabase
		.from('folders')
		.select(
			`
			id, title,
			notes (
				id, title
			)
			`
		)
		.match({
			id,
			user: user.username
		});

	return data?.map((folder) => ({
		id: folder.id,
		name: decrypt(folder.title, user.key),
		notes: (folder.notes as any[]).map((note: any) => ({
			...note,
			...decryptFields<FolderType>(user.key, note)
		}))
	}));
}

export async function createFolder(user: User, params: Partial<FolderType>) {
	return supabase
		.from('folders')
		.insert([encryptFields(user.key, params)])
		.select('id');
}

export async function deleteNote(id: string) {
	return (await supabase.from('notes').delete().match({ id })).status;
}

export async function deleteFolder(id: string) {
	return (await supabase.from('folders').delete().match({ id })).status;
}
