


window.undefined = window.undefined;



Ext = {
    
    version : '3.1.0'
};


Ext.apply = function(o, c, defaults){
    
    if(defaults){
        Ext.apply(o, defaults);
    }
    if(o && c && typeof c == 'object'){
        for(var p in c){
            o[p] = c[p];
        }
    }
    return o;
};

(function(){
    var idSeed = 0,
        toString = Object.prototype.toString,
        ua = navigator.userAgent.toLowerCase(),
        check = function(r){
            return r.test(ua);
        },
        DOC = document,
        isStrict = DOC.compatMode == "CSS1Compat",
        isOpera = check(/opera/),
        isChrome = check(/chrome/),
        isWebKit = check(/webkit/),
        isSafari = !isChrome && check(/safari/),
        isSafari2 = isSafari && check(/applewebkit\/4/), 
        isSafari3 = isSafari && check(/version\/3/),
        isSafari4 = isSafari && check(/version\/4/),
        isIE = !isOpera && check(/msie/),
        isIE7 = isIE && check(/msie 7/),
        isIE8 = isIE && check(/msie 8/),
        isIE6 = isIE && !isIE7 && !isIE8,
        isGecko = !isWebKit && check(/gecko/),
        isGecko2 = isGecko && check(/rv:1\.8/),
        isGecko3 = isGecko && check(/rv:1\.9/),
        isBorderBox = isIE && !isStrict,
        isWindows = check(/windows|win32/),
        isMac = check(/macintosh|mac os x/),
        isAir = check(/adobeair/),
        isLinux = check(/linux/),
        isSecure = /^https/i.test(window.location.protocol);

    
    if(isIE6){
        try{
            DOC.execCommand("BackgroundImageCache", false, true);
        }catch(e){}
    }

    Ext.apply(Ext, {
        
        SSL_SECURE_URL : isSecure && isIE ? 'javascript:""' : 'about:blank',
        
        isStrict : isStrict,
        
        isSecure : isSecure,
        
        isReady : false,

        

        
        enableGarbageCollector : true,

        
        enableListenerCollection : false,

        
        enableNestedListenerRemoval : false,

        
        USE_NATIVE_JSON : false,

        
        applyIf : function(o, c){
            if(o){
                for(var p in c){
                    if(!Ext.isDefined(o[p])){
                        o[p] = c[p];
                    }
                }
            }
            return o;
        },

        
        id : function(el, prefix){
            return (el = Ext.getDom(el) || {}).id = el.id || (prefix || "ext-gen") + (++idSeed);
        },

        
        extend : function(){
            
            var io = function(o){
                for(var m in o){
                    this[m] = o[m];
                }
            };
            var oc = Object.prototype.constructor;

            return function(sb, sp, overrides){
                if(Ext.isObject(sp)){
                    overrides = sp;
                    sp = sb;
                    sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
                }
                var F = function(){},
                    sbp,
                    spp = sp.prototype;

                F.prototype = spp;
                sbp = sb.prototype = new F();
                sbp.constructor=sb;
                sb.superclass=spp;
                if(spp.constructor == oc){
                    spp.constructor=sp;
                }
                sb.override = function(o){
                    Ext.override(sb, o);
                };
                sbp.superclass = sbp.supr = (function(){
                    return spp;
                });
                sbp.override = io;
                Ext.override(sb, overrides);
                sb.extend = function(o){return Ext.extend(sb, o);};
                return sb;
            };
        }(),

        
        override : function(origclass, overrides){
            if(overrides){
                var p = origclass.prototype;
                Ext.apply(p, overrides);
                if(Ext.isIE && overrides.hasOwnProperty('toString')){
                    p.toString = overrides.toString;
                }
            }
        },

        
        namespace : function(){
            var o, d;
            Ext.each(arguments, function(v) {
                d = v.split(".");
                o = window[d[0]] = window[d[0]] || {};
                Ext.each(d.slice(1), function(v2){
                    o = o[v2] = o[v2] || {};
                });
            });
            return o;
        },

        
        urlEncode : function(o, pre){
            var empty,
                buf = [],
                e = encodeURIComponent;

            Ext.iterate(o, function(key, item){
                empty = Ext.isEmpty(item);
                Ext.each(empty ? key : item, function(val){
                    buf.push('&', e(key), '=', (!Ext.isEmpty(val) && (val != key || !empty)) ? (Ext.isDate(val) ? Ext.encode(val).replace(/"/g, '') : e(val)) : '');
                });
            });
            if(!pre){
                buf.shift();
                pre = '';
            }
            return pre + buf.join('');
        },

        
        urlDecode : function(string, overwrite){
            if(Ext.isEmpty(string)){
                return {};
            }
            var obj = {},
                pairs = string.split('&'),
                d = decodeURIComponent,
                name,
                value;
            Ext.each(pairs, function(pair) {
                pair = pair.split('=');
                name = d(pair[0]);
                value = d(pair[1]);
                obj[name] = overwrite || !obj[name] ? value :
                            [].concat(obj[name]).concat(value);
            });
            return obj;
        },

        
        urlAppend : function(url, s){
            if(!Ext.isEmpty(s)){
                return url + (url.indexOf('?') === -1 ? '?' : '&') + s;
            }
            return url;
        },

        
         toArray : function(){
             return isIE ?
                 function(a, i, j, res){
                     res = [];
                     for(var x = 0, len = a.length; x < len; x++) {
                         res.push(a[x]);
                     }
                     return res.slice(i || 0, j || res.length);
                 } :
                 function(a, i, j){
                     return Array.prototype.slice.call(a, i || 0, j || a.length);
                 }
         }(),

        isIterable : function(v){
            
            if(Ext.isArray(v) || v.callee){
                return true;
            }
            
            if(/NodeList|HTMLCollection/.test(toString.call(v))){
                return true;
            }
            
            
            return ((typeof v.nextNode != 'undefined' || v.item) && Ext.isNumber(v.length));
        },

        
        each : function(array, fn, scope){
            if(Ext.isEmpty(array, true)){
                return;
            }
            if(!Ext.isIterable(array) || Ext.isPrimitive(array)){
                array = [array];
            }
            for(var i = 0, len = array.length; i < len; i++){
                if(fn.call(scope || array[i], array[i], i, array) === false){
                    return i;
                };
            }
        },

        
        iterate : function(obj, fn, scope){
            if(Ext.isEmpty(obj)){
                return;
            }
            if(Ext.isIterable(obj)){
                Ext.each(obj, fn, scope);
                return;
            }else if(Ext.isObject(obj)){
                for(var prop in obj){
                    if(obj.hasOwnProperty(prop)){
                        if(fn.call(scope || obj, prop, obj[prop], obj) === false){
                            return;
                        };
                    }
                }
            }
        },

        
        getDom : function(el){
            if(!el || !DOC){
                return null;
            }
            return el.dom ? el.dom : (Ext.isString(el) ? DOC.getElementById(el) : el);
        },

        
        getBody : function(){
            return Ext.get(DOC.body || DOC.documentElement);
        },

        
        
        removeNode : isIE && !isIE8 ? function(){
            var d;
            return function(n){
                if(n && n.tagName != 'BODY'){
                    (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(n, true) : Ext.EventManager.removeAll(n);
                    d = d || DOC.createElement('div');
                    d.appendChild(n);
                    d.innerHTML = '';
                    delete Ext.elCache[n.id];
                }
            }
        }() : function(n){
            if(n && n.parentNode && n.tagName != 'BODY'){
                (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(n, true) : Ext.EventManager.removeAll(n);
                n.parentNode.removeChild(n);
                delete Ext.elCache[n.id];
            }
        },

        
        isEmpty : function(v, allowBlank){
            return v === null || v === undefined || ((Ext.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
        },

        
        isArray : function(v){
            return toString.apply(v) === '[object Array]';
        },

        
        isDate : function(v){
            return toString.apply(v) === '[object Date]';
        },

        
        isObject : function(v){
            return !!v && Object.prototype.toString.call(v) === '[object Object]';
        },

        
        isPrimitive : function(v){
            return Ext.isString(v) || Ext.isNumber(v) || Ext.isBoolean(v);
        },

        
        isFunction : function(v){
            return toString.apply(v) === '[object Function]';
        },

        
        isNumber : function(v){
            return typeof v === 'number' && isFinite(v);
        },

        
        isString : function(v){
            return typeof v === 'string';
        },

        
        isBoolean : function(v){
            return typeof v === 'boolean';
        },

        
        isElement : function(v) {
            return !!v && v.tagName;
        },

        
        isDefined : function(v){
            return typeof v !== 'undefined';
        },

        
        isOpera : isOpera,
        
        isWebKit : isWebKit,
        
        isChrome : isChrome,
        
        isSafari : isSafari,
        
        isSafari3 : isSafari3,
        
        isSafari4 : isSafari4,
        
        isSafari2 : isSafari2,
        
        isIE : isIE,
        
        isIE6 : isIE6,
        
        isIE7 : isIE7,
        
        isIE8 : isIE8,
        
        isGecko : isGecko,
        
        isGecko2 : isGecko2,
        
        isGecko3 : isGecko3,
        
        isBorderBox : isBorderBox,
        
        isLinux : isLinux,
        
        isWindows : isWindows,
        
        isMac : isMac,
        
        isAir : isAir
    });

    
    Ext.ns = Ext.namespace;
})();

Ext.ns("Ext.util", "Ext.lib", "Ext.data");

Ext.elCache = {};


Ext.apply(Function.prototype, {
     
    createInterceptor : function(fcn, scope){
        var method = this;
        return !Ext.isFunction(fcn) ?
                this :
                function() {
                    var me = this,
                        args = arguments;
                    fcn.target = me;
                    fcn.method = method;
                    return (fcn.apply(scope || me || window, args) !== false) ?
                            method.apply(me || window, args) :
                            null;
                };
    },

     
    createCallback : function(){
        
        var args = arguments,
            method = this;
        return function() {
            return method.apply(window, args);
        };
    },

    
    createDelegate : function(obj, args, appendArgs){
        var method = this;
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if (Ext.isNumber(appendArgs)){
                callArgs = Array.prototype.slice.call(arguments, 0); 
                var applyArgs = [appendArgs, 0].concat(args); 
                Array.prototype.splice.apply(callArgs, applyArgs); 
            }
            return method.apply(obj || window, callArgs);
        };
    },

    
    defer : function(millis, obj, args, appendArgs){
        var fn = this.createDelegate(obj, args, appendArgs);
        if(millis > 0){
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    }
});


Ext.applyIf(String, {
    
    format : function(format){
        var args = Ext.toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i){
            return args[i];
        });
    }
});


Ext.applyIf(Array.prototype, {
    
    indexOf : function(o, from){
        var len = this.length;
        from = from || 0;
        from += (from < 0) ? len : 0;
        for (; from < len; ++from){
            if(this[from] === o){
                return from;
            }
        }
        return -1;
    },

    
    remove : function(o){
        var index = this.indexOf(o);
        if(index != -1){
            this.splice(index, 1);
        }
        return this;
    }
});

Ext.util.TaskRunner = function(interval){
    interval = interval || 10;
    var tasks = [], 
    	removeQueue = [],
    	id = 0,
    	running = false,

    	
    	stopThread = function(){
	        running = false;
	        clearInterval(id);
	        id = 0;
	    },

    	
    	startThread = function(){
	        if(!running){
	            running = true;
	            id = setInterval(runTasks, interval);
	        }
	    },

    	
    	removeTask = function(t){
	        removeQueue.push(t);
	        if(t.onStop){
	            t.onStop.apply(t.scope || t);
	        }
	    },
	    
    	
    	runTasks = function(){
	    	var rqLen = removeQueue.length,
	    		now = new Date().getTime();	    			    		
	    
	        if(rqLen > 0){
	            for(var i = 0; i < rqLen; i++){
	                tasks.remove(removeQueue[i]);
	            }
	            removeQueue = [];
	            if(tasks.length < 1){
	                stopThread();
	                return;
	            }
	        }	        
	        for(var i = 0, t, itime, rt, len = tasks.length; i < len; ++i){
	            t = tasks[i];
	            itime = now - t.taskRunTime;
	            if(t.interval <= itime){
	                rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
	                t.taskRunTime = now;
	                if(rt === false || t.taskRunCount === t.repeat){
	                    removeTask(t);
	                    return;
	                }
	            }
	            if(t.duration && t.duration <= (now - t.taskStartTime)){
	                removeTask(t);
	            }
	        }
	    };

    
    this.start = function(task){
        tasks.push(task);
        task.taskStartTime = new Date().getTime();
        task.taskRunTime = 0;
        task.taskRunCount = 0;
        startThread();
        return task;
    };

    
    this.stop = function(task){
        removeTask(task);
        return task;
    };

    
    this.stopAll = function(){
        stopThread();
        for(var i = 0, len = tasks.length; i < len; i++){
            if(tasks[i].onStop){
                tasks[i].onStop();
            }
        }
        tasks = [];
        removeQueue = [];
    };
};


Ext.TaskMgr = new Ext.util.TaskRunner();
Ext.util.DelayedTask = function(fn, scope, args){
    var me = this,
    	id,    	
    	call = function(){
    		clearInterval(id);
	        id = null;
	        fn.apply(scope, args || []);
	    };
	    
    
    me.delay = function(delay, newFn, newScope, newArgs){
        me.cancel();
        fn = newFn || fn;
        scope = newScope || scope;
        args = newArgs || args;
        id = setInterval(call, delay);
    };

    
    me.cancel = function(){
        if(id){
            clearInterval(id);
            id = null;
        }
    };
};(function(){
	var libFlyweight;
	
	function fly(el) {
        if (!libFlyweight) {
            libFlyweight = new Ext.Element.Flyweight();
        }
        libFlyweight.dom = el;
        return libFlyweight;
    }
    
    (function(){
	var doc = document,
		isCSS1 = doc.compatMode == "CSS1Compat",
		MAX = Math.max,		
        ROUND = Math.round,
		PARSEINT = parseInt;
		
	Ext.lib.Dom = {
	    isAncestor : function(p, c) {
		    var ret = false;
			
			p = Ext.getDom(p);
			c = Ext.getDom(c);
			if (p && c) {
				if (p.contains) {
					return p.contains(c);
				} else if (p.compareDocumentPosition) {
					return !!(p.compareDocumentPosition(c) & 16);
				} else {
					while (c = c.parentNode) {
						ret = c == p || ret;	        			
					}
				}	            
			}	
			return ret;
		},
		
        getViewWidth : function(full) {
            return full ? this.getDocumentWidth() : this.getViewportWidth();
        },

        getViewHeight : function(full) {
            return full ? this.getDocumentHeight() : this.getViewportHeight();
        },

        getDocumentHeight: function() {            
            return MAX(!isCSS1 ? doc.body.scrollHeight : doc.documentElement.scrollHeight, this.getViewportHeight());
        },

        getDocumentWidth: function() {            
            return MAX(!isCSS1 ? doc.body.scrollWidth : doc.documentElement.scrollWidth, this.getViewportWidth());
        },

        getViewportHeight: function(){
	        return Ext.isIE ? 
	        	   (Ext.isStrict ? doc.documentElement.clientHeight : doc.body.clientHeight) :
	        	   self.innerHeight;
        },

        getViewportWidth : function() {
	        return !Ext.isStrict && !Ext.isOpera ? doc.body.clientWidth :
	        	   Ext.isIE ? doc.documentElement.clientWidth : self.innerWidth;
        },
        
        getY : function(el) {
            return this.getXY(el)[1];
        },

        getX : function(el) {
            return this.getXY(el)[0];
        },

        getXY : function(el) {
            var p, 
            	pe, 
            	b,
            	bt, 
            	bl,     
            	dbd,       	
            	x = 0,
            	y = 0, 
            	scroll,
            	hasAbsolute, 
            	bd = (doc.body || doc.documentElement),
            	ret = [0,0];
            	
            el = Ext.getDom(el);

            if(el != bd){
	            if (el.getBoundingClientRect) {
	                b = el.getBoundingClientRect();
	                scroll = fly(document).getScroll();
	                ret = [ROUND(b.left + scroll.left), ROUND(b.top + scroll.top)];
	            } else {  
		            p = el;		
		            hasAbsolute = fly(el).isStyle("position", "absolute");
		
		            while (p) {
			            pe = fly(p);		
		                x += p.offsetLeft;
		                y += p.offsetTop;
		
		                hasAbsolute = hasAbsolute || pe.isStyle("position", "absolute");
		                		
		                if (Ext.isGecko) {		                    
		                    y += bt = PARSEINT(pe.getStyle("borderTopWidth"), 10) || 0;
		                    x += bl = PARSEINT(pe.getStyle("borderLeftWidth"), 10) || 0;	
		
		                    if (p != el && !pe.isStyle('overflow','visible')) {
		                        x += bl;
		                        y += bt;
		                    }
		                }
		                p = p.offsetParent;
		            }
		
		            if (Ext.isSafari && hasAbsolute) {
		                x -= bd.offsetLeft;
		                y -= bd.offsetTop;
		            }
		
		            if (Ext.isGecko && !hasAbsolute) {
		                dbd = fly(bd);
		                x += PARSEINT(dbd.getStyle("borderLeftWidth"), 10) || 0;
		                y += PARSEINT(dbd.getStyle("borderTopWidth"), 10) || 0;
		            }
		
		            p = el.parentNode;
		            while (p && p != bd) {
		                if (!Ext.isOpera || (p.tagName != 'TR' && !fly(p).isStyle("display", "inline"))) {
		                    x -= p.scrollLeft;
		                    y -= p.scrollTop;
		                }
		                p = p.parentNode;
		            }
		            ret = [x,y];
	            }
         	}
            return ret
        },

        setXY : function(el, xy) {
            (el = Ext.fly(el, '_setXY')).position();
            
            var pts = el.translatePoints(xy),
            	style = el.dom.style,
            	pos;            	
            
            for (pos in pts) {	            
	            if(!isNaN(pts[pos])) style[pos] = pts[pos] + "px"
            }
        },

        setX : function(el, x) {
            this.setXY(el, [x, false]);
        },

        setY : function(el, y) {
            this.setXY(el, [false, y]);
        }
    };
})();Ext.lib.Event = function() {
    var loadComplete = false,
        unloadListeners = {},
        retryCount = 0,
        onAvailStack = [],
        _interval,
        locked = false,
        win = window,
        doc = document,

        
        POLL_RETRYS = 200,
        POLL_INTERVAL = 20,
        EL = 0,
        TYPE = 0,
        FN = 1,
        WFN = 2,
        OBJ = 2,
        ADJ_SCOPE = 3,
        SCROLLLEFT = 'scrollLeft',
        SCROLLTOP = 'scrollTop',
        UNLOAD = 'unload',
        MOUSEOVER = 'mouseover',
        MOUSEOUT = 'mouseout',
        
        doAdd = function() {
            var ret;
            if (win.addEventListener) {
                ret = function(el, eventName, fn, capture) {
                    if (eventName == 'mouseenter') {
                        fn = fn.createInterceptor(checkRelatedTarget);
                        el.addEventListener(MOUSEOVER, fn, (capture));
                    } else if (eventName == 'mouseleave') {
                        fn = fn.createInterceptor(checkRelatedTarget);
                        el.addEventListener(MOUSEOUT, fn, (capture));
                    } else {
                        el.addEventListener(eventName, fn, (capture));
                    }
                    return fn;
                };
            } else if (win.attachEvent) {
                ret = function(el, eventName, fn, capture) {
                    el.attachEvent("on" + eventName, fn);
                    return fn;
                };
            } else {
                ret = function(){};
            }
            return ret;
        }(),
        
        doRemove = function(){
            var ret;
            if (win.removeEventListener) {
                ret = function (el, eventName, fn, capture) {
                    if (eventName == 'mouseenter') {
                        eventName = MOUSEOVER;
                    } else if (eventName == 'mouseleave') {
                        eventName = MOUSEOUT;
                    }
                    el.removeEventListener(eventName, fn, (capture));
                };
            } else if (win.detachEvent) {
                ret = function (el, eventName, fn) {
                    el.detachEvent("on" + eventName, fn);
                };
            } else {
                ret = function(){};
            }
            return ret;
        }();

    function checkRelatedTarget(e) {
        return !elContains(e.currentTarget, pub.getRelatedTarget(e));
    }

    function elContains(parent, child) {
       if(parent && parent.firstChild){
         while(child) {
            if(child === parent) {
                return true;
            }
            child = child.parentNode;
            if(child && (child.nodeType != 1)) {
                child = null;
            }
          }
        }
        return false;
    }

    
    function _tryPreloadAttach() {
        var ret = false,
            notAvail = [],
            element, i, len, v,
            tryAgain = !loadComplete || (retryCount > 0);

        if (!locked) {
            locked = true;

            for (i = 0, len = onAvailStack.length; i < len; i++) {
                v = onAvailStack[i];
                if(v && (element = doc.getElementById(v.id))){
                    if(!v.checkReady || loadComplete || element.nextSibling || (doc && doc.body)) {
                        element = v.override ? (v.override === true ? v.obj : v.override) : element;
                        v.fn.call(element, v.obj);
                        onAvailStack.remove(v);
                    } else {
                        notAvail.push(v);
                    }
                }
            }

            retryCount = (notAvail.length === 0) ? 0 : retryCount - 1;

            if (tryAgain) {
                startInterval();
            } else {
                clearInterval(_interval);
                _interval = null;
            }

            ret = !(locked = false);
        }
        return ret;
    }

    
    function startInterval() {
        if(!_interval){
            var callback = function() {
                _tryPreloadAttach();
            };
            _interval = setInterval(callback, POLL_INTERVAL);
        }
    }

    
    function getScroll() {
        var dd = doc.documentElement,
            db = doc.body;
        if(dd && (dd[SCROLLTOP] || dd[SCROLLLEFT])){
            return [dd[SCROLLLEFT], dd[SCROLLTOP]];
        }else if(db){
            return [db[SCROLLLEFT], db[SCROLLTOP]];
        }else{
            return [0, 0];
        }
    }

    
    function getPageCoord (ev, xy) {
        ev = ev.browserEvent || ev;
        var coord  = ev['page' + xy];
        if (!coord && coord !== 0) {
            coord = ev['client' + xy] || 0;

            if (Ext.isIE) {
                coord += getScroll()[xy == "X" ? 0 : 1];
            }
        }

        return coord;
    }

    var pub =  {
        extAdapter: true,
        onAvailable : function(p_id, p_fn, p_obj, p_override) {
            onAvailStack.push({
                id:         p_id,
                fn:         p_fn,
                obj:        p_obj,
                override:   p_override,
                checkReady: false });

            retryCount = POLL_RETRYS;
            startInterval();
        },

        
        addListener: function(el, eventName, fn) {
            el = Ext.getDom(el);
            if (el && fn) {
                if (eventName == UNLOAD) {
                    if (unloadListeners[el.id] === undefined) {
                        unloadListeners[el.id] = [];
                    }
                    unloadListeners[el.id].push([eventName, fn]);
                    return fn;
                }
                return doAdd(el, eventName, fn, false);
            }
            return false;
        },

        
        removeListener: function(el, eventName, fn) {
            el = Ext.getDom(el);
            var i, len, li, lis;
            if (el && fn) {
                if(eventName == UNLOAD){
                    if((lis = unloadListeners[el.id]) !== undefined){
                        for(i = 0, len = lis.length; i < len; i++){
                            if((li = lis[i]) && li[TYPE] == eventName && li[FN] == fn){
                                unloadListeners[el.id].splice(i, 1);
                            }
                        }
                    }
                    return;
                }
                doRemove(el, eventName, fn, false);
            }
        },

        getTarget : function(ev) {
            ev = ev.browserEvent || ev;
            return this.resolveTextNode(ev.target || ev.srcElement);
        },

        resolveTextNode : Ext.isGecko ? function(node){
            if(!node){
                return;
            }
            
            var s = HTMLElement.prototype.toString.call(node);
            if(s == '[xpconnect wrapped native prototype]' || s == '[object XULElement]'){
                return;
            }
            return node.nodeType == 3 ? node.parentNode : node;
        } : function(node){
            return node && node.nodeType == 3 ? node.parentNode : node;
        },

        getRelatedTarget : function(ev) {
            ev = ev.browserEvent || ev;
            return this.resolveTextNode(ev.relatedTarget ||
                    (ev.type == MOUSEOUT ? ev.toElement :
                     ev.type == MOUSEOVER ? ev.fromElement : null));
        },

        getPageX : function(ev) {
            return getPageCoord(ev, "X");
        },

        getPageY : function(ev) {
            return getPageCoord(ev, "Y");
        },


        getXY : function(ev) {
            return [this.getPageX(ev), this.getPageY(ev)];
        },

        stopEvent : function(ev) {
            this.stopPropagation(ev);
            this.preventDefault(ev);
        },

        stopPropagation : function(ev) {
            ev = ev.browserEvent || ev;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },

        preventDefault : function(ev) {
            ev = ev.browserEvent || ev;
            if (ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
        },

        getEvent : function(e) {
            e = e || win.event;
            if (!e) {
                var c = this.getEvent.caller;
                while (c) {
                    e = c.arguments[0];
                    if (e && Event == e.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return e;
        },

        getCharCode : function(ev) {
            ev = ev.browserEvent || ev;
            return ev.charCode || ev.keyCode || 0;
        },

        
        
        getListeners : function(el, eventName) {
            Ext.EventManager.getListeners(el, eventName);
        },

        
        purgeElement : function(el, recurse, eventName) {
            Ext.EventManager.purgeElement(el, recurse, eventName);
        },

        _load : function(e) {
            loadComplete = true;
            var EU = Ext.lib.Event;
            if (Ext.isIE && e !== true) {
        
        
                doRemove(win, "load", arguments.callee);
            }
        },

        _unload : function(e) {
             var EU = Ext.lib.Event,
                i, j, l, v, ul, id, len, index, scope;


            for (id in unloadListeners) {
                ul = unloadListeners[id];
                for (i = 0, len = ul.length; i < len; i++) {
                    v = ul[i];
                    if (v) {
                        try{
                            scope = v[ADJ_SCOPE] ? (v[ADJ_SCOPE] === true ? v[OBJ] : v[ADJ_SCOPE]) :  win;
                            v[FN].call(scope, EU.getEvent(e), v[OBJ]);
                        }catch(ex){}
                    }
                }
            };

            unloadListeners = null;
            Ext.EventManager._unload();

            doRemove(win, UNLOAD, EU._unload);
        }
    };

    
    pub.on = pub.addListener;
    pub.un = pub.removeListener;
    if (doc && doc.body) {
        pub._load(true);
    } else {
        doAdd(win, "load", pub._load);
    }
    doAdd(win, UNLOAD, pub._unload);
    _tryPreloadAttach();

    return pub;
}();

Ext.lib.Ajax = function() {     
    var activeX = ['MSXML2.XMLHTTP.3.0',
                   'MSXML2.XMLHTTP',
                   'Microsoft.XMLHTTP'],
        CONTENTTYPE = 'Content-Type';
                   
    
    function setHeader(o) {
        var conn = o.conn,
            prop;
        
        function setTheHeaders(conn, headers){
            for (prop in headers) {
                if (headers.hasOwnProperty(prop)) {
                    conn.setRequestHeader(prop, headers[prop]);
                }
            }   
        }       
        
        if (pub.defaultHeaders) {
            setTheHeaders(conn, pub.defaultHeaders);
        }

        if (pub.headers) {
            setTheHeaders(conn, pub.headers);
            delete pub.headers;                
        }
    }    
    
    
    function createExceptionObject(tId, callbackArg, isAbort, isTimeout) {          
        return {
            tId : tId,
            status : isAbort ? -1 : 0,
            statusText : isAbort ? 'transaction aborted' : 'communication failure',
            isAbort: isAbort,
            isTimeout: isTimeout,
            argument : callbackArg
        };
    }  
    
    
    function initHeader(label, value) {         
        (pub.headers = pub.headers || {})[label] = value;                       
    }
    
    
    function createResponseObject(o, callbackArg) {
        var headerObj = {},
            headerStr,              
            conn = o.conn,
            t,
            s;

        try {
            headerStr = o.conn.getAllResponseHeaders();   
            Ext.each(headerStr.replace(/\r\n/g, '\n').split('\n'), function(v){
                t = v.indexOf(':');
                if(t >= 0){
                    s = v.substr(0, t).toLowerCase();
                    if(v.charAt(t + 1) == ' '){
                        ++t;
                    }
                    headerObj[s] = v.substr(t + 1);
                }
            });
        } catch(e) {}
                    
        return {
            tId : o.tId,
            status : conn.status,
            statusText : conn.statusText,
            getResponseHeader : function(header){return headerObj[header.toLowerCase()];},
            getAllResponseHeaders : function(){return headerStr},
            responseText : conn.responseText,
            responseXML : conn.responseXML,
            argument : callbackArg
        };
    }
    
    
    function releaseObject(o) {
        o.conn = null;
        o = null;
    }        
    
    
    function handleTransactionResponse(o, callback, isAbort, isTimeout) {
        if (!callback) {
            releaseObject(o);
            return;
        }

        var httpStatus, responseObject;

        try {
            if (o.conn.status !== undefined && o.conn.status != 0) {
                httpStatus = o.conn.status;
            }
            else {
                httpStatus = 13030;
            }
        }
        catch(e) {
            httpStatus = 13030;
        }

        if ((httpStatus >= 200 && httpStatus < 300) || (Ext.isIE && httpStatus == 1223)) {
            responseObject = createResponseObject(o, callback.argument);
            if (callback.success) {
                if (!callback.scope) {
                    callback.success(responseObject);
                }
                else {
                    callback.success.apply(callback.scope, [responseObject]);
                }
            }
        }
        else {
            switch (httpStatus) {
                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:
                    responseObject = createExceptionObject(o.tId, callback.argument, (isAbort ? isAbort : false), isTimeout);
                    if (callback.failure) {
                        if (!callback.scope) {
                            callback.failure(responseObject);
                        }
                        else {
                            callback.failure.apply(callback.scope, [responseObject]);
                        }
                    }
                    break;
                default:
                    responseObject = createResponseObject(o, callback.argument);
                    if (callback.failure) {
                        if (!callback.scope) {
                            callback.failure(responseObject);
                        }
                        else {
                            callback.failure.apply(callback.scope, [responseObject]);
                        }
                    }
            }
        }

        releaseObject(o);
        responseObject = null;
    }  
    
    
    function handleReadyState(o, callback){
    callback = callback || {};
        var conn = o.conn,
            tId = o.tId,
            poll = pub.poll,
            cbTimeout = callback.timeout || null;

        if (cbTimeout) {
            pub.timeout[tId] = setTimeout(function() {
                pub.abort(o, callback, true);
            }, cbTimeout);
        }

        poll[tId] = setInterval(
            function() {
                if (conn && conn.readyState == 4) {
                    clearInterval(poll[tId]);
                    poll[tId] = null;

                    if (cbTimeout) {
                        clearTimeout(pub.timeout[tId]);
                        pub.timeout[tId] = null;
                    }

                    handleTransactionResponse(o, callback);
                }
            },
            pub.pollInterval);
    }
    
    
    function asyncRequest(method, uri, callback, postData) {
        var o = getConnectionObject() || null;

        if (o) {
            o.conn.open(method, uri, true);

            if (pub.useDefaultXhrHeader) {                    
                initHeader('X-Requested-With', pub.defaultXhrHeader);
            }

            if(postData && pub.useDefaultHeader && (!pub.headers || !pub.headers[CONTENTTYPE])){
                initHeader(CONTENTTYPE, pub.defaultPostHeader);
            }

            if (pub.defaultHeaders || pub.headers) {
                setHeader(o);
            }

            handleReadyState(o, callback);
            o.conn.send(postData || null);
        }
        return o;
    }
    
    
    function getConnectionObject() {
        var o;          

        try {
            if (o = createXhrObject(pub.transactionId)) {
                pub.transactionId++;
            }
        } catch(e) {
        } finally {
            return o;
        }
    }
       
    
    function createXhrObject(transactionId) {
        var http;
            
        try {
            http = new XMLHttpRequest();                
        } catch(e) {
            for (var i = 0; i < activeX.length; ++i) {              
                try {
                    http = new ActiveXObject(activeX[i]);                        
                    break;
                } catch(e) {}
            }
        } finally {
            return {conn : http, tId : transactionId};
        }
    }
         
    var pub = {
        request : function(method, uri, cb, data, options) {
            if(options){
                var me = this,              
                    xmlData = options.xmlData,
                    jsonData = options.jsonData,
                    hs;
                    
                Ext.applyIf(me, options);           
                
                if(xmlData || jsonData){
                    hs = me.headers;
                    if(!hs || !hs[CONTENTTYPE]){
                        initHeader(CONTENTTYPE, xmlData ? 'text/xml' : 'application/json');
                    }
                    data = xmlData || (!Ext.isPrimitive(jsonData) ? Ext.encode(jsonData) : jsonData);
                }
            }                       
            return asyncRequest(method || options.method || "POST", uri, cb, data);
        },

        serializeForm : function(form) {
            var fElements = form.elements || (document.forms[form] || Ext.getDom(form)).elements,
                hasSubmit = false,
                encoder = encodeURIComponent,
                element,
                options, 
                name, 
                val,                
                data = '',
                type;
                
            Ext.each(fElements, function(element) {                 
                name = element.name;                 
                type = element.type;
                
                if (!element.disabled && name){
                    if(/select-(one|multiple)/i.test(type)) {
                        Ext.each(element.options, function(opt) {
                            if (opt.selected) {
                                data += String.format("{0}={1}&", encoder(name), encoder((opt.hasAttribute ? opt.hasAttribute('value') : opt.getAttribute('value') !== null) ? opt.value : opt.text));
                            }                               
                        });
                    } else if(!/file|undefined|reset|button/i.test(type)) {
                            if(!(/radio|checkbox/i.test(type) && !element.checked) && !(type == 'submit' && hasSubmit)){
                                
                                data += encoder(name) + '=' + encoder(element.value) + '&';                     
                                hasSubmit = /submit/i.test(type);    
                            }                       
                    } 
                }
            });            
            return data.substr(0, data.length - 1);
        },
        
        useDefaultHeader : true,
        defaultPostHeader : 'application/x-www-form-urlencoded; charset=UTF-8',
        useDefaultXhrHeader : true,
        defaultXhrHeader : 'XMLHttpRequest',        
        poll : {},
        timeout : {},
        pollInterval : 50,
        transactionId : 0,
        









        











        




    
            abort : function(o, callback, isTimeout) {
                var me = this,
                    tId = o.tId,
                    isAbort = false;
                
                if (me.isCallInProgress(o)) {
                    o.conn.abort();
                    clearInterval(me.poll[tId]);
                    me.poll[tId] = null;
                    clearTimeout(pub.timeout[tId]);
                    me.timeout[tId] = null;
                    
                    handleTransactionResponse(o, callback, (isAbort = true), isTimeout);                
                }
                return isAbort;
            },
    
            isCallInProgress : function(o) {
                
                return o.conn && !{0:true,4:true}[o.conn.readyState];           
            }
        };
        return pub;
    }();(function(){    
    var EXTLIB = Ext.lib,
        noNegatives = /width|height|opacity|padding/i,
        offsetAttribute = /^((width|height)|(top|left))$/,
        defaultUnit = /width|height|top$|bottom$|left$|right$/i,
        offsetUnit =  /\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i,
        isset = function(v){
            return typeof v !== 'undefined';
        },
        now = function(){
            return new Date();    
        };
        
    EXTLIB.Anim = {
        motion : function(el, args, duration, easing, cb, scope) {
            return this.run(el, args, duration, easing, cb, scope, Ext.lib.Motion);
        },

        run : function(el, args, duration, easing, cb, scope, type) {
            type = type || Ext.lib.AnimBase;
            if (typeof easing == "string") {
                easing = Ext.lib.Easing[easing];
            }
            var anim = new type(el, args, duration, easing);
            anim.animateX(function() {
                if(Ext.isFunction(cb)){
                    cb.call(scope);
                }
            });
            return anim;
        }
    };
    
    EXTLIB.AnimBase = function(el, attributes, duration, method) {
        if (el) {
            this.init(el, attributes, duration, method);
        }
    };

    EXTLIB.AnimBase.prototype = {
        doMethod: function(attr, start, end) {
            var me = this;
            return me.method(me.curFrame, start, end - start, me.totalFrames);
        },


        setAttr: function(attr, val, unit) {
            if (noNegatives.test(attr) && val < 0) {
                val = 0;
            }
            Ext.fly(this.el, '_anim').setStyle(attr, val + unit);
        },


        getAttr: function(attr) {
            var el = Ext.fly(this.el),
                val = el.getStyle(attr),
                a = offsetAttribute.exec(attr) || []

            if (val !== 'auto' && !offsetUnit.test(val)) {
                return parseFloat(val);
            }

            return (!!(a[2]) || (el.getStyle('position') == 'absolute' && !!(a[3]))) ? el.dom['offset' + a[0].charAt(0).toUpperCase() + a[0].substr(1)] : 0;
        },


        getDefaultUnit: function(attr) {
            return defaultUnit.test(attr) ? 'px' : '';
        },

        animateX : function(callback, scope) {
            var me = this,
                f = function() {
                me.onComplete.removeListener(f);
                if (Ext.isFunction(callback)) {
                    callback.call(scope || me, me);
                }
            };
            me.onComplete.addListener(f, me);
            me.animate();
        },


        setRunAttr: function(attr) {            
            var me = this,
                a = this.attributes[attr],
                to = a.to,
                by = a.by,
                from = a.from,
                unit = a.unit,
                ra = (this.runAttrs[attr] = {}),
                end;

            if (!isset(to) && !isset(by)){
                return false;
            }

            var start = isset(from) ? from : me.getAttr(attr);
            if (isset(to)) {
                end = to;
            }else if(isset(by)) {
                if (Ext.isArray(start)){
                    end = [];
					for(var i=0,len=start.length; i<len; i++) {
						end[i] = start[i] + by[i];
					}
                }else{
                    end = start + by;
                }
            }

            Ext.apply(ra, {
                start: start,
                end: end,
                unit: isset(unit) ? unit : me.getDefaultUnit(attr)
            });
        },


        init: function(el, attributes, duration, method) {
            var me = this,
                actualFrames = 0,
                mgr = EXTLIB.AnimMgr;
                
            Ext.apply(me, {
                isAnimated: false,
                startTime: null,
                el: Ext.getDom(el),
                attributes: attributes || {},
                duration: duration || 1,
                method: method || EXTLIB.Easing.easeNone,
                useSec: true,
                curFrame: 0,
                totalFrames: mgr.fps,
                runAttrs: {},
                animate: function(){
                    var me = this,
                        d = me.duration;
                    
                    if(me.isAnimated){
                        return false;
                    }

                    me.curFrame = 0;
                    me.totalFrames = me.useSec ? Math.ceil(mgr.fps * d) : d;
                    mgr.registerElement(me); 
                },
                
                stop: function(finish){
                    var me = this;
                
                    if(finish){
                        me.curFrame = me.totalFrames;
                        me._onTween.fire();
                    }
                    mgr.stop(me);
                }
            });

            var onStart = function(){
                var me = this,
                    attr;
                
                me.onStart.fire();
                me.runAttrs = {};
                for(attr in this.attributes){
                    this.setRunAttr(attr);
                }

                me.isAnimated = true;
                me.startTime = now();
                actualFrames = 0;
            };


            var onTween = function(){
                var me = this;

                me.onTween.fire({
                    duration: now() - me.startTime,
                    curFrame: me.curFrame
                });

                var ra = me.runAttrs;
                for (var attr in ra) {
                    this.setAttr(attr, me.doMethod(attr, ra[attr].start, ra[attr].end), ra[attr].unit);
                }

                ++actualFrames;
            };

            var onComplete = function() {
                var me = this,
                    actual = (now() - me.startTime) / 1000,
                    data = {
                        duration: actual,
                        frames: actualFrames,
                        fps: actualFrames / actual
                    };

                me.isAnimated = false;
                actualFrames = 0;
                me.onComplete.fire(data);
            };

            me.onStart = new Ext.util.Event(me);
            me.onTween = new Ext.util.Event(me);            
            me.onComplete = new Ext.util.Event(me);
            (me._onStart = new Ext.util.Event(me)).addListener(onStart);
            (me._onTween = new Ext.util.Event(me)).addListener(onTween);
            (me._onComplete = new Ext.util.Event(me)).addListener(onComplete); 
        }
    };


    Ext.lib.AnimMgr = new function() {
        var me = this,
            thread = null,
            queue = [],
            tweenCount = 0;


        Ext.apply(me, {
            fps: 1000,
            delay: 1,
            registerElement: function(tween){
                queue.push(tween);
                ++tweenCount;
                tween._onStart.fire();
                me.start();
            },
            
            unRegister: function(tween, index){
                tween._onComplete.fire();
                index = index || getIndex(tween);
                if (index != -1) {
                    queue.splice(index, 1);
                }

                if (--tweenCount <= 0) {
                    me.stop();
                }
            },
            
            start: function(){
                if(thread === null){
                    thread = setInterval(me.run, me.delay);
                }
            },
            
            stop: function(tween){
                if(!tween){
                    clearInterval(thread);
                    for(var i = 0, len = queue.length; i < len; ++i){
                        if(queue[0].isAnimated){
                            me.unRegister(queue[0], 0);
                        }
                    }

                    queue = [];
                    thread = null;
                    tweenCount = 0;
                }else{
                    me.unRegister(tween);
                }
            },
            
            run: function(){
                var tf, i, len, tween;
                for(i = 0, len = queue.length; i<len; i++) {
                    tween = queue[i];
                    if(tween && tween.isAnimated){
                        tf = tween.totalFrames;
                        if(tween.curFrame < tf || tf === null){
                            ++tween.curFrame;
                            if(tween.useSec){
                                correctFrame(tween);
                            }
                            tween._onTween.fire();
                        }else{
                            me.stop(tween);
                        }
                    }                   
                }
            }
        });

        var getIndex = function(anim) {
            var i, len;
            for(i = 0, len = queue.length; i<len; i++) {
                if(queue[i] === anim) {
                    return i;
                }
            }
            return -1;
        };

        var correctFrame = function(tween) {
            var frames = tween.totalFrames,
                frame = tween.curFrame,
                duration = tween.duration,
                expected = (frame * duration * 1000 / frames),
                elapsed = (now() - tween.startTime),
                tweak = 0;

            if(elapsed < duration * 1000){
                tweak = Math.round((elapsed / expected - 1) * frame);
            }else{
                tweak = frames - (frame + 1);
            }
            if(tweak > 0 && isFinite(tweak)){
                if(tween.curFrame + tweak >= frames){
                    tweak = frames - (frame + 1);
                }
                tween.curFrame += tweak;
            }
        };
    };

    EXTLIB.Bezier = new function() {

        this.getPosition = function(points, t) {
            var n = points.length,
                tmp = [],
                c = 1 - t, 
                i,
                j;

            for (i = 0; i < n; ++i) {
                tmp[i] = [points[i][0], points[i][1]];
            }

            for (j = 1; j < n; ++j) {
                for (i = 0; i < n - j; ++i) {
                    tmp[i][0] = c * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                    tmp[i][1] = c * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];
                }
            }

            return [ tmp[0][0], tmp[0][1] ];

        };
    };


    EXTLIB.Easing = {
        easeNone: function (t, b, c, d) {
            return c * t / d + b;
        },


        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },


        easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        }
    };

    (function() {
        EXTLIB.Motion = function(el, attributes, duration, method) {
            if (el) {
                EXTLIB.Motion.superclass.constructor.call(this, el, attributes, duration, method);
            }
        };

        Ext.extend(EXTLIB.Motion, Ext.lib.AnimBase);

        var superclass = EXTLIB.Motion.superclass,
            proto = EXTLIB.Motion.prototype,
            pointsRe = /^points$/i;

        Ext.apply(EXTLIB.Motion.prototype, {
            setAttr: function(attr, val, unit){
                var me = this,
                    setAttr = superclass.setAttr;
                    
                if (pointsRe.test(attr)) {
                    unit = unit || 'px';
                    setAttr.call(me, 'left', val[0], unit);
                    setAttr.call(me, 'top', val[1], unit);
                } else {
                    setAttr.call(me, attr, val, unit);
                }
            },
            
            getAttr: function(attr){
                var me = this,
                    getAttr = superclass.getAttr;
                    
                return pointsRe.test(attr) ? [getAttr.call(me, 'left'), getAttr.call(me, 'top')] : getAttr.call(me, attr);
            },
            
            doMethod: function(attr, start, end){
                var me = this;
                
                return pointsRe.test(attr)
                        ? EXTLIB.Bezier.getPosition(me.runAttrs[attr], me.method(me.curFrame, 0, 100, me.totalFrames) / 100)
                        : superclass.doMethod.call(me, attr, start, end);
            },
            
            setRunAttr: function(attr){
                if(pointsRe.test(attr)){
                    
                    var me = this,
                        el = this.el,
                        points = this.attributes.points,
                        control = points.control || [],
                        from = points.from,
                        to = points.to,
                        by = points.by,
                        DOM = EXTLIB.Dom,
                        start,
                        i,
                        end,
                        len,
                        ra;
                  

                    if(control.length > 0 && !Ext.isArray(control[0])){
                        control = [control];
                    }else{
                        
                    }

                    Ext.fly(el, '_anim').position();
                    DOM.setXY(el, isset(from) ? from : DOM.getXY(el));
                    start = me.getAttr('points');


                    if(isset(to)){
                        end = translateValues.call(me, to, start);
                        for (i = 0,len = control.length; i < len; ++i) {
                            control[i] = translateValues.call(me, control[i], start);
                        }
                    } else if (isset(by)) {
                        end = [start[0] + by[0], start[1] + by[1]];

                        for (i = 0,len = control.length; i < len; ++i) {
                            control[i] = [ start[0] + control[i][0], start[1] + control[i][1] ];
                        }
                    }

                    ra = this.runAttrs[attr] = [start];
                    if (control.length > 0) {
                        ra = ra.concat(control);
                    }

                    ra[ra.length] = end;
                }else{
                    superclass.setRunAttr.call(this, attr);
                }
            }
        });

        var translateValues = function(val, start) {
            var pageXY = EXTLIB.Dom.getXY(this.el);
            return [val[0] - pageXY[0] + start[0], val[1] - pageXY[1] + start[1]];
        };
    })();
})();
(function(){
	
	var abs = Math.abs,
	 	pi = Math.PI,
	 	asin = Math.asin,
	 	pow = Math.pow,
	 	sin = Math.sin,
		EXTLIB = Ext.lib;
	 	
    Ext.apply(EXTLIB.Easing, {
        
        easeBoth: function (t, b, c, d) {
	        return ((t /= d / 2) < 1)  ?  c / 2 * t * t + b  :  -c / 2 * ((--t) * (t - 2) - 1) + b;               
        },
        
        easeInStrong: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },

        easeOutStrong: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },

        easeBothStrong: function (t, b, c, d) {
            return ((t /= d / 2) < 1)  ?  c / 2 * t * t * t * t + b  :  -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },

        elasticIn: function (t, b, c, d, a, p) {
	        if (t == 0 || (t /= d) == 1) {
                return t == 0 ? b : b + c;
            }	            
            p = p || (d * .3);	            

			var s;
			if (a >= abs(c)) {
				s = p / (2 * pi) * asin(c / a);
			} else {
				a = c;
				s = p / 4;
			}
	
            return -(a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * pi) / p)) + b;
            	      
        }, 	
	
		elasticOut: function (t, b, c, d, a, p) {
	        if (t == 0 || (t /= d) == 1) {
                return t == 0 ? b : b + c;
            }	            
            p = p || (d * .3);	            

			var s;
			if (a >= abs(c)) {
				s = p / (2 * pi) * asin(c / a);
			} else {
				a = c;
				s = p / 4;
			}
	
            return a * pow(2, -10 * t) * sin((t * d - s) * (2 * pi) / p) + c + b;	 
        }, 	
	
        elasticBoth: function (t, b, c, d, a, p) {
            if (t == 0 || (t /= d / 2) == 2) {
                return t == 0 ? b : b + c;
            }		         	
	            
            p = p || (d * (.3 * 1.5)); 	            

            var s;
            if (a >= abs(c)) {
	            s = p / (2 * pi) * asin(c / a);
            } else {
	            a = c;
                s = p / 4;
            }

            return t < 1 ?
            	   	-.5 * (a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * pi) / p)) + b :
                    a * pow(2, -10 * (t -= 1)) * sin((t * d - s) * (2 * pi) / p) * .5 + c + b;
        },

        backIn: function (t, b, c, d, s) {
            s = s ||  1.70158; 	            
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },


        backOut: function (t, b, c, d, s) {
            if (!s) {
                s = 1.70158;
            }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },


        backBoth: function (t, b, c, d, s) {
            s = s || 1.70158; 	            

            return ((t /= d / 2 ) < 1) ?
                    c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b : 	            
            		c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },


        bounceIn: function (t, b, c, d) {
            return c - EXTLIB.Easing.bounceOut(d - t, 0, c, d) + b;
        },


        bounceOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            }
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        },


        bounceBoth: function (t, b, c, d) {
            return (t < d / 2) ?
                   EXTLIB.Easing.bounceIn(t * 2, 0, c, d) * .5 + b : 
            	   EXTLIB.Easing.bounceOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    });
})();

(function() {
    var EXTLIB = Ext.lib;
	
	EXTLIB.Anim.color = function(el, args, duration, easing, cb, scope) {
	    return EXTLIB.Anim.run(el, args, duration, easing, cb, scope, EXTLIB.ColorAnim);
	}
	
    EXTLIB.ColorAnim = function(el, attributes, duration, method) {
        EXTLIB.ColorAnim.superclass.constructor.call(this, el, attributes, duration, method);
    };

    Ext.extend(EXTLIB.ColorAnim, EXTLIB.AnimBase);

    var superclass = EXTLIB.ColorAnim.superclass,
    	colorRE = /color$/i,
    	transparentRE = /^transparent|rgba\(0, 0, 0, 0\)$/,
        rgbRE = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
        hexRE= /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
        hex3RE = /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i,
        isset = function(v){
            return typeof v !== 'undefined';
        }
         	
   	
    function parseColor(s) {	
        var pi = parseInt,
            base,
            out = null,
            c;
        
	    if (s.length == 3) {
            return s;
        }
		
        Ext.each([hexRE, rgbRE, hex3RE], function(re, idx){
            base = (idx % 2 == 0) ? 16 : 10;
            c = re.exec(s);
            if(c && c.length == 4){
                out = [pi(c[1], base), pi(c[2], base), pi(c[3], base)];
                return false;
            }
        });
        return out;
    }	

    Ext.apply(EXTLIB.ColorAnim.prototype, {
        getAttr : function(attr) {
            var me = this,
                el = me.el,
                val;                
            if(colorRE.test(attr)){
                while(el && transparentRE.test(val = Ext.fly(el).getStyle(attr))){
                    el = el.parentNode;
                    val = "fff";
                }
            }else{
                val = superclass.getAttr.call(me, attr);
            }
            return val;
        },

        doMethod : function(attr, start, end) {
            var me = this,
            	val,
            	floor = Math.floor,
				i, 
                len,
                v;            

            if(colorRE.test(attr)){
                val = [];
				
				for(i = 0, len = start.length; i < len; i++) {
					v = start[i];
					val[i] = superclass.doMethod.call(me, attr, v, end[i]);
				}
                val = 'rgb(' + floor(val[0]) + ',' + floor(val[1]) + ',' + floor(val[2]) + ')';
            }else{
                val = superclass.doMethod.call(me, attr, start, end);
            }
            return val;
        },

        setRunAttr : function(attr) {
            var me = this,
                a = me.attributes[attr],
                to = a.to,
                by = a.by,
                ra;
                
            superclass.setRunAttr.call(me, attr);
            ra = me.runAttrs[attr];
            if(colorRE.test(attr)){
                var start = parseColor(ra.start),
                    end = parseColor(ra.end);

                if(!isset(to) && isset(by)){
                    end = parseColor(by);
					for(var i=0,len=start.length; i<len; i++) {
						end[i] = start[i] + end[i];
					}
                }
                ra.start = start;
                ra.end = end;
            }
        }
	});
})();	

	
(function() {
	    
    var EXTLIB = Ext.lib;
	EXTLIB.Anim.scroll = function(el, args, duration, easing, cb, scope) {	        
	    return EXTLIB.Anim.run(el, args, duration, easing, cb, scope, EXTLIB.Scroll);
	}
	
    EXTLIB.Scroll = function(el, attributes, duration, method) {
        if(el){
            EXTLIB.Scroll.superclass.constructor.call(this, el, attributes, duration, method);
        }
    };

    Ext.extend(EXTLIB.Scroll, EXTLIB.ColorAnim);

    var superclass = EXTLIB.Scroll.superclass,
    	SCROLL = 'scroll';

    Ext.apply(EXTLIB.Scroll.prototype, {

        doMethod : function(attr, start, end) {
            var val,
            	me = this,
            	curFrame = me.curFrame,
            	totalFrames = me.totalFrames;

            if(attr == SCROLL){
                val = [me.method(curFrame, start[0], end[0] - start[0], totalFrames),
                       me.method(curFrame, start[1], end[1] - start[1], totalFrames)];
            }else{
                val = superclass.doMethod.call(me, attr, start, end);
            }
            return val;
        },

        getAttr : function(attr) {
            var me = this;

            if (attr == SCROLL) {
                return [me.el.scrollLeft, me.el.scrollTop];
            }else{
                return superclass.getAttr.call(me, attr);
            }
        },

        setAttr : function(attr, val, unit) {
            var me = this;

            if(attr == SCROLL){
                me.el.scrollLeft = val[0];
                me.el.scrollTop = val[1];
            }else{
                superclass.setAttr.call(me, attr, val, unit);
            }
        }
    });
})();	
	if(Ext.isIE) {
        function fnCleanUp() {
            var p = Function.prototype;
            delete p.createSequence;
            delete p.defer;
            delete p.createDelegate;
            delete p.createCallback;
            delete p.createInterceptor;

            window.detachEvent("onunload", fnCleanUp);
        }
        window.attachEvent("onunload", fnCleanUp);
    }
})();(function(){

var EXTUTIL = Ext.util,
    TOARRAY = Ext.toArray,
    EACH = Ext.each,
    ISOBJECT = Ext.isObject,
    TRUE = true,
    FALSE = false;

EXTUTIL.Observable = function(){
    
    var me = this, e = me.events;
    if(me.listeners){
        me.on(me.listeners);
        delete me.listeners;
    }
    me.events = e || {};
};

EXTUTIL.Observable.prototype = {
    
    filterOptRe : /^(?:scope|delay|buffer|single)$/,

    
    fireEvent : function(){
        var a = TOARRAY(arguments),
            ename = a[0].toLowerCase(),
            me = this,
            ret = TRUE,
            ce = me.events[ename],
            q,
            c;
        if (me.eventsSuspended === TRUE) {
            if (q = me.eventQueue) {
                q.push(a);
            }
        }
        else if(ISOBJECT(ce) && ce.bubble){
            if(ce.fire.apply(ce, a.slice(1)) === FALSE) {
                return FALSE;
            }
            c = me.getBubbleTarget && me.getBubbleTarget();
            if(c && c.enableBubble) {
                if(!c.events[ename] || !Ext.isObject(c.events[ename]) || !c.events[ename].bubble) {
                    c.enableBubble(ename);
                }
                return c.fireEvent.apply(c, a);
            }
        }
        else {
            if (ISOBJECT(ce)) {
                a.shift();
                ret = ce.fire.apply(ce, a);
            }
        }
        return ret;
    },

    
    addListener : function(eventName, fn, scope, o){
        var me = this,
            e,
            oe,
            isF,
        ce;
        if (ISOBJECT(eventName)) {
            o = eventName;
            for (e in o){
                oe = o[e];
                if (!me.filterOptRe.test(e)) {
                    me.addListener(e, oe.fn || oe, oe.scope || o.scope, oe.fn ? oe : o);
                }
            }
        } else {
            eventName = eventName.toLowerCase();
            ce = me.events[eventName] || TRUE;
            if (Ext.isBoolean(ce)) {
                me.events[eventName] = ce = new EXTUTIL.Event(me, eventName);
            }
            ce.addListener(fn, scope, ISOBJECT(o) ? o : {});
        }
    },

    
    removeListener : function(eventName, fn, scope){
        var ce = this.events[eventName.toLowerCase()];
        if (ISOBJECT(ce)) {
            ce.removeListener(fn, scope);
        }
    },

    
    purgeListeners : function(){
        var events = this.events,
            evt,
            key;
        for(key in events){
            evt = events[key];
            if(ISOBJECT(evt)){
                evt.clearListeners();
            }
        }
    },

    
    addEvents : function(o){
        var me = this;
        me.events = me.events || {};
        if (Ext.isString(o)) {
            var a = arguments,
                i = a.length;
            while(i--) {
                me.events[a[i]] = me.events[a[i]] || TRUE;
            }
        } else {
            Ext.applyIf(me.events, o);
        }
    },

    
    hasListener : function(eventName){
        var e = this.events[eventName];
        return ISOBJECT(e) && e.listeners.length > 0;
    },

    
    suspendEvents : function(queueSuspended){
        this.eventsSuspended = TRUE;
        if(queueSuspended && !this.eventQueue){
            this.eventQueue = [];
        }
    },

    
    resumeEvents : function(){
        var me = this,
            queued = me.eventQueue || [];
        me.eventsSuspended = FALSE;
        delete me.eventQueue;
        EACH(queued, function(e) {
            me.fireEvent.apply(me, e);
        });
    }
};

var OBSERVABLE = EXTUTIL.Observable.prototype;

OBSERVABLE.on = OBSERVABLE.addListener;

OBSERVABLE.un = OBSERVABLE.removeListener;


EXTUTIL.Observable.releaseCapture = function(o){
    o.fireEvent = OBSERVABLE.fireEvent;
};

function createTargeted(h, o, scope){
    return function(){
        if(o.target == arguments[0]){
            h.apply(scope, TOARRAY(arguments));
        }
    };
};

function createBuffered(h, o, l, scope){
    l.task = new EXTUTIL.DelayedTask();
    return function(){
        l.task.delay(o.buffer, h, scope, TOARRAY(arguments));
    };
};

function createSingle(h, e, fn, scope){
    return function(){
        e.removeListener(fn, scope);
        return h.apply(scope, arguments);
    };
};

function createDelayed(h, o, l, scope){
    return function(){
        var task = new EXTUTIL.DelayedTask();
        if(!l.tasks) {
            l.tasks = [];
        }
        l.tasks.push(task);
        task.delay(o.delay || 10, h, scope, TOARRAY(arguments));
    };
};

EXTUTIL.Event = function(obj, name){
    this.name = name;
    this.obj = obj;
    this.listeners = [];
};

EXTUTIL.Event.prototype = {
    addListener : function(fn, scope, options){
        var me = this,
            l;
        scope = scope || me.obj;
        if(!me.isListening(fn, scope)){
            l = me.createListener(fn, scope, options);
            if(me.firing){ 
                me.listeners = me.listeners.slice(0);
            }
            me.listeners.push(l);
        }
    },

    createListener: function(fn, scope, o){
        o = o || {}, scope = scope || this.obj;
        var l = {
            fn: fn,
            scope: scope,
            options: o
        }, h = fn;
        if(o.target){
            h = createTargeted(h, o, scope);
        }
        if(o.delay){
            h = createDelayed(h, o, l, scope);
        }
        if(o.single){
            h = createSingle(h, this, fn, scope);
        }
        if(o.buffer){
            h = createBuffered(h, o, l, scope);
        }
        l.fireFn = h;
        return l;
    },

    findListener : function(fn, scope){
        var list = this.listeners,
            i = list.length,
            l,
            s;
        while(i--) {
            l = list[i];
            if(l) {
                s = l.scope;
                if(l.fn == fn && (s == scope || s == this.obj)){
                    return i;
                }
            }
        }
        return -1;
    },

    isListening : function(fn, scope){
        return this.findListener(fn, scope) != -1;
    },

    removeListener : function(fn, scope){
        var index,
            l,
            k,
            me = this,
            ret = FALSE;
        if((index = me.findListener(fn, scope)) != -1){
            if (me.firing) {
                me.listeners = me.listeners.slice(0);
            }
            l = me.listeners[index];
            if(l.task) {
                l.task.cancel();
                delete l.task;
            }
            k = l.tasks && l.tasks.length;
            if(k) {
                while(k--) {
                    l.tasks[k].cancel();
                }
                delete l.tasks;
            }
            me.listeners.splice(index, 1);
            ret = TRUE;
        }
        return ret;
    },

    
    clearListeners : function(){
        var me = this,
            l = me.listeners,
            i = l.length;
        while(i--) {
            me.removeListener(l[i].fn, l[i].scope);
        }
    },

    fire : function(){
        var me = this,
            args = TOARRAY(arguments),
            listeners = me.listeners,
            len = listeners.length,
            i = 0,
            l;

        if(len > 0){
            me.firing = TRUE;
            for (; i < len; i++) {
                l = listeners[i];
                if(l && l.fireFn.apply(l.scope || me.obj || window, args) === FALSE) {
                    return (me.firing = FALSE);
                }
            }
        }
        me.firing = FALSE;
        return TRUE;
    }
};
})();
Ext.DomHelper = function(){
    var tempTableEl = null,
        emptyTags = /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
        tableRe = /^table|tbody|tr|td$/i,
        pub,
        
        afterbegin = 'afterbegin',
        afterend = 'afterend',
        beforebegin = 'beforebegin',
        beforeend = 'beforeend',
        ts = '<table>',
        te = '</table>',
        tbs = ts+'<tbody>',
        tbe = '</tbody>'+te,
        trs = tbs + '<tr>',
        tre = '</tr>'+tbe;

    
    function doInsert(el, o, returnElement, pos, sibling, append){
        var newNode = pub.insertHtml(pos, Ext.getDom(el), createHtml(o));
        return returnElement ? Ext.get(newNode, true) : newNode;
    }

    
    function createHtml(o){
        var b = '',
            attr,
            val,
            key,
            keyVal,
            cn;

        if(Ext.isString(o)){
            b = o;
        } else if (Ext.isArray(o)) {
            for (var i=0; i < o.length; i++) {
                if(o[i]) {
                    b += createHtml(o[i]);
                }
            };
        } else {
            b += '<' + (o.tag = o.tag || 'div');
            Ext.iterate(o, function(attr, val){
                if(!/tag|children|cn|html$/i.test(attr)){
                    if (Ext.isObject(val)) {
                        b += ' ' + attr + '="';
                        Ext.iterate(val, function(key, keyVal){
                            b += key + ':' + keyVal + ';';
                        });
                        b += '"';
                    }else{
                        b += ' ' + ({cls : 'class', htmlFor : 'for'}[attr] || attr) + '="' + val + '"';
                    }
                }
            });
            
            if (emptyTags.test(o.tag)) {
                b += '/>';
            } else {
                b += '>';
                if ((cn = o.children || o.cn)) {
                    b += createHtml(cn);
                } else if(o.html){
                    b += o.html;
                }
                b += '</' + o.tag + '>';
            }
        }
        return b;
    }

    function ieTable(depth, s, h, e){
        tempTableEl.innerHTML = [s, h, e].join('');
        var i = -1,
            el = tempTableEl,
            ns;
        while(++i < depth){
            el = el.firstChild;
        }

        if(ns = el.nextSibling){
            var df = document.createDocumentFragment();
            while(el){
                ns = el.nextSibling;
                df.appendChild(el);
                el = ns;
            }
            el = df;
        }
        return el;
    }

    
    function insertIntoTable(tag, where, el, html) {
        var node,
            before;

        tempTableEl = tempTableEl || document.createElement('div');

        if(tag == 'td' && (where == afterbegin || where == beforeend) ||
           !/td|tr|tbody/i.test(tag) && (where == beforebegin || where == afterend)) {
            return;
        }
        before = where == beforebegin ? el :
                 where == afterend ? el.nextSibling :
                 where == afterbegin ? el.firstChild : null;

        if (where == beforebegin || where == afterend) {
            el = el.parentNode;
        }

        if (tag == 'td' || (tag == 'tr' && (where == beforeend || where == afterbegin))) {
            node = ieTable(4, trs, html, tre);
        } else if ((tag == 'tbody' && (where == beforeend || where == afterbegin)) ||
                   (tag == 'tr' && (where == beforebegin || where == afterend))) {
            node = ieTable(3, tbs, html, tbe);
        } else {
            node = ieTable(2, ts, html, te);
        }
        el.insertBefore(node, before);
        return node;
    }


    pub = {
        
        markup : function(o){
            return createHtml(o);
        },
        
        
        applyStyles : function(el, styles){
            if(styles){
                var i = 0,
                    len,
                    style;

                el = Ext.fly(el);
                if(Ext.isFunction(styles)){
                    styles = styles.call();
                }
                if(Ext.isString(styles)){
                    styles = styles.trim().split(/\s*(?::|;)\s*/);
                    for(len = styles.length; i < len;){
                        el.setStyle(styles[i++], styles[i++]);
                    }
                }else if (Ext.isObject(styles)){
                    el.setStyle(styles);
                }
            }
        },

        
        insertHtml : function(where, el, html){
            var hash = {},
                hashVal,
                setStart,
                range,
                frag,
                rangeEl,
                rs;

            where = where.toLowerCase();
            
            hash[beforebegin] = ['BeforeBegin', 'previousSibling'];
            hash[afterend] = ['AfterEnd', 'nextSibling'];

            if (el.insertAdjacentHTML) {
                if(tableRe.test(el.tagName) && (rs = insertIntoTable(el.tagName.toLowerCase(), where, el, html))){
                    return rs;
                }
                
                hash[afterbegin] = ['AfterBegin', 'firstChild'];
                hash[beforeend] = ['BeforeEnd', 'lastChild'];
                if ((hashVal = hash[where])) {
                    el.insertAdjacentHTML(hashVal[0], html);
                    return el[hashVal[1]];
                }
            } else {
                range = el.ownerDocument.createRange();
                setStart = 'setStart' + (/end/i.test(where) ? 'After' : 'Before');
                if (hash[where]) {
                    range[setStart](el);
                    frag = range.createContextualFragment(html);
                    el.parentNode.insertBefore(frag, where == beforebegin ? el : el.nextSibling);
                    return el[(where == beforebegin ? 'previous' : 'next') + 'Sibling'];
                } else {
                    rangeEl = (where == afterbegin ? 'first' : 'last') + 'Child';
                    if (el.firstChild) {
                        range[setStart](el[rangeEl]);
                        frag = range.createContextualFragment(html);
                        if(where == afterbegin){
                            el.insertBefore(frag, el.firstChild);
                        }else{
                            el.appendChild(frag);
                        }
                    } else {
                        el.innerHTML = html;
                    }
                    return el[rangeEl];
                }
            }
            throw 'Illegal insertion point -> "' + where + '"';
        },

        
        insertBefore : function(el, o, returnElement){
            return doInsert(el, o, returnElement, beforebegin);
        },

        
        insertAfter : function(el, o, returnElement){
            return doInsert(el, o, returnElement, afterend, 'nextSibling');
        },

        
        insertFirst : function(el, o, returnElement){
            return doInsert(el, o, returnElement, afterbegin, 'firstChild');
        },

        
        append : function(el, o, returnElement){
            return doInsert(el, o, returnElement, beforeend, '', true);
        },

        
        overwrite : function(el, o, returnElement){
            el = Ext.getDom(el);
            el.innerHTML = createHtml(o);
            return returnElement ? Ext.get(el.firstChild) : el.firstChild;
        },

        createHtml : createHtml
    };
    return pub;
}();
Ext.Template = function(html){
    var me = this,
    	a = arguments,
    	buf = [];

    if (Ext.isArray(html)) {
        html = html.join("");
    } else if (a.length > 1) {
	    Ext.each(a, function(v) {
            if (Ext.isObject(v)) {
                Ext.apply(me, v);
            } else {
                buf.push(v);
            }
        });
        html = buf.join('');
    }

    
    me.html = html;
    
    if (me.compiled) {
        me.compile();
    }
};
Ext.Template.prototype = {
    
    re : /\{([\w-]+)\}/g,
    

    
    applyTemplate : function(values){
		var me = this;

        return me.compiled ?
        		me.compiled(values) :
				me.html.replace(me.re, function(m, name){
		        	return values[name] !== undefined ? values[name] : "";
		        });
	},

    
    set : function(html, compile){
	    var me = this;
        me.html = html;
        me.compiled = null;
        return compile ? me.compile() : me;
    },

    
    compile : function(){
        var me = this,
        	sep = Ext.isGecko ? "+" : ",";

        function fn(m, name){                        
	        name = "values['" + name + "']";
	        return "'"+ sep + '(' + name + " == undefined ? '' : " + name + ')' + sep + "'";
        }
                
        eval("this.compiled = function(values){ return " + (Ext.isGecko ? "'" : "['") +
             me.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn) +
             (Ext.isGecko ?  "';};" : "'].join('');};"));
        return me;
    },

    
    insertFirst: function(el, values, returnElement){
        return this.doInsert('afterBegin', el, values, returnElement);
    },

    
    insertBefore: function(el, values, returnElement){
        return this.doInsert('beforeBegin', el, values, returnElement);
    },

    
    insertAfter : function(el, values, returnElement){
        return this.doInsert('afterEnd', el, values, returnElement);
    },

    
    append : function(el, values, returnElement){
        return this.doInsert('beforeEnd', el, values, returnElement);
    },

    doInsert : function(where, el, values, returnEl){
        el = Ext.getDom(el);
        var newNode = Ext.DomHelper.insertHtml(where, el, this.applyTemplate(values));
        return returnEl ? Ext.get(newNode, true) : newNode;
    },

    
    overwrite : function(el, values, returnElement){
        el = Ext.getDom(el);
        el.innerHTML = this.applyTemplate(values);
        return returnElement ? Ext.get(el.firstChild, true) : el.firstChild;
    }
};

Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;


