(function() {
  const h = document.createElement("link").relList;
  if (h && h.supports && h.supports("modulepreload")) return;
  for (const N of document.querySelectorAll('link[rel="modulepreload"]')) s(N);
  new MutationObserver((N) => {
    for (const D of N) if (D.type === "childList") for (const C of D.addedNodes) C.tagName === "LINK" && C.rel === "modulepreload" && s(C);
  }).observe(document, { childList: true, subtree: true });
  function S(N) {
    const D = {};
    return N.integrity && (D.integrity = N.integrity), N.referrerPolicy && (D.referrerPolicy = N.referrerPolicy), N.crossOrigin === "use-credentials" ? D.credentials = "include" : N.crossOrigin === "anonymous" ? D.credentials = "omit" : D.credentials = "same-origin", D;
  }
  function s(N) {
    if (N.ep) return;
    N.ep = true;
    const D = S(N);
    fetch(N.href, D);
  }
})();
var bf = { exports: {} }, Au = {};
var M0;
function hh() {
  if (M0) return Au;
  M0 = 1;
  var f = Symbol.for("react.transitional.element"), h = Symbol.for("react.fragment");
  function S(s, N, D) {
    var C = null;
    if (D !== void 0 && (C = "" + D), N.key !== void 0 && (C = "" + N.key), "key" in N) {
      D = {};
      for (var B in N) B !== "key" && (D[B] = N[B]);
    } else D = N;
    return N = D.ref, { $$typeof: f, type: s, key: C, ref: N !== void 0 ? N : null, props: D };
  }
  return Au.Fragment = h, Au.jsx = S, Au.jsxs = S, Au;
}
var O0;
function yh() {
  return O0 || (O0 = 1, bf.exports = hh()), bf.exports;
}
var g = yh(), Sf = { exports: {} }, V = {};
var D0;
function vh() {
  if (D0) return V;
  D0 = 1;
  var f = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), C = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), Z = Symbol.for("react.lazy"), q = Symbol.for("react.activity"), tl = Symbol.iterator;
  function yl(d) {
    return d === null || typeof d != "object" ? null : (d = tl && d[tl] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var gl = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, nl = Object.assign, ql = {};
  function wl(d, A, M) {
    this.props = d, this.context = A, this.refs = ql, this.updater = M || gl;
  }
  wl.prototype.isReactComponent = {}, wl.prototype.setState = function(d, A) {
    if (typeof d != "object" && typeof d != "function" && d != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, d, A, "setState");
  }, wl.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function nt() {
  }
  nt.prototype = wl.prototype;
  function _l(d, A, M) {
    this.props = d, this.context = A, this.refs = ql, this.updater = M || gl;
  }
  var Wl = _l.prototype = new nt();
  Wl.constructor = _l, nl(Wl, wl.prototype), Wl.isPureReactComponent = true;
  var el = Array.isArray;
  function bl() {
  }
  var L = { H: null, A: null, T: null, S: null }, Ol = Object.prototype.hasOwnProperty;
  function xl(d, A, M) {
    var j = M.ref;
    return { $$typeof: f, type: d, key: A, ref: j !== void 0 ? j : null, props: M };
  }
  function Gl(d, A) {
    return xl(d.type, A, d.props);
  }
  function Al(d) {
    return typeof d == "object" && d !== null && d.$$typeof === f;
  }
  function cl(d) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(M) {
      return A[M];
    });
  }
  var Fl = /\/+/g;
  function gt(d, A) {
    return typeof d == "object" && d !== null && d.key != null ? cl("" + d.key) : A.toString(36);
  }
  function ct(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(bl, bl) : (d.status = "pending", d.then(function(A) {
          d.status === "pending" && (d.status = "fulfilled", d.value = A);
        }, function(A) {
          d.status === "pending" && (d.status = "rejected", d.reason = A);
        })), d.status) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function z(d, A, M, j, X) {
    var w = typeof d;
    (w === "undefined" || w === "boolean") && (d = null);
    var W = false;
    if (d === null) W = true;
    else switch (w) {
      case "bigint":
      case "string":
      case "number":
        W = true;
        break;
      case "object":
        switch (d.$$typeof) {
          case f:
          case h:
            W = true;
            break;
          case Z:
            return W = d._init, z(W(d._payload), A, M, j, X);
        }
    }
    if (W) return X = X(d), W = j === "" ? "." + gt(d, 0) : j, el(X) ? (M = "", W != null && (M = W.replace(Fl, "$&/") + "/"), z(X, A, M, "", function(Ve) {
      return Ve;
    })) : X != null && (Al(X) && (X = Gl(X, M + (X.key == null || d && d.key === X.key ? "" : ("" + X.key).replace(Fl, "$&/") + "/") + W)), A.push(X)), 1;
    W = 0;
    var Dl = j === "" ? "." : j + ":";
    if (el(d)) for (var zl = 0; zl < d.length; zl++) j = d[zl], w = Dl + gt(j, zl), W += z(j, A, M, w, X);
    else if (zl = yl(d), typeof zl == "function") for (d = zl.call(d), zl = 0; !(j = d.next()).done; ) j = j.value, w = Dl + gt(j, zl++), W += z(j, A, M, w, X);
    else if (w === "object") {
      if (typeof d.then == "function") return z(ct(d), A, M, j, X);
      throw A = String(d), Error("Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead.");
    }
    return W;
  }
  function U(d, A, M) {
    if (d == null) return d;
    var j = [], X = 0;
    return z(d, j, "", "", function(w) {
      return A.call(M, w, X++);
    }), j;
  }
  function G(d) {
    if (d._status === -1) {
      var A = d._result;
      A = A(), A.then(function(M) {
        (d._status === 0 || d._status === -1) && (d._status = 1, d._result = M);
      }, function(M) {
        (d._status === 0 || d._status === -1) && (d._status = 2, d._result = M);
      }), d._status === -1 && (d._status = 0, d._result = A);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var fl = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var A = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d), error: d });
      if (!window.dispatchEvent(A)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, sl = { map: U, forEach: function(d, A, M) {
    U(d, function() {
      A.apply(this, arguments);
    }, M);
  }, count: function(d) {
    var A = 0;
    return U(d, function() {
      A++;
    }), A;
  }, toArray: function(d) {
    return U(d, function(A) {
      return A;
    }) || [];
  }, only: function(d) {
    if (!Al(d)) throw Error("React.Children.only expected to receive a single React element child.");
    return d;
  } };
  return V.Activity = q, V.Children = sl, V.Component = wl, V.Fragment = S, V.Profiler = N, V.PureComponent = _l, V.StrictMode = s, V.Suspense = O, V.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = L, V.__COMPILER_RUNTIME = { __proto__: null, c: function(d) {
    return L.H.useMemoCache(d);
  } }, V.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, V.cacheSignal = function() {
    return null;
  }, V.cloneElement = function(d, A, M) {
    if (d == null) throw Error("The argument must be a React element, but you passed " + d + ".");
    var j = nl({}, d.props), X = d.key;
    if (A != null) for (w in A.key !== void 0 && (X = "" + A.key), A) !Ol.call(A, w) || w === "key" || w === "__self" || w === "__source" || w === "ref" && A.ref === void 0 || (j[w] = A[w]);
    var w = arguments.length - 2;
    if (w === 1) j.children = M;
    else if (1 < w) {
      for (var W = Array(w), Dl = 0; Dl < w; Dl++) W[Dl] = arguments[Dl + 2];
      j.children = W;
    }
    return xl(d.type, X, j);
  }, V.createContext = function(d) {
    return d = { $$typeof: C, _currentValue: d, _currentValue2: d, _threadCount: 0, Provider: null, Consumer: null }, d.Provider = d, d.Consumer = { $$typeof: D, _context: d }, d;
  }, V.createElement = function(d, A, M) {
    var j, X = {}, w = null;
    if (A != null) for (j in A.key !== void 0 && (w = "" + A.key), A) Ol.call(A, j) && j !== "key" && j !== "__self" && j !== "__source" && (X[j] = A[j]);
    var W = arguments.length - 2;
    if (W === 1) X.children = M;
    else if (1 < W) {
      for (var Dl = Array(W), zl = 0; zl < W; zl++) Dl[zl] = arguments[zl + 2];
      X.children = Dl;
    }
    if (d && d.defaultProps) for (j in W = d.defaultProps, W) X[j] === void 0 && (X[j] = W[j]);
    return xl(d, w, X);
  }, V.createRef = function() {
    return { current: null };
  }, V.forwardRef = function(d) {
    return { $$typeof: B, render: d };
  }, V.isValidElement = Al, V.lazy = function(d) {
    return { $$typeof: Z, _payload: { _status: -1, _result: d }, _init: G };
  }, V.memo = function(d, A) {
    return { $$typeof: p, type: d, compare: A === void 0 ? null : A };
  }, V.startTransition = function(d) {
    var A = L.T, M = {};
    L.T = M;
    try {
      var j = d(), X = L.S;
      X !== null && X(M, j), typeof j == "object" && j !== null && typeof j.then == "function" && j.then(bl, fl);
    } catch (w) {
      fl(w);
    } finally {
      A !== null && M.types !== null && (A.types = M.types), L.T = A;
    }
  }, V.unstable_useCacheRefresh = function() {
    return L.H.useCacheRefresh();
  }, V.use = function(d) {
    return L.H.use(d);
  }, V.useActionState = function(d, A, M) {
    return L.H.useActionState(d, A, M);
  }, V.useCallback = function(d, A) {
    return L.H.useCallback(d, A);
  }, V.useContext = function(d) {
    return L.H.useContext(d);
  }, V.useDebugValue = function() {
  }, V.useDeferredValue = function(d, A) {
    return L.H.useDeferredValue(d, A);
  }, V.useEffect = function(d, A) {
    return L.H.useEffect(d, A);
  }, V.useEffectEvent = function(d) {
    return L.H.useEffectEvent(d);
  }, V.useId = function() {
    return L.H.useId();
  }, V.useImperativeHandle = function(d, A, M) {
    return L.H.useImperativeHandle(d, A, M);
  }, V.useInsertionEffect = function(d, A) {
    return L.H.useInsertionEffect(d, A);
  }, V.useLayoutEffect = function(d, A) {
    return L.H.useLayoutEffect(d, A);
  }, V.useMemo = function(d, A) {
    return L.H.useMemo(d, A);
  }, V.useOptimistic = function(d, A) {
    return L.H.useOptimistic(d, A);
  }, V.useReducer = function(d, A, M) {
    return L.H.useReducer(d, A, M);
  }, V.useRef = function(d) {
    return L.H.useRef(d);
  }, V.useState = function(d) {
    return L.H.useState(d);
  }, V.useSyncExternalStore = function(d, A, M) {
    return L.H.useSyncExternalStore(d, A, M);
  }, V.useTransition = function() {
    return L.H.useTransition();
  }, V.version = "19.2.0", V;
}
var j0;
function Ef() {
  return j0 || (j0 = 1, Sf.exports = vh()), Sf.exports;
}
var F = Ef(), pf = { exports: {} }, Nu = {}, _f = { exports: {} }, xf = {};
var U0;
function gh() {
  return U0 || (U0 = 1, (function(f) {
    function h(z, U) {
      var G = z.length;
      z.push(U);
      l: for (; 0 < G; ) {
        var fl = G - 1 >>> 1, sl = z[fl];
        if (0 < N(sl, U)) z[fl] = U, z[G] = sl, G = fl;
        else break l;
      }
    }
    function S(z) {
      return z.length === 0 ? null : z[0];
    }
    function s(z) {
      if (z.length === 0) return null;
      var U = z[0], G = z.pop();
      if (G !== U) {
        z[0] = G;
        l: for (var fl = 0, sl = z.length, d = sl >>> 1; fl < d; ) {
          var A = 2 * (fl + 1) - 1, M = z[A], j = A + 1, X = z[j];
          if (0 > N(M, G)) j < sl && 0 > N(X, M) ? (z[fl] = X, z[j] = G, fl = j) : (z[fl] = M, z[A] = G, fl = A);
          else if (j < sl && 0 > N(X, G)) z[fl] = X, z[j] = G, fl = j;
          else break l;
        }
      }
      return U;
    }
    function N(z, U) {
      var G = z.sortIndex - U.sortIndex;
      return G !== 0 ? G : z.id - U.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var D = performance;
      f.unstable_now = function() {
        return D.now();
      };
    } else {
      var C = Date, B = C.now();
      f.unstable_now = function() {
        return C.now() - B;
      };
    }
    var O = [], p = [], Z = 1, q = null, tl = 3, yl = false, gl = false, nl = false, ql = false, wl = typeof setTimeout == "function" ? setTimeout : null, nt = typeof clearTimeout == "function" ? clearTimeout : null, _l = typeof setImmediate < "u" ? setImmediate : null;
    function Wl(z) {
      for (var U = S(p); U !== null; ) {
        if (U.callback === null) s(p);
        else if (U.startTime <= z) s(p), U.sortIndex = U.expirationTime, h(O, U);
        else break;
        U = S(p);
      }
    }
    function el(z) {
      if (nl = false, Wl(z), !gl) if (S(O) !== null) gl = true, bl || (bl = true, cl());
      else {
        var U = S(p);
        U !== null && ct(el, U.startTime - z);
      }
    }
    var bl = false, L = -1, Ol = 5, xl = -1;
    function Gl() {
      return ql ? true : !(f.unstable_now() - xl < Ol);
    }
    function Al() {
      if (ql = false, bl) {
        var z = f.unstable_now();
        xl = z;
        var U = true;
        try {
          l: {
            gl = false, nl && (nl = false, nt(L), L = -1), yl = true;
            var G = tl;
            try {
              t: {
                for (Wl(z), q = S(O); q !== null && !(q.expirationTime > z && Gl()); ) {
                  var fl = q.callback;
                  if (typeof fl == "function") {
                    q.callback = null, tl = q.priorityLevel;
                    var sl = fl(q.expirationTime <= z);
                    if (z = f.unstable_now(), typeof sl == "function") {
                      q.callback = sl, Wl(z), U = true;
                      break t;
                    }
                    q === S(O) && s(O), Wl(z);
                  } else s(O);
                  q = S(O);
                }
                if (q !== null) U = true;
                else {
                  var d = S(p);
                  d !== null && ct(el, d.startTime - z), U = false;
                }
              }
              break l;
            } finally {
              q = null, tl = G, yl = false;
            }
            U = void 0;
          }
        } finally {
          U ? cl() : bl = false;
        }
      }
    }
    var cl;
    if (typeof _l == "function") cl = function() {
      _l(Al);
    };
    else if (typeof MessageChannel < "u") {
      var Fl = new MessageChannel(), gt = Fl.port2;
      Fl.port1.onmessage = Al, cl = function() {
        gt.postMessage(null);
      };
    } else cl = function() {
      wl(Al, 0);
    };
    function ct(z, U) {
      L = wl(function() {
        z(f.unstable_now());
      }, U);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, f.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Ol = 0 < z ? Math.floor(1e3 / z) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return tl;
    }, f.unstable_next = function(z) {
      switch (tl) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = tl;
      }
      var G = tl;
      tl = U;
      try {
        return z();
      } finally {
        tl = G;
      }
    }, f.unstable_requestPaint = function() {
      ql = true;
    }, f.unstable_runWithPriority = function(z, U) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var G = tl;
      tl = z;
      try {
        return U();
      } finally {
        tl = G;
      }
    }, f.unstable_scheduleCallback = function(z, U, G) {
      var fl = f.unstable_now();
      switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? fl + G : fl) : G = fl, z) {
        case 1:
          var sl = -1;
          break;
        case 2:
          sl = 250;
          break;
        case 5:
          sl = 1073741823;
          break;
        case 4:
          sl = 1e4;
          break;
        default:
          sl = 5e3;
      }
      return sl = G + sl, z = { id: Z++, callback: U, priorityLevel: z, startTime: G, expirationTime: sl, sortIndex: -1 }, G > fl ? (z.sortIndex = G, h(p, z), S(O) === null && z === S(p) && (nl ? (nt(L), L = -1) : nl = true, ct(el, G - fl))) : (z.sortIndex = sl, h(O, z), gl || yl || (gl = true, bl || (bl = true, cl()))), z;
    }, f.unstable_shouldYield = Gl, f.unstable_wrapCallback = function(z) {
      var U = tl;
      return function() {
        var G = tl;
        tl = U;
        try {
          return z.apply(this, arguments);
        } finally {
          tl = G;
        }
      };
    };
  })(xf)), xf;
}
var C0;
function bh() {
  return C0 || (C0 = 1, _f.exports = gh()), _f.exports;
}
var zf = { exports: {} }, kl = {};
var R0;
function Sh() {
  if (R0) return kl;
  R0 = 1;
  var f = Ef();
  function h(O) {
    var p = "https://react.dev/errors/" + O;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var Z = 2; Z < arguments.length; Z++) p += "&args[]=" + encodeURIComponent(arguments[Z]);
    }
    return "Minified React error #" + O + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function S() {
  }
  var s = { d: { f: S, r: function() {
    throw Error(h(522));
  }, D: S, C: S, L: S, m: S, X: S, S, M: S }, p: 0, findDOMNode: null }, N = Symbol.for("react.portal");
  function D(O, p, Z) {
    var q = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: N, key: q == null ? null : "" + q, children: O, containerInfo: p, implementation: Z };
  }
  var C = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function B(O, p) {
    if (O === "font") return "";
    if (typeof p == "string") return p === "use-credentials" ? p : "";
  }
  return kl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, kl.createPortal = function(O, p) {
    var Z = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11) throw Error(h(299));
    return D(O, p, null, Z);
  }, kl.flushSync = function(O) {
    var p = C.T, Z = s.p;
    try {
      if (C.T = null, s.p = 2, O) return O();
    } finally {
      C.T = p, s.p = Z, s.d.f();
    }
  }, kl.preconnect = function(O, p) {
    typeof O == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(O, p));
  }, kl.prefetchDNS = function(O) {
    typeof O == "string" && s.d.D(O);
  }, kl.preinit = function(O, p) {
    if (typeof O == "string" && p && typeof p.as == "string") {
      var Z = p.as, q = B(Z, p.crossOrigin), tl = typeof p.integrity == "string" ? p.integrity : void 0, yl = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      Z === "style" ? s.d.S(O, typeof p.precedence == "string" ? p.precedence : void 0, { crossOrigin: q, integrity: tl, fetchPriority: yl }) : Z === "script" && s.d.X(O, { crossOrigin: q, integrity: tl, fetchPriority: yl, nonce: typeof p.nonce == "string" ? p.nonce : void 0 });
    }
  }, kl.preinitModule = function(O, p) {
    if (typeof O == "string") if (typeof p == "object" && p !== null) {
      if (p.as == null || p.as === "script") {
        var Z = B(p.as, p.crossOrigin);
        s.d.M(O, { crossOrigin: Z, integrity: typeof p.integrity == "string" ? p.integrity : void 0, nonce: typeof p.nonce == "string" ? p.nonce : void 0 });
      }
    } else p == null && s.d.M(O);
  }, kl.preload = function(O, p) {
    if (typeof O == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var Z = p.as, q = B(Z, p.crossOrigin);
      s.d.L(O, Z, { crossOrigin: q, integrity: typeof p.integrity == "string" ? p.integrity : void 0, nonce: typeof p.nonce == "string" ? p.nonce : void 0, type: typeof p.type == "string" ? p.type : void 0, fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0, referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0, imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0, imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0, media: typeof p.media == "string" ? p.media : void 0 });
    }
  }, kl.preloadModule = function(O, p) {
    if (typeof O == "string") if (p) {
      var Z = B(p.as, p.crossOrigin);
      s.d.m(O, { as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0, crossOrigin: Z, integrity: typeof p.integrity == "string" ? p.integrity : void 0 });
    } else s.d.m(O);
  }, kl.requestFormReset = function(O) {
    s.d.r(O);
  }, kl.unstable_batchedUpdates = function(O, p) {
    return O(p);
  }, kl.useFormState = function(O, p, Z) {
    return C.H.useFormState(O, p, Z);
  }, kl.useFormStatus = function() {
    return C.H.useHostTransitionStatus();
  }, kl.version = "19.2.0", kl;
}
var H0;
function ph() {
  if (H0) return zf.exports;
  H0 = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
    } catch (h) {
      console.error(h);
    }
  }
  return f(), zf.exports = Sh(), zf.exports;
}
var B0;
function _h() {
  if (B0) return Nu;
  B0 = 1;
  var f = bh(), h = Ef(), S = ph();
  function s(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++) t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function N(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function D(l) {
    var t = l, e = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (e = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? e : null;
  }
  function C(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function B(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function O(l) {
    if (D(l) !== l) throw Error(s(188));
  }
  function p(l) {
    var t = l.alternate;
    if (!t) {
      if (t = D(l), t === null) throw Error(s(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (a = u.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return O(u), l;
          if (n === a) return O(u), t;
          n = n.sibling;
        }
        throw Error(s(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var c = false, i = u.child; i; ) {
          if (i === e) {
            c = true, e = u, a = n;
            break;
          }
          if (i === a) {
            c = true, a = u, e = n;
            break;
          }
          i = i.sibling;
        }
        if (!c) {
          for (i = n.child; i; ) {
            if (i === e) {
              c = true, e = n, a = u;
              break;
            }
            if (i === a) {
              c = true, a = n, e = u;
              break;
            }
            i = i.sibling;
          }
          if (!c) throw Error(s(189));
        }
      }
      if (e.alternate !== a) throw Error(s(190));
    }
    if (e.tag !== 3) throw Error(s(188));
    return e.stateNode.current === e ? l : t;
  }
  function Z(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = Z(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var q = Object.assign, tl = Symbol.for("react.element"), yl = Symbol.for("react.transitional.element"), gl = Symbol.for("react.portal"), nl = Symbol.for("react.fragment"), ql = Symbol.for("react.strict_mode"), wl = Symbol.for("react.profiler"), nt = Symbol.for("react.consumer"), _l = Symbol.for("react.context"), Wl = Symbol.for("react.forward_ref"), el = Symbol.for("react.suspense"), bl = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), Ol = Symbol.for("react.lazy"), xl = Symbol.for("react.activity"), Gl = Symbol.for("react.memo_cache_sentinel"), Al = Symbol.iterator;
  function cl(l) {
    return l === null || typeof l != "object" ? null : (l = Al && l[Al] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Fl = Symbol.for("react.client.reference");
  function gt(l) {
    if (l == null) return null;
    if (typeof l == "function") return l.$$typeof === Fl ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case nl:
        return "Fragment";
      case wl:
        return "Profiler";
      case ql:
        return "StrictMode";
      case el:
        return "Suspense";
      case bl:
        return "SuspenseList";
      case xl:
        return "Activity";
    }
    if (typeof l == "object") switch (l.$$typeof) {
      case gl:
        return "Portal";
      case _l:
        return l.displayName || "Context";
      case nt:
        return (l._context.displayName || "Context") + ".Consumer";
      case Wl:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case L:
        return t = l.displayName || null, t !== null ? t : gt(l.type) || "Memo";
      case Ol:
        t = l._payload, l = l._init;
        try {
          return gt(l(t));
        } catch {
        }
    }
    return null;
  }
  var ct = Array.isArray, z = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = S.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = { pending: false, data: null, method: null, action: null }, fl = [], sl = -1;
  function d(l) {
    return { current: l };
  }
  function A(l) {
    0 > sl || (l.current = fl[sl], fl[sl] = null, sl--);
  }
  function M(l, t) {
    sl++, fl[sl] = l.current, l.current = t;
  }
  var j = d(null), X = d(null), w = d(null), W = d(null);
  function Dl(l, t) {
    switch (M(w, t), M(X, l), M(j, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Fr(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI) t = Fr(t), l = Ir(t, l);
        else switch (l) {
          case "svg":
            l = 1;
            break;
          case "math":
            l = 2;
            break;
          default:
            l = 0;
        }
    }
    A(j), M(j, l);
  }
  function zl() {
    A(j), A(X), A(w);
  }
  function Ve(l) {
    l.memoizedState !== null && M(W, l);
    var t = j.current, e = Ir(t, l.type);
    t !== e && (M(X, l), M(j, e));
  }
  function Ee(l) {
    X.current === l && (A(j), A(X)), W.current === l && (A(W), xu._currentValue = G);
  }
  var Ke, Ru;
  function Ht(l) {
    if (Ke === void 0) try {
      throw Error();
    } catch (e) {
      var t = e.stack.trim().match(/\n( *(at )?)/);
      Ke = t && t[1] || "", Ru = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + Ke + l + Ru;
  }
  var Ua = false;
  function Ca(l, t) {
    if (!l || Ua) return "";
    Ua = true;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = { DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var E = function() {
              throw Error();
            };
            if (Object.defineProperty(E.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(E, []);
              } catch (_) {
                var b = _;
              }
              Reflect.construct(l, [], E);
            } else {
              try {
                E.call();
              } catch (_) {
                b = _;
              }
              l.call(E.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (_) {
              b = _;
            }
            (E = l()) && typeof E.catch == "function" && E.catch(function() {
            });
          }
        } catch (_) {
          if (_ && b && typeof _.stack == "string") return [_.stack, b.stack];
        }
        return [null, null];
      } };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
      u && u.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var n = a.DetermineComponentFrameRoot(), c = n[0], i = n[1];
      if (c && i) {
        var o = c.split(`
`), v = i.split(`
`);
        for (u = a = 0; a < o.length && !o[a].includes("DetermineComponentFrameRoot"); ) a++;
        for (; u < v.length && !v[u].includes("DetermineComponentFrameRoot"); ) u++;
        if (a === o.length || u === v.length) for (a = o.length - 1, u = v.length - 1; 1 <= a && 0 <= u && o[a] !== v[u]; ) u--;
        for (; 1 <= a && 0 <= u; a--, u--) if (o[a] !== v[u]) {
          if (a !== 1 || u !== 1) do
            if (a--, u--, 0 > u || o[a] !== v[u]) {
              var x = `
` + o[a].replace(" at new ", " at ");
              return l.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", l.displayName)), x;
            }
          while (1 <= a && 0 <= u);
          break;
        }
      }
    } finally {
      Ua = false, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? Ht(e) : "";
  }
  function tc(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Ht(l.type);
      case 16:
        return Ht("Lazy");
      case 13:
        return l.child !== t && t !== null ? Ht("Suspense Fallback") : Ht("Suspense");
      case 19:
        return Ht("SuspenseList");
      case 0:
      case 15:
        return Ca(l.type, false);
      case 11:
        return Ca(l.type.render, false);
      case 1:
        return Ca(l.type, true);
      case 31:
        return Ht("Activity");
      default:
        return "";
    }
  }
  function Nf(l) {
    try {
      var t = "", e = null;
      do
        t += tc(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var ec = Object.prototype.hasOwnProperty, ac = f.unstable_scheduleCallback, uc = f.unstable_cancelCallback, K0 = f.unstable_shouldYield, J0 = f.unstable_requestPaint, it = f.unstable_now, W0 = f.unstable_getCurrentPriorityLevel, Mf = f.unstable_ImmediatePriority, Of = f.unstable_UserBlockingPriority, Hu = f.unstable_NormalPriority, k0 = f.unstable_LowPriority, Df = f.unstable_IdlePriority, $0 = f.log, F0 = f.unstable_setDisableYieldValue, Ra = null, ft = null;
  function le(l) {
    if (typeof $0 == "function" && F0(l), ft && typeof ft.setStrictMode == "function") try {
      ft.setStrictMode(Ra, l);
    } catch {
    }
  }
  var st = Math.clz32 ? Math.clz32 : ld, I0 = Math.log, P0 = Math.LN2;
  function ld(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (I0(l) / P0 | 0) | 0;
  }
  var Bu = 256, qu = 262144, Yu = 4194304;
  function Ae(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function Gu(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = l.suspendedLanes, c = l.pingedLanes;
    l = l.warmLanes;
    var i = a & 134217727;
    return i !== 0 ? (a = i & ~n, a !== 0 ? u = Ae(a) : (c &= i, c !== 0 ? u = Ae(c) : e || (e = i & ~l, e !== 0 && (u = Ae(e))))) : (i = a & ~n, i !== 0 ? u = Ae(i) : c !== 0 ? u = Ae(c) : e || (e = a & ~l, e !== 0 && (u = Ae(e)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
  }
  function Ha(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function td(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function jf() {
    var l = Yu;
    return Yu <<= 1, (Yu & 62914560) === 0 && (Yu = 4194304), l;
  }
  function nc(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function Ba(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function ed(l, t, e, a, u, n) {
    var c = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var i = l.entanglements, o = l.expirationTimes, v = l.hiddenUpdates;
    for (e = c & ~e; 0 < e; ) {
      var x = 31 - st(e), E = 1 << x;
      i[x] = 0, o[x] = -1;
      var b = v[x];
      if (b !== null) for (v[x] = null, x = 0; x < b.length; x++) {
        var _ = b[x];
        _ !== null && (_.lane &= -536870913);
      }
      e &= ~E;
    }
    a !== 0 && Uf(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(c & ~t));
  }
  function Uf(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - st(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function Cf(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - st(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function Rf(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : cc(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function cc(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function ic(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Hf() {
    var l = U.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : _0(l.type));
  }
  function Bf(l, t) {
    var e = U.p;
    try {
      return U.p = l, t();
    } finally {
      U.p = e;
    }
  }
  var te = Math.random().toString(36).slice(2), Zl = "__reactFiber$" + te, Il = "__reactProps$" + te, Je = "__reactContainer$" + te, fc = "__reactEvents$" + te, ad = "__reactListeners$" + te, ud = "__reactHandles$" + te, qf = "__reactResources$" + te, qa = "__reactMarker$" + te;
  function sc(l) {
    delete l[Zl], delete l[Il], delete l[fc], delete l[ad], delete l[ud];
  }
  function We(l) {
    var t = l[Zl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[Je] || e[Zl]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null) for (l = n0(l); l !== null; ) {
          if (e = l[Zl]) return e;
          l = n0(l);
        }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function ke(l) {
    if (l = l[Zl] || l[Je]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return l;
    }
    return null;
  }
  function Ya(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(s(33));
  }
  function $e(l) {
    var t = l[qf];
    return t || (t = l[qf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Xl(l) {
    l[qa] = true;
  }
  var Yf = /* @__PURE__ */ new Set(), Gf = {};
  function Ne(l, t) {
    Fe(l, t), Fe(l + "Capture", t);
  }
  function Fe(l, t) {
    for (Gf[l] = t, l = 0; l < t.length; l++) Yf.add(t[l]);
  }
  var nd = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Xf = {}, Qf = {};
  function cd(l) {
    return ec.call(Qf, l) ? true : ec.call(Xf, l) ? false : nd.test(l) ? Qf[l] = true : (Xf[l] = true, false);
  }
  function Xu(l, t, e) {
    if (cd(t)) if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
          l.removeAttribute(t);
          return;
        case "boolean":
          var a = t.toLowerCase().slice(0, 5);
          if (a !== "data-" && a !== "aria-") {
            l.removeAttribute(t);
            return;
          }
      }
      l.setAttribute(t, "" + e);
    }
  }
  function Qu(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + e);
    }
  }
  function Bt(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, "" + a);
    }
  }
  function bt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function wf(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function id(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, n = a.set;
      return Object.defineProperty(l, t, { configurable: true, get: function() {
        return u.call(this);
      }, set: function(c) {
        e = "" + c, n.call(this, c);
      } }), Object.defineProperty(l, t, { enumerable: a.enumerable }), { getValue: function() {
        return e;
      }, setValue: function(c) {
        e = "" + c;
      }, stopTracking: function() {
        l._valueTracker = null, delete l[t];
      } };
    }
  }
  function oc(l) {
    if (!l._valueTracker) {
      var t = wf(l) ? "checked" : "value";
      l._valueTracker = id(l, t, "" + l[t]);
    }
  }
  function Zf(l) {
    if (!l) return false;
    var t = l._valueTracker;
    if (!t) return true;
    var e = t.getValue(), a = "";
    return l && (a = wf(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), true) : false;
  }
  function wu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var fd = /[\n"\\]/g;
  function St(l) {
    return l.replace(fd, function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function rc(l, t, e, a, u, n, c, i) {
    l.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.type = c : l.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + bt(t)) : l.value !== "" + bt(t) && (l.value = "" + bt(t)) : c !== "submit" && c !== "reset" || l.removeAttribute("value"), t != null ? dc(l, c, bt(t)) : e != null ? dc(l, c, bt(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.name = "" + bt(i) : l.removeAttribute("name");
  }
  function Lf(l, t, e, a, u, n, c, i) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        oc(l);
        return;
      }
      e = e != null ? "" + bt(e) : "", t = t != null ? "" + bt(t) : e, i || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = i ? l.checked : !!a, l.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (l.name = c), oc(l);
  }
  function dc(l, t, e) {
    t === "number" && wu(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function Ie(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < e.length; u++) t["$" + e[u]] = true;
      for (e = 0; e < l.length; e++) u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = true);
    } else {
      for (e = "" + bt(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          l[u].selected = true, a && (l[u].defaultSelected = true);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = true);
    }
  }
  function Vf(l, t, e) {
    if (t != null && (t = "" + bt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + bt(e) : "";
  }
  function Kf(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (ct(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = bt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), oc(l);
  }
  function Pe(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var sd = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function Jf(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || sd.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Wf(l, t, e) {
    if (t != null && typeof t != "object") throw Error(s(62));
    if (l = l.style, e != null) {
      for (var a in e) !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var u in t) a = t[u], t.hasOwnProperty(u) && e[u] !== a && Jf(l, u, a);
    } else for (var n in t) t.hasOwnProperty(n) && Jf(l, n, t[n]);
  }
  function mc(l) {
    if (l.indexOf("-") === -1) return false;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var od = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), rd = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Zu(l) {
    return rd.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function qt() {
  }
  var hc = null;
  function yc(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var la = null, ta = null;
  function kf(l) {
    var t = ke(l);
    if (t && (l = t.stateNode)) {
      var e = l[Il] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (rc(l, e.value, e.defaultValue, e.defaultValue, e.checked, e.defaultChecked, e.type, e.name), t = e.name, e.type === "radio" && t != null) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll('input[name="' + St("" + t) + '"][type="radio"]'), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[Il] || null;
                if (!u) throw Error(s(90));
                rc(a, u.value, u.defaultValue, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name);
              }
            }
            for (t = 0; t < e.length; t++) a = e[t], a.form === l.form && Zf(a);
          }
          break l;
        case "textarea":
          Vf(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && Ie(l, !!e.multiple, t, false);
      }
    }
  }
  var vc = false;
  function $f(l, t, e) {
    if (vc) return l(t, e);
    vc = true;
    try {
      var a = l(t);
      return a;
    } finally {
      if (vc = false, (la !== null || ta !== null) && (jn(), la && (t = la, l = ta, ta = la = null, kf(t), l))) for (t = 0; t < l.length; t++) kf(l[t]);
    }
  }
  function Ga(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[Il] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
        break l;
      default:
        l = false;
    }
    if (l) return null;
    if (e && typeof e != "function") throw Error(s(231, t, typeof e));
    return e;
  }
  var Yt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), gc = false;
  if (Yt) try {
    var Xa = {};
    Object.defineProperty(Xa, "passive", { get: function() {
      gc = true;
    } }), window.addEventListener("test", Xa, Xa), window.removeEventListener("test", Xa, Xa);
  } catch {
    gc = false;
  }
  var ee = null, bc = null, Lu = null;
  function Ff() {
    if (Lu) return Lu;
    var l, t = bc, e = t.length, a, u = "value" in ee ? ee.value : ee.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var c = e - l;
    for (a = 1; a <= c && t[e - a] === u[n - a]; a++) ;
    return Lu = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function Vu(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Ku() {
    return true;
  }
  function If() {
    return false;
  }
  function Pl(l) {
    function t(e, a, u, n, c) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = c, this.currentTarget = null;
      for (var i in l) l.hasOwnProperty(i) && (e = l[i], this[i] = e ? e(n) : n[i]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === false) ? Ku : If, this.isPropagationStopped = If, this;
    }
    return q(t.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var e = this.nativeEvent;
      e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = false), this.isDefaultPrevented = Ku);
    }, stopPropagation: function() {
      var e = this.nativeEvent;
      e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = true), this.isPropagationStopped = Ku);
    }, persist: function() {
    }, isPersistent: Ku }), t;
  }
  var Me = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(l) {
    return l.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ju = Pl(Me), Qa = q({}, Me, { view: 0, detail: 0 }), dd = Pl(Qa), Sc, pc, wa, Wu = q({}, Qa, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: xc, button: 0, buttons: 0, relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  }, movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== wa && (wa && l.type === "mousemove" ? (Sc = l.screenX - wa.screenX, pc = l.screenY - wa.screenY) : pc = Sc = 0, wa = l), Sc);
  }, movementY: function(l) {
    return "movementY" in l ? l.movementY : pc;
  } }), Pf = Pl(Wu), md = q({}, Wu, { dataTransfer: 0 }), hd = Pl(md), yd = q({}, Qa, { relatedTarget: 0 }), _c = Pl(yd), vd = q({}, Me, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), gd = Pl(vd), bd = q({}, Me, { clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  } }), Sd = Pl(bd), pd = q({}, Me, { data: 0 }), ls = Pl(pd), _d = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, xd = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, zd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Td(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = zd[l]) ? !!t[l] : false;
  }
  function xc() {
    return Td;
  }
  var Ed = q({}, Qa, { key: function(l) {
    if (l.key) {
      var t = _d[l.key] || l.key;
      if (t !== "Unidentified") return t;
    }
    return l.type === "keypress" ? (l = Vu(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? xd[l.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: xc, charCode: function(l) {
    return l.type === "keypress" ? Vu(l) : 0;
  }, keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }, which: function(l) {
    return l.type === "keypress" ? Vu(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  } }), Ad = Pl(Ed), Nd = q({}, Wu, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ts = Pl(Nd), Md = q({}, Qa, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: xc }), Od = Pl(Md), Dd = q({}, Me, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), jd = Pl(Dd), Ud = q({}, Wu, { deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  }, deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), Cd = Pl(Ud), Rd = q({}, Me, { newState: 0, oldState: 0 }), Hd = Pl(Rd), Bd = [9, 13, 27, 32], zc = Yt && "CompositionEvent" in window, Za = null;
  Yt && "documentMode" in document && (Za = document.documentMode);
  var qd = Yt && "TextEvent" in window && !Za, es = Yt && (!zc || Za && 8 < Za && 11 >= Za), as = " ", us = false;
  function ns(l, t) {
    switch (l) {
      case "keyup":
        return Bd.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function cs(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var ea = false;
  function Yd(l, t) {
    switch (l) {
      case "compositionend":
        return cs(t);
      case "keypress":
        return t.which !== 32 ? null : (us = true, as);
      case "textInput":
        return l = t.data, l === as && us ? null : l;
      default:
        return null;
    }
  }
  function Gd(l, t) {
    if (ea) return l === "compositionend" || !zc && ns(l, t) ? (l = Ff(), Lu = bc = ee = null, ea = false, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return es && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Xd = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function is(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Xd[l.type] : t === "textarea";
  }
  function fs(l, t, e, a) {
    la ? ta ? ta.push(a) : ta = [a] : la = a, t = Yn(t, "onChange"), 0 < t.length && (e = new Ju("onChange", "change", null, e, a), l.push({ event: e, listeners: t }));
  }
  var La = null, Va = null;
  function Qd(l) {
    Vr(l, 0);
  }
  function ku(l) {
    var t = Ya(l);
    if (Zf(t)) return l;
  }
  function ss(l, t) {
    if (l === "change") return t;
  }
  var os = false;
  if (Yt) {
    var Tc;
    if (Yt) {
      var Ec = "oninput" in document;
      if (!Ec) {
        var rs = document.createElement("div");
        rs.setAttribute("oninput", "return;"), Ec = typeof rs.oninput == "function";
      }
      Tc = Ec;
    } else Tc = false;
    os = Tc && (!document.documentMode || 9 < document.documentMode);
  }
  function ds() {
    La && (La.detachEvent("onpropertychange", ms), Va = La = null);
  }
  function ms(l) {
    if (l.propertyName === "value" && ku(Va)) {
      var t = [];
      fs(t, Va, l, yc(l)), $f(Qd, t);
    }
  }
  function wd(l, t, e) {
    l === "focusin" ? (ds(), La = t, Va = e, La.attachEvent("onpropertychange", ms)) : l === "focusout" && ds();
  }
  function Zd(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown") return ku(Va);
  }
  function Ld(l, t) {
    if (l === "click") return ku(t);
  }
  function Vd(l, t) {
    if (l === "input" || l === "change") return ku(t);
  }
  function Kd(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var ot = typeof Object.is == "function" ? Object.is : Kd;
  function Ka(l, t) {
    if (ot(l, t)) return true;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null) return false;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return false;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!ec.call(t, u) || !ot(l[u], t[u])) return false;
    }
    return true;
  }
  function hs(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function ys(l, t) {
    var e = hs(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = l + e.textContent.length, l <= t && a >= t) return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = hs(e);
    }
  }
  function vs(l, t) {
    return l && t ? l === t ? true : l && l.nodeType === 3 ? false : t && t.nodeType === 3 ? vs(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : false : false;
  }
  function gs(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = wu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = false;
      }
      if (e) l = t.contentWindow;
      else break;
      t = wu(l.document);
    }
    return t;
  }
  function Ac(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Jd = Yt && "documentMode" in document && 11 >= document.documentMode, aa = null, Nc = null, Ja = null, Mc = false;
  function bs(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Mc || aa == null || aa !== wu(a) || (a = aa, "selectionStart" in a && Ac(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = { anchorNode: a.anchorNode, anchorOffset: a.anchorOffset, focusNode: a.focusNode, focusOffset: a.focusOffset }), Ja && Ka(Ja, a) || (Ja = a, a = Yn(Nc, "onSelect"), 0 < a.length && (t = new Ju("onSelect", "select", null, t, e), l.push({ event: t, listeners: a }), t.target = aa)));
  }
  function Oe(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var ua = { animationend: Oe("Animation", "AnimationEnd"), animationiteration: Oe("Animation", "AnimationIteration"), animationstart: Oe("Animation", "AnimationStart"), transitionrun: Oe("Transition", "TransitionRun"), transitionstart: Oe("Transition", "TransitionStart"), transitioncancel: Oe("Transition", "TransitionCancel"), transitionend: Oe("Transition", "TransitionEnd") }, Oc = {}, Ss = {};
  Yt && (Ss = document.createElement("div").style, "AnimationEvent" in window || (delete ua.animationend.animation, delete ua.animationiteration.animation, delete ua.animationstart.animation), "TransitionEvent" in window || delete ua.transitionend.transition);
  function De(l) {
    if (Oc[l]) return Oc[l];
    if (!ua[l]) return l;
    var t = ua[l], e;
    for (e in t) if (t.hasOwnProperty(e) && e in Ss) return Oc[l] = t[e];
    return l;
  }
  var ps = De("animationend"), _s = De("animationiteration"), xs = De("animationstart"), Wd = De("transitionrun"), kd = De("transitionstart"), $d = De("transitioncancel"), zs = De("transitionend"), Ts = /* @__PURE__ */ new Map(), Dc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  Dc.push("scrollEnd");
  function Mt(l, t) {
    Ts.set(l, t), Ne(t, [l]);
  }
  var $u = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l), error: l });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, pt = [], na = 0, jc = 0;
  function Fu() {
    for (var l = na, t = jc = na = 0; t < l; ) {
      var e = pt[t];
      pt[t++] = null;
      var a = pt[t];
      pt[t++] = null;
      var u = pt[t];
      pt[t++] = null;
      var n = pt[t];
      if (pt[t++] = null, a !== null && u !== null) {
        var c = a.pending;
        c === null ? u.next = u : (u.next = c.next, c.next = u), a.pending = u;
      }
      n !== 0 && Es(e, u, n);
    }
  }
  function Iu(l, t, e, a) {
    pt[na++] = l, pt[na++] = t, pt[na++] = e, pt[na++] = a, jc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function Uc(l, t, e, a) {
    return Iu(l, t, e, a), Pu(l);
  }
  function je(l, t) {
    return Iu(l, null, null, t), Pu(l);
  }
  function Es(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = false, n = l.return; n !== null; ) n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = true)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - st(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function Pu(l) {
    if (50 < yu) throw yu = 0, Qi = null, Error(s(185));
    for (var t = l.return; t !== null; ) l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ca = {};
  function Fd(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function rt(l, t, e, a) {
    return new Fd(l, t, e, a);
  }
  function Cc(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Gt(l, t) {
    var e = l.alternate;
    return e === null ? (e = rt(l.tag, t, l.key, l.mode), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function As(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), l;
  }
  function ln(l, t, e, a, u, n) {
    var c = 0;
    if (a = l, typeof l == "function") Cc(l) && (c = 1);
    else if (typeof l == "string") c = eh(l, e, j.current) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else l: switch (l) {
      case xl:
        return l = rt(31, e, t, u), l.elementType = xl, l.lanes = n, l;
      case nl:
        return Ue(e.children, u, n, t);
      case ql:
        c = 8, u |= 24;
        break;
      case wl:
        return l = rt(12, e, t, u | 2), l.elementType = wl, l.lanes = n, l;
      case el:
        return l = rt(13, e, t, u), l.elementType = el, l.lanes = n, l;
      case bl:
        return l = rt(19, e, t, u), l.elementType = bl, l.lanes = n, l;
      default:
        if (typeof l == "object" && l !== null) switch (l.$$typeof) {
          case _l:
            c = 10;
            break l;
          case nt:
            c = 9;
            break l;
          case Wl:
            c = 11;
            break l;
          case L:
            c = 14;
            break l;
          case Ol:
            c = 16, a = null;
            break l;
        }
        c = 29, e = Error(s(130, l === null ? "null" : typeof l, "")), a = null;
    }
    return t = rt(c, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function Ue(l, t, e, a) {
    return l = rt(7, l, a, t), l.lanes = e, l;
  }
  function Rc(l, t, e) {
    return l = rt(6, l, null, t), l.lanes = e, l;
  }
  function Ns(l) {
    var t = rt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function Hc(l, t, e) {
    return t = rt(4, l.children !== null ? l.children : [], l.key, t), t.lanes = e, t.stateNode = { containerInfo: l.containerInfo, pendingChildren: null, implementation: l.implementation }, t;
  }
  var Ms = /* @__PURE__ */ new WeakMap();
  function _t(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = Ms.get(l);
      return e !== void 0 ? e : (t = { value: l, source: t, stack: Nf(t) }, Ms.set(l, t), t);
    }
    return { value: l, source: t, stack: Nf(t) };
  }
  var ia = [], fa = 0, tn = null, Wa = 0, xt = [], zt = 0, ae = null, jt = 1, Ut = "";
  function Xt(l, t) {
    ia[fa++] = Wa, ia[fa++] = tn, tn = l, Wa = t;
  }
  function Os(l, t, e) {
    xt[zt++] = jt, xt[zt++] = Ut, xt[zt++] = ae, ae = l;
    var a = jt;
    l = Ut;
    var u = 32 - st(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - st(t) + u;
    if (30 < n) {
      var c = u - u % 5;
      n = (a & (1 << c) - 1).toString(32), a >>= c, u -= c, jt = 1 << 32 - st(t) + u | e << u | a, Ut = n + l;
    } else jt = 1 << n | e << u | a, Ut = l;
  }
  function Bc(l) {
    l.return !== null && (Xt(l, 1), Os(l, 1, 0));
  }
  function qc(l) {
    for (; l === tn; ) tn = ia[--fa], ia[fa] = null, Wa = ia[--fa], ia[fa] = null;
    for (; l === ae; ) ae = xt[--zt], xt[zt] = null, Ut = xt[--zt], xt[zt] = null, jt = xt[--zt], xt[zt] = null;
  }
  function Ds(l, t) {
    xt[zt++] = jt, xt[zt++] = Ut, xt[zt++] = ae, jt = t.id, Ut = t.overflow, ae = l;
  }
  var Ll = null, Sl = null, ll = false, ue = null, Tt = false, Yc = Error(s(519));
  function ne(l) {
    var t = Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
    throw ka(_t(t, l)), Yc;
  }
  function js(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[Zl] = l, t[Il] = a, e) {
      case "dialog":
        $("cancel", t), $("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        $("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < gu.length; e++) $(gu[e], t);
        break;
      case "source":
        $("error", t);
        break;
      case "img":
      case "image":
      case "link":
        $("error", t), $("load", t);
        break;
      case "details":
        $("toggle", t);
        break;
      case "input":
        $("invalid", t), Lf(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, true);
        break;
      case "select":
        $("invalid", t);
        break;
      case "textarea":
        $("invalid", t), Kf(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === true || kr(t.textContent, e) ? (a.popover != null && ($("beforetoggle", t), $("toggle", t)), a.onScroll != null && $("scroll", t), a.onScrollEnd != null && $("scrollend", t), a.onClick != null && (t.onclick = qt), t = true) : t = false, t || ne(l, true);
  }
  function Us(l) {
    for (Ll = l.return; Ll; ) switch (Ll.tag) {
      case 5:
      case 31:
      case 13:
        Tt = false;
        return;
      case 27:
      case 3:
        Tt = true;
        return;
      default:
        Ll = Ll.return;
    }
  }
  function sa(l) {
    if (l !== Ll) return false;
    if (!ll) return Us(l), ll = true, false;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || ef(l.type, l.memoizedProps)), e = !e), e && Sl && ne(l), Us(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      Sl = u0(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      Sl = u0(l);
    } else t === 27 ? (t = Sl, Se(l.type) ? (l = ff, ff = null, Sl = l) : Sl = t) : Sl = Ll ? At(l.stateNode.nextSibling) : null;
    return true;
  }
  function Ce() {
    Sl = Ll = null, ll = false;
  }
  function Gc() {
    var l = ue;
    return l !== null && (at === null ? at = l : at.push.apply(at, l), ue = null), l;
  }
  function ka(l) {
    ue === null ? ue = [l] : ue.push(l);
  }
  var Xc = d(null), Re = null, Qt = null;
  function ce(l, t, e) {
    M(Xc, t._currentValue), t._currentValue = e;
  }
  function wt(l) {
    l._currentValue = Xc.current, A(Xc);
  }
  function Qc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function wc(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var c = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var i = n;
          n = u;
          for (var o = 0; o < t.length; o++) if (i.context === t[o]) {
            n.lanes |= e, i = n.alternate, i !== null && (i.lanes |= e), Qc(n.return, e, l), a || (c = null);
            break l;
          }
          n = i.next;
        }
      } else if (u.tag === 18) {
        if (c = u.return, c === null) throw Error(s(341));
        c.lanes |= e, n = c.alternate, n !== null && (n.lanes |= e), Qc(c, e, l), c = null;
      } else c = u.child;
      if (c !== null) c.return = u;
      else for (c = u; c !== null; ) {
        if (c === l) {
          c = null;
          break;
        }
        if (u = c.sibling, u !== null) {
          u.return = c.return, c = u;
          break;
        }
        c = c.return;
      }
      u = c;
    }
  }
  function oa(l, t, e, a) {
    l = null;
    for (var u = t, n = false; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = true;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var c = u.alternate;
        if (c === null) throw Error(s(387));
        if (c = c.memoizedProps, c !== null) {
          var i = u.type;
          ot(u.pendingProps.value, c.value) || (l !== null ? l.push(i) : l = [i]);
        }
      } else if (u === W.current) {
        if (c = u.alternate, c === null) throw Error(s(387));
        c.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(xu) : l = [xu]);
      }
      u = u.return;
    }
    l !== null && wc(t, l, e, a), t.flags |= 262144;
  }
  function en(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!ot(l.context._currentValue, l.memoizedValue)) return true;
      l = l.next;
    }
    return false;
  }
  function He(l) {
    Re = l, Qt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Vl(l) {
    return Cs(Re, l);
  }
  function an(l, t) {
    return Re === null && He(l), Cs(l, t);
  }
  function Cs(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, Qt === null) {
      if (l === null) throw Error(s(308));
      Qt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Qt = Qt.next = t;
    return e;
  }
  var Id = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = { aborted: false, addEventListener: function(e, a) {
      l.push(a);
    } };
    this.abort = function() {
      t.aborted = true, l.forEach(function(e) {
        return e();
      });
    };
  }, Pd = f.unstable_scheduleCallback, lm = f.unstable_NormalPriority, Cl = { $$typeof: _l, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function Zc() {
    return { controller: new Id(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function $a(l) {
    l.refCount--, l.refCount === 0 && Pd(lm, function() {
      l.controller.abort();
    });
  }
  var Fa = null, Lc = 0, ra = 0, da = null;
  function tm(l, t) {
    if (Fa === null) {
      var e = Fa = [];
      Lc = 0, ra = Ji(), da = { status: "pending", value: void 0, then: function(a) {
        e.push(a);
      } };
    }
    return Lc++, t.then(Rs, Rs), t;
  }
  function Rs() {
    if (--Lc === 0 && Fa !== null) {
      da !== null && (da.status = "fulfilled");
      var l = Fa;
      Fa = null, ra = 0, da = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function em(l, t) {
    var e = [], a = { status: "pending", value: null, reason: null, then: function(u) {
      e.push(u);
    } };
    return l.then(function() {
      a.status = "fulfilled", a.value = t;
      for (var u = 0; u < e.length; u++) (0, e[u])(t);
    }, function(u) {
      for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++) (0, e[u])(void 0);
    }), a;
  }
  var Hs = z.S;
  z.S = function(l, t) {
    Sr = it(), typeof t == "object" && t !== null && typeof t.then == "function" && tm(l, t), Hs !== null && Hs(l, t);
  };
  var Be = d(null);
  function Vc() {
    var l = Be.current;
    return l !== null ? l : vl.pooledCache;
  }
  function un(l, t) {
    t === null ? M(Be, Be.current) : M(Be, t.pool);
  }
  function Bs() {
    var l = Vc();
    return l === null ? null : { parent: Cl._currentValue, pool: l };
  }
  var ma = Error(s(460)), Kc = Error(s(474)), nn = Error(s(542)), cn = { then: function() {
  } };
  function qs(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Ys(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(qt, qt), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Xs(l), l;
      default:
        if (typeof t.status == "string") t.then(qt, qt);
        else {
          if (l = vl, l !== null && 100 < l.shellSuspendCounter) throw Error(s(482));
          l = t, l.status = "pending", l.then(function(a) {
            if (t.status === "pending") {
              var u = t;
              u.status = "fulfilled", u.value = a;
            }
          }, function(a) {
            if (t.status === "pending") {
              var u = t;
              u.status = "rejected", u.reason = a;
            }
          });
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Xs(l), l;
        }
        throw Ye = t, ma;
    }
  }
  function qe(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Ye = e, ma) : e;
    }
  }
  var Ye = null;
  function Gs() {
    if (Ye === null) throw Error(s(459));
    var l = Ye;
    return Ye = null, l;
  }
  function Xs(l) {
    if (l === ma || l === nn) throw Error(s(483));
  }
  var ha = null, Ia = 0;
  function fn(l) {
    var t = Ia;
    return Ia += 1, ha === null && (ha = []), Ys(ha, l, t);
  }
  function Pa(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function sn(l, t) {
    throw t.$$typeof === tl ? Error(s(525)) : (l = Object.prototype.toString.call(t), Error(s(31, l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l)));
  }
  function Qs(l) {
    function t(m, r) {
      if (l) {
        var y = m.deletions;
        y === null ? (m.deletions = [r], m.flags |= 16) : y.push(r);
      }
    }
    function e(m, r) {
      if (!l) return null;
      for (; r !== null; ) t(m, r), r = r.sibling;
      return null;
    }
    function a(m) {
      for (var r = /* @__PURE__ */ new Map(); m !== null; ) m.key !== null ? r.set(m.key, m) : r.set(m.index, m), m = m.sibling;
      return r;
    }
    function u(m, r) {
      return m = Gt(m, r), m.index = 0, m.sibling = null, m;
    }
    function n(m, r, y) {
      return m.index = y, l ? (y = m.alternate, y !== null ? (y = y.index, y < r ? (m.flags |= 67108866, r) : y) : (m.flags |= 67108866, r)) : (m.flags |= 1048576, r);
    }
    function c(m) {
      return l && m.alternate === null && (m.flags |= 67108866), m;
    }
    function i(m, r, y, T) {
      return r === null || r.tag !== 6 ? (r = Rc(y, m.mode, T), r.return = m, r) : (r = u(r, y), r.return = m, r);
    }
    function o(m, r, y, T) {
      var Y = y.type;
      return Y === nl ? x(m, r, y.props.children, T, y.key) : r !== null && (r.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === Ol && qe(Y) === r.type) ? (r = u(r, y.props), Pa(r, y), r.return = m, r) : (r = ln(y.type, y.key, y.props, null, m.mode, T), Pa(r, y), r.return = m, r);
    }
    function v(m, r, y, T) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== y.containerInfo || r.stateNode.implementation !== y.implementation ? (r = Hc(y, m.mode, T), r.return = m, r) : (r = u(r, y.children || []), r.return = m, r);
    }
    function x(m, r, y, T, Y) {
      return r === null || r.tag !== 7 ? (r = Ue(y, m.mode, T, Y), r.return = m, r) : (r = u(r, y), r.return = m, r);
    }
    function E(m, r, y) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return r = Rc("" + r, m.mode, y), r.return = m, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case yl:
            return y = ln(r.type, r.key, r.props, null, m.mode, y), Pa(y, r), y.return = m, y;
          case gl:
            return r = Hc(r, m.mode, y), r.return = m, r;
          case Ol:
            return r = qe(r), E(m, r, y);
        }
        if (ct(r) || cl(r)) return r = Ue(r, m.mode, y, null), r.return = m, r;
        if (typeof r.then == "function") return E(m, fn(r), y);
        if (r.$$typeof === _l) return E(m, an(m, r), y);
        sn(m, r);
      }
      return null;
    }
    function b(m, r, y, T) {
      var Y = r !== null ? r.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint") return Y !== null ? null : i(m, r, "" + y, T);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case yl:
            return y.key === Y ? o(m, r, y, T) : null;
          case gl:
            return y.key === Y ? v(m, r, y, T) : null;
          case Ol:
            return y = qe(y), b(m, r, y, T);
        }
        if (ct(y) || cl(y)) return Y !== null ? null : x(m, r, y, T, null);
        if (typeof y.then == "function") return b(m, r, fn(y), T);
        if (y.$$typeof === _l) return b(m, r, an(m, y), T);
        sn(m, y);
      }
      return null;
    }
    function _(m, r, y, T, Y) {
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint") return m = m.get(y) || null, i(r, m, "" + T, Y);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case yl:
            return m = m.get(T.key === null ? y : T.key) || null, o(r, m, T, Y);
          case gl:
            return m = m.get(T.key === null ? y : T.key) || null, v(r, m, T, Y);
          case Ol:
            return T = qe(T), _(m, r, y, T, Y);
        }
        if (ct(T) || cl(T)) return m = m.get(y) || null, x(r, m, T, Y, null);
        if (typeof T.then == "function") return _(m, r, y, fn(T), Y);
        if (T.$$typeof === _l) return _(m, r, y, an(r, T), Y);
        sn(r, T);
      }
      return null;
    }
    function R(m, r, y, T) {
      for (var Y = null, al = null, H = r, J = r = 0, P = null; H !== null && J < y.length; J++) {
        H.index > J ? (P = H, H = null) : P = H.sibling;
        var ul = b(m, H, y[J], T);
        if (ul === null) {
          H === null && (H = P);
          break;
        }
        l && H && ul.alternate === null && t(m, H), r = n(ul, r, J), al === null ? Y = ul : al.sibling = ul, al = ul, H = P;
      }
      if (J === y.length) return e(m, H), ll && Xt(m, J), Y;
      if (H === null) {
        for (; J < y.length; J++) H = E(m, y[J], T), H !== null && (r = n(H, r, J), al === null ? Y = H : al.sibling = H, al = H);
        return ll && Xt(m, J), Y;
      }
      for (H = a(H); J < y.length; J++) P = _(H, m, J, y[J], T), P !== null && (l && P.alternate !== null && H.delete(P.key === null ? J : P.key), r = n(P, r, J), al === null ? Y = P : al.sibling = P, al = P);
      return l && H.forEach(function(Te) {
        return t(m, Te);
      }), ll && Xt(m, J), Y;
    }
    function Q(m, r, y, T) {
      if (y == null) throw Error(s(151));
      for (var Y = null, al = null, H = r, J = r = 0, P = null, ul = y.next(); H !== null && !ul.done; J++, ul = y.next()) {
        H.index > J ? (P = H, H = null) : P = H.sibling;
        var Te = b(m, H, ul.value, T);
        if (Te === null) {
          H === null && (H = P);
          break;
        }
        l && H && Te.alternate === null && t(m, H), r = n(Te, r, J), al === null ? Y = Te : al.sibling = Te, al = Te, H = P;
      }
      if (ul.done) return e(m, H), ll && Xt(m, J), Y;
      if (H === null) {
        for (; !ul.done; J++, ul = y.next()) ul = E(m, ul.value, T), ul !== null && (r = n(ul, r, J), al === null ? Y = ul : al.sibling = ul, al = ul);
        return ll && Xt(m, J), Y;
      }
      for (H = a(H); !ul.done; J++, ul = y.next()) ul = _(H, m, J, ul.value, T), ul !== null && (l && ul.alternate !== null && H.delete(ul.key === null ? J : ul.key), r = n(ul, r, J), al === null ? Y = ul : al.sibling = ul, al = ul);
      return l && H.forEach(function(mh) {
        return t(m, mh);
      }), ll && Xt(m, J), Y;
    }
    function hl(m, r, y, T) {
      if (typeof y == "object" && y !== null && y.type === nl && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case yl:
            l: {
              for (var Y = y.key; r !== null; ) {
                if (r.key === Y) {
                  if (Y = y.type, Y === nl) {
                    if (r.tag === 7) {
                      e(m, r.sibling), T = u(r, y.props.children), T.return = m, m = T;
                      break l;
                    }
                  } else if (r.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === Ol && qe(Y) === r.type) {
                    e(m, r.sibling), T = u(r, y.props), Pa(T, y), T.return = m, m = T;
                    break l;
                  }
                  e(m, r);
                  break;
                } else t(m, r);
                r = r.sibling;
              }
              y.type === nl ? (T = Ue(y.props.children, m.mode, T, y.key), T.return = m, m = T) : (T = ln(y.type, y.key, y.props, null, m.mode, T), Pa(T, y), T.return = m, m = T);
            }
            return c(m);
          case gl:
            l: {
              for (Y = y.key; r !== null; ) {
                if (r.key === Y) if (r.tag === 4 && r.stateNode.containerInfo === y.containerInfo && r.stateNode.implementation === y.implementation) {
                  e(m, r.sibling), T = u(r, y.children || []), T.return = m, m = T;
                  break l;
                } else {
                  e(m, r);
                  break;
                }
                else t(m, r);
                r = r.sibling;
              }
              T = Hc(y, m.mode, T), T.return = m, m = T;
            }
            return c(m);
          case Ol:
            return y = qe(y), hl(m, r, y, T);
        }
        if (ct(y)) return R(m, r, y, T);
        if (cl(y)) {
          if (Y = cl(y), typeof Y != "function") throw Error(s(150));
          return y = Y.call(y), Q(m, r, y, T);
        }
        if (typeof y.then == "function") return hl(m, r, fn(y), T);
        if (y.$$typeof === _l) return hl(m, r, an(m, y), T);
        sn(m, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, r !== null && r.tag === 6 ? (e(m, r.sibling), T = u(r, y), T.return = m, m = T) : (e(m, r), T = Rc(y, m.mode, T), T.return = m, m = T), c(m)) : e(m, r);
    }
    return function(m, r, y, T) {
      try {
        Ia = 0;
        var Y = hl(m, r, y, T);
        return ha = null, Y;
      } catch (H) {
        if (H === ma || H === nn) throw H;
        var al = rt(29, H, null, m.mode);
        return al.lanes = T, al.return = m, al;
      } finally {
      }
    };
  }
  var Ge = Qs(true), ws = Qs(false), ie = false;
  function Jc(l) {
    l.updateQueue = { baseState: l.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
  }
  function Wc(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = { baseState: l.baseState, firstBaseUpdate: l.firstBaseUpdate, lastBaseUpdate: l.lastBaseUpdate, shared: l.shared, callbacks: null });
  }
  function fe(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function se(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (il & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = Pu(l), Es(l, null, e), t;
    }
    return Iu(l, a, t, e), Pu(l);
  }
  function lu(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Cf(l, e);
    }
  }
  function kc(l, t) {
    var e = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var u = null, n = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var c = { lane: e.lane, tag: e.tag, payload: e.payload, callback: null, next: null };
          n === null ? u = n = c : n = n.next = c, e = e.next;
        } while (e !== null);
        n === null ? u = n = t : n = n.next = t;
      } else u = n = t;
      e = { baseState: a.baseState, firstBaseUpdate: u, lastBaseUpdate: n, shared: a.shared, callbacks: a.callbacks }, l.updateQueue = e;
      return;
    }
    l = e.lastBaseUpdate, l === null ? e.firstBaseUpdate = t : l.next = t, e.lastBaseUpdate = t;
  }
  var $c = false;
  function tu() {
    if ($c) {
      var l = da;
      if (l !== null) throw l;
    }
  }
  function eu(l, t, e, a) {
    $c = false;
    var u = l.updateQueue;
    ie = false;
    var n = u.firstBaseUpdate, c = u.lastBaseUpdate, i = u.shared.pending;
    if (i !== null) {
      u.shared.pending = null;
      var o = i, v = o.next;
      o.next = null, c === null ? n = v : c.next = v, c = o;
      var x = l.alternate;
      x !== null && (x = x.updateQueue, i = x.lastBaseUpdate, i !== c && (i === null ? x.firstBaseUpdate = v : i.next = v, x.lastBaseUpdate = o));
    }
    if (n !== null) {
      var E = u.baseState;
      c = 0, x = v = o = null, i = n;
      do {
        var b = i.lane & -536870913, _ = b !== i.lane;
        if (_ ? (I & b) === b : (a & b) === b) {
          b !== 0 && b === ra && ($c = true), x !== null && (x = x.next = { lane: 0, tag: i.tag, payload: i.payload, callback: null, next: null });
          l: {
            var R = l, Q = i;
            b = t;
            var hl = e;
            switch (Q.tag) {
              case 1:
                if (R = Q.payload, typeof R == "function") {
                  E = R.call(hl, E, b);
                  break l;
                }
                E = R;
                break l;
              case 3:
                R.flags = R.flags & -65537 | 128;
              case 0:
                if (R = Q.payload, b = typeof R == "function" ? R.call(hl, E, b) : R, b == null) break l;
                E = q({}, E, b);
                break l;
              case 2:
                ie = true;
            }
          }
          b = i.callback, b !== null && (l.flags |= 64, _ && (l.flags |= 8192), _ = u.callbacks, _ === null ? u.callbacks = [b] : _.push(b));
        } else _ = { lane: b, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, x === null ? (v = x = _, o = E) : x = x.next = _, c |= b;
        if (i = i.next, i === null) {
          if (i = u.shared.pending, i === null) break;
          _ = i, i = _.next, _.next = null, u.lastBaseUpdate = _, u.shared.pending = null;
        }
      } while (true);
      x === null && (o = E), u.baseState = o, u.firstBaseUpdate = v, u.lastBaseUpdate = x, n === null && (u.shared.lanes = 0), he |= c, l.lanes = c, l.memoizedState = E;
    }
  }
  function Zs(l, t) {
    if (typeof l != "function") throw Error(s(191, l));
    l.call(t);
  }
  function Ls(l, t) {
    var e = l.callbacks;
    if (e !== null) for (l.callbacks = null, l = 0; l < e.length; l++) Zs(e[l], t);
  }
  var ya = d(null), on = d(0);
  function Vs(l, t) {
    l = Ft, M(on, l), M(ya, t), Ft = l | t.baseLanes;
  }
  function Fc() {
    M(on, Ft), M(ya, ya.current);
  }
  function Ic() {
    Ft = on.current, A(ya), A(on);
  }
  var dt = d(null), Et = null;
  function oe(l) {
    var t = l.alternate;
    M(jl, jl.current & 1), M(dt, l), Et === null && (t === null || ya.current !== null || t.memoizedState !== null) && (Et = l);
  }
  function Pc(l) {
    M(jl, jl.current), M(dt, l), Et === null && (Et = l);
  }
  function Ks(l) {
    l.tag === 22 ? (M(jl, jl.current), M(dt, l), Et === null && (Et = l)) : re();
  }
  function re() {
    M(jl, jl.current), M(dt, dt.current);
  }
  function mt(l) {
    A(dt), Et === l && (Et = null), A(jl);
  }
  var jl = d(0);
  function rn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || nf(e) || cf(e))) return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Zt = 0, K = null, dl = null, Rl = null, dn = false, va = false, Xe = false, mn = 0, au = 0, ga = null, am = 0;
  function Nl() {
    throw Error(s(321));
  }
  function li(l, t) {
    if (t === null) return false;
    for (var e = 0; e < t.length && e < l.length; e++) if (!ot(l[e], t[e])) return false;
    return true;
  }
  function ti(l, t, e, a, u, n) {
    return Zt = n, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, z.H = l === null || l.memoizedState === null ? Do : vi, Xe = false, n = e(a, u), Xe = false, va && (n = Ws(t, e, a, u)), Js(l), n;
  }
  function Js(l) {
    z.H = cu;
    var t = dl !== null && dl.next !== null;
    if (Zt = 0, Rl = dl = K = null, dn = false, au = 0, ga = null, t) throw Error(s(300));
    l === null || Hl || (l = l.dependencies, l !== null && en(l) && (Hl = true));
  }
  function Ws(l, t, e, a) {
    K = l;
    var u = 0;
    do {
      if (va && (ga = null), au = 0, va = false, 25 <= u) throw Error(s(301));
      if (u += 1, Rl = dl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      z.H = jo, n = t(e, a);
    } while (va);
    return n;
  }
  function um() {
    var l = z.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? uu(t) : t, l = l.useState()[0], (dl !== null ? dl.memoizedState : null) !== l && (K.flags |= 1024), t;
  }
  function ei() {
    var l = mn !== 0;
    return mn = 0, l;
  }
  function ai(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function ui(l) {
    if (dn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      dn = false;
    }
    Zt = 0, Rl = dl = K = null, va = false, au = mn = 0, ga = null;
  }
  function $l() {
    var l = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Rl === null ? K.memoizedState = Rl = l : Rl = Rl.next = l, Rl;
  }
  function Ul() {
    if (dl === null) {
      var l = K.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = dl.next;
    var t = Rl === null ? K.memoizedState : Rl.next;
    if (t !== null) Rl = t, dl = l;
    else {
      if (l === null) throw K.alternate === null ? Error(s(467)) : Error(s(310));
      dl = l, l = { memoizedState: dl.memoizedState, baseState: dl.baseState, baseQueue: dl.baseQueue, queue: dl.queue, next: null }, Rl === null ? K.memoizedState = Rl = l : Rl = Rl.next = l;
    }
    return Rl;
  }
  function hn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function uu(l) {
    var t = au;
    return au += 1, ga === null && (ga = []), l = Ys(ga, l, t), t = K, (Rl === null ? t.memoizedState : Rl.next) === null && (t = t.alternate, z.H = t === null || t.memoizedState === null ? Do : vi), l;
  }
  function yn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return uu(l);
      if (l.$$typeof === _l) return Vl(l);
    }
    throw Error(s(438, String(l)));
  }
  function ni(l) {
    var t = null, e = K.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = K.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = { data: a.data.map(function(u) {
        return u.slice();
      }), index: 0 })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = hn(), K.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0) for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = Gl;
    return t.index++, e;
  }
  function Lt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function vn(l) {
    var t = Ul();
    return ci(t, dl, l);
  }
  function ci(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var u = l.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var c = u.next;
        u.next = n.next, n.next = c;
      }
      t.baseQueue = u = n, a.pending = null;
    }
    if (n = l.baseState, u === null) l.memoizedState = n;
    else {
      t = u.next;
      var i = c = null, o = null, v = t, x = false;
      do {
        var E = v.lane & -536870913;
        if (E !== v.lane ? (I & E) === E : (Zt & E) === E) {
          var b = v.revertLane;
          if (b === 0) o !== null && (o = o.next = { lane: 0, revertLane: 0, gesture: null, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }), E === ra && (x = true);
          else if ((Zt & b) === b) {
            v = v.next, b === ra && (x = true);
            continue;
          } else E = { lane: 0, revertLane: v.revertLane, gesture: null, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }, o === null ? (i = o = E, c = n) : o = o.next = E, K.lanes |= b, he |= b;
          E = v.action, Xe && e(n, E), n = v.hasEagerState ? v.eagerState : e(n, E);
        } else b = { lane: E, revertLane: v.revertLane, gesture: v.gesture, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }, o === null ? (i = o = b, c = n) : o = o.next = b, K.lanes |= E, he |= E;
        v = v.next;
      } while (v !== null && v !== t);
      if (o === null ? c = n : o.next = i, !ot(n, l.memoizedState) && (Hl = true, x && (e = da, e !== null))) throw e;
      l.memoizedState = n, l.baseState = c, l.baseQueue = o, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function ii(l) {
    var t = Ul(), e = t.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, u = e.pending, n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var c = u = u.next;
      do
        n = l(n, c.action), c = c.next;
      while (c !== u);
      ot(n, t.memoizedState) || (Hl = true), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function ks(l, t, e) {
    var a = K, u = Ul(), n = ll;
    if (n) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = t();
    var c = !ot((dl || u).memoizedState, e);
    if (c && (u.memoizedState = e, Hl = true), u = u.queue, oi(Is.bind(null, a, u, l), [l]), u.getSnapshot !== t || c || Rl !== null && Rl.memoizedState.tag & 1) {
      if (a.flags |= 2048, ba(9, { destroy: void 0 }, Fs.bind(null, a, u, e, t), null), vl === null) throw Error(s(349));
      n || (Zt & 127) !== 0 || $s(a, t, e);
    }
    return e;
  }
  function $s(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = K.updateQueue, t === null ? (t = hn(), K.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function Fs(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Ps(t) && lo(l);
  }
  function Is(l, t, e) {
    return e(function() {
      Ps(t) && lo(l);
    });
  }
  function Ps(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !ot(l, e);
    } catch {
      return true;
    }
  }
  function lo(l) {
    var t = je(l, 2);
    t !== null && ut(t, l, 2);
  }
  function fi(l) {
    var t = $l();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), Xe) {
        le(true);
        try {
          e();
        } finally {
          le(false);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Lt, lastRenderedState: l }, t;
  }
  function to(l, t, e, a) {
    return l.baseState = e, ci(l, dl, typeof a == "function" ? a : Lt);
  }
  function nm(l, t, e, a, u) {
    if (Sn(l)) throw Error(s(485));
    if (l = t.action, l !== null) {
      var n = { payload: u, action: l, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(c) {
        n.listeners.push(c);
      } };
      z.T !== null ? e(true) : n.isTransition = false, a(n), e = t.pending, e === null ? (n.next = t.pending = n, eo(t, n)) : (n.next = e.next, t.pending = e.next = n);
    }
  }
  function eo(l, t) {
    var e = t.action, a = t.payload, u = l.state;
    if (t.isTransition) {
      var n = z.T, c = {};
      z.T = c;
      try {
        var i = e(u, a), o = z.S;
        o !== null && o(c, i), ao(l, t, i);
      } catch (v) {
        si(l, t, v);
      } finally {
        n !== null && c.types !== null && (n.types = c.types), z.T = n;
      }
    } else try {
      n = e(u, a), ao(l, t, n);
    } catch (v) {
      si(l, t, v);
    }
  }
  function ao(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(function(a) {
      uo(l, t, a);
    }, function(a) {
      return si(l, t, a);
    }) : uo(l, t, e);
  }
  function uo(l, t, e) {
    t.status = "fulfilled", t.value = e, no(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, eo(l, e)));
  }
  function si(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, no(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function no(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function co(l, t) {
    return t;
  }
  function io(l, t) {
    if (ll) {
      var e = vl.formState;
      if (e !== null) {
        l: {
          var a = K;
          if (ll) {
            if (Sl) {
              t: {
                for (var u = Sl, n = Tt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = At(u.nextSibling), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                Sl = At(u.nextSibling), a = u.data === "F!";
                break l;
              }
            }
            ne(a);
          }
          a = false;
        }
        a && (t = e[0]);
      }
    }
    return e = $l(), e.memoizedState = e.baseState = t, a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: co, lastRenderedState: t }, e.queue = a, e = No.bind(null, K, a), a.dispatch = e, a = fi(false), n = yi.bind(null, K, false, a.queue), a = $l(), u = { state: t, dispatch: null, action: l, pending: null }, a.queue = u, e = nm.bind(null, K, u, n, e), u.dispatch = e, a.memoizedState = l, [t, e, false];
  }
  function fo(l) {
    var t = Ul();
    return so(t, dl, l);
  }
  function so(l, t, e) {
    if (t = ci(l, t, co)[0], l = vn(Lt)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var a = uu(t);
    } catch (c) {
      throw c === ma ? nn : c;
    }
    else a = t;
    t = Ul();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && (K.flags |= 2048, ba(9, { destroy: void 0 }, cm.bind(null, u, e), null)), [a, n, l];
  }
  function cm(l, t) {
    l.action = t;
  }
  function oo(l) {
    var t = Ul(), e = dl;
    if (e !== null) return so(t, e, l);
    Ul(), t = t.memoizedState, e = Ul();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, false];
  }
  function ba(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = K.updateQueue, t === null && (t = hn(), K.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function ro() {
    return Ul().memoizedState;
  }
  function gn(l, t, e, a) {
    var u = $l();
    K.flags |= l, u.memoizedState = ba(1 | t, { destroy: void 0 }, e, a === void 0 ? null : a);
  }
  function bn(l, t, e, a) {
    var u = Ul();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    dl !== null && a !== null && li(a, dl.memoizedState.deps) ? u.memoizedState = ba(t, n, e, a) : (K.flags |= l, u.memoizedState = ba(1 | t, n, e, a));
  }
  function mo(l, t) {
    gn(8390656, 8, l, t);
  }
  function oi(l, t) {
    bn(2048, 8, l, t);
  }
  function im(l) {
    K.flags |= 4;
    var t = K.updateQueue;
    if (t === null) t = hn(), K.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function ho(l) {
    var t = Ul().memoizedState;
    return im({ ref: t, nextImpl: l }), function() {
      if ((il & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function yo(l, t) {
    return bn(4, 2, l, t);
  }
  function vo(l, t) {
    return bn(4, 4, l, t);
  }
  function go(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function() {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null) return l = l(), t.current = l, function() {
      t.current = null;
    };
  }
  function bo(l, t, e) {
    e = e != null ? e.concat([l]) : null, bn(4, 4, go.bind(null, t, l), e);
  }
  function ri() {
  }
  function So(l, t) {
    var e = Ul();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && li(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function po(l, t) {
    var e = Ul();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && li(t, a[1])) return a[0];
    if (a = l(), Xe) {
      le(true);
      try {
        l();
      } finally {
        le(false);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function di(l, t, e) {
    return e === void 0 || (Zt & 1073741824) !== 0 && (I & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = _r(), K.lanes |= l, he |= l, e);
  }
  function _o(l, t, e, a) {
    return ot(e, t) ? e : ya.current !== null ? (l = di(l, e, a), ot(l, t) || (Hl = true), l) : (Zt & 42) === 0 || (Zt & 1073741824) !== 0 && (I & 261930) === 0 ? (Hl = true, l.memoizedState = e) : (l = _r(), K.lanes |= l, he |= l, t);
  }
  function xo(l, t, e, a, u) {
    var n = U.p;
    U.p = n !== 0 && 8 > n ? n : 8;
    var c = z.T, i = {};
    z.T = i, yi(l, false, t, e);
    try {
      var o = u(), v = z.S;
      if (v !== null && v(i, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var x = em(o, a);
        nu(l, t, x, vt(l));
      } else nu(l, t, a, vt(l));
    } catch (E) {
      nu(l, t, { then: function() {
      }, status: "rejected", reason: E }, vt());
    } finally {
      U.p = n, c !== null && i.types !== null && (c.types = i.types), z.T = c;
    }
  }
  function fm() {
  }
  function mi(l, t, e, a) {
    if (l.tag !== 5) throw Error(s(476));
    var u = zo(l).queue;
    xo(l, u, t, G, e === null ? fm : function() {
      return To(l), e(a);
    });
  }
  function zo(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = { memoizedState: G, baseState: G, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Lt, lastRenderedState: G }, next: null };
    var e = {};
    return t.next = { memoizedState: e, baseState: e, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Lt, lastRenderedState: e }, next: null }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function To(l) {
    var t = zo(l);
    t.next === null && (t = l.alternate.memoizedState), nu(l, t.next.queue, {}, vt());
  }
  function hi() {
    return Vl(xu);
  }
  function Eo() {
    return Ul().memoizedState;
  }
  function Ao() {
    return Ul().memoizedState;
  }
  function sm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = vt();
          l = fe(e);
          var a = se(t, l, e);
          a !== null && (ut(a, t, e), lu(a, t, e)), t = { cache: Zc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function om(l, t, e) {
    var a = vt();
    e = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null }, Sn(l) ? Mo(t, e) : (e = Uc(l, t, e, a), e !== null && (ut(e, l, a), Oo(e, t, a)));
  }
  function No(l, t, e) {
    var a = vt();
    nu(l, t, e, a);
  }
  function nu(l, t, e, a) {
    var u = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null };
    if (Sn(l)) Mo(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null)) try {
        var c = t.lastRenderedState, i = n(c, e);
        if (u.hasEagerState = true, u.eagerState = i, ot(i, c)) return Iu(l, t, u, 0), vl === null && Fu(), false;
      } catch {
      } finally {
      }
      if (e = Uc(l, t, u, a), e !== null) return ut(e, l, a), Oo(e, t, a), true;
    }
    return false;
  }
  function yi(l, t, e, a) {
    if (a = { lane: 2, revertLane: Ji(), gesture: null, action: a, hasEagerState: false, eagerState: null, next: null }, Sn(l)) {
      if (t) throw Error(s(479));
    } else t = Uc(l, e, a, 2), t !== null && ut(t, l, 2);
  }
  function Sn(l) {
    var t = l.alternate;
    return l === K || t !== null && t === K;
  }
  function Mo(l, t) {
    va = dn = true;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function Oo(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Cf(l, e);
    }
  }
  var cu = { readContext: Vl, use: yn, useCallback: Nl, useContext: Nl, useEffect: Nl, useImperativeHandle: Nl, useLayoutEffect: Nl, useInsertionEffect: Nl, useMemo: Nl, useReducer: Nl, useRef: Nl, useState: Nl, useDebugValue: Nl, useDeferredValue: Nl, useTransition: Nl, useSyncExternalStore: Nl, useId: Nl, useHostTransitionStatus: Nl, useFormState: Nl, useActionState: Nl, useOptimistic: Nl, useMemoCache: Nl, useCacheRefresh: Nl };
  cu.useEffectEvent = Nl;
  var Do = { readContext: Vl, use: yn, useCallback: function(l, t) {
    return $l().memoizedState = [l, t === void 0 ? null : t], l;
  }, useContext: Vl, useEffect: mo, useImperativeHandle: function(l, t, e) {
    e = e != null ? e.concat([l]) : null, gn(4194308, 4, go.bind(null, t, l), e);
  }, useLayoutEffect: function(l, t) {
    return gn(4194308, 4, l, t);
  }, useInsertionEffect: function(l, t) {
    gn(4, 2, l, t);
  }, useMemo: function(l, t) {
    var e = $l();
    t = t === void 0 ? null : t;
    var a = l();
    if (Xe) {
      le(true);
      try {
        l();
      } finally {
        le(false);
      }
    }
    return e.memoizedState = [a, t], a;
  }, useReducer: function(l, t, e) {
    var a = $l();
    if (e !== void 0) {
      var u = e(t);
      if (Xe) {
        le(true);
        try {
          e(t);
        } finally {
          le(false);
        }
      }
    } else u = t;
    return a.memoizedState = a.baseState = u, l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: l, lastRenderedState: u }, a.queue = l, l = l.dispatch = om.bind(null, K, l), [a.memoizedState, l];
  }, useRef: function(l) {
    var t = $l();
    return l = { current: l }, t.memoizedState = l;
  }, useState: function(l) {
    l = fi(l);
    var t = l.queue, e = No.bind(null, K, t);
    return t.dispatch = e, [l.memoizedState, e];
  }, useDebugValue: ri, useDeferredValue: function(l, t) {
    var e = $l();
    return di(e, l, t);
  }, useTransition: function() {
    var l = fi(false);
    return l = xo.bind(null, K, l.queue, true, false), $l().memoizedState = l, [false, l];
  }, useSyncExternalStore: function(l, t, e) {
    var a = K, u = $l();
    if (ll) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else {
      if (e = t(), vl === null) throw Error(s(349));
      (I & 127) !== 0 || $s(a, t, e);
    }
    u.memoizedState = e;
    var n = { value: e, getSnapshot: t };
    return u.queue = n, mo(Is.bind(null, a, n, l), [l]), a.flags |= 2048, ba(9, { destroy: void 0 }, Fs.bind(null, a, n, e, t), null), e;
  }, useId: function() {
    var l = $l(), t = vl.identifierPrefix;
    if (ll) {
      var e = Ut, a = jt;
      e = (a & ~(1 << 32 - st(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = mn++, 0 < e && (t += "H" + e.toString(32)), t += "_";
    } else e = am++, t = "_" + t + "r_" + e.toString(32) + "_";
    return l.memoizedState = t;
  }, useHostTransitionStatus: hi, useFormState: io, useActionState: io, useOptimistic: function(l) {
    var t = $l();
    t.memoizedState = t.baseState = l;
    var e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return t.queue = e, t = yi.bind(null, K, true, e), e.dispatch = t, [l, t];
  }, useMemoCache: ni, useCacheRefresh: function() {
    return $l().memoizedState = sm.bind(null, K);
  }, useEffectEvent: function(l) {
    var t = $l(), e = { impl: l };
    return t.memoizedState = e, function() {
      if ((il & 2) !== 0) throw Error(s(440));
      return e.impl.apply(void 0, arguments);
    };
  } }, vi = { readContext: Vl, use: yn, useCallback: So, useContext: Vl, useEffect: oi, useImperativeHandle: bo, useInsertionEffect: yo, useLayoutEffect: vo, useMemo: po, useReducer: vn, useRef: ro, useState: function() {
    return vn(Lt);
  }, useDebugValue: ri, useDeferredValue: function(l, t) {
    var e = Ul();
    return _o(e, dl.memoizedState, l, t);
  }, useTransition: function() {
    var l = vn(Lt)[0], t = Ul().memoizedState;
    return [typeof l == "boolean" ? l : uu(l), t];
  }, useSyncExternalStore: ks, useId: Eo, useHostTransitionStatus: hi, useFormState: fo, useActionState: fo, useOptimistic: function(l, t) {
    var e = Ul();
    return to(e, dl, l, t);
  }, useMemoCache: ni, useCacheRefresh: Ao };
  vi.useEffectEvent = ho;
  var jo = { readContext: Vl, use: yn, useCallback: So, useContext: Vl, useEffect: oi, useImperativeHandle: bo, useInsertionEffect: yo, useLayoutEffect: vo, useMemo: po, useReducer: ii, useRef: ro, useState: function() {
    return ii(Lt);
  }, useDebugValue: ri, useDeferredValue: function(l, t) {
    var e = Ul();
    return dl === null ? di(e, l, t) : _o(e, dl.memoizedState, l, t);
  }, useTransition: function() {
    var l = ii(Lt)[0], t = Ul().memoizedState;
    return [typeof l == "boolean" ? l : uu(l), t];
  }, useSyncExternalStore: ks, useId: Eo, useHostTransitionStatus: hi, useFormState: oo, useActionState: oo, useOptimistic: function(l, t) {
    var e = Ul();
    return dl !== null ? to(e, dl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
  }, useMemoCache: ni, useCacheRefresh: Ao };
  jo.useEffectEvent = ho;
  function gi(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : q({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var bi = { enqueueSetState: function(l, t, e) {
    l = l._reactInternals;
    var a = vt(), u = fe(a);
    u.payload = t, e != null && (u.callback = e), t = se(l, u, a), t !== null && (ut(t, l, a), lu(t, l, a));
  }, enqueueReplaceState: function(l, t, e) {
    l = l._reactInternals;
    var a = vt(), u = fe(a);
    u.tag = 1, u.payload = t, e != null && (u.callback = e), t = se(l, u, a), t !== null && (ut(t, l, a), lu(t, l, a));
  }, enqueueForceUpdate: function(l, t) {
    l = l._reactInternals;
    var e = vt(), a = fe(e);
    a.tag = 2, t != null && (a.callback = t), t = se(l, a, e), t !== null && (ut(t, l, e), lu(t, l, e));
  } };
  function Uo(l, t, e, a, u, n, c) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, c) : t.prototype && t.prototype.isPureReactComponent ? !Ka(e, a) || !Ka(u, n) : true;
  }
  function Co(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && bi.enqueueReplaceState(t, t.state, null);
  }
  function Qe(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t) a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = q({}, e));
      for (var u in l) e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function Ro(l) {
    $u(l);
  }
  function Ho(l) {
    console.error(l);
  }
  function Bo(l) {
    $u(l);
  }
  function pn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function qo(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, { componentStack: e.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Si(l, t, e) {
    return e = fe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      pn(l, t);
    }, e;
  }
  function Yo(l) {
    return l = fe(l), l.tag = 3, l;
  }
  function Go(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        qo(t, e, a);
      };
    }
    var c = e.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (l.callback = function() {
      qo(t, e, a), typeof u != "function" && (ye === null ? ye = /* @__PURE__ */ new Set([this]) : ye.add(this));
      var i = a.stack;
      this.componentDidCatch(a.value, { componentStack: i !== null ? i : "" });
    });
  }
  function rm(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && oa(t, e, u, true), e = dt.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Et === null ? Un() : e.alternate === null && Ml === 0 && (Ml = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === cn ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Li(l, a, u)), false;
          case 22:
            return e.flags |= 65536, a === cn ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([a]) }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Li(l, a, u)), false;
        }
        throw Error(s(435, e.tag));
      }
      return Li(l, a, u), Un(), false;
    }
    if (ll) return t = dt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== Yc && (l = Error(s(422), { cause: a }), ka(_t(l, e)))) : (a !== Yc && (t = Error(s(423), { cause: a }), ka(_t(t, e))), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = _t(a, e), u = Si(l.stateNode, a, u), kc(l, u), Ml !== 4 && (Ml = 2)), false;
    var n = Error(s(520), { cause: a });
    if (n = _t(n, e), hu === null ? hu = [n] : hu.push(n), Ml !== 4 && (Ml = 2), t === null) return true;
    a = _t(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = Si(e.stateNode, a, l), kc(e, l), false;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (ye === null || !ye.has(n)))) return e.flags |= 65536, u &= -u, e.lanes |= u, u = Yo(u), Go(u, l, e, a), kc(e, u), false;
      }
      e = e.return;
    } while (e !== null);
    return false;
  }
  var pi = Error(s(461)), Hl = false;
  function Kl(l, t, e, a) {
    t.child = l === null ? ws(t, null, e, a) : Ge(t, l.child, e, a);
  }
  function Xo(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var i in a) i !== "ref" && (c[i] = a[i]);
    } else c = a;
    return He(t), a = ti(l, t, e, c, n, u), i = ei(), l !== null && !Hl ? (ai(l, t, u), Vt(l, t, u)) : (ll && i && Bc(t), t.flags |= 1, Kl(l, t, a, u), t.child);
  }
  function Qo(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !Cc(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, wo(l, t, n, a, u)) : (l = ln(e.type, null, a, t, t.mode, u), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !Mi(l, u)) {
      var c = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Ka, e(c, a) && l.ref === t.ref) return Vt(l, t, u);
    }
    return t.flags |= 1, l = Gt(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function wo(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Ka(n, a) && l.ref === t.ref) if (Hl = false, t.pendingProps = a = n, Mi(l, u)) (l.flags & 131072) !== 0 && (Hl = true);
      else return t.lanes = l.lanes, Vt(l, t, u);
    }
    return _i(l, t, e, a, u);
  }
  function Zo(l, t, e, a) {
    var u = a.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, l !== null) {
          for (a = t.child = l.child, u = 0; a !== null; ) u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, t.child = null;
        return Lo(l, t, n, e, a);
      }
      if ((e & 536870912) !== 0) t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && un(t, n !== null ? n.cachePool : null), n !== null ? Vs(t, n) : Fc(), Ks(t);
      else return a = t.lanes = 536870912, Lo(l, t, n !== null ? n.baseLanes | e : e, e, a);
    } else n !== null ? (un(t, n.cachePool), Vs(t, n), re(), t.memoizedState = null) : (l !== null && un(t, null), Fc(), re());
    return Kl(l, t, u, e), t.child;
  }
  function iu(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t.sibling;
  }
  function Lo(l, t, e, a, u) {
    var n = Vc();
    return n = n === null ? null : { parent: Cl._currentValue, pool: n }, t.memoizedState = { baseLanes: e, cachePool: n }, l !== null && un(t, null), Fc(), Ks(t), l !== null && oa(l, t, a, true), t.childLanes = u, null;
  }
  function _n(l, t) {
    return t = zn({ mode: t.mode, children: t.children }, l.mode), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Vo(l, t, e) {
    return Ge(t, l.child, null, e), l = _n(t, t.pendingProps), l.flags |= 2, mt(t), t.memoizedState = null, l;
  }
  function dm(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (ll) {
        if (a.mode === "hidden") return l = _n(t, a), t.lanes = 536870912, iu(null, l);
        if (Pc(t), (l = Sl) ? (l = a0(l, Tt), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: ae !== null ? { id: jt, overflow: Ut } : null, retryLane: 536870912, hydrationErrors: null }, e = Ns(l), e.return = t, t.child = e, Ll = t, Sl = null)) : l = null, l === null) throw ne(t);
        return t.lanes = 536870912, null;
      }
      return _n(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var c = n.dehydrated;
      if (Pc(t), u) if (t.flags & 256) t.flags &= -257, t = Vo(l, t, e);
      else if (t.memoizedState !== null) t.child = l.child, t.flags |= 128, t = null;
      else throw Error(s(558));
      else if (Hl || oa(l, t, e, false), u = (e & l.childLanes) !== 0, Hl || u) {
        if (a = vl, a !== null && (c = Rf(a, e), c !== 0 && c !== n.retryLane)) throw n.retryLane = c, je(l, c), ut(a, l, c), pi;
        Un(), t = Vo(l, t, e);
      } else l = n.treeContext, Sl = At(c.nextSibling), Ll = t, ll = true, ue = null, Tt = false, l !== null && Ds(t, l), t = _n(t, a), t.flags |= 4096;
      return t;
    }
    return l = Gt(l.child, { mode: a.mode, children: a.children }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function xn(l, t) {
    var e = t.ref;
    if (e === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object") throw Error(s(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function _i(l, t, e, a, u) {
    return He(t), e = ti(l, t, e, a, void 0, u), a = ei(), l !== null && !Hl ? (ai(l, t, u), Vt(l, t, u)) : (ll && a && Bc(t), t.flags |= 1, Kl(l, t, e, u), t.child);
  }
  function Ko(l, t, e, a, u, n) {
    return He(t), t.updateQueue = null, e = Ws(t, a, e, u), Js(l), a = ei(), l !== null && !Hl ? (ai(l, t, n), Vt(l, t, n)) : (ll && a && Bc(t), t.flags |= 1, Kl(l, t, e, n), t.child);
  }
  function Jo(l, t, e, a, u) {
    if (He(t), t.stateNode === null) {
      var n = ca, c = e.contextType;
      typeof c == "object" && c !== null && (n = Vl(c)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = bi, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Jc(t), c = e.contextType, n.context = typeof c == "object" && c !== null ? Vl(c) : ca, n.state = t.memoizedState, c = e.getDerivedStateFromProps, typeof c == "function" && (gi(t, e, c, a), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (c = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), c !== n.state && bi.enqueueReplaceState(n, n.state, null), eu(t, a, n, u), tu(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = true;
    } else if (l === null) {
      n = t.stateNode;
      var i = t.memoizedProps, o = Qe(e, i);
      n.props = o;
      var v = n.context, x = e.contextType;
      c = ca, typeof x == "object" && x !== null && (c = Vl(x));
      var E = e.getDerivedStateFromProps;
      x = typeof E == "function" || typeof n.getSnapshotBeforeUpdate == "function", i = t.pendingProps !== i, x || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i || v !== c) && Co(t, n, a, c), ie = false;
      var b = t.memoizedState;
      n.state = b, eu(t, a, n, u), tu(), v = t.memoizedState, i || b !== v || ie ? (typeof E == "function" && (gi(t, e, E, a), v = t.memoizedState), (o = ie || Uo(t, e, o, a, b, v, c)) ? (x || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = v), n.props = a, n.state = v, n.context = c, a = o) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = false);
    } else {
      n = t.stateNode, Wc(l, t), c = t.memoizedProps, x = Qe(e, c), n.props = x, E = t.pendingProps, b = n.context, v = e.contextType, o = ca, typeof v == "object" && v !== null && (o = Vl(v)), i = e.getDerivedStateFromProps, (v = typeof i == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c !== E || b !== o) && Co(t, n, a, o), ie = false, b = t.memoizedState, n.state = b, eu(t, a, n, u), tu();
      var _ = t.memoizedState;
      c !== E || b !== _ || ie || l !== null && l.dependencies !== null && en(l.dependencies) ? (typeof i == "function" && (gi(t, e, i, a), _ = t.memoizedState), (x = ie || Uo(t, e, x, a, b, _, o) || l !== null && l.dependencies !== null && en(l.dependencies)) ? (v || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, _, o), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(a, _, o)), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && b === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && b === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = _), n.props = a, n.state = _, n.context = o, a = x) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && b === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && b === l.memoizedState || (t.flags |= 1024), a = false);
    }
    return n = a, xn(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = Ge(t, l.child, null, u), t.child = Ge(t, null, e, u)) : Kl(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = Vt(l, t, u), l;
  }
  function Wo(l, t, e, a) {
    return Ce(), t.flags |= 256, Kl(l, t, e, a), t.child;
  }
  var xi = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function zi(l) {
    return { baseLanes: l, cachePool: Bs() };
  }
  function Ti(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= yt), l;
  }
  function ko(l, t, e) {
    var a = t.pendingProps, u = false, n = (t.flags & 128) !== 0, c;
    if ((c = n) || (c = l !== null && l.memoizedState === null ? false : (jl.current & 2) !== 0), c && (u = true, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (ll) {
        if (u ? oe(t) : re(), (l = Sl) ? (l = a0(l, Tt), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: ae !== null ? { id: jt, overflow: Ut } : null, retryLane: 536870912, hydrationErrors: null }, e = Ns(l), e.return = t, t.child = e, Ll = t, Sl = null)) : l = null, l === null) throw ne(t);
        return cf(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var i = a.children;
      return a = a.fallback, u ? (re(), u = t.mode, i = zn({ mode: "hidden", children: i }, u), a = Ue(a, u, e, null), i.return = t, a.return = t, i.sibling = a, t.child = i, a = t.child, a.memoizedState = zi(e), a.childLanes = Ti(l, c, e), t.memoizedState = xi, iu(null, a)) : (oe(t), Ei(t, i));
    }
    var o = l.memoizedState;
    if (o !== null && (i = o.dehydrated, i !== null)) {
      if (n) t.flags & 256 ? (oe(t), t.flags &= -257, t = Ai(l, t, e)) : t.memoizedState !== null ? (re(), t.child = l.child, t.flags |= 128, t = null) : (re(), i = a.fallback, u = t.mode, a = zn({ mode: "visible", children: a.children }, u), i = Ue(i, u, e, null), i.flags |= 2, a.return = t, i.return = t, a.sibling = i, t.child = a, Ge(t, l.child, null, e), a = t.child, a.memoizedState = zi(e), a.childLanes = Ti(l, c, e), t.memoizedState = xi, t = iu(null, a));
      else if (oe(t), cf(i)) {
        if (c = i.nextSibling && i.nextSibling.dataset, c) var v = c.dgst;
        c = v, a = Error(s(419)), a.stack = "", a.digest = c, ka({ value: a, source: null, stack: null }), t = Ai(l, t, e);
      } else if (Hl || oa(l, t, e, false), c = (e & l.childLanes) !== 0, Hl || c) {
        if (c = vl, c !== null && (a = Rf(c, e), a !== 0 && a !== o.retryLane)) throw o.retryLane = a, je(l, a), ut(c, l, a), pi;
        nf(i) || Un(), t = Ai(l, t, e);
      } else nf(i) ? (t.flags |= 192, t.child = l.child, t = null) : (l = o.treeContext, Sl = At(i.nextSibling), Ll = t, ll = true, ue = null, Tt = false, l !== null && Ds(t, l), t = Ei(t, a.children), t.flags |= 4096);
      return t;
    }
    return u ? (re(), i = a.fallback, u = t.mode, o = l.child, v = o.sibling, a = Gt(o, { mode: "hidden", children: a.children }), a.subtreeFlags = o.subtreeFlags & 65011712, v !== null ? i = Gt(v, i) : (i = Ue(i, u, e, null), i.flags |= 2), i.return = t, a.return = t, a.sibling = i, t.child = a, iu(null, a), a = t.child, i = l.child.memoizedState, i === null ? i = zi(e) : (u = i.cachePool, u !== null ? (o = Cl._currentValue, u = u.parent !== o ? { parent: o, pool: o } : u) : u = Bs(), i = { baseLanes: i.baseLanes | e, cachePool: u }), a.memoizedState = i, a.childLanes = Ti(l, c, e), t.memoizedState = xi, iu(l.child, a)) : (oe(t), e = l.child, l = e.sibling, e = Gt(e, { mode: "visible", children: a.children }), e.return = t, e.sibling = null, l !== null && (c = t.deletions, c === null ? (t.deletions = [l], t.flags |= 16) : c.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function Ei(l, t) {
    return t = zn({ mode: "visible", children: t }, l.mode), t.return = l, l.child = t;
  }
  function zn(l, t) {
    return l = rt(22, l, null, t), l.lanes = 0, l;
  }
  function Ai(l, t, e) {
    return Ge(t, l.child, null, e), l = Ei(t, t.pendingProps.children), l.flags |= 2, t.memoizedState = null, l;
  }
  function $o(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Qc(l.return, t, e);
  }
  function Ni(l, t, e, a, u, n) {
    var c = l.memoizedState;
    c === null ? l.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: a, tail: e, tailMode: u, treeForkCount: n } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = a, c.tail = e, c.tailMode = u, c.treeForkCount = n);
  }
  function Fo(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var c = jl.current, i = (c & 2) !== 0;
    if (i ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, M(jl, c), Kl(l, t, a, e), a = ll ? Wa : 0, !i && l !== null && (l.flags & 128) !== 0) l: for (l = t.child; l !== null; ) {
      if (l.tag === 13) l.memoizedState !== null && $o(l, e, t);
      else if (l.tag === 19) $o(l, e, t);
      else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break l;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) break l;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    switch (u) {
      case "forwards":
        for (e = t.child, u = null; e !== null; ) l = e.alternate, l !== null && rn(l) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), Ni(t, false, u, e, n, a);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = t.child, t.child = null; u !== null; ) {
          if (l = u.alternate, l !== null && rn(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        Ni(t, true, e, null, n, a);
        break;
      case "together":
        Ni(t, false, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Vt(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), he |= t.lanes, (e & t.childLanes) === 0) if (l !== null) {
      if (oa(l, t, e, false), (e & t.childLanes) === 0) return null;
    } else return null;
    if (l !== null && t.child !== l.child) throw Error(s(153));
    if (t.child !== null) {
      for (l = t.child, e = Gt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; ) l = l.sibling, e = e.sibling = Gt(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function Mi(l, t) {
    return (l.lanes & t) !== 0 ? true : (l = l.dependencies, !!(l !== null && en(l)));
  }
  function mm(l, t, e) {
    switch (t.tag) {
      case 3:
        Dl(t, t.stateNode.containerInfo), ce(t, Cl, l.memoizedState.cache), Ce();
        break;
      case 27:
      case 5:
        Ve(t);
        break;
      case 4:
        Dl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ce(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return t.flags |= 128, Pc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null) return a.dehydrated !== null ? (oe(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? ko(l, t, e) : (oe(t), l = Vt(l, t, e), l !== null ? l.sibling : null);
        oe(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (oa(l, t, e, false), a = (e & t.childLanes) !== 0), u) {
          if (a) return Fo(l, t, e);
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), M(jl, jl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Zo(l, t, e, t.pendingProps);
      case 24:
        ce(t, Cl, l.memoizedState.cache);
    }
    return Vt(l, t, e);
  }
  function Io(l, t, e) {
    if (l !== null) if (l.memoizedProps !== t.pendingProps) Hl = true;
    else {
      if (!Mi(l, e) && (t.flags & 128) === 0) return Hl = false, mm(l, t, e);
      Hl = (l.flags & 131072) !== 0;
    }
    else Hl = false, ll && (t.flags & 1048576) !== 0 && Os(t, Wa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = qe(t.elementType), t.type = l, typeof l == "function") Cc(l) ? (a = Qe(l, a), t.tag = 1, t = Jo(null, t, l, a, e)) : (t.tag = 0, t = _i(null, t, l, a, e));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === Wl) {
                t.tag = 11, t = Xo(null, t, l, a, e);
                break l;
              } else if (u === L) {
                t.tag = 14, t = Qo(null, t, l, a, e);
                break l;
              }
            }
            throw t = gt(l) || l, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return _i(l, t, t.type, t.pendingProps, e);
      case 1:
        return a = t.type, u = Qe(a, t.pendingProps), Jo(l, t, a, u, e);
      case 3:
        l: {
          if (Dl(t, t.stateNode.containerInfo), l === null) throw Error(s(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, Wc(l, t), eu(t, a, null, e);
          var c = t.memoizedState;
          if (a = c.cache, ce(t, Cl, a), a !== n.cache && wc(t, [Cl], e, true), tu(), a = c.element, n.isDehydrated) if (n = { element: a, isDehydrated: false, cache: c.cache }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
            t = Wo(l, t, a, e);
            break l;
          } else if (a !== u) {
            u = _t(Error(s(424)), t), ka(u), t = Wo(l, t, a, e);
            break l;
          } else {
            switch (l = t.stateNode.containerInfo, l.nodeType) {
              case 9:
                l = l.body;
                break;
              default:
                l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
            }
            for (Sl = At(l.firstChild), Ll = t, ll = true, ue = null, Tt = true, e = ws(t, null, a, e), t.child = e; e; ) e.flags = e.flags & -3 | 4096, e = e.sibling;
          }
          else {
            if (Ce(), a === u) {
              t = Vt(l, t, e);
              break l;
            }
            Kl(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return xn(l, t), l === null ? (e = s0(t.type, null, t.pendingProps, null)) ? t.memoizedState = e : ll || (e = t.type, l = t.pendingProps, a = Gn(w.current).createElement(e), a[Zl] = t, a[Il] = l, Jl(a, e, l), Xl(a), t.stateNode = a) : t.memoizedState = s0(t.type, l.memoizedProps, t.pendingProps, l.memoizedState), null;
      case 27:
        return Ve(t), l === null && ll && (a = t.stateNode = c0(t.type, t.pendingProps, w.current), Ll = t, Tt = true, u = Sl, Se(t.type) ? (ff = u, Sl = At(a.firstChild)) : Sl = u), Kl(l, t, t.pendingProps.children, e), xn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && ll && ((u = a = Sl) && (a = Zm(a, t.type, t.pendingProps, Tt), a !== null ? (t.stateNode = a, Ll = t, Sl = At(a.firstChild), Tt = false, u = true) : u = false), u || ne(t)), Ve(t), u = t.type, n = t.pendingProps, c = l !== null ? l.memoizedProps : null, a = n.children, ef(u, n) ? a = null : c !== null && ef(u, c) && (t.flags |= 32), t.memoizedState !== null && (u = ti(l, t, um, null, null, e), xu._currentValue = u), xn(l, t), Kl(l, t, a, e), t.child;
      case 6:
        return l === null && ll && ((l = e = Sl) && (e = Lm(e, t.pendingProps, Tt), e !== null ? (t.stateNode = e, Ll = t, Sl = null, l = true) : l = false), l || ne(t)), null;
      case 13:
        return ko(l, t, e);
      case 4:
        return Dl(t, t.stateNode.containerInfo), a = t.pendingProps, l === null ? t.child = Ge(t, null, a, e) : Kl(l, t, a, e), t.child;
      case 11:
        return Xo(l, t, t.type, t.pendingProps, e);
      case 7:
        return Kl(l, t, t.pendingProps, e), t.child;
      case 8:
        return Kl(l, t, t.pendingProps.children, e), t.child;
      case 12:
        return Kl(l, t, t.pendingProps.children, e), t.child;
      case 10:
        return a = t.pendingProps, ce(t, t.type, a.value), Kl(l, t, a.children, e), t.child;
      case 9:
        return u = t.type._context, a = t.pendingProps.children, He(t), u = Vl(u), a = a(u), t.flags |= 1, Kl(l, t, a, e), t.child;
      case 14:
        return Qo(l, t, t.type, t.pendingProps, e);
      case 15:
        return wo(l, t, t.type, t.pendingProps, e);
      case 19:
        return Fo(l, t, e);
      case 31:
        return dm(l, t, e);
      case 22:
        return Zo(l, t, e, t.pendingProps);
      case 24:
        return He(t), a = Vl(Cl), l === null ? (u = Vc(), u === null && (u = vl, n = Zc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, Jc(t), ce(t, Cl, u)) : ((l.lanes & e) !== 0 && (Wc(l, t), eu(t, null, null, e), tu()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ce(t, Cl, a)) : (a = n.cache, ce(t, Cl, a), a !== u.cache && wc(t, [Cl], e, true))), Kl(l, t, t.pendingProps.children, e), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Kt(l) {
    l.flags |= 4;
  }
  function Oi(l, t, e, a, u) {
    if ((t = (l.mode & 32) !== 0) && (t = false), t) {
      if (l.flags |= 16777216, (u & 335544128) === u) if (l.stateNode.complete) l.flags |= 8192;
      else if (Er()) l.flags |= 8192;
      else throw Ye = cn, Kc;
    } else l.flags &= -16777217;
  }
  function Po(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) l.flags &= -16777217;
    else if (l.flags |= 16777216, !h0(t)) if (Er()) l.flags |= 8192;
    else throw Ye = cn, Kc;
  }
  function Tn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? jf() : 536870912, l.lanes |= t, xa |= t);
  }
  function fu(l, t) {
    if (!ll) switch (l.tailMode) {
      case "hidden":
        t = l.tail;
        for (var e = null; t !== null; ) t.alternate !== null && (e = t), t = t.sibling;
        e === null ? l.tail = null : e.sibling = null;
        break;
      case "collapsed":
        e = l.tail;
        for (var a = null; e !== null; ) e.alternate !== null && (a = e), e = e.sibling;
        a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
    }
  }
  function pl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t) for (var u = l.child; u !== null; ) e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = l, u = u.sibling;
    else for (u = l.child; u !== null; ) e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function hm(l, t, e) {
    var a = t.pendingProps;
    switch (qc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return pl(t), null;
      case 1:
        return pl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), wt(Cl), zl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (sa(t) ? Kt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Gc())), pl(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (Kt(t), n !== null ? (pl(t), Po(t, n)) : (pl(t), Oi(t, u, null, a, e))) : n ? n !== l.memoizedState ? (Kt(t), pl(t), Po(t, n)) : (pl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && Kt(t), pl(t), Oi(t, u, l, a, e)), null;
      case 27:
        if (Ee(t), e = w.current, u = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Kt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return pl(t), null;
          }
          l = j.current, sa(t) ? js(t) : (l = c0(u, a, e), t.stateNode = l, Kt(t));
        }
        return pl(t), null;
      case 5:
        if (Ee(t), u = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Kt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return pl(t), null;
          }
          if (n = j.current, sa(t)) js(t);
          else {
            var c = Gn(w.current);
            switch (n) {
              case 1:
                n = c.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                n = c.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    n = c.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    n = c.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                    break;
                  case "script":
                    n = c.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild);
                    break;
                  case "select":
                    n = typeof a.is == "string" ? c.createElement("select", { is: a.is }) : c.createElement("select"), a.multiple ? n.multiple = true : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? c.createElement(u, { is: a.is }) : c.createElement(u);
                }
            }
            n[Zl] = t, n[Il] = a;
            l: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6) n.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === t) break l;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t) break l;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            t.stateNode = n;
            l: switch (Jl(n, u, a), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = true;
                break l;
              default:
                a = false;
            }
            a && Kt(t);
          }
        }
        return pl(t), Oi(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, e), null;
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Kt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(s(166));
          if (l = w.current, sa(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = Ll, u !== null) switch (u.tag) {
              case 27:
              case 5:
                a = u.memoizedProps;
            }
            l[Zl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === true || kr(l.nodeValue, e)), l || ne(t, true);
          } else l = Gn(l).createTextNode(a), l[Zl] = t, t.stateNode = l;
        }
        return pl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = sa(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(s(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(557));
              l[Zl] = t;
            } else Ce(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            pl(t), l = false;
          } else e = Gc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = true;
          if (!l) return t.flags & 256 ? (mt(t), t) : (mt(t), null);
          if ((t.flags & 128) !== 0) throw Error(s(558));
        }
        return pl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = sa(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[Zl] = t;
            } else Ce(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            pl(t), u = false;
          } else u = Gc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = true;
          if (!u) return t.flags & 256 ? (mt(t), t) : (mt(t), null);
        }
        return mt(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), Tn(t, t.updateQueue), pl(t), null);
      case 4:
        return zl(), l === null && Fi(t.stateNode.containerInfo), pl(t), null;
      case 10:
        return wt(t.type), pl(t), null;
      case 19:
        if (A(jl), a = t.memoizedState, a === null) return pl(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null) if (u) fu(a, false);
        else {
          if (Ml !== 0 || l !== null && (l.flags & 128) !== 0) for (l = t.child; l !== null; ) {
            if (n = rn(l), n !== null) {
              for (t.flags |= 128, fu(a, false), l = n.updateQueue, t.updateQueue = l, Tn(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; ) As(e, l), e = e.sibling;
              return M(jl, jl.current & 1 | 2), ll && Xt(t, a.treeForkCount), t.child;
            }
            l = l.sibling;
          }
          a.tail !== null && it() > On && (t.flags |= 128, u = true, fu(a, false), t.lanes = 4194304);
        }
        else {
          if (!u) if (l = rn(n), l !== null) {
            if (t.flags |= 128, u = true, l = l.updateQueue, t.updateQueue = l, Tn(t, l), fu(a, true), a.tail === null && a.tailMode === "hidden" && !n.alternate && !ll) return pl(t), null;
          } else 2 * it() - a.renderingStartTime > On && e !== 536870912 && (t.flags |= 128, u = true, fu(a, false), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = it(), l.sibling = null, e = jl.current, M(jl, u ? e & 1 | 2 : e & 1), ll && Xt(t, a.treeForkCount), l) : (pl(t), null);
      case 22:
      case 23:
        return mt(t), Ic(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (pl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : pl(t), e = t.updateQueue, e !== null && Tn(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && A(Be), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), wt(Cl), pl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function ym(l, t) {
    switch (qc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return wt(Cl), zl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ee(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (mt(t), t.alternate === null) throw Error(s(340));
          Ce();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (mt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null) throw Error(s(340));
          Ce();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return A(jl), null;
      case 4:
        return zl(), null;
      case 10:
        return wt(t.type), null;
      case 22:
      case 23:
        return mt(t), Ic(), l !== null && A(Be), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return wt(Cl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function lr(l, t) {
    switch (qc(t), t.tag) {
      case 3:
        wt(Cl), zl();
        break;
      case 26:
      case 27:
      case 5:
        Ee(t);
        break;
      case 4:
        zl();
        break;
      case 31:
        t.memoizedState !== null && mt(t);
        break;
      case 13:
        mt(t);
        break;
      case 19:
        A(jl);
        break;
      case 10:
        wt(t.type);
        break;
      case 22:
      case 23:
        mt(t), Ic(), l !== null && A(Be);
        break;
      case 24:
        wt(Cl);
    }
  }
  function su(l, t) {
    try {
      var e = t.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var n = e.create, c = e.inst;
            a = n(), c.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (i) {
      rl(t, t.return, i);
    }
  }
  function de(l, t, e) {
    try {
      var a = t.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var c = a.inst, i = c.destroy;
            if (i !== void 0) {
              c.destroy = void 0, u = t;
              var o = e, v = i;
              try {
                v();
              } catch (x) {
                rl(u, o, x);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (x) {
      rl(t, t.return, x);
    }
  }
  function tr(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Ls(t, e);
      } catch (a) {
        rl(l, l.return, a);
      }
    }
  }
  function er(l, t, e) {
    e.props = Qe(l.type, l.memoizedProps), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      rl(l, t, a);
    }
  }
  function ou(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? l.refCleanup = e(a) : e.current = a;
      }
    } catch (u) {
      rl(l, t, u);
    }
  }
  function Ct(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null) if (typeof a == "function") try {
      a();
    } catch (u) {
      rl(l, t, u);
    } finally {
      l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
    }
    else if (typeof e == "function") try {
      e(null);
    } catch (u) {
      rl(l, t, u);
    }
    else e.current = null;
  }
  function ar(l) {
    var t = l.type, e = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      rl(l, l.return, u);
    }
  }
  function Di(l, t, e) {
    try {
      var a = l.stateNode;
      qm(a, l.type, e, t), a[Il] = t;
    } catch (u) {
      rl(l, l.return, u);
    }
  }
  function ur(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Se(l.type) || l.tag === 4;
  }
  function ji(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || ur(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Se(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Ui(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = qt));
    else if (a !== 4 && (a === 27 && Se(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null)) for (Ui(l, t, e), l = l.sibling; l !== null; ) Ui(l, t, e), l = l.sibling;
  }
  function En(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && Se(l.type) && (e = l.stateNode), l = l.child, l !== null)) for (En(l, t, e), l = l.sibling; l !== null; ) En(l, t, e), l = l.sibling;
  }
  function nr(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; ) t.removeAttributeNode(u[0]);
      Jl(t, a, e), t[Zl] = l, t[Il] = e;
    } catch (n) {
      rl(l, l.return, n);
    }
  }
  var Jt = false, Bl = false, Ci = false, cr = typeof WeakSet == "function" ? WeakSet : Set, Ql = null;
  function vm(l, t) {
    if (l = l.containerInfo, lf = Kn, l = gs(l), Ac(l)) {
      if ("selectionStart" in l) var e = { start: l.selectionStart, end: l.selectionEnd };
      else l: {
        e = (e = l.ownerDocument) && e.defaultView || window;
        var a = e.getSelection && e.getSelection();
        if (a && a.rangeCount !== 0) {
          e = a.anchorNode;
          var u = a.anchorOffset, n = a.focusNode;
          a = a.focusOffset;
          try {
            e.nodeType, n.nodeType;
          } catch {
            e = null;
            break l;
          }
          var c = 0, i = -1, o = -1, v = 0, x = 0, E = l, b = null;
          t: for (; ; ) {
            for (var _; E !== e || u !== 0 && E.nodeType !== 3 || (i = c + u), E !== n || a !== 0 && E.nodeType !== 3 || (o = c + a), E.nodeType === 3 && (c += E.nodeValue.length), (_ = E.firstChild) !== null; ) b = E, E = _;
            for (; ; ) {
              if (E === l) break t;
              if (b === e && ++v === u && (i = c), b === n && ++x === a && (o = c), (_ = E.nextSibling) !== null) break;
              E = b, b = E.parentNode;
            }
            E = _;
          }
          e = i === -1 || o === -1 ? null : { start: i, end: o };
        } else e = null;
      }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (tf = { focusedElem: l, selectionRange: e }, Kn = false, Ql = t; Ql !== null; ) if (t = Ql, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null) l.return = t, Ql = l;
    else for (; Ql !== null; ) {
      switch (t = Ql, n = t.alternate, l = t.flags, t.tag) {
        case 0:
          if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null)) for (e = 0; e < l.length; e++) u = l[e], u.ref.impl = u.nextImpl;
          break;
        case 11:
        case 15:
          break;
        case 1:
          if ((l & 1024) !== 0 && n !== null) {
            l = void 0, e = t, u = n.memoizedProps, n = n.memoizedState, a = e.stateNode;
            try {
              var R = Qe(e.type, u);
              l = a.getSnapshotBeforeUpdate(R, n), a.__reactInternalSnapshotBeforeUpdate = l;
            } catch (Q) {
              rl(e, e.return, Q);
            }
          }
          break;
        case 3:
          if ((l & 1024) !== 0) {
            if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9) uf(l);
            else if (e === 1) switch (l.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                uf(l);
                break;
              default:
                l.textContent = "";
            }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        default:
          if ((l & 1024) !== 0) throw Error(s(163));
      }
      if (l = t.sibling, l !== null) {
        l.return = t.return, Ql = l;
        break;
      }
      Ql = t.return;
    }
  }
  function ir(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        kt(l, e), a & 4 && su(5, e);
        break;
      case 1:
        if (kt(l, e), a & 4) if (l = e.stateNode, t === null) try {
          l.componentDidMount();
        } catch (c) {
          rl(e, e.return, c);
        }
        else {
          var u = Qe(e.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
          } catch (c) {
            rl(e, e.return, c);
          }
        }
        a & 64 && tr(e), a & 512 && ou(e, e.return);
        break;
      case 3:
        if (kt(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
          if (t = null, e.child !== null) switch (e.child.tag) {
            case 27:
            case 5:
              t = e.child.stateNode;
              break;
            case 1:
              t = e.child.stateNode;
          }
          try {
            Ls(l, t);
          } catch (c) {
            rl(e, e.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && nr(e);
      case 26:
      case 5:
        kt(l, e), t === null && a & 4 && ar(e), a & 512 && ou(e, e.return);
        break;
      case 12:
        kt(l, e);
        break;
      case 31:
        kt(l, e), a & 4 && or(l, e);
        break;
      case 13:
        kt(l, e), a & 4 && rr(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = Em.bind(null, e), Vm(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Jt, !a) {
          t = t !== null && t.memoizedState !== null || Bl, u = Jt;
          var n = Bl;
          Jt = a, (Bl = t) && !n ? $t(l, e, (e.subtreeFlags & 8772) !== 0) : kt(l, e), Jt = u, Bl = n;
        }
        break;
      case 30:
        break;
      default:
        kt(l, e);
    }
  }
  function fr(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, fr(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && sc(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Tl = null, lt = false;
  function Wt(l, t, e) {
    for (e = e.child; e !== null; ) sr(l, t, e), e = e.sibling;
  }
  function sr(l, t, e) {
    if (ft && typeof ft.onCommitFiberUnmount == "function") try {
      ft.onCommitFiberUnmount(Ra, e);
    } catch {
    }
    switch (e.tag) {
      case 26:
        Bl || Ct(e, t), Wt(l, t, e), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Bl || Ct(e, t);
        var a = Tl, u = lt;
        Se(e.type) && (Tl = e.stateNode, lt = false), Wt(l, t, e), Su(e.stateNode), Tl = a, lt = u;
        break;
      case 5:
        Bl || Ct(e, t);
      case 6:
        if (a = Tl, u = lt, Tl = null, Wt(l, t, e), Tl = a, lt = u, Tl !== null) if (lt) try {
          (Tl.nodeType === 9 ? Tl.body : Tl.nodeName === "HTML" ? Tl.ownerDocument.body : Tl).removeChild(e.stateNode);
        } catch (n) {
          rl(e, t, n);
        }
        else try {
          Tl.removeChild(e.stateNode);
        } catch (n) {
          rl(e, t, n);
        }
        break;
      case 18:
        Tl !== null && (lt ? (l = Tl, t0(l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.stateNode), Da(l)) : t0(Tl, e.stateNode));
        break;
      case 4:
        a = Tl, u = lt, Tl = e.stateNode.containerInfo, lt = true, Wt(l, t, e), Tl = a, lt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        de(2, e, t), Bl || de(4, e, t), Wt(l, t, e);
        break;
      case 1:
        Bl || (Ct(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && er(e, t, a)), Wt(l, t, e);
        break;
      case 21:
        Wt(l, t, e);
        break;
      case 22:
        Bl = (a = Bl) || e.memoizedState !== null, Wt(l, t, e), Bl = a;
        break;
      default:
        Wt(l, t, e);
    }
  }
  function or(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Da(l);
      } catch (e) {
        rl(t, t.return, e);
      }
    }
  }
  function rr(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null)))) try {
      Da(l);
    } catch (e) {
      rl(t, t.return, e);
    }
  }
  function gm(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new cr()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new cr()), t;
      default:
        throw Error(s(435, l.tag));
    }
  }
  function An(l, t) {
    var e = gm(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = Am.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function tt(l, t) {
    var e = t.deletions;
    if (e !== null) for (var a = 0; a < e.length; a++) {
      var u = e[a], n = l, c = t, i = c;
      l: for (; i !== null; ) {
        switch (i.tag) {
          case 27:
            if (Se(i.type)) {
              Tl = i.stateNode, lt = false;
              break l;
            }
            break;
          case 5:
            Tl = i.stateNode, lt = false;
            break l;
          case 3:
          case 4:
            Tl = i.stateNode.containerInfo, lt = true;
            break l;
        }
        i = i.return;
      }
      if (Tl === null) throw Error(s(160));
      sr(n, c, u), Tl = null, lt = false, n = u.alternate, n !== null && (n.return = null), u.return = null;
    }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) dr(t, l), t = t.sibling;
  }
  var Ot = null;
  function dr(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        tt(t, l), et(l), a & 4 && (de(3, l, l.return), su(3, l), de(5, l, l.return));
        break;
      case 1:
        tt(t, l), et(l), a & 512 && (Bl || e === null || Ct(e, e.return)), a & 64 && Jt && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Ot;
        if (tt(t, l), et(l), a & 512 && (Bl || e === null || Ct(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null) if (a === null) if (l.stateNode === null) {
            l: {
              a = l.type, e = l.memoizedProps, u = u.ownerDocument || u;
              t: switch (a) {
                case "title":
                  n = u.getElementsByTagName("title")[0], (!n || n[qa] || n[Zl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(n, u.querySelector("head > title"))), Jl(n, a, e), n[Zl] = l, Xl(n), a = n;
                  break l;
                case "link":
                  var c = d0("link", "href", u).get(a + (e.href || ""));
                  if (c) {
                    for (var i = 0; i < c.length; i++) if (n = c[i], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                      c.splice(i, 1);
                      break t;
                    }
                  }
                  n = u.createElement(a), Jl(n, a, e), u.head.appendChild(n);
                  break;
                case "meta":
                  if (c = d0("meta", "content", u).get(a + (e.content || ""))) {
                    for (i = 0; i < c.length; i++) if (n = c[i], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                      c.splice(i, 1);
                      break t;
                    }
                  }
                  n = u.createElement(a), Jl(n, a, e), u.head.appendChild(n);
                  break;
                default:
                  throw Error(s(468, a));
              }
              n[Zl] = l, Xl(n), a = n;
            }
            l.stateNode = a;
          } else m0(u, l.type, l.stateNode);
          else l.stateNode = r0(u, a, l.memoizedProps);
          else n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? m0(u, l.type, l.stateNode) : r0(u, a, l.memoizedProps)) : a === null && l.stateNode !== null && Di(l, l.memoizedProps, e.memoizedProps);
        }
        break;
      case 27:
        tt(t, l), et(l), a & 512 && (Bl || e === null || Ct(e, e.return)), e !== null && a & 4 && Di(l, l.memoizedProps, e.memoizedProps);
        break;
      case 5:
        if (tt(t, l), et(l), a & 512 && (Bl || e === null || Ct(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            Pe(u, "");
          } catch (R) {
            rl(l, l.return, R);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, Di(l, u, e !== null ? e.memoizedProps : u)), a & 1024 && (Ci = true);
        break;
      case 6:
        if (tt(t, l), et(l), a & 4) {
          if (l.stateNode === null) throw Error(s(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (R) {
            rl(l, l.return, R);
          }
        }
        break;
      case 3:
        if (wn = null, u = Ot, Ot = Xn(t.containerInfo), tt(t, l), Ot = u, et(l), a & 4 && e !== null && e.memoizedState.isDehydrated) try {
          Da(t.containerInfo);
        } catch (R) {
          rl(l, l.return, R);
        }
        Ci && (Ci = false, mr(l));
        break;
      case 4:
        a = Ot, Ot = Xn(l.stateNode.containerInfo), tt(t, l), et(l), Ot = a;
        break;
      case 12:
        tt(t, l), et(l);
        break;
      case 31:
        tt(t, l), et(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, An(l, a)));
        break;
      case 13:
        tt(t, l), et(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Mn = it()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, An(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var o = e !== null && e.memoizedState !== null, v = Jt, x = Bl;
        if (Jt = v || u, Bl = x || o, tt(t, l), Bl = x, Jt = v, et(l), a & 8192) l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || o || Jt || Bl || we(l)), e = null, t = l; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (e === null) {
              o = e = t;
              try {
                if (n = o.stateNode, u) c = n.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                else {
                  i = o.stateNode;
                  var E = o.memoizedProps.style, b = E != null && E.hasOwnProperty("display") ? E.display : null;
                  i.style.display = b == null || typeof b == "boolean" ? "" : ("" + b).trim();
                }
              } catch (R) {
                rl(o, o.return, R);
              }
            }
          } else if (t.tag === 6) {
            if (e === null) {
              o = t;
              try {
                o.stateNode.nodeValue = u ? "" : o.memoizedProps;
              } catch (R) {
                rl(o, o.return, R);
              }
            }
          } else if (t.tag === 18) {
            if (e === null) {
              o = t;
              try {
                var _ = o.stateNode;
                u ? e0(_, true) : e0(o.stateNode, false);
              } catch (R) {
                rl(o, o.return, R);
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === l) break l;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === l) break l;
            e === t && (e = null), t = t.return;
          }
          e === t && (e = null), t.sibling.return = t.return, t = t.sibling;
        }
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, An(l, e))));
        break;
      case 19:
        tt(t, l), et(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, An(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        tt(t, l), et(l);
    }
  }
  function et(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (ur(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = ji(l);
            En(l, n, u);
            break;
          case 5:
            var c = e.stateNode;
            e.flags & 32 && (Pe(c, ""), e.flags &= -33);
            var i = ji(l);
            En(l, i, c);
            break;
          case 3:
          case 4:
            var o = e.stateNode.containerInfo, v = ji(l);
            Ui(l, v, o);
            break;
          default:
            throw Error(s(161));
        }
      } catch (x) {
        rl(l, l.return, x);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function mr(l) {
    if (l.subtreeFlags & 1024) for (l = l.child; l !== null; ) {
      var t = l;
      mr(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
  }
  function kt(l, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) ir(l, t.alternate, t), t = t.sibling;
  }
  function we(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          de(4, t, t.return), we(t);
          break;
        case 1:
          Ct(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && er(t, t.return, e), we(t);
          break;
        case 27:
          Su(t.stateNode);
        case 26:
        case 5:
          Ct(t, t.return), we(t);
          break;
        case 22:
          t.memoizedState === null && we(t);
          break;
        case 30:
          we(t);
          break;
        default:
          we(t);
      }
      l = l.sibling;
    }
  }
  function $t(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, u = l, n = t, c = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          $t(u, n, e), su(4, n);
          break;
        case 1:
          if ($t(u, n, e), a = n, u = a.stateNode, typeof u.componentDidMount == "function") try {
            u.componentDidMount();
          } catch (v) {
            rl(a, a.return, v);
          }
          if (a = n, u = a.updateQueue, u !== null) {
            var i = a.stateNode;
            try {
              var o = u.shared.hiddenCallbacks;
              if (o !== null) for (u.shared.hiddenCallbacks = null, u = 0; u < o.length; u++) Zs(o[u], i);
            } catch (v) {
              rl(a, a.return, v);
            }
          }
          e && c & 64 && tr(n), ou(n, n.return);
          break;
        case 27:
          nr(n);
        case 26:
        case 5:
          $t(u, n, e), e && a === null && c & 4 && ar(n), ou(n, n.return);
          break;
        case 12:
          $t(u, n, e);
          break;
        case 31:
          $t(u, n, e), e && c & 4 && or(u, n);
          break;
        case 13:
          $t(u, n, e), e && c & 4 && rr(u, n);
          break;
        case 22:
          n.memoizedState === null && $t(u, n, e), ou(n, n.return);
          break;
        case 30:
          break;
        default:
          $t(u, n, e);
      }
      t = t.sibling;
    }
  }
  function Ri(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && $a(e));
  }
  function Hi(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && $a(l));
  }
  function Dt(l, t, e, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) hr(l, t, e, a), t = t.sibling;
  }
  function hr(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Dt(l, t, e, a), u & 2048 && su(9, t);
        break;
      case 1:
        Dt(l, t, e, a);
        break;
      case 3:
        Dt(l, t, e, a), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && $a(l)));
        break;
      case 12:
        if (u & 2048) {
          Dt(l, t, e, a), l = t.stateNode;
          try {
            var n = t.memoizedProps, c = n.id, i = n.onPostCommit;
            typeof i == "function" && i(c, t.alternate === null ? "mount" : "update", l.passiveEffectDuration, -0);
          } catch (o) {
            rl(t, t.return, o);
          }
        } else Dt(l, t, e, a);
        break;
      case 31:
        Dt(l, t, e, a);
        break;
      case 13:
        Dt(l, t, e, a);
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, c = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Dt(l, t, e, a) : ru(l, t) : n._visibility & 2 ? Dt(l, t, e, a) : (n._visibility |= 2, Sa(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || false)), u & 2048 && Ri(c, t);
        break;
      case 24:
        Dt(l, t, e, a), u & 2048 && Hi(t.alternate, t);
        break;
      default:
        Dt(l, t, e, a);
    }
  }
  function Sa(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
      var n = l, c = t, i = e, o = a, v = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Sa(n, c, i, o, u), su(8, c);
          break;
        case 23:
          break;
        case 22:
          var x = c.stateNode;
          c.memoizedState !== null ? x._visibility & 2 ? Sa(n, c, i, o, u) : ru(n, c) : (x._visibility |= 2, Sa(n, c, i, o, u)), u && v & 2048 && Ri(c.alternate, c);
          break;
        case 24:
          Sa(n, c, i, o, u), u && v & 2048 && Hi(c.alternate, c);
          break;
        default:
          Sa(n, c, i, o, u);
      }
      t = t.sibling;
    }
  }
  function ru(l, t) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
      var e = l, a = t, u = a.flags;
      switch (a.tag) {
        case 22:
          ru(e, a), u & 2048 && Ri(a.alternate, a);
          break;
        case 24:
          ru(e, a), u & 2048 && Hi(a.alternate, a);
          break;
        default:
          ru(e, a);
      }
      t = t.sibling;
    }
  }
  var du = 8192;
  function pa(l, t, e) {
    if (l.subtreeFlags & du) for (l = l.child; l !== null; ) yr(l, t, e), l = l.sibling;
  }
  function yr(l, t, e) {
    switch (l.tag) {
      case 26:
        pa(l, t, e), l.flags & du && l.memoizedState !== null && ah(e, Ot, l.memoizedState, l.memoizedProps);
        break;
      case 5:
        pa(l, t, e);
        break;
      case 3:
      case 4:
        var a = Ot;
        Ot = Xn(l.stateNode.containerInfo), pa(l, t, e), Ot = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = du, du = 16777216, pa(l, t, e), du = a) : pa(l, t, e));
        break;
      default:
        pa(l, t, e);
    }
  }
  function vr(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function mu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) for (var e = 0; e < t.length; e++) {
        var a = t[e];
        Ql = a, br(a, l);
      }
      vr(l);
    }
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) gr(l), l = l.sibling;
  }
  function gr(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        mu(l), l.flags & 2048 && de(9, l, l.return);
        break;
      case 3:
        mu(l);
        break;
      case 12:
        mu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Nn(l)) : mu(l);
        break;
      default:
        mu(l);
    }
  }
  function Nn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) for (var e = 0; e < t.length; e++) {
        var a = t[e];
        Ql = a, br(a, l);
      }
      vr(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          de(8, t, t.return), Nn(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, Nn(t));
          break;
        default:
          Nn(t);
      }
      l = l.sibling;
    }
  }
  function br(l, t) {
    for (; Ql !== null; ) {
      var e = Ql;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          de(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          $a(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Ql = a;
      else l: for (e = l; Ql !== null; ) {
        a = Ql;
        var u = a.sibling, n = a.return;
        if (fr(a), a === e) {
          Ql = null;
          break l;
        }
        if (u !== null) {
          u.return = n, Ql = u;
          break l;
        }
        Ql = n;
      }
    }
  }
  var bm = { getCacheForType: function(l) {
    var t = Vl(Cl), e = t.data.get(l);
    return e === void 0 && (e = l(), t.data.set(l, e)), e;
  }, cacheSignal: function() {
    return Vl(Cl).controller.signal;
  } }, Sm = typeof WeakMap == "function" ? WeakMap : Map, il = 0, vl = null, k = null, I = 0, ol = 0, ht = null, me = false, _a = false, Bi = false, Ft = 0, Ml = 0, he = 0, Ze = 0, qi = 0, yt = 0, xa = 0, hu = null, at = null, Yi = false, Mn = 0, Sr = 0, On = 1 / 0, Dn = null, ye = null, Yl = 0, ve = null, za = null, It = 0, Gi = 0, Xi = null, pr = null, yu = 0, Qi = null;
  function vt() {
    return (il & 2) !== 0 && I !== 0 ? I & -I : z.T !== null ? Ji() : Hf();
  }
  function _r() {
    if (yt === 0) if ((I & 536870912) === 0 || ll) {
      var l = qu;
      qu <<= 1, (qu & 3932160) === 0 && (qu = 262144), yt = l;
    } else yt = 536870912;
    return l = dt.current, l !== null && (l.flags |= 32), yt;
  }
  function ut(l, t, e) {
    (l === vl && (ol === 2 || ol === 9) || l.cancelPendingCommit !== null) && (Ta(l, 0), ge(l, I, yt, false)), Ba(l, e), ((il & 2) === 0 || l !== vl) && (l === vl && ((il & 2) === 0 && (Ze |= e), Ml === 4 && ge(l, I, yt, false)), Rt(l));
  }
  function xr(l, t, e) {
    if ((il & 6) !== 0) throw Error(s(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Ha(l, t), u = a ? xm(l, t) : Zi(l, t, true), n = a;
    do {
      if (u === 0) {
        _a && !a && ge(l, t, 0, false);
        break;
      } else {
        if (e = l.current.alternate, n && !pm(e)) {
          u = Zi(l, t, false), n = false;
          continue;
        }
        if (u === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n) var c = 0;
          else c = l.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            t = c;
            l: {
              var i = l;
              u = hu;
              var o = i.current.memoizedState.isDehydrated;
              if (o && (Ta(i, c).flags |= 256), c = Zi(i, c, false), c !== 2) {
                if (Bi && !o) {
                  i.errorRecoveryDisabledLanes |= n, Ze |= n, u = 4;
                  break l;
                }
                n = at, at = u, n !== null && (at === null ? at = n : at.push.apply(at, n));
              }
              u = c;
            }
            if (n = false, u !== 2) continue;
          }
        }
        if (u === 1) {
          Ta(l, 0), ge(l, t, 0, true);
          break;
        }
        l: {
          switch (a = l, n = u, n) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ge(a, t, yt, !me);
              break l;
            case 2:
              at = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = Mn + 300 - it(), 10 < u)) {
            if (ge(a, t, yt, !me), Gu(a, 0, true) !== 0) break l;
            It = t, a.timeoutHandle = Pr(zr.bind(null, a, e, at, Dn, Yi, t, yt, Ze, xa, me, n, "Throttled", -0, 0), u);
            break l;
          }
          zr(a, e, at, Dn, Yi, t, yt, Ze, xa, me, n, null, -0, 0);
        }
      }
      break;
    } while (true);
    Rt(l);
  }
  function zr(l, t, e, a, u, n, c, i, o, v, x, E, b, _) {
    if (l.timeoutHandle = -1, E = t.subtreeFlags, E & 8192 || (E & 16785408) === 16785408) {
      E = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: qt }, yr(t, n, E);
      var R = (n & 62914560) === n ? Mn - it() : (n & 4194048) === n ? Sr - it() : 0;
      if (R = uh(E, R), R !== null) {
        It = n, l.cancelPendingCommit = R(jr.bind(null, l, t, n, e, a, u, c, i, o, x, E, null, b, _)), ge(l, n, c, !v);
        return;
      }
    }
    jr(l, t, n, e, a, u, c, i, o);
  }
  function pm(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null))) for (var a = 0; a < e.length; a++) {
        var u = e[a], n = u.getSnapshot;
        u = u.value;
        try {
          if (!ot(n(), u)) return false;
        } catch {
          return false;
        }
      }
      if (e = t.child, t.subtreeFlags & 16384 && e !== null) e.return = t, t = e;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return true;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return true;
  }
  function ge(l, t, e, a) {
    t &= ~qi, t &= ~Ze, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - st(u), c = 1 << n;
      a[n] = -1, u &= ~c;
    }
    e !== 0 && Uf(l, e, t);
  }
  function jn() {
    return (il & 6) === 0 ? (vu(0), false) : true;
  }
  function wi() {
    if (k !== null) {
      if (ol === 0) var l = k.return;
      else l = k, Qt = Re = null, ui(l), ha = null, Ia = 0, l = k;
      for (; l !== null; ) lr(l.alternate, l), l = l.return;
      k = null;
    }
  }
  function Ta(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, Xm(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), It = 0, wi(), vl = l, k = e = Gt(l.current, null), I = t, ol = 0, ht = null, me = false, _a = Ha(l, t), Bi = false, xa = yt = qi = Ze = he = Ml = 0, at = hu = null, Yi = false, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0) for (l = l.entanglements, a &= t; 0 < a; ) {
      var u = 31 - st(a), n = 1 << u;
      t |= l[u], a &= ~n;
    }
    return Ft = t, Fu(), e;
  }
  function Tr(l, t) {
    K = null, z.H = cu, t === ma || t === nn ? (t = Gs(), ol = 3) : t === Kc ? (t = Gs(), ol = 4) : ol = t === pi ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ht = t, k === null && (Ml = 1, pn(l, _t(t, l.current)));
  }
  function Er() {
    var l = dt.current;
    return l === null ? true : (I & 4194048) === I ? Et === null : (I & 62914560) === I || (I & 536870912) !== 0 ? l === Et : false;
  }
  function Ar() {
    var l = z.H;
    return z.H = cu, l === null ? cu : l;
  }
  function Nr() {
    var l = z.A;
    return z.A = bm, l;
  }
  function Un() {
    Ml = 4, me || (I & 4194048) !== I && dt.current !== null || (_a = true), (he & 134217727) === 0 && (Ze & 134217727) === 0 || vl === null || ge(vl, I, yt, false);
  }
  function Zi(l, t, e) {
    var a = il;
    il |= 2;
    var u = Ar(), n = Nr();
    (vl !== l || I !== t) && (Dn = null, Ta(l, t)), t = false;
    var c = Ml;
    l: do
      try {
        if (ol !== 0 && k !== null) {
          var i = k, o = ht;
          switch (ol) {
            case 8:
              wi(), c = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              dt.current === null && (t = true);
              var v = ol;
              if (ol = 0, ht = null, Ea(l, i, o, v), e && _a) {
                c = 0;
                break l;
              }
              break;
            default:
              v = ol, ol = 0, ht = null, Ea(l, i, o, v);
          }
        }
        _m(), c = Ml;
        break;
      } catch (x) {
        Tr(l, x);
      }
    while (true);
    return t && l.shellSuspendCounter++, Qt = Re = null, il = a, z.H = u, z.A = n, k === null && (vl = null, I = 0, Fu()), c;
  }
  function _m() {
    for (; k !== null; ) Mr(k);
  }
  function xm(l, t) {
    var e = il;
    il |= 2;
    var a = Ar(), u = Nr();
    vl !== l || I !== t ? (Dn = null, On = it() + 500, Ta(l, t)) : _a = Ha(l, t);
    l: do
      try {
        if (ol !== 0 && k !== null) {
          t = k;
          var n = ht;
          t: switch (ol) {
            case 1:
              ol = 0, ht = null, Ea(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (qs(n)) {
                ol = 0, ht = null, Or(t);
                break;
              }
              t = function() {
                ol !== 2 && ol !== 9 || vl !== l || (ol = 7), Rt(l);
              }, n.then(t, t);
              break l;
            case 3:
              ol = 7;
              break l;
            case 4:
              ol = 5;
              break l;
            case 7:
              qs(n) ? (ol = 0, ht = null, Or(t)) : (ol = 0, ht = null, Ea(l, t, n, 7));
              break;
            case 5:
              var c = null;
              switch (k.tag) {
                case 26:
                  c = k.memoizedState;
                case 5:
                case 27:
                  var i = k;
                  if (c ? h0(c) : i.stateNode.complete) {
                    ol = 0, ht = null;
                    var o = i.sibling;
                    if (o !== null) k = o;
                    else {
                      var v = i.return;
                      v !== null ? (k = v, Cn(v)) : k = null;
                    }
                    break t;
                  }
              }
              ol = 0, ht = null, Ea(l, t, n, 5);
              break;
            case 6:
              ol = 0, ht = null, Ea(l, t, n, 6);
              break;
            case 8:
              wi(), Ml = 6;
              break l;
            default:
              throw Error(s(462));
          }
        }
        zm();
        break;
      } catch (x) {
        Tr(l, x);
      }
    while (true);
    return Qt = Re = null, z.H = a, z.A = u, il = e, k !== null ? 0 : (vl = null, I = 0, Fu(), Ml);
  }
  function zm() {
    for (; k !== null && !K0(); ) Mr(k);
  }
  function Mr(l) {
    var t = Io(l.alternate, l, Ft);
    l.memoizedProps = l.pendingProps, t === null ? Cn(l) : k = t;
  }
  function Or(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ko(e, t, t.pendingProps, t.type, void 0, I);
        break;
      case 11:
        t = Ko(e, t, t.pendingProps, t.type.render, t.ref, I);
        break;
      case 5:
        ui(t);
      default:
        lr(e, t), t = k = As(t, Ft), t = Io(e, t, Ft);
    }
    l.memoizedProps = l.pendingProps, t === null ? Cn(l) : k = t;
  }
  function Ea(l, t, e, a) {
    Qt = Re = null, ui(t), ha = null, Ia = 0;
    var u = t.return;
    try {
      if (rm(l, u, t, e, I)) {
        Ml = 1, pn(l, _t(e, l.current)), k = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw k = u, n;
      Ml = 1, pn(l, _t(e, l.current)), k = null;
      return;
    }
    t.flags & 32768 ? (ll || a === 1 ? l = true : _a || (I & 536870912) !== 0 ? l = false : (me = l = true, (a === 2 || a === 9 || a === 3 || a === 6) && (a = dt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Dr(t, l)) : Cn(t);
  }
  function Cn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Dr(t, me);
        return;
      }
      l = t.return;
      var e = hm(t.alternate, t, Ft);
      if (e !== null) {
        k = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        k = t;
        return;
      }
      k = t = l;
    } while (t !== null);
    Ml === 0 && (Ml = 5);
  }
  function Dr(l, t) {
    do {
      var e = ym(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, k = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        k = l;
        return;
      }
      k = l = e;
    } while (l !== null);
    Ml = 6, k = null;
  }
  function jr(l, t, e, a, u, n, c, i, o) {
    l.cancelPendingCommit = null;
    do
      Rn();
    while (Yl !== 0);
    if ((il & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === l.current) throw Error(s(177));
      if (n = t.lanes | t.childLanes, n |= jc, ed(l, e, n, c, i, o), l === vl && (k = vl = null, I = 0), za = t, ve = l, It = e, Gi = n, Xi = u, pr = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Nm(Hu, function() {
        return Br(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = z.T, z.T = null, u = U.p, U.p = 2, c = il, il |= 4;
        try {
          vm(l, t, e);
        } finally {
          il = c, U.p = u, z.T = a;
        }
      }
      Yl = 1, Ur(), Cr(), Rr();
    }
  }
  function Ur() {
    if (Yl === 1) {
      Yl = 0;
      var l = ve, t = za, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = z.T, z.T = null;
        var a = U.p;
        U.p = 2;
        var u = il;
        il |= 4;
        try {
          dr(t, l);
          var n = tf, c = gs(l.containerInfo), i = n.focusedElem, o = n.selectionRange;
          if (c !== i && i && i.ownerDocument && vs(i.ownerDocument.documentElement, i)) {
            if (o !== null && Ac(i)) {
              var v = o.start, x = o.end;
              if (x === void 0 && (x = v), "selectionStart" in i) i.selectionStart = v, i.selectionEnd = Math.min(x, i.value.length);
              else {
                var E = i.ownerDocument || document, b = E && E.defaultView || window;
                if (b.getSelection) {
                  var _ = b.getSelection(), R = i.textContent.length, Q = Math.min(o.start, R), hl = o.end === void 0 ? Q : Math.min(o.end, R);
                  !_.extend && Q > hl && (c = hl, hl = Q, Q = c);
                  var m = ys(i, Q), r = ys(i, hl);
                  if (m && r && (_.rangeCount !== 1 || _.anchorNode !== m.node || _.anchorOffset !== m.offset || _.focusNode !== r.node || _.focusOffset !== r.offset)) {
                    var y = E.createRange();
                    y.setStart(m.node, m.offset), _.removeAllRanges(), Q > hl ? (_.addRange(y), _.extend(r.node, r.offset)) : (y.setEnd(r.node, r.offset), _.addRange(y));
                  }
                }
              }
            }
            for (E = [], _ = i; _ = _.parentNode; ) _.nodeType === 1 && E.push({ element: _, left: _.scrollLeft, top: _.scrollTop });
            for (typeof i.focus == "function" && i.focus(), i = 0; i < E.length; i++) {
              var T = E[i];
              T.element.scrollLeft = T.left, T.element.scrollTop = T.top;
            }
          }
          Kn = !!lf, tf = lf = null;
        } finally {
          il = u, U.p = a, z.T = e;
        }
      }
      l.current = t, Yl = 2;
    }
  }
  function Cr() {
    if (Yl === 2) {
      Yl = 0;
      var l = ve, t = za, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = z.T, z.T = null;
        var a = U.p;
        U.p = 2;
        var u = il;
        il |= 4;
        try {
          ir(l, t.alternate, t);
        } finally {
          il = u, U.p = a, z.T = e;
        }
      }
      Yl = 3;
    }
  }
  function Rr() {
    if (Yl === 4 || Yl === 3) {
      Yl = 0, J0();
      var l = ve, t = za, e = It, a = pr;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Yl = 5 : (Yl = 0, za = ve = null, Hr(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (ye = null), ic(e), t = t.stateNode, ft && typeof ft.onCommitFiberRoot == "function") try {
        ft.onCommitFiberRoot(Ra, t, void 0, (t.current.flags & 128) === 128);
      } catch {
      }
      if (a !== null) {
        t = z.T, u = U.p, U.p = 2, z.T = null;
        try {
          for (var n = l.onRecoverableError, c = 0; c < a.length; c++) {
            var i = a[c];
            n(i.value, { componentStack: i.stack });
          }
        } finally {
          z.T = t, U.p = u;
        }
      }
      (It & 3) !== 0 && Rn(), Rt(l), u = l.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? l === Qi ? yu++ : (yu = 0, Qi = l) : yu = 0, vu(0);
    }
  }
  function Hr(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, $a(t)));
  }
  function Rn() {
    return Ur(), Cr(), Rr(), Br();
  }
  function Br() {
    if (Yl !== 5) return false;
    var l = ve, t = Gi;
    Gi = 0;
    var e = ic(It), a = z.T, u = U.p;
    try {
      U.p = 32 > e ? 32 : e, z.T = null, e = Xi, Xi = null;
      var n = ve, c = It;
      if (Yl = 0, za = ve = null, It = 0, (il & 6) !== 0) throw Error(s(331));
      var i = il;
      if (il |= 4, gr(n.current), hr(n, n.current, c, e), il = i, vu(0, false), ft && typeof ft.onPostCommitFiberRoot == "function") try {
        ft.onPostCommitFiberRoot(Ra, n);
      } catch {
      }
      return true;
    } finally {
      U.p = u, z.T = a, Hr(l, t);
    }
  }
  function qr(l, t, e) {
    t = _t(e, t), t = Si(l.stateNode, t, 2), l = se(l, t, 2), l !== null && (Ba(l, 2), Rt(l));
  }
  function rl(l, t, e) {
    if (l.tag === 3) qr(l, l, e);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        qr(t, l, e);
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ye === null || !ye.has(a))) {
          l = _t(e, l), e = Yo(2), a = se(t, e, 2), a !== null && (Go(e, a, t, l), Ba(a, 2), Rt(a));
          break;
        }
      }
      t = t.return;
    }
  }
  function Li(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Sm();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (Bi = true, u.add(e), l = Tm.bind(null, l, t, e), t.then(l, l));
  }
  function Tm(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, vl === l && (I & e) === e && (Ml === 4 || Ml === 3 && (I & 62914560) === I && 300 > it() - Mn ? (il & 2) === 0 && Ta(l, 0) : qi |= e, xa === I && (xa = 0)), Rt(l);
  }
  function Yr(l, t) {
    t === 0 && (t = jf()), l = je(l, t), l !== null && (Ba(l, t), Rt(l));
  }
  function Em(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Yr(l, e);
  }
  function Am(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, u = l.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    a !== null && a.delete(t), Yr(l, e);
  }
  function Nm(l, t) {
    return ac(l, t);
  }
  var Hn = null, Aa = null, Vi = false, Bn = false, Ki = false, be = 0;
  function Rt(l) {
    l !== Aa && l.next === null && (Aa === null ? Hn = Aa = l : Aa = Aa.next = l), Bn = true, Vi || (Vi = true, Om());
  }
  function vu(l, t) {
    if (!Ki && Bn) {
      Ki = true;
      do
        for (var e = false, a = Hn; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var c = a.suspendedLanes, i = a.pingedLanes;
              n = (1 << 31 - st(42 | l) + 1) - 1, n &= u & ~(c & ~i), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = true, wr(a, n));
          } else n = I, n = Gu(a, a === vl ? n : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (n & 3) === 0 || Ha(a, n) || (e = true, wr(a, n));
          a = a.next;
        }
      while (e);
      Ki = false;
    }
  }
  function Mm() {
    Gr();
  }
  function Gr() {
    Bn = Vi = false;
    var l = 0;
    be !== 0 && Gm() && (l = be);
    for (var t = it(), e = null, a = Hn; a !== null; ) {
      var u = a.next, n = Xr(a, t);
      n === 0 ? (a.next = null, e === null ? Hn = u : e.next = u, u === null && (Aa = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (Bn = true)), a = u;
    }
    Yl !== 0 && Yl !== 5 || vu(l), be !== 0 && (be = 0);
  }
  function Xr(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var c = 31 - st(n), i = 1 << c, o = u[c];
      o === -1 ? ((i & e) === 0 || (i & a) !== 0) && (u[c] = td(i, t)) : o <= t && (l.expiredLanes |= i), n &= ~i;
    }
    if (t = vl, e = I, e = Gu(l, l === t ? e : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a = l.callbackNode, e === 0 || l === t && (ol === 2 || ol === 9) || l.cancelPendingCommit !== null) return a !== null && a !== null && uc(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || Ha(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && uc(a), ic(e)) {
        case 2:
        case 8:
          e = Of;
          break;
        case 32:
          e = Hu;
          break;
        case 268435456:
          e = Df;
          break;
        default:
          e = Hu;
      }
      return a = Qr.bind(null, l), e = ac(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && uc(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Qr(l, t) {
    if (Yl !== 0 && Yl !== 5) return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (Rn() && l.callbackNode !== e) return null;
    var a = I;
    return a = Gu(l, l === vl ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a === 0 ? null : (xr(l, a, t), Xr(l, it()), l.callbackNode != null && l.callbackNode === e ? Qr.bind(null, l) : null);
  }
  function wr(l, t) {
    if (Rn()) return null;
    xr(l, t, true);
  }
  function Om() {
    Qm(function() {
      (il & 6) !== 0 ? ac(Mf, Mm) : Gr();
    });
  }
  function Ji() {
    if (be === 0) {
      var l = ra;
      l === 0 && (l = Bu, Bu <<= 1, (Bu & 261888) === 0 && (Bu = 256)), be = l;
    }
    return be;
  }
  function Zr(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Zu("" + l);
  }
  function Lr(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Dm(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Zr((u[Il] || null).action), c = a.submitter;
      c && (t = (t = c[Il] || null) ? Zr(t.formAction) : c.getAttribute("formAction"), t !== null && (n = t, c = null));
      var i = new Ju("action", "action", null, a, u);
      l.push({ event: i, listeners: [{ instance: null, listener: function() {
        if (a.defaultPrevented) {
          if (be !== 0) {
            var o = c ? Lr(u, c) : new FormData(u);
            mi(e, { pending: true, data: o, method: u.method, action: n }, null, o);
          }
        } else typeof n == "function" && (i.preventDefault(), o = c ? Lr(u, c) : new FormData(u), mi(e, { pending: true, data: o, method: u.method, action: n }, n, o));
      }, currentTarget: u }] });
    }
  }
  for (var Wi = 0; Wi < Dc.length; Wi++) {
    var ki = Dc[Wi], jm = ki.toLowerCase(), Um = ki[0].toUpperCase() + ki.slice(1);
    Mt(jm, "on" + Um);
  }
  Mt(ps, "onAnimationEnd"), Mt(_s, "onAnimationIteration"), Mt(xs, "onAnimationStart"), Mt("dblclick", "onDoubleClick"), Mt("focusin", "onFocus"), Mt("focusout", "onBlur"), Mt(Wd, "onTransitionRun"), Mt(kd, "onTransitionStart"), Mt($d, "onTransitionCancel"), Mt(zs, "onTransitionEnd"), Fe("onMouseEnter", ["mouseout", "mouseover"]), Fe("onMouseLeave", ["mouseout", "mouseover"]), Fe("onPointerEnter", ["pointerout", "pointerover"]), Fe("onPointerLeave", ["pointerout", "pointerover"]), Ne("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ne("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ne("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ne("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ne("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ne("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var gu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Cm = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gu));
  function Vr(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t) for (var c = a.length - 1; 0 <= c; c--) {
          var i = a[c], o = i.instance, v = i.currentTarget;
          if (i = i.listener, o !== n && u.isPropagationStopped()) break l;
          n = i, u.currentTarget = v;
          try {
            n(u);
          } catch (x) {
            $u(x);
          }
          u.currentTarget = null, n = o;
        }
        else for (c = 0; c < a.length; c++) {
          if (i = a[c], o = i.instance, v = i.currentTarget, i = i.listener, o !== n && u.isPropagationStopped()) break l;
          n = i, u.currentTarget = v;
          try {
            n(u);
          } catch (x) {
            $u(x);
          }
          u.currentTarget = null, n = o;
        }
      }
    }
  }
  function $(l, t) {
    var e = t[fc];
    e === void 0 && (e = t[fc] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Kr(t, l, 2, false), e.add(a));
  }
  function $i(l, t, e) {
    var a = 0;
    t && (a |= 4), Kr(e, l, a, t);
  }
  var qn = "_reactListening" + Math.random().toString(36).slice(2);
  function Fi(l) {
    if (!l[qn]) {
      l[qn] = true, Yf.forEach(function(e) {
        e !== "selectionchange" && (Cm.has(e) || $i(e, false, l), $i(e, true, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[qn] || (t[qn] = true, $i("selectionchange", false, t));
    }
  }
  function Kr(l, t, e, a) {
    switch (_0(t)) {
      case 2:
        var u = ih;
        break;
      case 8:
        u = fh;
        break;
      default:
        u = mf;
    }
    e = u.bind(null, t, e, l), u = void 0, !gc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = true), a ? u !== void 0 ? l.addEventListener(t, e, { capture: true, passive: u }) : l.addEventListener(t, e, true) : u !== void 0 ? l.addEventListener(t, e, { passive: u }) : l.addEventListener(t, e, false);
  }
  function Ii(l, t, e, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null) l: for (; ; ) {
      if (a === null) return;
      var c = a.tag;
      if (c === 3 || c === 4) {
        var i = a.stateNode.containerInfo;
        if (i === u) break;
        if (c === 4) for (c = a.return; c !== null; ) {
          var o = c.tag;
          if ((o === 3 || o === 4) && c.stateNode.containerInfo === u) return;
          c = c.return;
        }
        for (; i !== null; ) {
          if (c = We(i), c === null) return;
          if (o = c.tag, o === 5 || o === 6 || o === 26 || o === 27) {
            a = n = c;
            continue l;
          }
          i = i.parentNode;
        }
      }
      a = a.return;
    }
    $f(function() {
      var v = n, x = yc(e), E = [];
      l: {
        var b = Ts.get(l);
        if (b !== void 0) {
          var _ = Ju, R = l;
          switch (l) {
            case "keypress":
              if (Vu(e) === 0) break l;
            case "keydown":
            case "keyup":
              _ = Ad;
              break;
            case "focusin":
              R = "focus", _ = _c;
              break;
            case "focusout":
              R = "blur", _ = _c;
              break;
            case "beforeblur":
            case "afterblur":
              _ = _c;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              _ = Pf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              _ = hd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              _ = Od;
              break;
            case ps:
            case _s:
            case xs:
              _ = gd;
              break;
            case zs:
              _ = jd;
              break;
            case "scroll":
            case "scrollend":
              _ = dd;
              break;
            case "wheel":
              _ = Cd;
              break;
            case "copy":
            case "cut":
            case "paste":
              _ = Sd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              _ = ts;
              break;
            case "toggle":
            case "beforetoggle":
              _ = Hd;
          }
          var Q = (t & 4) !== 0, hl = !Q && (l === "scroll" || l === "scrollend"), m = Q ? b !== null ? b + "Capture" : null : b;
          Q = [];
          for (var r = v, y; r !== null; ) {
            var T = r;
            if (y = T.stateNode, T = T.tag, T !== 5 && T !== 26 && T !== 27 || y === null || m === null || (T = Ga(r, m), T != null && Q.push(bu(r, T, y))), hl) break;
            r = r.return;
          }
          0 < Q.length && (b = new _(b, R, null, e, x), E.push({ event: b, listeners: Q }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (b = l === "mouseover" || l === "pointerover", _ = l === "mouseout" || l === "pointerout", b && e !== hc && (R = e.relatedTarget || e.fromElement) && (We(R) || R[Je])) break l;
          if ((_ || b) && (b = x.window === x ? x : (b = x.ownerDocument) ? b.defaultView || b.parentWindow : window, _ ? (R = e.relatedTarget || e.toElement, _ = v, R = R ? We(R) : null, R !== null && (hl = D(R), Q = R.tag, R !== hl || Q !== 5 && Q !== 27 && Q !== 6) && (R = null)) : (_ = null, R = v), _ !== R)) {
            if (Q = Pf, T = "onMouseLeave", m = "onMouseEnter", r = "mouse", (l === "pointerout" || l === "pointerover") && (Q = ts, T = "onPointerLeave", m = "onPointerEnter", r = "pointer"), hl = _ == null ? b : Ya(_), y = R == null ? b : Ya(R), b = new Q(T, r + "leave", _, e, x), b.target = hl, b.relatedTarget = y, T = null, We(x) === v && (Q = new Q(m, r + "enter", R, e, x), Q.target = y, Q.relatedTarget = hl, T = Q), hl = T, _ && R) t: {
              for (Q = Rm, m = _, r = R, y = 0, T = m; T; T = Q(T)) y++;
              T = 0;
              for (var Y = r; Y; Y = Q(Y)) T++;
              for (; 0 < y - T; ) m = Q(m), y--;
              for (; 0 < T - y; ) r = Q(r), T--;
              for (; y--; ) {
                if (m === r || r !== null && m === r.alternate) {
                  Q = m;
                  break t;
                }
                m = Q(m), r = Q(r);
              }
              Q = null;
            }
            else Q = null;
            _ !== null && Jr(E, b, _, Q, false), R !== null && hl !== null && Jr(E, hl, R, Q, true);
          }
        }
        l: {
          if (b = v ? Ya(v) : window, _ = b.nodeName && b.nodeName.toLowerCase(), _ === "select" || _ === "input" && b.type === "file") var al = ss;
          else if (is(b)) if (os) al = Vd;
          else {
            al = Zd;
            var H = wd;
          }
          else _ = b.nodeName, !_ || _.toLowerCase() !== "input" || b.type !== "checkbox" && b.type !== "radio" ? v && mc(v.elementType) && (al = ss) : al = Ld;
          if (al && (al = al(l, v))) {
            fs(E, al, e, x);
            break l;
          }
          H && H(l, b, v), l === "focusout" && v && b.type === "number" && v.memoizedProps.value != null && dc(b, "number", b.value);
        }
        switch (H = v ? Ya(v) : window, l) {
          case "focusin":
            (is(H) || H.contentEditable === "true") && (aa = H, Nc = v, Ja = null);
            break;
          case "focusout":
            Ja = Nc = aa = null;
            break;
          case "mousedown":
            Mc = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Mc = false, bs(E, e, x);
            break;
          case "selectionchange":
            if (Jd) break;
          case "keydown":
          case "keyup":
            bs(E, e, x);
        }
        var J;
        if (zc) l: {
          switch (l) {
            case "compositionstart":
              var P = "onCompositionStart";
              break l;
            case "compositionend":
              P = "onCompositionEnd";
              break l;
            case "compositionupdate":
              P = "onCompositionUpdate";
              break l;
          }
          P = void 0;
        }
        else ea ? ns(l, e) && (P = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (P = "onCompositionStart");
        P && (es && e.locale !== "ko" && (ea || P !== "onCompositionStart" ? P === "onCompositionEnd" && ea && (J = Ff()) : (ee = x, bc = "value" in ee ? ee.value : ee.textContent, ea = true)), H = Yn(v, P), 0 < H.length && (P = new ls(P, l, null, e, x), E.push({ event: P, listeners: H }), J ? P.data = J : (J = cs(e), J !== null && (P.data = J)))), (J = qd ? Yd(l, e) : Gd(l, e)) && (P = Yn(v, "onBeforeInput"), 0 < P.length && (H = new ls("onBeforeInput", "beforeinput", null, e, x), E.push({ event: H, listeners: P }), H.data = J)), Dm(E, l, v, e, x);
      }
      Vr(E, t);
    });
  }
  function bu(l, t, e) {
    return { instance: l, listener: t, currentTarget: e };
  }
  function Yn(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = Ga(l, e), u != null && a.unshift(bu(l, u, n)), u = Ga(l, t), u != null && a.push(bu(l, u, n))), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function Rm(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Jr(l, t, e, a, u) {
    for (var n = t._reactName, c = []; e !== null && e !== a; ) {
      var i = e, o = i.alternate, v = i.stateNode;
      if (i = i.tag, o !== null && o === a) break;
      i !== 5 && i !== 26 && i !== 27 || v === null || (o = v, u ? (v = Ga(e, n), v != null && c.unshift(bu(e, v, o))) : u || (v = Ga(e, n), v != null && c.push(bu(e, v, o)))), e = e.return;
    }
    c.length !== 0 && l.push({ event: t, listeners: c });
  }
  var Hm = /\r\n?/g, Bm = /\u0000|\uFFFD/g;
  function Wr(l) {
    return (typeof l == "string" ? l : "" + l).replace(Hm, `
`).replace(Bm, "");
  }
  function kr(l, t) {
    return t = Wr(t), Wr(l) === t;
  }
  function ml(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Pe(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Pe(l, "" + a);
        break;
      case "className":
        Qu(l, "class", a);
        break;
      case "tabIndex":
        Qu(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Qu(l, e, a);
        break;
      case "style":
        Wf(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          Qu(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = Zu("" + a), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(e, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof n == "function" && (e === "formAction" ? (t !== "input" && ml(l, t, "name", u.name, u, null), ml(l, t, "formEncType", u.formEncType, u, null), ml(l, t, "formMethod", u.formMethod, u, null), ml(l, t, "formTarget", u.formTarget, u, null)) : (ml(l, t, "encType", u.encType, u, null), ml(l, t, "method", u.method, u, null), ml(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = Zu("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = qt);
        break;
      case "onScroll":
        a != null && $("scroll", l);
        break;
      case "onScrollEnd":
        a != null && $("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(s(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(s(60));
            l.innerHTML = e;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        e = Zu("" + a), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "" + a) : l.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "") : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === true ? l.setAttribute(e, "") : a !== false && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(e) : l.setAttribute(e, a);
        break;
      case "popover":
        $("beforetoggle", l), $("toggle", l), Xu(l, "popover", a);
        break;
      case "xlinkActuate":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        Bt(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        Bt(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        Bt(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Xu(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = od.get(e) || e, Xu(l, e, a));
    }
  }
  function Pi(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Wf(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(s(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(s(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Pe(l, a) : (typeof a == "number" || typeof a == "bigint") && Pe(l, "" + a);
        break;
      case "onScroll":
        a != null && $("scroll", l);
        break;
      case "onScrollEnd":
        a != null && $("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = qt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Gf.hasOwnProperty(e)) l: {
          if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[Il] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
            typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
            break l;
          }
          e in l ? l[e] = a : a === true ? l.setAttribute(e, "") : Xu(l, e, a);
        }
    }
  }
  function Jl(l, t, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        $("error", l), $("load", l);
        var a = false, u = false, n;
        for (n in e) if (e.hasOwnProperty(n)) {
          var c = e[n];
          if (c != null) switch (n) {
            case "src":
              a = true;
              break;
            case "srcSet":
              u = true;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(s(137, t));
            default:
              ml(l, t, n, c, e, null);
          }
        }
        u && ml(l, t, "srcSet", e.srcSet, e, null), a && ml(l, t, "src", e.src, e, null);
        return;
      case "input":
        $("invalid", l);
        var i = n = c = u = null, o = null, v = null;
        for (a in e) if (e.hasOwnProperty(a)) {
          var x = e[a];
          if (x != null) switch (a) {
            case "name":
              u = x;
              break;
            case "type":
              c = x;
              break;
            case "checked":
              o = x;
              break;
            case "defaultChecked":
              v = x;
              break;
            case "value":
              n = x;
              break;
            case "defaultValue":
              i = x;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (x != null) throw Error(s(137, t));
              break;
            default:
              ml(l, t, a, x, e, null);
          }
        }
        Lf(l, n, i, o, v, c, u, false);
        return;
      case "select":
        $("invalid", l), a = c = n = null;
        for (u in e) if (e.hasOwnProperty(u) && (i = e[u], i != null)) switch (u) {
          case "value":
            n = i;
            break;
          case "defaultValue":
            c = i;
            break;
          case "multiple":
            a = i;
          default:
            ml(l, t, u, i, e, null);
        }
        t = n, e = c, l.multiple = !!a, t != null ? Ie(l, !!a, t, false) : e != null && Ie(l, !!a, e, true);
        return;
      case "textarea":
        $("invalid", l), n = u = a = null;
        for (c in e) if (e.hasOwnProperty(c) && (i = e[c], i != null)) switch (c) {
          case "value":
            a = i;
            break;
          case "defaultValue":
            u = i;
            break;
          case "children":
            n = i;
            break;
          case "dangerouslySetInnerHTML":
            if (i != null) throw Error(s(91));
            break;
          default:
            ml(l, t, c, i, e, null);
        }
        Kf(l, a, u, n);
        return;
      case "option":
        for (o in e) if (e.hasOwnProperty(o) && (a = e[o], a != null)) switch (o) {
          case "selected":
            l.selected = a && typeof a != "function" && typeof a != "symbol";
            break;
          default:
            ml(l, t, o, a, e, null);
        }
        return;
      case "dialog":
        $("beforetoggle", l), $("toggle", l), $("cancel", l), $("close", l);
        break;
      case "iframe":
      case "object":
        $("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < gu.length; a++) $(gu[a], l);
        break;
      case "image":
        $("error", l), $("load", l);
        break;
      case "details":
        $("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        $("error", l), $("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (v in e) if (e.hasOwnProperty(v) && (a = e[v], a != null)) switch (v) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(s(137, t));
          default:
            ml(l, t, v, a, e, null);
        }
        return;
      default:
        if (mc(t)) {
          for (x in e) e.hasOwnProperty(x) && (a = e[x], a !== void 0 && Pi(l, t, x, a, e, void 0));
          return;
        }
    }
    for (i in e) e.hasOwnProperty(i) && (a = e[i], a != null && ml(l, t, i, a, e, null));
  }
  function qm(l, t, e, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, n = null, c = null, i = null, o = null, v = null, x = null;
        for (_ in e) {
          var E = e[_];
          if (e.hasOwnProperty(_) && E != null) switch (_) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              o = E;
            default:
              a.hasOwnProperty(_) || ml(l, t, _, null, a, E);
          }
        }
        for (var b in a) {
          var _ = a[b];
          if (E = e[b], a.hasOwnProperty(b) && (_ != null || E != null)) switch (b) {
            case "type":
              n = _;
              break;
            case "name":
              u = _;
              break;
            case "checked":
              v = _;
              break;
            case "defaultChecked":
              x = _;
              break;
            case "value":
              c = _;
              break;
            case "defaultValue":
              i = _;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (_ != null) throw Error(s(137, t));
              break;
            default:
              _ !== E && ml(l, t, b, _, a, E);
          }
        }
        rc(l, c, i, o, v, x, n, u);
        return;
      case "select":
        _ = c = i = b = null;
        for (n in e) if (o = e[n], e.hasOwnProperty(n) && o != null) switch (n) {
          case "value":
            break;
          case "multiple":
            _ = o;
          default:
            a.hasOwnProperty(n) || ml(l, t, n, null, a, o);
        }
        for (u in a) if (n = a[u], o = e[u], a.hasOwnProperty(u) && (n != null || o != null)) switch (u) {
          case "value":
            b = n;
            break;
          case "defaultValue":
            i = n;
            break;
          case "multiple":
            c = n;
          default:
            n !== o && ml(l, t, u, n, a, o);
        }
        t = i, e = c, a = _, b != null ? Ie(l, !!e, b, false) : !!a != !!e && (t != null ? Ie(l, !!e, t, true) : Ie(l, !!e, e ? [] : "", false));
        return;
      case "textarea":
        _ = b = null;
        for (i in e) if (u = e[i], e.hasOwnProperty(i) && u != null && !a.hasOwnProperty(i)) switch (i) {
          case "value":
            break;
          case "children":
            break;
          default:
            ml(l, t, i, null, a, u);
        }
        for (c in a) if (u = a[c], n = e[c], a.hasOwnProperty(c) && (u != null || n != null)) switch (c) {
          case "value":
            b = u;
            break;
          case "defaultValue":
            _ = u;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (u != null) throw Error(s(91));
            break;
          default:
            u !== n && ml(l, t, c, u, a, n);
        }
        Vf(l, b, _);
        return;
      case "option":
        for (var R in e) if (b = e[R], e.hasOwnProperty(R) && b != null && !a.hasOwnProperty(R)) switch (R) {
          case "selected":
            l.selected = false;
            break;
          default:
            ml(l, t, R, null, a, b);
        }
        for (o in a) if (b = a[o], _ = e[o], a.hasOwnProperty(o) && b !== _ && (b != null || _ != null)) switch (o) {
          case "selected":
            l.selected = b && typeof b != "function" && typeof b != "symbol";
            break;
          default:
            ml(l, t, o, b, a, _);
        }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Q in e) b = e[Q], e.hasOwnProperty(Q) && b != null && !a.hasOwnProperty(Q) && ml(l, t, Q, null, a, b);
        for (v in a) if (b = a[v], _ = e[v], a.hasOwnProperty(v) && b !== _ && (b != null || _ != null)) switch (v) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (b != null) throw Error(s(137, t));
            break;
          default:
            ml(l, t, v, b, a, _);
        }
        return;
      default:
        if (mc(t)) {
          for (var hl in e) b = e[hl], e.hasOwnProperty(hl) && b !== void 0 && !a.hasOwnProperty(hl) && Pi(l, t, hl, void 0, a, b);
          for (x in a) b = a[x], _ = e[x], !a.hasOwnProperty(x) || b === _ || b === void 0 && _ === void 0 || Pi(l, t, x, b, a, _);
          return;
        }
    }
    for (var m in e) b = e[m], e.hasOwnProperty(m) && b != null && !a.hasOwnProperty(m) && ml(l, t, m, null, a, b);
    for (E in a) b = a[E], _ = e[E], !a.hasOwnProperty(E) || b === _ || b == null && _ == null || ml(l, t, E, b, a, _);
  }
  function $r(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  function Ym() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, c = u.initiatorType, i = u.duration;
        if (n && i && $r(c)) {
          for (c = 0, i = u.responseEnd, a += 1; a < e.length; a++) {
            var o = e[a], v = o.startTime;
            if (v > i) break;
            var x = o.transferSize, E = o.initiatorType;
            x && $r(E) && (o = o.responseEnd, c += x * (o < i ? 1 : (i - v) / (o - v)));
          }
          if (--a, t += 8 * (n + c) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var lf = null, tf = null;
  function Gn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Fr(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ir(l, t) {
    if (l === 0) switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function ef(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var af = null;
  function Gm() {
    var l = window.event;
    return l && l.type === "popstate" ? l === af ? false : (af = l, true) : (af = null, false);
  }
  var Pr = typeof setTimeout == "function" ? setTimeout : void 0, Xm = typeof clearTimeout == "function" ? clearTimeout : void 0, l0 = typeof Promise == "function" ? Promise : void 0, Qm = typeof queueMicrotask == "function" ? queueMicrotask : typeof l0 < "u" ? function(l) {
    return l0.resolve(null).then(l).catch(wm);
  } : Pr;
  function wm(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Se(l) {
    return l === "head";
  }
  function t0(l, t) {
    var e = t, a = 0;
    do {
      var u = e.nextSibling;
      if (l.removeChild(e), u && u.nodeType === 8) if (e = u.data, e === "/$" || e === "/&") {
        if (a === 0) {
          l.removeChild(u), Da(t);
          return;
        }
        a--;
      } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&") a++;
      else if (e === "html") Su(l.ownerDocument.documentElement);
      else if (e === "head") {
        e = l.ownerDocument.head, Su(e);
        for (var n = e.firstChild; n; ) {
          var c = n.nextSibling, i = n.nodeName;
          n[qa] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = c;
        }
      } else e === "body" && Su(l.ownerDocument.body);
      e = u;
    } while (e);
    Da(t);
  }
  function e0(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? t ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (t ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8) if (e = a.data, e === "/$") {
        if (l === 0) break;
        l--;
      } else e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || l++;
      e = a;
    } while (e);
  }
  function uf(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          uf(e), sc(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function Zm(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (a) {
        if (!l[qa]) switch (t) {
          case "meta":
            if (!l.hasAttribute("itemprop")) break;
            return l;
          case "link":
            if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence")) break;
            if (n !== u.rel || l.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || l.getAttribute("title") !== (u.title == null ? null : u.title)) break;
            return l;
          case "style":
            if (l.hasAttribute("data-precedence")) break;
            return l;
          case "script":
            if (n = l.getAttribute("src"), (n !== (u.src == null ? null : u.src) || l.getAttribute("type") !== (u.type == null ? null : u.type) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop")) break;
            return l;
          default:
            return l;
        }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n) return l;
      } else return l;
      if (l = At(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Lm(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = At(l.nextSibling), l === null)) return null;
    return l;
  }
  function a0(l, t) {
    for (; l.nodeType !== 8; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = At(l.nextSibling), l === null)) return null;
    return l;
  }
  function nf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function cf(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Vm(l, t) {
    var e = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || e.readyState !== "loading") t();
    else {
      var a = function() {
        t(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function At(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var ff = null;
  function u0(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0) return At(l.nextSibling);
          t--;
        } else e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function n0(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (t === 0) return l;
          t--;
        } else e !== "/$" && e !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function c0(l, t, e) {
    switch (t = Gn(e), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(s(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(s(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(s(454));
        return l;
      default:
        throw Error(s(451));
    }
  }
  function Su(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    sc(l);
  }
  var Nt = /* @__PURE__ */ new Map(), i0 = /* @__PURE__ */ new Set();
  function Xn(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Pt = U.d;
  U.d = { f: Km, r: Jm, D: Wm, C: km, L: $m, m: Fm, X: Pm, S: Im, M: lh };
  function Km() {
    var l = Pt.f(), t = jn();
    return l || t;
  }
  function Jm(l) {
    var t = ke(l);
    t !== null && t.tag === 5 && t.type === "form" ? To(t) : Pt.r(l);
  }
  var Na = typeof document > "u" ? null : document;
  function f0(l, t, e) {
    var a = Na;
    if (a && typeof t == "string" && t) {
      var u = St(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), i0.has(u) || (i0.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), Jl(t, "link", l), Xl(t), a.head.appendChild(t)));
    }
  }
  function Wm(l) {
    Pt.D(l), f0("dns-prefetch", l, null);
  }
  function km(l, t) {
    Pt.C(l, t), f0("preconnect", l, t);
  }
  function $m(l, t, e) {
    Pt.L(l, t, e);
    var a = Na;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + St(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + St(e.imageSrcSet) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + St(e.imageSizes) + '"]')) : u += '[href="' + St(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = Ma(l);
          break;
        case "script":
          n = Oa(l);
      }
      Nt.has(n) || (l = q({ rel: "preload", href: t === "image" && e && e.imageSrcSet ? void 0 : l, as: t }, e), Nt.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(pu(n)) || t === "script" && a.querySelector(_u(n)) || (t = a.createElement("link"), Jl(t, "link", l), Xl(t), a.head.appendChild(t)));
    }
  }
  function Fm(l, t) {
    Pt.m(l, t);
    var e = Na;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + St(a) + '"][href="' + St(l) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Oa(l);
      }
      if (!Nt.has(n) && (l = q({ rel: "modulepreload", href: l }, t), Nt.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(_u(n))) return;
        }
        a = e.createElement("link"), Jl(a, "link", l), Xl(a), e.head.appendChild(a);
      }
    }
  }
  function Im(l, t, e) {
    Pt.S(l, t, e);
    var a = Na;
    if (a && l) {
      var u = $e(a).hoistableStyles, n = Ma(l);
      t = t || "default";
      var c = u.get(n);
      if (!c) {
        var i = { loading: 0, preload: null };
        if (c = a.querySelector(pu(n))) i.loading = 5;
        else {
          l = q({ rel: "stylesheet", href: l, "data-precedence": t }, e), (e = Nt.get(n)) && sf(l, e);
          var o = c = a.createElement("link");
          Xl(o), Jl(o, "link", l), o._p = new Promise(function(v, x) {
            o.onload = v, o.onerror = x;
          }), o.addEventListener("load", function() {
            i.loading |= 1;
          }), o.addEventListener("error", function() {
            i.loading |= 2;
          }), i.loading |= 4, Qn(c, t, a);
        }
        c = { type: "stylesheet", instance: c, count: 1, state: i }, u.set(n, c);
      }
    }
  }
  function Pm(l, t) {
    Pt.X(l, t);
    var e = Na;
    if (e && l) {
      var a = $e(e).hoistableScripts, u = Oa(l), n = a.get(u);
      n || (n = e.querySelector(_u(u)), n || (l = q({ src: l, async: true }, t), (t = Nt.get(u)) && of(l, t), n = e.createElement("script"), Xl(n), Jl(n, "link", l), e.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, a.set(u, n));
    }
  }
  function lh(l, t) {
    Pt.M(l, t);
    var e = Na;
    if (e && l) {
      var a = $e(e).hoistableScripts, u = Oa(l), n = a.get(u);
      n || (n = e.querySelector(_u(u)), n || (l = q({ src: l, async: true, type: "module" }, t), (t = Nt.get(u)) && of(l, t), n = e.createElement("script"), Xl(n), Jl(n, "link", l), e.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, a.set(u, n));
    }
  }
  function s0(l, t, e, a) {
    var u = (u = w.current) ? Xn(u) : null;
    if (!u) throw Error(s(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = Ma(e.href), e = $e(u).hoistableStyles, a = e.get(t), a || (a = { type: "style", instance: null, count: 0, state: null }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = Ma(e.href);
          var n = $e(u).hoistableStyles, c = n.get(l);
          if (c || (u = u.ownerDocument || u, c = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, n.set(l, c), (n = u.querySelector(pu(l))) && !n._p && (c.instance = n, c.state.loading = 5), Nt.has(l) || (e = { rel: "preload", as: "style", href: e.href, crossOrigin: e.crossOrigin, integrity: e.integrity, media: e.media, hrefLang: e.hrefLang, referrerPolicy: e.referrerPolicy }, Nt.set(l, e), n || th(u, l, e, c.state))), t && a === null) throw Error(s(528, ""));
          return c;
        }
        if (t && a !== null) throw Error(s(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Oa(e), e = $e(u).hoistableScripts, a = e.get(t), a || (a = { type: "script", instance: null, count: 0, state: null }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, l));
    }
  }
  function Ma(l) {
    return 'href="' + St(l) + '"';
  }
  function pu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function o0(l) {
    return q({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function th(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Jl(t, "link", e), Xl(t), l.head.appendChild(t));
  }
  function Oa(l) {
    return '[src="' + St(l) + '"]';
  }
  function _u(l) {
    return "script[async]" + l;
  }
  function r0(l, t, e) {
    if (t.count++, t.instance === null) switch (t.type) {
      case "style":
        var a = l.querySelector('style[data-href~="' + St(e.href) + '"]');
        if (a) return t.instance = a, Xl(a), a;
        var u = q({}, e, { "data-href": e.href, "data-precedence": e.precedence, href: null, precedence: null });
        return a = (l.ownerDocument || l).createElement("style"), Xl(a), Jl(a, "style", u), Qn(a, e.precedence, l), t.instance = a;
      case "stylesheet":
        u = Ma(e.href);
        var n = l.querySelector(pu(u));
        if (n) return t.state.loading |= 4, t.instance = n, Xl(n), n;
        a = o0(e), (u = Nt.get(u)) && sf(a, u), n = (l.ownerDocument || l).createElement("link"), Xl(n);
        var c = n;
        return c._p = new Promise(function(i, o) {
          c.onload = i, c.onerror = o;
        }), Jl(n, "link", a), t.state.loading |= 4, Qn(n, e.precedence, l), t.instance = n;
      case "script":
        return n = Oa(e.src), (u = l.querySelector(_u(n))) ? (t.instance = u, Xl(u), u) : (a = e, (u = Nt.get(n)) && (a = q({}, e), of(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Xl(u), Jl(u, "link", a), l.head.appendChild(u), t.instance = u);
      case "void":
        return null;
      default:
        throw Error(s(443, t.type));
    }
    else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Qn(a, e.precedence, l));
    return t.instance;
  }
  function Qn(l, t, e) {
    for (var a = e.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), u = a.length ? a[a.length - 1] : null, n = u, c = 0; c < a.length; c++) {
      var i = a[c];
      if (i.dataset.precedence === t) n = i;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function sf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function of(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var wn = null;
  function d0(l, t, e) {
    if (wn === null) {
      var a = /* @__PURE__ */ new Map(), u = wn = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else u = wn, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[qa] || n[Zl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = n.getAttribute(t) || "";
        c = l + c;
        var i = a.get(c);
        i ? i.push(n) : a.set(c, [n]);
      }
    }
    return a;
  }
  function m0(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(e, t === "title" ? l.querySelector("head > title") : null);
  }
  function eh(l, t, e) {
    if (e === 1 || t.itemProp != null) return false;
    switch (l) {
      case "meta":
      case "title":
        return true;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
        return true;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
        switch (t.rel) {
          case "stylesheet":
            return l = t.disabled, typeof t.precedence == "string" && l == null;
          default:
            return true;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return true;
    }
    return false;
  }
  function h0(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function ah(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== false) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Ma(a.href), n = t.querySelector(pu(u));
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Zn.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, Xl(n);
          return;
        }
        n = t.ownerDocument || t, a = o0(a), (u = Nt.get(u)) && sf(a, u), n = n.createElement("link"), Xl(n);
        var c = n;
        c._p = new Promise(function(i, o) {
          c.onload = i, c.onerror = o;
        }), Jl(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = Zn.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var rf = 0;
  function uh(l, t) {
    return l.stylesheets && l.count === 0 && Vn(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && Vn(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && rf === 0 && (rf = 62500 * Ym());
      var u = setTimeout(function() {
        if (l.waitingForImages = false, l.count === 0 && (l.stylesheets && Vn(l, l.stylesheets), l.unsuspend)) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, (l.imgBytes > rf ? 50 : 800) + t);
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function Zn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Vn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Ln = null;
  function Vn(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Ln = /* @__PURE__ */ new Map(), t.forEach(nh, l), Ln = null, Zn.call(l));
  }
  function nh(l, t) {
    if (!(t.state.loading & 4)) {
      var e = Ln.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Ln.set(l, e);
        for (var u = l.querySelectorAll("link[data-precedence],style[data-precedence]"), n = 0; n < u.length; n++) {
          var c = u[n];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (e.set(c.dataset.precedence, c), a = c);
        }
        a && e.set(null, a);
      }
      u = t.instance, c = u.getAttribute("data-precedence"), n = e.get(c) || a, n === a && e.set(null, u), e.set(c, u), this.count++, a = Zn.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var xu = { $$typeof: _l, Provider: null, Consumer: null, _currentValue: G, _currentValue2: G, _threadCount: 0 };
  function ch(l, t, e, a, u, n, c, i, o) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = nc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = nc(0), this.hiddenUpdates = nc(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = o, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function y0(l, t, e, a, u, n, c, i, o, v, x, E) {
    return l = new ch(l, t, e, c, o, v, x, E, i), t = 1, n === true && (t |= 24), n = rt(3, null, null, t), l.current = n, n.stateNode = l, t = Zc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = { element: a, isDehydrated: e, cache: t }, Jc(n), l;
  }
  function v0(l) {
    return l ? (l = ca, l) : ca;
  }
  function g0(l, t, e, a, u, n) {
    u = v0(u), a.context === null ? a.context = u : a.pendingContext = u, a = fe(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = se(l, a, t), e !== null && (ut(e, l, t), lu(e, l, t));
  }
  function b0(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function df(l, t) {
    b0(l, t), (l = l.alternate) && b0(l, t);
  }
  function S0(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = je(l, 67108864);
      t !== null && ut(t, l, 67108864), df(l, 67108864);
    }
  }
  function p0(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = vt();
      t = cc(t);
      var e = je(l, t);
      e !== null && ut(e, l, t), df(l, t);
    }
  }
  var Kn = true;
  function ih(l, t, e, a) {
    var u = z.T;
    z.T = null;
    var n = U.p;
    try {
      U.p = 2, mf(l, t, e, a);
    } finally {
      U.p = n, z.T = u;
    }
  }
  function fh(l, t, e, a) {
    var u = z.T;
    z.T = null;
    var n = U.p;
    try {
      U.p = 8, mf(l, t, e, a);
    } finally {
      U.p = n, z.T = u;
    }
  }
  function mf(l, t, e, a) {
    if (Kn) {
      var u = hf(a);
      if (u === null) Ii(l, t, a, Jn, e), x0(l, a);
      else if (oh(u, l, t, e, a)) a.stopPropagation();
      else if (x0(l, a), t & 4 && -1 < sh.indexOf(l)) {
        for (; u !== null; ) {
          var n = ke(u);
          if (n !== null) switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var c = Ae(n.pendingLanes);
                if (c !== 0) {
                  var i = n;
                  for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                    var o = 1 << 31 - st(c);
                    i.entanglements[1] |= o, c &= ~o;
                  }
                  Rt(n), (il & 6) === 0 && (On = it() + 500, vu(0));
                }
              }
              break;
            case 31:
            case 13:
              i = je(n, 2), i !== null && ut(i, n, 2), jn(), df(n, 2);
          }
          if (n = hf(a), n === null && Ii(l, t, a, Jn, e), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else Ii(l, t, a, null, e);
    }
  }
  function hf(l) {
    return l = yc(l), yf(l);
  }
  var Jn = null;
  function yf(l) {
    if (Jn = null, l = We(l), l !== null) {
      var t = D(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = C(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = B(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Jn = l, null;
  }
  function _0(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (W0()) {
          case Mf:
            return 2;
          case Of:
            return 8;
          case Hu:
          case k0:
            return 32;
          case Df:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var vf = false, pe = null, _e = null, xe = null, zu = /* @__PURE__ */ new Map(), Tu = /* @__PURE__ */ new Map(), ze = [], sh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function x0(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        pe = null;
        break;
      case "dragenter":
      case "dragleave":
        _e = null;
        break;
      case "mouseover":
      case "mouseout":
        xe = null;
        break;
      case "pointerover":
      case "pointerout":
        zu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Tu.delete(t.pointerId);
    }
  }
  function Eu(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n ? (l = { blockedOn: t, domEventName: e, eventSystemFlags: a, nativeEvent: n, targetContainers: [u] }, t !== null && (t = ke(t), t !== null && S0(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function oh(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return pe = Eu(pe, l, t, e, a, u), true;
      case "dragenter":
        return _e = Eu(_e, l, t, e, a, u), true;
      case "mouseover":
        return xe = Eu(xe, l, t, e, a, u), true;
      case "pointerover":
        var n = u.pointerId;
        return zu.set(n, Eu(zu.get(n) || null, l, t, e, a, u)), true;
      case "gotpointercapture":
        return n = u.pointerId, Tu.set(n, Eu(Tu.get(n) || null, l, t, e, a, u)), true;
    }
    return false;
  }
  function z0(l) {
    var t = We(l.target);
    if (t !== null) {
      var e = D(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = C(e), t !== null) {
            l.blockedOn = t, Bf(l.priority, function() {
              p0(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = B(e), t !== null) {
            l.blockedOn = t, Bf(l.priority, function() {
              p0(e);
            });
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Wn(l) {
    if (l.blockedOn !== null) return false;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = hf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(e.type, e);
        hc = a, e.target.dispatchEvent(a), hc = null;
      } else return t = ke(e), t !== null && S0(t), l.blockedOn = e, false;
      t.shift();
    }
    return true;
  }
  function T0(l, t, e) {
    Wn(l) && e.delete(t);
  }
  function rh() {
    vf = false, pe !== null && Wn(pe) && (pe = null), _e !== null && Wn(_e) && (_e = null), xe !== null && Wn(xe) && (xe = null), zu.forEach(T0), Tu.forEach(T0);
  }
  function kn(l, t) {
    l.blockedOn === t && (l.blockedOn = null, vf || (vf = true, f.unstable_scheduleCallback(f.unstable_NormalPriority, rh)));
  }
  var $n = null;
  function E0(l) {
    $n !== l && ($n = l, f.unstable_scheduleCallback(f.unstable_NormalPriority, function() {
      $n === l && ($n = null);
      for (var t = 0; t < l.length; t += 3) {
        var e = l[t], a = l[t + 1], u = l[t + 2];
        if (typeof a != "function") {
          if (yf(a || e) === null) continue;
          break;
        }
        var n = ke(e);
        n !== null && (l.splice(t, 3), t -= 3, mi(n, { pending: true, data: u, method: e.method, action: a }, a, u));
      }
    }));
  }
  function Da(l) {
    function t(o) {
      return kn(o, l);
    }
    pe !== null && kn(pe, l), _e !== null && kn(_e, l), xe !== null && kn(xe, l), zu.forEach(t), Tu.forEach(t);
    for (var e = 0; e < ze.length; e++) {
      var a = ze[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < ze.length && (e = ze[0], e.blockedOn === null); ) z0(e), e.blockedOn === null && ze.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null) for (a = 0; a < e.length; a += 3) {
      var u = e[a], n = e[a + 1], c = u[Il] || null;
      if (typeof n == "function") c || E0(e);
      else if (c) {
        var i = null;
        if (n && n.hasAttribute("formAction")) {
          if (u = n, c = n[Il] || null) i = c.formAction;
          else if (yf(u) !== null) continue;
        } else i = c.action;
        typeof i == "function" ? e[a + 1] = i : (e.splice(a, 3), a -= 3), E0(e);
      }
    }
  }
  function A0() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({ handler: function() {
        return new Promise(function(c) {
          return u = c;
        });
      }, focusReset: "manual", scroll: "manual" });
    }
    function t() {
      u !== null && (u(), u = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, { state: n.getState(), info: "react-transition", history: "replace" });
      }
    }
    if (typeof navigation == "object") {
      var a = false, u = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(e, 100), function() {
        a = true, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function gf(l) {
    this._internalRoot = l;
  }
  Fn.prototype.render = gf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var e = t.current, a = vt();
    g0(e, a, l, t, null, null);
  }, Fn.prototype.unmount = gf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      g0(l.current, 2, null, l, null, null), jn(), t[Je] = null;
    }
  };
  function Fn(l) {
    this._internalRoot = l;
  }
  Fn.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Hf();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < ze.length && t !== 0 && t < ze[e].priority; e++) ;
      ze.splice(e, 0, l), e === 0 && z0(l);
    }
  };
  var N0 = h.version;
  if (N0 !== "19.2.0") throw Error(s(527, N0, "19.2.0"));
  U.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0) throw typeof l.render == "function" ? Error(s(188)) : (l = Object.keys(l).join(","), Error(s(268, l)));
    return l = p(t), l = l !== null ? Z(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var dh = { bundleType: 0, version: "19.2.0", rendererPackageName: "react-dom", currentDispatcherRef: z, reconcilerVersion: "19.2.0" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var In = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!In.isDisabled && In.supportsFiber) try {
      Ra = In.inject(dh), ft = In;
    } catch {
    }
  }
  return Nu.createRoot = function(l, t) {
    if (!N(l)) throw Error(s(299));
    var e = false, a = "", u = Ro, n = Ho, c = Bo;
    return t != null && (t.unstable_strictMode === true && (e = true), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = y0(l, 1, false, null, null, e, a, null, u, n, c, A0), l[Je] = t.current, Fi(l), new gf(t);
  }, Nu.hydrateRoot = function(l, t, e) {
    if (!N(l)) throw Error(s(299));
    var a = false, u = "", n = Ro, c = Ho, i = Bo, o = null;
    return e != null && (e.unstable_strictMode === true && (a = true), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError), e.formState !== void 0 && (o = e.formState)), t = y0(l, 1, true, t, e ?? null, a, u, o, n, c, i, A0), t.context = v0(null), e = t.current, a = vt(), a = cc(a), u = fe(a), u.callback = null, se(e, u, a), e = a, t.current.lanes = e, Ba(t, e), Rt(t), l[Je] = t.current, Fi(l), new Fn(t);
  }, Nu.version = "19.2.0", Nu;
}
var q0;
function xh() {
  if (q0) return pf.exports;
  q0 = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
    } catch (h) {
      console.error(h);
    }
  }
  return f(), pf.exports = _h(), pf.exports;
}
var zh = xh();
let El, Ou = null;
function ju() {
  return (Ou === null || Ou.byteLength === 0) && (Ou = new Uint8Array(El.memory.buffer)), Ou;
}
let lc = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
lc.decode();
const Th = 2146435072;
let Tf = 0;
function Eh(f, h) {
  return Tf += h, Tf >= Th && (lc = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), lc.decode(), Tf = h), lc.decode(ju().subarray(f, f + h));
}
function Pn(f, h) {
  return f = f >>> 0, Eh(f, h);
}
let Cu = 0;
const Uu = new TextEncoder();
"encodeInto" in Uu || (Uu.encodeInto = function(f, h) {
  const S = Uu.encode(f);
  return h.set(S), { read: f.length, written: S.length };
});
function Af(f, h, S) {
  if (S === void 0) {
    const B = Uu.encode(f), O = h(B.length, 1) >>> 0;
    return ju().subarray(O, O + B.length).set(B), Cu = B.length, O;
  }
  let s = f.length, N = h(s, 1) >>> 0;
  const D = ju();
  let C = 0;
  for (; C < s; C++) {
    const B = f.charCodeAt(C);
    if (B > 127) break;
    D[N + C] = B;
  }
  if (C !== s) {
    C !== 0 && (f = f.slice(C)), N = S(N, s, s = C + f.length * 3, 1) >>> 0;
    const B = ju().subarray(N + C, N + s), O = Uu.encodeInto(f, B);
    C += O.written, N = S(N, s, C, 1) >>> 0;
  }
  return Cu = C, N;
}
let Le = null;
function Y0() {
  return (Le === null || Le.buffer.detached === true || Le.buffer.detached === void 0 && Le.buffer !== El.memory.buffer) && (Le = new DataView(El.memory.buffer)), Le;
}
function Du(f) {
  const h = El.__externref_table_alloc();
  return El.__wbindgen_externrefs.set(h, f), h;
}
function Mu(f, h) {
  try {
    return f.apply(this, h);
  } catch (S) {
    const s = Du(S);
    El.__wbindgen_exn_store(s);
  }
}
function G0(f, h) {
  return f = f >>> 0, ju().subarray(f / 1, f / 1 + h);
}
function ja(f) {
  return f == null;
}
const X0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((f) => f.dtor(f.a, f.b));
function Ah(f, h, S, s) {
  const N = { a: f, b: h, cnt: 1, dtor: S }, D = (...C) => {
    N.cnt++;
    const B = N.a;
    N.a = 0;
    try {
      return s(B, N.b, ...C);
    } finally {
      N.a = B, D._wbg_cb_unref();
    }
  };
  return D._wbg_cb_unref = () => {
    --N.cnt === 0 && (N.dtor(N.a, N.b), N.a = 0, X0.unregister(N));
  }, X0.register(D, N, N), D;
}
function Nh(f, h, S) {
  const s = Af(f, El.__wbindgen_malloc, El.__wbindgen_realloc), N = Cu;
  return El.evaluate_multiple(s, N, h, !ja(S), ja(S) ? BigInt(0) : S);
}
function Mh() {
  return El.get_available_generators();
}
function Oh(f, h) {
  const S = Af(f, El.__wbindgen_malloc, El.__wbindgen_realloc), s = Cu;
  return El.evaluate_perchance_with_trace(S, s, h);
}
function Dh(f, h, S) {
  El.wasm_bindgen__convert__closures_____invoke__h8a58c05785379efb(f, h, S);
}
function jh(f, h, S, s) {
  El.wasm_bindgen__convert__closures_____invoke__h680168a7fee85f03(f, h, S, s);
}
const Uh = /* @__PURE__ */ new Set(["basic", "cors", "default"]);
async function Ch(f, h) {
  if (typeof Response == "function" && f instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function") try {
      return await WebAssembly.instantiateStreaming(f, h);
    } catch (s) {
      if (f.ok && Uh.has(f.type) && f.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", s);
      else throw s;
    }
    const S = await f.arrayBuffer();
    return await WebAssembly.instantiate(S, h);
  } else {
    const S = await WebAssembly.instantiate(f, h);
    return S instanceof WebAssembly.Instance ? { instance: S, module: f } : S;
  }
}
function Rh() {
  const f = {};
  return f.wbg = {}, f.wbg.__wbg_Error_e83987f665cf5504 = function(h, S) {
    return Error(Pn(h, S));
  }, f.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(h, S) {
    const s = String(S), N = Af(s, El.__wbindgen_malloc, El.__wbindgen_realloc), D = Cu;
    Y0().setInt32(h + 4, D, true), Y0().setInt32(h + 0, N, true);
  }, f.wbg.__wbg___wbindgen_is_function_ee8a6c5833c90377 = function(h) {
    return typeof h == "function";
  }, f.wbg.__wbg___wbindgen_is_object_c818261d21f283a4 = function(h) {
    const S = h;
    return typeof S == "object" && S !== null;
  }, f.wbg.__wbg___wbindgen_is_string_fbb76cb2940daafd = function(h) {
    return typeof h == "string";
  }, f.wbg.__wbg___wbindgen_is_undefined_2d472862bd29a478 = function(h) {
    return h === void 0;
  }, f.wbg.__wbg___wbindgen_throw_b855445ff6a94295 = function(h, S) {
    throw new Error(Pn(h, S));
  }, f.wbg.__wbg__wbg_cb_unref_2454a539ea5790d9 = function(h) {
    h._wbg_cb_unref();
  }, f.wbg.__wbg_call_525440f72fbfc0ea = function() {
    return Mu(function(h, S, s) {
      return h.call(S, s);
    }, arguments);
  }, f.wbg.__wbg_call_e762c39fa8ea36bf = function() {
    return Mu(function(h, S) {
      return h.call(S);
    }, arguments);
  }, f.wbg.__wbg_crypto_574e78ad8b13b65f = function(h) {
    return h.crypto;
  }, f.wbg.__wbg_getRandomValues_b8f5dbd5f3995a9e = function() {
    return Mu(function(h, S) {
      h.getRandomValues(S);
    }, arguments);
  }, f.wbg.__wbg_length_69bca3cb64fc8748 = function(h) {
    return h.length;
  }, f.wbg.__wbg_msCrypto_a61aeb35a24c1329 = function(h) {
    return h.msCrypto;
  }, f.wbg.__wbg_new_1acc0b6eea89d040 = function() {
    return new Object();
  }, f.wbg.__wbg_new_3c3d849046688a66 = function(h, S) {
    try {
      var s = { a: h, b: S }, N = (C, B) => {
        const O = s.a;
        s.a = 0;
        try {
          return jh(O, s.b, C, B);
        } finally {
          s.a = O;
        }
      };
      return new Promise(N);
    } finally {
      s.a = s.b = 0;
    }
  }, f.wbg.__wbg_new_e17d9f43105b08be = function() {
    return new Array();
  }, f.wbg.__wbg_new_no_args_ee98eee5275000a4 = function(h, S) {
    return new Function(Pn(h, S));
  }, f.wbg.__wbg_new_with_length_01aa0dc35aa13543 = function(h) {
    return new Uint8Array(h >>> 0);
  }, f.wbg.__wbg_node_905d3e251edff8a2 = function(h) {
    return h.node;
  }, f.wbg.__wbg_process_dc0fbacc7c1c06f7 = function(h) {
    return h.process;
  }, f.wbg.__wbg_prototypesetcall_2a6620b6922694b2 = function(h, S, s) {
    Uint8Array.prototype.set.call(G0(h, S), s);
  }, f.wbg.__wbg_queueMicrotask_34d692c25c47d05b = function(h) {
    return h.queueMicrotask;
  }, f.wbg.__wbg_queueMicrotask_9d76cacb20c84d58 = function(h) {
    queueMicrotask(h);
  }, f.wbg.__wbg_randomFillSync_ac0988aba3254290 = function() {
    return Mu(function(h, S) {
      h.randomFillSync(S);
    }, arguments);
  }, f.wbg.__wbg_require_60cc747a6bc5215a = function() {
    return Mu(function() {
      return module.require;
    }, arguments);
  }, f.wbg.__wbg_resolve_caf97c30b83f7053 = function(h) {
    return Promise.resolve(h);
  }, f.wbg.__wbg_set_3f1d0b984ed272ed = function(h, S, s) {
    h[S] = s;
  }, f.wbg.__wbg_set_c213c871859d6500 = function(h, S, s) {
    h[S >>> 0] = s;
  }, f.wbg.__wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e = function() {
    const h = typeof global > "u" ? null : global;
    return ja(h) ? 0 : Du(h);
  }, f.wbg.__wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac = function() {
    const h = typeof globalThis > "u" ? null : globalThis;
    return ja(h) ? 0 : Du(h);
  }, f.wbg.__wbg_static_accessor_SELF_6fdf4b64710cc91b = function() {
    const h = typeof self > "u" ? null : self;
    return ja(h) ? 0 : Du(h);
  }, f.wbg.__wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2 = function() {
    const h = typeof window > "u" ? null : window;
    return ja(h) ? 0 : Du(h);
  }, f.wbg.__wbg_subarray_480600f3d6a9f26c = function(h, S, s) {
    return h.subarray(S >>> 0, s >>> 0);
  }, f.wbg.__wbg_then_4f46f6544e6b4a28 = function(h, S) {
    return h.then(S);
  }, f.wbg.__wbg_versions_c01dfd4722a88165 = function(h) {
    return h.versions;
  }, f.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(h, S) {
    return Pn(h, S);
  }, f.wbg.__wbindgen_cast_386725c5b2a3b665 = function(h, S) {
    return Ah(h, S, El.wasm_bindgen__closure__destroy__h032a9fb1222a415c, Dh);
  }, f.wbg.__wbindgen_cast_4625c577ab2ec9ee = function(h) {
    return BigInt.asUintN(64, h);
  }, f.wbg.__wbindgen_cast_cb9088102bce6b30 = function(h, S) {
    return G0(h, S);
  }, f.wbg.__wbindgen_cast_d6cd19b81560fd6e = function(h) {
    return h;
  }, f.wbg.__wbindgen_init_externref_table = function() {
    const h = El.__wbindgen_externrefs, S = h.grow(4);
    h.set(0, void 0), h.set(S + 0, void 0), h.set(S + 1, null), h.set(S + 2, true), h.set(S + 3, false);
  }, f;
}
function Hh(f, h) {
  return El = f.exports, Z0.__wbindgen_wasm_module = h, Le = null, Ou = null, El.__wbindgen_start(), El;
}
async function Z0(f) {
  if (El !== void 0) return El;
  typeof f < "u" && (Object.getPrototypeOf(f) === Object.prototype ? { module_or_path: f } = f : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof f > "u" && (f = new URL("" + new URL("perchance_wasm_bg-Dkw6UDIq.wasm", import.meta.url).href, import.meta.url));
  const h = Rh();
  (typeof f == "string" || typeof Request == "function" && f instanceof Request || typeof URL == "function" && f instanceof URL) && (f = fetch(f));
  const { instance: S, module: s } = await Ch(await f, h);
  return Hh(S, s);
}
function Bh({ items: f, position: h, selectedIndex: S, onSelect: s, onClose: N, onNavigate: D }) {
  const C = F.useRef(null), B = F.useRef(null);
  return F.useEffect(() => {
    B.current && B.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [S]), F.useEffect(() => {
    const O = (p) => {
      p.key === "ArrowDown" ? (p.preventDefault(), D("down")) : p.key === "ArrowUp" ? (p.preventDefault(), D("up")) : p.key === "Enter" ? (p.preventDefault(), f[S] && s(f[S])) : p.key === "Escape" && (p.preventDefault(), N());
    };
    return document.addEventListener("keydown", O), () => document.removeEventListener("keydown", O);
  }, [f, S, s, N, D]), f.length === 0 ? null : g.jsxs("div", { ref: C, className: "absolute z-50 bg-slate-800 border border-purple-500/50 rounded-lg shadow-2xl overflow-hidden", style: { top: `${h.top}px`, left: `${h.left}px`, maxHeight: "300px", width: "280px" }, children: [g.jsxs("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 flex items-center justify-between", children: [g.jsxs("span", { className: "text-xs font-semibold text-white", children: ["Import Generator (", f.length, ")"] }), g.jsx("span", { className: "text-xs text-purple-200", children: "\u2191\u2193 navigate \u2022 \u23CE select \u2022 esc close" })] }), g.jsx("div", { className: "overflow-y-auto max-h-[250px]", children: f.map((O, p) => g.jsx("div", { ref: p === S ? B : null, onClick: () => s(O), onMouseEnter: () => D("down"), className: `px-4 py-2 cursor-pointer transition-colors ${p === S ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-slate-700"}`, children: g.jsx("div", { className: "font-mono text-sm", children: O }) }, O)) })] });
}
const Q0 = { 30: "#000000", 31: "#ef4444", 32: "#22c55e", 33: "#eab308", 34: "#3b82f6", 35: "#a855f7", 36: "#06b6d4", 37: "#f3f4f6", 90: "#6b7280", 91: "#f87171", 92: "#86efac", 93: "#fde047", 94: "#93c5fd", 95: "#d8b4fe", 96: "#67e8f9", 97: "#ffffff" }, w0 = { 40: "#000000", 41: "#7f1d1d", 42: "#14532d", 43: "#713f12", 44: "#1e3a8a", 45: "#581c87", 46: "#164e63", 47: "#1f2937", 100: "#374151", 101: "#991b1b", 102: "#166534", 103: "#854d0e", 104: "#1e40af", 105: "#6b21a8", 106: "#155e75", 107: "#4b5563" };
function qh(f) {
  const h = [], S = /\x1b\[([0-9;]+)m/g;
  let s = false, N, D, C = 0, B;
  for (; (B = S.exec(f)) !== null; ) {
    if (B.index > C) {
      const p = f.substring(C, B.index);
      p && h.push({ text: p, bold: s, fgColor: N, bgColor: D });
    }
    const O = B[1].split(";").map(Number);
    for (const p of O) p === 0 ? (s = false, N = void 0, D = void 0) : p === 1 ? s = true : p === 22 ? s = false : p >= 30 && p <= 37 || p >= 90 && p <= 97 ? N = Q0[p] : p >= 40 && p <= 47 || p >= 100 && p <= 107 ? D = w0[p] : p === 38 ? N = "#ffffff" : p === 48 && (D = "#000000");
    C = B.index + B[0].length;
  }
  if (C < f.length) {
    const O = f.substring(C);
    O && h.push({ text: O, bold: s, fgColor: N, bgColor: D });
  }
  return h;
}
function Yh({ text: f, className: h = "" }) {
  const S = F.useMemo(() => qh(f), [f]);
  return g.jsx("pre", { className: h, children: S.map((s, N) => {
    const D = {};
    return s.fgColor && (D.color = s.fgColor), s.bgColor && (D.backgroundColor = s.bgColor), s.bold && (D.fontWeight = "bold"), g.jsx("span", { style: D, children: s.text }, N);
  }) });
}
function Gh({ node: f, onHover: h, onClick: S, isHovered: s, isSelected: N }) {
  const C = ((O) => {
    switch (O) {
      case "root":
        return "bg-purple-900/40";
      case "listselect":
        return "bg-blue-900/40";
      case "import":
        return "bg-green-900/40";
      case "range":
        return "bg-yellow-900/40";
      case "choice":
        return "bg-pink-900/40";
      case "methodcall":
        return "bg-cyan-900/40";
      default:
        return "bg-slate-800/40";
    }
  })(f.operation_type), B = N ? "ring-2 ring-yellow-400" : s ? "ring-2 ring-purple-500" : "";
  return g.jsx("div", { className: `border border-slate-700/50 rounded ${C} ${B} p-1.5 cursor-pointer`, onMouseEnter: () => h(f), onMouseLeave: () => h(null), onClick: () => S(f), children: g.jsxs("div", { className: "flex items-center gap-1.5 text-xs flex-wrap", children: [g.jsx("div", { className: "text-gray-200 bg-slate-900/50 px-2 py-0.5 rounded font-mono text-[11px]", children: f.result || g.jsx("span", { className: "text-gray-600 italic", children: "(empty)" }) }), g.jsx("span", { className: "text-gray-600 text-[10px]", children: "\u2190" }), g.jsx("code", { className: "text-blue-300 font-semibold text-[11px]", children: f.operation }), f.operation_type && g.jsx("span", { className: "text-[9px] px-1 py-0.5 bg-slate-900/50 rounded text-gray-500", children: f.operation_type }), f.available_items && f.available_items.length > 0 && g.jsx("div", { className: "flex gap-1 overflow-x-auto", children: f.available_items.map((O, p) => g.jsxs("div", { className: `flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] ${p === f.selected_index ? "bg-purple-600/50 border border-purple-500 text-white font-bold" : "bg-slate-700/30 border border-slate-600/30 text-gray-500"}`, title: O, children: [p, ":", O] }, p)) }), f.span && g.jsxs("span", { className: "text-[9px] text-gray-600", children: [f.span.start, "-", f.span.end] })] }) });
}
function Xh({ node: f, onHover: h, onClick: S, hoveredNode: s, selectedNode: N }) {
  const [D, C] = F.useState(1), [B, O] = F.useState({ x: 0, y: 0 }), [p, Z] = F.useState(false), [q, tl] = F.useState({ x: 0, y: 0 }), yl = F.useRef(null), gl = F.useRef(null), nl = (el) => {
    el.preventDefault();
    const bl = el.deltaY > 0 ? 0.9 : 1.1;
    C((L) => Math.max(0.1, Math.min(3, L * bl)));
  }, ql = (el) => {
    el.button === 0 && (Z(true), tl({ x: el.clientX - B.x, y: el.clientY - B.y }));
  }, wl = (el) => {
    p && O({ x: el.clientX - q.x, y: el.clientY - q.y });
  }, nt = () => {
    Z(false);
  }, [_l, Wl] = F.useState(/* @__PURE__ */ new Map());
  return F.useEffect(() => {
    if (gl.current) {
      const el = /* @__PURE__ */ new Map(), bl = (xl, Gl) => {
        const Al = xl.getBoundingClientRect(), cl = gl.current.getBoundingClientRect();
        el.set(Gl, { x: (Al.left - cl.left) / D, y: (Al.top - cl.top) / D, width: Al.width / D, height: Al.height / D });
      }, L = (xl, Gl) => {
        if (xl.hasAttribute("data-node-id") && bl(xl, Gl), Gl.children) {
          const Al = xl.querySelector("[data-children]");
          Al && Array.from(Al.children).forEach((cl, Fl) => {
            Fl < Gl.children.length && L(cl, Gl.children[Fl]);
          });
        }
      }, Ol = gl.current.querySelector("[data-node-id]");
      Ol && L(Ol, f), Wl(el);
    }
  }, [f, D]), g.jsxs("div", { ref: yl, className: "relative w-full h-full overflow-hidden", onWheel: nl, onMouseDown: ql, onMouseMove: wl, onMouseUp: nt, onMouseLeave: nt, style: { cursor: p ? "grabbing" : "grab" }, children: [g.jsxs("div", { className: "absolute top-2 right-2 z-10 flex gap-1", children: [g.jsx("button", { onClick: () => C((el) => Math.min(3, el * 1.2)), className: "bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded text-xs", children: "+" }), g.jsx("button", { onClick: () => C((el) => Math.max(0.1, el / 1.2)), className: "bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded text-xs", children: "\u2212" }), g.jsx("button", { onClick: () => {
    C(1), O({ x: 0, y: 0 });
  }, className: "bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded text-xs", children: "Reset" })] }), g.jsxs("div", { ref: gl, style: { transform: `translate(${B.x}px, ${B.y}px) scale(${D})`, transformOrigin: "0 0", transition: p ? "none" : "transform 0.1s" }, className: "p-4", children: [g.jsxs("svg", { className: "absolute top-0 left-0 pointer-events-none", style: { width: "100%", height: "100%", overflow: "visible" }, children: [Array.from(_l.entries()).map(([el, bl]) => {
    var _a;
    return (_a = el.children) == null ? void 0 : _a.map((L, Ol) => {
      const xl = _l.get(L);
      if (!xl) return null;
      const Gl = bl.x + bl.width / 2, Al = bl.y + bl.height, cl = xl.x + xl.width / 2, Fl = xl.y;
      return g.jsx("g", { children: g.jsx("line", { x1: Gl, y1: Al, x2: cl, y2: Fl, stroke: "#64748b", strokeWidth: "1.5", markerEnd: "url(#arrowhead)" }) }, `${el.operation}-${Ol}`);
    });
  }), g.jsx("defs", { children: g.jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "10", refX: "5", refY: "5", orient: "auto", children: g.jsx("polygon", { points: "0 0, 10 5, 0 10", fill: "#64748b" }) }) })] }), g.jsx(L0, { node: f, onHover: h, onClick: S, hoveredNode: s, selectedNode: N })] })] });
}
function L0({ node: f, onHover: h, onClick: S, hoveredNode: s, selectedNode: N }) {
  const [D, C] = F.useState(true), B = f.children && f.children.length > 0;
  return g.jsxs("div", { className: "flex flex-col items-center gap-2", "data-node-id": true, children: [g.jsxs("div", { className: "flex flex-col items-center", children: [g.jsx(Gh, { node: f, onHover: h, onClick: S, isHovered: s === f, isSelected: N === f }), B && g.jsx("button", { onClick: () => C(!D), className: "text-gray-500 hover:text-gray-300 text-[10px] mt-0.5", children: D ? "\u25BC" : "\u25B6" })] }), D && B && g.jsx("div", { className: "flex gap-3 items-start flex-wrap justify-center", "data-children": true, children: f.children.map((O, p) => g.jsx(L0, { node: O, onHover: h, onClick: S, hoveredNode: s, selectedNode: N }, p)) })] });
}
function V0({ node: f, depth: h, onHover: S, onClick: s, hoveredNode: N, selectedNode: D }) {
  const [C, B] = F.useState(true), O = f.children && f.children.length > 0, p = N === f, Z = D === f, tl = ((nl) => {
    switch (nl) {
      case "root":
        return "bg-purple-900/40";
      case "listselect":
        return "bg-blue-900/40";
      case "import":
        return "bg-green-900/40";
      case "range":
        return "bg-yellow-900/40";
      case "choice":
        return "bg-pink-900/40";
      case "methodcall":
        return "bg-cyan-900/40";
      default:
        return "bg-slate-800/40";
    }
  })(f.operation_type), yl = Z ? "ring-2 ring-yellow-400" : p ? "ring-2 ring-purple-500" : "", gl = `${h * 1.5}rem`;
  return g.jsxs(g.Fragment, { children: [g.jsx("div", { className: `border-b border-slate-700/50 ${tl} ${yl} cursor-pointer`, onMouseEnter: () => S(f), onMouseLeave: () => S(null), onClick: () => s(f), style: { paddingLeft: gl }, children: g.jsxs("div", { className: "px-2 py-1 flex items-center gap-2 text-xs", children: [O && g.jsx("button", { onClick: (nl) => {
    nl.stopPropagation(), B(!C);
  }, className: "text-gray-500 hover:text-gray-300 w-4 text-center", children: C ? "\u25BC" : "\u25B6" }), !O && g.jsx("span", { className: "w-4" }), g.jsx("div", { className: "text-gray-200 bg-slate-900/50 px-2 py-0.5 rounded font-mono text-[11px]", children: f.result || g.jsx("span", { className: "text-gray-600 italic", children: "(empty)" }) }), g.jsx("span", { className: "text-gray-600 text-[10px]", children: "\u2190" }), g.jsx("code", { className: "text-blue-300 font-semibold", children: f.operation }), f.operation_type && g.jsx("span", { className: "text-[9px] px-1 py-0.5 bg-slate-900/50 rounded text-gray-500", children: f.operation_type }), f.available_items && f.available_items.length > 0 && g.jsx("div", { className: "flex gap-1 overflow-x-auto", children: f.available_items.map((nl, ql) => g.jsxs("div", { className: `flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] ${ql === f.selected_index ? "bg-purple-600/50 border border-purple-500 text-white font-bold" : "bg-slate-700/30 border border-slate-600/30 text-gray-500"}`, title: nl, children: [ql, ":", nl] }, ql)) }), f.span && g.jsxs("span", { className: "text-[9px] text-gray-600", children: [f.span.start, "-", f.span.end] })] }) }), C && O && f.children.map((nl, ql) => g.jsx(V0, { node: nl, depth: h + 1, onHover: S, onClick: s, hoveredNode: N, selectedNode: D }, ql))] });
}
function Qh({ node: f }) {
  if (!f) return g.jsx("div", { className: "h-full flex items-center justify-center text-gray-500 text-sm", children: "Hover or click a trace node to see its source" });
  const S = ((N) => N.source_template ? { template: N.source_template, name: N.generator_name || "unknown" } : null)(f);
  if (!S) return g.jsx("div", { className: "h-full flex items-center justify-center text-gray-500 text-sm", children: "No source available for this node" });
  const s = () => {
    const { template: N } = S, { span: D } = f;
    if (!D || D.start === D.end) return g.jsx("pre", { className: "text-xs text-gray-300 font-mono whitespace-pre-wrap", children: N });
    const C = N.substring(0, D.start), B = N.substring(D.start, D.end), O = N.substring(D.end);
    return g.jsxs("pre", { className: "text-xs font-mono leading-relaxed whitespace-pre-wrap", children: [g.jsx("span", { className: "text-gray-400", children: C }), g.jsx("span", { className: "bg-yellow-500/30 text-yellow-200 font-bold px-0.5", children: B }), g.jsx("span", { className: "text-gray-400", children: O })] });
  };
  return g.jsxs("div", { className: "h-full flex flex-col", children: [g.jsxs("div", { className: "px-3 py-1.5 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between flex-shrink-0", children: [g.jsx("span", { className: "text-xs font-semibold text-purple-300", children: S.name }), f.span && g.jsxs("span", { className: "text-[10px] text-gray-500", children: [f.span.start, "-", f.span.end] })] }), g.jsx("div", { className: "flex-1 overflow-auto p-3 bg-slate-900/50", children: s() })] });
}
function wh({ trace: f, onClose: h }) {
  const [S, s] = F.useState(null), [N, D] = F.useState(null), [C, B] = F.useState("tree"), O = (yl) => {
    D(N === yl ? null : yl);
  }, p = N || S, Z = (yl) => {
    var _a;
    return 1 + (((_a = yl.children) == null ? void 0 : _a.reduce((gl, nl) => gl + Z(nl), 0)) || 0);
  }, q = Z(f), tl = { tree: "Tree (horizontal)", profiler: "Profiler (vertical)" };
  return g.jsxs("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2", children: [g.jsxs("div", { className: "bg-slate-900 rounded-lg shadow-2xl border border-slate-700 flex flex-col", style: { width: "95vw", height: "95vh" }, children: [g.jsxs("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 rounded-t-lg flex items-center justify-between flex-shrink-0", children: [g.jsxs("div", { children: [g.jsx("h2", { className: "text-base font-bold text-white", children: "Execution Trace" }), g.jsxs("p", { className: "text-purple-200 text-[10px]", children: [q, " operations \u2022 ", tl[C], " \u2022 ", N ? "Locked" : "Hover mode"] })] }), g.jsxs("div", { className: "flex items-center gap-2", children: [g.jsxs("select", { value: C, onChange: (yl) => B(yl.target.value), className: "bg-purple-700 text-white text-xs px-2 py-1 rounded border border-purple-500", children: [g.jsx("option", { value: "tree", children: "Tree View" }), g.jsx("option", { value: "profiler", children: "Profiler View" })] }), g.jsx("button", { onClick: h, className: "text-white hover:text-gray-200 transition-colors text-xl leading-none px-1", "aria-label": "Close", children: "\xD7" })] })] }), g.jsxs("div", { className: "flex-1 flex overflow-hidden min-h-0", children: [g.jsxs("div", { className: "w-[60%] border-r border-slate-700 flex flex-col min-h-0", children: [g.jsxs("div", { className: "px-2 py-1 bg-slate-800/30 border-b border-slate-700 text-[10px] text-gray-400 flex-shrink-0", children: [g.jsx("span", { className: "font-semibold", children: "Trace Tree" }), " \u2022 Click to expand/collapse \u2022 Hover/click to see source"] }), g.jsxs("div", { className: "flex-1 overflow-auto scrollbar-hide min-h-0", children: [C === "tree" && g.jsx(Xh, { node: f, onHover: s, onClick: O, hoveredNode: S, selectedNode: N }), C === "profiler" && g.jsx(V0, { node: f, depth: 0, onHover: s, onClick: O, hoveredNode: S, selectedNode: N })] })] }), g.jsxs("div", { className: "w-[40%] flex flex-col min-h-0", children: [g.jsxs("div", { className: "px-2 py-1 bg-slate-800/30 border-b border-slate-700 text-[10px] text-gray-400 flex-shrink-0", children: [g.jsx("span", { className: "font-semibold", children: "Source Code" }), " \u2022 Highlighted section shows span"] }), g.jsx("div", { className: "flex-1 overflow-hidden min-h-0", children: g.jsx(Qh, { node: p }) })] })] }), g.jsxs("div", { className: "px-2 py-1.5 bg-slate-800/50 border-t border-slate-700 flex justify-between items-center text-[10px] flex-shrink-0", children: [g.jsxs("div", { className: "text-gray-400 flex gap-2", children: [g.jsxs("span", { className: "flex items-center gap-1", children: [g.jsx("span", { className: "w-2 h-2 rounded-full bg-purple-600" }), "Hover"] }), g.jsxs("span", { className: "flex items-center gap-1", children: [g.jsx("span", { className: "w-2 h-2 rounded-full bg-yellow-400" }), "Selected"] }), g.jsxs("span", { className: "flex items-center gap-1", children: [g.jsx("span", { className: "w-2 h-2 rounded-full bg-slate-600" }), "Options"] })] }), g.jsx("button", { onClick: h, className: "px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-[11px] rounded transition-colors", children: "Close" })] })] }), g.jsx("style", { children: `
        .scrollbar-hide::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-hide::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-hide::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
        }
        .scrollbar-hide::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
        .scrollbar-hide {
          scrollbar-width: thin;
          scrollbar-color: #475569 transparent;
        }
      ` })] });
}
const Zh = `animal
	dog
	cat^2
	bird

color
	red
	blue
	green

output
	I saw a {beautiful|pretty|cute} [color] [animal]!`;
function Lh() {
  const [f, h] = F.useState(false), [S, s] = F.useState(Zh), [N, D] = F.useState(null), [C, B] = F.useState(true), [O, p] = F.useState("42"), [Z, q] = F.useState(5), [tl, yl] = F.useState([]), [gl, nl] = F.useState(null), [ql, wl] = F.useState([]), [nt, _l] = F.useState(false), [Wl, el] = F.useState({ top: 0, left: 0 }), [bl, L] = F.useState(""), [Ol, xl] = F.useState(0), [Gl, Al] = F.useState(0), cl = F.useRef(null);
  F.useEffect(() => {
    Z0().then(() => {
      h(true);
      try {
        const M = Mh();
        wl(M);
      } catch (M) {
        console.error("Failed to load generators:", M);
      }
    });
  }, []);
  const Fl = () => {
    p(Math.floor(Math.random() * 1e6).toString());
  }, gt = F.useCallback(async (M, j, X) => {
    if (f) try {
      const w = BigInt(parseInt(X) || 42), W = await Nh(M, j, w);
      yl(W), D(null);
    } catch (w) {
      D(String(w)), yl([]);
    }
  }, [f]);
  F.useEffect(() => {
    if (C && f) {
      const M = setTimeout(() => {
        gt(S, Z, O);
      }, 300);
      return () => clearTimeout(M);
    }
  }, [S, Z, O, C, f, gt]);
  const ct = (M) => {
    q(parseInt(M.target.value));
  }, z = (M) => {
    const j = parseInt(M.target.value);
    !isNaN(j) && j > 0 && q(j);
  }, U = (M) => {
    const j = M.target.value, X = M.target.selectionStart;
    s(j);
    const w = j.substring(0, X), W = w.match(/\{import:([^}]*)$/);
    if (W && cl.current) {
      const Dl = W[1];
      L(Dl), Al(X - Dl.length), xl(0);
      const zl = cl.current, Ee = w.split(`
`), Ke = Ee.length - 1, Ru = Ee[Ke], Ht = 20, Ua = 8, Ca = zl.offsetTop + (Ke + 1) * Ht + 40, tc = zl.offsetLeft + Ru.length * Ua + 20;
      el({ top: Ca, left: tc }), _l(true);
    } else _l(false);
  }, G = ql.filter((M) => M.toLowerCase().includes(bl.toLowerCase())), fl = (M) => {
    if (!cl.current) return;
    const j = cl.current.selectionStart, X = S.substring(0, Gl), w = S.substring(j), W = `${X}${M}}${w}`;
    s(W);
    const Dl = Gl + M.length + 1;
    setTimeout(() => {
      cl.current && (cl.current.selectionStart = Dl, cl.current.selectionEnd = Dl, cl.current.focus());
    }, 0), _l(false);
  }, sl = (M) => {
    xl((j) => M === "down" ? Math.min(j + 1, G.length - 1) : Math.max(j - 1, 0));
  }, d = () => {
    _l(false);
  }, A = async (M) => {
    if (f) try {
      const j = BigInt(parseInt(O) || 42) + BigInt(M), X = await Oh(S, j);
      nl(X.trace);
    } catch (j) {
      console.error("Failed to generate trace:", j);
    }
  };
  return g.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white", children: [g.jsxs("div", { className: "container mx-auto px-4 py-8", children: [g.jsxs("div", { className: "mb-8 text-center", children: [g.jsx("h1", { className: "text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2", children: "Perchance Interpreter" }), g.jsxs("p", { className: "text-gray-400 text-lg", children: ["A deterministic random text generator \u2022", " ", g.jsx("a", { href: "https://perchance.org/tutorial", target: "_blank", rel: "noopener noreferrer", className: "text-purple-400 hover:text-purple-300 transition-colors underline", children: "Tutorial" })] })] }), !f && g.jsxs("div", { className: "text-center py-12", children: [g.jsx("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" }), g.jsx("p", { className: "mt-4 text-gray-400", children: "Loading interpreter..." })] }), f && g.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [g.jsxs("div", { className: "bg-slate-800/50 backdrop-blur rounded-lg shadow-2xl border border-slate-700/50 overflow-hidden", children: [g.jsx("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3", children: g.jsx("h2", { className: "text-xl font-semibold", children: "Template Editor" }) }), g.jsxs("div", { className: "p-6 relative", children: [g.jsx("textarea", { ref: cl, value: S, onChange: U, className: "w-full h-[500px] bg-slate-900 text-gray-100 font-mono text-sm p-4 rounded-lg border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all resize-none", placeholder: "Enter your Perchance template here...", spellCheck: false }), nt && g.jsx(Bh, { items: G, position: Wl, selectedIndex: Ol, onSelect: fl, onClose: d, onNavigate: sl }), g.jsxs("div", { className: "mt-4 space-y-4", children: [g.jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [g.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [g.jsx("input", { type: "checkbox", checked: C, onChange: (M) => B(M.target.checked), className: "w-4 h-4 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900" }), g.jsx("span", { className: "text-sm text-gray-300", children: "Auto-evaluate" })] }), g.jsxs("div", { className: "flex items-center gap-2", children: [g.jsx("label", { className: "text-sm text-gray-300", children: "Seed:" }), g.jsx("input", { type: "number", value: O, onChange: (M) => p(M.target.value), className: "w-24 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none" }), g.jsx("button", { onClick: Fl, className: "px-3 py-1 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded text-sm transition-colors", title: "Randomize seed", children: "\u{1F3B2}" })] })] }), g.jsxs("div", { className: "space-y-2", children: [g.jsx("div", { className: "flex items-center gap-2", children: g.jsxs("label", { className: "text-sm text-gray-300", children: ["Samples: ", Z] }) }), g.jsxs("div", { className: "flex items-center gap-4", children: [g.jsx("input", { type: "range", min: "1", max: "10", value: Math.min(Z, 10), onChange: ct, className: "flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600" }), g.jsx("input", { type: "number", value: Z, onChange: z, min: "1", className: "w-20 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none" })] })] })] })] })] }), g.jsxs("div", { className: "bg-slate-800/50 backdrop-blur rounded-lg shadow-2xl border border-slate-700/50 overflow-hidden", children: [g.jsx("div", { className: "bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3", children: g.jsx("h2", { className: "text-xl font-semibold", children: "Output Samples" }) }), g.jsx("div", { className: "p-6", children: N ? g.jsx("div", { className: "bg-red-900/30 border border-red-500 rounded-lg p-4", children: g.jsxs("div", { className: "flex items-start gap-3", children: [g.jsx("svg", { className: "w-5 h-5 text-red-400 flex-shrink-0 mt-0.5", fill: "currentColor", viewBox: "0 0 20 20", children: g.jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }), g.jsxs("div", { className: "flex-1", children: [g.jsx("h3", { className: "text-red-400 font-semibold mb-1", children: "Error" }), g.jsx(Yh, { text: N, className: "text-sm whitespace-pre-wrap font-mono" })] })] }) }) : tl.length > 0 ? g.jsx("div", { className: "space-y-3", children: g.jsx("div", { className: "space-y-2 max-h-[580px] overflow-y-auto", children: tl.map((M, j) => g.jsx("div", { className: "bg-slate-900/70 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors", children: g.jsxs("div", { className: "flex items-start gap-3", children: [g.jsxs("span", { className: "text-xs text-purple-400 font-semibold bg-purple-900/30 px-2 py-1 rounded", children: ["#", j + 1] }), g.jsx("p", { className: "text-gray-100 flex-1", children: M }), g.jsx("button", { onClick: () => A(j), className: "px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors flex-shrink-0", title: "View execution trace", children: "\u{1F50D} Trace" })] }) }, j)) }) }) : g.jsxs("div", { className: "flex flex-col items-center justify-center h-full min-h-[500px] text-gray-500", children: [g.jsx("svg", { className: "w-16 h-16 mb-4 opacity-50", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: g.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }), g.jsx("p", { className: "text-lg", children: "Output will appear here" }), g.jsx("p", { className: "text-sm mt-2", children: "Edit the template to generate samples" })] }) })] })] }), g.jsx("div", { className: "mt-12 text-center text-gray-500 text-sm", children: g.jsxs("p", { children: ["Built with React, TypeScript, and WebAssembly \u2022", " ", g.jsx("a", { href: "https://github.com/philpax/perchance-interpreter", target: "_blank", rel: "noopener noreferrer", className: "text-purple-400 hover:text-purple-300 transition-colors", children: "View Source" })] }) })] }), gl && g.jsx(wh, { trace: gl, onClose: () => nl(null) })] });
}
zh.createRoot(document.getElementById("root")).render(g.jsx(F.StrictMode, { children: g.jsx(Lh, {}) }));
