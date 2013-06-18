/*baidu.ui.Dialog,baidu.ui.Dialog.Dialog$autoDispose,baidu.ui.Dialog.Dialog$button,baidu.ui.Dialog.Dialog$closeButton,baidu.ui.Dialog.Dialog$modal*/
baidu.ui.Dialog=baidu.ui.createUI(function(a){var b=this;b._content="initElement";b.content=b.content||null;b._contentText="initText";b.contentText=b.contentText||"";b._titleText="initText";b.titleText=b.titleText||""}).extend({uiType:"dialog",width:"",height:"",top:"auto",left:"auto",zIndex:1000,tplDOM:"<div id='#{id}' class='#{class}' style='position:relative'>#{title}#{content}#{footer}</div>",tplTitle:"<div id='#{id}' class='#{class}'><span id='#{inner-id}' class='#{inner-class}'>#{content}</span></div>",tplContent:"<div id='#{id}' class='#{class}' style='overflow:hidden; position:relative'>#{content}</div>",tplFooter:"<div id='#{id}' class='#{class}'></div>",isShown:function(){return baidu.ui.Dialog.instances[this.guid]=="show"},getString:function(){var c=this,a,e="title",d="title-inner",b="content",f="footer";return baidu.format(c.tplDOM,{id:c.getId(),"class":c.getClass(),title:baidu.format(c.tplTitle,{id:c.getId(e),"class":c.getClass(e),"inner-id":c.getId(d),"inner-class":c.getClass(d),content:c.titleText||""}),content:baidu.format(c.tplContent,{id:c.getId(b),"class":c.getClass(b),content:c.contentText||""}),footer:baidu.format(c.tplFooter,{id:c.getId(f),"class":c.getClass(f)})})},render:function(){var b=this,a;if(b.getMain()){return}a=b.renderMain();a.innerHTML=b.getString();b._update();b._updatePosition();baidu.dom.setStyles(b.getMain(),{position:"absolute",zIndex:b.zIndex,marginLeft:"-100000px"});b.windowResizeHandler=b.getWindowResizeHandler();b.on(window,"resize",b.windowResizeHandler);b.dispatchEvent("onload");return a},_update:function(b){var d=this,c=d.getContent(),b=b||{},e=d.getTitleInner(),a=false;if(typeof b.titleText!="undefined"){e.innerHTML=b.titleText;d.titleText=d._titleText=b.titleText}else{if(d.titleText!=d._titleText){e.innerHTML=d.titleText;d._titleText=d.titleText}}if(typeof b.content!="undefined"){c.innerHTML="";d.content=b.content;if(b.content!==null){c.appendChild(b.content);d.content=d._content=c.firstChild;d.contentText=d._contentText=c.innerHTML;return}a=true}else{if(d.content!==d._content){c.innerHTML="";if(d.content!==null){c.appendChild(d.content);d.content=d._content=c.firstChild;d.contentText=d._contentText=c.innerHTML;return}a=true}}if(typeof b.contentText!="undefined"){c.innerHTML=b.contentText;d.contentText=d._contentText=b.contentText;d.content=d._content=c.firstChild}else{if((d.contentText!=d._contentText)||a){c.innerHTML=d.contentText;d._contentText=d.contentText;d.content=d._content=c.firstChild}}delete (b.content);delete (b.contentText);delete (b.titleText);baidu.extend(d,b)},getWindowResizeHandler:function(){var a=this;return function(){a._updatePosition()}},open:function(){var a=this;a._updatePosition();a.getMain().style.marginLeft="auto";baidu.ui.Dialog.instances[a.guid]="show";a.dispatchEvent("onopen")},close:function(){var a=this;if(a.dispatchEvent("onbeforeclose")){a.getMain().style.marginLeft="-100000px";baidu.ui.Dialog.instances[a.guid]="hide";a.dispatchEvent("onclose")}},update:function(a){var b=this;b._update(a);b._updatePosition();b.dispatchEvent("onupdate")},_getBodyOffset:function(){var f=this,b,c=f.getBody(),e=f.getContent(),h=f.getTitle(),i=f.getFooter();b={width:0,height:0};function d(l,k){var j=parseFloat(baidu.getStyle(l,k));j=isNaN(j)?0:j;j=baidu.lang.isNumber(j)?j:0;return j}baidu.each(["marginLeft","marginRight"],function(k,j){b.width+=d(e,k)});b.height+=h.offsetHeight+d(h,"marginTop");b.height+=i.offsetHeight+d(i,"marginBottom");var a=d(e,"marginTop"),g=d(h,"marginBottom");b.height+=a>=g?a:g;a=d(i,"marginTop"),g=d(e,"marginBottom");b.height+=a>=g?a:g;return b},_updatePosition:function(){var g=this,d,h="",i="",a="",c="",f=g.getContent(),e=g.getBody(),b,j;b=parseFloat(g.width);j=parseFloat(g.height);d=g._getBodyOffset();baidu.lang.isNumber(b)&&baidu.dom.setOuterWidth(f,b);baidu.lang.isNumber(j)&&baidu.dom.setOuterHeight(f,j);d.width+=f.offsetWidth;d.height+=f.offsetHeight;g.width&&baidu.setStyle(e,"width",d.width);g.height&&baidu.setStyle(e,"height",d.height);if((g.left&&g.left!="auto")||(g.right&&g.right!="auto")){c=g.left||"";i=g.right||""}else{c=Math.max((baidu.page.getViewWidth()-parseFloat(g.getMain().offsetWidth))/2+baidu.page.getScrollLeft(),0)}if((g.top&&g.top!="auto")||(g.bottom&&g.bottom!="auto")){h=g.top||"";a=g.bottom||""}else{h=Math.max((baidu.page.getViewHeight()-parseFloat(g.getMain().offsetHeight))/2+baidu.page.getScrollTop(),0)}baidu.dom.setStyles(g.getMain(),{top:h,right:i,bottom:a,left:c})},getTitle:function(){return baidu.g(this.getId("title"))},getTitleInner:function(){return baidu.g(this.getId("title-inner"))},getContent:function(){return baidu.g(this.getId("content"))},getFooter:function(){return baidu.g(this.getId("footer"))},dispose:function(){var a=this;delete baidu.ui.Dialog.instances[a.guid];a.dispatchEvent("dispose");baidu.dom.remove(a.getMain());baidu.lang.Class.prototype.dispose.call(a)}});baidu.ui.Dialog.instances=baidu.ui.Dialog.instances||{};baidu.extend(baidu.ui.Dialog.prototype,{autoDispose:true});baidu.ui.Dialog.register(function(a){if(a.autoDispose){a.addEventListener("onload",function(){if(typeof a.autoDispose=="undefined"||a.autoDispose){a.addEventListener("onclose",function(){a.dispose()})}})}});baidu.ui=baidu.ui||{version:"1.3.9"};baidu.ui.behavior=baidu.ui.behavior||{};(function(){var a=baidu.ui.behavior.statable=function(){var b=this;b.addEventListeners("ondisable,onenable",function(e,c){var d,f;c=c||{};elementId=(c.element||b.getMain()).id;f=c.group;if(e.type=="ondisable"&&!b.getState(elementId,f)["disabled"]){b.removeState("press",elementId,f);b.removeState("hover",elementId,f);b.setState("disabled",elementId,f)}else{if(e.type=="onenable"&&b.getState(elementId,f)["disabled"]){b.removeState("disabled",elementId,f)}}})};a._states={};a._allStates=["hover","press","disabled"];a._allEventsName=["mouseover","mouseout","mousedown","mouseup"];a._eventsHandler={mouseover:function(d,c){var b=this;if(!b.getState(d,c)["disabled"]){b.setState("hover",d,c);return true}},mouseout:function(d,c){var b=this;if(!b.getState(d,c)["disabled"]){b.removeState("hover",d,c);b.removeState("press",d,c);return true}},mousedown:function(d,c){var b=this;if(!b.getState(d,c)["disabled"]){b.setState("press",d,c);return true}},mouseup:function(d,c){var b=this;if(!b.getState(d,c)["disabled"]){b.removeState("press",d,c);return true}}};a._getStateHandlerString=function(h,f){var g=this,e=0,b=g._allEventsName.length,c=[],d;if(typeof h=="undefined"){h=f=""}for(;e<b;e++){d=g._allEventsName[e];c[e]="on"+d+'="'+g.getCallRef()+"._fireEvent('"+d+"', '"+h+"', '"+f+"', event)\""}return c.join(" ")};a._fireEvent=function(c,g,b,f){var d=this,h=d.getId(g+b);if(d._eventsHandler[c].call(d,h,g)){d.dispatchEvent(c,{element:h,group:g,key:b,DOMEvent:f})}};a.addState=function(e,b,c){var d=this;d._allStates.push(e);if(b){d._allEventsName.push(b);if(!c){c=function(){return true}}d._eventsHandler[b]=c}};a.getState=function(b,e){var d=this,c;e=e?e+"-":"";b=b?b:d.getId();c=d._states[e+b];return c?c:{}};a.setState=function(e,b,f){var d=this,g,c;f=f?f+"-":"";b=b?b:d.getId();g=f+b;d._states[g]=d._states[g]||{};c=d._states[g][e];if(!c){d._states[g][e]=1;baidu.addClass(b,d.getClass(f+e))}};a.removeState=function(d,b,e){var c=this,f;e=e?e+"-":"";b=b?b:c.getId();f=e+b;if(c._states[f]){c._states[f][d]=0;baidu.removeClass(b,c.getClass(e+d))}}})();baidu.ui.Button=baidu.ui.createUI(new Function).extend({uiType:"button",tplBody:'<div id="#{id}" #{statable} class="#{class}">#{content}</div>',disabled:false,statable:true,_getString:function(){var a=this;return baidu.format(a.tplBody,{id:a.getId(),statable:a._getStateHandlerString(),"class":a.getClass(),content:a.content})},render:function(c){var b=this,a;b.addState("click","click");baidu.dom.insertHTML(b.renderMain(c),"beforeEnd",b._getString());a=baidu.g(c).lastChild;if(b.title){a.title=b.title}b.disabled&&b.setState("disabled");b.dispatchEvent("onload")},isDisabled:function(){var a=this,b=a.getId();return a.getState()["disabled"]},dispose:function(){var b=this,a=b.getBody();b.dispatchEvent("dispose");baidu.each(b._allEventsName,function(d,c){a["on"+d]=null});baidu.dom.remove(a);b.dispatchEvent("ondispose");baidu.lang.Class.prototype.dispose.call(b)},disable:function(){var b=this,a=b.getBody();b.dispatchEvent("ondisable",{element:a})},enable:function(){var a=this;body=a.getBody();a.dispatchEvent("onenable",{element:body})},fire:function(a,c){var b=this,a=a.toLowerCase();if(b.getState()["disabled"]){return}b._fireEvent(a,null,null,c)},update:function(a){var b=this;baidu.extend(b,a);a.content&&(b.getBody().innerHTML=a.content);b.dispatchEvent("onupdate")}});baidu.i18n=baidu.i18n||{};baidu.i18n.string=baidu.i18n.string||{trim:function(c,a){var b=baidu.i18n.cultures[a||baidu.i18n.currentLocale].whitespace;return String(c).replace(b,"")},translation:function(c,a){var b=baidu.i18n.cultures[a||baidu.i18n.currentLocale].language;return b[c]||""}};baidu.i18n.cultures=baidu.i18n.cultures||{};baidu.i18n.cultures["zh-CN"]=baidu.object.extend(baidu.i18n.cultures["zh-CN"]||{},{calendar:{dateFormat:"yyyy-MM-dd",titleNames:"#{yyyy}年&nbsp;#{MM}月",monthNames:["一","二","三","四","五","六","七","八","九","十","十一","十二"],dayNames:{mon:"一",tue:"二",wed:"三",thu:"四",fri:"五",sat:"六",sun:"日"}},timeZone:8,whitespace:new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g"),number:{group:",",groupLength:3,decimal:".",positive:"",negative:"-",_format:function(b,a){return baidu.i18n.number._format(b,{group:this.group,groupLength:this.groupLength,decimal:this.decimal,symbol:a?this.negative:this.positive})}},currency:{symbol:"￥"},language:{ok:"确定",cancel:"取消",signin:"注册",signup:"登录"}});baidu.i18n.currentLocale=baidu.i18n.currentLocale||"zh-CN";baidu.extend(baidu.ui.Dialog.prototype,{createButton:function(c,a){var d=this;baidu.extend(c,{classPrefix:d.classPrefix+"-"+a,skin:d.skin?d.skin+"-"+a:"",element:d.getFooter(),autoRender:true,parent:d});var b=new baidu.ui.Button(c);d.buttonInstances[a]=b},removeButton:function(a){var c=this,b=c.buttonInstances[a];if(b){b.dispose();delete (c.buttonInstances[a]);delete (c.buttons[a])}}});baidu.ui.Dialog.register(function(d){d.buttonInstances={};d.language=d.language||"zh-CN";var b,c,a={},e=baidu.i18n.cultures[d.language].language;b={content:e.ok,onclick:function(){var g=this,f=g.getParent();f.dispatchEvent("onaccept")&&f.close()}};c={content:e.cancel,onclick:function(){var g=this,f=g.getParent();f.dispatchEvent("oncancel")&&f.close()}};d.addEventListener("onload",function(){switch(d.type){case"alert":d.submitOnEnter=d.submitOnEnter||true;a={accept:b};break;case"confirm":d.submitOnEnter=d.submitOnEnter||true;a={accept:b,cancel:c};break;default:}d.buttons=baidu.extend(a,d.buttons||{});baidu.object.each(d.buttons,function(g,f){d.createButton(g,f)});d.submitOnEnter&&d.addEventListener("onenter",function(f){d.buttonInstances.accept.fire("click",f)})});d.addEventListener("ondispose",function(){baidu.object.each(d.buttons,function(g,f){d.removeButton(f)})});d.addEventListener("onupdate",function(){baidu.object.each(d.buttons,function(g,f){d.buttonInstances[f]?d.buttonInstances[f].update(g):d.createButton(g,f)})})});baidu.extend(baidu.ui.Dialog.prototype,{closeText:"",closeButton:true});baidu.ui.Dialog.register(function(a){a.closeButton&&a.addEventListener("onload",function(){var b=new baidu.ui.Button({parent:a,classPrefix:a.classPrefix+"-close",skin:a.skin?a.skin+"-close":"",onclick:function(){a.close()},onmousedown:function(c){baidu.event.stopPropagation(c.DOMEvent)},element:a.getTitle(),autoRender:true});a.closeButtonInstance=b;a.addEventListener("ondispose",function(){b.dispose()})})});baidu.ui.Modal=baidu.ui.createUI(function(b){var c=this,a=(b&&b.container)?baidu.g(b.container):null;!a&&(a=document.body);if(!a.id){a.id=c.getId("container")}c.containerId=a.id;c.styles={color:"#000000",opacity:0.6,zIndex:1000}}).extend({uiType:"modal",_showing:false,getContainer:function(){var a=this;return baidu.g(a.containerId)},render:function(){var f=this,b,d,e,a,g=f.containerId,c=baidu.g(f.containerId);if(b=baidu.ui.Modal.collection[g]){f.mainId=b.mainId;a=f.getMain()}else{a=f.renderMain();if(c!==document.body){c.appendChild(a)}else{d=baidu.dom.fixable(a,{autofix:false,vertival:"top",horizontal:"left",offset:{x:0,y:0}})}baidu.ui.Modal.collection[g]={mainId:f.mainId,instance:[],flash:{},fixableInstance:d}}f.dispatchEvent("onload")},show:function(i){var g=this,b=g.getContainer(),e=g.getMain(),f=g.containerId,c=baidu.ui.Modal.collection[f],a=c.fixableInstance,d=c.instance.length,h;if(g._showing){return}if(d>0){h=baidu.lang.instance(c.instance[d-1]);h&&h._removeHandler()}i=i||{};g._show(i.styles||{});if(a){a.render()}e.style.display="block";c.flash[g.guid]=g._hideFlash();c.instance.push(g.guid);g._showing=true;g.dispatchEvent("onshow")},_show:function(b){var a=this;a._getModalStyles(b||{});a._update();if(a.getContainer()===document.body&&baidu.browser.ie&&baidu.browser.ie<=7){a.windowHandler=a.getWindowHandle();baidu.on(window,"resize",a.windowHandler)}},hide:function(){var a=this;a._hide();a.dispatchEvent("onhide")},_hide:function(){var g=this,b=g.containerId,h=baidu.ui.Modal.collection[b],c=h.flash[g.guid],a=g.getMain(),f=h.instance.length,e;if(!g._showing){return}for(var d=0;d<f;d++){if(h.instance[d]==g.guid){h.instance.splice(d,1);break}}f=h.instance.length;if(d==f){g._removeHandler();if(f>0){e=baidu.lang.instance(h.instance[f-1]);e&&e._show()}else{a.style.display="none"}g._restoreFlash(c)}else{e=baidu.lang.instance(h.instance[f-1]);h.flash[e.guid]=h.flash[e.guid].concat(c)}h.flash[g.guid]=[];g._showing=false},_removeHandler:function(){var a=this;if(a.getContainer()===document.body&&baidu.browser.ie&&baidu.browser.ie<=7){baidu.un(window,"resize",a.windowHandler)}},getWindowHandle:function(){var b=this,a=b.getMain();return function(){baidu.setStyles(a,{width:baidu.page.getViewWidth(),height:baidu.page.getViewHeight()});if(b.getContainer()===document.body&&baidu.browser.ie&&baidu.browser.ie<=7){window.top!==window.self&&setTimeout(function(){b._getModalStyles({});b._update()},16)}}},update:function(b){b=b||{};var c=this,a=c.getMain(),d=baidu.ui.Modal.collection[c.containerId];b=b||{};baidu.extend(c,b);c._getModalStyles(b.styles||{});c._update();delete (b.styles);baidu.extend(c,b);c.dispatchEvent("onupdate")},_update:function(){var b=this,a=b.getMain();baidu.dom.setStyles(a,b.styles)},_getModalStyles:function(f){var e=this,a=e.getMain(),b=e.getContainer(),c,h,d;function g(k,j){var i=parseInt(baidu.getStyle(k,j));i=isNaN(i)?0:i;i=baidu.lang.isNumber(i)?i:0;return i}if(b!==document.body){f.width=b.offsetWidth;f.height=b.offsetHeight;if(baidu.getStyle(b,"position")=="static"){d=a.offsetParent||document.body;c=baidu.dom.getPosition(d);h=baidu.dom.getPosition(b);f.top=h.top-c.top+g(d,"marginTop");f.left=h.left-c.left+g(d,"marginLeft")}}else{if(baidu.browser.ie>7||!baidu.browser.ie){f.width="100%";f.height="100%"}else{f.width=baidu.page.getViewWidth();f.height=baidu.page.getViewHeight()}}baidu.extend(e.styles,f);e.styles.backgroundColor=e.styles.color||e.styles.backgroundColor;delete (e.styles.color)},_hideFlash:function(){var c=this,b=c.getContainer(),d=b.getElementsByTagName("object"),a=[];baidu.each(d,function(f){var e=true;if(baidu.dom.getAncestorBy(f,function(g){if(baidu.getStyle(g,"zIndex")>c.styles.zIndex){return true}return false})){return}baidu.each(baidu.dom.children(f),function(g){if(baidu.getAttr(g,"name")=="wmode"&&baidu.getAttr(g,"value")!="window"){e=false}});if(e){a.push([f,baidu.getStyle(f,"visibility")]);f.style.visibility="hidden"}});return a},_restoreFlash:function(a){baidu.each(a,function(b){if(b[0]!=null){b[0].style.visibility=b[1]}})},dispose:function(){var a=this;a._hide();a.dispatchEvent("ondispose");baidu.lang.Class.prototype.dispose.call(a)}});baidu.ui.Modal.collection={};(function(){var a=baidu.ui.behavior.coverable=function(){};a.Coverable_isShowing=false;a.Coverable_iframe;a.Coverable_container;a.Coverable_iframeContainer;a.Coverable_show=function(){var h=this;if(h.Coverable_iframe){h.Coverable_update();baidu.setStyle(h.Coverable_iframe,"display","block");return}var f=h.coverableOptions||{},c=h.Coverable_container=f.container||h.getMain(),e=f.opacity||"0",d=f.color||"",g=h.Coverable_iframe=document.createElement("iframe"),b=h.Coverable_iframeContainer=document.createElement("div");baidu.dom.children(c).length>0?baidu.dom.insertBefore(b,c.firstChild):c.appendChild(b);baidu.setStyles(b,{position:"absolute",top:"0px",left:"0px"});baidu.dom.setBorderBoxSize(b,{width:c.offsetWidth,height:c.offsetHeight});baidu.dom.setBorderBoxSize(g,{width:b.offsetWidth});baidu.dom.setStyles(g,{zIndex:-1,display:"block",border:0,backgroundColor:d,filter:"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity="+e+")"});b.appendChild(g);g.src="javascript:void(0)";g.frameBorder="0";g.scrolling="no";g.height="97%";h.Coverable_isShowing=true};a.Coverable_hide=function(){var c=this,b=c.Coverable_iframe;if(!c.Coverable_isShowing){return}baidu.setStyle(b,"display","none");c.Coverable_isShowing=false};a.Coverable_update=function(d){var f=this,d=d||{},c=f.Coverable_container,b=f.Coverable_iframeContainer,e=f.Coverable_iframe;baidu.dom.setBorderBoxSize(b,{width:c.offsetWidth,height:c.offsetHeight});baidu.dom.setBorderBoxSize(e,baidu.extend({width:baidu.getStyle(b,"width")},d))}})();baidu.extend(baidu.ui.Modal.prototype,{coverable:true,coverableOptions:{}});baidu.ui.Modal.register(function(a){if(a.coverable){if(!baidu.browser.isWebkit&&!baidu.browser.isGecko){a.addEventListener("onload",function(){a.Coverable_show()});a.addEventListeners("onshow,onupdate",function(){a.Coverable_update()});a.addEventListener("onhide",function(){a.Coverable_hide()})}}});baidu.extend(baidu.ui.Dialog.prototype,{modal:true,modalColor:"#000000",modalOpacity:0.4,hideModal:function(){var a=this;(a.modal&&a.modalInstance)&&a.modalInstance.hide()}});baidu.ui.Dialog.register(function(a){if(a.modal){a.addEventListener("onopen",function(){if(!a.modalInstance){a.modalInstance=new baidu.ui.Modal({autoRender:true})}a.modalInstance.show({targetUI:a,styles:{color:a.modalColor,opacity:a.modalOpacity,zIndex:a.modalZIndex?a.modalZIndex:a.zIndex-1}})});a.addEventListener("onclose",a.hideModal);a.addEventListener("ondispose",a.hideModal)}});

baidu.dom.fixable = function(element, options){

    var target  = baidu.g(element),
        isUnderIE7 = baidu.browser.ie && baidu.browser.ie <= 7 ? true : false,
        vertival = options.vertival || 'top',
        horizontal = options.horizontal || 'left',
        autofix = typeof options.autofix != 'undefined' ? options.autofix : true,
        origPos,offset,isRender = false,
        onrender = options.onrender || new Function(),
        onupdate = options.onupdate || new Function(),
        onrelease = options.onrelease || new Function();

    if(!target) return;

    //获取target原始值
    origPos = _getOriginalStyle();
    //设置offset值
    offset = {
        y: isUnderIE7 ? (origPos.position == "static" ? baidu.dom.getPosition(target).top :  baidu.dom.getPosition(target).top - baidu.dom.getPosition(target.parentNode).top) : target.offsetTop,
        x: isUnderIE7 ? (origPos.position == "static" ? baidu.dom.getPosition(target).left :  baidu.dom.getPosition(target).left - baidu.dom.getPosition(target.parentNode).left) : target.offsetLeft
    };
    baidu.extend(offset, options.offset || {});

    autofix && render();
   
    function _convert(){
        return {
            top : vertival == "top" ? offset.y : baidu.page.getViewHeight() - offset.y - origPos.height,
            left: horizontal == "left" ? offset.x : baidu.page.getViewWidth() - offset.x - origPos.width
        };
    }

    /**
     * 
     */
    function _handleOnMove(){
        var p = _convert(); 
        
        target.style.setExpression("left","eval((document.body.scrollLeft || document.documentElement.scrollLeft) + " + p.left + ") + 'px'");
        target.style.setExpression("top", "eval((document.body.scrollTop || document.documentElement.scrollTop) + " + p.top + ") + 'px'");
    }

    /**
     * 返回target原始position值
     * @return {Object}
     */
    function _getOriginalStyle(){
        var result = {
            position: baidu.getStyle(target,"position"),
            height: function(){
                var h = baidu.getStyle(target,"height");
                return (h != "auto") ? (/\d+/.exec(h)[0]) : target.offsetHeight;
            }(),
            width: function(){			
                var w = baidu.getStyle(target,"width");
                return (w != "auto") ? (/\d+/.exec(w)[0]) : target.offsetWidth;
            }()
        };

        _getValue('top', result);
        _getValue('left', result);
        _getValue('bottom', result);
        _getValue('right', result);
        
        return result;
    }

    function _getValue(position, options){
        var result;

        if(options.position == 'static'){
            options[position] = '';   
        }else{
            result = baidu.getStyle(target, position);
            if(result == 'auto' || result == '0px' ){
                options[position] = '';
            }else{
                options[position] = result;
            }
        }
    }

    function render(){
        if(isRender) return;

        baidu.setStyles(target, {top:'', left:'', bottom:'', right:''});
        
        if(!isUnderIE7){
            var style = {position:"fixed"};
            style[vertival == "top" ? "top" : "bottom"] = offset.y + "px";
            style[horizontal == "left" ? "left" : "right"] = offset.x + "px";

            baidu.setStyles(target, style);
        }else{
            baidu.setStyle(target,"position","absolute");
            _handleOnMove();
        }

        onrender();
        isRender = true;
    }

    function release(){
       if(!isRender) return;

       var style = {
           position: origPos.position,
           left: origPos.left == '' ? 'auto' : origPos.left,
           top: origPos.top == '' ? 'auto' : origPos.top,
           bottom: origPos.bottom == '' ? 'auto' : origPos.bottom,
           right: origPos.right == '' ?  'auto' : origPos.right
       };

        if(isUnderIE7){
            target.style.removeExpression("left");
            target.style.removeExpression("top");
        }
        baidu.setStyles(target, style);

        onrelease();
        isRender = false;
    }

    function update(options){
        if(!options) return;

        //更新事件
        onrender = options.onrender || onrender;
        onupdate = options.onupdate || onupdate;
        onrelease = options.onrelease || onrelease;
        
        //更新设置
        vertival = options.vertival || 'top';
        horizontal = options.horizontal || 'left';

        //更新offset
        baidu.extend(offset, options.offset || {});

        onupdate();
    }

    return {render: render, update: update, release:release};
};