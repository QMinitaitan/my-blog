const labels = {
	python: "Python 3",
	javascript: "JavaScript",
	java: "Java",
	cpp: "C++",
};

/** 将开发时的阶段标记转成行号。标记不会出现在读者复制的完整代码中。 */
export function defineCode(id, markedSource) {
	const lines = {};
	const source = markedSource
		.trim()
		.split("\n")
		.map((line, index) => {
			const match = line.match(/\s*(?:#|\/\/) @step ([\w,]+)\s*$/);
			if (!match) return line;
			for (const phase of match[1].split(",")) {
				if (phase in lines) throw new Error(`重复执行阶段 ${id}:${phase}`);
				lines[phase] = index + 1;
			}
			return line.slice(0, match.index);
		})
		.join("\n");
	return { id, label: labels[id], source, lines };
}
