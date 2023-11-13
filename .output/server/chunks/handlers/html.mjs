import{g as t,u as e,x as n,I as i,F as o,J as s,E as a,y as r,A as p}from"../../index.mjs";import{renderSSRHead as l}from"@unhead/ssr";import m from"twemoji";import{f as c}from"../utils.mjs";import{inline as h}from"css-inline";import{a as d}from"../index.mjs";import"node:os";import"node:cluster";import"node:http";import"node:https";import"node:zlib";import"node:stream";import"node:buffer";import"node:util";import"node:url";import"node:net";import"node:fs";import"node:path";import"fs";import"path";import"image-size";import"@unhead/shared";function v(t,e){return h(t,{...e,load_remote_stylesheets:!1,keep_style_tags:!1})}v.__mock=!1;const f=t((async t=>{const{fonts:h,satoriOptions:f}=e()["nuxt-og-image"],g=n(t),y=i(g.path||"/",e().app.baseURL),u=g.scale,$=g.mode||"light",w=o(t);let _;if(g.options)try{_=JSON.parse(g.options)}catch{}let b=await c(t,y);if(_&&(b=s(_,b)),"browser"===b.provider&&"PageScreenshot"===b.component){const n=y.replace(new RegExp(`^${e().app.baseURL}`),"");return a(t,i(n,w))}if(!b.component)throw r({statusCode:500,statusMessage:`Nuxt OG Image trying to render an invalid component. Received options ${JSON.stringify(b)}`});const x=p([b.component,b]),O=await $fetch(`/__nuxt_island/${b.component}_${x}`,{params:{props:JSON.stringify(b)}}),T=d();T.push(O.head);let k="sans-serif";const L=h[0];L&&(k=L.name);let R=O.html;try{R=m.parse(R,{folder:"svg",ext:".svg"})}catch{}T.push({style:[{innerHTML:`body { font-family: '${k.replace("+"," ")}', sans-serif;  }`},{innerHTML:`body {\n    transform: scale(${u||1});\n    transform-origin: top left;\n    max-height: 100vh;\n    position: relative;\n    width: ${b.width}px;\n    height: ${b.height}px;\n    overflow: hidden;\n    background-color: ${"dark"===$?"#1b1b1b":"#fff"};\n}\nimg.emoji {\n   height: 1em;\n   width: 1em;\n   margin: 0 .05em 0 .1em;\n   vertical-align: -0.1em;\n}`},...h.filter((t=>t.path)).map((t=>`\n          @font-face {\n            font-family: '${t.name}';\n            font-style: normal;\n            font-weight: ${t.weight};\n            src: url('${t.path}') format('truetype');\n          }\n          `))],meta:[{charset:"utf-8"}],script:[{src:"https://cdn.tailwindcss.com"},{innerHTML:`tailwind.config = {\n  corePlugins: {\n    preflight: false,\n  },\n  theme: ${JSON.stringify(f?.tailwindConfig?.theme||{})}\n}`}],link:[{href:"https://cdn.jsdelivr.net/npm/gardevoir",rel:"stylesheet"},...h.filter((t=>!t.path)).map((t=>({href:`https://fonts.googleapis.com/css2?family=${t.name}:wght@${t.weight}&display=swap`,rel:"stylesheet"})))]}),R=R.replaceAll(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");const S=await l(T);let j=`<!DOCTYPE html>\n<html ${S.htmlAttrs}>\n<head>${S.headTags}</head>\n<body ${S.bodyAttrs}>${S.bodyTagsOpen}<div style="position: relative; display: flex; margin: 0 auto; width: ${b.width}px; height: ${b.height}px; overflow: hidden;">${R}</div>${S.bodyTags}</body>\n</html>`;const A=v;if(!A.__mock){let t=!1;const e=j.match(/<link rel="stylesheet" href=".*?">/g);if(e)for(const n of e)if(n.includes(`${b.component.replace("OgImageTemplate","").replace("OgImage","")}.vue`)){const e=n.match(/href="(.*?)"/)[1];try{let i=await(await $fetch(e,{baseURL:w})).text();i.includes("const __vite__css =")&&(i=i.match(/const __vite__css = "(.*)"/)[1].replace(/\\n/g,"\n")),i=i.replace(/\/\*# sourceMappingURL=.*?\*\//g,"").replaceAll("! important","").replaceAll("!important"),j=j.replace(n,`<style>${i}</style>`),t=!0}catch{}}else j=j.replace(n,"");if(t)try{j=await A(j,{url:w})}catch{}}return j}));export{f as default};