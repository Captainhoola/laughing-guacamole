(() => {
  var e = {
      452: (e, t, n) => {
        "use strict";
        function r(e, t) {
          const n = Object.create(null),
            r = e.split(",");
          for (let e = 0; e < r.length; e++) n[r[e]] = !0;
          return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e];
        }
        n.d(t, { Z: () => qi });
        const o = r(
          "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
        );
        function i(e) {
          return !!e || "" === e;
        }
        function s(e) {
          if (E(e)) {
            const t = {};
            for (let n = 0; n < e.length; n++) {
              const r = e[n],
                o = T(r) ? l(r) : s(r);
              if (o) for (const e in o) t[e] = o[e];
            }
            return t;
          }
          return T(e) || P(e) ? e : void 0;
        }
        const a = /;(?![^(]*\))/g,
          c = /:(.+)/;
        function l(e) {
          const t = {};
          return (
            e.split(a).forEach((e) => {
              if (e) {
                const n = e.split(c);
                n.length > 1 && (t[n[0].trim()] = n[1].trim());
              }
            }),
            t
          );
        }
        function u(e) {
          let t = "";
          if (T(e)) t = e;
          else if (E(e))
            for (let n = 0; n < e.length; n++) {
              const r = u(e[n]);
              r && (t += r + " ");
            }
          else if (P(e)) for (const n in e) e[n] && (t += n + " ");
          return t.trim();
        }
        const p = (e) =>
            T(e)
              ? e
              : null == e
              ? ""
              : E(e) || (P(e) && (e.toString === N || !j(e.toString)))
              ? JSON.stringify(e, f, 2)
              : String(e),
          f = (e, t) =>
            t && t.__v_isRef
              ? f(e, t.value)
              : A(t)
              ? {
                  [`Map(${t.size})`]: [...t.entries()].reduce(
                    (e, [t, n]) => ((e[`${t} =>`] = n), e),
                    {}
                  ),
                }
              : x(t)
              ? { [`Set(${t.size})`]: [...t.values()] }
              : !P(t) || E(t) || I(t)
              ? t
              : String(t),
          d = {},
          h = [],
          y = () => {},
          m = () => !1,
          g = /^on[^a-z]/,
          v = (e) => g.test(e),
          b = (e) => e.startsWith("onUpdate:"),
          _ = Object.assign,
          w = (e, t) => {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1);
          },
          S = Object.prototype.hasOwnProperty,
          O = (e, t) => S.call(e, t),
          E = Array.isArray,
          A = (e) => "[object Map]" === L(e),
          x = (e) => "[object Set]" === L(e),
          j = (e) => "function" == typeof e,
          T = (e) => "string" == typeof e,
          M = (e) => "symbol" == typeof e,
          P = (e) => null !== e && "object" == typeof e,
          C = (e) => P(e) && j(e.then) && j(e.catch),
          N = Object.prototype.toString,
          L = (e) => N.call(e),
          I = (e) => "[object Object]" === L(e),
          D = (e) =>
            T(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
          R = r(
            ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
          ),
          k = (e) => {
            const t = Object.create(null);
            return (n) => t[n] || (t[n] = e(n));
          },
          U = /-(\w)/g,
          F = k((e) => e.replace(U, (e, t) => (t ? t.toUpperCase() : ""))),
          B = /\B([A-Z])/g,
          z = k((e) => e.replace(B, "-$1").toLowerCase()),
          V = k((e) => e.charAt(0).toUpperCase() + e.slice(1)),
          G = k((e) => (e ? `on${V(e)}` : "")),
          H = (e, t) => !Object.is(e, t),
          $ = (e, t) => {
            for (let n = 0; n < e.length; n++) e[n](t);
          },
          W = (e, t, n) => {
            Object.defineProperty(e, t, {
              configurable: !0,
              enumerable: !1,
              value: n,
            });
          },
          J = (e) => {
            const t = parseFloat(e);
            return isNaN(t) ? e : t;
          };
        let X;
        const Z = () =>
          X ||
          (X =
            "undefined" != typeof globalThis
              ? globalThis
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : void 0 !== n.g
              ? n.g
              : {});
        let q;
        class Q {
          constructor(e = !1) {
            (this.active = !0),
              (this.effects = []),
              (this.cleanups = []),
              !e &&
                q &&
                ((this.parent = q),
                (this.index = (q.scopes || (q.scopes = [])).push(this) - 1));
          }
          run(e) {
            if (this.active) {
              const t = q;
              try {
                return (q = this), e();
              } finally {
                q = t;
              }
            }
          }
          on() {
            q = this;
          }
          off() {
            q = this.parent;
          }
          stop(e) {
            if (this.active) {
              let t, n;
              for (t = 0, n = this.effects.length; t < n; t++)
                this.effects[t].stop();
              for (t = 0, n = this.cleanups.length; t < n; t++)
                this.cleanups[t]();
              if (this.scopes)
                for (t = 0, n = this.scopes.length; t < n; t++)
                  this.scopes[t].stop(!0);
              if (this.parent && !e) {
                const e = this.parent.scopes.pop();
                e &&
                  e !== this &&
                  ((this.parent.scopes[this.index] = e),
                  (e.index = this.index));
              }
              this.active = !1;
            }
          }
        }
        const K = (e) => {
            const t = new Set(e);
            return (t.w = 0), (t.n = 0), t;
          },
          Y = (e) => (e.w & oe) > 0,
          ee = (e) => (e.n & oe) > 0,
          te = new WeakMap();
        let ne,
          re = 0,
          oe = 1;
        const ie = Symbol(""),
          se = Symbol("");
        class ae {
          constructor(e, t = null, n) {
            (this.fn = e),
              (this.scheduler = t),
              (this.active = !0),
              (this.deps = []),
              (this.parent = void 0),
              (function (e, t = q) {
                t && t.active && t.effects.push(e);
              })(this, n);
          }
          run() {
            if (!this.active) return this.fn();
            let e = ne,
              t = le;
            for (; e; ) {
              if (e === this) return;
              e = e.parent;
            }
            try {
              return (
                (this.parent = ne),
                (ne = this),
                (le = !0),
                (oe = 1 << ++re),
                re <= 30
                  ? (({ deps: e }) => {
                      if (e.length)
                        for (let t = 0; t < e.length; t++) e[t].w |= oe;
                    })(this)
                  : ce(this),
                this.fn()
              );
            } finally {
              re <= 30 &&
                ((e) => {
                  const { deps: t } = e;
                  if (t.length) {
                    let n = 0;
                    for (let r = 0; r < t.length; r++) {
                      const o = t[r];
                      Y(o) && !ee(o) ? o.delete(e) : (t[n++] = o),
                        (o.w &= ~oe),
                        (o.n &= ~oe);
                    }
                    t.length = n;
                  }
                })(this),
                (oe = 1 << --re),
                (ne = this.parent),
                (le = t),
                (this.parent = void 0),
                this.deferStop && this.stop();
            }
          }
          stop() {
            ne === this
              ? (this.deferStop = !0)
              : this.active &&
                (ce(this), this.onStop && this.onStop(), (this.active = !1));
          }
        }
        function ce(e) {
          const { deps: t } = e;
          if (t.length) {
            for (let n = 0; n < t.length; n++) t[n].delete(e);
            t.length = 0;
          }
        }
        let le = !0;
        const ue = [];
        function pe() {
          ue.push(le), (le = !1);
        }
        function fe() {
          const e = ue.pop();
          le = void 0 === e || e;
        }
        function de(e, t, n) {
          if (le && ne) {
            let t = te.get(e);
            t || te.set(e, (t = new Map()));
            let r = t.get(n);
            r || t.set(n, (r = K())), he(r);
          }
        }
        function he(e, t) {
          let n = !1;
          re <= 30 ? ee(e) || ((e.n |= oe), (n = !Y(e))) : (n = !e.has(ne)),
            n && (e.add(ne), ne.deps.push(e));
        }
        function ye(e, t, n, r, o, i) {
          const s = te.get(e);
          if (!s) return;
          let a = [];
          if ("clear" === t) a = [...s.values()];
          else if ("length" === n && E(e))
            s.forEach((e, t) => {
              ("length" === t || t >= r) && a.push(e);
            });
          else
            switch ((void 0 !== n && a.push(s.get(n)), t)) {
              case "add":
                E(e)
                  ? D(n) && a.push(s.get("length"))
                  : (a.push(s.get(ie)), A(e) && a.push(s.get(se)));
                break;
              case "delete":
                E(e) || (a.push(s.get(ie)), A(e) && a.push(s.get(se)));
                break;
              case "set":
                A(e) && a.push(s.get(ie));
            }
          if (1 === a.length) a[0] && me(a[0]);
          else {
            const e = [];
            for (const t of a) t && e.push(...t);
            me(K(e));
          }
        }
        function me(e, t) {
          const n = E(e) ? e : [...e];
          for (const e of n) e.computed && ge(e);
          for (const e of n) e.computed || ge(e);
        }
        function ge(e, t) {
          (e !== ne || e.allowRecurse) &&
            (e.scheduler ? e.scheduler() : e.run());
        }
        const ve = r("__proto__,__v_isRef,__isVue"),
          be = new Set(
            Object.getOwnPropertyNames(Symbol)
              .filter((e) => "arguments" !== e && "caller" !== e)
              .map((e) => Symbol[e])
              .filter(M)
          ),
          _e = Ae(),
          we = Ae(!1, !0),
          Se = Ae(!0),
          Oe = Ee();
        function Ee() {
          const e = {};
          return (
            ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
              e[t] = function (...e) {
                const n = ct(this);
                for (let e = 0, t = this.length; e < t; e++) de(n, 0, e + "");
                const r = n[t](...e);
                return -1 === r || !1 === r ? n[t](...e.map(ct)) : r;
              };
            }),
            ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
              e[t] = function (...e) {
                pe();
                const n = ct(this)[t].apply(this, e);
                return fe(), n;
              };
            }),
            e
          );
        }
        function Ae(e = !1, t = !1) {
          return function (n, r, o) {
            if ("__v_isReactive" === r) return !e;
            if ("__v_isReadonly" === r) return e;
            if ("__v_isShallow" === r) return t;
            if (
              "__v_raw" === r &&
              o === (e ? (t ? et : Ye) : t ? Ke : Qe).get(n)
            )
              return n;
            const i = E(n);
            if (!e && i && O(Oe, r)) return Reflect.get(Oe, r, o);
            const s = Reflect.get(n, r, o);
            return (M(r) ? be.has(r) : ve(r))
              ? s
              : (e || de(n, 0, r),
                t
                  ? s
                  : ft(s)
                  ? i && D(r)
                    ? s
                    : s.value
                  : P(s)
                  ? e
                    ? nt(s)
                    : tt(s)
                  : s);
          };
        }
        function xe(e = !1) {
          return function (t, n, r, o) {
            let i = t[n];
            if (it(i) && ft(i) && !ft(r)) return !1;
            if (
              !e &&
              !it(r) &&
              (st(r) || ((r = ct(r)), (i = ct(i))), !E(t) && ft(i) && !ft(r))
            )
              return (i.value = r), !0;
            const s = E(t) && D(n) ? Number(n) < t.length : O(t, n),
              a = Reflect.set(t, n, r, o);
            return (
              t === ct(o) &&
                (s ? H(r, i) && ye(t, "set", n, r) : ye(t, "add", n, r)),
              a
            );
          };
        }
        const je = {
            get: _e,
            set: xe(),
            deleteProperty: function (e, t) {
              const n = O(e, t),
                r = (e[t], Reflect.deleteProperty(e, t));
              return r && n && ye(e, "delete", t, void 0), r;
            },
            has: function (e, t) {
              const n = Reflect.has(e, t);
              return (M(t) && be.has(t)) || de(e, 0, t), n;
            },
            ownKeys: function (e) {
              return de(e, 0, E(e) ? "length" : ie), Reflect.ownKeys(e);
            },
          },
          Te = { get: Se, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
          Me = _({}, je, { get: we, set: xe(!0) }),
          Pe = (e) => e,
          Ce = (e) => Reflect.getPrototypeOf(e);
        function Ne(e, t, n = !1, r = !1) {
          const o = ct((e = e.__v_raw)),
            i = ct(t);
          n || (t !== i && de(o, 0, t), de(o, 0, i));
          const { has: s } = Ce(o),
            a = r ? Pe : n ? pt : ut;
          return s.call(o, t)
            ? a(e.get(t))
            : s.call(o, i)
            ? a(e.get(i))
            : void (e !== o && e.get(t));
        }
        function Le(e, t = !1) {
          const n = this.__v_raw,
            r = ct(n),
            o = ct(e);
          return (
            t || (e !== o && de(r, 0, e), de(r, 0, o)),
            e === o ? n.has(e) : n.has(e) || n.has(o)
          );
        }
        function Ie(e, t = !1) {
          return (
            (e = e.__v_raw), !t && de(ct(e), 0, ie), Reflect.get(e, "size", e)
          );
        }
        function De(e) {
          e = ct(e);
          const t = ct(this);
          return Ce(t).has.call(t, e) || (t.add(e), ye(t, "add", e, e)), this;
        }
        function Re(e, t) {
          t = ct(t);
          const n = ct(this),
            { has: r, get: o } = Ce(n);
          let i = r.call(n, e);
          i || ((e = ct(e)), (i = r.call(n, e)));
          const s = o.call(n, e);
          return (
            n.set(e, t),
            i ? H(t, s) && ye(n, "set", e, t) : ye(n, "add", e, t),
            this
          );
        }
        function ke(e) {
          const t = ct(this),
            { has: n, get: r } = Ce(t);
          let o = n.call(t, e);
          o || ((e = ct(e)), (o = n.call(t, e))), r && r.call(t, e);
          const i = t.delete(e);
          return o && ye(t, "delete", e, void 0), i;
        }
        function Ue() {
          const e = ct(this),
            t = 0 !== e.size,
            n = e.clear();
          return t && ye(e, "clear", void 0, void 0), n;
        }
        function Fe(e, t) {
          return function (n, r) {
            const o = this,
              i = o.__v_raw,
              s = ct(i),
              a = t ? Pe : e ? pt : ut;
            return (
              !e && de(s, 0, ie), i.forEach((e, t) => n.call(r, a(e), a(t), o))
            );
          };
        }
        function Be(e, t, n) {
          return function (...r) {
            const o = this.__v_raw,
              i = ct(o),
              s = A(i),
              a = "entries" === e || (e === Symbol.iterator && s),
              c = "keys" === e && s,
              l = o[e](...r),
              u = n ? Pe : t ? pt : ut;
            return (
              !t && de(i, 0, c ? se : ie),
              {
                next() {
                  const { value: e, done: t } = l.next();
                  return t
                    ? { value: e, done: t }
                    : { value: a ? [u(e[0]), u(e[1])] : u(e), done: t };
                },
                [Symbol.iterator]() {
                  return this;
                },
              }
            );
          };
        }
        function ze(e) {
          return function (...t) {
            return "delete" !== e && this;
          };
        }
        function Ve() {
          const e = {
              get(e) {
                return Ne(this, e);
              },
              get size() {
                return Ie(this);
              },
              has: Le,
              add: De,
              set: Re,
              delete: ke,
              clear: Ue,
              forEach: Fe(!1, !1),
            },
            t = {
              get(e) {
                return Ne(this, e, !1, !0);
              },
              get size() {
                return Ie(this);
              },
              has: Le,
              add: De,
              set: Re,
              delete: ke,
              clear: Ue,
              forEach: Fe(!1, !0),
            },
            n = {
              get(e) {
                return Ne(this, e, !0);
              },
              get size() {
                return Ie(this, !0);
              },
              has(e) {
                return Le.call(this, e, !0);
              },
              add: ze("add"),
              set: ze("set"),
              delete: ze("delete"),
              clear: ze("clear"),
              forEach: Fe(!0, !1),
            },
            r = {
              get(e) {
                return Ne(this, e, !0, !0);
              },
              get size() {
                return Ie(this, !0);
              },
              has(e) {
                return Le.call(this, e, !0);
              },
              add: ze("add"),
              set: ze("set"),
              delete: ze("delete"),
              clear: ze("clear"),
              forEach: Fe(!0, !0),
            };
          return (
            ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
              (e[o] = Be(o, !1, !1)),
                (n[o] = Be(o, !0, !1)),
                (t[o] = Be(o, !1, !0)),
                (r[o] = Be(o, !0, !0));
            }),
            [e, n, t, r]
          );
        }
        const [Ge, He, $e, We] = Ve();
        function Je(e, t) {
          const n = t ? (e ? We : $e) : e ? He : Ge;
          return (t, r, o) =>
            "__v_isReactive" === r
              ? !e
              : "__v_isReadonly" === r
              ? e
              : "__v_raw" === r
              ? t
              : Reflect.get(O(n, r) && r in t ? n : t, r, o);
        }
        const Xe = { get: Je(!1, !1) },
          Ze = { get: Je(!1, !0) },
          qe = { get: Je(!0, !1) },
          Qe = new WeakMap(),
          Ke = new WeakMap(),
          Ye = new WeakMap(),
          et = new WeakMap();
        function tt(e) {
          return it(e) ? e : rt(e, !1, je, Xe, Qe);
        }
        function nt(e) {
          return rt(e, !0, Te, qe, Ye);
        }
        function rt(e, t, n, r, o) {
          if (!P(e)) return e;
          if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
          const i = o.get(e);
          if (i) return i;
          const s =
            (a = e).__v_skip || !Object.isExtensible(a)
              ? 0
              : (function (e) {
                  switch (e) {
                    case "Object":
                    case "Array":
                      return 1;
                    case "Map":
                    case "Set":
                    case "WeakMap":
                    case "WeakSet":
                      return 2;
                    default:
                      return 0;
                  }
                })(((e) => L(e).slice(8, -1))(a));
          var a;
          if (0 === s) return e;
          const c = new Proxy(e, 2 === s ? r : n);
          return o.set(e, c), c;
        }
        function ot(e) {
          return it(e) ? ot(e.__v_raw) : !(!e || !e.__v_isReactive);
        }
        function it(e) {
          return !(!e || !e.__v_isReadonly);
        }
        function st(e) {
          return !(!e || !e.__v_isShallow);
        }
        function at(e) {
          return ot(e) || it(e);
        }
        function ct(e) {
          const t = e && e.__v_raw;
          return t ? ct(t) : e;
        }
        function lt(e) {
          return W(e, "__v_skip", !0), e;
        }
        const ut = (e) => (P(e) ? tt(e) : e),
          pt = (e) => (P(e) ? nt(e) : e);
        function ft(e) {
          return !(!e || !0 !== e.__v_isRef);
        }
        const dt = {
          get: (e, t, n) => {
            return ft((r = Reflect.get(e, t, n))) ? r.value : r;
            var r;
          },
          set: (e, t, n, r) => {
            const o = e[t];
            return ft(o) && !ft(n)
              ? ((o.value = n), !0)
              : Reflect.set(e, t, n, r);
          },
        };
        function ht(e) {
          return ot(e) ? e : new Proxy(e, dt);
        }
        class yt {
          constructor(e, t, n, r) {
            (this._setter = t),
              (this.dep = void 0),
              (this.__v_isRef = !0),
              (this._dirty = !0),
              (this.effect = new ae(e, () => {
                var e;
                this._dirty ||
                  ((this._dirty = !0), (e = ct((e = this))).dep && me(e.dep));
              })),
              (this.effect.computed = this),
              (this.effect.active = this._cacheable = !r),
              (this.__v_isReadonly = n);
          }
          get value() {
            const e = ct(this);
            return (
              (t = e),
              le && ne && he((t = ct(t)).dep || (t.dep = K())),
              (!e._dirty && e._cacheable) ||
                ((e._dirty = !1), (e._value = e.effect.run())),
              e._value
            );
            var t;
          }
          set value(e) {
            this._setter(e);
          }
        }
        function mt(e, t, n, r) {
          let o;
          try {
            o = r ? e(...r) : e();
          } catch (e) {
            vt(e, t, n);
          }
          return o;
        }
        function gt(e, t, n, r) {
          if (j(e)) {
            const o = mt(e, t, n, r);
            return (
              o &&
                C(o) &&
                o.catch((e) => {
                  vt(e, t, n);
                }),
              o
            );
          }
          const o = [];
          for (let i = 0; i < e.length; i++) o.push(gt(e[i], t, n, r));
          return o;
        }
        function vt(e, t, n, r = !0) {
          if ((t && t.vnode, t)) {
            let r = t.parent;
            const o = t.proxy,
              i = n;
            for (; r; ) {
              const t = r.ec;
              if (t)
                for (let n = 0; n < t.length; n++)
                  if (!1 === t[n](e, o, i)) return;
              r = r.parent;
            }
            const s = t.appContext.config.errorHandler;
            if (s) return void mt(s, null, 10, [e, o, i]);
          }
          !(function (e, t, n, r = !0) {
            console.error(e);
          })(e, 0, 0, r);
        }
        let bt = !1,
          _t = !1;
        const wt = [];
        let St = 0;
        const Ot = [];
        let Et = null,
          At = 0;
        const xt = [];
        let jt = null,
          Tt = 0;
        const Mt = Promise.resolve();
        let Pt = null,
          Ct = null;
        function Nt(e) {
          const t = Pt || Mt;
          return e ? t.then(this ? e.bind(this) : e) : t;
        }
        function Lt(e) {
          (wt.length && wt.includes(e, bt && e.allowRecurse ? St + 1 : St)) ||
            e === Ct ||
            (null == e.id
              ? wt.push(e)
              : wt.splice(
                  (function (e) {
                    let t = St + 1,
                      n = wt.length;
                    for (; t < n; ) {
                      const r = (t + n) >>> 1;
                      Ut(wt[r]) < e ? (t = r + 1) : (n = r);
                    }
                    return t;
                  })(e.id),
                  0,
                  e
                ),
            It());
        }
        function It() {
          bt || _t || ((_t = !0), (Pt = Mt.then(Ft)));
        }
        function Dt(e, t, n, r) {
          E(e)
            ? n.push(...e)
            : (t && t.includes(e, e.allowRecurse ? r + 1 : r)) || n.push(e),
            It();
        }
        function Rt(e, t = null) {
          if (Ot.length) {
            for (
              Ct = t, Et = [...new Set(Ot)], Ot.length = 0, At = 0;
              At < Et.length;
              At++
            )
              Et[At]();
            (Et = null), (At = 0), (Ct = null), Rt(e, t);
          }
        }
        function kt(e) {
          if ((Rt(), xt.length)) {
            const e = [...new Set(xt)];
            if (((xt.length = 0), jt)) return void jt.push(...e);
            for (
              jt = e, jt.sort((e, t) => Ut(e) - Ut(t)), Tt = 0;
              Tt < jt.length;
              Tt++
            )
              jt[Tt]();
            (jt = null), (Tt = 0);
          }
        }
        const Ut = (e) => (null == e.id ? 1 / 0 : e.id);
        function Ft(e) {
          (_t = !1), (bt = !0), Rt(e), wt.sort((e, t) => Ut(e) - Ut(t));
          try {
            for (St = 0; St < wt.length; St++) {
              const e = wt[St];
              e && !1 !== e.active && mt(e, null, 14);
            }
          } finally {
            (St = 0),
              (wt.length = 0),
              kt(),
              (bt = !1),
              (Pt = null),
              (wt.length || Ot.length || xt.length) && Ft(e);
          }
        }
        new Set(), new Map();
        let Bt,
          zt = [],
          Vt = !1;
        function Gt(e, ...t) {
          Bt ? Bt.emit(e, ...t) : Vt || zt.push({ event: e, args: t });
        }
        function Ht(e, t) {
          var n, r;
          (Bt = e),
            Bt
              ? ((Bt.enabled = !0),
                zt.forEach(({ event: e, args: t }) => Bt.emit(e, ...t)),
                (zt = []))
              : "undefined" != typeof window &&
                window.HTMLElement &&
                !(null ===
                  (r =
                    null === (n = window.navigator) || void 0 === n
                      ? void 0
                      : n.userAgent) || void 0 === r
                  ? void 0
                  : r.includes("jsdom"))
              ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ =
                  t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((e) => {
                  Ht(e, t);
                }),
                setTimeout(() => {
                  Bt ||
                    ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null),
                    (Vt = !0),
                    (zt = []));
                }, 3e3))
              : ((Vt = !0), (zt = []));
        }
        const $t = Xt("component:added"),
          Wt = Xt("component:updated"),
          Jt = Xt("component:removed");
        function Xt(e) {
          return (t) => {
            Gt(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
          };
        }
        function Zt(e, t, ...n) {
          if (e.isUnmounted) return;
          const r = e.vnode.props || d;
          let o = n;
          const i = t.startsWith("update:"),
            s = i && t.slice(7);
          if (s && s in r) {
            const e = `${"modelValue" === s ? "model" : s}Modifiers`,
              { number: t, trim: i } = r[e] || d;
            i && (o = n.map((e) => e.trim())), t && (o = n.map(J));
          }
          let a;
          __VUE_PROD_DEVTOOLS__ &&
            (function (e, t, n) {
              Gt("component:emit", e.appContext.app, e, t, n);
            })(e, t, o);
          let c = r[(a = G(t))] || r[(a = G(F(t)))];
          !c && i && (c = r[(a = G(z(t)))]), c && gt(c, e, 6, o);
          const l = r[a + "Once"];
          if (l) {
            if (e.emitted) {
              if (e.emitted[a]) return;
            } else e.emitted = {};
            (e.emitted[a] = !0), gt(l, e, 6, o);
          }
        }
        function qt(e, t, n = !1) {
          const r = t.emitsCache,
            o = r.get(e);
          if (void 0 !== o) return o;
          const i = e.emits;
          let s = {},
            a = !1;
          if (__VUE_OPTIONS_API__ && !j(e)) {
            const r = (e) => {
              const n = qt(e, t, !0);
              n && ((a = !0), _(s, n));
            };
            !n && t.mixins.length && t.mixins.forEach(r),
              e.extends && r(e.extends),
              e.mixins && e.mixins.forEach(r);
          }
          return i || a
            ? (E(i) ? i.forEach((e) => (s[e] = null)) : _(s, i), r.set(e, s), s)
            : (r.set(e, null), null);
        }
        function Qt(e, t) {
          return (
            !(!e || !v(t)) &&
            ((t = t.slice(2).replace(/Once$/, "")),
            O(e, t[0].toLowerCase() + t.slice(1)) || O(e, z(t)) || O(e, t))
          );
        }
        let Kt = null,
          Yt = null;
        function en(e) {
          const t = Kt;
          return (Kt = e), (Yt = (e && e.type.__scopeId) || null), t;
        }
        function tn(e) {
          const {
            type: t,
            vnode: n,
            proxy: r,
            withProxy: o,
            props: i,
            propsOptions: [s],
            slots: a,
            attrs: c,
            emit: l,
            render: u,
            renderCache: p,
            data: f,
            setupState: d,
            ctx: h,
            inheritAttrs: y,
          } = e;
          let m, g;
          const v = en(e);
          try {
            if (4 & n.shapeFlag) {
              const e = o || r;
              (m = $r(u.call(e, e, p, i, d, f, h))), (g = c);
            } else {
              const e = t;
              (m = $r(
                e.length > 1
                  ? e(i, { attrs: c, slots: a, emit: l })
                  : e(i, null)
              )),
                (g = t.props ? c : nn(c));
            }
          } catch (t) {
            (jr.length = 0), vt(t, e, 1), (m = zr(Ar));
          }
          let _ = m;
          if (g && !1 !== y) {
            const e = Object.keys(g),
              { shapeFlag: t } = _;
            e.length &&
              7 & t &&
              (s && e.some(b) && (g = rn(g, s)), (_ = Vr(_, g)));
          }
          return (
            n.dirs &&
              ((_ = Vr(_)), (_.dirs = _.dirs ? _.dirs.concat(n.dirs) : n.dirs)),
            n.transition && (_.transition = n.transition),
            (m = _),
            en(v),
            m
          );
        }
        const nn = (e) => {
            let t;
            for (const n in e)
              ("class" === n || "style" === n || v(n)) &&
                ((t || (t = {}))[n] = e[n]);
            return t;
          },
          rn = (e, t) => {
            const n = {};
            for (const r in e) (b(r) && r.slice(9) in t) || (n[r] = e[r]);
            return n;
          };
        function on(e, t, n) {
          const r = Object.keys(t);
          if (r.length !== Object.keys(e).length) return !0;
          for (let o = 0; o < r.length; o++) {
            const i = r[o];
            if (t[i] !== e[i] && !Qt(n, i)) return !0;
          }
          return !1;
        }
        function sn(e, t, n = !1) {
          const r = Qr || Kt;
          if (r) {
            const o =
              null == r.parent
                ? r.vnode.appContext && r.vnode.appContext.provides
                : r.parent.provides;
            if (o && e in o) return o[e];
            if (arguments.length > 1) return n && j(t) ? t.call(r.proxy) : t;
          }
        }
        const an = {};
        function cn(e, t, n) {
          return ln(e, t, n);
        }
        function ln(
          e,
          t,
          { immediate: n, deep: r, flush: o, onTrack: i, onTrigger: s } = d
        ) {
          const a = Qr;
          let c,
            l,
            u = !1,
            p = !1;
          if (
            (ft(e)
              ? ((c = () => e.value), (u = st(e)))
              : ot(e)
              ? ((c = () => e), (r = !0))
              : E(e)
              ? ((p = !0),
                (u = e.some((e) => ot(e) || st(e))),
                (c = () =>
                  e.map((e) =>
                    ft(e)
                      ? e.value
                      : ot(e)
                      ? fn(e)
                      : j(e)
                      ? mt(e, a, 2)
                      : void 0
                  )))
              : (c = j(e)
                  ? t
                    ? () => mt(e, a, 2)
                    : () => {
                        if (!a || !a.isUnmounted)
                          return l && l(), gt(e, a, 3, [f]);
                      }
                  : y),
            t && r)
          ) {
            const e = c;
            c = () => fn(e());
          }
          let f = (e) => {
            l = v.onStop = () => {
              mt(e, a, 4);
            };
          };
          if (no)
            return (
              (f = y), t ? n && gt(t, a, 3, [c(), p ? [] : void 0, f]) : c(), y
            );
          let h = p ? [] : an;
          const m = () => {
            if (v.active)
              if (t) {
                const e = v.run();
                (r || u || (p ? e.some((e, t) => H(e, h[t])) : H(e, h))) &&
                  (l && l(),
                  gt(t, a, 3, [e, h === an ? void 0 : h, f]),
                  (h = e));
              } else v.run();
          };
          let g;
          (m.allowRecurse = !!t),
            (g =
              "sync" === o
                ? m
                : "post" === o
                ? () => br(m, a && a.suspense)
                : () =>
                    (function (e) {
                      Dt(e, Et, Ot, At);
                    })(m));
          const v = new ae(c, g);
          return (
            t
              ? n
                ? m()
                : (h = v.run())
              : "post" === o
              ? br(v.run.bind(v), a && a.suspense)
              : v.run(),
            () => {
              v.stop(), a && a.scope && w(a.scope.effects, v);
            }
          );
        }
        function un(e, t, n) {
          const r = this.proxy,
            o = T(e) ? (e.includes(".") ? pn(r, e) : () => r[e]) : e.bind(r, r);
          let i;
          j(t) ? (i = t) : ((i = t.handler), (n = t));
          const s = Qr;
          Yr(this);
          const a = ln(o, i.bind(r), n);
          return s ? Yr(s) : eo(), a;
        }
        function pn(e, t) {
          const n = t.split(".");
          return () => {
            let t = e;
            for (let e = 0; e < n.length && t; e++) t = t[n[e]];
            return t;
          };
        }
        function fn(e, t) {
          if (!P(e) || e.__v_skip) return e;
          if ((t = t || new Set()).has(e)) return e;
          if ((t.add(e), ft(e))) fn(e.value, t);
          else if (E(e)) for (let n = 0; n < e.length; n++) fn(e[n], t);
          else if (x(e) || A(e))
            e.forEach((e) => {
              fn(e, t);
            });
          else if (I(e)) for (const n in e) fn(e[n], t);
          return e;
        }
        const dn = [Function, Array],
          hn = {
            name: "BaseTransition",
            props: {
              mode: String,
              appear: Boolean,
              persisted: Boolean,
              onBeforeEnter: dn,
              onEnter: dn,
              onAfterEnter: dn,
              onEnterCancelled: dn,
              onBeforeLeave: dn,
              onLeave: dn,
              onAfterLeave: dn,
              onLeaveCancelled: dn,
              onBeforeAppear: dn,
              onAppear: dn,
              onAfterAppear: dn,
              onAppearCancelled: dn,
            },
            setup(e, { slots: t }) {
              const n = Kr(),
                r = (function () {
                  const e = {
                    isMounted: !1,
                    isLeaving: !1,
                    isUnmounting: !1,
                    leavingVNodes: new Map(),
                  };
                  return (
                    Pn(() => {
                      e.isMounted = !0;
                    }),
                    Ln(() => {
                      e.isUnmounting = !0;
                    }),
                    e
                  );
                })();
              let o;
              return () => {
                const i = t.default && _n(t.default(), !0);
                if (!i || !i.length) return;
                let s = i[0];
                if (i.length > 1) {
                  let e = !1;
                  for (const t of i)
                    if (t.type !== Ar) {
                      (s = t), (e = !0);
                      break;
                    }
                }
                const a = ct(e),
                  { mode: c } = a;
                if (r.isLeaving) return gn(s);
                const l = vn(s);
                if (!l) return gn(s);
                const u = mn(l, a, r, n);
                bn(l, u);
                const p = n.subTree,
                  f = p && vn(p);
                let d = !1;
                const { getTransitionKey: h } = l.type;
                if (h) {
                  const e = h();
                  void 0 === o ? (o = e) : e !== o && ((o = e), (d = !0));
                }
                if (f && f.type !== Ar && (!Rr(l, f) || d)) {
                  const e = mn(f, a, r, n);
                  if ((bn(f, e), "out-in" === c))
                    return (
                      (r.isLeaving = !0),
                      (e.afterLeave = () => {
                        (r.isLeaving = !1), n.update();
                      }),
                      gn(s)
                    );
                  "in-out" === c &&
                    l.type !== Ar &&
                    (e.delayLeave = (e, t, n) => {
                      (yn(r, f)[String(f.key)] = f),
                        (e._leaveCb = () => {
                          t(), (e._leaveCb = void 0), delete u.delayedLeave;
                        }),
                        (u.delayedLeave = n);
                    });
                }
                return s;
              };
            },
          };
        function yn(e, t) {
          const { leavingVNodes: n } = e;
          let r = n.get(t.type);
          return r || ((r = Object.create(null)), n.set(t.type, r)), r;
        }
        function mn(e, t, n, r) {
          const {
              appear: o,
              mode: i,
              persisted: s = !1,
              onBeforeEnter: a,
              onEnter: c,
              onAfterEnter: l,
              onEnterCancelled: u,
              onBeforeLeave: p,
              onLeave: f,
              onAfterLeave: d,
              onLeaveCancelled: h,
              onBeforeAppear: y,
              onAppear: m,
              onAfterAppear: g,
              onAppearCancelled: v,
            } = t,
            b = String(e.key),
            _ = yn(n, e),
            w = (e, t) => {
              e && gt(e, r, 9, t);
            },
            S = (e, t) => {
              const n = t[1];
              w(e, t),
                E(e)
                  ? e.every((e) => e.length <= 1) && n()
                  : e.length <= 1 && n();
            },
            O = {
              mode: i,
              persisted: s,
              beforeEnter(t) {
                let r = a;
                if (!n.isMounted) {
                  if (!o) return;
                  r = y || a;
                }
                t._leaveCb && t._leaveCb(!0);
                const i = _[b];
                i && Rr(e, i) && i.el._leaveCb && i.el._leaveCb(), w(r, [t]);
              },
              enter(e) {
                let t = c,
                  r = l,
                  i = u;
                if (!n.isMounted) {
                  if (!o) return;
                  (t = m || c), (r = g || l), (i = v || u);
                }
                let s = !1;
                const a = (e._enterCb = (t) => {
                  s ||
                    ((s = !0),
                    w(t ? i : r, [e]),
                    O.delayedLeave && O.delayedLeave(),
                    (e._enterCb = void 0));
                });
                t ? S(t, [e, a]) : a();
              },
              leave(t, r) {
                const o = String(e.key);
                if ((t._enterCb && t._enterCb(!0), n.isUnmounting)) return r();
                w(p, [t]);
                let i = !1;
                const s = (t._leaveCb = (n) => {
                  i ||
                    ((i = !0),
                    r(),
                    w(n ? h : d, [t]),
                    (t._leaveCb = void 0),
                    _[o] === e && delete _[o]);
                });
                (_[o] = e), f ? S(f, [t, s]) : s();
              },
              clone: (e) => mn(e, t, n, r),
            };
          return O;
        }
        function gn(e) {
          if (Sn(e)) return ((e = Vr(e)).children = null), e;
        }
        function vn(e) {
          return Sn(e) ? (e.children ? e.children[0] : void 0) : e;
        }
        function bn(e, t) {
          6 & e.shapeFlag && e.component
            ? bn(e.component.subTree, t)
            : 128 & e.shapeFlag
            ? ((e.ssContent.transition = t.clone(e.ssContent)),
              (e.ssFallback.transition = t.clone(e.ssFallback)))
            : (e.transition = t);
        }
        function _n(e, t = !1, n) {
          let r = [],
            o = 0;
          for (let i = 0; i < e.length; i++) {
            let s = e[i];
            const a =
              null == n ? s.key : String(n) + String(null != s.key ? s.key : i);
            s.type === Or
              ? (128 & s.patchFlag && o++, (r = r.concat(_n(s.children, t, a))))
              : (t || s.type !== Ar) &&
                r.push(null != a ? Vr(s, { key: a }) : s);
          }
          if (o > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
          return r;
        }
        const wn = (e) => !!e.type.__asyncLoader,
          Sn = (e) => e.type.__isKeepAlive;
        function On(e, t) {
          An(e, "a", t);
        }
        function En(e, t) {
          An(e, "da", t);
        }
        function An(e, t, n = Qr) {
          const r =
            e.__wdc ||
            (e.__wdc = () => {
              let t = n;
              for (; t; ) {
                if (t.isDeactivated) return;
                t = t.parent;
              }
              return e();
            });
          if ((jn(t, r, n), n)) {
            let e = n.parent;
            for (; e && e.parent; )
              Sn(e.parent.vnode) && xn(r, t, n, e), (e = e.parent);
          }
        }
        function xn(e, t, n, r) {
          const o = jn(t, e, r, !0);
          In(() => {
            w(r[t], o);
          }, n);
        }
        function jn(e, t, n = Qr, r = !1) {
          if (n) {
            const o = n[e] || (n[e] = []),
              i =
                t.__weh ||
                (t.__weh = (...r) => {
                  if (n.isUnmounted) return;
                  pe(), Yr(n);
                  const o = gt(t, n, e, r);
                  return eo(), fe(), o;
                });
            return r ? o.unshift(i) : o.push(i), i;
          }
        }
        RegExp, RegExp;
        const Tn =
            (e) =>
            (t, n = Qr) =>
              (!no || "sp" === e) && jn(e, t, n),
          Mn = Tn("bm"),
          Pn = Tn("m"),
          Cn = Tn("bu"),
          Nn = Tn("u"),
          Ln = Tn("bum"),
          In = Tn("um"),
          Dn = Tn("sp"),
          Rn = Tn("rtg"),
          kn = Tn("rtc");
        function Un(e, t = Qr) {
          jn("ec", e, t);
        }
        function Fn(e, t, n, r) {
          const o = e.dirs,
            i = t && t.dirs;
          for (let s = 0; s < o.length; s++) {
            const a = o[s];
            i && (a.oldValue = i[s].value);
            let c = a.dir[r];
            c && (pe(), gt(c, n, 8, [e.el, a, e, t]), fe());
          }
        }
        const Bn = "components";
        function zn(e, t) {
          return (
            (function (e, t, n = !0, r = !1) {
              const o = Kt || Qr;
              if (o) {
                const n = o.type;
                if (e === Bn) {
                  const e = (function (e, t = !0) {
                    return j(e)
                      ? e.displayName || e.name
                      : e.name || (t && e.__name);
                  })(n, !1);
                  if (e && (e === t || e === F(t) || e === V(F(t)))) return n;
                }
                const i = Gn(o[e] || n[e], t) || Gn(o.appContext[e], t);
                return !i && r ? n : i;
              }
            })(Bn, e, !0, t) || e
          );
        }
        const Vn = Symbol();
        function Gn(e, t) {
          return e && (e[t] || e[F(t)] || e[V(F(t))]);
        }
        const Hn = (e) =>
            e ? (to(e) ? io(e) || e.proxy : Hn(e.parent)) : null,
          $n = _(Object.create(null), {
            $: (e) => e,
            $el: (e) => e.vnode.el,
            $data: (e) => e.data,
            $props: (e) => e.props,
            $attrs: (e) => e.attrs,
            $slots: (e) => e.slots,
            $refs: (e) => e.refs,
            $parent: (e) => Hn(e.parent),
            $root: (e) => Hn(e.root),
            $emit: (e) => e.emit,
            $options: (e) => (__VUE_OPTIONS_API__ ? qn(e) : e.type),
            $forceUpdate: (e) => e.f || (e.f = () => Lt(e.update)),
            $nextTick: (e) => e.n || (e.n = Nt.bind(e.proxy)),
            $watch: (e) => (__VUE_OPTIONS_API__ ? un.bind(e) : y),
          }),
          Wn = {
            get({ _: e }, t) {
              const {
                ctx: n,
                setupState: r,
                data: o,
                props: i,
                accessCache: s,
                type: a,
                appContext: c,
              } = e;
              let l;
              if ("$" !== t[0]) {
                const a = s[t];
                if (void 0 !== a)
                  switch (a) {
                    case 1:
                      return r[t];
                    case 2:
                      return o[t];
                    case 4:
                      return n[t];
                    case 3:
                      return i[t];
                  }
                else {
                  if (r !== d && O(r, t)) return (s[t] = 1), r[t];
                  if (o !== d && O(o, t)) return (s[t] = 2), o[t];
                  if ((l = e.propsOptions[0]) && O(l, t))
                    return (s[t] = 3), i[t];
                  if (n !== d && O(n, t)) return (s[t] = 4), n[t];
                  (__VUE_OPTIONS_API__ && !Jn) || (s[t] = 0);
                }
              }
              const u = $n[t];
              let p, f;
              return u
                ? ("$attrs" === t && de(e, 0, t), u(e))
                : (p = a.__cssModules) && (p = p[t])
                ? p
                : n !== d && O(n, t)
                ? ((s[t] = 4), n[t])
                : ((f = c.config.globalProperties), O(f, t) ? f[t] : void 0);
            },
            set({ _: e }, t, n) {
              const { data: r, setupState: o, ctx: i } = e;
              return o !== d && O(o, t)
                ? ((o[t] = n), !0)
                : r !== d && O(r, t)
                ? ((r[t] = n), !0)
                : !(
                    O(e.props, t) ||
                    ("$" === t[0] && t.slice(1) in e) ||
                    ((i[t] = n), 0)
                  );
            },
            has(
              {
                _: {
                  data: e,
                  setupState: t,
                  accessCache: n,
                  ctx: r,
                  appContext: o,
                  propsOptions: i,
                },
              },
              s
            ) {
              let a;
              return (
                !!n[s] ||
                (e !== d && O(e, s)) ||
                (t !== d && O(t, s)) ||
                ((a = i[0]) && O(a, s)) ||
                O(r, s) ||
                O($n, s) ||
                O(o.config.globalProperties, s)
              );
            },
            defineProperty(e, t, n) {
              return (
                null != n.get
                  ? (e._.accessCache[t] = 0)
                  : O(n, "value") && this.set(e, t, n.value, null),
                Reflect.defineProperty(e, t, n)
              );
            },
          };
        let Jn = !0;
        function Xn(e, t, n) {
          gt(E(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
        }
        function Zn(e, t, n, r) {
          const o = r.includes(".") ? pn(n, r) : () => n[r];
          if (T(e)) {
            const n = t[e];
            j(n) && cn(o, n);
          } else if (j(e)) cn(o, e.bind(n));
          else if (P(e))
            if (E(e)) e.forEach((e) => Zn(e, t, n, r));
            else {
              const r = j(e.handler) ? e.handler.bind(n) : t[e.handler];
              j(r) && cn(o, r, e);
            }
        }
        function qn(e) {
          const t = e.type,
            { mixins: n, extends: r } = t,
            {
              mixins: o,
              optionsCache: i,
              config: { optionMergeStrategies: s },
            } = e.appContext,
            a = i.get(t);
          let c;
          return (
            a
              ? (c = a)
              : o.length || n || r
              ? ((c = {}),
                o.length && o.forEach((e) => Qn(c, e, s, !0)),
                Qn(c, t, s))
              : (c = t),
            i.set(t, c),
            c
          );
        }
        function Qn(e, t, n, r = !1) {
          const { mixins: o, extends: i } = t;
          i && Qn(e, i, n, !0), o && o.forEach((t) => Qn(e, t, n, !0));
          for (const o in t)
            if (r && "expose" === o);
            else {
              const r = Kn[o] || (n && n[o]);
              e[o] = r ? r(e[o], t[o]) : t[o];
            }
          return e;
        }
        const Kn = {
          data: Yn,
          props: nr,
          emits: nr,
          methods: nr,
          computed: nr,
          beforeCreate: tr,
          created: tr,
          beforeMount: tr,
          mounted: tr,
          beforeUpdate: tr,
          updated: tr,
          beforeDestroy: tr,
          beforeUnmount: tr,
          destroyed: tr,
          unmounted: tr,
          activated: tr,
          deactivated: tr,
          errorCaptured: tr,
          serverPrefetch: tr,
          components: nr,
          directives: nr,
          watch: function (e, t) {
            if (!e) return t;
            if (!t) return e;
            const n = _(Object.create(null), e);
            for (const r in t) n[r] = tr(e[r], t[r]);
            return n;
          },
          provide: Yn,
          inject: function (e, t) {
            return nr(er(e), er(t));
          },
        };
        function Yn(e, t) {
          return t
            ? e
              ? function () {
                  return _(
                    j(e) ? e.call(this, this) : e,
                    j(t) ? t.call(this, this) : t
                  );
                }
              : t
            : e;
        }
        function er(e) {
          if (E(e)) {
            const t = {};
            for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
            return t;
          }
          return e;
        }
        function tr(e, t) {
          return e ? [...new Set([].concat(e, t))] : t;
        }
        function nr(e, t) {
          return e ? _(_(Object.create(null), e), t) : t;
        }
        function rr(e, t, n, r) {
          const [o, i] = e.propsOptions;
          let s,
            a = !1;
          if (t)
            for (let c in t) {
              if (R(c)) continue;
              const l = t[c];
              let u;
              o && O(o, (u = F(c)))
                ? i && i.includes(u)
                  ? ((s || (s = {}))[u] = l)
                  : (n[u] = l)
                : Qt(e.emitsOptions, c) ||
                  (c in r && l === r[c]) ||
                  ((r[c] = l), (a = !0));
            }
          if (i) {
            const t = ct(n),
              r = s || d;
            for (let s = 0; s < i.length; s++) {
              const a = i[s];
              n[a] = or(o, t, a, r[a], e, !O(r, a));
            }
          }
          return a;
        }
        function or(e, t, n, r, o, i) {
          const s = e[n];
          if (null != s) {
            const e = O(s, "default");
            if (e && void 0 === r) {
              const e = s.default;
              if (s.type !== Function && j(e)) {
                const { propsDefaults: i } = o;
                n in i
                  ? (r = i[n])
                  : (Yr(o), (r = i[n] = e.call(null, t)), eo());
              } else r = e;
            }
            s[0] &&
              (i && !e
                ? (r = !1)
                : !s[1] || ("" !== r && r !== z(n)) || (r = !0));
          }
          return r;
        }
        function ir(e, t, n = !1) {
          const r = t.propsCache,
            o = r.get(e);
          if (o) return o;
          const i = e.props,
            s = {},
            a = [];
          let c = !1;
          if (__VUE_OPTIONS_API__ && !j(e)) {
            const r = (e) => {
              c = !0;
              const [n, r] = ir(e, t, !0);
              _(s, n), r && a.push(...r);
            };
            !n && t.mixins.length && t.mixins.forEach(r),
              e.extends && r(e.extends),
              e.mixins && e.mixins.forEach(r);
          }
          if (!i && !c) return r.set(e, h), h;
          if (E(i))
            for (let e = 0; e < i.length; e++) {
              const t = F(i[e]);
              sr(t) && (s[t] = d);
            }
          else if (i)
            for (const e in i) {
              const t = F(e);
              if (sr(t)) {
                const n = i[e],
                  r = (s[t] = E(n) || j(n) ? { type: n } : n);
                if (r) {
                  const e = lr(Boolean, r.type),
                    n = lr(String, r.type);
                  (r[0] = e > -1),
                    (r[1] = n < 0 || e < n),
                    (e > -1 || O(r, "default")) && a.push(t);
                }
              }
            }
          const l = [s, a];
          return r.set(e, l), l;
        }
        function sr(e) {
          return "$" !== e[0];
        }
        function ar(e) {
          const t = e && e.toString().match(/^\s*function (\w+)/);
          return t ? t[1] : null === e ? "null" : "";
        }
        function cr(e, t) {
          return ar(e) === ar(t);
        }
        function lr(e, t) {
          return E(t)
            ? t.findIndex((t) => cr(t, e))
            : j(t) && cr(t, e)
            ? 0
            : -1;
        }
        const ur = (e) => "_" === e[0] || "$stable" === e,
          pr = (e) => (E(e) ? e.map($r) : [$r(e)]),
          fr = (e, t, n) => {
            if (t._n) return t;
            const r = (function (e, t = Kt, n) {
              if (!t) return e;
              if (e._n) return e;
              const r = (...n) => {
                r._d && Cr(-1);
                const o = en(t),
                  i = e(...n);
                return en(o), r._d && Cr(1), __VUE_PROD_DEVTOOLS__ && Wt(t), i;
              };
              return (r._n = !0), (r._c = !0), (r._d = !0), r;
            })((...e) => pr(t(...e)), n);
            return (r._c = !1), r;
          },
          dr = (e, t, n) => {
            const r = e._ctx;
            for (const n in e) {
              if (ur(n)) continue;
              const o = e[n];
              if (j(o)) t[n] = fr(0, o, r);
              else if (null != o) {
                const e = pr(o);
                t[n] = () => e;
              }
            }
          },
          hr = (e, t) => {
            const n = pr(t);
            e.slots.default = () => n;
          };
        function yr() {
          return {
            app: null,
            config: {
              isNativeTag: m,
              performance: !1,
              globalProperties: {},
              optionMergeStrategies: {},
              errorHandler: void 0,
              warnHandler: void 0,
              compilerOptions: {},
            },
            mixins: [],
            components: {},
            directives: {},
            provides: Object.create(null),
            optionsCache: new WeakMap(),
            propsCache: new WeakMap(),
            emitsCache: new WeakMap(),
          };
        }
        let mr = 0;
        function gr(e, t) {
          return function (n, r = null) {
            j(n) || (n = Object.assign({}, n)), null == r || P(r) || (r = null);
            const o = yr(),
              i = new Set();
            let s = !1;
            const a = (o.app = {
              _uid: mr++,
              _component: n,
              _props: r,
              _container: null,
              _context: o,
              _instance: null,
              version: ao,
              get config() {
                return o.config;
              },
              set config(e) {},
              use: (e, ...t) => (
                i.has(e) ||
                  (e && j(e.install)
                    ? (i.add(e), e.install(a, ...t))
                    : j(e) && (i.add(e), e(a, ...t))),
                a
              ),
              mixin: (e) => (
                __VUE_OPTIONS_API__ &&
                  (o.mixins.includes(e) || o.mixins.push(e)),
                a
              ),
              component: (e, t) =>
                t ? ((o.components[e] = t), a) : o.components[e],
              directive: (e, t) =>
                t ? ((o.directives[e] = t), a) : o.directives[e],
              mount(i, c, l) {
                if (!s) {
                  const u = zr(n, r);
                  return (
                    (u.appContext = o),
                    c && t ? t(u, i) : e(u, i, l),
                    (s = !0),
                    (a._container = i),
                    (i.__vue_app__ = a),
                    __VUE_PROD_DEVTOOLS__ &&
                      ((a._instance = u.component),
                      (function (e, t) {
                        Gt("app:init", e, t, {
                          Fragment: Or,
                          Text: Er,
                          Comment: Ar,
                          Static: xr,
                        });
                      })(a, ao)),
                    io(u.component) || u.component.proxy
                  );
                }
              },
              unmount() {
                s &&
                  (e(null, a._container),
                  __VUE_PROD_DEVTOOLS__ &&
                    ((a._instance = null),
                    (function (e) {
                      Gt("app:unmount", e);
                    })(a)),
                  delete a._container.__vue_app__);
              },
              provide: (e, t) => ((o.provides[e] = t), a),
            });
            return a;
          };
        }
        function vr(e, t, n, r, o = !1) {
          if (E(e))
            return void e.forEach((e, i) =>
              vr(e, t && (E(t) ? t[i] : t), n, r, o)
            );
          if (wn(r) && !o) return;
          const i =
              4 & r.shapeFlag ? io(r.component) || r.component.proxy : r.el,
            s = o ? null : i,
            { i: a, r: c } = e,
            l = t && t.r,
            u = a.refs === d ? (a.refs = {}) : a.refs,
            p = a.setupState;
          if (
            (null != l &&
              l !== c &&
              (T(l)
                ? ((u[l] = null), O(p, l) && (p[l] = null))
                : ft(l) && (l.value = null)),
            j(c))
          )
            mt(c, a, 12, [s, u]);
          else {
            const t = T(c),
              r = ft(c);
            if (t || r) {
              const a = () => {
                if (e.f) {
                  const n = t ? u[c] : c.value;
                  o
                    ? E(n) && w(n, i)
                    : E(n)
                    ? n.includes(i) || n.push(i)
                    : t
                    ? ((u[c] = [i]), O(p, c) && (p[c] = u[c]))
                    : ((c.value = [i]), e.k && (u[e.k] = c.value));
                } else
                  t
                    ? ((u[c] = s), O(p, c) && (p[c] = s))
                    : r && ((c.value = s), e.k && (u[e.k] = s));
              };
              s ? ((a.id = -1), br(a, n)) : a();
            }
          }
        }
        const br = function (e, t) {
          t && t.pendingBranch
            ? E(e)
              ? t.effects.push(...e)
              : t.effects.push(e)
            : Dt(e, jt, xt, Tt);
        };
        function _r(e, t) {
          "boolean" != typeof __VUE_OPTIONS_API__ &&
            (Z().__VUE_OPTIONS_API__ = !0),
            "boolean" != typeof __VUE_PROD_DEVTOOLS__ &&
              (Z().__VUE_PROD_DEVTOOLS__ = !1);
          const n = Z();
          (n.__VUE__ = !0),
            __VUE_PROD_DEVTOOLS__ && Ht(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
          const {
              insert: r,
              remove: o,
              patchProp: i,
              createElement: s,
              createText: a,
              createComment: c,
              setText: l,
              setElementText: u,
              parentNode: p,
              nextSibling: f,
              setScopeId: m = y,
              cloneNode: g,
              insertStaticContent: v,
            } = e,
            b = (
              e,
              t,
              n,
              r = null,
              o = null,
              i = null,
              s = !1,
              a = null,
              c = !!t.dynamicChildren
            ) => {
              if (e === t) return;
              e && !Rr(e, t) && ((r = te(e)), X(e, o, i, !0), (e = null)),
                -2 === t.patchFlag && ((c = !1), (t.dynamicChildren = null));
              const { type: l, ref: u, shapeFlag: p } = t;
              switch (l) {
                case Er:
                  w(e, t, n, r);
                  break;
                case Ar:
                  S(e, t, n, r);
                  break;
                case xr:
                  null == e && E(t, n, r, s);
                  break;
                case Or:
                  L(e, t, n, r, o, i, s, a, c);
                  break;
                default:
                  1 & p
                    ? A(e, t, n, r, o, i, s, a, c)
                    : 6 & p
                    ? I(e, t, n, r, o, i, s, a, c)
                    : (64 & p || 128 & p) &&
                      l.process(e, t, n, r, o, i, s, a, c, re);
              }
              null != u && o && vr(u, e && e.ref, i, t || e, !t);
            },
            w = (e, t, n, o) => {
              if (null == e) r((t.el = a(t.children)), n, o);
              else {
                const n = (t.el = e.el);
                t.children !== e.children && l(n, t.children);
              }
            },
            S = (e, t, n, o) => {
              null == e ? r((t.el = c(t.children || "")), n, o) : (t.el = e.el);
            },
            E = (e, t, n, r) => {
              [e.el, e.anchor] = v(e.children, t, n, r, e.el, e.anchor);
            },
            A = (e, t, n, r, o, i, s, a, c) => {
              (s = s || "svg" === t.type),
                null == e ? x(t, n, r, o, i, s, a, c) : M(e, t, o, i, s, a, c);
            },
            x = (e, t, n, o, a, c, l, p) => {
              let f, d;
              const {
                type: h,
                props: y,
                shapeFlag: m,
                transition: v,
                patchFlag: b,
                dirs: _,
              } = e;
              if (e.el && void 0 !== g && -1 === b) f = e.el = g(e.el);
              else {
                if (
                  ((f = e.el = s(e.type, c, y && y.is, y)),
                  8 & m
                    ? u(f, e.children)
                    : 16 & m &&
                      T(
                        e.children,
                        f,
                        null,
                        o,
                        a,
                        c && "foreignObject" !== h,
                        l,
                        p
                      ),
                  _ && Fn(e, null, o, "created"),
                  y)
                ) {
                  for (const t in y)
                    "value" === t ||
                      R(t) ||
                      i(f, t, null, y[t], c, e.children, o, a, ee);
                  "value" in y && i(f, "value", null, y.value),
                    (d = y.onVnodeBeforeMount) && Xr(d, o, e);
                }
                j(f, e, e.scopeId, l, o);
              }
              __VUE_PROD_DEVTOOLS__ &&
                (Object.defineProperty(f, "__vnode", {
                  value: e,
                  enumerable: !1,
                }),
                Object.defineProperty(f, "__vueParentComponent", {
                  value: o,
                  enumerable: !1,
                })),
                _ && Fn(e, null, o, "beforeMount");
              const w = (!a || (a && !a.pendingBranch)) && v && !v.persisted;
              w && v.beforeEnter(f),
                r(f, t, n),
                ((d = y && y.onVnodeMounted) || w || _) &&
                  br(() => {
                    d && Xr(d, o, e),
                      w && v.enter(f),
                      _ && Fn(e, null, o, "mounted");
                  }, a);
            },
            j = (e, t, n, r, o) => {
              if ((n && m(e, n), r))
                for (let t = 0; t < r.length; t++) m(e, r[t]);
              if (o && t === o.subTree) {
                const t = o.vnode;
                j(e, t, t.scopeId, t.slotScopeIds, o.parent);
              }
            },
            T = (e, t, n, r, o, i, s, a, c = 0) => {
              for (let l = c; l < e.length; l++) {
                const c = (e[l] = a ? Wr(e[l]) : $r(e[l]));
                b(null, c, t, n, r, o, i, s, a);
              }
            },
            M = (e, t, n, r, o, s, a) => {
              const c = (t.el = e.el);
              let { patchFlag: l, dynamicChildren: p, dirs: f } = t;
              l |= 16 & e.patchFlag;
              const h = e.props || d,
                y = t.props || d;
              let m;
              n && wr(n, !1),
                (m = y.onVnodeBeforeUpdate) && Xr(m, n, t, e),
                f && Fn(t, e, n, "beforeUpdate"),
                n && wr(n, !0);
              const g = o && "foreignObject" !== t.type;
              if (
                (p
                  ? P(e.dynamicChildren, p, c, n, r, g, s)
                  : a || V(e, t, c, null, n, r, g, s, !1),
                l > 0)
              ) {
                if (16 & l) N(c, t, h, y, n, r, o);
                else if (
                  (2 & l &&
                    h.class !== y.class &&
                    i(c, "class", null, y.class, o),
                  4 & l && i(c, "style", h.style, y.style, o),
                  8 & l)
                ) {
                  const s = t.dynamicProps;
                  for (let t = 0; t < s.length; t++) {
                    const a = s[t],
                      l = h[a],
                      u = y[a];
                    (u === l && "value" !== a) ||
                      i(c, a, l, u, o, e.children, n, r, ee);
                  }
                }
                1 & l && e.children !== t.children && u(c, t.children);
              } else a || null != p || N(c, t, h, y, n, r, o);
              ((m = y.onVnodeUpdated) || f) &&
                br(() => {
                  m && Xr(m, n, t, e), f && Fn(t, e, n, "updated");
                }, r);
            },
            P = (e, t, n, r, o, i, s) => {
              for (let a = 0; a < t.length; a++) {
                const c = e[a],
                  l = t[a],
                  u =
                    c.el && (c.type === Or || !Rr(c, l) || 70 & c.shapeFlag)
                      ? p(c.el)
                      : n;
                b(c, l, u, null, r, o, i, s, !0);
              }
            },
            N = (e, t, n, r, o, s, a) => {
              if (n !== r) {
                for (const c in r) {
                  if (R(c)) continue;
                  const l = r[c],
                    u = n[c];
                  l !== u &&
                    "value" !== c &&
                    i(e, c, u, l, a, t.children, o, s, ee);
                }
                if (n !== d)
                  for (const c in n)
                    R(c) ||
                      c in r ||
                      i(e, c, n[c], null, a, t.children, o, s, ee);
                "value" in r && i(e, "value", n.value, r.value);
              }
            },
            L = (e, t, n, o, i, s, c, l, u) => {
              const p = (t.el = e ? e.el : a("")),
                f = (t.anchor = e ? e.anchor : a(""));
              let { patchFlag: d, dynamicChildren: h, slotScopeIds: y } = t;
              y && (l = l ? l.concat(y) : y),
                null == e
                  ? (r(p, n, o), r(f, n, o), T(t.children, n, f, i, s, c, l, u))
                  : d > 0 && 64 & d && h && e.dynamicChildren
                  ? (P(e.dynamicChildren, h, n, i, s, c, l),
                    (null != t.key || (i && t === i.subTree)) && Sr(e, t, !0))
                  : V(e, t, n, f, i, s, c, l, u);
            },
            I = (e, t, n, r, o, i, s, a, c) => {
              (t.slotScopeIds = a),
                null == e
                  ? 512 & t.shapeFlag
                    ? o.ctx.activate(t, n, r, s, c)
                    : D(t, n, r, o, i, s, c)
                  : k(e, t, c);
            },
            D = (e, t, n, r, o, i, s) => {
              const a = (e.component = (function (e, t, n) {
                const r = e.type,
                  o = (t ? t.appContext : e.appContext) || Zr,
                  i = {
                    uid: qr++,
                    vnode: e,
                    type: r,
                    parent: t,
                    appContext: o,
                    root: null,
                    next: null,
                    subTree: null,
                    effect: null,
                    update: null,
                    scope: new Q(!0),
                    render: null,
                    proxy: null,
                    exposed: null,
                    exposeProxy: null,
                    withProxy: null,
                    provides: t ? t.provides : Object.create(o.provides),
                    accessCache: null,
                    renderCache: [],
                    components: null,
                    directives: null,
                    propsOptions: ir(r, o),
                    emitsOptions: qt(r, o),
                    emit: null,
                    emitted: null,
                    propsDefaults: d,
                    inheritAttrs: r.inheritAttrs,
                    ctx: d,
                    data: d,
                    props: d,
                    attrs: d,
                    slots: d,
                    refs: d,
                    setupState: d,
                    setupContext: null,
                    suspense: n,
                    suspenseId: n ? n.pendingId : 0,
                    asyncDep: null,
                    asyncResolved: !1,
                    isMounted: !1,
                    isUnmounted: !1,
                    isDeactivated: !1,
                    bc: null,
                    c: null,
                    bm: null,
                    m: null,
                    bu: null,
                    u: null,
                    um: null,
                    bum: null,
                    da: null,
                    a: null,
                    rtg: null,
                    rtc: null,
                    ec: null,
                    sp: null,
                  };
                return (
                  (i.ctx = { _: i }),
                  (i.root = t ? t.root : i),
                  (i.emit = Zt.bind(null, i)),
                  e.ce && e.ce(i),
                  i
                );
              })(e, r, o));
              if (
                (Sn(e) && (a.ctx.renderer = re),
                (function (e, t = !1) {
                  no = t;
                  const { props: n, children: r } = e.vnode,
                    o = to(e);
                  (function (e, t, n, r = !1) {
                    const o = {},
                      i = {};
                    W(i, kr, 1),
                      (e.propsDefaults = Object.create(null)),
                      rr(e, t, o, i);
                    for (const t in e.propsOptions[0])
                      t in o || (o[t] = void 0);
                    n
                      ? (e.props = r ? o : rt(o, !1, Me, Ze, Ke))
                      : e.type.props
                      ? (e.props = o)
                      : (e.props = i),
                      (e.attrs = i);
                  })(e, n, o, t),
                    ((e, t) => {
                      if (32 & e.vnode.shapeFlag) {
                        const n = t._;
                        n
                          ? ((e.slots = ct(t)), W(t, "_", n))
                          : dr(t, (e.slots = {}));
                      } else (e.slots = {}), t && hr(e, t);
                      W(e.slots, kr, 1);
                    })(e, r);
                  const i = o
                    ? (function (e, t) {
                        const n = e.type;
                        (e.accessCache = Object.create(null)),
                          (e.proxy = lt(new Proxy(e.ctx, Wn)));
                        const { setup: r } = n;
                        if (r) {
                          const n = (e.setupContext =
                            r.length > 1
                              ? (function (e) {
                                  const t = (t) => {
                                    e.exposed = t || {};
                                  };
                                  let n;
                                  return {
                                    get attrs() {
                                      return (
                                        n ||
                                        (n = (function (e) {
                                          return new Proxy(e.attrs, {
                                            get: (t, n) => (
                                              de(e, 0, "$attrs"), t[n]
                                            ),
                                          });
                                        })(e))
                                      );
                                    },
                                    slots: e.slots,
                                    emit: e.emit,
                                    expose: t,
                                  };
                                })(e)
                              : null);
                          Yr(e), pe();
                          const o = mt(r, e, 0, [e.props, n]);
                          if ((fe(), eo(), C(o))) {
                            if ((o.then(eo, eo), t))
                              return o
                                .then((n) => {
                                  ro(e, n, t);
                                })
                                .catch((t) => {
                                  vt(t, e, 0);
                                });
                            e.asyncDep = o;
                          } else ro(e, o, t);
                        } else oo(e, t);
                      })(e, t)
                    : void 0;
                  no = !1;
                })(a),
                a.asyncDep)
              ) {
                if ((o && o.registerDep(a, U), !e.el)) {
                  const e = (a.subTree = zr(Ar));
                  S(null, e, t, n);
                }
              } else U(a, e, t, n, o, i, s);
            },
            k = (e, t, n) => {
              const r = (t.component = e.component);
              if (
                (function (e, t, n) {
                  const { props: r, children: o, component: i } = e,
                    { props: s, children: a, patchFlag: c } = t,
                    l = i.emitsOptions;
                  if (t.dirs || t.transition) return !0;
                  if (!(n && c >= 0))
                    return (
                      !((!o && !a) || (a && a.$stable)) ||
                      (r !== s && (r ? !s || on(r, s, l) : !!s))
                    );
                  if (1024 & c) return !0;
                  if (16 & c) return r ? on(r, s, l) : !!s;
                  if (8 & c) {
                    const e = t.dynamicProps;
                    for (let t = 0; t < e.length; t++) {
                      const n = e[t];
                      if (s[n] !== r[n] && !Qt(l, n)) return !0;
                    }
                  }
                  return !1;
                })(e, t, n)
              ) {
                if (r.asyncDep && !r.asyncResolved) return void B(r, t, n);
                (r.next = t),
                  (function (e) {
                    const t = wt.indexOf(e);
                    t > St && wt.splice(t, 1);
                  })(r.update),
                  r.update();
              } else (t.el = e.el), (r.vnode = t);
            },
            U = (e, t, n, r, o, i, s) => {
              const a = (e.effect = new ae(
                  () => {
                    if (e.isMounted) {
                      let t,
                        { next: n, bu: r, u: a, parent: c, vnode: l } = e,
                        u = n;
                      wr(e, !1),
                        n ? ((n.el = l.el), B(e, n, s)) : (n = l),
                        r && $(r),
                        (t = n.props && n.props.onVnodeBeforeUpdate) &&
                          Xr(t, c, n, l),
                        wr(e, !0);
                      const f = tn(e),
                        d = e.subTree;
                      (e.subTree = f),
                        b(d, f, p(d.el), te(d), e, o, i),
                        (n.el = f.el),
                        null === u &&
                          (function ({ vnode: e, parent: t }, n) {
                            for (; t && t.subTree === e; )
                              ((e = t.vnode).el = n), (t = t.parent);
                          })(e, f.el),
                        a && br(a, o),
                        (t = n.props && n.props.onVnodeUpdated) &&
                          br(() => Xr(t, c, n, l), o),
                        __VUE_PROD_DEVTOOLS__ && Wt(e);
                    } else {
                      let s;
                      const { el: a, props: c } = t,
                        { bm: l, m: u, parent: p } = e,
                        f = wn(t);
                      if (
                        (wr(e, !1),
                        l && $(l),
                        !f && (s = c && c.onVnodeBeforeMount) && Xr(s, p, t),
                        wr(e, !0),
                        a && ie)
                      ) {
                        const n = () => {
                          (e.subTree = tn(e)), ie(a, e.subTree, e, o, null);
                        };
                        f
                          ? t.type
                              .__asyncLoader()
                              .then(() => !e.isUnmounted && n())
                          : n();
                      } else {
                        const s = (e.subTree = tn(e));
                        b(null, s, n, r, e, o, i), (t.el = s.el);
                      }
                      if ((u && br(u, o), !f && (s = c && c.onVnodeMounted))) {
                        const e = t;
                        br(() => Xr(s, p, e), o);
                      }
                      (256 & t.shapeFlag ||
                        (p && wn(p.vnode) && 256 & p.vnode.shapeFlag)) &&
                        e.a &&
                        br(e.a, o),
                        (e.isMounted = !0),
                        __VUE_PROD_DEVTOOLS__ && $t(e),
                        (t = n = r = null);
                    }
                  },
                  () => Lt(c),
                  e.scope
                )),
                c = (e.update = () => a.run());
              (c.id = e.uid), wr(e, !0), c();
            },
            B = (e, t, n) => {
              t.component = e;
              const r = e.vnode.props;
              (e.vnode = t),
                (e.next = null),
                (function (e, t, n, r) {
                  const {
                      props: o,
                      attrs: i,
                      vnode: { patchFlag: s },
                    } = e,
                    a = ct(o),
                    [c] = e.propsOptions;
                  let l = !1;
                  if (!(r || s > 0) || 16 & s) {
                    let r;
                    rr(e, t, o, i) && (l = !0);
                    for (const i in a)
                      (t && (O(t, i) || ((r = z(i)) !== i && O(t, r)))) ||
                        (c
                          ? !n ||
                            (void 0 === n[i] && void 0 === n[r]) ||
                            (o[i] = or(c, a, i, void 0, e, !0))
                          : delete o[i]);
                    if (i !== a)
                      for (const e in i)
                        (t && O(t, e)) || (delete i[e], (l = !0));
                  } else if (8 & s) {
                    const n = e.vnode.dynamicProps;
                    for (let r = 0; r < n.length; r++) {
                      let s = n[r];
                      if (Qt(e.emitsOptions, s)) continue;
                      const u = t[s];
                      if (c)
                        if (O(i, s)) u !== i[s] && ((i[s] = u), (l = !0));
                        else {
                          const t = F(s);
                          o[t] = or(c, a, t, u, e, !1);
                        }
                      else u !== i[s] && ((i[s] = u), (l = !0));
                    }
                  }
                  l && ye(e, "set", "$attrs");
                })(e, t.props, r, n),
                ((e, t, n) => {
                  const { vnode: r, slots: o } = e;
                  let i = !0,
                    s = d;
                  if (32 & r.shapeFlag) {
                    const e = t._;
                    e
                      ? n && 1 === e
                        ? (i = !1)
                        : (_(o, t), n || 1 !== e || delete o._)
                      : ((i = !t.$stable), dr(t, o)),
                      (s = t);
                  } else t && (hr(e, t), (s = { default: 1 }));
                  if (i) for (const e in o) ur(e) || e in s || delete o[e];
                })(e, t.children, n),
                pe(),
                Rt(void 0, e.update),
                fe();
            },
            V = (e, t, n, r, o, i, s, a, c = !1) => {
              const l = e && e.children,
                p = e ? e.shapeFlag : 0,
                f = t.children,
                { patchFlag: d, shapeFlag: h } = t;
              if (d > 0) {
                if (128 & d) return void H(l, f, n, r, o, i, s, a, c);
                if (256 & d) return void G(l, f, n, r, o, i, s, a, c);
              }
              8 & h
                ? (16 & p && ee(l, o, i), f !== l && u(n, f))
                : 16 & p
                ? 16 & h
                  ? H(l, f, n, r, o, i, s, a, c)
                  : ee(l, o, i, !0)
                : (8 & p && u(n, ""), 16 & h && T(f, n, r, o, i, s, a, c));
            },
            G = (e, t, n, r, o, i, s, a, c) => {
              t = t || h;
              const l = (e = e || h).length,
                u = t.length,
                p = Math.min(l, u);
              let f;
              for (f = 0; f < p; f++) {
                const r = (t[f] = c ? Wr(t[f]) : $r(t[f]));
                b(e[f], r, n, null, o, i, s, a, c);
              }
              l > u ? ee(e, o, i, !0, !1, p) : T(t, n, r, o, i, s, a, c, p);
            },
            H = (e, t, n, r, o, i, s, a, c) => {
              let l = 0;
              const u = t.length;
              let p = e.length - 1,
                f = u - 1;
              for (; l <= p && l <= f; ) {
                const r = e[l],
                  u = (t[l] = c ? Wr(t[l]) : $r(t[l]));
                if (!Rr(r, u)) break;
                b(r, u, n, null, o, i, s, a, c), l++;
              }
              for (; l <= p && l <= f; ) {
                const r = e[p],
                  l = (t[f] = c ? Wr(t[f]) : $r(t[f]));
                if (!Rr(r, l)) break;
                b(r, l, n, null, o, i, s, a, c), p--, f--;
              }
              if (l > p) {
                if (l <= f) {
                  const e = f + 1,
                    p = e < u ? t[e].el : r;
                  for (; l <= f; )
                    b(
                      null,
                      (t[l] = c ? Wr(t[l]) : $r(t[l])),
                      n,
                      p,
                      o,
                      i,
                      s,
                      a,
                      c
                    ),
                      l++;
                }
              } else if (l > f) for (; l <= p; ) X(e[l], o, i, !0), l++;
              else {
                const d = l,
                  y = l,
                  m = new Map();
                for (l = y; l <= f; l++) {
                  const e = (t[l] = c ? Wr(t[l]) : $r(t[l]));
                  null != e.key && m.set(e.key, l);
                }
                let g,
                  v = 0;
                const _ = f - y + 1;
                let w = !1,
                  S = 0;
                const O = new Array(_);
                for (l = 0; l < _; l++) O[l] = 0;
                for (l = d; l <= p; l++) {
                  const r = e[l];
                  if (v >= _) {
                    X(r, o, i, !0);
                    continue;
                  }
                  let u;
                  if (null != r.key) u = m.get(r.key);
                  else
                    for (g = y; g <= f; g++)
                      if (0 === O[g - y] && Rr(r, t[g])) {
                        u = g;
                        break;
                      }
                  void 0 === u
                    ? X(r, o, i, !0)
                    : ((O[u - y] = l + 1),
                      u >= S ? (S = u) : (w = !0),
                      b(r, t[u], n, null, o, i, s, a, c),
                      v++);
                }
                const E = w
                  ? (function (e) {
                      const t = e.slice(),
                        n = [0];
                      let r, o, i, s, a;
                      const c = e.length;
                      for (r = 0; r < c; r++) {
                        const c = e[r];
                        if (0 !== c) {
                          if (((o = n[n.length - 1]), e[o] < c)) {
                            (t[r] = o), n.push(r);
                            continue;
                          }
                          for (i = 0, s = n.length - 1; i < s; )
                            (a = (i + s) >> 1),
                              e[n[a]] < c ? (i = a + 1) : (s = a);
                          c < e[n[i]] &&
                            (i > 0 && (t[r] = n[i - 1]), (n[i] = r));
                        }
                      }
                      for (i = n.length, s = n[i - 1]; i-- > 0; )
                        (n[i] = s), (s = t[s]);
                      return n;
                    })(O)
                  : h;
                for (g = E.length - 1, l = _ - 1; l >= 0; l--) {
                  const e = y + l,
                    p = t[e],
                    f = e + 1 < u ? t[e + 1].el : r;
                  0 === O[l]
                    ? b(null, p, n, f, o, i, s, a, c)
                    : w && (g < 0 || l !== E[g] ? J(p, n, f, 2) : g--);
                }
              }
            },
            J = (e, t, n, o, i = null) => {
              const {
                el: s,
                type: a,
                transition: c,
                children: l,
                shapeFlag: u,
              } = e;
              if (6 & u) J(e.component.subTree, t, n, o);
              else if (128 & u) e.suspense.move(t, n, o);
              else if (64 & u) a.move(e, t, n, re);
              else if (a !== Or)
                if (a !== xr)
                  if (2 !== o && 1 & u && c)
                    if (0 === o)
                      c.beforeEnter(s), r(s, t, n), br(() => c.enter(s), i);
                    else {
                      const { leave: e, delayLeave: o, afterLeave: i } = c,
                        a = () => r(s, t, n),
                        l = () => {
                          e(s, () => {
                            a(), i && i();
                          });
                        };
                      o ? o(s, a, l) : l();
                    }
                  else r(s, t, n);
                else
                  (({ el: e, anchor: t }, n, o) => {
                    let i;
                    for (; e && e !== t; ) (i = f(e)), r(e, n, o), (e = i);
                    r(t, n, o);
                  })(e, t, n);
              else {
                r(s, t, n);
                for (let e = 0; e < l.length; e++) J(l[e], t, n, o);
                r(e.anchor, t, n);
              }
            },
            X = (e, t, n, r = !1, o = !1) => {
              const {
                type: i,
                props: s,
                ref: a,
                children: c,
                dynamicChildren: l,
                shapeFlag: u,
                patchFlag: p,
                dirs: f,
              } = e;
              if ((null != a && vr(a, null, n, e, !0), 256 & u))
                return void t.ctx.deactivate(e);
              const d = 1 & u && f,
                h = !wn(e);
              let y;
              if (
                (h && (y = s && s.onVnodeBeforeUnmount) && Xr(y, t, e), 6 & u)
              )
                Y(e.component, n, r);
              else {
                if (128 & u) return void e.suspense.unmount(n, r);
                d && Fn(e, null, t, "beforeUnmount"),
                  64 & u
                    ? e.type.remove(e, t, n, o, re, r)
                    : l && (i !== Or || (p > 0 && 64 & p))
                    ? ee(l, t, n, !1, !0)
                    : ((i === Or && 384 & p) || (!o && 16 & u)) && ee(c, t, n),
                  r && q(e);
              }
              ((h && (y = s && s.onVnodeUnmounted)) || d) &&
                br(() => {
                  y && Xr(y, t, e), d && Fn(e, null, t, "unmounted");
                }, n);
            },
            q = (e) => {
              const { type: t, el: n, anchor: r, transition: i } = e;
              if (t === Or) return void K(n, r);
              if (t === xr)
                return void (({ el: e, anchor: t }) => {
                  let n;
                  for (; e && e !== t; ) (n = f(e)), o(e), (e = n);
                  o(t);
                })(e);
              const s = () => {
                o(n), i && !i.persisted && i.afterLeave && i.afterLeave();
              };
              if (1 & e.shapeFlag && i && !i.persisted) {
                const { leave: t, delayLeave: r } = i,
                  o = () => t(n, s);
                r ? r(e.el, s, o) : o();
              } else s();
            },
            K = (e, t) => {
              let n;
              for (; e !== t; ) (n = f(e)), o(e), (e = n);
              o(t);
            },
            Y = (e, t, n) => {
              const { bum: r, scope: o, update: i, subTree: s, um: a } = e;
              r && $(r),
                o.stop(),
                i && ((i.active = !1), X(s, e, t, n)),
                a && br(a, t),
                br(() => {
                  e.isUnmounted = !0;
                }, t),
                t &&
                  t.pendingBranch &&
                  !t.isUnmounted &&
                  e.asyncDep &&
                  !e.asyncResolved &&
                  e.suspenseId === t.pendingId &&
                  (t.deps--, 0 === t.deps && t.resolve()),
                __VUE_PROD_DEVTOOLS__ && Jt(e);
            },
            ee = (e, t, n, r = !1, o = !1, i = 0) => {
              for (let s = i; s < e.length; s++) X(e[s], t, n, r, o);
            },
            te = (e) =>
              6 & e.shapeFlag
                ? te(e.component.subTree)
                : 128 & e.shapeFlag
                ? e.suspense.next()
                : f(e.anchor || e.el),
            ne = (e, t, n) => {
              null == e
                ? t._vnode && X(t._vnode, null, null, !0)
                : b(t._vnode || null, e, t, null, null, null, n),
                kt(),
                (t._vnode = e);
            },
            re = {
              p: b,
              um: X,
              m: J,
              r: q,
              mt: D,
              mc: T,
              pc: V,
              pbc: P,
              n: te,
              o: e,
            };
          let oe, ie;
          return (
            t && ([oe, ie] = t(re)),
            { render: ne, hydrate: oe, createApp: gr(ne, oe) }
          );
        }
        function wr({ effect: e, update: t }, n) {
          e.allowRecurse = t.allowRecurse = n;
        }
        function Sr(e, t, n = !1) {
          const r = e.children,
            o = t.children;
          if (E(r) && E(o))
            for (let e = 0; e < r.length; e++) {
              const t = r[e];
              let i = o[e];
              1 & i.shapeFlag &&
                !i.dynamicChildren &&
                ((i.patchFlag <= 0 || 32 === i.patchFlag) &&
                  ((i = o[e] = Wr(o[e])), (i.el = t.el)),
                n || Sr(t, i));
            }
        }
        const Or = Symbol(void 0),
          Er = Symbol(void 0),
          Ar = Symbol(void 0),
          xr = Symbol(void 0),
          jr = [];
        let Tr = null;
        function Mr(e = !1) {
          jr.push((Tr = e ? null : []));
        }
        let Pr = 1;
        function Cr(e) {
          Pr += e;
        }
        function Nr(e) {
          return (
            (e.dynamicChildren = Pr > 0 ? Tr || h : null),
            jr.pop(),
            (Tr = jr[jr.length - 1] || null),
            Pr > 0 && Tr && Tr.push(e),
            e
          );
        }
        function Lr(e, t, n, r, o, i) {
          return Nr(Br(e, t, n, r, o, i, !0));
        }
        function Ir(e, t, n, r, o) {
          return Nr(zr(e, t, n, r, o, !0));
        }
        function Dr(e) {
          return !!e && !0 === e.__v_isVNode;
        }
        function Rr(e, t) {
          return e.type === t.type && e.key === t.key;
        }
        const kr = "__vInternal",
          Ur = ({ key: e }) => (null != e ? e : null),
          Fr = ({ ref: e, ref_key: t, ref_for: n }) =>
            null != e
              ? T(e) || ft(e) || j(e)
                ? { i: Kt, r: e, k: t, f: !!n }
                : e
              : null;
        function Br(
          e,
          t = null,
          n = null,
          r = 0,
          o = null,
          i = e === Or ? 0 : 1,
          s = !1,
          a = !1
        ) {
          const c = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e,
            props: t,
            key: t && Ur(t),
            ref: t && Fr(t),
            scopeId: Yt,
            slotScopeIds: null,
            children: n,
            component: null,
            suspense: null,
            ssContent: null,
            ssFallback: null,
            dirs: null,
            transition: null,
            el: null,
            anchor: null,
            target: null,
            targetAnchor: null,
            staticCount: 0,
            shapeFlag: i,
            patchFlag: r,
            dynamicProps: o,
            dynamicChildren: null,
            appContext: null,
          };
          return (
            a
              ? (Jr(c, n), 128 & i && e.normalize(c))
              : n && (c.shapeFlag |= T(n) ? 8 : 16),
            Pr > 0 &&
              !s &&
              Tr &&
              (c.patchFlag > 0 || 6 & i) &&
              32 !== c.patchFlag &&
              Tr.push(c),
            c
          );
        }
        const zr = function (e, t = null, n = null, r = 0, o = null, i = !1) {
          if (((e && e !== Vn) || (e = Ar), Dr(e))) {
            const r = Vr(e, t, !0);
            return (
              n && Jr(r, n),
              Pr > 0 &&
                !i &&
                Tr &&
                (6 & r.shapeFlag ? (Tr[Tr.indexOf(e)] = r) : Tr.push(r)),
              (r.patchFlag |= -2),
              r
            );
          }
          if (((a = e), j(a) && "__vccOpts" in a && (e = e.__vccOpts), t)) {
            t = (function (e) {
              return e ? (at(e) || kr in e ? _({}, e) : e) : null;
            })(t);
            let { class: e, style: n } = t;
            e && !T(e) && (t.class = u(e)),
              P(n) && (at(n) && !E(n) && (n = _({}, n)), (t.style = s(n)));
          }
          var a;
          return Br(
            e,
            t,
            n,
            r,
            o,
            T(e)
              ? 1
              : ((e) => e.__isSuspense)(e)
              ? 128
              : ((e) => e.__isTeleport)(e)
              ? 64
              : P(e)
              ? 4
              : j(e)
              ? 2
              : 0,
            i,
            !0
          );
        };
        function Vr(e, t, n = !1) {
          const { props: r, ref: o, patchFlag: i, children: a } = e,
            c = t
              ? (function (...e) {
                  const t = {};
                  for (let n = 0; n < e.length; n++) {
                    const r = e[n];
                    for (const e in r)
                      if ("class" === e)
                        t.class !== r.class &&
                          (t.class = u([t.class, r.class]));
                      else if ("style" === e) t.style = s([t.style, r.style]);
                      else if (v(e)) {
                        const n = t[e],
                          o = r[e];
                        !o ||
                          n === o ||
                          (E(n) && n.includes(o)) ||
                          (t[e] = n ? [].concat(n, o) : o);
                      } else "" !== e && (t[e] = r[e]);
                  }
                  return t;
                })(r || {}, t)
              : r;
          return {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e.type,
            props: c,
            key: c && Ur(c),
            ref:
              t && t.ref
                ? n && o
                  ? E(o)
                    ? o.concat(Fr(t))
                    : [o, Fr(t)]
                  : Fr(t)
                : o,
            scopeId: e.scopeId,
            slotScopeIds: e.slotScopeIds,
            children: a,
            target: e.target,
            targetAnchor: e.targetAnchor,
            staticCount: e.staticCount,
            shapeFlag: e.shapeFlag,
            patchFlag: t && e.type !== Or ? (-1 === i ? 16 : 16 | i) : i,
            dynamicProps: e.dynamicProps,
            dynamicChildren: e.dynamicChildren,
            appContext: e.appContext,
            dirs: e.dirs,
            transition: e.transition,
            component: e.component,
            suspense: e.suspense,
            ssContent: e.ssContent && Vr(e.ssContent),
            ssFallback: e.ssFallback && Vr(e.ssFallback),
            el: e.el,
            anchor: e.anchor,
          };
        }
        function Gr(e = " ", t = 0) {
          return zr(Er, null, e, t);
        }
        function Hr(e = "", t = !1) {
          return t ? (Mr(), Ir(Ar, null, e)) : zr(Ar, null, e);
        }
        function $r(e) {
          return null == e || "boolean" == typeof e
            ? zr(Ar)
            : E(e)
            ? zr(Or, null, e.slice())
            : "object" == typeof e
            ? Wr(e)
            : zr(Er, null, String(e));
        }
        function Wr(e) {
          return null === e.el || e.memo ? e : Vr(e);
        }
        function Jr(e, t) {
          let n = 0;
          const { shapeFlag: r } = e;
          if (null == t) t = null;
          else if (E(t)) n = 16;
          else if ("object" == typeof t) {
            if (65 & r) {
              const n = t.default;
              return void (
                n && (n._c && (n._d = !1), Jr(e, n()), n._c && (n._d = !0))
              );
            }
            {
              n = 32;
              const r = t._;
              r || kr in t
                ? 3 === r &&
                  Kt &&
                  (1 === Kt.slots._
                    ? (t._ = 1)
                    : ((t._ = 2), (e.patchFlag |= 1024)))
                : (t._ctx = Kt);
            }
          } else
            j(t)
              ? ((t = { default: t, _ctx: Kt }), (n = 32))
              : ((t = String(t)), 64 & r ? ((n = 16), (t = [Gr(t)])) : (n = 8));
          (e.children = t), (e.shapeFlag |= n);
        }
        function Xr(e, t, n, r = null) {
          gt(e, t, 7, [n, r]);
        }
        const Zr = yr();
        let qr = 0;
        let Qr = null;
        const Kr = () => Qr || Kt,
          Yr = (e) => {
            (Qr = e), e.scope.on();
          },
          eo = () => {
            Qr && Qr.scope.off(), (Qr = null);
          };
        function to(e) {
          return 4 & e.vnode.shapeFlag;
        }
        let no = !1;
        function ro(e, t, n) {
          j(t)
            ? e.type.__ssrInlineRender
              ? (e.ssrRender = t)
              : (e.render = t)
            : P(t) &&
              (__VUE_PROD_DEVTOOLS__ && (e.devtoolsRawSetupState = t),
              (e.setupState = ht(t))),
            oo(e, n);
        }
        function oo(e, t, n) {
          const r = e.type;
          e.render || (e.render = r.render || y),
            __VUE_OPTIONS_API__ &&
              (Yr(e),
              pe(),
              (function (e) {
                const t = qn(e),
                  n = e.proxy,
                  r = e.ctx;
                (Jn = !1), t.beforeCreate && Xn(t.beforeCreate, e, "bc");
                const {
                  data: o,
                  computed: i,
                  methods: s,
                  watch: a,
                  provide: c,
                  inject: l,
                  created: u,
                  beforeMount: p,
                  mounted: f,
                  beforeUpdate: d,
                  updated: h,
                  activated: m,
                  deactivated: g,
                  beforeDestroy: v,
                  beforeUnmount: b,
                  destroyed: _,
                  unmounted: w,
                  render: S,
                  renderTracked: O,
                  renderTriggered: A,
                  errorCaptured: x,
                  serverPrefetch: T,
                  expose: M,
                  inheritAttrs: C,
                  components: N,
                  directives: L,
                  filters: I,
                } = t;
                if (
                  (l &&
                    (function (e, t, n = y, r = !1) {
                      E(e) && (e = er(e));
                      for (const n in e) {
                        const o = e[n];
                        let i;
                        (i = P(o)
                          ? "default" in o
                            ? sn(o.from || n, o.default, !0)
                            : sn(o.from || n)
                          : sn(o)),
                          ft(i) && r
                            ? Object.defineProperty(t, n, {
                                enumerable: !0,
                                configurable: !0,
                                get: () => i.value,
                                set: (e) => (i.value = e),
                              })
                            : (t[n] = i);
                      }
                    })(l, r, null, e.appContext.config.unwrapInjectedRef),
                  s)
                )
                  for (const e in s) {
                    const t = s[e];
                    j(t) && (r[e] = t.bind(n));
                  }
                if (o) {
                  const t = o.call(n, n);
                  P(t) && (e.data = tt(t));
                }
                if (((Jn = !0), i))
                  for (const e in i) {
                    const t = i[e],
                      o = j(t) ? t.bind(n, n) : j(t.get) ? t.get.bind(n, n) : y,
                      s = !j(t) && j(t.set) ? t.set.bind(n) : y,
                      a = so({ get: o, set: s });
                    Object.defineProperty(r, e, {
                      enumerable: !0,
                      configurable: !0,
                      get: () => a.value,
                      set: (e) => (a.value = e),
                    });
                  }
                if (a) for (const e in a) Zn(a[e], r, n, e);
                if (c) {
                  const e = j(c) ? c.call(n) : c;
                  Reflect.ownKeys(e).forEach((t) => {
                    !(function (e, t) {
                      if (Qr) {
                        let n = Qr.provides;
                        const r = Qr.parent && Qr.parent.provides;
                        r === n && (n = Qr.provides = Object.create(r)),
                          (n[e] = t);
                      }
                    })(t, e[t]);
                  });
                }
                function D(e, t) {
                  E(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
                }
                if (
                  (u && Xn(u, e, "c"),
                  D(Mn, p),
                  D(Pn, f),
                  D(Cn, d),
                  D(Nn, h),
                  D(On, m),
                  D(En, g),
                  D(Un, x),
                  D(kn, O),
                  D(Rn, A),
                  D(Ln, b),
                  D(In, w),
                  D(Dn, T),
                  E(M))
                )
                  if (M.length) {
                    const t = e.exposed || (e.exposed = {});
                    M.forEach((e) => {
                      Object.defineProperty(t, e, {
                        get: () => n[e],
                        set: (t) => (n[e] = t),
                      });
                    });
                  } else e.exposed || (e.exposed = {});
                S && e.render === y && (e.render = S),
                  null != C && (e.inheritAttrs = C),
                  N && (e.components = N),
                  L && (e.directives = L);
              })(e),
              fe(),
              eo());
        }
        function io(e) {
          if (e.exposed)
            return (
              e.exposeProxy ||
              (e.exposeProxy = new Proxy(ht(lt(e.exposed)), {
                get: (t, n) => (n in t ? t[n] : n in $n ? $n[n](e) : void 0),
              }))
            );
        }
        const so = (e, t) =>
          (function (e, t, n = !1) {
            let r, o;
            const i = j(e);
            return (
              i ? ((r = e), (o = y)) : ((r = e.get), (o = e.set)),
              new yt(r, o, i || !o, n)
            );
          })(e, 0, no);
        Symbol("");
        const ao = "3.2.37",
          co = "undefined" != typeof document ? document : null,
          lo = co && co.createElement("template"),
          uo = {
            insert: (e, t, n) => {
              t.insertBefore(e, n || null);
            },
            remove: (e) => {
              const t = e.parentNode;
              t && t.removeChild(e);
            },
            createElement: (e, t, n, r) => {
              const o = t
                ? co.createElementNS("http://www.w3.org/2000/svg", e)
                : co.createElement(e, n ? { is: n } : void 0);
              return (
                "select" === e &&
                  r &&
                  null != r.multiple &&
                  o.setAttribute("multiple", r.multiple),
                o
              );
            },
            createText: (e) => co.createTextNode(e),
            createComment: (e) => co.createComment(e),
            setText: (e, t) => {
              e.nodeValue = t;
            },
            setElementText: (e, t) => {
              e.textContent = t;
            },
            parentNode: (e) => e.parentNode,
            nextSibling: (e) => e.nextSibling,
            querySelector: (e) => co.querySelector(e),
            setScopeId(e, t) {
              e.setAttribute(t, "");
            },
            cloneNode(e) {
              const t = e.cloneNode(!0);
              return "_value" in e && (t._value = e._value), t;
            },
            insertStaticContent(e, t, n, r, o, i) {
              const s = n ? n.previousSibling : t.lastChild;
              if (o && (o === i || o.nextSibling))
                for (
                  ;
                  t.insertBefore(o.cloneNode(!0), n),
                    o !== i && (o = o.nextSibling);

                );
              else {
                lo.innerHTML = r ? `<svg>${e}</svg>` : e;
                const o = lo.content;
                if (r) {
                  const e = o.firstChild;
                  for (; e.firstChild; ) o.appendChild(e.firstChild);
                  o.removeChild(e);
                }
                t.insertBefore(o, n);
              }
              return [
                s ? s.nextSibling : t.firstChild,
                n ? n.previousSibling : t.lastChild,
              ];
            },
          },
          po = /\s*!important$/;
        function fo(e, t, n) {
          if (E(n)) n.forEach((n) => fo(e, t, n));
          else if ((null == n && (n = ""), t.startsWith("--")))
            e.setProperty(t, n);
          else {
            const r = (function (e, t) {
              const n = yo[t];
              if (n) return n;
              let r = F(t);
              if ("filter" !== r && r in e) return (yo[t] = r);
              r = V(r);
              for (let n = 0; n < ho.length; n++) {
                const o = ho[n] + r;
                if (o in e) return (yo[t] = o);
              }
              return t;
            })(e, t);
            po.test(n)
              ? e.setProperty(z(r), n.replace(po, ""), "important")
              : (e[r] = n);
          }
        }
        const ho = ["Webkit", "Moz", "ms"],
          yo = {},
          mo = "http://www.w3.org/1999/xlink",
          [go, vo] = (() => {
            let e = Date.now,
              t = !1;
            if ("undefined" != typeof window) {
              Date.now() > document.createEvent("Event").timeStamp &&
                (e = performance.now.bind(performance));
              const n = navigator.userAgent.match(/firefox\/(\d+)/i);
              t = !!(n && Number(n[1]) <= 53);
            }
            return [e, t];
          })();
        let bo = 0;
        const _o = Promise.resolve(),
          wo = () => {
            bo = 0;
          };
        const So = /(?:Once|Passive|Capture)$/,
          Oo = /^on[a-z]/;
        "undefined" != typeof HTMLElement && HTMLElement;
        const Eo = "transition",
          Ao = "animation",
          xo = (e, { slots: t }) =>
            (function (e, t, n) {
              const r = arguments.length;
              return 2 === r
                ? P(t) && !E(t)
                  ? Dr(t)
                    ? zr(e, null, [t])
                    : zr(e, t)
                  : zr(e, null, t)
                : (r > 3
                    ? (n = Array.prototype.slice.call(arguments, 2))
                    : 3 === r && Dr(n) && (n = [n]),
                  zr(e, t, n));
            })(
              hn,
              (function (e) {
                const t = {};
                for (const n in e) n in jo || (t[n] = e[n]);
                if (!1 === e.css) return t;
                const {
                    name: n = "v",
                    type: r,
                    duration: o,
                    enterFromClass: i = `${n}-enter-from`,
                    enterActiveClass: s = `${n}-enter-active`,
                    enterToClass: a = `${n}-enter-to`,
                    appearFromClass: c = i,
                    appearActiveClass: l = s,
                    appearToClass: u = a,
                    leaveFromClass: p = `${n}-leave-from`,
                    leaveActiveClass: f = `${n}-leave-active`,
                    leaveToClass: d = `${n}-leave-to`,
                  } = e,
                  h = (function (e) {
                    if (null == e) return null;
                    if (P(e)) return [Po(e.enter), Po(e.leave)];
                    {
                      const t = Po(e);
                      return [t, t];
                    }
                  })(o),
                  y = h && h[0],
                  m = h && h[1],
                  {
                    onBeforeEnter: g,
                    onEnter: v,
                    onEnterCancelled: b,
                    onLeave: w,
                    onLeaveCancelled: S,
                    onBeforeAppear: O = g,
                    onAppear: E = v,
                    onAppearCancelled: A = b,
                  } = t,
                  x = (e, t, n) => {
                    No(e, t ? u : a), No(e, t ? l : s), n && n();
                  },
                  j = (e, t) => {
                    (e._isLeaving = !1), No(e, p), No(e, d), No(e, f), t && t();
                  },
                  T = (e) => (t, n) => {
                    const o = e ? E : v,
                      s = () => x(t, e, n);
                    To(o, [t, s]),
                      Lo(() => {
                        No(t, e ? c : i),
                          Co(t, e ? u : a),
                          Mo(o) || Do(t, r, y, s);
                      });
                  };
                return _(t, {
                  onBeforeEnter(e) {
                    To(g, [e]), Co(e, i), Co(e, s);
                  },
                  onBeforeAppear(e) {
                    To(O, [e]), Co(e, c), Co(e, l);
                  },
                  onEnter: T(!1),
                  onAppear: T(!0),
                  onLeave(e, t) {
                    e._isLeaving = !0;
                    const n = () => j(e, t);
                    Co(e, p),
                      document.body.offsetHeight,
                      Co(e, f),
                      Lo(() => {
                        e._isLeaving &&
                          (No(e, p), Co(e, d), Mo(w) || Do(e, r, m, n));
                      }),
                      To(w, [e, n]);
                  },
                  onEnterCancelled(e) {
                    x(e, !1), To(b, [e]);
                  },
                  onAppearCancelled(e) {
                    x(e, !0), To(A, [e]);
                  },
                  onLeaveCancelled(e) {
                    j(e), To(S, [e]);
                  },
                });
              })(e),
              t
            );
        xo.displayName = "Transition";
        const jo = {
            name: String,
            type: String,
            css: { type: Boolean, default: !0 },
            duration: [String, Number, Object],
            enterFromClass: String,
            enterActiveClass: String,
            enterToClass: String,
            appearFromClass: String,
            appearActiveClass: String,
            appearToClass: String,
            leaveFromClass: String,
            leaveActiveClass: String,
            leaveToClass: String,
          },
          To =
            ((xo.props = _({}, hn.props, jo)),
            (e, t = []) => {
              E(e) ? e.forEach((e) => e(...t)) : e && e(...t);
            }),
          Mo = (e) =>
            !!e && (E(e) ? e.some((e) => e.length > 1) : e.length > 1);
        function Po(e) {
          return J(e);
        }
        function Co(e, t) {
          t.split(/\s+/).forEach((t) => t && e.classList.add(t)),
            (e._vtc || (e._vtc = new Set())).add(t);
        }
        function No(e, t) {
          t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
          const { _vtc: n } = e;
          n && (n.delete(t), n.size || (e._vtc = void 0));
        }
        function Lo(e) {
          requestAnimationFrame(() => {
            requestAnimationFrame(e);
          });
        }
        let Io = 0;
        function Do(e, t, n, r) {
          const o = (e._endId = ++Io),
            i = () => {
              o === e._endId && r();
            };
          if (n) return setTimeout(i, n);
          const {
            type: s,
            timeout: a,
            propCount: c,
          } = (function (e, t) {
            const n = window.getComputedStyle(e),
              r = (e) => (n[e] || "").split(", "),
              o = r("transitionDelay"),
              i = r("transitionDuration"),
              s = Ro(o, i),
              a = r("animationDelay"),
              c = r("animationDuration"),
              l = Ro(a, c);
            let u = null,
              p = 0,
              f = 0;
            return (
              t === Eo
                ? s > 0 && ((u = Eo), (p = s), (f = i.length))
                : t === Ao
                ? l > 0 && ((u = Ao), (p = l), (f = c.length))
                : ((p = Math.max(s, l)),
                  (u = p > 0 ? (s > l ? Eo : Ao) : null),
                  (f = u ? (u === Eo ? i.length : c.length) : 0)),
              {
                type: u,
                timeout: p,
                propCount: f,
                hasTransform:
                  u === Eo &&
                  /\b(transform|all)(,|$)/.test(n.transitionProperty),
              }
            );
          })(e, t);
          if (!s) return r();
          const l = s + "end";
          let u = 0;
          const p = () => {
              e.removeEventListener(l, f), i();
            },
            f = (t) => {
              t.target === e && ++u >= c && p();
            };
          setTimeout(() => {
            u < c && p();
          }, a + 1),
            e.addEventListener(l, f);
        }
        function Ro(e, t) {
          for (; e.length < t.length; ) e = e.concat(e);
          return Math.max(...t.map((t, n) => ko(t) + ko(e[n])));
        }
        function ko(e) {
          return 1e3 * Number(e.slice(0, -1).replace(",", "."));
        }
        new WeakMap(), new WeakMap();
        const Uo = _(
          {
            patchProp: (e, t, n, r, s = !1, a, c, l, u) => {
              "class" === t
                ? (function (e, t, n) {
                    const r = e._vtc;
                    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
                      null == t
                        ? e.removeAttribute("class")
                        : n
                        ? e.setAttribute("class", t)
                        : (e.className = t);
                  })(e, r, s)
                : "style" === t
                ? (function (e, t, n) {
                    const r = e.style,
                      o = T(n);
                    if (n && !o) {
                      for (const e in n) fo(r, e, n[e]);
                      if (t && !T(t))
                        for (const e in t) null == n[e] && fo(r, e, "");
                    } else {
                      const i = r.display;
                      o
                        ? t !== n && (r.cssText = n)
                        : t && e.removeAttribute("style"),
                        "_vod" in e && (r.display = i);
                    }
                  })(e, n, r)
                : v(t)
                ? b(t) ||
                  (function (e, t, n, r, o = null) {
                    const i = e._vei || (e._vei = {}),
                      s = i[t];
                    if (r && s) s.value = r;
                    else {
                      const [n, a] = (function (e) {
                        let t;
                        if (So.test(e)) {
                          let n;
                          for (t = {}; (n = e.match(So)); )
                            (e = e.slice(0, e.length - n[0].length)),
                              (t[n[0].toLowerCase()] = !0);
                        }
                        return [z(e.slice(2)), t];
                      })(t);
                      if (r) {
                        const s = (i[t] = (function (e, t) {
                          const n = (e) => {
                            const r = e.timeStamp || go();
                            (vo || r >= n.attached - 1) &&
                              gt(
                                (function (e, t) {
                                  if (E(t)) {
                                    const n = e.stopImmediatePropagation;
                                    return (
                                      (e.stopImmediatePropagation = () => {
                                        n.call(e), (e._stopped = !0);
                                      }),
                                      t.map(
                                        (e) => (t) => !t._stopped && e && e(t)
                                      )
                                    );
                                  }
                                  return t;
                                })(e, n.value),
                                t,
                                5,
                                [e]
                              );
                          };
                          return (
                            (n.value = e),
                            (n.attached = bo || (_o.then(wo), (bo = go()))),
                            n
                          );
                        })(r, o));
                        !(function (e, t, n, r) {
                          e.addEventListener(t, n, r);
                        })(e, n, s, a);
                      } else
                        s &&
                          ((function (e, t, n, r) {
                            e.removeEventListener(t, n, r);
                          })(e, n, s, a),
                          (i[t] = void 0));
                    }
                  })(e, t, 0, r, c)
                : (
                    "." === t[0]
                      ? ((t = t.slice(1)), 1)
                      : "^" === t[0]
                      ? ((t = t.slice(1)), 0)
                      : (function (e, t, n, r) {
                          return r
                            ? "innerHTML" === t ||
                                "textContent" === t ||
                                !!(t in e && Oo.test(t) && j(n))
                            : "spellcheck" !== t &&
                                "draggable" !== t &&
                                "translate" !== t &&
                                "form" !== t &&
                                ("list" !== t || "INPUT" !== e.tagName) &&
                                ("type" !== t || "TEXTAREA" !== e.tagName) &&
                                (!Oo.test(t) || !T(n)) &&
                                t in e;
                        })(e, t, r, s)
                  )
                ? (function (e, t, n, r, o, s, a) {
                    if ("innerHTML" === t || "textContent" === t)
                      return r && a(r, o, s), void (e[t] = null == n ? "" : n);
                    if (
                      "value" === t &&
                      "PROGRESS" !== e.tagName &&
                      !e.tagName.includes("-")
                    ) {
                      e._value = n;
                      const r = null == n ? "" : n;
                      return (
                        (e.value === r && "OPTION" !== e.tagName) ||
                          (e.value = r),
                        void (null == n && e.removeAttribute(t))
                      );
                    }
                    let c = !1;
                    if ("" === n || null == n) {
                      const r = typeof e[t];
                      "boolean" === r
                        ? (n = i(n))
                        : null == n && "string" === r
                        ? ((n = ""), (c = !0))
                        : "number" === r && ((n = 0), (c = !0));
                    }
                    try {
                      e[t] = n;
                    } catch (e) {}
                    c && e.removeAttribute(t);
                  })(e, t, r, a, c, l, u)
                : ("true-value" === t
                    ? (e._trueValue = r)
                    : "false-value" === t && (e._falseValue = r),
                  (function (e, t, n, r, s) {
                    if (r && t.startsWith("xlink:"))
                      null == n
                        ? e.removeAttributeNS(mo, t.slice(6, t.length))
                        : e.setAttributeNS(mo, t, n);
                    else {
                      const r = o(t);
                      null == n || (r && !i(n))
                        ? e.removeAttribute(t)
                        : e.setAttribute(t, r ? "" : n);
                    }
                  })(e, t, r, s));
            },
          },
          uo
        );
        let Fo;
        const Bo = (...e) => {
          const t = (Fo || (Fo = _r(Uo))).createApp(...e),
            { mount: n } = t;
          return (
            (t.mount = (e) => {
              const r = (function (e) {
                if (T(e)) return document.querySelector(e);
                return e;
              })(e);
              if (!r) return;
              const o = t._component;
              j(o) || o.render || o.template || (o.template = r.innerHTML),
                (r.innerHTML = "");
              const i = n(r, !1, r instanceof SVGElement);
              return (
                r instanceof Element &&
                  (r.removeAttribute("v-cloak"),
                  r.setAttribute("data-v-app", "")),
                i
              );
            }),
            t
          );
        };
        var zo = { class: "h5p-audio-recorder-view" },
          Vo = ["innerHTML"],
          Go = ["innerHTML"],
          Ho = { key: 1, class: "h5p-audio-recorder-player" },
          $o = { controls: "controls" },
          Wo = Gr(" Your browser does not support the "),
          Jo = Br("code", null, "audio", -1),
          Xo = Gr(" element. "),
          Zo = ["src"],
          qo = { key: 3, class: "h5p-audio-recorder-upload" },
          Qo = { class: "button-row" },
          Ko = { class: "button-row-double" },
          Yo = Br("span", { class: "fa-circle" }, null, -1),
          ei = Br("span", { class: "fa-undo" }, null, -1),
          ti = { class: "label" },
          ni = Br("span", { class: "fa-pause" }, null, -1),
          ri = { class: "label" },
          oi = Br("span", { class: "fa-circle" }, null, -1),
          ii = { class: "label" },
          si = Br("span", { class: "fa-play-circle" }, null, -1),
          ai = { class: "label" },
          ci = { class: "button-row-left" },
          li = ["href", "upload"],
          ui = Br("span", { class: "icon-upload" }, null, -1),
          pi = { class: "button-row-right" },
          fi = Br("span", { class: "fa-undo" }, null, -1),
          di = { class: "label" };
        const hi = "unsupported",
          yi = "blocked",
          mi = "ready",
          gi = "recording",
          vi = "paused",
          bi = "done",
          _i = "insecure-not-allowed",
          wi = "cant-create-audio-file";
        var Si = {};
        (Si[mi] = "button-record"),
          (Si[gi] = "button-pause"),
          (Si[vi] = "button-continue"),
          (Si[bi] = "button-upload");
        const Oi = {
          methods: {
            resize: function () {
              this.$el &&
                (this.viewState =
                  this.$el.offsetWidth <= 576 ? "small" : "large");
            },
            record: function () {
              this.$emit(gi);
            },
            pause: function () {
              (this.state = vi), this.$emit(this.state);
            },
            done: function () {
              (this.state = bi), this.$emit(bi);
            },
            retry: function () {
              var e = this.$el;
              this.isSubcontent &&
                (e =
                  (function e(t) {
                    return t
                      ? -1 !== t.className.indexOf("h5p-content")
                        ? t
                        : e(t.parentNode)
                      : null;
                  })(this.$el) || this.$el);
              var t = new H5P.ConfirmationDialog({
                headerText: this.l10n.retryDialogHeaderText,
                dialogText: this.l10n.retryDialogBodyText,
                cancelText: this.l10n.retryDialogCancelText,
                confirmText: this.l10n.retryDialogConfirmText,
              });
              t.appendTo(e), t.show();
              var n = this;
              t.on("confirmed", function () {
                (n.state = mi),
                  n.$refs.timer && n.$refs.timer.reset(),
                  n.$emit("retry");
              });
            },
          },
          computed: {
            unEscape: function () {
              return this.statusMessages[this.state].replace(/&#039;/g, "'");
            },
          },
          watch: {
            state: function (e) {
              var t = this;
              Si[e] &&
                this.$nextTick(function () {
                  return t.$refs[Si[e]].focus();
                }),
                this.$emit("resize");
            },
          },
        };
        n(338);
        var Ei = n(959);
        const Ai = (0, Ei.Z)(Oi, [
          [
            "render",
            function (e, t, n, r, o, i) {
              var s = zn("vuMeter"),
                a = zn("timer");
              return (
                Mr(),
                Lr("div", zo, [
                  zr(
                    s,
                    {
                      avgMicFrequency: e.avgMicFrequency,
                      enablePulse: "recording" === e.state,
                    },
                    null,
                    8,
                    ["avgMicFrequency", "enablePulse"]
                  ),
                  "done" !== e.state && e.title
                    ? (Mr(),
                      Lr(
                        "div",
                        { key: 0, class: "title", innerHTML: e.title },
                        null,
                        8,
                        Vo
                      ))
                    : Hr("", !0),
                  Br(
                    "div",
                    {
                      role: "status",
                      class: u(e.state),
                      innerHTML: e.statusMessages[e.state],
                    },
                    null,
                    10,
                    Go
                  ),
                  "done" === e.state && "" !== e.audioSrc
                    ? (Mr(),
                      Lr("div", Ho, [
                        Br("audio", $o, [
                          Wo,
                          Jo,
                          Xo,
                          Br("source", { src: e.audioSrc }, null, 8, Zo),
                        ]),
                      ]))
                    : Hr("", !0),
                  "unsupported" !== e.state &&
                  "done" !== e.state &&
                  "insecure-not-allowed" !== e.state
                    ? (Mr(),
                      Ir(
                        a,
                        {
                          key: 2,
                          ref: "timer",
                          stopped: "recording" !== e.state,
                        },
                        null,
                        8,
                        ["stopped"]
                      ))
                    : Hr("", !0),
                  "blocked" !== e.state &&
                  "unsupported" !== e.state &&
                  "done" === e.state
                    ? (Mr(), Lr("div", qo, p(e.l10n.uploadRecording), 1))
                    : Hr("", !0),
                  Br("div", Qo, [
                    Br("div", Ko, [
                      "ready" === e.state || "blocked" === e.state
                        ? (Mr(),
                          Lr(
                            "button",
                            {
                              key: 0,
                              class: "button record",
                              ref: "button-record",
                              onClick:
                                t[0] ||
                                (t[0] = function () {
                                  return (
                                    i.record && i.record.apply(i, arguments)
                                  );
                                }),
                            },
                            [Yo, Gr(" " + p(e.l10n.recordAnswer), 1)],
                            512
                          ))
                        : Hr("", !0),
                      "recording" === e.state || "paused" === e.state
                        ? (Mr(),
                          Lr(
                            "button",
                            {
                              key: 1,
                              class: u([
                                "button retry small",
                                { "small-screen": "small" === this.viewState },
                              ]),
                              onClick:
                                t[1] ||
                                (t[1] = function () {
                                  return i.retry && i.retry.apply(i, arguments);
                                }),
                            },
                            [ei, Br("span", ti, p(e.l10n.retry), 1)],
                            2
                          ))
                        : Hr("", !0),
                      "recording" === e.state
                        ? (Mr(),
                          Lr(
                            "button",
                            {
                              key: 2,
                              class: u([
                                "button pause",
                                { "small-screen": "small" === this.viewState },
                              ]),
                              ref: "button-pause",
                              onClick:
                                t[2] ||
                                (t[2] = function () {
                                  return i.pause && i.pause.apply(i, arguments);
                                }),
                            },
                            [ni, Br("span", ri, p(e.l10n.pause), 1)],
                            2
                          ))
                        : Hr("", !0),
                      "paused" === e.state
                        ? (Mr(),
                          Lr(
                            "button",
                            {
                              key: 3,
                              class: u([
                                "button record",
                                { "small-screen": "small" === this.viewState },
                              ]),
                              ref: "button-continue",
                              onClick:
                                t[3] ||
                                (t[3] = function () {
                                  return (
                                    i.record && i.record.apply(i, arguments)
                                  );
                                }),
                            },
                            [oi, Br("span", ii, p(e.l10n.continue), 1)],
                            2
                          ))
                        : Hr("", !0),
                      "recording" === e.state || "paused" === e.state
                        ? (Mr(),
                          Lr(
                            "button",
                            {
                              key: 4,
                              class: u([
                                "button done small",
                                { "small-screen": "small" === this.viewState },
                              ]),
                              onClick:
                                t[4] ||
                                (t[4] = function () {
                                  return i.done && i.done.apply(i, arguments);
                                }),
                            },
                            [si, Br("span", ai, p(e.l10n.done), 1)],
                            2
                          ))
                        : Hr("", !0),
                    ]),
                    Br("span", ci, [
                      "done" === e.state
                        ? (Mr(),
                          Lr(
                            "a",
                            {
                              key: 0,
                              class: "button upload",
                              ref: "button-upload",
                              href: e.audioSrc,
                              upload_btn: e.audioFilename,
                            },
                            [ui, Gr(" " + p(e.l10n.upload_btn), 1)],
                            8,
                            li
                          ))
                        : Hr("", !0),
                    ]),
                    Br("span", pi, [
                      "done" === e.state || "cant-create-audio-file" === e.state
                        ? (Mr(),
                          Lr(
                            "button",
                            {
                              key: 0,
                              class: "button retry",
                              onClick:
                                t[5] ||
                                (t[5] = function () {
                                  return i.retry && i.retry.apply(i, arguments);
                                }),
                            },
                            [fi, Br("span", di, p(e.l10n.retry), 1)]
                          ))
                        : Hr("", !0),
                    ]),
                  ]),
                ])
              );
            },
          ],
        ]);
        var xi = { class: "recording-indicator-wrapper" },
          ji = Br("div", { class: "fa-microphone" }, null, -1);
        const Ti = {
          props: ["avgMicFrequency", "enablePulse"],
          computed: {
            pulseScale: function () {
              return (function (e) {
                e > 30 ? (e = 30) : e < 4 && (e = 4);
                var t = ((e - 4) / 30) * (1.3 - 0.7) + 0.7;
                return 0.005 * Math.round(t / 0.005);
              })(this.avgMicFrequency);
            },
          },
        };
        n(656);
        const Mi = (0, Ei.Z)(Ti, [
          [
            "render",
            function (e, t, n, r, o, i) {
              return (
                Mr(),
                Lr("div", xi, [
                  Br(
                    "div",
                    {
                      style: s({
                        transform: "scale(".concat(i.pulseScale, ")"),
                      }),
                      class: u([
                        [{ hidden: !n.enablePulse }],
                        "h5p-audio-recorder-vu-meter",
                      ]),
                    },
                    null,
                    6
                  ),
                  ji,
                ])
              );
            },
          ],
        ]);
        var Pi = { role: "timer", class: "audio-recorder-timer" },
          Ci = n(277);
        const Ni = {
          props: ["stopped"],
          mounted: function () {
            var e = this;
            setInterval(function () {
              e.secondsPassed = e.timer.time() / 1e3;
            }, 200);
          },
          data: function () {
            return { timer: new Ci(), secondsPassed: 0 };
          },
          methods: {
            reset: function () {
              (this.secondsPassed = 0), (this.timer = new Ci());
            },
          },
          computed: {
            formatTime: function () {
              var e = function (e) {
                  return e < 10 ? "0".concat(e) : "".concat(e);
                },
                t = parseInt(this.secondsPassed, 10),
                n = e(Math.floor(t / 60)),
                r = e(t - 60 * n);
              return "".concat(n, ":").concat(r);
            },
          },
          watch: {
            stopped: function (e) {
              this.timer[e ? "stop" : "start"]();
            },
          },
        };
        n(680);
        const Li = (0, Ei.Z)(Ni, [
          [
            "render",
            function (e, t, n, r, o, i) {
              return Mr(), Lr("div", Pi, p(i.formatTime), 1);
            },
          ],
        ]);
        function Ii(e) {
          return (
            (Ii =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            Ii(e)
          );
        }
        function Di(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function Ri(e, t) {
          return (
            (Ri = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (e, t) {
                  return (e.__proto__ = t), e;
                }),
            Ri(e, t)
          );
        }
        function ki(e, t) {
          if (t && ("object" === Ii(t) || "function" == typeof t)) return t;
          if (void 0 !== t)
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          return (function (e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return e;
          })(e);
        }
        function Ui(e) {
          return (
            (Ui = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
            Ui(e)
          );
        }
        var Fi = "inactive",
          Bi = "recording",
          zi = (function (e) {
            !(function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(e, "prototype", { writable: !1 }),
                t && Ri(e, t);
            })(s, H5P.EventDispatcher);
            var t,
              n,
              r,
              o,
              i =
                ((r = s),
                (o = (function () {
                  if ("undefined" == typeof Reflect || !Reflect.construct)
                    return !1;
                  if (Reflect.construct.sham) return !1;
                  if ("function" == typeof Proxy) return !0;
                  try {
                    return (
                      Boolean.prototype.valueOf.call(
                        Reflect.construct(Boolean, [], function () {})
                      ),
                      !0
                    );
                  } catch (e) {
                    return !1;
                  }
                })()),
                function () {
                  var e,
                    t = Ui(r);
                  if (o) {
                    var n = Ui(this).constructor;
                    e = Reflect.construct(t, arguments, n);
                  } else e = t.apply(this, arguments);
                  return ki(this, e);
                });
            function s() {
              var e;
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, s),
                ((e = i.call(this)).config = {
                  bufferLength: 4096,
                  numChannels: 1,
                }),
                (e.state = Fi);
              var t = new Blob(
                [
                  "/**\n * This is a web worker responsible for recording/buffering the sound and\n * encoding it as wav.\n */\n\nvar recLength = 0;\nvar recBuffers = [];\nvar sampleRate;\nvar numChannels;\n\n// Listen to incoming messages\nthis.onmessage = function(e) {\n  switch(e.data.command){\n    case 'init':\n      init(e.data.config);\n      break;\n    case 'record':\n      record(e.data.buffer);\n      break;\n    case 'export-wav':\n      exportWAV();\n      break;\n    case 'clear':\n      clear();\n      break;\n  }\n};\n\n/**\n * Initialization\n *\n * @param  {Object} config\n */\nfunction init(config) {\n  sampleRate = config.sampleRate;\n  numChannels = config.numChannels;\n  initBuffers();\n}\n\n/**\n * Storing the data buffer\n *\n * @param  {Float32Array} inputBuffer\n */\nfunction record(inputBuffer) {\n  for (var channel = 0; channel < numChannels; channel++){\n    recBuffers[channel].push(inputBuffer[channel]);\n  }\n  recLength += inputBuffer[0].length;\n}\n\n/**\n * Export buffered data as a wav encoded blob\n */\nfunction exportWAV() {\n  var buffers = [];\n  for (var channel = 0; channel < numChannels; channel++){\n    buffers.push(mergeBuffers(recBuffers[channel], recLength));\n  }\n  if (numChannels === 2){\n      var interleaved = interleave(buffers[0], buffers[1]);\n  } else {\n      var interleaved = buffers[0];\n  }\n  var dataview = encodeWAV(interleaved);\n  var audioBlob = new Blob([dataview], { type: 'audio/wav' });\n\n  this.postMessage({\n    command: 'wav-delivered',\n    blob: audioBlob\n  });\n}\n\n/**\n * Clear the buffers\n */\nfunction clear() {\n  recLength = 0;\n  recBuffers = [];\n  initBuffers();\n}\n\n/**\n * Initialize the buffers\n */\nfunction initBuffers() {\n  for (var channel = 0; channel < numChannels; channel++){\n    recBuffers[channel] = [];\n  }\n}\n\n/**\n * Merge buffers\n *\n * @param {Array} recBuffers\n * @param {[type]} recLength\n * @return {Float32Array}\n */\nfunction mergeBuffers(recBuffers, recLength){\n  var result = new Float32Array(recLength);\n  var offset = 0;\n  for (var i = 0; i < recBuffers.length; i++){\n    result.set(recBuffers[i], offset);\n    offset += recBuffers[i].length;\n  }\n  return result;\n}\n\n/**\n * Interleave two channels\n *\n * @param {Array} inputL\n * @param {Array} inputR\n * @return {Float32Array}\n */\nfunction interleave(inputL, inputR){\n  var length = inputL.length + inputR.length;\n  var result = new Float32Array(length);\n\n  var index = 0,\n    inputIndex = 0;\n\n  while (index < length){\n    result[index++] = inputL[inputIndex];\n    result[index++] = inputR[inputIndex];\n    inputIndex++;\n  }\n  return result;\n}\n\n/**\n * Convert floats to 16 bit PCMs\n *\n * @param {DataView} output\n * @param {number} offset\n * @param {Array} input\n */\nfunction floatTo16BitPCM(output, offset, input) {\n  for (var i = 0; i < input.length; i++, offset+=2){\n    var s = Math.max(-1, Math.min(1, input[i]));\n    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);\n  }\n}\n\n/**\n * Write string to wav header\n *\n * @param {DataView} view\n * @param {number} offset\n * @param {string} string\n */\nfunction writeString(view, offset, string) {\n  for (var i = 0; i < string.length; i++){\n    view.setUint8(offset + i, string.charCodeAt(i));\n  }\n}\n\n/**\n * Encode as wav\n *\n * @param {Array} samples\n * @return {DataView}\n */\nfunction encodeWAV(samples) {\n  var buffer = new ArrayBuffer(44 + samples.length * 2);\n  var view = new DataView(buffer);\n\n  /* RIFF identifier */\n  writeString(view, 0, 'RIFF');\n  /* RIFF chunk length */\n  view.setUint32(4, 36 + samples.length * 2, true);\n  /* RIFF type */\n  writeString(view, 8, 'WAVE');\n  /* format chunk identifier */\n  writeString(view, 12, 'fmt ');\n  /* format chunk length */\n  view.setUint32(16, 16, true);\n  /* sample format (raw) */\n  view.setUint16(20, 1, true);\n  /* channel count */\n  view.setUint16(22, numChannels, true);\n  /* sample rate */\n  view.setUint32(24, sampleRate, true);\n  /* byte rate (sample rate * block align) */\n  view.setUint32(28, sampleRate * 2 * numChannels, true);\n  /* block align (channel count * bytes per sample) */\n  view.setUint16(32, numChannels * 2, true);\n  /* bits per sample */\n  view.setUint16(34, 16, true);\n  /* data chunk identifier */\n  writeString(view, 36, 'data');\n  /* data chunk length */\n  view.setUint32(40, samples.length * 2, true);\n\n  floatTo16BitPCM(view, 44, samples);\n\n  return view;\n}\n",
                ],
                { type: "text/javascript" }
              );
              return (
                (e.worker = new Worker(URL.createObjectURL(t))),
                (e.worker.onmessage = function (t) {
                  e.trigger(t.data.command, t.data.blob);
                }),
                (e.worker.onerror = function (t) {
                  e.trigger("worker-error", t);
                }),
                e
              );
            }
            return (
              (t = s),
              (n = [

              {
                key: "getWavURL",
                value: function () {
                  var e = this;
                  this.stop();
                  var t = new Promise(function (resolve, reject) {
                    e.once("wav-delivered", function (e) {
                      const blob = e.data;
              
                      // Upload to Google Drive
                      const formData = new FormData();

                      // Get the current date and time
                      const now = new Date();
                      const timestamp = now.toISOString().replace(/[:.-]/g, ''); // Format the date and time to avoid invalid filename characters

                      // Append the date stamp to the file name
                      const filename = `recording_${timestamp}.wav`;

                      // Append the file with the new name to the FormData
                      formData.append("file", blob, filename);


                      //formData.append("file", blob, "recording.wav");
              
                      fetch("http://localhost:3000/upload", {
                        method: "POST",
                        body: formData,
                      })
                        .then((response) => {
                          if (!response.ok) throw new Error("Upload failed");
                          return response.json();
                        })
                        .then((data) => {
                          console.log("Uploaded to Google Drive, file ID:", data.fileId);
                          resolve(data.fileId);
                        })
                        .catch((error) => {
                          console.error("Upload error:", error);
                          reject(error);
                        });
                    }),
                      e.once("worker-error", function (e) {
                        reject(e);
                      });
                  });
              
                  return (
                    this.worker.postMessage({ command: "export-wav" }),
                    t
                  );
                },
              },
              
                
                {
                  key: "_setupAudioProcessing",
                  value: function (e) {
                    var t = this;
                    this.stream = e;
                    var n = window.AudioContext || window.webkitAudioContext;
                    (this.audioContext = new n()),
                      (this.scriptProcessorNode =
                        this.audioContext.createScriptProcessor(
                          this.config.bufferLength,
                          this.config.numChannels,
                          this.config.numChannels
                        )),
                      (this.scriptProcessorNode.onaudioprocess = function (e) {
                        t.state === Bi &&
                          t.worker.postMessage({
                            command: "record",
                            buffer: [e.inputBuffer.getChannelData(0)],
                          });
                      });
                    var r = this.audioContext.createAnalyser();
                    (r.minDecibels = -90),
                      (r.maxDecibels = -10),
                      (r.smoothingTimeConstant = 0.85),
                      (r.fftSize = 256),
                      (this.freqBufferLength = r.frequencyBinCount),
                      (this.freqDataArray = new Uint8Array(
                        this.freqBufferLength
                      )),
                      (this.freqAnalyser = r),
                      (this.sourceNode =
                        this.audioContext.createMediaStreamSource(e)),
                      this.sourceNode.connect(this.freqAnalyser),
                      this.freqAnalyser.connect(this.scriptProcessorNode),
                      this.scriptProcessorNode.connect(
                        this.audioContext.destination
                      );
                  },
                },
                {
                  key: "getAverageMicFrequency",
                  value: function () {
                    return (
                      this.freqAnalyser.getByteFrequencyData(
                        this.freqDataArray
                      ),
                      this.freqDataArray.reduce(function (e, t) {
                        return e + t;
                      }, 0) / this.freqBufferLength
                    );
                  },
                },
                {
                  key: "grabMic",
                  value: function () {
                    var e = this;
                    return this.supported()
                      ? (void 0 === this.userMedia &&
                          (this.userMedia = navigator.mediaDevices
                            .getUserMedia({ audio: !0 })
                            .then(function (t) {
                              e._setupAudioProcessing(t),
                                e.worker.postMessage({
                                  command: "init",
                                  config: {
                                    sampleRate: e.sourceNode.context.sampleRate,
                                    numChannels: e.config.numChannels,
                                  },
                                });
                            })
                            .catch(function (t) {
                              var n = "blocked";
                              return (
                                t.name &&
                                  -1 !==
                                    [
                                      "NotSupportedError",
                                      "NotSupportedError",
                                      "NotAllowedError",
                                    ].indexOf(t.name) &&
                                  (n = "insecure-not-allowed"),
                                delete e.userMedia,
                                Promise.reject(n)
                              );
                            })),
                        this.userMedia)
                      : Promise.reject();
                  },
                },
                {
                  key: "start",
                  value: function () {
                    var e = this;
                    this.grabMic()
                      .then(function () {
                        e._setState(Bi);
                      })
                      .catch(function (t) {
                        e.trigger(t);
                      });
                  },
                },
                {
                  key: "stop",
                  value: function () {
                    this._setState(Fi);
                  },
                },
                {
                  key: "supported",
                  value: function () {
                    return (
                      (void 0 !== window.AudioContext ||
                        void 0 !== window.webkitAudioContext) &&
                      navigator.mediaDevices &&
                      navigator.mediaDevices.getUserMedia
                    );
                  },
                },
                {
                  key: "releaseMic",
                  value: function () {
                    this._setState(Fi),
                      this.worker.postMessage({ command: "clear" }),
                      this.stream.getAudioTracks().forEach(function (e) {
                        return e.stop();
                      }),
                      this.sourceNode.disconnect(),
                      this.scriptProcessorNode.disconnect(),
                      "closed" !== this.audioContext.state &&
                        this.audioContext.close(),
                      delete this.userMedia;
                  },
                },
                {
                  key: "_setState",
                  value: function (e) {
                    (this.state = e), this.trigger(this.state);
                  },
                },
              ]),
              n && Di(t.prototype, n),
              Object.defineProperty(t, "prototype", { writable: !1 }),
              s
            );
          })();
        function Vi(e) {
          return (
            (Vi =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            Vi(e)
          );
        }
        function Gi(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        const Hi = (function () {
          function e() {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e);
          }
          var t, n;
          return (
            (t = e),
            (n = [
              {
                key: "extend",
                value: function () {
                  for (var e = 1; e < arguments.length; e++)
                    for (var t in arguments[e])
                      arguments[e].hasOwnProperty(t) &&
                        ("object" === Vi(arguments[0][t]) &&
                        "object" === Vi(arguments[e][t])
                          ? this.extend(arguments[0][t], arguments[e][t])
                          : (arguments[0][t] = arguments[e][t]));
                  return arguments[0];
                },
              },
            ]),
            null && Gi(t.prototype, null),
            n && Gi(t, n),
            Object.defineProperty(t, "prototype", { writable: !1 }),
            e
          );
        })();
        function $i(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function Wi(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? $i(Object(n), !0).forEach(function (t) {
                  Ji(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : $i(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        function Ji(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function Xi(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function Zi(e, t, n) {
          return (
            t && Xi(e.prototype, t),
            n && Xi(e, n),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            e
          );
        }
        var qi = Zi(function e(t, n) {
          var r = this;
          (function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            H5P.EventDispatcher.call(this),
            (t = Hi.extend(
              {
                l10n: {
                  recordAnswer: "Record",
                  pause: "Pause",
                  continue: "Continue",
                  upload_btn: "Upload",
                  done: "Done",
                  retry: "Retry",
                  microphoneNotSupported:
                    "Microphone not supported. Make sure you are using a browser that allows microphone recording.",
                  microphoneInaccessible:
                    "Microphone is not accessible. Make sure that the browser microphone is enabled.",
                  insecureNotAllowed:
                    "Access to microphone is not allowed in your browser since this page is not served using HTTPS. Please contact the author, and ask him to make this available using HTTPS",
                  statusReadyToRecord:
                    "Press a button below to record your answer.",
                  statusRecording: "Recording...",
                  statusPaused:
                    "Recording paused. Press a button to continue recording.",
                  statusFinishedRecording:
                    "You have successfully recorded your answer! Listen to the recording below.",
                  uploadRecording: "Upload this recording or retry.",
                  retryDialogHeaderText: "Retry recording?",
                  retryDialogBodyText:
                    'By pressing "Retry" you will lose your current recording.',
                  retryDialogConfirmText: "Retry",
                  retryDialogCancelText: "Cancel",
                  statusCantCreateTheAudioFile: "Can't create the audio file.",
                },
              },
              t
            ));
          var o = document.createElement("div");
          o.classList.add("h5p-audio-recorder");
          var i,
            s = (this.recorder = new zi()),
            a = {};
          (a[hi] = t.l10n.microphoneNotSupported),
            (a[yi] = t.l10n.microphoneInaccessible),
            (a[mi] = t.l10n.statusReadyToRecord),
            (a[gi] = t.l10n.statusRecording),
            (a[vi] = t.l10n.statusPaused),
            (a[bi] = t.l10n.statusFinishedRecording),
            (a[_i] = t.l10n.insecureNotAllowed),
            (a[wi] = t.l10n.statusCantCreateTheAudioFile);
          var c = this;
          Ai.data = function () {
            return {
              title: t.title,
              state: s.supported() ? mi : hi,
              statusMessages: a,
              l10n: t.l10n,
              audioSrc: "",
              audioFilename: "",
              avgMicFrequency: 0,
              isSubcontent: !c.hasOwnProperty("isRoot") || !c.isRoot(),
            };
          };
          var l = Bo(
            Wi(Wi({}, Ai), {}, { components: { timer: Li, vuMeter: Mi } }),
            {
              onRecording: function () {
                s.start();
              },
              onDone: function () {
                s.stop(),
                  s
                    .getWavURL()
                    .then(function (e) {
                      if (
                        (s.releaseMic(),
                        (i.$data.audioSrc = e),
                        t.title && t.title.length > 0)
                      ) {
                        var n = t.title.substr(0, 20);
                        i.$data.audioFilename =
                          n.toLowerCase().replace(/ /g, "-") + ".wav";
                      }
                      c.trigger("resize");
                    })
                    .catch(function (e) {
                      (i.$data.state = wi),
                        console.error(t.l10n.statusCantCreateTheAudioFile, e);
                    });
              },
              onRetry: function () {
                s.releaseMic(), (i.$data.audioSrc = "");
              },
              onPaused: function () {
                s.stop();
              },
              onResize: function () {
                c.trigger("resize");
              },
            }
          );
          this.on("resize", function () {
            i.resize();
          }),
            s.on("recording", function () {
              (i.$data.state = gi), r.updateMicFrequency();
            }),
            s.on("blocked", function () {
              i.$data.state = yi;
            }),
            s.on("insecure-not-allowed", function () {
              i.$data.state = _i;
            }),
            (this.updateMicFrequency = function () {
              var e = this;
              i.$data.state === gi
                ? ((i.$data.avgMicFrequency = s.getAverageMicFrequency()),
                  setTimeout(function () {
                    e.animateVUMeter = window.requestAnimationFrame(
                      function () {
                        e.updateMicFrequency();
                      }
                    );
                  }, 10))
                : window.cancelAnimationFrame(this.animateVUMeter);
            }),
            (this.attach = function (e) {
              e.get(0).appendChild(o), (i = l.mount(o));
            });
        });
      },
      737: (e, t, n) => {
        "use strict";
        var r = n(750),
          o = n(573),
          i = o(r("String.prototype.indexOf"));
        e.exports = function (e, t) {
          var n = r(e, !!t);
          return "function" == typeof n && i(e, ".prototype.") > -1 ? o(n) : n;
        };
      },
      573: (e, t, n) => {
        "use strict";
        var r = n(132),
          o = n(750),
          i = o("%Function.prototype.apply%"),
          s = o("%Function.prototype.call%"),
          a = o("%Reflect.apply%", !0) || r.call(s, i),
          c = o("%Object.getOwnPropertyDescriptor%", !0),
          l = o("%Object.defineProperty%", !0),
          u = o("%Math.max%");
        if (l)
          try {
            l({}, "a", { value: 1 });
          } catch (e) {
            l = null;
          }
        e.exports = function (e) {
          var t = a(r, s, arguments);
          if (c && l) {
            var n = c(t, "length");
            n.configurable &&
              l(t, "length", {
                value: 1 + u(0, e.length - (arguments.length - 1)),
              });
          }
          return t;
        };
        var p = function () {
          return a(r, i, arguments);
        };
        l ? l(e.exports, "apply", { value: p }) : (e.exports.apply = p);
      },
      833: (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { default: () => a });
        var r = n(933),
          o = n.n(r),
          i = n(476),
          s = n.n(i)()(o());
        s.push([
          e.id,
          '.h5p-content:not(.using-mouse) .h5p-audio-recorder-view .button:focus{outline:0;box-shadow:.06em 0 .6em .1em #7bc1f9}.h5p-audio-recorder-view{font-size:1em;padding:.9em;text-align:center;font-family:Arial,"Open Sans",sans-serif}.h5p-audio-recorder-view [class^=fa-]{font-family:"H5PFontAwesome4"}.h5p-audio-recorder-view .fa-microphone{width:60%;height:60%;left:50%;top:50%;transform:translate(-50%, -50%);position:absolute;font-size:2.5em;border-radius:50%;background-color:#fff;line-height:2.5em}.h5p-audio-recorder-view .h5p-audio-recorder-player{box-sizing:border-box;margin:1.25em 1em 0 1em}.h5p-audio-recorder-view .h5p-audio-recorder-player audio{width:100%}.h5p-audio-recorder-view .title{color:#000;font-size:1.25em;margin-bottom:1em;line-height:1.5em}.h5p-audio-recorder-view .icon-upload:before{font-family:"H5PFontIcons";content:""}.h5p-audio-recorder-view [role=status]{background-color:#f8f8f8;color:#777;padding:.6em}.h5p-audio-recorder-view [role=status].recording{background-color:#f9e5e6;color:#da5254}.h5p-audio-recorder-view [role=status].done{background-color:#e0f9e3;color:#20603d}.h5p-audio-recorder-view [role=status].blocked,.h5p-audio-recorder-view [role=status].unsupported,.h5p-audio-recorder-view [role=status].insecure-not-allowed,.h5p-audio-recorder-view [role=status].cant-create-audio-file{background-color:#db8b8b;color:#000}.h5p-audio-recorder-view .h5p-audio-recorder-upload{font-size:1.2em;padding:2em}.h5p-audio-recorder-view .h5p-confirmation-dialog-popup{top:5em;width:35em;max-width:100%;min-width:0}.h5p-audio-recorder-view .button-row{margin-bottom:1em}.h5p-audio-recorder-view .button-row .button-row-double{width:100%}.h5p-audio-recorder-view .button-row .button-row-left{text-align:right;flex:1}.h5p-audio-recorder-view .button-row .button-row-right{text-align:left;flex:1}.h5p-audio-recorder-view .button{font-size:1.042em;font-family:"Open Sans",sans-serif;padding:.708em 1.25em;border-radius:2em;margin:0 .5em;border:0;display:inline-block;cursor:pointer;text-decoration:none;font-weight:600;white-space:nowrap}.h5p-audio-recorder-view .button [class^=fa-]{font-weight:400}.h5p-audio-recorder-view .button.small{font-size:.85em}.h5p-audio-recorder-view .button.done{background-color:#fff;color:#1f824c;border:2px solid #1f824c;box-sizing:border-box}.h5p-audio-recorder-view .button.done:hover{color:#29ab64;border-color:#29ab64}.h5p-audio-recorder-view .button.done:active{color:#155934;border-color:#155934}.h5p-audio-recorder-view .button.done[disabled],.h5p-audio-recorder-view .button.done[aria-disabled]{color:#8ae3b2;border-color:#8ae3b2}.h5p-audio-recorder-view .button.retry{background-color:#5e5e5e;color:#fff;border-color:#5e5e5e;border:2px solid #5e5e5e;box-sizing:border-box}.h5p-audio-recorder-view .button.retry:hover{background-color:#515151;border-color:#515151}.h5p-audio-recorder-view .button.retry:active{background-color:#454545;border-color:#454545}.h5p-audio-recorder-view .button.retry[disabled]{background-color:#c4c4c4;border-color:#c4c4c4}.h5p-audio-recorder-view .button.record{background-color:#d95354;color:#fff;border-color:#d95354;border:2px solid #d95354;box-sizing:border-box}.h5p-audio-recorder-view .button.record:hover{background-color:#d43e3f;border-color:#d43e3f}.h5p-audio-recorder-view .button.record:active{background-color:#cc2d2e;border-color:#cc2d2e}.h5p-audio-recorder-view .button.record[disabled]{background-color:#fefafa;border-color:#fefafa}.h5p-audio-recorder-view .button.upload{background-color:#1f824c;color:#fff;border-color:#1f824c;border:2px solid #1f824c;box-sizing:border-box}.h5p-audio-recorder-view .button.upload:hover{background-color:#1a6d40;border-color:#1a6d40}.h5p-audio-recorder-view .button.upload:active{background-color:#155934;border-color:#155934}.h5p-audio-recorder-view .button.upload[disabled]{background-color:#8ae3b2;border-color:#8ae3b2}.h5p-audio-recorder-view .button.pause{background-color:#fff;color:#d95354;border:2px solid #d95354;box-sizing:border-box}.h5p-audio-recorder-view .button.pause:hover{color:#e27d7e;border-color:#e27d7e}.h5p-audio-recorder-view .button.pause:active{color:#cc2d2e;border-color:#cc2d2e}.h5p-audio-recorder-view .button.pause[disabled],.h5p-audio-recorder-view .button.pause[aria-disabled]{color:#fefafa;border-color:#fefafa}.h5p-audio-recorder-view .button.small-screen .label{display:none}.h5p-audio-recorder-view .button:not(.small-screen) [class^=fa-]{margin-right:.4em}.h5p-audio-recorder-view .button:not(.small-screen).record,.h5p-audio-recorder-view .button:not(.small-screen).pause{min-width:8.2em}',
          "",
        ]);
        const a = s;
      },
      903: (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { default: () => a });
        var r = n(933),
          o = n.n(r),
          i = n(476),
          s = n.n(i)()(o());
        s.push([
          e.id,
          '.audio-recorder-timer{font-family:"Open Sans",sans-serif;font-size:2.5em;font-weight:600;color:#8f8f8f;margin:1em 0}',
          "",
        ]);
        const a = s;
      },
      867: (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { default: () => f });
        var r = n(933),
          o = n.n(r),
          i = n(476),
          s = n.n(i),
          a = n(678),
          c = n.n(a),
          l = new URL(n(945), n.b),
          u = s()(o()),
          p = c()(l);
        u.push([
          e.id,
          ".recording-indicator-wrapper{height:9.375em;width:9.375em;margin-left:auto;margin-right:auto;line-height:9.375em;color:#8e8e8e;position:relative;margin-bottom:1em}.h5p-audio-recorder-vu-meter{height:100%;width:100%;background-image:url(" +
            p +
            ");position:absolute;transform:scale(0.8)}.h5p-audio-recorder-vu-meter.hidden{display:none}",
          "",
        ]);
        const f = u;
      },
      476: (e) => {
        "use strict";
        e.exports = function (e) {
          var t = [];
          return (
            (t.toString = function () {
              return this.map(function (t) {
                var n = "",
                  r = void 0 !== t[5];
                return (
                  t[4] && (n += "@supports (".concat(t[4], ") {")),
                  t[2] && (n += "@media ".concat(t[2], " {")),
                  r &&
                    (n += "@layer".concat(
                      t[5].length > 0 ? " ".concat(t[5]) : "",
                      " {"
                    )),
                  (n += e(t)),
                  r && (n += "}"),
                  t[2] && (n += "}"),
                  t[4] && (n += "}"),
                  n
                );
              }).join("");
            }),
            (t.i = function (e, n, r, o, i) {
              "string" == typeof e && (e = [[null, e, void 0]]);
              var s = {};
              if (r)
                for (var a = 0; a < this.length; a++) {
                  var c = this[a][0];
                  null != c && (s[c] = !0);
                }
              for (var l = 0; l < e.length; l++) {
                var u = [].concat(e[l]);
                (r && s[u[0]]) ||
                  (void 0 !== i &&
                    (void 0 === u[5] ||
                      (u[1] = "@layer"
                        .concat(u[5].length > 0 ? " ".concat(u[5]) : "", " {")
                        .concat(u[1], "}")),
                    (u[5] = i)),
                  n &&
                    (u[2]
                      ? ((u[1] = "@media "
                          .concat(u[2], " {")
                          .concat(u[1], "}")),
                        (u[2] = n))
                      : (u[2] = n)),
                  o &&
                    (u[4]
                      ? ((u[1] = "@supports ("
                          .concat(u[4], ") {")
                          .concat(u[1], "}")),
                        (u[4] = o))
                      : (u[4] = "".concat(o))),
                  t.push(u));
              }
            }),
            t
          );
        };
      },
      678: (e) => {
        "use strict";
        e.exports = function (e, t) {
          return (
            t || (t = {}),
            e
              ? ((e = String(e.__esModule ? e.default : e)),
                /^['"].*['"]$/.test(e) && (e = e.slice(1, -1)),
                t.hash && (e += t.hash),
                /["'() \t\n]|(%20)/.test(e) || t.needQuotes
                  ? '"'.concat(
                      e.replace(/"/g, '\\"').replace(/\n/g, "\\n"),
                      '"'
                    )
                  : e)
              : e
          );
        };
      },
      933: (e) => {
        "use strict";
        e.exports = function (e) {
          return e[1];
        };
      },
      343: (e) => {
        "use strict";
        var t,
          n = "object" == typeof Reflect ? Reflect : null,
          r =
            n && "function" == typeof n.apply
              ? n.apply
              : function (e, t, n) {
                  return Function.prototype.apply.call(e, t, n);
                };
        t =
          n && "function" == typeof n.ownKeys
            ? n.ownKeys
            : Object.getOwnPropertySymbols
            ? function (e) {
                return Object.getOwnPropertyNames(e).concat(
                  Object.getOwnPropertySymbols(e)
                );
              }
            : function (e) {
                return Object.getOwnPropertyNames(e);
              };
        var o =
          Number.isNaN ||
          function (e) {
            return e != e;
          };
        function i() {
          i.init.call(this);
        }
        (e.exports = i),
          (e.exports.once = function (e, t) {
            return new Promise(function (n, r) {
              function o(n) {
                e.removeListener(t, i), r(n);
              }
              function i() {
                "function" == typeof e.removeListener &&
                  e.removeListener("error", o),
                  n([].slice.call(arguments));
              }
              y(e, t, i, { once: !0 }),
                "error" !== t &&
                  (function (e, t, n) {
                    "function" == typeof e.on && y(e, "error", t, { once: !0 });
                  })(e, o);
            });
          }),
          (i.EventEmitter = i),
          (i.prototype._events = void 0),
          (i.prototype._eventsCount = 0),
          (i.prototype._maxListeners = void 0);
        var s = 10;
        function a(e) {
          if ("function" != typeof e)
            throw new TypeError(
              'The "listener" argument must be of type Function. Received type ' +
                typeof e
            );
        }
        function c(e) {
          return void 0 === e._maxListeners
            ? i.defaultMaxListeners
            : e._maxListeners;
        }
        function l(e, t, n, r) {
          var o, i, s, l;
          if (
            (a(n),
            void 0 === (i = e._events)
              ? ((i = e._events = Object.create(null)), (e._eventsCount = 0))
              : (void 0 !== i.newListener &&
                  (e.emit("newListener", t, n.listener ? n.listener : n),
                  (i = e._events)),
                (s = i[t])),
            void 0 === s)
          )
            (s = i[t] = n), ++e._eventsCount;
          else if (
            ("function" == typeof s
              ? (s = i[t] = r ? [n, s] : [s, n])
              : r
              ? s.unshift(n)
              : s.push(n),
            (o = c(e)) > 0 && s.length > o && !s.warned)
          ) {
            s.warned = !0;
            var u = new Error(
              "Possible EventEmitter memory leak detected. " +
                s.length +
                " " +
                String(t) +
                " listeners added. Use emitter.setMaxListeners() to increase limit"
            );
            (u.name = "MaxListenersExceededWarning"),
              (u.emitter = e),
              (u.type = t),
              (u.count = s.length),
              (l = u),
              console && console.warn && console.warn(l);
          }
          return e;
        }
        function u() {
          if (!this.fired)
            return (
              this.target.removeListener(this.type, this.wrapFn),
              (this.fired = !0),
              0 === arguments.length
                ? this.listener.call(this.target)
                : this.listener.apply(this.target, arguments)
            );
        }
        function p(e, t, n) {
          var r = {
              fired: !1,
              wrapFn: void 0,
              target: e,
              type: t,
              listener: n,
            },
            o = u.bind(r);
          return (o.listener = n), (r.wrapFn = o), o;
        }
        function f(e, t, n) {
          var r = e._events;
          if (void 0 === r) return [];
          var o = r[t];
          return void 0 === o
            ? []
            : "function" == typeof o
            ? n
              ? [o.listener || o]
              : [o]
            : n
            ? (function (e) {
                for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                  t[n] = e[n].listener || e[n];
                return t;
              })(o)
            : h(o, o.length);
        }
        function d(e) {
          var t = this._events;
          if (void 0 !== t) {
            var n = t[e];
            if ("function" == typeof n) return 1;
            if (void 0 !== n) return n.length;
          }
          return 0;
        }
        function h(e, t) {
          for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
          return n;
        }
        function y(e, t, n, r) {
          if ("function" == typeof e.on) r.once ? e.once(t, n) : e.on(t, n);
          else {
            if ("function" != typeof e.addEventListener)
              throw new TypeError(
                'The "emitter" argument must be of type EventEmitter. Received type ' +
                  typeof e
              );
            e.addEventListener(t, function o(i) {
              r.once && e.removeEventListener(t, o), n(i);
            });
          }
        }
        Object.defineProperty(i, "defaultMaxListeners", {
          enumerable: !0,
          get: function () {
            return s;
          },
          set: function (e) {
            if ("number" != typeof e || e < 0 || o(e))
              throw new RangeError(
                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                  e +
                  "."
              );
            s = e;
          },
        }),
          (i.init = function () {
            (void 0 !== this._events &&
              this._events !== Object.getPrototypeOf(this)._events) ||
              ((this._events = Object.create(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }),
          (i.prototype.setMaxListeners = function (e) {
            if ("number" != typeof e || e < 0 || o(e))
              throw new RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' +
                  e +
                  "."
              );
            return (this._maxListeners = e), this;
          }),
          (i.prototype.getMaxListeners = function () {
            return c(this);
          }),
          (i.prototype.emit = function (e) {
            for (var t = [], n = 1; n < arguments.length; n++)
              t.push(arguments[n]);
            var o = "error" === e,
              i = this._events;
            if (void 0 !== i) o = o && void 0 === i.error;
            else if (!o) return !1;
            if (o) {
              var s;
              if ((t.length > 0 && (s = t[0]), s instanceof Error)) throw s;
              var a = new Error(
                "Unhandled error." + (s ? " (" + s.message + ")" : "")
              );
              throw ((a.context = s), a);
            }
            var c = i[e];
            if (void 0 === c) return !1;
            if ("function" == typeof c) r(c, this, t);
            else {
              var l = c.length,
                u = h(c, l);
              for (n = 0; n < l; ++n) r(u[n], this, t);
            }
            return !0;
          }),
          (i.prototype.addListener = function (e, t) {
            return l(this, e, t, !1);
          }),
          (i.prototype.on = i.prototype.addListener),
          (i.prototype.prependListener = function (e, t) {
            return l(this, e, t, !0);
          }),
          (i.prototype.once = function (e, t) {
            return a(t), this.on(e, p(this, e, t)), this;
          }),
          (i.prototype.prependOnceListener = function (e, t) {
            return a(t), this.prependListener(e, p(this, e, t)), this;
          }),
          (i.prototype.removeListener = function (e, t) {
            var n, r, o, i, s;
            if ((a(t), void 0 === (r = this._events))) return this;
            if (void 0 === (n = r[e])) return this;
            if (n === t || n.listener === t)
              0 == --this._eventsCount
                ? (this._events = Object.create(null))
                : (delete r[e],
                  r.removeListener &&
                    this.emit("removeListener", e, n.listener || t));
            else if ("function" != typeof n) {
              for (o = -1, i = n.length - 1; i >= 0; i--)
                if (n[i] === t || n[i].listener === t) {
                  (s = n[i].listener), (o = i);
                  break;
                }
              if (o < 0) return this;
              0 === o
                ? n.shift()
                : (function (e, t) {
                    for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                    e.pop();
                  })(n, o),
                1 === n.length && (r[e] = n[0]),
                void 0 !== r.removeListener &&
                  this.emit("removeListener", e, s || t);
            }
            return this;
          }),
          (i.prototype.off = i.prototype.removeListener),
          (i.prototype.removeAllListeners = function (e) {
            var t, n, r;
            if (void 0 === (n = this._events)) return this;
            if (void 0 === n.removeListener)
              return (
                0 === arguments.length
                  ? ((this._events = Object.create(null)),
                    (this._eventsCount = 0))
                  : void 0 !== n[e] &&
                    (0 == --this._eventsCount
                      ? (this._events = Object.create(null))
                      : delete n[e]),
                this
              );
            if (0 === arguments.length) {
              var o,
                i = Object.keys(n);
              for (r = 0; r < i.length; ++r)
                "removeListener" !== (o = i[r]) && this.removeAllListeners(o);
              return (
                this.removeAllListeners("removeListener"),
                (this._events = Object.create(null)),
                (this._eventsCount = 0),
                this
              );
            }
            if ("function" == typeof (t = n[e])) this.removeListener(e, t);
            else if (void 0 !== t)
              for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
            return this;
          }),
          (i.prototype.listeners = function (e) {
            return f(this, e, !0);
          }),
          (i.prototype.rawListeners = function (e) {
            return f(this, e, !1);
          }),
          (i.listenerCount = function (e, t) {
            return "function" == typeof e.listenerCount
              ? e.listenerCount(t)
              : d.call(e, t);
          }),
          (i.prototype.listenerCount = d),
          (i.prototype.eventNames = function () {
            return this._eventsCount > 0 ? t(this._events) : [];
          });
      },
      278: (e, t, n) => {
        "use strict";
        var r = n(922),
          o = Object.prototype.toString,
          i = Object.prototype.hasOwnProperty,
          s = function (e, t, n) {
            for (var r = 0, o = e.length; r < o; r++)
              i.call(e, r) &&
                (null == n ? t(e[r], r, e) : t.call(n, e[r], r, e));
          },
          a = function (e, t, n) {
            for (var r = 0, o = e.length; r < o; r++)
              null == n ? t(e.charAt(r), r, e) : t.call(n, e.charAt(r), r, e);
          },
          c = function (e, t, n) {
            for (var r in e)
              i.call(e, r) &&
                (null == n ? t(e[r], r, e) : t.call(n, e[r], r, e));
          };
        e.exports = function (e, t, n) {
          if (!r(t)) throw new TypeError("iterator must be a function");
          var i;
          arguments.length >= 3 && (i = n),
            "[object Array]" === o.call(e)
              ? s(e, t, i)
              : "string" == typeof e
              ? a(e, t, i)
              : c(e, t, i);
        };
      },
      458: (e) => {
        "use strict";
        var t = "Function.prototype.bind called on incompatible ",
          n = Array.prototype.slice,
          r = Object.prototype.toString,
          o = "[object Function]";
        e.exports = function (e) {
          var i = this;
          if ("function" != typeof i || r.call(i) !== o)
            throw new TypeError(t + i);
          for (
            var s,
              a = n.call(arguments, 1),
              c = function () {
                if (this instanceof s) {
                  var t = i.apply(this, a.concat(n.call(arguments)));
                  return Object(t) === t ? t : this;
                }
                return i.apply(e, a.concat(n.call(arguments)));
              },
              l = Math.max(0, i.length - a.length),
              u = [],
              p = 0;
            p < l;
            p++
          )
            u.push("$" + p);
          if (
            ((s = Function(
              "binder",
              "return function (" +
                u.join(",") +
                "){ return binder.apply(this,arguments); }"
            )(c)),
            i.prototype)
          ) {
            var f = function () {};
            (f.prototype = i.prototype),
              (s.prototype = new f()),
              (f.prototype = null);
          }
          return s;
        };
      },
      132: (e, t, n) => {
        "use strict";
        var r = n(458);
        e.exports = Function.prototype.bind || r;
      },
      750: (e, t, n) => {
        "use strict";
        var r,
          o = SyntaxError,
          i = Function,
          s = TypeError,
          a = function (e) {
            try {
              return i('"use strict"; return (' + e + ").constructor;")();
            } catch (e) {}
          },
          c = Object.getOwnPropertyDescriptor;
        if (c)
          try {
            c({}, "");
          } catch (e) {
            c = null;
          }
        var l = function () {
            throw new s();
          },
          u = c
            ? (function () {
                try {
                  return l;
                } catch (e) {
                  try {
                    return c(arguments, "callee").get;
                  } catch (e) {
                    return l;
                  }
                }
              })()
            : l,
          p = n(679)(),
          f =
            Object.getPrototypeOf ||
            function (e) {
              return e.__proto__;
            },
          d = {},
          h = "undefined" == typeof Uint8Array ? r : f(Uint8Array),
          y = {
            "%AggregateError%":
              "undefined" == typeof AggregateError ? r : AggregateError,
            "%Array%": Array,
            "%ArrayBuffer%":
              "undefined" == typeof ArrayBuffer ? r : ArrayBuffer,
            "%ArrayIteratorPrototype%": p ? f([][Symbol.iterator]()) : r,
            "%AsyncFromSyncIteratorPrototype%": r,
            "%AsyncFunction%": d,
            "%AsyncGenerator%": d,
            "%AsyncGeneratorFunction%": d,
            "%AsyncIteratorPrototype%": d,
            "%Atomics%": "undefined" == typeof Atomics ? r : Atomics,
            "%BigInt%": "undefined" == typeof BigInt ? r : BigInt,
            "%Boolean%": Boolean,
            "%DataView%": "undefined" == typeof DataView ? r : DataView,
            "%Date%": Date,
            "%decodeURI%": decodeURI,
            "%decodeURIComponent%": decodeURIComponent,
            "%encodeURI%": encodeURI,
            "%encodeURIComponent%": encodeURIComponent,
            "%Error%": Error,
            "%eval%": eval,
            "%EvalError%": EvalError,
            "%Float32Array%":
              "undefined" == typeof Float32Array ? r : Float32Array,
            "%Float64Array%":
              "undefined" == typeof Float64Array ? r : Float64Array,
            "%FinalizationRegistry%":
              "undefined" == typeof FinalizationRegistry
                ? r
                : FinalizationRegistry,
            "%Function%": i,
            "%GeneratorFunction%": d,
            "%Int8Array%": "undefined" == typeof Int8Array ? r : Int8Array,
            "%Int16Array%": "undefined" == typeof Int16Array ? r : Int16Array,
            "%Int32Array%": "undefined" == typeof Int32Array ? r : Int32Array,
            "%isFinite%": isFinite,
            "%isNaN%": isNaN,
            "%IteratorPrototype%": p ? f(f([][Symbol.iterator]())) : r,
            "%JSON%": "object" == typeof JSON ? JSON : r,
            "%Map%": "undefined" == typeof Map ? r : Map,
            "%MapIteratorPrototype%":
              "undefined" != typeof Map && p
                ? f(new Map()[Symbol.iterator]())
                : r,
            "%Math%": Math,
            "%Number%": Number,
            "%Object%": Object,
            "%parseFloat%": parseFloat,
            "%parseInt%": parseInt,
            "%Promise%": "undefined" == typeof Promise ? r : Promise,
            "%Proxy%": "undefined" == typeof Proxy ? r : Proxy,
            "%RangeError%": RangeError,
            "%ReferenceError%": ReferenceError,
            "%Reflect%": "undefined" == typeof Reflect ? r : Reflect,
            "%RegExp%": RegExp,
            "%Set%": "undefined" == typeof Set ? r : Set,
            "%SetIteratorPrototype%":
              "undefined" != typeof Set && p
                ? f(new Set()[Symbol.iterator]())
                : r,
            "%SharedArrayBuffer%":
              "undefined" == typeof SharedArrayBuffer ? r : SharedArrayBuffer,
            "%String%": String,
            "%StringIteratorPrototype%": p ? f(""[Symbol.iterator]()) : r,
            "%Symbol%": p ? Symbol : r,
            "%SyntaxError%": o,
            "%ThrowTypeError%": u,
            "%TypedArray%": h,
            "%TypeError%": s,
            "%Uint8Array%": "undefined" == typeof Uint8Array ? r : Uint8Array,
            "%Uint8ClampedArray%":
              "undefined" == typeof Uint8ClampedArray ? r : Uint8ClampedArray,
            "%Uint16Array%":
              "undefined" == typeof Uint16Array ? r : Uint16Array,
            "%Uint32Array%":
              "undefined" == typeof Uint32Array ? r : Uint32Array,
            "%URIError%": URIError,
            "%WeakMap%": "undefined" == typeof WeakMap ? r : WeakMap,
            "%WeakRef%": "undefined" == typeof WeakRef ? r : WeakRef,
            "%WeakSet%": "undefined" == typeof WeakSet ? r : WeakSet,
          },
          m = function e(t) {
            var n;
            if ("%AsyncFunction%" === t) n = a("async function () {}");
            else if ("%GeneratorFunction%" === t) n = a("function* () {}");
            else if ("%AsyncGeneratorFunction%" === t)
              n = a("async function* () {}");
            else if ("%AsyncGenerator%" === t) {
              var r = e("%AsyncGeneratorFunction%");
              r && (n = r.prototype);
            } else if ("%AsyncIteratorPrototype%" === t) {
              var o = e("%AsyncGenerator%");
              o && (n = f(o.prototype));
            }
            return (y[t] = n), n;
          },
          g = {
            "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
            "%ArrayPrototype%": ["Array", "prototype"],
            "%ArrayProto_entries%": ["Array", "prototype", "entries"],
            "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
            "%ArrayProto_keys%": ["Array", "prototype", "keys"],
            "%ArrayProto_values%": ["Array", "prototype", "values"],
            "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
            "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
            "%AsyncGeneratorPrototype%": [
              "AsyncGeneratorFunction",
              "prototype",
              "prototype",
            ],
            "%BooleanPrototype%": ["Boolean", "prototype"],
            "%DataViewPrototype%": ["DataView", "prototype"],
            "%DatePrototype%": ["Date", "prototype"],
            "%ErrorPrototype%": ["Error", "prototype"],
            "%EvalErrorPrototype%": ["EvalError", "prototype"],
            "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
            "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
            "%FunctionPrototype%": ["Function", "prototype"],
            "%Generator%": ["GeneratorFunction", "prototype"],
            "%GeneratorPrototype%": [
              "GeneratorFunction",
              "prototype",
              "prototype",
            ],
            "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
            "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
            "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
            "%JSONParse%": ["JSON", "parse"],
            "%JSONStringify%": ["JSON", "stringify"],
            "%MapPrototype%": ["Map", "prototype"],
            "%NumberPrototype%": ["Number", "prototype"],
            "%ObjectPrototype%": ["Object", "prototype"],
            "%ObjProto_toString%": ["Object", "prototype", "toString"],
            "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
            "%PromisePrototype%": ["Promise", "prototype"],
            "%PromiseProto_then%": ["Promise", "prototype", "then"],
            "%Promise_all%": ["Promise", "all"],
            "%Promise_reject%": ["Promise", "reject"],
            "%Promise_resolve%": ["Promise", "resolve"],
            "%RangeErrorPrototype%": ["RangeError", "prototype"],
            "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
            "%RegExpPrototype%": ["RegExp", "prototype"],
            "%SetPrototype%": ["Set", "prototype"],
            "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
            "%StringPrototype%": ["String", "prototype"],
            "%SymbolPrototype%": ["Symbol", "prototype"],
            "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
            "%TypedArrayPrototype%": ["TypedArray", "prototype"],
            "%TypeErrorPrototype%": ["TypeError", "prototype"],
            "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
            "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
            "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
            "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
            "%URIErrorPrototype%": ["URIError", "prototype"],
            "%WeakMapPrototype%": ["WeakMap", "prototype"],
            "%WeakSetPrototype%": ["WeakSet", "prototype"],
          },
          v = n(132),
          b = n(492),
          _ = v.call(Function.call, Array.prototype.concat),
          w = v.call(Function.apply, Array.prototype.splice),
          S = v.call(Function.call, String.prototype.replace),
          O = v.call(Function.call, String.prototype.slice),
          E = v.call(Function.call, RegExp.prototype.exec),
          A =
            /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
          x = /\\(\\)?/g,
          j = function (e) {
            var t = O(e, 0, 1),
              n = O(e, -1);
            if ("%" === t && "%" !== n)
              throw new o("invalid intrinsic syntax, expected closing `%`");
            if ("%" === n && "%" !== t)
              throw new o("invalid intrinsic syntax, expected opening `%`");
            var r = [];
            return (
              S(e, A, function (e, t, n, o) {
                r[r.length] = n ? S(o, x, "$1") : t || e;
              }),
              r
            );
          },
          T = function (e, t) {
            var n,
              r = e;
            if ((b(g, r) && (r = "%" + (n = g[r])[0] + "%"), b(y, r))) {
              var i = y[r];
              if ((i === d && (i = m(r)), void 0 === i && !t))
                throw new s(
                  "intrinsic " +
                    e +
                    " exists, but is not available. Please file an issue!"
                );
              return { alias: n, name: r, value: i };
            }
            throw new o("intrinsic " + e + " does not exist!");
          };
        e.exports = function (e, t) {
          if ("string" != typeof e || 0 === e.length)
            throw new s("intrinsic name must be a non-empty string");
          if (arguments.length > 1 && "boolean" != typeof t)
            throw new s('"allowMissing" argument must be a boolean');
          if (null === E(/^%?[^%]*%?$/g, e))
            throw new o(
              "`%` may not be present anywhere but at the beginning and end of the intrinsic name"
            );
          var n = j(e),
            r = n.length > 0 ? n[0] : "",
            i = T("%" + r + "%", t),
            a = i.name,
            l = i.value,
            u = !1,
            p = i.alias;
          p && ((r = p[0]), w(n, _([0, 1], p)));
          for (var f = 1, d = !0; f < n.length; f += 1) {
            var h = n[f],
              m = O(h, 0, 1),
              g = O(h, -1);
            if (
              ('"' === m ||
                "'" === m ||
                "`" === m ||
                '"' === g ||
                "'" === g ||
                "`" === g) &&
              m !== g
            )
              throw new o(
                "property names with quotes must have matching quotes"
              );
            if (
              (("constructor" !== h && d) || (u = !0),
              b(y, (a = "%" + (r += "." + h) + "%")))
            )
              l = y[a];
            else if (null != l) {
              if (!(h in l)) {
                if (!t)
                  throw new s(
                    "base intrinsic for " +
                      e +
                      " exists, but the property is not available."
                  );
                return;
              }
              if (c && f + 1 >= n.length) {
                var v = c(l, h);
                l =
                  (d = !!v) && "get" in v && !("originalValue" in v.get)
                    ? v.get
                    : l[h];
              } else (d = b(l, h)), (l = l[h]);
              d && !u && (y[a] = l);
            }
          }
          return l;
        };
      },
      679: (e, t, n) => {
        "use strict";
        var r = "undefined" != typeof Symbol && Symbol,
          o = n(186);
        e.exports = function () {
          return (
            "function" == typeof r &&
            "function" == typeof Symbol &&
            "symbol" == typeof r("foo") &&
            "symbol" == typeof Symbol("bar") &&
            o()
          );
        };
      },
      186: (e) => {
        "use strict";
        e.exports = function () {
          if (
            "function" != typeof Symbol ||
            "function" != typeof Object.getOwnPropertySymbols
          )
            return !1;
          if ("symbol" == typeof Symbol.iterator) return !0;
          var e = {},
            t = Symbol("test"),
            n = Object(t);
          if ("string" == typeof t) return !1;
          if ("[object Symbol]" !== Object.prototype.toString.call(t))
            return !1;
          if ("[object Symbol]" !== Object.prototype.toString.call(n))
            return !1;
          for (t in ((e[t] = 42), e)) return !1;
          if ("function" == typeof Object.keys && 0 !== Object.keys(e).length)
            return !1;
          if (
            "function" == typeof Object.getOwnPropertyNames &&
            0 !== Object.getOwnPropertyNames(e).length
          )
            return !1;
          var r = Object.getOwnPropertySymbols(e);
          if (1 !== r.length || r[0] !== t) return !1;
          if (!Object.prototype.propertyIsEnumerable.call(e, t)) return !1;
          if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var o = Object.getOwnPropertyDescriptor(e, t);
            if (42 !== o.value || !0 !== o.enumerable) return !1;
          }
          return !0;
        };
      },
      698: (e, t, n) => {
        "use strict";
        var r = n(186);
        e.exports = function () {
          return r() && !!Symbol.toStringTag;
        };
      },
      492: (e, t, n) => {
        "use strict";
        var r = n(132);
        e.exports = r.call(Function.call, Object.prototype.hasOwnProperty);
      },
      87: (e) => {
        "function" == typeof Object.create
          ? (e.exports = function (e, t) {
              t &&
                ((e.super_ = t),
                (e.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })));
            })
          : (e.exports = function (e, t) {
              if (t) {
                e.super_ = t;
                var n = function () {};
                (n.prototype = t.prototype),
                  (e.prototype = new n()),
                  (e.prototype.constructor = e);
              }
            });
      },
      740: (e, t, n) => {
        "use strict";
        var r = n(698)(),
          o = n(737)("Object.prototype.toString"),
          i = function (e) {
            return (
              !(r && e && "object" == typeof e && Symbol.toStringTag in e) &&
              "[object Arguments]" === o(e)
            );
          },
          s = function (e) {
            return (
              !!i(e) ||
              (null !== e &&
                "object" == typeof e &&
                "number" == typeof e.length &&
                e.length >= 0 &&
                "[object Array]" !== o(e) &&
                "[object Function]" === o(e.callee))
            );
          },
          a = (function () {
            return i(arguments);
          })();
        (i.isLegacyArguments = s), (e.exports = a ? i : s);
      },
      922: (e) => {
        "use strict";
        var t,
          n,
          r = Function.prototype.toString,
          o = "object" == typeof Reflect && null !== Reflect && Reflect.apply;
        if (
          "function" == typeof o &&
          "function" == typeof Object.defineProperty
        )
          try {
            (t = Object.defineProperty({}, "length", {
              get: function () {
                throw n;
              },
            })),
              (n = {}),
              o(
                function () {
                  throw 42;
                },
                null,
                t
              );
          } catch (e) {
            e !== n && (o = null);
          }
        else o = null;
        var i = /^\s*class\b/,
          s = function (e) {
            try {
              var t = r.call(e);
              return i.test(t);
            } catch (e) {
              return !1;
            }
          },
          a = Object.prototype.toString,
          c = "function" == typeof Symbol && !!Symbol.toStringTag,
          l =
            "object" == typeof document &&
            void 0 === document.all &&
            void 0 !== document.all
              ? document.all
              : {};
        e.exports = o
          ? function (e) {
              if (e === l) return !0;
              if (!e) return !1;
              if ("function" != typeof e && "object" != typeof e) return !1;
              if ("function" == typeof e && !e.prototype) return !0;
              try {
                o(e, null, t);
              } catch (e) {
                if (e !== n) return !1;
              }
              return !s(e);
            }
          : function (e) {
              if (e === l) return !0;
              if (!e) return !1;
              if ("function" != typeof e && "object" != typeof e) return !1;
              if ("function" == typeof e && !e.prototype) return !0;
              if (c)
                return (function (e) {
                  try {
                    return !s(e) && (r.call(e), !0);
                  } catch (e) {
                    return !1;
                  }
                })(e);
              if (s(e)) return !1;
              var t = a.call(e);
              return (
                "[object Function]" === t || "[object GeneratorFunction]" === t
              );
            };
      },
      265: (e, t, n) => {
        "use strict";
        var r,
          o = Object.prototype.toString,
          i = Function.prototype.toString,
          s = /^\s*(?:function)?\*/,
          a = n(698)(),
          c = Object.getPrototypeOf;
        e.exports = function (e) {
          if ("function" != typeof e) return !1;
          if (s.test(i.call(e))) return !0;
          if (!a) return "[object GeneratorFunction]" === o.call(e);
          if (!c) return !1;
          if (void 0 === r) {
            var t = (function () {
              if (!a) return !1;
              try {
                return Function("return function*() {}")();
              } catch (e) {}
            })();
            r = !!t && c(t);
          }
          return c(e) === r;
        };
      },
      387: (e, t, n) => {
        "use strict";
        var r = n(278),
          o = n(973),
          i = n(737),
          s = i("Object.prototype.toString"),
          a = n(698)(),
          c = "undefined" == typeof globalThis ? n.g : globalThis,
          l = o(),
          u =
            i("Array.prototype.indexOf", !0) ||
            function (e, t) {
              for (var n = 0; n < e.length; n += 1) if (e[n] === t) return n;
              return -1;
            },
          p = i("String.prototype.slice"),
          f = {},
          d = n(828),
          h = Object.getPrototypeOf;
        a &&
          d &&
          h &&
          r(l, function (e) {
            var t = new c[e]();
            if (Symbol.toStringTag in t) {
              var n = h(t),
                r = d(n, Symbol.toStringTag);
              if (!r) {
                var o = h(n);
                r = d(o, Symbol.toStringTag);
              }
              f[e] = r.get;
            }
          }),
          (e.exports = function (e) {
            if (!e || "object" != typeof e) return !1;
            if (!a || !(Symbol.toStringTag in e)) {
              var t = p(s(e), 8, -1);
              return u(l, t) > -1;
            }
            return (
              !!d &&
              (function (e) {
                var t = !1;
                return (
                  r(f, function (n, r) {
                    if (!t)
                      try {
                        t = n.call(e) === r;
                      } catch (e) {}
                  }),
                  t
                );
              })(e)
            );
          });
      },
      277: (e, t, n) => {
        var r = n(343).EventEmitter,
          o = n(323).inherits;
        e.exports = s;
        var i = {};
        function s(e) {
          r.call(this),
            (this._total = 0),
            (this._start = null),
            (this._startCount = 0),
            e && this.start();
        }
        function a() {
          return new Date().getTime();
        }
        o(s, r),
          (s.get = function (e) {
            return i[e] || (i[e] = new s()), i[e];
          }),
          (s.destroy = function (e) {
            return !!i[e] && delete i[e];
          }),
          (s.prototype.time = function () {
            return this._total + this.timeFromStart();
          }),
          (s.prototype.emitTime = function () {
            var e = this.time();
            return this.emit("time", e), e;
          }),
          (s.prototype.timeFromStart = function () {
            return this.isStarted() ? a() - this._start : 0;
          }),
          (s.prototype.isStarted = function () {
            return !this.isStopped();
          }),
          (s.prototype.isStopped = function () {
            return null === this._start;
          }),
          (s.prototype.start = function () {
            return (
              ++this._startCount,
              !!this.isStopped() &&
                ((this._start = a()), this.emit("start"), !0)
            );
          }),
          (s.prototype.stop = function () {
            return (
              !!this.isStarted() &&
              ((this._total += this.timeFromStart()),
              (this._start = null),
              (this._stopCount = 0),
              this.emit("stop"),
              !0)
            );
          }),
          (s.prototype.stopParallel = function () {
            return (
              !(
                !this.isStarted() ||
                (--this._startCount, 0 !== this._startCount)
              ) && this.stop()
            );
          }),
          (s.prototype.toggle = function () {
            return this.start() || this.stop();
          }),
          (s.prototype.toString = function () {
            return this.time() + "ms";
          }),
          (s.prototype.valueOf = function () {
            return this.time();
          });
      },
      579: (e) => {
        e.exports = function (e) {
          return (
            e &&
            "object" == typeof e &&
            "function" == typeof e.copy &&
            "function" == typeof e.fill &&
            "function" == typeof e.readUInt8
          );
        };
      },
      673: (e, t, n) => {
        "use strict";
        var r = n(740),
          o = n(265),
          i = n(505),
          s = n(387);
        function a(e) {
          return e.call.bind(e);
        }
        var c = "undefined" != typeof BigInt,
          l = "undefined" != typeof Symbol,
          u = a(Object.prototype.toString),
          p = a(Number.prototype.valueOf),
          f = a(String.prototype.valueOf),
          d = a(Boolean.prototype.valueOf);
        if (c) var h = a(BigInt.prototype.valueOf);
        if (l) var y = a(Symbol.prototype.valueOf);
        function m(e, t) {
          if ("object" != typeof e) return !1;
          try {
            return t(e), !0;
          } catch (e) {
            return !1;
          }
        }
        function g(e) {
          return "[object Map]" === u(e);
        }
        function v(e) {
          return "[object Set]" === u(e);
        }
        function b(e) {
          return "[object WeakMap]" === u(e);
        }
        function _(e) {
          return "[object WeakSet]" === u(e);
        }
        function w(e) {
          return "[object ArrayBuffer]" === u(e);
        }
        function S(e) {
          return (
            "undefined" != typeof ArrayBuffer &&
            (w.working ? w(e) : e instanceof ArrayBuffer)
          );
        }
        function O(e) {
          return "[object DataView]" === u(e);
        }
        function E(e) {
          return (
            "undefined" != typeof DataView &&
            (O.working ? O(e) : e instanceof DataView)
          );
        }
        (t.isArgumentsObject = r),
          (t.isGeneratorFunction = o),
          (t.isTypedArray = s),
          (t.isPromise = function (e) {
            return (
              ("undefined" != typeof Promise && e instanceof Promise) ||
              (null !== e &&
                "object" == typeof e &&
                "function" == typeof e.then &&
                "function" == typeof e.catch)
            );
          }),
          (t.isArrayBufferView = function (e) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
              ? ArrayBuffer.isView(e)
              : s(e) || E(e);
          }),
          (t.isUint8Array = function (e) {
            return "Uint8Array" === i(e);
          }),
          (t.isUint8ClampedArray = function (e) {
            return "Uint8ClampedArray" === i(e);
          }),
          (t.isUint16Array = function (e) {
            return "Uint16Array" === i(e);
          }),
          (t.isUint32Array = function (e) {
            return "Uint32Array" === i(e);
          }),
          (t.isInt8Array = function (e) {
            return "Int8Array" === i(e);
          }),
          (t.isInt16Array = function (e) {
            return "Int16Array" === i(e);
          }),
          (t.isInt32Array = function (e) {
            return "Int32Array" === i(e);
          }),
          (t.isFloat32Array = function (e) {
            return "Float32Array" === i(e);
          }),
          (t.isFloat64Array = function (e) {
            return "Float64Array" === i(e);
          }),
          (t.isBigInt64Array = function (e) {
            return "BigInt64Array" === i(e);
          }),
          (t.isBigUint64Array = function (e) {
            return "BigUint64Array" === i(e);
          }),
          (g.working = "undefined" != typeof Map && g(new Map())),
          (t.isMap = function (e) {
            return (
              "undefined" != typeof Map && (g.working ? g(e) : e instanceof Map)
            );
          }),
          (v.working = "undefined" != typeof Set && v(new Set())),
          (t.isSet = function (e) {
            return (
              "undefined" != typeof Set && (v.working ? v(e) : e instanceof Set)
            );
          }),
          (b.working = "undefined" != typeof WeakMap && b(new WeakMap())),
          (t.isWeakMap = function (e) {
            return (
              "undefined" != typeof WeakMap &&
              (b.working ? b(e) : e instanceof WeakMap)
            );
          }),
          (_.working = "undefined" != typeof WeakSet && _(new WeakSet())),
          (t.isWeakSet = function (e) {
            return _(e);
          }),
          (w.working =
            "undefined" != typeof ArrayBuffer && w(new ArrayBuffer())),
          (t.isArrayBuffer = S),
          (O.working =
            "undefined" != typeof ArrayBuffer &&
            "undefined" != typeof DataView &&
            O(new DataView(new ArrayBuffer(1), 0, 1))),
          (t.isDataView = E);
        var A =
          "undefined" != typeof SharedArrayBuffer ? SharedArrayBuffer : void 0;
        function x(e) {
          return "[object SharedArrayBuffer]" === u(e);
        }
        function j(e) {
          return (
            void 0 !== A &&
            (void 0 === x.working && (x.working = x(new A())),
            x.working ? x(e) : e instanceof A)
          );
        }
        function T(e) {
          return m(e, p);
        }
        function M(e) {
          return m(e, f);
        }
        function P(e) {
          return m(e, d);
        }
        function C(e) {
          return c && m(e, h);
        }
        function N(e) {
          return l && m(e, y);
        }
        (t.isSharedArrayBuffer = j),
          (t.isAsyncFunction = function (e) {
            return "[object AsyncFunction]" === u(e);
          }),
          (t.isMapIterator = function (e) {
            return "[object Map Iterator]" === u(e);
          }),
          (t.isSetIterator = function (e) {
            return "[object Set Iterator]" === u(e);
          }),
          (t.isGeneratorObject = function (e) {
            return "[object Generator]" === u(e);
          }),
          (t.isWebAssemblyCompiledModule = function (e) {
            return "[object WebAssembly.Module]" === u(e);
          }),
          (t.isNumberObject = T),
          (t.isStringObject = M),
          (t.isBooleanObject = P),
          (t.isBigIntObject = C),
          (t.isSymbolObject = N),
          (t.isBoxedPrimitive = function (e) {
            return T(e) || M(e) || P(e) || C(e) || N(e);
          }),
          (t.isAnyArrayBuffer = function (e) {
            return "undefined" != typeof Uint8Array && (S(e) || j(e));
          }),
          ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(
            function (e) {
              Object.defineProperty(t, e, {
                enumerable: !1,
                value: function () {
                  throw new Error(e + " is not supported in userland");
                },
              });
            }
          );
      },
      323: (e, t, n) => {
        var r =
            Object.getOwnPropertyDescriptors ||
            function (e) {
              for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++)
                n[t[r]] = Object.getOwnPropertyDescriptor(e, t[r]);
              return n;
            },
          o = /%[sdj%]/g;
        (t.format = function (e) {
          if (!v(e)) {
            for (var t = [], n = 0; n < arguments.length; n++)
              t.push(c(arguments[n]));
            return t.join(" ");
          }
          n = 1;
          for (
            var r = arguments,
              i = r.length,
              s = String(e).replace(o, function (e) {
                if ("%%" === e) return "%";
                if (n >= i) return e;
                switch (e) {
                  case "%s":
                    return String(r[n++]);
                  case "%d":
                    return Number(r[n++]);
                  case "%j":
                    try {
                      return JSON.stringify(r[n++]);
                    } catch (e) {
                      return "[Circular]";
                    }
                  default:
                    return e;
                }
              }),
              a = r[n];
            n < i;
            a = r[++n]
          )
            m(a) || !w(a) ? (s += " " + a) : (s += " " + c(a));
          return s;
        }),
          (t.deprecate = function (e, n) {
            if ("undefined" != typeof process && !0 === process.noDeprecation)
              return e;
            if ("undefined" == typeof process)
              return function () {
                return t.deprecate(e, n).apply(this, arguments);
              };
            var r = !1;
            return function () {
              if (!r) {
                if (process.throwDeprecation) throw new Error(n);
                process.traceDeprecation ? console.trace(n) : console.error(n),
                  (r = !0);
              }
              return e.apply(this, arguments);
            };
          });
        var i = {},
          s = /^$/;
        if (
          {
            GJS_DEBUG_TOPICS: "JS ERROR;JS LOG",
            LESSOPEN: "| /usr/bin/lesspipe %s",
            J2SDKDIR: "/usr/lib/jvm/java-8-oracle",
            USER: "paal",
            LC_TIME: "nb_NO.UTF-8",
            npm_config_user_agent:
              "npm/8.15.0 node/v16.17.0 linux x64 workspaces/false",
            TEXTDOMAIN: "im-config",
            XDG_SEAT: "seat0",
            SSH_AGENT_PID: "4774",
            XDG_SESSION_TYPE: "x11",
            npm_node_execpath:
              "/home/paal/.nvm/versions/node/v16.17.0/bin/node",
            J2REDIR: "/usr/lib/jvm/java-8-oracle/jre",
            SHLVL: "2",
            npm_config_noproxy: "",
            OLDPWD: "/home/paal/h5p-libs/joubel",
            QT4_IM_MODULE: "xim",
            HOME: "/home/paal",
            H5P_IGNORE_PATTERN:
              "^\\.|~$|LICENSE|\\.md|node_modules|gulpfile.js|package-lock.json|.*language\\/source.*$",
            DESKTOP_SESSION: "ubuntu",
            NVM_BIN: "/home/paal/.nvm/versions/node/v16.17.0/bin",
            NVM_NODEJS_ORG_MIRROR: "https://nodejs.org/dist",
            npm_package_json:
              "/home/paal/projects/h5p/libs/joubel/h5p-audio-recorder/package.json",
            GNOME_SHELL_SESSION_MODE: "ubuntu",
            GTK_MODULES: "gail:atk-bridge",
            LC_MONETARY: "nb_NO.UTF-8",
            npm_config_userconfig: "/home/paal/.npmrc",
            npm_config_local_prefix:
              "/home/paal/projects/h5p/libs/joubel/h5p-audio-recorder",
            DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus",
            npm_config_engine_strict: "true",
            COLORTERM: "truecolor",
            COLOR: "1",
            NVM_DIR: "/home/paal/.nvm",
            H5P_IGNORE_REPOS:
              "h5p-personality-quiz,h5p-editor-mini-course,h5p-editor-conditional,h5p-fullscreen-scroller",
            npm_config_metrics_registry: "https://registry.npmjs.org/",
            MANDATORY_PATH: "/usr/share/gconf/ubuntu.mandatory.path",
            QT_QPA_PLATFORMTHEME: "appmenu-qt5",
            IM_CONFIG_PHASE: "2",
            LOGNAME: "paal",
            GTK_IM_MODULE: "ibus",
            _: "/home/paal/.nvm/versions/node/v16.17.0/bin/npm",
            npm_config_prefix: "/home/paal/.nvm/versions/node/v16.17.0",
            DEFAULTS_PATH: "/usr/share/gconf/ubuntu.default.path",
            USERNAME: "paal",
            XDG_SESSION_ID: "5",
            TERM: "xterm-256color",
            npm_config_cache: "/home/paal/.npm",
            GNOME_DESKTOP_SESSION_ID: "this-is-deprecated",
            GTK2_MODULES: "overlay-scrollbar",
            WINDOWPATH: "2",
            npm_config_node_gyp:
              "/home/paal/.nvm/versions/node/v16.17.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js",
            PATH: "/home/paal/projects/h5p/libs/joubel/h5p-audio-recorder/node_modules/.bin:/home/paal/projects/h5p/libs/joubel/node_modules/.bin:/home/paal/projects/h5p/libs/node_modules/.bin:/home/paal/projects/h5p/node_modules/.bin:/home/paal/projects/node_modules/.bin:/home/paal/node_modules/.bin:/home/node_modules/.bin:/node_modules/.bin:/home/paal/.nvm/versions/node/v16.17.0/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/home/paal/.nvm/versions/node/v16.17.0/bin:/home/paal/.linuxbrew/bin:/home/paal/.composer/vendor/bin:~/.local/bin:/usr/local/go/bin:/home/paal/projects/h5pcom/h5pcom-tools:/home/paal/bin:/usr/bin:/home/paal/.config/composer/vendor/bin:/home/paal/.symfony/bin:/home/paal/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/lib/jvm/java-8-oracle/bin:/usr/lib/jvm/java-8-oracle/db/bin:/usr/lib/jvm/java-8-oracle/jre/bin:/home/paal/.gem/ruby/2.5.0/bin:/var/lib/gems/2.5.0/bin:/usr/lib/x86_64-linux-gnu/rubygems-integration/2.5.0/bin:/usr/share/rubygems-integration/2.5.0/bin:/usr/share/rubygems-integration/all/bin:/usr/local/aws-cli/v2/current/bin/",
            H5P_IGNORE_MODIFIERS: "ig",
            DERBY_HOME: "/usr/lib/jvm/java-8-oracle/db",
            NVM_IOJS_ORG_MIRROR: "https://iojs.org/dist",
            PAPERSIZE: "a4",
            SESSION_MANAGER:
              "local/big:@/tmp/.ICE-unix/4684,unix/big:/tmp/.ICE-unix/4684",
            NODE: "/home/paal/.nvm/versions/node/v16.17.0/bin/node",
            npm_package_name: "h5p-audio-recorder",
            XDG_MENU_PREFIX: "gnome-",
            S_COLORS: "auto",
            GNOME_TERMINAL_SCREEN:
              "/org/gnome/Terminal/screen/062b8e11_67a7_4525_ab8b_4a95d6c737a9",
            LC_ADDRESS: "nb_NO.UTF-8",
            XDG_RUNTIME_DIR: "/run/user/1000",
            DISPLAY: ":1",
            LANG: "en_US.UTF-8",
            XDG_CURRENT_DESKTOP: "ubuntu:GNOME",
            LC_TELEPHONE: "nb_NO.UTF-8",
            LS_COLORS:
              "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:",
            XDG_SESSION_DESKTOP: "ubuntu",
            XMODIFIERS: "@im=ibus",
            GNOME_TERMINAL_SERVICE: ":1.88",
            XAUTHORITY: "/run/user/1000/gdm/Xauthority",
            npm_lifecycle_script: "cross-env NODE_ENV='production' webpack",
            SSH_AUTH_SOCK: "/run/user/1000/keyring/ssh",
            LC_NAME: "nb_NO.UTF-8",
            SHELL: "/bin/bash",
            npm_package_version: "1.0.0",
            npm_lifecycle_event: "build",
            QT_ACCESSIBILITY: "1",
            GDMSESSION: "ubuntu",
            LESSCLOSE: "/usr/bin/lesspipe %s %s",
            LC_MEASUREMENT: "nb_NO.UTF-8",
            TEXTDOMAINDIR: "/usr/share/locale/",
            GJS_DEBUG_OUTPUT: "stderr",
            GPG_AGENT_INFO: "/run/user/1000/gnupg/S.gpg-agent:0:1",
            LC_IDENTIFICATION: "nb_NO.UTF-8",
            XDG_VTNR: "2",
            QT_IM_MODULE: "ibus",
            npm_config_globalconfig:
              "/home/paal/.nvm/versions/node/v16.17.0/etc/npmrc",
            npm_config_init_module: "/home/paal/.npm-init.js",
            JAVA_HOME: "/usr/lib/jvm/java-8-oracle",
            PWD: "/home/paal/h5p-libs/joubel/h5p-audio-recorder",
            npm_execpath:
              "/home/paal/.nvm/versions/node/v16.17.0/lib/node_modules/npm/bin/npm-cli.js",
            CLUTTER_IM_MODULE: "xim",
            NVM_CD_FLAGS: "",
            XDG_DATA_DIRS:
              "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop",
            XDG_CONFIG_DIRS: "/etc/xdg/xdg-ubuntu:/etc/xdg",
            npm_config_global_prefix: "/home/paal/.nvm/versions/node/v16.17.0",
            LC_NUMERIC: "nb_NO.UTF-8",
            npm_command: "run-script",
            LC_PAPER: "nb_NO.UTF-8",
            VTE_VERSION: "5202",
            MANPATH:
              "/home/paal/.nvm/versions/node/v16.17.0/share/man:/home/paal/.linuxbrew/share/man:/usr/share/man:/usr/local/man:/usr/local/share/man:/usr/lib/jvm/java-8-oracle/man",
            INIT_CWD: "/home/paal/projects/h5p/libs/joubel/h5p-audio-recorder",
            EDITOR: "vi",
            NODE_ENV: "production",
          }.NODE_DEBUG
        ) {
          var a = {
            GJS_DEBUG_TOPICS: "JS ERROR;JS LOG",
            LESSOPEN: "| /usr/bin/lesspipe %s",
            J2SDKDIR: "/usr/lib/jvm/java-8-oracle",
            USER: "paal",
            LC_TIME: "nb_NO.UTF-8",
            npm_config_user_agent:
              "npm/8.15.0 node/v16.17.0 linux x64 workspaces/false",
            TEXTDOMAIN: "im-config",
            XDG_SEAT: "seat0",
            SSH_AGENT_PID: "4774",
            XDG_SESSION_TYPE: "x11",
            npm_node_execpath:
              "/home/paal/.nvm/versions/node/v16.17.0/bin/node",
            J2REDIR: "/usr/lib/jvm/java-8-oracle/jre",
            SHLVL: "2",
            npm_config_noproxy: "",
            OLDPWD: "/home/paal/h5p-libs/joubel",
            QT4_IM_MODULE: "xim",
            HOME: "/home/paal",
            H5P_IGNORE_PATTERN:
              "^\\.|~$|LICENSE|\\.md|node_modules|gulpfile.js|package-lock.json|.*language\\/source.*$",
            DESKTOP_SESSION: "ubuntu",
            NVM_BIN: "/home/paal/.nvm/versions/node/v16.17.0/bin",
            NVM_NODEJS_ORG_MIRROR: "https://nodejs.org/dist",
            npm_package_json:
              "/home/paal/projects/h5p/libs/joubel/h5p-audio-recorder/package.json",
            GNOME_SHELL_SESSION_MODE: "ubuntu",
            GTK_MODULES: "gail:atk-bridge",
            LC_MONETARY: "nb_NO.UTF-8",
            npm_config_userconfig: "/home/paal/.npmrc",
            npm_config_local_prefix:
              "/home/paal/projects/h5p/libs/joubel/h5p-audio-recorder",
            DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus",
            npm_config_engine_strict: "true",
            COLORTERM: "truecolor",
            COLOR: "1",
            NVM_DIR: "/home/paal/.nvm",
            H5P_IGNORE_REPOS:
              "h5p-personality-quiz,h5p-editor-mini-course,h5p-editor-conditional,h5p-fullscreen-scroller",
            npm_config_metrics_registry: "https://registry.npmjs.org/",
            MANDATORY_PATH: "/usr/share/gconf/ubuntu.mandatory.path",
            QT_QPA_PLATFORMTHEME: "appmenu-qt5",
            IM_CONFIG_PHASE: "2",
            LOGNAME: "paal",
            GTK_IM_MODULE: "ibus",
            _: "/home/paal/.nvm/versions/node/v16.17.0/bin/npm",
            npm_config_prefix: "/home/paal/.nvm/versions/node/v16.17.0",
            DEFAULTS_PATH: "/usr/share/gconf/ubuntu.default.path",
            USERNAME: "paal",
            XDG_SESSION_ID: "5",
            TERM: "xterm-256color",
            npm_config_cache: "/home/paal/.npm",
            GNOME_DESKTOP_SESSION_ID: "this-is-deprecated",
            GTK2_MODULES: "overlay-scrollbar",
            WINDOWPATH: "2",
            npm_config_node_gyp:
              "/home/paal/.nvm/versions/node/v16.17.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js",
            PATH: "/home/paal/projects/h5p/libs/joubel/h5p-audio-recorder/node_modules/.bin:/home/paal/projects/h5p/libs/joubel/node_modules/.bin:/home/paal/projects/h5p/libs/node_modules/.bin:/home/paal/projects/h5p/node_modules/.bin:/home/paal/projects/node_modules/.bin:/home/paal/node_modules/.bin:/home/node_modules/.bin:/node_modules/.bin:/home/paal/.nvm/versions/node/v16.17.0/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/home/paal/.nvm/versions/node/v16.17.0/bin:/home/paal/.linuxbrew/bin:/home/paal/.composer/vendor/bin:~/.local/bin:/usr/local/go/bin:/home/paal/projects/h5pcom/h5pcom-tools:/home/paal/bin:/usr/bin:/home/paal/.config/composer/vendor/bin:/home/paal/.symfony/bin:/home/paal/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/lib/jvm/java-8-oracle/bin:/usr/lib/jvm/java-8-oracle/db/bin:/usr/lib/jvm/java-8-oracle/jre/bin:/home/paal/.gem/ruby/2.5.0/bin:/var/lib/gems/2.5.0/bin:/usr/lib/x86_64-linux-gnu/rubygems-integration/2.5.0/bin:/usr/share/rubygems-integration/2.5.0/bin:/usr/share/rubygems-integration/all/bin:/usr/local/aws-cli/v2/current/bin/",
            H5P_IGNORE_MODIFIERS: "ig",
            DERBY_HOME: "/usr/lib/jvm/java-8-oracle/db",
            NVM_IOJS_ORG_MIRROR: "https://iojs.org/dist",
            PAPERSIZE: "a4",
            SESSION_MANAGER:
              "local/big:@/tmp/.ICE-unix/4684,unix/big:/tmp/.ICE-unix/4684",
            NODE: "/home/paal/.nvm/versions/node/v16.17.0/bin/node",
            npm_package_name: "h5p-audio-recorder",
            XDG_MENU_PREFIX: "gnome-",
            S_COLORS: "auto",
            GNOME_TERMINAL_SCREEN:
              "/org/gnome/Terminal/screen/062b8e11_67a7_4525_ab8b_4a95d6c737a9",
            LC_ADDRESS: "nb_NO.UTF-8",
            XDG_RUNTIME_DIR: "/run/user/1000",
            DISPLAY: ":1",
            LANG: "en_US.UTF-8",
            XDG_CURRENT_DESKTOP: "ubuntu:GNOME",
            LC_TELEPHONE: "nb_NO.UTF-8",
            LS_COLORS:
              "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:",
            XDG_SESSION_DESKTOP: "ubuntu",
            XMODIFIERS: "@im=ibus",
            GNOME_TERMINAL_SERVICE: ":1.88",
            XAUTHORITY: "/run/user/1000/gdm/Xauthority",
            npm_lifecycle_script: "cross-env NODE_ENV='production' webpack",
            SSH_AUTH_SOCK: "/run/user/1000/keyring/ssh",
            LC_NAME: "nb_NO.UTF-8",
            SHELL: "/bin/bash",
            npm_package_version: "1.0.0",
            npm_lifecycle_event: "build",
            QT_ACCESSIBILITY: "1",
            GDMSESSION: "ubuntu",
            LESSCLOSE: "/usr/bin/lesspipe %s %s",
            LC_MEASUREMENT: "nb_NO.UTF-8",
            TEXTDOMAINDIR: "/usr/share/locale/",
            GJS_DEBUG_OUTPUT: "stderr",
            GPG_AGENT_INFO: "/run/user/1000/gnupg/S.gpg-agent:0:1",
            LC_IDENTIFICATION: "nb_NO.UTF-8",
            XDG_VTNR: "2",
            QT_IM_MODULE: "ibus",
            npm_config_globalconfig:
              "/home/paal/.nvm/versions/node/v16.17.0/etc/npmrc",
            npm_config_init_module: "/home/paal/.npm-init.js",
            JAVA_HOME: "/usr/lib/jvm/java-8-oracle",
            PWD: "/home/paal/h5p-libs/joubel/h5p-audio-recorder",
            npm_execpath:
              "/home/paal/.nvm/versions/node/v16.17.0/lib/node_modules/npm/bin/npm-cli.js",
            CLUTTER_IM_MODULE: "xim",
            NVM_CD_FLAGS: "",
            XDG_DATA_DIRS:
              "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop",
            XDG_CONFIG_DIRS: "/etc/xdg/xdg-ubuntu:/etc/xdg",
            npm_config_global_prefix: "/home/paal/.nvm/versions/node/v16.17.0",
            LC_NUMERIC: "nb_NO.UTF-8",
            npm_command: "run-script",
            LC_PAPER: "nb_NO.UTF-8",
            VTE_VERSION: "5202",
            MANPATH:
              "/home/paal/.nvm/versions/node/v16.17.0/share/man:/home/paal/.linuxbrew/share/man:/usr/share/man:/usr/local/man:/usr/local/share/man:/usr/lib/jvm/java-8-oracle/man",
            INIT_CWD: "/home/paal/projects/h5p/libs/joubel/h5p-audio-recorder",
            EDITOR: "vi",
            NODE_ENV: "production",
          }.NODE_DEBUG;
          (a = a
            .replace(/[|\\{}()[\]^$+?.]/g, "\\$&")
            .replace(/\*/g, ".*")
            .replace(/,/g, "$|^")
            .toUpperCase()),
            (s = new RegExp("^" + a + "$", "i"));
        }
        function c(e, n) {
          var r = { seen: [], stylize: u };
          return (
            arguments.length >= 3 && (r.depth = arguments[2]),
            arguments.length >= 4 && (r.colors = arguments[3]),
            y(n) ? (r.showHidden = n) : n && t._extend(r, n),
            b(r.showHidden) && (r.showHidden = !1),
            b(r.depth) && (r.depth = 2),
            b(r.colors) && (r.colors = !1),
            b(r.customInspect) && (r.customInspect = !0),
            r.colors && (r.stylize = l),
            p(r, e, r.depth)
          );
        }
        function l(e, t) {
          var n = c.styles[t];
          return n
            ? "[" + c.colors[n][0] + "m" + e + "[" + c.colors[n][1] + "m"
            : e;
        }
        function u(e, t) {
          return e;
        }
        function p(e, n, r) {
          if (
            e.customInspect &&
            n &&
            E(n.inspect) &&
            n.inspect !== t.inspect &&
            (!n.constructor || n.constructor.prototype !== n)
          ) {
            var o = n.inspect(r, e);
            return v(o) || (o = p(e, o, r)), o;
          }
          var i = (function (e, t) {
            if (b(t)) return e.stylize("undefined", "undefined");
            if (v(t)) {
              var n =
                "'" +
                JSON.stringify(t)
                  .replace(/^"|"$/g, "")
                  .replace(/'/g, "\\'")
                  .replace(/\\"/g, '"') +
                "'";
              return e.stylize(n, "string");
            }
            return g(t)
              ? e.stylize("" + t, "number")
              : y(t)
              ? e.stylize("" + t, "boolean")
              : m(t)
              ? e.stylize("null", "null")
              : void 0;
          })(e, n);
          if (i) return i;
          var s = Object.keys(n),
            a = (function (e) {
              var t = {};
              return (
                e.forEach(function (e, n) {
                  t[e] = !0;
                }),
                t
              );
            })(s);
          if (
            (e.showHidden && (s = Object.getOwnPropertyNames(n)),
            O(n) &&
              (s.indexOf("message") >= 0 || s.indexOf("description") >= 0))
          )
            return f(n);
          if (0 === s.length) {
            if (E(n)) {
              var c = n.name ? ": " + n.name : "";
              return e.stylize("[Function" + c + "]", "special");
            }
            if (_(n))
              return e.stylize(RegExp.prototype.toString.call(n), "regexp");
            if (S(n)) return e.stylize(Date.prototype.toString.call(n), "date");
            if (O(n)) return f(n);
          }
          var l,
            u = "",
            w = !1,
            A = ["{", "}"];
          return (
            h(n) && ((w = !0), (A = ["[", "]"])),
            E(n) && (u = " [Function" + (n.name ? ": " + n.name : "") + "]"),
            _(n) && (u = " " + RegExp.prototype.toString.call(n)),
            S(n) && (u = " " + Date.prototype.toUTCString.call(n)),
            O(n) && (u = " " + f(n)),
            0 !== s.length || (w && 0 != n.length)
              ? r < 0
                ? _(n)
                  ? e.stylize(RegExp.prototype.toString.call(n), "regexp")
                  : e.stylize("[Object]", "special")
                : (e.seen.push(n),
                  (l = w
                    ? (function (e, t, n, r, o) {
                        for (var i = [], s = 0, a = t.length; s < a; ++s)
                          M(t, String(s))
                            ? i.push(d(e, t, n, r, String(s), !0))
                            : i.push("");
                        return (
                          o.forEach(function (o) {
                            o.match(/^\d+$/) || i.push(d(e, t, n, r, o, !0));
                          }),
                          i
                        );
                      })(e, n, r, a, s)
                    : s.map(function (t) {
                        return d(e, n, r, a, t, w);
                      })),
                  e.seen.pop(),
                  (function (e, t, n) {
                    return e.reduce(function (e, t) {
                      return (
                        t.indexOf("\n"),
                        e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                      );
                    }, 0) > 60
                      ? n[0] +
                          ("" === t ? "" : t + "\n ") +
                          " " +
                          e.join(",\n  ") +
                          " " +
                          n[1]
                      : n[0] + t + " " + e.join(", ") + " " + n[1];
                  })(l, u, A))
              : A[0] + u + A[1]
          );
        }
        function f(e) {
          return "[" + Error.prototype.toString.call(e) + "]";
        }
        function d(e, t, n, r, o, i) {
          var s, a, c;
          if (
            ((c = Object.getOwnPropertyDescriptor(t, o) || { value: t[o] }).get
              ? (a = c.set
                  ? e.stylize("[Getter/Setter]", "special")
                  : e.stylize("[Getter]", "special"))
              : c.set && (a = e.stylize("[Setter]", "special")),
            M(r, o) || (s = "[" + o + "]"),
            a ||
              (e.seen.indexOf(c.value) < 0
                ? (a = m(n)
                    ? p(e, c.value, null)
                    : p(e, c.value, n - 1)).indexOf("\n") > -1 &&
                  (a = i
                    ? a
                        .split("\n")
                        .map(function (e) {
                          return "  " + e;
                        })
                        .join("\n")
                        .substr(2)
                    : "\n" +
                      a
                        .split("\n")
                        .map(function (e) {
                          return "   " + e;
                        })
                        .join("\n"))
                : (a = e.stylize("[Circular]", "special"))),
            b(s))
          ) {
            if (i && o.match(/^\d+$/)) return a;
            (s = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
              ? ((s = s.substr(1, s.length - 2)), (s = e.stylize(s, "name")))
              : ((s = s
                  .replace(/'/g, "\\'")
                  .replace(/\\"/g, '"')
                  .replace(/(^"|"$)/g, "'")),
                (s = e.stylize(s, "string")));
          }
          return s + ": " + a;
        }
        function h(e) {
          return Array.isArray(e);
        }
        function y(e) {
          return "boolean" == typeof e;
        }
        function m(e) {
          return null === e;
        }
        function g(e) {
          return "number" == typeof e;
        }
        function v(e) {
          return "string" == typeof e;
        }
        function b(e) {
          return void 0 === e;
        }
        function _(e) {
          return w(e) && "[object RegExp]" === A(e);
        }
        function w(e) {
          return "object" == typeof e && null !== e;
        }
        function S(e) {
          return w(e) && "[object Date]" === A(e);
        }
        function O(e) {
          return w(e) && ("[object Error]" === A(e) || e instanceof Error);
        }
        function E(e) {
          return "function" == typeof e;
        }
        function A(e) {
          return Object.prototype.toString.call(e);
        }
        function x(e) {
          return e < 10 ? "0" + e.toString(10) : e.toString(10);
        }
        (t.debuglog = function (e) {
          if (((e = e.toUpperCase()), !i[e]))
            if (s.test(e)) {
              var n = process.pid;
              i[e] = function () {
                var r = t.format.apply(t, arguments);
                console.error("%s %d: %s", e, n, r);
              };
            } else i[e] = function () {};
          return i[e];
        }),
          (t.inspect = c),
          (c.colors = {
            bold: [1, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            white: [37, 39],
            grey: [90, 39],
            black: [30, 39],
            blue: [34, 39],
            cyan: [36, 39],
            green: [32, 39],
            magenta: [35, 39],
            red: [31, 39],
            yellow: [33, 39],
          }),
          (c.styles = {
            special: "cyan",
            number: "yellow",
            boolean: "yellow",
            undefined: "grey",
            null: "bold",
            string: "green",
            date: "magenta",
            regexp: "red",
          }),
          (t.types = n(673)),
          (t.isArray = h),
          (t.isBoolean = y),
          (t.isNull = m),
          (t.isNullOrUndefined = function (e) {
            return null == e;
          }),
          (t.isNumber = g),
          (t.isString = v),
          (t.isSymbol = function (e) {
            return "symbol" == typeof e;
          }),
          (t.isUndefined = b),
          (t.isRegExp = _),
          (t.types.isRegExp = _),
          (t.isObject = w),
          (t.isDate = S),
          (t.types.isDate = S),
          (t.isError = O),
          (t.types.isNativeError = O),
          (t.isFunction = E),
          (t.isPrimitive = function (e) {
            return (
              null === e ||
              "boolean" == typeof e ||
              "number" == typeof e ||
              "string" == typeof e ||
              "symbol" == typeof e ||
              void 0 === e
            );
          }),
          (t.isBuffer = n(579));
        var j = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        function T() {
          var e = new Date(),
            t = [x(e.getHours()), x(e.getMinutes()), x(e.getSeconds())].join(
              ":"
            );
          return [e.getDate(), j[e.getMonth()], t].join(" ");
        }
        function M(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }
        (t.log = function () {
          console.log("%s - %s", T(), t.format.apply(t, arguments));
        }),
          (t.inherits = n(87)),
          (t._extend = function (e, t) {
            if (!t || !w(t)) return e;
            for (var n = Object.keys(t), r = n.length; r--; ) e[n[r]] = t[n[r]];
            return e;
          });
        var P =
          "undefined" != typeof Symbol
            ? Symbol("util.promisify.custom")
            : void 0;
        function C(e, t) {
          if (!e) {
            var n = new Error("Promise was rejected with a falsy value");
            (n.reason = e), (e = n);
          }
          return t(e);
        }
        (t.promisify = function (e) {
          if ("function" != typeof e)
            throw new TypeError(
              'The "original" argument must be of type Function'
            );
          if (P && e[P]) {
            var t;
            if ("function" != typeof (t = e[P]))
              throw new TypeError(
                'The "util.promisify.custom" argument must be of type Function'
              );
            return (
              Object.defineProperty(t, P, {
                value: t,
                enumerable: !1,
                writable: !1,
                configurable: !0,
              }),
              t
            );
          }
          function t() {
            for (
              var t,
                n,
                r = new Promise(function (e, r) {
                  (t = e), (n = r);
                }),
                o = [],
                i = 0;
              i < arguments.length;
              i++
            )
              o.push(arguments[i]);
            o.push(function (e, r) {
              e ? n(e) : t(r);
            });
            try {
              e.apply(this, o);
            } catch (e) {
              n(e);
            }
            return r;
          }
          return (
            Object.setPrototypeOf(t, Object.getPrototypeOf(e)),
            P &&
              Object.defineProperty(t, P, {
                value: t,
                enumerable: !1,
                writable: !1,
                configurable: !0,
              }),
            Object.defineProperties(t, r(e))
          );
        }),
          (t.promisify.custom = P),
          (t.callbackify = function (e) {
            if ("function" != typeof e)
              throw new TypeError(
                'The "original" argument must be of type Function'
              );
            function t() {
              for (var t = [], n = 0; n < arguments.length; n++)
                t.push(arguments[n]);
              var r = t.pop();
              if ("function" != typeof r)
                throw new TypeError(
                  "The last argument must be of type Function"
                );
              var o = this,
                i = function () {
                  return r.apply(o, arguments);
                };
              e.apply(this, t).then(
                function (e) {
                  process.nextTick(i.bind(null, null, e));
                },
                function (e) {
                  process.nextTick(C.bind(null, e, i));
                }
              );
            }
            return (
              Object.setPrototypeOf(t, Object.getPrototypeOf(e)),
              Object.defineProperties(t, r(e)),
              t
            );
          });
      },
      959: (e, t) => {
        "use strict";
        t.Z = (e, t) => {
          const n = e.__vccOpts || e;
          for (const [e, r] of t) n[e] = r;
          return n;
        };
      },
      338: (e, t, n) => {
        var r = n(833);
        r.__esModule && (r = r.default),
          "string" == typeof r && (r = [[e.id, r, ""]]),
          r.locals && (e.exports = r.locals),
          (0, n(441).Z)("5dcc9be9", r, !0, {});
      },
      680: (e, t, n) => {
        var r = n(903);
        r.__esModule && (r = r.default),
          "string" == typeof r && (r = [[e.id, r, ""]]),
          r.locals && (e.exports = r.locals),
          (0, n(441).Z)("28c669e3", r, !0, {});
      },
      656: (e, t, n) => {
        var r = n(867);
        r.__esModule && (r = r.default),
          "string" == typeof r && (r = [[e.id, r, ""]]),
          r.locals && (e.exports = r.locals),
          (0, n(441).Z)("4ca8745e", r, !0, {});
      },
      441: (e, t, n) => {
        "use strict";
        function r(e, t) {
          for (var n = [], r = {}, o = 0; o < t.length; o++) {
            var i = t[o],
              s = i[0],
              a = { id: e + ":" + o, css: i[1], media: i[2], sourceMap: i[3] };
            r[s] ? r[s].parts.push(a) : n.push((r[s] = { id: s, parts: [a] }));
          }
          return n;
        }
        n.d(t, { Z: () => h });
        var o = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !o)
          throw new Error(
            "vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
          );
        var i = {},
          s = o && (document.head || document.getElementsByTagName("head")[0]),
          a = null,
          c = 0,
          l = !1,
          u = function () {},
          p = null,
          f = "data-vue-ssr-id",
          d =
            "undefined" != typeof navigator &&
            /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        function h(e, t, n, o) {
          (l = n), (p = o || {});
          var s = r(e, t);
          return (
            y(s),
            function (t) {
              for (var n = [], o = 0; o < s.length; o++) {
                var a = s[o];
                (c = i[a.id]).refs--, n.push(c);
              }
              for (t ? y((s = r(e, t))) : (s = []), o = 0; o < n.length; o++) {
                var c;
                if (0 === (c = n[o]).refs) {
                  for (var l = 0; l < c.parts.length; l++) c.parts[l]();
                  delete i[c.id];
                }
              }
            }
          );
        }
        function y(e) {
          for (var t = 0; t < e.length; t++) {
            var n = e[t],
              r = i[n.id];
            if (r) {
              r.refs++;
              for (var o = 0; o < r.parts.length; o++) r.parts[o](n.parts[o]);
              for (; o < n.parts.length; o++) r.parts.push(g(n.parts[o]));
              r.parts.length > n.parts.length &&
                (r.parts.length = n.parts.length);
            } else {
              var s = [];
              for (o = 0; o < n.parts.length; o++) s.push(g(n.parts[o]));
              i[n.id] = { id: n.id, refs: 1, parts: s };
            }
          }
        }
        function m() {
          var e = document.createElement("style");
          return (e.type = "text/css"), s.appendChild(e), e;
        }
        function g(e) {
          var t,
            n,
            r = document.querySelector("style[" + f + '~="' + e.id + '"]');
          if (r) {
            if (l) return u;
            r.parentNode.removeChild(r);
          }
          if (d) {
            var o = c++;
            (r = a || (a = m())),
              (t = _.bind(null, r, o, !1)),
              (n = _.bind(null, r, o, !0));
          } else
            (r = m()),
              (t = w.bind(null, r)),
              (n = function () {
                r.parentNode.removeChild(r);
              });
          return (
            t(e),
            function (r) {
              if (r) {
                if (
                  r.css === e.css &&
                  r.media === e.media &&
                  r.sourceMap === e.sourceMap
                )
                  return;
                t((e = r));
              } else n();
            }
          );
        }
        var v,
          b =
            ((v = []),
            function (e, t) {
              return (v[e] = t), v.filter(Boolean).join("\n");
            });
        function _(e, t, n, r) {
          var o = n ? "" : r.css;
          if (e.styleSheet) e.styleSheet.cssText = b(t, o);
          else {
            var i = document.createTextNode(o),
              s = e.childNodes;
            s[t] && e.removeChild(s[t]),
              s.length ? e.insertBefore(i, s[t]) : e.appendChild(i);
          }
        }
        function w(e, t) {
          var n = t.css,
            r = t.media,
            o = t.sourceMap;
          if (
            (r && e.setAttribute("media", r),
            p.ssrId && e.setAttribute(f, t.id),
            o &&
              ((n += "\n/*# sourceURL=" + o.sources[0] + " */"),
              (n +=
                "\n/*# sourceMappingURL=data:application/json;base64," +
                btoa(unescape(encodeURIComponent(JSON.stringify(o)))) +
                " */")),
            e.styleSheet)
          )
            e.styleSheet.cssText = n;
          else {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(n));
          }
        }
      },
      505: (e, t, n) => {
        "use strict";
        var r = n(278),
          o = n(973),
          i = n(737),
          s = i("Object.prototype.toString"),
          a = n(698)(),
          c = "undefined" == typeof globalThis ? n.g : globalThis,
          l = o(),
          u = i("String.prototype.slice"),
          p = {},
          f = n(828),
          d = Object.getPrototypeOf;
        a &&
          f &&
          d &&
          r(l, function (e) {
            if ("function" == typeof c[e]) {
              var t = new c[e]();
              if (Symbol.toStringTag in t) {
                var n = d(t),
                  r = f(n, Symbol.toStringTag);
                if (!r) {
                  var o = d(n);
                  r = f(o, Symbol.toStringTag);
                }
                p[e] = r.get;
              }
            }
          });
        var h = n(387);
        e.exports = function (e) {
          return (
            !!h(e) &&
            (a && Symbol.toStringTag in e
              ? (function (e) {
                  var t = !1;
                  return (
                    r(p, function (n, r) {
                      if (!t)
                        try {
                          var o = n.call(e);
                          o === r && (t = o);
                        } catch (e) {}
                    }),
                    t
                  );
                })(e)
              : u(s(e), 8, -1))
          );
        };
      },
      945: (e) => {
        "use strict";
        e.exports =
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMC4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMDUuNCAxMDUuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTA1LjQgMTA1LjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNFREFCQjA7fQ0KPC9zdHlsZT4NCjx0aXRsZT5BcnRib2FyZCAxPC90aXRsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01Mi43LDBDMjMuNiwwLDAsMjMuNiwwLDUyLjdzMjMuNiw1Mi43LDUyLjcsNTIuN2MyOS4xLDAsNTIuNy0yMy42LDUyLjctNTIuN0MxMDUuNCwyMy42LDgxLjgsMCw1Mi43LDB6DQoJCSBNNTIuNywxMDUuMmMtMjksMC01Mi41LTIzLjUtNTIuNS01Mi41UzIzLjcsMC4yLDUyLjcsMC4yczUyLjUsMjMuNSw1Mi41LDUyLjVDMTA1LjIsODEuNyw4MS43LDEwNS4yLDUyLjcsMTA1LjJ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUyLjcsMTUuMkMzMiwxNS4yLDE1LjIsMzIsMTUuMiw1Mi43UzMyLDkwLjIsNTIuNyw5MC4yczM3LjUtMTYuOCwzNy41LTM3LjVjMCwwLDAsMCwwLDANCgkJQzkwLjEsMzIsNzMuNCwxNS4yLDUyLjcsMTUuMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTIuNyw3LjhDMjcuOSw3LjgsNy44LDI3LjksNy44LDUyLjdzMjAuMSw0NC45LDQ0LjksNDQuOWMyNC44LDAsNDQuOS0yMC4xLDQ0LjktNDQuOQ0KCQlDOTcuNiwyNy45LDc3LjUsNy44LDUyLjcsNy44eiBNNTIuNyw5Ni42Yy0yNC4yLDAtNDMuOS0xOS43LTQzLjktNDMuOWMwLTI0LjIsMTkuNy00My45LDQzLjktNDMuOWMyNC4yLDAsNDMuOSwxOS42LDQzLjksNDMuOQ0KCQlDOTYuNiw3Ni45LDc2LjksOTYuNiw1Mi43LDk2LjZ6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==";
      },
      973: (e, t, n) => {
        "use strict";
        var r = [
            "BigInt64Array",
            "BigUint64Array",
            "Float32Array",
            "Float64Array",
            "Int16Array",
            "Int32Array",
            "Int8Array",
            "Uint16Array",
            "Uint32Array",
            "Uint8Array",
            "Uint8ClampedArray",
          ],
          o = "undefined" == typeof globalThis ? n.g : globalThis;
        e.exports = function () {
          for (var e = [], t = 0; t < r.length; t++)
            "function" == typeof o[r[t]] && (e[e.length] = r[t]);
          return e;
        };
      },
      828: (e, t, n) => {
        "use strict";
        var r = n(750)("%Object.getOwnPropertyDescriptor%", !0);
        if (r)
          try {
            r([], "length");
          } catch (e) {
            r = null;
          }
        e.exports = r;
      },
    },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var i = (t[r] = { id: r, exports: {} });
    return e[r](i, i.exports, n), i.exports;
  }
  (n.m = e),
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.b = document.baseURI || self.location.href),
    (H5P = H5P || {}),
    (H5P.AudioRecorder = n(452).Z);
})();
