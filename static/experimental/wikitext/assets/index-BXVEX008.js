(function() {
  const h = document.createElement("link").relList;
  if (h && h.supports && h.supports("modulepreload")) return;
  for (const O of document.querySelectorAll('link[rel="modulepreload"]')) s(O);
  new MutationObserver((O) => {
    for (const H of O) if (H.type === "childList") for (const B of H.addedNodes) B.tagName === "LINK" && B.rel === "modulepreload" && s(B);
  }).observe(document, { childList: true, subtree: true });
  function _(O) {
    const H = {};
    return O.integrity && (H.integrity = O.integrity), O.referrerPolicy && (H.referrerPolicy = O.referrerPolicy), O.crossOrigin === "use-credentials" ? H.credentials = "include" : O.crossOrigin === "anonymous" ? H.credentials = "omit" : H.credentials = "same-origin", H;
  }
  function s(O) {
    if (O.ep) return;
    O.ep = true;
    const H = _(O);
    fetch(O.href, H);
  }
})();
var yf = { exports: {} }, Tu = {};
var xr;
function rh() {
  if (xr) return Tu;
  xr = 1;
  var y = /* @__PURE__ */ Symbol.for("react.transitional.element"), h = /* @__PURE__ */ Symbol.for("react.fragment");
  function _(s, O, H) {
    var B = null;
    if (H !== void 0 && (B = "" + H), O.key !== void 0 && (B = "" + O.key), "key" in O) {
      H = {};
      for (var F in O) F !== "key" && (H[F] = O[F]);
    } else H = O;
    return O = H.ref, { $$typeof: y, type: s, key: B, ref: O !== void 0 ? O : null, props: H };
  }
  return Tu.Fragment = h, Tu.jsx = _, Tu.jsxs = _, Tu;
}
var Ar;
function oh() {
  return Ar || (Ar = 1, yf.exports = rh()), yf.exports;
}
var S = oh(), gf = { exports: {} }, Q = {};
var Or;
function mh() {
  if (Or) return Q;
  Or = 1;
  var y = /* @__PURE__ */ Symbol.for("react.transitional.element"), h = /* @__PURE__ */ Symbol.for("react.portal"), _ = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), O = /* @__PURE__ */ Symbol.for("react.profiler"), H = /* @__PURE__ */ Symbol.for("react.consumer"), B = /* @__PURE__ */ Symbol.for("react.context"), F = /* @__PURE__ */ Symbol.for("react.forward_ref"), N = /* @__PURE__ */ Symbol.for("react.suspense"), A = /* @__PURE__ */ Symbol.for("react.memo"), K = /* @__PURE__ */ Symbol.for("react.lazy"), Y = /* @__PURE__ */ Symbol.for("react.activity"), M = Symbol.iterator;
  function bl(r) {
    return r === null || typeof r != "object" ? null : (r = M && r[M] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var el = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, tl = Object.assign, Ul = {};
  function J(r, x, U) {
    this.props = r, this.context = x, this.refs = Ul, this.updater = U || el;
  }
  J.prototype.isReactComponent = {}, J.prototype.setState = function(r, x) {
    if (typeof r != "object" && typeof r != "function" && r != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, r, x, "setState");
  }, J.prototype.forceUpdate = function(r) {
    this.updater.enqueueForceUpdate(this, r, "forceUpdate");
  };
  function jl() {
  }
  jl.prototype = J.prototype;
  function El(r, x, U) {
    this.props = r, this.context = x, this.refs = Ul, this.updater = U || el;
  }
  var rt = El.prototype = new jl();
  rt.constructor = El, tl(rt, J.prototype), rt.isPureReactComponent = true;
  var At = Array.isArray;
  function Kl() {
  }
  var P = { H: null, A: null, T: null, S: null }, Jl = Object.prototype.hasOwnProperty;
  function Ot(r, x, U) {
    var R = U.ref;
    return { $$typeof: y, type: r, key: x, ref: R !== void 0 ? R : null, props: U };
  }
  function Ve(r, x) {
    return Ot(r.type, x, r.props);
  }
  function Mt(r) {
    return typeof r == "object" && r !== null && r.$$typeof === y;
  }
  function wl(r) {
    var x = { "=": "=0", ":": "=2" };
    return "$" + r.replace(/[=:]/g, function(U) {
      return x[U];
    });
  }
  var Te = /\/+/g;
  function Ht(r, x) {
    return typeof r == "object" && r !== null && r.key != null ? wl("" + r.key) : x.toString(36);
  }
  function zt(r) {
    switch (r.status) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw r.reason;
      default:
        switch (typeof r.status == "string" ? r.then(Kl, Kl) : (r.status = "pending", r.then(function(x) {
          r.status === "pending" && (r.status = "fulfilled", r.value = x);
        }, function(x) {
          r.status === "pending" && (r.status = "rejected", r.reason = x);
        })), r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
        }
    }
    throw r;
  }
  function z(r, x, U, R, Z) {
    var w = typeof r;
    (w === "undefined" || w === "boolean") && (r = null);
    var il = false;
    if (r === null) il = true;
    else switch (w) {
      case "bigint":
      case "string":
      case "number":
        il = true;
        break;
      case "object":
        switch (r.$$typeof) {
          case y:
          case h:
            il = true;
            break;
          case K:
            return il = r._init, z(il(r._payload), x, U, R, Z);
        }
    }
    if (il) return Z = Z(r), il = R === "" ? "." + Ht(r, 0) : R, At(Z) ? (U = "", il != null && (U = il.replace(Te, "$&/") + "/"), z(Z, x, U, "", function(Da) {
      return Da;
    })) : Z != null && (Mt(Z) && (Z = Ve(Z, U + (Z.key == null || r && r.key === Z.key ? "" : ("" + Z.key).replace(Te, "$&/") + "/") + il)), x.push(Z)), 1;
    il = 0;
    var Zl = R === "" ? "." : R + ":";
    if (At(r)) for (var pl = 0; pl < r.length; pl++) R = r[pl], w = Zl + Ht(R, pl), il += z(R, x, U, w, Z);
    else if (pl = bl(r), typeof pl == "function") for (r = pl.call(r), pl = 0; !(R = r.next()).done; ) R = R.value, w = Zl + Ht(R, pl++), il += z(R, x, U, w, Z);
    else if (w === "object") {
      if (typeof r.then == "function") return z(zt(r), x, U, R, Z);
      throw x = String(r), Error("Objects are not valid as a React child (found: " + (x === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : x) + "). If you meant to render a collection of children, use an array instead.");
    }
    return il;
  }
  function D(r, x, U) {
    if (r == null) return r;
    var R = [], Z = 0;
    return z(r, R, "", "", function(w) {
      return x.call(U, w, Z++);
    }), R;
  }
  function X(r) {
    if (r._status === -1) {
      var x = r._result;
      x = x(), x.then(function(U) {
        (r._status === 0 || r._status === -1) && (r._status = 1, r._result = U);
      }, function(U) {
        (r._status === 0 || r._status === -1) && (r._status = 2, r._result = U);
      }), r._status === -1 && (r._status = 0, r._result = x);
    }
    if (r._status === 1) return r._result.default;
    throw r._result;
  }
  var sl = typeof reportError == "function" ? reportError : function(r) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var x = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof r == "object" && r !== null && typeof r.message == "string" ? String(r.message) : String(r), error: r });
      if (!window.dispatchEvent(x)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", r);
      return;
    }
    console.error(r);
  }, ml = { map: D, forEach: function(r, x, U) {
    D(r, function() {
      x.apply(this, arguments);
    }, U);
  }, count: function(r) {
    var x = 0;
    return D(r, function() {
      x++;
    }), x;
  }, toArray: function(r) {
    return D(r, function(x) {
      return x;
    }) || [];
  }, only: function(r) {
    if (!Mt(r)) throw Error("React.Children.only expected to receive a single React element child.");
    return r;
  } };
  return Q.Activity = Y, Q.Children = ml, Q.Component = J, Q.Fragment = _, Q.Profiler = O, Q.PureComponent = El, Q.StrictMode = s, Q.Suspense = N, Q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = P, Q.__COMPILER_RUNTIME = { __proto__: null, c: function(r) {
    return P.H.useMemoCache(r);
  } }, Q.cache = function(r) {
    return function() {
      return r.apply(null, arguments);
    };
  }, Q.cacheSignal = function() {
    return null;
  }, Q.cloneElement = function(r, x, U) {
    if (r == null) throw Error("The argument must be a React element, but you passed " + r + ".");
    var R = tl({}, r.props), Z = r.key;
    if (x != null) for (w in x.key !== void 0 && (Z = "" + x.key), x) !Jl.call(x, w) || w === "key" || w === "__self" || w === "__source" || w === "ref" && x.ref === void 0 || (R[w] = x[w]);
    var w = arguments.length - 2;
    if (w === 1) R.children = U;
    else if (1 < w) {
      for (var il = Array(w), Zl = 0; Zl < w; Zl++) il[Zl] = arguments[Zl + 2];
      R.children = il;
    }
    return Ot(r.type, Z, R);
  }, Q.createContext = function(r) {
    return r = { $$typeof: B, _currentValue: r, _currentValue2: r, _threadCount: 0, Provider: null, Consumer: null }, r.Provider = r, r.Consumer = { $$typeof: H, _context: r }, r;
  }, Q.createElement = function(r, x, U) {
    var R, Z = {}, w = null;
    if (x != null) for (R in x.key !== void 0 && (w = "" + x.key), x) Jl.call(x, R) && R !== "key" && R !== "__self" && R !== "__source" && (Z[R] = x[R]);
    var il = arguments.length - 2;
    if (il === 1) Z.children = U;
    else if (1 < il) {
      for (var Zl = Array(il), pl = 0; pl < il; pl++) Zl[pl] = arguments[pl + 2];
      Z.children = Zl;
    }
    if (r && r.defaultProps) for (R in il = r.defaultProps, il) Z[R] === void 0 && (Z[R] = il[R]);
    return Ot(r, w, Z);
  }, Q.createRef = function() {
    return { current: null };
  }, Q.forwardRef = function(r) {
    return { $$typeof: F, render: r };
  }, Q.isValidElement = Mt, Q.lazy = function(r) {
    return { $$typeof: K, _payload: { _status: -1, _result: r }, _init: X };
  }, Q.memo = function(r, x) {
    return { $$typeof: A, type: r, compare: x === void 0 ? null : x };
  }, Q.startTransition = function(r) {
    var x = P.T, U = {};
    P.T = U;
    try {
      var R = r(), Z = P.S;
      Z !== null && Z(U, R), typeof R == "object" && R !== null && typeof R.then == "function" && R.then(Kl, sl);
    } catch (w) {
      sl(w);
    } finally {
      x !== null && U.types !== null && (x.types = U.types), P.T = x;
    }
  }, Q.unstable_useCacheRefresh = function() {
    return P.H.useCacheRefresh();
  }, Q.use = function(r) {
    return P.H.use(r);
  }, Q.useActionState = function(r, x, U) {
    return P.H.useActionState(r, x, U);
  }, Q.useCallback = function(r, x) {
    return P.H.useCallback(r, x);
  }, Q.useContext = function(r) {
    return P.H.useContext(r);
  }, Q.useDebugValue = function() {
  }, Q.useDeferredValue = function(r, x) {
    return P.H.useDeferredValue(r, x);
  }, Q.useEffect = function(r, x) {
    return P.H.useEffect(r, x);
  }, Q.useEffectEvent = function(r) {
    return P.H.useEffectEvent(r);
  }, Q.useId = function() {
    return P.H.useId();
  }, Q.useImperativeHandle = function(r, x, U) {
    return P.H.useImperativeHandle(r, x, U);
  }, Q.useInsertionEffect = function(r, x) {
    return P.H.useInsertionEffect(r, x);
  }, Q.useLayoutEffect = function(r, x) {
    return P.H.useLayoutEffect(r, x);
  }, Q.useMemo = function(r, x) {
    return P.H.useMemo(r, x);
  }, Q.useOptimistic = function(r, x) {
    return P.H.useOptimistic(r, x);
  }, Q.useReducer = function(r, x, U) {
    return P.H.useReducer(r, x, U);
  }, Q.useRef = function(r) {
    return P.H.useRef(r);
  }, Q.useState = function(r) {
    return P.H.useState(r);
  }, Q.useSyncExternalStore = function(r, x, U) {
    return P.H.useSyncExternalStore(r, x, U);
  }, Q.useTransition = function() {
    return P.H.useTransition();
  }, Q.version = "19.2.3", Q;
}
var Mr;
function Tf() {
  return Mr || (Mr = 1, gf.exports = mh()), gf.exports;
}
var Vl = Tf(), bf = { exports: {} }, Eu = {}, Sf = { exports: {} }, _f = {};
var Nr;
function hh() {
  return Nr || (Nr = 1, (function(y) {
    function h(z, D) {
      var X = z.length;
      z.push(D);
      l: for (; 0 < X; ) {
        var sl = X - 1 >>> 1, ml = z[sl];
        if (0 < O(ml, D)) z[sl] = D, z[X] = ml, X = sl;
        else break l;
      }
    }
    function _(z) {
      return z.length === 0 ? null : z[0];
    }
    function s(z) {
      if (z.length === 0) return null;
      var D = z[0], X = z.pop();
      if (X !== D) {
        z[0] = X;
        l: for (var sl = 0, ml = z.length, r = ml >>> 1; sl < r; ) {
          var x = 2 * (sl + 1) - 1, U = z[x], R = x + 1, Z = z[R];
          if (0 > O(U, X)) R < ml && 0 > O(Z, U) ? (z[sl] = Z, z[R] = X, sl = R) : (z[sl] = U, z[x] = X, sl = x);
          else if (R < ml && 0 > O(Z, X)) z[sl] = Z, z[R] = X, sl = R;
          else break l;
        }
      }
      return D;
    }
    function O(z, D) {
      var X = z.sortIndex - D.sortIndex;
      return X !== 0 ? X : z.id - D.id;
    }
    if (y.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var H = performance;
      y.unstable_now = function() {
        return H.now();
      };
    } else {
      var B = Date, F = B.now();
      y.unstable_now = function() {
        return B.now() - F;
      };
    }
    var N = [], A = [], K = 1, Y = null, M = 3, bl = false, el = false, tl = false, Ul = false, J = typeof setTimeout == "function" ? setTimeout : null, jl = typeof clearTimeout == "function" ? clearTimeout : null, El = typeof setImmediate < "u" ? setImmediate : null;
    function rt(z) {
      for (var D = _(A); D !== null; ) {
        if (D.callback === null) s(A);
        else if (D.startTime <= z) s(A), D.sortIndex = D.expirationTime, h(N, D);
        else break;
        D = _(A);
      }
    }
    function At(z) {
      if (tl = false, rt(z), !el) if (_(N) !== null) el = true, Kl || (Kl = true, wl());
      else {
        var D = _(A);
        D !== null && zt(At, D.startTime - z);
      }
    }
    var Kl = false, P = -1, Jl = 5, Ot = -1;
    function Ve() {
      return Ul ? true : !(y.unstable_now() - Ot < Jl);
    }
    function Mt() {
      if (Ul = false, Kl) {
        var z = y.unstable_now();
        Ot = z;
        var D = true;
        try {
          l: {
            el = false, tl && (tl = false, jl(P), P = -1), bl = true;
            var X = M;
            try {
              t: {
                for (rt(z), Y = _(N); Y !== null && !(Y.expirationTime > z && Ve()); ) {
                  var sl = Y.callback;
                  if (typeof sl == "function") {
                    Y.callback = null, M = Y.priorityLevel;
                    var ml = sl(Y.expirationTime <= z);
                    if (z = y.unstable_now(), typeof ml == "function") {
                      Y.callback = ml, rt(z), D = true;
                      break t;
                    }
                    Y === _(N) && s(N), rt(z);
                  } else s(N);
                  Y = _(N);
                }
                if (Y !== null) D = true;
                else {
                  var r = _(A);
                  r !== null && zt(At, r.startTime - z), D = false;
                }
              }
              break l;
            } finally {
              Y = null, M = X, bl = false;
            }
            D = void 0;
          }
        } finally {
          D ? wl() : Kl = false;
        }
      }
    }
    var wl;
    if (typeof El == "function") wl = function() {
      El(Mt);
    };
    else if (typeof MessageChannel < "u") {
      var Te = new MessageChannel(), Ht = Te.port2;
      Te.port1.onmessage = Mt, wl = function() {
        Ht.postMessage(null);
      };
    } else wl = function() {
      J(Mt, 0);
    };
    function zt(z, D) {
      P = J(function() {
        z(y.unstable_now());
      }, D);
    }
    y.unstable_IdlePriority = 5, y.unstable_ImmediatePriority = 1, y.unstable_LowPriority = 4, y.unstable_NormalPriority = 3, y.unstable_Profiling = null, y.unstable_UserBlockingPriority = 2, y.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, y.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Jl = 0 < z ? Math.floor(1e3 / z) : 5;
    }, y.unstable_getCurrentPriorityLevel = function() {
      return M;
    }, y.unstable_next = function(z) {
      switch (M) {
        case 1:
        case 2:
        case 3:
          var D = 3;
          break;
        default:
          D = M;
      }
      var X = M;
      M = D;
      try {
        return z();
      } finally {
        M = X;
      }
    }, y.unstable_requestPaint = function() {
      Ul = true;
    }, y.unstable_runWithPriority = function(z, D) {
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
      var X = M;
      M = z;
      try {
        return D();
      } finally {
        M = X;
      }
    }, y.unstable_scheduleCallback = function(z, D, X) {
      var sl = y.unstable_now();
      switch (typeof X == "object" && X !== null ? (X = X.delay, X = typeof X == "number" && 0 < X ? sl + X : sl) : X = sl, z) {
        case 1:
          var ml = -1;
          break;
        case 2:
          ml = 250;
          break;
        case 5:
          ml = 1073741823;
          break;
        case 4:
          ml = 1e4;
          break;
        default:
          ml = 5e3;
      }
      return ml = X + ml, z = { id: K++, callback: D, priorityLevel: z, startTime: X, expirationTime: ml, sortIndex: -1 }, X > sl ? (z.sortIndex = X, h(A, z), _(N) === null && z === _(A) && (tl ? (jl(P), P = -1) : tl = true, zt(At, X - sl))) : (z.sortIndex = ml, h(N, z), el || bl || (el = true, Kl || (Kl = true, wl()))), z;
    }, y.unstable_shouldYield = Ve, y.unstable_wrapCallback = function(z) {
      var D = M;
      return function() {
        var X = M;
        M = D;
        try {
          return z.apply(this, arguments);
        } finally {
          M = X;
        }
      };
    };
  })(_f)), _f;
}
var Dr;
function vh() {
  return Dr || (Dr = 1, Sf.exports = hh()), Sf.exports;
}
var pf = { exports: {} }, Ql = {};
var Ur;
function yh() {
  if (Ur) return Ql;
  Ur = 1;
  var y = Tf();
  function h(N) {
    var A = "https://react.dev/errors/" + N;
    if (1 < arguments.length) {
      A += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var K = 2; K < arguments.length; K++) A += "&args[]=" + encodeURIComponent(arguments[K]);
    }
    return "Minified React error #" + N + "; visit " + A + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function _() {
  }
  var s = { d: { f: _, r: function() {
    throw Error(h(522));
  }, D: _, C: _, L: _, m: _, X: _, S: _, M: _ }, p: 0, findDOMNode: null }, O = /* @__PURE__ */ Symbol.for("react.portal");
  function H(N, A, K) {
    var Y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: O, key: Y == null ? null : "" + Y, children: N, containerInfo: A, implementation: K };
  }
  var B = y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function F(N, A) {
    if (N === "font") return "";
    if (typeof A == "string") return A === "use-credentials" ? A : "";
  }
  return Ql.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Ql.createPortal = function(N, A) {
    var K = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!A || A.nodeType !== 1 && A.nodeType !== 9 && A.nodeType !== 11) throw Error(h(299));
    return H(N, A, null, K);
  }, Ql.flushSync = function(N) {
    var A = B.T, K = s.p;
    try {
      if (B.T = null, s.p = 2, N) return N();
    } finally {
      B.T = A, s.p = K, s.d.f();
    }
  }, Ql.preconnect = function(N, A) {
    typeof N == "string" && (A ? (A = A.crossOrigin, A = typeof A == "string" ? A === "use-credentials" ? A : "" : void 0) : A = null, s.d.C(N, A));
  }, Ql.prefetchDNS = function(N) {
    typeof N == "string" && s.d.D(N);
  }, Ql.preinit = function(N, A) {
    if (typeof N == "string" && A && typeof A.as == "string") {
      var K = A.as, Y = F(K, A.crossOrigin), M = typeof A.integrity == "string" ? A.integrity : void 0, bl = typeof A.fetchPriority == "string" ? A.fetchPriority : void 0;
      K === "style" ? s.d.S(N, typeof A.precedence == "string" ? A.precedence : void 0, { crossOrigin: Y, integrity: M, fetchPriority: bl }) : K === "script" && s.d.X(N, { crossOrigin: Y, integrity: M, fetchPriority: bl, nonce: typeof A.nonce == "string" ? A.nonce : void 0 });
    }
  }, Ql.preinitModule = function(N, A) {
    if (typeof N == "string") if (typeof A == "object" && A !== null) {
      if (A.as == null || A.as === "script") {
        var K = F(A.as, A.crossOrigin);
        s.d.M(N, { crossOrigin: K, integrity: typeof A.integrity == "string" ? A.integrity : void 0, nonce: typeof A.nonce == "string" ? A.nonce : void 0 });
      }
    } else A == null && s.d.M(N);
  }, Ql.preload = function(N, A) {
    if (typeof N == "string" && typeof A == "object" && A !== null && typeof A.as == "string") {
      var K = A.as, Y = F(K, A.crossOrigin);
      s.d.L(N, K, { crossOrigin: Y, integrity: typeof A.integrity == "string" ? A.integrity : void 0, nonce: typeof A.nonce == "string" ? A.nonce : void 0, type: typeof A.type == "string" ? A.type : void 0, fetchPriority: typeof A.fetchPriority == "string" ? A.fetchPriority : void 0, referrerPolicy: typeof A.referrerPolicy == "string" ? A.referrerPolicy : void 0, imageSrcSet: typeof A.imageSrcSet == "string" ? A.imageSrcSet : void 0, imageSizes: typeof A.imageSizes == "string" ? A.imageSizes : void 0, media: typeof A.media == "string" ? A.media : void 0 });
    }
  }, Ql.preloadModule = function(N, A) {
    if (typeof N == "string") if (A) {
      var K = F(A.as, A.crossOrigin);
      s.d.m(N, { as: typeof A.as == "string" && A.as !== "script" ? A.as : void 0, crossOrigin: K, integrity: typeof A.integrity == "string" ? A.integrity : void 0 });
    } else s.d.m(N);
  }, Ql.requestFormReset = function(N) {
    s.d.r(N);
  }, Ql.unstable_batchedUpdates = function(N, A) {
    return N(A);
  }, Ql.useFormState = function(N, A, K) {
    return B.H.useFormState(N, A, K);
  }, Ql.useFormStatus = function() {
    return B.H.useHostTransitionStatus();
  }, Ql.version = "19.2.3", Ql;
}
var jr;
function gh() {
  if (jr) return pf.exports;
  jr = 1;
  function y() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(y);
    } catch (h) {
      console.error(h);
    }
  }
  return y(), pf.exports = yh(), pf.exports;
}
var Hr;
function bh() {
  if (Hr) return Eu;
  Hr = 1;
  var y = vh(), h = Tf(), _ = gh();
  function s(l) {
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
  function B(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function F(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function N(l) {
    if (H(l) !== l) throw Error(s(188));
  }
  function A(l) {
    var t = l.alternate;
    if (!t) {
      if (t = H(l), t === null) throw Error(s(188));
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
          if (n === e) return N(u), l;
          if (n === a) return N(u), t;
          n = n.sibling;
        }
        throw Error(s(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var i = false, c = u.child; c; ) {
          if (c === e) {
            i = true, e = u, a = n;
            break;
          }
          if (c === a) {
            i = true, a = u, e = n;
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = n.child; c; ) {
            if (c === e) {
              i = true, e = n, a = u;
              break;
            }
            if (c === a) {
              i = true, a = n, e = u;
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (e.alternate !== a) throw Error(s(190));
    }
    if (e.tag !== 3) throw Error(s(188));
    return e.stateNode.current === e ? l : t;
  }
  function K(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = K(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var Y = Object.assign, M = /* @__PURE__ */ Symbol.for("react.element"), bl = /* @__PURE__ */ Symbol.for("react.transitional.element"), el = /* @__PURE__ */ Symbol.for("react.portal"), tl = /* @__PURE__ */ Symbol.for("react.fragment"), Ul = /* @__PURE__ */ Symbol.for("react.strict_mode"), J = /* @__PURE__ */ Symbol.for("react.profiler"), jl = /* @__PURE__ */ Symbol.for("react.consumer"), El = /* @__PURE__ */ Symbol.for("react.context"), rt = /* @__PURE__ */ Symbol.for("react.forward_ref"), At = /* @__PURE__ */ Symbol.for("react.suspense"), Kl = /* @__PURE__ */ Symbol.for("react.suspense_list"), P = /* @__PURE__ */ Symbol.for("react.memo"), Jl = /* @__PURE__ */ Symbol.for("react.lazy"), Ot = /* @__PURE__ */ Symbol.for("react.activity"), Ve = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Mt = Symbol.iterator;
  function wl(l) {
    return l === null || typeof l != "object" ? null : (l = Mt && l[Mt] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Te = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Ht(l) {
    if (l == null) return null;
    if (typeof l == "function") return l.$$typeof === Te ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case tl:
        return "Fragment";
      case J:
        return "Profiler";
      case Ul:
        return "StrictMode";
      case At:
        return "Suspense";
      case Kl:
        return "SuspenseList";
      case Ot:
        return "Activity";
    }
    if (typeof l == "object") switch (l.$$typeof) {
      case el:
        return "Portal";
      case El:
        return l.displayName || "Context";
      case jl:
        return (l._context.displayName || "Context") + ".Consumer";
      case rt:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case P:
        return t = l.displayName || null, t !== null ? t : Ht(l.type) || "Memo";
      case Jl:
        t = l._payload, l = l._init;
        try {
          return Ht(l(t));
        } catch {
        }
    }
    return null;
  }
  var zt = Array.isArray, z = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = _.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = { pending: false, data: null, method: null, action: null }, sl = [], ml = -1;
  function r(l) {
    return { current: l };
  }
  function x(l) {
    0 > ml || (l.current = sl[ml], sl[ml] = null, ml--);
  }
  function U(l, t) {
    ml++, sl[ml] = l.current, l.current = t;
  }
  var R = r(null), Z = r(null), w = r(null), il = r(null);
  function Zl(l, t) {
    switch (U(w, t), U(Z, l), U(R, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? $d(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI) t = $d(t), l = Wd(t, l);
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
    x(R), U(R, l);
  }
  function pl() {
    x(R), x(Z), x(w);
  }
  function Da(l) {
    l.memoizedState !== null && U(il, l);
    var t = R.current, e = Wd(t, l.type);
    t !== e && (U(Z, l), U(R, e));
  }
  function Ou(l) {
    Z.current === l && (x(R), x(Z)), il.current === l && (x(il), Su._currentValue = X);
  }
  var kn, Ef;
  function Ee(l) {
    if (kn === void 0) try {
      throw Error();
    } catch (e) {
      var t = e.stack.trim().match(/\n( *(at )?)/);
      kn = t && t[1] || "", Ef = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + kn + l + Ef;
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
            var E = function() {
              throw Error();
            };
            if (Object.defineProperty(E.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(E, []);
              } catch (b) {
                var g = b;
              }
              Reflect.construct(l, [], E);
            } else {
              try {
                E.call();
              } catch (b) {
                g = b;
              }
              l.call(E.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (b) {
              g = b;
            }
            (E = l()) && typeof E.catch == "function" && E.catch(function() {
            });
          }
        } catch (b) {
          if (b && g && typeof b.stack == "string") return [b.stack, g.stack];
        }
        return [null, null];
      } };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
      u && u.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var n = a.DetermineComponentFrameRoot(), i = n[0], c = n[1];
      if (i && c) {
        var f = i.split(`
`), v = c.split(`
`);
        for (u = a = 0; a < f.length && !f[a].includes("DetermineComponentFrameRoot"); ) a++;
        for (; u < v.length && !v[u].includes("DetermineComponentFrameRoot"); ) u++;
        if (a === f.length || u === v.length) for (a = f.length - 1, u = v.length - 1; 1 <= a && 0 <= u && f[a] !== v[u]; ) u--;
        for (; 1 <= a && 0 <= u; a--, u--) if (f[a] !== v[u]) {
          if (a !== 1 || u !== 1) do
            if (a--, u--, 0 > u || f[a] !== v[u]) {
              var p = `
` + f[a].replace(" at new ", " at ");
              return l.displayName && p.includes("<anonymous>") && (p = p.replace("<anonymous>", l.displayName)), p;
            }
          while (1 <= a && 0 <= u);
          break;
        }
      }
    } finally {
      In = false, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? Ee(e) : "";
  }
  function Qr(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Ee(l.type);
      case 16:
        return Ee("Lazy");
      case 13:
        return l.child !== t && t !== null ? Ee("Suspense Fallback") : Ee("Suspense");
      case 19:
        return Ee("SuspenseList");
      case 0:
      case 15:
        return Pn(l.type, false);
      case 11:
        return Pn(l.type.render, false);
      case 1:
        return Pn(l.type, true);
      case 31:
        return Ee("Activity");
      default:
        return "";
    }
  }
  function xf(l) {
    try {
      var t = "", e = null;
      do
        t += Qr(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var li = Object.prototype.hasOwnProperty, ti = y.unstable_scheduleCallback, ei = y.unstable_cancelCallback, Zr = y.unstable_shouldYield, Lr = y.unstable_requestPaint, tt = y.unstable_now, Vr = y.unstable_getCurrentPriorityLevel, Af = y.unstable_ImmediatePriority, Of = y.unstable_UserBlockingPriority, Mu = y.unstable_NormalPriority, Kr = y.unstable_LowPriority, Mf = y.unstable_IdlePriority, Jr = y.log, wr = y.unstable_setDisableYieldValue, Ua = null, et = null;
  function It(l) {
    if (typeof Jr == "function" && wr(l), et && typeof et.setStrictMode == "function") try {
      et.setStrictMode(Ua, l);
    } catch {
    }
  }
  var at = Math.clz32 ? Math.clz32 : Fr, $r = Math.log, Wr = Math.LN2;
  function Fr(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - ($r(l) / Wr | 0) | 0;
  }
  var Nu = 256, Du = 262144, Uu = 4194304;
  function xe(l) {
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
  function ju(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = xe(a) : (i &= c, i !== 0 ? u = xe(i) : e || (e = c & ~l, e !== 0 && (u = xe(e))))) : (c = a & ~n, c !== 0 ? u = xe(c) : i !== 0 ? u = xe(i) : e || (e = a & ~l, e !== 0 && (u = xe(e)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
  }
  function ja(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function kr(l, t) {
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
  function Nf() {
    var l = Uu;
    return Uu <<= 1, (Uu & 62914560) === 0 && (Uu = 4194304), l;
  }
  function ai(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function Ha(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function Ir(l, t, e, a, u, n) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var c = l.entanglements, f = l.expirationTimes, v = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var p = 31 - at(e), E = 1 << p;
      c[p] = 0, f[p] = -1;
      var g = v[p];
      if (g !== null) for (v[p] = null, p = 0; p < g.length; p++) {
        var b = g[p];
        b !== null && (b.lane &= -536870913);
      }
      e &= ~E;
    }
    a !== 0 && Df(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
  }
  function Df(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - at(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function Uf(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - at(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function jf(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : ui(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function ui(l) {
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
  function ni(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Hf() {
    var l = D.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : br(l.type));
  }
  function Rf(l, t) {
    var e = D.p;
    try {
      return D.p = l, t();
    } finally {
      D.p = e;
    }
  }
  var Pt = Math.random().toString(36).slice(2), ql = "__reactFiber$" + Pt, $l = "__reactProps$" + Pt, Ke = "__reactContainer$" + Pt, ii = "__reactEvents$" + Pt, Pr = "__reactListeners$" + Pt, lo = "__reactHandles$" + Pt, Cf = "__reactResources$" + Pt, Ra = "__reactMarker$" + Pt;
  function ci(l) {
    delete l[ql], delete l[$l], delete l[ii], delete l[Pr], delete l[lo];
  }
  function Je(l) {
    var t = l[ql];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[Ke] || e[ql]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null) for (l = er(l); l !== null; ) {
          if (e = l[ql]) return e;
          l = er(l);
        }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function we(l) {
    if (l = l[ql] || l[Ke]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return l;
    }
    return null;
  }
  function Ca(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(s(33));
  }
  function $e(l) {
    var t = l[Cf];
    return t || (t = l[Cf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Hl(l) {
    l[Ra] = true;
  }
  var qf = /* @__PURE__ */ new Set(), Bf = {};
  function Ae(l, t) {
    We(l, t), We(l + "Capture", t);
  }
  function We(l, t) {
    for (Bf[l] = t, l = 0; l < t.length; l++) qf.add(t[l]);
  }
  var to = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Yf = {}, Gf = {};
  function eo(l) {
    return li.call(Gf, l) ? true : li.call(Yf, l) ? false : to.test(l) ? Gf[l] = true : (Yf[l] = true, false);
  }
  function Hu(l, t, e) {
    if (eo(t)) if (e === null) l.removeAttribute(t);
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
  function Ru(l, t, e) {
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
  function Rt(l, t, e, a) {
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
  function Xf(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ao(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, n = a.set;
      return Object.defineProperty(l, t, { configurable: true, get: function() {
        return u.call(this);
      }, set: function(i) {
        e = "" + i, n.call(this, i);
      } }), Object.defineProperty(l, t, { enumerable: a.enumerable }), { getValue: function() {
        return e;
      }, setValue: function(i) {
        e = "" + i;
      }, stopTracking: function() {
        l._valueTracker = null, delete l[t];
      } };
    }
  }
  function fi(l) {
    if (!l._valueTracker) {
      var t = Xf(l) ? "checked" : "value";
      l._valueTracker = ao(l, t, "" + l[t]);
    }
  }
  function Qf(l) {
    if (!l) return false;
    var t = l._valueTracker;
    if (!t) return true;
    var e = t.getValue(), a = "";
    return l && (a = Xf(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), true) : false;
  }
  function Cu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var uo = /[\n"\\]/g;
  function mt(l) {
    return l.replace(uo, function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function si(l, t, e, a, u, n, i, c) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + ot(t)) : l.value !== "" + ot(t) && (l.value = "" + ot(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? di(l, i, ot(t)) : e != null ? di(l, i, ot(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + ot(c) : l.removeAttribute("name");
  }
  function Zf(l, t, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        fi(l);
        return;
      }
      e = e != null ? "" + ot(e) : "", t = t != null ? "" + ot(t) : e, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), fi(l);
  }
  function di(l, t, e) {
    t === "number" && Cu(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function Fe(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < e.length; u++) t["$" + e[u]] = true;
      for (e = 0; e < l.length; e++) u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = true);
    } else {
      for (e = "" + ot(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          l[u].selected = true, a && (l[u].defaultSelected = true);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = true);
    }
  }
  function Lf(l, t, e) {
    if (t != null && (t = "" + ot(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + ot(e) : "";
  }
  function Vf(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (zt(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = ot(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), fi(l);
  }
  function ke(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var no = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function Kf(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || no.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Jf(l, t, e) {
    if (t != null && typeof t != "object") throw Error(s(62));
    if (l = l.style, e != null) {
      for (var a in e) !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var u in t) a = t[u], t.hasOwnProperty(u) && e[u] !== a && Kf(l, u, a);
    } else for (var n in t) t.hasOwnProperty(n) && Kf(l, n, t[n]);
  }
  function ri(l) {
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
  var io = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), co = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function qu(l) {
    return co.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Ct() {
  }
  var oi = null;
  function mi(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Ie = null, Pe = null;
  function wf(l) {
    var t = we(l);
    if (t && (l = t.stateNode)) {
      var e = l[$l] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (si(l, e.value, e.defaultValue, e.defaultValue, e.checked, e.defaultChecked, e.type, e.name), t = e.name, e.type === "radio" && t != null) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll('input[name="' + mt("" + t) + '"][type="radio"]'), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[$l] || null;
                if (!u) throw Error(s(90));
                si(a, u.value, u.defaultValue, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name);
              }
            }
            for (t = 0; t < e.length; t++) a = e[t], a.form === l.form && Qf(a);
          }
          break l;
        case "textarea":
          Lf(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && Fe(l, !!e.multiple, t, false);
      }
    }
  }
  var hi = false;
  function $f(l, t, e) {
    if (hi) return l(t, e);
    hi = true;
    try {
      var a = l(t);
      return a;
    } finally {
      if (hi = false, (Ie !== null || Pe !== null) && (En(), Ie && (t = Ie, l = Pe, Pe = Ie = null, wf(t), l))) for (t = 0; t < l.length; t++) wf(l[t]);
    }
  }
  function qa(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[$l] || null;
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
  var qt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), vi = false;
  if (qt) try {
    var Ba = {};
    Object.defineProperty(Ba, "passive", { get: function() {
      vi = true;
    } }), window.addEventListener("test", Ba, Ba), window.removeEventListener("test", Ba, Ba);
  } catch {
    vi = false;
  }
  var le = null, yi = null, Bu = null;
  function Wf() {
    if (Bu) return Bu;
    var l, t = yi, e = t.length, a, u = "value" in le ? le.value : le.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === u[n - a]; a++) ;
    return Bu = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function Yu(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Gu() {
    return true;
  }
  function Ff() {
    return false;
  }
  function Wl(l) {
    function t(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in l) l.hasOwnProperty(c) && (e = l[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === false) ? Gu : Ff, this.isPropagationStopped = Ff, this;
    }
    return Y(t.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var e = this.nativeEvent;
      e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = false), this.isDefaultPrevented = Gu);
    }, stopPropagation: function() {
      var e = this.nativeEvent;
      e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = true), this.isPropagationStopped = Gu);
    }, persist: function() {
    }, isPersistent: Gu }), t;
  }
  var Oe = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(l) {
    return l.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Xu = Wl(Oe), Ya = Y({}, Oe, { view: 0, detail: 0 }), fo = Wl(Ya), gi, bi, Ga, Qu = Y({}, Ya, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: _i, button: 0, buttons: 0, relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  }, movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== Ga && (Ga && l.type === "mousemove" ? (gi = l.screenX - Ga.screenX, bi = l.screenY - Ga.screenY) : bi = gi = 0, Ga = l), gi);
  }, movementY: function(l) {
    return "movementY" in l ? l.movementY : bi;
  } }), kf = Wl(Qu), so = Y({}, Qu, { dataTransfer: 0 }), ro = Wl(so), oo = Y({}, Ya, { relatedTarget: 0 }), Si = Wl(oo), mo = Y({}, Oe, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), ho = Wl(mo), vo = Y({}, Oe, { clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  } }), yo = Wl(vo), go = Y({}, Oe, { data: 0 }), If = Wl(go), bo = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, So = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, _o = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function po(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = _o[l]) ? !!t[l] : false;
  }
  function _i() {
    return po;
  }
  var zo = Y({}, Ya, { key: function(l) {
    if (l.key) {
      var t = bo[l.key] || l.key;
      if (t !== "Unidentified") return t;
    }
    return l.type === "keypress" ? (l = Yu(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? So[l.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: _i, charCode: function(l) {
    return l.type === "keypress" ? Yu(l) : 0;
  }, keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }, which: function(l) {
    return l.type === "keypress" ? Yu(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  } }), To = Wl(zo), Eo = Y({}, Qu, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Pf = Wl(Eo), xo = Y({}, Ya, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: _i }), Ao = Wl(xo), Oo = Y({}, Oe, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Mo = Wl(Oo), No = Y({}, Qu, { deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  }, deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), Do = Wl(No), Uo = Y({}, Oe, { newState: 0, oldState: 0 }), jo = Wl(Uo), Ho = [9, 13, 27, 32], pi = qt && "CompositionEvent" in window, Xa = null;
  qt && "documentMode" in document && (Xa = document.documentMode);
  var Ro = qt && "TextEvent" in window && !Xa, ls = qt && (!pi || Xa && 8 < Xa && 11 >= Xa), ts = " ", es = false;
  function as(l, t) {
    switch (l) {
      case "keyup":
        return Ho.indexOf(t.keyCode) !== -1;
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
  var la = false;
  function Co(l, t) {
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
  function qo(l, t) {
    if (la) return l === "compositionend" || !pi && as(l, t) ? (l = Wf(), Bu = yi = le = null, la = false, l) : null;
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
  var Bo = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function ns(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Bo[l.type] : t === "textarea";
  }
  function is(l, t, e, a) {
    Ie ? Pe ? Pe.push(a) : Pe = [a] : Ie = a, t = Un(t, "onChange"), 0 < t.length && (e = new Xu("onChange", "change", null, e, a), l.push({ event: e, listeners: t }));
  }
  var Qa = null, Za = null;
  function Yo(l) {
    Zd(l, 0);
  }
  function Zu(l) {
    var t = Ca(l);
    if (Qf(t)) return l;
  }
  function cs(l, t) {
    if (l === "change") return t;
  }
  var fs = false;
  if (qt) {
    var zi;
    if (qt) {
      var Ti = "oninput" in document;
      if (!Ti) {
        var ss = document.createElement("div");
        ss.setAttribute("oninput", "return;"), Ti = typeof ss.oninput == "function";
      }
      zi = Ti;
    } else zi = false;
    fs = zi && (!document.documentMode || 9 < document.documentMode);
  }
  function ds() {
    Qa && (Qa.detachEvent("onpropertychange", rs), Za = Qa = null);
  }
  function rs(l) {
    if (l.propertyName === "value" && Zu(Za)) {
      var t = [];
      is(t, Za, l, mi(l)), $f(Yo, t);
    }
  }
  function Go(l, t, e) {
    l === "focusin" ? (ds(), Qa = t, Za = e, Qa.attachEvent("onpropertychange", rs)) : l === "focusout" && ds();
  }
  function Xo(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown") return Zu(Za);
  }
  function Qo(l, t) {
    if (l === "click") return Zu(t);
  }
  function Zo(l, t) {
    if (l === "input" || l === "change") return Zu(t);
  }
  function Lo(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var ut = typeof Object.is == "function" ? Object.is : Lo;
  function La(l, t) {
    if (ut(l, t)) return true;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null) return false;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return false;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!li.call(t, u) || !ut(l[u], t[u])) return false;
    }
    return true;
  }
  function os(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function ms(l, t) {
    var e = os(l);
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
      e = os(e);
    }
  }
  function hs(l, t) {
    return l && t ? l === t ? true : l && l.nodeType === 3 ? false : t && t.nodeType === 3 ? hs(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : false : false;
  }
  function vs(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = Cu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = false;
      }
      if (e) l = t.contentWindow;
      else break;
      t = Cu(l.document);
    }
    return t;
  }
  function Ei(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Vo = qt && "documentMode" in document && 11 >= document.documentMode, ta = null, xi = null, Va = null, Ai = false;
  function ys(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Ai || ta == null || ta !== Cu(a) || (a = ta, "selectionStart" in a && Ei(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = { anchorNode: a.anchorNode, anchorOffset: a.anchorOffset, focusNode: a.focusNode, focusOffset: a.focusOffset }), Va && La(Va, a) || (Va = a, a = Un(xi, "onSelect"), 0 < a.length && (t = new Xu("onSelect", "select", null, t, e), l.push({ event: t, listeners: a }), t.target = ta)));
  }
  function Me(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var ea = { animationend: Me("Animation", "AnimationEnd"), animationiteration: Me("Animation", "AnimationIteration"), animationstart: Me("Animation", "AnimationStart"), transitionrun: Me("Transition", "TransitionRun"), transitionstart: Me("Transition", "TransitionStart"), transitioncancel: Me("Transition", "TransitionCancel"), transitionend: Me("Transition", "TransitionEnd") }, Oi = {}, gs = {};
  qt && (gs = document.createElement("div").style, "AnimationEvent" in window || (delete ea.animationend.animation, delete ea.animationiteration.animation, delete ea.animationstart.animation), "TransitionEvent" in window || delete ea.transitionend.transition);
  function Ne(l) {
    if (Oi[l]) return Oi[l];
    if (!ea[l]) return l;
    var t = ea[l], e;
    for (e in t) if (t.hasOwnProperty(e) && e in gs) return Oi[l] = t[e];
    return l;
  }
  var bs = Ne("animationend"), Ss = Ne("animationiteration"), _s = Ne("animationstart"), Ko = Ne("transitionrun"), Jo = Ne("transitionstart"), wo = Ne("transitioncancel"), ps = Ne("transitionend"), zs = /* @__PURE__ */ new Map(), Mi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  Mi.push("scrollEnd");
  function Tt(l, t) {
    zs.set(l, t), Ae(t, [l]);
  }
  var Lu = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l), error: l });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, ht = [], aa = 0, Ni = 0;
  function Vu() {
    for (var l = aa, t = Ni = aa = 0; t < l; ) {
      var e = ht[t];
      ht[t++] = null;
      var a = ht[t];
      ht[t++] = null;
      var u = ht[t];
      ht[t++] = null;
      var n = ht[t];
      if (ht[t++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && Ts(e, u, n);
    }
  }
  function Ku(l, t, e, a) {
    ht[aa++] = l, ht[aa++] = t, ht[aa++] = e, ht[aa++] = a, Ni |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function Di(l, t, e, a) {
    return Ku(l, t, e, a), Ju(l);
  }
  function De(l, t) {
    return Ku(l, null, null, t), Ju(l);
  }
  function Ts(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = false, n = l.return; n !== null; ) n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = true)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - at(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function Ju(l) {
    if (50 < ou) throw ou = 0, Gc = null, Error(s(185));
    for (var t = l.return; t !== null; ) l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ua = {};
  function $o(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function nt(l, t, e, a) {
    return new $o(l, t, e, a);
  }
  function Ui(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Bt(l, t) {
    var e = l.alternate;
    return e === null ? (e = nt(l.tag, t, l.key, l.mode), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function Es(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), l;
  }
  function wu(l, t, e, a, u, n) {
    var i = 0;
    if (a = l, typeof l == "function") Ui(l) && (i = 1);
    else if (typeof l == "string") i = Pm(l, e, R.current) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else l: switch (l) {
      case Ot:
        return l = nt(31, e, t, u), l.elementType = Ot, l.lanes = n, l;
      case tl:
        return Ue(e.children, u, n, t);
      case Ul:
        i = 8, u |= 24;
        break;
      case J:
        return l = nt(12, e, t, u | 2), l.elementType = J, l.lanes = n, l;
      case At:
        return l = nt(13, e, t, u), l.elementType = At, l.lanes = n, l;
      case Kl:
        return l = nt(19, e, t, u), l.elementType = Kl, l.lanes = n, l;
      default:
        if (typeof l == "object" && l !== null) switch (l.$$typeof) {
          case El:
            i = 10;
            break l;
          case jl:
            i = 9;
            break l;
          case rt:
            i = 11;
            break l;
          case P:
            i = 14;
            break l;
          case Jl:
            i = 16, a = null;
            break l;
        }
        i = 29, e = Error(s(130, l === null ? "null" : typeof l, "")), a = null;
    }
    return t = nt(i, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function Ue(l, t, e, a) {
    return l = nt(7, l, a, t), l.lanes = e, l;
  }
  function ji(l, t, e) {
    return l = nt(6, l, null, t), l.lanes = e, l;
  }
  function xs(l) {
    var t = nt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function Hi(l, t, e) {
    return t = nt(4, l.children !== null ? l.children : [], l.key, t), t.lanes = e, t.stateNode = { containerInfo: l.containerInfo, pendingChildren: null, implementation: l.implementation }, t;
  }
  var As = /* @__PURE__ */ new WeakMap();
  function vt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = As.get(l);
      return e !== void 0 ? e : (t = { value: l, source: t, stack: xf(t) }, As.set(l, t), t);
    }
    return { value: l, source: t, stack: xf(t) };
  }
  var na = [], ia = 0, $u = null, Ka = 0, yt = [], gt = 0, te = null, Nt = 1, Dt = "";
  function Yt(l, t) {
    na[ia++] = Ka, na[ia++] = $u, $u = l, Ka = t;
  }
  function Os(l, t, e) {
    yt[gt++] = Nt, yt[gt++] = Dt, yt[gt++] = te, te = l;
    var a = Nt;
    l = Dt;
    var u = 32 - at(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - at(t) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, Nt = 1 << 32 - at(t) + u | e << u | a, Dt = n + l;
    } else Nt = 1 << n | e << u | a, Dt = l;
  }
  function Ri(l) {
    l.return !== null && (Yt(l, 1), Os(l, 1, 0));
  }
  function Ci(l) {
    for (; l === $u; ) $u = na[--ia], na[ia] = null, Ka = na[--ia], na[ia] = null;
    for (; l === te; ) te = yt[--gt], yt[gt] = null, Dt = yt[--gt], yt[gt] = null, Nt = yt[--gt], yt[gt] = null;
  }
  function Ms(l, t) {
    yt[gt++] = Nt, yt[gt++] = Dt, yt[gt++] = te, Nt = t.id, Dt = t.overflow, te = l;
  }
  var Bl = null, vl = null, ll = false, ee = null, bt = false, qi = Error(s(519));
  function ae(l) {
    var t = Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
    throw Ja(vt(t, l)), qi;
  }
  function Ns(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[ql] = l, t[$l] = a, e) {
      case "dialog":
        W("cancel", t), W("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        W("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < hu.length; e++) W(hu[e], t);
        break;
      case "source":
        W("error", t);
        break;
      case "img":
      case "image":
      case "link":
        W("error", t), W("load", t);
        break;
      case "details":
        W("toggle", t);
        break;
      case "input":
        W("invalid", t), Zf(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, true);
        break;
      case "select":
        W("invalid", t);
        break;
      case "textarea":
        W("invalid", t), Vf(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === true || Jd(t.textContent, e) ? (a.popover != null && (W("beforetoggle", t), W("toggle", t)), a.onScroll != null && W("scroll", t), a.onScrollEnd != null && W("scrollend", t), a.onClick != null && (t.onclick = Ct), t = true) : t = false, t || ae(l, true);
  }
  function Ds(l) {
    for (Bl = l.return; Bl; ) switch (Bl.tag) {
      case 5:
      case 31:
      case 13:
        bt = false;
        return;
      case 27:
      case 3:
        bt = true;
        return;
      default:
        Bl = Bl.return;
    }
  }
  function ca(l) {
    if (l !== Bl) return false;
    if (!ll) return Ds(l), ll = true, false;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || lf(l.type, l.memoizedProps)), e = !e), e && vl && ae(l), Ds(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      vl = tr(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      vl = tr(l);
    } else t === 27 ? (t = vl, ge(l.type) ? (l = nf, nf = null, vl = l) : vl = t) : vl = Bl ? _t(l.stateNode.nextSibling) : null;
    return true;
  }
  function je() {
    vl = Bl = null, ll = false;
  }
  function Bi() {
    var l = ee;
    return l !== null && (Pl === null ? Pl = l : Pl.push.apply(Pl, l), ee = null), l;
  }
  function Ja(l) {
    ee === null ? ee = [l] : ee.push(l);
  }
  var Yi = r(null), He = null, Gt = null;
  function ue(l, t, e) {
    U(Yi, t._currentValue), t._currentValue = e;
  }
  function Xt(l) {
    l._currentValue = Yi.current, x(Yi);
  }
  function Gi(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function Xi(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var f = 0; f < t.length; f++) if (c.context === t[f]) {
            n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), Gi(n.return, e, l), a || (i = null);
            break l;
          }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(s(341));
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), Gi(i, e, l), i = null;
      } else i = u.child;
      if (i !== null) i.return = u;
      else for (i = u; i !== null; ) {
        if (i === l) {
          i = null;
          break;
        }
        if (u = i.sibling, u !== null) {
          u.return = i.return, i = u;
          break;
        }
        i = i.return;
      }
      u = i;
    }
  }
  function fa(l, t, e, a) {
    l = null;
    for (var u = t, n = false; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = true;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(s(387));
        if (i = i.memoizedProps, i !== null) {
          var c = u.type;
          ut(u.pendingProps.value, i.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (u === il.current) {
        if (i = u.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(Su) : l = [Su]);
      }
      u = u.return;
    }
    l !== null && Xi(t, l, e, a), t.flags |= 262144;
  }
  function Wu(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!ut(l.context._currentValue, l.memoizedValue)) return true;
      l = l.next;
    }
    return false;
  }
  function Re(l) {
    He = l, Gt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Yl(l) {
    return Us(He, l);
  }
  function Fu(l, t) {
    return He === null && Re(l), Us(l, t);
  }
  function Us(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, Gt === null) {
      if (l === null) throw Error(s(308));
      Gt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Gt = Gt.next = t;
    return e;
  }
  var Wo = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = { aborted: false, addEventListener: function(e, a) {
      l.push(a);
    } };
    this.abort = function() {
      t.aborted = true, l.forEach(function(e) {
        return e();
      });
    };
  }, Fo = y.unstable_scheduleCallback, ko = y.unstable_NormalPriority, xl = { $$typeof: El, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function Qi() {
    return { controller: new Wo(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function wa(l) {
    l.refCount--, l.refCount === 0 && Fo(ko, function() {
      l.controller.abort();
    });
  }
  var $a = null, Zi = 0, sa = 0, da = null;
  function Io(l, t) {
    if ($a === null) {
      var e = $a = [];
      Zi = 0, sa = Kc(), da = { status: "pending", value: void 0, then: function(a) {
        e.push(a);
      } };
    }
    return Zi++, t.then(js, js), t;
  }
  function js() {
    if (--Zi === 0 && $a !== null) {
      da !== null && (da.status = "fulfilled");
      var l = $a;
      $a = null, sa = 0, da = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Po(l, t) {
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
    yd = tt(), typeof t == "object" && t !== null && typeof t.then == "function" && Io(l, t), Hs !== null && Hs(l, t);
  };
  var Ce = r(null);
  function Li() {
    var l = Ce.current;
    return l !== null ? l : hl.pooledCache;
  }
  function ku(l, t) {
    t === null ? U(Ce, Ce.current) : U(Ce, t.pool);
  }
  function Rs() {
    var l = Li();
    return l === null ? null : { parent: xl._currentValue, pool: l };
  }
  var ra = Error(s(460)), Vi = Error(s(474)), Iu = Error(s(542)), Pu = { then: function() {
  } };
  function Cs(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function qs(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(Ct, Ct), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Ys(l), l;
      default:
        if (typeof t.status == "string") t.then(Ct, Ct);
        else {
          if (l = hl, l !== null && 100 < l.shellSuspendCounter) throw Error(s(482));
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
        throw Be = t, ra;
    }
  }
  function qe(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Be = e, ra) : e;
    }
  }
  var Be = null;
  function Bs() {
    if (Be === null) throw Error(s(459));
    var l = Be;
    return Be = null, l;
  }
  function Ys(l) {
    if (l === ra || l === Iu) throw Error(s(483));
  }
  var oa = null, Wa = 0;
  function ln(l) {
    var t = Wa;
    return Wa += 1, oa === null && (oa = []), qs(oa, l, t);
  }
  function Fa(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function tn(l, t) {
    throw t.$$typeof === M ? Error(s(525)) : (l = Object.prototype.toString.call(t), Error(s(31, l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l)));
  }
  function Gs(l) {
    function t(o, d) {
      if (l) {
        var m = o.deletions;
        m === null ? (o.deletions = [d], o.flags |= 16) : m.push(d);
      }
    }
    function e(o, d) {
      if (!l) return null;
      for (; d !== null; ) t(o, d), d = d.sibling;
      return null;
    }
    function a(o) {
      for (var d = /* @__PURE__ */ new Map(); o !== null; ) o.key !== null ? d.set(o.key, o) : d.set(o.index, o), o = o.sibling;
      return d;
    }
    function u(o, d) {
      return o = Bt(o, d), o.index = 0, o.sibling = null, o;
    }
    function n(o, d, m) {
      return o.index = m, l ? (m = o.alternate, m !== null ? (m = m.index, m < d ? (o.flags |= 67108866, d) : m) : (o.flags |= 67108866, d)) : (o.flags |= 1048576, d);
    }
    function i(o) {
      return l && o.alternate === null && (o.flags |= 67108866), o;
    }
    function c(o, d, m, T) {
      return d === null || d.tag !== 6 ? (d = ji(m, o.mode, T), d.return = o, d) : (d = u(d, m), d.return = o, d);
    }
    function f(o, d, m, T) {
      var q = m.type;
      return q === tl ? p(o, d, m.props.children, T, m.key) : d !== null && (d.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Jl && qe(q) === d.type) ? (d = u(d, m.props), Fa(d, m), d.return = o, d) : (d = wu(m.type, m.key, m.props, null, o.mode, T), Fa(d, m), d.return = o, d);
    }
    function v(o, d, m, T) {
      return d === null || d.tag !== 4 || d.stateNode.containerInfo !== m.containerInfo || d.stateNode.implementation !== m.implementation ? (d = Hi(m, o.mode, T), d.return = o, d) : (d = u(d, m.children || []), d.return = o, d);
    }
    function p(o, d, m, T, q) {
      return d === null || d.tag !== 7 ? (d = Ue(m, o.mode, T, q), d.return = o, d) : (d = u(d, m), d.return = o, d);
    }
    function E(o, d, m) {
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint") return d = ji("" + d, o.mode, m), d.return = o, d;
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case bl:
            return m = wu(d.type, d.key, d.props, null, o.mode, m), Fa(m, d), m.return = o, m;
          case el:
            return d = Hi(d, o.mode, m), d.return = o, d;
          case Jl:
            return d = qe(d), E(o, d, m);
        }
        if (zt(d) || wl(d)) return d = Ue(d, o.mode, m, null), d.return = o, d;
        if (typeof d.then == "function") return E(o, ln(d), m);
        if (d.$$typeof === El) return E(o, Fu(o, d), m);
        tn(o, d);
      }
      return null;
    }
    function g(o, d, m, T) {
      var q = d !== null ? d.key : null;
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint") return q !== null ? null : c(o, d, "" + m, T);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case bl:
            return m.key === q ? f(o, d, m, T) : null;
          case el:
            return m.key === q ? v(o, d, m, T) : null;
          case Jl:
            return m = qe(m), g(o, d, m, T);
        }
        if (zt(m) || wl(m)) return q !== null ? null : p(o, d, m, T, null);
        if (typeof m.then == "function") return g(o, d, ln(m), T);
        if (m.$$typeof === El) return g(o, d, Fu(o, m), T);
        tn(o, m);
      }
      return null;
    }
    function b(o, d, m, T, q) {
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint") return o = o.get(m) || null, c(d, o, "" + T, q);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case bl:
            return o = o.get(T.key === null ? m : T.key) || null, f(d, o, T, q);
          case el:
            return o = o.get(T.key === null ? m : T.key) || null, v(d, o, T, q);
          case Jl:
            return T = qe(T), b(o, d, m, T, q);
        }
        if (zt(T) || wl(T)) return o = o.get(m) || null, p(d, o, T, q, null);
        if (typeof T.then == "function") return b(o, d, m, ln(T), q);
        if (T.$$typeof === El) return b(o, d, m, Fu(d, T), q);
        tn(d, T);
      }
      return null;
    }
    function j(o, d, m, T) {
      for (var q = null, al = null, C = d, V = d = 0, I = null; C !== null && V < m.length; V++) {
        C.index > V ? (I = C, C = null) : I = C.sibling;
        var ul = g(o, C, m[V], T);
        if (ul === null) {
          C === null && (C = I);
          break;
        }
        l && C && ul.alternate === null && t(o, C), d = n(ul, d, V), al === null ? q = ul : al.sibling = ul, al = ul, C = I;
      }
      if (V === m.length) return e(o, C), ll && Yt(o, V), q;
      if (C === null) {
        for (; V < m.length; V++) C = E(o, m[V], T), C !== null && (d = n(C, d, V), al === null ? q = C : al.sibling = C, al = C);
        return ll && Yt(o, V), q;
      }
      for (C = a(C); V < m.length; V++) I = b(C, o, V, m[V], T), I !== null && (l && I.alternate !== null && C.delete(I.key === null ? V : I.key), d = n(I, d, V), al === null ? q = I : al.sibling = I, al = I);
      return l && C.forEach(function(ze) {
        return t(o, ze);
      }), ll && Yt(o, V), q;
    }
    function G(o, d, m, T) {
      if (m == null) throw Error(s(151));
      for (var q = null, al = null, C = d, V = d = 0, I = null, ul = m.next(); C !== null && !ul.done; V++, ul = m.next()) {
        C.index > V ? (I = C, C = null) : I = C.sibling;
        var ze = g(o, C, ul.value, T);
        if (ze === null) {
          C === null && (C = I);
          break;
        }
        l && C && ze.alternate === null && t(o, C), d = n(ze, d, V), al === null ? q = ze : al.sibling = ze, al = ze, C = I;
      }
      if (ul.done) return e(o, C), ll && Yt(o, V), q;
      if (C === null) {
        for (; !ul.done; V++, ul = m.next()) ul = E(o, ul.value, T), ul !== null && (d = n(ul, d, V), al === null ? q = ul : al.sibling = ul, al = ul);
        return ll && Yt(o, V), q;
      }
      for (C = a(C); !ul.done; V++, ul = m.next()) ul = b(C, o, V, ul.value, T), ul !== null && (l && ul.alternate !== null && C.delete(ul.key === null ? V : ul.key), d = n(ul, d, V), al === null ? q = ul : al.sibling = ul, al = ul);
      return l && C.forEach(function(dh) {
        return t(o, dh);
      }), ll && Yt(o, V), q;
    }
    function ol(o, d, m, T) {
      if (typeof m == "object" && m !== null && m.type === tl && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case bl:
            l: {
              for (var q = m.key; d !== null; ) {
                if (d.key === q) {
                  if (q = m.type, q === tl) {
                    if (d.tag === 7) {
                      e(o, d.sibling), T = u(d, m.props.children), T.return = o, o = T;
                      break l;
                    }
                  } else if (d.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Jl && qe(q) === d.type) {
                    e(o, d.sibling), T = u(d, m.props), Fa(T, m), T.return = o, o = T;
                    break l;
                  }
                  e(o, d);
                  break;
                } else t(o, d);
                d = d.sibling;
              }
              m.type === tl ? (T = Ue(m.props.children, o.mode, T, m.key), T.return = o, o = T) : (T = wu(m.type, m.key, m.props, null, o.mode, T), Fa(T, m), T.return = o, o = T);
            }
            return i(o);
          case el:
            l: {
              for (q = m.key; d !== null; ) {
                if (d.key === q) if (d.tag === 4 && d.stateNode.containerInfo === m.containerInfo && d.stateNode.implementation === m.implementation) {
                  e(o, d.sibling), T = u(d, m.children || []), T.return = o, o = T;
                  break l;
                } else {
                  e(o, d);
                  break;
                }
                else t(o, d);
                d = d.sibling;
              }
              T = Hi(m, o.mode, T), T.return = o, o = T;
            }
            return i(o);
          case Jl:
            return m = qe(m), ol(o, d, m, T);
        }
        if (zt(m)) return j(o, d, m, T);
        if (wl(m)) {
          if (q = wl(m), typeof q != "function") throw Error(s(150));
          return m = q.call(m), G(o, d, m, T);
        }
        if (typeof m.then == "function") return ol(o, d, ln(m), T);
        if (m.$$typeof === El) return ol(o, d, Fu(o, m), T);
        tn(o, m);
      }
      return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, d !== null && d.tag === 6 ? (e(o, d.sibling), T = u(d, m), T.return = o, o = T) : (e(o, d), T = ji(m, o.mode, T), T.return = o, o = T), i(o)) : e(o, d);
    }
    return function(o, d, m, T) {
      try {
        Wa = 0;
        var q = ol(o, d, m, T);
        return oa = null, q;
      } catch (C) {
        if (C === ra || C === Iu) throw C;
        var al = nt(29, C, null, o.mode);
        return al.lanes = T, al.return = o, al;
      }
    };
  }
  var Ye = Gs(true), Xs = Gs(false), ne = false;
  function Ki(l) {
    l.updateQueue = { baseState: l.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
  }
  function Ji(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = { baseState: l.baseState, firstBaseUpdate: l.firstBaseUpdate, lastBaseUpdate: l.lastBaseUpdate, shared: l.shared, callbacks: null });
  }
  function ie(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function ce(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (nl & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = Ju(l), Ts(l, null, e), t;
    }
    return Ku(l, a, t, e), Ju(l);
  }
  function ka(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Uf(l, e);
    }
  }
  function wi(l, t) {
    var e = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var u = null, n = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = { lane: e.lane, tag: e.tag, payload: e.payload, callback: null, next: null };
          n === null ? u = n = i : n = n.next = i, e = e.next;
        } while (e !== null);
        n === null ? u = n = t : n = n.next = t;
      } else u = n = t;
      e = { baseState: a.baseState, firstBaseUpdate: u, lastBaseUpdate: n, shared: a.shared, callbacks: a.callbacks }, l.updateQueue = e;
      return;
    }
    l = e.lastBaseUpdate, l === null ? e.firstBaseUpdate = t : l.next = t, e.lastBaseUpdate = t;
  }
  var $i = false;
  function Ia() {
    if ($i) {
      var l = da;
      if (l !== null) throw l;
    }
  }
  function Pa(l, t, e, a) {
    $i = false;
    var u = l.updateQueue;
    ne = false;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var f = c, v = f.next;
      f.next = null, i === null ? n = v : i.next = v, i = f;
      var p = l.alternate;
      p !== null && (p = p.updateQueue, c = p.lastBaseUpdate, c !== i && (c === null ? p.firstBaseUpdate = v : c.next = v, p.lastBaseUpdate = f));
    }
    if (n !== null) {
      var E = u.baseState;
      i = 0, p = v = f = null, c = n;
      do {
        var g = c.lane & -536870913, b = g !== c.lane;
        if (b ? (k & g) === g : (a & g) === g) {
          g !== 0 && g === sa && ($i = true), p !== null && (p = p.next = { lane: 0, tag: c.tag, payload: c.payload, callback: null, next: null });
          l: {
            var j = l, G = c;
            g = t;
            var ol = e;
            switch (G.tag) {
              case 1:
                if (j = G.payload, typeof j == "function") {
                  E = j.call(ol, E, g);
                  break l;
                }
                E = j;
                break l;
              case 3:
                j.flags = j.flags & -65537 | 128;
              case 0:
                if (j = G.payload, g = typeof j == "function" ? j.call(ol, E, g) : j, g == null) break l;
                E = Y({}, E, g);
                break l;
              case 2:
                ne = true;
            }
          }
          g = c.callback, g !== null && (l.flags |= 64, b && (l.flags |= 8192), b = u.callbacks, b === null ? u.callbacks = [g] : b.push(g));
        } else b = { lane: g, tag: c.tag, payload: c.payload, callback: c.callback, next: null }, p === null ? (v = p = b, f = E) : p = p.next = b, i |= g;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null) break;
          b = c, c = b.next, b.next = null, u.lastBaseUpdate = b, u.shared.pending = null;
        }
      } while (true);
      p === null && (f = E), u.baseState = f, u.firstBaseUpdate = v, u.lastBaseUpdate = p, n === null && (u.shared.lanes = 0), oe |= i, l.lanes = i, l.memoizedState = E;
    }
  }
  function Qs(l, t) {
    if (typeof l != "function") throw Error(s(191, l));
    l.call(t);
  }
  function Zs(l, t) {
    var e = l.callbacks;
    if (e !== null) for (l.callbacks = null, l = 0; l < e.length; l++) Qs(e[l], t);
  }
  var ma = r(null), en = r(0);
  function Ls(l, t) {
    l = Wt, U(en, l), U(ma, t), Wt = l | t.baseLanes;
  }
  function Wi() {
    U(en, Wt), U(ma, ma.current);
  }
  function Fi() {
    Wt = en.current, x(ma), x(en);
  }
  var it = r(null), St = null;
  function fe(l) {
    var t = l.alternate;
    U(zl, zl.current & 1), U(it, l), St === null && (t === null || ma.current !== null || t.memoizedState !== null) && (St = l);
  }
  function ki(l) {
    U(zl, zl.current), U(it, l), St === null && (St = l);
  }
  function Vs(l) {
    l.tag === 22 ? (U(zl, zl.current), U(it, l), St === null && (St = l)) : se();
  }
  function se() {
    U(zl, zl.current), U(it, it.current);
  }
  function ct(l) {
    x(it), St === l && (St = null), x(zl);
  }
  var zl = r(0);
  function an(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || af(e) || uf(e))) return t;
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
  var Qt = 0, L = null, dl = null, Al = null, un = false, ha = false, Ge = false, nn = 0, lu = 0, va = null, lm = 0;
  function Sl() {
    throw Error(s(321));
  }
  function Ii(l, t) {
    if (t === null) return false;
    for (var e = 0; e < t.length && e < l.length; e++) if (!ut(l[e], t[e])) return false;
    return true;
  }
  function Pi(l, t, e, a, u, n) {
    return Qt = n, L = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, z.H = l === null || l.memoizedState === null ? O0 : hc, Ge = false, n = e(a, u), Ge = false, ha && (n = Js(t, e, a, u)), Ks(l), n;
  }
  function Ks(l) {
    z.H = au;
    var t = dl !== null && dl.next !== null;
    if (Qt = 0, Al = dl = L = null, un = false, lu = 0, va = null, t) throw Error(s(300));
    l === null || Ol || (l = l.dependencies, l !== null && Wu(l) && (Ol = true));
  }
  function Js(l, t, e, a) {
    L = l;
    var u = 0;
    do {
      if (ha && (va = null), lu = 0, ha = false, 25 <= u) throw Error(s(301));
      if (u += 1, Al = dl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      z.H = M0, n = t(e, a);
    } while (ha);
    return n;
  }
  function tm() {
    var l = z.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? tu(t) : t, l = l.useState()[0], (dl !== null ? dl.memoizedState : null) !== l && (L.flags |= 1024), t;
  }
  function lc() {
    var l = nn !== 0;
    return nn = 0, l;
  }
  function tc(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function ec(l) {
    if (un) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      un = false;
    }
    Qt = 0, Al = dl = L = null, ha = false, lu = nn = 0, va = null;
  }
  function Ll() {
    var l = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Al === null ? L.memoizedState = Al = l : Al = Al.next = l, Al;
  }
  function Tl() {
    if (dl === null) {
      var l = L.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = dl.next;
    var t = Al === null ? L.memoizedState : Al.next;
    if (t !== null) Al = t, dl = l;
    else {
      if (l === null) throw L.alternate === null ? Error(s(467)) : Error(s(310));
      dl = l, l = { memoizedState: dl.memoizedState, baseState: dl.baseState, baseQueue: dl.baseQueue, queue: dl.queue, next: null }, Al === null ? L.memoizedState = Al = l : Al = Al.next = l;
    }
    return Al;
  }
  function cn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function tu(l) {
    var t = lu;
    return lu += 1, va === null && (va = []), l = qs(va, l, t), t = L, (Al === null ? t.memoizedState : Al.next) === null && (t = t.alternate, z.H = t === null || t.memoizedState === null ? O0 : hc), l;
  }
  function fn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return tu(l);
      if (l.$$typeof === El) return Yl(l);
    }
    throw Error(s(438, String(l)));
  }
  function ac(l) {
    var t = null, e = L.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = L.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = { data: a.data.map(function(u) {
        return u.slice();
      }), index: 0 })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = cn(), L.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0) for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = Ve;
    return t.index++, e;
  }
  function Zt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function sn(l) {
    var t = Tl();
    return uc(t, dl, l);
  }
  function uc(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var u = l.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      t.baseQueue = u = n, a.pending = null;
    }
    if (n = l.baseState, u === null) l.memoizedState = n;
    else {
      t = u.next;
      var c = i = null, f = null, v = t, p = false;
      do {
        var E = v.lane & -536870913;
        if (E !== v.lane ? (k & E) === E : (Qt & E) === E) {
          var g = v.revertLane;
          if (g === 0) f !== null && (f = f.next = { lane: 0, revertLane: 0, gesture: null, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }), E === sa && (p = true);
          else if ((Qt & g) === g) {
            v = v.next, g === sa && (p = true);
            continue;
          } else E = { lane: 0, revertLane: v.revertLane, gesture: null, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }, f === null ? (c = f = E, i = n) : f = f.next = E, L.lanes |= g, oe |= g;
          E = v.action, Ge && e(n, E), n = v.hasEagerState ? v.eagerState : e(n, E);
        } else g = { lane: E, revertLane: v.revertLane, gesture: v.gesture, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }, f === null ? (c = f = g, i = n) : f = f.next = g, L.lanes |= E, oe |= E;
        v = v.next;
      } while (v !== null && v !== t);
      if (f === null ? i = n : f.next = c, !ut(n, l.memoizedState) && (Ol = true, p && (e = da, e !== null))) throw e;
      l.memoizedState = n, l.baseState = i, l.baseQueue = f, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function nc(l) {
    var t = Tl(), e = t.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, u = e.pending, n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = l(n, i.action), i = i.next;
      while (i !== u);
      ut(n, t.memoizedState) || (Ol = true), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function ws(l, t, e) {
    var a = L, u = Tl(), n = ll;
    if (n) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = t();
    var i = !ut((dl || u).memoizedState, e);
    if (i && (u.memoizedState = e, Ol = true), u = u.queue, fc(Fs.bind(null, a, u, l), [l]), u.getSnapshot !== t || i || Al !== null && Al.memoizedState.tag & 1) {
      if (a.flags |= 2048, ya(9, { destroy: void 0 }, Ws.bind(null, a, u, e, t), null), hl === null) throw Error(s(349));
      n || (Qt & 127) !== 0 || $s(a, t, e);
    }
    return e;
  }
  function $s(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = L.updateQueue, t === null ? (t = cn(), L.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function Ws(l, t, e, a) {
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
    var t = De(l, 2);
    t !== null && lt(t, l, 2);
  }
  function ic(l) {
    var t = Ll();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), Ge) {
        It(true);
        try {
          e();
        } finally {
          It(false);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Zt, lastRenderedState: l }, t;
  }
  function Ps(l, t, e, a) {
    return l.baseState = e, uc(l, dl, typeof a == "function" ? a : Zt);
  }
  function em(l, t, e, a, u) {
    if (on(l)) throw Error(s(485));
    if (l = t.action, l !== null) {
      var n = { payload: u, action: l, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(i) {
        n.listeners.push(i);
      } };
      z.T !== null ? e(true) : n.isTransition = false, a(n), e = t.pending, e === null ? (n.next = t.pending = n, l0(t, n)) : (n.next = e.next, t.pending = e.next = n);
    }
  }
  function l0(l, t) {
    var e = t.action, a = t.payload, u = l.state;
    if (t.isTransition) {
      var n = z.T, i = {};
      z.T = i;
      try {
        var c = e(u, a), f = z.S;
        f !== null && f(i, c), t0(l, t, c);
      } catch (v) {
        cc(l, t, v);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), z.T = n;
      }
    } else try {
      n = e(u, a), t0(l, t, n);
    } catch (v) {
      cc(l, t, v);
    }
  }
  function t0(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(function(a) {
      e0(l, t, a);
    }, function(a) {
      return cc(l, t, a);
    }) : e0(l, t, e);
  }
  function e0(l, t, e) {
    t.status = "fulfilled", t.value = e, a0(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, l0(l, e)));
  }
  function cc(l, t, e) {
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
    if (ll) {
      var e = hl.formState;
      if (e !== null) {
        l: {
          var a = L;
          if (ll) {
            if (vl) {
              t: {
                for (var u = vl, n = bt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = _t(u.nextSibling), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                vl = _t(u.nextSibling), a = u.data === "F!";
                break l;
              }
            }
            ae(a);
          }
          a = false;
        }
        a && (t = e[0]);
      }
    }
    return e = Ll(), e.memoizedState = e.baseState = t, a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: u0, lastRenderedState: t }, e.queue = a, e = E0.bind(null, L, a), a.dispatch = e, a = ic(false), n = mc.bind(null, L, false, a.queue), a = Ll(), u = { state: t, dispatch: null, action: l, pending: null }, a.queue = u, e = em.bind(null, L, u, n, e), u.dispatch = e, a.memoizedState = l, [t, e, false];
  }
  function i0(l) {
    var t = Tl();
    return c0(t, dl, l);
  }
  function c0(l, t, e) {
    if (t = uc(l, t, u0)[0], l = sn(Zt)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var a = tu(t);
    } catch (i) {
      throw i === ra ? Iu : i;
    }
    else a = t;
    t = Tl();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && (L.flags |= 2048, ya(9, { destroy: void 0 }, am.bind(null, u, e), null)), [a, n, l];
  }
  function am(l, t) {
    l.action = t;
  }
  function f0(l) {
    var t = Tl(), e = dl;
    if (e !== null) return c0(t, e, l);
    Tl(), t = t.memoizedState, e = Tl();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, false];
  }
  function ya(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = L.updateQueue, t === null && (t = cn(), L.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function s0() {
    return Tl().memoizedState;
  }
  function dn(l, t, e, a) {
    var u = Ll();
    L.flags |= l, u.memoizedState = ya(1 | t, { destroy: void 0 }, e, a === void 0 ? null : a);
  }
  function rn(l, t, e, a) {
    var u = Tl();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    dl !== null && a !== null && Ii(a, dl.memoizedState.deps) ? u.memoizedState = ya(t, n, e, a) : (L.flags |= l, u.memoizedState = ya(1 | t, n, e, a));
  }
  function d0(l, t) {
    dn(8390656, 8, l, t);
  }
  function fc(l, t) {
    rn(2048, 8, l, t);
  }
  function um(l) {
    L.flags |= 4;
    var t = L.updateQueue;
    if (t === null) t = cn(), L.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function r0(l) {
    var t = Tl().memoizedState;
    return um({ ref: t, nextImpl: l }), function() {
      if ((nl & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function o0(l, t) {
    return rn(4, 2, l, t);
  }
  function m0(l, t) {
    return rn(4, 4, l, t);
  }
  function h0(l, t) {
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
    e = e != null ? e.concat([l]) : null, rn(4, 4, h0.bind(null, t, l), e);
  }
  function sc() {
  }
  function y0(l, t) {
    var e = Tl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Ii(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function g0(l, t) {
    var e = Tl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Ii(t, a[1])) return a[0];
    if (a = l(), Ge) {
      It(true);
      try {
        l();
      } finally {
        It(false);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function dc(l, t, e) {
    return e === void 0 || (Qt & 1073741824) !== 0 && (k & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = bd(), L.lanes |= l, oe |= l, e);
  }
  function b0(l, t, e, a) {
    return ut(e, t) ? e : ma.current !== null ? (l = dc(l, e, a), ut(l, t) || (Ol = true), l) : (Qt & 42) === 0 || (Qt & 1073741824) !== 0 && (k & 261930) === 0 ? (Ol = true, l.memoizedState = e) : (l = bd(), L.lanes |= l, oe |= l, t);
  }
  function S0(l, t, e, a, u) {
    var n = D.p;
    D.p = n !== 0 && 8 > n ? n : 8;
    var i = z.T, c = {};
    z.T = c, mc(l, false, t, e);
    try {
      var f = u(), v = z.S;
      if (v !== null && v(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
        var p = Po(f, a);
        eu(l, t, p, dt(l));
      } else eu(l, t, a, dt(l));
    } catch (E) {
      eu(l, t, { then: function() {
      }, status: "rejected", reason: E }, dt());
    } finally {
      D.p = n, i !== null && c.types !== null && (i.types = c.types), z.T = i;
    }
  }
  function nm() {
  }
  function rc(l, t, e, a) {
    if (l.tag !== 5) throw Error(s(476));
    var u = _0(l).queue;
    S0(l, u, t, X, e === null ? nm : function() {
      return p0(l), e(a);
    });
  }
  function _0(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = { memoizedState: X, baseState: X, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Zt, lastRenderedState: X }, next: null };
    var e = {};
    return t.next = { memoizedState: e, baseState: e, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Zt, lastRenderedState: e }, next: null }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function p0(l) {
    var t = _0(l);
    t.next === null && (t = l.alternate.memoizedState), eu(l, t.next.queue, {}, dt());
  }
  function oc() {
    return Yl(Su);
  }
  function z0() {
    return Tl().memoizedState;
  }
  function T0() {
    return Tl().memoizedState;
  }
  function im(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = dt();
          l = ie(e);
          var a = ce(t, l, e);
          a !== null && (lt(a, t, e), ka(a, t, e)), t = { cache: Qi() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function cm(l, t, e) {
    var a = dt();
    e = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null }, on(l) ? x0(t, e) : (e = Di(l, t, e, a), e !== null && (lt(e, l, a), A0(e, t, a)));
  }
  function E0(l, t, e) {
    var a = dt();
    eu(l, t, e, a);
  }
  function eu(l, t, e, a) {
    var u = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null };
    if (on(l)) x0(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null)) try {
        var i = t.lastRenderedState, c = n(i, e);
        if (u.hasEagerState = true, u.eagerState = c, ut(c, i)) return Ku(l, t, u, 0), hl === null && Vu(), false;
      } catch {
      }
      if (e = Di(l, t, u, a), e !== null) return lt(e, l, a), A0(e, t, a), true;
    }
    return false;
  }
  function mc(l, t, e, a) {
    if (a = { lane: 2, revertLane: Kc(), gesture: null, action: a, hasEagerState: false, eagerState: null, next: null }, on(l)) {
      if (t) throw Error(s(479));
    } else t = Di(l, e, a, 2), t !== null && lt(t, l, 2);
  }
  function on(l) {
    var t = l.alternate;
    return l === L || t !== null && t === L;
  }
  function x0(l, t) {
    ha = un = true;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function A0(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Uf(l, e);
    }
  }
  var au = { readContext: Yl, use: fn, useCallback: Sl, useContext: Sl, useEffect: Sl, useImperativeHandle: Sl, useLayoutEffect: Sl, useInsertionEffect: Sl, useMemo: Sl, useReducer: Sl, useRef: Sl, useState: Sl, useDebugValue: Sl, useDeferredValue: Sl, useTransition: Sl, useSyncExternalStore: Sl, useId: Sl, useHostTransitionStatus: Sl, useFormState: Sl, useActionState: Sl, useOptimistic: Sl, useMemoCache: Sl, useCacheRefresh: Sl };
  au.useEffectEvent = Sl;
  var O0 = { readContext: Yl, use: fn, useCallback: function(l, t) {
    return Ll().memoizedState = [l, t === void 0 ? null : t], l;
  }, useContext: Yl, useEffect: d0, useImperativeHandle: function(l, t, e) {
    e = e != null ? e.concat([l]) : null, dn(4194308, 4, h0.bind(null, t, l), e);
  }, useLayoutEffect: function(l, t) {
    return dn(4194308, 4, l, t);
  }, useInsertionEffect: function(l, t) {
    dn(4, 2, l, t);
  }, useMemo: function(l, t) {
    var e = Ll();
    t = t === void 0 ? null : t;
    var a = l();
    if (Ge) {
      It(true);
      try {
        l();
      } finally {
        It(false);
      }
    }
    return e.memoizedState = [a, t], a;
  }, useReducer: function(l, t, e) {
    var a = Ll();
    if (e !== void 0) {
      var u = e(t);
      if (Ge) {
        It(true);
        try {
          e(t);
        } finally {
          It(false);
        }
      }
    } else u = t;
    return a.memoizedState = a.baseState = u, l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: l, lastRenderedState: u }, a.queue = l, l = l.dispatch = cm.bind(null, L, l), [a.memoizedState, l];
  }, useRef: function(l) {
    var t = Ll();
    return l = { current: l }, t.memoizedState = l;
  }, useState: function(l) {
    l = ic(l);
    var t = l.queue, e = E0.bind(null, L, t);
    return t.dispatch = e, [l.memoizedState, e];
  }, useDebugValue: sc, useDeferredValue: function(l, t) {
    var e = Ll();
    return dc(e, l, t);
  }, useTransition: function() {
    var l = ic(false);
    return l = S0.bind(null, L, l.queue, true, false), Ll().memoizedState = l, [false, l];
  }, useSyncExternalStore: function(l, t, e) {
    var a = L, u = Ll();
    if (ll) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else {
      if (e = t(), hl === null) throw Error(s(349));
      (k & 127) !== 0 || $s(a, t, e);
    }
    u.memoizedState = e;
    var n = { value: e, getSnapshot: t };
    return u.queue = n, d0(Fs.bind(null, a, n, l), [l]), a.flags |= 2048, ya(9, { destroy: void 0 }, Ws.bind(null, a, n, e, t), null), e;
  }, useId: function() {
    var l = Ll(), t = hl.identifierPrefix;
    if (ll) {
      var e = Dt, a = Nt;
      e = (a & ~(1 << 32 - at(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = nn++, 0 < e && (t += "H" + e.toString(32)), t += "_";
    } else e = lm++, t = "_" + t + "r_" + e.toString(32) + "_";
    return l.memoizedState = t;
  }, useHostTransitionStatus: oc, useFormState: n0, useActionState: n0, useOptimistic: function(l) {
    var t = Ll();
    t.memoizedState = t.baseState = l;
    var e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return t.queue = e, t = mc.bind(null, L, true, e), e.dispatch = t, [l, t];
  }, useMemoCache: ac, useCacheRefresh: function() {
    return Ll().memoizedState = im.bind(null, L);
  }, useEffectEvent: function(l) {
    var t = Ll(), e = { impl: l };
    return t.memoizedState = e, function() {
      if ((nl & 2) !== 0) throw Error(s(440));
      return e.impl.apply(void 0, arguments);
    };
  } }, hc = { readContext: Yl, use: fn, useCallback: y0, useContext: Yl, useEffect: fc, useImperativeHandle: v0, useInsertionEffect: o0, useLayoutEffect: m0, useMemo: g0, useReducer: sn, useRef: s0, useState: function() {
    return sn(Zt);
  }, useDebugValue: sc, useDeferredValue: function(l, t) {
    var e = Tl();
    return b0(e, dl.memoizedState, l, t);
  }, useTransition: function() {
    var l = sn(Zt)[0], t = Tl().memoizedState;
    return [typeof l == "boolean" ? l : tu(l), t];
  }, useSyncExternalStore: ws, useId: z0, useHostTransitionStatus: oc, useFormState: i0, useActionState: i0, useOptimistic: function(l, t) {
    var e = Tl();
    return Ps(e, dl, l, t);
  }, useMemoCache: ac, useCacheRefresh: T0 };
  hc.useEffectEvent = r0;
  var M0 = { readContext: Yl, use: fn, useCallback: y0, useContext: Yl, useEffect: fc, useImperativeHandle: v0, useInsertionEffect: o0, useLayoutEffect: m0, useMemo: g0, useReducer: nc, useRef: s0, useState: function() {
    return nc(Zt);
  }, useDebugValue: sc, useDeferredValue: function(l, t) {
    var e = Tl();
    return dl === null ? dc(e, l, t) : b0(e, dl.memoizedState, l, t);
  }, useTransition: function() {
    var l = nc(Zt)[0], t = Tl().memoizedState;
    return [typeof l == "boolean" ? l : tu(l), t];
  }, useSyncExternalStore: ws, useId: z0, useHostTransitionStatus: oc, useFormState: f0, useActionState: f0, useOptimistic: function(l, t) {
    var e = Tl();
    return dl !== null ? Ps(e, dl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
  }, useMemoCache: ac, useCacheRefresh: T0 };
  M0.useEffectEvent = r0;
  function vc(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : Y({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var yc = { enqueueSetState: function(l, t, e) {
    l = l._reactInternals;
    var a = dt(), u = ie(a);
    u.payload = t, e != null && (u.callback = e), t = ce(l, u, a), t !== null && (lt(t, l, a), ka(t, l, a));
  }, enqueueReplaceState: function(l, t, e) {
    l = l._reactInternals;
    var a = dt(), u = ie(a);
    u.tag = 1, u.payload = t, e != null && (u.callback = e), t = ce(l, u, a), t !== null && (lt(t, l, a), ka(t, l, a));
  }, enqueueForceUpdate: function(l, t) {
    l = l._reactInternals;
    var e = dt(), a = ie(e);
    a.tag = 2, t != null && (a.callback = t), t = ce(l, a, e), t !== null && (lt(t, l, e), ka(t, l, e));
  } };
  function N0(l, t, e, a, u, n, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, i) : t.prototype && t.prototype.isPureReactComponent ? !La(e, a) || !La(u, n) : true;
  }
  function D0(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && yc.enqueueReplaceState(t, t.state, null);
  }
  function Xe(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t) a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = Y({}, e));
      for (var u in l) e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function U0(l) {
    Lu(l);
  }
  function j0(l) {
    console.error(l);
  }
  function H0(l) {
    Lu(l);
  }
  function mn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function R0(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, { componentStack: e.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function gc(l, t, e) {
    return e = ie(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      mn(l, t);
    }, e;
  }
  function C0(l) {
    return l = ie(l), l.tag = 3, l;
  }
  function q0(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        R0(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      R0(t, e, a), typeof u != "function" && (me === null ? me = /* @__PURE__ */ new Set([this]) : me.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, { componentStack: c !== null ? c : "" });
    });
  }
  function fm(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && fa(t, e, u, true), e = it.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return St === null ? xn() : e.alternate === null && _l === 0 && (_l = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === Pu ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Zc(l, a, u)), false;
          case 22:
            return e.flags |= 65536, a === Pu ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([a]) }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Zc(l, a, u)), false;
        }
        throw Error(s(435, e.tag));
      }
      return Zc(l, a, u), xn(), false;
    }
    if (ll) return t = it.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== qi && (l = Error(s(422), { cause: a }), Ja(vt(l, e)))) : (a !== qi && (t = Error(s(423), { cause: a }), Ja(vt(t, e))), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = vt(a, e), u = gc(l.stateNode, a, u), wi(l, u), _l !== 4 && (_l = 2)), false;
    var n = Error(s(520), { cause: a });
    if (n = vt(n, e), ru === null ? ru = [n] : ru.push(n), _l !== 4 && (_l = 2), t === null) return true;
    a = vt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = gc(e.stateNode, a, l), wi(e, l), false;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (me === null || !me.has(n)))) return e.flags |= 65536, u &= -u, e.lanes |= u, u = C0(u), q0(u, l, e, a), wi(e, u), false;
      }
      e = e.return;
    } while (e !== null);
    return false;
  }
  var bc = Error(s(461)), Ol = false;
  function Gl(l, t, e, a) {
    t.child = l === null ? Xs(t, null, e, a) : Ye(t, l.child, e, a);
  }
  function B0(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a) c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return Re(t), a = Pi(l, t, e, i, n, u), c = lc(), l !== null && !Ol ? (tc(l, t, u), Lt(l, t, u)) : (ll && c && Ri(t), t.flags |= 1, Gl(l, t, a, u), t.child);
  }
  function Y0(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !Ui(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, G0(l, t, n, a, u)) : (l = wu(e.type, null, a, t, t.mode, u), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !Ac(l, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : La, e(i, a) && l.ref === t.ref) return Lt(l, t, u);
    }
    return t.flags |= 1, l = Bt(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function G0(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (La(n, a) && l.ref === t.ref) if (Ol = false, t.pendingProps = a = n, Ac(l, u)) (l.flags & 131072) !== 0 && (Ol = true);
      else return t.lanes = l.lanes, Lt(l, t, u);
    }
    return Sc(l, t, e, a, u);
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
      if ((e & 536870912) !== 0) t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && ku(t, n !== null ? n.cachePool : null), n !== null ? Ls(t, n) : Wi(), Vs(t);
      else return a = t.lanes = 536870912, Q0(l, t, n !== null ? n.baseLanes | e : e, e, a);
    } else n !== null ? (ku(t, n.cachePool), Ls(t, n), se(), t.memoizedState = null) : (l !== null && ku(t, null), Wi(), se());
    return Gl(l, t, u, e), t.child;
  }
  function uu(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t.sibling;
  }
  function Q0(l, t, e, a, u) {
    var n = Li();
    return n = n === null ? null : { parent: xl._currentValue, pool: n }, t.memoizedState = { baseLanes: e, cachePool: n }, l !== null && ku(t, null), Wi(), Vs(t), l !== null && fa(l, t, a, true), t.childLanes = u, null;
  }
  function hn(l, t) {
    return t = yn({ mode: t.mode, children: t.children }, l.mode), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Z0(l, t, e) {
    return Ye(t, l.child, null, e), l = hn(t, t.pendingProps), l.flags |= 2, ct(t), t.memoizedState = null, l;
  }
  function sm(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (ll) {
        if (a.mode === "hidden") return l = hn(t, a), t.lanes = 536870912, uu(null, l);
        if (ki(t), (l = vl) ? (l = lr(l, bt), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: te !== null ? { id: Nt, overflow: Dt } : null, retryLane: 536870912, hydrationErrors: null }, e = xs(l), e.return = t, t.child = e, Bl = t, vl = null)) : l = null, l === null) throw ae(t);
        return t.lanes = 536870912, null;
      }
      return hn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (ki(t), u) if (t.flags & 256) t.flags &= -257, t = Z0(l, t, e);
      else if (t.memoizedState !== null) t.child = l.child, t.flags |= 128, t = null;
      else throw Error(s(558));
      else if (Ol || fa(l, t, e, false), u = (e & l.childLanes) !== 0, Ol || u) {
        if (a = hl, a !== null && (i = jf(a, e), i !== 0 && i !== n.retryLane)) throw n.retryLane = i, De(l, i), lt(a, l, i), bc;
        xn(), t = Z0(l, t, e);
      } else l = n.treeContext, vl = _t(i.nextSibling), Bl = t, ll = true, ee = null, bt = false, l !== null && Ms(t, l), t = hn(t, a), t.flags |= 4096;
      return t;
    }
    return l = Bt(l.child, { mode: a.mode, children: a.children }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function vn(l, t) {
    var e = t.ref;
    if (e === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object") throw Error(s(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function Sc(l, t, e, a, u) {
    return Re(t), e = Pi(l, t, e, a, void 0, u), a = lc(), l !== null && !Ol ? (tc(l, t, u), Lt(l, t, u)) : (ll && a && Ri(t), t.flags |= 1, Gl(l, t, e, u), t.child);
  }
  function L0(l, t, e, a, u, n) {
    return Re(t), t.updateQueue = null, e = Js(t, a, e, u), Ks(l), a = lc(), l !== null && !Ol ? (tc(l, t, n), Lt(l, t, n)) : (ll && a && Ri(t), t.flags |= 1, Gl(l, t, e, n), t.child);
  }
  function V0(l, t, e, a, u) {
    if (Re(t), t.stateNode === null) {
      var n = ua, i = e.contextType;
      typeof i == "object" && i !== null && (n = Yl(i)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = yc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Ki(t), i = e.contextType, n.context = typeof i == "object" && i !== null ? Yl(i) : ua, n.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (vc(t, e, i, a), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && yc.enqueueReplaceState(n, n.state, null), Pa(t, a, n, u), Ia(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = true;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, f = Xe(e, c);
      n.props = f;
      var v = n.context, p = e.contextType;
      i = ua, typeof p == "object" && p !== null && (i = Yl(p));
      var E = e.getDerivedStateFromProps;
      p = typeof E == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, p || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || v !== i) && D0(t, n, a, i), ne = false;
      var g = t.memoizedState;
      n.state = g, Pa(t, a, n, u), Ia(), v = t.memoizedState, c || g !== v || ne ? (typeof E == "function" && (vc(t, e, E, a), v = t.memoizedState), (f = ne || N0(t, e, f, a, g, v, i)) ? (p || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = v), n.props = a, n.state = v, n.context = i, a = f) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = false);
    } else {
      n = t.stateNode, Ji(l, t), i = t.memoizedProps, p = Xe(e, i), n.props = p, E = t.pendingProps, g = n.context, v = e.contextType, f = ua, typeof v == "object" && v !== null && (f = Yl(v)), c = e.getDerivedStateFromProps, (v = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== E || g !== f) && D0(t, n, a, f), ne = false, g = t.memoizedState, n.state = g, Pa(t, a, n, u), Ia();
      var b = t.memoizedState;
      i !== E || g !== b || ne || l !== null && l.dependencies !== null && Wu(l.dependencies) ? (typeof c == "function" && (vc(t, e, c, a), b = t.memoizedState), (p = ne || N0(t, e, p, a, g, b, f) || l !== null && l.dependencies !== null && Wu(l.dependencies)) ? (v || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, b, f), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(a, b, f)), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && g === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && g === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = b), n.props = a, n.state = b, n.context = f, a = p) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && g === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && g === l.memoizedState || (t.flags |= 1024), a = false);
    }
    return n = a, vn(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = Ye(t, l.child, null, u), t.child = Ye(t, null, e, u)) : Gl(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = Lt(l, t, u), l;
  }
  function K0(l, t, e, a) {
    return je(), t.flags |= 256, Gl(l, t, e, a), t.child;
  }
  var _c = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function pc(l) {
    return { baseLanes: l, cachePool: Rs() };
  }
  function zc(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= st), l;
  }
  function J0(l, t, e) {
    var a = t.pendingProps, u = false, n = (t.flags & 128) !== 0, i;
    if ((i = n) || (i = l !== null && l.memoizedState === null ? false : (zl.current & 2) !== 0), i && (u = true, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (ll) {
        if (u ? fe(t) : se(), (l = vl) ? (l = lr(l, bt), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: te !== null ? { id: Nt, overflow: Dt } : null, retryLane: 536870912, hydrationErrors: null }, e = xs(l), e.return = t, t.child = e, Bl = t, vl = null)) : l = null, l === null) throw ae(t);
        return uf(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, u ? (se(), u = t.mode, c = yn({ mode: "hidden", children: c }, u), a = Ue(a, u, e, null), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = pc(e), a.childLanes = zc(l, i, e), t.memoizedState = _c, uu(null, a)) : (fe(t), Tc(t, c));
    }
    var f = l.memoizedState;
    if (f !== null && (c = f.dehydrated, c !== null)) {
      if (n) t.flags & 256 ? (fe(t), t.flags &= -257, t = Ec(l, t, e)) : t.memoizedState !== null ? (se(), t.child = l.child, t.flags |= 128, t = null) : (se(), c = a.fallback, u = t.mode, a = yn({ mode: "visible", children: a.children }, u), c = Ue(c, u, e, null), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, Ye(t, l.child, null, e), a = t.child, a.memoizedState = pc(e), a.childLanes = zc(l, i, e), t.memoizedState = _c, t = uu(null, a));
      else if (fe(t), uf(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var v = i.dgst;
        i = v, a = Error(s(419)), a.stack = "", a.digest = i, Ja({ value: a, source: null, stack: null }), t = Ec(l, t, e);
      } else if (Ol || fa(l, t, e, false), i = (e & l.childLanes) !== 0, Ol || i) {
        if (i = hl, i !== null && (a = jf(i, e), a !== 0 && a !== f.retryLane)) throw f.retryLane = a, De(l, a), lt(i, l, a), bc;
        af(c) || xn(), t = Ec(l, t, e);
      } else af(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = f.treeContext, vl = _t(c.nextSibling), Bl = t, ll = true, ee = null, bt = false, l !== null && Ms(t, l), t = Tc(t, a.children), t.flags |= 4096);
      return t;
    }
    return u ? (se(), c = a.fallback, u = t.mode, f = l.child, v = f.sibling, a = Bt(f, { mode: "hidden", children: a.children }), a.subtreeFlags = f.subtreeFlags & 65011712, v !== null ? c = Bt(v, c) : (c = Ue(c, u, e, null), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, uu(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = pc(e) : (u = c.cachePool, u !== null ? (f = xl._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = Rs(), c = { baseLanes: c.baseLanes | e, cachePool: u }), a.memoizedState = c, a.childLanes = zc(l, i, e), t.memoizedState = _c, uu(l.child, a)) : (fe(t), e = l.child, l = e.sibling, e = Bt(e, { mode: "visible", children: a.children }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function Tc(l, t) {
    return t = yn({ mode: "visible", children: t }, l.mode), t.return = l, l.child = t;
  }
  function yn(l, t) {
    return l = nt(22, l, null, t), l.lanes = 0, l;
  }
  function Ec(l, t, e) {
    return Ye(t, l.child, null, e), l = Tc(t, t.pendingProps.children), l.flags |= 2, t.memoizedState = null, l;
  }
  function w0(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Gi(l.return, t, e);
  }
  function xc(l, t, e, a, u, n) {
    var i = l.memoizedState;
    i === null ? l.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: a, tail: e, tailMode: u, treeForkCount: n } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = u, i.treeForkCount = n);
  }
  function $0(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = zl.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, U(zl, i), Gl(l, t, a, e), a = ll ? Ka : 0, !c && l !== null && (l.flags & 128) !== 0) l: for (l = t.child; l !== null; ) {
      if (l.tag === 13) l.memoizedState !== null && w0(l, e, t);
      else if (l.tag === 19) w0(l, e, t);
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
        for (e = t.child, u = null; e !== null; ) l = e.alternate, l !== null && an(l) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), xc(t, false, u, e, n, a);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = t.child, t.child = null; u !== null; ) {
          if (l = u.alternate, l !== null && an(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        xc(t, true, e, null, n, a);
        break;
      case "together":
        xc(t, false, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Lt(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), oe |= t.lanes, (e & t.childLanes) === 0) if (l !== null) {
      if (fa(l, t, e, false), (e & t.childLanes) === 0) return null;
    } else return null;
    if (l !== null && t.child !== l.child) throw Error(s(153));
    if (t.child !== null) {
      for (l = t.child, e = Bt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; ) l = l.sibling, e = e.sibling = Bt(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function Ac(l, t) {
    return (l.lanes & t) !== 0 ? true : (l = l.dependencies, !!(l !== null && Wu(l)));
  }
  function dm(l, t, e) {
    switch (t.tag) {
      case 3:
        Zl(t, t.stateNode.containerInfo), ue(t, xl, l.memoizedState.cache), je();
        break;
      case 27:
      case 5:
        Da(t);
        break;
      case 4:
        Zl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ue(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return t.flags |= 128, ki(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null) return a.dehydrated !== null ? (fe(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? J0(l, t, e) : (fe(t), l = Lt(l, t, e), l !== null ? l.sibling : null);
        fe(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (fa(l, t, e, false), a = (e & t.childLanes) !== 0), u) {
          if (a) return $0(l, t, e);
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), U(zl, zl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, X0(l, t, e, t.pendingProps);
      case 24:
        ue(t, xl, l.memoizedState.cache);
    }
    return Lt(l, t, e);
  }
  function W0(l, t, e) {
    if (l !== null) if (l.memoizedProps !== t.pendingProps) Ol = true;
    else {
      if (!Ac(l, e) && (t.flags & 128) === 0) return Ol = false, dm(l, t, e);
      Ol = (l.flags & 131072) !== 0;
    }
    else Ol = false, ll && (t.flags & 1048576) !== 0 && Os(t, Ka, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = qe(t.elementType), t.type = l, typeof l == "function") Ui(l) ? (a = Xe(l, a), t.tag = 1, t = V0(null, t, l, a, e)) : (t.tag = 0, t = Sc(null, t, l, a, e));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === rt) {
                t.tag = 11, t = B0(null, t, l, a, e);
                break l;
              } else if (u === P) {
                t.tag = 14, t = Y0(null, t, l, a, e);
                break l;
              }
            }
            throw t = Ht(l) || l, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Sc(l, t, t.type, t.pendingProps, e);
      case 1:
        return a = t.type, u = Xe(a, t.pendingProps), V0(l, t, a, u, e);
      case 3:
        l: {
          if (Zl(t, t.stateNode.containerInfo), l === null) throw Error(s(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, Ji(l, t), Pa(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, ue(t, xl, a), a !== n.cache && Xi(t, [xl], e, true), Ia(), a = i.element, n.isDehydrated) if (n = { element: a, isDehydrated: false, cache: i.cache }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
            t = K0(l, t, a, e);
            break l;
          } else if (a !== u) {
            u = vt(Error(s(424)), t), Ja(u), t = K0(l, t, a, e);
            break l;
          } else for (l = t.stateNode.containerInfo, l.nodeType === 9 ? l = l.body : l = l.nodeName === "HTML" ? l.ownerDocument.body : l, vl = _t(l.firstChild), Bl = t, ll = true, ee = null, bt = true, e = Xs(t, null, a, e), t.child = e; e; ) e.flags = e.flags & -3 | 4096, e = e.sibling;
          else {
            if (je(), a === u) {
              t = Lt(l, t, e);
              break l;
            }
            Gl(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return vn(l, t), l === null ? (e = ir(t.type, null, t.pendingProps, null)) ? t.memoizedState = e : ll || (e = t.type, l = t.pendingProps, a = jn(w.current).createElement(e), a[ql] = t, a[$l] = l, Xl(a, e, l), Hl(a), t.stateNode = a) : t.memoizedState = ir(t.type, l.memoizedProps, t.pendingProps, l.memoizedState), null;
      case 27:
        return Da(t), l === null && ll && (a = t.stateNode = ar(t.type, t.pendingProps, w.current), Bl = t, bt = true, u = vl, ge(t.type) ? (nf = u, vl = _t(a.firstChild)) : vl = u), Gl(l, t, t.pendingProps.children, e), vn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && ll && ((u = a = vl) && (a = Xm(a, t.type, t.pendingProps, bt), a !== null ? (t.stateNode = a, Bl = t, vl = _t(a.firstChild), bt = false, u = true) : u = false), u || ae(t)), Da(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = n.children, lf(u, n) ? a = null : i !== null && lf(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = Pi(l, t, tm, null, null, e), Su._currentValue = u), vn(l, t), Gl(l, t, a, e), t.child;
      case 6:
        return l === null && ll && ((l = e = vl) && (e = Qm(e, t.pendingProps, bt), e !== null ? (t.stateNode = e, Bl = t, vl = null, l = true) : l = false), l || ae(t)), null;
      case 13:
        return J0(l, t, e);
      case 4:
        return Zl(t, t.stateNode.containerInfo), a = t.pendingProps, l === null ? t.child = Ye(t, null, a, e) : Gl(l, t, a, e), t.child;
      case 11:
        return B0(l, t, t.type, t.pendingProps, e);
      case 7:
        return Gl(l, t, t.pendingProps, e), t.child;
      case 8:
        return Gl(l, t, t.pendingProps.children, e), t.child;
      case 12:
        return Gl(l, t, t.pendingProps.children, e), t.child;
      case 10:
        return a = t.pendingProps, ue(t, t.type, a.value), Gl(l, t, a.children, e), t.child;
      case 9:
        return u = t.type._context, a = t.pendingProps.children, Re(t), u = Yl(u), a = a(u), t.flags |= 1, Gl(l, t, a, e), t.child;
      case 14:
        return Y0(l, t, t.type, t.pendingProps, e);
      case 15:
        return G0(l, t, t.type, t.pendingProps, e);
      case 19:
        return $0(l, t, e);
      case 31:
        return sm(l, t, e);
      case 22:
        return X0(l, t, e, t.pendingProps);
      case 24:
        return Re(t), a = Yl(xl), l === null ? (u = Li(), u === null && (u = hl, n = Qi(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, Ki(t), ue(t, xl, u)) : ((l.lanes & e) !== 0 && (Ji(l, t), Pa(t, null, null, e), Ia()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ue(t, xl, a)) : (a = n.cache, ue(t, xl, a), a !== u.cache && Xi(t, [xl], e, true))), Gl(l, t, t.pendingProps.children, e), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Vt(l) {
    l.flags |= 4;
  }
  function Oc(l, t, e, a, u) {
    if ((t = (l.mode & 32) !== 0) && (t = false), t) {
      if (l.flags |= 16777216, (u & 335544128) === u) if (l.stateNode.complete) l.flags |= 8192;
      else if (zd()) l.flags |= 8192;
      else throw Be = Pu, Vi;
    } else l.flags &= -16777217;
  }
  function F0(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) l.flags &= -16777217;
    else if (l.flags |= 16777216, !rr(t)) if (zd()) l.flags |= 8192;
    else throw Be = Pu, Vi;
  }
  function gn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Nf() : 536870912, l.lanes |= t, _a |= t);
  }
  function nu(l, t) {
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
  function yl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t) for (var u = l.child; u !== null; ) e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = l, u = u.sibling;
    else for (u = l.child; u !== null; ) e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function rm(l, t, e) {
    var a = t.pendingProps;
    switch (Ci(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return yl(t), null;
      case 1:
        return yl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Xt(xl), pl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (ca(t) ? Vt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Bi())), yl(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (Vt(t), n !== null ? (yl(t), F0(t, n)) : (yl(t), Oc(t, u, null, a, e))) : n ? n !== l.memoizedState ? (Vt(t), yl(t), F0(t, n)) : (yl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && Vt(t), yl(t), Oc(t, u, l, a, e)), null;
      case 27:
        if (Ou(t), e = w.current, u = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Vt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return yl(t), null;
          }
          l = R.current, ca(t) ? Ns(t) : (l = ar(u, a, e), t.stateNode = l, Vt(t));
        }
        return yl(t), null;
      case 5:
        if (Ou(t), u = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Vt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return yl(t), null;
          }
          if (n = R.current, ca(t)) Ns(t);
          else {
            var i = jn(w.current);
            switch (n) {
              case 1:
                n = i.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                n = i.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    n = i.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    n = i.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                    break;
                  case "script":
                    n = i.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild);
                    break;
                  case "select":
                    n = typeof a.is == "string" ? i.createElement("select", { is: a.is }) : i.createElement("select"), a.multiple ? n.multiple = true : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? i.createElement(u, { is: a.is }) : i.createElement(u);
                }
            }
            n[ql] = t, n[$l] = a;
            l: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6) n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === t) break l;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t) break l;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            t.stateNode = n;
            l: switch (Xl(n, u, a), u) {
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
            a && Vt(t);
          }
        }
        return yl(t), Oc(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, e), null;
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Vt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(s(166));
          if (l = w.current, ca(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = Bl, u !== null) switch (u.tag) {
              case 27:
              case 5:
                a = u.memoizedProps;
            }
            l[ql] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === true || Jd(l.nodeValue, e)), l || ae(t, true);
          } else l = jn(l).createTextNode(a), l[ql] = t, t.stateNode = l;
        }
        return yl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = ca(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(s(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(557));
              l[ql] = t;
            } else je(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            yl(t), l = false;
          } else e = Bi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = true;
          if (!l) return t.flags & 256 ? (ct(t), t) : (ct(t), null);
          if ((t.flags & 128) !== 0) throw Error(s(558));
        }
        return yl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = ca(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[ql] = t;
            } else je(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            yl(t), u = false;
          } else u = Bi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = true;
          if (!u) return t.flags & 256 ? (ct(t), t) : (ct(t), null);
        }
        return ct(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), gn(t, t.updateQueue), yl(t), null);
      case 4:
        return pl(), l === null && Wc(t.stateNode.containerInfo), yl(t), null;
      case 10:
        return Xt(t.type), yl(t), null;
      case 19:
        if (x(zl), a = t.memoizedState, a === null) return yl(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null) if (u) nu(a, false);
        else {
          if (_l !== 0 || l !== null && (l.flags & 128) !== 0) for (l = t.child; l !== null; ) {
            if (n = an(l), n !== null) {
              for (t.flags |= 128, nu(a, false), l = n.updateQueue, t.updateQueue = l, gn(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; ) Es(e, l), e = e.sibling;
              return U(zl, zl.current & 1 | 2), ll && Yt(t, a.treeForkCount), t.child;
            }
            l = l.sibling;
          }
          a.tail !== null && tt() > zn && (t.flags |= 128, u = true, nu(a, false), t.lanes = 4194304);
        }
        else {
          if (!u) if (l = an(n), l !== null) {
            if (t.flags |= 128, u = true, l = l.updateQueue, t.updateQueue = l, gn(t, l), nu(a, true), a.tail === null && a.tailMode === "hidden" && !n.alternate && !ll) return yl(t), null;
          } else 2 * tt() - a.renderingStartTime > zn && e !== 536870912 && (t.flags |= 128, u = true, nu(a, false), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = tt(), l.sibling = null, e = zl.current, U(zl, u ? e & 1 | 2 : e & 1), ll && Yt(t, a.treeForkCount), l) : (yl(t), null);
      case 22:
      case 23:
        return ct(t), Fi(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (yl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : yl(t), e = t.updateQueue, e !== null && gn(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && x(Ce), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), Xt(xl), yl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function om(l, t) {
    switch (Ci(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Xt(xl), pl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ou(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (ct(t), t.alternate === null) throw Error(s(340));
          je();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (ct(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null) throw Error(s(340));
          je();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return x(zl), null;
      case 4:
        return pl(), null;
      case 10:
        return Xt(t.type), null;
      case 22:
      case 23:
        return ct(t), Fi(), l !== null && x(Ce), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Xt(xl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function k0(l, t) {
    switch (Ci(t), t.tag) {
      case 3:
        Xt(xl), pl();
        break;
      case 26:
      case 27:
      case 5:
        Ou(t);
        break;
      case 4:
        pl();
        break;
      case 31:
        t.memoizedState !== null && ct(t);
        break;
      case 13:
        ct(t);
        break;
      case 19:
        x(zl);
        break;
      case 10:
        Xt(t.type);
        break;
      case 22:
      case 23:
        ct(t), Fi(), l !== null && x(Ce);
        break;
      case 24:
        Xt(xl);
    }
  }
  function iu(l, t) {
    try {
      var e = t.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var n = e.create, i = e.inst;
            a = n(), i.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (c) {
      fl(t, t.return, c);
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
            var i = a.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, u = t;
              var f = e, v = c;
              try {
                v();
              } catch (p) {
                fl(u, f, p);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (p) {
      fl(t, t.return, p);
    }
  }
  function I0(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Zs(t, e);
      } catch (a) {
        fl(l, l.return, a);
      }
    }
  }
  function P0(l, t, e) {
    e.props = Xe(l.type, l.memoizedProps), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      fl(l, t, a);
    }
  }
  function cu(l, t) {
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
      fl(l, t, u);
    }
  }
  function Ut(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null) if (typeof a == "function") try {
      a();
    } catch (u) {
      fl(l, t, u);
    } finally {
      l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
    }
    else if (typeof e == "function") try {
      e(null);
    } catch (u) {
      fl(l, t, u);
    }
    else e.current = null;
  }
  function ld(l) {
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
      fl(l, l.return, u);
    }
  }
  function Mc(l, t, e) {
    try {
      var a = l.stateNode;
      Rm(a, l.type, e, t), a[$l] = t;
    } catch (u) {
      fl(l, l.return, u);
    }
  }
  function td(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && ge(l.type) || l.tag === 4;
  }
  function Nc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || td(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && ge(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Dc(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = Ct));
    else if (a !== 4 && (a === 27 && ge(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null)) for (Dc(l, t, e), l = l.sibling; l !== null; ) Dc(l, t, e), l = l.sibling;
  }
  function bn(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && ge(l.type) && (e = l.stateNode), l = l.child, l !== null)) for (bn(l, t, e), l = l.sibling; l !== null; ) bn(l, t, e), l = l.sibling;
  }
  function ed(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; ) t.removeAttributeNode(u[0]);
      Xl(t, a, e), t[ql] = l, t[$l] = e;
    } catch (n) {
      fl(l, l.return, n);
    }
  }
  var Kt = false, Ml = false, Uc = false, ad = typeof WeakSet == "function" ? WeakSet : Set, Rl = null;
  function mm(l, t) {
    if (l = l.containerInfo, Ic = Gn, l = vs(l), Ei(l)) {
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
          var i = 0, c = -1, f = -1, v = 0, p = 0, E = l, g = null;
          t: for (; ; ) {
            for (var b; E !== e || u !== 0 && E.nodeType !== 3 || (c = i + u), E !== n || a !== 0 && E.nodeType !== 3 || (f = i + a), E.nodeType === 3 && (i += E.nodeValue.length), (b = E.firstChild) !== null; ) g = E, E = b;
            for (; ; ) {
              if (E === l) break t;
              if (g === e && ++v === u && (c = i), g === n && ++p === a && (f = i), (b = E.nextSibling) !== null) break;
              E = g, g = E.parentNode;
            }
            E = b;
          }
          e = c === -1 || f === -1 ? null : { start: c, end: f };
        } else e = null;
      }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Pc = { focusedElem: l, selectionRange: e }, Gn = false, Rl = t; Rl !== null; ) if (t = Rl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null) l.return = t, Rl = l;
    else for (; Rl !== null; ) {
      switch (t = Rl, n = t.alternate, l = t.flags, t.tag) {
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
              var j = Xe(e.type, u);
              l = a.getSnapshotBeforeUpdate(j, n), a.__reactInternalSnapshotBeforeUpdate = l;
            } catch (G) {
              fl(e, e.return, G);
            }
          }
          break;
        case 3:
          if ((l & 1024) !== 0) {
            if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9) ef(l);
            else if (e === 1) switch (l.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                ef(l);
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
        l.return = t.return, Rl = l;
        break;
      }
      Rl = t.return;
    }
  }
  function ud(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        wt(l, e), a & 4 && iu(5, e);
        break;
      case 1:
        if (wt(l, e), a & 4) if (l = e.stateNode, t === null) try {
          l.componentDidMount();
        } catch (i) {
          fl(e, e.return, i);
        }
        else {
          var u = Xe(e.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
          } catch (i) {
            fl(e, e.return, i);
          }
        }
        a & 64 && I0(e), a & 512 && cu(e, e.return);
        break;
      case 3:
        if (wt(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
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
          } catch (i) {
            fl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && ed(e);
      case 26:
      case 5:
        wt(l, e), t === null && a & 4 && ld(e), a & 512 && cu(e, e.return);
        break;
      case 12:
        wt(l, e);
        break;
      case 31:
        wt(l, e), a & 4 && cd(l, e);
        break;
      case 13:
        wt(l, e), a & 4 && fd(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = zm.bind(null, e), Zm(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Kt, !a) {
          t = t !== null && t.memoizedState !== null || Ml, u = Kt;
          var n = Ml;
          Kt = a, (Ml = t) && !n ? $t(l, e, (e.subtreeFlags & 8772) !== 0) : wt(l, e), Kt = u, Ml = n;
        }
        break;
      case 30:
        break;
      default:
        wt(l, e);
    }
  }
  function nd(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, nd(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && ci(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var gl = null, Fl = false;
  function Jt(l, t, e) {
    for (e = e.child; e !== null; ) id(l, t, e), e = e.sibling;
  }
  function id(l, t, e) {
    if (et && typeof et.onCommitFiberUnmount == "function") try {
      et.onCommitFiberUnmount(Ua, e);
    } catch {
    }
    switch (e.tag) {
      case 26:
        Ml || Ut(e, t), Jt(l, t, e), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Ml || Ut(e, t);
        var a = gl, u = Fl;
        ge(e.type) && (gl = e.stateNode, Fl = false), Jt(l, t, e), yu(e.stateNode), gl = a, Fl = u;
        break;
      case 5:
        Ml || Ut(e, t);
      case 6:
        if (a = gl, u = Fl, gl = null, Jt(l, t, e), gl = a, Fl = u, gl !== null) if (Fl) try {
          (gl.nodeType === 9 ? gl.body : gl.nodeName === "HTML" ? gl.ownerDocument.body : gl).removeChild(e.stateNode);
        } catch (n) {
          fl(e, t, n);
        }
        else try {
          gl.removeChild(e.stateNode);
        } catch (n) {
          fl(e, t, n);
        }
        break;
      case 18:
        gl !== null && (Fl ? (l = gl, Id(l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.stateNode), Ma(l)) : Id(gl, e.stateNode));
        break;
      case 4:
        a = gl, u = Fl, gl = e.stateNode.containerInfo, Fl = true, Jt(l, t, e), gl = a, Fl = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        de(2, e, t), Ml || de(4, e, t), Jt(l, t, e);
        break;
      case 1:
        Ml || (Ut(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && P0(e, t, a)), Jt(l, t, e);
        break;
      case 21:
        Jt(l, t, e);
        break;
      case 22:
        Ml = (a = Ml) || e.memoizedState !== null, Jt(l, t, e), Ml = a;
        break;
      default:
        Jt(l, t, e);
    }
  }
  function cd(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Ma(l);
      } catch (e) {
        fl(t, t.return, e);
      }
    }
  }
  function fd(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null)))) try {
      Ma(l);
    } catch (e) {
      fl(t, t.return, e);
    }
  }
  function hm(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new ad()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new ad()), t;
      default:
        throw Error(s(435, l.tag));
    }
  }
  function Sn(l, t) {
    var e = hm(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = Tm.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function kl(l, t) {
    var e = t.deletions;
    if (e !== null) for (var a = 0; a < e.length; a++) {
      var u = e[a], n = l, i = t, c = i;
      l: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
            if (ge(c.type)) {
              gl = c.stateNode, Fl = false;
              break l;
            }
            break;
          case 5:
            gl = c.stateNode, Fl = false;
            break l;
          case 3:
          case 4:
            gl = c.stateNode.containerInfo, Fl = true;
            break l;
        }
        c = c.return;
      }
      if (gl === null) throw Error(s(160));
      id(n, i, u), gl = null, Fl = false, n = u.alternate, n !== null && (n.return = null), u.return = null;
    }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) sd(t, l), t = t.sibling;
  }
  var Et = null;
  function sd(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        kl(t, l), Il(l), a & 4 && (de(3, l, l.return), iu(3, l), de(5, l, l.return));
        break;
      case 1:
        kl(t, l), Il(l), a & 512 && (Ml || e === null || Ut(e, e.return)), a & 64 && Kt && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Et;
        if (kl(t, l), Il(l), a & 512 && (Ml || e === null || Ut(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null) if (a === null) if (l.stateNode === null) {
            l: {
              a = l.type, e = l.memoizedProps, u = u.ownerDocument || u;
              t: switch (a) {
                case "title":
                  n = u.getElementsByTagName("title")[0], (!n || n[Ra] || n[ql] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(n, u.querySelector("head > title"))), Xl(n, a, e), n[ql] = l, Hl(n), a = n;
                  break l;
                case "link":
                  var i = sr("link", "href", u).get(a + (e.href || ""));
                  if (i) {
                    for (var c = 0; c < i.length; c++) if (n = i[c], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                      i.splice(c, 1);
                      break t;
                    }
                  }
                  n = u.createElement(a), Xl(n, a, e), u.head.appendChild(n);
                  break;
                case "meta":
                  if (i = sr("meta", "content", u).get(a + (e.content || ""))) {
                    for (c = 0; c < i.length; c++) if (n = i[c], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                      i.splice(c, 1);
                      break t;
                    }
                  }
                  n = u.createElement(a), Xl(n, a, e), u.head.appendChild(n);
                  break;
                default:
                  throw Error(s(468, a));
              }
              n[ql] = l, Hl(n), a = n;
            }
            l.stateNode = a;
          } else dr(u, l.type, l.stateNode);
          else l.stateNode = fr(u, a, l.memoizedProps);
          else n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? dr(u, l.type, l.stateNode) : fr(u, a, l.memoizedProps)) : a === null && l.stateNode !== null && Mc(l, l.memoizedProps, e.memoizedProps);
        }
        break;
      case 27:
        kl(t, l), Il(l), a & 512 && (Ml || e === null || Ut(e, e.return)), e !== null && a & 4 && Mc(l, l.memoizedProps, e.memoizedProps);
        break;
      case 5:
        if (kl(t, l), Il(l), a & 512 && (Ml || e === null || Ut(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            ke(u, "");
          } catch (j) {
            fl(l, l.return, j);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, Mc(l, u, e !== null ? e.memoizedProps : u)), a & 1024 && (Uc = true);
        break;
      case 6:
        if (kl(t, l), Il(l), a & 4) {
          if (l.stateNode === null) throw Error(s(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (j) {
            fl(l, l.return, j);
          }
        }
        break;
      case 3:
        if (Cn = null, u = Et, Et = Hn(t.containerInfo), kl(t, l), Et = u, Il(l), a & 4 && e !== null && e.memoizedState.isDehydrated) try {
          Ma(t.containerInfo);
        } catch (j) {
          fl(l, l.return, j);
        }
        Uc && (Uc = false, dd(l));
        break;
      case 4:
        a = Et, Et = Hn(l.stateNode.containerInfo), kl(t, l), Il(l), Et = a;
        break;
      case 12:
        kl(t, l), Il(l);
        break;
      case 31:
        kl(t, l), Il(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Sn(l, a)));
        break;
      case 13:
        kl(t, l), Il(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (pn = tt()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Sn(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = e !== null && e.memoizedState !== null, v = Kt, p = Ml;
        if (Kt = v || u, Ml = p || f, kl(t, l), Ml = p, Kt = v, Il(l), a & 8192) l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || f || Kt || Ml || Qe(l)), e = null, t = l; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (e === null) {
              f = e = t;
              try {
                if (n = f.stateNode, u) i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                else {
                  c = f.stateNode;
                  var E = f.memoizedProps.style, g = E != null && E.hasOwnProperty("display") ? E.display : null;
                  c.style.display = g == null || typeof g == "boolean" ? "" : ("" + g).trim();
                }
              } catch (j) {
                fl(f, f.return, j);
              }
            }
          } else if (t.tag === 6) {
            if (e === null) {
              f = t;
              try {
                f.stateNode.nodeValue = u ? "" : f.memoizedProps;
              } catch (j) {
                fl(f, f.return, j);
              }
            }
          } else if (t.tag === 18) {
            if (e === null) {
              f = t;
              try {
                var b = f.stateNode;
                u ? Pd(b, true) : Pd(f.stateNode, false);
              } catch (j) {
                fl(f, f.return, j);
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
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Sn(l, e))));
        break;
      case 19:
        kl(t, l), Il(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Sn(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        kl(t, l), Il(l);
    }
  }
  function Il(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (td(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = Nc(l);
            bn(l, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (ke(i, ""), e.flags &= -33);
            var c = Nc(l);
            bn(l, c, i);
            break;
          case 3:
          case 4:
            var f = e.stateNode.containerInfo, v = Nc(l);
            Dc(l, v, f);
            break;
          default:
            throw Error(s(161));
        }
      } catch (p) {
        fl(l, l.return, p);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function dd(l) {
    if (l.subtreeFlags & 1024) for (l = l.child; l !== null; ) {
      var t = l;
      dd(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
  }
  function wt(l, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) ud(l, t.alternate, t), t = t.sibling;
  }
  function Qe(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          de(4, t, t.return), Qe(t);
          break;
        case 1:
          Ut(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && P0(t, t.return, e), Qe(t);
          break;
        case 27:
          yu(t.stateNode);
        case 26:
        case 5:
          Ut(t, t.return), Qe(t);
          break;
        case 22:
          t.memoizedState === null && Qe(t);
          break;
        case 30:
          Qe(t);
          break;
        default:
          Qe(t);
      }
      l = l.sibling;
    }
  }
  function $t(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, u = l, n = t, i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          $t(u, n, e), iu(4, n);
          break;
        case 1:
          if ($t(u, n, e), a = n, u = a.stateNode, typeof u.componentDidMount == "function") try {
            u.componentDidMount();
          } catch (v) {
            fl(a, a.return, v);
          }
          if (a = n, u = a.updateQueue, u !== null) {
            var c = a.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null) for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++) Qs(f[u], c);
            } catch (v) {
              fl(a, a.return, v);
            }
          }
          e && i & 64 && I0(n), cu(n, n.return);
          break;
        case 27:
          ed(n);
        case 26:
        case 5:
          $t(u, n, e), e && a === null && i & 4 && ld(n), cu(n, n.return);
          break;
        case 12:
          $t(u, n, e);
          break;
        case 31:
          $t(u, n, e), e && i & 4 && cd(u, n);
          break;
        case 13:
          $t(u, n, e), e && i & 4 && fd(u, n);
          break;
        case 22:
          n.memoizedState === null && $t(u, n, e), cu(n, n.return);
          break;
        case 30:
          break;
        default:
          $t(u, n, e);
      }
      t = t.sibling;
    }
  }
  function jc(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && wa(e));
  }
  function Hc(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && wa(l));
  }
  function xt(l, t, e, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) rd(l, t, e, a), t = t.sibling;
  }
  function rd(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        xt(l, t, e, a), u & 2048 && iu(9, t);
        break;
      case 1:
        xt(l, t, e, a);
        break;
      case 3:
        xt(l, t, e, a), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && wa(l)));
        break;
      case 12:
        if (u & 2048) {
          xt(l, t, e, a), l = t.stateNode;
          try {
            var n = t.memoizedProps, i = n.id, c = n.onPostCommit;
            typeof c == "function" && c(i, t.alternate === null ? "mount" : "update", l.passiveEffectDuration, -0);
          } catch (f) {
            fl(t, t.return, f);
          }
        } else xt(l, t, e, a);
        break;
      case 31:
        xt(l, t, e, a);
        break;
      case 13:
        xt(l, t, e, a);
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, i = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? xt(l, t, e, a) : fu(l, t) : n._visibility & 2 ? xt(l, t, e, a) : (n._visibility |= 2, ga(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || false)), u & 2048 && jc(i, t);
        break;
      case 24:
        xt(l, t, e, a), u & 2048 && Hc(t.alternate, t);
        break;
      default:
        xt(l, t, e, a);
    }
  }
  function ga(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
      var n = l, i = t, c = e, f = a, v = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ga(n, i, c, f, u), iu(8, i);
          break;
        case 23:
          break;
        case 22:
          var p = i.stateNode;
          i.memoizedState !== null ? p._visibility & 2 ? ga(n, i, c, f, u) : fu(n, i) : (p._visibility |= 2, ga(n, i, c, f, u)), u && v & 2048 && jc(i.alternate, i);
          break;
        case 24:
          ga(n, i, c, f, u), u && v & 2048 && Hc(i.alternate, i);
          break;
        default:
          ga(n, i, c, f, u);
      }
      t = t.sibling;
    }
  }
  function fu(l, t) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
      var e = l, a = t, u = a.flags;
      switch (a.tag) {
        case 22:
          fu(e, a), u & 2048 && jc(a.alternate, a);
          break;
        case 24:
          fu(e, a), u & 2048 && Hc(a.alternate, a);
          break;
        default:
          fu(e, a);
      }
      t = t.sibling;
    }
  }
  var su = 8192;
  function ba(l, t, e) {
    if (l.subtreeFlags & su) for (l = l.child; l !== null; ) od(l, t, e), l = l.sibling;
  }
  function od(l, t, e) {
    switch (l.tag) {
      case 26:
        ba(l, t, e), l.flags & su && l.memoizedState !== null && lh(e, Et, l.memoizedState, l.memoizedProps);
        break;
      case 5:
        ba(l, t, e);
        break;
      case 3:
      case 4:
        var a = Et;
        Et = Hn(l.stateNode.containerInfo), ba(l, t, e), Et = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = su, su = 16777216, ba(l, t, e), su = a) : ba(l, t, e));
        break;
      default:
        ba(l, t, e);
    }
  }
  function md(l) {
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
        Rl = a, vd(a, l);
      }
      md(l);
    }
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) hd(l), l = l.sibling;
  }
  function hd(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        du(l), l.flags & 2048 && de(9, l, l.return);
        break;
      case 3:
        du(l);
        break;
      case 12:
        du(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, _n(l)) : du(l);
        break;
      default:
        du(l);
    }
  }
  function _n(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) for (var e = 0; e < t.length; e++) {
        var a = t[e];
        Rl = a, vd(a, l);
      }
      md(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          de(8, t, t.return), _n(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, _n(t));
          break;
        default:
          _n(t);
      }
      l = l.sibling;
    }
  }
  function vd(l, t) {
    for (; Rl !== null; ) {
      var e = Rl;
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
          wa(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Rl = a;
      else l: for (e = l; Rl !== null; ) {
        a = Rl;
        var u = a.sibling, n = a.return;
        if (nd(a), a === e) {
          Rl = null;
          break l;
        }
        if (u !== null) {
          u.return = n, Rl = u;
          break l;
        }
        Rl = n;
      }
    }
  }
  var vm = { getCacheForType: function(l) {
    var t = Yl(xl), e = t.data.get(l);
    return e === void 0 && (e = l(), t.data.set(l, e)), e;
  }, cacheSignal: function() {
    return Yl(xl).controller.signal;
  } }, ym = typeof WeakMap == "function" ? WeakMap : Map, nl = 0, hl = null, $ = null, k = 0, cl = 0, ft = null, re = false, Sa = false, Rc = false, Wt = 0, _l = 0, oe = 0, Ze = 0, Cc = 0, st = 0, _a = 0, ru = null, Pl = null, qc = false, pn = 0, yd = 0, zn = 1 / 0, Tn = null, me = null, Nl = 0, he = null, pa = null, Ft = 0, Bc = 0, Yc = null, gd = null, ou = 0, Gc = null;
  function dt() {
    return (nl & 2) !== 0 && k !== 0 ? k & -k : z.T !== null ? Kc() : Hf();
  }
  function bd() {
    if (st === 0) if ((k & 536870912) === 0 || ll) {
      var l = Du;
      Du <<= 1, (Du & 3932160) === 0 && (Du = 262144), st = l;
    } else st = 536870912;
    return l = it.current, l !== null && (l.flags |= 32), st;
  }
  function lt(l, t, e) {
    (l === hl && (cl === 2 || cl === 9) || l.cancelPendingCommit !== null) && (za(l, 0), ve(l, k, st, false)), Ha(l, e), ((nl & 2) === 0 || l !== hl) && (l === hl && ((nl & 2) === 0 && (Ze |= e), _l === 4 && ve(l, k, st, false)), jt(l));
  }
  function Sd(l, t, e) {
    if ((nl & 6) !== 0) throw Error(s(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || ja(l, t), u = a ? Sm(l, t) : Qc(l, t, true), n = a;
    do {
      if (u === 0) {
        Sa && !a && ve(l, t, 0, false);
        break;
      } else {
        if (e = l.current.alternate, n && !gm(e)) {
          u = Qc(l, t, false), n = false;
          continue;
        }
        if (u === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n) var i = 0;
          else i = l.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            t = i;
            l: {
              var c = l;
              u = ru;
              var f = c.current.memoizedState.isDehydrated;
              if (f && (za(c, i).flags |= 256), i = Qc(c, i, false), i !== 2) {
                if (Rc && !f) {
                  c.errorRecoveryDisabledLanes |= n, Ze |= n, u = 4;
                  break l;
                }
                n = Pl, Pl = u, n !== null && (Pl === null ? Pl = n : Pl.push.apply(Pl, n));
              }
              u = i;
            }
            if (n = false, u !== 2) continue;
          }
        }
        if (u === 1) {
          za(l, 0), ve(l, t, 0, true);
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
              ve(a, t, st, !re);
              break l;
            case 2:
              Pl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = pn + 300 - tt(), 10 < u)) {
            if (ve(a, t, st, !re), ju(a, 0, true) !== 0) break l;
            Ft = t, a.timeoutHandle = Fd(_d.bind(null, a, e, Pl, Tn, qc, t, st, Ze, _a, re, n, "Throttled", -0, 0), u);
            break l;
          }
          _d(a, e, Pl, Tn, qc, t, st, Ze, _a, re, n, null, -0, 0);
        }
      }
      break;
    } while (true);
    jt(l);
  }
  function _d(l, t, e, a, u, n, i, c, f, v, p, E, g, b) {
    if (l.timeoutHandle = -1, E = t.subtreeFlags, E & 8192 || (E & 16785408) === 16785408) {
      E = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: Ct }, od(t, n, E);
      var j = (n & 62914560) === n ? pn - tt() : (n & 4194048) === n ? yd - tt() : 0;
      if (j = th(E, j), j !== null) {
        Ft = n, l.cancelPendingCommit = j(Md.bind(null, l, t, n, e, a, u, i, c, f, p, E, null, g, b)), ve(l, n, i, !v);
        return;
      }
    }
    Md(l, t, n, e, a, u, i, c, f);
  }
  function gm(l) {
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
  function ve(l, t, e, a) {
    t &= ~Cc, t &= ~Ze, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - at(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && Df(l, e, t);
  }
  function En() {
    return (nl & 6) === 0 ? (mu(0), false) : true;
  }
  function Xc() {
    if ($ !== null) {
      if (cl === 0) var l = $.return;
      else l = $, Gt = He = null, ec(l), oa = null, Wa = 0, l = $;
      for (; l !== null; ) k0(l.alternate, l), l = l.return;
      $ = null;
    }
  }
  function za(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, Bm(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), Ft = 0, Xc(), hl = l, $ = e = Bt(l.current, null), k = t, cl = 0, ft = null, re = false, Sa = ja(l, t), Rc = false, _a = st = Cc = Ze = oe = _l = 0, Pl = ru = null, qc = false, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0) for (l = l.entanglements, a &= t; 0 < a; ) {
      var u = 31 - at(a), n = 1 << u;
      t |= l[u], a &= ~n;
    }
    return Wt = t, Vu(), e;
  }
  function pd(l, t) {
    L = null, z.H = au, t === ra || t === Iu ? (t = Bs(), cl = 3) : t === Vi ? (t = Bs(), cl = 4) : cl = t === bc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ft = t, $ === null && (_l = 1, mn(l, vt(t, l.current)));
  }
  function zd() {
    var l = it.current;
    return l === null ? true : (k & 4194048) === k ? St === null : (k & 62914560) === k || (k & 536870912) !== 0 ? l === St : false;
  }
  function Td() {
    var l = z.H;
    return z.H = au, l === null ? au : l;
  }
  function Ed() {
    var l = z.A;
    return z.A = vm, l;
  }
  function xn() {
    _l = 4, re || (k & 4194048) !== k && it.current !== null || (Sa = true), (oe & 134217727) === 0 && (Ze & 134217727) === 0 || hl === null || ve(hl, k, st, false);
  }
  function Qc(l, t, e) {
    var a = nl;
    nl |= 2;
    var u = Td(), n = Ed();
    (hl !== l || k !== t) && (Tn = null, za(l, t)), t = false;
    var i = _l;
    l: do
      try {
        if (cl !== 0 && $ !== null) {
          var c = $, f = ft;
          switch (cl) {
            case 8:
              Xc(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              it.current === null && (t = true);
              var v = cl;
              if (cl = 0, ft = null, Ta(l, c, f, v), e && Sa) {
                i = 0;
                break l;
              }
              break;
            default:
              v = cl, cl = 0, ft = null, Ta(l, c, f, v);
          }
        }
        bm(), i = _l;
        break;
      } catch (p) {
        pd(l, p);
      }
    while (true);
    return t && l.shellSuspendCounter++, Gt = He = null, nl = a, z.H = u, z.A = n, $ === null && (hl = null, k = 0, Vu()), i;
  }
  function bm() {
    for (; $ !== null; ) xd($);
  }
  function Sm(l, t) {
    var e = nl;
    nl |= 2;
    var a = Td(), u = Ed();
    hl !== l || k !== t ? (Tn = null, zn = tt() + 500, za(l, t)) : Sa = ja(l, t);
    l: do
      try {
        if (cl !== 0 && $ !== null) {
          t = $;
          var n = ft;
          t: switch (cl) {
            case 1:
              cl = 0, ft = null, Ta(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Cs(n)) {
                cl = 0, ft = null, Ad(t);
                break;
              }
              t = function() {
                cl !== 2 && cl !== 9 || hl !== l || (cl = 7), jt(l);
              }, n.then(t, t);
              break l;
            case 3:
              cl = 7;
              break l;
            case 4:
              cl = 5;
              break l;
            case 7:
              Cs(n) ? (cl = 0, ft = null, Ad(t)) : (cl = 0, ft = null, Ta(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch ($.tag) {
                case 26:
                  i = $.memoizedState;
                case 5:
                case 27:
                  var c = $;
                  if (i ? rr(i) : c.stateNode.complete) {
                    cl = 0, ft = null;
                    var f = c.sibling;
                    if (f !== null) $ = f;
                    else {
                      var v = c.return;
                      v !== null ? ($ = v, An(v)) : $ = null;
                    }
                    break t;
                  }
              }
              cl = 0, ft = null, Ta(l, t, n, 5);
              break;
            case 6:
              cl = 0, ft = null, Ta(l, t, n, 6);
              break;
            case 8:
              Xc(), _l = 6;
              break l;
            default:
              throw Error(s(462));
          }
        }
        _m();
        break;
      } catch (p) {
        pd(l, p);
      }
    while (true);
    return Gt = He = null, z.H = a, z.A = u, nl = e, $ !== null ? 0 : (hl = null, k = 0, Vu(), _l);
  }
  function _m() {
    for (; $ !== null && !Zr(); ) xd($);
  }
  function xd(l) {
    var t = W0(l.alternate, l, Wt);
    l.memoizedProps = l.pendingProps, t === null ? An(l) : $ = t;
  }
  function Ad(l) {
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
        ec(t);
      default:
        k0(e, t), t = $ = Es(t, Wt), t = W0(e, t, Wt);
    }
    l.memoizedProps = l.pendingProps, t === null ? An(l) : $ = t;
  }
  function Ta(l, t, e, a) {
    Gt = He = null, ec(t), oa = null, Wa = 0;
    var u = t.return;
    try {
      if (fm(l, u, t, e, k)) {
        _l = 1, mn(l, vt(e, l.current)), $ = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw $ = u, n;
      _l = 1, mn(l, vt(e, l.current)), $ = null;
      return;
    }
    t.flags & 32768 ? (ll || a === 1 ? l = true : Sa || (k & 536870912) !== 0 ? l = false : (re = l = true, (a === 2 || a === 9 || a === 3 || a === 6) && (a = it.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Od(t, l)) : An(t);
  }
  function An(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Od(t, re);
        return;
      }
      l = t.return;
      var e = rm(t.alternate, t, Wt);
      if (e !== null) {
        $ = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        $ = t;
        return;
      }
      $ = t = l;
    } while (t !== null);
    _l === 0 && (_l = 5);
  }
  function Od(l, t) {
    do {
      var e = om(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, $ = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        $ = l;
        return;
      }
      $ = l = e;
    } while (l !== null);
    _l = 6, $ = null;
  }
  function Md(l, t, e, a, u, n, i, c, f) {
    l.cancelPendingCommit = null;
    do
      On();
    while (Nl !== 0);
    if ((nl & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === l.current) throw Error(s(177));
      if (n = t.lanes | t.childLanes, n |= Ni, Ir(l, e, n, i, c, f), l === hl && ($ = hl = null, k = 0), pa = t, he = l, Ft = e, Bc = n, Yc = u, gd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Em(Mu, function() {
        return Hd(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = z.T, z.T = null, u = D.p, D.p = 2, i = nl, nl |= 4;
        try {
          mm(l, t, e);
        } finally {
          nl = i, D.p = u, z.T = a;
        }
      }
      Nl = 1, Nd(), Dd(), Ud();
    }
  }
  function Nd() {
    if (Nl === 1) {
      Nl = 0;
      var l = he, t = pa, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = z.T, z.T = null;
        var a = D.p;
        D.p = 2;
        var u = nl;
        nl |= 4;
        try {
          sd(t, l);
          var n = Pc, i = vs(l.containerInfo), c = n.focusedElem, f = n.selectionRange;
          if (i !== c && c && c.ownerDocument && hs(c.ownerDocument.documentElement, c)) {
            if (f !== null && Ei(c)) {
              var v = f.start, p = f.end;
              if (p === void 0 && (p = v), "selectionStart" in c) c.selectionStart = v, c.selectionEnd = Math.min(p, c.value.length);
              else {
                var E = c.ownerDocument || document, g = E && E.defaultView || window;
                if (g.getSelection) {
                  var b = g.getSelection(), j = c.textContent.length, G = Math.min(f.start, j), ol = f.end === void 0 ? G : Math.min(f.end, j);
                  !b.extend && G > ol && (i = ol, ol = G, G = i);
                  var o = ms(c, G), d = ms(c, ol);
                  if (o && d && (b.rangeCount !== 1 || b.anchorNode !== o.node || b.anchorOffset !== o.offset || b.focusNode !== d.node || b.focusOffset !== d.offset)) {
                    var m = E.createRange();
                    m.setStart(o.node, o.offset), b.removeAllRanges(), G > ol ? (b.addRange(m), b.extend(d.node, d.offset)) : (m.setEnd(d.node, d.offset), b.addRange(m));
                  }
                }
              }
            }
            for (E = [], b = c; b = b.parentNode; ) b.nodeType === 1 && E.push({ element: b, left: b.scrollLeft, top: b.scrollTop });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < E.length; c++) {
              var T = E[c];
              T.element.scrollLeft = T.left, T.element.scrollTop = T.top;
            }
          }
          Gn = !!Ic, Pc = Ic = null;
        } finally {
          nl = u, D.p = a, z.T = e;
        }
      }
      l.current = t, Nl = 2;
    }
  }
  function Dd() {
    if (Nl === 2) {
      Nl = 0;
      var l = he, t = pa, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = z.T, z.T = null;
        var a = D.p;
        D.p = 2;
        var u = nl;
        nl |= 4;
        try {
          ud(l, t.alternate, t);
        } finally {
          nl = u, D.p = a, z.T = e;
        }
      }
      Nl = 3;
    }
  }
  function Ud() {
    if (Nl === 4 || Nl === 3) {
      Nl = 0, Lr();
      var l = he, t = pa, e = Ft, a = gd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Nl = 5 : (Nl = 0, pa = he = null, jd(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (me = null), ni(e), t = t.stateNode, et && typeof et.onCommitFiberRoot == "function") try {
        et.onCommitFiberRoot(Ua, t, void 0, (t.current.flags & 128) === 128);
      } catch {
      }
      if (a !== null) {
        t = z.T, u = D.p, D.p = 2, z.T = null;
        try {
          for (var n = l.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            n(c.value, { componentStack: c.stack });
          }
        } finally {
          z.T = t, D.p = u;
        }
      }
      (Ft & 3) !== 0 && On(), jt(l), u = l.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? l === Gc ? ou++ : (ou = 0, Gc = l) : ou = 0, mu(0);
    }
  }
  function jd(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, wa(t)));
  }
  function On() {
    return Nd(), Dd(), Ud(), Hd();
  }
  function Hd() {
    if (Nl !== 5) return false;
    var l = he, t = Bc;
    Bc = 0;
    var e = ni(Ft), a = z.T, u = D.p;
    try {
      D.p = 32 > e ? 32 : e, z.T = null, e = Yc, Yc = null;
      var n = he, i = Ft;
      if (Nl = 0, pa = he = null, Ft = 0, (nl & 6) !== 0) throw Error(s(331));
      var c = nl;
      if (nl |= 4, hd(n.current), rd(n, n.current, i, e), nl = c, mu(0, false), et && typeof et.onPostCommitFiberRoot == "function") try {
        et.onPostCommitFiberRoot(Ua, n);
      } catch {
      }
      return true;
    } finally {
      D.p = u, z.T = a, jd(l, t);
    }
  }
  function Rd(l, t, e) {
    t = vt(e, t), t = gc(l.stateNode, t, 2), l = ce(l, t, 2), l !== null && (Ha(l, 2), jt(l));
  }
  function fl(l, t, e) {
    if (l.tag === 3) Rd(l, l, e);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Rd(t, l, e);
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (me === null || !me.has(a))) {
          l = vt(e, l), e = C0(2), a = ce(t, e, 2), a !== null && (q0(e, a, t, l), Ha(a, 2), jt(a));
          break;
        }
      }
      t = t.return;
    }
  }
  function Zc(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new ym();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (Rc = true, u.add(e), l = pm.bind(null, l, t, e), t.then(l, l));
  }
  function pm(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, hl === l && (k & e) === e && (_l === 4 || _l === 3 && (k & 62914560) === k && 300 > tt() - pn ? (nl & 2) === 0 && za(l, 0) : Cc |= e, _a === k && (_a = 0)), jt(l);
  }
  function Cd(l, t) {
    t === 0 && (t = Nf()), l = De(l, t), l !== null && (Ha(l, t), jt(l));
  }
  function zm(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Cd(l, e);
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
        throw Error(s(314));
    }
    a !== null && a.delete(t), Cd(l, e);
  }
  function Em(l, t) {
    return ti(l, t);
  }
  var Mn = null, Ea = null, Lc = false, Nn = false, Vc = false, ye = 0;
  function jt(l) {
    l !== Ea && l.next === null && (Ea === null ? Mn = Ea = l : Ea = Ea.next = l), Nn = true, Lc || (Lc = true, Am());
  }
  function mu(l, t) {
    if (!Vc && Nn) {
      Vc = true;
      do
        for (var e = false, a = Mn; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - at(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = true, Gd(a, n));
          } else n = k, n = ju(a, a === hl ? n : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (n & 3) === 0 || ja(a, n) || (e = true, Gd(a, n));
          a = a.next;
        }
      while (e);
      Vc = false;
    }
  }
  function xm() {
    qd();
  }
  function qd() {
    Nn = Lc = false;
    var l = 0;
    ye !== 0 && qm() && (l = ye);
    for (var t = tt(), e = null, a = Mn; a !== null; ) {
      var u = a.next, n = Bd(a, t);
      n === 0 ? (a.next = null, e === null ? Mn = u : e.next = u, u === null && (Ea = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (Nn = true)), a = u;
    }
    Nl !== 0 && Nl !== 5 || mu(l), ye !== 0 && (ye = 0);
  }
  function Bd(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - at(n), c = 1 << i, f = u[i];
      f === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = kr(c, t)) : f <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = hl, e = k, e = ju(l, l === t ? e : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a = l.callbackNode, e === 0 || l === t && (cl === 2 || cl === 9) || l.cancelPendingCommit !== null) return a !== null && a !== null && ei(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || ja(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && ei(a), ni(e)) {
        case 2:
        case 8:
          e = Of;
          break;
        case 32:
          e = Mu;
          break;
        case 268435456:
          e = Mf;
          break;
        default:
          e = Mu;
      }
      return a = Yd.bind(null, l), e = ti(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && ei(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Yd(l, t) {
    if (Nl !== 0 && Nl !== 5) return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (On() && l.callbackNode !== e) return null;
    var a = k;
    return a = ju(l, l === hl ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a === 0 ? null : (Sd(l, a, t), Bd(l, tt()), l.callbackNode != null && l.callbackNode === e ? Yd.bind(null, l) : null);
  }
  function Gd(l, t) {
    if (On()) return null;
    Sd(l, t, true);
  }
  function Am() {
    Ym(function() {
      (nl & 6) !== 0 ? ti(Af, xm) : qd();
    });
  }
  function Kc() {
    if (ye === 0) {
      var l = sa;
      l === 0 && (l = Nu, Nu <<= 1, (Nu & 261888) === 0 && (Nu = 256)), ye = l;
    }
    return ye;
  }
  function Xd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : qu("" + l);
  }
  function Qd(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Om(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Xd((u[$l] || null).action), i = a.submitter;
      i && (t = (t = i[$l] || null) ? Xd(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
      var c = new Xu("action", "action", null, a, u);
      l.push({ event: c, listeners: [{ instance: null, listener: function() {
        if (a.defaultPrevented) {
          if (ye !== 0) {
            var f = i ? Qd(u, i) : new FormData(u);
            rc(e, { pending: true, data: f, method: u.method, action: n }, null, f);
          }
        } else typeof n == "function" && (c.preventDefault(), f = i ? Qd(u, i) : new FormData(u), rc(e, { pending: true, data: f, method: u.method, action: n }, n, f));
      }, currentTarget: u }] });
    }
  }
  for (var Jc = 0; Jc < Mi.length; Jc++) {
    var wc = Mi[Jc], Mm = wc.toLowerCase(), Nm = wc[0].toUpperCase() + wc.slice(1);
    Tt(Mm, "on" + Nm);
  }
  Tt(bs, "onAnimationEnd"), Tt(Ss, "onAnimationIteration"), Tt(_s, "onAnimationStart"), Tt("dblclick", "onDoubleClick"), Tt("focusin", "onFocus"), Tt("focusout", "onBlur"), Tt(Ko, "onTransitionRun"), Tt(Jo, "onTransitionStart"), Tt(wo, "onTransitionCancel"), Tt(ps, "onTransitionEnd"), We("onMouseEnter", ["mouseout", "mouseover"]), We("onMouseLeave", ["mouseout", "mouseover"]), We("onPointerEnter", ["pointerout", "pointerover"]), We("onPointerLeave", ["pointerout", "pointerover"]), Ae("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ae("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ae("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ae("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ae("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ae("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var hu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Dm = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(hu));
  function Zd(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t) for (var i = a.length - 1; 0 <= i; i--) {
          var c = a[i], f = c.instance, v = c.currentTarget;
          if (c = c.listener, f !== n && u.isPropagationStopped()) break l;
          n = c, u.currentTarget = v;
          try {
            n(u);
          } catch (p) {
            Lu(p);
          }
          u.currentTarget = null, n = f;
        }
        else for (i = 0; i < a.length; i++) {
          if (c = a[i], f = c.instance, v = c.currentTarget, c = c.listener, f !== n && u.isPropagationStopped()) break l;
          n = c, u.currentTarget = v;
          try {
            n(u);
          } catch (p) {
            Lu(p);
          }
          u.currentTarget = null, n = f;
        }
      }
    }
  }
  function W(l, t) {
    var e = t[ii];
    e === void 0 && (e = t[ii] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Ld(t, l, 2, false), e.add(a));
  }
  function $c(l, t, e) {
    var a = 0;
    t && (a |= 4), Ld(e, l, a, t);
  }
  var Dn = "_reactListening" + Math.random().toString(36).slice(2);
  function Wc(l) {
    if (!l[Dn]) {
      l[Dn] = true, qf.forEach(function(e) {
        e !== "selectionchange" && (Dm.has(e) || $c(e, false, l), $c(e, true, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Dn] || (t[Dn] = true, $c("selectionchange", false, t));
    }
  }
  function Ld(l, t, e, a) {
    switch (br(t)) {
      case 2:
        var u = uh;
        break;
      case 8:
        u = nh;
        break;
      default:
        u = rf;
    }
    e = u.bind(null, t, e, l), u = void 0, !vi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = true), a ? u !== void 0 ? l.addEventListener(t, e, { capture: true, passive: u }) : l.addEventListener(t, e, true) : u !== void 0 ? l.addEventListener(t, e, { passive: u }) : l.addEventListener(t, e, false);
  }
  function Fc(l, t, e, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null) l: for (; ; ) {
      if (a === null) return;
      var i = a.tag;
      if (i === 3 || i === 4) {
        var c = a.stateNode.containerInfo;
        if (c === u) break;
        if (i === 4) for (i = a.return; i !== null; ) {
          var f = i.tag;
          if ((f === 3 || f === 4) && i.stateNode.containerInfo === u) return;
          i = i.return;
        }
        for (; c !== null; ) {
          if (i = Je(c), i === null) return;
          if (f = i.tag, f === 5 || f === 6 || f === 26 || f === 27) {
            a = n = i;
            continue l;
          }
          c = c.parentNode;
        }
      }
      a = a.return;
    }
    $f(function() {
      var v = n, p = mi(e), E = [];
      l: {
        var g = zs.get(l);
        if (g !== void 0) {
          var b = Xu, j = l;
          switch (l) {
            case "keypress":
              if (Yu(e) === 0) break l;
            case "keydown":
            case "keyup":
              b = To;
              break;
            case "focusin":
              j = "focus", b = Si;
              break;
            case "focusout":
              j = "blur", b = Si;
              break;
            case "beforeblur":
            case "afterblur":
              b = Si;
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
              b = kf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              b = ro;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              b = Ao;
              break;
            case bs:
            case Ss:
            case _s:
              b = ho;
              break;
            case ps:
              b = Mo;
              break;
            case "scroll":
            case "scrollend":
              b = fo;
              break;
            case "wheel":
              b = Do;
              break;
            case "copy":
            case "cut":
            case "paste":
              b = yo;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              b = Pf;
              break;
            case "toggle":
            case "beforetoggle":
              b = jo;
          }
          var G = (t & 4) !== 0, ol = !G && (l === "scroll" || l === "scrollend"), o = G ? g !== null ? g + "Capture" : null : g;
          G = [];
          for (var d = v, m; d !== null; ) {
            var T = d;
            if (m = T.stateNode, T = T.tag, T !== 5 && T !== 26 && T !== 27 || m === null || o === null || (T = qa(d, o), T != null && G.push(vu(d, T, m))), ol) break;
            d = d.return;
          }
          0 < G.length && (g = new b(g, j, null, e, p), E.push({ event: g, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (g = l === "mouseover" || l === "pointerover", b = l === "mouseout" || l === "pointerout", g && e !== oi && (j = e.relatedTarget || e.fromElement) && (Je(j) || j[Ke])) break l;
          if ((b || g) && (g = p.window === p ? p : (g = p.ownerDocument) ? g.defaultView || g.parentWindow : window, b ? (j = e.relatedTarget || e.toElement, b = v, j = j ? Je(j) : null, j !== null && (ol = H(j), G = j.tag, j !== ol || G !== 5 && G !== 27 && G !== 6) && (j = null)) : (b = null, j = v), b !== j)) {
            if (G = kf, T = "onMouseLeave", o = "onMouseEnter", d = "mouse", (l === "pointerout" || l === "pointerover") && (G = Pf, T = "onPointerLeave", o = "onPointerEnter", d = "pointer"), ol = b == null ? g : Ca(b), m = j == null ? g : Ca(j), g = new G(T, d + "leave", b, e, p), g.target = ol, g.relatedTarget = m, T = null, Je(p) === v && (G = new G(o, d + "enter", j, e, p), G.target = m, G.relatedTarget = ol, T = G), ol = T, b && j) t: {
              for (G = Um, o = b, d = j, m = 0, T = o; T; T = G(T)) m++;
              T = 0;
              for (var q = d; q; q = G(q)) T++;
              for (; 0 < m - T; ) o = G(o), m--;
              for (; 0 < T - m; ) d = G(d), T--;
              for (; m--; ) {
                if (o === d || d !== null && o === d.alternate) {
                  G = o;
                  break t;
                }
                o = G(o), d = G(d);
              }
              G = null;
            }
            else G = null;
            b !== null && Vd(E, g, b, G, false), j !== null && ol !== null && Vd(E, ol, j, G, true);
          }
        }
        l: {
          if (g = v ? Ca(v) : window, b = g.nodeName && g.nodeName.toLowerCase(), b === "select" || b === "input" && g.type === "file") var al = cs;
          else if (ns(g)) if (fs) al = Zo;
          else {
            al = Xo;
            var C = Go;
          }
          else b = g.nodeName, !b || b.toLowerCase() !== "input" || g.type !== "checkbox" && g.type !== "radio" ? v && ri(v.elementType) && (al = cs) : al = Qo;
          if (al && (al = al(l, v))) {
            is(E, al, e, p);
            break l;
          }
          C && C(l, g, v), l === "focusout" && v && g.type === "number" && v.memoizedProps.value != null && di(g, "number", g.value);
        }
        switch (C = v ? Ca(v) : window, l) {
          case "focusin":
            (ns(C) || C.contentEditable === "true") && (ta = C, xi = v, Va = null);
            break;
          case "focusout":
            Va = xi = ta = null;
            break;
          case "mousedown":
            Ai = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ai = false, ys(E, e, p);
            break;
          case "selectionchange":
            if (Vo) break;
          case "keydown":
          case "keyup":
            ys(E, e, p);
        }
        var V;
        if (pi) l: {
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
        else la ? as(l, e) && (I = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (I = "onCompositionStart");
        I && (ls && e.locale !== "ko" && (la || I !== "onCompositionStart" ? I === "onCompositionEnd" && la && (V = Wf()) : (le = p, yi = "value" in le ? le.value : le.textContent, la = true)), C = Un(v, I), 0 < C.length && (I = new If(I, l, null, e, p), E.push({ event: I, listeners: C }), V ? I.data = V : (V = us(e), V !== null && (I.data = V)))), (V = Ro ? Co(l, e) : qo(l, e)) && (I = Un(v, "onBeforeInput"), 0 < I.length && (C = new If("onBeforeInput", "beforeinput", null, e, p), E.push({ event: C, listeners: I }), C.data = V)), Om(E, l, v, e, p);
      }
      Zd(E, t);
    });
  }
  function vu(l, t, e) {
    return { instance: l, listener: t, currentTarget: e };
  }
  function Un(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = qa(l, e), u != null && a.unshift(vu(l, u, n)), u = qa(l, t), u != null && a.push(vu(l, u, n))), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function Um(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Vd(l, t, e, a, u) {
    for (var n = t._reactName, i = []; e !== null && e !== a; ) {
      var c = e, f = c.alternate, v = c.stateNode;
      if (c = c.tag, f !== null && f === a) break;
      c !== 5 && c !== 26 && c !== 27 || v === null || (f = v, u ? (v = qa(e, n), v != null && i.unshift(vu(e, v, f))) : u || (v = qa(e, n), v != null && i.push(vu(e, v, f)))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var jm = /\r\n?/g, Hm = /\u0000|\uFFFD/g;
  function Kd(l) {
    return (typeof l == "string" ? l : "" + l).replace(jm, `
`).replace(Hm, "");
  }
  function Jd(l, t) {
    return t = Kd(t), Kd(l) === t;
  }
  function rl(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || ke(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && ke(l, "" + a);
        break;
      case "className":
        Ru(l, "class", a);
        break;
      case "tabIndex":
        Ru(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ru(l, e, a);
        break;
      case "style":
        Jf(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          Ru(l, "data", a);
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
        a = qu("" + a), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(e, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof n == "function" && (e === "formAction" ? (t !== "input" && rl(l, t, "name", u.name, u, null), rl(l, t, "formEncType", u.formEncType, u, null), rl(l, t, "formMethod", u.formMethod, u, null), rl(l, t, "formTarget", u.formTarget, u, null)) : (rl(l, t, "encType", u.encType, u, null), rl(l, t, "method", u.method, u, null), rl(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = qu("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = Ct);
        break;
      case "onScroll":
        a != null && W("scroll", l);
        break;
      case "onScrollEnd":
        a != null && W("scrollend", l);
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
        e = qu("" + a), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e);
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
        W("beforetoggle", l), W("toggle", l), Hu(l, "popover", a);
        break;
      case "xlinkActuate":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        Rt(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        Rt(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        Rt(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        Rt(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Hu(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = io.get(e) || e, Hu(l, e, a));
    }
  }
  function kc(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Jf(l, a, n);
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
        typeof a == "string" ? ke(l, a) : (typeof a == "number" || typeof a == "bigint") && ke(l, "" + a);
        break;
      case "onScroll":
        a != null && W("scroll", l);
        break;
      case "onScrollEnd":
        a != null && W("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Ct);
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
        if (!Bf.hasOwnProperty(e)) l: {
          if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[$l] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
            typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
            break l;
          }
          e in l ? l[e] = a : a === true ? l.setAttribute(e, "") : Hu(l, e, a);
        }
    }
  }
  function Xl(l, t, e) {
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
        W("error", l), W("load", l);
        var a = false, u = false, n;
        for (n in e) if (e.hasOwnProperty(n)) {
          var i = e[n];
          if (i != null) switch (n) {
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
              rl(l, t, n, i, e, null);
          }
        }
        u && rl(l, t, "srcSet", e.srcSet, e, null), a && rl(l, t, "src", e.src, e, null);
        return;
      case "input":
        W("invalid", l);
        var c = n = i = u = null, f = null, v = null;
        for (a in e) if (e.hasOwnProperty(a)) {
          var p = e[a];
          if (p != null) switch (a) {
            case "name":
              u = p;
              break;
            case "type":
              i = p;
              break;
            case "checked":
              f = p;
              break;
            case "defaultChecked":
              v = p;
              break;
            case "value":
              n = p;
              break;
            case "defaultValue":
              c = p;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (p != null) throw Error(s(137, t));
              break;
            default:
              rl(l, t, a, p, e, null);
          }
        }
        Zf(l, n, c, f, v, i, u, false);
        return;
      case "select":
        W("invalid", l), a = i = n = null;
        for (u in e) if (e.hasOwnProperty(u) && (c = e[u], c != null)) switch (u) {
          case "value":
            n = c;
            break;
          case "defaultValue":
            i = c;
            break;
          case "multiple":
            a = c;
          default:
            rl(l, t, u, c, e, null);
        }
        t = n, e = i, l.multiple = !!a, t != null ? Fe(l, !!a, t, false) : e != null && Fe(l, !!a, e, true);
        return;
      case "textarea":
        W("invalid", l), n = u = a = null;
        for (i in e) if (e.hasOwnProperty(i) && (c = e[i], c != null)) switch (i) {
          case "value":
            a = c;
            break;
          case "defaultValue":
            u = c;
            break;
          case "children":
            n = c;
            break;
          case "dangerouslySetInnerHTML":
            if (c != null) throw Error(s(91));
            break;
          default:
            rl(l, t, i, c, e, null);
        }
        Vf(l, a, u, n);
        return;
      case "option":
        for (f in e) e.hasOwnProperty(f) && (a = e[f], a != null) && (f === "selected" ? l.selected = a && typeof a != "function" && typeof a != "symbol" : rl(l, t, f, a, e, null));
        return;
      case "dialog":
        W("beforetoggle", l), W("toggle", l), W("cancel", l), W("close", l);
        break;
      case "iframe":
      case "object":
        W("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < hu.length; a++) W(hu[a], l);
        break;
      case "image":
        W("error", l), W("load", l);
        break;
      case "details":
        W("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        W("error", l), W("load", l);
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
            rl(l, t, v, a, e, null);
        }
        return;
      default:
        if (ri(t)) {
          for (p in e) e.hasOwnProperty(p) && (a = e[p], a !== void 0 && kc(l, t, p, a, e, void 0));
          return;
        }
    }
    for (c in e) e.hasOwnProperty(c) && (a = e[c], a != null && rl(l, t, c, a, e, null));
  }
  function Rm(l, t, e, a) {
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
        var u = null, n = null, i = null, c = null, f = null, v = null, p = null;
        for (b in e) {
          var E = e[b];
          if (e.hasOwnProperty(b) && E != null) switch (b) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              f = E;
            default:
              a.hasOwnProperty(b) || rl(l, t, b, null, a, E);
          }
        }
        for (var g in a) {
          var b = a[g];
          if (E = e[g], a.hasOwnProperty(g) && (b != null || E != null)) switch (g) {
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
              p = b;
              break;
            case "value":
              i = b;
              break;
            case "defaultValue":
              c = b;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (b != null) throw Error(s(137, t));
              break;
            default:
              b !== E && rl(l, t, g, b, a, E);
          }
        }
        si(l, i, c, f, v, p, n, u);
        return;
      case "select":
        b = i = c = g = null;
        for (n in e) if (f = e[n], e.hasOwnProperty(n) && f != null) switch (n) {
          case "value":
            break;
          case "multiple":
            b = f;
          default:
            a.hasOwnProperty(n) || rl(l, t, n, null, a, f);
        }
        for (u in a) if (n = a[u], f = e[u], a.hasOwnProperty(u) && (n != null || f != null)) switch (u) {
          case "value":
            g = n;
            break;
          case "defaultValue":
            c = n;
            break;
          case "multiple":
            i = n;
          default:
            n !== f && rl(l, t, u, n, a, f);
        }
        t = c, e = i, a = b, g != null ? Fe(l, !!e, g, false) : !!a != !!e && (t != null ? Fe(l, !!e, t, true) : Fe(l, !!e, e ? [] : "", false));
        return;
      case "textarea":
        b = g = null;
        for (c in e) if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c)) switch (c) {
          case "value":
            break;
          case "children":
            break;
          default:
            rl(l, t, c, null, a, u);
        }
        for (i in a) if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null)) switch (i) {
          case "value":
            g = u;
            break;
          case "defaultValue":
            b = u;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (u != null) throw Error(s(91));
            break;
          default:
            u !== n && rl(l, t, i, u, a, n);
        }
        Lf(l, g, b);
        return;
      case "option":
        for (var j in e) g = e[j], e.hasOwnProperty(j) && g != null && !a.hasOwnProperty(j) && (j === "selected" ? l.selected = false : rl(l, t, j, null, a, g));
        for (f in a) g = a[f], b = e[f], a.hasOwnProperty(f) && g !== b && (g != null || b != null) && (f === "selected" ? l.selected = g && typeof g != "function" && typeof g != "symbol" : rl(l, t, f, g, a, b));
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
        for (var G in e) g = e[G], e.hasOwnProperty(G) && g != null && !a.hasOwnProperty(G) && rl(l, t, G, null, a, g);
        for (v in a) if (g = a[v], b = e[v], a.hasOwnProperty(v) && g !== b && (g != null || b != null)) switch (v) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (g != null) throw Error(s(137, t));
            break;
          default:
            rl(l, t, v, g, a, b);
        }
        return;
      default:
        if (ri(t)) {
          for (var ol in e) g = e[ol], e.hasOwnProperty(ol) && g !== void 0 && !a.hasOwnProperty(ol) && kc(l, t, ol, void 0, a, g);
          for (p in a) g = a[p], b = e[p], !a.hasOwnProperty(p) || g === b || g === void 0 && b === void 0 || kc(l, t, p, g, a, b);
          return;
        }
    }
    for (var o in e) g = e[o], e.hasOwnProperty(o) && g != null && !a.hasOwnProperty(o) && rl(l, t, o, null, a, g);
    for (E in a) g = a[E], b = e[E], !a.hasOwnProperty(E) || g === b || g == null && b == null || rl(l, t, E, g, a, b);
  }
  function wd(l) {
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
  function Cm() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && wd(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var f = e[a], v = f.startTime;
            if (v > c) break;
            var p = f.transferSize, E = f.initiatorType;
            p && wd(E) && (f = f.responseEnd, i += p * (f < c ? 1 : (c - v) / (f - v)));
          }
          if (--a, t += 8 * (n + i) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Ic = null, Pc = null;
  function jn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function $d(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Wd(l, t) {
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
  function lf(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var tf = null;
  function qm() {
    var l = window.event;
    return l && l.type === "popstate" ? l === tf ? false : (tf = l, true) : (tf = null, false);
  }
  var Fd = typeof setTimeout == "function" ? setTimeout : void 0, Bm = typeof clearTimeout == "function" ? clearTimeout : void 0, kd = typeof Promise == "function" ? Promise : void 0, Ym = typeof queueMicrotask == "function" ? queueMicrotask : typeof kd < "u" ? function(l) {
    return kd.resolve(null).then(l).catch(Gm);
  } : Fd;
  function Gm(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function ge(l) {
    return l === "head";
  }
  function Id(l, t) {
    var e = t, a = 0;
    do {
      var u = e.nextSibling;
      if (l.removeChild(e), u && u.nodeType === 8) if (e = u.data, e === "/$" || e === "/&") {
        if (a === 0) {
          l.removeChild(u), Ma(t);
          return;
        }
        a--;
      } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&") a++;
      else if (e === "html") yu(l.ownerDocument.documentElement);
      else if (e === "head") {
        e = l.ownerDocument.head, yu(e);
        for (var n = e.firstChild; n; ) {
          var i = n.nextSibling, c = n.nodeName;
          n[Ra] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
        }
      } else e === "body" && yu(l.ownerDocument.body);
      e = u;
    } while (e);
    Ma(t);
  }
  function Pd(l, t) {
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
  function ef(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ef(e), ci(e);
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
  function Xm(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (a) {
        if (!l[Ra]) switch (t) {
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
      if (l = _t(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Qm(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = _t(l.nextSibling), l === null)) return null;
    return l;
  }
  function lr(l, t) {
    for (; l.nodeType !== 8; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = _t(l.nextSibling), l === null)) return null;
    return l;
  }
  function af(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function uf(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Zm(l, t) {
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
  function _t(l) {
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
  var nf = null;
  function tr(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0) return _t(l.nextSibling);
          t--;
        } else e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function er(l) {
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
  function ar(l, t, e) {
    switch (t = jn(e), l) {
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
  function yu(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    ci(l);
  }
  var pt = /* @__PURE__ */ new Map(), ur = /* @__PURE__ */ new Set();
  function Hn(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var kt = D.d;
  D.d = { f: Lm, r: Vm, D: Km, C: Jm, L: wm, m: $m, X: Fm, S: Wm, M: km };
  function Lm() {
    var l = kt.f(), t = En();
    return l || t;
  }
  function Vm(l) {
    var t = we(l);
    t !== null && t.tag === 5 && t.type === "form" ? p0(t) : kt.r(l);
  }
  var xa = typeof document > "u" ? null : document;
  function nr(l, t, e) {
    var a = xa;
    if (a && typeof t == "string" && t) {
      var u = mt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), ur.has(u) || (ur.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), Xl(t, "link", l), Hl(t), a.head.appendChild(t)));
    }
  }
  function Km(l) {
    kt.D(l), nr("dns-prefetch", l, null);
  }
  function Jm(l, t) {
    kt.C(l, t), nr("preconnect", l, t);
  }
  function wm(l, t, e) {
    kt.L(l, t, e);
    var a = xa;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + mt(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + mt(e.imageSrcSet) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + mt(e.imageSizes) + '"]')) : u += '[href="' + mt(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = Aa(l);
          break;
        case "script":
          n = Oa(l);
      }
      pt.has(n) || (l = Y({ rel: "preload", href: t === "image" && e && e.imageSrcSet ? void 0 : l, as: t }, e), pt.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(gu(n)) || t === "script" && a.querySelector(bu(n)) || (t = a.createElement("link"), Xl(t, "link", l), Hl(t), a.head.appendChild(t)));
    }
  }
  function $m(l, t) {
    kt.m(l, t);
    var e = xa;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + mt(a) + '"][href="' + mt(l) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Oa(l);
      }
      if (!pt.has(n) && (l = Y({ rel: "modulepreload", href: l }, t), pt.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(bu(n))) return;
        }
        a = e.createElement("link"), Xl(a, "link", l), Hl(a), e.head.appendChild(a);
      }
    }
  }
  function Wm(l, t, e) {
    kt.S(l, t, e);
    var a = xa;
    if (a && l) {
      var u = $e(a).hoistableStyles, n = Aa(l);
      t = t || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(gu(n))) c.loading = 5;
        else {
          l = Y({ rel: "stylesheet", href: l, "data-precedence": t }, e), (e = pt.get(n)) && cf(l, e);
          var f = i = a.createElement("link");
          Hl(f), Xl(f, "link", l), f._p = new Promise(function(v, p) {
            f.onload = v, f.onerror = p;
          }), f.addEventListener("load", function() {
            c.loading |= 1;
          }), f.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Rn(i, t, a);
        }
        i = { type: "stylesheet", instance: i, count: 1, state: c }, u.set(n, i);
      }
    }
  }
  function Fm(l, t) {
    kt.X(l, t);
    var e = xa;
    if (e && l) {
      var a = $e(e).hoistableScripts, u = Oa(l), n = a.get(u);
      n || (n = e.querySelector(bu(u)), n || (l = Y({ src: l, async: true }, t), (t = pt.get(u)) && ff(l, t), n = e.createElement("script"), Hl(n), Xl(n, "link", l), e.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, a.set(u, n));
    }
  }
  function km(l, t) {
    kt.M(l, t);
    var e = xa;
    if (e && l) {
      var a = $e(e).hoistableScripts, u = Oa(l), n = a.get(u);
      n || (n = e.querySelector(bu(u)), n || (l = Y({ src: l, async: true, type: "module" }, t), (t = pt.get(u)) && ff(l, t), n = e.createElement("script"), Hl(n), Xl(n, "link", l), e.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, a.set(u, n));
    }
  }
  function ir(l, t, e, a) {
    var u = (u = w.current) ? Hn(u) : null;
    if (!u) throw Error(s(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = Aa(e.href), e = $e(u).hoistableStyles, a = e.get(t), a || (a = { type: "style", instance: null, count: 0, state: null }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = Aa(e.href);
          var n = $e(u).hoistableStyles, i = n.get(l);
          if (i || (u = u.ownerDocument || u, i = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, n.set(l, i), (n = u.querySelector(gu(l))) && !n._p && (i.instance = n, i.state.loading = 5), pt.has(l) || (e = { rel: "preload", as: "style", href: e.href, crossOrigin: e.crossOrigin, integrity: e.integrity, media: e.media, hrefLang: e.hrefLang, referrerPolicy: e.referrerPolicy }, pt.set(l, e), n || Im(u, l, e, i.state))), t && a === null) throw Error(s(528, ""));
          return i;
        }
        if (t && a !== null) throw Error(s(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Oa(e), e = $e(u).hoistableScripts, a = e.get(t), a || (a = { type: "script", instance: null, count: 0, state: null }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, l));
    }
  }
  function Aa(l) {
    return 'href="' + mt(l) + '"';
  }
  function gu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function cr(l) {
    return Y({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function Im(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Xl(t, "link", e), Hl(t), l.head.appendChild(t));
  }
  function Oa(l) {
    return '[src="' + mt(l) + '"]';
  }
  function bu(l) {
    return "script[async]" + l;
  }
  function fr(l, t, e) {
    if (t.count++, t.instance === null) switch (t.type) {
      case "style":
        var a = l.querySelector('style[data-href~="' + mt(e.href) + '"]');
        if (a) return t.instance = a, Hl(a), a;
        var u = Y({}, e, { "data-href": e.href, "data-precedence": e.precedence, href: null, precedence: null });
        return a = (l.ownerDocument || l).createElement("style"), Hl(a), Xl(a, "style", u), Rn(a, e.precedence, l), t.instance = a;
      case "stylesheet":
        u = Aa(e.href);
        var n = l.querySelector(gu(u));
        if (n) return t.state.loading |= 4, t.instance = n, Hl(n), n;
        a = cr(e), (u = pt.get(u)) && cf(a, u), n = (l.ownerDocument || l).createElement("link"), Hl(n);
        var i = n;
        return i._p = new Promise(function(c, f) {
          i.onload = c, i.onerror = f;
        }), Xl(n, "link", a), t.state.loading |= 4, Rn(n, e.precedence, l), t.instance = n;
      case "script":
        return n = Oa(e.src), (u = l.querySelector(bu(n))) ? (t.instance = u, Hl(u), u) : (a = e, (u = pt.get(n)) && (a = Y({}, e), ff(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Hl(u), Xl(u, "link", a), l.head.appendChild(u), t.instance = u);
      case "void":
        return null;
      default:
        throw Error(s(443, t.type));
    }
    else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Rn(a, e.precedence, l));
    return t.instance;
  }
  function Rn(l, t, e) {
    for (var a = e.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function cf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function ff(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Cn = null;
  function sr(l, t, e) {
    if (Cn === null) {
      var a = /* @__PURE__ */ new Map(), u = Cn = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else u = Cn, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[Ra] || n[ql] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(t) || "";
        i = l + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function dr(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(e, t === "title" ? l.querySelector("head > title") : null);
  }
  function Pm(l, t, e) {
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
        return t.rel === "stylesheet" ? (l = t.disabled, typeof t.precedence == "string" && l == null) : true;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return true;
    }
    return false;
  }
  function rr(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function lh(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== false) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Aa(a.href), n = t.querySelector(gu(u));
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = qn.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, Hl(n);
          return;
        }
        n = t.ownerDocument || t, a = cr(a), (u = pt.get(u)) && cf(a, u), n = n.createElement("link"), Hl(n);
        var i = n;
        i._p = new Promise(function(c, f) {
          i.onload = c, i.onerror = f;
        }), Xl(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = qn.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var sf = 0;
  function th(l, t) {
    return l.stylesheets && l.count === 0 && Yn(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && Yn(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && sf === 0 && (sf = 62500 * Cm());
      var u = setTimeout(function() {
        if (l.waitingForImages = false, l.count === 0 && (l.stylesheets && Yn(l, l.stylesheets), l.unsuspend)) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, (l.imgBytes > sf ? 50 : 800) + t);
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function qn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Yn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Bn = null;
  function Yn(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Bn = /* @__PURE__ */ new Map(), t.forEach(eh, l), Bn = null, qn.call(l));
  }
  function eh(l, t) {
    if (!(t.state.loading & 4)) {
      var e = Bn.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Bn.set(l, e);
        for (var u = l.querySelectorAll("link[data-precedence],style[data-precedence]"), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = t.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = qn.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var Su = { $$typeof: El, Provider: null, Consumer: null, _currentValue: X, _currentValue2: X, _threadCount: 0 };
  function ah(l, t, e, a, u, n, i, c, f) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ai(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ai(0), this.hiddenUpdates = ai(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function or(l, t, e, a, u, n, i, c, f, v, p, E) {
    return l = new ah(l, t, e, i, f, v, p, E, c), t = 1, n === true && (t |= 24), n = nt(3, null, null, t), l.current = n, n.stateNode = l, t = Qi(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = { element: a, isDehydrated: e, cache: t }, Ki(n), l;
  }
  function mr(l) {
    return l ? (l = ua, l) : ua;
  }
  function hr(l, t, e, a, u, n) {
    u = mr(u), a.context === null ? a.context = u : a.pendingContext = u, a = ie(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = ce(l, a, t), e !== null && (lt(e, l, t), ka(e, l, t));
  }
  function vr(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function df(l, t) {
    vr(l, t), (l = l.alternate) && vr(l, t);
  }
  function yr(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = De(l, 67108864);
      t !== null && lt(t, l, 67108864), df(l, 67108864);
    }
  }
  function gr(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = dt();
      t = ui(t);
      var e = De(l, t);
      e !== null && lt(e, l, t), df(l, t);
    }
  }
  var Gn = true;
  function uh(l, t, e, a) {
    var u = z.T;
    z.T = null;
    var n = D.p;
    try {
      D.p = 2, rf(l, t, e, a);
    } finally {
      D.p = n, z.T = u;
    }
  }
  function nh(l, t, e, a) {
    var u = z.T;
    z.T = null;
    var n = D.p;
    try {
      D.p = 8, rf(l, t, e, a);
    } finally {
      D.p = n, z.T = u;
    }
  }
  function rf(l, t, e, a) {
    if (Gn) {
      var u = of(a);
      if (u === null) Fc(l, t, a, Xn, e), Sr(l, a);
      else if (ch(u, l, t, e, a)) a.stopPropagation();
      else if (Sr(l, a), t & 4 && -1 < ih.indexOf(l)) {
        for (; u !== null; ) {
          var n = we(u);
          if (n !== null) switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var i = xe(n.pendingLanes);
                if (i !== 0) {
                  var c = n;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                    var f = 1 << 31 - at(i);
                    c.entanglements[1] |= f, i &= ~f;
                  }
                  jt(n), (nl & 6) === 0 && (zn = tt() + 500, mu(0));
                }
              }
              break;
            case 31:
            case 13:
              c = De(n, 2), c !== null && lt(c, n, 2), En(), df(n, 2);
          }
          if (n = of(a), n === null && Fc(l, t, a, Xn, e), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else Fc(l, t, a, null, e);
    }
  }
  function of(l) {
    return l = mi(l), mf(l);
  }
  var Xn = null;
  function mf(l) {
    if (Xn = null, l = Je(l), l !== null) {
      var t = H(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = B(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = F(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Xn = l, null;
  }
  function br(l) {
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
        switch (Vr()) {
          case Af:
            return 2;
          case Of:
            return 8;
          case Mu:
          case Kr:
            return 32;
          case Mf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hf = false, be = null, Se = null, _e = null, _u = /* @__PURE__ */ new Map(), pu = /* @__PURE__ */ new Map(), pe = [], ih = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function Sr(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        be = null;
        break;
      case "dragenter":
      case "dragleave":
        Se = null;
        break;
      case "mouseover":
      case "mouseout":
        _e = null;
        break;
      case "pointerover":
      case "pointerout":
        _u.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        pu.delete(t.pointerId);
    }
  }
  function zu(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n ? (l = { blockedOn: t, domEventName: e, eventSystemFlags: a, nativeEvent: n, targetContainers: [u] }, t !== null && (t = we(t), t !== null && yr(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function ch(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return be = zu(be, l, t, e, a, u), true;
      case "dragenter":
        return Se = zu(Se, l, t, e, a, u), true;
      case "mouseover":
        return _e = zu(_e, l, t, e, a, u), true;
      case "pointerover":
        var n = u.pointerId;
        return _u.set(n, zu(_u.get(n) || null, l, t, e, a, u)), true;
      case "gotpointercapture":
        return n = u.pointerId, pu.set(n, zu(pu.get(n) || null, l, t, e, a, u)), true;
    }
    return false;
  }
  function _r(l) {
    var t = Je(l.target);
    if (t !== null) {
      var e = H(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = B(e), t !== null) {
            l.blockedOn = t, Rf(l.priority, function() {
              gr(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = F(e), t !== null) {
            l.blockedOn = t, Rf(l.priority, function() {
              gr(e);
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
  function Qn(l) {
    if (l.blockedOn !== null) return false;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = of(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(e.type, e);
        oi = a, e.target.dispatchEvent(a), oi = null;
      } else return t = we(e), t !== null && yr(t), l.blockedOn = e, false;
      t.shift();
    }
    return true;
  }
  function pr(l, t, e) {
    Qn(l) && e.delete(t);
  }
  function fh() {
    hf = false, be !== null && Qn(be) && (be = null), Se !== null && Qn(Se) && (Se = null), _e !== null && Qn(_e) && (_e = null), _u.forEach(pr), pu.forEach(pr);
  }
  function Zn(l, t) {
    l.blockedOn === t && (l.blockedOn = null, hf || (hf = true, y.unstable_scheduleCallback(y.unstable_NormalPriority, fh)));
  }
  var Ln = null;
  function zr(l) {
    Ln !== l && (Ln = l, y.unstable_scheduleCallback(y.unstable_NormalPriority, function() {
      Ln === l && (Ln = null);
      for (var t = 0; t < l.length; t += 3) {
        var e = l[t], a = l[t + 1], u = l[t + 2];
        if (typeof a != "function") {
          if (mf(a || e) === null) continue;
          break;
        }
        var n = we(e);
        n !== null && (l.splice(t, 3), t -= 3, rc(n, { pending: true, data: u, method: e.method, action: a }, a, u));
      }
    }));
  }
  function Ma(l) {
    function t(f) {
      return Zn(f, l);
    }
    be !== null && Zn(be, l), Se !== null && Zn(Se, l), _e !== null && Zn(_e, l), _u.forEach(t), pu.forEach(t);
    for (var e = 0; e < pe.length; e++) {
      var a = pe[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < pe.length && (e = pe[0], e.blockedOn === null); ) _r(e), e.blockedOn === null && pe.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null) for (a = 0; a < e.length; a += 3) {
      var u = e[a], n = e[a + 1], i = u[$l] || null;
      if (typeof n == "function") i || zr(e);
      else if (i) {
        var c = null;
        if (n && n.hasAttribute("formAction")) {
          if (u = n, i = n[$l] || null) c = i.formAction;
          else if (mf(u) !== null) continue;
        } else c = i.action;
        typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), zr(e);
      }
    }
  }
  function Tr() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({ handler: function() {
        return new Promise(function(i) {
          return u = i;
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
  function vf(l) {
    this._internalRoot = l;
  }
  Vn.prototype.render = vf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var e = t.current, a = dt();
    hr(e, a, l, t, null, null);
  }, Vn.prototype.unmount = vf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      hr(l.current, 2, null, l, null, null), En(), t[Ke] = null;
    }
  };
  function Vn(l) {
    this._internalRoot = l;
  }
  Vn.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Hf();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < pe.length && t !== 0 && t < pe[e].priority; e++) ;
      pe.splice(e, 0, l), e === 0 && _r(l);
    }
  };
  var Er = h.version;
  if (Er !== "19.2.3") throw Error(s(527, Er, "19.2.3"));
  D.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0) throw typeof l.render == "function" ? Error(s(188)) : (l = Object.keys(l).join(","), Error(s(268, l)));
    return l = A(t), l = l !== null ? K(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var sh = { bundleType: 0, version: "19.2.3", rendererPackageName: "react-dom", currentDispatcherRef: z, reconcilerVersion: "19.2.3" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Kn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Kn.isDisabled && Kn.supportsFiber) try {
      Ua = Kn.inject(sh), et = Kn;
    } catch {
    }
  }
  return Eu.createRoot = function(l, t) {
    if (!O(l)) throw Error(s(299));
    var e = false, a = "", u = U0, n = j0, i = H0;
    return t != null && (t.unstable_strictMode === true && (e = true), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = or(l, 1, false, null, null, e, a, null, u, n, i, Tr), l[Ke] = t.current, Wc(l), new vf(t);
  }, Eu.hydrateRoot = function(l, t, e) {
    if (!O(l)) throw Error(s(299));
    var a = false, u = "", n = U0, i = j0, c = H0, f = null;
    return e != null && (e.unstable_strictMode === true && (a = true), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (f = e.formState)), t = or(l, 1, true, t, e ?? null, a, u, f, n, i, c, Tr), t.context = mr(null), e = t.current, a = dt(), a = ui(a), u = ie(a), u.callback = null, ce(e, u, a), e = a, t.current.lanes = e, Ha(t, e), jt(t), l[Ke] = t.current, Wc(l), new Vn(t);
  }, Eu.version = "19.2.3", Eu;
}
var Rr;
function Sh() {
  if (Rr) return bf.exports;
  Rr = 1;
  function y() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(y);
    } catch (h) {
      console.error(h);
    }
  }
  return y(), bf.exports = bh(), bf.exports;
}
var _h = Sh();
let Dl, Fn = 0, xu = null;
function $n() {
  return (xu === null || xu.byteLength === 0) && (xu = new Uint8Array(Dl.memory.buffer)), xu;
}
const Wn = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : { encode: () => {
  throw Error("TextEncoder not available");
} }, ph = typeof Wn.encodeInto == "function" ? function(y, h) {
  return Wn.encodeInto(y, h);
} : function(y, h) {
  const _ = Wn.encode(y);
  return h.set(_), { read: y.length, written: _.length };
};
function Yr(y, h, _) {
  if (_ === void 0) {
    const F = Wn.encode(y), N = h(F.length, 1) >>> 0;
    return $n().subarray(N, N + F.length).set(F), Fn = F.length, N;
  }
  let s = y.length, O = h(s, 1) >>> 0;
  const H = $n();
  let B = 0;
  for (; B < s; B++) {
    const F = y.charCodeAt(B);
    if (F > 127) break;
    H[O + B] = F;
  }
  if (B !== s) {
    B !== 0 && (y = y.slice(B)), O = _(O, s, s = B + y.length * 3, 1) >>> 0;
    const F = $n().subarray(O + B, O + s), N = ph(y, F);
    B += N.written, O = _(O, s, B, 1) >>> 0;
  }
  return Fn = B, O;
}
let Le = null;
function Cr() {
  return (Le === null || Le.buffer.detached === true || Le.buffer.detached === void 0 && Le.buffer !== Dl.memory.buffer) && (Le = new DataView(Dl.memory.buffer)), Le;
}
function Au(y) {
  const h = Dl.__externref_table_alloc();
  return Dl.__wbindgen_export_4.set(h, y), h;
}
function qr(y, h) {
  try {
    return y.apply(this, h);
  } catch (_) {
    const s = Au(_);
    Dl.__wbindgen_exn_store(s);
  }
}
const Gr = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Gr.decode();
function Jn(y, h) {
  return y = y >>> 0, Gr.decode($n().subarray(y, y + h));
}
function wn(y) {
  return y == null;
}
function Br(y) {
  const h = Dl.__wbindgen_export_4.get(y);
  return Dl.__externref_table_dealloc(y), h;
}
function zh(y) {
  const h = Yr(y, Dl.__wbindgen_malloc, Dl.__wbindgen_realloc), _ = Fn, s = Dl.parse_wikitext(h, _);
  if (s[2]) throw Br(s[1]);
  return Br(s[0]);
}
async function Th(y, h) {
  if (typeof Response == "function" && y instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function") try {
      return await WebAssembly.instantiateStreaming(y, h);
    } catch (s) {
      if (y.headers.get("Content-Type") != "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", s);
      else throw s;
    }
    const _ = await y.arrayBuffer();
    return await WebAssembly.instantiate(_, h);
  } else {
    const _ = await WebAssembly.instantiate(y, h);
    return _ instanceof WebAssembly.Instance ? { instance: _, module: y } : _;
  }
}
function Eh() {
  const y = {};
  return y.wbg = {}, y.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(h, _) {
    const s = String(_), O = Yr(s, Dl.__wbindgen_malloc, Dl.__wbindgen_realloc), H = Fn;
    Cr().setInt32(h + 4, H, true), Cr().setInt32(h + 0, O, true);
  }, y.wbg.__wbg_call_672a4d21634d4a24 = function() {
    return qr(function(h, _) {
      return h.call(_);
    }, arguments);
  }, y.wbg.__wbg_new_405e22f390576ce2 = function() {
    return new Object();
  }, y.wbg.__wbg_new_78feb108b6472713 = function() {
    return new Array();
  }, y.wbg.__wbg_newnoargs_105ed471475aaf50 = function(h, _) {
    return new Function(Jn(h, _));
  }, y.wbg.__wbg_now_2c95c9de01293173 = function(h) {
    return h.now();
  }, y.wbg.__wbg_performance_7a3ffd0b17f663ad = function(h) {
    return h.performance;
  }, y.wbg.__wbg_set_37837023f3d740e8 = function(h, _, s) {
    h[_ >>> 0] = s;
  }, y.wbg.__wbg_set_3f1d0b984ed272ed = function(h, _, s) {
    h[_] = s;
  }, y.wbg.__wbg_set_bb8cecf6a62b9f46 = function() {
    return qr(function(h, _, s) {
      return Reflect.set(h, _, s);
    }, arguments);
  }, y.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
    const h = typeof global > "u" ? null : global;
    return wn(h) ? 0 : Au(h);
  }, y.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
    const h = typeof globalThis > "u" ? null : globalThis;
    return wn(h) ? 0 : Au(h);
  }, y.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
    const h = typeof self > "u" ? null : self;
    return wn(h) ? 0 : Au(h);
  }, y.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
    const h = typeof window > "u" ? null : window;
    return wn(h) ? 0 : Au(h);
  }, y.wbg.__wbindgen_bigint_from_u64 = function(h) {
    return BigInt.asUintN(64, h);
  }, y.wbg.__wbindgen_error_new = function(h, _) {
    return new Error(Jn(h, _));
  }, y.wbg.__wbindgen_init_externref_table = function() {
    const h = Dl.__wbindgen_export_4, _ = h.grow(4);
    h.set(0, void 0), h.set(_ + 0, void 0), h.set(_ + 1, null), h.set(_ + 2, true), h.set(_ + 3, false);
  }, y.wbg.__wbindgen_is_undefined = function(h) {
    return h === void 0;
  }, y.wbg.__wbindgen_number_new = function(h) {
    return h;
  }, y.wbg.__wbindgen_string_new = function(h, _) {
    return Jn(h, _);
  }, y.wbg.__wbindgen_throw = function(h, _) {
    throw new Error(Jn(h, _));
  }, y;
}
function xh(y, h) {
  return Dl = y.exports, Xr.__wbindgen_wasm_module = h, Le = null, xu = null, Dl.__wbindgen_start(), Dl;
}
async function Xr(y) {
  if (Dl !== void 0) return Dl;
  typeof y < "u" && (Object.getPrototypeOf(y) === Object.prototype ? { module_or_path: y } = y : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof y > "u" && (y = new URL("" + new URL("wikitext_wasm_bg-Cywf-vPx.wasm", import.meta.url).href, import.meta.url));
  const h = Eh();
  (typeof y == "string" || typeof Request == "function" && y instanceof Request || typeof URL == "function" && y instanceof URL) && (y = fetch(y));
  const { instance: _, module: s } = await Th(await y, h);
  return xh(_, s);
}
const Ah = { fragment: "text-slate-400", template: "text-emerald-400", "template-parameter-use": "text-emerald-300", heading: "text-blue-400", link: "text-cyan-400", "ext-link": "text-cyan-300", bold: "text-blue-300", italic: "text-blue-200", blockquote: "text-teal-400", superscript: "text-green-300", subscript: "text-green-300", small: "text-green-200", preformatted: "text-teal-300", tag: "text-emerald-500", text: "text-green-400", table: "text-blue-500", "ordered-list": "text-cyan-500", "unordered-list": "text-cyan-500", "definition-list": "text-cyan-400", redirect: "text-amber-400", "horizontal-divider": "text-slate-500", "paragraph-break": "text-slate-500", newline: "text-slate-500" };
function Na({ node: y, depth: h, onNodeHover: _, onNodeClick: s }) {
  const [O, H] = Vl.useState(h < 2), B = y.value.type, F = Ah[B] || "text-gray-400", N = () => {
    const M = y.value;
    return "children" in M && Array.isArray(M.children) ? M.children.length > 0 : "items" in M && Array.isArray(M.items) ? M.items.length > 0 : "rows" in M && Array.isArray(M.rows) ? M.rows.length > 0 : "default" in M && M.default ? M.default.length > 0 : "parameters" in M && Array.isArray(M.parameters) ? M.parameters.length > 0 : false;
  }, A = () => {
    const M = y.value;
    switch (M.type) {
      case "text":
        return `text: "${M.text.length > 30 ? M.text.slice(0, 30) + "..." : M.text}"`;
      case "link":
        return `link: [[${M.title}${M.text !== M.title ? "|" + M.text : ""}]]`;
      case "ext-link":
        return `ext-link: [${M.link}${M.text ? " " + M.text : ""}]`;
      case "template":
        return `template: {{${M.name}}}`;
      case "template-parameter-use":
        return `param: {{{${M.name}}}}`;
      case "heading":
        return `heading (h${M.level})`;
      case "tag":
        return `tag: <${M.name}${M.attributes ? " " + M.attributes : ""}>`;
      case "redirect":
        return `redirect: [[${M.target}]]`;
      default:
        return M.type;
    }
  }, K = () => {
    const M = y.value, bl = [];
    return "children" in M && Array.isArray(M.children) && M.children.forEach((el, tl) => {
      bl.push(S.jsx(Na, { node: el, depth: h + 1, onNodeHover: _, onNodeClick: s }, `child-${tl}`));
    }), "default" in M && M.default && bl.push(S.jsxs("div", { className: "ml-4", children: [S.jsx("span", { className: "text-slate-500 text-xs", children: "default:" }), M.default.map((el, tl) => S.jsx(Na, { node: el, depth: h + 1, onNodeHover: _, onNodeClick: s }, `default-${tl}`))] }, "default")), "parameters" in M && Array.isArray(M.parameters) && M.parameters.length > 0 && bl.push(S.jsxs("div", { className: "ml-4", children: [S.jsx("span", { className: "text-slate-500 text-xs", children: "parameters:" }), M.parameters.map((el, tl) => S.jsxs("div", { className: "ml-4 text-emerald-200 text-sm", children: [el.name, "=", el.value.length > 20 ? el.value.slice(0, 20) + "..." : el.value] }, `param-${tl}`))] }, "params")), "items" in M && Array.isArray(M.items) && M.items.forEach((el, tl) => {
      bl.push(S.jsxs("div", { className: "ml-4", children: [S.jsxs("span", { className: "text-slate-500 text-xs", children: ["type_" in el ? el.type_ === "Term" ? ";" : ":" : "item", ":"] }), el.content.map((Ul, J) => S.jsx(Na, { node: Ul, depth: h + 1, onNodeHover: _, onNodeClick: s }, `item-${tl}-${J}`))] }, `item-${tl}`));
    }), "rows" in M && Array.isArray(M.rows) && ("captions" in M && M.captions.length > 0 && bl.push(S.jsxs("div", { className: "ml-4", children: [S.jsx("span", { className: "text-slate-500 text-xs", children: "captions:" }), M.captions.map((el, tl) => S.jsx("div", { className: "ml-4", children: el.content.map((Ul, J) => S.jsx(Na, { node: Ul, depth: h + 1, onNodeHover: _, onNodeClick: s }, `caption-${tl}-${J}`)) }, `caption-${tl}`))] }, "captions")), bl.push(S.jsxs("div", { className: "ml-4", children: [S.jsx("span", { className: "text-slate-500 text-xs", children: "rows:" }), M.rows.map((el, tl) => S.jsxs("div", { className: "ml-4", children: [S.jsxs("span", { className: "text-slate-400 text-xs", children: ["row ", tl + 1, ":"] }), el.cells.map((Ul, J) => S.jsxs("div", { className: "ml-4", children: [S.jsxs("span", { className: "text-slate-500 text-xs", children: [Ul.is_header ? "th" : "td", ":"] }), Ul.content.map((jl, El) => S.jsx(Na, { node: jl, depth: h + 1, onNodeHover: _, onNodeClick: s }, `cell-${tl}-${J}-${El}`))] }, `cell-${tl}-${J}`))] }, `row-${tl}`))] }, "rows"))), bl;
  }, Y = N();
  return S.jsxs("div", { className: "font-mono text-sm", children: [S.jsxs("div", { className: `flex items-center gap-1 py-0.5 px-1 rounded cursor-pointer hover:bg-slate-700/50 transition-colors ${F}`, onMouseEnter: () => _(y.span), onMouseLeave: () => _(null), onClick: () => {
    Y && H(!O), s(y.span);
  }, children: [Y ? S.jsx("span", { className: "w-4 text-center text-slate-500", children: O ? "\u25BC" : "\u25B6" }) : S.jsx("span", { className: "w-4" }), S.jsx("span", { children: A() }), S.jsxs("span", { className: "text-slate-600 text-xs ml-2", children: ["[", y.span.start, ":", y.span.end, "]"] })] }), O && Y && S.jsx("div", { className: "ml-4 border-l border-slate-700 pl-2", children: K() })] });
}
function Oh({ nodes: y, onNodeHover: h, onNodeClick: _ }) {
  const s = Vl.useCallback(() => {
  }, []);
  return S.jsxs("div", { className: "h-full overflow-auto bg-slate-900 p-4 rounded-lg", children: [S.jsxs("div", { className: "flex items-center justify-between mb-4", children: [S.jsx("h2", { className: "text-lg font-semibold text-blue-400", children: "AST Tree" }), S.jsx("button", { onClick: s, className: "text-xs text-slate-400 hover:text-slate-200 px-2 py-1 bg-slate-800 rounded", children: "Click nodes to expand" })] }), y.length === 0 ? S.jsx("div", { className: "text-slate-500 italic", children: "No nodes to display" }) : S.jsx("div", { className: "space-y-1", children: y.map((O, H) => S.jsx(Na, { node: O, depth: 0, onNodeHover: h, onNodeClick: _ }, H)) })] });
}
function Cl(y, h) {
  const _ = y.value;
  switch (_.type) {
    case "text":
      return S.jsx("span", { children: _.text }, h);
    case "bold":
      return S.jsx("strong", { children: _.children.map((s, O) => Cl(s, `${h}-${O}`)) }, h);
    case "italic":
      return S.jsx("em", { children: _.children.map((s, O) => Cl(s, `${h}-${O}`)) }, h);
    case "heading": {
      const O = `${{ 1: "text-3xl", 2: "text-2xl", 3: "text-xl", 4: "text-lg", 5: "text-base", 6: "text-sm" }[_.level] || "text-base"} font-bold my-2 text-blue-300`, H = _.children.map((B, F) => Cl(B, `${h}-${F}`));
      switch (_.level) {
        case 1:
          return S.jsx("h1", { className: O, children: H }, h);
        case 2:
          return S.jsx("h2", { className: O, children: H }, h);
        case 3:
          return S.jsx("h3", { className: O, children: H }, h);
        case 4:
          return S.jsx("h4", { className: O, children: H }, h);
        case 5:
          return S.jsx("h5", { className: O, children: H }, h);
        case 6:
          return S.jsx("h6", { className: O, children: H }, h);
        default:
          return S.jsx("h2", { className: O, children: H }, h);
      }
    }
    case "link":
      return S.jsx("a", { href: `https://en.wikipedia.org/wiki/${encodeURIComponent(_.title)}`, className: "text-cyan-400 hover:text-cyan-300 underline", target: "_blank", rel: "noopener noreferrer", children: _.text }, h);
    case "ext-link":
      return S.jsx("a", { href: _.link, className: "text-cyan-400 hover:text-cyan-300 underline", target: "_blank", rel: "noopener noreferrer", children: _.text || _.link }, h);
    case "template":
      return S.jsxs("span", { className: "bg-emerald-900/50 text-emerald-300 px-1 rounded border border-emerald-700", children: ["{{", _.name, _.parameters.length > 0 && S.jsxs(S.Fragment, { children: ["|", _.parameters.map((s, O) => S.jsxs("span", { children: [O > 0 && "|", s.name, "=", s.value] }, O))] }), "}}"] }, h);
    case "template-parameter-use":
      return S.jsxs("span", { className: "bg-emerald-800/50 text-emerald-200 px-1 rounded border border-emerald-600", children: ["{{{", _.name, _.default && S.jsxs(S.Fragment, { children: ["|", _.default.map((s, O) => Cl(s, `${h}-default-${O}`))] }), "}}}"] }, h);
    case "blockquote":
      return S.jsx("blockquote", { className: "border-l-4 border-teal-500 pl-4 my-2 italic text-slate-300", children: _.children.map((s, O) => Cl(s, `${h}-${O}`)) }, h);
    case "superscript":
      return S.jsx("sup", { children: _.children.map((s, O) => Cl(s, `${h}-${O}`)) }, h);
    case "subscript":
      return S.jsx("sub", { children: _.children.map((s, O) => Cl(s, `${h}-${O}`)) }, h);
    case "small":
      return S.jsx("small", { children: _.children.map((s, O) => Cl(s, `${h}-${O}`)) }, h);
    case "preformatted":
      return S.jsx("pre", { className: "bg-slate-800 p-2 rounded font-mono text-sm overflow-x-auto", children: _.children.map((s, O) => Cl(s, `${h}-${O}`)) }, h);
    case "tag":
      return S.jsx("span", { className: "text-slate-300", children: _.children.map((s, O) => Cl(s, `${h}-${O}`)) }, h);
    case "fragment":
      return S.jsx("span", { children: _.children.map((s, O) => Cl(s, `${h}-${O}`)) }, h);
    case "ordered-list":
      return S.jsx("ol", { className: "list-decimal list-inside my-2 ml-4", children: _.items.map((s, O) => S.jsx("li", { children: s.content.map((H, B) => Cl(H, `${h}-${O}-${B}`)) }, O)) }, h);
    case "unordered-list":
      return S.jsx("ul", { className: "list-disc list-inside my-2 ml-4", children: _.items.map((s, O) => S.jsx("li", { children: s.content.map((H, B) => Cl(H, `${h}-${O}-${B}`)) }, O)) }, h);
    case "definition-list":
      return S.jsx("dl", { className: "my-2", children: _.items.map((s, O) => s.type_ === "Term" ? S.jsx("dt", { className: "font-bold text-blue-300", children: s.content.map((H, B) => Cl(H, `${h}-${O}-${B}`)) }, O) : S.jsx("dd", { className: "ml-4 text-slate-300", children: s.content.map((H, B) => Cl(H, `${h}-${O}-${B}`)) }, O)) }, h);
    case "table":
      return S.jsxs("table", { className: "border-collapse border border-slate-600 my-2", children: [_.captions.length > 0 && S.jsx("caption", { className: "text-slate-300 mb-2", children: _.captions.map((s, O) => S.jsx("span", { children: s.content.map((H, B) => Cl(H, `${h}-caption-${O}-${B}`)) }, O)) }), S.jsx("tbody", { children: _.rows.map((s, O) => S.jsx("tr", { children: s.cells.map((H, B) => {
        const F = H.is_header ? "th" : "td";
        return S.jsx(F, { className: "border border-slate-600 px-2 py-1", children: H.content.map((N, A) => Cl(N, `${h}-row-${O}-cell-${B}-${A}`)) }, B);
      }) }, O)) })] }, h);
    case "redirect":
      return S.jsxs("div", { className: "text-amber-400 italic", children: ["#REDIRECT [[", _.target, "]]"] }, h);
    case "horizontal-divider":
      return S.jsx("hr", { className: "border-slate-600 my-4" }, h);
    case "paragraph-break":
      return S.jsx("br", {}, h);
    case "newline":
      return S.jsx("br", {}, h);
    default:
      return S.jsx("span", { className: "text-red-400", children: "[Unknown node type]" }, h);
  }
}
function Mh({ nodes: y }) {
  return S.jsxs("div", { className: "h-full overflow-auto bg-slate-900 p-4 rounded-lg", children: [S.jsx("h2", { className: "text-lg font-semibold text-green-400 mb-4", children: "HTML Preview" }), S.jsx("div", { className: "prose prose-invert max-w-none text-slate-200", children: y.length === 0 ? S.jsx("div", { className: "text-slate-500 italic", children: "No content to preview" }) : y.map((h, _) => Cl(h, _)) })] });
}
const zf = [{ name: "Basic Formatting", wikitext: `This is '''bold''', this is ''italic'', and this is '''''bold italic'''''.

Here's some <sup>superscript</sup> and <sub>subscript</sub> text.` }, { name: "Links", wikitext: `Check out the [[Main Page]] or [[Wikipedia|the free encyclopedia]].

External links work too: [https://example.com Example Site]` }, { name: "Headings", wikitext: `== Section ==
Some content here.

=== Subsection ===
More content.

==== Sub-subsection ====
Even more content.` }, { name: "Templates", wikitext: `{{Infobox|name=Example|type=Demo}}

Using a template parameter: {{{description|No description provided}}}` }, { name: "Lists", wikitext: `Unordered list:
* Item 1
* Item 2
** Nested item
* Item 3

Ordered list:
# First
# Second
# Third

Definition list:
;Term 1
:Definition 1
;Term 2
:Definition 2` }, { name: "Table", wikitext: `{| class="wikitable"
|+ Caption
|-
! Header 1 !! Header 2
|-
| Cell 1 || Cell 2
|-
| Cell 3 || Cell 4
|}` }, { name: "Complex Example", wikitext: `== Overview ==

'''Michigan rap''' is a subgenre of [[Midwestern hip-hop]] in the United States.

=== Notable Artists ===
* [[J Dilla]]
* [[Eminem]]
* [[Big Sean]]

{| class="wikitable"
|+ Key Albums
|-
! Artist !! Album !! Year
|-
| J Dilla || Donuts || 2006
|-
| Eminem || The Marshall Mathers LP || 2000
|}

In 2023, ''[[Rolling Stone]]'' described Michigan rap as "the regional style of intense punchlines."` }, { name: "Code Block", wikitext: `<syntaxhighlight lang="lua">
function hello()
    print("Hello, world!")
end
</syntaxhighlight>` }];
function Nh() {
  const [y, h] = Vl.useState(false), [_, s] = Vl.useState(zf[0].wikitext), [O, H] = Vl.useState([]), [B, F] = Vl.useState(null), [N, A] = Vl.useState("both"), [K, Y] = Vl.useState(null), M = Vl.useRef(null);
  Vl.useEffect(() => {
    Xr().then(() => {
      h(true);
    }).catch((J) => {
      F(`Failed to initialize WASM: ${J}`);
    });
  }, []), Vl.useEffect(() => {
    if (!y) return;
    const J = setTimeout(() => {
      try {
        const jl = zh(_);
        Array.isArray(jl) ? (H(jl), F(null)) : (F("Unexpected result format"), H([]));
      } catch (jl) {
        F(String(jl)), H([]);
      }
    }, 300);
    return () => clearTimeout(J);
  }, [_, y]);
  const bl = Vl.useCallback((J) => {
    Y(J);
  }, []), el = Vl.useCallback((J) => {
    M.current && (M.current.focus(), M.current.setSelectionRange(J.start, J.end));
  }, []), tl = Vl.useCallback((J) => {
    const jl = zf.find((El) => El.name === J.target.value);
    jl && s(jl.wikitext);
  }, []), Ul = () => S.jsxs("div", { className: "relative h-full", children: [S.jsx("textarea", { ref: M, value: _, onChange: (J) => s(J.target.value), className: "w-full h-full bg-slate-900 text-green-300 font-mono text-sm p-4 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none resize-none", placeholder: "Enter wikitext here...", spellCheck: false }), K && S.jsx("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden p-4 font-mono text-sm", children: S.jsxs("div", { className: "whitespace-pre-wrap break-words text-transparent", children: [_.slice(0, K.start), S.jsx("span", { className: "bg-blue-500/30 text-transparent rounded", children: _.slice(K.start, K.end) }), _.slice(K.end)] }) })] });
  return S.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white", children: [S.jsx("header", { className: "border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm", children: S.jsx("div", { className: "container mx-auto px-4 py-4", children: S.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [S.jsxs("div", { children: [S.jsx("h1", { className: "text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent", children: "Wikitext Simplified" }), S.jsx("p", { className: "text-slate-400 text-sm", children: "Parse and visualize MediaWiki wikitext" })] }), S.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [S.jsxs("select", { onChange: tl, className: "bg-slate-800 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none text-sm", children: [S.jsx("option", { value: "", children: "Load example..." }), zf.map((J) => S.jsx("option", { value: J.name, children: J.name }, J.name))] }), S.jsxs("div", { className: "flex bg-slate-800 rounded-lg p-1", children: [S.jsx("button", { onClick: () => A("tree"), className: `px-3 py-1.5 rounded-md text-sm transition-colors ${N === "tree" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`, children: "Tree" }), S.jsx("button", { onClick: () => A("preview"), className: `px-3 py-1.5 rounded-md text-sm transition-colors ${N === "preview" ? "bg-green-600 text-white" : "text-slate-400 hover:text-white"}`, children: "Preview" }), S.jsx("button", { onClick: () => A("both"), className: `px-3 py-1.5 rounded-md text-sm transition-colors ${N === "both" ? "bg-gradient-to-r from-blue-600 to-green-600 text-white" : "text-slate-400 hover:text-white"}`, children: "Both" })] })] })] }) }) }), S.jsx("main", { className: "container mx-auto px-4 py-6", children: y ? S.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]", children: [S.jsxs("div", { className: "flex flex-col min-h-0", children: [S.jsxs("div", { className: "flex items-center justify-between mb-2", children: [S.jsx("h2", { className: "text-lg font-semibold text-slate-300", children: "Wikitext Input" }), S.jsxs("span", { className: "text-xs text-slate-500", children: [_.length, " characters"] })] }), S.jsx("div", { className: "flex-1 min-h-0", children: Ul() })] }), S.jsx("div", { className: `flex flex-col min-h-0 ${N === "both" ? "gap-4" : ""}`, children: B ? S.jsxs("div", { className: "bg-red-900/50 border border-red-700 rounded-lg p-4", children: [S.jsx("h3", { className: "text-red-400 font-semibold mb-2", children: "Parse Error" }), S.jsx("pre", { className: "text-red-300 text-sm whitespace-pre-wrap", children: B })] }) : S.jsxs(S.Fragment, { children: [(N === "tree" || N === "both") && S.jsx("div", { className: N === "both" ? "flex-1 min-h-0 overflow-hidden" : "h-full", children: S.jsx(Oh, { nodes: O, onNodeHover: bl, onNodeClick: el }) }), (N === "preview" || N === "both") && S.jsx("div", { className: N === "both" ? "flex-1 min-h-0 overflow-hidden" : "h-full", children: S.jsx(Mh, { nodes: O }) })] }) })] }) : S.jsx("div", { className: "flex items-center justify-center h-64", children: S.jsxs("div", { className: "text-center", children: [S.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" }), S.jsx("p", { className: "text-slate-400", children: "Loading WASM module..." })] }) }) }), S.jsx("footer", { className: "border-t border-slate-800 mt-auto", children: S.jsx("div", { className: "container mx-auto px-4 py-4", children: S.jsxs("p", { className: "text-center text-slate-500 text-sm", children: ["Powered by", " ", S.jsx("a", { href: "https://github.com/philpax/wikitext_simplified", className: "text-blue-400 hover:text-blue-300", target: "_blank", rel: "noopener noreferrer", children: "wikitext_simplified" }), " ", "compiled to WebAssembly"] }) }) })] });
}
_h.createRoot(document.getElementById("root")).render(S.jsx(Vl.StrictMode, { children: S.jsx(Nh, {}) }));
