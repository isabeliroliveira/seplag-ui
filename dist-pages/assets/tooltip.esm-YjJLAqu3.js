import{i as e,n as t}from"./jsx-runtime-CUBmso4R.js";import{_ as n,a as r,f as i,h as a,i as o,v as s}from"./api.esm-BXEZtj-z.js";import{a as c,c as l,f as u,g as d,h as ee,r as te,s as ne,t as re,u as ie}from"./hooks.esm-CPZYjetZ.js";import{n as f,r as ae}from"./iconbase.esm-DuWGsOBL.js";import{t as oe}from"./portal.esm-DLjYefON.js";var p=e(t());function m(){return m=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},m.apply(null,arguments)}function h(e){"@babel/helpers - typeof";return h=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},h(e)}function g(e,t){if(h(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(h(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function _(e){var t=g(e,`string`);return h(t)==`symbol`?t:t+``}function v(e,t,n){return(t=_(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function b(e){if(Array.isArray(e))return y(e)}function x(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function S(e,t){if(e){if(typeof e==`string`)return y(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}function C(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function se(e){return b(e)||x(e)||S(e)||C()}function w(e){if(Array.isArray(e))return e}function T(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function E(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function D(e,t){return w(e)||T(e,t)||S(e,t)||E()}var O=f.extend({defaultProps:{__TYPE:`Tooltip`,appendTo:null,at:null,autoHide:!0,autoZIndex:!0,baseZIndex:0,className:null,closeOnEscape:!1,content:null,disabled:!1,event:null,hideDelay:0,hideEvent:`mouseleave`,id:null,mouseTrack:!1,mouseTrackLeft:5,mouseTrackTop:5,my:null,onBeforeHide:null,onBeforeShow:null,onHide:null,onShow:null,position:`right`,showDelay:0,showEvent:`mouseenter`,showOnDisabled:!1,style:null,target:null,updateDelay:0,children:void 0},css:{classes:{root:function(e){var t=e.positionState,n=e.classNameState;return s(`p-tooltip p-component`,v({},`p-tooltip-${t}`,!0),n)},arrow:`p-tooltip-arrow`,text:`p-tooltip-text`},styles:`
@layer primereact {
    .p-tooltip {
        position: absolute;
        padding: .25em .5rem;
        /* #3687: Tooltip prevent scrollbar flickering */
        top: -9999px;
        left: -9999px;
    }
    
    .p-tooltip.p-tooltip-right,
    .p-tooltip.p-tooltip-left {
        padding: 0 .25rem;
    }
    
    .p-tooltip.p-tooltip-top,
    .p-tooltip.p-tooltip-bottom {
        padding:.25em 0;
    }
    
    .p-tooltip .p-tooltip-text {
       white-space: pre-line;
       word-break: break-word;
    }
    
    .p-tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }
    
    .p-tooltip-right .p-tooltip-arrow {
        top: 50%;
        left: 0;
        margin-top: -.25rem;
        border-width: .25em .25em .25em 0;
    }
    
    .p-tooltip-left .p-tooltip-arrow {
        top: 50%;
        right: 0;
        margin-top: -.25rem;
        border-width: .25em 0 .25em .25rem;
    }
    
    .p-tooltip.p-tooltip-top {
        padding: .25em 0;
    }
    
    .p-tooltip-top .p-tooltip-arrow {
        bottom: 0;
        left: 50%;
        margin-left: -.25rem;
        border-width: .25em .25em 0;
    }
    
    .p-tooltip-bottom .p-tooltip-arrow {
        top: 0;
        left: 50%;
        margin-left: -.25rem;
        border-width: 0 .25em .25rem;
    }

    .p-tooltip-target-wrapper {
        display: inline-flex;
    }
}
`,inlineStyles:{arrow:function(e){var t=e.context;return{top:t.bottom?`0`:t.right||t.left||!t.right&&!t.left&&!t.top&&!t.bottom?`50%`:null,bottom:t.top?`0`:null,left:t.right||!t.right&&!t.left&&!t.top&&!t.bottom?`0`:t.top||t.bottom?`50%`:null,right:t.left?`0`:null}}}}});function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function ce(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?k(Object(n),!0).forEach(function(t){v(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var A=p.memo(p.forwardRef(function(e,t){var f=ne(),h=p.useContext(r),g=O.getProps(e,h),_=D(p.useState(!1),2),v=_[0],y=_[1],b=D(p.useState(g.position||`right`),2),x=b[0],S=b[1],C=D(p.useState(``),2),w=C[0],T=C[1],E=D(p.useState(!1),2),k=E[0],A=E[1],j=v&&g.closeOnEscape,le=te(`tooltip`,j),M={props:g,state:{visible:v,position:x,className:w},context:{right:x===`right`,left:x===`left`,top:x===`top`,bottom:x===`bottom`}},N=O.setMetaData(M),P=N.ptm,F=N.cx,ue=N.sx,de=N.isUnstyled;ae(O.css.styles,de,{name:`tooltip`}),c({callback:function(){Y()},when:j,priority:[re.TOOLTIP,le]});var I=p.useRef(null),L=p.useRef(null),R=p.useRef(null),z=p.useRef(null),B=p.useRef(!0),V=p.useRef({}),fe=p.useRef(null),pe=D(u({listener:function(e){!i.isTouchDevice()&&Y(e)}}),2),me=pe[0],he=pe[1],ge=D(ie({target:R.current,listener:function(e){Y(e)},when:v}),2),_e=ge[0],ve=ge[1],ye=function(e){return!(g.content||K(e,`tooltip`))},be=function(e){return!(g.content||K(e,`tooltip`)||g.children)},H=function(e){return K(e,`mousetrack`)||g.mouseTrack},U=function(e){return K(e,`disabled`)===`true`||q(e,`disabled`)||g.disabled},W=function(e){return K(e,`showondisabled`)||g.showOnDisabled},G=function(){return K(R.current,`autohide`)||g.autoHide},K=function(e,t){return q(e,`data-pr-${t}`)?e.getAttribute(`data-pr-${t}`):null},q=function(e,t){return e&&e.hasAttribute(t)},xe=function(e){var t=[K(e,`showevent`)||g.showEvent],n=[K(e,`hideevent`)||g.hideEvent];if(H(e))t=[`mousemove`],n=[`mouseleave`];else{var r=K(e,`event`)||g.event;r===`focus`&&(t=[`focus`],n=[`blur`]),r===`both`&&(t=[`focus`,`mouseenter`],n=k?[`blur`]:[`mouseleave`,`blur`])}return{showEvents:t,hideEvents:n}},Se=function(e){return K(e,`position`)||x},Ce=function(e){return{top:K(e,`mousetracktop`)||g.mouseTrackTop,left:K(e,`mousetrackleft`)||g.mouseTrackLeft}},we=function(e,t){if(L.current){var n=K(e,`tooltip`)||g.content;n?(L.current.innerHTML=``,L.current.appendChild(document.createTextNode(n)),t()):g.children&&t()}},Te=function(e){we(R.current,function(){var t=fe.current,r=t.pageX,a=t.pageY;g.autoZIndex&&!n.get(I.current)&&n.set(`tooltip`,I.current,h&&h.autoZIndex||o.autoZIndex,g.baseZIndex||h&&h.zIndex.tooltip||o.zIndex.tooltip),I.current.style.left=``,I.current.style.top=``,G()&&(I.current.style.pointerEvents=`none`);var s=H(R.current)||e===`mouse`;(s&&!z.current||s)&&(z.current={width:i.getOuterWidth(I.current),height:i.getOuterHeight(I.current)}),Ee(R.current,{x:r,y:a},e)})},J=function(e){e.type&&e.type===`focus`&&A(!0),R.current=e.currentTarget;var t=U(R.current);be(W(R.current)&&t?R.current.firstChild:R.current)||t||(fe.current=e,v?X(`updateDelay`,Te):Z(g.onBeforeShow,{originalEvent:e,target:R.current})&&X(`showDelay`,function(){y(!0),Z(g.onShow,{originalEvent:e,target:R.current})}))},Y=function(e){e&&e.type===`blur`&&A(!1),Ne(),v?Z(g.onBeforeHide,{originalEvent:e,target:R.current})&&X(`hideDelay`,function(){!G()&&B.current===!1||(n.clear(I.current),i.removeClass(I.current,`p-tooltip-active`),y(!1),Z(g.onHide,{originalEvent:e,target:R.current}))}):!g.onBeforeHide&&!Me(`hideDelay`)&&y(!1)},Ee=function(e,t,n){var r=0,a=0,o=n||x;if((H(e)||o==`mouse`)&&t){var s={width:i.getOuterWidth(I.current),height:i.getOuterHeight(I.current)};r=t.x,a=t.y;var c=Ce(e),l=c.top,u=c.left;switch(o){case`left`:r-=s.width+u,a-=s.height/2-l;break;case`right`:case`mouse`:r+=u,a-=s.height/2-l;break;case`top`:r-=s.width/2-u,a-=s.height+l;break;case`bottom`:r-=s.width/2-u,a+=l;break}r<=0||z.current.width>s.width?(I.current.style.left=`0px`,I.current.style.right=window.innerWidth-s.width-r+`px`):(I.current.style.right=``,I.current.style.left=r+`px`),I.current.style.top=a+`px`,i.addClass(I.current,`p-tooltip-active`)}else{var d=i.findCollisionPosition(o),ee=K(e,`my`)||g.my||d.my,te=K(e,`at`)||g.at||d.at;I.current.style.padding=`0px`,i.flipfitCollision(I.current,e,ee,te,function(e){var t=e.at,n=t.x,r=t.y,a=e.my.x,o=g.at?n!==`center`&&n!==a?n:r:e.at[`${d.axis}`];I.current.style.padding=``,S(o),De(o),i.addClass(I.current,`p-tooltip-active`)})}},De=function(e){if(I.current){var t=getComputedStyle(I.current);e===`left`?I.current.style.left=parseFloat(t.left)-parseFloat(t.paddingLeft)*2+`px`:e===`top`&&(I.current.style.top=parseFloat(t.top)-parseFloat(t.paddingTop)*2+`px`)}},Oe=function(){G()||(B.current=!1)},ke=function(e){G()||(B.current=!0,Y(e))},Ae=function(e){if(e){var t=xe(e),n=t.showEvents,r=t.hideEvents,i=Pe(e);n.forEach(function(e){return i?.addEventListener(e,J)}),r.forEach(function(e){return i?.addEventListener(e,Y)})}},je=function(e){if(e){var t=xe(e),n=t.showEvents,r=t.hideEvents,i=Pe(e);n.forEach(function(e){return i?.removeEventListener(e,J)}),r.forEach(function(e){return i?.removeEventListener(e,Y)})}},Me=function(e){return K(R.current,e.toLowerCase())||g[e]},X=function(e,t){Ne();var n=Me(e);n?V.current[`${e}`]=setTimeout(function(){return t()},n):t()},Z=function(e){if(e){var t=[...arguments].slice(1),n=e.apply(void 0,t);return n===void 0&&(n=!0),n}return!0},Ne=function(){Object.values(V.current).forEach(function(e){return clearTimeout(e)})},Pe=function(e){if(e){if(W(e)){if(!e.hasWrapper){var t=document.createElement(`div`);return e.nodeName===`INPUT`?i.addMultipleClasses(t,`p-tooltip-target-wrapper p-inputwrapper`):i.addClass(t,`p-tooltip-target-wrapper`),e.parentNode.insertBefore(t,e),t.appendChild(e),e.hasWrapper=!0,t}return e.parentElement}else if(e.hasWrapper){var n;(n=e.parentElement).replaceWith.apply(n,se(e.parentElement.childNodes)),delete e.hasWrapper}return e}return null},Fe=function(e){$(e),Q(e)},Q=function(e){Ie(e||g.target,Ae)},$=function(e){Ie(e||g.target,je)},Ie=function(e,t){if(e=a.getRefElement(e),e)if(i.isElement(e))t(e);else{var n=function(e){i.find(document,e).forEach(function(e){t(e)})};e instanceof Array?e.forEach(function(e){n(e)}):n(e)}};l(function(){v&&R.current&&U(R.current)&&Y()}),d(function(){return Q(),function(){$()}},[J,Y,g.target]),d(function(){if(v){var e=Se(R.current),t=K(R.current,`classname`);S(e),T(t),Te(e),me(),_e()}else S(g.position||`right`),T(``),R.current=null,z.current=null,B.current=!0;return function(){he(),ve()}},[v]),d(function(){var e=Se(R.current);v&&e!==`mouse`&&X(`updateDelay`,function(){we(R.current,function(){Ee(R.current)})})},[g.content]),ee(function(){Y(),n.clear(I.current)}),p.useImperativeHandle(t,function(){return{props:g,updateTargetEvents:Fe,loadTargetEvents:Q,unloadTargetEvents:$,show:J,hide:Y,getElement:function(){return I.current},getTarget:function(){return R.current}}});var Le=function(){var e=ye(R.current),t=f({id:g.id,className:s(g.className,F(`root`,{positionState:x,classNameState:w})),style:g.style,role:`tooltip`,"aria-hidden":v,onMouseEnter:function(e){return Oe()},onMouseLeave:function(e){return ke(e)}},O.getOtherProps(g),P(`root`)),n=f({className:F(`arrow`),style:ue(`arrow`,ce({},M))},P(`arrow`)),r=f({className:F(`text`)},P(`text`));return p.createElement(`div`,m({ref:I},t),p.createElement(`div`,n),p.createElement(`div`,m({ref:L},r),e&&g.children))};if(v){var Re=Le();return p.createElement(oe,{element:Re,appendTo:g.appendTo,visible:!0})}return null}));A.displayName=`Tooltip`;export{A as t};