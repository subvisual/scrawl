import { decrypt } from './crypto';
import supabase from './supabase';

export type User = {
	address: string;
	key: string;
};

export async function getUser(id: string) {
	return supabase.from('users').select('*').eq('signature', id);
}

export async function createUser(address: string, key: string) {
	return supabase.from('users').insert([{ signature: address, key }]);
}

export async function getNotes(address: string, key: string) {
	const { data } = await supabase
		.from('notes')
		.select(`id, name, folder, tags, slug`)
		.eq('user', address);

	if (!data) {
		return null;
	}

	console.log(data)

	return data.map((note) => ({
		...note,
		name: decrypt(note.name, key),
		folder: decrypt(note.folder, key),
		tags: decrypt(note.tags, key),
		slug: decrypt(note.slug, key)
	}));
}

/* export async function createNote(params: Record<string, string>) {
	return supabase.from('notes').insert([params]);
}

export async function updateNote(id: string, params: Record<string, string>) {
	return supabase.from('notes').update([params]).match({ id });
}

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

export async function getNote(id: string) {
	return supabase
		.from('notes')
		.select(`id, name, folder, tags, slug, content`)
		.eq('id', id);
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
