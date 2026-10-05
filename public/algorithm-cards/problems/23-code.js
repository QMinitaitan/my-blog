import { solutionCodes } from "../shared/solution-code.js";
import { mergeListCode as merge } from "../shared/merge-list-code.js";
export const codes = solutionCodes(
	"mergeKLists",
	[["lists", "lists"]],
	"listNode",
	{
		python: `# 两两归并，间隔从 1、2、4 逐轮翻倍。例如三条链先合并 0/1，再合并 0/2。
${merge.python}
if not lists: # @step empty
    return None # @step nil
interval = 1 # @step init
while interval < len(lists): # @step round
    for i in range(0, len(lists) - interval, interval * 2): # @step pair
        lists[i] = merge(lists[i], lists[i + interval]) # @step merge
    interval *= 2 # @step advance
return lists[0] # @step result`,
		javascript: `// 两两归并，间隔从 1、2、4 逐轮翻倍。例如三条链先合并 0/1，再合并 0/2。
${merge.javascript}
if(lists.length===0){ // @step empty
    return null; // @step nil
}
let interval=1; // @step init
while(interval<lists.length){ // @step round
    for(let i=0;i<lists.length-interval;i+=interval*2){ // @step pair
        lists[i]=merge(lists[i],lists[i+interval]); // @step merge
    }
    interval*=2; // @step advance
}
return lists[0]; // @step result`,
		java: `// 两两归并，间隔从 1、2、4 逐轮翻倍。例如三条链先合并 0/1，再合并 0/2。
if(lists.length==0){ // @step empty
    return null; // @step nil
}
int interval=1; // @step init
while(interval<lists.length){ // @step round
    for(int i=0;i<lists.length-interval;i+=interval*2){ // @step pair
        lists[i]=merge(lists[i],lists[i+interval]); // @step merge
    }
    interval*=2; // @step advance
}
return lists[0]; // @step result`,
		javaHelpers: merge.java,
		cpp: `// 两两归并，间隔从 1、2、4 逐轮翻倍。例如三条链先合并 0/1，再合并 0/2。
${merge.cpp}
if(lists.empty()){ // @step empty
    return nullptr; // @step nil
}
int interval=1; // @step init
while(interval<(int)lists.size()){ // @step round
    for(int i=0;i<(int)lists.size()-interval;i+=interval*2){ // @step pair
        lists[i]=merge(lists[i],lists[i+interval]); // @step merge
    }
    interval*=2; // @step advance
}
return lists[0]; // @step result`,
	},
);
