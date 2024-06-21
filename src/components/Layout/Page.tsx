import React from "react";
import MDX from "./MDX";
import Head from "next/head";
import { TocType } from "../../../plugins/getToc";
import Toc from "./Toc";
import OtherArticles from "./OtherArticles";

interface IProps {
	content: string;
	title: string;
	toc: TocType[];
}

const Page = ({ content, title, toc }: IProps) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<div>
				<div className="p-5 border border-sky-500">TOP</div>
				<div className="flex">
					<div className="basis-2/12 sticky top-0">
						<OtherArticles />
					</div>
					<MDX content={content} title={title} />
					<div className="basis-2/12 sticky top-0">
						<Toc toc={toc} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
