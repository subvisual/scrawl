type UserType = {
	id: string;
	username: string;
	key: string;
};

type FolderType = {
	id: string;
	title: string;
	user: string;
};

type NoteType = {
	id: string;
	title: string;
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

type View = 'editor' | 'preview' | 'split';
