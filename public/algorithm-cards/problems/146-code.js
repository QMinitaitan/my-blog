import { defineCode } from "../shared/code-resource.js";
export const codes = [
	defineCode(
		"python",
		`from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity: int):
        self.capacity, self.cache = capacity, OrderedDict() # @step init
    def get(self, key: int) -> int:
        if key not in self.cache: # @step contains
            return -1 # @step miss
        self.cache.move_to_end(key) # @step touch
        return self.cache[key] # @step get
    def put(self, key: int, value: int) -> None:
        self.cache[key] = value # @step write
        self.cache.move_to_end(key) # @step recent
        if len(self.cache) > self.capacity: # @step full
            self.cache.popitem(last=False) # @step evict`,
	),
	defineCode(
		"javascript",
		`class LRUCache {
    constructor(capacity){this.capacity=capacity;this.cache=new Map();} // @step init
    get(key){
        if(!this.cache.has(key)){ // @step contains
            return -1; // @step miss
        }
        const value=this.cache.get(key);this.cache.delete(key);this.cache.set(key,value); // @step touch
        return this.cache.get(key); // @step get
    }
    put(key,value){
        // Map.set 更新已有键不会改变顺序，必须显式删除再插入。
        this.cache.set(key,value); // @step write
        this.cache.delete(key);this.cache.set(key,value); // @step recent
        if(this.cache.size>this.capacity){ // @step full
            this.cache.delete(this.cache.keys().next().value); // @step evict
        }
    }
}`,
	),
	defineCode(
		"java",
		`import java.util.*;
class LRUCache {
    private final int capacity;private final LinkedHashMap<Integer,Integer> cache;
    public LRUCache(int capacity){this.capacity=capacity;cache=new LinkedHashMap<>();} // @step init
    public int get(int key){
        if(!cache.containsKey(key)){ // @step contains
            return -1; // @step miss
        }
        int value=cache.remove(key);cache.put(key,value); // @step touch
        return value; // @step get
    }
    public void put(int key,int value){
        cache.put(key,value); // @step write
        cache.remove(key);cache.put(key,value); // @step recent
        if(cache.size()>capacity){ // @step full
            cache.remove(cache.keySet().iterator().next()); // @step evict
        }
    }
}`,
	),
	defineCode(
		"cpp",
		`#include <list>
#include <unordered_map>
#include <utility>
using namespace std;
class LRUCache {
    int capacity;list<pair<int,int>> cache;unordered_map<int,list<pair<int,int>>::iterator> positions;
public:
    LRUCache(int capacity):capacity(capacity){} // @step init
    // 迭代器只属于当前 cache，禁止默认复制导致另一对象引用旧链表。
    LRUCache(const LRUCache&)=delete;LRUCache& operator=(const LRUCache&)=delete;
    int get(int key){
        if(!positions.count(key)){ // @step contains
            return -1; // @step miss
        }
        cache.splice(cache.end(),cache,positions[key]); // @step touch
        return positions[key]->second; // @step get
    }
    void put(int key,int value){
        if(positions.count(key))positions[key]->second=value;else{cache.push_back({key,value});positions[key]=prev(cache.end());} // @step write
        cache.splice(cache.end(),cache,positions[key]); // @step recent
        if((int)cache.size()>capacity){ // @step full
            positions.erase(cache.front().first);cache.pop_front(); // @step evict
        }
    }
};`,
	),
].map((c) => ({ ...c, operationClass: "LRUCache" }));
