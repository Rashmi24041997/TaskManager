var am = Object.defineProperty,
  cm = Object.defineProperties;
var um = Object.getOwnPropertyDescriptors;
var vl = Object.getOwnPropertySymbols;
var lm = Object.prototype.hasOwnProperty,
  dm = Object.prototype.propertyIsEnumerable;
var yl = (e, t, n) =>
    t in e
      ? am(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  D = (e, t) => {
    for (var n in (t ||= {})) lm.call(t, n) && yl(e, n, t[n]);
    if (vl) for (var n of vl(t)) dm.call(t, n) && yl(e, n, t[n]);
    return e;
  },
  K = (e, t) => cm(e, um(t));
var mo = (e, t, n) =>
  new Promise((r, o) => {
    var i = (c) => {
        try {
          a(n.next(c));
        } catch (u) {
          o(u);
        }
      },
      s = (c) => {
        try {
          a(n.throw(c));
        } catch (u) {
          o(u);
        }
      },
      a = (c) => (c.done ? r(c.value) : Promise.resolve(c.value).then(i, s));
    a((n = n.apply(e, t)).next());
  });
var $s = null;
var Bs = 1,
  Dl = Symbol("SIGNAL");
function U(e) {
  let t = $s;
  return ($s = e), t;
}
function wl() {
  return $s;
}
var Hs = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function fm(e) {
  if (!(Zs(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === Bs)) {
    if (!e.producerMustRecompute(e) && !Gs(e)) {
      (e.dirty = !1), (e.lastCleanEpoch = Bs);
      return;
    }
    e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = Bs);
  }
}
function zs(e) {
  return e && (e.nextProducerIndex = 0), U(e);
}
function El(e, t) {
  if (
    (U(t),
    !(
      !e ||
      e.producerNode === void 0 ||
      e.producerIndexOfThis === void 0 ||
      e.producerLastReadVersion === void 0
    ))
  ) {
    if (Zs(e))
      for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
        Ws(e.producerNode[n], e.producerIndexOfThis[n]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(),
        e.producerLastReadVersion.pop(),
        e.producerIndexOfThis.pop();
  }
}
function Gs(e) {
  Ys(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    let n = e.producerNode[t],
      r = e.producerLastReadVersion[t];
    if (r !== n.version || (fm(n), r !== n.version)) return !0;
  }
  return !1;
}
function qs(e) {
  if ((Ys(e), Zs(e)))
    for (let t = 0; t < e.producerNode.length; t++)
      Ws(e.producerNode[t], e.producerIndexOfThis[t]);
  (e.producerNode.length =
    e.producerLastReadVersion.length =
    e.producerIndexOfThis.length =
      0),
    e.liveConsumerNode &&
      (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function Ws(e, t) {
  if ((hm(e), e.liveConsumerNode.length === 1 && pm(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      Ws(e.producerNode[r], e.producerIndexOfThis[r]);
  let n = e.liveConsumerNode.length - 1;
  if (
    ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
    (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
    e.liveConsumerNode.length--,
    e.liveConsumerIndexOfThis.length--,
    t < e.liveConsumerNode.length)
  ) {
    let r = e.liveConsumerIndexOfThis[t],
      o = e.liveConsumerNode[t];
    Ys(o), (o.producerIndexOfThis[r] = t);
  }
}
function Zs(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function Ys(e) {
  (e.producerNode ??= []),
    (e.producerIndexOfThis ??= []),
    (e.producerLastReadVersion ??= []);
}
function hm(e) {
  (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function pm(e) {
  return e.producerNode !== void 0;
}
function gm() {
  throw new Error();
}
var mm = gm;
function Il(e) {
  mm = e;
}
function _(e) {
  return typeof e == "function";
}
function En(e) {
  let n = e((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var vo = En(
  (e) =>
    function (n) {
      e(this),
        (this.message = n
          ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = n);
    }
);
function fr(e, t) {
  if (e) {
    let n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var ne = class e {
  constructor(t) {
    (this.initialTeardown = t),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let t;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: n } = this;
      if (n)
        if (((this._parentage = null), Array.isArray(n)))
          for (let i of n) i.remove(this);
        else n.remove(this);
      let { initialTeardown: r } = this;
      if (_(r))
        try {
          r();
        } catch (i) {
          t = i instanceof vo ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            Cl(i);
          } catch (s) {
            (t = t ?? []),
              s instanceof vo ? (t = [...t, ...s.errors]) : t.push(s);
          }
      }
      if (t) throw new vo(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) Cl(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this)) return;
          t._addParent(this);
        }
        (this._finalizers =
          (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }
  _hasParent(t) {
    let { _parentage: n } = this;
    return n === t || (Array.isArray(n) && n.includes(t));
  }
  _addParent(t) {
    let { _parentage: n } = this;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }
  _removeParent(t) {
    let { _parentage: n } = this;
    n === t ? (this._parentage = null) : Array.isArray(n) && fr(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    n && fr(n, t), t instanceof e && t._removeParent(this);
  }
};
ne.EMPTY = (() => {
  let e = new ne();
  return (e.closed = !0), e;
})();
var Qs = ne.EMPTY;
function yo(e) {
  return (
    e instanceof ne ||
    (e && "closed" in e && _(e.remove) && _(e.add) && _(e.unsubscribe))
  );
}
function Cl(e) {
  _(e) ? e() : e.unsubscribe();
}
var ze = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var In = {
  setTimeout(e, t, ...n) {
    let { delegate: r } = In;
    return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    let { delegate: t } = In;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function Do(e) {
  In.setTimeout(() => {
    let { onUnhandledError: t } = ze;
    if (t) t(e);
    else throw e;
  });
}
function hr() {}
var bl = Ks("C", void 0, void 0);
function Ml(e) {
  return Ks("E", void 0, e);
}
function Sl(e) {
  return Ks("N", e, void 0);
}
function Ks(e, t, n) {
  return { kind: e, value: t, error: n };
}
var tn = null;
function Cn(e) {
  if (ze.useDeprecatedSynchronousErrorHandling) {
    let t = !tn;
    if ((t && (tn = { errorThrown: !1, error: null }), e(), t)) {
      let { errorThrown: n, error: r } = tn;
      if (((tn = null), n)) throw r;
    }
  } else e();
}
function Tl(e) {
  ze.useDeprecatedSynchronousErrorHandling &&
    tn &&
    ((tn.errorThrown = !0), (tn.error = e));
}
var nn = class extends ne {
    constructor(t) {
      super(),
        (this.isStopped = !1),
        t
          ? ((this.destination = t), yo(t) && t.add(this))
          : (this.destination = Dm);
    }
    static create(t, n, r) {
      return new bn(t, n, r);
    }
    next(t) {
      this.isStopped ? Xs(Sl(t), this) : this._next(t);
    }
    error(t) {
      this.isStopped
        ? Xs(Ml(t), this)
        : ((this.isStopped = !0), this._error(t));
    }
    complete() {
      this.isStopped ? Xs(bl, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(t) {
      this.destination.next(t);
    }
    _error(t) {
      try {
        this.destination.error(t);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  vm = Function.prototype.bind;
function Js(e, t) {
  return vm.call(e, t);
}
var ea = class {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (r) {
          wo(r);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (r) {
          wo(r);
        }
      else wo(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          wo(n);
        }
    }
  },
  bn = class extends nn {
    constructor(t, n, r) {
      super();
      let o;
      if (_(t) || !t)
        o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
      else {
        let i;
        this && ze.useDeprecatedNextContext
          ? ((i = Object.create(t)),
            (i.unsubscribe = () => this.unsubscribe()),
            (o = {
              next: t.next && Js(t.next, i),
              error: t.error && Js(t.error, i),
              complete: t.complete && Js(t.complete, i),
            }))
          : (o = t);
      }
      this.destination = new ea(o);
    }
  };
function wo(e) {
  ze.useDeprecatedSynchronousErrorHandling ? Tl(e) : Do(e);
}
function ym(e) {
  throw e;
}
function Xs(e, t) {
  let { onStoppedNotification: n } = ze;
  n && In.setTimeout(() => n(e, t));
}
var Dm = { closed: !0, next: hr, error: ym, complete: hr };
var Mn = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function xe(e) {
  return e;
}
function ta(...e) {
  return na(e);
}
function na(e) {
  return e.length === 0
    ? xe
    : e.length === 1
    ? e[0]
    : function (n) {
        return e.reduce((r, o) => o(r), n);
      };
}
var V = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new e();
      return (r.source = this), (r.operator = n), r;
    }
    subscribe(n, r, o) {
      let i = Em(n) ? n : new bn(n, r, o);
      return (
        Cn(() => {
          let { operator: s, source: a } = this;
          i.add(
            s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i)
          );
        }),
        i
      );
    }
    _trySubscribe(n) {
      try {
        return this._subscribe(n);
      } catch (r) {
        n.error(r);
      }
    }
    forEach(n, r) {
      return (
        (r = _l(r)),
        new r((o, i) => {
          let s = new bn({
            next: (a) => {
              try {
                n(a);
              } catch (c) {
                i(c), s.unsubscribe();
              }
            },
            error: i,
            complete: o,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(n) {
      var r;
      return (r = this.source) === null || r === void 0
        ? void 0
        : r.subscribe(n);
    }
    [Mn]() {
      return this;
    }
    pipe(...n) {
      return na(n)(this);
    }
    toPromise(n) {
      return (
        (n = _l(n)),
        new n((r, o) => {
          let i;
          this.subscribe(
            (s) => (i = s),
            (s) => o(s),
            () => r(i)
          );
        })
      );
    }
  }
  return (e.create = (t) => new e(t)), e;
})();
function _l(e) {
  var t;
  return (t = e ?? ze.Promise) !== null && t !== void 0 ? t : Promise;
}
function wm(e) {
  return e && _(e.next) && _(e.error) && _(e.complete);
}
function Em(e) {
  return (e && e instanceof nn) || (wm(e) && yo(e));
}
function ra(e) {
  return _(e?.lift);
}
function L(e) {
  return (t) => {
    if (ra(t))
      return t.lift(function (n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function j(e, t, n, r, o) {
  return new oa(e, t, n, r, o);
}
var oa = class extends nn {
  constructor(t, n, r, o, i, s) {
    super(t),
      (this.onFinalize = i),
      (this.shouldUnsubscribe = s),
      (this._next = n
        ? function (a) {
            try {
              n(a);
            } catch (c) {
              t.error(c);
            }
          }
        : super._next),
      (this._error = o
        ? function (a) {
            try {
              o(a);
            } catch (c) {
              t.error(c);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
            } catch (a) {
              t.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: n } = this;
      super.unsubscribe(),
        !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }
};
function Sn() {
  return L((e, t) => {
    let n = null;
    e._refCount++;
    let r = j(t, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        n = null;
        return;
      }
      let o = e._connection,
        i = n;
      (n = null), o && (!i || o === i) && o.unsubscribe(), t.unsubscribe();
    });
    e.subscribe(r), r.closed || (n = e.connect());
  });
}
var Tn = class extends V {
  constructor(t, n) {
    super(),
      (this.source = t),
      (this.subjectFactory = n),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      ra(t) && (this.lift = t.lift);
  }
  _subscribe(t) {
    return this.getSubject().subscribe(t);
  }
  getSubject() {
    let t = this._subject;
    return (
      (!t || t.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: t } = this;
    (this._subject = this._connection = null), t?.unsubscribe();
  }
  connect() {
    let t = this._connection;
    if (!t) {
      t = this._connection = new ne();
      let n = this.getSubject();
      t.add(
        this.source.subscribe(
          j(
            n,
            void 0,
            () => {
              this._teardown(), n.complete();
            },
            (r) => {
              this._teardown(), n.error(r);
            },
            () => this._teardown()
          )
        )
      ),
        t.closed && ((this._connection = null), (t = ne.EMPTY));
    }
    return t;
  }
  refCount() {
    return Sn()(this);
  }
};
var xl = En(
  (e) =>
    function () {
      e(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var he = (() => {
    class e extends V {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(n) {
        let r = new Eo(this, this);
        return (r.operator = n), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new xl();
      }
      next(n) {
        Cn(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(n);
          }
        });
      }
      error(n) {
        Cn(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = n);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(n);
          }
        });
      }
      complete() {
        Cn(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: n } = this;
            for (; n.length; ) n.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var n;
        return (
          ((n = this.observers) === null || n === void 0 ? void 0 : n.length) >
          0
        );
      }
      _trySubscribe(n) {
        return this._throwIfClosed(), super._trySubscribe(n);
      }
      _subscribe(n) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(n),
          this._innerSubscribe(n)
        );
      }
      _innerSubscribe(n) {
        let { hasError: r, isStopped: o, observers: i } = this;
        return r || o
          ? Qs
          : ((this.currentObservers = null),
            i.push(n),
            new ne(() => {
              (this.currentObservers = null), fr(i, n);
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? n.error(o) : i && n.complete();
      }
      asObservable() {
        let n = new V();
        return (n.source = this), n;
      }
    }
    return (e.create = (t, n) => new Eo(t, n)), e;
  })(),
  Eo = class extends he {
    constructor(t, n) {
      super(), (this.destination = t), (this.source = n);
    }
    next(t) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.next) ===
        null ||
        r === void 0 ||
        r.call(n, t);
    }
    error(t) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.error) ===
        null ||
        r === void 0 ||
        r.call(n, t);
    }
    complete() {
      var t, n;
      (n =
        (t = this.destination) === null || t === void 0
          ? void 0
          : t.complete) === null ||
        n === void 0 ||
        n.call(t);
    }
    _subscribe(t) {
      var n, r;
      return (r =
        (n = this.source) === null || n === void 0
          ? void 0
          : n.subscribe(t)) !== null && r !== void 0
        ? r
        : Qs;
    }
  };
var le = class extends he {
  constructor(t) {
    super(), (this._value = t);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(t) {
    let n = super._subscribe(t);
    return !n.closed && t.next(this._value), n;
  }
  getValue() {
    let { hasError: t, thrownError: n, _value: r } = this;
    if (t) throw n;
    return this._throwIfClosed(), r;
  }
  next(t) {
    super.next((this._value = t));
  }
};
var Ne = new V((e) => e.complete());
function Nl(e) {
  return e && _(e.schedule);
}
function Al(e) {
  return e[e.length - 1];
}
function Rl(e) {
  return _(Al(e)) ? e.pop() : void 0;
}
function Ot(e) {
  return Nl(Al(e)) ? e.pop() : void 0;
}
function Pl(e, t, n, r) {
  function o(i) {
    return i instanceof n
      ? i
      : new n(function (s) {
          s(i);
        });
  }
  return new (n || (n = Promise))(function (i, s) {
    function a(l) {
      try {
        u(r.next(l));
      } catch (d) {
        s(d);
      }
    }
    function c(l) {
      try {
        u(r.throw(l));
      } catch (d) {
        s(d);
      }
    }
    function u(l) {
      l.done ? i(l.value) : o(l.value).then(a, c);
    }
    u((r = r.apply(e, t || [])).next());
  });
}
function Ol(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function rn(e) {
  return this instanceof rn ? ((this.v = e), this) : new rn(e);
}
function Fl(e, t, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []),
    o,
    i = [];
  return (
    (o = Object.create(
      (typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype
    )),
    a("next"),
    a("throw"),
    a("return", s),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(f) {
    return function (g) {
      return Promise.resolve(g).then(f, d);
    };
  }
  function a(f, g) {
    r[f] &&
      ((o[f] = function (y) {
        return new Promise(function (E, R) {
          i.push([f, y, E, R]) > 1 || c(f, y);
        });
      }),
      g && (o[f] = g(o[f])));
  }
  function c(f, g) {
    try {
      u(r[f](g));
    } catch (y) {
      h(i[0][3], y);
    }
  }
  function u(f) {
    f.value instanceof rn
      ? Promise.resolve(f.value.v).then(l, d)
      : h(i[0][2], f);
  }
  function l(f) {
    c("next", f);
  }
  function d(f) {
    c("throw", f);
  }
  function h(f, g) {
    f(g), i.shift(), i.length && c(i[0][0], i[0][1]);
  }
}
function kl(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof Ol == "function" ? Ol(e) : e[Symbol.iterator]()),
      (n = {}),
      r("next"),
      r("throw"),
      r("return"),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(i) {
    n[i] =
      e[i] &&
      function (s) {
        return new Promise(function (a, c) {
          (s = e[i](s)), o(a, c, s.done, s.value);
        });
      };
  }
  function o(i, s, a, c) {
    Promise.resolve(c).then(function (u) {
      i({ value: u, done: a });
    }, s);
  }
}
var Io = (e) => e && typeof e.length == "number" && typeof e != "function";
function Co(e) {
  return _(e?.then);
}
function bo(e) {
  return _(e[Mn]);
}
function Mo(e) {
  return Symbol.asyncIterator && _(e?.[Symbol.asyncIterator]);
}
function So(e) {
  return new TypeError(
    `You provided ${
      e !== null && typeof e == "object" ? "an invalid object" : `'${e}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function Im() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var To = Im();
function _o(e) {
  return _(e?.[To]);
}
function xo(e) {
  return Fl(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield rn(n.read());
        if (o) return yield rn(void 0);
        yield yield rn(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function No(e) {
  return _(e?.getReader);
}
function se(e) {
  if (e instanceof V) return e;
  if (e != null) {
    if (bo(e)) return Cm(e);
    if (Io(e)) return bm(e);
    if (Co(e)) return Mm(e);
    if (Mo(e)) return Ll(e);
    if (_o(e)) return Sm(e);
    if (No(e)) return Tm(e);
  }
  throw So(e);
}
function Cm(e) {
  return new V((t) => {
    let n = e[Mn]();
    if (_(n.subscribe)) return n.subscribe(t);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function bm(e) {
  return new V((t) => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function Mm(e) {
  return new V((t) => {
    e.then(
      (n) => {
        t.closed || (t.next(n), t.complete());
      },
      (n) => t.error(n)
    ).then(null, Do);
  });
}
function Sm(e) {
  return new V((t) => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function Ll(e) {
  return new V((t) => {
    _m(e, t).catch((n) => t.error(n));
  });
}
function Tm(e) {
  return Ll(xo(e));
}
function _m(e, t) {
  var n, r, o, i;
  return Pl(this, void 0, void 0, function* () {
    try {
      for (n = kl(e); (r = yield n.next()), !r.done; ) {
        let s = r.value;
        if ((t.next(s), t.closed)) return;
      }
    } catch (s) {
      o = { error: s };
    } finally {
      try {
        r && !r.done && (i = n.return) && (yield i.call(n));
      } finally {
        if (o) throw o.error;
      }
    }
    t.complete();
  });
}
function be(e, t, n, r = 0, o = !1) {
  let i = t.schedule(function () {
    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(i), !o)) return i;
}
function Ao(e, t = 0) {
  return L((n, r) => {
    n.subscribe(
      j(
        r,
        (o) => be(r, e, () => r.next(o), t),
        () => be(r, e, () => r.complete(), t),
        (o) => be(r, e, () => r.error(o), t)
      )
    );
  });
}
function Ro(e, t = 0) {
  return L((n, r) => {
    r.add(e.schedule(() => n.subscribe(r), t));
  });
}
function jl(e, t) {
  return se(e).pipe(Ro(t), Ao(t));
}
function Vl(e, t) {
  return se(e).pipe(Ro(t), Ao(t));
}
function Ul(e, t) {
  return new V((n) => {
    let r = 0;
    return t.schedule(function () {
      r === e.length
        ? n.complete()
        : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function Bl(e, t) {
  return new V((n) => {
    let r;
    return (
      be(n, t, () => {
        (r = e[To]()),
          be(
            n,
            t,
            () => {
              let o, i;
              try {
                ({ value: o, done: i } = r.next());
              } catch (s) {
                n.error(s);
                return;
              }
              i ? n.complete() : n.next(o);
            },
            0,
            !0
          );
      }),
      () => _(r?.return) && r.return()
    );
  });
}
function Oo(e, t) {
  if (!e) throw new Error("Iterable cannot be null");
  return new V((n) => {
    be(n, t, () => {
      let r = e[Symbol.asyncIterator]();
      be(
        n,
        t,
        () => {
          r.next().then((o) => {
            o.done ? n.complete() : n.next(o.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function $l(e, t) {
  return Oo(xo(e), t);
}
function Hl(e, t) {
  if (e != null) {
    if (bo(e)) return jl(e, t);
    if (Io(e)) return Ul(e, t);
    if (Co(e)) return Vl(e, t);
    if (Mo(e)) return Oo(e, t);
    if (_o(e)) return Bl(e, t);
    if (No(e)) return $l(e, t);
  }
  throw So(e);
}
function J(e, t) {
  return t ? Hl(e, t) : se(e);
}
function S(...e) {
  let t = Ot(e);
  return J(e, t);
}
function _n(e, t) {
  let n = _(e) ? e : () => e,
    r = (o) => o.error(n());
  return new V(t ? (o) => t.schedule(r, 0, o) : r);
}
function ia(e) {
  return !!e && (e instanceof V || (_(e.lift) && _(e.subscribe)));
}
var gt = En(
  (e) =>
    function () {
      e(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function N(e, t) {
  return L((n, r) => {
    let o = 0;
    n.subscribe(
      j(r, (i) => {
        r.next(e.call(t, i, o++));
      })
    );
  });
}
var { isArray: xm } = Array;
function Nm(e, t) {
  return xm(t) ? e(...t) : e(t);
}
function zl(e) {
  return N((t) => Nm(e, t));
}
var { isArray: Am } = Array,
  { getPrototypeOf: Rm, prototype: Om, keys: Pm } = Object;
function Gl(e) {
  if (e.length === 1) {
    let t = e[0];
    if (Am(t)) return { args: t, keys: null };
    if (Fm(t)) {
      let n = Pm(t);
      return { args: n.map((r) => t[r]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function Fm(e) {
  return e && typeof e == "object" && Rm(e) === Om;
}
function ql(e, t) {
  return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function pr(...e) {
  let t = Ot(e),
    n = Rl(e),
    { args: r, keys: o } = Gl(e);
  if (r.length === 0) return J([], t);
  let i = new V(km(r, t, o ? (s) => ql(o, s) : xe));
  return n ? i.pipe(zl(n)) : i;
}
function km(e, t, n = xe) {
  return (r) => {
    Wl(
      t,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let c = 0; c < o; c++)
          Wl(
            t,
            () => {
              let u = J(e[c], t),
                l = !1;
              u.subscribe(
                j(
                  r,
                  (d) => {
                    (i[c] = d), l || ((l = !0), a--), a || r.next(n(i.slice()));
                  },
                  () => {
                    --s || r.complete();
                  }
                )
              );
            },
            r
          );
      },
      r
    );
  };
}
function Wl(e, t, n) {
  e ? be(n, e, t) : t();
}
function Zl(e, t, n, r, o, i, s, a) {
  let c = [],
    u = 0,
    l = 0,
    d = !1,
    h = () => {
      d && !c.length && !u && t.complete();
    },
    f = (y) => (u < r ? g(y) : c.push(y)),
    g = (y) => {
      i && t.next(y), u++;
      let E = !1;
      se(n(y, l++)).subscribe(
        j(
          t,
          (R) => {
            o?.(R), i ? f(R) : t.next(R);
          },
          () => {
            E = !0;
          },
          void 0,
          () => {
            if (E)
              try {
                for (u--; c.length && u < r; ) {
                  let R = c.shift();
                  s ? be(t, s, () => g(R)) : g(R);
                }
                h();
              } catch (R) {
                t.error(R);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      j(t, f, () => {
        (d = !0), h();
      })
    ),
    () => {
      a?.();
    }
  );
}
function re(e, t, n = 1 / 0) {
  return _(t)
    ? re((r, o) => N((i, s) => t(r, i, o, s))(se(e(r, o))), n)
    : (typeof t == "number" && (n = t), L((r, o) => Zl(r, o, e, n)));
}
function xn(e = 1 / 0) {
  return re(xe, e);
}
function Yl() {
  return xn(1);
}
function Nn(...e) {
  return Yl()(J(e, Ot(e)));
}
function Po(e) {
  return new V((t) => {
    se(e()).subscribe(t);
  });
}
function Me(e, t) {
  return L((n, r) => {
    let o = 0;
    n.subscribe(j(r, (i) => e.call(t, i, o++) && r.next(i)));
  });
}
function Pt(e) {
  return L((t, n) => {
    let r = null,
      o = !1,
      i;
    (r = t.subscribe(
      j(n, void 0, void 0, (s) => {
        (i = se(e(s, Pt(e)(t)))),
          r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
      })
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n));
  });
}
function Ql(e, t, n, r, o) {
  return (i, s) => {
    let a = n,
      c = t,
      u = 0;
    i.subscribe(
      j(
        s,
        (l) => {
          let d = u++;
          (c = a ? e(c, l, d) : ((a = !0), l)), r && s.next(c);
        },
        o &&
          (() => {
            a && s.next(c), s.complete();
          })
      )
    );
  };
}
function mt(e, t) {
  return _(t) ? re(e, t, 1) : re(e, 1);
}
function Ft(e) {
  return L((t, n) => {
    let r = !1;
    t.subscribe(
      j(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => {
          r || n.next(e), n.complete();
        }
      )
    );
  });
}
function vt(e) {
  return e <= 0
    ? () => Ne
    : L((t, n) => {
        let r = 0;
        t.subscribe(
          j(n, (o) => {
            ++r <= e && (n.next(o), e <= r && n.complete());
          })
        );
      });
}
function sa(e) {
  return N(() => e);
}
function Fo(e = Lm) {
  return L((t, n) => {
    let r = !1;
    t.subscribe(
      j(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => (r ? n.complete() : n.error(e()))
      )
    );
  });
}
function Lm() {
  return new gt();
}
function kt(e) {
  return L((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function tt(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? Me((o, i) => e(o, i, r)) : xe,
      vt(1),
      n ? Ft(t) : Fo(() => new gt())
    );
}
function An(e) {
  return e <= 0
    ? () => Ne
    : L((t, n) => {
        let r = [];
        t.subscribe(
          j(
            n,
            (o) => {
              r.push(o), e < r.length && r.shift();
            },
            () => {
              for (let o of r) n.next(o);
              n.complete();
            },
            void 0,
            () => {
              r = null;
            }
          )
        );
      });
}
function aa(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? Me((o, i) => e(o, i, r)) : xe,
      An(1),
      n ? Ft(t) : Fo(() => new gt())
    );
}
function ca(e, t) {
  return L(Ql(e, t, arguments.length >= 2, !0));
}
function ua(...e) {
  let t = Ot(e);
  return L((n, r) => {
    (t ? Nn(e, n, t) : Nn(e, n)).subscribe(r);
  });
}
function Se(e, t) {
  return L((n, r) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && r.complete();
    n.subscribe(
      j(
        r,
        (c) => {
          o?.unsubscribe();
          let u = 0,
            l = i++;
          se(e(c, l)).subscribe(
            (o = j(
              r,
              (d) => r.next(t ? t(c, d, l, u++) : d),
              () => {
                (o = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function la(e) {
  return L((t, n) => {
    se(e).subscribe(j(n, () => n.complete(), hr)), !n.closed && t.subscribe(n);
  });
}
function ae(e, t, n) {
  let r = _(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? L((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(
          j(
            i,
            (c) => {
              var u;
              (u = r.next) === null || u === void 0 || u.call(r, c), i.next(c);
            },
            () => {
              var c;
              (a = !1),
                (c = r.complete) === null || c === void 0 || c.call(r),
                i.complete();
            },
            (c) => {
              var u;
              (a = !1),
                (u = r.error) === null || u === void 0 || u.call(r, c),
                i.error(c);
            },
            () => {
              var c, u;
              a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)),
                (u = r.finalize) === null || u === void 0 || u.call(r);
            }
          )
        );
      })
    : xe;
}
var Ld = "https://g.co/ng/security#xss",
  I = class extends Error {
    constructor(t, n) {
      super(yi(t, n)), (this.code = t);
    }
  };
function yi(e, t) {
  return `${`NG0${Math.abs(e)}`}${t ? ": " + t : ""}`;
}
function Sr(e) {
  return { toString: e }.toString();
}
var ko = "__parameters__";
function jm(e) {
  return function (...n) {
    if (e) {
      let r = e(...n);
      for (let o in r) this[o] = r[o];
    }
  };
}
function jd(e, t, n) {
  return Sr(() => {
    let r = jm(t);
    function o(...i) {
      if (this instanceof o) return r.apply(this, i), this;
      let s = new o(...i);
      return (a.annotation = s), a;
      function a(c, u, l) {
        let d = c.hasOwnProperty(ko)
          ? c[ko]
          : Object.defineProperty(c, ko, { value: [] })[ko];
        for (; d.length <= l; ) d.push(null);
        return (d[l] = d[l] || []).push(s), c;
      }
    }
    return (
      n && (o.prototype = Object.create(n.prototype)),
      (o.prototype.ngMetadataName = e),
      (o.annotationCls = o),
      o
    );
  });
}
var ge = globalThis;
function W(e) {
  for (let t in e) if (e[t] === W) return t;
  throw Error("Could not find renamed property on target object.");
}
function ve(e) {
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return "[" + e.map(ve).join(", ") + "]";
  if (e == null) return "" + e;
  if (e.overriddenName) return `${e.overriddenName}`;
  if (e.name) return `${e.name}`;
  let t = e.toString();
  if (t == null) return "" + t;
  let n = t.indexOf(`
`);
  return n === -1 ? t : t.substring(0, n);
}
function Kl(e, t) {
  return e == null || e === ""
    ? t === null
      ? ""
      : t
    : t == null || t === ""
    ? e
    : e + " " + t;
}
var Vm = W({ __forward_ref__: W });
function Vd(e) {
  return (
    (e.__forward_ref__ = Vd),
    (e.toString = function () {
      return ve(this());
    }),
    e
  );
}
function ke(e) {
  return Ud(e) ? e() : e;
}
function Ud(e) {
  return (
    typeof e == "function" && e.hasOwnProperty(Vm) && e.__forward_ref__ === Vd
  );
}
function C(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0,
  };
}
function we(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function Di(e) {
  return Jl(e, $d) || Jl(e, Hd);
}
function Bd(e) {
  return Di(e) !== null;
}
function Jl(e, t) {
  return e.hasOwnProperty(t) ? e[t] : null;
}
function Um(e) {
  let t = e && (e[$d] || e[Hd]);
  return t || null;
}
function Xl(e) {
  return e && (e.hasOwnProperty(ed) || e.hasOwnProperty(Bm)) ? e[ed] : null;
}
var $d = W({ ɵprov: W }),
  ed = W({ ɵinj: W }),
  Hd = W({ ngInjectableDef: W }),
  Bm = W({ ngInjectorDef: W }),
  w = class {
    constructor(t, n) {
      (this._desc = t),
        (this.ngMetadataName = "InjectionToken"),
        (this.ɵprov = void 0),
        typeof n == "number"
          ? (this.__NG_ELEMENT_ID__ = n)
          : n !== void 0 &&
            (this.ɵprov = C({
              token: this,
              providedIn: n.providedIn || "root",
              factory: n.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function zd(e) {
  return e && !!e.ɵproviders;
}
var $m = W({ ɵcmp: W }),
  Hm = W({ ɵdir: W }),
  zm = W({ ɵpipe: W }),
  Gm = W({ ɵmod: W }),
  Go = W({ ɵfac: W }),
  mr = W({ __NG_ELEMENT_ID__: W }),
  td = W({ __NG_ENV_ID__: W });
function jn(e) {
  return typeof e == "string" ? e : e == null ? "" : String(e);
}
function qm(e) {
  return typeof e == "function"
    ? e.name || e.toString()
    : typeof e == "object" && e != null && typeof e.type == "function"
    ? e.type.name || e.type.toString()
    : jn(e);
}
function Wm(e, t) {
  let n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
  throw new I(-200, e);
}
function cc(e, t) {
  throw new I(-201, !1);
}
var O = (function (e) {
    return (
      (e[(e.Default = 0)] = "Default"),
      (e[(e.Host = 1)] = "Host"),
      (e[(e.Self = 2)] = "Self"),
      (e[(e.SkipSelf = 4)] = "SkipSelf"),
      (e[(e.Optional = 8)] = "Optional"),
      e
    );
  })(O || {}),
  Ca;
function Gd() {
  return Ca;
}
function Te(e) {
  let t = Ca;
  return (Ca = e), t;
}
function qd(e, t, n) {
  let r = Di(e);
  if (r && r.providedIn == "root")
    return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & O.Optional) return null;
  if (t !== void 0) return t;
  cc(e, "Injector");
}
var Zm = {},
  yr = Zm,
  ba = "__NG_DI_FLAG__",
  qo = "ngTempTokenPath",
  Ym = "ngTokenPath",
  Qm = /\n/gm,
  Km = "\u0275",
  nd = "__source",
  kn;
function Jm() {
  return kn;
}
function Lt(e) {
  let t = kn;
  return (kn = e), t;
}
function Xm(e, t = O.Default) {
  if (kn === void 0) throw new I(-203, !1);
  return kn === null
    ? qd(e, void 0, t)
    : kn.get(e, t & O.Optional ? null : void 0, t);
}
function b(e, t = O.Default) {
  return (Gd() || Xm)(ke(e), t);
}
function p(e, t = O.Default) {
  return b(e, wi(t));
}
function wi(e) {
  return typeof e > "u" || typeof e == "number"
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function Ma(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = ke(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new I(900, !1);
      let o,
        i = O.Default;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          c = ev(a);
        typeof c == "number" ? (c === -1 ? (o = a.token) : (i |= c)) : (o = a);
      }
      t.push(b(o, i));
    } else t.push(b(r));
  }
  return t;
}
function Wd(e, t) {
  return (e[ba] = t), (e.prototype[ba] = t), e;
}
function ev(e) {
  return e[ba];
}
function tv(e, t, n, r) {
  let o = e[qo];
  throw (
    (t[nd] && o.unshift(t[nd]),
    (e.message = nv(
      `
` + e.message,
      o,
      n,
      r
    )),
    (e[Ym] = o),
    (e[qo] = null),
    e)
  );
}
function nv(e, t, n, r = null) {
  e =
    e &&
    e.charAt(0) ===
      `
` &&
    e.charAt(1) == Km
      ? e.slice(2)
      : e;
  let o = ve(t);
  if (Array.isArray(t)) o = t.map(ve).join(" -> ");
  else if (typeof t == "object") {
    let i = [];
    for (let s in t)
      if (t.hasOwnProperty(s)) {
        let a = t[s];
        i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : ve(a)));
      }
    o = `{${i.join(", ")}}`;
  }
  return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
    Qm,
    `
  `
  )}`;
}
var Ei = Wd(jd("Optional"), 8);
var uc = Wd(jd("SkipSelf"), 4);
function an(e, t) {
  let n = e.hasOwnProperty(Go);
  return n ? e[Go] : null;
}
function lc(e, t) {
  e.forEach((n) => (Array.isArray(n) ? lc(n, t) : t(n)));
}
function Zd(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function Wo(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function rv(e, t, n, r) {
  let o = e.length;
  if (o == t) e.push(n, r);
  else if (o === 1) e.push(r, e[0]), (e[0] = n);
  else {
    for (o--, e.push(e[o - 1], e[o]); o > t; ) {
      let i = o - 2;
      (e[o] = e[i]), o--;
    }
    (e[t] = n), (e[t + 1] = r);
  }
}
function ov(e, t, n) {
  let r = Tr(e, t);
  return r >= 0 ? (e[r | 1] = n) : ((r = ~r), rv(e, r, t, n)), r;
}
function da(e, t) {
  let n = Tr(e, t);
  if (n >= 0) return e[n | 1];
}
function Tr(e, t) {
  return iv(e, t, 1);
}
function iv(e, t, n) {
  let r = 0,
    o = e.length >> n;
  for (; o !== r; ) {
    let i = r + ((o - r) >> 1),
      s = e[i << n];
    if (t === s) return i << n;
    s > t ? (o = i) : (r = i + 1);
  }
  return ~(o << n);
}
var Dr = {},
  qe = [],
  Vn = new w(""),
  Yd = new w("", -1),
  Qd = new w(""),
  Zo = class {
    get(t, n = yr) {
      if (n === yr) {
        let r = new Error(`NullInjectorError: No provider for ${ve(t)}!`);
        throw ((r.name = "NullInjectorError"), r);
      }
      return n;
    }
  },
  Kd = (function (e) {
    return (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e;
  })(Kd || {}),
  ot = (function (e) {
    return (
      (e[(e.Emulated = 0)] = "Emulated"),
      (e[(e.None = 2)] = "None"),
      (e[(e.ShadowDom = 3)] = "ShadowDom"),
      e
    );
  })(ot || {}),
  Ut = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.SignalBased = 1)] = "SignalBased"),
      (e[(e.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      e
    );
  })(Ut || {});
function sv(e, t, n) {
  let r = e.length;
  for (;;) {
    let o = e.indexOf(t, n);
    if (o === -1) return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
      let i = t.length;
      if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
    }
    n = o + 1;
  }
}
function Sa(e, t, n) {
  let r = 0;
  for (; r < n.length; ) {
    let o = n[r];
    if (typeof o == "number") {
      if (o !== 0) break;
      r++;
      let i = n[r++],
        s = n[r++],
        a = n[r++];
      e.setAttribute(t, s, a, i);
    } else {
      let i = o,
        s = n[++r];
      av(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
    }
  }
  return r;
}
function Jd(e) {
  return e === 3 || e === 4 || e === 6;
}
function av(e) {
  return e.charCodeAt(0) === 64;
}
function dc(e, t) {
  if (!(t === null || t.length === 0))
    if (e === null || e.length === 0) e = t.slice();
    else {
      let n = -1;
      for (let r = 0; r < t.length; r++) {
        let o = t[r];
        typeof o == "number"
          ? (n = o)
          : n === 0 ||
            (n === -1 || n === 2
              ? rd(e, n, o, null, t[++r])
              : rd(e, n, o, null, null));
      }
    }
  return e;
}
function rd(e, t, n, r, o) {
  let i = 0,
    s = e.length;
  if (t === -1) s = -1;
  else
    for (; i < e.length; ) {
      let a = e[i++];
      if (typeof a == "number") {
        if (a === t) {
          s = -1;
          break;
        } else if (a > t) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < e.length; ) {
    let a = e[i];
    if (typeof a == "number") break;
    if (a === n) {
      if (r === null) {
        o !== null && (e[i + 1] = o);
        return;
      } else if (r === e[i + 1]) {
        e[i + 2] = o;
        return;
      }
    }
    i++, r !== null && i++, o !== null && i++;
  }
  s !== -1 && (e.splice(s, 0, t), (i = s + 1)),
    e.splice(i++, 0, n),
    r !== null && e.splice(i++, 0, r),
    o !== null && e.splice(i++, 0, o);
}
var Xd = "ng-template";
function cv(e, t, n, r) {
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == "string"; o += 2)
      if (t[o] === "class" && sv(t[o + 1].toLowerCase(), n, 0) !== -1)
        return !0;
  } else if (fc(e)) return !1;
  if (((o = t.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == "string"; )
      if (i.toLowerCase() === n) return !0;
  }
  return !1;
}
function fc(e) {
  return e.type === 4 && e.value !== Xd;
}
function uv(e, t, n) {
  let r = e.type === 4 && !n ? Xd : e.value;
  return t === r;
}
function lv(e, t, n) {
  let r = 4,
    o = e.attrs,
    i = o !== null ? hv(o) : 0,
    s = !1;
  for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == "number") {
      if (!s && !Ge(r) && !Ge(c)) return !1;
      if (s && Ge(c)) continue;
      (s = !1), (r = c | (r & 1));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (
          ((r = 2 | (r & 1)),
          (c !== "" && !uv(e, c, n)) || (c === "" && t.length === 1))
        ) {
          if (Ge(r)) return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (o === null || !cv(e, o, c, n)) {
          if (Ge(r)) return !1;
          s = !0;
        }
      } else {
        let u = t[++a],
          l = dv(c, o, fc(e), n);
        if (l === -1) {
          if (Ge(r)) return !1;
          s = !0;
          continue;
        }
        if (u !== "") {
          let d;
          if (
            (l > i ? (d = "") : (d = o[l + 1].toLowerCase()), r & 2 && u !== d)
          ) {
            if (Ge(r)) return !1;
            s = !0;
          }
        }
      }
  }
  return Ge(r) || s;
}
function Ge(e) {
  return (e & 1) === 0;
}
function dv(e, t, n, r) {
  if (t === null) return -1;
  let o = 0;
  if (r || !n) {
    let i = !1;
    for (; o < t.length; ) {
      let s = t[o];
      if (s === e) return o;
      if (s === 3 || s === 6) i = !0;
      else if (s === 1 || s === 2) {
        let a = t[++o];
        for (; typeof a == "string"; ) a = t[++o];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          o += 4;
          continue;
        }
      }
      o += i ? 1 : 2;
    }
    return -1;
  } else return pv(t, e);
}
function fv(e, t, n = !1) {
  for (let r = 0; r < t.length; r++) if (lv(e, t[r], n)) return !0;
  return !1;
}
function hv(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (Jd(n)) return t;
  }
  return e.length;
}
function pv(e, t) {
  let n = e.indexOf(4);
  if (n > -1)
    for (n++; n < e.length; ) {
      let r = e[n];
      if (typeof r == "number") return -1;
      if (r === t) return n;
      n++;
    }
  return -1;
}
function od(e, t) {
  return e ? ":not(" + t.trim() + ")" : t;
}
function gv(e) {
  let t = e[0],
    n = 1,
    r = 2,
    o = "",
    i = !1;
  for (; n < e.length; ) {
    let s = e[n];
    if (typeof s == "string")
      if (r & 2) {
        let a = e[++n];
        o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else r & 8 ? (o += "." + s) : r & 4 && (o += " " + s);
    else
      o !== "" && !Ge(s) && ((t += od(i, o)), (o = "")),
        (r = s),
        (i = i || !Ge(r));
    n++;
  }
  return o !== "" && (t += od(i, o)), t;
}
function mv(e) {
  return e.map(gv).join(",");
}
function vv(e) {
  let t = [],
    n = [],
    r = 1,
    o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == "string")
      o === 2 ? i !== "" && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
      if (!Ge(o)) break;
      o = i;
    }
    r++;
  }
  return { attrs: t, classes: n };
}
function zt(e) {
  return Sr(() => {
    let t = of(e),
      n = K(D({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === Kd.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || ot.Emulated,
        styles: e.styles || qe,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: "",
      });
    sf(n);
    let r = e.dependencies;
    return (
      (n.directiveDefs = sd(r, !1)), (n.pipeDefs = sd(r, !0)), (n.id = wv(n)), n
    );
  });
}
function yv(e) {
  return Bt(e) || ef(e);
}
function Dv(e) {
  return e !== null;
}
function Ee(e) {
  return Sr(() => ({
    type: e.type,
    bootstrap: e.bootstrap || qe,
    declarations: e.declarations || qe,
    imports: e.imports || qe,
    exports: e.exports || qe,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function id(e, t) {
  if (e == null) return Dr;
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let o = e[r],
        i,
        s,
        a = Ut.None;
      Array.isArray(o)
        ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i))
        : ((i = o), (s = o)),
        t ? ((n[i] = a !== Ut.None ? [r, a] : r), (t[i] = s)) : (n[i] = r);
    }
  return n;
}
function ct(e) {
  return Sr(() => {
    let t = of(e);
    return sf(t), t;
  });
}
function pn(e) {
  return {
    type: e.type,
    name: e.name,
    factory: null,
    pure: e.pure !== !1,
    standalone: e.standalone === !0,
    onDestroy: e.type.prototype.ngOnDestroy || null,
  };
}
function Bt(e) {
  return e[$m] || null;
}
function ef(e) {
  return e[Hm] || null;
}
function tf(e) {
  return e[zm] || null;
}
function nf(e) {
  let t = Bt(e) || ef(e) || tf(e);
  return t !== null ? t.standalone : !1;
}
function rf(e, t) {
  let n = e[Gm] || null;
  if (!n && t === !0)
    throw new Error(`Type ${ve(e)} does not have '\u0275mod' property.`);
  return n;
}
function of(e) {
  let t = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputTransforms: null,
    inputConfig: e.inputs || Dr,
    exportAs: e.exportAs || null,
    standalone: e.standalone === !0,
    signals: e.signals === !0,
    selectors: e.selectors || qe,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: id(e.inputs, t),
    outputs: id(e.outputs),
    debugInfo: null,
  };
}
function sf(e) {
  e.features?.forEach((t) => t(e));
}
function sd(e, t) {
  if (!e) return null;
  let n = t ? tf : yv;
  return () => (typeof e == "function" ? e() : e).map((r) => n(r)).filter(Dv);
}
function wv(e) {
  let t = 0,
    n = [
      e.selectors,
      e.ngContentSelectors,
      e.hostVars,
      e.hostAttrs,
      e.consts,
      e.vars,
      e.decls,
      e.encapsulation,
      e.standalone,
      e.signals,
      e.exportAs,
      JSON.stringify(e.inputs),
      JSON.stringify(e.outputs),
      Object.getOwnPropertyNames(e.type.prototype),
      !!e.contentQueries,
      !!e.viewQuery,
    ].join("|");
  for (let o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
  return (t += 2147483648), "c" + t;
}
function Ii(e) {
  return { ɵproviders: e };
}
function Ev(...e) {
  return { ɵproviders: af(!0, e), ɵfromNgModule: !0 };
}
function af(e, ...t) {
  let n = [],
    r = new Set(),
    o,
    i = (s) => {
      n.push(s);
    };
  return (
    lc(t, (s) => {
      let a = s;
      Ta(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && cf(o, i),
    n
  );
}
function cf(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    hc(o, (i) => {
      t(i, r);
    });
  }
}
function Ta(e, t, n, r) {
  if (((e = ke(e)), !e)) return !1;
  let o = null,
    i = Xl(e),
    s = !i && Bt(e);
  if (!i && !s) {
    let c = e.ngModule;
    if (((i = Xl(c)), i)) o = c;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    o = e;
  }
  let a = r.has(o);
  if (s) {
    if (a) return !1;
    if ((r.add(o), s.dependencies)) {
      let c =
        typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let u of c) Ta(u, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let u;
      try {
        lc(i.imports, (l) => {
          Ta(l, t, n, r) && ((u ||= []), u.push(l));
        });
      } finally {
      }
      u !== void 0 && cf(u, t);
    }
    if (!a) {
      let u = an(o) || (() => new o());
      t({ provide: o, useFactory: u, deps: qe }, o),
        t({ provide: Qd, useValue: o, multi: !0 }, o),
        t({ provide: Vn, useValue: () => b(o), multi: !0 }, o);
    }
    let c = i.providers;
    if (c != null && !a) {
      let u = e;
      hc(c, (l) => {
        t(l, u);
      });
    }
  } else return !1;
  return o !== e && e.providers !== void 0;
}
function hc(e, t) {
  for (let n of e)
    zd(n) && (n = n.ɵproviders), Array.isArray(n) ? hc(n, t) : t(n);
}
var Iv = W({ provide: String, useValue: W });
function uf(e) {
  return e !== null && typeof e == "object" && Iv in e;
}
function Cv(e) {
  return !!(e && e.useExisting);
}
function bv(e) {
  return !!(e && e.useFactory);
}
function _a(e) {
  return typeof e == "function";
}
var Ci = new w(""),
  Bo = {},
  Mv = {},
  fa;
function pc() {
  return fa === void 0 && (fa = new Zo()), fa;
}
var ye = class {},
  wr = class extends ye {
    get destroyed() {
      return this._destroyed;
    }
    constructor(t, n, r, o) {
      super(),
        (this.parent = n),
        (this.source = r),
        (this.scopes = o),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        Na(t, (s) => this.processProvider(s)),
        this.records.set(Yd, Rn(void 0, this)),
        o.has("environment") && this.records.set(ye, Rn(void 0, this));
      let i = this.records.get(Ci);
      i != null && typeof i.value == "string" && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(Qd, qe, O.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      let t = U(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let n = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of n) r();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          U(t);
      }
    }
    onDestroy(t) {
      return (
        this.assertNotDestroyed(),
        this._onDestroyHooks.push(t),
        () => this.removeOnDestroy(t)
      );
    }
    runInContext(t) {
      this.assertNotDestroyed();
      let n = Lt(this),
        r = Te(void 0),
        o;
      try {
        return t();
      } finally {
        Lt(n), Te(r);
      }
    }
    get(t, n = yr, r = O.Default) {
      if ((this.assertNotDestroyed(), t.hasOwnProperty(td))) return t[td](this);
      r = wi(r);
      let o,
        i = Lt(this),
        s = Te(void 0);
      try {
        if (!(r & O.SkipSelf)) {
          let c = this.records.get(t);
          if (c === void 0) {
            let u = Av(t) && Di(t);
            u && this.injectableDefInScope(u)
              ? (c = Rn(xa(t), Bo))
              : (c = null),
              this.records.set(t, c);
          }
          if (c != null) return this.hydrate(t, c);
        }
        let a = r & O.Self ? pc() : this.parent;
        return (n = r & O.Optional && n === yr ? null : n), a.get(t, n);
      } catch (a) {
        if (a.name === "NullInjectorError") {
          if (((a[qo] = a[qo] || []).unshift(ve(t)), i)) throw a;
          return tv(a, t, "R3InjectorError", this.source);
        } else throw a;
      } finally {
        Te(s), Lt(i);
      }
    }
    resolveInjectorInitializers() {
      let t = U(null),
        n = Lt(this),
        r = Te(void 0),
        o;
      try {
        let i = this.get(Vn, qe, O.Self);
        for (let s of i) s();
      } finally {
        Lt(n), Te(r), U(t);
      }
    }
    toString() {
      let t = [],
        n = this.records;
      for (let r of n.keys()) t.push(ve(r));
      return `R3Injector[${t.join(", ")}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new I(205, !1);
    }
    processProvider(t) {
      t = ke(t);
      let n = _a(t) ? t : ke(t && t.provide),
        r = Tv(t);
      if (!_a(t) && t.multi === !0) {
        let o = this.records.get(n);
        o ||
          ((o = Rn(void 0, Bo, !0)),
          (o.factory = () => Ma(o.multi)),
          this.records.set(n, o)),
          (n = t),
          o.multi.push(t);
      }
      this.records.set(n, r);
    }
    hydrate(t, n) {
      let r = U(null);
      try {
        return (
          n.value === Bo && ((n.value = Mv), (n.value = n.factory())),
          typeof n.value == "object" &&
            n.value &&
            Nv(n.value) &&
            this._ngOnDestroyHooks.add(n.value),
          n.value
        );
      } finally {
        U(r);
      }
    }
    injectableDefInScope(t) {
      if (!t.providedIn) return !1;
      let n = ke(t.providedIn);
      return typeof n == "string"
        ? n === "any" || this.scopes.has(n)
        : this.injectorDefTypes.has(n);
    }
    removeOnDestroy(t) {
      let n = this._onDestroyHooks.indexOf(t);
      n !== -1 && this._onDestroyHooks.splice(n, 1);
    }
  };
function xa(e) {
  let t = Di(e),
    n = t !== null ? t.factory : an(e);
  if (n !== null) return n;
  if (e instanceof w) throw new I(204, !1);
  if (e instanceof Function) return Sv(e);
  throw new I(204, !1);
}
function Sv(e) {
  if (e.length > 0) throw new I(204, !1);
  let n = Um(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function Tv(e) {
  if (uf(e)) return Rn(void 0, e.useValue);
  {
    let t = _v(e);
    return Rn(t, Bo);
  }
}
function _v(e, t, n) {
  let r;
  if (_a(e)) {
    let o = ke(e);
    return an(o) || xa(o);
  } else if (uf(e)) r = () => ke(e.useValue);
  else if (bv(e)) r = () => e.useFactory(...Ma(e.deps || []));
  else if (Cv(e)) r = () => b(ke(e.useExisting));
  else {
    let o = ke(e && (e.useClass || e.provide));
    if (xv(e)) r = () => new o(...Ma(e.deps));
    else return an(o) || xa(o);
  }
  return r;
}
function Rn(e, t, n = !1) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function xv(e) {
  return !!e.deps;
}
function Nv(e) {
  return (
    e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
  );
}
function Av(e) {
  return typeof e == "function" || (typeof e == "object" && e instanceof w);
}
function Na(e, t) {
  for (let n of e)
    Array.isArray(n) ? Na(n, t) : n && zd(n) ? Na(n.ɵproviders, t) : t(n);
}
function Ue(e, t) {
  e instanceof wr && e.assertNotDestroyed();
  let n,
    r = Lt(e),
    o = Te(void 0);
  try {
    return t();
  } finally {
    Lt(r), Te(o);
  }
}
function lf() {
  return Gd() !== void 0 || Jm() != null;
}
function Rv(e) {
  if (!lf()) throw new I(-203, !1);
}
function Ov(e) {
  let t = ge.ng;
  if (t && t.ɵcompilerFacade) return t.ɵcompilerFacade;
  throw new Error("JIT compiler unavailable");
}
function Pv(e) {
  return typeof e == "function";
}
var wt = 0,
  F = 1,
  T = 2,
  De = 3,
  We = 4,
  Ye = 5,
  Yo = 6,
  Qo = 7,
  Ze = 8,
  Un = 9,
  it = 10,
  de = 11,
  Er = 12,
  ad = 13,
  Zn = 14,
  st = 15,
  Bn = 16,
  On = 17,
  $n = 18,
  bi = 19,
  df = 20,
  jt = 21,
  ha = 22,
  Le = 23,
  Ae = 25,
  ff = 1;
var cn = 7,
  Ko = 8,
  Jo = 9,
  je = 10,
  Xo = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      e
    );
  })(Xo || {});
function Vt(e) {
  return Array.isArray(e) && typeof e[ff] == "object";
}
function Et(e) {
  return Array.isArray(e) && e[ff] === !0;
}
function hf(e) {
  return (e.flags & 4) !== 0;
}
function Mi(e) {
  return e.componentOffset > -1;
}
function gc(e) {
  return (e.flags & 1) === 1;
}
function _r(e) {
  return !!e.template;
}
function Aa(e) {
  return (e[T] & 512) !== 0;
}
var Ra = class {
  constructor(t, n, r) {
    (this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function pf(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
}
function xr() {
  return gf;
}
function gf(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = kv), Fv;
}
xr.ngInherit = !0;
function Fv() {
  let e = vf(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === Dr) e.previous = t;
    else for (let r in t) n[r] = t[r];
    (e.current = null), this.ngOnChanges(t);
  }
}
function kv(e, t, n, r, o) {
  let i = this.declaredInputs[r],
    s = vf(e) || Lv(e, { previous: Dr, current: null }),
    a = s.current || (s.current = {}),
    c = s.previous,
    u = c[i];
  (a[i] = new Ra(u && u.currentValue, n, c === Dr)), pf(e, t, o, n);
}
var mf = "__ngSimpleChanges__";
function vf(e) {
  return e[mf] || null;
}
function Lv(e, t) {
  return (e[mf] = t);
}
var cd = null;
var nt = function (e, t, n) {
    cd?.(e, t, n);
  },
  jv = "svg",
  Vv = "math";
function at(e) {
  for (; Array.isArray(e); ) e = e[wt];
  return e;
}
function yf(e, t) {
  return at(t[e]);
}
function Be(e, t) {
  return at(t[e.index]);
}
function Df(e, t) {
  return e.data[t];
}
function Si(e, t) {
  return e[t];
}
function Gt(e, t) {
  let n = t[e];
  return Vt(n) ? n : n[wt];
}
function mc(e) {
  return (e[T] & 128) === 128;
}
function Uv(e) {
  return Et(e[De]);
}
function ei(e, t) {
  return t == null ? null : e[t];
}
function wf(e) {
  e[On] = 0;
}
function Ef(e) {
  e[T] & 1024 || ((e[T] |= 1024), mc(e) && _i(e));
}
function Bv(e, t) {
  for (; e > 0; ) (t = t[Zn]), e--;
  return t;
}
function Ti(e) {
  return !!(e[T] & 9216 || e[Le]?.dirty);
}
function Oa(e) {
  e[it].changeDetectionScheduler?.notify(8),
    e[T] & 64 && (e[T] |= 1024),
    Ti(e) && _i(e);
}
function _i(e) {
  e[it].changeDetectionScheduler?.notify(0);
  let t = un(e);
  for (; t !== null && !(t[T] & 8192 || ((t[T] |= 8192), !mc(t))); ) t = un(t);
}
function If(e, t) {
  if ((e[T] & 256) === 256) throw new I(911, !1);
  e[jt] === null && (e[jt] = []), e[jt].push(t);
}
function $v(e, t) {
  if (e[jt] === null) return;
  let n = e[jt].indexOf(t);
  n !== -1 && e[jt].splice(n, 1);
}
function un(e) {
  let t = e[De];
  return Et(t) ? t[De] : t;
}
var P = { lFrame: Pf(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var Cf = !1;
function Hv() {
  return P.lFrame.elementDepthCount;
}
function zv() {
  P.lFrame.elementDepthCount++;
}
function Gv() {
  P.lFrame.elementDepthCount--;
}
function bf() {
  return P.bindingsEnabled;
}
function qv() {
  return P.skipHydrationRootTNode !== null;
}
function Wv(e) {
  return P.skipHydrationRootTNode === e;
}
function Zv() {
  P.skipHydrationRootTNode = null;
}
function Z() {
  return P.lFrame.lView;
}
function ut() {
  return P.lFrame.tView;
}
function Mf(e) {
  return (P.lFrame.contextLView = e), e[Ze];
}
function Sf(e) {
  return (P.lFrame.contextLView = null), e;
}
function Re() {
  let e = Tf();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function Tf() {
  return P.lFrame.currentTNode;
}
function Yv() {
  let e = P.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function Nr(e, t) {
  let n = P.lFrame;
  (n.currentTNode = e), (n.isParent = t);
}
function _f() {
  return P.lFrame.isParent;
}
function Qv() {
  P.lFrame.isParent = !1;
}
function Kv() {
  return P.lFrame.contextLView;
}
function xf() {
  return Cf;
}
function ud(e) {
  Cf = e;
}
function vc() {
  let e = P.lFrame,
    t = e.bindingRootIndex;
  return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
}
function Jv() {
  return P.lFrame.bindingIndex;
}
function Xv(e) {
  return (P.lFrame.bindingIndex = e);
}
function yc() {
  return P.lFrame.bindingIndex++;
}
function Nf(e) {
  let t = P.lFrame,
    n = t.bindingIndex;
  return (t.bindingIndex = t.bindingIndex + e), n;
}
function ey() {
  return P.lFrame.inI18n;
}
function ty(e, t) {
  let n = P.lFrame;
  (n.bindingIndex = n.bindingRootIndex = e), Pa(t);
}
function ny() {
  return P.lFrame.currentDirectiveIndex;
}
function Pa(e) {
  P.lFrame.currentDirectiveIndex = e;
}
function ry(e) {
  let t = P.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function Af(e) {
  P.lFrame.currentQueryIndex = e;
}
function oy(e) {
  let t = e[F];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[Ye] : null;
}
function Rf(e, t, n) {
  if (n & O.SkipSelf) {
    let o = t,
      i = e;
    for (; (o = o.parent), o === null && !(n & O.Host); )
      if (((o = oy(i)), o === null || ((i = i[Zn]), o.type & 10))) break;
    if (o === null) return !1;
    (t = o), (e = i);
  }
  let r = (P.lFrame = Of());
  return (r.currentTNode = t), (r.lView = e), !0;
}
function Dc(e) {
  let t = Of(),
    n = e[F];
  (P.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = !1);
}
function Of() {
  let e = P.lFrame,
    t = e === null ? null : e.child;
  return t === null ? Pf(e) : t;
}
function Pf(e) {
  let t = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1,
  };
  return e !== null && (e.child = t), t;
}
function Ff() {
  let e = P.lFrame;
  return (P.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var kf = Ff;
function wc() {
  let e = Ff();
  (e.isParent = !0),
    (e.tView = null),
    (e.selectedIndex = -1),
    (e.contextLView = null),
    (e.elementDepthCount = 0),
    (e.currentDirectiveIndex = -1),
    (e.currentNamespace = null),
    (e.bindingRootIndex = -1),
    (e.bindingIndex = -1),
    (e.currentQueryIndex = 0);
}
function iy(e) {
  return (P.lFrame.contextLView = Bv(e, P.lFrame.contextLView))[Ze];
}
function gn() {
  return P.lFrame.selectedIndex;
}
function ln(e) {
  P.lFrame.selectedIndex = e;
}
function Lf() {
  let e = P.lFrame;
  return Df(e.tView, e.selectedIndex);
}
function sy() {
  return P.lFrame.currentNamespace;
}
var jf = !0;
function Ec() {
  return jf;
}
function Ic(e) {
  jf = e;
}
function ay(e, t, n) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    let s = gf(t);
    (n.preOrderHooks ??= []).push(e, s),
      (n.preOrderCheckHooks ??= []).push(e, s);
  }
  o && (n.preOrderHooks ??= []).push(0 - e, o),
    i &&
      ((n.preOrderHooks ??= []).push(e, i),
      (n.preOrderCheckHooks ??= []).push(e, i));
}
function Cc(e, t) {
  for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
    let i = e.data[n].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: c,
        ngAfterViewChecked: u,
        ngOnDestroy: l,
      } = i;
    s && (e.contentHooks ??= []).push(-n, s),
      a &&
        ((e.contentHooks ??= []).push(n, a),
        (e.contentCheckHooks ??= []).push(n, a)),
      c && (e.viewHooks ??= []).push(-n, c),
      u &&
        ((e.viewHooks ??= []).push(n, u), (e.viewCheckHooks ??= []).push(n, u)),
      l != null && (e.destroyHooks ??= []).push(n, l);
  }
}
function $o(e, t, n) {
  Vf(e, t, 3, n);
}
function Ho(e, t, n, r) {
  (e[T] & 3) === n && Vf(e, t, n, r);
}
function pa(e, t) {
  let n = e[T];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[T] = n));
}
function Vf(e, t, n, r) {
  let o = r !== void 0 ? e[On] & 65535 : 0,
    i = r ?? -1,
    s = t.length - 1,
    a = 0;
  for (let c = o; c < s; c++)
    if (typeof t[c + 1] == "number") {
      if (((a = t[c]), r != null && a >= r)) break;
    } else
      t[c] < 0 && (e[On] += 65536),
        (a < i || i == -1) &&
          (cy(e, n, t, c), (e[On] = (e[On] & 4294901760) + c + 2)),
        c++;
}
function ld(e, t) {
  nt(4, e, t);
  let n = U(null);
  try {
    t.call(e);
  } finally {
    U(n), nt(5, e, t);
  }
}
function cy(e, t, n, r) {
  let o = n[r] < 0,
    i = n[r + 1],
    s = o ? -n[r] : n[r],
    a = e[s];
  o
    ? e[T] >> 14 < e[On] >> 16 &&
      (e[T] & 3) === t &&
      ((e[T] += 16384), ld(a, i))
    : ld(a, i);
}
var Ln = -1,
  Ir = class {
    constructor(t, n, r) {
      (this.factory = t),
        (this.resolving = !1),
        (this.canSeeViewProviders = n),
        (this.injectImpl = r);
    }
  };
function uy(e) {
  return e instanceof Ir;
}
function ly(e) {
  return (e.flags & 8) !== 0;
}
function dy(e) {
  return (e.flags & 16) !== 0;
}
var ga = {},
  Fa = class {
    constructor(t, n) {
      (this.injector = t), (this.parentInjector = n);
    }
    get(t, n, r) {
      r = wi(r);
      let o = this.injector.get(t, ga, r);
      return o !== ga || n === ga ? o : this.parentInjector.get(t, n, r);
    }
  };
function Uf(e) {
  return e !== Ln;
}
function ti(e) {
  return e & 32767;
}
function fy(e) {
  return e >> 16;
}
function ni(e, t) {
  let n = fy(e),
    r = t;
  for (; n > 0; ) (r = r[Zn]), n--;
  return r;
}
var ka = !0;
function ri(e) {
  let t = ka;
  return (ka = e), t;
}
var hy = 256,
  Bf = hy - 1,
  $f = 5,
  py = 0,
  rt = {};
function gy(e, t, n) {
  let r;
  typeof n == "string"
    ? (r = n.charCodeAt(0) || 0)
    : n.hasOwnProperty(mr) && (r = n[mr]),
    r == null && (r = n[mr] = py++);
  let o = r & Bf,
    i = 1 << o;
  t.data[e + (o >> $f)] |= i;
}
function Hf(e, t) {
  let n = zf(e, t);
  if (n !== -1) return n;
  let r = t[F];
  r.firstCreatePass &&
    ((e.injectorIndex = t.length),
    ma(r.data, e),
    ma(t, null),
    ma(r.blueprint, null));
  let o = bc(e, t),
    i = e.injectorIndex;
  if (Uf(o)) {
    let s = ti(o),
      a = ni(o, t),
      c = a[F].data;
    for (let u = 0; u < 8; u++) t[i + u] = a[s + u] | c[s + u];
  }
  return (t[i + 8] = o), i;
}
function ma(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function zf(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function bc(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    r = null,
    o = t;
  for (; o !== null; ) {
    if (((r = Yf(o)), r === null)) return Ln;
    if ((n++, (o = o[Zn]), r.injectorIndex !== -1))
      return r.injectorIndex | (n << 16);
  }
  return Ln;
}
function my(e, t, n) {
  gy(e, t, n);
}
function vy(e, t) {
  if (t === "class") return e.classes;
  if (t === "style") return e.styles;
  let n = e.attrs;
  if (n) {
    let r = n.length,
      o = 0;
    for (; o < r; ) {
      let i = n[o];
      if (Jd(i)) break;
      if (i === 0) o = o + 2;
      else if (typeof i == "number")
        for (o++; o < r && typeof n[o] == "string"; ) o++;
      else {
        if (i === t) return n[o + 1];
        o = o + 2;
      }
    }
  }
  return null;
}
function Gf(e, t, n) {
  if (n & O.Optional || e !== void 0) return e;
  cc(t, "NodeInjector");
}
function qf(e, t, n, r) {
  if (
    (n & O.Optional && r === void 0 && (r = null), !(n & (O.Self | O.Host)))
  ) {
    let o = e[Un],
      i = Te(void 0);
    try {
      return o ? o.get(t, r, n & O.Optional) : qd(t, r, n & O.Optional);
    } finally {
      Te(i);
    }
  }
  return Gf(r, t, n);
}
function Wf(e, t, n, r = O.Default, o) {
  if (e !== null) {
    if (t[T] & 2048 && !(r & O.Self)) {
      let s = Iy(e, t, n, r, rt);
      if (s !== rt) return s;
    }
    let i = Zf(e, t, n, r, rt);
    if (i !== rt) return i;
  }
  return qf(t, n, r, o);
}
function Zf(e, t, n, r, o) {
  let i = wy(n);
  if (typeof i == "function") {
    if (!Rf(t, e, r)) return r & O.Host ? Gf(o, n, r) : qf(t, n, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & O.Optional))) cc(n);
      else return s;
    } finally {
      kf();
    }
  } else if (typeof i == "number") {
    let s = null,
      a = zf(e, t),
      c = Ln,
      u = r & O.Host ? t[st][Ye] : null;
    for (
      (a === -1 || r & O.SkipSelf) &&
      ((c = a === -1 ? bc(e, t) : t[a + 8]),
      c === Ln || !fd(r, !1)
        ? (a = -1)
        : ((s = t[F]), (a = ti(c)), (t = ni(c, t))));
      a !== -1;

    ) {
      let l = t[F];
      if (dd(i, a, l.data)) {
        let d = yy(a, t, n, s, r, u);
        if (d !== rt) return d;
      }
      (c = t[a + 8]),
        c !== Ln && fd(r, t[F].data[a + 8] === u) && dd(i, a, t)
          ? ((s = l), (a = ti(c)), (t = ni(c, t)))
          : (a = -1);
    }
  }
  return o;
}
function yy(e, t, n, r, o, i) {
  let s = t[F],
    a = s.data[e + 8],
    c = r == null ? Mi(a) && ka : r != s && (a.type & 3) !== 0,
    u = o & O.Host && i === a,
    l = Dy(a, s, n, c, u);
  return l !== null ? Cr(t, s, l, a) : rt;
}
function Dy(e, t, n, r, o) {
  let i = e.providerIndexes,
    s = t.data,
    a = i & 1048575,
    c = e.directiveStart,
    u = e.directiveEnd,
    l = i >> 20,
    d = r ? a : a + l,
    h = o ? a + l : u;
  for (let f = d; f < h; f++) {
    let g = s[f];
    if ((f < c && n === g) || (f >= c && g.type === n)) return f;
  }
  if (o) {
    let f = s[c];
    if (f && _r(f) && f.type === n) return c;
  }
  return null;
}
function Cr(e, t, n, r) {
  let o = e[n],
    i = t.data;
  if (uy(o)) {
    let s = o;
    s.resolving && Wm(qm(i[n]));
    let a = ri(s.canSeeViewProviders);
    s.resolving = !0;
    let c,
      u = s.injectImpl ? Te(s.injectImpl) : null,
      l = Rf(e, r, O.Default);
    try {
      (o = e[n] = s.factory(void 0, i, e, r)),
        t.firstCreatePass && n >= r.directiveStart && ay(n, i[n], t);
    } finally {
      u !== null && Te(u), ri(a), (s.resolving = !1), kf();
    }
  }
  return o;
}
function wy(e) {
  if (typeof e == "string") return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(mr) ? e[mr] : void 0;
  return typeof t == "number" ? (t >= 0 ? t & Bf : Ey) : t;
}
function dd(e, t, n) {
  let r = 1 << e;
  return !!(n[t + (e >> $f)] & r);
}
function fd(e, t) {
  return !(e & O.Self) && !(e & O.Host && t);
}
var sn = class {
  constructor(t, n) {
    (this._tNode = t), (this._lView = n);
  }
  get(t, n, r) {
    return Wf(this._tNode, this._lView, t, wi(r), n);
  }
};
function Ey() {
  return new sn(Re(), Z());
}
function Mc(e) {
  return Sr(() => {
    let t = e.prototype.constructor,
      n = t[Go] || La(t),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[Go] || La(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function La(e) {
  return Ud(e)
    ? () => {
        let t = La(ke(e));
        return t && t();
      }
    : an(e);
}
function Iy(e, t, n, r, o) {
  let i = e,
    s = t;
  for (; i !== null && s !== null && s[T] & 2048 && !(s[T] & 512); ) {
    let a = Zf(i, s, n, r | O.Self, rt);
    if (a !== rt) return a;
    let c = i.parent;
    if (!c) {
      let u = s[df];
      if (u) {
        let l = u.get(n, rt, r);
        if (l !== rt) return l;
      }
      (c = Yf(s)), (s = s[Zn]);
    }
    i = c;
  }
  return o;
}
function Yf(e) {
  let t = e[F],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[Ye] : null;
}
function Sc(e) {
  return vy(Re(), e);
}
function hd(e, t = null, n = null, r) {
  let o = Qf(e, t, n, r);
  return o.resolveInjectorInitializers(), o;
}
function Qf(e, t = null, n = null, r, o = new Set()) {
  let i = [n || qe, Ev(e)];
  return (
    (r = r || (typeof e == "object" ? void 0 : ve(e))),
    new wr(i, t || pc(), r || null, o)
  );
}
var Ve = class e {
  static {
    this.THROW_IF_NOT_FOUND = yr;
  }
  static {
    this.NULL = new Zo();
  }
  static create(t, n) {
    if (Array.isArray(t)) return hd({ name: "" }, n, t, "");
    {
      let r = t.name ?? "";
      return hd({ name: r }, t.parent, t.providers, r);
    }
  }
  static {
    this.ɵprov = C({ token: e, providedIn: "any", factory: () => b(Yd) });
  }
  static {
    this.__NG_ELEMENT_ID__ = -1;
  }
};
var Cy = new w("");
Cy.__NG_ELEMENT_ID__ = (e) => {
  let t = Re();
  if (t === null) throw new I(204, !1);
  if (t.type & 2) return t.value;
  if (e & O.Optional) return null;
  throw new I(204, !1);
};
var by = "ngOriginalError";
function va(e) {
  return e[by];
}
var Kf = !0,
  Tc = (() => {
    class e {
      static {
        this.__NG_ELEMENT_ID__ = My;
      }
      static {
        this.__NG_ENV_ID__ = (n) => n;
      }
    }
    return e;
  })(),
  ja = class extends Tc {
    constructor(t) {
      super(), (this._lView = t);
    }
    onDestroy(t) {
      return If(this._lView, t), () => $v(this._lView, t);
    }
  };
function My() {
  return new ja(Z());
}
var It = (() => {
  class e {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new le(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let n = this.taskId++;
      return this.pendingTasks.add(n), n;
    }
    remove(n) {
      this.pendingTasks.delete(n),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
    static {
      this.ɵprov = C({ token: e, providedIn: "root", factory: () => new e() });
    }
  }
  return e;
})();
var Va = class extends he {
    constructor(t = !1) {
      super(),
        (this.destroyRef = void 0),
        (this.pendingTasks = void 0),
        (this.__isAsync = t),
        lf() &&
          ((this.destroyRef = p(Tc, { optional: !0 }) ?? void 0),
          (this.pendingTasks = p(It, { optional: !0 }) ?? void 0));
    }
    emit(t) {
      let n = U(null);
      try {
        super.next(t);
      } finally {
        U(n);
      }
    }
    subscribe(t, n, r) {
      let o = t,
        i = n || (() => null),
        s = r;
      if (t && typeof t == "object") {
        let c = t;
        (o = c.next?.bind(c)),
          (i = c.error?.bind(c)),
          (s = c.complete?.bind(c));
      }
      this.__isAsync &&
        ((i = this.wrapInTimeout(i)),
        o && (o = this.wrapInTimeout(o)),
        s && (s = this.wrapInTimeout(s)));
      let a = super.subscribe({ next: o, error: i, complete: s });
      return t instanceof ne && t.add(a), a;
    }
    wrapInTimeout(t) {
      return (n) => {
        let r = this.pendingTasks?.add();
        setTimeout(() => {
          t(n), r !== void 0 && this.pendingTasks?.remove(r);
        });
      };
    }
  },
  me = Va;
function oi(...e) {}
function Jf(e) {
  let t, n;
  function r() {
    e = oi;
    try {
      n !== void 0 &&
        typeof cancelAnimationFrame == "function" &&
        cancelAnimationFrame(n),
        t !== void 0 && clearTimeout(t);
    } catch {}
  }
  return (
    (t = setTimeout(() => {
      e(), r();
    })),
    typeof requestAnimationFrame == "function" &&
      (n = requestAnimationFrame(() => {
        e(), r();
      })),
    () => r()
  );
}
function pd(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = oi;
    }
  );
}
var _c = "isAngularZone",
  ii = _c + "_ID",
  Sy = 0,
  q = class e {
    constructor(t) {
      (this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new me(!1)),
        (this.onMicrotaskEmpty = new me(!1)),
        (this.onStable = new me(!1)),
        (this.onError = new me(!1));
      let {
        enableLongStackTrace: n = !1,
        shouldCoalesceEventChangeDetection: r = !1,
        shouldCoalesceRunChangeDetection: o = !1,
        scheduleInRootZone: i = Kf,
      } = t;
      if (typeof Zone > "u") throw new I(908, !1);
      Zone.assertZonePatched();
      let s = this;
      (s._nesting = 0),
        (s._outer = s._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
        n &&
          Zone.longStackTraceZoneSpec &&
          (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
        (s.shouldCoalesceEventChangeDetection = !o && r),
        (s.shouldCoalesceRunChangeDetection = o),
        (s.callbackScheduled = !1),
        (s.scheduleInRootZone = i),
        xy(s);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get(_c) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new I(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new I(909, !1);
    }
    run(t, n, r) {
      return this._inner.run(t, n, r);
    }
    runTask(t, n, r, o) {
      let i = this._inner,
        s = i.scheduleEventTask("NgZoneEvent: " + o, t, Ty, oi, oi);
      try {
        return i.runTask(s, n, r);
      } finally {
        i.cancelTask(s);
      }
    }
    runGuarded(t, n, r) {
      return this._inner.runGuarded(t, n, r);
    }
    runOutsideAngular(t) {
      return this._outer.run(t);
    }
  },
  Ty = {};
function xc(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if ((e._nesting--, !e.hasPendingMicrotasks))
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
function _y(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = !0;
  function t() {
    Jf(() => {
      (e.callbackScheduled = !1),
        Ua(e),
        (e.isCheckStableRunning = !0),
        xc(e),
        (e.isCheckStableRunning = !1);
    });
  }
  e.scheduleInRootZone
    ? Zone.root.run(() => {
        t();
      })
    : e._outer.run(() => {
        t();
      }),
    Ua(e);
}
function xy(e) {
  let t = () => {
      _y(e);
    },
    n = Sy++;
  e._inner = e._inner.fork({
    name: "angular",
    properties: { [_c]: !0, [ii]: n, [ii + n]: !0 },
    onInvokeTask: (r, o, i, s, a, c) => {
      if (Ny(c)) return r.invokeTask(i, s, a, c);
      try {
        return gd(e), r.invokeTask(i, s, a, c);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === "eventTask") ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          md(e);
      }
    },
    onInvoke: (r, o, i, s, a, c, u) => {
      try {
        return gd(e), r.invoke(i, s, a, c, u);
      } finally {
        e.shouldCoalesceRunChangeDetection &&
          !e.callbackScheduled &&
          !Ay(c) &&
          t(),
          md(e);
      }
    },
    onHasTask: (r, o, i, s) => {
      r.hasTask(i, s),
        o === i &&
          (s.change == "microTask"
            ? ((e._hasPendingMicrotasks = s.microTask), Ua(e), xc(e))
            : s.change == "macroTask" &&
              (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (r, o, i, s) => (
      r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function Ua(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection ||
    e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function gd(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function md(e) {
  e._nesting--, xc(e);
}
var si = class {
  constructor() {
    (this.hasPendingMicrotasks = !1),
      (this.hasPendingMacrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new me()),
      (this.onMicrotaskEmpty = new me()),
      (this.onStable = new me()),
      (this.onError = new me());
  }
  run(t, n, r) {
    return t.apply(n, r);
  }
  runGuarded(t, n, r) {
    return t.apply(n, r);
  }
  runOutsideAngular(t) {
    return t();
  }
  runTask(t, n, r, o) {
    return t.apply(n, r);
  }
};
function Ny(e) {
  return Xf(e, "__ignore_ng_zone__");
}
function Ay(e) {
  return Xf(e, "__scheduler_tick__");
}
function Xf(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
}
function Ry(e = "zone.js", t) {
  return e === "noop" ? new si() : e === "zone.js" ? new q(t) : e;
}
var yt = class {
    constructor() {
      this._console = console;
    }
    handleError(t) {
      let n = this._findOriginalError(t);
      this._console.error("ERROR", t),
        n && this._console.error("ORIGINAL ERROR", n);
    }
    _findOriginalError(t) {
      let n = t && va(t);
      for (; n && va(n); ) n = va(n);
      return n || null;
    }
  },
  Oy = new w("", {
    providedIn: "root",
    factory: () => {
      let e = p(q),
        t = p(yt);
      return (n) => e.runOutsideAngular(() => t.handleError(n));
    },
  });
function Py() {
  return xi(Re(), Z());
}
function xi(e, t) {
  return new Yn(Be(e, t));
}
var Yn = (() => {
  class e {
    constructor(n) {
      this.nativeElement = n;
    }
    static {
      this.__NG_ELEMENT_ID__ = Py;
    }
  }
  return e;
})();
function eh(e) {
  return (e.flags & 128) === 128;
}
var th = new Map(),
  Fy = 0;
function ky() {
  return Fy++;
}
function Ly(e) {
  th.set(e[bi], e);
}
function Ba(e) {
  th.delete(e[bi]);
}
var vd = "__ngContext__";
function dn(e, t) {
  Vt(t) ? ((e[vd] = t[bi]), Ly(t)) : (e[vd] = t);
}
function nh(e) {
  return oh(e[Er]);
}
function rh(e) {
  return oh(e[We]);
}
function oh(e) {
  for (; e !== null && !Et(e); ) e = e[We];
  return e;
}
var $a;
function ih(e) {
  $a = e;
}
function jy() {
  if ($a !== void 0) return $a;
  if (typeof document < "u") return document;
  throw new I(210, !1);
}
var Ni = new w("", { providedIn: "root", factory: () => Vy }),
  Vy = "ng",
  Nc = new w(""),
  lt = new w("", { providedIn: "platform", factory: () => "unknown" });
var Ac = new w("", {
  providedIn: "root",
  factory: () =>
    jy().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
    null,
});
var Uy = "h",
  By = "b";
var $y = () => null;
function Rc(e, t, n = !1) {
  return $y(e, t, n);
}
var sh = !1,
  Hy = new w("", { providedIn: "root", factory: () => sh });
var Lo;
function zy() {
  if (Lo === void 0 && ((Lo = null), ge.trustedTypes))
    try {
      Lo = ge.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return Lo;
}
function yd(e) {
  return zy()?.createScriptURL(e) || e;
}
var ai = class {
  constructor(t) {
    this.changingThisBreaksApplicationSecurity = t;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ld})`;
  }
};
function Ar(e) {
  return e instanceof ai ? e.changingThisBreaksApplicationSecurity : e;
}
function Oc(e, t) {
  let n = Gy(e);
  if (n != null && n !== t) {
    if (n === "ResourceURL" && t === "URL") return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${Ld})`);
  }
  return n === t;
}
function Gy(e) {
  return (e instanceof ai && e.getTypeName()) || null;
}
var qy = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function ah(e) {
  return (e = String(e)), e.match(qy) ? e : "unsafe:" + e;
}
var Ai = (function (e) {
  return (
    (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HTML = 1)] = "HTML"),
    (e[(e.STYLE = 2)] = "STYLE"),
    (e[(e.SCRIPT = 3)] = "SCRIPT"),
    (e[(e.URL = 4)] = "URL"),
    (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    e
  );
})(Ai || {});
function Wy(e) {
  let t = uh();
  return t ? t.sanitize(Ai.URL, e) || "" : Oc(e, "URL") ? Ar(e) : ah(jn(e));
}
function Zy(e) {
  let t = uh();
  if (t) return yd(t.sanitize(Ai.RESOURCE_URL, e) || "");
  if (Oc(e, "ResourceURL")) return yd(Ar(e));
  throw new I(904, !1);
}
function Yy(e, t) {
  return (t === "src" &&
    (e === "embed" ||
      e === "frame" ||
      e === "iframe" ||
      e === "media" ||
      e === "script")) ||
    (t === "href" && (e === "base" || e === "link"))
    ? Zy
    : Wy;
}
function ch(e, t, n) {
  return Yy(t, n)(e);
}
function uh() {
  let e = Z();
  return e && e[it].sanitizer;
}
function lh(e) {
  return e instanceof Function ? e() : e;
}
function Qy(e) {
  return (e ?? p(Ve)).get(lt) === "browser";
}
var Dt = (function (e) {
    return (
      (e[(e.Important = 1)] = "Important"),
      (e[(e.DashCase = 2)] = "DashCase"),
      e
    );
  })(Dt || {}),
  Ky;
function Pc(e, t) {
  return Ky(e, t);
}
function Pn(e, t, n, r, o) {
  if (r != null) {
    let i,
      s = !1;
    Et(r) ? (i = r) : Vt(r) && ((s = !0), (r = r[wt]));
    let a = at(r);
    e === 0 && n !== null
      ? o == null
        ? gh(t, n, a)
        : ci(t, n, a, o || null, !0)
      : e === 1 && n !== null
      ? ci(t, n, a, o || null, !0)
      : e === 2
      ? fD(t, a, s)
      : e === 3 && t.destroyNode(a),
      i != null && pD(t, e, i, n, o);
  }
}
function Jy(e, t) {
  return e.createText(t);
}
function Xy(e, t, n) {
  e.setValue(t, n);
}
function dh(e, t, n) {
  return e.createElement(t, n);
}
function eD(e, t) {
  fh(e, t), (t[wt] = null), (t[Ye] = null);
}
function tD(e, t, n, r, o, i) {
  (r[wt] = o), (r[Ye] = t), Ri(e, r, n, 1, o, i);
}
function fh(e, t) {
  t[it].changeDetectionScheduler?.notify(9), Ri(e, t, t[de], 2, null, null);
}
function nD(e) {
  let t = e[Er];
  if (!t) return ya(e[F], e);
  for (; t; ) {
    let n = null;
    if (Vt(t)) n = t[Er];
    else {
      let r = t[je];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[We] && t !== e; ) Vt(t) && ya(t[F], t), (t = t[De]);
      t === null && (t = e), Vt(t) && ya(t[F], t), (n = t && t[We]);
    }
    t = n;
  }
}
function rD(e, t, n, r) {
  let o = je + r,
    i = n.length;
  r > 0 && (n[o - 1][We] = t),
    r < i - je
      ? ((t[We] = n[o]), Zd(n, je + r, t))
      : (n.push(t), (t[We] = null)),
    (t[De] = n);
  let s = t[Bn];
  s !== null && n !== s && hh(s, t);
  let a = t[$n];
  a !== null && a.insertView(e), Oa(t), (t[T] |= 128);
}
function hh(e, t) {
  let n = e[Jo],
    r = t[De];
  if (Vt(r)) e[T] |= Xo.HasTransplantedViews;
  else {
    let o = r[De][st];
    t[st] !== o && (e[T] |= Xo.HasTransplantedViews);
  }
  n === null ? (e[Jo] = [t]) : n.push(t);
}
function Fc(e, t) {
  let n = e[Jo],
    r = n.indexOf(t);
  n.splice(r, 1);
}
function Ha(e, t) {
  if (e.length <= je) return;
  let n = je + t,
    r = e[n];
  if (r) {
    let o = r[Bn];
    o !== null && o !== e && Fc(o, r), t > 0 && (e[n - 1][We] = r[We]);
    let i = Wo(e, je + t);
    eD(r[F], r);
    let s = i[$n];
    s !== null && s.detachView(i[F]),
      (r[De] = null),
      (r[We] = null),
      (r[T] &= -129);
  }
  return r;
}
function ph(e, t) {
  if (!(t[T] & 256)) {
    let n = t[de];
    n.destroyNode && Ri(e, t, n, 3, null, null), nD(t);
  }
}
function ya(e, t) {
  if (t[T] & 256) return;
  let n = U(null);
  try {
    (t[T] &= -129),
      (t[T] |= 256),
      t[Le] && qs(t[Le]),
      iD(e, t),
      oD(e, t),
      t[F].type === 1 && t[de].destroy();
    let r = t[Bn];
    if (r !== null && Et(t[De])) {
      r !== t[De] && Fc(r, t);
      let o = t[$n];
      o !== null && o.detachView(e);
    }
    Ba(t);
  } finally {
    U(n);
  }
}
function oD(e, t) {
  let n = e.cleanup,
    r = t[Qo];
  if (n !== null)
    for (let i = 0; i < n.length - 1; i += 2)
      if (typeof n[i] == "string") {
        let s = n[i + 3];
        s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
      } else {
        let s = r[n[i + 1]];
        n[i].call(s);
      }
  r !== null && (t[Qo] = null);
  let o = t[jt];
  if (o !== null) {
    t[jt] = null;
    for (let i = 0; i < o.length; i++) {
      let s = o[i];
      s();
    }
  }
}
function iD(e, t) {
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      let o = t[n[r]];
      if (!(o instanceof Ir)) {
        let i = n[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              c = i[s + 1];
            nt(4, a, c);
            try {
              c.call(a);
            } finally {
              nt(5, a, c);
            }
          }
        else {
          nt(4, o, i);
          try {
            i.call(o);
          } finally {
            nt(5, o, i);
          }
        }
      }
    }
}
function sD(e, t, n) {
  return aD(e, t.parent, n);
}
function aD(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 168; ) (t = r), (r = t.parent);
  if (r === null) return n[wt];
  {
    let { componentOffset: o } = r;
    if (o > -1) {
      let { encapsulation: i } = e.data[r.directiveStart + o];
      if (i === ot.None || i === ot.Emulated) return null;
    }
    return Be(r, n);
  }
}
function ci(e, t, n, r, o) {
  e.insertBefore(t, n, r, o);
}
function gh(e, t, n) {
  e.appendChild(t, n);
}
function Dd(e, t, n, r, o) {
  r !== null ? ci(e, t, n, r, o) : gh(e, t, n);
}
function mh(e, t) {
  return e.parentNode(t);
}
function cD(e, t) {
  return e.nextSibling(t);
}
function uD(e, t, n) {
  return dD(e, t, n);
}
function lD(e, t, n) {
  return e.type & 40 ? Be(e, n) : null;
}
var dD = lD,
  wd;
function kc(e, t, n, r) {
  let o = sD(e, r, t),
    i = t[de],
    s = r.parent || t[Ye],
    a = uD(s, r, t);
  if (o != null)
    if (Array.isArray(n))
      for (let c = 0; c < n.length; c++) Dd(i, o, n[c], a, !1);
    else Dd(i, o, n, a, !1);
  wd !== void 0 && wd(i, r, t, n, o);
}
function gr(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return Be(t, e);
    if (n & 4) return za(-1, e[t.index]);
    if (n & 8) {
      let r = t.child;
      if (r !== null) return gr(e, r);
      {
        let o = e[t.index];
        return Et(o) ? za(-1, o) : at(o);
      }
    } else {
      if (n & 128) return gr(e, t.next);
      if (n & 32) return Pc(t, e)() || at(e[t.index]);
      {
        let r = vh(e, t);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = un(e[st]);
          return gr(o, r);
        } else return gr(e, t.next);
      }
    }
  }
  return null;
}
function vh(e, t) {
  if (t !== null) {
    let r = e[st][Ye],
      o = t.projection;
    return r.projection[o];
  }
  return null;
}
function za(e, t) {
  let n = je + e + 1;
  if (n < t.length) {
    let r = t[n],
      o = r[F].firstChild;
    if (o !== null) return gr(r, o);
  }
  return t[cn];
}
function fD(e, t, n) {
  e.removeChild(null, t, n);
}
function Lc(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    if (n.type === 128) {
      n = n.next;
      continue;
    }
    let a = r[n.index],
      c = n.type;
    if (
      (s && t === 0 && (a && dn(at(a), r), (n.flags |= 2)),
      (n.flags & 32) !== 32)
    )
      if (c & 8) Lc(e, t, n.child, r, o, i, !1), Pn(t, e, o, a, i);
      else if (c & 32) {
        let u = Pc(n, r),
          l;
        for (; (l = u()); ) Pn(t, e, o, l, i);
        Pn(t, e, o, a, i);
      } else c & 16 ? hD(e, t, r, n, o, i) : Pn(t, e, o, a, i);
    n = s ? n.projectionNext : n.next;
  }
}
function Ri(e, t, n, r, o, i) {
  Lc(n, r, e.firstChild, t, o, i, !1);
}
function hD(e, t, n, r, o, i) {
  let s = n[st],
    c = s[Ye].projection[r.projection];
  if (Array.isArray(c))
    for (let u = 0; u < c.length; u++) {
      let l = c[u];
      Pn(t, e, o, l, i);
    }
  else {
    let u = c,
      l = s[De];
    eh(r) && (u.flags |= 128), Lc(e, t, u, l, o, i, !0);
  }
}
function pD(e, t, n, r, o) {
  let i = n[cn],
    s = at(n);
  i !== s && Pn(t, e, r, i, o);
  for (let a = je; a < n.length; a++) {
    let c = n[a];
    Ri(c[F], c, e, t, r, i);
  }
}
function gD(e, t, n, r, o) {
  if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
  else {
    let i = r.indexOf("-") === -1 ? void 0 : Dt.DashCase;
    o == null
      ? e.removeStyle(n, r, i)
      : (typeof o == "string" &&
          o.endsWith("!important") &&
          ((o = o.slice(0, -10)), (i |= Dt.Important)),
        e.setStyle(n, r, o, i));
  }
}
function mD(e, t, n) {
  e.setAttribute(t, "style", n);
}
function yh(e, t, n) {
  n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n);
}
function Dh(e, t, n) {
  let { mergedAttrs: r, classes: o, styles: i } = n;
  r !== null && Sa(e, t, r),
    o !== null && yh(e, t, o),
    i !== null && mD(e, t, i);
}
var Ct = {};
function A(e = 1) {
  wh(ut(), Z(), gn() + e, !1);
}
function wh(e, t, n, r) {
  if (!r)
    if ((t[T] & 3) === 3) {
      let i = e.preOrderCheckHooks;
      i !== null && $o(t, i, n);
    } else {
      let i = e.preOrderHooks;
      i !== null && Ho(t, i, 0, n);
    }
  ln(n);
}
function H(e, t = O.Default) {
  let n = Z();
  if (n === null) return b(e, t);
  let r = Re();
  return Wf(r, n, ke(e), t);
}
function Eh() {
  let e = "invalid";
  throw new Error(e);
}
function Ih(e, t, n, r, o, i) {
  let s = U(null);
  try {
    let a = null;
    o & Ut.SignalBased && (a = t[r][Dl]),
      a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)),
      o & Ut.HasDecoratorInputTransform &&
        (i = e.inputTransforms[r].call(t, i)),
      e.setInput !== null ? e.setInput(t, a, i, n, r) : pf(t, a, r, i);
  } finally {
    U(s);
  }
}
function vD(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (o < 0) ln(~o);
        else {
          let i = o,
            s = n[++r],
            a = n[++r];
          ty(s, i);
          let c = t[i];
          a(2, c);
        }
      }
    } finally {
      ln(-1);
    }
}
function Oi(e, t, n, r, o, i, s, a, c, u, l) {
  let d = t.blueprint.slice();
  return (
    (d[wt] = o),
    (d[T] = r | 4 | 128 | 8 | 64),
    (u !== null || (e && e[T] & 2048)) && (d[T] |= 2048),
    wf(d),
    (d[De] = d[Zn] = e),
    (d[Ze] = n),
    (d[it] = s || (e && e[it])),
    (d[de] = a || (e && e[de])),
    (d[Un] = c || (e && e[Un]) || null),
    (d[Ye] = i),
    (d[bi] = ky()),
    (d[Yo] = l),
    (d[df] = u),
    (d[st] = t.type == 2 ? e[st] : d),
    d
  );
}
function Pi(e, t, n, r, o) {
  let i = e.data[t];
  if (i === null) (i = yD(e, t, n, r, o)), ey() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = n), (i.value = r), (i.attrs = o);
    let s = Yv();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return Nr(i, !0), i;
}
function yD(e, t, n, r, o) {
  let i = Tf(),
    s = _f(),
    a = s ? i : i && i.parent,
    c = (e.data[t] = CD(e, a, n, t, r, o));
  return (
    e.firstChild === null && (e.firstChild = c),
    i !== null &&
      (s
        ? i.child == null && c.parent !== null && (i.child = c)
        : i.next === null && ((i.next = c), (c.prev = i))),
    c
  );
}
function Ch(e, t, n, r) {
  if (n === 0) return -1;
  let o = t.length;
  for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
function bh(e, t, n, r, o) {
  let i = gn(),
    s = r & 2;
  try {
    ln(-1), s && t.length > Ae && wh(e, t, Ae, !1), nt(s ? 2 : 0, o), n(r, o);
  } finally {
    ln(i), nt(s ? 3 : 1, o);
  }
}
function Mh(e, t, n) {
  if (hf(t)) {
    let r = U(null);
    try {
      let o = t.directiveStart,
        i = t.directiveEnd;
      for (let s = o; s < i; s++) {
        let a = e.data[s];
        if (a.contentQueries) {
          let c = n[s];
          a.contentQueries(1, c, s);
        }
      }
    } finally {
      U(r);
    }
  }
}
function Sh(e, t, n) {
  bf() && (ND(e, t, n, Be(n, t)), (n.flags & 64) === 64 && Ah(e, t, n));
}
function Th(e, t, n = Be) {
  let r = t.localNames;
  if (r !== null) {
    let o = t.index + 1;
    for (let i = 0; i < r.length; i += 2) {
      let s = r[i + 1],
        a = s === -1 ? n(t, e) : e[s];
      e[o++] = a;
    }
  }
}
function _h(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = jc(
        1,
        null,
        e.template,
        e.decls,
        e.vars,
        e.directiveDefs,
        e.pipeDefs,
        e.viewQuery,
        e.schemas,
        e.consts,
        e.id
      ))
    : t;
}
function jc(e, t, n, r, o, i, s, a, c, u, l) {
  let d = Ae + r,
    h = d + o,
    f = DD(d, h),
    g = typeof u == "function" ? u() : u;
  return (f[F] = {
    type: e,
    blueprint: f,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: t,
    data: f.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: h,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == "function" ? i() : i,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: c,
    consts: g,
    incompleteFirstPass: !1,
    ssrId: l,
  });
}
function DD(e, t) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(r < e ? null : Ct);
  return n;
}
function wD(e, t, n, r) {
  let i = r.get(Hy, sh) || n === ot.ShadowDom,
    s = e.selectRootElement(t, i);
  return ED(s), s;
}
function ED(e) {
  ID(e);
}
var ID = () => null;
function CD(e, t, n, r, o, i) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    qv() && (a |= 128),
    {
      type: n,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: o,
      attrs: i,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: t,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function Ed(e, t, n, r, o) {
  for (let i in t) {
    if (!t.hasOwnProperty(i)) continue;
    let s = t[i];
    if (s === void 0) continue;
    r ??= {};
    let a,
      c = Ut.None;
    Array.isArray(s) ? ((a = s[0]), (c = s[1])) : (a = s);
    let u = i;
    if (o !== null) {
      if (!o.hasOwnProperty(i)) continue;
      u = o[i];
    }
    e === 0 ? Id(r, n, u, a, c) : Id(r, n, u, a);
  }
  return r;
}
function Id(e, t, n, r, o) {
  let i;
  e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : (i = e[n] = [t, r]),
    o !== void 0 && i.push(o);
}
function bD(e, t, n) {
  let r = t.directiveStart,
    o = t.directiveEnd,
    i = e.data,
    s = t.attrs,
    a = [],
    c = null,
    u = null;
  for (let l = r; l < o; l++) {
    let d = i[l],
      h = n ? n.get(d) : null,
      f = h ? h.inputs : null,
      g = h ? h.outputs : null;
    (c = Ed(0, d.inputs, l, c, f)), (u = Ed(1, d.outputs, l, u, g));
    let y = c !== null && s !== null && !fc(t) ? BD(c, l, s) : null;
    a.push(y);
  }
  c !== null &&
    (c.hasOwnProperty("class") && (t.flags |= 8),
    c.hasOwnProperty("style") && (t.flags |= 16)),
    (t.initialInputs = a),
    (t.inputs = c),
    (t.outputs = u);
}
function MD(e) {
  return e === "class"
    ? "className"
    : e === "for"
    ? "htmlFor"
    : e === "formaction"
    ? "formAction"
    : e === "innerHtml"
    ? "innerHTML"
    : e === "readonly"
    ? "readOnly"
    : e === "tabindex"
    ? "tabIndex"
    : e;
}
function SD(e, t, n, r, o, i, s, a) {
  let c = Be(t, n),
    u = t.inputs,
    l;
  !a && u != null && (l = u[r])
    ? (Vc(e, n, l, r, o), Mi(t) && TD(n, t.index))
    : t.type & 3
    ? ((r = MD(r)),
      (o = s != null ? s(o, t.value || "", r) : o),
      i.setProperty(c, r, o))
    : t.type & 12;
}
function TD(e, t) {
  let n = Gt(t, e);
  n[T] & 16 || (n[T] |= 64);
}
function xh(e, t, n, r) {
  if (bf()) {
    let o = r === null ? null : { "": -1 },
      i = RD(e, n),
      s,
      a;
    i === null ? (s = a = null) : ([s, a] = i),
      s !== null && Nh(e, t, n, s, o, a),
      o && OD(n, r, o);
  }
  n.mergedAttrs = dc(n.mergedAttrs, n.attrs);
}
function Nh(e, t, n, r, o, i) {
  for (let u = 0; u < r.length; u++) my(Hf(n, t), e, r[u].type);
  FD(n, e.data.length, r.length);
  for (let u = 0; u < r.length; u++) {
    let l = r[u];
    l.providersResolver && l.providersResolver(l);
  }
  let s = !1,
    a = !1,
    c = Ch(e, t, r.length, null);
  for (let u = 0; u < r.length; u++) {
    let l = r[u];
    (n.mergedAttrs = dc(n.mergedAttrs, l.hostAttrs)),
      kD(e, n, t, c, l),
      PD(c, l, o),
      l.contentQueries !== null && (n.flags |= 4),
      (l.hostBindings !== null || l.hostAttrs !== null || l.hostVars !== 0) &&
        (n.flags |= 64);
    let d = l.type.prototype;
    !s &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
      c++;
  }
  bD(e, n, i);
}
function _D(e, t, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    xD(s) != a && s.push(a), s.push(n, r, i);
  }
}
function xD(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == "number" && n < 0) return n;
  }
  return 0;
}
function ND(e, t, n, r) {
  let o = n.directiveStart,
    i = n.directiveEnd;
  Mi(n) && LD(t, n, e.data[o + n.componentOffset]),
    e.firstCreatePass || Hf(n, t),
    dn(r, t);
  let s = n.initialInputs;
  for (let a = o; a < i; a++) {
    let c = e.data[a],
      u = Cr(t, e, a, n);
    if ((dn(u, t), s !== null && UD(t, a - o, u, c, n, s), _r(c))) {
      let l = Gt(n.index, t);
      l[Ze] = Cr(t, e, a, n);
    }
  }
}
function Ah(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd,
    i = n.index,
    s = ny();
  try {
    ln(i);
    for (let a = r; a < o; a++) {
      let c = e.data[a],
        u = t[a];
      Pa(a),
        (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) &&
          AD(c, u);
    }
  } finally {
    ln(-1), Pa(s);
  }
}
function AD(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function RD(e, t) {
  let n = e.directiveRegistry,
    r = null,
    o = null;
  if (n)
    for (let i = 0; i < n.length; i++) {
      let s = n[i];
      if (fv(t, s.selectors, !1))
        if ((r || (r = []), _r(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (o = o || new Map()),
              s.findHostDirectiveDefs(s, a, o),
              r.unshift(...a, s);
            let c = a.length;
            Ga(e, t, c);
          } else r.unshift(s), Ga(e, t, 0);
        else
          (o = o || new Map()), s.findHostDirectiveDefs?.(s, r, o), r.push(s);
    }
  return r === null ? null : [r, o];
}
function Ga(e, t, n) {
  (t.componentOffset = n), (e.components ??= []).push(t.index);
}
function OD(e, t, n) {
  if (t) {
    let r = (e.localNames = []);
    for (let o = 0; o < t.length; o += 2) {
      let i = n[t[o + 1]];
      if (i == null) throw new I(-301, !1);
      r.push(t[o], i);
    }
  }
}
function PD(e, t, n) {
  if (n) {
    if (t.exportAs)
      for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
    _r(t) && (n[""] = e);
  }
}
function FD(e, t, n) {
  (e.flags |= 1),
    (e.directiveStart = t),
    (e.directiveEnd = t + n),
    (e.providerIndexes = t);
}
function kD(e, t, n, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = an(o.type, !0)),
    s = new Ir(i, _r(o), H);
  (e.blueprint[r] = s), (n[r] = s), _D(e, t, r, Ch(e, n, o.hostVars, Ct), o);
}
function LD(e, t, n) {
  let r = Be(t, e),
    o = _h(n),
    i = e[it].rendererFactory,
    s = 16;
  n.signals ? (s = 4096) : n.onPush && (s = 64);
  let a = Fi(
    e,
    Oi(e, o, null, s, r, t, null, i.createRenderer(r, n), null, null, null)
  );
  e[t.index] = a;
}
function jD(e, t, n, r, o, i) {
  let s = Be(e, t);
  VD(t[de], s, i, e.value, n, r, o);
}
function VD(e, t, n, r, o, i, s) {
  if (i == null) e.removeAttribute(t, o, n);
  else {
    let a = s == null ? jn(i) : s(i, r || "", o);
    e.setAttribute(t, o, a, n);
  }
}
function UD(e, t, n, r, o, i) {
  let s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let c = s[a++],
        u = s[a++],
        l = s[a++],
        d = s[a++];
      Ih(r, n, c, u, l, d);
    }
}
function BD(e, t, n) {
  let r = null,
    o = 0;
  for (; o < n.length; ) {
    let i = n[o];
    if (i === 0) {
      o += 4;
      continue;
    } else if (i === 5) {
      o += 2;
      continue;
    }
    if (typeof i == "number") break;
    if (e.hasOwnProperty(i)) {
      r === null && (r = []);
      let s = e[i];
      for (let a = 0; a < s.length; a += 3)
        if (s[a] === t) {
          r.push(i, s[a + 1], s[a + 2], n[o + 1]);
          break;
        }
    }
    o += 2;
  }
  return r;
}
function Rh(e, t, n, r) {
  return [e, !0, 0, t, null, r, null, n, null, null];
}
function Oh(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let r = U(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o],
          s = n[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          Af(i), a.contentQueries(2, t[s], s);
        }
      }
    } finally {
      U(r);
    }
  }
}
function Fi(e, t) {
  return e[Er] ? (e[ad][We] = t) : (e[Er] = t), (e[ad] = t), t;
}
function qa(e, t, n) {
  Af(0);
  let r = U(null);
  try {
    t(e, n);
  } finally {
    U(r);
  }
}
function $D(e) {
  return (e[Qo] ??= []);
}
function HD(e) {
  return (e.cleanup ??= []);
}
function Ph(e, t) {
  let n = e[Un],
    r = n ? n.get(yt, null) : null;
  r && r.handleError(t);
}
function Vc(e, t, n, r, o) {
  for (let i = 0; i < n.length; ) {
    let s = n[i++],
      a = n[i++],
      c = n[i++],
      u = t[s],
      l = e.data[s];
    Ih(l, u, r, a, c, o);
  }
}
function Fh(e, t, n) {
  let r = yf(t, e);
  Xy(e[de], r, n);
}
function zD(e, t) {
  let n = Gt(t, e),
    r = n[F];
  GD(r, n);
  let o = n[wt];
  o !== null && n[Yo] === null && (n[Yo] = Rc(o, n[Un])), Uc(r, n, n[Ze]);
}
function GD(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function Uc(e, t, n) {
  Dc(t);
  try {
    let r = e.viewQuery;
    r !== null && qa(1, r, n);
    let o = e.template;
    o !== null && bh(e, t, o, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[$n]?.finishViewCreation(e),
      e.staticContentQueries && Oh(e, t),
      e.staticViewQueries && qa(2, e.viewQuery, n);
    let i = e.components;
    i !== null && qD(t, i);
  } catch (r) {
    throw (
      (e.firstCreatePass &&
        ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
      r)
    );
  } finally {
    (t[T] &= -5), wc();
  }
}
function qD(e, t) {
  for (let n = 0; n < t.length; n++) zD(e, t[n]);
}
function WD(e, t, n, r) {
  let o = U(null);
  try {
    let i = t.tView,
      a = e[T] & 4096 ? 4096 : 16,
      c = Oi(
        e,
        i,
        n,
        a,
        null,
        t,
        null,
        null,
        r?.injector ?? null,
        r?.embeddedViewInjector ?? null,
        r?.dehydratedView ?? null
      ),
      u = e[t.index];
    c[Bn] = u;
    let l = e[$n];
    return l !== null && (c[$n] = l.createEmbeddedView(i)), Uc(i, c, n), c;
  } finally {
    U(o);
  }
}
function Cd(e, t) {
  return !t || t.firstChild === null || eh(e);
}
function ZD(e, t, n, r = !0) {
  let o = t[F];
  if ((rD(o, t, e, n), r)) {
    let s = za(n, e),
      a = t[de],
      c = mh(a, e[cn]);
    c !== null && tD(o, e[Ye], a, t, c, s);
  }
  let i = t[Yo];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function ui(e, t, n, r, o = !1) {
  for (; n !== null; ) {
    if (n.type === 128) {
      n = o ? n.projectionNext : n.next;
      continue;
    }
    let i = t[n.index];
    i !== null && r.push(at(i)), Et(i) && YD(i, r);
    let s = n.type;
    if (s & 8) ui(e, t, n.child, r);
    else if (s & 32) {
      let a = Pc(n, t),
        c;
      for (; (c = a()); ) r.push(c);
    } else if (s & 16) {
      let a = vh(t, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let c = un(t[st]);
        ui(c[F], c, a, r, !0);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function YD(e, t) {
  for (let n = je; n < e.length; n++) {
    let r = e[n],
      o = r[F].firstChild;
    o !== null && ui(r[F], r, o, t);
  }
  e[cn] !== e[wt] && t.push(e[cn]);
}
var kh = [];
function QD(e) {
  return e[Le] ?? KD(e);
}
function KD(e) {
  let t = kh.pop() ?? Object.create(XD);
  return (t.lView = e), t;
}
function JD(e) {
  e.lView[Le] !== e && ((e.lView = null), kh.push(e));
}
var XD = K(D({}, Hs), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    _i(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[Le] = this;
  },
});
function ew(e) {
  let t = e[Le] ?? Object.create(tw);
  return (t.lView = e), t;
}
var tw = K(D({}, Hs), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    let t = un(e.lView);
    for (; t && !Lh(t[F]); ) t = un(t);
    t && Ef(t);
  },
  consumerOnSignalRead() {
    this.lView[Le] = this;
  },
});
function Lh(e) {
  return e.type !== 2;
}
var nw = 100;
function jh(e, t = !0, n = 0) {
  let r = e[it],
    o = r.rendererFactory,
    i = !1;
  i || o.begin?.();
  try {
    rw(e, n);
  } catch (s) {
    throw (t && Ph(e, s), s);
  } finally {
    i || (o.end?.(), r.inlineEffectRunner?.flush());
  }
}
function rw(e, t) {
  let n = xf();
  try {
    ud(!0), Wa(e, t);
    let r = 0;
    for (; Ti(e); ) {
      if (r === nw) throw new I(103, !1);
      r++, Wa(e, 1);
    }
  } finally {
    ud(n);
  }
}
function ow(e, t, n, r) {
  let o = t[T];
  if ((o & 256) === 256) return;
  let i = !1,
    s = !1;
  !i && t[it].inlineEffectRunner?.flush(), Dc(t);
  let a = !0,
    c = null,
    u = null;
  i ||
    (Lh(e)
      ? ((u = QD(t)), (c = zs(u)))
      : wl() === null
      ? ((a = !1), (u = ew(t)), (c = zs(u)))
      : t[Le] && (qs(t[Le]), (t[Le] = null)));
  try {
    wf(t), Xv(e.bindingStartIndex), n !== null && bh(e, t, n, 2, r);
    let l = (o & 3) === 3;
    if (!i)
      if (l) {
        let f = e.preOrderCheckHooks;
        f !== null && $o(t, f, null);
      } else {
        let f = e.preOrderHooks;
        f !== null && Ho(t, f, 0, null), pa(t, 0);
      }
    if ((s || iw(t), Vh(t, 0), e.contentQueries !== null && Oh(e, t), !i))
      if (l) {
        let f = e.contentCheckHooks;
        f !== null && $o(t, f);
      } else {
        let f = e.contentHooks;
        f !== null && Ho(t, f, 1), pa(t, 1);
      }
    vD(e, t);
    let d = e.components;
    d !== null && Bh(t, d, 0);
    let h = e.viewQuery;
    if ((h !== null && qa(2, h, r), !i))
      if (l) {
        let f = e.viewCheckHooks;
        f !== null && $o(t, f);
      } else {
        let f = e.viewHooks;
        f !== null && Ho(t, f, 2), pa(t, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[ha])) {
      for (let f of t[ha]) f();
      t[ha] = null;
    }
    i || (t[T] &= -73);
  } catch (l) {
    throw (i || _i(t), l);
  } finally {
    u !== null && (El(u, c), a && JD(u)), wc();
  }
}
function Vh(e, t) {
  for (let n = nh(e); n !== null; n = rh(n))
    for (let r = je; r < n.length; r++) {
      let o = n[r];
      Uh(o, t);
    }
}
function iw(e) {
  for (let t = nh(e); t !== null; t = rh(t)) {
    if (!(t[T] & Xo.HasTransplantedViews)) continue;
    let n = t[Jo];
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      Ef(o);
    }
  }
}
function sw(e, t, n) {
  let r = Gt(t, e);
  Uh(r, n);
}
function Uh(e, t) {
  mc(e) && Wa(e, t);
}
function Wa(e, t) {
  let r = e[F],
    o = e[T],
    i = e[Le],
    s = !!(t === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && t === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && Gs(i))),
    (s ||= !1),
    i && (i.dirty = !1),
    (e[T] &= -9217),
    s)
  )
    ow(r, e, r.template, e[Ze]);
  else if (o & 8192) {
    Vh(e, 1);
    let a = r.components;
    a !== null && Bh(e, a, 1);
  }
}
function Bh(e, t, n) {
  for (let r = 0; r < t.length; r++) sw(e, t[r], n);
}
function Bc(e, t) {
  let n = xf() ? 64 : 1088;
  for (e[it].changeDetectionScheduler?.notify(t); e; ) {
    e[T] |= n;
    let r = un(e);
    if (Aa(e) && !r) return e;
    e = r;
  }
  return null;
}
var fn = class {
    get rootNodes() {
      let t = this._lView,
        n = t[F];
      return ui(n, t, n.firstChild, []);
    }
    constructor(t, n, r = !0) {
      (this._lView = t),
        (this._cdRefInjectingView = n),
        (this.notifyErrorHandler = r),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[Ze];
    }
    set context(t) {
      this._lView[Ze] = t;
    }
    get destroyed() {
      return (this._lView[T] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let t = this._lView[De];
        if (Et(t)) {
          let n = t[Ko],
            r = n ? n.indexOf(this) : -1;
          r > -1 && (Ha(t, r), Wo(n, r));
        }
        this._attachedToViewContainer = !1;
      }
      ph(this._lView[F], this._lView);
    }
    onDestroy(t) {
      If(this._lView, t);
    }
    markForCheck() {
      Bc(this._cdRefInjectingView || this._lView, 4);
    }
    detach() {
      this._lView[T] &= -129;
    }
    reattach() {
      Oa(this._lView), (this._lView[T] |= 128);
    }
    detectChanges() {
      (this._lView[T] |= 1024), jh(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new I(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      this._appRef = null;
      let t = Aa(this._lView),
        n = this._lView[Bn];
      n !== null && !t && Fc(n, this._lView), fh(this._lView[F], this._lView);
    }
    attachToAppRef(t) {
      if (this._attachedToViewContainer) throw new I(902, !1);
      this._appRef = t;
      let n = Aa(this._lView),
        r = this._lView[Bn];
      r !== null && !n && hh(r, this._lView), Oa(this._lView);
    }
  },
  Qn = (() => {
    class e {
      static {
        this.__NG_ELEMENT_ID__ = uw;
      }
    }
    return e;
  })(),
  aw = Qn,
  cw = class extends aw {
    constructor(t, n, r) {
      super(),
        (this._declarationLView = t),
        (this._declarationTContainer = n),
        (this.elementRef = r);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(t, n) {
      return this.createEmbeddedViewImpl(t, n);
    }
    createEmbeddedViewImpl(t, n, r) {
      let o = WD(this._declarationLView, this._declarationTContainer, t, {
        embeddedViewInjector: n,
        dehydratedView: r,
      });
      return new fn(o);
    }
  };
function uw() {
  return $h(Re(), Z());
}
function $h(e, t) {
  return e.type & 4 ? new cw(t, e, xi(e, t)) : null;
}
var VN = new RegExp(`^(\\d+)*(${By}|${Uy})*(.*)`);
var lw = () => null;
function bd(e, t) {
  return lw(e, t);
}
var Hn = class {},
  $c = new w("", { providedIn: "root", factory: () => !1 });
var Hh = new w(""),
  zh = new w(""),
  Za = class {},
  li = class {};
function dw(e) {
  let t = Error(`No component factory found for ${ve(e)}.`);
  return (t[fw] = e), t;
}
var fw = "ngComponent";
var Ya = class {
    resolveComponentFactory(t) {
      throw dw(t);
    }
  },
  zn = class {
    static {
      this.NULL = new Ya();
    }
  },
  Gn = class {},
  Rr = (() => {
    class e {
      constructor() {
        this.destroyNode = null;
      }
      static {
        this.__NG_ELEMENT_ID__ = () => hw();
      }
    }
    return e;
  })();
function hw() {
  let e = Z(),
    t = Re(),
    n = Gt(t.index, e);
  return (Vt(n) ? n : e)[de];
}
var pw = (() => {
  class e {
    static {
      this.ɵprov = C({ token: e, providedIn: "root", factory: () => null });
    }
  }
  return e;
})();
function Qa(e, t, n) {
  let r = n ? e.styles : null,
    o = n ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == "number") i = a;
      else if (i == 1) o = Kl(o, a);
      else if (i == 2) {
        let c = a,
          u = t[++s];
        r = Kl(r, c + ": " + u + ";");
      }
    }
  n ? (e.styles = r) : (e.stylesWithoutHost = r),
    n ? (e.classes = o) : (e.classesWithoutHost = o);
}
var di = class extends zn {
  constructor(t) {
    super(), (this.ngModule = t);
  }
  resolveComponentFactory(t) {
    let n = Bt(t);
    return new qn(n, this.ngModule);
  }
};
function Md(e, t) {
  let n = [];
  for (let r in e) {
    if (!e.hasOwnProperty(r)) continue;
    let o = e[r];
    if (o === void 0) continue;
    let i = Array.isArray(o),
      s = i ? o[0] : o,
      a = i ? o[1] : Ut.None;
    t
      ? n.push({
          propName: s,
          templateName: r,
          isSignal: (a & Ut.SignalBased) !== 0,
        })
      : n.push({ propName: s, templateName: r });
  }
  return n;
}
function gw(e) {
  let t = e.toLowerCase();
  return t === "svg" ? jv : t === "math" ? Vv : null;
}
var qn = class extends li {
    get inputs() {
      let t = this.componentDef,
        n = t.inputTransforms,
        r = Md(t.inputs, !0);
      if (n !== null)
        for (let o of r)
          n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
      return r;
    }
    get outputs() {
      return Md(this.componentDef.outputs, !1);
    }
    constructor(t, n) {
      super(),
        (this.componentDef = t),
        (this.ngModule = n),
        (this.componentType = t.type),
        (this.selector = mv(t.selectors)),
        (this.ngContentSelectors = t.ngContentSelectors
          ? t.ngContentSelectors
          : []),
        (this.isBoundToModule = !!n);
    }
    create(t, n, r, o) {
      let i = U(null);
      try {
        o = o || this.ngModule;
        let s = o instanceof ye ? o : o?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new Fa(t, s) : t,
          c = a.get(Gn, null);
        if (c === null) throw new I(407, !1);
        let u = a.get(pw, null),
          l = a.get(Hn, null),
          d = {
            rendererFactory: c,
            sanitizer: u,
            inlineEffectRunner: null,
            changeDetectionScheduler: l,
          },
          h = c.createRenderer(null, this.componentDef),
          f = this.componentDef.selectors[0][0] || "div",
          g = r
            ? wD(h, r, this.componentDef.encapsulation, a)
            : dh(h, f, gw(f)),
          y = 512;
        this.componentDef.signals
          ? (y |= 4096)
          : this.componentDef.onPush || (y |= 16);
        let E = null;
        g !== null && (E = Rc(g, a, !0));
        let R = jc(0, null, null, 1, 0, null, null, null, null, null, null),
          G = Oi(null, R, null, y, null, null, d, h, a, null, E);
        Dc(G);
        let k,
          ee,
          ue = null;
        try {
          let ie = this.componentDef,
            pt,
            Us = null;
          ie.findHostDirectiveDefs
            ? ((pt = []),
              (Us = new Map()),
              ie.findHostDirectiveDefs(ie, pt, Us),
              pt.push(ie))
            : (pt = [ie]);
          let sm = mw(G, g);
          (ue = vw(sm, g, ie, pt, G, d, h)),
            (ee = Df(R, Ae)),
            g && ww(h, ie, g, r),
            n !== void 0 && Ew(ee, this.ngContentSelectors, n),
            (k = Dw(ue, ie, pt, Us, G, [Iw])),
            Uc(R, G, null);
        } catch (ie) {
          throw (ue !== null && Ba(ue), Ba(G), ie);
        } finally {
          wc();
        }
        return new Ka(this.componentType, k, xi(ee, G), G, ee);
      } finally {
        U(i);
      }
    }
  },
  Ka = class extends Za {
    constructor(t, n, r, o, i) {
      super(),
        (this.location = r),
        (this._rootLView = o),
        (this._tNode = i),
        (this.previousInputValues = null),
        (this.instance = n),
        (this.hostView = this.changeDetectorRef = new fn(o, void 0, !1)),
        (this.componentType = t);
    }
    setInput(t, n) {
      let r = this._tNode.inputs,
        o;
      if (r !== null && (o = r[t])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(t) &&
            Object.is(this.previousInputValues.get(t), n))
        )
          return;
        let i = this._rootLView;
        Vc(i[F], i, o, t, n), this.previousInputValues.set(t, n);
        let s = Gt(this._tNode.index, i);
        Bc(s, 1);
      }
    }
    get injector() {
      return new sn(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(t) {
      this.hostView.onDestroy(t);
    }
  };
function mw(e, t) {
  let n = e[F],
    r = Ae;
  return (e[r] = t), Pi(n, r, 2, "#host", null);
}
function vw(e, t, n, r, o, i, s) {
  let a = o[F];
  yw(r, e, t, s);
  let c = null;
  t !== null && (c = Rc(t, o[Un]));
  let u = i.rendererFactory.createRenderer(t, n),
    l = 16;
  n.signals ? (l = 4096) : n.onPush && (l = 64);
  let d = Oi(o, _h(n), null, l, o[e.index], e, i, u, null, null, c);
  return (
    a.firstCreatePass && Ga(a, e, r.length - 1), Fi(o, d), (o[e.index] = d)
  );
}
function yw(e, t, n, r) {
  for (let o of e) t.mergedAttrs = dc(t.mergedAttrs, o.hostAttrs);
  t.mergedAttrs !== null &&
    (Qa(t, t.mergedAttrs, !0), n !== null && Dh(r, n, t));
}
function Dw(e, t, n, r, o, i) {
  let s = Re(),
    a = o[F],
    c = Be(s, o);
  Nh(a, o, s, n, null, r);
  for (let l = 0; l < n.length; l++) {
    let d = s.directiveStart + l,
      h = Cr(o, a, d, s);
    dn(h, o);
  }
  Ah(a, o, s), c && dn(c, o);
  let u = Cr(o, a, s.directiveStart + s.componentOffset, s);
  if (((e[Ze] = o[Ze] = u), i !== null)) for (let l of i) l(u, t);
  return Mh(a, s, o), u;
}
function ww(e, t, n, r) {
  if (r) Sa(e, n, ["ng-version", "18.2.7"]);
  else {
    let { attrs: o, classes: i } = vv(t.selectors[0]);
    o && Sa(e, n, o), i && i.length > 0 && yh(e, n, i.join(" "));
  }
}
function Ew(e, t, n) {
  let r = (e.projection = []);
  for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null ? Array.from(i) : null);
  }
}
function Iw() {
  let e = Re();
  Cc(Z()[F], e);
}
var qt = (() => {
  class e {
    static {
      this.__NG_ELEMENT_ID__ = Cw;
    }
  }
  return e;
})();
function Cw() {
  let e = Re();
  return Mw(e, Z());
}
var bw = qt,
  Gh = class extends bw {
    constructor(t, n, r) {
      super(),
        (this._lContainer = t),
        (this._hostTNode = n),
        (this._hostLView = r);
    }
    get element() {
      return xi(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new sn(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let t = bc(this._hostTNode, this._hostLView);
      if (Uf(t)) {
        let n = ni(t, this._hostLView),
          r = ti(t),
          o = n[F].data[r + 8];
        return new sn(o, n);
      } else return new sn(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(t) {
      let n = Sd(this._lContainer);
      return (n !== null && n[t]) || null;
    }
    get length() {
      return this._lContainer.length - je;
    }
    createEmbeddedView(t, n, r) {
      let o, i;
      typeof r == "number"
        ? (o = r)
        : r != null && ((o = r.index), (i = r.injector));
      let s = bd(this._lContainer, t.ssrId),
        a = t.createEmbeddedViewImpl(n || {}, i, s);
      return this.insertImpl(a, o, Cd(this._hostTNode, s)), a;
    }
    createComponent(t, n, r, o, i) {
      let s = t && !Pv(t),
        a;
      if (s) a = n;
      else {
        let g = n || {};
        (a = g.index),
          (r = g.injector),
          (o = g.projectableNodes),
          (i = g.environmentInjector || g.ngModuleRef);
      }
      let c = s ? t : new qn(Bt(t)),
        u = r || this.parentInjector;
      if (!i && c.ngModule == null) {
        let y = (s ? u : this.parentInjector).get(ye, null);
        y && (i = y);
      }
      let l = Bt(c.componentType ?? {}),
        d = bd(this._lContainer, l?.id ?? null),
        h = d?.firstChild ?? null,
        f = c.create(u, o, h, i);
      return this.insertImpl(f.hostView, a, Cd(this._hostTNode, d)), f;
    }
    insert(t, n) {
      return this.insertImpl(t, n, !0);
    }
    insertImpl(t, n, r) {
      let o = t._lView;
      if (Uv(o)) {
        let a = this.indexOf(t);
        if (a !== -1) this.detach(a);
        else {
          let c = o[De],
            u = new Gh(c, c[Ye], c[De]);
          u.detach(u.indexOf(t));
        }
      }
      let i = this._adjustIndex(n),
        s = this._lContainer;
      return ZD(s, o, i, r), t.attachToViewContainerRef(), Zd(Da(s), i, t), t;
    }
    move(t, n) {
      return this.insert(t, n);
    }
    indexOf(t) {
      let n = Sd(this._lContainer);
      return n !== null ? n.indexOf(t) : -1;
    }
    remove(t) {
      let n = this._adjustIndex(t, -1),
        r = Ha(this._lContainer, n);
      r && (Wo(Da(this._lContainer), n), ph(r[F], r));
    }
    detach(t) {
      let n = this._adjustIndex(t, -1),
        r = Ha(this._lContainer, n);
      return r && Wo(Da(this._lContainer), n) != null ? new fn(r) : null;
    }
    _adjustIndex(t, n = 0) {
      return t ?? this.length + n;
    }
  };
function Sd(e) {
  return e[Ko];
}
function Da(e) {
  return e[Ko] || (e[Ko] = []);
}
function Mw(e, t) {
  let n,
    r = t[e.index];
  return (
    Et(r) ? (n = r) : ((n = Rh(r, t, null, e)), (t[e.index] = n), Fi(t, n)),
    Tw(n, t, e, r),
    new Gh(n, e, t)
  );
}
function Sw(e, t) {
  let n = e[de],
    r = n.createComment(""),
    o = Be(t, e),
    i = mh(n, o);
  return ci(n, i, r, cD(n, o), !1), r;
}
var Tw = Nw,
  _w = () => !1;
function xw(e, t, n) {
  return _w(e, t, n);
}
function Nw(e, t, n, r) {
  if (e[cn]) return;
  let o;
  n.type & 8 ? (o = at(r)) : (o = Sw(t, n)), (e[cn] = o);
}
var Td = new Set();
function ki(e) {
  Td.has(e) ||
    (Td.add(e),
    performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
}
function Aw(e) {
  let t = [],
    n = new Map();
  function r(o) {
    let i = n.get(o);
    if (!i) {
      let s = e(o);
      n.set(o, (i = s.then(Fw)));
    }
    return i;
  }
  return (
    fi.forEach((o, i) => {
      let s = [];
      o.templateUrl &&
        s.push(
          r(o.templateUrl).then((u) => {
            o.template = u;
          })
        );
      let a = typeof o.styles == "string" ? [o.styles] : o.styles || [];
      if (((o.styles = a), o.styleUrl && o.styleUrls?.length))
        throw new Error(
          "@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple"
        );
      if (o.styleUrls?.length) {
        let u = o.styles.length,
          l = o.styleUrls;
        o.styleUrls.forEach((d, h) => {
          a.push(""),
            s.push(
              r(d).then((f) => {
                (a[u + h] = f),
                  l.splice(l.indexOf(d), 1),
                  l.length == 0 && (o.styleUrls = void 0);
              })
            );
        });
      } else
        o.styleUrl &&
          s.push(
            r(o.styleUrl).then((u) => {
              a.push(u), (o.styleUrl = void 0);
            })
          );
      let c = Promise.all(s).then(() => kw(i));
      t.push(c);
    }),
    Ow(),
    Promise.all(t).then(() => {})
  );
}
var fi = new Map(),
  Rw = new Set();
function Ow() {
  let e = fi;
  return (fi = new Map()), e;
}
function Pw() {
  return fi.size === 0;
}
function Fw(e) {
  return typeof e == "string" ? e : e.text();
}
function kw(e) {
  Rw.delete(e);
}
function Hc(e) {
  let t = e.inputConfig,
    n = {};
  for (let r in t)
    if (t.hasOwnProperty(r)) {
      let o = t[r];
      Array.isArray(o) && o[3] && (n[r] = o[3]);
    }
  e.inputTransforms = n;
}
var $t = class {},
  br = class {};
var hi = class extends $t {
    constructor(t, n, r, o = !0) {
      super(),
        (this.ngModuleType = t),
        (this._parent = n),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new di(this));
      let i = rf(t);
      (this._bootstrapComponents = lh(i.bootstrap)),
        (this._r3Injector = Qf(
          t,
          n,
          [
            { provide: $t, useValue: this },
            { provide: zn, useValue: this.componentFactoryResolver },
            ...r,
          ],
          ve(t),
          new Set(["environment"])
        )),
        o && this.resolveInjectorInitializers();
    }
    resolveInjectorInitializers() {
      this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(this.ngModuleType));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let t = this._r3Injector;
      !t.destroyed && t.destroy(),
        this.destroyCbs.forEach((n) => n()),
        (this.destroyCbs = null);
    }
    onDestroy(t) {
      this.destroyCbs.push(t);
    }
  },
  pi = class extends br {
    constructor(t) {
      super(), (this.moduleType = t);
    }
    create(t) {
      return new hi(this.moduleType, t, []);
    }
  };
function Lw(e, t, n) {
  return new hi(e, t, n, !1);
}
var Ja = class extends $t {
  constructor(t) {
    super(),
      (this.componentFactoryResolver = new di(this)),
      (this.instance = null);
    let n = new wr(
      [
        ...t.providers,
        { provide: $t, useValue: this },
        { provide: zn, useValue: this.componentFactoryResolver },
      ],
      t.parent || pc(),
      t.debugName,
      new Set(["environment"])
    );
    (this.injector = n),
      t.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
};
function Li(e, t, n = null) {
  return new Ja({
    providers: e,
    parent: t,
    debugName: n,
    runEnvironmentInitializers: !0,
  }).injector;
}
function qh(e) {
  return Vw(e)
    ? Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e)
    : !1;
}
function jw(e, t) {
  if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]);
  else {
    let n = e[Symbol.iterator](),
      r;
    for (; !(r = n.next()).done; ) t(r.value);
  }
}
function Vw(e) {
  return e !== null && (typeof e == "function" || typeof e == "object");
}
function zc(e, t, n) {
  return (e[t] = n);
}
function Ht(e, t, n) {
  let r = e[t];
  return Object.is(r, n) ? !1 : ((e[t] = n), !0);
}
function Gc(e, t, n, r) {
  let o = Ht(e, t, n);
  return Ht(e, t + 1, r) || o;
}
function Uw(e, t, n, r, o) {
  let i = Gc(e, t, n, r);
  return Ht(e, t + 2, o) || i;
}
function Bw(e) {
  return (e.flags & 32) === 32;
}
function $w(e, t, n, r, o, i, s, a, c) {
  let u = t.consts,
    l = Pi(t, e, 4, s || null, a || null);
  xh(t, n, l, ei(u, c)), Cc(t, l);
  let d = (l.tView = jc(
    2,
    l,
    r,
    o,
    i,
    t.directiveRegistry,
    t.pipeRegistry,
    null,
    t.schemas,
    u,
    null
  ));
  return (
    t.queries !== null &&
      (t.queries.template(t, l), (d.queries = t.queries.embeddedTView(l))),
    l
  );
}
function Hw(e, t, n, r, o, i, s, a, c, u) {
  let l = n + Ae,
    d = t.firstCreatePass ? $w(l, t, e, r, o, i, s, a, c) : t.data[l];
  Nr(d, !1);
  let h = zw(t, e, d, n);
  Ec() && kc(t, e, h, d), dn(h, e);
  let f = Rh(h, e, h, d);
  return (
    (e[l] = f),
    Fi(e, f),
    xw(f, d, e),
    gc(d) && Sh(t, e, d),
    c != null && Th(e, d, u),
    d
  );
}
function Qe(e, t, n, r, o, i, s, a) {
  let c = Z(),
    u = ut(),
    l = ei(u.consts, i);
  return Hw(c, u, e, t, n, r, o, l, s, a), Qe;
}
var zw = Gw;
function Gw(e, t, n, r) {
  return Ic(!0), t[de].createComment("");
}
var Fn = (function (e) {
    return (
      (e[(e.EarlyRead = 0)] = "EarlyRead"),
      (e[(e.Write = 1)] = "Write"),
      (e[(e.MixedReadWrite = 2)] = "MixedReadWrite"),
      (e[(e.Read = 3)] = "Read"),
      e
    );
  })(Fn || {}),
  Wh = (() => {
    class e {
      constructor() {
        this.impl = null;
      }
      execute() {
        this.impl?.execute();
      }
      static {
        this.ɵprov = C({
          token: e,
          providedIn: "root",
          factory: () => new e(),
        });
      }
    }
    return e;
  })(),
  Xa = class e {
    constructor() {
      (this.ngZone = p(q)),
        (this.scheduler = p(Hn)),
        (this.errorHandler = p(yt, { optional: !0 })),
        (this.sequences = new Set()),
        (this.deferredRegistrations = new Set()),
        (this.executing = !1);
    }
    static {
      this.PHASES = [Fn.EarlyRead, Fn.Write, Fn.MixedReadWrite, Fn.Read];
    }
    execute() {
      this.executing = !0;
      for (let t of e.PHASES)
        for (let n of this.sequences)
          if (!(n.erroredOrDestroyed || !n.hooks[t]))
            try {
              n.pipelinedValue = this.ngZone.runOutsideAngular(() =>
                n.hooks[t](n.pipelinedValue)
              );
            } catch (r) {
              (n.erroredOrDestroyed = !0), this.errorHandler?.handleError(r);
            }
      this.executing = !1;
      for (let t of this.sequences)
        t.afterRun(), t.once && this.sequences.delete(t);
      for (let t of this.deferredRegistrations) this.sequences.add(t);
      this.deferredRegistrations.size > 0 && this.scheduler.notify(7),
        this.deferredRegistrations.clear();
    }
    register(t) {
      this.executing
        ? this.deferredRegistrations.add(t)
        : (this.sequences.add(t), this.scheduler.notify(6));
    }
    unregister(t) {
      this.executing && this.sequences.has(t)
        ? ((t.erroredOrDestroyed = !0),
          (t.pipelinedValue = void 0),
          (t.once = !0))
        : (this.sequences.delete(t), this.deferredRegistrations.delete(t));
    }
    static {
      this.ɵprov = C({ token: e, providedIn: "root", factory: () => new e() });
    }
  },
  ec = class {
    constructor(t, n, r, o) {
      (this.impl = t),
        (this.hooks = n),
        (this.once = r),
        (this.erroredOrDestroyed = !1),
        (this.pipelinedValue = void 0),
        (this.unregisterOnDestroy = o?.onDestroy(() => this.destroy()));
    }
    afterRun() {
      (this.erroredOrDestroyed = !1), (this.pipelinedValue = void 0);
    }
    destroy() {
      this.impl.unregister(this), this.unregisterOnDestroy?.();
    }
  };
function qc(e, t) {
  !t?.injector && Rv(qc);
  let n = t?.injector ?? p(Ve);
  return Qy(n) ? (ki("NgAfterNextRender"), Ww(e, n, t, !0)) : Zw;
}
function qw(e, t) {
  if (e instanceof Function) {
    let n = [void 0, void 0, void 0, void 0];
    return (n[t] = e), n;
  } else return [e.earlyRead, e.write, e.mixedReadWrite, e.read];
}
function Ww(e, t, n, r) {
  let o = t.get(Wh);
  o.impl ??= t.get(Xa);
  let i = n?.phase ?? Fn.MixedReadWrite,
    s = n?.manualCleanup !== !0 ? t.get(Tc) : null,
    a = new ec(o.impl, qw(e, i), r, s);
  return o.impl.register(a), a;
}
var Zw = { destroy() {} };
function Or(e, t, n, r) {
  let o = Z(),
    i = yc();
  if (Ht(o, i, t)) {
    let s = ut(),
      a = Lf();
    jD(a, o, e, t, n, r);
  }
  return Or;
}
function Yw(e, t, n, r) {
  return Ht(e, yc(), n) ? t + jn(n) + r : Ct;
}
function Qw(e, t, n, r, o, i) {
  let s = Jv(),
    a = Gc(e, s, n, o);
  return Nf(2), a ? t + jn(n) + r + jn(o) + i : Ct;
}
function jo(e, t) {
  return (e << 17) | (t << 2);
}
function hn(e) {
  return (e >> 17) & 32767;
}
function Kw(e) {
  return (e & 2) == 2;
}
function Jw(e, t) {
  return (e & 131071) | (t << 17);
}
function tc(e) {
  return e | 2;
}
function Wn(e) {
  return (e & 131068) >> 2;
}
function wa(e, t) {
  return (e & -131069) | (t << 2);
}
function Xw(e) {
  return (e & 1) === 1;
}
function nc(e) {
  return e | 1;
}
function eE(e, t, n, r, o, i) {
  let s = i ? t.classBindings : t.styleBindings,
    a = hn(s),
    c = Wn(s);
  e[r] = n;
  let u = !1,
    l;
  if (Array.isArray(n)) {
    let d = n;
    (l = d[1]), (l === null || Tr(d, l) > 0) && (u = !0);
  } else l = n;
  if (o)
    if (c !== 0) {
      let h = hn(e[a + 1]);
      (e[r + 1] = jo(h, a)),
        h !== 0 && (e[h + 1] = wa(e[h + 1], r)),
        (e[a + 1] = Jw(e[a + 1], r));
    } else
      (e[r + 1] = jo(a, 0)), a !== 0 && (e[a + 1] = wa(e[a + 1], r)), (a = r);
  else
    (e[r + 1] = jo(c, 0)),
      a === 0 ? (a = r) : (e[c + 1] = wa(e[c + 1], r)),
      (c = r);
  u && (e[r + 1] = tc(e[r + 1])),
    _d(e, l, r, !0),
    _d(e, l, r, !1),
    tE(t, l, e, r, i),
    (s = jo(a, c)),
    i ? (t.classBindings = s) : (t.styleBindings = s);
}
function tE(e, t, n, r, o) {
  let i = o ? e.residualClasses : e.residualStyles;
  i != null &&
    typeof t == "string" &&
    Tr(i, t) >= 0 &&
    (n[r + 1] = nc(n[r + 1]));
}
function _d(e, t, n, r) {
  let o = e[n + 1],
    i = t === null,
    s = r ? hn(o) : Wn(o),
    a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    let c = e[s],
      u = e[s + 1];
    nE(c, t) && ((a = !0), (e[s + 1] = r ? nc(u) : tc(u))),
      (s = r ? hn(u) : Wn(u));
  }
  a && (e[n + 1] = r ? tc(o) : nc(o));
}
function nE(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? !0
    : Array.isArray(e) && typeof t == "string"
    ? Tr(e, t) >= 0
    : !1;
}
function Ie(e, t, n) {
  let r = Z(),
    o = yc();
  if (Ht(r, o, t)) {
    let i = ut(),
      s = Lf();
    SD(i, s, r, e, t, r[de], n, !1);
  }
  return Ie;
}
function xd(e, t, n, r, o) {
  let i = t.inputs,
    s = o ? "class" : "style";
  Vc(e, n, i[s], s, r);
}
function ji(e, t, n) {
  return rE(e, t, n, !1), ji;
}
function rE(e, t, n, r) {
  let o = Z(),
    i = ut(),
    s = Nf(2);
  if ((i.firstUpdatePass && iE(i, e, s, r), t !== Ct && Ht(o, s, t))) {
    let a = i.data[gn()];
    lE(i, a, o, o[de], e, (o[s + 1] = dE(t, n)), r, s);
  }
}
function oE(e, t) {
  return t >= e.expandoStartIndex;
}
function iE(e, t, n, r) {
  let o = e.data;
  if (o[n + 1] === null) {
    let i = o[gn()],
      s = oE(e, n);
    fE(i, r) && t === null && !s && (t = !1),
      (t = sE(o, i, t, r)),
      eE(o, i, t, n, s, r);
  }
}
function sE(e, t, n, r) {
  let o = ry(e),
    i = r ? t.residualClasses : t.residualStyles;
  if (o === null)
    (r ? t.classBindings : t.styleBindings) === 0 &&
      ((n = Ea(null, e, t, n, r)), (n = Mr(n, t.attrs, r)), (i = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((n = Ea(o, e, t, n, r)), i === null)) {
        let c = aE(e, t, r);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = Ea(null, e, t, c[1], r)),
          (c = Mr(c, t.attrs, r)),
          cE(e, t, r, c));
      } else i = uE(e, t, r);
  }
  return (
    i !== void 0 && (r ? (t.residualClasses = i) : (t.residualStyles = i)), n
  );
}
function aE(e, t, n) {
  let r = n ? t.classBindings : t.styleBindings;
  if (Wn(r) !== 0) return e[hn(r)];
}
function cE(e, t, n, r) {
  let o = n ? t.classBindings : t.styleBindings;
  e[hn(o)] = r;
}
function uE(e, t, n) {
  let r,
    o = t.directiveEnd;
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = Mr(r, s, n);
  }
  return Mr(r, t.attrs, n);
}
function Ea(e, t, n, r, o) {
  let i = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < s && ((i = t[a]), (r = Mr(r, i.hostAttrs, o)), i !== e);

  )
    a++;
  return e !== null && (n.directiveStylingLast = a), r;
}
function Mr(e, t, n) {
  let r = n ? 1 : 2,
    o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      typeof s == "number"
        ? (o = s)
        : o === r &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]),
          ov(e, s, n ? !0 : t[++i]));
    }
  return e === void 0 ? null : e;
}
function lE(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3)) return;
  let c = e.data,
    u = c[a + 1],
    l = Xw(u) ? Nd(c, t, n, o, Wn(u), s) : void 0;
  if (!gi(l)) {
    gi(i) || (Kw(u) && (i = Nd(c, null, n, o, a, s)));
    let d = yf(gn(), n);
    gD(r, s, d, o, i);
  }
}
function Nd(e, t, n, r, o, i) {
  let s = t === null,
    a;
  for (; o > 0; ) {
    let c = e[o],
      u = Array.isArray(c),
      l = u ? c[1] : c,
      d = l === null,
      h = n[o + 1];
    h === Ct && (h = d ? qe : void 0);
    let f = d ? da(h, r) : l === r ? h : void 0;
    if ((u && !gi(f) && (f = da(c, r)), gi(f) && ((a = f), s))) return a;
    let g = e[o + 1];
    o = s ? hn(g) : Wn(g);
  }
  if (t !== null) {
    let c = i ? t.residualClasses : t.residualStyles;
    c != null && (a = da(c, r));
  }
  return a;
}
function gi(e) {
  return e !== void 0;
}
function dE(e, t) {
  return (
    e == null ||
      e === "" ||
      (typeof t == "string"
        ? (e = e + t)
        : typeof e == "object" && (e = ve(Ar(e)))),
    e
  );
}
function fE(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
function hE(e, t, n, r, o, i) {
  let s = t.consts,
    a = ei(s, o),
    c = Pi(t, e, 2, r, a);
  return (
    xh(t, n, c, ei(s, i)),
    c.attrs !== null && Qa(c, c.attrs, !1),
    c.mergedAttrs !== null && Qa(c, c.mergedAttrs, !0),
    t.queries !== null && t.queries.elementStart(t, c),
    c
  );
}
function m(e, t, n, r) {
  let o = Z(),
    i = ut(),
    s = Ae + e,
    a = o[de],
    c = i.firstCreatePass ? hE(s, i, o, t, n, r) : i.data[s],
    u = pE(i, o, c, a, t, e);
  o[s] = u;
  let l = gc(c);
  return (
    Nr(c, !0),
    Dh(a, u, c),
    !Bw(c) && Ec() && kc(i, o, u, c),
    Hv() === 0 && dn(u, o),
    zv(),
    l && (Sh(i, o, c), Mh(i, c, o)),
    r !== null && Th(o, c),
    m
  );
}
function v() {
  let e = Re();
  _f() ? Qv() : ((e = e.parent), Nr(e, !1));
  let t = e;
  Wv(t) && Zv(), Gv();
  let n = ut();
  return (
    n.firstCreatePass && (Cc(n, e), hf(e) && n.queries.elementEnd(e)),
    t.classesWithoutHost != null &&
      ly(t) &&
      xd(n, t, Z(), t.classesWithoutHost, !0),
    t.stylesWithoutHost != null &&
      dy(t) &&
      xd(n, t, Z(), t.stylesWithoutHost, !1),
    v
  );
}
function Ke(e, t, n, r) {
  return m(e, t, n, r), v(), Ke;
}
var pE = (e, t, n, r, o, i) => (Ic(!0), dh(r, o, sy()));
function Zh() {
  return Z();
}
var on = void 0;
function gE(e) {
  let t = e,
    n = Math.floor(Math.abs(e)),
    r = e.toString().replace(/^[^.]*\.?/, "").length;
  return n === 1 && r === 0 ? 1 : 5;
}
var mE = [
    "en",
    [["a", "p"], ["AM", "PM"], on],
    [["AM", "PM"], on, on],
    [
      ["S", "M", "T", "W", "T", "F", "S"],
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    ],
    on,
    [
      ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      [
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
      ],
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    ],
    on,
    [
      ["B", "A"],
      ["BC", "AD"],
      ["Before Christ", "Anno Domini"],
    ],
    0,
    [6, 0],
    ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
    ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
    ["{1}, {0}", on, "{1} 'at' {0}", on],
    [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"],
    ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"],
    "USD",
    "$",
    "US Dollar",
    {},
    "ltr",
    gE,
  ],
  Ia = {};
function _e(e) {
  let t = vE(e),
    n = Ad(t);
  if (n) return n;
  let r = t.split("-")[0];
  if (((n = Ad(r)), n)) return n;
  if (r === "en") return mE;
  throw new I(701, !1);
}
function Ad(e) {
  return (
    e in Ia ||
      (Ia[e] =
        ge.ng &&
        ge.ng.common &&
        ge.ng.common.locales &&
        ge.ng.common.locales[e]),
    Ia[e]
  );
}
var X = (function (e) {
  return (
    (e[(e.LocaleId = 0)] = "LocaleId"),
    (e[(e.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
    (e[(e.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
    (e[(e.DaysFormat = 3)] = "DaysFormat"),
    (e[(e.DaysStandalone = 4)] = "DaysStandalone"),
    (e[(e.MonthsFormat = 5)] = "MonthsFormat"),
    (e[(e.MonthsStandalone = 6)] = "MonthsStandalone"),
    (e[(e.Eras = 7)] = "Eras"),
    (e[(e.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
    (e[(e.WeekendRange = 9)] = "WeekendRange"),
    (e[(e.DateFormat = 10)] = "DateFormat"),
    (e[(e.TimeFormat = 11)] = "TimeFormat"),
    (e[(e.DateTimeFormat = 12)] = "DateTimeFormat"),
    (e[(e.NumberSymbols = 13)] = "NumberSymbols"),
    (e[(e.NumberFormats = 14)] = "NumberFormats"),
    (e[(e.CurrencyCode = 15)] = "CurrencyCode"),
    (e[(e.CurrencySymbol = 16)] = "CurrencySymbol"),
    (e[(e.CurrencyName = 17)] = "CurrencyName"),
    (e[(e.Currencies = 18)] = "Currencies"),
    (e[(e.Directionality = 19)] = "Directionality"),
    (e[(e.PluralCase = 20)] = "PluralCase"),
    (e[(e.ExtraData = 21)] = "ExtraData"),
    e
  );
})(X || {});
function vE(e) {
  return e.toLowerCase().replace(/_/g, "-");
}
var mi = "en-US",
  yE = "USD";
var DE = mi;
function wE(e) {
  typeof e == "string" && (DE = e.toLowerCase().replace(/_/g, "-"));
}
var EE = (e, t, n) => {};
function Pr(e, t, n, r) {
  let o = Z(),
    i = ut(),
    s = Re();
  return CE(i, o, o[de], s, e, t, r), Pr;
}
function IE(e, t, n, r) {
  let o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === n && o[i + 1] === r) {
        let a = t[Qo],
          c = o[i + 2];
        return a.length > c ? a[c] : null;
      }
      typeof s == "string" && (i += 2);
    }
  return null;
}
function CE(e, t, n, r, o, i, s) {
  let a = gc(r),
    u = e.firstCreatePass && HD(e),
    l = t[Ze],
    d = $D(t),
    h = !0;
  if (r.type & 3 || s) {
    let y = Be(r, t),
      E = s ? s(y) : y,
      R = d.length,
      G = s ? (ee) => s(at(ee[r.index])) : r.index,
      k = null;
    if ((!s && a && (k = IE(e, t, o, r.index)), k !== null)) {
      let ee = k.__ngLastListenerFn__ || k;
      (ee.__ngNextListenerFn__ = i), (k.__ngLastListenerFn__ = i), (h = !1);
    } else {
      (i = Od(r, t, l, i)), EE(y, o, i);
      let ee = n.listen(E, o, i);
      d.push(i, ee), u && u.push(o, G, R, R + 1);
    }
  } else i = Od(r, t, l, i);
  let f = r.outputs,
    g;
  if (h && f !== null && (g = f[o])) {
    let y = g.length;
    if (y)
      for (let E = 0; E < y; E += 2) {
        let R = g[E],
          G = g[E + 1],
          ue = t[R][G].subscribe(i),
          ie = d.length;
        d.push(i, ue), u && u.push(o, r.index, ie, -(ie + 1));
      }
  }
}
function Rd(e, t, n, r) {
  let o = U(null);
  try {
    return nt(6, t, n), n(r) !== !1;
  } catch (i) {
    return Ph(e, i), !1;
  } finally {
    nt(7, t, n), U(o);
  }
}
function Od(e, t, n, r) {
  return function o(i) {
    if (i === Function) return r;
    let s = e.componentOffset > -1 ? Gt(e.index, t) : t;
    Bc(s, 5);
    let a = Rd(t, n, r, i),
      c = o.__ngNextListenerFn__;
    for (; c; ) (a = Rd(t, n, c, i) && a), (c = c.__ngNextListenerFn__);
    return a;
  };
}
function Wt(e = 1) {
  return iy(e);
}
function bE(e, t, n, r) {
  n >= e.data.length && ((e.data[n] = null), (e.blueprint[n] = null)),
    (t[n] = r);
}
function Wc(e) {
  let t = Kv();
  return Si(t, Ae + e);
}
function M(e, t = "") {
  let n = Z(),
    r = ut(),
    o = e + Ae,
    i = r.firstCreatePass ? Pi(r, o, 1, t, null) : r.data[o],
    s = ME(r, n, i, t, e);
  (n[o] = s), Ec() && kc(r, n, s, i), Nr(i, !1);
}
var ME = (e, t, n, r, o) => (Ic(!0), Jy(t[de], r));
function te(e) {
  return Zt("", e, ""), te;
}
function Zt(e, t, n) {
  let r = Z(),
    o = Yw(r, e, t, n);
  return o !== Ct && Fh(r, gn(), o), Zt;
}
function Zc(e, t, n, r, o) {
  let i = Z(),
    s = Qw(i, e, t, n, r, o);
  return s !== Ct && Fh(i, gn(), s), Zc;
}
var SE = (() => {
  class e {
    constructor(n) {
      (this._injector = n), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let r = af(!1, n.type),
          o =
            r.length > 0
              ? Li([r], this._injector, `Standalone[${n.type.name}]`)
              : null;
        this.cachedInjectors.set(n, o);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static {
      this.ɵprov = C({
        token: e,
        providedIn: "environment",
        factory: () => new e(b(ye)),
      });
    }
  }
  return e;
})();
function Yh(e) {
  ki("NgStandalone"),
    (e.getStandaloneInjector = (t) =>
      t.get(SE).getOrCreateStandaloneInjector(e));
}
function Yc(e, t) {
  let n = e[t];
  return n === Ct ? void 0 : n;
}
function TE(e, t, n, r, o, i) {
  let s = t + n;
  return Ht(e, s, o) ? zc(e, s + 1, i ? r.call(i, o) : r(o)) : Yc(e, s + 1);
}
function _E(e, t, n, r, o, i, s) {
  let a = t + n;
  return Gc(e, a, o, i)
    ? zc(e, a + 2, s ? r.call(s, o, i) : r(o, i))
    : Yc(e, a + 2);
}
function xE(e, t, n, r, o, i, s, a) {
  let c = t + n;
  return Uw(e, c, o, i, s)
    ? zc(e, c + 3, a ? r.call(a, o, i, s) : r(o, i, s))
    : Yc(e, c + 3);
}
function bt(e, t) {
  let n = ut(),
    r,
    o = e + Ae;
  n.firstCreatePass
    ? ((r = NE(t, n.pipeRegistry)),
      (n.data[o] = r),
      r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy))
    : (r = n.data[o]);
  let i = r.factory || (r.factory = an(r.type, !0)),
    s,
    a = Te(H);
  try {
    let c = ri(!1),
      u = i();
    return ri(c), bE(n, Z(), o, u), u;
  } finally {
    Te(a);
  }
}
function NE(e, t) {
  if (t)
    for (let n = t.length - 1; n >= 0; n--) {
      let r = t[n];
      if (e === r.name) return r;
    }
}
function Vi(e, t, n) {
  let r = e + Ae,
    o = Z(),
    i = Si(o, r);
  return Qc(o, r) ? TE(o, vc(), t, i.transform, n, i) : i.transform(n);
}
function Fr(e, t, n, r) {
  let o = e + Ae,
    i = Z(),
    s = Si(i, o);
  return Qc(i, o) ? _E(i, vc(), t, s.transform, n, r, s) : s.transform(n, r);
}
function Qh(e, t, n, r, o) {
  let i = e + Ae,
    s = Z(),
    a = Si(s, i);
  return Qc(s, i)
    ? xE(s, vc(), t, a.transform, n, r, o, a)
    : a.transform(n, r, o);
}
function Qc(e, t) {
  return e[F].data[t].pure;
}
function Kc(e, t) {
  return $h(e, t);
}
var Vo = null;
function AE(e) {
  (Vo !== null &&
    (e.defaultEncapsulation !== Vo.defaultEncapsulation ||
      e.preserveWhitespaces !== Vo.preserveWhitespaces)) ||
    (Vo = e);
}
var Ui = (() => {
  class e {
    log(n) {
      console.log(n);
    }
    warn(n) {
      console.warn(n);
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "platform" });
    }
  }
  return e;
})();
var Jc = new w(""),
  kr = new w(""),
  Bi = (() => {
    class e {
      constructor(n, r, o) {
        (this._ngZone = n),
          (this.registry = r),
          (this._isZoneStable = !0),
          (this._callbacks = []),
          (this.taskTrackingZone = null),
          Xc || (RE(o), o.addToWindow(r)),
          this._watchAngularEvents(),
          n.run(() => {
            this.taskTrackingZone =
              typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
          });
      }
      _watchAngularEvents() {
        this._ngZone.onUnstable.subscribe({
          next: () => {
            this._isZoneStable = !1;
          },
        }),
          this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.subscribe({
              next: () => {
                q.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    (this._isZoneStable = !0), this._runCallbacksIfReady();
                  });
              },
            });
          });
      }
      isStable() {
        return this._isZoneStable && !this._ngZone.hasPendingMacrotasks;
      }
      _runCallbacksIfReady() {
        if (this.isStable())
          queueMicrotask(() => {
            for (; this._callbacks.length !== 0; ) {
              let n = this._callbacks.pop();
              clearTimeout(n.timeoutId), n.doneCb();
            }
          });
        else {
          let n = this.getPendingTasks();
          this._callbacks = this._callbacks.filter((r) =>
            r.updateCb && r.updateCb(n) ? (clearTimeout(r.timeoutId), !1) : !0
          );
        }
      }
      getPendingTasks() {
        return this.taskTrackingZone
          ? this.taskTrackingZone.macroTasks.map((n) => ({
              source: n.source,
              creationLocation: n.creationLocation,
              data: n.data,
            }))
          : [];
      }
      addCallback(n, r, o) {
        let i = -1;
        r &&
          r > 0 &&
          (i = setTimeout(() => {
            (this._callbacks = this._callbacks.filter(
              (s) => s.timeoutId !== i
            )),
              n();
          }, r)),
          this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
      }
      whenStable(n, r, o) {
        if (o && !this.taskTrackingZone)
          throw new Error(
            'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
          );
        this.addCallback(n, r, o), this._runCallbacksIfReady();
      }
      registerApplication(n) {
        this.registry.registerApplication(n, this);
      }
      unregisterApplication(n) {
        this.registry.unregisterApplication(n);
      }
      findProviders(n, r, o) {
        return [];
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(q), b($i), b(kr));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  $i = (() => {
    class e {
      constructor() {
        this._applications = new Map();
      }
      registerApplication(n, r) {
        this._applications.set(n, r);
      }
      unregisterApplication(n) {
        this._applications.delete(n);
      }
      unregisterAllApplications() {
        this._applications.clear();
      }
      getTestability(n) {
        return this._applications.get(n) || null;
      }
      getAllTestabilities() {
        return Array.from(this._applications.values());
      }
      getAllRootElements() {
        return Array.from(this._applications.keys());
      }
      findTestabilityInTree(n, r = !0) {
        return Xc?.findTestabilityInTree(this, n, r) ?? null;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "platform" });
      }
    }
    return e;
  })();
function RE(e) {
  Xc = e;
}
var Xc;
function Lr(e) {
  return !!e && typeof e.then == "function";
}
function Kh(e) {
  return !!e && typeof e.subscribe == "function";
}
var Hi = new w(""),
  Jh = (() => {
    class e {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((n, r) => {
            (this.resolve = n), (this.reject = r);
          })),
          (this.appInits = p(Hi, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let o of this.appInits) {
          let i = o();
          if (Lr(i)) n.push(i);
          else if (Kh(i)) {
            let s = new Promise((a, c) => {
              i.subscribe({ complete: a, error: c });
            });
            n.push(s);
          }
        }
        let r = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            r();
          })
          .catch((o) => {
            this.reject(o);
          }),
          n.length === 0 && r(),
          (this.initialized = !0);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  zi = new w("");
function OE() {
  Il(() => {
    throw new I(600, !1);
  });
}
function PE(e) {
  return e.isBoundToModule;
}
var FE = 10;
function kE(e, t, n) {
  try {
    let r = n();
    return Lr(r)
      ? r.catch((o) => {
          throw (t.runOutsideAngular(() => e.handleError(o)), o);
        })
      : r;
  } catch (r) {
    throw (t.runOutsideAngular(() => e.handleError(r)), r);
  }
}
function Xh(e, t) {
  return Array.isArray(t) ? t.reduce(Xh, e) : D(D({}, e), t);
}
var Mt = (() => {
  class e {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = p(Oy)),
        (this.afterRenderManager = p(Wh)),
        (this.zonelessEnabled = p($c)),
        (this.dirtyFlags = 0),
        (this.deferredDirtyFlags = 0),
        (this.externalTestViews = new Set()),
        (this.beforeRender = new he()),
        (this.afterTick = new he()),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = p(It).hasPendingTasks.pipe(N((n) => !n))),
        (this._injector = p(ye));
    }
    get allViews() {
      return [...this.externalTestViews.keys(), ...this._views];
    }
    get destroyed() {
      return this._destroyed;
    }
    whenStable() {
      let n;
      return new Promise((r) => {
        n = this.isStable.subscribe({
          next: (o) => {
            o && r();
          },
        });
      }).finally(() => {
        n.unsubscribe();
      });
    }
    get injector() {
      return this._injector;
    }
    bootstrap(n, r) {
      let o = n instanceof li;
      if (!this._injector.get(Jh).done) {
        let h = !o && nf(n),
          f = !1;
        throw new I(405, f);
      }
      let s;
      o ? (s = n) : (s = this._injector.get(zn).resolveComponentFactory(n)),
        this.componentTypes.push(s.componentType);
      let a = PE(s) ? void 0 : this._injector.get($t),
        c = r || s.selector,
        u = s.create(Ve.NULL, [], c, a),
        l = u.location.nativeElement,
        d = u.injector.get(Jc, null);
      return (
        d?.registerApplication(l),
        u.onDestroy(() => {
          this.detachView(u.hostView),
            zo(this.components, u),
            d?.unregisterApplication(l);
        }),
        this._loadComponent(u),
        u
      );
    }
    tick() {
      this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick();
    }
    _tick() {
      if (this._runningTick) throw new I(101, !1);
      let n = U(null);
      try {
        (this._runningTick = !0), this.synchronize();
      } catch (r) {
        this.internalErrorHandler(r);
      } finally {
        (this._runningTick = !1), U(n), this.afterTick.next();
      }
    }
    synchronize() {
      let n = null;
      this._injector.destroyed ||
        (n = this._injector.get(Gn, null, { optional: !0 })),
        (this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0);
      let r = 0;
      for (; this.dirtyFlags !== 0 && r++ < FE; ) this.synchronizeOnce(n);
    }
    synchronizeOnce(n) {
      if (
        ((this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0),
        this.dirtyFlags & 7)
      ) {
        let r = !!(this.dirtyFlags & 1);
        (this.dirtyFlags &= -8),
          (this.dirtyFlags |= 8),
          this.beforeRender.next(r);
        for (let { _lView: o, notifyErrorHandler: i } of this._views)
          LE(o, i, r, this.zonelessEnabled);
        if (
          ((this.dirtyFlags &= -5),
          this.syncDirtyFlagsWithViews(),
          this.dirtyFlags & 7)
        )
          return;
      } else n?.begin?.(), n?.end?.();
      this.dirtyFlags & 8 &&
        ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews();
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: n }) => Ti(n))) {
        this.dirtyFlags |= 2;
        return;
      } else this.dirtyFlags &= -8;
    }
    attachView(n) {
      let r = n;
      this._views.push(r), r.attachToAppRef(this);
    }
    detachView(n) {
      let r = n;
      zo(this._views, r), r.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView), this.tick(), this.components.push(n);
      let r = this._injector.get(zi, []);
      [...this._bootstrapListeners, ...r].forEach((o) => o(n));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(n) {
      return (
        this._destroyListeners.push(n), () => zo(this._destroyListeners, n)
      );
    }
    destroy() {
      if (this._destroyed) throw new I(406, !1);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function zo(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
function LE(e, t, n, r) {
  if (!n && !Ti(e)) return;
  jh(e, t, n && !r ? 0 : 1);
}
var rc = class {
    constructor(t, n) {
      (this.ngModuleFactory = t), (this.componentFactories = n);
    }
  },
  Gi = (() => {
    class e {
      compileModuleSync(n) {
        return new pi(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let r = this.compileModuleSync(n),
          o = rf(n),
          i = lh(o.declarations).reduce((s, a) => {
            let c = Bt(a);
            return c && s.push(new qn(c)), s;
          }, []);
        return new rc(r, i);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  jE = new w("");
function VE(e, t, n) {
  let r = new pi(n);
  return Promise.resolve(r);
}
function Pd(e) {
  for (let t = e.length - 1; t >= 0; t--) if (e[t] !== void 0) return e[t];
}
var UE = (() => {
  class e {
    constructor() {
      (this.zone = p(q)),
        (this.changeDetectionScheduler = p(Hn)),
        (this.applicationRef = p(Mt));
    }
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription =
          this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this.changeDetectionScheduler.runningTick ||
                this.zone.run(() => {
                  this.applicationRef.tick();
                });
            },
          }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function BE({
  ngZoneFactory: e,
  ignoreChangesOutsideZone: t,
  scheduleInRootZone: n,
}) {
  return (
    (e ??= () => new q(K(D({}, ep()), { scheduleInRootZone: n }))),
    [
      { provide: q, useFactory: e },
      {
        provide: Vn,
        multi: !0,
        useFactory: () => {
          let r = p(UE, { optional: !0 });
          return () => r.initialize();
        },
      },
      {
        provide: Vn,
        multi: !0,
        useFactory: () => {
          let r = p($E);
          return () => {
            r.initialize();
          };
        },
      },
      t === !0 ? { provide: Hh, useValue: !0 } : [],
      { provide: zh, useValue: n ?? Kf },
    ]
  );
}
function ep(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var $E = (() => {
  class e {
    constructor() {
      (this.subscription = new ne()),
        (this.initialized = !1),
        (this.zone = p(q)),
        (this.pendingTasks = p(It));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              q.assertNotInAngularZone(),
                queueMicrotask(() => {
                  n !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            q.assertInAngularZone(), (n ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var HE = (() => {
  class e {
    constructor() {
      (this.appRef = p(Mt)),
        (this.taskService = p(It)),
        (this.ngZone = p(q)),
        (this.zonelessEnabled = p($c)),
        (this.disableScheduling = p(Hh, { optional: !0 }) ?? !1),
        (this.zoneIsDefined = typeof Zone < "u" && !!Zone.root.run),
        (this.schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }]),
        (this.subscriptions = new ne()),
        (this.angularZoneId = this.zoneIsDefined
          ? this.ngZone._inner?.get(ii)
          : null),
        (this.scheduleInRootZone =
          !this.zonelessEnabled &&
          this.zoneIsDefined &&
          (p(zh, { optional: !0 }) ?? !1)),
        (this.cancelScheduledCallback = null),
        (this.useMicrotaskScheduler = !1),
        (this.runningTick = !1),
        (this.pendingRenderTaskId = null),
        this.subscriptions.add(
          this.appRef.afterTick.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        this.subscriptions.add(
          this.ngZone.onUnstable.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        (this.disableScheduling ||=
          !this.zonelessEnabled &&
          (this.ngZone instanceof si || !this.zoneIsDefined));
    }
    notify(n) {
      if (!this.zonelessEnabled && n === 5) return;
      switch (n) {
        case 0: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 3:
        case 2:
        case 4:
        case 5:
        case 1: {
          this.appRef.dirtyFlags |= 4;
          break;
        }
        case 7: {
          this.appRef.deferredDirtyFlags |= 8;
          break;
        }
        case 9:
        case 8:
        case 6:
        case 10:
        default:
          this.appRef.dirtyFlags |= 8;
      }
      if (!this.shouldScheduleTick()) return;
      let r = this.useMicrotaskScheduler ? pd : Jf;
      (this.pendingRenderTaskId = this.taskService.add()),
        this.scheduleInRootZone
          ? (this.cancelScheduledCallback = Zone.root.run(() =>
              r(() => this.tick())
            ))
          : (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
              r(() => this.tick())
            ));
    }
    shouldScheduleTick() {
      return !(
        this.disableScheduling ||
        this.pendingRenderTaskId !== null ||
        this.runningTick ||
        this.appRef._runningTick ||
        (!this.zonelessEnabled &&
          this.zoneIsDefined &&
          Zone.current.get(ii + this.angularZoneId))
      );
    }
    tick() {
      if (this.runningTick || this.appRef.destroyed) return;
      !this.zonelessEnabled &&
        this.appRef.dirtyFlags & 7 &&
        (this.appRef.dirtyFlags |= 1);
      let n = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            (this.runningTick = !0), this.appRef._tick();
          },
          void 0,
          this.schedulerTickApplyArgs
        );
      } catch (r) {
        throw (this.taskService.remove(n), r);
      } finally {
        this.cleanup();
      }
      (this.useMicrotaskScheduler = !0),
        pd(() => {
          (this.useMicrotaskScheduler = !1), this.taskService.remove(n);
        });
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe(), this.cleanup();
    }
    cleanup() {
      if (
        ((this.runningTick = !1),
        this.cancelScheduledCallback?.(),
        (this.cancelScheduledCallback = null),
        this.pendingRenderTaskId !== null)
      ) {
        let n = this.pendingRenderTaskId;
        (this.pendingRenderTaskId = null), this.taskService.remove(n);
      }
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function zE() {
  return (typeof $localize < "u" && $localize.locale) || mi;
}
var Kn = new w("", {
    providedIn: "root",
    factory: () => p(Kn, O.Optional | O.SkipSelf) || zE(),
  }),
  tp = new w("", { providedIn: "root", factory: () => yE });
var eu = new w("");
function Uo(e) {
  return !!e.platformInjector;
}
function GE(e) {
  let t = Uo(e) ? e.r3Injector : e.moduleRef.injector,
    n = t.get(q);
  return n.run(() => {
    Uo(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let r = t.get(yt, null),
      o;
    if (
      (n.runOutsideAngular(() => {
        o = n.onError.subscribe({
          next: (i) => {
            r.handleError(i);
          },
        });
      }),
      Uo(e))
    ) {
      let i = () => t.destroy(),
        s = e.platformInjector.get(eu);
      s.add(i),
        t.onDestroy(() => {
          o.unsubscribe(), s.delete(i);
        });
    } else
      e.moduleRef.onDestroy(() => {
        zo(e.allPlatformModules, e.moduleRef), o.unsubscribe();
      });
    return kE(r, n, () => {
      let i = t.get(Jh);
      return (
        i.runInitializers(),
        i.donePromise.then(() => {
          let s = t.get(Kn, mi);
          if ((wE(s || mi), Uo(e))) {
            let a = t.get(Mt);
            return (
              e.rootComponent !== void 0 && a.bootstrap(e.rootComponent), a
            );
          } else return qE(e.moduleRef, e.allPlatformModules), e.moduleRef;
        })
      );
    });
  });
}
function qE(e, t) {
  let n = e.injector.get(Mt);
  if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach((r) => n.bootstrap(r));
  else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(n);
  else throw new I(-403, !1);
  t.push(e);
}
var np = (() => {
    class e {
      constructor(n) {
        (this._injector = n),
          (this._modules = []),
          (this._destroyListeners = []),
          (this._destroyed = !1);
      }
      bootstrapModuleFactory(n, r) {
        let o = r?.scheduleInRootZone,
          i = () =>
            Ry(
              r?.ngZone,
              K(
                D(
                  {},
                  ep({
                    eventCoalescing: r?.ngZoneEventCoalescing,
                    runCoalescing: r?.ngZoneRunCoalescing,
                  })
                ),
                { scheduleInRootZone: o }
              )
            ),
          s = r?.ignoreChangesOutsideZone,
          a = [
            BE({ ngZoneFactory: i, ignoreChangesOutsideZone: s }),
            { provide: Hn, useExisting: HE },
          ],
          c = Lw(n.moduleType, this.injector, a);
        return GE({ moduleRef: c, allPlatformModules: this._modules });
      }
      bootstrapModule(n, r = []) {
        let o = Xh({}, r);
        return VE(this.injector, o, n).then((i) =>
          this.bootstrapModuleFactory(i, o)
        );
      }
      onDestroy(n) {
        this._destroyListeners.push(n);
      }
      get injector() {
        return this._injector;
      }
      destroy() {
        if (this._destroyed) throw new I(404, !1);
        this._modules.slice().forEach((r) => r.destroy()),
          this._destroyListeners.forEach((r) => r());
        let n = this._injector.get(eu, null);
        n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
      }
      get destroyed() {
        return this._destroyed;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(Ve));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "platform" });
      }
    }
    return e;
  })(),
  vr = null,
  rp = new w("");
function WE(e) {
  if (vr && !vr.get(rp, !1)) throw new I(400, !1);
  OE(), (vr = e);
  let t = e.get(np);
  return QE(e), t;
}
function tu(e, t, n = []) {
  let r = `Platform: ${t}`,
    o = new w(r);
  return (i = []) => {
    let s = op();
    if (!s || s.injector.get(rp, !1)) {
      let a = [...n, ...i, { provide: o, useValue: !0 }];
      e ? e(a) : WE(ZE(a, r));
    }
    return YE(o);
  };
}
function ZE(e = [], t) {
  return Ve.create({
    name: t,
    providers: [
      { provide: Ci, useValue: "platform" },
      { provide: eu, useValue: new Set([() => (vr = null)]) },
      ...e,
    ],
  });
}
function YE(e) {
  let t = op();
  if (!t) throw new I(401, !1);
  return t;
}
function op() {
  return vr?.get(np) ?? null;
}
function QE(e) {
  e.get(Nc, null)?.forEach((n) => n());
}
var jr = (() => {
  class e {
    static {
      this.__NG_ELEMENT_ID__ = KE;
    }
  }
  return e;
})();
function KE(e) {
  return JE(Re(), Z(), (e & 16) === 16);
}
function JE(e, t, n) {
  if (Mi(e) && !n) {
    let r = Gt(e.index, t);
    return new fn(r, r);
  } else if (e.type & 175) {
    let r = t[st];
    return new fn(r, t);
  }
  return null;
}
var oc = class {
    constructor() {}
    supports(t) {
      return qh(t);
    }
    create(t) {
      return new ic(t);
    }
  },
  XE = (e, t) => t,
  ic = class {
    constructor(t) {
      (this.length = 0),
        (this._linkedRecords = null),
        (this._unlinkedRecords = null),
        (this._previousItHead = null),
        (this._itHead = null),
        (this._itTail = null),
        (this._additionsHead = null),
        (this._additionsTail = null),
        (this._movesHead = null),
        (this._movesTail = null),
        (this._removalsHead = null),
        (this._removalsTail = null),
        (this._identityChangesHead = null),
        (this._identityChangesTail = null),
        (this._trackByFn = t || XE);
    }
    forEachItem(t) {
      let n;
      for (n = this._itHead; n !== null; n = n._next) t(n);
    }
    forEachOperation(t) {
      let n = this._itHead,
        r = this._removalsHead,
        o = 0,
        i = null;
      for (; n || r; ) {
        let s = !r || (n && n.currentIndex < Fd(r, o, i)) ? n : r,
          a = Fd(s, o, i),
          c = s.currentIndex;
        if (s === r) o--, (r = r._nextRemoved);
        else if (((n = n._next), s.previousIndex == null)) o++;
        else {
          i || (i = []);
          let u = a - o,
            l = c - o;
          if (u != l) {
            for (let h = 0; h < u; h++) {
              let f = h < i.length ? i[h] : (i[h] = 0),
                g = f + h;
              l <= g && g < u && (i[h] = f + 1);
            }
            let d = s.previousIndex;
            i[d] = l - u;
          }
        }
        a !== c && t(s, a, c);
      }
    }
    forEachPreviousItem(t) {
      let n;
      for (n = this._previousItHead; n !== null; n = n._nextPrevious) t(n);
    }
    forEachAddedItem(t) {
      let n;
      for (n = this._additionsHead; n !== null; n = n._nextAdded) t(n);
    }
    forEachMovedItem(t) {
      let n;
      for (n = this._movesHead; n !== null; n = n._nextMoved) t(n);
    }
    forEachRemovedItem(t) {
      let n;
      for (n = this._removalsHead; n !== null; n = n._nextRemoved) t(n);
    }
    forEachIdentityChange(t) {
      let n;
      for (n = this._identityChangesHead; n !== null; n = n._nextIdentityChange)
        t(n);
    }
    diff(t) {
      if ((t == null && (t = []), !qh(t))) throw new I(900, !1);
      return this.check(t) ? this : null;
    }
    onDestroy() {}
    check(t) {
      this._reset();
      let n = this._itHead,
        r = !1,
        o,
        i,
        s;
      if (Array.isArray(t)) {
        this.length = t.length;
        for (let a = 0; a < this.length; a++)
          (i = t[a]),
            (s = this._trackByFn(a, i)),
            n === null || !Object.is(n.trackById, s)
              ? ((n = this._mismatch(n, i, s, a)), (r = !0))
              : (r && (n = this._verifyReinsertion(n, i, s, a)),
                Object.is(n.item, i) || this._addIdentityChange(n, i)),
            (n = n._next);
      } else
        (o = 0),
          jw(t, (a) => {
            (s = this._trackByFn(o, a)),
              n === null || !Object.is(n.trackById, s)
                ? ((n = this._mismatch(n, a, s, o)), (r = !0))
                : (r && (n = this._verifyReinsertion(n, a, s, o)),
                  Object.is(n.item, a) || this._addIdentityChange(n, a)),
              (n = n._next),
              o++;
          }),
          (this.length = o);
      return this._truncate(n), (this.collection = t), this.isDirty;
    }
    get isDirty() {
      return (
        this._additionsHead !== null ||
        this._movesHead !== null ||
        this._removalsHead !== null ||
        this._identityChangesHead !== null
      );
    }
    _reset() {
      if (this.isDirty) {
        let t;
        for (t = this._previousItHead = this._itHead; t !== null; t = t._next)
          t._nextPrevious = t._next;
        for (t = this._additionsHead; t !== null; t = t._nextAdded)
          t.previousIndex = t.currentIndex;
        for (
          this._additionsHead = this._additionsTail = null, t = this._movesHead;
          t !== null;
          t = t._nextMoved
        )
          t.previousIndex = t.currentIndex;
        (this._movesHead = this._movesTail = null),
          (this._removalsHead = this._removalsTail = null),
          (this._identityChangesHead = this._identityChangesTail = null);
      }
    }
    _mismatch(t, n, r, o) {
      let i;
      return (
        t === null ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
        (t =
          this._unlinkedRecords === null
            ? null
            : this._unlinkedRecords.get(r, null)),
        t !== null
          ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
            this._reinsertAfter(t, i, o))
          : ((t =
              this._linkedRecords === null
                ? null
                : this._linkedRecords.get(r, o)),
            t !== null
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new sc(n, r), i, o))),
        t
      );
    }
    _verifyReinsertion(t, n, r, o) {
      let i =
        this._unlinkedRecords === null
          ? null
          : this._unlinkedRecords.get(r, null);
      return (
        i !== null
          ? (t = this._reinsertAfter(i, t._prev, o))
          : t.currentIndex != o &&
            ((t.currentIndex = o), this._addToMoves(t, o)),
        t
      );
    }
    _truncate(t) {
      for (; t !== null; ) {
        let n = t._next;
        this._addToRemovals(this._unlink(t)), (t = n);
      }
      this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
        this._additionsTail !== null && (this._additionsTail._nextAdded = null),
        this._movesTail !== null && (this._movesTail._nextMoved = null),
        this._itTail !== null && (this._itTail._next = null),
        this._removalsTail !== null && (this._removalsTail._nextRemoved = null),
        this._identityChangesTail !== null &&
          (this._identityChangesTail._nextIdentityChange = null);
    }
    _reinsertAfter(t, n, r) {
      this._unlinkedRecords !== null && this._unlinkedRecords.remove(t);
      let o = t._prevRemoved,
        i = t._nextRemoved;
      return (
        o === null ? (this._removalsHead = i) : (o._nextRemoved = i),
        i === null ? (this._removalsTail = o) : (i._prevRemoved = o),
        this._insertAfter(t, n, r),
        this._addToMoves(t, r),
        t
      );
    }
    _moveAfter(t, n, r) {
      return (
        this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t
      );
    }
    _addAfter(t, n, r) {
      return (
        this._insertAfter(t, n, r),
        this._additionsTail === null
          ? (this._additionsTail = this._additionsHead = t)
          : (this._additionsTail = this._additionsTail._nextAdded = t),
        t
      );
    }
    _insertAfter(t, n, r) {
      let o = n === null ? this._itHead : n._next;
      return (
        (t._next = o),
        (t._prev = n),
        o === null ? (this._itTail = t) : (o._prev = t),
        n === null ? (this._itHead = t) : (n._next = t),
        this._linkedRecords === null && (this._linkedRecords = new vi()),
        this._linkedRecords.put(t),
        (t.currentIndex = r),
        t
      );
    }
    _remove(t) {
      return this._addToRemovals(this._unlink(t));
    }
    _unlink(t) {
      this._linkedRecords !== null && this._linkedRecords.remove(t);
      let n = t._prev,
        r = t._next;
      return (
        n === null ? (this._itHead = r) : (n._next = r),
        r === null ? (this._itTail = n) : (r._prev = n),
        t
      );
    }
    _addToMoves(t, n) {
      return (
        t.previousIndex === n ||
          (this._movesTail === null
            ? (this._movesTail = this._movesHead = t)
            : (this._movesTail = this._movesTail._nextMoved = t)),
        t
      );
    }
    _addToRemovals(t) {
      return (
        this._unlinkedRecords === null && (this._unlinkedRecords = new vi()),
        this._unlinkedRecords.put(t),
        (t.currentIndex = null),
        (t._nextRemoved = null),
        this._removalsTail === null
          ? ((this._removalsTail = this._removalsHead = t),
            (t._prevRemoved = null))
          : ((t._prevRemoved = this._removalsTail),
            (this._removalsTail = this._removalsTail._nextRemoved = t)),
        t
      );
    }
    _addIdentityChange(t, n) {
      return (
        (t.item = n),
        this._identityChangesTail === null
          ? (this._identityChangesTail = this._identityChangesHead = t)
          : (this._identityChangesTail =
              this._identityChangesTail._nextIdentityChange =
                t),
        t
      );
    }
  },
  sc = class {
    constructor(t, n) {
      (this.item = t),
        (this.trackById = n),
        (this.currentIndex = null),
        (this.previousIndex = null),
        (this._nextPrevious = null),
        (this._prev = null),
        (this._next = null),
        (this._prevDup = null),
        (this._nextDup = null),
        (this._prevRemoved = null),
        (this._nextRemoved = null),
        (this._nextAdded = null),
        (this._nextMoved = null),
        (this._nextIdentityChange = null);
    }
  },
  ac = class {
    constructor() {
      (this._head = null), (this._tail = null);
    }
    add(t) {
      this._head === null
        ? ((this._head = this._tail = t),
          (t._nextDup = null),
          (t._prevDup = null))
        : ((this._tail._nextDup = t),
          (t._prevDup = this._tail),
          (t._nextDup = null),
          (this._tail = t));
    }
    get(t, n) {
      let r;
      for (r = this._head; r !== null; r = r._nextDup)
        if ((n === null || n <= r.currentIndex) && Object.is(r.trackById, t))
          return r;
      return null;
    }
    remove(t) {
      let n = t._prevDup,
        r = t._nextDup;
      return (
        n === null ? (this._head = r) : (n._nextDup = r),
        r === null ? (this._tail = n) : (r._prevDup = n),
        this._head === null
      );
    }
  },
  vi = class {
    constructor() {
      this.map = new Map();
    }
    put(t) {
      let n = t.trackById,
        r = this.map.get(n);
      r || ((r = new ac()), this.map.set(n, r)), r.add(t);
    }
    get(t, n) {
      let r = t,
        o = this.map.get(r);
      return o ? o.get(t, n) : null;
    }
    remove(t) {
      let n = t.trackById;
      return this.map.get(n).remove(t) && this.map.delete(n), t;
    }
    get isEmpty() {
      return this.map.size === 0;
    }
    clear() {
      this.map.clear();
    }
  };
function Fd(e, t, n) {
  let r = e.previousIndex;
  if (r === null) return r;
  let o = 0;
  return n && r < n.length && (o = n[r]), r + t + o;
}
function kd() {
  return new nu([new oc()]);
}
var nu = (() => {
  class e {
    static {
      this.ɵprov = C({ token: e, providedIn: "root", factory: kd });
    }
    constructor(n) {
      this.factories = n;
    }
    static create(n, r) {
      if (r != null) {
        let o = r.factories.slice();
        n = n.concat(o);
      }
      return new e(n);
    }
    static extend(n) {
      return {
        provide: e,
        useFactory: (r) => e.create(n, r || kd()),
        deps: [[e, new uc(), new Ei()]],
      };
    }
    find(n) {
      let r = this.factories.find((o) => o.supports(n));
      if (r != null) return r;
      throw new I(901, !1);
    }
  }
  return e;
})();
var ip = tu(null, "core", []),
  sp = (() => {
    class e {
      constructor(n) {}
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(Mt));
        };
      }
      static {
        this.ɵmod = Ee({ type: e });
      }
      static {
        this.ɵinj = we({});
      }
    }
    return e;
  })();
function Vr(e) {
  return typeof e == "boolean" ? e : e != null && e !== "false";
}
function ap(e) {
  let t = Bt(e);
  if (!t) return null;
  let n = new qn(t);
  return {
    get selector() {
      return n.selector;
    },
    get type() {
      return n.componentType;
    },
    get inputs() {
      return n.inputs;
    },
    get outputs() {
      return n.outputs;
    },
    get ngContentSelectors() {
      return n.ngContentSelectors;
    },
    get isStandalone() {
      return t.standalone;
    },
    get isSignal() {
      return t.signals;
    },
  };
}
var vp = null;
function mn() {
  return vp;
}
function yp(e) {
  vp ??= e;
}
var es = class {};
var pe = new w(""),
  hu = (() => {
    class e {
      historyGo(n) {
        throw new Error("");
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({
          token: e,
          factory: () => p(tI),
          providedIn: "platform",
        });
      }
    }
    return e;
  })(),
  Dp = new w(""),
  tI = (() => {
    class e extends hu {
      constructor() {
        super(),
          (this._doc = p(pe)),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return mn().getBaseHref(this._doc);
      }
      onPopState(n) {
        let r = mn().getGlobalEventTarget(this._doc, "window");
        return (
          r.addEventListener("popstate", n, !1),
          () => r.removeEventListener("popstate", n)
        );
      }
      onHashChange(n) {
        let r = mn().getGlobalEventTarget(this._doc, "window");
        return (
          r.addEventListener("hashchange", n, !1),
          () => r.removeEventListener("hashchange", n)
        );
      }
      get href() {
        return this._location.href;
      }
      get protocol() {
        return this._location.protocol;
      }
      get hostname() {
        return this._location.hostname;
      }
      get port() {
        return this._location.port;
      }
      get pathname() {
        return this._location.pathname;
      }
      get search() {
        return this._location.search;
      }
      get hash() {
        return this._location.hash;
      }
      set pathname(n) {
        this._location.pathname = n;
      }
      pushState(n, r, o) {
        this._history.pushState(n, r, o);
      }
      replaceState(n, r, o) {
        this._history.replaceState(n, r, o);
      }
      forward() {
        this._history.forward();
      }
      back() {
        this._history.back();
      }
      historyGo(n = 0) {
        this._history.go(n);
      }
      getState() {
        return this._history.state;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({
          token: e,
          factory: () => new e(),
          providedIn: "platform",
        });
      }
    }
    return e;
  })();
function pu(e, t) {
  if (e.length == 0) return t;
  if (t.length == 0) return e;
  let n = 0;
  return (
    e.endsWith("/") && n++,
    t.startsWith("/") && n++,
    n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + "/" + t
  );
}
function cp(e) {
  let t = e.match(/#|\?|$/),
    n = (t && t.index) || e.length,
    r = n - (e[n - 1] === "/" ? 1 : 0);
  return e.slice(0, r) + e.slice(n);
}
function Tt(e) {
  return e && e[0] !== "?" ? "?" + e : e;
}
var xt = (() => {
    class e {
      historyGo(n) {
        throw new Error("");
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: () => p(gu), providedIn: "root" });
      }
    }
    return e;
  })(),
  wp = new w(""),
  gu = (() => {
    class e extends xt {
      constructor(n, r) {
        super(),
          (this._platformLocation = n),
          (this._removeListenerFns = []),
          (this._baseHref =
            r ??
            this._platformLocation.getBaseHrefFromDOM() ??
            p(pe).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(n) {
        return pu(this._baseHref, n);
      }
      path(n = !1) {
        let r =
            this._platformLocation.pathname + Tt(this._platformLocation.search),
          o = this._platformLocation.hash;
        return o && n ? `${r}${o}` : r;
      }
      pushState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + Tt(i));
        this._platformLocation.pushState(n, r, s);
      }
      replaceState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + Tt(i));
        this._platformLocation.replaceState(n, r, s);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(hu), b(wp, 8));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  Ep = (() => {
    class e extends xt {
      constructor(n, r) {
        super(),
          (this._platformLocation = n),
          (this._baseHref = ""),
          (this._removeListenerFns = []),
          r != null && (this._baseHref = r);
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      path(n = !1) {
        let r = this._platformLocation.hash ?? "#";
        return r.length > 0 ? r.substring(1) : r;
      }
      prepareExternalUrl(n) {
        let r = pu(this._baseHref, n);
        return r.length > 0 ? "#" + r : r;
      }
      pushState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + Tt(i));
        s.length == 0 && (s = this._platformLocation.pathname),
          this._platformLocation.pushState(n, r, s);
      }
      replaceState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + Tt(i));
        s.length == 0 && (s = this._platformLocation.pathname),
          this._platformLocation.replaceState(n, r, s);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(hu), b(wp, 8));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  Xn = (() => {
    class e {
      constructor(n) {
        (this._subject = new me()),
          (this._urlChangeListeners = []),
          (this._urlChangeSubscription = null),
          (this._locationStrategy = n);
        let r = this._locationStrategy.getBaseHref();
        (this._basePath = oI(cp(up(r)))),
          this._locationStrategy.onPopState((o) => {
            this._subject.emit({
              url: this.path(!0),
              pop: !0,
              state: o.state,
              type: o.type,
            });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(),
          (this._urlChangeListeners = []);
      }
      path(n = !1) {
        return this.normalize(this._locationStrategy.path(n));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(n, r = "") {
        return this.path() == this.normalize(n + Tt(r));
      }
      normalize(n) {
        return e.stripTrailingSlash(rI(this._basePath, up(n)));
      }
      prepareExternalUrl(n) {
        return (
          n && n[0] !== "/" && (n = "/" + n),
          this._locationStrategy.prepareExternalUrl(n)
        );
      }
      go(n, r = "", o = null) {
        this._locationStrategy.pushState(o, "", n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Tt(r)), o);
      }
      replaceState(n, r = "", o = null) {
        this._locationStrategy.replaceState(o, "", n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Tt(r)), o);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(n = 0) {
        this._locationStrategy.historyGo?.(n);
      }
      onUrlChange(n) {
        return (
          this._urlChangeListeners.push(n),
          (this._urlChangeSubscription ??= this.subscribe((r) => {
            this._notifyUrlChangeListeners(r.url, r.state);
          })),
          () => {
            let r = this._urlChangeListeners.indexOf(n);
            this._urlChangeListeners.splice(r, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(n = "", r) {
        this._urlChangeListeners.forEach((o) => o(n, r));
      }
      subscribe(n, r, o) {
        return this._subject.subscribe({ next: n, error: r, complete: o });
      }
      static {
        this.normalizeQueryParams = Tt;
      }
      static {
        this.joinWithSlash = pu;
      }
      static {
        this.stripTrailingSlash = cp;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(xt));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: () => nI(), providedIn: "root" });
      }
    }
    return e;
  })();
function nI() {
  return new Xn(b(xt));
}
function rI(e, t) {
  if (!e || !t.startsWith(e)) return t;
  let n = t.substring(e.length);
  return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : t;
}
function up(e) {
  return e.replace(/\/index.html$/, "");
}
function oI(e) {
  if (new RegExp("^(https?:)?//").test(e)) {
    let [, n] = e.split(/\/\/[^\/]+/);
    return n;
  }
  return e;
}
var Ip = {
    ADP: [void 0, void 0, 0],
    AFN: [void 0, "\u060B", 0],
    ALL: [void 0, void 0, 0],
    AMD: [void 0, "\u058F", 2],
    AOA: [void 0, "Kz"],
    ARS: [void 0, "$"],
    AUD: ["A$", "$"],
    AZN: [void 0, "\u20BC"],
    BAM: [void 0, "KM"],
    BBD: [void 0, "$"],
    BDT: [void 0, "\u09F3"],
    BHD: [void 0, void 0, 3],
    BIF: [void 0, void 0, 0],
    BMD: [void 0, "$"],
    BND: [void 0, "$"],
    BOB: [void 0, "Bs"],
    BRL: ["R$"],
    BSD: [void 0, "$"],
    BWP: [void 0, "P"],
    BYN: [void 0, void 0, 2],
    BYR: [void 0, void 0, 0],
    BZD: [void 0, "$"],
    CAD: ["CA$", "$", 2],
    CHF: [void 0, void 0, 2],
    CLF: [void 0, void 0, 4],
    CLP: [void 0, "$", 0],
    CNY: ["CN\xA5", "\xA5"],
    COP: [void 0, "$", 2],
    CRC: [void 0, "\u20A1", 2],
    CUC: [void 0, "$"],
    CUP: [void 0, "$"],
    CZK: [void 0, "K\u010D", 2],
    DJF: [void 0, void 0, 0],
    DKK: [void 0, "kr", 2],
    DOP: [void 0, "$"],
    EGP: [void 0, "E\xA3"],
    ESP: [void 0, "\u20A7", 0],
    EUR: ["\u20AC"],
    FJD: [void 0, "$"],
    FKP: [void 0, "\xA3"],
    GBP: ["\xA3"],
    GEL: [void 0, "\u20BE"],
    GHS: [void 0, "GH\u20B5"],
    GIP: [void 0, "\xA3"],
    GNF: [void 0, "FG", 0],
    GTQ: [void 0, "Q"],
    GYD: [void 0, "$", 2],
    HKD: ["HK$", "$"],
    HNL: [void 0, "L"],
    HRK: [void 0, "kn"],
    HUF: [void 0, "Ft", 2],
    IDR: [void 0, "Rp", 2],
    ILS: ["\u20AA"],
    INR: ["\u20B9"],
    IQD: [void 0, void 0, 0],
    IRR: [void 0, void 0, 0],
    ISK: [void 0, "kr", 0],
    ITL: [void 0, void 0, 0],
    JMD: [void 0, "$"],
    JOD: [void 0, void 0, 3],
    JPY: ["\xA5", void 0, 0],
    KHR: [void 0, "\u17DB"],
    KMF: [void 0, "CF", 0],
    KPW: [void 0, "\u20A9", 0],
    KRW: ["\u20A9", void 0, 0],
    KWD: [void 0, void 0, 3],
    KYD: [void 0, "$"],
    KZT: [void 0, "\u20B8"],
    LAK: [void 0, "\u20AD", 0],
    LBP: [void 0, "L\xA3", 0],
    LKR: [void 0, "Rs"],
    LRD: [void 0, "$"],
    LTL: [void 0, "Lt"],
    LUF: [void 0, void 0, 0],
    LVL: [void 0, "Ls"],
    LYD: [void 0, void 0, 3],
    MGA: [void 0, "Ar", 0],
    MGF: [void 0, void 0, 0],
    MMK: [void 0, "K", 0],
    MNT: [void 0, "\u20AE", 2],
    MRO: [void 0, void 0, 0],
    MUR: [void 0, "Rs", 2],
    MXN: ["MX$", "$"],
    MYR: [void 0, "RM"],
    NAD: [void 0, "$"],
    NGN: [void 0, "\u20A6"],
    NIO: [void 0, "C$"],
    NOK: [void 0, "kr", 2],
    NPR: [void 0, "Rs"],
    NZD: ["NZ$", "$"],
    OMR: [void 0, void 0, 3],
    PHP: ["\u20B1"],
    PKR: [void 0, "Rs", 2],
    PLN: [void 0, "z\u0142"],
    PYG: [void 0, "\u20B2", 0],
    RON: [void 0, "lei"],
    RSD: [void 0, void 0, 0],
    RUB: [void 0, "\u20BD"],
    RWF: [void 0, "RF", 0],
    SBD: [void 0, "$"],
    SEK: [void 0, "kr", 2],
    SGD: [void 0, "$"],
    SHP: [void 0, "\xA3"],
    SLE: [void 0, void 0, 2],
    SLL: [void 0, void 0, 0],
    SOS: [void 0, void 0, 0],
    SRD: [void 0, "$"],
    SSP: [void 0, "\xA3"],
    STD: [void 0, void 0, 0],
    STN: [void 0, "Db"],
    SYP: [void 0, "\xA3", 0],
    THB: [void 0, "\u0E3F"],
    TMM: [void 0, void 0, 0],
    TND: [void 0, void 0, 3],
    TOP: [void 0, "T$"],
    TRL: [void 0, void 0, 0],
    TRY: [void 0, "\u20BA"],
    TTD: [void 0, "$"],
    TWD: ["NT$", "$", 2],
    TZS: [void 0, void 0, 2],
    UAH: [void 0, "\u20B4"],
    UGX: [void 0, void 0, 0],
    USD: ["$"],
    UYI: [void 0, void 0, 0],
    UYU: [void 0, "$"],
    UYW: [void 0, void 0, 4],
    UZS: [void 0, void 0, 2],
    VEF: [void 0, "Bs", 2],
    VND: ["\u20AB", void 0, 0],
    VUV: [void 0, void 0, 0],
    XAF: ["FCFA", void 0, 0],
    XCD: ["EC$", "$"],
    XOF: ["F\u202FCFA", void 0, 0],
    XPF: ["CFPF", void 0, 0],
    XXX: ["\xA4"],
    YER: [void 0, void 0, 0],
    ZAR: [void 0, "R"],
    ZMK: [void 0, void 0, 0],
    ZMW: [void 0, "ZK"],
    ZWD: [void 0, void 0, 0],
  },
  mu = (function (e) {
    return (
      (e[(e.Decimal = 0)] = "Decimal"),
      (e[(e.Percent = 1)] = "Percent"),
      (e[(e.Currency = 2)] = "Currency"),
      (e[(e.Scientific = 3)] = "Scientific"),
      e
    );
  })(mu || {});
var Ce = (function (e) {
    return (
      (e[(e.Format = 0)] = "Format"), (e[(e.Standalone = 1)] = "Standalone"), e
    );
  })(Ce || {}),
  Y = (function (e) {
    return (
      (e[(e.Narrow = 0)] = "Narrow"),
      (e[(e.Abbreviated = 1)] = "Abbreviated"),
      (e[(e.Wide = 2)] = "Wide"),
      (e[(e.Short = 3)] = "Short"),
      e
    );
  })(Y || {}),
  Oe = (function (e) {
    return (
      (e[(e.Short = 0)] = "Short"),
      (e[(e.Medium = 1)] = "Medium"),
      (e[(e.Long = 2)] = "Long"),
      (e[(e.Full = 3)] = "Full"),
      e
    );
  })(Oe || {}),
  fe = {
    Decimal: 0,
    Group: 1,
    List: 2,
    PercentSign: 3,
    PlusSign: 4,
    MinusSign: 5,
    Exponential: 6,
    SuperscriptingExponent: 7,
    PerMille: 8,
    Infinity: 9,
    NaN: 10,
    TimeSeparator: 11,
    CurrencyDecimal: 12,
    CurrencyGroup: 13,
  };
function iI(e) {
  return _e(e)[X.LocaleId];
}
function sI(e, t, n) {
  let r = _e(e),
    o = [r[X.DayPeriodsFormat], r[X.DayPeriodsStandalone]],
    i = $e(o, t);
  return $e(i, n);
}
function aI(e, t, n) {
  let r = _e(e),
    o = [r[X.DaysFormat], r[X.DaysStandalone]],
    i = $e(o, t);
  return $e(i, n);
}
function cI(e, t, n) {
  let r = _e(e),
    o = [r[X.MonthsFormat], r[X.MonthsStandalone]],
    i = $e(o, t);
  return $e(i, n);
}
function uI(e, t) {
  let r = _e(e)[X.Eras];
  return $e(r, t);
}
function qi(e, t) {
  let n = _e(e);
  return $e(n[X.DateFormat], t);
}
function Wi(e, t) {
  let n = _e(e);
  return $e(n[X.TimeFormat], t);
}
function Zi(e, t) {
  let r = _e(e)[X.DateTimeFormat];
  return $e(r, t);
}
function Xe(e, t) {
  let n = _e(e),
    r = n[X.NumberSymbols][t];
  if (typeof r > "u") {
    if (t === fe.CurrencyDecimal) return n[X.NumberSymbols][fe.Decimal];
    if (t === fe.CurrencyGroup) return n[X.NumberSymbols][fe.Group];
  }
  return r;
}
function Cp(e, t) {
  return _e(e)[X.NumberFormats][t];
}
function lI(e) {
  return _e(e)[X.Currencies];
}
function bp(e) {
  if (!e[X.ExtraData])
    throw new Error(
      `Missing extra locale data for the locale "${
        e[X.LocaleId]
      }". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`
    );
}
function dI(e) {
  let t = _e(e);
  return (
    bp(t),
    (t[X.ExtraData][2] || []).map((r) =>
      typeof r == "string" ? ru(r) : [ru(r[0]), ru(r[1])]
    )
  );
}
function fI(e, t, n) {
  let r = _e(e);
  bp(r);
  let o = [r[X.ExtraData][0], r[X.ExtraData][1]],
    i = $e(o, t) || [];
  return $e(i, n) || [];
}
function $e(e, t) {
  for (let n = t; n > -1; n--) if (typeof e[n] < "u") return e[n];
  throw new Error("Locale data API: locale data undefined");
}
function ru(e) {
  let [t, n] = e.split(":");
  return { hours: +t, minutes: +n };
}
function hI(e, t, n = "en") {
  let r = lI(n)[e] || Ip[e] || [],
    o = r[1];
  return t === "narrow" && typeof o == "string" ? o : r[0] || e;
}
var pI = 2;
function gI(e) {
  let t,
    n = Ip[e];
  return n && (t = n[2]), typeof t == "number" ? t : pI;
}
var mI =
    /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
  Yi = {},
  vI =
    /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,
  _t = (function (e) {
    return (
      (e[(e.Short = 0)] = "Short"),
      (e[(e.ShortGMT = 1)] = "ShortGMT"),
      (e[(e.Long = 2)] = "Long"),
      (e[(e.Extended = 3)] = "Extended"),
      e
    );
  })(_t || {}),
  $ = (function (e) {
    return (
      (e[(e.FullYear = 0)] = "FullYear"),
      (e[(e.Month = 1)] = "Month"),
      (e[(e.Date = 2)] = "Date"),
      (e[(e.Hours = 3)] = "Hours"),
      (e[(e.Minutes = 4)] = "Minutes"),
      (e[(e.Seconds = 5)] = "Seconds"),
      (e[(e.FractionalSeconds = 6)] = "FractionalSeconds"),
      (e[(e.Day = 7)] = "Day"),
      e
    );
  })($ || {}),
  B = (function (e) {
    return (
      (e[(e.DayPeriods = 0)] = "DayPeriods"),
      (e[(e.Days = 1)] = "Days"),
      (e[(e.Months = 2)] = "Months"),
      (e[(e.Eras = 3)] = "Eras"),
      e
    );
  })(B || {});
function yI(e, t, n, r) {
  let o = TI(e);
  t = St(n, t) || t;
  let s = [],
    a;
  for (; t; )
    if (((a = vI.exec(t)), a)) {
      s = s.concat(a.slice(1));
      let l = s.pop();
      if (!l) break;
      t = l;
    } else {
      s.push(t);
      break;
    }
  let c = o.getTimezoneOffset();
  r && ((c = Sp(r, c)), (o = SI(o, r, !0)));
  let u = "";
  return (
    s.forEach((l) => {
      let d = bI(l);
      u += d
        ? d(o, n, c)
        : l === "''"
        ? "'"
        : l.replace(/(^'|'$)/g, "").replace(/''/g, "'");
    }),
    u
  );
}
function ts(e, t, n) {
  let r = new Date(0);
  return r.setFullYear(e, t, n), r.setHours(0, 0, 0), r;
}
function St(e, t) {
  let n = iI(e);
  if (((Yi[n] ??= {}), Yi[n][t])) return Yi[n][t];
  let r = "";
  switch (t) {
    case "shortDate":
      r = qi(e, Oe.Short);
      break;
    case "mediumDate":
      r = qi(e, Oe.Medium);
      break;
    case "longDate":
      r = qi(e, Oe.Long);
      break;
    case "fullDate":
      r = qi(e, Oe.Full);
      break;
    case "shortTime":
      r = Wi(e, Oe.Short);
      break;
    case "mediumTime":
      r = Wi(e, Oe.Medium);
      break;
    case "longTime":
      r = Wi(e, Oe.Long);
      break;
    case "fullTime":
      r = Wi(e, Oe.Full);
      break;
    case "short":
      let o = St(e, "shortTime"),
        i = St(e, "shortDate");
      r = Qi(Zi(e, Oe.Short), [o, i]);
      break;
    case "medium":
      let s = St(e, "mediumTime"),
        a = St(e, "mediumDate");
      r = Qi(Zi(e, Oe.Medium), [s, a]);
      break;
    case "long":
      let c = St(e, "longTime"),
        u = St(e, "longDate");
      r = Qi(Zi(e, Oe.Long), [c, u]);
      break;
    case "full":
      let l = St(e, "fullTime"),
        d = St(e, "fullDate");
      r = Qi(Zi(e, Oe.Full), [l, d]);
      break;
  }
  return r && (Yi[n][t] = r), r;
}
function Qi(e, t) {
  return (
    t &&
      (e = e.replace(/\{([^}]+)}/g, function (n, r) {
        return t != null && r in t ? t[r] : n;
      })),
    e
  );
}
function Je(e, t, n = "-", r, o) {
  let i = "";
  (e < 0 || (o && e <= 0)) && (o ? (e = -e + 1) : ((e = -e), (i = n)));
  let s = String(e);
  for (; s.length < t; ) s = "0" + s;
  return r && (s = s.slice(s.length - t)), i + s;
}
function DI(e, t) {
  return Je(e, 3).substring(0, t);
}
function oe(e, t, n = 0, r = !1, o = !1) {
  return function (i, s) {
    let a = wI(e, i);
    if (((n > 0 || a > -n) && (a += n), e === $.Hours))
      a === 0 && n === -12 && (a = 12);
    else if (e === $.FractionalSeconds) return DI(a, t);
    let c = Xe(s, fe.MinusSign);
    return Je(a, t, c, r, o);
  };
}
function wI(e, t) {
  switch (e) {
    case $.FullYear:
      return t.getFullYear();
    case $.Month:
      return t.getMonth();
    case $.Date:
      return t.getDate();
    case $.Hours:
      return t.getHours();
    case $.Minutes:
      return t.getMinutes();
    case $.Seconds:
      return t.getSeconds();
    case $.FractionalSeconds:
      return t.getMilliseconds();
    case $.Day:
      return t.getDay();
    default:
      throw new Error(`Unknown DateType value "${e}".`);
  }
}
function Q(e, t, n = Ce.Format, r = !1) {
  return function (o, i) {
    return EI(o, i, e, t, n, r);
  };
}
function EI(e, t, n, r, o, i) {
  switch (n) {
    case B.Months:
      return cI(t, o, r)[e.getMonth()];
    case B.Days:
      return aI(t, o, r)[e.getDay()];
    case B.DayPeriods:
      let s = e.getHours(),
        a = e.getMinutes();
      if (i) {
        let u = dI(t),
          l = fI(t, o, r),
          d = u.findIndex((h) => {
            if (Array.isArray(h)) {
              let [f, g] = h,
                y = s >= f.hours && a >= f.minutes,
                E = s < g.hours || (s === g.hours && a < g.minutes);
              if (f.hours < g.hours) {
                if (y && E) return !0;
              } else if (y || E) return !0;
            } else if (h.hours === s && h.minutes === a) return !0;
            return !1;
          });
        if (d !== -1) return l[d];
      }
      return sI(t, o, r)[s < 12 ? 0 : 1];
    case B.Eras:
      return uI(t, r)[e.getFullYear() <= 0 ? 0 : 1];
    default:
      let c = n;
      throw new Error(`unexpected translation type ${c}`);
  }
}
function Ki(e) {
  return function (t, n, r) {
    let o = -1 * r,
      i = Xe(n, fe.MinusSign),
      s = o > 0 ? Math.floor(o / 60) : Math.ceil(o / 60);
    switch (e) {
      case _t.Short:
        return (o >= 0 ? "+" : "") + Je(s, 2, i) + Je(Math.abs(o % 60), 2, i);
      case _t.ShortGMT:
        return "GMT" + (o >= 0 ? "+" : "") + Je(s, 1, i);
      case _t.Long:
        return (
          "GMT" +
          (o >= 0 ? "+" : "") +
          Je(s, 2, i) +
          ":" +
          Je(Math.abs(o % 60), 2, i)
        );
      case _t.Extended:
        return r === 0
          ? "Z"
          : (o >= 0 ? "+" : "") +
              Je(s, 2, i) +
              ":" +
              Je(Math.abs(o % 60), 2, i);
      default:
        throw new Error(`Unknown zone width "${e}"`);
    }
  };
}
var II = 0,
  Xi = 4;
function CI(e) {
  let t = ts(e, II, 1).getDay();
  return ts(e, 0, 1 + (t <= Xi ? Xi : Xi + 7) - t);
}
function Mp(e) {
  let t = e.getDay(),
    n = t === 0 ? -3 : Xi - t;
  return ts(e.getFullYear(), e.getMonth(), e.getDate() + n);
}
function ou(e, t = !1) {
  return function (n, r) {
    let o;
    if (t) {
      let i = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1,
        s = n.getDate();
      o = 1 + Math.floor((s + i) / 7);
    } else {
      let i = Mp(n),
        s = CI(i.getFullYear()),
        a = i.getTime() - s.getTime();
      o = 1 + Math.round(a / 6048e5);
    }
    return Je(o, e, Xe(r, fe.MinusSign));
  };
}
function Ji(e, t = !1) {
  return function (n, r) {
    let i = Mp(n).getFullYear();
    return Je(i, e, Xe(r, fe.MinusSign), t);
  };
}
var iu = {};
function bI(e) {
  if (iu[e]) return iu[e];
  let t;
  switch (e) {
    case "G":
    case "GG":
    case "GGG":
      t = Q(B.Eras, Y.Abbreviated);
      break;
    case "GGGG":
      t = Q(B.Eras, Y.Wide);
      break;
    case "GGGGG":
      t = Q(B.Eras, Y.Narrow);
      break;
    case "y":
      t = oe($.FullYear, 1, 0, !1, !0);
      break;
    case "yy":
      t = oe($.FullYear, 2, 0, !0, !0);
      break;
    case "yyy":
      t = oe($.FullYear, 3, 0, !1, !0);
      break;
    case "yyyy":
      t = oe($.FullYear, 4, 0, !1, !0);
      break;
    case "Y":
      t = Ji(1);
      break;
    case "YY":
      t = Ji(2, !0);
      break;
    case "YYY":
      t = Ji(3);
      break;
    case "YYYY":
      t = Ji(4);
      break;
    case "M":
    case "L":
      t = oe($.Month, 1, 1);
      break;
    case "MM":
    case "LL":
      t = oe($.Month, 2, 1);
      break;
    case "MMM":
      t = Q(B.Months, Y.Abbreviated);
      break;
    case "MMMM":
      t = Q(B.Months, Y.Wide);
      break;
    case "MMMMM":
      t = Q(B.Months, Y.Narrow);
      break;
    case "LLL":
      t = Q(B.Months, Y.Abbreviated, Ce.Standalone);
      break;
    case "LLLL":
      t = Q(B.Months, Y.Wide, Ce.Standalone);
      break;
    case "LLLLL":
      t = Q(B.Months, Y.Narrow, Ce.Standalone);
      break;
    case "w":
      t = ou(1);
      break;
    case "ww":
      t = ou(2);
      break;
    case "W":
      t = ou(1, !0);
      break;
    case "d":
      t = oe($.Date, 1);
      break;
    case "dd":
      t = oe($.Date, 2);
      break;
    case "c":
    case "cc":
      t = oe($.Day, 1);
      break;
    case "ccc":
      t = Q(B.Days, Y.Abbreviated, Ce.Standalone);
      break;
    case "cccc":
      t = Q(B.Days, Y.Wide, Ce.Standalone);
      break;
    case "ccccc":
      t = Q(B.Days, Y.Narrow, Ce.Standalone);
      break;
    case "cccccc":
      t = Q(B.Days, Y.Short, Ce.Standalone);
      break;
    case "E":
    case "EE":
    case "EEE":
      t = Q(B.Days, Y.Abbreviated);
      break;
    case "EEEE":
      t = Q(B.Days, Y.Wide);
      break;
    case "EEEEE":
      t = Q(B.Days, Y.Narrow);
      break;
    case "EEEEEE":
      t = Q(B.Days, Y.Short);
      break;
    case "a":
    case "aa":
    case "aaa":
      t = Q(B.DayPeriods, Y.Abbreviated);
      break;
    case "aaaa":
      t = Q(B.DayPeriods, Y.Wide);
      break;
    case "aaaaa":
      t = Q(B.DayPeriods, Y.Narrow);
      break;
    case "b":
    case "bb":
    case "bbb":
      t = Q(B.DayPeriods, Y.Abbreviated, Ce.Standalone, !0);
      break;
    case "bbbb":
      t = Q(B.DayPeriods, Y.Wide, Ce.Standalone, !0);
      break;
    case "bbbbb":
      t = Q(B.DayPeriods, Y.Narrow, Ce.Standalone, !0);
      break;
    case "B":
    case "BB":
    case "BBB":
      t = Q(B.DayPeriods, Y.Abbreviated, Ce.Format, !0);
      break;
    case "BBBB":
      t = Q(B.DayPeriods, Y.Wide, Ce.Format, !0);
      break;
    case "BBBBB":
      t = Q(B.DayPeriods, Y.Narrow, Ce.Format, !0);
      break;
    case "h":
      t = oe($.Hours, 1, -12);
      break;
    case "hh":
      t = oe($.Hours, 2, -12);
      break;
    case "H":
      t = oe($.Hours, 1);
      break;
    case "HH":
      t = oe($.Hours, 2);
      break;
    case "m":
      t = oe($.Minutes, 1);
      break;
    case "mm":
      t = oe($.Minutes, 2);
      break;
    case "s":
      t = oe($.Seconds, 1);
      break;
    case "ss":
      t = oe($.Seconds, 2);
      break;
    case "S":
      t = oe($.FractionalSeconds, 1);
      break;
    case "SS":
      t = oe($.FractionalSeconds, 2);
      break;
    case "SSS":
      t = oe($.FractionalSeconds, 3);
      break;
    case "Z":
    case "ZZ":
    case "ZZZ":
      t = Ki(_t.Short);
      break;
    case "ZZZZZ":
      t = Ki(_t.Extended);
      break;
    case "O":
    case "OO":
    case "OOO":
    case "z":
    case "zz":
    case "zzz":
      t = Ki(_t.ShortGMT);
      break;
    case "OOOO":
    case "ZZZZ":
    case "zzzz":
      t = Ki(_t.Long);
      break;
    default:
      return null;
  }
  return (iu[e] = t), t;
}
function Sp(e, t) {
  e = e.replace(/:/g, "");
  let n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
  return isNaN(n) ? t : n;
}
function MI(e, t) {
  return (e = new Date(e.getTime())), e.setMinutes(e.getMinutes() + t), e;
}
function SI(e, t, n) {
  let r = n ? -1 : 1,
    o = e.getTimezoneOffset(),
    i = Sp(t, o);
  return MI(e, r * (i - o));
}
function TI(e) {
  if (lp(e)) return e;
  if (typeof e == "number" && !isNaN(e)) return new Date(e);
  if (typeof e == "string") {
    if (((e = e.trim()), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e))) {
      let [o, i = 1, s = 1] = e.split("-").map((a) => +a);
      return ts(o, i - 1, s);
    }
    let n = parseFloat(e);
    if (!isNaN(e - n)) return new Date(n);
    let r;
    if ((r = e.match(mI))) return _I(r);
  }
  let t = new Date(e);
  if (!lp(t)) throw new Error(`Unable to convert "${e}" into a date`);
  return t;
}
function _I(e) {
  let t = new Date(0),
    n = 0,
    r = 0,
    o = e[8] ? t.setUTCFullYear : t.setFullYear,
    i = e[8] ? t.setUTCHours : t.setHours;
  e[9] && ((n = Number(e[9] + e[10])), (r = Number(e[9] + e[11]))),
    o.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
  let s = Number(e[4] || 0) - n,
    a = Number(e[5] || 0) - r,
    c = Number(e[6] || 0),
    u = Math.floor(parseFloat("0." + (e[7] || 0)) * 1e3);
  return i.call(t, s, a, c, u), t;
}
function lp(e) {
  return e instanceof Date && !isNaN(e.valueOf());
}
var xI = /^(\d+)?\.((\d+)(-(\d+))?)?$/,
  dp = 22,
  ns = ".",
  Ur = "0",
  NI = ";",
  AI = ",",
  su = "#",
  fp = "\xA4",
  RI = "%";
function Tp(e, t, n, r, o, i, s = !1) {
  let a = "",
    c = !1;
  if (!isFinite(e)) a = Xe(n, fe.Infinity);
  else {
    let u = kI(e);
    s && (u = FI(u));
    let l = t.minInt,
      d = t.minFrac,
      h = t.maxFrac;
    if (i) {
      let G = i.match(xI);
      if (G === null) throw new Error(`${i} is not a valid digit info`);
      let k = G[1],
        ee = G[3],
        ue = G[5];
      k != null && (l = au(k)),
        ee != null && (d = au(ee)),
        ue != null ? (h = au(ue)) : ee != null && d > h && (h = d);
    }
    LI(u, d, h);
    let f = u.digits,
      g = u.integerLen,
      y = u.exponent,
      E = [];
    for (c = f.every((G) => !G); g < l; g++) f.unshift(0);
    for (; g < 0; g++) f.unshift(0);
    g > 0 ? (E = f.splice(g, f.length)) : ((E = f), (f = [0]));
    let R = [];
    for (
      f.length >= t.lgSize && R.unshift(f.splice(-t.lgSize, f.length).join(""));
      f.length > t.gSize;

    )
      R.unshift(f.splice(-t.gSize, f.length).join(""));
    f.length && R.unshift(f.join("")),
      (a = R.join(Xe(n, r))),
      E.length && (a += Xe(n, o) + E.join("")),
      y && (a += Xe(n, fe.Exponential) + "+" + y);
  }
  return (
    e < 0 && !c ? (a = t.negPre + a + t.negSuf) : (a = t.posPre + a + t.posSuf),
    a
  );
}
function OI(e, t, n, r, o) {
  let i = Cp(t, mu.Currency),
    s = _p(i, Xe(t, fe.MinusSign));
  return (
    (s.minFrac = gI(r)),
    (s.maxFrac = s.minFrac),
    Tp(e, s, t, fe.CurrencyGroup, fe.CurrencyDecimal, o)
      .replace(fp, n)
      .replace(fp, "")
      .trim()
  );
}
function PI(e, t, n) {
  let r = Cp(t, mu.Percent),
    o = _p(r, Xe(t, fe.MinusSign));
  return Tp(e, o, t, fe.Group, fe.Decimal, n, !0).replace(
    new RegExp(RI, "g"),
    Xe(t, fe.PercentSign)
  );
}
function _p(e, t = "-") {
  let n = {
      minInt: 1,
      minFrac: 0,
      maxFrac: 0,
      posPre: "",
      posSuf: "",
      negPre: "",
      negSuf: "",
      gSize: 0,
      lgSize: 0,
    },
    r = e.split(NI),
    o = r[0],
    i = r[1],
    s =
      o.indexOf(ns) !== -1
        ? o.split(ns)
        : [
            o.substring(0, o.lastIndexOf(Ur) + 1),
            o.substring(o.lastIndexOf(Ur) + 1),
          ],
    a = s[0],
    c = s[1] || "";
  n.posPre = a.substring(0, a.indexOf(su));
  for (let l = 0; l < c.length; l++) {
    let d = c.charAt(l);
    d === Ur
      ? (n.minFrac = n.maxFrac = l + 1)
      : d === su
      ? (n.maxFrac = l + 1)
      : (n.posSuf += d);
  }
  let u = a.split(AI);
  if (
    ((n.gSize = u[1] ? u[1].length : 0),
    (n.lgSize = u[2] || u[1] ? (u[2] || u[1]).length : 0),
    i)
  ) {
    let l = o.length - n.posPre.length - n.posSuf.length,
      d = i.indexOf(su);
    (n.negPre = i.substring(0, d).replace(/'/g, "")),
      (n.negSuf = i.slice(d + l).replace(/'/g, ""));
  } else (n.negPre = t + n.posPre), (n.negSuf = n.posSuf);
  return n;
}
function FI(e) {
  if (e.digits[0] === 0) return e;
  let t = e.digits.length - e.integerLen;
  return (
    e.exponent
      ? (e.exponent += 2)
      : (t === 0 ? e.digits.push(0, 0) : t === 1 && e.digits.push(0),
        (e.integerLen += 2)),
    e
  );
}
function kI(e) {
  let t = Math.abs(e) + "",
    n = 0,
    r,
    o,
    i,
    s,
    a;
  for (
    (o = t.indexOf(ns)) > -1 && (t = t.replace(ns, "")),
      (i = t.search(/e/i)) > 0
        ? (o < 0 && (o = i), (o += +t.slice(i + 1)), (t = t.substring(0, i)))
        : o < 0 && (o = t.length),
      i = 0;
    t.charAt(i) === Ur;
    i++
  );
  if (i === (a = t.length)) (r = [0]), (o = 1);
  else {
    for (a--; t.charAt(a) === Ur; ) a--;
    for (o -= i, r = [], s = 0; i <= a; i++, s++) r[s] = Number(t.charAt(i));
  }
  return (
    o > dp && ((r = r.splice(0, dp - 1)), (n = o - 1), (o = 1)),
    { digits: r, exponent: n, integerLen: o }
  );
}
function LI(e, t, n) {
  if (t > n)
    throw new Error(
      `The minimum number of digits after fraction (${t}) is higher than the maximum (${n}).`
    );
  let r = e.digits,
    o = r.length - e.integerLen,
    i = Math.min(Math.max(t, o), n),
    s = i + e.integerLen,
    a = r[s];
  if (s > 0) {
    r.splice(Math.max(e.integerLen, s));
    for (let d = s; d < r.length; d++) r[d] = 0;
  } else {
    (o = Math.max(0, o)),
      (e.integerLen = 1),
      (r.length = Math.max(1, (s = i + 1))),
      (r[0] = 0);
    for (let d = 1; d < s; d++) r[d] = 0;
  }
  if (a >= 5)
    if (s - 1 < 0) {
      for (let d = 0; d > s; d--) r.unshift(0), e.integerLen++;
      r.unshift(1), e.integerLen++;
    } else r[s - 1]++;
  for (; o < Math.max(0, i); o++) r.push(0);
  let c = i !== 0,
    u = t + e.integerLen,
    l = r.reduceRight(function (d, h, f, g) {
      return (
        (h = h + d),
        (g[f] = h < 10 ? h : h - 10),
        c && (g[f] === 0 && f >= u ? g.pop() : (c = !1)),
        h >= 10 ? 1 : 0
      );
    }, 0);
  l && (r.unshift(l), e.integerLen++);
}
function au(e) {
  let t = parseInt(e);
  if (isNaN(t)) throw new Error("Invalid integer literal when parsing " + e);
  return t;
}
function os(e, t) {
  t = encodeURIComponent(t);
  for (let n of e.split(";")) {
    let r = n.indexOf("="),
      [o, i] = r == -1 ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
    if (o.trim() === t) return decodeURIComponent(i);
  }
  return null;
}
var cu = /\s+/,
  hp = [],
  xp = (() => {
    class e {
      constructor(n, r) {
        (this._ngEl = n),
          (this._renderer = r),
          (this.initialClasses = hp),
          (this.stateMap = new Map());
      }
      set klass(n) {
        this.initialClasses = n != null ? n.trim().split(cu) : hp;
      }
      set ngClass(n) {
        this.rawClass = typeof n == "string" ? n.trim().split(cu) : n;
      }
      ngDoCheck() {
        for (let r of this.initialClasses) this._updateState(r, !0);
        let n = this.rawClass;
        if (Array.isArray(n) || n instanceof Set)
          for (let r of n) this._updateState(r, !0);
        else if (n != null)
          for (let r of Object.keys(n)) this._updateState(r, !!n[r]);
        this._applyStateDiff();
      }
      _updateState(n, r) {
        let o = this.stateMap.get(n);
        o !== void 0
          ? (o.enabled !== r && ((o.changed = !0), (o.enabled = r)),
            (o.touched = !0))
          : this.stateMap.set(n, { enabled: r, changed: !0, touched: !0 });
      }
      _applyStateDiff() {
        for (let n of this.stateMap) {
          let r = n[0],
            o = n[1];
          o.changed
            ? (this._toggleClass(r, o.enabled), (o.changed = !1))
            : o.touched ||
              (o.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)),
            (o.touched = !1);
        }
      }
      _toggleClass(n, r) {
        (n = n.trim()),
          n.length > 0 &&
            n.split(cu).forEach((o) => {
              r
                ? this._renderer.addClass(this._ngEl.nativeElement, o)
                : this._renderer.removeClass(this._ngEl.nativeElement, o);
            });
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(H(Yn), H(Rr));
        };
      }
      static {
        this.ɵdir = ct({
          type: e,
          selectors: [["", "ngClass", ""]],
          inputs: { klass: [0, "class", "klass"], ngClass: "ngClass" },
          standalone: !0,
        });
      }
    }
    return e;
  })();
var uu = class {
    constructor(t, n, r, o) {
      (this.$implicit = t),
        (this.ngForOf = n),
        (this.index = r),
        (this.count = o);
    }
    get first() {
      return this.index === 0;
    }
    get last() {
      return this.index === this.count - 1;
    }
    get even() {
      return this.index % 2 === 0;
    }
    get odd() {
      return !this.even;
    }
  },
  Np = (() => {
    class e {
      set ngForOf(n) {
        (this._ngForOf = n), (this._ngForOfDirty = !0);
      }
      set ngForTrackBy(n) {
        this._trackByFn = n;
      }
      get ngForTrackBy() {
        return this._trackByFn;
      }
      constructor(n, r, o) {
        (this._viewContainer = n),
          (this._template = r),
          (this._differs = o),
          (this._ngForOf = null),
          (this._ngForOfDirty = !0),
          (this._differ = null);
      }
      set ngForTemplate(n) {
        n && (this._template = n);
      }
      ngDoCheck() {
        if (this._ngForOfDirty) {
          this._ngForOfDirty = !1;
          let n = this._ngForOf;
          if (!this._differ && n)
            if (0)
              try {
              } catch {}
            else this._differ = this._differs.find(n).create(this.ngForTrackBy);
        }
        if (this._differ) {
          let n = this._differ.diff(this._ngForOf);
          n && this._applyChanges(n);
        }
      }
      _applyChanges(n) {
        let r = this._viewContainer;
        n.forEachOperation((o, i, s) => {
          if (o.previousIndex == null)
            r.createEmbeddedView(
              this._template,
              new uu(o.item, this._ngForOf, -1, -1),
              s === null ? void 0 : s
            );
          else if (s == null) r.remove(i === null ? void 0 : i);
          else if (i !== null) {
            let a = r.get(i);
            r.move(a, s), pp(a, o);
          }
        });
        for (let o = 0, i = r.length; o < i; o++) {
          let a = r.get(o).context;
          (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
        }
        n.forEachIdentityChange((o) => {
          let i = r.get(o.currentIndex);
          pp(i, o);
        });
      }
      static ngTemplateContextGuard(n, r) {
        return !0;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(H(qt), H(Qn), H(nu));
        };
      }
      static {
        this.ɵdir = ct({
          type: e,
          selectors: [["", "ngFor", "", "ngForOf", ""]],
          inputs: {
            ngForOf: "ngForOf",
            ngForTrackBy: "ngForTrackBy",
            ngForTemplate: "ngForTemplate",
          },
          standalone: !0,
        });
      }
    }
    return e;
  })();
function pp(e, t) {
  e.context.$implicit = t.item;
}
var Ap = (() => {
    class e {
      constructor(n, r) {
        (this._viewContainer = n),
          (this._context = new lu()),
          (this._thenTemplateRef = null),
          (this._elseTemplateRef = null),
          (this._thenViewRef = null),
          (this._elseViewRef = null),
          (this._thenTemplateRef = r);
      }
      set ngIf(n) {
        (this._context.$implicit = this._context.ngIf = n), this._updateView();
      }
      set ngIfThen(n) {
        gp("ngIfThen", n),
          (this._thenTemplateRef = n),
          (this._thenViewRef = null),
          this._updateView();
      }
      set ngIfElse(n) {
        gp("ngIfElse", n),
          (this._elseTemplateRef = n),
          (this._elseViewRef = null),
          this._updateView();
      }
      _updateView() {
        this._context.$implicit
          ? this._thenViewRef ||
            (this._viewContainer.clear(),
            (this._elseViewRef = null),
            this._thenTemplateRef &&
              (this._thenViewRef = this._viewContainer.createEmbeddedView(
                this._thenTemplateRef,
                this._context
              )))
          : this._elseViewRef ||
            (this._viewContainer.clear(),
            (this._thenViewRef = null),
            this._elseTemplateRef &&
              (this._elseViewRef = this._viewContainer.createEmbeddedView(
                this._elseTemplateRef,
                this._context
              )));
      }
      static ngTemplateContextGuard(n, r) {
        return !0;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(H(qt), H(Qn));
        };
      }
      static {
        this.ɵdir = ct({
          type: e,
          selectors: [["", "ngIf", ""]],
          inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" },
          standalone: !0,
        });
      }
    }
    return e;
  })(),
  lu = class {
    constructor() {
      (this.$implicit = null), (this.ngIf = null);
    }
  };
function gp(e, t) {
  if (!!!(!t || t.createEmbeddedView))
    throw new Error(`${e} must be a TemplateRef, but received '${ve(t)}'.`);
}
var rs = class {
    constructor(t, n) {
      (this._viewContainerRef = t),
        (this._templateRef = n),
        (this._created = !1);
    }
    create() {
      (this._created = !0),
        this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
    destroy() {
      (this._created = !1), this._viewContainerRef.clear();
    }
    enforceState(t) {
      t && !this._created
        ? this.create()
        : !t && this._created && this.destroy();
    }
  },
  is = (() => {
    class e {
      constructor() {
        (this._defaultViews = []),
          (this._defaultUsed = !1),
          (this._caseCount = 0),
          (this._lastCaseCheckIndex = 0),
          (this._lastCasesMatched = !1);
      }
      set ngSwitch(n) {
        (this._ngSwitch = n),
          this._caseCount === 0 && this._updateDefaultCases(!0);
      }
      _addCase() {
        return this._caseCount++;
      }
      _addDefault(n) {
        this._defaultViews.push(n);
      }
      _matchCase(n) {
        let r = n === this._ngSwitch;
        return (
          (this._lastCasesMatched ||= r),
          this._lastCaseCheckIndex++,
          this._lastCaseCheckIndex === this._caseCount &&
            (this._updateDefaultCases(!this._lastCasesMatched),
            (this._lastCaseCheckIndex = 0),
            (this._lastCasesMatched = !1)),
          r
        );
      }
      _updateDefaultCases(n) {
        if (this._defaultViews.length > 0 && n !== this._defaultUsed) {
          this._defaultUsed = n;
          for (let r of this._defaultViews) r.enforceState(n);
        }
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵdir = ct({
          type: e,
          selectors: [["", "ngSwitch", ""]],
          inputs: { ngSwitch: "ngSwitch" },
          standalone: !0,
        });
      }
    }
    return e;
  })(),
  Rp = (() => {
    class e {
      constructor(n, r, o) {
        (this.ngSwitch = o), o._addCase(), (this._view = new rs(n, r));
      }
      ngDoCheck() {
        this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(H(qt), H(Qn), H(is, 9));
        };
      }
      static {
        this.ɵdir = ct({
          type: e,
          selectors: [["", "ngSwitchCase", ""]],
          inputs: { ngSwitchCase: "ngSwitchCase" },
          standalone: !0,
        });
      }
    }
    return e;
  })(),
  Op = (() => {
    class e {
      constructor(n, r, o) {
        o._addDefault(new rs(n, r));
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(H(qt), H(Qn), H(is, 9));
        };
      }
      static {
        this.ɵdir = ct({
          type: e,
          selectors: [["", "ngSwitchDefault", ""]],
          standalone: !0,
        });
      }
    }
    return e;
  })();
function er(e, t) {
  return new I(2100, !1);
}
var Pp = (() => {
  class e {
    transform(n) {
      if (n == null) return null;
      if (typeof n != "string") throw er(e, n);
      return n.toLowerCase();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵpipe = pn({ name: "lowercase", type: e, pure: !0, standalone: !0 });
    }
  }
  return e;
})();
var Fp = (() => {
    class e {
      transform(n) {
        if (n == null) return null;
        if (typeof n != "string") throw er(e, n);
        return n.toUpperCase();
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵpipe = pn({
          name: "uppercase",
          type: e,
          pure: !0,
          standalone: !0,
        });
      }
    }
    return e;
  })(),
  jI = "mediumDate",
  VI = new w(""),
  UI = new w(""),
  kp = (() => {
    class e {
      constructor(n, r, o) {
        (this.locale = n),
          (this.defaultTimezone = r),
          (this.defaultOptions = o);
      }
      transform(n, r, o, i) {
        if (n == null || n === "" || n !== n) return null;
        try {
          let s = r ?? this.defaultOptions?.dateFormat ?? jI,
            a =
              o ??
              this.defaultOptions?.timezone ??
              this.defaultTimezone ??
              void 0;
          return yI(n, s, i || this.locale, a);
        } catch (s) {
          throw er(e, s.message);
        }
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(H(Kn, 16), H(VI, 24), H(UI, 24));
        };
      }
      static {
        this.ɵpipe = pn({ name: "date", type: e, pure: !0, standalone: !0 });
      }
    }
    return e;
  })();
var Lp = (() => {
    class e {
      constructor(n) {
        this._locale = n;
      }
      transform(n, r, o) {
        if (!Vp(n)) return null;
        o ||= this._locale;
        try {
          let i = Up(n);
          return PI(i, o, r);
        } catch (i) {
          throw er(e, i.message);
        }
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(H(Kn, 16));
        };
      }
      static {
        this.ɵpipe = pn({ name: "percent", type: e, pure: !0, standalone: !0 });
      }
    }
    return e;
  })(),
  jp = (() => {
    class e {
      constructor(n, r = "USD") {
        (this._locale = n), (this._defaultCurrencyCode = r);
      }
      transform(n, r = this._defaultCurrencyCode, o = "symbol", i, s) {
        if (!Vp(n)) return null;
        (s ||= this._locale),
          typeof o == "boolean" && (o = o ? "symbol" : "code");
        let a = r || this._defaultCurrencyCode;
        o !== "code" &&
          (o === "symbol" || o === "symbol-narrow"
            ? (a = hI(a, o === "symbol" ? "wide" : "narrow", s))
            : (a = o));
        try {
          let c = Up(n);
          return OI(c, s, a, r, i);
        } catch (c) {
          throw er(e, c.message);
        }
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(H(Kn, 16), H(tp, 16));
        };
      }
      static {
        this.ɵpipe = pn({
          name: "currency",
          type: e,
          pure: !0,
          standalone: !0,
        });
      }
    }
    return e;
  })();
function Vp(e) {
  return !(e == null || e === "" || e !== e);
}
function Up(e) {
  if (typeof e == "string" && !isNaN(Number(e) - parseFloat(e)))
    return Number(e);
  if (typeof e != "number") throw new Error(`${e} is not a number`);
  return e;
}
var Bp = (() => {
  class e {
    transform(n, r, o) {
      if (n == null) return null;
      if (!this.supports(n)) throw er(e, n);
      return n.slice(r, o);
    }
    supports(n) {
      return typeof n == "string" || Array.isArray(n);
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵpipe = pn({ name: "slice", type: e, pure: !1, standalone: !0 });
    }
  }
  return e;
})();
var ss = (() => {
    class e {
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵmod = Ee({ type: e });
      }
      static {
        this.ɵinj = we({});
      }
    }
    return e;
  })(),
  vu = "browser",
  BI = "server";
function $I(e) {
  return e === vu;
}
function as(e) {
  return e === BI;
}
var $p = (() => {
    class e {
      static {
        this.ɵprov = C({
          token: e,
          providedIn: "root",
          factory: () => ($I(p(lt)) ? new du(p(pe), window) : new fu()),
        });
      }
    }
    return e;
  })(),
  du = class {
    constructor(t, n) {
      (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
    }
    setOffset(t) {
      Array.isArray(t) ? (this.offset = () => t) : (this.offset = t);
    }
    getScrollPosition() {
      return [this.window.scrollX, this.window.scrollY];
    }
    scrollToPosition(t) {
      this.window.scrollTo(t[0], t[1]);
    }
    scrollToAnchor(t) {
      let n = HI(this.document, t);
      n && (this.scrollToElement(n), n.focus());
    }
    setHistoryScrollRestoration(t) {
      this.window.history.scrollRestoration = t;
    }
    scrollToElement(t) {
      let n = t.getBoundingClientRect(),
        r = n.left + this.window.pageXOffset,
        o = n.top + this.window.pageYOffset,
        i = this.offset();
      this.window.scrollTo(r - i[0], o - i[1]);
    }
  };
function HI(e, t) {
  let n = e.getElementById(t) || e.getElementsByName(t)[0];
  if (n) return n;
  if (
    typeof e.createTreeWalker == "function" &&
    e.body &&
    typeof e.body.attachShadow == "function"
  ) {
    let r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT),
      o = r.currentNode;
    for (; o; ) {
      let i = o.shadowRoot;
      if (i) {
        let s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
        if (s) return s;
      }
      o = r.nextNode();
    }
  }
  return null;
}
var fu = class {
    setOffset(t) {}
    getScrollPosition() {
      return [0, 0];
    }
    scrollToPosition(t) {}
    scrollToAnchor(t) {}
    setHistoryScrollRestoration(t) {}
  },
  Jn = class {};
var $r = class {},
  us = class {},
  Nt = class e {
    constructor(t) {
      (this.normalizedNames = new Map()),
        (this.lazyUpdate = null),
        t
          ? typeof t == "string"
            ? (this.lazyInit = () => {
                (this.headers = new Map()),
                  t
                    .split(
                      `
`
                    )
                    .forEach((n) => {
                      let r = n.indexOf(":");
                      if (r > 0) {
                        let o = n.slice(0, r),
                          i = o.toLowerCase(),
                          s = n.slice(r + 1).trim();
                        this.maybeSetNormalizedName(o, i),
                          this.headers.has(i)
                            ? this.headers.get(i).push(s)
                            : this.headers.set(i, [s]);
                      }
                    });
              })
            : typeof Headers < "u" && t instanceof Headers
            ? ((this.headers = new Map()),
              t.forEach((n, r) => {
                this.setHeaderEntries(r, n);
              }))
            : (this.lazyInit = () => {
                (this.headers = new Map()),
                  Object.entries(t).forEach(([n, r]) => {
                    this.setHeaderEntries(n, r);
                  });
              })
          : (this.headers = new Map());
    }
    has(t) {
      return this.init(), this.headers.has(t.toLowerCase());
    }
    get(t) {
      this.init();
      let n = this.headers.get(t.toLowerCase());
      return n && n.length > 0 ? n[0] : null;
    }
    keys() {
      return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(t) {
      return this.init(), this.headers.get(t.toLowerCase()) || null;
    }
    append(t, n) {
      return this.clone({ name: t, value: n, op: "a" });
    }
    set(t, n) {
      return this.clone({ name: t, value: n, op: "s" });
    }
    delete(t, n) {
      return this.clone({ name: t, value: n, op: "d" });
    }
    maybeSetNormalizedName(t, n) {
      this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
    }
    init() {
      this.lazyInit &&
        (this.lazyInit instanceof e
          ? this.copyFrom(this.lazyInit)
          : this.lazyInit(),
        (this.lazyInit = null),
        this.lazyUpdate &&
          (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
          (this.lazyUpdate = null)));
    }
    copyFrom(t) {
      t.init(),
        Array.from(t.headers.keys()).forEach((n) => {
          this.headers.set(n, t.headers.get(n)),
            this.normalizedNames.set(n, t.normalizedNames.get(n));
        });
    }
    clone(t) {
      let n = new e();
      return (
        (n.lazyInit =
          this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this),
        (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
        n
      );
    }
    applyUpdate(t) {
      let n = t.name.toLowerCase();
      switch (t.op) {
        case "a":
        case "s":
          let r = t.value;
          if ((typeof r == "string" && (r = [r]), r.length === 0)) return;
          this.maybeSetNormalizedName(t.name, n);
          let o = (t.op === "a" ? this.headers.get(n) : void 0) || [];
          o.push(...r), this.headers.set(n, o);
          break;
        case "d":
          let i = t.value;
          if (!i) this.headers.delete(n), this.normalizedNames.delete(n);
          else {
            let s = this.headers.get(n);
            if (!s) return;
            (s = s.filter((a) => i.indexOf(a) === -1)),
              s.length === 0
                ? (this.headers.delete(n), this.normalizedNames.delete(n))
                : this.headers.set(n, s);
          }
          break;
      }
    }
    setHeaderEntries(t, n) {
      let r = (Array.isArray(n) ? n : [n]).map((i) => i.toString()),
        o = t.toLowerCase();
      this.headers.set(o, r), this.maybeSetNormalizedName(t, o);
    }
    forEach(t) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((n) =>
          t(this.normalizedNames.get(n), this.headers.get(n))
        );
    }
  };
var wu = class {
  encodeKey(t) {
    return Hp(t);
  }
  encodeValue(t) {
    return Hp(t);
  }
  decodeKey(t) {
    return decodeURIComponent(t);
  }
  decodeValue(t) {
    return decodeURIComponent(t);
  }
};
function zI(e, t) {
  let n = new Map();
  return (
    e.length > 0 &&
      e
        .replace(/^\?/, "")
        .split("&")
        .forEach((o) => {
          let i = o.indexOf("="),
            [s, a] =
              i == -1
                ? [t.decodeKey(o), ""]
                : [t.decodeKey(o.slice(0, i)), t.decodeValue(o.slice(i + 1))],
            c = n.get(s) || [];
          c.push(a), n.set(s, c);
        }),
    n
  );
}
var GI = /%(\d[a-f0-9])/gi,
  qI = {
    40: "@",
    "3A": ":",
    24: "$",
    "2C": ",",
    "3B": ";",
    "3D": "=",
    "3F": "?",
    "2F": "/",
  };
function Hp(e) {
  return encodeURIComponent(e).replace(GI, (t, n) => qI[n] ?? t);
}
function cs(e) {
  return `${e}`;
}
var Qt = class e {
  constructor(t = {}) {
    if (
      ((this.updates = null),
      (this.cloneFrom = null),
      (this.encoder = t.encoder || new wu()),
      t.fromString)
    ) {
      if (t.fromObject)
        throw new Error("Cannot specify both fromString and fromObject.");
      this.map = zI(t.fromString, this.encoder);
    } else
      t.fromObject
        ? ((this.map = new Map()),
          Object.keys(t.fromObject).forEach((n) => {
            let r = t.fromObject[n],
              o = Array.isArray(r) ? r.map(cs) : [cs(r)];
            this.map.set(n, o);
          }))
        : (this.map = null);
  }
  has(t) {
    return this.init(), this.map.has(t);
  }
  get(t) {
    this.init();
    let n = this.map.get(t);
    return n ? n[0] : null;
  }
  getAll(t) {
    return this.init(), this.map.get(t) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(t, n) {
    return this.clone({ param: t, value: n, op: "a" });
  }
  appendAll(t) {
    let n = [];
    return (
      Object.keys(t).forEach((r) => {
        let o = t[r];
        Array.isArray(o)
          ? o.forEach((i) => {
              n.push({ param: r, value: i, op: "a" });
            })
          : n.push({ param: r, value: o, op: "a" });
      }),
      this.clone(n)
    );
  }
  set(t, n) {
    return this.clone({ param: t, value: n, op: "s" });
  }
  delete(t, n) {
    return this.clone({ param: t, value: n, op: "d" });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((t) => {
          let n = this.encoder.encodeKey(t);
          return this.map
            .get(t)
            .map((r) => n + "=" + this.encoder.encodeValue(r))
            .join("&");
        })
        .filter((t) => t !== "")
        .join("&")
    );
  }
  clone(t) {
    let n = new e({ encoder: this.encoder });
    return (
      (n.cloneFrom = this.cloneFrom || this),
      (n.updates = (this.updates || []).concat(t)),
      n
    );
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom
          .keys()
          .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
        this.updates.forEach((t) => {
          switch (t.op) {
            case "a":
            case "s":
              let n = (t.op === "a" ? this.map.get(t.param) : void 0) || [];
              n.push(cs(t.value)), this.map.set(t.param, n);
              break;
            case "d":
              if (t.value !== void 0) {
                let r = this.map.get(t.param) || [],
                  o = r.indexOf(cs(t.value));
                o !== -1 && r.splice(o, 1),
                  r.length > 0
                    ? this.map.set(t.param, r)
                    : this.map.delete(t.param);
              } else {
                this.map.delete(t.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var Eu = class {
  constructor() {
    this.map = new Map();
  }
  set(t, n) {
    return this.map.set(t, n), this;
  }
  get(t) {
    return (
      this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t)
    );
  }
  delete(t) {
    return this.map.delete(t), this;
  }
  has(t) {
    return this.map.has(t);
  }
  keys() {
    return this.map.keys();
  }
};
function WI(e) {
  switch (e) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return !1;
    default:
      return !0;
  }
}
function zp(e) {
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
}
function Gp(e) {
  return typeof Blob < "u" && e instanceof Blob;
}
function qp(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function ZI(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
var Br = class e {
    constructor(t, n, r, o) {
      (this.url = n),
        (this.body = null),
        (this.reportProgress = !1),
        (this.withCredentials = !1),
        (this.responseType = "json"),
        (this.method = t.toUpperCase());
      let i;
      if (
        (WI(this.method) || o
          ? ((this.body = r !== void 0 ? r : null), (i = o))
          : (i = r),
        i &&
          ((this.reportProgress = !!i.reportProgress),
          (this.withCredentials = !!i.withCredentials),
          i.responseType && (this.responseType = i.responseType),
          i.headers && (this.headers = i.headers),
          i.context && (this.context = i.context),
          i.params && (this.params = i.params),
          (this.transferCache = i.transferCache)),
        (this.headers ??= new Nt()),
        (this.context ??= new Eu()),
        !this.params)
      )
        (this.params = new Qt()), (this.urlWithParams = n);
      else {
        let s = this.params.toString();
        if (s.length === 0) this.urlWithParams = n;
        else {
          let a = n.indexOf("?"),
            c = a === -1 ? "?" : a < n.length - 1 ? "&" : "";
          this.urlWithParams = n + c + s;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : typeof this.body == "string" ||
          zp(this.body) ||
          Gp(this.body) ||
          qp(this.body) ||
          ZI(this.body)
        ? this.body
        : this.body instanceof Qt
        ? this.body.toString()
        : typeof this.body == "object" ||
          typeof this.body == "boolean" ||
          Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || qp(this.body)
        ? null
        : Gp(this.body)
        ? this.body.type || null
        : zp(this.body)
        ? null
        : typeof this.body == "string"
        ? "text/plain"
        : this.body instanceof Qt
        ? "application/x-www-form-urlencoded;charset=UTF-8"
        : typeof this.body == "object" ||
          typeof this.body == "number" ||
          typeof this.body == "boolean"
        ? "application/json"
        : null;
    }
    clone(t = {}) {
      let n = t.method || this.method,
        r = t.url || this.url,
        o = t.responseType || this.responseType,
        i = t.transferCache ?? this.transferCache,
        s = t.body !== void 0 ? t.body : this.body,
        a = t.withCredentials ?? this.withCredentials,
        c = t.reportProgress ?? this.reportProgress,
        u = t.headers || this.headers,
        l = t.params || this.params,
        d = t.context ?? this.context;
      return (
        t.setHeaders !== void 0 &&
          (u = Object.keys(t.setHeaders).reduce(
            (h, f) => h.set(f, t.setHeaders[f]),
            u
          )),
        t.setParams &&
          (l = Object.keys(t.setParams).reduce(
            (h, f) => h.set(f, t.setParams[f]),
            l
          )),
        new e(n, r, s, {
          params: l,
          headers: u,
          context: d,
          reportProgress: c,
          responseType: o,
          withCredentials: a,
          transferCache: i,
        })
      );
    }
  },
  Kt = (function (e) {
    return (
      (e[(e.Sent = 0)] = "Sent"),
      (e[(e.UploadProgress = 1)] = "UploadProgress"),
      (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
      (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
      (e[(e.Response = 4)] = "Response"),
      (e[(e.User = 5)] = "User"),
      e
    );
  })(Kt || {}),
  Hr = class {
    constructor(t, n = 200, r = "OK") {
      (this.headers = t.headers || new Nt()),
        (this.status = t.status !== void 0 ? t.status : n),
        (this.statusText = t.statusText || r),
        (this.url = t.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  ls = class e extends Hr {
    constructor(t = {}) {
      super(t), (this.type = Kt.ResponseHeader);
    }
    clone(t = {}) {
      return new e({
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
      });
    }
  },
  zr = class e extends Hr {
    constructor(t = {}) {
      super(t),
        (this.type = Kt.Response),
        (this.body = t.body !== void 0 ? t.body : null);
    }
    clone(t = {}) {
      return new e({
        body: t.body !== void 0 ? t.body : this.body,
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
      });
    }
  },
  Yt = class extends Hr {
    constructor(t) {
      super(t, 0, "Unknown Error"),
        (this.name = "HttpErrorResponse"),
        (this.ok = !1),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${
              t.url || "(unknown url)"
            }`)
          : (this.message = `Http failure response for ${
              t.url || "(unknown url)"
            }: ${t.status} ${t.statusText}`),
        (this.error = t.error || null);
    }
  },
  Kp = 200,
  YI = 204;
function Du(e, t) {
  return {
    body: t,
    headers: e.headers,
    context: e.context,
    observe: e.observe,
    params: e.params,
    reportProgress: e.reportProgress,
    responseType: e.responseType,
    withCredentials: e.withCredentials,
    transferCache: e.transferCache,
  };
}
var QI = (() => {
    class e {
      constructor(n) {
        this.handler = n;
      }
      request(n, r, o = {}) {
        let i;
        if (n instanceof Br) i = n;
        else {
          let c;
          o.headers instanceof Nt ? (c = o.headers) : (c = new Nt(o.headers));
          let u;
          o.params &&
            (o.params instanceof Qt
              ? (u = o.params)
              : (u = new Qt({ fromObject: o.params }))),
            (i = new Br(n, r, o.body !== void 0 ? o.body : null, {
              headers: c,
              context: o.context,
              params: u,
              reportProgress: o.reportProgress,
              responseType: o.responseType || "json",
              withCredentials: o.withCredentials,
              transferCache: o.transferCache,
            }));
        }
        let s = S(i).pipe(mt((c) => this.handler.handle(c)));
        if (n instanceof Br || o.observe === "events") return s;
        let a = s.pipe(Me((c) => c instanceof zr));
        switch (o.observe || "body") {
          case "body":
            switch (i.responseType) {
              case "arraybuffer":
                return a.pipe(
                  N((c) => {
                    if (c.body !== null && !(c.body instanceof ArrayBuffer))
                      throw new Error("Response is not an ArrayBuffer.");
                    return c.body;
                  })
                );
              case "blob":
                return a.pipe(
                  N((c) => {
                    if (c.body !== null && !(c.body instanceof Blob))
                      throw new Error("Response is not a Blob.");
                    return c.body;
                  })
                );
              case "text":
                return a.pipe(
                  N((c) => {
                    if (c.body !== null && typeof c.body != "string")
                      throw new Error("Response is not a string.");
                    return c.body;
                  })
                );
              case "json":
              default:
                return a.pipe(N((c) => c.body));
            }
          case "response":
            return a;
          default:
            throw new Error(
              `Unreachable: unhandled observe type ${o.observe}}`
            );
        }
      }
      delete(n, r = {}) {
        return this.request("DELETE", n, r);
      }
      get(n, r = {}) {
        return this.request("GET", n, r);
      }
      head(n, r = {}) {
        return this.request("HEAD", n, r);
      }
      jsonp(n, r) {
        return this.request("JSONP", n, {
          params: new Qt().append(r, "JSONP_CALLBACK"),
          observe: "body",
          responseType: "json",
        });
      }
      options(n, r = {}) {
        return this.request("OPTIONS", n, r);
      }
      patch(n, r, o = {}) {
        return this.request("PATCH", n, Du(o, r));
      }
      post(n, r, o = {}) {
        return this.request("POST", n, Du(o, r));
      }
      put(n, r, o = {}) {
        return this.request("PUT", n, Du(o, r));
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b($r));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  KI = /^\)\]\}',?\n/,
  JI = "X-Request-URL";
function Wp(e) {
  if (e.url) return e.url;
  let t = JI.toLocaleLowerCase();
  return e.headers.get(t);
}
var XI = (() => {
    class e {
      constructor() {
        (this.fetchImpl =
          p(Iu, { optional: !0 })?.fetch ?? ((...n) => globalThis.fetch(...n))),
          (this.ngZone = p(q));
      }
      handle(n) {
        return new V((r) => {
          let o = new AbortController();
          return (
            this.doRequest(n, o.signal, r).then(Cu, (i) =>
              r.error(new Yt({ error: i }))
            ),
            () => o.abort()
          );
        });
      }
      doRequest(n, r, o) {
        return mo(this, null, function* () {
          let i = this.createRequestInit(n),
            s;
          try {
            let f = this.ngZone.runOutsideAngular(() =>
              this.fetchImpl(n.urlWithParams, D({ signal: r }, i))
            );
            eC(f), o.next({ type: Kt.Sent }), (s = yield f);
          } catch (f) {
            o.error(
              new Yt({
                error: f,
                status: f.status ?? 0,
                statusText: f.statusText,
                url: n.urlWithParams,
                headers: f.headers,
              })
            );
            return;
          }
          let a = new Nt(s.headers),
            c = s.statusText,
            u = Wp(s) ?? n.urlWithParams,
            l = s.status,
            d = null;
          if (
            (n.reportProgress &&
              o.next(new ls({ headers: a, status: l, statusText: c, url: u })),
            s.body)
          ) {
            let f = s.headers.get("content-length"),
              g = [],
              y = s.body.getReader(),
              E = 0,
              R,
              G,
              k = typeof Zone < "u" && Zone.current;
            yield this.ngZone.runOutsideAngular(() =>
              mo(this, null, function* () {
                for (;;) {
                  let { done: ue, value: ie } = yield y.read();
                  if (ue) break;
                  if ((g.push(ie), (E += ie.length), n.reportProgress)) {
                    G =
                      n.responseType === "text"
                        ? (G ?? "") +
                          (R ??= new TextDecoder()).decode(ie, { stream: !0 })
                        : void 0;
                    let pt = () =>
                      o.next({
                        type: Kt.DownloadProgress,
                        total: f ? +f : void 0,
                        loaded: E,
                        partialText: G,
                      });
                    k ? k.run(pt) : pt();
                  }
                }
              })
            );
            let ee = this.concatChunks(g, E);
            try {
              let ue = s.headers.get("Content-Type") ?? "";
              d = this.parseBody(n, ee, ue);
            } catch (ue) {
              o.error(
                new Yt({
                  error: ue,
                  headers: new Nt(s.headers),
                  status: s.status,
                  statusText: s.statusText,
                  url: Wp(s) ?? n.urlWithParams,
                })
              );
              return;
            }
          }
          l === 0 && (l = d ? Kp : 0),
            l >= 200 && l < 300
              ? (o.next(
                  new zr({
                    body: d,
                    headers: a,
                    status: l,
                    statusText: c,
                    url: u,
                  })
                ),
                o.complete())
              : o.error(
                  new Yt({
                    error: d,
                    headers: a,
                    status: l,
                    statusText: c,
                    url: u,
                  })
                );
        });
      }
      parseBody(n, r, o) {
        switch (n.responseType) {
          case "json":
            let i = new TextDecoder().decode(r).replace(KI, "");
            return i === "" ? null : JSON.parse(i);
          case "text":
            return new TextDecoder().decode(r);
          case "blob":
            return new Blob([r], { type: o });
          case "arraybuffer":
            return r.buffer;
        }
      }
      createRequestInit(n) {
        let r = {},
          o = n.withCredentials ? "include" : void 0;
        if (
          (n.headers.forEach((i, s) => (r[i] = s.join(","))),
          n.headers.has("Accept") ||
            (r.Accept = "application/json, text/plain, */*"),
          !n.headers.has("Content-Type"))
        ) {
          let i = n.detectContentTypeHeader();
          i !== null && (r["Content-Type"] = i);
        }
        return {
          body: n.serializeBody(),
          method: n.method,
          headers: r,
          credentials: o,
        };
      }
      concatChunks(n, r) {
        let o = new Uint8Array(r),
          i = 0;
        for (let s of n) o.set(s, i), (i += s.length);
        return o;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  Iu = class {};
function Cu() {}
function eC(e) {
  e.then(Cu, Cu);
}
function Jp(e, t) {
  return t(e);
}
function tC(e, t) {
  return (n, r) => t.intercept(n, { handle: (o) => e(o, r) });
}
function nC(e, t, n) {
  return (r, o) => Ue(n, () => t(r, (i) => e(i, o)));
}
var rC = new w(""),
  bu = new w(""),
  oC = new w(""),
  Xp = new w("", { providedIn: "root", factory: () => !0 });
function iC() {
  let e = null;
  return (t, n) => {
    e === null && (e = (p(rC, { optional: !0 }) ?? []).reduceRight(tC, Jp));
    let r = p(It);
    if (p(Xp)) {
      let i = r.add();
      return e(t, n).pipe(kt(() => r.remove(i)));
    } else return e(t, n);
  };
}
var Zp = (() => {
  class e extends $r {
    constructor(n, r) {
      super(),
        (this.backend = n),
        (this.injector = r),
        (this.chain = null),
        (this.pendingTasks = p(It)),
        (this.contributeToStability = p(Xp));
    }
    handle(n) {
      if (this.chain === null) {
        let r = Array.from(
          new Set([...this.injector.get(bu), ...this.injector.get(oC, [])])
        );
        this.chain = r.reduceRight((o, i) => nC(o, i, this.injector), Jp);
      }
      if (this.contributeToStability) {
        let r = this.pendingTasks.add();
        return this.chain(n, (o) => this.backend.handle(o)).pipe(
          kt(() => this.pendingTasks.remove(r))
        );
      } else return this.chain(n, (r) => this.backend.handle(r));
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(b(us), b(ye));
      };
    }
    static {
      this.ɵprov = C({ token: e, factory: e.ɵfac });
    }
  }
  return e;
})();
var sC = /^\)\]\}',?\n/;
function aC(e) {
  return "responseURL" in e && e.responseURL
    ? e.responseURL
    : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
    ? e.getResponseHeader("X-Request-URL")
    : null;
}
var Yp = (() => {
    class e {
      constructor(n) {
        this.xhrFactory = n;
      }
      handle(n) {
        if (n.method === "JSONP") throw new I(-2800, !1);
        let r = this.xhrFactory;
        return (r.ɵloadImpl ? J(r.ɵloadImpl()) : S(null)).pipe(
          Se(
            () =>
              new V((i) => {
                let s = r.build();
                if (
                  (s.open(n.method, n.urlWithParams),
                  n.withCredentials && (s.withCredentials = !0),
                  n.headers.forEach((y, E) =>
                    s.setRequestHeader(y, E.join(","))
                  ),
                  n.headers.has("Accept") ||
                    s.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !n.headers.has("Content-Type"))
                ) {
                  let y = n.detectContentTypeHeader();
                  y !== null && s.setRequestHeader("Content-Type", y);
                }
                if (n.responseType) {
                  let y = n.responseType.toLowerCase();
                  s.responseType = y !== "json" ? y : "text";
                }
                let a = n.serializeBody(),
                  c = null,
                  u = () => {
                    if (c !== null) return c;
                    let y = s.statusText || "OK",
                      E = new Nt(s.getAllResponseHeaders()),
                      R = aC(s) || n.url;
                    return (
                      (c = new ls({
                        headers: E,
                        status: s.status,
                        statusText: y,
                        url: R,
                      })),
                      c
                    );
                  },
                  l = () => {
                    let { headers: y, status: E, statusText: R, url: G } = u(),
                      k = null;
                    E !== YI &&
                      (k =
                        typeof s.response > "u" ? s.responseText : s.response),
                      E === 0 && (E = k ? Kp : 0);
                    let ee = E >= 200 && E < 300;
                    if (n.responseType === "json" && typeof k == "string") {
                      let ue = k;
                      k = k.replace(sC, "");
                      try {
                        k = k !== "" ? JSON.parse(k) : null;
                      } catch (ie) {
                        (k = ue),
                          ee && ((ee = !1), (k = { error: ie, text: k }));
                      }
                    }
                    ee
                      ? (i.next(
                          new zr({
                            body: k,
                            headers: y,
                            status: E,
                            statusText: R,
                            url: G || void 0,
                          })
                        ),
                        i.complete())
                      : i.error(
                          new Yt({
                            error: k,
                            headers: y,
                            status: E,
                            statusText: R,
                            url: G || void 0,
                          })
                        );
                  },
                  d = (y) => {
                    let { url: E } = u(),
                      R = new Yt({
                        error: y,
                        status: s.status || 0,
                        statusText: s.statusText || "Unknown Error",
                        url: E || void 0,
                      });
                    i.error(R);
                  },
                  h = !1,
                  f = (y) => {
                    h || (i.next(u()), (h = !0));
                    let E = { type: Kt.DownloadProgress, loaded: y.loaded };
                    y.lengthComputable && (E.total = y.total),
                      n.responseType === "text" &&
                        s.responseText &&
                        (E.partialText = s.responseText),
                      i.next(E);
                  },
                  g = (y) => {
                    let E = { type: Kt.UploadProgress, loaded: y.loaded };
                    y.lengthComputable && (E.total = y.total), i.next(E);
                  };
                return (
                  s.addEventListener("load", l),
                  s.addEventListener("error", d),
                  s.addEventListener("timeout", d),
                  s.addEventListener("abort", d),
                  n.reportProgress &&
                    (s.addEventListener("progress", f),
                    a !== null &&
                      s.upload &&
                      s.upload.addEventListener("progress", g)),
                  s.send(a),
                  i.next({ type: Kt.Sent }),
                  () => {
                    s.removeEventListener("error", d),
                      s.removeEventListener("abort", d),
                      s.removeEventListener("load", l),
                      s.removeEventListener("timeout", d),
                      n.reportProgress &&
                        (s.removeEventListener("progress", f),
                        a !== null &&
                          s.upload &&
                          s.upload.removeEventListener("progress", g)),
                      s.readyState !== s.DONE && s.abort();
                  }
                );
              })
          )
        );
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(Jn));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  eg = new w(""),
  cC = "XSRF-TOKEN",
  uC = new w("", { providedIn: "root", factory: () => cC }),
  lC = "X-XSRF-TOKEN",
  dC = new w("", { providedIn: "root", factory: () => lC }),
  ds = class {},
  fC = (() => {
    class e {
      constructor(n, r, o) {
        (this.doc = n),
          (this.platform = r),
          (this.cookieName = o),
          (this.lastCookieString = ""),
          (this.lastToken = null),
          (this.parseCount = 0);
      }
      getToken() {
        if (this.platform === "server") return null;
        let n = this.doc.cookie || "";
        return (
          n !== this.lastCookieString &&
            (this.parseCount++,
            (this.lastToken = os(n, this.cookieName)),
            (this.lastCookieString = n)),
          this.lastToken
        );
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(pe), b(lt), b(uC));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function hC(e, t) {
  let n = e.url.toLowerCase();
  if (
    !p(eg) ||
    e.method === "GET" ||
    e.method === "HEAD" ||
    n.startsWith("http://") ||
    n.startsWith("https://")
  )
    return t(e);
  let r = p(ds).getToken(),
    o = p(dC);
  return (
    r != null &&
      !e.headers.has(o) &&
      (e = e.clone({ headers: e.headers.set(o, r) })),
    t(e)
  );
}
var tg = (function (e) {
  return (
    (e[(e.Interceptors = 0)] = "Interceptors"),
    (e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
    (e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
    (e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
    (e[(e.JsonpSupport = 4)] = "JsonpSupport"),
    (e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
    (e[(e.Fetch = 6)] = "Fetch"),
    e
  );
})(tg || {});
function pC(e, t) {
  return { ɵkind: e, ɵproviders: t };
}
function gC(...e) {
  let t = [
    QI,
    Yp,
    Zp,
    { provide: $r, useExisting: Zp },
    { provide: us, useFactory: () => p(XI, { optional: !0 }) ?? p(Yp) },
    { provide: bu, useValue: hC, multi: !0 },
    { provide: eg, useValue: !0 },
    { provide: ds, useClass: fC },
  ];
  for (let n of e) t.push(...n.ɵproviders);
  return Ii(t);
}
var Qp = new w("");
function mC() {
  return pC(tg.LegacyInterceptors, [
    { provide: Qp, useFactory: iC },
    { provide: bu, useExisting: Qp, multi: !0 },
  ]);
}
var ng = (() => {
  class e {
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵmod = Ee({ type: e });
    }
    static {
      this.ɵinj = we({ providers: [gC(mC())] });
    }
  }
  return e;
})();
var Tu = class extends es {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  _u = class e extends Tu {
    static makeCurrent() {
      yp(new e());
    }
    onAndCancel(t, n, r) {
      return (
        t.addEventListener(n, r),
        () => {
          t.removeEventListener(n, r);
        }
      );
    }
    dispatchEvent(t, n) {
      t.dispatchEvent(n);
    }
    remove(t) {
      t.remove();
    }
    createElement(t, n) {
      return (n = n || this.getDefaultDocument()), n.createElement(t);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(t) {
      return t.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(t) {
      return t instanceof DocumentFragment;
    }
    getGlobalEventTarget(t, n) {
      return n === "window"
        ? window
        : n === "document"
        ? t
        : n === "body"
        ? t.body
        : null;
    }
    getBaseHref(t) {
      let n = vC();
      return n == null ? null : yC(n);
    }
    resetBaseElement() {
      Gr = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(t) {
      return os(document.cookie, t);
    }
  },
  Gr = null;
function vC() {
  return (
    (Gr = Gr || document.querySelector("base")),
    Gr ? Gr.getAttribute("href") : null
  );
}
function yC(e) {
  return new URL(e, document.baseURI).pathname;
}
var xu = class {
    addToWindow(t) {
      (ge.getAngularTestability = (r, o = !0) => {
        let i = t.findTestabilityInTree(r, o);
        if (i == null) throw new I(5103, !1);
        return i;
      }),
        (ge.getAllAngularTestabilities = () => t.getAllTestabilities()),
        (ge.getAllAngularRootElements = () => t.getAllRootElements());
      let n = (r) => {
        let o = ge.getAllAngularTestabilities(),
          i = o.length,
          s = function () {
            i--, i == 0 && r();
          };
        o.forEach((a) => {
          a.whenStable(s);
        });
      };
      ge.frameworkStabilizers || (ge.frameworkStabilizers = []),
        ge.frameworkStabilizers.push(n);
    }
    findTestabilityInTree(t, n, r) {
      if (n == null) return null;
      let o = t.getTestability(n);
      return (
        o ??
        (r
          ? mn().isShadowRoot(n)
            ? this.findTestabilityInTree(t, n.host, !0)
            : this.findTestabilityInTree(t, n.parentElement, !0)
          : null)
      );
    }
  },
  DC = (() => {
    class e {
      build() {
        return new XMLHttpRequest();
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  Nu = new w(""),
  sg = (() => {
    class e {
      constructor(n, r) {
        (this._zone = r),
          (this._eventNameToPlugin = new Map()),
          n.forEach((o) => {
            o.manager = this;
          }),
          (this._plugins = n.slice().reverse());
      }
      addEventListener(n, r, o) {
        return this._findPluginFor(r).addEventListener(n, r, o);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(n) {
        let r = this._eventNameToPlugin.get(n);
        if (r) return r;
        if (((r = this._plugins.find((i) => i.supports(n))), !r))
          throw new I(5101, !1);
        return this._eventNameToPlugin.set(n, r), r;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(Nu), b(q));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  fs = class {
    constructor(t) {
      this._doc = t;
    }
  },
  Mu = "ng-app-id",
  ag = (() => {
    class e {
      constructor(n, r, o, i = {}) {
        (this.doc = n),
          (this.appId = r),
          (this.nonce = o),
          (this.platformId = i),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = as(i)),
          this.resetHostNodes();
      }
      addStyles(n) {
        for (let r of n)
          this.changeUsageCount(r, 1) === 1 && this.onStyleAdded(r);
      }
      removeStyles(n) {
        for (let r of n)
          this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
      }
      ngOnDestroy() {
        let n = this.styleNodesInDOM;
        n && (n.forEach((r) => r.remove()), n.clear());
        for (let r of this.getAllStyles()) this.onStyleRemoved(r);
        this.resetHostNodes();
      }
      addHost(n) {
        this.hostNodes.add(n);
        for (let r of this.getAllStyles()) this.addStyleToHost(n, r);
      }
      removeHost(n) {
        this.hostNodes.delete(n);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(n) {
        for (let r of this.hostNodes) this.addStyleToHost(r, n);
      }
      onStyleRemoved(n) {
        let r = this.styleRef;
        r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
      }
      collectServerRenderedStyles() {
        let n = this.doc.head?.querySelectorAll(`style[${Mu}="${this.appId}"]`);
        if (n?.length) {
          let r = new Map();
          return (
            n.forEach((o) => {
              o.textContent != null && r.set(o.textContent, o);
            }),
            r
          );
        }
        return null;
      }
      changeUsageCount(n, r) {
        let o = this.styleRef;
        if (o.has(n)) {
          let i = o.get(n);
          return (i.usage += r), i.usage;
        }
        return o.set(n, { usage: r, elements: [] }), r;
      }
      getStyleElement(n, r) {
        let o = this.styleNodesInDOM,
          i = o?.get(r);
        if (i?.parentNode === n) return o.delete(r), i.removeAttribute(Mu), i;
        {
          let s = this.doc.createElement("style");
          return (
            this.nonce && s.setAttribute("nonce", this.nonce),
            (s.textContent = r),
            this.platformIsServer && s.setAttribute(Mu, this.appId),
            n.appendChild(s),
            s
          );
        }
      }
      addStyleToHost(n, r) {
        let o = this.getStyleElement(n, r),
          i = this.styleRef,
          s = i.get(r)?.elements;
        s ? s.push(o) : i.set(r, { elements: [o], usage: 1 });
      }
      resetHostNodes() {
        let n = this.hostNodes;
        n.clear(), n.add(this.doc.head);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(pe), b(Ni), b(Ac, 8), b(lt));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  Su = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/Math/MathML",
  },
  Ru = /%COMP%/g,
  cg = "%COMP%",
  wC = `_nghost-${cg}`,
  EC = `_ngcontent-${cg}`,
  IC = !0,
  CC = new w("", { providedIn: "root", factory: () => IC });
function bC(e) {
  return EC.replace(Ru, e);
}
function MC(e) {
  return wC.replace(Ru, e);
}
function ug(e, t) {
  return t.map((n) => n.replace(Ru, e));
}
var rg = (() => {
    class e {
      constructor(n, r, o, i, s, a, c, u = null) {
        (this.eventManager = n),
          (this.sharedStylesHost = r),
          (this.appId = o),
          (this.removeStylesOnCompDestroy = i),
          (this.doc = s),
          (this.platformId = a),
          (this.ngZone = c),
          (this.nonce = u),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = as(a)),
          (this.defaultRenderer = new qr(n, s, c, this.platformIsServer));
      }
      createRenderer(n, r) {
        if (!n || !r) return this.defaultRenderer;
        this.platformIsServer &&
          r.encapsulation === ot.ShadowDom &&
          (r = K(D({}, r), { encapsulation: ot.Emulated }));
        let o = this.getOrCreateRenderer(n, r);
        return (
          o instanceof hs
            ? o.applyToHost(n)
            : o instanceof Wr && o.applyStyles(),
          o
        );
      }
      getOrCreateRenderer(n, r) {
        let o = this.rendererByCompId,
          i = o.get(r.id);
        if (!i) {
          let s = this.doc,
            a = this.ngZone,
            c = this.eventManager,
            u = this.sharedStylesHost,
            l = this.removeStylesOnCompDestroy,
            d = this.platformIsServer;
          switch (r.encapsulation) {
            case ot.Emulated:
              i = new hs(c, u, r, this.appId, l, s, a, d);
              break;
            case ot.ShadowDom:
              return new Au(c, u, n, r, s, a, this.nonce, d);
            default:
              i = new Wr(c, u, r, l, s, a, d);
              break;
          }
          o.set(r.id, i);
        }
        return i;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(
            b(sg),
            b(ag),
            b(Ni),
            b(CC),
            b(pe),
            b(lt),
            b(q),
            b(Ac)
          );
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  qr = class {
    constructor(t, n, r, o) {
      (this.eventManager = t),
        (this.doc = n),
        (this.ngZone = r),
        (this.platformIsServer = o),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(t, n) {
      return n
        ? this.doc.createElementNS(Su[n] || n, t)
        : this.doc.createElement(t);
    }
    createComment(t) {
      return this.doc.createComment(t);
    }
    createText(t) {
      return this.doc.createTextNode(t);
    }
    appendChild(t, n) {
      (og(t) ? t.content : t).appendChild(n);
    }
    insertBefore(t, n, r) {
      t && (og(t) ? t.content : t).insertBefore(n, r);
    }
    removeChild(t, n) {
      n.remove();
    }
    selectRootElement(t, n) {
      let r = typeof t == "string" ? this.doc.querySelector(t) : t;
      if (!r) throw new I(-5104, !1);
      return n || (r.textContent = ""), r;
    }
    parentNode(t) {
      return t.parentNode;
    }
    nextSibling(t) {
      return t.nextSibling;
    }
    setAttribute(t, n, r, o) {
      if (o) {
        n = o + ":" + n;
        let i = Su[o];
        i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
      } else t.setAttribute(n, r);
    }
    removeAttribute(t, n, r) {
      if (r) {
        let o = Su[r];
        o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
      } else t.removeAttribute(n);
    }
    addClass(t, n) {
      t.classList.add(n);
    }
    removeClass(t, n) {
      t.classList.remove(n);
    }
    setStyle(t, n, r, o) {
      o & (Dt.DashCase | Dt.Important)
        ? t.style.setProperty(n, r, o & Dt.Important ? "important" : "")
        : (t.style[n] = r);
    }
    removeStyle(t, n, r) {
      r & Dt.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
    }
    setProperty(t, n, r) {
      t != null && (t[n] = r);
    }
    setValue(t, n) {
      t.nodeValue = n;
    }
    listen(t, n, r) {
      if (
        typeof t == "string" &&
        ((t = mn().getGlobalEventTarget(this.doc, t)), !t)
      )
        throw new Error(`Unsupported event target ${t} for event ${n}`);
      return this.eventManager.addEventListener(
        t,
        n,
        this.decoratePreventDefault(r)
      );
    }
    decoratePreventDefault(t) {
      return (n) => {
        if (n === "__ngUnwrap__") return t;
        (this.platformIsServer ? this.ngZone.runGuarded(() => t(n)) : t(n)) ===
          !1 && n.preventDefault();
      };
    }
  };
function og(e) {
  return e.tagName === "TEMPLATE" && e.content !== void 0;
}
var Au = class extends qr {
    constructor(t, n, r, o, i, s, a, c) {
      super(t, i, s, c),
        (this.sharedStylesHost = n),
        (this.hostEl = r),
        (this.shadowRoot = r.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let u = ug(o.id, o.styles);
      for (let l of u) {
        let d = document.createElement("style");
        a && d.setAttribute("nonce", a),
          (d.textContent = l),
          this.shadowRoot.appendChild(d);
      }
    }
    nodeOrShadowRoot(t) {
      return t === this.hostEl ? this.shadowRoot : t;
    }
    appendChild(t, n) {
      return super.appendChild(this.nodeOrShadowRoot(t), n);
    }
    insertBefore(t, n, r) {
      return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
    }
    removeChild(t, n) {
      return super.removeChild(null, n);
    }
    parentNode(t) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  Wr = class extends qr {
    constructor(t, n, r, o, i, s, a, c) {
      super(t, i, s, a),
        (this.sharedStylesHost = n),
        (this.removeStylesOnCompDestroy = o),
        (this.styles = c ? ug(c, r.styles) : r.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  hs = class extends Wr {
    constructor(t, n, r, o, i, s, a, c) {
      let u = o + "-" + r.id;
      super(t, n, r, i, s, a, c, u),
        (this.contentAttr = bC(u)),
        (this.hostAttr = MC(u));
    }
    applyToHost(t) {
      this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
    }
    createElement(t, n) {
      let r = super.createElement(t, n);
      return super.setAttribute(r, this.contentAttr, ""), r;
    }
  },
  SC = (() => {
    class e extends fs {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return !0;
      }
      addEventListener(n, r, o) {
        return (
          n.addEventListener(r, o, !1), () => this.removeEventListener(n, r, o)
        );
      }
      removeEventListener(n, r, o) {
        return n.removeEventListener(r, o);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(pe));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  ig = ["alt", "control", "meta", "shift"],
  TC = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS",
  },
  _C = {
    alt: (e) => e.altKey,
    control: (e) => e.ctrlKey,
    meta: (e) => e.metaKey,
    shift: (e) => e.shiftKey,
  },
  xC = (() => {
    class e extends fs {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return e.parseEventName(n) != null;
      }
      addEventListener(n, r, o) {
        let i = e.parseEventName(r),
          s = e.eventCallback(i.fullKey, o, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => mn().onAndCancel(n, i.domEventName, s));
      }
      static parseEventName(n) {
        let r = n.toLowerCase().split("."),
          o = r.shift();
        if (r.length === 0 || !(o === "keydown" || o === "keyup")) return null;
        let i = e._normalizeKey(r.pop()),
          s = "",
          a = r.indexOf("code");
        if (
          (a > -1 && (r.splice(a, 1), (s = "code.")),
          ig.forEach((u) => {
            let l = r.indexOf(u);
            l > -1 && (r.splice(l, 1), (s += u + "."));
          }),
          (s += i),
          r.length != 0 || i.length === 0)
        )
          return null;
        let c = {};
        return (c.domEventName = o), (c.fullKey = s), c;
      }
      static matchEventFullKeyCode(n, r) {
        let o = TC[n.key] || n.key,
          i = "";
        return (
          r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
          o == null || !o
            ? !1
            : ((o = o.toLowerCase()),
              o === " " ? (o = "space") : o === "." && (o = "dot"),
              ig.forEach((s) => {
                if (s !== o) {
                  let a = _C[s];
                  a(n) && (i += s + ".");
                }
              }),
              (i += o),
              i === r)
        );
      }
      static eventCallback(n, r, o) {
        return (i) => {
          e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
        };
      }
      static _normalizeKey(n) {
        return n === "esc" ? "escape" : n;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(pe));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function NC() {
  _u.makeCurrent();
}
function AC() {
  return new yt();
}
function RC() {
  return ih(document), document;
}
var OC = [
    { provide: lt, useValue: vu },
    { provide: Nc, useValue: NC, multi: !0 },
    { provide: pe, useFactory: RC, deps: [] },
  ],
  lg = tu(ip, "browser", OC),
  PC = new w(""),
  FC = [
    { provide: kr, useClass: xu, deps: [] },
    { provide: Jc, useClass: Bi, deps: [q, $i, kr] },
    { provide: Bi, useClass: Bi, deps: [q, $i, kr] },
  ],
  kC = [
    { provide: Ci, useValue: "root" },
    { provide: yt, useFactory: AC, deps: [] },
    { provide: Nu, useClass: SC, multi: !0, deps: [pe, q, lt] },
    { provide: Nu, useClass: xC, multi: !0, deps: [pe] },
    rg,
    ag,
    sg,
    { provide: Gn, useExisting: rg },
    { provide: Jn, useClass: DC, deps: [] },
    [],
  ],
  dg = (() => {
    class e {
      constructor(n) {}
      static withServerTransition(n) {
        return { ngModule: e, providers: [{ provide: Ni, useValue: n.appId }] };
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(PC, 12));
        };
      }
      static {
        this.ɵmod = Ee({ type: e });
      }
      static {
        this.ɵinj = we({ providers: [...kC, ...FC], imports: [ss, sp] });
      }
    }
    return e;
  })();
var fg = (() => {
  class e {
    constructor(n) {
      this._doc = n;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(n) {
      this._doc.title = n || "";
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(b(pe));
      };
    }
    static {
      this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var x = "primary",
  ao = Symbol("RouteTitle"),
  Lu = class {
    constructor(t) {
      this.params = t || {};
    }
    has(t) {
      return Object.prototype.hasOwnProperty.call(this.params, t);
    }
    get(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n[0] : n;
      }
      return null;
    }
    getAll(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n : [n];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function sr(e) {
  return new Lu(e);
}
function LC(e, t, n) {
  let r = n.path.split("/");
  if (
    r.length > e.length ||
    (n.pathMatch === "full" && (t.hasChildren() || r.length < e.length))
  )
    return null;
  let o = {};
  for (let i = 0; i < r.length; i++) {
    let s = r[i],
      a = e[i];
    if (s[0] === ":") o[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: e.slice(0, r.length), posParams: o };
}
function jC(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; ++n) if (!ft(e[n], t[n])) return !1;
  return !0;
}
function ft(e, t) {
  let n = e ? ju(e) : void 0,
    r = t ? ju(t) : void 0;
  if (!n || !r || n.length != r.length) return !1;
  let o;
  for (let i = 0; i < n.length; i++)
    if (((o = n[i]), !bg(e[o], t[o]))) return !1;
  return !0;
}
function ju(e) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
}
function bg(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return !1;
    let n = [...e].sort(),
      r = [...t].sort();
    return n.every((o, i) => r[i] === o);
  } else return e === t;
}
function Mg(e) {
  return e.length > 0 ? e[e.length - 1] : null;
}
function en(e) {
  return ia(e) ? e : Lr(e) ? J(Promise.resolve(e)) : S(e);
}
var VC = { exact: Tg, subset: _g },
  Sg = { exact: UC, subset: BC, ignored: () => !0 };
function pg(e, t, n) {
  return (
    VC[n.paths](e.root, t.root, n.matrixParams) &&
    Sg[n.queryParams](e.queryParams, t.queryParams) &&
    !(n.fragment === "exact" && e.fragment !== t.fragment)
  );
}
function UC(e, t) {
  return ft(e, t);
}
function Tg(e, t, n) {
  if (
    !yn(e.segments, t.segments) ||
    !ms(e.segments, t.segments, n) ||
    e.numberOfChildren !== t.numberOfChildren
  )
    return !1;
  for (let r in t.children)
    if (!e.children[r] || !Tg(e.children[r], t.children[r], n)) return !1;
  return !0;
}
function BC(e, t) {
  return (
    Object.keys(t).length <= Object.keys(e).length &&
    Object.keys(t).every((n) => bg(e[n], t[n]))
  );
}
function _g(e, t, n) {
  return xg(e, t, t.segments, n);
}
function xg(e, t, n, r) {
  if (e.segments.length > n.length) {
    let o = e.segments.slice(0, n.length);
    return !(!yn(o, n) || t.hasChildren() || !ms(o, n, r));
  } else if (e.segments.length === n.length) {
    if (!yn(e.segments, n) || !ms(e.segments, n, r)) return !1;
    for (let o in t.children)
      if (!e.children[o] || !_g(e.children[o], t.children[o], r)) return !1;
    return !0;
  } else {
    let o = n.slice(0, e.segments.length),
      i = n.slice(e.segments.length);
    return !yn(e.segments, o) || !ms(e.segments, o, r) || !e.children[x]
      ? !1
      : xg(e.children[x], t, i, r);
  }
}
function ms(e, t, n) {
  return t.every((r, o) => Sg[n](e[o].parameters, r.parameters));
}
var Rt = class {
    constructor(t = new z([], {}), n = {}, r = null) {
      (this.root = t), (this.queryParams = n), (this.fragment = r);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= sr(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return zC.serialize(this);
    }
  },
  z = class {
    constructor(t, n) {
      (this.segments = t),
        (this.children = n),
        (this.parent = null),
        Object.values(n).forEach((r) => (r.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return vs(this);
    }
  },
  vn = class {
    constructor(t, n) {
      (this.path = t), (this.parameters = n);
    }
    get parameterMap() {
      return (this._parameterMap ??= sr(this.parameters)), this._parameterMap;
    }
    toString() {
      return Ag(this);
    }
  };
function $C(e, t) {
  return yn(e, t) && e.every((n, r) => ft(n.parameters, t[r].parameters));
}
function yn(e, t) {
  return e.length !== t.length ? !1 : e.every((n, r) => n.path === t[r].path);
}
function HC(e, t) {
  let n = [];
  return (
    Object.entries(e.children).forEach(([r, o]) => {
      r === x && (n = n.concat(t(o, r)));
    }),
    Object.entries(e.children).forEach(([r, o]) => {
      r !== x && (n = n.concat(t(o, r)));
    }),
    n
  );
}
var co = (() => {
    class e {
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({
          token: e,
          factory: () => new ar(),
          providedIn: "root",
        });
      }
    }
    return e;
  })(),
  ar = class {
    parse(t) {
      let n = new Uu(t);
      return new Rt(
        n.parseRootSegment(),
        n.parseQueryParams(),
        n.parseFragment()
      );
    }
    serialize(t) {
      let n = `/${Zr(t.root, !0)}`,
        r = WC(t.queryParams),
        o = typeof t.fragment == "string" ? `#${GC(t.fragment)}` : "";
      return `${n}${r}${o}`;
    }
  },
  zC = new ar();
function vs(e) {
  return e.segments.map((t) => Ag(t)).join("/");
}
function Zr(e, t) {
  if (!e.hasChildren()) return vs(e);
  if (t) {
    let n = e.children[x] ? Zr(e.children[x], !1) : "",
      r = [];
    return (
      Object.entries(e.children).forEach(([o, i]) => {
        o !== x && r.push(`${o}:${Zr(i, !1)}`);
      }),
      r.length > 0 ? `${n}(${r.join("//")})` : n
    );
  } else {
    let n = HC(e, (r, o) =>
      o === x ? [Zr(e.children[x], !1)] : [`${o}:${Zr(r, !1)}`]
    );
    return Object.keys(e.children).length === 1 && e.children[x] != null
      ? `${vs(e)}/${n[0]}`
      : `${vs(e)}/(${n.join("//")})`;
  }
}
function Ng(e) {
  return encodeURIComponent(e)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function ps(e) {
  return Ng(e).replace(/%3B/gi, ";");
}
function GC(e) {
  return encodeURI(e);
}
function Vu(e) {
  return Ng(e)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function ys(e) {
  return decodeURIComponent(e);
}
function gg(e) {
  return ys(e.replace(/\+/g, "%20"));
}
function Ag(e) {
  return `${Vu(e.path)}${qC(e.parameters)}`;
}
function qC(e) {
  return Object.entries(e)
    .map(([t, n]) => `;${Vu(t)}=${Vu(n)}`)
    .join("");
}
function WC(e) {
  let t = Object.entries(e)
    .map(([n, r]) =>
      Array.isArray(r)
        ? r.map((o) => `${ps(n)}=${ps(o)}`).join("&")
        : `${ps(n)}=${ps(r)}`
    )
    .filter((n) => n);
  return t.length ? `?${t.join("&")}` : "";
}
var ZC = /^[^\/()?;#]+/;
function Ou(e) {
  let t = e.match(ZC);
  return t ? t[0] : "";
}
var YC = /^[^\/()?;=#]+/;
function QC(e) {
  let t = e.match(YC);
  return t ? t[0] : "";
}
var KC = /^[^=?&#]+/;
function JC(e) {
  let t = e.match(KC);
  return t ? t[0] : "";
}
var XC = /^[^&#]+/;
function eb(e) {
  let t = e.match(XC);
  return t ? t[0] : "";
}
var Uu = class {
  constructor(t) {
    (this.url = t), (this.remaining = t);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new z([], {})
        : new z([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let t = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(t);
      while (this.consumeOptional("&"));
    return t;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let t = [];
    for (
      this.peekStartsWith("(") || t.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), t.push(this.parseSegment());
    let n = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (n = this.parseParens(!0)));
    let r = {};
    return (
      this.peekStartsWith("(") && (r = this.parseParens(!1)),
      (t.length > 0 || Object.keys(n).length > 0) && (r[x] = new z(t, n)),
      r
    );
  }
  parseSegment() {
    let t = Ou(this.remaining);
    if (t === "" && this.peekStartsWith(";")) throw new I(4009, !1);
    return this.capture(t), new vn(ys(t), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let t = {};
    for (; this.consumeOptional(";"); ) this.parseParam(t);
    return t;
  }
  parseParam(t) {
    let n = QC(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = "";
    if (this.consumeOptional("=")) {
      let o = Ou(this.remaining);
      o && ((r = o), this.capture(r));
    }
    t[ys(n)] = ys(r);
  }
  parseQueryParam(t) {
    let n = JC(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = "";
    if (this.consumeOptional("=")) {
      let s = eb(this.remaining);
      s && ((r = s), this.capture(r));
    }
    let o = gg(n),
      i = gg(r);
    if (t.hasOwnProperty(o)) {
      let s = t[o];
      Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
    } else t[o] = i;
  }
  parseParens(t) {
    let n = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let r = Ou(this.remaining),
        o = this.remaining[r.length];
      if (o !== "/" && o !== ")" && o !== ";") throw new I(4010, !1);
      let i;
      r.indexOf(":") > -1
        ? ((i = r.slice(0, r.indexOf(":"))), this.capture(i), this.capture(":"))
        : t && (i = x);
      let s = this.parseChildren();
      (n[i] = Object.keys(s).length === 1 ? s[x] : new z([], s)),
        this.consumeOptional("//");
    }
    return n;
  }
  peekStartsWith(t) {
    return this.remaining.startsWith(t);
  }
  consumeOptional(t) {
    return this.peekStartsWith(t)
      ? ((this.remaining = this.remaining.substring(t.length)), !0)
      : !1;
  }
  capture(t) {
    if (!this.consumeOptional(t)) throw new I(4011, !1);
  }
};
function Rg(e) {
  return e.segments.length > 0 ? new z([], { [x]: e }) : e;
}
function Og(e) {
  let t = {};
  for (let [r, o] of Object.entries(e.children)) {
    let i = Og(o);
    if (r === x && i.segments.length === 0 && i.hasChildren())
      for (let [s, a] of Object.entries(i.children)) t[s] = a;
    else (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
  }
  let n = new z(e.segments, t);
  return tb(n);
}
function tb(e) {
  if (e.numberOfChildren === 1 && e.children[x]) {
    let t = e.children[x];
    return new z(e.segments.concat(t.segments), t.children);
  }
  return e;
}
function Dn(e) {
  return e instanceof Rt;
}
function nb(e, t, n = null, r = null) {
  let o = Pg(e);
  return Fg(o, t, n, r);
}
function Pg(e) {
  let t;
  function n(i) {
    let s = {};
    for (let c of i.children) {
      let u = n(c);
      s[c.outlet] = u;
    }
    let a = new z(i.url, s);
    return i === e && (t = a), a;
  }
  let r = n(e.root),
    o = Rg(r);
  return t ?? o;
}
function Fg(e, t, n, r) {
  let o = e;
  for (; o.parent; ) o = o.parent;
  if (t.length === 0) return Pu(o, o, o, n, r);
  let i = rb(t);
  if (i.toRoot()) return Pu(o, o, new z([], {}), n, r);
  let s = ob(i, o, e),
    a = s.processChildren
      ? Kr(s.segmentGroup, s.index, i.commands)
      : Lg(s.segmentGroup, s.index, i.commands);
  return Pu(o, s.segmentGroup, a, n, r);
}
function Ds(e) {
  return typeof e == "object" && e != null && !e.outlets && !e.segmentPath;
}
function eo(e) {
  return typeof e == "object" && e != null && e.outlets;
}
function Pu(e, t, n, r, o) {
  let i = {};
  r &&
    Object.entries(r).forEach(([c, u]) => {
      i[c] = Array.isArray(u) ? u.map((l) => `${l}`) : `${u}`;
    });
  let s;
  e === t ? (s = n) : (s = kg(e, t, n));
  let a = Rg(Og(s));
  return new Rt(a, i, o);
}
function kg(e, t, n) {
  let r = {};
  return (
    Object.entries(e.children).forEach(([o, i]) => {
      i === t ? (r[o] = n) : (r[o] = kg(i, t, n));
    }),
    new z(e.segments, r)
  );
}
var ws = class {
  constructor(t, n, r) {
    if (
      ((this.isAbsolute = t),
      (this.numberOfDoubleDots = n),
      (this.commands = r),
      t && r.length > 0 && Ds(r[0]))
    )
      throw new I(4003, !1);
    let o = r.find(eo);
    if (o && o !== Mg(r)) throw new I(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function rb(e) {
  if (typeof e[0] == "string" && e.length === 1 && e[0] === "/")
    return new ws(!0, 0, e);
  let t = 0,
    n = !1,
    r = e.reduce((o, i, s) => {
      if (typeof i == "object" && i != null) {
        if (i.outlets) {
          let a = {};
          return (
            Object.entries(i.outlets).forEach(([c, u]) => {
              a[c] = typeof u == "string" ? u.split("/") : u;
            }),
            [...o, { outlets: a }]
          );
        }
        if (i.segmentPath) return [...o, i.segmentPath];
      }
      return typeof i != "string"
        ? [...o, i]
        : s === 0
        ? (i.split("/").forEach((a, c) => {
            (c == 0 && a === ".") ||
              (c == 0 && a === ""
                ? (n = !0)
                : a === ".."
                ? t++
                : a != "" && o.push(a));
          }),
          o)
        : [...o, i];
    }, []);
  return new ws(n, t, r);
}
var rr = class {
  constructor(t, n, r) {
    (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
  }
};
function ob(e, t, n) {
  if (e.isAbsolute) return new rr(t, !0, 0);
  if (!n) return new rr(t, !1, NaN);
  if (n.parent === null) return new rr(n, !0, 0);
  let r = Ds(e.commands[0]) ? 0 : 1,
    o = n.segments.length - 1 + r;
  return ib(n, o, e.numberOfDoubleDots);
}
function ib(e, t, n) {
  let r = e,
    o = t,
    i = n;
  for (; i > o; ) {
    if (((i -= o), (r = r.parent), !r)) throw new I(4005, !1);
    o = r.segments.length;
  }
  return new rr(r, !1, o - i);
}
function sb(e) {
  return eo(e[0]) ? e[0].outlets : { [x]: e };
}
function Lg(e, t, n) {
  if (((e ??= new z([], {})), e.segments.length === 0 && e.hasChildren()))
    return Kr(e, t, n);
  let r = ab(e, t, n),
    o = n.slice(r.commandIndex);
  if (r.match && r.pathIndex < e.segments.length) {
    let i = new z(e.segments.slice(0, r.pathIndex), {});
    return (
      (i.children[x] = new z(e.segments.slice(r.pathIndex), e.children)),
      Kr(i, 0, o)
    );
  } else
    return r.match && o.length === 0
      ? new z(e.segments, {})
      : r.match && !e.hasChildren()
      ? Bu(e, t, n)
      : r.match
      ? Kr(e, 0, o)
      : Bu(e, t, n);
}
function Kr(e, t, n) {
  if (n.length === 0) return new z(e.segments, {});
  {
    let r = sb(n),
      o = {};
    if (
      Object.keys(r).some((i) => i !== x) &&
      e.children[x] &&
      e.numberOfChildren === 1 &&
      e.children[x].segments.length === 0
    ) {
      let i = Kr(e.children[x], t, n);
      return new z(e.segments, i.children);
    }
    return (
      Object.entries(r).forEach(([i, s]) => {
        typeof s == "string" && (s = [s]),
          s !== null && (o[i] = Lg(e.children[i], t, s));
      }),
      Object.entries(e.children).forEach(([i, s]) => {
        r[i] === void 0 && (o[i] = s);
      }),
      new z(e.segments, o)
    );
  }
}
function ab(e, t, n) {
  let r = 0,
    o = t,
    i = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; o < e.segments.length; ) {
    if (r >= n.length) return i;
    let s = e.segments[o],
      a = n[r];
    if (eo(a)) break;
    let c = `${a}`,
      u = r < n.length - 1 ? n[r + 1] : null;
    if (o > 0 && c === void 0) break;
    if (c && u && typeof u == "object" && u.outlets === void 0) {
      if (!vg(c, u, s)) return i;
      r += 2;
    } else {
      if (!vg(c, {}, s)) return i;
      r++;
    }
    o++;
  }
  return { match: !0, pathIndex: o, commandIndex: r };
}
function Bu(e, t, n) {
  let r = e.segments.slice(0, t),
    o = 0;
  for (; o < n.length; ) {
    let i = n[o];
    if (eo(i)) {
      let c = cb(i.outlets);
      return new z(r, c);
    }
    if (o === 0 && Ds(n[0])) {
      let c = e.segments[t];
      r.push(new vn(c.path, mg(n[0]))), o++;
      continue;
    }
    let s = eo(i) ? i.outlets[x] : `${i}`,
      a = o < n.length - 1 ? n[o + 1] : null;
    s && a && Ds(a)
      ? (r.push(new vn(s, mg(a))), (o += 2))
      : (r.push(new vn(s, {})), o++);
  }
  return new z(r, {});
}
function cb(e) {
  let t = {};
  return (
    Object.entries(e).forEach(([n, r]) => {
      typeof r == "string" && (r = [r]),
        r !== null && (t[n] = Bu(new z([], {}), 0, r));
    }),
    t
  );
}
function mg(e) {
  let t = {};
  return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
}
function vg(e, t, n) {
  return e == n.path && ft(t, n.parameters);
}
var Jr = "imperative",
  ce = (function (e) {
    return (
      (e[(e.NavigationStart = 0)] = "NavigationStart"),
      (e[(e.NavigationEnd = 1)] = "NavigationEnd"),
      (e[(e.NavigationCancel = 2)] = "NavigationCancel"),
      (e[(e.NavigationError = 3)] = "NavigationError"),
      (e[(e.RoutesRecognized = 4)] = "RoutesRecognized"),
      (e[(e.ResolveStart = 5)] = "ResolveStart"),
      (e[(e.ResolveEnd = 6)] = "ResolveEnd"),
      (e[(e.GuardsCheckStart = 7)] = "GuardsCheckStart"),
      (e[(e.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
      (e[(e.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
      (e[(e.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
      (e[(e.ChildActivationStart = 11)] = "ChildActivationStart"),
      (e[(e.ChildActivationEnd = 12)] = "ChildActivationEnd"),
      (e[(e.ActivationStart = 13)] = "ActivationStart"),
      (e[(e.ActivationEnd = 14)] = "ActivationEnd"),
      (e[(e.Scroll = 15)] = "Scroll"),
      (e[(e.NavigationSkipped = 16)] = "NavigationSkipped"),
      e
    );
  })(ce || {}),
  He = class {
    constructor(t, n) {
      (this.id = t), (this.url = n);
    }
  },
  cr = class extends He {
    constructor(t, n, r = "imperative", o = null) {
      super(t, n),
        (this.type = ce.NavigationStart),
        (this.navigationTrigger = r),
        (this.restoredState = o);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  ht = class extends He {
    constructor(t, n, r) {
      super(t, n), (this.urlAfterRedirects = r), (this.type = ce.NavigationEnd);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  Fe = (function (e) {
    return (
      (e[(e.Redirect = 0)] = "Redirect"),
      (e[(e.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (e[(e.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (e[(e.GuardRejected = 3)] = "GuardRejected"),
      e
    );
  })(Fe || {}),
  Es = (function (e) {
    return (
      (e[(e.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (e[(e.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      e
    );
  })(Es || {}),
  At = class extends He {
    constructor(t, n, r, o) {
      super(t, n),
        (this.reason = r),
        (this.code = o),
        (this.type = ce.NavigationCancel);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Jt = class extends He {
    constructor(t, n, r, o) {
      super(t, n),
        (this.reason = r),
        (this.code = o),
        (this.type = ce.NavigationSkipped);
    }
  },
  to = class extends He {
    constructor(t, n, r, o) {
      super(t, n),
        (this.error = r),
        (this.target = o),
        (this.type = ce.NavigationError);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  Is = class extends He {
    constructor(t, n, r, o) {
      super(t, n),
        (this.urlAfterRedirects = r),
        (this.state = o),
        (this.type = ce.RoutesRecognized);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  $u = class extends He {
    constructor(t, n, r, o) {
      super(t, n),
        (this.urlAfterRedirects = r),
        (this.state = o),
        (this.type = ce.GuardsCheckStart);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Hu = class extends He {
    constructor(t, n, r, o, i) {
      super(t, n),
        (this.urlAfterRedirects = r),
        (this.state = o),
        (this.shouldActivate = i),
        (this.type = ce.GuardsCheckEnd);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  zu = class extends He {
    constructor(t, n, r, o) {
      super(t, n),
        (this.urlAfterRedirects = r),
        (this.state = o),
        (this.type = ce.ResolveStart);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Gu = class extends He {
    constructor(t, n, r, o) {
      super(t, n),
        (this.urlAfterRedirects = r),
        (this.state = o),
        (this.type = ce.ResolveEnd);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  qu = class {
    constructor(t) {
      (this.route = t), (this.type = ce.RouteConfigLoadStart);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  Wu = class {
    constructor(t) {
      (this.route = t), (this.type = ce.RouteConfigLoadEnd);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  Zu = class {
    constructor(t) {
      (this.snapshot = t), (this.type = ce.ChildActivationStart);
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Yu = class {
    constructor(t) {
      (this.snapshot = t), (this.type = ce.ChildActivationEnd);
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Qu = class {
    constructor(t) {
      (this.snapshot = t), (this.type = ce.ActivationStart);
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Ku = class {
    constructor(t) {
      (this.snapshot = t), (this.type = ce.ActivationEnd);
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Cs = class {
    constructor(t, n, r) {
      (this.routerEvent = t),
        (this.position = n),
        (this.anchor = r),
        (this.type = ce.Scroll);
    }
    toString() {
      let t = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
      return `Scroll(anchor: '${this.anchor}', position: '${t}')`;
    }
  },
  no = class {},
  ur = class {
    constructor(t, n) {
      (this.url = t), (this.navigationBehaviorOptions = n);
    }
  };
function ub(e, t) {
  return (
    e.providers &&
      !e._injector &&
      (e._injector = Li(e.providers, t, `Route: ${e.path}`)),
    e._injector ?? t
  );
}
function et(e) {
  return e.outlet || x;
}
function lb(e, t) {
  let n = e.filter((r) => et(r) === t);
  return n.push(...e.filter((r) => et(r) !== t)), n;
}
function uo(e) {
  if (!e) return null;
  if (e.routeConfig?._injector) return e.routeConfig._injector;
  for (let t = e.parent; t; t = t.parent) {
    let n = t.routeConfig;
    if (n?._loadedInjector) return n._loadedInjector;
    if (n?._injector) return n._injector;
  }
  return null;
}
var Ju = class {
    get injector() {
      return uo(this.route?.snapshot) ?? this.rootInjector;
    }
    set injector(t) {}
    constructor(t) {
      (this.rootInjector = t),
        (this.outlet = null),
        (this.route = null),
        (this.children = new lo(this.rootInjector)),
        (this.attachRef = null);
    }
  },
  lo = (() => {
    class e {
      constructor(n) {
        (this.rootInjector = n), (this.contexts = new Map());
      }
      onChildOutletCreated(n, r) {
        let o = this.getOrCreateContext(n);
        (o.outlet = r), this.contexts.set(n, o);
      }
      onChildOutletDestroyed(n) {
        let r = this.getContext(n);
        r && ((r.outlet = null), (r.attachRef = null));
      }
      onOutletDeactivated() {
        let n = this.contexts;
        return (this.contexts = new Map()), n;
      }
      onOutletReAttached(n) {
        this.contexts = n;
      }
      getOrCreateContext(n) {
        let r = this.getContext(n);
        return (
          r || ((r = new Ju(this.rootInjector)), this.contexts.set(n, r)), r
        );
      }
      getContext(n) {
        return this.contexts.get(n) || null;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(ye));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  bs = class {
    constructor(t) {
      this._root = t;
    }
    get root() {
      return this._root.value;
    }
    parent(t) {
      let n = this.pathFromRoot(t);
      return n.length > 1 ? n[n.length - 2] : null;
    }
    children(t) {
      let n = Xu(t, this._root);
      return n ? n.children.map((r) => r.value) : [];
    }
    firstChild(t) {
      let n = Xu(t, this._root);
      return n && n.children.length > 0 ? n.children[0].value : null;
    }
    siblings(t) {
      let n = el(t, this._root);
      return n.length < 2
        ? []
        : n[n.length - 2].children.map((o) => o.value).filter((o) => o !== t);
    }
    pathFromRoot(t) {
      return el(t, this._root).map((n) => n.value);
    }
  };
function Xu(e, t) {
  if (e === t.value) return t;
  for (let n of t.children) {
    let r = Xu(e, n);
    if (r) return r;
  }
  return null;
}
function el(e, t) {
  if (e === t.value) return [t];
  for (let n of t.children) {
    let r = el(e, n);
    if (r.length) return r.unshift(t), r;
  }
  return [];
}
var Pe = class {
  constructor(t, n) {
    (this.value = t), (this.children = n);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function nr(e) {
  let t = {};
  return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
}
var Ms = class extends bs {
  constructor(t, n) {
    super(t), (this.snapshot = n), ul(this, t);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function jg(e) {
  let t = db(e),
    n = new le([new vn("", {})]),
    r = new le({}),
    o = new le({}),
    i = new le({}),
    s = new le(""),
    a = new wn(n, r, i, s, o, x, e, t.root);
  return (a.snapshot = t.root), new Ms(new Pe(a, []), t);
}
function db(e) {
  let t = {},
    n = {},
    r = {},
    o = "",
    i = new or([], t, r, o, n, x, e, null, {});
  return new Ts("", new Pe(i, []));
}
var wn = class {
  constructor(t, n, r, o, i, s, a, c) {
    (this.urlSubject = t),
      (this.paramsSubject = n),
      (this.queryParamsSubject = r),
      (this.fragmentSubject = o),
      (this.dataSubject = i),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = c),
      (this.title = this.dataSubject?.pipe(N((u) => u[ao])) ?? S(void 0)),
      (this.url = t),
      (this.params = n),
      (this.queryParams = r),
      (this.fragment = o),
      (this.data = i);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      (this._paramMap ??= this.params.pipe(N((t) => sr(t)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(N((t) => sr(t)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function Ss(e, t, n = "emptyOnly") {
  let r,
    { routeConfig: o } = e;
  return (
    t !== null &&
    (n === "always" ||
      o?.path === "" ||
      (!t.component && !t.routeConfig?.loadComponent))
      ? (r = {
          params: D(D({}, t.params), e.params),
          data: D(D({}, t.data), e.data),
          resolve: D(D(D(D({}, e.data), t.data), o?.data), e._resolvedData),
        })
      : (r = {
          params: D({}, e.params),
          data: D({}, e.data),
          resolve: D(D({}, e.data), e._resolvedData ?? {}),
        }),
    o && Ug(o) && (r.resolve[ao] = o.title),
    r
  );
}
var or = class {
    get title() {
      return this.data?.[ao];
    }
    constructor(t, n, r, o, i, s, a, c, u) {
      (this.url = t),
        (this.params = n),
        (this.queryParams = r),
        (this.fragment = o),
        (this.data = i),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = c),
        (this._resolve = u);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= sr(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= sr(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      let t = this.url.map((r) => r.toString()).join("/"),
        n = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${t}', path:'${n}')`;
    }
  },
  Ts = class extends bs {
    constructor(t, n) {
      super(n), (this.url = t), ul(this, n);
    }
    toString() {
      return Vg(this._root);
    }
  };
function ul(e, t) {
  (t.value._routerState = e), t.children.forEach((n) => ul(e, n));
}
function Vg(e) {
  let t = e.children.length > 0 ? ` { ${e.children.map(Vg).join(", ")} } ` : "";
  return `${e.value}${t}`;
}
function Fu(e) {
  if (e.snapshot) {
    let t = e.snapshot,
      n = e._futureSnapshot;
    (e.snapshot = n),
      ft(t.queryParams, n.queryParams) ||
        e.queryParamsSubject.next(n.queryParams),
      t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
      ft(t.params, n.params) || e.paramsSubject.next(n.params),
      jC(t.url, n.url) || e.urlSubject.next(n.url),
      ft(t.data, n.data) || e.dataSubject.next(n.data);
  } else
    (e.snapshot = e._futureSnapshot),
      e.dataSubject.next(e._futureSnapshot.data);
}
function tl(e, t) {
  let n = ft(e.params, t.params) && $C(e.url, t.url),
    r = !e.parent != !t.parent;
  return n && !r && (!e.parent || tl(e.parent, t.parent));
}
function Ug(e) {
  return typeof e.title == "string" || e.title === null;
}
var ll = (() => {
    class e {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = x),
          (this.activateEvents = new me()),
          (this.deactivateEvents = new me()),
          (this.attachEvents = new me()),
          (this.detachEvents = new me()),
          (this.parentContexts = p(lo)),
          (this.location = p(qt)),
          (this.changeDetector = p(jr)),
          (this.inputBinder = p(Rs, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(n) {
        if (n.name) {
          let { firstChange: r, previousValue: o } = n.name;
          if (r) return;
          this.isTrackedInParentContexts(o) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(n) {
        return this.parentContexts.getContext(n)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let n = this.parentContexts.getContext(this.name);
        n?.route &&
          (n.attachRef
            ? this.attach(n.attachRef, n.route)
            : this.activateWith(n.route, n.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new I(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new I(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new I(4012, !1);
        this.location.detach();
        let n = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(n.instance),
          n
        );
      }
      attach(n, r) {
        (this.activated = n),
          (this._activatedRoute = r),
          this.location.insert(n.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(n.instance);
      }
      deactivate() {
        if (this.activated) {
          let n = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(n);
        }
      }
      activateWith(n, r) {
        if (this.isActivated) throw new I(4013, !1);
        this._activatedRoute = n;
        let o = this.location,
          s = n.snapshot.component,
          a = this.parentContexts.getOrCreateContext(this.name).children,
          c = new nl(n, a, o.injector);
        (this.activated = o.createComponent(s, {
          index: o.length,
          injector: c,
          environmentInjector: r,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵdir = ct({
          type: e,
          selectors: [["router-outlet"]],
          inputs: { name: "name" },
          outputs: {
            activateEvents: "activate",
            deactivateEvents: "deactivate",
            attachEvents: "attach",
            detachEvents: "detach",
          },
          exportAs: ["outlet"],
          standalone: !0,
          features: [xr],
        });
      }
    }
    return e;
  })(),
  nl = class e {
    __ngOutletInjector(t) {
      return new e(this.route, this.childContexts, t);
    }
    constructor(t, n, r) {
      (this.route = t), (this.childContexts = n), (this.parent = r);
    }
    get(t, n) {
      return t === wn
        ? this.route
        : t === lo
        ? this.childContexts
        : this.parent.get(t, n);
    }
  },
  Rs = new w(""),
  yg = (() => {
    class e {
      constructor() {
        this.outletDataSubscriptions = new Map();
      }
      bindActivatedRouteToOutletComponent(n) {
        this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
      }
      unsubscribeFromRouteData(n) {
        this.outletDataSubscriptions.get(n)?.unsubscribe(),
          this.outletDataSubscriptions.delete(n);
      }
      subscribeToRouteData(n) {
        let { activatedRoute: r } = n,
          o = pr([r.queryParams, r.params, r.data])
            .pipe(
              Se(
                ([i, s, a], c) => (
                  (a = D(D(D({}, i), s), a)),
                  c === 0 ? S(a) : Promise.resolve(a)
                )
              )
            )
            .subscribe((i) => {
              if (
                !n.isActivated ||
                !n.activatedComponentRef ||
                n.activatedRoute !== r ||
                r.component === null
              ) {
                this.unsubscribeFromRouteData(n);
                return;
              }
              let s = ap(r.component);
              if (!s) {
                this.unsubscribeFromRouteData(n);
                return;
              }
              for (let { templateName: a } of s.inputs)
                n.activatedComponentRef.setInput(a, i[a]);
            });
        this.outletDataSubscriptions.set(n, o);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function fb(e, t, n) {
  let r = ro(e, t._root, n ? n._root : void 0);
  return new Ms(r, t);
}
function ro(e, t, n) {
  if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
    let r = n.value;
    r._futureSnapshot = t.value;
    let o = hb(e, t, n);
    return new Pe(r, o);
  } else {
    if (e.shouldAttach(t.value)) {
      let i = e.retrieve(t.value);
      if (i !== null) {
        let s = i.route;
        return (
          (s.value._futureSnapshot = t.value),
          (s.children = t.children.map((a) => ro(e, a))),
          s
        );
      }
    }
    let r = pb(t.value),
      o = t.children.map((i) => ro(e, i));
    return new Pe(r, o);
  }
}
function hb(e, t, n) {
  return t.children.map((r) => {
    for (let o of n.children)
      if (e.shouldReuseRoute(r.value, o.value.snapshot)) return ro(e, r, o);
    return ro(e, r);
  });
}
function pb(e) {
  return new wn(
    new le(e.url),
    new le(e.params),
    new le(e.queryParams),
    new le(e.fragment),
    new le(e.data),
    e.outlet,
    e.component,
    e
  );
}
var oo = class {
    constructor(t, n) {
      (this.redirectTo = t), (this.navigationBehaviorOptions = n);
    }
  },
  Bg = "ngNavigationCancelingError";
function _s(e, t) {
  let { redirectTo: n, navigationBehaviorOptions: r } = Dn(t)
      ? { redirectTo: t, navigationBehaviorOptions: void 0 }
      : t,
    o = $g(!1, Fe.Redirect);
  return (o.url = n), (o.navigationBehaviorOptions = r), o;
}
function $g(e, t) {
  let n = new Error(`NavigationCancelingError: ${e || ""}`);
  return (n[Bg] = !0), (n.cancellationCode = t), n;
}
function gb(e) {
  return Hg(e) && Dn(e.url);
}
function Hg(e) {
  return !!e && e[Bg];
}
var mb = (e, t, n, r) =>
    N(
      (o) => (
        new rl(t, o.targetRouterState, o.currentRouterState, n, r).activate(e),
        o
      )
    ),
  rl = class {
    constructor(t, n, r, o, i) {
      (this.routeReuseStrategy = t),
        (this.futureState = n),
        (this.currState = r),
        (this.forwardEvent = o),
        (this.inputBindingEnabled = i);
    }
    activate(t) {
      let n = this.futureState._root,
        r = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(n, r, t),
        Fu(this.futureState.root),
        this.activateChildRoutes(n, r, t);
    }
    deactivateChildRoutes(t, n, r) {
      let o = nr(n);
      t.children.forEach((i) => {
        let s = i.value.outlet;
        this.deactivateRoutes(i, o[s], r), delete o[s];
      }),
        Object.values(o).forEach((i) => {
          this.deactivateRouteAndItsChildren(i, r);
        });
    }
    deactivateRoutes(t, n, r) {
      let o = t.value,
        i = n ? n.value : null;
      if (o === i)
        if (o.component) {
          let s = r.getContext(o.outlet);
          s && this.deactivateChildRoutes(t, n, s.children);
        } else this.deactivateChildRoutes(t, n, r);
      else i && this.deactivateRouteAndItsChildren(n, r);
    }
    deactivateRouteAndItsChildren(t, n) {
      t.value.component &&
      this.routeReuseStrategy.shouldDetach(t.value.snapshot)
        ? this.detachAndStoreRouteSubtree(t, n)
        : this.deactivateRouteAndOutlet(t, n);
    }
    detachAndStoreRouteSubtree(t, n) {
      let r = n.getContext(t.value.outlet),
        o = r && t.value.component ? r.children : n,
        i = nr(t);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      if (r && r.outlet) {
        let s = r.outlet.detach(),
          a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(t.value.snapshot, {
          componentRef: s,
          route: t,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(t, n) {
      let r = n.getContext(t.value.outlet),
        o = r && t.value.component ? r.children : n,
        i = nr(t);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      r &&
        (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
        (r.attachRef = null),
        (r.route = null));
    }
    activateChildRoutes(t, n, r) {
      let o = nr(n);
      t.children.forEach((i) => {
        this.activateRoutes(i, o[i.value.outlet], r),
          this.forwardEvent(new Ku(i.value.snapshot));
      }),
        t.children.length && this.forwardEvent(new Yu(t.value.snapshot));
    }
    activateRoutes(t, n, r) {
      let o = t.value,
        i = n ? n.value : null;
      if ((Fu(o), o === i))
        if (o.component) {
          let s = r.getOrCreateContext(o.outlet);
          this.activateChildRoutes(t, n, s.children);
        } else this.activateChildRoutes(t, n, r);
      else if (o.component) {
        let s = r.getOrCreateContext(o.outlet);
        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(o.snapshot);
          this.routeReuseStrategy.store(o.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            Fu(a.route.value),
            this.activateChildRoutes(t, null, s.children);
        } else
          (s.attachRef = null),
            (s.route = o),
            s.outlet && s.outlet.activateWith(o, s.injector),
            this.activateChildRoutes(t, null, s.children);
      } else this.activateChildRoutes(t, null, r);
    }
  },
  xs = class {
    constructor(t) {
      (this.path = t), (this.route = this.path[this.path.length - 1]);
    }
  },
  ir = class {
    constructor(t, n) {
      (this.component = t), (this.route = n);
    }
  };
function vb(e, t, n) {
  let r = e._root,
    o = t ? t._root : null;
  return Yr(r, o, n, [r.value]);
}
function yb(e) {
  let t = e.routeConfig ? e.routeConfig.canActivateChild : null;
  return !t || t.length === 0 ? null : { node: e, guards: t };
}
function dr(e, t) {
  let n = Symbol(),
    r = t.get(e, n);
  return r === n ? (typeof e == "function" && !Bd(e) ? e : t.get(e)) : r;
}
function Yr(
  e,
  t,
  n,
  r,
  o = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let i = nr(t);
  return (
    e.children.forEach((s) => {
      Db(s, i[s.value.outlet], n, r.concat([s.value]), o),
        delete i[s.value.outlet];
    }),
    Object.entries(i).forEach(([s, a]) => Xr(a, n.getContext(s), o)),
    o
  );
}
function Db(
  e,
  t,
  n,
  r,
  o = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let i = e.value,
    s = t ? t.value : null,
    a = n ? n.getContext(e.value.outlet) : null;
  if (s && i.routeConfig === s.routeConfig) {
    let c = wb(s, i, i.routeConfig.runGuardsAndResolvers);
    c
      ? o.canActivateChecks.push(new xs(r))
      : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
      i.component ? Yr(e, t, a ? a.children : null, r, o) : Yr(e, t, n, r, o),
      c &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        o.canDeactivateChecks.push(new ir(a.outlet.component, s));
  } else
    s && Xr(t, a, o),
      o.canActivateChecks.push(new xs(r)),
      i.component
        ? Yr(e, null, a ? a.children : null, r, o)
        : Yr(e, null, n, r, o);
  return o;
}
function wb(e, t, n) {
  if (typeof n == "function") return n(e, t);
  switch (n) {
    case "pathParamsChange":
      return !yn(e.url, t.url);
    case "pathParamsOrQueryParamsChange":
      return !yn(e.url, t.url) || !ft(e.queryParams, t.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !tl(e, t) || !ft(e.queryParams, t.queryParams);
    case "paramsChange":
    default:
      return !tl(e, t);
  }
}
function Xr(e, t, n) {
  let r = nr(e),
    o = e.value;
  Object.entries(r).forEach(([i, s]) => {
    o.component
      ? t
        ? Xr(s, t.children.getContext(i), n)
        : Xr(s, null, n)
      : Xr(s, t, n);
  }),
    o.component
      ? t && t.outlet && t.outlet.isActivated
        ? n.canDeactivateChecks.push(new ir(t.outlet.component, o))
        : n.canDeactivateChecks.push(new ir(null, o))
      : n.canDeactivateChecks.push(new ir(null, o));
}
function fo(e) {
  return typeof e == "function";
}
function Eb(e) {
  return typeof e == "boolean";
}
function Ib(e) {
  return e && fo(e.canLoad);
}
function Cb(e) {
  return e && fo(e.canActivate);
}
function bb(e) {
  return e && fo(e.canActivateChild);
}
function Mb(e) {
  return e && fo(e.canDeactivate);
}
function Sb(e) {
  return e && fo(e.canMatch);
}
function zg(e) {
  return e instanceof gt || e?.name === "EmptyError";
}
var gs = Symbol("INITIAL_VALUE");
function lr() {
  return Se((e) =>
    pr(e.map((t) => t.pipe(vt(1), ua(gs)))).pipe(
      N((t) => {
        for (let n of t)
          if (n !== !0) {
            if (n === gs) return gs;
            if (n === !1 || Tb(n)) return n;
          }
        return !0;
      }),
      Me((t) => t !== gs),
      vt(1)
    )
  );
}
function Tb(e) {
  return Dn(e) || e instanceof oo;
}
function _b(e, t) {
  return re((n) => {
    let {
      targetSnapshot: r,
      currentSnapshot: o,
      guards: { canActivateChecks: i, canDeactivateChecks: s },
    } = n;
    return s.length === 0 && i.length === 0
      ? S(K(D({}, n), { guardsResult: !0 }))
      : xb(s, r, o, e).pipe(
          re((a) => (a && Eb(a) ? Nb(r, i, e, t) : S(a))),
          N((a) => K(D({}, n), { guardsResult: a }))
        );
  });
}
function xb(e, t, n, r) {
  return J(e).pipe(
    re((o) => Fb(o.component, o.route, n, t, r)),
    tt((o) => o !== !0, !0)
  );
}
function Nb(e, t, n, r) {
  return J(t).pipe(
    mt((o) =>
      Nn(
        Rb(o.route.parent, r),
        Ab(o.route, r),
        Pb(e, o.path, n),
        Ob(e, o.route, n)
      )
    ),
    tt((o) => o !== !0, !0)
  );
}
function Ab(e, t) {
  return e !== null && t && t(new Qu(e)), S(!0);
}
function Rb(e, t) {
  return e !== null && t && t(new Zu(e)), S(!0);
}
function Ob(e, t, n) {
  let r = t.routeConfig ? t.routeConfig.canActivate : null;
  if (!r || r.length === 0) return S(!0);
  let o = r.map((i) =>
    Po(() => {
      let s = uo(t) ?? n,
        a = dr(i, s),
        c = Cb(a) ? a.canActivate(t, e) : Ue(s, () => a(t, e));
      return en(c).pipe(tt());
    })
  );
  return S(o).pipe(lr());
}
function Pb(e, t, n) {
  let r = t[t.length - 1],
    i = t
      .slice(0, t.length - 1)
      .reverse()
      .map((s) => yb(s))
      .filter((s) => s !== null)
      .map((s) =>
        Po(() => {
          let a = s.guards.map((c) => {
            let u = uo(s.node) ?? n,
              l = dr(c, u),
              d = bb(l) ? l.canActivateChild(r, e) : Ue(u, () => l(r, e));
            return en(d).pipe(tt());
          });
          return S(a).pipe(lr());
        })
      );
  return S(i).pipe(lr());
}
function Fb(e, t, n, r, o) {
  let i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
  if (!i || i.length === 0) return S(!0);
  let s = i.map((a) => {
    let c = uo(t) ?? o,
      u = dr(a, c),
      l = Mb(u) ? u.canDeactivate(e, t, n, r) : Ue(c, () => u(e, t, n, r));
    return en(l).pipe(tt());
  });
  return S(s).pipe(lr());
}
function kb(e, t, n, r) {
  let o = t.canLoad;
  if (o === void 0 || o.length === 0) return S(!0);
  let i = o.map((s) => {
    let a = dr(s, e),
      c = Ib(a) ? a.canLoad(t, n) : Ue(e, () => a(t, n));
    return en(c);
  });
  return S(i).pipe(lr(), Gg(r));
}
function Gg(e) {
  return ta(
    ae((t) => {
      if (typeof t != "boolean") throw _s(e, t);
    }),
    N((t) => t === !0)
  );
}
function Lb(e, t, n, r) {
  let o = t.canMatch;
  if (!o || o.length === 0) return S(!0);
  let i = o.map((s) => {
    let a = dr(s, e),
      c = Sb(a) ? a.canMatch(t, n) : Ue(e, () => a(t, n));
    return en(c);
  });
  return S(i).pipe(lr(), Gg(r));
}
var io = class {
    constructor(t) {
      this.segmentGroup = t || null;
    }
  },
  so = class extends Error {
    constructor(t) {
      super(), (this.urlTree = t);
    }
  };
function tr(e) {
  return _n(new io(e));
}
function jb(e) {
  return _n(new I(4e3, !1));
}
function Vb(e) {
  return _n($g(!1, Fe.GuardRejected));
}
var ol = class {
    constructor(t, n) {
      (this.urlSerializer = t), (this.urlTree = n);
    }
    lineralizeSegments(t, n) {
      let r = [],
        o = n.root;
      for (;;) {
        if (((r = r.concat(o.segments)), o.numberOfChildren === 0)) return S(r);
        if (o.numberOfChildren > 1 || !o.children[x])
          return jb(`${t.redirectTo}`);
        o = o.children[x];
      }
    }
    applyRedirectCommands(t, n, r, o, i) {
      if (typeof n != "string") {
        let a = n,
          {
            queryParams: c,
            fragment: u,
            routeConfig: l,
            url: d,
            outlet: h,
            params: f,
            data: g,
            title: y,
          } = o,
          E = Ue(i, () =>
            a({
              params: f,
              data: g,
              queryParams: c,
              fragment: u,
              routeConfig: l,
              url: d,
              outlet: h,
              title: y,
            })
          );
        if (E instanceof Rt) throw new so(E);
        n = E;
      }
      let s = this.applyRedirectCreateUrlTree(
        n,
        this.urlSerializer.parse(n),
        t,
        r
      );
      if (n[0] === "/") throw new so(s);
      return s;
    }
    applyRedirectCreateUrlTree(t, n, r, o) {
      let i = this.createSegmentGroup(t, n.root, r, o);
      return new Rt(
        i,
        this.createQueryParams(n.queryParams, this.urlTree.queryParams),
        n.fragment
      );
    }
    createQueryParams(t, n) {
      let r = {};
      return (
        Object.entries(t).forEach(([o, i]) => {
          if (typeof i == "string" && i[0] === ":") {
            let a = i.substring(1);
            r[o] = n[a];
          } else r[o] = i;
        }),
        r
      );
    }
    createSegmentGroup(t, n, r, o) {
      let i = this.createSegments(t, n.segments, r, o),
        s = {};
      return (
        Object.entries(n.children).forEach(([a, c]) => {
          s[a] = this.createSegmentGroup(t, c, r, o);
        }),
        new z(i, s)
      );
    }
    createSegments(t, n, r, o) {
      return n.map((i) =>
        i.path[0] === ":" ? this.findPosParam(t, i, o) : this.findOrReturn(i, r)
      );
    }
    findPosParam(t, n, r) {
      let o = r[n.path.substring(1)];
      if (!o) throw new I(4001, !1);
      return o;
    }
    findOrReturn(t, n) {
      let r = 0;
      for (let o of n) {
        if (o.path === t.path) return n.splice(r), o;
        r++;
      }
      return t;
    }
  },
  il = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function Ub(e, t, n, r, o) {
  let i = qg(e, t, n);
  return i.matched
    ? ((r = ub(t, r)),
      Lb(r, t, n, o).pipe(N((s) => (s === !0 ? i : D({}, il)))))
    : S(i);
}
function qg(e, t, n) {
  if (t.path === "**") return Bb(n);
  if (t.path === "")
    return t.pathMatch === "full" && (e.hasChildren() || n.length > 0)
      ? D({}, il)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: n,
          parameters: {},
          positionalParamSegments: {},
        };
  let o = (t.matcher || LC)(n, e, t);
  if (!o) return D({}, il);
  let i = {};
  Object.entries(o.posParams ?? {}).forEach(([a, c]) => {
    i[a] = c.path;
  });
  let s =
    o.consumed.length > 0
      ? D(D({}, i), o.consumed[o.consumed.length - 1].parameters)
      : i;
  return {
    matched: !0,
    consumedSegments: o.consumed,
    remainingSegments: n.slice(o.consumed.length),
    parameters: s,
    positionalParamSegments: o.posParams ?? {},
  };
}
function Bb(e) {
  return {
    matched: !0,
    parameters: e.length > 0 ? Mg(e).parameters : {},
    consumedSegments: e,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function Dg(e, t, n, r) {
  return n.length > 0 && zb(e, n, r)
    ? {
        segmentGroup: new z(t, Hb(r, new z(n, e.children))),
        slicedSegments: [],
      }
    : n.length === 0 && Gb(e, n, r)
    ? {
        segmentGroup: new z(e.segments, $b(e, n, r, e.children)),
        slicedSegments: n,
      }
    : { segmentGroup: new z(e.segments, e.children), slicedSegments: n };
}
function $b(e, t, n, r) {
  let o = {};
  for (let i of n)
    if (Os(e, t, i) && !r[et(i)]) {
      let s = new z([], {});
      o[et(i)] = s;
    }
  return D(D({}, r), o);
}
function Hb(e, t) {
  let n = {};
  n[x] = t;
  for (let r of e)
    if (r.path === "" && et(r) !== x) {
      let o = new z([], {});
      n[et(r)] = o;
    }
  return n;
}
function zb(e, t, n) {
  return n.some((r) => Os(e, t, r) && et(r) !== x);
}
function Gb(e, t, n) {
  return n.some((r) => Os(e, t, r));
}
function Os(e, t, n) {
  return (e.hasChildren() || t.length > 0) && n.pathMatch === "full"
    ? !1
    : n.path === "";
}
function qb(e, t, n) {
  return t.length === 0 && !e.children[n];
}
var sl = class {};
function Wb(e, t, n, r, o, i, s = "emptyOnly") {
  return new al(e, t, n, r, o, s, i).recognize();
}
var Zb = 31,
  al = class {
    constructor(t, n, r, o, i, s, a) {
      (this.injector = t),
        (this.configLoader = n),
        (this.rootComponentType = r),
        (this.config = o),
        (this.urlTree = i),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new ol(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(t) {
      return new I(4002, `'${t.segmentGroup}'`);
    }
    recognize() {
      let t = Dg(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(t).pipe(
        N(({ children: n, rootSnapshot: r }) => {
          let o = new Pe(r, n),
            i = new Ts("", o),
            s = nb(r, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (i.url = this.urlSerializer.serialize(s)),
            { state: i, tree: s }
          );
        })
      );
    }
    match(t) {
      let n = new or(
        [],
        Object.freeze({}),
        Object.freeze(D({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        x,
        this.rootComponentType,
        null,
        {}
      );
      return this.processSegmentGroup(this.injector, this.config, t, x, n).pipe(
        N((r) => ({ children: r, rootSnapshot: n })),
        Pt((r) => {
          if (r instanceof so)
            return (this.urlTree = r.urlTree), this.match(r.urlTree.root);
          throw r instanceof io ? this.noMatchError(r) : r;
        })
      );
    }
    processSegmentGroup(t, n, r, o, i) {
      return r.segments.length === 0 && r.hasChildren()
        ? this.processChildren(t, n, r, i)
        : this.processSegment(t, n, r, r.segments, o, !0, i).pipe(
            N((s) => (s instanceof Pe ? [s] : []))
          );
    }
    processChildren(t, n, r, o) {
      let i = [];
      for (let s of Object.keys(r.children))
        s === "primary" ? i.unshift(s) : i.push(s);
      return J(i).pipe(
        mt((s) => {
          let a = r.children[s],
            c = lb(n, s);
          return this.processSegmentGroup(t, c, a, s, o);
        }),
        ca((s, a) => (s.push(...a), s)),
        Ft(null),
        aa(),
        re((s) => {
          if (s === null) return tr(r);
          let a = Wg(s);
          return Yb(a), S(a);
        })
      );
    }
    processSegment(t, n, r, o, i, s, a) {
      return J(n).pipe(
        mt((c) =>
          this.processSegmentAgainstRoute(
            c._injector ?? t,
            n,
            c,
            r,
            o,
            i,
            s,
            a
          ).pipe(
            Pt((u) => {
              if (u instanceof io) return S(null);
              throw u;
            })
          )
        ),
        tt((c) => !!c),
        Pt((c) => {
          if (zg(c)) return qb(r, o, i) ? S(new sl()) : tr(r);
          throw c;
        })
      );
    }
    processSegmentAgainstRoute(t, n, r, o, i, s, a, c) {
      return et(r) !== s && (s === x || !Os(o, i, r))
        ? tr(o)
        : r.redirectTo === void 0
        ? this.matchSegmentAgainstRoute(t, o, r, i, s, c)
        : this.allowRedirects && a
        ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s, c)
        : tr(o);
    }
    expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s, a) {
      let {
        matched: c,
        parameters: u,
        consumedSegments: l,
        positionalParamSegments: d,
        remainingSegments: h,
      } = qg(n, o, i);
      if (!c) return tr(n);
      typeof o.redirectTo == "string" &&
        o.redirectTo[0] === "/" &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > Zb && (this.allowRedirects = !1));
      let f = new or(
          i,
          u,
          Object.freeze(D({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          wg(o),
          et(o),
          o.component ?? o._loadedComponent ?? null,
          o,
          Eg(o)
        ),
        g = Ss(f, a, this.paramsInheritanceStrategy);
      (f.params = Object.freeze(g.params)), (f.data = Object.freeze(g.data));
      let y = this.applyRedirects.applyRedirectCommands(
        l,
        o.redirectTo,
        d,
        f,
        t
      );
      return this.applyRedirects
        .lineralizeSegments(o, y)
        .pipe(re((E) => this.processSegment(t, r, n, E.concat(h), s, !1, a)));
    }
    matchSegmentAgainstRoute(t, n, r, o, i, s) {
      let a = Ub(n, r, o, t, this.urlSerializer);
      return (
        r.path === "**" && (n.children = {}),
        a.pipe(
          Se((c) =>
            c.matched
              ? ((t = r._injector ?? t),
                this.getChildConfig(t, r, o).pipe(
                  Se(({ routes: u }) => {
                    let l = r._loadedInjector ?? t,
                      {
                        parameters: d,
                        consumedSegments: h,
                        remainingSegments: f,
                      } = c,
                      g = new or(
                        h,
                        d,
                        Object.freeze(D({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        wg(r),
                        et(r),
                        r.component ?? r._loadedComponent ?? null,
                        r,
                        Eg(r)
                      ),
                      y = Ss(g, s, this.paramsInheritanceStrategy);
                    (g.params = Object.freeze(y.params)),
                      (g.data = Object.freeze(y.data));
                    let { segmentGroup: E, slicedSegments: R } = Dg(n, h, f, u);
                    if (R.length === 0 && E.hasChildren())
                      return this.processChildren(l, u, E, g).pipe(
                        N((k) => new Pe(g, k))
                      );
                    if (u.length === 0 && R.length === 0)
                      return S(new Pe(g, []));
                    let G = et(r) === i;
                    return this.processSegment(
                      l,
                      u,
                      E,
                      R,
                      G ? x : i,
                      !0,
                      g
                    ).pipe(N((k) => new Pe(g, k instanceof Pe ? [k] : [])));
                  })
                ))
              : tr(n)
          )
        )
      );
    }
    getChildConfig(t, n, r) {
      return n.children
        ? S({ routes: n.children, injector: t })
        : n.loadChildren
        ? n._loadedRoutes !== void 0
          ? S({ routes: n._loadedRoutes, injector: n._loadedInjector })
          : kb(t, n, r, this.urlSerializer).pipe(
              re((o) =>
                o
                  ? this.configLoader.loadChildren(t, n).pipe(
                      ae((i) => {
                        (n._loadedRoutes = i.routes),
                          (n._loadedInjector = i.injector);
                      })
                    )
                  : Vb(n)
              )
            )
        : S({ routes: [], injector: t });
    }
  };
function Yb(e) {
  e.sort((t, n) =>
    t.value.outlet === x
      ? -1
      : n.value.outlet === x
      ? 1
      : t.value.outlet.localeCompare(n.value.outlet)
  );
}
function Qb(e) {
  let t = e.value.routeConfig;
  return t && t.path === "";
}
function Wg(e) {
  let t = [],
    n = new Set();
  for (let r of e) {
    if (!Qb(r)) {
      t.push(r);
      continue;
    }
    let o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
    o !== void 0 ? (o.children.push(...r.children), n.add(o)) : t.push(r);
  }
  for (let r of n) {
    let o = Wg(r.children);
    t.push(new Pe(r.value, o));
  }
  return t.filter((r) => !n.has(r));
}
function wg(e) {
  return e.data || {};
}
function Eg(e) {
  return e.resolve || {};
}
function Kb(e, t, n, r, o, i) {
  return re((s) =>
    Wb(e, t, n, r, s.extractedUrl, o, i).pipe(
      N(({ state: a, tree: c }) =>
        K(D({}, s), { targetSnapshot: a, urlAfterRedirects: c })
      )
    )
  );
}
function Jb(e, t) {
  return re((n) => {
    let {
      targetSnapshot: r,
      guards: { canActivateChecks: o },
    } = n;
    if (!o.length) return S(n);
    let i = new Set(o.map((c) => c.route)),
      s = new Set();
    for (let c of i) if (!s.has(c)) for (let u of Zg(c)) s.add(u);
    let a = 0;
    return J(s).pipe(
      mt((c) =>
        i.has(c)
          ? Xb(c, r, e, t)
          : ((c.data = Ss(c, c.parent, e).resolve), S(void 0))
      ),
      ae(() => a++),
      An(1),
      re((c) => (a === s.size ? S(n) : Ne))
    );
  });
}
function Zg(e) {
  let t = e.children.map((n) => Zg(n)).flat();
  return [e, ...t];
}
function Xb(e, t, n, r) {
  let o = e.routeConfig,
    i = e._resolve;
  return (
    o?.title !== void 0 && !Ug(o) && (i[ao] = o.title),
    e0(i, e, t, r).pipe(
      N(
        (s) => (
          (e._resolvedData = s), (e.data = Ss(e, e.parent, n).resolve), null
        )
      )
    )
  );
}
function e0(e, t, n, r) {
  let o = ju(e);
  if (o.length === 0) return S({});
  let i = {};
  return J(o).pipe(
    re((s) =>
      t0(e[s], t, n, r).pipe(
        tt(),
        ae((a) => {
          if (a instanceof oo) throw _s(new ar(), a);
          i[s] = a;
        })
      )
    ),
    An(1),
    sa(i),
    Pt((s) => (zg(s) ? Ne : _n(s)))
  );
}
function t0(e, t, n, r) {
  let o = uo(t) ?? r,
    i = dr(e, o),
    s = i.resolve ? i.resolve(t, n) : Ue(o, () => i(t, n));
  return en(s);
}
function ku(e) {
  return Se((t) => {
    let n = e(t);
    return n ? J(n).pipe(N(() => t)) : S(t);
  });
}
var Yg = (() => {
    class e {
      buildTitle(n) {
        let r,
          o = n.root;
        for (; o !== void 0; )
          (r = this.getResolvedTitleForRoute(o) ?? r),
            (o = o.children.find((i) => i.outlet === x));
        return r;
      }
      getResolvedTitleForRoute(n) {
        return n.data[ao];
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: () => p(n0), providedIn: "root" });
      }
    }
    return e;
  })(),
  n0 = (() => {
    class e extends Yg {
      constructor(n) {
        super(), (this.title = n);
      }
      updateTitle(n) {
        let r = this.buildTitle(n);
        r !== void 0 && this.title.setTitle(r);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(fg));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  ho = new w("", { providedIn: "root", factory: () => ({}) }),
  r0 = (() => {
    class e {
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵcmp = zt({
          type: e,
          selectors: [["ng-component"]],
          standalone: !0,
          features: [Yh],
          decls: 1,
          vars: 0,
          template: function (r, o) {
            r & 1 && Ke(0, "router-outlet");
          },
          dependencies: [ll],
          encapsulation: 2,
        });
      }
    }
    return e;
  })();
function dl(e) {
  let t = e.children && e.children.map(dl),
    n = t ? K(D({}, e), { children: t }) : D({}, e);
  return (
    !n.component &&
      !n.loadComponent &&
      (t || n.loadChildren) &&
      n.outlet &&
      n.outlet !== x &&
      (n.component = r0),
    n
  );
}
var Ns = new w(""),
  fl = (() => {
    class e {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = p(Gi));
      }
      loadComponent(n) {
        if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
        if (n._loadedComponent) return S(n._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(n);
        let r = en(n.loadComponent()).pipe(
            N(Qg),
            ae((i) => {
              this.onLoadEndListener && this.onLoadEndListener(n),
                (n._loadedComponent = i);
            }),
            kt(() => {
              this.componentLoaders.delete(n);
            })
          ),
          o = new Tn(r, () => new he()).pipe(Sn());
        return this.componentLoaders.set(n, o), o;
      }
      loadChildren(n, r) {
        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
        if (r._loadedRoutes)
          return S({ routes: r._loadedRoutes, injector: r._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(r);
        let i = o0(r, this.compiler, n, this.onLoadEndListener).pipe(
            kt(() => {
              this.childrenLoaders.delete(r);
            })
          ),
          s = new Tn(i, () => new he()).pipe(Sn());
        return this.childrenLoaders.set(r, s), s;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
function o0(e, t, n, r) {
  return en(e.loadChildren()).pipe(
    N(Qg),
    re((o) =>
      o instanceof br || Array.isArray(o) ? S(o) : J(t.compileModuleAsync(o))
    ),
    N((o) => {
      r && r(e);
      let i,
        s,
        a = !1;
      return (
        Array.isArray(o)
          ? ((s = o), (a = !0))
          : ((i = o.create(n).injector),
            (s = i.get(Ns, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(dl), injector: i }
      );
    })
  );
}
function i0(e) {
  return e && typeof e == "object" && "default" in e;
}
function Qg(e) {
  return i0(e) ? e.default : e;
}
var hl = (() => {
    class e {
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: () => p(s0), providedIn: "root" });
      }
    }
    return e;
  })(),
  s0 = (() => {
    class e {
      shouldProcessUrl(n) {
        return !0;
      }
      extract(n) {
        return n;
      }
      merge(n, r) {
        return n;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  Kg = new w(""),
  Jg = new w("");
function a0(e, t, n) {
  let r = e.get(Jg),
    o = e.get(pe);
  return e.get(q).runOutsideAngular(() => {
    if (!o.startViewTransition || r.skipNextTransition)
      return (r.skipNextTransition = !1), new Promise((u) => setTimeout(u));
    let i,
      s = new Promise((u) => {
        i = u;
      }),
      a = o.startViewTransition(() => (i(), c0(e))),
      { onViewTransitionCreated: c } = r;
    return c && Ue(e, () => c({ transition: a, from: t, to: n })), s;
  });
}
function c0(e) {
  return new Promise((t) => {
    qc({ read: () => setTimeout(t) }, { injector: e });
  });
}
var u0 = new w(""),
  pl = (() => {
    class e {
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      constructor() {
        (this.currentNavigation = null),
          (this.currentTransition = null),
          (this.lastSuccessfulNavigation = null),
          (this.events = new he()),
          (this.transitionAbortSubject = new he()),
          (this.configLoader = p(fl)),
          (this.environmentInjector = p(ye)),
          (this.urlSerializer = p(co)),
          (this.rootContexts = p(lo)),
          (this.location = p(Xn)),
          (this.inputBindingEnabled = p(Rs, { optional: !0 }) !== null),
          (this.titleStrategy = p(Yg)),
          (this.options = p(ho, { optional: !0 }) || {}),
          (this.paramsInheritanceStrategy =
            this.options.paramsInheritanceStrategy || "emptyOnly"),
          (this.urlHandlingStrategy = p(hl)),
          (this.createViewTransition = p(Kg, { optional: !0 })),
          (this.navigationErrorHandler = p(u0, { optional: !0 })),
          (this.navigationId = 0),
          (this.afterPreactivation = () => S(void 0)),
          (this.rootComponentType = null);
        let n = (o) => this.events.next(new qu(o)),
          r = (o) => this.events.next(new Wu(o));
        (this.configLoader.onLoadEndListener = r),
          (this.configLoader.onLoadStartListener = n);
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(n) {
        let r = ++this.navigationId;
        this.transitions?.next(
          K(D(D({}, this.transitions.value), n), { id: r })
        );
      }
      setupNavigations(n, r, o) {
        return (
          (this.transitions = new le({
            id: 0,
            currentUrlTree: r,
            currentRawUrl: r,
            extractedUrl: this.urlHandlingStrategy.extract(r),
            urlAfterRedirects: this.urlHandlingStrategy.extract(r),
            rawUrl: r,
            extras: {},
            resolve: () => {},
            reject: () => {},
            promise: Promise.resolve(!0),
            source: Jr,
            restoredState: null,
            currentSnapshot: o.snapshot,
            targetSnapshot: null,
            currentRouterState: o,
            targetRouterState: null,
            guards: { canActivateChecks: [], canDeactivateChecks: [] },
            guardsResult: null,
          })),
          this.transitions.pipe(
            Me((i) => i.id !== 0),
            N((i) =>
              K(D({}, i), {
                extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl),
              })
            ),
            Se((i) => {
              let s = !1,
                a = !1;
              return S(i).pipe(
                Se((c) => {
                  if (this.navigationId > i.id)
                    return (
                      this.cancelNavigationTransition(
                        i,
                        "",
                        Fe.SupersededByNewNavigation
                      ),
                      Ne
                    );
                  (this.currentTransition = i),
                    (this.currentNavigation = {
                      id: c.id,
                      initialUrl: c.rawUrl,
                      extractedUrl: c.extractedUrl,
                      targetBrowserUrl:
                        typeof c.extras.browserUrl == "string"
                          ? this.urlSerializer.parse(c.extras.browserUrl)
                          : c.extras.browserUrl,
                      trigger: c.source,
                      extras: c.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? K(D({}, this.lastSuccessfulNavigation), {
                            previousNavigation: null,
                          })
                        : null,
                    });
                  let u =
                      !n.navigated ||
                      this.isUpdatingInternalState() ||
                      this.isUpdatedBrowserUrl(),
                    l = c.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                  if (!u && l !== "reload") {
                    let d = "";
                    return (
                      this.events.next(
                        new Jt(
                          c.id,
                          this.urlSerializer.serialize(c.rawUrl),
                          d,
                          Es.IgnoredSameUrlNavigation
                        )
                      ),
                      c.resolve(!1),
                      Ne
                    );
                  }
                  if (this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                    return S(c).pipe(
                      Se((d) => {
                        let h = this.transitions?.getValue();
                        return (
                          this.events.next(
                            new cr(
                              d.id,
                              this.urlSerializer.serialize(d.extractedUrl),
                              d.source,
                              d.restoredState
                            )
                          ),
                          h !== this.transitions?.getValue()
                            ? Ne
                            : Promise.resolve(d)
                        );
                      }),
                      Kb(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        n.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy
                      ),
                      ae((d) => {
                        (i.targetSnapshot = d.targetSnapshot),
                          (i.urlAfterRedirects = d.urlAfterRedirects),
                          (this.currentNavigation = K(
                            D({}, this.currentNavigation),
                            { finalUrl: d.urlAfterRedirects }
                          ));
                        let h = new Is(
                          d.id,
                          this.urlSerializer.serialize(d.extractedUrl),
                          this.urlSerializer.serialize(d.urlAfterRedirects),
                          d.targetSnapshot
                        );
                        this.events.next(h);
                      })
                    );
                  if (
                    u &&
                    this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)
                  ) {
                    let {
                        id: d,
                        extractedUrl: h,
                        source: f,
                        restoredState: g,
                        extras: y,
                      } = c,
                      E = new cr(d, this.urlSerializer.serialize(h), f, g);
                    this.events.next(E);
                    let R = jg(this.rootComponentType).snapshot;
                    return (
                      (this.currentTransition = i =
                        K(D({}, c), {
                          targetSnapshot: R,
                          urlAfterRedirects: h,
                          extras: K(D({}, y), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })),
                      (this.currentNavigation.finalUrl = h),
                      S(i)
                    );
                  } else {
                    let d = "";
                    return (
                      this.events.next(
                        new Jt(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          d,
                          Es.IgnoredByUrlHandlingStrategy
                        )
                      ),
                      c.resolve(!1),
                      Ne
                    );
                  }
                }),
                ae((c) => {
                  let u = new $u(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot
                  );
                  this.events.next(u);
                }),
                N(
                  (c) => (
                    (this.currentTransition = i =
                      K(D({}, c), {
                        guards: vb(
                          c.targetSnapshot,
                          c.currentSnapshot,
                          this.rootContexts
                        ),
                      })),
                    i
                  )
                ),
                _b(this.environmentInjector, (c) => this.events.next(c)),
                ae((c) => {
                  if (
                    ((i.guardsResult = c.guardsResult),
                    c.guardsResult && typeof c.guardsResult != "boolean")
                  )
                    throw _s(this.urlSerializer, c.guardsResult);
                  let u = new Hu(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot,
                    !!c.guardsResult
                  );
                  this.events.next(u);
                }),
                Me((c) =>
                  c.guardsResult
                    ? !0
                    : (this.cancelNavigationTransition(c, "", Fe.GuardRejected),
                      !1)
                ),
                ku((c) => {
                  if (c.guards.canActivateChecks.length)
                    return S(c).pipe(
                      ae((u) => {
                        let l = new zu(
                          u.id,
                          this.urlSerializer.serialize(u.extractedUrl),
                          this.urlSerializer.serialize(u.urlAfterRedirects),
                          u.targetSnapshot
                        );
                        this.events.next(l);
                      }),
                      Se((u) => {
                        let l = !1;
                        return S(u).pipe(
                          Jb(
                            this.paramsInheritanceStrategy,
                            this.environmentInjector
                          ),
                          ae({
                            next: () => (l = !0),
                            complete: () => {
                              l ||
                                this.cancelNavigationTransition(
                                  u,
                                  "",
                                  Fe.NoDataFromResolver
                                );
                            },
                          })
                        );
                      }),
                      ae((u) => {
                        let l = new Gu(
                          u.id,
                          this.urlSerializer.serialize(u.extractedUrl),
                          this.urlSerializer.serialize(u.urlAfterRedirects),
                          u.targetSnapshot
                        );
                        this.events.next(l);
                      })
                    );
                }),
                ku((c) => {
                  let u = (l) => {
                    let d = [];
                    l.routeConfig?.loadComponent &&
                      !l.routeConfig._loadedComponent &&
                      d.push(
                        this.configLoader.loadComponent(l.routeConfig).pipe(
                          ae((h) => {
                            l.component = h;
                          }),
                          N(() => {})
                        )
                      );
                    for (let h of l.children) d.push(...u(h));
                    return d;
                  };
                  return pr(u(c.targetSnapshot.root)).pipe(Ft(null), vt(1));
                }),
                ku(() => this.afterPreactivation()),
                Se(() => {
                  let { currentSnapshot: c, targetSnapshot: u } = i,
                    l = this.createViewTransition?.(
                      this.environmentInjector,
                      c.root,
                      u.root
                    );
                  return l ? J(l).pipe(N(() => i)) : S(i);
                }),
                N((c) => {
                  let u = fb(
                    n.routeReuseStrategy,
                    c.targetSnapshot,
                    c.currentRouterState
                  );
                  return (
                    (this.currentTransition = i =
                      K(D({}, c), { targetRouterState: u })),
                    (this.currentNavigation.targetRouterState = u),
                    i
                  );
                }),
                ae(() => {
                  this.events.next(new no());
                }),
                mb(
                  this.rootContexts,
                  n.routeReuseStrategy,
                  (c) => this.events.next(c),
                  this.inputBindingEnabled
                ),
                vt(1),
                ae({
                  next: (c) => {
                    (s = !0),
                      (this.lastSuccessfulNavigation = this.currentNavigation),
                      this.events.next(
                        new ht(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects)
                        )
                      ),
                      this.titleStrategy?.updateTitle(
                        c.targetRouterState.snapshot
                      ),
                      c.resolve(!0);
                  },
                  complete: () => {
                    s = !0;
                  },
                }),
                la(
                  this.transitionAbortSubject.pipe(
                    ae((c) => {
                      throw c;
                    })
                  )
                ),
                kt(() => {
                  !s &&
                    !a &&
                    this.cancelNavigationTransition(
                      i,
                      "",
                      Fe.SupersededByNewNavigation
                    ),
                    this.currentTransition?.id === i.id &&
                      ((this.currentNavigation = null),
                      (this.currentTransition = null));
                }),
                Pt((c) => {
                  if (((a = !0), Hg(c)))
                    this.events.next(
                      new At(
                        i.id,
                        this.urlSerializer.serialize(i.extractedUrl),
                        c.message,
                        c.cancellationCode
                      )
                    ),
                      gb(c)
                        ? this.events.next(
                            new ur(c.url, c.navigationBehaviorOptions)
                          )
                        : i.resolve(!1);
                  else {
                    let u = new to(
                      i.id,
                      this.urlSerializer.serialize(i.extractedUrl),
                      c,
                      i.targetSnapshot ?? void 0
                    );
                    try {
                      let l = Ue(this.environmentInjector, () =>
                        this.navigationErrorHandler?.(u)
                      );
                      if (l instanceof oo) {
                        let { message: d, cancellationCode: h } = _s(
                          this.urlSerializer,
                          l
                        );
                        this.events.next(
                          new At(
                            i.id,
                            this.urlSerializer.serialize(i.extractedUrl),
                            d,
                            h
                          )
                        ),
                          this.events.next(
                            new ur(l.redirectTo, l.navigationBehaviorOptions)
                          );
                      } else {
                        this.events.next(u);
                        let d = n.errorHandler(c);
                        i.resolve(!!d);
                      }
                    } catch (l) {
                      this.options.resolveNavigationPromiseOnError
                        ? i.resolve(!1)
                        : i.reject(l);
                    }
                  }
                  return Ne;
                })
              );
            })
          )
        );
      }
      cancelNavigationTransition(n, r, o) {
        let i = new At(
          n.id,
          this.urlSerializer.serialize(n.extractedUrl),
          r,
          o
        );
        this.events.next(i), n.resolve(!1);
      }
      isUpdatingInternalState() {
        return (
          this.currentTransition?.extractedUrl.toString() !==
          this.currentTransition?.currentUrlTree.toString()
        );
      }
      isUpdatedBrowserUrl() {
        let n = this.urlHandlingStrategy.extract(
            this.urlSerializer.parse(this.location.path(!0))
          ),
          r =
            this.currentNavigation?.targetBrowserUrl ??
            this.currentNavigation?.extractedUrl;
        return (
          n.toString() !== r?.toString() &&
          !this.currentNavigation?.extras.skipLocationChange
        );
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
function l0(e) {
  return e !== Jr;
}
var d0 = (() => {
    class e {
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: () => p(f0), providedIn: "root" });
      }
    }
    return e;
  })(),
  cl = class {
    shouldDetach(t) {
      return !1;
    }
    store(t, n) {}
    shouldAttach(t) {
      return !1;
    }
    retrieve(t) {
      return null;
    }
    shouldReuseRoute(t, n) {
      return t.routeConfig === n.routeConfig;
    }
  },
  f0 = (() => {
    class e extends cl {
      static {
        this.ɵfac = (() => {
          let n;
          return function (o) {
            return (n || (n = Mc(e)))(o || e);
          };
        })();
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  Xg = (() => {
    class e {
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: () => p(h0), providedIn: "root" });
      }
    }
    return e;
  })(),
  h0 = (() => {
    class e extends Xg {
      constructor() {
        super(...arguments),
          (this.location = p(Xn)),
          (this.urlSerializer = p(co)),
          (this.options = p(ho, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || "replace"),
          (this.urlHandlingStrategy = p(hl)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.currentUrlTree = new Rt()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = jg(null)),
          (this.stateMemento = this.createStateMemento());
      }
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== "computed"
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      getRouterState() {
        return this.routerState;
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(n) {
        return this.location.subscribe((r) => {
          r.type === "popstate" && n(r.url, r.state);
        });
      }
      handleRouterEvent(n, r) {
        if (n instanceof cr) this.stateMemento = this.createStateMemento();
        else if (n instanceof Jt) this.rawUrlTree = r.initialUrl;
        else if (n instanceof Is) {
          if (
            this.urlUpdateStrategy === "eager" &&
            !r.extras.skipLocationChange
          ) {
            let o = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl);
            this.setBrowserUrl(r.targetBrowserUrl ?? o, r);
          }
        } else
          n instanceof no
            ? ((this.currentUrlTree = r.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                r.finalUrl,
                r.initialUrl
              )),
              (this.routerState = r.targetRouterState),
              this.urlUpdateStrategy === "deferred" &&
                !r.extras.skipLocationChange &&
                this.setBrowserUrl(r.targetBrowserUrl ?? this.rawUrlTree, r))
            : n instanceof At &&
              (n.code === Fe.GuardRejected || n.code === Fe.NoDataFromResolver)
            ? this.restoreHistory(r)
            : n instanceof to
            ? this.restoreHistory(r, !0)
            : n instanceof ht &&
              ((this.lastSuccessfulId = n.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(n, r) {
        let o = n instanceof Rt ? this.urlSerializer.serialize(n) : n;
        if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
          let i = this.browserPageId,
            s = D(D({}, r.extras.state), this.generateNgRouterState(r.id, i));
          this.location.replaceState(o, "", s);
        } else {
          let i = D(
            D({}, r.extras.state),
            this.generateNgRouterState(r.id, this.browserPageId + 1)
          );
          this.location.go(o, "", i);
        }
      }
      restoreHistory(n, r = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let o = this.browserPageId,
            i = this.currentPageId - o;
          i !== 0
            ? this.location.historyGo(i)
            : this.currentUrlTree === n.finalUrl &&
              i === 0 &&
              (this.resetState(n), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
      }
      resetState(n) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            n.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(n, r) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: n, ɵrouterPageId: r }
          : { navigationId: n };
      }
      static {
        this.ɵfac = (() => {
          let n;
          return function (o) {
            return (n || (n = Mc(e)))(o || e);
          };
        })();
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  Qr = (function (e) {
    return (
      (e[(e.COMPLETE = 0)] = "COMPLETE"),
      (e[(e.FAILED = 1)] = "FAILED"),
      (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
      e
    );
  })(Qr || {});
function em(e, t) {
  e.events
    .pipe(
      Me(
        (n) =>
          n instanceof ht ||
          n instanceof At ||
          n instanceof to ||
          n instanceof Jt
      ),
      N((n) =>
        n instanceof ht || n instanceof Jt
          ? Qr.COMPLETE
          : (
              n instanceof At
                ? n.code === Fe.Redirect ||
                  n.code === Fe.SupersededByNewNavigation
                : !1
            )
          ? Qr.REDIRECTING
          : Qr.FAILED
      ),
      Me((n) => n !== Qr.REDIRECTING),
      vt(1)
    )
    .subscribe(() => {
      t();
    });
}
function p0(e) {
  throw e;
}
var g0 = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  m0 = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  Xt = (() => {
    class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      constructor() {
        (this.disposed = !1),
          (this.console = p(Ui)),
          (this.stateManager = p(Xg)),
          (this.options = p(ho, { optional: !0 }) || {}),
          (this.pendingTasks = p(It)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.navigationTransitions = p(pl)),
          (this.urlSerializer = p(co)),
          (this.location = p(Xn)),
          (this.urlHandlingStrategy = p(hl)),
          (this._events = new he()),
          (this.errorHandler = this.options.errorHandler || p0),
          (this.navigated = !1),
          (this.routeReuseStrategy = p(d0)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || "ignore"),
          (this.config = p(Ns, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!p(Rs, { optional: !0 })),
          (this.eventsSubscription = new ne()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (n) => {
                this.console.warn(n);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let n = this.navigationTransitions.events.subscribe((r) => {
          try {
            let o = this.navigationTransitions.currentTransition,
              i = this.navigationTransitions.currentNavigation;
            if (o !== null && i !== null) {
              if (
                (this.stateManager.handleRouterEvent(r, i),
                r instanceof At &&
                  r.code !== Fe.Redirect &&
                  r.code !== Fe.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (r instanceof ht) this.navigated = !0;
              else if (r instanceof ur) {
                let s = r.navigationBehaviorOptions,
                  a = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                  c = D(
                    {
                      browserUrl: o.extras.browserUrl,
                      info: o.extras.info,
                      skipLocationChange: o.extras.skipLocationChange,
                      replaceUrl:
                        o.extras.replaceUrl ||
                        this.urlUpdateStrategy === "eager" ||
                        l0(o.source),
                    },
                    s
                  );
                this.scheduleNavigation(a, Jr, null, c, {
                  resolve: o.resolve,
                  reject: o.reject,
                  promise: o.promise,
                });
              }
            }
            y0(r) && this._events.next(r);
          } catch (o) {
            this.navigationTransitions.transitionAbortSubject.next(o);
          }
        });
        this.eventsSubscription.add(n);
      }
      resetRootComponentType(n) {
        (this.routerState.root.component = n),
          (this.navigationTransitions.rootComponentType = n);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              Jr,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (n, r) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(n, "popstate", r);
              }, 0);
            }
          );
      }
      navigateToSyncWithBrowser(n, r, o) {
        let i = { replaceUrl: !0 },
          s = o?.navigationId ? o : null;
        if (o) {
          let c = D({}, o);
          delete c.navigationId,
            delete c.ɵrouterPageId,
            Object.keys(c).length !== 0 && (i.state = c);
        }
        let a = this.parseUrl(n);
        this.scheduleNavigation(a, r, s, i);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(n) {
        (this.config = n.map(dl)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(n, r = {}) {
        let {
            relativeTo: o,
            queryParams: i,
            fragment: s,
            queryParamsHandling: a,
            preserveFragment: c,
          } = r,
          u = c ? this.currentUrlTree.fragment : s,
          l = null;
        switch (a ?? this.options.defaultQueryParamsHandling) {
          case "merge":
            l = D(D({}, this.currentUrlTree.queryParams), i);
            break;
          case "preserve":
            l = this.currentUrlTree.queryParams;
            break;
          default:
            l = i || null;
        }
        l !== null && (l = this.removeEmptyProps(l));
        let d;
        try {
          let h = o ? o.snapshot : this.routerState.snapshot.root;
          d = Pg(h);
        } catch {
          (typeof n[0] != "string" || n[0][0] !== "/") && (n = []),
            (d = this.currentUrlTree.root);
        }
        return Fg(d, n, l, u ?? null);
      }
      navigateByUrl(n, r = { skipLocationChange: !1 }) {
        let o = Dn(n) ? n : this.parseUrl(n),
          i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
        return this.scheduleNavigation(i, Jr, null, r);
      }
      navigate(n, r = { skipLocationChange: !1 }) {
        return v0(n), this.navigateByUrl(this.createUrlTree(n, r), r);
      }
      serializeUrl(n) {
        return this.urlSerializer.serialize(n);
      }
      parseUrl(n) {
        try {
          return this.urlSerializer.parse(n);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(n, r) {
        let o;
        if (
          (r === !0 ? (o = D({}, g0)) : r === !1 ? (o = D({}, m0)) : (o = r),
          Dn(n))
        )
          return pg(this.currentUrlTree, n, o);
        let i = this.parseUrl(n);
        return pg(this.currentUrlTree, i, o);
      }
      removeEmptyProps(n) {
        return Object.entries(n).reduce(
          (r, [o, i]) => (i != null && (r[o] = i), r),
          {}
        );
      }
      scheduleNavigation(n, r, o, i, s) {
        if (this.disposed) return Promise.resolve(!1);
        let a, c, u;
        s
          ? ((a = s.resolve), (c = s.reject), (u = s.promise))
          : (u = new Promise((d, h) => {
              (a = d), (c = h);
            }));
        let l = this.pendingTasks.add();
        return (
          em(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(l));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: r,
            restoredState: o,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: i,
            resolve: a,
            reject: c,
            promise: u,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          u.catch((d) => Promise.reject(d))
        );
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
function v0(e) {
  for (let t = 0; t < e.length; t++) if (e[t] == null) throw new I(4008, !1);
}
function y0(e) {
  return !(e instanceof no) && !(e instanceof ur);
}
var tm = (() => {
  class e {
    constructor(n, r, o, i, s, a) {
      (this.router = n),
        (this.route = r),
        (this.tabIndexAttribute = o),
        (this.renderer = i),
        (this.el = s),
        (this.locationStrategy = a),
        (this.href = null),
        (this.onChanges = new he()),
        (this.preserveFragment = !1),
        (this.skipLocationChange = !1),
        (this.replaceUrl = !1),
        (this.routerLinkInput = null);
      let c = s.nativeElement.tagName?.toLowerCase();
      (this.isAnchorElement = c === "a" || c === "area"),
        this.isAnchorElement
          ? (this.subscription = n.events.subscribe((u) => {
              u instanceof ht && this.updateHref();
            }))
          : this.setTabIndexIfNotOnNativeEl("0");
    }
    setTabIndexIfNotOnNativeEl(n) {
      this.tabIndexAttribute != null ||
        this.isAnchorElement ||
        this.applyAttributeValue("tabindex", n);
    }
    ngOnChanges(n) {
      this.isAnchorElement && this.updateHref(), this.onChanges.next(this);
    }
    set routerLink(n) {
      n == null
        ? ((this.routerLinkInput = null), this.setTabIndexIfNotOnNativeEl(null))
        : (Dn(n)
            ? (this.routerLinkInput = n)
            : (this.routerLinkInput = Array.isArray(n) ? n : [n]),
          this.setTabIndexIfNotOnNativeEl("0"));
    }
    onClick(n, r, o, i, s) {
      let a = this.urlTree;
      if (
        a === null ||
        (this.isAnchorElement &&
          (n !== 0 ||
            r ||
            o ||
            i ||
            s ||
            (typeof this.target == "string" && this.target != "_self")))
      )
        return !0;
      let c = {
        skipLocationChange: this.skipLocationChange,
        replaceUrl: this.replaceUrl,
        state: this.state,
        info: this.info,
      };
      return this.router.navigateByUrl(a, c), !this.isAnchorElement;
    }
    ngOnDestroy() {
      this.subscription?.unsubscribe();
    }
    updateHref() {
      let n = this.urlTree;
      this.href =
        n !== null && this.locationStrategy
          ? this.locationStrategy?.prepareExternalUrl(
              this.router.serializeUrl(n)
            )
          : null;
      let r =
        this.href === null
          ? null
          : ch(this.href, this.el.nativeElement.tagName.toLowerCase(), "href");
      this.applyAttributeValue("href", r);
    }
    applyAttributeValue(n, r) {
      let o = this.renderer,
        i = this.el.nativeElement;
      r !== null ? o.setAttribute(i, n, r) : o.removeAttribute(i, n);
    }
    get urlTree() {
      return this.routerLinkInput === null
        ? null
        : Dn(this.routerLinkInput)
        ? this.routerLinkInput
        : this.router.createUrlTree(this.routerLinkInput, {
            relativeTo:
              this.relativeTo !== void 0 ? this.relativeTo : this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: this.preserveFragment,
          });
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(H(Xt), H(wn), Sc("tabindex"), H(Rr), H(Yn), H(xt));
      };
    }
    static {
      this.ɵdir = ct({
        type: e,
        selectors: [["", "routerLink", ""]],
        hostVars: 1,
        hostBindings: function (r, o) {
          r & 1 &&
            Pr("click", function (s) {
              return o.onClick(
                s.button,
                s.ctrlKey,
                s.shiftKey,
                s.altKey,
                s.metaKey
              );
            }),
            r & 2 && Or("target", o.target);
        },
        inputs: {
          target: "target",
          queryParams: "queryParams",
          fragment: "fragment",
          queryParamsHandling: "queryParamsHandling",
          state: "state",
          info: "info",
          relativeTo: "relativeTo",
          preserveFragment: [2, "preserveFragment", "preserveFragment", Vr],
          skipLocationChange: [
            2,
            "skipLocationChange",
            "skipLocationChange",
            Vr,
          ],
          replaceUrl: [2, "replaceUrl", "replaceUrl", Vr],
          routerLink: "routerLink",
        },
        standalone: !0,
        features: [Hc, xr],
      });
    }
  }
  return e;
})();
var As = class {};
var D0 = (() => {
    class e {
      constructor(n, r, o, i, s) {
        (this.router = n),
          (this.injector = o),
          (this.preloadingStrategy = i),
          (this.loader = s);
      }
      setUpPreloading() {
        this.subscription = this.router.events
          .pipe(
            Me((n) => n instanceof ht),
            mt(() => this.preload())
          )
          .subscribe(() => {});
      }
      preload() {
        return this.processRoutes(this.injector, this.router.config);
      }
      ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
      }
      processRoutes(n, r) {
        let o = [];
        for (let i of r) {
          i.providers &&
            !i._injector &&
            (i._injector = Li(i.providers, n, `Route: ${i.path}`));
          let s = i._injector ?? n,
            a = i._loadedInjector ?? s;
          ((i.loadChildren && !i._loadedRoutes && i.canLoad === void 0) ||
            (i.loadComponent && !i._loadedComponent)) &&
            o.push(this.preloadConfig(s, i)),
            (i.children || i._loadedRoutes) &&
              o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
        }
        return J(o).pipe(xn());
      }
      preloadConfig(n, r) {
        return this.preloadingStrategy.preload(r, () => {
          let o;
          r.loadChildren && r.canLoad === void 0
            ? (o = this.loader.loadChildren(n, r))
            : (o = S(null));
          let i = o.pipe(
            re((s) =>
              s === null
                ? S(void 0)
                : ((r._loadedRoutes = s.routes),
                  (r._loadedInjector = s.injector),
                  this.processRoutes(s.injector ?? n, s.routes))
            )
          );
          if (r.loadComponent && !r._loadedComponent) {
            let s = this.loader.loadComponent(r);
            return J([i, s]).pipe(xn());
          } else return i;
        });
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(Xt), b(Gi), b(ye), b(As), b(fl));
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  nm = new w(""),
  w0 = (() => {
    class e {
      constructor(n, r, o, i, s = {}) {
        (this.urlSerializer = n),
          (this.transitions = r),
          (this.viewportScroller = o),
          (this.zone = i),
          (this.options = s),
          (this.lastId = 0),
          (this.lastSource = "imperative"),
          (this.restoredId = 0),
          (this.store = {}),
          (s.scrollPositionRestoration ||= "disabled"),
          (s.anchorScrolling ||= "disabled");
      }
      init() {
        this.options.scrollPositionRestoration !== "disabled" &&
          this.viewportScroller.setHistoryScrollRestoration("manual"),
          (this.routerEventsSubscription = this.createScrollEvents()),
          (this.scrollEventsSubscription = this.consumeScrollEvents());
      }
      createScrollEvents() {
        return this.transitions.events.subscribe((n) => {
          n instanceof cr
            ? ((this.store[this.lastId] =
                this.viewportScroller.getScrollPosition()),
              (this.lastSource = n.navigationTrigger),
              (this.restoredId = n.restoredState
                ? n.restoredState.navigationId
                : 0))
            : n instanceof ht
            ? ((this.lastId = n.id),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.urlAfterRedirects).fragment
              ))
            : n instanceof Jt &&
              n.code === Es.IgnoredSameUrlNavigation &&
              ((this.lastSource = void 0),
              (this.restoredId = 0),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.url).fragment
              ));
        });
      }
      consumeScrollEvents() {
        return this.transitions.events.subscribe((n) => {
          n instanceof Cs &&
            (n.position
              ? this.options.scrollPositionRestoration === "top"
                ? this.viewportScroller.scrollToPosition([0, 0])
                : this.options.scrollPositionRestoration === "enabled" &&
                  this.viewportScroller.scrollToPosition(n.position)
              : n.anchor && this.options.anchorScrolling === "enabled"
              ? this.viewportScroller.scrollToAnchor(n.anchor)
              : this.options.scrollPositionRestoration !== "disabled" &&
                this.viewportScroller.scrollToPosition([0, 0]));
        });
      }
      scheduleScrollEvent(n, r) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            this.zone.run(() => {
              this.transitions.events.next(
                new Cs(
                  n,
                  this.lastSource === "popstate"
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            });
          }, 0);
        });
      }
      ngOnDestroy() {
        this.routerEventsSubscription?.unsubscribe(),
          this.scrollEventsSubscription?.unsubscribe();
      }
      static {
        this.ɵfac = function (r) {
          Eh();
        };
      }
      static {
        this.ɵprov = C({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function E0(e) {
  return e.routerState.root;
}
function po(e, t) {
  return { ɵkind: e, ɵproviders: t };
}
function I0() {
  let e = p(Ve);
  return (t) => {
    let n = e.get(Mt);
    if (t !== n.components[0]) return;
    let r = e.get(Xt),
      o = e.get(rm);
    e.get(gl) === 1 && r.initialNavigation(),
      e.get(om, null, O.Optional)?.setUpPreloading(),
      e.get(nm, null, O.Optional)?.init(),
      r.resetRootComponentType(n.componentTypes[0]),
      o.closed || (o.next(), o.complete(), o.unsubscribe());
  };
}
var rm = new w("", { factory: () => new he() }),
  gl = new w("", { providedIn: "root", factory: () => 1 });
function C0() {
  return po(2, [
    { provide: gl, useValue: 0 },
    {
      provide: Hi,
      multi: !0,
      deps: [Ve],
      useFactory: (t) => {
        let n = t.get(Dp, Promise.resolve());
        return () =>
          n.then(
            () =>
              new Promise((r) => {
                let o = t.get(Xt),
                  i = t.get(rm);
                em(o, () => {
                  r(!0);
                }),
                  (t.get(pl).afterPreactivation = () => (
                    r(!0), i.closed ? S(void 0) : i
                  )),
                  o.initialNavigation();
              })
          );
      },
    },
  ]);
}
function b0() {
  return po(3, [
    {
      provide: Hi,
      multi: !0,
      useFactory: () => {
        let t = p(Xt);
        return () => {
          t.setUpLocationChangeListener();
        };
      },
    },
    { provide: gl, useValue: 2 },
  ]);
}
var om = new w("");
function M0(e) {
  return po(0, [
    { provide: om, useExisting: D0 },
    { provide: As, useExisting: e },
  ]);
}
function S0() {
  return po(8, [yg, { provide: Rs, useExisting: yg }]);
}
function T0(e) {
  let t = [
    { provide: Kg, useValue: a0 },
    {
      provide: Jg,
      useValue: D({ skipNextTransition: !!e?.skipInitialTransition }, e),
    },
  ];
  return po(9, t);
}
var Ig = new w("ROUTER_FORROOT_GUARD"),
  _0 = [
    Xn,
    { provide: co, useClass: ar },
    Xt,
    lo,
    { provide: wn, useFactory: E0, deps: [Xt] },
    fl,
    [],
  ],
  ml = (() => {
    class e {
      constructor(n) {}
      static forRoot(n, r) {
        return {
          ngModule: e,
          providers: [
            _0,
            [],
            { provide: Ns, multi: !0, useValue: n },
            { provide: Ig, useFactory: R0, deps: [[Xt, new Ei(), new uc()]] },
            { provide: ho, useValue: r || {} },
            r?.useHash ? N0() : A0(),
            x0(),
            r?.preloadingStrategy ? M0(r.preloadingStrategy).ɵproviders : [],
            r?.initialNavigation ? O0(r) : [],
            r?.bindToComponentInputs ? S0().ɵproviders : [],
            r?.enableViewTransitions ? T0().ɵproviders : [],
            P0(),
          ],
        };
      }
      static forChild(n) {
        return {
          ngModule: e,
          providers: [{ provide: Ns, multi: !0, useValue: n }],
        };
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(b(Ig, 8));
        };
      }
      static {
        this.ɵmod = Ee({ type: e });
      }
      static {
        this.ɵinj = we({});
      }
    }
    return e;
  })();
function x0() {
  return {
    provide: nm,
    useFactory: () => {
      let e = p($p),
        t = p(q),
        n = p(ho),
        r = p(pl),
        o = p(co);
      return (
        n.scrollOffset && e.setOffset(n.scrollOffset), new w0(o, r, e, t, n)
      );
    },
  };
}
function N0() {
  return { provide: xt, useClass: Ep };
}
function A0() {
  return { provide: xt, useClass: gu };
}
function R0(e) {
  return "guarded";
}
function O0(e) {
  return [
    e.initialNavigation === "disabled" ? b0().ɵproviders : [],
    e.initialNavigation === "enabledBlocking" ? C0().ɵproviders : [],
  ];
}
var Cg = new w("");
function P0() {
  return [
    { provide: Cg, useFactory: I0 },
    { provide: zi, multi: !0, useExisting: Cg },
  ];
}
var Ps = class {
  constructor() {}
  getTeamMembersSummary() {
    var t = [
      {
        Region: "East",
        TeamMembersCount: 20,
        TemporarilyUnavailableMembers: 4,
      },
      {
        Region: "West",
        TeamMembersCount: 15,
        TemporarilyUnavailableMembers: 8,
      },
      {
        Region: "South",
        TeamMembersCount: 17,
        TemporarilyUnavailableMembers: 1,
      },
      {
        Region: "North",
        TeamMembersCount: 15,
        TemporarilyUnavailableMembers: 6,
      },
    ];
    return t;
  }
};
function L0(e, t) {
  if ((e & 1 && (m(0, "li", 41), M(1), bt(2, "slice"), v()), e & 2)) {
    let n = t.$implicit;
    A(), te(Qh(2, 1, n, 0, 10));
  }
}
function j0(e, t) {
  if (e & 1) {
    let n = Zh();
    m(0, "a", 42),
      Pr("click", function (o) {
        Mf(n);
        let i = Wt();
        return Sf(i.onProjectChange(o));
      }),
      M(1),
      v();
  }
  if (e & 2) {
    let n = t.$implicit;
    A(), te(n);
  }
}
function V0(e, t) {
  if ((e & 1 && (m(0, "span", 49), M(1), v()), e & 2)) {
    let n = Wt().$implicit;
    A(), te(n);
  }
}
function U0(e, t) {
  if ((e & 1 && (m(0, "span", 50), M(1), v()), e & 2)) {
    let n = Wt().$implicit;
    A(), te(n);
  }
}
function B0(e, t) {
  if ((e & 1 && (m(0, "span", 51), M(1), v()), e & 2)) {
    let n = Wt().$implicit;
    A(), te(n);
  }
}
function $0(e, t) {
  if ((e & 1 && (m(0, "span", 52), M(1), v()), e & 2)) {
    let n = Wt().$implicit;
    A(), te(n);
  }
}
function H0(e, t) {
  if (
    (e & 1 &&
      (m(0, "a", 43)(1, "span", 44),
      Qe(2, V0, 2, 1, "span", 45)(3, U0, 2, 1, "span", 46)(
        4,
        B0,
        2,
        1,
        "span",
        47
      )(5, $0, 2, 1, "span", 48),
      v()()),
    e & 2)
  ) {
    let n = t.$implicit;
    A(),
      Ie("ngSwitch", n),
      A(),
      Ie("ngSwitchCase", "2019"),
      A(),
      Ie("ngSwitchCase", "2018"),
      A(),
      Ie("ngSwitchCase", "2017");
  }
}
function z0(e, t) {
  if (
    (e & 1 &&
      (m(0, "tr")(1, "td")(2, "b"),
      M(3),
      v()(),
      m(4, "td"),
      M(5),
      v(),
      m(6, "td"),
      M(7),
      v()()),
    e & 2)
  ) {
    let n = t.$implicit;
    A(3),
      te(n.Region),
      A(2),
      Zt(" ", n.TeamMembersCount, " "),
      A(2),
      Zt(" ", n.TemporarilyUnavailableMembers, " ");
  }
}
function G0(e, t) {
  e & 1 && Ke(0, "div");
}
function q0(e, t) {
  if (
    (e & 1 &&
      (m(0, "div", 53)(1, "div", 60), M(2), v(), m(3, "div", 58), M(4), v()()),
    e & 2)
  ) {
    let n = t.$implicit;
    A(2), Zc("#", n.ID, " ", n.Name, ""), A(2), te(n.Status);
  }
}
function W0(e, t) {
  if ((e & 1 && Qe(0, q0, 5, 3, "div", 40), e & 2)) {
    let n = Wt().$implicit;
    Ie("ngForOf", n.Members);
  }
}
function Z0(e, t) {
  if (
    (e & 1 &&
      (m(0, "tr")(1, "td"),
      M(2),
      v(),
      m(3, "td"),
      M(4),
      v(),
      m(5, "td"),
      M(6),
      v()()),
    e & 2)
  ) {
    let n = t.$implicit;
    A(2),
      te(n.ID),
      A(),
      ji("color", n.Status == "Busy" ? "red" : "black"),
      A(),
      te(n.Name),
      A(2),
      te(n.Status);
  }
}
function Y0(e, t) {
  if (
    (e & 1 &&
      (m(0, "table", 34)(1, "thead")(2, "tr")(3, "th"),
      M(4, "ID"),
      v(),
      m(5, "th"),
      M(6, "Name"),
      v(),
      m(7, "th"),
      M(8, "Status"),
      v()()(),
      m(9, "tbody"),
      Qe(10, Z0, 7, 5, "tr", 35),
      v()()),
    e & 2)
  ) {
    let n = Wt().$implicit;
    A(10), Ie("ngForOf", n.Members);
  }
}
function Q0(e, t) {
  if (
    (e & 1 &&
      (m(0, "div", 53)(1, "div", 54)(2, "h2", 55)(3, "button", 56),
      M(4),
      v()()(),
      m(5, "div", 57)(6, "div", 58),
      Qe(7, G0, 1, 0, "div", 59)(8, W0, 1, 1, "ng-template", null, 0, Kc)(
        10,
        Y0,
        11,
        1,
        "ng-template",
        null,
        1,
        Kc
      ),
      v()()()),
    e & 2)
  ) {
    let n = t.$implicit,
      r = t.index,
      o = Wc(9),
      i = Wc(11);
    A(3),
      Or("data-target", "#cardbody" + r),
      A(),
      te(n.Region),
      A(),
      Ie("id", "cardbody" + r)("ngClass", r == 0 ? "show" : ""),
      A(2),
      Ie("ngIf", r == 0)("ngIfThen", o)("ngIfElse", i);
  }
}
var Fs = class e {
  constructor(t) {
    this.dashboardService = t;
  }
  Designation = "";
  Username = "";
  NoOfTeamMembers = 0;
  TotalCostOfAllProjects = 0;
  PendingTasks = 0;
  UpComingProjects = 0;
  ProjectCost = 0;
  CurrentExpenditure = 0;
  AvailableFunds = 0;
  ToDay = new Date();
  Clients = [];
  Projects = [];
  Years = [];
  TeamMembersSummary = [];
  TeamMembers = [];
  ngOnInit() {
    (this.Designation = "Team Leader"),
      (this.Username = "Scott Smith"),
      (this.NoOfTeamMembers = 67),
      (this.TotalCostOfAllProjects = 240),
      (this.PendingTasks = 15),
      (this.UpComingProjects = 0.2),
      (this.ProjectCost = 2113507),
      (this.CurrentExpenditure = 96788),
      (this.AvailableFunds = 52536),
      (this.ToDay = new Date()),
      (this.Clients = [
        "ABC Infotech Ltd.",
        "DEF Software Solutions",
        "GHI Industries",
      ]),
      (this.Projects = ["Project A", "Project B", "Project C", "Project D"]);
    for (var t = 2019; t >= 2010; t--) this.Years.push(t);
    (this.TeamMembersSummary = this.dashboardService.getTeamMembersSummary()),
      (this.TeamMembers = [
        {
          Region: "East",
          Members: [
            { ID: 1, Name: "Ford", Status: "Available" },
            { ID: 2, Name: "Miller", Status: "Available" },
            { ID: 3, Name: "Jones", Status: "Busy" },
            { ID: 4, Name: "James", Status: "Busy" },
          ],
        },
        {
          Region: "West",
          Members: [
            { ID: 5, Name: "Anna", Status: "Available" },
            { ID: 6, Name: "Arun", Status: "Available" },
            { ID: 7, Name: "Varun", Status: "Busy" },
            { ID: 8, Name: "Jasmine", Status: "Busy" },
          ],
        },
        {
          Region: "South",
          Members: [
            { ID: 9, Name: "Krishna", Status: "Available" },
            { ID: 10, Name: "Mohan", Status: "Available" },
            { ID: 11, Name: "Raju", Status: "Busy" },
            { ID: 12, Name: "Farooq", Status: "Busy" },
          ],
        },
        {
          Region: "North",
          Members: [
            { ID: 13, Name: "Jacob", Status: "Available" },
            { ID: 14, Name: "Smith", Status: "Available" },
            { ID: 15, Name: "Jones", Status: "Busy" },
            { ID: 16, Name: "James", Status: "Busy" },
          ],
        },
      ]);
  }
  onProjectChange(t) {
    t.target.innerHTML.trim() == "Project A"
      ? ((this.ProjectCost = 2113507),
        (this.CurrentExpenditure = 96788),
        (this.AvailableFunds = 52436))
      : t.target.innerHTML.trim() == "Project B"
      ? ((this.ProjectCost = 88923),
        (this.CurrentExpenditure = 22450),
        (this.AvailableFunds = 2640))
      : t.target.innerHTML.trim() == "Project C"
      ? ((this.ProjectCost = 662183),
        (this.CurrentExpenditure = 7721),
        (this.AvailableFunds = 9811))
      : t.target.innerHTML.trim() == "Project D" &&
        ((this.ProjectCost = 928431),
        (this.CurrentExpenditure = 562),
        (this.AvailableFunds = 883));
  }
  static ɵfac = function (n) {
    return new (n || e)(H(Ps));
  };
  static ɵcmp = zt({
    type: e,
    selectors: [["app-dashboard"]],
    decls: 106,
    vars: 33,
    consts: [
      ["firstTemplate", ""],
      ["secondTemplate", ""],
      [1, "breadcrumb"],
      [1, "breadcrumb-item"],
      ["routerLink", "/"],
      [1, "breadcrumb-item", "active"],
      [1, "row"],
      [1, "col-lg-3", "pb-3", 2, "background-color", "#e9e6e6"],
      [
        1,
        "col-11",
        "text-white",
        "text-center",
        "mx-auto",
        "rounded",
        "pt-2",
        "pb-2",
        "font-weight-bold",
        2,
        "background-color",
        "#a39e9e",
        "font-family",
        "'Arial Narrow Bold', sans-serif",
      ],
      [1, "col-12", "text-center", "mt-2"],
      ["src", "assets/user.png", "width", "120px"],
      [
        1,
        "col-12",
        "text-center",
        "pt-2",
        "pb-2",
        "font-weight-bold",
        2,
        "font-family",
        "Tahoma",
      ],
      [1, "col-12", "text-center", "pt-2", "pb-2", 2, "font-family", "Arial"],
      [1, "col-12", "mb-3"],
      [1, "list-group"],
      [
        1,
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center",
      ],
      [1, "badge", "badge-secondary", "badge-pill", 2, "font-size", "13px"],
      [
        1,
        "col-12",
        "text-center",
        "pt-2",
        "pb-2",
        2,
        "font-family",
        "'Arial Narrow'",
      ],
      [1, "col-12"],
      [1, "list-group", "list-group-flush"],
      ["class", "list-group-item", 4, "ngFor", "ngForOf"],
      [1, "col-lg-6"],
      [1, "col-12", "pt-0", "pb-2", 2, "background-color", "#e9e6e6"],
      [1, "row", "mt-2"],
      [1, "col-6", "text-left"],
      [1, "dropdown"],
      [
        "type",
        "button",
        "id",
        "dropdownMenuButton",
        "data-toggle",
        "dropdown",
        1,
        "btn",
        "btn-secondary",
        "dropdown-toggle",
      ],
      [1, "dropdown-menu"],
      [
        "class",
        "dropdown-item",
        "href",
        "#",
        "onclick",
        "return false",
        3,
        "click",
        4,
        "ngFor",
        "ngForOf",
      ],
      [1, "col-6", "text-right"],
      ["class", "dropdown-item", "href", "#", 4, "ngFor", "ngForOf"],
      [
        1,
        "col-11",
        "mx-auto",
        "mt-1",
        "text-white",
        "text-center",
        "pt-2",
        "pb-2",
        "mx-auto",
        "rounded",
        "font-weight-bold",
        2,
        "background-color",
        "#718d97",
        "font-family",
        "'Arial Narrow'",
      ],
      [1, "table", "table-borderless"],
      [
        1,
        "col-11",
        "mx-auto",
        "mt-1",
        "text-white",
        "text-center",
        "pt-2",
        "pb-2",
        "mx-2",
        "rounded",
        "font-weight-bold",
        2,
        "background-color",
        "#718d97",
        "font-family",
        "'Arial Narrow'",
      ],
      [1, "table"],
      [4, "ngFor", "ngForOf"],
      [1, "col-lg-3", 2, "background-color", "#e9e6e6"],
      [
        1,
        "col-11",
        "mx-auto",
        "mt-1",
        "text-white",
        "text-center",
        "pt-1",
        "pb-2",
        "mx-2",
        "rounded",
        "font-weight-bold",
        2,
        "background-color",
        "#718d97",
        "font-family",
        "'Arial Narrow'",
      ],
      [1, "col-lg-12", "pt-2"],
      ["id", "accordion1", 1, "accordion"],
      ["class", "card", 4, "ngFor", "ngForOf"],
      [1, "list-group-item"],
      ["href", "#", "onclick", "return false", 1, "dropdown-item", 3, "click"],
      ["href", "#", 1, "dropdown-item"],
      [3, "ngSwitch"],
      ["style", "color:green", 4, "ngSwitchCase"],
      ["style", "color:blue", 4, "ngSwitchCase"],
      ["style", "color:red", 4, "ngSwitchCase"],
      ["style", "color:black", 4, "ngSwitchDefault"],
      [2, "color", "green"],
      [2, "color", "blue"],
      [2, "color", "red"],
      [2, "color", "black"],
      [1, "card"],
      ["id", "card1", 1, "card-header", "bg-secondary"],
      [1, "mb-0"],
      [
        "type",
        "button",
        "data-toggle",
        "collapse",
        1,
        "btn",
        "btn-link",
        "text-white",
      ],
      ["data-parent", "#accordion1", 1, "collapse", 3, "id", "ngClass"],
      [1, "card-body"],
      [4, "ngIf", "ngIfThen", "ngIfElse"],
      [1, "card-header", "bg-primary", "text-white"],
    ],
    template: function (n, r) {
      n & 1 &&
        (m(0, "nav")(1, "ol", 2)(2, "li", 3)(3, "a", 4),
        M(4, "Home"),
        v()(),
        m(5, "li", 5),
        M(6, "Dashboard"),
        v()()(),
        m(7, "h5"),
        M(8, "Dashboard"),
        v(),
        m(9, "h6"),
        M(10),
        bt(11, "date"),
        v(),
        m(12, "div", 6)(13, "div", 7)(14, "div", 6)(15, "div", 8),
        M(16),
        bt(17, "uppercase"),
        v(),
        m(18, "div", 9),
        Ke(19, "img", 10),
        v(),
        m(20, "div", 11),
        M(21),
        bt(22, "lowercase"),
        v(),
        m(23, "div", 12),
        M(24, "TEAM SUMMARY"),
        v(),
        m(25, "div", 13)(26, "ul", 14)(27, "li", 15),
        M(28, " NO. OF TEAM MEMBERS "),
        m(29, "span", 16),
        M(30),
        v()(),
        m(31, "li", 15),
        M(32, " TOTAL COST OF ALL PROJECTS "),
        m(33, "span", 16),
        M(34),
        v()(),
        m(35, "li", 15),
        M(36, " PENDING TASKS "),
        m(37, "span", 16),
        M(38),
        v()(),
        m(39, "li", 15),
        M(40, " UPCOMING PROJECTS "),
        m(41, "span", 16),
        M(42),
        bt(43, "percent"),
        v()()()(),
        m(44, "div", 17),
        M(45, "CLIENTS"),
        v(),
        m(46, "div", 18)(47, "ul", 19),
        Qe(48, L0, 3, 5, "li", 20),
        v()()()(),
        m(49, "div", 21)(50, "div", 6)(51, "div", 22)(52, "div", 23)(
          53,
          "div",
          24
        )(54, "div", 25)(55, "button", 26),
        M(56, " Project A "),
        v(),
        m(57, "div", 27),
        Qe(58, j0, 2, 1, "a", 28),
        v()()(),
        m(59, "div", 29)(60, "div", 25)(61, "button", 26),
        M(62, " 2019 "),
        v(),
        m(63, "div", 27),
        Qe(64, H0, 6, 4, "a", 30),
        v()()()()(),
        m(65, "div", 31),
        M(66, "PROJECT BRIEFING"),
        v(),
        m(67, "div", 18)(68, "table", 32)(69, "tr")(70, "td"),
        M(71, "Project Cost"),
        v(),
        m(72, "td"),
        M(73),
        bt(74, "currency"),
        v()(),
        m(75, "tr")(76, "td"),
        M(77, "Current Expenditure"),
        v(),
        m(78, "td"),
        M(79),
        bt(80, "currency"),
        v()(),
        m(81, "tr")(82, "td"),
        M(83, "Available Funds"),
        v(),
        m(84, "td"),
        M(85),
        bt(86, "currency"),
        v()()()(),
        m(87, "div", 33),
        M(88, "TEAM MEMBERS SUMMARY"),
        v(),
        m(89, "div", 18)(90, "table", 34)(91, "tr")(92, "th"),
        M(93, "Region"),
        v(),
        m(94, "th"),
        M(95, "Team Members Count"),
        v(),
        m(96, "th"),
        M(97, "Temporarily Unavailable Members"),
        v()(),
        Qe(98, z0, 8, 3, "tr", 35),
        v()()()(),
        m(99, "div", 36)(100, "div", 6)(101, "div", 37),
        M(102, "TEAM MEMBERS"),
        v(),
        m(103, "div", 38)(104, "div", 39),
        Qe(105, Q0, 12, 7, "div", 40),
        v()()()()()),
        n & 2 &&
          (A(10),
          te(Fr(11, 15, r.ToDay, "d/M/y")),
          A(6),
          Zt("", Vi(17, 18, r.Designation), " "),
          A(5),
          Zt(" ", Vi(22, 20, r.Username), " "),
          A(9),
          te(r.NoOfTeamMembers),
          A(4),
          Zt("$ ", r.TotalCostOfAllProjects, " k"),
          A(4),
          te(r.PendingTasks),
          A(4),
          te(Vi(43, 22, r.UpComingProjects)),
          A(6),
          Ie("ngForOf", r.Clients),
          A(10),
          Ie("ngForOf", r.Projects),
          A(6),
          Ie("ngForOf", r.Years),
          A(9),
          te(Fr(74, 24, r.ProjectCost, "INR")),
          A(6),
          te(Fr(80, 27, r.CurrentExpenditure, "INR")),
          A(6),
          te(Fr(86, 30, r.AvailableFunds, "INR")),
          A(13),
          Ie("ngForOf", r.TeamMembersSummary),
          A(7),
          Ie("ngForOf", r.TeamMembers));
    },
    dependencies: [xp, Np, Ap, is, Rp, Op, Fp, Pp, Bp, Lp, jp, kp],
  });
};
var go = class e {
  constructor() {}
  ngOnInit() {}
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵcmp = zt({
    type: e,
    selectors: [["about"]],
    decls: 2,
    vars: 0,
    template: function (n, r) {
      n & 1 && (m(0, "p"), M(1, "about works!"), v());
    },
  });
};
var K0 = [
    { path: "dashboard", component: Fs },
    { path: "about", component: go },
    { path: "about", component: go },
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
  ],
  ks = class e {
    static ɵfac = function (n) {
      return new (n || e)();
    };
    static ɵmod = Ee({ type: e });
    static ɵinj = we({ imports: [ml.forRoot(K0), ml] });
  };
var Ls = class e {
  title = "TaskManager";
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵcmp = zt({
    type: e,
    selectors: [["app-root"]],
    decls: 26,
    vars: 0,
    consts: [
      [1, "navbar", "navbar-expand-sm", "bg-success", "navbar-dark"],
      ["href", "#", 1, "navbar-brand"],
      [
        "type",
        "button",
        "data-toggle",
        "collapse",
        "data-target",
        "#mynav",
        1,
        "navbar-toggler",
      ],
      [1, "navbar-toggler-icon"],
      ["id", "mynav", 1, "collapse", "navbar-collapse"],
      [1, "navbar-nav", "mr-auto"],
      [1, "nav-item"],
      ["routerLink", "dashboard", 1, "nav-link"],
      ["routerLink", "about", 1, "nav-link"],
      ["routerLink", "projects", 1, "nav-link"],
      [1, "form-inline", "my-2", "my-lg-0"],
      [1, "input-group"],
      [1, "input-group-prepend"],
      ["id", "search", 1, "input-group-text"],
      [1, "fa", "fa-search"],
      ["type", "text", "placeholder", "Search", 1, "form-control"],
      ["type", "button", 1, "btn", "btn-warning", "my2-", "my-sm-0"],
      [1, "container-fluid"],
    ],
    template: function (n, r) {
      n & 1 &&
        (m(0, "nav", 0)(1, "a", 1),
        M(2, " Angular Task Manager "),
        v(),
        m(3, "button", 2),
        Ke(4, "span", 3),
        v(),
        m(5, "div", 4)(6, "ul", 5)(7, "li", 6)(8, "a", 7),
        M(9, "Dashboard"),
        v()(),
        m(10, "li", 6)(11, "a", 8),
        M(12, "About"),
        v()(),
        m(13, "li", 6)(14, "a", 9),
        M(15, "Projects"),
        v()()(),
        m(16, "form", 10)(17, "div", 11)(18, "div", 12)(19, "span", 13),
        Ke(20, "i", 14),
        v()(),
        Ke(21, "input", 15),
        v(),
        m(22, "button", 16),
        M(23, "Search"),
        v()()()(),
        m(24, "div", 17),
        Ke(25, "router-outlet"),
        v());
    },
    dependencies: [ll, tm],
  });
};
var js = class e {
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵmod = Ee({ type: e });
  static ɵinj = we({ imports: [ss] });
};
var Vs = class e {
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵmod = Ee({ type: e, bootstrap: [Ls] });
  static ɵinj = we({ imports: [dg, ks, js, ng] });
};
lg()
  .bootstrapModule(Vs, { ngZoneEventCoalescing: !0 })
  .catch((e) => console.error(e));
