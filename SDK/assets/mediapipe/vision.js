"use strict";
var Vision = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to2, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to2, key) && key !== except)
          __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to2;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // ../sdk-core/src/manager/vision.ts
  var vision_exports = {};
  __export(vision_exports, {
    VisionTaskRegistry: () => VisionTaskRegistry,
    VisionTaskType: () => VisionTaskType
  });

  // ../../node_modules/.pnpm/@mediapipe+tasks-vision@0.10.22-rc.20250304/node_modules/@mediapipe/tasks-vision/vision_bundle.mjs
  var t = "undefined" != typeof self ? self : {};
  function e() {
    throw Error("Invalid UTF8");
  }
  function n(t2, e2) {
    return e2 = String.fromCharCode.apply(null, e2), null == t2 ? e2 : t2 + e2;
  }
  var r;
  var i;
  var s = "undefined" != typeof TextDecoder;
  var o;
  var a = "undefined" != typeof TextEncoder;
  function c(t2) {
    if (a) t2 = (o || (o = new TextEncoder())).encode(t2);
    else {
      let n2 = 0;
      const r2 = new Uint8Array(3 * t2.length);
      for (let i2 = 0; i2 < t2.length; i2++) {
        var e2 = t2.charCodeAt(i2);
        if (e2 < 128) r2[n2++] = e2;
        else {
          if (e2 < 2048) r2[n2++] = e2 >> 6 | 192;
          else {
            if (e2 >= 55296 && e2 <= 57343) {
              if (e2 <= 56319 && i2 < t2.length) {
                const s2 = t2.charCodeAt(++i2);
                if (s2 >= 56320 && s2 <= 57343) {
                  e2 = 1024 * (e2 - 55296) + s2 - 56320 + 65536, r2[n2++] = e2 >> 18 | 240, r2[n2++] = e2 >> 12 & 63 | 128, r2[n2++] = e2 >> 6 & 63 | 128, r2[n2++] = 63 & e2 | 128;
                  continue;
                }
                i2--;
              }
              e2 = 65533;
            }
            r2[n2++] = e2 >> 12 | 224, r2[n2++] = e2 >> 6 & 63 | 128;
          }
          r2[n2++] = 63 & e2 | 128;
        }
      }
      t2 = n2 === r2.length ? r2 : r2.subarray(0, n2);
    }
    return t2;
  }
  var h;
  var u;
  t: {
    for (l = ["CLOSURE_FLAGS"], d = t, f = 0; f < l.length; f++) if (null == (d = d[l[f]])) {
      u = null;
      break t;
    }
    u = d;
  }
  var l;
  var d;
  var f;
  var p;
  var g = u && u[610401301];
  h = null != g && g;
  var m = t.navigator;
  function y(t2) {
    return !!h && (!!p && p.brands.some((({ brand: e2 }) => e2 && -1 != e2.indexOf(t2))));
  }
  function _(e2) {
    var n2;
    return (n2 = t.navigator) && (n2 = n2.userAgent) || (n2 = ""), -1 != n2.indexOf(e2);
  }
  function v() {
    return !!h && (!!p && p.brands.length > 0);
  }
  function E() {
    return v() ? y("Chromium") : (_("Chrome") || _("CriOS")) && !(!v() && _("Edge")) || _("Silk");
  }
  function w(t2) {
    return w[" "](t2), t2;
  }
  p = m && m.userAgentData || null, w[" "] = function() {
  };
  var T = !v() && (_("Trident") || _("MSIE"));
  !_("Android") || E(), E(), _("Safari") && (E() || !v() && _("Coast") || !v() && _("Opera") || !v() && _("Edge") || (v() ? y("Microsoft Edge") : _("Edg/")) || v() && y("Opera"));
  var A = {};
  var b = null;
  function k(t2) {
    const e2 = t2.length;
    let n2 = 3 * e2 / 4;
    n2 % 3 ? n2 = Math.floor(n2) : -1 != "=.".indexOf(t2[e2 - 1]) && (n2 = -1 != "=.".indexOf(t2[e2 - 2]) ? n2 - 2 : n2 - 1);
    const r2 = new Uint8Array(n2);
    let i2 = 0;
    return (function(t3, e3) {
      function n3(e4) {
        for (; r3 < t3.length; ) {
          const e5 = t3.charAt(r3++), n4 = b[e5];
          if (null != n4) return n4;
          if (!/^[\s\xa0]*$/.test(e5)) throw Error("Unknown base64 encoding at char: " + e5);
        }
        return e4;
      }
      S();
      let r3 = 0;
      for (; ; ) {
        const t4 = n3(-1), r4 = n3(0), i3 = n3(64), s2 = n3(64);
        if (64 === s2 && -1 === t4) break;
        e3(t4 << 2 | r4 >> 4), 64 != i3 && (e3(r4 << 4 & 240 | i3 >> 2), 64 != s2 && e3(i3 << 6 & 192 | s2));
      }
    })(t2, (function(t3) {
      r2[i2++] = t3;
    })), i2 !== n2 ? r2.subarray(0, i2) : r2;
  }
  function S() {
    if (!b) {
      b = {};
      var t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e2 = ["+/=", "+/", "-_=", "-_.", "-_"];
      for (let n2 = 0; n2 < 5; n2++) {
        const r2 = t2.concat(e2[n2].split(""));
        A[n2] = r2;
        for (let t3 = 0; t3 < r2.length; t3++) {
          const e3 = r2[t3];
          void 0 === b[e3] && (b[e3] = t3);
        }
      }
    }
  }
  var x = "undefined" != typeof Uint8Array;
  var L = !T && "function" == typeof btoa;
  function R(t2) {
    if (!L) {
      var e2;
      void 0 === e2 && (e2 = 0), S(), e2 = A[e2];
      var n2 = Array(Math.floor(t2.length / 3)), r2 = e2[64] || "";
      let c2 = 0, h2 = 0;
      for (; c2 < t2.length - 2; c2 += 3) {
        var i2 = t2[c2], s2 = t2[c2 + 1], o2 = t2[c2 + 2], a2 = e2[i2 >> 2];
        i2 = e2[(3 & i2) << 4 | s2 >> 4], s2 = e2[(15 & s2) << 2 | o2 >> 6], o2 = e2[63 & o2], n2[h2++] = a2 + i2 + s2 + o2;
      }
      switch (a2 = 0, o2 = r2, t2.length - c2) {
        case 2:
          o2 = e2[(15 & (a2 = t2[c2 + 1])) << 2] || r2;
        case 1:
          t2 = t2[c2], n2[h2] = e2[t2 >> 2] + e2[(3 & t2) << 4 | a2 >> 4] + o2 + r2;
      }
      return n2.join("");
    }
    for (e2 = "", n2 = 0, r2 = t2.length - 10240; n2 < r2; ) e2 += String.fromCharCode.apply(null, t2.subarray(n2, n2 += 10240));
    return e2 += String.fromCharCode.apply(null, n2 ? t2.subarray(n2) : t2), btoa(e2);
  }
  var F = /[-_.]/g;
  var I = { "-": "+", _: "/", ".": "=" };
  function M(t2) {
    return I[t2] || "";
  }
  function P(t2) {
    if (!L) return k(t2);
    F.test(t2) && (t2 = t2.replace(F, M)), t2 = atob(t2);
    const e2 = new Uint8Array(t2.length);
    for (let n2 = 0; n2 < t2.length; n2++) e2[n2] = t2.charCodeAt(n2);
    return e2;
  }
  function C(t2) {
    return x && null != t2 && t2 instanceof Uint8Array;
  }
  var O = {};
  function U() {
    return B || (B = new N(null, O));
  }
  function D(t2) {
    j(O);
    var e2 = t2.g;
    return null == (e2 = null == e2 || C(e2) ? e2 : "string" == typeof e2 ? P(e2) : null) ? e2 : t2.g = e2;
  }
  var N = class {
    h() {
      return new Uint8Array(D(this) || 0);
    }
    constructor(t2, e2) {
      if (j(e2), this.g = t2, null != t2 && 0 === t2.length) throw Error("ByteString should be constructed with non-empty values");
    }
  };
  var B;
  var G;
  function j(t2) {
    if (t2 !== O) throw Error("illegal external caller");
  }
  function V(t2, e2) {
    t2.__closure__error__context__984382 || (t2.__closure__error__context__984382 = {}), t2.__closure__error__context__984382.severity = e2;
  }
  function X(t2) {
    return V(t2 = Error(t2), "warning"), t2;
  }
  function H(e2) {
    if (null != e2) {
      var n2 = G ?? (G = {}), r2 = n2[e2] || 0;
      r2 >= 5 || (n2[e2] = r2 + 1, V(e2 = Error(), "incident"), (function(e3) {
        t.setTimeout((() => {
          throw e3;
        }), 0);
      })(e2));
    }
  }
  var W = "function" == typeof Symbol && "symbol" == typeof Symbol();
  function z(t2, e2, n2 = false) {
    return "function" == typeof Symbol && "symbol" == typeof Symbol() ? n2 && Symbol.for && t2 ? Symbol.for(t2) : null != t2 ? Symbol(t2) : Symbol() : e2;
  }
  var K = z("jas", void 0, true);
  var Y = z(void 0, "0di");
  var $ = z(void 0, "1oa");
  var q = z(void 0, Symbol());
  var J = z(void 0, "0actk");
  var Z = z(void 0, "8utk");
  var Q = W ? K : "Ea";
  var tt = { Ea: { value: 0, configurable: true, writable: true, enumerable: false } };
  var et = Object.defineProperties;
  function nt(t2, e2) {
    W || Q in t2 || et(t2, tt), t2[Q] |= e2;
  }
  function rt(t2, e2) {
    W || Q in t2 || et(t2, tt), t2[Q] = e2;
  }
  function it(t2) {
    return nt(t2, 34), t2;
  }
  function st(t2, e2) {
    rt(e2, -15615 & (0 | t2));
  }
  function ot(t2, e2) {
    rt(e2, -15581 & (34 | t2));
  }
  function at() {
    return "function" == typeof BigInt;
  }
  function ct(t2) {
    return Array.prototype.slice.call(t2);
  }
  var ht;
  var ut = {};
  function lt(t2) {
    return null !== t2 && "object" == typeof t2 && !Array.isArray(t2) && t2.constructor === Object;
  }
  function dt(t2, e2) {
    if (null != t2) {
      if ("string" == typeof t2) t2 = t2 ? new N(t2, O) : U();
      else if (t2.constructor !== N) if (C(t2)) t2 = t2.length ? new N(new Uint8Array(t2), O) : U();
      else {
        if (!e2) throw Error();
        t2 = void 0;
      }
    }
    return t2;
  }
  var ft = [];
  function pt(t2) {
    if (2 & t2) throw Error();
  }
  rt(ft, 55), ht = Object.freeze(ft);
  var gt = class {
    constructor(t2, e2, n2) {
      this.g = t2, this.h = e2, this.l = n2;
    }
    next() {
      const t2 = this.g.next();
      return t2.done || (t2.value = this.h.call(this.l, t2.value)), t2;
    }
    [Symbol.iterator]() {
      return this;
    }
  };
  function mt(t2) {
    return q ? t2[q] : void 0;
  }
  var yt = Object.freeze({});
  function _t(t2) {
    return t2.Na = true, t2;
  }
  var vt = _t(((t2) => "number" == typeof t2));
  var Et = _t(((t2) => "string" == typeof t2));
  var wt = _t(((t2) => "boolean" == typeof t2));
  var Tt = "function" == typeof t.BigInt && "bigint" == typeof t.BigInt(0);
  function At(t2) {
    var e2 = t2;
    if (Et(e2)) {
      if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e2)) throw Error(String(e2));
    } else if (vt(e2) && !Number.isSafeInteger(e2)) throw Error(String(e2));
    return Tt ? BigInt(t2) : t2 = wt(t2) ? t2 ? "1" : "0" : Et(t2) ? t2.trim() || "0" : String(t2);
  }
  var bt = _t(((t2) => Tt ? t2 >= St && t2 <= Lt : "-" === t2[0] ? Rt(t2, kt) : Rt(t2, xt)));
  var kt = Number.MIN_SAFE_INTEGER.toString();
  var St = Tt ? BigInt(Number.MIN_SAFE_INTEGER) : void 0;
  var xt = Number.MAX_SAFE_INTEGER.toString();
  var Lt = Tt ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
  function Rt(t2, e2) {
    if (t2.length > e2.length) return false;
    if (t2.length < e2.length || t2 === e2) return true;
    for (let n2 = 0; n2 < t2.length; n2++) {
      const r2 = t2[n2], i2 = e2[n2];
      if (r2 > i2) return false;
      if (r2 < i2) return true;
    }
  }
  var Ft = "function" == typeof Uint8Array.prototype.slice;
  var It;
  var Mt = 0;
  var Pt = 0;
  function Ct(t2) {
    const e2 = t2 >>> 0;
    Mt = e2, Pt = (t2 - e2) / 4294967296 >>> 0;
  }
  function Ot(t2) {
    if (t2 < 0) {
      Ct(-t2);
      const [e2, n2] = Xt(Mt, Pt);
      Mt = e2 >>> 0, Pt = n2 >>> 0;
    } else Ct(t2);
  }
  function Ut(t2) {
    const e2 = It || (It = new DataView(new ArrayBuffer(8)));
    e2.setFloat32(0, +t2, true), Pt = 0, Mt = e2.getUint32(0, true);
  }
  function Dt(t2, e2) {
    const n2 = 4294967296 * e2 + (t2 >>> 0);
    return Number.isSafeInteger(n2) ? n2 : Bt(t2, e2);
  }
  function Nt(t2, e2) {
    const n2 = 2147483648 & e2;
    return n2 && (e2 = ~e2 >>> 0, 0 == (t2 = 1 + ~t2 >>> 0) && (e2 = e2 + 1 >>> 0)), "number" == typeof (t2 = Dt(t2, e2)) ? n2 ? -t2 : t2 : n2 ? "-" + t2 : t2;
  }
  function Bt(t2, e2) {
    if (t2 >>>= 0, (e2 >>>= 0) <= 2097151) var n2 = "" + (4294967296 * e2 + t2);
    else at() ? n2 = "" + (BigInt(e2) << BigInt(32) | BigInt(t2)) : (t2 = (16777215 & t2) + 6777216 * (n2 = 16777215 & (t2 >>> 24 | e2 << 8)) + 6710656 * (e2 = e2 >> 16 & 65535), n2 += 8147497 * e2, e2 *= 2, t2 >= 1e7 && (n2 += t2 / 1e7 >>> 0, t2 %= 1e7), n2 >= 1e7 && (e2 += n2 / 1e7 >>> 0, n2 %= 1e7), n2 = e2 + Gt(n2) + Gt(t2));
    return n2;
  }
  function Gt(t2) {
    return t2 = String(t2), "0000000".slice(t2.length) + t2;
  }
  function jt() {
    var t2 = Mt, e2 = Pt;
    if (2147483648 & e2) if (at()) t2 = "" + (BigInt(0 | e2) << BigInt(32) | BigInt(t2 >>> 0));
    else {
      const [n2, r2] = Xt(t2, e2);
      t2 = "-" + Bt(n2, r2);
    }
    else t2 = Bt(t2, e2);
    return t2;
  }
  function Vt(t2) {
    if (t2.length < 16) Ot(Number(t2));
    else if (at()) t2 = BigInt(t2), Mt = Number(t2 & BigInt(4294967295)) >>> 0, Pt = Number(t2 >> BigInt(32) & BigInt(4294967295));
    else {
      const e2 = +("-" === t2[0]);
      Pt = Mt = 0;
      const n2 = t2.length;
      for (let r2 = e2, i2 = (n2 - e2) % 6 + e2; i2 <= n2; r2 = i2, i2 += 6) {
        const e3 = Number(t2.slice(r2, i2));
        Pt *= 1e6, Mt = 1e6 * Mt + e3, Mt >= 4294967296 && (Pt += Math.trunc(Mt / 4294967296), Pt >>>= 0, Mt >>>= 0);
      }
      if (e2) {
        const [t3, e3] = Xt(Mt, Pt);
        Mt = t3, Pt = e3;
      }
    }
  }
  function Xt(t2, e2) {
    return e2 = ~e2, t2 ? t2 = 1 + ~t2 : e2 += 1, [t2, e2];
  }
  var Ht = "function" == typeof BigInt ? BigInt.asIntN : void 0;
  var Wt = "function" == typeof BigInt ? BigInt.asUintN : void 0;
  var zt = Number.isSafeInteger;
  var Kt = Number.isFinite;
  var Yt = Math.trunc;
  var $t = At(0);
  function qt(t2) {
    return null == t2 || "number" == typeof t2 ? t2 : "NaN" === t2 || "Infinity" === t2 || "-Infinity" === t2 ? Number(t2) : void 0;
  }
  function Jt(t2) {
    return null == t2 || "boolean" == typeof t2 ? t2 : "number" == typeof t2 ? !!t2 : void 0;
  }
  var Zt = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
  function Qt(t2) {
    switch (typeof t2) {
      case "bigint":
        return true;
      case "number":
        return Kt(t2);
      case "string":
        return Zt.test(t2);
      default:
        return false;
    }
  }
  function te(t2) {
    if (null == t2) return t2;
    if ("string" == typeof t2 && t2) t2 = +t2;
    else if ("number" != typeof t2) return;
    return Kt(t2) ? 0 | t2 : void 0;
  }
  function ee(t2) {
    if (null == t2) return t2;
    if ("string" == typeof t2 && t2) t2 = +t2;
    else if ("number" != typeof t2) return;
    return Kt(t2) ? t2 >>> 0 : void 0;
  }
  function ne(t2) {
    if ("-" === t2[0]) return false;
    const e2 = t2.length;
    return e2 < 20 || 20 === e2 && Number(t2.substring(0, 6)) < 184467;
  }
  function re(t2) {
    const e2 = t2.length;
    return "-" === t2[0] ? e2 < 20 || 20 === e2 && Number(t2.substring(0, 7)) > -922337 : e2 < 19 || 19 === e2 && Number(t2.substring(0, 6)) < 922337;
  }
  function ie(t2) {
    return re(t2) ? t2 : (Vt(t2), jt());
  }
  function se(t2) {
    return t2 = Yt(t2), zt(t2) || (Ot(t2), t2 = Nt(Mt, Pt)), t2;
  }
  function oe(t2) {
    var e2 = Yt(Number(t2));
    return zt(e2) ? String(e2) : (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), ie(t2));
  }
  function ae(t2) {
    var e2 = Yt(Number(t2));
    return zt(e2) ? At(e2) : (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), at() ? At(Ht(64, BigInt(t2))) : At(ie(t2)));
  }
  function ce(t2) {
    if (zt(t2)) t2 = At(se(t2));
    else {
      if (t2 = Yt(t2), zt(t2)) t2 = String(t2);
      else {
        const e2 = String(t2);
        re(e2) ? t2 = e2 : (Ot(t2), t2 = jt());
      }
      t2 = At(t2);
    }
    return t2;
  }
  function he(t2) {
    return null == t2 ? t2 : "bigint" == typeof t2 ? (bt(t2) ? t2 = Number(t2) : (t2 = Ht(64, t2), t2 = bt(t2) ? Number(t2) : String(t2)), t2) : Qt(t2) ? "number" == typeof t2 ? se(t2) : oe(t2) : void 0;
  }
  function ue(t2) {
    if (null == t2) return t2;
    var e2 = typeof t2;
    if ("bigint" === e2) return String(Wt(64, t2));
    if (Qt(t2)) {
      if ("string" === e2) return e2 = Yt(Number(t2)), zt(e2) && e2 >= 0 ? t2 = String(e2) : (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), ne(t2) || (Vt(t2), t2 = Bt(Mt, Pt))), t2;
      if ("number" === e2) return (t2 = Yt(t2)) >= 0 && zt(t2) ? t2 : (function(t3) {
        if (t3 < 0) {
          Ot(t3);
          var e3 = Bt(Mt, Pt);
          return t3 = Number(e3), zt(t3) ? t3 : e3;
        }
        return ne(e3 = String(t3)) ? e3 : (Ot(t3), Dt(Mt, Pt));
      })(t2);
    }
  }
  function le(t2) {
    if ("string" != typeof t2) throw Error();
    return t2;
  }
  function de(t2) {
    if (null != t2 && "string" != typeof t2) throw Error();
    return t2;
  }
  function fe(t2) {
    return null == t2 || "string" == typeof t2 ? t2 : void 0;
  }
  function pe(t2, e2, n2, r2) {
    if (null != t2 && "object" == typeof t2 && t2.W === ut) return t2;
    if (!Array.isArray(t2)) return n2 ? 2 & r2 ? ((t2 = e2[Y]) || (it((t2 = new e2()).u), t2 = e2[Y] = t2), e2 = t2) : e2 = new e2() : e2 = void 0, e2;
    let i2 = n2 = 0 | t2[Q];
    return 0 === i2 && (i2 |= 32 & r2), i2 |= 2 & r2, i2 !== n2 && rt(t2, i2), new e2(t2);
  }
  function ge(t2, e2, n2) {
    if (e2) t: {
      if (!Qt(e2 = t2)) throw X("int64");
      switch (typeof e2) {
        case "string":
          e2 = ae(e2);
          break t;
        case "bigint":
          e2 = At(Ht(64, e2));
          break t;
        default:
          e2 = ce(e2);
      }
    }
    else t2 = typeof (e2 = t2), e2 = null == e2 ? e2 : "bigint" === t2 ? At(Ht(64, e2)) : Qt(e2) ? "string" === t2 ? ae(e2) : ce(e2) : void 0;
    return null == (t2 = e2) ? n2 ? $t : void 0 : t2;
  }
  function me(t2) {
    return t2;
  }
  var ye = {};
  var _e = (function() {
    try {
      return w(new class extends Map {
        constructor() {
          super();
        }
      }()), false;
    } catch {
      return true;
    }
  })();
  var ve = class {
    constructor() {
      this.g = /* @__PURE__ */ new Map();
    }
    get(t2) {
      return this.g.get(t2);
    }
    set(t2, e2) {
      return this.g.set(t2, e2), this.size = this.g.size, this;
    }
    delete(t2) {
      return t2 = this.g.delete(t2), this.size = this.g.size, t2;
    }
    clear() {
      this.g.clear(), this.size = this.g.size;
    }
    has(t2) {
      return this.g.has(t2);
    }
    entries() {
      return this.g.entries();
    }
    keys() {
      return this.g.keys();
    }
    values() {
      return this.g.values();
    }
    forEach(t2, e2) {
      return this.g.forEach(t2, e2);
    }
    [Symbol.iterator]() {
      return this.entries();
    }
  };
  var Ee = _e ? (Object.setPrototypeOf(ve.prototype, Map.prototype), Object.defineProperties(ve.prototype, { size: { value: 0, configurable: true, enumerable: true, writable: true } }), ve) : class extends Map {
    constructor() {
      super();
    }
  };
  function we(t2) {
    return t2;
  }
  function Te(t2) {
    if (2 & t2.M) throw Error("Cannot mutate an immutable Map");
  }
  var Ae = class extends Ee {
    constructor(t2, e2, n2 = we, r2 = we) {
      super();
      let i2 = 0 | t2[Q];
      i2 |= 64, rt(t2, i2), this.M = i2, this.I = e2, this.S = n2, this.X = this.I ? be : r2;
      for (let s2 = 0; s2 < t2.length; s2++) {
        const o2 = t2[s2], a2 = n2(o2[0], false, true);
        let c2 = o2[1];
        e2 ? void 0 === c2 && (c2 = null) : c2 = r2(o2[1], false, true, void 0, void 0, i2), super.set(a2, c2);
      }
    }
    La() {
      var t2 = Ce;
      if (0 !== this.size) return Array.from(super.entries(), ((e2) => (e2[0] = t2(e2[0]), e2[1] = t2(e2[1]), e2)));
    }
    da(t2 = ke) {
      const e2 = [], n2 = super.entries();
      for (var r2; !(r2 = n2.next()).done; ) (r2 = r2.value)[0] = t2(r2[0]), r2[1] = t2(r2[1]), e2.push(r2);
      return e2;
    }
    clear() {
      Te(this), super.clear();
    }
    delete(t2) {
      return Te(this), super.delete(this.S(t2, true, false));
    }
    entries() {
      if (this.I) {
        var t2 = super.keys();
        t2 = new gt(t2, Se, this);
      } else t2 = super.entries();
      return t2;
    }
    values() {
      if (this.I) {
        var t2 = super.keys();
        t2 = new gt(t2, Ae.prototype.get, this);
      } else t2 = super.values();
      return t2;
    }
    forEach(t2, e2) {
      this.I ? super.forEach(((n2, r2, i2) => {
        t2.call(e2, i2.get(r2), r2, i2);
      })) : super.forEach(t2, e2);
    }
    set(t2, e2) {
      return Te(this), null == (t2 = this.S(t2, true, false)) ? this : null == e2 ? (super.delete(t2), this) : super.set(t2, this.X(e2, true, true, this.I, false, this.M));
    }
    Ja(t2) {
      const e2 = this.S(t2[0], false, true);
      t2 = t2[1], t2 = this.I ? void 0 === t2 ? null : t2 : this.X(t2, false, true, void 0, false, this.M), super.set(e2, t2);
    }
    has(t2) {
      return super.has(this.S(t2, false, false));
    }
    get(t2) {
      t2 = this.S(t2, false, false);
      const e2 = super.get(t2);
      if (void 0 !== e2) {
        var n2 = this.I;
        return n2 ? ((n2 = this.X(e2, false, true, n2, this.pa, this.M)) !== e2 && super.set(t2, n2), n2) : e2;
      }
    }
    [Symbol.iterator]() {
      return this.entries();
    }
  };
  function be(t2, e2, n2, r2, i2, s2) {
    return t2 = pe(t2, r2, n2, s2), i2 && (t2 = je(t2)), t2;
  }
  function ke(t2) {
    return t2;
  }
  function Se(t2) {
    return [t2, this.get(t2)];
  }
  var xe;
  var Le;
  var Re;
  var Fe;
  function Ie() {
    return xe || (xe = new Ae(it([]), void 0, void 0, void 0, ye));
  }
  function Me(t2, e2, n2, r2, i2) {
    if (null != t2) {
      if (Array.isArray(t2)) {
        const s2 = 0 | t2[Q];
        return 0 === t2.length && 1 & s2 ? void 0 : i2 && 2 & s2 ? t2 : Pe(t2, e2, n2, void 0 !== r2, i2);
      }
      return e2(t2, r2);
    }
  }
  function Pe(t2, e2, n2, r2, i2) {
    const s2 = r2 || n2 ? 0 | t2[Q] : 0, o2 = r2 ? !!(32 & s2) : void 0;
    let a2 = 0;
    const c2 = (r2 = ct(t2)).length;
    for (let t3 = 0; t3 < c2; t3++) {
      var h2 = r2[t3];
      if (t3 === c2 - 1 && lt(h2)) {
        var u2 = e2, l = n2, d = o2, f = i2;
        let t4;
        for (let e3 in h2) {
          const n3 = Me(h2[e3], u2, l, d, f);
          null != n3 && ((t4 ?? (t4 = {}))[e3] = n3);
        }
        h2 = t4;
      } else h2 = Me(r2[t3], e2, n2, o2, i2);
      r2[t3] = h2, null != h2 && (a2 = t3 + 1);
    }
    return a2 < c2 && (r2.length = a2), n2 && ((t2 = mt(t2)) && (r2[q] = ct(t2)), n2(s2, r2)), r2;
  }
  function Ce(t2) {
    return Me(t2, Oe, void 0, void 0, false);
  }
  function Oe(t2) {
    switch (typeof t2) {
      case "number":
        return Number.isFinite(t2) ? t2 : "" + t2;
      case "bigint":
        return bt(t2) ? Number(t2) : "" + t2;
      case "boolean":
        return t2 ? 1 : 0;
      case "object":
        if (C(t2)) return C(t2) && H(Z), R(t2);
        if (t2.W === ut) return Ue(t2);
        if (t2 instanceof N) {
          const e2 = t2.g;
          return null == e2 ? "" : "string" == typeof e2 ? e2 : t2.g = R(e2);
        }
        return t2 instanceof Ae ? t2.La() : void 0;
    }
    return t2;
  }
  function Ue(t2) {
    var e2 = t2.u;
    t2 = Pe(e2, Oe, void 0, void 0, false);
    var n2 = 0 | e2[Q];
    if ((e2 = t2.length) && !(512 & n2)) {
      var r2 = t2[e2 - 1], i2 = false;
      lt(r2) ? (e2--, i2 = true) : r2 = void 0;
      var s2 = e2 - (n2 = 512 & n2 ? 0 : -1), o2 = (Le ?? me)(s2, n2, t2, r2);
      if (r2 && (t2[e2] = void 0), s2 < o2 && r2) {
        for (var a2 in s2 = true, r2) {
          const c2 = +a2;
          c2 <= o2 ? (t2[i2 = c2 + n2] = r2[a2], e2 = Math.max(i2 + 1, e2), i2 = false, delete r2[a2]) : s2 = false;
        }
        s2 && (r2 = void 0);
      }
      for (s2 = e2 - 1; e2 > 0; s2 = e2 - 1) if (null == (a2 = t2[s2])) e2--, i2 = true;
      else {
        if (!((s2 -= n2) >= o2)) break;
        (r2 ?? (r2 = {}))[s2] = a2, e2--, i2 = true;
      }
      i2 && (t2.length = e2), r2 && t2.push(r2);
    }
    return t2;
  }
  function De(t2, e2, n2) {
    return t2 = Ne(t2, e2[0], e2[1], n2 ? 1 : 2), e2 !== Re && n2 && nt(t2, 8192), t2;
  }
  function Ne(t2, e2, n2, r2) {
    if (null == t2) {
      var i2 = 96;
      n2 ? (t2 = [n2], i2 |= 512) : t2 = [], e2 && (i2 = -16760833 & i2 | (1023 & e2) << 14);
    } else {
      if (!Array.isArray(t2)) throw Error("narr");
      if (8192 & (i2 = 0 | t2[Q]) || !(64 & i2) || 2 & i2 || H(J), 1024 & i2) throw Error("farr");
      if (64 & i2) return t2;
      if (1 === r2 || 2 === r2 || (i2 |= 64), n2 && (i2 |= 512, n2 !== t2[0])) throw Error("mid");
      t: {
        var s2 = (n2 = t2).length;
        if (s2) {
          var o2 = s2 - 1;
          if (lt(r2 = n2[o2])) {
            if ((o2 -= e2 = 512 & (i2 |= 256) ? 0 : -1) >= 1024) throw Error("pvtlmt");
            for (var a2 in r2) (s2 = +a2) < o2 && (n2[s2 + e2] = r2[a2], delete r2[a2]);
            i2 = -16760833 & i2 | (1023 & o2) << 14;
            break t;
          }
        }
        if (e2) {
          if ((a2 = Math.max(e2, s2 - (512 & i2 ? 0 : -1))) > 1024) throw Error("spvt");
          i2 = -16760833 & i2 | (1023 & a2) << 14;
        }
      }
    }
    return rt(t2, i2), t2;
  }
  function Be(t2, e2, n2 = ot) {
    if (null != t2) {
      if (x && t2 instanceof Uint8Array) return e2 ? t2 : new Uint8Array(t2);
      if (Array.isArray(t2)) {
        var r2 = 0 | t2[Q];
        return 2 & r2 ? t2 : (e2 && (e2 = 0 === r2 || !!(32 & r2) && !(64 & r2 || !(16 & r2))), e2 ? (rt(t2, 34 | r2), 4 & r2 && Object.freeze(t2), t2) : Pe(t2, Be, 4 & r2 ? ot : n2, true, true));
      }
      return t2.W === ut ? t2 = 2 & (r2 = 0 | (n2 = t2.u)[Q]) ? t2 : new t2.constructor(Ge(n2, r2, true)) : t2 instanceof Ae && !(2 & t2.M) && (n2 = it(t2.da(Be)), t2 = new Ae(n2, t2.I, t2.S, t2.X)), t2;
    }
  }
  function Ge(t2, e2, n2) {
    const r2 = n2 || 2 & e2 ? ot : st, i2 = !!(32 & e2);
    return t2 = (function(t3, e3, n3) {
      const r3 = ct(t3);
      var i3 = r3.length;
      const s2 = 256 & e3 ? r3[i3 - 1] : void 0;
      for (i3 += s2 ? -1 : 0, e3 = 512 & e3 ? 1 : 0; e3 < i3; e3++) r3[e3] = n3(r3[e3]);
      if (s2) {
        e3 = r3[e3] = {};
        for (const t4 in s2) e3[t4] = n3(s2[t4]);
      }
      return (t3 = mt(t3)) && (r3[q] = ct(t3)), r3;
    })(t2, e2, ((t3) => Be(t3, i2, r2))), nt(t2, 32 | (n2 ? 2 : 0)), t2;
  }
  function je(t2) {
    const e2 = t2.u, n2 = 0 | e2[Q];
    return 2 & n2 ? new t2.constructor(Ge(e2, n2, false)) : t2;
  }
  function Ve(t2, e2) {
    return Xe(t2 = t2.u, 0 | t2[Q], e2);
  }
  function Xe(t2, e2, n2) {
    if (-1 === n2) return null;
    const r2 = n2 + (512 & e2 ? 0 : -1), i2 = t2.length - 1;
    return r2 >= i2 && 256 & e2 ? t2[i2][n2] : r2 <= i2 ? t2[r2] : void 0;
  }
  function He(t2, e2, n2) {
    const r2 = t2.u;
    let i2 = 0 | r2[Q];
    return pt(i2), We(r2, i2, e2, n2), t2;
  }
  function We(t2, e2, n2, r2) {
    const i2 = 512 & e2 ? 0 : -1, s2 = n2 + i2;
    var o2 = t2.length - 1;
    return s2 >= o2 && 256 & e2 ? (t2[o2][n2] = r2, e2) : s2 <= o2 ? (t2[s2] = r2, e2) : (void 0 !== r2 && (n2 >= (o2 = e2 >> 14 & 1023 || 536870912) ? null != r2 && (t2[o2 + i2] = { [n2]: r2 }, rt(t2, e2 |= 256)) : t2[s2] = r2), e2);
  }
  function ze(t2, e2) {
    let n2 = 0 | (t2 = t2.u)[Q];
    const r2 = Xe(t2, n2, e2), i2 = qt(r2);
    return null != i2 && i2 !== r2 && We(t2, n2, e2, i2), i2;
  }
  function Ke(t2) {
    let e2 = 0 | (t2 = t2.u)[Q];
    const n2 = Xe(t2, e2, 1), r2 = dt(n2, true);
    return null != r2 && r2 !== n2 && We(t2, e2, 1, r2), r2;
  }
  function Ye() {
    return void 0 === yt ? 2 : 4;
  }
  function $e(t2, e2, n2, r2, i2) {
    const s2 = t2.u, o2 = 2 & (t2 = 0 | s2[Q]) ? 1 : r2;
    i2 = !!i2;
    let a2 = 0 | (r2 = qe(s2, t2, e2))[Q];
    if (!(4 & a2)) {
      4 & a2 && (r2 = ct(r2), a2 = pn(a2, t2), t2 = We(s2, t2, e2, r2));
      let i3 = 0, o3 = 0;
      for (; i3 < r2.length; i3++) {
        const t3 = n2(r2[i3]);
        null != t3 && (r2[o3++] = t3);
      }
      o3 < i3 && (r2.length = o3), a2 = Je(a2, t2), n2 = -2049 & (20 | a2), a2 = n2 &= -4097, rt(r2, a2), 2 & a2 && Object.freeze(r2);
    }
    return 1 === o2 || 4 === o2 && 32 & a2 ? Ze(a2) || (i2 = a2, a2 |= 2, a2 !== i2 && rt(r2, a2), Object.freeze(r2)) : (2 === o2 && Ze(a2) && (r2 = ct(r2), a2 = pn(a2, t2), a2 = gn(a2, t2, i2), rt(r2, a2), t2 = We(s2, t2, e2, r2)), Ze(a2) || (e2 = a2, a2 = gn(a2, t2, i2), a2 !== e2 && rt(r2, a2))), r2;
  }
  function qe(t2, e2, n2) {
    return t2 = Xe(t2, e2, n2), Array.isArray(t2) ? t2 : ht;
  }
  function Je(t2, e2) {
    return 0 === t2 && (t2 = pn(t2, e2)), 1 | t2;
  }
  function Ze(t2) {
    return !!(2 & t2) && !!(4 & t2) || !!(1024 & t2);
  }
  function Qe(t2) {
    t2 = ct(t2);
    for (let e2 = 0; e2 < t2.length; e2++) {
      const n2 = t2[e2] = ct(t2[e2]);
      Array.isArray(n2[1]) && (n2[1] = it(n2[1]));
    }
    return t2;
  }
  function tn(t2, e2, n2, r2) {
    let i2 = 0 | (t2 = t2.u)[Q];
    pt(i2), We(t2, i2, e2, ("0" === r2 ? 0 === Number(n2) : n2 === r2) ? void 0 : n2);
  }
  function en(t2, e2, n2, r2) {
    pt(e2);
    let i2 = qe(t2, e2, n2);
    const s2 = i2 !== ht;
    if (64 & e2 || !(8192 & e2) || !s2) {
      const o2 = s2 ? 0 | i2[Q] : 0;
      let a2 = o2;
      (!s2 || 2 & a2 || Ze(a2) || 4 & a2 && !(32 & a2)) && (i2 = ct(i2), a2 = pn(a2, e2), e2 = We(t2, e2, n2, i2)), a2 = -13 & Je(a2, e2), a2 = gn(r2 ? -17 & a2 : 16 | a2, e2, true), a2 !== o2 && rt(i2, a2);
    }
    return i2;
  }
  function nn(t2, e2) {
    var n2 = Ts;
    return on(rn(t2 = t2.u), t2, 0 | t2[Q], n2) === e2 ? e2 : -1;
  }
  function rn(t2) {
    if (W) return t2[$] ?? (t2[$] = /* @__PURE__ */ new Map());
    if ($ in t2) return t2[$];
    const e2 = /* @__PURE__ */ new Map();
    return Object.defineProperty(t2, $, { value: e2 }), e2;
  }
  function sn(t2, e2, n2, r2) {
    const i2 = rn(t2), s2 = on(i2, t2, e2, n2);
    return s2 !== r2 && (s2 && (e2 = We(t2, e2, s2)), i2.set(n2, r2)), e2;
  }
  function on(t2, e2, n2, r2) {
    let i2 = t2.get(r2);
    if (null != i2) return i2;
    i2 = 0;
    for (let t3 = 0; t3 < r2.length; t3++) {
      const s2 = r2[t3];
      null != Xe(e2, n2, s2) && (0 !== i2 && (n2 = We(e2, n2, i2)), i2 = s2);
    }
    return t2.set(r2, i2), i2;
  }
  function an(t2, e2, n2) {
    let r2 = 0 | t2[Q];
    const i2 = Xe(t2, r2, n2);
    let s2;
    if (null != i2 && i2.W === ut) return (e2 = je(i2)) !== i2 && We(t2, r2, n2, e2), e2.u;
    if (Array.isArray(i2)) {
      const t3 = 0 | i2[Q];
      s2 = 2 & t3 ? De(Ge(i2, t3, false), e2, true) : 64 & t3 ? i2 : De(s2, e2, true);
    } else s2 = De(void 0, e2, true);
    return s2 !== i2 && We(t2, r2, n2, s2), s2;
  }
  function cn(t2, e2, n2) {
    let r2 = 0 | (t2 = t2.u)[Q];
    const i2 = Xe(t2, r2, n2);
    return (e2 = pe(i2, e2, false, r2)) !== i2 && null != e2 && We(t2, r2, n2, e2), e2;
  }
  function hn(t2, e2, n2) {
    if (null == (e2 = cn(t2, e2, n2))) return e2;
    let r2 = 0 | (t2 = t2.u)[Q];
    if (!(2 & r2)) {
      const i2 = je(e2);
      i2 !== e2 && We(t2, r2, n2, e2 = i2);
    }
    return e2;
  }
  function un(t2, e2, n2, r2, i2, s2, o2) {
    t2 = t2.u;
    var a2 = !!(2 & e2);
    const c2 = a2 ? 1 : i2;
    s2 = !!s2, o2 && (o2 = !a2);
    var h2 = 0 | (i2 = qe(t2, e2, r2))[Q];
    if (!(a2 = !!(4 & h2))) {
      var u2 = i2, l = e2;
      const t3 = !!(2 & (h2 = Je(h2, e2)));
      t3 && (l |= 2);
      let r3 = !t3, s3 = true, o3 = 0, a3 = 0;
      for (; o3 < u2.length; o3++) {
        const e3 = pe(u2[o3], n2, false, l);
        if (e3 instanceof n2) {
          if (!t3) {
            const t4 = !!(2 & (0 | e3.u[Q]));
            r3 && (r3 = !t4), s3 && (s3 = t4);
          }
          u2[a3++] = e3;
        }
      }
      a3 < o3 && (u2.length = a3), h2 |= 4, h2 = s3 ? 16 | h2 : -17 & h2, rt(u2, h2 = r3 ? 8 | h2 : -9 & h2), t3 && Object.freeze(u2);
    }
    if (o2 && !(8 & h2 || !i2.length && (1 === c2 || 4 === c2 && 32 & h2))) {
      for (Ze(h2) && (i2 = ct(i2), h2 = pn(h2, e2), e2 = We(t2, e2, r2, i2)), n2 = i2, o2 = h2, u2 = 0; u2 < n2.length; u2++) (h2 = n2[u2]) !== (l = je(h2)) && (n2[u2] = l);
      o2 |= 8, rt(n2, o2 = n2.length ? -17 & o2 : 16 | o2), h2 = o2;
    }
    return 1 === c2 || 4 === c2 && 32 & h2 ? Ze(h2) || (e2 = h2, (h2 |= !i2.length || 16 & h2 && (!a2 || 32 & h2) ? 2 : 1024) !== e2 && rt(i2, h2), Object.freeze(i2)) : (2 === c2 && Ze(h2) && (rt(i2 = ct(i2), h2 = gn(h2 = pn(h2, e2), e2, s2)), e2 = We(t2, e2, r2, i2)), Ze(h2) || (r2 = h2, (h2 = gn(h2, e2, s2)) !== r2 && rt(i2, h2))), i2;
  }
  function ln(t2, e2, n2) {
    const r2 = 0 | t2.u[Q];
    return un(t2, r2, e2, n2, Ye(), false, !(2 & r2));
  }
  function dn(t2, e2, n2, r2) {
    return null == r2 && (r2 = void 0), He(t2, n2, r2);
  }
  function fn(t2, e2, n2, r2) {
    null == r2 && (r2 = void 0);
    t: {
      let i2 = 0 | (t2 = t2.u)[Q];
      if (pt(i2), null == r2) {
        const r3 = rn(t2);
        if (on(r3, t2, i2, n2) !== e2) break t;
        r3.set(n2, 0);
      } else i2 = sn(t2, i2, n2, e2);
      We(t2, i2, e2, r2);
    }
  }
  function pn(t2, e2) {
    return -1025 & (t2 = 32 | (2 & e2 ? 2 | t2 : -3 & t2));
  }
  function gn(t2, e2, n2) {
    return 32 & e2 && n2 || (t2 &= -33), t2;
  }
  function mn(t2, e2, n2) {
    pt(0 | t2.u[Q]), $e(t2, e2, fe, 2, true).push(le(n2));
  }
  function yn(t2, e2, n2, r2) {
    const i2 = 0 | t2.u[Q];
    pt(i2), t2 = un(t2, i2, n2, e2, 2, true), r2 = null != r2 ? r2 : new n2(), t2.push(r2), t2[Q] = 2 & (0 | r2.u[Q]) ? -9 & t2[Q] : -17 & t2[Q];
  }
  function _n(t2, e2) {
    return te(Ve(t2, e2));
  }
  function vn(t2, e2) {
    return fe(Ve(t2, e2));
  }
  function En(t2, e2) {
    return ze(t2, e2) ?? 0;
  }
  function wn(t2, e2, n2) {
    if (null != n2 && "boolean" != typeof n2) throw t2 = typeof n2, Error(`Expected boolean but got ${"object" != t2 ? t2 : n2 ? Array.isArray(n2) ? "array" : t2 : "null"}: ${n2}`);
    He(t2, e2, n2);
  }
  function Tn(t2, e2, n2) {
    if (null != n2) {
      if ("number" != typeof n2) throw X("int32");
      if (!Kt(n2)) throw X("int32");
      n2 |= 0;
    }
    He(t2, e2, n2);
  }
  function An(t2, e2, n2) {
    if (null != n2 && "number" != typeof n2) throw Error(`Value of float/double field must be a number, found ${typeof n2}: ${n2}`);
    He(t2, e2, n2);
  }
  function bn(t2, e2, n2) {
    {
      const o2 = t2.u;
      let a2 = 0 | o2[Q];
      if (pt(a2), null == n2) We(o2, a2, e2);
      else {
        var r2 = t2 = 0 | n2[Q], i2 = Ze(t2), s2 = i2 || Object.isFrozen(n2);
        for (i2 || (t2 = 0), s2 || (n2 = ct(n2), r2 = 0, t2 = gn(t2 = pn(t2, a2), a2, true), s2 = false), t2 |= 21, i2 = 0; i2 < n2.length; i2++) {
          const e3 = n2[i2], o3 = le(e3);
          Object.is(e3, o3) || (s2 && (n2 = ct(n2), r2 = 0, t2 = gn(t2 = pn(t2, a2), a2, true), s2 = false), n2[i2] = o3);
        }
        t2 !== r2 && (s2 && (n2 = ct(n2), t2 = gn(t2 = pn(t2, a2), a2, true)), rt(n2, t2)), We(o2, a2, e2, n2);
      }
    }
  }
  function kn(t2, e2) {
    return Error(`Invalid wire type: ${t2} (at position ${e2})`);
  }
  function Sn() {
    return Error("Failed to read varint, encoding is invalid.");
  }
  function xn(t2, e2) {
    return Error(`Tried to read past the end of the data ${e2} > ${t2}`);
  }
  function Ln(t2) {
    if ("string" == typeof t2) return { buffer: P(t2), O: false };
    if (Array.isArray(t2)) return { buffer: new Uint8Array(t2), O: false };
    if (t2.constructor === Uint8Array) return { buffer: t2, O: false };
    if (t2.constructor === ArrayBuffer) return { buffer: new Uint8Array(t2), O: false };
    if (t2.constructor === N) return { buffer: D(t2) || new Uint8Array(0), O: true };
    if (t2 instanceof Uint8Array) return { buffer: new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength), O: false };
    throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
  }
  function Rn(t2, e2) {
    let n2, r2 = 0, i2 = 0, s2 = 0;
    const o2 = t2.h;
    let a2 = t2.g;
    do {
      n2 = o2[a2++], r2 |= (127 & n2) << s2, s2 += 7;
    } while (s2 < 32 && 128 & n2);
    for (s2 > 32 && (i2 |= (127 & n2) >> 4), s2 = 3; s2 < 32 && 128 & n2; s2 += 7) n2 = o2[a2++], i2 |= (127 & n2) << s2;
    if (Dn(t2, a2), n2 < 128) return e2(r2 >>> 0, i2 >>> 0);
    throw Sn();
  }
  function Fn(t2) {
    let e2 = 0, n2 = t2.g;
    const r2 = n2 + 10, i2 = t2.h;
    for (; n2 < r2; ) {
      const r3 = i2[n2++];
      if (e2 |= r3, 0 == (128 & r3)) return Dn(t2, n2), !!(127 & e2);
    }
    throw Sn();
  }
  function In(t2) {
    const e2 = t2.h;
    let n2 = t2.g, r2 = e2[n2++], i2 = 127 & r2;
    if (128 & r2 && (r2 = e2[n2++], i2 |= (127 & r2) << 7, 128 & r2 && (r2 = e2[n2++], i2 |= (127 & r2) << 14, 128 & r2 && (r2 = e2[n2++], i2 |= (127 & r2) << 21, 128 & r2 && (r2 = e2[n2++], i2 |= r2 << 28, 128 & r2 && 128 & e2[n2++] && 128 & e2[n2++] && 128 & e2[n2++] && 128 & e2[n2++] && 128 & e2[n2++]))))) throw Sn();
    return Dn(t2, n2), i2;
  }
  function Mn(t2) {
    return In(t2) >>> 0;
  }
  function Pn(t2) {
    var e2 = t2.h;
    const n2 = t2.g, r2 = e2[n2], i2 = e2[n2 + 1], s2 = e2[n2 + 2];
    return e2 = e2[n2 + 3], Dn(t2, t2.g + 4), (r2 << 0 | i2 << 8 | s2 << 16 | e2 << 24) >>> 0;
  }
  function Cn(t2) {
    var e2 = Pn(t2);
    t2 = 2 * (e2 >> 31) + 1;
    const n2 = e2 >>> 23 & 255;
    return e2 &= 8388607, 255 == n2 ? e2 ? NaN : t2 * (1 / 0) : 0 == n2 ? 1401298464324817e-60 * t2 * e2 : t2 * Math.pow(2, n2 - 150) * (e2 + 8388608);
  }
  function On(t2) {
    return In(t2);
  }
  function Un(t2, e2, { aa: n2 = false } = {}) {
    t2.aa = n2, e2 && (e2 = Ln(e2), t2.h = e2.buffer, t2.m = e2.O, t2.j = 0, t2.l = t2.h.length, t2.g = t2.j);
  }
  function Dn(t2, e2) {
    if (t2.g = e2, e2 > t2.l) throw xn(t2.l, e2);
  }
  function Nn(t2, e2) {
    if (e2 < 0) throw Error(`Tried to read a negative byte length: ${e2}`);
    const n2 = t2.g, r2 = n2 + e2;
    if (r2 > t2.l) throw xn(e2, t2.l - n2);
    return t2.g = r2, n2;
  }
  function Bn(t2, e2) {
    if (0 == e2) return U();
    var n2 = Nn(t2, e2);
    return t2.aa && t2.m ? n2 = t2.h.subarray(n2, n2 + e2) : (t2 = t2.h, n2 = n2 === (e2 = n2 + e2) ? new Uint8Array(0) : Ft ? t2.slice(n2, e2) : new Uint8Array(t2.subarray(n2, e2))), 0 == n2.length ? U() : new N(n2, O);
  }
  Ae.prototype.toJSON = void 0;
  var Gn = [];
  function jn(t2) {
    var e2 = t2.g;
    if (e2.g == e2.l) return false;
    t2.l = t2.g.g;
    var n2 = Mn(t2.g);
    if (e2 = n2 >>> 3, !((n2 &= 7) >= 0 && n2 <= 5)) throw kn(n2, t2.l);
    if (e2 < 1) throw Error(`Invalid field number: ${e2} (at position ${t2.l})`);
    return t2.m = e2, t2.h = n2, true;
  }
  function Vn(t2) {
    switch (t2.h) {
      case 0:
        0 != t2.h ? Vn(t2) : Fn(t2.g);
        break;
      case 1:
        Dn(t2 = t2.g, t2.g + 8);
        break;
      case 2:
        if (2 != t2.h) Vn(t2);
        else {
          var e2 = Mn(t2.g);
          Dn(t2 = t2.g, t2.g + e2);
        }
        break;
      case 5:
        Dn(t2 = t2.g, t2.g + 4);
        break;
      case 3:
        for (e2 = t2.m; ; ) {
          if (!jn(t2)) throw Error("Unmatched start-group tag: stream EOF");
          if (4 == t2.h) {
            if (t2.m != e2) throw Error("Unmatched end-group tag");
            break;
          }
          Vn(t2);
        }
        break;
      default:
        throw kn(t2.h, t2.l);
    }
  }
  function Xn(t2, e2, n2) {
    const r2 = t2.g.l, i2 = Mn(t2.g), s2 = t2.g.g + i2;
    let o2 = s2 - r2;
    if (o2 <= 0 && (t2.g.l = s2, n2(e2, t2, void 0, void 0, void 0), o2 = s2 - t2.g.g), o2) throw Error(`Message parsing ended unexpectedly. Expected to read ${i2} bytes, instead read ${i2 - o2} bytes, either the data ended unexpectedly or the message misreported its own length`);
    return t2.g.g = s2, t2.g.l = r2, e2;
  }
  function Hn(t2) {
    var o2 = Mn(t2.g), a2 = Nn(t2 = t2.g, o2);
    if (t2 = t2.h, s) {
      var c2, h2 = t2;
      (c2 = i) || (c2 = i = new TextDecoder("utf-8", { fatal: true })), o2 = a2 + o2, h2 = 0 === a2 && o2 === h2.length ? h2 : h2.subarray(a2, o2);
      try {
        var u2 = c2.decode(h2);
      } catch (t3) {
        if (void 0 === r) {
          try {
            c2.decode(new Uint8Array([128]));
          } catch (t4) {
          }
          try {
            c2.decode(new Uint8Array([97])), r = true;
          } catch (t4) {
            r = false;
          }
        }
        throw !r && (i = void 0), t3;
      }
    } else {
      o2 = (u2 = a2) + o2, a2 = [];
      let r2, i2 = null;
      for (; u2 < o2; ) {
        var l = t2[u2++];
        l < 128 ? a2.push(l) : l < 224 ? u2 >= o2 ? e() : (r2 = t2[u2++], l < 194 || 128 != (192 & r2) ? (u2--, e()) : a2.push((31 & l) << 6 | 63 & r2)) : l < 240 ? u2 >= o2 - 1 ? e() : (r2 = t2[u2++], 128 != (192 & r2) || 224 === l && r2 < 160 || 237 === l && r2 >= 160 || 128 != (192 & (c2 = t2[u2++])) ? (u2--, e()) : a2.push((15 & l) << 12 | (63 & r2) << 6 | 63 & c2)) : l <= 244 ? u2 >= o2 - 2 ? e() : (r2 = t2[u2++], 128 != (192 & r2) || r2 - 144 + (l << 28) >> 30 != 0 || 128 != (192 & (c2 = t2[u2++])) || 128 != (192 & (h2 = t2[u2++])) ? (u2--, e()) : (l = (7 & l) << 18 | (63 & r2) << 12 | (63 & c2) << 6 | 63 & h2, l -= 65536, a2.push(55296 + (l >> 10 & 1023), 56320 + (1023 & l)))) : e(), a2.length >= 8192 && (i2 = n(i2, a2), a2.length = 0);
      }
      u2 = n(i2, a2);
    }
    return u2;
  }
  function Wn(t2) {
    const e2 = Mn(t2.g);
    return Bn(t2.g, e2);
  }
  function zn(t2, e2, n2) {
    var r2 = Mn(t2.g);
    for (r2 = t2.g.g + r2; t2.g.g < r2; ) n2.push(e2(t2.g));
  }
  var Kn = [];
  function Yn(t2, e2, n2) {
    e2.g ? e2.m(t2, e2.g, e2.h, n2) : e2.m(t2, e2.h, n2);
  }
  var $n = class {
    constructor(t2, e2) {
      this.u = Ne(t2, e2);
    }
    toJSON() {
      try {
        var t2 = Ue(this);
      } finally {
        Le = void 0;
      }
      return t2;
    }
    l() {
      var t2 = _o;
      return t2.g ? t2.l(this, t2.g, t2.h) : t2.l(this, t2.h, t2.defaultValue);
    }
    clone() {
      const t2 = this.u;
      return new this.constructor(Ge(t2, 0 | t2[Q], false));
    }
    O() {
      return !!(2 & (0 | this.u[Q]));
    }
  };
  function qn(t2) {
    return t2 ? /^\d+$/.test(t2) ? (Vt(t2), new Jn(Mt, Pt)) : null : Zn || (Zn = new Jn(0, 0));
  }
  $n.prototype.W = ut, $n.prototype.toString = function() {
    return this.u.toString();
  };
  var Jn = class {
    constructor(t2, e2) {
      this.h = t2 >>> 0, this.g = e2 >>> 0;
    }
  };
  var Zn;
  function Qn(t2) {
    return t2 ? /^-?\d+$/.test(t2) ? (Vt(t2), new tr(Mt, Pt)) : null : er || (er = new tr(0, 0));
  }
  var tr = class {
    constructor(t2, e2) {
      this.h = t2 >>> 0, this.g = e2 >>> 0;
    }
  };
  var er;
  function nr(t2, e2, n2) {
    for (; n2 > 0 || e2 > 127; ) t2.g.push(127 & e2 | 128), e2 = (e2 >>> 7 | n2 << 25) >>> 0, n2 >>>= 7;
    t2.g.push(e2);
  }
  function rr(t2, e2) {
    for (; e2 > 127; ) t2.g.push(127 & e2 | 128), e2 >>>= 7;
    t2.g.push(e2);
  }
  function ir(t2, e2) {
    if (e2 >= 0) rr(t2, e2);
    else {
      for (let n2 = 0; n2 < 9; n2++) t2.g.push(127 & e2 | 128), e2 >>= 7;
      t2.g.push(1);
    }
  }
  function sr(t2, e2) {
    t2.g.push(e2 >>> 0 & 255), t2.g.push(e2 >>> 8 & 255), t2.g.push(e2 >>> 16 & 255), t2.g.push(e2 >>> 24 & 255);
  }
  function or(t2, e2) {
    0 !== e2.length && (t2.l.push(e2), t2.h += e2.length);
  }
  function ar(t2, e2, n2) {
    rr(t2.g, 8 * e2 + n2);
  }
  function cr(t2, e2) {
    return ar(t2, e2, 2), e2 = t2.g.end(), or(t2, e2), e2.push(t2.h), e2;
  }
  function hr(t2, e2) {
    var n2 = e2.pop();
    for (n2 = t2.h + t2.g.length() - n2; n2 > 127; ) e2.push(127 & n2 | 128), n2 >>>= 7, t2.h++;
    e2.push(n2), t2.h++;
  }
  function ur(t2, e2, n2) {
    ar(t2, e2, 2), rr(t2.g, n2.length), or(t2, t2.g.end()), or(t2, n2);
  }
  function lr(t2, e2, n2, r2) {
    null != n2 && (e2 = cr(t2, e2), r2(n2, t2), hr(t2, e2));
  }
  function dr() {
    const t2 = class {
      constructor() {
        throw Error();
      }
    };
    return Object.setPrototypeOf(t2, t2.prototype), t2;
  }
  var fr = dr();
  var pr = dr();
  var gr = dr();
  var mr = dr();
  var yr = dr();
  var _r = dr();
  var vr = dr();
  var Er = dr();
  var wr = dr();
  var Tr = class {
    constructor(t2, e2, n2) {
      this.g = t2, this.h = e2, t2 = fr, this.l = !!t2 && n2 === t2 || false;
    }
  };
  function Ar(t2, e2) {
    return new Tr(t2, e2, fr);
  }
  function br(t2, e2, n2, r2, i2) {
    lr(t2, n2, Or(e2, r2), i2);
  }
  var kr = Ar((function(t2, e2, n2, r2, i2) {
    return 2 === t2.h && (Xn(t2, an(e2, r2, n2), i2), true);
  }), br);
  var Sr = Ar((function(t2, e2, n2, r2, i2) {
    return 2 === t2.h && (Xn(t2, an(e2, r2, n2), i2), true);
  }), br);
  var xr = Symbol();
  var Lr = Symbol();
  var Rr = Symbol();
  var Fr = Symbol();
  var Ir;
  var Mr;
  function Pr(t2, e2, n2, r2) {
    var i2 = r2[t2];
    if (i2) return i2;
    (i2 = {}).Ma = r2, i2.T = (function(t3) {
      switch (typeof t3) {
        case "boolean":
          return Re || (Re = [0, void 0, true]);
        case "number":
          return t3 > 0 ? void 0 : 0 === t3 ? Fe || (Fe = [0, void 0]) : [-t3, void 0];
        case "string":
          return [0, t3];
        case "object":
          return t3;
      }
    })(r2[0]);
    var s2 = r2[1];
    let o2 = 1;
    s2 && s2.constructor === Object && (i2.ga = s2, "function" == typeof (s2 = r2[++o2]) && (i2.la = true, Ir ?? (Ir = s2), Mr ?? (Mr = r2[o2 + 1]), s2 = r2[o2 += 2]));
    const a2 = {};
    for (; s2 && Array.isArray(s2) && s2.length && "number" == typeof s2[0] && s2[0] > 0; ) {
      for (var c2 = 0; c2 < s2.length; c2++) a2[s2[c2]] = s2;
      s2 = r2[++o2];
    }
    for (c2 = 1; void 0 !== s2; ) {
      let t3;
      "number" == typeof s2 && (c2 += s2, s2 = r2[++o2]);
      var h2 = void 0;
      if (s2 instanceof Tr ? t3 = s2 : (t3 = kr, o2--), t3?.l) {
        s2 = r2[++o2], h2 = r2;
        var u2 = o2;
        "function" == typeof s2 && (s2 = s2(), h2[u2] = s2), h2 = s2;
      }
      for (u2 = c2 + 1, "number" == typeof (s2 = r2[++o2]) && s2 < 0 && (u2 -= s2, s2 = r2[++o2]); c2 < u2; c2++) {
        const r3 = a2[c2];
        h2 ? n2(i2, c2, t3, h2, r3) : e2(i2, c2, t3, r3);
      }
    }
    return r2[t2] = i2;
  }
  function Cr(t2) {
    return Array.isArray(t2) ? t2[0] instanceof Tr ? t2 : [Sr, t2] : [t2, void 0];
  }
  function Or(t2, e2) {
    return t2 instanceof $n ? t2.u : Array.isArray(t2) ? De(t2, e2, false) : void 0;
  }
  function Ur(t2, e2, n2, r2) {
    const i2 = n2.g;
    t2[e2] = r2 ? (t3, e3, n3) => i2(t3, e3, n3, r2) : i2;
  }
  function Dr(t2, e2, n2, r2, i2) {
    const s2 = n2.g;
    let o2, a2;
    t2[e2] = (t3, e3, n3) => s2(t3, e3, n3, a2 || (a2 = Pr(Lr, Ur, Dr, r2).T), o2 || (o2 = Nr(r2)), i2);
  }
  function Nr(t2) {
    let e2 = t2[Rr];
    if (null != e2) return e2;
    const n2 = Pr(Lr, Ur, Dr, t2);
    return e2 = n2.la ? (t3, e3) => Ir(t3, e3, n2) : (t3, e3) => {
      const r2 = 0 | t3[Q];
      for (; jn(e3) && 4 != e3.h; ) {
        var i2 = e3.m, s2 = n2[i2];
        if (null == s2) {
          var o2 = n2.ga;
          o2 && (o2 = o2[i2]) && (null != (o2 = Br(o2)) && (s2 = n2[i2] = o2));
        }
        null != s2 && s2(e3, t3, i2) || (i2 = (s2 = e3).l, Vn(s2), s2.fa ? s2 = void 0 : (o2 = s2.g.g - i2, s2.g.g = i2, s2 = Bn(s2.g, o2)), i2 = t3, s2 && ((o2 = i2[q]) ? o2.push(s2) : i2[q] = [s2]));
      }
      return 8192 & r2 && it(t3), true;
    }, t2[Rr] = e2;
  }
  function Br(t2) {
    const e2 = (t2 = Cr(t2))[0].g;
    if (t2 = t2[1]) {
      const n2 = Nr(t2), r2 = Pr(Lr, Ur, Dr, t2).T;
      return (t3, i2, s2) => e2(t3, i2, s2, r2, n2);
    }
    return e2;
  }
  function Gr(t2, e2, n2) {
    t2[e2] = n2.h;
  }
  function jr(t2, e2, n2, r2) {
    let i2, s2;
    const o2 = n2.h;
    t2[e2] = (t3, e3, n3) => o2(t3, e3, n3, s2 || (s2 = Pr(xr, Gr, jr, r2).T), i2 || (i2 = Vr(r2)));
  }
  function Vr(t2) {
    let e2 = t2[Fr];
    if (!e2) {
      const n2 = Pr(xr, Gr, jr, t2);
      e2 = (t3, e3) => Xr(t3, e3, n2), t2[Fr] = e2;
    }
    return e2;
  }
  function Xr(t2, e2, n2) {
    !(function(t3, e3, n3) {
      const r2 = 512 & e3 ? 0 : -1, i2 = t3.length, s2 = i2 + ((e3 = 64 & e3 ? 256 & e3 : !!i2 && lt(t3[i2 - 1])) ? -1 : 0);
      for (let e4 = 0; e4 < s2; e4++) n3(e4 - r2, t3[e4]);
      if (e3) {
        t3 = t3[i2 - 1];
        for (const e4 in t3) !isNaN(e4) && n3(+e4, t3[e4]);
      }
    })(t2, 0 | t2[Q] | (n2.T[1] ? 512 : 0), ((t3, r2) => {
      if (null != r2) {
        var i2 = (function(t4, e3) {
          var n3 = t4[e3];
          if (n3) return n3;
          if ((n3 = t4.ga) && (n3 = n3[e3])) {
            var r3 = (n3 = Cr(n3))[0].h;
            if (n3 = n3[1]) {
              const e4 = Vr(n3), i3 = Pr(xr, Gr, jr, n3).T;
              n3 = t4.la ? Mr(i3, e4) : (t5, n4, s2) => r3(t5, n4, s2, i3, e4);
            } else n3 = r3;
            return t4[e3] = n3;
          }
        })(n2, t3);
        i2 && i2(e2, r2, t3);
      }
    })), (t2 = mt(t2)) && (function(t3, e3) {
      or(t3, t3.g.end());
      for (let n3 = 0; n3 < e3.length; n3++) or(t3, D(e3[n3]) || new Uint8Array(0));
    })(e2, t2);
  }
  function Hr(t2, e2) {
    if (Array.isArray(e2)) {
      var n2 = 0 | e2[Q];
      if (4 & n2) return e2;
      for (var r2 = 0, i2 = 0; r2 < e2.length; r2++) {
        const n3 = t2(e2[r2]);
        null != n3 && (e2[i2++] = n3);
      }
      return i2 < r2 && (e2.length = i2), rt(e2, -6145 & (5 | n2)), 2 & n2 && Object.freeze(e2), e2;
    }
  }
  function Wr(t2, e2, n2) {
    return new Tr(t2, e2, n2);
  }
  function zr(t2, e2, n2) {
    return new Tr(t2, e2, n2);
  }
  function Kr(t2, e2, n2) {
    We(t2, 0 | t2[Q], e2, n2);
  }
  var Yr = Ar((function(t2, e2, n2, r2, i2) {
    return 2 === t2.h && (t2 = Xn(t2, De([void 0, void 0], r2, true), i2), pt(r2 = 0 | e2[Q]), (i2 = Xe(e2, r2, n2)) instanceof Ae ? 0 != (2 & i2.M) ? ((i2 = i2.da()).push(t2), We(e2, r2, n2, i2)) : i2.Ja(t2) : Array.isArray(i2) ? (2 & (0 | i2[Q]) && We(e2, r2, n2, i2 = Qe(i2)), i2.push(t2)) : We(e2, r2, n2, [t2]), true);
  }), (function(t2, e2, n2, r2, i2) {
    if (e2 instanceof Ae) e2.forEach(((e3, s2) => {
      lr(t2, n2, De([s2, e3], r2, false), i2);
    }));
    else if (Array.isArray(e2)) for (let s2 = 0; s2 < e2.length; s2++) {
      const o2 = e2[s2];
      Array.isArray(o2) && lr(t2, n2, De(o2, r2, false), i2);
    }
  }));
  function $r(t2, e2, n2) {
    if (e2 = (function(t3) {
      if (null == t3) return t3;
      const e3 = typeof t3;
      if ("bigint" === e3) return String(Ht(64, t3));
      if (Qt(t3)) {
        if ("string" === e3) return oe(t3);
        if ("number" === e3) return se(t3);
      }
    })(e2), null != e2) {
      if ("string" == typeof e2) Qn(e2);
      if (null != e2) switch (ar(t2, n2, 0), typeof e2) {
        case "number":
          t2 = t2.g, Ot(e2), nr(t2, Mt, Pt);
          break;
        case "bigint":
          n2 = BigInt.asUintN(64, e2), n2 = new tr(Number(n2 & BigInt(4294967295)), Number(n2 >> BigInt(32))), nr(t2.g, n2.h, n2.g);
          break;
        default:
          n2 = Qn(e2), nr(t2.g, n2.h, n2.g);
      }
    }
  }
  function qr(t2, e2, n2) {
    null != (e2 = te(e2)) && null != e2 && (ar(t2, n2, 0), ir(t2.g, e2));
  }
  function Jr(t2, e2, n2) {
    null != (e2 = Jt(e2)) && (ar(t2, n2, 0), t2.g.g.push(e2 ? 1 : 0));
  }
  function Zr(t2, e2, n2) {
    null != (e2 = fe(e2)) && ur(t2, n2, c(e2));
  }
  function Qr(t2, e2, n2, r2, i2) {
    lr(t2, n2, Or(e2, r2), i2);
  }
  function ti(t2, e2, n2) {
    null == e2 || "string" == typeof e2 || e2 instanceof N || (C(e2) ? C(e2) && H(Z) : e2 = void 0), null != e2 && ur(t2, n2, Ln(e2).buffer);
  }
  function ei(t2, e2, n2) {
    return (5 === t2.h || 2 === t2.h) && (e2 = en(e2, 0 | e2[Q], n2, false), 2 == t2.h ? zn(t2, Cn, e2) : e2.push(Cn(t2.g)), true);
  }
  var ni = Wr((function(t2, e2, n2) {
    if (1 !== t2.h) return false;
    var r2 = t2.g;
    t2 = Pn(r2);
    const i2 = Pn(r2);
    r2 = 2 * (i2 >> 31) + 1;
    const s2 = i2 >>> 20 & 2047;
    return t2 = 4294967296 * (1048575 & i2) + t2, Kr(e2, n2, 2047 == s2 ? t2 ? NaN : r2 * (1 / 0) : 0 == s2 ? 5e-324 * r2 * t2 : r2 * Math.pow(2, s2 - 1075) * (t2 + 4503599627370496)), true;
  }), (function(t2, e2, n2) {
    null != (e2 = qt(e2)) && (ar(t2, n2, 1), t2 = t2.g, (n2 = It || (It = new DataView(new ArrayBuffer(8)))).setFloat64(0, +e2, true), Mt = n2.getUint32(0, true), Pt = n2.getUint32(4, true), sr(t2, Mt), sr(t2, Pt));
  }), dr());
  var ri = Wr((function(t2, e2, n2) {
    return 5 === t2.h && (Kr(e2, n2, Cn(t2.g)), true);
  }), (function(t2, e2, n2) {
    null != (e2 = qt(e2)) && (ar(t2, n2, 5), t2 = t2.g, Ut(e2), sr(t2, Mt));
  }), vr);
  var ii = zr(ei, (function(t2, e2, n2) {
    if (null != (e2 = Hr(qt, e2))) for (let o2 = 0; o2 < e2.length; o2++) {
      var r2 = t2, i2 = n2, s2 = e2[o2];
      null != s2 && (ar(r2, i2, 5), r2 = r2.g, Ut(s2), sr(r2, Mt));
    }
  }), vr);
  var si = zr(ei, (function(t2, e2, n2) {
    if (null != (e2 = Hr(qt, e2)) && e2.length) {
      ar(t2, n2, 2), rr(t2.g, 4 * e2.length);
      for (let r2 = 0; r2 < e2.length; r2++) n2 = t2.g, Ut(e2[r2]), sr(n2, Mt);
    }
  }), vr);
  var oi = Wr((function(t2, e2, n2) {
    return 0 === t2.h && (Kr(e2, n2, Rn(t2.g, Nt)), true);
  }), $r, _r);
  var ai = Wr((function(t2, e2, n2) {
    return 0 === t2.h && (Kr(e2, n2, 0 === (t2 = Rn(t2.g, Nt)) ? void 0 : t2), true);
  }), $r, _r);
  var ci = Wr((function(t2, e2, n2) {
    return 0 === t2.h && (Kr(e2, n2, Rn(t2.g, Dt)), true);
  }), (function(t2, e2, n2) {
    if (null != (e2 = ue(e2))) {
      if ("string" == typeof e2) qn(e2);
      if (null != e2) switch (ar(t2, n2, 0), typeof e2) {
        case "number":
          t2 = t2.g, Ot(e2), nr(t2, Mt, Pt);
          break;
        case "bigint":
          n2 = BigInt.asUintN(64, e2), n2 = new Jn(Number(n2 & BigInt(4294967295)), Number(n2 >> BigInt(32))), nr(t2.g, n2.h, n2.g);
          break;
        default:
          n2 = qn(e2), nr(t2.g, n2.h, n2.g);
      }
    }
  }), dr());
  var hi = Wr((function(t2, e2, n2) {
    return 0 === t2.h && (Kr(e2, n2, In(t2.g)), true);
  }), qr, mr);
  var ui = zr((function(t2, e2, n2) {
    return (0 === t2.h || 2 === t2.h) && (e2 = en(e2, 0 | e2[Q], n2, false), 2 == t2.h ? zn(t2, In, e2) : e2.push(In(t2.g)), true);
  }), (function(t2, e2, n2) {
    if (null != (e2 = Hr(te, e2)) && e2.length) {
      n2 = cr(t2, n2);
      for (let n3 = 0; n3 < e2.length; n3++) ir(t2.g, e2[n3]);
      hr(t2, n2);
    }
  }), mr);
  var li = Wr((function(t2, e2, n2) {
    return 0 === t2.h && (Kr(e2, n2, 0 === (t2 = In(t2.g)) ? void 0 : t2), true);
  }), qr, mr);
  var di = Wr((function(t2, e2, n2) {
    return 0 === t2.h && (Kr(e2, n2, Fn(t2.g)), true);
  }), Jr, pr);
  var fi = Wr((function(t2, e2, n2) {
    return 0 === t2.h && (Kr(e2, n2, false === (t2 = Fn(t2.g)) ? void 0 : t2), true);
  }), Jr, pr);
  var pi = zr((function(t2, e2, n2) {
    return 2 === t2.h && (t2 = Hn(t2), en(e2, 0 | e2[Q], n2, false).push(t2), true);
  }), (function(t2, e2, n2) {
    if (null != (e2 = Hr(fe, e2))) for (let o2 = 0; o2 < e2.length; o2++) {
      var r2 = t2, i2 = n2, s2 = e2[o2];
      null != s2 && ur(r2, i2, c(s2));
    }
  }), gr);
  var gi = Wr((function(t2, e2, n2) {
    return 2 === t2.h && (Kr(e2, n2, "" === (t2 = Hn(t2)) ? void 0 : t2), true);
  }), Zr, gr);
  var mi = Wr((function(t2, e2, n2) {
    return 2 === t2.h && (Kr(e2, n2, Hn(t2)), true);
  }), Zr, gr);
  var yi = (function(t2, e2, n2 = fr) {
    return new Tr(t2, e2, n2);
  })((function(t2, e2, n2, r2, i2) {
    return 2 === t2.h && (r2 = De(void 0, r2, true), en(e2, 0 | e2[Q], n2, true).push(r2), Xn(t2, r2, i2), true);
  }), (function(t2, e2, n2, r2, i2) {
    if (Array.isArray(e2)) for (let s2 = 0; s2 < e2.length; s2++) Qr(t2, e2[s2], n2, r2, i2);
  }));
  var _i = Ar((function(t2, e2, n2, r2, i2, s2) {
    return 2 === t2.h && (sn(e2, 0 | e2[Q], s2, n2), Xn(t2, e2 = an(e2, r2, n2), i2), true);
  }), Qr);
  var vi = Wr((function(t2, e2, n2) {
    return 2 === t2.h && (Kr(e2, n2, Wn(t2)), true);
  }), ti, Er);
  var Ei = zr((function(t2, e2, n2) {
    return (0 === t2.h || 2 === t2.h) && (e2 = en(e2, 0 | e2[Q], n2, false), 2 == t2.h ? zn(t2, Mn, e2) : e2.push(Mn(t2.g)), true);
  }), (function(t2, e2, n2) {
    if (null != (e2 = Hr(ee, e2))) for (let o2 = 0; o2 < e2.length; o2++) {
      var r2 = t2, i2 = n2, s2 = e2[o2];
      null != s2 && (ar(r2, i2, 0), rr(r2.g, s2));
    }
  }), yr);
  var wi = Wr((function(t2, e2, n2) {
    return 0 === t2.h && (Kr(e2, n2, 0 === (t2 = Mn(t2.g)) ? void 0 : t2), true);
  }), (function(t2, e2, n2) {
    null != (e2 = ee(e2)) && null != e2 && (ar(t2, n2, 0), rr(t2.g, e2));
  }), yr);
  var Ti = Wr((function(t2, e2, n2) {
    return 0 === t2.h && (Kr(e2, n2, In(t2.g)), true);
  }), (function(t2, e2, n2) {
    null != (e2 = te(e2)) && (e2 = parseInt(e2, 10), ar(t2, n2, 0), ir(t2.g, e2));
  }), wr);
  var Ai = class {
    constructor(t2, e2) {
      this.h = t2, this.g = e2, this.l = hn, this.m = dn, this.defaultValue = void 0;
    }
    register() {
      w(this);
    }
  };
  function bi(t2, e2) {
    return new Ai(t2, e2);
  }
  function ki(t2, e2) {
    return (n2, r2) => {
      if (Kn.length) {
        const t3 = Kn.pop();
        t3.o(r2), Un(t3.g, n2, r2), n2 = t3;
      } else n2 = new class {
        constructor(t3, e3) {
          if (Gn.length) {
            const n3 = Gn.pop();
            Un(n3, t3, e3), t3 = n3;
          } else t3 = new class {
            constructor(t4, e4) {
              this.h = null, this.m = false, this.g = this.l = this.j = 0, Un(this, t4, e4);
            }
            clear() {
              this.h = null, this.m = false, this.g = this.l = this.j = 0, this.aa = false;
            }
          }(t3, e3);
          this.g = t3, this.l = this.g.g, this.h = this.m = -1, this.o(e3);
        }
        o({ fa: t3 = false } = {}) {
          this.fa = t3;
        }
      }(n2, r2);
      try {
        const r3 = new t2(), s2 = r3.u;
        Nr(e2)(s2, n2);
        var i2 = r3;
      } finally {
        n2.g.clear(), n2.m = -1, n2.h = -1, Kn.length < 100 && Kn.push(n2);
      }
      return i2;
    };
  }
  function Si(t2) {
    return function() {
      const e2 = new class {
        constructor() {
          this.l = [], this.h = 0, this.g = new class {
            constructor() {
              this.g = [];
            }
            length() {
              return this.g.length;
            }
            end() {
              const t3 = this.g;
              return this.g = [], t3;
            }
          }();
        }
      }();
      Xr(this.u, e2, Pr(xr, Gr, jr, t2)), or(e2, e2.g.end());
      const n2 = new Uint8Array(e2.h), r2 = e2.l, i2 = r2.length;
      let s2 = 0;
      for (let t3 = 0; t3 < i2; t3++) {
        const e3 = r2[t3];
        n2.set(e3, s2), s2 += e3.length;
      }
      return e2.l = [n2], n2;
    };
  }
  var xi = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Li = [0, gi, Wr((function(t2, e2, n2) {
    return 2 === t2.h && (Kr(e2, n2, (t2 = Wn(t2)) === U() ? void 0 : t2), true);
  }), (function(t2, e2, n2) {
    if (null != e2) {
      if (e2 instanceof $n) {
        const r2 = e2.Oa;
        return void (r2 && (e2 = r2(e2), null != e2 && ur(t2, n2, Ln(e2).buffer)));
      }
      if (Array.isArray(e2)) return;
    }
    ti(t2, e2, n2);
  }), Er)];
  var Ri;
  var Fi = globalThis.trustedTypes;
  function Ii(t2) {
    void 0 === Ri && (Ri = (function() {
      let t3 = null;
      if (!Fi) return t3;
      try {
        const e3 = (t4) => t4;
        t3 = Fi.createPolicy("goog#html", { createHTML: e3, createScript: e3, createScriptURL: e3 });
      } catch (t4) {
      }
      return t3;
    })());
    var e2 = Ri;
    return new class {
      constructor(t3) {
        this.g = t3;
      }
      toString() {
        return this.g + "";
      }
    }(e2 ? e2.createScriptURL(t2) : t2);
  }
  function Mi(t2, ...e2) {
    if (0 === e2.length) return Ii(t2[0]);
    let n2 = t2[0];
    for (let r2 = 0; r2 < e2.length; r2++) n2 += encodeURIComponent(e2[r2]) + t2[r2 + 1];
    return Ii(n2);
  }
  var Pi = [0, hi, Ti, di, -1, ui, Ti, -1];
  var Ci = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Oi = [0, di, mi, di, Ti, -1, zr((function(t2, e2, n2) {
    return (0 === t2.h || 2 === t2.h) && (e2 = en(e2, 0 | e2[Q], n2, false), 2 == t2.h ? zn(t2, On, e2) : e2.push(In(t2.g)), true);
  }), (function(t2, e2, n2) {
    if (null != (e2 = Hr(te, e2)) && e2.length) {
      n2 = cr(t2, n2);
      for (let n3 = 0; n3 < e2.length; n3++) ir(t2.g, e2[n3]);
      hr(t2, n2);
    }
  }), wr), mi, -1, [0, di, -1], Ti, di, -1];
  var Ui = [0, mi, -2];
  var Di = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Ni = [0];
  var Bi = [0, hi, di, 1, di, -3];
  var Gi = class extends $n {
    constructor(t2) {
      super(t2, 2);
    }
  };
  var ji = {};
  ji[336783863] = [0, mi, di, -1, hi, [0, [1, 2, 3, 4, 5, 6, 7, 8, 9], _i, Ni, _i, Oi, _i, Ui, _i, Bi, _i, Pi, _i, [0, mi, -2], _i, [0, mi, Ti], _i, [0, Ti, mi, -1], _i, [0, Ti, -1]], [0, mi], di, [0, [1, 3], [2, 4], _i, [0, ui], -1, _i, [0, pi], -1, yi, [0, mi, -1]], mi];
  var Vi = [0, ai, -1, fi, -3, ai, ui, gi, li, ai, -1, fi, li, fi, -2, gi];
  function Xi(t2, e2) {
    tn(t2, 2, de(e2), "");
  }
  function Hi(t2, e2) {
    mn(t2, 3, e2);
  }
  function Wi(t2, e2) {
    mn(t2, 4, e2);
  }
  var zi = class extends $n {
    constructor(t2) {
      super(t2, 500);
    }
    o(t2) {
      return dn(this, 0, 7, t2);
    }
  };
  var Ki = [-1, {}];
  var Yi = [0, mi, 1, Ki];
  var $i = [0, mi, pi, Ki];
  function qi(t2, e2) {
    yn(t2, 1, zi, e2);
  }
  function Ji(t2, e2) {
    mn(t2, 10, e2);
  }
  function Zi(t2, e2) {
    mn(t2, 15, e2);
  }
  var Qi = class extends $n {
    constructor(t2) {
      super(t2, 500);
    }
    o(t2) {
      return dn(this, 0, 1001, t2);
    }
  };
  var ts = [-500, yi, [-500, gi, -1, pi, -3, [-2, ji, di], yi, Li, li, -1, Yi, $i, yi, [0, gi, fi], gi, Vi, li, pi, 987, pi], 4, yi, [-500, mi, -1, [-1, {}], 998, mi], yi, [-500, mi, pi, -1, [-2, {}, di], 997, pi, -1], li, yi, [-500, mi, pi, Ki, 998, pi], pi, li, Yi, $i, yi, [0, gi, -1, Ki], pi, -2, Vi, gi, -1, fi, [0, fi, wi], 978, Ki, yi, Li];
  Qi.prototype.g = Si(ts);
  var es = ki(Qi, ts);
  var ns = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var rs = class extends $n {
    constructor(t2) {
      super(t2);
    }
    g() {
      return ln(this, ns, 1);
    }
  };
  var is = [0, yi, [0, hi, ri, mi, -1]];
  var ss = ki(rs, is);
  var os = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var as = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var cs = class extends $n {
    constructor(t2) {
      super(t2);
    }
    h() {
      return hn(this, os, 2);
    }
    g() {
      return ln(this, as, 5);
    }
  };
  var hs = ki(class extends $n {
    constructor(t2) {
      super(t2);
    }
  }, [0, pi, ui, si, [0, Ti, [0, hi, -3], [0, ri, -3], [0, hi, -1, [0, yi, [0, hi, -2]]], yi, [0, ri, -1, mi, ri]], mi, -1, oi, yi, [0, hi, ri], pi, oi]);
  var us = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var ls = ki(class extends $n {
    constructor(t2) {
      super(t2);
    }
  }, [0, yi, [0, ri, -4]]);
  var ds = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var fs = ki(class extends $n {
    constructor(t2) {
      super(t2);
    }
  }, [0, yi, [0, ri, -4]]);
  var ps = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var gs = [0, hi, -1, si, Ti];
  var ms = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  ms.prototype.g = Si([0, ri, -4, oi]);
  var ys = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var _s = ki(class extends $n {
    constructor(t2) {
      super(t2);
    }
  }, [0, yi, [0, 1, hi, mi, is], oi]);
  var vs = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Es = class extends $n {
    constructor(t2) {
      super(t2);
    }
    ma() {
      const t2 = Ke(this);
      return null == t2 ? U() : t2;
    }
  };
  var ws = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Ts = [1, 2];
  var As = ki(class extends $n {
    constructor(t2) {
      super(t2);
    }
  }, [0, yi, [0, Ts, _i, [0, si], _i, [0, vi], hi, mi], oi]);
  var bs = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var ks = [0, mi, hi, ri, pi, -1];
  var Ss = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var xs = [0, di, -1];
  var Ls = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Rs = [1, 2, 3, 4, 5];
  var Fs = class extends $n {
    constructor(t2) {
      super(t2);
    }
    g() {
      return null != Ke(this);
    }
    h() {
      return null != vn(this, 2);
    }
  };
  var Is = class extends $n {
    constructor(t2) {
      super(t2);
    }
    g() {
      return Jt(Ve(this, 2)) ?? false;
    }
  };
  var Ms = [0, vi, mi, [0, hi, oi, -1], [0, ci, oi]];
  var Ps = [0, Ms, di, [0, Rs, _i, Bi, _i, Oi, _i, Pi, _i, Ni, _i, Ui], Ti];
  var Cs = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Os = [0, Ps, ri, -1, hi];
  var Us = bi(502141897, Cs);
  ji[502141897] = Os;
  var Ds = ki(class extends $n {
    constructor(t2) {
      super(t2);
    }
  }, [0, [0, Ti, -1, ii, Ei], gs]);
  var Ns = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Bs = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Gs = [0, Ps, ri, [0, Ps], di];
  var js = [0, Ps, Os, Gs, ri, [0, [0, Ms]]];
  var Vs = bi(508968150, Bs);
  ji[508968150] = js, ji[508968149] = Gs;
  var Xs = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Hs = bi(513916220, Xs);
  ji[513916220] = [0, Ps, js, hi];
  var Ws = class extends $n {
    constructor(t2) {
      super(t2);
    }
    h() {
      return hn(this, bs, 2);
    }
    g() {
      He(this, 2);
    }
  };
  var zs = [0, Ps, ks];
  ji[478825465] = zs;
  var Ks = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Ys = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var $s = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var qs = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Js = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Zs = [0, Ps, [0, Ps], zs, -1];
  var Qs = [0, Ps, ri, hi];
  var to = [0, Ps, ri];
  var eo = [0, Ps, Qs, to, ri];
  var no = bi(479097054, Js);
  ji[479097054] = [0, Ps, eo, Zs], ji[463370452] = Zs, ji[464864288] = Qs;
  var ro = bi(462713202, qs);
  ji[462713202] = eo, ji[474472470] = to;
  var io = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var so = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var oo = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var ao = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var co = [0, Ps, ri, -1, hi];
  var ho = [0, Ps, ri, di];
  ao.prototype.g = Si([0, Ps, to, [0, Ps], Os, Gs, co, ho]);
  var uo = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var lo = bi(456383383, uo);
  ji[456383383] = [0, Ps, ks];
  var fo = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var po = bi(476348187, fo);
  ji[476348187] = [0, Ps, xs];
  var go = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var mo = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var yo = [0, Ti, -1];
  var _o = bi(458105876, class extends $n {
    constructor(t2) {
      super(t2);
    }
    g() {
      var t2 = this.u;
      const e2 = 0 | t2[Q], n2 = 2 & e2;
      return t2 = (function(t3, e3, n3) {
        var r2 = mo;
        const i2 = 2 & e3;
        let s2 = false;
        if (null == n3) {
          if (i2) return Ie();
          n3 = [];
        } else if (n3.constructor === Ae) {
          if (0 == (2 & n3.M) || i2) return n3;
          n3 = n3.da();
        } else Array.isArray(n3) ? s2 = !!(2 & (0 | n3[Q])) : n3 = [];
        if (i2) {
          if (!n3.length) return Ie();
          s2 || (s2 = true, it(n3));
        } else s2 && (s2 = false, n3 = Qe(n3));
        return s2 || (64 & (0 | n3[Q]) ? n3[Q] &= -33 : 32 & e3 && nt(n3, 32)), We(t3, e3, 2, r2 = new Ae(n3, r2, ge, void 0)), r2;
      })(t2, e2, Xe(t2, e2, 2)), !n2 && mo && (t2.pa = true), t2;
    }
  });
  ji[458105876] = [0, yo, Yr, [true, oi, [0, mi, -1, pi]]];
  var vo = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Eo = bi(458105758, vo);
  ji[458105758] = [0, Ps, mi, yo];
  var wo = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var To = bi(443442058, wo);
  ji[443442058] = [0, Ps, mi, hi, ri, pi, -1, di, ri], ji[514774813] = co;
  var Ao = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var bo = bi(516587230, Ao);
  function ko(t2, e2) {
    return e2 = e2 ? e2.clone() : new bs(), void 0 !== t2.displayNamesLocale ? He(e2, 1, de(t2.displayNamesLocale)) : void 0 === t2.displayNamesLocale && He(e2, 1), void 0 !== t2.maxResults ? Tn(e2, 2, t2.maxResults) : "maxResults" in t2 && He(e2, 2), void 0 !== t2.scoreThreshold ? An(e2, 3, t2.scoreThreshold) : "scoreThreshold" in t2 && He(e2, 3), void 0 !== t2.categoryAllowlist ? bn(e2, 4, t2.categoryAllowlist) : "categoryAllowlist" in t2 && He(e2, 4), void 0 !== t2.categoryDenylist ? bn(e2, 5, t2.categoryDenylist) : "categoryDenylist" in t2 && He(e2, 5), e2;
  }
  function So(t2, e2 = -1, n2 = "") {
    return { categories: t2.map(((t3) => ({ index: _n(t3, 1) ?? 0 ?? -1, score: En(t3, 2) ?? 0, categoryName: vn(t3, 3) ?? "" ?? "", displayName: vn(t3, 4) ?? "" ?? "" }))), headIndex: e2, headName: n2 };
  }
  function xo(t2) {
    var e2 = $e(t2, 3, qt, Ye()), n2 = $e(t2, 2, te, Ye()), r2 = $e(t2, 1, fe, Ye()), i2 = $e(t2, 9, fe, Ye());
    const s2 = { categories: [], keypoints: [] };
    for (let t3 = 0; t3 < e2.length; t3++) s2.categories.push({ score: e2[t3], index: n2[t3] ?? -1, categoryName: r2[t3] ?? "", displayName: i2[t3] ?? "" });
    if ((e2 = hn(t2, cs, 4)?.h()) && (s2.boundingBox = { originX: _n(e2, 1) ?? 0, originY: _n(e2, 2) ?? 0, width: _n(e2, 3) ?? 0, height: _n(e2, 4) ?? 0, angle: 0 }), hn(t2, cs, 4)?.g().length) for (const e3 of hn(t2, cs, 4).g()) s2.keypoints.push({ x: ze(e3, 1) ?? 0, y: ze(e3, 2) ?? 0, score: ze(e3, 4) ?? 0, label: vn(e3, 3) ?? "" });
    return s2;
  }
  function Lo(t2) {
    const e2 = [];
    for (const n2 of ln(t2, ds, 1)) e2.push({ x: En(n2, 1) ?? 0, y: En(n2, 2) ?? 0, z: En(n2, 3) ?? 0, visibility: En(n2, 4) ?? 0 });
    return e2;
  }
  function Ro(t2) {
    const e2 = [];
    for (const n2 of ln(t2, us, 1)) e2.push({ x: En(n2, 1) ?? 0, y: En(n2, 2) ?? 0, z: En(n2, 3) ?? 0, visibility: En(n2, 4) ?? 0 });
    return e2;
  }
  function Fo(t2) {
    return Array.from(t2, ((t3) => t3 > 127 ? t3 - 256 : t3));
  }
  function Io(t2, e2) {
    if (t2.length !== e2.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t2.length} vs. ${e2.length}).`);
    let n2 = 0, r2 = 0, i2 = 0;
    for (let s2 = 0; s2 < t2.length; s2++) n2 += t2[s2] * e2[s2], r2 += t2[s2] * t2[s2], i2 += e2[s2] * e2[s2];
    if (r2 <= 0 || i2 <= 0) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
    return n2 / Math.sqrt(r2 * i2);
  }
  var Mo;
  ji[516587230] = [0, Ps, co, ho, ri], ji[518928384] = ho;
  var Po = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
  async function Co() {
    if (void 0 === Mo) try {
      await WebAssembly.instantiate(Po), Mo = true;
    } catch {
      Mo = false;
    }
    return Mo;
  }
  async function Oo(t2, e2 = Mi``) {
    const n2 = await Co() ? "wasm_internal" : "wasm_nosimd_internal";
    return { wasmLoaderPath: `${e2}/${t2}_${n2}.js`, wasmBinaryPath: `${e2}/${t2}_${n2}.wasm` };
  }
  var Uo = class {
  };
  function Do() {
    var t2 = navigator;
    return "undefined" != typeof OffscreenCanvas && (!(function(t3 = navigator) {
      return (t3 = t3.userAgent).includes("Safari") && !t3.includes("Chrome");
    })(t2) || !!((t2 = t2.userAgent.match(/Version\/([\d]+).*Safari/)) && t2.length >= 1 && Number(t2[1]) >= 17));
  }
  async function No(t2) {
    if ("function" != typeof importScripts) {
      const e2 = document.createElement("script");
      return e2.src = t2.toString(), e2.crossOrigin = "anonymous", new Promise(((t3, n2) => {
        e2.addEventListener("load", (() => {
          t3();
        }), false), e2.addEventListener("error", ((t4) => {
          n2(t4);
        }), false), document.body.appendChild(e2);
      }));
    }
    importScripts(t2.toString());
  }
  function Bo(t2) {
    return void 0 !== t2.videoWidth ? [t2.videoWidth, t2.videoHeight] : void 0 !== t2.naturalWidth ? [t2.naturalWidth, t2.naturalHeight] : void 0 !== t2.displayWidth ? [t2.displayWidth, t2.displayHeight] : [t2.width, t2.height];
  }
  function Go(t2, e2, n2) {
    t2.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), n2(e2 = t2.i.stringToNewUTF8(e2)), t2.i._free(e2);
  }
  function jo(t2, e2, n2) {
    if (!t2.i.canvas) throw Error("No OpenGL canvas configured.");
    if (n2 ? t2.i._bindTextureToStream(n2) : t2.i._bindTextureToCanvas(), !(n2 = t2.i.canvas.getContext("webgl2") || t2.i.canvas.getContext("webgl"))) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
    t2.i.gpuOriginForWebTexturesIsBottomLeft && n2.pixelStorei(n2.UNPACK_FLIP_Y_WEBGL, true), n2.texImage2D(n2.TEXTURE_2D, 0, n2.RGBA, n2.RGBA, n2.UNSIGNED_BYTE, e2), t2.i.gpuOriginForWebTexturesIsBottomLeft && n2.pixelStorei(n2.UNPACK_FLIP_Y_WEBGL, false);
    const [r2, i2] = Bo(e2);
    return !t2.l || r2 === t2.i.canvas.width && i2 === t2.i.canvas.height || (t2.i.canvas.width = r2, t2.i.canvas.height = i2), [r2, i2];
  }
  function Vo(t2, e2, n2) {
    t2.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
    const r2 = new Uint32Array(e2.length);
    for (let n3 = 0; n3 < e2.length; n3++) r2[n3] = t2.i.stringToNewUTF8(e2[n3]);
    e2 = t2.i._malloc(4 * r2.length), t2.i.HEAPU32.set(r2, e2 >> 2), n2(e2);
    for (const e3 of r2) t2.i._free(e3);
    t2.i._free(e2);
  }
  function Xo(t2, e2, n2) {
    t2.i.simpleListeners = t2.i.simpleListeners || {}, t2.i.simpleListeners[e2] = n2;
  }
  function Ho(t2, e2, n2) {
    let r2 = [];
    t2.i.simpleListeners = t2.i.simpleListeners || {}, t2.i.simpleListeners[e2] = (t3, e3, i2) => {
      e3 ? (n2(r2, i2), r2 = []) : r2.push(t3);
    };
  }
  Uo.forVisionTasks = function(t2) {
    return Oo("vision", t2);
  }, Uo.forTextTasks = function(t2) {
    return Oo("text", t2);
  }, Uo.forGenAiExperimentalTasks = function(t2) {
    return Oo("genai_experimental", t2);
  }, Uo.forGenAiTasks = function(t2) {
    return Oo("genai", t2);
  }, Uo.forAudioTasks = function(t2) {
    return Oo("audio", t2);
  }, Uo.isSimdSupported = function() {
    return Co();
  };
  async function Wo(t2, e2, n2, r2) {
    return t2 = await (async (t3, e3, n3, r3, i2) => {
      if (e3 && await No(e3), !self.ModuleFactory) throw Error("ModuleFactory not set.");
      if (n3 && (await No(n3), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
      return self.Module && i2 && ((e3 = self.Module).locateFile = i2.locateFile, i2.mainScriptUrlOrBlob && (e3.mainScriptUrlOrBlob = i2.mainScriptUrlOrBlob)), i2 = await self.ModuleFactory(self.Module || i2), self.ModuleFactory = self.Module = void 0, new t3(i2, r3);
    })(t2, n2.wasmLoaderPath, n2.assetLoaderPath, e2, { locateFile: (t3) => t3.endsWith(".wasm") ? n2.wasmBinaryPath.toString() : n2.assetBinaryPath && t3.endsWith(".data") ? n2.assetBinaryPath.toString() : t3 }), await t2.o(r2), t2;
  }
  function zo(t2, e2) {
    const n2 = hn(t2.baseOptions, Fs, 1) || new Fs();
    "string" == typeof e2 ? (He(n2, 2, de(e2)), He(n2, 1)) : e2 instanceof Uint8Array && (He(n2, 1, dt(e2, false)), He(n2, 2)), dn(t2.baseOptions, 0, 1, n2);
  }
  function Ko(t2) {
    try {
      const e2 = t2.G.length;
      if (1 === e2) throw Error(t2.G[0].message);
      if (e2 > 1) throw Error("Encountered multiple errors: " + t2.G.map(((t3) => t3.message)).join(", "));
    } finally {
      t2.G = [];
    }
  }
  function Yo(t2, e2) {
    t2.B = Math.max(t2.B, e2);
  }
  function $o(t2, e2) {
    t2.A = new zi(), Xi(t2.A, "PassThroughCalculator"), Hi(t2.A, "free_memory"), Wi(t2.A, "free_memory_unused_out"), Ji(e2, "free_memory"), qi(e2, t2.A);
  }
  function qo(t2, e2) {
    Hi(t2.A, e2), Wi(t2.A, e2 + "_unused_out");
  }
  function Jo(t2) {
    t2.g.addBoolToStream(true, "free_memory", t2.B);
  }
  var Zo = class {
    constructor(t2) {
      this.g = t2, this.G = [], this.B = 0, this.g.setAutoRenderToScreen(false);
    }
    l(t2, e2 = true) {
      if (e2) {
        const e3 = t2.baseOptions || {};
        if (t2.baseOptions?.modelAssetBuffer && t2.baseOptions?.modelAssetPath) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
        if (!(hn(this.baseOptions, Fs, 1)?.g() || hn(this.baseOptions, Fs, 1)?.h() || t2.baseOptions?.modelAssetBuffer || t2.baseOptions?.modelAssetPath)) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
        if ((function(t3, e4) {
          let n2 = hn(t3.baseOptions, Ls, 3);
          if (!n2) {
            var r2 = n2 = new Ls(), i2 = new Di();
            fn(r2, 4, Rs, i2);
          }
          "delegate" in e4 && ("GPU" === e4.delegate ? (e4 = n2, r2 = new Ci(), fn(e4, 2, Rs, r2)) : (e4 = n2, r2 = new Di(), fn(e4, 4, Rs, r2))), dn(t3.baseOptions, 0, 3, n2);
        })(this, e3), e3.modelAssetPath) return fetch(e3.modelAssetPath.toString()).then(((t3) => {
          if (t3.ok) return t3.arrayBuffer();
          throw Error(`Failed to fetch model: ${e3.modelAssetPath} (${t3.status})`);
        })).then(((t3) => {
          try {
            this.g.i.FS_unlink("/model.dat");
          } catch {
          }
          this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(t3), true, false, false), zo(this, "/model.dat"), this.m(), this.J();
        }));
        if (e3.modelAssetBuffer instanceof Uint8Array) zo(this, e3.modelAssetBuffer);
        else if (e3.modelAssetBuffer) return (async function(t3) {
          const e4 = [];
          for (var n2 = 0; ; ) {
            const { done: r2, value: i2 } = await t3.read();
            if (r2) break;
            e4.push(i2), n2 += i2.length;
          }
          if (0 === e4.length) return new Uint8Array(0);
          if (1 === e4.length) return e4[0];
          t3 = new Uint8Array(n2), n2 = 0;
          for (const r2 of e4) t3.set(r2, n2), n2 += r2.length;
          return t3;
        })(e3.modelAssetBuffer).then(((t3) => {
          zo(this, t3), this.m(), this.J();
        }));
      }
      return this.m(), this.J(), Promise.resolve();
    }
    J() {
    }
    ca() {
      let t2;
      if (this.g.ca(((e2) => {
        t2 = es(e2);
      })), !t2) throw Error("Failed to retrieve CalculatorGraphConfig");
      return t2;
    }
    setGraph(t2, e2) {
      this.g.attachErrorListener(((t3, e3) => {
        this.G.push(Error(e3));
      })), this.g.Ha(), this.g.setGraph(t2, e2), this.A = void 0, Ko(this);
    }
    finishProcessing() {
      this.g.finishProcessing(), Ko(this);
    }
    close() {
      this.A = void 0, this.g.closeGraph();
    }
  };
  function Qo(t2, e2) {
    if (!t2) throw Error(`Unable to obtain required WebGL resource: ${e2}`);
    return t2;
  }
  Zo.prototype.close = Zo.prototype.close;
  var ta = class {
    constructor(t2, e2, n2, r2) {
      this.g = t2, this.h = e2, this.m = n2, this.l = r2;
    }
    bind() {
      this.g.bindVertexArray(this.h);
    }
    close() {
      this.g.deleteVertexArray(this.h), this.g.deleteBuffer(this.m), this.g.deleteBuffer(this.l);
    }
  };
  function ea(t2, e2, n2) {
    const r2 = t2.g;
    if (n2 = Qo(r2.createShader(n2), "Failed to create WebGL shader"), r2.shaderSource(n2, e2), r2.compileShader(n2), !r2.getShaderParameter(n2, r2.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${r2.getShaderInfoLog(n2)}`);
    return r2.attachShader(t2.h, n2), n2;
  }
  function na(t2, e2) {
    const n2 = t2.g, r2 = Qo(n2.createVertexArray(), "Failed to create vertex array");
    n2.bindVertexArray(r2);
    const i2 = Qo(n2.createBuffer(), "Failed to create buffer");
    n2.bindBuffer(n2.ARRAY_BUFFER, i2), n2.enableVertexAttribArray(t2.P), n2.vertexAttribPointer(t2.P, 2, n2.FLOAT, false, 0, 0), n2.bufferData(n2.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), n2.STATIC_DRAW);
    const s2 = Qo(n2.createBuffer(), "Failed to create buffer");
    return n2.bindBuffer(n2.ARRAY_BUFFER, s2), n2.enableVertexAttribArray(t2.J), n2.vertexAttribPointer(t2.J, 2, n2.FLOAT, false, 0, 0), n2.bufferData(n2.ARRAY_BUFFER, new Float32Array(e2 ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), n2.STATIC_DRAW), n2.bindBuffer(n2.ARRAY_BUFFER, null), n2.bindVertexArray(null), new ta(n2, r2, i2, s2);
  }
  function ra(t2, e2) {
    if (t2.g) {
      if (e2 !== t2.g) throw Error("Cannot change GL context once initialized");
    } else t2.g = e2;
  }
  function ia(t2, e2, n2, r2) {
    return ra(t2, e2), t2.h || (t2.m(), t2.C()), n2 ? (t2.s || (t2.s = na(t2, true)), n2 = t2.s) : (t2.v || (t2.v = na(t2, false)), n2 = t2.v), e2.useProgram(t2.h), n2.bind(), t2.l(), t2 = r2(), n2.g.bindVertexArray(null), t2;
  }
  function sa(t2, e2, n2) {
    return ra(t2, e2), t2 = Qo(e2.createTexture(), "Failed to create texture"), e2.bindTexture(e2.TEXTURE_2D, t2), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_WRAP_S, e2.CLAMP_TO_EDGE), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_WRAP_T, e2.CLAMP_TO_EDGE), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_MIN_FILTER, n2 ?? e2.LINEAR), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_MAG_FILTER, n2 ?? e2.LINEAR), e2.bindTexture(e2.TEXTURE_2D, null), t2;
  }
  function oa(t2, e2, n2) {
    ra(t2, e2), t2.A || (t2.A = Qo(e2.createFramebuffer(), "Failed to create framebuffe.")), e2.bindFramebuffer(e2.FRAMEBUFFER, t2.A), e2.framebufferTexture2D(e2.FRAMEBUFFER, e2.COLOR_ATTACHMENT0, e2.TEXTURE_2D, n2, 0);
  }
  function aa(t2) {
    t2.g?.bindFramebuffer(t2.g.FRAMEBUFFER, null);
  }
  var ca = class {
    G() {
      return "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D inputTexture;\n  void main() {\n    gl_FragColor = texture2D(inputTexture, vTex);\n  }\n ";
    }
    m() {
      const t2 = this.g;
      if (this.h = Qo(t2.createProgram(), "Failed to create WebGL program"), this.Z = ea(this, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", t2.VERTEX_SHADER), this.Y = ea(this, this.G(), t2.FRAGMENT_SHADER), t2.linkProgram(this.h), !t2.getProgramParameter(this.h, t2.LINK_STATUS)) throw Error(`Error during program linking: ${t2.getProgramInfoLog(this.h)}`);
      this.P = t2.getAttribLocation(this.h, "aVertex"), this.J = t2.getAttribLocation(this.h, "aTex");
    }
    C() {
    }
    l() {
    }
    close() {
      if (this.h) {
        const t2 = this.g;
        t2.deleteProgram(this.h), t2.deleteShader(this.Z), t2.deleteShader(this.Y);
      }
      this.A && this.g.deleteFramebuffer(this.A), this.v && this.v.close(), this.s && this.s.close();
    }
  };
  var ha = class extends ca {
    G() {
      return "\n  precision mediump float;\n  uniform sampler2D backgroundTexture;\n  uniform sampler2D maskTexture;\n  uniform sampler2D colorMappingTexture;\n  varying vec2 vTex;\n  void main() {\n    vec4 backgroundColor = texture2D(backgroundTexture, vTex);\n    float category = texture2D(maskTexture, vTex).r;\n    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));\n    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);\n  }\n ";
    }
    C() {
      const t2 = this.g;
      t2.activeTexture(t2.TEXTURE1), this.B = sa(this, t2, t2.LINEAR), t2.activeTexture(t2.TEXTURE2), this.j = sa(this, t2, t2.NEAREST);
    }
    m() {
      super.m();
      const t2 = this.g;
      this.L = Qo(t2.getUniformLocation(this.h, "backgroundTexture"), "Uniform location"), this.U = Qo(t2.getUniformLocation(this.h, "colorMappingTexture"), "Uniform location"), this.K = Qo(t2.getUniformLocation(this.h, "maskTexture"), "Uniform location");
    }
    l() {
      super.l();
      const t2 = this.g;
      t2.uniform1i(this.K, 0), t2.uniform1i(this.L, 1), t2.uniform1i(this.U, 2);
    }
    close() {
      this.B && this.g.deleteTexture(this.B), this.j && this.g.deleteTexture(this.j), super.close();
    }
  };
  var ua = class extends ca {
    G() {
      return "\n  precision mediump float;\n  uniform sampler2D maskTexture;\n  uniform sampler2D defaultTexture;\n  uniform sampler2D overlayTexture;\n  varying vec2 vTex;\n  void main() {\n    float confidence = texture2D(maskTexture, vTex).r;\n    vec4 defaultColor = texture2D(defaultTexture, vTex);\n    vec4 overlayColor = texture2D(overlayTexture, vTex);\n    // Apply the alpha from the overlay and merge in the default color\n    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);\n    gl_FragColor = mix(defaultColor, overlayColor, confidence);\n  }\n ";
    }
    C() {
      const t2 = this.g;
      t2.activeTexture(t2.TEXTURE1), this.j = sa(this, t2), t2.activeTexture(t2.TEXTURE2), this.B = sa(this, t2);
    }
    m() {
      super.m();
      const t2 = this.g;
      this.K = Qo(t2.getUniformLocation(this.h, "defaultTexture"), "Uniform location"), this.L = Qo(t2.getUniformLocation(this.h, "overlayTexture"), "Uniform location"), this.H = Qo(t2.getUniformLocation(this.h, "maskTexture"), "Uniform location");
    }
    l() {
      super.l();
      const t2 = this.g;
      t2.uniform1i(this.H, 0), t2.uniform1i(this.K, 1), t2.uniform1i(this.L, 2);
    }
    close() {
      this.j && this.g.deleteTexture(this.j), this.B && this.g.deleteTexture(this.B), super.close();
    }
  };
  function la(t2, e2) {
    switch (e2) {
      case 0:
        return t2.g.find(((t3) => t3 instanceof Uint8Array));
      case 1:
        return t2.g.find(((t3) => t3 instanceof Float32Array));
      case 2:
        return t2.g.find(((t3) => "undefined" != typeof WebGLTexture && t3 instanceof WebGLTexture));
      default:
        throw Error(`Type is not supported: ${e2}`);
    }
  }
  function da(t2) {
    var e2 = la(t2, 1);
    if (!e2) {
      if (e2 = la(t2, 0)) e2 = new Float32Array(e2).map(((t3) => t3 / 255));
      else {
        e2 = new Float32Array(t2.width * t2.height);
        const r2 = pa(t2);
        var n2 = ma(t2);
        if (oa(n2, r2, fa(t2)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "document" in self && "ontouchend" in self.document) {
          n2 = new Float32Array(t2.width * t2.height * 4), r2.readPixels(0, 0, t2.width, t2.height, r2.RGBA, r2.FLOAT, n2);
          for (let t3 = 0, r3 = 0; t3 < e2.length; ++t3, r3 += 4) e2[t3] = n2[r3];
        } else r2.readPixels(0, 0, t2.width, t2.height, r2.RED, r2.FLOAT, e2);
      }
      t2.g.push(e2);
    }
    return e2;
  }
  function fa(t2) {
    let e2 = la(t2, 2);
    if (!e2) {
      const n2 = pa(t2);
      e2 = ya(t2);
      const r2 = da(t2), i2 = ga(t2);
      n2.texImage2D(n2.TEXTURE_2D, 0, i2, t2.width, t2.height, 0, n2.RED, n2.FLOAT, r2), _a(t2);
    }
    return e2;
  }
  function pa(t2) {
    if (!t2.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
    return t2.h || (t2.h = Qo(t2.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t2.h;
  }
  function ga(t2) {
    if (t2 = pa(t2), !va) if (t2.getExtension("EXT_color_buffer_float") && t2.getExtension("OES_texture_float_linear") && t2.getExtension("EXT_float_blend")) va = t2.R32F;
    else {
      if (!t2.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
      va = t2.R16F;
    }
    return va;
  }
  function ma(t2) {
    return t2.l || (t2.l = new ca()), t2.l;
  }
  function ya(t2) {
    const e2 = pa(t2);
    e2.viewport(0, 0, t2.width, t2.height), e2.activeTexture(e2.TEXTURE0);
    let n2 = la(t2, 2);
    return n2 || (n2 = sa(ma(t2), e2, t2.m ? e2.LINEAR : e2.NEAREST), t2.g.push(n2), t2.j = true), e2.bindTexture(e2.TEXTURE_2D, n2), n2;
  }
  function _a(t2) {
    t2.h.bindTexture(t2.h.TEXTURE_2D, null);
  }
  var va;
  var Ea = class {
    constructor(t2, e2, n2, r2, i2, s2, o2) {
      this.g = t2, this.m = e2, this.j = n2, this.canvas = r2, this.l = i2, this.width = s2, this.height = o2, this.j && (0 === --wa && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources."));
    }
    Da() {
      return !!la(this, 0);
    }
    ja() {
      return !!la(this, 1);
    }
    R() {
      return !!la(this, 2);
    }
    ia() {
      return (e2 = la(t2 = this, 0)) || (e2 = da(t2), e2 = new Uint8Array(e2.map(((t3) => 255 * t3))), t2.g.push(e2)), e2;
      var t2, e2;
    }
    ha() {
      return da(this);
    }
    N() {
      return fa(this);
    }
    clone() {
      const t2 = [];
      for (const e2 of this.g) {
        let n2;
        if (e2 instanceof Uint8Array) n2 = new Uint8Array(e2);
        else if (e2 instanceof Float32Array) n2 = new Float32Array(e2);
        else {
          if (!(e2 instanceof WebGLTexture)) throw Error(`Type is not supported: ${e2}`);
          {
            const t3 = pa(this), e3 = ma(this);
            t3.activeTexture(t3.TEXTURE1), n2 = sa(e3, t3, this.m ? t3.LINEAR : t3.NEAREST), t3.bindTexture(t3.TEXTURE_2D, n2);
            const r2 = ga(this);
            t3.texImage2D(t3.TEXTURE_2D, 0, r2, this.width, this.height, 0, t3.RED, t3.FLOAT, null), t3.bindTexture(t3.TEXTURE_2D, null), oa(e3, t3, n2), ia(e3, t3, false, (() => {
              ya(this), t3.clearColor(0, 0, 0, 0), t3.clear(t3.COLOR_BUFFER_BIT), t3.drawArrays(t3.TRIANGLE_FAN, 0, 4), _a(this);
            })), aa(e3), _a(this);
          }
        }
        t2.push(n2);
      }
      return new Ea(t2, this.m, this.R(), this.canvas, this.l, this.width, this.height);
    }
    close() {
      this.j && pa(this).deleteTexture(la(this, 2)), wa = -1;
    }
  };
  Ea.prototype.close = Ea.prototype.close, Ea.prototype.clone = Ea.prototype.clone, Ea.prototype.getAsWebGLTexture = Ea.prototype.N, Ea.prototype.getAsFloat32Array = Ea.prototype.ha, Ea.prototype.getAsUint8Array = Ea.prototype.ia, Ea.prototype.hasWebGLTexture = Ea.prototype.R, Ea.prototype.hasFloat32Array = Ea.prototype.ja, Ea.prototype.hasUint8Array = Ea.prototype.Da;
  var wa = 250;
  var Ta = { color: "white", lineWidth: 4, radius: 6 };
  function Aa(t2) {
    return { ...Ta, fillColor: (t2 = t2 || {}).color, ...t2 };
  }
  function ba(t2, e2) {
    return t2 instanceof Function ? t2(e2) : t2;
  }
  function ka(t2, e2, n2) {
    return Math.max(Math.min(e2, n2), Math.min(Math.max(e2, n2), t2));
  }
  function Sa(t2) {
    if (!t2.l) throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");
    return t2.l;
  }
  function xa(t2) {
    if (!t2.j) throw Error("GPU rendering requested but WebGL2RenderingContext not provided.");
    return t2.j;
  }
  function La(t2, e2, n2) {
    if (e2.R()) n2(e2.N());
    else {
      const r2 = e2.ja() ? e2.ha() : e2.ia();
      t2.m = t2.m ?? new ca();
      const i2 = xa(t2);
      n2((t2 = new Ea([r2], e2.m, false, i2.canvas, t2.m, e2.width, e2.height)).N()), t2.close();
    }
  }
  function Ra(t2, e2, n2, r2) {
    const i2 = (function(t3) {
      return t3.g || (t3.g = new ha()), t3.g;
    })(t2), s2 = xa(t2), o2 = Array.isArray(n2) ? new ImageData(new Uint8ClampedArray(n2), 1, 1) : n2;
    ia(i2, s2, true, (() => {
      !(function(t4, e3, n3, r3) {
        const i3 = t4.g;
        if (i3.activeTexture(i3.TEXTURE0), i3.bindTexture(i3.TEXTURE_2D, e3), i3.activeTexture(i3.TEXTURE1), i3.bindTexture(i3.TEXTURE_2D, t4.B), i3.texImage2D(i3.TEXTURE_2D, 0, i3.RGBA, i3.RGBA, i3.UNSIGNED_BYTE, n3), t4.H && (function(t5, e4) {
          if (t5 !== e4) return false;
          t5 = t5.entries(), e4 = e4.entries();
          for (const [r4, i4] of t5) {
            t5 = r4;
            const s3 = i4;
            var n4 = e4.next();
            if (n4.done) return false;
            const [o3, a2] = n4.value;
            if (n4 = a2, t5 !== o3 || s3[0] !== n4[0] || s3[1] !== n4[1] || s3[2] !== n4[2] || s3[3] !== n4[3]) return false;
          }
          return !!e4.next().done;
        })(t4.H, r3)) i3.activeTexture(i3.TEXTURE2), i3.bindTexture(i3.TEXTURE_2D, t4.j);
        else {
          t4.H = r3;
          const e4 = Array(1024).fill(0);
          r3.forEach(((t5, n4) => {
            if (4 !== t5.length) throw Error(`Color at index ${n4} is not a four-channel value.`);
            e4[4 * n4] = t5[0], e4[4 * n4 + 1] = t5[1], e4[4 * n4 + 2] = t5[2], e4[4 * n4 + 3] = t5[3];
          })), i3.activeTexture(i3.TEXTURE2), i3.bindTexture(i3.TEXTURE_2D, t4.j), i3.texImage2D(i3.TEXTURE_2D, 0, i3.RGBA, 256, 1, 0, i3.RGBA, i3.UNSIGNED_BYTE, new Uint8Array(e4));
        }
      })(i2, e2, o2, r2), s2.clearColor(0, 0, 0, 0), s2.clear(s2.COLOR_BUFFER_BIT), s2.drawArrays(s2.TRIANGLE_FAN, 0, 4);
      const t3 = i2.g;
      t3.activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, null);
    }));
  }
  function Fa(t2, e2, n2, r2) {
    const i2 = xa(t2), s2 = (function(t3) {
      return t3.h || (t3.h = new ua()), t3.h;
    })(t2), o2 = Array.isArray(n2) ? new ImageData(new Uint8ClampedArray(n2), 1, 1) : n2, a2 = Array.isArray(r2) ? new ImageData(new Uint8ClampedArray(r2), 1, 1) : r2;
    ia(s2, i2, true, (() => {
      var t3 = s2.g;
      t3.activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, e2), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, s2.j), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, t3.RGBA, t3.UNSIGNED_BYTE, o2), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, s2.B), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, t3.RGBA, t3.UNSIGNED_BYTE, a2), i2.clearColor(0, 0, 0, 0), i2.clear(i2.COLOR_BUFFER_BIT), i2.drawArrays(i2.TRIANGLE_FAN, 0, 4), i2.bindTexture(i2.TEXTURE_2D, null), (t3 = s2.g).activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, null);
    }));
  }
  var Ia = class {
    constructor(t2, e2) {
      "undefined" != typeof CanvasRenderingContext2D && t2 instanceof CanvasRenderingContext2D || t2 instanceof OffscreenCanvasRenderingContext2D ? (this.l = t2, this.j = e2) : this.j = t2;
    }
    wa(t2, e2) {
      if (t2) {
        var n2 = Sa(this);
        e2 = Aa(e2), n2.save();
        var r2 = n2.canvas, i2 = 0;
        for (const s2 of t2) n2.fillStyle = ba(e2.fillColor, { index: i2, from: s2 }), n2.strokeStyle = ba(e2.color, { index: i2, from: s2 }), n2.lineWidth = ba(e2.lineWidth, { index: i2, from: s2 }), (t2 = new Path2D()).arc(s2.x * r2.width, s2.y * r2.height, ba(e2.radius, { index: i2, from: s2 }), 0, 2 * Math.PI), n2.fill(t2), n2.stroke(t2), ++i2;
        n2.restore();
      }
    }
    va(t2, e2, n2) {
      if (t2 && e2) {
        var r2 = Sa(this);
        n2 = Aa(n2), r2.save();
        var i2 = r2.canvas, s2 = 0;
        for (const o2 of e2) {
          r2.beginPath(), e2 = t2[o2.start];
          const a2 = t2[o2.end];
          e2 && a2 && (r2.strokeStyle = ba(n2.color, { index: s2, from: e2, to: a2 }), r2.lineWidth = ba(n2.lineWidth, { index: s2, from: e2, to: a2 }), r2.moveTo(e2.x * i2.width, e2.y * i2.height), r2.lineTo(a2.x * i2.width, a2.y * i2.height)), ++s2, r2.stroke();
        }
        r2.restore();
      }
    }
    sa(t2, e2) {
      const n2 = Sa(this);
      e2 = Aa(e2), n2.save(), n2.beginPath(), n2.lineWidth = ba(e2.lineWidth, {}), n2.strokeStyle = ba(e2.color, {}), n2.fillStyle = ba(e2.fillColor, {}), n2.moveTo(t2.originX, t2.originY), n2.lineTo(t2.originX + t2.width, t2.originY), n2.lineTo(t2.originX + t2.width, t2.originY + t2.height), n2.lineTo(t2.originX, t2.originY + t2.height), n2.lineTo(t2.originX, t2.originY), n2.stroke(), n2.fill(), n2.restore();
    }
    ta(t2, e2, n2 = [0, 0, 0, 255]) {
      this.l ? (function(t3, e3, n3, r2) {
        const i2 = xa(t3);
        La(t3, e3, ((e4) => {
          Ra(t3, e4, n3, r2), (e4 = Sa(t3)).drawImage(i2.canvas, 0, 0, e4.canvas.width, e4.canvas.height);
        }));
      })(this, t2, n2, e2) : Ra(this, t2.N(), n2, e2);
    }
    ua(t2, e2, n2) {
      this.l ? (function(t3, e3, n3, r2) {
        const i2 = xa(t3);
        La(t3, e3, ((e4) => {
          Fa(t3, e4, n3, r2), (e4 = Sa(t3)).drawImage(i2.canvas, 0, 0, e4.canvas.width, e4.canvas.height);
        }));
      })(this, t2, e2, n2) : Fa(this, t2.N(), e2, n2);
    }
    close() {
      this.g?.close(), this.g = void 0, this.h?.close(), this.h = void 0, this.m?.close(), this.m = void 0;
    }
  };
  function Ma(t2, e2) {
    switch (e2) {
      case 0:
        return t2.g.find(((t3) => t3 instanceof ImageData));
      case 1:
        return t2.g.find(((t3) => "undefined" != typeof ImageBitmap && t3 instanceof ImageBitmap));
      case 2:
        return t2.g.find(((t3) => "undefined" != typeof WebGLTexture && t3 instanceof WebGLTexture));
      default:
        throw Error(`Type is not supported: ${e2}`);
    }
  }
  function Pa(t2) {
    var e2 = Ma(t2, 0);
    if (!e2) {
      e2 = Oa(t2);
      const n2 = Ua(t2), r2 = new Uint8Array(t2.width * t2.height * 4);
      oa(n2, e2, Ca(t2)), e2.readPixels(0, 0, t2.width, t2.height, e2.RGBA, e2.UNSIGNED_BYTE, r2), aa(n2), e2 = new ImageData(new Uint8ClampedArray(r2.buffer), t2.width, t2.height), t2.g.push(e2);
    }
    return e2;
  }
  function Ca(t2) {
    let e2 = Ma(t2, 2);
    if (!e2) {
      const n2 = Oa(t2);
      e2 = Da(t2);
      const r2 = Ma(t2, 1) || Pa(t2);
      n2.texImage2D(n2.TEXTURE_2D, 0, n2.RGBA, n2.RGBA, n2.UNSIGNED_BYTE, r2), Na(t2);
    }
    return e2;
  }
  function Oa(t2) {
    if (!t2.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
    return t2.h || (t2.h = Qo(t2.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t2.h;
  }
  function Ua(t2) {
    return t2.l || (t2.l = new ca()), t2.l;
  }
  function Da(t2) {
    const e2 = Oa(t2);
    e2.viewport(0, 0, t2.width, t2.height), e2.activeTexture(e2.TEXTURE0);
    let n2 = Ma(t2, 2);
    return n2 || (n2 = sa(Ua(t2), e2), t2.g.push(n2), t2.m = true), e2.bindTexture(e2.TEXTURE_2D, n2), n2;
  }
  function Na(t2) {
    t2.h.bindTexture(t2.h.TEXTURE_2D, null);
  }
  function Ba(t2) {
    const e2 = Oa(t2);
    return ia(Ua(t2), e2, true, (() => (function(t3, e3) {
      const n2 = t3.canvas;
      if (n2.width === t3.width && n2.height === t3.height) return e3();
      const r2 = n2.width, i2 = n2.height;
      return n2.width = t3.width, n2.height = t3.height, t3 = e3(), n2.width = r2, n2.height = i2, t3;
    })(t2, (() => {
      if (e2.bindFramebuffer(e2.FRAMEBUFFER, null), e2.clearColor(0, 0, 0, 0), e2.clear(e2.COLOR_BUFFER_BIT), e2.drawArrays(e2.TRIANGLE_FAN, 0, 4), !(t2.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
      return t2.canvas.transferToImageBitmap();
    }))));
  }
  Ia.prototype.close = Ia.prototype.close, Ia.prototype.drawConfidenceMask = Ia.prototype.ua, Ia.prototype.drawCategoryMask = Ia.prototype.ta, Ia.prototype.drawBoundingBox = Ia.prototype.sa, Ia.prototype.drawConnectors = Ia.prototype.va, Ia.prototype.drawLandmarks = Ia.prototype.wa, Ia.lerp = function(t2, e2, n2, r2, i2) {
    return ka(r2 * (1 - (t2 - e2) / (n2 - e2)) + i2 * (1 - (n2 - t2) / (n2 - e2)), r2, i2);
  }, Ia.clamp = ka;
  var Ga = class {
    constructor(t2, e2, n2, r2, i2, s2, o2) {
      this.g = t2, this.j = e2, this.m = n2, this.canvas = r2, this.l = i2, this.width = s2, this.height = o2, (this.j || this.m) && (0 === --ja && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources."));
    }
    Ca() {
      return !!Ma(this, 0);
    }
    ka() {
      return !!Ma(this, 1);
    }
    R() {
      return !!Ma(this, 2);
    }
    Aa() {
      return Pa(this);
    }
    za() {
      var t2 = Ma(this, 1);
      return t2 || (Ca(this), Da(this), t2 = Ba(this), Na(this), this.g.push(t2), this.j = true), t2;
    }
    N() {
      return Ca(this);
    }
    clone() {
      const t2 = [];
      for (const e2 of this.g) {
        let n2;
        if (e2 instanceof ImageData) n2 = new ImageData(e2.data, this.width, this.height);
        else if (e2 instanceof WebGLTexture) {
          const t3 = Oa(this), e3 = Ua(this);
          t3.activeTexture(t3.TEXTURE1), n2 = sa(e3, t3), t3.bindTexture(t3.TEXTURE_2D, n2), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, this.width, this.height, 0, t3.RGBA, t3.UNSIGNED_BYTE, null), t3.bindTexture(t3.TEXTURE_2D, null), oa(e3, t3, n2), ia(e3, t3, false, (() => {
            Da(this), t3.clearColor(0, 0, 0, 0), t3.clear(t3.COLOR_BUFFER_BIT), t3.drawArrays(t3.TRIANGLE_FAN, 0, 4), Na(this);
          })), aa(e3), Na(this);
        } else {
          if (!(e2 instanceof ImageBitmap)) throw Error(`Type is not supported: ${e2}`);
          Ca(this), Da(this), n2 = Ba(this), Na(this);
        }
        t2.push(n2);
      }
      return new Ga(t2, this.ka(), this.R(), this.canvas, this.l, this.width, this.height);
    }
    close() {
      this.j && Ma(this, 1).close(), this.m && Oa(this).deleteTexture(Ma(this, 2)), ja = -1;
    }
  };
  Ga.prototype.close = Ga.prototype.close, Ga.prototype.clone = Ga.prototype.clone, Ga.prototype.getAsWebGLTexture = Ga.prototype.N, Ga.prototype.getAsImageBitmap = Ga.prototype.za, Ga.prototype.getAsImageData = Ga.prototype.Aa, Ga.prototype.hasWebGLTexture = Ga.prototype.R, Ga.prototype.hasImageBitmap = Ga.prototype.ka, Ga.prototype.hasImageData = Ga.prototype.Ca;
  var ja = 250;
  function Va(...t2) {
    return t2.map((([t3, e2]) => ({ start: t3, end: e2 })));
  }
  var Xa = /* @__PURE__ */ (function(t2) {
    return class extends t2 {
      Ha() {
        this.i._registerModelResourcesGraphService();
      }
    };
  })((Ha = class {
    constructor(t2, e2) {
      this.l = true, this.i = t2, this.g = null, this.h = 0, this.m = "function" == typeof this.i._addIntToInputStream, void 0 !== e2 ? this.i.canvas = e2 : Do() ? this.i.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.i.canvas = document.createElement("canvas"));
    }
    async initializeGraph(t2) {
      const e2 = await (await fetch(t2)).arrayBuffer();
      t2 = !(t2.endsWith(".pbtxt") || t2.endsWith(".textproto")), this.setGraph(new Uint8Array(e2), t2);
    }
    setGraphFromString(t2) {
      this.setGraph(new TextEncoder().encode(t2), false);
    }
    setGraph(t2, e2) {
      const n2 = t2.length, r2 = this.i._malloc(n2);
      this.i.HEAPU8.set(t2, r2), e2 ? this.i._changeBinaryGraph(n2, r2) : this.i._changeTextGraph(n2, r2), this.i._free(r2);
    }
    configureAudio(t2, e2, n2, r2, i2) {
      this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), Go(this, r2 || "input_audio", ((r3) => {
        Go(this, i2 = i2 || "audio_header", ((i3) => {
          this.i._configureAudio(r3, i3, t2, e2 ?? 0, n2);
        }));
      }));
    }
    setAutoResizeCanvas(t2) {
      this.l = t2;
    }
    setAutoRenderToScreen(t2) {
      this.i._setAutoRenderToScreen(t2);
    }
    setGpuBufferVerticalFlip(t2) {
      this.i.gpuOriginForWebTexturesIsBottomLeft = t2;
    }
    ca(t2) {
      Xo(this, "__graph_config__", ((e2) => {
        t2(e2);
      })), Go(this, "__graph_config__", ((t3) => {
        this.i._getGraphConfig(t3, void 0);
      })), delete this.i.simpleListeners.__graph_config__;
    }
    attachErrorListener(t2) {
      this.i.errorListener = t2;
    }
    attachEmptyPacketListener(t2, e2) {
      this.i.emptyPacketListeners = this.i.emptyPacketListeners || {}, this.i.emptyPacketListeners[t2] = e2;
    }
    addAudioToStream(t2, e2, n2) {
      this.addAudioToStreamWithShape(t2, 0, 0, e2, n2);
    }
    addAudioToStreamWithShape(t2, e2, n2, r2, i2) {
      const s2 = 4 * t2.length;
      this.h !== s2 && (this.g && this.i._free(this.g), this.g = this.i._malloc(s2), this.h = s2), this.i.HEAPF32.set(t2, this.g / 4), Go(this, r2, ((t3) => {
        this.i._addAudioToInputStream(this.g, e2, n2, t3, i2);
      }));
    }
    addGpuBufferToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        const [r2, i2] = jo(this, t2, e3);
        this.i._addBoundTextureToStream(e3, r2, i2, n2);
      }));
    }
    addBoolToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        this.i._addBoolToInputStream(t2, e3, n2);
      }));
    }
    addDoubleToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        this.i._addDoubleToInputStream(t2, e3, n2);
      }));
    }
    addFloatToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        this.i._addFloatToInputStream(t2, e3, n2);
      }));
    }
    addIntToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        this.i._addIntToInputStream(t2, e3, n2);
      }));
    }
    addUintToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        this.i._addUintToInputStream(t2, e3, n2);
      }));
    }
    addStringToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        Go(this, t2, ((t3) => {
          this.i._addStringToInputStream(t3, e3, n2);
        }));
      }));
    }
    addStringRecordToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        Vo(this, Object.keys(t2), ((r2) => {
          Vo(this, Object.values(t2), ((i2) => {
            this.i._addFlatHashMapToInputStream(r2, i2, Object.keys(t2).length, e3, n2);
          }));
        }));
      }));
    }
    addProtoToStream(t2, e2, n2, r2) {
      Go(this, n2, ((n3) => {
        Go(this, e2, ((e3) => {
          const i2 = this.i._malloc(t2.length);
          this.i.HEAPU8.set(t2, i2), this.i._addProtoToInputStream(i2, t2.length, e3, n3, r2), this.i._free(i2);
        }));
      }));
    }
    addEmptyPacketToStream(t2, e2) {
      Go(this, t2, ((t3) => {
        this.i._addEmptyPacketToInputStream(t3, e2);
      }));
    }
    addBoolVectorToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        const r2 = this.i._allocateBoolVector(t2.length);
        if (!r2) throw Error("Unable to allocate new bool vector on heap.");
        for (const e4 of t2) this.i._addBoolVectorEntry(r2, e4);
        this.i._addBoolVectorToInputStream(r2, e3, n2);
      }));
    }
    addDoubleVectorToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        const r2 = this.i._allocateDoubleVector(t2.length);
        if (!r2) throw Error("Unable to allocate new double vector on heap.");
        for (const e4 of t2) this.i._addDoubleVectorEntry(r2, e4);
        this.i._addDoubleVectorToInputStream(r2, e3, n2);
      }));
    }
    addFloatVectorToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        const r2 = this.i._allocateFloatVector(t2.length);
        if (!r2) throw Error("Unable to allocate new float vector on heap.");
        for (const e4 of t2) this.i._addFloatVectorEntry(r2, e4);
        this.i._addFloatVectorToInputStream(r2, e3, n2);
      }));
    }
    addIntVectorToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        const r2 = this.i._allocateIntVector(t2.length);
        if (!r2) throw Error("Unable to allocate new int vector on heap.");
        for (const e4 of t2) this.i._addIntVectorEntry(r2, e4);
        this.i._addIntVectorToInputStream(r2, e3, n2);
      }));
    }
    addUintVectorToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        const r2 = this.i._allocateUintVector(t2.length);
        if (!r2) throw Error("Unable to allocate new unsigned int vector on heap.");
        for (const e4 of t2) this.i._addUintVectorEntry(r2, e4);
        this.i._addUintVectorToInputStream(r2, e3, n2);
      }));
    }
    addStringVectorToStream(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        const r2 = this.i._allocateStringVector(t2.length);
        if (!r2) throw Error("Unable to allocate new string vector on heap.");
        for (const e4 of t2) Go(this, e4, ((t3) => {
          this.i._addStringVectorEntry(r2, t3);
        }));
        this.i._addStringVectorToInputStream(r2, e3, n2);
      }));
    }
    addBoolToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        this.i._addBoolToInputSidePacket(t2, e3);
      }));
    }
    addDoubleToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        this.i._addDoubleToInputSidePacket(t2, e3);
      }));
    }
    addFloatToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        this.i._addFloatToInputSidePacket(t2, e3);
      }));
    }
    addIntToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        this.i._addIntToInputSidePacket(t2, e3);
      }));
    }
    addUintToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        this.i._addUintToInputSidePacket(t2, e3);
      }));
    }
    addStringToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        Go(this, t2, ((t3) => {
          this.i._addStringToInputSidePacket(t3, e3);
        }));
      }));
    }
    addProtoToInputSidePacket(t2, e2, n2) {
      Go(this, n2, ((n3) => {
        Go(this, e2, ((e3) => {
          const r2 = this.i._malloc(t2.length);
          this.i.HEAPU8.set(t2, r2), this.i._addProtoToInputSidePacket(r2, t2.length, e3, n3), this.i._free(r2);
        }));
      }));
    }
    addBoolVectorToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        const n2 = this.i._allocateBoolVector(t2.length);
        if (!n2) throw Error("Unable to allocate new bool vector on heap.");
        for (const e4 of t2) this.i._addBoolVectorEntry(n2, e4);
        this.i._addBoolVectorToInputSidePacket(n2, e3);
      }));
    }
    addDoubleVectorToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        const n2 = this.i._allocateDoubleVector(t2.length);
        if (!n2) throw Error("Unable to allocate new double vector on heap.");
        for (const e4 of t2) this.i._addDoubleVectorEntry(n2, e4);
        this.i._addDoubleVectorToInputSidePacket(n2, e3);
      }));
    }
    addFloatVectorToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        const n2 = this.i._allocateFloatVector(t2.length);
        if (!n2) throw Error("Unable to allocate new float vector on heap.");
        for (const e4 of t2) this.i._addFloatVectorEntry(n2, e4);
        this.i._addFloatVectorToInputSidePacket(n2, e3);
      }));
    }
    addIntVectorToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        const n2 = this.i._allocateIntVector(t2.length);
        if (!n2) throw Error("Unable to allocate new int vector on heap.");
        for (const e4 of t2) this.i._addIntVectorEntry(n2, e4);
        this.i._addIntVectorToInputSidePacket(n2, e3);
      }));
    }
    addUintVectorToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        const n2 = this.i._allocateUintVector(t2.length);
        if (!n2) throw Error("Unable to allocate new unsigned int vector on heap.");
        for (const e4 of t2) this.i._addUintVectorEntry(n2, e4);
        this.i._addUintVectorToInputSidePacket(n2, e3);
      }));
    }
    addStringVectorToInputSidePacket(t2, e2) {
      Go(this, e2, ((e3) => {
        const n2 = this.i._allocateStringVector(t2.length);
        if (!n2) throw Error("Unable to allocate new string vector on heap.");
        for (const e4 of t2) Go(this, e4, ((t3) => {
          this.i._addStringVectorEntry(n2, t3);
        }));
        this.i._addStringVectorToInputSidePacket(n2, e3);
      }));
    }
    attachBoolListener(t2, e2) {
      Xo(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachBoolListener(t3);
      }));
    }
    attachBoolVectorListener(t2, e2) {
      Ho(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachBoolVectorListener(t3);
      }));
    }
    attachIntListener(t2, e2) {
      Xo(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachIntListener(t3);
      }));
    }
    attachIntVectorListener(t2, e2) {
      Ho(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachIntVectorListener(t3);
      }));
    }
    attachUintListener(t2, e2) {
      Xo(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachUintListener(t3);
      }));
    }
    attachUintVectorListener(t2, e2) {
      Ho(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachUintVectorListener(t3);
      }));
    }
    attachDoubleListener(t2, e2) {
      Xo(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachDoubleListener(t3);
      }));
    }
    attachDoubleVectorListener(t2, e2) {
      Ho(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachDoubleVectorListener(t3);
      }));
    }
    attachFloatListener(t2, e2) {
      Xo(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachFloatListener(t3);
      }));
    }
    attachFloatVectorListener(t2, e2) {
      Ho(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachFloatVectorListener(t3);
      }));
    }
    attachStringListener(t2, e2) {
      Xo(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachStringListener(t3);
      }));
    }
    attachStringVectorListener(t2, e2) {
      Ho(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachStringVectorListener(t3);
      }));
    }
    attachProtoListener(t2, e2, n2) {
      Xo(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachProtoListener(t3, n2 || false);
      }));
    }
    attachProtoVectorListener(t2, e2, n2) {
      Ho(this, t2, e2), Go(this, t2, ((t3) => {
        this.i._attachProtoVectorListener(t3, n2 || false);
      }));
    }
    attachAudioListener(t2, e2, n2) {
      this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), Xo(this, t2, ((t3, n3) => {
        t3 = new Float32Array(t3.buffer, t3.byteOffset, t3.length / 4), e2(t3, n3);
      })), Go(this, t2, ((t3) => {
        this.i._attachAudioListener(t3, n2 || false);
      }));
    }
    finishProcessing() {
      this.i._waitUntilIdle();
    }
    closeGraph() {
      this.i._closeGraph(), this.i.simpleListeners = void 0, this.i.emptyPacketListeners = void 0;
    }
  }, class extends Ha {
    get ea() {
      return this.i;
    }
    oa(t2, e2, n2) {
      Go(this, e2, ((e3) => {
        const [r2, i2] = jo(this, t2, e3);
        this.ea._addBoundTextureAsImageToStream(e3, r2, i2, n2);
      }));
    }
    V(t2, e2) {
      Xo(this, t2, e2), Go(this, t2, ((t3) => {
        this.ea._attachImageListener(t3);
      }));
    }
    ba(t2, e2) {
      Ho(this, t2, e2), Go(this, t2, ((t3) => {
        this.ea._attachImageVectorListener(t3);
      }));
    }
  }));
  var Ha;
  var Wa = class extends Xa {
  };
  async function za(t2, e2, n2) {
    return (async function(t3, e3, n3, r2) {
      return Wo(t3, e3, n3, r2);
    })(t2, n2.canvas ?? (Do() ? void 0 : document.createElement("canvas")), e2, n2);
  }
  function Ka(t2, e2, n2, r2) {
    if (t2.U) {
      const s2 = new ms();
      if (n2?.regionOfInterest) {
        if (!t2.na) throw Error("This task doesn't support region-of-interest.");
        var i2 = n2.regionOfInterest;
        if (i2.left >= i2.right || i2.top >= i2.bottom) throw Error("Expected RectF with left < right and top < bottom.");
        if (i2.left < 0 || i2.top < 0 || i2.right > 1 || i2.bottom > 1) throw Error("Expected RectF values to be in [0,1].");
        An(s2, 1, (i2.left + i2.right) / 2), An(s2, 2, (i2.top + i2.bottom) / 2), An(s2, 4, i2.right - i2.left), An(s2, 3, i2.bottom - i2.top);
      } else An(s2, 1, 0.5), An(s2, 2, 0.5), An(s2, 4, 1), An(s2, 3, 1);
      if (n2?.rotationDegrees) {
        if (n2?.rotationDegrees % 90 != 0) throw Error("Expected rotation to be a multiple of 90\xB0.");
        if (An(s2, 5, -Math.PI * n2.rotationDegrees / 180), n2?.rotationDegrees % 180 != 0) {
          const [t3, r3] = Bo(e2);
          n2 = En(s2, 3) * r3 / t3, i2 = En(s2, 4) * t3 / r3, An(s2, 4, n2), An(s2, 3, i2);
        }
      }
      t2.g.addProtoToStream(s2.g(), "mediapipe.NormalizedRect", t2.U, r2);
    }
    t2.g.oa(e2, t2.Z, r2 ?? performance.now()), t2.finishProcessing();
  }
  function Ya(t2, e2, n2) {
    if (t2.baseOptions?.g()) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
    Ka(t2, e2, n2, t2.B + 1);
  }
  function $a(t2, e2, n2, r2) {
    if (!t2.baseOptions?.g()) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
    Ka(t2, e2, n2, r2);
  }
  function qa(t2, e2, n2, r2) {
    var i2 = e2.data;
    const s2 = e2.width, o2 = s2 * (e2 = e2.height);
    if ((i2 instanceof Uint8Array || i2 instanceof Float32Array) && i2.length !== o2) throw Error("Unsupported channel count: " + i2.length / o2);
    return t2 = new Ea([i2], n2, false, t2.g.i.canvas, t2.P, s2, e2), r2 ? t2.clone() : t2;
  }
  var Ja = class extends Zo {
    constructor(t2, e2, n2, r2) {
      super(t2), this.g = t2, this.Z = e2, this.U = n2, this.na = r2, this.P = new ca();
    }
    l(t2, e2 = true) {
      if ("runningMode" in t2 && wn(this.baseOptions, 2, !!t2.runningMode && "IMAGE" !== t2.runningMode), void 0 !== t2.canvas && this.g.i.canvas !== t2.canvas) throw Error("You must create a new task to reset the canvas.");
      return super.l(t2, e2);
    }
    close() {
      this.P.close(), super.close();
    }
  };
  Ja.prototype.close = Ja.prototype.close;
  var Za = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "image_in", "norm_rect_in", false), this.j = { detections: [] }, dn(t2 = this.h = new Cs(), 0, 1, e2 = new Is()), An(this.h, 2, 0.5), An(this.h, 3, 0.3);
    }
    get baseOptions() {
      return hn(this.h, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.h, 0, 1, t2);
    }
    o(t2) {
      return "minDetectionConfidence" in t2 && An(this.h, 2, t2.minDetectionConfidence ?? 0.5), "minSuppressionThreshold" in t2 && An(this.h, 3, t2.minSuppressionThreshold ?? 0.3), this.l(t2);
    }
    D(t2, e2) {
      return this.j = { detections: [] }, Ya(this, t2, e2), this.j;
    }
    F(t2, e2, n2) {
      return this.j = { detections: [] }, $a(this, t2, n2, e2), this.j;
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "image_in"), Ji(t2, "norm_rect_in"), Zi(t2, "detections");
      const e2 = new Gi();
      Yn(e2, Us, this.h);
      const n2 = new zi();
      Xi(n2, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), Hi(n2, "IMAGE:image_in"), Hi(n2, "NORM_RECT:norm_rect_in"), Wi(n2, "DETECTIONS:detections"), n2.o(e2), qi(t2, n2), this.g.attachProtoVectorListener("detections", ((t3, e3) => {
        for (const e4 of t3) t3 = hs(e4), this.j.detections.push(xo(t3));
        Yo(this, e3);
      })), this.g.attachEmptyPacketListener("detections", ((t3) => {
        Yo(this, t3);
      })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Za.prototype.detectForVideo = Za.prototype.F, Za.prototype.detect = Za.prototype.D, Za.prototype.setOptions = Za.prototype.o, Za.createFromModelPath = async function(t2, e2) {
    return za(Za, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Za.createFromModelBuffer = function(t2, e2) {
    return za(Za, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Za.createFromOptions = function(t2, e2) {
    return za(Za, t2, e2);
  };
  var Qa = Va([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]);
  var tc = Va([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]);
  var ec = Va([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]);
  var nc = Va([474, 475], [475, 476], [476, 477], [477, 474]);
  var rc = Va([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]);
  var ic = Va([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]);
  var sc = Va([469, 470], [470, 471], [471, 472], [472, 469]);
  var oc = Va([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]);
  var ac = [...Qa, ...tc, ...ec, ...rc, ...ic, ...oc];
  var cc = Va([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
  function hc(t2) {
    t2.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] };
  }
  var uc = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "image_in", "norm_rect", false), this.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = false, dn(t2 = this.h = new Bs(), 0, 1, e2 = new Is()), this.v = new Ns(), dn(this.h, 0, 3, this.v), this.s = new Cs(), dn(this.h, 0, 2, this.s), Tn(this.s, 4, 1), An(this.s, 2, 0.5), An(this.v, 2, 0.5), An(this.h, 4, 0.5);
    }
    get baseOptions() {
      return hn(this.h, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.h, 0, 1, t2);
    }
    o(t2) {
      return "numFaces" in t2 && Tn(this.s, 4, t2.numFaces ?? 1), "minFaceDetectionConfidence" in t2 && An(this.s, 2, t2.minFaceDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && An(this.h, 4, t2.minTrackingConfidence ?? 0.5), "minFacePresenceConfidence" in t2 && An(this.v, 2, t2.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in t2 && (this.outputFaceBlendshapes = !!t2.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in t2 && (this.outputFacialTransformationMatrixes = !!t2.outputFacialTransformationMatrixes), this.l(t2);
    }
    D(t2, e2) {
      return hc(this), Ya(this, t2, e2), this.j;
    }
    F(t2, e2, n2) {
      return hc(this), $a(this, t2, n2, e2), this.j;
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "image_in"), Ji(t2, "norm_rect"), Zi(t2, "face_landmarks");
      const e2 = new Gi();
      Yn(e2, Vs, this.h);
      const n2 = new zi();
      Xi(n2, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), Hi(n2, "IMAGE:image_in"), Hi(n2, "NORM_RECT:norm_rect"), Wi(n2, "NORM_LANDMARKS:face_landmarks"), n2.o(e2), qi(t2, n2), this.g.attachProtoVectorListener("face_landmarks", ((t3, e3) => {
        for (const e4 of t3) t3 = fs(e4), this.j.faceLandmarks.push(Lo(t3));
        Yo(this, e3);
      })), this.g.attachEmptyPacketListener("face_landmarks", ((t3) => {
        Yo(this, t3);
      })), this.outputFaceBlendshapes && (Zi(t2, "blendshapes"), Wi(n2, "BLENDSHAPES:blendshapes"), this.g.attachProtoVectorListener("blendshapes", ((t3, e3) => {
        if (this.outputFaceBlendshapes) for (const e4 of t3) t3 = ss(e4), this.j.faceBlendshapes.push(So(t3.g() ?? []));
        Yo(this, e3);
      })), this.g.attachEmptyPacketListener("blendshapes", ((t3) => {
        Yo(this, t3);
      }))), this.outputFacialTransformationMatrixes && (Zi(t2, "face_geometry"), Wi(n2, "FACE_GEOMETRY:face_geometry"), this.g.attachProtoVectorListener("face_geometry", ((t3, e3) => {
        if (this.outputFacialTransformationMatrixes) for (const e4 of t3) (t3 = hn(Ds(e4), ps, 2)) && this.j.facialTransformationMatrixes.push({ rows: _n(t3, 1) ?? 0 ?? 0, columns: _n(t3, 2) ?? 0 ?? 0, data: $e(t3, 3, qt, Ye()).slice() ?? [] });
        Yo(this, e3);
      })), this.g.attachEmptyPacketListener("face_geometry", ((t3) => {
        Yo(this, t3);
      }))), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  uc.prototype.detectForVideo = uc.prototype.F, uc.prototype.detect = uc.prototype.D, uc.prototype.setOptions = uc.prototype.o, uc.createFromModelPath = function(t2, e2) {
    return za(uc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, uc.createFromModelBuffer = function(t2, e2) {
    return za(uc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, uc.createFromOptions = function(t2, e2) {
    return za(uc, t2, e2);
  }, uc.FACE_LANDMARKS_LIPS = Qa, uc.FACE_LANDMARKS_LEFT_EYE = tc, uc.FACE_LANDMARKS_LEFT_EYEBROW = ec, uc.FACE_LANDMARKS_LEFT_IRIS = nc, uc.FACE_LANDMARKS_RIGHT_EYE = rc, uc.FACE_LANDMARKS_RIGHT_EYEBROW = ic, uc.FACE_LANDMARKS_RIGHT_IRIS = sc, uc.FACE_LANDMARKS_FACE_OVAL = oc, uc.FACE_LANDMARKS_CONTOURS = ac, uc.FACE_LANDMARKS_TESSELATION = cc;
  var lc = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "image_in", "norm_rect", true), dn(t2 = this.j = new Xs(), 0, 1, e2 = new Is());
    }
    get baseOptions() {
      return hn(this.j, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.j, 0, 1, t2);
    }
    o(t2) {
      return super.l(t2);
    }
    Ka(t2, e2, n2) {
      const r2 = "function" != typeof e2 ? e2 : {};
      if (this.h = "function" == typeof e2 ? e2 : n2, Ya(this, t2, r2 ?? {}), !this.h) return this.s;
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "image_in"), Ji(t2, "norm_rect"), Zi(t2, "stylized_image");
      const e2 = new Gi();
      Yn(e2, Hs, this.j);
      const n2 = new zi();
      Xi(n2, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"), Hi(n2, "IMAGE:image_in"), Hi(n2, "NORM_RECT:norm_rect"), Wi(n2, "STYLIZED_IMAGE:stylized_image"), n2.o(e2), qi(t2, n2), this.g.V("stylized_image", ((t3, e3) => {
        var n3 = !this.h, r2 = t3.data, i2 = t3.width;
        const s2 = i2 * (t3 = t3.height);
        if (r2 instanceof Uint8Array) if (r2.length === 3 * s2) {
          const e4 = new Uint8ClampedArray(4 * s2);
          for (let t4 = 0; t4 < s2; ++t4) e4[4 * t4] = r2[3 * t4], e4[4 * t4 + 1] = r2[3 * t4 + 1], e4[4 * t4 + 2] = r2[3 * t4 + 2], e4[4 * t4 + 3] = 255;
          r2 = new ImageData(e4, i2, t3);
        } else {
          if (r2.length !== 4 * s2) throw Error("Unsupported channel count: " + r2.length / s2);
          r2 = new ImageData(new Uint8ClampedArray(r2.buffer, r2.byteOffset, r2.length), i2, t3);
        }
        else if (!(r2 instanceof WebGLTexture)) throw Error(`Unsupported format: ${r2.constructor.name}`);
        i2 = new Ga([r2], false, false, this.g.i.canvas, this.P, i2, t3), this.s = n3 = n3 ? i2.clone() : i2, this.h && this.h(n3), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("stylized_image", ((t3) => {
        this.s = null, this.h && this.h(null), Yo(this, t3);
      })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  lc.prototype.stylize = lc.prototype.Ka, lc.prototype.setOptions = lc.prototype.o, lc.createFromModelPath = function(t2, e2) {
    return za(lc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, lc.createFromModelBuffer = function(t2, e2) {
    return za(lc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, lc.createFromOptions = function(t2, e2) {
    return za(lc, t2, e2);
  };
  var dc = Va([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
  function fc(t2) {
    t2.gestures = [], t2.landmarks = [], t2.worldLandmarks = [], t2.handedness = [];
  }
  function pc(t2) {
    return 0 === t2.gestures.length ? { gestures: [], landmarks: [], worldLandmarks: [], handedness: [], handednesses: [] } : { gestures: t2.gestures, landmarks: t2.landmarks, worldLandmarks: t2.worldLandmarks, handedness: t2.handedness, handednesses: t2.handedness };
  }
  function gc(t2, e2 = true) {
    const n2 = [];
    for (const i2 of t2) {
      var r2 = ss(i2);
      t2 = [];
      for (const n3 of r2.g()) r2 = e2 && null != _n(n3, 1) ? _n(n3, 1) ?? 0 : -1, t2.push({ score: En(n3, 2) ?? 0, index: r2, categoryName: vn(n3, 3) ?? "" ?? "", displayName: vn(n3, 4) ?? "" ?? "" });
      n2.push(t2);
    }
    return n2;
  }
  var mc = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "image_in", "norm_rect", false), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], dn(t2 = this.j = new Js(), 0, 1, e2 = new Is()), this.s = new qs(), dn(this.j, 0, 2, this.s), this.C = new $s(), dn(this.s, 0, 3, this.C), this.v = new Ys(), dn(this.s, 0, 2, this.v), this.h = new Ks(), dn(this.j, 0, 3, this.h), An(this.v, 2, 0.5), An(this.s, 4, 0.5), An(this.C, 2, 0.5);
    }
    get baseOptions() {
      return hn(this.j, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.j, 0, 1, t2);
    }
    o(t2) {
      if (Tn(this.v, 3, t2.numHands ?? 1), "minHandDetectionConfidence" in t2 && An(this.v, 2, t2.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && An(this.s, 4, t2.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in t2 && An(this.C, 2, t2.minHandPresenceConfidence ?? 0.5), t2.cannedGesturesClassifierOptions) {
        var e2 = new Ws(), n2 = e2, r2 = ko(t2.cannedGesturesClassifierOptions, hn(this.h, Ws, 3)?.h());
        dn(n2, 0, 2, r2), dn(this.h, 0, 3, e2);
      } else void 0 === t2.cannedGesturesClassifierOptions && hn(this.h, Ws, 3)?.g();
      return t2.customGesturesClassifierOptions ? (dn(n2 = e2 = new Ws(), 0, 2, r2 = ko(t2.customGesturesClassifierOptions, hn(this.h, Ws, 4)?.h())), dn(this.h, 0, 4, e2)) : void 0 === t2.customGesturesClassifierOptions && hn(this.h, Ws, 4)?.g(), this.l(t2);
    }
    Fa(t2, e2) {
      return fc(this), Ya(this, t2, e2), pc(this);
    }
    Ga(t2, e2, n2) {
      return fc(this), $a(this, t2, n2, e2), pc(this);
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "image_in"), Ji(t2, "norm_rect"), Zi(t2, "hand_gestures"), Zi(t2, "hand_landmarks"), Zi(t2, "world_hand_landmarks"), Zi(t2, "handedness");
      const e2 = new Gi();
      Yn(e2, no, this.j);
      const n2 = new zi();
      Xi(n2, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), Hi(n2, "IMAGE:image_in"), Hi(n2, "NORM_RECT:norm_rect"), Wi(n2, "HAND_GESTURES:hand_gestures"), Wi(n2, "LANDMARKS:hand_landmarks"), Wi(n2, "WORLD_LANDMARKS:world_hand_landmarks"), Wi(n2, "HANDEDNESS:handedness"), n2.o(e2), qi(t2, n2), this.g.attachProtoVectorListener("hand_landmarks", ((t3, e3) => {
        for (const e4 of t3) {
          t3 = fs(e4);
          const n3 = [];
          for (const e5 of ln(t3, ds, 1)) n3.push({ x: En(e5, 1) ?? 0, y: En(e5, 2) ?? 0, z: En(e5, 3) ?? 0, visibility: En(e5, 4) ?? 0 });
          this.landmarks.push(n3);
        }
        Yo(this, e3);
      })), this.g.attachEmptyPacketListener("hand_landmarks", ((t3) => {
        Yo(this, t3);
      })), this.g.attachProtoVectorListener("world_hand_landmarks", ((t3, e3) => {
        for (const e4 of t3) {
          t3 = ls(e4);
          const n3 = [];
          for (const e5 of ln(t3, us, 1)) n3.push({ x: En(e5, 1) ?? 0, y: En(e5, 2) ?? 0, z: En(e5, 3) ?? 0, visibility: En(e5, 4) ?? 0 });
          this.worldLandmarks.push(n3);
        }
        Yo(this, e3);
      })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((t3) => {
        Yo(this, t3);
      })), this.g.attachProtoVectorListener("hand_gestures", ((t3, e3) => {
        this.gestures.push(...gc(t3, false)), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("hand_gestures", ((t3) => {
        Yo(this, t3);
      })), this.g.attachProtoVectorListener("handedness", ((t3, e3) => {
        this.handedness.push(...gc(t3)), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("handedness", ((t3) => {
        Yo(this, t3);
      })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  function yc(t2) {
    return { landmarks: t2.landmarks, worldLandmarks: t2.worldLandmarks, handednesses: t2.handedness, handedness: t2.handedness };
  }
  mc.prototype.recognizeForVideo = mc.prototype.Ga, mc.prototype.recognize = mc.prototype.Fa, mc.prototype.setOptions = mc.prototype.o, mc.createFromModelPath = function(t2, e2) {
    return za(mc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, mc.createFromModelBuffer = function(t2, e2) {
    return za(mc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, mc.createFromOptions = function(t2, e2) {
    return za(mc, t2, e2);
  }, mc.HAND_CONNECTIONS = dc;
  var _c = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "image_in", "norm_rect", false), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], dn(t2 = this.h = new qs(), 0, 1, e2 = new Is()), this.s = new $s(), dn(this.h, 0, 3, this.s), this.j = new Ys(), dn(this.h, 0, 2, this.j), Tn(this.j, 3, 1), An(this.j, 2, 0.5), An(this.s, 2, 0.5), An(this.h, 4, 0.5);
    }
    get baseOptions() {
      return hn(this.h, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.h, 0, 1, t2);
    }
    o(t2) {
      return "numHands" in t2 && Tn(this.j, 3, t2.numHands ?? 1), "minHandDetectionConfidence" in t2 && An(this.j, 2, t2.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && An(this.h, 4, t2.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in t2 && An(this.s, 2, t2.minHandPresenceConfidence ?? 0.5), this.l(t2);
    }
    D(t2, e2) {
      return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Ya(this, t2, e2), yc(this);
    }
    F(t2, e2, n2) {
      return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], $a(this, t2, n2, e2), yc(this);
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "image_in"), Ji(t2, "norm_rect"), Zi(t2, "hand_landmarks"), Zi(t2, "world_hand_landmarks"), Zi(t2, "handedness");
      const e2 = new Gi();
      Yn(e2, ro, this.h);
      const n2 = new zi();
      Xi(n2, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), Hi(n2, "IMAGE:image_in"), Hi(n2, "NORM_RECT:norm_rect"), Wi(n2, "LANDMARKS:hand_landmarks"), Wi(n2, "WORLD_LANDMARKS:world_hand_landmarks"), Wi(n2, "HANDEDNESS:handedness"), n2.o(e2), qi(t2, n2), this.g.attachProtoVectorListener("hand_landmarks", ((t3, e3) => {
        for (const e4 of t3) t3 = fs(e4), this.landmarks.push(Lo(t3));
        Yo(this, e3);
      })), this.g.attachEmptyPacketListener("hand_landmarks", ((t3) => {
        Yo(this, t3);
      })), this.g.attachProtoVectorListener("world_hand_landmarks", ((t3, e3) => {
        for (const e4 of t3) t3 = ls(e4), this.worldLandmarks.push(Ro(t3));
        Yo(this, e3);
      })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((t3) => {
        Yo(this, t3);
      })), this.g.attachProtoVectorListener("handedness", ((t3, e3) => {
        var n3 = this.handedness, r2 = n3.push;
        const i2 = [];
        for (const e4 of t3) {
          t3 = ss(e4);
          const n4 = [];
          for (const e5 of t3.g()) n4.push({ score: En(e5, 2) ?? 0, index: _n(e5, 1) ?? 0 ?? -1, categoryName: vn(e5, 3) ?? "" ?? "", displayName: vn(e5, 4) ?? "" ?? "" });
          i2.push(n4);
        }
        r2.call(n3, ...i2), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("handedness", ((t3) => {
        Yo(this, t3);
      })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  _c.prototype.detectForVideo = _c.prototype.F, _c.prototype.detect = _c.prototype.D, _c.prototype.setOptions = _c.prototype.o, _c.createFromModelPath = function(t2, e2) {
    return za(_c, t2, { baseOptions: { modelAssetPath: e2 } });
  }, _c.createFromModelBuffer = function(t2, e2) {
    return za(_c, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, _c.createFromOptions = function(t2, e2) {
    return za(_c, t2, e2);
  }, _c.HAND_CONNECTIONS = dc;
  var vc = Va([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
  function Ec(t2) {
    t2.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] };
  }
  function wc(t2) {
    try {
      if (!t2.C) return t2.h;
      t2.C(t2.h);
    } finally {
      Jo(t2);
    }
  }
  function Tc(t2, e2) {
    t2 = fs(t2), e2.push(Lo(t2));
  }
  var Ac = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "input_frames_image", null, false), this.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = false, dn(t2 = this.j = new ao(), 0, 1, e2 = new Is()), this.K = new $s(), dn(this.j, 0, 2, this.K), this.Y = new io(), dn(this.j, 0, 3, this.Y), this.s = new Cs(), dn(this.j, 0, 4, this.s), this.H = new Ns(), dn(this.j, 0, 5, this.H), this.v = new so(), dn(this.j, 0, 6, this.v), this.L = new oo(), dn(this.j, 0, 7, this.L), An(this.s, 2, 0.5), An(this.s, 3, 0.3), An(this.H, 2, 0.5), An(this.v, 2, 0.5), An(this.v, 3, 0.3), An(this.L, 2, 0.5), An(this.K, 2, 0.5);
    }
    get baseOptions() {
      return hn(this.j, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.j, 0, 1, t2);
    }
    o(t2) {
      return "minFaceDetectionConfidence" in t2 && An(this.s, 2, t2.minFaceDetectionConfidence ?? 0.5), "minFaceSuppressionThreshold" in t2 && An(this.s, 3, t2.minFaceSuppressionThreshold ?? 0.3), "minFacePresenceConfidence" in t2 && An(this.H, 2, t2.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in t2 && (this.outputFaceBlendshapes = !!t2.outputFaceBlendshapes), "minPoseDetectionConfidence" in t2 && An(this.v, 2, t2.minPoseDetectionConfidence ?? 0.5), "minPoseSuppressionThreshold" in t2 && An(this.v, 3, t2.minPoseSuppressionThreshold ?? 0.3), "minPosePresenceConfidence" in t2 && An(this.L, 2, t2.minPosePresenceConfidence ?? 0.5), "outputPoseSegmentationMasks" in t2 && (this.outputPoseSegmentationMasks = !!t2.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in t2 && An(this.K, 2, t2.minHandLandmarksConfidence ?? 0.5), this.l(t2);
    }
    D(t2, e2, n2) {
      const r2 = "function" != typeof e2 ? e2 : {};
      return this.C = "function" == typeof e2 ? e2 : n2, Ec(this), Ya(this, t2, r2), wc(this);
    }
    F(t2, e2, n2, r2) {
      const i2 = "function" != typeof n2 ? n2 : {};
      return this.C = "function" == typeof n2 ? n2 : r2, Ec(this), $a(this, t2, i2, e2), wc(this);
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "input_frames_image"), Zi(t2, "pose_landmarks"), Zi(t2, "pose_world_landmarks"), Zi(t2, "face_landmarks"), Zi(t2, "left_hand_landmarks"), Zi(t2, "left_hand_world_landmarks"), Zi(t2, "right_hand_landmarks"), Zi(t2, "right_hand_world_landmarks");
      const e2 = new Gi(), n2 = new xi();
      tn(n2, 1, de("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), ""), (function(t3, e3) {
        if (null != e3) if (Array.isArray(e3)) He(t3, 2, Pe(e3, Oe, void 0, void 0, false));
        else {
          if (!("string" == typeof e3 || e3 instanceof N || C(e3))) throw Error("invalid value in Any.value field: " + e3 + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
          tn(t3, 2, dt(e3, false), U());
        }
      })(n2, this.j.g());
      const r2 = new zi();
      Xi(r2, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), yn(r2, 8, xi, n2), Hi(r2, "IMAGE:input_frames_image"), Wi(r2, "POSE_LANDMARKS:pose_landmarks"), Wi(r2, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), Wi(r2, "FACE_LANDMARKS:face_landmarks"), Wi(r2, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), Wi(r2, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), Wi(r2, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), Wi(r2, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), r2.o(e2), qi(t2, r2), $o(this, t2), this.g.attachProtoListener("pose_landmarks", ((t3, e3) => {
        Tc(t3, this.h.poseLandmarks), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("pose_landmarks", ((t3) => {
        Yo(this, t3);
      })), this.g.attachProtoListener("pose_world_landmarks", ((t3, e3) => {
        var n3 = this.h.poseWorldLandmarks;
        t3 = ls(t3), n3.push(Ro(t3)), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("pose_world_landmarks", ((t3) => {
        Yo(this, t3);
      })), this.outputPoseSegmentationMasks && (Wi(r2, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), qo(this, "pose_segmentation_mask"), this.g.V("pose_segmentation_mask", ((t3, e3) => {
        this.h.poseSegmentationMasks = [qa(this, t3, true, !this.C)], Yo(this, e3);
      })), this.g.attachEmptyPacketListener("pose_segmentation_mask", ((t3) => {
        this.h.poseSegmentationMasks = [], Yo(this, t3);
      }))), this.g.attachProtoListener("face_landmarks", ((t3, e3) => {
        Tc(t3, this.h.faceLandmarks), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("face_landmarks", ((t3) => {
        Yo(this, t3);
      })), this.outputFaceBlendshapes && (Zi(t2, "extra_blendshapes"), Wi(r2, "FACE_BLENDSHAPES:extra_blendshapes"), this.g.attachProtoListener("extra_blendshapes", ((t3, e3) => {
        var n3 = this.h.faceBlendshapes;
        this.outputFaceBlendshapes && (t3 = ss(t3), n3.push(So(t3.g() ?? []))), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("extra_blendshapes", ((t3) => {
        Yo(this, t3);
      }))), this.g.attachProtoListener("left_hand_landmarks", ((t3, e3) => {
        Tc(t3, this.h.leftHandLandmarks), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("left_hand_landmarks", ((t3) => {
        Yo(this, t3);
      })), this.g.attachProtoListener("left_hand_world_landmarks", ((t3, e3) => {
        var n3 = this.h.leftHandWorldLandmarks;
        t3 = ls(t3), n3.push(Ro(t3)), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("left_hand_world_landmarks", ((t3) => {
        Yo(this, t3);
      })), this.g.attachProtoListener("right_hand_landmarks", ((t3, e3) => {
        Tc(t3, this.h.rightHandLandmarks), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("right_hand_landmarks", ((t3) => {
        Yo(this, t3);
      })), this.g.attachProtoListener("right_hand_world_landmarks", ((t3, e3) => {
        var n3 = this.h.rightHandWorldLandmarks;
        t3 = ls(t3), n3.push(Ro(t3)), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("right_hand_world_landmarks", ((t3) => {
        Yo(this, t3);
      })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Ac.prototype.detectForVideo = Ac.prototype.F, Ac.prototype.detect = Ac.prototype.D, Ac.prototype.setOptions = Ac.prototype.o, Ac.createFromModelPath = function(t2, e2) {
    return za(Ac, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Ac.createFromModelBuffer = function(t2, e2) {
    return za(Ac, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Ac.createFromOptions = function(t2, e2) {
    return za(Ac, t2, e2);
  }, Ac.HAND_CONNECTIONS = dc, Ac.POSE_CONNECTIONS = vc, Ac.FACE_LANDMARKS_LIPS = Qa, Ac.FACE_LANDMARKS_LEFT_EYE = tc, Ac.FACE_LANDMARKS_LEFT_EYEBROW = ec, Ac.FACE_LANDMARKS_LEFT_IRIS = nc, Ac.FACE_LANDMARKS_RIGHT_EYE = rc, Ac.FACE_LANDMARKS_RIGHT_EYEBROW = ic, Ac.FACE_LANDMARKS_RIGHT_IRIS = sc, Ac.FACE_LANDMARKS_FACE_OVAL = oc, Ac.FACE_LANDMARKS_CONTOURS = ac, Ac.FACE_LANDMARKS_TESSELATION = cc;
  var bc = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "input_image", "norm_rect", true), this.j = { classifications: [] }, dn(t2 = this.h = new uo(), 0, 1, e2 = new Is());
    }
    get baseOptions() {
      return hn(this.h, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.h, 0, 1, t2);
    }
    o(t2) {
      return dn(this.h, 0, 2, ko(t2, hn(this.h, bs, 2))), this.l(t2);
    }
    qa(t2, e2) {
      return this.j = { classifications: [] }, Ya(this, t2, e2), this.j;
    }
    ra(t2, e2, n2) {
      return this.j = { classifications: [] }, $a(this, t2, n2, e2), this.j;
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "input_image"), Ji(t2, "norm_rect"), Zi(t2, "classifications");
      const e2 = new Gi();
      Yn(e2, lo, this.h);
      const n2 = new zi();
      Xi(n2, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), Hi(n2, "IMAGE:input_image"), Hi(n2, "NORM_RECT:norm_rect"), Wi(n2, "CLASSIFICATIONS:classifications"), n2.o(e2), qi(t2, n2), this.g.attachProtoListener("classifications", ((t3, e3) => {
        this.j = (function(t4) {
          const e4 = { classifications: ln(t4, ys, 1).map(((t5) => So(hn(t5, rs, 4)?.g() ?? [], _n(t5, 2) ?? 0, vn(t5, 3) ?? ""))) };
          return null != he(Ve(t4, 2)) && (e4.timestampMs = he(Ve(t4, 2)) ?? 0), e4;
        })(_s(t3)), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("classifications", ((t3) => {
        Yo(this, t3);
      })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  bc.prototype.classifyForVideo = bc.prototype.ra, bc.prototype.classify = bc.prototype.qa, bc.prototype.setOptions = bc.prototype.o, bc.createFromModelPath = function(t2, e2) {
    return za(bc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, bc.createFromModelBuffer = function(t2, e2) {
    return za(bc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, bc.createFromOptions = function(t2, e2) {
    return za(bc, t2, e2);
  };
  var kc = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "image_in", "norm_rect", true), this.h = new fo(), this.embeddings = { embeddings: [] }, dn(t2 = this.h, 0, 1, e2 = new Is());
    }
    get baseOptions() {
      return hn(this.h, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.h, 0, 1, t2);
    }
    o(t2) {
      var e2 = this.h, n2 = hn(this.h, Ss, 2);
      return n2 = n2 ? n2.clone() : new Ss(), void 0 !== t2.l2Normalize ? wn(n2, 1, t2.l2Normalize) : "l2Normalize" in t2 && He(n2, 1), void 0 !== t2.quantize ? wn(n2, 2, t2.quantize) : "quantize" in t2 && He(n2, 2), dn(e2, 0, 2, n2), this.l(t2);
    }
    xa(t2, e2) {
      return Ya(this, t2, e2), this.embeddings;
    }
    ya(t2, e2, n2) {
      return $a(this, t2, n2, e2), this.embeddings;
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "image_in"), Ji(t2, "norm_rect"), Zi(t2, "embeddings_out");
      const e2 = new Gi();
      Yn(e2, po, this.h);
      const n2 = new zi();
      Xi(n2, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), Hi(n2, "IMAGE:image_in"), Hi(n2, "NORM_RECT:norm_rect"), Wi(n2, "EMBEDDINGS:embeddings_out"), n2.o(e2), qi(t2, n2), this.g.attachProtoListener("embeddings_out", ((t3, e3) => {
        t3 = As(t3), this.embeddings = (function(t4) {
          return { embeddings: ln(t4, ws, 1).map(((t5) => {
            const e4 = { headIndex: _n(t5, 3) ?? 0 ?? -1, headName: vn(t5, 4) ?? "" ?? "" };
            if (void 0 !== cn(t5, vs, nn(t5, 1))) t5 = $e(t5 = hn(t5, vs, nn(t5, 1)), 1, qt, Ye()), e4.floatEmbedding = t5.slice();
            else {
              const n3 = new Uint8Array(0);
              e4.quantizedEmbedding = hn(t5, Es, nn(t5, 2))?.ma()?.h() ?? n3;
            }
            return e4;
          })), timestampMs: he(Ve(t4, 2)) ?? 0 };
        })(t3), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("embeddings_out", ((t3) => {
        Yo(this, t3);
      })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  kc.cosineSimilarity = function(t2, e2) {
    if (t2.floatEmbedding && e2.floatEmbedding) t2 = Io(t2.floatEmbedding, e2.floatEmbedding);
    else {
      if (!t2.quantizedEmbedding || !e2.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
      t2 = Io(Fo(t2.quantizedEmbedding), Fo(e2.quantizedEmbedding));
    }
    return t2;
  }, kc.prototype.embedForVideo = kc.prototype.ya, kc.prototype.embed = kc.prototype.xa, kc.prototype.setOptions = kc.prototype.o, kc.createFromModelPath = function(t2, e2) {
    return za(kc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, kc.createFromModelBuffer = function(t2, e2) {
    return za(kc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, kc.createFromOptions = function(t2, e2) {
    return za(kc, t2, e2);
  };
  var Sc = class {
    constructor(t2, e2, n2) {
      this.confidenceMasks = t2, this.categoryMask = e2, this.qualityScores = n2;
    }
    close() {
      this.confidenceMasks?.forEach(((t2) => {
        t2.close();
      })), this.categoryMask?.close();
    }
  };
  function xc(t2) {
    t2.categoryMask = void 0, t2.confidenceMasks = void 0, t2.qualityScores = void 0;
  }
  function Lc(t2) {
    try {
      const e2 = new Sc(t2.confidenceMasks, t2.categoryMask, t2.qualityScores);
      if (!t2.j) return e2;
      t2.j(e2);
    } finally {
      Jo(t2);
    }
  }
  Sc.prototype.close = Sc.prototype.close;
  var Rc = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "image_in", "norm_rect", false), this.s = [], this.outputCategoryMask = false, this.outputConfidenceMasks = true, this.h = new vo(), this.v = new go(), dn(this.h, 0, 3, this.v), dn(t2 = this.h, 0, 1, e2 = new Is());
    }
    get baseOptions() {
      return hn(this.h, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.h, 0, 1, t2);
    }
    o(t2) {
      return void 0 !== t2.displayNamesLocale ? He(this.h, 2, de(t2.displayNamesLocale)) : "displayNamesLocale" in t2 && He(this.h, 2), "outputCategoryMask" in t2 && (this.outputCategoryMask = t2.outputCategoryMask ?? false), "outputConfidenceMasks" in t2 && (this.outputConfidenceMasks = t2.outputConfidenceMasks ?? true), super.l(t2);
    }
    J() {
      !(function(t2) {
        const e2 = ln(t2.ca(), zi, 1).filter(((t3) => (vn(t3, 1) ?? "").includes("mediapipe.tasks.TensorsToSegmentationCalculator")));
        if (t2.s = [], e2.length > 1) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
        1 === e2.length && (hn(e2[0], Gi, 7)?.l()?.g() ?? /* @__PURE__ */ new Map()).forEach(((e3, n2) => {
          t2.s[Number(n2)] = vn(e3, 1) ?? "";
        }));
      })(this);
    }
    segment(t2, e2, n2) {
      const r2 = "function" != typeof e2 ? e2 : {};
      return this.j = "function" == typeof e2 ? e2 : n2, xc(this), Ya(this, t2, r2), Lc(this);
    }
    Ia(t2, e2, n2, r2) {
      const i2 = "function" != typeof n2 ? n2 : {};
      return this.j = "function" == typeof n2 ? n2 : r2, xc(this), $a(this, t2, i2, e2), Lc(this);
    }
    Ba() {
      return this.s;
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "image_in"), Ji(t2, "norm_rect");
      const e2 = new Gi();
      Yn(e2, Eo, this.h);
      const n2 = new zi();
      Xi(n2, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), Hi(n2, "IMAGE:image_in"), Hi(n2, "NORM_RECT:norm_rect"), n2.o(e2), qi(t2, n2), $o(this, t2), this.outputConfidenceMasks && (Zi(t2, "confidence_masks"), Wi(n2, "CONFIDENCE_MASKS:confidence_masks"), qo(this, "confidence_masks"), this.g.ba("confidence_masks", ((t3, e3) => {
        this.confidenceMasks = t3.map(((t4) => qa(this, t4, true, !this.j))), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("confidence_masks", ((t3) => {
        this.confidenceMasks = [], Yo(this, t3);
      }))), this.outputCategoryMask && (Zi(t2, "category_mask"), Wi(n2, "CATEGORY_MASK:category_mask"), qo(this, "category_mask"), this.g.V("category_mask", ((t3, e3) => {
        this.categoryMask = qa(this, t3, false, !this.j), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("category_mask", ((t3) => {
        this.categoryMask = void 0, Yo(this, t3);
      }))), Zi(t2, "quality_scores"), Wi(n2, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((t3, e3) => {
        this.qualityScores = t3, Yo(this, e3);
      })), this.g.attachEmptyPacketListener("quality_scores", ((t3) => {
        this.categoryMask = void 0, Yo(this, t3);
      })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Rc.prototype.getLabels = Rc.prototype.Ba, Rc.prototype.segmentForVideo = Rc.prototype.Ia, Rc.prototype.segment = Rc.prototype.segment, Rc.prototype.setOptions = Rc.prototype.o, Rc.createFromModelPath = function(t2, e2) {
    return za(Rc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Rc.createFromModelBuffer = function(t2, e2) {
    return za(Rc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Rc.createFromOptions = function(t2, e2) {
    return za(Rc, t2, e2);
  };
  var Fc = class {
    constructor(t2, e2, n2) {
      this.confidenceMasks = t2, this.categoryMask = e2, this.qualityScores = n2;
    }
    close() {
      this.confidenceMasks?.forEach(((t2) => {
        t2.close();
      })), this.categoryMask?.close();
    }
  };
  Fc.prototype.close = Fc.prototype.close;
  var Ic = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Mc = [0, hi, -2];
  var Pc = [0, ni, -3, di, ni, -1];
  var Cc = [0, Pc];
  var Oc = [0, Pc, hi, -1];
  var Uc = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Dc = [0, ni, -1, di];
  var Nc = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Bc = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  var Gc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15];
  var jc = class extends $n {
    constructor(t2) {
      super(t2);
    }
  };
  jc.prototype.g = Si([0, yi, [0, Gc, _i, Pc, _i, [0, Pc, Mc], _i, Cc, _i, [0, Cc, Mc], _i, Dc, _i, [0, ni, -3, di, Ti], _i, [0, ni, -3, di], _i, [0, mi, ni, -2, di, hi, di, -1, 2, ni, Mc], _i, Oc, _i, [0, Oc, Mc], ni, Mc, mi, _i, [0, ni, -3, di, Mc, -1], _i, [0, yi, Dc]], mi, [0, mi, hi, -1, di]]);
  var Vc = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "image_in", "norm_rect_in", false), this.outputCategoryMask = false, this.outputConfidenceMasks = true, this.h = new vo(), this.s = new go(), dn(this.h, 0, 3, this.s), dn(t2 = this.h, 0, 1, e2 = new Is());
    }
    get baseOptions() {
      return hn(this.h, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.h, 0, 1, t2);
    }
    o(t2) {
      return "outputCategoryMask" in t2 && (this.outputCategoryMask = t2.outputCategoryMask ?? false), "outputConfidenceMasks" in t2 && (this.outputConfidenceMasks = t2.outputConfidenceMasks ?? true), super.l(t2);
    }
    segment(t2, e2, n2, r2) {
      const i2 = "function" != typeof n2 ? n2 : {};
      this.j = "function" == typeof n2 ? n2 : r2, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, n2 = this.B + 1, r2 = new jc();
      const s2 = new Bc();
      var o2 = new Ic();
      if (Tn(o2, 1, 255), dn(s2, 0, 12, o2), e2.keypoint && e2.scribble) throw Error("Cannot provide both keypoint and scribble.");
      if (e2.keypoint) {
        var a2 = new Uc();
        wn(a2, 3, true), An(a2, 1, e2.keypoint.x), An(a2, 2, e2.keypoint.y), fn(s2, 5, Gc, a2);
      } else {
        if (!e2.scribble) throw Error("Must provide either a keypoint or a scribble.");
        for (a2 of (o2 = new Nc(), e2.scribble)) wn(e2 = new Uc(), 3, true), An(e2, 1, a2.x), An(e2, 2, a2.y), yn(o2, 1, Uc, e2);
        fn(s2, 15, Gc, o2);
      }
      yn(r2, 1, Bc, s2), this.g.addProtoToStream(r2.g(), "drishti.RenderData", "roi_in", n2), Ya(this, t2, i2);
      t: {
        try {
          const t3 = new Fc(this.confidenceMasks, this.categoryMask, this.qualityScores);
          if (!this.j) {
            var c2 = t3;
            break t;
          }
          this.j(t3);
        } finally {
          Jo(this);
        }
        c2 = void 0;
      }
      return c2;
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "image_in"), Ji(t2, "roi_in"), Ji(t2, "norm_rect_in");
      const e2 = new Gi();
      Yn(e2, Eo, this.h);
      const n2 = new zi();
      Xi(n2, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"), Hi(n2, "IMAGE:image_in"), Hi(n2, "ROI:roi_in"), Hi(n2, "NORM_RECT:norm_rect_in"), n2.o(e2), qi(t2, n2), $o(this, t2), this.outputConfidenceMasks && (Zi(t2, "confidence_masks"), Wi(n2, "CONFIDENCE_MASKS:confidence_masks"), qo(this, "confidence_masks"), this.g.ba("confidence_masks", ((t3, e3) => {
        this.confidenceMasks = t3.map(((t4) => qa(this, t4, true, !this.j))), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("confidence_masks", ((t3) => {
        this.confidenceMasks = [], Yo(this, t3);
      }))), this.outputCategoryMask && (Zi(t2, "category_mask"), Wi(n2, "CATEGORY_MASK:category_mask"), qo(this, "category_mask"), this.g.V("category_mask", ((t3, e3) => {
        this.categoryMask = qa(this, t3, false, !this.j), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("category_mask", ((t3) => {
        this.categoryMask = void 0, Yo(this, t3);
      }))), Zi(t2, "quality_scores"), Wi(n2, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((t3, e3) => {
        this.qualityScores = t3, Yo(this, e3);
      })), this.g.attachEmptyPacketListener("quality_scores", ((t3) => {
        this.categoryMask = void 0, Yo(this, t3);
      })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Vc.prototype.segment = Vc.prototype.segment, Vc.prototype.setOptions = Vc.prototype.o, Vc.createFromModelPath = function(t2, e2) {
    return za(Vc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Vc.createFromModelBuffer = function(t2, e2) {
    return za(Vc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Vc.createFromOptions = function(t2, e2) {
    return za(Vc, t2, e2);
  };
  var Xc = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "input_frame_gpu", "norm_rect", false), this.j = { detections: [] }, dn(t2 = this.h = new wo(), 0, 1, e2 = new Is());
    }
    get baseOptions() {
      return hn(this.h, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.h, 0, 1, t2);
    }
    o(t2) {
      return void 0 !== t2.displayNamesLocale ? He(this.h, 2, de(t2.displayNamesLocale)) : "displayNamesLocale" in t2 && He(this.h, 2), void 0 !== t2.maxResults ? Tn(this.h, 3, t2.maxResults) : "maxResults" in t2 && He(this.h, 3), void 0 !== t2.scoreThreshold ? An(this.h, 4, t2.scoreThreshold) : "scoreThreshold" in t2 && He(this.h, 4), void 0 !== t2.categoryAllowlist ? bn(this.h, 5, t2.categoryAllowlist) : "categoryAllowlist" in t2 && He(this.h, 5), void 0 !== t2.categoryDenylist ? bn(this.h, 6, t2.categoryDenylist) : "categoryDenylist" in t2 && He(this.h, 6), this.l(t2);
    }
    D(t2, e2) {
      return this.j = { detections: [] }, Ya(this, t2, e2), this.j;
    }
    F(t2, e2, n2) {
      return this.j = { detections: [] }, $a(this, t2, n2, e2), this.j;
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "input_frame_gpu"), Ji(t2, "norm_rect"), Zi(t2, "detections");
      const e2 = new Gi();
      Yn(e2, To, this.h);
      const n2 = new zi();
      Xi(n2, "mediapipe.tasks.vision.ObjectDetectorGraph"), Hi(n2, "IMAGE:input_frame_gpu"), Hi(n2, "NORM_RECT:norm_rect"), Wi(n2, "DETECTIONS:detections"), n2.o(e2), qi(t2, n2), this.g.attachProtoVectorListener("detections", ((t3, e3) => {
        for (const e4 of t3) t3 = hs(e4), this.j.detections.push(xo(t3));
        Yo(this, e3);
      })), this.g.attachEmptyPacketListener("detections", ((t3) => {
        Yo(this, t3);
      })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Xc.prototype.detectForVideo = Xc.prototype.F, Xc.prototype.detect = Xc.prototype.D, Xc.prototype.setOptions = Xc.prototype.o, Xc.createFromModelPath = async function(t2, e2) {
    return za(Xc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Xc.createFromModelBuffer = function(t2, e2) {
    return za(Xc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Xc.createFromOptions = function(t2, e2) {
    return za(Xc, t2, e2);
  };
  var Hc = class {
    constructor(t2, e2, n2) {
      this.landmarks = t2, this.worldLandmarks = e2, this.segmentationMasks = n2;
    }
    close() {
      this.segmentationMasks?.forEach(((t2) => {
        t2.close();
      }));
    }
  };
  function Wc(t2) {
    t2.landmarks = [], t2.worldLandmarks = [], t2.segmentationMasks = void 0;
  }
  function zc(t2) {
    try {
      const e2 = new Hc(t2.landmarks, t2.worldLandmarks, t2.segmentationMasks);
      if (!t2.s) return e2;
      t2.s(e2);
    } finally {
      Jo(t2);
    }
  }
  Hc.prototype.close = Hc.prototype.close;
  var Kc = class extends Ja {
    constructor(t2, e2) {
      super(new Wa(t2, e2), "image_in", "norm_rect", false), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = false, dn(t2 = this.h = new Ao(), 0, 1, e2 = new Is()), this.v = new oo(), dn(this.h, 0, 3, this.v), this.j = new so(), dn(this.h, 0, 2, this.j), Tn(this.j, 4, 1), An(this.j, 2, 0.5), An(this.v, 2, 0.5), An(this.h, 4, 0.5);
    }
    get baseOptions() {
      return hn(this.h, Is, 1);
    }
    set baseOptions(t2) {
      dn(this.h, 0, 1, t2);
    }
    o(t2) {
      return "numPoses" in t2 && Tn(this.j, 4, t2.numPoses ?? 1), "minPoseDetectionConfidence" in t2 && An(this.j, 2, t2.minPoseDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && An(this.h, 4, t2.minTrackingConfidence ?? 0.5), "minPosePresenceConfidence" in t2 && An(this.v, 2, t2.minPosePresenceConfidence ?? 0.5), "outputSegmentationMasks" in t2 && (this.outputSegmentationMasks = t2.outputSegmentationMasks ?? false), this.l(t2);
    }
    D(t2, e2, n2) {
      const r2 = "function" != typeof e2 ? e2 : {};
      return this.s = "function" == typeof e2 ? e2 : n2, Wc(this), Ya(this, t2, r2), zc(this);
    }
    F(t2, e2, n2, r2) {
      const i2 = "function" != typeof n2 ? n2 : {};
      return this.s = "function" == typeof n2 ? n2 : r2, Wc(this), $a(this, t2, i2, e2), zc(this);
    }
    m() {
      var t2 = new Qi();
      Ji(t2, "image_in"), Ji(t2, "norm_rect"), Zi(t2, "normalized_landmarks"), Zi(t2, "world_landmarks"), Zi(t2, "segmentation_masks");
      const e2 = new Gi();
      Yn(e2, bo, this.h);
      const n2 = new zi();
      Xi(n2, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), Hi(n2, "IMAGE:image_in"), Hi(n2, "NORM_RECT:norm_rect"), Wi(n2, "NORM_LANDMARKS:normalized_landmarks"), Wi(n2, "WORLD_LANDMARKS:world_landmarks"), n2.o(e2), qi(t2, n2), $o(this, t2), this.g.attachProtoVectorListener("normalized_landmarks", ((t3, e3) => {
        this.landmarks = [];
        for (const e4 of t3) t3 = fs(e4), this.landmarks.push(Lo(t3));
        Yo(this, e3);
      })), this.g.attachEmptyPacketListener("normalized_landmarks", ((t3) => {
        this.landmarks = [], Yo(this, t3);
      })), this.g.attachProtoVectorListener("world_landmarks", ((t3, e3) => {
        this.worldLandmarks = [];
        for (const e4 of t3) t3 = ls(e4), this.worldLandmarks.push(Ro(t3));
        Yo(this, e3);
      })), this.g.attachEmptyPacketListener("world_landmarks", ((t3) => {
        this.worldLandmarks = [], Yo(this, t3);
      })), this.outputSegmentationMasks && (Wi(n2, "SEGMENTATION_MASK:segmentation_masks"), qo(this, "segmentation_masks"), this.g.ba("segmentation_masks", ((t3, e3) => {
        this.segmentationMasks = t3.map(((t4) => qa(this, t4, true, !this.s))), Yo(this, e3);
      })), this.g.attachEmptyPacketListener("segmentation_masks", ((t3) => {
        this.segmentationMasks = [], Yo(this, t3);
      }))), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Kc.prototype.detectForVideo = Kc.prototype.F, Kc.prototype.detect = Kc.prototype.D, Kc.prototype.setOptions = Kc.prototype.o, Kc.createFromModelPath = function(t2, e2) {
    return za(Kc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Kc.createFromModelBuffer = function(t2, e2) {
    return za(Kc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Kc.createFromOptions = function(t2, e2) {
    return za(Kc, t2, e2);
  }, Kc.POSE_CONNECTIONS = vc;

  // ../../node_modules/.pnpm/fflate@0.8.2/node_modules/fflate/esm/browser.js
  var ch2 = {};
  var wk = (function(c2, id, msg, transfer, cb) {
    var w2 = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
      c2 + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
    ], { type: "text/javascript" }))));
    w2.onmessage = function(e2) {
      var d = e2.data, ed = d.$e$;
      if (ed) {
        var err2 = new Error(ed[0]);
        err2["code"] = ed[1];
        err2.stack = ed[2];
        cb(err2, null);
      } else
        cb(null, d);
    };
    w2.postMessage(msg, transfer);
    return w2;
  });
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b2 = new u16(31);
    for (var i2 = 0; i2 < 31; ++i2) {
      b2[i2] = start += 1 << eb[i2 - 1];
    }
    var r2 = new i32(b2[30]);
    for (var i2 = 1; i2 < 30; ++i2) {
      for (var j2 = b2[i2]; j2 < b2[i2 + 1]; ++j2) {
        r2[j2] = j2 - b2[i2] << 5 | i2;
      }
    }
    return { b: b2, r: r2 };
  };
  var _a2 = freb(fleb, 2);
  var fl = _a2.b;
  var revfl = _a2.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i2 = 0; i2 < 32768; ++i2) {
    x2 = (i2 & 43690) >> 1 | (i2 & 21845) << 1;
    x2 = (x2 & 52428) >> 2 | (x2 & 13107) << 2;
    x2 = (x2 & 61680) >> 4 | (x2 & 3855) << 4;
    rev[i2] = ((x2 & 65280) >> 8 | (x2 & 255) << 8) >> 1;
  }
  var x2;
  var i2;
  var hMap = (function(cd, mb, r2) {
    var s2 = cd.length;
    var i2 = 0;
    var l = new u16(mb);
    for (; i2 < s2; ++i2) {
      if (cd[i2])
        ++l[cd[i2] - 1];
    }
    var le2 = new u16(mb);
    for (i2 = 1; i2 < mb; ++i2) {
      le2[i2] = le2[i2 - 1] + l[i2 - 1] << 1;
    }
    var co2;
    if (r2) {
      co2 = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i2 = 0; i2 < s2; ++i2) {
        if (cd[i2]) {
          var sv = i2 << 4 | cd[i2];
          var r_1 = mb - cd[i2];
          var v2 = le2[cd[i2] - 1]++ << r_1;
          for (var m2 = v2 | (1 << r_1) - 1; v2 <= m2; ++v2) {
            co2[rev[v2] >> rvb] = sv;
          }
        }
      }
    } else {
      co2 = new u16(s2);
      for (i2 = 0; i2 < s2; ++i2) {
        if (cd[i2]) {
          co2[i2] = rev[le2[cd[i2] - 1]++] >> 15 - cd[i2];
        }
      }
    }
    return co2;
  });
  var flt = new u8(288);
  for (i2 = 0; i2 < 144; ++i2)
    flt[i2] = 8;
  var i2;
  for (i2 = 144; i2 < 256; ++i2)
    flt[i2] = 9;
  var i2;
  for (i2 = 256; i2 < 280; ++i2)
    flt[i2] = 7;
  var i2;
  for (i2 = 280; i2 < 288; ++i2)
    flt[i2] = 8;
  var i2;
  var fdt = new u8(32);
  for (i2 = 0; i2 < 32; ++i2)
    fdt[i2] = 5;
  var i2;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = function(a2) {
    var m2 = a2[0];
    for (var i2 = 1; i2 < a2.length; ++i2) {
      if (a2[i2] > m2)
        m2 = a2[i2];
    }
    return m2;
  };
  var bits = function(d, p2, m2) {
    var o2 = p2 / 8 | 0;
    return (d[o2] | d[o2 + 1] << 8) >> (p2 & 7) & m2;
  };
  var bits16 = function(d, p2) {
    var o2 = p2 / 8 | 0;
    return (d[o2] | d[o2 + 1] << 8 | d[o2 + 2] << 16) >> (p2 & 7);
  };
  var shft = function(p2) {
    return (p2 + 7) / 8 | 0;
  };
  var slc = function(v2, s2, e2) {
    if (s2 == null || s2 < 0)
      s2 = 0;
    if (e2 == null || e2 > v2.length)
      e2 = v2.length;
    return new u8(v2.subarray(s2, e2));
  };
  var ec2 = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt2) {
    var e2 = new Error(msg || ec2[ind]);
    e2.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e2, err);
    if (!nt2)
      throw e2;
    return e2;
  };
  var inflt = function(dat, st2, buf, dict) {
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st2.f && !st2.l)
      return buf || new u8(0);
    var noBuf = !buf;
    var resize = noBuf || st2.i != 2;
    var noSt = st2.i;
    if (noBuf)
      buf = new u8(sl * 3);
    var cbuf = function(l2) {
      var bl = buf.length;
      if (l2 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l2));
        nbuf.set(buf);
        buf = nbuf;
      }
    };
    var final = st2.f || 0, pos = st2.p || 0, bt2 = st2.b || 0, lm = st2.l, dm = st2.d, lbt = st2.m, dbt = st2.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s2 = shft(pos) + 4, l = dat[s2 - 4] | dat[s2 - 3] << 8, t2 = s2 + l;
          if (t2 > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt2 + l);
          buf.set(dat.subarray(s2, t2), bt2);
          st2.b = bt2 += l, st2.p = pos = t2 * 8, st2.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i2 = 0; i2 < hcLen; ++i2) {
            clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i2 = 0; i2 < tl; ) {
            var r2 = clm[bits(dat, pos, clbmsk)];
            pos += r2 & 15;
            var s2 = r2 >> 4;
            if (s2 < 16) {
              ldt[i2++] = s2;
            } else {
              var c2 = 0, n2 = 0;
              if (s2 == 16)
                n2 = 3 + bits(dat, pos, 3), pos += 2, c2 = ldt[i2 - 1];
              else if (s2 == 17)
                n2 = 3 + bits(dat, pos, 7), pos += 3;
              else if (s2 == 18)
                n2 = 11 + bits(dat, pos, 127), pos += 7;
              while (n2--)
                ldt[i2++] = c2;
            }
          }
          var lt2 = ldt.subarray(0, hLit), dt2 = ldt.subarray(hLit);
          lbt = max(lt2);
          dbt = max(dt2);
          lm = hMap(lt2, lbt, 1);
          dm = hMap(dt2, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (resize)
        cbuf(bt2 + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c2 = lm[bits16(dat, pos) & lms], sym = c2 >> 4;
        pos += c2 & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c2)
          err(2);
        if (sym < 256)
          buf[bt2++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i2 = sym - 257, b2 = fleb[i2];
            add = bits(dat, pos, (1 << b2) - 1) + fl[i2];
            pos += b2;
          }
          var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
          if (!d)
            err(3);
          pos += d & 15;
          var dt2 = fd[dsym];
          if (dsym > 3) {
            var b2 = fdeb[dsym];
            dt2 += bits16(dat, pos) & (1 << b2) - 1, pos += b2;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt2 + 131072);
          var end = bt2 + add;
          if (bt2 < dt2) {
            var shift = dl - dt2, dend = Math.min(dt2, end);
            if (shift + bt2 < 0)
              err(3);
            for (; bt2 < dend; ++bt2)
              buf[bt2] = dict[shift + bt2];
          }
          for (; bt2 < end; ++bt2)
            buf[bt2] = buf[bt2 - dt2];
        }
      }
      st2.l = lm, st2.p = lpos, st2.b = bt2, st2.f = final;
      if (lm)
        final = 1, st2.m = lbt, st2.d = dm, st2.n = dbt;
    } while (!final);
    return bt2 != buf.length && noBuf ? slc(buf, 0, bt2) : buf.subarray(0, bt2);
  };
  var et2 = /* @__PURE__ */ new u8(0);
  var mrg = function(a2, b2) {
    var o2 = {};
    for (var k2 in a2)
      o2[k2] = a2[k2];
    for (var k2 in b2)
      o2[k2] = b2[k2];
    return o2;
  };
  var wcln = function(fn2, fnStr, td2) {
    var dt2 = fn2();
    var st2 = fn2.toString();
    var ks2 = st2.slice(st2.indexOf("[") + 1, st2.lastIndexOf("]")).replace(/\s+/g, "").split(",");
    for (var i2 = 0; i2 < dt2.length; ++i2) {
      var v2 = dt2[i2], k2 = ks2[i2];
      if (typeof v2 == "function") {
        fnStr += ";" + k2 + "=";
        var st_1 = v2.toString();
        if (v2.prototype) {
          if (st_1.indexOf("[native code]") != -1) {
            var spInd = st_1.indexOf(" ", 8) + 1;
            fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
          } else {
            fnStr += st_1;
            for (var t2 in v2.prototype)
              fnStr += ";" + k2 + ".prototype." + t2 + "=" + v2.prototype[t2].toString();
          }
        } else
          fnStr += st_1;
      } else
        td2[k2] = v2;
    }
    return fnStr;
  };
  var ch = [];
  var cbfs = function(v2) {
    var tl = [];
    for (var k2 in v2) {
      if (v2[k2].buffer) {
        tl.push((v2[k2] = new v2[k2].constructor(v2[k2])).buffer);
      }
    }
    return tl;
  };
  var wrkr = function(fns, init, id, cb) {
    if (!ch[id]) {
      var fnStr = "", td_1 = {}, m2 = fns.length - 1;
      for (var i2 = 0; i2 < m2; ++i2)
        fnStr = wcln(fns[i2], fnStr, td_1);
      ch[id] = { c: wcln(fns[m2], fnStr, td_1), e: td_1 };
    }
    var td2 = mrg({}, ch[id].e);
    return wk(ch[id].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);
  };
  var bInflt = function() {
    return [u8, u16, i32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec2, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gopt];
  };
  var guze = function() {
    return [gzs, gzl];
  };
  var pbf = function(msg) {
    return postMessage(msg, [msg.buffer]);
  };
  var gopt = function(o2) {
    return o2 && {
      out: o2.size && new u8(o2.size),
      dictionary: o2.dictionary
    };
  };
  var cbify = function(dat, opts, fns, init, id, cb) {
    var w2 = wrkr(fns, init, id, function(err2, dat2) {
      w2.terminate();
      cb(err2, dat2);
    });
    w2.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
    return function() {
      w2.terminate();
    };
  };
  var gzs = function(d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
      err(6, "invalid gzip data");
    var flg = d[3];
    var st2 = 10;
    if (flg & 4)
      st2 += (d[10] | d[11] << 8) + 2;
    for (var zs2 = (flg >> 3 & 1) + (flg >> 4 & 1); zs2 > 0; zs2 -= !d[st2++])
      ;
    return st2 + (flg & 2);
  };
  var gzl = function(d) {
    var l = d.length;
    return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
  };
  function inflateSync(data, opts) {
    return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
  }
  function gunzip(data, opts, cb) {
    if (!cb)
      cb = opts, opts = {};
    if (typeof cb != "function")
      err(7);
    return cbify(data, opts, [
      bInflt,
      guze,
      function() {
        return [gunzipSync];
      }
    ], function(ev) {
      return pbf(gunzipSync(ev.data[0], ev.data[1]));
    }, 3, cb);
  }
  function gunzipSync(data, opts) {
    var st2 = gzs(data);
    if (st2 + 8 > data.length)
      err(6, "invalid gzip data");
    return inflt(data.subarray(st2, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
  }
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et2, { stream: true });
    tds = 1;
  } catch (e2) {
  }

  // ../sdk-core/src/manager/vision.ts
  var VisionTaskType = /* @__PURE__ */ ((VisionTaskType2) => {
    VisionTaskType2["FaceDetector"] = "FaceDetector";
    VisionTaskType2["ImageSegmenter"] = "ImageSegmenter";
    return VisionTaskType2;
  })(VisionTaskType || {});
  var TaskDefinitions = {
    ["FaceDetector" /* FaceDetector */]: [
      Za,
      (instance) => instance.detectForVideo.bind(instance),
      "blaze_face_short_range.tflite"
    ],
    ["ImageSegmenter" /* ImageSegmenter */]: [
      Rc,
      (instance) => instance.segmentForVideo.bind(instance),
      "selfie_segmenter_landscape.tflite"
    ]
  };
  var _VisionTaskRegistry = class _VisionTaskRegistry {
    constructor(path) {
      this.path = path;
      __publicField(this, "hashTasks");
      __publicField(this, "hashResults");
      __publicField(this, "taskModels");
      __publicField(this, "vision");
      this.hashTasks = /* @__PURE__ */ new Map();
      this.hashResults = /* @__PURE__ */ new Map();
      this.taskModels = /* @__PURE__ */ new Map();
    }
    get basePath() {
      return this.path;
    }
    get models() {
      return this.taskModels;
    }
    get visionWasm() {
      return this.vision;
    }
    setVideo(hashKey, video) {
      this.hashTasks.get(hashKey)[2] = video;
    }
    static async getInstance(path) {
      if (path) {
        if (_VisionTaskRegistry.instance?.path === path && _VisionTaskRegistry.instance.vision) {
          return _VisionTaskRegistry.instance;
        }
        if (_VisionTaskRegistry.instance?.path === path && _VisionTaskRegistry.initPromise) {
          return _VisionTaskRegistry.initPromise;
        }
        _VisionTaskRegistry.instance = new _VisionTaskRegistry(path);
        _VisionTaskRegistry.initPromise = _VisionTaskRegistry.instance.initVision().then(() => _VisionTaskRegistry.instance).catch((error) => {
          _VisionTaskRegistry.initPromise = null;
          throw error;
        });
        return _VisionTaskRegistry.initPromise;
      }
      if (_VisionTaskRegistry.initPromise) return _VisionTaskRegistry.initPromise;
      return _VisionTaskRegistry.instance;
    }
    async preloadModels(taskTypes) {
      return await Promise.all(taskTypes.map(async (taskType) => {
        const url = this.getFinalUrl(`/mediapipe/${TaskDefinitions[taskType][2]}`);
        const blobUrl = await this.getBlobUrl(url, false);
        this.taskModels.set(taskType, blobUrl);
      })).catch((e2) => {
        throw new Error(`models: ${taskTypes}. preloadModels error: ${e2}`);
      });
    }
    async generateHash(taskType, options) {
      try {
        const normalizedOptions = this.normalizeOptions(options);
        const configString = JSON.stringify({ taskType, options: normalizedOptions });
        return await crypto.subtle.digest("SHA-256", new TextEncoder().encode(configString)).then((hashBuffer) => this.bufferToHex(hashBuffer));
      } catch (e2) {
        throw new Error(`GenerateHash error: ${e2}`);
      }
    }
    normalizeOptions(options) {
      const normalized = {};
      for (const key of Object.keys(options).sort()) {
        const value = options[key];
        if (value instanceof HTMLCanvasElement) {
          normalized[key] = {
            id: value.id
          };
        } else if (typeof value === "object" && value !== null) {
          normalized[key] = this.normalizeOptions(value);
        } else {
          normalized[key] = value;
        }
      }
      return normalized;
    }
    bufferToHex(buffer) {
      return Array.from(new Uint8Array(buffer)).map((b2) => b2.toString(16).padStart(2, "0")).join("");
    }
    async register(taskType, inputOptions) {
      try {
        const options = {
          baseOptions: {
            modelAssetPath: this.getModelUrl(taskType),
            delegate: "GPU"
          },
          runningMode: "VIDEO"
        };
        if (inputOptions?.path && options.baseOptions) options.baseOptions.modelAssetPath = inputOptions.path;
        if (inputOptions?.canvas) options.canvas = inputOptions.canvas;
        const hashKey = await this.generateHash(taskType, options);
        if (!this.hashTasks.has(hashKey)) {
          const [InstanceClass, getReasoning] = TaskDefinitions[taskType];
          const instance = await InstanceClass.createFromOptions(this.vision, options);
          const reasoning = getReasoning(instance);
          this.hashTasks.set(hashKey, [instance, reasoning]);
        }
        return hashKey;
      } catch (e2) {
        throw new Error(`Register error: ${e2}`);
      }
    }
    getResult(hashKey) {
      try {
        if (!this.hashResults.has(hashKey)) {
          if (!this.hashTasks.get(hashKey)) throw new Error("Unregistered hash");
          this.hashResults.set(hashKey, this.reasoning(hashKey));
        }
        return this.hashResults.get(hashKey);
      } catch (e2) {
        throw new Error(`GetResult error: ${e2}`);
      }
    }
    reasoning(hashKey) {
      const reasoning = this.hashTasks.get(hashKey)[1];
      return reasoning(this.hashTasks.get(hashKey)[2], performance.now());
    }
    getModelUrl(taskType) {
      return this.taskModels.get(taskType);
    }
    getFinalUrl(file) {
      return `${this.path}/${file}`.replace(/([^:]\/)\/+/g, "$1");
    }
    async initVision() {
      try {
        const name = await Uo.isSimdSupported() ? "vision_wasm_internal" : "vision_wasm_nosimd_internal";
        const baseUrl = this.getFinalUrl(`/mediapipe/${name}`);
        const [gzUrl, jsUrl] = [`${baseUrl}.wasm.gz`, `${baseUrl}.js.gz`];
        const [gzBlobUrl, jsBlobUrl] = await Promise.all([this.getBlobUrl(gzUrl), this.getBlobUrl(jsUrl)]);
        this.vision = await Uo.forVisionTasks("");
        this.vision.wasmBinaryPath = gzBlobUrl;
        this.vision.wasmLoaderPath = jsBlobUrl;
      } catch (error) {
        throw new Error(`initVision error: ${error}`);
      }
    }
    async getBlobUrl(url, isGz = true) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText};`);
      let decompressed;
      if (isGz) {
        const gzBuffer = await response.arrayBuffer();
        decompressed = await new Promise((resolve, reject) => {
          gunzip(new Uint8Array(gzBuffer), (err2, decompressed2) => {
            if (err2) reject(err2);
            resolve(new Blob([decompressed2], { type: this.isWasmFile(decompressed2) ? "application/wasm" : "application/javascript" }));
          });
        });
      } else decompressed = await response.blob();
      if (!(decompressed instanceof Blob)) throw new Error("Decompressed data is not a valid Blob");
      return URL.createObjectURL(decompressed);
    }
    isWasmFile(buffer) {
      return buffer.length >= 4 && buffer[0] === 0 && buffer[1] === 97 && buffer[2] === 115 && buffer[3] === 109;
    }
    resetHashResults() {
      this.hashResults = /* @__PURE__ */ new Map();
    }
  };
  __publicField(_VisionTaskRegistry, "instance");
  /** Cached init promise — any caller awaiting getInstance() shares the same flight */
  __publicField(_VisionTaskRegistry, "initPromise", null);
  var VisionTaskRegistry = _VisionTaskRegistry;
  return __toCommonJS(vision_exports);
})();

      (() => {
        if (typeof Vision !== 'undefined') {
          // 如果是 default 导出
          if (Vision.default) {
            for (const key in Vision.default) {
              if (Vision.default.hasOwnProperty(key)) {
                window[key] = Vision.default[key];
              }
            }
          } else {
            // 如果是命名导出
            for (const key in Vision) {
              if (Vision.hasOwnProperty(key)) {
                window[key] = Vision[key];
              }
            }
          }
        }
      })();
