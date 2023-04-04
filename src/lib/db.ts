import { decryptFields, encrypt, encryptFields } from './crypto';
import supabase from './supabase';

export type User = {
	address: string;
	key: string;
};

export async function getUser(id: string) {
	return supabase.from('users').select('*').eq('signature', id);
}

export async function createUser(user: User) {
	return supabase
		.from('users')
		.insert([{ signature: user.address, key: user.key }]);
}

export async function getNotes(user: User) {
	const { data } = await supabase
		.from('notes')
		.select(`id, name, folder, tags, slug`)
		.eq('user', user.address);

	if (!data) {
		return null;
	}

	return data.map((note) => ({
		...note,
		...decryptFields(user.key, note)
	}));
}

export async function createNote(user: User, params: Partial<NoteType>) {
	return supabase
		.from('notes')
		.insert([encryptFields(user.key, params)])
		.select('id, slug');
}

export async function getNote(user: User, slug: string) {
	const { data } = await supabase
		.from('notes')
		.select(`id, name, folder, tags, slug, content`)
		.match({
			slug: encrypt(slug, user.key),
			user: user.address
		});

	if (!data) {
		return null;
	}

	return data.map((note) => ({
		...note,
		...decryptFields(user.key, note)
	}));
}

export async function updateNote(
	user: User,
	id: string,
	params: Partial<NoteType>
) {
	const data = encryptFields(user.key, params);

	return supabase.from('notes').update([data]).match({ id }).select('id, slug');
}

/* 


export async function deleteNote(id: string) {
	return supabase.from('notes').delete().match({ id });
}

export async function createPublicNote(params: Record<string, string>) {
	return supabase.from('public_notes').insert([params]);
}

export async function updatePublicNote(
	id: string,
	params: Record<string, string>
) {
	return supabase.from('public_notes').update([params]).match({ id });
}

export async function deletePublicNote(id: string) {
	return supabase.from('public_notes').delete().match({ id });
}

export async function createFolder(params: Record<string, string>) {
	return supabase.from('folders').insert([params]);
}

export async function deleteFolder(id: string) {
	return supabase.from('folders').delete().match({ id });
}

export async function updateFolder(id: string, name: string) {
	return supabase.from('folders').update({ name }).match({ id });
}

export async function createUser(signature: string, key: string) {
	return supabase.from('users').insert([{ signature, key }]);
}

export async function getPublicNoteById(id: string) {
	return supabase
		.from('public_notes')
		.select(`name, tags, content`)
		.eq('id', id);
}
export async function getNotesBySig(sig: string) {
	return supabase
		.from('notes')
		.select(`id, name, folder, tags, slug`)
		.eq('user', sig);
}

export async function getPublicNotesBySig(sig: string) {
	return supabase
		.from('public_notes')
		.select(`id, originalNote`)
		.eq('user', sig);
}

export async function getFoldersBySig(sig: string) {
	return supabase.from('folders').select(`id, name`).eq('user', sig);
}
 */
