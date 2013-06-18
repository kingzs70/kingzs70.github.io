/*baidu.fx.fadeIn,baidu.fx.fadeOut,baidu.fx.mask*/
baidu.fx=baidu.fx||{};baidu.fx.Timeline=baidu.lang.createClass(function(a){baidu.object.extend(this,baidu.fx.Timeline.options);baidu.object.extend(this,a)},{className:"baidu.fx.Timeline",options:{interval:16,duration:500,dynamic:true}}).extend({launch:function(){var a=this;a.dispatchEvent("onbeforestart");typeof a.initialize=="function"&&a.initialize();a["\x06btime"]=new Date().getTime();a["\x06etime"]=a["\x06btime"]+(a.dynamic?a.duration:0);a["\x06pulsed"]();return a},"\x06pulsed":function(){var b=this;var a=new Date().getTime();b.percent=(a-b["\x06btime"])/b.duration;b.dispatchEvent("onbeforeupdate");if(a>=b["\x06etime"]){typeof b.render=="function"&&b.render(b.transition(b.percent=1));typeof b.finish=="function"&&b.finish();b.dispatchEvent("onafterfinish");b.dispose();return}typeof b.render=="function"&&b.render(b.transition(b.percent));b.dispatchEvent("onafterupdate");b["\x06timer"]=setTimeout(function(){b["\x06pulsed"]()},b.interval)},transition:function(a){return a},cancel:function(){this["\x06timer"]&&clearTimeout(this["\x06timer"]);this["\x06etime"]=this["\x06btime"];typeof this.restore=="function"&&this.restore();this.dispatchEvent("oncancel");this.dispose()},end:function(){this["\x06timer"]&&clearTimeout(this["\x06timer"]);this["\x06etime"]=this["\x06btime"];this["\x06pulsed"]()}});baidu.fx.create=function(d,b,c){var e=new baidu.fx.Timeline(b);e.element=d;e._className=c||e._className;e["\x06original"]={};var a="baidu_current_effect";e.addEventListener("onbeforestart",function(){var g=this,f;g.attribName="att_"+g._className.replace(/\W/g,"_");f=g.element.getAttribute(a);g.element.setAttribute(a,(f||"")+"|"+g.guid+"|",0);if(!g.overlapping){(f=g.element.getAttribute(g.attribName))&&window[baidu.guid]._instances[f].cancel();g.element.setAttribute(g.attribName,g.guid,0)}});e["\x06clean"]=function(h){var g=this,f;if(h=g.element){h.removeAttribute(g.attribName);f=h.getAttribute(a);f=f.replace("|"+g.guid+"|","");if(!f){h.removeAttribute(a)}else{h.setAttribute(a,f,0)}}};e.addEventListener("oncancel",function(){this["\x06clean"]();this["\x06restore"]()});e.addEventListener("onafterfinish",function(){this["\x06clean"]();this.restoreAfterFinish&&this["\x06restore"]()});e.protect=function(f){this["\x06original"][f]=this.element.style[f]};e["\x06restore"]=function(){var j=this["\x06original"],h=this.element.style,f;for(var g in j){f=j[g];if(typeof f=="undefined"){continue}h[g]=f;if(!f&&h.removeAttribute){h.removeAttribute(g)}else{if(!f&&h.removeProperty){h.removeProperty(g)}}}};return e};baidu.fx.opacity=function(b,a){if(!(b=baidu.dom.g(b))){return null}a=baidu.object.extend({from:0,to:1},a||{});var d=b;var c=baidu.fx.create(d,baidu.object.extend({initialize:function(){baidu.dom.show(b);if(baidu.browser.ie){this.protect("filter")}else{this.protect("opacity");this.protect("KHTMLOpacity")}this.distance=this.to-this.from},render:function(e){var f=this.distance*e+this.from;if(!baidu.browser.ie){d.style.opacity=f;d.style.KHTMLOpacity=f}else{d.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity:"+Math.floor(f*100)+")"}}},a),"baidu.fx.opacity");return c.launch()};baidu.fx.fadeIn=function(b,a){if(!(b=baidu.dom.g(b))){return null}var c=baidu.fx.opacity(b,baidu.object.extend({from:0,to:1,restoreAfterFinish:true},a||{}));c._className="baidu.fx.fadeIn";return c};baidu.fx.fadeOut=function(b,a){if(!(b=baidu.dom.g(b))){return null}var c=baidu.fx.opacity(b,baidu.object.extend({from:1,to:0,restoreAfterFinish:true},a||{}));c.addEventListener("onafterfinish",function(){baidu.dom.hide(this.element)});c._className="baidu.fx.fadeOut";return c};baidu.fx.mask=function(c,a){if(!(c=baidu.dom.g(c))||baidu.dom.getStyle(c,"position")!="absolute"){return null}var g=c,b={};a=a||{};var f=/^(\d+px|\d?\d(\.\d+)?%|100%|left|center|right)(\s+(\d+px|\d?\d(\.\d+)?%|100%|top|center|bottom))?/i;!f.test(a.startOrigin)&&(a.startOrigin="0px 0px");var a=baidu.object.extend({restoreAfterFinish:true,from:0,to:1},a||{});var d=baidu.fx.create(g,baidu.object.extend({initialize:function(){g.style.display="";this.protect("clip");b.width=g.offsetWidth;b.height=g.offsetHeight;f.test(this.startOrigin);var k=RegExp["\x241"].toLowerCase(),j=RegExp["\x244"].toLowerCase(),i=this.element.offsetWidth,l=this.element.offsetHeight,h,e;if(/\d+%/.test(k)){h=parseInt(k,10)/100*i}else{if(/\d+px/.test(k)){h=parseInt(k)}else{if(k=="left"){h=0}else{if(k=="center"){h=i/2}else{if(k=="right"){h=i}}}}}if(!j){e=l/2}else{if(/\d+%/.test(j)){e=parseInt(j,10)/100*l}else{if(/\d+px/.test(j)){e=parseInt(j)}else{if(j=="top"){e=0}else{if(j=="center"){e=l/2}else{if(j=="bottom"){e=l}}}}}}b.x=h;b.y=e},render:function(k){var l=this.to*k+this.from*(1-k),j=b.y*(1-l)+"px ",i=b.x*(1-l)+"px ",h=b.x*(1-l)+b.width*l+"px ",e=b.y*(1-l)+b.height*l+"px ";g.style.clip="rect("+j+h+e+i+")"},finish:function(){if(this.to<this.from){g.style.display="none"}}},a),"baidu.fx.mask");return d.launch()};