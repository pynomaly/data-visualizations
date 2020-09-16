//https://developer.mozilla.org/en-US/docs/Web/Events/wheel
// creates a global "addWheelListener" method
// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
(function(d,a){var f="",e,c;if(d.addEventListener){e="addEventListener"}else{e="attachEvent";f="on"}c="onwheel" in a.createElement("div")?"wheel":a.onmousewheel!==undefined?"mousewheel":"DOMMouseScroll";d.addWheelListener=function(h,i,g){b(h,c,i,g);if(c=="DOMMouseScroll"){b(h,"MozMousePixelScroll",i,g)}};function b(i,h,j,g){i[e](f+h,c=="wheel"?j:function(k){!k&&(k=d.event);var l={originalEvent:k,target:k.target||k.srcElement,type:"wheel",deltaMode:k.type=="MozMousePixelScroll"?0:1,deltaX:0,deltaY:0,deltaZ:0,preventDefault:function(){k.preventDefault?k.preventDefault():k.returnValue=false}};if(c=="mousewheel"){l.deltaY=-1/40*k.wheelDelta;k.wheelDeltaX&&(l.deltaX=-1/40*k.wheelDeltaX)}else{l.deltaY=k.deltaY||k.detail}return j(l)},g||false)}})(window,document);