Ext.Template.from = function(el, config){
    el = Ext.getDom(el);
    return new Ext.Template(el.value || el.innerHTML, config || '');
};

Ext.DomQuery = function(){
    var cache = {}, 
    	simpleCache = {}, 
    	valueCache = {},
    	nonSpace = /\S/,
    	trimRe = /^\s+|\s+$/g,
    	tplRe = /\{(\d+)\}/g,
    	modeRe = /^(\s?[\/>+~]\s?|\s|$)/,
    	tagTokenRe = /^(#)?([\w-\*]+)/,
    	nthRe = /(\d*)n\+?(\d*)/, 
    	nthRe2 = /\D/,
    	
	    
	    
	    isIE = window.ActiveXObject ? true : false,
	    key = 30803;
	    
    
	
	eval("var batch = 30803;");    	

    function child(p, index){
        var i = 0,
        	n = p.firstChild;
        while(n){
            if(n.nodeType == 1){
               if(++i == index){
                   return n;
               }
            }
            n = n.nextSibling;
        }
        return null;
    };

    function next(n){
        while((n = n.nextSibling) && n.nodeType != 1);
        return n;
    };

    function prev(n){
        while((n = n.previousSibling) && n.nodeType != 1);
        return n;
    };

    function children(d){
        var n = d.firstChild, ni = -1,
        	nx;
 	    while(n){
 	        nx = n.nextSibling;
 	        if(n.nodeType == 3 && !nonSpace.test(n.nodeValue)){
 	            d.removeChild(n);
 	        }else{
 	            n.nodeIndex = ++ni;
 	        }
 	        n = nx;
 	    }
 	    return this;
 	};

    function byClassName(c, a, v){
        if(!v){
            return c;
        }
        var r = [], ri = -1, cn;
        for(var i = 0, ci; ci = c[i]; i++){
            if((' '+ci.className+' ').indexOf(v) != -1){
                r[++ri] = ci;
            }
        }
        return r;
    };

    function attrValue(n, attr){
        if(!n.tagName && typeof n.length != "undefined"){
            n = n[0];
        }
        if(!n){
            return null;
        }
        if(attr == "for"){
            return n.htmlFor;
        }
        if(attr == "class" || attr == "className"){
            return n.className;
        }
        return n.getAttribute(attr) || n[attr];

    };

    function getNodes(ns, mode, tagName){
        var result = [], ri = -1, cs;
        if(!ns){
            return result;
        }
        tagName = tagName || "*";
        if(typeof ns.getElementsByTagName != "undefined"){
            ns = [ns];
        }
        if(!mode){
            for(var i = 0, ni; ni = ns[i]; i++){
                cs = ni.getElementsByTagName(tagName);
                for(var j = 0, ci; ci = cs[j]; j++){
                    result[++ri] = ci;
                }
            }
        }else if(mode == "/" || mode == ">"){
            var utag = tagName.toUpperCase();
            for(var i = 0, ni, cn; ni = ns[i]; i++){
                cn = ni.childNodes;
                for(var j = 0, cj; cj = cn[j]; j++){
                    if(cj.nodeName == utag || cj.nodeName == tagName  || tagName == '*'){
                        result[++ri] = cj;
                    }
                }
            }
        }else if(mode == "+"){
            var utag = tagName.toUpperCase();
            for(var i = 0, n; n = ns[i]; i++){
                while((n = n.nextSibling) && n.nodeType != 1);
                if(n && (n.nodeName == utag || n.nodeName == tagName || tagName == '*')){
                    result[++ri] = n;
                }
            }
        }else if(mode == "~"){
            var utag = tagName.toUpperCase();
            for(var i = 0, n; n = ns[i]; i++){
                while((n = n.nextSibling)){
                    if (n.nodeName == utag || n.nodeName == tagName || tagName == '*'){
                        result[++ri] = n;
                    }
                }
            }
        }
        return result;
    };

    function concat(a, b){
        if(b.slice){
            return a.concat(b);
        }
        for(var i = 0, l = b.length; i < l; i++){
            a[a.length] = b[i];
        }
        return a;
    }

    function byTag(cs, tagName){
        if(cs.tagName || cs == document){
            cs = [cs];
        }
        if(!tagName){
            return cs;
        }
        var r = [], ri = -1;
        tagName = tagName.toLowerCase();
        for(var i = 0, ci; ci = cs[i]; i++){
            if(ci.nodeType == 1 && ci.tagName.toLowerCase()==tagName){
                r[++ri] = ci;
            }
        }
        return r;
    };

    function byId(cs, attr, id){
        if(cs.tagName || cs == document){
            cs = [cs];
        }
        if(!id){
            return cs;
        }
        var r = [], ri = -1;
        for(var i = 0,ci; ci = cs[i]; i++){
            if(ci && ci.id == id){
                r[++ri] = ci;
                return r;
            }
        }
        return r;
    };

    function byAttribute(cs, attr, value, op, custom){
        var r = [], 
            ri = -1, 
            st = custom=="{",
            f = Ext.DomQuery.operators[op],
            a,
            ih;
        for(var i = 0, ci; ci = cs[i]; i++){
            if(ci.nodeType != 1){
                continue;
            }
            ih = ci.innerHTML;
            
            if(ih !== null && ih !== undefined){
                if(st){
                    a = Ext.DomQuery.getStyle(ci, attr);
                }else if(attr == "class" || attr == "className"){
                    a = ci.className;
                }else if(attr == "for"){
                    a = ci.htmlFor;
                }else if(attr == "href"){
                    a = ci.getAttribute("href", 2);
                }else{
                    a = ci.getAttribute(attr);
                }
            }else{
                a = ci.getAttribute(attr);
            }
            if((f && f(a, value)) || (!f && a)){
                r[++ri] = ci;
            }
        }
        return r;
    };

    function byPseudo(cs, name, value){
        return Ext.DomQuery.pseudos[name](cs, value);
    };

    function nodupIEXml(cs){
        var d = ++key, 
        	r;
        cs[0].setAttribute("_nodup", d);
        r = [cs[0]];
        for(var i = 1, len = cs.length; i < len; i++){
            var c = cs[i];
            if(!c.getAttribute("_nodup") != d){
                c.setAttribute("_nodup", d);
                r[r.length] = c;
            }
        }
        for(var i = 0, len = cs.length; i < len; i++){
            cs[i].removeAttribute("_nodup");
        }
        return r;
    }

    function nodup(cs){
        if(!cs){
            return [];
        }
        var len = cs.length, c, i, r = cs, cj, ri = -1;
        if(!len || typeof cs.nodeType != "undefined" || len == 1){
            return cs;
        }
        if(isIE && typeof cs[0].selectSingleNode != "undefined"){
            return nodupIEXml(cs);
        }
        var d = ++key;
        cs[0]._nodup = d;
        for(i = 1; c = cs[i]; i++){
            if(c._nodup != d){
                c._nodup = d;
            }else{
                r = [];
                for(var j = 0; j < i; j++){
                    r[++ri] = cs[j];
                }
                for(j = i+1; cj = cs[j]; j++){
                    if(cj._nodup != d){
                        cj._nodup = d;
                        r[++ri] = cj;
                    }
                }
                return r;
            }
        }
        return r;
    }

    function quickDiffIEXml(c1, c2){
        var d = ++key,
        	r = [];
        for(var i = 0, len = c1.length; i < len; i++){
            c1[i].setAttribute("_qdiff", d);
        }        
        for(var i = 0, len = c2.length; i < len; i++){
            if(c2[i].getAttribute("_qdiff") != d){
                r[r.length] = c2[i];
            }
        }
        for(var i = 0, len = c1.length; i < len; i++){
           c1[i].removeAttribute("_qdiff");
        }
        return r;
    }

    function quickDiff(c1, c2){
        var len1 = c1.length,
        	d = ++key,
        	r = [];
        if(!len1){
            return c2;
        }
        if(isIE && typeof c1[0].selectSingleNode != "undefined"){
            return quickDiffIEXml(c1, c2);
        }        
        for(var i = 0; i < len1; i++){
            c1[i]._qdiff = d;
        }        
        for(var i = 0, len = c2.length; i < len; i++){
            if(c2[i]._qdiff != d){
                r[r.length] = c2[i];
            }
        }
        return r;
    }

    function quickId(ns, mode, root, id){
        if(ns == root){
           var d = root.ownerDocument || root;
           return d.getElementById(id);
        }
        ns = getNodes(ns, mode, "*");
        return byId(ns, null, id);
    }

    return {
        getStyle : function(el, name){
            return Ext.fly(el).getStyle(name);
        },
        
        compile : function(path, type){
            type = type || "select";

            var fn = ["var f = function(root){\n var mode; ++batch; var n = root || document;\n"],
            	q = path, mode, lq,
            	tk = Ext.DomQuery.matchers,
            	tklen = tk.length,
            	mm,
            	
            	lmode = q.match(modeRe);
            
            if(lmode && lmode[1]){
                fn[fn.length] = 'mode="'+lmode[1].replace(trimRe, "")+'";';
                q = q.replace(lmode[1], "");
            }
            
            while(path.substr(0, 1)=="/"){
                path = path.substr(1);
            }

            while(q && lq != q){
                lq = q;
                var tm = q.match(tagTokenRe);
                if(type == "select"){
                    if(tm){
                        if(tm[1] == "#"){
                            fn[fn.length] = 'n = quickId(n, mode, root, "'+tm[2]+'");';
                        }else{
                            fn[fn.length] = 'n = getNodes(n, mode, "'+tm[2]+'");';
                        }
                        q = q.replace(tm[0], "");
                    }else if(q.substr(0, 1) != '@'){
                        fn[fn.length] = 'n = getNodes(n, mode, "*");';
                    }
                }else{
                    if(tm){
                        if(tm[1] == "#"){
                            fn[fn.length] = 'n = byId(n, null, "'+tm[2]+'");';
                        }else{
                            fn[fn.length] = 'n = byTag(n, "'+tm[2]+'");';
                        }
                        q = q.replace(tm[0], "");
                    }
                }
                while(!(mm = q.match(modeRe))){
                    var matched = false;
                    for(var j = 0; j < tklen; j++){
                        var t = tk[j];
                        var m = q.match(t.re);
                        if(m){
                            fn[fn.length] = t.select.replace(tplRe, function(x, i){
                                                    return m[i];
                                                });
                            q = q.replace(m[0], "");
                            matched = true;
                            break;
                        }
                    }
                    
                    if(!matched){
                        throw 'Error parsing selector, parsing failed at "' + q + '"';
                    }
                }
                if(mm[1]){
                    fn[fn.length] = 'mode="'+mm[1].replace(trimRe, "")+'";';
                    q = q.replace(mm[1], "");
                }
            }
            fn[fn.length] = "return nodup(n);\n}";
            eval(fn.join(""));
            return f;
        },

        
        select : function(path, root, type){
            if(!root || root == document){
                root = document;
            }
            if(typeof root == "string"){
                root = document.getElementById(root);
            }
            var paths = path.split(","),
            	results = [];
            for(var i = 0, len = paths.length; i < len; i++){
                var p = paths[i].replace(trimRe, "");
                if(!cache[p]){
                    cache[p] = Ext.DomQuery.compile(p);
                    if(!cache[p]){
                        throw p + " is not a valid selector";
                    }
                }
                var result = cache[p](root);
                if(result && result != document){
                    results = results.concat(result);
                }
            }
            if(paths.length > 1){
                return nodup(results);
            }
            return results;
        },

        
        selectNode : function(path, root){
            return Ext.DomQuery.select(path, root)[0];
        },

        
        selectValue : function(path, root, defaultValue){
            path = path.replace(trimRe, "");
            if(!valueCache[path]){
                valueCache[path] = Ext.DomQuery.compile(path, "select");
            }
            var n = valueCache[path](root), v;
            n = n[0] ? n[0] : n;
            
            if (typeof n.normalize == 'function') n.normalize();
            
            v = (n && n.firstChild ? n.firstChild.nodeValue : null);
            return ((v === null||v === undefined||v==='') ? defaultValue : v);
        },

        
        selectNumber : function(path, root, defaultValue){
            var v = Ext.DomQuery.selectValue(path, root, defaultValue || 0);
            return parseFloat(v);
        },

        
        is : function(el, ss){
            if(typeof el == "string"){
                el = document.getElementById(el);
            }
            var isArray = Ext.isArray(el),
            	result = Ext.DomQuery.filter(isArray ? el : [el], ss);
            return isArray ? (result.length == el.length) : (result.length > 0);
        },

        
        filter : function(els, ss, nonMatches){
            ss = ss.replace(trimRe, "");
            if(!simpleCache[ss]){
                simpleCache[ss] = Ext.DomQuery.compile(ss, "simple");
            }
            var result = simpleCache[ss](els);
            return nonMatches ? quickDiff(result, els) : result;
        },

        
        matchers : [{
                re: /^\.([\w-]+)/,
                select: 'n = byClassName(n, null, " {1} ");'
            }, {
                re: /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
                select: 'n = byPseudo(n, "{1}", "{2}");'
            },{
                re: /^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
                select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
            }, {
                re: /^#([\w-]+)/,
                select: 'n = byId(n, null, "{1}");'
            },{
                re: /^@([\w-]+)/,
                select: 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
            }
        ],

        
        operators : {
            "=" : function(a, v){
                return a == v;
            },
            "!=" : function(a, v){
                return a != v;
            },
            "^=" : function(a, v){
                return a && a.substr(0, v.length) == v;
            },
            "$=" : function(a, v){
                return a && a.substr(a.length-v.length) == v;
            },
            "*=" : function(a, v){
                return a && a.indexOf(v) !== -1;
            },
            "%=" : function(a, v){
                return (a % v) == 0;
            },
            "|=" : function(a, v){
                return a && (a == v || a.substr(0, v.length+1) == v+'-');
            },
            "~=" : function(a, v){
                return a && (' '+a+' ').indexOf(' '+v+' ') != -1;
            }
        },

        
        pseudos : {
            "first-child" : function(c){
                var r = [], ri = -1, n;
                for(var i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.previousSibling) && n.nodeType != 1);
                    if(!n){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "last-child" : function(c){
                var r = [], ri = -1, n;
                for(var i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.nextSibling) && n.nodeType != 1);
                    if(!n){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nth-child" : function(c, a) {
                var r = [], ri = -1,
                	m = nthRe.exec(a == "even" && "2n" || a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a || a),
                	f = (m[1] || 1) - 0, l = m[2] - 0;
                for(var i = 0, n; n = c[i]; i++){
                    var pn = n.parentNode;
                    if (batch != pn._batch) {
                        var j = 0;
                        for(var cn = pn.firstChild; cn; cn = cn.nextSibling){
                            if(cn.nodeType == 1){
                               cn.nodeIndex = ++j;
                            }
                        }
                        pn._batch = batch;
                    }
                    if (f == 1) {
                        if (l == 0 || n.nodeIndex == l){
                            r[++ri] = n;
                        }
                    } else if ((n.nodeIndex + l) % f == 0){
                        r[++ri] = n;
                    }
                }

                return r;
            },

            "only-child" : function(c){
                var r = [], ri = -1;;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(!prev(ci) && !next(ci)){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "empty" : function(c){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var cns = ci.childNodes, j = 0, cn, empty = true;
                    while(cn = cns[j]){
                        ++j;
                        if(cn.nodeType == 1 || cn.nodeType == 3){
                            empty = false;
                            break;
                        }
                    }
                    if(empty){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "contains" : function(c, v){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if((ci.textContent||ci.innerText||'').indexOf(v) != -1){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nodeValue" : function(c, v){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(ci.firstChild && ci.firstChild.nodeValue == v){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "checked" : function(c){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(ci.checked == true){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "not" : function(c, ss){
                return Ext.DomQuery.filter(c, ss, true);
            },

            "any" : function(c, selectors){
                var ss = selectors.split('|'),
                	r = [], ri = -1, s;
                for(var i = 0, ci; ci = c[i]; i++){
                    for(var j = 0; s = ss[j]; j++){
                        if(Ext.DomQuery.is(ci, s)){
                            r[++ri] = ci;
                            break;
                        }
                    }
                }
                return r;
            },

            "odd" : function(c){
                return this["nth-child"](c, "odd");
            },

            "even" : function(c){
                return this["nth-child"](c, "even");
            },

            "nth" : function(c, a){
                return c[a-1] || [];
            },

            "first" : function(c){
                return c[0] || [];
            },

            "last" : function(c){
                return c[c.length-1] || [];
            },

            "has" : function(c, ss){
                var s = Ext.DomQuery.select,
                	r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(s(ss, ci).length > 0){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "next" : function(c, ss){
                var is = Ext.DomQuery.is,
                	r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var n = next(ci);
                    if(n && is(n, ss)){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "prev" : function(c, ss){
                var is = Ext.DomQuery.is,
                	r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var n = prev(ci);
                    if(n && is(n, ss)){
                        r[++ri] = ci;
                    }
                }
                return r;
            }
        }
    };
}();


Ext.query = Ext.DomQuery.select;

Ext.EventManager = function(){
    var docReadyEvent,
        docReadyProcId,
        docReadyState = false,
        E = Ext.lib.Event,
        D = Ext.lib.Dom,
        DOC = document,
        WINDOW = window,
        IEDEFERED = "ie-deferred-loader",
        DOMCONTENTLOADED = "DOMContentLoaded",
        propRe = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/,
        
        specialElCache = [];

     function getId(el){
        var id = false,
            i = 0,
            len = specialElCache.length,
            id = false,
            skip = false,
            o;
        if(el){
            if(el.getElementById || el.navigator){
                
                for(; i < len; ++i){
                    o = specialElCache[i];
                    if(o.el === el){
                        id = o.id;
                        break;
                    }
                }
                if(!id){
                    
                    id = Ext.id(el);
                    specialElCache.push({
                        id: id,
                        el: el
                    });
                    skip = true;
                }
            }else{
                id = Ext.id(el);
            }
            if(!Ext.elCache[id]){
                Ext.Element.addToCache(new Ext.Element(el), id);
                if(skip){
                    Ext.elCache[id].skipGC = true;
                }
            }
        }
        return id;
     };

    
    function addListener(el, ename, fn, task, wrap, scope){
        el = Ext.getDom(el);
        var id = getId(el),
            es = Ext.elCache[id].events,
            wfn;

        wfn = E.on(el, ename, wrap);
        es[ename] = es[ename] || [];

        
        es[ename].push([fn, wrap, scope, wfn, task]);


        
        
        if(ename == "mousewheel" && el.addEventListener){ 
            var args = ["DOMMouseScroll", wrap, false];
            el.addEventListener.apply(el, args);
            Ext.EventManager.addListener(WINDOW, 'unload', function(){
                el.removeEventListener.apply(el, args);
            });
        }
        if(ename == "mousedown" && el == document){ 
            Ext.EventManager.stoppedMouseDownEvent.addListener(wrap);
        }
    };

    function fireDocReady(){
        if(!docReadyState){
            Ext.isReady = docReadyState = true;
            if(docReadyProcId){
                clearInterval(docReadyProcId);
            }
            if(Ext.isGecko || Ext.isOpera) {
                DOC.removeEventListener(DOMCONTENTLOADED, fireDocReady, false);
            }
            if(Ext.isIE){
                var defer = DOC.getElementById(IEDEFERED);
                if(defer){
                    defer.onreadystatechange = null;
                    defer.parentNode.removeChild(defer);
                }
            }
            if(docReadyEvent){
                docReadyEvent.fire();
                docReadyEvent.listeners = []; 
            }
        }
    };

    function initDocReady(){
        var COMPLETE = "complete";

        docReadyEvent = new Ext.util.Event();
        if (Ext.isGecko || Ext.isOpera) {
            DOC.addEventListener(DOMCONTENTLOADED, fireDocReady, false);
        } else if (Ext.isIE){
            DOC.write("<s"+'cript id=' + IEDEFERED + ' defer="defer" src="/'+'/:"></s'+"cript>");
            DOC.getElementById(IEDEFERED).onreadystatechange = function(){
                if(this.readyState == COMPLETE){
                    fireDocReady();
                }
            };
        } else if (Ext.isWebKit){
            docReadyProcId = setInterval(function(){
                if(DOC.readyState == COMPLETE) {
                    fireDocReady();
                 }
            }, 10);
        }
        
        E.on(WINDOW, "load", fireDocReady);
    };

    function createTargeted(h, o){
        return function(){
            var args = Ext.toArray(arguments);
            if(o.target == Ext.EventObject.setEvent(args[0]).target){
                h.apply(this, args);
            }
        };
    };

    function createBuffered(h, o, task){
        return function(e){
            
            task.delay(o.buffer, h, null, [new Ext.EventObjectImpl(e)]);
        };
    };

    function createSingle(h, el, ename, fn, scope){
        return function(e){
            Ext.EventManager.removeListener(el, ename, fn, scope);
            h(e);
        };
    };

    function createDelayed(h, o, fn){
        return function(e){
            var task = new Ext.util.DelayedTask(h);
            if(!fn.tasks) {
                fn.tasks = [];
            }
            fn.tasks.push(task);
            task.delay(o.delay || 10, h, null, [new Ext.EventObjectImpl(e)]);
        };
    };

    function listen(element, ename, opt, fn, scope){
        var o = !Ext.isObject(opt) ? {} : opt,
            el = Ext.getDom(element), task;

        fn = fn || o.fn;
        scope = scope || o.scope;

        if(!el){
            throw "Error listening for \"" + ename + '\". Element "' + element + '" doesn\'t exist.';
        }
        function h(e){
            
            if(!Ext){
                return;
            }
            e = Ext.EventObject.setEvent(e);
            var t;
            if (o.delegate) {
                if(!(t = e.getTarget(o.delegate, el))){
                    return;
                }
            } else {
                t = e.target;
            }
            if (o.stopEvent) {
                e.stopEvent();
            }
            if (o.preventDefault) {
               e.preventDefault();
            }
            if (o.stopPropagation) {
                e.stopPropagation();
            }
            if (o.normalized) {
                e = e.browserEvent;
            }

            fn.call(scope || el, e, t, o);
        };
        if(o.target){
            h = createTargeted(h, o);
        }
        if(o.delay){
            h = createDelayed(h, o, fn);
        }
        if(o.single){
            h = createSingle(h, el, ename, fn, scope);
        }
        if(o.buffer){
            task = new Ext.util.DelayedTask(h);
            h = createBuffered(h, o, task);
        }

        addListener(el, ename, fn, task, h, scope);
        return h;
    };

    var pub = {
        
        addListener : function(element, eventName, fn, scope, options){
            if(Ext.isObject(eventName)){
                var o = eventName, e, val;
                for(e in o){
                    val = o[e];
                    if(!propRe.test(e)){
                        if(Ext.isFunction(val)){
                            
                            listen(element, e, o, val, o.scope);
                        }else{
                            
                            listen(element, e, val);
                        }
                    }
                }
            } else {
                listen(element, eventName, options, fn, scope);
            }
        },

        
        removeListener : function(el, eventName, fn, scope){
            el = Ext.getDom(el);
            var id = getId(el),
                f = el && (Ext.elCache[id].events)[eventName] || [],
                wrap, i, l, k, wf, len, fnc;

            for (i = 0, len = f.length; i < len; i++) {

                
                if (Ext.isArray(fnc = f[i]) && fnc[0] == fn && (!scope || fnc[2] == scope)) {
                    if(fnc[4]) {
                        fnc[4].cancel();
                    }
                    k = fn.tasks && fn.tasks.length;
                    if(k) {
                        while(k--) {
                            fn.tasks[k].cancel();
                        }
                        delete fn.tasks;
                    }
                    wf = wrap = fnc[1];
                    if (E.extAdapter) {
                        wf = fnc[3];
                    }
                    E.un(el, eventName, wf);
                    f.splice(i,1);
                    if (f.length === 0) {
                        delete Ext.elCache[id].events[eventName];
                    }
                    for (k in Ext.elCache[id].events) {
                        return false;
                    }
                    Ext.elCache[id].events = {};
                    return false;
                }
            }

            
            if(eventName == "mousewheel" && el.addEventListener && wrap){
                el.removeEventListener("DOMMouseScroll", wrap, false);
            }

            if(eventName == "mousedown" && el == DOC && wrap){ 
                Ext.EventManager.stoppedMouseDownEvent.removeListener(wrap);
            }
        },

        
        removeAll : function(el){
            el = Ext.getDom(el);
            var id = getId(el),
                ec = Ext.elCache[id] || {},
                es = ec.events || {},
                f, i, len, ename, fn, k;

            for(ename in es){
                if(es.hasOwnProperty(ename)){
                    f = es[ename];
                    
                    for (i = 0, len = f.length; i < len; i++) {
                        fn = f[i];
                        if(fn[4]) {
                            fn[4].cancel();
                        }
                        if(fn[0].tasks && (k = fn[0].tasks.length)) {
                            while(k--) {
                                fn[0].tasks[k].cancel();
                            }
                            delete fn.tasks;
                        }
                        E.un(el, ename, E.extAdapter ? fn[3] : fn[1]);
                    }
                }
            }
            if (Ext.elCache[id]) {
                Ext.elCache[id].events = {};
            }
        },

        getListeners : function(el, eventName) {
            el = Ext.getDom(el);
            var id = getId(el),
                ec = Ext.elCache[id] || {},
                es = ec.events || {},
                results = [];
            if (es && es[eventName]) {
                return es[eventName];
            } else {
                return null;
            }
        },

        purgeElement : function(el, recurse, eventName) {
            el = Ext.getDom(el);
            var id = getId(el),
                ec = Ext.elCache[id] || {},
                es = ec.events || {},
                i, f, len;
            if (eventName) {
                if (es && es.hasOwnProperty(eventName)) {
                    f = es[eventName];
                    for (i = 0, len = f.length; i < len; i++) {
                        Ext.EventManager.removeListener(el, eventName, f[i][0]);
                    }
                }
            } else {
                Ext.EventManager.removeAll(el);
            }
            if (recurse && el && el.childNodes) {
                for (i = 0, len = el.childNodes.length; i < len; i++) {
                    Ext.EventManager.purgeElement(el.childNodes[i], recurse, eventName);
                }
            }
        },

        _unload : function() {
            var el;
            for (el in Ext.elCache) {
                Ext.EventManager.removeAll(el);
            }
            delete Ext.elCache;
            delete Ext.Element._flyweights;
        },
        
        onDocumentReady : function(fn, scope, options){
            if(docReadyState){ 
                docReadyEvent.addListener(fn, scope, options);
                docReadyEvent.fire();
                docReadyEvent.listeners = []; 
            } else {
                if(!docReadyEvent) initDocReady();
                options = options || {};
                options.delay = options.delay || 1;
                docReadyEvent.addListener(fn, scope, options);
            }
        }
    };
     
    pub.on = pub.addListener;
    
    pub.un = pub.removeListener;

    pub.stoppedMouseDownEvent = new Ext.util.Event();
    return pub;
}();

Ext.onReady = Ext.EventManager.onDocumentReady;



(function(){

    var initExtCss = function(){
        
        var bd = document.body || document.getElementsByTagName('body')[0];
        if(!bd){ return false; }
        var cls = [' ',
                Ext.isIE ? "ext-ie " + (Ext.isIE6 ? 'ext-ie6' : (Ext.isIE7 ? 'ext-ie7' : 'ext-ie8'))
                : Ext.isGecko ? "ext-gecko " + (Ext.isGecko2 ? 'ext-gecko2' : 'ext-gecko3')
                : Ext.isOpera ? "ext-opera"
                : Ext.isWebKit ? "ext-webkit" : ""];

        if(Ext.isSafari){
            cls.push("ext-safari " + (Ext.isSafari2 ? 'ext-safari2' : (Ext.isSafari3 ? 'ext-safari3' : 'ext-safari4')));
        }else if(Ext.isChrome){
            cls.push("ext-chrome");
        }

        if(Ext.isMac){
            cls.push("ext-mac");
        }
        if(Ext.isLinux){
            cls.push("ext-linux");
        }

        if(Ext.isStrict || Ext.isBorderBox){ 
            var p = bd.parentNode;
            if(p){
                p.className += Ext.isStrict ? ' ext-strict' : ' ext-border-box';
            }
        }
        bd.className += cls.join(' ');
        return true;
    }

    if(!initExtCss()){
        Ext.onReady(initExtCss);
    }
})();



Ext.EventObject = function(){
    var E = Ext.lib.Event,
        
        safariKeys = {
            3 : 13, 
            63234 : 37, 
            63235 : 39, 
            63232 : 38, 
            63233 : 40, 
            63276 : 33, 
            63277 : 34, 
            63272 : 46, 
            63273 : 36, 
            63275 : 35  
        },
        
        btnMap = Ext.isIE ? {1:0,4:1,2:2} :
                (Ext.isWebKit ? {1:0,2:1,3:2} : {0:0,1:1,2:2});

    Ext.EventObjectImpl = function(e){
        if(e){
            this.setEvent(e.browserEvent || e);
        }
    };

    Ext.EventObjectImpl.prototype = {
           
        setEvent : function(e){
            var me = this;
            if(e == me || (e && e.browserEvent)){ 
                return e;
            }
            me.browserEvent = e;
            if(e){
                
                me.button = e.button ? btnMap[e.button] : (e.which ? e.which - 1 : -1);
                if(e.type == 'click' && me.button == -1){
                    me.button = 0;
                }
                me.type = e.type;
                me.shiftKey = e.shiftKey;
                
                me.ctrlKey = e.ctrlKey || e.metaKey || false;
                me.altKey = e.altKey;
                
                me.keyCode = e.keyCode;
                me.charCode = e.charCode;
                
                me.target = E.getTarget(e);
                
                me.xy = E.getXY(e);
            }else{
                me.button = -1;
                me.shiftKey = false;
                me.ctrlKey = false;
                me.altKey = false;
                me.keyCode = 0;
                me.charCode = 0;
                me.target = null;
                me.xy = [0, 0];
            }
            return me;
        },

        
        stopEvent : function(){
            var me = this;
            if(me.browserEvent){
                if(me.browserEvent.type == 'mousedown'){
                    Ext.EventManager.stoppedMouseDownEvent.fire(me);
                }
                E.stopEvent(me.browserEvent);
            }
        },

        
        preventDefault : function(){
            if(this.browserEvent){
                E.preventDefault(this.browserEvent);
            }
        },

        
        stopPropagation : function(){
            var me = this;
            if(me.browserEvent){
                if(me.browserEvent.type == 'mousedown'){
                    Ext.EventManager.stoppedMouseDownEvent.fire(me);
                }
                E.stopPropagation(me.browserEvent);
            }
        },

        
        getCharCode : function(){
            return this.charCode || this.keyCode;
        },

        
        getKey : function(){
            return this.normalizeKey(this.keyCode || this.charCode)
        },

        
        normalizeKey: function(k){
            return Ext.isSafari ? (safariKeys[k] || k) : k;
        },

        
        getPageX : function(){
            return this.xy[0];
        },

        
        getPageY : function(){
            return this.xy[1];
        },

        
        getXY : function(){
            return this.xy;
        },

        
        getTarget : function(selector, maxDepth, returnEl){
            return selector ? Ext.fly(this.target).findParent(selector, maxDepth, returnEl) : (returnEl ? Ext.get(this.target) : this.target);
        },

        
        getRelatedTarget : function(){
            return this.browserEvent ? E.getRelatedTarget(this.browserEvent) : null;
        },

        
        getWheelDelta : function(){
            var e = this.browserEvent;
            var delta = 0;
            if(e.wheelDelta){ 
                delta = e.wheelDelta/120;
            }else if(e.detail){ 
                delta = -e.detail/3;
            }
            return delta;
        },

        
        within : function(el, related, allowEl){
            if(el){
                var t = this[related ? "getRelatedTarget" : "getTarget"]();
                return t && ((allowEl ? (t == Ext.getDom(el)) : false) || Ext.fly(el).contains(t));
            }
            return false;
        }
     };

    return new Ext.EventObjectImpl();
}();

(function(){
var DOC = document;

Ext.Element = function(element, forceNew){
    var dom = typeof element == "string" ?
              DOC.getElementById(element) : element,
        id;

    if(!dom) return null;

    id = dom.id;

    if(!forceNew && id && Ext.elCache[id]){ 
        return Ext.elCache[id].el;
    }

    
    this.dom = dom;

    
    this.id = id || Ext.id(dom);
};

var D = Ext.lib.Dom,
    DH = Ext.DomHelper,
    E = Ext.lib.Event,
    A = Ext.lib.Anim,
    El = Ext.Element,
    EC = Ext.elCache;

El.prototype = {
    
    set : function(o, useSet){
        var el = this.dom,
            attr,
            val,
            useSet = (useSet !== false) && !!el.setAttribute;

        for(attr in o){
            if (o.hasOwnProperty(attr)) {
                val = o[attr];
                if (attr == 'style') {
                    DH.applyStyles(el, val);
                } else if (attr == 'cls') {
                    el.className = val;
                } else if (useSet) {
                    el.setAttribute(attr, val);
                } else {
                    el[attr] = val;
                }
            }
        }
        return this;
    },


    
    
    
    
    
    
    
    
    
    


    
    
    



    
    
    
    
    
    


    
    
    
    
    
    


    
    
    


    
    
    
    
    
    
    

    
    defaultUnit : "px",

    
    is : function(simpleSelector){
        return Ext.DomQuery.is(this.dom, simpleSelector);
    },

    
    focus : function(defer,  dom) {
        var me = this,
            dom = dom || me.dom;
        try{
            if(Number(defer)){
                me.focus.defer(defer, null, [null, dom]);
            }else{
                dom.focus();
            }
        }catch(e){}
        return me;
    },

    
    blur : function() {
        try{
            this.dom.blur();
        }catch(e){}
        return this;
    },

    
    getValue : function(asNumber){
        var val = this.dom.value;
        return asNumber ? parseInt(val, 10) : val;
    },

    
    addListener : function(eventName, fn, scope, options){
        Ext.EventManager.on(this.dom,  eventName, fn, scope || this, options);
        return this;
    },

    
    removeListener : function(eventName, fn, scope){
        Ext.EventManager.removeListener(this.dom,  eventName, fn, scope || this);
        return this;
    },

    
    removeAllListeners : function(){
        Ext.EventManager.removeAll(this.dom);
        return this;
    },

    
    purgeAllListeners : function() {
        Ext.EventManager.purgeElement(this, true);
        return this;
    },
    
    addUnits : function(size){
        if(size === "" || size == "auto" || size === undefined){
            size = size || '';
        } else if(!isNaN(size) || !unitPattern.test(size)){
            size = size + (this.defaultUnit || 'px');
        }
        return size;
    },

    
    load : function(url, params, cb){
        Ext.Ajax.request(Ext.apply({
            params: params,
            url: url.url || url,
            callback: cb,
            el: this.dom,
            indicatorText: url.indicatorText || ''
        }, Ext.isObject(url) ? url : {}));
        return this;
    },

    
    isBorderBox : function(){
        return noBoxAdjust[(this.dom.tagName || "").toLowerCase()] || Ext.isBorderBox;
    },

    
    remove : function(){
        var me = this,
            dom = me.dom;

        if (dom) {
            delete me.dom;
            Ext.removeNode(dom);
        }
    },

    
    hover : function(overFn, outFn, scope, options){
        var me = this;
        me.on('mouseenter', overFn, scope || me.dom, options);
        me.on('mouseleave', outFn, scope || me.dom, options);
        return me;
    },

    
    contains : function(el){
        return !el ? false : Ext.lib.Dom.isAncestor(this.dom, el.dom ? el.dom : el);
    },

    
    getAttributeNS : function(ns, name){
        return this.getAttribute(name, ns);
    },

    
    getAttribute : Ext.isIE ? function(name, ns){
        var d = this.dom,
            type = typeof d[ns + ":" + name];

        if(['undefined', 'unknown'].indexOf(type) == -1){
            return d[ns + ":" + name];
        }
        return d[name];
    } : function(name, ns){
        var d = this.dom;
        return d.getAttributeNS(ns, name) || d.getAttribute(ns + ":" + name) || d.getAttribute(name) || d[name];
    },

    
    update : function(html) {
        if (this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    }
};

var ep = El.prototype;

El.addMethods = function(o){
   Ext.apply(ep, o);
};


ep.on = ep.addListener;


ep.un = ep.removeListener;


ep.autoBoxAdjust = true;


var unitPattern = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
    docEl;




El.get = function(el){
    var ex,
        elm,
        id;
    if(!el){ return null; }
    if (typeof el == "string") { 
        if (!(elm = DOC.getElementById(el))) {
            return null;
        }
        if (EC[el] && EC[el].el) {
            ex = EC[el].el;
            ex.dom = elm;
        } else {
            ex = El.addToCache(new El(elm));
        }
        return ex;
    } else if (el.tagName) { 
        if(!(id = el.id)){
            id = Ext.id(el);
        }
        if (EC[id] && EC[id].el) {
            ex = EC[id].el;
            ex.dom = el;
        } else {
            ex = El.addToCache(new El(el));
        }
        return ex;
    } else if (el instanceof El) {
        if(el != docEl){
            el.dom = DOC.getElementById(el.id) || el.dom; 
                                                          
        }
        return el;
    } else if(el.isComposite) {
        return el;
    } else if(Ext.isArray(el)) {
        return El.select(el);
    } else if(el == DOC) {
        
        if(!docEl){
            var f = function(){};
            f.prototype = El.prototype;
            docEl = new f();
            docEl.dom = DOC;
        }
        return docEl;
    }
    return null;
};

El.addToCache = function(el, id){
    id = id || el.id;
    EC[id] = {
        el:  el,
        data: {},
        events: {}
    };
    return el;
};


El.data = function(el, key, value){
    el = El.get(el);
    if (!el) {
        return null;
    }
    var c = EC[el.id].data;
    if(arguments.length == 2){
        return c[key];
    }else{
        return (c[key] = value);
    }
};




function garbageCollect(){
    if(!Ext.enableGarbageCollector){
        clearInterval(El.collectorThreadId);
    } else {
        var eid,
            el,
            d,
            o;

        for(eid in EC){
            o = EC[eid];
            if(o.skipGC){
                continue;
            }
            el = o.el;
            d = el.dom;
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            if(!d || !d.parentNode || (!d.offsetParent && !DOC.getElementById(eid))){
                if(Ext.enableListenerCollection){
                    Ext.EventManager.removeAll(d);
                }
                delete EC[eid];
            }
        }
        
        if (Ext.isIE) {
            var t = {};
            for (eid in EC) {
                t[eid] = EC[eid];
            }
            EC = Ext.elCache = t;
        }
    }
}
El.collectorThreadId = setInterval(garbageCollect, 30000);

var flyFn = function(){};
flyFn.prototype = El.prototype;


El.Flyweight = function(dom){
    this.dom = dom;
};

El.Flyweight.prototype = new flyFn();
El.Flyweight.prototype.isFlyweight = true;
El._flyweights = {};


El.fly = function(el, named){
    var ret = null;
    named = named || '_global';

    if (el = Ext.getDom(el)) {
        (El._flyweights[named] = El._flyweights[named] || new El.Flyweight()).dom = el;
        ret = El._flyweights[named];
    }
    return ret;
};


Ext.get = El.get;


Ext.fly = El.fly;


var noBoxAdjust = Ext.isStrict ? {
    select:1
} : {
    input:1, select:1, textarea:1
};
if(Ext.isIE || Ext.isGecko){
    noBoxAdjust['button'] = 1;
}

})();

Ext.Element.addMethods(function(){
	var PARENTNODE = 'parentNode',
		NEXTSIBLING = 'nextSibling',
		PREVIOUSSIBLING = 'previousSibling',
		DQ = Ext.DomQuery,
		GET = Ext.get;
	
	return {
		
	    findParent : function(simpleSelector, maxDepth, returnEl){
	        var p = this.dom,
	        	b = document.body, 
	        	depth = 0, 	        	
	        	stopEl;	        
            if(Ext.isGecko && Object.prototype.toString.call(p) == '[object XULElement]') {
                return null;
            }
	        maxDepth = maxDepth || 50;
	        if (isNaN(maxDepth)) {
	            stopEl = Ext.getDom(maxDepth);
	            maxDepth = Number.MAX_VALUE;
	        }
	        while(p && p.nodeType == 1 && depth < maxDepth && p != b && p != stopEl){
	            if(DQ.is(p, simpleSelector)){
	                return returnEl ? GET(p) : p;
	            }
	            depth++;
	            p = p.parentNode;
	        }
	        return null;
	    },
	
	    
	    findParentNode : function(simpleSelector, maxDepth, returnEl){
	        var p = Ext.fly(this.dom.parentNode, '_internal');
	        return p ? p.findParent(simpleSelector, maxDepth, returnEl) : null;
	    },
	
	    
	    up : function(simpleSelector, maxDepth){
	        return this.findParentNode(simpleSelector, maxDepth, true);
	    },
	
	    
	    select : function(selector){
	        return Ext.Element.select(selector, this.dom);
	    },
	
	    
	    query : function(selector){
	        return DQ.select(selector, this.dom);
	    },
	
	    
	    child : function(selector, returnDom){
	        var n = DQ.selectNode(selector, this.dom);
	        return returnDom ? n : GET(n);
	    },
	
	    
	    down : function(selector, returnDom){
	        var n = DQ.selectNode(" > " + selector, this.dom);
	        return returnDom ? n : GET(n);
	    },
	
		 
	    parent : function(selector, returnDom){
	        return this.matchNode(PARENTNODE, PARENTNODE, selector, returnDom);
	    },
	
	     
	    next : function(selector, returnDom){
	        return this.matchNode(NEXTSIBLING, NEXTSIBLING, selector, returnDom);
	    },
	
	    
	    prev : function(selector, returnDom){
	        return this.matchNode(PREVIOUSSIBLING, PREVIOUSSIBLING, selector, returnDom);
	    },
	
	
	    
	    first : function(selector, returnDom){
	        return this.matchNode(NEXTSIBLING, 'firstChild', selector, returnDom);
	    },
	
	    
	    last : function(selector, returnDom){
	        return this.matchNode(PREVIOUSSIBLING, 'lastChild', selector, returnDom);
	    },
	    
	    matchNode : function(dir, start, selector, returnDom){
	        var n = this.dom[start];
	        while(n){
	            if(n.nodeType == 1 && (!selector || DQ.is(n, selector))){
	                return !returnDom ? GET(n) : n;
	            }
	            n = n[dir];
	        }
	        return null;
	    }	
    }
}());
Ext.Element.addMethods(
function() {
	var GETDOM = Ext.getDom,
		GET = Ext.get,
		DH = Ext.DomHelper;
	
	return {
	    
	    appendChild: function(el){        
	        return GET(el).appendTo(this);        
	    },
	
	    
	    appendTo: function(el){        
	        GETDOM(el).appendChild(this.dom);        
	        return this;
	    },
	
	    
	    insertBefore: function(el){  	          
	        (el = GETDOM(el)).parentNode.insertBefore(this.dom, el);
	        return this;
	    },
	
	    
	    insertAfter: function(el){
	        (el = GETDOM(el)).parentNode.insertBefore(this.dom, el.nextSibling);
	        return this;
	    },
	
	    
	    insertFirst: function(el, returnDom){
            el = el || {};
            if(el.nodeType || el.dom || typeof el == 'string'){ 
                el = GETDOM(el);
                this.dom.insertBefore(el, this.dom.firstChild);
                return !returnDom ? GET(el) : el;
            }else{ 
                return this.createChild(el, this.dom.firstChild, returnDom);
            }
        },
	
	    
	    replace: function(el){
	        el = GET(el);
	        this.insertBefore(el);
	        el.remove();
	        return this;
	    },
	
	    
	    replaceWith: function(el){
		    var me = this;
                
            if(el.nodeType || el.dom || typeof el == 'string'){
                el = GETDOM(el);
                me.dom.parentNode.insertBefore(el, me.dom);
            }else{
                el = DH.insertBefore(me.dom, el);
            }
	        
	        delete Ext.elCache[me.id];
	        Ext.removeNode(me.dom);      
	        me.id = Ext.id(me.dom = el);
	        Ext.Element.addToCache(me.isFlyweight ? new Ext.Element(me.dom) : me);     
            return me;
	    },
	    
		
		createChild: function(config, insertBefore, returnDom){
		    config = config || {tag:'div'};
		    return insertBefore ? 
		    	   DH.insertBefore(insertBefore, config, returnDom !== true) :	
		    	   DH[!this.dom.firstChild ? 'overwrite' : 'append'](this.dom, config,  returnDom !== true);
		},
		
		
		wrap: function(config, returnDom){        
		    var newEl = DH.insertBefore(this.dom, config || {tag: "div"}, !returnDom);
		    newEl.dom ? newEl.dom.appendChild(this.dom) : newEl.appendChild(this.dom);
		    return newEl;
		},
		
		
		insertHtml : function(where, html, returnEl){
		    var el = DH.insertHtml(where, this.dom, html);
		    return returnEl ? Ext.get(el) : el;
		}
	}
}());
Ext.Element.addMethods(function(){
    
    var propCache = {},
        camelRe = /(-[a-z])/gi,
        classReCache = {},
        view = document.defaultView,
        propFloat = Ext.isIE ? 'styleFloat' : 'cssFloat',
        opacityRe = /alpha\(opacity=(.*)\)/i,
        trimRe = /^\s+|\s+$/g,
        EL = Ext.Element,
        PADDING = "padding",
        MARGIN = "margin",
        BORDER = "border",
        LEFT = "-left",
        RIGHT = "-right",
        TOP = "-top",
        BOTTOM = "-bottom",
        WIDTH = "-width",
        MATH = Math,
        HIDDEN = 'hidden',
        ISCLIPPED = 'isClipped',
        OVERFLOW = 'overflow',
        OVERFLOWX = 'overflow-x',
        OVERFLOWY = 'overflow-y',
        ORIGINALCLIP = 'originalClip',
        
        borders = {l: BORDER + LEFT + WIDTH, r: BORDER + RIGHT + WIDTH, t: BORDER + TOP + WIDTH, b: BORDER + BOTTOM + WIDTH},
        paddings = {l: PADDING + LEFT, r: PADDING + RIGHT, t: PADDING + TOP, b: PADDING + BOTTOM},
        margins = {l: MARGIN + LEFT, r: MARGIN + RIGHT, t: MARGIN + TOP, b: MARGIN + BOTTOM},
        data = Ext.Element.data;


    
    function camelFn(m, a) {
        return a.charAt(1).toUpperCase();
    }

    function chkCache(prop) {
        return propCache[prop] || (propCache[prop] = prop == 'float' ? propFloat : prop.replace(camelRe, camelFn));
    }

    return {
        
        adjustWidth : function(width) {
            var me = this;
            var isNum = Ext.isNumber(width);
            if(isNum && me.autoBoxAdjust && !me.isBorderBox()){
               width -= (me.getBorderWidth("lr") + me.getPadding("lr"));
            }
            return (isNum && width < 0) ? 0 : width;
        },

        
        adjustHeight : function(height) {
            var me = this;
            var isNum = Ext.isNumber(height);
            if(isNum && me.autoBoxAdjust && !me.isBorderBox()){
               height -= (me.getBorderWidth("tb") + me.getPadding("tb"));
            }
            return (isNum && height < 0) ? 0 : height;
        },


        
        addClass : function(className){
            var me = this, i, len, v;
            className = Ext.isArray(className) ? className : [className];
            for (i=0, len = className.length; i < len; i++) {
                v = className[i];
                if (v) {
                    me.dom.className += (!me.hasClass(v) && v ? " " + v : "");
                };
            };
            return me;
        },

        
        radioClass : function(className){
            var cn = this.dom.parentNode.childNodes, v;
            className = Ext.isArray(className) ? className : [className];
            for (var i=0, len = cn.length; i < len; i++) {
                v = cn[i];
                if(v && v.nodeType == 1) {
                    Ext.fly(v, '_internal').removeClass(className);
                }
            };
            return this.addClass(className);
        },

        
        removeClass : function(className){
            var me = this, v;
            className = Ext.isArray(className) ? className : [className];
            if (me.dom && me.dom.className) {
                for (var i=0, len=className.length; i < len; i++) {
                    v = className[i];
                    if(v) {
                        me.dom.className = me.dom.className.replace(
                            classReCache[v] = classReCache[v] || new RegExp('(?:^|\\s+)' + v + '(?:\\s+|$)', "g"), " "
                        );
                    }
                };
            }
            return me;
        },

        
        toggleClass : function(className){
            return this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
        },

        
        hasClass : function(className){
            return className && (' '+this.dom.className+' ').indexOf(' '+className+' ') != -1;
        },

        
        replaceClass : function(oldClassName, newClassName){
            return this.removeClass(oldClassName).addClass(newClassName);
        },

        isStyle : function(style, val) {
            return this.getStyle(style) == val;
        },

        
        getStyle : function(){
            return view && view.getComputedStyle ?
                function(prop){
                    var el = this.dom,
                        v,
                        cs,
                        out,
                        display,
                        wk = Ext.isWebKit,
                        display;
                        
                    if(el == document){
                        return null;
                    }
                    prop = chkCache(prop);
                    
                    if(wk && /marginRight/.test(prop)){
                        display = this.getStyle('display');
                        el.style.display = 'inline-block';
                    }
                    out = (v = el.style[prop]) ? v :
                           (cs = view.getComputedStyle(el, "")) ? cs[prop] : null;

                    
                    if(wk){
                        if(out == 'rgba(0, 0, 0, 0)'){
                            out = 'transparent';
                        }else if(display){
                            el.style.display = display;
                        }
                    }
                    return out;
                } :
                function(prop){
                    var el = this.dom,
                        m,
                        cs;

                    if(el == document) return null;
                    if (prop == 'opacity') {
                        if (el.style.filter.match) {
                            if(m = el.style.filter.match(opacityRe)){
                                var fv = parseFloat(m[1]);
                                if(!isNaN(fv)){
                                    return fv ? fv / 100 : 0;
                                }
                            }
                        }
                        return 1;
                    }
                    prop = chkCache(prop);
                    return el.style[prop] || ((cs = el.currentStyle) ? cs[prop] : null);
                };
        }(),

        
        getColor : function(attr, defaultValue, prefix){
            var v = this.getStyle(attr),
                color = Ext.isDefined(prefix) ? prefix : '#',
                h;

            if(!v || /transparent|inherit/.test(v)){
                return defaultValue;
            }
            if(/^r/.test(v)){
                Ext.each(v.slice(4, v.length -1).split(','), function(s){
                    h = parseInt(s, 10);
                    color += (h < 16 ? '0' : '') + h.toString(16);
                });
            }else{
                v = v.replace('#', '');
                color += v.length == 3 ? v.replace(/^(\w)(\w)(\w)$/, '$1$1$2$2$3$3') : v;
            }
            return(color.length > 5 ? color.toLowerCase() : defaultValue);
        },

        
        setStyle : function(prop, value){
            var tmp,
                style,
                camel;
            if (!Ext.isObject(prop)) {
                tmp = {};
                tmp[prop] = value;
                prop = tmp;
            }
            for (style in prop) {
                value = prop[style];
                style == 'opacity' ?
                    this.setOpacity(value) :
                    this.dom.style[chkCache(style)] = value;
            }
            return this;
        },

        
         setOpacity : function(opacity, animate){
            var me = this,
                s = me.dom.style;

            if(!animate || !me.anim){
                if(Ext.isIE){
                    var opac = opacity < 1 ? 'alpha(opacity=' + opacity * 100 + ')' : '',
                    val = s.filter.replace(opacityRe, '').replace(trimRe, '');

                    s.zoom = 1;
                    s.filter = val + (val.length > 0 ? ' ' : '') + opac;
                }else{
                    s.opacity = opacity;
                }
            }else{
                me.anim({opacity: {to: opacity}}, me.preanim(arguments, 1), null, .35, 'easeIn');
            }
            return me;
        },

        
        clearOpacity : function(){
            var style = this.dom.style;
            if(Ext.isIE){
                if(!Ext.isEmpty(style.filter)){
                    style.filter = style.filter.replace(opacityRe, '').replace(trimRe, '');
                }
            }else{
                style.opacity = style['-moz-opacity'] = style['-khtml-opacity'] = '';
            }
            return this;
        },

        
        getHeight : function(contentHeight){
            var me = this,
                dom = me.dom,
                hidden = Ext.isIE && me.isStyle('display', 'none'),
                h = MATH.max(dom.offsetHeight, hidden ? 0 : dom.clientHeight) || 0;

            h = !contentHeight ? h : h - me.getBorderWidth("tb") - me.getPadding("tb");
            return h < 0 ? 0 : h;
        },

        
        getWidth : function(contentWidth){
            var me = this,
                dom = me.dom,
                hidden = Ext.isIE && me.isStyle('display', 'none'),
                w = MATH.max(dom.offsetWidth, hidden ? 0 : dom.clientWidth) || 0;
            w = !contentWidth ? w : w - me.getBorderWidth("lr") - me.getPadding("lr");
            return w < 0 ? 0 : w;
        },

        
        setWidth : function(width, animate){
            var me = this;
            width = me.adjustWidth(width);
            !animate || !me.anim ?
                me.dom.style.width = me.addUnits(width) :
                me.anim({width : {to : width}}, me.preanim(arguments, 1));
            return me;
        },

        
         setHeight : function(height, animate){
            var me = this;
            height = me.adjustHeight(height);
            !animate || !me.anim ?
                me.dom.style.height = me.addUnits(height) :
                me.anim({height : {to : height}}, me.preanim(arguments, 1));
            return me;
        },

        
        getBorderWidth : function(side){
            return this.addStyles(side, borders);
        },

        
        getPadding : function(side){
            return this.addStyles(side, paddings);
        },

        
        clip : function(){
            var me = this,
                dom = me.dom;

            if(!data(dom, ISCLIPPED)){
                data(dom, ISCLIPPED, true);
                data(dom, ORIGINALCLIP, {
                    o: me.getStyle(OVERFLOW),
                    x: me.getStyle(OVERFLOWX),
                    y: me.getStyle(OVERFLOWY)
                });
                me.setStyle(OVERFLOW, HIDDEN);
                me.setStyle(OVERFLOWX, HIDDEN);
                me.setStyle(OVERFLOWY, HIDDEN);
            }
            return me;
        },

        
        unclip : function(){
            var me = this,
                dom = me.dom;

            if(data(dom, ISCLIPPED)){
                data(dom, ISCLIPPED, false);
                var o = data(dom, ORIGINALCLIP);
                if(o.o){
                    me.setStyle(OVERFLOW, o.o);
                }
                if(o.x){
                    me.setStyle(OVERFLOWX, o.x);
                }
                if(o.y){
                    me.setStyle(OVERFLOWY, o.y);
                }
            }
            return me;
        },

        
        addStyles : function(sides, styles){
            var val = 0,
                m = sides.match(/\w/g),
                s;
            for (var i=0, len=m.length; i<len; i++) {
                s = m[i] && parseInt(this.getStyle(styles[m[i]]), 10);
                if (s) {
                    val += MATH.abs(s);
                }
            }
            return val;
        },

        margins : margins
    }
}()
);

(function(){
var D = Ext.lib.Dom,
        LEFT = "left",
        RIGHT = "right",
        TOP = "top",
        BOTTOM = "bottom",
        POSITION = "position",
        STATIC = "static",
        RELATIVE = "relative",
        AUTO = "auto",
        ZINDEX = "z-index";

Ext.Element.addMethods({
	
    getX : function(){
        return D.getX(this.dom);
    },

    
    getY : function(){
        return D.getY(this.dom);
    },

    
    getXY : function(){
        return D.getXY(this.dom);
    },

    
    getOffsetsTo : function(el){
        var o = this.getXY(),
        	e = Ext.fly(el, '_internal').getXY();
        return [o[0]-e[0],o[1]-e[1]];
    },

    
    setX : function(x, animate){	    
	    return this.setXY([x, this.getY()], this.animTest(arguments, animate, 1));
    },

    
    setY : function(y, animate){	    
	    return this.setXY([this.getX(), y], this.animTest(arguments, animate, 1));
    },

    
    setLeft : function(left){
        this.setStyle(LEFT, this.addUnits(left));
        return this;
    },

    
    setTop : function(top){
        this.setStyle(TOP, this.addUnits(top));
        return this;
    },

    
    setRight : function(right){
        this.setStyle(RIGHT, this.addUnits(right));
        return this;
    },

    
    setBottom : function(bottom){
        this.setStyle(BOTTOM, this.addUnits(bottom));
        return this;
    },

    
    setXY : function(pos, animate){
	    var me = this;
        if(!animate || !me.anim){
            D.setXY(me.dom, pos);
        }else{
            me.anim({points: {to: pos}}, me.preanim(arguments, 1), 'motion');
        }
        return me;
    },

    
    setLocation : function(x, y, animate){
        return this.setXY([x, y], this.animTest(arguments, animate, 2));
    },

    
    moveTo : function(x, y, animate){
        return this.setXY([x, y], this.animTest(arguments, animate, 2));        
    },    
    
    
    getLeft : function(local){
	    return !local ? this.getX() : parseInt(this.getStyle(LEFT), 10) || 0;
    },

    
    getRight : function(local){
	    var me = this;
	    return !local ? me.getX() + me.getWidth() : (me.getLeft(true) + me.getWidth()) || 0;
    },

    
    getTop : function(local) {
	    return !local ? this.getY() : parseInt(this.getStyle(TOP), 10) || 0;
    },

    
    getBottom : function(local){
	    var me = this;
	    return !local ? me.getY() + me.getHeight() : (me.getTop(true) + me.getHeight()) || 0;
    },

    
    position : function(pos, zIndex, x, y){
	    var me = this;
	    
        if(!pos && me.isStyle(POSITION, STATIC)){           
            me.setStyle(POSITION, RELATIVE);           
        } else if(pos) {
            me.setStyle(POSITION, pos);
        }
        if(zIndex){
            me.setStyle(ZINDEX, zIndex);
        }
        if(x || y) me.setXY([x || false, y || false]);
    },

    
    clearPositioning : function(value){
        value = value || '';
        this.setStyle({
            left : value,
            right : value,
            top : value,
            bottom : value,
            "z-index" : "",
            position : STATIC
        });
        return this;
    },

    
    getPositioning : function(){
        var l = this.getStyle(LEFT);
        var t = this.getStyle(TOP);
        return {
            "position" : this.getStyle(POSITION),
            "left" : l,
            "right" : l ? "" : this.getStyle(RIGHT),
            "top" : t,
            "bottom" : t ? "" : this.getStyle(BOTTOM),
            "z-index" : this.getStyle(ZINDEX)
        };
    },
    
    
    setPositioning : function(pc){
	    var me = this,
	    	style = me.dom.style;
	    	
        me.setStyle(pc);
        
        if(pc.right == AUTO){
            style.right = "";
        }
        if(pc.bottom == AUTO){
            style.bottom = "";
        }
        
        return me;
    },    
	
    
    translatePoints : function(x, y){        	     
	    y = isNaN(x[1]) ? y : x[1];
        x = isNaN(x[0]) ? x : x[0];
        var me = this,
        	relative = me.isStyle(POSITION, RELATIVE),
        	o = me.getXY(),
        	l = parseInt(me.getStyle(LEFT), 10),
        	t = parseInt(me.getStyle(TOP), 10);
        
        l = !isNaN(l) ? l : (relative ? 0 : me.dom.offsetLeft);
        t = !isNaN(t) ? t : (relative ? 0 : me.dom.offsetTop);        

        return {left: (x - o[0] + l), top: (y - o[1] + t)}; 
    },
    
    animTest : function(args, animate, i) {
        return !!animate && this.preanim ? this.preanim(args, i) : false;
    }
});
})();
Ext.Element.addMethods({
    
    isScrollable : function(){
        var dom = this.dom;
        return dom.scrollHeight > dom.clientHeight || dom.scrollWidth > dom.clientWidth;
    },

    
    scrollTo : function(side, value){
        this.dom["scroll" + (/top/i.test(side) ? "Top" : "Left")] = value;
        return this;
    },

    
    getScroll : function(){
        var d = this.dom, 
            doc = document,
            body = doc.body,
            docElement = doc.documentElement,
            l,
            t,
            ret;

        if(d == doc || d == body){
            if(Ext.isIE && Ext.isStrict){
                l = docElement.scrollLeft; 
                t = docElement.scrollTop;
            }else{
                l = window.pageXOffset;
                t = window.pageYOffset;
            }
            ret = {left: l || (body ? body.scrollLeft : 0), top: t || (body ? body.scrollTop : 0)};
        }else{
            ret = {left: d.scrollLeft, top: d.scrollTop};
        }
        return ret;
    }
});

Ext.Element.VISIBILITY = 1;

Ext.Element.DISPLAY = 2;

Ext.Element.addMethods(function(){
    var VISIBILITY = "visibility",
        DISPLAY = "display",
        HIDDEN = "hidden",
        NONE = "none",      
        ORIGINALDISPLAY = 'originalDisplay',
        VISMODE = 'visibilityMode',
        ELDISPLAY = Ext.Element.DISPLAY,
        data = Ext.Element.data,
        getDisplay = function(dom){
            var d = data(dom, ORIGINALDISPLAY);
            if(d === undefined){
                data(dom, ORIGINALDISPLAY, d = '');
            }
            return d;
        },
        getVisMode = function(dom){
            var m = data(dom, VISMODE);
            if(m === undefined){
                data(dom, VISMODE, m = 1)
            }
            return m;
        };
    
    return {
        
        originalDisplay : "",
        visibilityMode : 1,
        
        
        setVisibilityMode : function(visMode){  
            data(this.dom, VISMODE, visMode);
            return this;
        },
        
        
        animate : function(args, duration, onComplete, easing, animType){       
            this.anim(args, {duration: duration, callback: onComplete, easing: easing}, animType);
            return this;
        },
    
        
        anim : function(args, opt, animType, defaultDur, defaultEase, cb){
            animType = animType || 'run';
            opt = opt || {};
            var me = this,              
                anim = Ext.lib.Anim[animType](
                    me.dom, 
                    args,
                    (opt.duration || defaultDur) || .35,
                    (opt.easing || defaultEase) || 'easeOut',
                    function(){
                        if(cb) cb.call(me);
                        if(opt.callback) opt.callback.call(opt.scope || me, me, opt);
                    },
                    me
                );
            opt.anim = anim;
            return anim;
        },
    
        
        preanim : function(a, i){
            return !a[i] ? false : (Ext.isObject(a[i]) ? a[i]: {duration: a[i+1], callback: a[i+2], easing: a[i+3]});
        },
        
        
        isVisible : function() {
            return !this.isStyle(VISIBILITY, HIDDEN) && !this.isStyle(DISPLAY, NONE);
        },
        
        
         setVisible : function(visible, animate){
            var me = this,
                dom = me.dom,
                isDisplay = getVisMode(this.dom) == ELDISPLAY;
                
            if (!animate || !me.anim) {
                if(isDisplay){
                    me.setDisplayed(visible);
                }else{
                    me.fixDisplay();
                    dom.style.visibility = visible ? "visible" : HIDDEN;
                }
            }else{
                
                if(visible){
                    me.setOpacity(.01);
                    me.setVisible(true);
                }
                me.anim({opacity: { to: (visible?1:0) }},
                        me.preanim(arguments, 1),
                        null,
                        .35,
                        'easeIn',
                        function(){
                             if(!visible){
                                 dom.style[isDisplay ? DISPLAY : VISIBILITY] = (isDisplay) ? NONE : HIDDEN;                     
                                 Ext.fly(dom).setOpacity(1);
                             }
                        });
            }
            return me;
        },
    
        
        toggle : function(animate){
            var me = this;
            me.setVisible(!me.isVisible(), me.preanim(arguments, 0));
            return me;
        },
    
        
        setDisplayed : function(value) {            
            if(typeof value == "boolean"){
               value = value ? getDisplay(this.dom) : NONE;
            }
            this.setStyle(DISPLAY, value);
            return this;
        },
        
        
        fixDisplay : function(){
            var me = this;
            if(me.isStyle(DISPLAY, NONE)){
                me.setStyle(VISIBILITY, HIDDEN);
                me.setStyle(DISPLAY, getDisplay(this.dom)); 
                if(me.isStyle(DISPLAY, NONE)){ 
                    me.setStyle(DISPLAY, "block");
                }
            }
        },
    
        
        hide : function(animate){
            this.setVisible(false, this.preanim(arguments, 0));
            return this;
        },
    
        
        show : function(animate){
            this.setVisible(true, this.preanim(arguments, 0));
            return this;
        }
    }
}());(function(){
    
    var NULL = null,
        UNDEFINED = undefined,
        TRUE = true,
        FALSE = false,
        SETX = "setX",
        SETY = "setY",
        SETXY = "setXY",
        LEFT = "left",
        BOTTOM = "bottom",
        TOP = "top",
        RIGHT = "right",
        HEIGHT = "height",
        WIDTH = "width",
        POINTS = "points",
        HIDDEN = "hidden",
        ABSOLUTE = "absolute",
        VISIBLE = "visible",
        MOTION = "motion",
        POSITION = "position",
        EASEOUT = "easeOut",
        
        flyEl = new Ext.Element.Flyweight(),
        queues = {},
        getObject = function(o){
            return o || {};
        },
        fly = function(dom){
            flyEl.dom = dom;
            flyEl.id = Ext.id(dom);
            return flyEl;
        },
        
        getQueue = function(id){
            if(!queues[id]){
                queues[id] = [];
            }
            return queues[id];
        },
        setQueue = function(id, value){
            queues[id] = value;
        };
        

Ext.enableFx = TRUE;


Ext.Fx = {
    
    
    
    switchStatements : function(key, fn, argHash){
        return fn.apply(this, argHash[key]);
    },
    
    
    slideIn : function(anchor, o){ 
        o = getObject(o);
        var me = this,
            dom = me.dom,
            st = dom.style,
            xy,
            r,
            b,              
            wrap,               
            after,
            st,
            args, 
            pt,
            bw,
            bh;
            
        anchor = anchor || "t";

        me.queueFx(o, function(){            
            xy = fly(dom).getXY();
            
            fly(dom).fixDisplay();            
            
            
            r = fly(dom).getFxRestore();      
            b = {x: xy[0], y: xy[1], 0: xy[0], 1: xy[1], width: dom.offsetWidth, height: dom.offsetHeight};
            b.right = b.x + b.width;
            b.bottom = b.y + b.height;
            
            
            fly(dom).setWidth(b.width).setHeight(b.height);            
            
            
            wrap = fly(dom).fxWrap(r.pos, o, HIDDEN);
            
            st.visibility = VISIBLE;
            st.position = ABSOLUTE;
            
            
            function after(){
                 fly(dom).fxUnwrap(wrap, r.pos, o);
                 st.width = r.width;
                 st.height = r.height;
                 fly(dom).afterFx(o);
            }
            
            
            pt = {to: [b.x, b.y]}; 
            bw = {to: b.width};
            bh = {to: b.height};
                
            function argCalc(wrap, style, ww, wh, sXY, sXYval, s1, s2, w, h, p){                    
                var ret = {};
                fly(wrap).setWidth(ww).setHeight(wh);
                if(fly(wrap)[sXY]){
                    fly(wrap)[sXY](sXYval);                  
                }
                style[s1] = style[s2] = "0";                    
                if(w){
                    ret.width = w
                };
                if(h){
                    ret.height = h;
                }
                if(p){
                    ret.points = p;
                }
                return ret;
            };

            args = fly(dom).switchStatements(anchor.toLowerCase(), argCalc, {
                    t  : [wrap, st, b.width, 0, NULL, NULL, LEFT, BOTTOM, NULL, bh, NULL],
                    l  : [wrap, st, 0, b.height, NULL, NULL, RIGHT, TOP, bw, NULL, NULL],
                    r  : [wrap, st, b.width, b.height, SETX, b.right, LEFT, TOP, NULL, NULL, pt],
                    b  : [wrap, st, b.width, b.height, SETY, b.bottom, LEFT, TOP, NULL, bh, pt],
                    tl : [wrap, st, 0, 0, NULL, NULL, RIGHT, BOTTOM, bw, bh, pt],
                    bl : [wrap, st, 0, 0, SETY, b.y + b.height, RIGHT, TOP, bw, bh, pt],
                    br : [wrap, st, 0, 0, SETXY, [b.right, b.bottom], LEFT, TOP, bw, bh, pt],
                    tr : [wrap, st, 0, 0, SETX, b.x + b.width, LEFT, BOTTOM, bw, bh, pt]
                });
            
            st.visibility = VISIBLE;
            fly(wrap).show();

            arguments.callee.anim = fly(wrap).fxanim(args,
                o,
                MOTION,
                .5,
                EASEOUT, 
                after);
        });
        return me;
    },
    
    
    slideOut : function(anchor, o){
        o = getObject(o);
        var me = this,
            dom = me.dom,
            st = dom.style,
            xy = me.getXY(),
            wrap,
            r,
            b,
            a,
            zero = {to: 0}; 
                    
        anchor = anchor || "t";

        me.queueFx(o, function(){
            
            
            r = fly(dom).getFxRestore(); 
            b = {x: xy[0], y: xy[1], 0: xy[0], 1: xy[1], width: dom.offsetWidth, height: dom.offsetHeight};
            b.right = b.x + b.width;
            b.bottom = b.y + b.height;
                
            
            fly(dom).setWidth(b.width).setHeight(b.height);

            
            wrap = fly(dom).fxWrap(r.pos, o, VISIBLE);
                
            st.visibility = VISIBLE;
            st.position = ABSOLUTE;
            fly(wrap).setWidth(b.width).setHeight(b.height);            

            function after(){
                o.useDisplay ? fly(dom).setDisplayed(FALSE) : fly(dom).hide();                
                fly(dom).fxUnwrap(wrap, r.pos, o);
                st.width = r.width;
                st.height = r.height;
                fly(dom).afterFx(o);
            }            
            
            function argCalc(style, s1, s2, p1, v1, p2, v2, p3, v3){                    
                var ret = {};
                
                style[s1] = style[s2] = "0";
                ret[p1] = v1;               
                if(p2){
                    ret[p2] = v2;               
                }
                if(p3){
                    ret[p3] = v3;
                }
                
                return ret;
            };
            
            a = fly(dom).switchStatements(anchor.toLowerCase(), argCalc, {
                t  : [st, LEFT, BOTTOM, HEIGHT, zero],
                l  : [st, RIGHT, TOP, WIDTH, zero],
                r  : [st, LEFT, TOP, WIDTH, zero, POINTS, {to : [b.right, b.y]}],
                b  : [st, LEFT, TOP, HEIGHT, zero, POINTS, {to : [b.x, b.bottom]}],
                tl : [st, RIGHT, BOTTOM, WIDTH, zero, HEIGHT, zero],
                bl : [st, RIGHT, TOP, WIDTH, zero, HEIGHT, zero, POINTS, {to : [b.x, b.bottom]}],
                br : [st, LEFT, TOP, WIDTH, zero, HEIGHT, zero, POINTS, {to : [b.x + b.width, b.bottom]}],
                tr : [st, LEFT, BOTTOM, WIDTH, zero, HEIGHT, zero, POINTS, {to : [b.right, b.y]}]
            });
            
            arguments.callee.anim = fly(wrap).fxanim(a,
                o,
                MOTION,
                .5,
                EASEOUT, 
                after);
        });
        return me;
    },

    
    puff : function(o){
        o = getObject(o);
        var me = this,
            dom = me.dom,
            st = dom.style,
            width,
            height,
            r;

        me.queueFx(o, function(){
            width = fly(dom).getWidth();
            height = fly(dom).getHeight();
            fly(dom).clearOpacity();
            fly(dom).show();

            
            r = fly(dom).getFxRestore();                   
            
            function after(){
                o.useDisplay ? fly(dom).setDisplayed(FALSE) : fly(dom).hide();                  
                fly(dom).clearOpacity();  
                fly(dom).setPositioning(r.pos);
                st.width = r.width;
                st.height = r.height;
                st.fontSize = '';
                fly(dom).afterFx(o);
            }   

            arguments.callee.anim = fly(dom).fxanim({
                    width : {to : fly(dom).adjustWidth(width * 2)},
                    height : {to : fly(dom).adjustHeight(height * 2)},
                    points : {by : [-width * .5, -height * .5]},
                    opacity : {to : 0},
                    fontSize: {to : 200, unit: "%"}
                },
                o,
                MOTION,
                .5,
                EASEOUT,
                 after);
        });
        return me;
    },

    
    switchOff : function(o){
        o = getObject(o);
        var me = this,
            dom = me.dom,
            st = dom.style,
            r;

        me.queueFx(o, function(){
            fly(dom).clearOpacity();
            fly(dom).clip();

            
            r = fly(dom).getFxRestore();
                
            function after(){
                o.useDisplay ? fly(dom).setDisplayed(FALSE) : fly(dom).hide();  
                fly(dom).clearOpacity();
                fly(dom).setPositioning(r.pos);
                st.width = r.width;
                st.height = r.height;   
                fly(dom).afterFx(o);
            };

            fly(dom).fxanim({opacity : {to : 0.3}}, 
                NULL, 
                NULL, 
                .1, 
                NULL, 
                function(){                                 
                    fly(dom).clearOpacity();
                        (function(){                            
                            fly(dom).fxanim({
                                height : {to : 1},
                                points : {by : [0, fly(dom).getHeight() * .5]}
                            }, 
                            o, 
                            MOTION, 
                            0.3, 
                            'easeIn', 
                            after);
                        }).defer(100);
                });
        });
        return me;
    },

     
    highlight : function(color, o){
        o = getObject(o);
        var me = this,
            dom = me.dom,
            attr = o.attr || "backgroundColor",
            a = {},
            restore;

        me.queueFx(o, function(){
            fly(dom).clearOpacity();
            fly(dom).show();

            function after(){
                dom.style[attr] = restore;
                fly(dom).afterFx(o);
            }            
            restore = dom.style[attr];
            a[attr] = {from: color || "ffff9c", to: o.endColor || fly(dom).getColor(attr) || "ffffff"};
            arguments.callee.anim = fly(dom).fxanim(a,
                o,
                'color',
                1,
                'easeIn', 
                after);
        });
        return me;
    },

   
    frame : function(color, count, o){
        o = getObject(o);
        var me = this,
            dom = me.dom,
            proxy,
            active;

        me.queueFx(o, function(){
            color = color || '#C3DAF9';
            if(color.length == 6){
                color = '#' + color;
            }            
            count = count || 1;
            fly(dom).show();

            var xy = fly(dom).getXY(),
                b = {x: xy[0], y: xy[1], 0: xy[0], 1: xy[1], width: dom.offsetWidth, height: dom.offsetHeight},
                queue = function(){
                    proxy = fly(document.body || document.documentElement).createChild({
                        style:{
                            position : ABSOLUTE,
                            'z-index': 35000, 
                            border : '0px solid ' + color
                        }
                    });
                    return proxy.queueFx({}, animFn);
                };
            
            
            arguments.callee.anim = {
                isAnimated: true,
                stop: function() {
                    count = 0;
                    proxy.stopFx();
                }
            };
            
            function animFn(){
                var scale = Ext.isBorderBox ? 2 : 1;
                active = proxy.anim({
                    top : {from : b.y, to : b.y - 20},
                    left : {from : b.x, to : b.x - 20},
                    borderWidth : {from : 0, to : 10},
                    opacity : {from : 1, to : 0},
                    height : {from : b.height, to : b.height + 20 * scale},
                    width : {from : b.width, to : b.width + 20 * scale}
                },{
                    duration: o.duration || 1,
                    callback: function() {
                        proxy.remove();
                        --count > 0 ? queue() : fly(dom).afterFx(o);
                    }
                });
                arguments.callee.anim = {
                    isAnimated: true,
                    stop: function(){
                        active.stop();
                    }
                };
            };
            queue();
        });
        return me;
    },

   
    pause : function(seconds){        
        var dom = this.dom,
            t;

        this.queueFx({}, function(){
            t = setTimeout(function(){
                fly(dom).afterFx({});
            }, seconds * 1000);
            arguments.callee.anim = {
                isAnimated: true,
                stop: function(){
                    clearTimeout(t);
                    fly(dom).afterFx({});
                }
            };
        });
        return this;
    },

   
    fadeIn : function(o){
        o = getObject(o);
        var me = this,
            dom = me.dom,
            to = o.endOpacity || 1;
        
        me.queueFx(o, function(){
            fly(dom).setOpacity(0);
            fly(dom).fixDisplay();
            dom.style.visibility = VISIBLE;
            arguments.callee.anim = fly(dom).fxanim({opacity:{to:to}},
                o, NULL, .5, EASEOUT, function(){
                if(to == 1){
                    fly(dom).clearOpacity();
                }
                fly(dom).afterFx(o);
            });
        });
        return me;
    },

   
    fadeOut : function(o){
        o = getObject(o);
        var me = this,
            dom = me.dom,
            style = dom.style,
            to = o.endOpacity || 0;         
        
        me.queueFx(o, function(){  
            arguments.callee.anim = fly(dom).fxanim({ 
                opacity : {to : to}},
                o, 
                NULL, 
                .5, 
                EASEOUT, 
                function(){
                    if(to == 0){
                        Ext.Element.data(dom, 'visibilityMode') == Ext.Element.DISPLAY || o.useDisplay ? 
                            style.display = "none" :
                            style.visibility = HIDDEN;
                            
                        fly(dom).clearOpacity();
                    }
                    fly(dom).afterFx(o);
            });
        });
        return me;
    },

   
    scale : function(w, h, o){
        this.shift(Ext.apply({}, o, {
            width: w,
            height: h
        }));
        return this;
    },

   
    shift : function(o){
        o = getObject(o);
        var dom = this.dom,
            a = {};
                
        this.queueFx(o, function(){
            for (var prop in o) {
                if (o[prop] != UNDEFINED) {                                                 
                    a[prop] = {to : o[prop]};                   
                }
            } 
            
            a.width ? a.width.to = fly(dom).adjustWidth(o.width) : a;
            a.height ? a.height.to = fly(dom).adjustWidth(o.height) : a;   
            
            if (a.x || a.y || a.xy) {
                a.points = a.xy || 
                           {to : [ a.x ? a.x.to : fly(dom).getX(),
                                   a.y ? a.y.to : fly(dom).getY()]};                  
            }

            arguments.callee.anim = fly(dom).fxanim(a,
                o, 
                MOTION, 
                .35, 
                EASEOUT, 
                function(){
                    fly(dom).afterFx(o);
                });
        });
        return this;
    },

    
    ghost : function(anchor, o){
        o = getObject(o);
        var me = this,
            dom = me.dom,
            st = dom.style,
            a = {opacity: {to: 0}, points: {}},
            pt = a.points,
            r,
            w,
            h;
            
        anchor = anchor || "b";

        me.queueFx(o, function(){
            
            r = fly(dom).getFxRestore();
            w = fly(dom).getWidth();
            h = fly(dom).getHeight();
            
            function after(){
                o.useDisplay ? fly(dom).setDisplayed(FALSE) : fly(dom).hide();   
                fly(dom).clearOpacity();
                fly(dom).setPositioning(r.pos);
                st.width = r.width;
                st.height = r.height;
                fly(dom).afterFx(o);
            }
                
            pt.by = fly(dom).switchStatements(anchor.toLowerCase(), function(v1,v2){ return [v1, v2];}, {
               t  : [0, -h],
               l  : [-w, 0],
               r  : [w, 0],
               b  : [0, h],
               tl : [-w, -h],
               bl : [-w, h],
               br : [w, h],
               tr : [w, -h] 
            });
                
            arguments.callee.anim = fly(dom).fxanim(a,
                o,
                MOTION,
                .5,
                EASEOUT, after);
        });
        return me;
    },

    
    syncFx : function(){
        var me = this;
        me.fxDefaults = Ext.apply(me.fxDefaults || {}, {
            block : FALSE,
            concurrent : TRUE,
            stopFx : FALSE
        });
        return me;
    },

    
    sequenceFx : function(){
        var me = this;
        me.fxDefaults = Ext.apply(me.fxDefaults || {}, {
            block : FALSE,
            concurrent : FALSE,
            stopFx : FALSE
        });
        return me;
    },

    
    nextFx : function(){        
        var ef = getQueue(this.dom.id)[0];
        if(ef){
            ef.call(this);
        }
    },

    
    hasActiveFx : function(){
        return getQueue(this.dom.id)[0];
    },

    
    stopFx : function(finish){
        var me = this,
            id = me.dom.id;
        if(me.hasActiveFx()){
            var cur = getQueue(id)[0];
            if(cur && cur.anim){
                if(cur.anim.isAnimated){
                    setQueue(id, [cur]); 
                    cur.anim.stop(finish !== undefined ? finish : TRUE);
                }else{
                    setQueue(id, []);
                }
            }
        }
        return me;
    },

    
    beforeFx : function(o){
        if(this.hasActiveFx() && !o.concurrent){
           if(o.stopFx){
               this.stopFx();
               return TRUE;
           }
           return FALSE;
        }
        return TRUE;
    },

    
    hasFxBlock : function(){
        var q = getQueue(this.dom.id);
        return q && q[0] && q[0].block;
    },

    
    queueFx : function(o, fn){
        var me = fly(this.dom);
        if(!me.hasFxBlock()){
            Ext.applyIf(o, me.fxDefaults);
            if(!o.concurrent){
                var run = me.beforeFx(o);
                fn.block = o.block;
                getQueue(me.dom.id).push(fn);
                if(run){
                    me.nextFx();
                }
            }else{
                fn.call(me);
            }
        }
        return me;
    },

    
    fxWrap : function(pos, o, vis){ 
        var dom = this.dom,
            wrap,
            wrapXY;
        if(!o.wrap || !(wrap = Ext.getDom(o.wrap))){            
            if(o.fixPosition){
                wrapXY = fly(dom).getXY();
            }
            var div = document.createElement("div");
            div.style.visibility = vis;
            wrap = dom.parentNode.insertBefore(div, dom);
            fly(wrap).setPositioning(pos);
            if(fly(wrap).isStyle(POSITION, "static")){
                fly(wrap).position("relative");
            }
            fly(dom).clearPositioning('auto');
            fly(wrap).clip();
            wrap.appendChild(dom);
            if(wrapXY){
                fly(wrap).setXY(wrapXY);
            }
        }
        return wrap;
    },

    
    fxUnwrap : function(wrap, pos, o){      
        var dom = this.dom;
        fly(dom).clearPositioning();
        fly(dom).setPositioning(pos);
        if(!o.wrap){
            var pn = fly(wrap).dom.parentNode;
            pn.insertBefore(dom, wrap); 
            fly(wrap).remove();
        }
    },

    
    getFxRestore : function(){
        var st = this.dom.style;
        return {pos: this.getPositioning(), width: st.width, height : st.height};
    },

    
    afterFx : function(o){
        var dom = this.dom,
            id = dom.id;
        if(o.afterStyle){
            fly(dom).setStyle(o.afterStyle);            
        }
        if(o.afterCls){
            fly(dom).addClass(o.afterCls);
        }
        if(o.remove == TRUE){
            fly(dom).remove();
        }
        if(o.callback){
            o.callback.call(o.scope, fly(dom));
        }
        if(!o.concurrent){
            getQueue(id).shift();
            fly(dom).nextFx();
        }
    },

    
    fxanim : function(args, opt, animType, defaultDur, defaultEase, cb){
        animType = animType || 'run';
        opt = opt || {};
        var anim = Ext.lib.Anim[animType](
                this.dom, 
                args,
                (opt.duration || defaultDur) || .35,
                (opt.easing || defaultEase) || EASEOUT,
                cb,            
                this
            );
        opt.anim = anim;
        return anim;
    }
};


Ext.Fx.resize = Ext.Fx.scale;



Ext.Element.addMethods(Ext.Fx);
})();

Ext.CompositeElementLite = function(els, root){
    
    this.elements = [];
    this.add(els, root);
    this.el = new Ext.Element.Flyweight();
};

Ext.CompositeElementLite.prototype = {
    isComposite: true,    
    
    
    getElement : function(el){
        
        var e = this.el;
        e.dom = el;
        e.id = el.id;
        return e;
    },
    
    
    transformElement : function(el){
        return Ext.getDom(el);
    },
    
    
    getCount : function(){
        return this.elements.length;
    },    
    
    add : function(els, root){
        var me = this,
            elements = me.elements;
        if(!els){
            return this;
        }
        if(Ext.isString(els)){
            els = Ext.Element.selectorFunction(els, root);
        }else if(els.isComposite){
            els = els.elements;
        }else if(!Ext.isIterable(els)){
            els = [els];
        }
        
        for(var i = 0, len = els.length; i < len; ++i){
            elements.push(me.transformElement(els[i]));
        }
        return me;
    },
    
    invoke : function(fn, args){
        var me = this,
            els = me.elements,
            len = els.length, 
            e, 
            i;
            
        for(i = 0; i < len; i++) {
            e = els[i];
            if(e){
                Ext.Element.prototype[fn].apply(me.getElement(e), args);
            }
        }
        return me;
    },
    
    item : function(index){
        var me = this,
            el = me.elements[index],
            out = null;

        if(el){
            out = me.getElement(el);
        }
        return out;
    },

    
    addListener : function(eventName, handler, scope, opt){
        var els = this.elements,
            len = els.length,
            i, e;
        
        for(i = 0; i<len; i++) {
            e = els[i];
            if(e) {
                Ext.EventManager.on(e, eventName, handler, scope || e, opt);
            }
        }
        return this;
    },
    
    each : function(fn, scope){       
        var me = this,
            els = me.elements,
            len = els.length,
            i, e;
        
        for(i = 0; i<len; i++) {
            e = els[i];
            if(e){
                e = this.getElement(e);
                if(fn.call(scope || e, e, me, i) === false){
                    break;
                }
            }
        }
        return me;
    },
    
    
    fill : function(els){
        var me = this;
        me.elements = [];
        me.add(els);
        return me;
    },
    
    
    filter : function(selector){
        var els = [],
            me = this,
            elements = me.elements,
            fn = Ext.isFunction(selector) ? selector
                : function(el){
                    return el.is(selector);
                };
                
        
        me.each(function(el, self, i){
            if(fn(el, i) !== false){
                els[els.length] = me.transformElement(el);
            }
        });
        me.elements = els;
        return me;
    },
    
    
    indexOf : function(el){
        return this.elements.indexOf(this.transformElement(el));
    },
    
        
    replaceElement : function(el, replacement, domReplace){
        var index = !isNaN(el) ? el : this.indexOf(el),
            d;
        if(index > -1){
            replacement = Ext.getDom(replacement);
            if(domReplace){
                d = this.elements[index];
                d.parentNode.insertBefore(replacement, d);
                Ext.removeNode(d);
            }
            this.elements.splice(index, 1, replacement);
        }
        return this;
    },
    
    
    clear : function(){
        this.elements = [];
    }
};

Ext.CompositeElementLite.prototype.on = Ext.CompositeElementLite.prototype.addListener;

(function(){
var fnName,
    ElProto = Ext.Element.prototype,
    CelProto = Ext.CompositeElementLite.prototype;
    
for(fnName in ElProto){
    if(Ext.isFunction(ElProto[fnName])){
        (function(fnName){ 
            CelProto[fnName] = CelProto[fnName] || function(){
                return this.invoke(fnName, arguments);
            };
        }).call(CelProto, fnName);
        
    }
}
})();

if(Ext.DomQuery){
    Ext.Element.selectorFunction = Ext.DomQuery.select;
} 


Ext.Element.select = function(selector, root){
    var els;
    if(typeof selector == "string"){
        els = Ext.Element.selectorFunction(selector, root);
    }else if(selector.length !== undefined){
        els = selector;
    }else{
        throw "Invalid selector";
    }
    return new Ext.CompositeElementLite(els);
};

Ext.select = Ext.Element.select;(function(){
    var BEFOREREQUEST = "beforerequest",
        REQUESTCOMPLETE = "requestcomplete",
        REQUESTEXCEPTION = "requestexception",
        UNDEFINED = undefined,
        LOAD = 'load',
        POST = 'POST',
        GET = 'GET',
        WINDOW = window;

    
    Ext.data.Connection = function(config){
        Ext.apply(this, config);
        this.addEvents(
            
            BEFOREREQUEST,
            
            REQUESTCOMPLETE,
            
            REQUESTEXCEPTION
        );
        Ext.data.Connection.superclass.constructor.call(this);
    };

    Ext.extend(Ext.data.Connection, Ext.util.Observable, {
        
        
        
        
        
        timeout : 30000,
        
        autoAbort:false,

        
        disableCaching: true,

        
        disableCachingParam: '_dc',

        
        request : function(o){
            var me = this;
            if(me.fireEvent(BEFOREREQUEST, me, o)){
                if (o.el) {
                    if(!Ext.isEmpty(o.indicatorText)){
                        me.indicatorText = '<div class="loading-indicator">'+o.indicatorText+"</div>";
                    }
                    if(me.indicatorText) {
                        Ext.getDom(o.el).innerHTML = me.indicatorText;
                    }
                    o.success = (Ext.isFunction(o.success) ? o.success : function(){}).createInterceptor(function(response) {
                        Ext.getDom(o.el).innerHTML = response.responseText;
                    });
                }

                var p = o.params,
                    url = o.url || me.url,
                    method,
                    cb = {success: me.handleResponse,
                          failure: me.handleFailure,
                          scope: me,
                          argument: {options: o},
                          timeout : o.timeout || me.timeout
                    },
                    form,
                    serForm;


                if (Ext.isFunction(p)) {
                    p = p.call(o.scope||WINDOW, o);
                }

                p = Ext.urlEncode(me.extraParams, Ext.isObject(p) ? Ext.urlEncode(p) : p);

                if (Ext.isFunction(url)) {
                    url = url.call(o.scope || WINDOW, o);
                }

                if((form = Ext.getDom(o.form))){
                    url = url || form.action;
                     if(o.isUpload || /multipart\/form-data/i.test(form.getAttribute("enctype"))) {
                         return me.doFormUpload.call(me, o, p, url);
                     }
                    serForm = Ext.lib.Ajax.serializeForm(form);
                    p = p ? (p + '&' + serForm) : serForm;
                }

                method = o.method || me.method || ((p || o.xmlData || o.jsonData) ? POST : GET);

                if(method === GET && (me.disableCaching && o.disableCaching !== false) || o.disableCaching === true){
                    var dcp = o.disableCachingParam || me.disableCachingParam;
                    url = Ext.urlAppend(url, dcp + '=' + (new Date().getTime()));
                }

                o.headers = Ext.apply(o.headers || {}, me.defaultHeaders || {});

                if(o.autoAbort === true || me.autoAbort) {
                    me.abort();
                }

                if((method == GET || o.xmlData || o.jsonData) && p){
                    url = Ext.urlAppend(url, p);
                    p = '';
                }
                return (me.transId = Ext.lib.Ajax.request(method, url, cb, p, o));
            }else{
                return o.callback ? o.callback.apply(o.scope, [o,UNDEFINED,UNDEFINED]) : null;
            }
        },

        
        isLoading : function(transId){
            return transId ? Ext.lib.Ajax.isCallInProgress(transId) : !! this.transId;
        },

        
        abort : function(transId){
            if(transId || this.isLoading()){
                Ext.lib.Ajax.abort(transId || this.transId);
            }
        },

        
        handleResponse : function(response){
            this.transId = false;
            var options = response.argument.options;
            response.argument = options ? options.argument : null;
            this.fireEvent(REQUESTCOMPLETE, this, response, options);
            if(options.success){
                options.success.call(options.scope, response, options);
            }
            if(options.callback){
                options.callback.call(options.scope, options, true, response);
            }
        },

        
        handleFailure : function(response, e){
            this.transId = false;
            var options = response.argument.options;
            response.argument = options ? options.argument : null;
            this.fireEvent(REQUESTEXCEPTION, this, response, options, e);
            if(options.failure){
                options.failure.call(options.scope, response, options);
            }
            if(options.callback){
                options.callback.call(options.scope, options, false, response);
            }
        },

        
        doFormUpload : function(o, ps, url){
            var id = Ext.id(),
                doc = document,
                frame = doc.createElement('iframe'),
                form = Ext.getDom(o.form),
                hiddens = [],
                hd,
                encoding = 'multipart/form-data',
                buf = {
                    target: form.target,
                    method: form.method,
                    encoding: form.encoding,
                    enctype: form.enctype,
                    action: form.action
                };

            Ext.fly(frame).set({
                id: id,
                name: id,
                cls: 'x-hidden'

            });

            doc.body.appendChild(frame);

            
            Ext.fly(frame).set({
               src : Ext.SSL_SECURE_URL
            });

            
            if(Ext.isIE){
               document.frames[id].name = id;
            }


            Ext.fly(form).set({
                target: id,
                method: POST,
                enctype: encoding,
                encoding: encoding,
                action: url || buf.action
            });

            
            Ext.iterate(Ext.urlDecode(ps, false), function(k, v){
                hd = doc.createElement('input');
                Ext.fly(hd).set({
                    type: 'hidden',
                    value: v,
                    name: k
                });
                form.appendChild(hd);
                hiddens.push(hd);
            });

            function cb(){
                var me = this,
                    
                    r = {responseText : '',
                         responseXML : null,
                         argument : o.argument},
                    doc,
                    firstChild;

                try{
                    doc = frame.contentWindow.document || frame.contentDocument || WINDOW.frames[id].document;
                    if(doc){
                        if(doc.body){
                            if(/textarea/i.test((firstChild = doc.body.firstChild || {}).tagName)){ 
                                r.responseText = firstChild.value;
                            }else{
                                r.responseText = doc.body.innerHTML;
                            }
                        }
                        
                        r.responseXML = doc.XMLDocument || doc;
                    }
                }
                catch(e) {}

                Ext.EventManager.removeListener(frame, LOAD, cb, me);

                me.fireEvent(REQUESTCOMPLETE, me, r, o);

                function runCallback(fn, scope, args){
                    if(Ext.isFunction(fn)){
                        fn.apply(scope, args);
                    }
                }

                runCallback(o.success, o.scope, [r, o]);
                runCallback(o.callback, o.scope, [o, true, r]);

                if(!me.debugUploads){
                    setTimeout(function(){Ext.removeNode(frame);}, 100);
                }
            }

            Ext.EventManager.on(frame, LOAD, cb, this);
            form.submit();

            Ext.fly(form).set(buf);
            Ext.each(hiddens, function(h) {
                Ext.removeNode(h);
            });
        }
    });
})();


Ext.Ajax = new Ext.data.Connection({
    
    
    
    
    
    

    

    
    
    
    
    
    

    
    autoAbort : false,

    
    serializeForm : function(form){
        return Ext.lib.Ajax.serializeForm(form);
    }
});

Ext.util.JSON = new (function(){
    var useHasOwn = !!{}.hasOwnProperty,
        isNative = function() {
            var useNative = null;

            return function() {
                if (useNative === null) {
                    useNative = Ext.USE_NATIVE_JSON && window.JSON && JSON.toString() == '[object JSON]';
                }
        
                return useNative;
            };
        }(),
        pad = function(n) {
            return n < 10 ? "0" + n : n;
        },
        doDecode = function(json){
            return eval("(" + json + ')');    
        },
        doEncode = function(o){
            if(!Ext.isDefined(o) || o === null){
                return "null";
            }else if(Ext.isArray(o)){
                return encodeArray(o);
            }else if(Ext.isDate(o)){
                return Ext.util.JSON.encodeDate(o);
            }else if(Ext.isString(o)){
                return encodeString(o);
            }else if(typeof o == "number"){
                
                return isFinite(o) ? String(o) : "null";
            }else if(Ext.isBoolean(o)){
                return String(o);
            }else {
                var a = ["{"], b, i, v;
                for (i in o) {
                    
                    if(!o.getElementsByTagName){
                        if(!useHasOwn || o.hasOwnProperty(i)) {
                            v = o[i];
                            switch (typeof v) {
                            case "undefined":
                            case "function":
                            case "unknown":
                                break;
                            default:
                                if(b){
                                    a.push(',');
                                }
                                a.push(doEncode(i), ":",
                                        v === null ? "null" : doEncode(v));
                                b = true;
                            }
                        }
                    }
                }
                a.push("}");
                return a.join("");
            }    
        },
        m = {
            "\b": '\\b',
            "\t": '\\t',
            "\n": '\\n',
            "\f": '\\f',
            "\r": '\\r',
            '"' : '\\"',
            "\\": '\\\\'
        },
        encodeString = function(s){
            if (/["\\\x00-\x1f]/.test(s)) {
                return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                    var c = m[b];
                    if(c){
                        return c;
                    }
                    c = b.charCodeAt();
                    return "\\u00" +
                        Math.floor(c / 16).toString(16) +
                        (c % 16).toString(16);
                }) + '"';
            }
            return '"' + s + '"';
        },
        encodeArray = function(o){
            var a = ["["], b, i, l = o.length, v;
                for (i = 0; i < l; i += 1) {
                    v = o[i];
                    switch (typeof v) {
                        case "undefined":
                        case "function":
                        case "unknown":
                            break;
                        default:
                            if (b) {
                                a.push(',');
                            }
                            a.push(v === null ? "null" : Ext.util.JSON.encode(v));
                            b = true;
                    }
                }
                a.push("]");
                return a.join("");
        };

    
    this.encodeDate = function(o){
        return '"' + o.getFullYear() + "-" +
                pad(o.getMonth() + 1) + "-" +
                pad(o.getDate()) + "T" +
                pad(o.getHours()) + ":" +
                pad(o.getMinutes()) + ":" +
                pad(o.getSeconds()) + '"';
    };

    
    this.encode = function() {
        var ec;
        return function(o) {
            if (!ec) {
                
                ec = isNative() ? JSON.stringify : doEncode;
            }
            return ec(o);
        };
    }();


    
    this.decode = function() {
        var dc;
        return function(json) {
            if (!dc) {
                
                dc = isNative() ? JSON.parse : doDecode;
            }
            return dc(json);
        };
    }();

})();

Ext.encode = Ext.util.JSON.encode;

Ext.decode = Ext.util.JSON.decode;
