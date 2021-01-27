(function(t){function e(e){for(var o,r,s=e[0],l=e[1],u=e[2],d=0,y=[];d<s.length;d++)r=s[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&y.push(i[r][0]),i[r]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);c&&c(e);while(y.length)y.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],o=!0,s=1;s<n.length;s++){var l=n[s];0!==i[l]&&(o=!1)}o&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var o={},i={app:0},a=[];function r(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/~slysek2s/src/games/snake/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var c=l;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"0cf5":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("h1",[t._v("Snake with Vue.js")]),n("snake",{attrs:{"is-playing":t.isPlaying},on:{isPlaying:t.updateState}}),n("div",{attrs:{id:"game-menu"}},[n("button",{attrs:{id:"button"},on:{click:function(e){t.isPlaying?t.stopGame():t.startGame()}}},[t._v(t._s(t.isPlaying?"Stop":"Start"))])]),t._m(0)],1)},a=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("audio",{attrs:{loop:""}},[o("source",{attrs:{src:n("bd5d")}})])}],r=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"snake"}},[n("canvas",{attrs:{id:"playground",width:"500",height:"500"}})])}],l=(n("4160"),n("a9e3"),n("159b"),{name:"Snake",props:{isPlaying:Boolean},data:function(){return{playgroundElement:"",playgroundContext:"",snakeBody:{},x_velocity:10,y_velocity:0,gameHandler:Number,food:{}}},methods:{initializeGame:function(){this.snakeBody=[{x:250,y:250},{x:240,y:250},{x:230,y:250},{x:220,y:250},{x:210,y:250}],this.spawnFood(),this.x_velocity=10,this.y_velocity=0},drawSnake:function(){var t=this.playgroundContext;this.snakeBody.forEach((function(e){t.fillStyle="green",t.strokeStyle="lightgreen",t.fillRect(e.x,e.y,10,10),t.strokeRect(e.x,e.y,10,10)}))},moveSnake:function(){var t=this.snakeBody,e={x:t[0].x+this.x_velocity,y:t[0].y+this.y_velocity};this.snakeBody.unshift(e),t[0].x===this.food.x&&t[0].y===this.food.y?this.spawnFood():this.snakeBody.pop()},changeDirection:function(t){var e=37,n=39,o=38,i=40,a=t.keyCode,r=-10===this.y_velocity,s=10===this.y_velocity,l=10===this.x_velocity,u=-10===this.x_velocity;a!==e||l||(this.x_velocity=-10,this.y_velocity=0),a!==n||u||(this.x_velocity=10,this.y_velocity=0),a!==o||s||(this.x_velocity=0,this.y_velocity=-10),a!==i||r||(this.x_velocity=0,this.y_velocity=10)},spawnFood:function(){var t=this;this.food={x:this.randomize(),y:this.randomize()};var e=this.snakeBody,n=this.food;e.forEach((function(e){e.x===n.x&&e.y===n.y&&t.spawnFood()}))},drawFood:function(){this.playgroundContext.fillStyle="red",this.playgroundContext.strokeStyle="darkred",this.playgroundContext.fillRect(this.food.x,this.food.y,10,10),this.playgroundContext.strokeRect(this.food.x,this.food.y,10,10)},randomize:function(){return 10*Math.round(490*Math.random()/10)},gameOver:function(){for(var t,e=this.snakeBody,n=1;n<e.length;n++)if(t=e[0].x===e[n].x&&e[0].y===e[n].y,t)return!0;var o=e[0].x<0,i=e[0].x>490,a=e[0].y<0,r=e[0].y>490;return t=o||i||a||r,t},gameLoop:function(){this.gameOver()&&(this.updateIsPlaying(),console.log("GAME OVER!")),this.clearBoard(),this.moveSnake(),this.drawSnake(),this.drawFood()},updateIsPlaying:function(){this.$emit("isPlaying",!1)},clearBoard:function(){this.playgroundContext.fillStyle="#ede887",this.playgroundContext.strokeStyle="brown",this.playgroundContext.fillRect(0,0,this.playgroundElement.width,this.playgroundElement.height)}},mounted:function(){this.playgroundElement=document.getElementById("playground"),this.playgroundContext=this.playgroundElement.getContext("2d"),this.initializeGame(),this.clearBoard(),document.addEventListener("keydown",this.changeDirection)},watch:{isPlaying:function(t){var e=this;clearInterval(this.gameHandler),t&&(this.initializeGame(),this.gameHandler=setInterval((function(){return e.gameLoop()}),100))}}}),u=l,c=(n("e3b3"),n("2877")),d=Object(c["a"])(u,r,s,!1,null,"13d4aca8",null),y=d.exports,h={name:"App",components:{Snake:y},data:function(){return{isPlaying:!1,points:0}},methods:{startGame:function(){this.isPlaying=!0,this.playSound()},stopGame:function(){this.isPlaying=!1,this.stopSound()},updateState:function(t){this.isPlaying=t,t||this.stopSound()},playSound:function(){var t=document.querySelector("audio").play();void 0!==t&&t.then((function(){})).catch((function(t){console.log(t)}))},stopSound:function(){var t=document.querySelector("audio").pause();void 0!==t&&t.then((function(){})).catch((function(t){console.log(t)}))}}},f=h,p=(n("034f"),Object(c["a"])(f,i,a,!1,null,null,null)),g=p.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(g)}}).$mount("#app")},"85ec":function(t,e,n){},bd5d:function(t,e,n){t.exports=n.p+"media/Funky Chill loop.10a0eed8.wav"},e3b3:function(t,e,n){"use strict";n("0cf5")}});
//# sourceMappingURL=app.8b6f7391.js.map