import { defineCode } from "../shared/code-resource.js";
export const codes = [
	{
		id: "python",
		label: "Python 3",
		lines: {
			init: 5,
			word: 6,
			key: 7,
			query: 8,
			create: 9,
			append: 10,
			result: 11,
		},
		source: `from typing import List

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = {}
        for word in strs:
            key = "".join(sorted(word))
            if key not in groups:
                groups[key] = []
            groups[key].append(word)
        return list(groups.values())`,
	},
	{
		id: "javascript",
		label: "JavaScript",
		lines: {
			init: 2,
			word: 4,
			key: 5,
			query: 6,
			create: 7,
			append: 9,
			result: 11,
		},
		source: `function groupAnagrams(strs) {
    const groups = new Map();
    let key, word;
    for (word of strs) {
        key = [...word].sort().join("");
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(word);
    }
    return [...groups.values()];
}`,
	},
	defineCode(
		"java",
		`import java.util.*;
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new LinkedHashMap<>(); // @step init
        for (String word : strs) { // @step word
            char[] letters = word.toCharArray();
            Arrays.sort(letters);
            String key = new String(letters); // @step key
            if (!groups.containsKey(key)) { // @step query
                groups.put(key, new ArrayList<>()); // @step create
            }
            groups.get(key).add(word); // @step append
        }
        return new ArrayList<>(groups.values()); // @step result
    }
}`,
	),
	defineCode(
		"cpp",
		`#include <algorithm>
#include <string>
#include <vector>
#include <unordered_map>
using namespace std;
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups; // @step init
        for (const string& word : strs) { // @step word
            string key = word;
            sort(key.begin(), key.end()); // @step key
            if (!groups.count(key)) { // @step query
                groups[key] = {}; // @step create
            }
            groups[key].push_back(word); // @step append
        }
        vector<vector<string>> answer;
        for (auto& entry : groups) answer.push_back(entry.second);
        return answer; // @step result
    }
};`,
	),
];
