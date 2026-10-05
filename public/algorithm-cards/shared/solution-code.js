import { defineCode } from "./code-resource.js";
const types = {
	float: ["float", "double", "double"],
	int: ["int", "int", "int"],
	bool: ["bool", "boolean", "bool"],
	ints: ["List[int]", "int[]", "vector<int>"],
	matrix: ["List[List[int]]", "int[][]", "vector<vector<int>>"],
	str: ["str", "String", "string"],
	strings: ["List[str]", "String[]", "vector<string>"],
	void: ["None", "void", "void"],
	intList: ["List[int]", "List<Integer>", "vector<int>"],
	intLists: ["List[List[int]]", "List<List<Integer>>", "vector<vector<int>>"],
	stringList: ["List[str]", "List<String>", "vector<string>"],
	stringLists: [
		"List[List[str]]",
		"List<List<String>>",
		"vector<vector<string>>",
	],
	tree: ["Optional[TreeNode]", "TreeNode", "TreeNode*"],
	listNode: ["Optional[ListNode]", "ListNode", "ListNode*"],
	lists: ["List[Optional[ListNode]]", "ListNode[]", "vector<ListNode*>"],
	randomNode: ["Optional[Node]", "Node", "Node*"],
	charMatrix: ["List[List[str]]", "char[][]", "vector<vector<char>>"],
};
const indent = (body, spaces) =>
	body
		.trim()
		.split("\n")
		.map((line) => " ".repeat(spaces) + line)
		.join("\n");
/** 只复用语言外壳。每种语言的算法正文与阶段标记仍由题目分别维护。 */
export function solutionCodes(method, args, result, bodies) {
	const [pyResult, javaResult, cppResult] = types[result];
	const pyArgs = args
		.map(([name, type]) => `${name}: ${types[type][0]}`)
		.join(", ");
	const javaArgs = args
		.map(([name, type]) => `${types[type][1]} ${name}`)
		.join(", ");
	const cppArgs = args
		.map(
			([name, type]) =>
				`${types[type][2]}${["ints", "matrix", "charMatrix", "str", "strings", "intList", "intLists", "stringList", "stringLists", "lists"].includes(type) ? "&" : ""} ${name}`,
		)
		.join(", ");
	return [
		defineCode(
			"python",
			`from __future__ import annotations\nfrom typing import List, Optional\nclass Solution:\n    def ${method}(self, ${pyArgs}) -> ${pyResult}:\n${indent(bodies.python, 8)}`,
		),
		defineCode(
			"javascript",
			`function ${method}(${args.map(([name]) => name).join(", ")}) {\n${indent(bodies.javascript, 4)}\n}`,
		),
		defineCode(
			"java",
			`import java.util.*;\nclass Solution {\n    public ${javaResult} ${method}(${javaArgs}) {\n${indent(bodies.java, 8)}\n    }${bodies.javaHelpers ? "\n" + indent(bodies.javaHelpers, 4) : ""}\n}`,
		),
		defineCode(
			"cpp",
			`#include <vector>\n#include <string>\n#include <algorithm>\n#include <numeric>\n#include <climits>\n#include <limits>\n#include <utility>\n#include <deque>\n#include <unordered_map>\n#include <unordered_set>\n#include <queue>\n#include <stack>\n#include <optional>\n#include <functional>\nusing namespace std;\nclass Solution {\npublic:\n    ${cppResult} ${method}(${cppArgs}) {\n${indent(bodies.cpp, 8)}\n    }\n};`,
		),
	].map((code) => ({
		...code,
		method,
		args: args.map(([name]) => name),
		argTypes: args.map(([, type]) => type),
		resultType: result,
	}));
}
