(() => {
  "use strict";
  var e,
    v = {},
    h = {};
  function r(e) {
    var n = h[e];
    if (void 0 !== n) return n.exports;
    var t = (h[e] = { id: e, loaded: !1, exports: {} });
    return v[e].call(t.exports, t, t.exports, r), (t.loaded = !0), t.exports;
  }
  (r.m = v),
    (e = []),
    (r.O = (n, t, i, f) => {
      if (!t) {
        var a = 1 / 0;
        for (o = 0; o < e.length; o++) {
          for (var [t, i, f] = e[o], c = !0, d = 0; d < t.length; d++)
            (!1 & f || a >= f) && Object.keys(r.O).every((b) => r.O[b](t[d]))
              ? t.splice(d--, 1)
              : ((c = !1), f < a && (a = f));
          if (c) {
            e.splice(o--, 1);
            var u = i();
            void 0 !== u && (n = u);
          }
        }
        return n;
      }
      f = f || 0;
      for (var o = e.length; o > 0 && e[o - 1][2] > f; o--) e[o] = e[o - 1];
      e[o] = [t, i, f];
    }),
    (r.n = (e) => {
      var n = e && e.__esModule ? () => e.default : () => e;
      return r.d(n, { a: n }), n;
    }),
    (r.d = (e, n) => {
      for (var t in n)
        r.o(n, t) &&
          !r.o(e, t) &&
          Object.defineProperty(e, t, { enumerable: !0, get: n[t] });
    }),
    (r.f = {}),
    (r.e = (e) =>
      Promise.all(Object.keys(r.f).reduce((n, t) => (r.f[t](e, n), n), []))),
    (r.u = (e) =>
      e +
      "." +
      {
        112: "3c295a92b5208ed5",
        142: "46215c6798ed9038",
        403: "c795af9db0e924a4",
        535: "6649d57c36a40d72",
        962: "95065c29d2174fb4",
      }[e] +
      ".js"),
    (r.miniCssF = (e) => {}),
    (r.hmd = (e) => (
      (e = Object.create(e)).children || (e.children = []),
      Object.defineProperty(e, "exports", {
        enumerable: !0,
        set: () => {
          throw new Error(
            "ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " +
              e.id
          );
        },
      }),
      e
    )),
    (r.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n)),
    (() => {
      var e = {},
        n = "techcomposev2:";
      r.l = (t, i, f, o) => {
        if (e[t]) e[t].push(i);
        else {
          var a, c;
          if (void 0 !== f)
            for (
              var d = document.getElementsByTagName("script"), u = 0;
              u < d.length;
              u++
            ) {
              var s = d[u];
              if (
                s.getAttribute("src") == t ||
                s.getAttribute("data-webpack") == n + f
              ) {
                a = s;
                break;
              }
            }
          a ||
            ((c = !0),
            ((a = document.createElement("script")).type = "module"),
            (a.charset = "utf-8"),
            (a.timeout = 120),
            r.nc && a.setAttribute("nonce", r.nc),
            a.setAttribute("data-webpack", n + f),
            (a.src = r.tu(t))),
            (e[t] = [i]);
          var l = (m, b) => {
              (a.onerror = a.onload = null), clearTimeout(p);
              var g = e[t];
              if (
                (delete e[t],
                a.parentNode && a.parentNode.removeChild(a),
                g && g.forEach((y) => y(b)),
                m)
              )
                return m(b);
            },
            p = setTimeout(
              l.bind(null, void 0, { type: "timeout", target: a }),
              12e4
            );
          (a.onerror = l.bind(null, a.onerror)),
            (a.onload = l.bind(null, a.onload)),
            c && document.head.appendChild(a);
        }
      };
    })(),
    (r.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      var e;
      r.tt = () => (
        void 0 === e &&
          ((e = { createScriptURL: (n) => n }),
          "undefined" != typeof trustedTypes &&
            trustedTypes.createPolicy &&
            (e = trustedTypes.createPolicy("angular#bundler", e))),
        e
      );
    })(),
    (r.tu = (e) => r.tt().createScriptURL(e)),
    (r.p = ""),
    (() => {
      var e = { 666: 0 };
      (r.f.j = (i, f) => {
        var o = r.o(e, i) ? e[i] : void 0;
        if (0 !== o)
          if (o) f.push(o[2]);
          else if (666 != i) {
            var a = new Promise((s, l) => (o = e[i] = [s, l]));
            f.push((o[2] = a));
            var c = r.p + r.u(i),
              d = new Error();
            r.l(
              c,
              (s) => {
                if (r.o(e, i) && (0 !== (o = e[i]) && (e[i] = void 0), o)) {
                  var l = s && ("load" === s.type ? "missing" : s.type),
                    p = s && s.target && s.target.src;
                  (d.message =
                    "Loading chunk " + i + " failed.\n(" + l + ": " + p + ")"),
                    (d.name = "ChunkLoadError"),
                    (d.type = l),
                    (d.request = p),
                    o[1](d);
                }
              },
              "chunk-" + i,
              i
            );
          } else e[i] = 0;
      }),
        (r.O.j = (i) => 0 === e[i]);
      var n = (i, f) => {
          var d,
            u,
            [o, a, c] = f,
            s = 0;
          if (o.some((p) => 0 !== e[p])) {
            for (d in a) r.o(a, d) && (r.m[d] = a[d]);
            if (c) var l = c(r);
          }
          for (i && i(f); s < o.length; s++)
            (u = o[s]), r.o(e, u) && e[u] && e[u][0](), (e[u] = 0);
          return r.O(l);
        },
        t = (self.webpackChunktechcomposev2 =
          self.webpackChunktechcomposev2 || []);
      t.forEach(n.bind(null, 0)), (t.push = n.bind(null, t.push.bind(t)));
    })();
})();
