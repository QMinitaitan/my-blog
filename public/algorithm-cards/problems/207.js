import { graphCard } from "../shared/graph-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./207-code.js";
export const examples = [
	{
		label: "先修链",
		numCourses: 3,
		prerequisites: [
			[1, 0],
			[2, 1],
		],
		note: "0 无先修，完成它后依次解锁 1、2。",
	},
	{
		label: "存在环",
		numCourses: 2,
		prerequisites: [
			[1, 0],
			[0, 1],
		],
		note: "两个课程入度都非零，队列为空，无法开始。",
	},
	{
		label: "汇合依赖",
		numCourses: 4,
		prerequisites: [
			[2, 0],
			[2, 1],
			[3, 2],
		],
		note: "2 必须等 0、1 都完成，入度降到 0 才入队。",
	},
	{
		label: "没有先修",
		numCourses: 1,
		prerequisites: [],
		note: "唯一课程直接入队并完成。",
	},
];
export function buildTrace({ numCourses, prerequisites }) {
	const graph = Array.from({ length: numCourses }, () => []),
		indegree = Array(numCourses).fill(0),
		nodes = Array.from({ length: numCourses }, (_, i) => i),
		edges = [],
		done = [],
		{ steps, push } = recorder();
	let queue = null,
		course = null,
		prerequisite = null,
		following = null,
		completed = null,
		edge = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			vertices: nodes,
			edges,
			indegree,
			queue,
			course,
			prerequisite,
			following,
			completed,
			current: course,
			edge,
			completedNodes: done,
			answer,
		});
	save("init", "邻接表为空，所有入度为 0。");
	for (const pair of prerequisites) {
		[course, prerequisite] = pair;
		edge = null;
		save(
			"edge",
			`依赖对 [${course},${prerequisite}] 表示先修 ${prerequisite}。`,
		);
		graph[prerequisite].push(course);
		edges.push([prerequisite, course]);
		edge = [prerequisite, course];
		save("link", "画箭头 prerequisite → course。");
		indegree[course]++;
		save("degree", "course 的未完成先修数加一。");
	}
	queue = [];
	edge = null;
	save("queue", "创建空待修队列。");
	for (course = 0; course < numCourses; course++) {
		save("scan", `检查课程 ${course}。`);
		save("zero", `入度为 0 → ${indegree[course] === 0}。`);
		if (indegree[course] === 0) {
			queue.push(course);
			save("seed", "无需等待先修，加入队列。");
		}
	}
	course = numCourses - 1;
	completed = 0;
	save("count", "完成数量初始化为 0。");
	while (true) {
		save("loop", `队列非空 → ${queue.length > 0}。`);
		if (!queue.length) break;
		course = queue.shift();
		edge = null;
		save("pop", "队首课程出队，准备完成。");
		completed++;
		done.push(course);
		save("complete", "完成数量加一。");
		for (following of graph[course]) {
			edge = [course, following];
			save("neighbor", `查看依赖当前课程的 ${following}。`);
			indegree[following]--;
			save("decrease", "这门先修已完成，following 入度减一。");
			save("ready", `入度变为 0 → ${indegree[following] === 0}。`);
			if (indegree[following] === 0) {
				queue.push(following);
				save("push", "全部先修已完成，加入队列。");
			}
		}
	}
	answer = completed === numCourses;
	save(
		"result",
		answer
			? "所有课程都完成，返回 true。"
			: "仍有课程被环中的先修关系阻塞，返回 false。",
	);
	steps.at(-1).final = true;
	return steps;
}
const card = graphCard({
	title: "207. 课程表",
	description: "每个依赖 [a,b] 表示学 a 前必须先学 b，判断所有课程能否完成。",
	idea: "入度记录仍需等待的先修数量。队列只放入度 0 的课程；完成一门就降低它的后继入度。若最终完成数不足，剩余部分含环。",
	time: "O(V+E)",
	space: "O(V+E)",
	codes,
	examples,
	buildTrace,
	variables: [
		["course", "当前课程"],
		["following", "依赖它的课程"],
		["indegree", "未完成先修数"],
		["completed", "已完成数量"],
	],
});
export const template = card.template;
export const mount = card.mount;
