import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"topKFrequent",
	[
		["nums", "ints"],
		["k", "int"],
	],
	"ints",
	{
		python: `# 先计数，再把数值放到“出现次数”下标的桶中。按桶下标从 n 往下取，避免对所有不同数值排序。
counts = {} # @step init
for num in nums: # @step scan
    counts[num] = counts.get(num, 0) + 1 # @step count
buckets = [[] for _ in range(len(nums) + 1)] # @step buckets
for num, frequency in counts.items(): # @step entry
    buckets[frequency].append(num) # @step place
answer = [] # @step answer
for frequency in range(len(nums), 0, -1): # @step frequency
    for num in buckets[frequency]: # @step candidate
        answer.append(num) # @step collect
        if len(answer) == k: # @step complete
            return answer # @step hit
return answer # @step result`,
		javascript: `// 先计数，再把数值放到“出现次数”下标的桶中。按桶下标从 n 往下取，避免对所有不同数值排序。
const counts=new Map(); // @step init
for (const num of nums) { // @step scan
    counts.set(num,(counts.get(num)||0)+1); // @step count
}
const buckets=Array.from({length:nums.length+1},()=>[]); // @step buckets
for (const [num,frequency] of counts) { // @step entry
    buckets[frequency].push(num); // @step place
}
const answer=[]; // @step answer
for (let frequency=nums.length;frequency>0;frequency--) { // @step frequency
    for (const num of buckets[frequency]) { // @step candidate
        answer.push(num); // @step collect
        if (answer.length===k) { // @step complete
            return answer; // @step hit
        }
    }
}
return answer; // @step result`,
		java: `// 先计数，再把数值放到“出现次数”下标的桶中。按桶下标从 n 往下取，避免对所有不同数值排序。
Map<Integer,Integer> counts=new HashMap<>(); // @step init
for (int num:nums) { // @step scan
    counts.put(num,counts.getOrDefault(num,0)+1); // @step count
}
List<List<Integer>> buckets=new ArrayList<>();for(int i=0;i<=nums.length;i++)buckets.add(new ArrayList<>()); // @step buckets
for (Map.Entry<Integer,Integer> item:counts.entrySet()) {
    int num=item.getKey(),frequency=item.getValue(); // @step entry
    buckets.get(frequency).add(num); // @step place
}
List<Integer> answer=new ArrayList<>(); // @step answer
for (int frequency=nums.length;frequency>0;frequency--) { // @step frequency
    for (int num:buckets.get(frequency)) { // @step candidate
        answer.add(num); // @step collect
        if (answer.size()==k) { // @step complete
            return answer.stream().mapToInt(Integer::intValue).toArray(); // @step hit
        }
    }
}
return answer.stream().mapToInt(Integer::intValue).toArray(); // @step result`,
		cpp: `// 先计数，再把数值放到“出现次数”下标的桶中。按桶下标从 n 往下取，避免对所有不同数值排序。
unordered_map<int,int> counts; // @step init
for (int num:nums) { // @step scan
    counts[num]++; // @step count
}
vector<vector<int>> buckets(nums.size()+1); // @step buckets
for (auto [num,frequency]:counts) { // @step entry
    buckets[frequency].push_back(num); // @step place
}
vector<int> answer; // @step answer
for (int frequency=nums.size();frequency>0;frequency--) { // @step frequency
    for (int num:buckets[frequency]) { // @step candidate
        answer.push_back(num); // @step collect
        if ((int)answer.size()==k) { // @step complete
            return answer; // @step hit
        }
    }
}
return answer; // @step result`,
	},
);
