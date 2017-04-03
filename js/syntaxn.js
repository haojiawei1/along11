/**
 * Created by 郝 on 2016/11/29.
 */
/*!
 代码显示插件
 */
!function(t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t:window&&(window.Syntaxy=t(window.jQuery||null))}(function(t){"function"!=typeof String.prototype.ltrim&&(String.prototype.ltrim=function(){return this.replace(/^[\s\uFEFF\xA0]+/g,"")}),"function"!=typeof String.prototype.rtrim&&(String.prototype.rtrim=function(){return this.replace(/[\s\uFEFF\xA0]+$/g,"")}),"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}),t&&t.fn&&!t.fn.syntaxy&&(t.fn.syntaxy=function(t){return this.each(function(){var i=new e(this,t);i.render()})});var e=function(t,e){this.target=null,this.reglist={},this.code="",this.error="",this.options={tagOpen:"«",tagSplit:"≈",tagClose:"»",tagName:"span",classPrefix:"stx-",codeTitle:"Source code",codeType:"",minHeight:"100px",maxHeight:"600px",isInline:!1,wordWrap:!1,startLine:1,debugLines:""},this.setTarget(t),this.setOptions(e),this.factory()};return e.prototype={constructor:e,setTarget:function(t){return"object"==typeof t&&(this.target=t,this.setCode(t.innerHTML||""),this.setOptions({codeTitle:this.toString(t.getAttribute("data-title"),this.options.codeTitle).trim(),codeType:this.toString(t.getAttribute("data-type"),this.options.codeType).trim(),minHeight:this.toString(t.getAttribute("data-min-height"),this.options.minHeight).trim(),maxHeight:this.toString(t.getAttribute("data-max-height"),this.options.maxHeight).trim(),isInline:this.toBoolean(t.getAttribute("data-inline"),this.options.isInline),wordWrap:this.toBoolean(t.getAttribute("data-wrap"),this.options.wordWrap),startLine:this.toNumeric(t.getAttribute("data-start"),this.options.startLine),debugLines:this.toString(t.getAttribute("data-debug"),this.options.debugLines).trim()})),this},setOptions:function(t){if("object"==typeof t)for(var e in t)t.hasOwnProperty(e)&&(this.options[e]=t[e]);return this},setCode:function(t){return this.code=("string"==typeof t?t:"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;|\u00a0/gi,"s").replace(/\t/g,"ssss").replace(/[\r]+/g,"").replace(/^[\n]+/,"").replace(/[\s\t\n\uFEFF\xA0]+$/,""),this},processCode:function(){this.error="";var t="";if(this.code)if(this.options.codeType)if(this.hasFilter(this.options.codeType))try{t=this.applyFilter(this.options.codeType,this.code).replace(/</g,"&lt;").replace(new RegExp(this.options.tagClose,"g"),"</"+this.options.tagName+">").replace(new RegExp(this.options.tagOpen+"([A-Z]+)"+this.options.tagSplit,"g"),function(t,e){return"<"+this.options.tagName+' class="'+this.toClass(e)+'">'}.bind(this))}catch(e){var i=String(e.name||"ScriptError"),s=String(e.description||e.message||"There has been a script error"),r=String(e.file||e.fileName||"n/a"),n=String(e.line||e.number||e.lineNumber||"n/a");this.error=i+": "+s+" - on file ("+r+"), line "+n+".",t=this.getCode(!0)}else this.error="The syntax type specified ("+this.options.codeType+") could not be found.",t=this.getCode(!0);else this.error="The syntax type for this container has not been specified.",t=this.getCode(!0);else this.error="This container does not have any code to be highlighted.",t="// No code available.";return t},getCode:function(t){return t===!0?this.code.replace(/</g,"&lt;"):this.code},hasError:function(){return!!this.error},getError:function(){return this.error},addFilter:function(t,e){return t=this.toString(t,"").replace(/[^\w]+/g,""),t&&"function"==typeof e&&(this.reglist[t]=e),this},hasFilter:function(t){return!!this.reglist.hasOwnProperty(t)},getFilter:function(t){return this.reglist.hasOwnProperty(t)?this.reglist[t]:function(t){return t}},applyFilter:function(t,e){var i=this.getFilter(t).bind(this);return i(e)},wrapClass:function(t,e,i,s){if(e=this.toString(e,""),i===!0&&(e=e.replace(new RegExp(this.options.tagOpen+"([A-Z]+)"+this.options.tagSplit,"g"),""),e=e.replace(new RegExp(this.options.tagClose,"g"),"")),s===!0){var r=[];return e.split("\n").forEach(function(e){e=e.replace(/^([\s]*)(.*?)([\s]*)$/,function(e,i,s,n){r.push(i+this.toTag(t,s)+n)}.bind(this))}.bind(this)),r.join("\n")}return this.toTag(t,e)},toClass:function(t){return t=this.toString(t,"").toLowerCase(),this.options.classPrefix+t},toTag:function(t,e){return t=this.toString(t,"").toUpperCase(),e=this.toString(e,""),this.options.tagOpen+t+this.options.tagSplit+e+this.options.tagClose},toString:function(t,e){return t=String(t||""),e=String(e||""),t||e},toNumeric:function(t,e){return t=/^(\-|\+){0,1}[0-9\.]+$/.test(t)?t:0,e=/^(\-|\+){0,1}[0-9\.]+$/.test(e)?e:0,t||e},toBoolean:function(t,e){return e="boolean"==typeof e?e:!1,/^(1|on|true|active|enabled?|Y)$/i.test(t)?!0:e},lineOutdent:function(t,e){return t=t||"",e=parseInt(e||0),""===t.trim()?"&nbsp;":e>0?t.replace(new RegExp("^\\s{"+e+"}"),""):t},lineClass:function(t,e){var i=t%2?"lighter":"darker",s=-1!==e.indexOf(String(t))?"flash":i;return this.options.classPrefix+s},toggleClass:function(t,e){if("object"==typeof t&&"string"==typeof e)if(t.classList&&t.classList.toggle)t.classList.toggle(e);else if(Array.prototype.indexOf){var i=String(t.className||"").trim().replace(/\s+/g," ").split(" "),s=i.indexOf(e);s>=0?i.splice(s,1):i.push(e),t.className=i.join(" ")}return this},render:function(){if(this.target){var t=this.processCode(),e=this.toClass.bind(this);if(this.target.style.margin="0",this.target.style.padding="0",this.target.style.border="0",this.target.style["text-align"]="left",this.options.isInline===!0)this.target.style.display="inline-block",this.target.innerHTML='<span class="'+e("wrap-inline")+'">'+t+"</span>";else{for(var i=t.search(/\S|$/)||0,s=t.split("\n"),r=0,n=s.length,a=this.options.debugLines.split(","),o=this.options.startLine,l=this.options.wordWrap?"wordwrap":"nowrap",p="",c="",h="",u=0;n>u;u++){var g=this.lineOutdent(s[u],i),d=this.lineClass(o,a);h+='<div class="'+e("line-wrap")+" "+d+'" data-line="'+o+'"><div class="'+e("line-code")+" "+e(l)+'">'+g+"</div></div>",o++,r++}this.options.minHeight&&(p+="min-height: "+this.options.minHeight+"; "),this.options.maxHeight&&(p+="max-height: "+this.options.maxHeight+"; "),this.error&&(c="!!!"),this.target.style.display="block",this.target.innerHTML='<div class="'+e("wrap")+'"><div class="'+e("header")+" "+e("clear")+'"><div class="'+e("left")+'">'+this.options.codeTitle+'</div><div class="'+e("right")+'"><button class="'+e("error-btn")+" "+e("important")+'" type="button" title="Process error">'+c+'</button> <button class="'+e("toggle-btn")+'" type="button" title="Toggle line numbers">☀</button> <span>'+r+" "+(1===r?"line":"lines")+'</span></div></div><div class="'+e("scroller")+'" style="'+p+'">'+h+"</div></div>",this.error&&this.target.querySelector("."+e("error-btn")).addEventListener("click",function(t){alert(this.error)}.bind(this)),this.target.querySelector("."+e("toggle-btn")).addEventListener("click",function(t){var i=this.target.querySelector("."+e("scroller"));this.toggleClass(i,e("nonums"))}.bind(this))}}},factory:function(){this.reglist={doctypes:function(t){return t=t.replace(/(<!DOCTYPE[\w\W]+?>)/g,this.wrapClass("doctype","$1")),t=t.replace(/(<\?xml[\w\W]+?>)/g,this.wrapClass("doctype","$1")),t=t.replace(/(<(\?|\%)(php|\=)?)/gi,this.wrapClass("doctype","$1")),t=t.replace(/((\%|\?)>)/g,this.wrapClass("doctype","$1")),t=t.replace(/(\#\!\/.*)/g,this.wrapClass("doctype","$1"))},constants:function(t){return t=t.replace(/(?=.*[A-Z])(\$?(\b(?![\d\#\'\"]+)([A-Z0-9\_]{2,})\b))(?![\:\'\"\(])/g,this.wrapClass("global","$1")),t=t.replace(/(?=.*[\w]+)([\_]{2}[\w]+)/g,this.wrapClass("global","$1"))},classes:function(t){return t=t.replace(/(?=.*[a-z])\b(([A-Z]+[a-z0-9]+)+)/g,this.wrapClass("class","$1"))},functions:function(t){return t=t.replace(/(^|\b[\w\-\!\*]+)(\s*\()/g,this.wrapClass("function","$1")+"$2")},numbers:function(t){return t=t.replace(/([^\w\-]+)([+-]?(\.?\d)+)(?![\w\'\"])/g,"$1"+this.wrapClass("numeric","$2")),t=t.replace(/(0x[a-fA-F0-9]+)/g,this.wrapClass("numeric","$1"))},operators:function(t){return t=t.replace(/([\&|\*|\+|\-|\.|\:|\/]{1}\=)(?![\n])/g,this.wrapClass("operator","$1")),t=t.replace(/([\<|\>|\!|\=]{1}[\=]{1,2})(?![\n])/g,this.wrapClass("operator","$1")),t=t.replace(/([\<|\>|\+|\-]{2,3})(?![\n])/g,this.wrapClass("operator","$1")),t=t.replace(/([\&|\|]{2})(?![\n])/g,this.wrapClass("operator","$1")),t=t.replace(/(([\-|\=]{1}>)|(<[\-|\=]{1}))(?![\n])/g,this.wrapClass("operator","$1")),t=t.replace(/([\s]+)\B([\<|\>|\&|\=|\%|\?|\:|\*|\+|\-|\^|\~|\/|\|]{1})(?=[\s]+)/g,"$1"+this.wrapClass("operator","$2"))},keywords:function(t){var e,i="var,let,const,static,public,private,protected,function,abstract,interface,return,yield,declare,then,if,else(if)?,els?if,foreach,while,switch,throws?,catch,finally,try,do,as,in,true,false,null,void,class,package,extends?,implements?,namespace,use,new,imports?,exports?,includes?(_once)?,requires?(_once)?,define,ifndef,with,super,from,continue,break,delete,case,global,instanceof,typeof,typedef,NaN,window,document,screen,top,module,goto,volatile,transient,char,parent,def,del,for,fi,except,is,exit,auto,not,or,xor,and,pass,print_?(f|r)?,echo,raise,enum,register,union,endif,endfor,endforeach,endwhile,lambda,long,int,float,double,bool,boolean,short,unsigned,signed,undefined,string,number,any,constructor,self,this,async,await,byte,checked,decimal,delegate,descending,dynamic,event,fixed,group,implicit,internal,into,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,select,uint,ulong,extern,inline,sizeof,struct,debugger,eval,get,set,Infinity,caller,die,dump,last,local,my,next,no,our,redo,sub,undef,unless,until,wantarray,all,extends,isnt,final,exposing,loop,of,off,on,throw,when,yes,exec,nonlocal,done,esac,using,assert,arguments,base,by,template,default,native,end";return i.split(",").forEach(function(i){e="keyword",e=/^(import|export|include|require|use|using|from|define|ifndef)/.test(i)?"import":e,e=/^(instanceof|typeof|typedef|and|xor|or|is|in|as)$/.test(i)?"operator":e,e=/^(window|document|screen|module|global|arguments|parent|self|this)$/.test(i)?"class":e,t=t.replace(new RegExp("(^|[^\\.|\\>|\\-|\\/])([\\$|\\#]?\\b("+i+")\\b)(?![\\=|\\(|\\:])","g"),function(t,i,s){return i+this.wrapClass(e,s,!0)}.bind(this))}.bind(this)),t},keys:function(t){return t=t.replace(/([\w\-]+)(([\s]+)?\:)(?=[\s]+)/g,this.wrapClass("key","$1")+"$2")},tags:function(t){return t.replace(/(<[^\!\?\%\#\=]\/?[^>]*>)/gi,function(t,e){var i="tag";return i=/^<\/?(style|link|script)/i.test(e)?"hook":i,i=/^<\/?(table|thead|tbody|tfoot|th|tr|td|tf|dd|dt|dl|colgroup|col|caption)/i.test(e)?"table":i,i=/^<\/?(form|fieldset|legend|label|optgroup|option|select|input|textarea|button|datalist|keygen|meter|output)/i.test(e)?"form":i,i=/^<\/?(img|canvas|audio|video|source|track|svg)/i.test(e)?"media":i,i=/^<\/?(i?frame|object|embed)/i.test(e)?"embed":i,this.wrapClass(i,e,!0,!0)}.bind(this))},comments:function(t){return t=t.replace(/(\/\*[\s\S]*?\*\/)/g,function(t,e){return this.wrapClass("comment",e,!0,!0)}.bind(this)),t=t.replace(/(^|[^\:])(\/\/.*)/g,function(t,e,i){return e+this.wrapClass("comment",i,!0)}.bind(this)),t=t.replace(/((\#+[\ ]+.*)|(\#+[\n]+))/g,function(t,e){return this.wrapClass("comment",e,!0)}.bind(this))},strings:function(t){return t=t.replace(/([\'|\"|\`]{3}[\s\S]*?[\'|\"|\`]{3})/g,function(t,e){return this.wrapClass("string",e,!0,!0)}.bind(this)),t=t.replace(/((?:\'[^\'\n\\]*(?:\\.[^\'\n\\]*)*\'))/g,function(t,e){return this.wrapClass("string",e,!0)}.bind(this)),t=t.replace(/((?:\"[^\"\n\\]*(?:\\.[^\"\n\\]*)*\"))/g,function(t,e){return this.wrapClass("string",e,!0)}.bind(this)),t=t.replace(/((?:\`[^\`\n\\]*(?:\\.[^\`\n\\]*)*\`))/g,function(t,e){return this.wrapClass("string",e,!0)}.bind(this))},markup:function(t){return t=t.replace(/(<style[^>]*>)([^<]*)(<\/style>)/g,function(t,e,i,s){return e+this.applyFilter("style",i)+s}.bind(this)),t=t.replace(/(?!.*src\=)(<script[^>]*>)([^<]*)(<\/script>)/g,function(t,e,i,s){return e+this.applyFilter("default",i)+s}.bind(this)),t=t.replace(/(<\?php|<\?=?|<\%\=?)([\w\W]+?)(\?>|\%>)/g,function(t,e,i,s){return e+this.applyFilter("default",i)+s}.bind(this)),t=t.replace(/(<!--[\s\S]*?-->)/g,function(t,e){return this.wrapClass("comment",e,!0,!0)}.bind(this)),t=t.replace(/(<!\[CDATA\[[\s\S]*?\]\]>)/g,function(t,e){return this.wrapClass("comment",e,!0,!0)}.bind(this)),t=this.applyFilter("doctypes",t),t=this.applyFilter("tags",t),t=this.applyFilter("strings",t)},style:function(t){return t=t.replace(/([^\{\}\s\;][^\{\}\;]*?)(?=\s*\{)/gi,function(t,e){return this.wrapClass("keyword",e,!1,!0)}.bind(this)),t=t.replace(/(\@[\w\-]+)/g,this.wrapClass("import","$1")),t=t.replace(/([\(|\:]\s*)(\#[a-fA-F0-9]+)/g,"$1"+this.wrapClass("value","$2")),t=t.replace(/([\(|\:]\s*)([\w\s\-]+)(?=[\;\s\n])/g,"$1"+this.wrapClass("value","$2")),t=t.replace(/(\$[\w\-]+)(?=[\;\,\s\n])/g,this.wrapClass("global","$1")),t=t.replace(/(\![a-z]+)(?=[\;\s\n])/gi,this.wrapClass("important","$1")),t=t.replace(/([^\w\#])([\+\-]?((\.?\d+)+)(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?)/g,"$1"+this.wrapClass("numeric","$2")),t=this.applyFilter("keys",t),t=this.applyFilter("functions",t),t=this.applyFilter("strings",t),t=this.applyFilter("comments",t)},terminal:function(t){return t=t.replace(/(^|[^\:])(\/\/\s+.*)/g,function(t,e,i){return e+this.wrapClass("comment",i,!0)}.bind(this)),t=t.replace(/(\$|\#)(\s+)([\w\-]+)/g,function(t,e,i,s){return this.wrapClass("important",e)+i+this.wrapClass("class",s)}.bind(this)),t=this.applyFilter("strings",t)},shell:function(t){return t=this.applyFilter("constants",t),t=this.applyFilter("doctypes",t),t=this.applyFilter("functions",t),t=this.applyFilter("numbers",t),t=this.applyFilter("keywords",t),t=this.applyFilter("operators",t),t=this.applyFilter("strings",t),t=t.replace(/([^\$\!\{\[\\])(\#+(?![\!]).*)/g,function(t,e,i){return e+this.wrapClass("comment",i,!0)}.bind(this))},object:function(t){return t=this.applyFilter("constants",t),t=this.applyFilter("classes",t),t=this.applyFilter("functions",t),t=this.applyFilter("numbers",t),t=this.applyFilter("keywords",t),t=this.applyFilter("keys",t),t=this.applyFilter("strings",t),t=this.applyFilter("comments",t)},json:function(t){return t=this.applyFilter("strings",t),t=this.applyFilter("comments",t)},sql:function(t){return t=this.applyFilter("constants",t),t=this.applyFilter("functions",t),t=this.applyFilter("numbers",t),t=this.applyFilter("operators",t),t=this.applyFilter("strings",t),t=this.applyFilter("comments",t),t=t.replace(/(\-\-.*)/gi,function(t,e){return this.wrapClass("comment",e,!0)}.bind(this))},"default":function(t){return t=this.applyFilter("constants",t),t=this.applyFilter("doctypes",t),t=this.applyFilter("classes",t),t=this.applyFilter("functions",t),t=this.applyFilter("numbers",t),t=this.applyFilter("keywords",t),t=this.applyFilter("operators",t),t=this.applyFilter("strings",t),t=this.applyFilter("comments",t)}}}},e});