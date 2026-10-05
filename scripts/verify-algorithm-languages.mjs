import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { problemIds } from '../public/algorithm-cards/registry.js';

// 外部语言编译器只用于开发验证，生成后的博客不依赖它们。
const folder=new URL('../output/language-check/',import.meta.url);
await mkdir(folder,{recursive:true});
const methods={'1':'twoSum','49':'groupAnagrams','128':'longestConsecutive','283':'moveZeroes','11':'maxArea','15':'threeSum','42':'trap','121':'maxProfit','55':'canJump','45':'jump','763':'partitionLabels','53':'maxSubArray','56':'merge','189':'rotate','238':'productExceptSelf','41':'firstMissingPositive'};
const fixtures=[];
for(const id of problemIds){
 const {codes}=await import(`../public/algorithm-cards/problems/${id}-code.js`);
 const m=await import(`../public/algorithm-cards/problems/${id}.js`);
 const cpp=codes.find(c=>c.id==='cpp');
 if(cpp){const path=new URL(`${id}.cpp`,folder);let stub=cpp.source.includes('TreeNode')?'struct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\n':'';if(cpp.resultType==='randomNode')stub+='struct Node { int val; Node *next,*random; Node(int v):val(v),next(nullptr),random(nullptr){} };\n';if(cpp.source.includes('ListNode'))stub+='struct ListNode { int val; ListNode* next; ListNode(int v=0,ListNode* n=nullptr):val(v),next(n){} };\n';await writeFile(path,stub+cpp.source);execFileSync('D:/Msys64/ucrt64/bin/g++.exe',['-std=c++17','-fsyntax-only',path.pathname.replace(/^\/(\w:)/,'$1')],{windowsHide:true,stdio:'pipe'});}
 fixtures.push({id,method:codes[0].method??methods[id],operationClass:codes[0].operationClass,argNames:codes[0].args,argTypes:codes[0].argTypes,resultType:codes[0].resultType,resultMode:codes[0].resultMode,targetValueArgs:codes[0].targetValueArgs,source:codes.find(c=>c.id==='python').source,examples:m.examples.map(e=>{
  const args=codes[0].args?codes[0].args.map(name=>e[name]??e.nums??e.input):id==='1'?[e.nums,e.target]:id==='49'?[e.strs]:id==='189'?[e.nums,e.k]:[e.nums??e.height??e.input];
  const final=m.buildTrace(e).at(-1);
  return {args,operations:e.operations,inputGraph:m.buildInput?.(e),answer:id==='128'?final.longest:final.answer,mutates:['283','189','75','31','48','73','114'].includes(id)};
 })});
}
const file=new URL('fixtures.json',folder);await writeFile(file,JSON.stringify(fixtures));
const python=`import json,sys,copy
from types import SimpleNamespace
class TreeNode:
    def __init__(self,val=0,left=None,right=None): self.val,self.left,self.right=val,left,right
class Node:
    def __init__(self,val=0,next=None,random=None): self.val,self.next,self.random=val,next,random
class ListNode:
    def __init__(self,val=0,next=None): self.val,self.next=val,next
def linked(values):
    dummy=ListNode(); tail=dummy
    for value in values: tail.next=ListNode(value); tail=tail.next
    return dummy.next
def encode_list(node):
    values=[]; seen=set()
    while node is not None:
        assert id(node) not in seen, 'cyclic result'
        seen.add(id(node)); values.append(node.val); node=node.next
    return values
def tree(values):
    if not values or values[0] is None: return None
    root=SimpleNamespace(val=values[0],left=None,right=None)
    queue=[root]; index=1
    for node in queue:
        for side in ('left','right'):
            if index>=len(values): break
            value=values[index]; index+=1
            if value is not None:
                child=SimpleNamespace(val=value,left=None,right=None)
                setattr(node,side,child); queue.append(child)
    return root
def encode_tree(root):
    if root is None: return []
    queue=[root]; result=[]
    for node in queue:
        result.append(None if node is None else node.val)
        if node is not None: queue.extend([node.left,node.right])
    while result and result[-1] is None: result.pop()
    return result
cases=json.load(open(sys.argv[1],encoding='utf-8'))
count=0
for case in cases:
    scope={'ListNode':ListNode,'TreeNode':TreeNode,'Node':Node}
    exec(compile(case['source'],case['id'],'exec'),scope)
    solve=None if case.get('operationClass') else getattr(scope['Solution'](),case['method'])
    for example in case['examples']:
        if case.get('operationClass'):
            operations=example['operations']; instance=scope[case['operationClass']](*operations[0][1])
            result=[None]+[getattr(instance,method)(*args) for method,args in operations[1:]]
            assert result==example['answer'], (case['id'],result,example['answer'])
            count+=1
            continue
        args=copy.deepcopy(example['args'])
        graph=example.get('inputGraph'); node_ids={}
        if graph:
            by_id={node['id']:(Node(node['val']) if case.get('resultType')=='randomNode' else ListNode(node['val'])) for node in graph['nodes']}
            for node in graph['nodes']:
                by_id[node['id']].next=by_id.get(node['next'])
                if 'random' in node: by_id[node['id']].random=by_id.get(node['random'])
            node_ids={id(node):key for key,node in by_id.items()}
        for index,kind in enumerate(case.get('argTypes') or []):
            if kind=='tree':
                if case['argNames'][index] in (case.get('targetValueArgs') or []):
                    def find(node):
                        if node is None or node.val==args[index]: return node
                        return find(node.left) or find(node.right)
                    args[index]=find(args[0])
                else: args[index]=tree(args[index])
            if kind=='randomNode': args[index]=by_id.get(graph['heads'][case['argNames'][index]])
            if kind=='lists': args[index]=[linked(values) for values in args[index]]
            if kind=='listNode': args[index]=by_id.get(graph['heads'][case['argNames'][index]]) if graph else linked(args[index])
        result=solve(*args)
        if case.get('resultType')=='tree': result=result.val if case.get('resultMode')=='treeNodeValue' else encode_tree(result)
        if case.get('resultType')=='listNode': result=node_ids.get(id(result)) if case.get('resultMode')=='nodeIdentity' else encode_list(result)
        if example['mutates']:
            assert result is None, case['id']
            result=encode_tree(args[0]) if case['id']=='114' else args[0]
        if case.get('resultType')=='randomNode':
            copies=[]; cursor=result
            while cursor is not None:
                assert id(cursor) not in node_ids and cursor not in copies, 'copy identity or cycle error'
                copies.append(cursor); cursor=cursor.next
            result=[[node.val,None if node.random is None else copies.index(node.random)] for node in copies]
        expected=example['answer']
        if case['id']=='347':
            result=sorted(result)
            expected=sorted(expected)
        if case['id'] in ('49','15'):
            result=sorted(sorted(g) for g in result)
            expected=sorted(sorted(g) for g in expected)
        assert result==expected, (case['id'],args,result,expected)
        count+=1
print(f'Python: {count} sample executions passed; C++: {len(cases)} sources compiled')
`;
const check=new URL('check.py',folder);await writeFile(check,python);
const localPath=url=>decodeURIComponent(url.pathname).replace(/^\/(\w:)/,'$1');
console.log(execFileSync('D:/miniconda/python.exe',[localPath(check),localPath(file)],{windowsHide:true,encoding:'utf8'}));
console.log('Java execution was not checked: no compiler configured.');
