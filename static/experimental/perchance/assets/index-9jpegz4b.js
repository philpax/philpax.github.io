(function() {
  const z = document.createElement("link").relList;
  if (z && z.supports && z.supports("modulepreload")) return;
  for (const C of document.querySelectorAll('link[rel="modulepreload"]')) y(C);
  new MutationObserver((C) => {
    for (const Z of C) if (Z.type === "childList") for (const L of Z.addedNodes) L.tagName === "LINK" && L.rel === "modulepreload" && y(L);
  }).observe(document, { childList: true, subtree: true });
  function p(C) {
    const Z = {};
    return C.integrity && (Z.integrity = C.integrity), C.referrerPolicy && (Z.referrerPolicy = C.referrerPolicy), C.crossOrigin === "use-credentials" ? Z.credentials = "include" : C.crossOrigin === "anonymous" ? Z.credentials = "omit" : Z.credentials = "same-origin", Z;
  }
  function y(C) {
    if (C.ep) return;
    C.ep = true;
    const Z = p(C);
    fetch(C.href, Z);
  }
})();
var mi = { exports: {} }, ze = {};
var pd;
function cv() {
  if (pd) return ze;
  pd = 1;
  var h = Symbol.for("react.transitional.element"), z = Symbol.for("react.fragment");
  function p(y, C, Z) {
    var L = null;
    if (Z !== void 0 && (L = "" + Z), C.key !== void 0 && (L = "" + C.key), "key" in C) {
      Z = {};
      for (var il in C) il !== "key" && (Z[il] = C[il]);
    } else Z = C;
    return C = Z.ref, { $$typeof: h, type: y, key: L, ref: C !== void 0 ? C : null, props: Z };
  }
  return ze.Fragment = z, ze.jsx = p, ze.jsxs = p, ze;
}
var Od;
function iv() {
  return Od || (Od = 1, mi.exports = cv()), mi.exports;
}
var x = iv(), vi = { exports: {} }, Y = {};
var Md;
function sv() {
  if (Md) return Y;
  Md = 1;
  var h = Symbol.for("react.transitional.element"), z = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), Z = Symbol.for("react.consumer"), L = Symbol.for("react.context"), il = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), A = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), q = Symbol.for("react.activity"), sl = Symbol.iterator;
  function ql(o) {
    return o === null || typeof o != "object" ? null : (o = sl && o[sl] || o["@@iterator"], typeof o == "function" ? o : null);
  }
  var jl = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Ml = Object.assign, _t = {};
  function Gl(o, E, M) {
    this.props = o, this.context = E, this.refs = _t, this.updater = M || jl;
  }
  Gl.prototype.isReactComponent = {}, Gl.prototype.setState = function(o, E) {
    if (typeof o != "object" && typeof o != "function" && o != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, o, E, "setState");
  }, Gl.prototype.forceUpdate = function(o) {
    this.updater.enqueueForceUpdate(this, o, "forceUpdate");
  };
  function hl() {
  }
  hl.prototype = Gl.prototype;
  function yl(o, E, M) {
    this.props = o, this.context = E, this.refs = _t, this.updater = M || jl;
  }
  var Ll = yl.prototype = new hl();
  Ll.constructor = yl, Ml(Ll, Gl.prototype), Ll.isPureReactComponent = true;
  var Vl = Array.isArray;
  function Bl() {
  }
  var F = { H: null, A: null, T: null, S: null }, Kl = Object.prototype.hasOwnProperty;
  function Ot(o, E, M) {
    var N = M.ref;
    return { $$typeof: h, type: o, key: E, ref: N !== void 0 ? N : null, props: M };
  }
  function Za(o, E) {
    return Ot(o.type, E, o.props);
  }
  function Mt(o) {
    return typeof o == "object" && o !== null && o.$$typeof === h;
  }
  function Jl(o) {
    var E = { "=": "=0", ":": "=2" };
    return "$" + o.replace(/[=:]/g, function(M) {
      return E[M];
    });
  }
  var Ta = /\/+/g;
  function xt(o, E) {
    return typeof o == "object" && o !== null && o.key != null ? Jl("" + o.key) : E.toString(36);
  }
  function zt(o) {
    switch (o.status) {
      case "fulfilled":
        return o.value;
      case "rejected":
        throw o.reason;
      default:
        switch (typeof o.status == "string" ? o.then(Bl, Bl) : (o.status = "pending", o.then(function(E) {
          o.status === "pending" && (o.status = "fulfilled", o.value = E);
        }, function(E) {
          o.status === "pending" && (o.status = "rejected", o.reason = E);
        })), o.status) {
          case "fulfilled":
            return o.value;
          case "rejected":
            throw o.reason;
        }
    }
    throw o;
  }
  function S(o, E, M, N, G) {
    var V = typeof o;
    (V === "undefined" || V === "boolean") && (o = null);
    var tl = false;
    if (o === null) tl = true;
    else switch (V) {
      case "bigint":
      case "string":
      case "number":
        tl = true;
        break;
      case "object":
        switch (o.$$typeof) {
          case h:
          case z:
            tl = true;
            break;
          case w:
            return tl = o._init, S(tl(o._payload), E, M, N, G);
        }
    }
    if (tl) return G = G(o), tl = N === "" ? "." + xt(o, 0) : N, Vl(G) ? (M = "", tl != null && (M = tl.replace(Ta, "$&/") + "/"), S(G, E, M, "", function(Du) {
      return Du;
    })) : G != null && (Mt(G) && (G = Za(G, M + (G.key == null || o && o.key === G.key ? "" : ("" + G.key).replace(Ta, "$&/") + "/") + tl)), E.push(G)), 1;
    tl = 0;
    var Xl = N === "" ? "." : N + ":";
    if (Vl(o)) for (var Sl = 0; Sl < o.length; Sl++) N = o[Sl], V = Xl + xt(N, Sl), tl += S(N, E, M, V, G);
    else if (Sl = ql(o), typeof Sl == "function") for (o = Sl.call(o), Sl = 0; !(N = o.next()).done; ) N = N.value, V = Xl + xt(N, Sl++), tl += S(N, E, M, V, G);
    else if (V === "object") {
      if (typeof o.then == "function") return S(zt(o), E, M, N, G);
      throw E = String(o), Error("Objects are not valid as a React child (found: " + (E === "[object Object]" ? "object with keys {" + Object.keys(o).join(", ") + "}" : E) + "). If you meant to render a collection of children, use an array instead.");
    }
    return tl;
  }
  function O(o, E, M) {
    if (o == null) return o;
    var N = [], G = 0;
    return S(o, N, "", "", function(V) {
      return E.call(M, V, G++);
    }), N;
  }
  function B(o) {
    if (o._status === -1) {
      var E = o._result;
      E = E(), E.then(function(M) {
        (o._status === 0 || o._status === -1) && (o._status = 1, o._result = M);
      }, function(M) {
        (o._status === 0 || o._status === -1) && (o._status = 2, o._result = M);
      }), o._status === -1 && (o._status = 0, o._result = E);
    }
    if (o._status === 1) return o._result.default;
    throw o._result;
  }
  var el = typeof reportError == "function" ? reportError : function(o) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var E = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof o == "object" && o !== null && typeof o.message == "string" ? String(o.message) : String(o), error: o });
      if (!window.dispatchEvent(E)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", o);
      return;
    }
    console.error(o);
  }, ol = { map: O, forEach: function(o, E, M) {
    O(o, function() {
      E.apply(this, arguments);
    }, M);
  }, count: function(o) {
    var E = 0;
    return O(o, function() {
      E++;
    }), E;
  }, toArray: function(o) {
    return O(o, function(E) {
      return E;
    }) || [];
  }, only: function(o) {
    if (!Mt(o)) throw Error("React.Children.only expected to receive a single React element child.");
    return o;
  } };
  return Y.Activity = q, Y.Children = ol, Y.Component = Gl, Y.Fragment = p, Y.Profiler = C, Y.PureComponent = yl, Y.StrictMode = y, Y.Suspense = U, Y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F, Y.__COMPILER_RUNTIME = { __proto__: null, c: function(o) {
    return F.H.useMemoCache(o);
  } }, Y.cache = function(o) {
    return function() {
      return o.apply(null, arguments);
    };
  }, Y.cacheSignal = function() {
    return null;
  }, Y.cloneElement = function(o, E, M) {
    if (o == null) throw Error("The argument must be a React element, but you passed " + o + ".");
    var N = Ml({}, o.props), G = o.key;
    if (E != null) for (V in E.key !== void 0 && (G = "" + E.key), E) !Kl.call(E, V) || V === "key" || V === "__self" || V === "__source" || V === "ref" && E.ref === void 0 || (N[V] = E[V]);
    var V = arguments.length - 2;
    if (V === 1) N.children = M;
    else if (1 < V) {
      for (var tl = Array(V), Xl = 0; Xl < V; Xl++) tl[Xl] = arguments[Xl + 2];
      N.children = tl;
    }
    return Ot(o.type, G, N);
  }, Y.createContext = function(o) {
    return o = { $$typeof: L, _currentValue: o, _currentValue2: o, _threadCount: 0, Provider: null, Consumer: null }, o.Provider = o, o.Consumer = { $$typeof: Z, _context: o }, o;
  }, Y.createElement = function(o, E, M) {
    var N, G = {}, V = null;
    if (E != null) for (N in E.key !== void 0 && (V = "" + E.key), E) Kl.call(E, N) && N !== "key" && N !== "__self" && N !== "__source" && (G[N] = E[N]);
    var tl = arguments.length - 2;
    if (tl === 1) G.children = M;
    else if (1 < tl) {
      for (var Xl = Array(tl), Sl = 0; Sl < tl; Sl++) Xl[Sl] = arguments[Sl + 2];
      G.children = Xl;
    }
    if (o && o.defaultProps) for (N in tl = o.defaultProps, tl) G[N] === void 0 && (G[N] = tl[N]);
    return Ot(o, V, G);
  }, Y.createRef = function() {
    return { current: null };
  }, Y.forwardRef = function(o) {
    return { $$typeof: il, render: o };
  }, Y.isValidElement = Mt, Y.lazy = function(o) {
    return { $$typeof: w, _payload: { _status: -1, _result: o }, _init: B };
  }, Y.memo = function(o, E) {
    return { $$typeof: A, type: o, compare: E === void 0 ? null : E };
  }, Y.startTransition = function(o) {
    var E = F.T, M = {};
    F.T = M;
    try {
      var N = o(), G = F.S;
      G !== null && G(M, N), typeof N == "object" && N !== null && typeof N.then == "function" && N.then(Bl, el);
    } catch (V) {
      el(V);
    } finally {
      E !== null && M.types !== null && (E.types = M.types), F.T = E;
    }
  }, Y.unstable_useCacheRefresh = function() {
    return F.H.useCacheRefresh();
  }, Y.use = function(o) {
    return F.H.use(o);
  }, Y.useActionState = function(o, E, M) {
    return F.H.useActionState(o, E, M);
  }, Y.useCallback = function(o, E) {
    return F.H.useCallback(o, E);
  }, Y.useContext = function(o) {
    return F.H.useContext(o);
  }, Y.useDebugValue = function() {
  }, Y.useDeferredValue = function(o, E) {
    return F.H.useDeferredValue(o, E);
  }, Y.useEffect = function(o, E) {
    return F.H.useEffect(o, E);
  }, Y.useEffectEvent = function(o) {
    return F.H.useEffectEvent(o);
  }, Y.useId = function() {
    return F.H.useId();
  }, Y.useImperativeHandle = function(o, E, M) {
    return F.H.useImperativeHandle(o, E, M);
  }, Y.useInsertionEffect = function(o, E) {
    return F.H.useInsertionEffect(o, E);
  }, Y.useLayoutEffect = function(o, E) {
    return F.H.useLayoutEffect(o, E);
  }, Y.useMemo = function(o, E) {
    return F.H.useMemo(o, E);
  }, Y.useOptimistic = function(o, E) {
    return F.H.useOptimistic(o, E);
  }, Y.useReducer = function(o, E, M) {
    return F.H.useReducer(o, E, M);
  }, Y.useRef = function(o) {
    return F.H.useRef(o);
  }, Y.useState = function(o) {
    return F.H.useState(o);
  }, Y.useSyncExternalStore = function(o, E, M) {
    return F.H.useSyncExternalStore(o, E, M);
  }, Y.useTransition = function() {
    return F.H.useTransition();
  }, Y.version = "19.2.0", Y;
}
var Dd;
function Ti() {
  return Dd || (Dd = 1, vi.exports = sv()), vi.exports;
}
var pt = Ti(), hi = { exports: {} }, Te = {}, ri = { exports: {} }, gi = {};
var Ud;
function ov() {
  return Ud || (Ud = 1, (function(h) {
    function z(S, O) {
      var B = S.length;
      S.push(O);
      l: for (; 0 < B; ) {
        var el = B - 1 >>> 1, ol = S[el];
        if (0 < C(ol, O)) S[el] = O, S[B] = ol, B = el;
        else break l;
      }
    }
    function p(S) {
      return S.length === 0 ? null : S[0];
    }
    function y(S) {
      if (S.length === 0) return null;
      var O = S[0], B = S.pop();
      if (B !== O) {
        S[0] = B;
        l: for (var el = 0, ol = S.length, o = ol >>> 1; el < o; ) {
          var E = 2 * (el + 1) - 1, M = S[E], N = E + 1, G = S[N];
          if (0 > C(M, B)) N < ol && 0 > C(G, M) ? (S[el] = G, S[N] = B, el = N) : (S[el] = M, S[E] = B, el = E);
          else if (N < ol && 0 > C(G, B)) S[el] = G, S[N] = B, el = N;
          else break l;
        }
      }
      return O;
    }
    function C(S, O) {
      var B = S.sortIndex - O.sortIndex;
      return B !== 0 ? B : S.id - O.id;
    }
    if (h.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var Z = performance;
      h.unstable_now = function() {
        return Z.now();
      };
    } else {
      var L = Date, il = L.now();
      h.unstable_now = function() {
        return L.now() - il;
      };
    }
    var U = [], A = [], w = 1, q = null, sl = 3, ql = false, jl = false, Ml = false, _t = false, Gl = typeof setTimeout == "function" ? setTimeout : null, hl = typeof clearTimeout == "function" ? clearTimeout : null, yl = typeof setImmediate < "u" ? setImmediate : null;
    function Ll(S) {
      for (var O = p(A); O !== null; ) {
        if (O.callback === null) y(A);
        else if (O.startTime <= S) y(A), O.sortIndex = O.expirationTime, z(U, O);
        else break;
        O = p(A);
      }
    }
    function Vl(S) {
      if (Ml = false, Ll(S), !jl) if (p(U) !== null) jl = true, Bl || (Bl = true, Jl());
      else {
        var O = p(A);
        O !== null && zt(Vl, O.startTime - S);
      }
    }
    var Bl = false, F = -1, Kl = 5, Ot = -1;
    function Za() {
      return _t ? true : !(h.unstable_now() - Ot < Kl);
    }
    function Mt() {
      if (_t = false, Bl) {
        var S = h.unstable_now();
        Ot = S;
        var O = true;
        try {
          l: {
            jl = false, Ml && (Ml = false, hl(F), F = -1), ql = true;
            var B = sl;
            try {
              t: {
                for (Ll(S), q = p(U); q !== null && !(q.expirationTime > S && Za()); ) {
                  var el = q.callback;
                  if (typeof el == "function") {
                    q.callback = null, sl = q.priorityLevel;
                    var ol = el(q.expirationTime <= S);
                    if (S = h.unstable_now(), typeof ol == "function") {
                      q.callback = ol, Ll(S), O = true;
                      break t;
                    }
                    q === p(U) && y(U), Ll(S);
                  } else y(U);
                  q = p(U);
                }
                if (q !== null) O = true;
                else {
                  var o = p(A);
                  o !== null && zt(Vl, o.startTime - S), O = false;
                }
              }
              break l;
            } finally {
              q = null, sl = B, ql = false;
            }
            O = void 0;
          }
        } finally {
          O ? Jl() : Bl = false;
        }
      }
    }
    var Jl;
    if (typeof yl == "function") Jl = function() {
      yl(Mt);
    };
    else if (typeof MessageChannel < "u") {
      var Ta = new MessageChannel(), xt = Ta.port2;
      Ta.port1.onmessage = Mt, Jl = function() {
        xt.postMessage(null);
      };
    } else Jl = function() {
      Gl(Mt, 0);
    };
    function zt(S, O) {
      F = Gl(function() {
        S(h.unstable_now());
      }, O);
    }
    h.unstable_IdlePriority = 5, h.unstable_ImmediatePriority = 1, h.unstable_LowPriority = 4, h.unstable_NormalPriority = 3, h.unstable_Profiling = null, h.unstable_UserBlockingPriority = 2, h.unstable_cancelCallback = function(S) {
      S.callback = null;
    }, h.unstable_forceFrameRate = function(S) {
      0 > S || 125 < S ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Kl = 0 < S ? Math.floor(1e3 / S) : 5;
    }, h.unstable_getCurrentPriorityLevel = function() {
      return sl;
    }, h.unstable_next = function(S) {
      switch (sl) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = sl;
      }
      var B = sl;
      sl = O;
      try {
        return S();
      } finally {
        sl = B;
      }
    }, h.unstable_requestPaint = function() {
      _t = true;
    }, h.unstable_runWithPriority = function(S, O) {
      switch (S) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          S = 3;
      }
      var B = sl;
      sl = S;
      try {
        return O();
      } finally {
        sl = B;
      }
    }, h.unstable_scheduleCallback = function(S, O, B) {
      var el = h.unstable_now();
      switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? el + B : el) : B = el, S) {
        case 1:
          var ol = -1;
          break;
        case 2:
          ol = 250;
          break;
        case 5:
          ol = 1073741823;
          break;
        case 4:
          ol = 1e4;
          break;
        default:
          ol = 5e3;
      }
      return ol = B + ol, S = { id: w++, callback: O, priorityLevel: S, startTime: B, expirationTime: ol, sortIndex: -1 }, B > el ? (S.sortIndex = B, z(A, S), p(U) === null && S === p(A) && (Ml ? (hl(F), F = -1) : Ml = true, zt(Vl, B - el))) : (S.sortIndex = ol, z(U, S), jl || ql || (jl = true, Bl || (Bl = true, Jl()))), S;
    }, h.unstable_shouldYield = Za, h.unstable_wrapCallback = function(S) {
      var O = sl;
      return function() {
        var B = sl;
        sl = O;
        try {
          return S.apply(this, arguments);
        } finally {
          sl = B;
        }
      };
    };
  })(gi)), gi;
}
var Nd;
function dv() {
  return Nd || (Nd = 1, ri.exports = ov()), ri.exports;
}
var bi = { exports: {} }, Yl = {};
var Hd;
function yv() {
  if (Hd) return Yl;
  Hd = 1;
  var h = Ti();
  function z(U) {
    var A = "https://react.dev/errors/" + U;
    if (1 < arguments.length) {
      A += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var w = 2; w < arguments.length; w++) A += "&args[]=" + encodeURIComponent(arguments[w]);
    }
    return "Minified React error #" + U + "; visit " + A + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function p() {
  }
  var y = { d: { f: p, r: function() {
    throw Error(z(522));
  }, D: p, C: p, L: p, m: p, X: p, S: p, M: p }, p: 0, findDOMNode: null }, C = Symbol.for("react.portal");
  function Z(U, A, w) {
    var q = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: C, key: q == null ? null : "" + q, children: U, containerInfo: A, implementation: w };
  }
  var L = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function il(U, A) {
    if (U === "font") return "";
    if (typeof A == "string") return A === "use-credentials" ? A : "";
  }
  return Yl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = y, Yl.createPortal = function(U, A) {
    var w = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!A || A.nodeType !== 1 && A.nodeType !== 9 && A.nodeType !== 11) throw Error(z(299));
    return Z(U, A, null, w);
  }, Yl.flushSync = function(U) {
    var A = L.T, w = y.p;
    try {
      if (L.T = null, y.p = 2, U) return U();
    } finally {
      L.T = A, y.p = w, y.d.f();
    }
  }, Yl.preconnect = function(U, A) {
    typeof U == "string" && (A ? (A = A.crossOrigin, A = typeof A == "string" ? A === "use-credentials" ? A : "" : void 0) : A = null, y.d.C(U, A));
  }, Yl.prefetchDNS = function(U) {
    typeof U == "string" && y.d.D(U);
  }, Yl.preinit = function(U, A) {
    if (typeof U == "string" && A && typeof A.as == "string") {
      var w = A.as, q = il(w, A.crossOrigin), sl = typeof A.integrity == "string" ? A.integrity : void 0, ql = typeof A.fetchPriority == "string" ? A.fetchPriority : void 0;
      w === "style" ? y.d.S(U, typeof A.precedence == "string" ? A.precedence : void 0, { crossOrigin: q, integrity: sl, fetchPriority: ql }) : w === "script" && y.d.X(U, { crossOrigin: q, integrity: sl, fetchPriority: ql, nonce: typeof A.nonce == "string" ? A.nonce : void 0 });
    }
  }, Yl.preinitModule = function(U, A) {
    if (typeof U == "string") if (typeof A == "object" && A !== null) {
      if (A.as == null || A.as === "script") {
        var w = il(A.as, A.crossOrigin);
        y.d.M(U, { crossOrigin: w, integrity: typeof A.integrity == "string" ? A.integrity : void 0, nonce: typeof A.nonce == "string" ? A.nonce : void 0 });
      }
    } else A == null && y.d.M(U);
  }, Yl.preload = function(U, A) {
    if (typeof U == "string" && typeof A == "object" && A !== null && typeof A.as == "string") {
      var w = A.as, q = il(w, A.crossOrigin);
      y.d.L(U, w, { crossOrigin: q, integrity: typeof A.integrity == "string" ? A.integrity : void 0, nonce: typeof A.nonce == "string" ? A.nonce : void 0, type: typeof A.type == "string" ? A.type : void 0, fetchPriority: typeof A.fetchPriority == "string" ? A.fetchPriority : void 0, referrerPolicy: typeof A.referrerPolicy == "string" ? A.referrerPolicy : void 0, imageSrcSet: typeof A.imageSrcSet == "string" ? A.imageSrcSet : void 0, imageSizes: typeof A.imageSizes == "string" ? A.imageSizes : void 0, media: typeof A.media == "string" ? A.media : void 0 });
    }
  }, Yl.preloadModule = function(U, A) {
    if (typeof U == "string") if (A) {
      var w = il(A.as, A.crossOrigin);
      y.d.m(U, { as: typeof A.as == "string" && A.as !== "script" ? A.as : void 0, crossOrigin: w, integrity: typeof A.integrity == "string" ? A.integrity : void 0 });
    } else y.d.m(U);
  }, Yl.requestFormReset = function(U) {
    y.d.r(U);
  }, Yl.unstable_batchedUpdates = function(U, A) {
    return U(A);
  }, Yl.useFormState = function(U, A, w) {
    return L.H.useFormState(U, A, w);
  }, Yl.useFormStatus = function() {
    return L.H.useHostTransitionStatus();
  }, Yl.version = "19.2.0", Yl;
}
var xd;
function mv() {
  if (xd) return bi.exports;
  xd = 1;
  function h() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(h);
    } catch (z) {
      console.error(z);
    }
  }
  return h(), bi.exports = yv(), bi.exports;
}
var Rd;
function vv() {
  if (Rd) return Te;
  Rd = 1;
  var h = dv(), z = Ti(), p = mv();
  function y(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++) t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function C(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function Z(l) {
    var t = l, a = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (a = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? a : null;
  }
  function L(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function il(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function U(l) {
    if (Z(l) !== l) throw Error(y(188));
  }
  function A(l) {
    var t = l.alternate;
    if (!t) {
      if (t = Z(l), t === null) throw Error(y(188));
      return t !== l ? null : l;
    }
    for (var a = l, u = t; ; ) {
      var e = a.return;
      if (e === null) break;
      var n = e.alternate;
      if (n === null) {
        if (u = e.return, u !== null) {
          a = u;
          continue;
        }
        break;
      }
      if (e.child === n.child) {
        for (n = e.child; n; ) {
          if (n === a) return U(e), l;
          if (n === u) return U(e), t;
          n = n.sibling;
        }
        throw Error(y(188));
      }
      if (a.return !== u.return) a = e, u = n;
      else {
        for (var f = false, c = e.child; c; ) {
          if (c === a) {
            f = true, a = e, u = n;
            break;
          }
          if (c === u) {
            f = true, u = e, a = n;
            break;
          }
          c = c.sibling;
        }
        if (!f) {
          for (c = n.child; c; ) {
            if (c === a) {
              f = true, a = n, u = e;
              break;
            }
            if (c === u) {
              f = true, u = n, a = e;
              break;
            }
            c = c.sibling;
          }
          if (!f) throw Error(y(189));
        }
      }
      if (a.alternate !== u) throw Error(y(190));
    }
    if (a.tag !== 3) throw Error(y(188));
    return a.stateNode.current === a ? l : t;
  }
  function w(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = w(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var q = Object.assign, sl = Symbol.for("react.element"), ql = Symbol.for("react.transitional.element"), jl = Symbol.for("react.portal"), Ml = Symbol.for("react.fragment"), _t = Symbol.for("react.strict_mode"), Gl = Symbol.for("react.profiler"), hl = Symbol.for("react.consumer"), yl = Symbol.for("react.context"), Ll = Symbol.for("react.forward_ref"), Vl = Symbol.for("react.suspense"), Bl = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), Kl = Symbol.for("react.lazy"), Ot = Symbol.for("react.activity"), Za = Symbol.for("react.memo_cache_sentinel"), Mt = Symbol.iterator;
  function Jl(l) {
    return l === null || typeof l != "object" ? null : (l = Mt && l[Mt] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Ta = Symbol.for("react.client.reference");
  function xt(l) {
    if (l == null) return null;
    if (typeof l == "function") return l.$$typeof === Ta ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Ml:
        return "Fragment";
      case Gl:
        return "Profiler";
      case _t:
        return "StrictMode";
      case Vl:
        return "Suspense";
      case Bl:
        return "SuspenseList";
      case Ot:
        return "Activity";
    }
    if (typeof l == "object") switch (l.$$typeof) {
      case jl:
        return "Portal";
      case yl:
        return l.displayName || "Context";
      case hl:
        return (l._context.displayName || "Context") + ".Consumer";
      case Ll:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case F:
        return t = l.displayName || null, t !== null ? t : xt(l.type) || "Memo";
      case Kl:
        t = l._payload, l = l._init;
        try {
          return xt(l(t));
        } catch {
        }
    }
    return null;
  }
  var zt = Array.isArray, S = z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = p.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = { pending: false, data: null, method: null, action: null }, el = [], ol = -1;
  function o(l) {
    return { current: l };
  }
  function E(l) {
    0 > ol || (l.current = el[ol], el[ol] = null, ol--);
  }
  function M(l, t) {
    ol++, el[ol] = l.current, l.current = t;
  }
  var N = o(null), G = o(null), V = o(null), tl = o(null);
  function Xl(l, t) {
    switch (M(V, t), M(G, l), M(N, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Wo(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI) t = Wo(t), l = $o(t, l);
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
    E(N), M(N, l);
  }
  function Sl() {
    E(N), E(G), E(V);
  }
  function Du(l) {
    l.memoizedState !== null && M(tl, l);
    var t = N.current, a = $o(t, l.type);
    t !== a && (M(G, l), M(N, a));
  }
  function De(l) {
    G.current === l && (E(N), E(G)), tl.current === l && (E(tl), ge._currentValue = B);
  }
  var Wn, Ei;
  function Ea(l) {
    if (Wn === void 0) try {
      throw Error();
    } catch (a) {
      var t = a.stack.trim().match(/\n( *(at )?)/);
      Wn = t && t[1] || "", Ei = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + Wn + l + Ei;
  }
  var $n = false;
  function Fn(l, t) {
    if (!l || $n) return "";
    $n = true;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var u = { DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var T = function() {
              throw Error();
            };
            if (Object.defineProperty(T.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(T, []);
              } catch (g) {
                var r = g;
              }
              Reflect.construct(l, [], T);
            } else {
              try {
                T.call();
              } catch (g) {
                r = g;
              }
              l.call(T.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (g) {
              r = g;
            }
            (T = l()) && typeof T.catch == "function" && T.catch(function() {
            });
          }
        } catch (g) {
          if (g && r && typeof g.stack == "string") return [g.stack, r.stack];
        }
        return [null, null];
      } };
      u.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var e = Object.getOwnPropertyDescriptor(u.DetermineComponentFrameRoot, "name");
      e && e.configurable && Object.defineProperty(u.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var n = u.DetermineComponentFrameRoot(), f = n[0], c = n[1];
      if (f && c) {
        var i = f.split(`
`), v = c.split(`
`);
        for (e = u = 0; u < i.length && !i[u].includes("DetermineComponentFrameRoot"); ) u++;
        for (; e < v.length && !v[e].includes("DetermineComponentFrameRoot"); ) e++;
        if (u === i.length || e === v.length) for (u = i.length - 1, e = v.length - 1; 1 <= u && 0 <= e && i[u] !== v[e]; ) e--;
        for (; 1 <= u && 0 <= e; u--, e--) if (i[u] !== v[e]) {
          if (u !== 1 || e !== 1) do
            if (u--, e--, 0 > e || i[u] !== v[e]) {
              var b = `
` + i[u].replace(" at new ", " at ");
              return l.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", l.displayName)), b;
            }
          while (1 <= u && 0 <= e);
          break;
        }
      }
    } finally {
      $n = false, Error.prepareStackTrace = a;
    }
    return (a = l ? l.displayName || l.name : "") ? Ea(a) : "";
  }
  function Yd(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Ea(l.type);
      case 16:
        return Ea("Lazy");
      case 13:
        return l.child !== t && t !== null ? Ea("Suspense Fallback") : Ea("Suspense");
      case 19:
        return Ea("SuspenseList");
      case 0:
      case 15:
        return Fn(l.type, false);
      case 11:
        return Fn(l.type.render, false);
      case 1:
        return Fn(l.type, true);
      case 31:
        return Ea("Activity");
      default:
        return "";
    }
  }
  function Ai(l) {
    try {
      var t = "", a = null;
      do
        t += Yd(l, a), a = l, l = l.return;
      while (l);
      return t;
    } catch (u) {
      return `
Error generating stack: ` + u.message + `
` + u.stack;
    }
  }
  var kn = Object.prototype.hasOwnProperty, In = h.unstable_scheduleCallback, Pn = h.unstable_cancelCallback, Gd = h.unstable_shouldYield, Xd = h.unstable_requestPaint, lt = h.unstable_now, Qd = h.unstable_getCurrentPriorityLevel, pi = h.unstable_ImmediatePriority, Oi = h.unstable_UserBlockingPriority, Ue = h.unstable_NormalPriority, Zd = h.unstable_LowPriority, Mi = h.unstable_IdlePriority, Ld = h.log, Vd = h.unstable_setDisableYieldValue, Uu = null, tt = null;
  function kt(l) {
    if (typeof Ld == "function" && Vd(l), tt && typeof tt.setStrictMode == "function") try {
      tt.setStrictMode(Uu, l);
    } catch {
    }
  }
  var at = Math.clz32 ? Math.clz32 : wd, Kd = Math.log, Jd = Math.LN2;
  function wd(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Kd(l) / Jd | 0) | 0;
  }
  var Ne = 256, He = 262144, xe = 4194304;
  function Aa(l) {
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
  function Re(l, t, a) {
    var u = l.pendingLanes;
    if (u === 0) return 0;
    var e = 0, n = l.suspendedLanes, f = l.pingedLanes;
    l = l.warmLanes;
    var c = u & 134217727;
    return c !== 0 ? (u = c & ~n, u !== 0 ? e = Aa(u) : (f &= c, f !== 0 ? e = Aa(f) : a || (a = c & ~l, a !== 0 && (e = Aa(a))))) : (c = u & ~n, c !== 0 ? e = Aa(c) : f !== 0 ? e = Aa(f) : a || (a = u & ~l, a !== 0 && (e = Aa(a)))), e === 0 ? 0 : t !== 0 && t !== e && (t & n) === 0 && (n = e & -e, a = t & -t, n >= a || n === 32 && (a & 4194048) !== 0) ? t : e;
  }
  function Nu(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Wd(l, t) {
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
  function Di() {
    var l = xe;
    return xe <<= 1, (xe & 62914560) === 0 && (xe = 4194304), l;
  }
  function lf(l) {
    for (var t = [], a = 0; 31 > a; a++) t.push(l);
    return t;
  }
  function Hu(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function $d(l, t, a, u, e, n) {
    var f = l.pendingLanes;
    l.pendingLanes = a, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= a, l.entangledLanes &= a, l.errorRecoveryDisabledLanes &= a, l.shellSuspendCounter = 0;
    var c = l.entanglements, i = l.expirationTimes, v = l.hiddenUpdates;
    for (a = f & ~a; 0 < a; ) {
      var b = 31 - at(a), T = 1 << b;
      c[b] = 0, i[b] = -1;
      var r = v[b];
      if (r !== null) for (v[b] = null, b = 0; b < r.length; b++) {
        var g = r[b];
        g !== null && (g.lane &= -536870913);
      }
      a &= ~T;
    }
    u !== 0 && Ui(l, u, 0), n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~t));
  }
  function Ui(l, t, a) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var u = 31 - at(t);
    l.entangledLanes |= t, l.entanglements[u] = l.entanglements[u] | 1073741824 | a & 261930;
  }
  function Ni(l, t) {
    var a = l.entangledLanes |= t;
    for (l = l.entanglements; a; ) {
      var u = 31 - at(a), e = 1 << u;
      e & t | l[u] & t && (l[u] |= t), a &= ~e;
    }
  }
  function Hi(l, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : tf(a), (a & (l.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function tf(l) {
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
  function af(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function xi() {
    var l = O.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : bd(l.type));
  }
  function Ri(l, t) {
    var a = O.p;
    try {
      return O.p = l, t();
    } finally {
      O.p = a;
    }
  }
  var It = Math.random().toString(36).slice(2), Nl = "__reactFiber$" + It, wl = "__reactProps$" + It, La = "__reactContainer$" + It, uf = "__reactEvents$" + It, Fd = "__reactListeners$" + It, kd = "__reactHandles$" + It, Ci = "__reactResources$" + It, xu = "__reactMarker$" + It;
  function ef(l) {
    delete l[Nl], delete l[wl], delete l[uf], delete l[Fd], delete l[kd];
  }
  function Va(l) {
    var t = l[Nl];
    if (t) return t;
    for (var a = l.parentNode; a; ) {
      if (t = a[La] || a[Nl]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null) for (l = ad(l); l !== null; ) {
          if (a = l[Nl]) return a;
          l = ad(l);
        }
        return t;
      }
      l = a, a = l.parentNode;
    }
    return null;
  }
  function Ka(l) {
    if (l = l[Nl] || l[La]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return l;
    }
    return null;
  }
  function Ru(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(y(33));
  }
  function Ja(l) {
    var t = l[Ci];
    return t || (t = l[Ci] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Dl(l) {
    l[xu] = true;
  }
  var qi = /* @__PURE__ */ new Set(), ji = {};
  function pa(l, t) {
    wa(l, t), wa(l + "Capture", t);
  }
  function wa(l, t) {
    for (ji[l] = t, l = 0; l < t.length; l++) qi.add(t[l]);
  }
  var Id = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Bi = {}, Yi = {};
  function Pd(l) {
    return kn.call(Yi, l) ? true : kn.call(Bi, l) ? false : Id.test(l) ? Yi[l] = true : (Bi[l] = true, false);
  }
  function Ce(l, t, a) {
    if (Pd(t)) if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
          l.removeAttribute(t);
          return;
        case "boolean":
          var u = t.toLowerCase().slice(0, 5);
          if (u !== "data-" && u !== "aria-") {
            l.removeAttribute(t);
            return;
          }
      }
      l.setAttribute(t, "" + a);
    }
  }
  function qe(l, t, a) {
    if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + a);
    }
  }
  function Rt(l, t, a, u) {
    if (u === null) l.removeAttribute(a);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(a);
          return;
      }
      l.setAttributeNS(t, a, "" + u);
    }
  }
  function ot(l) {
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
  function Gi(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ly(l, t, a) {
    var u = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (!l.hasOwnProperty(t) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var e = u.get, n = u.set;
      return Object.defineProperty(l, t, { configurable: true, get: function() {
        return e.call(this);
      }, set: function(f) {
        a = "" + f, n.call(this, f);
      } }), Object.defineProperty(l, t, { enumerable: u.enumerable }), { getValue: function() {
        return a;
      }, setValue: function(f) {
        a = "" + f;
      }, stopTracking: function() {
        l._valueTracker = null, delete l[t];
      } };
    }
  }
  function nf(l) {
    if (!l._valueTracker) {
      var t = Gi(l) ? "checked" : "value";
      l._valueTracker = ly(l, t, "" + l[t]);
    }
  }
  function Xi(l) {
    if (!l) return false;
    var t = l._valueTracker;
    if (!t) return true;
    var a = t.getValue(), u = "";
    return l && (u = Gi(l) ? l.checked ? "true" : "false" : l.value), l = u, l !== a ? (t.setValue(l), true) : false;
  }
  function je(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var ty = /[\n"\\]/g;
  function dt(l) {
    return l.replace(ty, function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function ff(l, t, a, u, e, n, f, c) {
    l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + ot(t)) : l.value !== "" + ot(t) && (l.value = "" + ot(t)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), t != null ? cf(l, f, ot(t)) : a != null ? cf(l, f, ot(a)) : u != null && l.removeAttribute("value"), e == null && n != null && (l.defaultChecked = !!n), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + ot(c) : l.removeAttribute("name");
  }
  function Qi(l, t, a, u, e, n, f, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || a != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        nf(l);
        return;
      }
      a = a != null ? "" + ot(a) : "", t = t != null ? "" + ot(t) : a, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    u = u ?? e, u = typeof u != "function" && typeof u != "symbol" && !!u, l.checked = c ? l.checked : !!u, l.defaultChecked = !!u, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f), nf(l);
  }
  function cf(l, t, a) {
    t === "number" && je(l.ownerDocument) === l || l.defaultValue === "" + a || (l.defaultValue = "" + a);
  }
  function Wa(l, t, a, u) {
    if (l = l.options, t) {
      t = {};
      for (var e = 0; e < a.length; e++) t["$" + a[e]] = true;
      for (a = 0; a < l.length; a++) e = t.hasOwnProperty("$" + l[a].value), l[a].selected !== e && (l[a].selected = e), e && u && (l[a].defaultSelected = true);
    } else {
      for (a = "" + ot(a), t = null, e = 0; e < l.length; e++) {
        if (l[e].value === a) {
          l[e].selected = true, u && (l[e].defaultSelected = true);
          return;
        }
        t !== null || l[e].disabled || (t = l[e]);
      }
      t !== null && (t.selected = true);
    }
  }
  function Zi(l, t, a) {
    if (t != null && (t = "" + ot(t), t !== l.value && (l.value = t), a == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = a != null ? "" + ot(a) : "";
  }
  function Li(l, t, a, u) {
    if (t == null) {
      if (u != null) {
        if (a != null) throw Error(y(92));
        if (zt(u)) {
          if (1 < u.length) throw Error(y(93));
          u = u[0];
        }
        a = u;
      }
      a == null && (a = ""), t = a;
    }
    a = ot(t), l.defaultValue = a, u = l.textContent, u === a && u !== "" && u !== null && (l.value = u), nf(l);
  }
  function $a(l, t) {
    if (t) {
      var a = l.firstChild;
      if (a && a === l.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var ay = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function Vi(l, t, a) {
    var u = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? u ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : u ? l.setProperty(t, a) : typeof a != "number" || a === 0 || ay.has(t) ? t === "float" ? l.cssFloat = a : l[t] = ("" + a).trim() : l[t] = a + "px";
  }
  function Ki(l, t, a) {
    if (t != null && typeof t != "object") throw Error(y(62));
    if (l = l.style, a != null) {
      for (var u in a) !a.hasOwnProperty(u) || t != null && t.hasOwnProperty(u) || (u.indexOf("--") === 0 ? l.setProperty(u, "") : u === "float" ? l.cssFloat = "" : l[u] = "");
      for (var e in t) u = t[e], t.hasOwnProperty(e) && a[e] !== u && Vi(l, e, u);
    } else for (var n in t) t.hasOwnProperty(n) && Vi(l, n, t[n]);
  }
  function sf(l) {
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
  var uy = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), ey = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Be(l) {
    return ey.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Ct() {
  }
  var of = null;
  function df(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Fa = null, ka = null;
  function Ji(l) {
    var t = Ka(l);
    if (t && (l = t.stateNode)) {
      var a = l[wl] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (ff(l, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name), t = a.name, a.type === "radio" && t != null) {
            for (a = l; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll('input[name="' + dt("" + t) + '"][type="radio"]'), t = 0; t < a.length; t++) {
              var u = a[t];
              if (u !== l && u.form === l.form) {
                var e = u[wl] || null;
                if (!e) throw Error(y(90));
                ff(u, e.value, e.defaultValue, e.defaultValue, e.checked, e.defaultChecked, e.type, e.name);
              }
            }
            for (t = 0; t < a.length; t++) u = a[t], u.form === l.form && Xi(u);
          }
          break l;
        case "textarea":
          Zi(l, a.value, a.defaultValue);
          break l;
        case "select":
          t = a.value, t != null && Wa(l, !!a.multiple, t, false);
      }
    }
  }
  var yf = false;
  function wi(l, t, a) {
    if (yf) return l(t, a);
    yf = true;
    try {
      var u = l(t);
      return u;
    } finally {
      if (yf = false, (Fa !== null || ka !== null) && (pn(), Fa && (t = Fa, l = ka, ka = Fa = null, Ji(t), l))) for (t = 0; t < l.length; t++) Ji(l[t]);
    }
  }
  function Cu(l, t) {
    var a = l.stateNode;
    if (a === null) return null;
    var u = a[wl] || null;
    if (u === null) return null;
    a = u[t];
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
        (u = !u.disabled) || (l = l.type, u = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !u;
        break l;
      default:
        l = false;
    }
    if (l) return null;
    if (a && typeof a != "function") throw Error(y(231, t, typeof a));
    return a;
  }
  var qt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), mf = false;
  if (qt) try {
    var qu = {};
    Object.defineProperty(qu, "passive", { get: function() {
      mf = true;
    } }), window.addEventListener("test", qu, qu), window.removeEventListener("test", qu, qu);
  } catch {
    mf = false;
  }
  var Pt = null, vf = null, Ye = null;
  function Wi() {
    if (Ye) return Ye;
    var l, t = vf, a = t.length, u, e = "value" in Pt ? Pt.value : Pt.textContent, n = e.length;
    for (l = 0; l < a && t[l] === e[l]; l++) ;
    var f = a - l;
    for (u = 1; u <= f && t[a - u] === e[n - u]; u++) ;
    return Ye = e.slice(l, 1 < u ? 1 - u : void 0);
  }
  function Ge(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Xe() {
    return true;
  }
  function $i() {
    return false;
  }
  function Wl(l) {
    function t(a, u, e, n, f) {
      this._reactName = a, this._targetInst = e, this.type = u, this.nativeEvent = n, this.target = f, this.currentTarget = null;
      for (var c in l) l.hasOwnProperty(c) && (a = l[c], this[c] = a ? a(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === false) ? Xe : $i, this.isPropagationStopped = $i, this;
    }
    return q(t.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var a = this.nativeEvent;
      a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = false), this.isDefaultPrevented = Xe);
    }, stopPropagation: function() {
      var a = this.nativeEvent;
      a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = true), this.isPropagationStopped = Xe);
    }, persist: function() {
    }, isPersistent: Xe }), t;
  }
  var Oa = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(l) {
    return l.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Qe = Wl(Oa), ju = q({}, Oa, { view: 0, detail: 0 }), ny = Wl(ju), hf, rf, Bu, Ze = q({}, ju, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: bf, button: 0, buttons: 0, relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  }, movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== Bu && (Bu && l.type === "mousemove" ? (hf = l.screenX - Bu.screenX, rf = l.screenY - Bu.screenY) : rf = hf = 0, Bu = l), hf);
  }, movementY: function(l) {
    return "movementY" in l ? l.movementY : rf;
  } }), Fi = Wl(Ze), fy = q({}, Ze, { dataTransfer: 0 }), cy = Wl(fy), iy = q({}, ju, { relatedTarget: 0 }), gf = Wl(iy), sy = q({}, Oa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), oy = Wl(sy), dy = q({}, Oa, { clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  } }), yy = Wl(dy), my = q({}, Oa, { data: 0 }), ki = Wl(my), vy = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, hy = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, ry = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function gy(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = ry[l]) ? !!t[l] : false;
  }
  function bf() {
    return gy;
  }
  var by = q({}, ju, { key: function(l) {
    if (l.key) {
      var t = vy[l.key] || l.key;
      if (t !== "Unidentified") return t;
    }
    return l.type === "keypress" ? (l = Ge(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? hy[l.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: bf, charCode: function(l) {
    return l.type === "keypress" ? Ge(l) : 0;
  }, keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }, which: function(l) {
    return l.type === "keypress" ? Ge(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  } }), Sy = Wl(by), _y = q({}, Ze, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ii = Wl(_y), zy = q({}, ju, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: bf }), Ty = Wl(zy), Ey = q({}, Oa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Ay = Wl(Ey), py = q({}, Ze, { deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  }, deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), Oy = Wl(py), My = q({}, Oa, { newState: 0, oldState: 0 }), Dy = Wl(My), Uy = [9, 13, 27, 32], Sf = qt && "CompositionEvent" in window, Yu = null;
  qt && "documentMode" in document && (Yu = document.documentMode);
  var Ny = qt && "TextEvent" in window && !Yu, Pi = qt && (!Sf || Yu && 8 < Yu && 11 >= Yu), ls = " ", ts = false;
  function as(l, t) {
    switch (l) {
      case "keyup":
        return Uy.indexOf(t.keyCode) !== -1;
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
  function us(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Ia = false;
  function Hy(l, t) {
    switch (l) {
      case "compositionend":
        return us(t);
      case "keypress":
        return t.which !== 32 ? null : (ts = true, ls);
      case "textInput":
        return l = t.data, l === ls && ts ? null : l;
      default:
        return null;
    }
  }
  function xy(l, t) {
    if (Ia) return l === "compositionend" || !Sf && as(l, t) ? (l = Wi(), Ye = vf = Pt = null, Ia = false, l) : null;
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
        return Pi && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Ry = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function es(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Ry[l.type] : t === "textarea";
  }
  function ns(l, t, a, u) {
    Fa ? ka ? ka.push(u) : ka = [u] : Fa = u, t = xn(t, "onChange"), 0 < t.length && (a = new Qe("onChange", "change", null, a, u), l.push({ event: a, listeners: t }));
  }
  var Gu = null, Xu = null;
  function Cy(l) {
    Zo(l, 0);
  }
  function Le(l) {
    var t = Ru(l);
    if (Xi(t)) return l;
  }
  function fs(l, t) {
    if (l === "change") return t;
  }
  var cs = false;
  if (qt) {
    var _f;
    if (qt) {
      var zf = "oninput" in document;
      if (!zf) {
        var is = document.createElement("div");
        is.setAttribute("oninput", "return;"), zf = typeof is.oninput == "function";
      }
      _f = zf;
    } else _f = false;
    cs = _f && (!document.documentMode || 9 < document.documentMode);
  }
  function ss() {
    Gu && (Gu.detachEvent("onpropertychange", os), Xu = Gu = null);
  }
  function os(l) {
    if (l.propertyName === "value" && Le(Xu)) {
      var t = [];
      ns(t, Xu, l, df(l)), wi(Cy, t);
    }
  }
  function qy(l, t, a) {
    l === "focusin" ? (ss(), Gu = t, Xu = a, Gu.attachEvent("onpropertychange", os)) : l === "focusout" && ss();
  }
  function jy(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown") return Le(Xu);
  }
  function By(l, t) {
    if (l === "click") return Le(t);
  }
  function Yy(l, t) {
    if (l === "input" || l === "change") return Le(t);
  }
  function Gy(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var ut = typeof Object.is == "function" ? Object.is : Gy;
  function Qu(l, t) {
    if (ut(l, t)) return true;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null) return false;
    var a = Object.keys(l), u = Object.keys(t);
    if (a.length !== u.length) return false;
    for (u = 0; u < a.length; u++) {
      var e = a[u];
      if (!kn.call(t, e) || !ut(l[e], t[e])) return false;
    }
    return true;
  }
  function ds(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function ys(l, t) {
    var a = ds(l);
    l = 0;
    for (var u; a; ) {
      if (a.nodeType === 3) {
        if (u = l + a.textContent.length, l <= t && u >= t) return { node: a, offset: t - l };
        l = u;
      }
      l: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break l;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = ds(a);
    }
  }
  function ms(l, t) {
    return l && t ? l === t ? true : l && l.nodeType === 3 ? false : t && t.nodeType === 3 ? ms(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : false : false;
  }
  function vs(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = je(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = false;
      }
      if (a) l = t.contentWindow;
      else break;
      t = je(l.document);
    }
    return t;
  }
  function Tf(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Xy = qt && "documentMode" in document && 11 >= document.documentMode, Pa = null, Ef = null, Zu = null, Af = false;
  function hs(l, t, a) {
    var u = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Af || Pa == null || Pa !== je(u) || (u = Pa, "selectionStart" in u && Tf(u) ? u = { start: u.selectionStart, end: u.selectionEnd } : (u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection(), u = { anchorNode: u.anchorNode, anchorOffset: u.anchorOffset, focusNode: u.focusNode, focusOffset: u.focusOffset }), Zu && Qu(Zu, u) || (Zu = u, u = xn(Ef, "onSelect"), 0 < u.length && (t = new Qe("onSelect", "select", null, t, a), l.push({ event: t, listeners: u }), t.target = Pa)));
  }
  function Ma(l, t) {
    var a = {};
    return a[l.toLowerCase()] = t.toLowerCase(), a["Webkit" + l] = "webkit" + t, a["Moz" + l] = "moz" + t, a;
  }
  var lu = { animationend: Ma("Animation", "AnimationEnd"), animationiteration: Ma("Animation", "AnimationIteration"), animationstart: Ma("Animation", "AnimationStart"), transitionrun: Ma("Transition", "TransitionRun"), transitionstart: Ma("Transition", "TransitionStart"), transitioncancel: Ma("Transition", "TransitionCancel"), transitionend: Ma("Transition", "TransitionEnd") }, pf = {}, rs = {};
  qt && (rs = document.createElement("div").style, "AnimationEvent" in window || (delete lu.animationend.animation, delete lu.animationiteration.animation, delete lu.animationstart.animation), "TransitionEvent" in window || delete lu.transitionend.transition);
  function Da(l) {
    if (pf[l]) return pf[l];
    if (!lu[l]) return l;
    var t = lu[l], a;
    for (a in t) if (t.hasOwnProperty(a) && a in rs) return pf[l] = t[a];
    return l;
  }
  var gs = Da("animationend"), bs = Da("animationiteration"), Ss = Da("animationstart"), Qy = Da("transitionrun"), Zy = Da("transitionstart"), Ly = Da("transitioncancel"), _s = Da("transitionend"), zs = /* @__PURE__ */ new Map(), Of = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  Of.push("scrollEnd");
  function Tt(l, t) {
    zs.set(l, t), pa(t, [l]);
  }
  var Ve = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l), error: l });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, yt = [], tu = 0, Mf = 0;
  function Ke() {
    for (var l = tu, t = Mf = tu = 0; t < l; ) {
      var a = yt[t];
      yt[t++] = null;
      var u = yt[t];
      yt[t++] = null;
      var e = yt[t];
      yt[t++] = null;
      var n = yt[t];
      if (yt[t++] = null, u !== null && e !== null) {
        var f = u.pending;
        f === null ? e.next = e : (e.next = f.next, f.next = e), u.pending = e;
      }
      n !== 0 && Ts(a, e, n);
    }
  }
  function Je(l, t, a, u) {
    yt[tu++] = l, yt[tu++] = t, yt[tu++] = a, yt[tu++] = u, Mf |= u, l.lanes |= u, l = l.alternate, l !== null && (l.lanes |= u);
  }
  function Df(l, t, a, u) {
    return Je(l, t, a, u), we(l);
  }
  function Ua(l, t) {
    return Je(l, null, null, t), we(l);
  }
  function Ts(l, t, a) {
    l.lanes |= a;
    var u = l.alternate;
    u !== null && (u.lanes |= a);
    for (var e = false, n = l.return; n !== null; ) n.childLanes |= a, u = n.alternate, u !== null && (u.childLanes |= a), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (e = true)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, e && t !== null && (e = 31 - at(a), l = n.hiddenUpdates, u = l[e], u === null ? l[e] = [t] : u.push(t), t.lane = a | 536870912), n) : null;
  }
  function we(l) {
    if (50 < oe) throw oe = 0, Bc = null, Error(y(185));
    for (var t = l.return; t !== null; ) l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var au = {};
  function Vy(l, t, a, u) {
    this.tag = l, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = u, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function et(l, t, a, u) {
    return new Vy(l, t, a, u);
  }
  function Uf(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function jt(l, t) {
    var a = l.alternate;
    return a === null ? (a = et(l.tag, t, l.key, l.mode), a.elementType = l.elementType, a.type = l.type, a.stateNode = l.stateNode, a.alternate = l, l.alternate = a) : (a.pendingProps = t, a.type = l.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = l.flags & 65011712, a.childLanes = l.childLanes, a.lanes = l.lanes, a.child = l.child, a.memoizedProps = l.memoizedProps, a.memoizedState = l.memoizedState, a.updateQueue = l.updateQueue, t = l.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = l.sibling, a.index = l.index, a.ref = l.ref, a.refCleanup = l.refCleanup, a;
  }
  function Es(l, t) {
    l.flags &= 65011714;
    var a = l.alternate;
    return a === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = a.childLanes, l.lanes = a.lanes, l.child = a.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = a.memoizedProps, l.memoizedState = a.memoizedState, l.updateQueue = a.updateQueue, l.type = a.type, t = a.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), l;
  }
  function We(l, t, a, u, e, n) {
    var f = 0;
    if (u = l, typeof l == "function") Uf(l) && (f = 1);
    else if (typeof l == "string") f = $m(l, a, N.current) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else l: switch (l) {
      case Ot:
        return l = et(31, a, t, e), l.elementType = Ot, l.lanes = n, l;
      case Ml:
        return Na(a.children, e, n, t);
      case _t:
        f = 8, e |= 24;
        break;
      case Gl:
        return l = et(12, a, t, e | 2), l.elementType = Gl, l.lanes = n, l;
      case Vl:
        return l = et(13, a, t, e), l.elementType = Vl, l.lanes = n, l;
      case Bl:
        return l = et(19, a, t, e), l.elementType = Bl, l.lanes = n, l;
      default:
        if (typeof l == "object" && l !== null) switch (l.$$typeof) {
          case yl:
            f = 10;
            break l;
          case hl:
            f = 9;
            break l;
          case Ll:
            f = 11;
            break l;
          case F:
            f = 14;
            break l;
          case Kl:
            f = 16, u = null;
            break l;
        }
        f = 29, a = Error(y(130, l === null ? "null" : typeof l, "")), u = null;
    }
    return t = et(f, a, t, e), t.elementType = l, t.type = u, t.lanes = n, t;
  }
  function Na(l, t, a, u) {
    return l = et(7, l, u, t), l.lanes = a, l;
  }
  function Nf(l, t, a) {
    return l = et(6, l, null, t), l.lanes = a, l;
  }
  function As(l) {
    var t = et(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function Hf(l, t, a) {
    return t = et(4, l.children !== null ? l.children : [], l.key, t), t.lanes = a, t.stateNode = { containerInfo: l.containerInfo, pendingChildren: null, implementation: l.implementation }, t;
  }
  var ps = /* @__PURE__ */ new WeakMap();
  function mt(l, t) {
    if (typeof l == "object" && l !== null) {
      var a = ps.get(l);
      return a !== void 0 ? a : (t = { value: l, source: t, stack: Ai(t) }, ps.set(l, t), t);
    }
    return { value: l, source: t, stack: Ai(t) };
  }
  var uu = [], eu = 0, $e = null, Lu = 0, vt = [], ht = 0, la = null, Dt = 1, Ut = "";
  function Bt(l, t) {
    uu[eu++] = Lu, uu[eu++] = $e, $e = l, Lu = t;
  }
  function Os(l, t, a) {
    vt[ht++] = Dt, vt[ht++] = Ut, vt[ht++] = la, la = l;
    var u = Dt;
    l = Ut;
    var e = 32 - at(u) - 1;
    u &= ~(1 << e), a += 1;
    var n = 32 - at(t) + e;
    if (30 < n) {
      var f = e - e % 5;
      n = (u & (1 << f) - 1).toString(32), u >>= f, e -= f, Dt = 1 << 32 - at(t) + e | a << e | u, Ut = n + l;
    } else Dt = 1 << n | a << e | u, Ut = l;
  }
  function xf(l) {
    l.return !== null && (Bt(l, 1), Os(l, 1, 0));
  }
  function Rf(l) {
    for (; l === $e; ) $e = uu[--eu], uu[eu] = null, Lu = uu[--eu], uu[eu] = null;
    for (; l === la; ) la = vt[--ht], vt[ht] = null, Ut = vt[--ht], vt[ht] = null, Dt = vt[--ht], vt[ht] = null;
  }
  function Ms(l, t) {
    vt[ht++] = Dt, vt[ht++] = Ut, vt[ht++] = la, Dt = t.id, Ut = t.overflow, la = l;
  }
  var Hl = null, ml = null, k = false, ta = null, rt = false, Cf = Error(y(519));
  function aa(l) {
    var t = Error(y(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
    throw Vu(mt(t, l)), Cf;
  }
  function Ds(l) {
    var t = l.stateNode, a = l.type, u = l.memoizedProps;
    switch (t[Nl] = l, t[wl] = u, a) {
      case "dialog":
        J("cancel", t), J("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        J("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ye.length; a++) J(ye[a], t);
        break;
      case "source":
        J("error", t);
        break;
      case "img":
      case "image":
      case "link":
        J("error", t), J("load", t);
        break;
      case "details":
        J("toggle", t);
        break;
      case "input":
        J("invalid", t), Qi(t, u.value, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name, true);
        break;
      case "select":
        J("invalid", t);
        break;
      case "textarea":
        J("invalid", t), Li(t, u.value, u.defaultValue, u.children);
    }
    a = u.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || u.suppressHydrationWarning === true || Jo(t.textContent, a) ? (u.popover != null && (J("beforetoggle", t), J("toggle", t)), u.onScroll != null && J("scroll", t), u.onScrollEnd != null && J("scrollend", t), u.onClick != null && (t.onclick = Ct), t = true) : t = false, t || aa(l, true);
  }
  function Us(l) {
    for (Hl = l.return; Hl; ) switch (Hl.tag) {
      case 5:
      case 31:
      case 13:
        rt = false;
        return;
      case 27:
      case 3:
        rt = true;
        return;
      default:
        Hl = Hl.return;
    }
  }
  function nu(l) {
    if (l !== Hl) return false;
    if (!k) return Us(l), k = true, false;
    var t = l.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = l.type, a = !(a !== "form" && a !== "button") || Ic(l.type, l.memoizedProps)), a = !a), a && ml && aa(l), Us(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(y(317));
      ml = td(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(y(317));
      ml = td(l);
    } else t === 27 ? (t = ml, ra(l.type) ? (l = ui, ui = null, ml = l) : ml = t) : ml = Hl ? bt(l.stateNode.nextSibling) : null;
    return true;
  }
  function Ha() {
    ml = Hl = null, k = false;
  }
  function qf() {
    var l = ta;
    return l !== null && (Il === null ? Il = l : Il.push.apply(Il, l), ta = null), l;
  }
  function Vu(l) {
    ta === null ? ta = [l] : ta.push(l);
  }
  var jf = o(null), xa = null, Yt = null;
  function ua(l, t, a) {
    M(jf, t._currentValue), t._currentValue = a;
  }
  function Gt(l) {
    l._currentValue = jf.current, E(jf);
  }
  function Bf(l, t, a) {
    for (; l !== null; ) {
      var u = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, u !== null && (u.childLanes |= t)) : u !== null && (u.childLanes & t) !== t && (u.childLanes |= t), l === a) break;
      l = l.return;
    }
  }
  function Yf(l, t, a, u) {
    var e = l.child;
    for (e !== null && (e.return = l); e !== null; ) {
      var n = e.dependencies;
      if (n !== null) {
        var f = e.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var c = n;
          n = e;
          for (var i = 0; i < t.length; i++) if (c.context === t[i]) {
            n.lanes |= a, c = n.alternate, c !== null && (c.lanes |= a), Bf(n.return, a, l), u || (f = null);
            break l;
          }
          n = c.next;
        }
      } else if (e.tag === 18) {
        if (f = e.return, f === null) throw Error(y(341));
        f.lanes |= a, n = f.alternate, n !== null && (n.lanes |= a), Bf(f, a, l), f = null;
      } else f = e.child;
      if (f !== null) f.return = e;
      else for (f = e; f !== null; ) {
        if (f === l) {
          f = null;
          break;
        }
        if (e = f.sibling, e !== null) {
          e.return = f.return, f = e;
          break;
        }
        f = f.return;
      }
      e = f;
    }
  }
  function fu(l, t, a, u) {
    l = null;
    for (var e = t, n = false; e !== null; ) {
      if (!n) {
        if ((e.flags & 524288) !== 0) n = true;
        else if ((e.flags & 262144) !== 0) break;
      }
      if (e.tag === 10) {
        var f = e.alternate;
        if (f === null) throw Error(y(387));
        if (f = f.memoizedProps, f !== null) {
          var c = e.type;
          ut(e.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (e === tl.current) {
        if (f = e.alternate, f === null) throw Error(y(387));
        f.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(ge) : l = [ge]);
      }
      e = e.return;
    }
    l !== null && Yf(t, l, a, u), t.flags |= 262144;
  }
  function Fe(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!ut(l.context._currentValue, l.memoizedValue)) return true;
      l = l.next;
    }
    return false;
  }
  function Ra(l) {
    xa = l, Yt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function xl(l) {
    return Ns(xa, l);
  }
  function ke(l, t) {
    return xa === null && Ra(l), Ns(l, t);
  }
  function Ns(l, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Yt === null) {
      if (l === null) throw Error(y(308));
      Yt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Yt = Yt.next = t;
    return a;
  }
  var Ky = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = { aborted: false, addEventListener: function(a, u) {
      l.push(u);
    } };
    this.abort = function() {
      t.aborted = true, l.forEach(function(a) {
        return a();
      });
    };
  }, Jy = h.unstable_scheduleCallback, wy = h.unstable_NormalPriority, Tl = { $$typeof: yl, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function Gf() {
    return { controller: new Ky(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function Ku(l) {
    l.refCount--, l.refCount === 0 && Jy(wy, function() {
      l.controller.abort();
    });
  }
  var Ju = null, Xf = 0, cu = 0, iu = null;
  function Wy(l, t) {
    if (Ju === null) {
      var a = Ju = [];
      Xf = 0, cu = Lc(), iu = { status: "pending", value: void 0, then: function(u) {
        a.push(u);
      } };
    }
    return Xf++, t.then(Hs, Hs), t;
  }
  function Hs() {
    if (--Xf === 0 && Ju !== null) {
      iu !== null && (iu.status = "fulfilled");
      var l = Ju;
      Ju = null, cu = 0, iu = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function $y(l, t) {
    var a = [], u = { status: "pending", value: null, reason: null, then: function(e) {
      a.push(e);
    } };
    return l.then(function() {
      u.status = "fulfilled", u.value = t;
      for (var e = 0; e < a.length; e++) (0, a[e])(t);
    }, function(e) {
      for (u.status = "rejected", u.reason = e, e = 0; e < a.length; e++) (0, a[e])(void 0);
    }), u;
  }
  var xs = S.S;
  S.S = function(l, t) {
    ro = lt(), typeof t == "object" && t !== null && typeof t.then == "function" && Wy(l, t), xs !== null && xs(l, t);
  };
  var Ca = o(null);
  function Qf() {
    var l = Ca.current;
    return l !== null ? l : dl.pooledCache;
  }
  function Ie(l, t) {
    t === null ? M(Ca, Ca.current) : M(Ca, t.pool);
  }
  function Rs() {
    var l = Qf();
    return l === null ? null : { parent: Tl._currentValue, pool: l };
  }
  var su = Error(y(460)), Zf = Error(y(474)), Pe = Error(y(542)), ln = { then: function() {
  } };
  function Cs(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function qs(l, t, a) {
    switch (a = l[a], a === void 0 ? l.push(t) : a !== t && (t.then(Ct, Ct), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Bs(l), l;
      default:
        if (typeof t.status == "string") t.then(Ct, Ct);
        else {
          if (l = dl, l !== null && 100 < l.shellSuspendCounter) throw Error(y(482));
          l = t, l.status = "pending", l.then(function(u) {
            if (t.status === "pending") {
              var e = t;
              e.status = "fulfilled", e.value = u;
            }
          }, function(u) {
            if (t.status === "pending") {
              var e = t;
              e.status = "rejected", e.reason = u;
            }
          });
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Bs(l), l;
        }
        throw ja = t, su;
    }
  }
  function qa(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (ja = a, su) : a;
    }
  }
  var ja = null;
  function js() {
    if (ja === null) throw Error(y(459));
    var l = ja;
    return ja = null, l;
  }
  function Bs(l) {
    if (l === su || l === Pe) throw Error(y(483));
  }
  var ou = null, wu = 0;
  function tn(l) {
    var t = wu;
    return wu += 1, ou === null && (ou = []), qs(ou, l, t);
  }
  function Wu(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function an(l, t) {
    throw t.$$typeof === sl ? Error(y(525)) : (l = Object.prototype.toString.call(t), Error(y(31, l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l)));
  }
  function Ys(l) {
    function t(d, s) {
      if (l) {
        var m = d.deletions;
        m === null ? (d.deletions = [s], d.flags |= 16) : m.push(s);
      }
    }
    function a(d, s) {
      if (!l) return null;
      for (; s !== null; ) t(d, s), s = s.sibling;
      return null;
    }
    function u(d) {
      for (var s = /* @__PURE__ */ new Map(); d !== null; ) d.key !== null ? s.set(d.key, d) : s.set(d.index, d), d = d.sibling;
      return s;
    }
    function e(d, s) {
      return d = jt(d, s), d.index = 0, d.sibling = null, d;
    }
    function n(d, s, m) {
      return d.index = m, l ? (m = d.alternate, m !== null ? (m = m.index, m < s ? (d.flags |= 67108866, s) : m) : (d.flags |= 67108866, s)) : (d.flags |= 1048576, s);
    }
    function f(d) {
      return l && d.alternate === null && (d.flags |= 67108866), d;
    }
    function c(d, s, m, _) {
      return s === null || s.tag !== 6 ? (s = Nf(m, d.mode, _), s.return = d, s) : (s = e(s, m), s.return = d, s);
    }
    function i(d, s, m, _) {
      var R = m.type;
      return R === Ml ? b(d, s, m.props.children, _, m.key) : s !== null && (s.elementType === R || typeof R == "object" && R !== null && R.$$typeof === Kl && qa(R) === s.type) ? (s = e(s, m.props), Wu(s, m), s.return = d, s) : (s = We(m.type, m.key, m.props, null, d.mode, _), Wu(s, m), s.return = d, s);
    }
    function v(d, s, m, _) {
      return s === null || s.tag !== 4 || s.stateNode.containerInfo !== m.containerInfo || s.stateNode.implementation !== m.implementation ? (s = Hf(m, d.mode, _), s.return = d, s) : (s = e(s, m.children || []), s.return = d, s);
    }
    function b(d, s, m, _, R) {
      return s === null || s.tag !== 7 ? (s = Na(m, d.mode, _, R), s.return = d, s) : (s = e(s, m), s.return = d, s);
    }
    function T(d, s, m) {
      if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint") return s = Nf("" + s, d.mode, m), s.return = d, s;
      if (typeof s == "object" && s !== null) {
        switch (s.$$typeof) {
          case ql:
            return m = We(s.type, s.key, s.props, null, d.mode, m), Wu(m, s), m.return = d, m;
          case jl:
            return s = Hf(s, d.mode, m), s.return = d, s;
          case Kl:
            return s = qa(s), T(d, s, m);
        }
        if (zt(s) || Jl(s)) return s = Na(s, d.mode, m, null), s.return = d, s;
        if (typeof s.then == "function") return T(d, tn(s), m);
        if (s.$$typeof === yl) return T(d, ke(d, s), m);
        an(d, s);
      }
      return null;
    }
    function r(d, s, m, _) {
      var R = s !== null ? s.key : null;
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint") return R !== null ? null : c(d, s, "" + m, _);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case ql:
            return m.key === R ? i(d, s, m, _) : null;
          case jl:
            return m.key === R ? v(d, s, m, _) : null;
          case Kl:
            return m = qa(m), r(d, s, m, _);
        }
        if (zt(m) || Jl(m)) return R !== null ? null : b(d, s, m, _, null);
        if (typeof m.then == "function") return r(d, s, tn(m), _);
        if (m.$$typeof === yl) return r(d, s, ke(d, m), _);
        an(d, m);
      }
      return null;
    }
    function g(d, s, m, _, R) {
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint") return d = d.get(m) || null, c(s, d, "" + _, R);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case ql:
            return d = d.get(_.key === null ? m : _.key) || null, i(s, d, _, R);
          case jl:
            return d = d.get(_.key === null ? m : _.key) || null, v(s, d, _, R);
          case Kl:
            return _ = qa(_), g(d, s, m, _, R);
        }
        if (zt(_) || Jl(_)) return d = d.get(m) || null, b(s, d, _, R, null);
        if (typeof _.then == "function") return g(d, s, m, tn(_), R);
        if (_.$$typeof === yl) return g(d, s, m, ke(s, _), R);
        an(s, _);
      }
      return null;
    }
    function D(d, s, m, _) {
      for (var R = null, I = null, H = s, Q = s = 0, $ = null; H !== null && Q < m.length; Q++) {
        H.index > Q ? ($ = H, H = null) : $ = H.sibling;
        var P = r(d, H, m[Q], _);
        if (P === null) {
          H === null && (H = $);
          break;
        }
        l && H && P.alternate === null && t(d, H), s = n(P, s, Q), I === null ? R = P : I.sibling = P, I = P, H = $;
      }
      if (Q === m.length) return a(d, H), k && Bt(d, Q), R;
      if (H === null) {
        for (; Q < m.length; Q++) H = T(d, m[Q], _), H !== null && (s = n(H, s, Q), I === null ? R = H : I.sibling = H, I = H);
        return k && Bt(d, Q), R;
      }
      for (H = u(H); Q < m.length; Q++) $ = g(H, d, Q, m[Q], _), $ !== null && (l && $.alternate !== null && H.delete($.key === null ? Q : $.key), s = n($, s, Q), I === null ? R = $ : I.sibling = $, I = $);
      return l && H.forEach(function(za) {
        return t(d, za);
      }), k && Bt(d, Q), R;
    }
    function j(d, s, m, _) {
      if (m == null) throw Error(y(151));
      for (var R = null, I = null, H = s, Q = s = 0, $ = null, P = m.next(); H !== null && !P.done; Q++, P = m.next()) {
        H.index > Q ? ($ = H, H = null) : $ = H.sibling;
        var za = r(d, H, P.value, _);
        if (za === null) {
          H === null && (H = $);
          break;
        }
        l && H && za.alternate === null && t(d, H), s = n(za, s, Q), I === null ? R = za : I.sibling = za, I = za, H = $;
      }
      if (P.done) return a(d, H), k && Bt(d, Q), R;
      if (H === null) {
        for (; !P.done; Q++, P = m.next()) P = T(d, P.value, _), P !== null && (s = n(P, s, Q), I === null ? R = P : I.sibling = P, I = P);
        return k && Bt(d, Q), R;
      }
      for (H = u(H); !P.done; Q++, P = m.next()) P = g(H, d, Q, P.value, _), P !== null && (l && P.alternate !== null && H.delete(P.key === null ? Q : P.key), s = n(P, s, Q), I === null ? R = P : I.sibling = P, I = P);
      return l && H.forEach(function(fv) {
        return t(d, fv);
      }), k && Bt(d, Q), R;
    }
    function cl(d, s, m, _) {
      if (typeof m == "object" && m !== null && m.type === Ml && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case ql:
            l: {
              for (var R = m.key; s !== null; ) {
                if (s.key === R) {
                  if (R = m.type, R === Ml) {
                    if (s.tag === 7) {
                      a(d, s.sibling), _ = e(s, m.props.children), _.return = d, d = _;
                      break l;
                    }
                  } else if (s.elementType === R || typeof R == "object" && R !== null && R.$$typeof === Kl && qa(R) === s.type) {
                    a(d, s.sibling), _ = e(s, m.props), Wu(_, m), _.return = d, d = _;
                    break l;
                  }
                  a(d, s);
                  break;
                } else t(d, s);
                s = s.sibling;
              }
              m.type === Ml ? (_ = Na(m.props.children, d.mode, _, m.key), _.return = d, d = _) : (_ = We(m.type, m.key, m.props, null, d.mode, _), Wu(_, m), _.return = d, d = _);
            }
            return f(d);
          case jl:
            l: {
              for (R = m.key; s !== null; ) {
                if (s.key === R) if (s.tag === 4 && s.stateNode.containerInfo === m.containerInfo && s.stateNode.implementation === m.implementation) {
                  a(d, s.sibling), _ = e(s, m.children || []), _.return = d, d = _;
                  break l;
                } else {
                  a(d, s);
                  break;
                }
                else t(d, s);
                s = s.sibling;
              }
              _ = Hf(m, d.mode, _), _.return = d, d = _;
            }
            return f(d);
          case Kl:
            return m = qa(m), cl(d, s, m, _);
        }
        if (zt(m)) return D(d, s, m, _);
        if (Jl(m)) {
          if (R = Jl(m), typeof R != "function") throw Error(y(150));
          return m = R.call(m), j(d, s, m, _);
        }
        if (typeof m.then == "function") return cl(d, s, tn(m), _);
        if (m.$$typeof === yl) return cl(d, s, ke(d, m), _);
        an(d, m);
      }
      return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, s !== null && s.tag === 6 ? (a(d, s.sibling), _ = e(s, m), _.return = d, d = _) : (a(d, s), _ = Nf(m, d.mode, _), _.return = d, d = _), f(d)) : a(d, s);
    }
    return function(d, s, m, _) {
      try {
        wu = 0;
        var R = cl(d, s, m, _);
        return ou = null, R;
      } catch (H) {
        if (H === su || H === Pe) throw H;
        var I = et(29, H, null, d.mode);
        return I.lanes = _, I.return = d, I;
      } finally {
      }
    };
  }
  var Ba = Ys(true), Gs = Ys(false), ea = false;
  function Lf(l) {
    l.updateQueue = { baseState: l.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
  }
  function Vf(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = { baseState: l.baseState, firstBaseUpdate: l.firstBaseUpdate, lastBaseUpdate: l.lastBaseUpdate, shared: l.shared, callbacks: null });
  }
  function na(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function fa(l, t, a) {
    var u = l.updateQueue;
    if (u === null) return null;
    if (u = u.shared, (ll & 2) !== 0) {
      var e = u.pending;
      return e === null ? t.next = t : (t.next = e.next, e.next = t), u.pending = t, t = we(l), Ts(l, null, a), t;
    }
    return Je(l, u, t, a), we(l);
  }
  function $u(l, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var u = t.lanes;
      u &= l.pendingLanes, a |= u, t.lanes = a, Ni(l, a);
    }
  }
  function Kf(l, t) {
    var a = l.updateQueue, u = l.alternate;
    if (u !== null && (u = u.updateQueue, a === u)) {
      var e = null, n = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var f = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          n === null ? e = n = f : n = n.next = f, a = a.next;
        } while (a !== null);
        n === null ? e = n = t : n = n.next = t;
      } else e = n = t;
      a = { baseState: u.baseState, firstBaseUpdate: e, lastBaseUpdate: n, shared: u.shared, callbacks: u.callbacks }, l.updateQueue = a;
      return;
    }
    l = a.lastBaseUpdate, l === null ? a.firstBaseUpdate = t : l.next = t, a.lastBaseUpdate = t;
  }
  var Jf = false;
  function Fu() {
    if (Jf) {
      var l = iu;
      if (l !== null) throw l;
    }
  }
  function ku(l, t, a, u) {
    Jf = false;
    var e = l.updateQueue;
    ea = false;
    var n = e.firstBaseUpdate, f = e.lastBaseUpdate, c = e.shared.pending;
    if (c !== null) {
      e.shared.pending = null;
      var i = c, v = i.next;
      i.next = null, f === null ? n = v : f.next = v, f = i;
      var b = l.alternate;
      b !== null && (b = b.updateQueue, c = b.lastBaseUpdate, c !== f && (c === null ? b.firstBaseUpdate = v : c.next = v, b.lastBaseUpdate = i));
    }
    if (n !== null) {
      var T = e.baseState;
      f = 0, b = v = i = null, c = n;
      do {
        var r = c.lane & -536870913, g = r !== c.lane;
        if (g ? (W & r) === r : (u & r) === r) {
          r !== 0 && r === cu && (Jf = true), b !== null && (b = b.next = { lane: 0, tag: c.tag, payload: c.payload, callback: null, next: null });
          l: {
            var D = l, j = c;
            r = t;
            var cl = a;
            switch (j.tag) {
              case 1:
                if (D = j.payload, typeof D == "function") {
                  T = D.call(cl, T, r);
                  break l;
                }
                T = D;
                break l;
              case 3:
                D.flags = D.flags & -65537 | 128;
              case 0:
                if (D = j.payload, r = typeof D == "function" ? D.call(cl, T, r) : D, r == null) break l;
                T = q({}, T, r);
                break l;
              case 2:
                ea = true;
            }
          }
          r = c.callback, r !== null && (l.flags |= 64, g && (l.flags |= 8192), g = e.callbacks, g === null ? e.callbacks = [r] : g.push(r));
        } else g = { lane: r, tag: c.tag, payload: c.payload, callback: c.callback, next: null }, b === null ? (v = b = g, i = T) : b = b.next = g, f |= r;
        if (c = c.next, c === null) {
          if (c = e.shared.pending, c === null) break;
          g = c, c = g.next, g.next = null, e.lastBaseUpdate = g, e.shared.pending = null;
        }
      } while (true);
      b === null && (i = T), e.baseState = i, e.firstBaseUpdate = v, e.lastBaseUpdate = b, n === null && (e.shared.lanes = 0), da |= f, l.lanes = f, l.memoizedState = T;
    }
  }
  function Xs(l, t) {
    if (typeof l != "function") throw Error(y(191, l));
    l.call(t);
  }
  function Qs(l, t) {
    var a = l.callbacks;
    if (a !== null) for (l.callbacks = null, l = 0; l < a.length; l++) Xs(a[l], t);
  }
  var du = o(null), un = o(0);
  function Zs(l, t) {
    l = Wt, M(un, l), M(du, t), Wt = l | t.baseLanes;
  }
  function wf() {
    M(un, Wt), M(du, du.current);
  }
  function Wf() {
    Wt = un.current, E(du), E(un);
  }
  var nt = o(null), gt = null;
  function ca(l) {
    var t = l.alternate;
    M(_l, _l.current & 1), M(nt, l), gt === null && (t === null || du.current !== null || t.memoizedState !== null) && (gt = l);
  }
  function $f(l) {
    M(_l, _l.current), M(nt, l), gt === null && (gt = l);
  }
  function Ls(l) {
    l.tag === 22 ? (M(_l, _l.current), M(nt, l), gt === null && (gt = l)) : ia();
  }
  function ia() {
    M(_l, _l.current), M(nt, nt.current);
  }
  function ft(l) {
    E(nt), gt === l && (gt = null), E(_l);
  }
  var _l = o(0);
  function en(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || ti(a) || ai(a))) return t;
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
  var Xt = 0, X = null, nl = null, El = null, nn = false, yu = false, Ya = false, fn = 0, Iu = 0, mu = null, Fy = 0;
  function gl() {
    throw Error(y(321));
  }
  function Ff(l, t) {
    if (t === null) return false;
    for (var a = 0; a < t.length && a < l.length; a++) if (!ut(l[a], t[a])) return false;
    return true;
  }
  function kf(l, t, a, u, e, n) {
    return Xt = n, X = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, S.H = l === null || l.memoizedState === null ? O0 : yc, Ya = false, n = a(u, e), Ya = false, yu && (n = Ks(t, a, u, e)), Vs(l), n;
  }
  function Vs(l) {
    S.H = te;
    var t = nl !== null && nl.next !== null;
    if (Xt = 0, El = nl = X = null, nn = false, Iu = 0, mu = null, t) throw Error(y(300));
    l === null || Al || (l = l.dependencies, l !== null && Fe(l) && (Al = true));
  }
  function Ks(l, t, a, u) {
    X = l;
    var e = 0;
    do {
      if (yu && (mu = null), Iu = 0, yu = false, 25 <= e) throw Error(y(301));
      if (e += 1, El = nl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      S.H = M0, n = t(a, u);
    } while (yu);
    return n;
  }
  function ky() {
    var l = S.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Pu(t) : t, l = l.useState()[0], (nl !== null ? nl.memoizedState : null) !== l && (X.flags |= 1024), t;
  }
  function If() {
    var l = fn !== 0;
    return fn = 0, l;
  }
  function Pf(l, t, a) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~a;
  }
  function lc(l) {
    if (nn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      nn = false;
    }
    Xt = 0, El = nl = X = null, yu = false, Iu = fn = 0, mu = null;
  }
  function Ql() {
    var l = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return El === null ? X.memoizedState = El = l : El = El.next = l, El;
  }
  function zl() {
    if (nl === null) {
      var l = X.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = nl.next;
    var t = El === null ? X.memoizedState : El.next;
    if (t !== null) El = t, nl = l;
    else {
      if (l === null) throw X.alternate === null ? Error(y(467)) : Error(y(310));
      nl = l, l = { memoizedState: nl.memoizedState, baseState: nl.baseState, baseQueue: nl.baseQueue, queue: nl.queue, next: null }, El === null ? X.memoizedState = El = l : El = El.next = l;
    }
    return El;
  }
  function cn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pu(l) {
    var t = Iu;
    return Iu += 1, mu === null && (mu = []), l = qs(mu, l, t), t = X, (El === null ? t.memoizedState : El.next) === null && (t = t.alternate, S.H = t === null || t.memoizedState === null ? O0 : yc), l;
  }
  function sn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Pu(l);
      if (l.$$typeof === yl) return xl(l);
    }
    throw Error(y(438, String(l)));
  }
  function tc(l) {
    var t = null, a = X.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var u = X.alternate;
      u !== null && (u = u.updateQueue, u !== null && (u = u.memoCache, u != null && (t = { data: u.data.map(function(e) {
        return e.slice();
      }), index: 0 })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = cn(), X.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0) for (a = t.data[t.index] = Array(l), u = 0; u < l; u++) a[u] = Za;
    return t.index++, a;
  }
  function Qt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function on(l) {
    var t = zl();
    return ac(t, nl, l);
  }
  function ac(l, t, a) {
    var u = l.queue;
    if (u === null) throw Error(y(311));
    u.lastRenderedReducer = a;
    var e = l.baseQueue, n = u.pending;
    if (n !== null) {
      if (e !== null) {
        var f = e.next;
        e.next = n.next, n.next = f;
      }
      t.baseQueue = e = n, u.pending = null;
    }
    if (n = l.baseState, e === null) l.memoizedState = n;
    else {
      t = e.next;
      var c = f = null, i = null, v = t, b = false;
      do {
        var T = v.lane & -536870913;
        if (T !== v.lane ? (W & T) === T : (Xt & T) === T) {
          var r = v.revertLane;
          if (r === 0) i !== null && (i = i.next = { lane: 0, revertLane: 0, gesture: null, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }), T === cu && (b = true);
          else if ((Xt & r) === r) {
            v = v.next, r === cu && (b = true);
            continue;
          } else T = { lane: 0, revertLane: v.revertLane, gesture: null, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }, i === null ? (c = i = T, f = n) : i = i.next = T, X.lanes |= r, da |= r;
          T = v.action, Ya && a(n, T), n = v.hasEagerState ? v.eagerState : a(n, T);
        } else r = { lane: T, revertLane: v.revertLane, gesture: v.gesture, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }, i === null ? (c = i = r, f = n) : i = i.next = r, X.lanes |= T, da |= T;
        v = v.next;
      } while (v !== null && v !== t);
      if (i === null ? f = n : i.next = c, !ut(n, l.memoizedState) && (Al = true, b && (a = iu, a !== null))) throw a;
      l.memoizedState = n, l.baseState = f, l.baseQueue = i, u.lastRenderedState = n;
    }
    return e === null && (u.lanes = 0), [l.memoizedState, u.dispatch];
  }
  function uc(l) {
    var t = zl(), a = t.queue;
    if (a === null) throw Error(y(311));
    a.lastRenderedReducer = l;
    var u = a.dispatch, e = a.pending, n = t.memoizedState;
    if (e !== null) {
      a.pending = null;
      var f = e = e.next;
      do
        n = l(n, f.action), f = f.next;
      while (f !== e);
      ut(n, t.memoizedState) || (Al = true), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), a.lastRenderedState = n;
    }
    return [n, u];
  }
  function Js(l, t, a) {
    var u = X, e = zl(), n = k;
    if (n) {
      if (a === void 0) throw Error(y(407));
      a = a();
    } else a = t();
    var f = !ut((nl || e).memoizedState, a);
    if (f && (e.memoizedState = a, Al = true), e = e.queue, fc($s.bind(null, u, e, l), [l]), e.getSnapshot !== t || f || El !== null && El.memoizedState.tag & 1) {
      if (u.flags |= 2048, vu(9, { destroy: void 0 }, Ws.bind(null, u, e, a, t), null), dl === null) throw Error(y(349));
      n || (Xt & 127) !== 0 || ws(u, t, a);
    }
    return a;
  }
  function ws(l, t, a) {
    l.flags |= 16384, l = { getSnapshot: t, value: a }, t = X.updateQueue, t === null ? (t = cn(), X.updateQueue = t, t.stores = [l]) : (a = t.stores, a === null ? t.stores = [l] : a.push(l));
  }
  function Ws(l, t, a, u) {
    t.value = a, t.getSnapshot = u, Fs(t) && ks(l);
  }
  function $s(l, t, a) {
    return a(function() {
      Fs(t) && ks(l);
    });
  }
  function Fs(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var a = t();
      return !ut(l, a);
    } catch {
      return true;
    }
  }
  function ks(l) {
    var t = Ua(l, 2);
    t !== null && Pl(t, l, 2);
  }
  function ec(l) {
    var t = Ql();
    if (typeof l == "function") {
      var a = l;
      if (l = a(), Ya) {
        kt(true);
        try {
          a();
        } finally {
          kt(false);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Qt, lastRenderedState: l }, t;
  }
  function Is(l, t, a, u) {
    return l.baseState = a, ac(l, nl, typeof u == "function" ? u : Qt);
  }
  function Iy(l, t, a, u, e) {
    if (mn(l)) throw Error(y(485));
    if (l = t.action, l !== null) {
      var n = { payload: e, action: l, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(f) {
        n.listeners.push(f);
      } };
      S.T !== null ? a(true) : n.isTransition = false, u(n), a = t.pending, a === null ? (n.next = t.pending = n, Ps(t, n)) : (n.next = a.next, t.pending = a.next = n);
    }
  }
  function Ps(l, t) {
    var a = t.action, u = t.payload, e = l.state;
    if (t.isTransition) {
      var n = S.T, f = {};
      S.T = f;
      try {
        var c = a(e, u), i = S.S;
        i !== null && i(f, c), l0(l, t, c);
      } catch (v) {
        nc(l, t, v);
      } finally {
        n !== null && f.types !== null && (n.types = f.types), S.T = n;
      }
    } else try {
      n = a(e, u), l0(l, t, n);
    } catch (v) {
      nc(l, t, v);
    }
  }
  function l0(l, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(u) {
      t0(l, t, u);
    }, function(u) {
      return nc(l, t, u);
    }) : t0(l, t, a);
  }
  function t0(l, t, a) {
    t.status = "fulfilled", t.value = a, a0(t), l.state = a, t = l.pending, t !== null && (a = t.next, a === t ? l.pending = null : (a = a.next, t.next = a, Ps(l, a)));
  }
  function nc(l, t, a) {
    var u = l.pending;
    if (l.pending = null, u !== null) {
      u = u.next;
      do
        t.status = "rejected", t.reason = a, a0(t), t = t.next;
      while (t !== u);
    }
    l.action = null;
  }
  function a0(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function u0(l, t) {
    return t;
  }
  function e0(l, t) {
    if (k) {
      var a = dl.formState;
      if (a !== null) {
        l: {
          var u = X;
          if (k) {
            if (ml) {
              t: {
                for (var e = ml, n = rt; e.nodeType !== 8; ) {
                  if (!n) {
                    e = null;
                    break t;
                  }
                  if (e = bt(e.nextSibling), e === null) {
                    e = null;
                    break t;
                  }
                }
                n = e.data, e = n === "F!" || n === "F" ? e : null;
              }
              if (e) {
                ml = bt(e.nextSibling), u = e.data === "F!";
                break l;
              }
            }
            aa(u);
          }
          u = false;
        }
        u && (t = a[0]);
      }
    }
    return a = Ql(), a.memoizedState = a.baseState = t, u = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: u0, lastRenderedState: t }, a.queue = u, a = E0.bind(null, X, u), u.dispatch = a, u = ec(false), n = dc.bind(null, X, false, u.queue), u = Ql(), e = { state: t, dispatch: null, action: l, pending: null }, u.queue = e, a = Iy.bind(null, X, e, n, a), e.dispatch = a, u.memoizedState = l, [t, a, false];
  }
  function n0(l) {
    var t = zl();
    return f0(t, nl, l);
  }
  function f0(l, t, a) {
    if (t = ac(l, t, u0)[0], l = on(Qt)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var u = Pu(t);
    } catch (f) {
      throw f === su ? Pe : f;
    }
    else u = t;
    t = zl();
    var e = t.queue, n = e.dispatch;
    return a !== t.memoizedState && (X.flags |= 2048, vu(9, { destroy: void 0 }, Py.bind(null, e, a), null)), [u, n, l];
  }
  function Py(l, t) {
    l.action = t;
  }
  function c0(l) {
    var t = zl(), a = nl;
    if (a !== null) return f0(t, a, l);
    zl(), t = t.memoizedState, a = zl();
    var u = a.queue.dispatch;
    return a.memoizedState = l, [t, u, false];
  }
  function vu(l, t, a, u) {
    return l = { tag: l, create: a, deps: u, inst: t, next: null }, t = X.updateQueue, t === null && (t = cn(), X.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = l.next = l : (u = a.next, a.next = l, l.next = u, t.lastEffect = l), l;
  }
  function i0() {
    return zl().memoizedState;
  }
  function dn(l, t, a, u) {
    var e = Ql();
    X.flags |= l, e.memoizedState = vu(1 | t, { destroy: void 0 }, a, u === void 0 ? null : u);
  }
  function yn(l, t, a, u) {
    var e = zl();
    u = u === void 0 ? null : u;
    var n = e.memoizedState.inst;
    nl !== null && u !== null && Ff(u, nl.memoizedState.deps) ? e.memoizedState = vu(t, n, a, u) : (X.flags |= l, e.memoizedState = vu(1 | t, n, a, u));
  }
  function s0(l, t) {
    dn(8390656, 8, l, t);
  }
  function fc(l, t) {
    yn(2048, 8, l, t);
  }
  function lm(l) {
    X.flags |= 4;
    var t = X.updateQueue;
    if (t === null) t = cn(), X.updateQueue = t, t.events = [l];
    else {
      var a = t.events;
      a === null ? t.events = [l] : a.push(l);
    }
  }
  function o0(l) {
    var t = zl().memoizedState;
    return lm({ ref: t, nextImpl: l }), function() {
      if ((ll & 2) !== 0) throw Error(y(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function d0(l, t) {
    return yn(4, 2, l, t);
  }
  function y0(l, t) {
    return yn(4, 4, l, t);
  }
  function m0(l, t) {
    if (typeof t == "function") {
      l = l();
      var a = t(l);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null) return l = l(), t.current = l, function() {
      t.current = null;
    };
  }
  function v0(l, t, a) {
    a = a != null ? a.concat([l]) : null, yn(4, 4, m0.bind(null, t, l), a);
  }
  function cc() {
  }
  function h0(l, t) {
    var a = zl();
    t = t === void 0 ? null : t;
    var u = a.memoizedState;
    return t !== null && Ff(t, u[1]) ? u[0] : (a.memoizedState = [l, t], l);
  }
  function r0(l, t) {
    var a = zl();
    t = t === void 0 ? null : t;
    var u = a.memoizedState;
    if (t !== null && Ff(t, u[1])) return u[0];
    if (u = l(), Ya) {
      kt(true);
      try {
        l();
      } finally {
        kt(false);
      }
    }
    return a.memoizedState = [u, t], u;
  }
  function ic(l, t, a) {
    return a === void 0 || (Xt & 1073741824) !== 0 && (W & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = a, l = bo(), X.lanes |= l, da |= l, a);
  }
  function g0(l, t, a, u) {
    return ut(a, t) ? a : du.current !== null ? (l = ic(l, a, u), ut(l, t) || (Al = true), l) : (Xt & 42) === 0 || (Xt & 1073741824) !== 0 && (W & 261930) === 0 ? (Al = true, l.memoizedState = a) : (l = bo(), X.lanes |= l, da |= l, t);
  }
  function b0(l, t, a, u, e) {
    var n = O.p;
    O.p = n !== 0 && 8 > n ? n : 8;
    var f = S.T, c = {};
    S.T = c, dc(l, false, t, a);
    try {
      var i = e(), v = S.S;
      if (v !== null && v(c, i), i !== null && typeof i == "object" && typeof i.then == "function") {
        var b = $y(i, u);
        le(l, t, b, st(l));
      } else le(l, t, u, st(l));
    } catch (T) {
      le(l, t, { then: function() {
      }, status: "rejected", reason: T }, st());
    } finally {
      O.p = n, f !== null && c.types !== null && (f.types = c.types), S.T = f;
    }
  }
  function tm() {
  }
  function sc(l, t, a, u) {
    if (l.tag !== 5) throw Error(y(476));
    var e = S0(l).queue;
    b0(l, e, t, B, a === null ? tm : function() {
      return _0(l), a(u);
    });
  }
  function S0(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = { memoizedState: B, baseState: B, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Qt, lastRenderedState: B }, next: null };
    var a = {};
    return t.next = { memoizedState: a, baseState: a, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Qt, lastRenderedState: a }, next: null }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function _0(l) {
    var t = S0(l);
    t.next === null && (t = l.alternate.memoizedState), le(l, t.next.queue, {}, st());
  }
  function oc() {
    return xl(ge);
  }
  function z0() {
    return zl().memoizedState;
  }
  function T0() {
    return zl().memoizedState;
  }
  function am(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = st();
          l = na(a);
          var u = fa(t, l, a);
          u !== null && (Pl(u, t, a), $u(u, t, a)), t = { cache: Gf() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function um(l, t, a) {
    var u = st();
    a = { lane: u, revertLane: 0, gesture: null, action: a, hasEagerState: false, eagerState: null, next: null }, mn(l) ? A0(t, a) : (a = Df(l, t, a, u), a !== null && (Pl(a, l, u), p0(a, t, u)));
  }
  function E0(l, t, a) {
    var u = st();
    le(l, t, a, u);
  }
  function le(l, t, a, u) {
    var e = { lane: u, revertLane: 0, gesture: null, action: a, hasEagerState: false, eagerState: null, next: null };
    if (mn(l)) A0(t, e);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null)) try {
        var f = t.lastRenderedState, c = n(f, a);
        if (e.hasEagerState = true, e.eagerState = c, ut(c, f)) return Je(l, t, e, 0), dl === null && Ke(), false;
      } catch {
      } finally {
      }
      if (a = Df(l, t, e, u), a !== null) return Pl(a, l, u), p0(a, t, u), true;
    }
    return false;
  }
  function dc(l, t, a, u) {
    if (u = { lane: 2, revertLane: Lc(), gesture: null, action: u, hasEagerState: false, eagerState: null, next: null }, mn(l)) {
      if (t) throw Error(y(479));
    } else t = Df(l, a, u, 2), t !== null && Pl(t, l, 2);
  }
  function mn(l) {
    var t = l.alternate;
    return l === X || t !== null && t === X;
  }
  function A0(l, t) {
    yu = nn = true;
    var a = l.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t;
  }
  function p0(l, t, a) {
    if ((a & 4194048) !== 0) {
      var u = t.lanes;
      u &= l.pendingLanes, a |= u, t.lanes = a, Ni(l, a);
    }
  }
  var te = { readContext: xl, use: sn, useCallback: gl, useContext: gl, useEffect: gl, useImperativeHandle: gl, useLayoutEffect: gl, useInsertionEffect: gl, useMemo: gl, useReducer: gl, useRef: gl, useState: gl, useDebugValue: gl, useDeferredValue: gl, useTransition: gl, useSyncExternalStore: gl, useId: gl, useHostTransitionStatus: gl, useFormState: gl, useActionState: gl, useOptimistic: gl, useMemoCache: gl, useCacheRefresh: gl };
  te.useEffectEvent = gl;
  var O0 = { readContext: xl, use: sn, useCallback: function(l, t) {
    return Ql().memoizedState = [l, t === void 0 ? null : t], l;
  }, useContext: xl, useEffect: s0, useImperativeHandle: function(l, t, a) {
    a = a != null ? a.concat([l]) : null, dn(4194308, 4, m0.bind(null, t, l), a);
  }, useLayoutEffect: function(l, t) {
    return dn(4194308, 4, l, t);
  }, useInsertionEffect: function(l, t) {
    dn(4, 2, l, t);
  }, useMemo: function(l, t) {
    var a = Ql();
    t = t === void 0 ? null : t;
    var u = l();
    if (Ya) {
      kt(true);
      try {
        l();
      } finally {
        kt(false);
      }
    }
    return a.memoizedState = [u, t], u;
  }, useReducer: function(l, t, a) {
    var u = Ql();
    if (a !== void 0) {
      var e = a(t);
      if (Ya) {
        kt(true);
        try {
          a(t);
        } finally {
          kt(false);
        }
      }
    } else e = t;
    return u.memoizedState = u.baseState = e, l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: l, lastRenderedState: e }, u.queue = l, l = l.dispatch = um.bind(null, X, l), [u.memoizedState, l];
  }, useRef: function(l) {
    var t = Ql();
    return l = { current: l }, t.memoizedState = l;
  }, useState: function(l) {
    l = ec(l);
    var t = l.queue, a = E0.bind(null, X, t);
    return t.dispatch = a, [l.memoizedState, a];
  }, useDebugValue: cc, useDeferredValue: function(l, t) {
    var a = Ql();
    return ic(a, l, t);
  }, useTransition: function() {
    var l = ec(false);
    return l = b0.bind(null, X, l.queue, true, false), Ql().memoizedState = l, [false, l];
  }, useSyncExternalStore: function(l, t, a) {
    var u = X, e = Ql();
    if (k) {
      if (a === void 0) throw Error(y(407));
      a = a();
    } else {
      if (a = t(), dl === null) throw Error(y(349));
      (W & 127) !== 0 || ws(u, t, a);
    }
    e.memoizedState = a;
    var n = { value: a, getSnapshot: t };
    return e.queue = n, s0($s.bind(null, u, n, l), [l]), u.flags |= 2048, vu(9, { destroy: void 0 }, Ws.bind(null, u, n, a, t), null), a;
  }, useId: function() {
    var l = Ql(), t = dl.identifierPrefix;
    if (k) {
      var a = Ut, u = Dt;
      a = (u & ~(1 << 32 - at(u) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = fn++, 0 < a && (t += "H" + a.toString(32)), t += "_";
    } else a = Fy++, t = "_" + t + "r_" + a.toString(32) + "_";
    return l.memoizedState = t;
  }, useHostTransitionStatus: oc, useFormState: e0, useActionState: e0, useOptimistic: function(l) {
    var t = Ql();
    t.memoizedState = t.baseState = l;
    var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return t.queue = a, t = dc.bind(null, X, true, a), a.dispatch = t, [l, t];
  }, useMemoCache: tc, useCacheRefresh: function() {
    return Ql().memoizedState = am.bind(null, X);
  }, useEffectEvent: function(l) {
    var t = Ql(), a = { impl: l };
    return t.memoizedState = a, function() {
      if ((ll & 2) !== 0) throw Error(y(440));
      return a.impl.apply(void 0, arguments);
    };
  } }, yc = { readContext: xl, use: sn, useCallback: h0, useContext: xl, useEffect: fc, useImperativeHandle: v0, useInsertionEffect: d0, useLayoutEffect: y0, useMemo: r0, useReducer: on, useRef: i0, useState: function() {
    return on(Qt);
  }, useDebugValue: cc, useDeferredValue: function(l, t) {
    var a = zl();
    return g0(a, nl.memoizedState, l, t);
  }, useTransition: function() {
    var l = on(Qt)[0], t = zl().memoizedState;
    return [typeof l == "boolean" ? l : Pu(l), t];
  }, useSyncExternalStore: Js, useId: z0, useHostTransitionStatus: oc, useFormState: n0, useActionState: n0, useOptimistic: function(l, t) {
    var a = zl();
    return Is(a, nl, l, t);
  }, useMemoCache: tc, useCacheRefresh: T0 };
  yc.useEffectEvent = o0;
  var M0 = { readContext: xl, use: sn, useCallback: h0, useContext: xl, useEffect: fc, useImperativeHandle: v0, useInsertionEffect: d0, useLayoutEffect: y0, useMemo: r0, useReducer: uc, useRef: i0, useState: function() {
    return uc(Qt);
  }, useDebugValue: cc, useDeferredValue: function(l, t) {
    var a = zl();
    return nl === null ? ic(a, l, t) : g0(a, nl.memoizedState, l, t);
  }, useTransition: function() {
    var l = uc(Qt)[0], t = zl().memoizedState;
    return [typeof l == "boolean" ? l : Pu(l), t];
  }, useSyncExternalStore: Js, useId: z0, useHostTransitionStatus: oc, useFormState: c0, useActionState: c0, useOptimistic: function(l, t) {
    var a = zl();
    return nl !== null ? Is(a, nl, l, t) : (a.baseState = l, [l, a.queue.dispatch]);
  }, useMemoCache: tc, useCacheRefresh: T0 };
  M0.useEffectEvent = o0;
  function mc(l, t, a, u) {
    t = l.memoizedState, a = a(u, t), a = a == null ? t : q({}, t, a), l.memoizedState = a, l.lanes === 0 && (l.updateQueue.baseState = a);
  }
  var vc = { enqueueSetState: function(l, t, a) {
    l = l._reactInternals;
    var u = st(), e = na(u);
    e.payload = t, a != null && (e.callback = a), t = fa(l, e, u), t !== null && (Pl(t, l, u), $u(t, l, u));
  }, enqueueReplaceState: function(l, t, a) {
    l = l._reactInternals;
    var u = st(), e = na(u);
    e.tag = 1, e.payload = t, a != null && (e.callback = a), t = fa(l, e, u), t !== null && (Pl(t, l, u), $u(t, l, u));
  }, enqueueForceUpdate: function(l, t) {
    l = l._reactInternals;
    var a = st(), u = na(a);
    u.tag = 2, t != null && (u.callback = t), t = fa(l, u, a), t !== null && (Pl(t, l, a), $u(t, l, a));
  } };
  function D0(l, t, a, u, e, n, f) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(u, n, f) : t.prototype && t.prototype.isPureReactComponent ? !Qu(a, u) || !Qu(e, n) : true;
  }
  function U0(l, t, a, u) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, u), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, u), t.state !== l && vc.enqueueReplaceState(t, t.state, null);
  }
  function Ga(l, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var u in t) u !== "ref" && (a[u] = t[u]);
    }
    if (l = l.defaultProps) {
      a === t && (a = q({}, a));
      for (var e in l) a[e] === void 0 && (a[e] = l[e]);
    }
    return a;
  }
  function N0(l) {
    Ve(l);
  }
  function H0(l) {
    console.error(l);
  }
  function x0(l) {
    Ve(l);
  }
  function vn(l, t) {
    try {
      var a = l.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function R0(l, t, a) {
    try {
      var u = l.onCaughtError;
      u(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (e) {
      setTimeout(function() {
        throw e;
      });
    }
  }
  function hc(l, t, a) {
    return a = na(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      vn(l, t);
    }, a;
  }
  function C0(l) {
    return l = na(l), l.tag = 3, l;
  }
  function q0(l, t, a, u) {
    var e = a.type.getDerivedStateFromError;
    if (typeof e == "function") {
      var n = u.value;
      l.payload = function() {
        return e(n);
      }, l.callback = function() {
        R0(t, a, u);
      };
    }
    var f = a.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
      R0(t, a, u), typeof e != "function" && (ya === null ? ya = /* @__PURE__ */ new Set([this]) : ya.add(this));
      var c = u.stack;
      this.componentDidCatch(u.value, { componentStack: c !== null ? c : "" });
    });
  }
  function em(l, t, a, u, e) {
    if (a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
      if (t = a.alternate, t !== null && fu(t, a, e, true), a = nt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return gt === null ? On() : a.alternate === null && bl === 0 && (bl = 3), a.flags &= -257, a.flags |= 65536, a.lanes = e, u === ln ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([u]) : t.add(u), Xc(l, u, e)), false;
          case 22:
            return a.flags |= 65536, u === ln ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([u]) }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([u]) : a.add(u)), Xc(l, u, e)), false;
        }
        throw Error(y(435, a.tag));
      }
      return Xc(l, u, e), On(), false;
    }
    if (k) return t = nt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = e, u !== Cf && (l = Error(y(422), { cause: u }), Vu(mt(l, a)))) : (u !== Cf && (t = Error(y(423), { cause: u }), Vu(mt(t, a))), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, u = mt(u, a), e = hc(l.stateNode, u, e), Kf(l, e), bl !== 4 && (bl = 2)), false;
    var n = Error(y(520), { cause: u });
    if (n = mt(n, a), se === null ? se = [n] : se.push(n), bl !== 4 && (bl = 2), t === null) return true;
    u = mt(u, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, l = e & -e, a.lanes |= l, l = hc(a.stateNode, u, l), Kf(a, l), false;
        case 1:
          if (t = a.type, n = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (ya === null || !ya.has(n)))) return a.flags |= 65536, e &= -e, a.lanes |= e, e = C0(e), q0(e, l, a, u), Kf(a, e), false;
      }
      a = a.return;
    } while (a !== null);
    return false;
  }
  var rc = Error(y(461)), Al = false;
  function Rl(l, t, a, u) {
    t.child = l === null ? Gs(t, null, a, u) : Ba(t, l.child, a, u);
  }
  function j0(l, t, a, u, e) {
    a = a.render;
    var n = t.ref;
    if ("ref" in u) {
      var f = {};
      for (var c in u) c !== "ref" && (f[c] = u[c]);
    } else f = u;
    return Ra(t), u = kf(l, t, a, f, n, e), c = If(), l !== null && !Al ? (Pf(l, t, e), Zt(l, t, e)) : (k && c && xf(t), t.flags |= 1, Rl(l, t, u, e), t.child);
  }
  function B0(l, t, a, u, e) {
    if (l === null) {
      var n = a.type;
      return typeof n == "function" && !Uf(n) && n.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = n, Y0(l, t, n, u, e)) : (l = We(a.type, null, u, t, t.mode, e), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !Ac(l, e)) {
      var f = n.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Qu, a(f, u) && l.ref === t.ref) return Zt(l, t, e);
    }
    return t.flags |= 1, l = jt(n, u), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Y0(l, t, a, u, e) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Qu(n, u) && l.ref === t.ref) if (Al = false, t.pendingProps = u = n, Ac(l, e)) (l.flags & 131072) !== 0 && (Al = true);
      else return t.lanes = l.lanes, Zt(l, t, e);
    }
    return gc(l, t, a, u, e);
  }
  function G0(l, t, a, u) {
    var e = u.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), u.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | a : a, l !== null) {
          for (u = t.child = l.child, e = 0; u !== null; ) e = e | u.lanes | u.childLanes, u = u.sibling;
          u = e & ~n;
        } else u = 0, t.child = null;
        return X0(l, t, n, a, u);
      }
      if ((a & 536870912) !== 0) t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Ie(t, n !== null ? n.cachePool : null), n !== null ? Zs(t, n) : wf(), Ls(t);
      else return u = t.lanes = 536870912, X0(l, t, n !== null ? n.baseLanes | a : a, a, u);
    } else n !== null ? (Ie(t, n.cachePool), Zs(t, n), ia(), t.memoizedState = null) : (l !== null && Ie(t, null), wf(), ia());
    return Rl(l, t, e, a), t.child;
  }
  function ae(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t.sibling;
  }
  function X0(l, t, a, u, e) {
    var n = Qf();
    return n = n === null ? null : { parent: Tl._currentValue, pool: n }, t.memoizedState = { baseLanes: a, cachePool: n }, l !== null && Ie(t, null), wf(), Ls(t), l !== null && fu(l, t, u, true), t.childLanes = e, null;
  }
  function hn(l, t) {
    return t = gn({ mode: t.mode, children: t.children }, l.mode), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Q0(l, t, a) {
    return Ba(t, l.child, null, a), l = hn(t, t.pendingProps), l.flags |= 2, ft(t), t.memoizedState = null, l;
  }
  function nm(l, t, a) {
    var u = t.pendingProps, e = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (k) {
        if (u.mode === "hidden") return l = hn(t, u), t.lanes = 536870912, ae(null, l);
        if ($f(t), (l = ml) ? (l = ld(l, rt), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: la !== null ? { id: Dt, overflow: Ut } : null, retryLane: 536870912, hydrationErrors: null }, a = As(l), a.return = t, t.child = a, Hl = t, ml = null)) : l = null, l === null) throw aa(t);
        return t.lanes = 536870912, null;
      }
      return hn(t, u);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var f = n.dehydrated;
      if ($f(t), e) if (t.flags & 256) t.flags &= -257, t = Q0(l, t, a);
      else if (t.memoizedState !== null) t.child = l.child, t.flags |= 128, t = null;
      else throw Error(y(558));
      else if (Al || fu(l, t, a, false), e = (a & l.childLanes) !== 0, Al || e) {
        if (u = dl, u !== null && (f = Hi(u, a), f !== 0 && f !== n.retryLane)) throw n.retryLane = f, Ua(l, f), Pl(u, l, f), rc;
        On(), t = Q0(l, t, a);
      } else l = n.treeContext, ml = bt(f.nextSibling), Hl = t, k = true, ta = null, rt = false, l !== null && Ms(t, l), t = hn(t, u), t.flags |= 4096;
      return t;
    }
    return l = jt(l.child, { mode: u.mode, children: u.children }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function rn(l, t) {
    var a = t.ref;
    if (a === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(y(284));
      (l === null || l.ref !== a) && (t.flags |= 4194816);
    }
  }
  function gc(l, t, a, u, e) {
    return Ra(t), a = kf(l, t, a, u, void 0, e), u = If(), l !== null && !Al ? (Pf(l, t, e), Zt(l, t, e)) : (k && u && xf(t), t.flags |= 1, Rl(l, t, a, e), t.child);
  }
  function Z0(l, t, a, u, e, n) {
    return Ra(t), t.updateQueue = null, a = Ks(t, u, a, e), Vs(l), u = If(), l !== null && !Al ? (Pf(l, t, n), Zt(l, t, n)) : (k && u && xf(t), t.flags |= 1, Rl(l, t, a, n), t.child);
  }
  function L0(l, t, a, u, e) {
    if (Ra(t), t.stateNode === null) {
      var n = au, f = a.contextType;
      typeof f == "object" && f !== null && (n = xl(f)), n = new a(u, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = vc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = u, n.state = t.memoizedState, n.refs = {}, Lf(t), f = a.contextType, n.context = typeof f == "object" && f !== null ? xl(f) : au, n.state = t.memoizedState, f = a.getDerivedStateFromProps, typeof f == "function" && (mc(t, a, f, u), n.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (f = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), f !== n.state && vc.enqueueReplaceState(n, n.state, null), ku(t, u, n, e), Fu(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), u = true;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, i = Ga(a, c);
      n.props = i;
      var v = n.context, b = a.contextType;
      f = au, typeof b == "object" && b !== null && (f = xl(b));
      var T = a.getDerivedStateFromProps;
      b = typeof T == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, b || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || v !== f) && U0(t, n, u, f), ea = false;
      var r = t.memoizedState;
      n.state = r, ku(t, u, n, e), Fu(), v = t.memoizedState, c || r !== v || ea ? (typeof T == "function" && (mc(t, a, T, u), v = t.memoizedState), (i = ea || D0(t, a, i, u, r, v, f)) ? (b || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = u, t.memoizedState = v), n.props = u, n.state = v, n.context = f, u = i) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), u = false);
    } else {
      n = t.stateNode, Vf(l, t), f = t.memoizedProps, b = Ga(a, f), n.props = b, T = t.pendingProps, r = n.context, v = a.contextType, i = au, typeof v == "object" && v !== null && (i = xl(v)), c = a.getDerivedStateFromProps, (v = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f !== T || r !== i) && U0(t, n, u, i), ea = false, r = t.memoizedState, n.state = r, ku(t, u, n, e), Fu();
      var g = t.memoizedState;
      f !== T || r !== g || ea || l !== null && l.dependencies !== null && Fe(l.dependencies) ? (typeof c == "function" && (mc(t, a, c, u), g = t.memoizedState), (b = ea || D0(t, a, b, u, r, g, i) || l !== null && l.dependencies !== null && Fe(l.dependencies)) ? (v || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(u, g, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(u, g, i)), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && r === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && r === l.memoizedState || (t.flags |= 1024), t.memoizedProps = u, t.memoizedState = g), n.props = u, n.state = g, n.context = i, u = b) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && r === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && r === l.memoizedState || (t.flags |= 1024), u = false);
    }
    return n = u, rn(l, t), u = (t.flags & 128) !== 0, n || u ? (n = t.stateNode, a = u && typeof a.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && u ? (t.child = Ba(t, l.child, null, e), t.child = Ba(t, null, a, e)) : Rl(l, t, a, e), t.memoizedState = n.state, l = t.child) : l = Zt(l, t, e), l;
  }
  function V0(l, t, a, u) {
    return Ha(), t.flags |= 256, Rl(l, t, a, u), t.child;
  }
  var bc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Sc(l) {
    return { baseLanes: l, cachePool: Rs() };
  }
  function _c(l, t, a) {
    return l = l !== null ? l.childLanes & ~a : 0, t && (l |= it), l;
  }
  function K0(l, t, a) {
    var u = t.pendingProps, e = false, n = (t.flags & 128) !== 0, f;
    if ((f = n) || (f = l !== null && l.memoizedState === null ? false : (_l.current & 2) !== 0), f && (e = true, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (k) {
        if (e ? ca(t) : ia(), (l = ml) ? (l = ld(l, rt), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: la !== null ? { id: Dt, overflow: Ut } : null, retryLane: 536870912, hydrationErrors: null }, a = As(l), a.return = t, t.child = a, Hl = t, ml = null)) : l = null, l === null) throw aa(t);
        return ai(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = u.children;
      return u = u.fallback, e ? (ia(), e = t.mode, c = gn({ mode: "hidden", children: c }, e), u = Na(u, e, a, null), c.return = t, u.return = t, c.sibling = u, t.child = c, u = t.child, u.memoizedState = Sc(a), u.childLanes = _c(l, f, a), t.memoizedState = bc, ae(null, u)) : (ca(t), zc(t, c));
    }
    var i = l.memoizedState;
    if (i !== null && (c = i.dehydrated, c !== null)) {
      if (n) t.flags & 256 ? (ca(t), t.flags &= -257, t = Tc(l, t, a)) : t.memoizedState !== null ? (ia(), t.child = l.child, t.flags |= 128, t = null) : (ia(), c = u.fallback, e = t.mode, u = gn({ mode: "visible", children: u.children }, e), c = Na(c, e, a, null), c.flags |= 2, u.return = t, c.return = t, u.sibling = c, t.child = u, Ba(t, l.child, null, a), u = t.child, u.memoizedState = Sc(a), u.childLanes = _c(l, f, a), t.memoizedState = bc, t = ae(null, u));
      else if (ca(t), ai(c)) {
        if (f = c.nextSibling && c.nextSibling.dataset, f) var v = f.dgst;
        f = v, u = Error(y(419)), u.stack = "", u.digest = f, Vu({ value: u, source: null, stack: null }), t = Tc(l, t, a);
      } else if (Al || fu(l, t, a, false), f = (a & l.childLanes) !== 0, Al || f) {
        if (f = dl, f !== null && (u = Hi(f, a), u !== 0 && u !== i.retryLane)) throw i.retryLane = u, Ua(l, u), Pl(f, l, u), rc;
        ti(c) || On(), t = Tc(l, t, a);
      } else ti(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, ml = bt(c.nextSibling), Hl = t, k = true, ta = null, rt = false, l !== null && Ms(t, l), t = zc(t, u.children), t.flags |= 4096);
      return t;
    }
    return e ? (ia(), c = u.fallback, e = t.mode, i = l.child, v = i.sibling, u = jt(i, { mode: "hidden", children: u.children }), u.subtreeFlags = i.subtreeFlags & 65011712, v !== null ? c = jt(v, c) : (c = Na(c, e, a, null), c.flags |= 2), c.return = t, u.return = t, u.sibling = c, t.child = u, ae(null, u), u = t.child, c = l.child.memoizedState, c === null ? c = Sc(a) : (e = c.cachePool, e !== null ? (i = Tl._currentValue, e = e.parent !== i ? { parent: i, pool: i } : e) : e = Rs(), c = { baseLanes: c.baseLanes | a, cachePool: e }), u.memoizedState = c, u.childLanes = _c(l, f, a), t.memoizedState = bc, ae(l.child, u)) : (ca(t), a = l.child, l = a.sibling, a = jt(a, { mode: "visible", children: u.children }), a.return = t, a.sibling = null, l !== null && (f = t.deletions, f === null ? (t.deletions = [l], t.flags |= 16) : f.push(l)), t.child = a, t.memoizedState = null, a);
  }
  function zc(l, t) {
    return t = gn({ mode: "visible", children: t }, l.mode), t.return = l, l.child = t;
  }
  function gn(l, t) {
    return l = et(22, l, null, t), l.lanes = 0, l;
  }
  function Tc(l, t, a) {
    return Ba(t, l.child, null, a), l = zc(t, t.pendingProps.children), l.flags |= 2, t.memoizedState = null, l;
  }
  function J0(l, t, a) {
    l.lanes |= t;
    var u = l.alternate;
    u !== null && (u.lanes |= t), Bf(l.return, t, a);
  }
  function Ec(l, t, a, u, e, n) {
    var f = l.memoizedState;
    f === null ? l.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: u, tail: a, tailMode: e, treeForkCount: n } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = u, f.tail = a, f.tailMode = e, f.treeForkCount = n);
  }
  function w0(l, t, a) {
    var u = t.pendingProps, e = u.revealOrder, n = u.tail;
    u = u.children;
    var f = _l.current, c = (f & 2) !== 0;
    if (c ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, M(_l, f), Rl(l, t, u, a), u = k ? Lu : 0, !c && l !== null && (l.flags & 128) !== 0) l: for (l = t.child; l !== null; ) {
      if (l.tag === 13) l.memoizedState !== null && J0(l, a, t);
      else if (l.tag === 19) J0(l, a, t);
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
    switch (e) {
      case "forwards":
        for (a = t.child, e = null; a !== null; ) l = a.alternate, l !== null && en(l) === null && (e = a), a = a.sibling;
        a = e, a === null ? (e = t.child, t.child = null) : (e = a.sibling, a.sibling = null), Ec(t, false, e, a, n, u);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, e = t.child, t.child = null; e !== null; ) {
          if (l = e.alternate, l !== null && en(l) === null) {
            t.child = e;
            break;
          }
          l = e.sibling, e.sibling = a, a = e, e = l;
        }
        Ec(t, true, a, null, n, u);
        break;
      case "together":
        Ec(t, false, null, null, void 0, u);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Zt(l, t, a) {
    if (l !== null && (t.dependencies = l.dependencies), da |= t.lanes, (a & t.childLanes) === 0) if (l !== null) {
      if (fu(l, t, a, false), (a & t.childLanes) === 0) return null;
    } else return null;
    if (l !== null && t.child !== l.child) throw Error(y(153));
    if (t.child !== null) {
      for (l = t.child, a = jt(l, l.pendingProps), t.child = a, a.return = t; l.sibling !== null; ) l = l.sibling, a = a.sibling = jt(l, l.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function Ac(l, t) {
    return (l.lanes & t) !== 0 ? true : (l = l.dependencies, !!(l !== null && Fe(l)));
  }
  function fm(l, t, a) {
    switch (t.tag) {
      case 3:
        Xl(t, t.stateNode.containerInfo), ua(t, Tl, l.memoizedState.cache), Ha();
        break;
      case 27:
      case 5:
        Du(t);
        break;
      case 4:
        Xl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ua(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return t.flags |= 128, $f(t), null;
        break;
      case 13:
        var u = t.memoizedState;
        if (u !== null) return u.dehydrated !== null ? (ca(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? K0(l, t, a) : (ca(t), l = Zt(l, t, a), l !== null ? l.sibling : null);
        ca(t);
        break;
      case 19:
        var e = (l.flags & 128) !== 0;
        if (u = (a & t.childLanes) !== 0, u || (fu(l, t, a, false), u = (a & t.childLanes) !== 0), e) {
          if (u) return w0(l, t, a);
          t.flags |= 128;
        }
        if (e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), M(_l, _l.current), u) break;
        return null;
      case 22:
        return t.lanes = 0, G0(l, t, a, t.pendingProps);
      case 24:
        ua(t, Tl, l.memoizedState.cache);
    }
    return Zt(l, t, a);
  }
  function W0(l, t, a) {
    if (l !== null) if (l.memoizedProps !== t.pendingProps) Al = true;
    else {
      if (!Ac(l, a) && (t.flags & 128) === 0) return Al = false, fm(l, t, a);
      Al = (l.flags & 131072) !== 0;
    }
    else Al = false, k && (t.flags & 1048576) !== 0 && Os(t, Lu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var u = t.pendingProps;
          if (l = qa(t.elementType), t.type = l, typeof l == "function") Uf(l) ? (u = Ga(l, u), t.tag = 1, t = L0(null, t, l, u, a)) : (t.tag = 0, t = gc(null, t, l, u, a));
          else {
            if (l != null) {
              var e = l.$$typeof;
              if (e === Ll) {
                t.tag = 11, t = j0(null, t, l, u, a);
                break l;
              } else if (e === F) {
                t.tag = 14, t = B0(null, t, l, u, a);
                break l;
              }
            }
            throw t = xt(l) || l, Error(y(306, t, ""));
          }
        }
        return t;
      case 0:
        return gc(l, t, t.type, t.pendingProps, a);
      case 1:
        return u = t.type, e = Ga(u, t.pendingProps), L0(l, t, u, e, a);
      case 3:
        l: {
          if (Xl(t, t.stateNode.containerInfo), l === null) throw Error(y(387));
          u = t.pendingProps;
          var n = t.memoizedState;
          e = n.element, Vf(l, t), ku(t, u, null, a);
          var f = t.memoizedState;
          if (u = f.cache, ua(t, Tl, u), u !== n.cache && Yf(t, [Tl], a, true), Fu(), u = f.element, n.isDehydrated) if (n = { element: u, isDehydrated: false, cache: f.cache }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
            t = V0(l, t, u, a);
            break l;
          } else if (u !== e) {
            e = mt(Error(y(424)), t), Vu(e), t = V0(l, t, u, a);
            break l;
          } else {
            switch (l = t.stateNode.containerInfo, l.nodeType) {
              case 9:
                l = l.body;
                break;
              default:
                l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
            }
            for (ml = bt(l.firstChild), Hl = t, k = true, ta = null, rt = true, a = Gs(t, null, u, a), t.child = a; a; ) a.flags = a.flags & -3 | 4096, a = a.sibling;
          }
          else {
            if (Ha(), u === e) {
              t = Zt(l, t, a);
              break l;
            }
            Rl(l, t, u, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return rn(l, t), l === null ? (a = fd(t.type, null, t.pendingProps, null)) ? t.memoizedState = a : k || (a = t.type, l = t.pendingProps, u = Rn(V.current).createElement(a), u[Nl] = t, u[wl] = l, Cl(u, a, l), Dl(u), t.stateNode = u) : t.memoizedState = fd(t.type, l.memoizedProps, t.pendingProps, l.memoizedState), null;
      case 27:
        return Du(t), l === null && k && (u = t.stateNode = ud(t.type, t.pendingProps, V.current), Hl = t, rt = true, e = ml, ra(t.type) ? (ui = e, ml = bt(u.firstChild)) : ml = e), Rl(l, t, t.pendingProps.children, a), rn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && k && ((e = u = ml) && (u = jm(u, t.type, t.pendingProps, rt), u !== null ? (t.stateNode = u, Hl = t, ml = bt(u.firstChild), rt = false, e = true) : e = false), e || aa(t)), Du(t), e = t.type, n = t.pendingProps, f = l !== null ? l.memoizedProps : null, u = n.children, Ic(e, n) ? u = null : f !== null && Ic(e, f) && (t.flags |= 32), t.memoizedState !== null && (e = kf(l, t, ky, null, null, a), ge._currentValue = e), rn(l, t), Rl(l, t, u, a), t.child;
      case 6:
        return l === null && k && ((l = a = ml) && (a = Bm(a, t.pendingProps, rt), a !== null ? (t.stateNode = a, Hl = t, ml = null, l = true) : l = false), l || aa(t)), null;
      case 13:
        return K0(l, t, a);
      case 4:
        return Xl(t, t.stateNode.containerInfo), u = t.pendingProps, l === null ? t.child = Ba(t, null, u, a) : Rl(l, t, u, a), t.child;
      case 11:
        return j0(l, t, t.type, t.pendingProps, a);
      case 7:
        return Rl(l, t, t.pendingProps, a), t.child;
      case 8:
        return Rl(l, t, t.pendingProps.children, a), t.child;
      case 12:
        return Rl(l, t, t.pendingProps.children, a), t.child;
      case 10:
        return u = t.pendingProps, ua(t, t.type, u.value), Rl(l, t, u.children, a), t.child;
      case 9:
        return e = t.type._context, u = t.pendingProps.children, Ra(t), e = xl(e), u = u(e), t.flags |= 1, Rl(l, t, u, a), t.child;
      case 14:
        return B0(l, t, t.type, t.pendingProps, a);
      case 15:
        return Y0(l, t, t.type, t.pendingProps, a);
      case 19:
        return w0(l, t, a);
      case 31:
        return nm(l, t, a);
      case 22:
        return G0(l, t, a, t.pendingProps);
      case 24:
        return Ra(t), u = xl(Tl), l === null ? (e = Qf(), e === null && (e = dl, n = Gf(), e.pooledCache = n, n.refCount++, n !== null && (e.pooledCacheLanes |= a), e = n), t.memoizedState = { parent: u, cache: e }, Lf(t), ua(t, Tl, e)) : ((l.lanes & a) !== 0 && (Vf(l, t), ku(t, null, null, a), Fu()), e = l.memoizedState, n = t.memoizedState, e.parent !== u ? (e = { parent: u, cache: u }, t.memoizedState = e, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = e), ua(t, Tl, u)) : (u = n.cache, ua(t, Tl, u), u !== e.cache && Yf(t, [Tl], a, true))), Rl(l, t, t.pendingProps.children, a), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(y(156, t.tag));
  }
  function Lt(l) {
    l.flags |= 4;
  }
  function pc(l, t, a, u, e) {
    if ((t = (l.mode & 32) !== 0) && (t = false), t) {
      if (l.flags |= 16777216, (e & 335544128) === e) if (l.stateNode.complete) l.flags |= 8192;
      else if (To()) l.flags |= 8192;
      else throw ja = ln, Zf;
    } else l.flags &= -16777217;
  }
  function $0(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) l.flags &= -16777217;
    else if (l.flags |= 16777216, !dd(t)) if (To()) l.flags |= 8192;
    else throw ja = ln, Zf;
  }
  function bn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Di() : 536870912, l.lanes |= t, bu |= t);
  }
  function ue(l, t) {
    if (!k) switch (l.tailMode) {
      case "hidden":
        t = l.tail;
        for (var a = null; t !== null; ) t.alternate !== null && (a = t), t = t.sibling;
        a === null ? l.tail = null : a.sibling = null;
        break;
      case "collapsed":
        a = l.tail;
        for (var u = null; a !== null; ) a.alternate !== null && (u = a), a = a.sibling;
        u === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : u.sibling = null;
    }
  }
  function vl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, a = 0, u = 0;
    if (t) for (var e = l.child; e !== null; ) a |= e.lanes | e.childLanes, u |= e.subtreeFlags & 65011712, u |= e.flags & 65011712, e.return = l, e = e.sibling;
    else for (e = l.child; e !== null; ) a |= e.lanes | e.childLanes, u |= e.subtreeFlags, u |= e.flags, e.return = l, e = e.sibling;
    return l.subtreeFlags |= u, l.childLanes = a, t;
  }
  function cm(l, t, a) {
    var u = t.pendingProps;
    switch (Rf(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return vl(t), null;
      case 1:
        return vl(t), null;
      case 3:
        return a = t.stateNode, u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), Gt(Tl), Sl(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (l === null || l.child === null) && (nu(t) ? Lt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, qf())), vl(t), null;
      case 26:
        var e = t.type, n = t.memoizedState;
        return l === null ? (Lt(t), n !== null ? (vl(t), $0(t, n)) : (vl(t), pc(t, e, null, u, a))) : n ? n !== l.memoizedState ? (Lt(t), vl(t), $0(t, n)) : (vl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== u && Lt(t), vl(t), pc(t, e, l, u, a)), null;
      case 27:
        if (De(t), a = V.current, e = t.type, l !== null && t.stateNode != null) l.memoizedProps !== u && Lt(t);
        else {
          if (!u) {
            if (t.stateNode === null) throw Error(y(166));
            return vl(t), null;
          }
          l = N.current, nu(t) ? Ds(t) : (l = ud(e, u, a), t.stateNode = l, Lt(t));
        }
        return vl(t), null;
      case 5:
        if (De(t), e = t.type, l !== null && t.stateNode != null) l.memoizedProps !== u && Lt(t);
        else {
          if (!u) {
            if (t.stateNode === null) throw Error(y(166));
            return vl(t), null;
          }
          if (n = N.current, nu(t)) Ds(t);
          else {
            var f = Rn(V.current);
            switch (n) {
              case 1:
                n = f.createElementNS("http://www.w3.org/2000/svg", e);
                break;
              case 2:
                n = f.createElementNS("http://www.w3.org/1998/Math/MathML", e);
                break;
              default:
                switch (e) {
                  case "svg":
                    n = f.createElementNS("http://www.w3.org/2000/svg", e);
                    break;
                  case "math":
                    n = f.createElementNS("http://www.w3.org/1998/Math/MathML", e);
                    break;
                  case "script":
                    n = f.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild);
                    break;
                  case "select":
                    n = typeof u.is == "string" ? f.createElement("select", { is: u.is }) : f.createElement("select"), u.multiple ? n.multiple = true : u.size && (n.size = u.size);
                    break;
                  default:
                    n = typeof u.is == "string" ? f.createElement(e, { is: u.is }) : f.createElement(e);
                }
            }
            n[Nl] = t, n[wl] = u;
            l: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) n.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === t) break l;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t) break l;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            t.stateNode = n;
            l: switch (Cl(n, e, u), e) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                u = !!u.autoFocus;
                break l;
              case "img":
                u = true;
                break l;
              default:
                u = false;
            }
            u && Lt(t);
          }
        }
        return vl(t), pc(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, a), null;
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== u && Lt(t);
        else {
          if (typeof u != "string" && t.stateNode === null) throw Error(y(166));
          if (l = V.current, nu(t)) {
            if (l = t.stateNode, a = t.memoizedProps, u = null, e = Hl, e !== null) switch (e.tag) {
              case 27:
              case 5:
                u = e.memoizedProps;
            }
            l[Nl] = t, l = !!(l.nodeValue === a || u !== null && u.suppressHydrationWarning === true || Jo(l.nodeValue, a)), l || aa(t, true);
          } else l = Rn(l).createTextNode(u), l[Nl] = t, t.stateNode = l;
        }
        return vl(t), null;
      case 31:
        if (a = t.memoizedState, l === null || l.memoizedState !== null) {
          if (u = nu(t), a !== null) {
            if (l === null) {
              if (!u) throw Error(y(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(y(557));
              l[Nl] = t;
            } else Ha(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            vl(t), l = false;
          } else a = qf(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = a), l = true;
          if (!l) return t.flags & 256 ? (ft(t), t) : (ft(t), null);
          if ((t.flags & 128) !== 0) throw Error(y(558));
        }
        return vl(t), null;
      case 13:
        if (u = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (e = nu(t), u !== null && u.dehydrated !== null) {
            if (l === null) {
              if (!e) throw Error(y(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(y(317));
              e[Nl] = t;
            } else Ha(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            vl(t), e = false;
          } else e = qf(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), e = true;
          if (!e) return t.flags & 256 ? (ft(t), t) : (ft(t), null);
        }
        return ft(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = u !== null, l = l !== null && l.memoizedState !== null, a && (u = t.child, e = null, u.alternate !== null && u.alternate.memoizedState !== null && u.alternate.memoizedState.cachePool !== null && (e = u.alternate.memoizedState.cachePool.pool), n = null, u.memoizedState !== null && u.memoizedState.cachePool !== null && (n = u.memoizedState.cachePool.pool), n !== e && (u.flags |= 2048)), a !== l && a && (t.child.flags |= 8192), bn(t, t.updateQueue), vl(t), null);
      case 4:
        return Sl(), l === null && wc(t.stateNode.containerInfo), vl(t), null;
      case 10:
        return Gt(t.type), vl(t), null;
      case 19:
        if (E(_l), u = t.memoizedState, u === null) return vl(t), null;
        if (e = (t.flags & 128) !== 0, n = u.rendering, n === null) if (e) ue(u, false);
        else {
          if (bl !== 0 || l !== null && (l.flags & 128) !== 0) for (l = t.child; l !== null; ) {
            if (n = en(l), n !== null) {
              for (t.flags |= 128, ue(u, false), l = n.updateQueue, t.updateQueue = l, bn(t, l), t.subtreeFlags = 0, l = a, a = t.child; a !== null; ) Es(a, l), a = a.sibling;
              return M(_l, _l.current & 1 | 2), k && Bt(t, u.treeForkCount), t.child;
            }
            l = l.sibling;
          }
          u.tail !== null && lt() > En && (t.flags |= 128, e = true, ue(u, false), t.lanes = 4194304);
        }
        else {
          if (!e) if (l = en(n), l !== null) {
            if (t.flags |= 128, e = true, l = l.updateQueue, t.updateQueue = l, bn(t, l), ue(u, true), u.tail === null && u.tailMode === "hidden" && !n.alternate && !k) return vl(t), null;
          } else 2 * lt() - u.renderingStartTime > En && a !== 536870912 && (t.flags |= 128, e = true, ue(u, false), t.lanes = 4194304);
          u.isBackwards ? (n.sibling = t.child, t.child = n) : (l = u.last, l !== null ? l.sibling = n : t.child = n, u.last = n);
        }
        return u.tail !== null ? (l = u.tail, u.rendering = l, u.tail = l.sibling, u.renderingStartTime = lt(), l.sibling = null, a = _l.current, M(_l, e ? a & 1 | 2 : a & 1), k && Bt(t, u.treeForkCount), l) : (vl(t), null);
      case 22:
      case 23:
        return ft(t), Wf(), u = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== u && (t.flags |= 8192) : u && (t.flags |= 8192), u ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (vl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : vl(t), a = t.updateQueue, a !== null && bn(t, a.retryQueue), a = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), u = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (u = t.memoizedState.cachePool.pool), u !== a && (t.flags |= 2048), l !== null && E(Ca), null;
      case 24:
        return a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Gt(Tl), vl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(y(156, t.tag));
  }
  function im(l, t) {
    switch (Rf(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Gt(Tl), Sl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return De(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (ft(t), t.alternate === null) throw Error(y(340));
          Ha();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (ft(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null) throw Error(y(340));
          Ha();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return E(_l), null;
      case 4:
        return Sl(), null;
      case 10:
        return Gt(t.type), null;
      case 22:
      case 23:
        return ft(t), Wf(), l !== null && E(Ca), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Gt(Tl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function F0(l, t) {
    switch (Rf(t), t.tag) {
      case 3:
        Gt(Tl), Sl();
        break;
      case 26:
      case 27:
      case 5:
        De(t);
        break;
      case 4:
        Sl();
        break;
      case 31:
        t.memoizedState !== null && ft(t);
        break;
      case 13:
        ft(t);
        break;
      case 19:
        E(_l);
        break;
      case 10:
        Gt(t.type);
        break;
      case 22:
      case 23:
        ft(t), Wf(), l !== null && E(Ca);
        break;
      case 24:
        Gt(Tl);
    }
  }
  function ee(l, t) {
    try {
      var a = t.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var e = u.next;
        a = e;
        do {
          if ((a.tag & l) === l) {
            u = void 0;
            var n = a.create, f = a.inst;
            u = n(), f.destroy = u;
          }
          a = a.next;
        } while (a !== e);
      }
    } catch (c) {
      ul(t, t.return, c);
    }
  }
  function sa(l, t, a) {
    try {
      var u = t.updateQueue, e = u !== null ? u.lastEffect : null;
      if (e !== null) {
        var n = e.next;
        u = n;
        do {
          if ((u.tag & l) === l) {
            var f = u.inst, c = f.destroy;
            if (c !== void 0) {
              f.destroy = void 0, e = t;
              var i = a, v = c;
              try {
                v();
              } catch (b) {
                ul(e, i, b);
              }
            }
          }
          u = u.next;
        } while (u !== n);
      }
    } catch (b) {
      ul(t, t.return, b);
    }
  }
  function k0(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var a = l.stateNode;
      try {
        Qs(t, a);
      } catch (u) {
        ul(l, l.return, u);
      }
    }
  }
  function I0(l, t, a) {
    a.props = Ga(l.type, l.memoizedProps), a.state = l.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (u) {
      ul(l, t, u);
    }
  }
  function ne(l, t) {
    try {
      var a = l.ref;
      if (a !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var u = l.stateNode;
            break;
          case 30:
            u = l.stateNode;
            break;
          default:
            u = l.stateNode;
        }
        typeof a == "function" ? l.refCleanup = a(u) : a.current = u;
      }
    } catch (e) {
      ul(l, t, e);
    }
  }
  function Nt(l, t) {
    var a = l.ref, u = l.refCleanup;
    if (a !== null) if (typeof u == "function") try {
      u();
    } catch (e) {
      ul(l, t, e);
    } finally {
      l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
    }
    else if (typeof a == "function") try {
      a(null);
    } catch (e) {
      ul(l, t, e);
    }
    else a.current = null;
  }
  function P0(l) {
    var t = l.type, a = l.memoizedProps, u = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && u.focus();
          break l;
        case "img":
          a.src ? u.src = a.src : a.srcSet && (u.srcset = a.srcSet);
      }
    } catch (e) {
      ul(l, l.return, e);
    }
  }
  function Oc(l, t, a) {
    try {
      var u = l.stateNode;
      Nm(u, l.type, a, t), u[wl] = t;
    } catch (e) {
      ul(l, l.return, e);
    }
  }
  function lo(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && ra(l.type) || l.tag === 4;
  }
  function Mc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || lo(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && ra(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Dc(l, t, a) {
    var u = l.tag;
    if (u === 5 || u === 6) l = l.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(l, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(l), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = Ct));
    else if (u !== 4 && (u === 27 && ra(l.type) && (a = l.stateNode, t = null), l = l.child, l !== null)) for (Dc(l, t, a), l = l.sibling; l !== null; ) Dc(l, t, a), l = l.sibling;
  }
  function Sn(l, t, a) {
    var u = l.tag;
    if (u === 5 || u === 6) l = l.stateNode, t ? a.insertBefore(l, t) : a.appendChild(l);
    else if (u !== 4 && (u === 27 && ra(l.type) && (a = l.stateNode), l = l.child, l !== null)) for (Sn(l, t, a), l = l.sibling; l !== null; ) Sn(l, t, a), l = l.sibling;
  }
  function to(l) {
    var t = l.stateNode, a = l.memoizedProps;
    try {
      for (var u = l.type, e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
      Cl(t, u, a), t[Nl] = l, t[wl] = a;
    } catch (n) {
      ul(l, l.return, n);
    }
  }
  var Vt = false, pl = false, Uc = false, ao = typeof WeakSet == "function" ? WeakSet : Set, Ul = null;
  function sm(l, t) {
    if (l = l.containerInfo, Fc = Xn, l = vs(l), Tf(l)) {
      if ("selectionStart" in l) var a = { start: l.selectionStart, end: l.selectionEnd };
      else l: {
        a = (a = l.ownerDocument) && a.defaultView || window;
        var u = a.getSelection && a.getSelection();
        if (u && u.rangeCount !== 0) {
          a = u.anchorNode;
          var e = u.anchorOffset, n = u.focusNode;
          u = u.focusOffset;
          try {
            a.nodeType, n.nodeType;
          } catch {
            a = null;
            break l;
          }
          var f = 0, c = -1, i = -1, v = 0, b = 0, T = l, r = null;
          t: for (; ; ) {
            for (var g; T !== a || e !== 0 && T.nodeType !== 3 || (c = f + e), T !== n || u !== 0 && T.nodeType !== 3 || (i = f + u), T.nodeType === 3 && (f += T.nodeValue.length), (g = T.firstChild) !== null; ) r = T, T = g;
            for (; ; ) {
              if (T === l) break t;
              if (r === a && ++v === e && (c = f), r === n && ++b === u && (i = f), (g = T.nextSibling) !== null) break;
              T = r, r = T.parentNode;
            }
            T = g;
          }
          a = c === -1 || i === -1 ? null : { start: c, end: i };
        } else a = null;
      }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (kc = { focusedElem: l, selectionRange: a }, Xn = false, Ul = t; Ul !== null; ) if (t = Ul, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null) l.return = t, Ul = l;
    else for (; Ul !== null; ) {
      switch (t = Ul, n = t.alternate, l = t.flags, t.tag) {
        case 0:
          if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null)) for (a = 0; a < l.length; a++) e = l[a], e.ref.impl = e.nextImpl;
          break;
        case 11:
        case 15:
          break;
        case 1:
          if ((l & 1024) !== 0 && n !== null) {
            l = void 0, a = t, e = n.memoizedProps, n = n.memoizedState, u = a.stateNode;
            try {
              var D = Ga(a.type, e);
              l = u.getSnapshotBeforeUpdate(D, n), u.__reactInternalSnapshotBeforeUpdate = l;
            } catch (j) {
              ul(a, a.return, j);
            }
          }
          break;
        case 3:
          if ((l & 1024) !== 0) {
            if (l = t.stateNode.containerInfo, a = l.nodeType, a === 9) li(l);
            else if (a === 1) switch (l.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                li(l);
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
          if ((l & 1024) !== 0) throw Error(y(163));
      }
      if (l = t.sibling, l !== null) {
        l.return = t.return, Ul = l;
        break;
      }
      Ul = t.return;
    }
  }
  function uo(l, t, a) {
    var u = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Jt(l, a), u & 4 && ee(5, a);
        break;
      case 1:
        if (Jt(l, a), u & 4) if (l = a.stateNode, t === null) try {
          l.componentDidMount();
        } catch (f) {
          ul(a, a.return, f);
        }
        else {
          var e = Ga(a.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            l.componentDidUpdate(e, t, l.__reactInternalSnapshotBeforeUpdate);
          } catch (f) {
            ul(a, a.return, f);
          }
        }
        u & 64 && k0(a), u & 512 && ne(a, a.return);
        break;
      case 3:
        if (Jt(l, a), u & 64 && (l = a.updateQueue, l !== null)) {
          if (t = null, a.child !== null) switch (a.child.tag) {
            case 27:
            case 5:
              t = a.child.stateNode;
              break;
            case 1:
              t = a.child.stateNode;
          }
          try {
            Qs(l, t);
          } catch (f) {
            ul(a, a.return, f);
          }
        }
        break;
      case 27:
        t === null && u & 4 && to(a);
      case 26:
      case 5:
        Jt(l, a), t === null && u & 4 && P0(a), u & 512 && ne(a, a.return);
        break;
      case 12:
        Jt(l, a);
        break;
      case 31:
        Jt(l, a), u & 4 && fo(l, a);
        break;
      case 13:
        Jt(l, a), u & 4 && co(l, a), u & 64 && (l = a.memoizedState, l !== null && (l = l.dehydrated, l !== null && (a = bm.bind(null, a), Ym(l, a))));
        break;
      case 22:
        if (u = a.memoizedState !== null || Vt, !u) {
          t = t !== null && t.memoizedState !== null || pl, e = Vt;
          var n = pl;
          Vt = u, (pl = t) && !n ? wt(l, a, (a.subtreeFlags & 8772) !== 0) : Jt(l, a), Vt = e, pl = n;
        }
        break;
      case 30:
        break;
      default:
        Jt(l, a);
    }
  }
  function eo(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, eo(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && ef(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var rl = null, $l = false;
  function Kt(l, t, a) {
    for (a = a.child; a !== null; ) no(l, t, a), a = a.sibling;
  }
  function no(l, t, a) {
    if (tt && typeof tt.onCommitFiberUnmount == "function") try {
      tt.onCommitFiberUnmount(Uu, a);
    } catch {
    }
    switch (a.tag) {
      case 26:
        pl || Nt(a, t), Kt(l, t, a), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        pl || Nt(a, t);
        var u = rl, e = $l;
        ra(a.type) && (rl = a.stateNode, $l = false), Kt(l, t, a), ve(a.stateNode), rl = u, $l = e;
        break;
      case 5:
        pl || Nt(a, t);
      case 6:
        if (u = rl, e = $l, rl = null, Kt(l, t, a), rl = u, $l = e, rl !== null) if ($l) try {
          (rl.nodeType === 9 ? rl.body : rl.nodeName === "HTML" ? rl.ownerDocument.body : rl).removeChild(a.stateNode);
        } catch (n) {
          ul(a, t, n);
        }
        else try {
          rl.removeChild(a.stateNode);
        } catch (n) {
          ul(a, t, n);
        }
        break;
      case 18:
        rl !== null && ($l ? (l = rl, Io(l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, a.stateNode), Ou(l)) : Io(rl, a.stateNode));
        break;
      case 4:
        u = rl, e = $l, rl = a.stateNode.containerInfo, $l = true, Kt(l, t, a), rl = u, $l = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        sa(2, a, t), pl || sa(4, a, t), Kt(l, t, a);
        break;
      case 1:
        pl || (Nt(a, t), u = a.stateNode, typeof u.componentWillUnmount == "function" && I0(a, t, u)), Kt(l, t, a);
        break;
      case 21:
        Kt(l, t, a);
        break;
      case 22:
        pl = (u = pl) || a.memoizedState !== null, Kt(l, t, a), pl = u;
        break;
      default:
        Kt(l, t, a);
    }
  }
  function fo(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Ou(l);
      } catch (a) {
        ul(t, t.return, a);
      }
    }
  }
  function co(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null)))) try {
      Ou(l);
    } catch (a) {
      ul(t, t.return, a);
    }
  }
  function om(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new ao()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new ao()), t;
      default:
        throw Error(y(435, l.tag));
    }
  }
  function _n(l, t) {
    var a = om(l);
    t.forEach(function(u) {
      if (!a.has(u)) {
        a.add(u);
        var e = Sm.bind(null, l, u);
        u.then(e, e);
      }
    });
  }
  function Fl(l, t) {
    var a = t.deletions;
    if (a !== null) for (var u = 0; u < a.length; u++) {
      var e = a[u], n = l, f = t, c = f;
      l: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
            if (ra(c.type)) {
              rl = c.stateNode, $l = false;
              break l;
            }
            break;
          case 5:
            rl = c.stateNode, $l = false;
            break l;
          case 3:
          case 4:
            rl = c.stateNode.containerInfo, $l = true;
            break l;
        }
        c = c.return;
      }
      if (rl === null) throw Error(y(160));
      no(n, f, e), rl = null, $l = false, n = e.alternate, n !== null && (n.return = null), e.return = null;
    }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) io(t, l), t = t.sibling;
  }
  var Et = null;
  function io(l, t) {
    var a = l.alternate, u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Fl(t, l), kl(l), u & 4 && (sa(3, l, l.return), ee(3, l), sa(5, l, l.return));
        break;
      case 1:
        Fl(t, l), kl(l), u & 512 && (pl || a === null || Nt(a, a.return)), u & 64 && Vt && (l = l.updateQueue, l !== null && (u = l.callbacks, u !== null && (a = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = a === null ? u : a.concat(u))));
        break;
      case 26:
        var e = Et;
        if (Fl(t, l), kl(l), u & 512 && (pl || a === null || Nt(a, a.return)), u & 4) {
          var n = a !== null ? a.memoizedState : null;
          if (u = l.memoizedState, a === null) if (u === null) if (l.stateNode === null) {
            l: {
              u = l.type, a = l.memoizedProps, e = e.ownerDocument || e;
              t: switch (u) {
                case "title":
                  n = e.getElementsByTagName("title")[0], (!n || n[xu] || n[Nl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = e.createElement(u), e.head.insertBefore(n, e.querySelector("head > title"))), Cl(n, u, a), n[Nl] = l, Dl(n), u = n;
                  break l;
                case "link":
                  var f = sd("link", "href", e).get(u + (a.href || ""));
                  if (f) {
                    for (var c = 0; c < f.length; c++) if (n = f[c], n.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && n.getAttribute("rel") === (a.rel == null ? null : a.rel) && n.getAttribute("title") === (a.title == null ? null : a.title) && n.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                      f.splice(c, 1);
                      break t;
                    }
                  }
                  n = e.createElement(u), Cl(n, u, a), e.head.appendChild(n);
                  break;
                case "meta":
                  if (f = sd("meta", "content", e).get(u + (a.content || ""))) {
                    for (c = 0; c < f.length; c++) if (n = f[c], n.getAttribute("content") === (a.content == null ? null : "" + a.content) && n.getAttribute("name") === (a.name == null ? null : a.name) && n.getAttribute("property") === (a.property == null ? null : a.property) && n.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && n.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                      f.splice(c, 1);
                      break t;
                    }
                  }
                  n = e.createElement(u), Cl(n, u, a), e.head.appendChild(n);
                  break;
                default:
                  throw Error(y(468, u));
              }
              n[Nl] = l, Dl(n), u = n;
            }
            l.stateNode = u;
          } else od(e, l.type, l.stateNode);
          else l.stateNode = id(e, u, l.memoizedProps);
          else n !== u ? (n === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : n.count--, u === null ? od(e, l.type, l.stateNode) : id(e, u, l.memoizedProps)) : u === null && l.stateNode !== null && Oc(l, l.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        Fl(t, l), kl(l), u & 512 && (pl || a === null || Nt(a, a.return)), a !== null && u & 4 && Oc(l, l.memoizedProps, a.memoizedProps);
        break;
      case 5:
        if (Fl(t, l), kl(l), u & 512 && (pl || a === null || Nt(a, a.return)), l.flags & 32) {
          e = l.stateNode;
          try {
            $a(e, "");
          } catch (D) {
            ul(l, l.return, D);
          }
        }
        u & 4 && l.stateNode != null && (e = l.memoizedProps, Oc(l, e, a !== null ? a.memoizedProps : e)), u & 1024 && (Uc = true);
        break;
      case 6:
        if (Fl(t, l), kl(l), u & 4) {
          if (l.stateNode === null) throw Error(y(162));
          u = l.memoizedProps, a = l.stateNode;
          try {
            a.nodeValue = u;
          } catch (D) {
            ul(l, l.return, D);
          }
        }
        break;
      case 3:
        if (jn = null, e = Et, Et = Cn(t.containerInfo), Fl(t, l), Et = e, kl(l), u & 4 && a !== null && a.memoizedState.isDehydrated) try {
          Ou(t.containerInfo);
        } catch (D) {
          ul(l, l.return, D);
        }
        Uc && (Uc = false, so(l));
        break;
      case 4:
        u = Et, Et = Cn(l.stateNode.containerInfo), Fl(t, l), kl(l), Et = u;
        break;
      case 12:
        Fl(t, l), kl(l);
        break;
      case 31:
        Fl(t, l), kl(l), u & 4 && (u = l.updateQueue, u !== null && (l.updateQueue = null, _n(l, u)));
        break;
      case 13:
        Fl(t, l), kl(l), l.child.flags & 8192 && l.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Tn = lt()), u & 4 && (u = l.updateQueue, u !== null && (l.updateQueue = null, _n(l, u)));
        break;
      case 22:
        e = l.memoizedState !== null;
        var i = a !== null && a.memoizedState !== null, v = Vt, b = pl;
        if (Vt = v || e, pl = b || i, Fl(t, l), pl = b, Vt = v, kl(l), u & 8192) l: for (t = l.stateNode, t._visibility = e ? t._visibility & -2 : t._visibility | 1, e && (a === null || i || Vt || pl || Xa(l)), a = null, t = l; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (a === null) {
              i = a = t;
              try {
                if (n = i.stateNode, e) f = n.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                else {
                  c = i.stateNode;
                  var T = i.memoizedProps.style, r = T != null && T.hasOwnProperty("display") ? T.display : null;
                  c.style.display = r == null || typeof r == "boolean" ? "" : ("" + r).trim();
                }
              } catch (D) {
                ul(i, i.return, D);
              }
            }
          } else if (t.tag === 6) {
            if (a === null) {
              i = t;
              try {
                i.stateNode.nodeValue = e ? "" : i.memoizedProps;
              } catch (D) {
                ul(i, i.return, D);
              }
            }
          } else if (t.tag === 18) {
            if (a === null) {
              i = t;
              try {
                var g = i.stateNode;
                e ? Po(g, true) : Po(i.stateNode, false);
              } catch (D) {
                ul(i, i.return, D);
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === l) break l;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === l) break l;
            a === t && (a = null), t = t.return;
          }
          a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
        }
        u & 4 && (u = l.updateQueue, u !== null && (a = u.retryQueue, a !== null && (u.retryQueue = null, _n(l, a))));
        break;
      case 19:
        Fl(t, l), kl(l), u & 4 && (u = l.updateQueue, u !== null && (l.updateQueue = null, _n(l, u)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Fl(t, l), kl(l);
    }
  }
  function kl(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var a, u = l.return; u !== null; ) {
          if (lo(u)) {
            a = u;
            break;
          }
          u = u.return;
        }
        if (a == null) throw Error(y(160));
        switch (a.tag) {
          case 27:
            var e = a.stateNode, n = Mc(l);
            Sn(l, n, e);
            break;
          case 5:
            var f = a.stateNode;
            a.flags & 32 && ($a(f, ""), a.flags &= -33);
            var c = Mc(l);
            Sn(l, c, f);
            break;
          case 3:
          case 4:
            var i = a.stateNode.containerInfo, v = Mc(l);
            Dc(l, v, i);
            break;
          default:
            throw Error(y(161));
        }
      } catch (b) {
        ul(l, l.return, b);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function so(l) {
    if (l.subtreeFlags & 1024) for (l = l.child; l !== null; ) {
      var t = l;
      so(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
  }
  function Jt(l, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) uo(l, t.alternate, t), t = t.sibling;
  }
  function Xa(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          sa(4, t, t.return), Xa(t);
          break;
        case 1:
          Nt(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && I0(t, t.return, a), Xa(t);
          break;
        case 27:
          ve(t.stateNode);
        case 26:
        case 5:
          Nt(t, t.return), Xa(t);
          break;
        case 22:
          t.memoizedState === null && Xa(t);
          break;
        case 30:
          Xa(t);
          break;
        default:
          Xa(t);
      }
      l = l.sibling;
    }
  }
  function wt(l, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var u = t.alternate, e = l, n = t, f = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          wt(e, n, a), ee(4, n);
          break;
        case 1:
          if (wt(e, n, a), u = n, e = u.stateNode, typeof e.componentDidMount == "function") try {
            e.componentDidMount();
          } catch (v) {
            ul(u, u.return, v);
          }
          if (u = n, e = u.updateQueue, e !== null) {
            var c = u.stateNode;
            try {
              var i = e.shared.hiddenCallbacks;
              if (i !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < i.length; e++) Xs(i[e], c);
            } catch (v) {
              ul(u, u.return, v);
            }
          }
          a && f & 64 && k0(n), ne(n, n.return);
          break;
        case 27:
          to(n);
        case 26:
        case 5:
          wt(e, n, a), a && u === null && f & 4 && P0(n), ne(n, n.return);
          break;
        case 12:
          wt(e, n, a);
          break;
        case 31:
          wt(e, n, a), a && f & 4 && fo(e, n);
          break;
        case 13:
          wt(e, n, a), a && f & 4 && co(e, n);
          break;
        case 22:
          n.memoizedState === null && wt(e, n, a), ne(n, n.return);
          break;
        case 30:
          break;
        default:
          wt(e, n, a);
      }
      t = t.sibling;
    }
  }
  function Nc(l, t) {
    var a = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (l != null && l.refCount++, a != null && Ku(a));
  }
  function Hc(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Ku(l));
  }
  function At(l, t, a, u) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) oo(l, t, a, u), t = t.sibling;
  }
  function oo(l, t, a, u) {
    var e = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        At(l, t, a, u), e & 2048 && ee(9, t);
        break;
      case 1:
        At(l, t, a, u);
        break;
      case 3:
        At(l, t, a, u), e & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Ku(l)));
        break;
      case 12:
        if (e & 2048) {
          At(l, t, a, u), l = t.stateNode;
          try {
            var n = t.memoizedProps, f = n.id, c = n.onPostCommit;
            typeof c == "function" && c(f, t.alternate === null ? "mount" : "update", l.passiveEffectDuration, -0);
          } catch (i) {
            ul(t, t.return, i);
          }
        } else At(l, t, a, u);
        break;
      case 31:
        At(l, t, a, u);
        break;
      case 13:
        At(l, t, a, u);
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, f = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? At(l, t, a, u) : fe(l, t) : n._visibility & 2 ? At(l, t, a, u) : (n._visibility |= 2, hu(l, t, a, u, (t.subtreeFlags & 10256) !== 0 || false)), e & 2048 && Nc(f, t);
        break;
      case 24:
        At(l, t, a, u), e & 2048 && Hc(t.alternate, t);
        break;
      default:
        At(l, t, a, u);
    }
  }
  function hu(l, t, a, u, e) {
    for (e = e && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
      var n = l, f = t, c = a, i = u, v = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          hu(n, f, c, i, e), ee(8, f);
          break;
        case 23:
          break;
        case 22:
          var b = f.stateNode;
          f.memoizedState !== null ? b._visibility & 2 ? hu(n, f, c, i, e) : fe(n, f) : (b._visibility |= 2, hu(n, f, c, i, e)), e && v & 2048 && Nc(f.alternate, f);
          break;
        case 24:
          hu(n, f, c, i, e), e && v & 2048 && Hc(f.alternate, f);
          break;
        default:
          hu(n, f, c, i, e);
      }
      t = t.sibling;
    }
  }
  function fe(l, t) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
      var a = l, u = t, e = u.flags;
      switch (u.tag) {
        case 22:
          fe(a, u), e & 2048 && Nc(u.alternate, u);
          break;
        case 24:
          fe(a, u), e & 2048 && Hc(u.alternate, u);
          break;
        default:
          fe(a, u);
      }
      t = t.sibling;
    }
  }
  var ce = 8192;
  function ru(l, t, a) {
    if (l.subtreeFlags & ce) for (l = l.child; l !== null; ) yo(l, t, a), l = l.sibling;
  }
  function yo(l, t, a) {
    switch (l.tag) {
      case 26:
        ru(l, t, a), l.flags & ce && l.memoizedState !== null && Fm(a, Et, l.memoizedState, l.memoizedProps);
        break;
      case 5:
        ru(l, t, a);
        break;
      case 3:
      case 4:
        var u = Et;
        Et = Cn(l.stateNode.containerInfo), ru(l, t, a), Et = u;
        break;
      case 22:
        l.memoizedState === null && (u = l.alternate, u !== null && u.memoizedState !== null ? (u = ce, ce = 16777216, ru(l, t, a), ce = u) : ru(l, t, a));
        break;
      default:
        ru(l, t, a);
    }
  }
  function mo(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function ie(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) for (var a = 0; a < t.length; a++) {
        var u = t[a];
        Ul = u, ho(u, l);
      }
      mo(l);
    }
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) vo(l), l = l.sibling;
  }
  function vo(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ie(l), l.flags & 2048 && sa(9, l, l.return);
        break;
      case 3:
        ie(l);
        break;
      case 12:
        ie(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, zn(l)) : ie(l);
        break;
      default:
        ie(l);
    }
  }
  function zn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) for (var a = 0; a < t.length; a++) {
        var u = t[a];
        Ul = u, ho(u, l);
      }
      mo(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, t, t.return), zn(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, zn(t));
          break;
        default:
          zn(t);
      }
      l = l.sibling;
    }
  }
  function ho(l, t) {
    for (; Ul !== null; ) {
      var a = Ul;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var u = a.memoizedState.cachePool.pool;
            u != null && u.refCount++;
          }
          break;
        case 24:
          Ku(a.memoizedState.cache);
      }
      if (u = a.child, u !== null) u.return = a, Ul = u;
      else l: for (a = l; Ul !== null; ) {
        u = Ul;
        var e = u.sibling, n = u.return;
        if (eo(u), u === a) {
          Ul = null;
          break l;
        }
        if (e !== null) {
          e.return = n, Ul = e;
          break l;
        }
        Ul = n;
      }
    }
  }
  var dm = { getCacheForType: function(l) {
    var t = xl(Tl), a = t.data.get(l);
    return a === void 0 && (a = l(), t.data.set(l, a)), a;
  }, cacheSignal: function() {
    return xl(Tl).controller.signal;
  } }, ym = typeof WeakMap == "function" ? WeakMap : Map, ll = 0, dl = null, K = null, W = 0, al = 0, ct = null, oa = false, gu = false, xc = false, Wt = 0, bl = 0, da = 0, Qa = 0, Rc = 0, it = 0, bu = 0, se = null, Il = null, Cc = false, Tn = 0, ro = 0, En = 1 / 0, An = null, ya = null, Ol = 0, ma = null, Su = null, $t = 0, qc = 0, jc = null, go = null, oe = 0, Bc = null;
  function st() {
    return (ll & 2) !== 0 && W !== 0 ? W & -W : S.T !== null ? Lc() : xi();
  }
  function bo() {
    if (it === 0) if ((W & 536870912) === 0 || k) {
      var l = He;
      He <<= 1, (He & 3932160) === 0 && (He = 262144), it = l;
    } else it = 536870912;
    return l = nt.current, l !== null && (l.flags |= 32), it;
  }
  function Pl(l, t, a) {
    (l === dl && (al === 2 || al === 9) || l.cancelPendingCommit !== null) && (_u(l, 0), va(l, W, it, false)), Hu(l, a), ((ll & 2) === 0 || l !== dl) && (l === dl && ((ll & 2) === 0 && (Qa |= a), bl === 4 && va(l, W, it, false)), Ht(l));
  }
  function So(l, t, a) {
    if ((ll & 6) !== 0) throw Error(y(327));
    var u = !a && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Nu(l, t), e = u ? hm(l, t) : Gc(l, t, true), n = u;
    do {
      if (e === 0) {
        gu && !u && va(l, t, 0, false);
        break;
      } else {
        if (a = l.current.alternate, n && !mm(a)) {
          e = Gc(l, t, false), n = false;
          continue;
        }
        if (e === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n) var f = 0;
          else f = l.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            t = f;
            l: {
              var c = l;
              e = se;
              var i = c.current.memoizedState.isDehydrated;
              if (i && (_u(c, f).flags |= 256), f = Gc(c, f, false), f !== 2) {
                if (xc && !i) {
                  c.errorRecoveryDisabledLanes |= n, Qa |= n, e = 4;
                  break l;
                }
                n = Il, Il = e, n !== null && (Il === null ? Il = n : Il.push.apply(Il, n));
              }
              e = f;
            }
            if (n = false, e !== 2) continue;
          }
        }
        if (e === 1) {
          _u(l, 0), va(l, t, 0, true);
          break;
        }
        l: {
          switch (u = l, n = e, n) {
            case 0:
            case 1:
              throw Error(y(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              va(u, t, it, !oa);
              break l;
            case 2:
              Il = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(y(329));
          }
          if ((t & 62914560) === t && (e = Tn + 300 - lt(), 10 < e)) {
            if (va(u, t, it, !oa), Re(u, 0, true) !== 0) break l;
            $t = t, u.timeoutHandle = Fo(_o.bind(null, u, a, Il, An, Cc, t, it, Qa, bu, oa, n, "Throttled", -0, 0), e);
            break l;
          }
          _o(u, a, Il, An, Cc, t, it, Qa, bu, oa, n, null, -0, 0);
        }
      }
      break;
    } while (true);
    Ht(l);
  }
  function _o(l, t, a, u, e, n, f, c, i, v, b, T, r, g) {
    if (l.timeoutHandle = -1, T = t.subtreeFlags, T & 8192 || (T & 16785408) === 16785408) {
      T = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: Ct }, yo(t, n, T);
      var D = (n & 62914560) === n ? Tn - lt() : (n & 4194048) === n ? ro - lt() : 0;
      if (D = km(T, D), D !== null) {
        $t = n, l.cancelPendingCommit = D(Do.bind(null, l, t, n, a, u, e, f, c, i, b, T, null, r, g)), va(l, n, f, !v);
        return;
      }
    }
    Do(l, t, n, a, u, e, f, c, i);
  }
  function mm(l) {
    for (var t = l; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null))) for (var u = 0; u < a.length; u++) {
        var e = a[u], n = e.getSnapshot;
        e = e.value;
        try {
          if (!ut(n(), e)) return false;
        } catch {
          return false;
        }
      }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null) a.return = t, t = a;
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
  function va(l, t, a, u) {
    t &= ~Rc, t &= ~Qa, l.suspendedLanes |= t, l.pingedLanes &= ~t, u && (l.warmLanes |= t), u = l.expirationTimes;
    for (var e = t; 0 < e; ) {
      var n = 31 - at(e), f = 1 << n;
      u[n] = -1, e &= ~f;
    }
    a !== 0 && Ui(l, a, t);
  }
  function pn() {
    return (ll & 6) === 0 ? (de(0), false) : true;
  }
  function Yc() {
    if (K !== null) {
      if (al === 0) var l = K.return;
      else l = K, Yt = xa = null, lc(l), ou = null, wu = 0, l = K;
      for (; l !== null; ) F0(l.alternate, l), l = l.return;
      K = null;
    }
  }
  function _u(l, t) {
    var a = l.timeoutHandle;
    a !== -1 && (l.timeoutHandle = -1, Rm(a)), a = l.cancelPendingCommit, a !== null && (l.cancelPendingCommit = null, a()), $t = 0, Yc(), dl = l, K = a = jt(l.current, null), W = t, al = 0, ct = null, oa = false, gu = Nu(l, t), xc = false, bu = it = Rc = Qa = da = bl = 0, Il = se = null, Cc = false, (t & 8) !== 0 && (t |= t & 32);
    var u = l.entangledLanes;
    if (u !== 0) for (l = l.entanglements, u &= t; 0 < u; ) {
      var e = 31 - at(u), n = 1 << e;
      t |= l[e], u &= ~n;
    }
    return Wt = t, Ke(), a;
  }
  function zo(l, t) {
    X = null, S.H = te, t === su || t === Pe ? (t = js(), al = 3) : t === Zf ? (t = js(), al = 4) : al = t === rc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ct = t, K === null && (bl = 1, vn(l, mt(t, l.current)));
  }
  function To() {
    var l = nt.current;
    return l === null ? true : (W & 4194048) === W ? gt === null : (W & 62914560) === W || (W & 536870912) !== 0 ? l === gt : false;
  }
  function Eo() {
    var l = S.H;
    return S.H = te, l === null ? te : l;
  }
  function Ao() {
    var l = S.A;
    return S.A = dm, l;
  }
  function On() {
    bl = 4, oa || (W & 4194048) !== W && nt.current !== null || (gu = true), (da & 134217727) === 0 && (Qa & 134217727) === 0 || dl === null || va(dl, W, it, false);
  }
  function Gc(l, t, a) {
    var u = ll;
    ll |= 2;
    var e = Eo(), n = Ao();
    (dl !== l || W !== t) && (An = null, _u(l, t)), t = false;
    var f = bl;
    l: do
      try {
        if (al !== 0 && K !== null) {
          var c = K, i = ct;
          switch (al) {
            case 8:
              Yc(), f = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              nt.current === null && (t = true);
              var v = al;
              if (al = 0, ct = null, zu(l, c, i, v), a && gu) {
                f = 0;
                break l;
              }
              break;
            default:
              v = al, al = 0, ct = null, zu(l, c, i, v);
          }
        }
        vm(), f = bl;
        break;
      } catch (b) {
        zo(l, b);
      }
    while (true);
    return t && l.shellSuspendCounter++, Yt = xa = null, ll = u, S.H = e, S.A = n, K === null && (dl = null, W = 0, Ke()), f;
  }
  function vm() {
    for (; K !== null; ) po(K);
  }
  function hm(l, t) {
    var a = ll;
    ll |= 2;
    var u = Eo(), e = Ao();
    dl !== l || W !== t ? (An = null, En = lt() + 500, _u(l, t)) : gu = Nu(l, t);
    l: do
      try {
        if (al !== 0 && K !== null) {
          t = K;
          var n = ct;
          t: switch (al) {
            case 1:
              al = 0, ct = null, zu(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Cs(n)) {
                al = 0, ct = null, Oo(t);
                break;
              }
              t = function() {
                al !== 2 && al !== 9 || dl !== l || (al = 7), Ht(l);
              }, n.then(t, t);
              break l;
            case 3:
              al = 7;
              break l;
            case 4:
              al = 5;
              break l;
            case 7:
              Cs(n) ? (al = 0, ct = null, Oo(t)) : (al = 0, ct = null, zu(l, t, n, 7));
              break;
            case 5:
              var f = null;
              switch (K.tag) {
                case 26:
                  f = K.memoizedState;
                case 5:
                case 27:
                  var c = K;
                  if (f ? dd(f) : c.stateNode.complete) {
                    al = 0, ct = null;
                    var i = c.sibling;
                    if (i !== null) K = i;
                    else {
                      var v = c.return;
                      v !== null ? (K = v, Mn(v)) : K = null;
                    }
                    break t;
                  }
              }
              al = 0, ct = null, zu(l, t, n, 5);
              break;
            case 6:
              al = 0, ct = null, zu(l, t, n, 6);
              break;
            case 8:
              Yc(), bl = 6;
              break l;
            default:
              throw Error(y(462));
          }
        }
        rm();
        break;
      } catch (b) {
        zo(l, b);
      }
    while (true);
    return Yt = xa = null, S.H = u, S.A = e, ll = a, K !== null ? 0 : (dl = null, W = 0, Ke(), bl);
  }
  function rm() {
    for (; K !== null && !Gd(); ) po(K);
  }
  function po(l) {
    var t = W0(l.alternate, l, Wt);
    l.memoizedProps = l.pendingProps, t === null ? Mn(l) : K = t;
  }
  function Oo(l) {
    var t = l, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Z0(a, t, t.pendingProps, t.type, void 0, W);
        break;
      case 11:
        t = Z0(a, t, t.pendingProps, t.type.render, t.ref, W);
        break;
      case 5:
        lc(t);
      default:
        F0(a, t), t = K = Es(t, Wt), t = W0(a, t, Wt);
    }
    l.memoizedProps = l.pendingProps, t === null ? Mn(l) : K = t;
  }
  function zu(l, t, a, u) {
    Yt = xa = null, lc(t), ou = null, wu = 0;
    var e = t.return;
    try {
      if (em(l, e, t, a, W)) {
        bl = 1, vn(l, mt(a, l.current)), K = null;
        return;
      }
    } catch (n) {
      if (e !== null) throw K = e, n;
      bl = 1, vn(l, mt(a, l.current)), K = null;
      return;
    }
    t.flags & 32768 ? (k || u === 1 ? l = true : gu || (W & 536870912) !== 0 ? l = false : (oa = l = true, (u === 2 || u === 9 || u === 3 || u === 6) && (u = nt.current, u !== null && u.tag === 13 && (u.flags |= 16384))), Mo(t, l)) : Mn(t);
  }
  function Mn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Mo(t, oa);
        return;
      }
      l = t.return;
      var a = cm(t.alternate, t, Wt);
      if (a !== null) {
        K = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        K = t;
        return;
      }
      K = t = l;
    } while (t !== null);
    bl === 0 && (bl = 5);
  }
  function Mo(l, t) {
    do {
      var a = im(l.alternate, l);
      if (a !== null) {
        a.flags &= 32767, K = a;
        return;
      }
      if (a = l.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (l = l.sibling, l !== null)) {
        K = l;
        return;
      }
      K = l = a;
    } while (l !== null);
    bl = 6, K = null;
  }
  function Do(l, t, a, u, e, n, f, c, i) {
    l.cancelPendingCommit = null;
    do
      Dn();
    while (Ol !== 0);
    if ((ll & 6) !== 0) throw Error(y(327));
    if (t !== null) {
      if (t === l.current) throw Error(y(177));
      if (n = t.lanes | t.childLanes, n |= Mf, $d(l, a, n, f, c, i), l === dl && (K = dl = null, W = 0), Su = t, ma = l, $t = a, qc = n, jc = e, go = u, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, _m(Ue, function() {
        return Ro(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), u = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || u) {
        u = S.T, S.T = null, e = O.p, O.p = 2, f = ll, ll |= 4;
        try {
          sm(l, t, a);
        } finally {
          ll = f, O.p = e, S.T = u;
        }
      }
      Ol = 1, Uo(), No(), Ho();
    }
  }
  function Uo() {
    if (Ol === 1) {
      Ol = 0;
      var l = ma, t = Su, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = S.T, S.T = null;
        var u = O.p;
        O.p = 2;
        var e = ll;
        ll |= 4;
        try {
          io(t, l);
          var n = kc, f = vs(l.containerInfo), c = n.focusedElem, i = n.selectionRange;
          if (f !== c && c && c.ownerDocument && ms(c.ownerDocument.documentElement, c)) {
            if (i !== null && Tf(c)) {
              var v = i.start, b = i.end;
              if (b === void 0 && (b = v), "selectionStart" in c) c.selectionStart = v, c.selectionEnd = Math.min(b, c.value.length);
              else {
                var T = c.ownerDocument || document, r = T && T.defaultView || window;
                if (r.getSelection) {
                  var g = r.getSelection(), D = c.textContent.length, j = Math.min(i.start, D), cl = i.end === void 0 ? j : Math.min(i.end, D);
                  !g.extend && j > cl && (f = cl, cl = j, j = f);
                  var d = ys(c, j), s = ys(c, cl);
                  if (d && s && (g.rangeCount !== 1 || g.anchorNode !== d.node || g.anchorOffset !== d.offset || g.focusNode !== s.node || g.focusOffset !== s.offset)) {
                    var m = T.createRange();
                    m.setStart(d.node, d.offset), g.removeAllRanges(), j > cl ? (g.addRange(m), g.extend(s.node, s.offset)) : (m.setEnd(s.node, s.offset), g.addRange(m));
                  }
                }
              }
            }
            for (T = [], g = c; g = g.parentNode; ) g.nodeType === 1 && T.push({ element: g, left: g.scrollLeft, top: g.scrollTop });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < T.length; c++) {
              var _ = T[c];
              _.element.scrollLeft = _.left, _.element.scrollTop = _.top;
            }
          }
          Xn = !!Fc, kc = Fc = null;
        } finally {
          ll = e, O.p = u, S.T = a;
        }
      }
      l.current = t, Ol = 2;
    }
  }
  function No() {
    if (Ol === 2) {
      Ol = 0;
      var l = ma, t = Su, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = S.T, S.T = null;
        var u = O.p;
        O.p = 2;
        var e = ll;
        ll |= 4;
        try {
          uo(l, t.alternate, t);
        } finally {
          ll = e, O.p = u, S.T = a;
        }
      }
      Ol = 3;
    }
  }
  function Ho() {
    if (Ol === 4 || Ol === 3) {
      Ol = 0, Xd();
      var l = ma, t = Su, a = $t, u = go;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Ol = 5 : (Ol = 0, Su = ma = null, xo(l, l.pendingLanes));
      var e = l.pendingLanes;
      if (e === 0 && (ya = null), af(a), t = t.stateNode, tt && typeof tt.onCommitFiberRoot == "function") try {
        tt.onCommitFiberRoot(Uu, t, void 0, (t.current.flags & 128) === 128);
      } catch {
      }
      if (u !== null) {
        t = S.T, e = O.p, O.p = 2, S.T = null;
        try {
          for (var n = l.onRecoverableError, f = 0; f < u.length; f++) {
            var c = u[f];
            n(c.value, { componentStack: c.stack });
          }
        } finally {
          S.T = t, O.p = e;
        }
      }
      ($t & 3) !== 0 && Dn(), Ht(l), e = l.pendingLanes, (a & 261930) !== 0 && (e & 42) !== 0 ? l === Bc ? oe++ : (oe = 0, Bc = l) : oe = 0, de(0);
    }
  }
  function xo(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Ku(t)));
  }
  function Dn() {
    return Uo(), No(), Ho(), Ro();
  }
  function Ro() {
    if (Ol !== 5) return false;
    var l = ma, t = qc;
    qc = 0;
    var a = af($t), u = S.T, e = O.p;
    try {
      O.p = 32 > a ? 32 : a, S.T = null, a = jc, jc = null;
      var n = ma, f = $t;
      if (Ol = 0, Su = ma = null, $t = 0, (ll & 6) !== 0) throw Error(y(331));
      var c = ll;
      if (ll |= 4, vo(n.current), oo(n, n.current, f, a), ll = c, de(0, false), tt && typeof tt.onPostCommitFiberRoot == "function") try {
        tt.onPostCommitFiberRoot(Uu, n);
      } catch {
      }
      return true;
    } finally {
      O.p = e, S.T = u, xo(l, t);
    }
  }
  function Co(l, t, a) {
    t = mt(a, t), t = hc(l.stateNode, t, 2), l = fa(l, t, 2), l !== null && (Hu(l, 2), Ht(l));
  }
  function ul(l, t, a) {
    if (l.tag === 3) Co(l, l, a);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Co(t, l, a);
        break;
      } else if (t.tag === 1) {
        var u = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (ya === null || !ya.has(u))) {
          l = mt(a, l), a = C0(2), u = fa(t, a, 2), u !== null && (q0(a, u, t, l), Hu(u, 2), Ht(u));
          break;
        }
      }
      t = t.return;
    }
  }
  function Xc(l, t, a) {
    var u = l.pingCache;
    if (u === null) {
      u = l.pingCache = new ym();
      var e = /* @__PURE__ */ new Set();
      u.set(t, e);
    } else e = u.get(t), e === void 0 && (e = /* @__PURE__ */ new Set(), u.set(t, e));
    e.has(a) || (xc = true, e.add(a), l = gm.bind(null, l, t, a), t.then(l, l));
  }
  function gm(l, t, a) {
    var u = l.pingCache;
    u !== null && u.delete(t), l.pingedLanes |= l.suspendedLanes & a, l.warmLanes &= ~a, dl === l && (W & a) === a && (bl === 4 || bl === 3 && (W & 62914560) === W && 300 > lt() - Tn ? (ll & 2) === 0 && _u(l, 0) : Rc |= a, bu === W && (bu = 0)), Ht(l);
  }
  function qo(l, t) {
    t === 0 && (t = Di()), l = Ua(l, t), l !== null && (Hu(l, t), Ht(l));
  }
  function bm(l) {
    var t = l.memoizedState, a = 0;
    t !== null && (a = t.retryLane), qo(l, a);
  }
  function Sm(l, t) {
    var a = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var u = l.stateNode, e = l.memoizedState;
        e !== null && (a = e.retryLane);
        break;
      case 19:
        u = l.stateNode;
        break;
      case 22:
        u = l.stateNode._retryCache;
        break;
      default:
        throw Error(y(314));
    }
    u !== null && u.delete(t), qo(l, a);
  }
  function _m(l, t) {
    return In(l, t);
  }
  var Un = null, Tu = null, Qc = false, Nn = false, Zc = false, ha = 0;
  function Ht(l) {
    l !== Tu && l.next === null && (Tu === null ? Un = Tu = l : Tu = Tu.next = l), Nn = true, Qc || (Qc = true, Tm());
  }
  function de(l, t) {
    if (!Zc && Nn) {
      Zc = true;
      do
        for (var a = false, u = Un; u !== null; ) {
          if (l !== 0) {
            var e = u.pendingLanes;
            if (e === 0) var n = 0;
            else {
              var f = u.suspendedLanes, c = u.pingedLanes;
              n = (1 << 31 - at(42 | l) + 1) - 1, n &= e & ~(f & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (a = true, Go(u, n));
          } else n = W, n = Re(u, u === dl ? n : 0, u.cancelPendingCommit !== null || u.timeoutHandle !== -1), (n & 3) === 0 || Nu(u, n) || (a = true, Go(u, n));
          u = u.next;
        }
      while (a);
      Zc = false;
    }
  }
  function zm() {
    jo();
  }
  function jo() {
    Nn = Qc = false;
    var l = 0;
    ha !== 0 && xm() && (l = ha);
    for (var t = lt(), a = null, u = Un; u !== null; ) {
      var e = u.next, n = Bo(u, t);
      n === 0 ? (u.next = null, a === null ? Un = e : a.next = e, e === null && (Tu = a)) : (a = u, (l !== 0 || (n & 3) !== 0) && (Nn = true)), u = e;
    }
    Ol !== 0 && Ol !== 5 || de(l), ha !== 0 && (ha = 0);
  }
  function Bo(l, t) {
    for (var a = l.suspendedLanes, u = l.pingedLanes, e = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var f = 31 - at(n), c = 1 << f, i = e[f];
      i === -1 ? ((c & a) === 0 || (c & u) !== 0) && (e[f] = Wd(c, t)) : i <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = dl, a = W, a = Re(l, l === t ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), u = l.callbackNode, a === 0 || l === t && (al === 2 || al === 9) || l.cancelPendingCommit !== null) return u !== null && u !== null && Pn(u), l.callbackNode = null, l.callbackPriority = 0;
    if ((a & 3) === 0 || Nu(l, a)) {
      if (t = a & -a, t === l.callbackPriority) return t;
      switch (u !== null && Pn(u), af(a)) {
        case 2:
        case 8:
          a = Oi;
          break;
        case 32:
          a = Ue;
          break;
        case 268435456:
          a = Mi;
          break;
        default:
          a = Ue;
      }
      return u = Yo.bind(null, l), a = In(a, u), l.callbackPriority = t, l.callbackNode = a, t;
    }
    return u !== null && u !== null && Pn(u), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Yo(l, t) {
    if (Ol !== 0 && Ol !== 5) return l.callbackNode = null, l.callbackPriority = 0, null;
    var a = l.callbackNode;
    if (Dn() && l.callbackNode !== a) return null;
    var u = W;
    return u = Re(l, l === dl ? u : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), u === 0 ? null : (So(l, u, t), Bo(l, lt()), l.callbackNode != null && l.callbackNode === a ? Yo.bind(null, l) : null);
  }
  function Go(l, t) {
    if (Dn()) return null;
    So(l, t, true);
  }
  function Tm() {
    Cm(function() {
      (ll & 6) !== 0 ? In(pi, zm) : jo();
    });
  }
  function Lc() {
    if (ha === 0) {
      var l = cu;
      l === 0 && (l = Ne, Ne <<= 1, (Ne & 261888) === 0 && (Ne = 256)), ha = l;
    }
    return ha;
  }
  function Xo(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Be("" + l);
  }
  function Qo(l, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, l.id && a.setAttribute("form", l.id), t.parentNode.insertBefore(a, t), l = new FormData(l), a.parentNode.removeChild(a), l;
  }
  function Em(l, t, a, u, e) {
    if (t === "submit" && a && a.stateNode === e) {
      var n = Xo((e[wl] || null).action), f = u.submitter;
      f && (t = (t = f[wl] || null) ? Xo(t.formAction) : f.getAttribute("formAction"), t !== null && (n = t, f = null));
      var c = new Qe("action", "action", null, u, e);
      l.push({ event: c, listeners: [{ instance: null, listener: function() {
        if (u.defaultPrevented) {
          if (ha !== 0) {
            var i = f ? Qo(e, f) : new FormData(e);
            sc(a, { pending: true, data: i, method: e.method, action: n }, null, i);
          }
        } else typeof n == "function" && (c.preventDefault(), i = f ? Qo(e, f) : new FormData(e), sc(a, { pending: true, data: i, method: e.method, action: n }, n, i));
      }, currentTarget: e }] });
    }
  }
  for (var Vc = 0; Vc < Of.length; Vc++) {
    var Kc = Of[Vc], Am = Kc.toLowerCase(), pm = Kc[0].toUpperCase() + Kc.slice(1);
    Tt(Am, "on" + pm);
  }
  Tt(gs, "onAnimationEnd"), Tt(bs, "onAnimationIteration"), Tt(Ss, "onAnimationStart"), Tt("dblclick", "onDoubleClick"), Tt("focusin", "onFocus"), Tt("focusout", "onBlur"), Tt(Qy, "onTransitionRun"), Tt(Zy, "onTransitionStart"), Tt(Ly, "onTransitionCancel"), Tt(_s, "onTransitionEnd"), wa("onMouseEnter", ["mouseout", "mouseover"]), wa("onMouseLeave", ["mouseout", "mouseover"]), wa("onPointerEnter", ["pointerout", "pointerover"]), wa("onPointerLeave", ["pointerout", "pointerover"]), pa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), pa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), pa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), pa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), pa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), pa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ye = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Om = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ye));
  function Zo(l, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < l.length; a++) {
      var u = l[a], e = u.event;
      u = u.listeners;
      l: {
        var n = void 0;
        if (t) for (var f = u.length - 1; 0 <= f; f--) {
          var c = u[f], i = c.instance, v = c.currentTarget;
          if (c = c.listener, i !== n && e.isPropagationStopped()) break l;
          n = c, e.currentTarget = v;
          try {
            n(e);
          } catch (b) {
            Ve(b);
          }
          e.currentTarget = null, n = i;
        }
        else for (f = 0; f < u.length; f++) {
          if (c = u[f], i = c.instance, v = c.currentTarget, c = c.listener, i !== n && e.isPropagationStopped()) break l;
          n = c, e.currentTarget = v;
          try {
            n(e);
          } catch (b) {
            Ve(b);
          }
          e.currentTarget = null, n = i;
        }
      }
    }
  }
  function J(l, t) {
    var a = t[uf];
    a === void 0 && (a = t[uf] = /* @__PURE__ */ new Set());
    var u = l + "__bubble";
    a.has(u) || (Lo(t, l, 2, false), a.add(u));
  }
  function Jc(l, t, a) {
    var u = 0;
    t && (u |= 4), Lo(a, l, u, t);
  }
  var Hn = "_reactListening" + Math.random().toString(36).slice(2);
  function wc(l) {
    if (!l[Hn]) {
      l[Hn] = true, qi.forEach(function(a) {
        a !== "selectionchange" && (Om.has(a) || Jc(a, false, l), Jc(a, true, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Hn] || (t[Hn] = true, Jc("selectionchange", false, t));
    }
  }
  function Lo(l, t, a, u) {
    switch (bd(t)) {
      case 2:
        var e = lv;
        break;
      case 8:
        e = tv;
        break;
      default:
        e = ii;
    }
    a = e.bind(null, t, a, l), e = void 0, !mf || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (e = true), u ? e !== void 0 ? l.addEventListener(t, a, { capture: true, passive: e }) : l.addEventListener(t, a, true) : e !== void 0 ? l.addEventListener(t, a, { passive: e }) : l.addEventListener(t, a, false);
  }
  function Wc(l, t, a, u, e) {
    var n = u;
    if ((t & 1) === 0 && (t & 2) === 0 && u !== null) l: for (; ; ) {
      if (u === null) return;
      var f = u.tag;
      if (f === 3 || f === 4) {
        var c = u.stateNode.containerInfo;
        if (c === e) break;
        if (f === 4) for (f = u.return; f !== null; ) {
          var i = f.tag;
          if ((i === 3 || i === 4) && f.stateNode.containerInfo === e) return;
          f = f.return;
        }
        for (; c !== null; ) {
          if (f = Va(c), f === null) return;
          if (i = f.tag, i === 5 || i === 6 || i === 26 || i === 27) {
            u = n = f;
            continue l;
          }
          c = c.parentNode;
        }
      }
      u = u.return;
    }
    wi(function() {
      var v = n, b = df(a), T = [];
      l: {
        var r = zs.get(l);
        if (r !== void 0) {
          var g = Qe, D = l;
          switch (l) {
            case "keypress":
              if (Ge(a) === 0) break l;
            case "keydown":
            case "keyup":
              g = Sy;
              break;
            case "focusin":
              D = "focus", g = gf;
              break;
            case "focusout":
              D = "blur", g = gf;
              break;
            case "beforeblur":
            case "afterblur":
              g = gf;
              break;
            case "click":
              if (a.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = Fi;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = cy;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = Ty;
              break;
            case gs:
            case bs:
            case Ss:
              g = oy;
              break;
            case _s:
              g = Ay;
              break;
            case "scroll":
            case "scrollend":
              g = ny;
              break;
            case "wheel":
              g = Oy;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = yy;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Ii;
              break;
            case "toggle":
            case "beforetoggle":
              g = Dy;
          }
          var j = (t & 4) !== 0, cl = !j && (l === "scroll" || l === "scrollend"), d = j ? r !== null ? r + "Capture" : null : r;
          j = [];
          for (var s = v, m; s !== null; ) {
            var _ = s;
            if (m = _.stateNode, _ = _.tag, _ !== 5 && _ !== 26 && _ !== 27 || m === null || d === null || (_ = Cu(s, d), _ != null && j.push(me(s, _, m))), cl) break;
            s = s.return;
          }
          0 < j.length && (r = new g(r, D, null, a, b), T.push({ event: r, listeners: j }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (r = l === "mouseover" || l === "pointerover", g = l === "mouseout" || l === "pointerout", r && a !== of && (D = a.relatedTarget || a.fromElement) && (Va(D) || D[La])) break l;
          if ((g || r) && (r = b.window === b ? b : (r = b.ownerDocument) ? r.defaultView || r.parentWindow : window, g ? (D = a.relatedTarget || a.toElement, g = v, D = D ? Va(D) : null, D !== null && (cl = Z(D), j = D.tag, D !== cl || j !== 5 && j !== 27 && j !== 6) && (D = null)) : (g = null, D = v), g !== D)) {
            if (j = Fi, _ = "onMouseLeave", d = "onMouseEnter", s = "mouse", (l === "pointerout" || l === "pointerover") && (j = Ii, _ = "onPointerLeave", d = "onPointerEnter", s = "pointer"), cl = g == null ? r : Ru(g), m = D == null ? r : Ru(D), r = new j(_, s + "leave", g, a, b), r.target = cl, r.relatedTarget = m, _ = null, Va(b) === v && (j = new j(d, s + "enter", D, a, b), j.target = m, j.relatedTarget = cl, _ = j), cl = _, g && D) t: {
              for (j = Mm, d = g, s = D, m = 0, _ = d; _; _ = j(_)) m++;
              _ = 0;
              for (var R = s; R; R = j(R)) _++;
              for (; 0 < m - _; ) d = j(d), m--;
              for (; 0 < _ - m; ) s = j(s), _--;
              for (; m--; ) {
                if (d === s || s !== null && d === s.alternate) {
                  j = d;
                  break t;
                }
                d = j(d), s = j(s);
              }
              j = null;
            }
            else j = null;
            g !== null && Vo(T, r, g, j, false), D !== null && cl !== null && Vo(T, cl, D, j, true);
          }
        }
        l: {
          if (r = v ? Ru(v) : window, g = r.nodeName && r.nodeName.toLowerCase(), g === "select" || g === "input" && r.type === "file") var I = fs;
          else if (es(r)) if (cs) I = Yy;
          else {
            I = jy;
            var H = qy;
          }
          else g = r.nodeName, !g || g.toLowerCase() !== "input" || r.type !== "checkbox" && r.type !== "radio" ? v && sf(v.elementType) && (I = fs) : I = By;
          if (I && (I = I(l, v))) {
            ns(T, I, a, b);
            break l;
          }
          H && H(l, r, v), l === "focusout" && v && r.type === "number" && v.memoizedProps.value != null && cf(r, "number", r.value);
        }
        switch (H = v ? Ru(v) : window, l) {
          case "focusin":
            (es(H) || H.contentEditable === "true") && (Pa = H, Ef = v, Zu = null);
            break;
          case "focusout":
            Zu = Ef = Pa = null;
            break;
          case "mousedown":
            Af = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Af = false, hs(T, a, b);
            break;
          case "selectionchange":
            if (Xy) break;
          case "keydown":
          case "keyup":
            hs(T, a, b);
        }
        var Q;
        if (Sf) l: {
          switch (l) {
            case "compositionstart":
              var $ = "onCompositionStart";
              break l;
            case "compositionend":
              $ = "onCompositionEnd";
              break l;
            case "compositionupdate":
              $ = "onCompositionUpdate";
              break l;
          }
          $ = void 0;
        }
        else Ia ? as(l, a) && ($ = "onCompositionEnd") : l === "keydown" && a.keyCode === 229 && ($ = "onCompositionStart");
        $ && (Pi && a.locale !== "ko" && (Ia || $ !== "onCompositionStart" ? $ === "onCompositionEnd" && Ia && (Q = Wi()) : (Pt = b, vf = "value" in Pt ? Pt.value : Pt.textContent, Ia = true)), H = xn(v, $), 0 < H.length && ($ = new ki($, l, null, a, b), T.push({ event: $, listeners: H }), Q ? $.data = Q : (Q = us(a), Q !== null && ($.data = Q)))), (Q = Ny ? Hy(l, a) : xy(l, a)) && ($ = xn(v, "onBeforeInput"), 0 < $.length && (H = new ki("onBeforeInput", "beforeinput", null, a, b), T.push({ event: H, listeners: $ }), H.data = Q)), Em(T, l, v, a, b);
      }
      Zo(T, t);
    });
  }
  function me(l, t, a) {
    return { instance: l, listener: t, currentTarget: a };
  }
  function xn(l, t) {
    for (var a = t + "Capture", u = []; l !== null; ) {
      var e = l, n = e.stateNode;
      if (e = e.tag, e !== 5 && e !== 26 && e !== 27 || n === null || (e = Cu(l, a), e != null && u.unshift(me(l, e, n)), e = Cu(l, t), e != null && u.push(me(l, e, n))), l.tag === 3) return u;
      l = l.return;
    }
    return [];
  }
  function Mm(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Vo(l, t, a, u, e) {
    for (var n = t._reactName, f = []; a !== null && a !== u; ) {
      var c = a, i = c.alternate, v = c.stateNode;
      if (c = c.tag, i !== null && i === u) break;
      c !== 5 && c !== 26 && c !== 27 || v === null || (i = v, e ? (v = Cu(a, n), v != null && f.unshift(me(a, v, i))) : e || (v = Cu(a, n), v != null && f.push(me(a, v, i)))), a = a.return;
    }
    f.length !== 0 && l.push({ event: t, listeners: f });
  }
  var Dm = /\r\n?/g, Um = /\u0000|\uFFFD/g;
  function Ko(l) {
    return (typeof l == "string" ? l : "" + l).replace(Dm, `
`).replace(Um, "");
  }
  function Jo(l, t) {
    return t = Ko(t), Ko(l) === t;
  }
  function fl(l, t, a, u, e, n) {
    switch (a) {
      case "children":
        typeof u == "string" ? t === "body" || t === "textarea" && u === "" || $a(l, u) : (typeof u == "number" || typeof u == "bigint") && t !== "body" && $a(l, "" + u);
        break;
      case "className":
        qe(l, "class", u);
        break;
      case "tabIndex":
        qe(l, "tabindex", u);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        qe(l, a, u);
        break;
      case "style":
        Ki(l, u, n);
        break;
      case "data":
        if (t !== "object") {
          qe(l, "data", u);
          break;
        }
      case "src":
      case "href":
        if (u === "" && (t !== "a" || a !== "href")) {
          l.removeAttribute(a);
          break;
        }
        if (u == null || typeof u == "function" || typeof u == "symbol" || typeof u == "boolean") {
          l.removeAttribute(a);
          break;
        }
        u = Be("" + u), l.setAttribute(a, u);
        break;
      case "action":
      case "formAction":
        if (typeof u == "function") {
          l.setAttribute(a, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof n == "function" && (a === "formAction" ? (t !== "input" && fl(l, t, "name", e.name, e, null), fl(l, t, "formEncType", e.formEncType, e, null), fl(l, t, "formMethod", e.formMethod, e, null), fl(l, t, "formTarget", e.formTarget, e, null)) : (fl(l, t, "encType", e.encType, e, null), fl(l, t, "method", e.method, e, null), fl(l, t, "target", e.target, e, null)));
        if (u == null || typeof u == "symbol" || typeof u == "boolean") {
          l.removeAttribute(a);
          break;
        }
        u = Be("" + u), l.setAttribute(a, u);
        break;
      case "onClick":
        u != null && (l.onclick = Ct);
        break;
      case "onScroll":
        u != null && J("scroll", l);
        break;
      case "onScrollEnd":
        u != null && J("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (u != null) {
          if (typeof u != "object" || !("__html" in u)) throw Error(y(61));
          if (a = u.__html, a != null) {
            if (e.children != null) throw Error(y(60));
            l.innerHTML = a;
          }
        }
        break;
      case "multiple":
        l.multiple = u && typeof u != "function" && typeof u != "symbol";
        break;
      case "muted":
        l.muted = u && typeof u != "function" && typeof u != "symbol";
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
        if (u == null || typeof u == "function" || typeof u == "boolean" || typeof u == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        a = Be("" + u), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        u != null && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(a, "" + u) : l.removeAttribute(a);
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
        u && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(a, "") : l.removeAttribute(a);
        break;
      case "capture":
      case "download":
        u === true ? l.setAttribute(a, "") : u !== false && u != null && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(a, u) : l.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        u != null && typeof u != "function" && typeof u != "symbol" && !isNaN(u) && 1 <= u ? l.setAttribute(a, u) : l.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        u == null || typeof u == "function" || typeof u == "symbol" || isNaN(u) ? l.removeAttribute(a) : l.setAttribute(a, u);
        break;
      case "popover":
        J("beforetoggle", l), J("toggle", l), Ce(l, "popover", u);
        break;
      case "xlinkActuate":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:actuate", u);
        break;
      case "xlinkArcrole":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", u);
        break;
      case "xlinkRole":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:role", u);
        break;
      case "xlinkShow":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:show", u);
        break;
      case "xlinkTitle":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:title", u);
        break;
      case "xlinkType":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:type", u);
        break;
      case "xmlBase":
        Rt(l, "http://www.w3.org/XML/1998/namespace", "xml:base", u);
        break;
      case "xmlLang":
        Rt(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", u);
        break;
      case "xmlSpace":
        Rt(l, "http://www.w3.org/XML/1998/namespace", "xml:space", u);
        break;
      case "is":
        Ce(l, "is", u);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = uy.get(a) || a, Ce(l, a, u));
    }
  }
  function $c(l, t, a, u, e, n) {
    switch (a) {
      case "style":
        Ki(l, u, n);
        break;
      case "dangerouslySetInnerHTML":
        if (u != null) {
          if (typeof u != "object" || !("__html" in u)) throw Error(y(61));
          if (a = u.__html, a != null) {
            if (e.children != null) throw Error(y(60));
            l.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof u == "string" ? $a(l, u) : (typeof u == "number" || typeof u == "bigint") && $a(l, "" + u);
        break;
      case "onScroll":
        u != null && J("scroll", l);
        break;
      case "onScrollEnd":
        u != null && J("scrollend", l);
        break;
      case "onClick":
        u != null && (l.onclick = Ct);
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
        if (!ji.hasOwnProperty(a)) l: {
          if (a[0] === "o" && a[1] === "n" && (e = a.endsWith("Capture"), t = a.slice(2, e ? a.length - 7 : void 0), n = l[wl] || null, n = n != null ? n[a] : null, typeof n == "function" && l.removeEventListener(t, n, e), typeof u == "function")) {
            typeof n != "function" && n !== null && (a in l ? l[a] = null : l.hasAttribute(a) && l.removeAttribute(a)), l.addEventListener(t, u, e);
            break l;
          }
          a in l ? l[a] = u : u === true ? l.setAttribute(a, "") : Ce(l, a, u);
        }
    }
  }
  function Cl(l, t, a) {
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
        J("error", l), J("load", l);
        var u = false, e = false, n;
        for (n in a) if (a.hasOwnProperty(n)) {
          var f = a[n];
          if (f != null) switch (n) {
            case "src":
              u = true;
              break;
            case "srcSet":
              e = true;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(y(137, t));
            default:
              fl(l, t, n, f, a, null);
          }
        }
        e && fl(l, t, "srcSet", a.srcSet, a, null), u && fl(l, t, "src", a.src, a, null);
        return;
      case "input":
        J("invalid", l);
        var c = n = f = e = null, i = null, v = null;
        for (u in a) if (a.hasOwnProperty(u)) {
          var b = a[u];
          if (b != null) switch (u) {
            case "name":
              e = b;
              break;
            case "type":
              f = b;
              break;
            case "checked":
              i = b;
              break;
            case "defaultChecked":
              v = b;
              break;
            case "value":
              n = b;
              break;
            case "defaultValue":
              c = b;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (b != null) throw Error(y(137, t));
              break;
            default:
              fl(l, t, u, b, a, null);
          }
        }
        Qi(l, n, c, i, v, f, e, false);
        return;
      case "select":
        J("invalid", l), u = f = n = null;
        for (e in a) if (a.hasOwnProperty(e) && (c = a[e], c != null)) switch (e) {
          case "value":
            n = c;
            break;
          case "defaultValue":
            f = c;
            break;
          case "multiple":
            u = c;
          default:
            fl(l, t, e, c, a, null);
        }
        t = n, a = f, l.multiple = !!u, t != null ? Wa(l, !!u, t, false) : a != null && Wa(l, !!u, a, true);
        return;
      case "textarea":
        J("invalid", l), n = e = u = null;
        for (f in a) if (a.hasOwnProperty(f) && (c = a[f], c != null)) switch (f) {
          case "value":
            u = c;
            break;
          case "defaultValue":
            e = c;
            break;
          case "children":
            n = c;
            break;
          case "dangerouslySetInnerHTML":
            if (c != null) throw Error(y(91));
            break;
          default:
            fl(l, t, f, c, a, null);
        }
        Li(l, u, e, n);
        return;
      case "option":
        for (i in a) if (a.hasOwnProperty(i) && (u = a[i], u != null)) switch (i) {
          case "selected":
            l.selected = u && typeof u != "function" && typeof u != "symbol";
            break;
          default:
            fl(l, t, i, u, a, null);
        }
        return;
      case "dialog":
        J("beforetoggle", l), J("toggle", l), J("cancel", l), J("close", l);
        break;
      case "iframe":
      case "object":
        J("load", l);
        break;
      case "video":
      case "audio":
        for (u = 0; u < ye.length; u++) J(ye[u], l);
        break;
      case "image":
        J("error", l), J("load", l);
        break;
      case "details":
        J("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        J("error", l), J("load", l);
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
        for (v in a) if (a.hasOwnProperty(v) && (u = a[v], u != null)) switch (v) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(y(137, t));
          default:
            fl(l, t, v, u, a, null);
        }
        return;
      default:
        if (sf(t)) {
          for (b in a) a.hasOwnProperty(b) && (u = a[b], u !== void 0 && $c(l, t, b, u, a, void 0));
          return;
        }
    }
    for (c in a) a.hasOwnProperty(c) && (u = a[c], u != null && fl(l, t, c, u, a, null));
  }
  function Nm(l, t, a, u) {
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
        var e = null, n = null, f = null, c = null, i = null, v = null, b = null;
        for (g in a) {
          var T = a[g];
          if (a.hasOwnProperty(g) && T != null) switch (g) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = T;
            default:
              u.hasOwnProperty(g) || fl(l, t, g, null, u, T);
          }
        }
        for (var r in u) {
          var g = u[r];
          if (T = a[r], u.hasOwnProperty(r) && (g != null || T != null)) switch (r) {
            case "type":
              n = g;
              break;
            case "name":
              e = g;
              break;
            case "checked":
              v = g;
              break;
            case "defaultChecked":
              b = g;
              break;
            case "value":
              f = g;
              break;
            case "defaultValue":
              c = g;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (g != null) throw Error(y(137, t));
              break;
            default:
              g !== T && fl(l, t, r, g, u, T);
          }
        }
        ff(l, f, c, i, v, b, n, e);
        return;
      case "select":
        g = f = c = r = null;
        for (n in a) if (i = a[n], a.hasOwnProperty(n) && i != null) switch (n) {
          case "value":
            break;
          case "multiple":
            g = i;
          default:
            u.hasOwnProperty(n) || fl(l, t, n, null, u, i);
        }
        for (e in u) if (n = u[e], i = a[e], u.hasOwnProperty(e) && (n != null || i != null)) switch (e) {
          case "value":
            r = n;
            break;
          case "defaultValue":
            c = n;
            break;
          case "multiple":
            f = n;
          default:
            n !== i && fl(l, t, e, n, u, i);
        }
        t = c, a = f, u = g, r != null ? Wa(l, !!a, r, false) : !!u != !!a && (t != null ? Wa(l, !!a, t, true) : Wa(l, !!a, a ? [] : "", false));
        return;
      case "textarea":
        g = r = null;
        for (c in a) if (e = a[c], a.hasOwnProperty(c) && e != null && !u.hasOwnProperty(c)) switch (c) {
          case "value":
            break;
          case "children":
            break;
          default:
            fl(l, t, c, null, u, e);
        }
        for (f in u) if (e = u[f], n = a[f], u.hasOwnProperty(f) && (e != null || n != null)) switch (f) {
          case "value":
            r = e;
            break;
          case "defaultValue":
            g = e;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (e != null) throw Error(y(91));
            break;
          default:
            e !== n && fl(l, t, f, e, u, n);
        }
        Zi(l, r, g);
        return;
      case "option":
        for (var D in a) if (r = a[D], a.hasOwnProperty(D) && r != null && !u.hasOwnProperty(D)) switch (D) {
          case "selected":
            l.selected = false;
            break;
          default:
            fl(l, t, D, null, u, r);
        }
        for (i in u) if (r = u[i], g = a[i], u.hasOwnProperty(i) && r !== g && (r != null || g != null)) switch (i) {
          case "selected":
            l.selected = r && typeof r != "function" && typeof r != "symbol";
            break;
          default:
            fl(l, t, i, r, u, g);
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
        for (var j in a) r = a[j], a.hasOwnProperty(j) && r != null && !u.hasOwnProperty(j) && fl(l, t, j, null, u, r);
        for (v in u) if (r = u[v], g = a[v], u.hasOwnProperty(v) && r !== g && (r != null || g != null)) switch (v) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (r != null) throw Error(y(137, t));
            break;
          default:
            fl(l, t, v, r, u, g);
        }
        return;
      default:
        if (sf(t)) {
          for (var cl in a) r = a[cl], a.hasOwnProperty(cl) && r !== void 0 && !u.hasOwnProperty(cl) && $c(l, t, cl, void 0, u, r);
          for (b in u) r = u[b], g = a[b], !u.hasOwnProperty(b) || r === g || r === void 0 && g === void 0 || $c(l, t, b, r, u, g);
          return;
        }
    }
    for (var d in a) r = a[d], a.hasOwnProperty(d) && r != null && !u.hasOwnProperty(d) && fl(l, t, d, null, u, r);
    for (T in u) r = u[T], g = a[T], !u.hasOwnProperty(T) || r === g || r == null && g == null || fl(l, t, T, r, u, g);
  }
  function wo(l) {
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
  function Hm() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, a = performance.getEntriesByType("resource"), u = 0; u < a.length; u++) {
        var e = a[u], n = e.transferSize, f = e.initiatorType, c = e.duration;
        if (n && c && wo(f)) {
          for (f = 0, c = e.responseEnd, u += 1; u < a.length; u++) {
            var i = a[u], v = i.startTime;
            if (v > c) break;
            var b = i.transferSize, T = i.initiatorType;
            b && wo(T) && (i = i.responseEnd, f += b * (i < c ? 1 : (c - v) / (i - v)));
          }
          if (--u, t += 8 * (n + f) / (e.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Fc = null, kc = null;
  function Rn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Wo(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function $o(l, t) {
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
  function Ic(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Pc = null;
  function xm() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Pc ? false : (Pc = l, true) : (Pc = null, false);
  }
  var Fo = typeof setTimeout == "function" ? setTimeout : void 0, Rm = typeof clearTimeout == "function" ? clearTimeout : void 0, ko = typeof Promise == "function" ? Promise : void 0, Cm = typeof queueMicrotask == "function" ? queueMicrotask : typeof ko < "u" ? function(l) {
    return ko.resolve(null).then(l).catch(qm);
  } : Fo;
  function qm(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function ra(l) {
    return l === "head";
  }
  function Io(l, t) {
    var a = t, u = 0;
    do {
      var e = a.nextSibling;
      if (l.removeChild(a), e && e.nodeType === 8) if (a = e.data, a === "/$" || a === "/&") {
        if (u === 0) {
          l.removeChild(e), Ou(t);
          return;
        }
        u--;
      } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") u++;
      else if (a === "html") ve(l.ownerDocument.documentElement);
      else if (a === "head") {
        a = l.ownerDocument.head, ve(a);
        for (var n = a.firstChild; n; ) {
          var f = n.nextSibling, c = n.nodeName;
          n[xu] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || a.removeChild(n), n = f;
        }
      } else a === "body" && ve(l.ownerDocument.body);
      a = e;
    } while (a);
    Ou(t);
  }
  function Po(l, t) {
    var a = l;
    l = 0;
    do {
      var u = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), u && u.nodeType === 8) if (a = u.data, a === "/$") {
        if (l === 0) break;
        l--;
      } else a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || l++;
      a = u;
    } while (a);
  }
  function li(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          li(a), ef(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(a);
    }
  }
  function jm(l, t, a, u) {
    for (; l.nodeType === 1; ) {
      var e = a;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!u && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (u) {
        if (!l[xu]) switch (t) {
          case "meta":
            if (!l.hasAttribute("itemprop")) break;
            return l;
          case "link":
            if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence")) break;
            if (n !== e.rel || l.getAttribute("href") !== (e.href == null || e.href === "" ? null : e.href) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin) || l.getAttribute("title") !== (e.title == null ? null : e.title)) break;
            return l;
          case "style":
            if (l.hasAttribute("data-precedence")) break;
            return l;
          case "script":
            if (n = l.getAttribute("src"), (n !== (e.src == null ? null : e.src) || l.getAttribute("type") !== (e.type == null ? null : e.type) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop")) break;
            return l;
          default:
            return l;
        }
      } else if (t === "input" && l.type === "hidden") {
        var n = e.name == null ? null : "" + e.name;
        if (e.type === "hidden" && l.getAttribute("name") === n) return l;
      } else return l;
      if (l = bt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Bm(l, t, a) {
    if (t === "") return null;
    for (; l.nodeType !== 3; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !a || (l = bt(l.nextSibling), l === null)) return null;
    return l;
  }
  function ld(l, t) {
    for (; l.nodeType !== 8; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = bt(l.nextSibling), l === null)) return null;
    return l;
  }
  function ti(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function ai(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Ym(l, t) {
    var a = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || a.readyState !== "loading") t();
    else {
      var u = function() {
        t(), a.removeEventListener("DOMContentLoaded", u);
      };
      a.addEventListener("DOMContentLoaded", u), l._reactRetry = u;
    }
  }
  function bt(l) {
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
  var ui = null;
  function td(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "/$" || a === "/&") {
          if (t === 0) return bt(l.nextSibling);
          t--;
        } else a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function ad(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return l;
          t--;
        } else a !== "/$" && a !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function ud(l, t, a) {
    switch (t = Rn(a), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(y(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(y(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(y(454));
        return l;
      default:
        throw Error(y(451));
    }
  }
  function ve(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    ef(l);
  }
  var St = /* @__PURE__ */ new Map(), ed = /* @__PURE__ */ new Set();
  function Cn(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Ft = O.d;
  O.d = { f: Gm, r: Xm, D: Qm, C: Zm, L: Lm, m: Vm, X: Jm, S: Km, M: wm };
  function Gm() {
    var l = Ft.f(), t = pn();
    return l || t;
  }
  function Xm(l) {
    var t = Ka(l);
    t !== null && t.tag === 5 && t.type === "form" ? _0(t) : Ft.r(l);
  }
  var Eu = typeof document > "u" ? null : document;
  function nd(l, t, a) {
    var u = Eu;
    if (u && typeof t == "string" && t) {
      var e = dt(t);
      e = 'link[rel="' + l + '"][href="' + e + '"]', typeof a == "string" && (e += '[crossorigin="' + a + '"]'), ed.has(e) || (ed.add(e), l = { rel: l, crossOrigin: a, href: t }, u.querySelector(e) === null && (t = u.createElement("link"), Cl(t, "link", l), Dl(t), u.head.appendChild(t)));
    }
  }
  function Qm(l) {
    Ft.D(l), nd("dns-prefetch", l, null);
  }
  function Zm(l, t) {
    Ft.C(l, t), nd("preconnect", l, t);
  }
  function Lm(l, t, a) {
    Ft.L(l, t, a);
    var u = Eu;
    if (u && l && t) {
      var e = 'link[rel="preload"][as="' + dt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (e += '[imagesrcset="' + dt(a.imageSrcSet) + '"]', typeof a.imageSizes == "string" && (e += '[imagesizes="' + dt(a.imageSizes) + '"]')) : e += '[href="' + dt(l) + '"]';
      var n = e;
      switch (t) {
        case "style":
          n = Au(l);
          break;
        case "script":
          n = pu(l);
      }
      St.has(n) || (l = q({ rel: "preload", href: t === "image" && a && a.imageSrcSet ? void 0 : l, as: t }, a), St.set(n, l), u.querySelector(e) !== null || t === "style" && u.querySelector(he(n)) || t === "script" && u.querySelector(re(n)) || (t = u.createElement("link"), Cl(t, "link", l), Dl(t), u.head.appendChild(t)));
    }
  }
  function Vm(l, t) {
    Ft.m(l, t);
    var a = Eu;
    if (a && l) {
      var u = t && typeof t.as == "string" ? t.as : "script", e = 'link[rel="modulepreload"][as="' + dt(u) + '"][href="' + dt(l) + '"]', n = e;
      switch (u) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = pu(l);
      }
      if (!St.has(n) && (l = q({ rel: "modulepreload", href: l }, t), St.set(n, l), a.querySelector(e) === null)) {
        switch (u) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(re(n))) return;
        }
        u = a.createElement("link"), Cl(u, "link", l), Dl(u), a.head.appendChild(u);
      }
    }
  }
  function Km(l, t, a) {
    Ft.S(l, t, a);
    var u = Eu;
    if (u && l) {
      var e = Ja(u).hoistableStyles, n = Au(l);
      t = t || "default";
      var f = e.get(n);
      if (!f) {
        var c = { loading: 0, preload: null };
        if (f = u.querySelector(he(n))) c.loading = 5;
        else {
          l = q({ rel: "stylesheet", href: l, "data-precedence": t }, a), (a = St.get(n)) && ei(l, a);
          var i = f = u.createElement("link");
          Dl(i), Cl(i, "link", l), i._p = new Promise(function(v, b) {
            i.onload = v, i.onerror = b;
          }), i.addEventListener("load", function() {
            c.loading |= 1;
          }), i.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, qn(f, t, u);
        }
        f = { type: "stylesheet", instance: f, count: 1, state: c }, e.set(n, f);
      }
    }
  }
  function Jm(l, t) {
    Ft.X(l, t);
    var a = Eu;
    if (a && l) {
      var u = Ja(a).hoistableScripts, e = pu(l), n = u.get(e);
      n || (n = a.querySelector(re(e)), n || (l = q({ src: l, async: true }, t), (t = St.get(e)) && ni(l, t), n = a.createElement("script"), Dl(n), Cl(n, "link", l), a.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, u.set(e, n));
    }
  }
  function wm(l, t) {
    Ft.M(l, t);
    var a = Eu;
    if (a && l) {
      var u = Ja(a).hoistableScripts, e = pu(l), n = u.get(e);
      n || (n = a.querySelector(re(e)), n || (l = q({ src: l, async: true, type: "module" }, t), (t = St.get(e)) && ni(l, t), n = a.createElement("script"), Dl(n), Cl(n, "link", l), a.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, u.set(e, n));
    }
  }
  function fd(l, t, a, u) {
    var e = (e = V.current) ? Cn(e) : null;
    if (!e) throw Error(y(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Au(a.href), a = Ja(e).hoistableStyles, u = a.get(t), u || (u = { type: "style", instance: null, count: 0, state: null }, a.set(t, u)), u) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          l = Au(a.href);
          var n = Ja(e).hoistableStyles, f = n.get(l);
          if (f || (e = e.ownerDocument || e, f = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, n.set(l, f), (n = e.querySelector(he(l))) && !n._p && (f.instance = n, f.state.loading = 5), St.has(l) || (a = { rel: "preload", as: "style", href: a.href, crossOrigin: a.crossOrigin, integrity: a.integrity, media: a.media, hrefLang: a.hrefLang, referrerPolicy: a.referrerPolicy }, St.set(l, a), n || Wm(e, l, a, f.state))), t && u === null) throw Error(y(528, ""));
          return f;
        }
        if (t && u !== null) throw Error(y(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = pu(a), a = Ja(e).hoistableScripts, u = a.get(t), u || (u = { type: "script", instance: null, count: 0, state: null }, a.set(t, u)), u) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(y(444, l));
    }
  }
  function Au(l) {
    return 'href="' + dt(l) + '"';
  }
  function he(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function cd(l) {
    return q({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function Wm(l, t, a, u) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? u.loading = 1 : (t = l.createElement("link"), u.preload = t, t.addEventListener("load", function() {
      return u.loading |= 1;
    }), t.addEventListener("error", function() {
      return u.loading |= 2;
    }), Cl(t, "link", a), Dl(t), l.head.appendChild(t));
  }
  function pu(l) {
    return '[src="' + dt(l) + '"]';
  }
  function re(l) {
    return "script[async]" + l;
  }
  function id(l, t, a) {
    if (t.count++, t.instance === null) switch (t.type) {
      case "style":
        var u = l.querySelector('style[data-href~="' + dt(a.href) + '"]');
        if (u) return t.instance = u, Dl(u), u;
        var e = q({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
        return u = (l.ownerDocument || l).createElement("style"), Dl(u), Cl(u, "style", e), qn(u, a.precedence, l), t.instance = u;
      case "stylesheet":
        e = Au(a.href);
        var n = l.querySelector(he(e));
        if (n) return t.state.loading |= 4, t.instance = n, Dl(n), n;
        u = cd(a), (e = St.get(e)) && ei(u, e), n = (l.ownerDocument || l).createElement("link"), Dl(n);
        var f = n;
        return f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), Cl(n, "link", u), t.state.loading |= 4, qn(n, a.precedence, l), t.instance = n;
      case "script":
        return n = pu(a.src), (e = l.querySelector(re(n))) ? (t.instance = e, Dl(e), e) : (u = a, (e = St.get(n)) && (u = q({}, a), ni(u, e)), l = l.ownerDocument || l, e = l.createElement("script"), Dl(e), Cl(e, "link", u), l.head.appendChild(e), t.instance = e);
      case "void":
        return null;
      default:
        throw Error(y(443, t.type));
    }
    else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (u = t.instance, t.state.loading |= 4, qn(u, a.precedence, l));
    return t.instance;
  }
  function qn(l, t, a) {
    for (var u = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), e = u.length ? u[u.length - 1] : null, n = e, f = 0; f < u.length; f++) {
      var c = u[f];
      if (c.dataset.precedence === t) n = c;
      else if (n !== e) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(l, t.firstChild));
  }
  function ei(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function ni(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var jn = null;
  function sd(l, t, a) {
    if (jn === null) {
      var u = /* @__PURE__ */ new Map(), e = jn = /* @__PURE__ */ new Map();
      e.set(a, u);
    } else e = jn, u = e.get(a), u || (u = /* @__PURE__ */ new Map(), e.set(a, u));
    if (u.has(l)) return u;
    for (u.set(l, null), a = a.getElementsByTagName(l), e = 0; e < a.length; e++) {
      var n = a[e];
      if (!(n[xu] || n[Nl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = n.getAttribute(t) || "";
        f = l + f;
        var c = u.get(f);
        c ? c.push(n) : u.set(f, [n]);
      }
    }
    return u;
  }
  function od(l, t, a) {
    l = l.ownerDocument || l, l.head.insertBefore(a, t === "title" ? l.querySelector("head > title") : null);
  }
  function $m(l, t, a) {
    if (a === 1 || t.itemProp != null) return false;
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
  function dd(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Fm(l, t, a, u) {
    if (a.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== false) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var e = Au(u.href), n = t.querySelector(he(e));
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Bn.bind(l), t.then(l, l)), a.state.loading |= 4, a.instance = n, Dl(n);
          return;
        }
        n = t.ownerDocument || t, u = cd(u), (e = St.get(e)) && ei(u, e), n = n.createElement("link"), Dl(n);
        var f = n;
        f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), Cl(n, "link", u), a.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (l.count++, a = Bn.bind(l), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var fi = 0;
  function km(l, t) {
    return l.stylesheets && l.count === 0 && Gn(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(a) {
      var u = setTimeout(function() {
        if (l.stylesheets && Gn(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && fi === 0 && (fi = 62500 * Hm());
      var e = setTimeout(function() {
        if (l.waitingForImages = false, l.count === 0 && (l.stylesheets && Gn(l, l.stylesheets), l.unsuspend)) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, (l.imgBytes > fi ? 50 : 800) + t);
      return l.unsuspend = a, function() {
        l.unsuspend = null, clearTimeout(u), clearTimeout(e);
      };
    } : null;
  }
  function Bn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Gn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Yn = null;
  function Gn(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Yn = /* @__PURE__ */ new Map(), t.forEach(Im, l), Yn = null, Bn.call(l));
  }
  function Im(l, t) {
    if (!(t.state.loading & 4)) {
      var a = Yn.get(l);
      if (a) var u = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), Yn.set(l, a);
        for (var e = l.querySelectorAll("link[data-precedence],style[data-precedence]"), n = 0; n < e.length; n++) {
          var f = e[n];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (a.set(f.dataset.precedence, f), u = f);
        }
        u && a.set(null, u);
      }
      e = t.instance, f = e.getAttribute("data-precedence"), n = a.get(f) || u, n === u && a.set(null, e), a.set(f, e), this.count++, u = Bn.bind(this), e.addEventListener("load", u), e.addEventListener("error", u), n ? n.parentNode.insertBefore(e, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), t.state.loading |= 4;
    }
  }
  var ge = { $$typeof: yl, Provider: null, Consumer: null, _currentValue: B, _currentValue2: B, _threadCount: 0 };
  function Pm(l, t, a, u, e, n, f, c, i) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = lf(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = lf(0), this.hiddenUpdates = lf(null), this.identifierPrefix = u, this.onUncaughtError = e, this.onCaughtError = n, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = i, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function yd(l, t, a, u, e, n, f, c, i, v, b, T) {
    return l = new Pm(l, t, a, f, i, v, b, T, c), t = 1, n === true && (t |= 24), n = et(3, null, null, t), l.current = n, n.stateNode = l, t = Gf(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = { element: u, isDehydrated: a, cache: t }, Lf(n), l;
  }
  function md(l) {
    return l ? (l = au, l) : au;
  }
  function vd(l, t, a, u, e, n) {
    e = md(e), u.context === null ? u.context = e : u.pendingContext = e, u = na(t), u.payload = { element: a }, n = n === void 0 ? null : n, n !== null && (u.callback = n), a = fa(l, u, t), a !== null && (Pl(a, l, t), $u(a, l, t));
  }
  function hd(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var a = l.retryLane;
      l.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function ci(l, t) {
    hd(l, t), (l = l.alternate) && hd(l, t);
  }
  function rd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Ua(l, 67108864);
      t !== null && Pl(t, l, 67108864), ci(l, 67108864);
    }
  }
  function gd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = st();
      t = tf(t);
      var a = Ua(l, t);
      a !== null && Pl(a, l, t), ci(l, t);
    }
  }
  var Xn = true;
  function lv(l, t, a, u) {
    var e = S.T;
    S.T = null;
    var n = O.p;
    try {
      O.p = 2, ii(l, t, a, u);
    } finally {
      O.p = n, S.T = e;
    }
  }
  function tv(l, t, a, u) {
    var e = S.T;
    S.T = null;
    var n = O.p;
    try {
      O.p = 8, ii(l, t, a, u);
    } finally {
      O.p = n, S.T = e;
    }
  }
  function ii(l, t, a, u) {
    if (Xn) {
      var e = si(u);
      if (e === null) Wc(l, t, u, Qn, a), Sd(l, u);
      else if (uv(e, l, t, a, u)) u.stopPropagation();
      else if (Sd(l, u), t & 4 && -1 < av.indexOf(l)) {
        for (; e !== null; ) {
          var n = Ka(e);
          if (n !== null) switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var f = Aa(n.pendingLanes);
                if (f !== 0) {
                  var c = n;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; f; ) {
                    var i = 1 << 31 - at(f);
                    c.entanglements[1] |= i, f &= ~i;
                  }
                  Ht(n), (ll & 6) === 0 && (En = lt() + 500, de(0));
                }
              }
              break;
            case 31:
            case 13:
              c = Ua(n, 2), c !== null && Pl(c, n, 2), pn(), ci(n, 2);
          }
          if (n = si(u), n === null && Wc(l, t, u, Qn, a), n === e) break;
          e = n;
        }
        e !== null && u.stopPropagation();
      } else Wc(l, t, u, null, a);
    }
  }
  function si(l) {
    return l = df(l), oi(l);
  }
  var Qn = null;
  function oi(l) {
    if (Qn = null, l = Va(l), l !== null) {
      var t = Z(l);
      if (t === null) l = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (l = L(t), l !== null) return l;
          l = null;
        } else if (a === 31) {
          if (l = il(t), l !== null) return l;
          l = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Qn = l, null;
  }
  function bd(l) {
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
        switch (Qd()) {
          case pi:
            return 2;
          case Oi:
            return 8;
          case Ue:
          case Zd:
            return 32;
          case Mi:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var di = false, ga = null, ba = null, Sa = null, be = /* @__PURE__ */ new Map(), Se = /* @__PURE__ */ new Map(), _a = [], av = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function Sd(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        ga = null;
        break;
      case "dragenter":
      case "dragleave":
        ba = null;
        break;
      case "mouseover":
      case "mouseout":
        Sa = null;
        break;
      case "pointerover":
      case "pointerout":
        be.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Se.delete(t.pointerId);
    }
  }
  function _e(l, t, a, u, e, n) {
    return l === null || l.nativeEvent !== n ? (l = { blockedOn: t, domEventName: a, eventSystemFlags: u, nativeEvent: n, targetContainers: [e] }, t !== null && (t = Ka(t), t !== null && rd(t)), l) : (l.eventSystemFlags |= u, t = l.targetContainers, e !== null && t.indexOf(e) === -1 && t.push(e), l);
  }
  function uv(l, t, a, u, e) {
    switch (t) {
      case "focusin":
        return ga = _e(ga, l, t, a, u, e), true;
      case "dragenter":
        return ba = _e(ba, l, t, a, u, e), true;
      case "mouseover":
        return Sa = _e(Sa, l, t, a, u, e), true;
      case "pointerover":
        var n = e.pointerId;
        return be.set(n, _e(be.get(n) || null, l, t, a, u, e)), true;
      case "gotpointercapture":
        return n = e.pointerId, Se.set(n, _e(Se.get(n) || null, l, t, a, u, e)), true;
    }
    return false;
  }
  function _d(l) {
    var t = Va(l.target);
    if (t !== null) {
      var a = Z(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = L(a), t !== null) {
            l.blockedOn = t, Ri(l.priority, function() {
              gd(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = il(a), t !== null) {
            l.blockedOn = t, Ri(l.priority, function() {
              gd(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Zn(l) {
    if (l.blockedOn !== null) return false;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var a = si(l.nativeEvent);
      if (a === null) {
        a = l.nativeEvent;
        var u = new a.constructor(a.type, a);
        of = u, a.target.dispatchEvent(u), of = null;
      } else return t = Ka(a), t !== null && rd(t), l.blockedOn = a, false;
      t.shift();
    }
    return true;
  }
  function zd(l, t, a) {
    Zn(l) && a.delete(t);
  }
  function ev() {
    di = false, ga !== null && Zn(ga) && (ga = null), ba !== null && Zn(ba) && (ba = null), Sa !== null && Zn(Sa) && (Sa = null), be.forEach(zd), Se.forEach(zd);
  }
  function Ln(l, t) {
    l.blockedOn === t && (l.blockedOn = null, di || (di = true, h.unstable_scheduleCallback(h.unstable_NormalPriority, ev)));
  }
  var Vn = null;
  function Td(l) {
    Vn !== l && (Vn = l, h.unstable_scheduleCallback(h.unstable_NormalPriority, function() {
      Vn === l && (Vn = null);
      for (var t = 0; t < l.length; t += 3) {
        var a = l[t], u = l[t + 1], e = l[t + 2];
        if (typeof u != "function") {
          if (oi(u || a) === null) continue;
          break;
        }
        var n = Ka(a);
        n !== null && (l.splice(t, 3), t -= 3, sc(n, { pending: true, data: e, method: a.method, action: u }, u, e));
      }
    }));
  }
  function Ou(l) {
    function t(i) {
      return Ln(i, l);
    }
    ga !== null && Ln(ga, l), ba !== null && Ln(ba, l), Sa !== null && Ln(Sa, l), be.forEach(t), Se.forEach(t);
    for (var a = 0; a < _a.length; a++) {
      var u = _a[a];
      u.blockedOn === l && (u.blockedOn = null);
    }
    for (; 0 < _a.length && (a = _a[0], a.blockedOn === null); ) _d(a), a.blockedOn === null && _a.shift();
    if (a = (l.ownerDocument || l).$$reactFormReplay, a != null) for (u = 0; u < a.length; u += 3) {
      var e = a[u], n = a[u + 1], f = e[wl] || null;
      if (typeof n == "function") f || Td(a);
      else if (f) {
        var c = null;
        if (n && n.hasAttribute("formAction")) {
          if (e = n, f = n[wl] || null) c = f.formAction;
          else if (oi(e) !== null) continue;
        } else c = f.action;
        typeof c == "function" ? a[u + 1] = c : (a.splice(u, 3), u -= 3), Td(a);
      }
    }
  }
  function Ed() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({ handler: function() {
        return new Promise(function(f) {
          return e = f;
        });
      }, focusReset: "manual", scroll: "manual" });
    }
    function t() {
      e !== null && (e(), e = null), u || setTimeout(a, 20);
    }
    function a() {
      if (!u && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, { state: n.getState(), info: "react-transition", history: "replace" });
      }
    }
    if (typeof navigation == "object") {
      var u = false, e = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
        u = true, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), e !== null && (e(), e = null);
      };
    }
  }
  function yi(l) {
    this._internalRoot = l;
  }
  Kn.prototype.render = yi.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(y(409));
    var a = t.current, u = st();
    vd(a, u, l, t, null, null);
  }, Kn.prototype.unmount = yi.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      vd(l.current, 2, null, l, null, null), pn(), t[La] = null;
    }
  };
  function Kn(l) {
    this._internalRoot = l;
  }
  Kn.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = xi();
      l = { blockedOn: null, target: l, priority: t };
      for (var a = 0; a < _a.length && t !== 0 && t < _a[a].priority; a++) ;
      _a.splice(a, 0, l), a === 0 && _d(l);
    }
  };
  var Ad = z.version;
  if (Ad !== "19.2.0") throw Error(y(527, Ad, "19.2.0"));
  O.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0) throw typeof l.render == "function" ? Error(y(188)) : (l = Object.keys(l).join(","), Error(y(268, l)));
    return l = A(t), l = l !== null ? w(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var nv = { bundleType: 0, version: "19.2.0", rendererPackageName: "react-dom", currentDispatcherRef: S, reconcilerVersion: "19.2.0" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Jn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Jn.isDisabled && Jn.supportsFiber) try {
      Uu = Jn.inject(nv), tt = Jn;
    } catch {
    }
  }
  return Te.createRoot = function(l, t) {
    if (!C(l)) throw Error(y(299));
    var a = false, u = "", e = N0, n = H0, f = x0;
    return t != null && (t.unstable_strictMode === true && (a = true), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onUncaughtError !== void 0 && (e = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = yd(l, 1, false, null, null, a, u, null, e, n, f, Ed), l[La] = t.current, wc(l), new yi(t);
  }, Te.hydrateRoot = function(l, t, a) {
    if (!C(l)) throw Error(y(299));
    var u = false, e = "", n = N0, f = H0, c = x0, i = null;
    return a != null && (a.unstable_strictMode === true && (u = true), a.identifierPrefix !== void 0 && (e = a.identifierPrefix), a.onUncaughtError !== void 0 && (n = a.onUncaughtError), a.onCaughtError !== void 0 && (f = a.onCaughtError), a.onRecoverableError !== void 0 && (c = a.onRecoverableError), a.formState !== void 0 && (i = a.formState)), t = yd(l, 1, true, t, a ?? null, u, e, i, n, f, c, Ed), t.context = md(null), a = t.current, u = st(), u = tf(u), e = na(u), e.callback = null, fa(a, e, u), a = u, t.current.lanes = a, Hu(t, a), Ht(t), l[La] = t.current, wc(l), new Kn(t);
  }, Te.version = "19.2.0", Te;
}
var Cd;
function hv() {
  if (Cd) return hi.exports;
  Cd = 1;
  function h() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(h);
    } catch (z) {
      console.error(z);
    }
  }
  return h(), hi.exports = vv(), hi.exports;
}
var rv = hv();
let Zl, Ae = null;
function Oe() {
  return (Ae === null || Ae.byteLength === 0) && (Ae = new Uint8Array(Zl.memory.buffer)), Ae;
}
let wn = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
wn.decode();
const gv = 2146435072;
let Si = 0;
function bv(h, z) {
  return Si += z, Si >= gv && (wn = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), wn.decode(), Si = z), wn.decode(Oe().subarray(h, h + z));
}
function _i(h, z) {
  return h = h >>> 0, bv(h, z);
}
function pe(h) {
  const z = Zl.__externref_table_alloc();
  return Zl.__wbindgen_externrefs.set(z, h), z;
}
function Ee(h, z) {
  try {
    return h.apply(this, z);
  } catch (p) {
    const y = pe(p);
    Zl.__wbindgen_exn_store(y);
  }
}
function qd(h, z) {
  return h = h >>> 0, Oe().subarray(h / 1, h / 1 + z);
}
function Mu(h) {
  return h == null;
}
let zi = 0;
const Me = new TextEncoder();
"encodeInto" in Me || (Me.encodeInto = function(h, z) {
  const p = Me.encode(h);
  return z.set(p), { read: h.length, written: p.length };
});
function Sv(h, z, p) {
  if (p === void 0) {
    const il = Me.encode(h), U = z(il.length, 1) >>> 0;
    return Oe().subarray(U, U + il.length).set(il), zi = il.length, U;
  }
  let y = h.length, C = z(y, 1) >>> 0;
  const Z = Oe();
  let L = 0;
  for (; L < y; L++) {
    const il = h.charCodeAt(L);
    if (il > 127) break;
    Z[C + L] = il;
  }
  if (L !== y) {
    L !== 0 && (h = h.slice(L)), C = p(C, y, y = L + h.length * 3, 1) >>> 0;
    const il = Oe().subarray(C + L, C + y), U = Me.encodeInto(h, il);
    L += U.written, C = p(C, y, L, 1) >>> 0;
  }
  return zi = L, C;
}
function jd(h) {
  const z = Zl.__wbindgen_externrefs.get(h);
  return Zl.__externref_table_dealloc(h), z;
}
function _v(h, z, p) {
  const y = Sv(h, Zl.__wbindgen_malloc, Zl.__wbindgen_realloc), C = zi, Z = Zl.evaluate_multiple(y, C, z, !Mu(p), Mu(p) ? BigInt(0) : p);
  if (Z[2]) throw jd(Z[1]);
  return jd(Z[0]);
}
const zv = /* @__PURE__ */ new Set(["basic", "cors", "default"]);
async function Tv(h, z) {
  if (typeof Response == "function" && h instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function") try {
      return await WebAssembly.instantiateStreaming(h, z);
    } catch (y) {
      if (h.ok && zv.has(h.type) && h.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", y);
      else throw y;
    }
    const p = await h.arrayBuffer();
    return await WebAssembly.instantiate(p, z);
  } else {
    const p = await WebAssembly.instantiate(h, z);
    return p instanceof WebAssembly.Instance ? { instance: p, module: h } : p;
  }
}
function Ev() {
  const h = {};
  return h.wbg = {}, h.wbg.__wbg___wbindgen_is_function_ee8a6c5833c90377 = function(z) {
    return typeof z == "function";
  }, h.wbg.__wbg___wbindgen_is_object_c818261d21f283a4 = function(z) {
    const p = z;
    return typeof p == "object" && p !== null;
  }, h.wbg.__wbg___wbindgen_is_string_fbb76cb2940daafd = function(z) {
    return typeof z == "string";
  }, h.wbg.__wbg___wbindgen_is_undefined_2d472862bd29a478 = function(z) {
    return z === void 0;
  }, h.wbg.__wbg___wbindgen_throw_b855445ff6a94295 = function(z, p) {
    throw new Error(_i(z, p));
  }, h.wbg.__wbg_call_525440f72fbfc0ea = function() {
    return Ee(function(z, p, y) {
      return z.call(p, y);
    }, arguments);
  }, h.wbg.__wbg_call_e762c39fa8ea36bf = function() {
    return Ee(function(z, p) {
      return z.call(p);
    }, arguments);
  }, h.wbg.__wbg_crypto_574e78ad8b13b65f = function(z) {
    return z.crypto;
  }, h.wbg.__wbg_getRandomValues_b8f5dbd5f3995a9e = function() {
    return Ee(function(z, p) {
      z.getRandomValues(p);
    }, arguments);
  }, h.wbg.__wbg_length_69bca3cb64fc8748 = function(z) {
    return z.length;
  }, h.wbg.__wbg_msCrypto_a61aeb35a24c1329 = function(z) {
    return z.msCrypto;
  }, h.wbg.__wbg_new_e17d9f43105b08be = function() {
    return new Array();
  }, h.wbg.__wbg_new_no_args_ee98eee5275000a4 = function(z, p) {
    return new Function(_i(z, p));
  }, h.wbg.__wbg_new_with_length_01aa0dc35aa13543 = function(z) {
    return new Uint8Array(z >>> 0);
  }, h.wbg.__wbg_node_905d3e251edff8a2 = function(z) {
    return z.node;
  }, h.wbg.__wbg_process_dc0fbacc7c1c06f7 = function(z) {
    return z.process;
  }, h.wbg.__wbg_prototypesetcall_2a6620b6922694b2 = function(z, p, y) {
    Uint8Array.prototype.set.call(qd(z, p), y);
  }, h.wbg.__wbg_randomFillSync_ac0988aba3254290 = function() {
    return Ee(function(z, p) {
      z.randomFillSync(p);
    }, arguments);
  }, h.wbg.__wbg_require_60cc747a6bc5215a = function() {
    return Ee(function() {
      return module.require;
    }, arguments);
  }, h.wbg.__wbg_set_c213c871859d6500 = function(z, p, y) {
    z[p >>> 0] = y;
  }, h.wbg.__wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e = function() {
    const z = typeof global > "u" ? null : global;
    return Mu(z) ? 0 : pe(z);
  }, h.wbg.__wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac = function() {
    const z = typeof globalThis > "u" ? null : globalThis;
    return Mu(z) ? 0 : pe(z);
  }, h.wbg.__wbg_static_accessor_SELF_6fdf4b64710cc91b = function() {
    const z = typeof self > "u" ? null : self;
    return Mu(z) ? 0 : pe(z);
  }, h.wbg.__wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2 = function() {
    const z = typeof window > "u" ? null : window;
    return Mu(z) ? 0 : pe(z);
  }, h.wbg.__wbg_subarray_480600f3d6a9f26c = function(z, p, y) {
    return z.subarray(p >>> 0, y >>> 0);
  }, h.wbg.__wbg_versions_c01dfd4722a88165 = function(z) {
    return z.versions;
  }, h.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(z, p) {
    return _i(z, p);
  }, h.wbg.__wbindgen_cast_cb9088102bce6b30 = function(z, p) {
    return qd(z, p);
  }, h.wbg.__wbindgen_init_externref_table = function() {
    const z = Zl.__wbindgen_externrefs, p = z.grow(4);
    z.set(0, void 0), z.set(p + 0, void 0), z.set(p + 1, null), z.set(p + 2, true), z.set(p + 3, false);
  }, h;
}
function Av(h, z) {
  return Zl = h.exports, Bd.__wbindgen_wasm_module = z, Ae = null, Zl.__wbindgen_start(), Zl;
}
async function Bd(h) {
  if (Zl !== void 0) return Zl;
  typeof h < "u" && (Object.getPrototypeOf(h) === Object.prototype ? { module_or_path: h } = h : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof h > "u" && (h = new URL("" + new URL("perchance_wasm_bg-C9L6yHBo.wasm", import.meta.url).href, import.meta.url));
  const z = Ev();
  (typeof h == "string" || typeof Request == "function" && h instanceof Request || typeof URL == "function" && h instanceof URL) && (h = fetch(h));
  const { instance: p, module: y } = await Tv(await h, z);
  return Av(p, y);
}
const pv = `animal
	dog
	cat^2
	bird

color
	red
	blue
	green

output
	I saw a {beautiful|pretty|cute} [color] [animal]!`;
function Ov() {
  const [h, z] = pt.useState(false), [p, y] = pt.useState(pv), [C, Z] = pt.useState(null), [L, il] = pt.useState(true), [U, A] = pt.useState("42"), [w, q] = pt.useState(5), [sl, ql] = pt.useState([]);
  pt.useEffect(() => {
    Bd().then(() => {
      z(true);
    });
  }, []);
  const jl = () => {
    A(Math.floor(Math.random() * 1e6).toString());
  }, Ml = pt.useCallback(async (hl, yl, Ll) => {
    if (h) try {
      const Vl = BigInt(parseInt(Ll) || 42), Bl = await _v(hl, yl, Vl);
      ql(Bl), Z(null);
    } catch (Vl) {
      Z(String(Vl)), ql([]);
    }
  }, [h]);
  pt.useEffect(() => {
    if (L && h) {
      const hl = setTimeout(() => {
        Ml(p, w, U);
      }, 300);
      return () => clearTimeout(hl);
    }
  }, [p, w, U, L, h, Ml]);
  const _t = (hl) => {
    q(parseInt(hl.target.value));
  }, Gl = (hl) => {
    const yl = parseInt(hl.target.value);
    !isNaN(yl) && yl > 0 && q(yl);
  };
  return x.jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white", children: x.jsxs("div", { className: "container mx-auto px-4 py-8", children: [x.jsxs("div", { className: "mb-8 text-center", children: [x.jsx("h1", { className: "text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2", children: "Perchance Interpreter" }), x.jsxs("p", { className: "text-gray-400 text-lg", children: ["A deterministic random text generator \u2022", " ", x.jsx("a", { href: "https://perchance.org/tutorial", target: "_blank", rel: "noopener noreferrer", className: "text-purple-400 hover:text-purple-300 transition-colors underline", children: "Tutorial" })] })] }), !h && x.jsxs("div", { className: "text-center py-12", children: [x.jsx("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" }), x.jsx("p", { className: "mt-4 text-gray-400", children: "Loading interpreter..." })] }), h && x.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [x.jsxs("div", { className: "bg-slate-800/50 backdrop-blur rounded-lg shadow-2xl border border-slate-700/50 overflow-hidden", children: [x.jsx("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3", children: x.jsx("h2", { className: "text-xl font-semibold", children: "Template Editor" }) }), x.jsxs("div", { className: "p-6", children: [x.jsx("textarea", { value: p, onChange: (hl) => y(hl.target.value), className: "w-full h-[500px] bg-slate-900 text-gray-100 font-mono text-sm p-4 rounded-lg border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all resize-none", placeholder: "Enter your Perchance template here...", spellCheck: false }), x.jsxs("div", { className: "mt-4 space-y-4", children: [x.jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [x.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [x.jsx("input", { type: "checkbox", checked: L, onChange: (hl) => il(hl.target.checked), className: "w-4 h-4 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900" }), x.jsx("span", { className: "text-sm text-gray-300", children: "Auto-evaluate" })] }), x.jsxs("div", { className: "flex items-center gap-2", children: [x.jsx("label", { className: "text-sm text-gray-300", children: "Seed:" }), x.jsx("input", { type: "number", value: U, onChange: (hl) => A(hl.target.value), className: "w-24 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none" }), x.jsx("button", { onClick: jl, className: "px-3 py-1 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded text-sm transition-colors", title: "Randomize seed", children: "\u{1F3B2}" })] })] }), x.jsxs("div", { className: "space-y-2", children: [x.jsx("div", { className: "flex items-center gap-2", children: x.jsxs("label", { className: "text-sm text-gray-300", children: ["Samples: ", w] }) }), x.jsxs("div", { className: "flex items-center gap-4", children: [x.jsx("input", { type: "range", min: "1", max: "10", value: Math.min(w, 10), onChange: _t, className: "flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600" }), x.jsx("input", { type: "number", value: w, onChange: Gl, min: "1", className: "w-20 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none" })] })] })] })] })] }), x.jsxs("div", { className: "bg-slate-800/50 backdrop-blur rounded-lg shadow-2xl border border-slate-700/50 overflow-hidden", children: [x.jsx("div", { className: "bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3", children: x.jsx("h2", { className: "text-xl font-semibold", children: "Output Samples" }) }), x.jsx("div", { className: "p-6", children: C ? x.jsx("div", { className: "bg-red-900/30 border border-red-500 rounded-lg p-4", children: x.jsxs("div", { className: "flex items-start gap-3", children: [x.jsx("svg", { className: "w-5 h-5 text-red-400 flex-shrink-0 mt-0.5", fill: "currentColor", viewBox: "0 0 20 20", children: x.jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }), x.jsxs("div", { className: "flex-1", children: [x.jsx("h3", { className: "text-red-400 font-semibold mb-1", children: "Error" }), x.jsx("pre", { className: "text-red-300 text-sm whitespace-pre-wrap font-mono", children: C })] })] }) }) : sl.length > 0 ? x.jsx("div", { className: "space-y-3", children: x.jsx("div", { className: "space-y-2 max-h-[580px] overflow-y-auto", children: sl.map((hl, yl) => x.jsx("div", { className: "bg-slate-900/70 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors", children: x.jsxs("div", { className: "flex items-start gap-3", children: [x.jsxs("span", { className: "text-xs text-purple-400 font-semibold bg-purple-900/30 px-2 py-1 rounded", children: ["#", yl + 1] }), x.jsx("p", { className: "text-gray-100 flex-1", children: hl })] }) }, yl)) }) }) : x.jsxs("div", { className: "flex flex-col items-center justify-center h-full min-h-[500px] text-gray-500", children: [x.jsx("svg", { className: "w-16 h-16 mb-4 opacity-50", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: x.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }), x.jsx("p", { className: "text-lg", children: "Output will appear here" }), x.jsx("p", { className: "text-sm mt-2", children: "Edit the template to generate samples" })] }) })] })] }), x.jsx("div", { className: "mt-12 text-center text-gray-500 text-sm", children: x.jsxs("p", { children: ["Built with React, TypeScript, and WebAssembly \u2022", " ", x.jsx("a", { href: "https://github.com/philpax/perchance-interpreter", target: "_blank", rel: "noopener noreferrer", className: "text-purple-400 hover:text-purple-300 transition-colors", children: "View Source" })] }) })] }) });
}
rv.createRoot(document.getElementById("root")).render(x.jsx(pt.StrictMode, { children: x.jsx(Ov, {}) }));
