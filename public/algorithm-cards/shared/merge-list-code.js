/** 合并有序链表的独立语言实现；行阶段由 defineCode 分别计算，不共享数字行号。 */
export const mergeListCode = {
	python: `def merge(a, b):
    dummy = ListNode()
    tail = dummy # @step mInit
    while a and b: # @step mCheck
        if a.val <= b.val: # @step mCompare
            tail.next, a = a, a.next # @step mLeft
        else:
            tail.next, b = b, b.next # @step mRight
        tail = tail.next # @step mTail
    tail.next = a or b # @step mRest
    return dummy.next # @step mReturn`,
	javascript: `function merge(a,b){
    const dummy=new ListNode();let tail=dummy; // @step mInit
    while(a&&b){ // @step mCheck
        if(a.val<=b.val){ // @step mCompare
            tail.next=a;a=a.next; // @step mLeft
        }else{
            tail.next=b;b=b.next; // @step mRight
        }
        tail=tail.next; // @step mTail
    }
    tail.next=a||b; // @step mRest
    return dummy.next; // @step mReturn
}`,
	java: `private ListNode merge(ListNode a,ListNode b){
    ListNode dummy=new ListNode(0),tail=dummy; // @step mInit
    while(a!=null&&b!=null){ // @step mCheck
        if(a.val<=b.val){ // @step mCompare
            tail.next=a;a=a.next; // @step mLeft
        }else{
            tail.next=b;b=b.next; // @step mRight
        }
        tail=tail.next; // @step mTail
    }
    tail.next=a!=null?a:b; // @step mRest
    return dummy.next; // @step mReturn
}`,
	cpp: `auto merge=[](ListNode* a,ListNode* b)->ListNode*{
    ListNode dummy;ListNode* tail=&dummy; // @step mInit
    while(a&&b){ // @step mCheck
        if(a->val<=b->val){ // @step mCompare
            tail->next=a;a=a->next; // @step mLeft
        }else{
            tail->next=b;b=b->next; // @step mRight
        }
        tail=tail->next; // @step mTail
    }
    tail->next=a?a:b; // @step mRest
    return dummy.next; // @step mReturn
};`,
};
