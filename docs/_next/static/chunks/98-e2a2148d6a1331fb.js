"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[98],{7515:function(n,t,e){e.d(t,{Z:function(){return p}});var r=e(5893),o=e(7294),i=e(4874),c=e.n(i),u=e(4175),a=e(7357),l=e(3321),s=e(3218),f=e(7847),d=e(594),h={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"90vw",height:"80vh",bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:2,overflow:"hidden",cursor:"grab"},v={zIndex:"modal",color:"#0036bb",backgroundColor:"#ffffff",position:"absolute",right:"1%",top:"1%"},g={zIndex:"modal",color:"#0036bb55",backgroundColor:"#ffffff55","&:hover":{color:"#0036bb",backgroundColor:"#ffffff"},position:"absolute",right:"1%",top:"1%"};function p(n){var t=n.src,e=n.open,i=n.handleClose,p=function(){s.j3(_,R.current,W.current),console.log("Modal pan zoom : created"),s.uW(t)&&s.g9(t.replace(".svg",".json")).then((function(n){s.QT(_,n)}))},m=function(){null!=A.current&&null!=W.current&&w&&!b.current&&(R.current=c()(A.current,S),b.current=!0,k(!0),setTimeout((function(){k(!1)}),2e3),s.H7(_)?p():setTimeout((function(){p()}),1))},x=function(){R.current&&(R.current.dispose(),b.current=!1,console.log("Modal pan zoom : disposed"))},b=((0,o.useRef)(new Array),(0,o.useRef)(!1)),j=(0,o.useState)(!1),w=j[0],y=j[1],Z=(0,o.useState)(!0),C=Z[0],k=Z[1],S={minZoom:.1,maxZoom:4},R=(0,o.useRef)(null),W=(0,o.useRef)(null),A=(0,o.useRef)(null),T=(0,o.useRef)(null),_="modal-".concat(t),z=(0,o.useCallback)((function(n){A.current=n,m()}),[w,e]),N=(0,o.useCallback)((function(n){W.current=n,m()}),[w,e]);return(0,r.jsx)(u.Z,{open:e,onClose:function(){x(),i()},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,r.jsxs)(a.Z,{ref:N,sx:h,children:[(0,r.jsx)(l.Z,{ref:T,onClick:function(){x(),i()},variant:"conained",sx:C?v:g,children:(0,r.jsx)(d.Z,{})}),(0,r.jsx)("div",{ref:z,children:(0,r.jsx)(f.Z,{src:t,id:_,onLoad:function(){y(!0)}})})]})})}},1098:function(n,t,e){e.d(t,{Z:function(){return m}});var r=e(5893),o=e(7294),i=e(4874),c=e.n(i),u=e(7357),a=e(5113),l=e(6447),s=e(5861),f=e(3321),d=e(7515),h=e(3218),v=e(5343),g=e(3800),p=e(1163);function m(n){var t=n.src,e=n.menu,i=void 0!==e&&e,m=n.width,x=void 0===m?600:m,b=function(){Z.current&&O.current&&(O.current.dispose(),Z.current=!1)},j=function(){h.j3(t,O.current,M.current),h.uW(t)&&h.g9(t.replace(".svg",".json")).then((function(n){h.QT(t,n)}));var n=h.ZV(t);n&&H(n),h.uW(t)&&h.g9(t.replace(".svg",".json")).then((function(n){h.QT(t,n)}));var e=I.asPath.split("?");if(2==e.length){var r=h.hv(e[1]);"modal"in r&&r.modal===t&&w()}},w=function(){W||(I.push("".concat(I.pathname,"#pz-").concat(t,"?modal=").concat(t)),A(!0))},y=function(){b()},Z=(0,o.useRef)(!1),C=(0,o.useState)(!1),k=C[0],S=C[1],R=(0,o.useState)(!1),W=R[0],A=R[1],T=(0,o.useState)(Math.round(x/2)),_=T[0],z=T[1],N=(0,o.useState)(t.replace(/\.[^/.]+$/,"")),E=N[0],H=N[1],I=(0,p.useRouter)(),B={minZoom:.1,maxZoom:4},M=(0,o.useRef)(null),L=(0,o.useRef)(null),O=(0,o.useRef)(null),Q=(0,o.useRef)(null);return(0,o.useEffect)((function(){var n=Math.round(x/2);_!=n?z(n):h.j3(t,O.current,M.current)}),[_,x]),(0,o.useEffect)((function(){return k&&L.current&&!Z.current&&(k&&L.current&&!Z.current&&(O.current=c()(L.current,B),Z.current=!0,j()),b()),y}),[k]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u.Z,{id:"mainContent",m:1,sx:{width:x},children:(0,r.jsx)(a.Z,{elevation:1,sx:{overflow:"hidden"},children:(0,r.jsxs)(l.Z,{id:"pz-".concat(t),ref:Q,children:[i&&(0,r.jsxs)(l.Z,{direction:"row",spacing:2,justifyContent:"space-between",children:[(0,r.jsx)(s.Z,{variant:"h6",p:1,children:E}),(0,r.jsxs)(l.Z,{direction:"row",spacing:2,justifyContent:"flex-end",children:[(0,r.jsx)(f.Z,{sx:{zIndex:"modal",backgroundColor:"#ffffffaa"},onClick:function(){I.push("".concat(I.pathname,"#pz-").concat(t))},variant:"text",children:(0,r.jsx)(g.Z,{})}),(0,r.jsx)(f.Z,{sx:{zIndex:"modal",backgroundColor:"#ffffffaa"},onClick:function(){w()},variant:"text",children:(0,r.jsx)(v.Z,{})})]})]}),(0,r.jsx)(u.Z,{ref:M,sx:{height:_,position:"relative"},children:(0,r.jsx)("div",{ref:L,children:(0,r.jsx)("object",{type:"image/svg+xml",data:"/next-svg/".concat(t),id:t,onLoad:function(){S(!0)}})})})]})})}),(0,r.jsx)(d.Z,{src:t,open:W,handleClose:function(){!function(){var n="".concat(I.pathname,"#pz-").concat(t);I.push(n,n,{scroll:!1}),A(!1)}()}})]})}},3218:function(n,t,e){e.d(t,{j3:function(){return v},QT:function(){return m},H7:function(){return f},ZV:function(){return x},g9:function(){return g},uW:function(){return b},hv:function(){return s}});var r=e(4051),o=e.n(r),i=(e(4874),e(5500));function c(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function u(n,t,e,r,o,i,c){try{var u=n[i](c),a=u.value}catch(l){return void e(l)}u.done?t(a):Promise.resolve(a).then(r,o)}function a(n){return function(){var t=this,e=arguments;return new Promise((function(r,o){var i=n.apply(t,e);function c(n){u(i,r,o,c,a,"next",n)}function a(n){u(i,r,o,c,a,"throw",n)}c(void 0)}))}}function l(n){return function(n){if(Array.isArray(n))return c(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,t){if(!n)return;if("string"===typeof n)return c(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return c(n,t)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(n){return JSON.parse('{"'+decodeURI(n.replace(/&/g,'","').replace(/=/g,'":"'))+'"}')}function f(n){var t=document.getElementById(n);return t?"OBJECT"==t.tagName?document.getElementById(n).contentDocument.getElementsByTagName("svg")[0]:"svg"==t.tagName?t:void 0:null}function d(n){var t=f(n).getBBox();return{svg_width:t.width,svg_height:t.height}}function h(n){n&&(n.zoomAbs(0,0,1),n.moveTo(0,0))}function v(n,t,e){if(t){var r=d(n);r.svg_width/r.svg_height>e.clientWidth/e.clientHeight?function(n,t,e){if(t){h(t);var r=f(n),o=d(n),i=o.svg_width,c=o.svg_height,u=e.clientWidth/i;if(r.hasAttributeNS(null,"width")){var a=r.getAttributeNS(null,"width");a.endsWith("px")&&(a=Number(a.slice(0,-2))),u=a/i}var l=e.clientHeight/2-c*u/2,s=e.clientWidth/2-i*u/2;t.moveTo(s,l),r.getBoundingClientRect();var v=e.clientWidth/(i*u),g=e.clientWidth/2,p=e.clientHeight/2;t.zoomAbs(g,p,v)}}(n,t,e):function(n,t,e){if(t){h(t);var r=f(n),o=d(n),i=o.svg_width,c=o.svg_height,u=e.clientWidth/i;if(r.hasAttributeNS(null,"width")){var a=r.getAttributeNS(null,"width");a.endsWith("px")&&(a=Number(a.slice(0,-2))),u=a/i}var l=e.clientHeight/2-c*u/2,s=e.clientWidth/2-i*u/2;t.moveTo(s,l),r.getBoundingClientRect();var v=e.clientWidth/2,g=e.clientHeight/2,p=e.clientHeight/(c*u);t.zoomAbs(v,g,p)}}(n,t,e)}}function g(n){return p.apply(this,arguments)}function p(){return(p=a(o().mark((function n(t){var e;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("/next-svg/".concat(t));case 2:return e=n.sent,n.next=5,e.json();case 5:return n.abrupt("return",n.sent);case 6:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function m(n,t){var e=f(n);e&&l((0,i.Wj)(e).find("text")).forEach((function(n){var e=n.node.innerHTML;e in t&&(n.linkTo((function(n){n.to(t[e]).target("_blank")})),n.css({"text-decoration":"underline"}))}))}function x(n){var t=f(n);if(!t)return"";var e="",r=l((0,i.Wj)(t).find("title"));return r.length>0&&(e=r[0].node.innerHTML),e}function b(n){return"long_diag2.svg"==n||"nRF52.svg"==n}}}]);