export interface TocType {
	link: string;
	text: string;
	level: number;
}

export const getToc = (markdown: string): TocType[] => {
	const titles = markdown.match(/#{1,3}.+/g) ?? [];
	const data = titles.map((title) => {
		const hashCount = (title.match(new RegExp("#", "g")) ?? []).length;
		const titleWithoutHashes = title.replace(/#\S+/g, "").trim();
		const titleLink = titleWithoutHashes.split(" ").join("-").toLowerCase();
		return {
			link: titleLink,
			text: titleWithoutHashes,
			level: hashCount - 1,
		};
	});
	return data;
};
