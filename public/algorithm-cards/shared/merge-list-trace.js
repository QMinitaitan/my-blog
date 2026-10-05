/** 修改真实的 next id；虚拟头属于各次合并帧，保存快照时不得把当前 tail 当成最终结果。 */
export function mergeTrace(nodes, map, save) {
	let serial = 0;
	return function merge(first, second) {
		const dummy = { id: `D${serial++}`, val: 0, next: null };
		nodes.push(dummy);
		map.set(dummy.id, dummy);
		const f = { a: first, b: second, tail: dummy.id, dummy: dummy.id };
		save("mInit", "为本次合并创建虚拟头和尾指针。", f);
		while (true) {
			save("mCheck", `两条链都非空 → ${f.a !== null && f.b !== null}。`, f);
			if (f.a === null || f.b === null) break;
			const takeLeft = map.get(f.a).val <= map.get(f.b).val;
			save("mCompare", `左值不大于右值 → ${takeLeft}。`, f);
			const name = takeLeft ? "a" : "b";
			map.get(f.tail).next = f[name];
			f[name] = map.get(f[name]).next;
			save(
				takeLeft ? "mLeft" : "mRight",
				"较小节点接到尾部，并推进该链头引用。",
				f,
			);
			f.tail = map.get(f.tail).next;
			save("mTail", "尾指针移动到刚接上的节点。", f);
		}
		map.get(f.tail).next = f.a ?? f.b;
		save("mRest", "另一条链剩余部分整体接到尾部。", f);
		save("mReturn", "返回本次合并的新链头。", f);
		return dummy.next;
	};
}
