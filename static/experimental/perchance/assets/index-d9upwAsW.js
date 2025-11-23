(function() {
  const y = document.createElement("link").relList;
  if (y && y.supports && y.supports("modulepreload")) return;
  for (const M of document.querySelectorAll('link[rel="modulepreload"]')) o(M);
  new MutationObserver((M) => {
    for (const j of M) if (j.type === "childList") for (const R of j.addedNodes) R.tagName === "LINK" && R.rel === "modulepreload" && o(R);
  }).observe(document, { childList: true, subtree: true });
  function b(M) {
    const j = {};
    return M.integrity && (j.integrity = M.integrity), M.referrerPolicy && (j.referrerPolicy = M.referrerPolicy), M.crossOrigin === "use-credentials" ? j.credentials = "include" : M.crossOrigin === "anonymous" ? j.credentials = "omit" : j.credentials = "same-origin", j;
  }
  function o(M) {
    if (M.ep) return;
    M.ep = true;
    const j = b(M);
    fetch(M.href, j);
  }
})();
var bf = { exports: {} }, Au = {};
var Mr;
function my() {
  if (Mr) return Au;
  Mr = 1;
  var s = Symbol.for("react.transitional.element"), y = Symbol.for("react.fragment");
  function b(o, M, j) {
    var R = null;
    if (j !== void 0 && (R = "" + j), M.key !== void 0 && (R = "" + M.key), "key" in M) {
      j = {};
      for (var Q in M) Q !== "key" && (j[Q] = M[Q]);
    } else j = M;
    return M = j.ref, { $$typeof: s, type: o, key: R, ref: M !== void 0 ? M : null, props: j };
  }
  return Au.Fragment = y, Au.jsx = b, Au.jsxs = b, Au;
}
var Nr;
function yy() {
  return Nr || (Nr = 1, bf.exports = my()), bf.exports;
}
var T = yy(), Sf = { exports: {} }, L = {};
var Dr;
function hy() {
  if (Dr) return L;
  Dr = 1;
  var s = Symbol.for("react.transitional.element"), y = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), j = Symbol.for("react.consumer"), R = Symbol.for("react.context"), Q = Symbol.for("react.forward_ref"), N = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), q = Symbol.for("react.activity"), el = Symbol.iterator;
  function jl(d) {
    return d === null || typeof d != "object" ? null : (d = el && d[el] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var Dl = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, rl = Object.assign, Rl = {};
  function wl(d, A, O) {
    this.props = d, this.context = A, this.refs = Rl, this.updater = O || Dl;
  }
  wl.prototype.isReactComponent = {}, wl.prototype.setState = function(d, A) {
    if (typeof d != "object" && typeof d != "function" && d != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, d, A, "setState");
  }, wl.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function Mt() {
  }
  Mt.prototype = wl.prototype;
  function zl(d, A, O) {
    this.props = d, this.context = A, this.refs = Rl, this.updater = O || Dl;
  }
  var Kl = zl.prototype = new Mt();
  Kl.constructor = zl, rl(Kl, wl.prototype), Kl.isPureReactComponent = true;
  var dt = Array.isArray;
  function Ql() {
  }
  var J = { H: null, A: null, T: null, S: null }, Zl = Object.prototype.hasOwnProperty;
  function lt(d, A, O) {
    var D = O.ref;
    return { $$typeof: s, type: d, key: A, ref: D !== void 0 ? D : null, props: O };
  }
  function Ct(d, A) {
    return lt(d.type, A, d.props);
  }
  function mt(d) {
    return typeof d == "object" && d !== null && d.$$typeof === s;
  }
  function vl(d) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(O) {
      return A[O];
    });
  }
  var Ht = /\/+/g;
  function yt(d, A) {
    return typeof d == "object" && d !== null && d.key != null ? vl("" + d.key) : A.toString(36);
  }
  function tt(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(Ql, Ql) : (d.status = "pending", d.then(function(A) {
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
  function z(d, A, O, D, G) {
    var Z = typeof d;
    (Z === "undefined" || Z === "boolean") && (d = null);
    var W = false;
    if (d === null) W = true;
    else switch (Z) {
      case "bigint":
      case "string":
      case "number":
        W = true;
        break;
      case "object":
        switch (d.$$typeof) {
          case s:
          case y:
            W = true;
            break;
          case w:
            return W = d._init, z(W(d._payload), A, O, D, G);
        }
    }
    if (W) return G = G(d), W = D === "" ? "." + yt(d, 0) : D, dt(G) ? (O = "", W != null && (O = W.replace(Ht, "$&/") + "/"), z(G, A, O, "", function(Ve) {
      return Ve;
    })) : G != null && (mt(G) && (G = Ct(G, O + (G.key == null || d && d.key === G.key ? "" : ("" + G.key).replace(Ht, "$&/") + "/") + W)), A.push(G)), 1;
    W = 0;
    var Tl = D === "" ? "." : D + ":";
    if (dt(d)) for (var gl = 0; gl < d.length; gl++) D = d[gl], Z = Tl + yt(D, gl), W += z(D, A, O, Z, G);
    else if (gl = jl(d), typeof gl == "function") for (d = gl.call(d), gl = 0; !(D = d.next()).done; ) D = D.value, Z = Tl + yt(D, gl++), W += z(D, A, O, Z, G);
    else if (Z === "object") {
      if (typeof d.then == "function") return z(tt(d), A, O, D, G);
      throw A = String(d), Error("Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead.");
    }
    return W;
  }
  function U(d, A, O) {
    if (d == null) return d;
    var D = [], G = 0;
    return z(d, D, "", "", function(Z) {
      return A.call(O, Z, G++);
    }), D;
  }
  function Y(d) {
    if (d._status === -1) {
      var A = d._result;
      A = A(), A.then(function(O) {
        (d._status === 0 || d._status === -1) && (d._status = 1, d._result = O);
      }, function(O) {
        (d._status === 0 || d._status === -1) && (d._status = 2, d._result = O);
      }), d._status === -1 && (d._status = 0, d._result = A);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var ul = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var A = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d), error: d });
      if (!window.dispatchEvent(A)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, nl = { map: U, forEach: function(d, A, O) {
    U(d, function() {
      A.apply(this, arguments);
    }, O);
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
    if (!mt(d)) throw Error("React.Children.only expected to receive a single React element child.");
    return d;
  } };
  return L.Activity = q, L.Children = nl, L.Component = wl, L.Fragment = b, L.Profiler = M, L.PureComponent = zl, L.StrictMode = o, L.Suspense = N, L.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J, L.__COMPILER_RUNTIME = { __proto__: null, c: function(d) {
    return J.H.useMemoCache(d);
  } }, L.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, L.cacheSignal = function() {
    return null;
  }, L.cloneElement = function(d, A, O) {
    if (d == null) throw Error("The argument must be a React element, but you passed " + d + ".");
    var D = rl({}, d.props), G = d.key;
    if (A != null) for (Z in A.key !== void 0 && (G = "" + A.key), A) !Zl.call(A, Z) || Z === "key" || Z === "__self" || Z === "__source" || Z === "ref" && A.ref === void 0 || (D[Z] = A[Z]);
    var Z = arguments.length - 2;
    if (Z === 1) D.children = O;
    else if (1 < Z) {
      for (var W = Array(Z), Tl = 0; Tl < Z; Tl++) W[Tl] = arguments[Tl + 2];
      D.children = W;
    }
    return lt(d.type, G, D);
  }, L.createContext = function(d) {
    return d = { $$typeof: R, _currentValue: d, _currentValue2: d, _threadCount: 0, Provider: null, Consumer: null }, d.Provider = d, d.Consumer = { $$typeof: j, _context: d }, d;
  }, L.createElement = function(d, A, O) {
    var D, G = {}, Z = null;
    if (A != null) for (D in A.key !== void 0 && (Z = "" + A.key), A) Zl.call(A, D) && D !== "key" && D !== "__self" && D !== "__source" && (G[D] = A[D]);
    var W = arguments.length - 2;
    if (W === 1) G.children = O;
    else if (1 < W) {
      for (var Tl = Array(W), gl = 0; gl < W; gl++) Tl[gl] = arguments[gl + 2];
      G.children = Tl;
    }
    if (d && d.defaultProps) for (D in W = d.defaultProps, W) G[D] === void 0 && (G[D] = W[D]);
    return lt(d, Z, G);
  }, L.createRef = function() {
    return { current: null };
  }, L.forwardRef = function(d) {
    return { $$typeof: Q, render: d };
  }, L.isValidElement = mt, L.lazy = function(d) {
    return { $$typeof: w, _payload: { _status: -1, _result: d }, _init: Y };
  }, L.memo = function(d, A) {
    return { $$typeof: S, type: d, compare: A === void 0 ? null : A };
  }, L.startTransition = function(d) {
    var A = J.T, O = {};
    J.T = O;
    try {
      var D = d(), G = J.S;
      G !== null && G(O, D), typeof D == "object" && D !== null && typeof D.then == "function" && D.then(Ql, ul);
    } catch (Z) {
      ul(Z);
    } finally {
      A !== null && O.types !== null && (A.types = O.types), J.T = A;
    }
  }, L.unstable_useCacheRefresh = function() {
    return J.H.useCacheRefresh();
  }, L.use = function(d) {
    return J.H.use(d);
  }, L.useActionState = function(d, A, O) {
    return J.H.useActionState(d, A, O);
  }, L.useCallback = function(d, A) {
    return J.H.useCallback(d, A);
  }, L.useContext = function(d) {
    return J.H.useContext(d);
  }, L.useDebugValue = function() {
  }, L.useDeferredValue = function(d, A) {
    return J.H.useDeferredValue(d, A);
  }, L.useEffect = function(d, A) {
    return J.H.useEffect(d, A);
  }, L.useEffectEvent = function(d) {
    return J.H.useEffectEvent(d);
  }, L.useId = function() {
    return J.H.useId();
  }, L.useImperativeHandle = function(d, A, O) {
    return J.H.useImperativeHandle(d, A, O);
  }, L.useInsertionEffect = function(d, A) {
    return J.H.useInsertionEffect(d, A);
  }, L.useLayoutEffect = function(d, A) {
    return J.H.useLayoutEffect(d, A);
  }, L.useMemo = function(d, A) {
    return J.H.useMemo(d, A);
  }, L.useOptimistic = function(d, A) {
    return J.H.useOptimistic(d, A);
  }, L.useReducer = function(d, A, O) {
    return J.H.useReducer(d, A, O);
  }, L.useRef = function(d) {
    return J.H.useRef(d);
  }, L.useState = function(d) {
    return J.H.useState(d);
  }, L.useSyncExternalStore = function(d, A, O) {
    return J.H.useSyncExternalStore(d, A, O);
  }, L.useTransition = function() {
    return J.H.useTransition();
  }, L.version = "19.2.0", L;
}
var Ur;
function xf() {
  return Ur || (Ur = 1, Sf.exports = hy()), Sf.exports;
}
var ml = xf(), _f = { exports: {} }, Ou = {}, pf = { exports: {} }, zf = {};
var jr;
function vy() {
  return jr || (jr = 1, (function(s) {
    function y(z, U) {
      var Y = z.length;
      z.push(U);
      l: for (; 0 < Y; ) {
        var ul = Y - 1 >>> 1, nl = z[ul];
        if (0 < M(nl, U)) z[ul] = U, z[Y] = nl, Y = ul;
        else break l;
      }
    }
    function b(z) {
      return z.length === 0 ? null : z[0];
    }
    function o(z) {
      if (z.length === 0) return null;
      var U = z[0], Y = z.pop();
      if (Y !== U) {
        z[0] = Y;
        l: for (var ul = 0, nl = z.length, d = nl >>> 1; ul < d; ) {
          var A = 2 * (ul + 1) - 1, O = z[A], D = A + 1, G = z[D];
          if (0 > M(O, Y)) D < nl && 0 > M(G, O) ? (z[ul] = G, z[D] = Y, ul = D) : (z[ul] = O, z[A] = Y, ul = A);
          else if (D < nl && 0 > M(G, Y)) z[ul] = G, z[D] = Y, ul = D;
          else break l;
        }
      }
      return U;
    }
    function M(z, U) {
      var Y = z.sortIndex - U.sortIndex;
      return Y !== 0 ? Y : z.id - U.id;
    }
    if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var j = performance;
      s.unstable_now = function() {
        return j.now();
      };
    } else {
      var R = Date, Q = R.now();
      s.unstable_now = function() {
        return R.now() - Q;
      };
    }
    var N = [], S = [], w = 1, q = null, el = 3, jl = false, Dl = false, rl = false, Rl = false, wl = typeof setTimeout == "function" ? setTimeout : null, Mt = typeof clearTimeout == "function" ? clearTimeout : null, zl = typeof setImmediate < "u" ? setImmediate : null;
    function Kl(z) {
      for (var U = b(S); U !== null; ) {
        if (U.callback === null) o(S);
        else if (U.startTime <= z) o(S), U.sortIndex = U.expirationTime, y(N, U);
        else break;
        U = b(S);
      }
    }
    function dt(z) {
      if (rl = false, Kl(z), !Dl) if (b(N) !== null) Dl = true, Ql || (Ql = true, vl());
      else {
        var U = b(S);
        U !== null && tt(dt, U.startTime - z);
      }
    }
    var Ql = false, J = -1, Zl = 5, lt = -1;
    function Ct() {
      return Rl ? true : !(s.unstable_now() - lt < Zl);
    }
    function mt() {
      if (Rl = false, Ql) {
        var z = s.unstable_now();
        lt = z;
        var U = true;
        try {
          l: {
            Dl = false, rl && (rl = false, Mt(J), J = -1), jl = true;
            var Y = el;
            try {
              t: {
                for (Kl(z), q = b(N); q !== null && !(q.expirationTime > z && Ct()); ) {
                  var ul = q.callback;
                  if (typeof ul == "function") {
                    q.callback = null, el = q.priorityLevel;
                    var nl = ul(q.expirationTime <= z);
                    if (z = s.unstable_now(), typeof nl == "function") {
                      q.callback = nl, Kl(z), U = true;
                      break t;
                    }
                    q === b(N) && o(N), Kl(z);
                  } else o(N);
                  q = b(N);
                }
                if (q !== null) U = true;
                else {
                  var d = b(S);
                  d !== null && tt(dt, d.startTime - z), U = false;
                }
              }
              break l;
            } finally {
              q = null, el = Y, jl = false;
            }
            U = void 0;
          }
        } finally {
          U ? vl() : Ql = false;
        }
      }
    }
    var vl;
    if (typeof zl == "function") vl = function() {
      zl(mt);
    };
    else if (typeof MessageChannel < "u") {
      var Ht = new MessageChannel(), yt = Ht.port2;
      Ht.port1.onmessage = mt, vl = function() {
        yt.postMessage(null);
      };
    } else vl = function() {
      wl(mt, 0);
    };
    function tt(z, U) {
      J = wl(function() {
        z(s.unstable_now());
      }, U);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, s.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Zl = 0 < z ? Math.floor(1e3 / z) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return el;
    }, s.unstable_next = function(z) {
      switch (el) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = el;
      }
      var Y = el;
      el = U;
      try {
        return z();
      } finally {
        el = Y;
      }
    }, s.unstable_requestPaint = function() {
      Rl = true;
    }, s.unstable_runWithPriority = function(z, U) {
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
      var Y = el;
      el = z;
      try {
        return U();
      } finally {
        el = Y;
      }
    }, s.unstable_scheduleCallback = function(z, U, Y) {
      var ul = s.unstable_now();
      switch (typeof Y == "object" && Y !== null ? (Y = Y.delay, Y = typeof Y == "number" && 0 < Y ? ul + Y : ul) : Y = ul, z) {
        case 1:
          var nl = -1;
          break;
        case 2:
          nl = 250;
          break;
        case 5:
          nl = 1073741823;
          break;
        case 4:
          nl = 1e4;
          break;
        default:
          nl = 5e3;
      }
      return nl = Y + nl, z = { id: w++, callback: U, priorityLevel: z, startTime: Y, expirationTime: nl, sortIndex: -1 }, Y > ul ? (z.sortIndex = Y, y(S, z), b(N) === null && z === b(S) && (rl ? (Mt(J), J = -1) : rl = true, tt(dt, Y - ul))) : (z.sortIndex = nl, y(N, z), Dl || jl || (Dl = true, Ql || (Ql = true, vl()))), z;
    }, s.unstable_shouldYield = Ct, s.unstable_wrapCallback = function(z) {
      var U = el;
      return function() {
        var Y = el;
        el = U;
        try {
          return z.apply(this, arguments);
        } finally {
          el = Y;
        }
      };
    };
  })(zf)), zf;
}
var Cr;
function gy() {
  return Cr || (Cr = 1, pf.exports = vy()), pf.exports;
}
var Tf = { exports: {} }, Ll = {};
var Hr;
function by() {
  if (Hr) return Ll;
  Hr = 1;
  var s = xf();
  function y(N) {
    var S = "https://react.dev/errors/" + N;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var w = 2; w < arguments.length; w++) S += "&args[]=" + encodeURIComponent(arguments[w]);
    }
    return "Minified React error #" + N + "; visit " + S + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function b() {
  }
  var o = { d: { f: b, r: function() {
    throw Error(y(522));
  }, D: b, C: b, L: b, m: b, X: b, S: b, M: b }, p: 0, findDOMNode: null }, M = Symbol.for("react.portal");
  function j(N, S, w) {
    var q = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: M, key: q == null ? null : "" + q, children: N, containerInfo: S, implementation: w };
  }
  var R = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Q(N, S) {
    if (N === "font") return "";
    if (typeof S == "string") return S === "use-credentials" ? S : "";
  }
  return Ll.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, Ll.createPortal = function(N, S) {
    var w = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!S || S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11) throw Error(y(299));
    return j(N, S, null, w);
  }, Ll.flushSync = function(N) {
    var S = R.T, w = o.p;
    try {
      if (R.T = null, o.p = 2, N) return N();
    } finally {
      R.T = S, o.p = w, o.d.f();
    }
  }, Ll.preconnect = function(N, S) {
    typeof N == "string" && (S ? (S = S.crossOrigin, S = typeof S == "string" ? S === "use-credentials" ? S : "" : void 0) : S = null, o.d.C(N, S));
  }, Ll.prefetchDNS = function(N) {
    typeof N == "string" && o.d.D(N);
  }, Ll.preinit = function(N, S) {
    if (typeof N == "string" && S && typeof S.as == "string") {
      var w = S.as, q = Q(w, S.crossOrigin), el = typeof S.integrity == "string" ? S.integrity : void 0, jl = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
      w === "style" ? o.d.S(N, typeof S.precedence == "string" ? S.precedence : void 0, { crossOrigin: q, integrity: el, fetchPriority: jl }) : w === "script" && o.d.X(N, { crossOrigin: q, integrity: el, fetchPriority: jl, nonce: typeof S.nonce == "string" ? S.nonce : void 0 });
    }
  }, Ll.preinitModule = function(N, S) {
    if (typeof N == "string") if (typeof S == "object" && S !== null) {
      if (S.as == null || S.as === "script") {
        var w = Q(S.as, S.crossOrigin);
        o.d.M(N, { crossOrigin: w, integrity: typeof S.integrity == "string" ? S.integrity : void 0, nonce: typeof S.nonce == "string" ? S.nonce : void 0 });
      }
    } else S == null && o.d.M(N);
  }, Ll.preload = function(N, S) {
    if (typeof N == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
      var w = S.as, q = Q(w, S.crossOrigin);
      o.d.L(N, w, { crossOrigin: q, integrity: typeof S.integrity == "string" ? S.integrity : void 0, nonce: typeof S.nonce == "string" ? S.nonce : void 0, type: typeof S.type == "string" ? S.type : void 0, fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0, referrerPolicy: typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0, imageSrcSet: typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0, imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0, media: typeof S.media == "string" ? S.media : void 0 });
    }
  }, Ll.preloadModule = function(N, S) {
    if (typeof N == "string") if (S) {
      var w = Q(S.as, S.crossOrigin);
      o.d.m(N, { as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0, crossOrigin: w, integrity: typeof S.integrity == "string" ? S.integrity : void 0 });
    } else o.d.m(N);
  }, Ll.requestFormReset = function(N) {
    o.d.r(N);
  }, Ll.unstable_batchedUpdates = function(N, S) {
    return N(S);
  }, Ll.useFormState = function(N, S, w) {
    return R.H.useFormState(N, S, w);
  }, Ll.useFormStatus = function() {
    return R.H.useHostTransitionStatus();
  }, Ll.version = "19.2.0", Ll;
}
var Rr;
function Sy() {
  if (Rr) return Tf.exports;
  Rr = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
    } catch (y) {
      console.error(y);
    }
  }
  return s(), Tf.exports = by(), Tf.exports;
}
var Br;
function _y() {
  if (Br) return Ou;
  Br = 1;
  var s = gy(), y = xf(), b = Sy();
  function o(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++) t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function M(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function j(l) {
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
  function R(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Q(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function N(l) {
    if (j(l) !== l) throw Error(o(188));
  }
  function S(l) {
    var t = l.alternate;
    if (!t) {
      if (t = j(l), t === null) throw Error(o(188));
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
        throw Error(o(188));
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
          if (!c) throw Error(o(189));
        }
      }
      if (e.alternate !== a) throw Error(o(190));
    }
    if (e.tag !== 3) throw Error(o(188));
    return e.stateNode.current === e ? l : t;
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
  var q = Object.assign, el = Symbol.for("react.element"), jl = Symbol.for("react.transitional.element"), Dl = Symbol.for("react.portal"), rl = Symbol.for("react.fragment"), Rl = Symbol.for("react.strict_mode"), wl = Symbol.for("react.profiler"), Mt = Symbol.for("react.consumer"), zl = Symbol.for("react.context"), Kl = Symbol.for("react.forward_ref"), dt = Symbol.for("react.suspense"), Ql = Symbol.for("react.suspense_list"), J = Symbol.for("react.memo"), Zl = Symbol.for("react.lazy"), lt = Symbol.for("react.activity"), Ct = Symbol.for("react.memo_cache_sentinel"), mt = Symbol.iterator;
  function vl(l) {
    return l === null || typeof l != "object" ? null : (l = mt && l[mt] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Ht = Symbol.for("react.client.reference");
  function yt(l) {
    if (l == null) return null;
    if (typeof l == "function") return l.$$typeof === Ht ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case rl:
        return "Fragment";
      case wl:
        return "Profiler";
      case Rl:
        return "StrictMode";
      case dt:
        return "Suspense";
      case Ql:
        return "SuspenseList";
      case lt:
        return "Activity";
    }
    if (typeof l == "object") switch (l.$$typeof) {
      case Dl:
        return "Portal";
      case zl:
        return l.displayName || "Context";
      case Mt:
        return (l._context.displayName || "Context") + ".Consumer";
      case Kl:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case J:
        return t = l.displayName || null, t !== null ? t : yt(l.type) || "Memo";
      case Zl:
        t = l._payload, l = l._init;
        try {
          return yt(l(t));
        } catch {
        }
    }
    return null;
  }
  var tt = Array.isArray, z = y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = b.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = { pending: false, data: null, method: null, action: null }, ul = [], nl = -1;
  function d(l) {
    return { current: l };
  }
  function A(l) {
    0 > nl || (l.current = ul[nl], ul[nl] = null, nl--);
  }
  function O(l, t) {
    nl++, ul[nl] = l.current, l.current = t;
  }
  var D = d(null), G = d(null), Z = d(null), W = d(null);
  function Tl(l, t) {
    switch (O(Z, t), O(G, l), O(D, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? F0(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI) t = F0(t), l = I0(t, l);
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
    A(D), O(D, l);
  }
  function gl() {
    A(D), A(G), A(Z);
  }
  function Ve(l) {
    l.memoizedState !== null && O(W, l);
    var t = D.current, e = I0(t, l.type);
    t !== e && (O(G, l), O(D, e));
  }
  function xe(l) {
    G.current === l && (A(D), A(G)), W.current === l && (A(W), zu._currentValue = Y);
  }
  var Ke, Hu;
  function Rt(l) {
    if (Ke === void 0) try {
      throw Error();
    } catch (e) {
      var t = e.stack.trim().match(/\n( *(at )?)/);
      Ke = t && t[1] || "", Hu = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + Ke + l + Hu;
  }
  var ja = false;
  function Ca(l, t) {
    if (!l || ja) return "";
    ja = true;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = { DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var x = function() {
              throw Error();
            };
            if (Object.defineProperty(x.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(x, []);
              } catch (_) {
                var g = _;
              }
              Reflect.construct(l, [], x);
            } else {
              try {
                x.call();
              } catch (_) {
                g = _;
              }
              l.call(x.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (_) {
              g = _;
            }
            (x = l()) && typeof x.catch == "function" && x.catch(function() {
            });
          }
        } catch (_) {
          if (_ && g && typeof _.stack == "string") return [_.stack, g.stack];
        }
        return [null, null];
      } };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
      u && u.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var n = a.DetermineComponentFrameRoot(), c = n[0], i = n[1];
      if (c && i) {
        var f = c.split(`
`), v = i.split(`
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
      ja = false, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? Rt(e) : "";
  }
  function tc(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Rt(l.type);
      case 16:
        return Rt("Lazy");
      case 13:
        return l.child !== t && t !== null ? Rt("Suspense Fallback") : Rt("Suspense");
      case 19:
        return Rt("SuspenseList");
      case 0:
      case 15:
        return Ca(l.type, false);
      case 11:
        return Ca(l.type.render, false);
      case 1:
        return Ca(l.type, true);
      case 31:
        return Rt("Activity");
      default:
        return "";
    }
  }
  function Of(l) {
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
  var ec = Object.prototype.hasOwnProperty, ac = s.unstable_scheduleCallback, uc = s.unstable_cancelCallback, Vr = s.unstable_shouldYield, Kr = s.unstable_requestPaint, et = s.unstable_now, Jr = s.unstable_getCurrentPriorityLevel, Mf = s.unstable_ImmediatePriority, Nf = s.unstable_UserBlockingPriority, Ru = s.unstable_NormalPriority, Wr = s.unstable_LowPriority, Df = s.unstable_IdlePriority, kr = s.log, $r = s.unstable_setDisableYieldValue, Ha = null, at = null;
  function le(l) {
    if (typeof kr == "function" && $r(l), at && typeof at.setStrictMode == "function") try {
      at.setStrictMode(Ha, l);
    } catch {
    }
  }
  var ut = Math.clz32 ? Math.clz32 : Pr, Fr = Math.log, Ir = Math.LN2;
  function Pr(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Fr(l) / Ir | 0) | 0;
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
  function Ra(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function ld(l, t) {
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
  function Uf() {
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
  function td(l, t, e, a, u, n) {
    var c = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var i = l.entanglements, f = l.expirationTimes, v = l.hiddenUpdates;
    for (e = c & ~e; 0 < e; ) {
      var p = 31 - ut(e), x = 1 << p;
      i[p] = 0, f[p] = -1;
      var g = v[p];
      if (g !== null) for (v[p] = null, p = 0; p < g.length; p++) {
        var _ = g[p];
        _ !== null && (_.lane &= -536870913);
      }
      e &= ~x;
    }
    a !== 0 && jf(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(c & ~t));
  }
  function jf(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - ut(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function Cf(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - ut(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function Hf(l, t) {
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
  function Rf() {
    var l = U.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : pr(l.type));
  }
  function Bf(l, t) {
    var e = U.p;
    try {
      return U.p = l, t();
    } finally {
      U.p = e;
    }
  }
  var te = Math.random().toString(36).slice(2), Bl = "__reactFiber$" + te, Jl = "__reactProps$" + te, Je = "__reactContainer$" + te, fc = "__reactEvents$" + te, ed = "__reactListeners$" + te, ad = "__reactHandles$" + te, qf = "__reactResources$" + te, qa = "__reactMarker$" + te;
  function sc(l) {
    delete l[Bl], delete l[Jl], delete l[fc], delete l[ed], delete l[ad];
  }
  function We(l) {
    var t = l[Bl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[Je] || e[Bl]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null) for (l = nr(l); l !== null; ) {
          if (e = l[Bl]) return e;
          l = nr(l);
        }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function ke(l) {
    if (l = l[Bl] || l[Je]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return l;
    }
    return null;
  }
  function Ya(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(o(33));
  }
  function $e(l) {
    var t = l[qf];
    return t || (t = l[qf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Cl(l) {
    l[qa] = true;
  }
  var Yf = /* @__PURE__ */ new Set(), Gf = {};
  function Oe(l, t) {
    Fe(l, t), Fe(l + "Capture", t);
  }
  function Fe(l, t) {
    for (Gf[l] = t, l = 0; l < t.length; l++) Yf.add(t[l]);
  }
  var ud = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Xf = {}, Qf = {};
  function nd(l) {
    return ec.call(Qf, l) ? true : ec.call(Xf, l) ? false : ud.test(l) ? Qf[l] = true : (Xf[l] = true, false);
  }
  function Xu(l, t, e) {
    if (nd(t)) if (e === null) l.removeAttribute(t);
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
  function ht(l) {
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
  function Zf(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function cd(l, t, e) {
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
      var t = Zf(l) ? "checked" : "value";
      l._valueTracker = cd(l, t, "" + l[t]);
    }
  }
  function Lf(l) {
    if (!l) return false;
    var t = l._valueTracker;
    if (!t) return true;
    var e = t.getValue(), a = "";
    return l && (a = Zf(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), true) : false;
  }
  function Zu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var id = /[\n"\\]/g;
  function vt(l) {
    return l.replace(id, function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function rc(l, t, e, a, u, n, c, i) {
    l.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.type = c : l.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + ht(t)) : l.value !== "" + ht(t) && (l.value = "" + ht(t)) : c !== "submit" && c !== "reset" || l.removeAttribute("value"), t != null ? dc(l, c, ht(t)) : e != null ? dc(l, c, ht(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.name = "" + ht(i) : l.removeAttribute("name");
  }
  function wf(l, t, e, a, u, n, c, i) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        oc(l);
        return;
      }
      e = e != null ? "" + ht(e) : "", t = t != null ? "" + ht(t) : e, i || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = i ? l.checked : !!a, l.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (l.name = c), oc(l);
  }
  function dc(l, t, e) {
    t === "number" && Zu(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function Ie(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < e.length; u++) t["$" + e[u]] = true;
      for (e = 0; e < l.length; e++) u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = true);
    } else {
      for (e = "" + ht(e), t = null, u = 0; u < l.length; u++) {
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
    if (t != null && (t = "" + ht(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + ht(e) : "";
  }
  function Kf(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(o(92));
        if (tt(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = ht(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), oc(l);
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
  var fd = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function Jf(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || fd.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Wf(l, t, e) {
    if (t != null && typeof t != "object") throw Error(o(62));
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
  var sd = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), od = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Lu(l) {
    return od.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function qt() {
  }
  var yc = null;
  function hc(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var la = null, ta = null;
  function kf(l) {
    var t = ke(l);
    if (t && (l = t.stateNode)) {
      var e = l[Jl] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (rc(l, e.value, e.defaultValue, e.defaultValue, e.checked, e.defaultChecked, e.type, e.name), t = e.name, e.type === "radio" && t != null) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll('input[name="' + vt("" + t) + '"][type="radio"]'), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[Jl] || null;
                if (!u) throw Error(o(90));
                rc(a, u.value, u.defaultValue, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name);
              }
            }
            for (t = 0; t < e.length; t++) a = e[t], a.form === l.form && Lf(a);
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
      if (vc = false, (la !== null || ta !== null) && (Un(), la && (t = la, l = ta, ta = la = null, kf(t), l))) for (t = 0; t < l.length; t++) kf(l[t]);
    }
  }
  function Ga(l, t) {
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
  var Yt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), gc = false;
  if (Yt) try {
    var Xa = {};
    Object.defineProperty(Xa, "passive", { get: function() {
      gc = true;
    } }), window.addEventListener("test", Xa, Xa), window.removeEventListener("test", Xa, Xa);
  } catch {
    gc = false;
  }
  var ee = null, bc = null, wu = null;
  function Ff() {
    if (wu) return wu;
    var l, t = bc, e = t.length, a, u = "value" in ee ? ee.value : ee.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var c = e - l;
    for (a = 1; a <= c && t[e - a] === u[n - a]; a++) ;
    return wu = u.slice(l, 1 < a ? 1 - a : void 0);
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
  function Wl(l) {
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
  }, defaultPrevented: 0, isTrusted: 0 }, Ju = Wl(Me), Qa = q({}, Me, { view: 0, detail: 0 }), rd = Wl(Qa), Sc, _c, Za, Wu = q({}, Qa, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zc, button: 0, buttons: 0, relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  }, movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== Za && (Za && l.type === "mousemove" ? (Sc = l.screenX - Za.screenX, _c = l.screenY - Za.screenY) : _c = Sc = 0, Za = l), Sc);
  }, movementY: function(l) {
    return "movementY" in l ? l.movementY : _c;
  } }), Pf = Wl(Wu), dd = q({}, Wu, { dataTransfer: 0 }), md = Wl(dd), yd = q({}, Qa, { relatedTarget: 0 }), pc = Wl(yd), hd = q({}, Me, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), vd = Wl(hd), gd = q({}, Me, { clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  } }), bd = Wl(gd), Sd = q({}, Me, { data: 0 }), ls = Wl(Sd), _d = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, pd = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, zd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Td(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = zd[l]) ? !!t[l] : false;
  }
  function zc() {
    return Td;
  }
  var Ed = q({}, Qa, { key: function(l) {
    if (l.key) {
      var t = _d[l.key] || l.key;
      if (t !== "Unidentified") return t;
    }
    return l.type === "keypress" ? (l = Vu(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? pd[l.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zc, charCode: function(l) {
    return l.type === "keypress" ? Vu(l) : 0;
  }, keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }, which: function(l) {
    return l.type === "keypress" ? Vu(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  } }), xd = Wl(Ed), Ad = q({}, Wu, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ts = Wl(Ad), Od = q({}, Qa, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zc }), Md = Wl(Od), Nd = q({}, Me, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Dd = Wl(Nd), Ud = q({}, Wu, { deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  }, deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), jd = Wl(Ud), Cd = q({}, Me, { newState: 0, oldState: 0 }), Hd = Wl(Cd), Rd = [9, 13, 27, 32], Tc = Yt && "CompositionEvent" in window, La = null;
  Yt && "documentMode" in document && (La = document.documentMode);
  var Bd = Yt && "TextEvent" in window && !La, es = Yt && (!Tc || La && 8 < La && 11 >= La), as = " ", us = false;
  function ns(l, t) {
    switch (l) {
      case "keyup":
        return Rd.indexOf(t.keyCode) !== -1;
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
  function qd(l, t) {
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
  function Yd(l, t) {
    if (ea) return l === "compositionend" || !Tc && ns(l, t) ? (l = Ff(), wu = bc = ee = null, ea = false, l) : null;
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
  var Gd = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function is(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Gd[l.type] : t === "textarea";
  }
  function fs(l, t, e, a) {
    la ? ta ? ta.push(a) : ta = [a] : la = a, t = Yn(t, "onChange"), 0 < t.length && (e = new Ju("onChange", "change", null, e, a), l.push({ event: e, listeners: t }));
  }
  var wa = null, Va = null;
  function Xd(l) {
    V0(l, 0);
  }
  function ku(l) {
    var t = Ya(l);
    if (Lf(t)) return l;
  }
  function ss(l, t) {
    if (l === "change") return t;
  }
  var os = false;
  if (Yt) {
    var Ec;
    if (Yt) {
      var xc = "oninput" in document;
      if (!xc) {
        var rs = document.createElement("div");
        rs.setAttribute("oninput", "return;"), xc = typeof rs.oninput == "function";
      }
      Ec = xc;
    } else Ec = false;
    os = Ec && (!document.documentMode || 9 < document.documentMode);
  }
  function ds() {
    wa && (wa.detachEvent("onpropertychange", ms), Va = wa = null);
  }
  function ms(l) {
    if (l.propertyName === "value" && ku(Va)) {
      var t = [];
      fs(t, Va, l, hc(l)), $f(Xd, t);
    }
  }
  function Qd(l, t, e) {
    l === "focusin" ? (ds(), wa = t, Va = e, wa.attachEvent("onpropertychange", ms)) : l === "focusout" && ds();
  }
  function Zd(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown") return ku(Va);
  }
  function Ld(l, t) {
    if (l === "click") return ku(t);
  }
  function wd(l, t) {
    if (l === "input" || l === "change") return ku(t);
  }
  function Vd(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var nt = typeof Object.is == "function" ? Object.is : Vd;
  function Ka(l, t) {
    if (nt(l, t)) return true;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null) return false;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return false;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!ec.call(t, u) || !nt(l[u], t[u])) return false;
    }
    return true;
  }
  function ys(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function hs(l, t) {
    var e = ys(l);
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
      e = ys(e);
    }
  }
  function vs(l, t) {
    return l && t ? l === t ? true : l && l.nodeType === 3 ? false : t && t.nodeType === 3 ? vs(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : false : false;
  }
  function gs(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = Zu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = false;
      }
      if (e) l = t.contentWindow;
      else break;
      t = Zu(l.document);
    }
    return t;
  }
  function Ac(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Kd = Yt && "documentMode" in document && 11 >= document.documentMode, aa = null, Oc = null, Ja = null, Mc = false;
  function bs(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Mc || aa == null || aa !== Zu(a) || (a = aa, "selectionStart" in a && Ac(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = { anchorNode: a.anchorNode, anchorOffset: a.anchorOffset, focusNode: a.focusNode, focusOffset: a.focusOffset }), Ja && Ka(Ja, a) || (Ja = a, a = Yn(Oc, "onSelect"), 0 < a.length && (t = new Ju("onSelect", "select", null, t, e), l.push({ event: t, listeners: a }), t.target = aa)));
  }
  function Ne(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var ua = { animationend: Ne("Animation", "AnimationEnd"), animationiteration: Ne("Animation", "AnimationIteration"), animationstart: Ne("Animation", "AnimationStart"), transitionrun: Ne("Transition", "TransitionRun"), transitionstart: Ne("Transition", "TransitionStart"), transitioncancel: Ne("Transition", "TransitionCancel"), transitionend: Ne("Transition", "TransitionEnd") }, Nc = {}, Ss = {};
  Yt && (Ss = document.createElement("div").style, "AnimationEvent" in window || (delete ua.animationend.animation, delete ua.animationiteration.animation, delete ua.animationstart.animation), "TransitionEvent" in window || delete ua.transitionend.transition);
  function De(l) {
    if (Nc[l]) return Nc[l];
    if (!ua[l]) return l;
    var t = ua[l], e;
    for (e in t) if (t.hasOwnProperty(e) && e in Ss) return Nc[l] = t[e];
    return l;
  }
  var _s = De("animationend"), ps = De("animationiteration"), zs = De("animationstart"), Jd = De("transitionrun"), Wd = De("transitionstart"), kd = De("transitioncancel"), Ts = De("transitionend"), Es = /* @__PURE__ */ new Map(), Dc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  Dc.push("scrollEnd");
  function xt(l, t) {
    Es.set(l, t), Oe(t, [l]);
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
  }, gt = [], na = 0, Uc = 0;
  function Fu() {
    for (var l = na, t = Uc = na = 0; t < l; ) {
      var e = gt[t];
      gt[t++] = null;
      var a = gt[t];
      gt[t++] = null;
      var u = gt[t];
      gt[t++] = null;
      var n = gt[t];
      if (gt[t++] = null, a !== null && u !== null) {
        var c = a.pending;
        c === null ? u.next = u : (u.next = c.next, c.next = u), a.pending = u;
      }
      n !== 0 && xs(e, u, n);
    }
  }
  function Iu(l, t, e, a) {
    gt[na++] = l, gt[na++] = t, gt[na++] = e, gt[na++] = a, Uc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function jc(l, t, e, a) {
    return Iu(l, t, e, a), Pu(l);
  }
  function Ue(l, t) {
    return Iu(l, null, null, t), Pu(l);
  }
  function xs(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = false, n = l.return; n !== null; ) n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = true)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - ut(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function Pu(l) {
    if (50 < hu) throw hu = 0, Qi = null, Error(o(185));
    for (var t = l.return; t !== null; ) l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ca = {};
  function $d(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ct(l, t, e, a) {
    return new $d(l, t, e, a);
  }
  function Cc(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Gt(l, t) {
    var e = l.alternate;
    return e === null ? (e = ct(l.tag, t, l.key, l.mode), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function As(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), l;
  }
  function ln(l, t, e, a, u, n) {
    var c = 0;
    if (a = l, typeof l == "function") Cc(l) && (c = 1);
    else if (typeof l == "string") c = ty(l, e, D.current) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else l: switch (l) {
      case lt:
        return l = ct(31, e, t, u), l.elementType = lt, l.lanes = n, l;
      case rl:
        return je(e.children, u, n, t);
      case Rl:
        c = 8, u |= 24;
        break;
      case wl:
        return l = ct(12, e, t, u | 2), l.elementType = wl, l.lanes = n, l;
      case dt:
        return l = ct(13, e, t, u), l.elementType = dt, l.lanes = n, l;
      case Ql:
        return l = ct(19, e, t, u), l.elementType = Ql, l.lanes = n, l;
      default:
        if (typeof l == "object" && l !== null) switch (l.$$typeof) {
          case zl:
            c = 10;
            break l;
          case Mt:
            c = 9;
            break l;
          case Kl:
            c = 11;
            break l;
          case J:
            c = 14;
            break l;
          case Zl:
            c = 16, a = null;
            break l;
        }
        c = 29, e = Error(o(130, l === null ? "null" : typeof l, "")), a = null;
    }
    return t = ct(c, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function je(l, t, e, a) {
    return l = ct(7, l, a, t), l.lanes = e, l;
  }
  function Hc(l, t, e) {
    return l = ct(6, l, null, t), l.lanes = e, l;
  }
  function Os(l) {
    var t = ct(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function Rc(l, t, e) {
    return t = ct(4, l.children !== null ? l.children : [], l.key, t), t.lanes = e, t.stateNode = { containerInfo: l.containerInfo, pendingChildren: null, implementation: l.implementation }, t;
  }
  var Ms = /* @__PURE__ */ new WeakMap();
  function bt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = Ms.get(l);
      return e !== void 0 ? e : (t = { value: l, source: t, stack: Of(t) }, Ms.set(l, t), t);
    }
    return { value: l, source: t, stack: Of(t) };
  }
  var ia = [], fa = 0, tn = null, Wa = 0, St = [], _t = 0, ae = null, Nt = 1, Dt = "";
  function Xt(l, t) {
    ia[fa++] = Wa, ia[fa++] = tn, tn = l, Wa = t;
  }
  function Ns(l, t, e) {
    St[_t++] = Nt, St[_t++] = Dt, St[_t++] = ae, ae = l;
    var a = Nt;
    l = Dt;
    var u = 32 - ut(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - ut(t) + u;
    if (30 < n) {
      var c = u - u % 5;
      n = (a & (1 << c) - 1).toString(32), a >>= c, u -= c, Nt = 1 << 32 - ut(t) + u | e << u | a, Dt = n + l;
    } else Nt = 1 << n | e << u | a, Dt = l;
  }
  function Bc(l) {
    l.return !== null && (Xt(l, 1), Ns(l, 1, 0));
  }
  function qc(l) {
    for (; l === tn; ) tn = ia[--fa], ia[fa] = null, Wa = ia[--fa], ia[fa] = null;
    for (; l === ae; ) ae = St[--_t], St[_t] = null, Dt = St[--_t], St[_t] = null, Nt = St[--_t], St[_t] = null;
  }
  function Ds(l, t) {
    St[_t++] = Nt, St[_t++] = Dt, St[_t++] = ae, Nt = t.id, Dt = t.overflow, ae = l;
  }
  var ql = null, yl = null, P = false, ue = null, pt = false, Yc = Error(o(519));
  function ne(l) {
    var t = Error(o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
    throw ka(bt(t, l)), Yc;
  }
  function Us(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[Bl] = l, t[Jl] = a, e) {
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
        $("invalid", t), wf(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, true);
        break;
      case "select":
        $("invalid", t);
        break;
      case "textarea":
        $("invalid", t), Kf(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === true || k0(t.textContent, e) ? (a.popover != null && ($("beforetoggle", t), $("toggle", t)), a.onScroll != null && $("scroll", t), a.onScrollEnd != null && $("scrollend", t), a.onClick != null && (t.onclick = qt), t = true) : t = false, t || ne(l, true);
  }
  function js(l) {
    for (ql = l.return; ql; ) switch (ql.tag) {
      case 5:
      case 31:
      case 13:
        pt = false;
        return;
      case 27:
      case 3:
        pt = true;
        return;
      default:
        ql = ql.return;
    }
  }
  function sa(l) {
    if (l !== ql) return false;
    if (!P) return js(l), P = true, false;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || ef(l.type, l.memoizedProps)), e = !e), e && yl && ne(l), js(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      yl = ur(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      yl = ur(l);
    } else t === 27 ? (t = yl, Se(l.type) ? (l = ff, ff = null, yl = l) : yl = t) : yl = ql ? Tt(l.stateNode.nextSibling) : null;
    return true;
  }
  function Ce() {
    yl = ql = null, P = false;
  }
  function Gc() {
    var l = ue;
    return l !== null && (Il === null ? Il = l : Il.push.apply(Il, l), ue = null), l;
  }
  function ka(l) {
    ue === null ? ue = [l] : ue.push(l);
  }
  var Xc = d(null), He = null, Qt = null;
  function ce(l, t, e) {
    O(Xc, t._currentValue), t._currentValue = e;
  }
  function Zt(l) {
    l._currentValue = Xc.current, A(Xc);
  }
  function Qc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function Zc(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var c = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var i = n;
          n = u;
          for (var f = 0; f < t.length; f++) if (i.context === t[f]) {
            n.lanes |= e, i = n.alternate, i !== null && (i.lanes |= e), Qc(n.return, e, l), a || (c = null);
            break l;
          }
          n = i.next;
        }
      } else if (u.tag === 18) {
        if (c = u.return, c === null) throw Error(o(341));
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
        if (c === null) throw Error(o(387));
        if (c = c.memoizedProps, c !== null) {
          var i = u.type;
          nt(u.pendingProps.value, c.value) || (l !== null ? l.push(i) : l = [i]);
        }
      } else if (u === W.current) {
        if (c = u.alternate, c === null) throw Error(o(387));
        c.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(zu) : l = [zu]);
      }
      u = u.return;
    }
    l !== null && Zc(t, l, e, a), t.flags |= 262144;
  }
  function en(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!nt(l.context._currentValue, l.memoizedValue)) return true;
      l = l.next;
    }
    return false;
  }
  function Re(l) {
    He = l, Qt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Yl(l) {
    return Cs(He, l);
  }
  function an(l, t) {
    return He === null && Re(l), Cs(l, t);
  }
  function Cs(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, Qt === null) {
      if (l === null) throw Error(o(308));
      Qt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Qt = Qt.next = t;
    return e;
  }
  var Fd = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = { aborted: false, addEventListener: function(e, a) {
      l.push(a);
    } };
    this.abort = function() {
      t.aborted = true, l.forEach(function(e) {
        return e();
      });
    };
  }, Id = s.unstable_scheduleCallback, Pd = s.unstable_NormalPriority, Al = { $$typeof: zl, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function Lc() {
    return { controller: new Fd(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function $a(l) {
    l.refCount--, l.refCount === 0 && Id(Pd, function() {
      l.controller.abort();
    });
  }
  var Fa = null, wc = 0, ra = 0, da = null;
  function lm(l, t) {
    if (Fa === null) {
      var e = Fa = [];
      wc = 0, ra = Ji(), da = { status: "pending", value: void 0, then: function(a) {
        e.push(a);
      } };
    }
    return wc++, t.then(Hs, Hs), t;
  }
  function Hs() {
    if (--wc === 0 && Fa !== null) {
      da !== null && (da.status = "fulfilled");
      var l = Fa;
      Fa = null, ra = 0, da = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function tm(l, t) {
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
  var Rs = z.S;
  z.S = function(l, t) {
    S0 = et(), typeof t == "object" && t !== null && typeof t.then == "function" && lm(l, t), Rs !== null && Rs(l, t);
  };
  var Be = d(null);
  function Vc() {
    var l = Be.current;
    return l !== null ? l : dl.pooledCache;
  }
  function un(l, t) {
    t === null ? O(Be, Be.current) : O(Be, t.pool);
  }
  function Bs() {
    var l = Vc();
    return l === null ? null : { parent: Al._currentValue, pool: l };
  }
  var ma = Error(o(460)), Kc = Error(o(474)), nn = Error(o(542)), cn = { then: function() {
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
    if (Ye === null) throw Error(o(459));
    var l = Ye;
    return Ye = null, l;
  }
  function Xs(l) {
    if (l === ma || l === nn) throw Error(o(483));
  }
  var ya = null, Ia = 0;
  function fn(l) {
    var t = Ia;
    return Ia += 1, ya === null && (ya = []), Ys(ya, l, t);
  }
  function Pa(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function sn(l, t) {
    throw t.$$typeof === el ? Error(o(525)) : (l = Object.prototype.toString.call(t), Error(o(31, l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l)));
  }
  function Qs(l) {
    function t(m, r) {
      if (l) {
        var h = m.deletions;
        h === null ? (m.deletions = [r], m.flags |= 16) : h.push(r);
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
    function n(m, r, h) {
      return m.index = h, l ? (h = m.alternate, h !== null ? (h = h.index, h < r ? (m.flags |= 67108866, r) : h) : (m.flags |= 67108866, r)) : (m.flags |= 1048576, r);
    }
    function c(m) {
      return l && m.alternate === null && (m.flags |= 67108866), m;
    }
    function i(m, r, h, E) {
      return r === null || r.tag !== 6 ? (r = Hc(h, m.mode, E), r.return = m, r) : (r = u(r, h), r.return = m, r);
    }
    function f(m, r, h, E) {
      var B = h.type;
      return B === rl ? p(m, r, h.props.children, E, h.key) : r !== null && (r.elementType === B || typeof B == "object" && B !== null && B.$$typeof === Zl && qe(B) === r.type) ? (r = u(r, h.props), Pa(r, h), r.return = m, r) : (r = ln(h.type, h.key, h.props, null, m.mode, E), Pa(r, h), r.return = m, r);
    }
    function v(m, r, h, E) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== h.containerInfo || r.stateNode.implementation !== h.implementation ? (r = Rc(h, m.mode, E), r.return = m, r) : (r = u(r, h.children || []), r.return = m, r);
    }
    function p(m, r, h, E, B) {
      return r === null || r.tag !== 7 ? (r = je(h, m.mode, E, B), r.return = m, r) : (r = u(r, h), r.return = m, r);
    }
    function x(m, r, h) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return r = Hc("" + r, m.mode, h), r.return = m, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case jl:
            return h = ln(r.type, r.key, r.props, null, m.mode, h), Pa(h, r), h.return = m, h;
          case Dl:
            return r = Rc(r, m.mode, h), r.return = m, r;
          case Zl:
            return r = qe(r), x(m, r, h);
        }
        if (tt(r) || vl(r)) return r = je(r, m.mode, h, null), r.return = m, r;
        if (typeof r.then == "function") return x(m, fn(r), h);
        if (r.$$typeof === zl) return x(m, an(m, r), h);
        sn(m, r);
      }
      return null;
    }
    function g(m, r, h, E) {
      var B = r !== null ? r.key : null;
      if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint") return B !== null ? null : i(m, r, "" + h, E);
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case jl:
            return h.key === B ? f(m, r, h, E) : null;
          case Dl:
            return h.key === B ? v(m, r, h, E) : null;
          case Zl:
            return h = qe(h), g(m, r, h, E);
        }
        if (tt(h) || vl(h)) return B !== null ? null : p(m, r, h, E, null);
        if (typeof h.then == "function") return g(m, r, fn(h), E);
        if (h.$$typeof === zl) return g(m, r, an(m, h), E);
        sn(m, h);
      }
      return null;
    }
    function _(m, r, h, E, B) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint") return m = m.get(h) || null, i(r, m, "" + E, B);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case jl:
            return m = m.get(E.key === null ? h : E.key) || null, f(r, m, E, B);
          case Dl:
            return m = m.get(E.key === null ? h : E.key) || null, v(r, m, E, B);
          case Zl:
            return E = qe(E), _(m, r, h, E, B);
        }
        if (tt(E) || vl(E)) return m = m.get(h) || null, p(r, m, E, B, null);
        if (typeof E.then == "function") return _(m, r, h, fn(E), B);
        if (E.$$typeof === zl) return _(m, r, h, an(r, E), B);
        sn(r, E);
      }
      return null;
    }
    function C(m, r, h, E) {
      for (var B = null, ll = null, H = r, K = r = 0, I = null; H !== null && K < h.length; K++) {
        H.index > K ? (I = H, H = null) : I = H.sibling;
        var tl = g(m, H, h[K], E);
        if (tl === null) {
          H === null && (H = I);
          break;
        }
        l && H && tl.alternate === null && t(m, H), r = n(tl, r, K), ll === null ? B = tl : ll.sibling = tl, ll = tl, H = I;
      }
      if (K === h.length) return e(m, H), P && Xt(m, K), B;
      if (H === null) {
        for (; K < h.length; K++) H = x(m, h[K], E), H !== null && (r = n(H, r, K), ll === null ? B = H : ll.sibling = H, ll = H);
        return P && Xt(m, K), B;
      }
      for (H = a(H); K < h.length; K++) I = _(H, m, K, h[K], E), I !== null && (l && I.alternate !== null && H.delete(I.key === null ? K : I.key), r = n(I, r, K), ll === null ? B = I : ll.sibling = I, ll = I);
      return l && H.forEach(function(Ee) {
        return t(m, Ee);
      }), P && Xt(m, K), B;
    }
    function X(m, r, h, E) {
      if (h == null) throw Error(o(151));
      for (var B = null, ll = null, H = r, K = r = 0, I = null, tl = h.next(); H !== null && !tl.done; K++, tl = h.next()) {
        H.index > K ? (I = H, H = null) : I = H.sibling;
        var Ee = g(m, H, tl.value, E);
        if (Ee === null) {
          H === null && (H = I);
          break;
        }
        l && H && Ee.alternate === null && t(m, H), r = n(Ee, r, K), ll === null ? B = Ee : ll.sibling = Ee, ll = Ee, H = I;
      }
      if (tl.done) return e(m, H), P && Xt(m, K), B;
      if (H === null) {
        for (; !tl.done; K++, tl = h.next()) tl = x(m, tl.value, E), tl !== null && (r = n(tl, r, K), ll === null ? B = tl : ll.sibling = tl, ll = tl);
        return P && Xt(m, K), B;
      }
      for (H = a(H); !tl.done; K++, tl = h.next()) tl = _(H, m, K, tl.value, E), tl !== null && (l && tl.alternate !== null && H.delete(tl.key === null ? K : tl.key), r = n(tl, r, K), ll === null ? B = tl : ll.sibling = tl, ll = tl);
      return l && H.forEach(function(dy) {
        return t(m, dy);
      }), P && Xt(m, K), B;
    }
    function ol(m, r, h, E) {
      if (typeof h == "object" && h !== null && h.type === rl && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case jl:
            l: {
              for (var B = h.key; r !== null; ) {
                if (r.key === B) {
                  if (B = h.type, B === rl) {
                    if (r.tag === 7) {
                      e(m, r.sibling), E = u(r, h.props.children), E.return = m, m = E;
                      break l;
                    }
                  } else if (r.elementType === B || typeof B == "object" && B !== null && B.$$typeof === Zl && qe(B) === r.type) {
                    e(m, r.sibling), E = u(r, h.props), Pa(E, h), E.return = m, m = E;
                    break l;
                  }
                  e(m, r);
                  break;
                } else t(m, r);
                r = r.sibling;
              }
              h.type === rl ? (E = je(h.props.children, m.mode, E, h.key), E.return = m, m = E) : (E = ln(h.type, h.key, h.props, null, m.mode, E), Pa(E, h), E.return = m, m = E);
            }
            return c(m);
          case Dl:
            l: {
              for (B = h.key; r !== null; ) {
                if (r.key === B) if (r.tag === 4 && r.stateNode.containerInfo === h.containerInfo && r.stateNode.implementation === h.implementation) {
                  e(m, r.sibling), E = u(r, h.children || []), E.return = m, m = E;
                  break l;
                } else {
                  e(m, r);
                  break;
                }
                else t(m, r);
                r = r.sibling;
              }
              E = Rc(h, m.mode, E), E.return = m, m = E;
            }
            return c(m);
          case Zl:
            return h = qe(h), ol(m, r, h, E);
        }
        if (tt(h)) return C(m, r, h, E);
        if (vl(h)) {
          if (B = vl(h), typeof B != "function") throw Error(o(150));
          return h = B.call(h), X(m, r, h, E);
        }
        if (typeof h.then == "function") return ol(m, r, fn(h), E);
        if (h.$$typeof === zl) return ol(m, r, an(m, h), E);
        sn(m, h);
      }
      return typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint" ? (h = "" + h, r !== null && r.tag === 6 ? (e(m, r.sibling), E = u(r, h), E.return = m, m = E) : (e(m, r), E = Hc(h, m.mode, E), E.return = m, m = E), c(m)) : e(m, r);
    }
    return function(m, r, h, E) {
      try {
        Ia = 0;
        var B = ol(m, r, h, E);
        return ya = null, B;
      } catch (H) {
        if (H === ma || H === nn) throw H;
        var ll = ct(29, H, null, m.mode);
        return ll.lanes = E, ll.return = m, ll;
      } finally {
      }
    };
  }
  var Ge = Qs(true), Zs = Qs(false), ie = false;
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
    if (a = a.shared, (al & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = Pu(l), xs(l, null, e), t;
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
      var f = i, v = f.next;
      f.next = null, c === null ? n = v : c.next = v, c = f;
      var p = l.alternate;
      p !== null && (p = p.updateQueue, i = p.lastBaseUpdate, i !== c && (i === null ? p.firstBaseUpdate = v : i.next = v, p.lastBaseUpdate = f));
    }
    if (n !== null) {
      var x = u.baseState;
      c = 0, p = v = f = null, i = n;
      do {
        var g = i.lane & -536870913, _ = g !== i.lane;
        if (_ ? (F & g) === g : (a & g) === g) {
          g !== 0 && g === ra && ($c = true), p !== null && (p = p.next = { lane: 0, tag: i.tag, payload: i.payload, callback: null, next: null });
          l: {
            var C = l, X = i;
            g = t;
            var ol = e;
            switch (X.tag) {
              case 1:
                if (C = X.payload, typeof C == "function") {
                  x = C.call(ol, x, g);
                  break l;
                }
                x = C;
                break l;
              case 3:
                C.flags = C.flags & -65537 | 128;
              case 0:
                if (C = X.payload, g = typeof C == "function" ? C.call(ol, x, g) : C, g == null) break l;
                x = q({}, x, g);
                break l;
              case 2:
                ie = true;
            }
          }
          g = i.callback, g !== null && (l.flags |= 64, _ && (l.flags |= 8192), _ = u.callbacks, _ === null ? u.callbacks = [g] : _.push(g));
        } else _ = { lane: g, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, p === null ? (v = p = _, f = x) : p = p.next = _, c |= g;
        if (i = i.next, i === null) {
          if (i = u.shared.pending, i === null) break;
          _ = i, i = _.next, _.next = null, u.lastBaseUpdate = _, u.shared.pending = null;
        }
      } while (true);
      p === null && (f = x), u.baseState = f, u.firstBaseUpdate = v, u.lastBaseUpdate = p, n === null && (u.shared.lanes = 0), ye |= c, l.lanes = c, l.memoizedState = x;
    }
  }
  function Ls(l, t) {
    if (typeof l != "function") throw Error(o(191, l));
    l.call(t);
  }
  function ws(l, t) {
    var e = l.callbacks;
    if (e !== null) for (l.callbacks = null, l = 0; l < e.length; l++) Ls(e[l], t);
  }
  var ha = d(null), on = d(0);
  function Vs(l, t) {
    l = Ft, O(on, l), O(ha, t), Ft = l | t.baseLanes;
  }
  function Fc() {
    O(on, Ft), O(ha, ha.current);
  }
  function Ic() {
    Ft = on.current, A(ha), A(on);
  }
  var it = d(null), zt = null;
  function oe(l) {
    var t = l.alternate;
    O(El, El.current & 1), O(it, l), zt === null && (t === null || ha.current !== null || t.memoizedState !== null) && (zt = l);
  }
  function Pc(l) {
    O(El, El.current), O(it, l), zt === null && (zt = l);
  }
  function Ks(l) {
    l.tag === 22 ? (O(El, El.current), O(it, l), zt === null && (zt = l)) : re();
  }
  function re() {
    O(El, El.current), O(it, it.current);
  }
  function ft(l) {
    A(it), zt === l && (zt = null), A(El);
  }
  var El = d(0);
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
  var Lt = 0, V = null, fl = null, Ol = null, dn = false, va = false, Xe = false, mn = 0, au = 0, ga = null, em = 0;
  function _l() {
    throw Error(o(321));
  }
  function li(l, t) {
    if (t === null) return false;
    for (var e = 0; e < t.length && e < l.length; e++) if (!nt(l[e], t[e])) return false;
    return true;
  }
  function ti(l, t, e, a, u, n) {
    return Lt = n, V = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, z.H = l === null || l.memoizedState === null ? Do : vi, Xe = false, n = e(a, u), Xe = false, va && (n = Ws(t, e, a, u)), Js(l), n;
  }
  function Js(l) {
    z.H = cu;
    var t = fl !== null && fl.next !== null;
    if (Lt = 0, Ol = fl = V = null, dn = false, au = 0, ga = null, t) throw Error(o(300));
    l === null || Ml || (l = l.dependencies, l !== null && en(l) && (Ml = true));
  }
  function Ws(l, t, e, a) {
    V = l;
    var u = 0;
    do {
      if (va && (ga = null), au = 0, va = false, 25 <= u) throw Error(o(301));
      if (u += 1, Ol = fl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      z.H = Uo, n = t(e, a);
    } while (va);
    return n;
  }
  function am() {
    var l = z.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? uu(t) : t, l = l.useState()[0], (fl !== null ? fl.memoizedState : null) !== l && (V.flags |= 1024), t;
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
    Lt = 0, Ol = fl = V = null, va = false, au = mn = 0, ga = null;
  }
  function Vl() {
    var l = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ol === null ? V.memoizedState = Ol = l : Ol = Ol.next = l, Ol;
  }
  function xl() {
    if (fl === null) {
      var l = V.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = fl.next;
    var t = Ol === null ? V.memoizedState : Ol.next;
    if (t !== null) Ol = t, fl = l;
    else {
      if (l === null) throw V.alternate === null ? Error(o(467)) : Error(o(310));
      fl = l, l = { memoizedState: fl.memoizedState, baseState: fl.baseState, baseQueue: fl.baseQueue, queue: fl.queue, next: null }, Ol === null ? V.memoizedState = Ol = l : Ol = Ol.next = l;
    }
    return Ol;
  }
  function yn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function uu(l) {
    var t = au;
    return au += 1, ga === null && (ga = []), l = Ys(ga, l, t), t = V, (Ol === null ? t.memoizedState : Ol.next) === null && (t = t.alternate, z.H = t === null || t.memoizedState === null ? Do : vi), l;
  }
  function hn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return uu(l);
      if (l.$$typeof === zl) return Yl(l);
    }
    throw Error(o(438, String(l)));
  }
  function ni(l) {
    var t = null, e = V.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = V.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = { data: a.data.map(function(u) {
        return u.slice();
      }), index: 0 })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = yn(), V.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0) for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = Ct;
    return t.index++, e;
  }
  function wt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function vn(l) {
    var t = xl();
    return ci(t, fl, l);
  }
  function ci(l, t, e) {
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
      var i = c = null, f = null, v = t, p = false;
      do {
        var x = v.lane & -536870913;
        if (x !== v.lane ? (F & x) === x : (Lt & x) === x) {
          var g = v.revertLane;
          if (g === 0) f !== null && (f = f.next = { lane: 0, revertLane: 0, gesture: null, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }), x === ra && (p = true);
          else if ((Lt & g) === g) {
            v = v.next, g === ra && (p = true);
            continue;
          } else x = { lane: 0, revertLane: v.revertLane, gesture: null, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }, f === null ? (i = f = x, c = n) : f = f.next = x, V.lanes |= g, ye |= g;
          x = v.action, Xe && e(n, x), n = v.hasEagerState ? v.eagerState : e(n, x);
        } else g = { lane: x, revertLane: v.revertLane, gesture: v.gesture, action: v.action, hasEagerState: v.hasEagerState, eagerState: v.eagerState, next: null }, f === null ? (i = f = g, c = n) : f = f.next = g, V.lanes |= x, ye |= x;
        v = v.next;
      } while (v !== null && v !== t);
      if (f === null ? c = n : f.next = i, !nt(n, l.memoizedState) && (Ml = true, p && (e = da, e !== null))) throw e;
      l.memoizedState = n, l.baseState = c, l.baseQueue = f, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function ii(l) {
    var t = xl(), e = t.queue;
    if (e === null) throw Error(o(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, u = e.pending, n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var c = u = u.next;
      do
        n = l(n, c.action), c = c.next;
      while (c !== u);
      nt(n, t.memoizedState) || (Ml = true), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function ks(l, t, e) {
    var a = V, u = xl(), n = P;
    if (n) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = t();
    var c = !nt((fl || u).memoizedState, e);
    if (c && (u.memoizedState = e, Ml = true), u = u.queue, oi(Is.bind(null, a, u, l), [l]), u.getSnapshot !== t || c || Ol !== null && Ol.memoizedState.tag & 1) {
      if (a.flags |= 2048, ba(9, { destroy: void 0 }, Fs.bind(null, a, u, e, t), null), dl === null) throw Error(o(349));
      n || (Lt & 127) !== 0 || $s(a, t, e);
    }
    return e;
  }
  function $s(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = V.updateQueue, t === null ? (t = yn(), V.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
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
      return !nt(l, e);
    } catch {
      return true;
    }
  }
  function lo(l) {
    var t = Ue(l, 2);
    t !== null && Pl(t, l, 2);
  }
  function fi(l) {
    var t = Vl();
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
    return t.memoizedState = t.baseState = l, t.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: wt, lastRenderedState: l }, t;
  }
  function to(l, t, e, a) {
    return l.baseState = e, ci(l, fl, typeof a == "function" ? a : wt);
  }
  function um(l, t, e, a, u) {
    if (Sn(l)) throw Error(o(485));
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
        var i = e(u, a), f = z.S;
        f !== null && f(c, i), ao(l, t, i);
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
    if (P) {
      var e = dl.formState;
      if (e !== null) {
        l: {
          var a = V;
          if (P) {
            if (yl) {
              t: {
                for (var u = yl, n = pt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = Tt(u.nextSibling), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                yl = Tt(u.nextSibling), a = u.data === "F!";
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
    return e = Vl(), e.memoizedState = e.baseState = t, a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: co, lastRenderedState: t }, e.queue = a, e = Oo.bind(null, V, a), a.dispatch = e, a = fi(false), n = hi.bind(null, V, false, a.queue), a = Vl(), u = { state: t, dispatch: null, action: l, pending: null }, a.queue = u, e = um.bind(null, V, u, n, e), u.dispatch = e, a.memoizedState = l, [t, e, false];
  }
  function fo(l) {
    var t = xl();
    return so(t, fl, l);
  }
  function so(l, t, e) {
    if (t = ci(l, t, co)[0], l = vn(wt)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var a = uu(t);
    } catch (c) {
      throw c === ma ? nn : c;
    }
    else a = t;
    t = xl();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && (V.flags |= 2048, ba(9, { destroy: void 0 }, nm.bind(null, u, e), null)), [a, n, l];
  }
  function nm(l, t) {
    l.action = t;
  }
  function oo(l) {
    var t = xl(), e = fl;
    if (e !== null) return so(t, e, l);
    xl(), t = t.memoizedState, e = xl();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, false];
  }
  function ba(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = V.updateQueue, t === null && (t = yn(), V.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function ro() {
    return xl().memoizedState;
  }
  function gn(l, t, e, a) {
    var u = Vl();
    V.flags |= l, u.memoizedState = ba(1 | t, { destroy: void 0 }, e, a === void 0 ? null : a);
  }
  function bn(l, t, e, a) {
    var u = xl();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    fl !== null && a !== null && li(a, fl.memoizedState.deps) ? u.memoizedState = ba(t, n, e, a) : (V.flags |= l, u.memoizedState = ba(1 | t, n, e, a));
  }
  function mo(l, t) {
    gn(8390656, 8, l, t);
  }
  function oi(l, t) {
    bn(2048, 8, l, t);
  }
  function cm(l) {
    V.flags |= 4;
    var t = V.updateQueue;
    if (t === null) t = yn(), V.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function yo(l) {
    var t = xl().memoizedState;
    return cm({ ref: t, nextImpl: l }), function() {
      if ((al & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ho(l, t) {
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
    var e = xl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && li(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function _o(l, t) {
    var e = xl();
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
    return e === void 0 || (Lt & 1073741824) !== 0 && (F & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = p0(), V.lanes |= l, ye |= l, e);
  }
  function po(l, t, e, a) {
    return nt(e, t) ? e : ha.current !== null ? (l = di(l, e, a), nt(l, t) || (Ml = true), l) : (Lt & 42) === 0 || (Lt & 1073741824) !== 0 && (F & 261930) === 0 ? (Ml = true, l.memoizedState = e) : (l = p0(), V.lanes |= l, ye |= l, t);
  }
  function zo(l, t, e, a, u) {
    var n = U.p;
    U.p = n !== 0 && 8 > n ? n : 8;
    var c = z.T, i = {};
    z.T = i, hi(l, false, t, e);
    try {
      var f = u(), v = z.S;
      if (v !== null && v(i, f), f !== null && typeof f == "object" && typeof f.then == "function") {
        var p = tm(f, a);
        nu(l, t, p, rt(l));
      } else nu(l, t, a, rt(l));
    } catch (x) {
      nu(l, t, { then: function() {
      }, status: "rejected", reason: x }, rt());
    } finally {
      U.p = n, c !== null && i.types !== null && (c.types = i.types), z.T = c;
    }
  }
  function im() {
  }
  function mi(l, t, e, a) {
    if (l.tag !== 5) throw Error(o(476));
    var u = To(l).queue;
    zo(l, u, t, Y, e === null ? im : function() {
      return Eo(l), e(a);
    });
  }
  function To(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = { memoizedState: Y, baseState: Y, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: wt, lastRenderedState: Y }, next: null };
    var e = {};
    return t.next = { memoizedState: e, baseState: e, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: wt, lastRenderedState: e }, next: null }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function Eo(l) {
    var t = To(l);
    t.next === null && (t = l.alternate.memoizedState), nu(l, t.next.queue, {}, rt());
  }
  function yi() {
    return Yl(zu);
  }
  function xo() {
    return xl().memoizedState;
  }
  function Ao() {
    return xl().memoizedState;
  }
  function fm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = rt();
          l = fe(e);
          var a = se(t, l, e);
          a !== null && (Pl(a, t, e), lu(a, t, e)), t = { cache: Lc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function sm(l, t, e) {
    var a = rt();
    e = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null }, Sn(l) ? Mo(t, e) : (e = jc(l, t, e, a), e !== null && (Pl(e, l, a), No(e, t, a)));
  }
  function Oo(l, t, e) {
    var a = rt();
    nu(l, t, e, a);
  }
  function nu(l, t, e, a) {
    var u = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null };
    if (Sn(l)) Mo(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null)) try {
        var c = t.lastRenderedState, i = n(c, e);
        if (u.hasEagerState = true, u.eagerState = i, nt(i, c)) return Iu(l, t, u, 0), dl === null && Fu(), false;
      } catch {
      } finally {
      }
      if (e = jc(l, t, u, a), e !== null) return Pl(e, l, a), No(e, t, a), true;
    }
    return false;
  }
  function hi(l, t, e, a) {
    if (a = { lane: 2, revertLane: Ji(), gesture: null, action: a, hasEagerState: false, eagerState: null, next: null }, Sn(l)) {
      if (t) throw Error(o(479));
    } else t = jc(l, e, a, 2), t !== null && Pl(t, l, 2);
  }
  function Sn(l) {
    var t = l.alternate;
    return l === V || t !== null && t === V;
  }
  function Mo(l, t) {
    va = dn = true;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function No(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Cf(l, e);
    }
  }
  var cu = { readContext: Yl, use: hn, useCallback: _l, useContext: _l, useEffect: _l, useImperativeHandle: _l, useLayoutEffect: _l, useInsertionEffect: _l, useMemo: _l, useReducer: _l, useRef: _l, useState: _l, useDebugValue: _l, useDeferredValue: _l, useTransition: _l, useSyncExternalStore: _l, useId: _l, useHostTransitionStatus: _l, useFormState: _l, useActionState: _l, useOptimistic: _l, useMemoCache: _l, useCacheRefresh: _l };
  cu.useEffectEvent = _l;
  var Do = { readContext: Yl, use: hn, useCallback: function(l, t) {
    return Vl().memoizedState = [l, t === void 0 ? null : t], l;
  }, useContext: Yl, useEffect: mo, useImperativeHandle: function(l, t, e) {
    e = e != null ? e.concat([l]) : null, gn(4194308, 4, go.bind(null, t, l), e);
  }, useLayoutEffect: function(l, t) {
    return gn(4194308, 4, l, t);
  }, useInsertionEffect: function(l, t) {
    gn(4, 2, l, t);
  }, useMemo: function(l, t) {
    var e = Vl();
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
    var a = Vl();
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
    return a.memoizedState = a.baseState = u, l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: l, lastRenderedState: u }, a.queue = l, l = l.dispatch = sm.bind(null, V, l), [a.memoizedState, l];
  }, useRef: function(l) {
    var t = Vl();
    return l = { current: l }, t.memoizedState = l;
  }, useState: function(l) {
    l = fi(l);
    var t = l.queue, e = Oo.bind(null, V, t);
    return t.dispatch = e, [l.memoizedState, e];
  }, useDebugValue: ri, useDeferredValue: function(l, t) {
    var e = Vl();
    return di(e, l, t);
  }, useTransition: function() {
    var l = fi(false);
    return l = zo.bind(null, V, l.queue, true, false), Vl().memoizedState = l, [false, l];
  }, useSyncExternalStore: function(l, t, e) {
    var a = V, u = Vl();
    if (P) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else {
      if (e = t(), dl === null) throw Error(o(349));
      (F & 127) !== 0 || $s(a, t, e);
    }
    u.memoizedState = e;
    var n = { value: e, getSnapshot: t };
    return u.queue = n, mo(Is.bind(null, a, n, l), [l]), a.flags |= 2048, ba(9, { destroy: void 0 }, Fs.bind(null, a, n, e, t), null), e;
  }, useId: function() {
    var l = Vl(), t = dl.identifierPrefix;
    if (P) {
      var e = Dt, a = Nt;
      e = (a & ~(1 << 32 - ut(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = mn++, 0 < e && (t += "H" + e.toString(32)), t += "_";
    } else e = em++, t = "_" + t + "r_" + e.toString(32) + "_";
    return l.memoizedState = t;
  }, useHostTransitionStatus: yi, useFormState: io, useActionState: io, useOptimistic: function(l) {
    var t = Vl();
    t.memoizedState = t.baseState = l;
    var e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return t.queue = e, t = hi.bind(null, V, true, e), e.dispatch = t, [l, t];
  }, useMemoCache: ni, useCacheRefresh: function() {
    return Vl().memoizedState = fm.bind(null, V);
  }, useEffectEvent: function(l) {
    var t = Vl(), e = { impl: l };
    return t.memoizedState = e, function() {
      if ((al & 2) !== 0) throw Error(o(440));
      return e.impl.apply(void 0, arguments);
    };
  } }, vi = { readContext: Yl, use: hn, useCallback: So, useContext: Yl, useEffect: oi, useImperativeHandle: bo, useInsertionEffect: ho, useLayoutEffect: vo, useMemo: _o, useReducer: vn, useRef: ro, useState: function() {
    return vn(wt);
  }, useDebugValue: ri, useDeferredValue: function(l, t) {
    var e = xl();
    return po(e, fl.memoizedState, l, t);
  }, useTransition: function() {
    var l = vn(wt)[0], t = xl().memoizedState;
    return [typeof l == "boolean" ? l : uu(l), t];
  }, useSyncExternalStore: ks, useId: xo, useHostTransitionStatus: yi, useFormState: fo, useActionState: fo, useOptimistic: function(l, t) {
    var e = xl();
    return to(e, fl, l, t);
  }, useMemoCache: ni, useCacheRefresh: Ao };
  vi.useEffectEvent = yo;
  var Uo = { readContext: Yl, use: hn, useCallback: So, useContext: Yl, useEffect: oi, useImperativeHandle: bo, useInsertionEffect: ho, useLayoutEffect: vo, useMemo: _o, useReducer: ii, useRef: ro, useState: function() {
    return ii(wt);
  }, useDebugValue: ri, useDeferredValue: function(l, t) {
    var e = xl();
    return fl === null ? di(e, l, t) : po(e, fl.memoizedState, l, t);
  }, useTransition: function() {
    var l = ii(wt)[0], t = xl().memoizedState;
    return [typeof l == "boolean" ? l : uu(l), t];
  }, useSyncExternalStore: ks, useId: xo, useHostTransitionStatus: yi, useFormState: oo, useActionState: oo, useOptimistic: function(l, t) {
    var e = xl();
    return fl !== null ? to(e, fl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
  }, useMemoCache: ni, useCacheRefresh: Ao };
  Uo.useEffectEvent = yo;
  function gi(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : q({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var bi = { enqueueSetState: function(l, t, e) {
    l = l._reactInternals;
    var a = rt(), u = fe(a);
    u.payload = t, e != null && (u.callback = e), t = se(l, u, a), t !== null && (Pl(t, l, a), lu(t, l, a));
  }, enqueueReplaceState: function(l, t, e) {
    l = l._reactInternals;
    var a = rt(), u = fe(a);
    u.tag = 1, u.payload = t, e != null && (u.callback = e), t = se(l, u, a), t !== null && (Pl(t, l, a), lu(t, l, a));
  }, enqueueForceUpdate: function(l, t) {
    l = l._reactInternals;
    var e = rt(), a = fe(e);
    a.tag = 2, t != null && (a.callback = t), t = se(l, a, e), t !== null && (Pl(t, l, e), lu(t, l, e));
  } };
  function jo(l, t, e, a, u, n, c) {
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
  function Ho(l) {
    $u(l);
  }
  function Ro(l) {
    console.error(l);
  }
  function Bo(l) {
    $u(l);
  }
  function _n(l, t) {
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
      _n(l, t);
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
      qo(t, e, a), typeof u != "function" && (he === null ? he = /* @__PURE__ */ new Set([this]) : he.add(this));
      var i = a.stack;
      this.componentDidCatch(a.value, { componentStack: i !== null ? i : "" });
    });
  }
  function om(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && oa(t, e, u, true), e = it.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return zt === null ? jn() : e.alternate === null && pl === 0 && (pl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === cn ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), wi(l, a, u)), false;
          case 22:
            return e.flags |= 65536, a === cn ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([a]) }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), wi(l, a, u)), false;
        }
        throw Error(o(435, e.tag));
      }
      return wi(l, a, u), jn(), false;
    }
    if (P) return t = it.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== Yc && (l = Error(o(422), { cause: a }), ka(bt(l, e)))) : (a !== Yc && (t = Error(o(423), { cause: a }), ka(bt(t, e))), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = bt(a, e), u = Si(l.stateNode, a, u), kc(l, u), pl !== 4 && (pl = 2)), false;
    var n = Error(o(520), { cause: a });
    if (n = bt(n, e), yu === null ? yu = [n] : yu.push(n), pl !== 4 && (pl = 2), t === null) return true;
    a = bt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = Si(e.stateNode, a, l), kc(e, l), false;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (he === null || !he.has(n)))) return e.flags |= 65536, u &= -u, e.lanes |= u, u = Yo(u), Go(u, l, e, a), kc(e, u), false;
      }
      e = e.return;
    } while (e !== null);
    return false;
  }
  var _i = Error(o(461)), Ml = false;
  function Gl(l, t, e, a) {
    t.child = l === null ? Zs(t, null, e, a) : Ge(t, l.child, e, a);
  }
  function Xo(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var i in a) i !== "ref" && (c[i] = a[i]);
    } else c = a;
    return Re(t), a = ti(l, t, e, c, n, u), i = ei(), l !== null && !Ml ? (ai(l, t, u), Vt(l, t, u)) : (P && i && Bc(t), t.flags |= 1, Gl(l, t, a, u), t.child);
  }
  function Qo(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !Cc(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, Zo(l, t, n, a, u)) : (l = ln(e.type, null, a, t, t.mode, u), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !Mi(l, u)) {
      var c = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Ka, e(c, a) && l.ref === t.ref) return Vt(l, t, u);
    }
    return t.flags |= 1, l = Gt(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Zo(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Ka(n, a) && l.ref === t.ref) if (Ml = false, t.pendingProps = a = n, Mi(l, u)) (l.flags & 131072) !== 0 && (Ml = true);
      else return t.lanes = l.lanes, Vt(l, t, u);
    }
    return pi(l, t, e, a, u);
  }
  function Lo(l, t, e, a) {
    var u = a.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, l !== null) {
          for (a = t.child = l.child, u = 0; a !== null; ) u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, t.child = null;
        return wo(l, t, n, e, a);
      }
      if ((e & 536870912) !== 0) t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && un(t, n !== null ? n.cachePool : null), n !== null ? Vs(t, n) : Fc(), Ks(t);
      else return a = t.lanes = 536870912, wo(l, t, n !== null ? n.baseLanes | e : e, e, a);
    } else n !== null ? (un(t, n.cachePool), Vs(t, n), re(), t.memoizedState = null) : (l !== null && un(t, null), Fc(), re());
    return Gl(l, t, u, e), t.child;
  }
  function iu(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t.sibling;
  }
  function wo(l, t, e, a, u) {
    var n = Vc();
    return n = n === null ? null : { parent: Al._currentValue, pool: n }, t.memoizedState = { baseLanes: e, cachePool: n }, l !== null && un(t, null), Fc(), Ks(t), l !== null && oa(l, t, a, true), t.childLanes = u, null;
  }
  function pn(l, t) {
    return t = Tn({ mode: t.mode, children: t.children }, l.mode), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Vo(l, t, e) {
    return Ge(t, l.child, null, e), l = pn(t, t.pendingProps), l.flags |= 2, ft(t), t.memoizedState = null, l;
  }
  function rm(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (P) {
        if (a.mode === "hidden") return l = pn(t, a), t.lanes = 536870912, iu(null, l);
        if (Pc(t), (l = yl) ? (l = ar(l, pt), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: ae !== null ? { id: Nt, overflow: Dt } : null, retryLane: 536870912, hydrationErrors: null }, e = Os(l), e.return = t, t.child = e, ql = t, yl = null)) : l = null, l === null) throw ne(t);
        return t.lanes = 536870912, null;
      }
      return pn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var c = n.dehydrated;
      if (Pc(t), u) if (t.flags & 256) t.flags &= -257, t = Vo(l, t, e);
      else if (t.memoizedState !== null) t.child = l.child, t.flags |= 128, t = null;
      else throw Error(o(558));
      else if (Ml || oa(l, t, e, false), u = (e & l.childLanes) !== 0, Ml || u) {
        if (a = dl, a !== null && (c = Hf(a, e), c !== 0 && c !== n.retryLane)) throw n.retryLane = c, Ue(l, c), Pl(a, l, c), _i;
        jn(), t = Vo(l, t, e);
      } else l = n.treeContext, yl = Tt(c.nextSibling), ql = t, P = true, ue = null, pt = false, l !== null && Ds(t, l), t = pn(t, a), t.flags |= 4096;
      return t;
    }
    return l = Gt(l.child, { mode: a.mode, children: a.children }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function zn(l, t) {
    var e = t.ref;
    if (e === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object") throw Error(o(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function pi(l, t, e, a, u) {
    return Re(t), e = ti(l, t, e, a, void 0, u), a = ei(), l !== null && !Ml ? (ai(l, t, u), Vt(l, t, u)) : (P && a && Bc(t), t.flags |= 1, Gl(l, t, e, u), t.child);
  }
  function Ko(l, t, e, a, u, n) {
    return Re(t), t.updateQueue = null, e = Ws(t, a, e, u), Js(l), a = ei(), l !== null && !Ml ? (ai(l, t, n), Vt(l, t, n)) : (P && a && Bc(t), t.flags |= 1, Gl(l, t, e, n), t.child);
  }
  function Jo(l, t, e, a, u) {
    if (Re(t), t.stateNode === null) {
      var n = ca, c = e.contextType;
      typeof c == "object" && c !== null && (n = Yl(c)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = bi, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Jc(t), c = e.contextType, n.context = typeof c == "object" && c !== null ? Yl(c) : ca, n.state = t.memoizedState, c = e.getDerivedStateFromProps, typeof c == "function" && (gi(t, e, c, a), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (c = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), c !== n.state && bi.enqueueReplaceState(n, n.state, null), eu(t, a, n, u), tu(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = true;
    } else if (l === null) {
      n = t.stateNode;
      var i = t.memoizedProps, f = Qe(e, i);
      n.props = f;
      var v = n.context, p = e.contextType;
      c = ca, typeof p == "object" && p !== null && (c = Yl(p));
      var x = e.getDerivedStateFromProps;
      p = typeof x == "function" || typeof n.getSnapshotBeforeUpdate == "function", i = t.pendingProps !== i, p || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i || v !== c) && Co(t, n, a, c), ie = false;
      var g = t.memoizedState;
      n.state = g, eu(t, a, n, u), tu(), v = t.memoizedState, i || g !== v || ie ? (typeof x == "function" && (gi(t, e, x, a), v = t.memoizedState), (f = ie || jo(t, e, f, a, g, v, c)) ? (p || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = v), n.props = a, n.state = v, n.context = c, a = f) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = false);
    } else {
      n = t.stateNode, Wc(l, t), c = t.memoizedProps, p = Qe(e, c), n.props = p, x = t.pendingProps, g = n.context, v = e.contextType, f = ca, typeof v == "object" && v !== null && (f = Yl(v)), i = e.getDerivedStateFromProps, (v = typeof i == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c !== x || g !== f) && Co(t, n, a, f), ie = false, g = t.memoizedState, n.state = g, eu(t, a, n, u), tu();
      var _ = t.memoizedState;
      c !== x || g !== _ || ie || l !== null && l.dependencies !== null && en(l.dependencies) ? (typeof i == "function" && (gi(t, e, i, a), _ = t.memoizedState), (p = ie || jo(t, e, p, a, g, _, f) || l !== null && l.dependencies !== null && en(l.dependencies)) ? (v || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, _, f), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(a, _, f)), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && g === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && g === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = _), n.props = a, n.state = _, n.context = f, a = p) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && g === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && g === l.memoizedState || (t.flags |= 1024), a = false);
    }
    return n = a, zn(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = Ge(t, l.child, null, u), t.child = Ge(t, null, e, u)) : Gl(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = Vt(l, t, u), l;
  }
  function Wo(l, t, e, a) {
    return Ce(), t.flags |= 256, Gl(l, t, e, a), t.child;
  }
  var zi = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Ti(l) {
    return { baseLanes: l, cachePool: Bs() };
  }
  function Ei(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= ot), l;
  }
  function ko(l, t, e) {
    var a = t.pendingProps, u = false, n = (t.flags & 128) !== 0, c;
    if ((c = n) || (c = l !== null && l.memoizedState === null ? false : (El.current & 2) !== 0), c && (u = true, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (P) {
        if (u ? oe(t) : re(), (l = yl) ? (l = ar(l, pt), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: ae !== null ? { id: Nt, overflow: Dt } : null, retryLane: 536870912, hydrationErrors: null }, e = Os(l), e.return = t, t.child = e, ql = t, yl = null)) : l = null, l === null) throw ne(t);
        return cf(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var i = a.children;
      return a = a.fallback, u ? (re(), u = t.mode, i = Tn({ mode: "hidden", children: i }, u), a = je(a, u, e, null), i.return = t, a.return = t, i.sibling = a, t.child = i, a = t.child, a.memoizedState = Ti(e), a.childLanes = Ei(l, c, e), t.memoizedState = zi, iu(null, a)) : (oe(t), xi(t, i));
    }
    var f = l.memoizedState;
    if (f !== null && (i = f.dehydrated, i !== null)) {
      if (n) t.flags & 256 ? (oe(t), t.flags &= -257, t = Ai(l, t, e)) : t.memoizedState !== null ? (re(), t.child = l.child, t.flags |= 128, t = null) : (re(), i = a.fallback, u = t.mode, a = Tn({ mode: "visible", children: a.children }, u), i = je(i, u, e, null), i.flags |= 2, a.return = t, i.return = t, a.sibling = i, t.child = a, Ge(t, l.child, null, e), a = t.child, a.memoizedState = Ti(e), a.childLanes = Ei(l, c, e), t.memoizedState = zi, t = iu(null, a));
      else if (oe(t), cf(i)) {
        if (c = i.nextSibling && i.nextSibling.dataset, c) var v = c.dgst;
        c = v, a = Error(o(419)), a.stack = "", a.digest = c, ka({ value: a, source: null, stack: null }), t = Ai(l, t, e);
      } else if (Ml || oa(l, t, e, false), c = (e & l.childLanes) !== 0, Ml || c) {
        if (c = dl, c !== null && (a = Hf(c, e), a !== 0 && a !== f.retryLane)) throw f.retryLane = a, Ue(l, a), Pl(c, l, a), _i;
        nf(i) || jn(), t = Ai(l, t, e);
      } else nf(i) ? (t.flags |= 192, t.child = l.child, t = null) : (l = f.treeContext, yl = Tt(i.nextSibling), ql = t, P = true, ue = null, pt = false, l !== null && Ds(t, l), t = xi(t, a.children), t.flags |= 4096);
      return t;
    }
    return u ? (re(), i = a.fallback, u = t.mode, f = l.child, v = f.sibling, a = Gt(f, { mode: "hidden", children: a.children }), a.subtreeFlags = f.subtreeFlags & 65011712, v !== null ? i = Gt(v, i) : (i = je(i, u, e, null), i.flags |= 2), i.return = t, a.return = t, a.sibling = i, t.child = a, iu(null, a), a = t.child, i = l.child.memoizedState, i === null ? i = Ti(e) : (u = i.cachePool, u !== null ? (f = Al._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = Bs(), i = { baseLanes: i.baseLanes | e, cachePool: u }), a.memoizedState = i, a.childLanes = Ei(l, c, e), t.memoizedState = zi, iu(l.child, a)) : (oe(t), e = l.child, l = e.sibling, e = Gt(e, { mode: "visible", children: a.children }), e.return = t, e.sibling = null, l !== null && (c = t.deletions, c === null ? (t.deletions = [l], t.flags |= 16) : c.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function xi(l, t) {
    return t = Tn({ mode: "visible", children: t }, l.mode), t.return = l, l.child = t;
  }
  function Tn(l, t) {
    return l = ct(22, l, null, t), l.lanes = 0, l;
  }
  function Ai(l, t, e) {
    return Ge(t, l.child, null, e), l = xi(t, t.pendingProps.children), l.flags |= 2, t.memoizedState = null, l;
  }
  function $o(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Qc(l.return, t, e);
  }
  function Oi(l, t, e, a, u, n) {
    var c = l.memoizedState;
    c === null ? l.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: a, tail: e, tailMode: u, treeForkCount: n } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = a, c.tail = e, c.tailMode = u, c.treeForkCount = n);
  }
  function Fo(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var c = El.current, i = (c & 2) !== 0;
    if (i ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, O(El, c), Gl(l, t, a, e), a = P ? Wa : 0, !i && l !== null && (l.flags & 128) !== 0) l: for (l = t.child; l !== null; ) {
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
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), Oi(t, false, u, e, n, a);
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
        Oi(t, true, e, null, n, a);
        break;
      case "together":
        Oi(t, false, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Vt(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), ye |= t.lanes, (e & t.childLanes) === 0) if (l !== null) {
      if (oa(l, t, e, false), (e & t.childLanes) === 0) return null;
    } else return null;
    if (l !== null && t.child !== l.child) throw Error(o(153));
    if (t.child !== null) {
      for (l = t.child, e = Gt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; ) l = l.sibling, e = e.sibling = Gt(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function Mi(l, t) {
    return (l.lanes & t) !== 0 ? true : (l = l.dependencies, !!(l !== null && en(l)));
  }
  function dm(l, t, e) {
    switch (t.tag) {
      case 3:
        Tl(t, t.stateNode.containerInfo), ce(t, Al, l.memoizedState.cache), Ce();
        break;
      case 27:
      case 5:
        Ve(t);
        break;
      case 4:
        Tl(t, t.stateNode.containerInfo);
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
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), O(El, El.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Lo(l, t, e, t.pendingProps);
      case 24:
        ce(t, Al, l.memoizedState.cache);
    }
    return Vt(l, t, e);
  }
  function Io(l, t, e) {
    if (l !== null) if (l.memoizedProps !== t.pendingProps) Ml = true;
    else {
      if (!Mi(l, e) && (t.flags & 128) === 0) return Ml = false, dm(l, t, e);
      Ml = (l.flags & 131072) !== 0;
    }
    else Ml = false, P && (t.flags & 1048576) !== 0 && Ns(t, Wa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = qe(t.elementType), t.type = l, typeof l == "function") Cc(l) ? (a = Qe(l, a), t.tag = 1, t = Jo(null, t, l, a, e)) : (t.tag = 0, t = pi(null, t, l, a, e));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === Kl) {
                t.tag = 11, t = Xo(null, t, l, a, e);
                break l;
              } else if (u === J) {
                t.tag = 14, t = Qo(null, t, l, a, e);
                break l;
              }
            }
            throw t = yt(l) || l, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return pi(l, t, t.type, t.pendingProps, e);
      case 1:
        return a = t.type, u = Qe(a, t.pendingProps), Jo(l, t, a, u, e);
      case 3:
        l: {
          if (Tl(t, t.stateNode.containerInfo), l === null) throw Error(o(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, Wc(l, t), eu(t, a, null, e);
          var c = t.memoizedState;
          if (a = c.cache, ce(t, Al, a), a !== n.cache && Zc(t, [Al], e, true), tu(), a = c.element, n.isDehydrated) if (n = { element: a, isDehydrated: false, cache: c.cache }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
            t = Wo(l, t, a, e);
            break l;
          } else if (a !== u) {
            u = bt(Error(o(424)), t), ka(u), t = Wo(l, t, a, e);
            break l;
          } else {
            switch (l = t.stateNode.containerInfo, l.nodeType) {
              case 9:
                l = l.body;
                break;
              default:
                l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
            }
            for (yl = Tt(l.firstChild), ql = t, P = true, ue = null, pt = true, e = Zs(t, null, a, e), t.child = e; e; ) e.flags = e.flags & -3 | 4096, e = e.sibling;
          }
          else {
            if (Ce(), a === u) {
              t = Vt(l, t, e);
              break l;
            }
            Gl(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return zn(l, t), l === null ? (e = sr(t.type, null, t.pendingProps, null)) ? t.memoizedState = e : P || (e = t.type, l = t.pendingProps, a = Gn(Z.current).createElement(e), a[Bl] = t, a[Jl] = l, Xl(a, e, l), Cl(a), t.stateNode = a) : t.memoizedState = sr(t.type, l.memoizedProps, t.pendingProps, l.memoizedState), null;
      case 27:
        return Ve(t), l === null && P && (a = t.stateNode = cr(t.type, t.pendingProps, Z.current), ql = t, pt = true, u = yl, Se(t.type) ? (ff = u, yl = Tt(a.firstChild)) : yl = u), Gl(l, t, t.pendingProps.children, e), zn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && P && ((u = a = yl) && (a = Zm(a, t.type, t.pendingProps, pt), a !== null ? (t.stateNode = a, ql = t, yl = Tt(a.firstChild), pt = false, u = true) : u = false), u || ne(t)), Ve(t), u = t.type, n = t.pendingProps, c = l !== null ? l.memoizedProps : null, a = n.children, ef(u, n) ? a = null : c !== null && ef(u, c) && (t.flags |= 32), t.memoizedState !== null && (u = ti(l, t, am, null, null, e), zu._currentValue = u), zn(l, t), Gl(l, t, a, e), t.child;
      case 6:
        return l === null && P && ((l = e = yl) && (e = Lm(e, t.pendingProps, pt), e !== null ? (t.stateNode = e, ql = t, yl = null, l = true) : l = false), l || ne(t)), null;
      case 13:
        return ko(l, t, e);
      case 4:
        return Tl(t, t.stateNode.containerInfo), a = t.pendingProps, l === null ? t.child = Ge(t, null, a, e) : Gl(l, t, a, e), t.child;
      case 11:
        return Xo(l, t, t.type, t.pendingProps, e);
      case 7:
        return Gl(l, t, t.pendingProps, e), t.child;
      case 8:
        return Gl(l, t, t.pendingProps.children, e), t.child;
      case 12:
        return Gl(l, t, t.pendingProps.children, e), t.child;
      case 10:
        return a = t.pendingProps, ce(t, t.type, a.value), Gl(l, t, a.children, e), t.child;
      case 9:
        return u = t.type._context, a = t.pendingProps.children, Re(t), u = Yl(u), a = a(u), t.flags |= 1, Gl(l, t, a, e), t.child;
      case 14:
        return Qo(l, t, t.type, t.pendingProps, e);
      case 15:
        return Zo(l, t, t.type, t.pendingProps, e);
      case 19:
        return Fo(l, t, e);
      case 31:
        return rm(l, t, e);
      case 22:
        return Lo(l, t, e, t.pendingProps);
      case 24:
        return Re(t), a = Yl(Al), l === null ? (u = Vc(), u === null && (u = dl, n = Lc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, Jc(t), ce(t, Al, u)) : ((l.lanes & e) !== 0 && (Wc(l, t), eu(t, null, null, e), tu()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ce(t, Al, a)) : (a = n.cache, ce(t, Al, a), a !== u.cache && Zc(t, [Al], e, true))), Gl(l, t, t.pendingProps.children, e), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Kt(l) {
    l.flags |= 4;
  }
  function Ni(l, t, e, a, u) {
    if ((t = (l.mode & 32) !== 0) && (t = false), t) {
      if (l.flags |= 16777216, (u & 335544128) === u) if (l.stateNode.complete) l.flags |= 8192;
      else if (x0()) l.flags |= 8192;
      else throw Ye = cn, Kc;
    } else l.flags &= -16777217;
  }
  function Po(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) l.flags &= -16777217;
    else if (l.flags |= 16777216, !yr(t)) if (x0()) l.flags |= 8192;
    else throw Ye = cn, Kc;
  }
  function En(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Uf() : 536870912, l.lanes |= t, za |= t);
  }
  function fu(l, t) {
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
  function hl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t) for (var u = l.child; u !== null; ) e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = l, u = u.sibling;
    else for (u = l.child; u !== null; ) e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function mm(l, t, e) {
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
        return hl(t), null;
      case 1:
        return hl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Zt(Al), gl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (sa(t) ? Kt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Gc())), hl(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (Kt(t), n !== null ? (hl(t), Po(t, n)) : (hl(t), Ni(t, u, null, a, e))) : n ? n !== l.memoizedState ? (Kt(t), hl(t), Po(t, n)) : (hl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && Kt(t), hl(t), Ni(t, u, l, a, e)), null;
      case 27:
        if (xe(t), e = Z.current, u = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Kt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return hl(t), null;
          }
          l = D.current, sa(t) ? Us(t) : (l = cr(u, a, e), t.stateNode = l, Kt(t));
        }
        return hl(t), null;
      case 5:
        if (xe(t), u = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Kt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return hl(t), null;
          }
          if (n = D.current, sa(t)) Us(t);
          else {
            var c = Gn(Z.current);
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
            n[Bl] = t, n[Jl] = a;
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
            a && Kt(t);
          }
        }
        return hl(t), Ni(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, e), null;
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Kt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(o(166));
          if (l = Z.current, sa(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = ql, u !== null) switch (u.tag) {
              case 27:
              case 5:
                a = u.memoizedProps;
            }
            l[Bl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === true || k0(l.nodeValue, e)), l || ne(t, true);
          } else l = Gn(l).createTextNode(a), l[Bl] = t, t.stateNode = l;
        }
        return hl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = sa(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(o(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(557));
              l[Bl] = t;
            } else Ce(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            hl(t), l = false;
          } else e = Gc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = true;
          if (!l) return t.flags & 256 ? (ft(t), t) : (ft(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return hl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = sa(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(o(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[Bl] = t;
            } else Ce(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            hl(t), u = false;
          } else u = Gc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = true;
          if (!u) return t.flags & 256 ? (ft(t), t) : (ft(t), null);
        }
        return ft(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), En(t, t.updateQueue), hl(t), null);
      case 4:
        return gl(), l === null && Fi(t.stateNode.containerInfo), hl(t), null;
      case 10:
        return Zt(t.type), hl(t), null;
      case 19:
        if (A(El), a = t.memoizedState, a === null) return hl(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null) if (u) fu(a, false);
        else {
          if (pl !== 0 || l !== null && (l.flags & 128) !== 0) for (l = t.child; l !== null; ) {
            if (n = rn(l), n !== null) {
              for (t.flags |= 128, fu(a, false), l = n.updateQueue, t.updateQueue = l, En(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; ) As(e, l), e = e.sibling;
              return O(El, El.current & 1 | 2), P && Xt(t, a.treeForkCount), t.child;
            }
            l = l.sibling;
          }
          a.tail !== null && et() > Nn && (t.flags |= 128, u = true, fu(a, false), t.lanes = 4194304);
        }
        else {
          if (!u) if (l = rn(n), l !== null) {
            if (t.flags |= 128, u = true, l = l.updateQueue, t.updateQueue = l, En(t, l), fu(a, true), a.tail === null && a.tailMode === "hidden" && !n.alternate && !P) return hl(t), null;
          } else 2 * et() - a.renderingStartTime > Nn && e !== 536870912 && (t.flags |= 128, u = true, fu(a, false), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = et(), l.sibling = null, e = El.current, O(El, u ? e & 1 | 2 : e & 1), P && Xt(t, a.treeForkCount), l) : (hl(t), null);
      case 22:
      case 23:
        return ft(t), Ic(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (hl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : hl(t), e = t.updateQueue, e !== null && En(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && A(Be), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), Zt(Al), hl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function ym(l, t) {
    switch (qc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Zt(Al), gl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return xe(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (ft(t), t.alternate === null) throw Error(o(340));
          Ce();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (ft(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null) throw Error(o(340));
          Ce();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return A(El), null;
      case 4:
        return gl(), null;
      case 10:
        return Zt(t.type), null;
      case 22:
      case 23:
        return ft(t), Ic(), l !== null && A(Be), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Zt(Al), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function l0(l, t) {
    switch (qc(t), t.tag) {
      case 3:
        Zt(Al), gl();
        break;
      case 26:
      case 27:
      case 5:
        xe(t);
        break;
      case 4:
        gl();
        break;
      case 31:
        t.memoizedState !== null && ft(t);
        break;
      case 13:
        ft(t);
        break;
      case 19:
        A(El);
        break;
      case 10:
        Zt(t.type);
        break;
      case 22:
      case 23:
        ft(t), Ic(), l !== null && A(Be);
        break;
      case 24:
        Zt(Al);
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
      il(t, t.return, i);
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
              var f = e, v = i;
              try {
                v();
              } catch (p) {
                il(u, f, p);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (p) {
      il(t, t.return, p);
    }
  }
  function t0(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        ws(t, e);
      } catch (a) {
        il(l, l.return, a);
      }
    }
  }
  function e0(l, t, e) {
    e.props = Qe(l.type, l.memoizedProps), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      il(l, t, a);
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
      il(l, t, u);
    }
  }
  function Ut(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null) if (typeof a == "function") try {
      a();
    } catch (u) {
      il(l, t, u);
    } finally {
      l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
    }
    else if (typeof e == "function") try {
      e(null);
    } catch (u) {
      il(l, t, u);
    }
    else e.current = null;
  }
  function a0(l) {
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
      il(l, l.return, u);
    }
  }
  function Di(l, t, e) {
    try {
      var a = l.stateNode;
      Bm(a, l.type, e, t), a[Jl] = t;
    } catch (u) {
      il(l, l.return, u);
    }
  }
  function u0(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Se(l.type) || l.tag === 4;
  }
  function Ui(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || u0(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Se(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function ji(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = qt));
    else if (a !== 4 && (a === 27 && Se(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null)) for (ji(l, t, e), l = l.sibling; l !== null; ) ji(l, t, e), l = l.sibling;
  }
  function xn(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && Se(l.type) && (e = l.stateNode), l = l.child, l !== null)) for (xn(l, t, e), l = l.sibling; l !== null; ) xn(l, t, e), l = l.sibling;
  }
  function n0(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; ) t.removeAttributeNode(u[0]);
      Xl(t, a, e), t[Bl] = l, t[Jl] = e;
    } catch (n) {
      il(l, l.return, n);
    }
  }
  var Jt = false, Nl = false, Ci = false, c0 = typeof WeakSet == "function" ? WeakSet : Set, Hl = null;
  function hm(l, t) {
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
          var c = 0, i = -1, f = -1, v = 0, p = 0, x = l, g = null;
          t: for (; ; ) {
            for (var _; x !== e || u !== 0 && x.nodeType !== 3 || (i = c + u), x !== n || a !== 0 && x.nodeType !== 3 || (f = c + a), x.nodeType === 3 && (c += x.nodeValue.length), (_ = x.firstChild) !== null; ) g = x, x = _;
            for (; ; ) {
              if (x === l) break t;
              if (g === e && ++v === u && (i = c), g === n && ++p === a && (f = c), (_ = x.nextSibling) !== null) break;
              x = g, g = x.parentNode;
            }
            x = _;
          }
          e = i === -1 || f === -1 ? null : { start: i, end: f };
        } else e = null;
      }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (tf = { focusedElem: l, selectionRange: e }, Kn = false, Hl = t; Hl !== null; ) if (t = Hl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null) l.return = t, Hl = l;
    else for (; Hl !== null; ) {
      switch (t = Hl, n = t.alternate, l = t.flags, t.tag) {
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
              var C = Qe(e.type, u);
              l = a.getSnapshotBeforeUpdate(C, n), a.__reactInternalSnapshotBeforeUpdate = l;
            } catch (X) {
              il(e, e.return, X);
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
          if ((l & 1024) !== 0) throw Error(o(163));
      }
      if (l = t.sibling, l !== null) {
        l.return = t.return, Hl = l;
        break;
      }
      Hl = t.return;
    }
  }
  function i0(l, t, e) {
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
          il(e, e.return, c);
        }
        else {
          var u = Qe(e.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
          } catch (c) {
            il(e, e.return, c);
          }
        }
        a & 64 && t0(e), a & 512 && ou(e, e.return);
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
            ws(l, t);
          } catch (c) {
            il(e, e.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && n0(e);
      case 26:
      case 5:
        kt(l, e), t === null && a & 4 && a0(e), a & 512 && ou(e, e.return);
        break;
      case 12:
        kt(l, e);
        break;
      case 31:
        kt(l, e), a & 4 && o0(l, e);
        break;
      case 13:
        kt(l, e), a & 4 && r0(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = Em.bind(null, e), wm(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Jt, !a) {
          t = t !== null && t.memoizedState !== null || Nl, u = Jt;
          var n = Nl;
          Jt = a, (Nl = t) && !n ? $t(l, e, (e.subtreeFlags & 8772) !== 0) : kt(l, e), Jt = u, Nl = n;
        }
        break;
      case 30:
        break;
      default:
        kt(l, e);
    }
  }
  function f0(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, f0(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && sc(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var bl = null, kl = false;
  function Wt(l, t, e) {
    for (e = e.child; e !== null; ) s0(l, t, e), e = e.sibling;
  }
  function s0(l, t, e) {
    if (at && typeof at.onCommitFiberUnmount == "function") try {
      at.onCommitFiberUnmount(Ha, e);
    } catch {
    }
    switch (e.tag) {
      case 26:
        Nl || Ut(e, t), Wt(l, t, e), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Nl || Ut(e, t);
        var a = bl, u = kl;
        Se(e.type) && (bl = e.stateNode, kl = false), Wt(l, t, e), Su(e.stateNode), bl = a, kl = u;
        break;
      case 5:
        Nl || Ut(e, t);
      case 6:
        if (a = bl, u = kl, bl = null, Wt(l, t, e), bl = a, kl = u, bl !== null) if (kl) try {
          (bl.nodeType === 9 ? bl.body : bl.nodeName === "HTML" ? bl.ownerDocument.body : bl).removeChild(e.stateNode);
        } catch (n) {
          il(e, t, n);
        }
        else try {
          bl.removeChild(e.stateNode);
        } catch (n) {
          il(e, t, n);
        }
        break;
      case 18:
        bl !== null && (kl ? (l = bl, tr(l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.stateNode), Da(l)) : tr(bl, e.stateNode));
        break;
      case 4:
        a = bl, u = kl, bl = e.stateNode.containerInfo, kl = true, Wt(l, t, e), bl = a, kl = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        de(2, e, t), Nl || de(4, e, t), Wt(l, t, e);
        break;
      case 1:
        Nl || (Ut(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && e0(e, t, a)), Wt(l, t, e);
        break;
      case 21:
        Wt(l, t, e);
        break;
      case 22:
        Nl = (a = Nl) || e.memoizedState !== null, Wt(l, t, e), Nl = a;
        break;
      default:
        Wt(l, t, e);
    }
  }
  function o0(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Da(l);
      } catch (e) {
        il(t, t.return, e);
      }
    }
  }
  function r0(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null)))) try {
      Da(l);
    } catch (e) {
      il(t, t.return, e);
    }
  }
  function vm(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new c0()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new c0()), t;
      default:
        throw Error(o(435, l.tag));
    }
  }
  function An(l, t) {
    var e = vm(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = xm.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function $l(l, t) {
    var e = t.deletions;
    if (e !== null) for (var a = 0; a < e.length; a++) {
      var u = e[a], n = l, c = t, i = c;
      l: for (; i !== null; ) {
        switch (i.tag) {
          case 27:
            if (Se(i.type)) {
              bl = i.stateNode, kl = false;
              break l;
            }
            break;
          case 5:
            bl = i.stateNode, kl = false;
            break l;
          case 3:
          case 4:
            bl = i.stateNode.containerInfo, kl = true;
            break l;
        }
        i = i.return;
      }
      if (bl === null) throw Error(o(160));
      s0(n, c, u), bl = null, kl = false, n = u.alternate, n !== null && (n.return = null), u.return = null;
    }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) d0(t, l), t = t.sibling;
  }
  var At = null;
  function d0(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        $l(t, l), Fl(l), a & 4 && (de(3, l, l.return), su(3, l), de(5, l, l.return));
        break;
      case 1:
        $l(t, l), Fl(l), a & 512 && (Nl || e === null || Ut(e, e.return)), a & 64 && Jt && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = At;
        if ($l(t, l), Fl(l), a & 512 && (Nl || e === null || Ut(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null) if (a === null) if (l.stateNode === null) {
            l: {
              a = l.type, e = l.memoizedProps, u = u.ownerDocument || u;
              t: switch (a) {
                case "title":
                  n = u.getElementsByTagName("title")[0], (!n || n[qa] || n[Bl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(n, u.querySelector("head > title"))), Xl(n, a, e), n[Bl] = l, Cl(n), a = n;
                  break l;
                case "link":
                  var c = dr("link", "href", u).get(a + (e.href || ""));
                  if (c) {
                    for (var i = 0; i < c.length; i++) if (n = c[i], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                      c.splice(i, 1);
                      break t;
                    }
                  }
                  n = u.createElement(a), Xl(n, a, e), u.head.appendChild(n);
                  break;
                case "meta":
                  if (c = dr("meta", "content", u).get(a + (e.content || ""))) {
                    for (i = 0; i < c.length; i++) if (n = c[i], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                      c.splice(i, 1);
                      break t;
                    }
                  }
                  n = u.createElement(a), Xl(n, a, e), u.head.appendChild(n);
                  break;
                default:
                  throw Error(o(468, a));
              }
              n[Bl] = l, Cl(n), a = n;
            }
            l.stateNode = a;
          } else mr(u, l.type, l.stateNode);
          else l.stateNode = rr(u, a, l.memoizedProps);
          else n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? mr(u, l.type, l.stateNode) : rr(u, a, l.memoizedProps)) : a === null && l.stateNode !== null && Di(l, l.memoizedProps, e.memoizedProps);
        }
        break;
      case 27:
        $l(t, l), Fl(l), a & 512 && (Nl || e === null || Ut(e, e.return)), e !== null && a & 4 && Di(l, l.memoizedProps, e.memoizedProps);
        break;
      case 5:
        if ($l(t, l), Fl(l), a & 512 && (Nl || e === null || Ut(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            Pe(u, "");
          } catch (C) {
            il(l, l.return, C);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, Di(l, u, e !== null ? e.memoizedProps : u)), a & 1024 && (Ci = true);
        break;
      case 6:
        if ($l(t, l), Fl(l), a & 4) {
          if (l.stateNode === null) throw Error(o(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (C) {
            il(l, l.return, C);
          }
        }
        break;
      case 3:
        if (Zn = null, u = At, At = Xn(t.containerInfo), $l(t, l), At = u, Fl(l), a & 4 && e !== null && e.memoizedState.isDehydrated) try {
          Da(t.containerInfo);
        } catch (C) {
          il(l, l.return, C);
        }
        Ci && (Ci = false, m0(l));
        break;
      case 4:
        a = At, At = Xn(l.stateNode.containerInfo), $l(t, l), Fl(l), At = a;
        break;
      case 12:
        $l(t, l), Fl(l);
        break;
      case 31:
        $l(t, l), Fl(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, An(l, a)));
        break;
      case 13:
        $l(t, l), Fl(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Mn = et()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, An(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = e !== null && e.memoizedState !== null, v = Jt, p = Nl;
        if (Jt = v || u, Nl = p || f, $l(t, l), Nl = p, Jt = v, Fl(l), a & 8192) l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || f || Jt || Nl || Ze(l)), e = null, t = l; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (e === null) {
              f = e = t;
              try {
                if (n = f.stateNode, u) c = n.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                else {
                  i = f.stateNode;
                  var x = f.memoizedProps.style, g = x != null && x.hasOwnProperty("display") ? x.display : null;
                  i.style.display = g == null || typeof g == "boolean" ? "" : ("" + g).trim();
                }
              } catch (C) {
                il(f, f.return, C);
              }
            }
          } else if (t.tag === 6) {
            if (e === null) {
              f = t;
              try {
                f.stateNode.nodeValue = u ? "" : f.memoizedProps;
              } catch (C) {
                il(f, f.return, C);
              }
            }
          } else if (t.tag === 18) {
            if (e === null) {
              f = t;
              try {
                var _ = f.stateNode;
                u ? er(_, true) : er(f.stateNode, false);
              } catch (C) {
                il(f, f.return, C);
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
        $l(t, l), Fl(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, An(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        $l(t, l), Fl(l);
    }
  }
  function Fl(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (u0(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = Ui(l);
            xn(l, n, u);
            break;
          case 5:
            var c = e.stateNode;
            e.flags & 32 && (Pe(c, ""), e.flags &= -33);
            var i = Ui(l);
            xn(l, i, c);
            break;
          case 3:
          case 4:
            var f = e.stateNode.containerInfo, v = Ui(l);
            ji(l, v, f);
            break;
          default:
            throw Error(o(161));
        }
      } catch (p) {
        il(l, l.return, p);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function m0(l) {
    if (l.subtreeFlags & 1024) for (l = l.child; l !== null; ) {
      var t = l;
      m0(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
  }
  function kt(l, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) i0(l, t.alternate, t), t = t.sibling;
  }
  function Ze(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          de(4, t, t.return), Ze(t);
          break;
        case 1:
          Ut(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && e0(t, t.return, e), Ze(t);
          break;
        case 27:
          Su(t.stateNode);
        case 26:
        case 5:
          Ut(t, t.return), Ze(t);
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
            il(a, a.return, v);
          }
          if (a = n, u = a.updateQueue, u !== null) {
            var i = a.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null) for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++) Ls(f[u], i);
            } catch (v) {
              il(a, a.return, v);
            }
          }
          e && c & 64 && t0(n), ou(n, n.return);
          break;
        case 27:
          n0(n);
        case 26:
        case 5:
          $t(u, n, e), e && a === null && c & 4 && a0(n), ou(n, n.return);
          break;
        case 12:
          $t(u, n, e);
          break;
        case 31:
          $t(u, n, e), e && c & 4 && o0(u, n);
          break;
        case 13:
          $t(u, n, e), e && c & 4 && r0(u, n);
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
  function Hi(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && $a(e));
  }
  function Ri(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && $a(l));
  }
  function Ot(l, t, e, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) y0(l, t, e, a), t = t.sibling;
  }
  function y0(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ot(l, t, e, a), u & 2048 && su(9, t);
        break;
      case 1:
        Ot(l, t, e, a);
        break;
      case 3:
        Ot(l, t, e, a), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && $a(l)));
        break;
      case 12:
        if (u & 2048) {
          Ot(l, t, e, a), l = t.stateNode;
          try {
            var n = t.memoizedProps, c = n.id, i = n.onPostCommit;
            typeof i == "function" && i(c, t.alternate === null ? "mount" : "update", l.passiveEffectDuration, -0);
          } catch (f) {
            il(t, t.return, f);
          }
        } else Ot(l, t, e, a);
        break;
      case 31:
        Ot(l, t, e, a);
        break;
      case 13:
        Ot(l, t, e, a);
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, c = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Ot(l, t, e, a) : ru(l, t) : n._visibility & 2 ? Ot(l, t, e, a) : (n._visibility |= 2, Sa(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || false)), u & 2048 && Hi(c, t);
        break;
      case 24:
        Ot(l, t, e, a), u & 2048 && Ri(t.alternate, t);
        break;
      default:
        Ot(l, t, e, a);
    }
  }
  function Sa(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
      var n = l, c = t, i = e, f = a, v = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Sa(n, c, i, f, u), su(8, c);
          break;
        case 23:
          break;
        case 22:
          var p = c.stateNode;
          c.memoizedState !== null ? p._visibility & 2 ? Sa(n, c, i, f, u) : ru(n, c) : (p._visibility |= 2, Sa(n, c, i, f, u)), u && v & 2048 && Hi(c.alternate, c);
          break;
        case 24:
          Sa(n, c, i, f, u), u && v & 2048 && Ri(c.alternate, c);
          break;
        default:
          Sa(n, c, i, f, u);
      }
      t = t.sibling;
    }
  }
  function ru(l, t) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
      var e = l, a = t, u = a.flags;
      switch (a.tag) {
        case 22:
          ru(e, a), u & 2048 && Hi(a.alternate, a);
          break;
        case 24:
          ru(e, a), u & 2048 && Ri(a.alternate, a);
          break;
        default:
          ru(e, a);
      }
      t = t.sibling;
    }
  }
  var du = 8192;
  function _a(l, t, e) {
    if (l.subtreeFlags & du) for (l = l.child; l !== null; ) h0(l, t, e), l = l.sibling;
  }
  function h0(l, t, e) {
    switch (l.tag) {
      case 26:
        _a(l, t, e), l.flags & du && l.memoizedState !== null && ey(e, At, l.memoizedState, l.memoizedProps);
        break;
      case 5:
        _a(l, t, e);
        break;
      case 3:
      case 4:
        var a = At;
        At = Xn(l.stateNode.containerInfo), _a(l, t, e), At = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = du, du = 16777216, _a(l, t, e), du = a) : _a(l, t, e));
        break;
      default:
        _a(l, t, e);
    }
  }
  function v0(l) {
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
        Hl = a, b0(a, l);
      }
      v0(l);
    }
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) g0(l), l = l.sibling;
  }
  function g0(l) {
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
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, On(l)) : mu(l);
        break;
      default:
        mu(l);
    }
  }
  function On(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) for (var e = 0; e < t.length; e++) {
        var a = t[e];
        Hl = a, b0(a, l);
      }
      v0(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          de(8, t, t.return), On(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, On(t));
          break;
        default:
          On(t);
      }
      l = l.sibling;
    }
  }
  function b0(l, t) {
    for (; Hl !== null; ) {
      var e = Hl;
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
      if (a = e.child, a !== null) a.return = e, Hl = a;
      else l: for (e = l; Hl !== null; ) {
        a = Hl;
        var u = a.sibling, n = a.return;
        if (f0(a), a === e) {
          Hl = null;
          break l;
        }
        if (u !== null) {
          u.return = n, Hl = u;
          break l;
        }
        Hl = n;
      }
    }
  }
  var gm = { getCacheForType: function(l) {
    var t = Yl(Al), e = t.data.get(l);
    return e === void 0 && (e = l(), t.data.set(l, e)), e;
  }, cacheSignal: function() {
    return Yl(Al).controller.signal;
  } }, bm = typeof WeakMap == "function" ? WeakMap : Map, al = 0, dl = null, k = null, F = 0, cl = 0, st = null, me = false, pa = false, Bi = false, Ft = 0, pl = 0, ye = 0, Le = 0, qi = 0, ot = 0, za = 0, yu = null, Il = null, Yi = false, Mn = 0, S0 = 0, Nn = 1 / 0, Dn = null, he = null, Ul = 0, ve = null, Ta = null, It = 0, Gi = 0, Xi = null, _0 = null, hu = 0, Qi = null;
  function rt() {
    return (al & 2) !== 0 && F !== 0 ? F & -F : z.T !== null ? Ji() : Rf();
  }
  function p0() {
    if (ot === 0) if ((F & 536870912) === 0 || P) {
      var l = qu;
      qu <<= 1, (qu & 3932160) === 0 && (qu = 262144), ot = l;
    } else ot = 536870912;
    return l = it.current, l !== null && (l.flags |= 32), ot;
  }
  function Pl(l, t, e) {
    (l === dl && (cl === 2 || cl === 9) || l.cancelPendingCommit !== null) && (Ea(l, 0), ge(l, F, ot, false)), Ba(l, e), ((al & 2) === 0 || l !== dl) && (l === dl && ((al & 2) === 0 && (Le |= e), pl === 4 && ge(l, F, ot, false)), jt(l));
  }
  function z0(l, t, e) {
    if ((al & 6) !== 0) throw Error(o(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Ra(l, t), u = a ? pm(l, t) : Li(l, t, true), n = a;
    do {
      if (u === 0) {
        pa && !a && ge(l, t, 0, false);
        break;
      } else {
        if (e = l.current.alternate, n && !Sm(e)) {
          u = Li(l, t, false), n = false;
          continue;
        }
        if (u === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n) var c = 0;
          else c = l.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            t = c;
            l: {
              var i = l;
              u = yu;
              var f = i.current.memoizedState.isDehydrated;
              if (f && (Ea(i, c).flags |= 256), c = Li(i, c, false), c !== 2) {
                if (Bi && !f) {
                  i.errorRecoveryDisabledLanes |= n, Le |= n, u = 4;
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
              ge(a, t, ot, !me);
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
          if ((t & 62914560) === t && (u = Mn + 300 - et(), 10 < u)) {
            if (ge(a, t, ot, !me), Gu(a, 0, true) !== 0) break l;
            It = t, a.timeoutHandle = P0(T0.bind(null, a, e, Il, Dn, Yi, t, ot, Le, za, me, n, "Throttled", -0, 0), u);
            break l;
          }
          T0(a, e, Il, Dn, Yi, t, ot, Le, za, me, n, null, -0, 0);
        }
      }
      break;
    } while (true);
    jt(l);
  }
  function T0(l, t, e, a, u, n, c, i, f, v, p, x, g, _) {
    if (l.timeoutHandle = -1, x = t.subtreeFlags, x & 8192 || (x & 16785408) === 16785408) {
      x = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: qt }, h0(t, n, x);
      var C = (n & 62914560) === n ? Mn - et() : (n & 4194048) === n ? S0 - et() : 0;
      if (C = ay(x, C), C !== null) {
        It = n, l.cancelPendingCommit = C(U0.bind(null, l, t, n, e, a, u, c, i, f, p, x, null, g, _)), ge(l, n, c, !v);
        return;
      }
    }
    U0(l, t, n, e, a, u, c, i, f);
  }
  function Sm(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null))) for (var a = 0; a < e.length; a++) {
        var u = e[a], n = u.getSnapshot;
        u = u.value;
        try {
          if (!nt(n(), u)) return false;
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
    t &= ~qi, t &= ~Le, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - ut(u), c = 1 << n;
      a[n] = -1, u &= ~c;
    }
    e !== 0 && jf(l, e, t);
  }
  function Un() {
    return (al & 6) === 0 ? (vu(0), false) : true;
  }
  function Zi() {
    if (k !== null) {
      if (cl === 0) var l = k.return;
      else l = k, Qt = He = null, ui(l), ya = null, Ia = 0, l = k;
      for (; l !== null; ) l0(l.alternate, l), l = l.return;
      k = null;
    }
  }
  function Ea(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, Gm(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), It = 0, Zi(), dl = l, k = e = Gt(l.current, null), F = t, cl = 0, st = null, me = false, pa = Ra(l, t), Bi = false, za = ot = qi = Le = ye = pl = 0, Il = yu = null, Yi = false, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0) for (l = l.entanglements, a &= t; 0 < a; ) {
      var u = 31 - ut(a), n = 1 << u;
      t |= l[u], a &= ~n;
    }
    return Ft = t, Fu(), e;
  }
  function E0(l, t) {
    V = null, z.H = cu, t === ma || t === nn ? (t = Gs(), cl = 3) : t === Kc ? (t = Gs(), cl = 4) : cl = t === _i ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, st = t, k === null && (pl = 1, _n(l, bt(t, l.current)));
  }
  function x0() {
    var l = it.current;
    return l === null ? true : (F & 4194048) === F ? zt === null : (F & 62914560) === F || (F & 536870912) !== 0 ? l === zt : false;
  }
  function A0() {
    var l = z.H;
    return z.H = cu, l === null ? cu : l;
  }
  function O0() {
    var l = z.A;
    return z.A = gm, l;
  }
  function jn() {
    pl = 4, me || (F & 4194048) !== F && it.current !== null || (pa = true), (ye & 134217727) === 0 && (Le & 134217727) === 0 || dl === null || ge(dl, F, ot, false);
  }
  function Li(l, t, e) {
    var a = al;
    al |= 2;
    var u = A0(), n = O0();
    (dl !== l || F !== t) && (Dn = null, Ea(l, t)), t = false;
    var c = pl;
    l: do
      try {
        if (cl !== 0 && k !== null) {
          var i = k, f = st;
          switch (cl) {
            case 8:
              Zi(), c = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              it.current === null && (t = true);
              var v = cl;
              if (cl = 0, st = null, xa(l, i, f, v), e && pa) {
                c = 0;
                break l;
              }
              break;
            default:
              v = cl, cl = 0, st = null, xa(l, i, f, v);
          }
        }
        _m(), c = pl;
        break;
      } catch (p) {
        E0(l, p);
      }
    while (true);
    return t && l.shellSuspendCounter++, Qt = He = null, al = a, z.H = u, z.A = n, k === null && (dl = null, F = 0, Fu()), c;
  }
  function _m() {
    for (; k !== null; ) M0(k);
  }
  function pm(l, t) {
    var e = al;
    al |= 2;
    var a = A0(), u = O0();
    dl !== l || F !== t ? (Dn = null, Nn = et() + 500, Ea(l, t)) : pa = Ra(l, t);
    l: do
      try {
        if (cl !== 0 && k !== null) {
          t = k;
          var n = st;
          t: switch (cl) {
            case 1:
              cl = 0, st = null, xa(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (qs(n)) {
                cl = 0, st = null, N0(t);
                break;
              }
              t = function() {
                cl !== 2 && cl !== 9 || dl !== l || (cl = 7), jt(l);
              }, n.then(t, t);
              break l;
            case 3:
              cl = 7;
              break l;
            case 4:
              cl = 5;
              break l;
            case 7:
              qs(n) ? (cl = 0, st = null, N0(t)) : (cl = 0, st = null, xa(l, t, n, 7));
              break;
            case 5:
              var c = null;
              switch (k.tag) {
                case 26:
                  c = k.memoizedState;
                case 5:
                case 27:
                  var i = k;
                  if (c ? yr(c) : i.stateNode.complete) {
                    cl = 0, st = null;
                    var f = i.sibling;
                    if (f !== null) k = f;
                    else {
                      var v = i.return;
                      v !== null ? (k = v, Cn(v)) : k = null;
                    }
                    break t;
                  }
              }
              cl = 0, st = null, xa(l, t, n, 5);
              break;
            case 6:
              cl = 0, st = null, xa(l, t, n, 6);
              break;
            case 8:
              Zi(), pl = 6;
              break l;
            default:
              throw Error(o(462));
          }
        }
        zm();
        break;
      } catch (p) {
        E0(l, p);
      }
    while (true);
    return Qt = He = null, z.H = a, z.A = u, al = e, k !== null ? 0 : (dl = null, F = 0, Fu(), pl);
  }
  function zm() {
    for (; k !== null && !Vr(); ) M0(k);
  }
  function M0(l) {
    var t = Io(l.alternate, l, Ft);
    l.memoizedProps = l.pendingProps, t === null ? Cn(l) : k = t;
  }
  function N0(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ko(e, t, t.pendingProps, t.type, void 0, F);
        break;
      case 11:
        t = Ko(e, t, t.pendingProps, t.type.render, t.ref, F);
        break;
      case 5:
        ui(t);
      default:
        l0(e, t), t = k = As(t, Ft), t = Io(e, t, Ft);
    }
    l.memoizedProps = l.pendingProps, t === null ? Cn(l) : k = t;
  }
  function xa(l, t, e, a) {
    Qt = He = null, ui(t), ya = null, Ia = 0;
    var u = t.return;
    try {
      if (om(l, u, t, e, F)) {
        pl = 1, _n(l, bt(e, l.current)), k = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw k = u, n;
      pl = 1, _n(l, bt(e, l.current)), k = null;
      return;
    }
    t.flags & 32768 ? (P || a === 1 ? l = true : pa || (F & 536870912) !== 0 ? l = false : (me = l = true, (a === 2 || a === 9 || a === 3 || a === 6) && (a = it.current, a !== null && a.tag === 13 && (a.flags |= 16384))), D0(t, l)) : Cn(t);
  }
  function Cn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        D0(t, me);
        return;
      }
      l = t.return;
      var e = mm(t.alternate, t, Ft);
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
    pl === 0 && (pl = 5);
  }
  function D0(l, t) {
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
    pl = 6, k = null;
  }
  function U0(l, t, e, a, u, n, c, i, f) {
    l.cancelPendingCommit = null;
    do
      Hn();
    while (Ul !== 0);
    if ((al & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === l.current) throw Error(o(177));
      if (n = t.lanes | t.childLanes, n |= Uc, td(l, e, n, c, i, f), l === dl && (k = dl = null, F = 0), Ta = t, ve = l, It = e, Gi = n, Xi = u, _0 = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Am(Ru, function() {
        return B0(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = z.T, z.T = null, u = U.p, U.p = 2, c = al, al |= 4;
        try {
          hm(l, t, e);
        } finally {
          al = c, U.p = u, z.T = a;
        }
      }
      Ul = 1, j0(), C0(), H0();
    }
  }
  function j0() {
    if (Ul === 1) {
      Ul = 0;
      var l = ve, t = Ta, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = z.T, z.T = null;
        var a = U.p;
        U.p = 2;
        var u = al;
        al |= 4;
        try {
          d0(t, l);
          var n = tf, c = gs(l.containerInfo), i = n.focusedElem, f = n.selectionRange;
          if (c !== i && i && i.ownerDocument && vs(i.ownerDocument.documentElement, i)) {
            if (f !== null && Ac(i)) {
              var v = f.start, p = f.end;
              if (p === void 0 && (p = v), "selectionStart" in i) i.selectionStart = v, i.selectionEnd = Math.min(p, i.value.length);
              else {
                var x = i.ownerDocument || document, g = x && x.defaultView || window;
                if (g.getSelection) {
                  var _ = g.getSelection(), C = i.textContent.length, X = Math.min(f.start, C), ol = f.end === void 0 ? X : Math.min(f.end, C);
                  !_.extend && X > ol && (c = ol, ol = X, X = c);
                  var m = hs(i, X), r = hs(i, ol);
                  if (m && r && (_.rangeCount !== 1 || _.anchorNode !== m.node || _.anchorOffset !== m.offset || _.focusNode !== r.node || _.focusOffset !== r.offset)) {
                    var h = x.createRange();
                    h.setStart(m.node, m.offset), _.removeAllRanges(), X > ol ? (_.addRange(h), _.extend(r.node, r.offset)) : (h.setEnd(r.node, r.offset), _.addRange(h));
                  }
                }
              }
            }
            for (x = [], _ = i; _ = _.parentNode; ) _.nodeType === 1 && x.push({ element: _, left: _.scrollLeft, top: _.scrollTop });
            for (typeof i.focus == "function" && i.focus(), i = 0; i < x.length; i++) {
              var E = x[i];
              E.element.scrollLeft = E.left, E.element.scrollTop = E.top;
            }
          }
          Kn = !!lf, tf = lf = null;
        } finally {
          al = u, U.p = a, z.T = e;
        }
      }
      l.current = t, Ul = 2;
    }
  }
  function C0() {
    if (Ul === 2) {
      Ul = 0;
      var l = ve, t = Ta, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = z.T, z.T = null;
        var a = U.p;
        U.p = 2;
        var u = al;
        al |= 4;
        try {
          i0(l, t.alternate, t);
        } finally {
          al = u, U.p = a, z.T = e;
        }
      }
      Ul = 3;
    }
  }
  function H0() {
    if (Ul === 4 || Ul === 3) {
      Ul = 0, Kr();
      var l = ve, t = Ta, e = It, a = _0;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Ul = 5 : (Ul = 0, Ta = ve = null, R0(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (he = null), ic(e), t = t.stateNode, at && typeof at.onCommitFiberRoot == "function") try {
        at.onCommitFiberRoot(Ha, t, void 0, (t.current.flags & 128) === 128);
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
      (It & 3) !== 0 && Hn(), jt(l), u = l.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? l === Qi ? hu++ : (hu = 0, Qi = l) : hu = 0, vu(0);
    }
  }
  function R0(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, $a(t)));
  }
  function Hn() {
    return j0(), C0(), H0(), B0();
  }
  function B0() {
    if (Ul !== 5) return false;
    var l = ve, t = Gi;
    Gi = 0;
    var e = ic(It), a = z.T, u = U.p;
    try {
      U.p = 32 > e ? 32 : e, z.T = null, e = Xi, Xi = null;
      var n = ve, c = It;
      if (Ul = 0, Ta = ve = null, It = 0, (al & 6) !== 0) throw Error(o(331));
      var i = al;
      if (al |= 4, g0(n.current), y0(n, n.current, c, e), al = i, vu(0, false), at && typeof at.onPostCommitFiberRoot == "function") try {
        at.onPostCommitFiberRoot(Ha, n);
      } catch {
      }
      return true;
    } finally {
      U.p = u, z.T = a, R0(l, t);
    }
  }
  function q0(l, t, e) {
    t = bt(e, t), t = Si(l.stateNode, t, 2), l = se(l, t, 2), l !== null && (Ba(l, 2), jt(l));
  }
  function il(l, t, e) {
    if (l.tag === 3) q0(l, l, e);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        q0(t, l, e);
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (he === null || !he.has(a))) {
          l = bt(e, l), e = Yo(2), a = se(t, e, 2), a !== null && (Go(e, a, t, l), Ba(a, 2), jt(a));
          break;
        }
      }
      t = t.return;
    }
  }
  function wi(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new bm();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (Bi = true, u.add(e), l = Tm.bind(null, l, t, e), t.then(l, l));
  }
  function Tm(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, dl === l && (F & e) === e && (pl === 4 || pl === 3 && (F & 62914560) === F && 300 > et() - Mn ? (al & 2) === 0 && Ea(l, 0) : qi |= e, za === F && (za = 0)), jt(l);
  }
  function Y0(l, t) {
    t === 0 && (t = Uf()), l = Ue(l, t), l !== null && (Ba(l, t), jt(l));
  }
  function Em(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Y0(l, e);
  }
  function xm(l, t) {
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
    a !== null && a.delete(t), Y0(l, e);
  }
  function Am(l, t) {
    return ac(l, t);
  }
  var Rn = null, Aa = null, Vi = false, Bn = false, Ki = false, be = 0;
  function jt(l) {
    l !== Aa && l.next === null && (Aa === null ? Rn = Aa = l : Aa = Aa.next = l), Bn = true, Vi || (Vi = true, Mm());
  }
  function vu(l, t) {
    if (!Ki && Bn) {
      Ki = true;
      do
        for (var e = false, a = Rn; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var c = a.suspendedLanes, i = a.pingedLanes;
              n = (1 << 31 - ut(42 | l) + 1) - 1, n &= u & ~(c & ~i), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = true, Z0(a, n));
          } else n = F, n = Gu(a, a === dl ? n : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (n & 3) === 0 || Ra(a, n) || (e = true, Z0(a, n));
          a = a.next;
        }
      while (e);
      Ki = false;
    }
  }
  function Om() {
    G0();
  }
  function G0() {
    Bn = Vi = false;
    var l = 0;
    be !== 0 && Ym() && (l = be);
    for (var t = et(), e = null, a = Rn; a !== null; ) {
      var u = a.next, n = X0(a, t);
      n === 0 ? (a.next = null, e === null ? Rn = u : e.next = u, u === null && (Aa = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (Bn = true)), a = u;
    }
    Ul !== 0 && Ul !== 5 || vu(l), be !== 0 && (be = 0);
  }
  function X0(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var c = 31 - ut(n), i = 1 << c, f = u[c];
      f === -1 ? ((i & e) === 0 || (i & a) !== 0) && (u[c] = ld(i, t)) : f <= t && (l.expiredLanes |= i), n &= ~i;
    }
    if (t = dl, e = F, e = Gu(l, l === t ? e : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a = l.callbackNode, e === 0 || l === t && (cl === 2 || cl === 9) || l.cancelPendingCommit !== null) return a !== null && a !== null && uc(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || Ra(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && uc(a), ic(e)) {
        case 2:
        case 8:
          e = Nf;
          break;
        case 32:
          e = Ru;
          break;
        case 268435456:
          e = Df;
          break;
        default:
          e = Ru;
      }
      return a = Q0.bind(null, l), e = ac(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && uc(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Q0(l, t) {
    if (Ul !== 0 && Ul !== 5) return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (Hn() && l.callbackNode !== e) return null;
    var a = F;
    return a = Gu(l, l === dl ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a === 0 ? null : (z0(l, a, t), X0(l, et()), l.callbackNode != null && l.callbackNode === e ? Q0.bind(null, l) : null);
  }
  function Z0(l, t) {
    if (Hn()) return null;
    z0(l, t, true);
  }
  function Mm() {
    Xm(function() {
      (al & 6) !== 0 ? ac(Mf, Om) : G0();
    });
  }
  function Ji() {
    if (be === 0) {
      var l = ra;
      l === 0 && (l = Bu, Bu <<= 1, (Bu & 261888) === 0 && (Bu = 256)), be = l;
    }
    return be;
  }
  function L0(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Lu("" + l);
  }
  function w0(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Nm(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = L0((u[Jl] || null).action), c = a.submitter;
      c && (t = (t = c[Jl] || null) ? L0(t.formAction) : c.getAttribute("formAction"), t !== null && (n = t, c = null));
      var i = new Ju("action", "action", null, a, u);
      l.push({ event: i, listeners: [{ instance: null, listener: function() {
        if (a.defaultPrevented) {
          if (be !== 0) {
            var f = c ? w0(u, c) : new FormData(u);
            mi(e, { pending: true, data: f, method: u.method, action: n }, null, f);
          }
        } else typeof n == "function" && (i.preventDefault(), f = c ? w0(u, c) : new FormData(u), mi(e, { pending: true, data: f, method: u.method, action: n }, n, f));
      }, currentTarget: u }] });
    }
  }
  for (var Wi = 0; Wi < Dc.length; Wi++) {
    var ki = Dc[Wi], Dm = ki.toLowerCase(), Um = ki[0].toUpperCase() + ki.slice(1);
    xt(Dm, "on" + Um);
  }
  xt(_s, "onAnimationEnd"), xt(ps, "onAnimationIteration"), xt(zs, "onAnimationStart"), xt("dblclick", "onDoubleClick"), xt("focusin", "onFocus"), xt("focusout", "onBlur"), xt(Jd, "onTransitionRun"), xt(Wd, "onTransitionStart"), xt(kd, "onTransitionCancel"), xt(Ts, "onTransitionEnd"), Fe("onMouseEnter", ["mouseout", "mouseover"]), Fe("onMouseLeave", ["mouseout", "mouseover"]), Fe("onPointerEnter", ["pointerout", "pointerover"]), Fe("onPointerLeave", ["pointerout", "pointerover"]), Oe("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Oe("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Oe("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Oe("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Oe("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Oe("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var gu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), jm = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gu));
  function V0(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t) for (var c = a.length - 1; 0 <= c; c--) {
          var i = a[c], f = i.instance, v = i.currentTarget;
          if (i = i.listener, f !== n && u.isPropagationStopped()) break l;
          n = i, u.currentTarget = v;
          try {
            n(u);
          } catch (p) {
            $u(p);
          }
          u.currentTarget = null, n = f;
        }
        else for (c = 0; c < a.length; c++) {
          if (i = a[c], f = i.instance, v = i.currentTarget, i = i.listener, f !== n && u.isPropagationStopped()) break l;
          n = i, u.currentTarget = v;
          try {
            n(u);
          } catch (p) {
            $u(p);
          }
          u.currentTarget = null, n = f;
        }
      }
    }
  }
  function $(l, t) {
    var e = t[fc];
    e === void 0 && (e = t[fc] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (K0(t, l, 2, false), e.add(a));
  }
  function $i(l, t, e) {
    var a = 0;
    t && (a |= 4), K0(e, l, a, t);
  }
  var qn = "_reactListening" + Math.random().toString(36).slice(2);
  function Fi(l) {
    if (!l[qn]) {
      l[qn] = true, Yf.forEach(function(e) {
        e !== "selectionchange" && (jm.has(e) || $i(e, false, l), $i(e, true, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[qn] || (t[qn] = true, $i("selectionchange", false, t));
    }
  }
  function K0(l, t, e, a) {
    switch (pr(t)) {
      case 2:
        var u = cy;
        break;
      case 8:
        u = iy;
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
          var f = c.tag;
          if ((f === 3 || f === 4) && c.stateNode.containerInfo === u) return;
          c = c.return;
        }
        for (; i !== null; ) {
          if (c = We(i), c === null) return;
          if (f = c.tag, f === 5 || f === 6 || f === 26 || f === 27) {
            a = n = c;
            continue l;
          }
          i = i.parentNode;
        }
      }
      a = a.return;
    }
    $f(function() {
      var v = n, p = hc(e), x = [];
      l: {
        var g = Es.get(l);
        if (g !== void 0) {
          var _ = Ju, C = l;
          switch (l) {
            case "keypress":
              if (Vu(e) === 0) break l;
            case "keydown":
            case "keyup":
              _ = xd;
              break;
            case "focusin":
              C = "focus", _ = pc;
              break;
            case "focusout":
              C = "blur", _ = pc;
              break;
            case "beforeblur":
            case "afterblur":
              _ = pc;
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
              _ = md;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              _ = Md;
              break;
            case _s:
            case ps:
            case zs:
              _ = vd;
              break;
            case Ts:
              _ = Dd;
              break;
            case "scroll":
            case "scrollend":
              _ = rd;
              break;
            case "wheel":
              _ = jd;
              break;
            case "copy":
            case "cut":
            case "paste":
              _ = bd;
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
          var X = (t & 4) !== 0, ol = !X && (l === "scroll" || l === "scrollend"), m = X ? g !== null ? g + "Capture" : null : g;
          X = [];
          for (var r = v, h; r !== null; ) {
            var E = r;
            if (h = E.stateNode, E = E.tag, E !== 5 && E !== 26 && E !== 27 || h === null || m === null || (E = Ga(r, m), E != null && X.push(bu(r, E, h))), ol) break;
            r = r.return;
          }
          0 < X.length && (g = new _(g, C, null, e, p), x.push({ event: g, listeners: X }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (g = l === "mouseover" || l === "pointerover", _ = l === "mouseout" || l === "pointerout", g && e !== yc && (C = e.relatedTarget || e.fromElement) && (We(C) || C[Je])) break l;
          if ((_ || g) && (g = p.window === p ? p : (g = p.ownerDocument) ? g.defaultView || g.parentWindow : window, _ ? (C = e.relatedTarget || e.toElement, _ = v, C = C ? We(C) : null, C !== null && (ol = j(C), X = C.tag, C !== ol || X !== 5 && X !== 27 && X !== 6) && (C = null)) : (_ = null, C = v), _ !== C)) {
            if (X = Pf, E = "onMouseLeave", m = "onMouseEnter", r = "mouse", (l === "pointerout" || l === "pointerover") && (X = ts, E = "onPointerLeave", m = "onPointerEnter", r = "pointer"), ol = _ == null ? g : Ya(_), h = C == null ? g : Ya(C), g = new X(E, r + "leave", _, e, p), g.target = ol, g.relatedTarget = h, E = null, We(p) === v && (X = new X(m, r + "enter", C, e, p), X.target = h, X.relatedTarget = ol, E = X), ol = E, _ && C) t: {
              for (X = Cm, m = _, r = C, h = 0, E = m; E; E = X(E)) h++;
              E = 0;
              for (var B = r; B; B = X(B)) E++;
              for (; 0 < h - E; ) m = X(m), h--;
              for (; 0 < E - h; ) r = X(r), E--;
              for (; h--; ) {
                if (m === r || r !== null && m === r.alternate) {
                  X = m;
                  break t;
                }
                m = X(m), r = X(r);
              }
              X = null;
            }
            else X = null;
            _ !== null && J0(x, g, _, X, false), C !== null && ol !== null && J0(x, ol, C, X, true);
          }
        }
        l: {
          if (g = v ? Ya(v) : window, _ = g.nodeName && g.nodeName.toLowerCase(), _ === "select" || _ === "input" && g.type === "file") var ll = ss;
          else if (is(g)) if (os) ll = wd;
          else {
            ll = Zd;
            var H = Qd;
          }
          else _ = g.nodeName, !_ || _.toLowerCase() !== "input" || g.type !== "checkbox" && g.type !== "radio" ? v && mc(v.elementType) && (ll = ss) : ll = Ld;
          if (ll && (ll = ll(l, v))) {
            fs(x, ll, e, p);
            break l;
          }
          H && H(l, g, v), l === "focusout" && v && g.type === "number" && v.memoizedProps.value != null && dc(g, "number", g.value);
        }
        switch (H = v ? Ya(v) : window, l) {
          case "focusin":
            (is(H) || H.contentEditable === "true") && (aa = H, Oc = v, Ja = null);
            break;
          case "focusout":
            Ja = Oc = aa = null;
            break;
          case "mousedown":
            Mc = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Mc = false, bs(x, e, p);
            break;
          case "selectionchange":
            if (Kd) break;
          case "keydown":
          case "keyup":
            bs(x, e, p);
        }
        var K;
        if (Tc) l: {
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
        else ea ? ns(l, e) && (I = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (I = "onCompositionStart");
        I && (es && e.locale !== "ko" && (ea || I !== "onCompositionStart" ? I === "onCompositionEnd" && ea && (K = Ff()) : (ee = p, bc = "value" in ee ? ee.value : ee.textContent, ea = true)), H = Yn(v, I), 0 < H.length && (I = new ls(I, l, null, e, p), x.push({ event: I, listeners: H }), K ? I.data = K : (K = cs(e), K !== null && (I.data = K)))), (K = Bd ? qd(l, e) : Yd(l, e)) && (I = Yn(v, "onBeforeInput"), 0 < I.length && (H = new ls("onBeforeInput", "beforeinput", null, e, p), x.push({ event: H, listeners: I }), H.data = K)), Nm(x, l, v, e, p);
      }
      V0(x, t);
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
  function Cm(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function J0(l, t, e, a, u) {
    for (var n = t._reactName, c = []; e !== null && e !== a; ) {
      var i = e, f = i.alternate, v = i.stateNode;
      if (i = i.tag, f !== null && f === a) break;
      i !== 5 && i !== 26 && i !== 27 || v === null || (f = v, u ? (v = Ga(e, n), v != null && c.unshift(bu(e, v, f))) : u || (v = Ga(e, n), v != null && c.push(bu(e, v, f)))), e = e.return;
    }
    c.length !== 0 && l.push({ event: t, listeners: c });
  }
  var Hm = /\r\n?/g, Rm = /\u0000|\uFFFD/g;
  function W0(l) {
    return (typeof l == "string" ? l : "" + l).replace(Hm, `
`).replace(Rm, "");
  }
  function k0(l, t) {
    return t = W0(t), W0(l) === t;
  }
  function sl(l, t, e, a, u, n) {
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
        a = Lu("" + a), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(e, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof n == "function" && (e === "formAction" ? (t !== "input" && sl(l, t, "name", u.name, u, null), sl(l, t, "formEncType", u.formEncType, u, null), sl(l, t, "formMethod", u.formMethod, u, null), sl(l, t, "formTarget", u.formTarget, u, null)) : (sl(l, t, "encType", u.encType, u, null), sl(l, t, "method", u.method, u, null), sl(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = Lu("" + a), l.setAttribute(e, a);
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
        e = Lu("" + a), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e);
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
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = sd.get(e) || e, Xu(l, e, a));
    }
  }
  function Pi(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Wf(l, a, n);
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
          if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[Jl] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
            typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
            break l;
          }
          e in l ? l[e] = a : a === true ? l.setAttribute(e, "") : Xu(l, e, a);
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
              sl(l, t, n, c, e, null);
          }
        }
        u && sl(l, t, "srcSet", e.srcSet, e, null), a && sl(l, t, "src", e.src, e, null);
        return;
      case "input":
        $("invalid", l);
        var i = n = c = u = null, f = null, v = null;
        for (a in e) if (e.hasOwnProperty(a)) {
          var p = e[a];
          if (p != null) switch (a) {
            case "name":
              u = p;
              break;
            case "type":
              c = p;
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
              i = p;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (p != null) throw Error(o(137, t));
              break;
            default:
              sl(l, t, a, p, e, null);
          }
        }
        wf(l, n, i, f, v, c, u, false);
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
            sl(l, t, u, i, e, null);
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
            if (i != null) throw Error(o(91));
            break;
          default:
            sl(l, t, c, i, e, null);
        }
        Kf(l, a, u, n);
        return;
      case "option":
        for (f in e) if (e.hasOwnProperty(f) && (a = e[f], a != null)) switch (f) {
          case "selected":
            l.selected = a && typeof a != "function" && typeof a != "symbol";
            break;
          default:
            sl(l, t, f, a, e, null);
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
            throw Error(o(137, t));
          default:
            sl(l, t, v, a, e, null);
        }
        return;
      default:
        if (mc(t)) {
          for (p in e) e.hasOwnProperty(p) && (a = e[p], a !== void 0 && Pi(l, t, p, a, e, void 0));
          return;
        }
    }
    for (i in e) e.hasOwnProperty(i) && (a = e[i], a != null && sl(l, t, i, a, e, null));
  }
  function Bm(l, t, e, a) {
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
        var u = null, n = null, c = null, i = null, f = null, v = null, p = null;
        for (_ in e) {
          var x = e[_];
          if (e.hasOwnProperty(_) && x != null) switch (_) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              f = x;
            default:
              a.hasOwnProperty(_) || sl(l, t, _, null, a, x);
          }
        }
        for (var g in a) {
          var _ = a[g];
          if (x = e[g], a.hasOwnProperty(g) && (_ != null || x != null)) switch (g) {
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
              p = _;
              break;
            case "value":
              c = _;
              break;
            case "defaultValue":
              i = _;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (_ != null) throw Error(o(137, t));
              break;
            default:
              _ !== x && sl(l, t, g, _, a, x);
          }
        }
        rc(l, c, i, f, v, p, n, u);
        return;
      case "select":
        _ = c = i = g = null;
        for (n in e) if (f = e[n], e.hasOwnProperty(n) && f != null) switch (n) {
          case "value":
            break;
          case "multiple":
            _ = f;
          default:
            a.hasOwnProperty(n) || sl(l, t, n, null, a, f);
        }
        for (u in a) if (n = a[u], f = e[u], a.hasOwnProperty(u) && (n != null || f != null)) switch (u) {
          case "value":
            g = n;
            break;
          case "defaultValue":
            i = n;
            break;
          case "multiple":
            c = n;
          default:
            n !== f && sl(l, t, u, n, a, f);
        }
        t = i, e = c, a = _, g != null ? Ie(l, !!e, g, false) : !!a != !!e && (t != null ? Ie(l, !!e, t, true) : Ie(l, !!e, e ? [] : "", false));
        return;
      case "textarea":
        _ = g = null;
        for (i in e) if (u = e[i], e.hasOwnProperty(i) && u != null && !a.hasOwnProperty(i)) switch (i) {
          case "value":
            break;
          case "children":
            break;
          default:
            sl(l, t, i, null, a, u);
        }
        for (c in a) if (u = a[c], n = e[c], a.hasOwnProperty(c) && (u != null || n != null)) switch (c) {
          case "value":
            g = u;
            break;
          case "defaultValue":
            _ = u;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (u != null) throw Error(o(91));
            break;
          default:
            u !== n && sl(l, t, c, u, a, n);
        }
        Vf(l, g, _);
        return;
      case "option":
        for (var C in e) if (g = e[C], e.hasOwnProperty(C) && g != null && !a.hasOwnProperty(C)) switch (C) {
          case "selected":
            l.selected = false;
            break;
          default:
            sl(l, t, C, null, a, g);
        }
        for (f in a) if (g = a[f], _ = e[f], a.hasOwnProperty(f) && g !== _ && (g != null || _ != null)) switch (f) {
          case "selected":
            l.selected = g && typeof g != "function" && typeof g != "symbol";
            break;
          default:
            sl(l, t, f, g, a, _);
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
        for (var X in e) g = e[X], e.hasOwnProperty(X) && g != null && !a.hasOwnProperty(X) && sl(l, t, X, null, a, g);
        for (v in a) if (g = a[v], _ = e[v], a.hasOwnProperty(v) && g !== _ && (g != null || _ != null)) switch (v) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (g != null) throw Error(o(137, t));
            break;
          default:
            sl(l, t, v, g, a, _);
        }
        return;
      default:
        if (mc(t)) {
          for (var ol in e) g = e[ol], e.hasOwnProperty(ol) && g !== void 0 && !a.hasOwnProperty(ol) && Pi(l, t, ol, void 0, a, g);
          for (p in a) g = a[p], _ = e[p], !a.hasOwnProperty(p) || g === _ || g === void 0 && _ === void 0 || Pi(l, t, p, g, a, _);
          return;
        }
    }
    for (var m in e) g = e[m], e.hasOwnProperty(m) && g != null && !a.hasOwnProperty(m) && sl(l, t, m, null, a, g);
    for (x in a) g = a[x], _ = e[x], !a.hasOwnProperty(x) || g === _ || g == null && _ == null || sl(l, t, x, g, a, _);
  }
  function $0(l) {
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
        var u = e[a], n = u.transferSize, c = u.initiatorType, i = u.duration;
        if (n && i && $0(c)) {
          for (c = 0, i = u.responseEnd, a += 1; a < e.length; a++) {
            var f = e[a], v = f.startTime;
            if (v > i) break;
            var p = f.transferSize, x = f.initiatorType;
            p && $0(x) && (f = f.responseEnd, c += p * (f < i ? 1 : (i - v) / (f - v)));
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
  function F0(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function I0(l, t) {
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
  function Ym() {
    var l = window.event;
    return l && l.type === "popstate" ? l === af ? false : (af = l, true) : (af = null, false);
  }
  var P0 = typeof setTimeout == "function" ? setTimeout : void 0, Gm = typeof clearTimeout == "function" ? clearTimeout : void 0, lr = typeof Promise == "function" ? Promise : void 0, Xm = typeof queueMicrotask == "function" ? queueMicrotask : typeof lr < "u" ? function(l) {
    return lr.resolve(null).then(l).catch(Qm);
  } : P0;
  function Qm(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Se(l) {
    return l === "head";
  }
  function tr(l, t) {
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
  function er(l, t) {
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
      if (l = Tt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Lm(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Tt(l.nextSibling), l === null)) return null;
    return l;
  }
  function ar(l, t) {
    for (; l.nodeType !== 8; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Tt(l.nextSibling), l === null)) return null;
    return l;
  }
  function nf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function cf(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function wm(l, t) {
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
  function Tt(l) {
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
  function ur(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0) return Tt(l.nextSibling);
          t--;
        } else e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function nr(l) {
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
  function cr(l, t, e) {
    switch (t = Gn(e), l) {
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
  function Su(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    sc(l);
  }
  var Et = /* @__PURE__ */ new Map(), ir = /* @__PURE__ */ new Set();
  function Xn(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Pt = U.d;
  U.d = { f: Vm, r: Km, D: Jm, C: Wm, L: km, m: $m, X: Im, S: Fm, M: Pm };
  function Vm() {
    var l = Pt.f(), t = Un();
    return l || t;
  }
  function Km(l) {
    var t = ke(l);
    t !== null && t.tag === 5 && t.type === "form" ? Eo(t) : Pt.r(l);
  }
  var Oa = typeof document > "u" ? null : document;
  function fr(l, t, e) {
    var a = Oa;
    if (a && typeof t == "string" && t) {
      var u = vt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), ir.has(u) || (ir.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), Xl(t, "link", l), Cl(t), a.head.appendChild(t)));
    }
  }
  function Jm(l) {
    Pt.D(l), fr("dns-prefetch", l, null);
  }
  function Wm(l, t) {
    Pt.C(l, t), fr("preconnect", l, t);
  }
  function km(l, t, e) {
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
          n = Na(l);
      }
      Et.has(n) || (l = q({ rel: "preload", href: t === "image" && e && e.imageSrcSet ? void 0 : l, as: t }, e), Et.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(_u(n)) || t === "script" && a.querySelector(pu(n)) || (t = a.createElement("link"), Xl(t, "link", l), Cl(t), a.head.appendChild(t)));
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
          n = Na(l);
      }
      if (!Et.has(n) && (l = q({ rel: "modulepreload", href: l }, t), Et.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(pu(n))) return;
        }
        a = e.createElement("link"), Xl(a, "link", l), Cl(a), e.head.appendChild(a);
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
        var i = { loading: 0, preload: null };
        if (c = a.querySelector(_u(n))) i.loading = 5;
        else {
          l = q({ rel: "stylesheet", href: l, "data-precedence": t }, e), (e = Et.get(n)) && sf(l, e);
          var f = c = a.createElement("link");
          Cl(f), Xl(f, "link", l), f._p = new Promise(function(v, p) {
            f.onload = v, f.onerror = p;
          }), f.addEventListener("load", function() {
            i.loading |= 1;
          }), f.addEventListener("error", function() {
            i.loading |= 2;
          }), i.loading |= 4, Qn(c, t, a);
        }
        c = { type: "stylesheet", instance: c, count: 1, state: i }, u.set(n, c);
      }
    }
  }
  function Im(l, t) {
    Pt.X(l, t);
    var e = Oa;
    if (e && l) {
      var a = $e(e).hoistableScripts, u = Na(l), n = a.get(u);
      n || (n = e.querySelector(pu(u)), n || (l = q({ src: l, async: true }, t), (t = Et.get(u)) && of(l, t), n = e.createElement("script"), Cl(n), Xl(n, "link", l), e.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, a.set(u, n));
    }
  }
  function Pm(l, t) {
    Pt.M(l, t);
    var e = Oa;
    if (e && l) {
      var a = $e(e).hoistableScripts, u = Na(l), n = a.get(u);
      n || (n = e.querySelector(pu(u)), n || (l = q({ src: l, async: true, type: "module" }, t), (t = Et.get(u)) && of(l, t), n = e.createElement("script"), Cl(n), Xl(n, "link", l), e.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, a.set(u, n));
    }
  }
  function sr(l, t, e, a) {
    var u = (u = Z.current) ? Xn(u) : null;
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
          if (c || (u = u.ownerDocument || u, c = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, n.set(l, c), (n = u.querySelector(_u(l))) && !n._p && (c.instance = n, c.state.loading = 5), Et.has(l) || (e = { rel: "preload", as: "style", href: e.href, crossOrigin: e.crossOrigin, integrity: e.integrity, media: e.media, hrefLang: e.hrefLang, referrerPolicy: e.referrerPolicy }, Et.set(l, e), n || ly(u, l, e, c.state))), t && a === null) throw Error(o(528, ""));
          return c;
        }
        if (t && a !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Na(e), e = $e(u).hoistableScripts, a = e.get(t), a || (a = { type: "script", instance: null, count: 0, state: null }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, l));
    }
  }
  function Ma(l) {
    return 'href="' + vt(l) + '"';
  }
  function _u(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function or(l) {
    return q({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function ly(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Xl(t, "link", e), Cl(t), l.head.appendChild(t));
  }
  function Na(l) {
    return '[src="' + vt(l) + '"]';
  }
  function pu(l) {
    return "script[async]" + l;
  }
  function rr(l, t, e) {
    if (t.count++, t.instance === null) switch (t.type) {
      case "style":
        var a = l.querySelector('style[data-href~="' + vt(e.href) + '"]');
        if (a) return t.instance = a, Cl(a), a;
        var u = q({}, e, { "data-href": e.href, "data-precedence": e.precedence, href: null, precedence: null });
        return a = (l.ownerDocument || l).createElement("style"), Cl(a), Xl(a, "style", u), Qn(a, e.precedence, l), t.instance = a;
      case "stylesheet":
        u = Ma(e.href);
        var n = l.querySelector(_u(u));
        if (n) return t.state.loading |= 4, t.instance = n, Cl(n), n;
        a = or(e), (u = Et.get(u)) && sf(a, u), n = (l.ownerDocument || l).createElement("link"), Cl(n);
        var c = n;
        return c._p = new Promise(function(i, f) {
          c.onload = i, c.onerror = f;
        }), Xl(n, "link", a), t.state.loading |= 4, Qn(n, e.precedence, l), t.instance = n;
      case "script":
        return n = Na(e.src), (u = l.querySelector(pu(n))) ? (t.instance = u, Cl(u), u) : (a = e, (u = Et.get(n)) && (a = q({}, e), of(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Cl(u), Xl(u, "link", a), l.head.appendChild(u), t.instance = u);
      case "void":
        return null;
      default:
        throw Error(o(443, t.type));
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
  var Zn = null;
  function dr(l, t, e) {
    if (Zn === null) {
      var a = /* @__PURE__ */ new Map(), u = Zn = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else u = Zn, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[qa] || n[Bl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = n.getAttribute(t) || "";
        c = l + c;
        var i = a.get(c);
        i ? i.push(n) : a.set(c, [n]);
      }
    }
    return a;
  }
  function mr(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(e, t === "title" ? l.querySelector("head > title") : null);
  }
  function ty(l, t, e) {
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
  function yr(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function ey(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== false) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Ma(a.href), n = t.querySelector(_u(u));
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Ln.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, Cl(n);
          return;
        }
        n = t.ownerDocument || t, a = or(a), (u = Et.get(u)) && sf(a, u), n = n.createElement("link"), Cl(n);
        var c = n;
        c._p = new Promise(function(i, f) {
          c.onload = i, c.onerror = f;
        }), Xl(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = Ln.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var rf = 0;
  function ay(l, t) {
    return l.stylesheets && l.count === 0 && Vn(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && Vn(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && rf === 0 && (rf = 62500 * qm());
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
  function Ln() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Vn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var wn = null;
  function Vn(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, wn = /* @__PURE__ */ new Map(), t.forEach(uy, l), wn = null, Ln.call(l));
  }
  function uy(l, t) {
    if (!(t.state.loading & 4)) {
      var e = wn.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), wn.set(l, e);
        for (var u = l.querySelectorAll("link[data-precedence],style[data-precedence]"), n = 0; n < u.length; n++) {
          var c = u[n];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (e.set(c.dataset.precedence, c), a = c);
        }
        a && e.set(null, a);
      }
      u = t.instance, c = u.getAttribute("data-precedence"), n = e.get(c) || a, n === a && e.set(null, u), e.set(c, u), this.count++, a = Ln.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var zu = { $$typeof: zl, Provider: null, Consumer: null, _currentValue: Y, _currentValue2: Y, _threadCount: 0 };
  function ny(l, t, e, a, u, n, c, i, f) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = nc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = nc(0), this.hiddenUpdates = nc(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function hr(l, t, e, a, u, n, c, i, f, v, p, x) {
    return l = new ny(l, t, e, c, f, v, p, x, i), t = 1, n === true && (t |= 24), n = ct(3, null, null, t), l.current = n, n.stateNode = l, t = Lc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = { element: a, isDehydrated: e, cache: t }, Jc(n), l;
  }
  function vr(l) {
    return l ? (l = ca, l) : ca;
  }
  function gr(l, t, e, a, u, n) {
    u = vr(u), a.context === null ? a.context = u : a.pendingContext = u, a = fe(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = se(l, a, t), e !== null && (Pl(e, l, t), lu(e, l, t));
  }
  function br(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function df(l, t) {
    br(l, t), (l = l.alternate) && br(l, t);
  }
  function Sr(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Ue(l, 67108864);
      t !== null && Pl(t, l, 67108864), df(l, 67108864);
    }
  }
  function _r(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = rt();
      t = cc(t);
      var e = Ue(l, t);
      e !== null && Pl(e, l, t), df(l, t);
    }
  }
  var Kn = true;
  function cy(l, t, e, a) {
    var u = z.T;
    z.T = null;
    var n = U.p;
    try {
      U.p = 2, mf(l, t, e, a);
    } finally {
      U.p = n, z.T = u;
    }
  }
  function iy(l, t, e, a) {
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
      var u = yf(a);
      if (u === null) Ii(l, t, a, Jn, e), zr(l, a);
      else if (sy(u, l, t, e, a)) a.stopPropagation();
      else if (zr(l, a), t & 4 && -1 < fy.indexOf(l)) {
        for (; u !== null; ) {
          var n = ke(u);
          if (n !== null) switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var c = Ae(n.pendingLanes);
                if (c !== 0) {
                  var i = n;
                  for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                    var f = 1 << 31 - ut(c);
                    i.entanglements[1] |= f, c &= ~f;
                  }
                  jt(n), (al & 6) === 0 && (Nn = et() + 500, vu(0));
                }
              }
              break;
            case 31:
            case 13:
              i = Ue(n, 2), i !== null && Pl(i, n, 2), Un(), df(n, 2);
          }
          if (n = yf(a), n === null && Ii(l, t, a, Jn, e), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else Ii(l, t, a, null, e);
    }
  }
  function yf(l) {
    return l = hc(l), hf(l);
  }
  var Jn = null;
  function hf(l) {
    if (Jn = null, l = We(l), l !== null) {
      var t = j(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = R(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = Q(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Jn = l, null;
  }
  function pr(l) {
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
        switch (Jr()) {
          case Mf:
            return 2;
          case Nf:
            return 8;
          case Ru:
          case Wr:
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
  var vf = false, _e = null, pe = null, ze = null, Tu = /* @__PURE__ */ new Map(), Eu = /* @__PURE__ */ new Map(), Te = [], fy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function zr(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        _e = null;
        break;
      case "dragenter":
      case "dragleave":
        pe = null;
        break;
      case "mouseover":
      case "mouseout":
        ze = null;
        break;
      case "pointerover":
      case "pointerout":
        Tu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Eu.delete(t.pointerId);
    }
  }
  function xu(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n ? (l = { blockedOn: t, domEventName: e, eventSystemFlags: a, nativeEvent: n, targetContainers: [u] }, t !== null && (t = ke(t), t !== null && Sr(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function sy(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return _e = xu(_e, l, t, e, a, u), true;
      case "dragenter":
        return pe = xu(pe, l, t, e, a, u), true;
      case "mouseover":
        return ze = xu(ze, l, t, e, a, u), true;
      case "pointerover":
        var n = u.pointerId;
        return Tu.set(n, xu(Tu.get(n) || null, l, t, e, a, u)), true;
      case "gotpointercapture":
        return n = u.pointerId, Eu.set(n, xu(Eu.get(n) || null, l, t, e, a, u)), true;
    }
    return false;
  }
  function Tr(l) {
    var t = We(l.target);
    if (t !== null) {
      var e = j(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = R(e), t !== null) {
            l.blockedOn = t, Bf(l.priority, function() {
              _r(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = Q(e), t !== null) {
            l.blockedOn = t, Bf(l.priority, function() {
              _r(e);
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
      var e = yf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(e.type, e);
        yc = a, e.target.dispatchEvent(a), yc = null;
      } else return t = ke(e), t !== null && Sr(t), l.blockedOn = e, false;
      t.shift();
    }
    return true;
  }
  function Er(l, t, e) {
    Wn(l) && e.delete(t);
  }
  function oy() {
    vf = false, _e !== null && Wn(_e) && (_e = null), pe !== null && Wn(pe) && (pe = null), ze !== null && Wn(ze) && (ze = null), Tu.forEach(Er), Eu.forEach(Er);
  }
  function kn(l, t) {
    l.blockedOn === t && (l.blockedOn = null, vf || (vf = true, s.unstable_scheduleCallback(s.unstable_NormalPriority, oy)));
  }
  var $n = null;
  function xr(l) {
    $n !== l && ($n = l, s.unstable_scheduleCallback(s.unstable_NormalPriority, function() {
      $n === l && ($n = null);
      for (var t = 0; t < l.length; t += 3) {
        var e = l[t], a = l[t + 1], u = l[t + 2];
        if (typeof a != "function") {
          if (hf(a || e) === null) continue;
          break;
        }
        var n = ke(e);
        n !== null && (l.splice(t, 3), t -= 3, mi(n, { pending: true, data: u, method: e.method, action: a }, a, u));
      }
    }));
  }
  function Da(l) {
    function t(f) {
      return kn(f, l);
    }
    _e !== null && kn(_e, l), pe !== null && kn(pe, l), ze !== null && kn(ze, l), Tu.forEach(t), Eu.forEach(t);
    for (var e = 0; e < Te.length; e++) {
      var a = Te[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Te.length && (e = Te[0], e.blockedOn === null); ) Tr(e), e.blockedOn === null && Te.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null) for (a = 0; a < e.length; a += 3) {
      var u = e[a], n = e[a + 1], c = u[Jl] || null;
      if (typeof n == "function") c || xr(e);
      else if (c) {
        var i = null;
        if (n && n.hasAttribute("formAction")) {
          if (u = n, c = n[Jl] || null) i = c.formAction;
          else if (hf(u) !== null) continue;
        } else i = c.action;
        typeof i == "function" ? e[a + 1] = i : (e.splice(a, 3), a -= 3), xr(e);
      }
    }
  }
  function Ar() {
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
    if (t === null) throw Error(o(409));
    var e = t.current, a = rt();
    gr(e, a, l, t, null, null);
  }, Fn.prototype.unmount = gf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      gr(l.current, 2, null, l, null, null), Un(), t[Je] = null;
    }
  };
  function Fn(l) {
    this._internalRoot = l;
  }
  Fn.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Rf();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Te.length && t !== 0 && t < Te[e].priority; e++) ;
      Te.splice(e, 0, l), e === 0 && Tr(l);
    }
  };
  var Or = y.version;
  if (Or !== "19.2.0") throw Error(o(527, Or, "19.2.0"));
  U.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0) throw typeof l.render == "function" ? Error(o(188)) : (l = Object.keys(l).join(","), Error(o(268, l)));
    return l = S(t), l = l !== null ? w(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var ry = { bundleType: 0, version: "19.2.0", rendererPackageName: "react-dom", currentDispatcherRef: z, reconcilerVersion: "19.2.0" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var In = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!In.isDisabled && In.supportsFiber) try {
      Ha = In.inject(ry), at = In;
    } catch {
    }
  }
  return Ou.createRoot = function(l, t) {
    if (!M(l)) throw Error(o(299));
    var e = false, a = "", u = Ho, n = Ro, c = Bo;
    return t != null && (t.unstable_strictMode === true && (e = true), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = hr(l, 1, false, null, null, e, a, null, u, n, c, Ar), l[Je] = t.current, Fi(l), new gf(t);
  }, Ou.hydrateRoot = function(l, t, e) {
    if (!M(l)) throw Error(o(299));
    var a = false, u = "", n = Ho, c = Ro, i = Bo, f = null;
    return e != null && (e.unstable_strictMode === true && (a = true), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError), e.formState !== void 0 && (f = e.formState)), t = hr(l, 1, true, t, e ?? null, a, u, f, n, c, i, Ar), t.context = vr(null), e = t.current, a = rt(), a = cc(a), u = fe(a), u.callback = null, se(e, u, a), e = a, t.current.lanes = e, Ba(t, e), jt(t), l[Je] = t.current, Fi(l), new Fn(t);
  }, Ou.version = "19.2.0", Ou;
}
var qr;
function py() {
  if (qr) return _f.exports;
  qr = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
    } catch (y) {
      console.error(y);
    }
  }
  return s(), _f.exports = _y(), _f.exports;
}
var zy = py();
let Sl, Nu = null;
function Uu() {
  return (Nu === null || Nu.byteLength === 0) && (Nu = new Uint8Array(Sl.memory.buffer)), Nu;
}
let lc = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
lc.decode();
const Ty = 2146435072;
let Ef = 0;
function Ey(s, y) {
  return Ef += y, Ef >= Ty && (lc = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), lc.decode(), Ef = y), lc.decode(Uu().subarray(s, s + y));
}
function Pn(s, y) {
  return s = s >>> 0, Ey(s, y);
}
let Cu = 0;
const ju = new TextEncoder();
"encodeInto" in ju || (ju.encodeInto = function(s, y) {
  const b = ju.encode(s);
  return y.set(b), { read: s.length, written: b.length };
});
function Af(s, y, b) {
  if (b === void 0) {
    const Q = ju.encode(s), N = y(Q.length, 1) >>> 0;
    return Uu().subarray(N, N + Q.length).set(Q), Cu = Q.length, N;
  }
  let o = s.length, M = y(o, 1) >>> 0;
  const j = Uu();
  let R = 0;
  for (; R < o; R++) {
    const Q = s.charCodeAt(R);
    if (Q > 127) break;
    j[M + R] = Q;
  }
  if (R !== o) {
    R !== 0 && (s = s.slice(R)), M = b(M, o, o = R + s.length * 3, 1) >>> 0;
    const Q = Uu().subarray(M + R, M + o), N = ju.encodeInto(s, Q);
    R += N.written, M = b(M, o, R, 1) >>> 0;
  }
  return Cu = R, M;
}
let we = null;
function Yr() {
  return (we === null || we.buffer.detached === true || we.buffer.detached === void 0 && we.buffer !== Sl.memory.buffer) && (we = new DataView(Sl.memory.buffer)), we;
}
function Du(s) {
  const y = Sl.__externref_table_alloc();
  return Sl.__wbindgen_externrefs.set(y, s), y;
}
function Mu(s, y) {
  try {
    return s.apply(this, y);
  } catch (b) {
    const o = Du(b);
    Sl.__wbindgen_exn_store(o);
  }
}
function Gr(s, y) {
  return s = s >>> 0, Uu().subarray(s / 1, s / 1 + y);
}
function Ua(s) {
  return s == null;
}
const Xr = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((s) => s.dtor(s.a, s.b));
function xy(s, y, b, o) {
  const M = { a: s, b: y, cnt: 1, dtor: b }, j = (...R) => {
    M.cnt++;
    const Q = M.a;
    M.a = 0;
    try {
      return o(Q, M.b, ...R);
    } finally {
      M.a = Q, j._wbg_cb_unref();
    }
  };
  return j._wbg_cb_unref = () => {
    --M.cnt === 0 && (M.dtor(M.a, M.b), M.a = 0, Xr.unregister(M));
  }, Xr.register(j, M, M), j;
}
function Ay(s, y, b) {
  const o = Af(s, Sl.__wbindgen_malloc, Sl.__wbindgen_realloc), M = Cu;
  return Sl.evaluate_multiple(o, M, y, !Ua(b), Ua(b) ? BigInt(0) : b);
}
function Oy(s, y) {
  const b = Af(s, Sl.__wbindgen_malloc, Sl.__wbindgen_realloc), o = Cu;
  return Sl.evaluate_perchance_with_trace(b, o, y);
}
function My() {
  return Sl.get_available_generators();
}
function Ny(s, y, b) {
  Sl.wasm_bindgen__convert__closures_____invoke__h8a58c05785379efb(s, y, b);
}
function Dy(s, y, b, o) {
  Sl.wasm_bindgen__convert__closures_____invoke__h680168a7fee85f03(s, y, b, o);
}
const Uy = /* @__PURE__ */ new Set(["basic", "cors", "default"]);
async function jy(s, y) {
  if (typeof Response == "function" && s instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function") try {
      return await WebAssembly.instantiateStreaming(s, y);
    } catch (o) {
      if (s.ok && Uy.has(s.type) && s.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", o);
      else throw o;
    }
    const b = await s.arrayBuffer();
    return await WebAssembly.instantiate(b, y);
  } else {
    const b = await WebAssembly.instantiate(s, y);
    return b instanceof WebAssembly.Instance ? { instance: b, module: s } : b;
  }
}
function Cy() {
  const s = {};
  return s.wbg = {}, s.wbg.__wbg_Error_e83987f665cf5504 = function(y, b) {
    return Error(Pn(y, b));
  }, s.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(y, b) {
    const o = String(b), M = Af(o, Sl.__wbindgen_malloc, Sl.__wbindgen_realloc), j = Cu;
    Yr().setInt32(y + 4, j, true), Yr().setInt32(y + 0, M, true);
  }, s.wbg.__wbg___wbindgen_is_function_ee8a6c5833c90377 = function(y) {
    return typeof y == "function";
  }, s.wbg.__wbg___wbindgen_is_object_c818261d21f283a4 = function(y) {
    const b = y;
    return typeof b == "object" && b !== null;
  }, s.wbg.__wbg___wbindgen_is_string_fbb76cb2940daafd = function(y) {
    return typeof y == "string";
  }, s.wbg.__wbg___wbindgen_is_undefined_2d472862bd29a478 = function(y) {
    return y === void 0;
  }, s.wbg.__wbg___wbindgen_throw_b855445ff6a94295 = function(y, b) {
    throw new Error(Pn(y, b));
  }, s.wbg.__wbg__wbg_cb_unref_2454a539ea5790d9 = function(y) {
    y._wbg_cb_unref();
  }, s.wbg.__wbg_call_525440f72fbfc0ea = function() {
    return Mu(function(y, b, o) {
      return y.call(b, o);
    }, arguments);
  }, s.wbg.__wbg_call_e762c39fa8ea36bf = function() {
    return Mu(function(y, b) {
      return y.call(b);
    }, arguments);
  }, s.wbg.__wbg_crypto_574e78ad8b13b65f = function(y) {
    return y.crypto;
  }, s.wbg.__wbg_getRandomValues_b8f5dbd5f3995a9e = function() {
    return Mu(function(y, b) {
      y.getRandomValues(b);
    }, arguments);
  }, s.wbg.__wbg_length_69bca3cb64fc8748 = function(y) {
    return y.length;
  }, s.wbg.__wbg_msCrypto_a61aeb35a24c1329 = function(y) {
    return y.msCrypto;
  }, s.wbg.__wbg_new_1acc0b6eea89d040 = function() {
    return new Object();
  }, s.wbg.__wbg_new_3c3d849046688a66 = function(y, b) {
    try {
      var o = { a: y, b }, M = (R, Q) => {
        const N = o.a;
        o.a = 0;
        try {
          return Dy(N, o.b, R, Q);
        } finally {
          o.a = N;
        }
      };
      return new Promise(M);
    } finally {
      o.a = o.b = 0;
    }
  }, s.wbg.__wbg_new_e17d9f43105b08be = function() {
    return new Array();
  }, s.wbg.__wbg_new_no_args_ee98eee5275000a4 = function(y, b) {
    return new Function(Pn(y, b));
  }, s.wbg.__wbg_new_with_length_01aa0dc35aa13543 = function(y) {
    return new Uint8Array(y >>> 0);
  }, s.wbg.__wbg_node_905d3e251edff8a2 = function(y) {
    return y.node;
  }, s.wbg.__wbg_process_dc0fbacc7c1c06f7 = function(y) {
    return y.process;
  }, s.wbg.__wbg_prototypesetcall_2a6620b6922694b2 = function(y, b, o) {
    Uint8Array.prototype.set.call(Gr(y, b), o);
  }, s.wbg.__wbg_queueMicrotask_34d692c25c47d05b = function(y) {
    return y.queueMicrotask;
  }, s.wbg.__wbg_queueMicrotask_9d76cacb20c84d58 = function(y) {
    queueMicrotask(y);
  }, s.wbg.__wbg_randomFillSync_ac0988aba3254290 = function() {
    return Mu(function(y, b) {
      y.randomFillSync(b);
    }, arguments);
  }, s.wbg.__wbg_require_60cc747a6bc5215a = function() {
    return Mu(function() {
      return module.require;
    }, arguments);
  }, s.wbg.__wbg_resolve_caf97c30b83f7053 = function(y) {
    return Promise.resolve(y);
  }, s.wbg.__wbg_set_3f1d0b984ed272ed = function(y, b, o) {
    y[b] = o;
  }, s.wbg.__wbg_set_c213c871859d6500 = function(y, b, o) {
    y[b >>> 0] = o;
  }, s.wbg.__wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e = function() {
    const y = typeof global > "u" ? null : global;
    return Ua(y) ? 0 : Du(y);
  }, s.wbg.__wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac = function() {
    const y = typeof globalThis > "u" ? null : globalThis;
    return Ua(y) ? 0 : Du(y);
  }, s.wbg.__wbg_static_accessor_SELF_6fdf4b64710cc91b = function() {
    const y = typeof self > "u" ? null : self;
    return Ua(y) ? 0 : Du(y);
  }, s.wbg.__wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2 = function() {
    const y = typeof window > "u" ? null : window;
    return Ua(y) ? 0 : Du(y);
  }, s.wbg.__wbg_subarray_480600f3d6a9f26c = function(y, b, o) {
    return y.subarray(b >>> 0, o >>> 0);
  }, s.wbg.__wbg_then_4f46f6544e6b4a28 = function(y, b) {
    return y.then(b);
  }, s.wbg.__wbg_versions_c01dfd4722a88165 = function(y) {
    return y.versions;
  }, s.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(y, b) {
    return Pn(y, b);
  }, s.wbg.__wbindgen_cast_386725c5b2a3b665 = function(y, b) {
    return xy(y, b, Sl.wasm_bindgen__closure__destroy__h032a9fb1222a415c, Ny);
  }, s.wbg.__wbindgen_cast_4625c577ab2ec9ee = function(y) {
    return BigInt.asUintN(64, y);
  }, s.wbg.__wbindgen_cast_cb9088102bce6b30 = function(y, b) {
    return Gr(y, b);
  }, s.wbg.__wbindgen_cast_d6cd19b81560fd6e = function(y) {
    return y;
  }, s.wbg.__wbindgen_init_externref_table = function() {
    const y = Sl.__wbindgen_externrefs, b = y.grow(4);
    y.set(0, void 0), y.set(b + 0, void 0), y.set(b + 1, null), y.set(b + 2, true), y.set(b + 3, false);
  }, s;
}
function Hy(s, y) {
  return Sl = s.exports, Lr.__wbindgen_wasm_module = y, we = null, Nu = null, Sl.__wbindgen_start(), Sl;
}
async function Lr(s) {
  if (Sl !== void 0) return Sl;
  typeof s < "u" && (Object.getPrototypeOf(s) === Object.prototype ? { module_or_path: s } = s : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof s > "u" && (s = new URL("" + new URL("perchance_wasm_bg-CN6nCHmX.wasm", import.meta.url).href, import.meta.url));
  const y = Cy();
  (typeof s == "string" || typeof Request == "function" && s instanceof Request || typeof URL == "function" && s instanceof URL) && (s = fetch(s));
  const { instance: b, module: o } = await jy(await s, y);
  return Hy(b, o);
}
function Ry({ items: s, position: y, selectedIndex: b, onSelect: o, onClose: M, onNavigate: j }) {
  const R = ml.useRef(null), Q = ml.useRef(null);
  return ml.useEffect(() => {
    Q.current && Q.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [b]), ml.useEffect(() => {
    const N = (S) => {
      S.key === "ArrowDown" ? (S.preventDefault(), j("down")) : S.key === "ArrowUp" ? (S.preventDefault(), j("up")) : S.key === "Enter" ? (S.preventDefault(), s[b] && o(s[b])) : S.key === "Escape" && (S.preventDefault(), M());
    };
    return document.addEventListener("keydown", N), () => document.removeEventListener("keydown", N);
  }, [s, b, o, M, j]), s.length === 0 ? null : T.jsxs("div", { ref: R, className: "absolute z-50 bg-slate-800 border border-purple-500/50 rounded-lg shadow-2xl overflow-hidden", style: { top: `${y.top}px`, left: `${y.left}px`, maxHeight: "300px", width: "280px" }, children: [T.jsxs("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 flex items-center justify-between", children: [T.jsxs("span", { className: "text-xs font-semibold text-white", children: ["Import Generator (", s.length, ")"] }), T.jsx("span", { className: "text-xs text-purple-200", children: "\u2191\u2193 navigate \u2022 \u23CE select \u2022 esc close" })] }), T.jsx("div", { className: "overflow-y-auto max-h-[250px]", children: s.map((N, S) => T.jsx("div", { ref: S === b ? Q : null, onClick: () => o(N), onMouseEnter: () => j("down"), className: `px-4 py-2 cursor-pointer transition-colors ${S === b ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-slate-700"}`, children: T.jsx("div", { className: "font-mono text-sm", children: N }) }, N)) })] });
}
const Qr = { 30: "#000000", 31: "#ef4444", 32: "#22c55e", 33: "#eab308", 34: "#3b82f6", 35: "#a855f7", 36: "#06b6d4", 37: "#f3f4f6", 90: "#6b7280", 91: "#f87171", 92: "#86efac", 93: "#fde047", 94: "#93c5fd", 95: "#d8b4fe", 96: "#67e8f9", 97: "#ffffff" }, Zr = { 40: "#000000", 41: "#7f1d1d", 42: "#14532d", 43: "#713f12", 44: "#1e3a8a", 45: "#581c87", 46: "#164e63", 47: "#1f2937", 100: "#374151", 101: "#991b1b", 102: "#166534", 103: "#854d0e", 104: "#1e40af", 105: "#6b21a8", 106: "#155e75", 107: "#4b5563" };
function By(s) {
  const y = [], b = /\x1b\[([0-9;]+)m/g;
  let o = false, M, j, R = 0, Q;
  for (; (Q = b.exec(s)) !== null; ) {
    if (Q.index > R) {
      const S = s.substring(R, Q.index);
      S && y.push({ text: S, bold: o, fgColor: M, bgColor: j });
    }
    const N = Q[1].split(";").map(Number);
    for (const S of N) S === 0 ? (o = false, M = void 0, j = void 0) : S === 1 ? o = true : S === 22 ? o = false : S >= 30 && S <= 37 || S >= 90 && S <= 97 ? M = Qr[S] : S >= 40 && S <= 47 || S >= 100 && S <= 107 ? j = Zr[S] : S === 38 ? M = "#ffffff" : S === 48 && (j = "#000000");
    R = Q.index + Q[0].length;
  }
  if (R < s.length) {
    const N = s.substring(R);
    N && y.push({ text: N, bold: o, fgColor: M, bgColor: j });
  }
  return y;
}
function qy({ text: s, className: y = "" }) {
  const b = ml.useMemo(() => By(s), [s]);
  return T.jsx("pre", { className: y, children: b.map((o, M) => {
    const j = {};
    return o.fgColor && (j.color = o.fgColor), o.bgColor && (j.backgroundColor = o.bgColor), o.bold && (j.fontWeight = "bold"), T.jsx("span", { style: j, children: o.text }, M);
  }) });
}
function wr({ node: s, depth: y, onHover: b, onClick: o, hoveredNode: M, selectedNode: j }) {
  const [R, Q] = ml.useState(true), N = s.children && s.children.length > 0, S = M === s, w = j === s, el = ((rl) => {
    switch (rl) {
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
  })(s.operation_type), jl = w ? "ring-2 ring-yellow-400" : S ? "ring-2 ring-purple-500" : "", Dl = `${y * 1.5}rem`;
  return T.jsxs(T.Fragment, { children: [T.jsx("div", { className: `border-b border-slate-700/50 ${el} ${jl} cursor-pointer`, onMouseEnter: () => b(s), onMouseLeave: () => b(null), onClick: () => o(s), style: { paddingLeft: Dl }, children: T.jsxs("div", { className: "px-2 py-1 flex items-center gap-2 text-xs", children: [N && T.jsx("button", { onClick: (rl) => {
    rl.stopPropagation(), Q(!R);
  }, className: "text-gray-500 hover:text-gray-300 w-4 text-center", children: R ? "\u25BC" : "\u25B6" }), !N && T.jsx("span", { className: "w-4" }), T.jsx("div", { className: "text-gray-200 bg-slate-900/50 px-2 py-0.5 rounded font-mono text-[11px]", children: s.result || T.jsx("span", { className: "text-gray-600 italic", children: "(empty)" }) }), T.jsx("span", { className: "text-gray-600 text-[10px]", children: "\u2190" }), T.jsx("code", { className: "text-blue-300 font-semibold", children: s.operation }), s.operation_type && T.jsx("span", { className: "text-[9px] px-1 py-0.5 bg-slate-900/50 rounded text-gray-500", children: s.operation_type }), s.available_items && s.available_items.length > 0 && T.jsx("div", { className: "flex gap-1 overflow-x-auto", children: s.available_items.map((rl, Rl) => T.jsxs("div", { className: `flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] ${Rl === s.selected_index ? "bg-purple-600/50 border border-purple-500 text-white font-bold" : "bg-slate-700/30 border border-slate-600/30 text-gray-500"}`, title: rl, children: [Rl, ":", rl] }, Rl)) }), s.span && T.jsxs("span", { className: "text-[9px] text-gray-600", children: [s.span.start, "-", s.span.end] })] }) }), R && N && s.children.map((rl, Rl) => T.jsx(wr, { node: rl, depth: y + 1, onHover: b, onClick: o, hoveredNode: M, selectedNode: j }, Rl))] });
}
function Yy({ node: s }) {
  if (!s) return T.jsx("div", { className: "h-full flex items-center justify-center text-gray-500 text-sm", children: "Hover or click a trace node to see its source" });
  const b = ((M) => M.source_template ? { template: M.source_template, name: M.generator_name || "unknown" } : null)(s);
  if (!b) return T.jsx("div", { className: "h-full flex items-center justify-center text-gray-500 text-sm", children: "No source available for this node" });
  const o = () => {
    const { template: M } = b, { span: j } = s;
    if (!j || j.start === j.end) return T.jsx("pre", { className: "text-xs text-gray-300 font-mono whitespace-pre-wrap", children: M });
    const R = M.substring(0, j.start), Q = M.substring(j.start, j.end), N = M.substring(j.end);
    return T.jsxs("pre", { className: "text-xs font-mono leading-relaxed whitespace-pre-wrap", children: [T.jsx("span", { className: "text-gray-400", children: R }), T.jsx("span", { className: "bg-yellow-500/30 text-yellow-200 font-bold px-0.5", children: Q }), T.jsx("span", { className: "text-gray-400", children: N })] });
  };
  return T.jsxs("div", { className: "h-full flex flex-col", children: [T.jsxs("div", { className: "px-3 py-1.5 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between flex-shrink-0", children: [T.jsx("span", { className: "text-xs font-semibold text-purple-300", children: b.name }), s.span && T.jsxs("span", { className: "text-[10px] text-gray-500", children: [s.span.start, "-", s.span.end] })] }), T.jsx("div", { className: "flex-1 overflow-auto p-3 bg-slate-900/50", children: o() })] });
}
function Gy({ trace: s, onClose: y }) {
  const [b, o] = ml.useState(null), [M, j] = ml.useState(null), R = (w) => {
    j(M === w ? null : w);
  }, Q = M || b, N = (w) => {
    var _a;
    return 1 + (((_a = w.children) == null ? void 0 : _a.reduce((q, el) => q + N(el), 0)) || 0);
  }, S = N(s);
  return T.jsxs("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2", children: [T.jsxs("div", { className: "bg-slate-900 rounded-lg shadow-2xl border border-slate-700 flex flex-col", style: { width: "95vw", height: "95vh" }, children: [T.jsxs("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 rounded-t-lg flex items-center justify-between flex-shrink-0", children: [T.jsxs("div", { children: [T.jsx("h2", { className: "text-base font-bold text-white", children: "Execution Trace" }), T.jsxs("p", { className: "text-purple-200 text-[10px]", children: [S, " operations \u2022 ", M ? "Locked" : "Hover mode"] })] }), T.jsx("button", { onClick: y, className: "text-white hover:text-gray-200 transition-colors text-xl leading-none px-1", "aria-label": "Close", children: "\xD7" })] }), T.jsxs("div", { className: "flex-1 flex overflow-hidden min-h-0", children: [T.jsxs("div", { className: "w-[60%] border-r border-slate-700 flex flex-col min-h-0", children: [T.jsxs("div", { className: "px-2 py-1 bg-slate-800/30 border-b border-slate-700 text-[10px] text-gray-400 flex-shrink-0", children: [T.jsx("span", { className: "font-semibold", children: "Trace Tree" }), " \u2022 Click to expand/collapse \u2022 Hover/click to see source"] }), T.jsx("div", { className: "flex-1 overflow-auto scrollbar-hide min-h-0", children: T.jsx(wr, { node: s, depth: 0, onHover: o, onClick: R, hoveredNode: b, selectedNode: M }) })] }), T.jsxs("div", { className: "w-[40%] flex flex-col min-h-0", children: [T.jsxs("div", { className: "px-2 py-1 bg-slate-800/30 border-b border-slate-700 text-[10px] text-gray-400 flex-shrink-0", children: [T.jsx("span", { className: "font-semibold", children: "Source Code" }), " \u2022 Highlighted section shows span"] }), T.jsx("div", { className: "flex-1 overflow-hidden min-h-0", children: T.jsx(Yy, { node: Q }) })] })] }), T.jsxs("div", { className: "px-2 py-1.5 bg-slate-800/50 border-t border-slate-700 flex justify-between items-center text-[10px] flex-shrink-0", children: [T.jsxs("div", { className: "text-gray-400 flex gap-2", children: [T.jsxs("span", { className: "flex items-center gap-1", children: [T.jsx("span", { className: "w-2 h-2 rounded-full bg-purple-600" }), "Hover"] }), T.jsxs("span", { className: "flex items-center gap-1", children: [T.jsx("span", { className: "w-2 h-2 rounded-full bg-yellow-400" }), "Selected"] }), T.jsxs("span", { className: "flex items-center gap-1", children: [T.jsx("span", { className: "w-2 h-2 rounded-full bg-slate-600" }), "Options"] })] }), T.jsx("button", { onClick: y, className: "px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-[11px] rounded transition-colors", children: "Close" })] })] }), T.jsx("style", { children: `
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
const Xy = `animal
	dog
	cat^2
	bird

color
	red
	blue
	green

output
	I saw a {beautiful|pretty|cute} [color] [animal]!`;
function Qy() {
  const [s, y] = ml.useState(false), [b, o] = ml.useState(Xy), [M, j] = ml.useState(null), [R, Q] = ml.useState(true), [N, S] = ml.useState("42"), [w, q] = ml.useState(5), [el, jl] = ml.useState([]), [Dl, rl] = ml.useState(null), [Rl, wl] = ml.useState([]), [Mt, zl] = ml.useState(false), [Kl, dt] = ml.useState({ top: 0, left: 0 }), [Ql, J] = ml.useState(""), [Zl, lt] = ml.useState(0), [Ct, mt] = ml.useState(0), vl = ml.useRef(null);
  ml.useEffect(() => {
    Lr().then(() => {
      y(true);
      try {
        const O = My();
        wl(O);
      } catch (O) {
        console.error("Failed to load generators:", O);
      }
    });
  }, []);
  const Ht = () => {
    S(Math.floor(Math.random() * 1e6).toString());
  }, yt = ml.useCallback(async (O, D, G) => {
    if (s) try {
      const Z = BigInt(parseInt(G) || 42), W = await Ay(O, D, Z);
      jl(W), j(null);
    } catch (Z) {
      j(String(Z)), jl([]);
    }
  }, [s]);
  ml.useEffect(() => {
    if (R && s) {
      const O = setTimeout(() => {
        yt(b, w, N);
      }, 300);
      return () => clearTimeout(O);
    }
  }, [b, w, N, R, s, yt]);
  const tt = (O) => {
    q(parseInt(O.target.value));
  }, z = (O) => {
    const D = parseInt(O.target.value);
    !isNaN(D) && D > 0 && q(D);
  }, U = (O) => {
    const D = O.target.value, G = O.target.selectionStart;
    o(D);
    const Z = D.substring(0, G), W = Z.match(/\{import:([^}]*)$/);
    if (W && vl.current) {
      const Tl = W[1];
      J(Tl), mt(G - Tl.length), lt(0);
      const gl = vl.current, xe = Z.split(`
`), Ke = xe.length - 1, Hu = xe[Ke], Rt = 20, ja = 8, Ca = gl.offsetTop + (Ke + 1) * Rt + 40, tc = gl.offsetLeft + Hu.length * ja + 20;
      dt({ top: Ca, left: tc }), zl(true);
    } else zl(false);
  }, Y = Rl.filter((O) => O.toLowerCase().includes(Ql.toLowerCase())), ul = (O) => {
    if (!vl.current) return;
    const D = vl.current.selectionStart, G = b.substring(0, Ct), Z = b.substring(D), W = `${G}${O}}${Z}`;
    o(W);
    const Tl = Ct + O.length + 1;
    setTimeout(() => {
      vl.current && (vl.current.selectionStart = Tl, vl.current.selectionEnd = Tl, vl.current.focus());
    }, 0), zl(false);
  }, nl = (O) => {
    lt((D) => O === "down" ? Math.min(D + 1, Y.length - 1) : Math.max(D - 1, 0));
  }, d = () => {
    zl(false);
  }, A = async (O) => {
    if (s) try {
      const D = BigInt(parseInt(N) || 42) + BigInt(O), G = await Oy(b, D);
      rl(G.trace);
    } catch (D) {
      console.error("Failed to generate trace:", D);
    }
  };
  return T.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white", children: [T.jsxs("div", { className: "container mx-auto px-4 py-8", children: [T.jsxs("div", { className: "mb-8 text-center", children: [T.jsx("h1", { className: "text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2", children: "Perchance Interpreter" }), T.jsxs("p", { className: "text-gray-400 text-lg", children: ["A deterministic random text generator \u2022", " ", T.jsx("a", { href: "https://perchance.org/tutorial", target: "_blank", rel: "noopener noreferrer", className: "text-purple-400 hover:text-purple-300 transition-colors underline", children: "Tutorial" })] })] }), !s && T.jsxs("div", { className: "text-center py-12", children: [T.jsx("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" }), T.jsx("p", { className: "mt-4 text-gray-400", children: "Loading interpreter..." })] }), s && T.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [T.jsxs("div", { className: "bg-slate-800/50 backdrop-blur rounded-lg shadow-2xl border border-slate-700/50 overflow-hidden", children: [T.jsx("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3", children: T.jsx("h2", { className: "text-xl font-semibold", children: "Template Editor" }) }), T.jsxs("div", { className: "p-6 relative", children: [T.jsx("textarea", { ref: vl, value: b, onChange: U, className: "w-full h-[500px] bg-slate-900 text-gray-100 font-mono text-sm p-4 rounded-lg border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all resize-none", placeholder: "Enter your Perchance template here...", spellCheck: false }), Mt && T.jsx(Ry, { items: Y, position: Kl, selectedIndex: Zl, onSelect: ul, onClose: d, onNavigate: nl }), T.jsxs("div", { className: "mt-4 space-y-4", children: [T.jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [T.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [T.jsx("input", { type: "checkbox", checked: R, onChange: (O) => Q(O.target.checked), className: "w-4 h-4 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900" }), T.jsx("span", { className: "text-sm text-gray-300", children: "Auto-evaluate" })] }), T.jsxs("div", { className: "flex items-center gap-2", children: [T.jsx("label", { className: "text-sm text-gray-300", children: "Seed:" }), T.jsx("input", { type: "number", value: N, onChange: (O) => S(O.target.value), className: "w-24 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none" }), T.jsx("button", { onClick: Ht, className: "px-3 py-1 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded text-sm transition-colors", title: "Randomize seed", children: "\u{1F3B2}" })] })] }), T.jsxs("div", { className: "space-y-2", children: [T.jsx("div", { className: "flex items-center gap-2", children: T.jsxs("label", { className: "text-sm text-gray-300", children: ["Samples: ", w] }) }), T.jsxs("div", { className: "flex items-center gap-4", children: [T.jsx("input", { type: "range", min: "1", max: "10", value: Math.min(w, 10), onChange: tt, className: "flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600" }), T.jsx("input", { type: "number", value: w, onChange: z, min: "1", className: "w-20 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none" })] })] })] })] })] }), T.jsxs("div", { className: "bg-slate-800/50 backdrop-blur rounded-lg shadow-2xl border border-slate-700/50 overflow-hidden", children: [T.jsx("div", { className: "bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3", children: T.jsx("h2", { className: "text-xl font-semibold", children: "Output Samples" }) }), T.jsx("div", { className: "p-6", children: M ? T.jsx("div", { className: "bg-red-900/30 border border-red-500 rounded-lg p-4", children: T.jsxs("div", { className: "flex items-start gap-3", children: [T.jsx("svg", { className: "w-5 h-5 text-red-400 flex-shrink-0 mt-0.5", fill: "currentColor", viewBox: "0 0 20 20", children: T.jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }), T.jsxs("div", { className: "flex-1", children: [T.jsx("h3", { className: "text-red-400 font-semibold mb-1", children: "Error" }), T.jsx(qy, { text: M, className: "text-sm whitespace-pre-wrap font-mono" })] })] }) }) : el.length > 0 ? T.jsx("div", { className: "space-y-3", children: T.jsx("div", { className: "space-y-2 max-h-[580px] overflow-y-auto", children: el.map((O, D) => T.jsx("div", { className: "bg-slate-900/70 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors", children: T.jsxs("div", { className: "flex items-start gap-3", children: [T.jsxs("span", { className: "text-xs text-purple-400 font-semibold bg-purple-900/30 px-2 py-1 rounded", children: ["#", D + 1] }), T.jsx("p", { className: "text-gray-100 flex-1", children: O }), T.jsx("button", { onClick: () => A(D), className: "px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors flex-shrink-0", title: "View execution trace", children: "\u{1F50D} Trace" })] }) }, D)) }) }) : T.jsxs("div", { className: "flex flex-col items-center justify-center h-full min-h-[500px] text-gray-500", children: [T.jsx("svg", { className: "w-16 h-16 mb-4 opacity-50", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: T.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }), T.jsx("p", { className: "text-lg", children: "Output will appear here" }), T.jsx("p", { className: "text-sm mt-2", children: "Edit the template to generate samples" })] }) })] })] }), T.jsx("div", { className: "mt-12 text-center text-gray-500 text-sm", children: T.jsxs("p", { children: ["Built with React, TypeScript, and WebAssembly \u2022", " ", T.jsx("a", { href: "https://github.com/philpax/perchance-interpreter", target: "_blank", rel: "noopener noreferrer", className: "text-purple-400 hover:text-purple-300 transition-colors", children: "View Source" })] }) })] }), Dl && T.jsx(Gy, { trace: Dl, onClose: () => rl(null) })] });
}
zy.createRoot(document.getElementById("root")).render(T.jsx(ml.StrictMode, { children: T.jsx(Qy, {}) }));
