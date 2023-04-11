type UserType = {
	id: string;
	signature: string;
	address: string;
};

type FolderType = {
	id: string;
	name: string;
	user: string;
	slug: string;
};

type NoteType = {
	id: string;
	name: string;
	slug: string;
	folder: string;
	tags: string;
	content?: string;
	user?: string;
};

type PublicNoteType = {
	id: string;
	user: string;
	originalNote: string;
};
