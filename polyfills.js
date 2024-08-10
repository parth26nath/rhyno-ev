"use strict";
(self.webpackChunktechcomposev2 = self.webpackChunktechcomposev2 || []).push([
  [429],
  {
    7435: (ge, ce, ae) => {
      ae(8583), ae(6389);
    },
    6389: (ge, ce, ae) => {
      var oe, be;
      (oe = function () {
        var ye = (function () {
          function se() {
            (this.name = "TaskTrackingZone"),
              (this.microTasks = []),
              (this.macroTasks = []),
              (this.eventTasks = []),
              (this.properties = { TaskTrackingZone: this });
          }
          return (
            (se.get = function () {
              return Zone.current.get("TaskTrackingZone");
            }),
            (se.prototype.getTasksFor = function (te) {
              switch (te) {
                case "microTask":
                  return this.microTasks;
                case "macroTask":
                  return this.macroTasks;
                case "eventTask":
                  return this.eventTasks;
              }
              throw new Error("Unknown task format: " + te);
            }),
            (se.prototype.onScheduleTask = function (te, we, he, z) {
              return (
                (z.creationLocation = new Error(
                  "Task '" + z.type + "' from '" + z.source + "'."
                )),
                this.getTasksFor(z.type).push(z),
                te.scheduleTask(he, z)
              );
            }),
            (se.prototype.onCancelTask = function (te, we, he, z) {
              for (
                var $ = this.getTasksFor(z.type), ne = 0;
                ne < $.length;
                ne++
              )
                if ($[ne] == z) {
                  $.splice(ne, 1);
                  break;
                }
              return te.cancelTask(he, z);
            }),
            (se.prototype.onInvokeTask = function (te, we, he, z, $, ne) {
              if ("eventTask" === z.type) return te.invokeTask(he, z, $, ne);
              for (
                var ke = this.getTasksFor(z.type), Ee = 0;
                Ee < ke.length;
                Ee++
              )
                if (ke[Ee] == z) {
                  ke.splice(Ee, 1);
                  break;
                }
              return te.invokeTask(he, z, $, ne);
            }),
            (se.prototype.clearEvents = function () {
              for (; this.eventTasks.length; )
                Zone.current.cancelTask(this.eventTasks[0]);
            }),
            se
          );
        })();
        Zone.TaskTrackingZoneSpec = ye;
      }),
        void 0 !==
          (be = "function" == typeof oe ? oe.call(ce, ae, ce, ge) : oe) &&
          (ge.exports = be);
    },
    8583: () => {
      !(function (e) {
        const t = e.performance;
        function c(x) {
          t && t.mark && t.mark(x);
        }
        function r(x, o) {
          t && t.measure && t.measure(x, o);
        }
        c("Zone");
        const a = e.__Zone_symbol_prefix || "__zone_symbol__";
        function u(x) {
          return a + x;
        }
        const h = !0 === e[u("forceDuplicateZoneCheck")];
        if (e.Zone) {
          if (h || "function" != typeof e.Zone.__symbol__)
            throw new Error("Zone already loaded.");
          return e.Zone;
        }
        class p {
          constructor(o, n) {
            (this._parent = o),
              (this._name = n ? n.name || "unnamed" : "<root>"),
              (this._properties = (n && n.properties) || {}),
              (this._zoneDelegate = new T(
                this,
                this._parent && this._parent._zoneDelegate,
                n
              ));
          }
          static assertZonePatched() {
            if (e.Promise !== Q.ZoneAwarePromise)
              throw new Error(
                "Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)"
              );
          }
          static get root() {
            let o = p.current;
            for (; o.parent; ) o = o.parent;
            return o;
          }
          static get current() {
            return F.zone;
          }
          static get currentTask() {
            return ie;
          }
          static __load_patch(o, n, s = !1) {
            if (Q.hasOwnProperty(o)) {
              if (!s && h) throw Error("Already loaded patch: " + o);
            } else if (!e["__Zone_disable_" + o]) {
              const y = "Zone:" + o;
              c(y), (Q[o] = n(e, p, me)), r(y, y);
            }
          }
          get parent() {
            return this._parent;
          }
          get name() {
            return this._name;
          }
          get(o) {
            const n = this.getZoneWith(o);
            if (n) return n._properties[o];
          }
          getZoneWith(o) {
            let n = this;
            for (; n; ) {
              if (n._properties.hasOwnProperty(o)) return n;
              n = n._parent;
            }
            return null;
          }
          fork(o) {
            if (!o) throw new Error("ZoneSpec required!");
            return this._zoneDelegate.fork(this, o);
          }
          wrap(o, n) {
            if ("function" != typeof o)
              throw new Error("Expecting function got: " + o);
            const s = this._zoneDelegate.intercept(this, o, n),
              y = this;
            return function () {
              return y.runGuarded(s, this, arguments, n);
            };
          }
          run(o, n, s, y) {
            F = { parent: F, zone: this };
            try {
              return this._zoneDelegate.invoke(this, o, n, s, y);
            } finally {
              F = F.parent;
            }
          }
          runGuarded(o, n = null, s, y) {
            F = { parent: F, zone: this };
            try {
              try {
                return this._zoneDelegate.invoke(this, o, n, s, y);
              } catch (V) {
                if (this._zoneDelegate.handleError(this, V)) throw V;
              }
            } finally {
              F = F.parent;
            }
          }
          runTask(o, n, s) {
            if (o.zone != this)
              throw new Error(
                "A task can only be run in the zone of creation! (Creation: " +
                  (o.zone || B).name +
                  "; Execution: " +
                  this.name +
                  ")"
              );
            if (o.state === M && (o.type === P || o.type === I)) return;
            const y = o.state != Y;
            y && o._transitionTo(Y, Z), o.runCount++;
            const V = ie;
            (ie = o), (F = { parent: F, zone: this });
            try {
              o.type == I &&
                o.data &&
                !o.data.isPeriodic &&
                (o.cancelFn = void 0);
              try {
                return this._zoneDelegate.invokeTask(this, o, n, s);
              } catch (fe) {
                if (this._zoneDelegate.handleError(this, fe)) throw fe;
              }
            } finally {
              o.state !== M &&
                o.state !== K &&
                (o.type == P || (o.data && o.data.isPeriodic)
                  ? y && o._transitionTo(Z, Y)
                  : ((o.runCount = 0),
                    this._updateTaskCount(o, -1),
                    y && o._transitionTo(M, Y, M))),
                (F = F.parent),
                (ie = V);
            }
          }
          scheduleTask(o) {
            if (o.zone && o.zone !== this) {
              let s = this;
              for (; s; ) {
                if (s === o.zone)
                  throw Error(
                    `can not reschedule task to ${this.name} which is descendants of the original zone ${o.zone.name}`
                  );
                s = s.parent;
              }
            }
            o._transitionTo(X, M);
            const n = [];
            (o._zoneDelegates = n), (o._zone = this);
            try {
              o = this._zoneDelegate.scheduleTask(this, o);
            } catch (s) {
              throw (
                (o._transitionTo(K, X, M),
                this._zoneDelegate.handleError(this, s),
                s)
              );
            }
            return (
              o._zoneDelegates === n && this._updateTaskCount(o, 1),
              o.state == X && o._transitionTo(Z, X),
              o
            );
          }
          scheduleMicroTask(o, n, s, y) {
            return this.scheduleTask(new m(v, o, n, s, y, void 0));
          }
          scheduleMacroTask(o, n, s, y, V) {
            return this.scheduleTask(new m(I, o, n, s, y, V));
          }
          scheduleEventTask(o, n, s, y, V) {
            return this.scheduleTask(new m(P, o, n, s, y, V));
          }
          cancelTask(o) {
            if (o.zone != this)
              throw new Error(
                "A task can only be cancelled in the zone of creation! (Creation: " +
                  (o.zone || B).name +
                  "; Execution: " +
                  this.name +
                  ")"
              );
            o._transitionTo(L, Z, Y);
            try {
              this._zoneDelegate.cancelTask(this, o);
            } catch (n) {
              throw (
                (o._transitionTo(K, L),
                this._zoneDelegate.handleError(this, n),
                n)
              );
            }
            return (
              this._updateTaskCount(o, -1),
              o._transitionTo(M, L),
              (o.runCount = 0),
              o
            );
          }
          _updateTaskCount(o, n) {
            const s = o._zoneDelegates;
            -1 == n && (o._zoneDelegates = null);
            for (let y = 0; y < s.length; y++) s[y]._updateTaskCount(o.type, n);
          }
        }
        p.__symbol__ = u;
        const g = {
          name: "",
          onHasTask: (x, o, n, s) => x.hasTask(n, s),
          onScheduleTask: (x, o, n, s) => x.scheduleTask(n, s),
          onInvokeTask: (x, o, n, s, y, V) => x.invokeTask(n, s, y, V),
          onCancelTask: (x, o, n, s) => x.cancelTask(n, s),
        };
        class T {
          constructor(o, n, s) {
            (this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 }),
              (this.zone = o),
              (this._parentDelegate = n),
              (this._forkZS = s && (s && s.onFork ? s : n._forkZS)),
              (this._forkDlgt = s && (s.onFork ? n : n._forkDlgt)),
              (this._forkCurrZone =
                s && (s.onFork ? this.zone : n._forkCurrZone)),
              (this._interceptZS = s && (s.onIntercept ? s : n._interceptZS)),
              (this._interceptDlgt =
                s && (s.onIntercept ? n : n._interceptDlgt)),
              (this._interceptCurrZone =
                s && (s.onIntercept ? this.zone : n._interceptCurrZone)),
              (this._invokeZS = s && (s.onInvoke ? s : n._invokeZS)),
              (this._invokeDlgt = s && (s.onInvoke ? n : n._invokeDlgt)),
              (this._invokeCurrZone =
                s && (s.onInvoke ? this.zone : n._invokeCurrZone)),
              (this._handleErrorZS =
                s && (s.onHandleError ? s : n._handleErrorZS)),
              (this._handleErrorDlgt =
                s && (s.onHandleError ? n : n._handleErrorDlgt)),
              (this._handleErrorCurrZone =
                s && (s.onHandleError ? this.zone : n._handleErrorCurrZone)),
              (this._scheduleTaskZS =
                s && (s.onScheduleTask ? s : n._scheduleTaskZS)),
              (this._scheduleTaskDlgt =
                s && (s.onScheduleTask ? n : n._scheduleTaskDlgt)),
              (this._scheduleTaskCurrZone =
                s && (s.onScheduleTask ? this.zone : n._scheduleTaskCurrZone)),
              (this._invokeTaskZS =
                s && (s.onInvokeTask ? s : n._invokeTaskZS)),
              (this._invokeTaskDlgt =
                s && (s.onInvokeTask ? n : n._invokeTaskDlgt)),
              (this._invokeTaskCurrZone =
                s && (s.onInvokeTask ? this.zone : n._invokeTaskCurrZone)),
              (this._cancelTaskZS =
                s && (s.onCancelTask ? s : n._cancelTaskZS)),
              (this._cancelTaskDlgt =
                s && (s.onCancelTask ? n : n._cancelTaskDlgt)),
              (this._cancelTaskCurrZone =
                s && (s.onCancelTask ? this.zone : n._cancelTaskCurrZone)),
              (this._hasTaskZS = null),
              (this._hasTaskDlgt = null),
              (this._hasTaskDlgtOwner = null),
              (this._hasTaskCurrZone = null);
            const y = s && s.onHasTask,
              V = n && n._hasTaskZS;
            (y || V) &&
              ((this._hasTaskZS = y ? s : g),
              (this._hasTaskDlgt = n),
              (this._hasTaskDlgtOwner = this),
              (this._hasTaskCurrZone = o),
              s.onScheduleTask ||
                ((this._scheduleTaskZS = g),
                (this._scheduleTaskDlgt = n),
                (this._scheduleTaskCurrZone = this.zone)),
              s.onInvokeTask ||
                ((this._invokeTaskZS = g),
                (this._invokeTaskDlgt = n),
                (this._invokeTaskCurrZone = this.zone)),
              s.onCancelTask ||
                ((this._cancelTaskZS = g),
                (this._cancelTaskDlgt = n),
                (this._cancelTaskCurrZone = this.zone)));
          }
          fork(o, n) {
            return this._forkZS
              ? this._forkZS.onFork(this._forkDlgt, this.zone, o, n)
              : new p(o, n);
          }
          intercept(o, n, s) {
            return this._interceptZS
              ? this._interceptZS.onIntercept(
                  this._interceptDlgt,
                  this._interceptCurrZone,
                  o,
                  n,
                  s
                )
              : n;
          }
          invoke(o, n, s, y, V) {
            return this._invokeZS
              ? this._invokeZS.onInvoke(
                  this._invokeDlgt,
                  this._invokeCurrZone,
                  o,
                  n,
                  s,
                  y,
                  V
                )
              : n.apply(s, y);
          }
          handleError(o, n) {
            return (
              !this._handleErrorZS ||
              this._handleErrorZS.onHandleError(
                this._handleErrorDlgt,
                this._handleErrorCurrZone,
                o,
                n
              )
            );
          }
          scheduleTask(o, n) {
            let s = n;
            if (this._scheduleTaskZS)
              this._hasTaskZS && s._zoneDelegates.push(this._hasTaskDlgtOwner),
                (s = this._scheduleTaskZS.onScheduleTask(
                  this._scheduleTaskDlgt,
                  this._scheduleTaskCurrZone,
                  o,
                  n
                )),
                s || (s = n);
            else if (n.scheduleFn) n.scheduleFn(n);
            else {
              if (n.type != v) throw new Error("Task is missing scheduleFn.");
              _(n);
            }
            return s;
          }
          invokeTask(o, n, s, y) {
            return this._invokeTaskZS
              ? this._invokeTaskZS.onInvokeTask(
                  this._invokeTaskDlgt,
                  this._invokeTaskCurrZone,
                  o,
                  n,
                  s,
                  y
                )
              : n.callback.apply(s, y);
          }
          cancelTask(o, n) {
            let s;
            if (this._cancelTaskZS)
              s = this._cancelTaskZS.onCancelTask(
                this._cancelTaskDlgt,
                this._cancelTaskCurrZone,
                o,
                n
              );
            else {
              if (!n.cancelFn) throw Error("Task is not cancelable");
              s = n.cancelFn(n);
            }
            return s;
          }
          hasTask(o, n) {
            try {
              this._hasTaskZS &&
                this._hasTaskZS.onHasTask(
                  this._hasTaskDlgt,
                  this._hasTaskCurrZone,
                  o,
                  n
                );
            } catch (s) {
              this.handleError(o, s);
            }
          }
          _updateTaskCount(o, n) {
            const s = this._taskCounts,
              y = s[o],
              V = (s[o] = y + n);
            if (V < 0)
              throw new Error("More tasks executed then were scheduled.");
            if (0 == y || 0 == V) {
              const fe = {
                microTask: s.microTask > 0,
                macroTask: s.macroTask > 0,
                eventTask: s.eventTask > 0,
                change: o,
              };
              this.hasTask(this.zone, fe);
            }
          }
        }
        class m {
          constructor(o, n, s, y, V, fe) {
            if (
              ((this._zone = null),
              (this.runCount = 0),
              (this._zoneDelegates = null),
              (this._state = "notScheduled"),
              (this.type = o),
              (this.source = n),
              (this.data = y),
              (this.scheduleFn = V),
              (this.cancelFn = fe),
              !s)
            )
              throw new Error("callback is not defined");
            this.callback = s;
            const f = this;
            o === P && y && y.useG
              ? (this.invoke = m.invokeTask)
              : (this.invoke = function () {
                  return m.invokeTask.call(e, f, this, arguments);
                });
          }
          static invokeTask(o, n, s) {
            o || (o = this), ue++;
            try {
              return o.runCount++, o.zone.runTask(o, n, s);
            } finally {
              1 == ue && O(), ue--;
            }
          }
          get zone() {
            return this._zone;
          }
          get state() {
            return this._state;
          }
          cancelScheduleRequest() {
            this._transitionTo(M, X);
          }
          _transitionTo(o, n, s) {
            if (this._state !== n && this._state !== s)
              throw new Error(
                `${this.type} '${
                  this.source
                }': can not transition to '${o}', expecting state '${n}'${
                  s ? " or '" + s + "'" : ""
                }, was '${this._state}'.`
              );
            (this._state = o), o == M && (this._zoneDelegates = null);
          }
          toString() {
            return this.data && void 0 !== this.data.handleId
              ? this.data.handleId.toString()
              : Object.prototype.toString.call(this);
          }
          toJSON() {
            return {
              type: this.type,
              state: this.state,
              source: this.source,
              zone: this.zone.name,
              runCount: this.runCount,
            };
          }
        }
        const N = u("setTimeout"),
          D = u("Promise"),
          S = u("then");
        let E,
          G = [],
          H = !1;
        function _(x) {
          if (0 === ue && 0 === G.length)
            if ((E || (e[D] && (E = e[D].resolve(0))), E)) {
              let o = E[S];
              o || (o = E.then), o.call(E, O);
            } else e[N](O, 0);
          x && G.push(x);
        }
        function O() {
          if (!H) {
            for (H = !0; G.length; ) {
              const x = G;
              G = [];
              for (let o = 0; o < x.length; o++) {
                const n = x[o];
                try {
                  n.zone.runTask(n, null, null);
                } catch (s) {
                  me.onUnhandledError(s);
                }
              }
            }
            me.microtaskDrainDone(), (H = !1);
          }
        }
        const B = { name: "NO ZONE" },
          M = "notScheduled",
          X = "scheduling",
          Z = "scheduled",
          Y = "running",
          L = "canceling",
          K = "unknown",
          v = "microTask",
          I = "macroTask",
          P = "eventTask",
          Q = {},
          me = {
            symbol: u,
            currentZoneFrame: () => F,
            onUnhandledError: U,
            microtaskDrainDone: U,
            scheduleMicroTask: _,
            showUncaughtError: () => !p[u("ignoreConsoleErrorUncaughtError")],
            patchEventTarget: () => [],
            patchOnProperties: U,
            patchMethod: () => U,
            bindArguments: () => [],
            patchThen: () => U,
            patchMacroTask: () => U,
            patchEventPrototype: () => U,
            isIEOrEdge: () => !1,
            getGlobalObjects: () => {},
            ObjectDefineProperty: () => U,
            ObjectGetOwnPropertyDescriptor: () => {},
            ObjectCreate: () => {},
            ArraySlice: () => [],
            patchClass: () => U,
            wrapWithCurrentZone: () => U,
            filterProperties: () => [],
            attachOriginToPatched: () => U,
            _redefineProperty: () => U,
            patchCallbacks: () => U,
          };
        let F = { parent: null, zone: new p(null, null) },
          ie = null,
          ue = 0;
        function U() {}
        r("Zone", "Zone"), (e.Zone = p);
      })(
        ("undefined" != typeof window && window) ||
          ("undefined" != typeof self && self) ||
          global
      );
      const ce = Object.getOwnPropertyDescriptor,
        ae = Object.defineProperty,
        oe = Object.getPrototypeOf,
        be = Object.create,
        ye = Array.prototype.slice,
        se = "addEventListener",
        te = "removeEventListener",
        we = Zone.__symbol__(se),
        he = Zone.__symbol__(te),
        z = "true",
        $ = "false",
        ne = Zone.__symbol__("");
      function ke(e, t) {
        return Zone.current.wrap(e, t);
      }
      function Ee(e, t, c, r, a) {
        return Zone.current.scheduleMacroTask(e, t, c, r, a);
      }
      const j = Zone.__symbol__,
        Ie = "undefined" != typeof window,
        Pe = Ie ? window : void 0,
        J = (Ie && Pe) || ("object" == typeof self && self) || global,
        ht = [null];
      function He(e, t) {
        for (let c = e.length - 1; c >= 0; c--)
          "function" == typeof e[c] && (e[c] = ke(e[c], t + "_" + c));
        return e;
      }
      function Ue(e) {
        return (
          !e ||
          (!1 !== e.writable &&
            !("function" == typeof e.get && void 0 === e.set))
        );
      }
      const We =
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope,
        Le =
          !("nw" in J) &&
          void 0 !== J.process &&
          "[object process]" === {}.toString.call(J.process),
        xe = !Le && !We && !(!Ie || !Pe.HTMLElement),
        qe =
          void 0 !== J.process &&
          "[object process]" === {}.toString.call(J.process) &&
          !We &&
          !(!Ie || !Pe.HTMLElement),
        Me = {},
        Xe = function (e) {
          if (!(e = e || J.event)) return;
          let t = Me[e.type];
          t || (t = Me[e.type] = j("ON_PROPERTY" + e.type));
          const c = this || e.target || J,
            r = c[t];
          let a;
          if (xe && c === Pe && "error" === e.type) {
            const u = e;
            (a =
              r &&
              r.call(this, u.message, u.filename, u.lineno, u.colno, u.error)),
              !0 === a && e.preventDefault();
          } else
            (a = r && r.apply(this, arguments)),
              null != a && !a && e.preventDefault();
          return a;
        };
      function Ye(e, t, c) {
        let r = ce(e, t);
        if (
          (!r && c && ce(c, t) && (r = { enumerable: !0, configurable: !0 }),
          !r || !r.configurable)
        )
          return;
        const a = j("on" + t + "patched");
        if (e.hasOwnProperty(a) && e[a]) return;
        delete r.writable, delete r.value;
        const u = r.get,
          h = r.set,
          p = t.substr(2);
        let g = Me[p];
        g || (g = Me[p] = j("ON_PROPERTY" + p)),
          (r.set = function (T) {
            let m = this;
            !m && e === J && (m = J),
              m &&
                (m[g] && m.removeEventListener(p, Xe),
                h && h.apply(m, ht),
                "function" == typeof T
                  ? ((m[g] = T), m.addEventListener(p, Xe, !1))
                  : (m[g] = null));
          }),
          (r.get = function () {
            let T = this;
            if ((!T && e === J && (T = J), !T)) return null;
            const m = T[g];
            if (m) return m;
            if (u) {
              let N = u && u.call(this);
              if (N)
                return (
                  r.set.call(this, N),
                  "function" == typeof T.removeAttribute &&
                    T.removeAttribute(t),
                  N
                );
            }
            return null;
          }),
          ae(e, t, r),
          (e[a] = !0);
      }
      function Ke(e, t, c) {
        if (t) for (let r = 0; r < t.length; r++) Ye(e, "on" + t[r], c);
        else {
          const r = [];
          for (const a in e) "on" == a.substr(0, 2) && r.push(a);
          for (let a = 0; a < r.length; a++) Ye(e, r[a], c);
        }
      }
      const le = j("originalInstance");
      function Se(e) {
        const t = J[e];
        if (!t) return;
        (J[j(e)] = t),
          (J[e] = function () {
            const a = He(arguments, e);
            switch (a.length) {
              case 0:
                this[le] = new t();
                break;
              case 1:
                this[le] = new t(a[0]);
                break;
              case 2:
                this[le] = new t(a[0], a[1]);
                break;
              case 3:
                this[le] = new t(a[0], a[1], a[2]);
                break;
              case 4:
                this[le] = new t(a[0], a[1], a[2], a[3]);
                break;
              default:
                throw new Error("Arg list too long.");
            }
          }),
          pe(J[e], t);
        const c = new t(function () {});
        let r;
        for (r in c)
          ("XMLHttpRequest" === e && "responseBlob" === r) ||
            (function (a) {
              "function" == typeof c[a]
                ? (J[e].prototype[a] = function () {
                    return this[le][a].apply(this[le], arguments);
                  })
                : ae(J[e].prototype, a, {
                    set: function (u) {
                      "function" == typeof u
                        ? ((this[le][a] = ke(u, e + "." + a)),
                          pe(this[le][a], u))
                        : (this[le][a] = u);
                    },
                    get: function () {
                      return this[le][a];
                    },
                  });
            })(r);
        for (r in t)
          "prototype" !== r && t.hasOwnProperty(r) && (J[e][r] = t[r]);
      }
      function _e(e, t, c) {
        let r = e;
        for (; r && !r.hasOwnProperty(t); ) r = oe(r);
        !r && e[t] && (r = e);
        const a = j(t);
        let u = null;
        if (r && (!(u = r[a]) || !r.hasOwnProperty(a))) {
          u = r[a] = r[t];
          if (Ue(r && ce(r, t))) {
            const p = c(u, a, t);
            (r[t] = function () {
              return p(this, arguments);
            }),
              pe(r[t], u);
          }
        }
        return u;
      }
      function _t(e, t, c) {
        let r = null;
        function a(u) {
          const h = u.data;
          return (
            (h.args[h.cbIdx] = function () {
              u.invoke.apply(this, arguments);
            }),
            r.apply(h.target, h.args),
            u
          );
        }
        r = _e(
          e,
          t,
          (u) =>
            function (h, p) {
              const g = c(h, p);
              return g.cbIdx >= 0 && "function" == typeof p[g.cbIdx]
                ? Ee(g.name, p[g.cbIdx], g, a)
                : u.apply(h, p);
            }
        );
      }
      function pe(e, t) {
        e[j("OriginalDelegate")] = t;
      }
      let $e = !1,
        Fe = !1;
      function mt() {
        if ($e) return Fe;
        $e = !0;
        try {
          const e = Pe.navigator.userAgent;
          (-1 !== e.indexOf("MSIE ") ||
            -1 !== e.indexOf("Trident/") ||
            -1 !== e.indexOf("Edge/")) &&
            (Fe = !0);
        } catch (e) {}
        return Fe;
      }
      Zone.__load_patch("ZoneAwarePromise", (e, t, c) => {
        const r = Object.getOwnPropertyDescriptor,
          a = Object.defineProperty;
        const h = c.symbol,
          p = [],
          g = !0 === e[h("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")],
          T = h("Promise"),
          m = h("then");
        (c.onUnhandledError = (f) => {
          if (c.showUncaughtError()) {
            const i = f && f.rejection;
            i
              ? console.error(
                  "Unhandled Promise rejection:",
                  i instanceof Error ? i.message : i,
                  "; Zone:",
                  f.zone.name,
                  "; Task:",
                  f.task && f.task.source,
                  "; Value:",
                  i,
                  i instanceof Error ? i.stack : void 0
                )
              : console.error(f);
          }
        }),
          (c.microtaskDrainDone = () => {
            for (; p.length; ) {
              const f = p.shift();
              try {
                f.zone.runGuarded(() => {
                  throw f.throwOriginal ? f.rejection : f;
                });
              } catch (i) {
                S(i);
              }
            }
          });
        const D = h("unhandledPromiseRejectionHandler");
        function S(f) {
          c.onUnhandledError(f);
          try {
            const i = t[D];
            "function" == typeof i && i.call(this, f);
          } catch (i) {}
        }
        function G(f) {
          return f && f.then;
        }
        function H(f) {
          return f;
        }
        function E(f) {
          return n.reject(f);
        }
        const _ = h("state"),
          O = h("value"),
          B = h("finally"),
          M = h("parentPromiseValue"),
          X = h("parentPromiseState"),
          Y = null,
          L = !0,
          K = !1;
        function I(f, i) {
          return (l) => {
            try {
              F(f, i, l);
            } catch (d) {
              F(f, !1, d);
            }
          };
        }
        const me = h("currentTaskTrace");
        function F(f, i, l) {
          const d = (function () {
            let f = !1;
            return function (l) {
              return function () {
                f || ((f = !0), l.apply(null, arguments));
              };
            };
          })();
          if (f === l) throw new TypeError("Promise resolved with itself");
          if (f[_] === Y) {
            let w = null;
            try {
              ("object" == typeof l || "function" == typeof l) &&
                (w = l && l.then);
            } catch (R) {
              return (
                d(() => {
                  F(f, !1, R);
                })(),
                f
              );
            }
            if (
              i !== K &&
              l instanceof n &&
              l.hasOwnProperty(_) &&
              l.hasOwnProperty(O) &&
              l[_] !== Y
            )
              ue(l), F(f, l[_], l[O]);
            else if (i !== K && "function" == typeof w)
              try {
                w.call(l, d(I(f, i)), d(I(f, !1)));
              } catch (R) {
                d(() => {
                  F(f, !1, R);
                })();
              }
            else {
              f[_] = i;
              const R = f[O];
              if (
                ((f[O] = l),
                f[B] === B && i === L && ((f[_] = f[X]), (f[O] = f[M])),
                i === K && l instanceof Error)
              ) {
                const k =
                  t.currentTask &&
                  t.currentTask.data &&
                  t.currentTask.data.__creationTrace__;
                k &&
                  a(l, me, {
                    configurable: !0,
                    enumerable: !1,
                    writable: !0,
                    value: k,
                  });
              }
              for (let k = 0; k < R.length; )
                U(f, R[k++], R[k++], R[k++], R[k++]);
              if (0 == R.length && i == K) {
                f[_] = 0;
                let k = l;
                try {
                  throw new Error(
                    "Uncaught (in promise): " +
                      (function u(f) {
                        if (f && f.toString === Object.prototype.toString)
                          return (
                            ((f.constructor && f.constructor.name) || "") +
                            ": " +
                            JSON.stringify(f)
                          );
                        return f
                          ? f.toString()
                          : Object.prototype.toString.call(f);
                      })(l) +
                      (l && l.stack ? "\n" + l.stack : "")
                  );
                } catch (b) {
                  k = b;
                }
                g && (k.throwOriginal = !0),
                  (k.rejection = l),
                  (k.promise = f),
                  (k.zone = t.current),
                  (k.task = t.currentTask),
                  p.push(k),
                  c.scheduleMicroTask();
              }
            }
          }
          return f;
        }
        const ie = h("rejectionHandledHandler");
        function ue(f) {
          if (0 === f[_]) {
            try {
              const i = t[ie];
              i &&
                "function" == typeof i &&
                i.call(this, { rejection: f[O], promise: f });
            } catch (i) {}
            f[_] = K;
            for (let i = 0; i < p.length; i++)
              f === p[i].promise && p.splice(i, 1);
          }
        }
        function U(f, i, l, d, w) {
          ue(f);
          const R = f[_],
            k = R
              ? "function" == typeof d
                ? d
                : H
              : "function" == typeof w
              ? w
              : E;
          i.scheduleMicroTask(
            "Promise.then",
            () => {
              try {
                const b = f[O],
                  C = !!l && B === l[B];
                C && ((l[M] = b), (l[X] = R));
                const A = i.run(k, void 0, C && k !== E && k !== H ? [] : [b]);
                F(l, !0, A);
              } catch (b) {
                F(l, !1, b);
              }
            },
            l
          );
        }
        const o = function () {};
        class n {
          static toString() {
            return "function ZoneAwarePromise() { [native code] }";
          }
          static resolve(i) {
            return F(new this(null), L, i);
          }
          static reject(i) {
            return F(new this(null), K, i);
          }
          static race(i) {
            let l,
              d,
              w = new this((b, C) => {
                (l = b), (d = C);
              });
            function R(b) {
              l(b);
            }
            function k(b) {
              d(b);
            }
            for (let b of i) G(b) || (b = this.resolve(b)), b.then(R, k);
            return w;
          }
          static all(i) {
            return n.allWithCallback(i);
          }
          static allSettled(i) {
            return (
              this && this.prototype instanceof n ? this : n
            ).allWithCallback(i, {
              thenCallback: (d) => ({ status: "fulfilled", value: d }),
              errorCallback: (d) => ({ status: "rejected", reason: d }),
            });
          }
          static allWithCallback(i, l) {
            let d,
              w,
              R = new this((A, W) => {
                (d = A), (w = W);
              }),
              k = 2,
              b = 0;
            const C = [];
            for (let A of i) {
              G(A) || (A = this.resolve(A));
              const W = b;
              try {
                A.then(
                  (ee) => {
                    (C[W] = l ? l.thenCallback(ee) : ee), k--, 0 === k && d(C);
                  },
                  (ee) => {
                    l
                      ? ((C[W] = l.errorCallback(ee)), k--, 0 === k && d(C))
                      : w(ee);
                  }
                );
              } catch (ee) {
                w(ee);
              }
              k++, b++;
            }
            return (k -= 2), 0 === k && d(C), R;
          }
          constructor(i) {
            const l = this;
            if (!(l instanceof n))
              throw new Error("Must be an instanceof Promise.");
            (l[_] = Y), (l[O] = []);
            try {
              i && i(I(l, L), I(l, K));
            } catch (d) {
              F(l, !1, d);
            }
          }
          get [Symbol.toStringTag]() {
            return "Promise";
          }
          get [Symbol.species]() {
            return n;
          }
          then(i, l) {
            let d = this.constructor[Symbol.species];
            (!d || "function" != typeof d) && (d = this.constructor || n);
            const w = new d(o),
              R = t.current;
            return (
              this[_] == Y ? this[O].push(R, w, i, l) : U(this, R, w, i, l), w
            );
          }
          catch(i) {
            return this.then(null, i);
          }
          finally(i) {
            let l = this.constructor[Symbol.species];
            (!l || "function" != typeof l) && (l = n);
            const d = new l(o);
            d[B] = B;
            const w = t.current;
            return (
              this[_] == Y ? this[O].push(w, d, i, i) : U(this, w, d, i, i), d
            );
          }
        }
        (n.resolve = n.resolve),
          (n.reject = n.reject),
          (n.race = n.race),
          (n.all = n.all);
        const s = (e[T] = e.Promise);
        e.Promise = n;
        const y = h("thenPatched");
        function V(f) {
          const i = f.prototype,
            l = r(i, "then");
          if (l && (!1 === l.writable || !l.configurable)) return;
          const d = i.then;
          (i[m] = d),
            (f.prototype.then = function (w, R) {
              return new n((b, C) => {
                d.call(this, b, C);
              }).then(w, R);
            }),
            (f[y] = !0);
        }
        return (
          (c.patchThen = V),
          s &&
            (V(s),
            _e(e, "fetch", (f) =>
              (function fe(f) {
                return function (i, l) {
                  let d = f.apply(i, l);
                  if (d instanceof n) return d;
                  let w = d.constructor;
                  return w[y] || V(w), d;
                };
              })(f)
            )),
          (Promise[t.__symbol__("uncaughtPromiseErrors")] = p),
          n
        );
      }),
        Zone.__load_patch("toString", (e) => {
          const t = Function.prototype.toString,
            c = j("OriginalDelegate"),
            r = j("Promise"),
            a = j("Error"),
            u = function () {
              if ("function" == typeof this) {
                const T = this[c];
                if (T)
                  return "function" == typeof T
                    ? t.call(T)
                    : Object.prototype.toString.call(T);
                if (this === Promise) {
                  const m = e[r];
                  if (m) return t.call(m);
                }
                if (this === Error) {
                  const m = e[a];
                  if (m) return t.call(m);
                }
              }
              return t.call(this);
            };
          (u[c] = t), (Function.prototype.toString = u);
          const h = Object.prototype.toString;
          Object.prototype.toString = function () {
            return "function" == typeof Promise && this instanceof Promise
              ? "[object Promise]"
              : h.call(this);
          };
        });
      let Re = !1;
      if ("undefined" != typeof window)
        try {
          const e = Object.defineProperty({}, "passive", {
            get: function () {
              Re = !0;
            },
          });
          window.addEventListener("test", e, e),
            window.removeEventListener("test", e, e);
        } catch (e) {
          Re = !1;
        }
      const Et = { useG: !0 },
        re = {},
        Je = {},
        Qe = new RegExp("^" + ne + "(\\w+)(true|false)$"),
        Be = j("propagationStopped");
      function et(e, t) {
        const c = (t ? t(e) : e) + $,
          r = (t ? t(e) : e) + z,
          a = ne + c,
          u = ne + r;
        (re[e] = {}), (re[e][$] = a), (re[e][z] = u);
      }
      function Tt(e, t, c) {
        const r = (c && c.add) || se,
          a = (c && c.rm) || te,
          u = (c && c.listeners) || "eventListeners",
          h = (c && c.rmAll) || "removeAllListeners",
          p = j(r),
          g = "." + r + ":",
          T = "prependListener",
          N = function (E, _, O) {
            if (E.isRemoved) return;
            const B = E.callback;
            "object" == typeof B &&
              B.handleEvent &&
              ((E.callback = (X) => B.handleEvent(X)),
              (E.originalDelegate = B)),
              E.invoke(E, _, [O]);
            const M = E.options;
            if (M && "object" == typeof M && M.once) {
              const X = E.originalDelegate ? E.originalDelegate : E.callback;
              _[a].call(_, O.type, X, M);
            }
          },
          D = function (E) {
            if (!(E = E || e.event)) return;
            const _ = this || E.target || e,
              O = _[re[E.type][$]];
            if (O)
              if (1 === O.length) N(O[0], _, E);
              else {
                const B = O.slice();
                for (let M = 0; M < B.length && (!E || !0 !== E[Be]); M++)
                  N(B[M], _, E);
              }
          },
          S = function (E) {
            if (!(E = E || e.event)) return;
            const _ = this || E.target || e,
              O = _[re[E.type][z]];
            if (O)
              if (1 === O.length) N(O[0], _, E);
              else {
                const B = O.slice();
                for (let M = 0; M < B.length && (!E || !0 !== E[Be]); M++)
                  N(B[M], _, E);
              }
          };
        function G(E, _) {
          if (!E) return !1;
          let O = !0;
          _ && void 0 !== _.useG && (O = _.useG);
          const B = _ && _.vh;
          let M = !0;
          _ && void 0 !== _.chkDup && (M = _.chkDup);
          let X = !1;
          _ && void 0 !== _.rt && (X = _.rt);
          let Z = E;
          for (; Z && !Z.hasOwnProperty(r); ) Z = oe(Z);
          if ((!Z && E[r] && (Z = E), !Z || Z[p])) return !1;
          const Y = _ && _.eventNameToString,
            L = {},
            K = (Z[p] = Z[r]),
            v = (Z[j(a)] = Z[a]),
            I = (Z[j(u)] = Z[u]),
            P = (Z[j(h)] = Z[h]);
          let Q;
          function me(i, l) {
            return !Re && "object" == typeof i && i
              ? !!i.capture
              : Re && l
              ? "boolean" == typeof i
                ? { capture: i, passive: !0 }
                : i
                ? "object" == typeof i && !1 !== i.passive
                  ? Object.assign(Object.assign({}, i), { passive: !0 })
                  : i
                : { passive: !0 }
              : i;
          }
          _ && _.prepend && (Q = Z[j(_.prepend)] = Z[_.prepend]);
          const o = O
              ? function (i) {
                  if (!L.isExisting)
                    return K.call(
                      L.target,
                      L.eventName,
                      L.capture ? S : D,
                      L.options
                    );
                }
              : function (i) {
                  return K.call(L.target, L.eventName, i.invoke, L.options);
                },
            n = O
              ? function (i) {
                  if (!i.isRemoved) {
                    const l = re[i.eventName];
                    let d;
                    l && (d = l[i.capture ? z : $]);
                    const w = d && i.target[d];
                    if (w)
                      for (let R = 0; R < w.length; R++)
                        if (w[R] === i) {
                          w.splice(R, 1),
                            (i.isRemoved = !0),
                            0 === w.length &&
                              ((i.allRemoved = !0), (i.target[d] = null));
                          break;
                        }
                  }
                  if (i.allRemoved)
                    return v.call(
                      i.target,
                      i.eventName,
                      i.capture ? S : D,
                      i.options
                    );
                }
              : function (i) {
                  return v.call(i.target, i.eventName, i.invoke, i.options);
                },
            y =
              _ && _.diff
                ? _.diff
                : function (i, l) {
                    const d = typeof l;
                    return (
                      ("function" === d && i.callback === l) ||
                      ("object" === d && i.originalDelegate === l)
                    );
                  },
            V = Zone[j("UNPATCHED_EVENTS")],
            fe = e[j("PASSIVE_EVENTS")],
            f = function (i, l, d, w, R = !1, k = !1) {
              return function () {
                const b = this || e;
                let C = arguments[0];
                _ && _.transferEventName && (C = _.transferEventName(C));
                let A = arguments[1];
                if (!A) return i.apply(this, arguments);
                if (Le && "uncaughtException" === C)
                  return i.apply(this, arguments);
                let W = !1;
                if ("function" != typeof A) {
                  if (!A.handleEvent) return i.apply(this, arguments);
                  W = !0;
                }
                if (B && !B(i, A, b, arguments)) return;
                const ee = Re && !!fe && -1 !== fe.indexOf(C),
                  de = me(arguments[2], ee);
                if (V)
                  for (let ve = 0; ve < V.length; ve++)
                    if (C === V[ve])
                      return ee
                        ? i.call(b, C, A, de)
                        : i.apply(this, arguments);
                const ze = !!de && ("boolean" == typeof de || de.capture),
                  it = !(!de || "object" != typeof de) && de.once,
                  At = Zone.current;
                let Ge = re[C];
                Ge || (et(C, Y), (Ge = re[C]));
                const ct = Ge[ze ? z : $];
                let je,
                  Ze = b[ct],
                  at = !1;
                if (Ze) {
                  if (((at = !0), M))
                    for (let ve = 0; ve < Ze.length; ve++)
                      if (y(Ze[ve], A)) return;
                } else Ze = b[ct] = [];
                const lt = b.constructor.name,
                  ut = Je[lt];
                ut && (je = ut[C]),
                  je || (je = lt + l + (Y ? Y(C) : C)),
                  (L.options = de),
                  it && (L.options.once = !1),
                  (L.target = b),
                  (L.capture = ze),
                  (L.eventName = C),
                  (L.isExisting = at);
                const Oe = O ? Et : void 0;
                Oe && (Oe.taskData = L);
                const Te = At.scheduleEventTask(je, A, Oe, d, w);
                return (
                  (L.target = null),
                  Oe && (Oe.taskData = null),
                  it && (de.once = !0),
                  (!Re && "boolean" == typeof Te.options) || (Te.options = de),
                  (Te.target = b),
                  (Te.capture = ze),
                  (Te.eventName = C),
                  W && (Te.originalDelegate = A),
                  k ? Ze.unshift(Te) : Ze.push(Te),
                  R ? b : void 0
                );
              };
            };
          return (
            (Z[r] = f(K, g, o, n, X)),
            Q &&
              (Z[T] = f(
                Q,
                ".prependListener:",
                function (i) {
                  return Q.call(L.target, L.eventName, i.invoke, L.options);
                },
                n,
                X,
                !0
              )),
            (Z[a] = function () {
              const i = this || e;
              let l = arguments[0];
              _ && _.transferEventName && (l = _.transferEventName(l));
              const d = arguments[2],
                w = !!d && ("boolean" == typeof d || d.capture),
                R = arguments[1];
              if (!R) return v.apply(this, arguments);
              if (B && !B(v, R, i, arguments)) return;
              const k = re[l];
              let b;
              k && (b = k[w ? z : $]);
              const C = b && i[b];
              if (C)
                for (let A = 0; A < C.length; A++) {
                  const W = C[A];
                  if (y(W, R)) {
                    if (
                      (C.splice(A, 1),
                      (W.isRemoved = !0),
                      0 === C.length &&
                        ((W.allRemoved = !0),
                        (i[b] = null),
                        "string" == typeof l))
                    ) {
                      i[ne + "ON_PROPERTY" + l] = null;
                    }
                    return W.zone.cancelTask(W), X ? i : void 0;
                  }
                }
              return v.apply(this, arguments);
            }),
            (Z[u] = function () {
              const i = this || e;
              let l = arguments[0];
              _ && _.transferEventName && (l = _.transferEventName(l));
              const d = [],
                w = tt(i, Y ? Y(l) : l);
              for (let R = 0; R < w.length; R++) {
                const k = w[R];
                let b = k.originalDelegate ? k.originalDelegate : k.callback;
                d.push(b);
              }
              return d;
            }),
            (Z[h] = function () {
              const i = this || e;
              let l = arguments[0];
              if (l) {
                _ && _.transferEventName && (l = _.transferEventName(l));
                const d = re[l];
                if (d) {
                  const w = d[$],
                    R = d[z],
                    k = i[w],
                    b = i[R];
                  if (k) {
                    const C = k.slice();
                    for (let A = 0; A < C.length; A++) {
                      const W = C[A];
                      let ee = W.originalDelegate
                        ? W.originalDelegate
                        : W.callback;
                      this[a].call(this, l, ee, W.options);
                    }
                  }
                  if (b) {
                    const C = b.slice();
                    for (let A = 0; A < C.length; A++) {
                      const W = C[A];
                      let ee = W.originalDelegate
                        ? W.originalDelegate
                        : W.callback;
                      this[a].call(this, l, ee, W.options);
                    }
                  }
                }
              } else {
                const d = Object.keys(i);
                for (let w = 0; w < d.length; w++) {
                  const R = d[w],
                    k = Qe.exec(R);
                  let b = k && k[1];
                  b && "removeListener" !== b && this[h].call(this, b);
                }
                this[h].call(this, "removeListener");
              }
              if (X) return this;
            }),
            pe(Z[r], K),
            pe(Z[a], v),
            P && pe(Z[h], P),
            I && pe(Z[u], I),
            !0
          );
        }
        let H = [];
        for (let E = 0; E < t.length; E++) H[E] = G(t[E], c);
        return H;
      }
      function tt(e, t) {
        if (!t) {
          const u = [];
          for (let h in e) {
            const p = Qe.exec(h);
            let g = p && p[1];
            if (g && (!t || g === t)) {
              const T = e[h];
              if (T) for (let m = 0; m < T.length; m++) u.push(T[m]);
            }
          }
          return u;
        }
        let c = re[t];
        c || (et(t), (c = re[t]));
        const r = e[c[$]],
          a = e[c[z]];
        return r ? (a ? r.concat(a) : r.slice()) : a ? a.slice() : [];
      }
      function gt(e, t) {
        const c = e.Event;
        c &&
          c.prototype &&
          t.patchMethod(
            c.prototype,
            "stopImmediatePropagation",
            (r) =>
              function (a, u) {
                (a[Be] = !0), r && r.apply(a, u);
              }
          );
      }
      function yt(e, t, c, r, a) {
        const u = Zone.__symbol__(r);
        if (t[u]) return;
        const h = (t[u] = t[r]);
        (t[r] = function (p, g, T) {
          return (
            g &&
              g.prototype &&
              a.forEach(function (m) {
                const N = `${c}.${r}::` + m,
                  D = g.prototype;
                if (D.hasOwnProperty(m)) {
                  const S = e.ObjectGetOwnPropertyDescriptor(D, m);
                  S && S.value
                    ? ((S.value = e.wrapWithCurrentZone(S.value, N)),
                      e._redefineProperty(g.prototype, m, S))
                    : D[m] && (D[m] = e.wrapWithCurrentZone(D[m], N));
                } else D[m] && (D[m] = e.wrapWithCurrentZone(D[m], N));
              }),
            h.call(t, p, g, T)
          );
        }),
          e.attachOriginToPatched(t[r], h);
      }
      const Ve = [
          "absolutedeviceorientation",
          "afterinput",
          "afterprint",
          "appinstalled",
          "beforeinstallprompt",
          "beforeprint",
          "beforeunload",
          "devicelight",
          "devicemotion",
          "deviceorientation",
          "deviceorientationabsolute",
          "deviceproximity",
          "hashchange",
          "languagechange",
          "message",
          "mozbeforepaint",
          "offline",
          "online",
          "paint",
          "pageshow",
          "pagehide",
          "popstate",
          "rejectionhandled",
          "storage",
          "unhandledrejection",
          "unload",
          "userproximity",
          "vrdisplayconnected",
          "vrdisplaydisconnected",
          "vrdisplaypresentchange",
        ],
        wt = [
          "encrypted",
          "waitingforkey",
          "msneedkey",
          "mozinterruptbegin",
          "mozinterruptend",
        ],
        nt = ["load"],
        rt = [
          "blur",
          "error",
          "focus",
          "load",
          "resize",
          "scroll",
          "messageerror",
        ],
        Nt = ["bounce", "finish", "start"],
        ot = [
          "loadstart",
          "progress",
          "abort",
          "error",
          "load",
          "progress",
          "timeout",
          "loadend",
          "readystatechange",
        ],
        Ce = [
          "upgradeneeded",
          "complete",
          "abort",
          "success",
          "error",
          "blocked",
          "versionchange",
          "close",
        ],
        Zt = ["close", "error", "open", "message"],
        St = ["error", "message"],
        De = [
          "abort",
          "animationcancel",
          "animationend",
          "animationiteration",
          "auxclick",
          "beforeinput",
          "blur",
          "cancel",
          "canplay",
          "canplaythrough",
          "change",
          "compositionstart",
          "compositionupdate",
          "compositionend",
          "cuechange",
          "click",
          "close",
          "contextmenu",
          "curechange",
          "dblclick",
          "drag",
          "dragend",
          "dragenter",
          "dragexit",
          "dragleave",
          "dragover",
          "drop",
          "durationchange",
          "emptied",
          "ended",
          "error",
          "focus",
          "focusin",
          "focusout",
          "gotpointercapture",
          "input",
          "invalid",
          "keydown",
          "keypress",
          "keyup",
          "load",
          "loadstart",
          "loadeddata",
          "loadedmetadata",
          "lostpointercapture",
          "mousedown",
          "mouseenter",
          "mouseleave",
          "mousemove",
          "mouseout",
          "mouseover",
          "mouseup",
          "mousewheel",
          "orientationchange",
          "pause",
          "play",
          "playing",
          "pointercancel",
          "pointerdown",
          "pointerenter",
          "pointerleave",
          "pointerlockchange",
          "mozpointerlockchange",
          "webkitpointerlockerchange",
          "pointerlockerror",
          "mozpointerlockerror",
          "webkitpointerlockerror",
          "pointermove",
          "pointout",
          "pointerover",
          "pointerup",
          "progress",
          "ratechange",
          "reset",
          "resize",
          "scroll",
          "seeked",
          "seeking",
          "select",
          "selectionchange",
          "selectstart",
          "show",
          "sort",
          "stalled",
          "submit",
          "suspend",
          "timeupdate",
          "volumechange",
          "touchcancel",
          "touchmove",
          "touchstart",
          "touchend",
          "transitioncancel",
          "transitionend",
          "waiting",
          "wheel",
        ].concat(
          [
            "webglcontextrestored",
            "webglcontextlost",
            "webglcontextcreationerror",
          ],
          ["autocomplete", "autocompleteerror"],
          ["toggle"],
          [
            "afterscriptexecute",
            "beforescriptexecute",
            "DOMContentLoaded",
            "freeze",
            "fullscreenchange",
            "mozfullscreenchange",
            "webkitfullscreenchange",
            "msfullscreenchange",
            "fullscreenerror",
            "mozfullscreenerror",
            "webkitfullscreenerror",
            "msfullscreenerror",
            "readystatechange",
            "visibilitychange",
            "resume",
          ],
          Ve,
          [
            "beforecopy",
            "beforecut",
            "beforepaste",
            "copy",
            "cut",
            "paste",
            "dragstart",
            "loadend",
            "animationstart",
            "search",
            "transitionrun",
            "transitionstart",
            "webkitanimationend",
            "webkitanimationiteration",
            "webkitanimationstart",
            "webkittransitionend",
          ],
          [
            "activate",
            "afterupdate",
            "ariarequest",
            "beforeactivate",
            "beforedeactivate",
            "beforeeditfocus",
            "beforeupdate",
            "cellchange",
            "controlselect",
            "dataavailable",
            "datasetchanged",
            "datasetcomplete",
            "errorupdate",
            "filterchange",
            "layoutcomplete",
            "losecapture",
            "move",
            "moveend",
            "movestart",
            "propertychange",
            "resizeend",
            "resizestart",
            "rowenter",
            "rowexit",
            "rowsdelete",
            "rowsinserted",
            "command",
            "compassneedscalibration",
            "deactivate",
            "help",
            "mscontentzoom",
            "msmanipulationstatechanged",
            "msgesturechange",
            "msgesturedoubletap",
            "msgestureend",
            "msgesturehold",
            "msgesturestart",
            "msgesturetap",
            "msgotpointercapture",
            "msinertiastart",
            "mslostpointercapture",
            "mspointercancel",
            "mspointerdown",
            "mspointerenter",
            "mspointerhover",
            "mspointerleave",
            "mspointermove",
            "mspointerout",
            "mspointerover",
            "mspointerup",
            "pointerout",
            "mssitemodejumplistitemremoved",
            "msthumbnailclick",
            "stop",
            "storagecommit",
          ]
        );
      function st(e, t, c) {
        if (!c || 0 === c.length) return t;
        const r = c.filter((u) => u.target === e);
        if (!r || 0 === r.length) return t;
        const a = r[0].ignoreProperties;
        return t.filter((u) => -1 === a.indexOf(u));
      }
      function q(e, t, c, r) {
        if (!e) return;
        Ke(e, st(e, t, c), r);
      }
      function Ot(e, t) {
        if ((Le && !qe) || Zone[e.symbol("patchEvents")]) return;
        const c = "undefined" != typeof WebSocket,
          r = t.__Zone_ignore_on_properties;
        if (xe) {
          const h = window,
            p = (function pt() {
              try {
                const e = Pe.navigator.userAgent;
                if (-1 !== e.indexOf("MSIE ") || -1 !== e.indexOf("Trident/"))
                  return !0;
              } catch (e) {}
              return !1;
            })()
              ? [{ target: h, ignoreProperties: ["error"] }]
              : [];
          q(h, De.concat(["messageerror"]), r && r.concat(p), oe(h)),
            q(Document.prototype, De, r),
            void 0 !== h.SVGElement && q(h.SVGElement.prototype, De, r),
            q(Element.prototype, De, r),
            q(HTMLElement.prototype, De, r),
            q(HTMLMediaElement.prototype, wt, r),
            q(HTMLFrameSetElement.prototype, Ve.concat(rt), r),
            q(HTMLBodyElement.prototype, Ve.concat(rt), r),
            q(HTMLFrameElement.prototype, nt, r),
            q(HTMLIFrameElement.prototype, nt, r);
          const g = h.HTMLMarqueeElement;
          g && q(g.prototype, Nt, r);
          const T = h.Worker;
          T && q(T.prototype, St, r);
        }
        const a = t.XMLHttpRequest;
        a && q(a.prototype, ot, r);
        const u = t.XMLHttpRequestEventTarget;
        u && q(u && u.prototype, ot, r),
          "undefined" != typeof IDBIndex &&
            (q(IDBIndex.prototype, Ce, r),
            q(IDBRequest.prototype, Ce, r),
            q(IDBOpenDBRequest.prototype, Ce, r),
            q(IDBDatabase.prototype, Ce, r),
            q(IDBTransaction.prototype, Ce, r),
            q(IDBCursor.prototype, Ce, r)),
          c && q(WebSocket.prototype, Zt, r);
      }
      Zone.__load_patch("util", (e, t, c) => {
        (c.patchOnProperties = Ke),
          (c.patchMethod = _e),
          (c.bindArguments = He),
          (c.patchMacroTask = _t);
        const r = t.__symbol__("BLACK_LISTED_EVENTS"),
          a = t.__symbol__("UNPATCHED_EVENTS");
        e[a] && (e[r] = e[a]),
          e[r] && (t[r] = t[a] = e[r]),
          (c.patchEventPrototype = gt),
          (c.patchEventTarget = Tt),
          (c.isIEOrEdge = mt),
          (c.ObjectDefineProperty = ae),
          (c.ObjectGetOwnPropertyDescriptor = ce),
          (c.ObjectCreate = be),
          (c.ArraySlice = ye),
          (c.patchClass = Se),
          (c.wrapWithCurrentZone = ke),
          (c.filterProperties = st),
          (c.attachOriginToPatched = pe),
          (c._redefineProperty = Object.defineProperty),
          (c.patchCallbacks = yt),
          (c.getGlobalObjects = () => ({
            globalSources: Je,
            zoneSymbolEventNames: re,
            eventNames: De,
            isBrowser: xe,
            isMix: qe,
            isNode: Le,
            TRUE_STR: z,
            FALSE_STR: $,
            ZONE_SYMBOL_PREFIX: ne,
            ADD_EVENT_LISTENER_STR: se,
            REMOVE_EVENT_LISTENER_STR: te,
          }));
      });
      const Ae = j("zoneTask");
      function Ne(e, t, c, r) {
        let a = null,
          u = null;
        c += r;
        const h = {};
        function p(T) {
          const m = T.data;
          return (
            (m.args[0] = function () {
              return T.invoke.apply(this, arguments);
            }),
            (m.handleId = a.apply(e, m.args)),
            T
          );
        }
        function g(T) {
          return u.call(e, T.data.handleId);
        }
        (a = _e(
          e,
          (t += r),
          (T) =>
            function (m, N) {
              if ("function" == typeof N[0]) {
                const D = {
                    isPeriodic: "Interval" === r,
                    delay:
                      "Timeout" === r || "Interval" === r ? N[1] || 0 : void 0,
                    args: N,
                  },
                  S = N[0];
                N[0] = function () {
                  try {
                    return S.apply(this, arguments);
                  } finally {
                    D.isPeriodic ||
                      ("number" == typeof D.handleId
                        ? delete h[D.handleId]
                        : D.handleId && (D.handleId[Ae] = null));
                  }
                };
                const G = Ee(t, N[0], D, p, g);
                if (!G) return G;
                const H = G.data.handleId;
                return (
                  "number" == typeof H ? (h[H] = G) : H && (H[Ae] = G),
                  H &&
                    H.ref &&
                    H.unref &&
                    "function" == typeof H.ref &&
                    "function" == typeof H.unref &&
                    ((G.ref = H.ref.bind(H)), (G.unref = H.unref.bind(H))),
                  "number" == typeof H || H ? H : G
                );
              }
              return T.apply(e, N);
            }
        )),
          (u = _e(
            e,
            c,
            (T) =>
              function (m, N) {
                const D = N[0];
                let S;
                "number" == typeof D
                  ? (S = h[D])
                  : ((S = D && D[Ae]), S || (S = D)),
                  S && "string" == typeof S.type
                    ? "notScheduled" !== S.state &&
                      ((S.cancelFn && S.data.isPeriodic) || 0 === S.runCount) &&
                      ("number" == typeof D ? delete h[D] : D && (D[Ae] = null),
                      S.zone.cancelTask(S))
                    : T.apply(e, N);
              }
          ));
      }
      Zone.__load_patch("legacy", (e) => {
        const t = e[Zone.__symbol__("legacyPatch")];
        t && t();
      }),
        Zone.__load_patch("queueMicrotask", (e, t, c) => {
          c.patchMethod(
            e,
            "queueMicrotask",
            (r) =>
              function (a, u) {
                t.current.scheduleMicroTask("queueMicrotask", u[0]);
              }
          );
        }),
        Zone.__load_patch("timers", (e) => {
          const t = "set",
            c = "clear";
          Ne(e, t, c, "Timeout"),
            Ne(e, t, c, "Interval"),
            Ne(e, t, c, "Immediate");
        }),
        Zone.__load_patch("requestAnimationFrame", (e) => {
          Ne(e, "request", "cancel", "AnimationFrame"),
            Ne(e, "mozRequest", "mozCancel", "AnimationFrame"),
            Ne(e, "webkitRequest", "webkitCancel", "AnimationFrame");
        }),
        Zone.__load_patch("blocking", (e, t) => {
          const c = ["alert", "prompt", "confirm"];
          for (let r = 0; r < c.length; r++) {
            const a = c[r];
            _e(
              e,
              a,
              (u, h, p) =>
                function (g, T) {
                  return t.current.run(u, e, T, p);
                }
            );
          }
        }),
        Zone.__load_patch("EventTarget", (e, t, c) => {
          (function Mt(e, t) {
            t.patchEventPrototype(e, t);
          })(e, c),
            (function Lt(e, t) {
              if (Zone[t.symbol("patchEventTarget")]) return;
              const {
                eventNames: c,
                zoneSymbolEventNames: r,
                TRUE_STR: a,
                FALSE_STR: u,
                ZONE_SYMBOL_PREFIX: h,
              } = t.getGlobalObjects();
              for (let g = 0; g < c.length; g++) {
                const T = c[g],
                  D = h + (T + u),
                  S = h + (T + a);
                (r[T] = {}), (r[T][u] = D), (r[T][a] = S);
              }
              const p = e.EventTarget;
              return p && p.prototype
                ? (t.patchEventTarget(e, [p && p.prototype]), !0)
                : void 0;
            })(e, c);
          const r = e.XMLHttpRequestEventTarget;
          r && r.prototype && c.patchEventTarget(e, [r.prototype]);
        }),
        Zone.__load_patch("MutationObserver", (e, t, c) => {
          Se("MutationObserver"), Se("WebKitMutationObserver");
        }),
        Zone.__load_patch("IntersectionObserver", (e, t, c) => {
          Se("IntersectionObserver");
        }),
        Zone.__load_patch("FileReader", (e, t, c) => {
          Se("FileReader");
        }),
        Zone.__load_patch("on_property", (e, t, c) => {
          Ot(c, e);
        }),
        Zone.__load_patch("customElements", (e, t, c) => {
          !(function It(e, t) {
            const { isBrowser: c, isMix: r } = t.getGlobalObjects();
            if ((!c && !r) || !e.customElements || !("customElements" in e))
              return;
            t.patchCallbacks(t, e.customElements, "customElements", "define", [
              "connectedCallback",
              "disconnectedCallback",
              "adoptedCallback",
              "attributeChangedCallback",
            ]);
          })(e, c);
        }),
        Zone.__load_patch("XHR", (e, t) => {
          !(function g(T) {
            const m = T.XMLHttpRequest;
            if (!m) return;
            const N = m.prototype;
            let S = N[we],
              G = N[he];
            if (!S) {
              const v = T.XMLHttpRequestEventTarget;
              if (v) {
                const I = v.prototype;
                (S = I[we]), (G = I[he]);
              }
            }
            const H = "readystatechange",
              E = "scheduled";
            function _(v) {
              const I = v.data,
                P = I.target;
              (P[u] = !1), (P[p] = !1);
              const Q = P[a];
              S || ((S = P[we]), (G = P[he])), Q && G.call(P, H, Q);
              const me = (P[a] = () => {
                if (P.readyState === P.DONE)
                  if (!I.aborted && P[u] && v.state === E) {
                    const ie = P[t.__symbol__("loadfalse")];
                    if (0 !== P.status && ie && ie.length > 0) {
                      const ue = v.invoke;
                      (v.invoke = function () {
                        const U = P[t.__symbol__("loadfalse")];
                        for (let x = 0; x < U.length; x++)
                          U[x] === v && U.splice(x, 1);
                        !I.aborted && v.state === E && ue.call(v);
                      }),
                        ie.push(v);
                    } else v.invoke();
                  } else !I.aborted && !1 === P[u] && (P[p] = !0);
              });
              return (
                S.call(P, H, me),
                P[c] || (P[c] = v),
                L.apply(P, I.args),
                (P[u] = !0),
                v
              );
            }
            function O() {}
            function B(v) {
              const I = v.data;
              return (I.aborted = !0), K.apply(I.target, I.args);
            }
            const M = _e(
                N,
                "open",
                () =>
                  function (v, I) {
                    return (v[r] = 0 == I[2]), (v[h] = I[1]), M.apply(v, I);
                  }
              ),
              Z = j("fetchTaskAborting"),
              Y = j("fetchTaskScheduling"),
              L = _e(
                N,
                "send",
                () =>
                  function (v, I) {
                    if (!0 === t.current[Y] || v[r]) return L.apply(v, I);
                    {
                      const P = {
                          target: v,
                          url: v[h],
                          isPeriodic: !1,
                          args: I,
                          aborted: !1,
                        },
                        Q = Ee("XMLHttpRequest.send", O, P, _, B);
                      v &&
                        !0 === v[p] &&
                        !P.aborted &&
                        Q.state === E &&
                        Q.invoke();
                    }
                  }
              ),
              K = _e(
                N,
                "abort",
                () =>
                  function (v, I) {
                    const P = (function D(v) {
                      return v[c];
                    })(v);
                    if (P && "string" == typeof P.type) {
                      if (null == P.cancelFn || (P.data && P.data.aborted))
                        return;
                      P.zone.cancelTask(P);
                    } else if (!0 === t.current[Z]) return K.apply(v, I);
                  }
              );
          })(e);
          const c = j("xhrTask"),
            r = j("xhrSync"),
            a = j("xhrListener"),
            u = j("xhrScheduled"),
            h = j("xhrURL"),
            p = j("xhrErrorBeforeScheduled");
        }),
        Zone.__load_patch("geolocation", (e) => {
          e.navigator &&
            e.navigator.geolocation &&
            (function dt(e, t) {
              const c = e.constructor.name;
              for (let r = 0; r < t.length; r++) {
                const a = t[r],
                  u = e[a];
                if (u) {
                  if (!Ue(ce(e, a))) continue;
                  e[a] = ((p) => {
                    const g = function () {
                      return p.apply(this, He(arguments, c + "." + a));
                    };
                    return pe(g, p), g;
                  })(u);
                }
              }
            })(e.navigator.geolocation, [
              "getCurrentPosition",
              "watchPosition",
            ]);
        }),
        Zone.__load_patch("PromiseRejectionEvent", (e, t) => {
          function c(r) {
            return function (a) {
              tt(e, r).forEach((h) => {
                const p = e.PromiseRejectionEvent;
                if (p) {
                  const g = new p(r, {
                    promise: a.promise,
                    reason: a.rejection,
                  });
                  h.invoke(g);
                }
              });
            };
          }
          e.PromiseRejectionEvent &&
            ((t[j("unhandledPromiseRejectionHandler")] =
              c("unhandledrejection")),
            (t[j("rejectionHandledHandler")] = c("rejectionhandled")));
        });
    },
  },
  (ge) => {
    var oe;
    (oe = 7435), ge((ge.s = oe));
  },
]);
