import{i as e,n as t,t as n}from"./jsx-runtime-CUBmso4R.js";import{A as r,M as i,N as a,O as o,P as s,a as c,b as l,c as ee,h as u,l as te,r as ne,s as d,t as f,w as re,x as ie}from"./hooks.esm-CQ5c3DPY.js";import{n as p,r as m}from"./iconbase.esm-CAZTibuP.js";import{t as h}from"./button.esm-DsXO_SsX.js";import{t as g}from"./ripple.esm-CDUK2kEc.js";import{t as _}from"./portal.esm-kTcLGM5p.js";import{t as ae}from"./index.esm-DR0P0SX8.js";import{t as v}from"./csstransition.esm-DEFdAMzy.js";import{t as y}from"./overlayservice.esm-orAn8SBa.js";var b=e(t());function x(){return x=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},x.apply(null,arguments)}function S(e){"@babel/helpers - typeof";return S=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},S(e)}function C(e,t){if(S(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(S(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function w(e){var t=C(e,`string`);return S(t)==`symbol`?t:t+``}function T(e,t,n){return(t=w(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function E(e){if(Array.isArray(e))return e}function D(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function O(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function k(e,t){if(e){if(typeof e==`string`)return O(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?O(e,t):void 0}}function A(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function j(e,t){return E(e)||D(e,t)||k(e,t)||A()}var M=p.extend({defaultProps:{__TYPE:`OverlayPanel`,id:null,dismissable:!0,showCloseIcon:!1,closeIcon:null,style:null,className:null,appendTo:null,breakpoints:null,ariaCloseLabel:null,transitionOptions:null,onShow:null,onHide:null,children:void 0,closeOnEscape:!0},css:{classes:{root:function(e){e.props;var t=e.context;return s(`p-overlaypanel p-component`,{"p-input-filled":t&&t.inputStyle===`filled`||l.inputStyle===`filled`,"p-ripple-disabled":t&&t.ripple===!1||l.ripple===!1})},closeIcon:`p-overlaypanel-close-icon`,closeButton:`p-overlaypanel-close p-link`,content:`p-overlaypanel-content`,transition:`p-overlaypanel`},styles:`
@layer primereact {
    .p-overlaypanel {
        position: absolute;
        margin-top: 10px;
        /* Github #3122: Prevent animation flickering  */
        top: -9999px;
        left: -9999px;
    }
    
    .p-overlaypanel-flipped {
        margin-top: -10px;
        margin-bottom: 10px;
    }
    
    .p-overlaypanel-close {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
    }
    
    /* Animation */
    .p-overlaypanel-enter {
        opacity: 0;
        transform: scaleY(0.8);
    }
    
    .p-overlaypanel-enter-active {
        opacity: 1;
        transform: scaleY(1);
        transition: transform .12s cubic-bezier(0, 0, 0.2, 1), opacity .12s cubic-bezier(0, 0, 0.2, 1);
    }
    
    .p-overlaypanel-enter-done {
        transform: none;
    }
    
    .p-overlaypanel-exit {
        opacity: 1;
    }
    
    .p-overlaypanel-exit-active {
        opacity: 0;
        transition: opacity .1s linear;
    }
    
    .p-overlaypanel:after, .p-overlaypanel:before {
        bottom: 100%;
        left: calc(var(--overlayArrowLeft, 0) + 1.25rem);
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }
    
    .p-overlaypanel:after {
        border-width: 8px;
        margin-left: -8px;
    }
    
    .p-overlaypanel:before {
        border-width: 10px;
        margin-left: -10px;
    }
    
    .p-overlaypanel-flipped:after, .p-overlaypanel-flipped:before {
        bottom: auto;
        top: 100%;
    }
    
    .p-overlaypanel.p-overlaypanel-flipped:after {
        border-bottom-color: transparent;
    }
    
    .p-overlaypanel.p-overlaypanel-flipped:before {
        border-bottom-color: transparent
    }
}
`}});function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function oe(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?N(Object(n),!0).forEach(function(t){T(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var P=b.forwardRef(function(e,t){var n=d(),p=b.useContext(ie),h=M.getProps(e,p),S=j(b.useState(!1),2),C=S[0],w=S[1],T=M.setMetaData({props:h,state:{visible:C}}),E=T.ptm,D=T.cx;T.sx;var O=T.isUnstyled;m(M.css.styles,O,{name:`overlaypanel`});var k=b.useRef(``),A=b.useRef(null),N=b.useRef(null),P=b.useRef(!1),F=b.useRef(null),I=b.useRef(null),L=j(te({target:N,overlay:A,listener:function(e,t){var n=t.type;t.valid&&(n===`outside`?(h.dismissable&&!P.current&&Y(),P.current=!1):p.hideOverlaysOnDocumentScrolling?Y():o.isDocument(e.target)||$())},when:C}),2),R=L[0],z=L[1],B=C&&h.closeOnEscape,V=ne(`overlay-panel`,B);c({callback:function(){Y()},when:B&&V,priority:[f.OVERLAY_PANEL,V]});var H=function(e){return A&&A.current&&!(A.current.isSameNode(e)||A.current.contains(e))},U=function(e,t){return N.current!=null&&N.current!==(t||e.currentTarget||e.target)},W=function(e){Y(),e.preventDefault()},G=function(e){P.current=!0,y.emit(`overlay-click`,{originalEvent:e,target:N.current})},K=function(){P.current=!0},q=function(e,t){C?(Y(),U(e,t)&&(N.current=t||e.currentTarget||e.target,setTimeout(function(){J(e,N.current)},200))):J(e,t)},J=function(e,t){N.current=t||e.currentTarget||e.target,C?$():(w(!0),I.current=function(e){!H(e.target)&&(P.current=!0)},y.on(`overlay-click`,I.current))},Y=function(){w(!1),y.off(`overlay-click`,I.current),I.current=null},X=function(){A.current.setAttribute(k.current,``),a.set(`overlay`,A.current,p&&p.autoZIndex||l.autoZIndex,p&&p.zIndex.overlay||l.zIndex.overlay),o.addStyles(A.current,{position:`absolute`,top:`0`,left:`0`}),$()},Z=function(){R(),h.onShow&&h.onShow()},Q=function(){z()},se=function(){a.clear(A.current),h.onHide&&h.onHide()},$=function(){if(N.current&&A.current){o.absolutePosition(A.current,N.current);var e=o.getOffset(A.current),t=o.getOffset(N.current),n=0;e.left<t.left&&(n=t.left-e.left),A.current.style.setProperty(`--overlayArrowLeft`,`${n}px`),e.top<t.top?(A.current.setAttribute(`data-p-overlaypanel-flipped`,`true`),O&&o.addClass(A.current,`p-overlaypanel-flipped`)):(A.current.setAttribute(`data-p-overlaypanel-flipped`,`false`),O&&o.removeClass(A.current,`p-overlaypanel-flipped`))}},ce=function(){if(!F.current){F.current=o.createInlineStyle(p&&p.nonce||l.nonce,p&&p.styleContainer);var e=``;for(var t in h.breakpoints)e+=`
                    @media screen and (max-width: ${t}) {
                        .p-overlaypanel[${k.current}] {
                            width: ${h.breakpoints[t]};
                        }
                    }
                `;F.current.innerHTML=e}};ee(function(){k.current=i(),h.breakpoints&&ce()}),u(function(){F.current=o.removeInlineStyle(F.current),I.current&&=(y.off(`overlay-click`,I.current),null),a.clear(A.current)}),b.useImperativeHandle(t,function(){return{props:h,toggle:q,show:J,hide:Y,align:$,isVisible:function(){return C},getElement:function(){return A.current}}});var le=function(){var e=n({className:D(`closeIcon`),"aria-hidden":!0},E(`closeIcon`)),t=h.closeIcon||b.createElement(ae,e),i=r.getJSXIcon(t,oe({},e),{props:h}),a=n({type:`button`,className:D(`closeButton`),onClick:function(e){return W(e)},"aria-label":h.ariaCloseLabel||re(`close`)},E(`closeButton`));return h.showCloseIcon?b.createElement(`button`,a,i,b.createElement(g,null)):null},ue=function(){var e=le(),t=n({id:h.id,className:s(h.className,D(`root`,{context:p})),style:h.style,onClick:function(e){return G(e)}},M.getOtherProps(h),E(`root`)),r=n({className:D(`content`),onClick:function(e){return K()},onMouseDown:K},M.getOtherProps(h),E(`content`)),i=n({classNames:D(`transition`),in:C,timeout:{enter:120,exit:100},options:h.transitionOptions,unmountOnExit:!0,onEnter:X,onEntered:Z,onExit:Q,onExited:se},E(`transition`));return b.createElement(v,x({nodeRef:A},i),b.createElement(`div`,x({ref:A},t),b.createElement(`div`,r,h.children),e))}();return b.createElement(_,{element:ue,appendTo:h.appendTo})});P.displayName=`OverlayPanel`;var F={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},I=b.createContext&&b.createContext(F),L=[`attr`,`size`,`title`];function R(e,t){if(e==null)return{};var n,r,i=z(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function z(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function B(){return B=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},B.apply(null,arguments)}function V(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function H(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?V(Object(n),!0).forEach(function(t){U(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function U(e,t,n){return(t=W(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function W(e){var t=G(e,`string`);return typeof t==`symbol`?t:t+``}function G(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function K(e){return e&&e.map((e,t)=>b.createElement(e.tag,H({key:t},e.attr),K(e.child)))}function q(e){return t=>b.createElement(J,B({attr:H({},e.attr)},t),K(e.child))}function J(e){var t=t=>{var{attr:n,size:r,title:i}=e,a=R(e,L),o=r||t.size||`1em`,s;return t.className&&(s=t.className),e.className&&(s=(s?s+` `:``)+e.className),b.createElement(`svg`,B({stroke:`currentColor`,fill:`currentColor`,strokeWidth:`0`},t.attr,n,a,{className:s,style:H(H({color:e.color||t.color},t.style),e.style),height:o,width:o,xmlns:`http://www.w3.org/2000/svg`}),i&&b.createElement(`title`,null,i),e.children)};return I===void 0?t(F):b.createElement(I.Consumer,null,e=>t(e))}function Y(e){return q({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`path`,attr:{d:`M5 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0`},child:[]},{tag:`path`,attr:{d:`M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0`},child:[]},{tag:`path`,attr:{d:`M19 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0`},child:[]},{tag:`path`,attr:{d:`M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0`},child:[]},{tag:`path`,attr:{d:`M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0`},child:[]},{tag:`path`,attr:{d:`M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0`},child:[]},{tag:`path`,attr:{d:`M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0`},child:[]},{tag:`path`,attr:{d:`M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0`},child:[]},{tag:`path`,attr:{d:`M19 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0`},child:[]}]})(e)}var X={"app-switcher":`_app-switcher_1qmum_1`,"app-switcher__btn":`_app-switcher__btn_1qmum_6`,"app-switcher__panel":`_app-switcher__panel_1qmum_13`,"app-switcher__grid":`_app-switcher__grid_1qmum_26`,"app-switcher__item":`_app-switcher__item_1qmum_35`,"app-switcher__item_selected":`_app-switcher__item_selected_1qmum_52`,"app-switcher__iconWrap":`_app-switcher__iconWrap_1qmum_69`,"app-switcher__img":`_app-switcher__img_1qmum_79`,"app-switcher__label":`_app-switcher__label_1qmum_87`},Z=n(),Q=({currentSystem:e,items:t,className:n})=>{let r=(0,b.useRef)(null),i=(0,b.useMemo)(()=>(t??[]).filter(e=>e?.id&&e?.label&&e?.url).slice(),[t]);function a(e){r.current?.toggle(e)}function o(e){r.current?.hide(),(e.target??`_self`)===`_blank`?globalThis.open(e.url,`_blank`,`noopener,noreferrer`):globalThis.location.assign(e.url)}return(0,Z.jsxs)(`div`,{className:`${X[`app-switcher`]} ${n??``}`,children:[(0,Z.jsx)(h,{type:`button`,className:`${X[`app-switcher__btn`]}`,icon:(0,Z.jsx)(Y,{size:32}),tooltipOptions:{position:`bottom`},onClick:a}),(0,Z.jsx)(P,{ref:r,className:X[`app-switcher__panel`],dismissable:!0,appendTo:document.body,children:(0,Z.jsx)(`div`,{className:X[`app-switcher__grid`],role:`menu`,children:i.map(t=>(0,Z.jsxs)(`button`,{type:`button`,className:`${X[`app-switcher__item`]} ${t.label===e?X[`app-switcher__item_selected`]:``}`,onClick:()=>o(t),children:[(0,Z.jsx)(`div`,{className:X[`app-switcher__iconWrap`],children:typeof t.icon==`string`?(0,Z.jsx)(`i`,{className:`${X[`app-switcher__img`]} ${t.icon}`}):t.icon}),(0,Z.jsx)(`div`,{className:X[`app-switcher__label`],children:t.label})]},t.id))})})]})};export{Q as t};