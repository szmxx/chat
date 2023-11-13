import{d as e,w as t}from"../index.mjs";import"node:os";import"node:cluster";import"node:http";import"node:https";import"node:zlib";import"node:stream";import"node:buffer";import"node:util";import"node:url";import"node:net";import"node:fs";import"node:path";import"fs";import"path";var n=Object.defineProperty,l=(e,t)=>n(e,"name",{value:t,configurable:!0});let a=0;const r={START_BOUNDARY:a++,HEADER_FIELD_START:a++,HEADER_FIELD:a++,HEADER_VALUE_START:a++,HEADER_VALUE:a++,HEADER_VALUE_ALMOST_DONE:a++,HEADERS_ALMOST_DONE:a++,PART_DATA_START:a++,PART_DATA:a++,END:a++};let o=1;const i=o,s=o*=2,d=l((e=>32|e),"lower"),E=l((()=>{}),"noop"),A=class{constructor(e){this.index=0,this.flags=0,this.onHeaderEnd=E,this.onHeaderField=E,this.onHeadersEnd=E,this.onHeaderValue=E,this.onPartBegin=E,this.onPartData=E,this.onPartEnd=E,this.boundaryChars={},e="\r\n--"+e;const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n),this.boundaryChars[t[n]]=!0;this.boundary=t,this.lookbehind=new Uint8Array(this.boundary.length+8),this.state=r.START_BOUNDARY}write(e){let t=0;const n=e.length;let a=this.index,{lookbehind:o,boundary:E,boundaryChars:A,index:h,state:D,flags:c}=this;const f=this.boundary.length,T=f-1,_=e.length;let u,p;const R=l((e=>{this[e+"Mark"]=t}),"mark"),b=l((e=>{delete this[e+"Mark"]}),"clear"),m=l(((e,t,n,a)=>{(void 0===t||t!==n)&&this[e](a&&a.subarray(t,n))}),"callback"),H=l(((n,a)=>{const r=n+"Mark";r in this&&(a?(m(n,this[r],t,e),delete this[r]):(m(n,this[r],e.length,e),this[r]=0))}),"dataCallback");for(t=0;t<n;t++)switch(u=e[t],D){case r.START_BOUNDARY:if(h===E.length-2){if(45===u)c|=s;else if(13!==u)return;h++;break}if(h-1==E.length-2){if(c&s&&45===u)D=r.END,c=0;else{if(c&s||10!==u)return;h=0,m("onPartBegin"),D=r.HEADER_FIELD_START}break}u!==E[h+2]&&(h=-2),u===E[h+2]&&h++;break;case r.HEADER_FIELD_START:D=r.HEADER_FIELD,R("onHeaderField"),h=0;case r.HEADER_FIELD:if(13===u){b("onHeaderField"),D=r.HEADERS_ALMOST_DONE;break}if(h++,45===u)break;if(58===u){if(1===h)return;H("onHeaderField",!0),D=r.HEADER_VALUE_START;break}if(p=d(u),p<97||p>122)return;break;case r.HEADER_VALUE_START:if(32===u)break;R("onHeaderValue"),D=r.HEADER_VALUE;case r.HEADER_VALUE:13===u&&(H("onHeaderValue",!0),m("onHeaderEnd"),D=r.HEADER_VALUE_ALMOST_DONE);break;case r.HEADER_VALUE_ALMOST_DONE:if(10!==u)return;D=r.HEADER_FIELD_START;break;case r.HEADERS_ALMOST_DONE:if(10!==u)return;m("onHeadersEnd"),D=r.PART_DATA_START;break;case r.PART_DATA_START:D=r.PART_DATA,R("onPartData");case r.PART_DATA:if(a=h,0===h){for(t+=T;t<_&&!(e[t]in A);)t+=f;t-=T,u=e[t]}if(h<E.length)E[h]===u?(0===h&&H("onPartData",!0),h++):h=0;else if(h===E.length)h++,13===u?c|=i:45===u?c|=s:h=0;else if(h-1===E.length)if(c&i){if(h=0,10===u){c&=~i,m("onPartEnd"),m("onPartBegin"),D=r.HEADER_FIELD_START;break}}else c&s&&45===u?(m("onPartEnd"),D=r.END,c=0):h=0;if(h>0)o[h-1]=u;else if(a>0){const e=new Uint8Array(o.buffer,o.byteOffset,o.byteLength);m("onPartData",0,a,e),a=0,R("onPartData"),t--}break;case r.END:break;default:throw new Error(`Unexpected state entered: ${D}`)}H("onHeaderField"),H("onHeaderValue"),H("onPartData"),this.index=h,this.state=D,this.flags=c}end(){if(this.state===r.HEADER_FIELD_START&&0===this.index||this.state===r.PART_DATA&&this.index===this.boundary.length)this.onPartEnd();else if(this.state!==r.END)throw new Error("MultipartParser.end(): stream ended unexpectedly")}};l(A,"MultipartParser");let h=A;function k(e){const t=e.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);if(!t)return;const n=t[2]||t[3]||"";let a=n.slice(n.lastIndexOf("\\")+1);return a=a.replace(/%22/g,'"'),a=a.replace(/&#(\d{4});/g,((e,t)=>String.fromCharCode(t))),a}async function B(n,a){if(!/multipart/i.test(a))throw new TypeError("Failed to fetch");const r=a.match(/boundary=(?:"([^"]+)"|([^;]+))/i);if(!r)throw new TypeError("no or bad content-type header, no multipart boundary");const o=new h(r[1]||r[2]);let i,s,d,E,A,D;const c=[],f=new e,T=l((e=>{d+=R.decode(e,{stream:!0})}),"onPartData"),_=l((e=>{c.push(e)}),"appendToFile"),u=l((()=>{const e=new t(c,D,{type:A});f.append(E,e)}),"appendFileToFormData"),p=l((()=>{f.append(E,d)}),"appendEntryToFormData"),R=new TextDecoder("utf-8");R.decode(),o.onPartBegin=function(){o.onPartData=T,o.onPartEnd=p,i="",s="",d="",E="",A="",D=null,c.length=0},o.onHeaderField=function(e){i+=R.decode(e,{stream:!0})},o.onHeaderValue=function(e){s+=R.decode(e,{stream:!0})},o.onHeaderEnd=function(){if(s+=R.decode(),i=i.toLowerCase(),"content-disposition"===i){const e=s.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);e&&(E=e[2]||e[3]||""),D=k(s),D&&(o.onPartData=_,o.onPartEnd=u)}else"content-type"===i&&(A=s);s="",i=""};for await(const e of n)o.write(e);return o.end(),f}l(k,"_fileName"),l(B,"toFormData");export{B as toFormData};
