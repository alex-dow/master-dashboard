(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{103:function(t,e,n){"use strict";const r=n(4),i=function(t,e){const n={};if(!(t.child&&!r.isEmptyObject(t.child)||t.attrsMap&&!r.isEmptyObject(t.attrsMap)))return r.isExist(t.val)?t.val:"";r.isExist(t.val)&&("string"!=typeof t.val||""!==t.val&&t.val!==e.cdataPositionChar)&&("strict"===e.arrayMode?n[e.textNodeName]=[t.val]:n[e.textNodeName]=t.val),r.merge(n,t.attrsMap,e.arrayMode);const a=Object.keys(t.child);for(let r=0;r<a.length;r++){var s=a[r];if(t.child[s]&&t.child[s].length>1)for(var o in n[s]=[],t.child[s])n[s].push(i(t.child[s][o],e));else if(!0===e.arrayMode){const r=i(t.child[s][0],e);n[s]="object"==typeof r?[r]:r}else"strict"===e.arrayMode?n[s]=[i(t.child[s][0],e)]:n[s]=i(t.child[s][0],e)}return n};e.convertToJson=i},104:function(t,e,n){"use strict";t.exports=function(t,e,n){this.tagname=t,this.parent=e,this.child={},this.attrsMap={},this.val=n,this.addChild=function(t){Array.isArray(this.child[t.tagname])?this.child[t.tagname].push(t):this.child[t.tagname]=[t]}}},105:function(t,e,n){"use strict";const r=n(4),i={allowBooleanAttributes:!1,localeRange:"a-zA-Z"},a=["allowBooleanAttributes","localeRange"];function s(t,e){for(var n=e;e<t.length;e++)if("?"!=t[e]&&" "!=t[e]);else{var r=t.substr(n,e-n);if(e>5&&"xml"===r)return f("InvalidXml","XML declaration allowed only at the start of the document.",m(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function o(t,e){if(t.length>e+5&&"-"===t[e+1]&&"-"===t[e+2]){for(e+=3;e<t.length;e++)if("-"===t[e]&&"-"===t[e+1]&&">"===t[e+2]){e+=2;break}}else if(t.length>e+8&&"D"===t[e+1]&&"O"===t[e+2]&&"C"===t[e+3]&&"T"===t[e+4]&&"Y"===t[e+5]&&"P"===t[e+6]&&"E"===t[e+7]){let n=1;for(e+=8;e<t.length;e++)if("<"===t[e])n++;else if(">"===t[e]&&(n--,0===n))break}else if(t.length>e+9&&"["===t[e+1]&&"C"===t[e+2]&&"D"===t[e+3]&&"A"===t[e+4]&&"T"===t[e+5]&&"A"===t[e+6]&&"["===t[e+7])for(e+=8;e<t.length;e++)if("]"===t[e]&&"]"===t[e+1]&&">"===t[e+2]){e+=2;break}return e}e.validate=function(t,e){if(e=r.buildOptions(e,i,a),new RegExp(`[${e.localeRange}]`).test("<#$'\"\\/:0"))return f("InvalidOptions","Invalid localeRange",1);const n=[];let l=!1,u=!1;"\ufeff"===t[0]&&(t=t.substr(1));const d=new RegExp(`^[${e.localeRange}_][${e.localeRange}0-9\\-\\.:]*$`),g=new RegExp(`^([${e.localeRange}_])[${e.localeRange}0-9\\.\\-_:]*$`);for(let r=0;r<t.length;r++){if("<"!==t[r]){if(" "===t[r]||"\t"===t[r]||"\n"===t[r]||"\r"===t[r])continue;return f("InvalidChar",`char '${t[r]}' is not expected.`,m(t,r))}if(r++,"?"===t[r]){if(r=s(t,++r),r.err)return r}else{if("!"===t[r]){r=o(t,r);continue}{let i=!1;"/"===t[r]&&(i=!0,r++);let a="";for(;r<t.length&&">"!==t[r]&&" "!==t[r]&&"\t"!==t[r]&&"\n"!==t[r]&&"\r"!==t[r];r++)a+=t[r];if(a=a.trim(),"/"===a[a.length-1]&&(a=a.substring(0,a.length-1),r--),!p(a,g)){let e;return e=0===a.trim().length?"There is an unnecessary space between tag name and backward slash '</ ..'.":`Tag '${a}' is an invalid name.`,f("InvalidTag",e,m(t,r))}const s=c(t,r);if(!1===s)return f("InvalidAttr",`Attributes for '${a}' have open quote.`,m(t,r));let b=s.value;if(r=s.index,"/"===b[b.length-1]){b=b.substring(0,b.length-1);const n=h(b,e,d);if(!0!==n)return f(n.err.code,n.err.msg,m(t,r-b.length+n.err.line));l=!0}else if(i){if(!s.tagClosed)return f("InvalidTag",`Closing tag '${a}' doesn't have proper closing.`,m(t,r));if(b.trim().length>0)return f("InvalidTag",`Closing tag '${a}' can't have attributes or invalid starting.`,m(t,r));{const e=n.pop();if(a!==e)return f("InvalidTag",`Closing tag '${e}' is expected inplace of '${a}'.`,m(t,r));0==n.length&&(u=!0)}}else{const i=h(b,e,d);if(!0!==i)return f(i.err.code,i.err.msg,m(t,r-b.length+i.err.line));if(!0===u)return f("InvalidXml","Multiple possible root nodes found.",m(t,r));n.push(a),l=!0}for(r++;r<t.length;r++)if("<"===t[r]){if("!"===t[r+1]){r++,r=o(t,r);continue}break}"<"===t[r]&&r--}}}return l?!(n.length>0)||f("InvalidXml",`Invalid '${JSON.stringify(n,null,4).replace(/\r?\n/g,"")}' found.`,1):f("InvalidXml","Start tag expected.",1)};var l='"',u="'";function c(t,e){let n="",r="",i=!1;for(;e<t.length;e++){if(t[e]===l||t[e]===u)if(""===r)r=t[e];else{if(r!==t[e])continue;r=""}else if(">"===t[e]&&""===r){i=!0;break}n+=t[e]}return""===r&&{value:n,index:e,tagClosed:i}}const d=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function h(t,e,n){const i=r.getAllMatches(t,d),a={};for(let r=0;r<i.length;r++){if(0===i[r][1].length)return f("InvalidAttr",`Attribute '${i[r][2]}' has no space in starting.`,b(t,i[r][0]));if(void 0===i[r][3]&&!e.allowBooleanAttributes)return f("InvalidAttr",`boolean attribute '${i[r][2]}' is not allowed.`,b(t,i[r][0]));const s=i[r][2];if(!g(s,n))return f("InvalidAttr",`Attribute '${s}' is an invalid name.`,b(t,i[r][0]));if(a.hasOwnProperty(s))return f("InvalidAttr",`Attribute '${s}' is repeated.`,b(t,i[r][0]));a[s]=1}return!0}function f(t,e,n){return{err:{code:t,msg:e,line:n}}}function g(t,e){return r.doesMatch(t,e)}function p(t,e){return!r.doesNotMatch(t,e)}function m(t,e){return t.substring(0,e).split(/\r?\n/).length}function b(t,e){return t.indexOf(e)+e.length}},106:function(t,e,n){"use strict";const r=function(t){return String.fromCharCode(t)},i={nilChar:r(176),missingChar:r(201),nilPremitive:r(175),missingPremitive:r(200),emptyChar:r(178),emptyValue:r(177),boundryChar:r(179),objStart:r(198),arrStart:r(204),arrayEnd:r(185)},a=[i.nilChar,i.nilPremitive,i.missingChar,i.missingPremitive,i.boundryChar,i.emptyChar,i.emptyValue,i.arrayEnd,i.objStart,i.arrStart],s=function(t,e,n){if("string"==typeof e)return t&&t[0]&&void 0!==t[0].val?o(t[0].val,e):o(t,e);{const a=void 0===(r=t)?i.missingChar:null===r?i.nilChar:!(r.child&&0===Object.keys(r.child).length&&(!r.attrsMap||0===Object.keys(r.attrsMap).length))||i.emptyChar;if(!0===a){let r="";if(Array.isArray(e)){r+=i.arrStart;const a=e[0],u=t.length;if("string"==typeof a)for(let e=0;e<u;e++){const n=o(t[e].val,a);r=l(r,n)}else for(let e=0;e<u;e++){const i=s(t[e],a,n);r=l(r,i)}r+=i.arrayEnd}else{r+=i.objStart;const a=Object.keys(e);Array.isArray(t)&&(t=t[0]);for(let i in a){const o=a[i];let u;u=!n.ignoreAttributes&&t.attrsMap&&t.attrsMap[o]?s(t.attrsMap[o],e[o],n):o===n.textNodeName?s(t.val,e[o],n):s(t.child[o],e[o],n),r=l(r,u)}}return r}return a}var r},o=function(t){switch(t){case void 0:return i.missingPremitive;case null:return i.nilPremitive;case"":return i.emptyValue;default:return t}},l=function(t,e){return u(e[0])||u(t[t.length-1])||(t+=i.boundryChar),t+e},u=function(t){return-1!==a.indexOf(t)};const c=n(18),d=n(4).buildOptions;e.convert2nimn=function(t,e,n){return n=d(n,c.defaultOptions,c.props),s(t,e,n)}},107:function(t,e,n){"use strict";const r=n(4),i=n(4).buildOptions,a=n(18),s=function(t,e,n){let i="{";const a=Object.keys(t.child);for(let n=0;n<a.length;n++){var o=a[n];if(t.child[o]&&t.child[o].length>1){for(var l in i+='"'+o+'" : [ ',t.child[o])i+=s(t.child[o][l],e)+" , ";i=i.substr(0,i.length-1)+" ] "}else i+='"'+o+'" : '+s(t.child[o][0],e)+" ,"}return r.merge(i,t.attrsMap),r.isEmptyObject(i)?r.isExist(t.val)?t.val:"":(r.isExist(t.val)&&("string"!=typeof t.val||""!==t.val&&t.val!==e.cdataPositionChar)&&(i+='"'+e.textNodeName+'" : '+(!0!==(u=t.val)&&!1!==u&&isNaN(u)?'"'+u+'"':u)),","===i[i.length-1]&&(i=i.substr(0,i.length-2)),i+"}");var u};e.convertToJsonString=function(t,e){return(e=i(e,a.defaultOptions,a.props)).indentBy=e.indentBy||"",s(t,e,0)}},108:function(t,e,n){"use strict";const r=n(4).buildOptions,i={attributeNamePrefix:"@_",attrNodeName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataTagName:!1,cdataPositionChar:"\\c",format:!1,indentBy:"  ",supressEmptyNode:!1,tagValueProcessor:function(t){return t},attrValueProcessor:function(t){return t}},a=["attributeNamePrefix","attrNodeName","textNodeName","ignoreAttributes","cdataTagName","cdataPositionChar","format","indentBy","supressEmptyNode","tagValueProcessor","attrValueProcessor"];function s(t){this.options=r(t,i,a),this.options.ignoreAttributes||this.options.attrNodeName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=g),this.options.cdataTagName?this.isCDATA=p:this.isCDATA=function(){return!1},this.replaceCDATAstr=o,this.replaceCDATAarr=l,this.options.format?(this.indentate=f,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine=""),this.options.supressEmptyNode?(this.buildTextNode=h,this.buildObjNode=c):(this.buildTextNode=d,this.buildObjNode=u),this.buildTextValNode=d,this.buildObjectNode=u}function o(t,e){return t=this.options.tagValueProcessor(""+t),""===this.options.cdataPositionChar||""===t?t+"<![CDATA["+e+"]]"+this.tagEndChar:t.replace(this.options.cdataPositionChar,"<![CDATA["+e+"]]"+this.tagEndChar)}function l(t,e){if(t=this.options.tagValueProcessor(""+t),""===this.options.cdataPositionChar||""===t)return t+"<![CDATA["+e.join("]]><![CDATA[")+"]]"+this.tagEndChar;for(let n in e)t=t.replace(this.options.cdataPositionChar,"<![CDATA["+e[n]+"]]>");return t+this.newLine}function u(t,e,n,r){return n&&!t.includes("<")?this.indentate(r)+"<"+e+n+">"+t+"</"+e+this.tagEndChar:this.indentate(r)+"<"+e+n+this.tagEndChar+t+this.indentate(r)+"</"+e+this.tagEndChar}function c(t,e,n,r){return""!==t?this.buildObjectNode(t,e,n,r):this.indentate(r)+"<"+e+n+"/"+this.tagEndChar}function d(t,e,n,r){return this.indentate(r)+"<"+e+n+">"+this.options.tagValueProcessor(t)+"</"+e+this.tagEndChar}function h(t,e,n,r){return""!==t?this.buildTextValNode(t,e,n,r):this.indentate(r)+"<"+e+n+"/"+this.tagEndChar}function f(t){return this.options.indentBy.repeat(t)}function g(t){return!!t.startsWith(this.options.attributeNamePrefix)&&t.substr(this.attrPrefixLen)}function p(t){return t===this.options.cdataTagName}s.prototype.parse=function(t){return this.j2x(t,0).val},s.prototype.j2x=function(t,e){let n="",r="";const i=Object.keys(t),a=i.length;for(let s=0;s<a;s++){const a=i[s];if(void 0===t[a]);else if(null===t[a])r+=this.indentate(e)+"<"+a+"/"+this.tagEndChar;else if(t[a]instanceof Date)r+=this.buildTextNode(t[a],a,"",e);else if("object"!=typeof t[a]){const i=this.isAttribute(a);i?n+=" "+i+'="'+this.options.attrValueProcessor(""+t[a])+'"':this.isCDATA(a)?t[this.options.textNodeName]?r+=this.replaceCDATAstr(t[this.options.textNodeName],t[a]):r+=this.replaceCDATAstr("",t[a]):a===this.options.textNodeName?t[this.options.cdataTagName]||(r+=this.options.tagValueProcessor(""+t[a])):r+=this.buildTextNode(t[a],a,"",e)}else if(Array.isArray(t[a]))if(this.isCDATA(a))r+=this.indentate(e),t[this.options.textNodeName]?r+=this.replaceCDATAarr(t[this.options.textNodeName],t[a]):r+=this.replaceCDATAarr("",t[a]);else{const n=t[a].length;for(let i=0;i<n;i++){const n=t[a][i];if(void 0===n);else if(null===n)r+=this.indentate(e)+"<"+a+"/"+this.tagEndChar;else if("object"==typeof n){const t=this.j2x(n,e+1);r+=this.buildObjNode(t.val,a,t.attrStr,e)}else r+=this.buildTextNode(n,a,"",e)}}else if(this.options.attrNodeName&&a===this.options.attrNodeName){const e=Object.keys(t[a]),r=e.length;for(let i=0;i<r;i++)n+=" "+e[i]+'="'+this.options.attrValueProcessor(""+t[a][e[i]])+'"'}else{const n=this.j2x(t[a],e+1);r+=this.buildObjNode(n.val,a,n.attrStr,e)}}return{attrStr:n,val:r}},t.exports=s},18:function(t,e,n){"use strict";const r=n(4),i=n(4).buildOptions,a=n(104),s={OPENING:1,CLOSING:2,SELF:3,CDATA:4};let o="<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|(([\\w:\\-._]*:)?([\\w:\\-._]+))([^>]*)>|((\\/)(([\\w:\\-._]*:)?([\\w:\\-._]+))\\s*>))([^<]*)";!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);const l={attributeNamePrefix:"@_",attrNodeName:!1,textNodeName:"#text",ignoreAttributes:!0,ignoreNameSpace:!1,allowBooleanAttributes:!1,parseNodeValue:!0,parseAttributeValue:!1,arrayMode:!1,trimValues:!0,cdataTagName:!1,cdataPositionChar:"\\c",localeRange:"",tagValueProcessor:function(t,e){return t},attrValueProcessor:function(t,e){return t},stopNodes:[]};e.defaultOptions=l;const u=["attributeNamePrefix","attrNodeName","textNodeName","ignoreAttributes","ignoreNameSpace","allowBooleanAttributes","parseNodeValue","parseAttributeValue","arrayMode","trimValues","cdataTagName","cdataPositionChar","localeRange","tagValueProcessor","attrValueProcessor","parseTrueNumberOnly","stopNodes"];e.props=u;function c(t,e,n){const r=t[7]||n;let i=t[14];return i&&(e.trimValues&&(i=i.trim()),i=e.tagValueProcessor(i,r),i=f(i,e.parseNodeValue,e.parseTrueNumberOnly)),i}function d(t){return"]]>"===t[4]?s.CDATA:"/"===t[10]?s.CLOSING:void 0!==t[8]&&"/"===t[8].substr(t[8].length-1)?s.SELF:s.OPENING}function h(t,e){if(e.ignoreNameSpace){const e=t.split(":"),n="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=n+e[1])}return t}function f(t,e,n){if(e&&"string"==typeof t){let e;return""===t.trim()||isNaN(t)?e="true"===t||"false"!==t&&t:(-1!==t.indexOf("0x")?e=Number.parseInt(t,16):-1!==t.indexOf(".")?(e=Number.parseFloat(t),t=t.replace(/0+$/,"")):e=Number.parseInt(t,10),n&&(e=String(e)===t?e:t)),e}return r.isExist(t)?t:""}const g=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])(.*?)\\3)?","g");function p(t,e){if(!e.ignoreAttributes&&"string"==typeof t){t=t.replace(/\r?\n/g," ");const n=r.getAllMatches(t,g),i=n.length,a={};for(let t=0;t<i;t++){const r=h(n[t][1],e);r.length&&(void 0!==n[t][4]?(e.trimValues&&(n[t][4]=n[t][4].trim()),n[t][4]=e.attrValueProcessor(n[t][4],r),a[e.attributeNamePrefix+r]=f(n[t][4],e.parseAttributeValue,e.parseTrueNumberOnly)):e.allowBooleanAttributes&&(a[e.attributeNamePrefix+r]=!0))}if(!Object.keys(a).length)return;if(e.attrNodeName){const t={};return t[e.attrNodeName]=a,t}return a}}e.getTraversalObj=function(t,e){e=i(e,l,u),t=t.replace(/<!--[\s\S]*?-->/g,"");const n=new a("!xml");let h=n;o=o.replace(/\[\\w/g,"["+e.localeRange+"\\w");const f=new RegExp(o,"g");let g=f.exec(t),m=f.exec(t);for(;g;){const n=d(g);if(n===s.CLOSING)h.parent&&g[14]&&(h.parent.val=r.getValue(h.parent.val)+""+c(g,e,h.parent.tagname)),e.stopNodes.length&&e.stopNodes.includes(h.tagname)&&(h.child=[],null==h.attrsMap&&(h.attrsMap={}),h.val=t.substr(h.startIndex+1,g.index-h.startIndex-1)),h=h.parent;else if(n===s.CDATA)if(e.cdataTagName){const t=new a(e.cdataTagName,h,g[3]);t.attrsMap=p(g[8],e),h.addChild(t),h.val=r.getValue(h.val)+e.cdataPositionChar,g[14]&&(h.val+=c(g,e))}else h.val=(h.val||"")+(g[3]||"")+c(g,e);else if(n===s.SELF){h&&g[14]&&(h.val=r.getValue(h.val)+""+c(g,e));const t=new a(e.ignoreNameSpace?g[7]:g[5],h,"");g[8]&&g[8].length>0&&(g[8]=g[8].substr(0,g[8].length-1)),t.attrsMap=p(g[8],e),h.addChild(t)}else{const t=new a(e.ignoreNameSpace?g[7]:g[5],h,c(g,e));e.stopNodes.length&&e.stopNodes.includes(t.tagname)&&(t.startIndex=g.index+g[1].length),t.attrsMap=p(g[8],e),h.addChild(t),h=t}g=m,m=f.exec(t)}return n}},4:function(t,e,n){"use strict";const r=function(t,e){const n=e.exec(t);return!(null==n)};e.isExist=function(t){return void 0!==t},e.isEmptyObject=function(t){return 0===Object.keys(t).length},e.merge=function(t,e,n){if(e){const r=Object.keys(e),i=r.length;for(let a=0;a<i;a++)t[r[a]]="strict"===n?[e[r[a]]]:e[r[a]]}},e.getValue=function(t){return e.isExist(t)?t:""},e.buildOptions=function(t,e,n){var r={};if(!t)return e;for(let i=0;i<n.length;i++)void 0!==t[n[i]]?r[n[i]]=t[n[i]]:r[n[i]]=e[n[i]];return r},e.doesMatch=r,e.doesNotMatch=function(t,e){return!r(t,e)},e.getAllMatches=function(t,e){const n=[];let r=e.exec(t);for(;r;){const i=[],a=r.length;for(let t=0;t<a;t++)i.push(r[t]);n.push(i),r=e.exec(t)}return n}},63:function(t,e,n){"use strict";const r=n(103),i=n(18),a=n(18),s=n(4).buildOptions,o=n(105);e.parse=function(t,e,n){if(n){!0===n&&(n={});const e=o.validate(t,n);if(!0!==e)throw Error(e.err.msg)}return e=s(e,a.defaultOptions,a.props),r.convertToJson(i.getTraversalObj(t,e),e)},e.convertTonimn=n(106).convert2nimn,e.getTraversalObj=i.getTraversalObj,e.convertToJson=r.convertToJson,e.convertToJsonString=n(107).convertToJsonString,e.validate=o.validate,e.j2xParser=n(108),e.parseToNimn=function(t,n,r){return e.convertTonimn(e.getTraversalObj(t,r),n,r)}}}]);
//# sourceMappingURL=npm.fast-xml-parser.js.map