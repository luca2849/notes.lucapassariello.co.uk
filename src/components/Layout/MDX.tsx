import React from "react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";

interface IProps {
	content: string;
	title: string;
}

const MDX = ({ content, title }: IProps) => {
	return (
		<div className="mdx max-w-6xl justify-center align-center flex-1 p-5 mx-auto max-h-[calc(100vh-66px)] overflow-auto">
			<h1>{title}</h1>
			<Markdown
				remarkPlugins={[
					remarkGemoji,
					remarkGfm,
					remarkParse,
					remarkRehype,
				]}
				rehypePlugins={[
					rehypeSlug,
					rehypeAutolinkHeadings,
					[rehypeToc, { headings: ["h1", "h2", "h3"] }],
				]}
				components={{
					code(props) {
						const { children, className, node, ...rest } = props;
						const match = /language-(\w+)/.exec(className || "");
						return match ? (
							<SyntaxHighlighter
								{...rest}
								PreTag="div"
								children={String(children).replace(/\n$/, "")}
								language="jsx"
								style={a11yDark}
								ref={null}
							/>
						) : (
							<code {...rest} className={className}>
								{children}
							</code>
						);
					},
				}}
			>
				{content}
			</Markdown>
		</div>
	);
};

export default MDX;
