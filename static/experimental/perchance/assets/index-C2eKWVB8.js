(function() {
  const g = document.createElement("link").relList;
  if (g && g.supports && g.supports("modulepreload")) return;
  for (const O of document.querySelectorAll('link[rel="modulepreload"]')) o(O);
  new MutationObserver((O) => {
    for (const H of O) if (H.type === "childList") for (const G of H.addedNodes) G.tagName === "LINK" && G.rel === "modulepreload" && o(G);
  }).observe(document, { childList: true, subtree: true });
  function p(O) {
    const H = {};
    return O.integrity && (H.integrity = O.integrity), O.referrerPolicy && (H.referrerPolicy = O.referrerPolicy), O.crossOrigin === "use-credentials" ? H.credentials = "include" : O.crossOrigin === "anonymous" ? H.credentials = "omit" : H.credentials = "same-origin", H;
  }
  function o(O) {
    if (O.ep) return;
    O.ep = true;
    const H = p(O);
    fetch(O.href, H);
  }
})();
var hi = { exports: {} }, Tu = {};
var Od;
function ry() {
  if (Od) return Tu;
  Od = 1;
  var r = Symbol.for("react.transitional.element"), g = Symbol.for("react.fragment");
  function p(o, O, H) {
    var G = null;
    if (H !== void 0 && (G = "" + H), O.key !== void 0 && (G = "" + O.key), "key" in O) {
      H = {};
      for (var L in O) L !== "key" && (H[L] = O[L]);
    } else H = O;
    return O = H.ref, { $$typeof: r, type: o, key: G, ref: O !== void 0 ? O : null, props: H };
  }
  return Tu.Fragment = g, Tu.jsx = p, Tu.jsxs = p, Tu;
}
var Md;
function my() {
  return Md || (Md = 1, hi.exports = ry()), hi.exports;
}
var x = my(), gi = { exports: {} }, Z = {};
var Dd;
function yy() {
  if (Dd) return Z;
  Dd = 1;
  var r = Symbol.for("react.transitional.element"), g = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), H = Symbol.for("react.consumer"), G = Symbol.for("react.context"), L = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), F = Symbol.for("react.lazy"), B = Symbol.for("react.activity"), ol = Symbol.iterator;
  function Xl(s) {
    return s === null || typeof s != "object" ? null : (s = ol && s[ol] || s["@@iterator"], typeof s == "function" ? s : null);
  }
  var Ql = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Rl = Object.assign, Tt = {};
  function Ml(s, T, M) {
    this.props = s, this.context = T, this.refs = Tt, this.updater = M || Ql;
  }
  Ml.prototype.isReactComponent = {}, Ml.prototype.setState = function(s, T) {
    if (typeof s != "object" && typeof s != "function" && s != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, s, T, "setState");
  }, Ml.prototype.forceUpdate = function(s) {
    this.updater.enqueueForceUpdate(this, s, "forceUpdate");
  };
  function Ut() {
  }
  Ut.prototype = Ml.prototype;
  function Dl(s, T, M) {
    this.props = s, this.context = T, this.refs = Tt, this.updater = M || Ql;
  }
  var wl = Dl.prototype = new Ut();
  wl.constructor = Dl, Rl(wl, Ml.prototype), wl.isPureReactComponent = true;
  var dt = Array.isArray;
  function Zl() {
  }
  var J = { H: null, A: null, T: null, S: null }, Hl = Object.prototype.hasOwnProperty;
  function rt(s, T, M) {
    var N = M.ref;
    return { $$typeof: r, type: s, key: T, ref: N !== void 0 ? N : null, props: M };
  }
  function Ll(s, T) {
    return rt(s.type, T, s.props);
  }
  function mt(s) {
    return typeof s == "object" && s !== null && s.$$typeof === r;
  }
  function Cl(s) {
    var T = { "=": "=0", ":": "=2" };
    return "$" + s.replace(/[=:]/g, function(M) {
      return T[M];
    });
  }
  var Ct = /\/+/g;
  function At(s, T) {
    return typeof s == "object" && s !== null && s.key != null ? Cl("" + s.key) : T.toString(36);
  }
  function lt(s) {
    switch (s.status) {
      case "fulfilled":
        return s.value;
      case "rejected":
        throw s.reason;
      default:
        switch (typeof s.status == "string" ? s.then(Zl, Zl) : (s.status = "pending", s.then(function(T) {
          s.status === "pending" && (s.status = "fulfilled", s.value = T);
        }, function(T) {
          s.status === "pending" && (s.status = "rejected", s.reason = T);
        })), s.status) {
          case "fulfilled":
            return s.value;
          case "rejected":
            throw s.reason;
        }
    }
    throw s;
  }
  function z(s, T, M, N, Q) {
    var w = typeof s;
    (w === "undefined" || w === "boolean") && (s = null);
    var el = false;
    if (s === null) el = true;
    else switch (w) {
      case "bigint":
      case "string":
      case "number":
        el = true;
        break;
      case "object":
        switch (s.$$typeof) {
          case r:
          case g:
            el = true;
            break;
          case F:
            return el = s._init, z(el(s._payload), T, M, N, Q);
        }
    }
    if (el) return Q = Q(s), el = N === "" ? "." + At(s, 0) : N, dt(Q) ? (M = "", el != null && (M = el.replace(Ct, "$&/") + "/"), z(Q, T, M, "", function(Ae) {
      return Ae;
    })) : Q != null && (mt(Q) && (Q = Ll(Q, M + (Q.key == null || s && s.key === Q.key ? "" : ("" + Q.key).replace(Ct, "$&/") + "/") + el)), T.push(Q)), 1;
    el = 0;
    var Ul = N === "" ? "." : N + ":";
    if (dt(s)) for (var yl = 0; yl < s.length; yl++) N = s[yl], w = Ul + At(N, yl), el += z(N, T, M, w, Q);
    else if (yl = Xl(s), typeof yl == "function") for (s = yl.call(s), yl = 0; !(N = s.next()).done; ) N = N.value, w = Ul + At(N, yl++), el += z(N, T, M, w, Q);
    else if (w === "object") {
      if (typeof s.then == "function") return z(lt(s), T, M, N, Q);
      throw T = String(s), Error("Objects are not valid as a React child (found: " + (T === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : T) + "). If you meant to render a collection of children, use an array instead.");
    }
    return el;
  }
  function U(s, T, M) {
    if (s == null) return s;
    var N = [], Q = 0;
    return z(s, N, "", "", function(w) {
      return T.call(M, w, Q++);
    }), N;
  }
  function X(s) {
    if (s._status === -1) {
      var T = s._result;
      T = T(), T.then(function(M) {
        (s._status === 0 || s._status === -1) && (s._status = 1, s._result = M);
      }, function(M) {
        (s._status === 0 || s._status === -1) && (s._status = 2, s._result = M);
      }), s._status === -1 && (s._status = 0, s._result = T);
    }
    if (s._status === 1) return s._result.default;
    throw s._result;
  }
  var ul = typeof reportError == "function" ? reportError : function(s) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var T = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof s == "object" && s !== null && typeof s.message == "string" ? String(s.message) : String(s), error: s });
      if (!window.dispatchEvent(T)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", s);
      return;
    }
    console.error(s);
  }, j = { map: U, forEach: function(s, T, M) {
    U(s, function() {
      T.apply(this, arguments);
    }, M);
  }, count: function(s) {
    var T = 0;
    return U(s, function() {
      T++;
    }), T;
  }, toArray: function(s) {
    return U(s, function(T) {
      return T;
    }) || [];
  }, only: function(s) {
    if (!mt(s)) throw Error("React.Children.only expected to receive a single React element child.");
    return s;
  } };
  return Z.Activity = B, Z.Children = j, Z.Component = Ml, Z.Fragment = p, Z.Profiler = O, Z.PureComponent = Dl, Z.StrictMode = o, Z.Suspense = D, Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J, Z.__COMPILER_RUNTIME = { __proto__: null, c: function(s) {
    return J.H.useMemoCache(s);
  } }, Z.cache = function(s) {
    return function() {
      return s.apply(null, arguments);
    };
  }, Z.cacheSignal = function() {
    return null;
  }, Z.cloneElement = function(s, T, M) {
    if (s == null) throw Error("The argument must be a React element, but you passed " + s + ".");
    var N = Rl({}, s.props), Q = s.key;
    if (T != null) for (w in T.key !== void 0 && (Q = "" + T.key), T) !Hl.call(T, w) || w === "key" || w === "__self" || w === "__source" || w === "ref" && T.ref === void 0 || (N[w] = T[w]);
    var w = arguments.length - 2;
    if (w === 1) N.children = M;
    else if (1 < w) {
      for (var el = Array(w), Ul = 0; Ul < w; Ul++) el[Ul] = arguments[Ul + 2];
      N.children = el;
    }
    return rt(s.type, Q, N);
  }, Z.createContext = function(s) {
    return s = { $$typeof: G, _currentValue: s, _currentValue2: s, _threadCount: 0, Provider: null, Consumer: null }, s.Provider = s, s.Consumer = { $$typeof: H, _context: s }, s;
  }, Z.createElement = function(s, T, M) {
    var N, Q = {}, w = null;
    if (T != null) for (N in T.key !== void 0 && (w = "" + T.key), T) Hl.call(T, N) && N !== "key" && N !== "__self" && N !== "__source" && (Q[N] = T[N]);
    var el = arguments.length - 2;
    if (el === 1) Q.children = M;
    else if (1 < el) {
      for (var Ul = Array(el), yl = 0; yl < el; yl++) Ul[yl] = arguments[yl + 2];
      Q.children = Ul;
    }
    if (s && s.defaultProps) for (N in el = s.defaultProps, el) Q[N] === void 0 && (Q[N] = el[N]);
    return rt(s, w, Q);
  }, Z.createRef = function() {
    return { current: null };
  }, Z.forwardRef = function(s) {
    return { $$typeof: L, render: s };
  }, Z.isValidElement = mt, Z.lazy = function(s) {
    return { $$typeof: F, _payload: { _status: -1, _result: s }, _init: X };
  }, Z.memo = function(s, T) {
    return { $$typeof: S, type: s, compare: T === void 0 ? null : T };
  }, Z.startTransition = function(s) {
    var T = J.T, M = {};
    J.T = M;
    try {
      var N = s(), Q = J.S;
      Q !== null && Q(M, N), typeof N == "object" && N !== null && typeof N.then == "function" && N.then(Zl, ul);
    } catch (w) {
      ul(w);
    } finally {
      T !== null && M.types !== null && (T.types = M.types), J.T = T;
    }
  }, Z.unstable_useCacheRefresh = function() {
    return J.H.useCacheRefresh();
  }, Z.use = function(s) {
    return J.H.use(s);
  }, Z.useActionState = function(s, T, M) {
    return J.H.useActionState(s, T, M);
  }, Z.useCallback = function(s, T) {
    return J.H.useCallback(s, T);
  }, Z.useContext = function(s) {
    return J.H.useContext(s);
  }, Z.useDebugValue = function() {
  }, Z.useDeferredValue = function(s, T) {
    return J.H.useDeferredValue(s, T);
  }, Z.useEffect = function(s, T) {
    return J.H.useEffect(s, T);
  }, Z.useEffectEvent = function(s) {
    return J.H.useEffectEvent(s);
  }, Z.useId = function() {
    return J.H.useId();
  }, Z.useImperativeHandle = function(s, T, M) {
    return J.H.useImperativeHandle(s, T, M);
  }, Z.useInsertionEffect = function(s, T) {
    return J.H.useInsertionEffect(s, T);
  }, Z.useLayoutEffect = function(s, T) {
    return J.H.useLayoutEffect(s, T);
  }, Z.useMemo = function(s, T) {
    return J.H.useMemo(s, T);
  }, Z.useOptimistic = function(s, T) {
    return J.H.useOptimistic(s, T);
  }, Z.useReducer = function(s, T, M) {
    return J.H.useReducer(s, T, M);
  }, Z.useRef = function(s) {
    return J.H.useRef(s);
  }, Z.useState = function(s) {
    return J.H.useState(s);
  }, Z.useSyncExternalStore = function(s, T, M) {
    return J.H.useSyncExternalStore(s, T, M);
  }, Z.useTransition = function() {
    return J.H.useTransition();
  }, Z.version = "19.2.0", Z;
}
var Ud;
function Ti() {
  return Ud || (Ud = 1, gi.exports = yy()), gi.exports;
}
var hl = Ti(), bi = { exports: {} }, Au = {}, Si = { exports: {} }, _i = {};
var Nd;
function vy() {
  return Nd || (Nd = 1, (function(r) {
    function g(z, U) {
      var X = z.length;
      z.push(U);
      l: for (; 0 < X; ) {
        var ul = X - 1 >>> 1, j = z[ul];
        if (0 < O(j, U)) z[ul] = U, z[X] = j, X = ul;
        else break l;
      }
    }
    function p(z) {
      return z.length === 0 ? null : z[0];
    }
    function o(z) {
      if (z.length === 0) return null;
      var U = z[0], X = z.pop();
      if (X !== U) {
        z[0] = X;
        l: for (var ul = 0, j = z.length, s = j >>> 1; ul < s; ) {
          var T = 2 * (ul + 1) - 1, M = z[T], N = T + 1, Q = z[N];
          if (0 > O(M, X)) N < j && 0 > O(Q, M) ? (z[ul] = Q, z[N] = X, ul = N) : (z[ul] = M, z[T] = X, ul = T);
          else if (N < j && 0 > O(Q, X)) z[ul] = Q, z[N] = X, ul = N;
          else break l;
        }
      }
      return U;
    }
    function O(z, U) {
      var X = z.sortIndex - U.sortIndex;
      return X !== 0 ? X : z.id - U.id;
    }
    if (r.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var H = performance;
      r.unstable_now = function() {
        return H.now();
      };
    } else {
      var G = Date, L = G.now();
      r.unstable_now = function() {
        return G.now() - L;
      };
    }
    var D = [], S = [], F = 1, B = null, ol = 3, Xl = false, Ql = false, Rl = false, Tt = false, Ml = typeof setTimeout == "function" ? setTimeout : null, Ut = typeof clearTimeout == "function" ? clearTimeout : null, Dl = typeof setImmediate < "u" ? setImmediate : null;
    function wl(z) {
      for (var U = p(S); U !== null; ) {
        if (U.callback === null) o(S);
        else if (U.startTime <= z) o(S), U.sortIndex = U.expirationTime, g(D, U);
        else break;
        U = p(S);
      }
    }
    function dt(z) {
      if (Rl = false, wl(z), !Ql) if (p(D) !== null) Ql = true, Zl || (Zl = true, Cl());
      else {
        var U = p(S);
        U !== null && lt(dt, U.startTime - z);
      }
    }
    var Zl = false, J = -1, Hl = 5, rt = -1;
    function Ll() {
      return Tt ? true : !(r.unstable_now() - rt < Hl);
    }
    function mt() {
      if (Tt = false, Zl) {
        var z = r.unstable_now();
        rt = z;
        var U = true;
        try {
          l: {
            Ql = false, Rl && (Rl = false, Ut(J), J = -1), Xl = true;
            var X = ol;
            try {
              t: {
                for (wl(z), B = p(D); B !== null && !(B.expirationTime > z && Ll()); ) {
                  var ul = B.callback;
                  if (typeof ul == "function") {
                    B.callback = null, ol = B.priorityLevel;
                    var j = ul(B.expirationTime <= z);
                    if (z = r.unstable_now(), typeof j == "function") {
                      B.callback = j, wl(z), U = true;
                      break t;
                    }
                    B === p(D) && o(D), wl(z);
                  } else o(D);
                  B = p(D);
                }
                if (B !== null) U = true;
                else {
                  var s = p(S);
                  s !== null && lt(dt, s.startTime - z), U = false;
                }
              }
              break l;
            } finally {
              B = null, ol = X, Xl = false;
            }
            U = void 0;
          }
        } finally {
          U ? Cl() : Zl = false;
        }
      }
    }
    var Cl;
    if (typeof Dl == "function") Cl = function() {
      Dl(mt);
    };
    else if (typeof MessageChannel < "u") {
      var Ct = new MessageChannel(), At = Ct.port2;
      Ct.port1.onmessage = mt, Cl = function() {
        At.postMessage(null);
      };
    } else Cl = function() {
      Ml(mt, 0);
    };
    function lt(z, U) {
      J = Ml(function() {
        z(r.unstable_now());
      }, U);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, r.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Hl = 0 < z ? Math.floor(1e3 / z) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return ol;
    }, r.unstable_next = function(z) {
      switch (ol) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = ol;
      }
      var X = ol;
      ol = U;
      try {
        return z();
      } finally {
        ol = X;
      }
    }, r.unstable_requestPaint = function() {
      Tt = true;
    }, r.unstable_runWithPriority = function(z, U) {
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
      var X = ol;
      ol = z;
      try {
        return U();
      } finally {
        ol = X;
      }
    }, r.unstable_scheduleCallback = function(z, U, X) {
      var ul = r.unstable_now();
      switch (typeof X == "object" && X !== null ? (X = X.delay, X = typeof X == "number" && 0 < X ? ul + X : ul) : X = ul, z) {
        case 1:
          var j = -1;
          break;
        case 2:
          j = 250;
          break;
        case 5:
          j = 1073741823;
          break;
        case 4:
          j = 1e4;
          break;
        default:
          j = 5e3;
      }
      return j = X + j, z = { id: F++, callback: U, priorityLevel: z, startTime: X, expirationTime: j, sortIndex: -1 }, X > ul ? (z.sortIndex = X, g(S, z), p(D) === null && z === p(S) && (Rl ? (Ut(J), J = -1) : Rl = true, lt(dt, X - ul))) : (z.sortIndex = j, g(D, z), Ql || Xl || (Ql = true, Zl || (Zl = true, Cl()))), z;
    }, r.unstable_shouldYield = Ll, r.unstable_wrapCallback = function(z) {
      var U = ol;
      return function() {
        var X = ol;
        ol = U;
        try {
          return z.apply(this, arguments);
        } finally {
          ol = X;
        }
      };
    };
  })(_i)), _i;
}
var xd;
function hy() {
  return xd || (xd = 1, Si.exports = vy()), Si.exports;
}
var zi = { exports: {} }, Vl = {};
var Rd;
function gy() {
  if (Rd) return Vl;
  Rd = 1;
  var r = Ti();
  function g(D) {
    var S = "https://react.dev/errors/" + D;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var F = 2; F < arguments.length; F++) S += "&args[]=" + encodeURIComponent(arguments[F]);
    }
    return "Minified React error #" + D + "; visit " + S + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function p() {
  }
  var o = { d: { f: p, r: function() {
    throw Error(g(522));
  }, D: p, C: p, L: p, m: p, X: p, S: p, M: p }, p: 0, findDOMNode: null }, O = Symbol.for("react.portal");
  function H(D, S, F) {
    var B = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: O, key: B == null ? null : "" + B, children: D, containerInfo: S, implementation: F };
  }
  var G = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function L(D, S) {
    if (D === "font") return "";
    if (typeof S == "string") return S === "use-credentials" ? S : "";
  }
  return Vl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, Vl.createPortal = function(D, S) {
    var F = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!S || S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11) throw Error(g(299));
    return H(D, S, null, F);
  }, Vl.flushSync = function(D) {
    var S = G.T, F = o.p;
    try {
      if (G.T = null, o.p = 2, D) return D();
    } finally {
      G.T = S, o.p = F, o.d.f();
    }
  }, Vl.preconnect = function(D, S) {
    typeof D == "string" && (S ? (S = S.crossOrigin, S = typeof S == "string" ? S === "use-credentials" ? S : "" : void 0) : S = null, o.d.C(D, S));
  }, Vl.prefetchDNS = function(D) {
    typeof D == "string" && o.d.D(D);
  }, Vl.preinit = function(D, S) {
    if (typeof D == "string" && S && typeof S.as == "string") {
      var F = S.as, B = L(F, S.crossOrigin), ol = typeof S.integrity == "string" ? S.integrity : void 0, Xl = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
      F === "style" ? o.d.S(D, typeof S.precedence == "string" ? S.precedence : void 0, { crossOrigin: B, integrity: ol, fetchPriority: Xl }) : F === "script" && o.d.X(D, { crossOrigin: B, integrity: ol, fetchPriority: Xl, nonce: typeof S.nonce == "string" ? S.nonce : void 0 });
    }
  }, Vl.preinitModule = function(D, S) {
    if (typeof D == "string") if (typeof S == "object" && S !== null) {
      if (S.as == null || S.as === "script") {
        var F = L(S.as, S.crossOrigin);
        o.d.M(D, { crossOrigin: F, integrity: typeof S.integrity == "string" ? S.integrity : void 0, nonce: typeof S.nonce == "string" ? S.nonce : void 0 });
      }
    } else S == null && o.d.M(D);
  }, Vl.preload = function(D, S) {
    if (typeof D == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
      var F = S.as, B = L(F, S.crossOrigin);
      o.d.L(D, F, { crossOrigin: B, integrity: typeof S.integrity == "string" ? S.integrity : void 0, nonce: typeof S.nonce == "string" ? S.nonce : void 0, type: typeof S.type == "string" ? S.type : void 0, fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0, referrerPolicy: typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0, imageSrcSet: typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0, imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0, media: typeof S.media == "string" ? S.media : void 0 });
    }
  }, Vl.preloadModule = function(D, S) {
    if (typeof D == "string") if (S) {
      var F = L(S.as, S.crossOrigin);
      o.d.m(D, { as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0, crossOrigin: F, integrity: typeof S.integrity == "string" ? S.integrity : void 0 });
    } else o.d.m(D);
  }, Vl.requestFormReset = function(D) {
    o.d.r(D);
  }, Vl.unstable_batchedUpdates = function(D, S) {
    return D(S);
  }, Vl.useFormState = function(D, S, F) {
    return G.H.useFormState(D, S, F);
  }, Vl.useFormStatus = function() {
    return G.H.useHostTransitionStatus();
  }, Vl.version = "19.2.0", Vl;
}
var Hd;
function by() {
  if (Hd) return zi.exports;
  Hd = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
    } catch (g) {
      console.error(g);
    }
  }
  return r(), zi.exports = gy(), zi.exports;
}
var Cd;
function Sy() {
  if (Cd) return Au;
  Cd = 1;
  var r = hy(), g = Ti(), p = by();
  function o(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++) t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function O(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function H(l) {
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
  function G(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function L(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function D(l) {
    if (H(l) !== l) throw Error(o(188));
  }
  function S(l) {
    var t = l.alternate;
    if (!t) {
      if (t = H(l), t === null) throw Error(o(188));
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
          if (n === e) return D(u), l;
          if (n === a) return D(u), t;
          n = n.sibling;
        }
        throw Error(o(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var c = false, f = u.child; f; ) {
          if (f === e) {
            c = true, e = u, a = n;
            break;
          }
          if (f === a) {
            c = true, a = u, e = n;
            break;
          }
          f = f.sibling;
        }
        if (!c) {
          for (f = n.child; f; ) {
            if (f === e) {
              c = true, e = n, a = u;
              break;
            }
            if (f === a) {
              c = true, a = n, e = u;
              break;
            }
            f = f.sibling;
          }
          if (!c) throw Error(o(189));
        }
      }
      if (e.alternate !== a) throw Error(o(190));
    }
    if (e.tag !== 3) throw Error(o(188));
    return e.stateNode.current === e ? l : t;
  }
  function F(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = F(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var B = Object.assign, ol = Symbol.for("react.element"), Xl = Symbol.for("react.transitional.element"), Ql = Symbol.for("react.portal"), Rl = Symbol.for("react.fragment"), Tt = Symbol.for("react.strict_mode"), Ml = Symbol.for("react.profiler"), Ut = Symbol.for("react.consumer"), Dl = Symbol.for("react.context"), wl = Symbol.for("react.forward_ref"), dt = Symbol.for("react.suspense"), Zl = Symbol.for("react.suspense_list"), J = Symbol.for("react.memo"), Hl = Symbol.for("react.lazy"), rt = Symbol.for("react.activity"), Ll = Symbol.for("react.memo_cache_sentinel"), mt = Symbol.iterator;
  function Cl(l) {
    return l === null || typeof l != "object" ? null : (l = mt && l[mt] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Ct = Symbol.for("react.client.reference");
  function At(l) {
    if (l == null) return null;
    if (typeof l == "function") return l.$$typeof === Ct ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Rl:
        return "Fragment";
      case Ml:
        return "Profiler";
      case Tt:
        return "StrictMode";
      case dt:
        return "Suspense";
      case Zl:
        return "SuspenseList";
      case rt:
        return "Activity";
    }
    if (typeof l == "object") switch (l.$$typeof) {
      case Ql:
        return "Portal";
      case Dl:
        return l.displayName || "Context";
      case Ut:
        return (l._context.displayName || "Context") + ".Consumer";
      case wl:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case J:
        return t = l.displayName || null, t !== null ? t : At(l.type) || "Memo";
      case Hl:
        t = l._payload, l = l._init;
        try {
          return At(l(t));
        } catch {
        }
    }
    return null;
  }
  var lt = Array.isArray, z = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = p.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = { pending: false, data: null, method: null, action: null }, ul = [], j = -1;
  function s(l) {
    return { current: l };
  }
  function T(l) {
    0 > j || (l.current = ul[j], ul[j] = null, j--);
  }
  function M(l, t) {
    j++, ul[j] = l.current, l.current = t;
  }
  var N = s(null), Q = s(null), w = s(null), el = s(null);
  function Ul(l, t) {
    switch (M(w, t), M(Q, l), M(N, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? $o(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI) t = $o(t), l = Fo(t, l);
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
    T(N), M(N, l);
  }
  function yl() {
    T(N), T(Q), T(w);
  }
  function Ae(l) {
    l.memoizedState !== null && M(el, l);
    var t = N.current, e = Fo(t, l.type);
    t !== e && (M(Q, l), M(N, e));
  }
  function Ke(l) {
    Q.current === l && (T(N), T(Q)), el.current === l && (T(el), _u._currentValue = X);
  }
  var xa, xu;
  function jt(l) {
    if (xa === void 0) try {
      throw Error();
    } catch (e) {
      var t = e.stack.trim().match(/\n( *(at )?)/);
      xa = t && t[1] || "", xu = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + xa + l + xu;
  }
  var In = false;
  function Pn(l, t) {
    if (!l || In) return "";
    In = true;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = { DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var A = function() {
              throw Error();
            };
            if (Object.defineProperty(A.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(A, []);
              } catch (b) {
                var h = b;
              }
              Reflect.construct(l, [], A);
            } else {
              try {
                A.call();
              } catch (b) {
                h = b;
              }
              l.call(A.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (b) {
              h = b;
            }
            (A = l()) && typeof A.catch == "function" && A.catch(function() {
            });
          }
        } catch (b) {
          if (b && h && typeof b.stack == "string") return [b.stack, h.stack];
        }
        return [null, null];
      } };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
      u && u.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var n = a.DetermineComponentFrameRoot(), c = n[0], f = n[1];
      if (c && f) {
        var i = c.split(`
`), v = f.split(`
`);
        for (u = a = 0; a < i.length && !i[a].includes("DetermineComponentFrameRoot"); ) a++;
        for (; u < v.length && !v[u].includes("DetermineComponentFrameRoot"); ) u++;
        if (a === i.length || u === v.length) for (a = i.length - 1, u = v.length - 1; 1 <= a && 0 <= u && i[a] !== v[u]; ) u--;
        for (; 1 <= a && 0 <= u; a--, u--) if (i[a] !== v[u]) {
          if (a !== 1 || u !== 1) do
            if (a--, u--, 0 > u || i[a] !== v[u]) {
              var _ = `
` + i[a].replace(" at new ", " at ");
              return l.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", l.displayName)), _;
            }
          while (1 <= a && 0 <= u);
          break;
        }
      }
    } finally {
      In = false, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? jt(e) : "";
  }
  function Ld(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return jt(l.type);
      case 16:
        return jt("Lazy");
      case 13:
        return l.child !== t && t !== null ? jt("Suspense Fallback") : jt("Suspense");
      case 19:
        return jt("SuspenseList");
      case 0:
      case 15:
        return Pn(l.type, false);
      case 11:
        return Pn(l.type.render, false);
      case 1:
        return Pn(l.type, true);
      case 31:
        return jt("Activity");
      default:
        return "";
    }
  }
  function Ai(l) {
    try {
      var t = "", e = null;
      do
        t += Ld(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var lc = Object.prototype.hasOwnProperty, tc = r.unstable_scheduleCallback, ec = r.unstable_cancelCallback, Vd = r.unstable_shouldYield, Kd = r.unstable_requestPaint, tt = r.unstable_now, wd = r.unstable_getCurrentPriorityLevel, Oi = r.unstable_ImmediatePriority, Mi = r.unstable_UserBlockingPriority, Ru = r.unstable_NormalPriority, Jd = r.unstable_LowPriority, Di = r.unstable_IdlePriority, Wd = r.log, $d = r.unstable_setDisableYieldValue, Ra = null, et = null;
  function le(l) {
    if (typeof Wd == "function" && $d(l), et && typeof et.setStrictMode == "function") try {
      et.setStrictMode(Ra, l);
    } catch {
    }
  }
  var at = Math.clz32 ? Math.clz32 : Id, Fd = Math.log, kd = Math.LN2;
  function Id(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Fd(l) / kd | 0) | 0;
  }
  var Hu = 256, Cu = 262144, ju = 4194304;
  function Oe(l) {
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
  function qu(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = l.suspendedLanes, c = l.pingedLanes;
    l = l.warmLanes;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~n, a !== 0 ? u = Oe(a) : (c &= f, c !== 0 ? u = Oe(c) : e || (e = f & ~l, e !== 0 && (u = Oe(e))))) : (f = a & ~n, f !== 0 ? u = Oe(f) : c !== 0 ? u = Oe(c) : e || (e = a & ~l, e !== 0 && (u = Oe(e)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
  }
  function Ha(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Pd(l, t) {
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
  function Ui() {
    var l = ju;
    return ju <<= 1, (ju & 62914560) === 0 && (ju = 4194304), l;
  }
  function ac(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function Ca(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function lr(l, t, e, a, u, n) {
    var c = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var f = l.entanglements, i = l.expirationTimes, v = l.hiddenUpdates;
    for (e = c & ~e; 0 < e; ) {
      var _ = 31 - at(e), A = 1 << _;
      f[_] = 0, i[_] = -1;
      var h = v[_];
      if (h !== null) for (v[_] = null, _ = 0; _ < h.length; _++) {
        var b = h[_];
        b !== null && (b.lane &= -536870913);
      }
      e &= ~A;
    }
    a !== 0 && Ni(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(c & ~t));
  }
  function Ni(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - at(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function xi(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - at(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function Ri(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : uc(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function uc(l) {
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
  function nc(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Hi() {
    var l = U.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : Sd(l.type));
  }
  function Ci(l, t) {
    var e = U.p;
    try {
      return U.p = l, t();
    } finally {
      U.p = e;
    }
  }
  var te = Math.random().toString(36).slice(2), jl = "__reactFiber$" + te, Jl = "__reactProps$" + te, we = "__reactContainer$" + te, cc = "__reactEvents$" + te, tr = "__reactListeners$" + te, er = "__reactHandles$" + te, ji = "__reactResources$" + te, ja = "__reactMarker$" + te;
  function fc(l) {
    delete l[jl], delete l[Jl], delete l[cc], delete l[tr], delete l[er];
  }
  function Je(l) {
    var t = l[jl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[we] || e[jl]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null) for (l = ad(l); l !== null; ) {
          if (e = l[jl]) return e;
          l = ad(l);
        }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function We(l) {
    if (l = l[jl] || l[we]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return l;
    }
    return null;
  }
  function qa(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(o(33));
  }
  function $e(l) {
    var t = l[ji];
    return t || (t = l[ji] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Nl(l) {
    l[ja] = true;
  }
  var qi = /* @__PURE__ */ new Set(), Bi = {};
  function Me(l, t) {
    Fe(l, t), Fe(l + "Capture", t);
  }
  function Fe(l, t) {
    for (Bi[l] = t, l = 0; l < t.length; l++) qi.add(t[l]);
  }
  var ar = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Yi = {}, Gi = {};
  function ur(l) {
    return lc.call(Gi, l) ? true : lc.call(Yi, l) ? false : ar.test(l) ? Gi[l] = true : (Yi[l] = true, false);
  }
  function Bu(l, t, e) {
    if (ur(t)) if (e === null) l.removeAttribute(t);
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
  function Yu(l, t, e) {
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
  function qt(l, t, e, a) {
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
  function yt(l) {
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
  function Xi(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function nr(l, t, e) {
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
  function ic(l) {
    if (!l._valueTracker) {
      var t = Xi(l) ? "checked" : "value";
      l._valueTracker = nr(l, t, "" + l[t]);
    }
  }
  function Qi(l) {
    if (!l) return false;
    var t = l._valueTracker;
    if (!t) return true;
    var e = t.getValue(), a = "";
    return l && (a = Xi(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), true) : false;
  }
  function Gu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var cr = /[\n"\\]/g;
  function vt(l) {
    return l.replace(cr, function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function sc(l, t, e, a, u, n, c, f) {
    l.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.type = c : l.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + yt(t)) : l.value !== "" + yt(t) && (l.value = "" + yt(t)) : c !== "submit" && c !== "reset" || l.removeAttribute("value"), t != null ? oc(l, c, yt(t)) : e != null ? oc(l, c, yt(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.name = "" + yt(f) : l.removeAttribute("name");
  }
  function Zi(l, t, e, a, u, n, c, f) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        ic(l);
        return;
      }
      e = e != null ? "" + yt(e) : "", t = t != null ? "" + yt(t) : e, f || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = f ? l.checked : !!a, l.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (l.name = c), ic(l);
  }
  function oc(l, t, e) {
    t === "number" && Gu(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function ke(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < e.length; u++) t["$" + e[u]] = true;
      for (e = 0; e < l.length; e++) u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = true);
    } else {
      for (e = "" + yt(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          l[u].selected = true, a && (l[u].defaultSelected = true);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = true);
    }
  }
  function Li(l, t, e) {
    if (t != null && (t = "" + yt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + yt(e) : "";
  }
  function Vi(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(o(92));
        if (lt(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = yt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), ic(l);
  }
  function Ie(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var fr = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function Ki(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || fr.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function wi(l, t, e) {
    if (t != null && typeof t != "object") throw Error(o(62));
    if (l = l.style, e != null) {
      for (var a in e) !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var u in t) a = t[u], t.hasOwnProperty(u) && e[u] !== a && Ki(l, u, a);
    } else for (var n in t) t.hasOwnProperty(n) && Ki(l, n, t[n]);
  }
  function dc(l) {
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
  var ir = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), sr = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Xu(l) {
    return sr.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Bt() {
  }
  var rc = null;
  function mc(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Pe = null, la = null;
  function Ji(l) {
    var t = We(l);
    if (t && (l = t.stateNode)) {
      var e = l[Jl] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (sc(l, e.value, e.defaultValue, e.defaultValue, e.checked, e.defaultChecked, e.type, e.name), t = e.name, e.type === "radio" && t != null) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll('input[name="' + vt("" + t) + '"][type="radio"]'), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[Jl] || null;
                if (!u) throw Error(o(90));
                sc(a, u.value, u.defaultValue, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name);
              }
            }
            for (t = 0; t < e.length; t++) a = e[t], a.form === l.form && Qi(a);
          }
          break l;
        case "textarea":
          Li(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && ke(l, !!e.multiple, t, false);
      }
    }
  }
  var yc = false;
  function Wi(l, t, e) {
    if (yc) return l(t, e);
    yc = true;
    try {
      var a = l(t);
      return a;
    } finally {
      if (yc = false, (Pe !== null || la !== null) && (Dn(), Pe && (t = Pe, l = la, la = Pe = null, Ji(t), l))) for (t = 0; t < l.length; t++) Ji(l[t]);
    }
  }
  function Ba(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[Jl] || null;
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
    if (e && typeof e != "function") throw Error(o(231, t, typeof e));
    return e;
  }
  var Yt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), vc = false;
  if (Yt) try {
    var Ya = {};
    Object.defineProperty(Ya, "passive", { get: function() {
      vc = true;
    } }), window.addEventListener("test", Ya, Ya), window.removeEventListener("test", Ya, Ya);
  } catch {
    vc = false;
  }
  var ee = null, hc = null, Qu = null;
  function $i() {
    if (Qu) return Qu;
    var l, t = hc, e = t.length, a, u = "value" in ee ? ee.value : ee.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var c = e - l;
    for (a = 1; a <= c && t[e - a] === u[n - a]; a++) ;
    return Qu = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function Zu(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Lu() {
    return true;
  }
  function Fi() {
    return false;
  }
  function Wl(l) {
    function t(e, a, u, n, c) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = c, this.currentTarget = null;
      for (var f in l) l.hasOwnProperty(f) && (e = l[f], this[f] = e ? e(n) : n[f]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === false) ? Lu : Fi, this.isPropagationStopped = Fi, this;
    }
    return B(t.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var e = this.nativeEvent;
      e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = false), this.isDefaultPrevented = Lu);
    }, stopPropagation: function() {
      var e = this.nativeEvent;
      e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = true), this.isPropagationStopped = Lu);
    }, persist: function() {
    }, isPersistent: Lu }), t;
  }
  var De = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(l) {
    return l.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Vu = Wl(De), Ga = B({}, De, { view: 0, detail: 0 }), or = Wl(Ga), gc, bc, Xa, Ku = B({}, Ga, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: _c, button: 0, buttons: 0, relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  }, movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== Xa && (Xa && l.type === "mousemove" ? (gc = l.screenX - Xa.screenX, bc = l.screenY - Xa.screenY) : bc = gc = 0, Xa = l), gc);
  }, movementY: function(l) {
    return "movementY" in l ? l.movementY : bc;
  } }), ki = Wl(Ku), dr = B({}, Ku, { dataTransfer: 0 }), rr = Wl(dr), mr = B({}, Ga, { relatedTarget: 0 }), Sc = Wl(mr), yr = B({}, De, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), vr = Wl(yr), hr = B({}, De, { clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  } }), gr = Wl(hr), br = B({}, De, { data: 0 }), Ii = Wl(br), Sr = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, _r = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, zr = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function pr(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = zr[l]) ? !!t[l] : false;
  }
  function _c() {
    return pr;
  }
  var Er = B({}, Ga, { key: function(l) {
    if (l.key) {
      var t = Sr[l.key] || l.key;
      if (t !== "Unidentified") return t;
    }
    return l.type === "keypress" ? (l = Zu(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? _r[l.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: _c, charCode: function(l) {
    return l.type === "keypress" ? Zu(l) : 0;
  }, keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }, which: function(l) {
    return l.type === "keypress" ? Zu(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  } }), Tr = Wl(Er), Ar = B({}, Ku, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Pi = Wl(Ar), Or = B({}, Ga, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: _c }), Mr = Wl(Or), Dr = B({}, De, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Ur = Wl(Dr), Nr = B({}, Ku, { deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  }, deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), xr = Wl(Nr), Rr = B({}, De, { newState: 0, oldState: 0 }), Hr = Wl(Rr), Cr = [9, 13, 27, 32], zc = Yt && "CompositionEvent" in window, Qa = null;
  Yt && "documentMode" in document && (Qa = document.documentMode);
  var jr = Yt && "TextEvent" in window && !Qa, ls = Yt && (!zc || Qa && 8 < Qa && 11 >= Qa), ts = " ", es = false;
  function as(l, t) {
    switch (l) {
      case "keyup":
        return Cr.indexOf(t.keyCode) !== -1;
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
  var ta = false;
  function qr(l, t) {
    switch (l) {
      case "compositionend":
        return us(t);
      case "keypress":
        return t.which !== 32 ? null : (es = true, ts);
      case "textInput":
        return l = t.data, l === ts && es ? null : l;
      default:
        return null;
    }
  }
  function Br(l, t) {
    if (ta) return l === "compositionend" || !zc && as(l, t) ? (l = $i(), Qu = hc = ee = null, ta = false, l) : null;
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
        return ls && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Yr = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function ns(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Yr[l.type] : t === "textarea";
  }
  function cs(l, t, e, a) {
    Pe ? la ? la.push(a) : la = [a] : Pe = a, t = jn(t, "onChange"), 0 < t.length && (e = new Vu("onChange", "change", null, e, a), l.push({ event: e, listeners: t }));
  }
  var Za = null, La = null;
  function Gr(l) {
    Lo(l, 0);
  }
  function wu(l) {
    var t = qa(l);
    if (Qi(t)) return l;
  }
  function fs(l, t) {
    if (l === "change") return t;
  }
  var is = false;
  if (Yt) {
    var pc;
    if (Yt) {
      var Ec = "oninput" in document;
      if (!Ec) {
        var ss = document.createElement("div");
        ss.setAttribute("oninput", "return;"), Ec = typeof ss.oninput == "function";
      }
      pc = Ec;
    } else pc = false;
    is = pc && (!document.documentMode || 9 < document.documentMode);
  }
  function os() {
    Za && (Za.detachEvent("onpropertychange", ds), La = Za = null);
  }
  function ds(l) {
    if (l.propertyName === "value" && wu(La)) {
      var t = [];
      cs(t, La, l, mc(l)), Wi(Gr, t);
    }
  }
  function Xr(l, t, e) {
    l === "focusin" ? (os(), Za = t, La = e, Za.attachEvent("onpropertychange", ds)) : l === "focusout" && os();
  }
  function Qr(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown") return wu(La);
  }
  function Zr(l, t) {
    if (l === "click") return wu(t);
  }
  function Lr(l, t) {
    if (l === "input" || l === "change") return wu(t);
  }
  function Vr(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var ut = typeof Object.is == "function" ? Object.is : Vr;
  function Va(l, t) {
    if (ut(l, t)) return true;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null) return false;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return false;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!lc.call(t, u) || !ut(l[u], t[u])) return false;
    }
    return true;
  }
  function rs(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function ms(l, t) {
    var e = rs(l);
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
      e = rs(e);
    }
  }
  function ys(l, t) {
    return l && t ? l === t ? true : l && l.nodeType === 3 ? false : t && t.nodeType === 3 ? ys(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : false : false;
  }
  function vs(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = Gu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = false;
      }
      if (e) l = t.contentWindow;
      else break;
      t = Gu(l.document);
    }
    return t;
  }
  function Tc(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Kr = Yt && "documentMode" in document && 11 >= document.documentMode, ea = null, Ac = null, Ka = null, Oc = false;
  function hs(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Oc || ea == null || ea !== Gu(a) || (a = ea, "selectionStart" in a && Tc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = { anchorNode: a.anchorNode, anchorOffset: a.anchorOffset, focusNode: a.focusNode, focusOffset: a.focusOffset }), Ka && Va(Ka, a) || (Ka = a, a = jn(Ac, "onSelect"), 0 < a.length && (t = new Vu("onSelect", "select", null, t, e), l.push({ event: t, listeners: a }), t.target = ea)));
  }
  function Ue(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var aa = { animationend: Ue("Animation", "AnimationEnd"), animationiteration: Ue("Animation", "AnimationIteration"), animationstart: Ue("Animation", "AnimationStart"), transitionrun: Ue("Transition", "TransitionRun"), transitionstart: Ue("Transition", "TransitionStart"), transitioncancel: Ue("Transition", "TransitionCancel"), transitionend: Ue("Transition", "TransitionEnd") }, Mc = {}, gs = {};
  Yt && (gs = document.createElement("div").style, "AnimationEvent" in window || (delete aa.animationend.animation, delete aa.animationiteration.animation, delete aa.animationstart.animation), "TransitionEvent" in window || delete aa.transitionend.transition);
  function Ne(l) {
    if (Mc[l]) return Mc[l];
    if (!aa[l]) return l;
    var t = aa[l], e;
    for (e in t) if (t.hasOwnProperty(e) && e in gs) return Mc[l] = t[e];
    return l;
  }
  var bs = Ne("animationend"), Ss = Ne("animationiteration"), _s = Ne("animationstart"), wr = Ne("transitionrun"), Jr = Ne("transitionstart"), Wr = Ne("transitioncancel"), zs = Ne("transitionend"), ps = /* @__PURE__ */ new Map(), Dc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  Dc.push("scrollEnd");
  function Ot(l, t) {
    ps.set(l, t), Me(t, [l]);
  }
  var Ju = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l), error: l });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, ht = [], ua = 0, Uc = 0;
  function Wu() {
    for (var l = ua, t = Uc = ua = 0; t < l; ) {
      var e = ht[t];
      ht[t++] = null;
      var a = ht[t];
      ht[t++] = null;
      var u = ht[t];
      ht[t++] = null;
      var n = ht[t];
      if (ht[t++] = null, a !== null && u !== null) {
        var c = a.pending;
        c === null ? u.next = u : (u.next = c.next, c.next = u), a.pending = u;
      }
      n !== 0 && Es(e, u, n);
    }
  }
  function $u(l, t, e, a) {
    ht[ua++] = l, ht[ua++] = t, ht[ua++] = e, ht[ua++] = a, Uc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function Nc(l, t, e, a) {
    return $u(l, t, e, a), Fu(l);
  }
  function xe(l, t) {
    return $u(l, null, null, t), Fu(l);
  }
  function Es(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = false, n = l.return; n !== null; ) n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = true)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - at(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function Fu(l) {
    if (50 < mu) throw mu = 0, Xf = null, Error(o(185));
    for (var t = l.return; t !== null; ) l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var na = {};
  function $r(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function nt(l, t, e, a) {
    return new $r(l, t, e, a);
  }
  function xc(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Gt(l, t) {
    var e = l.alternate;
    return e === null ? (e = nt(l.tag, t, l.key, l.mode), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function Ts(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), l;
  }
  function ku(l, t, e, a, u, n) {
    var c = 0;
    if (a = l, typeof l == "function") xc(l) && (c = 1);
    else if (typeof l == "string") c = ly(l, e, N.current) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else l: switch (l) {
      case rt:
        return l = nt(31, e, t, u), l.elementType = rt, l.lanes = n, l;
      case Rl:
        return Re(e.children, u, n, t);
      case Tt:
        c = 8, u |= 24;
        break;
      case Ml:
        return l = nt(12, e, t, u | 2), l.elementType = Ml, l.lanes = n, l;
      case dt:
        return l = nt(13, e, t, u), l.elementType = dt, l.lanes = n, l;
      case Zl:
        return l = nt(19, e, t, u), l.elementType = Zl, l.lanes = n, l;
      default:
        if (typeof l == "object" && l !== null) switch (l.$$typeof) {
          case Dl:
            c = 10;
            break l;
          case Ut:
            c = 9;
            break l;
          case wl:
            c = 11;
            break l;
          case J:
            c = 14;
            break l;
          case Hl:
            c = 16, a = null;
            break l;
        }
        c = 29, e = Error(o(130, l === null ? "null" : typeof l, "")), a = null;
    }
    return t = nt(c, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function Re(l, t, e, a) {
    return l = nt(7, l, a, t), l.lanes = e, l;
  }
  function Rc(l, t, e) {
    return l = nt(6, l, null, t), l.lanes = e, l;
  }
  function As(l) {
    var t = nt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function Hc(l, t, e) {
    return t = nt(4, l.children !== null ? l.children : [], l.key, t), t.lanes = e, t.stateNode = { containerInfo: l.containerInfo, pendingChildren: null, implementation: l.implementation }, t;
  }
  var Os = /* @__PURE__ */ new WeakMap();
  function gt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = Os.get(l);
      return e !== void 0 ? e : (t = { value: l, source: t, stack: Ai(t) }, Os.set(l, t), t);
    }
    return { value: l, source: t, stack: Ai(t) };
  }
  var ca = [], fa = 0, Iu = null, wa = 0, bt = [], St = 0, ae = null, Nt = 1, xt = "";
  function Xt(l, t) {
    ca[fa++] = wa, ca[fa++] = Iu, Iu = l, wa = t;
  }
  function Ms(l, t, e) {
    bt[St++] = Nt, bt[St++] = xt, bt[St++] = ae, ae = l;
    var a = Nt;
    l = xt;
    var u = 32 - at(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - at(t) + u;
    if (30 < n) {
      var c = u - u % 5;
      n = (a & (1 << c) - 1).toString(32), a >>= c, u -= c, Nt = 1 << 32 - at(t) + u | e << u | a, xt = n + l;
    } else Nt = 1 << n | e << u | a, xt = l;
  }
  function Cc(l) {
    l.return !== null && (Xt(l, 1), Ms(l, 1, 0));
  }
  function jc(l) {
    for (; l === Iu; ) Iu = ca[--fa], ca[fa] = null, wa = ca[--fa], ca[fa] = null;
    for (; l === ae; ) ae = bt[--St], bt[St] = null, xt = bt[--St], bt[St] = null, Nt = bt[--St], bt[St] = null;
  }
  function Ds(l, t) {
    bt[St++] = Nt, bt[St++] = xt, bt[St++] = ae, Nt = t.id, xt = t.overflow, ae = l;
  }
  var ql = null, rl = null, P = false, ue = null, _t = false, qc = Error(o(519));
  function ne(l) {
    var t = Error(o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
    throw Ja(gt(t, l)), qc;
  }
  function Us(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[jl] = l, t[Jl] = a, e) {
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
        for (e = 0; e < vu.length; e++) $(vu[e], t);
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
        $("invalid", t), Zi(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, true);
        break;
      case "select":
        $("invalid", t);
        break;
      case "textarea":
        $("invalid", t), Vi(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === true || Jo(t.textContent, e) ? (a.popover != null && ($("beforetoggle", t), $("toggle", t)), a.onScroll != null && $("scroll", t), a.onScrollEnd != null && $("scrollend", t), a.onClick != null && (t.onclick = Bt), t = true) : t = false, t || ne(l, true);
  }
  function Ns(l) {
    for (ql = l.return; ql; ) switch (ql.tag) {
      case 5:
      case 31:
      case 13:
        _t = false;
        return;
      case 27:
      case 3:
        _t = true;
        return;
      default:
        ql = ql.return;
    }
  }
  function ia(l) {
    if (l !== ql) return false;
    if (!P) return Ns(l), P = true, false;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || ti(l.type, l.memoizedProps)), e = !e), e && rl && ne(l), Ns(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      rl = ed(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      rl = ed(l);
    } else t === 27 ? (t = rl, Se(l.type) ? (l = ci, ci = null, rl = l) : rl = t) : rl = ql ? pt(l.stateNode.nextSibling) : null;
    return true;
  }
  function He() {
    rl = ql = null, P = false;
  }
  function Bc() {
    var l = ue;
    return l !== null && (Il === null ? Il = l : Il.push.apply(Il, l), ue = null), l;
  }
  function Ja(l) {
    ue === null ? ue = [l] : ue.push(l);
  }
  var Yc = s(null), Ce = null, Qt = null;
  function ce(l, t, e) {
    M(Yc, t._currentValue), t._currentValue = e;
  }
  function Zt(l) {
    l._currentValue = Yc.current, T(Yc);
  }
  function Gc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function Xc(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var c = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var f = n;
          n = u;
          for (var i = 0; i < t.length; i++) if (f.context === t[i]) {
            n.lanes |= e, f = n.alternate, f !== null && (f.lanes |= e), Gc(n.return, e, l), a || (c = null);
            break l;
          }
          n = f.next;
        }
      } else if (u.tag === 18) {
        if (c = u.return, c === null) throw Error(o(341));
        c.lanes |= e, n = c.alternate, n !== null && (n.lanes |= e), Gc(c, e, l), c = null;
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
  function sa(l, t, e, a) {
    l = null;
    for (var u = t, n = false; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = true;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var c = u.alternate;
        if (c === null) throw Error(o(387));
        if (c = c.memoizedProps, c !== null) {
          var f = u.type;
          ut(u.pendingProps.value, c.value) || (l !== null ? l.push(f) : l = [f]);
        }
      } else if (u === el.current) {
        if (c = u.alternate, c === null) throw Error(o(387));
        c.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(_u) : l = [_u]);
      }
      u = u.return;
    }
    l !== null && Xc(t, l, e, a), t.flags |= 262144;
  }
  function Pu(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!ut(l.context._currentValue, l.memoizedValue)) return true;
      l = l.next;
    }
    return false;
  }
  function je(l) {
    Ce = l, Qt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Bl(l) {
    return xs(Ce, l);
  }
  function ln(l, t) {
    return Ce === null && je(l), xs(l, t);
  }
  function xs(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, Qt === null) {
      if (l === null) throw Error(o(308));
      Qt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Qt = Qt.next = t;
    return e;
  }
  var Fr = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = { aborted: false, addEventListener: function(e, a) {
      l.push(a);
    } };
    this.abort = function() {
      t.aborted = true, l.forEach(function(e) {
        return e();
      });
    };
  }, kr = r.unstable_scheduleCallback, Ir = r.unstable_NormalPriority, pl = { $$typeof: Dl, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function Qc() {
    return { controller: new Fr(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function Wa(l) {
    l.refCount--, l.refCount === 0 && kr(Ir, function() {
      l.controller.abort();
    });
  }
  var $a = null, Zc = 0, oa = 0, da = null;
  function Pr(l, t) {
    if ($a === null) {
      var e = $a = [];
      Zc = 0, oa = wf(), da = { status: "pending", value: void 0, then: function(a) {
        e.push(a);
      } };
    }
    return Zc++, t.then(Rs, Rs), t;
  }
  function Rs() {
    if (--Zc === 0 && $a !== null) {
      da !== null && (da.status = "fulfilled");
      var l = $a;
      $a = null, oa = 0, da = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function lm(l, t) {
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
    go = tt(), typeof t == "object" && t !== null && typeof t.then == "function" && Pr(l, t), Hs !== null && Hs(l, t);
  };
  var qe = s(null);
  function Lc() {
    var l = qe.current;
    return l !== null ? l : dl.pooledCache;
  }
  function tn(l, t) {
    t === null ? M(qe, qe.current) : M(qe, t.pool);
  }
  function Cs() {
    var l = Lc();
    return l === null ? null : { parent: pl._currentValue, pool: l };
  }
  var ra = Error(o(460)), Vc = Error(o(474)), en = Error(o(542)), an = { then: function() {
  } };
  function js(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function qs(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(Bt, Bt), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Ys(l), l;
      default:
        if (typeof t.status == "string") t.then(Bt, Bt);
        else {
          if (l = dl, l !== null && 100 < l.shellSuspendCounter) throw Error(o(482));
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
            throw l = t.reason, Ys(l), l;
        }
        throw Ye = t, ra;
    }
  }
  function Be(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Ye = e, ra) : e;
    }
  }
  var Ye = null;
  function Bs() {
    if (Ye === null) throw Error(o(459));
    var l = Ye;
    return Ye = null, l;
  }
  function Ys(l) {
    if (l === ra || l === en) throw Error(o(483));
  }
  var ma = null, Fa = 0;
  function un(l) {
    var t = Fa;
    return Fa += 1, ma === null && (ma = []), qs(ma, l, t);
  }
  function ka(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function nn(l, t) {
    throw t.$$typeof === ol ? Error(o(525)) : (l = Object.prototype.toString.call(t), Error(o(31, l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l)));
  }
  function Gs(l) {
    function t(m, d) {
      if (l) {
        var y = m.deletions;
        y === null ? (m.deletions = [d], m.flags |= 16) : y.push(d);
      }
    }
    function e(m, d) {
      if (!l) return null;
      for (; d !== null; ) t(m, d), d = d.sibling;
      return null;
    }
    function a(m) {
      for (var d = /* @__PURE__ */ new Map(); m !== null; ) m.key !== null ? d.set(m.key, m) : d.set(m.index, m), m = m.sibling;
      return d;
    }
    function u(m, d) {
      return m = Gt(m, d), m.index = 0, m.sibling = null, m;
    }
    function n(m, d, y) {
      return m.index = y, l ? (y = m.alternate, y !== null ? (y = y.index, y < d ? (m.flags |= 67108866, d) : y) : (m.flags |= 67108866, d)) : (m.flags |= 1048576, d);
    }
    function c(m) {
      return l && m.alternate === null && (m.flags |= 67108866), m;
    }
    function f(m, d, y, E) {
      return d === null || d.tag !== 6 ? (d = Rc(y, m.mode, E), d.return = m, d) : (d = u(d, y), d.return = m, d);
    }
    function i(m, d, y, E) {
      var q = y.type;
      return q === Rl ? _(m, d, y.props.children, E, y.key) : d !== null && (d.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Hl && Be(q) === d.type) ? (d = u(d, y.props), ka(d, y), d.return = m, d) : (d = ku(y.type, y.key, y.props, null, m.mode, E), ka(d, y), d.return = m, d);
    }
    function v(m, d, y, E) {
      return d === null || d.tag !== 4 || d.stateNode.containerInfo !== y.containerInfo || d.stateNode.implementation !== y.implementation ? (d = Hc(y, m.mode, E), d.return = m, d) : (d = u(d, y.children || []), d.return = m, d);
    }
    function _(m, d, y, E, q) {
      return d === null || d.tag !== 7 ? (d = Re(y, m.mode, E, q), d.return = m, d) : (d = u(d, y), d.return = m, d);
    }
    function A(m, d, y) {
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint") return d = Rc("" + d, m.mode, y), d.return = m, d;
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Xl:
            return y = ku(d.type, d.key, d.props, null, m.mode, y), ka(y, d), y.return = m, y;
          case Ql:
            return d = Hc(d, m.mode, y), d.return = m, d;
          case Hl:
            return d = Be(d), A(m, d, y);
        }
        if (lt(d) || Cl(d)) return d = Re(d, m.mode, y, null), d.return = m, d;
        if (typeof d.then == "function") return A(m, un(d), y);
        if (d.$$typeof === Dl) return A(m, ln(m, d), y);
        nn(m, d);
      }
      return null;
    }
    function h(m, d, y, E) {
      var q = d !== null ? d.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint") return q !== null ? null : f(m, d, "" + y, E);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Xl:
            return y.key === q ? i(m, d, y, E) : null;
          case Ql:
            return y.key === q ? v(m, d, y, E) : null;
          case Hl:
            return y = Be(y), h(m, d, y, E);
        }
        if (lt(y) || Cl(y)) return q !== null ? null : _(m, d, y, E, null);
        if (typeof y.then == "function") return h(m, d, un(y), E);
        if (y.$$typeof === Dl) return h(m, d, ln(m, y), E);
        nn(m, y);
      }
      return null;
    }
    function b(m, d, y, E, q) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint") return m = m.get(y) || null, f(d, m, "" + E, q);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case Xl:
            return m = m.get(E.key === null ? y : E.key) || null, i(d, m, E, q);
          case Ql:
            return m = m.get(E.key === null ? y : E.key) || null, v(d, m, E, q);
          case Hl:
            return E = Be(E), b(m, d, y, E, q);
        }
        if (lt(E) || Cl(E)) return m = m.get(y) || null, _(d, m, E, q, null);
        if (typeof E.then == "function") return b(m, d, y, un(E), q);
        if (E.$$typeof === Dl) return b(m, d, y, ln(d, E), q);
        nn(d, E);
      }
      return null;
    }
    function R(m, d, y, E) {
      for (var q = null, ll = null, C = d, K = d = 0, I = null; C !== null && K < y.length; K++) {
        C.index > K ? (I = C, C = null) : I = C.sibling;
        var tl = h(m, C, y[K], E);
        if (tl === null) {
          C === null && (C = I);
          break;
        }
        l && C && tl.alternate === null && t(m, C), d = n(tl, d, K), ll === null ? q = tl : ll.sibling = tl, ll = tl, C = I;
      }
      if (K === y.length) return e(m, C), P && Xt(m, K), q;
      if (C === null) {
        for (; K < y.length; K++) C = A(m, y[K], E), C !== null && (d = n(C, d, K), ll === null ? q = C : ll.sibling = C, ll = C);
        return P && Xt(m, K), q;
      }
      for (C = a(C); K < y.length; K++) I = b(C, m, K, y[K], E), I !== null && (l && I.alternate !== null && C.delete(I.key === null ? K : I.key), d = n(I, d, K), ll === null ? q = I : ll.sibling = I, ll = I);
      return l && C.forEach(function(Te) {
        return t(m, Te);
      }), P && Xt(m, K), q;
    }
    function Y(m, d, y, E) {
      if (y == null) throw Error(o(151));
      for (var q = null, ll = null, C = d, K = d = 0, I = null, tl = y.next(); C !== null && !tl.done; K++, tl = y.next()) {
        C.index > K ? (I = C, C = null) : I = C.sibling;
        var Te = h(m, C, tl.value, E);
        if (Te === null) {
          C === null && (C = I);
          break;
        }
        l && C && Te.alternate === null && t(m, C), d = n(Te, d, K), ll === null ? q = Te : ll.sibling = Te, ll = Te, C = I;
      }
      if (tl.done) return e(m, C), P && Xt(m, K), q;
      if (C === null) {
        for (; !tl.done; K++, tl = y.next()) tl = A(m, tl.value, E), tl !== null && (d = n(tl, d, K), ll === null ? q = tl : ll.sibling = tl, ll = tl);
        return P && Xt(m, K), q;
      }
      for (C = a(C); !tl.done; K++, tl = y.next()) tl = b(C, m, K, tl.value, E), tl !== null && (l && tl.alternate !== null && C.delete(tl.key === null ? K : tl.key), d = n(tl, d, K), ll === null ? q = tl : ll.sibling = tl, ll = tl);
      return l && C.forEach(function(dy) {
        return t(m, dy);
      }), P && Xt(m, K), q;
    }
    function sl(m, d, y, E) {
      if (typeof y == "object" && y !== null && y.type === Rl && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Xl:
            l: {
              for (var q = y.key; d !== null; ) {
                if (d.key === q) {
                  if (q = y.type, q === Rl) {
                    if (d.tag === 7) {
                      e(m, d.sibling), E = u(d, y.props.children), E.return = m, m = E;
                      break l;
                    }
                  } else if (d.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Hl && Be(q) === d.type) {
                    e(m, d.sibling), E = u(d, y.props), ka(E, y), E.return = m, m = E;
                    break l;
                  }
                  e(m, d);
                  break;
                } else t(m, d);
                d = d.sibling;
              }
              y.type === Rl ? (E = Re(y.props.children, m.mode, E, y.key), E.return = m, m = E) : (E = ku(y.type, y.key, y.props, null, m.mode, E), ka(E, y), E.return = m, m = E);
            }
            return c(m);
          case Ql:
            l: {
              for (q = y.key; d !== null; ) {
                if (d.key === q) if (d.tag === 4 && d.stateNode.containerInfo === y.containerInfo && d.stateNode.implementation === y.implementation) {
                  e(m, d.sibling), E = u(d, y.children || []), E.return = m, m = E;
                  break l;
                } else {
                  e(m, d);
                  break;
                }
                else t(m, d);
                d = d.sibling;
              }
              E = Hc(y, m.mode, E), E.return = m, m = E;
            }
            return c(m);
          case Hl:
            return y = Be(y), sl(m, d, y, E);
        }
        if (lt(y)) return R(m, d, y, E);
        if (Cl(y)) {
          if (q = Cl(y), typeof q != "function") throw Error(o(150));
          return y = q.call(y), Y(m, d, y, E);
        }
        if (typeof y.then == "function") return sl(m, d, un(y), E);
        if (y.$$typeof === Dl) return sl(m, d, ln(m, y), E);
        nn(m, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, d !== null && d.tag === 6 ? (e(m, d.sibling), E = u(d, y), E.return = m, m = E) : (e(m, d), E = Rc(y, m.mode, E), E.return = m, m = E), c(m)) : e(m, d);
    }
    return function(m, d, y, E) {
      try {
        Fa = 0;
        var q = sl(m, d, y, E);
        return ma = null, q;
      } catch (C) {
        if (C === ra || C === en) throw C;
        var ll = nt(29, C, null, m.mode);
        return ll.lanes = E, ll.return = m, ll;
      } finally {
      }
    };
  }
  var Ge = Gs(true), Xs = Gs(false), fe = false;
  function Kc(l) {
    l.updateQueue = { baseState: l.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
  }
  function wc(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = { baseState: l.baseState, firstBaseUpdate: l.firstBaseUpdate, lastBaseUpdate: l.lastBaseUpdate, shared: l.shared, callbacks: null });
  }
  function ie(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function se(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (al & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = Fu(l), Es(l, null, e), t;
    }
    return $u(l, a, t, e), Fu(l);
  }
  function Ia(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, xi(l, e);
    }
  }
  function Jc(l, t) {
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
  var Wc = false;
  function Pa() {
    if (Wc) {
      var l = da;
      if (l !== null) throw l;
    }
  }
  function lu(l, t, e, a) {
    Wc = false;
    var u = l.updateQueue;
    fe = false;
    var n = u.firstBaseUpdate, c = u.lastBaseUpdate, f = u.shared.pending;
    if (f !== null) {
      u.shared.pending = null;
      var i = f, v = i.next;
      i.next = null, c === null ? n = v : c.next = v, c = i;
      var _ = l.alternate;
      _ !== null && (_ = _.updateQueue, f = _.lastBaseUpdate, f !== c && (f === null ? _.firstBaseUpdate = v : f.next = v, _.lastBaseUpdate = i));
    }
    if (n !== null) {
      var A = u.baseState;
      c = 0, _ = v = i = null, f = n;
      do {
        var h = f.lane & -536870913, b = h !== f.lane;
        if (b ? (k & h) === h : (a & h) === h) {
          h !== 0 && h === oa && (Wc = true), _ !== null && (_ = _.next = { lane: 0, tag: f.tag, payload: f.payload, callback: null, next: null });
          l: {
            var R = l, Y = f;
            h = t;
            var sl = e;
            switch (Y.tag) {
              case 1:
                if (R = Y.payload, typeof R == "function") {
                  A = R.call(sl, A, h);
                  break l;
                }
                A = R;
                break l;
              case 3:
                R.flags = R.flags & -65537 | 128;
              case 0:
                if (R = Y.payload, h = typeof R == "function" ? R.call(sl, A, h) : R, h == null) break l;
                A = B({}, A, h);
                break l;
              case 2:
                fe = true;
            }
          }
          h = f.callback, h !== null && (l.flags |= 64, b && (l.flags |= 8192), b = u.callbacks, b === null ? u.callbacks = [h] : b.push(h));
        } else b = { lane: h, tag: f.tag, payload: f.payload, callback: f.callback, next: null }, _ === null ? (v = _ = b, i = A) : _ = _.next = b, c |= h;
        if (f = f.next, f === null) {
          if (f = u.shared.pending, f === null) break;
          b = f, f = b.next, b.next = null, u.lastBaseUpdate = b, u.shared.pending = null;
        }
      } while (true);
      _ === null && (i = A), u.baseState = i, u.firstBaseUpdate = v, u.lastBaseUpdate = _, n === null && (u.shared.lanes = 0), ye |= c, l.lanes = c, l.memoizedState = A;
    }
  }
  function Qs(l, t) {
    if (typeof l != "function") throw Error(o(191, l));
    l.call(t);
  }
  function Zs(l, t) {
    var e = l.callbacks;
    if (e !== null) for (l.callbacks = null, l = 0; l < e.length; l++) Qs(e[l], t);
  }
  var ya = s(null), cn = s(0);
  function Ls(l, t) {
    l = kt, M(cn, l), M(ya, t), kt = l | t.baseLanes;
  }
  function $c() {
    M(cn, kt), M(ya, ya.current);
  }
  function Fc() {
    kt = cn.current, T(ya), T(cn);
  }
  var ct = s(null), zt = null;
  function oe(l) {
    var t = l.alternate;
    M(Sl, Sl.current & 1), M(ct, l), zt === null && (t === null || ya.current !== null || t.memoizedState !== null) && (zt = l);
  }
  function kc(l) {
    M(Sl, Sl.current), M(ct, l), zt === null && (zt = l);
  }
  function Vs(l) {
    l.tag === 22 ? (M(Sl, Sl.current), M(ct, l), zt === null && (zt = l)) : de();
  }
  function de() {
    M(Sl, Sl.current), M(ct, ct.current);
  }
  function ft(l) {
    T(ct), zt === l && (zt = null), T(Sl);
  }
  var Sl = s(0);
  function fn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || ui(e) || ni(e))) return t;
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
  var Lt = 0, V = null, fl = null, El = null, sn = false, va = false, Xe = false, on = 0, tu = 0, ha = null, tm = 0;
  function gl() {
    throw Error(o(321));
  }
  function Ic(l, t) {
    if (t === null) return false;
    for (var e = 0; e < t.length && e < l.length; e++) if (!ut(l[e], t[e])) return false;
    return true;
  }
  function Pc(l, t, e, a, u, n) {
    return Lt = n, V = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, z.H = l === null || l.memoizedState === null ? M0 : vf, Xe = false, n = e(a, u), Xe = false, va && (n = ws(t, e, a, u)), Ks(l), n;
  }
  function Ks(l) {
    z.H = uu;
    var t = fl !== null && fl.next !== null;
    if (Lt = 0, El = fl = V = null, sn = false, tu = 0, ha = null, t) throw Error(o(300));
    l === null || Tl || (l = l.dependencies, l !== null && Pu(l) && (Tl = true));
  }
  function ws(l, t, e, a) {
    V = l;
    var u = 0;
    do {
      if (va && (ha = null), tu = 0, va = false, 25 <= u) throw Error(o(301));
      if (u += 1, El = fl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      z.H = D0, n = t(e, a);
    } while (va);
    return n;
  }
  function em() {
    var l = z.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? eu(t) : t, l = l.useState()[0], (fl !== null ? fl.memoizedState : null) !== l && (V.flags |= 1024), t;
  }
  function lf() {
    var l = on !== 0;
    return on = 0, l;
  }
  function tf(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function ef(l) {
    if (sn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      sn = false;
    }
    Lt = 0, El = fl = V = null, va = false, tu = on = 0, ha = null;
  }
  function Kl() {
    var l = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return El === null ? V.memoizedState = El = l : El = El.next = l, El;
  }
  function _l() {
    if (fl === null) {
      var l = V.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = fl.next;
    var t = El === null ? V.memoizedState : El.next;
    if (t !== null) El = t, fl = l;
    else {
      if (l === null) throw V.alternate === null ? Error(o(467)) : Error(o(310));
      fl = l, l = { memoizedState: fl.memoizedState, baseState: fl.baseState, baseQueue: fl.baseQueue, queue: fl.queue, next: null }, El === null ? V.memoizedState = El = l : El = El.next = l;
    }
    return El;
  }
  function dn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function eu(l) {
    var t = tu;
    return tu += 1, ha === null && (ha = []), l = qs(ha, l, t), t = V, (El === null ? t.memoizedState : El.next) === null && (t = t.alternate, z.H = t === null || t.memoizedState === null ? M0 : vf), l;
  }
  function rn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return eu(l);
      if (l.$$typeof === Dl) return Bl(l);
    }
    throw Error(o(438, String(l)));
  }
  function af(l) {
    var t = null, e = V.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = V.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = { data: a.data.map(function(u) {
        return u.slice();
      }), index: 0 })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = dn(), V.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0) for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = Ll;
    return t.index++, e;
  }
  function Vt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function mn(l) {
    var t = _l();
    return uf(t, fl, l);
  }
  function uf(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(o(311));
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
      var f = c = null, i = null, v = t, _ = false;
      do {
        var A = v.lane & -536870913;
        if (A !== v.lane ? (k & A) === A : (Lt & A) === A) {
          var h = v.revertLane;
          if (h === 0) i !== null && (i = i.next = { lane: 0, revertLane: 0, gesture: null, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }), A === oa && (_ = true);
          else if ((Lt & h) === h) {
            v = v.next, h === oa && (_ = true);
            continue;
          } else A = { lane: 0, revertLane: v.revertLane, gesture: null, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }, i === null ? (f = i = A, c = n) : i = i.next = A, V.lanes |= h, ye |= h;
          A = v.action, Xe && e(n, A), n = v.hasEagerState ? v.eagerState : e(n, A);
        } else h = { lane: A, revertLane: v.revertLane, gesture: v.gesture, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }, i === null ? (f = i = h, c = n) : i = i.next = h, V.lanes |= A, ye |= A;
        v = v.next;
      } while (v !== null && v !== t);
      if (i === null ? c = n : i.next = f, !ut(n, l.memoizedState) && (Tl = true, _ && (e = da, e !== null))) throw e;
      l.memoizedState = n, l.baseState = c, l.baseQueue = i, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function nf(l) {
    var t = _l(), e = t.queue;
    if (e === null) throw Error(o(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, u = e.pending, n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var c = u = u.next;
      do
        n = l(n, c.action), c = c.next;
      while (c !== u);
      ut(n, t.memoizedState) || (Tl = true), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function Js(l, t, e) {
    var a = V, u = _l(), n = P;
    if (n) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = t();
    var c = !ut((fl || u).memoizedState, e);
    if (c && (u.memoizedState = e, Tl = true), u = u.queue, sf(Fs.bind(null, a, u, l), [l]), u.getSnapshot !== t || c || El !== null && El.memoizedState.tag & 1) {
      if (a.flags |= 2048, ga(9, { destroy: void 0 }, $s.bind(null, a, u, e, t), null), dl === null) throw Error(o(349));
      n || (Lt & 127) !== 0 || Ws(a, t, e);
    }
    return e;
  }
  function Ws(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = V.updateQueue, t === null ? (t = dn(), V.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function $s(l, t, e, a) {
    t.value = e, t.getSnapshot = a, ks(t) && Is(l);
  }
  function Fs(l, t, e) {
    return e(function() {
      ks(t) && Is(l);
    });
  }
  function ks(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !ut(l, e);
    } catch {
      return true;
    }
  }
  function Is(l) {
    var t = xe(l, 2);
    t !== null && Pl(t, l, 2);
  }
  function cf(l) {
    var t = Kl();
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
    return t.memoizedState = t.baseState = l, t.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Vt, lastRenderedState: l }, t;
  }
  function Ps(l, t, e, a) {
    return l.baseState = e, uf(l, fl, typeof a == "function" ? a : Vt);
  }
  function am(l, t, e, a, u) {
    if (hn(l)) throw Error(o(485));
    if (l = t.action, l !== null) {
      var n = { payload: u, action: l, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(c) {
        n.listeners.push(c);
      } };
      z.T !== null ? e(true) : n.isTransition = false, a(n), e = t.pending, e === null ? (n.next = t.pending = n, l0(t, n)) : (n.next = e.next, t.pending = e.next = n);
    }
  }
  function l0(l, t) {
    var e = t.action, a = t.payload, u = l.state;
    if (t.isTransition) {
      var n = z.T, c = {};
      z.T = c;
      try {
        var f = e(u, a), i = z.S;
        i !== null && i(c, f), t0(l, t, f);
      } catch (v) {
        ff(l, t, v);
      } finally {
        n !== null && c.types !== null && (n.types = c.types), z.T = n;
      }
    } else try {
      n = e(u, a), t0(l, t, n);
    } catch (v) {
      ff(l, t, v);
    }
  }
  function t0(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(function(a) {
      e0(l, t, a);
    }, function(a) {
      return ff(l, t, a);
    }) : e0(l, t, e);
  }
  function e0(l, t, e) {
    t.status = "fulfilled", t.value = e, a0(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, l0(l, e)));
  }
  function ff(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, a0(t), t = t.next;
      while (t !== a);
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
  function n0(l, t) {
    if (P) {
      var e = dl.formState;
      if (e !== null) {
        l: {
          var a = V;
          if (P) {
            if (rl) {
              t: {
                for (var u = rl, n = _t; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = pt(u.nextSibling), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                rl = pt(u.nextSibling), a = u.data === "F!";
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
    return e = Kl(), e.memoizedState = e.baseState = t, a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: u0, lastRenderedState: t }, e.queue = a, e = T0.bind(null, V, a), a.dispatch = e, a = cf(false), n = yf.bind(null, V, false, a.queue), a = Kl(), u = { state: t, dispatch: null, action: l, pending: null }, a.queue = u, e = am.bind(null, V, u, n, e), u.dispatch = e, a.memoizedState = l, [t, e, false];
  }
  function c0(l) {
    var t = _l();
    return f0(t, fl, l);
  }
  function f0(l, t, e) {
    if (t = uf(l, t, u0)[0], l = mn(Vt)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var a = eu(t);
    } catch (c) {
      throw c === ra ? en : c;
    }
    else a = t;
    t = _l();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && (V.flags |= 2048, ga(9, { destroy: void 0 }, um.bind(null, u, e), null)), [a, n, l];
  }
  function um(l, t) {
    l.action = t;
  }
  function i0(l) {
    var t = _l(), e = fl;
    if (e !== null) return f0(t, e, l);
    _l(), t = t.memoizedState, e = _l();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, false];
  }
  function ga(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = V.updateQueue, t === null && (t = dn(), V.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function s0() {
    return _l().memoizedState;
  }
  function yn(l, t, e, a) {
    var u = Kl();
    V.flags |= l, u.memoizedState = ga(1 | t, { destroy: void 0 }, e, a === void 0 ? null : a);
  }
  function vn(l, t, e, a) {
    var u = _l();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    fl !== null && a !== null && Ic(a, fl.memoizedState.deps) ? u.memoizedState = ga(t, n, e, a) : (V.flags |= l, u.memoizedState = ga(1 | t, n, e, a));
  }
  function o0(l, t) {
    yn(8390656, 8, l, t);
  }
  function sf(l, t) {
    vn(2048, 8, l, t);
  }
  function nm(l) {
    V.flags |= 4;
    var t = V.updateQueue;
    if (t === null) t = dn(), V.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function d0(l) {
    var t = _l().memoizedState;
    return nm({ ref: t, nextImpl: l }), function() {
      if ((al & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function r0(l, t) {
    return vn(4, 2, l, t);
  }
  function m0(l, t) {
    return vn(4, 4, l, t);
  }
  function y0(l, t) {
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
  function v0(l, t, e) {
    e = e != null ? e.concat([l]) : null, vn(4, 4, y0.bind(null, t, l), e);
  }
  function of() {
  }
  function h0(l, t) {
    var e = _l();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Ic(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function g0(l, t) {
    var e = _l();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Ic(t, a[1])) return a[0];
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
  function df(l, t, e) {
    return e === void 0 || (Lt & 1073741824) !== 0 && (k & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = So(), V.lanes |= l, ye |= l, e);
  }
  function b0(l, t, e, a) {
    return ut(e, t) ? e : ya.current !== null ? (l = df(l, e, a), ut(l, t) || (Tl = true), l) : (Lt & 42) === 0 || (Lt & 1073741824) !== 0 && (k & 261930) === 0 ? (Tl = true, l.memoizedState = e) : (l = So(), V.lanes |= l, ye |= l, t);
  }
  function S0(l, t, e, a, u) {
    var n = U.p;
    U.p = n !== 0 && 8 > n ? n : 8;
    var c = z.T, f = {};
    z.T = f, yf(l, false, t, e);
    try {
      var i = u(), v = z.S;
      if (v !== null && v(f, i), i !== null && typeof i == "object" && typeof i.then == "function") {
        var _ = lm(i, a);
        au(l, t, _, ot(l));
      } else au(l, t, a, ot(l));
    } catch (A) {
      au(l, t, { then: function() {
      }, status: "rejected", reason: A }, ot());
    } finally {
      U.p = n, c !== null && f.types !== null && (c.types = f.types), z.T = c;
    }
  }
  function cm() {
  }
  function rf(l, t, e, a) {
    if (l.tag !== 5) throw Error(o(476));
    var u = _0(l).queue;
    S0(l, u, t, X, e === null ? cm : function() {
      return z0(l), e(a);
    });
  }
  function _0(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = { memoizedState: X, baseState: X, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Vt, lastRenderedState: X }, next: null };
    var e = {};
    return t.next = { memoizedState: e, baseState: e, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Vt, lastRenderedState: e }, next: null }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function z0(l) {
    var t = _0(l);
    t.next === null && (t = l.alternate.memoizedState), au(l, t.next.queue, {}, ot());
  }
  function mf() {
    return Bl(_u);
  }
  function p0() {
    return _l().memoizedState;
  }
  function E0() {
    return _l().memoizedState;
  }
  function fm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = ot();
          l = ie(e);
          var a = se(t, l, e);
          a !== null && (Pl(a, t, e), Ia(a, t, e)), t = { cache: Qc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function im(l, t, e) {
    var a = ot();
    e = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null }, hn(l) ? A0(t, e) : (e = Nc(l, t, e, a), e !== null && (Pl(e, l, a), O0(e, t, a)));
  }
  function T0(l, t, e) {
    var a = ot();
    au(l, t, e, a);
  }
  function au(l, t, e, a) {
    var u = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null };
    if (hn(l)) A0(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null)) try {
        var c = t.lastRenderedState, f = n(c, e);
        if (u.hasEagerState = true, u.eagerState = f, ut(f, c)) return $u(l, t, u, 0), dl === null && Wu(), false;
      } catch {
      } finally {
      }
      if (e = Nc(l, t, u, a), e !== null) return Pl(e, l, a), O0(e, t, a), true;
    }
    return false;
  }
  function yf(l, t, e, a) {
    if (a = { lane: 2, revertLane: wf(), gesture: null, action: a, hasEagerState: false, eagerState: null, next: null }, hn(l)) {
      if (t) throw Error(o(479));
    } else t = Nc(l, e, a, 2), t !== null && Pl(t, l, 2);
  }
  function hn(l) {
    var t = l.alternate;
    return l === V || t !== null && t === V;
  }
  function A0(l, t) {
    va = sn = true;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function O0(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, xi(l, e);
    }
  }
  var uu = { readContext: Bl, use: rn, useCallback: gl, useContext: gl, useEffect: gl, useImperativeHandle: gl, useLayoutEffect: gl, useInsertionEffect: gl, useMemo: gl, useReducer: gl, useRef: gl, useState: gl, useDebugValue: gl, useDeferredValue: gl, useTransition: gl, useSyncExternalStore: gl, useId: gl, useHostTransitionStatus: gl, useFormState: gl, useActionState: gl, useOptimistic: gl, useMemoCache: gl, useCacheRefresh: gl };
  uu.useEffectEvent = gl;
  var M0 = { readContext: Bl, use: rn, useCallback: function(l, t) {
    return Kl().memoizedState = [l, t === void 0 ? null : t], l;
  }, useContext: Bl, useEffect: o0, useImperativeHandle: function(l, t, e) {
    e = e != null ? e.concat([l]) : null, yn(4194308, 4, y0.bind(null, t, l), e);
  }, useLayoutEffect: function(l, t) {
    return yn(4194308, 4, l, t);
  }, useInsertionEffect: function(l, t) {
    yn(4, 2, l, t);
  }, useMemo: function(l, t) {
    var e = Kl();
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
    var a = Kl();
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
    return a.memoizedState = a.baseState = u, l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: l, lastRenderedState: u }, a.queue = l, l = l.dispatch = im.bind(null, V, l), [a.memoizedState, l];
  }, useRef: function(l) {
    var t = Kl();
    return l = { current: l }, t.memoizedState = l;
  }, useState: function(l) {
    l = cf(l);
    var t = l.queue, e = T0.bind(null, V, t);
    return t.dispatch = e, [l.memoizedState, e];
  }, useDebugValue: of, useDeferredValue: function(l, t) {
    var e = Kl();
    return df(e, l, t);
  }, useTransition: function() {
    var l = cf(false);
    return l = S0.bind(null, V, l.queue, true, false), Kl().memoizedState = l, [false, l];
  }, useSyncExternalStore: function(l, t, e) {
    var a = V, u = Kl();
    if (P) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else {
      if (e = t(), dl === null) throw Error(o(349));
      (k & 127) !== 0 || Ws(a, t, e);
    }
    u.memoizedState = e;
    var n = { value: e, getSnapshot: t };
    return u.queue = n, o0(Fs.bind(null, a, n, l), [l]), a.flags |= 2048, ga(9, { destroy: void 0 }, $s.bind(null, a, n, e, t), null), e;
  }, useId: function() {
    var l = Kl(), t = dl.identifierPrefix;
    if (P) {
      var e = xt, a = Nt;
      e = (a & ~(1 << 32 - at(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = on++, 0 < e && (t += "H" + e.toString(32)), t += "_";
    } else e = tm++, t = "_" + t + "r_" + e.toString(32) + "_";
    return l.memoizedState = t;
  }, useHostTransitionStatus: mf, useFormState: n0, useActionState: n0, useOptimistic: function(l) {
    var t = Kl();
    t.memoizedState = t.baseState = l;
    var e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return t.queue = e, t = yf.bind(null, V, true, e), e.dispatch = t, [l, t];
  }, useMemoCache: af, useCacheRefresh: function() {
    return Kl().memoizedState = fm.bind(null, V);
  }, useEffectEvent: function(l) {
    var t = Kl(), e = { impl: l };
    return t.memoizedState = e, function() {
      if ((al & 2) !== 0) throw Error(o(440));
      return e.impl.apply(void 0, arguments);
    };
  } }, vf = { readContext: Bl, use: rn, useCallback: h0, useContext: Bl, useEffect: sf, useImperativeHandle: v0, useInsertionEffect: r0, useLayoutEffect: m0, useMemo: g0, useReducer: mn, useRef: s0, useState: function() {
    return mn(Vt);
  }, useDebugValue: of, useDeferredValue: function(l, t) {
    var e = _l();
    return b0(e, fl.memoizedState, l, t);
  }, useTransition: function() {
    var l = mn(Vt)[0], t = _l().memoizedState;
    return [typeof l == "boolean" ? l : eu(l), t];
  }, useSyncExternalStore: Js, useId: p0, useHostTransitionStatus: mf, useFormState: c0, useActionState: c0, useOptimistic: function(l, t) {
    var e = _l();
    return Ps(e, fl, l, t);
  }, useMemoCache: af, useCacheRefresh: E0 };
  vf.useEffectEvent = d0;
  var D0 = { readContext: Bl, use: rn, useCallback: h0, useContext: Bl, useEffect: sf, useImperativeHandle: v0, useInsertionEffect: r0, useLayoutEffect: m0, useMemo: g0, useReducer: nf, useRef: s0, useState: function() {
    return nf(Vt);
  }, useDebugValue: of, useDeferredValue: function(l, t) {
    var e = _l();
    return fl === null ? df(e, l, t) : b0(e, fl.memoizedState, l, t);
  }, useTransition: function() {
    var l = nf(Vt)[0], t = _l().memoizedState;
    return [typeof l == "boolean" ? l : eu(l), t];
  }, useSyncExternalStore: Js, useId: p0, useHostTransitionStatus: mf, useFormState: i0, useActionState: i0, useOptimistic: function(l, t) {
    var e = _l();
    return fl !== null ? Ps(e, fl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
  }, useMemoCache: af, useCacheRefresh: E0 };
  D0.useEffectEvent = d0;
  function hf(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : B({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var gf = { enqueueSetState: function(l, t, e) {
    l = l._reactInternals;
    var a = ot(), u = ie(a);
    u.payload = t, e != null && (u.callback = e), t = se(l, u, a), t !== null && (Pl(t, l, a), Ia(t, l, a));
  }, enqueueReplaceState: function(l, t, e) {
    l = l._reactInternals;
    var a = ot(), u = ie(a);
    u.tag = 1, u.payload = t, e != null && (u.callback = e), t = se(l, u, a), t !== null && (Pl(t, l, a), Ia(t, l, a));
  }, enqueueForceUpdate: function(l, t) {
    l = l._reactInternals;
    var e = ot(), a = ie(e);
    a.tag = 2, t != null && (a.callback = t), t = se(l, a, e), t !== null && (Pl(t, l, e), Ia(t, l, e));
  } };
  function U0(l, t, e, a, u, n, c) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, c) : t.prototype && t.prototype.isPureReactComponent ? !Va(e, a) || !Va(u, n) : true;
  }
  function N0(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && gf.enqueueReplaceState(t, t.state, null);
  }
  function Qe(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t) a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = B({}, e));
      for (var u in l) e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function x0(l) {
    Ju(l);
  }
  function R0(l) {
    console.error(l);
  }
  function H0(l) {
    Ju(l);
  }
  function gn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function C0(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, { componentStack: e.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function bf(l, t, e) {
    return e = ie(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      gn(l, t);
    }, e;
  }
  function j0(l) {
    return l = ie(l), l.tag = 3, l;
  }
  function q0(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        C0(t, e, a);
      };
    }
    var c = e.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (l.callback = function() {
      C0(t, e, a), typeof u != "function" && (ve === null ? ve = /* @__PURE__ */ new Set([this]) : ve.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, { componentStack: f !== null ? f : "" });
    });
  }
  function sm(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && sa(t, e, u, true), e = ct.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return zt === null ? Un() : e.alternate === null && bl === 0 && (bl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === an ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Lf(l, a, u)), false;
          case 22:
            return e.flags |= 65536, a === an ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([a]) }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Lf(l, a, u)), false;
        }
        throw Error(o(435, e.tag));
      }
      return Lf(l, a, u), Un(), false;
    }
    if (P) return t = ct.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== qc && (l = Error(o(422), { cause: a }), Ja(gt(l, e)))) : (a !== qc && (t = Error(o(423), { cause: a }), Ja(gt(t, e))), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = gt(a, e), u = bf(l.stateNode, a, u), Jc(l, u), bl !== 4 && (bl = 2)), false;
    var n = Error(o(520), { cause: a });
    if (n = gt(n, e), ru === null ? ru = [n] : ru.push(n), bl !== 4 && (bl = 2), t === null) return true;
    a = gt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = bf(e.stateNode, a, l), Jc(e, l), false;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (ve === null || !ve.has(n)))) return e.flags |= 65536, u &= -u, e.lanes |= u, u = j0(u), q0(u, l, e, a), Jc(e, u), false;
      }
      e = e.return;
    } while (e !== null);
    return false;
  }
  var Sf = Error(o(461)), Tl = false;
  function Yl(l, t, e, a) {
    t.child = l === null ? Xs(t, null, e, a) : Ge(t, l.child, e, a);
  }
  function B0(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var f in a) f !== "ref" && (c[f] = a[f]);
    } else c = a;
    return je(t), a = Pc(l, t, e, c, n, u), f = lf(), l !== null && !Tl ? (tf(l, t, u), Kt(l, t, u)) : (P && f && Cc(t), t.flags |= 1, Yl(l, t, a, u), t.child);
  }
  function Y0(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !xc(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, G0(l, t, n, a, u)) : (l = ku(e.type, null, a, t, t.mode, u), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !Mf(l, u)) {
      var c = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Va, e(c, a) && l.ref === t.ref) return Kt(l, t, u);
    }
    return t.flags |= 1, l = Gt(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function G0(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Va(n, a) && l.ref === t.ref) if (Tl = false, t.pendingProps = a = n, Mf(l, u)) (l.flags & 131072) !== 0 && (Tl = true);
      else return t.lanes = l.lanes, Kt(l, t, u);
    }
    return _f(l, t, e, a, u);
  }
  function X0(l, t, e, a) {
    var u = a.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, l !== null) {
          for (a = t.child = l.child, u = 0; a !== null; ) u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, t.child = null;
        return Q0(l, t, n, e, a);
      }
      if ((e & 536870912) !== 0) t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && tn(t, n !== null ? n.cachePool : null), n !== null ? Ls(t, n) : $c(), Vs(t);
      else return a = t.lanes = 536870912, Q0(l, t, n !== null ? n.baseLanes | e : e, e, a);
    } else n !== null ? (tn(t, n.cachePool), Ls(t, n), de(), t.memoizedState = null) : (l !== null && tn(t, null), $c(), de());
    return Yl(l, t, u, e), t.child;
  }
  function nu(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t.sibling;
  }
  function Q0(l, t, e, a, u) {
    var n = Lc();
    return n = n === null ? null : { parent: pl._currentValue, pool: n }, t.memoizedState = { baseLanes: e, cachePool: n }, l !== null && tn(t, null), $c(), Vs(t), l !== null && sa(l, t, a, true), t.childLanes = u, null;
  }
  function bn(l, t) {
    return t = _n({ mode: t.mode, children: t.children }, l.mode), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Z0(l, t, e) {
    return Ge(t, l.child, null, e), l = bn(t, t.pendingProps), l.flags |= 2, ft(t), t.memoizedState = null, l;
  }
  function om(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (P) {
        if (a.mode === "hidden") return l = bn(t, a), t.lanes = 536870912, nu(null, l);
        if (kc(t), (l = rl) ? (l = td(l, _t), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: ae !== null ? { id: Nt, overflow: xt } : null, retryLane: 536870912, hydrationErrors: null }, e = As(l), e.return = t, t.child = e, ql = t, rl = null)) : l = null, l === null) throw ne(t);
        return t.lanes = 536870912, null;
      }
      return bn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var c = n.dehydrated;
      if (kc(t), u) if (t.flags & 256) t.flags &= -257, t = Z0(l, t, e);
      else if (t.memoizedState !== null) t.child = l.child, t.flags |= 128, t = null;
      else throw Error(o(558));
      else if (Tl || sa(l, t, e, false), u = (e & l.childLanes) !== 0, Tl || u) {
        if (a = dl, a !== null && (c = Ri(a, e), c !== 0 && c !== n.retryLane)) throw n.retryLane = c, xe(l, c), Pl(a, l, c), Sf;
        Un(), t = Z0(l, t, e);
      } else l = n.treeContext, rl = pt(c.nextSibling), ql = t, P = true, ue = null, _t = false, l !== null && Ds(t, l), t = bn(t, a), t.flags |= 4096;
      return t;
    }
    return l = Gt(l.child, { mode: a.mode, children: a.children }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Sn(l, t) {
    var e = t.ref;
    if (e === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object") throw Error(o(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function _f(l, t, e, a, u) {
    return je(t), e = Pc(l, t, e, a, void 0, u), a = lf(), l !== null && !Tl ? (tf(l, t, u), Kt(l, t, u)) : (P && a && Cc(t), t.flags |= 1, Yl(l, t, e, u), t.child);
  }
  function L0(l, t, e, a, u, n) {
    return je(t), t.updateQueue = null, e = ws(t, a, e, u), Ks(l), a = lf(), l !== null && !Tl ? (tf(l, t, n), Kt(l, t, n)) : (P && a && Cc(t), t.flags |= 1, Yl(l, t, e, n), t.child);
  }
  function V0(l, t, e, a, u) {
    if (je(t), t.stateNode === null) {
      var n = na, c = e.contextType;
      typeof c == "object" && c !== null && (n = Bl(c)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = gf, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Kc(t), c = e.contextType, n.context = typeof c == "object" && c !== null ? Bl(c) : na, n.state = t.memoizedState, c = e.getDerivedStateFromProps, typeof c == "function" && (hf(t, e, c, a), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (c = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), c !== n.state && gf.enqueueReplaceState(n, n.state, null), lu(t, a, n, u), Pa(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = true;
    } else if (l === null) {
      n = t.stateNode;
      var f = t.memoizedProps, i = Qe(e, f);
      n.props = i;
      var v = n.context, _ = e.contextType;
      c = na, typeof _ == "object" && _ !== null && (c = Bl(_));
      var A = e.getDerivedStateFromProps;
      _ = typeof A == "function" || typeof n.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, _ || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f || v !== c) && N0(t, n, a, c), fe = false;
      var h = t.memoizedState;
      n.state = h, lu(t, a, n, u), Pa(), v = t.memoizedState, f || h !== v || fe ? (typeof A == "function" && (hf(t, e, A, a), v = t.memoizedState), (i = fe || U0(t, e, i, a, h, v, c)) ? (_ || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = v), n.props = a, n.state = v, n.context = c, a = i) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = false);
    } else {
      n = t.stateNode, wc(l, t), c = t.memoizedProps, _ = Qe(e, c), n.props = _, A = t.pendingProps, h = n.context, v = e.contextType, i = na, typeof v == "object" && v !== null && (i = Bl(v)), f = e.getDerivedStateFromProps, (v = typeof f == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c !== A || h !== i) && N0(t, n, a, i), fe = false, h = t.memoizedState, n.state = h, lu(t, a, n, u), Pa();
      var b = t.memoizedState;
      c !== A || h !== b || fe || l !== null && l.dependencies !== null && Pu(l.dependencies) ? (typeof f == "function" && (hf(t, e, f, a), b = t.memoizedState), (_ = fe || U0(t, e, _, a, h, b, i) || l !== null && l.dependencies !== null && Pu(l.dependencies)) ? (v || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, b, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(a, b, i)), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && h === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && h === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = b), n.props = a, n.state = b, n.context = i, a = _) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && h === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && h === l.memoizedState || (t.flags |= 1024), a = false);
    }
    return n = a, Sn(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = Ge(t, l.child, null, u), t.child = Ge(t, null, e, u)) : Yl(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = Kt(l, t, u), l;
  }
  function K0(l, t, e, a) {
    return He(), t.flags |= 256, Yl(l, t, e, a), t.child;
  }
  var zf = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function pf(l) {
    return { baseLanes: l, cachePool: Cs() };
  }
  function Ef(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= st), l;
  }
  function w0(l, t, e) {
    var a = t.pendingProps, u = false, n = (t.flags & 128) !== 0, c;
    if ((c = n) || (c = l !== null && l.memoizedState === null ? false : (Sl.current & 2) !== 0), c && (u = true, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (P) {
        if (u ? oe(t) : de(), (l = rl) ? (l = td(l, _t), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: ae !== null ? { id: Nt, overflow: xt } : null, retryLane: 536870912, hydrationErrors: null }, e = As(l), e.return = t, t.child = e, ql = t, rl = null)) : l = null, l === null) throw ne(t);
        return ni(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var f = a.children;
      return a = a.fallback, u ? (de(), u = t.mode, f = _n({ mode: "hidden", children: f }, u), a = Re(a, u, e, null), f.return = t, a.return = t, f.sibling = a, t.child = f, a = t.child, a.memoizedState = pf(e), a.childLanes = Ef(l, c, e), t.memoizedState = zf, nu(null, a)) : (oe(t), Tf(t, f));
    }
    var i = l.memoizedState;
    if (i !== null && (f = i.dehydrated, f !== null)) {
      if (n) t.flags & 256 ? (oe(t), t.flags &= -257, t = Af(l, t, e)) : t.memoizedState !== null ? (de(), t.child = l.child, t.flags |= 128, t = null) : (de(), f = a.fallback, u = t.mode, a = _n({ mode: "visible", children: a.children }, u), f = Re(f, u, e, null), f.flags |= 2, a.return = t, f.return = t, a.sibling = f, t.child = a, Ge(t, l.child, null, e), a = t.child, a.memoizedState = pf(e), a.childLanes = Ef(l, c, e), t.memoizedState = zf, t = nu(null, a));
      else if (oe(t), ni(f)) {
        if (c = f.nextSibling && f.nextSibling.dataset, c) var v = c.dgst;
        c = v, a = Error(o(419)), a.stack = "", a.digest = c, Ja({ value: a, source: null, stack: null }), t = Af(l, t, e);
      } else if (Tl || sa(l, t, e, false), c = (e & l.childLanes) !== 0, Tl || c) {
        if (c = dl, c !== null && (a = Ri(c, e), a !== 0 && a !== i.retryLane)) throw i.retryLane = a, xe(l, a), Pl(c, l, a), Sf;
        ui(f) || Un(), t = Af(l, t, e);
      } else ui(f) ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, rl = pt(f.nextSibling), ql = t, P = true, ue = null, _t = false, l !== null && Ds(t, l), t = Tf(t, a.children), t.flags |= 4096);
      return t;
    }
    return u ? (de(), f = a.fallback, u = t.mode, i = l.child, v = i.sibling, a = Gt(i, { mode: "hidden", children: a.children }), a.subtreeFlags = i.subtreeFlags & 65011712, v !== null ? f = Gt(v, f) : (f = Re(f, u, e, null), f.flags |= 2), f.return = t, a.return = t, a.sibling = f, t.child = a, nu(null, a), a = t.child, f = l.child.memoizedState, f === null ? f = pf(e) : (u = f.cachePool, u !== null ? (i = pl._currentValue, u = u.parent !== i ? { parent: i, pool: i } : u) : u = Cs(), f = { baseLanes: f.baseLanes | e, cachePool: u }), a.memoizedState = f, a.childLanes = Ef(l, c, e), t.memoizedState = zf, nu(l.child, a)) : (oe(t), e = l.child, l = e.sibling, e = Gt(e, { mode: "visible", children: a.children }), e.return = t, e.sibling = null, l !== null && (c = t.deletions, c === null ? (t.deletions = [l], t.flags |= 16) : c.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function Tf(l, t) {
    return t = _n({ mode: "visible", children: t }, l.mode), t.return = l, l.child = t;
  }
  function _n(l, t) {
    return l = nt(22, l, null, t), l.lanes = 0, l;
  }
  function Af(l, t, e) {
    return Ge(t, l.child, null, e), l = Tf(t, t.pendingProps.children), l.flags |= 2, t.memoizedState = null, l;
  }
  function J0(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Gc(l.return, t, e);
  }
  function Of(l, t, e, a, u, n) {
    var c = l.memoizedState;
    c === null ? l.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: a, tail: e, tailMode: u, treeForkCount: n } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = a, c.tail = e, c.tailMode = u, c.treeForkCount = n);
  }
  function W0(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var c = Sl.current, f = (c & 2) !== 0;
    if (f ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, M(Sl, c), Yl(l, t, a, e), a = P ? wa : 0, !f && l !== null && (l.flags & 128) !== 0) l: for (l = t.child; l !== null; ) {
      if (l.tag === 13) l.memoizedState !== null && J0(l, e, t);
      else if (l.tag === 19) J0(l, e, t);
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
        for (e = t.child, u = null; e !== null; ) l = e.alternate, l !== null && fn(l) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), Of(t, false, u, e, n, a);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = t.child, t.child = null; u !== null; ) {
          if (l = u.alternate, l !== null && fn(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        Of(t, true, e, null, n, a);
        break;
      case "together":
        Of(t, false, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Kt(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), ye |= t.lanes, (e & t.childLanes) === 0) if (l !== null) {
      if (sa(l, t, e, false), (e & t.childLanes) === 0) return null;
    } else return null;
    if (l !== null && t.child !== l.child) throw Error(o(153));
    if (t.child !== null) {
      for (l = t.child, e = Gt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; ) l = l.sibling, e = e.sibling = Gt(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function Mf(l, t) {
    return (l.lanes & t) !== 0 ? true : (l = l.dependencies, !!(l !== null && Pu(l)));
  }
  function dm(l, t, e) {
    switch (t.tag) {
      case 3:
        Ul(t, t.stateNode.containerInfo), ce(t, pl, l.memoizedState.cache), He();
        break;
      case 27:
      case 5:
        Ae(t);
        break;
      case 4:
        Ul(t, t.stateNode.containerInfo);
        break;
      case 10:
        ce(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return t.flags |= 128, kc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null) return a.dehydrated !== null ? (oe(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? w0(l, t, e) : (oe(t), l = Kt(l, t, e), l !== null ? l.sibling : null);
        oe(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (sa(l, t, e, false), a = (e & t.childLanes) !== 0), u) {
          if (a) return W0(l, t, e);
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), M(Sl, Sl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, X0(l, t, e, t.pendingProps);
      case 24:
        ce(t, pl, l.memoizedState.cache);
    }
    return Kt(l, t, e);
  }
  function $0(l, t, e) {
    if (l !== null) if (l.memoizedProps !== t.pendingProps) Tl = true;
    else {
      if (!Mf(l, e) && (t.flags & 128) === 0) return Tl = false, dm(l, t, e);
      Tl = (l.flags & 131072) !== 0;
    }
    else Tl = false, P && (t.flags & 1048576) !== 0 && Ms(t, wa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = Be(t.elementType), t.type = l, typeof l == "function") xc(l) ? (a = Qe(l, a), t.tag = 1, t = V0(null, t, l, a, e)) : (t.tag = 0, t = _f(null, t, l, a, e));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === wl) {
                t.tag = 11, t = B0(null, t, l, a, e);
                break l;
              } else if (u === J) {
                t.tag = 14, t = Y0(null, t, l, a, e);
                break l;
              }
            }
            throw t = At(l) || l, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return _f(l, t, t.type, t.pendingProps, e);
      case 1:
        return a = t.type, u = Qe(a, t.pendingProps), V0(l, t, a, u, e);
      case 3:
        l: {
          if (Ul(t, t.stateNode.containerInfo), l === null) throw Error(o(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, wc(l, t), lu(t, a, null, e);
          var c = t.memoizedState;
          if (a = c.cache, ce(t, pl, a), a !== n.cache && Xc(t, [pl], e, true), Pa(), a = c.element, n.isDehydrated) if (n = { element: a, isDehydrated: false, cache: c.cache }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
            t = K0(l, t, a, e);
            break l;
          } else if (a !== u) {
            u = gt(Error(o(424)), t), Ja(u), t = K0(l, t, a, e);
            break l;
          } else {
            switch (l = t.stateNode.containerInfo, l.nodeType) {
              case 9:
                l = l.body;
                break;
              default:
                l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
            }
            for (rl = pt(l.firstChild), ql = t, P = true, ue = null, _t = true, e = Xs(t, null, a, e), t.child = e; e; ) e.flags = e.flags & -3 | 4096, e = e.sibling;
          }
          else {
            if (He(), a === u) {
              t = Kt(l, t, e);
              break l;
            }
            Yl(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Sn(l, t), l === null ? (e = fd(t.type, null, t.pendingProps, null)) ? t.memoizedState = e : P || (e = t.type, l = t.pendingProps, a = qn(w.current).createElement(e), a[jl] = t, a[Jl] = l, Gl(a, e, l), Nl(a), t.stateNode = a) : t.memoizedState = fd(t.type, l.memoizedProps, t.pendingProps, l.memoizedState), null;
      case 27:
        return Ae(t), l === null && P && (a = t.stateNode = ud(t.type, t.pendingProps, w.current), ql = t, _t = true, u = rl, Se(t.type) ? (ci = u, rl = pt(a.firstChild)) : rl = u), Yl(l, t, t.pendingProps.children, e), Sn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && P && ((u = a = rl) && (a = Qm(a, t.type, t.pendingProps, _t), a !== null ? (t.stateNode = a, ql = t, rl = pt(a.firstChild), _t = false, u = true) : u = false), u || ne(t)), Ae(t), u = t.type, n = t.pendingProps, c = l !== null ? l.memoizedProps : null, a = n.children, ti(u, n) ? a = null : c !== null && ti(u, c) && (t.flags |= 32), t.memoizedState !== null && (u = Pc(l, t, em, null, null, e), _u._currentValue = u), Sn(l, t), Yl(l, t, a, e), t.child;
      case 6:
        return l === null && P && ((l = e = rl) && (e = Zm(e, t.pendingProps, _t), e !== null ? (t.stateNode = e, ql = t, rl = null, l = true) : l = false), l || ne(t)), null;
      case 13:
        return w0(l, t, e);
      case 4:
        return Ul(t, t.stateNode.containerInfo), a = t.pendingProps, l === null ? t.child = Ge(t, null, a, e) : Yl(l, t, a, e), t.child;
      case 11:
        return B0(l, t, t.type, t.pendingProps, e);
      case 7:
        return Yl(l, t, t.pendingProps, e), t.child;
      case 8:
        return Yl(l, t, t.pendingProps.children, e), t.child;
      case 12:
        return Yl(l, t, t.pendingProps.children, e), t.child;
      case 10:
        return a = t.pendingProps, ce(t, t.type, a.value), Yl(l, t, a.children, e), t.child;
      case 9:
        return u = t.type._context, a = t.pendingProps.children, je(t), u = Bl(u), a = a(u), t.flags |= 1, Yl(l, t, a, e), t.child;
      case 14:
        return Y0(l, t, t.type, t.pendingProps, e);
      case 15:
        return G0(l, t, t.type, t.pendingProps, e);
      case 19:
        return W0(l, t, e);
      case 31:
        return om(l, t, e);
      case 22:
        return X0(l, t, e, t.pendingProps);
      case 24:
        return je(t), a = Bl(pl), l === null ? (u = Lc(), u === null && (u = dl, n = Qc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, Kc(t), ce(t, pl, u)) : ((l.lanes & e) !== 0 && (wc(l, t), lu(t, null, null, e), Pa()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ce(t, pl, a)) : (a = n.cache, ce(t, pl, a), a !== u.cache && Xc(t, [pl], e, true))), Yl(l, t, t.pendingProps.children, e), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function wt(l) {
    l.flags |= 4;
  }
  function Df(l, t, e, a, u) {
    if ((t = (l.mode & 32) !== 0) && (t = false), t) {
      if (l.flags |= 16777216, (u & 335544128) === u) if (l.stateNode.complete) l.flags |= 8192;
      else if (Eo()) l.flags |= 8192;
      else throw Ye = an, Vc;
    } else l.flags &= -16777217;
  }
  function F0(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) l.flags &= -16777217;
    else if (l.flags |= 16777216, !rd(t)) if (Eo()) l.flags |= 8192;
    else throw Ye = an, Vc;
  }
  function zn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Ui() : 536870912, l.lanes |= t, za |= t);
  }
  function cu(l, t) {
    if (!P) switch (l.tailMode) {
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
  function ml(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t) for (var u = l.child; u !== null; ) e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = l, u = u.sibling;
    else for (u = l.child; u !== null; ) e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function rm(l, t, e) {
    var a = t.pendingProps;
    switch (jc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ml(t), null;
      case 1:
        return ml(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Zt(pl), yl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (ia(t) ? wt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Bc())), ml(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (wt(t), n !== null ? (ml(t), F0(t, n)) : (ml(t), Df(t, u, null, a, e))) : n ? n !== l.memoizedState ? (wt(t), ml(t), F0(t, n)) : (ml(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && wt(t), ml(t), Df(t, u, l, a, e)), null;
      case 27:
        if (Ke(t), e = w.current, u = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && wt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return ml(t), null;
          }
          l = N.current, ia(t) ? Us(t) : (l = ud(u, a, e), t.stateNode = l, wt(t));
        }
        return ml(t), null;
      case 5:
        if (Ke(t), u = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && wt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return ml(t), null;
          }
          if (n = N.current, ia(t)) Us(t);
          else {
            var c = qn(w.current);
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
            n[jl] = t, n[Jl] = a;
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
            l: switch (Gl(n, u, a), u) {
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
            a && wt(t);
          }
        }
        return ml(t), Df(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, e), null;
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && wt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(o(166));
          if (l = w.current, ia(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = ql, u !== null) switch (u.tag) {
              case 27:
              case 5:
                a = u.memoizedProps;
            }
            l[jl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === true || Jo(l.nodeValue, e)), l || ne(t, true);
          } else l = qn(l).createTextNode(a), l[jl] = t, t.stateNode = l;
        }
        return ml(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = ia(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(o(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(557));
              l[jl] = t;
            } else He(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ml(t), l = false;
          } else e = Bc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = true;
          if (!l) return t.flags & 256 ? (ft(t), t) : (ft(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return ml(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = ia(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(o(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[jl] = t;
            } else He(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ml(t), u = false;
          } else u = Bc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = true;
          if (!u) return t.flags & 256 ? (ft(t), t) : (ft(t), null);
        }
        return ft(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), zn(t, t.updateQueue), ml(t), null);
      case 4:
        return yl(), l === null && Ff(t.stateNode.containerInfo), ml(t), null;
      case 10:
        return Zt(t.type), ml(t), null;
      case 19:
        if (T(Sl), a = t.memoizedState, a === null) return ml(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null) if (u) cu(a, false);
        else {
          if (bl !== 0 || l !== null && (l.flags & 128) !== 0) for (l = t.child; l !== null; ) {
            if (n = fn(l), n !== null) {
              for (t.flags |= 128, cu(a, false), l = n.updateQueue, t.updateQueue = l, zn(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; ) Ts(e, l), e = e.sibling;
              return M(Sl, Sl.current & 1 | 2), P && Xt(t, a.treeForkCount), t.child;
            }
            l = l.sibling;
          }
          a.tail !== null && tt() > On && (t.flags |= 128, u = true, cu(a, false), t.lanes = 4194304);
        }
        else {
          if (!u) if (l = fn(n), l !== null) {
            if (t.flags |= 128, u = true, l = l.updateQueue, t.updateQueue = l, zn(t, l), cu(a, true), a.tail === null && a.tailMode === "hidden" && !n.alternate && !P) return ml(t), null;
          } else 2 * tt() - a.renderingStartTime > On && e !== 536870912 && (t.flags |= 128, u = true, cu(a, false), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = tt(), l.sibling = null, e = Sl.current, M(Sl, u ? e & 1 | 2 : e & 1), P && Xt(t, a.treeForkCount), l) : (ml(t), null);
      case 22:
      case 23:
        return ft(t), Fc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (ml(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ml(t), e = t.updateQueue, e !== null && zn(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && T(qe), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), Zt(pl), ml(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function mm(l, t) {
    switch (jc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Zt(pl), yl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ke(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (ft(t), t.alternate === null) throw Error(o(340));
          He();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (ft(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null) throw Error(o(340));
          He();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return T(Sl), null;
      case 4:
        return yl(), null;
      case 10:
        return Zt(t.type), null;
      case 22:
      case 23:
        return ft(t), Fc(), l !== null && T(qe), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Zt(pl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function k0(l, t) {
    switch (jc(t), t.tag) {
      case 3:
        Zt(pl), yl();
        break;
      case 26:
      case 27:
      case 5:
        Ke(t);
        break;
      case 4:
        yl();
        break;
      case 31:
        t.memoizedState !== null && ft(t);
        break;
      case 13:
        ft(t);
        break;
      case 19:
        T(Sl);
        break;
      case 10:
        Zt(t.type);
        break;
      case 22:
      case 23:
        ft(t), Fc(), l !== null && T(qe);
        break;
      case 24:
        Zt(pl);
    }
  }
  function fu(l, t) {
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
    } catch (f) {
      cl(t, t.return, f);
    }
  }
  function re(l, t, e) {
    try {
      var a = t.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var c = a.inst, f = c.destroy;
            if (f !== void 0) {
              c.destroy = void 0, u = t;
              var i = e, v = f;
              try {
                v();
              } catch (_) {
                cl(u, i, _);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (_) {
      cl(t, t.return, _);
    }
  }
  function I0(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Zs(t, e);
      } catch (a) {
        cl(l, l.return, a);
      }
    }
  }
  function P0(l, t, e) {
    e.props = Qe(l.type, l.memoizedProps), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      cl(l, t, a);
    }
  }
  function iu(l, t) {
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
      cl(l, t, u);
    }
  }
  function Rt(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null) if (typeof a == "function") try {
      a();
    } catch (u) {
      cl(l, t, u);
    } finally {
      l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
    }
    else if (typeof e == "function") try {
      e(null);
    } catch (u) {
      cl(l, t, u);
    }
    else e.current = null;
  }
  function lo(l) {
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
      cl(l, l.return, u);
    }
  }
  function Uf(l, t, e) {
    try {
      var a = l.stateNode;
      jm(a, l.type, e, t), a[Jl] = t;
    } catch (u) {
      cl(l, l.return, u);
    }
  }
  function to(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Se(l.type) || l.tag === 4;
  }
  function Nf(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || to(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Se(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function xf(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = Bt));
    else if (a !== 4 && (a === 27 && Se(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null)) for (xf(l, t, e), l = l.sibling; l !== null; ) xf(l, t, e), l = l.sibling;
  }
  function pn(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && Se(l.type) && (e = l.stateNode), l = l.child, l !== null)) for (pn(l, t, e), l = l.sibling; l !== null; ) pn(l, t, e), l = l.sibling;
  }
  function eo(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; ) t.removeAttributeNode(u[0]);
      Gl(t, a, e), t[jl] = l, t[Jl] = e;
    } catch (n) {
      cl(l, l.return, n);
    }
  }
  var Jt = false, Al = false, Rf = false, ao = typeof WeakSet == "function" ? WeakSet : Set, xl = null;
  function ym(l, t) {
    if (l = l.containerInfo, Pf = Ln, l = vs(l), Tc(l)) {
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
          var c = 0, f = -1, i = -1, v = 0, _ = 0, A = l, h = null;
          t: for (; ; ) {
            for (var b; A !== e || u !== 0 && A.nodeType !== 3 || (f = c + u), A !== n || a !== 0 && A.nodeType !== 3 || (i = c + a), A.nodeType === 3 && (c += A.nodeValue.length), (b = A.firstChild) !== null; ) h = A, A = b;
            for (; ; ) {
              if (A === l) break t;
              if (h === e && ++v === u && (f = c), h === n && ++_ === a && (i = c), (b = A.nextSibling) !== null) break;
              A = h, h = A.parentNode;
            }
            A = b;
          }
          e = f === -1 || i === -1 ? null : { start: f, end: i };
        } else e = null;
      }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (li = { focusedElem: l, selectionRange: e }, Ln = false, xl = t; xl !== null; ) if (t = xl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null) l.return = t, xl = l;
    else for (; xl !== null; ) {
      switch (t = xl, n = t.alternate, l = t.flags, t.tag) {
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
            } catch (Y) {
              cl(e, e.return, Y);
            }
          }
          break;
        case 3:
          if ((l & 1024) !== 0) {
            if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9) ai(l);
            else if (e === 1) switch (l.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                ai(l);
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
          if ((l & 1024) !== 0) throw Error(o(163));
      }
      if (l = t.sibling, l !== null) {
        l.return = t.return, xl = l;
        break;
      }
      xl = t.return;
    }
  }
  function uo(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        $t(l, e), a & 4 && fu(5, e);
        break;
      case 1:
        if ($t(l, e), a & 4) if (l = e.stateNode, t === null) try {
          l.componentDidMount();
        } catch (c) {
          cl(e, e.return, c);
        }
        else {
          var u = Qe(e.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
          } catch (c) {
            cl(e, e.return, c);
          }
        }
        a & 64 && I0(e), a & 512 && iu(e, e.return);
        break;
      case 3:
        if ($t(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
          if (t = null, e.child !== null) switch (e.child.tag) {
            case 27:
            case 5:
              t = e.child.stateNode;
              break;
            case 1:
              t = e.child.stateNode;
          }
          try {
            Zs(l, t);
          } catch (c) {
            cl(e, e.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && eo(e);
      case 26:
      case 5:
        $t(l, e), t === null && a & 4 && lo(e), a & 512 && iu(e, e.return);
        break;
      case 12:
        $t(l, e);
        break;
      case 31:
        $t(l, e), a & 4 && fo(l, e);
        break;
      case 13:
        $t(l, e), a & 4 && io(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = Em.bind(null, e), Lm(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Jt, !a) {
          t = t !== null && t.memoizedState !== null || Al, u = Jt;
          var n = Al;
          Jt = a, (Al = t) && !n ? Ft(l, e, (e.subtreeFlags & 8772) !== 0) : $t(l, e), Jt = u, Al = n;
        }
        break;
      case 30:
        break;
      default:
        $t(l, e);
    }
  }
  function no(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, no(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && fc(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var vl = null, $l = false;
  function Wt(l, t, e) {
    for (e = e.child; e !== null; ) co(l, t, e), e = e.sibling;
  }
  function co(l, t, e) {
    if (et && typeof et.onCommitFiberUnmount == "function") try {
      et.onCommitFiberUnmount(Ra, e);
    } catch {
    }
    switch (e.tag) {
      case 26:
        Al || Rt(e, t), Wt(l, t, e), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Al || Rt(e, t);
        var a = vl, u = $l;
        Se(e.type) && (vl = e.stateNode, $l = false), Wt(l, t, e), gu(e.stateNode), vl = a, $l = u;
        break;
      case 5:
        Al || Rt(e, t);
      case 6:
        if (a = vl, u = $l, vl = null, Wt(l, t, e), vl = a, $l = u, vl !== null) if ($l) try {
          (vl.nodeType === 9 ? vl.body : vl.nodeName === "HTML" ? vl.ownerDocument.body : vl).removeChild(e.stateNode);
        } catch (n) {
          cl(e, t, n);
        }
        else try {
          vl.removeChild(e.stateNode);
        } catch (n) {
          cl(e, t, n);
        }
        break;
      case 18:
        vl !== null && ($l ? (l = vl, Po(l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.stateNode), Ua(l)) : Po(vl, e.stateNode));
        break;
      case 4:
        a = vl, u = $l, vl = e.stateNode.containerInfo, $l = true, Wt(l, t, e), vl = a, $l = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        re(2, e, t), Al || re(4, e, t), Wt(l, t, e);
        break;
      case 1:
        Al || (Rt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && P0(e, t, a)), Wt(l, t, e);
        break;
      case 21:
        Wt(l, t, e);
        break;
      case 22:
        Al = (a = Al) || e.memoizedState !== null, Wt(l, t, e), Al = a;
        break;
      default:
        Wt(l, t, e);
    }
  }
  function fo(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Ua(l);
      } catch (e) {
        cl(t, t.return, e);
      }
    }
  }
  function io(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null)))) try {
      Ua(l);
    } catch (e) {
      cl(t, t.return, e);
    }
  }
  function vm(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new ao()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new ao()), t;
      default:
        throw Error(o(435, l.tag));
    }
  }
  function En(l, t) {
    var e = vm(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = Tm.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function Fl(l, t) {
    var e = t.deletions;
    if (e !== null) for (var a = 0; a < e.length; a++) {
      var u = e[a], n = l, c = t, f = c;
      l: for (; f !== null; ) {
        switch (f.tag) {
          case 27:
            if (Se(f.type)) {
              vl = f.stateNode, $l = false;
              break l;
            }
            break;
          case 5:
            vl = f.stateNode, $l = false;
            break l;
          case 3:
          case 4:
            vl = f.stateNode.containerInfo, $l = true;
            break l;
        }
        f = f.return;
      }
      if (vl === null) throw Error(o(160));
      co(n, c, u), vl = null, $l = false, n = u.alternate, n !== null && (n.return = null), u.return = null;
    }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) so(t, l), t = t.sibling;
  }
  var Mt = null;
  function so(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Fl(t, l), kl(l), a & 4 && (re(3, l, l.return), fu(3, l), re(5, l, l.return));
        break;
      case 1:
        Fl(t, l), kl(l), a & 512 && (Al || e === null || Rt(e, e.return)), a & 64 && Jt && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Mt;
        if (Fl(t, l), kl(l), a & 512 && (Al || e === null || Rt(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null) if (a === null) if (l.stateNode === null) {
            l: {
              a = l.type, e = l.memoizedProps, u = u.ownerDocument || u;
              t: switch (a) {
                case "title":
                  n = u.getElementsByTagName("title")[0], (!n || n[ja] || n[jl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(n, u.querySelector("head > title"))), Gl(n, a, e), n[jl] = l, Nl(n), a = n;
                  break l;
                case "link":
                  var c = od("link", "href", u).get(a + (e.href || ""));
                  if (c) {
                    for (var f = 0; f < c.length; f++) if (n = c[f], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                      c.splice(f, 1);
                      break t;
                    }
                  }
                  n = u.createElement(a), Gl(n, a, e), u.head.appendChild(n);
                  break;
                case "meta":
                  if (c = od("meta", "content", u).get(a + (e.content || ""))) {
                    for (f = 0; f < c.length; f++) if (n = c[f], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                      c.splice(f, 1);
                      break t;
                    }
                  }
                  n = u.createElement(a), Gl(n, a, e), u.head.appendChild(n);
                  break;
                default:
                  throw Error(o(468, a));
              }
              n[jl] = l, Nl(n), a = n;
            }
            l.stateNode = a;
          } else dd(u, l.type, l.stateNode);
          else l.stateNode = sd(u, a, l.memoizedProps);
          else n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? dd(u, l.type, l.stateNode) : sd(u, a, l.memoizedProps)) : a === null && l.stateNode !== null && Uf(l, l.memoizedProps, e.memoizedProps);
        }
        break;
      case 27:
        Fl(t, l), kl(l), a & 512 && (Al || e === null || Rt(e, e.return)), e !== null && a & 4 && Uf(l, l.memoizedProps, e.memoizedProps);
        break;
      case 5:
        if (Fl(t, l), kl(l), a & 512 && (Al || e === null || Rt(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            Ie(u, "");
          } catch (R) {
            cl(l, l.return, R);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, Uf(l, u, e !== null ? e.memoizedProps : u)), a & 1024 && (Rf = true);
        break;
      case 6:
        if (Fl(t, l), kl(l), a & 4) {
          if (l.stateNode === null) throw Error(o(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (R) {
            cl(l, l.return, R);
          }
        }
        break;
      case 3:
        if (Gn = null, u = Mt, Mt = Bn(t.containerInfo), Fl(t, l), Mt = u, kl(l), a & 4 && e !== null && e.memoizedState.isDehydrated) try {
          Ua(t.containerInfo);
        } catch (R) {
          cl(l, l.return, R);
        }
        Rf && (Rf = false, oo(l));
        break;
      case 4:
        a = Mt, Mt = Bn(l.stateNode.containerInfo), Fl(t, l), kl(l), Mt = a;
        break;
      case 12:
        Fl(t, l), kl(l);
        break;
      case 31:
        Fl(t, l), kl(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, En(l, a)));
        break;
      case 13:
        Fl(t, l), kl(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (An = tt()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, En(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var i = e !== null && e.memoizedState !== null, v = Jt, _ = Al;
        if (Jt = v || u, Al = _ || i, Fl(t, l), Al = _, Jt = v, kl(l), a & 8192) l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || i || Jt || Al || Ze(l)), e = null, t = l; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (e === null) {
              i = e = t;
              try {
                if (n = i.stateNode, u) c = n.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                else {
                  f = i.stateNode;
                  var A = i.memoizedProps.style, h = A != null && A.hasOwnProperty("display") ? A.display : null;
                  f.style.display = h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                }
              } catch (R) {
                cl(i, i.return, R);
              }
            }
          } else if (t.tag === 6) {
            if (e === null) {
              i = t;
              try {
                i.stateNode.nodeValue = u ? "" : i.memoizedProps;
              } catch (R) {
                cl(i, i.return, R);
              }
            }
          } else if (t.tag === 18) {
            if (e === null) {
              i = t;
              try {
                var b = i.stateNode;
                u ? ld(b, true) : ld(i.stateNode, false);
              } catch (R) {
                cl(i, i.return, R);
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
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, En(l, e))));
        break;
      case 19:
        Fl(t, l), kl(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, En(l, a)));
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
        for (var e, a = l.return; a !== null; ) {
          if (to(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = Nf(l);
            pn(l, n, u);
            break;
          case 5:
            var c = e.stateNode;
            e.flags & 32 && (Ie(c, ""), e.flags &= -33);
            var f = Nf(l);
            pn(l, f, c);
            break;
          case 3:
          case 4:
            var i = e.stateNode.containerInfo, v = Nf(l);
            xf(l, v, i);
            break;
          default:
            throw Error(o(161));
        }
      } catch (_) {
        cl(l, l.return, _);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function oo(l) {
    if (l.subtreeFlags & 1024) for (l = l.child; l !== null; ) {
      var t = l;
      oo(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
  }
  function $t(l, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) uo(l, t.alternate, t), t = t.sibling;
  }
  function Ze(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          re(4, t, t.return), Ze(t);
          break;
        case 1:
          Rt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && P0(t, t.return, e), Ze(t);
          break;
        case 27:
          gu(t.stateNode);
        case 26:
        case 5:
          Rt(t, t.return), Ze(t);
          break;
        case 22:
          t.memoizedState === null && Ze(t);
          break;
        case 30:
          Ze(t);
          break;
        default:
          Ze(t);
      }
      l = l.sibling;
    }
  }
  function Ft(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, u = l, n = t, c = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Ft(u, n, e), fu(4, n);
          break;
        case 1:
          if (Ft(u, n, e), a = n, u = a.stateNode, typeof u.componentDidMount == "function") try {
            u.componentDidMount();
          } catch (v) {
            cl(a, a.return, v);
          }
          if (a = n, u = a.updateQueue, u !== null) {
            var f = a.stateNode;
            try {
              var i = u.shared.hiddenCallbacks;
              if (i !== null) for (u.shared.hiddenCallbacks = null, u = 0; u < i.length; u++) Qs(i[u], f);
            } catch (v) {
              cl(a, a.return, v);
            }
          }
          e && c & 64 && I0(n), iu(n, n.return);
          break;
        case 27:
          eo(n);
        case 26:
        case 5:
          Ft(u, n, e), e && a === null && c & 4 && lo(n), iu(n, n.return);
          break;
        case 12:
          Ft(u, n, e);
          break;
        case 31:
          Ft(u, n, e), e && c & 4 && fo(u, n);
          break;
        case 13:
          Ft(u, n, e), e && c & 4 && io(u, n);
          break;
        case 22:
          n.memoizedState === null && Ft(u, n, e), iu(n, n.return);
          break;
        case 30:
          break;
        default:
          Ft(u, n, e);
      }
      t = t.sibling;
    }
  }
  function Hf(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && Wa(e));
  }
  function Cf(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Wa(l));
  }
  function Dt(l, t, e, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) ro(l, t, e, a), t = t.sibling;
  }
  function ro(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Dt(l, t, e, a), u & 2048 && fu(9, t);
        break;
      case 1:
        Dt(l, t, e, a);
        break;
      case 3:
        Dt(l, t, e, a), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Wa(l)));
        break;
      case 12:
        if (u & 2048) {
          Dt(l, t, e, a), l = t.stateNode;
          try {
            var n = t.memoizedProps, c = n.id, f = n.onPostCommit;
            typeof f == "function" && f(c, t.alternate === null ? "mount" : "update", l.passiveEffectDuration, -0);
          } catch (i) {
            cl(t, t.return, i);
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
        n = t.stateNode, c = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Dt(l, t, e, a) : su(l, t) : n._visibility & 2 ? Dt(l, t, e, a) : (n._visibility |= 2, ba(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || false)), u & 2048 && Hf(c, t);
        break;
      case 24:
        Dt(l, t, e, a), u & 2048 && Cf(t.alternate, t);
        break;
      default:
        Dt(l, t, e, a);
    }
  }
  function ba(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
      var n = l, c = t, f = e, i = a, v = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          ba(n, c, f, i, u), fu(8, c);
          break;
        case 23:
          break;
        case 22:
          var _ = c.stateNode;
          c.memoizedState !== null ? _._visibility & 2 ? ba(n, c, f, i, u) : su(n, c) : (_._visibility |= 2, ba(n, c, f, i, u)), u && v & 2048 && Hf(c.alternate, c);
          break;
        case 24:
          ba(n, c, f, i, u), u && v & 2048 && Cf(c.alternate, c);
          break;
        default:
          ba(n, c, f, i, u);
      }
      t = t.sibling;
    }
  }
  function su(l, t) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
      var e = l, a = t, u = a.flags;
      switch (a.tag) {
        case 22:
          su(e, a), u & 2048 && Hf(a.alternate, a);
          break;
        case 24:
          su(e, a), u & 2048 && Cf(a.alternate, a);
          break;
        default:
          su(e, a);
      }
      t = t.sibling;
    }
  }
  var ou = 8192;
  function Sa(l, t, e) {
    if (l.subtreeFlags & ou) for (l = l.child; l !== null; ) mo(l, t, e), l = l.sibling;
  }
  function mo(l, t, e) {
    switch (l.tag) {
      case 26:
        Sa(l, t, e), l.flags & ou && l.memoizedState !== null && ty(e, Mt, l.memoizedState, l.memoizedProps);
        break;
      case 5:
        Sa(l, t, e);
        break;
      case 3:
      case 4:
        var a = Mt;
        Mt = Bn(l.stateNode.containerInfo), Sa(l, t, e), Mt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = ou, ou = 16777216, Sa(l, t, e), ou = a) : Sa(l, t, e));
        break;
      default:
        Sa(l, t, e);
    }
  }
  function yo(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function du(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) for (var e = 0; e < t.length; e++) {
        var a = t[e];
        xl = a, ho(a, l);
      }
      yo(l);
    }
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) vo(l), l = l.sibling;
  }
  function vo(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        du(l), l.flags & 2048 && re(9, l, l.return);
        break;
      case 3:
        du(l);
        break;
      case 12:
        du(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Tn(l)) : du(l);
        break;
      default:
        du(l);
    }
  }
  function Tn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) for (var e = 0; e < t.length; e++) {
        var a = t[e];
        xl = a, ho(a, l);
      }
      yo(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          re(8, t, t.return), Tn(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, Tn(t));
          break;
        default:
          Tn(t);
      }
      l = l.sibling;
    }
  }
  function ho(l, t) {
    for (; xl !== null; ) {
      var e = xl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          re(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Wa(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, xl = a;
      else l: for (e = l; xl !== null; ) {
        a = xl;
        var u = a.sibling, n = a.return;
        if (no(a), a === e) {
          xl = null;
          break l;
        }
        if (u !== null) {
          u.return = n, xl = u;
          break l;
        }
        xl = n;
      }
    }
  }
  var hm = { getCacheForType: function(l) {
    var t = Bl(pl), e = t.data.get(l);
    return e === void 0 && (e = l(), t.data.set(l, e)), e;
  }, cacheSignal: function() {
    return Bl(pl).controller.signal;
  } }, gm = typeof WeakMap == "function" ? WeakMap : Map, al = 0, dl = null, W = null, k = 0, nl = 0, it = null, me = false, _a = false, jf = false, kt = 0, bl = 0, ye = 0, Le = 0, qf = 0, st = 0, za = 0, ru = null, Il = null, Bf = false, An = 0, go = 0, On = 1 / 0, Mn = null, ve = null, Ol = 0, he = null, pa = null, It = 0, Yf = 0, Gf = null, bo = null, mu = 0, Xf = null;
  function ot() {
    return (al & 2) !== 0 && k !== 0 ? k & -k : z.T !== null ? wf() : Hi();
  }
  function So() {
    if (st === 0) if ((k & 536870912) === 0 || P) {
      var l = Cu;
      Cu <<= 1, (Cu & 3932160) === 0 && (Cu = 262144), st = l;
    } else st = 536870912;
    return l = ct.current, l !== null && (l.flags |= 32), st;
  }
  function Pl(l, t, e) {
    (l === dl && (nl === 2 || nl === 9) || l.cancelPendingCommit !== null) && (Ea(l, 0), ge(l, k, st, false)), Ca(l, e), ((al & 2) === 0 || l !== dl) && (l === dl && ((al & 2) === 0 && (Le |= e), bl === 4 && ge(l, k, st, false)), Ht(l));
  }
  function _o(l, t, e) {
    if ((al & 6) !== 0) throw Error(o(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Ha(l, t), u = a ? _m(l, t) : Zf(l, t, true), n = a;
    do {
      if (u === 0) {
        _a && !a && ge(l, t, 0, false);
        break;
      } else {
        if (e = l.current.alternate, n && !bm(e)) {
          u = Zf(l, t, false), n = false;
          continue;
        }
        if (u === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n) var c = 0;
          else c = l.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            t = c;
            l: {
              var f = l;
              u = ru;
              var i = f.current.memoizedState.isDehydrated;
              if (i && (Ea(f, c).flags |= 256), c = Zf(f, c, false), c !== 2) {
                if (jf && !i) {
                  f.errorRecoveryDisabledLanes |= n, Le |= n, u = 4;
                  break l;
                }
                n = Il, Il = u, n !== null && (Il === null ? Il = n : Il.push.apply(Il, n));
              }
              u = c;
            }
            if (n = false, u !== 2) continue;
          }
        }
        if (u === 1) {
          Ea(l, 0), ge(l, t, 0, true);
          break;
        }
        l: {
          switch (a = l, n = u, n) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ge(a, t, st, !me);
              break l;
            case 2:
              Il = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (u = An + 300 - tt(), 10 < u)) {
            if (ge(a, t, st, !me), qu(a, 0, true) !== 0) break l;
            It = t, a.timeoutHandle = ko(zo.bind(null, a, e, Il, Mn, Bf, t, st, Le, za, me, n, "Throttled", -0, 0), u);
            break l;
          }
          zo(a, e, Il, Mn, Bf, t, st, Le, za, me, n, null, -0, 0);
        }
      }
      break;
    } while (true);
    Ht(l);
  }
  function zo(l, t, e, a, u, n, c, f, i, v, _, A, h, b) {
    if (l.timeoutHandle = -1, A = t.subtreeFlags, A & 8192 || (A & 16785408) === 16785408) {
      A = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: Bt }, mo(t, n, A);
      var R = (n & 62914560) === n ? An - tt() : (n & 4194048) === n ? go - tt() : 0;
      if (R = ey(A, R), R !== null) {
        It = n, l.cancelPendingCommit = R(Uo.bind(null, l, t, n, e, a, u, c, f, i, _, A, null, h, b)), ge(l, n, c, !v);
        return;
      }
    }
    Uo(l, t, n, e, a, u, c, f, i);
  }
  function bm(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null))) for (var a = 0; a < e.length; a++) {
        var u = e[a], n = u.getSnapshot;
        u = u.value;
        try {
          if (!ut(n(), u)) return false;
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
    t &= ~qf, t &= ~Le, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - at(u), c = 1 << n;
      a[n] = -1, u &= ~c;
    }
    e !== 0 && Ni(l, e, t);
  }
  function Dn() {
    return (al & 6) === 0 ? (yu(0), false) : true;
  }
  function Qf() {
    if (W !== null) {
      if (nl === 0) var l = W.return;
      else l = W, Qt = Ce = null, ef(l), ma = null, Fa = 0, l = W;
      for (; l !== null; ) k0(l.alternate, l), l = l.return;
      W = null;
    }
  }
  function Ea(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, Ym(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), It = 0, Qf(), dl = l, W = e = Gt(l.current, null), k = t, nl = 0, it = null, me = false, _a = Ha(l, t), jf = false, za = st = qf = Le = ye = bl = 0, Il = ru = null, Bf = false, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0) for (l = l.entanglements, a &= t; 0 < a; ) {
      var u = 31 - at(a), n = 1 << u;
      t |= l[u], a &= ~n;
    }
    return kt = t, Wu(), e;
  }
  function po(l, t) {
    V = null, z.H = uu, t === ra || t === en ? (t = Bs(), nl = 3) : t === Vc ? (t = Bs(), nl = 4) : nl = t === Sf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, it = t, W === null && (bl = 1, gn(l, gt(t, l.current)));
  }
  function Eo() {
    var l = ct.current;
    return l === null ? true : (k & 4194048) === k ? zt === null : (k & 62914560) === k || (k & 536870912) !== 0 ? l === zt : false;
  }
  function To() {
    var l = z.H;
    return z.H = uu, l === null ? uu : l;
  }
  function Ao() {
    var l = z.A;
    return z.A = hm, l;
  }
  function Un() {
    bl = 4, me || (k & 4194048) !== k && ct.current !== null || (_a = true), (ye & 134217727) === 0 && (Le & 134217727) === 0 || dl === null || ge(dl, k, st, false);
  }
  function Zf(l, t, e) {
    var a = al;
    al |= 2;
    var u = To(), n = Ao();
    (dl !== l || k !== t) && (Mn = null, Ea(l, t)), t = false;
    var c = bl;
    l: do
      try {
        if (nl !== 0 && W !== null) {
          var f = W, i = it;
          switch (nl) {
            case 8:
              Qf(), c = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              ct.current === null && (t = true);
              var v = nl;
              if (nl = 0, it = null, Ta(l, f, i, v), e && _a) {
                c = 0;
                break l;
              }
              break;
            default:
              v = nl, nl = 0, it = null, Ta(l, f, i, v);
          }
        }
        Sm(), c = bl;
        break;
      } catch (_) {
        po(l, _);
      }
    while (true);
    return t && l.shellSuspendCounter++, Qt = Ce = null, al = a, z.H = u, z.A = n, W === null && (dl = null, k = 0, Wu()), c;
  }
  function Sm() {
    for (; W !== null; ) Oo(W);
  }
  function _m(l, t) {
    var e = al;
    al |= 2;
    var a = To(), u = Ao();
    dl !== l || k !== t ? (Mn = null, On = tt() + 500, Ea(l, t)) : _a = Ha(l, t);
    l: do
      try {
        if (nl !== 0 && W !== null) {
          t = W;
          var n = it;
          t: switch (nl) {
            case 1:
              nl = 0, it = null, Ta(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (js(n)) {
                nl = 0, it = null, Mo(t);
                break;
              }
              t = function() {
                nl !== 2 && nl !== 9 || dl !== l || (nl = 7), Ht(l);
              }, n.then(t, t);
              break l;
            case 3:
              nl = 7;
              break l;
            case 4:
              nl = 5;
              break l;
            case 7:
              js(n) ? (nl = 0, it = null, Mo(t)) : (nl = 0, it = null, Ta(l, t, n, 7));
              break;
            case 5:
              var c = null;
              switch (W.tag) {
                case 26:
                  c = W.memoizedState;
                case 5:
                case 27:
                  var f = W;
                  if (c ? rd(c) : f.stateNode.complete) {
                    nl = 0, it = null;
                    var i = f.sibling;
                    if (i !== null) W = i;
                    else {
                      var v = f.return;
                      v !== null ? (W = v, Nn(v)) : W = null;
                    }
                    break t;
                  }
              }
              nl = 0, it = null, Ta(l, t, n, 5);
              break;
            case 6:
              nl = 0, it = null, Ta(l, t, n, 6);
              break;
            case 8:
              Qf(), bl = 6;
              break l;
            default:
              throw Error(o(462));
          }
        }
        zm();
        break;
      } catch (_) {
        po(l, _);
      }
    while (true);
    return Qt = Ce = null, z.H = a, z.A = u, al = e, W !== null ? 0 : (dl = null, k = 0, Wu(), bl);
  }
  function zm() {
    for (; W !== null && !Vd(); ) Oo(W);
  }
  function Oo(l) {
    var t = $0(l.alternate, l, kt);
    l.memoizedProps = l.pendingProps, t === null ? Nn(l) : W = t;
  }
  function Mo(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = L0(e, t, t.pendingProps, t.type, void 0, k);
        break;
      case 11:
        t = L0(e, t, t.pendingProps, t.type.render, t.ref, k);
        break;
      case 5:
        ef(t);
      default:
        k0(e, t), t = W = Ts(t, kt), t = $0(e, t, kt);
    }
    l.memoizedProps = l.pendingProps, t === null ? Nn(l) : W = t;
  }
  function Ta(l, t, e, a) {
    Qt = Ce = null, ef(t), ma = null, Fa = 0;
    var u = t.return;
    try {
      if (sm(l, u, t, e, k)) {
        bl = 1, gn(l, gt(e, l.current)), W = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw W = u, n;
      bl = 1, gn(l, gt(e, l.current)), W = null;
      return;
    }
    t.flags & 32768 ? (P || a === 1 ? l = true : _a || (k & 536870912) !== 0 ? l = false : (me = l = true, (a === 2 || a === 9 || a === 3 || a === 6) && (a = ct.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Do(t, l)) : Nn(t);
  }
  function Nn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Do(t, me);
        return;
      }
      l = t.return;
      var e = rm(t.alternate, t, kt);
      if (e !== null) {
        W = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        W = t;
        return;
      }
      W = t = l;
    } while (t !== null);
    bl === 0 && (bl = 5);
  }
  function Do(l, t) {
    do {
      var e = mm(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, W = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        W = l;
        return;
      }
      W = l = e;
    } while (l !== null);
    bl = 6, W = null;
  }
  function Uo(l, t, e, a, u, n, c, f, i) {
    l.cancelPendingCommit = null;
    do
      xn();
    while (Ol !== 0);
    if ((al & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === l.current) throw Error(o(177));
      if (n = t.lanes | t.childLanes, n |= Uc, lr(l, e, n, c, f, i), l === dl && (W = dl = null, k = 0), pa = t, he = l, It = e, Yf = n, Gf = u, bo = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Am(Ru, function() {
        return Co(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = z.T, z.T = null, u = U.p, U.p = 2, c = al, al |= 4;
        try {
          ym(l, t, e);
        } finally {
          al = c, U.p = u, z.T = a;
        }
      }
      Ol = 1, No(), xo(), Ro();
    }
  }
  function No() {
    if (Ol === 1) {
      Ol = 0;
      var l = he, t = pa, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = z.T, z.T = null;
        var a = U.p;
        U.p = 2;
        var u = al;
        al |= 4;
        try {
          so(t, l);
          var n = li, c = vs(l.containerInfo), f = n.focusedElem, i = n.selectionRange;
          if (c !== f && f && f.ownerDocument && ys(f.ownerDocument.documentElement, f)) {
            if (i !== null && Tc(f)) {
              var v = i.start, _ = i.end;
              if (_ === void 0 && (_ = v), "selectionStart" in f) f.selectionStart = v, f.selectionEnd = Math.min(_, f.value.length);
              else {
                var A = f.ownerDocument || document, h = A && A.defaultView || window;
                if (h.getSelection) {
                  var b = h.getSelection(), R = f.textContent.length, Y = Math.min(i.start, R), sl = i.end === void 0 ? Y : Math.min(i.end, R);
                  !b.extend && Y > sl && (c = sl, sl = Y, Y = c);
                  var m = ms(f, Y), d = ms(f, sl);
                  if (m && d && (b.rangeCount !== 1 || b.anchorNode !== m.node || b.anchorOffset !== m.offset || b.focusNode !== d.node || b.focusOffset !== d.offset)) {
                    var y = A.createRange();
                    y.setStart(m.node, m.offset), b.removeAllRanges(), Y > sl ? (b.addRange(y), b.extend(d.node, d.offset)) : (y.setEnd(d.node, d.offset), b.addRange(y));
                  }
                }
              }
            }
            for (A = [], b = f; b = b.parentNode; ) b.nodeType === 1 && A.push({ element: b, left: b.scrollLeft, top: b.scrollTop });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < A.length; f++) {
              var E = A[f];
              E.element.scrollLeft = E.left, E.element.scrollTop = E.top;
            }
          }
          Ln = !!Pf, li = Pf = null;
        } finally {
          al = u, U.p = a, z.T = e;
        }
      }
      l.current = t, Ol = 2;
    }
  }
  function xo() {
    if (Ol === 2) {
      Ol = 0;
      var l = he, t = pa, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = z.T, z.T = null;
        var a = U.p;
        U.p = 2;
        var u = al;
        al |= 4;
        try {
          uo(l, t.alternate, t);
        } finally {
          al = u, U.p = a, z.T = e;
        }
      }
      Ol = 3;
    }
  }
  function Ro() {
    if (Ol === 4 || Ol === 3) {
      Ol = 0, Kd();
      var l = he, t = pa, e = It, a = bo;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Ol = 5 : (Ol = 0, pa = he = null, Ho(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (ve = null), nc(e), t = t.stateNode, et && typeof et.onCommitFiberRoot == "function") try {
        et.onCommitFiberRoot(Ra, t, void 0, (t.current.flags & 128) === 128);
      } catch {
      }
      if (a !== null) {
        t = z.T, u = U.p, U.p = 2, z.T = null;
        try {
          for (var n = l.onRecoverableError, c = 0; c < a.length; c++) {
            var f = a[c];
            n(f.value, { componentStack: f.stack });
          }
        } finally {
          z.T = t, U.p = u;
        }
      }
      (It & 3) !== 0 && xn(), Ht(l), u = l.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? l === Xf ? mu++ : (mu = 0, Xf = l) : mu = 0, yu(0);
    }
  }
  function Ho(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Wa(t)));
  }
  function xn() {
    return No(), xo(), Ro(), Co();
  }
  function Co() {
    if (Ol !== 5) return false;
    var l = he, t = Yf;
    Yf = 0;
    var e = nc(It), a = z.T, u = U.p;
    try {
      U.p = 32 > e ? 32 : e, z.T = null, e = Gf, Gf = null;
      var n = he, c = It;
      if (Ol = 0, pa = he = null, It = 0, (al & 6) !== 0) throw Error(o(331));
      var f = al;
      if (al |= 4, vo(n.current), ro(n, n.current, c, e), al = f, yu(0, false), et && typeof et.onPostCommitFiberRoot == "function") try {
        et.onPostCommitFiberRoot(Ra, n);
      } catch {
      }
      return true;
    } finally {
      U.p = u, z.T = a, Ho(l, t);
    }
  }
  function jo(l, t, e) {
    t = gt(e, t), t = bf(l.stateNode, t, 2), l = se(l, t, 2), l !== null && (Ca(l, 2), Ht(l));
  }
  function cl(l, t, e) {
    if (l.tag === 3) jo(l, l, e);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        jo(t, l, e);
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ve === null || !ve.has(a))) {
          l = gt(e, l), e = j0(2), a = se(t, e, 2), a !== null && (q0(e, a, t, l), Ca(a, 2), Ht(a));
          break;
        }
      }
      t = t.return;
    }
  }
  function Lf(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new gm();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (jf = true, u.add(e), l = pm.bind(null, l, t, e), t.then(l, l));
  }
  function pm(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, dl === l && (k & e) === e && (bl === 4 || bl === 3 && (k & 62914560) === k && 300 > tt() - An ? (al & 2) === 0 && Ea(l, 0) : qf |= e, za === k && (za = 0)), Ht(l);
  }
  function qo(l, t) {
    t === 0 && (t = Ui()), l = xe(l, t), l !== null && (Ca(l, t), Ht(l));
  }
  function Em(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), qo(l, e);
  }
  function Tm(l, t) {
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
        throw Error(o(314));
    }
    a !== null && a.delete(t), qo(l, e);
  }
  function Am(l, t) {
    return tc(l, t);
  }
  var Rn = null, Aa = null, Vf = false, Hn = false, Kf = false, be = 0;
  function Ht(l) {
    l !== Aa && l.next === null && (Aa === null ? Rn = Aa = l : Aa = Aa.next = l), Hn = true, Vf || (Vf = true, Mm());
  }
  function yu(l, t) {
    if (!Kf && Hn) {
      Kf = true;
      do
        for (var e = false, a = Rn; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var c = a.suspendedLanes, f = a.pingedLanes;
              n = (1 << 31 - at(42 | l) + 1) - 1, n &= u & ~(c & ~f), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = true, Xo(a, n));
          } else n = k, n = qu(a, a === dl ? n : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (n & 3) === 0 || Ha(a, n) || (e = true, Xo(a, n));
          a = a.next;
        }
      while (e);
      Kf = false;
    }
  }
  function Om() {
    Bo();
  }
  function Bo() {
    Hn = Vf = false;
    var l = 0;
    be !== 0 && Bm() && (l = be);
    for (var t = tt(), e = null, a = Rn; a !== null; ) {
      var u = a.next, n = Yo(a, t);
      n === 0 ? (a.next = null, e === null ? Rn = u : e.next = u, u === null && (Aa = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (Hn = true)), a = u;
    }
    Ol !== 0 && Ol !== 5 || yu(l), be !== 0 && (be = 0);
  }
  function Yo(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var c = 31 - at(n), f = 1 << c, i = u[c];
      i === -1 ? ((f & e) === 0 || (f & a) !== 0) && (u[c] = Pd(f, t)) : i <= t && (l.expiredLanes |= f), n &= ~f;
    }
    if (t = dl, e = k, e = qu(l, l === t ? e : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a = l.callbackNode, e === 0 || l === t && (nl === 2 || nl === 9) || l.cancelPendingCommit !== null) return a !== null && a !== null && ec(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || Ha(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && ec(a), nc(e)) {
        case 2:
        case 8:
          e = Mi;
          break;
        case 32:
          e = Ru;
          break;
        case 268435456:
          e = Di;
          break;
        default:
          e = Ru;
      }
      return a = Go.bind(null, l), e = tc(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && ec(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Go(l, t) {
    if (Ol !== 0 && Ol !== 5) return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (xn() && l.callbackNode !== e) return null;
    var a = k;
    return a = qu(l, l === dl ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a === 0 ? null : (_o(l, a, t), Yo(l, tt()), l.callbackNode != null && l.callbackNode === e ? Go.bind(null, l) : null);
  }
  function Xo(l, t) {
    if (xn()) return null;
    _o(l, t, true);
  }
  function Mm() {
    Gm(function() {
      (al & 6) !== 0 ? tc(Oi, Om) : Bo();
    });
  }
  function wf() {
    if (be === 0) {
      var l = oa;
      l === 0 && (l = Hu, Hu <<= 1, (Hu & 261888) === 0 && (Hu = 256)), be = l;
    }
    return be;
  }
  function Qo(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Xu("" + l);
  }
  function Zo(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Dm(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Qo((u[Jl] || null).action), c = a.submitter;
      c && (t = (t = c[Jl] || null) ? Qo(t.formAction) : c.getAttribute("formAction"), t !== null && (n = t, c = null));
      var f = new Vu("action", "action", null, a, u);
      l.push({ event: f, listeners: [{ instance: null, listener: function() {
        if (a.defaultPrevented) {
          if (be !== 0) {
            var i = c ? Zo(u, c) : new FormData(u);
            rf(e, { pending: true, data: i, method: u.method, action: n }, null, i);
          }
        } else typeof n == "function" && (f.preventDefault(), i = c ? Zo(u, c) : new FormData(u), rf(e, { pending: true, data: i, method: u.method, action: n }, n, i));
      }, currentTarget: u }] });
    }
  }
  for (var Jf = 0; Jf < Dc.length; Jf++) {
    var Wf = Dc[Jf], Um = Wf.toLowerCase(), Nm = Wf[0].toUpperCase() + Wf.slice(1);
    Ot(Um, "on" + Nm);
  }
  Ot(bs, "onAnimationEnd"), Ot(Ss, "onAnimationIteration"), Ot(_s, "onAnimationStart"), Ot("dblclick", "onDoubleClick"), Ot("focusin", "onFocus"), Ot("focusout", "onBlur"), Ot(wr, "onTransitionRun"), Ot(Jr, "onTransitionStart"), Ot(Wr, "onTransitionCancel"), Ot(zs, "onTransitionEnd"), Fe("onMouseEnter", ["mouseout", "mouseover"]), Fe("onMouseLeave", ["mouseout", "mouseover"]), Fe("onPointerEnter", ["pointerout", "pointerover"]), Fe("onPointerLeave", ["pointerout", "pointerover"]), Me("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Me("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Me("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Me("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Me("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Me("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var vu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), xm = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(vu));
  function Lo(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t) for (var c = a.length - 1; 0 <= c; c--) {
          var f = a[c], i = f.instance, v = f.currentTarget;
          if (f = f.listener, i !== n && u.isPropagationStopped()) break l;
          n = f, u.currentTarget = v;
          try {
            n(u);
          } catch (_) {
            Ju(_);
          }
          u.currentTarget = null, n = i;
        }
        else for (c = 0; c < a.length; c++) {
          if (f = a[c], i = f.instance, v = f.currentTarget, f = f.listener, i !== n && u.isPropagationStopped()) break l;
          n = f, u.currentTarget = v;
          try {
            n(u);
          } catch (_) {
            Ju(_);
          }
          u.currentTarget = null, n = i;
        }
      }
    }
  }
  function $(l, t) {
    var e = t[cc];
    e === void 0 && (e = t[cc] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Vo(t, l, 2, false), e.add(a));
  }
  function $f(l, t, e) {
    var a = 0;
    t && (a |= 4), Vo(e, l, a, t);
  }
  var Cn = "_reactListening" + Math.random().toString(36).slice(2);
  function Ff(l) {
    if (!l[Cn]) {
      l[Cn] = true, qi.forEach(function(e) {
        e !== "selectionchange" && (xm.has(e) || $f(e, false, l), $f(e, true, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Cn] || (t[Cn] = true, $f("selectionchange", false, t));
    }
  }
  function Vo(l, t, e, a) {
    switch (Sd(t)) {
      case 2:
        var u = ny;
        break;
      case 8:
        u = cy;
        break;
      default:
        u = di;
    }
    e = u.bind(null, t, e, l), u = void 0, !vc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = true), a ? u !== void 0 ? l.addEventListener(t, e, { capture: true, passive: u }) : l.addEventListener(t, e, true) : u !== void 0 ? l.addEventListener(t, e, { passive: u }) : l.addEventListener(t, e, false);
  }
  function kf(l, t, e, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null) l: for (; ; ) {
      if (a === null) return;
      var c = a.tag;
      if (c === 3 || c === 4) {
        var f = a.stateNode.containerInfo;
        if (f === u) break;
        if (c === 4) for (c = a.return; c !== null; ) {
          var i = c.tag;
          if ((i === 3 || i === 4) && c.stateNode.containerInfo === u) return;
          c = c.return;
        }
        for (; f !== null; ) {
          if (c = Je(f), c === null) return;
          if (i = c.tag, i === 5 || i === 6 || i === 26 || i === 27) {
            a = n = c;
            continue l;
          }
          f = f.parentNode;
        }
      }
      a = a.return;
    }
    Wi(function() {
      var v = n, _ = mc(e), A = [];
      l: {
        var h = ps.get(l);
        if (h !== void 0) {
          var b = Vu, R = l;
          switch (l) {
            case "keypress":
              if (Zu(e) === 0) break l;
            case "keydown":
            case "keyup":
              b = Tr;
              break;
            case "focusin":
              R = "focus", b = Sc;
              break;
            case "focusout":
              R = "blur", b = Sc;
              break;
            case "beforeblur":
            case "afterblur":
              b = Sc;
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
              b = ki;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              b = rr;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              b = Mr;
              break;
            case bs:
            case Ss:
            case _s:
              b = vr;
              break;
            case zs:
              b = Ur;
              break;
            case "scroll":
            case "scrollend":
              b = or;
              break;
            case "wheel":
              b = xr;
              break;
            case "copy":
            case "cut":
            case "paste":
              b = gr;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              b = Pi;
              break;
            case "toggle":
            case "beforetoggle":
              b = Hr;
          }
          var Y = (t & 4) !== 0, sl = !Y && (l === "scroll" || l === "scrollend"), m = Y ? h !== null ? h + "Capture" : null : h;
          Y = [];
          for (var d = v, y; d !== null; ) {
            var E = d;
            if (y = E.stateNode, E = E.tag, E !== 5 && E !== 26 && E !== 27 || y === null || m === null || (E = Ba(d, m), E != null && Y.push(hu(d, E, y))), sl) break;
            d = d.return;
          }
          0 < Y.length && (h = new b(h, R, null, e, _), A.push({ event: h, listeners: Y }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (h = l === "mouseover" || l === "pointerover", b = l === "mouseout" || l === "pointerout", h && e !== rc && (R = e.relatedTarget || e.fromElement) && (Je(R) || R[we])) break l;
          if ((b || h) && (h = _.window === _ ? _ : (h = _.ownerDocument) ? h.defaultView || h.parentWindow : window, b ? (R = e.relatedTarget || e.toElement, b = v, R = R ? Je(R) : null, R !== null && (sl = H(R), Y = R.tag, R !== sl || Y !== 5 && Y !== 27 && Y !== 6) && (R = null)) : (b = null, R = v), b !== R)) {
            if (Y = ki, E = "onMouseLeave", m = "onMouseEnter", d = "mouse", (l === "pointerout" || l === "pointerover") && (Y = Pi, E = "onPointerLeave", m = "onPointerEnter", d = "pointer"), sl = b == null ? h : qa(b), y = R == null ? h : qa(R), h = new Y(E, d + "leave", b, e, _), h.target = sl, h.relatedTarget = y, E = null, Je(_) === v && (Y = new Y(m, d + "enter", R, e, _), Y.target = y, Y.relatedTarget = sl, E = Y), sl = E, b && R) t: {
              for (Y = Rm, m = b, d = R, y = 0, E = m; E; E = Y(E)) y++;
              E = 0;
              for (var q = d; q; q = Y(q)) E++;
              for (; 0 < y - E; ) m = Y(m), y--;
              for (; 0 < E - y; ) d = Y(d), E--;
              for (; y--; ) {
                if (m === d || d !== null && m === d.alternate) {
                  Y = m;
                  break t;
                }
                m = Y(m), d = Y(d);
              }
              Y = null;
            }
            else Y = null;
            b !== null && Ko(A, h, b, Y, false), R !== null && sl !== null && Ko(A, sl, R, Y, true);
          }
        }
        l: {
          if (h = v ? qa(v) : window, b = h.nodeName && h.nodeName.toLowerCase(), b === "select" || b === "input" && h.type === "file") var ll = fs;
          else if (ns(h)) if (is) ll = Lr;
          else {
            ll = Qr;
            var C = Xr;
          }
          else b = h.nodeName, !b || b.toLowerCase() !== "input" || h.type !== "checkbox" && h.type !== "radio" ? v && dc(v.elementType) && (ll = fs) : ll = Zr;
          if (ll && (ll = ll(l, v))) {
            cs(A, ll, e, _);
            break l;
          }
          C && C(l, h, v), l === "focusout" && v && h.type === "number" && v.memoizedProps.value != null && oc(h, "number", h.value);
        }
        switch (C = v ? qa(v) : window, l) {
          case "focusin":
            (ns(C) || C.contentEditable === "true") && (ea = C, Ac = v, Ka = null);
            break;
          case "focusout":
            Ka = Ac = ea = null;
            break;
          case "mousedown":
            Oc = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Oc = false, hs(A, e, _);
            break;
          case "selectionchange":
            if (Kr) break;
          case "keydown":
          case "keyup":
            hs(A, e, _);
        }
        var K;
        if (zc) l: {
          switch (l) {
            case "compositionstart":
              var I = "onCompositionStart";
              break l;
            case "compositionend":
              I = "onCompositionEnd";
              break l;
            case "compositionupdate":
              I = "onCompositionUpdate";
              break l;
          }
          I = void 0;
        }
        else ta ? as(l, e) && (I = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (I = "onCompositionStart");
        I && (ls && e.locale !== "ko" && (ta || I !== "onCompositionStart" ? I === "onCompositionEnd" && ta && (K = $i()) : (ee = _, hc = "value" in ee ? ee.value : ee.textContent, ta = true)), C = jn(v, I), 0 < C.length && (I = new Ii(I, l, null, e, _), A.push({ event: I, listeners: C }), K ? I.data = K : (K = us(e), K !== null && (I.data = K)))), (K = jr ? qr(l, e) : Br(l, e)) && (I = jn(v, "onBeforeInput"), 0 < I.length && (C = new Ii("onBeforeInput", "beforeinput", null, e, _), A.push({ event: C, listeners: I }), C.data = K)), Dm(A, l, v, e, _);
      }
      Lo(A, t);
    });
  }
  function hu(l, t, e) {
    return { instance: l, listener: t, currentTarget: e };
  }
  function jn(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = Ba(l, e), u != null && a.unshift(hu(l, u, n)), u = Ba(l, t), u != null && a.push(hu(l, u, n))), l.tag === 3) return a;
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
  function Ko(l, t, e, a, u) {
    for (var n = t._reactName, c = []; e !== null && e !== a; ) {
      var f = e, i = f.alternate, v = f.stateNode;
      if (f = f.tag, i !== null && i === a) break;
      f !== 5 && f !== 26 && f !== 27 || v === null || (i = v, u ? (v = Ba(e, n), v != null && c.unshift(hu(e, v, i))) : u || (v = Ba(e, n), v != null && c.push(hu(e, v, i)))), e = e.return;
    }
    c.length !== 0 && l.push({ event: t, listeners: c });
  }
  var Hm = /\r\n?/g, Cm = /\u0000|\uFFFD/g;
  function wo(l) {
    return (typeof l == "string" ? l : "" + l).replace(Hm, `
`).replace(Cm, "");
  }
  function Jo(l, t) {
    return t = wo(t), wo(l) === t;
  }
  function il(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Ie(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Ie(l, "" + a);
        break;
      case "className":
        Yu(l, "class", a);
        break;
      case "tabIndex":
        Yu(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Yu(l, e, a);
        break;
      case "style":
        wi(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          Yu(l, "data", a);
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
        a = Xu("" + a), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(e, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof n == "function" && (e === "formAction" ? (t !== "input" && il(l, t, "name", u.name, u, null), il(l, t, "formEncType", u.formEncType, u, null), il(l, t, "formMethod", u.formMethod, u, null), il(l, t, "formTarget", u.formTarget, u, null)) : (il(l, t, "encType", u.encType, u, null), il(l, t, "method", u.method, u, null), il(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = Xu("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = Bt);
        break;
      case "onScroll":
        a != null && $("scroll", l);
        break;
      case "onScrollEnd":
        a != null && $("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(o(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(o(60));
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
        e = Xu("" + a), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e);
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
        $("beforetoggle", l), $("toggle", l), Bu(l, "popover", a);
        break;
      case "xlinkActuate":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        qt(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        qt(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        qt(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Bu(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = ir.get(e) || e, Bu(l, e, a));
    }
  }
  function If(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        wi(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(o(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(o(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Ie(l, a) : (typeof a == "number" || typeof a == "bigint") && Ie(l, "" + a);
        break;
      case "onScroll":
        a != null && $("scroll", l);
        break;
      case "onScrollEnd":
        a != null && $("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Bt);
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
        if (!Bi.hasOwnProperty(e)) l: {
          if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[Jl] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
            typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
            break l;
          }
          e in l ? l[e] = a : a === true ? l.setAttribute(e, "") : Bu(l, e, a);
        }
    }
  }
  function Gl(l, t, e) {
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
              throw Error(o(137, t));
            default:
              il(l, t, n, c, e, null);
          }
        }
        u && il(l, t, "srcSet", e.srcSet, e, null), a && il(l, t, "src", e.src, e, null);
        return;
      case "input":
        $("invalid", l);
        var f = n = c = u = null, i = null, v = null;
        for (a in e) if (e.hasOwnProperty(a)) {
          var _ = e[a];
          if (_ != null) switch (a) {
            case "name":
              u = _;
              break;
            case "type":
              c = _;
              break;
            case "checked":
              i = _;
              break;
            case "defaultChecked":
              v = _;
              break;
            case "value":
              n = _;
              break;
            case "defaultValue":
              f = _;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (_ != null) throw Error(o(137, t));
              break;
            default:
              il(l, t, a, _, e, null);
          }
        }
        Zi(l, n, f, i, v, c, u, false);
        return;
      case "select":
        $("invalid", l), a = c = n = null;
        for (u in e) if (e.hasOwnProperty(u) && (f = e[u], f != null)) switch (u) {
          case "value":
            n = f;
            break;
          case "defaultValue":
            c = f;
            break;
          case "multiple":
            a = f;
          default:
            il(l, t, u, f, e, null);
        }
        t = n, e = c, l.multiple = !!a, t != null ? ke(l, !!a, t, false) : e != null && ke(l, !!a, e, true);
        return;
      case "textarea":
        $("invalid", l), n = u = a = null;
        for (c in e) if (e.hasOwnProperty(c) && (f = e[c], f != null)) switch (c) {
          case "value":
            a = f;
            break;
          case "defaultValue":
            u = f;
            break;
          case "children":
            n = f;
            break;
          case "dangerouslySetInnerHTML":
            if (f != null) throw Error(o(91));
            break;
          default:
            il(l, t, c, f, e, null);
        }
        Vi(l, a, u, n);
        return;
      case "option":
        for (i in e) if (e.hasOwnProperty(i) && (a = e[i], a != null)) switch (i) {
          case "selected":
            l.selected = a && typeof a != "function" && typeof a != "symbol";
            break;
          default:
            il(l, t, i, a, e, null);
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
        for (a = 0; a < vu.length; a++) $(vu[a], l);
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
            throw Error(o(137, t));
          default:
            il(l, t, v, a, e, null);
        }
        return;
      default:
        if (dc(t)) {
          for (_ in e) e.hasOwnProperty(_) && (a = e[_], a !== void 0 && If(l, t, _, a, e, void 0));
          return;
        }
    }
    for (f in e) e.hasOwnProperty(f) && (a = e[f], a != null && il(l, t, f, a, e, null));
  }
  function jm(l, t, e, a) {
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
        var u = null, n = null, c = null, f = null, i = null, v = null, _ = null;
        for (b in e) {
          var A = e[b];
          if (e.hasOwnProperty(b) && A != null) switch (b) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = A;
            default:
              a.hasOwnProperty(b) || il(l, t, b, null, a, A);
          }
        }
        for (var h in a) {
          var b = a[h];
          if (A = e[h], a.hasOwnProperty(h) && (b != null || A != null)) switch (h) {
            case "type":
              n = b;
              break;
            case "name":
              u = b;
              break;
            case "checked":
              v = b;
              break;
            case "defaultChecked":
              _ = b;
              break;
            case "value":
              c = b;
              break;
            case "defaultValue":
              f = b;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (b != null) throw Error(o(137, t));
              break;
            default:
              b !== A && il(l, t, h, b, a, A);
          }
        }
        sc(l, c, f, i, v, _, n, u);
        return;
      case "select":
        b = c = f = h = null;
        for (n in e) if (i = e[n], e.hasOwnProperty(n) && i != null) switch (n) {
          case "value":
            break;
          case "multiple":
            b = i;
          default:
            a.hasOwnProperty(n) || il(l, t, n, null, a, i);
        }
        for (u in a) if (n = a[u], i = e[u], a.hasOwnProperty(u) && (n != null || i != null)) switch (u) {
          case "value":
            h = n;
            break;
          case "defaultValue":
            f = n;
            break;
          case "multiple":
            c = n;
          default:
            n !== i && il(l, t, u, n, a, i);
        }
        t = f, e = c, a = b, h != null ? ke(l, !!e, h, false) : !!a != !!e && (t != null ? ke(l, !!e, t, true) : ke(l, !!e, e ? [] : "", false));
        return;
      case "textarea":
        b = h = null;
        for (f in e) if (u = e[f], e.hasOwnProperty(f) && u != null && !a.hasOwnProperty(f)) switch (f) {
          case "value":
            break;
          case "children":
            break;
          default:
            il(l, t, f, null, a, u);
        }
        for (c in a) if (u = a[c], n = e[c], a.hasOwnProperty(c) && (u != null || n != null)) switch (c) {
          case "value":
            h = u;
            break;
          case "defaultValue":
            b = u;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (u != null) throw Error(o(91));
            break;
          default:
            u !== n && il(l, t, c, u, a, n);
        }
        Li(l, h, b);
        return;
      case "option":
        for (var R in e) if (h = e[R], e.hasOwnProperty(R) && h != null && !a.hasOwnProperty(R)) switch (R) {
          case "selected":
            l.selected = false;
            break;
          default:
            il(l, t, R, null, a, h);
        }
        for (i in a) if (h = a[i], b = e[i], a.hasOwnProperty(i) && h !== b && (h != null || b != null)) switch (i) {
          case "selected":
            l.selected = h && typeof h != "function" && typeof h != "symbol";
            break;
          default:
            il(l, t, i, h, a, b);
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
        for (var Y in e) h = e[Y], e.hasOwnProperty(Y) && h != null && !a.hasOwnProperty(Y) && il(l, t, Y, null, a, h);
        for (v in a) if (h = a[v], b = e[v], a.hasOwnProperty(v) && h !== b && (h != null || b != null)) switch (v) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (h != null) throw Error(o(137, t));
            break;
          default:
            il(l, t, v, h, a, b);
        }
        return;
      default:
        if (dc(t)) {
          for (var sl in e) h = e[sl], e.hasOwnProperty(sl) && h !== void 0 && !a.hasOwnProperty(sl) && If(l, t, sl, void 0, a, h);
          for (_ in a) h = a[_], b = e[_], !a.hasOwnProperty(_) || h === b || h === void 0 && b === void 0 || If(l, t, _, h, a, b);
          return;
        }
    }
    for (var m in e) h = e[m], e.hasOwnProperty(m) && h != null && !a.hasOwnProperty(m) && il(l, t, m, null, a, h);
    for (A in a) h = a[A], b = e[A], !a.hasOwnProperty(A) || h === b || h == null && b == null || il(l, t, A, h, a, b);
  }
  function Wo(l) {
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
  function qm() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, c = u.initiatorType, f = u.duration;
        if (n && f && Wo(c)) {
          for (c = 0, f = u.responseEnd, a += 1; a < e.length; a++) {
            var i = e[a], v = i.startTime;
            if (v > f) break;
            var _ = i.transferSize, A = i.initiatorType;
            _ && Wo(A) && (i = i.responseEnd, c += _ * (i < f ? 1 : (f - v) / (i - v)));
          }
          if (--a, t += 8 * (n + c) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Pf = null, li = null;
  function qn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function $o(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Fo(l, t) {
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
  function ti(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ei = null;
  function Bm() {
    var l = window.event;
    return l && l.type === "popstate" ? l === ei ? false : (ei = l, true) : (ei = null, false);
  }
  var ko = typeof setTimeout == "function" ? setTimeout : void 0, Ym = typeof clearTimeout == "function" ? clearTimeout : void 0, Io = typeof Promise == "function" ? Promise : void 0, Gm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Io < "u" ? function(l) {
    return Io.resolve(null).then(l).catch(Xm);
  } : ko;
  function Xm(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Se(l) {
    return l === "head";
  }
  function Po(l, t) {
    var e = t, a = 0;
    do {
      var u = e.nextSibling;
      if (l.removeChild(e), u && u.nodeType === 8) if (e = u.data, e === "/$" || e === "/&") {
        if (a === 0) {
          l.removeChild(u), Ua(t);
          return;
        }
        a--;
      } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&") a++;
      else if (e === "html") gu(l.ownerDocument.documentElement);
      else if (e === "head") {
        e = l.ownerDocument.head, gu(e);
        for (var n = e.firstChild; n; ) {
          var c = n.nextSibling, f = n.nodeName;
          n[ja] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = c;
        }
      } else e === "body" && gu(l.ownerDocument.body);
      e = u;
    } while (e);
    Ua(t);
  }
  function ld(l, t) {
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
  function ai(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ai(e), fc(e);
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
  function Qm(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (a) {
        if (!l[ja]) switch (t) {
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
      if (l = pt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Zm(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = pt(l.nextSibling), l === null)) return null;
    return l;
  }
  function td(l, t) {
    for (; l.nodeType !== 8; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = pt(l.nextSibling), l === null)) return null;
    return l;
  }
  function ui(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function ni(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Lm(l, t) {
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
  function pt(l) {
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
  var ci = null;
  function ed(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0) return pt(l.nextSibling);
          t--;
        } else e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function ad(l) {
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
  function ud(l, t, e) {
    switch (t = qn(e), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(o(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(o(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(o(454));
        return l;
      default:
        throw Error(o(451));
    }
  }
  function gu(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    fc(l);
  }
  var Et = /* @__PURE__ */ new Map(), nd = /* @__PURE__ */ new Set();
  function Bn(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Pt = U.d;
  U.d = { f: Vm, r: Km, D: wm, C: Jm, L: Wm, m: $m, X: km, S: Fm, M: Im };
  function Vm() {
    var l = Pt.f(), t = Dn();
    return l || t;
  }
  function Km(l) {
    var t = We(l);
    t !== null && t.tag === 5 && t.type === "form" ? z0(t) : Pt.r(l);
  }
  var Oa = typeof document > "u" ? null : document;
  function cd(l, t, e) {
    var a = Oa;
    if (a && typeof t == "string" && t) {
      var u = vt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), nd.has(u) || (nd.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), Gl(t, "link", l), Nl(t), a.head.appendChild(t)));
    }
  }
  function wm(l) {
    Pt.D(l), cd("dns-prefetch", l, null);
  }
  function Jm(l, t) {
    Pt.C(l, t), cd("preconnect", l, t);
  }
  function Wm(l, t, e) {
    Pt.L(l, t, e);
    var a = Oa;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + vt(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + vt(e.imageSrcSet) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + vt(e.imageSizes) + '"]')) : u += '[href="' + vt(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = Ma(l);
          break;
        case "script":
          n = Da(l);
      }
      Et.has(n) || (l = B({ rel: "preload", href: t === "image" && e && e.imageSrcSet ? void 0 : l, as: t }, e), Et.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(bu(n)) || t === "script" && a.querySelector(Su(n)) || (t = a.createElement("link"), Gl(t, "link", l), Nl(t), a.head.appendChild(t)));
    }
  }
  function $m(l, t) {
    Pt.m(l, t);
    var e = Oa;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + vt(a) + '"][href="' + vt(l) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Da(l);
      }
      if (!Et.has(n) && (l = B({ rel: "modulepreload", href: l }, t), Et.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Su(n))) return;
        }
        a = e.createElement("link"), Gl(a, "link", l), Nl(a), e.head.appendChild(a);
      }
    }
  }
  function Fm(l, t, e) {
    Pt.S(l, t, e);
    var a = Oa;
    if (a && l) {
      var u = $e(a).hoistableStyles, n = Ma(l);
      t = t || "default";
      var c = u.get(n);
      if (!c) {
        var f = { loading: 0, preload: null };
        if (c = a.querySelector(bu(n))) f.loading = 5;
        else {
          l = B({ rel: "stylesheet", href: l, "data-precedence": t }, e), (e = Et.get(n)) && fi(l, e);
          var i = c = a.createElement("link");
          Nl(i), Gl(i, "link", l), i._p = new Promise(function(v, _) {
            i.onload = v, i.onerror = _;
          }), i.addEventListener("load", function() {
            f.loading |= 1;
          }), i.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, Yn(c, t, a);
        }
        c = { type: "stylesheet", instance: c, count: 1, state: f }, u.set(n, c);
      }
    }
  }
  function km(l, t) {
    Pt.X(l, t);
    var e = Oa;
    if (e && l) {
      var a = $e(e).hoistableScripts, u = Da(l), n = a.get(u);
      n || (n = e.querySelector(Su(u)), n || (l = B({ src: l, async: true }, t), (t = Et.get(u)) && ii(l, t), n = e.createElement("script"), Nl(n), Gl(n, "link", l), e.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, a.set(u, n));
    }
  }
  function Im(l, t) {
    Pt.M(l, t);
    var e = Oa;
    if (e && l) {
      var a = $e(e).hoistableScripts, u = Da(l), n = a.get(u);
      n || (n = e.querySelector(Su(u)), n || (l = B({ src: l, async: true, type: "module" }, t), (t = Et.get(u)) && ii(l, t), n = e.createElement("script"), Nl(n), Gl(n, "link", l), e.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, a.set(u, n));
    }
  }
  function fd(l, t, e, a) {
    var u = (u = w.current) ? Bn(u) : null;
    if (!u) throw Error(o(446));
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
          if (c || (u = u.ownerDocument || u, c = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, n.set(l, c), (n = u.querySelector(bu(l))) && !n._p && (c.instance = n, c.state.loading = 5), Et.has(l) || (e = { rel: "preload", as: "style", href: e.href, crossOrigin: e.crossOrigin, integrity: e.integrity, media: e.media, hrefLang: e.hrefLang, referrerPolicy: e.referrerPolicy }, Et.set(l, e), n || Pm(u, l, e, c.state))), t && a === null) throw Error(o(528, ""));
          return c;
        }
        if (t && a !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Da(e), e = $e(u).hoistableScripts, a = e.get(t), a || (a = { type: "script", instance: null, count: 0, state: null }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, l));
    }
  }
  function Ma(l) {
    return 'href="' + vt(l) + '"';
  }
  function bu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function id(l) {
    return B({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function Pm(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Gl(t, "link", e), Nl(t), l.head.appendChild(t));
  }
  function Da(l) {
    return '[src="' + vt(l) + '"]';
  }
  function Su(l) {
    return "script[async]" + l;
  }
  function sd(l, t, e) {
    if (t.count++, t.instance === null) switch (t.type) {
      case "style":
        var a = l.querySelector('style[data-href~="' + vt(e.href) + '"]');
        if (a) return t.instance = a, Nl(a), a;
        var u = B({}, e, { "data-href": e.href, "data-precedence": e.precedence, href: null, precedence: null });
        return a = (l.ownerDocument || l).createElement("style"), Nl(a), Gl(a, "style", u), Yn(a, e.precedence, l), t.instance = a;
      case "stylesheet":
        u = Ma(e.href);
        var n = l.querySelector(bu(u));
        if (n) return t.state.loading |= 4, t.instance = n, Nl(n), n;
        a = id(e), (u = Et.get(u)) && fi(a, u), n = (l.ownerDocument || l).createElement("link"), Nl(n);
        var c = n;
        return c._p = new Promise(function(f, i) {
          c.onload = f, c.onerror = i;
        }), Gl(n, "link", a), t.state.loading |= 4, Yn(n, e.precedence, l), t.instance = n;
      case "script":
        return n = Da(e.src), (u = l.querySelector(Su(n))) ? (t.instance = u, Nl(u), u) : (a = e, (u = Et.get(n)) && (a = B({}, e), ii(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Nl(u), Gl(u, "link", a), l.head.appendChild(u), t.instance = u);
      case "void":
        return null;
      default:
        throw Error(o(443, t.type));
    }
    else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Yn(a, e.precedence, l));
    return t.instance;
  }
  function Yn(l, t, e) {
    for (var a = e.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), u = a.length ? a[a.length - 1] : null, n = u, c = 0; c < a.length; c++) {
      var f = a[c];
      if (f.dataset.precedence === t) n = f;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function fi(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function ii(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Gn = null;
  function od(l, t, e) {
    if (Gn === null) {
      var a = /* @__PURE__ */ new Map(), u = Gn = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else u = Gn, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[ja] || n[jl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = n.getAttribute(t) || "";
        c = l + c;
        var f = a.get(c);
        f ? f.push(n) : a.set(c, [n]);
      }
    }
    return a;
  }
  function dd(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(e, t === "title" ? l.querySelector("head > title") : null);
  }
  function ly(l, t, e) {
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
  function rd(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function ty(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== false) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Ma(a.href), n = t.querySelector(bu(u));
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Xn.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, Nl(n);
          return;
        }
        n = t.ownerDocument || t, a = id(a), (u = Et.get(u)) && fi(a, u), n = n.createElement("link"), Nl(n);
        var c = n;
        c._p = new Promise(function(f, i) {
          c.onload = f, c.onerror = i;
        }), Gl(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = Xn.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var si = 0;
  function ey(l, t) {
    return l.stylesheets && l.count === 0 && Zn(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && Zn(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && si === 0 && (si = 62500 * qm());
      var u = setTimeout(function() {
        if (l.waitingForImages = false, l.count === 0 && (l.stylesheets && Zn(l, l.stylesheets), l.unsuspend)) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, (l.imgBytes > si ? 50 : 800) + t);
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function Xn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Zn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Qn = null;
  function Zn(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Qn = /* @__PURE__ */ new Map(), t.forEach(ay, l), Qn = null, Xn.call(l));
  }
  function ay(l, t) {
    if (!(t.state.loading & 4)) {
      var e = Qn.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Qn.set(l, e);
        for (var u = l.querySelectorAll("link[data-precedence],style[data-precedence]"), n = 0; n < u.length; n++) {
          var c = u[n];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (e.set(c.dataset.precedence, c), a = c);
        }
        a && e.set(null, a);
      }
      u = t.instance, c = u.getAttribute("data-precedence"), n = e.get(c) || a, n === a && e.set(null, u), e.set(c, u), this.count++, a = Xn.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var _u = { $$typeof: Dl, Provider: null, Consumer: null, _currentValue: X, _currentValue2: X, _threadCount: 0 };
  function uy(l, t, e, a, u, n, c, f, i) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ac(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ac(0), this.hiddenUpdates = ac(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = i, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function md(l, t, e, a, u, n, c, f, i, v, _, A) {
    return l = new uy(l, t, e, c, i, v, _, A, f), t = 1, n === true && (t |= 24), n = nt(3, null, null, t), l.current = n, n.stateNode = l, t = Qc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = { element: a, isDehydrated: e, cache: t }, Kc(n), l;
  }
  function yd(l) {
    return l ? (l = na, l) : na;
  }
  function vd(l, t, e, a, u, n) {
    u = yd(u), a.context === null ? a.context = u : a.pendingContext = u, a = ie(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = se(l, a, t), e !== null && (Pl(e, l, t), Ia(e, l, t));
  }
  function hd(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function oi(l, t) {
    hd(l, t), (l = l.alternate) && hd(l, t);
  }
  function gd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = xe(l, 67108864);
      t !== null && Pl(t, l, 67108864), oi(l, 67108864);
    }
  }
  function bd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ot();
      t = uc(t);
      var e = xe(l, t);
      e !== null && Pl(e, l, t), oi(l, t);
    }
  }
  var Ln = true;
  function ny(l, t, e, a) {
    var u = z.T;
    z.T = null;
    var n = U.p;
    try {
      U.p = 2, di(l, t, e, a);
    } finally {
      U.p = n, z.T = u;
    }
  }
  function cy(l, t, e, a) {
    var u = z.T;
    z.T = null;
    var n = U.p;
    try {
      U.p = 8, di(l, t, e, a);
    } finally {
      U.p = n, z.T = u;
    }
  }
  function di(l, t, e, a) {
    if (Ln) {
      var u = ri(a);
      if (u === null) kf(l, t, a, Vn, e), _d(l, a);
      else if (iy(u, l, t, e, a)) a.stopPropagation();
      else if (_d(l, a), t & 4 && -1 < fy.indexOf(l)) {
        for (; u !== null; ) {
          var n = We(u);
          if (n !== null) switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var c = Oe(n.pendingLanes);
                if (c !== 0) {
                  var f = n;
                  for (f.pendingLanes |= 2, f.entangledLanes |= 2; c; ) {
                    var i = 1 << 31 - at(c);
                    f.entanglements[1] |= i, c &= ~i;
                  }
                  Ht(n), (al & 6) === 0 && (On = tt() + 500, yu(0));
                }
              }
              break;
            case 31:
            case 13:
              f = xe(n, 2), f !== null && Pl(f, n, 2), Dn(), oi(n, 2);
          }
          if (n = ri(a), n === null && kf(l, t, a, Vn, e), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else kf(l, t, a, null, e);
    }
  }
  function ri(l) {
    return l = mc(l), mi(l);
  }
  var Vn = null;
  function mi(l) {
    if (Vn = null, l = Je(l), l !== null) {
      var t = H(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = G(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = L(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Vn = l, null;
  }
  function Sd(l) {
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
        switch (wd()) {
          case Oi:
            return 2;
          case Mi:
            return 8;
          case Ru:
          case Jd:
            return 32;
          case Di:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var yi = false, _e = null, ze = null, pe = null, zu = /* @__PURE__ */ new Map(), pu = /* @__PURE__ */ new Map(), Ee = [], fy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function _d(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        _e = null;
        break;
      case "dragenter":
      case "dragleave":
        ze = null;
        break;
      case "mouseover":
      case "mouseout":
        pe = null;
        break;
      case "pointerover":
      case "pointerout":
        zu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        pu.delete(t.pointerId);
    }
  }
  function Eu(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n ? (l = { blockedOn: t, domEventName: e, eventSystemFlags: a, nativeEvent: n, targetContainers: [u] }, t !== null && (t = We(t), t !== null && gd(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function iy(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return _e = Eu(_e, l, t, e, a, u), true;
      case "dragenter":
        return ze = Eu(ze, l, t, e, a, u), true;
      case "mouseover":
        return pe = Eu(pe, l, t, e, a, u), true;
      case "pointerover":
        var n = u.pointerId;
        return zu.set(n, Eu(zu.get(n) || null, l, t, e, a, u)), true;
      case "gotpointercapture":
        return n = u.pointerId, pu.set(n, Eu(pu.get(n) || null, l, t, e, a, u)), true;
    }
    return false;
  }
  function zd(l) {
    var t = Je(l.target);
    if (t !== null) {
      var e = H(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = G(e), t !== null) {
            l.blockedOn = t, Ci(l.priority, function() {
              bd(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = L(e), t !== null) {
            l.blockedOn = t, Ci(l.priority, function() {
              bd(e);
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
  function Kn(l) {
    if (l.blockedOn !== null) return false;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = ri(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(e.type, e);
        rc = a, e.target.dispatchEvent(a), rc = null;
      } else return t = We(e), t !== null && gd(t), l.blockedOn = e, false;
      t.shift();
    }
    return true;
  }
  function pd(l, t, e) {
    Kn(l) && e.delete(t);
  }
  function sy() {
    yi = false, _e !== null && Kn(_e) && (_e = null), ze !== null && Kn(ze) && (ze = null), pe !== null && Kn(pe) && (pe = null), zu.forEach(pd), pu.forEach(pd);
  }
  function wn(l, t) {
    l.blockedOn === t && (l.blockedOn = null, yi || (yi = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, sy)));
  }
  var Jn = null;
  function Ed(l) {
    Jn !== l && (Jn = l, r.unstable_scheduleCallback(r.unstable_NormalPriority, function() {
      Jn === l && (Jn = null);
      for (var t = 0; t < l.length; t += 3) {
        var e = l[t], a = l[t + 1], u = l[t + 2];
        if (typeof a != "function") {
          if (mi(a || e) === null) continue;
          break;
        }
        var n = We(e);
        n !== null && (l.splice(t, 3), t -= 3, rf(n, { pending: true, data: u, method: e.method, action: a }, a, u));
      }
    }));
  }
  function Ua(l) {
    function t(i) {
      return wn(i, l);
    }
    _e !== null && wn(_e, l), ze !== null && wn(ze, l), pe !== null && wn(pe, l), zu.forEach(t), pu.forEach(t);
    for (var e = 0; e < Ee.length; e++) {
      var a = Ee[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ee.length && (e = Ee[0], e.blockedOn === null); ) zd(e), e.blockedOn === null && Ee.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null) for (a = 0; a < e.length; a += 3) {
      var u = e[a], n = e[a + 1], c = u[Jl] || null;
      if (typeof n == "function") c || Ed(e);
      else if (c) {
        var f = null;
        if (n && n.hasAttribute("formAction")) {
          if (u = n, c = n[Jl] || null) f = c.formAction;
          else if (mi(u) !== null) continue;
        } else f = c.action;
        typeof f == "function" ? e[a + 1] = f : (e.splice(a, 3), a -= 3), Ed(e);
      }
    }
  }
  function Td() {
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
  function vi(l) {
    this._internalRoot = l;
  }
  Wn.prototype.render = vi.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var e = t.current, a = ot();
    vd(e, a, l, t, null, null);
  }, Wn.prototype.unmount = vi.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      vd(l.current, 2, null, l, null, null), Dn(), t[we] = null;
    }
  };
  function Wn(l) {
    this._internalRoot = l;
  }
  Wn.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Hi();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ee.length && t !== 0 && t < Ee[e].priority; e++) ;
      Ee.splice(e, 0, l), e === 0 && zd(l);
    }
  };
  var Ad = g.version;
  if (Ad !== "19.2.0") throw Error(o(527, Ad, "19.2.0"));
  U.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0) throw typeof l.render == "function" ? Error(o(188)) : (l = Object.keys(l).join(","), Error(o(268, l)));
    return l = S(t), l = l !== null ? F(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var oy = { bundleType: 0, version: "19.2.0", rendererPackageName: "react-dom", currentDispatcherRef: z, reconcilerVersion: "19.2.0" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var $n = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!$n.isDisabled && $n.supportsFiber) try {
      Ra = $n.inject(oy), et = $n;
    } catch {
    }
  }
  return Au.createRoot = function(l, t) {
    if (!O(l)) throw Error(o(299));
    var e = false, a = "", u = x0, n = R0, c = H0;
    return t != null && (t.unstable_strictMode === true && (e = true), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = md(l, 1, false, null, null, e, a, null, u, n, c, Td), l[we] = t.current, Ff(l), new vi(t);
  }, Au.hydrateRoot = function(l, t, e) {
    if (!O(l)) throw Error(o(299));
    var a = false, u = "", n = x0, c = R0, f = H0, i = null;
    return e != null && (e.unstable_strictMode === true && (a = true), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError), e.formState !== void 0 && (i = e.formState)), t = md(l, 1, true, t, e ?? null, a, u, i, n, c, f, Td), t.context = yd(null), e = t.current, a = ot(), a = uc(a), u = ie(a), u.callback = null, se(e, u, a), e = a, t.current.lanes = e, Ca(t, e), Ht(t), l[we] = t.current, Ff(l), new Wn(t);
  }, Au.version = "19.2.0", Au;
}
var jd;
function _y() {
  if (jd) return bi.exports;
  jd = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
    } catch (g) {
      console.error(g);
    }
  }
  return r(), bi.exports = Sy(), bi.exports;
}
var zy = _y();
let zl, kn = 0, Mu = null;
function Uu() {
  return (Mu === null || Mu.byteLength === 0) && (Mu = new Uint8Array(zl.memory.buffer)), Mu;
}
const Nu = new TextEncoder();
"encodeInto" in Nu || (Nu.encodeInto = function(r, g) {
  const p = Nu.encode(r);
  return g.set(p), { read: r.length, written: p.length };
});
function Qd(r, g, p) {
  if (p === void 0) {
    const L = Nu.encode(r), D = g(L.length, 1) >>> 0;
    return Uu().subarray(D, D + L.length).set(L), kn = L.length, D;
  }
  let o = r.length, O = g(o, 1) >>> 0;
  const H = Uu();
  let G = 0;
  for (; G < o; G++) {
    const L = r.charCodeAt(G);
    if (L > 127) break;
    H[O + G] = L;
  }
  if (G !== o) {
    G !== 0 && (r = r.slice(G)), O = p(O, o, o = G + r.length * 3, 1) >>> 0;
    const L = Uu().subarray(O + G, O + o), D = Nu.encodeInto(r, L);
    G += D.written, O = p(O, o, G, 1) >>> 0;
  }
  return kn = G, O;
}
let Ve = null;
function qd() {
  return (Ve === null || Ve.buffer.detached === true || Ve.buffer.detached === void 0 && Ve.buffer !== zl.memory.buffer) && (Ve = new DataView(zl.memory.buffer)), Ve;
}
let Fn = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
Fn.decode();
const py = 2146435072;
let pi = 0;
function Ey(r, g) {
  return pi += g, pi >= py && (Fn = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), Fn.decode(), pi = g), Fn.decode(Uu().subarray(r, r + g));
}
function Ei(r, g) {
  return r = r >>> 0, Ey(r, g);
}
function Du(r) {
  const g = zl.__externref_table_alloc();
  return zl.__wbindgen_externrefs.set(g, r), g;
}
function Ou(r, g) {
  try {
    return r.apply(this, g);
  } catch (p) {
    const o = Du(p);
    zl.__wbindgen_exn_store(o);
  }
}
function Bd(r, g) {
  return r = r >>> 0, Uu().subarray(r / 1, r / 1 + g);
}
function Na(r) {
  return r == null;
}
const Yd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => r.dtor(r.a, r.b));
function Ty(r, g, p, o) {
  const O = { a: r, b: g, cnt: 1, dtor: p }, H = (...G) => {
    O.cnt++;
    const L = O.a;
    O.a = 0;
    try {
      return o(L, O.b, ...G);
    } finally {
      O.a = L, H._wbg_cb_unref();
    }
  };
  return H._wbg_cb_unref = () => {
    --O.cnt === 0 && (O.dtor(O.a, O.b), O.a = 0, Yd.unregister(O));
  }, Yd.register(H, O, O), H;
}
function Ay(r, g, p) {
  const o = Qd(r, zl.__wbindgen_malloc, zl.__wbindgen_realloc), O = kn;
  return zl.evaluate_multiple(o, O, g, !Na(p), Na(p) ? BigInt(0) : p);
}
function Oy() {
  return zl.get_available_generators();
}
function My(r, g, p) {
  zl.wasm_bindgen__convert__closures_____invoke__h8a58c05785379efb(r, g, p);
}
function Dy(r, g, p, o) {
  zl.wasm_bindgen__convert__closures_____invoke__h680168a7fee85f03(r, g, p, o);
}
const Uy = /* @__PURE__ */ new Set(["basic", "cors", "default"]);
async function Ny(r, g) {
  if (typeof Response == "function" && r instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function") try {
      return await WebAssembly.instantiateStreaming(r, g);
    } catch (o) {
      if (r.ok && Uy.has(r.type) && r.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", o);
      else throw o;
    }
    const p = await r.arrayBuffer();
    return await WebAssembly.instantiate(p, g);
  } else {
    const p = await WebAssembly.instantiate(r, g);
    return p instanceof WebAssembly.Instance ? { instance: p, module: r } : p;
  }
}
function xy() {
  const r = {};
  return r.wbg = {}, r.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(g, p) {
    const o = String(p), O = Qd(o, zl.__wbindgen_malloc, zl.__wbindgen_realloc), H = kn;
    qd().setInt32(g + 4, H, true), qd().setInt32(g + 0, O, true);
  }, r.wbg.__wbg___wbindgen_is_function_ee8a6c5833c90377 = function(g) {
    return typeof g == "function";
  }, r.wbg.__wbg___wbindgen_is_object_c818261d21f283a4 = function(g) {
    const p = g;
    return typeof p == "object" && p !== null;
  }, r.wbg.__wbg___wbindgen_is_string_fbb76cb2940daafd = function(g) {
    return typeof g == "string";
  }, r.wbg.__wbg___wbindgen_is_undefined_2d472862bd29a478 = function(g) {
    return g === void 0;
  }, r.wbg.__wbg___wbindgen_throw_b855445ff6a94295 = function(g, p) {
    throw new Error(Ei(g, p));
  }, r.wbg.__wbg__wbg_cb_unref_2454a539ea5790d9 = function(g) {
    g._wbg_cb_unref();
  }, r.wbg.__wbg_call_525440f72fbfc0ea = function() {
    return Ou(function(g, p, o) {
      return g.call(p, o);
    }, arguments);
  }, r.wbg.__wbg_call_e762c39fa8ea36bf = function() {
    return Ou(function(g, p) {
      return g.call(p);
    }, arguments);
  }, r.wbg.__wbg_crypto_574e78ad8b13b65f = function(g) {
    return g.crypto;
  }, r.wbg.__wbg_getRandomValues_b8f5dbd5f3995a9e = function() {
    return Ou(function(g, p) {
      g.getRandomValues(p);
    }, arguments);
  }, r.wbg.__wbg_length_69bca3cb64fc8748 = function(g) {
    return g.length;
  }, r.wbg.__wbg_msCrypto_a61aeb35a24c1329 = function(g) {
    return g.msCrypto;
  }, r.wbg.__wbg_new_3c3d849046688a66 = function(g, p) {
    try {
      var o = { a: g, b: p }, O = (G, L) => {
        const D = o.a;
        o.a = 0;
        try {
          return Dy(D, o.b, G, L);
        } finally {
          o.a = D;
        }
      };
      return new Promise(O);
    } finally {
      o.a = o.b = 0;
    }
  }, r.wbg.__wbg_new_e17d9f43105b08be = function() {
    return new Array();
  }, r.wbg.__wbg_new_no_args_ee98eee5275000a4 = function(g, p) {
    return new Function(Ei(g, p));
  }, r.wbg.__wbg_new_with_length_01aa0dc35aa13543 = function(g) {
    return new Uint8Array(g >>> 0);
  }, r.wbg.__wbg_node_905d3e251edff8a2 = function(g) {
    return g.node;
  }, r.wbg.__wbg_process_dc0fbacc7c1c06f7 = function(g) {
    return g.process;
  }, r.wbg.__wbg_prototypesetcall_2a6620b6922694b2 = function(g, p, o) {
    Uint8Array.prototype.set.call(Bd(g, p), o);
  }, r.wbg.__wbg_queueMicrotask_34d692c25c47d05b = function(g) {
    return g.queueMicrotask;
  }, r.wbg.__wbg_queueMicrotask_9d76cacb20c84d58 = function(g) {
    queueMicrotask(g);
  }, r.wbg.__wbg_randomFillSync_ac0988aba3254290 = function() {
    return Ou(function(g, p) {
      g.randomFillSync(p);
    }, arguments);
  }, r.wbg.__wbg_require_60cc747a6bc5215a = function() {
    return Ou(function() {
      return module.require;
    }, arguments);
  }, r.wbg.__wbg_resolve_caf97c30b83f7053 = function(g) {
    return Promise.resolve(g);
  }, r.wbg.__wbg_set_c213c871859d6500 = function(g, p, o) {
    g[p >>> 0] = o;
  }, r.wbg.__wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e = function() {
    const g = typeof global > "u" ? null : global;
    return Na(g) ? 0 : Du(g);
  }, r.wbg.__wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac = function() {
    const g = typeof globalThis > "u" ? null : globalThis;
    return Na(g) ? 0 : Du(g);
  }, r.wbg.__wbg_static_accessor_SELF_6fdf4b64710cc91b = function() {
    const g = typeof self > "u" ? null : self;
    return Na(g) ? 0 : Du(g);
  }, r.wbg.__wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2 = function() {
    const g = typeof window > "u" ? null : window;
    return Na(g) ? 0 : Du(g);
  }, r.wbg.__wbg_subarray_480600f3d6a9f26c = function(g, p, o) {
    return g.subarray(p >>> 0, o >>> 0);
  }, r.wbg.__wbg_then_4f46f6544e6b4a28 = function(g, p) {
    return g.then(p);
  }, r.wbg.__wbg_versions_c01dfd4722a88165 = function(g) {
    return g.versions;
  }, r.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(g, p) {
    return Ei(g, p);
  }, r.wbg.__wbindgen_cast_902a70736b89c8fd = function(g, p) {
    return Ty(g, p, zl.wasm_bindgen__closure__destroy__h032a9fb1222a415c, My);
  }, r.wbg.__wbindgen_cast_cb9088102bce6b30 = function(g, p) {
    return Bd(g, p);
  }, r.wbg.__wbindgen_init_externref_table = function() {
    const g = zl.__wbindgen_externrefs, p = g.grow(4);
    g.set(0, void 0), g.set(p + 0, void 0), g.set(p + 1, null), g.set(p + 2, true), g.set(p + 3, false);
  }, r;
}
function Ry(r, g) {
  return zl = r.exports, Zd.__wbindgen_wasm_module = g, Ve = null, Mu = null, zl.__wbindgen_start(), zl;
}
async function Zd(r) {
  if (zl !== void 0) return zl;
  typeof r < "u" && (Object.getPrototypeOf(r) === Object.prototype ? { module_or_path: r } = r : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof r > "u" && (r = new URL("" + new URL("perchance_wasm_bg-DHTUb4Vs.wasm", import.meta.url).href, import.meta.url));
  const g = xy();
  (typeof r == "string" || typeof Request == "function" && r instanceof Request || typeof URL == "function" && r instanceof URL) && (r = fetch(r));
  const { instance: p, module: o } = await Ny(await r, g);
  return Ry(p, o);
}
function Hy({ items: r, position: g, selectedIndex: p, onSelect: o, onClose: O, onNavigate: H }) {
  const G = hl.useRef(null), L = hl.useRef(null);
  return hl.useEffect(() => {
    L.current && L.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [p]), hl.useEffect(() => {
    const D = (S) => {
      S.key === "ArrowDown" ? (S.preventDefault(), H("down")) : S.key === "ArrowUp" ? (S.preventDefault(), H("up")) : S.key === "Enter" ? (S.preventDefault(), r[p] && o(r[p])) : S.key === "Escape" && (S.preventDefault(), O());
    };
    return document.addEventListener("keydown", D), () => document.removeEventListener("keydown", D);
  }, [r, p, o, O, H]), r.length === 0 ? null : x.jsxs("div", { ref: G, className: "absolute z-50 bg-slate-800 border border-purple-500/50 rounded-lg shadow-2xl overflow-hidden", style: { top: `${g.top}px`, left: `${g.left}px`, maxHeight: "300px", width: "280px" }, children: [x.jsxs("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 flex items-center justify-between", children: [x.jsxs("span", { className: "text-xs font-semibold text-white", children: ["Import Generator (", r.length, ")"] }), x.jsx("span", { className: "text-xs text-purple-200", children: "\u2191\u2193 navigate \u2022 \u23CE select \u2022 esc close" })] }), x.jsx("div", { className: "overflow-y-auto max-h-[250px]", children: r.map((D, S) => x.jsx("div", { ref: S === p ? L : null, onClick: () => o(D), onMouseEnter: () => H("down"), className: `px-4 py-2 cursor-pointer transition-colors ${S === p ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-slate-700"}`, children: x.jsx("div", { className: "font-mono text-sm", children: D }) }, D)) })] });
}
const Gd = { 30: "#000000", 31: "#ef4444", 32: "#22c55e", 33: "#eab308", 34: "#3b82f6", 35: "#a855f7", 36: "#06b6d4", 37: "#f3f4f6", 90: "#6b7280", 91: "#f87171", 92: "#86efac", 93: "#fde047", 94: "#93c5fd", 95: "#d8b4fe", 96: "#67e8f9", 97: "#ffffff" }, Xd = { 40: "#000000", 41: "#7f1d1d", 42: "#14532d", 43: "#713f12", 44: "#1e3a8a", 45: "#581c87", 46: "#164e63", 47: "#1f2937", 100: "#374151", 101: "#991b1b", 102: "#166534", 103: "#854d0e", 104: "#1e40af", 105: "#6b21a8", 106: "#155e75", 107: "#4b5563" };
function Cy(r) {
  const g = [], p = /\x1b\[([0-9;]+)m/g;
  let o = false, O, H, G = 0, L;
  for (; (L = p.exec(r)) !== null; ) {
    if (L.index > G) {
      const S = r.substring(G, L.index);
      S && g.push({ text: S, bold: o, fgColor: O, bgColor: H });
    }
    const D = L[1].split(";").map(Number);
    for (const S of D) S === 0 ? (o = false, O = void 0, H = void 0) : S === 1 ? o = true : S === 22 ? o = false : S >= 30 && S <= 37 || S >= 90 && S <= 97 ? O = Gd[S] : S >= 40 && S <= 47 || S >= 100 && S <= 107 ? H = Xd[S] : S === 38 ? O = "#ffffff" : S === 48 && (H = "#000000");
    G = L.index + L[0].length;
  }
  if (G < r.length) {
    const D = r.substring(G);
    D && g.push({ text: D, bold: o, fgColor: O, bgColor: H });
  }
  return g;
}
function jy({ text: r, className: g = "" }) {
  const p = hl.useMemo(() => Cy(r), [r]);
  return x.jsx("pre", { className: g, children: p.map((o, O) => {
    const H = {};
    return o.fgColor && (H.color = o.fgColor), o.bgColor && (H.backgroundColor = o.bgColor), o.bold && (H.fontWeight = "bold"), x.jsx("span", { style: H, children: o.text }, O);
  }) });
}
const qy = `animal
	dog
	cat^2
	bird

color
	red
	blue
	green

output
	I saw a {beautiful|pretty|cute} [color] [animal]!`;
function By() {
  const [r, g] = hl.useState(false), [p, o] = hl.useState(qy), [O, H] = hl.useState(null), [G, L] = hl.useState(true), [D, S] = hl.useState("42"), [F, B] = hl.useState(5), [ol, Xl] = hl.useState([]), [Ql, Rl] = hl.useState([]), [Tt, Ml] = hl.useState(false), [Ut, Dl] = hl.useState({ top: 0, left: 0 }), [wl, dt] = hl.useState(""), [Zl, J] = hl.useState(0), [Hl, rt] = hl.useState(0), Ll = hl.useRef(null);
  hl.useEffect(() => {
    Zd().then(() => {
      g(true);
      try {
        const j = Oy();
        Rl(j);
      } catch (j) {
        console.error("Failed to load generators:", j);
      }
    });
  }, []);
  const mt = () => {
    S(Math.floor(Math.random() * 1e6).toString());
  }, Cl = hl.useCallback(async (j, s, T) => {
    if (r) try {
      const M = BigInt(parseInt(T) || 42), N = await Ay(j, s, M);
      Xl(N), H(null);
    } catch (M) {
      H(String(M)), Xl([]);
    }
  }, [r]);
  hl.useEffect(() => {
    if (G && r) {
      const j = setTimeout(() => {
        Cl(p, F, D);
      }, 300);
      return () => clearTimeout(j);
    }
  }, [p, F, D, G, r, Cl]);
  const Ct = (j) => {
    B(parseInt(j.target.value));
  }, At = (j) => {
    const s = parseInt(j.target.value);
    !isNaN(s) && s > 0 && B(s);
  }, lt = (j) => {
    const s = j.target.value, T = j.target.selectionStart;
    o(s);
    const M = s.substring(0, T), N = M.match(/\{import:([^}]*)$/);
    if (N && Ll.current) {
      const Q = N[1];
      dt(Q), rt(T - Q.length), J(0);
      const w = Ll.current, Ul = M.split(`
`), yl = Ul.length - 1, Ae = Ul[yl], Ke = 20, xa = 8, xu = w.offsetTop + (yl + 1) * Ke + 40, jt = w.offsetLeft + Ae.length * xa + 20;
      Dl({ top: xu, left: jt }), Ml(true);
    } else Ml(false);
  }, z = Ql.filter((j) => j.toLowerCase().includes(wl.toLowerCase())), U = (j) => {
    if (!Ll.current) return;
    const s = Ll.current.selectionStart, T = p.substring(0, Hl), M = p.substring(s), N = `${T}${j}}${M}`;
    o(N);
    const Q = Hl + j.length + 1;
    setTimeout(() => {
      Ll.current && (Ll.current.selectionStart = Q, Ll.current.selectionEnd = Q, Ll.current.focus());
    }, 0), Ml(false);
  }, X = (j) => {
    J((s) => j === "down" ? Math.min(s + 1, z.length - 1) : Math.max(s - 1, 0));
  }, ul = () => {
    Ml(false);
  };
  return x.jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white", children: x.jsxs("div", { className: "container mx-auto px-4 py-8", children: [x.jsxs("div", { className: "mb-8 text-center", children: [x.jsx("h1", { className: "text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2", children: "Perchance Interpreter" }), x.jsxs("p", { className: "text-gray-400 text-lg", children: ["A deterministic random text generator \u2022", " ", x.jsx("a", { href: "https://perchance.org/tutorial", target: "_blank", rel: "noopener noreferrer", className: "text-purple-400 hover:text-purple-300 transition-colors underline", children: "Tutorial" })] })] }), !r && x.jsxs("div", { className: "text-center py-12", children: [x.jsx("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" }), x.jsx("p", { className: "mt-4 text-gray-400", children: "Loading interpreter..." })] }), r && x.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [x.jsxs("div", { className: "bg-slate-800/50 backdrop-blur rounded-lg shadow-2xl border border-slate-700/50 overflow-hidden", children: [x.jsx("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3", children: x.jsx("h2", { className: "text-xl font-semibold", children: "Template Editor" }) }), x.jsxs("div", { className: "p-6 relative", children: [x.jsx("textarea", { ref: Ll, value: p, onChange: lt, className: "w-full h-[500px] bg-slate-900 text-gray-100 font-mono text-sm p-4 rounded-lg border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all resize-none", placeholder: "Enter your Perchance template here...", spellCheck: false }), Tt && x.jsx(Hy, { items: z, position: Ut, selectedIndex: Zl, onSelect: U, onClose: ul, onNavigate: X }), x.jsxs("div", { className: "mt-4 space-y-4", children: [x.jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [x.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [x.jsx("input", { type: "checkbox", checked: G, onChange: (j) => L(j.target.checked), className: "w-4 h-4 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900" }), x.jsx("span", { className: "text-sm text-gray-300", children: "Auto-evaluate" })] }), x.jsxs("div", { className: "flex items-center gap-2", children: [x.jsx("label", { className: "text-sm text-gray-300", children: "Seed:" }), x.jsx("input", { type: "number", value: D, onChange: (j) => S(j.target.value), className: "w-24 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none" }), x.jsx("button", { onClick: mt, className: "px-3 py-1 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded text-sm transition-colors", title: "Randomize seed", children: "\u{1F3B2}" })] })] }), x.jsxs("div", { className: "space-y-2", children: [x.jsx("div", { className: "flex items-center gap-2", children: x.jsxs("label", { className: "text-sm text-gray-300", children: ["Samples: ", F] }) }), x.jsxs("div", { className: "flex items-center gap-4", children: [x.jsx("input", { type: "range", min: "1", max: "10", value: Math.min(F, 10), onChange: Ct, className: "flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600" }), x.jsx("input", { type: "number", value: F, onChange: At, min: "1", className: "w-20 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none" })] })] })] })] })] }), x.jsxs("div", { className: "bg-slate-800/50 backdrop-blur rounded-lg shadow-2xl border border-slate-700/50 overflow-hidden", children: [x.jsx("div", { className: "bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3", children: x.jsx("h2", { className: "text-xl font-semibold", children: "Output Samples" }) }), x.jsx("div", { className: "p-6", children: O ? x.jsx("div", { className: "bg-red-900/30 border border-red-500 rounded-lg p-4", children: x.jsxs("div", { className: "flex items-start gap-3", children: [x.jsx("svg", { className: "w-5 h-5 text-red-400 flex-shrink-0 mt-0.5", fill: "currentColor", viewBox: "0 0 20 20", children: x.jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }), x.jsxs("div", { className: "flex-1", children: [x.jsx("h3", { className: "text-red-400 font-semibold mb-1", children: "Error" }), x.jsx(jy, { text: O, className: "text-sm whitespace-pre-wrap font-mono" })] })] }) }) : ol.length > 0 ? x.jsx("div", { className: "space-y-3", children: x.jsx("div", { className: "space-y-2 max-h-[580px] overflow-y-auto", children: ol.map((j, s) => x.jsx("div", { className: "bg-slate-900/70 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors", children: x.jsxs("div", { className: "flex items-start gap-3", children: [x.jsxs("span", { className: "text-xs text-purple-400 font-semibold bg-purple-900/30 px-2 py-1 rounded", children: ["#", s + 1] }), x.jsx("p", { className: "text-gray-100 flex-1", children: j })] }) }, s)) }) }) : x.jsxs("div", { className: "flex flex-col items-center justify-center h-full min-h-[500px] text-gray-500", children: [x.jsx("svg", { className: "w-16 h-16 mb-4 opacity-50", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: x.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }), x.jsx("p", { className: "text-lg", children: "Output will appear here" }), x.jsx("p", { className: "text-sm mt-2", children: "Edit the template to generate samples" })] }) })] })] }), x.jsx("div", { className: "mt-12 text-center text-gray-500 text-sm", children: x.jsxs("p", { children: ["Built with React, TypeScript, and WebAssembly \u2022", " ", x.jsx("a", { href: "https://github.com/philpax/perchance-interpreter", target: "_blank", rel: "noopener noreferrer", className: "text-purple-400 hover:text-purple-300 transition-colors", children: "View Source" })] }) })] }) });
}
zy.createRoot(document.getElementById("root")).render(x.jsx(hl.StrictMode, { children: x.jsx(By, {}) }));
