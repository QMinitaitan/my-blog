import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"copyRandomList",
	[["head", "randomNode"]],
	"randomNode",
	{
		python: `# 用原节点身份作键，不能用 val：不同节点可以有相同值。
clones = {None: None}
current = head # @step init
while current: # @step first
    clones[current] = Node(current.val) # @step create
    current = current.next # @step nextFirst
current = head # @step reset
while current: # @step second
    clones[current].next = clones[current.next] # @step nextLink
    clones[current].random = clones[current.random] # @step randomLink
    current = current.next # @step nextSecond
return clones[head] # @step result`,
		javascript: `// 哈希表把原节点对象映射到新节点对象。第一遍先创建所有副本，第二遍再按映射连接两种指针；这样 random 指向尚未扫描到的节点也能正确处理。
const clones=new Map([[null,null]]);let current=head; // @step init
while(current){ // @step first
    clones.set(current,new Node(current.val)); // @step create
    current=current.next; // @step nextFirst
}
current=head; // @step reset
while(current){ // @step second
    clones.get(current).next=clones.get(current.next); // @step nextLink
    clones.get(current).random=clones.get(current.random); // @step randomLink
    current=current.next; // @step nextSecond
}
return clones.get(head); // @step result`,
		java: `// 哈希表把原节点对象映射到新节点对象。第一遍先创建所有副本，第二遍再按映射连接两种指针；这样 random 指向尚未扫描到的节点也能正确处理。
Map<Node,Node> clones=new HashMap<>();clones.put(null,null);Node current=head; // @step init
while(current!=null){ // @step first
    clones.put(current,new Node(current.val)); // @step create
    current=current.next; // @step nextFirst
}
current=head; // @step reset
while(current!=null){ // @step second
    clones.get(current).next=clones.get(current.next); // @step nextLink
    clones.get(current).random=clones.get(current.random); // @step randomLink
    current=current.next; // @step nextSecond
}
return clones.get(head); // @step result`,
		cpp: `// 哈希表把原节点对象映射到新节点对象。第一遍先创建所有副本，第二遍再按映射连接两种指针；这样 random 指向尚未扫描到的节点也能正确处理。
unordered_map<Node*,Node*> clones{{nullptr,nullptr}};Node* current=head; // @step init
while(current){ // @step first
    clones[current]=new Node(current->val); // @step create
    current=current->next; // @step nextFirst
}
current=head; // @step reset
while(current){ // @step second
    clones[current]->next=clones[current->next]; // @step nextLink
    clones[current]->random=clones[current->random]; // @step randomLink
    current=current->next; // @step nextSecond
}
return clones[head]; // @step result`,
	},
);
