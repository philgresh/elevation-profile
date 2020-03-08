(this["webpackJsonpelevation-profile"]=this["webpackJsonpelevation-profile"]||[]).push([[0],{66:function(t,e,n){t.exports=n(98)},75:function(t,e,n){},97:function(t,e,n){},98:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(33),o=n.n(i),c=n(22),l=n(12),u=n(51),s=(n(75),n(23)),p=n(52),f=n.n(p),d=n(24),m=n(14),h=n(29),g=n.n(h),v=n(37),b=n(5),j=n(53),E=n.n(j),O=function(t){return t.map((function(t){var e=Object(b.a)(t,2),n=e[0],a=n;return n>180&&(a-=360),n<-180&&(a+=360),[a,e[1]]}))},w=function(){var t=Object(v.a)(g.a.mark((function t(e){var n,a,r,i;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Math.min(100*(e.length-1),500),a=O(e),"AIzaSyC7zBpTG_qva9l6ocPNKajZN1b6HKas2lY",r=a.reduce((function(t,e,n){var r=Object(b.a)(e,2),i=r[0],o=r[1],c="".concat(t).concat(o,",").concat(i);return n!==a.length-1&&(c+="|"),c}),""),i={samples:n,path:r,key:"AIzaSyC7zBpTG_qva9l6ocPNKajZN1b6HKas2lY"},"https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json",t.abrupt("return",{url:"https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json",params:i});case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),y=function(t){return t.results.map((function(t,e){return{index:e,elevation:t.elevation,lat:t.location.lat,lng:t.location.lng}}))},x=function(t){var e=t.submitting;return function(t){t({submitting:e,type:"SET_SUBMITTING"})}},k=function(t){return function(e){return e({type:"PUSH_PIN",pin:t})}};function P(){var t=Object(s.a)(["\n  flex: 1 1 auto;\n  background-color: #eeeeee;\n  color: teal;\n  &:hover {\n    background-color: #dddddd;\n    color: #004040;\n  }\n"]);return P=function(){return t},t}function T(){var t=Object(s.a)(["\n  flex: 2 1 250px;\n  border: none;\n  background: teal;\n  color: white;\n  font-size: 1rem;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin: 0.5rem;\n  -webkit-box-shadow: 0px 5px 5px 1px rgba(34, 34, 34, 0.5);\n  -moz-box-shadow: 0px 5px 5px 1px rgba(34, 34, 34, 0.5);\n  box-shadow: 0px 5px 5px 1px rgba(34, 34, 34, 0.5);\n  cursor: pointer;\n  &:hover {\n    background-color: #006464;\n  }\n"]);return T=function(){return t},t}function D(){var t=Object(s.a)(["\n  display: flex;\n  position: fixed;\n  flex-wrap: wrap;\n  z-index: 5;\n  margin: 0 2rem;\n"]);return D=function(){return t},t}var S=d.a.div(D()),A=d.a.button(T()),I=Object(d.a)(A)(P()),N=function(t){var e=t.getElevationData,n=t.submitting,a=t.numPins,i=n||a<2,o=r.a.createElement(r.a.Fragment,null,r.a.createElement("strong",null,"Get my elevation profile!"),r.a.createElement("br",null),"Or click to add more points");return 0===a&&(o="Click anywhere to drop an endpoint"),1===a&&(o="Click anywhere to drop another endpoint"),r.a.createElement(A,{disabled:i,onClick:e,id:"get-elevation-profile-button"},n?r.a.createElement(f.a,null):o)},_=function(t){var e=t.disabled,n=t.clearPins;return r.a.createElement(I,{onClick:n,disabled:e,id:"clear-button"},"Clear pins")},H=Object(l.b)((function(t){return{submitting:t.chart.submitting,numPins:t.map.pins.length}}),(function(t){return{getElevationData:function(){return t(function(){var t=Object(v.a)(g.a.mark((function t(e,n){var a,r,i,o,c,l;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n(),r=a.map,i=r.pins,e(x({submitting:!0})),t.next=5,w(i);case 5:return o=t.sent,c=o.url,l=o.params,t.next=10,E.a.get(c,{params:l}).then((function(t){var n=t.data,a=y(n);e({type:"SET_ELEVATION_DATA",elevationData:Object(m.a)(a)}),e({type:"SET_MAP_HEIGHT",mapHeight:"75vh"})})).catch((function(t){console.error(t)})).finally((function(){return e(x({submitting:!1}))}));case 10:return t.abrupt("return",t.sent);case 11:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}())},clearPins:function(){return t((function(t){t({type:"CLEAR_PINS"}),t({type:"SET_ELEVATION_DATA",elevationData:[]}),t({type:"SET_MAP_HEIGHT",mapHeight:"100vh"})}))}}}))((function(t){var e=t.getElevationData,n=t.clearPins,a=t.numPins,i=t.submitting,o=a>0;return r.a.createElement(S,null,r.a.createElement(N,{getElevationData:e,submitting:i,numPins:a}),o&&r.a.createElement(_,{clearPins:n,disabled:!o||i}))})),C=n(104),M=n(106),z=n(60),L=n(109),G=n(16),U=n(102),W=n(103),B=n(111),R=n(107),K=n(112),J=n(57),V=n.n(J),Y=function(t){var e=t.chartProps,n=t.elevationData,i=e.width,o=e.height,c=e.margin,l=Object(a.useRef)();return Object(a.useEffect)((function(){Object(U.a)("svg > *").remove();var t=Object(W.a)(l.current),e=Object(C.a)(n,(function(t){return t.elevation})),a=Object(L.a)((function(t){return Object(K.a)(1-t)})).domain(e),r=Object(G.a)().domain([0,n.length]).range([c.left,i-c.right]),u=Object(G.a)().domain(e).nice().range([o-c.bottom,c.top]),s=Object(B.a)().curve(R.a).defined((function(t){return!Number.isNaN(t.elevation)})).x((function(t){return r(t.index)})).y((function(t){return u(t.elevation)}));(u(0)<u(e[0])||u(0)>u(e[1]))&&t.append("line").attr("id","waterline").style("stroke","lightblue").style("stroke-opacity",.5).style("fill","#").style("stroke-width",2).style("stroke-dasharray","10 5 10").attr("x1",c.left).attr("y1",u(0)).attr("x2",i-c.right).attr("y2",u(0)),t.append("g").call((function(t){return t.attr("transform","translate(0,".concat(o-c.bottom,")")).call((function(t){return t.select(".domain").remove()}))})),t.append("g").call((function(t){return t.attr("transform","translate(".concat(c.left,",0)")).call(Object(z.a)(u)).call((function(t){return t.select(".domain").remove()})).call((function(t){return t.select(".tick:last-of-type text").append("tspan").text(" meters")}))})),t.append("defs").append("linearGradient").attr("id","mainGradient").attr("id","gradient").attr("gradientUnits","userSpaceOnUse").attr("x1",c.left).attr("y1",c.top).attr("x2",i-c.right).attr("y2",o-c.bottom).selectAll("stop").data(Object(M.a)(0,1,10)).join("stop").attr("offset",(function(t){return t})).attr("stop-color",a.interpolator()),t.append("path").datum(n).attr("fill","transparent").attr("stroke","url(#gradient)").attr("stroke-width",3).attr("stroke-linejoin","round").attr("stroke-linecap","round").attr("d",s)}),[n]),r.a.createElement(V.a,{animate:!0,duration:500},r.a.createElement("svg",{ref:l,viewBox:"0, 0, ".concat(i,", ").concat(o)}))},Z=Object(l.b)((function(t){return{elevationData:t.chart.elevationData,chartProps:t.chart.chartProps}}),null)((function(t){var e=t.chartProps,n=t.elevationData;return r.a.createElement(Y,{chartProps:e,elevationData:n})})),q=n(1),F=n(9),$=n(19),Q=n(59),X=n.n(Q),tt=function(t){var e=t.size,n=t.fill,a=void 0===n?"#D00":n,i=t.stroke,o={fill:a,stroke:void 0===i?"none":i};return r.a.createElement("svg",{height:e,viewBox:"0 0 24 24",style:o},r.a.createElement("path",{d:"M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3\n  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9\n  C20.1,15.8,20.2,15.8,20.2,15.7z"}))},et={offsetTop:-20,offsetLeft:-10,draggable:!0},nt=function(t){var e=t.pins,n=t.onMarkerDragEnd;return e.map((function(t,e){var a=Object(b.a)(t,2),i=a[0],o=a[1];return r.a.createElement($.b,Object.assign({longitude:i,latitude:o,key:"".concat(i,",").concat(o),title:"".concat(i,",").concat(o),onDragEnd:function(t){return n(t,e)}},et),r.a.createElement(tt,{size:20,fill:"#D00000CC"}))}))};n(96);function at(){var t=Object(s.a)(["\n  transition: all 1.5s ease-in-out;\n  /* transition: transform 300ms ease-in-out; */\n"]);return at=function(){return t},t}var rt=d.a.div(at()),it=function(){var t=[];return Object(M.a)(0,1,10).forEach((function(e){var n;t.push(e),t.push((n=e,Object(L.a)((function(t){return Object(K.a)(1-t)})).domain([0,.5,1])(n)))})),{"line-color":"#ff0000","line-width":2,"line-gradient":["interpolate",["linear"],["line-progress"]].concat(t)}},ot=Object(l.b)((function(t){return{submitting:t.chart.submitting,pins:t.map.pins}}),(function(t){return{actions:{pushPin:function(e){return t(k(e))},setPins:function(e){return t(function(t){return function(e){return e({type:"SET_PINS",pins:t})}}(e))}}}}))((function(t){var e=t.mapHeight,n=t.pins,i=t.actions,o=n.length>0,c=i.pushPin,l=i.setPins,u=Object(a.useState)({height:"100vh",width:"100vw",position:"absolute",longitude:-119,latitude:36,zoom:5}),s=Object(b.a)(u,2),p=s[0],f=s[1],d=Object(a.useMemo)((function(){return it()}),[]);Object(a.useEffect)((function(){f((function(t){return Object(F.a)({},t,{height:e})}))}),[e,n]);var h={type:"LineString",coordinates:Object(m.a)(n)};return r.a.createElement(rt,null,r.a.createElement($.e,Object.assign({mapboxApiAccessToken:"pk.eyJ1IjoicGdyZXM1NDI2OCIsImEiOiJjazY2dDQ1Y2owa2FrM2xuc2d3MTMzZ2g1In0.5p1KOaTO_mruaUlSoDWxNA",mapStyle:"mapbox://styles/pgres54268/cjuiu9aay60dx1fp784rt3x7r",onViewportChange:function(t){p.longitude,t.longitude,f(Object(F.a)({},t,{width:"100vw"}))},onClick:function(t){return function(t){t.preventDefault(),c(t.lngLat)}(t)}},p),o&&r.a.createElement("div",{id:"pin-markers"},r.a.createElement(nt,{pins:n,onMarkerDragEnd:function(t,e){t.preventDefault();var a=X()(n,Object(q.a)({},e,{$set:Object(m.a)(t.lngLat)}));l(a)}}),r.a.createElement($.d,{id:"my-lines",type:"geojson",data:h,lineMetrics:!0},r.a.createElement($.a,{id:"lines",type:"line",paint:Object(F.a)({},d)}))),r.a.createElement("div",{style:{position:"absolute",right:0}},r.a.createElement($.c,null))))})),ct=(n(97),Object(l.b)((function(t){return{elevationData:t.chart.elevationData,chartHeight:t.chart.chartProps.height,chartMargin:t.chart.chartProps.margin}}),null)((function(t){var e=t.elevationData,n=t.chartHeight,a=t.chartMargin,i=e.length>0,o=a.top+a.bottom,c=i?"calc(100vh - ".concat(n,"px - ").concat(o,"px)"):"100vh";return r.a.createElement("div",{className:"App"},r.a.createElement(H,null),r.a.createElement(ot,{mapHeight:c}),i&&r.a.createElement(Z,null))}))),lt={submitting:!1,elevationData:[],chartProps:{width:window.innerWidth-50,height:"200",margin:{top:20,right:100,bottom:20,left:100}}},ut=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:lt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_SUBMITTING":return Object(F.a)({},t,{submitting:e.submitting});case"SET_ELEVATION_DATA":return Object(F.a)({},t,{elevationData:Object(m.a)(e.elevationData)});default:return t}},st={mapProps:{mapHeight:"100vh"},pins:[]},pt=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:st,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"PUSH_PIN":var n=[].concat(Object(m.a)(t.pins),[e.pin]);return Object(F.a)({},t,{pins:n});case"SET_PINS":return Object(F.a)({},t,{pins:Object(m.a)(e.pins)});case"CLEAR_PINS":return Object(F.a)({},st,{pins:[]});case"SET_MAP_HEIGHT":return Object(F.a)({},t,{mapProps:Object(F.a)({},t.mapProps,{mapHeight:e.mapHeight})});default:return t}},ft=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function dt(t,e){navigator.serviceWorker.register(t).then((function(t){t.onupdatefound=function(){var n=t.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),e&&e.onUpdate&&e.onUpdate(t)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(t)))})}})).catch((function(t){console.error("Error during service worker registration:",t)}))}var mt=[u.a],ht=Object(c.c)({chart:ut,map:pt}),gt=Object(c.d)(ht,c.a.apply(void 0,mt));o.a.render(r.a.createElement(l.a,{store:gt},r.a.createElement(ct,null)),document.getElementById("root")),function(t){if("serviceWorker"in navigator){if(new URL("/elevation-profile",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/elevation-profile","/service-worker.js");ft?(!function(t,e){fetch(t,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(t){t.unregister().then((function(){window.location.reload()}))})):dt(t,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,t),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):dt(e,t)}))}}()}},[[66,1,2]]]);
//# sourceMappingURL=main.69ead0b2.chunk.js.map