import{defineAsyncComponent as t,defineComponent as e,createVNode as o}from"vue";import{c as r}from"../server.mjs";import"../../../index.mjs";import"node:os";import"node:cluster";import"node:http";import"node:https";import"node:zlib";import"node:stream";import"node:buffer";import"node:util";import"node:url";import"node:net";import"node:fs";import"node:path";import"fs";import"path";import"../../index.mjs";import"@unhead/shared";import"vue-router";import"@intlify/core-base";import"is-https";import"vue/server-renderer";const n=t((()=>import("./Fallback-62aa3a4f.mjs").then((t=>t.default||t)))),p=Object.freeze({__proto__:null,OgImageTemplateFallback:n}),m=e({props:{context:{type:Object,required:!0}},setup(t){const e=p[t.context.name];if(!e)throw r({statusCode:404,statusMessage:`Island component not found: ${t.context.name}`});return()=>o(e||"span",{...t.context.props,"nuxt-ssr-component-uid":""})}});export{m as default};