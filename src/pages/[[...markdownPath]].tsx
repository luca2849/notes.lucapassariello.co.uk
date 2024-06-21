import { GetStaticPropsContext } from "next";
const { promisify } = require("util");
const { resolve } = require("path");
const fs = require("fs");
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const rootDir = process.cwd() + "/src/content";

import Page from "@/components/Layout/Page";
import { getToc, TocType } from "../../plugins/getToc";

interface IProps {
	title: string;
	content: string;
	toc: TocType[];
}

export default function Layout({ content, title, toc }: IProps) {
	return <Page content={content} title={title} toc={toc} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
	if (!context.params || !context.params.markdownPath) return;
	const fs = require("fs");
	const rootDir = process.cwd() + "/src/content/";
	const path = context.params.markdownPath ?? "index";
	const markdown = fs.readFileSync(rootDir + path + ".md", "utf8");

	const toc = getToc(markdown);

	const files = await getFiles(rootDir);

	const formattedFiles = files.map((file) => ({
		name: formatFileTitle(file),
		link: file,
	}));

	console.log(formattedFiles);

	return {
		props: {
			content: markdown,
			title: formatFileTitle(path),
			toc,
			files: formattedFiles,
		},
	};
}

// Find all MD files recursively.
async function getFiles(dir: string) {
	const subdirs = await readdir(dir);
	const files = await Promise.all(
		subdirs.map(async (subdir: string) => {
			const res = resolve(dir, subdir);
			return (await stat(res)).isDirectory()
				? getFiles(res)
				: res.slice(rootDir.length + 1);
		})
	);
	return (
		files
			.flat()
			// ignores `errors/*.md`, they will be handled by `pages/errors/[errorCode].tsx`
			.filter(
				(file) => file.endsWith(".md") && !file.startsWith("errors/")
			)
	);
}

function formatFileTitle(path: string[] | string) {
	const joinedName = Array.isArray(path) ? path.join(" ") : path;
	const documentName = joinedName.split(".")[0].split("-").join(" ");
	return documentName.replace(/\w\S*/g, function (txt: string) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

export async function getStaticPaths() {
	// 'foo/bar/baz.md' -> ['foo', 'bar', 'baz']
	// 'foo/bar/qux/index.md' -> ['foo', 'bar', 'qux']
	function getSegments(file: string) {
		let segments = file.slice(0, -3).replace(/\\/g, "/").split("/");
		if (segments[segments.length - 1] === "index") {
			segments.pop();
		}
		return segments;
	}

	const files = await getFiles(rootDir);
	const paths = files.map((file) => ({
		params: {
			markdownPath: getSegments(file),
		},
	}));

	return {
		paths: paths,
		fallback: "blocking",
	};
}
