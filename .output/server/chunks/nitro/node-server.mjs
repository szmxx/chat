import{T as o,i as s,w as r,d as t,l as n,a,t as i,W as l,b as c,n as d,c as m,u as f,e as h,s as v}from"../../index.mjs";import{Server as T}from"node:http";import{Server as u}from"node:https";import"node:os";import"node:cluster";import"node:zlib";import"node:stream";import"node:buffer";import"node:util";import"node:url";import"node:net";import"node:fs";import"node:path";import"fs";import"path";var b=Object.defineProperty,p=(o,s)=>b(o,"name",{value:s,configurable:!0}),O=Object.defineProperty,R=p(((o,s)=>O(o,"name",{value:s,configurable:!0})),"a");function e(o,s){if(!(o in globalThis))try{globalThis[o]=s}catch{}}p(e,"e"),R(e,"polyfill"),e("fetch",o),e("Blob",s),e("File",r),e("FormData",t),e("Headers",n),e("Request",a),e("Response",i),e("AbortController",l);const g=process.env.NITRO_SSL_CERT,S=process.env.NITRO_SSL_KEY,$=g&&S?new u({key:S,cert:g},c(d.h3App)):new T(c(d.h3App)),_=m(process.env.NITRO_PORT||process.env.PORT)||3e3,y=process.env.NITRO_HOST||process.env.HOST,I=process.env.NITRO_UNIX_SOCKET,N=$.listen(I?{path:I}:{port:_,host:y},(o=>{o&&(console.error(o),process.exit(1));const s=g&&S?"https":"http",r=N.address();if("string"==typeof r)return void console.log(`Listening on unix socket ${r}`);const t=(f().app.baseURL||"").replace(/\/$/,""),n=`${s}://${"IPv6"===r.family?`[${r.address}]`:r.address}:${r.port}${t}`;console.log(`Listening on ${n}`)}));h(),v(N,d);
