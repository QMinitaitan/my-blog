import { defineCode } from "../shared/code-resource.js";
export const codes = [
	defineCode(
		"python",
		`class Node:
    def __init__(self):
        self.children = {}
        self.end = False

class Trie:
    def __init__(self):
        self.root = Node() # @step init

    def insert(self, word: str) -> None:
        node = self.root # @step insertInit
        for ch in word: # @step insertLetter
            if ch not in node.children: # @step newCheck
                node.children[ch] = Node() # @step create
            node = node.children[ch] # @step insertAdvance
        node.end = True # @step end

    def _find(self, word):
        node = self.root # @step findInit
        for ch in word: # @step findLetter
            if ch not in node.children: # @step missing
                return None # @step absent
            node = node.children[ch] # @step advance
        return node # @step found

    def search(self, word: str) -> bool:
        node = self._find(word) # @step search
        return node is not None and node.end # @step searchResult

    def startsWith(self, prefix: str) -> bool:
        return self._find(prefix) is not None # @step prefixResult`,
	),
	defineCode(
		"javascript",
		`class TrieNode {
    constructor() { this.children=new Map();this.end=false; }
}
class Trie {
    constructor() { this.root=new TrieNode(); } // @step init
    insert(word) {
        let node=this.root; // @step insertInit
        for (const ch of word) { // @step insertLetter
            if (!node.children.has(ch)) { // @step newCheck
                node.children.set(ch,new TrieNode()); // @step create
            }
            node=node.children.get(ch); // @step insertAdvance
        }
        node.end=true; // @step end
    }
    find(word) {
        let node=this.root; // @step findInit
        for (const ch of word) { // @step findLetter
            if (!node.children.has(ch)) { // @step missing
                return null; // @step absent
            }
            node=node.children.get(ch); // @step advance
        }
        return node; // @step found
    }
    search(word) {
        const node=this.find(word); // @step search
        return node!==null && node.end; // @step searchResult
    }
    startsWith(prefix) { return this.find(prefix)!==null; } // @step prefixResult
}`,
	),
	defineCode(
		"java",
		`import java.util.*;
class Trie {
    private static class Node {
        Map<Character,Node> children=new HashMap<>();
        boolean end=false;
    }
    private Node root;
    public Trie() { root=new Node(); } // @step init
    public void insert(String word) {
        Node node=root; // @step insertInit
        for (char ch:word.toCharArray()) { // @step insertLetter
            if (!node.children.containsKey(ch)) { // @step newCheck
                node.children.put(ch,new Node()); // @step create
            }
            node=node.children.get(ch); // @step insertAdvance
        }
        node.end=true; // @step end
    }
    private Node find(String word) {
        Node node=root; // @step findInit
        for (char ch:word.toCharArray()) { // @step findLetter
            if (!node.children.containsKey(ch)) { // @step missing
                return null; // @step absent
            }
            node=node.children.get(ch); // @step advance
        }
        return node; // @step found
    }
    public boolean search(String word) {
        Node node=find(word); // @step search
        return node!=null && node.end; // @step searchResult
    }
    public boolean startsWith(String prefix) { return find(prefix)!=null; } // @step prefixResult
}`,
	),
	defineCode(
		"cpp",
		`#include <string>
#include <unordered_map>
#include <vector>
using namespace std;
class Trie {
    struct Node { unordered_map<char,Node*> children; bool end=false; };
    Node* root;
    Node* find(const string& word) {
        Node* node=root; // @step findInit
        for (char ch:word) { // @step findLetter
            if (!node->children.count(ch)) { // @step missing
                return nullptr; // @step absent
            }
            node=node->children[ch]; // @step advance
        }
        return node; // @step found
    }
public:
    Trie() { root=new Node(); } // @step init
    Trie(const Trie&)=delete;
    Trie& operator=(const Trie&)=delete;
    ~Trie() {
        // 显式栈回收，长单词不会造成递归析构栈溢出。
        vector<Node*> pending{root};
        while (!pending.empty()) {
            Node* node=pending.back();pending.pop_back();
            for (auto& child:node->children) pending.push_back(child.second);
            delete node;
        }
    }
    void insert(string word) {
        Node* node=root; // @step insertInit
        for (char ch:word) { // @step insertLetter
            if (!node->children.count(ch)) { // @step newCheck
                node->children[ch]=new Node(); // @step create
            }
            node=node->children[ch]; // @step insertAdvance
        }
        node->end=true; // @step end
    }
    bool search(string word) {
        Node* node=find(word); // @step search
        return node!=nullptr && node->end; // @step searchResult
    }
    bool startsWith(string prefix) { return find(prefix)!=nullptr; } // @step prefixResult
};`,
	),
].map((code) => ({ ...code, operationClass: "Trie" }));
