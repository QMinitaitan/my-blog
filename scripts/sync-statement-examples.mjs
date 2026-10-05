import fs from 'node:fs/promises';
import {problemIds} from '../public/algorithm-cards/registry.js';

const query = 'query($titleSlug:String!){question(titleSlug:$titleSlug){questionFrontendId translatedContent}}';
const cached = process.argv.includes('--cached');
const list = cached ? {stat_status_pairs:[]} : await (await fetch('https://leetcode.cn/api/problems/all/')).json();
const slugs = new Map(list.stat_status_pairs.map(p=>[String(p.stat.frontend_question_id),p.stat.question__title_slug]));
const raw = cached ? JSON.parse(await fs.readFile('output/statement-examples-raw.json','utf8')) : {};
let cursor = 0;
await Promise.all(Array.from({length:4}, async()=>{
  while(!cached && cursor < problemIds.length) {
    const id = problemIds[cursor++], slug=slugs.get(id);
    for(let attempt=0;attempt<3;attempt++) {
      try {
        const response=await fetch('https://leetcode.cn/graphql/',{method:'POST',headers:{'Content-Type':'application/json','Referer':`https://leetcode.cn/problems/${slug}/`,'User-Agent':'Mozilla/5.0'},body:JSON.stringify({query,variables:{titleSlug:slug}})});
        const question=(await response.json()).data?.question;
        if(!question?.translatedContent || question.questionFrontendId !== id) throw Error(`题目 ${id} 数据缺失`);
        raw[id]={slug,html:question.translatedContent};
        break;
      } catch(error) {if(attempt===2) throw error;}
    }
  }
}));
await fs.mkdir('output',{recursive:true});
await fs.writeFile('output/statement-examples-raw.json',JSON.stringify(raw,null,2));

function text(html) {
  return html.replace(/<br\s*\/?\s*>/gi,'\n').replace(/<\/(?:p|div|pre|li)>/gi,'\n').replace(/<[^>]*>/g,'')
    .replace(/&#(x[0-9a-f]+|\d+);/gi,(_,v)=>String.fromCodePoint(v[0].toLowerCase()==='x'?parseInt(v.slice(1),16):Number(v)))
    .replace(/&quot;/g,'"').replace(/&apos;|&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\r/g,'');
}
const data={}, failures=[];
for(const id of problemIds) {
  const blocks=[...raw[id].html.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>|<div class="example-block">([\s\S]*?)<\/div>/gi)].map(m=>text(m[1]??m[2]));
  const examples=[];
  for(const block of blocks) {
    const match=block.match(/输入\s*[:：]?\s*([\s\S]*?)输出\s*[:：]?\s*([\s\S]*?)(?=\n?\s*(?:解释|说明)(?:\s*[:：]|\s*\n)|$)/);
    if(match) examples.push({input:match[1].trim(),output:match[2].trim()});
  }
  if(!examples.length) failures.push(id);
  data[id]=examples;
}
await fs.writeFile('output/statement-examples-parsed.json',JSON.stringify(data,null,2));
if(failures.length) throw Error(`未解析出示例：${failures.join(', ')}`);
await fs.writeFile('public/algorithm-cards/problems/statement-examples-data.js',`// Generated from official LeetCode translatedContent; run scripts/sync-statement-examples.mjs.\nexport const statementExamples = ${JSON.stringify(data,null,2)};\n`);
console.log(`Official examples: ${problemIds.length} problems, ${Object.values(data).reduce((n,v)=>n+v.length,0)} examples.`);
