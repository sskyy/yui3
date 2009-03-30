YUI.add("json-parse",function(Y){var _UNICODE_EXCEPTIONS=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_ESCAPES=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,_VALUES=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,_BRACKETS=/(?:^|:|,)(?:\s*\[)+/g,_INVALID=/[^\],:{}\s]/;function _revive(data,reviver){var walk=function(o,key){var k,v,value=o[key];if(value&&typeof value==="object"){for(k in value){if(value.hasOwnProperty(k)){v=walk(value,k);if(v===undefined){delete value[k];}else{value[k]=v;}}}}return reviver.call(o,key,value);};return typeof reviver==="function"?walk({"":data},""):data;}function escapeException(c){return"\\u"+("0000"+(+(c.charCodeAt(0))).toString(16)).slice(-4);}Y.mix(Y.namespace("JSON"),{parse:function(s,reviver){if(typeof s==="string"){s=s.replace(_UNICODE_EXCEPTIONS,escapeException);if(!_INVALID.test(s.replace(_ESCAPES,"@").replace(_VALUES,"]").replace(_BRACKETS,""))){return _revive(eval("("+s+")"),reviver);}}Y.JSON.handleParseError(s,reviver);throw new SyntaxError("JSON.parse");},handleParseError:function(s,reviver){}});},"@VERSION@");YUI.add("json-stringify",function(A){var P=Object.prototype.toString,K="string",M="number",J="boolean",H="object",Q="array",I="regexp",E="error",O="null",B="date",S="",R="{",D="}",C="[",N="]",L=",",F=":",G='"';A.mix(A.namespace("JSON"),{_SPECIAL_CHARS:/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_CHARS:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},dateToString:function(U){function T(V){return V<10?"0"+V:V;}return G+U.getUTCFullYear()+"-"+T(U.getUTCMonth()+1)+"-"+T(U.getUTCDate())+"T"+T(U.getUTCHours())+F+T(U.getUTCMinutes())+F+T(U.getUTCSeconds())+"Z"+G;},stringify:function(V,e,Y){var W=A.JSON._CHARS,T=A.JSON._SPECIAL_CHARS,a=A.Lang.isFunction(e)?e:null,U=[],g=A.JSON.dateToString;if(a||typeof e!=="object"){e=undefined;}function c(d){if(!W[d]){W[d]="\\u"+("0000"+(+(d.charCodeAt(0))).toString(16)).slice(-4);}return W[d];}function f(d){return G+d.replace(T,c)+G;}function X(h){for(var d=U.length-1;d>=0;--d){if(U[d]===h){return true;}}return false;}function b(h,r,p){U.push(h);var s=[],n,m,q,l,t;if(r>0){if(p){for(n=h.length-1;n>=0;--n){s[n]=Z(h,n,r-1)||O;}}else{l=A.Lang.isArray(e)?e:A.Object.keys(e||h);for(n=0,m=0,q=l.length;n<q;++n){if(typeof l[n]===K){t=Z(h,l[n],r-1);if(t){s[m++]=f(l[n])+F+t;}}}s.sort();}}U.pop();return p?C+s.join(L)+N:R+s.join(L)+D;}function Z(k,j,m){var l=A.Lang.isFunction(a)?a.call(k,j,k[j]):k[j],i=A.Lang.type(l);if(i===H){if(/String|Number|Boolean/.test(P.call(l))){l=l.valueOf();i=A.Lang.type(l);}}switch(i){case K:return f(l);case M:return isFinite(l)?l+S:O;case J:return l+S;case B:return g(l);case O:return O;case Q:return X(l)?O:b(l,m,true);case I:case E:case H:return X(l)?O:b(l,m);default:return undefined;}}Y=Y>=0?Y:1/0;return Z({"":V},S,Y);}});},"@VERSION@");YUI.add("json",function(A){},"@VERSION@",{use:["json-parse","json-stringify"]});