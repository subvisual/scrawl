export const splitTags = (tags: string) =>
	tags.split(/ *[,;] */).filter(Boolean);
