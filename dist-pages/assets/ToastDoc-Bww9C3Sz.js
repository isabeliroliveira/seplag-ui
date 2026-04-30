import{i as e,n as t,t as n}from"./jsx-runtime-CUBmso4R.js";import{_ as r,a as i,c as a,f as o,h as s,i as c,m as l,v as u}from"./api.esm-BXEZtj-z.js";/* empty css              */import{n as d,t as f}from"./DocPage-CXwu6LQu.js";import{g as p,h as m,m as h,s as g}from"./hooks.esm-CPZYjetZ.js";import{n as _,r as v}from"./iconbase.esm-DuWGsOBL.js";import{t as y}from"./ripple.esm-i7rwjLj3.js";import{t as ee}from"./portal.esm-DLjYefON.js";import{t as b}from"./index.esm-B4LgFmr-.js";import{t as x}from"./csstransition.esm-BPaQh1x-.js";import{t as S}from"./TransitionGroup-CtazsCZm.js";import{t as C}from"./index.esm-Ch2OBShs.js";import{n as w,t as T}from"./index.esm-fmIPa1WZ.js";import{t as E}from"./index.esm-L1-LTiuW.js";import{n as D,t as O}from"./toast-7L_OOwlM.js";var k=e(t());function A(){return A=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},A.apply(null,arguments)}function j(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function M(e){if(Array.isArray(e))return j(e)}function N(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function P(e,t){if(e){if(typeof e==`string`)return j(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(e,t):void 0}}function F(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function I(e){return M(e)||N(e)||P(e)||F()}function L(e){if(Array.isArray(e))return e}function R(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function z(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function B(e,t){return L(e)||R(e,t)||P(e,t)||z()}function V(e){"@babel/helpers - typeof";return V=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},V(e)}function H(e,t){if(V(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(V(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function U(e){var t=H(e,`string`);return V(t)==`symbol`?t:t+``}function W(e,t,n){return(t=U(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var G=_.extend({defaultProps:{__TYPE:`Toast`,id:null,className:null,content:null,style:null,baseZIndex:0,position:`top-right`,transitionOptions:null,appendTo:`self`,onClick:null,onRemove:null,onShow:null,onHide:null,onMouseEnter:null,onMouseLeave:null,children:void 0},css:{classes:{root:function(e){var t=e.props,n=e.context;return u(`p-toast p-component p-toast-`+t.position,t.className,{"p-input-filled":n&&n.inputStyle===`filled`||c.inputStyle===`filled`,"p-ripple-disabled":n&&n.ripple===!1||c.ripple===!1})},message:{message:function(e){var t=e.severity;return u(`p-toast-message`,W({},`p-toast-message-${t}`,t))},content:`p-toast-message-content`,buttonicon:`p-toast-icon-close-icon`,closeButton:`p-toast-icon-close p-link`,icon:`p-toast-message-icon`,text:`p-toast-message-text`,summary:`p-toast-summary`,detail:`p-toast-detail`},transition:`p-toast-message`},styles:`
@layer primereact {
    .p-toast {
        width: calc(100% - var(--toast-indent, 0px));
        max-width: 25rem;
    }
    
    .p-toast-message-icon {
        flex-shrink: 0;
    }
    
    .p-toast-message-content {
        display: flex;
        align-items: flex-start;
    }
    
    .p-toast-message-text {
        flex: 1 1 auto;
    }
    
    .p-toast-summary {
        overflow-wrap: anywhere;
    }
    
    .p-toast-detail {
        overflow-wrap: anywhere;
    }
    
    .p-toast-top-center {
        transform: translateX(-50%);
    }
    
    .p-toast-bottom-center {
        transform: translateX(-50%);
    }
    
    .p-toast-center {
        min-width: 20vw;
        transform: translate(-50%, -50%);
    }
    
    .p-toast-icon-close {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
    }
    
    .p-toast-icon-close.p-link {
        cursor: pointer;
    }
    
    /* Animations */
    .p-toast-message-enter {
        opacity: 0;
        transform: translateY(50%);
    }
    
    .p-toast-message-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: transform 0.3s, opacity 0.3s;
    }
    
    .p-toast-message-enter-done {
        transform: none;
    }
    
    .p-toast-message-exit {
        opacity: 1;
        max-height: 1000px;
    }
    
    .p-toast .p-toast-message.p-toast-message-exit-active {
        opacity: 0;
        max-height: 0;
        margin-bottom: 0;
        overflow: hidden;
        transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;
    }
}
`,inlineStyles:{root:function(e){var t=e.props;return{position:`fixed`,top:t.position===`top-right`||t.position===`top-left`||t.position===`top-center`?`20px`:t.position===`center`?`50%`:null,right:(t.position===`top-right`||t.position===`bottom-right`)&&`20px`,bottom:(t.position===`bottom-left`||t.position===`bottom-right`||t.position===`bottom-center`)&&`20px`,left:t.position===`top-left`||t.position===`bottom-left`?`20px`:t.position===`center`||t.position===`top-center`||t.position===`bottom-center`?`50%`:null}}}}});function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?K(Object(n),!0).forEach(function(t){W(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var J=k.memo(k.forwardRef(function(e,t){var n=g(),r=e.messageInfo,i=e.metaData,c=e.ptCallbacks,d=c.ptm,f=c.ptmo,p=c.cx,m=e.index,_=r.message,v=_.severity,ee=_.content,x=_.summary,S=_.detail,D=_.closable,O=_.life,A=_.sticky,j=_.className,M=_.style,N=_.contentClassName,P=_.contentStyle,F=_.icon,I=_.closeIcon,L=_.pt,R={index:m},z=q(q({},i),R),V=B(k.useState(!1),2),H=V[0],U=V[1],W=B(h(function(){K()},O||3e3,!A&&!H),1)[0],G=function(t,n){return d(t,q({hostName:e.hostName},n))},K=function(){W(),e.onClose&&e.onClose(r)},J=function(t){e.onClick&&!(o.hasClass(t.target,`p-toast-icon-close`)||o.hasClass(t.target,`p-toast-icon-close-icon`))&&e.onClick(r.message)},Y=function(t){e.onMouseEnter&&e.onMouseEnter(t),!t.defaultPrevented&&(A||(W(),U(!0)))},X=function(t){e.onMouseLeave&&e.onMouseLeave(t),!t.defaultPrevented&&(A||U(!1))},Z=function(){var t=n({className:p(`message.buttonicon`)},G(`buttonicon`,z),f(L,`buttonicon`,q(q({},R),{},{hostName:e.hostName}))),r=I||k.createElement(b,t),i=l.getJSXIcon(r,q({},t),{props:e}),o=n({type:`button`,className:p(`message.closeButton`),onClick:K,"aria-label":e.ariaCloseLabel||a(`close`)},G(`closeButton`,z),f(L,`closeButton`,q(q({},R),{},{hostName:e.hostName})));return D===!1?null:k.createElement(`div`,null,k.createElement(`button`,o,i,k.createElement(y,null)))},Q=function(){if(r){var t=s.getJSXElement(ee,{message:r.message,onClick:J,onClose:K}),i=n({className:p(`message.icon`)},G(`icon`,z),f(L,`icon`,q(q({},R),{},{hostName:e.hostName}))),a=F;if(!F)switch(v){case`info`:a=k.createElement(T,i);break;case`warn`:a=k.createElement(w,i);break;case`error`:a=k.createElement(E,i);break;case`success`:a=k.createElement(C,i);break}var o=l.getJSXIcon(a,q({},i),{props:e}),c=n({className:p(`message.text`)},G(`text`,z),f(L,`text`,q(q({},R),{},{hostName:e.hostName}))),u=n({className:p(`message.summary`)},G(`summary`,z),f(L,`summary`,q(q({},R),{},{hostName:e.hostName}))),d=n({className:p(`message.detail`)},G(`detail`,z),f(L,`detail`,q(q({},R),{},{hostName:e.hostName})));return t||k.createElement(k.Fragment,null,o,k.createElement(`div`,c,k.createElement(`span`,u,x),S&&k.createElement(`div`,d,S)))}return null}(),$=Z(),te=n({ref:t,className:u(j,p(`message.message`,{severity:v})),style:M,role:`alert`,"aria-live":`assertive`,"aria-atomic":`true`,onClick:J,onMouseEnter:Y,onMouseLeave:X},G(`message`,z),f(L,`root`,q(q({},R),{},{hostName:e.hostName}))),ne=n({className:u(N,p(`message.content`)),style:P},G(`content`,z),f(L,`content`,q(q({},R),{},{hostName:e.hostName})));return k.createElement(`div`,te,k.createElement(`div`,ne,Q,$))}));J.displayName=`ToastMessage`;var Y=0,X=k.memo(k.forwardRef(function(e,t){var n=g(),a=k.useContext(i),o=G.getProps(e,a),l=B(k.useState([]),2),u=l[0],d=l[1],f=k.useRef(null),h={props:o,state:{messages:u}},_=G.setMetaData(h);v(G.css.styles,_.isUnstyled,{name:`toast`});var y=function(e){e&&d(function(t){return b(t,e,!0)})},b=function(e,t,n){var r;if(Array.isArray(t)){var i=t.reduce(function(e,t){return e.push({_pId:Y++,message:t}),e},[]);r=n&&e?[].concat(I(e),I(i)):i}else{var a={_pId:Y++,message:t};r=n&&e?[].concat(I(e),[a]):[a]}return r},C=function(){r.clear(f.current),d([])},w=function(e){d(function(t){return b(t,e,!1)})},T=function(e){var t=s.isNotEmpty(e._pId)?e._pId:e.message||e;d(function(n){return n.filter(function(n){return n._pId!==e._pId&&!s.deepEquals(n.message,t)})}),o.onRemove&&o.onRemove(e.message||t)},E=function(e){T(e)},D=function(){o.onShow&&o.onShow()},O=function(){u.length===1&&r.clear(f.current),o.onHide&&o.onHide()};p(function(){r.set(`toast`,f.current,a&&a.autoZIndex||c.autoZIndex,o.baseZIndex||a&&a.zIndex.toast||c.zIndex.toast)},[u,o.baseZIndex]),m(function(){r.clear(f.current)}),k.useImperativeHandle(t,function(){return{props:o,show:y,replace:w,remove:T,clear:C,getElement:function(){return f.current}}});var j=function(){var t=n({ref:f,id:o.id,className:_.cx(`root`,{context:a}),style:_.sx(`root`)},G.getOtherProps(o),_.ptm(`root`)),r=n({classNames:_.cx(`transition`),timeout:{enter:300,exit:300},options:o.transitionOptions,unmountOnExit:!0,onEntered:D,onExited:O},_.ptm(`transition`));return k.createElement(`div`,t,k.createElement(S,null,u&&u.map(function(t,n){var i=k.createRef();return k.createElement(x,A({nodeRef:i,key:t._pId},r),e.content?s.getJSXElement(e.content,{message:t.message}):k.createElement(J,{hostName:`Toast`,ref:i,messageInfo:t,index:n,onClick:o.onClick,onClose:E,onMouseEnter:o.onMouseEnter,onMouseLeave:o.onMouseLeave,closeIcon:o.closeIcon,ptCallbacks:_,metaData:h}))})))}();return k.createElement(ee,{element:j,appendTo:o.appendTo})}));X.displayName=`Toast`;var Z=n();function Q({children:e}){let t=(0,k.useRef)(null),n=(0,k.useMemo)(()=>({toastRef:t}),[]);return(0,Z.jsxs)(D.Provider,{value:n,children:[(0,Z.jsx)(X,{ref:t}),e]})}var $=[{value:`sucesso`,label:`toastSucesso`},{value:`erro`,label:`toastErro`},{value:`atencao`,label:`toastAtencao`},{value:`custom`,label:`printToast (custom)`}],te=[`success`,`error`,`warn`,`info`],ne={sucesso:`toastSucesso`,erro:`toastErro`,atencao:`toastAtencao`,custom:`printToast`},re={sucesso:`Sucesso (padrão)`,erro:`Erro (padrão)`,atencao:`Atenção (padrão)`,custom:`ex: Aviso`},ie={sucesso:`Operação realizada com sucesso!`,erro:`Ocorreu um erro inesperado.`,atencao:`Verifique os dados antes de continuar.`};function ae(e,t,n){return`${ne[e]}("${t}"${n?`, "${n}"`:``});`}function oe(){let{toastSucesso:e,toastErro:t,toastAtencao:n,printToast:r}=O(),[i,a]=(0,k.useState)(`sucesso`),[o,s]=(0,k.useState)(`Operação realizada com sucesso!`),[c,l]=(0,k.useState)(``),[u,f]=(0,k.useState)(`success`),[p,m]=(0,k.useState)(`5000`),[h,g]=(0,k.useState)(!1);function _(){i===`sucesso`?e(o,c||void 0):i===`erro`?t(o,c||void 0):i===`atencao`?n(o,c||void 0):r({severity:u,summary:c||u,detail:o,life:h?void 0:Number(p)||5e3,sticky:h})}let v=(i===`custom`?[`printToast({`,`  severity: "${u}",`,`  summary: "${c||u}",`,`  detail: "${o}",`,...h?[`  sticky: true,`]:[`  life: ${p||5e3},`],`});`]:[`// Chamada direta`,ae(i,o,c)]).join(`
`);return(0,Z.jsxs)(`div`,{className:`botao-playground`,children:[(0,Z.jsxs)(`div`,{className:`botao-playground-preview`,style:{flexDirection:`column`,gap:`0.75rem`},children:[(0,Z.jsx)(`p`,{style:{margin:0,fontSize:`0.85rem`,color:`#6b7280`},children:`Clique no botão para disparar o toast configurado abaixo.`}),(0,Z.jsxs)(`button`,{onClick:_,style:{padding:`0.5rem 1.5rem`,background:`#2563eb`,color:`#fff`,border:`none`,borderRadius:6,fontWeight:600,cursor:`pointer`,fontSize:`0.9rem`},children:[(0,Z.jsx)(`i`,{className:`pi pi-bell`}),` Disparar Toast`]})]}),(0,Z.jsxs)(`div`,{className:`botao-playground-controls`,children:[(0,Z.jsxs)(`div`,{className:`pg-field`,children:[(0,Z.jsx)(`span`,{className:`pg-label`,children:`tipo`}),(0,Z.jsx)(`div`,{className:`pg-radio-group`,children:$.map(e=>(0,Z.jsx)(`button`,{className:`pg-radio-btn${i===e.value?` selected`:``}`,onClick:()=>{a(e.value);let t=ie[e.value];t!==void 0&&(s(t),l(``)),e.value===`custom`&&f(`info`)},children:e.label},e.value))})]}),i===`custom`&&(0,Z.jsxs)(`div`,{className:`pg-field`,children:[(0,Z.jsx)(`span`,{className:`pg-label`,children:`severity`}),(0,Z.jsx)(`div`,{className:`pg-radio-group`,children:te.map(e=>(0,Z.jsx)(`button`,{className:`pg-radio-btn${u===e?` selected`:``}`,onClick:()=>f(e),children:e},e))})]}),(0,Z.jsxs)(`div`,{className:`pg-field`,children:[(0,Z.jsx)(`span`,{className:`pg-label`,children:`detail`}),(0,Z.jsx)(`input`,{className:`pg-input`,value:o,onChange:e=>s(e.target.value),style:{maxWidth:400}})]}),(0,Z.jsxs)(`div`,{className:`pg-field`,children:[(0,Z.jsx)(`span`,{className:`pg-label`,children:`summary`}),(0,Z.jsx)(`input`,{className:`pg-input`,value:c,onChange:e=>l(e.target.value),placeholder:re[i],style:{maxWidth:300}})]}),i===`custom`&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`div`,{className:`pg-field`,children:[(0,Z.jsx)(`span`,{className:`pg-label`,children:`life (ms)`}),(0,Z.jsx)(`input`,{className:`pg-input`,value:p,onChange:e=>m(e.target.value),disabled:h,style:{maxWidth:120}})]}),(0,Z.jsxs)(`div`,{className:`pg-field`,children:[(0,Z.jsx)(`span`,{className:`pg-label`,children:`sticky`}),(0,Z.jsx)(`div`,{className:`pg-checkbox-group`,children:(0,Z.jsx)(`button`,{className:`pg-checkbox-btn${h?` selected`:``}`,onClick:()=>g(e=>!e),children:`sticky`})})]})]})]}),(0,Z.jsx)(d,{code:v})]})}function se(){return(0,Z.jsx)(Q,{children:(0,Z.jsx)(oe,{})})}var ce=[{title:`Playground`,description:`Experimente os métodos do hook em tempo real.`,example:(0,Z.jsx)(se,{}),code:`// Em qualquer componente dentro do ToastProviderSeplag:
const { toastSucesso, toastErro, toastAtencao, printToast } = useToastSeplag();

toastSucesso("Registro salvo com sucesso!");
toastErro("Falha ao carregar os dados.");
toastAtencao("Verifique os campos obrigatórios.");`},{title:`Configuração do Provider`,description:`Envolva a raiz da aplicação (ou o layout principal) com ToastProviderSeplag para que o hook funcione em qualquer componente filho.`,example:null,code:`import { ToastProviderSeplag } from "@seplag/ui-lib-react-18";

// main.tsx ou App.tsx
<ToastProviderSeplag>
  <App />
</ToastProviderSeplag>`},{title:`Métodos atalho`,description:`toastSucesso, toastErro e toastAtencao possuem summary padrão pré-definido e tempo de exibição de 5 segundos.`,example:null,code:`const { toastSucesso, toastErro, toastAtencao } = useToastSeplag();

// Apenas detail — summary padrão é usado
toastSucesso("Cadastro realizado!");
toastErro("Não foi possível salvar.");
toastAtencao("Existem campos inválidos.");

// Sobrescrevendo o summary
toastSucesso("Senha alterada com sucesso!", "Senha atualizada");
toastErro("Sessão expirada.", "Autenticação necessária");`},{title:`printToast (mensagem customizada)`,description:`Use printToast para controle total sobre todas as propriedades do Toast do PrimeReact.`,example:null,code:`const { printToast } = useToastSeplag();

// Toast informativo que some após 8 segundos
printToast({
  severity: "info",
  summary: "Dica",
  detail: "Use Ctrl+S para salvar rapidamente.",
  life: 8000,
});

// Toast persistente (não some automaticamente)
printToast({
  severity: "warn",
  summary: "Atenção",
  detail: "Há alterações não salvas.",
  sticky: true,
});`}],le=[{name:`toastSucesso`,type:`(detail: string, summary?: string) => void`,required:!1,description:`Exibe toast de sucesso. Summary padrão: "Sucesso". Life: 5000ms.`},{name:`toastErro`,type:`(detail: string, summary?: string) => void`,required:!1,description:`Exibe toast de erro. Summary padrão: "Erro". Life: 5000ms.`},{name:`toastAtencao`,type:`(detail: string, summary?: string) => void`,required:!1,description:`Exibe toast de atenção (warn). Summary padrão: "Atenção". Life: 5000ms.`},{name:`printToast`,type:`(arg: ToastMessage) => void`,required:!1,description:`Exibe toast com controle total. Aceita todas as props de ToastMessage do PrimeReact (severity, summary, detail, life, sticky, etc.).`}];function ue(){return(0,Z.jsx)(f,{title:`useToastSeplag`,description:`Hook para exibir notificações toast. Requer ToastProviderSeplag na árvore de componentes. Disponibiliza atalhos para as severidades mais comuns e acesso direto ao Toast do PrimeReact via printToast.`,badge:`Estável`,since:`v0.0.1`,importStatement:`import { ToastProviderSeplag } from "@seplag/ui-lib-react-18";
import { useToastSeplag } from "@seplag/ui-lib-react-18";`,sections:ce,props:le})}export{ue as default};