/** 监控区显示真实值或有明确省略标记的窗口，不把部分数据伪装成完整列表。 */
export function stateValue(state, name) {
	const value = state[name];
	if (value === null || value === undefined) return null;
	if (typeof value !== "object") return value;
	const text = JSON.stringify(value);
	if (name === "values" && state.valueLength)
		return `${text}（原长度 ${state.valueLength}，仅索引 ${state.valueIndices.join(",")}）`;
	const omitted = state[`${name}Omitted`];
	return omitted
		? `${text}（省略 ${name === "answer" ? "后续" : Array.isArray(value) ? "中间" : "其他"} ${omitted} 项）`
		: text;
}
