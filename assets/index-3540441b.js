var bt=Object.defineProperty;var Nt=(e,t,n)=>t in e?bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ee=(e,t,n)=>(Nt(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();function L(){}function wt(e,t){for(const n in t)e[n]=t[n];return e}function rt(e){return e()}function Ye(){return Object.create(null)}function x(e){e.forEach(rt)}function ut(e){return typeof e=="function"}function te(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let Ee;function Je(e,t){return Ee||(Ee=document.createElement("a")),Ee.href=t,e===Ee.href}function Pt(e,t){return e!=e?t==t:e!==t}function Et(e){return Object.keys(e).length===0}function Ae(e,...t){if(e==null)return L;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function re(e){let t;return Ae(e,n=>t=n)(),t}function $(e,t,n){e.$$.on_destroy.push(Ae(t,n))}function St(e,t,n,o){if(e){const i=ct(e,t,n,o);return e[0](i)}}function ct(e,t,n,o){return e[1]&&o?wt(n.ctx.slice(),e[1](o(t))):n.ctx}function Ct(e,t,n,o){if(e[2]&&o){const i=e[2](o(n));if(t.dirty===void 0)return i;if(typeof i=="object"){const l=[],s=Math.max(t.dirty.length,i.length);for(let a=0;a<s;a+=1)l[a]=t.dirty[a]|i[a];return l}return t.dirty|i}return t.dirty}function kt(e,t,n,o,i,l){if(i){const s=ct(t,n,o,l);e.p(s,i)}}function At(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let o=0;o<n;o++)t[o]=-1;return t}return-1}function Ve(e){return e??""}function F(e,t,n){return e.set(n),t}function N(e,t){e.appendChild(t)}function I(e,t,n){e.insertBefore(t,n||null)}function B(e){e.parentNode&&e.parentNode.removeChild(e)}function Oe(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function w(e){return document.createElement(e)}function at(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function Ne(e){return document.createTextNode(e)}function M(){return Ne(" ")}function ft(){return Ne("")}function S(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function he(e){return function(t){return t.preventDefault(),e.call(this,t)}}function Ot(e){return function(t){return t.stopPropagation(),e.call(this,t)}}function De(e){return function(t){t.target===this&&e.call(this,t)}}function p(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Dt(e){let t;return{p(...n){t=n,t.forEach(o=>e.push(o))},r(){t.forEach(n=>e.splice(e.indexOf(n),1))}}}function Mt(e){return Array.from(e.childNodes)}function dt(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function Me(e,t){e.value=t??""}function Se(e,t,n,o){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}function Y(e,t,n){e.classList[n?"add":"remove"](t)}function zt(e,t,{bubbles:n=!1,cancelable:o=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(e,n,o,t),i}let ye;function ve(e){ye=e}function Fe(){if(!ye)throw new Error("Function called outside component initialization");return ye}function Bt(e){Fe().$$.on_mount.push(e)}function Lt(e){Fe().$$.on_destroy.push(e)}function It(){const e=Fe();return(t,n,{cancelable:o=!1}={})=>{const i=e.$$.callbacks[t];if(i){const l=zt(t,n,{cancelable:o});return i.slice().forEach(s=>{s.call(e,l)}),!l.defaultPrevented}return!0}}function We(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(o=>o.call(this,t))}const de=[],Q=[];let _e=[];const Te=[],Jt=Promise.resolve();let je=!1;function Tt(){je||(je=!0,Jt.then(ht))}function Ue(e){_e.push(e)}function pe(e){Te.push(e)}const Ie=new Set;let ae=0;function ht(){if(ae!==0)return;const e=ye;do{try{for(;ae<de.length;){const t=de[ae];ae++,ve(t),jt(t.$$)}}catch(t){throw de.length=0,ae=0,t}for(ve(null),de.length=0,ae=0;Q.length;)Q.pop()();for(let t=0;t<_e.length;t+=1){const n=_e[t];Ie.has(n)||(Ie.add(n),n())}_e.length=0}while(de.length);for(;Te.length;)Te.pop()();je=!1,Ie.clear(),ve(e)}function jt(e){if(e.fragment!==null){e.update(),x(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Ue)}}function Ut(e){const t=[],n=[];_e.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),_e=t}const ke=new Set;let ue;function He(){ue={r:0,c:[],p:ue}}function Re(){ue.r||x(ue.c),ue=ue.p}function k(e,t){e&&e.i&&(ke.delete(e),e.i(t))}function z(e,t,n,o){if(e&&e.o){if(ke.has(e))return;ke.add(e),ue.c.push(()=>{ke.delete(e),o&&(n&&e.d(1),o())}),e.o(t)}else o&&o()}function ge(e,t,n){const o=e.$$.props[t];o!==void 0&&(e.$$.bound[o]=n,n(e.$$.ctx[o]))}function V(e){e&&e.c()}function H(e,t,n,o){const{fragment:i,after_update:l}=e.$$;i&&i.m(t,n),o||Ue(()=>{const s=e.$$.on_mount.map(rt).filter(ut);e.$$.on_destroy?e.$$.on_destroy.push(...s):x(s),e.$$.on_mount=[]}),l.forEach(Ue)}function R(e,t){const n=e.$$;n.fragment!==null&&(Ut(n.after_update),x(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function qt(e,t){e.$$.dirty[0]===-1&&(de.push(e),Tt(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ne(e,t,n,o,i,l,s,a=[-1]){const c=ye;ve(e);const r=e.$$={fragment:null,ctx:[],props:l,update:L,not_equal:i,bound:Ye(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:Ye(),dirty:a,skip_bound:!1,root:t.target||c.$$.root};s&&s(r.root);let d=!1;if(r.ctx=n?n(e,t.props||{},(u,f,..._)=>{const h=_.length?_[0]:f;return r.ctx&&i(r.ctx[u],r.ctx[u]=h)&&(!r.skip_bound&&r.bound[u]&&r.bound[u](h),d&&qt(e,u)),f}):[],r.update(),d=!0,x(r.before_update),r.fragment=o?o(r.ctx):!1,t.target){if(t.hydrate){const u=Mt(t.target);r.fragment&&r.fragment.l(u),u.forEach(B)}else r.fragment&&r.fragment.c();t.intro&&k(e.$$.fragment),H(e,t.target,t.anchor,t.customElement),ht()}ve(c)}class oe{$destroy(){R(this,1),this.$destroy=L}$on(t,n){if(!ut(n))return L;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const i=o.indexOf(n);i!==-1&&o.splice(i,1)}}$set(t){this.$$set&&!Et(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function Ft(e){let t,n,o,i,l;return{c(){t=w("button"),n=w("img"),Je(n.src,o=e[0])||p(n,"src",o),p(n,"alt",e[1]),p(n,"class","svelte-x6zymk"),p(t,"title",e[1]),p(t,"class","svelte-x6zymk")},m(s,a){I(s,t,a),N(t,n),i||(l=[S(t,"click",e[2]),S(t,"keypress",e[3])],i=!0)},p(s,[a]){a&1&&!Je(n.src,o=s[0])&&p(n,"src",o),a&2&&p(n,"alt",s[1]),a&2&&p(t,"title",s[1])},i:L,o:L,d(s){s&&B(t),i=!1,x(l)}}}function Ht(e,t,n){let{src:o}=t,{label:i}=t;function l(a){We.call(this,e,a)}function s(a){We.call(this,e,a)}return e.$$set=a=>{"src"in a&&n(0,o=a.src),"label"in a&&n(1,i=a.label)},[o,i,l,s]}class Ce extends oe{constructor(t){super(),ne(this,t,Ht,Ft,Pt,{src:0,label:1})}}const fe=[];function Z(e,t=L){let n;const o=new Set;function i(a){if(te(e,a)&&(e=a,n)){const c=!fe.length;for(const r of o)r[1](),fe.push(r,e);if(c){for(let r=0;r<fe.length;r+=2)fe[r][0](fe[r+1]);fe.length=0}}}function l(a){i(a(e))}function s(a,c=L){const r=[a,c];return o.add(r),o.size===1&&(n=t(i)||L),a(e),()=>{o.delete(r),o.size===0&&n&&(n(),n=null)}}return{set:i,update:l,subscribe:s}}class ze{constructor(t,n,o=null){ee(this,"_startPos");ee(this,"_endPos");ee(this,"_display",Z(!0));ee(this,"_svgPath");ee(this,"startNode");ee(this,"endNode");this.startNode=t,this.endNode=n,this._display.set(o??(t!==null&&n!==null)),this._startPos=Z({x:0,y:0}),this._endPos=Z({x:0,y:0}),this._svgPath=Z(this.generateSvgPath())}initialised(){return this._startPos!==null&&this._endPos!==null}mousePos(t,n=!0){this.display=n,this.startNode!==null?this.endPoint=t:this.endNode!==null&&(this.startPoint=t)}update(t,n=!1){n?this.endPoint=t:this.startPoint=t}disconnect(){this.startNode=null,this.endNode=null}setStartNode(t){this.startNode=t}setEndNode(t){this.endNode!==null&&t===null&&(this.endNode.inputConnections=this.endNode.inputConnections.filter(n=>n!==this)),this.endNode=t}getStartNode(){return this.startNode}getEndNode(){return this.endNode}getStartPos(){return this._startPos}getEndPos(){return this._endPos}getDisplay(){return this._display}get startPoint(){return re(this._startPos)}set startPoint(t){this.display&&(this._startPos.set(t),this._svgPath.set(this.generateSvgPath()))}get endPoint(){return re(this._endPos)}set endPoint(t){this.display&&(this._endPos.set(t),this._svgPath.set(this.generateSvgPath()))}get display(){return re(this._display)}set display(t){this._display.set(t)}generateSvgPath(){if(!this.initialised())return"";const t=Math.abs(this.endPoint.x-this.startPoint.x),n={x:this.startPoint.x+t*.5,y:this.startPoint.y},o={x:this.endPoint.x-t*.5,y:this.endPoint.y},i={x:this.endPoint.x,y:this.endPoint.y},l={x:this.startPoint.x+t*.1,y:this.startPoint.y};return`
			M ${this.startPoint.x} ${this.startPoint.y} 
			C ${n.x} ${n.y}, 
			  ${o.x} ${o.y},
			  ${i.x} ${i.y},
			  ${l.x} ${l.y},
			  ${this.endPoint.x} ${this.endPoint.y}
		`}getSvgPath(){return this._svgPath}}ee(ze,"connectorRadius",10);const be=Z({x:0,y:0}),Ge=Z({x:0,y:0}),qe=Z({x:0,y:0});function Rt(){const e=Z([]),{subscribe:t,set:n,update:o}=e;function i(r){return re(e).some(d=>d.name===r)}function l(){re(e).forEach(r=>{r.events.forEach(d=>{d[1]!==null&&(d[1].setEndNode(null),d[1].setStartNode(null),d[1].display=!1)})}),n([])}function s(r){return 207.5+29*r.events.length}function a(r){const d=Math.max(234,r.name.length*15.80585);let u=0;return r.events.forEach(f=>{u=Math.max(u,f[0].length*9.92335)}),d+u}function c(r){let d=!1;return o(u=>(i(r.name)||(d=!0,u.push(r)),u)),d}return{subscribe:t,set:n,update:o,hasState:i,clearStore:l,computeTheoreticalHeight:s,computeTheoreticalWidth:a,createState:c,deleteStateByName(r){o(d=>d.filter(u=>u.name!==r))},deleteState(r){o(d=>d.filter(u=>u!==r?!0:(u.inputConnections.forEach(f=>{f.setEndNode(null),f.display=!1}),u.events.forEach(f=>{f[1]!==null&&(f[1].setEndNode(null),f[1].setStartNode(null),f[1].display=!1)}),!1)))},toJSON(){return re(e).map(r=>(r.name=r.name.slice(0,20),{name:r.name,entryNode:r.entryNode,events:r.events.map(d=>{var u;return{name:d[0],action:((u=d[1].getEndNode())==null?void 0:u.name)??null}}),position:r.position}))},toAutomaton(){let r="",d="";return re(e).forEach(u=>{u.entryNode&&(d+="->"+u.name+`
`),u.events.forEach(f=>{f[1]!==null?r+=`${u.name}:${f[0]}->${f[1].getEndNode().name}
`:r+=`${u.name}:${f[0]}->${u.name}
`})}),d===""?(alert("There is no entry point for the automaton!"),null):d+r},fromJSON(r){l();const d=new Map,u={x:0,y:0};r.forEach(f=>{const _={name:f.name,entryNode:f.entryNode,events:f.events.map(h=>[h.name,null]),position:f.position,inputConnections:[]};d.set(_.name,_),c(_),u.x+=_.position.x+a(_)/2,u.y+=_.position.y+s(_)/2}),r.forEach(f=>{const _=d.get(f.name);for(let h=0;h<f.events.length;h++){const b=d.get(f.events[h].action);b!==void 0&&(_.events[h][1]=new ze(_,b),b.inputConnections.push(_.events[h][1]))}}),u.x/=r.length,u.y/=r.length,u.x*=-1,u.y*=-1,u.x+=window.innerWidth/2,u.y+=window.innerHeight/2,be.set(u)}}}const _t=Z(null),G=Rt();function pt(e,t){if(!e)return;if(e.type!=="application/json"){alert("File is not a JSON file");return}const n=new FileReader;n.onload=o=>{try{const i=JSON.parse(o.target.result);t(i)}catch(i){console.error(i),alert("Error parsing JSON file")}},n.onerror=o=>{console.error(o),alert("Error parsing JSON file")},n.readAsText(e)}function Xt(e){let t,n,o,i,l,s,a,c,r;return n=new Ce({props:{src:"add.svg",label:"Add State"}}),n.$on("click",e[0]),i=new Ce({props:{src:"export.svg",label:"Save"}}),i.$on("click",e[1]),s=new Ce({props:{src:"open.svg",label:"Load"}}),s.$on("click",e[2]),c=new Ce({props:{src:"build.svg",label:"Build"}}),c.$on("click",e[3]),{c(){t=w("nav"),V(n.$$.fragment),o=M(),V(i.$$.fragment),l=M(),V(s.$$.fragment),a=M(),V(c.$$.fragment),p(t,"class","editor__navbar svelte-shcjui")},m(d,u){I(d,t,u),H(n,t,null),N(t,o),H(i,t,null),N(t,l),H(s,t,null),N(t,a),H(c,t,null),r=!0},p:L,i(d){r||(k(n.$$.fragment,d),k(i.$$.fragment,d),k(s.$$.fragment,d),k(c.$$.fragment,d),r=!0)},o(d){z(n.$$.fragment,d),z(i.$$.fragment,d),z(s.$$.fragment,d),z(c.$$.fragment,d),r=!1},d(d){d&&B(t),R(n),R(i),R(s),R(c)}}}function Qe(e,t,n){const o=new Blob([n],{type:t}),i=URL.createObjectURL(o),l=document.createElement("a");l.setAttribute("href",i),l.setAttribute("download",e),l.click()}function $t(e,t,n){let o,i;$(e,be,u=>n(5,o=u)),$(e,G,u=>n(6,i=u));const l=document.createElement("input");l.type="file",l.accept="application/json";function s(u){const f=u.target.files[0];pt(f,G.fromJSON)}Bt(()=>{l.addEventListener("change",s)}),Lt(()=>{l.removeEventListener("change",s)});function a(){const u={name:"New_State "+i.length,entryNode:i.length===0,events:[],position:{x:window.innerWidth/2-o.x,y:window.innerHeight/2-o.y},inputConnections:[]};u.position.x-=G.computeTheoreticalWidth(u)/2,u.position.y-=G.computeTheoreticalHeight(u)/2,G.createState(u)}function c(){const u=G.toJSON();Qe("automaton.json","application/json",JSON.stringify(u))}function r(){l.click()}function d(){const u=G.toAutomaton();u!==null&&Qe("automaton","text/plain",u)}return[a,c,r,d]}class Yt extends oe{constructor(t){super(),ne(this,t,$t,Xt,te,{})}}const Vt="/finite-automaton-nodeEditor/assets/trash-8bae477d.svg";function Wt(e){let t,n;const o=e[9].default,i=St(o,e,e[8],null);return{c(){t=w("div"),i&&i.c(),Se(t,"--pos-x",e[0].x+"px"),Se(t,"--pos-y",e[0].y+"px"),p(t,"class","svelte-1f65sma"),Y(t,"active",e[1])},m(l,s){I(l,t,s),i&&i.m(t,null),n=!0},p(l,[s]){i&&i.p&&(!n||s&256)&&kt(i,o,l,l[8],n?Ct(o,l[8],s,null):At(l[8]),null),(!n||s&1)&&Se(t,"--pos-x",l[0].x+"px"),(!n||s&1)&&Se(t,"--pos-y",l[0].y+"px"),(!n||s&2)&&Y(t,"active",l[1])},i(l){n||(k(i,l),n=!0)},o(l){z(i,l),n=!1},d(l){l&&B(t),i&&i.d(l)}}}function Gt(e,t,n){let{$$slots:o={},$$scope:i}=t;const l=It();let{position:s={x:0,y:0}}=t,{mouseDelta:a={x:0,y:0}}=t,{active:c=!1}=t;function r(h){n(2,a={x:h.clientX-s.x,y:h.clientY-s.y}),n(1,c=!0)}function d(){return s}function u(){return c}function f(h,b){n(0,s={x:h-a.x,y:b-a.y}),l("move",s)}function _(h){n(1,c=!1)}return e.$$set=h=>{"position"in h&&n(0,s=h.position),"mouseDelta"in h&&n(2,a=h.mouseDelta),"active"in h&&n(1,c=h.active),"$$scope"in h&&n(8,i=h.$$scope)},[s,c,a,r,d,u,f,_,i,o]}class gt extends oe{constructor(t){super(),ne(this,t,Gt,Wt,te,{position:0,mouseDelta:2,active:1,mouseDown:3,getPosition:4,isActive:5,newMousePos:6,mouseUp:7})}get mouseDown(){return this.$$.ctx[3]}get getPosition(){return this.$$.ctx[4]}get isActive(){return this.$$.ctx[5]}get newMousePos(){return this.$$.ctx[6]}get mouseUp(){return this.$$.ctx[7]}}const U=Z(null),mt=new Image;mt.src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function Qt(e){let t,n,o,i,l;return{c(){t=w("div"),n=Ne(" "),p(t,"class",o=Ve(e[0])+" svelte-sapybo"),p(t,"draggable","true"),Y(t,"active",e[2])},m(s,a){I(s,t,a),N(t,n),e[14](t),i||(l=[S(t,"dragend",he(e[6])),S(t,"drag",e[4]),S(t,"dragstart",e[3]),S(t,"dragover",he(e[15])),S(t,"dragleave",he(e[16])),S(t,"dragenter",he(e[17])),S(t,"drop",e[5])],i=!0)},p(s,[a]){a&1&&o!==(o=Ve(s[0])+" svelte-sapybo")&&p(t,"class",o),a&5&&Y(t,"active",s[2])},i:L,o:L,d(s){s&&B(t),e[14](null),i=!1,x(l)}}}function Kt(e,t,n){let o,i,l;$(e,U,v=>n(18,o=v)),$(e,qe,v=>n(19,i=v)),$(e,be,v=>n(20,l=v));let s=null,{eventName:a}=t,{parentNode:c}=t,{connection:r=null}=t,{position:d}=t,u=!1;function f(v){c.events.map(A=>(A[0]===a&&(A[1]=v),A))}function _(v){n(7,c.inputConnections=c.inputConnections.filter(A=>A!==v),c)}function h(){if(s===null)return;const v=s.getBoundingClientRect();return{x:v.x+v.width/2-l.x,y:v.y+v.height/2-l.y}}function b(){const v=h();if(v)if(d==="right"){if(r===null||r[1]===null)return;r[1].update(v,!1)}else c.inputConnections.forEach(A=>{A.update(v,!0)})}function J(v){v.dataTransfer.setDragImage(mt,0,0);const A=h();return d==="left"?(c.inputConnections.length==0?(F(U,o=new ze(null,c),o),console.log("Init left connection",A)):(F(U,o=c.inputConnections[c.inputConnections.length-1],o),o.setEndNode(null),console.log("Break a right connection",A)),!1):(F(U,o=r[1],o),o.setStartNode(c),o.setEndNode(null),console.log("Init right connection",A),F(U,o.display=!0,o),o.update({x:A.x,y:A.y},!0),o.update({x:A.x,y:A.y},!1),!1)}function C(){o!==null&&o.mousePos(i)}function E(){o!==null&&(o.getStartNode()!==null&&d==="left"?(console.log("Connection successfully created right to left"),o.setEndNode(c),o.update(h(),!0),c.inputConnections.push(o)):o.getEndNode()!==null&&d==="right"?(console.log("Connection successfully created left to right"),o.setStartNode(c),o.update(h(),!1)):(console.log("Connection cancelled"),F(U,o.display=!1,o)),F(U,o=null,o),n(2,u=!1))}function q(){o!==null&&(console.log("Connection cancelled"),F(U,o.display=!1,o),F(U,o=null,o))}function T(v){Q[v?"unshift":"push"](()=>{s=v,n(1,s)})}const W=()=>{n(2,u=!0)},y=()=>{n(2,u=!1)},g=()=>{n(2,u=!0)};return e.$$set=v=>{"eventName"in v&&n(8,a=v.eventName),"parentNode"in v&&n(7,c=v.parentNode),"connection"in v&&n(9,r=v.connection),"position"in v&&n(0,d=v.position)},e.$$.update=()=>{e.$$.dirty&128&&(c.position,b())},[d,s,u,J,C,E,q,c,a,r,f,_,h,b,T,W,y,g]}class vt extends oe{constructor(t){super(),ne(this,t,Kt,Qt,te,{eventName:8,parentNode:7,connection:9,position:0,addConnection:10,removeInputConnection:11,getPos:12,update:13})}get addConnection(){return this.$$.ctx[10]}get removeInputConnection(){return this.$$.ctx[11]}get getPos(){return this.$$.ctx[12]}get update(){return this.$$.ctx[13]}}function Ke(e){let t;return{c(){t=at("path"),p(t,"d",e[6]),p(t,"stroke",e[0]),p(t,"stroke-linecap",e[1]),p(t,"stroke-width",e[2]),p(t,"fill","none")},m(n,o){I(n,t,o)},p(n,o){o&64&&p(t,"d",n[6]),o&1&&p(t,"stroke",n[0]),o&2&&p(t,"stroke-linecap",n[1]),o&4&&p(t,"stroke-width",n[2])},d(n){n&&B(t)}}}function Zt(e){let t,n=e[5]&&Ke(e);return{c(){n&&n.c(),t=ft()},m(o,i){n&&n.m(o,i),I(o,t,i)},p(o,[i]){o[5]?n?n.p(o,i):(n=Ke(o),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},i:L,o:L,d(o){n&&n.d(o),o&&B(t)}}}function xt(e,t,n){let o,i=L,l=()=>(i(),i=Ae(h,b=>n(5,o=b)),h),s,a=L,c=()=>(a(),a=Ae(_,b=>n(6,s=b)),_);e.$$.on_destroy.push(()=>i()),e.$$.on_destroy.push(()=>a());let{connection:r}=t,{color:d="black"}=t,{lineCap:u="round"}=t,{lineStroke:f=2}=t,_=r==null?void 0:r.getSvgPath();c();let h=r==null?void 0:r.getDisplay();return l(),e.$$set=b=>{"connection"in b&&n(7,r=b.connection),"color"in b&&n(0,d=b.color),"lineCap"in b&&n(1,u=b.lineCap),"lineStroke"in b&&n(2,f=b.lineStroke)},e.$$.update=()=>{e.$$.dirty&128&&(c(n(3,_=r==null?void 0:r.getSvgPath())),l(n(4,h=r==null?void 0:r.getDisplay())))},[d,u,f,_,h,o,s,r]}class en extends oe{constructor(t){super(),ne(this,t,xt,Zt,te,{connection:7,color:0,lineCap:1,lineStroke:2})}}function Ze(e,t,n){const o=e.slice();return o[19]=t[n],o}function xe(e,t,n){const o=e.slice();return o[22]=t[n],o[23]=t,o[24]=n,o}function et(e,t,n){const o=e.slice();return o[22]=t[n],o[25]=t,o[24]=n,o}function tn(e){let t=e[0].name+"",n;return{c(){n=Ne(t)},m(o,i){I(o,n,i)},p(o,i){i&1&&t!==(t=o[0].name+"")&&dt(n,t)},d(o){o&&B(n)}}}function nn(e){let t;return{c(){t=w("span"),t.textContent="Invalid name",p(t,"class","invalid svelte-hz544v")},m(n,o){I(n,t,o)},p:L,d(n){n&&B(t)}}}function tt(e){let t,n,o,i,l,s,a,c,r;function d(){e[11].call(n,e[25],e[24])}function u(){return e[12](e[24])}return{c(){t=w("div"),n=w("input"),o=M(),i=w("button"),l=w("img"),a=M(),p(n,"type","text"),p(n,"name","outputs"),p(n,"id","outputs"),p(n,"class","svelte-hz544v"),Y(n,"invalid",e[0].events.length===0),Je(l.src,s=Vt)||p(l,"src",s),p(l,"alt","trash"),p(l,"class","svelte-hz544v"),p(i,"class","svelte-hz544v"),p(t,"class","node__outputs__events svelte-hz544v")},m(f,_){I(f,t,_),N(t,n),Me(n,e[22][0]),N(t,o),N(t,i),N(i,l),N(t,a),c||(r=[S(n,"input",d),S(i,"click",u)],c=!0)},p(f,_){e=f,_&1&&n.value!==e[22][0]&&Me(n,e[22][0]),_&1&&Y(n,"invalid",e[0].events.length===0)},d(f){f&&B(t),c=!1,x(r)}}}function nt(e){let t,n,o=e[22][0]+"",i,l,s,a,c,r,d,u,f;function _(C){e[13](C,e[22])}function h(C){e[14](C,e[22],e[23],e[24])}function b(C){e[15](C)}let J={position:"right"};return e[22][0]!==void 0&&(J.eventName=e[22][0]),e[22]!==void 0&&(J.connection=e[22]),e[0]!==void 0&&(J.parentNode=e[0]),s=new vt({props:J}),Q.push(()=>ge(s,"eventName",_)),Q.push(()=>ge(s,"connection",h)),Q.push(()=>ge(s,"parentNode",b)),{c(){t=w("div"),n=w("span"),i=Ne(o),l=M(),V(s.$$.fragment),d=M(),p(n,"class","svelte-hz544v"),p(t,"class","node__outputsConnectors__connector svelte-hz544v"),p(t,"id",u="connector-"+(e[0].name+e[22][0]+e[24]))},m(C,E){I(C,t,E),N(t,n),N(n,i),N(t,l),H(s,t,null),N(t,d),f=!0},p(C,E){e=C,(!f||E&1)&&o!==(o=e[22][0]+"")&&dt(i,o);const q={};!a&&E&1&&(a=!0,q.eventName=e[22][0],pe(()=>a=!1)),!c&&E&1&&(c=!0,q.connection=e[22],pe(()=>c=!1)),!r&&E&1&&(r=!0,q.parentNode=e[0],pe(()=>r=!1)),s.$set(q),(!f||E&1&&u!==(u="connector-"+(e[0].name+e[22][0]+e[24])))&&p(t,"id",u)},i(C){f||(k(s.$$.fragment,C),f=!0)},o(C){z(s.$$.fragment,C),f=!1},d(C){C&&B(t),R(s)}}}function on(e){let t,n,o,i,l,s,a,c,r,d,u,f,_=!1,h,b,J,C,E,q,T,W,y,g,v,A,ie,we,se,Be,Le,Xe;n=new vt({props:{position:"left",eventName:"input",parentNode:e[0]}});function $e(m,D){return m[0].name.length===0?nn:tn}let Pe=$e(e),K=Pe(e),ce=e[0].events,j=[];for(let m=0;m<ce.length;m+=1)j[m]=tt(et(e,ce,m));let le=e[0].events,O=[];for(let m=0;m<le.length;m+=1)O[m]=nt(xe(e,le,m));const yt=m=>z(O[m],1,1,()=>{O[m]=null});return Be=Dt(e[9][0]),{c(){t=w("div"),V(n.$$.fragment),o=M(),i=w("h2"),K.c(),l=M(),s=w("button"),s.textContent="Delete this node",a=M(),c=w("div"),r=w("label"),r.textContent="Entry node:",d=M(),u=w("input"),h=M(),b=w("div"),J=w("label"),J.textContent="Name:",C=M(),E=w("input"),q=M(),T=w("div"),W=w("label"),W.textContent="Outputs events:",y=M(),g=w("button"),g.textContent="Add",v=M();for(let m=0;m<j.length;m+=1)j[m].c();A=M(),ie=w("div");for(let m=0;m<O.length;m+=1)O[m].c();p(i,"class","svelte-hz544v"),p(s,"class","node__delete svelte-hz544v"),p(r,"for","entryNode"),p(r,"class","svelte-hz544v"),p(u,"type","radio"),p(u,"name","entryNode"),u.__value=f="entryNoode-"+e[0].name,u.value=u.__value,p(c,"class","node_entryNode"),p(J,"for","name"),p(J,"class","svelte-hz544v"),p(E,"type","text"),p(E,"name","name"),p(E,"id","name"),p(E,"class","svelte-hz544v"),Y(E,"invalid",e[0].name.length===0),p(b,"class","node__name"),p(W,"for","outputs"),p(W,"class","svelte-hz544v"),p(g,"class","svelte-hz544v"),p(T,"class","node__outputs svelte-hz544v"),p(ie,"class","node__outputsConnectors svelte-hz544v"),p(t,"class","node svelte-hz544v"),p(t,"id",we="node-"+e[0].name),Be.p(u)},m(m,D){I(m,t,D),H(n,t,null),N(t,o),N(t,i),K.m(i,null),N(t,l),N(t,s),N(t,a),N(t,c),N(c,r),N(c,d),N(c,u),u.checked=u.__value===e[1],N(t,h),N(t,b),N(b,J),N(b,C),N(b,E),Me(E,e[0].name),N(t,q),N(t,T),N(T,W),N(T,y),N(T,g),N(T,v);for(let X=0;X<j.length;X+=1)j[X]&&j[X].m(T,null);N(t,A),N(t,ie);for(let X=0;X<O.length;X+=1)O[X]&&O[X].m(ie,null);se=!0,Le||(Xe=[S(s,"click",e[7]),S(u,"change",e[8]),S(E,"input",e[10]),S(g,"click",e[5]),S(t,"mousedown",De(e[3])),S(t,"mouseup",De(e[4]))],Le=!0)},p(m,D){const X={};if(D&1&&(X.parentNode=m[0]),n.$set(X),Pe===(Pe=$e(m))&&K?K.p(m,D):(K.d(1),K=Pe(m),K&&(K.c(),K.m(i,null))),(!se||D&1&&f!==(f="entryNoode-"+m[0].name))&&(u.__value=f,u.value=u.__value,_=!0),(_||D&2)&&(u.checked=u.__value===m[1]),D&1&&E.value!==m[0].name&&Me(E,m[0].name),(!se||D&1)&&Y(E,"invalid",m[0].name.length===0),D&65){ce=m[0].events;let P;for(P=0;P<ce.length;P+=1){const me=et(m,ce,P);j[P]?j[P].p(me,D):(j[P]=tt(me),j[P].c(),j[P].m(T,null))}for(;P<j.length;P+=1)j[P].d(1);j.length=ce.length}if(D&1){le=m[0].events;let P;for(P=0;P<le.length;P+=1){const me=xe(m,le,P);O[P]?(O[P].p(me,D),k(O[P],1)):(O[P]=nt(me),O[P].c(),k(O[P],1),O[P].m(ie,null))}for(He(),P=le.length;P<O.length;P+=1)yt(P);Re()}(!se||D&1&&we!==(we="node-"+m[0].name))&&p(t,"id",we)},i(m){if(!se){k(n.$$.fragment,m);for(let D=0;D<le.length;D+=1)k(O[D]);se=!0}},o(m){z(n.$$.fragment,m),O=O.filter(Boolean);for(let D=0;D<O.length;D+=1)z(O[D]);se=!1},d(m){m&&B(t),R(n),K.d(),Oe(j,m),Oe(O,m),Be.r(),Le=!1,x(Xe)}}}function ot(e){let t,n;return t=new en({props:{connection:e[19][1]}}),{c(){V(t.$$.fragment)},m(o,i){H(t,o,i),n=!0},p(o,i){const l={};i&1&&(l.connection=o[19][1]),t.$set(l)},i(o){n||(k(t.$$.fragment,o),n=!0)},o(o){z(t.$$.fragment,o),n=!1},d(o){R(t,o)}}}function sn(e){let t,n,o,i,l;function s(u){e[17](u)}let a={$$slots:{default:[on]},$$scope:{ctx:e}};e[0].position!==void 0&&(a.position=e[0].position),t=new gt({props:a}),e[16](t),Q.push(()=>ge(t,"position",s));let c=e[0].events,r=[];for(let u=0;u<c.length;u+=1)r[u]=ot(Ze(e,c,u));const d=u=>z(r[u],1,1,()=>{r[u]=null});return{c(){V(t.$$.fragment),o=M(),i=at("svg");for(let u=0;u<r.length;u+=1)r[u].c();p(i,"class","svelte-hz544v")},m(u,f){H(t,u,f),I(u,o,f),I(u,i,f);for(let _=0;_<r.length;_+=1)r[_]&&r[_].m(i,null);l=!0},p(u,[f]){const _={};if(f&67108867&&(_.$$scope={dirty:f,ctx:u}),!n&&f&1&&(n=!0,_.position=u[0].position,pe(()=>n=!1)),t.$set(_),f&1){c=u[0].events;let h;for(h=0;h<c.length;h+=1){const b=Ze(u,c,h);r[h]?(r[h].p(b,f),k(r[h],1)):(r[h]=ot(b),r[h].c(),k(r[h],1),r[h].m(i,null))}for(He(),h=c.length;h<r.length;h+=1)d(h);Re()}},i(u){if(!l){k(t.$$.fragment,u);for(let f=0;f<c.length;f+=1)k(r[f]);l=!0}},o(u){z(t.$$.fragment,u),r=r.filter(Boolean);for(let f=0;f<r.length;f+=1)z(r[f]);l=!1},d(u){e[16](null),R(t,u),u&&B(o),u&&B(i),Oe(r,u)}}}function it(e){return e.length===0?[!1,""]:e.includes(" ")?[!1,e.replace(" ","_")]:e.length>20?[!1,e.slice(0,20)]:[!0,e]}function ln(e,t,n){let o;$(e,U,y=>n(18,o=y));let i=null,{value:l}=t,s="";function a(y){_t.set({isActive:i.isActive,newMousePos:i.newMousePos}),i.mouseDown(y)}function c(y){i.mouseUp(y),o&&(F(U,o.display=!1,o),F(U,o=null,o))}function r(){n(0,l.events=[...l.events,[String(l.events.length),new ze(null,null)]],l)}function d(y){l.events[y][1].setEndNode(null),n(0,l.events=l.events.slice(0,y).concat(l.events.slice(y+1)),l)}function u(){confirm("Are you sure you want to delete this node?")&&G.deleteState(l)}const f=[[]];function _(){s=this.__value,n(1,s)}function h(){l.name=this.value,n(0,l),n(1,s)}function b(y,g){y[g][0]=this.value,n(0,l),n(1,s)}const J=y=>d(y);function C(y,g){e.$$.not_equal(g[0],y)&&(g[0]=y,n(0,l),n(1,s))}function E(y,g,v,A){v[A]=y,n(0,l),n(1,s)}function q(y){l=y,n(0,l),n(1,s)}function T(y){Q[y?"unshift":"push"](()=>{i=y,n(2,i)})}function W(y){e.$$.not_equal(l.position,y)&&(l.position=y,n(0,l),n(1,s))}return e.$$set=y=>{"value"in y&&n(0,l=y.value)},e.$$.update=()=>{if(e.$$.dirty&3&&n(0,l.entryNode=s==="entryNoode-"+l.name,l),e.$$.dirty&1){const[y,g]=it(l.name);!y&&g.length>0&&n(0,l.name=g,l)}e.$$.dirty&1&&l.events.forEach(y=>{const[g,v]=it(y[0]);!g&&v.length>0&&(y[0]=v)})},[l,s,i,a,c,r,d,u,_,f,h,b,J,C,E,q,T,W]}class rn extends oe{constructor(t){super(),ne(this,t,ln,sn,te,{value:0})}}function st(e,t,n){const o=e.slice();return o[20]=t[n],o[21]=t,o[22]=n,o}function lt(e){let t,n,o;function i(s){e[13](s,e[20],e[21],e[22])}let l={};return e[20]!==void 0&&(l.value=e[20]),t=new rn({props:l}),Q.push(()=>ge(t,"value",i)),{c(){V(t.$$.fragment)},m(s,a){H(t,s,a),o=!0},p(s,a){e=s;const c={};!n&&a&16&&(n=!0,c.value=e[20],pe(()=>n=!1)),t.$set(c)},i(s){o||(k(t.$$.fragment,s),o=!0)},o(s){z(t.$$.fragment,s),o=!1},d(s){R(t,s)}}}function un(e){let t,n,o=e[4],i=[];for(let s=0;s<o.length;s+=1)i[s]=lt(st(e,o,s));const l=s=>z(i[s],1,1,()=>{i[s]=null});return{c(){for(let s=0;s<i.length;s+=1)i[s].c();t=ft()},m(s,a){for(let c=0;c<i.length;c+=1)i[c]&&i[c].m(s,a);I(s,t,a),n=!0},p(s,a){if(a&16){o=s[4];let c;for(c=0;c<o.length;c+=1){const r=st(s,o,c);i[c]?(i[c].p(r,a),k(i[c],1)):(i[c]=lt(r),i[c].c(),k(i[c],1),i[c].m(t.parentNode,t))}for(He(),c=o.length;c<i.length;c+=1)l(c);Re()}},i(s){if(!n){for(let a=0;a<o.length;a+=1)k(i[a]);n=!0}},o(s){i=i.filter(Boolean);for(let a=0;a<i.length;a+=1)z(i[a]);n=!1},d(s){Oe(i,s),s&&B(t)}}}function cn(e){let t,n,o,i,l,s,a,c,r,d;i=new Yt({});function u(_){e[15](_)}let f={$$slots:{default:[un]},$$scope:{ctx:e}};return e[3]!==void 0&&(f.position=e[3]),s=new gt({props:f}),e[14](s),Q.push(()=>ge(s,"position",u)),{c(){t=w("section"),t.innerHTML='<div class="fileDragOverlay__content svelte-nmbowb"><h1>Drop your file here to open it</h1></div>',n=M(),o=w("section"),V(i.$$.fragment),l=M(),V(s.$$.fragment),p(t,"class","fileDragOverlay svelte-nmbowb"),Y(t,"active",e[2]),p(o,"class","editor svelte-nmbowb"),Y(o,"active",e[1])},m(_,h){I(_,t,h),I(_,n,h),I(_,o,h),H(i,o,null),N(o,l),H(s,o,null),c=!0,r||(d=[S(window,"mousemove",e[5]),S(window,"dragenter",e[10]),S(window,"dragleave",e[11]),S(window,"dragover",e[5]),S(t,"drop",Ot(he(e[9]))),S(t,"dragover",he(e[12])),S(o,"mousemove",e[6]),S(o,"mousedown",De(e[7])),S(o,"mouseup",De(e[8]))],r=!0)},p(_,[h]){(!c||h&4)&&Y(t,"active",_[2]);const b={};h&8388624&&(b.$$scope={dirty:h,ctx:_}),!a&&h&8&&(a=!0,b.position=_[3],pe(()=>a=!1)),s.$set(b),(!c||h&2)&&Y(o,"active",_[1])},i(_){c||(k(i.$$.fragment,_),k(s.$$.fragment,_),c=!0)},o(_){z(i.$$.fragment,_),z(s.$$.fragment,_),c=!1},d(_){_&&B(t),_&&B(n),_&&B(o),R(i),e[14](null),R(s),r=!1,x(d)}}}function an(e,t,n){let o,i,l,s,a,c;$(e,U,g=>n(16,o=g)),$(e,be,g=>n(3,i=g)),$(e,_t,g=>n(17,l=g)),$(e,qe,g=>n(18,s=g)),$(e,Ge,g=>n(19,a=g)),$(e,G,g=>n(4,c=g));let r=null,d=!1,u=!1;function f(g){F(Ge,a={x:g.clientX,y:g.clientY},a),F(qe,s={x:g.clientX-i.x,y:g.clientY-i.y},s)}function _(g){if(l!=null&&l.isActive()){l.newMousePos(g.clientX,g.clientY);return}if(r.isActive()){r.newMousePos(g.clientX,g.clientY);return}o!==null&&o.mousePos({x:g.clientX-i.x,y:g.clientY-i.y},o.display)}function h(g){n(1,d=!0),r.mouseDown(g)}function b(g){n(1,d=!1),r.mouseUp(g),o!==null&&(console.log("connection cancelled"),F(U,o=null,o))}function J(g){n(2,u=!1);const v=g.dataTransfer.files[0];pt(v,G.fromJSON)}function C(g){g.dataTransfer.types.includes("Files")&&n(2,u=!0)}function E(g){n(2,u=!1)}const q=g=>n(2,u=!0);function T(g,v,A,ie){A[ie]=g,G.set(c)}function W(g){Q[g?"unshift":"push"](()=>{r=g,n(0,r)})}function y(g){i=g,be.set(i)}return[r,d,u,i,c,f,_,h,b,J,C,E,q,T,W,y]}class fn extends oe{constructor(t){super(),ne(this,t,an,cn,te,{})}}function dn(e){let t,n,o,i,l;return i=new fn({}),{c(){t=w("main"),n=w("header"),n.innerHTML=`<h1 class="svelte-1mo23u5">Finite automaton editor</h1> 
	<nav class="svelte-1mo23u5"><a href="https://github.com/Robotechnic/finite-automaton" class="svelte-1mo23u5">About the language</a> 
		<a href="http://github.com" class="svelte-1mo23u5">Git Hub</a></nav>`,o=M(),V(i.$$.fragment),p(n,"class","svelte-1mo23u5")},m(s,a){I(s,t,a),N(t,n),N(t,o),H(i,t,null),l=!0},p:L,i(s){l||(k(i.$$.fragment,s),l=!0)},o(s){z(i.$$.fragment,s),l=!1},d(s){s&&B(t),R(i)}}}class hn extends oe{constructor(t){super(),ne(this,t,null,dn,te,{})}}new hn({target:document.getElementById("app")});