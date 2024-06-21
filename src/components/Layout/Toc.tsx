import React from "react";
import { TocType } from "../../../plugins/getToc";

interface IProps {
	toc: TocType[];
}

const Toc = ({ toc }: IProps) => {
	return (
		<div>
			<div className="py-4 text-center text-xl uppercase tracking-wide bg-primary-600 rounded-b-md font-bold">
				On This Page
			</div>
			<div className="px-2 py-2">
				{toc.map((tocEntry) => (
					<a
						className={`block py-2 px-${tocEntry.level} tracking-wide`}
						href={`#${tocEntry.link}`}
						key={tocEntry.link}
					>
						{tocEntry.text}
					</a>
				))}
			</div>
		</div>
	);
};

export default Toc;
