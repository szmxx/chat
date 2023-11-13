import{existsSync as e,promises as a}from"node:fs";import{Buffer as t}from"node:buffer";import{u as s,N as n,M as c,x as o,H as r,G as i,J as u,F as f,O as m}from"../index.mjs";import p from"image-size";async function y(e,a,t){const{runtimeCacheStorage:i,version:u}=s()[a],f=t.cache&&i&&t.cacheTtl&&t.cacheTtl>0,m="default"===i?`/cache/${a}@${u}`:`/${a}@${u}`,p=n(c(),`${m}/`),g=t.key;let l="DISABLED",h=0;const w=Date.now()+(t.cacheTtl||0),x=typeof o(e).purge<"u";let I=!1;if(!t.skipRestore&&f&&await p.hasItem(g).catch((()=>!1))){const{value:e,expiresAt:a}=await p.getItem(g).catch((()=>({value:null,expiresAt:Date.now()})));x?(l="PURGE",h=w,await p.removeItem(g).catch((()=>{}))):a>Date.now()?(l="HIT",h=w,I=e):(l="MISS",h=a,await p.removeItem(g).catch((()=>{})))}return t.headers&&(r(e,`x-${a}-cache`,l),r(e,`x-${a}-expires`,h.toString())),{enabled:f,cachedItem:I,async update(e){f&&await p.setItem(g,{value:e,expiresAt:Date.now()+(t.cacheTtl||0)})}}}async function k(e,a){const t=[i("/"!==a&&a?a:"index").replaceAll("/","-"),"options"].join(":"),{cachedItem:s,update:n}=await y(e,"nuxt-og-image",{key:t,cacheTtl:5e3,cache:!0,headers:!1});if(s)return s;const c=await async function(e,a){const t=await globalThis.$fetch("/api/og-image-options",{query:{path:a},responseType:"json"});return u({requestOrigin:f(e)},t,o(e))}(e,a);return await n(c),c}function H(e){const a=t.from(e,"base64");return new Uint8Array(a).buffer}function N(e,a){return m(e,a.replace(/:/g,"/"))}async function b(t,n){const{assetDirs:c}=s()["nuxt-og-image"];for(const s of c){const c=N(s,t);if(e(c))return await a.readFile(c,{encoding:n})}}async function P(e){const a=await b(e,"base64");if(a){const s=await p(t.from(a,"base64"));return{src:d(e,a),...s}}}function d(e,a){const s="string"==typeof a?a:t.from(a).toString("base64");let n="image/jpeg";const c=e.split(".").pop();return"svg"===c?n="image/svg+xml":"png"===c&&(n="image/png"),`data:${n};base64,${s}`}export{P as a,H as b,k as f,b as r,d as t,y as u};