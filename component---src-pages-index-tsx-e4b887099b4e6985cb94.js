(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"/8Fb":function(e,t,n){var r=n("XKFU"),o=n("UExd")(!0);r(r.S,"Object",{entries:function(e){return o(e)}})},"/e88":function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},Nr18:function(e,t,n){"use strict";var r=n("S/j/"),o=n("d/Gc"),i=n("ne8i");e.exports=function(e){for(var t=r(this),n=i(t.length),a=arguments.length,c=o(a>1?arguments[1]:void 0,n),u=a>2?arguments[2]:void 0,s=void 0===u?n:o(u,n);s>c;)t[c++]=e;return t}},QeBL:function(e,t,n){"use strict";n.r(t);n("xfY5");var r=n("q1tI"),o=n.n(r),i=(n("bHtr"),function(e){var t=e.color;return o.a.createElement("td",{style:{height:"20px",width:"20px",border:"1px solid black",backgroundColor:t}})}),a=function(e){return o.a.createElement("table",null,o.a.createElement("tbody",null,new Array(e.dimensions[0]).fill(void 0).map((function(t,n){return o.a.createElement("tr",{key:"board-row-"+n},new Array(e.dimensions[1]).fill(void 0).map((function(t,r){return o.a.createElement(i,{key:"board-row-"+n+"-pos-"+r,color:e.points[String([n,r])]})})))}))))},c=(n("91GP"),{coordinates:[[0,-1],[0,0],[0,1],[0,2]],color:"#00F0F0"}),u={coordinates:[[1,-1],[0,-1],[0,0],[0,1]],color:"#0000F0"},s={coordinates:[[0,-1],[0,0],[0,1],[1,1]],color:"#F0A000"},l={coordinates:[[0,0],[0,1],[-1,0],[-1,1]],color:"#F0F000"},f={coordinates:[[0,-1],[0,0],[1,0],[1,1]],color:"#00F000"},d={coordinates:[[1,-1],[1,0],[0,0],[0,1]],color:"#F00000"},b={coordinates:[[0,-1],[0,0],[1,0],[-1,0]],color:"#A000F0"},m=function(){var e=[b,d,f,s,u,c,l];return JSON.parse(JSON.stringify(e[Math.floor(Math.random()*e.length)]))},v=(n("/8Fb"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("p21n"),function(e,t){return[e[0]+t[0],e[1]+t[1]]}),p=function(e,t){return e.map((function(e){return v(e,t)}))},C=function(e,t){return Object.assign({},e,{coordinates:p(e.coordinates,t)})},h=function(e){return e.coordinates.reduce((function(t,n){return t[String(n)]=e.color,t}),{})},k=function(e){var t=Object(r.useState)(e),n=t[0],o=(t[1],function(e){var t=Object(r.useState)(m()),n=t[0],o=t[1],i=Object(r.useState)(m()),a=i[0],c=i[1];return{replaceCurrentTetrimino:Object(r.useCallback)((function(){o(a),c(m())}),[a]),setActiveTetrimino:o,activeTetrimino:n,nextTetrimino:a}}()),i=o.activeTetrimino,a=o.setActiveTetrimino,c=o.nextTetrimino,u=o.replaceCurrentTetrimino,s=Object(r.useState)([-1,Math.floor(n[1]/2-1)]),l=s[0],f=s[1],d=function(e,t,n){var o=Object(r.useState)({}),i=o[0],a=o[1],c=Object(r.useState)({}),u=c[0],s=c[1],l=Object(r.useState)({}),f=l[0],d=l[1],b=Object(r.useCallback)((function(){a({}),s({})}),[]);return Object(r.useEffect)((function(){var n=C(e,t);d(Object.assign({},i,{},h(n)))}),[e,i,t]),{reset:b,allCoordinates:f,addStationaryCoordinates:Object(r.useCallback)((function(r){var o=C(e,t),c=n[1],l=Object.assign({},i,{},h(o)),f=Object.assign({},u);o.coordinates.forEach((function(e){var t=e[0],n=e[1];f[t]||(f[t]={}),f[t][n]=!0}));var d=o.coordinates.map((function(e){return e[0]})).filter((function(e,t,n){return n.indexOf(e)===t})).filter((function(e){return Object.keys(f[e]).length>=c}));return d.forEach((function(e){Object.keys(f[e]).forEach((function(t){delete l[String([e,Number(t)])]})),delete f[e];for(var t=function(e){Object.entries(f[e]||{}).forEach((function(t){var n=t[0];l[String([e+1,n])]=l[String([e,n])],delete l[String([e,n])]})),f[Number(e)+1]=f[e],delete f[e]},n=e-1;n>=0;--n)t(n)})),a(l),s(f),r(),d.length}),[i,u,e,t]),stationaryBrickCoordinates:i}}(i,l,n),b=d.allCoordinates,k=d.reset,g=d.stationaryBrickCoordinates,E=d.addStationaryCoordinates,O=function(e,t,n,o,i,a){var c=Object(r.useCallback)((function(e){return e.every((function(e){var t=e[0],n=e[1],r=0<=n,o=n<i[1],c=t<i[0],u=!a[String([t,n])];return r&&o&&c&&u}))}),[i,a]),u=Object(r.useCallback)((function(t,r,i){var a=C(e,n);c(p(a.coordinates,t))?o(v(n,t)):a.coordinates.some((function(e){var t=e[0];e[1];return t<0}))?i&&i():r&&r()}),[e,i,a,n]),s=Object(r.useCallback)((function(r){var o=Object.assign({},e,{coordinates:e.coordinates.map(r)}),i=C(o,n);c(i.coordinates)?t(o):(c(p(i.coordinates,[0,1]))&&(u([0,1]),t(o)),c(p(i.coordinates,[0,-1]))&&(u([0,-1]),t(o)))}),[e,n]);return{rotateClockwise:Object(r.useCallback)((function(){s((function(e){var t=e[0];return[e[1],-t]}))}),[s]),rotateCounterClockwise:Object(r.useCallback)((function(){s((function(e){var t=e[0];return[-e[1],t]}))}),[s]),moveLeft:Object(r.useCallback)((function(){return u([0,-1])}),[u]),moveRight:Object(r.useCallback)((function(){return u([0,1])}),[u]),moveDown:Object(r.useCallback)((function(e,t){return u([1,0],e,t)}),[u])}}(i,a,l,f,n,g),j=O.moveDown,w=O.moveLeft,y=O.moveRight,S=O.rotateClockwise,N=O.rotateCounterClockwise,F=Object(r.useCallback)((function(){f([-1,Math.floor(n[1]/2-1)])}),[]),T=Object(r.useState)(0),x=T[0],A=T[1],I=Object(r.useState)(40),L=I[0],R=I[1],B=Object(r.useCallback)((function(e){R(L-2*e)}),[L]),M=Object(r.useCallback)((function(){var e=E((function(){u(),F()}));B(e)}),[E,u,B]);!function(e){Object(r.useEffect)((function(){var t=e.map((function(e){var t=function(t){return t.key===e.key?e.fn():null};return window.addEventListener("keydown",t),t}));return function(){t.forEach((function(e){window.removeEventListener("keydown",e)}))}}),e.map((function(e){return e.fn})))}([{key:"ArrowDown",fn:j},{key:"ArrowLeft",fn:w},{key:"ArrowRight",fn:y},{key:"w",fn:S},{key:"q",fn:N}]);var U=Object(r.useCallback)((function(){R(40),k(),M()}),[]);return Object(r.useEffect)((function(){x%L||j(M,U)}),[x,L]),Object(r.useEffect)((function(){setTimeout((function(){return A(x+1)}),10)}),[x]),{dimensions:n,activeTetrimino:i,tetriminoToCoords:h,nextTetrimino:c,replaceCurrentTetrimino:u,allCoordinates:b,shiftCoordinates:p,setBrickPosition:f,addStationaryCoordinates:E,moveLeft:w,moveRight:y,speed:L,moveDown:j,reset:k,rotateClockwise:S,rotateCounterClockwise:N}};t.default=function(){var e=Object(r.useState)([16,10]),t=e[0],n=e[1],i=k(t),c=i.allCoordinates,u=i.tetriminoToCoords,s=i.nextTetrimino,l=i.shiftCoordinates,f=(i.activeTetrimino,i.setBrickPosition,i.rotateClockwise,i.moveLeft,i.reset),d=(i.moveRight,i.moveDown,i.speed);i.rotateCounterClockwise,i.replaceCurrentTetrimino,i.addStationaryCoordinates;return o.a.createElement("div",null,o.a.createElement("div",{style:{display:"flex"}},o.a.createElement("div",null,o.a.createElement("h4",null,"Next Block"),o.a.createElement(a,{dimensions:[4,4],points:u({color:s.color,coordinates:l(s.coordinates,[1,1])})})),o.a.createElement(a,{dimensions:t,points:c})),o.a.createElement("br",null),o.a.createElement("h3",null,"Blocks move every ",d,"0/ms"),o.a.createElement("label",{htmlFor:""},"Height"),o.a.createElement("input",{type:"number",value:t[0],onChange:function(e){return n([Number(e.target.value),t[1]])}}),o.a.createElement("label",{htmlFor:""},"width"),o.a.createElement("input",{type:"number",value:t[1],onChange:function(e){return n([t[0],Number(e.target.value)])}}),o.a.createElement("br",null),o.a.createElement("button",{onClick:f},"Reset"))}},UExd:function(e,t,n){var r=n("nh4g"),o=n("DVgA"),i=n("aCFj"),a=n("UqcF").f;e.exports=function(e){return function(t){for(var n,c=i(t),u=o(c),s=u.length,l=0,f=[];s>l;)n=u[l++],r&&!a.call(c,n)||f.push(e?[n,c[n]]:c[n]);return f}}},bHtr:function(e,t,n){var r=n("XKFU");r(r.P,"Array",{fill:n("Nr18")}),n("nGyu")("fill")},p21n:function(e,t){},qncB:function(e,t,n){var r=n("XKFU"),o=n("vhPU"),i=n("eeVq"),a=n("/e88"),c="["+a+"]",u=RegExp("^"+c+c+"*"),s=RegExp(c+c+"*$"),l=function(e,t,n){var o={},c=i((function(){return!!a[e]()||"​"!="​"[e]()})),u=o[e]=c?t(f):a[e];n&&(o[n]=u),r(r.P+r.F*c,"String",o)},f=l.trim=function(e,t){return e=String(o(e)),1&t&&(e=e.replace(u,"")),2&t&&(e=e.replace(s,"")),e};e.exports=l},xfY5:function(e,t,n){"use strict";var r=n("dyZX"),o=n("aagx"),i=n("LZWt"),a=n("Xbzi"),c=n("apmT"),u=n("eeVq"),s=n("kJMx").f,l=n("EemH").f,f=n("hswa").f,d=n("qncB").trim,b=r.Number,m=b,v=b.prototype,p="Number"==i(n("Kuth")(v)),C="trim"in String.prototype,h=function(e){var t=c(e,!1);if("string"==typeof t&&t.length>2){var n,r,o,i=(t=C?t.trim():d(t,3)).charCodeAt(0);if(43===i||45===i){if(88===(n=t.charCodeAt(2))||120===n)return NaN}else if(48===i){switch(t.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+t}for(var a,u=t.slice(2),s=0,l=u.length;s<l;s++)if((a=u.charCodeAt(s))<48||a>o)return NaN;return parseInt(u,r)}}return+t};if(!b(" 0o1")||!b("0b1")||b("+0x1")){b=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof b&&(p?u((function(){v.valueOf.call(n)})):"Number"!=i(n))?a(new m(h(t)),n,b):h(t)};for(var k,g=n("nh4g")?s(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),E=0;g.length>E;E++)o(m,k=g[E])&&!o(b,k)&&f(b,k,l(m,k));b.prototype=v,v.constructor=b,n("KroJ")(r,"Number",b)}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-e4b887099b4e6985cb94.js.map