var TV=Object.defineProperty,xV=Object.defineProperties;var vV=Object.getOwnPropertyDescriptors;var st=Object.getOwnPropertySymbols;var RV=Object.prototype.hasOwnProperty,DV=Object.prototype.propertyIsEnumerable;var Ne=(V,e,t)=>e in V?TV(V,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):V[e]=t,F=(V,e)=>{for(var t in e||(e={}))RV.call(e,t)&&Ne(V,t,e[t]);if(st)for(var t of st(e))DV.call(e,t)&&Ne(V,t,e[t]);return V},L=(V,e)=>xV(V,vV(e));var h=(V,e,t)=>(Ne(V,typeof e!="symbol"?e+"":e,t),t);function rt(V){return{name:"DeviceDetectorOptions",type:"object",required:!1,allowEmpty:!1,properties:{networkDetect:{required:!1,type:"object",properties:{sdkAppId:{required:!0,type:"number"},userId:{required:!0,type:"string"},userSig:{required:!0,type:"string"},downlinkUserId:{required:!1,type:"string"},downlinkUserSig:{required:!1,type:"string"},roomId:{required:!1,type:"number"}},async validate(e,t,i,A){let{RtcError:o,ErrorCode:s,ErrorCodeDictionary:n}=V.errorModule;if(!e)return;let{sdkAppId:r,userId:p,userSig:l,downlinkUserId:d,downlinkUserSig:m,roomId:c}=e;c=c||8080;let w=V.TRTC.create(),D=V.TRTC.create();await w.enterRoom({roomId:c,sdkAppId:r,userId:p,userSig:l}),await w.exitRoom(),d&&m&&(await D.enterRoom({roomId:c,sdkAppId:r,userId:d,userSig:m}),await D.exitRoom())}}}}}function be(V){return{name:"StopDeviceDetectorOptions",required:!1}}var ce=globalThis,pe=ce.ShadowRoot&&(ce.ShadyCSS===void 0||ce.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol(),nt=new WeakMap,le=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==at)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(pe&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=nt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&nt.set(t,e))}return e}toString(){return this.cssText}},qt=V=>new le(typeof V=="string"?V:V+"",void 0,at);var Oe=(V,e)=>{if(pe)V.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),A=ce.litNonce;A!==void 0&&i.setAttribute("nonce",A),i.textContent=t.cssText,V.appendChild(i)}},de=pe?V=>V:V=>V instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return qt(t)})(V):V;var{is:yV,defineProperty:kV,getOwnPropertyDescriptor:BV,getOwnPropertyNames:NV,getOwnPropertySymbols:bV,getPrototypeOf:OV}=Object,x=globalThis,ct=x.trustedTypes,QV=ct?ct.emptyScript:"",Qe=x.reactiveElementPolyfillSupport,j=(V,e)=>V,Fe={toAttribute(V,e){switch(e){case Boolean:V=V?QV:null;break;case Object:case Array:V=V==null?V:JSON.stringify(V)}return V},fromAttribute(V,e){let t=V;switch(e){case Boolean:t=V!==null;break;case Number:t=V===null?null:Number(V);break;case Object:case Array:try{t=JSON.parse(V)}catch(i){t=null}}return t}},gt=(V,e)=>!yV(V,e),lt={attribute:!0,type:String,converter:Fe,reflect:!1,hasChanged:gt},pt,dt;(pt=Symbol.metadata)!=null||(Symbol.metadata=Symbol("metadata")),(dt=x.litPropertyMetadata)!=null||(x.litPropertyMetadata=new WeakMap);var U=class extends HTMLElement{static addInitializer(e){var t;this._$Ei(),((t=this.l)!=null?t:this.l=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=lt){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),A=this.getPropertyDescriptor(e,i,t);A!==void 0&&kV(this.prototype,e,A)}}static getPropertyDescriptor(e,t,i){var s;let{get:A,set:o}=(s=BV(this.prototype,e))!=null?s:{get(){return this[t]},set(n){this[t]=n}};return{get(){return A==null?void 0:A.call(this)},set(n){let r=A==null?void 0:A.call(this);o.call(this,n),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){var t;return(t=this.elementProperties.get(e))!=null?t:lt}static _$Ei(){if(this.hasOwnProperty(j("elementProperties")))return;let e=OV(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(j("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(j("properties"))){let t=this.properties,i=[...NV(t),...bV(t)];for(let A of i)this.createProperty(A,t[A])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,A]of t)this.elementProperties.set(i,A)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let A=this._$Eu(t,i);A!==void 0&&this._$Eh.set(A,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let A of i)t.unshift(de(A))}else e!==void 0&&t.push(de(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$EO)!=null?t:this._$EO=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){var t;let e=(t=this.shadowRoot)!=null?t:this.attachShadow(this.constructor.shadowRootOptions);return Oe(e,this.constructor.elementStyles),e}connectedCallback(){var e,t;(e=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(i=>{var A;return(A=i.hostConnected)==null?void 0:A.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){var o;let i=this.constructor.elementProperties.get(e),A=this.constructor._$Eu(e,i);if(A!==void 0&&i.reflect===!0){let s=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Fe).toAttribute(t,i.type);this._$Em=e,s==null?this.removeAttribute(A):this.setAttribute(A,s),this._$Em=null}}_$AK(e,t){var o;let i=this.constructor,A=i._$Eh.get(e);if(A!==void 0&&this._$Em!==A){let s=i.getPropertyOptions(A),n=typeof s.converter=="function"?{fromAttribute:s.converter}:((o=s.converter)==null?void 0:o.fromAttribute)!==void 0?s.converter:Fe;this._$Em=A,this[A]=n.fromAttribute(t,s.type),this._$Em=null}}requestUpdate(e,t,i){var A;if(e!==void 0){if(i!=null||(i=this.constructor.getPropertyOptions(e)),!((A=i.hasChanged)!=null?A:gt)(this[e],t))return;this.P(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,i){var A;this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Em!==e&&((A=this._$Ej)!=null?A:this._$Ej=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i,A;if(!this.isUpdatePending)return;if(!this.hasUpdated){if((i=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,n]of o)n.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],n)}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(A=this._$EO)==null||A.forEach(o=>{var s;return(s=o.hostUpdate)==null?void 0:s.call(o)}),this.update(t)):this._$EU()}catch(o){throw e=!1,this._$EU(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var A;return(A=i.hostUpdated)==null?void 0:A.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}},ht;U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[j("elementProperties")]=new Map,U[j("finalized")]=new Map,Qe==null||Qe({ReactiveElement:U}),((ht=x.reactiveElementVersions)!=null?ht:x.reactiveElementVersions=[]).push("2.0.4");var H=globalThis,he=H.trustedTypes,mt=he?he.createPolicy("lit-html",{createHTML:V=>V}):void 0,ft="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,wt="?"+v,FV=`<${wt}>`,B=document,X=()=>B.createComment(""),_=V=>V===null||typeof V!="object"&&typeof V!="function",We=Array.isArray,LV=V=>We(V)||typeof(V==null?void 0:V[Symbol.iterator])=="function",Le=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,Et=/>/g,y=RegExp(`>|${Le}(?:([^\\s"'>=/]+)(${Le}*=${Le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ct=/'/g,It=/"/g,Ut=/^(?:script|style|textarea|title)$/i,je=V=>(e,...t)=>({_$litType$:V,strings:e,values:t}),q=je(1),ai=je(2),qi=je(3),N=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),St=new WeakMap,k=B.createTreeWalker(B,129);function Tt(V,e){if(!We(V)||!V.hasOwnProperty("raw"))throw Error("invalid template strings array");return mt!==void 0?mt.createHTML(e):e}var KV=(V,e)=>{let t=V.length-1,i=[],A,o=e===2?"<svg>":e===3?"<math>":"",s=P;for(let n=0;n<t;n++){let r=V[n],p,l,d=-1,m=0;for(;m<r.length&&(s.lastIndex=m,l=s.exec(r),l!==null);)m=s.lastIndex,s===P?l[1]==="!--"?s=ut:l[1]!==void 0?s=Et:l[2]!==void 0?(Ut.test(l[2])&&(A=RegExp("</"+l[2],"g")),s=y):l[3]!==void 0&&(s=y):s===y?l[0]===">"?(s=A!=null?A:P,d=-1):l[1]===void 0?d=-2:(d=s.lastIndex-l[2].length,p=l[1],s=l[3]===void 0?y:l[3]==='"'?It:Ct):s===It||s===Ct?s=y:s===ut||s===Et?s=P:(s=y,A=void 0);let c=s===y&&V[n+1].startsWith("/>")?" ":"";o+=s===P?r+FV:d>=0?(i.push(p),r.slice(0,d)+ft+r.slice(d)+v+c):r+v+(d===-2?n:c)}return[Tt(V,o+(V[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},$=class V{constructor({strings:e,_$litType$:t},i){let A;this.parts=[];let o=0,s=0,n=e.length-1,r=this.parts,[p,l]=KV(e,t);if(this.el=V.createElement(p,i),k.currentNode=this.el.content,t===2||t===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(A=k.nextNode())!==null&&r.length<n;){if(A.nodeType===1){if(A.hasAttributes())for(let d of A.getAttributeNames())if(d.endsWith(ft)){let m=l[s++],c=A.getAttribute(d).split(v),w=/([.?@])?(.*)/.exec(m);r.push({type:1,index:o,name:w[2],strings:c,ctor:w[1]==="."?Ge:w[1]==="?"?Ze:w[1]==="@"?Je:Y}),A.removeAttribute(d)}else d.startsWith(v)&&(r.push({type:6,index:o}),A.removeAttribute(d));if(Ut.test(A.tagName)){let d=A.textContent.split(v),m=d.length-1;if(m>0){A.textContent=he?he.emptyScript:"";for(let c=0;c<m;c++)A.append(d[c],X()),k.nextNode(),r.push({type:2,index:++o});A.append(d[m],X())}}}else if(A.nodeType===8)if(A.data===wt)r.push({type:2,index:o});else{let d=-1;for(;(d=A.data.indexOf(v,d+1))!==-1;)r.push({type:7,index:o}),d+=v.length-1}o++}}static createElement(e,t){let i=B.createElement("template");return i.innerHTML=e,i}};function K(V,e,t=V,i){var s,n,r;if(e===N)return e;let A=i!==void 0?(s=t.o)==null?void 0:s[i]:t.l,o=_(e)?void 0:e._$litDirective$;return(A==null?void 0:A.constructor)!==o&&((n=A==null?void 0:A._$AO)==null||n.call(A,!1),o===void 0?A=void 0:(A=new o(V),A._$AT(V,t,i)),i!==void 0?((r=t.o)!=null?r:t.o=[])[i]=A:t.l=A),A!==void 0&&(e=K(V,A._$AS(V,e.values),A,i)),e}var Ye=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var p;let{el:{content:t},parts:i}=this._$AD,A=((p=e==null?void 0:e.creationScope)!=null?p:B).importNode(t,!0);k.currentNode=A;let o=k.nextNode(),s=0,n=0,r=i[0];for(;r!==void 0;){if(s===r.index){let l;r.type===2?l=new ee(o,o.nextSibling,this,e):r.type===1?l=new r.ctor(o,r.name,r.strings,this,e):r.type===6&&(l=new ze(o,this,e)),this._$AV.push(l),r=i[++n]}s!==(r==null?void 0:r.index)&&(o=k.nextNode(),s++)}return k.currentNode=B,A}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},ee=class V{get _$AU(){var e,t;return(t=(e=this._$AM)==null?void 0:e._$AU)!=null?t:this.v}constructor(e,t,i,A){var o;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=A,this.v=(o=A==null?void 0:A.isConnected)!=null?o:!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),_(e)?e===I||e==null||e===""?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==N&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):LV(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==I&&_(this._$AH)?this._$AA.nextSibling.data=e:this.T(B.createTextNode(e)),this._$AH=e}$(e){var o;let{values:t,_$litType$:i}=e,A=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=$.createElement(Tt(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===A)this._$AH.p(t);else{let s=new Ye(A,this),n=s.u(this.options);s.p(t),this.T(n),this._$AH=s}}_$AC(e){let t=St.get(e.strings);return t===void 0&&St.set(e.strings,t=new $(e)),t}k(e){We(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,A=0;for(let o of e)A===t.length?t.push(i=new V(this.O(X()),this.O(X()),this,this.options)):i=t[A],i._$AI(o),A++;A<t.length&&(this._$AR(i&&i._$AB.nextSibling,A),t.length=A)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){let A=e.nextSibling;e.remove(),e=A}}setConnected(e){var t;this._$AM===void 0&&(this.v=e,(t=this._$AP)==null||t.call(this,e))}},Y=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,A,o){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=t,this._$AM=A,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}_$AI(e,t=this,i,A){let o=this.strings,s=!1;if(o===void 0)e=K(this,e,t,0),s=!_(e)||e!==this._$AH&&e!==N,s&&(this._$AH=e);else{let n=e,r,p;for(e=o[0],r=0;r<o.length-1;r++)p=K(this,n[i+r],t,r),p===N&&(p=this._$AH[r]),s||(s=!_(p)||p!==this._$AH[r]),p===I?e=I:e!==I&&(e+=(p!=null?p:"")+o[r+1]),this._$AH[r]=p}s&&!A&&this.j(e)}j(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}},Ge=class extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===I?void 0:e}},Ze=class extends Y{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==I)}},Je=class extends Y{constructor(e,t,i,A,o){super(e,t,i,A,o),this.type=5}_$AI(e,t=this){var s;if((e=(s=K(this,e,t,0))!=null?s:I)===N)return;let i=this._$AH,A=e===I&&i!==I||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==I&&(i===I||A);A&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)==null?void 0:t.host)!=null?i:this.element,e):this._$AH.handleEvent(e)}},ze=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}};var Ke=H.litHtmlPolyfillSupport,Mt;Ke==null||Ke($,ee),((Mt=H.litHtmlVersions)!=null?Mt:H.litHtmlVersions=[]).push("3.2.0");var xt=(V,e,t)=>{var o,s;let i=(o=t==null?void 0:t.renderBefore)!=null?o:e,A=i._$litPart$;if(A===void 0){let n=(s=t==null?void 0:t.renderBefore)!=null?s:null;i._$litPart$=A=new ee(e.insertBefore(X(),n),n,void 0,t!=null?t:{})}return A._$AI(V),A};var E=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var t,i;let e=super.createRenderRoot();return(i=(t=this.renderOptions).renderBefore)!=null||(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.o=xt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.o)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.o)==null||e.setConnected(!1)}render(){return N}},vt;E._$litElement$=!0,E.finalized=!0,(vt=globalThis.litElementHydrateSupport)==null||vt.call(globalThis,{LitElement:E});var Pe=globalThis.litElementPolyfillSupport;Pe==null||Pe({LitElement:E});var Rt;((Rt=globalThis.litElementVersions)!=null?Rt:globalThis.litElementVersions=[]).push("4.1.0");var te=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(this.createTemplate()),this.buttonEle=this.shadowRoot.querySelector("button")}createTemplate(){let e=document.createElement("template");return e.innerHTML=`
       <style>
          .button {
         padding: 6px 16px;
         border-radius: 4px;
         border: 0;
         outline: none;
         background-color: transparent;
         user-select: none;
         font-size: 0.875rem;
         min-width: 64px;
         box-sizing: border-box;
         font-weight: 500;
         line-height: 1.75;
         transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
           box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
           border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
       }
       .outlined { 
         /* \u770B\u4E0D\u5230 \u542C\u4E0D\u5230 */
         padding: 5px 15px;
         border: 1px solid #006eff;
         color: #006eff;
         cursor: pointer;
       }
       .contained {
         /* \u542C\u5F97\u5230 */
         cursor: pointer;
         color: #ffffff;
         background-color: #006eff;
         box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
       }
       .disabled {
         /* \u7981\u6B62 \u5F00\u59CB\u68C0\u6D4B */
         box-shadow: none;
         color: rgba(0, 0, 0, 0.26);
         background-color: rgba(0, 0, 0, 0.12);
       }
       .close{
        color: #eeeeee!important;
        border-radius: 20px!important;
        border-color: #eeeeee!important;
       }
      </style>
        <button>
            <slot></slot>
        </button>
      `,e.content.cloneNode(!0)}connectedCallback(){let e=this.getAttribute("type"),t=this.getAttribute("class");this.buttonEle.type="button",this.buttonEle.classList.add("button",e,t);let i=this.getAttribute("on-click");if(i){let A=new Function(i);this.buttonEle.addEventListener("click",()=>{A()})}}attributeChangedCallback(e,t,i){e==="type"&&(this.buttonEle.classList.remove(t),this.buttonEle.classList.add(i)),e==="className"&&(this.buttonEle.classList.remove(t),this.buttonEle.classList.add(i))}};h(te,"observedAttributes",["className","type","on-click"]);customElements.get("trtc-custom-button")||customElements.define("trtc-custom-button",te);var YV=`
    @media screen and (max-width: 769px) {
        .root {
          max-width: 32.5rem;
        }
        .device-detector-backdrop {
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.8);
          z-index: 9999;
          opacity: 1;
          transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }
        .device-detector-backdrop .root {
          position: relative;
          width: 98vw;
          height: 72vh;
          font-size: 16px;
          box-shadow: 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
          background-color: #ffffff;
          border-radius: 4px;
        }
        .device-detector-backdrop .root .stepper {
          border-radius: 5px 5px 0 0;
          font-size: 36px;
        }
        .device-detector-backdrop .root .close {
          color: #eeeeee !important;
          border-radius: 20px !important;
          border-color: #eeeeee !important;
          position: absolute !important;
          cursor: pointer;
          top: -50px;
          right: 2px;
        }
        .arrow {
          width: 0;
          height: 0;
          border-left: 2vh solid transparent;
          border-right: 2vh solid transparent;
          border-bottom: 2vh solid red;
          position: absolute;
          left: 2vw;
          animation: moveUpDown 2s infinite ease-in-out;
          transform:rotate(45deg);
          z-index: 10000;
        }
    
      .arrow::after {
          content: "";
          width: 1.5vh;
          height: 4vh;
          background-color: red;
          position: absolute;
          // top: 9px;  /* \u5C06\u67C4\u5B9A\u4F4D\u5728\u7BAD\u5934\u7684\u4E0B\u65B9 */
          left: 50%;  /* \u6C34\u5E73\u5C45\u4E2D\u67C4 */
          transform: translate(-50%,18%);  /* \u5FAE\u8C03\u67C4\u7684\u6C34\u5E73\u4F4D\u7F6E\uFF0C\u4F7F\u5176\u5B8C\u5168\u5C45\u4E2D */
          z-index: 10000;
        }
    
      .remind-text {
          position: absolute;
          top: 10vh;  /* \u8C03\u6574\u6587\u5B57\u7684\u5782\u76F4\u4F4D\u7F6E */
          left: 1vw;
          width:90vw;
          color:red;
          z-index: 10000;
        }
    
        @keyframes moveUpDown {
          0% {
            top: 3vh;
            left: 2vw;
          }
        
          50% {
            top: 1.5vh;
            left: 3vw; 
          }
        
          100% {
            top: 3vh;
            left: 2vw;
          }
        }
        .device-connect {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }
        .device-connect .testing-title {
          display: flex;
          font-size: 2rem;
          justify-content: center;
          margin-top: 4vh;
          color: rgba(32, 30, 30, 0.8980392157);
        }
        .device-connect .testing-prepare-info {
          max-width: 500px;
          padding: 0 1vw;
          text-align: center;
          display: flex;
          font-size: 1rem;
          justify-content: center;
          margin-top: 3.8vh;
          color: rgba(88, 86, 86, 0.8980392157);
        }
        .device-connect .device-display {
          width: 88%;
          margin: 3vh auto 1.5vh;
          display: flex;
          justify-content: space-around;
          position: relative;
        }
        .device-connect .device-display .connect-success {
          position: relative;
        }
        .device-connect .device-display .connect-success::before {
          content: "";
          width: 28px;
          height: 28px;
          position: absolute;
          bottom: -34px;
          left: 50%;
          transform: translateX(-50%);
          background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACAElEQVRYR+2Vv2sUQRTH3/eOYO+f EWzmzUaSTv8CYxIUAooWAYsQJEkRRDRikUJMiiMIQRSVCNql0sqkCIFwO7NLCGm00kpEEBtzhsyT Pe5kWG9zu8p5zU658958Pnznx4L6PNBnPpUCZQJlAj1PgOu8SBW6C0HNBGYmfe17KqBCdRvA/TbU OXc+Hoq3fImeCahQLQBY8mDGahv8lwR0qOcF8sCDfSCicavtXs8F2PBNIlrxQB9dxU3EKq53evY7 boGyahDHuCRVWY04+pL3f8GGp4mo1q4H8JkcTZjAbGet0VGADUurYd8dubF4OH7fTUJZdQOCR17d t1bs707q/UNgZH/kdKPR+Oofnupx9WL9bP1T1kJseIqI1rz5HwIZjzh60008awvuQXDndzNoR0hG O20HG75ORE+8WldBZSxU4UY3eDKfeQ211UsisuAtsjlwNDC6O7z7vf1NWXUFgucp0GWr7es88BMF kklt9UMRmfUWe3t46vDCwZmDnzrUkwJZ90ECuRpx9CIvvKtAUsCWaySUnO7mEJENAC+J6JUPgmDK BOZxEXgugaZEyGsESg5a1pi22q4WhecWaEoYfkpE19IQEZmLgmj5b+CFBJJiZdU6BJNtGAS3TGD8 976wR+GfUSuJc+TomR2yi4WJqYbCAv8KTPeXAmUCZQJ9T+AXo7StIY0IqrkAAAAASUVORK5CYII=") no-repeat;
          background-size: 100% 100%;
        }
        .device-connect .device-display .connect-fail {
          position: relative;
        }
        .device-connect .device-display .connect-fail::before {
          content: "";
          width: 28px;
          height: 28px;
          position: absolute;
          bottom: -34px;
          left: 50%;
          transform: translateX(-50%);
          background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB3ElEQVRYR+2Wr08cQRTHP+8ESZOq GlKBaKhpUwWmCnG7d4giwDS5NGlVMWDAtIZfrQEDpjVF0ZC0wH/QWxr+gNrKJigSBA4J98hN7pbl 9mZnZklz5tasmPfm+5nve/t2hAE/MmB9hgBDB5wOaJVx+c2/Ms2qEc+BCznm3JZvBdBpHnPNmUlU VuWYzyEQGrGC8KmdI4m92e0AbXrhbyoqfJQmWz4QWuMDymYa2+KpzcXCEmjMOrCWEV2WhJ0iCI1Z ArbTGId77h7ohRAWpcnXfhBaYwHlS4hrTgDTAnkn5iVhNwuhMe+BbyFumf7wqakF4p0kfO+svQX2 Mie3utSr5w3QF6JCw2zY4kdm45w7RYcMArA4kd0/dcXX2WAAK0SFhvzip69wN64cQJ0XtDgEnmXq /lqaHP13AK0yQcWIj+fEhGCIIAc05iUY8bGO+EbnfTusAiG8AbTOVMf20a64JGZS5udEAIQXgEbE CAfAo17xbhlyw8oTwgmgMa/AdPdDm/h9IIp/RjXmUCM+4hIvC2H/HdeZpMWfTKdvdGvu+tRy5bji iZxw2i+v6D7wBmHf9+S9m9+BKH0fiJilwgNp3pn1LgPSdY2YQbiUhBNbkrMJvdVKBg4Bhg4M3IEb uI2UIfOyj40AAAAASUVORK5CYII=") no-repeat;
          background-size: 100% 100%;
        }
        .device-connect .device-display .device {
          width: 46px;
          height: 46px;
          position: relative;
          justify-content: center;
          font-size: 38px;
        }
        .device-connect .device-display .device svg {
          width: 36px;
          height: 36px;
          fill: #47494D;
        }
        .device-connect .device-display .outer-progress {
          width: 83%;
          height: 4px;
          border-radius: 5px;
          position: absolute;
          top: 70px;
          background-color: #eeeeee;
          overflow: hidden;
        }
        .device-connect .device-display .outer-progress .inner-progress {
          width: 100%;
          position: absolute;
          top: 0;
          left: -100%;
          height: 4px;
          border-radius: 5px;
          background-color: #bfbfbf;
          transform-origin: left;
          transition: transform 0.3s linear;
        }
        .device-connect .text {
          margin-top: 4.5vh;
          font-size: 1rem;
          max-width: 420px;
          text-align: center;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .device-connect .text.gray-text {
          color: rgba(88, 86, 86, 0.8980392157);
        }
        .device-connect .text.green-text {
          color: rgb(50, 205, 50);
        }
        .device-connect .text.red-text {
          color: red;
        }
        .device-connect .button-container {
          position: absolute;
          bottom: 3vh;
          width: 40%;
          display: flex;
          justify-content: space-around;
        }
        .error-connect {
          width: 20px;
          height: 20px;
          margin-left: 8px;
          display: inline;
        }
        .error-connect .error-icon svg {
          width: 20px;
          height: 20px;
        }
        .connect-attention-info {
          padding: 1vw 1vh;
          min-width: 134px;
          min-height: 50px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 10px;
          color: rgb(255, 255, 255);
          position: absolute;
          top:23vh;
          display: block;
          font-size: 0.8rem;
          text-align: left;
          max-width: 92vw;
          white-space: nowrap;
          white-space: normal;  // \u6DFB\u52A0\u8FD9\u4E00\u884C\uFF0C\u4F7F\u5176\u81EA\u52A8\u6362\u884C
          word-wrap: break-word;  /* \u6DFB\u52A0\u81EA\u52A8\u6362\u884C\u6837\u5F0F */
          overflow-wrap: anywhere;  /* \u5141\u8BB8\u5728\u4EFB\u610F\u4F4D\u7F6E\u6362\u884C */
        }
        .error-connect .connect-attention-info::after {
          content: "";
          width: 0;
          height: 0;
          border: 10px transparent solid;
          border-top-color: rgba(0, 0, 0, 0.6);
          position: absolute;
          left: 100%;
          top: 100%;
          transform: translateX(-18vw);
        }
        .testing-body {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .testing-body.hide {
          display: none;
        }
        .testing-body .device-list {
          width: 93%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 2vh;
        }
        .testing-body .device-list .device-list-title {
          margin-right: 1vw;
          font-size: 0.8rem;
        }
        .testing-body .camera-video {
          max-width: 80vw;
          height: 32vh;
          object-fit: contain;  /* \u4FDD\u6301\u89C6\u9891\u7684\u5BBD\u9AD8\u6BD4\uFF0C\u5C06\u5176\u5B8C\u6574\u663E\u793A\u5728\u6846\u5185 */
        }
        .testing-container {
          width: 100%;
          margin: 10px auto 30px;
        }
        .testing-container .testing-body {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .testing-container .testing-body.hide {
          display: none;
        }
        .testing-container .testing-body .device-list {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }
        .testing-container .testing-body .device-list .device-list-title {
          margin-right: 10px;
        }
        .testing-container .testing-body .camera-video {
          width: 300px;
          height: 180px;
        }
        .audio-player-container {
          width: 340px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin: 2vh auto 0;
          text-align: center;
        }
        .audio-player-container .audio-player-info {
          margin: 0px auto 16px;
          color: #5f5f5f;
        }
        .audio-player-container #audio-player {
          width: 100%;
        }
        .testing-info-container {
          display: flex;
          width: 100%;
          justify-content: center;
          flex-wrap: wrap;
          position: absolute;
          bottom: 3vh;
        }
        .testing-info-container .testing-info {
          width: 100%;
          text-align: center;
          display: block;
          font-size:1rem;
        }
        .testing-info-container .button-list {
          margin-top: 2vh;
          width: 300px;
          display: flex;
          justify-content: space-around;
        }
        .device-select {
          width: 90%;
          padding: 6px 14px 6px 12px;
          position: relative;
          font-size: 0.8rem;
          border-radius: 4px;
          background-color: #fff;
          cursor: pointer;
        }
        .device-select:focus {
          outline: none;
        }
        .step-container {
          display: flex;
          margin-top: 2vh;
          margin-bottom: 2vh;
          padding: 0.3vw;
          font-size: 0.95rem;
        }
        .step-container .step {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          fill: rgba(0, 0, 0, 0.54);
          color: rgba(0, 0, 0, 0.54);
        }
        .step-container .step:not(:first-child)::after {
          position: absolute;
          content: "";
          height: 1px;
          background-color: rgba(0, 0, 0, 0.16);
          right: 100%;
          top: 30%;
          right: calc(50% + 20px);
          left: calc(-50% + 20px);
          top: 16px;
        }
        .step-container .step.active {
          fill: #006EFF;
          color: #006EFF;
          cursor: pointer;
        }
        .step-container .step.active::after {
          background-color: #006EFF;
        }
        .step-container .step.error {
          fill: red;
          color: red;
          cursor: pointer;
        }
        .step-container .step.error::after {
          background-color: #006EFF;
        }
        .step-container .step .step-label {
          margin-top: 12px;
        }
        .mic-testing-container {
          margin-top: 20px;
          width: 100%;
        }
        .mic-testing-container .mic-testing-info {
          text-align: center;
        }
        .mic-testing-container .mic-bar-container {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
        .mic-testing-container .mic-bar-container .mic-bar {
          width: 8px;
          height: 30px;
          border: 1px solid #cccccc;
          border-radius: 1px;
        }
        .mic-testing-container .mic-bar-container .mic-bar:not(:first-child) {
          margin-left: 3px;
        }
        .mic-testing-container .mic-bar-container .mic-bar.active {
          background: #006EFF;
        }
        .recording-container {
          margin-top: 3vh;
        }
        .testing-list {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
        .testing-list .testing-item-container {
          width: 83%;
          margin: 0 auto 10px;
          display: flex;
          justify-content: space-between;
        }
        @keyframes loading-circle {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(180deg);
          }
          75% {
            transform: rotate(270deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .network-loading {
          display: flex;
        }
        .network-loading::before {
          content: "";
          width: 16px;
          height: 16px;
          background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAChElEQVRYR82WO2wTQRCGZ9YFLmmCQDRUFIgOCuhMg2QJ8OxKtpQuEggqQDz6hDIiSAg6QEo6pFi+WVsoLgkVDakgFFBAlYJ0IGRceAetdWddLF/uznacXHe38/j2n9mbRTjkB6eRn4jOWGt/jhMrMwARlRDxkogUEfETM7/zCY0xqyKyAAAe4G70PStMZgCt9WsAuBUG3mLmi5VK5ZxSajuWrM7MtazJvd1EAER0HBG/AcBcPxji8yAIHhDREiJeA4A/IvLBWruUBJUIoLX+AgC7IvLEWruZVAIimldKXXXOefstb6u1lljCbWY+nwsg3MFi6LTJzFeyyloul48Vi8V/MfvvzHw2F0Cstl6BZWvts6wA3o6I3iDizdDnBTPfzwUQGVer1bl6vb6bJ3nM92S321WtVmtHa/3QnxBE/BwEwY14vD094KXfr2HGASGiBURcjXxF5KW19l70PgDQWr8HgBIA5Kp5GpTWeh0AqjG7HWY+PUsAn9xD9J/wVA2O5YGXIGzKklJq3jn30Vq7ltgDaXJOsu7nhS+xUuqyc+6t/1/k+hNOktz7GmNYRCgWp8bM9X4JiGhZKXVCRDb8x0mTDfuPmBnepD83+gDRr3O4QaYJorX+AQC+DHuacSYKhCovIuJ1ALiAiGu9Xu9ps9n8mnkaTkuN4cvLzAGGN3J0AIjoESKuiMgda+2raUmeFmegwEED+KPom+7QSpA0aY9ODwxLY4w51el0/rbb7d9pdZxkfb9Lqb9YTvVuMAo0EcDfZAqFwq9Go7Exzg6NMStBEDxO883VA0R0e9QRTerwtOS5x3E4tPpjNAoeTrp151xt1DFLg8ilQFKwmSmQtptx1v8DVbAxMP//OLQAAAAASUVORK5CYII=") no-repeat;
          background-size: 100% 100%;
          animation: loading-circle 2s linear infinite;
        }
        .report-button {
          position: absolute;
          bottom: 6vh;
          cursor: pointer;
        }
        .gray-button {
          position: absolute;
          bottom: 6vh;
        }
        .device-testing-report {
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          align-items: center;
        }
        .device-testing-report .testing-title {
          display: flex;
          font-size: 4vh;
          justify-content: center;
          margin-top: 2vh;
          color: rgba(32, 30, 30, 0.8980392157);
        }
        .device-testing-report .device-report-list {
          display: block;
          width: 100%;
          margin-top: 10px;
        }
        .device-testing-report .device-report-list .device-report {
          display: flex;
          width: 70%;
          margin: 2vh auto 0;
          justify-content: space-between;
        }
        .device-testing-report .device-report-list .device-report .device-info {
          display: flex;
          width: 80%;
        }
        .device-testing-report .device-report-list .device-report .device-info .report-icon {
          margin-right: 20px;
          justify-content: center;
          font-size: 22px;
          line-height: 22px;
          color: #515151;
        }
        .device-testing-report .device-report-list .device-report .device-info .report-icon svg {
          width: 24px;
          height: 24px;
        }
        .device-testing-report .device-report-list .device-report .device-info .device-name {
          width: 280px;
          height: 24px;
          line-height: 24px;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }
        .device-testing-report .device-report-list .device-report .green {
          color: green;
        }
        .device-testing-report .device-report-list .device-report .red {
          color: red;
        }
        .device-testing-report .device-report-footer {
          width: 65%;
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 36px;
        }
      }
      @media screen and (min-width: 769px) {
        .device-detector-backdrop {
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.8);
          z-index: 9999;
          opacity: 1;
          transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }
        .device-detector-backdrop .root {
          position: relative;
          width: 600px;
          height: 480px;
          font-size: 16px;
          box-shadow: 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
          background-color: #ffffff;
          border-radius: 4px;
        }
        .device-detector-backdrop .root .stepper {
          border-radius: 5px 5px 0 0;
          font-size: 36px;
        }
        .device-detector-backdrop .root .close {
          color: #eeeeee !important;
          border-radius: 20px !important;
          border-color: #eeeeee !important;
          position: absolute !important;
          cursor: pointer;
          top: -50px;
          right: 2px;
        }

        .arrow {
          width: 0;
          height: 0;
          border-left: 2vh solid transparent;
          border-right: 2vh solid transparent;
          border-bottom: 2vh solid red;
          position: absolute;
          left: 2vw;
          animation: moveUpDown 2s infinite ease-in-out;
          transform:rotate(45deg);
          z-index: 10000;
        }
    
      .arrow::after {
          content: "";
          width: 1.5vh;
          height: 4vh;
          background-color: red;
          position: absolute;
          // top: 9px;  /* \u5C06\u67C4\u5B9A\u4F4D\u5728\u7BAD\u5934\u7684\u4E0B\u65B9 */
          left: 50%;  /* \u6C34\u5E73\u5C45\u4E2D\u67C4 */
          transform: translate(-50%,18%);  /* \u5FAE\u8C03\u67C4\u7684\u6C34\u5E73\u4F4D\u7F6E\uFF0C\u4F7F\u5176\u5B8C\u5168\u5C45\u4E2D */
          z-index: 10000;
        }
    
      .remind-text {
          position: absolute;
          top: 10vh;  /* \u8C03\u6574\u6587\u5B57\u7684\u5782\u76F4\u4F4D\u7F6E */
          left: 1vw;
          width:30vw;
          color:red;
          z-index: 10000;
        }
    
        @keyframes moveUpDown {
          0% {
            top: 3vh;
            left: 2vw;
          }
        
          50% {
            top: 1.5vh;
            left: 3vw; 
          }
        
          100% {
            top: 3vh;
            left: 2vw;
          }
        }
        .device-connect {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .device-connect .testing-title {
          display: flex;
          font-size: 32px;
          justify-content: center;
          margin-top: 55px;
          color: rgba(32, 30, 30, 0.8980392157);
        }
        .device-connect .testing-prepare-info {
          max-width: 500px;
          text-align: center;
          display: flex;
          font-size: 16px;
          justify-content: center;
          margin-top: 30px;
          color: rgba(88, 86, 86, 0.8980392157);
        }
        .device-connect .device-display {
          width: 420px;
          margin: 40px auto 20px;
          display: flex;
          justify-content: space-around;
          position: relative;
        }
        .device-connect .device-display .connect-success {
          position: relative;
        }
        .device-connect .device-display .connect-success::before {
          content: "";
          width: 28px;
          height: 28px;
          position: absolute;
          bottom: -34px;
          left: 50%;
          transform: translateX(-50%);
          background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACAElEQVRYR+2Vv2sUQRTH3/eOYO+f EWzmzUaSTv8CYxIUAooWAYsQJEkRRDRikUJMiiMIQRSVCNql0sqkCIFwO7NLCGm00kpEEBtzhsyT Pe5kWG9zu8p5zU658958Pnznx4L6PNBnPpUCZQJlAj1PgOu8SBW6C0HNBGYmfe17KqBCdRvA/TbU OXc+Hoq3fImeCahQLQBY8mDGahv8lwR0qOcF8sCDfSCicavtXs8F2PBNIlrxQB9dxU3EKq53evY7 boGyahDHuCRVWY04+pL3f8GGp4mo1q4H8JkcTZjAbGet0VGADUurYd8dubF4OH7fTUJZdQOCR17d t1bs707q/UNgZH/kdKPR+Oofnupx9WL9bP1T1kJseIqI1rz5HwIZjzh60008awvuQXDndzNoR0hG O20HG75ORE+8WldBZSxU4UY3eDKfeQ211UsisuAtsjlwNDC6O7z7vf1NWXUFgucp0GWr7es88BMF kklt9UMRmfUWe3t46vDCwZmDnzrUkwJZ90ECuRpx9CIvvKtAUsCWaySUnO7mEJENAC+J6JUPgmDK BOZxEXgugaZEyGsESg5a1pi22q4WhecWaEoYfkpE19IQEZmLgmj5b+CFBJJiZdU6BJNtGAS3TGD8 976wR+GfUSuJc+TomR2yi4WJqYbCAv8KTPeXAmUCZQJ9T+AXo7StIY0IqrkAAAAASUVORK5CYII=") no-repeat;
          background-size: 100% 100%;
        }
        .device-connect .device-display .connect-fail {
          position: relative;
        }
        .device-connect .device-display .connect-fail::before {
          content: "";
          width: 28px;
          height: 28px;
          position: absolute;
          bottom: -34px;
          left: 50%;
          transform: translateX(-50%);
          background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB3ElEQVRYR+2Wr08cQRTHP+8ESZOq GlKBaKhpUwWmCnG7d4giwDS5NGlVMWDAtIZfrQEDpjVF0ZC0wH/QWxr+gNrKJigSBA4J98hN7pbl 9mZnZklz5tasmPfm+5nve/t2hAE/MmB9hgBDB5wOaJVx+c2/Ms2qEc+BCznm3JZvBdBpHnPNmUlU VuWYzyEQGrGC8KmdI4m92e0AbXrhbyoqfJQmWz4QWuMDymYa2+KpzcXCEmjMOrCWEV2WhJ0iCI1Z ArbTGId77h7ohRAWpcnXfhBaYwHlS4hrTgDTAnkn5iVhNwuhMe+BbyFumf7wqakF4p0kfO+svQX2 Mie3utSr5w3QF6JCw2zY4kdm45w7RYcMArA4kd0/dcXX2WAAK0SFhvzip69wN64cQJ0XtDgEnmXq /lqaHP13AK0yQcWIj+fEhGCIIAc05iUY8bGO+EbnfTusAiG8AbTOVMf20a64JGZS5udEAIQXgEbE CAfAo17xbhlyw8oTwgmgMa/AdPdDm/h9IIp/RjXmUCM+4hIvC2H/HdeZpMWfTKdvdGvu+tRy5bji iZxw2i+v6D7wBmHf9+S9m9+BKH0fiJilwgNp3pn1LgPSdY2YQbiUhBNbkrMJvdVKBg4Bhg4M3IEb uI2UIfOyj40AAAAASUVORK5CYII=") no-repeat;
          background-size: 100% 100%;
        }
        .device-connect .device-display .device {
          width: 46px;
          height: 46px;
          position: relative;
          justify-content: center;
          font-size: 38px;
        }
        .device-connect .device-display .device svg {
          width: 36px;
          height: 36px;
          fill: #47494D;
        }
        .device-connect .device-display .outer-progress {
          width: 360px;
          height: 4px;
          border-radius: 5px;
          position: absolute;
          top: 70px;
          background-color: #eeeeee;
          overflow: hidden;
        }
        .device-connect .device-display .outer-progress .inner-progress {
          width: 100%;
          position: absolute;
          top: 0;
          left: -360px;
          height: 4px;
          border-radius: 5px;
          background-color: #bfbfbf;
          transform-origin: left;
          transition: transform 0.3s linear;
        }
        .device-connect .text {
          margin-top: 50px;
          font-size: 18px;
          max-width: 420px;
          text-align: center;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .device-connect .text.gray-text {
          color: rgba(88, 86, 86, 0.8980392157);
        }
        .device-connect .text.green-text {
          color: rgb(50, 205, 50);
        }
        .device-connect .text.red-text {
          color: red;
        }
        .device-connect .button-container {
          margin-top: 50px;
          width: 40%;
          display: flex;
          justify-content: space-around;
        }
        .error-connect {
          width: 20px;
          height: 20px;
          margin-left: 8px;
          position: relative;
          display: inline;
        }
        .error-connect .error-icon svg {
          width: 20px;
          height: 20px;
        }
        .error-connect .connect-attention-info {
          padding: 8px 12px;
          min-width: 160px;
          min-height: 50px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 10px;
          color: #fff;
          position: absolute;
          right: 0;
          bottom: 100%;
          transform: translate(20px, -10px);
          display: block;
          white-space: nowrap;
          font-size: 12px;
          text-align: left;
        }
        .error-connect .connect-attention-info::after {
          content: "";
          width: 0;
          height: 0;
          border: 10px transparent solid;
          border-top-color: rgba(0, 0, 0, 0.6);
          position: absolute;
          left: 100%;
          top: 100%;
          transform: translateX(-40px);
        }
        .testing-body {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .testing-body.hide {
          display: none;
        }
        .testing-body .device-list {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }
        .testing-body .device-list .device-list-title {
          margin-right: 10px;
        }
        .testing-body .camera-video {
          width: 300px;
          height: 180px;
        }
        .testing-container {
          width: 100%;
          margin: 10px auto 30px;
        }
        .testing-container .testing-body {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .testing-container .testing-body.hide {
          display: none;
        }
        .testing-container .testing-body .device-list {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }
        .testing-container .testing-body .device-list .device-list-title {
          margin-right: 10px;
        }
        .testing-container .testing-body .camera-video {
          width: 300px;
          height: 180px;
        }
        .audio-player-container {
          width: 340px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin: 20px auto 0;
          text-align: center;
        }
        .audio-player-container .audio-player-info {
          margin: 0px auto 16px;
          color: #5f5f5f;
        }
        .testing-info-container {
          display: flex;
          width: 100%;
          justify-content: center;
          flex-wrap: wrap;
          position: absolute;
          bottom: 30px;
        }
        .testing-info-container .testing-info {
          width: 100%;
          text-align: center;
          display: block;
        }
        .testing-info-container .button-list {
          margin-top: 20px;
          width: 300px;
          display: flex;
          justify-content: space-around;
        }
        .device-select {
          width: 260px;
          padding: 6px 14px 6px 12px;
          position: relative;
          font-size: 16px;
          border-radius: 4px;
          background-color: #fff;
          cursor: pointer;
        }
        .device-select:focus {
          outline: none;
        }
        .step-container {
          display: flex;
          padding: 24px;
        }
        .step-container .step {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          fill: rgba(0, 0, 0, 0.54);
          color: rgba(0, 0, 0, 0.54);
        }
        .step-container .step:not(:first-child)::after {
          position: absolute;
          content: "";
          height: 1px;
          background-color: rgba(0, 0, 0, 0.16);
          right: 100%;
          top: 30%;
          right: calc(50% + 20px);
          left: calc(-50% + 20px);
          top: 16px;
        }
        .step-container .step.active {
          fill: #006EFF;
          color: #006EFF;
          cursor: pointer;
        }
        .step-container .step.active::after {
          background-color: #006EFF;
        }
        .step-container .step.error {
          fill: red;
          color: red;
          cursor: pointer;
        }
        .step-container .step.error::after {
          background-color: #006EFF;
        }
        .step-container .step .step-label {
          margin-top: 12px;
        }
        .mic-testing-container {
          margin-top: 20px;
          width: 100%;
        }
        .mic-testing-container .mic-testing-info {
          text-align: center;
        }
        .mic-testing-container .mic-bar-container {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
        .mic-testing-container .mic-bar-container .mic-bar {
          width: 8px;
          height: 30px;
          border: 1px solid #cccccc;
          border-radius: 1px;
        }
        .mic-testing-container .mic-bar-container .mic-bar:not(:first-child) {
          margin-left: 3px;
        }
        .mic-testing-container .mic-bar-container .mic-bar.active {
          background: #006EFF;
        }
        .recording-container {
          margin-top: 5em;
        }
        .testing-list {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
        .testing-list .testing-item-container {
          width: 70%;
          margin: 0 auto 10px;
          display: flex;
          justify-content: space-between;
        }
        @keyframes loading-circle {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(180deg);
          }
          75% {
            transform: rotate(270deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .network-loading {
          display: flex;
        }
        .network-loading::before {
          content: "";
          width: 16px;
          height: 16px;
          background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAChElEQVRYR82WO2wTQRCGZ9YFLmmCQDRUFIgOCuhMg2QJ8OxKtpQuEggqQDz6hDIiSAg6QEo6pFi+WVsoLgkVDakgFFBAlYJ0IGRceAetdWddLF/uznacXHe38/j2n9mbRTjkB6eRn4jOWGt/jhMrMwARlRDxkogUEfETM7/zCY0xqyKyAAAe4G70PStMZgCt9WsAuBUG3mLmi5VK5ZxSajuWrM7MtazJvd1EAER0HBG/AcBcPxji8yAIHhDREiJeA4A/IvLBWruUBJUIoLX+AgC7IvLEWruZVAIimldKXXXOefstb6u1lljCbWY+nwsg3MFi6LTJzFeyyloul48Vi8V/MfvvzHw2F0Cstl6BZWvts6wA3o6I3iDizdDnBTPfzwUQGVer1bl6vb6bJ3nM92S321WtVmtHa/3QnxBE/BwEwY14vD094KXfr2HGASGiBURcjXxF5KW19l70PgDQWr8HgBIA5Kp5GpTWeh0AqjG7HWY+PUsAn9xD9J/wVA2O5YGXIGzKklJq3jn30Vq7ltgDaXJOsu7nhS+xUuqyc+6t/1/k+hNOktz7GmNYRCgWp8bM9X4JiGhZKXVCRDb8x0mTDfuPmBnepD83+gDRr3O4QaYJorX+AQC+DHuacSYKhCovIuJ1ALiAiGu9Xu9ps9n8mnkaTkuN4cvLzAGGN3J0AIjoESKuiMgda+2raUmeFmegwEED+KPom+7QSpA0aY9ODwxLY4w51el0/rbb7d9pdZxkfb9Lqb9YTvVuMAo0EcDfZAqFwq9Go7Exzg6NMStBEDxO883VA0R0e9QRTerwtOS5x3E4tPpjNAoeTrp151xt1DFLg8ilQFKwmSmQtptx1v8DVbAxMP//OLQAAAAASUVORK5CYII=") no-repeat;
          background-size: 100% 100%;
          animation: loading-circle 2s linear infinite;
        }
        .report-button {
          position: absolute;
          bottom: 60px;
          cursor: pointer;
        }
        .gray-button {
          position: absolute;
          bottom: 60px;
        }
        .device-testing-report {
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          align-items: center;
        }
        .device-testing-report .testing-title {
          display: flex;
          font-size: 34px;
          justify-content: center;
          margin-top: 30px;
          color: rgba(32, 30, 30, 0.8980392157);
        }
        .device-testing-report .device-report-list {
          display: block;
          width: 100%;
          margin-top: 10px;
        }
        .device-testing-report .device-report-list .device-report {
          display: flex;
          width: 70%;
          margin: 20px auto 0;
          justify-content: space-between;
        }
        .device-testing-report .device-report-list .device-report .device-info {
          display: flex;
          width: 80%;
        }
        .device-testing-report .device-report-list .device-report .device-info .report-icon {
          margin-right: 20px;
          justify-content: center;
          font-size: 22px;
          line-height: 22px;
          color: #515151;
        }
        .device-testing-report .device-report-list .device-report .device-info .report-icon svg {
          width: 24px;
          height: 24px;
        }
        .device-testing-report .device-report-list .device-report .device-info .device-name {
          width: 280px;
          height: 24px;
          line-height: 24px;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }
        .device-testing-report .device-report-list .device-report .green {
          color: green;
        }
        .device-testing-report .device-report-list .device-report .red {
          color: red;
        }
        .device-testing-report .device-report-footer {
          width: 50%;
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 36px;
        }
      }
`,f=YV;var a=window.navigator&&window.navigator.userAgent||"",Dt=/AppleWebKit\/([\d.]+)/i.exec(a),GV=Dt?parseFloat(Dt.pop()||"0"):null,yt=/iPad/i.test(a),He=/iPhone/i.test(a)&&!yt,ZV=/iPod/i.test(a),ge=He||yt||ZV,Ui=ge&&function(){let V=a.match(/OS (\d+)_/i);return V&&V[1]?V[1]:null}(),G=/Android/i.test(a),kt=G&&function(){let V=a.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!V)return null;let e=V[1]&&parseFloat(V[1]),t=V[2]&&parseFloat(V[2]);return e&&t?parseFloat(`${V[1]}.${V[2]}`):e||null}(),Ti=G&&/webkit/i.test(a)&&kt<2.3,xi=G&&kt<5&&GV<537,Z=/Firefox/i.test(a),Ve=Z&&function(){let V=a.match(/Firefox\/(\d+)/);return V&&V[1]?parseFloat(V[1]):null}(),J=/Edge\//i.test(a),Bt=J&&function(){let V=a.match(/Edge\/(\d+)/i);if(V&&V[1])return V[1]}(),z=/Edg\//i.test(a),ie=z&&function(){let V=a.match(/Edg\/(\d+)/);return V&&V[1]?parseFloat(V[1]):null}(),me=/SogouMobileBrowser\//i.test(a),Nt=me&&function(){let V=a.match(/SogouMobileBrowser\/(\d+)/);return V&&V[1]?parseFloat(V[1]):null}(),ue=/MetaSr\s/i.test(a),bt=ue&&function(){let V=a.match(/MetaSr(\s\d+(\.\d+)+)/);return V&&V[1]?parseFloat(V[1]):null}(),T=/TBS\/\d+/i.test(a),Ot=T&&function(){let V=a.match(/TBS\/(\d+)/i);if(V&&V[1])return V[1]}(),Ee=/XWEB\/\d+/i.test(a),Qt=Ee&&function(){let V=a.match(/XWEB\/(\d+)/i);if(V&&V[1])return V[1]}(),vi=/MSIE\s8\.0/.test(a),JV=/MSIE\/\d+/i.test(a),Ri=JV&&function(){let V=/MSIE\s(\d+)\.\d/.exec(a),e=V&&parseFloat(V[1]);return!e&&/Trident\/7.0/i.test(a)&&/rv:11.0/.test(a)&&(e=11),e}(),Di=/windowswechat/i.test(a),Xe=/(micromessenger|webbrowser)/i.test(a),Ft=Xe&&function(){let V=a.match(/MicroMessenger\/(\d+)/i);if(V&&V[1])return V[1]}(),Ce=!T&&/MQQBrowser\/\d+/i.test(a)&&/COVC\/\d+/i.test(a),Ie=!T&&/MQQBrowser\/\d+/i.test(a)&&!/COVC\/\d+/i.test(a),_e=(Ie||Ce)&&function(){let V=a.match(/ MQQBrowser\/([\d.]+)/);return V&&V[1]?V[1]:null}(),Se=!T&&/ QQBrowser\/\d+/i.test(a),Lt=Se&&function(){let V=a.match(/ QQBrowser\/([\d.]+)/);return V&&V[1]?V[1]:null}(),Me=!T&&/QQBrowserLite\/\d+/i.test(a),Kt=Me&&function(){let V=a.match(/QQBrowserLite\/([\d.]+)/);return V&&V[1]?V[1]:null}(),fe=!T&&/MQBHD\/\d+/i.test(a),Yt=fe&&function(){let V=a.match(/MQBHD\/([\d.]+)/);return V&&V[1]?V[1]:null}(),Gt=/Windows/i.test(a),Zt=!ge&&/MAC OS X/i.test(a),Jt=!G&&/Linux/i.test(a),yi=/MicroMessenger/i.test(a),zt=/UCBrowser/i.test(a),ki=/Electron/i.test(a),we=/MiuiBrowser/i.test(a),Wt=we&&function(){let V=a.match(/MiuiBrowser\/([\d.]+)/);return V&&V[1]?V[1]:null}(),Ue=/HuaweiBrowser/i.test(a),jt=Ue&&function(){let V=a.match(/HuaweiBrowser\/([\d.]+)/);return V&&V[1]?V[1]:null}(),Te=/SamsungBrowser/i.test(a),Pt=Te&&function(){let V=a.match(/SamsungBrowser\/([\d.]+)/);return V&&V[1]?V[1]:null}(),xe=/HeyTapBrowser/i.test(a),Ht=xe&&function(){let V=a.match(/HeyTapBrowser\/([\d.]+)/);return V&&V[1]?V[1]:null}(),ve=/VivoBrowser/i.test(a),Xt=ve&&function(){let V=a.match(/VivoBrowser\/([\d.]+)/);return V&&V[1]?V[1]:null}(),zV=/Chrome/i.test(a),b=!J&&!ue&&!me&&!T&&!Ee&&!z&&!Se&&!we&&!Ue&&!Te&&!xe&&!ve&&/Chrome/i.test(a),Bi=b&&function(){let V=a.match(/Chrome\/(\d+)/);return V&&V[1]?parseFloat(V[1]):null}(),$e=b&&function(){let V=a.match(/Chrome\/([\d.]+)/);return V&&V[1]?V[1]:null}(),Re=!zV&&!Ie&&!Ce&&!Me&&!fe&&/Safari/i.test(a);var et=Re&&function(){let V=a.match(/Version\/([\d.]+)/);return V&&V[1]?V[1]:null}(),Ni=b?`Chrome/${$e}`:Re?`Safari/${et}`:"NotSupportedBrowser",_t=location.protocol==="file:"||location.hostname==="localhost"||/^\d+\.\d+\.\d+\.\d+$/.test(location.hostname);var $t=new Map([[G,"Android"],[ge,"iOS"],[Gt,"Windows"],[Zt,"MacOS"],[Jt,"Linux"]]),tV=()=>{let V="unknown";return $t.get(!0)&&(V=$t.get(!0)),V},eV=new Map([[Z,["Firefox",Ve]],[z,["Edg",ie]],[b,["Chrome",$e]],[Re,["Safari",et]],[T,["TBS",Ot]],[Ee,["XWEB",Qt]],[Xe&&He,["WeChat",Ft]],[Se,["QQ(Win)",Lt]],[Ie,["QQ(Mobile)",_e]],[Ce,["QQ(Mobile X5)",_e]],[Me,["QQ(Mac)",Kt]],[fe,["QQ(iPad)",Yt]],[we,["MI",Wt]],[Ue,["HW",jt]],[Te,["Samsung",Pt]],[xe,["OPPO",Ht]],[ve,["VIVO",Xt]],[J,["EDGE",Bt]],[me,["SogouMobile",Nt]],[ue,["Sogou",bt]]]),VV=()=>{let V="unknown",e="unknown";return eV.get(!0)&&([V,e]=eV.get(!0)),{name:V,version:e}},iV=navigator.userAgent,AV=()=>{let V;if(screen.width){let e=screen.width?screen.width*window.devicePixelRatio:"",t=screen.height?screen.height*window.devicePixelRatio:"";V={width:e,height:t}}return V},oV=()=>{var V;return(V=window.navigator)==null?void 0:V.hardwareConcurrency},sV=navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||"en";var rV=()=>{var V;return!!((V=navigator.mediaDevices)!=null&&V.getDisplayMedia)},nV=()=>{let V={isSupported:!1},e=["AudioContext","webkitAudioContext","mozAudioContext","msAudioContext"];for(let t=0;t<e.length;t++)if(e[t]in window){V.isSupported=!0;break}return V.isSupported},aV=()=>"WebSocket"in window&&window.WebSocket.CLOSING===2,qV=()=>zt||J||z&&typeof ie=="number"&&ie<80?!1:!(Z&&Ve&&Ve<56),cV=()=>["RTCPeerConnection","webkitRTCPeerConnection","RTCIceGatherer"].filter(e=>e in window).length>0,lV=()=>{let V=!1;return["captureStream","mozCaptureStream","webkitCaptureStream"].forEach(e=>{typeof document=="undefined"||typeof document.createElement!="function"||!V&&e in document.createElement("canvas")&&(V=!0)}),V},pV=()=>{let V=!1;return["captureStream","mozCaptureStream","webkitCaptureStream"].forEach(e=>{typeof document=="undefined"||typeof document.createElement!="function"||!V&&e in document.createElement("video")&&(V=!0)}),V},dV=()=>{let V=!1;return Z&&typeof window.mozRTCPeerConnection!="undefined"?"getSenders"in window.mozRTCPeerConnection.prototype&&(V=!0):b&&typeof window.webkitRTCPeerConnection!="undefined"&&"getSenders"in window.webkitRTCPeerConnection.prototype&&(V=!0),V},hV=()=>typeof MediaStreamTrack!="undefined"&&"applyConstraints"in MediaStreamTrack.prototype;var{toString:Qi}=Object.prototype;var gV=V=>typeof V=="undefined";var WV=function(){return gV(navigator.mediaDevices)?(u.error("navigator.mediaDevices is not supported on your browser"),!0):!1},jV=function(){return location.protocol==="http:"&&!_t?(u.error("you should use https"),!0):!1},mV=()=>{if(!navigator.mediaDevices)return!1;let V=["getUserMedia","enumerateDevices"];return V.filter(e=>e in navigator.mediaDevices).length===V.length},O=async V=>{if(jV()||WV())return[];let e=!1,t=!1,i=!1,A=!1,o=!1,s=[],n=[],r=[],p={},l;return V&&(l=await navigator.mediaDevices.getUserMedia(V)),(await navigator.mediaDevices.enumerateDevices()).forEach(m=>{let c={};for(let M in m)try{typeof m[M]!="function"&&(c[M]=m[M])}catch(W){}let w=c.deviceId||"",D=c.label||"",Q=c.kind||"";p[w+D+Q]||(c.kind==="audio"&&(c.kind="audioinput"),c.kind==="video"&&(c.kind="videoinput"),c.deviceId||(c.deviceId=c.id),c.label?(c.kind==="videoinput"&&!A&&(A=!0),c.kind==="audioinput"&&!o&&(o=!0)):c.kind==="videoinput"?c.label=`Camera ${r.length+1}`:c.kind==="audioinput"?c.label=`Microphone ${s.length+1}`:c.kind==="audiooutput"?c.label=`Speaker ${n.length+1}`:c.label="Please invoke getUserMedia once.",c.kind==="audioinput"&&(e=!0,s.indexOf(c)===-1&&s.push(c)),c.kind==="audiooutput"&&(t=!0,n.indexOf(c)===-1&&n.push(c)),c.kind==="videoinput"&&(i=!0,r.indexOf(c)===-1&&r.push(c)),p[c.deviceId+c.label+c.kind]=c,l==null||l.getTracks().forEach(M=>M.stop()))}),{hasWebCamPermission:A,hasMicrophonePermission:o,cameras:r,speakers:n,microphones:s}};async function uV(V){return{cameraList:(await O({video:!0,audio:!1})).cameras}}var EV=async V=>({microphoneList:(await O({video:!1,audio:!0})).microphones});async function CV(){return(await O({video:!1,audio:!0})).speakers}var IV=async()=>{let V={sdp:"",type:"offer"},e=!1,t=!1;try{let i=new RTCPeerConnection,A=document.createElement("canvas");A.getContext("2d");let o=A.captureStream(0);return i.addTrack(o.getVideoTracks()[0],o),V=await i.createOffer(),V&&V.sdp&&(V.sdp.toLowerCase().indexOf("h264")!==-1&&(e=!0),V.sdp.toLowerCase().indexOf("vp8")!==-1&&(t=!0)),i.close(),{isH264EncodeSupported:e,isVp8EncodeSupported:t}}catch(i){return{isH264EncodeSupported:!1,isVp8EncodeSupported:!1}}},SV=async()=>{let V={sdp:"",type:"offer"},e=!1,t=!1;try{let i=new RTCPeerConnection;return V=await i.createOffer({offerToReceiveAudio:!0,offerToReceiveVideo:!0}),V&&V.sdp&&(V.sdp.toLowerCase().indexOf("h264")!==-1&&(e=!0),V.sdp.toLowerCase().indexOf("vp8")!==-1&&(t=!0)),i.close(),{isH264DecodeSupported:e,isVp8DecodeSupported:t}}catch(i){return{isH264DecodeSupported:!1,isVp8DecodeSupported:!1}}};async function Vt(){return new Promise(async(V,e)=>{try{let Q=function(){clearInterval(w),clearInterval(o),clearTimeout(D),n.close(),r.close(),s.getTracks().forEach(M=>M.stop())};var t=Q;let i=document.createElement("canvas"),A=i.getContext("2d");i.width=640,i.height=480;let o=setInterval(()=>{A&&A.fillText("test",0,0)},33),s=i.captureStream(15),n=new RTCPeerConnection({}),r=new RTCPeerConnection({});n.addEventListener("icecandidate",M=>{r.addIceCandidate(M.candidate)}),r.addEventListener("icecandidate",M=>{n.addIceCandidate(M.candidate)});let p=RTCRtpSender.getCapabilities("video"),d=(p?p.codecs:[]).find(M=>M.mimeType==="video/H264");n.addTransceiver(s.getVideoTracks()[0],{direction:"sendonly",streams:[s],sendEncodings:[{maxBitrate:500*1e3}]}),r.addTransceiver("video",{direction:"recvonly"}),d&&n.getTransceivers()[0].setCodecPreferences([d].filter(M=>M!==void 0));let m=await n.createOffer();await n.setLocalDescription(m),await r.setRemoteDescription(m);let c=await r.createAnswer();await r.setLocalDescription(c),await n.setRemoteDescription(c);let w=-1,D=-1;D=setTimeout(()=>{Q(),V(!1)},30*1e3),w=setInterval(async()=>{(await n.getStats()).forEach(W=>{W.type==="outbound-rtp"&&W.mediaType==="video"&&(typeof W.encoderImplementation=="undefined"&&(Q(),e(new Error("your browser does not support to detect HW acceleration enabled."))),W.encoderImplementation==="ExternalEncoder"&&(Q(),V(!0)))})},500)}catch(i){e(i)}})}var PV={system:null,APISupported:null,devices:null,codecsSupported:null,report:null,networkInfo:null,TRTCInitDone:!1,async getReportAsync(){return this.getSystem(),this.getAPISupported(),await this.getCodecAsync(),await this.getDevicesAsync(),this.report={system:this.system,APISupported:this.APISupported,codecsSupported:this.codecsSupported,devices:this.devices},this.report},async isTRTCSupported(){await this.getReportAsync();let{isWebRTCSupported:V,isUserMediaSupported:e,isWebSocketSupported:t}=this.APISupported;if(!V)return{result:!1,reason:"you browser does not support WebRTC."};if(!t)return{result:!1,reason:"you browser does not support WebSocket."};if(!e)return{result:!1,reason:"you browser does not support getUserMedia."};let{isH264EncodeSupported:i,isVp8EncodeSupported:A,isH264DecodeSupported:o,isVp8DecodeSupported:s}=this.codecsSupported;return!i&&!A?{result:!1,reason:`isH264EncodeSupported: ${i} isVp8EncodeSupported: ${A} `}:!o&&!s?{result:!1,reason:`isH264DecodeSupported: ${o} isVp8DecodeSupported: ${s} `}:qV()?{result:!0}:{result:!1,reason:"your browser does not qualify, it is recommended to use Chrome and firefox."}},async getCodecAsync(){let{isH264EncodeSupported:V,isVp8EncodeSupported:e}=await IV(),{isH264DecodeSupported:t,isVp8DecodeSupported:i}=await SV();return this.codecsSupported={isH264EncodeSupported:V,isVp8EncodeSupported:e,isH264DecodeSupported:t,isVp8DecodeSupported:i},this.codecsSupported},async getDevicesAsync(){let{hasWebCamPermission:V,hasMicrophonePermission:e,cameras:t,microphones:i,speakers:A}=await O();return this.devices={cameras:t,microphones:i,speakers:A||[],hasWebCamPermission:V,hasMicrophonePermission:e},this.devices},getSystem(){return this.system={UA:iV,OS:tV(),browser:VV(),displayResolution:AV(),hardwareConcurrency:oV(),language:sV},this.system},getAPISupported(){return this.APISupported={isUserMediaSupported:mV(),isWebRTCSupported:cV(),isWebSocketSupported:aV(),isWebAudioSupported:nV(),isScreenCaptureAPISupported:rV(),isCanvasCapturingSupported:lV(),isVideoCapturingSupported:pV(),isRTPSenderReplaceTracksSupported:dV(),isApplyConstraintsSupported:hV()},this.APISupported},async isHardWareAccelerationEnabled(){return await Vt()}},S=PV;function MV(){let V=`https://web.sdk.qcloud.com/trtc/electron/download/resources/media/TestSpeaker.mp3?t=${new Date().getTime()}`,e=3e3;return Promise.race([fetch(V,{mode:"cors"}),new Promise((t,i)=>setTimeout(()=>i(!1),e))]).then(t=>{if(!t.ok)throw new Error("\u7F51\u7EDC\u9519\u8BEF");return!0}).catch(()=>!1)}var fV={0:"\u672A\u77E5",1:"\u6781\u4F73",2:"\u8F83\u597D",3:"\u4E00\u822C",4:"\u5DEE",5:"\u6781\u5DEE",6:"\u65AD\u5F00"},wV={0:"Unknown",1:"Excellent",2:"Good",3:"Average",4:"Poor",5:"Very Poor",6:"Disconnected"},it=V=>{let t=(navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||"en").indexOf("zh")>-1;switch(u.error("getUserMedia error",V),V.name){case"NotReadableError":t?u.error("\u6682\u65F6\u65E0\u6CD5\u8BBF\u95EE\u6444\u50CF\u5934/\u9EA6\u514B\u98CE\uFF0C\u8BF7\u786E\u4FDD\u7CFB\u7EDF\u6388\u4E88\u5F53\u524D\u6D4F\u89C8\u5668\u6444\u50CF\u5934/\u9EA6\u514B\u98CE\u6743\u9650\uFF0C\u5E76\u4E14\u6CA1\u6709\u5176\u4ED6\u5E94\u7528\u5360\u7528\u6444\u50CF\u5934/\u9EA6\u514B\u98CE"):u.error("Cannot access camera/microphone temporarily. Please make sure the system has granted the current browser permission to access the camera/microphone and no other application is using the camera/microphone");return;case"NotAllowedError":t?u.error("\u7528\u6237/\u7CFB\u7EDF\u5DF2\u62D2\u7EDD\u6388\u6743\u8BBF\u95EE\u6444\u50CF\u5934\u6216\u9EA6\u514B\u98CE"):u.error("User/system has denied access to camera/microphone");return;case"NotFoundError":t?u.error("\u627E\u4E0D\u5230\u6444\u50CF\u5934\u6216\u9EA6\u514B\u98CE\u8BBE\u5907"):u.error("Cannot find camera or microphone device");return;case"OverConstrainedError":t?u.error("\u91C7\u96C6\u5C5E\u6027\u8BBE\u7F6E\u9519\u8BEF\uFF0C\u5982\u679C\u60A8\u6307\u5B9A\u4E86 cameraId/microphoneId\uFF0C\u8BF7\u786E\u4FDD\u5B83\u4EEC\u662F\u4E00\u4E2A\u6709\u6548\u7684\u975E\u7A7A\u5B57\u7B26\u4E32"):u.error("Capture attribute setting error. If you specified cameraId/microphoneId, please make sure they are valid non-empty strings");return;default:t?u.error("\u521D\u59CB\u5316\u672C\u5730\u6D41\u65F6\u9047\u5230\u672A\u77E5\u9519\u8BEF, \u8BF7\u91CD\u8BD5"):u.error("Unknown error encountered when initializing local stream, please try again");return}};var C=class C extends E{constructor(){super(),this.progress=0,this.remindAnimation=!1;let e=navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||"en";this.isChinese=e.indexOf("zh")>-1,this.showConnectResult=!1,this.connectResult={info:this.isChinese?"\u8FDE\u63A5\u51FA\u9519\uFF0C\u8BF7\u91CD\u8BD5":"Connection error, please try again",success:!1,remind:this.isMobile?this.isChinese?C.mobileFailAttention:C.mobileFailAttentionEng:this.isChinese?C.deviceFailAttention:C.deviceFailAttentionEng},this.envresult=S.getSystem(),this.isMobile=this.envresult.OS==="iOS"||this.envresult.OS==="Android",this.isFirefoxOrIOS=this.envresult.browser.name==="Firefox"||this.envresult.OS==="iOS",this.deviceState={},this.showRemind=!1,this.startTime=new Date().getTime(),this.attachShadow({mode:"open"})}render(){return q`
           <style>${f}</style>
           <div class="device-connect">
           <div class="testing-title">${this.isChinese?"\u8BBE\u5907\u8FDE\u63A5":"Device Connection"}</div>
           <div class="testing-prepare-info"></div>
           <div class="device-display">
             <!-- 摄像头连接图标 -->
                <div class="camerasvg">
                  <span class="device">
                    <svg t="1630397874793" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="958" width="24" height="24"><path d="M489.244444 0a460.8 460.8 0 1 1 0 921.6A460.8 460.8 0 0 1 489.244444 0z m0 204.8a256 256 0 1 0 0 512 256 256 0 0 0 0-512z" opacity=".8" p-id="959"></path><path d="M489.244444 460.8m-153.6 0a153.6 153.6 0 1 0 307.2 0 153.6 153.6 0 1 0-307.2 0Z" opacity=".8" p-id="960"></path><path d="M120.604444 952.32a368.64 61.44 0 1 0 737.28 0 368.64 61.44 0 1 0-737.28 0Z" opacity=".8" p-id="961"></path></svg>
                  </span>
                </div>
             <!-- 麦克风连接图标 -->
            <div class="microphonesvg">
              <span class="device">
                <svg t="1630397938861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1205" width="24" height="24"><path d="M841.551448 434.423172A41.666207 41.666207 0 0 1 882.758621 476.548414c0 194.701241-144.454621 355.469241-329.551449 376.514207v86.722207h164.758069a41.666207 41.666207 0 0 1 41.207173 42.089931A41.666207 41.666207 0 0 1 717.965241 1024H306.034759A41.666207 41.666207 0 0 1 264.827586 981.874759a41.666207 41.666207 0 0 1 41.207173-42.089931h164.758069v-86.722207C285.696 832.052966 141.241379 671.249655 141.241379 476.548414a41.666207 41.666207 0 0 1 41.207173-42.125242 41.666207 41.666207 0 0 1 41.171862 42.125242c0 162.78069 129.129931 294.770759 288.379586 294.770758l8.827586-0.141241c155.153655-4.766897 279.552-134.850207 279.552-294.629517a41.666207 41.666207 0 0 1 41.171862-42.125242zM512 0c119.419586 0 216.275862 88.770207 216.275862 198.232276v317.228138c0 106.990345-92.513103 194.206897-208.154483 198.091034l-8.121379 0.141242c-119.419586 0-216.275862-88.770207-216.275862-198.232276V198.232276c0-106.990345 92.513103-194.206897 208.154483-198.091035L512 0z" opacity=".8" p-id="1206"></path></svg>
              </span>
            </div>
           <!-- 扬声器连接图标 -->
             <div class="speakersvg">
               <span class="device">
                 <svg t="1629186923749" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2923" width="24" height="24"><path d="M640 181.333333c0-46.037333-54.357333-70.4-88.746667-39.850666L359.552 311.850667a32 32 0 0 1-21.248 8.106666H181.333333A96 96 0 0 0 85.333333 415.957333v191.872a96 96 0 0 0 96 96h157.013334a32 32 0 0 1 21.248 8.106667l191.616 170.410667c34.389333 30.549333 88.789333 6.144 88.789333-39.850667V181.333333z m170.325333 70.272a32 32 0 0 1 44.757334 6.698667A424.917333 424.917333 0 0 1 938.666667 512a424.96 424.96 0 0 1-83.626667 253.696 32 32 0 0 1-51.413333-38.058667A360.917333 360.917333 0 0 0 874.666667 512a360.917333 360.917333 0 0 0-71.04-215.637333 32 32 0 0 1 6.698666-44.757334zM731.434667 357.12a32 32 0 0 1 43.392 12.928c22.869333 42.24 35.84 90.666667 35.84 141.994667a297.514667 297.514667 0 0 1-35.84 141.994666 32 32 0 0 1-56.32-30.464c17.92-33.152 28.16-71.082667 28.16-111.530666s-10.24-78.378667-28.16-111.530667a32 32 0 0 1 12.928-43.392z" opacity=".8" p-id="2924"></path></svg>
               </span>
             </div>
             <!-- 网络连接图标 -->
             <div class="networksvg">
                <span class="device">
                  <svg t="1630400570252" class="icon" viewBox="0 0 1291 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1640" width="24" height="24"><path d="M992.211478 583.68A449.758609 449.758609 0 0 0 650.017391 426.295652c-136.904348 0-259.561739 61.039304-342.194087 157.384348a90.156522 90.156522 0 0 0 136.859826 117.359304 269.846261 269.846261 0 0 1 205.334261-94.430608c82.142609 0 155.737043 36.641391 205.334261 94.386087a90.156522 90.156522 0 1 0 136.859826-117.359305zM559.86087 922.134261a90.156522 90.156522 0 1 0 180.313043 0 90.156522 90.156522 0 0 0-180.313043 0z" opacity=".8" p-id="1641"></path><path d="M1253.064348 289.124174A809.316174 809.316174 0 0 0 650.017391 20.613565a809.316174 809.316174 0 0 0-603.046956 268.466087 90.156522 90.156522 0 1 0 127.777391 127.065044l0.311652 0.26713A629.581913 629.581913 0 0 1 650.017391 200.926609c189.395478 0 359.290435 83.389217 474.957913 215.485217l0.267131-0.26713a90.156522 90.156522 0 1 0 127.777391-127.065044z" opacity=".8" p-id="1642"></path></svg>
                </span>
             </div>

             <div  class="outer-progress">
               <div class="inner-progress"></div>
             </div>

           </div>

           <div  class="text gray-text">${this.isChinese?"\u8BBE\u5907\u6B63\u5728\u8FDE\u63A5\u4E2D\uFF0C\u8BF7\u7A0D\u540E":"The device is connecting, please wait"}</div>
          
           <div  class="text result"  style="display:none">
             <span></span>
             <div 
             @touchstart=${()=>this.setShowRemind(!0)} 
             @mouseenter=${()=>this.setShowRemind(!0)}
             @touchend=${()=>this.setShowRemind(!1)}
             @mouseleave=${()=>this.setShowRemind(!1)}
             style="display:none" class="error-connect">
              <span class="error-icon">
                <svg t="1626151898274" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3223" width="28" height="28"><path d="M1024 518.314667C1024 794.794667 794.737778 1024 505.685333 1024 229.205333 1024 0 794.737778 0 518.314667 0 229.262222 229.262222 0 505.685333 0 794.737778 0 1024 229.262222 1024 518.314667zM512 256a48.128 48.128 0 0 0-48.753778 51.370667L477.866667 614.4h68.266666l14.620445-307.029333A48.355556 48.355556 0 0 0 512 256z m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" fill="#FF0000" p-id="3224"></path></svg>
              </span>
              ${this.showRemind&&!this.isMobile?q`<div class="connect-attention-info"></div>`:q``}
             </div>
           </div>
              ${this.showRemind&&this.isMobile?q`<div class="connect-attention-info"></div>`:q``}
           <div class="button-container">
             <trtc-custom-button  type='disabled' >${this.isChinese?"\u5F00\u59CB\u68C0\u6D4B":"Start detection"}</trtc-custom-button>
           </div>
        `}setShowRemind(e){this.showRemind=e,this.requestUpdate()}firstUpdated(){this.getDeviceConnectResult(),this.stepNameList=JSON.parse(this.getAttribute("stepnamelist")),this.judgeList(this.stepNameList);let e=this.shadowRoot.querySelector(".testing-prepare-info");e.innerHTML=this.prepareInfo()}updated(){this.showRemind&&(this.shadowRoot.querySelector(".connect-attention-info").innerHTML=this.connectResult.remind)}hasCameraDetect(){return this.stepNameList.indexOf("camera")>=0}hasMicrophoneDetect(){return this.stepNameList.indexOf("microphone")>=0}hasSpeakerDetect(){return this.stepNameList.indexOf("speaker")>=0}hasNetworkDetect(){return this.stepNameList.indexOf("network")>=0}showReconnectButton(){let{deviceState:e}=this;return this.showConnectResult&&!(e.hasCameraConnect&&e.hasMicrophoneConnect&&e.hasSpeakerConnect&&e.hasNetworkConnect)}showStartDetectButton(){let{deviceState:e}=this;return this.showConnectResult&&e.hasCameraConnect&&e.hasMicrophoneConnect&&e.hasSpeakerConnect&&e.hasNetworkConnect}handler(e){let t=this.shadowRoot.querySelector(".inner-progress");e||(this.progressInterval&&clearInterval(this.progressInterval),this.progressInterval=setInterval(()=>{if(this.progress+=10,t.style.transform=`translateX(${this.progress}%)`,this.progress===100){this.progress=0,t.style.transform="translateX(0%)";let i=new CustomEvent("remind-changed",{detail:this.remindAnimation});this.dispatchEvent(i),setTimeout(()=>{this.remindAnimation&&this.isMobile&&(this.isChinese?alert(C.mobileFailAttention.replace(/<br>/g,`
`)):alert(C.mobileFailAttentionEng.replace(/<br>/g,`
`)))},200),this.showConnectResult=!0,this.setAttribute("showconnectresult",this.showConnectResult),clearInterval(this.progressInterval)}},150))}prepareInfo(){return this.isChinese?`\u8BBE\u5907\u68C0\u6D4B\u524D\u8BF7\u786E\u8BA4\u8BBE\u5907\u8FDE\u63A5\u4E86${this.hasCameraDetect()?"\u6444\u50CF\u5934":""}${this.hasMicrophoneDetect()?"\u3001\u9EA6\u514B\u98CE":""}${this.hasSpeakerDetect()?"\u3001\u626C\u58F0\u5668":""}${this.hasNetworkDetect()?"\u548C\u7F51\u7EDC":""}`:`Make sure the device is connected before testing the device ${this.hasCameraDetect()?"camera":""}${this.hasMicrophoneDetect()?", microphone":""}${this.hasSpeakerDetect()?", speaker":""}${this.hasNetworkDetect()?" and network":""}`}judgeList(e){let t=this.shadowRoot.querySelector(".camerasvg"),i=this.shadowRoot.querySelector(".microphonesvg"),A=this.shadowRoot.querySelector(".speakersvg"),o=this.shadowRoot.querySelector(".networksvg");e.indexOf("camera")>=0?t.style.display="block":t.style.display="none",e.indexOf("microphone")>=0?i.style.display="block":i.style.display="none",e.indexOf("speaker")>=0?A.style.display="block":A.style.display="none",e.indexOf("network")>=0?o.style.display="block":o.style.display="none"}async getDeviceConnectResult(){let e=[],t=[],i=[];try{let{cameras:l,speakers:d,microphones:m}=await O();e=l,t=m,i=d}catch(l){}let A=e.length>0,o=t.length>0,s=this.hasSpeakerDetect()?this.isFirefoxOrIOS||i.length>0:!0,n=this.hasNetworkDetect()?await MV():!0,r={hasCameraDevice:A,hasMicrophoneDevice:o,hasSpeakerDevice:s,hasNetworkConnect:n,hasCameraConnect:!1,hasMicrophoneConnect:!1,hasSpeakerConnect:s};this.deviceState=r,this.remindAnimation=!1,this.connectResult=this.getDeviceConnectInfo(r);let p=[];A&&p.push(new Promise((l,d)=>{navigator.mediaDevices.getUserMedia({video:!0,audio:!1}).then(m=>{this.remindAnimation=!1,r=L(F({},r),{hasCameraConnect:!0}),this.deviceState=r,this.connectResult=this.getDeviceConnectInfo(r),m.getTracks()[0].stop(),l()}).catch(m=>{it(m),l()})})),o&&p.push(new Promise((l,d)=>{navigator.mediaDevices.getUserMedia({video:!1,audio:!0}).then(m=>{this.remindAnimation=!1,r=L(F({},r),{hasMicrophoneConnect:o}),this.deviceState=r,this.connectResult=this.getDeviceConnectInfo(r),m.getTracks()[0].stop(),l()}).catch(m=>{it(m),l()})})),await Promise.all(p),this.handler(this.showConnectResult)}getDeviceConnectInfo(e){this.remindAnimation=!1;let t="\u8FDE\u63A5\u51FA\u9519\uFF0C\u8BF7\u91CD\u8BD5";return this.isChinese||(t="Connection error, please try again"),e.hasCameraConnect&&e.hasMicrophoneConnect&&e.hasSpeakerConnect&&e.hasNetworkConnect?(this.isChinese?t=this.hasNetworkDetect?"\u8BBE\u5907\u53CA\u7F51\u7EDC\u8FDE\u63A5\u6210\u529F\uFF0C\u8BF7\u5F00\u59CB\u8BBE\u5907\u68C0\u6D4B":"\u8BBE\u5907\u8FDE\u63A5\u6210\u529F\uFF0C\u8BF7\u5F00\u59CB\u8BBE\u5907\u68C0\u6D4B":t=this.hasNetworkDetect?"Device and network connection are successful, start device detection":"Device connection successful, start device detection",{info:t,success:!0}):e.hasCameraDevice&&e.hasMicrophoneDevice&&e.hasSpeakerDevice?e.hasCameraConnect&&e.hasMicrophoneConnect?e.hasNetworkConnect?{info:t,success:!1}:(this.isChinese?t="\u7F51\u7EDC\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5":t="Network connection failed, please check network connection",{info:t,success:!1,remind:this.isChinese?C.networkFailAttention:C.networkFailAttentionEng}):(this.isChinese?t=e.hasNetworkConnect?"\u8BF7\u5141\u8BB8\u6D4F\u89C8\u5668\u53CA\u7F51\u9875\u8BBF\u95EE\u6444\u50CF\u5934/\u9EA6\u514B\u98CE\u8BBE\u5907":"\u8BF7\u5141\u8BB8\u6D4F\u89C8\u5668\u53CA\u7F51\u9875\u8BBF\u95EE\u6444\u50CF\u5934/\u9EA6\u514B\u98CE\u8BBE\u5907\uFF0C\u5E76\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5":t=e.hasNetworkConnect?"Please allow browser and web access to camera/microphone devices":"Please allow browser and web access to camera/microphone devices, and check the network connection",this.remindAnimation=!0,{info:t,success:!1,remind:this.isMobile?this.isChinese?C.mobileFailAttention:C.mobileFailAttentionEng:this.isChinese?C.deviceFailAttention:C.deviceFailAttentionEng}):(this.isChinese?t=`\u68C0\u6D4B\u5230${e.hasCameraDevice?"":"\u3010\u6444\u50CF\u5934\u3011"}${e.hasMicrophoneDevice?"":"\u3010\u9EA6\u514B\u98CE\u3011"}${e.hasSpeakerDevice?"":"\u3010\u626C\u58F0\u5668\u3011"}\u8BBE\u5907\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u8BBE\u5907\u8FDE\u63A5`:t=`No ${e.hasCameraDevice?"":"\u3010camera\u3011"}${e.hasMicrophoneDevice?"":"\u3010microphone\u3011"}${e.hasSpeakerDevice?"":"\u3010speaker\u3011"} device detected, please check the device connection`,{info:t,success:!1})}handleReset(){this.progress=0,this.showConnectResult=!1,this.setAttribute("showconnectresult",this.showConnectResult)}async attributeChangedCallback(e,t,i){if(e==="showconnectresult"){if(i==="true"){let A=this.shadowRoot.querySelector(".camerasvg"),o=this.shadowRoot.querySelector(".microphonesvg"),s=this.shadowRoot.querySelector(".speakersvg"),n=this.shadowRoot.querySelector(".networksvg"),r=this.shadowRoot.querySelector(".outer-progress"),p=this.shadowRoot.querySelector("trtc-custom-button");if(this.deviceState.hasCameraConnect?(A.classList.remove("connect-fail"),A.classList.add("connect-success")):A.classList.add("connect-fail"),this.deviceState.hasMicrophoneConnect?(o.classList.remove("connect-fail"),o.classList.add("connect-success")):o.classList.add("connect-fail"),this.deviceState.hasSpeakerConnect?(s.classList.add("connect-success"),s.classList.remove("connect-fail")):s.classList.add("connect-fail"),this.deviceState.hasNetworkConnect?(n.classList.add("connect-success"),n.classList.remove("connect-fail")):n.classList.add("connect-fail"),this.showReconnectButton()&&(p.setAttribute("type","outlined"),this.isChinese?p.innerHTML="\u91CD\u65B0\u8FDE\u63A5":p.innerHTML="Reconnect",p.addEventListener("click",()=>{this.remindAnimation=!1;let l=new CustomEvent("remind-changed",{detail:this.remindAnimation});this.dispatchEvent(l);let d=new Date().getTime();g&&g.kvStatManager.addFailedEvent({key:591704,error:d-this.startTime}),this.handleReset()})),this.showStartDetectButton()&&(p.setAttribute("type","contained"),this.setAttribute("connectstage",1),this.isChinese?p.innerHTML="\u5F00\u59CB\u68C0\u6D4B":p.innerHTML="Start detection"),this.showConnectResult){r.style.display="none",this.shadowRoot.querySelector(".gray-text").style.display="none";let l=this.shadowRoot.querySelector(".result");l.style.display="block",this.connectResult.success===!0?l.classList.add("green-text"):(l.classList.add("red-text"),this.connectResult.remind&&(this.shadowRoot.querySelector(".error-connect").style.display="inline-block")),l.querySelector("span").innerHTML=this.connectResult.info}}else if(i==="false"){let A=this.shadowRoot.querySelector(".camerasvg"),o=this.shadowRoot.querySelector(".microphonesvg"),s=this.shadowRoot.querySelector(".speakersvg"),n=this.shadowRoot.querySelector(".networksvg"),r=this.shadowRoot.querySelector(".outer-progress"),p=this.shadowRoot.querySelector("trtc-custom-button");r.style.display="block",this.shadowRoot.querySelector(".result").classList.remove("green-text"),this.shadowRoot.querySelector(".result").classList.remove("red-text"),A.classList.remove("connect-fail"),A.classList.remove("connect-success"),o.classList.remove("connect-fail"),o.classList.remove("connect-success"),s.classList.remove("connect-fail"),s.classList.remove("connect-success"),n.classList.remove("connect-fail"),n.classList.remove("connect-success"),p.setAttribute("type","disabled"),this.isChinese?p.innerHTML="\u5F00\u59CB\u68C0\u6D4B":p.innerHTML="Start detection",this.getDeviceConnectResult(),this.shadowRoot.querySelector(".gray-text").style.display="block";let l=this.shadowRoot.querySelector(".result");l.style.display="none",this.shadowRoot.querySelector(".error-connect").style.display="none"}}}};h(C,"observedAttributes",["stepnamelist","showconnectresult"]),h(C,"properties",{showRemind:{type:Boolean},constTime:{type:Number}}),h(C,"deviceFailAttention","1. \u82E5\u6D4F\u89C8\u5668\u5F39\u51FA\u63D0\u793A\uFF0C\u8BF7\u9009\u62E9\u201C\u5141\u8BB8\u201D<br>2. \u82E5\u6740\u6BD2\u8F6F\u4EF6\u5F39\u51FA\u63D0\u793A\uFF0C\u8BF7\u9009\u62E9\u201C\u5141\u8BB8\u201D<br>3. \u68C0\u67E5\u7CFB\u7EDF\u8BBE\u7F6E\uFF0C\u5141\u8BB8\u6D4F\u89C8\u5668\u8BBF\u95EE\u6444\u50CF\u5934\u53CA\u9EA6\u514B\u98CE<br>4. \u68C0\u67E5\u6D4F\u89C8\u5668\u8BBE\u7F6E\uFF0C\u5141\u8BB8\u7F51\u9875\u8BBF\u95EE\u6444\u50CF\u5934\u53CA\u9EA6\u514B\u98CE<br>5. \u68C0\u67E5\u6444\u50CF\u5934/\u9EA6\u514B\u98CE\u662F\u5426\u6B63\u786E\u8FDE\u63A5\u5E76\u5F00\u542F<br>6. \u5C1D\u8BD5\u91CD\u65B0\u8FDE\u63A5\u6444\u50CF\u5934/\u9EA6\u514B\u98CE<br>7. \u5C1D\u8BD5\u91CD\u542F\u8BBE\u5907\u540E\u91CD\u65B0\u68C0\u6D4B"),h(C,"deviceFailAttentionEng",'1. If the browser prompts, select "Allow"<br>2. If the antivirus software prompts, select "Allow"<br>3. Check system settings to allow camera and microphone<br>4. Check browser settings to allow camera and microphone<br>5. Check camera/microphone turned on<br>6. Try reconnecting the camera/microphone<br>7. Try restarting the device and retesting'),h(C,"mobileFailAttention","1. \u524D\u5F80\u624B\u673A\u8BBE\u7F6E,\u6253\u5F00\u672C\u5E94\u7528\u7684\u76F8\u673A\u548C\u9EA6\u514B\u98CE\u6743\u9650<br>2. \u91CD\u65B0\u5237\u65B0\u672C\u9875\u5E76\u5141\u8BB8\u76F8\u673A\u548C\u9EA6\u514B\u98CE\u6743\u9650<br>"),h(C,"mobileFailAttentionEng","1.  Go to your phone Settings to allow camera and microphone permissions for this app <br>2. Refresh this page and allow camera and microphone permissions <br>"),h(C,"networkFailAttention","1. \u8BF7\u68C0\u67E5\u8BBE\u5907\u662F\u5426\u8054\u7F51<br>2. \u8BF7\u5237\u65B0\u7F51\u9875\u540E\u518D\u6B21\u68C0\u6D4B<br>3. \u8BF7\u5C1D\u8BD5\u66F4\u6362\u7F51\u7EDC\u540E\u518D\u6B21\u68C0\u6D4B"),h(C,"networkFailAttentionEng","1. Check if the device is connected to the network<br>2. Refresh the page and test again<br>3. Try again after changing the network");var De=C;customElements.get("trtc-device-connect")||customElements.define("trtc-device-connect",De);var Ae=class extends E{constructor(){super(),this.deviceList=[],this.activeDevice={},this.activeDeviceId="",this.attachShadow({mode:"open"})}async getDeviceListData(){let e=await UV(this.deviceType),t=e.map(i=>i.deviceId);this.deviceList=e,this.choseDevice&&t.indexOf(this.choseDevice.deviceId)>=0?(this.activeDevice=e.find(i=>i.deviceId===this.choseDevice.deviceId),this.activeDeviceId=this.choseDevice.deviceId):(this.activeDevice=e[0],this.activeDeviceId=e[0].deviceId),this.onChange(this.activeDevice),this.requestUpdate()}async firstUpdated(){await this.getDeviceListData(),navigator.mediaDevices.addEventListener("devicechange",async()=>{let e=await UV(this.deviceType);this.deviceList=e,e[0].deviceId!==this.activeDeviceId&&(this.activeDevice=e[0],this.activeDeviceId=e[0].deviceId,this.onChange(this.activeDevice)),this.requestUpdate()})}disconnectedCallback(){this.remove()}handleChange(e){let t=e.target.value;g&&g.kvStatManager.addEnum({key:591713,value:1});let i=this.deviceList.find(A=>A.deviceId===t);this.activeDevice=i,this.activeDeviceId=t,this.onChange(this.activeDevice),this.requestUpdate()}render(){return q`
      <style>${f}</style>
      <div>
        <select class="device-select" value=${this.activeDeviceId} @change=${this.handleChange}>
          ${this.deviceList.map((e,t)=>q`<option value=${e.deviceId} key=${t}>${e.label}</option>`)}
        </select>
      </div>
    `}};h(Ae,"properties",{deviceType:{type:String},onChange:{type:Function},choseDevice:{type:Object}});customElements.get("trtc-device-select")||customElements.define("trtc-device-select",Ae);var UV=async V=>{let e=[];switch(V){case"camera":e=(await uV()).cameraList;break;case"microphone":e=(await EV()).microphoneList;break;case"speaker":e=await CV();break;default:break}return e};var oe=class extends E{constructor(){super();h(this,"handleCameraChange",async t=>{var s;this.choseDevice=t;let{deviceId:i,label:A}=t,o=this.shadowRoot.querySelector("video");this.localStream?((s=this.localStream)==null||s.getTracks().forEach(n=>n.stop()),this.initStream(i)):this.initStream(i),this.cameraID=i,this.cameraLabel=A,this.device=t});this.currentDetector="camera",this.localStream=null,this.cameraLabel="",this.cameraID="",this.choseDevice=null,this.device=null;let t=navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||"en";this.isChinese=t.indexOf("zh")>-1,this.attachShadow({mode:"open"})}async initStream(t){let i=this.shadowRoot.querySelector("video");i.addEventListener("touchstart",o=>{o.preventDefault()});let A={video:{deviceId:{exact:t}},audio:!1};navigator.mediaDevices.getUserMedia(A).then(o=>{this.localStream=o,i.srcObject=o,i.play})}handleError(){var i;u&&u.warn("CameraFail",this.device),this.handleComplete("error",this.cameraLabel,!1,this.device);let t=new Date().getTime();(i=this.localStream)==null||i.getTracks().forEach(A=>A.stop()),g&&g.kvStatManager.addFailedEvent({key:591706,error:t-this.constructTime})}handleSuccess(){var i;this.handleComplete("success",this.cameraLabel,!0,this.device);let t=new Date().getTime();(i=this.localStream)==null||i.getTracks().forEach(A=>A.stop()),g&&g.kvStatManager.addSuccessEvent({key:591705,cost:t-this.constructTime})}firstUpdated(){}updated(t){t.has("activeDetector")&&this.activeDetector===this.currentDetector&&!this.localStream&&this.cameraID&&this.initStream(this.cameraID)}render(){return q`
      <style>${f}</style>
      <div ?if=${this.activeDetector===this.currentDetector} class="testing-body">
        <div class="device-list">
          <span class="device-list-title">${this.isChinese?"\u6444\u50CF\u5934\u9009\u62E9":"Camera Selection"}</span>
          <trtc-device-select deviceType="camera" .choseDevice=${this.choseDevice} .onChange=${this.handleCameraChange}></trtc-device-select>
        </div>
        <video id="camera-video" class="camera-video" autoplay  x5-playsinline="true" playsinline="true" webkit-playsinline="true" x-webkit-airplay="true" x5-video-orientation="portraint"></video>
        <div class="testing-info-container">
          <div class="testing-info">${this.isChinese?"\u662F\u5426\u53EF\u4EE5\u6E05\u695A\u5730\u770B\u5230\u81EA\u5DF1\uFF1F":"Can you see yourself clearly?"}</div>
          <div class="button-list">
            <trtc-custom-button type="outlined" @click=${this.handleError}>${this.isChinese?"\u770B\u4E0D\u5230":"No"}</trtc-custom-button>
            <trtc-custom-button type="contained" @click=${this.handleSuccess}>${this.isChinese?"\u770B\u7684\u5230":"Yes"}</trtc-custom-button>
          </div>
        </div>
      </div>
    `}};h(oe,"properties",{activeDetector:{type:String},handleComplete:{type:Function},constructTime:{type:Number}});customElements.get("trtc-camera-detector")||customElements.define("trtc-camera-detector",oe);var se=class extends E{constructor(){super();h(this,"handleMicrophoneChange",async t=>{this.choseDevice=t;let{deviceId:i,label:A}=t;this.localStream?(this.localStream.getTracks().forEach(o=>o.stop()),this.timer&&clearInterval(this.timer),this.initStream(i)):this.initStream(i),this.microphoneID=i,this.microphoneLabel=A,this.device=t});this.currentDetector="microphone",this.localStream=null,this.microphoneID="",this.microphoneLabel="",this.volumeNum=0,this.choseDevice=null,this.timer=null,this.time=null,this.recording=!1,this.recordingTime=0,this.audioURL="",this.recorder=null,this.chunks=[],this.disconnect=!1,this.device=null;let t=navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||"en";this.isChinese=t.indexOf("zh")>-1,this.attachShadow({mode:"open"})}updated(t){var i;t.has("activeDetector")&&this.activeDetector===this.currentDetector&&!this.localStream&&this.microphoneID&&this.initStream(this.microphoneID),this.activeDetector!==this.currentDetector&&((i=this.localStream)==null||i.getTracks().forEach(A=>{A.stop()}),this.timer&&clearInterval(this.timer))}handleError(){var i;u&&u.warn("MicphoneFail",this.device);let t=new Date().getTime();g&&g.kvStatManager.addFailedEvent({key:591708,error:t-this.constructTime}),this.handleComplete("error",this.microphoneLabel,!1,this.device,this.audioURL),(i=this.localStream)==null||i.getTracks().forEach(A=>{A.stop()}),this.timer&&clearInterval(this.timer)}handleSuccess(){var i;let t=new Date().getTime();g&&g.kvStatManager.addSuccessEvent({key:591707,cost:t-this.constructTime}),this.handleComplete("success",this.microphoneLabel,!0,this.device,this.audioURL),(i=this.localStream)==null||i.getTracks().forEach(A=>{A.stop()}),this.timer&&clearInterval(this.timer)}firstUpdated(){}async initStream(t){this.localStream=await navigator.mediaDevices.getUserMedia({audio:{deviceId:t},video:!1});let i=new AudioContext,A=i.createAnalyser(),o=i.createMediaStreamSource(this.localStream);A.smoothingTimeConstant=.8,A.fftSize=1024,o.connect(A),this.timer=setInterval(()=>{let s=new Uint8Array(A.fftSize);A.getByteTimeDomainData(s);let n=0,{length:r}=s;for(let d=0;d<r;d++)n+=s[d];let l=(n/r-128)/128;this.volumeNum=Math.round(Math.abs(l*28)*50),this.requestUpdate()},100)}handleRecordClick(){let t=this.shadowRoot.querySelector(".recordingbutton");this.recording?(t.setAttribute("type","outlined"),this.recording=!1,this.recordingStartTime=null,this.time&&clearInterval(this.time),this.recorder.stop()):(t.setAttribute("type","contained"),this.recording=!0,this.recordingStartTime=Date.now(),this.recordingTime=0,this.time=setInterval(()=>{this.recordingTime=((Date.now()-this.recordingStartTime)/1e3).toFixed(2)},100),this.startRecording())}startRecording(){this.localStream&&(this.recording=!0,this.recorder=new MediaRecorder(this.localStream),this.recorder.start(),this.recorder.ondataavailable=t=>{this.chunks.push(t.data)},this.recorder.onstop=()=>{let t=new Blob(this.chunks,{type:"audio/ogg; codecs=opus"});this.audioURL=window.URL.createObjectURL(t)})}disconnectedCallback(){this.localStream&&this.localStream.getTracks().forEach(t=>{t.stop()}),this.timer&&clearInterval(this.timer),this.disconnect=!0,this.remove()}render(){return this.disconnect&&this.timer&&clearInterval(this.timer),this.activeDetector===this.currentDetector?q`
          <style>${f}</style>
          <div class="testing-body">
            <div class="device-list">
              <span class="device-list-title">${this.isChinese?"\u9EA6\u514B\u98CE\u9009\u62E9":"Microphone Selection"}</span>
              <trtc-device-select deviceType="microphone" .choseDevice=${this.choseDevice} .onChange=${this.handleMicrophoneChange}></trtc-device-select>
            </div>
            <div class="mic-testing-container">
              <div class="mic-testing-info">${this.isChinese?'\u5BF9\u7740\u9EA6\u514B\u98CE\u8BF4"\u54C8\u55BD"\u8BD5\u8BD5\uFF5E':'Try saying "Hello" into the microphone'}</div>
              <div class="mic-bar-container">
                ${Array.from({length:28},(t,i)=>q`<div class="${`mic-bar ${this.volumeNum>i&&"active"}`}"></div>`)}
              </div>
              <div id="audio-container"></div>
            </div>
            <div class="testing-info-container">
              <div class="testing-info">${this.isChinese?"\u662F\u5426\u53EF\u4EE5\u770B\u5230\u97F3\u91CF\u56FE\u6807\u8DF3\u52A8\uFF1F":"Can see the volume icon bounce?"}</div>
              <div class="button-list">
                <trtc-custom-button type="outlined" @click=${this.handleError}>${this.isChinese?"\u770B\u4E0D\u5230":"No"}</trtc-custom-button>
                <trtc-custom-button type="contained" @click=${this.handleSuccess}>${this.isChinese?"\u770B\u7684\u5230":"Yes"}</trtc-custom-button>
              </div>
            </div>
          </div>
        `:q``}};h(se,"properties",{activeDetector:{type:String},handleComplete:{type:Function},constructTime:{type:Number}});customElements.get("trtc-mic-detector")||customElements.define("trtc-mic-detector",se);var re=class extends E{constructor(){super();h(this,"handleSpeakerChange",async t=>{var o,s;this.choseDevice=t;let{deviceId:i,label:A}=t;this.audioPlayer&&i&&await((s=(o=this.audioPlayer).setSinkId)==null?void 0:s.call(o,i)),this.audioPlayer.src=this.audioUrl,this.speakerLabel=A,this.device=t});this.audioPlayer=null,this.currentDetector="speaker",this.speakerLabel="",this.audioUrl="",this.choseDevice=null;let t=navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||"en";this.isChinese=t.indexOf("zh")>-1,this.attachShadow({mode:"open"})}firstUpdated(){}updated(t){t.has("activeDetector")&&(this.activeDetector===this.currentDetector&&(this.audioPlayer=this.shadowRoot.getElementById("audio-player")),t.get("activeDetector")===this.currentDetector&&(this.audioPlayer&&!this.audioPlayer.paused&&this.audioPlayer.pause(),this.audioPlayer&&(this.audioPlayer.currentTime=0)))}handleError(){u&&u.warn("SpeakerFail",this.device);let t=new Date().getTime();g&&g.kvStatManager.addFailedEvent({key:591710,error:t-this.constructTime}),this.handleComplete("error",this.speakerLabel,!1,this.device)}handleSuccess(){this.handleComplete("success",this.speakerLabel,!0,this.device);let t=new Date().getTime();g&&g.kvStatManager.addSuccessEvent({key:591709,cost:t-this.constructTime})}render(){return this.activeDetector===this.currentDetector?q`
        <style>${f}</style>
          <div class="testing-body">
            <div class="device-list">
              <span class="device-list-title">${this.isChinese?"\u626C\u58F0\u5668\u9009\u62E9":"Speaker Selection"}</span>
              <trtc-device-select deviceType="speaker" .choseDevice=${this.choseDevice} .onChange=${this.handleSpeakerChange}></trtc-device-select>
            </div>
            <div class="audio-player-container">
              <div class="audio-player-info">${this.isChinese?"\u8BF7\u8C03\u9AD8\u8BBE\u5907\u97F3\u91CF\uFF0C\u70B9\u51FB\u64AD\u653E\u4E0B\u9762\u7684\u97F3\u9891\u8BD5\u8BD5\uFF5E":"Please turn up the volume on your device and click Play the audio below to try it out"}</div>
              <audio id="audio-player" src=${this.audioUrl} controls ></audio>
            </div>
            <div class="testing-info-container">
              <div class="testing-info">${this.isChinese?"\u662F\u5426\u53EF\u4EE5\u542C\u5230\u58F0\u97F3\uFF1F":"Can you hear the sound?"}</div>
              <div class="button-list">
                <trtc-custom-button type="outlined" @click=${this.handleError}>${this.isChinese?"\u542C\u4E0D\u5230":"No"}</trtc-custom-button>
                <trtc-custom-button type="contained" @click=${this.handleSuccess}>${this.isChinese?"\u542C\u7684\u5230":"Yes"}</trtc-custom-button>
              </div>
            </div>
          </div>
        `:q``}};h(re,"properties",{audioUrl:{type:String},activeDetector:String,handleComplete:Function,constructTime:{type:Number}});customElements.get("trtc-speaker-detector")||customElements.define("trtc-speaker-detector",re);var ne=class extends E{constructor(){super(),this.NETWORK_QUALITY={},this.currentDetector="network",this.detectorInfo={},this.count=15,this.timer=null,this.networkInfo=null,this.testResult={uplinkNetworkQualities:[],downlinkNetworkQualities:[],rttList:[],average:{uplinkNetworkQuality:0,downlinkNetworkQuality:0,rtt:0},result:{rtt:0,quality:0}},this._initializeTRTC(),this.isDownlink=!1,this.networkInfo&&this.networkInfo.downlinkUserId&&this.networkInfo.downlinkUserSig&&(this.isDownlink=!0),this.Enum={0:"0\uFF1A\u7F51\u7EDC\u72B6\u51B5\u672A\u77E5",1:"1\uFF1A\u7F51\u7EDC\u72B6\u51B5\u6781\u4F73",2:"2\uFF1A\u7F51\u7EDC\u72B6\u51B5\u8F83\u597D",3:"3\uFF1A\u7F51\u7EDC\u72B6\u51B5\u4E00\u822C",4:"4\uFF1A\u7F51\u7EDC\u72B6\u51B5\u8F83\u5DEE",5:"5\uFF1A\u7F51\u7EDC\u72B6\u51B5\u6781\u5DEE",6:"6\uFF1A\u7F51\u7EDC\u8FDE\u63A5\u65AD\u5F00"},this.EnumEng={0:"0: unknown",1:"1: excellent",2:"2: good",3:"3: fair",4:"4: poor",5:"5: very poor",6:"6: disconnected"};let e=navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||"en";this.isChinese=e.indexOf("zh")>-1,this.attachShadow({mode:"open"})}_initializeTRTC(){this.networkInfo=S.networkInfo,Object.defineProperty(S,"networkInfo",{set:e=>{this.networkInfo=e},get:()=>this.networkInfo})}firstUpdated(){}updated(e){e.has("activeDetector")&&this.activeDetector===this.currentDetector&&this.count!==0&&(this.count=15,this.getDetectorInfo())}async testUplinkNetworkQuality(){let{sdkAppId:e,uplinkTRTC:t,userId:i,userSig:A,roomId:o}=this.networkInfo;try{await t.exitRoom()}catch(s){}await t.enterRoom({roomId:o||8080,sdkAppId:e,userId:i,userSig:A,scene:"rtc"}),!this.hasStartLocalVideo&&await t.startLocalVideo({option:{profile:"480p"}}),this.setHasStartLocalVideo(),this.hasStartLocalVideo=!0,t.on(g.TRTC.EVENT.NETWORK_QUALITY,s=>{let{uplinkNetworkQuality:n,uplinkRTT:r}=s;this.testResult.uplinkNetworkQualities.push(n),this.testResult.rttList.push(r)})}async testDownlinkNetworkQuality(){let{sdkAppId:e,downlinkUserId:t,downlinkTRTC:i,downlinkUserSig:A,roomId:o}=this.networkInfo;try{await i.exitRoom()}catch(s){}await i.enterRoom({roomId:o||8080,sdkAppId:e,userId:t,userSig:A,scene:"rtc"}),i.on(g.TRTC.EVENT.NETWORK_QUALITY,s=>{let{downlinkNetworkQuality:n}=s;this.testResult.downlinkNetworkQualities.push(n)})}async getDetectorInfo(){let e=S.getSystem(),t=await S.isTRTCSupported(),i=S.getAPISupported();this.detectorInfo={system:e.OS,browser:`${e.browser.name} ${e.browser.version}`,TRTCSupport:t.result?"Yes":"No",screenMediaSupport:i.isScreenCaptureAPISupported?"Yes":"No"},this.timer=setInterval(()=>{this.count=this.count-1,this.requestUpdate(),this.count===0&&clearInterval(this.timer)},1e3),this.testUplinkNetworkQuality(),this.isDownlink&&this.testDownlinkNetworkQuality(),setTimeout(async()=>{this.testResult.uplinkNetworkQualities.length>0&&(this.testResult.average.uplinkNetworkQuality=Math.ceil(this.testResult.uplinkNetworkQualities.reduce((A,o)=>A+o,0)/this.testResult.uplinkNetworkQualities.length)),this.testResult.downlinkNetworkQualities.length>0&&(this.testResult.average.downlinkNetworkQuality=Math.ceil(this.testResult.downlinkNetworkQualities.reduce((A,o)=>A+o,0)/this.testResult.downlinkNetworkQualities.length)),this.testResult.rttList.length>0&&(this.testResult.average.rtt=Math.ceil(this.testResult.rttList.reduce((A,o)=>A+o,0)/this.testResult.rttList.length)),this.testResult.average.uplinkNetworkQuality===0||this.isDownlink&&this.testResult.average.downlinkNetworkQuality===0?this.testResult.result.quality=0:this.testResult.result.quality=Math.max(this.testResult.average.uplinkNetworkQuality,this.testResult.average.downlinkNetworkQuality),this.testResult.result.rtt=this.testResult.average.rtt,this.requestUpdate(),await this.networkInfo.uplinkTRTC.stopLocalVideo(),this.networkInfo.uplinkTRTC.exitRoom(),this.isDownlink&&this.networkInfo.downlinkTRTC.exitRoom()},15*1e3)}disconnectedCallback(){this.timer&&clearInterval(this.timer),this.remove()}async handleSuccess(){this.hasStartLocalVideo&&await this.networkInfo.uplinkTRTC.stopLocalVideo(),this.generateReport();let e=new Date().getTime();g&&g.kvStatManager.addSuccessEvent({key:591711,cost:e-this.constructTime}),(this.testResult.result.quality===0||this.testResult.result.rtt===0)&&u&&u.warn("NetworkFail",this.testResult.average),this.handleComplete("success",this.testResult.result,this.testResult.result.quality!==0)}render(){return this.activeDetector===this.currentDetector?q`
          <style>${f}</style>
          <div class="testing-body">
            <div class="testing-list">
              <div class="testing-item-container">
                <div>${this.isChinese?"\u64CD\u4F5C\u7CFB\u7EDF":"Operating System"}</div>
                <div class=${this.detectorInfo.system?"":"network-loading"}>
                  ${this.detectorInfo.system}
                </div>
              </div>
              <div class="testing-item-container">
                <div>${this.isChinese?"\u6D4F\u89C8\u5668":"Browser"}</div>
                <div class=${this.detectorInfo.browser?"":"network-loading"}>
                  ${this.detectorInfo.browser}
                </div>
              </div>
              <div class="testing-item-container">
                <div>${this.isChinese?"\u662F\u5426\u652F\u6301TRTC":"Whether TRTC is supported"}</div>
                <div class=${this.detectorInfo.TRTCSupport?"":"network-loading"}>
                  ${this.detectorInfo.TRTCSupport}
                </div>
              </div>

              <div class="testing-item-container">
                <div>${this.isChinese?"\u662F\u5426\u652F\u6301\u5C4F\u5E55\u5206\u4EAB":"Whether screen sharing is supported"}</div>
                <div class=${this.detectorInfo.screenMediaSupport?"":"network-loading"}>
                  ${this.detectorInfo.screenMediaSupport}
                </div>
              </div>

              <div class="testing-item-container">
                <div>${this.isChinese?"\u7F51\u7EDC\u5EF6\u65F6":"Network delay"}</div>
                <div class=${this.testResult.average.rtt?"":"network-loading"}>
                  ${this.testResult.average.rtt?`${this.testResult.average.rtt}ms`:""}
                </div>
              </div>
              <div class="testing-item-container">
                <div>${this.isChinese?"\u7F51\u7EDC\u8D28\u91CF":"Network quality"}</div>
                <div class=${this.testResult.average.uplinkNetworkQuality?"":"network-loading"}>
                  ${this.testResult.average.uplinkNetworkQuality?this.isChinese?this.Enum[this.testResult.result.quality]:this.EnumEng[this.testResult.result.quality]:""}
              </div>
           </div>

          </div>
            ${this.count>0?q`<trtc-custom-button class="gray-button" type="disabled">${this.isChinese?"\u5269\u4F59\u68C0\u6D4B\u65F6\u95F4":"Remaining time"}（${this.count}）s</trtc-custom-button>`:q`<trtc-custom-button class="report-button" type="contained" @click=${e=>{this.handleSuccess()}}>${this.isChinese?"\u67E5\u770B\u68C0\u6D4B\u62A5\u544A":"View detect report"}</trtc-custom-button>`}
          </div>
        `:q``}};h(ne,"properties",{activeDetector:String,networkDetectInfo:Object,handleComplete:Function,generateReport:Function,testResult:Object,hasStartLocalVideo:Boolean,setHasStartLocalVideo:Function,constructTime:Number});customElements.get("trtc-network-detector")||customElements.define("trtc-network-detector",ne);var ae=class extends E{constructor(){super();let e=navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||"en";this.isChinese=e.indexOf("zh")>-1,this.attachShadow({mode:"open"})}render(){return q`
    <style>${f}</style>
      <div class="device-testing-report">
        <div class="testing-title">${this.isChinese?"\u68C0\u6D4B\u62A5\u544A":"Detect Report"}</div>
        <div class="device-report-list">
          <div class="device-report">
            <div class="device-info">
              <span class="report-icon">
                <!-- 摄像头图标 -->
                <svg t="1630397874793" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="958" width="24" height="24"><path d="M489.244444 0a460.8 460.8 0 1 1 0 921.6A460.8 460.8 0 0 1 489.244444 0z m0 204.8a256 256 0 1 0 0 512 256 256 0 0 0 0-512z" fill="#47494D" opacity=".8" p-id="959"></path><path d="M489.244444 460.8m-153.6 0a153.6 153.6 0 1 0 307.2 0 153.6 153.6 0 1 0-307.2 0Z" fill="#47494D" opacity=".8" p-id="960"></path><path d="M120.604444 952.32a368.64 61.44 0 1 0 737.28 0 368.64 61.44 0 1 0-737.28 0Z" fill="#47494D" opacity=".8" p-id="961"></path></svg>
              </span>
              <div class="device-name">${this.reportData.camera.result}</div>
            </div>
            <div class="${this.reportData.camera.type==="success"?"green":"red"}">
              ${this.reportData.camera.type==="success"?this.isChinese?"\u6B63\u5E38":"normal":this.isChinese?"\u5F02\u5E38":"abnormal"}
            </div>
          </div>
          <div class="device-report">
            <div class="device-info">
              <span class="report-icon">
                <!-- 麦克风图标 -->
                <svg t="1630397938861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1205" width="24" height="24"><path d="M841.551448 434.423172A41.666207 41.666207 0 0 1 882.758621 476.548414c0 194.701241-144.454621 355.469241-329.551449 376.514207v86.722207h164.758069a41.666207 41.666207 0 0 1 41.207173 42.089931A41.666207 41.666207 0 0 1 717.965241 1024H306.034759A41.666207 41.666207 0 0 1 264.827586 981.874759a41.666207 41.666207 0 0 1 41.207173-42.089931h164.758069v-86.722207C285.696 832.052966 141.241379 671.249655 141.241379 476.548414a41.666207 41.666207 0 0 1 41.207173-42.125242 41.666207 41.666207 0 0 1 41.171862 42.125242c0 162.78069 129.129931 294.770759 288.379586 294.770758l8.827586-0.141241c155.153655-4.766897 279.552-134.850207 279.552-294.629517a41.666207 41.666207 0 0 1 41.171862-42.125242zM512 0c119.419586 0 216.275862 88.770207 216.275862 198.232276v317.228138c0 106.990345-92.513103 194.206897-208.154483 198.091034l-8.121379 0.141242c-119.419586 0-216.275862-88.770207-216.275862-198.232276V198.232276c0-106.990345 92.513103-194.206897 208.154483-198.091035L512 0z" fill="#47494D" opacity=".8" p-id="1206"></path></svg>
              </span>
              <div class="device-name">${this.reportData.microphone.result}</div>
            </div>
            <div class="${this.reportData.microphone.type==="success"?"green":"red"}">
              ${this.reportData.microphone.type==="success"?this.isChinese?"\u6B63\u5E38":"normal":this.isChinese?"\u5F02\u5E38":"abnormal"}
            </div>
          </div>
          ${this.reportData.speaker?q`
            <div class="device-report">
              <div class="device-info">
                <span class="report-icon">
                  <!-- 扬声器图标 -->
                  <svg t="1629186923749" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2923" width="24" height="24"><path d="M640 181.333333c0-46.037333-54.357333-70.4-88.746667-39.850666L359.552 311.850667a32 32 0 0 1-21.248 8.106666H181.333333A96 96 0 0 0 85.333333 415.957333v191.872a96 96 0 0 0 96 96h157.013334a32 32 0 0 1 21.248 8.106667l191.616 170.410667c34.389333 30.549333 88.789333 6.144 88.789333-39.850667V181.333333z m170.325333 70.272a32 32 0 0 1 44.757334 6.698667A424.917333 424.917333 0 0 1 938.666667 512a424.96 424.96 0 0 1-83.626667 253.696 32 32 0 0 1-51.413333-38.058667A360.917333 360.917333 0 0 0 874.666667 512a360.917333 360.917333 0 0 0-71.04-215.637333 32 32 0 0 1 6.698666-44.757334zM731.434667 357.12a32 32 0 0 1 43.392 12.928c22.869333 42.24 35.84 90.666667 35.84 141.994667a297.514667 297.514667 0 0 1-35.84 141.994666 32 32 0 0 1-56.32-30.464c17.92-33.152 28.16-71.082667 28.16-111.530666s-10.24-78.378667-28.16-111.530667a32 32 0 0 1 12.928-43.392z" fill="#47494D" opacity=".8" p-id="2924"></path></svg>
                </span>
                <div class="device-name">${this.reportData.speaker.result}</div>
              </div>
              <div class="${this.reportData.speaker.type==="success"?"green":"red"}">
                ${this.reportData.speaker.type==="success"?this.isChinese?"\u6B63\u5E38":"normal":this.isChinese?"\u5F02\u5E38":"abnormal"}
              </div>
            </div>`:""}
          ${this.reportData.network?q`
            <div class="device-report">
              <div class="device-info">
                <span class="report-icon">
                  <!-- 网络图标 -->
                  <svg t="1630400570252" class="icon" viewBox="0 0 1291 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1640" width="24" height="24"><path d="M992.211478 583.68A449.758609 449.758609 0 0 0 650.017391 426.295652c-136.904348 0-259.561739 61.039304-342.194087 157.384348a90.156522 90.156522 0 0 0 136.859826 117.359304 269.846261 269.846261 0 0 1 205.334261-94.430608c82.142609 0 155.737043 36.641391 205.334261 94.386087a90.156522 90.156522 0 1 0 136.859826-117.359305zM559.86087 922.134261a90.156522 90.156522 0 1 0 180.313043 0 90.156522 90.156522 0 0 0-180.313043 0z" fill="#47494D" opacity=".8" p-id="1641"></path><path d="M1253.064348 289.124174A809.316174 809.316174 0 0 0 650.017391 20.613565a809.316174 809.316174 0 0 0-603.046956 268.466087 90.156522 90.156522 0 1 0 127.777391 127.065044l0.311652 0.26713A629.581913 629.581913 0 0 1 650.017391 200.926609c189.395478 0 359.290435 83.389217 474.957913 215.485217l0.267131-0.26713a90.156522 90.156522 0 1 0 127.777391-127.065044z" fill="#47494D" opacity=".8" p-id="1642"></path></svg>
                </span>
                <div class="device-name">${this.isChinese?"\u7F51\u7EDC\u5EF6\u65F6":"Network delay"}</div>
              </div>
              <div class="${this.reportData.network.result.rtt<=200?"green":"red"}">
                ${this.reportData.network.result.rtt}ms
              </div>
            </div>
            <div class="device-report">
              <div class="device-info">
                <span class="report-icon">
                  <!-- 网络图标 -->
                  <svg t="1630400570252" class="icon" viewBox="0 0 1291 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1640" width="24" height="24"><path d="M992.211478 583.68A449.758609 449.758609 0 0 0 650.017391 426.295652c-136.904348 0-259.561739 61.039304-342.194087 157.384348a90.156522 90.156522 0 0 0 136.859826 117.359304 269.846261 269.846261 0 0 1 205.334261-94.430608c82.142609 0 155.737043 36.641391 205.334261 94.386087a90.156522 90.156522 0 1 0 136.859826-117.359305zM559.86087 922.134261a90.156522 90.156522 0 1 0 180.313043 0 90.156522 90.156522 0 0 0-180.313043 0z" fill="#47494D" opacity=".8" p-id="1641"></path><path d="M1253.064348 289.124174A809.316174 809.316174 0 0 0 650.017391 20.613565a809.316174 809.316174 0 0 0-603.046956 268.466087 90.156522 90.156522 0 1 0 127.777391 127.065044l0.311652 0.26713A629.581913 629.581913 0 0 1 650.017391 200.926609c189.395478 0 359.290435 83.389217 474.957913 215.485217l0.267131-0.26713a90.156522 90.156522 0 1 0 127.777391-127.065044z" fill="#47494D" opacity=".8" p-id="1642"></path></svg>
                </span>
                <div class="device-name">${this.isChinese?"\u7F51\u7EDC\u8D28\u91CF":"Network quality"}</div>
              </div>
              <div class="${this.goodUplinkQuality?"green":"red"}">
                ${this.isChinese?fV[this.reportData.network.result.quality]:wV[this.reportData.network.result.quality]}
              </div>
            </div>
            `:""}
        </div>
        <div class="device-report-footer">
          <trtc-custom-button type="outlined"  @click=${this.handleReset}>${this.isChinese?"\u91CD\u65B0\u68C0\u6D4B":"Detect Again"}</trtc-custom-button>
          <trtc-custom-button type="contained"  @click=${this.handleClose}>${this.isChinese?"\u5B8C\u6210\u68C0\u6D4B":"Completed"}</trtc-custom-button>
        </div>
      </div>
    `}firstUpdated(){}goodUplinkQuality(){return this.reportData.network.result.uplinkQuality>0&&this.reportData.network.result.uplinkQuality<4}goodDownlinkQuality(){return this.reportData.network.result.downlinkQuality>0&&this.reportData.network.result.downlinkQuality<4}};h(ae,"properties",{reportData:Object,handleReset:Function,handleClose:Function});customElements.get("trtc-detect-report")||customElements.define("trtc-detect-report",ae);var R=class R extends E{constructor(){super();h(this,"detectResult");h(this,"handleCompleted",(t,i,A=!1,o=null,s="")=>{this.completed[this.stepNameList[this.activeStep]]={completed:!0,type:t,result:i},this.stepNameList[this.activeStep]==="network"?this.completedResult[this.stepNameList[this.activeStep]]={isSuccess:A,result:i}:this.completedResult[this.stepNameList[this.activeStep]]={isSuccess:A,device:o},s.length!==0&&(this.audioURL=s),this.activeStep<=this.stepNameList.length-1&&(this.activeStep=this.activeStep+1,this.stepNameList.indexOf("network")<0&&this.activeStep===this.stepNameList.length&&(this.detectStage=2)),this.requestUpdate()});this.stepNameList=["camera","microphone","speaker"];let t=navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||"en";this.isChinese=t.indexOf("zh")>-1,this.detectStage=0,this.completed={},this.completedResult={},this.activeStep=0,this.audioURL="",this.isCompleted=!1,this.baseURL="data:audio/mp3;base64,",this.isChinese?this.audioURL=this.baseURL+HV:this.audioURL=this.baseURL+XV,this.uplinkTRTC={},this.sdkAppId=0,this.isOpen=!0,this.hasStartLocalVideo=!1,this.remind=!1,this.envresult=S.getSystem(),this.isMobile=this.envresult.OS==="iOS"||this.envresult.OS==="Android",this.constructTime=new Date().getTime(),this.cameraHasBeenActive=!1,this.microphoneHasBeenActive=!1,this.SpeakerHasBeenActive=!1,this.networkHasBeenActive=!1,this._initializeTRTC(),this.attachShadow({mode:"open"})}triggerCompletedEvent(){let t=new Event("detectorCompleted");this.dispatchEvent(t)}static registerTag(){customElements.get("detector-element")||customElements.define("detector-element",R)}_initializeTRTC(){let t=S.networkInfo;S.networkInfo&&this.stepNameList.indexOf("network")<0&&this.stepNameList.push("network"),Object.defineProperty(S,"networkInfo",{set:i=>{this.stepNameList.indexOf("network")<0&&this.stepNameList.push("network"),t=i},get:()=>t})}render(){return this.isOpen===!0?q`
      <style>${f}</style>
      ${this.remind===!0&&this.envresult.OS!=="iOS"&&this.envresult.OS!=="Android"?q`
        <div class="arrow"></div>
        <div class="remind-text"> </div>`:q``}
      <div class="device-detector-backdrop">
        <div class="root">
          ${this.detectStage===0?q`
            <trtc-custom-button type="outlined" class="close" @click=${this.handleClose}>${this.isChinese?"\u8DF3\u8FC7\u68C0\u6D4B":"Skip Detection"}</trtc-custom-button>
            <trtc-device-connect class="myconnect" stepnamelist=${JSON.stringify(this.stepNameList)} @remind-changed=${this.handleRemindChange} 
               @click=${t=>{let i=t.target.getAttribute("connectstage");if(i&&i.includes("1")){this.setDetectStage();let A=new Date().getTime();g&&g.kvStatManager.addSuccessEvent({key:591703,cost:A-this.constructTime})}}}></trtc-device-connect>`:q``}
          ${this.detectStage===1?q`
            <div class="step-container">
            ${this.stepNameList.map((t,i)=>q`
              <div
                @click="${()=>this.handleStep(i)}"
                class="step ${[this.getLableClassName(i)]}">
                <span class="step-icon">
                  ${t==="camera"?q`<svg  t="1630397874793" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="958" width="24" height="24"><path d="M489.244444 0a460.8 460.8 0 1 1 0 921.6A460.8 460.8 0 0 1 489.244444 0z m0 204.8a256 256 0 1 0 0 512 256 256 0 0 0 0-512z" opacity=".8" p-id="959"></path><path d="M489.244444 460.8m-153.6 0a153.6 153.6 0 1 0 307.2 0 153.6 153.6 0 1 0-307.2 0Z" opacity=".8" p-id="960"></path><path d="M120.604444 952.32a368.64 61.44 0 1 0 737.28 0 368.64 61.44 0 1 0-737.28 0Z" opacity=".8" p-id="961"></path></svg>
                    `:q``}
                  ${t==="microphone"?q`<svg  t="1630397938861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1205" width="24" height="24"><path d="M841.551448 434.423172A41.666207 41.666207 0 0 1 882.758621 476.548414c0 194.701241-144.454621 355.469241-329.551449 376.514207v86.722207h164.758069a41.666207 41.666207 0 0 1 41.207173 42.089931A41.666207 41.666207 0 0 1 717.965241 1024H306.034759A41.666207 41.666207 0 0 1 264.827586 981.874759a41.666207 41.666207 0 0 1 41.207173-42.089931h164.758069v-86.722207C285.696 832.052966 141.241379 671.249655 141.241379 476.548414a41.666207 41.666207 0 0 1 41.207173-42.125242 41.666207 41.666207 0 0 1 41.171862 42.125242c0 162.78069 129.129931 294.770759 288.379586 294.770758l8.827586-0.141241c155.153655-4.766897 279.552-134.850207 279.552-294.629517a41.666207 41.666207 0 0 1 41.171862-42.125242zM512 0c119.419586 0 216.275862 88.770207 216.275862 198.232276v317.228138c0 106.990345-92.513103 194.206897-208.154483 198.091034l-8.121379 0.141242c-119.419586 0-216.275862-88.770207-216.275862-198.232276V198.232276c0-106.990345 92.513103-194.206897 208.154483-198.091035L512 0z" opacity=".8" p-id="1206"></path></svg>
                    `:q``}
                  ${t==="speaker"?q`<svg t="1629186923749" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2923" width="24" height="24"><path d="M640 181.333333c0-46.037333-54.357333-70.4-88.746667-39.850666L359.552 311.850667a32 32 0 0 1-21.248 8.106666H181.333333A96 96 0 0 0 85.333333 415.957333v191.872a96 96 0 0 0 96 96h157.013334a32 32 0 0 1 21.248 8.106667l191.616 170.410667c34.389333 30.549333 88.789333 6.144 88.789333-39.850667V181.333333z m170.325333 70.272a32 32 0 0 1 44.757334 6.698667A424.917333 424.917333 0 0 1 938.666667 512a424.96 424.96 0 0 1-83.626667 253.696 32 32 0 0 1-51.413333-38.058667A360.917333 360.917333 0 0 0 874.666667 512a360.917333 360.917333 0 0 0-71.04-215.637333 32 32 0 0 1 6.698666-44.757334zM731.434667 357.12a32 32 0 0 1 43.392 12.928c22.869333 42.24 35.84 90.666667 35.84 141.994667a297.514667 297.514667 0 0 1-35.84 141.994666 32 32 0 0 1-56.32-30.464c17.92-33.152 28.16-71.082667 28.16-111.530666s-10.24-78.378667-28.16-111.530667a32 32 0 0 1 12.928-43.392z" opacity=".8" p-id="2924"></path></svg>
                    `:q``}
                  ${t==="network"?q`<svg  t="1630400570252" class="icon" viewBox="0 0 1291 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1640" width="24" height="24"><path d="M992.211478 583.68A449.758609 449.758609 0 0 0 650.017391 426.295652c-136.904348 0-259.561739 61.039304-342.194087 157.384348a90.156522 90.156522 0 0 0 136.859826 117.359304 269.846261 269.846261 0 0 1 205.334261-94.430608c82.142609 0 155.737043 36.641391 205.334261 94.386087a90.156522 90.156522 0 1 0 136.859826-117.359305zM559.86087 922.134261a90.156522 90.156522 0 1 0 180.313043 0 90.156522 90.156522 0 0 0-180.313043 0z" opacity=".8" p-id="1641"></path><path d="M1253.064348 289.124174A809.316174 809.316174 0 0 0 650.017391 20.613565a809.316174 809.316174 0 0 0-603.046956 268.466087 90.156522 90.156522 0 1 0 127.777391 127.065044l0.311652 0.26713A629.581913 629.581913 0 0 1 650.017391 200.926609c189.395478 0 359.290435 83.389217 474.957913 215.485217l0.267131-0.26713a90.156522 90.156522 0 1 0 127.777391-127.065044z" opacity=".8" p-id="1642"></path></svg>
                    `:q``}
                </span>
                <span class="step-label">${t.toUpperCase()}</span>
              </div>`)}
          </div>
            `:q``}
          ${this.detectStage===1?q`
             ${this.stepNameList.map((t,i)=>t==="camera"&&this.stepNameList[this.activeStep]==="camera"?q`<trtc-camera-detector .handleComplete=${this.handleCompleted}
                   activeDetector=${this.stepNameList[this.activeStep]}  constructTime=${this.constructTime}></trtc-camera-detector>`:t==="microphone"&&this.stepNameList[this.activeStep]==="microphone"?q`<trtc-mic-detector .handleComplete=${this.handleCompleted}
                   activeDetector=${this.stepNameList[this.activeStep]} constructTime=${this.constructTime}></trtc-mic-detector>`:t==="speaker"&&this.stepNameList[this.activeStep]==="speaker"?q`<trtc-speaker-detector .handleComplete=${this.handleCompleted}
                   activeDetector=${this.stepNameList[this.activeStep]} audioUrl=${this.audioURL} constructTime=${this.constructTime}></trtc-speaker-detector>`:t==="network"&&this.stepNameList[this.activeStep]==="network"?q`<trtc-network-detector .handleComplete=${this.handleCompleted}
                   activeDetector=${this.stepNameList[this.activeStep]} .generateReport=${()=>this.setDetectStage()} .hasStartLocalVideo=${this.hasStartLocalVideo} .setHasStartLocalVideo=${()=>{this.hasStartLocalVideo=!0}} constructTime=${this.constructTime}></trtc-network-detector>`:"")}
            `:q``}

          ${this.detectStage===2?q`
            <trtc-detect-report .reportData=${this.completed} .handleReset=${()=>this.handleReset()} .handleClose=${()=>this.handleClose()}></trtc-detect-report>
          `:q``}
        </div>
      </div>
    `:q``}async handleClose(){this.isOpen=!1,this.handleReset(),this.requestUpdate("detectStage",this.detectStage),this.remove(),Object.keys(this.completedResult).length!==0&&(this.detectResult=this.completedResult),this.isCompleted=!0,this.triggerCompletedEvent()}handleReset(){this.detectStage=0,this.activeStep=0}setDetectStage(){this.detectStage=this.detectStage+1}async firstUpdated(){let i=getComputedStyle(document.documentElement).getPropertyValue("font-size")}updated(){this.remind&&!this.isMobile&&(this.isChinese?this.shadowRoot.querySelector(".remind-text").innerHTML=R.cameraFailAttention:this.shadowRoot.querySelector(".remind-text").innerHTML=R.cameraFailAttentionEng)}handleRemindChange(t){this.remind=t.detail,this.requestUpdate()}getLableClassName(t){let{completed:i,stepNameList:A}=this,o=i[A[t]]&&i[A[t]].type==="success",s=i[A[t]]&&i[A[t]].type==="error",n=this.activeStep===t,r="";return n||o?r="active":s&&(r="error"),r}handleStep(t){let{completed:i,stepNameList:A}=this;i[A[t]]&&i[A[t]].completed&&(this.activeStep=t)}};h(R,"properties",{detectStage:{type:Number,value:0},stepNameList:{type:Array},completed:{type:Object},activeStep:{type:Number},audioURL:{type:String},trtc:{type:Object},sdkAppId:{type:Number}}),h(R,"cameraFailAttention",'\u4F60\u6CA1\u6709\u6253\u5F00\u6444\u50CF\u5934/\u9EA6\u514B\u98CE\u7684\u6743\u9650\uFF0C\u8BF7\u70B9\u51FB<svg width="1rem" height="1rem" ><circle cx="0.5rem" cy="0.5rem" r="0.4rem" stroke="red" stroke-width="0.1rem" fill="none"  /><text x="0.5rem" y="0.79rem" font-size="0.7rem" text-anchor="middle" fill="red">i</text></svg>\u6253\u5F00\u6743\u9650\u5E76\u4E14\u786E\u4FDD\u5176\u4ED6\u9875\u9762\u6CA1\u6709\u5360\u7528\u6444\u50CF\u5934/\u9EA6\u514B\u98CE'),h(R,"cameraFailAttentionEng",`You didn't allow the permission to camera/microphone, please click<svg width="1rem" height="1rem" ><circle cx="0.5rem" cy="0.5rem" r="0.4rem" stroke="red" stroke-width="0.1rem" fill="none"  /><text x="0.5rem" y="0.79rem" font-size="0.7rem" text-anchor="middle" fill="red">i</text></svg>to allow permission and make sure other pages are not using the camera/microphone `);var qe=R,HV="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",XV="SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjQxLjEwMAAAAAAAAAAAAAAA//NwAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAADzAADHFAAEBgkLDhATFRgbHSAiJScpLS8yNDc5Oz5AREZJS01QUlVYW11fYmRnaW1vcXR2eXt+gIOGiIuNkJKUmJqdn6Kkpqmsr7G0tri7vcHDxsjKzc/S1Nja3N/h5Obp7O7x8/b4+/0AAAAATGF2YzU4Ljc1AAAAAAAAAAAAAAAAJANuAAAAAAAAxxTRjwpSAAAAAAD/84BkAAAAAaQAAAAAAAADSAAAAABMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//OCZEMAAAGkAAAAAAAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVSQAgEEhgQPMCYP/84JkQwAAAaQAAAAAAAADSAAAAAAchNKkOEbO+EAdwJyHrHnUSG3VmaTGDQjGAs0BCATjIE0iNhTJiDPCzYggkKD0YbzPgSOypNsuMypMAgIRYjBJEoUpnJwqSTVL9CQkSPDy0Ogj0ImYFDYMUgZsDqo16AYwPGAsGbIMZ8WYQAWnQCKDqwKsVGyRx38VTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVgl8NxZrgVVO3c73zZhPPU//zgmTGEEiIUhRrGkIAAANIAAAAAHw4xbs6+E5pkxTAoimfSgUka5IYsMahsbZc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AAAANMA02ycjJ0UxNDk2YxewJzCUAvMCUBgwBgDwqAMOAAqoLzbmyBlbOGXtMb9zHve55X6fl/n9hqIxKJSWSTcolcop5ZLJ+co6Kes01LS01WtVuXblevUzsW7F+9fv2bQMDEqaQMDELLJQkGJVVVgYlVVYJCaaKqgxZVVVEC0000zLLLLq8qqpp/aiz3/VVV/+qqr//9v//3VMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/84Jk/xtMupgAe34YgAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVNuoCVhZwxSQUAiuVABw0sKDiBghjRg8MJAg4YyCzHeAlIgrMBozRRJQmDUIVEhqXCEISDaVi43to0BswSkRVSdKiIHQdECMQ8Bgg7k37KGDA0eWAwQjdgEVrFRb+LCusU/qF/8UVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zgmSpDKiQegBlI4IAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";var ye=0,At,ke,u,g,Be=class Be{constructor(e){h(this,"seq");h(this,"myDetector");h(this,"_core");h(this,"_log");h(this,"Name");h(this,"detectResult");if(ke)return ke;qe.registerTag(),ye=ye+1,this.seq=ye,g=e,u=e.log.createChild({id:`${this.getAlias()}${ye}`}),this._core=g,this._log=u,this._log.info("created")}getName(){return Be.Name}getAlias(){return"dd"}getGroup(){return"dd"}getValidateRule(e){switch(e){case"start":return rt(this._core);case"update":return be(this._core);case"stop":return be(this._core)}}start(e){if(!ke)return new Promise((t,i)=>{this._log.info("start",e),e&&e.networkDetect&&e.networkDetect.downlinkUserId&&e.networkDetect.downlinkUserSig?S.networkInfo=L(F({},e.networkDetect),{uplinkTRTC:this._core.TRTC.create(),downlinkTRTC:this._core.TRTC.create()}):e&&e.networkDetect?S.networkInfo=L(F({},e.networkDetect),{uplinkTRTC:this._core.TRTC.create()}):S.networkInfo=null,this.myDetector=document.createElement("detector-element"),document.body.appendChild(this.myDetector),At=()=>{this.detectResult=this.myDetector.detectResult,t(this.detectResult)},this.myDetector.addEventListener("detectorCompleted",At)})}afterStart(){this._core.clearStarted(this,this.getGroup()),this.stop()}stop(){this.myDetector&&(this.myDetector.remove(),S.networkInfo=null,this.myDetector.removeEventListener("detectorCompleted",At)),ke=null,this._log.info("stop")}update(){}destroy(){}};h(Be,"Name","DeviceDetector");var ot=Be;var Zo=ot;export{ot as DeviceDetector,g as _core,u as _log,Zo as default};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
