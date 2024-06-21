import { remark } from "remark";
import html from "remark-html";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkMdx from "remark-mdx";

async function markdownToHtml(markdown: string): Promise<string> {
	const result = await remark()
		.use(html)
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkGemoji)
		.use(remarkRehype)
		.use(rehypeFormat)
		.use(rehypeHighlight)
		.use(rehypeStringify)
		.use(remarkMdx)
		.process(markdown);
	return result.toString();
}

export default markdownToHtml;
