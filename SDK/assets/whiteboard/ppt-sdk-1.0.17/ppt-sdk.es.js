/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(a) {
  typeof exports == "object" && typeof module < "u" ? module.exports = a() : typeof define == "function" && define.amd ? define([], a) : (typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : this).JSZip = a();
})(function() {
  return (function a(t, s, n) {
    function e(m, c) {
      if (!s[m]) {
        if (!t[m]) {
          var i = typeof require == "function" && require;
          if (!c && i) return i(m, !0);
          if (r) return r(m, !0);
          var d = new Error("Cannot find module '" + m + "'");
          throw d.code = "MODULE_NOT_FOUND", d;
        }
        var o = s[m] = { exports: {} };
        t[m][0].call(o.exports, function(x) {
          var f = t[m][1][x];
          return e(f || x);
        }, o, o.exports, a, t, s, n);
      }
      return s[m].exports;
    }
    for (var r = typeof require == "function" && require, l = 0; l < n.length; l++) e(n[l]);
    return e;
  })({ 1: [function(a, t, s) {
    var n = a("./utils"), e = a("./support"), r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    s.encode = function(l) {
      for (var m, c, i, d, o, x, f, y = [], u = 0, p = l.length, A = p, w = n.getTypeOf(l) !== "string"; u < l.length; ) A = p - u, i = w ? (m = l[u++], c = u < p ? l[u++] : 0, u < p ? l[u++] : 0) : (m = l.charCodeAt(u++), c = u < p ? l.charCodeAt(u++) : 0, u < p ? l.charCodeAt(u++) : 0), d = m >> 2, o = (3 & m) << 4 | c >> 4, x = 1 < A ? (15 & c) << 2 | i >> 6 : 64, f = 2 < A ? 63 & i : 64, y.push(r.charAt(d) + r.charAt(o) + r.charAt(x) + r.charAt(f));
      return y.join("");
    }, s.decode = function(l) {
      var m, c, i, d, o, x, f = 0, y = 0, u = "data:";
      if (l.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
      var p, A = 3 * (l = l.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
      if (l.charAt(l.length - 1) === r.charAt(64) && A--, l.charAt(l.length - 2) === r.charAt(64) && A--, A % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
      for (p = e.uint8array ? new Uint8Array(0 | A) : new Array(0 | A); f < l.length; ) m = r.indexOf(l.charAt(f++)) << 2 | (d = r.indexOf(l.charAt(f++))) >> 4, c = (15 & d) << 4 | (o = r.indexOf(l.charAt(f++))) >> 2, i = (3 & o) << 6 | (x = r.indexOf(l.charAt(f++))), p[y++] = m, o !== 64 && (p[y++] = c), x !== 64 && (p[y++] = i);
      return p;
    };
  }, { "./support": 30, "./utils": 32 }], 2: [function(a, t, s) {
    var n = a("./external"), e = a("./stream/DataWorker"), r = a("./stream/Crc32Probe"), l = a("./stream/DataLengthProbe");
    function m(c, i, d, o, x) {
      this.compressedSize = c, this.uncompressedSize = i, this.crc32 = d, this.compression = o, this.compressedContent = x;
    }
    m.prototype = { getContentWorker: function() {
      var c = new e(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new l("data_length")), i = this;
      return c.on("end", function() {
        if (this.streamInfo.data_length !== i.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
      }), c;
    }, getCompressedWorker: function() {
      return new e(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
    } }, m.createWorkerFrom = function(c, i, d) {
      return c.pipe(new r()).pipe(new l("uncompressedSize")).pipe(i.compressWorker(d)).pipe(new l("compressedSize")).withStreamInfo("compression", i);
    }, t.exports = m;
  }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(a, t, s) {
    var n = a("./stream/GenericWorker");
    s.STORE = { magic: "\0\0", compressWorker: function() {
      return new n("STORE compression");
    }, uncompressWorker: function() {
      return new n("STORE decompression");
    } }, s.DEFLATE = a("./flate");
  }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(a, t, s) {
    var n = a("./utils"), e = (function() {
      for (var r, l = [], m = 0; m < 256; m++) {
        r = m;
        for (var c = 0; c < 8; c++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
        l[m] = r;
      }
      return l;
    })();
    t.exports = function(r, l) {
      return r !== void 0 && r.length ? n.getTypeOf(r) !== "string" ? (function(m, c, i, d) {
        var o = e, x = d + i;
        m ^= -1;
        for (var f = d; f < x; f++) m = m >>> 8 ^ o[255 & (m ^ c[f])];
        return -1 ^ m;
      })(0 | l, r, r.length, 0) : (function(m, c, i, d) {
        var o = e, x = d + i;
        m ^= -1;
        for (var f = d; f < x; f++) m = m >>> 8 ^ o[255 & (m ^ c.charCodeAt(f))];
        return -1 ^ m;
      })(0 | l, r, r.length, 0) : 0;
    };
  }, { "./utils": 32 }], 5: [function(a, t, s) {
    s.base64 = !1, s.binary = !1, s.dir = !1, s.createFolders = !0, s.date = null, s.compression = null, s.compressionOptions = null, s.comment = null, s.unixPermissions = null, s.dosPermissions = null;
  }, {}], 6: [function(a, t, s) {
    var n = null;
    n = typeof Promise < "u" ? Promise : a("lie"), t.exports = { Promise: n };
  }, { lie: 37 }], 7: [function(a, t, s) {
    var n = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", e = a("pako"), r = a("./utils"), l = a("./stream/GenericWorker"), m = n ? "uint8array" : "array";
    function c(i, d) {
      l.call(this, "FlateWorker/" + i), this._pako = null, this._pakoAction = i, this._pakoOptions = d, this.meta = {};
    }
    s.magic = "\b\0", r.inherits(c, l), c.prototype.processChunk = function(i) {
      this.meta = i.meta, this._pako === null && this._createPako(), this._pako.push(r.transformTo(m, i.data), !1);
    }, c.prototype.flush = function() {
      l.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
    }, c.prototype.cleanUp = function() {
      l.prototype.cleanUp.call(this), this._pako = null;
    }, c.prototype._createPako = function() {
      this._pako = new e[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
      var i = this;
      this._pako.onData = function(d) {
        i.push({ data: d, meta: i.meta });
      };
    }, s.compressWorker = function(i) {
      return new c("Deflate", i);
    }, s.uncompressWorker = function() {
      return new c("Inflate", {});
    };
  }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(a, t, s) {
    function n(o, x) {
      var f, y = "";
      for (f = 0; f < x; f++) y += String.fromCharCode(255 & o), o >>>= 8;
      return y;
    }
    function e(o, x, f, y, u, p) {
      var A, w, b = o.file, L = o.compression, v = p !== m.utf8encode, T = r.transformTo("string", p(b.name)), C = r.transformTo("string", m.utf8encode(b.name)), S = b.comment, q = r.transformTo("string", p(S)), R = r.transformTo("string", m.utf8encode(S)), k = C.length !== b.name.length, g = R.length !== S.length, P = "", E = "", I = "", U = b.dir, D = b.date, N = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
      x && !f || (N.crc32 = o.crc32, N.compressedSize = o.compressedSize, N.uncompressedSize = o.uncompressedSize);
      var B = 0;
      x && (B |= 8), v || !k && !g || (B |= 2048);
      var _ = 0, J = 0;
      U && (_ |= 16), u === "UNIX" ? (J = 798, _ |= (function(Q, pa) {
        var Aa = Q;
        return Q || (Aa = pa ? 16893 : 33204), (65535 & Aa) << 16;
      })(b.unixPermissions, U)) : (J = 20, _ |= (function(Q) {
        return 63 & (Q || 0);
      })(b.dosPermissions)), A = D.getUTCHours(), A <<= 6, A |= D.getUTCMinutes(), A <<= 5, A |= D.getUTCSeconds() / 2, w = D.getUTCFullYear() - 1980, w <<= 4, w |= D.getUTCMonth() + 1, w <<= 5, w |= D.getUTCDate(), k && (E = n(1, 1) + n(c(T), 4) + C, P += "up" + n(E.length, 2) + E), g && (I = n(1, 1) + n(c(q), 4) + R, P += "uc" + n(I.length, 2) + I);
      var aa = "";
      return aa += `
\0`, aa += n(B, 2), aa += L.magic, aa += n(A, 2), aa += n(w, 2), aa += n(N.crc32, 4), aa += n(N.compressedSize, 4), aa += n(N.uncompressedSize, 4), aa += n(T.length, 2), aa += n(P.length, 2), { fileRecord: i.LOCAL_FILE_HEADER + aa + T + P, dirRecord: i.CENTRAL_FILE_HEADER + n(J, 2) + aa + n(q.length, 2) + "\0\0\0\0" + n(_, 4) + n(y, 4) + T + P + q };
    }
    var r = a("../utils"), l = a("../stream/GenericWorker"), m = a("../utf8"), c = a("../crc32"), i = a("../signature");
    function d(o, x, f, y) {
      l.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = x, this.zipPlatform = f, this.encodeFileName = y, this.streamFiles = o, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
    }
    r.inherits(d, l), d.prototype.push = function(o) {
      var x = o.meta.percent || 0, f = this.entriesCount, y = this._sources.length;
      this.accumulate ? this.contentBuffer.push(o) : (this.bytesWritten += o.data.length, l.prototype.push.call(this, { data: o.data, meta: { currentFile: this.currentFile, percent: f ? (x + 100 * (f - y - 1)) / f : 100 } }));
    }, d.prototype.openedSource = function(o) {
      this.currentSourceOffset = this.bytesWritten, this.currentFile = o.file.name;
      var x = this.streamFiles && !o.file.dir;
      if (x) {
        var f = e(o, x, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        this.push({ data: f.fileRecord, meta: { percent: 0 } });
      } else this.accumulate = !0;
    }, d.prototype.closedSource = function(o) {
      this.accumulate = !1;
      var x = this.streamFiles && !o.file.dir, f = e(o, x, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
      if (this.dirRecords.push(f.dirRecord), x) this.push({ data: (function(y) {
        return i.DATA_DESCRIPTOR + n(y.crc32, 4) + n(y.compressedSize, 4) + n(y.uncompressedSize, 4);
      })(o), meta: { percent: 100 } });
      else for (this.push({ data: f.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
      this.currentFile = null;
    }, d.prototype.flush = function() {
      for (var o = this.bytesWritten, x = 0; x < this.dirRecords.length; x++) this.push({ data: this.dirRecords[x], meta: { percent: 100 } });
      var f = this.bytesWritten - o, y = (function(u, p, A, w, b) {
        var L = r.transformTo("string", b(w));
        return i.CENTRAL_DIRECTORY_END + "\0\0\0\0" + n(u, 2) + n(u, 2) + n(p, 4) + n(A, 4) + n(L.length, 2) + L;
      })(this.dirRecords.length, f, o, this.zipComment, this.encodeFileName);
      this.push({ data: y, meta: { percent: 100 } });
    }, d.prototype.prepareNextSource = function() {
      this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
    }, d.prototype.registerPrevious = function(o) {
      this._sources.push(o);
      var x = this;
      return o.on("data", function(f) {
        x.processChunk(f);
      }), o.on("end", function() {
        x.closedSource(x.previous.streamInfo), x._sources.length ? x.prepareNextSource() : x.end();
      }), o.on("error", function(f) {
        x.error(f);
      }), this;
    }, d.prototype.resume = function() {
      return !!l.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
    }, d.prototype.error = function(o) {
      var x = this._sources;
      if (!l.prototype.error.call(this, o)) return !1;
      for (var f = 0; f < x.length; f++) try {
        x[f].error(o);
      } catch {
      }
      return !0;
    }, d.prototype.lock = function() {
      l.prototype.lock.call(this);
      for (var o = this._sources, x = 0; x < o.length; x++) o[x].lock();
    }, t.exports = d;
  }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(a, t, s) {
    var n = a("../compressions"), e = a("./ZipFileWorker");
    s.generateWorker = function(r, l, m) {
      var c = new e(l.streamFiles, m, l.platform, l.encodeFileName), i = 0;
      try {
        r.forEach(function(d, o) {
          i++;
          var x = (function(p, A) {
            var w = p || A, b = n[w];
            if (!b) throw new Error(w + " is not a valid compression method !");
            return b;
          })(o.options.compression, l.compression), f = o.options.compressionOptions || l.compressionOptions || {}, y = o.dir, u = o.date;
          o._compressWorker(x, f).withStreamInfo("file", { name: d, dir: y, date: u, comment: o.comment || "", unixPermissions: o.unixPermissions, dosPermissions: o.dosPermissions }).pipe(c);
        }), c.entriesCount = i;
      } catch (d) {
        c.error(d);
      }
      return c;
    };
  }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(a, t, s) {
    function n() {
      if (!(this instanceof n)) return new n();
      if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
      this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
        var e = new n();
        for (var r in this) typeof this[r] != "function" && (e[r] = this[r]);
        return e;
      };
    }
    (n.prototype = a("./object")).loadAsync = a("./load"), n.support = a("./support"), n.defaults = a("./defaults"), n.version = "3.10.1", n.loadAsync = function(e, r) {
      return new n().loadAsync(e, r);
    }, n.external = a("./external"), t.exports = n;
  }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(a, t, s) {
    var n = a("./utils"), e = a("./external"), r = a("./utf8"), l = a("./zipEntries"), m = a("./stream/Crc32Probe"), c = a("./nodejsUtils");
    function i(d) {
      return new e.Promise(function(o, x) {
        var f = d.decompressed.getContentWorker().pipe(new m());
        f.on("error", function(y) {
          x(y);
        }).on("end", function() {
          f.streamInfo.crc32 !== d.decompressed.crc32 ? x(new Error("Corrupted zip : CRC32 mismatch")) : o();
        }).resume();
      });
    }
    t.exports = function(d, o) {
      var x = this;
      return o = n.extend(o || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: r.utf8decode }), c.isNode && c.isStream(d) ? e.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : n.prepareContent("the loaded zip file", d, !0, o.optimizedBinaryString, o.base64).then(function(f) {
        var y = new l(o);
        return y.load(f), y;
      }).then(function(f) {
        var y = [e.Promise.resolve(f)], u = f.files;
        if (o.checkCRC32) for (var p = 0; p < u.length; p++) y.push(i(u[p]));
        return e.Promise.all(y);
      }).then(function(f) {
        for (var y = f.shift(), u = y.files, p = 0; p < u.length; p++) {
          var A = u[p], w = A.fileNameStr, b = n.resolve(A.fileNameStr);
          x.file(b, A.decompressed, { binary: !0, optimizedBinaryString: !0, date: A.date, dir: A.dir, comment: A.fileCommentStr.length ? A.fileCommentStr : null, unixPermissions: A.unixPermissions, dosPermissions: A.dosPermissions, createFolders: o.createFolders }), A.dir || (x.file(b).unsafeOriginalName = w);
        }
        return y.zipComment.length && (x.comment = y.zipComment), x;
      });
    };
  }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(a, t, s) {
    var n = a("../utils"), e = a("../stream/GenericWorker");
    function r(l, m) {
      e.call(this, "Nodejs stream input adapter for " + l), this._upstreamEnded = !1, this._bindStream(m);
    }
    n.inherits(r, e), r.prototype._bindStream = function(l) {
      var m = this;
      (this._stream = l).pause(), l.on("data", function(c) {
        m.push({ data: c, meta: { percent: 0 } });
      }).on("error", function(c) {
        m.isPaused ? this.generatedError = c : m.error(c);
      }).on("end", function() {
        m.isPaused ? m._upstreamEnded = !0 : m.end();
      });
    }, r.prototype.pause = function() {
      return !!e.prototype.pause.call(this) && (this._stream.pause(), !0);
    }, r.prototype.resume = function() {
      return !!e.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
    }, t.exports = r;
  }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(a, t, s) {
    var n = a("readable-stream").Readable;
    function e(r, l, m) {
      n.call(this, l), this._helper = r;
      var c = this;
      r.on("data", function(i, d) {
        c.push(i) || c._helper.pause(), m && m(d);
      }).on("error", function(i) {
        c.emit("error", i);
      }).on("end", function() {
        c.push(null);
      });
    }
    a("../utils").inherits(e, n), e.prototype._read = function() {
      this._helper.resume();
    }, t.exports = e;
  }, { "../utils": 32, "readable-stream": 16 }], 14: [function(a, t, s) {
    t.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(n, e) {
      if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(n, e);
      if (typeof n == "number") throw new Error('The "data" argument must not be a number');
      return new Buffer(n, e);
    }, allocBuffer: function(n) {
      if (Buffer.alloc) return Buffer.alloc(n);
      var e = new Buffer(n);
      return e.fill(0), e;
    }, isBuffer: function(n) {
      return Buffer.isBuffer(n);
    }, isStream: function(n) {
      return n && typeof n.on == "function" && typeof n.pause == "function" && typeof n.resume == "function";
    } };
  }, {}], 15: [function(a, t, s) {
    function n(b, L, v) {
      var T, C = r.getTypeOf(L), S = r.extend(v || {}, c);
      S.date = S.date || /* @__PURE__ */ new Date(), S.compression !== null && (S.compression = S.compression.toUpperCase()), typeof S.unixPermissions == "string" && (S.unixPermissions = parseInt(S.unixPermissions, 8)), S.unixPermissions && 16384 & S.unixPermissions && (S.dir = !0), S.dosPermissions && 16 & S.dosPermissions && (S.dir = !0), S.dir && (b = u(b)), S.createFolders && (T = y(b)) && p.call(this, T, !0);
      var q = C === "string" && S.binary === !1 && S.base64 === !1;
      v && v.binary !== void 0 || (S.binary = !q), (L instanceof i && L.uncompressedSize === 0 || S.dir || !L || L.length === 0) && (S.base64 = !1, S.binary = !0, L = "", S.compression = "STORE", C = "string");
      var R = null;
      R = L instanceof i || L instanceof l ? L : x.isNode && x.isStream(L) ? new f(b, L) : r.prepareContent(b, L, S.binary, S.optimizedBinaryString, S.base64);
      var k = new d(b, R, S);
      this.files[b] = k;
    }
    var e = a("./utf8"), r = a("./utils"), l = a("./stream/GenericWorker"), m = a("./stream/StreamHelper"), c = a("./defaults"), i = a("./compressedObject"), d = a("./zipObject"), o = a("./generate"), x = a("./nodejsUtils"), f = a("./nodejs/NodejsStreamInputAdapter"), y = function(b) {
      b.slice(-1) === "/" && (b = b.substring(0, b.length - 1));
      var L = b.lastIndexOf("/");
      return 0 < L ? b.substring(0, L) : "";
    }, u = function(b) {
      return b.slice(-1) !== "/" && (b += "/"), b;
    }, p = function(b, L) {
      return L = L !== void 0 ? L : c.createFolders, b = u(b), this.files[b] || n.call(this, b, null, { dir: !0, createFolders: L }), this.files[b];
    };
    function A(b) {
      return Object.prototype.toString.call(b) === "[object RegExp]";
    }
    var w = { load: function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    }, forEach: function(b) {
      var L, v, T;
      for (L in this.files) T = this.files[L], (v = L.slice(this.root.length, L.length)) && L.slice(0, this.root.length) === this.root && b(v, T);
    }, filter: function(b) {
      var L = [];
      return this.forEach(function(v, T) {
        b(v, T) && L.push(T);
      }), L;
    }, file: function(b, L, v) {
      if (arguments.length !== 1) return b = this.root + b, n.call(this, b, L, v), this;
      if (A(b)) {
        var T = b;
        return this.filter(function(S, q) {
          return !q.dir && T.test(S);
        });
      }
      var C = this.files[this.root + b];
      return C && !C.dir ? C : null;
    }, folder: function(b) {
      if (!b) return this;
      if (A(b)) return this.filter(function(C, S) {
        return S.dir && b.test(C);
      });
      var L = this.root + b, v = p.call(this, L), T = this.clone();
      return T.root = v.name, T;
    }, remove: function(b) {
      b = this.root + b;
      var L = this.files[b];
      if (L || (b.slice(-1) !== "/" && (b += "/"), L = this.files[b]), L && !L.dir) delete this.files[b];
      else for (var v = this.filter(function(C, S) {
        return S.name.slice(0, b.length) === b;
      }), T = 0; T < v.length; T++) delete this.files[v[T].name];
      return this;
    }, generate: function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    }, generateInternalStream: function(b) {
      var L, v = {};
      try {
        if ((v = r.extend(b || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: e.utf8encode })).type = v.type.toLowerCase(), v.compression = v.compression.toUpperCase(), v.type === "binarystring" && (v.type = "string"), !v.type) throw new Error("No output type specified.");
        r.checkSupport(v.type), v.platform !== "darwin" && v.platform !== "freebsd" && v.platform !== "linux" && v.platform !== "sunos" || (v.platform = "UNIX"), v.platform === "win32" && (v.platform = "DOS");
        var T = v.comment || this.comment || "";
        L = o.generateWorker(this, v, T);
      } catch (C) {
        (L = new l("error")).error(C);
      }
      return new m(L, v.type || "string", v.mimeType);
    }, generateAsync: function(b, L) {
      return this.generateInternalStream(b).accumulate(L);
    }, generateNodeStream: function(b, L) {
      return (b = b || {}).type || (b.type = "nodebuffer"), this.generateInternalStream(b).toNodejsStream(L);
    } };
    t.exports = w;
  }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(a, t, s) {
    t.exports = a("stream");
  }, { stream: void 0 }], 17: [function(a, t, s) {
    var n = a("./DataReader");
    function e(r) {
      n.call(this, r);
      for (var l = 0; l < this.data.length; l++) r[l] = 255 & r[l];
    }
    a("../utils").inherits(e, n), e.prototype.byteAt = function(r) {
      return this.data[this.zero + r];
    }, e.prototype.lastIndexOfSignature = function(r) {
      for (var l = r.charCodeAt(0), m = r.charCodeAt(1), c = r.charCodeAt(2), i = r.charCodeAt(3), d = this.length - 4; 0 <= d; --d) if (this.data[d] === l && this.data[d + 1] === m && this.data[d + 2] === c && this.data[d + 3] === i) return d - this.zero;
      return -1;
    }, e.prototype.readAndCheckSignature = function(r) {
      var l = r.charCodeAt(0), m = r.charCodeAt(1), c = r.charCodeAt(2), i = r.charCodeAt(3), d = this.readData(4);
      return l === d[0] && m === d[1] && c === d[2] && i === d[3];
    }, e.prototype.readData = function(r) {
      if (this.checkOffset(r), r === 0) return [];
      var l = this.data.slice(this.zero + this.index, this.zero + this.index + r);
      return this.index += r, l;
    }, t.exports = e;
  }, { "../utils": 32, "./DataReader": 18 }], 18: [function(a, t, s) {
    var n = a("../utils");
    function e(r) {
      this.data = r, this.length = r.length, this.index = 0, this.zero = 0;
    }
    e.prototype = { checkOffset: function(r) {
      this.checkIndex(this.index + r);
    }, checkIndex: function(r) {
      if (this.length < this.zero + r || r < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + r + "). Corrupted zip ?");
    }, setIndex: function(r) {
      this.checkIndex(r), this.index = r;
    }, skip: function(r) {
      this.setIndex(this.index + r);
    }, byteAt: function() {
    }, readInt: function(r) {
      var l, m = 0;
      for (this.checkOffset(r), l = this.index + r - 1; l >= this.index; l--) m = (m << 8) + this.byteAt(l);
      return this.index += r, m;
    }, readString: function(r) {
      return n.transformTo("string", this.readData(r));
    }, readData: function() {
    }, lastIndexOfSignature: function() {
    }, readAndCheckSignature: function() {
    }, readDate: function() {
      var r = this.readInt(4);
      return new Date(Date.UTC(1980 + (r >> 25 & 127), (r >> 21 & 15) - 1, r >> 16 & 31, r >> 11 & 31, r >> 5 & 63, (31 & r) << 1));
    } }, t.exports = e;
  }, { "../utils": 32 }], 19: [function(a, t, s) {
    var n = a("./Uint8ArrayReader");
    function e(r) {
      n.call(this, r);
    }
    a("../utils").inherits(e, n), e.prototype.readData = function(r) {
      this.checkOffset(r);
      var l = this.data.slice(this.zero + this.index, this.zero + this.index + r);
      return this.index += r, l;
    }, t.exports = e;
  }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(a, t, s) {
    var n = a("./DataReader");
    function e(r) {
      n.call(this, r);
    }
    a("../utils").inherits(e, n), e.prototype.byteAt = function(r) {
      return this.data.charCodeAt(this.zero + r);
    }, e.prototype.lastIndexOfSignature = function(r) {
      return this.data.lastIndexOf(r) - this.zero;
    }, e.prototype.readAndCheckSignature = function(r) {
      return r === this.readData(4);
    }, e.prototype.readData = function(r) {
      this.checkOffset(r);
      var l = this.data.slice(this.zero + this.index, this.zero + this.index + r);
      return this.index += r, l;
    }, t.exports = e;
  }, { "../utils": 32, "./DataReader": 18 }], 21: [function(a, t, s) {
    var n = a("./ArrayReader");
    function e(r) {
      n.call(this, r);
    }
    a("../utils").inherits(e, n), e.prototype.readData = function(r) {
      if (this.checkOffset(r), r === 0) return new Uint8Array(0);
      var l = this.data.subarray(this.zero + this.index, this.zero + this.index + r);
      return this.index += r, l;
    }, t.exports = e;
  }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(a, t, s) {
    var n = a("../utils"), e = a("../support"), r = a("./ArrayReader"), l = a("./StringReader"), m = a("./NodeBufferReader"), c = a("./Uint8ArrayReader");
    t.exports = function(i) {
      var d = n.getTypeOf(i);
      return n.checkSupport(d), d !== "string" || e.uint8array ? d === "nodebuffer" ? new m(i) : e.uint8array ? new c(n.transformTo("uint8array", i)) : new r(n.transformTo("array", i)) : new l(i);
    };
  }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(a, t, s) {
    s.LOCAL_FILE_HEADER = "PK", s.CENTRAL_FILE_HEADER = "PK", s.CENTRAL_DIRECTORY_END = "PK", s.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", s.ZIP64_CENTRAL_DIRECTORY_END = "PK", s.DATA_DESCRIPTOR = "PK\x07\b";
  }, {}], 24: [function(a, t, s) {
    var n = a("./GenericWorker"), e = a("../utils");
    function r(l) {
      n.call(this, "ConvertWorker to " + l), this.destType = l;
    }
    e.inherits(r, n), r.prototype.processChunk = function(l) {
      this.push({ data: e.transformTo(this.destType, l.data), meta: l.meta });
    }, t.exports = r;
  }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(a, t, s) {
    var n = a("./GenericWorker"), e = a("../crc32");
    function r() {
      n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
    }
    a("../utils").inherits(r, n), r.prototype.processChunk = function(l) {
      this.streamInfo.crc32 = e(l.data, this.streamInfo.crc32 || 0), this.push(l);
    }, t.exports = r;
  }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(a, t, s) {
    var n = a("../utils"), e = a("./GenericWorker");
    function r(l) {
      e.call(this, "DataLengthProbe for " + l), this.propName = l, this.withStreamInfo(l, 0);
    }
    n.inherits(r, e), r.prototype.processChunk = function(l) {
      if (l) {
        var m = this.streamInfo[this.propName] || 0;
        this.streamInfo[this.propName] = m + l.data.length;
      }
      e.prototype.processChunk.call(this, l);
    }, t.exports = r;
  }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(a, t, s) {
    var n = a("../utils"), e = a("./GenericWorker");
    function r(l) {
      e.call(this, "DataWorker");
      var m = this;
      this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, l.then(function(c) {
        m.dataIsReady = !0, m.data = c, m.max = c && c.length || 0, m.type = n.getTypeOf(c), m.isPaused || m._tickAndRepeat();
      }, function(c) {
        m.error(c);
      });
    }
    n.inherits(r, e), r.prototype.cleanUp = function() {
      e.prototype.cleanUp.call(this), this.data = null;
    }, r.prototype.resume = function() {
      return !!e.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, n.delay(this._tickAndRepeat, [], this)), !0);
    }, r.prototype._tickAndRepeat = function() {
      this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
    }, r.prototype._tick = function() {
      if (this.isPaused || this.isFinished) return !1;
      var l = null, m = Math.min(this.max, this.index + 16384);
      if (this.index >= this.max) return this.end();
      switch (this.type) {
        case "string":
          l = this.data.substring(this.index, m);
          break;
        case "uint8array":
          l = this.data.subarray(this.index, m);
          break;
        case "array":
        case "nodebuffer":
          l = this.data.slice(this.index, m);
      }
      return this.index = m, this.push({ data: l, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
    }, t.exports = r;
  }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(a, t, s) {
    function n(e) {
      this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
    }
    n.prototype = { push: function(e) {
      this.emit("data", e);
    }, end: function() {
      if (this.isFinished) return !1;
      this.flush();
      try {
        this.emit("end"), this.cleanUp(), this.isFinished = !0;
      } catch (e) {
        this.emit("error", e);
      }
      return !0;
    }, error: function(e) {
      return !this.isFinished && (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0);
    }, on: function(e, r) {
      return this._listeners[e].push(r), this;
    }, cleanUp: function() {
      this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
    }, emit: function(e, r) {
      if (this._listeners[e]) for (var l = 0; l < this._listeners[e].length; l++) this._listeners[e][l].call(this, r);
    }, pipe: function(e) {
      return e.registerPrevious(this);
    }, registerPrevious: function(e) {
      if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
      this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
      var r = this;
      return e.on("data", function(l) {
        r.processChunk(l);
      }), e.on("end", function() {
        r.end();
      }), e.on("error", function(l) {
        r.error(l);
      }), this;
    }, pause: function() {
      return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
    }, resume: function() {
      if (!this.isPaused || this.isFinished) return !1;
      var e = this.isPaused = !1;
      return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e;
    }, flush: function() {
    }, processChunk: function(e) {
      this.push(e);
    }, withStreamInfo: function(e, r) {
      return this.extraStreamInfo[e] = r, this.mergeStreamInfo(), this;
    }, mergeStreamInfo: function() {
      for (var e in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
    }, lock: function() {
      if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
      this.isLocked = !0, this.previous && this.previous.lock();
    }, toString: function() {
      var e = "Worker " + this.name;
      return this.previous ? this.previous + " -> " + e : e;
    } }, t.exports = n;
  }, {}], 29: [function(a, t, s) {
    var n = a("../utils"), e = a("./ConvertWorker"), r = a("./GenericWorker"), l = a("../base64"), m = a("../support"), c = a("../external"), i = null;
    if (m.nodestream) try {
      i = a("../nodejs/NodejsStreamOutputAdapter");
    } catch {
    }
    function d(x, f) {
      return new c.Promise(function(y, u) {
        var p = [], A = x._internalType, w = x._outputType, b = x._mimeType;
        x.on("data", function(L, v) {
          p.push(L), f && f(v);
        }).on("error", function(L) {
          p = [], u(L);
        }).on("end", function() {
          try {
            var L = (function(v, T, C) {
              switch (v) {
                case "blob":
                  return n.newBlob(n.transformTo("arraybuffer", T), C);
                case "base64":
                  return l.encode(T);
                default:
                  return n.transformTo(v, T);
              }
            })(w, (function(v, T) {
              var C, S = 0, q = null, R = 0;
              for (C = 0; C < T.length; C++) R += T[C].length;
              switch (v) {
                case "string":
                  return T.join("");
                case "array":
                  return Array.prototype.concat.apply([], T);
                case "uint8array":
                  for (q = new Uint8Array(R), C = 0; C < T.length; C++) q.set(T[C], S), S += T[C].length;
                  return q;
                case "nodebuffer":
                  return Buffer.concat(T);
                default:
                  throw new Error("concat : unsupported type '" + v + "'");
              }
            })(A, p), b);
            y(L);
          } catch (v) {
            u(v);
          }
          p = [];
        }).resume();
      });
    }
    function o(x, f, y) {
      var u = f;
      switch (f) {
        case "blob":
        case "arraybuffer":
          u = "uint8array";
          break;
        case "base64":
          u = "string";
      }
      try {
        this._internalType = u, this._outputType = f, this._mimeType = y, n.checkSupport(u), this._worker = x.pipe(new e(u)), x.lock();
      } catch (p) {
        this._worker = new r("error"), this._worker.error(p);
      }
    }
    o.prototype = { accumulate: function(x) {
      return d(this, x);
    }, on: function(x, f) {
      var y = this;
      return x === "data" ? this._worker.on(x, function(u) {
        f.call(y, u.data, u.meta);
      }) : this._worker.on(x, function() {
        n.delay(f, arguments, y);
      }), this;
    }, resume: function() {
      return n.delay(this._worker.resume, [], this._worker), this;
    }, pause: function() {
      return this._worker.pause(), this;
    }, toNodejsStream: function(x) {
      if (n.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
      return new i(this, { objectMode: this._outputType !== "nodebuffer" }, x);
    } }, t.exports = o;
  }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(a, t, s) {
    if (s.base64 = !0, s.array = !0, s.string = !0, s.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", s.nodebuffer = typeof Buffer < "u", s.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") s.blob = !1;
    else {
      var n = new ArrayBuffer(0);
      try {
        s.blob = new Blob([n], { type: "application/zip" }).size === 0;
      } catch {
        try {
          var e = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
          e.append(n), s.blob = e.getBlob("application/zip").size === 0;
        } catch {
          s.blob = !1;
        }
      }
    }
    try {
      s.nodestream = !!a("readable-stream").Readable;
    } catch {
      s.nodestream = !1;
    }
  }, { "readable-stream": 16 }], 31: [function(a, t, s) {
    for (var n = a("./utils"), e = a("./support"), r = a("./nodejsUtils"), l = a("./stream/GenericWorker"), m = new Array(256), c = 0; c < 256; c++) m[c] = 252 <= c ? 6 : 248 <= c ? 5 : 240 <= c ? 4 : 224 <= c ? 3 : 192 <= c ? 2 : 1;
    m[254] = m[254] = 1;
    function i() {
      l.call(this, "utf-8 decode"), this.leftOver = null;
    }
    function d() {
      l.call(this, "utf-8 encode");
    }
    s.utf8encode = function(o) {
      return e.nodebuffer ? r.newBufferFrom(o, "utf-8") : (function(x) {
        var f, y, u, p, A, w = x.length, b = 0;
        for (p = 0; p < w; p++) (64512 & (y = x.charCodeAt(p))) == 55296 && p + 1 < w && (64512 & (u = x.charCodeAt(p + 1))) == 56320 && (y = 65536 + (y - 55296 << 10) + (u - 56320), p++), b += y < 128 ? 1 : y < 2048 ? 2 : y < 65536 ? 3 : 4;
        for (f = e.uint8array ? new Uint8Array(b) : new Array(b), p = A = 0; A < b; p++) (64512 & (y = x.charCodeAt(p))) == 55296 && p + 1 < w && (64512 & (u = x.charCodeAt(p + 1))) == 56320 && (y = 65536 + (y - 55296 << 10) + (u - 56320), p++), y < 128 ? f[A++] = y : (y < 2048 ? f[A++] = 192 | y >>> 6 : (y < 65536 ? f[A++] = 224 | y >>> 12 : (f[A++] = 240 | y >>> 18, f[A++] = 128 | y >>> 12 & 63), f[A++] = 128 | y >>> 6 & 63), f[A++] = 128 | 63 & y);
        return f;
      })(o);
    }, s.utf8decode = function(o) {
      return e.nodebuffer ? n.transformTo("nodebuffer", o).toString("utf-8") : (function(x) {
        var f, y, u, p, A = x.length, w = new Array(2 * A);
        for (f = y = 0; f < A; ) if ((u = x[f++]) < 128) w[y++] = u;
        else if (4 < (p = m[u])) w[y++] = 65533, f += p - 1;
        else {
          for (u &= p === 2 ? 31 : p === 3 ? 15 : 7; 1 < p && f < A; ) u = u << 6 | 63 & x[f++], p--;
          1 < p ? w[y++] = 65533 : u < 65536 ? w[y++] = u : (u -= 65536, w[y++] = 55296 | u >> 10 & 1023, w[y++] = 56320 | 1023 & u);
        }
        return w.length !== y && (w.subarray ? w = w.subarray(0, y) : w.length = y), n.applyFromCharCode(w);
      })(o = n.transformTo(e.uint8array ? "uint8array" : "array", o));
    }, n.inherits(i, l), i.prototype.processChunk = function(o) {
      var x = n.transformTo(e.uint8array ? "uint8array" : "array", o.data);
      if (this.leftOver && this.leftOver.length) {
        if (e.uint8array) {
          var f = x;
          (x = new Uint8Array(f.length + this.leftOver.length)).set(this.leftOver, 0), x.set(f, this.leftOver.length);
        } else x = this.leftOver.concat(x);
        this.leftOver = null;
      }
      var y = (function(p, A) {
        var w;
        for ((A = A || p.length) > p.length && (A = p.length), w = A - 1; 0 <= w && (192 & p[w]) == 128; ) w--;
        return w < 0 || w === 0 ? A : w + m[p[w]] > A ? w : A;
      })(x), u = x;
      y !== x.length && (e.uint8array ? (u = x.subarray(0, y), this.leftOver = x.subarray(y, x.length)) : (u = x.slice(0, y), this.leftOver = x.slice(y, x.length))), this.push({ data: s.utf8decode(u), meta: o.meta });
    }, i.prototype.flush = function() {
      this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
    }, s.Utf8DecodeWorker = i, n.inherits(d, l), d.prototype.processChunk = function(o) {
      this.push({ data: s.utf8encode(o.data), meta: o.meta });
    }, s.Utf8EncodeWorker = d;
  }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(a, t, s) {
    var n = a("./support"), e = a("./base64"), r = a("./nodejsUtils"), l = a("./external");
    function m(f) {
      return f;
    }
    function c(f, y) {
      for (var u = 0; u < f.length; ++u) y[u] = 255 & f.charCodeAt(u);
      return y;
    }
    a("setimmediate"), s.newBlob = function(f, y) {
      s.checkSupport("blob");
      try {
        return new Blob([f], { type: y });
      } catch {
        try {
          var u = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
          return u.append(f), u.getBlob(y);
        } catch {
          throw new Error("Bug : can't construct the Blob.");
        }
      }
    };
    var i = { stringifyByChunk: function(f, y, u) {
      var p = [], A = 0, w = f.length;
      if (w <= u) return String.fromCharCode.apply(null, f);
      for (; A < w; ) y === "array" || y === "nodebuffer" ? p.push(String.fromCharCode.apply(null, f.slice(A, Math.min(A + u, w)))) : p.push(String.fromCharCode.apply(null, f.subarray(A, Math.min(A + u, w)))), A += u;
      return p.join("");
    }, stringifyByChar: function(f) {
      for (var y = "", u = 0; u < f.length; u++) y += String.fromCharCode(f[u]);
      return y;
    }, applyCanBeUsed: { uint8array: (function() {
      try {
        return n.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
      } catch {
        return !1;
      }
    })(), nodebuffer: (function() {
      try {
        return n.nodebuffer && String.fromCharCode.apply(null, r.allocBuffer(1)).length === 1;
      } catch {
        return !1;
      }
    })() } };
    function d(f) {
      var y = 65536, u = s.getTypeOf(f), p = !0;
      if (u === "uint8array" ? p = i.applyCanBeUsed.uint8array : u === "nodebuffer" && (p = i.applyCanBeUsed.nodebuffer), p) for (; 1 < y; ) try {
        return i.stringifyByChunk(f, u, y);
      } catch {
        y = Math.floor(y / 2);
      }
      return i.stringifyByChar(f);
    }
    function o(f, y) {
      for (var u = 0; u < f.length; u++) y[u] = f[u];
      return y;
    }
    s.applyFromCharCode = d;
    var x = {};
    x.string = { string: m, array: function(f) {
      return c(f, new Array(f.length));
    }, arraybuffer: function(f) {
      return x.string.uint8array(f).buffer;
    }, uint8array: function(f) {
      return c(f, new Uint8Array(f.length));
    }, nodebuffer: function(f) {
      return c(f, r.allocBuffer(f.length));
    } }, x.array = { string: d, array: m, arraybuffer: function(f) {
      return new Uint8Array(f).buffer;
    }, uint8array: function(f) {
      return new Uint8Array(f);
    }, nodebuffer: function(f) {
      return r.newBufferFrom(f);
    } }, x.arraybuffer = { string: function(f) {
      return d(new Uint8Array(f));
    }, array: function(f) {
      return o(new Uint8Array(f), new Array(f.byteLength));
    }, arraybuffer: m, uint8array: function(f) {
      return new Uint8Array(f);
    }, nodebuffer: function(f) {
      return r.newBufferFrom(new Uint8Array(f));
    } }, x.uint8array = { string: d, array: function(f) {
      return o(f, new Array(f.length));
    }, arraybuffer: function(f) {
      return f.buffer;
    }, uint8array: m, nodebuffer: function(f) {
      return r.newBufferFrom(f);
    } }, x.nodebuffer = { string: d, array: function(f) {
      return o(f, new Array(f.length));
    }, arraybuffer: function(f) {
      return x.nodebuffer.uint8array(f).buffer;
    }, uint8array: function(f) {
      return o(f, new Uint8Array(f.length));
    }, nodebuffer: m }, s.transformTo = function(f, y) {
      if (y = y || "", !f) return y;
      s.checkSupport(f);
      var u = s.getTypeOf(y);
      return x[u][f](y);
    }, s.resolve = function(f) {
      for (var y = f.split("/"), u = [], p = 0; p < y.length; p++) {
        var A = y[p];
        A === "." || A === "" && p !== 0 && p !== y.length - 1 || (A === ".." ? u.pop() : u.push(A));
      }
      return u.join("/");
    }, s.getTypeOf = function(f) {
      return typeof f == "string" ? "string" : Object.prototype.toString.call(f) === "[object Array]" ? "array" : n.nodebuffer && r.isBuffer(f) ? "nodebuffer" : n.uint8array && f instanceof Uint8Array ? "uint8array" : n.arraybuffer && f instanceof ArrayBuffer ? "arraybuffer" : void 0;
    }, s.checkSupport = function(f) {
      if (!n[f.toLowerCase()]) throw new Error(f + " is not supported by this platform");
    }, s.MAX_VALUE_16BITS = 65535, s.MAX_VALUE_32BITS = -1, s.pretty = function(f) {
      var y, u, p = "";
      for (u = 0; u < (f || "").length; u++) p += "\\x" + ((y = f.charCodeAt(u)) < 16 ? "0" : "") + y.toString(16).toUpperCase();
      return p;
    }, s.delay = function(f, y, u) {
      setImmediate(function() {
        f.apply(u || null, y || []);
      });
    }, s.inherits = function(f, y) {
      function u() {
      }
      u.prototype = y.prototype, f.prototype = new u();
    }, s.extend = function() {
      var f, y, u = {};
      for (f = 0; f < arguments.length; f++) for (y in arguments[f]) Object.prototype.hasOwnProperty.call(arguments[f], y) && u[y] === void 0 && (u[y] = arguments[f][y]);
      return u;
    }, s.prepareContent = function(f, y, u, p, A) {
      return l.Promise.resolve(y).then(function(w) {
        return n.blob && (w instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(w)) !== -1) && typeof FileReader < "u" ? new l.Promise(function(b, L) {
          var v = new FileReader();
          v.onload = function(T) {
            b(T.target.result);
          }, v.onerror = function(T) {
            L(T.target.error);
          }, v.readAsArrayBuffer(w);
        }) : w;
      }).then(function(w) {
        var b = s.getTypeOf(w);
        return b ? (b === "arraybuffer" ? w = s.transformTo("uint8array", w) : b === "string" && (A ? w = e.decode(w) : u && p !== !0 && (w = (function(L) {
          return c(L, n.uint8array ? new Uint8Array(L.length) : new Array(L.length));
        })(w))), w) : l.Promise.reject(new Error("Can't read the data of '" + f + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
      });
    };
  }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(a, t, s) {
    var n = a("./reader/readerFor"), e = a("./utils"), r = a("./signature"), l = a("./zipEntry"), m = a("./support");
    function c(i) {
      this.files = [], this.loadOptions = i;
    }
    c.prototype = { checkSignature: function(i) {
      if (!this.reader.readAndCheckSignature(i)) {
        this.reader.index -= 4;
        var d = this.reader.readString(4);
        throw new Error("Corrupted zip or bug: unexpected signature (" + e.pretty(d) + ", expected " + e.pretty(i) + ")");
      }
    }, isSignature: function(i, d) {
      var o = this.reader.index;
      this.reader.setIndex(i);
      var x = this.reader.readString(4) === d;
      return this.reader.setIndex(o), x;
    }, readBlockEndOfCentral: function() {
      this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
      var i = this.reader.readData(this.zipCommentLength), d = m.uint8array ? "uint8array" : "array", o = e.transformTo(d, i);
      this.zipComment = this.loadOptions.decodeFileName(o);
    }, readBlockZip64EndOfCentral: function() {
      this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
      for (var i, d, o, x = this.zip64EndOfCentralSize - 44; 0 < x; ) i = this.reader.readInt(2), d = this.reader.readInt(4), o = this.reader.readData(d), this.zip64ExtensibleData[i] = { id: i, length: d, value: o };
    }, readBlockZip64EndOfCentralLocator: function() {
      if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
    }, readLocalFiles: function() {
      var i, d;
      for (i = 0; i < this.files.length; i++) d = this.files[i], this.reader.setIndex(d.localHeaderOffset), this.checkSignature(r.LOCAL_FILE_HEADER), d.readLocalPart(this.reader), d.handleUTF8(), d.processAttributes();
    }, readCentralDir: function() {
      var i;
      for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER); ) (i = new l({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(i);
      if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
    }, readEndOfCentral: function() {
      var i = this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);
      if (i < 0) throw this.isSignature(0, r.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
      this.reader.setIndex(i);
      var d = i;
      if (this.checkSignature(r.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === e.MAX_VALUE_16BITS || this.diskWithCentralDirStart === e.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === e.MAX_VALUE_16BITS || this.centralDirRecords === e.MAX_VALUE_16BITS || this.centralDirSize === e.MAX_VALUE_32BITS || this.centralDirOffset === e.MAX_VALUE_32BITS) {
        if (this.zip64 = !0, (i = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
        if (this.reader.setIndex(i), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, r.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
      }
      var o = this.centralDirOffset + this.centralDirSize;
      this.zip64 && (o += 20, o += 12 + this.zip64EndOfCentralSize);
      var x = d - o;
      if (0 < x) this.isSignature(d, r.CENTRAL_FILE_HEADER) || (this.reader.zero = x);
      else if (x < 0) throw new Error("Corrupted zip: missing " + Math.abs(x) + " bytes.");
    }, prepareReader: function(i) {
      this.reader = n(i);
    }, load: function(i) {
      this.prepareReader(i), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
    } }, t.exports = c;
  }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(a, t, s) {
    var n = a("./reader/readerFor"), e = a("./utils"), r = a("./compressedObject"), l = a("./crc32"), m = a("./utf8"), c = a("./compressions"), i = a("./support");
    function d(o, x) {
      this.options = o, this.loadOptions = x;
    }
    d.prototype = { isEncrypted: function() {
      return (1 & this.bitFlag) == 1;
    }, useUTF8: function() {
      return (2048 & this.bitFlag) == 2048;
    }, readLocalPart: function(o) {
      var x, f;
      if (o.skip(22), this.fileNameLength = o.readInt(2), f = o.readInt(2), this.fileName = o.readData(this.fileNameLength), o.skip(f), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
      if ((x = (function(y) {
        for (var u in c) if (Object.prototype.hasOwnProperty.call(c, u) && c[u].magic === y) return c[u];
        return null;
      })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + e.pretty(this.compressionMethod) + " unknown (inner file : " + e.transformTo("string", this.fileName) + ")");
      this.decompressed = new r(this.compressedSize, this.uncompressedSize, this.crc32, x, o.readData(this.compressedSize));
    }, readCentralPart: function(o) {
      this.versionMadeBy = o.readInt(2), o.skip(2), this.bitFlag = o.readInt(2), this.compressionMethod = o.readString(2), this.date = o.readDate(), this.crc32 = o.readInt(4), this.compressedSize = o.readInt(4), this.uncompressedSize = o.readInt(4);
      var x = o.readInt(2);
      if (this.extraFieldsLength = o.readInt(2), this.fileCommentLength = o.readInt(2), this.diskNumberStart = o.readInt(2), this.internalFileAttributes = o.readInt(2), this.externalFileAttributes = o.readInt(4), this.localHeaderOffset = o.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
      o.skip(x), this.readExtraFields(o), this.parseZIP64ExtraField(o), this.fileComment = o.readData(this.fileCommentLength);
    }, processAttributes: function() {
      this.unixPermissions = null, this.dosPermissions = null;
      var o = this.versionMadeBy >> 8;
      this.dir = !!(16 & this.externalFileAttributes), o == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), o == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
    }, parseZIP64ExtraField: function() {
      if (this.extraFields[1]) {
        var o = n(this.extraFields[1].value);
        this.uncompressedSize === e.MAX_VALUE_32BITS && (this.uncompressedSize = o.readInt(8)), this.compressedSize === e.MAX_VALUE_32BITS && (this.compressedSize = o.readInt(8)), this.localHeaderOffset === e.MAX_VALUE_32BITS && (this.localHeaderOffset = o.readInt(8)), this.diskNumberStart === e.MAX_VALUE_32BITS && (this.diskNumberStart = o.readInt(4));
      }
    }, readExtraFields: function(o) {
      var x, f, y, u = o.index + this.extraFieldsLength;
      for (this.extraFields || (this.extraFields = {}); o.index + 4 < u; ) x = o.readInt(2), f = o.readInt(2), y = o.readData(f), this.extraFields[x] = { id: x, length: f, value: y };
      o.setIndex(u);
    }, handleUTF8: function() {
      var o = i.uint8array ? "uint8array" : "array";
      if (this.useUTF8()) this.fileNameStr = m.utf8decode(this.fileName), this.fileCommentStr = m.utf8decode(this.fileComment);
      else {
        var x = this.findExtraFieldUnicodePath();
        if (x !== null) this.fileNameStr = x;
        else {
          var f = e.transformTo(o, this.fileName);
          this.fileNameStr = this.loadOptions.decodeFileName(f);
        }
        var y = this.findExtraFieldUnicodeComment();
        if (y !== null) this.fileCommentStr = y;
        else {
          var u = e.transformTo(o, this.fileComment);
          this.fileCommentStr = this.loadOptions.decodeFileName(u);
        }
      }
    }, findExtraFieldUnicodePath: function() {
      var o = this.extraFields[28789];
      if (o) {
        var x = n(o.value);
        return x.readInt(1) !== 1 || l(this.fileName) !== x.readInt(4) ? null : m.utf8decode(x.readData(o.length - 5));
      }
      return null;
    }, findExtraFieldUnicodeComment: function() {
      var o = this.extraFields[25461];
      if (o) {
        var x = n(o.value);
        return x.readInt(1) !== 1 || l(this.fileComment) !== x.readInt(4) ? null : m.utf8decode(x.readData(o.length - 5));
      }
      return null;
    } }, t.exports = d;
  }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(a, t, s) {
    function n(x, f, y) {
      this.name = x, this.dir = y.dir, this.date = y.date, this.comment = y.comment, this.unixPermissions = y.unixPermissions, this.dosPermissions = y.dosPermissions, this._data = f, this._dataBinary = y.binary, this.options = { compression: y.compression, compressionOptions: y.compressionOptions };
    }
    var e = a("./stream/StreamHelper"), r = a("./stream/DataWorker"), l = a("./utf8"), m = a("./compressedObject"), c = a("./stream/GenericWorker");
    n.prototype = { internalStream: function(x) {
      var f = null, y = "string";
      try {
        if (!x) throw new Error("No output type specified.");
        var u = (y = x.toLowerCase()) === "string" || y === "text";
        y !== "binarystring" && y !== "text" || (y = "string"), f = this._decompressWorker();
        var p = !this._dataBinary;
        p && !u && (f = f.pipe(new l.Utf8EncodeWorker())), !p && u && (f = f.pipe(new l.Utf8DecodeWorker()));
      } catch (A) {
        (f = new c("error")).error(A);
      }
      return new e(f, y, "");
    }, async: function(x, f) {
      return this.internalStream(x).accumulate(f);
    }, nodeStream: function(x, f) {
      return this.internalStream(x || "nodebuffer").toNodejsStream(f);
    }, _compressWorker: function(x, f) {
      if (this._data instanceof m && this._data.compression.magic === x.magic) return this._data.getCompressedWorker();
      var y = this._decompressWorker();
      return this._dataBinary || (y = y.pipe(new l.Utf8EncodeWorker())), m.createWorkerFrom(y, x, f);
    }, _decompressWorker: function() {
      return this._data instanceof m ? this._data.getContentWorker() : this._data instanceof c ? this._data : new r(this._data);
    } };
    for (var i = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], d = function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    }, o = 0; o < i.length; o++) n.prototype[i[o]] = d;
    t.exports = n;
  }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(a, t, s) {
    (function(n) {
      var e, r, l = n.MutationObserver || n.WebKitMutationObserver;
      if (l) {
        var m = 0, c = new l(x), i = n.document.createTextNode("");
        c.observe(i, { characterData: !0 }), e = function() {
          i.data = m = ++m % 2;
        };
      } else if (n.setImmediate || n.MessageChannel === void 0) e = "document" in n && "onreadystatechange" in n.document.createElement("script") ? function() {
        var f = n.document.createElement("script");
        f.onreadystatechange = function() {
          x(), f.onreadystatechange = null, f.parentNode.removeChild(f), f = null;
        }, n.document.documentElement.appendChild(f);
      } : function() {
        setTimeout(x, 0);
      };
      else {
        var d = new n.MessageChannel();
        d.port1.onmessage = x, e = function() {
          d.port2.postMessage(0);
        };
      }
      var o = [];
      function x() {
        var f, y;
        r = !0;
        for (var u = o.length; u; ) {
          for (y = o, o = [], f = -1; ++f < u; ) y[f]();
          u = o.length;
        }
        r = !1;
      }
      t.exports = function(f) {
        o.push(f) !== 1 || r || e();
      };
    }).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
  }, {}], 37: [function(a, t, s) {
    var n = a("immediate");
    function e() {
    }
    var r = {}, l = ["REJECTED"], m = ["FULFILLED"], c = ["PENDING"];
    function i(u) {
      if (typeof u != "function") throw new TypeError("resolver must be a function");
      this.state = c, this.queue = [], this.outcome = void 0, u !== e && f(this, u);
    }
    function d(u, p, A) {
      this.promise = u, typeof p == "function" && (this.onFulfilled = p, this.callFulfilled = this.otherCallFulfilled), typeof A == "function" && (this.onRejected = A, this.callRejected = this.otherCallRejected);
    }
    function o(u, p, A) {
      n(function() {
        var w;
        try {
          w = p(A);
        } catch (b) {
          return r.reject(u, b);
        }
        w === u ? r.reject(u, new TypeError("Cannot resolve promise with itself")) : r.resolve(u, w);
      });
    }
    function x(u) {
      var p = u && u.then;
      if (u && (typeof u == "object" || typeof u == "function") && typeof p == "function") return function() {
        p.apply(u, arguments);
      };
    }
    function f(u, p) {
      var A = !1;
      function w(v) {
        A || (A = !0, r.reject(u, v));
      }
      function b(v) {
        A || (A = !0, r.resolve(u, v));
      }
      var L = y(function() {
        p(b, w);
      });
      L.status === "error" && w(L.value);
    }
    function y(u, p) {
      var A = {};
      try {
        A.value = u(p), A.status = "success";
      } catch (w) {
        A.status = "error", A.value = w;
      }
      return A;
    }
    (t.exports = i).prototype.finally = function(u) {
      if (typeof u != "function") return this;
      var p = this.constructor;
      return this.then(function(A) {
        return p.resolve(u()).then(function() {
          return A;
        });
      }, function(A) {
        return p.resolve(u()).then(function() {
          throw A;
        });
      });
    }, i.prototype.catch = function(u) {
      return this.then(null, u);
    }, i.prototype.then = function(u, p) {
      if (typeof u != "function" && this.state === m || typeof p != "function" && this.state === l) return this;
      var A = new this.constructor(e);
      return this.state !== c ? o(A, this.state === m ? u : p, this.outcome) : this.queue.push(new d(A, u, p)), A;
    }, d.prototype.callFulfilled = function(u) {
      r.resolve(this.promise, u);
    }, d.prototype.otherCallFulfilled = function(u) {
      o(this.promise, this.onFulfilled, u);
    }, d.prototype.callRejected = function(u) {
      r.reject(this.promise, u);
    }, d.prototype.otherCallRejected = function(u) {
      o(this.promise, this.onRejected, u);
    }, r.resolve = function(u, p) {
      var A = y(x, p);
      if (A.status === "error") return r.reject(u, A.value);
      var w = A.value;
      if (w) f(u, w);
      else {
        u.state = m, u.outcome = p;
        for (var b = -1, L = u.queue.length; ++b < L; ) u.queue[b].callFulfilled(p);
      }
      return u;
    }, r.reject = function(u, p) {
      u.state = l, u.outcome = p;
      for (var A = -1, w = u.queue.length; ++A < w; ) u.queue[A].callRejected(p);
      return u;
    }, i.resolve = function(u) {
      return u instanceof this ? u : r.resolve(new this(e), u);
    }, i.reject = function(u) {
      var p = new this(e);
      return r.reject(p, u);
    }, i.all = function(u) {
      var p = this;
      if (Object.prototype.toString.call(u) !== "[object Array]") return this.reject(new TypeError("must be an array"));
      var A = u.length, w = !1;
      if (!A) return this.resolve([]);
      for (var b = new Array(A), L = 0, v = -1, T = new this(e); ++v < A; ) C(u[v], v);
      return T;
      function C(S, q) {
        p.resolve(S).then(function(R) {
          b[q] = R, ++L !== A || w || (w = !0, r.resolve(T, b));
        }, function(R) {
          w || (w = !0, r.reject(T, R));
        });
      }
    }, i.race = function(u) {
      var p = this;
      if (Object.prototype.toString.call(u) !== "[object Array]") return this.reject(new TypeError("must be an array"));
      var A = u.length, w = !1;
      if (!A) return this.resolve([]);
      for (var b = -1, L = new this(e); ++b < A; ) v = u[b], p.resolve(v).then(function(T) {
        w || (w = !0, r.resolve(L, T));
      }, function(T) {
        w || (w = !0, r.reject(L, T));
      });
      var v;
      return L;
    };
  }, { immediate: 36 }], 38: [function(a, t, s) {
    var n = {};
    (0, a("./lib/utils/common").assign)(n, a("./lib/deflate"), a("./lib/inflate"), a("./lib/zlib/constants")), t.exports = n;
  }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(a, t, s) {
    var n = a("./zlib/deflate"), e = a("./utils/common"), r = a("./utils/strings"), l = a("./zlib/messages"), m = a("./zlib/zstream"), c = Object.prototype.toString, i = 0, d = -1, o = 0, x = 8;
    function f(u) {
      if (!(this instanceof f)) return new f(u);
      this.options = e.assign({ level: d, method: x, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: o, to: "" }, u || {});
      var p = this.options;
      p.raw && 0 < p.windowBits ? p.windowBits = -p.windowBits : p.gzip && 0 < p.windowBits && p.windowBits < 16 && (p.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new m(), this.strm.avail_out = 0;
      var A = n.deflateInit2(this.strm, p.level, p.method, p.windowBits, p.memLevel, p.strategy);
      if (A !== i) throw new Error(l[A]);
      if (p.header && n.deflateSetHeader(this.strm, p.header), p.dictionary) {
        var w;
        if (w = typeof p.dictionary == "string" ? r.string2buf(p.dictionary) : c.call(p.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(p.dictionary) : p.dictionary, (A = n.deflateSetDictionary(this.strm, w)) !== i) throw new Error(l[A]);
        this._dict_set = !0;
      }
    }
    function y(u, p) {
      var A = new f(p);
      if (A.push(u, !0), A.err) throw A.msg || l[A.err];
      return A.result;
    }
    f.prototype.push = function(u, p) {
      var A, w, b = this.strm, L = this.options.chunkSize;
      if (this.ended) return !1;
      w = p === ~~p ? p : p === !0 ? 4 : 0, typeof u == "string" ? b.input = r.string2buf(u) : c.call(u) === "[object ArrayBuffer]" ? b.input = new Uint8Array(u) : b.input = u, b.next_in = 0, b.avail_in = b.input.length;
      do {
        if (b.avail_out === 0 && (b.output = new e.Buf8(L), b.next_out = 0, b.avail_out = L), (A = n.deflate(b, w)) !== 1 && A !== i) return this.onEnd(A), !(this.ended = !0);
        b.avail_out !== 0 && (b.avail_in !== 0 || w !== 4 && w !== 2) || (this.options.to === "string" ? this.onData(r.buf2binstring(e.shrinkBuf(b.output, b.next_out))) : this.onData(e.shrinkBuf(b.output, b.next_out)));
      } while ((0 < b.avail_in || b.avail_out === 0) && A !== 1);
      return w === 4 ? (A = n.deflateEnd(this.strm), this.onEnd(A), this.ended = !0, A === i) : w !== 2 || (this.onEnd(i), !(b.avail_out = 0));
    }, f.prototype.onData = function(u) {
      this.chunks.push(u);
    }, f.prototype.onEnd = function(u) {
      u === i && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = u, this.msg = this.strm.msg;
    }, s.Deflate = f, s.deflate = y, s.deflateRaw = function(u, p) {
      return (p = p || {}).raw = !0, y(u, p);
    }, s.gzip = function(u, p) {
      return (p = p || {}).gzip = !0, y(u, p);
    };
  }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(a, t, s) {
    var n = a("./zlib/inflate"), e = a("./utils/common"), r = a("./utils/strings"), l = a("./zlib/constants"), m = a("./zlib/messages"), c = a("./zlib/zstream"), i = a("./zlib/gzheader"), d = Object.prototype.toString;
    function o(f) {
      if (!(this instanceof o)) return new o(f);
      this.options = e.assign({ chunkSize: 16384, windowBits: 0, to: "" }, f || {});
      var y = this.options;
      y.raw && 0 <= y.windowBits && y.windowBits < 16 && (y.windowBits = -y.windowBits, y.windowBits === 0 && (y.windowBits = -15)), !(0 <= y.windowBits && y.windowBits < 16) || f && f.windowBits || (y.windowBits += 32), 15 < y.windowBits && y.windowBits < 48 && (15 & y.windowBits) == 0 && (y.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new c(), this.strm.avail_out = 0;
      var u = n.inflateInit2(this.strm, y.windowBits);
      if (u !== l.Z_OK) throw new Error(m[u]);
      this.header = new i(), n.inflateGetHeader(this.strm, this.header);
    }
    function x(f, y) {
      var u = new o(y);
      if (u.push(f, !0), u.err) throw u.msg || m[u.err];
      return u.result;
    }
    o.prototype.push = function(f, y) {
      var u, p, A, w, b, L, v = this.strm, T = this.options.chunkSize, C = this.options.dictionary, S = !1;
      if (this.ended) return !1;
      p = y === ~~y ? y : y === !0 ? l.Z_FINISH : l.Z_NO_FLUSH, typeof f == "string" ? v.input = r.binstring2buf(f) : d.call(f) === "[object ArrayBuffer]" ? v.input = new Uint8Array(f) : v.input = f, v.next_in = 0, v.avail_in = v.input.length;
      do {
        if (v.avail_out === 0 && (v.output = new e.Buf8(T), v.next_out = 0, v.avail_out = T), (u = n.inflate(v, l.Z_NO_FLUSH)) === l.Z_NEED_DICT && C && (L = typeof C == "string" ? r.string2buf(C) : d.call(C) === "[object ArrayBuffer]" ? new Uint8Array(C) : C, u = n.inflateSetDictionary(this.strm, L)), u === l.Z_BUF_ERROR && S === !0 && (u = l.Z_OK, S = !1), u !== l.Z_STREAM_END && u !== l.Z_OK) return this.onEnd(u), !(this.ended = !0);
        v.next_out && (v.avail_out !== 0 && u !== l.Z_STREAM_END && (v.avail_in !== 0 || p !== l.Z_FINISH && p !== l.Z_SYNC_FLUSH) || (this.options.to === "string" ? (A = r.utf8border(v.output, v.next_out), w = v.next_out - A, b = r.buf2string(v.output, A), v.next_out = w, v.avail_out = T - w, w && e.arraySet(v.output, v.output, A, w, 0), this.onData(b)) : this.onData(e.shrinkBuf(v.output, v.next_out)))), v.avail_in === 0 && v.avail_out === 0 && (S = !0);
      } while ((0 < v.avail_in || v.avail_out === 0) && u !== l.Z_STREAM_END);
      return u === l.Z_STREAM_END && (p = l.Z_FINISH), p === l.Z_FINISH ? (u = n.inflateEnd(this.strm), this.onEnd(u), this.ended = !0, u === l.Z_OK) : p !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK), !(v.avail_out = 0));
    }, o.prototype.onData = function(f) {
      this.chunks.push(f);
    }, o.prototype.onEnd = function(f) {
      f === l.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = f, this.msg = this.strm.msg;
    }, s.Inflate = o, s.inflate = x, s.inflateRaw = function(f, y) {
      return (y = y || {}).raw = !0, x(f, y);
    }, s.ungzip = x;
  }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(a, t, s) {
    var n = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
    s.assign = function(l) {
      for (var m = Array.prototype.slice.call(arguments, 1); m.length; ) {
        var c = m.shift();
        if (c) {
          if (typeof c != "object") throw new TypeError(c + "must be non-object");
          for (var i in c) c.hasOwnProperty(i) && (l[i] = c[i]);
        }
      }
      return l;
    }, s.shrinkBuf = function(l, m) {
      return l.length === m ? l : l.subarray ? l.subarray(0, m) : (l.length = m, l);
    };
    var e = { arraySet: function(l, m, c, i, d) {
      if (m.subarray && l.subarray) l.set(m.subarray(c, c + i), d);
      else for (var o = 0; o < i; o++) l[d + o] = m[c + o];
    }, flattenChunks: function(l) {
      var m, c, i, d, o, x;
      for (m = i = 0, c = l.length; m < c; m++) i += l[m].length;
      for (x = new Uint8Array(i), m = d = 0, c = l.length; m < c; m++) o = l[m], x.set(o, d), d += o.length;
      return x;
    } }, r = { arraySet: function(l, m, c, i, d) {
      for (var o = 0; o < i; o++) l[d + o] = m[c + o];
    }, flattenChunks: function(l) {
      return [].concat.apply([], l);
    } };
    s.setTyped = function(l) {
      l ? (s.Buf8 = Uint8Array, s.Buf16 = Uint16Array, s.Buf32 = Int32Array, s.assign(s, e)) : (s.Buf8 = Array, s.Buf16 = Array, s.Buf32 = Array, s.assign(s, r));
    }, s.setTyped(n);
  }, {}], 42: [function(a, t, s) {
    var n = a("./common"), e = !0, r = !0;
    try {
      String.fromCharCode.apply(null, [0]);
    } catch {
      e = !1;
    }
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch {
      r = !1;
    }
    for (var l = new n.Buf8(256), m = 0; m < 256; m++) l[m] = 252 <= m ? 6 : 248 <= m ? 5 : 240 <= m ? 4 : 224 <= m ? 3 : 192 <= m ? 2 : 1;
    function c(i, d) {
      if (d < 65537 && (i.subarray && r || !i.subarray && e)) return String.fromCharCode.apply(null, n.shrinkBuf(i, d));
      for (var o = "", x = 0; x < d; x++) o += String.fromCharCode(i[x]);
      return o;
    }
    l[254] = l[254] = 1, s.string2buf = function(i) {
      var d, o, x, f, y, u = i.length, p = 0;
      for (f = 0; f < u; f++) (64512 & (o = i.charCodeAt(f))) == 55296 && f + 1 < u && (64512 & (x = i.charCodeAt(f + 1))) == 56320 && (o = 65536 + (o - 55296 << 10) + (x - 56320), f++), p += o < 128 ? 1 : o < 2048 ? 2 : o < 65536 ? 3 : 4;
      for (d = new n.Buf8(p), f = y = 0; y < p; f++) (64512 & (o = i.charCodeAt(f))) == 55296 && f + 1 < u && (64512 & (x = i.charCodeAt(f + 1))) == 56320 && (o = 65536 + (o - 55296 << 10) + (x - 56320), f++), o < 128 ? d[y++] = o : (o < 2048 ? d[y++] = 192 | o >>> 6 : (o < 65536 ? d[y++] = 224 | o >>> 12 : (d[y++] = 240 | o >>> 18, d[y++] = 128 | o >>> 12 & 63), d[y++] = 128 | o >>> 6 & 63), d[y++] = 128 | 63 & o);
      return d;
    }, s.buf2binstring = function(i) {
      return c(i, i.length);
    }, s.binstring2buf = function(i) {
      for (var d = new n.Buf8(i.length), o = 0, x = d.length; o < x; o++) d[o] = i.charCodeAt(o);
      return d;
    }, s.buf2string = function(i, d) {
      var o, x, f, y, u = d || i.length, p = new Array(2 * u);
      for (o = x = 0; o < u; ) if ((f = i[o++]) < 128) p[x++] = f;
      else if (4 < (y = l[f])) p[x++] = 65533, o += y - 1;
      else {
        for (f &= y === 2 ? 31 : y === 3 ? 15 : 7; 1 < y && o < u; ) f = f << 6 | 63 & i[o++], y--;
        1 < y ? p[x++] = 65533 : f < 65536 ? p[x++] = f : (f -= 65536, p[x++] = 55296 | f >> 10 & 1023, p[x++] = 56320 | 1023 & f);
      }
      return c(p, x);
    }, s.utf8border = function(i, d) {
      var o;
      for ((d = d || i.length) > i.length && (d = i.length), o = d - 1; 0 <= o && (192 & i[o]) == 128; ) o--;
      return o < 0 || o === 0 ? d : o + l[i[o]] > d ? o : d;
    };
  }, { "./common": 41 }], 43: [function(a, t, s) {
    t.exports = function(n, e, r, l) {
      for (var m = 65535 & n | 0, c = n >>> 16 & 65535 | 0, i = 0; r !== 0; ) {
        for (r -= i = 2e3 < r ? 2e3 : r; c = c + (m = m + e[l++] | 0) | 0, --i; ) ;
        m %= 65521, c %= 65521;
      }
      return m | c << 16 | 0;
    };
  }, {}], 44: [function(a, t, s) {
    t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
  }, {}], 45: [function(a, t, s) {
    var n = (function() {
      for (var e, r = [], l = 0; l < 256; l++) {
        e = l;
        for (var m = 0; m < 8; m++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
        r[l] = e;
      }
      return r;
    })();
    t.exports = function(e, r, l, m) {
      var c = n, i = m + l;
      e ^= -1;
      for (var d = m; d < i; d++) e = e >>> 8 ^ c[255 & (e ^ r[d])];
      return -1 ^ e;
    };
  }, {}], 46: [function(a, t, s) {
    var n, e = a("../utils/common"), r = a("./trees"), l = a("./adler32"), m = a("./crc32"), c = a("./messages"), i = 0, d = 4, o = 0, x = -2, f = -1, y = 4, u = 2, p = 8, A = 9, w = 286, b = 30, L = 19, v = 2 * w + 1, T = 15, C = 3, S = 258, q = S + C + 1, R = 42, k = 113, g = 1, P = 2, E = 3, I = 4;
    function U(h, W) {
      return h.msg = c[W], W;
    }
    function D(h) {
      return (h << 1) - (4 < h ? 9 : 0);
    }
    function N(h) {
      for (var W = h.length; 0 <= --W; ) h[W] = 0;
    }
    function B(h) {
      var W = h.state, Z = W.pending;
      Z > h.avail_out && (Z = h.avail_out), Z !== 0 && (e.arraySet(h.output, W.pending_buf, W.pending_out, Z, h.next_out), h.next_out += Z, W.pending_out += Z, h.total_out += Z, h.avail_out -= Z, W.pending -= Z, W.pending === 0 && (W.pending_out = 0));
    }
    function _(h, W) {
      r._tr_flush_block(h, 0 <= h.block_start ? h.block_start : -1, h.strstart - h.block_start, W), h.block_start = h.strstart, B(h.strm);
    }
    function J(h, W) {
      h.pending_buf[h.pending++] = W;
    }
    function aa(h, W) {
      h.pending_buf[h.pending++] = W >>> 8 & 255, h.pending_buf[h.pending++] = 255 & W;
    }
    function Q(h, W) {
      var Z, j, M = h.max_chain_length, $ = h.strstart, z = h.prev_length, G = h.nice_match, O = h.strstart > h.w_size - q ? h.strstart - (h.w_size - q) : 0, Y = h.window, sa = h.w_mask, ta = h.prev, ca = h.strstart + S, oa = Y[$ + z - 1], da = Y[$ + z];
      h.prev_length >= h.good_match && (M >>= 2), G > h.lookahead && (G = h.lookahead);
      do
        if (Y[(Z = W) + z] === da && Y[Z + z - 1] === oa && Y[Z] === Y[$] && Y[++Z] === Y[$ + 1]) {
          $ += 2, Z++;
          do
            ;
          while (Y[++$] === Y[++Z] && Y[++$] === Y[++Z] && Y[++$] === Y[++Z] && Y[++$] === Y[++Z] && Y[++$] === Y[++Z] && Y[++$] === Y[++Z] && Y[++$] === Y[++Z] && Y[++$] === Y[++Z] && $ < ca);
          if (j = S - (ca - $), $ = ca - S, z < j) {
            if (h.match_start = W, G <= (z = j)) break;
            oa = Y[$ + z - 1], da = Y[$ + z];
          }
        }
      while ((W = ta[W & sa]) > O && --M != 0);
      return z <= h.lookahead ? z : h.lookahead;
    }
    function pa(h) {
      var W, Z, j, M, $, z, G, O, Y, sa, ta = h.w_size;
      do {
        if (M = h.window_size - h.lookahead - h.strstart, h.strstart >= ta + (ta - q)) {
          for (e.arraySet(h.window, h.window, ta, ta, 0), h.match_start -= ta, h.strstart -= ta, h.block_start -= ta, W = Z = h.hash_size; j = h.head[--W], h.head[W] = ta <= j ? j - ta : 0, --Z; ) ;
          for (W = Z = ta; j = h.prev[--W], h.prev[W] = ta <= j ? j - ta : 0, --Z; ) ;
          M += ta;
        }
        if (h.strm.avail_in === 0) break;
        if (z = h.strm, G = h.window, O = h.strstart + h.lookahead, Y = M, sa = void 0, sa = z.avail_in, Y < sa && (sa = Y), Z = sa === 0 ? 0 : (z.avail_in -= sa, e.arraySet(G, z.input, z.next_in, sa, O), z.state.wrap === 1 ? z.adler = l(z.adler, G, sa, O) : z.state.wrap === 2 && (z.adler = m(z.adler, G, sa, O)), z.next_in += sa, z.total_in += sa, sa), h.lookahead += Z, h.lookahead + h.insert >= C) for ($ = h.strstart - h.insert, h.ins_h = h.window[$], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[$ + 1]) & h.hash_mask; h.insert && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[$ + C - 1]) & h.hash_mask, h.prev[$ & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = $, $++, h.insert--, !(h.lookahead + h.insert < C)); ) ;
      } while (h.lookahead < q && h.strm.avail_in !== 0);
    }
    function Aa(h, W) {
      for (var Z, j; ; ) {
        if (h.lookahead < q) {
          if (pa(h), h.lookahead < q && W === i) return g;
          if (h.lookahead === 0) break;
        }
        if (Z = 0, h.lookahead >= C && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + C - 1]) & h.hash_mask, Z = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), Z !== 0 && h.strstart - Z <= h.w_size - q && (h.match_length = Q(h, Z)), h.match_length >= C) if (j = r._tr_tally(h, h.strstart - h.match_start, h.match_length - C), h.lookahead -= h.match_length, h.match_length <= h.max_lazy_match && h.lookahead >= C) {
          for (h.match_length--; h.strstart++, h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + C - 1]) & h.hash_mask, Z = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart, --h.match_length != 0; ) ;
          h.strstart++;
        } else h.strstart += h.match_length, h.match_length = 0, h.ins_h = h.window[h.strstart], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + 1]) & h.hash_mask;
        else j = r._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++;
        if (j && (_(h, !1), h.strm.avail_out === 0)) return g;
      }
      return h.insert = h.strstart < C - 1 ? h.strstart : C - 1, W === d ? (_(h, !0), h.strm.avail_out === 0 ? E : I) : h.last_lit && (_(h, !1), h.strm.avail_out === 0) ? g : P;
    }
    function xa(h, W) {
      for (var Z, j, M; ; ) {
        if (h.lookahead < q) {
          if (pa(h), h.lookahead < q && W === i) return g;
          if (h.lookahead === 0) break;
        }
        if (Z = 0, h.lookahead >= C && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + C - 1]) & h.hash_mask, Z = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), h.prev_length = h.match_length, h.prev_match = h.match_start, h.match_length = C - 1, Z !== 0 && h.prev_length < h.max_lazy_match && h.strstart - Z <= h.w_size - q && (h.match_length = Q(h, Z), h.match_length <= 5 && (h.strategy === 1 || h.match_length === C && 4096 < h.strstart - h.match_start) && (h.match_length = C - 1)), h.prev_length >= C && h.match_length <= h.prev_length) {
          for (M = h.strstart + h.lookahead - C, j = r._tr_tally(h, h.strstart - 1 - h.prev_match, h.prev_length - C), h.lookahead -= h.prev_length - 1, h.prev_length -= 2; ++h.strstart <= M && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + C - 1]) & h.hash_mask, Z = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), --h.prev_length != 0; ) ;
          if (h.match_available = 0, h.match_length = C - 1, h.strstart++, j && (_(h, !1), h.strm.avail_out === 0)) return g;
        } else if (h.match_available) {
          if ((j = r._tr_tally(h, 0, h.window[h.strstart - 1])) && _(h, !1), h.strstart++, h.lookahead--, h.strm.avail_out === 0) return g;
        } else h.match_available = 1, h.strstart++, h.lookahead--;
      }
      return h.match_available && (j = r._tr_tally(h, 0, h.window[h.strstart - 1]), h.match_available = 0), h.insert = h.strstart < C - 1 ? h.strstart : C - 1, W === d ? (_(h, !0), h.strm.avail_out === 0 ? E : I) : h.last_lit && (_(h, !1), h.strm.avail_out === 0) ? g : P;
    }
    function wa(h, W, Z, j, M) {
      this.good_length = h, this.max_lazy = W, this.nice_length = Z, this.max_chain = j, this.func = M;
    }
    function V() {
      this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = p, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new e.Buf16(2 * v), this.dyn_dtree = new e.Buf16(2 * (2 * b + 1)), this.bl_tree = new e.Buf16(2 * (2 * L + 1)), N(this.dyn_ltree), N(this.dyn_dtree), N(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new e.Buf16(T + 1), this.heap = new e.Buf16(2 * w + 1), N(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new e.Buf16(2 * w + 1), N(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
    }
    function K(h) {
      var W;
      return h && h.state ? (h.total_in = h.total_out = 0, h.data_type = u, (W = h.state).pending = 0, W.pending_out = 0, W.wrap < 0 && (W.wrap = -W.wrap), W.status = W.wrap ? R : k, h.adler = W.wrap === 2 ? 0 : 1, W.last_flush = i, r._tr_init(W), o) : U(h, x);
    }
    function ya(h) {
      var W = K(h);
      return W === o && (function(Z) {
        Z.window_size = 2 * Z.w_size, N(Z.head), Z.max_lazy_match = n[Z.level].max_lazy, Z.good_match = n[Z.level].good_length, Z.nice_match = n[Z.level].nice_length, Z.max_chain_length = n[Z.level].max_chain, Z.strstart = 0, Z.block_start = 0, Z.lookahead = 0, Z.insert = 0, Z.match_length = Z.prev_length = C - 1, Z.match_available = 0, Z.ins_h = 0;
      })(h.state), W;
    }
    function ma(h, W, Z, j, M, $) {
      if (!h) return x;
      var z = 1;
      if (W === f && (W = 6), j < 0 ? (z = 0, j = -j) : 15 < j && (z = 2, j -= 16), M < 1 || A < M || Z !== p || j < 8 || 15 < j || W < 0 || 9 < W || $ < 0 || y < $) return U(h, x);
      j === 8 && (j = 9);
      var G = new V();
      return (h.state = G).strm = h, G.wrap = z, G.gzhead = null, G.w_bits = j, G.w_size = 1 << G.w_bits, G.w_mask = G.w_size - 1, G.hash_bits = M + 7, G.hash_size = 1 << G.hash_bits, G.hash_mask = G.hash_size - 1, G.hash_shift = ~~((G.hash_bits + C - 1) / C), G.window = new e.Buf8(2 * G.w_size), G.head = new e.Buf16(G.hash_size), G.prev = new e.Buf16(G.w_size), G.lit_bufsize = 1 << M + 6, G.pending_buf_size = 4 * G.lit_bufsize, G.pending_buf = new e.Buf8(G.pending_buf_size), G.d_buf = 1 * G.lit_bufsize, G.l_buf = 3 * G.lit_bufsize, G.level = W, G.strategy = $, G.method = Z, ya(h);
    }
    n = [new wa(0, 0, 0, 0, function(h, W) {
      var Z = 65535;
      for (Z > h.pending_buf_size - 5 && (Z = h.pending_buf_size - 5); ; ) {
        if (h.lookahead <= 1) {
          if (pa(h), h.lookahead === 0 && W === i) return g;
          if (h.lookahead === 0) break;
        }
        h.strstart += h.lookahead, h.lookahead = 0;
        var j = h.block_start + Z;
        if ((h.strstart === 0 || h.strstart >= j) && (h.lookahead = h.strstart - j, h.strstart = j, _(h, !1), h.strm.avail_out === 0) || h.strstart - h.block_start >= h.w_size - q && (_(h, !1), h.strm.avail_out === 0)) return g;
      }
      return h.insert = 0, W === d ? (_(h, !0), h.strm.avail_out === 0 ? E : I) : (h.strstart > h.block_start && (_(h, !1), h.strm.avail_out), g);
    }), new wa(4, 4, 8, 4, Aa), new wa(4, 5, 16, 8, Aa), new wa(4, 6, 32, 32, Aa), new wa(4, 4, 16, 16, xa), new wa(8, 16, 32, 32, xa), new wa(8, 16, 128, 128, xa), new wa(8, 32, 128, 256, xa), new wa(32, 128, 258, 1024, xa), new wa(32, 258, 258, 4096, xa)], s.deflateInit = function(h, W) {
      return ma(h, W, p, 15, 8, 0);
    }, s.deflateInit2 = ma, s.deflateReset = ya, s.deflateResetKeep = K, s.deflateSetHeader = function(h, W) {
      return h && h.state ? h.state.wrap !== 2 ? x : (h.state.gzhead = W, o) : x;
    }, s.deflate = function(h, W) {
      var Z, j, M, $;
      if (!h || !h.state || 5 < W || W < 0) return h ? U(h, x) : x;
      if (j = h.state, !h.output || !h.input && h.avail_in !== 0 || j.status === 666 && W !== d) return U(h, h.avail_out === 0 ? -5 : x);
      if (j.strm = h, Z = j.last_flush, j.last_flush = W, j.status === R) if (j.wrap === 2) h.adler = 0, J(j, 31), J(j, 139), J(j, 8), j.gzhead ? (J(j, (j.gzhead.text ? 1 : 0) + (j.gzhead.hcrc ? 2 : 0) + (j.gzhead.extra ? 4 : 0) + (j.gzhead.name ? 8 : 0) + (j.gzhead.comment ? 16 : 0)), J(j, 255 & j.gzhead.time), J(j, j.gzhead.time >> 8 & 255), J(j, j.gzhead.time >> 16 & 255), J(j, j.gzhead.time >> 24 & 255), J(j, j.level === 9 ? 2 : 2 <= j.strategy || j.level < 2 ? 4 : 0), J(j, 255 & j.gzhead.os), j.gzhead.extra && j.gzhead.extra.length && (J(j, 255 & j.gzhead.extra.length), J(j, j.gzhead.extra.length >> 8 & 255)), j.gzhead.hcrc && (h.adler = m(h.adler, j.pending_buf, j.pending, 0)), j.gzindex = 0, j.status = 69) : (J(j, 0), J(j, 0), J(j, 0), J(j, 0), J(j, 0), J(j, j.level === 9 ? 2 : 2 <= j.strategy || j.level < 2 ? 4 : 0), J(j, 3), j.status = k);
      else {
        var z = p + (j.w_bits - 8 << 4) << 8;
        z |= (2 <= j.strategy || j.level < 2 ? 0 : j.level < 6 ? 1 : j.level === 6 ? 2 : 3) << 6, j.strstart !== 0 && (z |= 32), z += 31 - z % 31, j.status = k, aa(j, z), j.strstart !== 0 && (aa(j, h.adler >>> 16), aa(j, 65535 & h.adler)), h.adler = 1;
      }
      if (j.status === 69) if (j.gzhead.extra) {
        for (M = j.pending; j.gzindex < (65535 & j.gzhead.extra.length) && (j.pending !== j.pending_buf_size || (j.gzhead.hcrc && j.pending > M && (h.adler = m(h.adler, j.pending_buf, j.pending - M, M)), B(h), M = j.pending, j.pending !== j.pending_buf_size)); ) J(j, 255 & j.gzhead.extra[j.gzindex]), j.gzindex++;
        j.gzhead.hcrc && j.pending > M && (h.adler = m(h.adler, j.pending_buf, j.pending - M, M)), j.gzindex === j.gzhead.extra.length && (j.gzindex = 0, j.status = 73);
      } else j.status = 73;
      if (j.status === 73) if (j.gzhead.name) {
        M = j.pending;
        do {
          if (j.pending === j.pending_buf_size && (j.gzhead.hcrc && j.pending > M && (h.adler = m(h.adler, j.pending_buf, j.pending - M, M)), B(h), M = j.pending, j.pending === j.pending_buf_size)) {
            $ = 1;
            break;
          }
          $ = j.gzindex < j.gzhead.name.length ? 255 & j.gzhead.name.charCodeAt(j.gzindex++) : 0, J(j, $);
        } while ($ !== 0);
        j.gzhead.hcrc && j.pending > M && (h.adler = m(h.adler, j.pending_buf, j.pending - M, M)), $ === 0 && (j.gzindex = 0, j.status = 91);
      } else j.status = 91;
      if (j.status === 91) if (j.gzhead.comment) {
        M = j.pending;
        do {
          if (j.pending === j.pending_buf_size && (j.gzhead.hcrc && j.pending > M && (h.adler = m(h.adler, j.pending_buf, j.pending - M, M)), B(h), M = j.pending, j.pending === j.pending_buf_size)) {
            $ = 1;
            break;
          }
          $ = j.gzindex < j.gzhead.comment.length ? 255 & j.gzhead.comment.charCodeAt(j.gzindex++) : 0, J(j, $);
        } while ($ !== 0);
        j.gzhead.hcrc && j.pending > M && (h.adler = m(h.adler, j.pending_buf, j.pending - M, M)), $ === 0 && (j.status = 103);
      } else j.status = 103;
      if (j.status === 103 && (j.gzhead.hcrc ? (j.pending + 2 > j.pending_buf_size && B(h), j.pending + 2 <= j.pending_buf_size && (J(j, 255 & h.adler), J(j, h.adler >> 8 & 255), h.adler = 0, j.status = k)) : j.status = k), j.pending !== 0) {
        if (B(h), h.avail_out === 0) return j.last_flush = -1, o;
      } else if (h.avail_in === 0 && D(W) <= D(Z) && W !== d) return U(h, -5);
      if (j.status === 666 && h.avail_in !== 0) return U(h, -5);
      if (h.avail_in !== 0 || j.lookahead !== 0 || W !== i && j.status !== 666) {
        var G = j.strategy === 2 ? (function(O, Y) {
          for (var sa; ; ) {
            if (O.lookahead === 0 && (pa(O), O.lookahead === 0)) {
              if (Y === i) return g;
              break;
            }
            if (O.match_length = 0, sa = r._tr_tally(O, 0, O.window[O.strstart]), O.lookahead--, O.strstart++, sa && (_(O, !1), O.strm.avail_out === 0)) return g;
          }
          return O.insert = 0, Y === d ? (_(O, !0), O.strm.avail_out === 0 ? E : I) : O.last_lit && (_(O, !1), O.strm.avail_out === 0) ? g : P;
        })(j, W) : j.strategy === 3 ? (function(O, Y) {
          for (var sa, ta, ca, oa, da = O.window; ; ) {
            if (O.lookahead <= S) {
              if (pa(O), O.lookahead <= S && Y === i) return g;
              if (O.lookahead === 0) break;
            }
            if (O.match_length = 0, O.lookahead >= C && 0 < O.strstart && (ta = da[ca = O.strstart - 1]) === da[++ca] && ta === da[++ca] && ta === da[++ca]) {
              oa = O.strstart + S;
              do
                ;
              while (ta === da[++ca] && ta === da[++ca] && ta === da[++ca] && ta === da[++ca] && ta === da[++ca] && ta === da[++ca] && ta === da[++ca] && ta === da[++ca] && ca < oa);
              O.match_length = S - (oa - ca), O.match_length > O.lookahead && (O.match_length = O.lookahead);
            }
            if (O.match_length >= C ? (sa = r._tr_tally(O, 1, O.match_length - C), O.lookahead -= O.match_length, O.strstart += O.match_length, O.match_length = 0) : (sa = r._tr_tally(O, 0, O.window[O.strstart]), O.lookahead--, O.strstart++), sa && (_(O, !1), O.strm.avail_out === 0)) return g;
          }
          return O.insert = 0, Y === d ? (_(O, !0), O.strm.avail_out === 0 ? E : I) : O.last_lit && (_(O, !1), O.strm.avail_out === 0) ? g : P;
        })(j, W) : n[j.level].func(j, W);
        if (G !== E && G !== I || (j.status = 666), G === g || G === E) return h.avail_out === 0 && (j.last_flush = -1), o;
        if (G === P && (W === 1 ? r._tr_align(j) : W !== 5 && (r._tr_stored_block(j, 0, 0, !1), W === 3 && (N(j.head), j.lookahead === 0 && (j.strstart = 0, j.block_start = 0, j.insert = 0))), B(h), h.avail_out === 0)) return j.last_flush = -1, o;
      }
      return W !== d ? o : j.wrap <= 0 ? 1 : (j.wrap === 2 ? (J(j, 255 & h.adler), J(j, h.adler >> 8 & 255), J(j, h.adler >> 16 & 255), J(j, h.adler >> 24 & 255), J(j, 255 & h.total_in), J(j, h.total_in >> 8 & 255), J(j, h.total_in >> 16 & 255), J(j, h.total_in >> 24 & 255)) : (aa(j, h.adler >>> 16), aa(j, 65535 & h.adler)), B(h), 0 < j.wrap && (j.wrap = -j.wrap), j.pending !== 0 ? o : 1);
    }, s.deflateEnd = function(h) {
      var W;
      return h && h.state ? (W = h.state.status) !== R && W !== 69 && W !== 73 && W !== 91 && W !== 103 && W !== k && W !== 666 ? U(h, x) : (h.state = null, W === k ? U(h, -3) : o) : x;
    }, s.deflateSetDictionary = function(h, W) {
      var Z, j, M, $, z, G, O, Y, sa = W.length;
      if (!h || !h.state || ($ = (Z = h.state).wrap) === 2 || $ === 1 && Z.status !== R || Z.lookahead) return x;
      for ($ === 1 && (h.adler = l(h.adler, W, sa, 0)), Z.wrap = 0, sa >= Z.w_size && ($ === 0 && (N(Z.head), Z.strstart = 0, Z.block_start = 0, Z.insert = 0), Y = new e.Buf8(Z.w_size), e.arraySet(Y, W, sa - Z.w_size, Z.w_size, 0), W = Y, sa = Z.w_size), z = h.avail_in, G = h.next_in, O = h.input, h.avail_in = sa, h.next_in = 0, h.input = W, pa(Z); Z.lookahead >= C; ) {
        for (j = Z.strstart, M = Z.lookahead - (C - 1); Z.ins_h = (Z.ins_h << Z.hash_shift ^ Z.window[j + C - 1]) & Z.hash_mask, Z.prev[j & Z.w_mask] = Z.head[Z.ins_h], Z.head[Z.ins_h] = j, j++, --M; ) ;
        Z.strstart = j, Z.lookahead = C - 1, pa(Z);
      }
      return Z.strstart += Z.lookahead, Z.block_start = Z.strstart, Z.insert = Z.lookahead, Z.lookahead = 0, Z.match_length = Z.prev_length = C - 1, Z.match_available = 0, h.next_in = G, h.input = O, h.avail_in = z, Z.wrap = $, o;
    }, s.deflateInfo = "pako deflate (from Nodeca project)";
  }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(a, t, s) {
    t.exports = function() {
      this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
    };
  }, {}], 48: [function(a, t, s) {
    t.exports = function(n, e) {
      var r, l, m, c, i, d, o, x, f, y, u, p, A, w, b, L, v, T, C, S, q, R, k, g, P;
      r = n.state, l = n.next_in, g = n.input, m = l + (n.avail_in - 5), c = n.next_out, P = n.output, i = c - (e - n.avail_out), d = c + (n.avail_out - 257), o = r.dmax, x = r.wsize, f = r.whave, y = r.wnext, u = r.window, p = r.hold, A = r.bits, w = r.lencode, b = r.distcode, L = (1 << r.lenbits) - 1, v = (1 << r.distbits) - 1;
      a: do {
        A < 15 && (p += g[l++] << A, A += 8, p += g[l++] << A, A += 8), T = w[p & L];
        t: for (; ; ) {
          if (p >>>= C = T >>> 24, A -= C, (C = T >>> 16 & 255) === 0) P[c++] = 65535 & T;
          else {
            if (!(16 & C)) {
              if ((64 & C) == 0) {
                T = w[(65535 & T) + (p & (1 << C) - 1)];
                continue t;
              }
              if (32 & C) {
                r.mode = 12;
                break a;
              }
              n.msg = "invalid literal/length code", r.mode = 30;
              break a;
            }
            S = 65535 & T, (C &= 15) && (A < C && (p += g[l++] << A, A += 8), S += p & (1 << C) - 1, p >>>= C, A -= C), A < 15 && (p += g[l++] << A, A += 8, p += g[l++] << A, A += 8), T = b[p & v];
            n: for (; ; ) {
              if (p >>>= C = T >>> 24, A -= C, !(16 & (C = T >>> 16 & 255))) {
                if ((64 & C) == 0) {
                  T = b[(65535 & T) + (p & (1 << C) - 1)];
                  continue n;
                }
                n.msg = "invalid distance code", r.mode = 30;
                break a;
              }
              if (q = 65535 & T, A < (C &= 15) && (p += g[l++] << A, (A += 8) < C && (p += g[l++] << A, A += 8)), o < (q += p & (1 << C) - 1)) {
                n.msg = "invalid distance too far back", r.mode = 30;
                break a;
              }
              if (p >>>= C, A -= C, (C = c - i) < q) {
                if (f < (C = q - C) && r.sane) {
                  n.msg = "invalid distance too far back", r.mode = 30;
                  break a;
                }
                if (k = u, (R = 0) === y) {
                  if (R += x - C, C < S) {
                    for (S -= C; P[c++] = u[R++], --C; ) ;
                    R = c - q, k = P;
                  }
                } else if (y < C) {
                  if (R += x + y - C, (C -= y) < S) {
                    for (S -= C; P[c++] = u[R++], --C; ) ;
                    if (R = 0, y < S) {
                      for (S -= C = y; P[c++] = u[R++], --C; ) ;
                      R = c - q, k = P;
                    }
                  }
                } else if (R += y - C, C < S) {
                  for (S -= C; P[c++] = u[R++], --C; ) ;
                  R = c - q, k = P;
                }
                for (; 2 < S; ) P[c++] = k[R++], P[c++] = k[R++], P[c++] = k[R++], S -= 3;
                S && (P[c++] = k[R++], 1 < S && (P[c++] = k[R++]));
              } else {
                for (R = c - q; P[c++] = P[R++], P[c++] = P[R++], P[c++] = P[R++], 2 < (S -= 3); ) ;
                S && (P[c++] = P[R++], 1 < S && (P[c++] = P[R++]));
              }
              break;
            }
          }
          break;
        }
      } while (l < m && c < d);
      l -= S = A >> 3, p &= (1 << (A -= S << 3)) - 1, n.next_in = l, n.next_out = c, n.avail_in = l < m ? m - l + 5 : 5 - (l - m), n.avail_out = c < d ? d - c + 257 : 257 - (c - d), r.hold = p, r.bits = A;
    };
  }, {}], 49: [function(a, t, s) {
    var n = a("../utils/common"), e = a("./adler32"), r = a("./crc32"), l = a("./inffast"), m = a("./inftrees"), c = 1, i = 2, d = 0, o = -2, x = 1, f = 852, y = 592;
    function u(R) {
      return (R >>> 24 & 255) + (R >>> 8 & 65280) + ((65280 & R) << 8) + ((255 & R) << 24);
    }
    function p() {
      this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new n.Buf16(320), this.work = new n.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    function A(R) {
      var k;
      return R && R.state ? (k = R.state, R.total_in = R.total_out = k.total = 0, R.msg = "", k.wrap && (R.adler = 1 & k.wrap), k.mode = x, k.last = 0, k.havedict = 0, k.dmax = 32768, k.head = null, k.hold = 0, k.bits = 0, k.lencode = k.lendyn = new n.Buf32(f), k.distcode = k.distdyn = new n.Buf32(y), k.sane = 1, k.back = -1, d) : o;
    }
    function w(R) {
      var k;
      return R && R.state ? ((k = R.state).wsize = 0, k.whave = 0, k.wnext = 0, A(R)) : o;
    }
    function b(R, k) {
      var g, P;
      return R && R.state ? (P = R.state, k < 0 ? (g = 0, k = -k) : (g = 1 + (k >> 4), k < 48 && (k &= 15)), k && (k < 8 || 15 < k) ? o : (P.window !== null && P.wbits !== k && (P.window = null), P.wrap = g, P.wbits = k, w(R))) : o;
    }
    function L(R, k) {
      var g, P;
      return R ? (P = new p(), (R.state = P).window = null, (g = b(R, k)) !== d && (R.state = null), g) : o;
    }
    var v, T, C = !0;
    function S(R) {
      if (C) {
        var k;
        for (v = new n.Buf32(512), T = new n.Buf32(32), k = 0; k < 144; ) R.lens[k++] = 8;
        for (; k < 256; ) R.lens[k++] = 9;
        for (; k < 280; ) R.lens[k++] = 7;
        for (; k < 288; ) R.lens[k++] = 8;
        for (m(c, R.lens, 0, 288, v, 0, R.work, { bits: 9 }), k = 0; k < 32; ) R.lens[k++] = 5;
        m(i, R.lens, 0, 32, T, 0, R.work, { bits: 5 }), C = !1;
      }
      R.lencode = v, R.lenbits = 9, R.distcode = T, R.distbits = 5;
    }
    function q(R, k, g, P) {
      var E, I = R.state;
      return I.window === null && (I.wsize = 1 << I.wbits, I.wnext = 0, I.whave = 0, I.window = new n.Buf8(I.wsize)), P >= I.wsize ? (n.arraySet(I.window, k, g - I.wsize, I.wsize, 0), I.wnext = 0, I.whave = I.wsize) : (P < (E = I.wsize - I.wnext) && (E = P), n.arraySet(I.window, k, g - P, E, I.wnext), (P -= E) ? (n.arraySet(I.window, k, g - P, P, 0), I.wnext = P, I.whave = I.wsize) : (I.wnext += E, I.wnext === I.wsize && (I.wnext = 0), I.whave < I.wsize && (I.whave += E))), 0;
    }
    s.inflateReset = w, s.inflateReset2 = b, s.inflateResetKeep = A, s.inflateInit = function(R) {
      return L(R, 15);
    }, s.inflateInit2 = L, s.inflate = function(R, k) {
      var g, P, E, I, U, D, N, B, _, J, aa, Q, pa, Aa, xa, wa, V, K, ya, ma, h, W, Z, j, M = 0, $ = new n.Buf8(4), z = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      if (!R || !R.state || !R.output || !R.input && R.avail_in !== 0) return o;
      (g = R.state).mode === 12 && (g.mode = 13), U = R.next_out, E = R.output, N = R.avail_out, I = R.next_in, P = R.input, D = R.avail_in, B = g.hold, _ = g.bits, J = D, aa = N, W = d;
      a: for (; ; ) switch (g.mode) {
        case x:
          if (g.wrap === 0) {
            g.mode = 13;
            break;
          }
          for (; _ < 16; ) {
            if (D === 0) break a;
            D--, B += P[I++] << _, _ += 8;
          }
          if (2 & g.wrap && B === 35615) {
            $[g.check = 0] = 255 & B, $[1] = B >>> 8 & 255, g.check = r(g.check, $, 2, 0), _ = B = 0, g.mode = 2;
            break;
          }
          if (g.flags = 0, g.head && (g.head.done = !1), !(1 & g.wrap) || (((255 & B) << 8) + (B >> 8)) % 31) {
            R.msg = "incorrect header check", g.mode = 30;
            break;
          }
          if ((15 & B) != 8) {
            R.msg = "unknown compression method", g.mode = 30;
            break;
          }
          if (_ -= 4, h = 8 + (15 & (B >>>= 4)), g.wbits === 0) g.wbits = h;
          else if (h > g.wbits) {
            R.msg = "invalid window size", g.mode = 30;
            break;
          }
          g.dmax = 1 << h, R.adler = g.check = 1, g.mode = 512 & B ? 10 : 12, _ = B = 0;
          break;
        case 2:
          for (; _ < 16; ) {
            if (D === 0) break a;
            D--, B += P[I++] << _, _ += 8;
          }
          if (g.flags = B, (255 & g.flags) != 8) {
            R.msg = "unknown compression method", g.mode = 30;
            break;
          }
          if (57344 & g.flags) {
            R.msg = "unknown header flags set", g.mode = 30;
            break;
          }
          g.head && (g.head.text = B >> 8 & 1), 512 & g.flags && ($[0] = 255 & B, $[1] = B >>> 8 & 255, g.check = r(g.check, $, 2, 0)), _ = B = 0, g.mode = 3;
        case 3:
          for (; _ < 32; ) {
            if (D === 0) break a;
            D--, B += P[I++] << _, _ += 8;
          }
          g.head && (g.head.time = B), 512 & g.flags && ($[0] = 255 & B, $[1] = B >>> 8 & 255, $[2] = B >>> 16 & 255, $[3] = B >>> 24 & 255, g.check = r(g.check, $, 4, 0)), _ = B = 0, g.mode = 4;
        case 4:
          for (; _ < 16; ) {
            if (D === 0) break a;
            D--, B += P[I++] << _, _ += 8;
          }
          g.head && (g.head.xflags = 255 & B, g.head.os = B >> 8), 512 & g.flags && ($[0] = 255 & B, $[1] = B >>> 8 & 255, g.check = r(g.check, $, 2, 0)), _ = B = 0, g.mode = 5;
        case 5:
          if (1024 & g.flags) {
            for (; _ < 16; ) {
              if (D === 0) break a;
              D--, B += P[I++] << _, _ += 8;
            }
            g.length = B, g.head && (g.head.extra_len = B), 512 & g.flags && ($[0] = 255 & B, $[1] = B >>> 8 & 255, g.check = r(g.check, $, 2, 0)), _ = B = 0;
          } else g.head && (g.head.extra = null);
          g.mode = 6;
        case 6:
          if (1024 & g.flags && (D < (Q = g.length) && (Q = D), Q && (g.head && (h = g.head.extra_len - g.length, g.head.extra || (g.head.extra = new Array(g.head.extra_len)), n.arraySet(g.head.extra, P, I, Q, h)), 512 & g.flags && (g.check = r(g.check, P, Q, I)), D -= Q, I += Q, g.length -= Q), g.length)) break a;
          g.length = 0, g.mode = 7;
        case 7:
          if (2048 & g.flags) {
            if (D === 0) break a;
            for (Q = 0; h = P[I + Q++], g.head && h && g.length < 65536 && (g.head.name += String.fromCharCode(h)), h && Q < D; ) ;
            if (512 & g.flags && (g.check = r(g.check, P, Q, I)), D -= Q, I += Q, h) break a;
          } else g.head && (g.head.name = null);
          g.length = 0, g.mode = 8;
        case 8:
          if (4096 & g.flags) {
            if (D === 0) break a;
            for (Q = 0; h = P[I + Q++], g.head && h && g.length < 65536 && (g.head.comment += String.fromCharCode(h)), h && Q < D; ) ;
            if (512 & g.flags && (g.check = r(g.check, P, Q, I)), D -= Q, I += Q, h) break a;
          } else g.head && (g.head.comment = null);
          g.mode = 9;
        case 9:
          if (512 & g.flags) {
            for (; _ < 16; ) {
              if (D === 0) break a;
              D--, B += P[I++] << _, _ += 8;
            }
            if (B !== (65535 & g.check)) {
              R.msg = "header crc mismatch", g.mode = 30;
              break;
            }
            _ = B = 0;
          }
          g.head && (g.head.hcrc = g.flags >> 9 & 1, g.head.done = !0), R.adler = g.check = 0, g.mode = 12;
          break;
        case 10:
          for (; _ < 32; ) {
            if (D === 0) break a;
            D--, B += P[I++] << _, _ += 8;
          }
          R.adler = g.check = u(B), _ = B = 0, g.mode = 11;
        case 11:
          if (g.havedict === 0) return R.next_out = U, R.avail_out = N, R.next_in = I, R.avail_in = D, g.hold = B, g.bits = _, 2;
          R.adler = g.check = 1, g.mode = 12;
        case 12:
          if (k === 5 || k === 6) break a;
        case 13:
          if (g.last) {
            B >>>= 7 & _, _ -= 7 & _, g.mode = 27;
            break;
          }
          for (; _ < 3; ) {
            if (D === 0) break a;
            D--, B += P[I++] << _, _ += 8;
          }
          switch (g.last = 1 & B, _ -= 1, 3 & (B >>>= 1)) {
            case 0:
              g.mode = 14;
              break;
            case 1:
              if (S(g), g.mode = 20, k !== 6) break;
              B >>>= 2, _ -= 2;
              break a;
            case 2:
              g.mode = 17;
              break;
            case 3:
              R.msg = "invalid block type", g.mode = 30;
          }
          B >>>= 2, _ -= 2;
          break;
        case 14:
          for (B >>>= 7 & _, _ -= 7 & _; _ < 32; ) {
            if (D === 0) break a;
            D--, B += P[I++] << _, _ += 8;
          }
          if ((65535 & B) != (B >>> 16 ^ 65535)) {
            R.msg = "invalid stored block lengths", g.mode = 30;
            break;
          }
          if (g.length = 65535 & B, _ = B = 0, g.mode = 15, k === 6) break a;
        case 15:
          g.mode = 16;
        case 16:
          if (Q = g.length) {
            if (D < Q && (Q = D), N < Q && (Q = N), Q === 0) break a;
            n.arraySet(E, P, I, Q, U), D -= Q, I += Q, N -= Q, U += Q, g.length -= Q;
            break;
          }
          g.mode = 12;
          break;
        case 17:
          for (; _ < 14; ) {
            if (D === 0) break a;
            D--, B += P[I++] << _, _ += 8;
          }
          if (g.nlen = 257 + (31 & B), B >>>= 5, _ -= 5, g.ndist = 1 + (31 & B), B >>>= 5, _ -= 5, g.ncode = 4 + (15 & B), B >>>= 4, _ -= 4, 286 < g.nlen || 30 < g.ndist) {
            R.msg = "too many length or distance symbols", g.mode = 30;
            break;
          }
          g.have = 0, g.mode = 18;
        case 18:
          for (; g.have < g.ncode; ) {
            for (; _ < 3; ) {
              if (D === 0) break a;
              D--, B += P[I++] << _, _ += 8;
            }
            g.lens[z[g.have++]] = 7 & B, B >>>= 3, _ -= 3;
          }
          for (; g.have < 19; ) g.lens[z[g.have++]] = 0;
          if (g.lencode = g.lendyn, g.lenbits = 7, Z = { bits: g.lenbits }, W = m(0, g.lens, 0, 19, g.lencode, 0, g.work, Z), g.lenbits = Z.bits, W) {
            R.msg = "invalid code lengths set", g.mode = 30;
            break;
          }
          g.have = 0, g.mode = 19;
        case 19:
          for (; g.have < g.nlen + g.ndist; ) {
            for (; wa = (M = g.lencode[B & (1 << g.lenbits) - 1]) >>> 16 & 255, V = 65535 & M, !((xa = M >>> 24) <= _); ) {
              if (D === 0) break a;
              D--, B += P[I++] << _, _ += 8;
            }
            if (V < 16) B >>>= xa, _ -= xa, g.lens[g.have++] = V;
            else {
              if (V === 16) {
                for (j = xa + 2; _ < j; ) {
                  if (D === 0) break a;
                  D--, B += P[I++] << _, _ += 8;
                }
                if (B >>>= xa, _ -= xa, g.have === 0) {
                  R.msg = "invalid bit length repeat", g.mode = 30;
                  break;
                }
                h = g.lens[g.have - 1], Q = 3 + (3 & B), B >>>= 2, _ -= 2;
              } else if (V === 17) {
                for (j = xa + 3; _ < j; ) {
                  if (D === 0) break a;
                  D--, B += P[I++] << _, _ += 8;
                }
                _ -= xa, h = 0, Q = 3 + (7 & (B >>>= xa)), B >>>= 3, _ -= 3;
              } else {
                for (j = xa + 7; _ < j; ) {
                  if (D === 0) break a;
                  D--, B += P[I++] << _, _ += 8;
                }
                _ -= xa, h = 0, Q = 11 + (127 & (B >>>= xa)), B >>>= 7, _ -= 7;
              }
              if (g.have + Q > g.nlen + g.ndist) {
                R.msg = "invalid bit length repeat", g.mode = 30;
                break;
              }
              for (; Q--; ) g.lens[g.have++] = h;
            }
          }
          if (g.mode === 30) break;
          if (g.lens[256] === 0) {
            R.msg = "invalid code -- missing end-of-block", g.mode = 30;
            break;
          }
          if (g.lenbits = 9, Z = { bits: g.lenbits }, W = m(c, g.lens, 0, g.nlen, g.lencode, 0, g.work, Z), g.lenbits = Z.bits, W) {
            R.msg = "invalid literal/lengths set", g.mode = 30;
            break;
          }
          if (g.distbits = 6, g.distcode = g.distdyn, Z = { bits: g.distbits }, W = m(i, g.lens, g.nlen, g.ndist, g.distcode, 0, g.work, Z), g.distbits = Z.bits, W) {
            R.msg = "invalid distances set", g.mode = 30;
            break;
          }
          if (g.mode = 20, k === 6) break a;
        case 20:
          g.mode = 21;
        case 21:
          if (6 <= D && 258 <= N) {
            R.next_out = U, R.avail_out = N, R.next_in = I, R.avail_in = D, g.hold = B, g.bits = _, l(R, aa), U = R.next_out, E = R.output, N = R.avail_out, I = R.next_in, P = R.input, D = R.avail_in, B = g.hold, _ = g.bits, g.mode === 12 && (g.back = -1);
            break;
          }
          for (g.back = 0; wa = (M = g.lencode[B & (1 << g.lenbits) - 1]) >>> 16 & 255, V = 65535 & M, !((xa = M >>> 24) <= _); ) {
            if (D === 0) break a;
            D--, B += P[I++] << _, _ += 8;
          }
          if (wa && (240 & wa) == 0) {
            for (K = xa, ya = wa, ma = V; wa = (M = g.lencode[ma + ((B & (1 << K + ya) - 1) >> K)]) >>> 16 & 255, V = 65535 & M, !(K + (xa = M >>> 24) <= _); ) {
              if (D === 0) break a;
              D--, B += P[I++] << _, _ += 8;
            }
            B >>>= K, _ -= K, g.back += K;
          }
          if (B >>>= xa, _ -= xa, g.back += xa, g.length = V, wa === 0) {
            g.mode = 26;
            break;
          }
          if (32 & wa) {
            g.back = -1, g.mode = 12;
            break;
          }
          if (64 & wa) {
            R.msg = "invalid literal/length code", g.mode = 30;
            break;
          }
          g.extra = 15 & wa, g.mode = 22;
        case 22:
          if (g.extra) {
            for (j = g.extra; _ < j; ) {
              if (D === 0) break a;
              D--, B += P[I++] << _, _ += 8;
            }
            g.length += B & (1 << g.extra) - 1, B >>>= g.extra, _ -= g.extra, g.back += g.extra;
          }
          g.was = g.length, g.mode = 23;
        case 23:
          for (; wa = (M = g.distcode[B & (1 << g.distbits) - 1]) >>> 16 & 255, V = 65535 & M, !((xa = M >>> 24) <= _); ) {
            if (D === 0) break a;
            D--, B += P[I++] << _, _ += 8;
          }
          if ((240 & wa) == 0) {
            for (K = xa, ya = wa, ma = V; wa = (M = g.distcode[ma + ((B & (1 << K + ya) - 1) >> K)]) >>> 16 & 255, V = 65535 & M, !(K + (xa = M >>> 24) <= _); ) {
              if (D === 0) break a;
              D--, B += P[I++] << _, _ += 8;
            }
            B >>>= K, _ -= K, g.back += K;
          }
          if (B >>>= xa, _ -= xa, g.back += xa, 64 & wa) {
            R.msg = "invalid distance code", g.mode = 30;
            break;
          }
          g.offset = V, g.extra = 15 & wa, g.mode = 24;
        case 24:
          if (g.extra) {
            for (j = g.extra; _ < j; ) {
              if (D === 0) break a;
              D--, B += P[I++] << _, _ += 8;
            }
            g.offset += B & (1 << g.extra) - 1, B >>>= g.extra, _ -= g.extra, g.back += g.extra;
          }
          if (g.offset > g.dmax) {
            R.msg = "invalid distance too far back", g.mode = 30;
            break;
          }
          g.mode = 25;
        case 25:
          if (N === 0) break a;
          if (Q = aa - N, g.offset > Q) {
            if ((Q = g.offset - Q) > g.whave && g.sane) {
              R.msg = "invalid distance too far back", g.mode = 30;
              break;
            }
            pa = Q > g.wnext ? (Q -= g.wnext, g.wsize - Q) : g.wnext - Q, Q > g.length && (Q = g.length), Aa = g.window;
          } else Aa = E, pa = U - g.offset, Q = g.length;
          for (N < Q && (Q = N), N -= Q, g.length -= Q; E[U++] = Aa[pa++], --Q; ) ;
          g.length === 0 && (g.mode = 21);
          break;
        case 26:
          if (N === 0) break a;
          E[U++] = g.length, N--, g.mode = 21;
          break;
        case 27:
          if (g.wrap) {
            for (; _ < 32; ) {
              if (D === 0) break a;
              D--, B |= P[I++] << _, _ += 8;
            }
            if (aa -= N, R.total_out += aa, g.total += aa, aa && (R.adler = g.check = g.flags ? r(g.check, E, aa, U - aa) : e(g.check, E, aa, U - aa)), aa = N, (g.flags ? B : u(B)) !== g.check) {
              R.msg = "incorrect data check", g.mode = 30;
              break;
            }
            _ = B = 0;
          }
          g.mode = 28;
        case 28:
          if (g.wrap && g.flags) {
            for (; _ < 32; ) {
              if (D === 0) break a;
              D--, B += P[I++] << _, _ += 8;
            }
            if (B !== (4294967295 & g.total)) {
              R.msg = "incorrect length check", g.mode = 30;
              break;
            }
            _ = B = 0;
          }
          g.mode = 29;
        case 29:
          W = 1;
          break a;
        case 30:
          W = -3;
          break a;
        case 31:
          return -4;
        case 32:
        default:
          return o;
      }
      return R.next_out = U, R.avail_out = N, R.next_in = I, R.avail_in = D, g.hold = B, g.bits = _, (g.wsize || aa !== R.avail_out && g.mode < 30 && (g.mode < 27 || k !== 4)) && q(R, R.output, R.next_out, aa - R.avail_out) ? (g.mode = 31, -4) : (J -= R.avail_in, aa -= R.avail_out, R.total_in += J, R.total_out += aa, g.total += aa, g.wrap && aa && (R.adler = g.check = g.flags ? r(g.check, E, aa, R.next_out - aa) : e(g.check, E, aa, R.next_out - aa)), R.data_type = g.bits + (g.last ? 64 : 0) + (g.mode === 12 ? 128 : 0) + (g.mode === 20 || g.mode === 15 ? 256 : 0), (J == 0 && aa === 0 || k === 4) && W === d && (W = -5), W);
    }, s.inflateEnd = function(R) {
      if (!R || !R.state) return o;
      var k = R.state;
      return k.window && (k.window = null), R.state = null, d;
    }, s.inflateGetHeader = function(R, k) {
      var g;
      return R && R.state ? (2 & (g = R.state).wrap) == 0 ? o : ((g.head = k).done = !1, d) : o;
    }, s.inflateSetDictionary = function(R, k) {
      var g, P = k.length;
      return R && R.state ? (g = R.state).wrap !== 0 && g.mode !== 11 ? o : g.mode === 11 && e(1, k, P, 0) !== g.check ? -3 : q(R, k, P, P) ? (g.mode = 31, -4) : (g.havedict = 1, d) : o;
    }, s.inflateInfo = "pako inflate (from Nodeca project)";
  }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(a, t, s) {
    var n = a("../utils/common"), e = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], r = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], l = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], m = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
    t.exports = function(c, i, d, o, x, f, y, u) {
      var p, A, w, b, L, v, T, C, S, q = u.bits, R = 0, k = 0, g = 0, P = 0, E = 0, I = 0, U = 0, D = 0, N = 0, B = 0, _ = null, J = 0, aa = new n.Buf16(16), Q = new n.Buf16(16), pa = null, Aa = 0;
      for (R = 0; R <= 15; R++) aa[R] = 0;
      for (k = 0; k < o; k++) aa[i[d + k]]++;
      for (E = q, P = 15; 1 <= P && aa[P] === 0; P--) ;
      if (P < E && (E = P), P === 0) return x[f++] = 20971520, x[f++] = 20971520, u.bits = 1, 0;
      for (g = 1; g < P && aa[g] === 0; g++) ;
      for (E < g && (E = g), R = D = 1; R <= 15; R++) if (D <<= 1, (D -= aa[R]) < 0) return -1;
      if (0 < D && (c === 0 || P !== 1)) return -1;
      for (Q[1] = 0, R = 1; R < 15; R++) Q[R + 1] = Q[R] + aa[R];
      for (k = 0; k < o; k++) i[d + k] !== 0 && (y[Q[i[d + k]]++] = k);
      if (v = c === 0 ? (_ = pa = y, 19) : c === 1 ? (_ = e, J -= 257, pa = r, Aa -= 257, 256) : (_ = l, pa = m, -1), R = g, L = f, U = k = B = 0, w = -1, b = (N = 1 << (I = E)) - 1, c === 1 && 852 < N || c === 2 && 592 < N) return 1;
      for (; ; ) {
        for (T = R - U, S = y[k] < v ? (C = 0, y[k]) : y[k] > v ? (C = pa[Aa + y[k]], _[J + y[k]]) : (C = 96, 0), p = 1 << R - U, g = A = 1 << I; x[L + (B >> U) + (A -= p)] = T << 24 | C << 16 | S | 0, A !== 0; ) ;
        for (p = 1 << R - 1; B & p; ) p >>= 1;
        if (p !== 0 ? (B &= p - 1, B += p) : B = 0, k++, --aa[R] == 0) {
          if (R === P) break;
          R = i[d + y[k]];
        }
        if (E < R && (B & b) !== w) {
          for (U === 0 && (U = E), L += g, D = 1 << (I = R - U); I + U < P && !((D -= aa[I + U]) <= 0); ) I++, D <<= 1;
          if (N += 1 << I, c === 1 && 852 < N || c === 2 && 592 < N) return 1;
          x[w = B & b] = E << 24 | I << 16 | L - f | 0;
        }
      }
      return B !== 0 && (x[L + B] = R - U << 24 | 64 << 16 | 0), u.bits = E, 0;
    };
  }, { "../utils/common": 41 }], 51: [function(a, t, s) {
    t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
  }, {}], 52: [function(a, t, s) {
    var n = a("../utils/common"), e = 0, r = 1;
    function l(M) {
      for (var $ = M.length; 0 <= --$; ) M[$] = 0;
    }
    var m = 0, c = 29, i = 256, d = i + 1 + c, o = 30, x = 19, f = 2 * d + 1, y = 15, u = 16, p = 7, A = 256, w = 16, b = 17, L = 18, v = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], T = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], q = new Array(2 * (d + 2));
    l(q);
    var R = new Array(2 * o);
    l(R);
    var k = new Array(512);
    l(k);
    var g = new Array(256);
    l(g);
    var P = new Array(c);
    l(P);
    var E, I, U, D = new Array(o);
    function N(M, $, z, G, O) {
      this.static_tree = M, this.extra_bits = $, this.extra_base = z, this.elems = G, this.max_length = O, this.has_stree = M && M.length;
    }
    function B(M, $) {
      this.dyn_tree = M, this.max_code = 0, this.stat_desc = $;
    }
    function _(M) {
      return M < 256 ? k[M] : k[256 + (M >>> 7)];
    }
    function J(M, $) {
      M.pending_buf[M.pending++] = 255 & $, M.pending_buf[M.pending++] = $ >>> 8 & 255;
    }
    function aa(M, $, z) {
      M.bi_valid > u - z ? (M.bi_buf |= $ << M.bi_valid & 65535, J(M, M.bi_buf), M.bi_buf = $ >> u - M.bi_valid, M.bi_valid += z - u) : (M.bi_buf |= $ << M.bi_valid & 65535, M.bi_valid += z);
    }
    function Q(M, $, z) {
      aa(M, z[2 * $], z[2 * $ + 1]);
    }
    function pa(M, $) {
      for (var z = 0; z |= 1 & M, M >>>= 1, z <<= 1, 0 < --$; ) ;
      return z >>> 1;
    }
    function Aa(M, $, z) {
      var G, O, Y = new Array(y + 1), sa = 0;
      for (G = 1; G <= y; G++) Y[G] = sa = sa + z[G - 1] << 1;
      for (O = 0; O <= $; O++) {
        var ta = M[2 * O + 1];
        ta !== 0 && (M[2 * O] = pa(Y[ta]++, ta));
      }
    }
    function xa(M) {
      var $;
      for ($ = 0; $ < d; $++) M.dyn_ltree[2 * $] = 0;
      for ($ = 0; $ < o; $++) M.dyn_dtree[2 * $] = 0;
      for ($ = 0; $ < x; $++) M.bl_tree[2 * $] = 0;
      M.dyn_ltree[2 * A] = 1, M.opt_len = M.static_len = 0, M.last_lit = M.matches = 0;
    }
    function wa(M) {
      8 < M.bi_valid ? J(M, M.bi_buf) : 0 < M.bi_valid && (M.pending_buf[M.pending++] = M.bi_buf), M.bi_buf = 0, M.bi_valid = 0;
    }
    function V(M, $, z, G) {
      var O = 2 * $, Y = 2 * z;
      return M[O] < M[Y] || M[O] === M[Y] && G[$] <= G[z];
    }
    function K(M, $, z) {
      for (var G = M.heap[z], O = z << 1; O <= M.heap_len && (O < M.heap_len && V($, M.heap[O + 1], M.heap[O], M.depth) && O++, !V($, G, M.heap[O], M.depth)); ) M.heap[z] = M.heap[O], z = O, O <<= 1;
      M.heap[z] = G;
    }
    function ya(M, $, z) {
      var G, O, Y, sa, ta = 0;
      if (M.last_lit !== 0) for (; G = M.pending_buf[M.d_buf + 2 * ta] << 8 | M.pending_buf[M.d_buf + 2 * ta + 1], O = M.pending_buf[M.l_buf + ta], ta++, G === 0 ? Q(M, O, $) : (Q(M, (Y = g[O]) + i + 1, $), (sa = v[Y]) !== 0 && aa(M, O -= P[Y], sa), Q(M, Y = _(--G), z), (sa = T[Y]) !== 0 && aa(M, G -= D[Y], sa)), ta < M.last_lit; ) ;
      Q(M, A, $);
    }
    function ma(M, $) {
      var z, G, O, Y = $.dyn_tree, sa = $.stat_desc.static_tree, ta = $.stat_desc.has_stree, ca = $.stat_desc.elems, oa = -1;
      for (M.heap_len = 0, M.heap_max = f, z = 0; z < ca; z++) Y[2 * z] !== 0 ? (M.heap[++M.heap_len] = oa = z, M.depth[z] = 0) : Y[2 * z + 1] = 0;
      for (; M.heap_len < 2; ) Y[2 * (O = M.heap[++M.heap_len] = oa < 2 ? ++oa : 0)] = 1, M.depth[O] = 0, M.opt_len--, ta && (M.static_len -= sa[2 * O + 1]);
      for ($.max_code = oa, z = M.heap_len >> 1; 1 <= z; z--) K(M, Y, z);
      for (O = ca; z = M.heap[1], M.heap[1] = M.heap[M.heap_len--], K(M, Y, 1), G = M.heap[1], M.heap[--M.heap_max] = z, M.heap[--M.heap_max] = G, Y[2 * O] = Y[2 * z] + Y[2 * G], M.depth[O] = (M.depth[z] >= M.depth[G] ? M.depth[z] : M.depth[G]) + 1, Y[2 * z + 1] = Y[2 * G + 1] = O, M.heap[1] = O++, K(M, Y, 1), 2 <= M.heap_len; ) ;
      M.heap[--M.heap_max] = M.heap[1], (function(da, F) {
        var X, na, ia, la, ha, ua, ga = F.dyn_tree, tt = F.max_code, Ya = F.stat_desc.static_tree, ln = F.stat_desc.has_stree, mn = F.stat_desc.extra_bits, Ft = F.stat_desc.extra_base, Ka = F.stat_desc.max_length, Ia = 0;
        for (la = 0; la <= y; la++) da.bl_count[la] = 0;
        for (ga[2 * da.heap[da.heap_max] + 1] = 0, X = da.heap_max + 1; X < f; X++) Ka < (la = ga[2 * ga[2 * (na = da.heap[X]) + 1] + 1] + 1) && (la = Ka, Ia++), ga[2 * na + 1] = la, tt < na || (da.bl_count[la]++, ha = 0, Ft <= na && (ha = mn[na - Ft]), ua = ga[2 * na], da.opt_len += ua * (la + ha), ln && (da.static_len += ua * (Ya[2 * na + 1] + ha)));
        if (Ia !== 0) {
          do {
            for (la = Ka - 1; da.bl_count[la] === 0; ) la--;
            da.bl_count[la]--, da.bl_count[la + 1] += 2, da.bl_count[Ka]--, Ia -= 2;
          } while (0 < Ia);
          for (la = Ka; la !== 0; la--) for (na = da.bl_count[la]; na !== 0; ) tt < (ia = da.heap[--X]) || (ga[2 * ia + 1] !== la && (da.opt_len += (la - ga[2 * ia + 1]) * ga[2 * ia], ga[2 * ia + 1] = la), na--);
        }
      })(M, $), Aa(Y, oa, M.bl_count);
    }
    function h(M, $, z) {
      var G, O, Y = -1, sa = $[1], ta = 0, ca = 7, oa = 4;
      for (sa === 0 && (ca = 138, oa = 3), $[2 * (z + 1) + 1] = 65535, G = 0; G <= z; G++) O = sa, sa = $[2 * (G + 1) + 1], ++ta < ca && O === sa || (ta < oa ? M.bl_tree[2 * O] += ta : O !== 0 ? (O !== Y && M.bl_tree[2 * O]++, M.bl_tree[2 * w]++) : ta <= 10 ? M.bl_tree[2 * b]++ : M.bl_tree[2 * L]++, Y = O, oa = (ta = 0) === sa ? (ca = 138, 3) : O === sa ? (ca = 6, 3) : (ca = 7, 4));
    }
    function W(M, $, z) {
      var G, O, Y = -1, sa = $[1], ta = 0, ca = 7, oa = 4;
      for (sa === 0 && (ca = 138, oa = 3), G = 0; G <= z; G++) if (O = sa, sa = $[2 * (G + 1) + 1], !(++ta < ca && O === sa)) {
        if (ta < oa) for (; Q(M, O, M.bl_tree), --ta != 0; ) ;
        else O !== 0 ? (O !== Y && (Q(M, O, M.bl_tree), ta--), Q(M, w, M.bl_tree), aa(M, ta - 3, 2)) : ta <= 10 ? (Q(M, b, M.bl_tree), aa(M, ta - 3, 3)) : (Q(M, L, M.bl_tree), aa(M, ta - 11, 7));
        Y = O, oa = (ta = 0) === sa ? (ca = 138, 3) : O === sa ? (ca = 6, 3) : (ca = 7, 4);
      }
    }
    l(D);
    var Z = !1;
    function j(M, $, z, G) {
      aa(M, (m << 1) + (G ? 1 : 0), 3), (function(O, Y, sa, ta) {
        wa(O), J(O, sa), J(O, ~sa), n.arraySet(O.pending_buf, O.window, Y, sa, O.pending), O.pending += sa;
      })(M, $, z);
    }
    s._tr_init = function(M) {
      Z || ((function() {
        var $, z, G, O, Y, sa = new Array(y + 1);
        for (O = G = 0; O < c - 1; O++) for (P[O] = G, $ = 0; $ < 1 << v[O]; $++) g[G++] = O;
        for (g[G - 1] = O, O = Y = 0; O < 16; O++) for (D[O] = Y, $ = 0; $ < 1 << T[O]; $++) k[Y++] = O;
        for (Y >>= 7; O < o; O++) for (D[O] = Y << 7, $ = 0; $ < 1 << T[O] - 7; $++) k[256 + Y++] = O;
        for (z = 0; z <= y; z++) sa[z] = 0;
        for ($ = 0; $ <= 143; ) q[2 * $ + 1] = 8, $++, sa[8]++;
        for (; $ <= 255; ) q[2 * $ + 1] = 9, $++, sa[9]++;
        for (; $ <= 279; ) q[2 * $ + 1] = 7, $++, sa[7]++;
        for (; $ <= 287; ) q[2 * $ + 1] = 8, $++, sa[8]++;
        for (Aa(q, d + 1, sa), $ = 0; $ < o; $++) R[2 * $ + 1] = 5, R[2 * $] = pa($, 5);
        E = new N(q, v, i + 1, d, y), I = new N(R, T, 0, o, y), U = new N(new Array(0), C, 0, x, p);
      })(), Z = !0), M.l_desc = new B(M.dyn_ltree, E), M.d_desc = new B(M.dyn_dtree, I), M.bl_desc = new B(M.bl_tree, U), M.bi_buf = 0, M.bi_valid = 0, xa(M);
    }, s._tr_stored_block = j, s._tr_flush_block = function(M, $, z, G) {
      var O, Y, sa = 0;
      0 < M.level ? (M.strm.data_type === 2 && (M.strm.data_type = (function(ta) {
        var ca, oa = 4093624447;
        for (ca = 0; ca <= 31; ca++, oa >>>= 1) if (1 & oa && ta.dyn_ltree[2 * ca] !== 0) return e;
        if (ta.dyn_ltree[18] !== 0 || ta.dyn_ltree[20] !== 0 || ta.dyn_ltree[26] !== 0) return r;
        for (ca = 32; ca < i; ca++) if (ta.dyn_ltree[2 * ca] !== 0) return r;
        return e;
      })(M)), ma(M, M.l_desc), ma(M, M.d_desc), sa = (function(ta) {
        var ca;
        for (h(ta, ta.dyn_ltree, ta.l_desc.max_code), h(ta, ta.dyn_dtree, ta.d_desc.max_code), ma(ta, ta.bl_desc), ca = x - 1; 3 <= ca && ta.bl_tree[2 * S[ca] + 1] === 0; ca--) ;
        return ta.opt_len += 3 * (ca + 1) + 5 + 5 + 4, ca;
      })(M), O = M.opt_len + 3 + 7 >>> 3, (Y = M.static_len + 3 + 7 >>> 3) <= O && (O = Y)) : O = Y = z + 5, z + 4 <= O && $ !== -1 ? j(M, $, z, G) : M.strategy === 4 || Y === O ? (aa(M, 2 + (G ? 1 : 0), 3), ya(M, q, R)) : (aa(M, 4 + (G ? 1 : 0), 3), (function(ta, ca, oa, da) {
        var F;
        for (aa(ta, ca - 257, 5), aa(ta, oa - 1, 5), aa(ta, da - 4, 4), F = 0; F < da; F++) aa(ta, ta.bl_tree[2 * S[F] + 1], 3);
        W(ta, ta.dyn_ltree, ca - 1), W(ta, ta.dyn_dtree, oa - 1);
      })(M, M.l_desc.max_code + 1, M.d_desc.max_code + 1, sa + 1), ya(M, M.dyn_ltree, M.dyn_dtree)), xa(M), G && wa(M);
    }, s._tr_tally = function(M, $, z) {
      return M.pending_buf[M.d_buf + 2 * M.last_lit] = $ >>> 8 & 255, M.pending_buf[M.d_buf + 2 * M.last_lit + 1] = 255 & $, M.pending_buf[M.l_buf + M.last_lit] = 255 & z, M.last_lit++, $ === 0 ? M.dyn_ltree[2 * z]++ : (M.matches++, $--, M.dyn_ltree[2 * (g[z] + i + 1)]++, M.dyn_dtree[2 * _($)]++), M.last_lit === M.lit_bufsize - 1;
    }, s._tr_align = function(M) {
      aa(M, 2, 3), Q(M, A, q), (function($) {
        $.bi_valid === 16 ? (J($, $.bi_buf), $.bi_buf = 0, $.bi_valid = 0) : 8 <= $.bi_valid && ($.pending_buf[$.pending++] = 255 & $.bi_buf, $.bi_buf >>= 8, $.bi_valid -= 8);
      })(M);
    };
  }, { "../utils/common": 41 }], 53: [function(a, t, s) {
    t.exports = function() {
      this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    };
  }, {}], 54: [function(a, t, s) {
    (function(n) {
      (function(e, r) {
        if (!e.setImmediate) {
          var l, m, c, i, d = 1, o = {}, x = !1, f = e.document, y = Object.getPrototypeOf && Object.getPrototypeOf(e);
          y = y && y.setTimeout ? y : e, l = {}.toString.call(e.process) === "[object process]" ? function(w) {
            process.nextTick(function() {
              p(w);
            });
          } : (function() {
            if (e.postMessage && !e.importScripts) {
              var w = !0, b = e.onmessage;
              return e.onmessage = function() {
                w = !1;
              }, e.postMessage("", "*"), e.onmessage = b, w;
            }
          })() ? (i = "setImmediate$" + Math.random() + "$", e.addEventListener ? e.addEventListener("message", A, !1) : e.attachEvent("onmessage", A), function(w) {
            e.postMessage(i + w, "*");
          }) : e.MessageChannel ? ((c = new MessageChannel()).port1.onmessage = function(w) {
            p(w.data);
          }, function(w) {
            c.port2.postMessage(w);
          }) : f && "onreadystatechange" in f.createElement("script") ? (m = f.documentElement, function(w) {
            var b = f.createElement("script");
            b.onreadystatechange = function() {
              p(w), b.onreadystatechange = null, m.removeChild(b), b = null;
            }, m.appendChild(b);
          }) : function(w) {
            setTimeout(p, 0, w);
          }, y.setImmediate = function(w) {
            typeof w != "function" && (w = new Function("" + w));
            for (var b = new Array(arguments.length - 1), L = 0; L < b.length; L++) b[L] = arguments[L + 1];
            var v = { callback: w, args: b };
            return o[d] = v, l(d), d++;
          }, y.clearImmediate = u;
        }
        function u(w) {
          delete o[w];
        }
        function p(w) {
          if (x) setTimeout(p, 0, w);
          else {
            var b = o[w];
            if (b) {
              x = !0;
              try {
                (function(L) {
                  var v = L.callback, T = L.args;
                  switch (T.length) {
                    case 0:
                      v();
                      break;
                    case 1:
                      v(T[0]);
                      break;
                    case 2:
                      v(T[0], T[1]);
                      break;
                    case 3:
                      v(T[0], T[1], T[2]);
                      break;
                    default:
                      v.apply(r, T);
                  }
                })(b);
              } finally {
                u(w), x = !1;
              }
            }
          }
        }
        function A(w) {
          w.source === e && typeof w.data == "string" && w.data.indexOf(i) === 0 && p(+w.data.slice(i.length));
        }
      })(typeof self > "u" ? n === void 0 ? this : n : self);
    }).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
  }, {}] }, {}, [10])(10);
});
const Ws = /* @__PURE__ */ JSON.parse('{"accentBorderCallout1":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 112500"},{"name":"adj4","fmla":"val -38333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]}]}]},"accentBorderCallout2":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 112500"},{"name":"adj6","fmla":"val -46667"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]}]}]},"accentBorderCallout3":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 100000"},{"name":"adj6","fmla":"val -16667"},{"name":"adj7","fmla":"val 112963"},{"name":"adj8","fmla":"val -8333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"},{"name":"y4","fmla":"*/ h adj7 100000"},{"name":"x4","fmla":"*/ w adj8 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]}]}]},"accentCallout1":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 112500"},{"name":"adj4","fmla":"val -38333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]}]}]},"accentCallout2":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 112500"},{"name":"adj6","fmla":"val -46667"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]}]}]},"accentCallout3":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 100000"},{"name":"adj6","fmla":"val -16667"},{"name":"adj7","fmla":"val 112963"},{"name":"adj8","fmla":"val -8333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"},{"name":"y4","fmla":"*/ h adj7 100000"},{"name":"x4","fmla":"*/ w adj8 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]}]}]},"actionButtonBackPrevious":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g11","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g11","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g11","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonBeginning":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1 8"},{"name":"g15","fmla":"*/ g13 1 4"},{"name":"g16","fmla":"+- g11 g14 0"},{"name":"g17","fmla":"+- g11 g15 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g17","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g16","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"L","pts":[{"x":"g16","y":"g10"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g17","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g16","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"L","pts":[{"x":"g16","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g17","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g16","y":"g9"}]},{"c":"L","pts":[{"x":"g16","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonBlank":{"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonDocument":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"dx1","fmla":"*/ ss 9 32"},{"name":"g11","fmla":"+- hc 0 dx1"},{"name":"g12","fmla":"+- hc dx1 0"},{"name":"g13","fmla":"*/ ss 3 16"},{"name":"g14","fmla":"+- g12 0 g13"},{"name":"g15","fmla":"+- g9 g13 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g14","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g15"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g14","y":"g9"}]},{"c":"L","pts":[{"x":"g14","y":"g15"}]},{"c":"L","pts":[{"x":"g12","y":"g15"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g14","y":"g9"}]},{"c":"L","pts":[{"x":"g14","y":"g15"}]},{"c":"L","pts":[{"x":"g12","y":"g15"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g14","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g15"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g12","y":"g15"}]},{"c":"L","pts":[{"x":"g14","y":"g15"}]},{"c":"L","pts":[{"x":"g14","y":"g9"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonEnd":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 3 4"},{"name":"g15","fmla":"*/ g13 7 8"},{"name":"g16","fmla":"+- g11 g14 0"},{"name":"g17","fmla":"+- g11 g15 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g16","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g17","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g17","y":"g10"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g16","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g17","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g17","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g16","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g17","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g17","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonForwardNext":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g12","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g12","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g12","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonHelp":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1 7"},{"name":"g15","fmla":"*/ g13 3 14"},{"name":"g16","fmla":"*/ g13 2 7"},{"name":"g19","fmla":"*/ g13 3 7"},{"name":"g20","fmla":"*/ g13 4 7"},{"name":"g21","fmla":"*/ g13 17 28"},{"name":"g23","fmla":"*/ g13 21 28"},{"name":"g24","fmla":"*/ g13 11 14"},{"name":"g27","fmla":"+- g9 g16 0"},{"name":"g29","fmla":"+- g9 g21 0"},{"name":"g30","fmla":"+- g9 g23 0"},{"name":"g31","fmla":"+- g9 g24 0"},{"name":"g33","fmla":"+- g11 g15 0"},{"name":"g36","fmla":"+- g11 g19 0"},{"name":"g37","fmla":"+- g11 g20 0"},{"name":"g41","fmla":"*/ g13 1 14"},{"name":"g42","fmla":"*/ g13 3 28"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g33","y":"g27"}]},{"c":"A","wR":"g16","hR":"g16","stAng":"cd2","swAng":"cd2"},{"c":"A","wR":"g14","hR":"g15","stAng":"0","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g29"}]},{"c":"A","wR":"g14","hR":"g15","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"g14","hR":"g14","stAng":"0","swAng":"-10800000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g31"}]},{"c":"A","wR":"g42","hR":"g42","stAng":"3cd4","swAng":"21600000"},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g33","y":"g27"}]},{"c":"A","wR":"g16","hR":"g16","stAng":"cd2","swAng":"cd2"},{"c":"A","wR":"g14","hR":"g15","stAng":"0","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g29"}]},{"c":"A","wR":"g14","hR":"g15","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"g14","hR":"g14","stAng":"0","swAng":"-10800000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g31"}]},{"c":"A","wR":"g42","hR":"g42","stAng":"3cd4","swAng":"21600000"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g33","y":"g27"}]},{"c":"A","wR":"g16","hR":"g16","stAng":"cd2","swAng":"cd2"},{"c":"A","wR":"g14","hR":"g15","stAng":"0","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g29"}]},{"c":"A","wR":"g14","hR":"g15","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"g14","hR":"g14","stAng":"0","swAng":"-10800000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g31"}]},{"c":"A","wR":"g42","hR":"g42","stAng":"3cd4","swAng":"21600000"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonHome":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1 16"},{"name":"g15","fmla":"*/ g13 1 8"},{"name":"g16","fmla":"*/ g13 3 16"},{"name":"g17","fmla":"*/ g13 5 16"},{"name":"g18","fmla":"*/ g13 7 16"},{"name":"g19","fmla":"*/ g13 9 16"},{"name":"g20","fmla":"*/ g13 11 16"},{"name":"g21","fmla":"*/ g13 3 4"},{"name":"g22","fmla":"*/ g13 13 16"},{"name":"g23","fmla":"*/ g13 7 8"},{"name":"g24","fmla":"+- g9 g14 0"},{"name":"g25","fmla":"+- g9 g16 0"},{"name":"g26","fmla":"+- g9 g17 0"},{"name":"g27","fmla":"+- g9 g21 0"},{"name":"g28","fmla":"+- g11 g15 0"},{"name":"g29","fmla":"+- g11 g18 0"},{"name":"g30","fmla":"+- g11 g19 0"},{"name":"g31","fmla":"+- g11 g20 0"},{"name":"g32","fmla":"+- g11 g22 0"},{"name":"g33","fmla":"+- g11 g23 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"vc"}]},{"c":"L","pts":[{"x":"g28","y":"vc"}]},{"c":"L","pts":[{"x":"g28","y":"g10"}]},{"c":"L","pts":[{"x":"g33","y":"g10"}]},{"c":"L","pts":[{"x":"g33","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"vc"}]},{"c":"L","pts":[{"x":"g32","y":"g26"}]},{"c":"L","pts":[{"x":"g32","y":"g24"}]},{"c":"L","pts":[{"x":"g31","y":"g24"}]},{"c":"L","pts":[{"x":"g31","y":"g25"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g32","y":"g26"}]},{"c":"L","pts":[{"x":"g32","y":"g24"}]},{"c":"L","pts":[{"x":"g31","y":"g24"}]},{"c":"L","pts":[{"x":"g31","y":"g25"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g28","y":"vc"}]},{"c":"L","pts":[{"x":"g28","y":"g10"}]},{"c":"L","pts":[{"x":"g29","y":"g10"}]},{"c":"L","pts":[{"x":"g29","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g10"}]},{"c":"L","pts":[{"x":"g33","y":"g10"}]},{"c":"L","pts":[{"x":"g33","y":"vc"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"vc"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g29","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g10"}]},{"c":"L","pts":[{"x":"g29","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"L","pts":[{"x":"g31","y":"g25"}]},{"c":"L","pts":[{"x":"g31","y":"g24"}]},{"c":"L","pts":[{"x":"g32","y":"g24"}]},{"c":"L","pts":[{"x":"g32","y":"g26"}]},{"c":"L","pts":[{"x":"g12","y":"vc"}]},{"c":"L","pts":[{"x":"g33","y":"vc"}]},{"c":"L","pts":[{"x":"g33","y":"g10"}]},{"c":"L","pts":[{"x":"g28","y":"g10"}]},{"c":"L","pts":[{"x":"g28","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"vc"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g31","y":"g25"}]},{"c":"L","pts":[{"x":"g32","y":"g26"}]},{"c":"M","pts":[{"x":"g33","y":"vc"}]},{"c":"L","pts":[{"x":"g28","y":"vc"}]},{"c":"M","pts":[{"x":"g29","y":"g10"}]},{"c":"L","pts":[{"x":"g29","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g10"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonInformation":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1 32"},{"name":"g17","fmla":"*/ g13 5 16"},{"name":"g18","fmla":"*/ g13 3 8"},{"name":"g19","fmla":"*/ g13 13 32"},{"name":"g20","fmla":"*/ g13 19 32"},{"name":"g22","fmla":"*/ g13 11 16"},{"name":"g23","fmla":"*/ g13 13 16"},{"name":"g24","fmla":"*/ g13 7 8"},{"name":"g25","fmla":"+- g9 g14 0"},{"name":"g28","fmla":"+- g9 g17 0"},{"name":"g29","fmla":"+- g9 g18 0"},{"name":"g30","fmla":"+- g9 g23 0"},{"name":"g31","fmla":"+- g9 g24 0"},{"name":"g32","fmla":"+- g11 g17 0"},{"name":"g34","fmla":"+- g11 g19 0"},{"name":"g35","fmla":"+- g11 g20 0"},{"name":"g37","fmla":"+- g11 g22 0"},{"name":"g38","fmla":"*/ g13 3 32"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"A","wR":"dx2","hR":"dx2","stAng":"3cd4","swAng":"21600000"},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"A","wR":"dx2","hR":"dx2","stAng":"3cd4","swAng":"21600000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g25"}]},{"c":"A","wR":"g38","hR":"g38","stAng":"3cd4","swAng":"21600000"},{"c":"M","pts":[{"x":"g32","y":"g28"}]},{"c":"L","pts":[{"x":"g32","y":"g29"}]},{"c":"L","pts":[{"x":"g34","y":"g29"}]},{"c":"L","pts":[{"x":"g34","y":"g30"}]},{"c":"L","pts":[{"x":"g32","y":"g30"}]},{"c":"L","pts":[{"x":"g32","y":"g31"}]},{"c":"L","pts":[{"x":"g37","y":"g31"}]},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g35","y":"g30"}]},{"c":"L","pts":[{"x":"g35","y":"g28"}]},{"c":"Z"}]},{"fill":"lighten","stroke":"false","cmds":[{"c":"M","pts":[{"x":"hc","y":"g25"}]},{"c":"A","wR":"g38","hR":"g38","stAng":"3cd4","swAng":"21600000"},{"c":"M","pts":[{"x":"g32","y":"g28"}]},{"c":"L","pts":[{"x":"g35","y":"g28"}]},{"c":"L","pts":[{"x":"g35","y":"g30"}]},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g37","y":"g31"}]},{"c":"L","pts":[{"x":"g32","y":"g31"}]},{"c":"L","pts":[{"x":"g32","y":"g30"}]},{"c":"L","pts":[{"x":"g34","y":"g30"}]},{"c":"L","pts":[{"x":"g34","y":"g29"}]},{"c":"L","pts":[{"x":"g32","y":"g29"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"A","wR":"dx2","hR":"dx2","stAng":"3cd4","swAng":"21600000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g25"}]},{"c":"A","wR":"g38","hR":"g38","stAng":"3cd4","swAng":"21600000"},{"c":"M","pts":[{"x":"g32","y":"g28"}]},{"c":"L","pts":[{"x":"g35","y":"g28"}]},{"c":"L","pts":[{"x":"g35","y":"g30"}]},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g37","y":"g31"}]},{"c":"L","pts":[{"x":"g32","y":"g31"}]},{"c":"L","pts":[{"x":"g32","y":"g30"}]},{"c":"L","pts":[{"x":"g34","y":"g30"}]},{"c":"L","pts":[{"x":"g34","y":"g29"}]},{"c":"L","pts":[{"x":"g32","y":"g29"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonMovie":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1455 21600"},{"name":"g15","fmla":"*/ g13 1905 21600"},{"name":"g16","fmla":"*/ g13 2325 21600"},{"name":"g17","fmla":"*/ g13 16155 21600"},{"name":"g18","fmla":"*/ g13 17010 21600"},{"name":"g19","fmla":"*/ g13 19335 21600"},{"name":"g20","fmla":"*/ g13 19725 21600"},{"name":"g21","fmla":"*/ g13 20595 21600"},{"name":"g22","fmla":"*/ g13 5280 21600"},{"name":"g23","fmla":"*/ g13 5730 21600"},{"name":"g24","fmla":"*/ g13 6630 21600"},{"name":"g25","fmla":"*/ g13 7492 21600"},{"name":"g26","fmla":"*/ g13 9067 21600"},{"name":"g27","fmla":"*/ g13 9555 21600"},{"name":"g28","fmla":"*/ g13 13342 21600"},{"name":"g29","fmla":"*/ g13 14580 21600"},{"name":"g30","fmla":"*/ g13 15592 21600"},{"name":"g31","fmla":"+- g11 g14 0"},{"name":"g32","fmla":"+- g11 g15 0"},{"name":"g33","fmla":"+- g11 g16 0"},{"name":"g34","fmla":"+- g11 g17 0"},{"name":"g35","fmla":"+- g11 g18 0"},{"name":"g36","fmla":"+- g11 g19 0"},{"name":"g37","fmla":"+- g11 g20 0"},{"name":"g38","fmla":"+- g11 g21 0"},{"name":"g39","fmla":"+- g9 g22 0"},{"name":"g40","fmla":"+- g9 g23 0"},{"name":"g41","fmla":"+- g9 g24 0"},{"name":"g42","fmla":"+- g9 g25 0"},{"name":"g43","fmla":"+- g9 g26 0"},{"name":"g44","fmla":"+- g9 g27 0"},{"name":"g45","fmla":"+- g9 g28 0"},{"name":"g46","fmla":"+- g9 g29 0"},{"name":"g47","fmla":"+- g9 g30 0"},{"name":"g48","fmla":"+- g9 g31 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g11","y":"g39"}]},{"c":"L","pts":[{"x":"g11","y":"g44"}]},{"c":"L","pts":[{"x":"g31","y":"g44"}]},{"c":"L","pts":[{"x":"g32","y":"g43"}]},{"c":"L","pts":[{"x":"g33","y":"g43"}]},{"c":"L","pts":[{"x":"g33","y":"g47"}]},{"c":"L","pts":[{"x":"g35","y":"g47"}]},{"c":"L","pts":[{"x":"g35","y":"g45"}]},{"c":"L","pts":[{"x":"g36","y":"g45"}]},{"c":"L","pts":[{"x":"g38","y":"g46"}]},{"c":"L","pts":[{"x":"g12","y":"g46"}]},{"c":"L","pts":[{"x":"g12","y":"g41"}]},{"c":"L","pts":[{"x":"g38","y":"g41"}]},{"c":"L","pts":[{"x":"g37","y":"g42"}]},{"c":"L","pts":[{"x":"g35","y":"g42"}]},{"c":"L","pts":[{"x":"g35","y":"g41"}]},{"c":"L","pts":[{"x":"g34","y":"g40"}]},{"c":"L","pts":[{"x":"g32","y":"g40"}]},{"c":"L","pts":[{"x":"g31","y":"g39"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g11","y":"g39"}]},{"c":"L","pts":[{"x":"g11","y":"g44"}]},{"c":"L","pts":[{"x":"g31","y":"g44"}]},{"c":"L","pts":[{"x":"g32","y":"g43"}]},{"c":"L","pts":[{"x":"g33","y":"g43"}]},{"c":"L","pts":[{"x":"g33","y":"g47"}]},{"c":"L","pts":[{"x":"g35","y":"g47"}]},{"c":"L","pts":[{"x":"g35","y":"g45"}]},{"c":"L","pts":[{"x":"g36","y":"g45"}]},{"c":"L","pts":[{"x":"g38","y":"g46"}]},{"c":"L","pts":[{"x":"g12","y":"g46"}]},{"c":"L","pts":[{"x":"g12","y":"g41"}]},{"c":"L","pts":[{"x":"g38","y":"g41"}]},{"c":"L","pts":[{"x":"g37","y":"g42"}]},{"c":"L","pts":[{"x":"g35","y":"g42"}]},{"c":"L","pts":[{"x":"g35","y":"g41"}]},{"c":"L","pts":[{"x":"g34","y":"g40"}]},{"c":"L","pts":[{"x":"g32","y":"g40"}]},{"c":"L","pts":[{"x":"g31","y":"g39"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g11","y":"g39"}]},{"c":"L","pts":[{"x":"g31","y":"g39"}]},{"c":"L","pts":[{"x":"g32","y":"g40"}]},{"c":"L","pts":[{"x":"g34","y":"g40"}]},{"c":"L","pts":[{"x":"g35","y":"g41"}]},{"c":"L","pts":[{"x":"g35","y":"g42"}]},{"c":"L","pts":[{"x":"g37","y":"g42"}]},{"c":"L","pts":[{"x":"g38","y":"g41"}]},{"c":"L","pts":[{"x":"g12","y":"g41"}]},{"c":"L","pts":[{"x":"g12","y":"g46"}]},{"c":"L","pts":[{"x":"g38","y":"g46"}]},{"c":"L","pts":[{"x":"g36","y":"g45"}]},{"c":"L","pts":[{"x":"g35","y":"g45"}]},{"c":"L","pts":[{"x":"g35","y":"g47"}]},{"c":"L","pts":[{"x":"g33","y":"g47"}]},{"c":"L","pts":[{"x":"g33","y":"g43"}]},{"c":"L","pts":[{"x":"g32","y":"g43"}]},{"c":"L","pts":[{"x":"g31","y":"g44"}]},{"c":"L","pts":[{"x":"g11","y":"g44"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonReturn":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 7 8"},{"name":"g15","fmla":"*/ g13 3 4"},{"name":"g16","fmla":"*/ g13 5 8"},{"name":"g17","fmla":"*/ g13 3 8"},{"name":"g18","fmla":"*/ g13 1 4"},{"name":"g19","fmla":"+- g9 g15 0"},{"name":"g20","fmla":"+- g9 g16 0"},{"name":"g21","fmla":"+- g9 g18 0"},{"name":"g22","fmla":"+- g11 g14 0"},{"name":"g23","fmla":"+- g11 g15 0"},{"name":"g24","fmla":"+- g11 g16 0"},{"name":"g25","fmla":"+- g11 g17 0"},{"name":"g26","fmla":"+- g11 g18 0"},{"name":"g27","fmla":"*/ g13 1 8"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g12","y":"g21"}]},{"c":"L","pts":[{"x":"g23","y":"g9"}]},{"c":"L","pts":[{"x":"hc","y":"g21"}]},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"L","pts":[{"x":"g24","y":"g20"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"g25","y":"g19"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"g26","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g20"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"cd2","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"g10"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g22","y":"g21"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g12","y":"g21"}]},{"c":"L","pts":[{"x":"g23","y":"g9"}]},{"c":"L","pts":[{"x":"hc","y":"g21"}]},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"L","pts":[{"x":"g24","y":"g20"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"g25","y":"g19"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"g26","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g20"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"cd2","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"g10"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g22","y":"g21"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g12","y":"g21"}]},{"c":"L","pts":[{"x":"g22","y":"g21"}]},{"c":"L","pts":[{"x":"g22","y":"g20"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"g25","y":"g10"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g26","y":"g21"}]},{"c":"L","pts":[{"x":"g26","y":"g20"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"cd2","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"g19"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"L","pts":[{"x":"hc","y":"g21"}]},{"c":"L","pts":[{"x":"g23","y":"g9"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonSound":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1 8"},{"name":"g15","fmla":"*/ g13 5 16"},{"name":"g16","fmla":"*/ g13 5 8"},{"name":"g17","fmla":"*/ g13 11 16"},{"name":"g18","fmla":"*/ g13 3 4"},{"name":"g19","fmla":"*/ g13 7 8"},{"name":"g20","fmla":"+- g9 g14 0"},{"name":"g21","fmla":"+- g9 g15 0"},{"name":"g22","fmla":"+- g9 g17 0"},{"name":"g23","fmla":"+- g9 g19 0"},{"name":"g24","fmla":"+- g11 g15 0"},{"name":"g25","fmla":"+- g11 g16 0"},{"name":"g26","fmla":"+- g11 g18 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g22"}]},{"c":"L","pts":[{"x":"g24","y":"g22"}]},{"c":"L","pts":[{"x":"g25","y":"g10"}]},{"c":"L","pts":[{"x":"g25","y":"g9"}]},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g22"}]},{"c":"L","pts":[{"x":"g24","y":"g22"}]},{"c":"L","pts":[{"x":"g25","y":"g10"}]},{"c":"L","pts":[{"x":"g25","y":"g9"}]},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"L","pts":[{"x":"g25","y":"g9"}]},{"c":"L","pts":[{"x":"g25","y":"g10"}]},{"c":"L","pts":[{"x":"g24","y":"g22"}]},{"c":"L","pts":[{"x":"g11","y":"g22"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g26","y":"g21"}]},{"c":"L","pts":[{"x":"g12","y":"g20"}]},{"c":"M","pts":[{"x":"g26","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"vc"}]},{"c":"M","pts":[{"x":"g26","y":"g22"}]},{"c":"L","pts":[{"x":"g12","y":"g23"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"arc":{"av":[{"name":"adj1","fmla":"val 16200000"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"stAng","fmla":"pin 0 adj1 21599999"},{"name":"enAng","fmla":"pin 0 adj2 21599999"},{"name":"sw11","fmla":"+- enAng 0 stAng"},{"name":"sw12","fmla":"+- sw11 21600000 0"},{"name":"swAng","fmla":"?: sw11 sw11 sw12"},{"name":"wt1","fmla":"sin wd2 stAng"},{"name":"ht1","fmla":"cos hd2 stAng"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"wt2","fmla":"sin wd2 enAng"},{"name":"ht2","fmla":"cos hd2 enAng"},{"name":"dx2","fmla":"cat2 wd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 hd2 ht2 wt2"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"sw0","fmla":"+- 21600000 0 stAng"},{"name":"da1","fmla":"+- swAng 0 sw0"},{"name":"g1","fmla":"max x1 x2"},{"name":"ir","fmla":"?: da1 r g1"},{"name":"sw1","fmla":"+- cd4 0 stAng"},{"name":"sw2","fmla":"+- 27000000 0 stAng"},{"name":"sw3","fmla":"?: sw1 sw1 sw2"},{"name":"da2","fmla":"+- swAng 0 sw3"},{"name":"g5","fmla":"max y1 y2"},{"name":"ib","fmla":"?: da2 b g5"},{"name":"sw4","fmla":"+- cd2 0 stAng"},{"name":"sw5","fmla":"+- 32400000 0 stAng"},{"name":"sw6","fmla":"?: sw4 sw4 sw5"},{"name":"da3","fmla":"+- swAng 0 sw6"},{"name":"g9","fmla":"min x1 x2"},{"name":"il","fmla":"?: da3 l g9"},{"name":"sw7","fmla":"+- 3cd4 0 stAng"},{"name":"sw8","fmla":"+- 37800000 0 stAng"},{"name":"sw9","fmla":"?: sw7 sw7 sw8"},{"name":"da4","fmla":"+- swAng 0 sw9"},{"name":"g13","fmla":"min y1 y2"},{"name":"it","fmla":"?: da4 t g13"},{"name":"cang1","fmla":"+- stAng 0 cd4"},{"name":"cang2","fmla":"+- enAng cd4 0"},{"name":"cang3","fmla":"+/ cang1 cang2 2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"},{"c":"L","pts":[{"x":"hc","y":"vc"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"}]}]},"bentArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 43750"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"a3","fmla":"pin 0 adj3 50000"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw2","fmla":"*/ ss a2 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"dh2","fmla":"+- aw2 0 th2"},{"name":"ah","fmla":"*/ ss a3 100000"},{"name":"bw","fmla":"+- r 0 ah"},{"name":"bh","fmla":"+- b 0 dh2"},{"name":"bs","fmla":"min bw bh"},{"name":"maxAdj4","fmla":"*/ 100000 bs ss"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"bd","fmla":"*/ ss a4 100000"},{"name":"bd3","fmla":"+- bd 0 th"},{"name":"bd2","fmla":"max bd3 0"},{"name":"x3","fmla":"+- th bd2 0"},{"name":"x4","fmla":"+- r 0 ah"},{"name":"y3","fmla":"+- dh2 th 0"},{"name":"y4","fmla":"+- y3 dh2 0"},{"name":"y5","fmla":"+- dh2 bd 0"},{"name":"y6","fmla":"+- y3 bd2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"y5"}]},{"c":"A","wR":"bd","hR":"bd","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x4","y":"dh2"}]},{"c":"L","pts":[{"x":"x4","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"aw2"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"A","wR":"bd2","hR":"bd2","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"th","y":"b"}]},{"c":"Z"}]}]},"bentConnector2":{"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"bentConnector3":{"av":[{"name":"adj1","fmla":"val 50000"}],"gd":[{"name":"x1","fmla":"*/ w adj1 100000"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"bentConnector4":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"x1","fmla":"*/ w adj1 100000"},{"name":"x2","fmla":"+/ x1 r 2"},{"name":"y2","fmla":"*/ h adj2 100000"},{"name":"y1","fmla":"+/ t y2 2"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"bentConnector5":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 50000"}],"gd":[{"name":"x1","fmla":"*/ w adj1 100000"},{"name":"x3","fmla":"*/ w adj3 100000"},{"name":"x2","fmla":"+/ x1 x3 2"},{"name":"y2","fmla":"*/ h adj2 100000"},{"name":"y1","fmla":"+/ t y2 2"},{"name":"y3","fmla":"+/ b y2 2"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"bentUpArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"a3","fmla":"pin 0 adj3 50000"},{"name":"y1","fmla":"*/ ss a3 100000"},{"name":"dx1","fmla":"*/ ss a2 50000"},{"name":"x1","fmla":"+- r 0 dx1"},{"name":"dx3","fmla":"*/ ss a2 100000"},{"name":"x3","fmla":"+- r 0 dx3"},{"name":"dx2","fmla":"*/ ss a1 200000"},{"name":"x2","fmla":"+- x3 0 dx2"},{"name":"x4","fmla":"+- x3 dx2 0"},{"name":"dy2","fmla":"*/ ss a1 100000"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"x0","fmla":"*/ x4 1 2"},{"name":"y3","fmla":"+/ y2 b 2"},{"name":"y15","fmla":"+/ y1 b 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"bevel":{"av":[{"name":"adj","fmla":"val 12500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"x1","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"}]},{"fill":"lightenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]},{"fill":"lighten","stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x1","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"M","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]}]}]},"blockArc":{"av":[{"name":"adj1","fmla":"val 10800000"},{"name":"adj2","fmla":"val 0"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"stAng","fmla":"pin 0 adj1 21599999"},{"name":"istAng","fmla":"pin 0 adj2 21599999"},{"name":"a3","fmla":"pin 0 adj3 50000"},{"name":"sw11","fmla":"+- istAng 0 stAng"},{"name":"sw12","fmla":"+- sw11 21600000 0"},{"name":"swAng","fmla":"?: sw11 sw11 sw12"},{"name":"iswAng","fmla":"+- 0 0 swAng"},{"name":"wt1","fmla":"sin wd2 stAng"},{"name":"ht1","fmla":"cos hd2 stAng"},{"name":"wt3","fmla":"sin wd2 istAng"},{"name":"ht3","fmla":"cos hd2 istAng"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"dx3","fmla":"cat2 wd2 ht3 wt3"},{"name":"dy3","fmla":"sat2 hd2 ht3 wt3"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"x3","fmla":"+- hc dx3 0"},{"name":"y3","fmla":"+- vc dy3 0"},{"name":"dr","fmla":"*/ ss a3 100000"},{"name":"iwd2","fmla":"+- wd2 0 dr"},{"name":"ihd2","fmla":"+- hd2 0 dr"},{"name":"wt2","fmla":"sin iwd2 istAng"},{"name":"ht2","fmla":"cos ihd2 istAng"},{"name":"wt4","fmla":"sin iwd2 stAng"},{"name":"ht4","fmla":"cos ihd2 stAng"},{"name":"dx2","fmla":"cat2 iwd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 ihd2 ht2 wt2"},{"name":"dx4","fmla":"cat2 iwd2 ht4 wt4"},{"name":"dy4","fmla":"sat2 ihd2 ht4 wt4"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"x4","fmla":"+- hc dx4 0"},{"name":"y4","fmla":"+- vc dy4 0"},{"name":"sw0","fmla":"+- 21600000 0 stAng"},{"name":"da1","fmla":"+- swAng 0 sw0"},{"name":"g1","fmla":"max x1 x2"},{"name":"g2","fmla":"max x3 x4"},{"name":"g3","fmla":"max g1 g2"},{"name":"ir","fmla":"?: da1 r g3"},{"name":"sw1","fmla":"+- cd4 0 stAng"},{"name":"sw2","fmla":"+- 27000000 0 stAng"},{"name":"sw3","fmla":"?: sw1 sw1 sw2"},{"name":"da2","fmla":"+- swAng 0 sw3"},{"name":"g5","fmla":"max y1 y2"},{"name":"g6","fmla":"max y3 y4"},{"name":"g7","fmla":"max g5 g6"},{"name":"ib","fmla":"?: da2 b g7"},{"name":"sw4","fmla":"+- cd2 0 stAng"},{"name":"sw5","fmla":"+- 32400000 0 stAng"},{"name":"sw6","fmla":"?: sw4 sw4 sw5"},{"name":"da3","fmla":"+- swAng 0 sw6"},{"name":"g9","fmla":"min x1 x2"},{"name":"g10","fmla":"min x3 x4"},{"name":"g11","fmla":"min g9 g10"},{"name":"il","fmla":"?: da3 l g11"},{"name":"sw7","fmla":"+- 3cd4 0 stAng"},{"name":"sw8","fmla":"+- 37800000 0 stAng"},{"name":"sw9","fmla":"?: sw7 sw7 sw8"},{"name":"da4","fmla":"+- swAng 0 sw9"},{"name":"g13","fmla":"min y1 y2"},{"name":"g14","fmla":"min y3 y4"},{"name":"g15","fmla":"min g13 g14"},{"name":"it","fmla":"?: da4 t g15"},{"name":"x5","fmla":"+/ x1 x4 2"},{"name":"y5","fmla":"+/ y1 y4 2"},{"name":"x6","fmla":"+/ x3 x2 2"},{"name":"y6","fmla":"+/ y3 y2 2"},{"name":"cang1","fmla":"+- stAng 0 cd4"},{"name":"cang2","fmla":"+- istAng cd4 0"},{"name":"cang3","fmla":"+/ cang1 cang2 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"istAng","swAng":"iswAng"},{"c":"Z"}]}]},"borderCallout1":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 112500"},{"name":"adj4","fmla":"val -38333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]}]}]},"borderCallout2":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 112500"},{"name":"adj6","fmla":"val -46667"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]}]}]},"borderCallout3":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 100000"},{"name":"adj6","fmla":"val -16667"},{"name":"adj7","fmla":"val 112963"},{"name":"adj8","fmla":"val -8333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"},{"name":"y4","fmla":"*/ h adj7 100000"},{"name":"x4","fmla":"*/ w adj8 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]}]}]},"bracePair":{"av":[{"name":"adj","fmla":"val 8333"}],"gd":[{"name":"a","fmla":"pin 0 adj 25000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"*/ ss a 50000"},{"name":"x3","fmla":"+- r 0 x2"},{"name":"x4","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- vc 0 x1"},{"name":"y3","fmla":"+- vc x1 0"},{"name":"y4","fmla":"+- b 0 x1"},{"name":"it","fmla":"*/ x1 29289 100000"},{"name":"il","fmla":"+- x1 it 0"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 it"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"x2","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"-5400000"},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"-5400000"},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x2","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"-5400000"},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"M","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"-5400000"},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"}]}]},"bracketPair":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"},{"name":"il","fmla":"*/ x1 29289 100000"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"M","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"}]}]},"callout1":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 112500"},{"name":"adj4","fmla":"val -38333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]}]}]},"callout2":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 112500"},{"name":"adj6","fmla":"val -46667"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]}]}]},"callout3":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 100000"},{"name":"adj6","fmla":"val -16667"},{"name":"adj7","fmla":"val 112963"},{"name":"adj8","fmla":"val -8333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"},{"name":"y4","fmla":"*/ h adj7 100000"},{"name":"x4","fmla":"*/ w adj8 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]}]}]},"can":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 h ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"y1","fmla":"*/ ss a 200000"},{"name":"y2","fmla":"+- y1 y1 0"},{"name":"y3","fmla":"+- b 0 y1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"-10800000"},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd2"},{"c":"Z"}]},{"fill":"lighten","stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"cd2"},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd2"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"r","y":"y1"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd2"},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"cd2"},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd2"},{"c":"L","pts":[{"x":"l","y":"y1"}]}]}]},"chartPlus":{"paths":[{"w":10,"h":10,"fill":"none","cmds":[{"c":"M","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"10"}]},{"c":"M","pts":[{"x":"0","y":"5"}]},{"c":"L","pts":[{"x":"10","y":"5"}]}]},{"w":10,"h":10,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"0","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"0"}]},{"c":"Z"}]}]},"chartStar":{"paths":[{"w":10,"h":10,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"10","y":"10"}]},{"c":"M","pts":[{"x":"0","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"0"}]},{"c":"M","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"10"}]}]},{"w":10,"h":10,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"0","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"0"}]},{"c":"Z"}]}]},"chartX":{"paths":[{"w":10,"h":10,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"10","y":"10"}]},{"c":"M","pts":[{"x":"0","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"0"}]}]},{"w":10,"h":10,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"0","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"0"}]},{"c":"Z"}]}]},"chevron":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"maxAdj","fmla":"*/ 100000 w ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"x3","fmla":"*/ x2 1 2"},{"name":"dx","fmla":"+- x2 0 x1"},{"name":"il","fmla":"?: dx x1 l"},{"name":"ir","fmla":"?: dx x2 r"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"vc"}]},{"c":"Z"}]}]},"chord":{"av":[{"name":"adj1","fmla":"val 2700000"},{"name":"adj2","fmla":"val 16200000"}],"gd":[{"name":"stAng","fmla":"pin 0 adj1 21599999"},{"name":"enAng","fmla":"pin 0 adj2 21599999"},{"name":"sw1","fmla":"+- enAng 0 stAng"},{"name":"sw2","fmla":"+- sw1 21600000 0"},{"name":"swAng","fmla":"?: sw1 sw1 sw2"},{"name":"wt1","fmla":"sin wd2 stAng"},{"name":"ht1","fmla":"cos hd2 stAng"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"wt2","fmla":"sin wd2 enAng"},{"name":"ht2","fmla":"cos hd2 enAng"},{"name":"dx2","fmla":"cat2 wd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 hd2 ht2 wt2"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"x3","fmla":"+/ x1 x2 2"},{"name":"y3","fmla":"+/ y1 y2 2"},{"name":"midAng0","fmla":"*/ swAng 1 2"},{"name":"midAng","fmla":"+- stAng midAng0 cd2"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"},{"c":"Z"}]}]},"circularArrow":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val 1142319"},{"name":"adj3","fmla":"val 20457681"},{"name":"adj4","fmla":"val 10800000"},{"name":"adj5","fmla":"val 12500"}],"gd":[{"name":"a5","fmla":"pin 0 adj5 25000"},{"name":"maxAdj1","fmla":"*/ a5 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"enAng","fmla":"pin 1 adj3 21599999"},{"name":"stAng","fmla":"pin 0 adj4 21599999"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"thh","fmla":"*/ ss a5 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"rw1","fmla":"+- wd2 th2 thh"},{"name":"rh1","fmla":"+- hd2 th2 thh"},{"name":"rw2","fmla":"+- rw1 0 th"},{"name":"rh2","fmla":"+- rh1 0 th"},{"name":"rw3","fmla":"+- rw2 th2 0"},{"name":"rh3","fmla":"+- rh2 th2 0"},{"name":"wtH","fmla":"sin rw3 enAng"},{"name":"htH","fmla":"cos rh3 enAng"},{"name":"dxH","fmla":"cat2 rw3 htH wtH"},{"name":"dyH","fmla":"sat2 rh3 htH wtH"},{"name":"xH","fmla":"+- hc dxH 0"},{"name":"yH","fmla":"+- vc dyH 0"},{"name":"rI","fmla":"min rw2 rh2"},{"name":"u1","fmla":"*/ dxH dxH 1"},{"name":"u2","fmla":"*/ dyH dyH 1"},{"name":"u3","fmla":"*/ rI rI 1"},{"name":"u4","fmla":"+- u1 0 u3"},{"name":"u5","fmla":"+- u2 0 u3"},{"name":"u6","fmla":"*/ u4 u5 u1"},{"name":"u7","fmla":"*/ u6 1 u2"},{"name":"u8","fmla":"+- 1 0 u7"},{"name":"u9","fmla":"sqrt u8"},{"name":"u10","fmla":"*/ u4 1 dxH"},{"name":"u11","fmla":"*/ u10 1 dyH"},{"name":"u12","fmla":"+/ 1 u9 u11"},{"name":"u13","fmla":"at2 1 u12"},{"name":"u14","fmla":"+- u13 21600000 0"},{"name":"u15","fmla":"?: u13 u13 u14"},{"name":"u16","fmla":"+- u15 0 enAng"},{"name":"u17","fmla":"+- u16 21600000 0"},{"name":"u18","fmla":"?: u16 u16 u17"},{"name":"u19","fmla":"+- u18 0 cd2"},{"name":"u20","fmla":"+- u18 0 21600000"},{"name":"u21","fmla":"?: u19 u20 u18"},{"name":"maxAng","fmla":"abs u21"},{"name":"aAng","fmla":"pin 0 adj2 maxAng"},{"name":"ptAng","fmla":"+- enAng aAng 0"},{"name":"wtA","fmla":"sin rw3 ptAng"},{"name":"htA","fmla":"cos rh3 ptAng"},{"name":"dxA","fmla":"cat2 rw3 htA wtA"},{"name":"dyA","fmla":"sat2 rh3 htA wtA"},{"name":"xA","fmla":"+- hc dxA 0"},{"name":"yA","fmla":"+- vc dyA 0"},{"name":"wtE","fmla":"sin rw1 stAng"},{"name":"htE","fmla":"cos rh1 stAng"},{"name":"dxE","fmla":"cat2 rw1 htE wtE"},{"name":"dyE","fmla":"sat2 rh1 htE wtE"},{"name":"xE","fmla":"+- hc dxE 0"},{"name":"yE","fmla":"+- vc dyE 0"},{"name":"dxG","fmla":"cos thh ptAng"},{"name":"dyG","fmla":"sin thh ptAng"},{"name":"xG","fmla":"+- xH dxG 0"},{"name":"yG","fmla":"+- yH dyG 0"},{"name":"dxB","fmla":"cos thh ptAng"},{"name":"dyB","fmla":"sin thh ptAng"},{"name":"xB","fmla":"+- xH 0 dxB 0"},{"name":"yB","fmla":"+- yH 0 dyB 0"},{"name":"sx1","fmla":"+- xB 0 hc"},{"name":"sy1","fmla":"+- yB 0 vc"},{"name":"sx2","fmla":"+- xG 0 hc"},{"name":"sy2","fmla":"+- yG 0 vc"},{"name":"rO","fmla":"min rw1 rh1"},{"name":"x1O","fmla":"*/ sx1 rO rw1"},{"name":"y1O","fmla":"*/ sy1 rO rh1"},{"name":"x2O","fmla":"*/ sx2 rO rw1"},{"name":"y2O","fmla":"*/ sy2 rO rh1"},{"name":"dxO","fmla":"+- x2O 0 x1O"},{"name":"dyO","fmla":"+- y2O 0 y1O"},{"name":"dO","fmla":"mod dxO dyO 0"},{"name":"q1","fmla":"*/ x1O y2O 1"},{"name":"q2","fmla":"*/ x2O y1O 1"},{"name":"DO","fmla":"+- q1 0 q2"},{"name":"q3","fmla":"*/ rO rO 1"},{"name":"q4","fmla":"*/ dO dO 1"},{"name":"q5","fmla":"*/ q3 q4 1"},{"name":"q6","fmla":"*/ DO DO 1"},{"name":"q7","fmla":"+- q5 0 q6"},{"name":"q8","fmla":"max q7 0"},{"name":"sdelO","fmla":"sqrt q8"},{"name":"ndyO","fmla":"*/ dyO -1 1"},{"name":"sdyO","fmla":"?: ndyO -1 1"},{"name":"q9","fmla":"*/ sdyO dxO 1"},{"name":"q10","fmla":"*/ q9 sdelO 1"},{"name":"q11","fmla":"*/ DO dyO 1"},{"name":"dxF1","fmla":"+/ q11 q10 q4"},{"name":"q12","fmla":"+- q11 0 q10"},{"name":"dxF2","fmla":"*/ q12 1 q4"},{"name":"adyO","fmla":"abs dyO"},{"name":"q13","fmla":"*/ adyO sdelO 1"},{"name":"q14","fmla":"*/ DO dxO -1"},{"name":"dyF1","fmla":"+/ q14 q13 q4"},{"name":"q15","fmla":"+- q14 0 q13"},{"name":"dyF2","fmla":"*/ q15 1 q4"},{"name":"q16","fmla":"+- x2O 0 dxF1"},{"name":"q17","fmla":"+- x2O 0 dxF2"},{"name":"q18","fmla":"+- y2O 0 dyF1"},{"name":"q19","fmla":"+- y2O 0 dyF2"},{"name":"q20","fmla":"mod q16 q18 0"},{"name":"q21","fmla":"mod q17 q19 0"},{"name":"q22","fmla":"+- q21 0 q20"},{"name":"dxF","fmla":"?: q22 dxF1 dxF2"},{"name":"dyF","fmla":"?: q22 dyF1 dyF2"},{"name":"sdxF","fmla":"*/ dxF rw1 rO"},{"name":"sdyF","fmla":"*/ dyF rh1 rO"},{"name":"xF","fmla":"+- hc sdxF 0"},{"name":"yF","fmla":"+- vc sdyF 0"},{"name":"x1I","fmla":"*/ sx1 rI rw2"},{"name":"y1I","fmla":"*/ sy1 rI rh2"},{"name":"x2I","fmla":"*/ sx2 rI rw2"},{"name":"y2I","fmla":"*/ sy2 rI rh2"},{"name":"dxI","fmla":"+- x2I 0 x1I"},{"name":"dyI","fmla":"+- y2I 0 y1I"},{"name":"dI","fmla":"mod dxI dyI 0"},{"name":"v1","fmla":"*/ x1I y2I 1"},{"name":"v2","fmla":"*/ x2I y1I 1"},{"name":"DI","fmla":"+- v1 0 v2"},{"name":"v3","fmla":"*/ rI rI 1"},{"name":"v4","fmla":"*/ dI dI 1"},{"name":"v5","fmla":"*/ v3 v4 1"},{"name":"v6","fmla":"*/ DI DI 1"},{"name":"v7","fmla":"+- v5 0 v6"},{"name":"v8","fmla":"max v7 0"},{"name":"sdelI","fmla":"sqrt v8"},{"name":"v9","fmla":"*/ sdyO dxI 1"},{"name":"v10","fmla":"*/ v9 sdelI 1"},{"name":"v11","fmla":"*/ DI dyI 1"},{"name":"dxC1","fmla":"+/ v11 v10 v4"},{"name":"v12","fmla":"+- v11 0 v10"},{"name":"dxC2","fmla":"*/ v12 1 v4"},{"name":"adyI","fmla":"abs dyI"},{"name":"v13","fmla":"*/ adyI sdelI 1"},{"name":"v14","fmla":"*/ DI dxI -1"},{"name":"dyC1","fmla":"+/ v14 v13 v4"},{"name":"v15","fmla":"+- v14 0 v13"},{"name":"dyC2","fmla":"*/ v15 1 v4"},{"name":"v16","fmla":"+- x1I 0 dxC1"},{"name":"v17","fmla":"+- x1I 0 dxC2"},{"name":"v18","fmla":"+- y1I 0 dyC1"},{"name":"v19","fmla":"+- y1I 0 dyC2"},{"name":"v20","fmla":"mod v16 v18 0"},{"name":"v21","fmla":"mod v17 v19 0"},{"name":"v22","fmla":"+- v21 0 v20"},{"name":"dxC","fmla":"?: v22 dxC1 dxC2"},{"name":"dyC","fmla":"?: v22 dyC1 dyC2"},{"name":"sdxC","fmla":"*/ dxC rw2 rI"},{"name":"sdyC","fmla":"*/ dyC rh2 rI"},{"name":"xC","fmla":"+- hc sdxC 0"},{"name":"yC","fmla":"+- vc sdyC 0"},{"name":"ist0","fmla":"at2 sdxC sdyC"},{"name":"ist1","fmla":"+- ist0 21600000 0"},{"name":"istAng","fmla":"?: ist0 ist0 ist1"},{"name":"isw1","fmla":"+- stAng 0 istAng"},{"name":"isw2","fmla":"+- isw1 0 21600000"},{"name":"iswAng","fmla":"?: isw1 isw2 isw1"},{"name":"p1","fmla":"+- xF 0 xC"},{"name":"p2","fmla":"+- yF 0 yC"},{"name":"p3","fmla":"mod p1 p2 0"},{"name":"p4","fmla":"*/ p3 1 2"},{"name":"p5","fmla":"+- p4 0 thh"},{"name":"xGp","fmla":"?: p5 xF xG"},{"name":"yGp","fmla":"?: p5 yF yG"},{"name":"xBp","fmla":"?: p5 xC xB"},{"name":"yBp","fmla":"?: p5 yC yB"},{"name":"en0","fmla":"at2 sdxF sdyF"},{"name":"en1","fmla":"+- en0 21600000 0"},{"name":"en2","fmla":"?: en0 en0 en1"},{"name":"sw0","fmla":"+- en2 0 stAng"},{"name":"sw1","fmla":"+- sw0 21600000 0"},{"name":"swAng","fmla":"?: sw0 sw0 sw1"},{"name":"wtI","fmla":"sin rw3 stAng"},{"name":"htI","fmla":"cos rh3 stAng"},{"name":"dxI","fmla":"cat2 rw3 htI wtI"},{"name":"dyI","fmla":"sat2 rh3 htI wtI"},{"name":"xI","fmla":"+- hc dxI 0"},{"name":"yI","fmla":"+- vc dyI 0"},{"name":"aI","fmla":"+- stAng 0 cd4"},{"name":"aA","fmla":"+- ptAng cd4 0"},{"name":"aB","fmla":"+- ptAng cd2 0"},{"name":"idx","fmla":"cos rw1 2700000"},{"name":"idy","fmla":"sin rh1 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xE","y":"yE"}]},{"c":"A","wR":"rw1","hR":"rh1","stAng":"stAng","swAng":"swAng"},{"c":"L","pts":[{"x":"xGp","y":"yGp"}]},{"c":"L","pts":[{"x":"xA","y":"yA"}]},{"c":"L","pts":[{"x":"xBp","y":"yBp"}]},{"c":"L","pts":[{"x":"xC","y":"yC"}]},{"c":"A","wR":"rw2","hR":"rh2","stAng":"istAng","swAng":"iswAng"},{"c":"Z"}]}]},"cloud":{"gd":[{"name":"il","fmla":"*/ w 2977 21600"},{"name":"it","fmla":"*/ h 3262 21600"},{"name":"ir","fmla":"*/ w 17087 21600"},{"name":"ib","fmla":"*/ h 17337 21600"},{"name":"g27","fmla":"*/ w 67 21600"},{"name":"g28","fmla":"*/ h 21577 21600"},{"name":"g29","fmla":"*/ w 21582 21600"},{"name":"g30","fmla":"*/ h 1235 21600"}],"paths":[{"w":43200,"h":43200,"cmds":[{"c":"M","pts":[{"x":"3900","y":"14370"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"-11429249","swAng":"7426832"},{"c":"A","wR":"5333","hR":"7267","stAng":"-8646143","swAng":"5396714"},{"c":"A","wR":"4365","hR":"5945","stAng":"-8748475","swAng":"5983381"},{"c":"A","wR":"4857","hR":"6595","stAng":"-7859164","swAng":"7034504"},{"c":"A","wR":"5333","hR":"7273","stAng":"-4722533","swAng":"6541615"},{"c":"A","wR":"6775","hR":"9220","stAng":"-2776035","swAng":"7816140"},{"c":"A","wR":"5785","hR":"7867","stAng":"37501","swAng":"6842000"},{"c":"A","wR":"6752","hR":"9215","stAng":"1347096","swAng":"6910353"},{"c":"A","wR":"7720","hR":"10543","stAng":"3974558","swAng":"4542661"},{"c":"A","wR":"4360","hR":"5918","stAng":"-16496525","swAng":"8804134"},{"c":"A","wR":"4345","hR":"5945","stAng":"-14809710","swAng":"9151131"},{"c":"Z"}]},{"w":43200,"h":43200,"fill":"none","cmds":[{"c":"M","pts":[{"x":"4693","y":"26177"}]},{"c":"A","wR":"4345","hR":"5945","stAng":"5204520","swAng":"1585770"},{"c":"M","pts":[{"x":"6928","y":"34899"}]},{"c":"A","wR":"4360","hR":"5918","stAng":"4416628","swAng":"686848"},{"c":"M","pts":[{"x":"16478","y":"39090"}]},{"c":"A","wR":"6752","hR":"9215","stAng":"8257449","swAng":"844866"},{"c":"M","pts":[{"x":"28827","y":"34751"}]},{"c":"A","wR":"6752","hR":"9215","stAng":"387196","swAng":"959901"},{"c":"M","pts":[{"x":"34129","y":"22954"}]},{"c":"A","wR":"5785","hR":"7867","stAng":"-4217541","swAng":"4255042"},{"c":"M","pts":[{"x":"41798","y":"15354"}]},{"c":"A","wR":"5333","hR":"7273","stAng":"1819082","swAng":"1665090"},{"c":"M","pts":[{"x":"38324","y":"5426"}]},{"c":"A","wR":"4857","hR":"6595","stAng":"-824660","swAng":"891534"},{"c":"M","pts":[{"x":"29078","y":"3952"}]},{"c":"A","wR":"4857","hR":"6595","stAng":"-8950887","swAng":"1091722"},{"c":"M","pts":[{"x":"22141","y":"4720"}]},{"c":"A","wR":"4365","hR":"5945","stAng":"-9809656","swAng":"1061181"},{"c":"M","pts":[{"x":"14000","y":"5192"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"-4002417","swAng":"739161"},{"c":"M","pts":[{"x":"4127","y":"15789"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"9459261","swAng":"711490"}]}]},"cloudCallout":{"av":[{"name":"adj1","fmla":"val -20833"},{"name":"adj2","fmla":"val 62500"}],"gd":[{"name":"dxPos","fmla":"*/ w adj1 100000"},{"name":"dyPos","fmla":"*/ h adj2 100000"},{"name":"xPos","fmla":"+- hc dxPos 0"},{"name":"yPos","fmla":"+- vc dyPos 0"},{"name":"ht","fmla":"cat2 hd2 dxPos dyPos"},{"name":"wt","fmla":"sat2 wd2 dxPos dyPos"},{"name":"g2","fmla":"cat2 wd2 ht wt"},{"name":"g3","fmla":"sat2 hd2 ht wt"},{"name":"g4","fmla":"+- hc g2 0"},{"name":"g5","fmla":"+- vc g3 0"},{"name":"g6","fmla":"+- g4 0 xPos"},{"name":"g7","fmla":"+- g5 0 yPos"},{"name":"g8","fmla":"mod g6 g7 0"},{"name":"g9","fmla":"*/ ss 6600 21600"},{"name":"g10","fmla":"+- g8 0 g9"},{"name":"g11","fmla":"*/ g10 1 3"},{"name":"g12","fmla":"*/ ss 1800 21600"},{"name":"g13","fmla":"+- g11 g12 0"},{"name":"g14","fmla":"*/ g13 g6 g8"},{"name":"g15","fmla":"*/ g13 g7 g8"},{"name":"g16","fmla":"+- g14 xPos 0"},{"name":"g17","fmla":"+- g15 yPos 0"},{"name":"g18","fmla":"*/ ss 4800 21600"},{"name":"g19","fmla":"*/ g11 2 1"},{"name":"g20","fmla":"+- g18 g19 0"},{"name":"g21","fmla":"*/ g20 g6 g8"},{"name":"g22","fmla":"*/ g20 g7 g8"},{"name":"g23","fmla":"+- g21 xPos 0"},{"name":"g24","fmla":"+- g22 yPos 0"},{"name":"g25","fmla":"*/ ss 1200 21600"},{"name":"g26","fmla":"*/ ss 600 21600"},{"name":"x23","fmla":"+- xPos g26 0"},{"name":"x24","fmla":"+- g16 g25 0"},{"name":"x25","fmla":"+- g23 g12 0"},{"name":"il","fmla":"*/ w 2977 21600"},{"name":"it","fmla":"*/ h 3262 21600"},{"name":"ir","fmla":"*/ w 17087 21600"},{"name":"ib","fmla":"*/ h 17337 21600"},{"name":"g27","fmla":"*/ w 67 21600"},{"name":"g28","fmla":"*/ h 21577 21600"},{"name":"g29","fmla":"*/ w 21582 21600"},{"name":"g30","fmla":"*/ h 1235 21600"},{"name":"pang","fmla":"at2 dxPos dyPos"}],"paths":[{"w":43200,"h":43200,"cmds":[{"c":"M","pts":[{"x":"3900","y":"14370"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"-11429249","swAng":"7426832"},{"c":"A","wR":"5333","hR":"7267","stAng":"-8646143","swAng":"5396714"},{"c":"A","wR":"4365","hR":"5945","stAng":"-8748475","swAng":"5983381"},{"c":"A","wR":"4857","hR":"6595","stAng":"-7859164","swAng":"7034504"},{"c":"A","wR":"5333","hR":"7273","stAng":"-4722533","swAng":"6541615"},{"c":"A","wR":"6775","hR":"9220","stAng":"-2776035","swAng":"7816140"},{"c":"A","wR":"5785","hR":"7867","stAng":"37501","swAng":"6842000"},{"c":"A","wR":"6752","hR":"9215","stAng":"1347096","swAng":"6910353"},{"c":"A","wR":"7720","hR":"10543","stAng":"3974558","swAng":"4542661"},{"c":"A","wR":"4360","hR":"5918","stAng":"-16496525","swAng":"8804134"},{"c":"A","wR":"4345","hR":"5945","stAng":"-14809710","swAng":"9151131"},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x23","y":"yPos"}]},{"c":"A","wR":"g26","hR":"g26","stAng":"0","swAng":"21600000"},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x24","y":"g17"}]},{"c":"A","wR":"g25","hR":"g25","stAng":"0","swAng":"21600000"},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x25","y":"g24"}]},{"c":"A","wR":"g12","hR":"g12","stAng":"0","swAng":"21600000"},{"c":"Z"}]},{"w":43200,"h":43200,"fill":"none","cmds":[{"c":"M","pts":[{"x":"4693","y":"26177"}]},{"c":"A","wR":"4345","hR":"5945","stAng":"5204520","swAng":"1585770"},{"c":"M","pts":[{"x":"6928","y":"34899"}]},{"c":"A","wR":"4360","hR":"5918","stAng":"4416628","swAng":"686848"},{"c":"M","pts":[{"x":"16478","y":"39090"}]},{"c":"A","wR":"6752","hR":"9215","stAng":"8257449","swAng":"844866"},{"c":"M","pts":[{"x":"28827","y":"34751"}]},{"c":"A","wR":"6752","hR":"9215","stAng":"387196","swAng":"959901"},{"c":"M","pts":[{"x":"34129","y":"22954"}]},{"c":"A","wR":"5785","hR":"7867","stAng":"-4217541","swAng":"4255042"},{"c":"M","pts":[{"x":"41798","y":"15354"}]},{"c":"A","wR":"5333","hR":"7273","stAng":"1819082","swAng":"1665090"},{"c":"M","pts":[{"x":"38324","y":"5426"}]},{"c":"A","wR":"4857","hR":"6595","stAng":"-824660","swAng":"891534"},{"c":"M","pts":[{"x":"29078","y":"3952"}]},{"c":"A","wR":"4857","hR":"6595","stAng":"-8950887","swAng":"1091722"},{"c":"M","pts":[{"x":"22141","y":"4720"}]},{"c":"A","wR":"4365","hR":"5945","stAng":"-9809656","swAng":"1061181"},{"c":"M","pts":[{"x":"14000","y":"5192"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"-4002417","swAng":"739161"},{"c":"M","pts":[{"x":"4127","y":"15789"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"9459261","swAng":"711490"}]}]},"corner":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj1","fmla":"*/ 100000 h ss"},{"name":"maxAdj2","fmla":"*/ 100000 w ss"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"x1","fmla":"*/ ss a2 100000"},{"name":"dy1","fmla":"*/ ss a1 100000"},{"name":"y1","fmla":"+- b 0 dy1"},{"name":"cx1","fmla":"*/ x1 1 2"},{"name":"cy1","fmla":"+/ y1 b 2"},{"name":"d","fmla":"+- w 0 h"},{"name":"it","fmla":"?: d y1 t"},{"name":"ir","fmla":"?: d r x1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"cornerTabs":{"gd":[{"name":"md","fmla":"mod w h 0"},{"name":"dx","fmla":"*/ 1 md 20"},{"name":"y1","fmla":"+- 0 b dx"},{"name":"x1","fmla":"+- 0 r dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"dx","y":"t"}]},{"c":"L","pts":[{"x":"l","y":"dx"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"dx","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"dx"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"Z"}]}]},"cube":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 0 adj 100000"},{"name":"y1","fmla":"*/ ss a 100000"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y2","fmla":"*/ y4 1 2"},{"name":"y3","fmla":"+/ y1 b 2"},{"name":"x4","fmla":"+- r 0 y1"},{"name":"x2","fmla":"*/ x4 1 2"},{"name":"x3","fmla":"+/ y1 r 2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"Z"}]},{"fill":"lightenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"y1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"y1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"M","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]}]}]},"curvedConnector2":{"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"wd2","y":"t"},{"x":"r","y":"hd2"},{"x":"r","y":"b"}]}]}]},"curvedConnector3":{"av":[{"name":"adj1","fmla":"val 50000"}],"gd":[{"name":"x2","fmla":"*/ w adj1 100000"},{"name":"x1","fmla":"+/ l x2 2"},{"name":"x3","fmla":"+/ r x2 2"},{"name":"y3","fmla":"*/ h 3 4"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"x1","y":"t"},{"x":"x2","y":"hd4"},{"x":"x2","y":"vc"}]},{"c":"C","pts":[{"x":"x2","y":"y3"},{"x":"x3","y":"b"},{"x":"r","y":"b"}]}]}]},"curvedConnector4":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"x2","fmla":"*/ w adj1 100000"},{"name":"x1","fmla":"+/ l x2 2"},{"name":"x3","fmla":"+/ r x2 2"},{"name":"x4","fmla":"+/ x2 x3 2"},{"name":"x5","fmla":"+/ x3 r 2"},{"name":"y4","fmla":"*/ h adj2 100000"},{"name":"y1","fmla":"+/ t y4 2"},{"name":"y2","fmla":"+/ t y1 2"},{"name":"y3","fmla":"+/ y1 y4 2"},{"name":"y5","fmla":"+/ b y4 2"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"x1","y":"t"},{"x":"x2","y":"y2"},{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x2","y":"y3"},{"x":"x4","y":"y4"},{"x":"x3","y":"y4"}]},{"c":"C","pts":[{"x":"x5","y":"y4"},{"x":"r","y":"y5"},{"x":"r","y":"b"}]}]}]},"curvedConnector5":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 50000"}],"gd":[{"name":"x3","fmla":"*/ w adj1 100000"},{"name":"x6","fmla":"*/ w adj3 100000"},{"name":"x1","fmla":"+/ x3 x6 2"},{"name":"x2","fmla":"+/ l x3 2"},{"name":"x4","fmla":"+/ x3 x1 2"},{"name":"x5","fmla":"+/ x6 x1 2"},{"name":"x7","fmla":"+/ x6 r 2"},{"name":"y4","fmla":"*/ h adj2 100000"},{"name":"y1","fmla":"+/ t y4 2"},{"name":"y2","fmla":"+/ t y1 2"},{"name":"y3","fmla":"+/ y1 y4 2"},{"name":"y5","fmla":"+/ b y4 2"},{"name":"y6","fmla":"+/ y5 y4 2"},{"name":"y7","fmla":"+/ y5 b 2"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"x2","y":"t"},{"x":"x3","y":"y2"},{"x":"x3","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y3"},{"x":"x4","y":"y4"},{"x":"x1","y":"y4"}]},{"c":"C","pts":[{"x":"x5","y":"y4"},{"x":"x6","y":"y6"},{"x":"x6","y":"y5"}]},{"c":"C","pts":[{"x":"x6","y":"y7"},{"x":"x7","y":"b"},{"x":"r","y":"b"}]}]}]},"curvedDownArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw","fmla":"*/ ss a2 100000"},{"name":"q1","fmla":"+/ th aw 4"},{"name":"wR","fmla":"+- wd2 0 q1"},{"name":"q7","fmla":"*/ wR 2 1"},{"name":"q8","fmla":"*/ q7 q7 1"},{"name":"q9","fmla":"*/ th th 1"},{"name":"q10","fmla":"+- q8 0 q9"},{"name":"q11","fmla":"sqrt q10"},{"name":"idy","fmla":"*/ q11 h q7"},{"name":"maxAdj3","fmla":"*/ 100000 idy ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"ah","fmla":"*/ ss adj3 100000"},{"name":"x3","fmla":"+- wR th 0"},{"name":"q2","fmla":"*/ h h 1"},{"name":"q3","fmla":"*/ ah ah 1"},{"name":"q4","fmla":"+- q2 0 q3"},{"name":"q5","fmla":"sqrt q4"},{"name":"dx","fmla":"*/ q5 wR h"},{"name":"x5","fmla":"+- wR dx 0"},{"name":"x7","fmla":"+- x3 dx 0"},{"name":"q6","fmla":"+- aw 0 th"},{"name":"dh","fmla":"*/ q6 1 2"},{"name":"x4","fmla":"+- x5 0 dh"},{"name":"x8","fmla":"+- x7 dh 0"},{"name":"aw2","fmla":"*/ aw 1 2"},{"name":"x6","fmla":"+- r 0 aw2"},{"name":"y1","fmla":"+- b 0 ah"},{"name":"swAng","fmla":"at2 ah dx"},{"name":"mswAng","fmla":"+- 0 0 swAng"},{"name":"iy","fmla":"+- b 0 idy"},{"name":"ix","fmla":"+/ wR x3 2"},{"name":"q12","fmla":"*/ th 1 2"},{"name":"dang2","fmla":"at2 idy q12"},{"name":"stAng","fmla":"+- 3cd4 swAng 0"},{"name":"stAng2","fmla":"+- 3cd4 0 dang2"},{"name":"swAng2","fmla":"+- dang2 0 cd4"},{"name":"swAng3","fmla":"+- cd4 dang2 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"x6","y":"b"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng","swAng":"mswAng"},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"wR","hR":"h","stAng":"3cd4","swAng":"swAng"},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"ix","y":"iy"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng2","swAng":"swAng2"},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd2","swAng":"swAng3"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"ix","y":"iy"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng2","swAng":"swAng2"},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"wR","hR":"h","stAng":"3cd4","swAng":"swAng"},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"x6","y":"b"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng","swAng":"mswAng"}]}]},"curvedLeftArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"a1","fmla":"pin 0 adj1 a2"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw","fmla":"*/ ss a2 100000"},{"name":"q1","fmla":"+/ th aw 4"},{"name":"hR","fmla":"+- hd2 0 q1"},{"name":"q7","fmla":"*/ hR 2 1"},{"name":"q8","fmla":"*/ q7 q7 1"},{"name":"q9","fmla":"*/ th th 1"},{"name":"q10","fmla":"+- q8 0 q9"},{"name":"q11","fmla":"sqrt q10"},{"name":"idx","fmla":"*/ q11 w q7"},{"name":"maxAdj3","fmla":"*/ 100000 idx ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"ah","fmla":"*/ ss a3 100000"},{"name":"y3","fmla":"+- hR th 0"},{"name":"q2","fmla":"*/ w w 1"},{"name":"q3","fmla":"*/ ah ah 1"},{"name":"q4","fmla":"+- q2 0 q3"},{"name":"q5","fmla":"sqrt q4"},{"name":"dy","fmla":"*/ q5 hR w"},{"name":"y5","fmla":"+- hR dy 0"},{"name":"y7","fmla":"+- y3 dy 0"},{"name":"q6","fmla":"+- aw 0 th"},{"name":"dh","fmla":"*/ q6 1 2"},{"name":"y4","fmla":"+- y5 0 dh"},{"name":"y8","fmla":"+- y7 dh 0"},{"name":"aw2","fmla":"*/ aw 1 2"},{"name":"y6","fmla":"+- b 0 aw2"},{"name":"x1","fmla":"+- l ah 0"},{"name":"swAng","fmla":"at2 ah dy"},{"name":"mswAng","fmla":"+- 0 0 swAng"},{"name":"ix","fmla":"+- l idx 0"},{"name":"iy","fmla":"+/ hR y3 2"},{"name":"q12","fmla":"*/ th 1 2"},{"name":"dang2","fmla":"at2 idx q12"},{"name":"swAng2","fmla":"+- dang2 0 swAng"},{"name":"swAng3","fmla":"+- swAng dang2 0"},{"name":"stAng3","fmla":"+- 0 0 dang2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"y6"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"A","wR":"w","hR":"hR","stAng":"swAng","swAng":"swAng2"},{"c":"A","wR":"w","hR":"hR","stAng":"stAng3","swAng":"swAng3"},{"c":"L","pts":[{"x":"x1","y":"y8"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"y3"}]},{"c":"A","wR":"w","hR":"hR","stAng":"0","swAng":"-5400000"},{"c":"L","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"w","hR":"hR","stAng":"3cd4","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"r","y":"y3"}]},{"c":"A","wR":"w","hR":"hR","stAng":"0","swAng":"-5400000"},{"c":"L","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"w","hR":"hR","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"A","wR":"w","hR":"hR","stAng":"0","swAng":"swAng"},{"c":"L","pts":[{"x":"x1","y":"y8"}]},{"c":"L","pts":[{"x":"l","y":"y6"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"A","wR":"w","hR":"hR","stAng":"swAng","swAng":"swAng2"}]}]},"curvedRightArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"a1","fmla":"pin 0 adj1 a2"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw","fmla":"*/ ss a2 100000"},{"name":"q1","fmla":"+/ th aw 4"},{"name":"hR","fmla":"+- hd2 0 q1"},{"name":"q7","fmla":"*/ hR 2 1"},{"name":"q8","fmla":"*/ q7 q7 1"},{"name":"q9","fmla":"*/ th th 1"},{"name":"q10","fmla":"+- q8 0 q9"},{"name":"q11","fmla":"sqrt q10"},{"name":"idx","fmla":"*/ q11 w q7"},{"name":"maxAdj3","fmla":"*/ 100000 idx ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"ah","fmla":"*/ ss a3 100000"},{"name":"y3","fmla":"+- hR th 0"},{"name":"q2","fmla":"*/ w w 1"},{"name":"q3","fmla":"*/ ah ah 1"},{"name":"q4","fmla":"+- q2 0 q3"},{"name":"q5","fmla":"sqrt q4"},{"name":"dy","fmla":"*/ q5 hR w"},{"name":"y5","fmla":"+- hR dy 0"},{"name":"y7","fmla":"+- y3 dy 0"},{"name":"q6","fmla":"+- aw 0 th"},{"name":"dh","fmla":"*/ q6 1 2"},{"name":"y4","fmla":"+- y5 0 dh"},{"name":"y8","fmla":"+- y7 dh 0"},{"name":"aw2","fmla":"*/ aw 1 2"},{"name":"y6","fmla":"+- b 0 aw2"},{"name":"x1","fmla":"+- r 0 ah"},{"name":"swAng","fmla":"at2 ah dy"},{"name":"stAng","fmla":"+- cd2 0 swAng"},{"name":"mswAng","fmla":"+- 0 0 swAng"},{"name":"ix","fmla":"+- r 0 idx"},{"name":"iy","fmla":"+/ hR y3 2"},{"name":"q12","fmla":"*/ th 1 2"},{"name":"dang2","fmla":"at2 idx q12"},{"name":"swAng2","fmla":"+- dang2 0 cd4"},{"name":"swAng3","fmla":"+- cd4 dang2 0"},{"name":"stAng3","fmla":"+- cd2 0 dang2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"hR"}]},{"c":"A","wR":"w","hR":"hR","stAng":"cd2","swAng":"mswAng"},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"r","y":"y6"}]},{"c":"L","pts":[{"x":"x1","y":"y8"}]},{"c":"L","pts":[{"x":"x1","y":"y7"}]},{"c":"A","wR":"w","hR":"hR","stAng":"stAng","swAng":"swAng"},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"th"}]},{"c":"A","wR":"w","hR":"hR","stAng":"3cd4","swAng":"swAng2"},{"c":"A","wR":"w","hR":"hR","stAng":"stAng3","swAng":"swAng3"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"hR"}]},{"c":"A","wR":"w","hR":"hR","stAng":"cd2","swAng":"mswAng"},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"r","y":"y6"}]},{"c":"L","pts":[{"x":"x1","y":"y8"}]},{"c":"L","pts":[{"x":"x1","y":"y7"}]},{"c":"A","wR":"w","hR":"hR","stAng":"stAng","swAng":"swAng"},{"c":"L","pts":[{"x":"l","y":"hR"}]},{"c":"A","wR":"w","hR":"hR","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"th"}]},{"c":"A","wR":"w","hR":"hR","stAng":"3cd4","swAng":"swAng2"}]}]},"curvedUpArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw","fmla":"*/ ss a2 100000"},{"name":"q1","fmla":"+/ th aw 4"},{"name":"wR","fmla":"+- wd2 0 q1"},{"name":"q7","fmla":"*/ wR 2 1"},{"name":"q8","fmla":"*/ q7 q7 1"},{"name":"q9","fmla":"*/ th th 1"},{"name":"q10","fmla":"+- q8 0 q9"},{"name":"q11","fmla":"sqrt q10"},{"name":"idy","fmla":"*/ q11 h q7"},{"name":"maxAdj3","fmla":"*/ 100000 idy ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"ah","fmla":"*/ ss adj3 100000"},{"name":"x3","fmla":"+- wR th 0"},{"name":"q2","fmla":"*/ h h 1"},{"name":"q3","fmla":"*/ ah ah 1"},{"name":"q4","fmla":"+- q2 0 q3"},{"name":"q5","fmla":"sqrt q4"},{"name":"dx","fmla":"*/ q5 wR h"},{"name":"x5","fmla":"+- wR dx 0"},{"name":"x7","fmla":"+- x3 dx 0"},{"name":"q6","fmla":"+- aw 0 th"},{"name":"dh","fmla":"*/ q6 1 2"},{"name":"x4","fmla":"+- x5 0 dh"},{"name":"x8","fmla":"+- x7 dh 0"},{"name":"aw2","fmla":"*/ aw 1 2"},{"name":"x6","fmla":"+- r 0 aw2"},{"name":"y1","fmla":"+- t ah 0"},{"name":"swAng","fmla":"at2 ah dx"},{"name":"mswAng","fmla":"+- 0 0 swAng"},{"name":"iy","fmla":"+- t idy 0"},{"name":"ix","fmla":"+/ wR x3 2"},{"name":"q12","fmla":"*/ th 1 2"},{"name":"dang2","fmla":"at2 idy q12"},{"name":"swAng2","fmla":"+- dang2 0 swAng"},{"name":"mswAng2","fmla":"+- 0 0 swAng2"},{"name":"stAng3","fmla":"+- cd4 0 swAng"},{"name":"swAng3","fmla":"+- swAng dang2 0"},{"name":"stAng2","fmla":"+- cd4 0 dang2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"x6","y":"t"}]},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng3","swAng":"swAng3"},{"c":"A","wR":"wR","hR":"h","stAng":"stAng2","swAng":"swAng2"},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"wR","y":"b"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"th","y":"t"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd2","swAng":"-5400000"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"ix","y":"iy"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng2","swAng":"swAng2"},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x6","y":"t"}]},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng3","swAng":"swAng"},{"c":"L","pts":[{"x":"wR","y":"b"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"th","y":"t"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd2","swAng":"-5400000"}]}]},"decagon":{"av":[{"name":"vf","fmla":"val 105146"}],"gd":[{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"dx1","fmla":"cos wd2 2160000"},{"name":"dx2","fmla":"cos wd2 4320000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"dy1","fmla":"sin shd2 4320000"},{"name":"dy2","fmla":"sin shd2 2160000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y4","fmla":"+- vc dy1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"Z"}]}]},"diagStripe":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 100000"},{"name":"x2","fmla":"*/ w a 100000"},{"name":"x1","fmla":"*/ x2 1 2"},{"name":"x3","fmla":"+/ x2 r 2"},{"name":"y2","fmla":"*/ h a 100000"},{"name":"y1","fmla":"*/ y2 1 2"},{"name":"y3","fmla":"+/ y2 b 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"diamond":{"gd":[{"name":"ir","fmla":"*/ w 3 4"},{"name":"ib","fmla":"*/ h 3 4"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"Z"}]}]},"dodecagon":{"gd":[{"name":"x1","fmla":"*/ w 2894 21600"},{"name":"x2","fmla":"*/ w 7906 21600"},{"name":"x3","fmla":"*/ w 13694 21600"},{"name":"x4","fmla":"*/ w 18706 21600"},{"name":"y1","fmla":"*/ h 2894 21600"},{"name":"y2","fmla":"*/ h 7906 21600"},{"name":"y3","fmla":"*/ h 13694 21600"},{"name":"y4","fmla":"*/ h 18706 21600"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"l","y":"y3"}]},{"c":"Z"}]}]},"donut":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dr","fmla":"*/ ss a 100000"},{"name":"iwd2","fmla":"+- wd2 0 dr"},{"name":"ihd2","fmla":"+- hd2 0 dr"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"},{"c":"M","pts":[{"x":"dr","y":"vc"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"cd2","swAng":"-5400000"},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"0","swAng":"-5400000"},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"3cd4","swAng":"-5400000"},{"c":"Z"}]}]},"doubleWave":{"av":[{"name":"adj1","fmla":"val 6250"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 12500"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"dx1","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs dx1"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx8","fmla":"?: of2 of2 0"},{"name":"x8","fmla":"+- r 0 dx8"},{"name":"dx3","fmla":"+/ dx2 x8 6"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"dx4","fmla":"+/ dx2 x8 3"},{"name":"x4","fmla":"+- x2 dx4 0"},{"name":"x5","fmla":"+/ x2 x8 2"},{"name":"x6","fmla":"+- x5 dx3 0"},{"name":"x7","fmla":"+/ x6 x8 2"},{"name":"x9","fmla":"+- l dx8 0"},{"name":"x15","fmla":"+- r dx2 0"},{"name":"x10","fmla":"+- x9 dx3 0"},{"name":"x11","fmla":"+- x9 dx4 0"},{"name":"x12","fmla":"+/ x9 x15 2"},{"name":"x13","fmla":"+- x12 dx3 0"},{"name":"x14","fmla":"+/ x13 x15 2"},{"name":"x16","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc dx1 0"},{"name":"il","fmla":"max x2 x9"},{"name":"ir","fmla":"min x8 x15"},{"name":"it","fmla":"*/ h a1 50000"},{"name":"ib","fmla":"+- b 0 it"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y2"},{"x":"x4","y":"y3"},{"x":"x5","y":"y1"}]},{"c":"C","pts":[{"x":"x6","y":"y2"},{"x":"x7","y":"y3"},{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"x15","y":"y4"}]},{"c":"C","pts":[{"x":"x14","y":"y6"},{"x":"x13","y":"y5"},{"x":"x12","y":"y4"}]},{"c":"C","pts":[{"x":"x11","y":"y6"},{"x":"x10","y":"y5"},{"x":"x9","y":"y4"}]},{"c":"Z"}]}]},"downArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 h ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dy1","fmla":"*/ ss a2 100000"},{"name":"y1","fmla":"+- b 0 dy1"},{"name":"dx1","fmla":"*/ w a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"dy2","fmla":"*/ x1 dy1 wd2"},{"name":"y2","fmla":"+- y1 dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"Z"}]}]},"downArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 64977"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 100000 h ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss h"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dx1","fmla":"*/ ss a2 100000"},{"name":"dx2","fmla":"*/ ss a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"dy3","fmla":"*/ ss a3 100000"},{"name":"y3","fmla":"+- b 0 dy3"},{"name":"y2","fmla":"*/ h a4 100000"},{"name":"y1","fmla":"*/ y2 1 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"Z"}]}]},"ellipse":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"ellipseRibbon":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 12500"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 25000 adj2 75000"},{"name":"q10","fmla":"+- 100000 0 a1"},{"name":"q11","fmla":"*/ q10 1 2"},{"name":"q12","fmla":"+- a1 0 q11"},{"name":"minAdj3","fmla":"max 0 q12"},{"name":"a3","fmla":"pin minAdj3 adj3 a1"},{"name":"dx2","fmla":"*/ w a2 200000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- x2 wd8 0"},{"name":"x4","fmla":"+- r 0 x3"},{"name":"x5","fmla":"+- r 0 x2"},{"name":"x6","fmla":"+- r 0 wd8"},{"name":"dy1","fmla":"*/ h a3 100000"},{"name":"f1","fmla":"*/ 4 dy1 w"},{"name":"q1","fmla":"*/ x3 x3 w"},{"name":"q2","fmla":"+- x3 0 q1"},{"name":"y1","fmla":"*/ f1 q2 1"},{"name":"cx1","fmla":"*/ x3 1 2"},{"name":"cy1","fmla":"*/ f1 cx1 1"},{"name":"cx2","fmla":"+- r 0 cx1"},{"name":"q1","fmla":"*/ h a1 100000"},{"name":"dy3","fmla":"+- q1 0 dy1"},{"name":"q3","fmla":"*/ x2 x2 w"},{"name":"q4","fmla":"+- x2 0 q3"},{"name":"q5","fmla":"*/ f1 q4 1"},{"name":"y3","fmla":"+- q5 dy3 0"},{"name":"q6","fmla":"+- dy1 dy3 y3"},{"name":"q7","fmla":"+- q6 dy1 0"},{"name":"cy3","fmla":"+- q7 dy3 0"},{"name":"rh","fmla":"+- b 0 q1"},{"name":"q8","fmla":"*/ dy1 14 16"},{"name":"y2","fmla":"+/ q8 rh 2"},{"name":"y5","fmla":"+- q5 rh 0"},{"name":"y6","fmla":"+- y3 rh 0"},{"name":"cx4","fmla":"*/ x2 1 2"},{"name":"q9","fmla":"*/ f1 cx4 1"},{"name":"cy4","fmla":"+- q9 rh 0"},{"name":"cx5","fmla":"+- r 0 cx4"},{"name":"cy6","fmla":"+- cy3 rh 0"},{"name":"y7","fmla":"+- y1 dy3 0"},{"name":"cy7","fmla":"+- q1 q1 y7"},{"name":"y8","fmla":"+- b 0 dy1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"Q","pts":[{"x":"cx1","y":"cy1"},{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"Q","pts":[{"x":"cx2","y":"cy1"},{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"rh"}]},{"c":"Q","pts":[{"x":"cx5","y":"cy4"},{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"x5","y":"y6"}]},{"c":"Q","pts":[{"x":"hc","y":"cy6"},{"x":"x2","y":"y6"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"Q","pts":[{"x":"cx4","y":"cy4"},{"x":"l","y":"rh"}]},{"c":"L","pts":[{"x":"wd8","y":"y2"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x3","y":"y7"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y7"}]},{"c":"Q","pts":[{"x":"hc","y":"cy7"},{"x":"x3","y":"y7"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"Q","pts":[{"x":"cx1","y":"cy1"},{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"Q","pts":[{"x":"cx2","y":"cy1"},{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"rh"}]},{"c":"Q","pts":[{"x":"cx5","y":"cy4"},{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"x5","y":"y6"}]},{"c":"Q","pts":[{"x":"hc","y":"cy6"},{"x":"x2","y":"y6"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"Q","pts":[{"x":"cx4","y":"cy4"},{"x":"l","y":"rh"}]},{"c":"L","pts":[{"x":"wd8","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x2","y":"y5"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"M","pts":[{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x5","y":"y5"}]},{"c":"M","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y7"}]},{"c":"M","pts":[{"x":"x4","y":"y7"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]}]}]},"ellipseRibbon2":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 12500"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 25000 adj2 75000"},{"name":"q10","fmla":"+- 100000 0 a1"},{"name":"q11","fmla":"*/ q10 1 2"},{"name":"q12","fmla":"+- a1 0 q11"},{"name":"minAdj3","fmla":"max 0 q12"},{"name":"a3","fmla":"pin minAdj3 adj3 a1"},{"name":"dx2","fmla":"*/ w a2 200000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- x2 wd8 0"},{"name":"x4","fmla":"+- r 0 x3"},{"name":"x5","fmla":"+- r 0 x2"},{"name":"x6","fmla":"+- r 0 wd8"},{"name":"dy1","fmla":"*/ h a3 100000"},{"name":"f1","fmla":"*/ 4 dy1 w"},{"name":"q1","fmla":"*/ x3 x3 w"},{"name":"q2","fmla":"+- x3 0 q1"},{"name":"u1","fmla":"*/ f1 q2 1"},{"name":"y1","fmla":"+- b 0 u1"},{"name":"cx1","fmla":"*/ x3 1 2"},{"name":"cu1","fmla":"*/ f1 cx1 1"},{"name":"cy1","fmla":"+- b 0 cu1"},{"name":"cx2","fmla":"+- r 0 cx1"},{"name":"q1","fmla":"*/ h a1 100000"},{"name":"dy3","fmla":"+- q1 0 dy1"},{"name":"q3","fmla":"*/ x2 x2 w"},{"name":"q4","fmla":"+- x2 0 q3"},{"name":"q5","fmla":"*/ f1 q4 1"},{"name":"u3","fmla":"+- q5 dy3 0"},{"name":"y3","fmla":"+- b 0 u3"},{"name":"q6","fmla":"+- dy1 dy3 u3"},{"name":"q7","fmla":"+- q6 dy1 0"},{"name":"cu3","fmla":"+- q7 dy3 0"},{"name":"cy3","fmla":"+- b 0 cu3"},{"name":"rh","fmla":"+- b 0 q1"},{"name":"q8","fmla":"*/ dy1 14 16"},{"name":"u2","fmla":"+/ q8 rh 2"},{"name":"y2","fmla":"+- b 0 u2"},{"name":"u5","fmla":"+- q5 rh 0"},{"name":"y5","fmla":"+- b 0 u5"},{"name":"u6","fmla":"+- u3 rh 0"},{"name":"y6","fmla":"+- b 0 u6"},{"name":"cx4","fmla":"*/ x2 1 2"},{"name":"q9","fmla":"*/ f1 cx4 1"},{"name":"cu4","fmla":"+- q9 rh 0"},{"name":"cy4","fmla":"+- b 0 cu4"},{"name":"cx5","fmla":"+- r 0 cx4"},{"name":"cu6","fmla":"+- cu3 rh 0"},{"name":"cy6","fmla":"+- b 0 cu6"},{"name":"u7","fmla":"+- u1 dy3 0"},{"name":"y7","fmla":"+- b 0 u7"},{"name":"cu7","fmla":"+- q1 q1 u7"},{"name":"cy7","fmla":"+- b 0 cu7"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"Q","pts":[{"x":"cx1","y":"cy1"},{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"Q","pts":[{"x":"cx2","y":"cy1"},{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"q1"}]},{"c":"Q","pts":[{"x":"cx5","y":"cy4"},{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"x5","y":"y6"}]},{"c":"Q","pts":[{"x":"hc","y":"cy6"},{"x":"x2","y":"y6"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"Q","pts":[{"x":"cx4","y":"cy4"},{"x":"l","y":"q1"}]},{"c":"L","pts":[{"x":"wd8","y":"y2"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x3","y":"y7"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y7"}]},{"c":"Q","pts":[{"x":"hc","y":"cy7"},{"x":"x3","y":"y7"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"wd8","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"q1"}]},{"c":"Q","pts":[{"x":"cx4","y":"cy4"},{"x":"x2","y":"y5"}]},{"c":"L","pts":[{"x":"x2","y":"y6"}]},{"c":"Q","pts":[{"x":"hc","y":"cy6"},{"x":"x5","y":"y6"}]},{"c":"L","pts":[{"x":"x5","y":"y5"}]},{"c":"Q","pts":[{"x":"cx5","y":"cy4"},{"x":"r","y":"q1"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Q","pts":[{"x":"cx2","y":"cy1"},{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x5","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"Q","pts":[{"x":"cx1","y":"cy1"},{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"M","pts":[{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"x5","y":"y3"}]},{"c":"M","pts":[{"x":"x3","y":"y7"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"M","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y7"}]}]}]},"flowChartAlternateProcess":{"gd":[{"name":"x2","fmla":"+- r 0 ssd6"},{"name":"y2","fmla":"+- b 0 ssd6"},{"name":"il","fmla":"*/ ssd6 29289 100000"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"ssd6"}]},{"c":"A","wR":"ssd6","hR":"ssd6","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"ssd6","hR":"ssd6","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"ssd6","hR":"ssd6","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"ssd6","y":"b"}]},{"c":"A","wR":"ssd6","hR":"ssd6","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"flowChartCollate":{"gd":[{"name":"ir","fmla":"*/ w 3 4"},{"name":"ib","fmla":"*/ h 3 4"}],"paths":[{"w":2,"h":2,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"2","y":"2"}]},{"c":"L","pts":[{"x":"0","y":"2"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"Z"}]}]},"flowChartConnector":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"flowChartDecision":{"gd":[{"name":"ir","fmla":"*/ w 3 4"},{"name":"ib","fmla":"*/ h 3 4"}],"paths":[{"w":2,"h":2,"cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]}]},"flowChartDelay":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"flowChartDisplay":{"gd":[{"name":"x2","fmla":"*/ w 5 6"}],"paths":[{"w":6,"h":6,"cmds":[{"c":"M","pts":[{"x":"0","y":"3"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"A","wR":"1","hR":"3","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"1","y":"6"}]},{"c":"Z"}]}]},"flowChartDocument":{"gd":[{"name":"y1","fmla":"*/ h 17322 21600"},{"name":"y2","fmla":"*/ h 20172 21600"}],"paths":[{"w":21600,"h":21600,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"17322"}]},{"c":"C","pts":[{"x":"10800","y":"17322"},{"x":"10800","y":"23922"},{"x":"0","y":"20172"}]},{"c":"Z"}]}]},"flowChartExtract":{"gd":[{"name":"x2","fmla":"*/ w 3 4"}],"paths":[{"w":2,"h":2,"cmds":[{"c":"M","pts":[{"x":"0","y":"2"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"2"}]},{"c":"Z"}]}]},"flowChartInputOutput":{"gd":[{"name":"x3","fmla":"*/ w 2 5"},{"name":"x4","fmla":"*/ w 3 5"},{"name":"x5","fmla":"*/ w 4 5"},{"name":"x6","fmla":"*/ w 9 10"}],"paths":[{"w":5,"h":5,"cmds":[{"c":"M","pts":[{"x":"0","y":"5"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"4","y":"5"}]},{"c":"Z"}]}]},"flowChartInternalStorage":{"paths":[{"w":1,"h":1,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"0","y":"1"}]},{"c":"Z"}]},{"w":8,"h":8,"fill":"none","cmds":[{"c":"M","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"8"}]},{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"8","y":"1"}]}]},{"w":1,"h":1,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"0","y":"1"}]},{"c":"Z"}]}]},"flowChartMagneticDisk":{"gd":[{"name":"y3","fmla":"*/ h 5 6"}],"paths":[{"w":6,"h":6,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"A","wR":"3","hR":"1","stAng":"cd2","swAng":"cd2"},{"c":"L","pts":[{"x":"6","y":"5"}]},{"c":"A","wR":"3","hR":"1","stAng":"0","swAng":"cd2"},{"c":"Z"}]},{"w":6,"h":6,"fill":"none","cmds":[{"c":"M","pts":[{"x":"6","y":"1"}]},{"c":"A","wR":"3","hR":"1","stAng":"0","swAng":"cd2"}]},{"w":6,"h":6,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"A","wR":"3","hR":"1","stAng":"cd2","swAng":"cd2"},{"c":"L","pts":[{"x":"6","y":"5"}]},{"c":"A","wR":"3","hR":"1","stAng":"0","swAng":"cd2"},{"c":"Z"}]}]},"flowChartMagneticDrum":{"gd":[{"name":"x2","fmla":"*/ w 2 3"}],"paths":[{"w":6,"h":6,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"A","wR":"1","hR":"3","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"1","y":"6"}]},{"c":"A","wR":"1","hR":"3","stAng":"cd4","swAng":"cd2"},{"c":"Z"}]},{"w":6,"h":6,"fill":"none","cmds":[{"c":"M","pts":[{"x":"5","y":"6"}]},{"c":"A","wR":"1","hR":"3","stAng":"cd4","swAng":"cd2"}]},{"w":6,"h":6,"fill":"none","cmds":[{"c":"M","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"A","wR":"1","hR":"3","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"1","y":"6"}]},{"c":"A","wR":"1","hR":"3","stAng":"cd4","swAng":"cd2"},{"c":"Z"}]}]},"flowChartMagneticTape":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"},{"name":"ang1","fmla":"at2 w h"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"hc","y":"b"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"ang1"},{"c":"L","pts":[{"x":"r","y":"ib"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"flowChartManualInput":{"paths":[{"w":5,"h":5,"cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"5"}]},{"c":"L","pts":[{"x":"0","y":"5"}]},{"c":"Z"}]}]},"flowChartManualOperation":{"gd":[{"name":"x3","fmla":"*/ w 4 5"},{"name":"x4","fmla":"*/ w 9 10"}],"paths":[{"w":5,"h":5,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"4","y":"5"}]},{"c":"L","pts":[{"x":"1","y":"5"}]},{"c":"Z"}]}]},"flowChartMerge":{"gd":[{"name":"x2","fmla":"*/ w 3 4"}],"paths":[{"w":2,"h":2,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]}]},"flowChartMultidocument":{"gd":[{"name":"y2","fmla":"*/ h 3675 21600"},{"name":"y8","fmla":"*/ h 20782 21600"},{"name":"x3","fmla":"*/ w 9298 21600"},{"name":"x4","fmla":"*/ w 12286 21600"},{"name":"x5","fmla":"*/ w 18595 21600"}],"paths":[{"w":21600,"h":21600,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"20782"}]},{"c":"C","pts":[{"x":"9298","y":"23542"},{"x":"9298","y":"18022"},{"x":"18595","y":"18022"}]},{"c":"L","pts":[{"x":"18595","y":"3675"}]},{"c":"L","pts":[{"x":"0","y":"3675"}]},{"c":"Z"},{"c":"M","pts":[{"x":"1532","y":"3675"}]},{"c":"L","pts":[{"x":"1532","y":"1815"}]},{"c":"L","pts":[{"x":"20000","y":"1815"}]},{"c":"L","pts":[{"x":"20000","y":"16252"}]},{"c":"C","pts":[{"x":"19298","y":"16252"},{"x":"18595","y":"16352"},{"x":"18595","y":"16352"}]},{"c":"L","pts":[{"x":"18595","y":"3675"}]},{"c":"Z"},{"c":"M","pts":[{"x":"2972","y":"1815"}]},{"c":"L","pts":[{"x":"2972","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"14392"}]},{"c":"C","pts":[{"x":"20800","y":"14392"},{"x":"20000","y":"14467"},{"x":"20000","y":"14467"}]},{"c":"L","pts":[{"x":"20000","y":"1815"}]},{"c":"Z"}]},{"w":21600,"h":21600,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"3675"}]},{"c":"L","pts":[{"x":"18595","y":"3675"}]},{"c":"L","pts":[{"x":"18595","y":"18022"}]},{"c":"C","pts":[{"x":"9298","y":"18022"},{"x":"9298","y":"23542"},{"x":"0","y":"20782"}]},{"c":"Z"},{"c":"M","pts":[{"x":"1532","y":"3675"}]},{"c":"L","pts":[{"x":"1532","y":"1815"}]},{"c":"L","pts":[{"x":"20000","y":"1815"}]},{"c":"L","pts":[{"x":"20000","y":"16252"}]},{"c":"C","pts":[{"x":"19298","y":"16252"},{"x":"18595","y":"16352"},{"x":"18595","y":"16352"}]},{"c":"M","pts":[{"x":"2972","y":"1815"}]},{"c":"L","pts":[{"x":"2972","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"14392"}]},{"c":"C","pts":[{"x":"20800","y":"14392"},{"x":"20000","y":"14467"},{"x":"20000","y":"14467"}]}]},{"w":21600,"h":21600,"fill":"none","stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"20782"}]},{"c":"C","pts":[{"x":"9298","y":"23542"},{"x":"9298","y":"18022"},{"x":"18595","y":"18022"}]},{"c":"L","pts":[{"x":"18595","y":"16352"}]},{"c":"C","pts":[{"x":"18595","y":"16352"},{"x":"19298","y":"16252"},{"x":"20000","y":"16252"}]},{"c":"L","pts":[{"x":"20000","y":"14467"}]},{"c":"C","pts":[{"x":"20000","y":"14467"},{"x":"20800","y":"14392"},{"x":"21600","y":"14392"}]},{"c":"L","pts":[{"x":"21600","y":"0"}]},{"c":"L","pts":[{"x":"2972","y":"0"}]},{"c":"L","pts":[{"x":"2972","y":"1815"}]},{"c":"L","pts":[{"x":"1532","y":"1815"}]},{"c":"L","pts":[{"x":"1532","y":"3675"}]},{"c":"L","pts":[{"x":"0","y":"3675"}]},{"c":"Z"}]}]},"flowChartOfflineStorage":{"gd":[{"name":"x4","fmla":"*/ w 3 4"}],"paths":[{"w":2,"h":2,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]},{"w":5,"h":5,"fill":"none","cmds":[{"c":"M","pts":[{"x":"2","y":"4"}]},{"c":"L","pts":[{"x":"3","y":"4"}]}]},{"w":2,"h":2,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]}]},"flowChartOffpageConnector":{"gd":[{"name":"y1","fmla":"*/ h 4 5"}],"paths":[{"w":10,"h":10,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"10","y":"0"}]},{"c":"L","pts":[{"x":"10","y":"8"}]},{"c":"L","pts":[{"x":"5","y":"10"}]},{"c":"L","pts":[{"x":"0","y":"8"}]},{"c":"Z"}]}]},"flowChartOnlineStorage":{"gd":[{"name":"x2","fmla":"*/ w 5 6"}],"paths":[{"w":6,"h":6,"cmds":[{"c":"M","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"6","y":"0"}]},{"c":"A","wR":"1","hR":"3","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"1","y":"6"}]},{"c":"A","wR":"1","hR":"3","stAng":"cd4","swAng":"cd2"},{"c":"Z"}]}]},"flowChartOr":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"flowChartPredefinedProcess":{"gd":[{"name":"x2","fmla":"*/ w 7 8"}],"paths":[{"w":1,"h":1,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"0","y":"1"}]},{"c":"Z"}]},{"w":8,"h":8,"fill":"none","cmds":[{"c":"M","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"8"}]},{"c":"M","pts":[{"x":"7","y":"0"}]},{"c":"L","pts":[{"x":"7","y":"8"}]}]},{"w":1,"h":1,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"0","y":"1"}]},{"c":"Z"}]}]},"flowChartPreparation":{"gd":[{"name":"x2","fmla":"*/ w 4 5"}],"paths":[{"w":10,"h":10,"cmds":[{"c":"M","pts":[{"x":"0","y":"5"}]},{"c":"L","pts":[{"x":"2","y":"0"}]},{"c":"L","pts":[{"x":"8","y":"0"}]},{"c":"L","pts":[{"x":"10","y":"5"}]},{"c":"L","pts":[{"x":"8","y":"10"}]},{"c":"L","pts":[{"x":"2","y":"10"}]},{"c":"Z"}]}]},"flowChartProcess":{"paths":[{"w":1,"h":1,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"0","y":"1"}]},{"c":"Z"}]}]},"flowChartPunchedCard":{"paths":[{"w":5,"h":5,"cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"5"}]},{"c":"L","pts":[{"x":"0","y":"5"}]},{"c":"Z"}]}]},"flowChartPunchedTape":{"gd":[{"name":"y2","fmla":"*/ h 9 10"},{"name":"ib","fmla":"*/ h 4 5"}],"paths":[{"w":20,"h":20,"cmds":[{"c":"M","pts":[{"x":"0","y":"2"}]},{"c":"A","wR":"5","hR":"2","stAng":"cd2","swAng":"-10800000"},{"c":"A","wR":"5","hR":"2","stAng":"cd2","swAng":"cd2"},{"c":"L","pts":[{"x":"20","y":"18"}]},{"c":"A","wR":"5","hR":"2","stAng":"0","swAng":"-10800000"},{"c":"A","wR":"5","hR":"2","stAng":"0","swAng":"cd2"},{"c":"Z"}]}]},"flowChartSort":{"gd":[{"name":"ir","fmla":"*/ w 3 4"},{"name":"ib","fmla":"*/ h 3 4"}],"paths":[{"w":2,"h":2,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]},{"w":2,"h":2,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"2","y":"1"}]}]},{"w":2,"h":2,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]}]},"flowChartSummingJunction":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"il","y":"it"}]},{"c":"L","pts":[{"x":"ir","y":"ib"}]},{"c":"M","pts":[{"x":"ir","y":"it"}]},{"c":"L","pts":[{"x":"il","y":"ib"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"flowChartTerminator":{"gd":[{"name":"il","fmla":"*/ w 1018 21600"},{"name":"ir","fmla":"*/ w 20582 21600"},{"name":"it","fmla":"*/ h 3163 21600"},{"name":"ib","fmla":"*/ h 18437 21600"}],"paths":[{"w":21600,"h":21600,"cmds":[{"c":"M","pts":[{"x":"3475","y":"0"}]},{"c":"L","pts":[{"x":"18125","y":"0"}]},{"c":"A","wR":"3475","hR":"10800","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"3475","y":"21600"}]},{"c":"A","wR":"3475","hR":"10800","stAng":"cd4","swAng":"cd2"},{"c":"Z"}]}]},"foldedCorner":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dy2","fmla":"*/ ss a 100000"},{"name":"dy1","fmla":"*/ dy2 1 5"},{"name":"x1","fmla":"+- r 0 dy2"},{"name":"x2","fmla":"+- x1 dy1 0"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"y1","fmla":"+- y2 dy1 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]}]},"frame":{"av":[{"name":"adj1","fmla":"val 12500"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"x1","fmla":"*/ ss a1 100000"},{"name":"x4","fmla":"+- r 0 x1"},{"name":"y4","fmla":"+- b 0 x1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x1","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"x1"}]},{"c":"Z"}]}]},"funnel":{"gd":[{"name":"d","fmla":"*/ ss 1 20"},{"name":"rw2","fmla":"+- wd2 0 d"},{"name":"rh2","fmla":"+- hd4 0 d"},{"name":"t1","fmla":"cos wd2 480000"},{"name":"t2","fmla":"sin hd4 480000"},{"name":"da","fmla":"at2 t1 t2"},{"name":"2da","fmla":"*/ da 2 1"},{"name":"stAng1","fmla":"+- cd2 0 da"},{"name":"swAng1","fmla":"+- cd2 2da 0"},{"name":"swAng3","fmla":"+- cd2 0 2da"},{"name":"rw3","fmla":"*/ wd2 1 4"},{"name":"rh3","fmla":"*/ hd4 1 4"},{"name":"ct1","fmla":"cos hd4 stAng1"},{"name":"st1","fmla":"sin wd2 stAng1"},{"name":"m1","fmla":"mod ct1 st1 0"},{"name":"n1","fmla":"*/ wd2 hd4 m1"},{"name":"dx1","fmla":"cos n1 stAng1"},{"name":"dy1","fmla":"sin n1 stAng1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- hd4 dy1 0"},{"name":"ct3","fmla":"cos rh3 da"},{"name":"st3","fmla":"sin rw3 da"},{"name":"m3","fmla":"mod ct3 st3 0"},{"name":"n3","fmla":"*/ rw3 rh3 m3"},{"name":"dx3","fmla":"cos n3 da"},{"name":"dy3","fmla":"sin n3 da"},{"name":"x3","fmla":"+- hc dx3 0"},{"name":"vc3","fmla":"+- b 0 rh3"},{"name":"y2","fmla":"+- vc3 dy3 0"},{"name":"x2","fmla":"+- wd2 0 rw2"},{"name":"cd","fmla":"*/ cd2 2 1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd4","stAng":"stAng1","swAng":"swAng1"},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"A","wR":"rw3","hR":"rh3","stAng":"da","swAng":"swAng3"},{"c":"Z"},{"c":"M","pts":[{"x":"x2","y":"hd4"}]},{"c":"A","wR":"rw2","hR":"rh2","stAng":"cd2","swAng":"-21600000"},{"c":"Z"}]}]},"gear6":{"av":[{"name":"adj1","fmla":"val 15000"},{"name":"adj2","fmla":"val 3526"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 20000"},{"name":"a2","fmla":"pin 0 adj2 5358"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"lFD","fmla":"*/ ss a2 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"l2","fmla":"*/ lFD 1 2"},{"name":"l3","fmla":"+- th2 l2 0"},{"name":"rh","fmla":"+- hd2 0 th"},{"name":"rw","fmla":"+- wd2 0 th"},{"name":"dr","fmla":"+- rw 0 rh"},{"name":"maxr","fmla":"?: dr rh rw"},{"name":"ha","fmla":"at2 maxr l3"},{"name":"aA1","fmla":"+- 19800000 0 ha"},{"name":"aD1","fmla":"+- 19800000 ha 0"},{"name":"ta11","fmla":"cos rw aA1"},{"name":"ta12","fmla":"sin rh aA1"},{"name":"bA1","fmla":"at2 ta11 ta12"},{"name":"cta1","fmla":"cos rh bA1"},{"name":"sta1","fmla":"sin rw bA1"},{"name":"ma1","fmla":"mod cta1 sta1 0"},{"name":"na1","fmla":"*/ rw rh ma1"},{"name":"dxa1","fmla":"cos na1 bA1"},{"name":"dya1","fmla":"sin na1 bA1"},{"name":"xA1","fmla":"+- hc dxa1 0"},{"name":"yA1","fmla":"+- vc dya1 0"},{"name":"td11","fmla":"cos rw aD1"},{"name":"td12","fmla":"sin rh aD1"},{"name":"bD1","fmla":"at2 td11 td12"},{"name":"ctd1","fmla":"cos rh bD1"},{"name":"std1","fmla":"sin rw bD1"},{"name":"md1","fmla":"mod ctd1 std1 0"},{"name":"nd1","fmla":"*/ rw rh md1"},{"name":"dxd1","fmla":"cos nd1 bD1"},{"name":"dyd1","fmla":"sin nd1 bD1"},{"name":"xD1","fmla":"+- hc dxd1 0"},{"name":"yD1","fmla":"+- vc dyd1 0"},{"name":"xAD1","fmla":"+- xA1 0 xD1"},{"name":"yAD1","fmla":"+- yA1 0 yD1"},{"name":"lAD1","fmla":"mod xAD1 yAD1 0"},{"name":"a1","fmla":"at2 yAD1 xAD1"},{"name":"dxF1","fmla":"sin lFD a1"},{"name":"dyF1","fmla":"cos lFD a1"},{"name":"xF1","fmla":"+- xD1 dxF1 0"},{"name":"yF1","fmla":"+- yD1 dyF1 0"},{"name":"xE1","fmla":"+- xA1 0 dxF1"},{"name":"yE1","fmla":"+- yA1 0 dyF1"},{"name":"yC1t","fmla":"sin th a1"},{"name":"xC1t","fmla":"cos th a1"},{"name":"yC1","fmla":"+- yF1 yC1t 0"},{"name":"xC1","fmla":"+- xF1 0 xC1t"},{"name":"yB1","fmla":"+- yE1 yC1t 0"},{"name":"xB1","fmla":"+- xE1 0 xC1t"},{"name":"aD6","fmla":"+- 3cd4 ha 0"},{"name":"td61","fmla":"cos rw aD6"},{"name":"td62","fmla":"sin rh aD6"},{"name":"bD6","fmla":"at2 td61 td62"},{"name":"ctd6","fmla":"cos rh bD6"},{"name":"std6","fmla":"sin rw bD6"},{"name":"md6","fmla":"mod ctd6 std6 0"},{"name":"nd6","fmla":"*/ rw rh md6"},{"name":"dxd6","fmla":"cos nd6 bD6"},{"name":"dyd6","fmla":"sin nd6 bD6"},{"name":"xD6","fmla":"+- hc dxd6 0"},{"name":"yD6","fmla":"+- vc dyd6 0"},{"name":"xA6","fmla":"+- hc 0 dxd6"},{"name":"xF6","fmla":"+- xD6 0 lFD"},{"name":"xE6","fmla":"+- xA6 lFD 0"},{"name":"yC6","fmla":"+- yD6 0 th"},{"name":"swAng1","fmla":"+- bA1 0 bD6"},{"name":"aA2","fmla":"+- 1800000 0 ha"},{"name":"aD2","fmla":"+- 1800000 ha 0"},{"name":"ta21","fmla":"cos rw aA2"},{"name":"ta22","fmla":"sin rh aA2"},{"name":"bA2","fmla":"at2 ta21 ta22"},{"name":"yA2","fmla":"+- h 0 yD1"},{"name":"td21","fmla":"cos rw aD2"},{"name":"td22","fmla":"sin rh aD2"},{"name":"bD2","fmla":"at2 td21 td22"},{"name":"yD2","fmla":"+- h 0 yA1"},{"name":"yC2","fmla":"+- h 0 yB1"},{"name":"yB2","fmla":"+- h 0 yC1"},{"name":"xB2","fmla":"val xC1"},{"name":"swAng2","fmla":"+- bA2 0 bD1"},{"name":"aD3","fmla":"+- cd4 ha 0"},{"name":"td31","fmla":"cos rw aD3"},{"name":"td32","fmla":"sin rh aD3"},{"name":"bD3","fmla":"at2 td31 td32"},{"name":"yD3","fmla":"+- h 0 yD6"},{"name":"yB3","fmla":"+- h 0 yC6"},{"name":"aD4","fmla":"+- 9000000 ha 0"},{"name":"td41","fmla":"cos rw aD4"},{"name":"td42","fmla":"sin rh aD4"},{"name":"bD4","fmla":"at2 td41 td42"},{"name":"xD4","fmla":"+- w 0 xD1"},{"name":"xC4","fmla":"+- w 0 xC1"},{"name":"xB4","fmla":"+- w 0 xB1"},{"name":"aD5","fmla":"+- 12600000 ha 0"},{"name":"td51","fmla":"cos rw aD5"},{"name":"td52","fmla":"sin rh aD5"},{"name":"bD5","fmla":"at2 td51 td52"},{"name":"xD5","fmla":"+- w 0 xA1"},{"name":"xC5","fmla":"+- w 0 xB1"},{"name":"xB5","fmla":"+- w 0 xC1"},{"name":"xCxn1","fmla":"+/ xB1 xC1 2"},{"name":"yCxn1","fmla":"+/ yB1 yC1 2"},{"name":"yCxn2","fmla":"+- b 0 yCxn1"},{"name":"xCxn4","fmla":"+/ r 0 xCxn1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xA1","y":"yA1"}]},{"c":"L","pts":[{"x":"xB1","y":"yB1"}]},{"c":"L","pts":[{"x":"xC1","y":"yC1"}]},{"c":"L","pts":[{"x":"xD1","y":"yD1"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD1","swAng":"swAng2"},{"c":"L","pts":[{"x":"xC1","y":"yB2"}]},{"c":"L","pts":[{"x":"xB1","y":"yC2"}]},{"c":"L","pts":[{"x":"xA1","y":"yD2"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD2","swAng":"swAng1"},{"c":"L","pts":[{"x":"xF6","y":"yB3"}]},{"c":"L","pts":[{"x":"xE6","y":"yB3"}]},{"c":"L","pts":[{"x":"xA6","y":"yD3"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD3","swAng":"swAng1"},{"c":"L","pts":[{"x":"xB4","y":"yC2"}]},{"c":"L","pts":[{"x":"xC4","y":"yB2"}]},{"c":"L","pts":[{"x":"xD4","y":"yA2"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD4","swAng":"swAng2"},{"c":"L","pts":[{"x":"xB5","y":"yC1"}]},{"c":"L","pts":[{"x":"xC5","y":"yB1"}]},{"c":"L","pts":[{"x":"xD5","y":"yA1"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD5","swAng":"swAng1"},{"c":"L","pts":[{"x":"xE6","y":"yC6"}]},{"c":"L","pts":[{"x":"xF6","y":"yC6"}]},{"c":"L","pts":[{"x":"xD6","y":"yD6"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD6","swAng":"swAng1"},{"c":"Z"}]}]},"gear9":{"av":[{"name":"adj1","fmla":"val 10000"},{"name":"adj2","fmla":"val 1763"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 20000"},{"name":"a2","fmla":"pin 0 adj2 2679"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"lFD","fmla":"*/ ss a2 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"l2","fmla":"*/ lFD 1 2"},{"name":"l3","fmla":"+- th2 l2 0"},{"name":"rh","fmla":"+- hd2 0 th"},{"name":"rw","fmla":"+- wd2 0 th"},{"name":"dr","fmla":"+- rw 0 rh"},{"name":"maxr","fmla":"?: dr rh rw"},{"name":"ha","fmla":"at2 maxr l3"},{"name":"aA1","fmla":"+- 18600000 0 ha"},{"name":"aD1","fmla":"+- 18600000 ha 0"},{"name":"ta11","fmla":"cos rw aA1"},{"name":"ta12","fmla":"sin rh aA1"},{"name":"bA1","fmla":"at2 ta11 ta12"},{"name":"cta1","fmla":"cos rh bA1"},{"name":"sta1","fmla":"sin rw bA1"},{"name":"ma1","fmla":"mod cta1 sta1 0"},{"name":"na1","fmla":"*/ rw rh ma1"},{"name":"dxa1","fmla":"cos na1 bA1"},{"name":"dya1","fmla":"sin na1 bA1"},{"name":"xA1","fmla":"+- hc dxa1 0"},{"name":"yA1","fmla":"+- vc dya1 0"},{"name":"td11","fmla":"cos rw aD1"},{"name":"td12","fmla":"sin rh aD1"},{"name":"bD1","fmla":"at2 td11 td12"},{"name":"ctd1","fmla":"cos rh bD1"},{"name":"std1","fmla":"sin rw bD1"},{"name":"md1","fmla":"mod ctd1 std1 0"},{"name":"nd1","fmla":"*/ rw rh md1"},{"name":"dxd1","fmla":"cos nd1 bD1"},{"name":"dyd1","fmla":"sin nd1 bD1"},{"name":"xD1","fmla":"+- hc dxd1 0"},{"name":"yD1","fmla":"+- vc dyd1 0"},{"name":"xAD1","fmla":"+- xA1 0 xD1"},{"name":"yAD1","fmla":"+- yA1 0 yD1"},{"name":"lAD1","fmla":"mod xAD1 yAD1 0"},{"name":"a1","fmla":"at2 yAD1 xAD1"},{"name":"dxF1","fmla":"sin lFD a1"},{"name":"dyF1","fmla":"cos lFD a1"},{"name":"xF1","fmla":"+- xD1 dxF1 0"},{"name":"yF1","fmla":"+- yD1 dyF1 0"},{"name":"xE1","fmla":"+- xA1 0 dxF1"},{"name":"yE1","fmla":"+- yA1 0 dyF1"},{"name":"yC1t","fmla":"sin th a1"},{"name":"xC1t","fmla":"cos th a1"},{"name":"yC1","fmla":"+- yF1 yC1t 0"},{"name":"xC1","fmla":"+- xF1 0 xC1t"},{"name":"yB1","fmla":"+- yE1 yC1t 0"},{"name":"xB1","fmla":"+- xE1 0 xC1t"},{"name":"aA2","fmla":"+- 21000000 0 ha"},{"name":"aD2","fmla":"+- 21000000 ha 0"},{"name":"ta21","fmla":"cos rw aA2"},{"name":"ta22","fmla":"sin rh aA2"},{"name":"bA2","fmla":"at2 ta21 ta22"},{"name":"cta2","fmla":"cos rh bA2"},{"name":"sta2","fmla":"sin rw bA2"},{"name":"ma2","fmla":"mod cta2 sta2 0"},{"name":"na2","fmla":"*/ rw rh ma2"},{"name":"dxa2","fmla":"cos na2 bA2"},{"name":"dya2","fmla":"sin na2 bA2"},{"name":"xA2","fmla":"+- hc dxa2 0"},{"name":"yA2","fmla":"+- vc dya2 0"},{"name":"td21","fmla":"cos rw aD2"},{"name":"td22","fmla":"sin rh aD2"},{"name":"bD2","fmla":"at2 td21 td22"},{"name":"ctd2","fmla":"cos rh bD2"},{"name":"std2","fmla":"sin rw bD2"},{"name":"md2","fmla":"mod ctd2 std2 0"},{"name":"nd2","fmla":"*/ rw rh md2"},{"name":"dxd2","fmla":"cos nd2 bD2"},{"name":"dyd2","fmla":"sin nd2 bD2"},{"name":"xD2","fmla":"+- hc dxd2 0"},{"name":"yD2","fmla":"+- vc dyd2 0"},{"name":"xAD2","fmla":"+- xA2 0 xD2"},{"name":"yAD2","fmla":"+- yA2 0 yD2"},{"name":"lAD2","fmla":"mod xAD2 yAD2 0"},{"name":"a2","fmla":"at2 yAD2 xAD2"},{"name":"dxF2","fmla":"sin lFD a2"},{"name":"dyF2","fmla":"cos lFD a2"},{"name":"xF2","fmla":"+- xD2 dxF2 0"},{"name":"yF2","fmla":"+- yD2 dyF2 0"},{"name":"xE2","fmla":"+- xA2 0 dxF2"},{"name":"yE2","fmla":"+- yA2 0 dyF2"},{"name":"yC2t","fmla":"sin th a2"},{"name":"xC2t","fmla":"cos th a2"},{"name":"yC2","fmla":"+- yF2 yC2t 0"},{"name":"xC2","fmla":"+- xF2 0 xC2t"},{"name":"yB2","fmla":"+- yE2 yC2t 0"},{"name":"xB2","fmla":"+- xE2 0 xC2t"},{"name":"swAng1","fmla":"+- bA2 0 bD1"},{"name":"aA3","fmla":"+- 1800000 0 ha"},{"name":"aD3","fmla":"+- 1800000 ha 0"},{"name":"ta31","fmla":"cos rw aA3"},{"name":"ta32","fmla":"sin rh aA3"},{"name":"bA3","fmla":"at2 ta31 ta32"},{"name":"cta3","fmla":"cos rh bA3"},{"name":"sta3","fmla":"sin rw bA3"},{"name":"ma3","fmla":"mod cta3 sta3 0"},{"name":"na3","fmla":"*/ rw rh ma3"},{"name":"dxa3","fmla":"cos na3 bA3"},{"name":"dya3","fmla":"sin na3 bA3"},{"name":"xA3","fmla":"+- hc dxa3 0"},{"name":"yA3","fmla":"+- vc dya3 0"},{"name":"td31","fmla":"cos rw aD3"},{"name":"td32","fmla":"sin rh aD3"},{"name":"bD3","fmla":"at2 td31 td32"},{"name":"ctd3","fmla":"cos rh bD3"},{"name":"std3","fmla":"sin rw bD3"},{"name":"md3","fmla":"mod ctd3 std3 0"},{"name":"nd3","fmla":"*/ rw rh md3"},{"name":"dxd3","fmla":"cos nd3 bD3"},{"name":"dyd3","fmla":"sin nd3 bD3"},{"name":"xD3","fmla":"+- hc dxd3 0"},{"name":"yD3","fmla":"+- vc dyd3 0"},{"name":"xAD3","fmla":"+- xA3 0 xD3"},{"name":"yAD3","fmla":"+- yA3 0 yD3"},{"name":"lAD3","fmla":"mod xAD3 yAD3 0"},{"name":"a3","fmla":"at2 yAD3 xAD3"},{"name":"dxF3","fmla":"sin lFD a3"},{"name":"dyF3","fmla":"cos lFD a3"},{"name":"xF3","fmla":"+- xD3 dxF3 0"},{"name":"yF3","fmla":"+- yD3 dyF3 0"},{"name":"xE3","fmla":"+- xA3 0 dxF3"},{"name":"yE3","fmla":"+- yA3 0 dyF3"},{"name":"yC3t","fmla":"sin th a3"},{"name":"xC3t","fmla":"cos th a3"},{"name":"yC3","fmla":"+- yF3 yC3t 0"},{"name":"xC3","fmla":"+- xF3 0 xC3t"},{"name":"yB3","fmla":"+- yE3 yC3t 0"},{"name":"xB3","fmla":"+- xE3 0 xC3t"},{"name":"swAng2","fmla":"+- bA3 0 bD2"},{"name":"aA4","fmla":"+- 4200000 0 ha"},{"name":"aD4","fmla":"+- 4200000 ha 0"},{"name":"ta41","fmla":"cos rw aA4"},{"name":"ta42","fmla":"sin rh aA4"},{"name":"bA4","fmla":"at2 ta41 ta42"},{"name":"cta4","fmla":"cos rh bA4"},{"name":"sta4","fmla":"sin rw bA4"},{"name":"ma4","fmla":"mod cta4 sta4 0"},{"name":"na4","fmla":"*/ rw rh ma4"},{"name":"dxa4","fmla":"cos na4 bA4"},{"name":"dya4","fmla":"sin na4 bA4"},{"name":"xA4","fmla":"+- hc dxa4 0"},{"name":"yA4","fmla":"+- vc dya4 0"},{"name":"td41","fmla":"cos rw aD4"},{"name":"td42","fmla":"sin rh aD4"},{"name":"bD4","fmla":"at2 td41 td42"},{"name":"ctd4","fmla":"cos rh bD4"},{"name":"std4","fmla":"sin rw bD4"},{"name":"md4","fmla":"mod ctd4 std4 0"},{"name":"nd4","fmla":"*/ rw rh md4"},{"name":"dxd4","fmla":"cos nd4 bD4"},{"name":"dyd4","fmla":"sin nd4 bD4"},{"name":"xD4","fmla":"+- hc dxd4 0"},{"name":"yD4","fmla":"+- vc dyd4 0"},{"name":"xAD4","fmla":"+- xA4 0 xD4"},{"name":"yAD4","fmla":"+- yA4 0 yD4"},{"name":"lAD4","fmla":"mod xAD4 yAD4 0"},{"name":"a4","fmla":"at2 yAD4 xAD4"},{"name":"dxF4","fmla":"sin lFD a4"},{"name":"dyF4","fmla":"cos lFD a4"},{"name":"xF4","fmla":"+- xD4 dxF4 0"},{"name":"yF4","fmla":"+- yD4 dyF4 0"},{"name":"xE4","fmla":"+- xA4 0 dxF4"},{"name":"yE4","fmla":"+- yA4 0 dyF4"},{"name":"yC4t","fmla":"sin th a4"},{"name":"xC4t","fmla":"cos th a4"},{"name":"yC4","fmla":"+- yF4 yC4t 0"},{"name":"xC4","fmla":"+- xF4 0 xC4t"},{"name":"yB4","fmla":"+- yE4 yC4t 0"},{"name":"xB4","fmla":"+- xE4 0 xC4t"},{"name":"swAng3","fmla":"+- bA4 0 bD3"},{"name":"aA5","fmla":"+- 6600000 0 ha"},{"name":"aD5","fmla":"+- 6600000 ha 0"},{"name":"ta51","fmla":"cos rw aA5"},{"name":"ta52","fmla":"sin rh aA5"},{"name":"bA5","fmla":"at2 ta51 ta52"},{"name":"td51","fmla":"cos rw aD5"},{"name":"td52","fmla":"sin rh aD5"},{"name":"bD5","fmla":"at2 td51 td52"},{"name":"xD5","fmla":"+- w 0 xA4"},{"name":"xC5","fmla":"+- w 0 xB4"},{"name":"xB5","fmla":"+- w 0 xC4"},{"name":"swAng4","fmla":"+- bA5 0 bD4"},{"name":"aD6","fmla":"+- 9000000 ha 0"},{"name":"td61","fmla":"cos rw aD6"},{"name":"td62","fmla":"sin rh aD6"},{"name":"bD6","fmla":"at2 td61 td62"},{"name":"xD6","fmla":"+- w 0 xA3"},{"name":"xC6","fmla":"+- w 0 xB3"},{"name":"xB6","fmla":"+- w 0 xC3"},{"name":"aD7","fmla":"+- 11400000 ha 0"},{"name":"td71","fmla":"cos rw aD7"},{"name":"td72","fmla":"sin rh aD7"},{"name":"bD7","fmla":"at2 td71 td72"},{"name":"xD7","fmla":"+- w 0 xA2"},{"name":"xC7","fmla":"+- w 0 xB2"},{"name":"xB7","fmla":"+- w 0 xC2"},{"name":"aD8","fmla":"+- 13800000 ha 0"},{"name":"td81","fmla":"cos rw aD8"},{"name":"td82","fmla":"sin rh aD8"},{"name":"bD8","fmla":"at2 td81 td82"},{"name":"xA8","fmla":"+- w 0 xD1"},{"name":"xD8","fmla":"+- w 0 xA1"},{"name":"xC8","fmla":"+- w 0 xB1"},{"name":"xB8","fmla":"+- w 0 xC1"},{"name":"aA9","fmla":"+- 3cd4 0 ha"},{"name":"aD9","fmla":"+- 3cd4 ha 0"},{"name":"td91","fmla":"cos rw aD9"},{"name":"td92","fmla":"sin rh aD9"},{"name":"bD9","fmla":"at2 td91 td92"},{"name":"ctd9","fmla":"cos rh bD9"},{"name":"std9","fmla":"sin rw bD9"},{"name":"md9","fmla":"mod ctd9 std9 0"},{"name":"nd9","fmla":"*/ rw rh md9"},{"name":"dxd9","fmla":"cos nd9 bD9"},{"name":"dyd9","fmla":"sin nd9 bD9"},{"name":"xD9","fmla":"+- hc dxd9 0"},{"name":"yD9","fmla":"+- vc dyd9 0"},{"name":"ta91","fmla":"cos rw aA9"},{"name":"ta92","fmla":"sin rh aA9"},{"name":"bA9","fmla":"at2 ta91 ta92"},{"name":"xA9","fmla":"+- hc 0 dxd9"},{"name":"xF9","fmla":"+- xD9 0 lFD"},{"name":"xE9","fmla":"+- xA9 lFD 0"},{"name":"yC9","fmla":"+- yD9 0 th"},{"name":"swAng5","fmla":"+- bA9 0 bD8"},{"name":"xCxn1","fmla":"+/ xB1 xC1 2"},{"name":"yCxn1","fmla":"+/ yB1 yC1 2"},{"name":"xCxn2","fmla":"+/ xB2 xC2 2"},{"name":"yCxn2","fmla":"+/ yB2 yC2 2"},{"name":"xCxn3","fmla":"+/ xB3 xC3 2"},{"name":"yCxn3","fmla":"+/ yB3 yC3 2"},{"name":"xCxn4","fmla":"+/ xB4 xC4 2"},{"name":"yCxn4","fmla":"+/ yB4 yC4 2"},{"name":"xCxn5","fmla":"+/ r 0 xCxn4"},{"name":"xCxn6","fmla":"+/ r 0 xCxn3"},{"name":"xCxn7","fmla":"+/ r 0 xCxn2"},{"name":"xCxn8","fmla":"+/ r 0 xCxn1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xA1","y":"yA1"}]},{"c":"L","pts":[{"x":"xB1","y":"yB1"}]},{"c":"L","pts":[{"x":"xC1","y":"yC1"}]},{"c":"L","pts":[{"x":"xD1","y":"yD1"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD1","swAng":"swAng1"},{"c":"L","pts":[{"x":"xB2","y":"yB2"}]},{"c":"L","pts":[{"x":"xC2","y":"yC2"}]},{"c":"L","pts":[{"x":"xD2","y":"yD2"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD2","swAng":"swAng2"},{"c":"L","pts":[{"x":"xB3","y":"yB3"}]},{"c":"L","pts":[{"x":"xC3","y":"yC3"}]},{"c":"L","pts":[{"x":"xD3","y":"yD3"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD3","swAng":"swAng3"},{"c":"L","pts":[{"x":"xB4","y":"yB4"}]},{"c":"L","pts":[{"x":"xC4","y":"yC4"}]},{"c":"L","pts":[{"x":"xD4","y":"yD4"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD4","swAng":"swAng4"},{"c":"L","pts":[{"x":"xB5","y":"yC4"}]},{"c":"L","pts":[{"x":"xC5","y":"yB4"}]},{"c":"L","pts":[{"x":"xD5","y":"yA4"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD5","swAng":"swAng3"},{"c":"L","pts":[{"x":"xB6","y":"yC3"}]},{"c":"L","pts":[{"x":"xC6","y":"yB3"}]},{"c":"L","pts":[{"x":"xD6","y":"yA3"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD6","swAng":"swAng2"},{"c":"L","pts":[{"x":"xB7","y":"yC2"}]},{"c":"L","pts":[{"x":"xC7","y":"yB2"}]},{"c":"L","pts":[{"x":"xD7","y":"yA2"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD7","swAng":"swAng1"},{"c":"L","pts":[{"x":"xB8","y":"yC1"}]},{"c":"L","pts":[{"x":"xC8","y":"yB1"}]},{"c":"L","pts":[{"x":"xD8","y":"yA1"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD8","swAng":"swAng5"},{"c":"L","pts":[{"x":"xE9","y":"yC9"}]},{"c":"L","pts":[{"x":"xF9","y":"yC9"}]},{"c":"L","pts":[{"x":"xD9","y":"yD9"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD9","swAng":"swAng5"},{"c":"Z"}]}]},"halfFrame":{"av":[{"name":"adj1","fmla":"val 33333"},{"name":"adj2","fmla":"val 33333"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"x1","fmla":"*/ ss a2 100000"},{"name":"g1","fmla":"*/ h x1 w"},{"name":"g2","fmla":"+- h 0 g1"},{"name":"maxAdj1","fmla":"*/ 100000 g2 ss"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"y1","fmla":"*/ ss a1 100000"},{"name":"dx2","fmla":"*/ y1 w h"},{"name":"x2","fmla":"+- r 0 dx2"},{"name":"dy2","fmla":"*/ x1 h w"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"cx1","fmla":"*/ x1 1 2"},{"name":"cy1","fmla":"+/ y2 b 2"},{"name":"cx2","fmla":"+/ x2 r 2"},{"name":"cy2","fmla":"*/ y1 1 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"heart":{"gd":[{"name":"dx1","fmla":"*/ w 49 48"},{"name":"dx2","fmla":"*/ w 10 48"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- t 0 hd3"},{"name":"il","fmla":"*/ w 1 6"},{"name":"ir","fmla":"*/ w 5 6"},{"name":"ib","fmla":"*/ h 2 3"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"hc","y":"hd4"}]},{"c":"C","pts":[{"x":"x3","y":"y1"},{"x":"x4","y":"hd4"},{"x":"hc","y":"b"}]},{"c":"C","pts":[{"x":"x1","y":"hd4"},{"x":"x2","y":"y1"},{"x":"hc","y":"hd4"}]},{"c":"Z"}]}]},"heptagon":{"av":[{"name":"hf","fmla":"val 102572"},{"name":"vf","fmla":"val 105210"}],"gd":[{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"svc","fmla":"*/ vc  vf 100000"},{"name":"dx1","fmla":"*/ swd2 97493 100000"},{"name":"dx2","fmla":"*/ swd2 78183 100000"},{"name":"dx3","fmla":"*/ swd2 43388 100000"},{"name":"dy1","fmla":"*/ shd2 62349 100000"},{"name":"dy2","fmla":"*/ shd2 22252 100000"},{"name":"dy3","fmla":"*/ shd2 90097 100000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc dx3 0"},{"name":"x5","fmla":"+- hc dx2 0"},{"name":"x6","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- svc 0 dy1"},{"name":"y2","fmla":"+- svc dy2 0"},{"name":"y3","fmla":"+- svc dy3 0"},{"name":"ib","fmla":"+- b 0 y1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"Z"}]}]},"hexagon":{"av":[{"name":"adj","fmla":"val 25000"},{"name":"vf","fmla":"val 115470"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 w ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"dy1","fmla":"sin shd2 3600000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"q1","fmla":"*/ maxAdj -1 2"},{"name":"q2","fmla":"+- a q1 0"},{"name":"q3","fmla":"?: q2 4 2"},{"name":"q4","fmla":"?: q2 3 2"},{"name":"q5","fmla":"?: q2 q1 0"},{"name":"q6","fmla":"+/ a q5 q1"},{"name":"q7","fmla":"*/ q6 q4 -1"},{"name":"q8","fmla":"+- q3 q7 0"},{"name":"il","fmla":"*/ w q8 24"},{"name":"it","fmla":"*/ h q8 24"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 it"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"}]}]},"homePlate":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"maxAdj","fmla":"*/ 100000 w ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"dx1","fmla":"*/ ss a 100000"},{"name":"x1","fmla":"+- r 0 dx1"},{"name":"ir","fmla":"+/ x1 r 2"},{"name":"x2","fmla":"*/ x1 1 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"horizontalScroll":{"av":[{"name":"adj","fmla":"val 12500"}],"gd":[{"name":"a","fmla":"pin 0 adj 25000"},{"name":"ch","fmla":"*/ ss a 100000"},{"name":"ch2","fmla":"*/ ch 1 2"},{"name":"ch4","fmla":"*/ ch 1 4"},{"name":"y3","fmla":"+- ch ch2 0"},{"name":"y4","fmla":"+- ch ch 0"},{"name":"y6","fmla":"+- b 0 ch"},{"name":"y7","fmla":"+- b 0 ch2"},{"name":"y5","fmla":"+- y6 0 ch2"},{"name":"x3","fmla":"+- r 0 ch"},{"name":"x4","fmla":"+- r 0 ch2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x4","y":"ch2"}]},{"c":"A","wR":"ch4","hR":"ch4","stAng":"0","swAng":"cd2"},{"c":"L","pts":[{"x":"x3","y":"ch"}]},{"c":"L","pts":[{"x":"ch2","y":"ch"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"l","y":"y7"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd2","swAng":"-10800000"},{"c":"L","pts":[{"x":"ch","y":"y6"}]},{"c":"L","pts":[{"x":"x4","y":"y6"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"Z"},{"c":"M","pts":[{"x":"ch2","y":"y4"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"0","swAng":"-10800000"},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"ch2","y":"y4"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"0","swAng":"-10800000"},{"c":"Z"},{"c":"M","pts":[{"x":"x4","y":"ch"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-16200000"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd2","swAng":"-10800000"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"y3"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"ch"}]},{"c":"L","pts":[{"x":"x3","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd2","swAng":"cd2"},{"c":"L","pts":[{"x":"r","y":"y5"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"ch","y":"y6"}]},{"c":"L","pts":[{"x":"ch","y":"y7"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd2"},{"c":"Z"},{"c":"M","pts":[{"x":"x3","y":"ch"}]},{"c":"L","pts":[{"x":"x4","y":"ch"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"M","pts":[{"x":"x4","y":"ch"}]},{"c":"L","pts":[{"x":"x4","y":"ch2"}]},{"c":"A","wR":"ch4","hR":"ch4","stAng":"0","swAng":"cd2"},{"c":"M","pts":[{"x":"ch2","y":"y4"}]},{"c":"L","pts":[{"x":"ch2","y":"y3"}]},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd2","swAng":"cd2"},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd2"},{"c":"M","pts":[{"x":"ch","y":"y3"}]},{"c":"L","pts":[{"x":"ch","y":"y6"}]}]}]},"irregularSeal1":{"gd":[{"name":"x5","fmla":"*/ w 4627 21600"},{"name":"x12","fmla":"*/ w 8485 21600"},{"name":"x21","fmla":"*/ w 16702 21600"},{"name":"x24","fmla":"*/ w 14522 21600"},{"name":"y3","fmla":"*/ h 6320 21600"},{"name":"y6","fmla":"*/ h 8615 21600"},{"name":"y9","fmla":"*/ h 13937 21600"},{"name":"y18","fmla":"*/ h 13290 21600"}],"paths":[{"w":21600,"h":21600,"cmds":[{"c":"M","pts":[{"x":"10800","y":"5800"}]},{"c":"L","pts":[{"x":"14522","y":"0"}]},{"c":"L","pts":[{"x":"14155","y":"5325"}]},{"c":"L","pts":[{"x":"18380","y":"4457"}]},{"c":"L","pts":[{"x":"16702","y":"7315"}]},{"c":"L","pts":[{"x":"21097","y":"8137"}]},{"c":"L","pts":[{"x":"17607","y":"10475"}]},{"c":"L","pts":[{"x":"21600","y":"13290"}]},{"c":"L","pts":[{"x":"16837","y":"12942"}]},{"c":"L","pts":[{"x":"18145","y":"18095"}]},{"c":"L","pts":[{"x":"14020","y":"14457"}]},{"c":"L","pts":[{"x":"13247","y":"19737"}]},{"c":"L","pts":[{"x":"10532","y":"14935"}]},{"c":"L","pts":[{"x":"8485","y":"21600"}]},{"c":"L","pts":[{"x":"7715","y":"15627"}]},{"c":"L","pts":[{"x":"4762","y":"17617"}]},{"c":"L","pts":[{"x":"5667","y":"13937"}]},{"c":"L","pts":[{"x":"135","y":"14587"}]},{"c":"L","pts":[{"x":"3722","y":"11775"}]},{"c":"L","pts":[{"x":"0","y":"8615"}]},{"c":"L","pts":[{"x":"4627","y":"7617"}]},{"c":"L","pts":[{"x":"370","y":"2295"}]},{"c":"L","pts":[{"x":"7312","y":"6320"}]},{"c":"L","pts":[{"x":"8352","y":"2295"}]},{"c":"Z"}]}]},"irregularSeal2":{"gd":[{"name":"x2","fmla":"*/ w 9722 21600"},{"name":"x5","fmla":"*/ w 5372 21600"},{"name":"x16","fmla":"*/ w 11612 21600"},{"name":"x19","fmla":"*/ w 14640 21600"},{"name":"y2","fmla":"*/ h 1887 21600"},{"name":"y3","fmla":"*/ h 6382 21600"},{"name":"y8","fmla":"*/ h 12877 21600"},{"name":"y14","fmla":"*/ h 19712 21600"},{"name":"y16","fmla":"*/ h 18842 21600"},{"name":"y17","fmla":"*/ h 15935 21600"},{"name":"y24","fmla":"*/ h 6645 21600"}],"paths":[{"w":21600,"h":21600,"cmds":[{"c":"M","pts":[{"x":"11462","y":"4342"}]},{"c":"L","pts":[{"x":"14790","y":"0"}]},{"c":"L","pts":[{"x":"14525","y":"5777"}]},{"c":"L","pts":[{"x":"18007","y":"3172"}]},{"c":"L","pts":[{"x":"16380","y":"6532"}]},{"c":"L","pts":[{"x":"21600","y":"6645"}]},{"c":"L","pts":[{"x":"16985","y":"9402"}]},{"c":"L","pts":[{"x":"18270","y":"11290"}]},{"c":"L","pts":[{"x":"16380","y":"12310"}]},{"c":"L","pts":[{"x":"18877","y":"15632"}]},{"c":"L","pts":[{"x":"14640","y":"14350"}]},{"c":"L","pts":[{"x":"14942","y":"17370"}]},{"c":"L","pts":[{"x":"12180","y":"15935"}]},{"c":"L","pts":[{"x":"11612","y":"18842"}]},{"c":"L","pts":[{"x":"9872","y":"17370"}]},{"c":"L","pts":[{"x":"8700","y":"19712"}]},{"c":"L","pts":[{"x":"7527","y":"18125"}]},{"c":"L","pts":[{"x":"4917","y":"21600"}]},{"c":"L","pts":[{"x":"4805","y":"18240"}]},{"c":"L","pts":[{"x":"1285","y":"17825"}]},{"c":"L","pts":[{"x":"3330","y":"15370"}]},{"c":"L","pts":[{"x":"0","y":"12877"}]},{"c":"L","pts":[{"x":"3935","y":"11592"}]},{"c":"L","pts":[{"x":"1172","y":"8270"}]},{"c":"L","pts":[{"x":"5372","y":"7817"}]},{"c":"L","pts":[{"x":"4502","y":"3625"}]},{"c":"L","pts":[{"x":"8550","y":"6382"}]},{"c":"L","pts":[{"x":"9722","y":"1887"}]},{"c":"Z"}]}]},"leftArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 w ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- l dx2 0"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"dx1","fmla":"*/ y1 dx2 hd2"},{"name":"x1","fmla":"+- x2  0 dx1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"Z"}]}]},"leftArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 64977"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 100000 w ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss w"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dy1","fmla":"*/ ss a2 100000"},{"name":"dy2","fmla":"*/ ss a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"x1","fmla":"*/ ss a3 100000"},{"name":"dx2","fmla":"*/ w a4 100000"},{"name":"x2","fmla":"+- r 0 dx2"},{"name":"x3","fmla":"+/ x2 r 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"Z"}]}]},"leftBrace":{"av":[{"name":"adj1","fmla":"val 8333"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 100000"},{"name":"q1","fmla":"+- 100000 0 a2"},{"name":"q2","fmla":"min q1 a2"},{"name":"q3","fmla":"*/ q2 1 2"},{"name":"maxAdj1","fmla":"*/ q3 h ss"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"y1","fmla":"*/ ss a1 100000"},{"name":"y3","fmla":"*/ h a2 100000"},{"name":"y4","fmla":"+- y3 y1 0"},{"name":"dx1","fmla":"cos wd2 2700000"},{"name":"dy1","fmla":"sin y1 2700000"},{"name":"il","fmla":"+- r 0 dx1"},{"name":"it","fmla":"+- y1 0 dy1"},{"name":"ib","fmla":"+- b dy1 y1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"hc","y":"y4"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"-5400000"},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"y1"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"hc","y":"y4"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"-5400000"},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"y1"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"cd4"}]}]},"leftBracket":{"av":[{"name":"adj","fmla":"val 8333"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 h ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"y1","fmla":"*/ ss a 100000"},{"name":"y2","fmla":"+- b 0 y1"},{"name":"dx1","fmla":"cos w 2700000"},{"name":"dy1","fmla":"sin y1 2700000"},{"name":"il","fmla":"+- r 0 dx1"},{"name":"it","fmla":"+- y1 0 dy1"},{"name":"ib","fmla":"+- b dy1 y1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"A","wR":"w","hR":"y1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"w","hR":"y1","stAng":"cd2","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"A","wR":"w","hR":"y1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"w","hR":"y1","stAng":"cd2","swAng":"cd4"}]}]},"leftCircularArrow":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val -1142319"},{"name":"adj3","fmla":"val 1142319"},{"name":"adj4","fmla":"val 10800000"},{"name":"adj5","fmla":"val 12500"}],"gd":[{"name":"a5","fmla":"pin 0 adj5 25000"},{"name":"maxAdj1","fmla":"*/ a5 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"enAng","fmla":"pin 1 adj3 21599999"},{"name":"stAng","fmla":"pin 0 adj4 21599999"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"thh","fmla":"*/ ss a5 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"rw1","fmla":"+- wd2 th2 thh"},{"name":"rh1","fmla":"+- hd2 th2 thh"},{"name":"rw2","fmla":"+- rw1 0 th"},{"name":"rh2","fmla":"+- rh1 0 th"},{"name":"rw3","fmla":"+- rw2 th2 0"},{"name":"rh3","fmla":"+- rh2 th2 0"},{"name":"wtH","fmla":"sin rw3 enAng"},{"name":"htH","fmla":"cos rh3 enAng"},{"name":"dxH","fmla":"cat2 rw3 htH wtH"},{"name":"dyH","fmla":"sat2 rh3 htH wtH"},{"name":"xH","fmla":"+- hc dxH 0"},{"name":"yH","fmla":"+- vc dyH 0"},{"name":"rI","fmla":"min rw2 rh2"},{"name":"u1","fmla":"*/ dxH dxH 1"},{"name":"u2","fmla":"*/ dyH dyH 1"},{"name":"u3","fmla":"*/ rI rI 1"},{"name":"u4","fmla":"+- u1 0 u3"},{"name":"u5","fmla":"+- u2 0 u3"},{"name":"u6","fmla":"*/ u4 u5 u1"},{"name":"u7","fmla":"*/ u6 1 u2"},{"name":"u8","fmla":"+- 1 0 u7"},{"name":"u9","fmla":"sqrt u8"},{"name":"u10","fmla":"*/ u4 1 dxH"},{"name":"u11","fmla":"*/ u10 1 dyH"},{"name":"u12","fmla":"+/ 1 u9 u11"},{"name":"u13","fmla":"at2 1 u12"},{"name":"u14","fmla":"+- u13 21600000 0"},{"name":"u15","fmla":"?: u13 u13 u14"},{"name":"u16","fmla":"+- u15 0 enAng"},{"name":"u17","fmla":"+- u16 21600000 0"},{"name":"u18","fmla":"?: u16 u16 u17"},{"name":"u19","fmla":"+- u18 0 cd2"},{"name":"u20","fmla":"+- u18 0 21600000"},{"name":"u21","fmla":"?: u19 u20 u18"},{"name":"u22","fmla":"abs u21"},{"name":"minAng","fmla":"*/ u22 -1 1"},{"name":"u23","fmla":"abs adj2"},{"name":"a2","fmla":"*/ u23 -1 1"},{"name":"aAng","fmla":"pin minAng a2 0"},{"name":"ptAng","fmla":"+- enAng aAng 0"},{"name":"wtA","fmla":"sin rw3 ptAng"},{"name":"htA","fmla":"cos rh3 ptAng"},{"name":"dxA","fmla":"cat2 rw3 htA wtA"},{"name":"dyA","fmla":"sat2 rh3 htA wtA"},{"name":"xA","fmla":"+- hc dxA 0"},{"name":"yA","fmla":"+- vc dyA 0"},{"name":"wtE","fmla":"sin rw1 stAng"},{"name":"htE","fmla":"cos rh1 stAng"},{"name":"dxE","fmla":"cat2 rw1 htE wtE"},{"name":"dyE","fmla":"sat2 rh1 htE wtE"},{"name":"xE","fmla":"+- hc dxE 0"},{"name":"yE","fmla":"+- vc dyE 0"},{"name":"wtD","fmla":"sin rw2 stAng"},{"name":"htD","fmla":"cos rh2 stAng"},{"name":"dxD","fmla":"cat2 rw2 htD wtD"},{"name":"dyD","fmla":"sat2 rh2 htD wtD"},{"name":"xD","fmla":"+- hc dxD 0"},{"name":"yD","fmla":"+- vc dyD 0"},{"name":"dxG","fmla":"cos thh ptAng"},{"name":"dyG","fmla":"sin thh ptAng"},{"name":"xG","fmla":"+- xH dxG 0"},{"name":"yG","fmla":"+- yH dyG 0"},{"name":"dxB","fmla":"cos thh ptAng"},{"name":"dyB","fmla":"sin thh ptAng"},{"name":"xB","fmla":"+- xH 0 dxB 0"},{"name":"yB","fmla":"+- yH 0 dyB 0"},{"name":"sx1","fmla":"+- xB 0 hc"},{"name":"sy1","fmla":"+- yB 0 vc"},{"name":"sx2","fmla":"+- xG 0 hc"},{"name":"sy2","fmla":"+- yG 0 vc"},{"name":"rO","fmla":"min rw1 rh1"},{"name":"x1O","fmla":"*/ sx1 rO rw1"},{"name":"y1O","fmla":"*/ sy1 rO rh1"},{"name":"x2O","fmla":"*/ sx2 rO rw1"},{"name":"y2O","fmla":"*/ sy2 rO rh1"},{"name":"dxO","fmla":"+- x2O 0 x1O"},{"name":"dyO","fmla":"+- y2O 0 y1O"},{"name":"dO","fmla":"mod dxO dyO 0"},{"name":"q1","fmla":"*/ x1O y2O 1"},{"name":"q2","fmla":"*/ x2O y1O 1"},{"name":"DO","fmla":"+- q1 0 q2"},{"name":"q3","fmla":"*/ rO rO 1"},{"name":"q4","fmla":"*/ dO dO 1"},{"name":"q5","fmla":"*/ q3 q4 1"},{"name":"q6","fmla":"*/ DO DO 1"},{"name":"q7","fmla":"+- q5 0 q6"},{"name":"q8","fmla":"max q7 0"},{"name":"sdelO","fmla":"sqrt q8"},{"name":"ndyO","fmla":"*/ dyO -1 1"},{"name":"sdyO","fmla":"?: ndyO -1 1"},{"name":"q9","fmla":"*/ sdyO dxO 1"},{"name":"q10","fmla":"*/ q9 sdelO 1"},{"name":"q11","fmla":"*/ DO dyO 1"},{"name":"dxF1","fmla":"+/ q11 q10 q4"},{"name":"q12","fmla":"+- q11 0 q10"},{"name":"dxF2","fmla":"*/ q12 1 q4"},{"name":"adyO","fmla":"abs dyO"},{"name":"q13","fmla":"*/ adyO sdelO 1"},{"name":"q14","fmla":"*/ DO dxO -1"},{"name":"dyF1","fmla":"+/ q14 q13 q4"},{"name":"q15","fmla":"+- q14 0 q13"},{"name":"dyF2","fmla":"*/ q15 1 q4"},{"name":"q16","fmla":"+- x2O 0 dxF1"},{"name":"q17","fmla":"+- x2O 0 dxF2"},{"name":"q18","fmla":"+- y2O 0 dyF1"},{"name":"q19","fmla":"+- y2O 0 dyF2"},{"name":"q20","fmla":"mod q16 q18 0"},{"name":"q21","fmla":"mod q17 q19 0"},{"name":"q22","fmla":"+- q21 0 q20"},{"name":"dxF","fmla":"?: q22 dxF1 dxF2"},{"name":"dyF","fmla":"?: q22 dyF1 dyF2"},{"name":"sdxF","fmla":"*/ dxF rw1 rO"},{"name":"sdyF","fmla":"*/ dyF rh1 rO"},{"name":"xF","fmla":"+- hc sdxF 0"},{"name":"yF","fmla":"+- vc sdyF 0"},{"name":"x1I","fmla":"*/ sx1 rI rw2"},{"name":"y1I","fmla":"*/ sy1 rI rh2"},{"name":"x2I","fmla":"*/ sx2 rI rw2"},{"name":"y2I","fmla":"*/ sy2 rI rh2"},{"name":"dxI","fmla":"+- x2I 0 x1I"},{"name":"dyI","fmla":"+- y2I 0 y1I"},{"name":"dI","fmla":"mod dxI dyI 0"},{"name":"v1","fmla":"*/ x1I y2I 1"},{"name":"v2","fmla":"*/ x2I y1I 1"},{"name":"DI","fmla":"+- v1 0 v2"},{"name":"v3","fmla":"*/ rI rI 1"},{"name":"v4","fmla":"*/ dI dI 1"},{"name":"v5","fmla":"*/ v3 v4 1"},{"name":"v6","fmla":"*/ DI DI 1"},{"name":"v7","fmla":"+- v5 0 v6"},{"name":"v8","fmla":"max v7 0"},{"name":"sdelI","fmla":"sqrt v8"},{"name":"v9","fmla":"*/ sdyO dxI 1"},{"name":"v10","fmla":"*/ v9 sdelI 1"},{"name":"v11","fmla":"*/ DI dyI 1"},{"name":"dxC1","fmla":"+/ v11 v10 v4"},{"name":"v12","fmla":"+- v11 0 v10"},{"name":"dxC2","fmla":"*/ v12 1 v4"},{"name":"adyI","fmla":"abs dyI"},{"name":"v13","fmla":"*/ adyI sdelI 1"},{"name":"v14","fmla":"*/ DI dxI -1"},{"name":"dyC1","fmla":"+/ v14 v13 v4"},{"name":"v15","fmla":"+- v14 0 v13"},{"name":"dyC2","fmla":"*/ v15 1 v4"},{"name":"v16","fmla":"+- x1I 0 dxC1"},{"name":"v17","fmla":"+- x1I 0 dxC2"},{"name":"v18","fmla":"+- y1I 0 dyC1"},{"name":"v19","fmla":"+- y1I 0 dyC2"},{"name":"v20","fmla":"mod v16 v18 0"},{"name":"v21","fmla":"mod v17 v19 0"},{"name":"v22","fmla":"+- v21 0 v20"},{"name":"dxC","fmla":"?: v22 dxC1 dxC2"},{"name":"dyC","fmla":"?: v22 dyC1 dyC2"},{"name":"sdxC","fmla":"*/ dxC rw2 rI"},{"name":"sdyC","fmla":"*/ dyC rh2 rI"},{"name":"xC","fmla":"+- hc sdxC 0"},{"name":"yC","fmla":"+- vc sdyC 0"},{"name":"ist0","fmla":"at2 sdxC sdyC"},{"name":"ist1","fmla":"+- ist0 21600000 0"},{"name":"istAng0","fmla":"?: ist0 ist0 ist1"},{"name":"isw1","fmla":"+- stAng 0 istAng0"},{"name":"isw2","fmla":"+- isw1 21600000 0"},{"name":"iswAng0","fmla":"?: isw1 isw1 isw2"},{"name":"istAng","fmla":"+- istAng0 iswAng0 0"},{"name":"iswAng","fmla":"+- 0 0 iswAng0"},{"name":"p1","fmla":"+- xF 0 xC"},{"name":"p2","fmla":"+- yF 0 yC"},{"name":"p3","fmla":"mod p1 p2 0"},{"name":"p4","fmla":"*/ p3 1 2"},{"name":"p5","fmla":"+- p4 0 thh"},{"name":"xGp","fmla":"?: p5 xF xG"},{"name":"yGp","fmla":"?: p5 yF yG"},{"name":"xBp","fmla":"?: p5 xC xB"},{"name":"yBp","fmla":"?: p5 yC yB"},{"name":"en0","fmla":"at2 sdxF sdyF"},{"name":"en1","fmla":"+- en0 21600000 0"},{"name":"en2","fmla":"?: en0 en0 en1"},{"name":"sw0","fmla":"+- en2 0 stAng"},{"name":"sw1","fmla":"+- sw0 0 21600000"},{"name":"swAng","fmla":"?: sw0 sw1 sw0"},{"name":"stAng0","fmla":"+- stAng swAng 0"},{"name":"swAng0","fmla":"+- 0 0 swAng"},{"name":"wtI","fmla":"sin rw3 stAng"},{"name":"htI","fmla":"cos rh3 stAng"},{"name":"dxI","fmla":"cat2 rw3 htI wtI"},{"name":"dyI","fmla":"sat2 rh3 htI wtI"},{"name":"xI","fmla":"+- hc dxI 0"},{"name":"yI","fmla":"+- vc dyI 0"},{"name":"aI","fmla":"+- stAng cd4 0"},{"name":"aA","fmla":"+- ptAng 0 cd4"},{"name":"aB","fmla":"+- ptAng cd2 0"},{"name":"idx","fmla":"cos rw1 2700000"},{"name":"idy","fmla":"sin rh1 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xE","y":"yE"}]},{"c":"L","pts":[{"x":"xD","y":"yD"}]},{"c":"A","wR":"rw2","hR":"rh2","stAng":"istAng","swAng":"iswAng"},{"c":"L","pts":[{"x":"xBp","y":"yBp"}]},{"c":"L","pts":[{"x":"xA","y":"yA"}]},{"c":"L","pts":[{"x":"xGp","y":"yGp"}]},{"c":"L","pts":[{"x":"xF","y":"yF"}]},{"c":"A","wR":"rw1","hR":"rh1","stAng":"stAng0","swAng":"swAng0"},{"c":"Z"}]}]},"leftRightArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"x2","fmla":"*/ ss a2 100000"},{"name":"x3","fmla":"+- r 0 x2"},{"name":"dy","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- vc 0 dy"},{"name":"y2","fmla":"+- vc dy 0"},{"name":"dx1","fmla":"*/ y1 x2 hd2"},{"name":"x1","fmla":"+- x2 0 dx1"},{"name":"x4","fmla":"+- x3 dx1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"Z"}]}]},"leftRightArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 48123"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 50000 w ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss wd2"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dy1","fmla":"*/ ss a2 100000"},{"name":"dy2","fmla":"*/ ss a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"x1","fmla":"*/ ss a3 100000"},{"name":"x4","fmla":"+- r 0 x1"},{"name":"dx2","fmla":"*/ w a4 200000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"Z"}]}]},"leftRightCircularArrow":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val 1142319"},{"name":"adj3","fmla":"val 20457681"},{"name":"adj4","fmla":"val 11942319"},{"name":"adj5","fmla":"val 12500"}],"gd":[{"name":"a5","fmla":"pin 0 adj5 25000"},{"name":"maxAdj1","fmla":"*/ a5 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"enAng","fmla":"pin 1 adj3 21599999"},{"name":"stAng","fmla":"pin 0 adj4 21599999"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"thh","fmla":"*/ ss a5 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"rw1","fmla":"+- wd2 th2 thh"},{"name":"rh1","fmla":"+- hd2 th2 thh"},{"name":"rw2","fmla":"+- rw1 0 th"},{"name":"rh2","fmla":"+- rh1 0 th"},{"name":"rw3","fmla":"+- rw2 th2 0"},{"name":"rh3","fmla":"+- rh2 th2 0"},{"name":"wtH","fmla":"sin rw3 enAng"},{"name":"htH","fmla":"cos rh3 enAng"},{"name":"dxH","fmla":"cat2 rw3 htH wtH"},{"name":"dyH","fmla":"sat2 rh3 htH wtH"},{"name":"xH","fmla":"+- hc dxH 0"},{"name":"yH","fmla":"+- vc dyH 0"},{"name":"rI","fmla":"min rw2 rh2"},{"name":"u1","fmla":"*/ dxH dxH 1"},{"name":"u2","fmla":"*/ dyH dyH 1"},{"name":"u3","fmla":"*/ rI rI 1"},{"name":"u4","fmla":"+- u1 0 u3"},{"name":"u5","fmla":"+- u2 0 u3"},{"name":"u6","fmla":"*/ u4 u5 u1"},{"name":"u7","fmla":"*/ u6 1 u2"},{"name":"u8","fmla":"+- 1 0 u7"},{"name":"u9","fmla":"sqrt u8"},{"name":"u10","fmla":"*/ u4 1 dxH"},{"name":"u11","fmla":"*/ u10 1 dyH"},{"name":"u12","fmla":"+/ 1 u9 u11"},{"name":"u13","fmla":"at2 1 u12"},{"name":"u14","fmla":"+- u13 21600000 0"},{"name":"u15","fmla":"?: u13 u13 u14"},{"name":"u16","fmla":"+- u15 0 enAng"},{"name":"u17","fmla":"+- u16 21600000 0"},{"name":"u18","fmla":"?: u16 u16 u17"},{"name":"u19","fmla":"+- u18 0 cd2"},{"name":"u20","fmla":"+- u18 0 21600000"},{"name":"u21","fmla":"?: u19 u20 u18"},{"name":"maxAng","fmla":"abs u21"},{"name":"aAng","fmla":"pin 0 adj2 maxAng"},{"name":"ptAng","fmla":"+- enAng aAng 0"},{"name":"wtA","fmla":"sin rw3 ptAng"},{"name":"htA","fmla":"cos rh3 ptAng"},{"name":"dxA","fmla":"cat2 rw3 htA wtA"},{"name":"dyA","fmla":"sat2 rh3 htA wtA"},{"name":"xA","fmla":"+- hc dxA 0"},{"name":"yA","fmla":"+- vc dyA 0"},{"name":"dxG","fmla":"cos thh ptAng"},{"name":"dyG","fmla":"sin thh ptAng"},{"name":"xG","fmla":"+- xH dxG 0"},{"name":"yG","fmla":"+- yH dyG 0"},{"name":"dxB","fmla":"cos thh ptAng"},{"name":"dyB","fmla":"sin thh ptAng"},{"name":"xB","fmla":"+- xH 0 dxB 0"},{"name":"yB","fmla":"+- yH 0 dyB 0"},{"name":"sx1","fmla":"+- xB 0 hc"},{"name":"sy1","fmla":"+- yB 0 vc"},{"name":"sx2","fmla":"+- xG 0 hc"},{"name":"sy2","fmla":"+- yG 0 vc"},{"name":"rO","fmla":"min rw1 rh1"},{"name":"x1O","fmla":"*/ sx1 rO rw1"},{"name":"y1O","fmla":"*/ sy1 rO rh1"},{"name":"x2O","fmla":"*/ sx2 rO rw1"},{"name":"y2O","fmla":"*/ sy2 rO rh1"},{"name":"dxO","fmla":"+- x2O 0 x1O"},{"name":"dyO","fmla":"+- y2O 0 y1O"},{"name":"dO","fmla":"mod dxO dyO 0"},{"name":"q1","fmla":"*/ x1O y2O 1"},{"name":"q2","fmla":"*/ x2O y1O 1"},{"name":"DO","fmla":"+- q1 0 q2"},{"name":"q3","fmla":"*/ rO rO 1"},{"name":"q4","fmla":"*/ dO dO 1"},{"name":"q5","fmla":"*/ q3 q4 1"},{"name":"q6","fmla":"*/ DO DO 1"},{"name":"q7","fmla":"+- q5 0 q6"},{"name":"q8","fmla":"max q7 0"},{"name":"sdelO","fmla":"sqrt q8"},{"name":"ndyO","fmla":"*/ dyO -1 1"},{"name":"sdyO","fmla":"?: ndyO -1 1"},{"name":"q9","fmla":"*/ sdyO dxO 1"},{"name":"q10","fmla":"*/ q9 sdelO 1"},{"name":"q11","fmla":"*/ DO dyO 1"},{"name":"dxF1","fmla":"+/ q11 q10 q4"},{"name":"q12","fmla":"+- q11 0 q10"},{"name":"dxF2","fmla":"*/ q12 1 q4"},{"name":"adyO","fmla":"abs dyO"},{"name":"q13","fmla":"*/ adyO sdelO 1"},{"name":"q14","fmla":"*/ DO dxO -1"},{"name":"dyF1","fmla":"+/ q14 q13 q4"},{"name":"q15","fmla":"+- q14 0 q13"},{"name":"dyF2","fmla":"*/ q15 1 q4"},{"name":"q16","fmla":"+- x2O 0 dxF1"},{"name":"q17","fmla":"+- x2O 0 dxF2"},{"name":"q18","fmla":"+- y2O 0 dyF1"},{"name":"q19","fmla":"+- y2O 0 dyF2"},{"name":"q20","fmla":"mod q16 q18 0"},{"name":"q21","fmla":"mod q17 q19 0"},{"name":"q22","fmla":"+- q21 0 q20"},{"name":"dxF","fmla":"?: q22 dxF1 dxF2"},{"name":"dyF","fmla":"?: q22 dyF1 dyF2"},{"name":"sdxF","fmla":"*/ dxF rw1 rO"},{"name":"sdyF","fmla":"*/ dyF rh1 rO"},{"name":"xF","fmla":"+- hc sdxF 0"},{"name":"yF","fmla":"+- vc sdyF 0"},{"name":"x1I","fmla":"*/ sx1 rI rw2"},{"name":"y1I","fmla":"*/ sy1 rI rh2"},{"name":"x2I","fmla":"*/ sx2 rI rw2"},{"name":"y2I","fmla":"*/ sy2 rI rh2"},{"name":"dxI","fmla":"+- x2I 0 x1I"},{"name":"dyI","fmla":"+- y2I 0 y1I"},{"name":"dI","fmla":"mod dxI dyI 0"},{"name":"v1","fmla":"*/ x1I y2I 1"},{"name":"v2","fmla":"*/ x2I y1I 1"},{"name":"DI","fmla":"+- v1 0 v2"},{"name":"v3","fmla":"*/ rI rI 1"},{"name":"v4","fmla":"*/ dI dI 1"},{"name":"v5","fmla":"*/ v3 v4 1"},{"name":"v6","fmla":"*/ DI DI 1"},{"name":"v7","fmla":"+- v5 0 v6"},{"name":"v8","fmla":"max v7 0"},{"name":"sdelI","fmla":"sqrt v8"},{"name":"v9","fmla":"*/ sdyO dxI 1"},{"name":"v10","fmla":"*/ v9 sdelI 1"},{"name":"v11","fmla":"*/ DI dyI 1"},{"name":"dxC1","fmla":"+/ v11 v10 v4"},{"name":"v12","fmla":"+- v11 0 v10"},{"name":"dxC2","fmla":"*/ v12 1 v4"},{"name":"adyI","fmla":"abs dyI"},{"name":"v13","fmla":"*/ adyI sdelI 1"},{"name":"v14","fmla":"*/ DI dxI -1"},{"name":"dyC1","fmla":"+/ v14 v13 v4"},{"name":"v15","fmla":"+- v14 0 v13"},{"name":"dyC2","fmla":"*/ v15 1 v4"},{"name":"v16","fmla":"+- x1I 0 dxC1"},{"name":"v17","fmla":"+- x1I 0 dxC2"},{"name":"v18","fmla":"+- y1I 0 dyC1"},{"name":"v19","fmla":"+- y1I 0 dyC2"},{"name":"v20","fmla":"mod v16 v18 0"},{"name":"v21","fmla":"mod v17 v19 0"},{"name":"v22","fmla":"+- v21 0 v20"},{"name":"dxC","fmla":"?: v22 dxC1 dxC2"},{"name":"dyC","fmla":"?: v22 dyC1 dyC2"},{"name":"sdxC","fmla":"*/ dxC rw2 rI"},{"name":"sdyC","fmla":"*/ dyC rh2 rI"},{"name":"xC","fmla":"+- hc sdxC 0"},{"name":"yC","fmla":"+- vc sdyC 0"},{"name":"wtI","fmla":"sin rw3 stAng"},{"name":"htI","fmla":"cos rh3 stAng"},{"name":"dxI","fmla":"cat2 rw3 htI wtI"},{"name":"dyI","fmla":"sat2 rh3 htI wtI"},{"name":"xI","fmla":"+- hc dxI 0"},{"name":"yI","fmla":"+- vc dyI 0"},{"name":"lptAng","fmla":"+- stAng 0 aAng"},{"name":"wtL","fmla":"sin rw3 lptAng"},{"name":"htL","fmla":"cos rh3 lptAng"},{"name":"dxL","fmla":"cat2 rw3 htL wtL"},{"name":"dyL","fmla":"sat2 rh3 htL wtL"},{"name":"xL","fmla":"+- hc dxL 0"},{"name":"yL","fmla":"+- vc dyL 0"},{"name":"dxK","fmla":"cos thh lptAng"},{"name":"dyK","fmla":"sin thh lptAng"},{"name":"xK","fmla":"+- xI dxK 0"},{"name":"yK","fmla":"+- yI dyK 0"},{"name":"dxJ","fmla":"cos thh lptAng"},{"name":"dyJ","fmla":"sin thh lptAng"},{"name":"xJ","fmla":"+- xI 0 dxJ 0"},{"name":"yJ","fmla":"+- yI 0 dyJ 0"},{"name":"p1","fmla":"+- xF 0 xC"},{"name":"p2","fmla":"+- yF 0 yC"},{"name":"p3","fmla":"mod p1 p2 0"},{"name":"p4","fmla":"*/ p3 1 2"},{"name":"p5","fmla":"+- p4 0 thh"},{"name":"xGp","fmla":"?: p5 xF xG"},{"name":"yGp","fmla":"?: p5 yF yG"},{"name":"xBp","fmla":"?: p5 xC xB"},{"name":"yBp","fmla":"?: p5 yC yB"},{"name":"en0","fmla":"at2 sdxF sdyF"},{"name":"en1","fmla":"+- en0 21600000 0"},{"name":"en2","fmla":"?: en0 en0 en1"},{"name":"od0","fmla":"+- en2 0 enAng"},{"name":"od1","fmla":"+- od0 21600000 0"},{"name":"od2","fmla":"?: od0 od0 od1"},{"name":"st0","fmla":"+- stAng 0 od2"},{"name":"st1","fmla":"+- st0 21600000 0"},{"name":"st2","fmla":"?: st0 st0 st1"},{"name":"sw0","fmla":"+- en2 0 st2"},{"name":"sw1","fmla":"+- sw0 21600000 0"},{"name":"swAng","fmla":"?: sw0 sw0 sw1"},{"name":"ist0","fmla":"at2 sdxC sdyC"},{"name":"ist1","fmla":"+- ist0 21600000 0"},{"name":"istAng","fmla":"?: ist0 ist0 ist1"},{"name":"id0","fmla":"+- istAng 0 enAng"},{"name":"id1","fmla":"+- id0 0 21600000"},{"name":"id2","fmla":"?: id0 id1 id0"},{"name":"ien0","fmla":"+- stAng 0 id2"},{"name":"ien1","fmla":"+- ien0 0 21600000"},{"name":"ien2","fmla":"?: ien1 ien1 ien0"},{"name":"isw1","fmla":"+- ien2 0 istAng"},{"name":"isw2","fmla":"+- isw1 0 21600000"},{"name":"iswAng","fmla":"?: isw1 isw2 isw1"},{"name":"wtE","fmla":"sin rw1 st2"},{"name":"htE","fmla":"cos rh1 st2"},{"name":"dxE","fmla":"cat2 rw1 htE wtE"},{"name":"dyE","fmla":"sat2 rh1 htE wtE"},{"name":"xE","fmla":"+- hc dxE 0"},{"name":"yE","fmla":"+- vc dyE 0"},{"name":"wtD","fmla":"sin rw2 ien2"},{"name":"htD","fmla":"cos rh2 ien2"},{"name":"dxD","fmla":"cat2 rw2 htD wtD"},{"name":"dyD","fmla":"sat2 rh2 htD wtD"},{"name":"xD","fmla":"+- hc dxD 0"},{"name":"yD","fmla":"+- vc dyD 0"},{"name":"xKp","fmla":"?: p5 xE xK"},{"name":"yKp","fmla":"?: p5 yE yK"},{"name":"xJp","fmla":"?: p5 xD xJ"},{"name":"yJp","fmla":"?: p5 yD yJ"},{"name":"aL","fmla":"+- lptAng 0 cd4"},{"name":"aA","fmla":"+- ptAng cd4 0"},{"name":"aB","fmla":"+- ptAng cd2 0"},{"name":"aJ","fmla":"+- lptAng cd2 0"},{"name":"idx","fmla":"cos rw1 2700000"},{"name":"idy","fmla":"sin rh1 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xL","y":"yL"}]},{"c":"L","pts":[{"x":"xKp","y":"yKp"}]},{"c":"L","pts":[{"x":"xE","y":"yE"}]},{"c":"A","wR":"rw1","hR":"rh1","stAng":"st2","swAng":"swAng"},{"c":"L","pts":[{"x":"xGp","y":"yGp"}]},{"c":"L","pts":[{"x":"xA","y":"yA"}]},{"c":"L","pts":[{"x":"xBp","y":"yBp"}]},{"c":"L","pts":[{"x":"xC","y":"yC"}]},{"c":"A","wR":"rw2","hR":"rh2","stAng":"istAng","swAng":"iswAng"},{"c":"L","pts":[{"x":"xJp","y":"yJp"}]},{"c":"Z"}]}]},"leftRightRibbon":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 16667"}],"gd":[{"name":"a3","fmla":"pin 0 adj3 33333"},{"name":"maxAdj1","fmla":"+- 100000 0 a3"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"w1","fmla":"+- wd2 0 wd32"},{"name":"maxAdj2","fmla":"*/ 100000 w1 ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"x1","fmla":"*/ ss a2 100000"},{"name":"x4","fmla":"+- r 0 x1"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"dy2","fmla":"*/ h a3 -200000"},{"name":"ly1","fmla":"+- vc dy2 dy1"},{"name":"ry4","fmla":"+- vc dy1 dy2"},{"name":"ly2","fmla":"+- ly1 dy1 0"},{"name":"ry3","fmla":"+- b 0 ly2"},{"name":"ly4","fmla":"*/ ly2 2 1"},{"name":"ry1","fmla":"+- b 0 ly4"},{"name":"ly3","fmla":"+- ly4 0 ly1"},{"name":"ry2","fmla":"+- b 0 ly3"},{"name":"hR","fmla":"*/ a3 ss 400000"},{"name":"x2","fmla":"+- hc 0 wd32"},{"name":"x3","fmla":"+- hc wd32 0"},{"name":"y1","fmla":"+- ly1 hR 0"},{"name":"y2","fmla":"+- ry2 0 hR"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"ly2"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"ly1"}]},{"c":"L","pts":[{"x":"hc","y":"ly1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x4","y":"ry2"}]},{"c":"L","pts":[{"x":"x4","y":"ry1"}]},{"c":"L","pts":[{"x":"r","y":"ry3"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"L","pts":[{"x":"x4","y":"ry4"}]},{"c":"L","pts":[{"x":"hc","y":"ry4"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"ly3"}]},{"c":"L","pts":[{"x":"x1","y":"ly3"}]},{"c":"L","pts":[{"x":"x1","y":"ly4"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x3","y":"ry2"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"ly2"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"ly1"}]},{"c":"L","pts":[{"x":"hc","y":"ly1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x4","y":"ry2"}]},{"c":"L","pts":[{"x":"x4","y":"ry1"}]},{"c":"L","pts":[{"x":"r","y":"ry3"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"L","pts":[{"x":"x4","y":"ry4"}]},{"c":"L","pts":[{"x":"hc","y":"ry4"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"ly3"}]},{"c":"L","pts":[{"x":"x1","y":"ly3"}]},{"c":"L","pts":[{"x":"x1","y":"ly4"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"ry2"}]},{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"ly3"}]}]}]},"leftRightUpArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"q1","fmla":"+- 100000 0 maxAdj1"},{"name":"maxAdj3","fmla":"*/ q1 1 2"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"x1","fmla":"*/ ss a3 100000"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x5","fmla":"+- hc dx2 0"},{"name":"dx3","fmla":"*/ ss a1 200000"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc dx3 0"},{"name":"x6","fmla":"+- r 0 x1"},{"name":"dy2","fmla":"*/ ss a2 50000"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"y4","fmla":"+- b 0 dx2"},{"name":"y3","fmla":"+- y4 0 dx3"},{"name":"y5","fmla":"+- y4 dx3 0"},{"name":"il","fmla":"*/ dx3 x1 dx2"},{"name":"ir","fmla":"+- r 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x5","y":"x1"}]},{"c":"L","pts":[{"x":"x4","y":"x1"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x6","y":"y3"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x6","y":"b"}]},{"c":"L","pts":[{"x":"x6","y":"y5"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"Z"}]}]},"leftUpArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"+- 100000 0 maxAdj1"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"x1","fmla":"*/ ss a3 100000"},{"name":"dx2","fmla":"*/ ss a2 50000"},{"name":"x2","fmla":"+- r 0 dx2"},{"name":"y2","fmla":"+- b 0 dx2"},{"name":"dx4","fmla":"*/ ss a2 100000"},{"name":"x4","fmla":"+- r 0 dx4"},{"name":"y4","fmla":"+- b 0 dx4"},{"name":"dx3","fmla":"*/ ss a1 200000"},{"name":"x3","fmla":"+- x4 0 dx3"},{"name":"x5","fmla":"+- x4 dx3 0"},{"name":"y3","fmla":"+- y4 0 dx3"},{"name":"y5","fmla":"+- y4 dx3 0"},{"name":"il","fmla":"*/ dx3 x1 dx4"},{"name":"cx1","fmla":"+/ x1 x5 2"},{"name":"cy1","fmla":"+/ x1 y5 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"x4","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"x1"}]},{"c":"L","pts":[{"x":"x5","y":"x1"}]},{"c":"L","pts":[{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"Z"}]}]},"lightningBolt":{"gd":[{"name":"x1","fmla":"*/ w 5022 21600"},{"name":"x3","fmla":"*/ w 8472 21600"},{"name":"x4","fmla":"*/ w 8757 21600"},{"name":"x5","fmla":"*/ w 10012 21600"},{"name":"x8","fmla":"*/ w 12860 21600"},{"name":"x9","fmla":"*/ w 13917 21600"},{"name":"x11","fmla":"*/ w 16577 21600"},{"name":"y1","fmla":"*/ h 3890 21600"},{"name":"y2","fmla":"*/ h 6080 21600"},{"name":"y4","fmla":"*/ h 7437 21600"},{"name":"y6","fmla":"*/ h 9705 21600"},{"name":"y7","fmla":"*/ h 12007 21600"},{"name":"y10","fmla":"*/ h 14277 21600"},{"name":"y11","fmla":"*/ h 14915 21600"}],"paths":[{"w":21600,"h":21600,"cmds":[{"c":"M","pts":[{"x":"8472","y":"0"}]},{"c":"L","pts":[{"x":"12860","y":"6080"}]},{"c":"L","pts":[{"x":"11050","y":"6797"}]},{"c":"L","pts":[{"x":"16577","y":"12007"}]},{"c":"L","pts":[{"x":"14767","y":"12877"}]},{"c":"L","pts":[{"x":"21600","y":"21600"}]},{"c":"L","pts":[{"x":"10012","y":"14915"}]},{"c":"L","pts":[{"x":"12222","y":"13987"}]},{"c":"L","pts":[{"x":"5022","y":"9705"}]},{"c":"L","pts":[{"x":"7602","y":"8382"}]},{"c":"L","pts":[{"x":"0","y":"3890"}]},{"c":"Z"}]}]},"line":{"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"lineInv":{"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]}]},"mathDivide":{"av":[{"name":"adj1","fmla":"val 23520"},{"name":"adj2","fmla":"val 5880"},{"name":"adj3","fmla":"val 11760"}],"gd":[{"name":"a1","fmla":"pin 1000 adj1 36745"},{"name":"ma1","fmla":"+- 0 0 a1"},{"name":"ma3h","fmla":"+/ 73490 ma1 4"},{"name":"ma3w","fmla":"*/ 36745 w h"},{"name":"maxAdj3","fmla":"min ma3h ma3w"},{"name":"a3","fmla":"pin 1000 adj3 maxAdj3"},{"name":"m4a3","fmla":"*/ -4 a3 1"},{"name":"maxAdj2","fmla":"+- 73490 m4a3 a1"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"yg","fmla":"*/ h a2 100000"},{"name":"rad","fmla":"*/ h a3 100000"},{"name":"dx1","fmla":"*/ w 73490 200000"},{"name":"y3","fmla":"+- vc 0 dy1"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"a","fmla":"+- yg rad 0"},{"name":"y2","fmla":"+- y3 0 a"},{"name":"y1","fmla":"+- y2 0 rad"},{"name":"y5","fmla":"+- b 0 y1"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x3","fmla":"+- hc dx1 0"},{"name":"x2","fmla":"+- hc 0 rad"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"hc","y":"y1"}]},{"c":"A","wR":"rad","hR":"rad","stAng":"3cd4","swAng":"21600000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"y5"}]},{"c":"A","wR":"rad","hR":"rad","stAng":"cd4","swAng":"21600000"},{"c":"Z"},{"c":"M","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"Z"}]}]},"mathEqual":{"av":[{"name":"adj1","fmla":"val 23520"},{"name":"adj2","fmla":"val 11760"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 36745"},{"name":"2a1","fmla":"*/ a1 2 1"},{"name":"mAdj2","fmla":"+- 100000 0 2a1"},{"name":"a2","fmla":"pin 0 adj2 mAdj2"},{"name":"dy1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ h a2 200000"},{"name":"dx1","fmla":"*/ w 73490 200000"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y1","fmla":"+- y2 0 dy1"},{"name":"y4","fmla":"+- y3 dy1 0"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"yC1","fmla":"+/ y1 y2 2"},{"name":"yC2","fmla":"+/ y3 y4 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"Z"}]}]},"mathMinus":{"av":[{"name":"adj1","fmla":"val 23520"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"dx1","fmla":"*/ w 73490 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"}]}]},"mathMultiply":{"av":[{"name":"adj1","fmla":"val 23520"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 51965"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"a","fmla":"at2 w h"},{"name":"sa","fmla":"sin 1 a"},{"name":"ca","fmla":"cos 1 a"},{"name":"ta","fmla":"tan 1 a"},{"name":"dl","fmla":"mod w h 0"},{"name":"rw","fmla":"*/ dl 51965 100000"},{"name":"lM","fmla":"+- dl 0 rw"},{"name":"xM","fmla":"*/ ca lM 2"},{"name":"yM","fmla":"*/ sa lM 2"},{"name":"dxAM","fmla":"*/ sa th 2"},{"name":"dyAM","fmla":"*/ ca th 2"},{"name":"xA","fmla":"+- xM 0 dxAM"},{"name":"yA","fmla":"+- yM dyAM 0"},{"name":"xB","fmla":"+- xM dxAM 0"},{"name":"yB","fmla":"+- yM 0 dyAM"},{"name":"xBC","fmla":"+- hc 0 xB"},{"name":"yBC","fmla":"*/ xBC ta 1"},{"name":"yC","fmla":"+- yBC yB 0"},{"name":"xD","fmla":"+- r 0 xB"},{"name":"xE","fmla":"+- r 0 xA"},{"name":"yFE","fmla":"+- vc 0 yA"},{"name":"xFE","fmla":"*/ yFE 1 ta"},{"name":"xF","fmla":"+- xE 0 xFE"},{"name":"xL","fmla":"+- xA xFE 0"},{"name":"yG","fmla":"+- b 0 yA"},{"name":"yH","fmla":"+- b 0 yB"},{"name":"yI","fmla":"+- b 0 yC"},{"name":"xC2","fmla":"+- r 0 xM"},{"name":"yC3","fmla":"+- b 0 yM"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xA","y":"yA"}]},{"c":"L","pts":[{"x":"xB","y":"yB"}]},{"c":"L","pts":[{"x":"hc","y":"yC"}]},{"c":"L","pts":[{"x":"xD","y":"yB"}]},{"c":"L","pts":[{"x":"xE","y":"yA"}]},{"c":"L","pts":[{"x":"xF","y":"vc"}]},{"c":"L","pts":[{"x":"xE","y":"yG"}]},{"c":"L","pts":[{"x":"xD","y":"yH"}]},{"c":"L","pts":[{"x":"hc","y":"yI"}]},{"c":"L","pts":[{"x":"xB","y":"yH"}]},{"c":"L","pts":[{"x":"xA","y":"yG"}]},{"c":"L","pts":[{"x":"xL","y":"vc"}]},{"c":"Z"}]}]},"mathNotEqual":{"av":[{"name":"adj1","fmla":"val 23520"},{"name":"adj2","fmla":"val 6600000"},{"name":"adj3","fmla":"val 11760"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"crAng","fmla":"pin 4200000 adj2 6600000"},{"name":"2a1","fmla":"*/ a1 2 1"},{"name":"maxAdj3","fmla":"+- 100000 0 2a1"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"dy1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ h a3 200000"},{"name":"dx1","fmla":"*/ w 73490 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x8","fmla":"+- hc dx1 0"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y1","fmla":"+- y2 0 dy1"},{"name":"y4","fmla":"+- y3 dy1 0"},{"name":"cadj2","fmla":"+- crAng 0 cd4"},{"name":"xadj2","fmla":"tan hd2 cadj2"},{"name":"len","fmla":"mod xadj2 hd2 0"},{"name":"bhw","fmla":"*/ len dy1 hd2"},{"name":"bhw2","fmla":"*/ bhw 1 2"},{"name":"x7","fmla":"+- hc xadj2 bhw2"},{"name":"dx67","fmla":"*/ xadj2 y1 hd2"},{"name":"x6","fmla":"+- x7 0 dx67"},{"name":"dx57","fmla":"*/ xadj2 y2 hd2"},{"name":"x5","fmla":"+- x7 0 dx57"},{"name":"dx47","fmla":"*/ xadj2 y3 hd2"},{"name":"x4","fmla":"+- x7 0 dx47"},{"name":"dx37","fmla":"*/ xadj2 y4 hd2"},{"name":"x3","fmla":"+- x7 0 dx37"},{"name":"dx27","fmla":"*/ xadj2 2 1"},{"name":"x2","fmla":"+- x7 0 dx27"},{"name":"rx7","fmla":"+- x7 bhw 0"},{"name":"rx6","fmla":"+- x6 bhw 0"},{"name":"rx5","fmla":"+- x5 bhw 0"},{"name":"rx4","fmla":"+- x4 bhw 0"},{"name":"rx3","fmla":"+- x3 bhw 0"},{"name":"rx2","fmla":"+- x2 bhw 0"},{"name":"dx7","fmla":"*/ dy1 hd2 len"},{"name":"rxt","fmla":"+- x7 dx7 0"},{"name":"lxt","fmla":"+- rx7 0 dx7"},{"name":"rx","fmla":"?: cadj2 rxt rx7"},{"name":"lx","fmla":"?: cadj2 x7 lxt"},{"name":"dy3","fmla":"*/ dy1 xadj2 len"},{"name":"dy4","fmla":"+- 0 0 dy3"},{"name":"ry","fmla":"?: cadj2 dy3 t"},{"name":"ly","fmla":"?: cadj2 t dy4"},{"name":"dlx","fmla":"+- w 0 rx"},{"name":"drx","fmla":"+- w 0 lx"},{"name":"dly","fmla":"+- h 0 ry"},{"name":"dry","fmla":"+- h 0 ly"},{"name":"xC1","fmla":"+/ rx lx 2"},{"name":"xC2","fmla":"+/ drx dlx 2"},{"name":"yC1","fmla":"+/ ry ly 2"},{"name":"yC2","fmla":"+/ y1 y2 2"},{"name":"yC3","fmla":"+/ y3 y4 2"},{"name":"yC4","fmla":"+/ dry dly 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x6","y":"y1"}]},{"c":"L","pts":[{"x":"lx","y":"ly"}]},{"c":"L","pts":[{"x":"rx","y":"ry"}]},{"c":"L","pts":[{"x":"rx6","y":"y1"}]},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"x8","y":"y2"}]},{"c":"L","pts":[{"x":"rx5","y":"y2"}]},{"c":"L","pts":[{"x":"rx4","y":"y3"}]},{"c":"L","pts":[{"x":"x8","y":"y3"}]},{"c":"L","pts":[{"x":"x8","y":"y4"}]},{"c":"L","pts":[{"x":"rx3","y":"y4"}]},{"c":"L","pts":[{"x":"drx","y":"dry"}]},{"c":"L","pts":[{"x":"dlx","y":"dly"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"}]}]},"mathPlus":{"av":[{"name":"adj1","fmla":"val 23520"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 73490"},{"name":"dx1","fmla":"*/ w 73490 200000"},{"name":"dy1","fmla":"*/ h 73490 200000"},{"name":"dx2","fmla":"*/ ss a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dx2"},{"name":"y3","fmla":"+- vc dx2 0"},{"name":"y4","fmla":"+- vc dy1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"Z"}]}]},"moon":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 87500"},{"name":"g0","fmla":"*/ ss a 100000"},{"name":"g0w","fmla":"*/ g0 w ss"},{"name":"g1","fmla":"+- ss 0 g0"},{"name":"g2","fmla":"*/ g0 g0 g1"},{"name":"g3","fmla":"*/ ss ss g1"},{"name":"g4","fmla":"*/ g3 2 1"},{"name":"g5","fmla":"+- g4 0 g2"},{"name":"g6","fmla":"+- g5 0 g0"},{"name":"g6w","fmla":"*/ g6 w ss"},{"name":"g7","fmla":"*/ g5 1 2"},{"name":"g8","fmla":"+- g7 0 g0"},{"name":"dy1","fmla":"*/ g8 hd2 ss"},{"name":"g10h","fmla":"+- vc 0 dy1"},{"name":"g11h","fmla":"+- vc dy1 0"},{"name":"g12","fmla":"*/ g0 9598 32768"},{"name":"g12w","fmla":"*/ g12 w ss"},{"name":"g13","fmla":"+- ss 0 g12"},{"name":"q1","fmla":"*/ ss ss 1"},{"name":"q2","fmla":"*/ g13 g13 1"},{"name":"q3","fmla":"+- q1 0 q2"},{"name":"q4","fmla":"sqrt q3"},{"name":"dy4","fmla":"*/ q4 hd2 ss"},{"name":"g15h","fmla":"+- vc 0 dy4"},{"name":"g16h","fmla":"+- vc dy4 0"},{"name":"g17w","fmla":"+- g6w 0 g0w"},{"name":"g18w","fmla":"*/ g17w 1 2"},{"name":"dx2p","fmla":"+- g0w g18w w"},{"name":"dx2","fmla":"*/ dx2p -1 1"},{"name":"dy2","fmla":"*/ hd2 -1 1"},{"name":"stAng1","fmla":"at2 dx2 dy2"},{"name":"enAngp1","fmla":"at2 dx2 hd2"},{"name":"enAng1","fmla":"+- enAngp1 0 21600000"},{"name":"swAng1","fmla":"+- enAng1 0 stAng1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"A","wR":"w","hR":"hd2","stAng":"cd4","swAng":"cd2"},{"c":"A","wR":"g18w","hR":"dy1","stAng":"stAng1","swAng":"swAng1"},{"c":"Z"}]}]},"nonIsoscelesTrapezoid":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 w ss"},{"name":"a1","fmla":"pin 0 adj1 maxAdj"},{"name":"a2","fmla":"pin 0 adj2 maxAdj"},{"name":"x1","fmla":"*/ ss a1 200000"},{"name":"x2","fmla":"*/ ss a1 100000"},{"name":"dx3","fmla":"*/ ss a2 100000"},{"name":"x3","fmla":"+- r 0 dx3"},{"name":"x4","fmla":"+/ r x3 2"},{"name":"il","fmla":"*/ wd3 a1 maxAdj"},{"name":"adjm","fmla":"max a1 a2"},{"name":"it","fmla":"*/ hd3 adjm maxAdj"},{"name":"irt","fmla":"*/ wd3 a2 maxAdj"},{"name":"ir","fmla":"+- r 0 irt"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"noSmoking":{"av":[{"name":"adj","fmla":"val 18750"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dr","fmla":"*/ ss a 100000"},{"name":"iwd2","fmla":"+- wd2 0 dr"},{"name":"ihd2","fmla":"+- hd2 0 dr"},{"name":"ang","fmla":"at2 w h"},{"name":"ct","fmla":"cos ihd2 ang"},{"name":"st","fmla":"sin iwd2 ang"},{"name":"m","fmla":"mod ct st 0"},{"name":"n","fmla":"*/ iwd2 ihd2 m"},{"name":"drd2","fmla":"*/ dr 1 2"},{"name":"dang","fmla":"at2 n drd2"},{"name":"2dang","fmla":"*/ dang 2 1"},{"name":"swAng","fmla":"+- -10800000 2dang 0"},{"name":"t3","fmla":"at2 w h"},{"name":"stAng1","fmla":"+- t3 0 dang"},{"name":"stAng2","fmla":"+- stAng1 0 cd2"},{"name":"ct1","fmla":"cos ihd2 stAng1"},{"name":"st1","fmla":"sin iwd2 stAng1"},{"name":"m1","fmla":"mod ct1 st1 0"},{"name":"n1","fmla":"*/ iwd2 ihd2 m1"},{"name":"dx1","fmla":"cos n1 stAng1"},{"name":"dy1","fmla":"sin n1 stAng1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"x2","fmla":"+- hc 0 dx1"},{"name":"y2","fmla":"+- vc 0 dy1"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"},{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"stAng1","swAng":"swAng"},{"c":"Z"},{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"stAng2","swAng":"swAng"},{"c":"Z"}]}]},"notchedRightArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 w ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- r 0 dx2"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"x1","fmla":"*/ dy1 dx2 hd2"},{"name":"x3","fmla":"+- r 0 x1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"vc"}]},{"c":"Z"}]}]},"octagon":{"av":[{"name":"adj","fmla":"val 29289"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"},{"name":"il","fmla":"*/ x1 1 2"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"x1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"Z"}]}]},"parallelogram":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"maxAdj","fmla":"*/ 100000 w ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"x1","fmla":"*/ ss a 200000"},{"name":"x2","fmla":"*/ ss a 100000"},{"name":"x6","fmla":"+- r 0 x1"},{"name":"x5","fmla":"+- r 0 x2"},{"name":"x3","fmla":"*/ x5 1 2"},{"name":"x4","fmla":"+- r 0 x3"},{"name":"il","fmla":"*/ wd2 a maxAdj"},{"name":"q1","fmla":"*/ 5 a maxAdj"},{"name":"q2","fmla":"+/ 1 q1 12"},{"name":"il","fmla":"*/ q2 w 1"},{"name":"it","fmla":"*/ q2 h 1"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 it"},{"name":"q3","fmla":"*/ h hc x2"},{"name":"y1","fmla":"pin 0 q3 h"},{"name":"y2","fmla":"+- b 0 y1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x5","y":"b"}]},{"c":"Z"}]}]},"pentagon":{"av":[{"name":"hf","fmla":"val 105146"},{"name":"vf","fmla":"val 110557"}],"gd":[{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"svc","fmla":"*/ vc  vf 100000"},{"name":"dx1","fmla":"cos swd2 1080000"},{"name":"dx2","fmla":"cos swd2 18360000"},{"name":"dy1","fmla":"sin shd2 1080000"},{"name":"dy2","fmla":"sin shd2 18360000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- svc 0 dy1"},{"name":"y2","fmla":"+- svc 0 dy2"},{"name":"it","fmla":"*/ y1 dx2 dx1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"Z"}]}]},"pie":{"av":[{"name":"adj1","fmla":"val 0"},{"name":"adj2","fmla":"val 16200000"}],"gd":[{"name":"stAng","fmla":"pin 0 adj1 21599999"},{"name":"enAng","fmla":"pin 0 adj2 21599999"},{"name":"sw1","fmla":"+- enAng 0 stAng"},{"name":"sw2","fmla":"+- sw1 21600000 0"},{"name":"swAng","fmla":"?: sw1 sw1 sw2"},{"name":"wt1","fmla":"sin wd2 stAng"},{"name":"ht1","fmla":"cos hd2 stAng"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"wt2","fmla":"sin wd2 enAng"},{"name":"ht2","fmla":"cos hd2 enAng"},{"name":"dx2","fmla":"cat2 wd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 hd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"},{"c":"L","pts":[{"x":"hc","y":"vc"}]},{"c":"Z"}]}]},"pieWedge":{"gd":[{"name":"g1","fmla":"cos w 13500000"},{"name":"g2","fmla":"sin h 13500000"},{"name":"x1","fmla":"+- r g1 0"},{"name":"y1","fmla":"+- b g2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"A","wR":"w","hR":"h","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"plaque":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"},{"name":"il","fmla":"*/ x1 70711 100000"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"-5400000"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"-5400000"},{"c":"Z"}]}]},"plaqueTabs":{"gd":[{"name":"md","fmla":"mod w h 0"},{"name":"dx","fmla":"*/ 1 md 20"},{"name":"y1","fmla":"+- 0 b dx"},{"name":"x1","fmla":"+- 0 r dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"dx","y":"t"}]},{"c":"A","wR":"dx","hR":"dx","stAng":"0","swAng":"cd4"},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"dx","hR":"dx","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"dx"}]},{"c":"A","wR":"dx","hR":"dx","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"b"}]},{"c":"A","wR":"dx","hR":"dx","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"plus":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"},{"name":"d","fmla":"+- w 0 h"},{"name":"il","fmla":"?: d l x1"},{"name":"ir","fmla":"?: d r x2"},{"name":"it","fmla":"?: d x1 t"},{"name":"ib","fmla":"?: d y2 b"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"r","y":"x1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"Z"}]}]},"quadArrow":{"av":[{"name":"adj1","fmla":"val 22500"},{"name":"adj2","fmla":"val 22500"},{"name":"adj3","fmla":"val 22500"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"q1","fmla":"+- 100000 0 maxAdj1"},{"name":"maxAdj3","fmla":"*/ q1 1 2"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"x1","fmla":"*/ ss a3 100000"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x5","fmla":"+- hc dx2 0"},{"name":"dx3","fmla":"*/ ss a1 200000"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc dx3 0"},{"name":"x6","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- vc 0 dx2"},{"name":"y5","fmla":"+- vc dx2 0"},{"name":"y3","fmla":"+- vc 0 dx3"},{"name":"y4","fmla":"+- vc dx3 0"},{"name":"y6","fmla":"+- b 0 x1"},{"name":"il","fmla":"*/ dx3 x1 dx2"},{"name":"ir","fmla":"+- r 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x5","y":"x1"}]},{"c":"L","pts":[{"x":"x4","y":"x1"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x6","y":"y3"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x6","y":"y5"}]},{"c":"L","pts":[{"x":"x6","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y6"}]},{"c":"L","pts":[{"x":"x5","y":"y6"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y6"}]},{"c":"L","pts":[{"x":"x3","y":"y6"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"Z"}]}]},"quadArrowCallout":{"av":[{"name":"adj1","fmla":"val 18515"},{"name":"adj2","fmla":"val 18515"},{"name":"adj3","fmla":"val 18515"},{"name":"adj4","fmla":"val 48123"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"+- 50000 0 a2"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 2 1"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin a1 adj4 maxAdj4"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"dx3","fmla":"*/ ss a1 200000"},{"name":"ah","fmla":"*/ ss a3 100000"},{"name":"dx1","fmla":"*/ w a4 200000"},{"name":"dy1","fmla":"*/ h a4 200000"},{"name":"x8","fmla":"+- r 0 ah"},{"name":"x2","fmla":"+- hc 0 dx1"},{"name":"x7","fmla":"+- hc dx1 0"},{"name":"x3","fmla":"+- hc 0 dx2"},{"name":"x6","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc 0 dx3"},{"name":"x5","fmla":"+- hc dx3 0"},{"name":"y8","fmla":"+- b 0 ah"},{"name":"y2","fmla":"+- vc 0 dy1"},{"name":"y7","fmla":"+- vc dy1 0"},{"name":"y3","fmla":"+- vc 0 dx2"},{"name":"y6","fmla":"+- vc dx2 0"},{"name":"y4","fmla":"+- vc 0 dx3"},{"name":"y5","fmla":"+- vc dx3 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"ah","y":"y3"}]},{"c":"L","pts":[{"x":"ah","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"ah"}]},{"c":"L","pts":[{"x":"x3","y":"ah"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x6","y":"ah"}]},{"c":"L","pts":[{"x":"x5","y":"ah"}]},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"L","pts":[{"x":"x7","y":"y2"}]},{"c":"L","pts":[{"x":"x7","y":"y4"}]},{"c":"L","pts":[{"x":"x8","y":"y4"}]},{"c":"L","pts":[{"x":"x8","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x8","y":"y6"}]},{"c":"L","pts":[{"x":"x8","y":"y5"}]},{"c":"L","pts":[{"x":"x7","y":"y5"}]},{"c":"L","pts":[{"x":"x7","y":"y7"}]},{"c":"L","pts":[{"x":"x5","y":"y7"}]},{"c":"L","pts":[{"x":"x5","y":"y8"}]},{"c":"L","pts":[{"x":"x6","y":"y8"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"x3","y":"y8"}]},{"c":"L","pts":[{"x":"x4","y":"y8"}]},{"c":"L","pts":[{"x":"x4","y":"y7"}]},{"c":"L","pts":[{"x":"x2","y":"y7"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"L","pts":[{"x":"ah","y":"y5"}]},{"c":"L","pts":[{"x":"ah","y":"y6"}]},{"c":"Z"}]}]},"rect":{"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"ribbon":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 33333"},{"name":"a2","fmla":"pin 25000 adj2 75000"},{"name":"x10","fmla":"+- r 0 wd8"},{"name":"dx2","fmla":"*/ w a2 200000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x9","fmla":"+- hc dx2 0"},{"name":"x3","fmla":"+- x2 wd32 0"},{"name":"x8","fmla":"+- x9 0 wd32"},{"name":"x5","fmla":"+- x2 wd8 0"},{"name":"x6","fmla":"+- x9 0 wd8"},{"name":"x4","fmla":"+- x5 0 wd32"},{"name":"x7","fmla":"+- x6 wd32 0"},{"name":"y1","fmla":"*/ h a1 200000"},{"name":"y2","fmla":"*/ h a1 100000"},{"name":"y4","fmla":"+- b 0 y2"},{"name":"y3","fmla":"*/ y4 1 2"},{"name":"hR","fmla":"*/ h a1 400000"},{"name":"y5","fmla":"+- b 0 hR"},{"name":"y6","fmla":"+- y2 0 hR"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"t"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x8","y":"y2"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x10","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y5"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"wd8","y":"y3"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x5","y":"hR"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x6","y":"hR"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd2","swAng":"-5400000"},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"t"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x8","y":"y2"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x10","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y5"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"wd8","y":"y3"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x5","y":"hR"}]},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"M","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"x6","y":"hR"}]},{"c":"M","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y6"}]},{"c":"M","pts":[{"x":"x9","y":"y6"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]}]}]},"ribbon2":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 33333"},{"name":"a2","fmla":"pin 25000 adj2 75000"},{"name":"x10","fmla":"+- r 0 wd8"},{"name":"dx2","fmla":"*/ w a2 200000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x9","fmla":"+- hc dx2 0"},{"name":"x3","fmla":"+- x2 wd32 0"},{"name":"x8","fmla":"+- x9 0 wd32"},{"name":"x5","fmla":"+- x2 wd8 0"},{"name":"x6","fmla":"+- x9 0 wd8"},{"name":"x4","fmla":"+- x5 0 wd32"},{"name":"x7","fmla":"+- x6 wd32 0"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- b 0 dy1"},{"name":"dy2","fmla":"*/ h a1 100000"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"y4","fmla":"+- t dy2 0"},{"name":"y3","fmla":"+/ y4 b 2"},{"name":"hR","fmla":"*/ h a1 400000"},{"name":"y6","fmla":"+- b 0 hR"},{"name":"y7","fmla":"+- y1 0 hR"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x8","y":"y2"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x10","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"hR"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"-5400000"},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"wd8","y":"y3"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x5","y":"y6"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"-5400000"},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x6","y":"y6"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"wd8","y":"y3"}]},{"c":"L","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"hR"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x8","y":"t"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x10","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x7","y":"b"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"Z"},{"c":"M","pts":[{"x":"x5","y":"y2"}]},{"c":"L","pts":[{"x":"x5","y":"y6"}]},{"c":"M","pts":[{"x":"x6","y":"y6"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"M","pts":[{"x":"x2","y":"y7"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"M","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y7"}]}]}]},"rightArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 w ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dx1","fmla":"*/ ss a2 100000"},{"name":"x1","fmla":"+- r 0 dx1"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"dx2","fmla":"*/ y1 dx1 hd2"},{"name":"x2","fmla":"+- x1 dx2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"Z"}]}]},"rightArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 64977"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 100000 w ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss w"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dy1","fmla":"*/ ss a2 100000"},{"name":"dy2","fmla":"*/ ss a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"dx3","fmla":"*/ ss a3 100000"},{"name":"x3","fmla":"+- r 0 dx3"},{"name":"x2","fmla":"*/ w a4 100000"},{"name":"x1","fmla":"*/ x2 1 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"rightBrace":{"av":[{"name":"adj1","fmla":"val 8333"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 100000"},{"name":"q1","fmla":"+- 100000 0 a2"},{"name":"q2","fmla":"min q1 a2"},{"name":"q3","fmla":"*/ q2 1 2"},{"name":"maxAdj1","fmla":"*/ q3 h ss"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"y1","fmla":"*/ ss a1 100000"},{"name":"y3","fmla":"*/ h a2 100000"},{"name":"y2","fmla":"+- y3 0 y1"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"dx1","fmla":"cos wd2 2700000"},{"name":"dy1","fmla":"sin y1 2700000"},{"name":"ir","fmla":"+- l dx1 0"},{"name":"it","fmla":"+- y1 0 dy1"},{"name":"ib","fmla":"+- b dy1 y1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"hc","y":"y2"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"-5400000"},{"c":"A","wR":"wd2","hR":"y1","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"y4"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"hc","y":"y2"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"-5400000"},{"c":"A","wR":"wd2","hR":"y1","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"y4"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd4"}]}]},"rightBracket":{"av":[{"name":"adj","fmla":"val 8333"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 h ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"y1","fmla":"*/ ss a 100000"},{"name":"y2","fmla":"+- b 0 y1"},{"name":"dx1","fmla":"cos w 2700000"},{"name":"dy1","fmla":"sin y1 2700000"},{"name":"ir","fmla":"+- l dx1 0"},{"name":"it","fmla":"+- y1 0 dy1"},{"name":"ib","fmla":"+- b dy1 y1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"w","hR":"y1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"w","hR":"y1","stAng":"0","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"w","hR":"y1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"w","hR":"y1","stAng":"0","swAng":"cd4"}]}]},"round1Rect":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"*/ ss a 100000"},{"name":"x1","fmla":"+- r 0 dx1"},{"name":"idx","fmla":"*/ dx1 29289 100000"},{"name":"ir","fmla":"+- r 0 idx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"A","wR":"dx1","hR":"dx1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"round2DiagRect":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"x1","fmla":"*/ ss a1 100000"},{"name":"y1","fmla":"+- b 0 x1"},{"name":"a","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- r 0 a"},{"name":"y2","fmla":"+- b 0 a"},{"name":"dx1","fmla":"*/ x1 29289 100000"},{"name":"dx2","fmla":"*/ a 29289 100000"},{"name":"d","fmla":"+- dx1 0 dx2"},{"name":"dx","fmla":"?: d dx1 dx2"},{"name":"ir","fmla":"+- r 0 dx"},{"name":"ib","fmla":"+- b 0 dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"a","hR":"a","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"a","y":"b"}]},{"c":"A","wR":"a","hR":"a","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"Z"}]}]},"round2SameRect":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"tx1","fmla":"*/ ss a1 100000"},{"name":"tx2","fmla":"+- r 0 tx1"},{"name":"bx1","fmla":"*/ ss a2 100000"},{"name":"bx2","fmla":"+- r 0 bx1"},{"name":"by1","fmla":"+- b 0 bx1"},{"name":"d","fmla":"+- tx1 0 bx1"},{"name":"tdx","fmla":"*/ tx1 29289 100000"},{"name":"bdx","fmla":"*/ bx1 29289 100000"},{"name":"il","fmla":"?: d tdx bdx"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 bdx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"tx1","y":"t"}]},{"c":"L","pts":[{"x":"tx2","y":"t"}]},{"c":"A","wR":"tx1","hR":"tx1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"by1"}]},{"c":"A","wR":"bx1","hR":"bx1","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"bx1","y":"b"}]},{"c":"A","wR":"bx1","hR":"bx1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"tx1"}]},{"c":"A","wR":"tx1","hR":"tx1","stAng":"cd2","swAng":"cd4"},{"c":"Z"}]}]},"roundRect":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"},{"name":"il","fmla":"*/ x1 29289 100000"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"rtTriangle":{"gd":[{"name":"it","fmla":"*/ h 7 12"},{"name":"ir","fmla":"*/ w 7 12"},{"name":"ib","fmla":"*/ h 11 12"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"smileyFace":{"av":[{"name":"adj","fmla":"val 4653"}],"gd":[{"name":"a","fmla":"pin -4653 adj 4653"},{"name":"x1","fmla":"*/ w 4969 21699"},{"name":"x2","fmla":"*/ w 6215 21600"},{"name":"x3","fmla":"*/ w 13135 21600"},{"name":"x4","fmla":"*/ w 16640 21600"},{"name":"y1","fmla":"*/ h 7570 21600"},{"name":"y3","fmla":"*/ h 16515 21600"},{"name":"dy2","fmla":"*/ h a 100000"},{"name":"y2","fmla":"+- y3 0 dy2"},{"name":"y4","fmla":"+- y3 dy2 0"},{"name":"dy3","fmla":"*/ h a 50000"},{"name":"y5","fmla":"+- y4 dy3 0"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"},{"name":"wR","fmla":"*/ w 1125 21600"},{"name":"hR","fmla":"*/ h 1125 21600"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"21600000"},{"c":"Z"}]},{"fill":"darkenLess","cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"A","wR":"wR","hR":"hR","stAng":"cd2","swAng":"21600000"},{"c":"M","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wR","hR":"hR","stAng":"cd2","swAng":"21600000"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y2"}]},{"c":"Q","pts":[{"x":"hc","y":"y5"},{"x":"x4","y":"y2"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"21600000"},{"c":"Z"}]}]},"snip1Rect":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"*/ ss a 100000"},{"name":"x1","fmla":"+- r 0 dx1"},{"name":"it","fmla":"*/ dx1 1 2"},{"name":"ir","fmla":"+/ x1 r 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"dx1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"snip2DiagRect":{"av":[{"name":"adj1","fmla":"val 0"},{"name":"adj2","fmla":"val 16667"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"lx1","fmla":"*/ ss a1 100000"},{"name":"lx2","fmla":"+- r 0 lx1"},{"name":"ly1","fmla":"+- b 0 lx1"},{"name":"rx1","fmla":"*/ ss a2 100000"},{"name":"rx2","fmla":"+- r 0 rx1"},{"name":"ry1","fmla":"+- b 0 rx1"},{"name":"d","fmla":"+- lx1 0 rx1"},{"name":"dx","fmla":"?: d lx1 rx1"},{"name":"il","fmla":"*/ dx 1 2"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"lx1","y":"t"}]},{"c":"L","pts":[{"x":"rx2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"rx1"}]},{"c":"L","pts":[{"x":"r","y":"ly1"}]},{"c":"L","pts":[{"x":"lx2","y":"b"}]},{"c":"L","pts":[{"x":"rx1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"ry1"}]},{"c":"L","pts":[{"x":"l","y":"lx1"}]},{"c":"Z"}]}]},"snip2SameRect":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"tx1","fmla":"*/ ss a1 100000"},{"name":"tx2","fmla":"+- r 0 tx1"},{"name":"bx1","fmla":"*/ ss a2 100000"},{"name":"bx2","fmla":"+- r 0 bx1"},{"name":"by1","fmla":"+- b 0 bx1"},{"name":"d","fmla":"+- tx1 0 bx1"},{"name":"dx","fmla":"?: d tx1 bx1"},{"name":"il","fmla":"*/ dx 1 2"},{"name":"ir","fmla":"+- r 0 il"},{"name":"it","fmla":"*/ tx1 1 2"},{"name":"ib","fmla":"+/ by1 b 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"tx1","y":"t"}]},{"c":"L","pts":[{"x":"tx2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"tx1"}]},{"c":"L","pts":[{"x":"r","y":"by1"}]},{"c":"L","pts":[{"x":"bx2","y":"b"}]},{"c":"L","pts":[{"x":"bx1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"by1"}]},{"c":"L","pts":[{"x":"l","y":"tx1"}]},{"c":"Z"}]}]},"snipRoundRect":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 16667"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"x1","fmla":"*/ ss a1 100000"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- r 0 dx2"},{"name":"il","fmla":"*/ x1 29289 100000"},{"name":"ir","fmla":"+/ x2 r 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"dx2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"Z"}]}]},"squareTabs":{"gd":[{"name":"md","fmla":"mod w h 0"},{"name":"dx","fmla":"*/ 1 md 20"},{"name":"y1","fmla":"+- 0 b dx"},{"name":"x1","fmla":"+- 0 r dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"dx","y":"t"}]},{"c":"L","pts":[{"x":"dx","y":"dx"}]},{"c":"L","pts":[{"x":"l","y":"dx"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"dx","y":"y1"}]},{"c":"L","pts":[{"x":"dx","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"dx"}]},{"c":"L","pts":[{"x":"x1","y":"dx"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"Z"}]}]},"star10":{"av":[{"name":"adj","fmla":"val 42533"},{"name":"hf","fmla":"val 105146"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"dx1","fmla":"*/ swd2 95106 100000"},{"name":"dx2","fmla":"*/ swd2 58779 100000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"dy1","fmla":"*/ hd2 80902 100000"},{"name":"dy2","fmla":"*/ hd2 30902 100000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ swd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 80902 100000"},{"name":"sdx2","fmla":"*/ iwd2 30902 100000"},{"name":"sdy1","fmla":"*/ ihd2 95106 100000"},{"name":"sdy2","fmla":"*/ ihd2 58779 100000"},{"name":"sx1","fmla":"+- hc 0 iwd2"},{"name":"sx2","fmla":"+- hc 0 sdx1"},{"name":"sx3","fmla":"+- hc 0 sdx2"},{"name":"sx4","fmla":"+- hc sdx2 0"},{"name":"sx5","fmla":"+- hc sdx1 0"},{"name":"sx6","fmla":"+- hc iwd2 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc sdy2 0"},{"name":"sy4","fmla":"+- vc sdy1 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"sx2","y":"sy2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx4","y":"sy1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"sx5","y":"sy2"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"sx6","y":"vc"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"sx5","y":"sy3"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"sx4","y":"sy4"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx3","y":"sy4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"sx2","y":"sy3"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"sx1","y":"vc"}]},{"c":"Z"}]}]},"star12":{"av":[{"name":"adj","fmla":"val 37500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"cos wd2 1800000"},{"name":"dy1","fmla":"sin hd2 3600000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x3","fmla":"*/ w 3 4"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y3","fmla":"*/ h 3 4"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"cos iwd2 900000"},{"name":"sdx2","fmla":"cos iwd2 2700000"},{"name":"sdx3","fmla":"cos iwd2 4500000"},{"name":"sdy1","fmla":"sin ihd2 4500000"},{"name":"sdy2","fmla":"sin ihd2 2700000"},{"name":"sdy3","fmla":"sin ihd2 900000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc 0 sdx3"},{"name":"sx4","fmla":"+- hc sdx3 0"},{"name":"sx5","fmla":"+- hc sdx2 0"},{"name":"sx6","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc 0 sdy3"},{"name":"sy4","fmla":"+- vc sdy3 0"},{"name":"sy5","fmla":"+- vc sdy2 0"},{"name":"sy6","fmla":"+- vc sdy1 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy3"}]},{"c":"L","pts":[{"x":"x1","y":"hd4"}]},{"c":"L","pts":[{"x":"sx2","y":"sy2"}]},{"c":"L","pts":[{"x":"wd4","y":"y1"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx4","y":"sy1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"sx5","y":"sy2"}]},{"c":"L","pts":[{"x":"x4","y":"hd4"}]},{"c":"L","pts":[{"x":"sx6","y":"sy3"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx6","y":"sy4"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"sx5","y":"sy5"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"sx4","y":"sy6"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx3","y":"sy6"}]},{"c":"L","pts":[{"x":"wd4","y":"y4"}]},{"c":"L","pts":[{"x":"sx2","y":"sy5"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"sx1","y":"sy4"}]},{"c":"Z"}]}]},"star16":{"av":[{"name":"adj","fmla":"val 37500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"*/ wd2 92388 100000"},{"name":"dx2","fmla":"*/ wd2 70711 100000"},{"name":"dx3","fmla":"*/ wd2 38268 100000"},{"name":"dy1","fmla":"*/ hd2 92388 100000"},{"name":"dy2","fmla":"*/ hd2 70711 100000"},{"name":"dy3","fmla":"*/ hd2 38268 100000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc dx3 0"},{"name":"x5","fmla":"+- hc dx2 0"},{"name":"x6","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc 0 dy3"},{"name":"y4","fmla":"+- vc dy3 0"},{"name":"y5","fmla":"+- vc dy2 0"},{"name":"y6","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 98079 100000"},{"name":"sdx2","fmla":"*/ iwd2 83147 100000"},{"name":"sdx3","fmla":"*/ iwd2 55557 100000"},{"name":"sdx4","fmla":"*/ iwd2 19509 100000"},{"name":"sdy1","fmla":"*/ ihd2 98079 100000"},{"name":"sdy2","fmla":"*/ ihd2 83147 100000"},{"name":"sdy3","fmla":"*/ ihd2 55557 100000"},{"name":"sdy4","fmla":"*/ ihd2 19509 100000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc 0 sdx3"},{"name":"sx4","fmla":"+- hc 0 sdx4"},{"name":"sx5","fmla":"+- hc sdx4 0"},{"name":"sx6","fmla":"+- hc sdx3 0"},{"name":"sx7","fmla":"+- hc sdx2 0"},{"name":"sx8","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc 0 sdy3"},{"name":"sy4","fmla":"+- vc 0 sdy4"},{"name":"sy5","fmla":"+- vc sdy4 0"},{"name":"sy6","fmla":"+- vc sdy3 0"},{"name":"sy7","fmla":"+- vc sdy2 0"},{"name":"sy8","fmla":"+- vc sdy1 0"},{"name":"idx","fmla":"cos iwd2 2700000"},{"name":"idy","fmla":"sin ihd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"ib","fmla":"+- vc idy 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy4"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"sx2","y":"sy3"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"sx3","y":"sy2"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"sx4","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx5","y":"sy1"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"sx6","y":"sy2"}]},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"L","pts":[{"x":"sx7","y":"sy3"}]},{"c":"L","pts":[{"x":"x6","y":"y3"}]},{"c":"L","pts":[{"x":"sx8","y":"sy4"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx8","y":"sy5"}]},{"c":"L","pts":[{"x":"x6","y":"y4"}]},{"c":"L","pts":[{"x":"sx7","y":"sy6"}]},{"c":"L","pts":[{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"sx6","y":"sy7"}]},{"c":"L","pts":[{"x":"x4","y":"y6"}]},{"c":"L","pts":[{"x":"sx5","y":"sy8"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx4","y":"sy8"}]},{"c":"L","pts":[{"x":"x3","y":"y6"}]},{"c":"L","pts":[{"x":"sx3","y":"sy7"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"L","pts":[{"x":"sx2","y":"sy6"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"sx1","y":"sy5"}]},{"c":"Z"}]}]},"star24":{"av":[{"name":"adj","fmla":"val 37500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"cos wd2 900000"},{"name":"dx2","fmla":"cos wd2 1800000"},{"name":"dx3","fmla":"cos wd2 2700000"},{"name":"dx4","fmla":"val wd4"},{"name":"dx5","fmla":"cos wd2 4500000"},{"name":"dy1","fmla":"sin hd2 4500000"},{"name":"dy2","fmla":"sin hd2 3600000"},{"name":"dy3","fmla":"sin hd2 2700000"},{"name":"dy4","fmla":"val hd4"},{"name":"dy5","fmla":"sin hd2 900000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc 0 dx4"},{"name":"x5","fmla":"+- hc 0 dx5"},{"name":"x6","fmla":"+- hc dx5 0"},{"name":"x7","fmla":"+- hc dx4 0"},{"name":"x8","fmla":"+- hc dx3 0"},{"name":"x9","fmla":"+- hc dx2 0"},{"name":"x10","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc 0 dy3"},{"name":"y4","fmla":"+- vc 0 dy4"},{"name":"y5","fmla":"+- vc 0 dy5"},{"name":"y6","fmla":"+- vc dy5 0"},{"name":"y7","fmla":"+- vc dy4 0"},{"name":"y8","fmla":"+- vc dy3 0"},{"name":"y9","fmla":"+- vc dy2 0"},{"name":"y10","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 99144 100000"},{"name":"sdx2","fmla":"*/ iwd2 92388 100000"},{"name":"sdx3","fmla":"*/ iwd2 79335 100000"},{"name":"sdx4","fmla":"*/ iwd2 60876 100000"},{"name":"sdx5","fmla":"*/ iwd2 38268 100000"},{"name":"sdx6","fmla":"*/ iwd2 13053 100000"},{"name":"sdy1","fmla":"*/ ihd2 99144 100000"},{"name":"sdy2","fmla":"*/ ihd2 92388 100000"},{"name":"sdy3","fmla":"*/ ihd2 79335 100000"},{"name":"sdy4","fmla":"*/ ihd2 60876 100000"},{"name":"sdy5","fmla":"*/ ihd2 38268 100000"},{"name":"sdy6","fmla":"*/ ihd2 13053 100000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc 0 sdx3"},{"name":"sx4","fmla":"+- hc 0 sdx4"},{"name":"sx5","fmla":"+- hc 0 sdx5"},{"name":"sx6","fmla":"+- hc 0 sdx6"},{"name":"sx7","fmla":"+- hc sdx6 0"},{"name":"sx8","fmla":"+- hc sdx5 0"},{"name":"sx9","fmla":"+- hc sdx4 0"},{"name":"sx10","fmla":"+- hc sdx3 0"},{"name":"sx11","fmla":"+- hc sdx2 0"},{"name":"sx12","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc 0 sdy3"},{"name":"sy4","fmla":"+- vc 0 sdy4"},{"name":"sy5","fmla":"+- vc 0 sdy5"},{"name":"sy6","fmla":"+- vc 0 sdy6"},{"name":"sy7","fmla":"+- vc sdy6 0"},{"name":"sy8","fmla":"+- vc sdy5 0"},{"name":"sy9","fmla":"+- vc sdy4 0"},{"name":"sy10","fmla":"+- vc sdy3 0"},{"name":"sy11","fmla":"+- vc sdy2 0"},{"name":"sy12","fmla":"+- vc sdy1 0"},{"name":"idx","fmla":"cos iwd2 2700000"},{"name":"idy","fmla":"sin ihd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"ib","fmla":"+- vc idy 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy6"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"L","pts":[{"x":"sx2","y":"sy5"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"sx3","y":"sy4"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"sx4","y":"sy3"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"sx5","y":"sy2"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"L","pts":[{"x":"sx6","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx7","y":"sy1"}]},{"c":"L","pts":[{"x":"x6","y":"y1"}]},{"c":"L","pts":[{"x":"sx8","y":"sy2"}]},{"c":"L","pts":[{"x":"x7","y":"y2"}]},{"c":"L","pts":[{"x":"sx9","y":"sy3"}]},{"c":"L","pts":[{"x":"x8","y":"y3"}]},{"c":"L","pts":[{"x":"sx10","y":"sy4"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"sx11","y":"sy5"}]},{"c":"L","pts":[{"x":"x10","y":"y5"}]},{"c":"L","pts":[{"x":"sx12","y":"sy6"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx12","y":"sy7"}]},{"c":"L","pts":[{"x":"x10","y":"y6"}]},{"c":"L","pts":[{"x":"sx11","y":"sy8"}]},{"c":"L","pts":[{"x":"x9","y":"y7"}]},{"c":"L","pts":[{"x":"sx10","y":"sy9"}]},{"c":"L","pts":[{"x":"x8","y":"y8"}]},{"c":"L","pts":[{"x":"sx9","y":"sy10"}]},{"c":"L","pts":[{"x":"x7","y":"y9"}]},{"c":"L","pts":[{"x":"sx8","y":"sy11"}]},{"c":"L","pts":[{"x":"x6","y":"y10"}]},{"c":"L","pts":[{"x":"sx7","y":"sy12"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx6","y":"sy12"}]},{"c":"L","pts":[{"x":"x5","y":"y10"}]},{"c":"L","pts":[{"x":"sx5","y":"sy11"}]},{"c":"L","pts":[{"x":"x4","y":"y9"}]},{"c":"L","pts":[{"x":"sx4","y":"sy10"}]},{"c":"L","pts":[{"x":"x3","y":"y8"}]},{"c":"L","pts":[{"x":"sx3","y":"sy9"}]},{"c":"L","pts":[{"x":"x2","y":"y7"}]},{"c":"L","pts":[{"x":"sx2","y":"sy8"}]},{"c":"L","pts":[{"x":"x1","y":"y6"}]},{"c":"L","pts":[{"x":"sx1","y":"sy7"}]},{"c":"Z"}]}]},"star32":{"av":[{"name":"adj","fmla":"val 37500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"*/ wd2 98079 100000"},{"name":"dx2","fmla":"*/ wd2 92388 100000"},{"name":"dx3","fmla":"*/ wd2 83147 100000"},{"name":"dx4","fmla":"cos wd2 2700000"},{"name":"dx5","fmla":"*/ wd2 55557 100000"},{"name":"dx6","fmla":"*/ wd2 38268 100000"},{"name":"dx7","fmla":"*/ wd2 19509 100000"},{"name":"dy1","fmla":"*/ hd2 98079 100000"},{"name":"dy2","fmla":"*/ hd2 92388 100000"},{"name":"dy3","fmla":"*/ hd2 83147 100000"},{"name":"dy4","fmla":"sin hd2 2700000"},{"name":"dy5","fmla":"*/ hd2 55557 100000"},{"name":"dy6","fmla":"*/ hd2 38268 100000"},{"name":"dy7","fmla":"*/ hd2 19509 100000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc 0 dx4"},{"name":"x5","fmla":"+- hc 0 dx5"},{"name":"x6","fmla":"+- hc 0 dx6"},{"name":"x7","fmla":"+- hc 0 dx7"},{"name":"x8","fmla":"+- hc dx7 0"},{"name":"x9","fmla":"+- hc dx6 0"},{"name":"x10","fmla":"+- hc dx5 0"},{"name":"x11","fmla":"+- hc dx4 0"},{"name":"x12","fmla":"+- hc dx3 0"},{"name":"x13","fmla":"+- hc dx2 0"},{"name":"x14","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc 0 dy3"},{"name":"y4","fmla":"+- vc 0 dy4"},{"name":"y5","fmla":"+- vc 0 dy5"},{"name":"y6","fmla":"+- vc 0 dy6"},{"name":"y7","fmla":"+- vc 0 dy7"},{"name":"y8","fmla":"+- vc dy7 0"},{"name":"y9","fmla":"+- vc dy6 0"},{"name":"y10","fmla":"+- vc dy5 0"},{"name":"y11","fmla":"+- vc dy4 0"},{"name":"y12","fmla":"+- vc dy3 0"},{"name":"y13","fmla":"+- vc dy2 0"},{"name":"y14","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 99518 100000"},{"name":"sdx2","fmla":"*/ iwd2 95694 100000"},{"name":"sdx3","fmla":"*/ iwd2 88192 100000"},{"name":"sdx4","fmla":"*/ iwd2 77301 100000"},{"name":"sdx5","fmla":"*/ iwd2 63439 100000"},{"name":"sdx6","fmla":"*/ iwd2 47140 100000"},{"name":"sdx7","fmla":"*/ iwd2 29028 100000"},{"name":"sdx8","fmla":"*/ iwd2 9802 100000"},{"name":"sdy1","fmla":"*/ ihd2 99518 100000"},{"name":"sdy2","fmla":"*/ ihd2 95694 100000"},{"name":"sdy3","fmla":"*/ ihd2 88192 100000"},{"name":"sdy4","fmla":"*/ ihd2 77301 100000"},{"name":"sdy5","fmla":"*/ ihd2 63439 100000"},{"name":"sdy6","fmla":"*/ ihd2 47140 100000"},{"name":"sdy7","fmla":"*/ ihd2 29028 100000"},{"name":"sdy8","fmla":"*/ ihd2 9802 100000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc 0 sdx3"},{"name":"sx4","fmla":"+- hc 0 sdx4"},{"name":"sx5","fmla":"+- hc 0 sdx5"},{"name":"sx6","fmla":"+- hc 0 sdx6"},{"name":"sx7","fmla":"+- hc 0 sdx7"},{"name":"sx8","fmla":"+- hc 0 sdx8"},{"name":"sx9","fmla":"+- hc sdx8 0"},{"name":"sx10","fmla":"+- hc sdx7 0"},{"name":"sx11","fmla":"+- hc sdx6 0"},{"name":"sx12","fmla":"+- hc sdx5 0"},{"name":"sx13","fmla":"+- hc sdx4 0"},{"name":"sx14","fmla":"+- hc sdx3 0"},{"name":"sx15","fmla":"+- hc sdx2 0"},{"name":"sx16","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc 0 sdy3"},{"name":"sy4","fmla":"+- vc 0 sdy4"},{"name":"sy5","fmla":"+- vc 0 sdy5"},{"name":"sy6","fmla":"+- vc 0 sdy6"},{"name":"sy7","fmla":"+- vc 0 sdy7"},{"name":"sy8","fmla":"+- vc 0 sdy8"},{"name":"sy9","fmla":"+- vc sdy8 0"},{"name":"sy10","fmla":"+- vc sdy7 0"},{"name":"sy11","fmla":"+- vc sdy6 0"},{"name":"sy12","fmla":"+- vc sdy5 0"},{"name":"sy13","fmla":"+- vc sdy4 0"},{"name":"sy14","fmla":"+- vc sdy3 0"},{"name":"sy15","fmla":"+- vc sdy2 0"},{"name":"sy16","fmla":"+- vc sdy1 0"},{"name":"idx","fmla":"cos iwd2 2700000"},{"name":"idy","fmla":"sin ihd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"ib","fmla":"+- vc idy 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy8"}]},{"c":"L","pts":[{"x":"x1","y":"y7"}]},{"c":"L","pts":[{"x":"sx2","y":"sy7"}]},{"c":"L","pts":[{"x":"x2","y":"y6"}]},{"c":"L","pts":[{"x":"sx3","y":"sy6"}]},{"c":"L","pts":[{"x":"x3","y":"y5"}]},{"c":"L","pts":[{"x":"sx4","y":"sy5"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"sx5","y":"sy4"}]},{"c":"L","pts":[{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"sx6","y":"sy3"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"sx7","y":"sy2"}]},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"L","pts":[{"x":"sx8","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx9","y":"sy1"}]},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"sx10","y":"sy2"}]},{"c":"L","pts":[{"x":"x9","y":"y2"}]},{"c":"L","pts":[{"x":"sx11","y":"sy3"}]},{"c":"L","pts":[{"x":"x10","y":"y3"}]},{"c":"L","pts":[{"x":"sx12","y":"sy4"}]},{"c":"L","pts":[{"x":"x11","y":"y4"}]},{"c":"L","pts":[{"x":"sx13","y":"sy5"}]},{"c":"L","pts":[{"x":"x12","y":"y5"}]},{"c":"L","pts":[{"x":"sx14","y":"sy6"}]},{"c":"L","pts":[{"x":"x13","y":"y6"}]},{"c":"L","pts":[{"x":"sx15","y":"sy7"}]},{"c":"L","pts":[{"x":"x14","y":"y7"}]},{"c":"L","pts":[{"x":"sx16","y":"sy8"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx16","y":"sy9"}]},{"c":"L","pts":[{"x":"x14","y":"y8"}]},{"c":"L","pts":[{"x":"sx15","y":"sy10"}]},{"c":"L","pts":[{"x":"x13","y":"y9"}]},{"c":"L","pts":[{"x":"sx14","y":"sy11"}]},{"c":"L","pts":[{"x":"x12","y":"y10"}]},{"c":"L","pts":[{"x":"sx13","y":"sy12"}]},{"c":"L","pts":[{"x":"x11","y":"y11"}]},{"c":"L","pts":[{"x":"sx12","y":"sy13"}]},{"c":"L","pts":[{"x":"x10","y":"y12"}]},{"c":"L","pts":[{"x":"sx11","y":"sy14"}]},{"c":"L","pts":[{"x":"x9","y":"y13"}]},{"c":"L","pts":[{"x":"sx10","y":"sy15"}]},{"c":"L","pts":[{"x":"x8","y":"y14"}]},{"c":"L","pts":[{"x":"sx9","y":"sy16"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx8","y":"sy16"}]},{"c":"L","pts":[{"x":"x7","y":"y14"}]},{"c":"L","pts":[{"x":"sx7","y":"sy15"}]},{"c":"L","pts":[{"x":"x6","y":"y13"}]},{"c":"L","pts":[{"x":"sx6","y":"sy14"}]},{"c":"L","pts":[{"x":"x5","y":"y12"}]},{"c":"L","pts":[{"x":"sx5","y":"sy13"}]},{"c":"L","pts":[{"x":"x4","y":"y11"}]},{"c":"L","pts":[{"x":"sx4","y":"sy12"}]},{"c":"L","pts":[{"x":"x3","y":"y10"}]},{"c":"L","pts":[{"x":"sx3","y":"sy11"}]},{"c":"L","pts":[{"x":"x2","y":"y9"}]},{"c":"L","pts":[{"x":"sx2","y":"sy10"}]},{"c":"L","pts":[{"x":"x1","y":"y8"}]},{"c":"L","pts":[{"x":"sx1","y":"sy9"}]},{"c":"Z"}]}]},"star4":{"av":[{"name":"adj","fmla":"val 12500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx","fmla":"cos iwd2 2700000"},{"name":"sdy","fmla":"sin ihd2 2700000"},{"name":"sx1","fmla":"+- hc 0 sdx"},{"name":"sx2","fmla":"+- hc sdx 0"},{"name":"sy1","fmla":"+- vc 0 sdy"},{"name":"sy2","fmla":"+- vc sdy 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx2","y":"sy1"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx2","y":"sy2"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx1","y":"sy2"}]},{"c":"Z"}]}]},"star5":{"av":[{"name":"adj","fmla":"val 19098"},{"name":"hf","fmla":"val 105146"},{"name":"vf","fmla":"val 110557"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"svc","fmla":"*/ vc  vf 100000"},{"name":"dx1","fmla":"cos swd2 1080000"},{"name":"dx2","fmla":"cos swd2 18360000"},{"name":"dy1","fmla":"sin shd2 1080000"},{"name":"dy2","fmla":"sin shd2 18360000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- svc 0 dy1"},{"name":"y2","fmla":"+- svc 0 dy2"},{"name":"iwd2","fmla":"*/ swd2 a 50000"},{"name":"ihd2","fmla":"*/ shd2 a 50000"},{"name":"sdx1","fmla":"cos iwd2 20520000"},{"name":"sdx2","fmla":"cos iwd2 3240000"},{"name":"sdy1","fmla":"sin ihd2 3240000"},{"name":"sdy2","fmla":"sin ihd2 20520000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc sdx2 0"},{"name":"sx4","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- svc 0 sdy1"},{"name":"sy2","fmla":"+- svc 0 sdy2"},{"name":"sy3","fmla":"+- svc ihd2 0"},{"name":"yAdj","fmla":"+- svc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"sx2","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"sx4","y":"sy2"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"hc","y":"sy3"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"sx1","y":"sy2"}]},{"c":"Z"}]}]},"star6":{"av":[{"name":"adj","fmla":"val 28868"},{"name":"hf","fmla":"val 115470"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"dx1","fmla":"cos swd2 1800000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"y2","fmla":"+- vc hd4 0"},{"name":"iwd2","fmla":"*/ swd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx2","fmla":"*/ iwd2 1 2"},{"name":"sx1","fmla":"+- hc 0 iwd2"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc sdx2 0"},{"name":"sx4","fmla":"+- hc iwd2 0"},{"name":"sdy1","fmla":"sin ihd2 3600000"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc sdy1 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"hd4"}]},{"c":"L","pts":[{"x":"sx2","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"x2","y":"hd4"}]},{"c":"L","pts":[{"x":"sx4","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"sx3","y":"sy2"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx2","y":"sy2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"sx1","y":"vc"}]},{"c":"Z"}]}]},"star7":{"av":[{"name":"adj","fmla":"val 34601"},{"name":"hf","fmla":"val 102572"},{"name":"vf","fmla":"val 105210"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"svc","fmla":"*/ vc  vf 100000"},{"name":"dx1","fmla":"*/ swd2 97493 100000"},{"name":"dx2","fmla":"*/ swd2 78183 100000"},{"name":"dx3","fmla":"*/ swd2 43388 100000"},{"name":"dy1","fmla":"*/ shd2 62349 100000"},{"name":"dy2","fmla":"*/ shd2 22252 100000"},{"name":"dy3","fmla":"*/ shd2 90097 100000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc dx3 0"},{"name":"x5","fmla":"+- hc dx2 0"},{"name":"x6","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- svc 0 dy1"},{"name":"y2","fmla":"+- svc dy2 0"},{"name":"y3","fmla":"+- svc dy3 0"},{"name":"iwd2","fmla":"*/ swd2 a 50000"},{"name":"ihd2","fmla":"*/ shd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 97493 100000"},{"name":"sdx2","fmla":"*/ iwd2 78183 100000"},{"name":"sdx3","fmla":"*/ iwd2 43388 100000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc 0 sdx3"},{"name":"sx4","fmla":"+- hc sdx3 0"},{"name":"sx5","fmla":"+- hc sdx2 0"},{"name":"sx6","fmla":"+- hc sdx1 0"},{"name":"sdy1","fmla":"*/ ihd2 90097 100000"},{"name":"sdy2","fmla":"*/ ihd2 22252 100000"},{"name":"sdy3","fmla":"*/ ihd2 62349 100000"},{"name":"sy1","fmla":"+- svc 0 sdy1"},{"name":"sy2","fmla":"+- svc 0 sdy2"},{"name":"sy3","fmla":"+- svc sdy3 0"},{"name":"sy4","fmla":"+- svc ihd2 0"},{"name":"yAdj","fmla":"+- svc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"sx1","y":"sy2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx4","y":"sy1"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"L","pts":[{"x":"sx6","y":"sy2"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"sx5","y":"sy3"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"hc","y":"sy4"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"sx2","y":"sy3"}]},{"c":"Z"}]}]},"star8":{"av":[{"name":"adj","fmla":"val 37500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"cos wd2 2700000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"dy1","fmla":"sin hd2 2700000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 92388 100000"},{"name":"sdx2","fmla":"*/ iwd2 38268 100000"},{"name":"sdy1","fmla":"*/ ihd2 92388 100000"},{"name":"sdy2","fmla":"*/ ihd2 38268 100000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc sdx2 0"},{"name":"sx4","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc sdy2 0"},{"name":"sy4","fmla":"+- vc sdy1 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy2"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"sx2","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"sx4","y":"sy2"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx4","y":"sy3"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"sx3","y":"sy4"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx2","y":"sy4"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"sx1","y":"sy3"}]},{"c":"Z"}]}]},"straightConnector1":{"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"stripedRightArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 84375 w ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"x4","fmla":"*/ ss 5 32"},{"name":"dx5","fmla":"*/ ss a2 100000"},{"name":"x5","fmla":"+- r 0 dx5"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"dx6","fmla":"*/ dy1 dx5 hd2"},{"name":"x6","fmla":"+- r 0 dx6"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"ssd32","y":"y1"}]},{"c":"L","pts":[{"x":"ssd32","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"ssd16","y":"y1"}]},{"c":"L","pts":[{"x":"ssd8","y":"y1"}]},{"c":"L","pts":[{"x":"ssd8","y":"y2"}]},{"c":"L","pts":[{"x":"ssd16","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"L","pts":[{"x":"x5","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x5","y":"b"}]},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"Z"}]}]},"sun":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 12500 adj 46875"},{"name":"g0","fmla":"+- 50000 0 a"},{"name":"g1","fmla":"*/ g0 30274 32768"},{"name":"g2","fmla":"*/ g0 12540 32768"},{"name":"g3","fmla":"+- g1 50000 0"},{"name":"g4","fmla":"+- g2 50000 0"},{"name":"g5","fmla":"+- 50000 0 g1"},{"name":"g6","fmla":"+- 50000 0 g2"},{"name":"g7","fmla":"*/ g0 23170 32768"},{"name":"g8","fmla":"+- 50000 g7 0"},{"name":"g9","fmla":"+- 50000 0 g7"},{"name":"g10","fmla":"*/ g5 3 4"},{"name":"g11","fmla":"*/ g6 3 4"},{"name":"g12","fmla":"+- g10 3662 0"},{"name":"g13","fmla":"+- g11 3662 0"},{"name":"g14","fmla":"+- g11 12500 0"},{"name":"g15","fmla":"+- 100000 0 g10"},{"name":"g16","fmla":"+- 100000 0 g12"},{"name":"g17","fmla":"+- 100000 0 g13"},{"name":"g18","fmla":"+- 100000 0 g14"},{"name":"ox1","fmla":"*/ w 18436 21600"},{"name":"oy1","fmla":"*/ h 3163 21600"},{"name":"ox2","fmla":"*/ w 3163 21600"},{"name":"oy2","fmla":"*/ h 18436 21600"},{"name":"x8","fmla":"*/ w g8 100000"},{"name":"x9","fmla":"*/ w g9 100000"},{"name":"x10","fmla":"*/ w g10 100000"},{"name":"x12","fmla":"*/ w g12 100000"},{"name":"x13","fmla":"*/ w g13 100000"},{"name":"x14","fmla":"*/ w g14 100000"},{"name":"x15","fmla":"*/ w g15 100000"},{"name":"x16","fmla":"*/ w g16 100000"},{"name":"x17","fmla":"*/ w g17 100000"},{"name":"x18","fmla":"*/ w g18 100000"},{"name":"x19","fmla":"*/ w a 100000"},{"name":"wR","fmla":"*/ w g0 100000"},{"name":"hR","fmla":"*/ h g0 100000"},{"name":"y8","fmla":"*/ h g8 100000"},{"name":"y9","fmla":"*/ h g9 100000"},{"name":"y10","fmla":"*/ h g10 100000"},{"name":"y12","fmla":"*/ h g12 100000"},{"name":"y13","fmla":"*/ h g13 100000"},{"name":"y14","fmla":"*/ h g14 100000"},{"name":"y15","fmla":"*/ h g15 100000"},{"name":"y16","fmla":"*/ h g16 100000"},{"name":"y17","fmla":"*/ h g17 100000"},{"name":"y18","fmla":"*/ h g18 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x15","y":"y18"}]},{"c":"L","pts":[{"x":"x15","y":"y14"}]},{"c":"Z"},{"c":"M","pts":[{"x":"ox1","y":"oy1"}]},{"c":"L","pts":[{"x":"x16","y":"y13"}]},{"c":"L","pts":[{"x":"x17","y":"y12"}]},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x18","y":"y10"}]},{"c":"L","pts":[{"x":"x14","y":"y10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"ox2","y":"oy1"}]},{"c":"L","pts":[{"x":"x13","y":"y12"}]},{"c":"L","pts":[{"x":"x12","y":"y13"}]},{"c":"Z"},{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x10","y":"y14"}]},{"c":"L","pts":[{"x":"x10","y":"y18"}]},{"c":"Z"},{"c":"M","pts":[{"x":"ox2","y":"oy2"}]},{"c":"L","pts":[{"x":"x12","y":"y17"}]},{"c":"L","pts":[{"x":"x13","y":"y16"}]},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"x14","y":"y15"}]},{"c":"L","pts":[{"x":"x18","y":"y15"}]},{"c":"Z"},{"c":"M","pts":[{"x":"ox1","y":"oy2"}]},{"c":"L","pts":[{"x":"x17","y":"y16"}]},{"c":"L","pts":[{"x":"x16","y":"y17"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x19","y":"vc"}]},{"c":"A","wR":"wR","hR":"hR","stAng":"cd2","swAng":"21600000"},{"c":"Z"}]}]},"swooshArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 16667"}],"gd":[{"name":"a1","fmla":"pin 1 adj1 75000"},{"name":"maxAdj2","fmla":"*/ 70000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"ad1","fmla":"*/ h a1 100000"},{"name":"ad2","fmla":"*/ ss a2 100000"},{"name":"xB","fmla":"+- r 0 ad2"},{"name":"yB","fmla":"+- t ssd8 0"},{"name":"alfa","fmla":"*/ cd4 1 14"},{"name":"dx0","fmla":"tan ssd8 alfa"},{"name":"xC","fmla":"+- xB 0 dx0"},{"name":"dx1","fmla":"tan ad1 alfa"},{"name":"yF","fmla":"+- yB ad1 0"},{"name":"xF","fmla":"+- xB dx1 0"},{"name":"xE","fmla":"+- xF dx0 0"},{"name":"yE","fmla":"+- yF ssd8 0"},{"name":"dy2","fmla":"+- yE 0 t"},{"name":"dy22","fmla":"*/ dy2 1 2"},{"name":"dy3","fmla":"*/ h 1 20"},{"name":"yD","fmla":"+- t dy22 dy3"},{"name":"dy4","fmla":"*/ hd6 1 1"},{"name":"yP1","fmla":"+- hd6 dy4 0"},{"name":"xP1","fmla":"val wd6"},{"name":"dy5","fmla":"*/ hd6 1 2"},{"name":"yP2","fmla":"+- yF dy5 0"},{"name":"xP2","fmla":"val wd4"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"Q","pts":[{"x":"xP1","y":"yP1"},{"x":"xB","y":"yB"}]},{"c":"L","pts":[{"x":"xC","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"yD"}]},{"c":"L","pts":[{"x":"xE","y":"yE"}]},{"c":"L","pts":[{"x":"xF","y":"yF"}]},{"c":"Q","pts":[{"x":"xP2","y":"yP2"},{"x":"l","y":"b"}]},{"c":"Z"}]}]},"teardrop":{"av":[{"name":"adj","fmla":"val 100000"}],"gd":[{"name":"a","fmla":"pin 0 adj 200000"},{"name":"r2","fmla":"sqrt 2"},{"name":"tw","fmla":"*/ wd2 r2 1"},{"name":"th","fmla":"*/ hd2 r2 1"},{"name":"sw","fmla":"*/ tw a 100000"},{"name":"sh","fmla":"*/ th a 100000"},{"name":"dx1","fmla":"cos sw 2700000"},{"name":"dy1","fmla":"sin sh 2700000"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"x2","fmla":"+/ hc x1 2"},{"name":"y2","fmla":"+/ vc y1 2"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"Q","pts":[{"x":"x2","y":"t"},{"x":"x1","y":"y1"}]},{"c":"Q","pts":[{"x":"r","y":"y2"},{"x":"r","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"trapezoid":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 w ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"x1","fmla":"*/ ss a 200000"},{"name":"x2","fmla":"*/ ss a 100000"},{"name":"x3","fmla":"+- r 0 x2"},{"name":"x4","fmla":"+- r 0 x1"},{"name":"il","fmla":"*/ wd3 a maxAdj"},{"name":"it","fmla":"*/ hd3 a maxAdj"},{"name":"ir","fmla":"+- r 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"triangle":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 100000"},{"name":"x1","fmla":"*/ w a 200000"},{"name":"x2","fmla":"*/ w a 100000"},{"name":"x3","fmla":"+- x1 wd2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"upArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 64977"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 100000 h ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss h"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dx1","fmla":"*/ ss a2 100000"},{"name":"dx2","fmla":"*/ ss a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"*/ ss a3 100000"},{"name":"dy2","fmla":"*/ h a4 100000"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"y3","fmla":"+/ y2 b 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"upDownArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"y2","fmla":"*/ ss a2 100000"},{"name":"y3","fmla":"+- b 0 y2"},{"name":"dx1","fmla":"*/ w a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"dy1","fmla":"*/ x1 y2 wd2"},{"name":"y1","fmla":"+- y2 0 dy1"},{"name":"y4","fmla":"+- y3 dy1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"}]}]},"upDownArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 48123"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 50000 h ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss hd2"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dx1","fmla":"*/ ss a2 100000"},{"name":"dx2","fmla":"*/ ss a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"*/ ss a3 100000"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"dy2","fmla":"*/ h a4 200000"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"l","y":"y3"}]},{"c":"Z"}]}]},"uturnArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 43750"},{"name":"adj5","fmla":"val 75000"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 25000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"q2","fmla":"*/ a1 ss h"},{"name":"q3","fmla":"+- 100000 0 q2"},{"name":"maxAdj3","fmla":"*/ q3 h ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q1","fmla":"+- a3 a1 0"},{"name":"minAdj5","fmla":"*/ q1 ss h"},{"name":"a5","fmla":"pin minAdj5 adj5 100000"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw2","fmla":"*/ ss a2 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"dh2","fmla":"+- aw2 0 th2"},{"name":"y5","fmla":"*/ h a5 100000"},{"name":"ah","fmla":"*/ ss a3 100000"},{"name":"y4","fmla":"+- y5 0 ah"},{"name":"x9","fmla":"+- r 0 dh2"},{"name":"bw","fmla":"*/ x9 1 2"},{"name":"bs","fmla":"min bw y4"},{"name":"maxAdj4","fmla":"*/ bs 100000 ss"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"bd","fmla":"*/ ss a4 100000"},{"name":"bd3","fmla":"+- bd 0 th"},{"name":"bd2","fmla":"max bd3 0"},{"name":"x3","fmla":"+- th bd2 0"},{"name":"x8","fmla":"+- r 0 aw2"},{"name":"x6","fmla":"+- x8 0 aw2"},{"name":"x7","fmla":"+- x6 dh2 0"},{"name":"x4","fmla":"+- x9 0 bd"},{"name":"x5","fmla":"+- x7 0 bd2"},{"name":"cx","fmla":"+/ th x7 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"bd"}]},{"c":"A","wR":"bd","hR":"bd","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x4","y":"t"}]},{"c":"A","wR":"bd","hR":"bd","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x8","y":"y5"}]},{"c":"L","pts":[{"x":"x6","y":"y4"}]},{"c":"L","pts":[{"x":"x7","y":"y4"}]},{"c":"L","pts":[{"x":"x7","y":"x3"}]},{"c":"A","wR":"bd2","hR":"bd2","stAng":"0","swAng":"-5400000"},{"c":"L","pts":[{"x":"x3","y":"th"}]},{"c":"A","wR":"bd2","hR":"bd2","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"th","y":"b"}]},{"c":"Z"}]}]},"verticalScroll":{"av":[{"name":"adj","fmla":"val 12500"}],"gd":[{"name":"a","fmla":"pin 0 adj 25000"},{"name":"ch","fmla":"*/ ss a 100000"},{"name":"ch2","fmla":"*/ ch 1 2"},{"name":"ch4","fmla":"*/ ch 1 4"},{"name":"x3","fmla":"+- ch ch2 0"},{"name":"x4","fmla":"+- ch ch 0"},{"name":"x6","fmla":"+- r 0 ch"},{"name":"x7","fmla":"+- r 0 ch2"},{"name":"x5","fmla":"+- x6 0 ch2"},{"name":"y3","fmla":"+- b 0 ch"},{"name":"y4","fmla":"+- b 0 ch2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"ch2","y":"b"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"ch2","y":"y4"}]},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"ch","y":"y3"}]},{"c":"L","pts":[{"x":"ch","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x7","y":"t"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x6","y":"ch"}]},{"c":"L","pts":[{"x":"x6","y":"y4"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"Z"},{"c":"M","pts":[{"x":"x4","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd4","swAng":"cd2"},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x4","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd4","swAng":"cd2"},{"c":"Z"},{"c":"M","pts":[{"x":"ch","y":"y4"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"3cd4"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"3cd4","swAng":"cd2"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"ch","y":"y3"}]},{"c":"L","pts":[{"x":"ch","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x7","y":"t"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x6","y":"ch"}]},{"c":"L","pts":[{"x":"x6","y":"y4"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"ch2","y":"b"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"cd2"},{"c":"Z"},{"c":"M","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"3cd4","swAng":"cd2"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x4","y":"ch2"}]},{"c":"M","pts":[{"x":"x6","y":"ch"}]},{"c":"L","pts":[{"x":"x3","y":"ch"}]},{"c":"M","pts":[{"x":"ch2","y":"y3"}]},{"c":"A","wR":"ch4","hR":"ch4","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"ch","y":"y4"}]},{"c":"M","pts":[{"x":"ch2","y":"b"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"ch","y":"y3"}]}]}]},"wave":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 20000"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"dx1","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs dx1"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx5","fmla":"?: of2 of2 0"},{"name":"x5","fmla":"+- r 0 dx5"},{"name":"dx3","fmla":"+/ dx2 x5 3"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"x4","fmla":"+/ x3 x5 2"},{"name":"x6","fmla":"+- l dx5 0"},{"name":"x10","fmla":"+- r dx2 0"},{"name":"x7","fmla":"+- x6 dx3 0"},{"name":"x8","fmla":"+/ x7 x10 2"},{"name":"x9","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc dx1 0"},{"name":"xAdj2","fmla":"+- hc 0 dx1"},{"name":"il","fmla":"max x2 x6"},{"name":"ir","fmla":"min x5 x10"},{"name":"it","fmla":"*/ h a1 50000"},{"name":"ib","fmla":"+- b 0 it"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y2"},{"x":"x4","y":"y3"},{"x":"x5","y":"y1"}]},{"c":"L","pts":[{"x":"x10","y":"y4"}]},{"c":"C","pts":[{"x":"x8","y":"y6"},{"x":"x7","y":"y5"},{"x":"x6","y":"y4"}]},{"c":"Z"}]}]},"wedgeEllipseCallout":{"av":[{"name":"adj1","fmla":"val -20833"},{"name":"adj2","fmla":"val 62500"}],"gd":[{"name":"dxPos","fmla":"*/ w adj1 100000"},{"name":"dyPos","fmla":"*/ h adj2 100000"},{"name":"xPos","fmla":"+- hc dxPos 0"},{"name":"yPos","fmla":"+- vc dyPos 0"},{"name":"sdx","fmla":"*/ dxPos h 1"},{"name":"sdy","fmla":"*/ dyPos w 1"},{"name":"pang","fmla":"at2 sdx sdy"},{"name":"stAng","fmla":"+- pang 660000 0"},{"name":"enAng","fmla":"+- pang 0 660000"},{"name":"dx1","fmla":"cos wd2 stAng"},{"name":"dy1","fmla":"sin hd2 stAng"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"dx2","fmla":"cos wd2 enAng"},{"name":"dy2","fmla":"sin hd2 enAng"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"stAng1","fmla":"at2 dx1 dy1"},{"name":"enAng1","fmla":"at2 dx2 dy2"},{"name":"swAng1","fmla":"+- enAng1 0 stAng1"},{"name":"swAng2","fmla":"+- swAng1 21600000 0"},{"name":"swAng","fmla":"?: swAng1 swAng1 swAng2"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xPos","y":"yPos"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng1","swAng":"swAng"},{"c":"Z"}]}]},"wedgeRectCallout":{"av":[{"name":"adj1","fmla":"val -20833"},{"name":"adj2","fmla":"val 62500"}],"gd":[{"name":"dxPos","fmla":"*/ w adj1 100000"},{"name":"dyPos","fmla":"*/ h adj2 100000"},{"name":"xPos","fmla":"+- hc dxPos 0"},{"name":"yPos","fmla":"+- vc dyPos 0"},{"name":"dx","fmla":"+- xPos 0 hc"},{"name":"dy","fmla":"+- yPos 0 vc"},{"name":"dq","fmla":"*/ dxPos h w"},{"name":"ady","fmla":"abs dyPos"},{"name":"adq","fmla":"abs dq"},{"name":"dz","fmla":"+- ady 0 adq"},{"name":"xg1","fmla":"?: dxPos 7 2"},{"name":"xg2","fmla":"?: dxPos 10 5"},{"name":"x1","fmla":"*/ w xg1 12"},{"name":"x2","fmla":"*/ w xg2 12"},{"name":"yg1","fmla":"?: dyPos 7 2"},{"name":"yg2","fmla":"?: dyPos 10 5"},{"name":"y1","fmla":"*/ h yg1 12"},{"name":"y2","fmla":"*/ h yg2 12"},{"name":"t1","fmla":"?: dxPos l xPos"},{"name":"xl","fmla":"?: dz l t1"},{"name":"t2","fmla":"?: dyPos x1 xPos"},{"name":"xt","fmla":"?: dz t2 x1"},{"name":"t3","fmla":"?: dxPos xPos r"},{"name":"xr","fmla":"?: dz r t3"},{"name":"t4","fmla":"?: dyPos xPos x1"},{"name":"xb","fmla":"?: dz t4 x1"},{"name":"t5","fmla":"?: dxPos y1 yPos"},{"name":"yl","fmla":"?: dz y1 t5"},{"name":"t6","fmla":"?: dyPos t yPos"},{"name":"yt","fmla":"?: dz t6 t"},{"name":"t7","fmla":"?: dxPos yPos y1"},{"name":"yr","fmla":"?: dz y1 t7"},{"name":"t8","fmla":"?: dyPos yPos b"},{"name":"yb","fmla":"?: dz t8 b"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"xt","y":"yt"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"xr","y":"yr"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"xb","y":"yb"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"xl","y":"yl"}]},{"c":"L","pts":[{"x":"l","y":"y1"}]},{"c":"Z"}]}]},"wedgeRoundRectCallout":{"av":[{"name":"adj1","fmla":"val -20833"},{"name":"adj2","fmla":"val 62500"},{"name":"adj3","fmla":"val 16667"}],"gd":[{"name":"dxPos","fmla":"*/ w adj1 100000"},{"name":"dyPos","fmla":"*/ h adj2 100000"},{"name":"xPos","fmla":"+- hc dxPos 0"},{"name":"yPos","fmla":"+- vc dyPos 0"},{"name":"dq","fmla":"*/ dxPos h w"},{"name":"ady","fmla":"abs dyPos"},{"name":"adq","fmla":"abs dq"},{"name":"dz","fmla":"+- ady 0 adq"},{"name":"xg1","fmla":"?: dxPos 7 2"},{"name":"xg2","fmla":"?: dxPos 10 5"},{"name":"x1","fmla":"*/ w xg1 12"},{"name":"x2","fmla":"*/ w xg2 12"},{"name":"yg1","fmla":"?: dyPos 7 2"},{"name":"yg2","fmla":"?: dyPos 10 5"},{"name":"y1","fmla":"*/ h yg1 12"},{"name":"y2","fmla":"*/ h yg2 12"},{"name":"t1","fmla":"?: dxPos l xPos"},{"name":"xl","fmla":"?: dz l t1"},{"name":"t2","fmla":"?: dyPos x1 xPos"},{"name":"xt","fmla":"?: dz t2 x1"},{"name":"t3","fmla":"?: dxPos xPos r"},{"name":"xr","fmla":"?: dz r t3"},{"name":"t4","fmla":"?: dyPos xPos x1"},{"name":"xb","fmla":"?: dz t4 x1"},{"name":"t5","fmla":"?: dxPos y1 yPos"},{"name":"yl","fmla":"?: dz y1 t5"},{"name":"t6","fmla":"?: dyPos t yPos"},{"name":"yt","fmla":"?: dz t6 t"},{"name":"t7","fmla":"?: dxPos yPos y1"},{"name":"yr","fmla":"?: dz y1 t7"},{"name":"t8","fmla":"?: dyPos yPos b"},{"name":"yb","fmla":"?: dz t8 b"},{"name":"u1","fmla":"*/ ss adj3 100000"},{"name":"u2","fmla":"+- r 0 u1"},{"name":"v2","fmla":"+- b 0 u1"},{"name":"il","fmla":"*/ u1 29289 100000"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"u1"}]},{"c":"A","wR":"u1","hR":"u1","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"xt","y":"yt"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"u2","y":"t"}]},{"c":"A","wR":"u1","hR":"u1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"xr","y":"yr"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"v2"}]},{"c":"A","wR":"u1","hR":"u1","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"xb","y":"yb"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"u1","y":"b"}]},{"c":"A","wR":"u1","hR":"u1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"xl","y":"yl"}]},{"c":"L","pts":[{"x":"l","y":"y1"}]},{"c":"Z"}]}]},"textArchDown":{"av":[{"name":"adj","fmla":"val 0"}],"gd":[{"name":"adval","fmla":"pin 0 adj 21599999"},{"name":"v1","fmla":"+- 10800000 0 adval"},{"name":"v2","fmla":"+- 32400000 0 adval"},{"name":"nv1","fmla":"+- 0 0 v1"},{"name":"stAng","fmla":"?: nv1 v2 v1"},{"name":"w1","fmla":"+- 5400000 0 adval"},{"name":"w2","fmla":"+- 16200000 0 adval"},{"name":"d1","fmla":"+- adval 0 stAng"},{"name":"d2","fmla":"+- d1 0 21600000"},{"name":"v3","fmla":"+- 0 0 10800000"},{"name":"c2","fmla":"?: w2 d1 d2"},{"name":"c1","fmla":"?: v1 d2 c2"},{"name":"c0","fmla":"?: w1 d1 c1"},{"name":"swAng","fmla":"?: stAng c0 v3"},{"name":"wt1","fmla":"sin wd2 adj"},{"name":"ht1","fmla":"cos hd2 adj"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"wt2","fmla":"sin wd2 stAng"},{"name":"ht2","fmla":"cos hd2 stAng"},{"name":"dx2","fmla":"cat2 wd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 hd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"}]}]},"textArchDownPour":{"av":[{"name":"adj1","fmla":"val 0"},{"name":"adj2","fmla":"val 25000"}],"gd":[{"name":"adval","fmla":"pin 0 adj1 21599999"},{"name":"v1","fmla":"+- 10800000 0 adval"},{"name":"v2","fmla":"+- 32400000 0 adval"},{"name":"nv1","fmla":"+- 0 0 v1"},{"name":"stAng","fmla":"?: nv1 v2 v1"},{"name":"w1","fmla":"+- 5400000 0 adval"},{"name":"w2","fmla":"+- 16200000 0 adval"},{"name":"d1","fmla":"+- adval 0 stAng"},{"name":"d2","fmla":"+- d1 0 21600000"},{"name":"v3","fmla":"+- 0 0 10800000"},{"name":"c2","fmla":"?: w2 d1 d2"},{"name":"c1","fmla":"?: v1 d2 c2"},{"name":"c0","fmla":"?: w1 d1 c1"},{"name":"swAng","fmla":"?: stAng c0 v3"},{"name":"wt1","fmla":"sin wd2 stAng"},{"name":"ht1","fmla":"cos hd2 stAng"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"adval2","fmla":"pin 0 adj2 99000"},{"name":"ratio","fmla":"*/ adval2 1 100000"},{"name":"iwd2","fmla":"*/ wd2 ratio 1"},{"name":"ihd2","fmla":"*/ hd2 ratio 1"},{"name":"wt2","fmla":"sin iwd2 adval"},{"name":"ht2","fmla":"cos ihd2 adval"},{"name":"dx2","fmla":"cat2 iwd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 ihd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"wt3","fmla":"sin iwd2 stAng"},{"name":"ht3","fmla":"cos ihd2 stAng"},{"name":"dx3","fmla":"cat2 iwd2 ht3 wt3"},{"name":"dy3","fmla":"sat2 ihd2 ht3 wt3"},{"name":"x3","fmla":"+- hc dx3 0"},{"name":"y3","fmla":"+- vc dy3 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x3","y":"y3"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"stAng","swAng":"swAng"}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"}]}]},"textArchUp":{"av":[{"name":"adj","fmla":"val cd2"}],"gd":[{"name":"adval","fmla":"pin 0 adj 21599999"},{"name":"v1","fmla":"+- 10800000 0 adval"},{"name":"v2","fmla":"+- 32400000 0 adval"},{"name":"end","fmla":"?: v1 v1 v2"},{"name":"w1","fmla":"+- 5400000 0 adval"},{"name":"w2","fmla":"+- 16200000 0 adval"},{"name":"d1","fmla":"+- end 0 adval"},{"name":"d2","fmla":"+- 21600000 d1 0"},{"name":"c2","fmla":"?: w2 d1 d2"},{"name":"c1","fmla":"?: v1 d2 c2"},{"name":"swAng","fmla":"?: w1 d1 c1"},{"name":"wt1","fmla":"sin wd2 adj"},{"name":"ht1","fmla":"cos hd2 adj"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"adval","swAng":"swAng"}]}]},"textArchUpPour":{"av":[{"name":"adj1","fmla":"val cd2"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"adval","fmla":"pin 0 adj1 21599999"},{"name":"v1","fmla":"+- 10800000 0 adval"},{"name":"v2","fmla":"+- 32400000 0 adval"},{"name":"end","fmla":"?: v1 v1 v2"},{"name":"w1","fmla":"+- 5400000 0 adval"},{"name":"w2","fmla":"+- 16200000 0 adval"},{"name":"d1","fmla":"+- end 0 adval"},{"name":"d2","fmla":"+- 21600000 d1 0"},{"name":"c2","fmla":"?: w2 d1 d2"},{"name":"c1","fmla":"?: v1 d2 c2"},{"name":"swAng","fmla":"?: w1 d1 c1"},{"name":"wt1","fmla":"sin wd2 adval"},{"name":"ht1","fmla":"cos hd2 adval"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"adval2","fmla":"pin 0 adj2 99000"},{"name":"ratio","fmla":"*/ adval2 1 100000"},{"name":"iwd2","fmla":"*/ wd2 ratio 1"},{"name":"ihd2","fmla":"*/ hd2 ratio 1"},{"name":"wt2","fmla":"sin iwd2 adval"},{"name":"ht2","fmla":"cos ihd2 adval"},{"name":"dx2","fmla":"cat2 iwd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 ihd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"adval","swAng":"swAng"}]},{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"adval","swAng":"swAng"}]}]},"textButton":{"av":[{"name":"adj","fmla":"val 10800000"}],"gd":[{"name":"adval","fmla":"pin 0 adj 21599999"},{"name":"bot","fmla":"+- 5400000 0 adval"},{"name":"lef","fmla":"+- 10800000 0 adval"},{"name":"top","fmla":"+- 16200000 0 adval"},{"name":"rig","fmla":"+- 21600000 0 adval"},{"name":"c3","fmla":"?: top adval 0"},{"name":"c2","fmla":"?: lef 10800000 c3"},{"name":"c1","fmla":"?: bot rig c2"},{"name":"stAng","fmla":"?: adval c1 0"},{"name":"w1","fmla":"+- 21600000 0 stAng"},{"name":"stAngB","fmla":"?: stAng w1 0"},{"name":"td1","fmla":"*/ bot 2 1"},{"name":"td2","fmla":"*/ top 2 1"},{"name":"ntd2","fmla":"+- 0 0 td2"},{"name":"w2","fmla":"+- 0 0 10800000"},{"name":"c6","fmla":"?: top ntd2 w2"},{"name":"c5","fmla":"?: lef 10800000 c6"},{"name":"c4","fmla":"?: bot td1 c5"},{"name":"v1","fmla":"?: adval c4 10800000"},{"name":"swAngT","fmla":"+- 0 0 v1"},{"name":"stT","fmla":"?: lef stAngB stAng"},{"name":"stB","fmla":"?: lef stAng stAngB"},{"name":"swT","fmla":"?: lef v1 swAngT"},{"name":"swB","fmla":"?: lef swAngT v1"},{"name":"wt1","fmla":"sin wd2 stT"},{"name":"ht1","fmla":"cos hd2 stT"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"wt2","fmla":"sin wd2 stB"},{"name":"ht2","fmla":"cos hd2 stB"},{"name":"dx2","fmla":"cat2 wd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 hd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"wt3","fmla":"sin wd2 adj"},{"name":"ht3","fmla":"cos hd2 adj"},{"name":"dx3","fmla":"cat2 wd2 ht3 wt3"},{"name":"dy3","fmla":"sat2 hd2 ht3 wt3"},{"name":"x3","fmla":"+- hc dx3 0"},{"name":"y3","fmla":"+- vc dy3 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stT","swAng":"swT"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stB","swAng":"swB"}]}]},"textButtonPour":{"av":[{"name":"adj1","fmla":"val cd2"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"adval","fmla":"pin 0 adj1 21599999"},{"name":"bot","fmla":"+- 5400000 0 adval"},{"name":"lef","fmla":"+- 10800000 0 adval"},{"name":"top","fmla":"+- 16200000 0 adval"},{"name":"rig","fmla":"+- 21600000 0 adval"},{"name":"c3","fmla":"?: top adval 0"},{"name":"c2","fmla":"?: lef 10800000 c3"},{"name":"c1","fmla":"?: bot rig c2"},{"name":"stAng","fmla":"?: adval c1 0"},{"name":"w1","fmla":"+- 21600000 0 stAng"},{"name":"stAngB","fmla":"?: stAng w1 0"},{"name":"td1","fmla":"*/ bot 2 1"},{"name":"td2","fmla":"*/ top 2 1"},{"name":"ntd2","fmla":"+- 0 0 td2"},{"name":"w2","fmla":"+- 0 0 10800000"},{"name":"c6","fmla":"?: top ntd2 w2"},{"name":"c5","fmla":"?: lef 10800000 c6"},{"name":"c4","fmla":"?: bot td1 c5"},{"name":"v1","fmla":"?: adval c4 10800000"},{"name":"swAngT","fmla":"+- 0 0 v1"},{"name":"stT","fmla":"?: lef stAngB stAng"},{"name":"stB","fmla":"?: lef stAng stAngB"},{"name":"swT","fmla":"?: lef v1 swAngT"},{"name":"swB","fmla":"?: lef swAngT v1"},{"name":"wt1","fmla":"sin wd2 stT"},{"name":"ht1","fmla":"cos hd2 stT"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"wt6","fmla":"sin wd2 stB"},{"name":"ht6","fmla":"cos hd2 stB"},{"name":"dx6","fmla":"cat2 wd2 ht6 wt6"},{"name":"dy6","fmla":"sat2 hd2 ht6 wt6"},{"name":"x6","fmla":"+- hc dx6 0"},{"name":"y6","fmla":"+- vc dy6 0"},{"name":"adval2","fmla":"pin 40000 adj2 99000"},{"name":"ratio","fmla":"*/ adval2 1 100000"},{"name":"iwd2","fmla":"*/ wd2 ratio 1"},{"name":"ihd2","fmla":"*/ hd2 ratio 1"},{"name":"wt2","fmla":"sin iwd2 stT"},{"name":"ht2","fmla":"cos ihd2 stT"},{"name":"dx2","fmla":"cat2 iwd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 ihd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"wt5","fmla":"sin iwd2 stB"},{"name":"ht5","fmla":"cos ihd2 stB"},{"name":"dx5","fmla":"cat2 iwd2 ht5 wt5"},{"name":"dy5","fmla":"sat2 ihd2 ht5 wt5"},{"name":"x5","fmla":"+- hc dx5 0"},{"name":"y5","fmla":"+- vc dy5 0"},{"name":"d1","fmla":"+- hd2 0 ihd2"},{"name":"d12","fmla":"*/ d1 1 2"},{"name":"yu","fmla":"+- vc 0 d12"},{"name":"yd","fmla":"+- vc d12 0"},{"name":"v1","fmla":"*/ d12 d12 1"},{"name":"v2","fmla":"*/ ihd2 ihd2 1"},{"name":"v3","fmla":"*/ v1 1 v2"},{"name":"v4","fmla":"+- 1 0 v3"},{"name":"v5","fmla":"*/ iwd2 iwd2 1"},{"name":"v6","fmla":"*/ v4 v5 1"},{"name":"v7","fmla":"sqrt v6"},{"name":"xl","fmla":"+- hc 0 v7"},{"name":"xr","fmla":"+- hc v7 0"},{"name":"wtadj","fmla":"sin iwd2 adj1"},{"name":"htadj","fmla":"cos ihd2 adj1"},{"name":"dxadj","fmla":"cat2 iwd2 htadj wtadj"},{"name":"dyadj","fmla":"sat2 ihd2 htadj wtadj"},{"name":"xadj","fmla":"+- hc dxadj 0"},{"name":"yadj","fmla":"+- vc dyadj 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stT","swAng":"swT"}]},{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"stT","swAng":"swT"}]},{"cmds":[{"c":"M","pts":[{"x":"xl","y":"yu"}]},{"c":"L","pts":[{"x":"xr","y":"yu"}]}]},{"cmds":[{"c":"M","pts":[{"x":"xl","y":"yd"}]},{"c":"L","pts":[{"x":"xr","y":"yd"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x5","y":"y5"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"stB","swAng":"swB"}]},{"cmds":[{"c":"M","pts":[{"x":"x6","y":"y6"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stB","swAng":"swB"}]}]},"textCanDown":{"av":[{"name":"adj","fmla":"val 14286"}],"gd":[{"name":"a","fmla":"pin 0 adj 33333"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y0","fmla":"+- t dy 0"},{"name":"y1","fmla":"+- b 0 dy"},{"name":"ncd2","fmla":"*/ cd2 -1 1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"wd2","hR":"dy","stAng":"cd2","swAng":"ncd2"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"dy","stAng":"cd2","swAng":"ncd2"}]}]},"textCanUp":{"av":[{"name":"adj","fmla":"val 85714"}],"gd":[{"name":"a","fmla":"pin 66667 adj 100000"},{"name":"dy1","fmla":"*/ a h 100000"},{"name":"dy","fmla":"+- h 0 dy1"},{"name":"y0","fmla":"+- t dy1 0"},{"name":"y1","fmla":"+- t dy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"dy","stAng":"cd2","swAng":"cd2"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"A","wR":"wd2","hR":"dy","stAng":"cd2","swAng":"cd2"}]}]},"textCascadeDown":{"av":[{"name":"adj","fmla":"val 44444"}],"gd":[{"name":"a","fmla":"pin 28570 adj 100000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"dy2","fmla":"+- h 0 dy"},{"name":"dy3","fmla":"*/ dy2 1 4"},{"name":"y2","fmla":"+- t dy3 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textCascadeUp":{"av":[{"name":"adj","fmla":"val 44444"}],"gd":[{"name":"a","fmla":"pin 28570 adj 100000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"dy2","fmla":"+- h 0 dy"},{"name":"dy3","fmla":"*/ dy2 1 4"},{"name":"y2","fmla":"+- t dy3 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]}]}]},"textChevron":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"y","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t b y"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"hc","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textChevronInverted":{"av":[{"name":"adj","fmla":"val 75000"}],"gd":[{"name":"a","fmla":"pin 50000 adj 100000"},{"name":"y","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- b 0 y"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"hc","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y"}]}]}]},"textCircle":{"av":[{"name":"adj","fmla":"val 10800000"}],"gd":[{"name":"adval","fmla":"pin 0 adj 21599999"},{"name":"d0","fmla":"+- adval 0 10800000"},{"name":"d1","fmla":"+- 10800000 0 adval"},{"name":"d2","fmla":"+- 21600000 0 adval"},{"name":"d3","fmla":"?: d1 d1 10799999"},{"name":"d4","fmla":"?: d0 d2 d3"},{"name":"swAng","fmla":"*/ d4 2 1"},{"name":"wt1","fmla":"sin wd2 adj"},{"name":"ht1","fmla":"cos hd2 adj"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"adval","swAng":"swAng"}]}]},"textCirclePour":{"av":[{"name":"adj1","fmla":"val cd2"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"adval","fmla":"pin 0 adj1 21599999"},{"name":"d0","fmla":"+- adval 0 10800000"},{"name":"d1","fmla":"+- 10800000 0 adval"},{"name":"d2","fmla":"+- 21600000 0 adval"},{"name":"d3","fmla":"?: d1 d1 10799999"},{"name":"d4","fmla":"?: d0 d2 d3"},{"name":"swAng","fmla":"*/ d4 2 1"},{"name":"wt1","fmla":"sin wd2 adval"},{"name":"ht1","fmla":"cos hd2 adval"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"adval2","fmla":"pin 0 adj2 99000"},{"name":"ratio","fmla":"*/ adval2 1 100000"},{"name":"iwd2","fmla":"*/ wd2 ratio 1"},{"name":"ihd2","fmla":"*/ hd2 ratio 1"},{"name":"wt2","fmla":"sin iwd2 adval"},{"name":"ht2","fmla":"cos ihd2 adval"},{"name":"dx2","fmla":"cat2 iwd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 ihd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"adval","swAng":"swAng"}]},{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"adval","swAng":"swAng"}]}]},"textCurveDown":{"av":[{"name":"adj","fmla":"val 45977"}],"gd":[{"name":"a","fmla":"pin 0 adj 56338"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"gd1","fmla":"*/ dy 3 4"},{"name":"gd2","fmla":"*/ dy 5 4"},{"name":"gd3","fmla":"*/ dy 3 8"},{"name":"gd4","fmla":"*/ dy 1 8"},{"name":"gd5","fmla":"+- h 0 gd3"},{"name":"gd6","fmla":"+- gd4 h 0"},{"name":"y0","fmla":"+- t dy 0"},{"name":"y1","fmla":"+- t gd1 0"},{"name":"y2","fmla":"+- t gd2 0"},{"name":"y3","fmla":"+- t gd3 0"},{"name":"y4","fmla":"+- t gd4 0"},{"name":"y5","fmla":"+- t gd5 0"},{"name":"y6","fmla":"+- t gd6 0"},{"name":"x1","fmla":"+- l wd3 0"},{"name":"x2","fmla":"+- r 0 wd3"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"x1","y":"y1"},{"x":"x2","y":"y2"},{"x":"r","y":"y0"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y5"}]},{"c":"C","pts":[{"x":"x1","y":"y6"},{"x":"x2","y":"y6"},{"x":"r","y":"y5"}]}]}]},"textCurveUp":{"av":[{"name":"adj","fmla":"val 45977"}],"gd":[{"name":"a","fmla":"pin 0 adj 56338"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"gd1","fmla":"*/ dy 3 4"},{"name":"gd2","fmla":"*/ dy 5 4"},{"name":"gd3","fmla":"*/ dy 3 8"},{"name":"gd4","fmla":"*/ dy 1 8"},{"name":"gd5","fmla":"+- h 0 gd3"},{"name":"gd6","fmla":"+- gd4 h 0"},{"name":"y0","fmla":"+- t dy 0"},{"name":"y1","fmla":"+- t gd1 0"},{"name":"y2","fmla":"+- t gd2 0"},{"name":"y3","fmla":"+- t gd3 0"},{"name":"y4","fmla":"+- t gd4 0"},{"name":"y5","fmla":"+- t gd5 0"},{"name":"y6","fmla":"+- t gd6 0"},{"name":"x1","fmla":"+- l wd3 0"},{"name":"x2","fmla":"+- r 0 wd3"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y0"}]},{"c":"C","pts":[{"x":"x1","y":"y2"},{"x":"x2","y":"y1"},{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y5"}]},{"c":"C","pts":[{"x":"x1","y":"y6"},{"x":"x2","y":"y6"},{"x":"r","y":"y5"}]}]}]},"textDeflate":{"av":[{"name":"adj","fmla":"val 18750"}],"gd":[{"name":"a","fmla":"pin 0 adj 37500"},{"name":"dy","fmla":"*/ a ss 100000"},{"name":"gd0","fmla":"*/ dy 4 3"},{"name":"gd1","fmla":"+- h 0 gd0"},{"name":"adjY","fmla":"+- t dy 0"},{"name":"y0","fmla":"+- t gd0 0"},{"name":"y1","fmla":"+- t gd1 0"},{"name":"x0","fmla":"+- l wd3 0"},{"name":"x1","fmla":"+- r 0 wd3"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"x0","y":"y0"},{"x":"x1","y":"y0"},{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"C","pts":[{"x":"x0","y":"y1"},{"x":"x1","y":"y1"},{"x":"r","y":"b"}]}]}]},"textDeflateBottom":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 6250 adj 100000"},{"name":"dy","fmla":"*/ a ss 100000"},{"name":"dy2","fmla":"+- h 0 dy"},{"name":"y1","fmla":"+- t dy 0"},{"name":"cp","fmla":"+- y1 0 dy2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"Q","pts":[{"x":"hc","y":"cp"},{"x":"r","y":"b"}]}]}]},"textDeflateInflate":{"av":[{"name":"adj","fmla":"val 35000"}],"gd":[{"name":"a","fmla":"pin 5000 adj 95000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"del","fmla":"*/ h 5 100"},{"name":"dh1","fmla":"*/ h 45 100"},{"name":"dh2","fmla":"*/ h 55 100"},{"name":"yh","fmla":"+- dy 0 del"},{"name":"yl","fmla":"+- dy del 0"},{"name":"y3","fmla":"+- yh yh dh1"},{"name":"y4","fmla":"+- yl yl dh2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"dh1"}]},{"c":"Q","pts":[{"x":"hc","y":"y3"},{"x":"r","y":"dh1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"dh2"}]},{"c":"Q","pts":[{"x":"hc","y":"y4"},{"x":"r","y":"dh2"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textDeflateInflateDeflate":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 3000 adj 47000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"del","fmla":"*/ h 3 100"},{"name":"ey1","fmla":"*/ h 30 100"},{"name":"ey2","fmla":"*/ h 36 100"},{"name":"ey3","fmla":"*/ h 63 100"},{"name":"ey4","fmla":"*/ h 70 100"},{"name":"by","fmla":"+- b 0 dy"},{"name":"yh1","fmla":"+- dy 0 del"},{"name":"yl1","fmla":"+- dy del 0"},{"name":"yh2","fmla":"+- by 0 del"},{"name":"yl2","fmla":"+- by del 0"},{"name":"y1","fmla":"+- yh1 yh1 ey1"},{"name":"y2","fmla":"+- yl1 yl1 ey2"},{"name":"y3","fmla":"+- yh2 yh2 ey3"},{"name":"y4","fmla":"+- yl2 yl2 ey4"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"ey1"}]},{"c":"Q","pts":[{"x":"hc","y":"y1"},{"x":"r","y":"ey1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"ey2"}]},{"c":"Q","pts":[{"x":"hc","y":"y2"},{"x":"r","y":"ey2"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"ey3"}]},{"c":"Q","pts":[{"x":"hc","y":"y3"},{"x":"r","y":"ey3"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"ey4"}]},{"c":"Q","pts":[{"x":"hc","y":"y4"},{"x":"r","y":"ey4"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textDeflateTop":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 93750"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"cp","fmla":"+- y1 dy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"Q","pts":[{"x":"hc","y":"cp"},{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textDoubleWave1":{"av":[{"name":"adj1","fmla":"val 6250"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 12500"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"of","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs of"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx8","fmla":"?: of2 of2 0"},{"name":"x8","fmla":"+- r 0 dx8"},{"name":"dx3","fmla":"+/ dx2 x8 6"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"dx4","fmla":"+/ dx2 x8 3"},{"name":"x4","fmla":"+- x2 dx4 0"},{"name":"x5","fmla":"+/ x2 x8 2"},{"name":"x6","fmla":"+- x5 dx3 0"},{"name":"x7","fmla":"+/ x6 x8 2"},{"name":"x9","fmla":"+- l dx8 0"},{"name":"x15","fmla":"+- r dx2 0"},{"name":"x10","fmla":"+- x9 dx3 0"},{"name":"x11","fmla":"+- x9 dx4 0"},{"name":"x12","fmla":"+/ x9 x15 2"},{"name":"x13","fmla":"+- x12 dx3 0"},{"name":"x14","fmla":"+/ x13 x15 2"},{"name":"x16","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc of 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y2"},{"x":"x4","y":"y3"},{"x":"x5","y":"y1"}]},{"c":"C","pts":[{"x":"x6","y":"y2"},{"x":"x7","y":"y3"},{"x":"x8","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x9","y":"y4"}]},{"c":"C","pts":[{"x":"x10","y":"y5"},{"x":"x11","y":"y6"},{"x":"x12","y":"y4"}]},{"c":"C","pts":[{"x":"x13","y":"y5"},{"x":"x14","y":"y6"},{"x":"x15","y":"y4"}]}]}]},"textFadeDown":{"av":[{"name":"adj","fmla":"val 33333"}],"gd":[{"name":"a","fmla":"pin 0 adj 49999"},{"name":"dx","fmla":"*/ a w 100000"},{"name":"x1","fmla":"+- l dx 0"},{"name":"x2","fmla":"+- r 0 dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]}]}]},"textFadeLeft":{"av":[{"name":"adj","fmla":"val 33333"}],"gd":[{"name":"a","fmla":"pin 0 adj 49999"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"y2","fmla":"+- b 0 dy"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textFadeRight":{"av":[{"name":"adj","fmla":"val 33333"}],"gd":[{"name":"a","fmla":"pin 0 adj 49999"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"y2","fmla":"+- b 0 dy"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]}]},"textFadeUp":{"av":[{"name":"adj","fmla":"val 33333"}],"gd":[{"name":"a","fmla":"pin 0 adj 49999"},{"name":"dx","fmla":"*/ a w 100000"},{"name":"x1","fmla":"+- l dx 0"},{"name":"x2","fmla":"+- r 0 dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textInflate":{"av":[{"name":"adj","fmla":"val 18750"}],"gd":[{"name":"a","fmla":"pin 0 adj 20000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"gd","fmla":"*/ dy 1 3"},{"name":"gd0","fmla":"+- 0 0 gd"},{"name":"gd1","fmla":"+- h 0 gd0"},{"name":"ty","fmla":"+- t dy 0"},{"name":"by","fmla":"+- b 0 dy"},{"name":"y0","fmla":"+- t gd0 0"},{"name":"y1","fmla":"+- t gd1 0"},{"name":"x0","fmla":"+- l wd3 0"},{"name":"x1","fmla":"+- r 0 wd3"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"ty"}]},{"c":"C","pts":[{"x":"x0","y":"y0"},{"x":"x1","y":"y0"},{"x":"r","y":"ty"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"by"}]},{"c":"C","pts":[{"x":"x0","y":"y1"},{"x":"x1","y":"y1"},{"x":"r","y":"by"}]}]}]},"textInflateBottom":{"av":[{"name":"adj","fmla":"val 60000"}],"gd":[{"name":"a","fmla":"pin 60000 adj 100000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"ty","fmla":"+- t dy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"ty"}]},{"c":"Q","pts":[{"x":"hc","y":"b"},{"x":"r","y":"ty"}]}]}]},"textInflateTop":{"av":[{"name":"adj","fmla":"val 40000"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"ty","fmla":"+- t dy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"ty"}]},{"c":"Q","pts":[{"x":"hc","y":"t"},{"x":"r","y":"ty"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textPlain":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 30000 adj 70000"},{"name":"mid","fmla":"*/ a w 100000"},{"name":"midDir","fmla":"+- mid 0 hc"},{"name":"dl","fmla":"+- mid 0 l"},{"name":"dr","fmla":"+- r 0 mid"},{"name":"dl2","fmla":"*/ dl 2 1"},{"name":"dr2","fmla":"*/ dr 2 1"},{"name":"dx","fmla":"?: midDir dr2 dl2"},{"name":"xr","fmla":"+- l dx 0"},{"name":"xl","fmla":"+- r 0 dx"},{"name":"tlx","fmla":"?: midDir l xl"},{"name":"trx","fmla":"?: midDir xr r"},{"name":"blx","fmla":"?: midDir xl l"},{"name":"brx","fmla":"?: midDir r xr"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"tlx","y":"t"}]},{"c":"L","pts":[{"x":"trx","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"blx","y":"b"}]},{"c":"L","pts":[{"x":"brx","y":"b"}]}]}]},"textRingInside":{"av":[{"name":"adj","fmla":"val 60000"}],"gd":[{"name":"a","fmla":"pin 50000 adj 99000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y","fmla":"+- t dy 0"},{"name":"r","fmla":"*/ dy 1 2"},{"name":"y1","fmla":"+- t r 0"},{"name":"y2","fmla":"+- b 0 r"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"r","stAng":"10800000","swAng":"21599999"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"A","wR":"wd2","hR":"r","stAng":"10800000","swAng":"21599999"}]}]},"textRingOutside":{"av":[{"name":"adj","fmla":"val 60000"}],"gd":[{"name":"a","fmla":"pin 50000 adj 99000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y","fmla":"+- t dy 0"},{"name":"r","fmla":"*/ dy 1 2"},{"name":"y1","fmla":"+- t r 0"},{"name":"y2","fmla":"+- b 0 r"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"r","stAng":"10800000","swAng":"-21599999"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"A","wR":"wd2","hR":"r","stAng":"10800000","swAng":"-21599999"}]}]},"textSlantDown":{"av":[{"name":"adj","fmla":"val 44445"}],"gd":[{"name":"a","fmla":"pin 28569 adj 100000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"y2","fmla":"+- b 0 dy"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textSlantUp":{"av":[{"name":"adj","fmla":"val 55555"}],"gd":[{"name":"a","fmla":"pin 0 adj 71431"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"y2","fmla":"+- b 0 dy"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]}]},"textStop":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 14286 adj 50000"},{"name":"dx","fmla":"*/ w 1 3"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"x1","fmla":"+- l dx 0"},{"name":"x2","fmla":"+- r 0 dx"},{"name":"y1","fmla":"+- t dy 0"},{"name":"y2","fmla":"+- b 0 dy"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]}]},"textTriangle":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 100000"},{"name":"y","fmla":"*/ a h 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textTriangleInverted":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 100000"},{"name":"y","fmla":"*/ a h 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y"}]}]}]},"textWave1":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 20000"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"of","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs of"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx5","fmla":"?: of2 of2 0"},{"name":"x5","fmla":"+- r 0 dx5"},{"name":"dx3","fmla":"+/ dx2 x5 3"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"x4","fmla":"+/ x3 x5 2"},{"name":"x6","fmla":"+- l dx5 0"},{"name":"x10","fmla":"+- r dx2 0"},{"name":"x7","fmla":"+- x6 dx3 0"},{"name":"x8","fmla":"+/ x7 x10 2"},{"name":"x9","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc of 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y2"},{"x":"x4","y":"y3"},{"x":"x5","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x6","y":"y4"}]},{"c":"C","pts":[{"x":"x7","y":"y5"},{"x":"x8","y":"y6"},{"x":"x10","y":"y4"}]}]}]},"textWave2":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 20000"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"of","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs of"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx5","fmla":"?: of2 of2 0"},{"name":"x5","fmla":"+- r 0 dx5"},{"name":"dx3","fmla":"+/ dx2 x5 3"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"x4","fmla":"+/ x3 x5 2"},{"name":"x6","fmla":"+- l dx5 0"},{"name":"x10","fmla":"+- r dx2 0"},{"name":"x7","fmla":"+- x6 dx3 0"},{"name":"x8","fmla":"+/ x7 x10 2"},{"name":"x9","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc of 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y3"},{"x":"x4","y":"y2"},{"x":"x5","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x6","y":"y4"}]},{"c":"C","pts":[{"x":"x7","y":"y6"},{"x":"x8","y":"y5"},{"x":"x10","y":"y4"}]}]}]},"textWave4":{"av":[{"name":"adj1","fmla":"val 6250"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 12500"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"of","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs of"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx8","fmla":"?: of2 of2 0"},{"name":"x8","fmla":"+- r 0 dx8"},{"name":"dx3","fmla":"+/ dx2 x8 6"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"dx4","fmla":"+/ dx2 x8 3"},{"name":"x4","fmla":"+- x2 dx4 0"},{"name":"x5","fmla":"+/ x2 x8 2"},{"name":"x6","fmla":"+- x5 dx3 0"},{"name":"x7","fmla":"+/ x6 x8 2"},{"name":"x9","fmla":"+- l dx8 0"},{"name":"x15","fmla":"+- r dx2 0"},{"name":"x10","fmla":"+- x9 dx3 0"},{"name":"x11","fmla":"+- x9 dx4 0"},{"name":"x12","fmla":"+/ x9 x15 2"},{"name":"x13","fmla":"+- x12 dx3 0"},{"name":"x14","fmla":"+/ x13 x15 2"},{"name":"x16","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc of 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y3"},{"x":"x4","y":"y2"},{"x":"x5","y":"y1"}]},{"c":"C","pts":[{"x":"x6","y":"y3"},{"x":"x7","y":"y2"},{"x":"x8","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x9","y":"y4"}]},{"c":"C","pts":[{"x":"x10","y":"y6"},{"x":"x11","y":"y5"},{"x":"x12","y":"y4"}]},{"c":"C","pts":[{"x":"x13","y":"y6"},{"x":"x14","y":"y5"},{"x":"x15","y":"y4"}]}]}]},"upArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 h ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dy1","fmla":"*/ ss a2 100000"},{"name":"y1","fmla":"+- t dy1 0"},{"name":"dx1","fmla":"*/ w a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"dy2","fmla":"*/ x1 dy1 wd2"},{"name":"y2","fmla":"+- y1 dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"Z"}]}]}}'), Gs = {
  shapes: Ws
}, Ta = 6e4, wt = Math.PI / 180, Xs = {
  cd2: 180 * Ta,
  cd4: 90 * Ta,
  cd8: 45 * Ta,
  "3cd4": 270 * Ta,
  "3cd8": 135 * Ta,
  "5cd8": 225 * Ta,
  "7cd8": 315 * Ta
}, Vs = { dy: "dy1" }, Ys = Gs.shapes;
function Ks(a, t, s) {
  return a < t ? t : a > s ? s : a;
}
function Qs(a, t) {
  const s = Math.min(a, t);
  return {
    w: a,
    h: t,
    l: 0,
    t: 0,
    r: a,
    b: t,
    hc: a / 2,
    vc: t / 2,
    ls: Math.max(a, t),
    ss: s,
    ...Xs
  };
}
function Js(a, t) {
  const s = /^(wd|hd|ssd)(\d+)$/.exec(a);
  if (!s) return;
  const n = Number(s[2]);
  return !Number.isFinite(n) || n === 0 ? void 0 : (s[1] === "wd" ? t.w : s[1] === "hd" ? t.h : t.ss) / n;
}
function Ja(a, t) {
  if (a == null) return 0;
  const s = String(a).trim();
  if (s === "") return 0;
  const n = Number(s);
  if (Number.isFinite(n)) return n;
  let e = s;
  if (!Object.prototype.hasOwnProperty.call(t, e)) {
    const l = Vs[e];
    l && Object.prototype.hasOwnProperty.call(t, l) && (e = l);
  }
  if (Object.prototype.hasOwnProperty.call(t, e)) return t[e];
  const r = Js(e, t);
  return r === void 0 ? 0 : r;
}
function Wn(a, t) {
  const s = String(a || "").trim().split(/\s+/), n = s[0], e = (l) => Ja(s[l], t), r = (l) => l / Ta * wt;
  switch (n) {
    case "val":
      return e(1);
    case "*/":
      return e(1) * e(2) / (e(3) || 1);
    case "+-":
      return e(1) + e(2) - e(3);
    case "+/":
      return (e(1) + e(2)) / (e(3) || 1);
    case "?:":
      return e(1) > 0 ? e(2) : e(3);
    case "abs":
      return Math.abs(e(1));
    case "at2":
      return Math.atan2(e(2), e(1)) / wt * Ta;
    case "cos":
      return e(1) * Math.cos(r(e(2)));
    case "sin":
      return e(1) * Math.sin(r(e(2)));
    case "tan":
      return e(1) * Math.tan(r(e(2)));
    case "cat2":
      return e(1) * Math.cos(Math.atan2(e(3), e(2)));
    case "sat2":
      return e(1) * Math.sin(Math.atan2(e(3), e(2)));
    case "max":
      return Math.max(e(1), e(2));
    case "min":
      return Math.min(e(1), e(2));
    case "mod":
      return Math.sqrt(e(1) ** 2 + e(2) ** 2 + e(3) ** 2);
    case "pin":
      return Ks(e(2), e(1), e(3));
    case "sqrt":
      return Math.sqrt(Math.max(0, e(1)));
    default:
      return 0;
  }
}
function Pe(a, t, s, n) {
  const e = Qs(t, s);
  for (const r of a.av || []) {
    const l = n ? n[r.name] : void 0;
    e[r.name] = typeof l == "number" && Number.isFinite(l) ? l : Wn(r.fmla, e);
  }
  for (const r of a.gd || [])
    e[r.name] = Wn(r.fmla, e);
  return e;
}
function Ca(a) {
  return Number.isFinite(a) ? String(Math.round(a * 1e3) / 1e3) : "0";
}
function a0(a, t, s, n, e) {
  const r = Ja(t.wR, s), l = Ja(t.hR, s), m = r * n, c = l * e, i = Ja(t.stAng, s) / Ta * wt, d = Ja(t.swAng, s) / Ta * wt, o = (q) => Math.atan2(r * Math.sin(q), l * Math.cos(q)), x = r === 0 || l === 0, f = x ? i : o(i), y = x ? d : o(i + d) - f, u = x ? 0 : Math.round((d - y) / (2 * Math.PI)), p = y + u * 2 * Math.PI, A = a.x - m * Math.cos(f), w = a.y - c * Math.sin(f), b = Math.abs(m), L = Math.abs(c), v = Math.max(1, Math.ceil(Math.abs(p) / Math.PI - 1e-9)), T = p / v;
  let C = "", S = f;
  for (let q = 0; q < v; q += 1) {
    S += T;
    const R = A + m * Math.cos(S), k = w + c * Math.sin(S), g = Math.abs(T / wt) > 180 ? 1 : 0, P = T > 0 ? 1 : 0;
    C += ` A ${Ca(b)} ${Ca(L)} 0 ${g} ${P} ${Ca(R)} ${Ca(k)}`;
  }
  return {
    data: C,
    end: { x: A + m * Math.cos(S), y: w + c * Math.sin(S) }
  };
}
function Oe(a, t, s, n) {
  const e = a.w ? s / a.w : 1, r = a.h ? n / a.h : 1, l = (d) => ({
    x: Ja(d.x, t) * e,
    y: Ja(d.y, t) * r
  });
  let m = "", c = { x: 0, y: 0 }, i = !1;
  for (const d of a.cmds || [])
    switch (d.c) {
      case "M": {
        const o = l(d.pts[0]);
        c = o, i = !0, m += `${m ? " " : ""}M ${Ca(o.x)} ${Ca(o.y)}`;
        break;
      }
      case "L": {
        for (const o of d.pts) {
          const x = l(o);
          c = x, m += ` L ${Ca(x.x)} ${Ca(x.y)}`;
        }
        break;
      }
      case "C": {
        for (let o = 0; o + 2 < d.pts.length; o += 3) {
          const x = l(d.pts[o]), f = l(d.pts[o + 1]), y = l(d.pts[o + 2]);
          c = y, m += ` C ${Ca(x.x)} ${Ca(x.y)} ${Ca(f.x)} ${Ca(f.y)} ${Ca(y.x)} ${Ca(y.y)}`;
        }
        break;
      }
      case "Q": {
        for (let o = 0; o + 1 < d.pts.length; o += 2) {
          const x = l(d.pts[o]), f = l(d.pts[o + 1]);
          c = f, m += ` Q ${Ca(x.x)} ${Ca(x.y)} ${Ca(f.x)} ${Ca(f.y)}`;
        }
        break;
      }
      case "A": {
        if (!i) break;
        const o = a0(c, d, t, e, r);
        c = o.end, m += o.data;
        break;
      }
      case "Z":
        m += " Z";
        break;
    }
  return m.trim();
}
function t0(a, t, s, n) {
  const e = Ys[a];
  if (!e || !e.paths || e.paths.length === 0) return null;
  const r = Pe(e, t, s, n);
  let l = "", m = "";
  for (const c of e.paths) {
    const i = Oe(c, r, t, s);
    if (!i) continue;
    const d = c.stroke !== "false" && c.stroke !== "none", o = c.fill !== "none";
    d && (m += `${m ? " " : ""}${i}`), o && (l += `${l ? " " : ""}${i}`);
  }
  return { fill: l, stroke: m };
}
function Ne(a, t, s, n) {
  if (!a || !a.paths || a.paths.length === 0) return null;
  const e = Pe(a, t, s, n);
  let r = "";
  for (const l of a.paths) {
    const m = Oe(l, e, t, s);
    m && (r += `${r ? " " : ""}${m}`);
  }
  return r || null;
}
function jt(a) {
  const t = a.split(".").pop().toLowerCase();
  return {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    webp: "image/webp",
    bmp: "image/bmp",
    tif: "image/tiff",
    tiff: "image/tiff",
    emf: "image/x-emf",
    wmf: "image/x-wmf",
    // R122：动画音效 `<p:audio><p:sndTgt r:embed>` 指向的 part 也走这里。
    // 之前只有图片扩展名 ⇒ `audio1.wav` 被登记成 `application/octet-stream`，
    // 交给 Blob/<audio> 时 MIME 不对。与 media-runtime.js 的 EXTRA_MIME 保持同口径。
    wav: "audio/wav",
    mp3: "audio/mpeg",
    m4a: "audio/mp4",
    ogg: "audio/ogg"
  }[t] || "application/octet-stream";
}
let dt = null;
function n0(a) {
  if (!a || typeof a != "object")
    throw new Error("configureMedia(next): next 必须是对象");
  dt = a;
}
function cn(a) {
  if (!dt || dt[a] === void 0 || dt[a] === null)
    throw new Error(
      `media 模块未注入依赖 ${a} —— 调用方必须先 configureMedia({ ${a}, ... })`
    );
  return dt[a];
}
const vt = {
  get normalizeFontFamily() {
    return cn("normalizeFontFamily");
  },
  get measureOfficeGlyph() {
    return cn("measureOfficeGlyph");
  },
  // ⚠️ vendorBase 允许是 **thunk**（R9.1）：引擎顶层不再建 AssetResolver，
  // 注入方给的是 `() => ensureAssets().vendorBase`，取值时才决定 URL。
  // 另两项（normalizeFontFamily / measureOfficeGlyph）本身就是函数，走原样返回。
  get vendorBase() {
    const a = cn("vendorBase");
    return typeof a == "function" ? a() : a;
  }
};
async function e0(a, t) {
  return new Promise((s, n) => {
    const e = new FileReader();
    e.onload = () => s(e.result), e.onerror = () => n(e.error), e.readAsDataURL(new Blob([a], { type: t }));
  });
}
let qe = 0, Ze = 0;
function s0() {
  return {
    name: "utif",
    requests: qe,
    unavailable: Ze,
    available: typeof globalThis.UTIF < "u"
  };
}
function r0(a, t, s) {
  if (qe += 1, typeof UTIF > "u")
    return Ze += 1, null;
  try {
    const n = a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength), e = UTIF.decode(n), r = e == null ? void 0 : e[0];
    if (!r || (UTIF.decodeImage(n, r, e), !r.width || !r.height)) return null;
    const l = UTIF.toRGBA8(r), m = Math.min(1, t / r.width, s / r.height), c = Math.max(1, Math.round(r.width * m)), i = Math.max(1, Math.round(r.height * m)), d = document.createElement("canvas");
    d.width = c, d.height = i;
    const o = d.getContext("2d", { alpha: !0 });
    if (c === r.width && i === r.height) {
      const x = o.createImageData(c, i);
      x.data.set(l), o.putImageData(x, 0, 0);
    } else {
      const x = document.createElement("canvas");
      x.width = r.width, x.height = r.height;
      const f = x.getContext("2d", { alpha: !0 }), y = f.createImageData(r.width, r.height);
      y.data.set(l), f.putImageData(y, 0, 0), o.drawImage(x, 0, 0, c, i);
    }
    return d.toDataURL("image/png");
  } catch (n) {
    return console.warn("TIFF 转换失败", n), null;
  }
}
const l0 = [215, 205, 198, 154];
function Gn(a) {
  return a === 134 || a === 128 ? new TextDecoder("gb18030") : a === 136 ? new TextDecoder("big5") : a === 129 ? new TextDecoder("shift_jis") : new TextDecoder("windows-1252");
}
function m0(a) {
  const t = new DataView(a.buffer, a.byteOffset, a.byteLength);
  let s = 0, n = null;
  if (a.length > 22 && l0.every((m, c) => a[c] === m) && (n = {
    left: t.getInt16(6, !0),
    top: t.getInt16(8, !0),
    right: t.getInt16(10, !0),
    bottom: t.getInt16(12, !0)
  }, s = 22), a.length < s + 18) return null;
  const e = t.getUint16(s + 2, !0), r = [];
  let l = s + e * 2;
  for (; l + 6 <= a.length; ) {
    const m = t.getUint32(l, !0), c = t.getUint16(l + 4, !0);
    if (m < 3 || (r.push({
      func: c,
      data: a.subarray(l + 6, l + m * 2)
    }), c === 0)) break;
    l += m * 2;
  }
  return { records: r, placeable: n };
}
function Xn(a, t) {
  const s = a[t], n = a[t + 1];
  return `#${[a[t + 2], n, s].map((r) => r.toString(16).padStart(2, "0")).join("")}`;
}
function c0(a, t) {
  const s = /[A-Za-z0-9]/;
  let n = 0;
  for (const e of a) n += (s.test(e) ? 0.5 : 1) * t;
  return { width: n, ascent: t, descent: t * 0.25 };
}
function i0(a) {
  var x, f, y, u;
  const t = m0(a);
  if (!t) return null;
  const s = (p, A) => p.getInt16(A, !0), n = {
    windowOrg: [0, 0],
    windowExt: null,
    textAlign: 0,
    textColor: "#000000",
    position: [0, 0],
    objects: [],
    lines: [],
    texts: []
  }, e = (p) => String(p).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  for (const { func: p, data: A } of t.records) {
    const w = new DataView(A.buffer, A.byteOffset, A.byteLength);
    switch (p) {
      case 523:
        n.windowOrg = [s(w, 0), s(w, 2)];
        break;
      case 524:
        n.windowExt = [w.getUint16(0, !0), w.getUint16(2, !0)];
        break;
      case 521:
        n.textColor = Xn(A, 0);
        break;
      case 302:
        n.textAlign = w.getUint16(0, !0);
        break;
      case 762: {
        n.objects.push({
          kind: "pen",
          width: Math.abs(w.getInt16(2, !0)) || 1,
          color: Xn(A, 6)
        });
        break;
      }
      case 763: {
        const b = w.getInt16(0, !0), L = A.subarray(18, 50), v = L.indexOf(0), T = Gn(A[13]);
        n.objects.push({
          kind: "font",
          height: Math.abs(b),
          weight: w.getUint16(8, !0),
          italic: A[10],
          underline: A[11],
          strikeout: A[12],
          charset: A[13],
          face: T.decode(L.subarray(0, v < 0 ? L.length : v)).trim()
        });
        break;
      }
      case 301:
        n.currentObject = n.objects[w.getUint16(0, !0)] || null;
        break;
      case 296:
        break;
      case 532:
        n.position = [s(w, 2), s(w, 0)];
        break;
      case 531: {
        const [b, L] = n.position, v = s(w, 2), T = s(w, 0), C = ((x = n.currentObject) == null ? void 0 : x.kind) === "pen" ? n.currentObject : { width: 1, color: "#000000" };
        n.lines.push({ x1: b, y1: L, x2: v, y2: T, width: C.width, color: C.color }), n.position = [v, T];
        break;
      }
      case 1313: {
        const b = w.getUint16(0, !0), L = A.subarray(2, 2 + b), v = s(w, 2 + b + b % 2), T = s(w, 4 + b + b % 2);
        n.texts.push({
          x: T,
          y: v,
          text: new TextDecoder("windows-1252").decode(L),
          font: ((f = n.currentObject) == null ? void 0 : f.kind) === "font" ? n.currentObject : { height: 100, weight: 400, face: "Times New Roman" },
          color: n.textColor
        });
        break;
      }
      case 2610: {
        const b = s(w, 0), L = s(w, 2), v = w.getUint16(4, !0), T = w.getUint16(6, !0);
        let C = 8;
        T & 6 && (C += 8);
        const S = Gn(
          ((y = n.currentObject) == null ? void 0 : y.kind) === "font" ? n.currentObject.charset ?? 1 : 1
        ).decode(A.subarray(C, C + v));
        n.texts.push({
          x: L,
          y: b,
          text: S,
          font: ((u = n.currentObject) == null ? void 0 : u.kind) === "font" ? n.currentObject : { height: 100, weight: 400, face: "Times New Roman" },
          color: n.textColor
        });
        break;
      }
    }
  }
  if (!n.lines.length && !n.texts.length) return null;
  let r = 1 / 0, l = 1 / 0, m = -1 / 0, c = -1 / 0;
  for (const p of n.lines)
    r = Math.min(r, p.x1, p.x2), m = Math.max(m, p.x1, p.x2), l = Math.min(l, p.y1, p.y2), c = Math.max(c, p.y1, p.y2);
  for (const p of n.texts) {
    const A = p.font.height || 100, w = c0(p.text, A), b = p.x - w.width * 0.1;
    r = Math.min(r, b), m = Math.max(m, b + w.width * 1.2), l = Math.min(l, p.y - w.ascent), c = Math.max(c, p.y + w.descent);
  }
  if (!Number.isFinite(r)) return null;
  const i = (m - r) * 0.04 + 1, d = (c - l) * 0.04 + 1;
  r -= i, l -= d, m += i, c += d;
  const o = [
    ...n.lines.map((p) => `<line x1="${p.x1}" y1="${p.y1}" x2="${p.x2}" y2="${p.y2}" stroke="${p.color}" stroke-width="${p.width}"/>`),
    ...n.texts.map((p) => {
      const A = p.font, w = A.weight >= 700 ? "700" : "400", b = vt.normalizeFontFamily(A.face || "Times New Roman", A.weight >= 700);
      return `<text x="${p.x}" y="${p.y}" font-family="${e(b)}" font-size="${A.height}" font-weight="${w}" font-style="${A.italic ? "italic" : "normal"}"${A.underline || A.strikeout ? ` text-decoration="${[A.underline ? "underline" : "", A.strikeout ? "line-through" : ""].filter(Boolean).join(" ")}"` : ""} fill="${p.color}">${e(p.text)}</text>`;
    })
  ].join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${r} ${l} ${m - r} ${c - l}" preserveAspectRatio="none">${o}</svg>`;
}
function o0(a) {
  try {
    const t = i0(a);
    if (!t) return null;
    const s = new TextEncoder().encode(t);
    let n = "";
    for (const e of s) n += String.fromCharCode(e);
    return `data:image/svg+xml;base64,${btoa(n)}`;
  } catch (t) {
    return console.warn("WMF 解析失败", t), null;
  }
}
function f0(a) {
  if (a.length < 88 || a[0] !== 1 || a[40] !== 32 || a[41] !== 69 || a[42] !== 77 || a[43] !== 70) return null;
  const t = new DataView(a.buffer, a.byteOffset, a.byteLength), s = t.getUint32(4, !0), n = [
    t.getInt32(8, !0),
    t.getInt32(12, !0),
    t.getInt32(16, !0),
    t.getInt32(20, !0)
  ], e = [
    t.getInt32(24, !0),
    t.getInt32(28, !0),
    t.getInt32(32, !0),
    t.getInt32(36, !0)
  ], r = [t.getInt32(72, !0), t.getInt32(76, !0)], l = [t.getInt32(80, !0), t.getInt32(84, !0)];
  let m = null;
  if (l[0] > 0 && l[1] > 0 && e[2] > e[0] && e[3] > e[1]) {
    const d = r[0] / l[0], o = r[1] / l[1];
    m = [
      e[0] / 100 * d,
      e[1] / 100 * o,
      e[2] / 100 * d,
      e[3] / 100 * o
    ];
  }
  const c = [];
  let i = s;
  for (; i + 8 <= a.length; ) {
    const d = t.getUint32(i, !0), o = t.getUint32(i + 4, !0);
    if (o < 8 || i + o > a.length || (c.push({ type: d, data: a.subarray(i, i + o) }), d === 14)) break;
    i += o;
  }
  return { records: c, bounds: n, frame: m };
}
function on(a, t) {
  const s = a[t], n = a[t + 1], e = a[t + 2];
  return `#${[s, n, e].map((r) => r.toString(16).padStart(2, "0")).join("")}`;
}
function d0(a, t) {
  let s = "";
  for (let e = 0; e < a.length; e += 32768)
    s += String.fromCharCode.apply(null, a.subarray(e, e + 32768));
  return `data:${t};base64,${btoa(s)}`;
}
function x0(a, t) {
  const s = new DataView(a.buffer, a.byteOffset, a.byteLength), n = s.getInt16(t + 4, !0), e = s.getInt16(t + 6, !0), r = s.getUint16(t + 10, !0), l = 1 << r, m = new Uint8Array(40 + l * 4), c = new DataView(m.buffer);
  c.setUint32(0, 40, !0), c.setInt32(4, n, !0), c.setInt32(8, e, !0), c.setUint16(12, 1, !0), c.setUint16(14, r, !0), c.setUint32(32, l, !0);
  for (let i = 0; i < l; i += 1) {
    const d = t + 12 + i * 3;
    if (d + 3 > a.length) break;
    m[40 + i * 4] = a[d], m[40 + i * 4 + 1] = a[d + 1], m[40 + i * 4 + 2] = a[d + 2];
  }
  return m;
}
const y0 = { 4: "image/jpeg", 5: "image/png" };
function h0(a, t, s, n, e) {
  if (t + s > a.length || n + e > a.length) return null;
  const r = new DataView(a.buffer, a.byteOffset, a.byteLength), l = r.getUint32(t, !0), m = r.getUint32(t + 16, !0), c = y0[m];
  let i, d;
  if (c)
    i = null, d = a.subarray(n, n + e);
  else if (l === 12)
    i = x0(a, t), d = a.subarray(n, n + e);
  else if (l >= 40)
    i = a.subarray(t, t + s), d = a.subarray(n, n + e);
  else
    return null;
  const o = new Uint8Array((i ? 14 + i.length : 0) + d.length);
  if (i) {
    o[0] = 66, o[1] = 77;
    const x = new DataView(o.buffer);
    x.setUint32(2, o.length, !0), x.setUint32(10, 14 + i.length, !0), o.set(i, 14), o.set(d, 14 + i.length);
  } else
    o.set(d, 0);
  return { url: d0(o, c || "image/bmp") };
}
const p0 = 136, u0 = 238;
function g0(a, t = 0) {
  var g, P;
  const s = f0(a);
  if (!s) return null;
  const n = s.frame ? s.frame[2] - s.frame[0] : 0, e = n > 1 && t > 0 ? t / n : 0, r = {
    position: [0, 0],
    textAlign: 0,
    // TA_TOP|TA_LEFT
    textColor: "#000000",
    bkMode: 2,
    // OPAQUE
    pen: { width: 1, color: "#000000", style: 0 },
    brush: { color: "#ffffff", style: 0 },
    font: null,
    objects: /* @__PURE__ */ new Map(),
    lines: [],
    texts: [],
    fills: [],
    bitmaps: []
  }, l = [], m = () => ({
    position: [...r.position],
    textAlign: r.textAlign,
    textColor: r.textColor,
    pen: { ...r.pen },
    brush: { ...r.brush },
    font: r.font
  }), c = (E) => {
    E && (r.position = [...E.position], r.textAlign = E.textAlign, r.textColor = E.textColor, r.pen = { ...E.pen }, r.brush = { ...E.brush }, r.font = E.font);
  }, i = (E) => {
    E === 5 && (r.brush = { color: "#000000", style: 1 }), E === 8 && (r.pen = { width: 1, color: "#000000", style: 5 });
  };
  for (const { type: E, data: I } of s.records) {
    const U = new DataView(I.buffer, I.byteOffset, I.byteLength), D = (N) => U.getInt32(N, !0);
    switch (E) {
      case 9:
      // EMR_SETWINDOWEXTEX — MM_TEXT 下忽略
      case 10:
      // EMR_SETWINDOWORGEX
      case 13:
      // EMR_SETBRUSHORGEX
      case 30:
      // EMR_INTERSECTCLIPRECT
      case 18:
        E === 18 && (r.bkMode = U.getUint32(8, !0));
        break;
      case 14:
        break;
      case 22:
        r.textAlign = U.getUint32(8, !0);
        break;
      case 24:
        r.textColor = on(I, 8);
        break;
      case 25:
        break;
      case 33:
        l.push(m());
        break;
      case 34: {
        const N = D(8);
        if (N < 0) {
          const B = l.length + N;
          B >= 0 && (c(l[B]), l.length = B);
        }
        break;
      }
      case 37: {
        const N = U.getUint32(8, !0);
        if (r.objects.has(N)) {
          const B = r.objects.get(N);
          B.kind === "pen" ? r.pen = B : B.kind === "brush" ? r.brush = B : B.kind === "font" && (r.font = B);
        } else
          i(N);
        break;
      }
      case 38: {
        const N = U.getUint32(12, !0);
        r.objects.set(U.getUint32(8, !0), {
          kind: "pen",
          style: N,
          width: Math.abs(D(16)) || 1,
          color: on(I, 24)
        });
        break;
      }
      case 39: {
        const N = U.getUint32(12, !0);
        r.objects.set(U.getUint32(8, !0), {
          kind: "brush",
          style: N,
          color: on(I, 16)
        });
        break;
      }
      case 40:
        r.objects.delete(U.getUint32(8, !0));
        break;
      case 27:
        r.position = [D(8), D(12)];
        break;
      case 54: {
        const [N, B] = r.position, _ = D(8), J = D(12);
        r.pen.style !== 5 && r.lines.push({ x1: N, y1: B, x2: _, y2: J, width: r.pen.width, color: r.pen.color }), r.position = [_, J];
        break;
      }
      case 82: {
        const N = D(12), B = D(28), _ = ((P = (g = I.subarray(40, 104)).decode) == null ? void 0 : P.call(g)) ?? new TextDecoder("utf-16le").decode(I.subarray(40, 104));
        r.objects.set(U.getUint32(8, !0), {
          kind: "font",
          height: N < 0 ? -N : Math.round(N * 0.86),
          weight: B,
          italic: I[32],
          underline: I[33],
          strikeout: I[34],
          face: _.split("\0")[0].trim()
        });
        break;
      }
      case 84: {
        const N = U.getUint32(44, !0), B = U.getUint32(48, !0), _ = U.getUint32(52, !0), J = U.getUint32(72, !0), aa = D(36), Q = D(40);
        if (N === 0 || B + N * 2 > I.length) break;
        const pa = new TextDecoder("utf-16le").decode(
          I.subarray(B, B + N * 2)
        );
        let Aa = 0, xa = null;
        if (J && J + N * 4 <= I.length) {
          xa = [];
          for (let ma = 0; ma < N; ma += 1) {
            const h = D(J + ma * 4);
            xa.push(h), Aa += Math.abs(h);
          }
        }
        _ & 2 && r.fills.push({
          x: D(56),
          y: D(60),
          w: D(64) - D(56),
          h: D(68) - D(60),
          color: "#ffffff"
        });
        const wa = r.font || { height: 12, weight: 400, face: "Times New Roman" }, V = (r.textAlign & 1) === 1, K = V ? r.position[0] : aa, ya = V ? r.position[1] : Q;
        r.texts.push({
          x: K,
          y: ya,
          text: pa,
          font: wa,
          color: r.textColor,
          dxs: xa || [],
          align: r.textAlign
        }), V && (r.position = [K + (Aa || 0), ya]);
        break;
      }
      case 81: {
        const N = D(24), B = D(28), _ = D(72), J = D(76), aa = U.getUint32(48, !0);
        if (_ <= 0 || J <= 0) break;
        r.bitmaps.push({
          x: N,
          y: B,
          w: _,
          h: J,
          data: I,
          offBmi: aa,
          cbBmi: U.getUint32(52, !0),
          offBits: U.getUint32(56, !0),
          cbBits: U.getUint32(60, !0),
          rop3: U.getUint32(68, !0) >>> 16
        });
        break;
      }
      case 76: {
        const N = U.getUint32(40, !0), B = D(24), _ = D(28), J = D(32), aa = D(36);
        if (J > 0 && aa > 0) {
          let Q = null;
          N === 66 ? Q = "#000000" : N === 16711778 ? Q = "#ffffff" : N === 15728673 && (Q = r.brush && r.brush.style !== 1 ? r.brush.color || "#ffffff" : null), Q && r.fills.push({ x: B, y: _, w: J, h: aa, color: Q });
        }
        break;
      }
    }
  }
  if (!r.lines.length && !r.texts.length && !r.fills.length && !r.bitmaps.length) return null;
  const d = r.bitmaps.map((E) => {
    E.rop3 !== p0 && E.rop3 !== u0 && typeof window < "u" && (window.__pptSdkEmfBitmapLog || (window.__pptSdkEmfBitmapLog = [])).push(`rop3=0x${E.rop3.toString(16)}`);
    const I = h0(E.data, E.offBmi, E.cbBmi, E.offBits, E.cbBits);
    return I ? `<image x="${E.x}" y="${E.y}" width="${E.w}" height="${E.h}" href="${I.url}" preserveAspectRatio="none"/>` : "";
  }), o = (E) => String(E).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"), x = (E) => vt.normalizeFontFamily(E.face || "Times New Roman", E.weight >= 700), f = (E) => e > 0 ? {
    fontFamily: x(E.font),
    fontSize: E.font.height * e,
    bold: E.font.weight >= 700,
    italic: !!E.font.italic
  } : null, y = (E, I, U) => {
    const D = E.text.charCodeAt(U), N = D >= 55296 && D <= 57343;
    return I && !N ? vt.measureOfficeGlyph(E.text[U], I) / e : Math.abs(E.dxs[U] || 0);
  };
  for (const E of r.texts) {
    const I = f(E), U = E.text.length, D = new Array(U);
    D[0] = E.x;
    for (let N = 0; N < U - 1; N += 1)
      D[N + 1] = D[N] + y(E, I, N);
    E.positions = D, E.advanceTotal = U > 1 ? D[U - 1] - D[0] + y(E, I, U - 2) : 0;
  }
  const u = /* @__PURE__ */ new Map();
  for (const E of r.texts)
    E.text.length < 2 || !E.advanceTotal || (u.has(E.y) || u.set(E.y, []), u.get(E.y).push(E));
  for (const E of u.values()) {
    if (E.length < 2) continue;
    E.sort((U, D) => U.x - D.x);
    let I = null;
    for (const U of E) {
      if (I !== null && Math.abs(U.x - I) <= 1) {
        const D = I - U.x;
        U.x += D;
        for (let N = 0; N < U.positions.length; N += 1) U.positions[N] += D;
      }
      I = U.x + U.advanceTotal;
    }
  }
  const p = [
    // 位图（STRETCHDIBITS）排在填充/线条/文字之前：GDI 按记录顺序绘制，
    // 而这些位图是作为底图贴上去的（image5.emf 里它们之后只有一条 NOP 的 BITBLT）。
    ...d,
    ...r.fills.filter((E) => E.color).map((E) => `<rect x="${E.x}" y="${E.y}" width="${E.w}" height="${E.h}" fill="${E.color}"/>`),
    ...r.lines.map((E) => `<line x1="${E.x1}" y1="${E.y1}" x2="${E.x2}" y2="${E.y2}" stroke="${E.color}" stroke-width="${E.width}"/>`),
    ...r.texts.map((E) => {
      const I = E.font;
      E.align & 6;
      const U = E.align & 24, D = U === 24 || U === 8 ? E.y : E.y + I.height * 0.8, N = [
        `x="${E.x}"`,
        `y="${D}"`,
        `font-family="${o(x(I))}"`,
        `font-size="${I.height}"`,
        `font-weight="${I.weight >= 700 ? "700" : "400"}"`,
        `font-style="${I.italic ? "italic" : "normal"}"`,
        `fill="${E.color}"`
      ];
      (I.underline || I.strikeout) && N.push(`text-decoration="${[I.underline ? "underline" : "", I.strikeout ? "line-through" : ""].filter(Boolean).join(" ")}"`);
      const B = E.dxs;
      if (E.positions && B && B.length === E.text.length && B.some((_) => _ !== 0)) {
        const _ = [];
        for (let J = 0; J < E.text.length; J += 1)
          _.push(`<tspan x="${E.positions[J]}">${o(E.text[J])}</tspan>`);
        return `<text ${N.join(" ")}>${_.join("")}</text>`;
      }
      if (B && B.length > 0) {
        const _ = B.reduce((J, aa) => J + Math.abs(aa), 0);
        _ > 0 && N.push(`textLength="${_}" lengthAdjust="spacing"`);
      }
      return `<text ${N.join(" ")}>${o(E.text)}</text>`;
    })
  ].join(""), [A, w, b, L] = s.bounds;
  let v = Math.min(A, b), T = Math.min(w, L), C = Math.max(A, b), S = Math.max(w, L);
  if (s.frame) {
    const [E, I, U, D] = s.frame;
    U - E >= 1 && D - I >= 1 && (v = E, T = I, C = U, S = D);
  }
  const q = C - v, R = S - T;
  for (const E of r.lines)
    v = Math.min(v, E.x1, E.x2), C = Math.max(C, E.x1, E.x2), T = Math.min(T, E.y1, E.y2), S = Math.max(S, E.y1, E.y2);
  if (C - v < 1 || S - T < 1) return null;
  const k = Math.max((C - v) / q, (S - T) / R) - 1;
  return k > 0.01 && typeof window < "u" && (window.__pptSdkEmfSpillLog || (window.__pptSdkEmfSpillLog = [])).push(Math.round(k * 1e3) / 10), `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${v} ${T} ${C - v} ${S - T}" preserveAspectRatio="none">${p}</svg>`;
}
function w0(a, t = 0) {
  try {
    const s = g0(a, t);
    if (!s) return null;
    const n = new TextEncoder().encode(s);
    let e = "";
    for (const r of n) e += String.fromCharCode(r);
    return `data:image/svg+xml;base64,${btoa(e)}`;
  } catch (s) {
    return console.warn("EMF 解析失败", s), null;
  }
}
function Vn(a, t, s = !1) {
  if (s) {
    for (let n = a.length - t.length; n >= 0; n -= 1) {
      let e = !0;
      for (let r = 0; r < t.length; r += 1)
        if (a[n + r] !== t[r]) {
          e = !1;
          break;
        }
      if (e) return n;
    }
    return -1;
  }
  for (let n = 0; n <= a.length - t.length; n += 1) {
    let e = !0;
    for (let r = 0; r < t.length; r += 1)
      if (a[n + r] !== t[r]) {
        e = !1;
        break;
      }
    if (e) return n;
  }
  return -1;
}
const A0 = Symbol("optional-capability-unavailable");
function b0({ name: a, load: t }) {
  if (!a.trim())
    throw new Error("createOptionalCapability: name 必须是非空字符串");
  if (typeof t != "function")
    throw new Error(`createOptionalCapability(${a}): load 必须是函数`);
  let s = "idle", n = null, e = null, r = 0, l = 0, m = null;
  function c() {
    return s === "ready" ? Promise.resolve(n) : e || (r += 1, s = "loading", e = (async () => {
      const o = await t();
      return o === A0 ? (s = "idle", e = null, null) : (n = o, s = "ready", e = null, n);
    })().catch((o) => {
      throw e = null, s = "idle", l += 1, m = o instanceof Error ? o.message : String(o), o;
    }), e);
  }
  function i() {
    return {
      name: a,
      state: s,
      attempts: r,
      failures: l,
      unavailable: s === "idle" && r > 0 && l === 0,
      lastError: m
    };
  }
  function d() {
    s = "idle", n = null, e = null, r = 0, l = 0, m = null;
  }
  return {
    get: c,
    stats: i,
    reset: d,
    get state() {
      return s;
    }
  };
}
function v0(a) {
  const t = [37, 80, 68, 70, 45], s = [37, 37, 69, 79, 70], n = Vn(a, t), e = Vn(a, s, !0);
  return n < 0 || e <= n ? null : a.slice(n, e + s.length);
}
const ze = b0({
  name: "pdfjs",
  load: async () => {
    const a = await import(
      /* @vite-ignore */
      new URL("pdf.min.mjs", vt.vendorBase).href
    );
    return a.GlobalWorkerOptions.workerSrc = new URL(
      "pdf.worker.min.mjs",
      vt.vendorBase
    ).href, a;
  }
});
let at = null;
function L0(a) {
  if (!a || typeof a != "object" || typeof a.getDocument != "function")
    throw new Error("configurePdfJs(pdfjs): 必须是 pdf.js 模块对象（需要 getDocument()）");
  at = a;
}
function He() {
  return at ? "injected" : "vendor";
}
function Ue() {
  if (!at) return "(vendor 路径，由引擎自己设置)";
  const a = at.GlobalWorkerOptions && at.GlobalWorkerOptions.workerSrc;
  return a ? String(a) : "(未设置)";
}
function R0() {
  return at || ze.get();
}
function M0() {
  return ze.stats();
}
async function $0(a, t, s) {
  const r = await (await R0()).getDocument({ data: a }).promise;
  try {
    const l = await r.getPage(1), m = l.getViewport({ scale: 1 }), c = Math.max(
      0.1,
      Math.min(t / m.width, s / m.height)
    ), i = l.getViewport({ scale: c }), d = document.createElement("canvas");
    d.width = Math.max(1, Math.ceil(i.width)), d.height = Math.max(1, Math.ceil(i.height));
    const o = d.getContext("2d", { alpha: !0 });
    return await l.render({
      canvasContext: o,
      viewport: i,
      background: "rgba(0,0,0,0)"
    }).promise, d.toDataURL("image/png");
  } finally {
    await r.destroy();
  }
}
function uc() {
  return [M0(), s0()];
}
function j0(a) {
  return new Promise((t, s) => {
    const n = new Image();
    n.onload = () => t(n), n.onerror = () => s(new Error(
      `clrChange: 图片解码失败 len=${String(a).length} head=${String(a).slice(0, 60)}`
    )), n.src = a;
  });
}
function Yn(a) {
  return Number.isFinite(a) && a > 0;
}
async function k0(a, t) {
  if (typeof a != "string" || !t || !t.from || !t.to || typeof document > "u") return null;
  const s = await j0(a), n = s.naturalWidth || s.width, e = s.naturalHeight || s.height;
  if (!Yn(n) || !Yn(e)) return null;
  const r = document.createElement("canvas");
  r.width = n, r.height = e;
  const l = r.getContext("2d", { willReadFrequently: !0 });
  if (!l) return null;
  l.drawImage(s, 0, 0);
  const m = l.getImageData(0, 0, n, e), c = m.data, { from: i, to: d } = t, o = Number.isFinite(t.tolerance) ? Math.max(0, t.tolerance) : 0;
  for (let x = 0; x < c.length; x += 4)
    Math.abs(c[x] - i.r) <= o && Math.abs(c[x + 1] - i.g) <= o && Math.abs(c[x + 2] - i.b) <= o && (c[x] = d.r, c[x + 1] = d.g, c[x + 2] = d.b, c[x + 3] = d.a);
  return l.putImageData(m, 0, 0), r.toDataURL("image/png");
}
async function We(a, t, s = 2048, n = 2048, e = 0, r = null, l = null) {
  if (t === "image/tiff" || t === "image/x-tiff")
    return r0(a, s, n);
  if (t === "image/x-emf" || t === "image/x-wmf") {
    if (t === "image/x-wmf") {
      const o = o0(a);
      if (o) return o;
    }
    if (t === "image/x-emf") {
      const o = w0(a, e);
      if (o) return o;
      const x = v0(a);
      if (x)
        try {
          return await $0(x, s, n);
        } catch (f) {
          console.warn("EMF 内嵌 PDF 渲染失败，回退到 GDI 解析", f), l && l({
            code: "media.embedded-pdf-fallback",
            message: `EMF 内嵌 PDF 渲染失败，已回退 GDI 解析（pdf.js 来源=${He()}、workerSrc=${Ue()}）：${String(f && f.message || f).slice(0, 200)}`
          });
        }
    }
    if (typeof EmfConverter > "u") return null;
    const d = a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength);
    try {
      return await (t === "image/x-emf" ? EmfConverter.convertEmfToDataUrl : EmfConverter.convertWmfToDataUrl)(d, s, n, { dpiScale: 2 });
    } catch (o) {
      return console.warn(`${t} 转换失败`, o), null;
    }
  }
  const m = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/bmp"], i = m.includes(t) || t === "image/svg+xml" ? await e0(a, t) : null;
  if (!i || !r || !m.includes(t)) return i;
  try {
    return await k0(i, r) || i;
  } catch (d) {
    return console.warn("clrChange 应用失败，回退到原图", d), i;
  }
}
let xt = null;
function C0(a) {
  if (!a || typeof a != "object")
    throw new Error("configureChart(next): next 必须是对象");
  xt = a;
}
function Da(a) {
  if (!xt || xt[a] === void 0 || xt[a] === null)
    throw new Error(
      `chart 模块未注入依赖 ${a} —— 调用方必须先 configureChart({ ${a}, ... })`
    );
  return xt[a];
}
const ra = {
  get attribute() {
    return Da("attribute");
  },
  get childByName() {
    return Da("childByName");
  },
  get descendantsByName() {
    return Da("descendantsByName");
  },
  get firstDescendant() {
    return Da("firstDescendant");
  },
  get escapeXml() {
    return Da("escapeXml");
  },
  get identityAttributes() {
    return Da("identityAttributes");
  },
  get measureStyledText() {
    return Da("measureStyledText");
  },
  get normalizeFontFamily() {
    return Da("normalizeFontFamily");
  },
  get parseFill() {
    return Da("parseFill");
  },
  get transformAttribute() {
    return Da("transformAttribute");
  },
  get defaultTheme() {
    return Da("defaultTheme");
  }
}, _0 = ["accent1", "accent2", "accent3", "accent4", "accent5", "accent6"], Ge = 18, S0 = 22, F0 = 5.72, E0 = 0.6256, I0 = 0.3611, D0 = 0.6111, Kn = 0.4222, Qn = 0.9361, Jn = 0.6222, ae = 0.3722, fn = 15.65, Xe = 1.0667, qt = 2.01, nt = 0.952, It = 1.221, te = 0.295, ne = 1.5, dn = 2.25, T0 = 0.75, B0 = 1 / 3, P0 = 0.2, O0 = 1.211, ee = 6.8, N0 = 0.472, q0 = 0.8889, Z0 = 0.5444, z0 = 0.3722, se = 0.55, H0 = ["barChart", "lineChart", "pieChart", "areaChart", "doughnutChart"], U0 = ["radarChart", "scatterChart", "ofPieChart", "bubbleChart", "stockChart", "surfaceChart"];
function Dt(a, t, s) {
  a && a.diagnostics && typeof a.diagnostics.add == "function" && a.diagnostics.add({ code: t, severity: "warn", message: s });
}
function W0(a, t, s) {
  var q, R, k, g, P, E;
  if (!a) return null;
  const n = ra.firstDescendant(a, "chart"), e = n || a;
  let r = null, l = "", m = null;
  const c = [];
  let i = [];
  const d = H0.filter((I) => ra.firstDescendant(e, I));
  if (d.length > 1 && Dt(
    s,
    "chart.combo",
    `组合图：同时出现 ${d.map((I) => I.replace("Chart", "")).join("/")}`
  ), r = d.length ? d[0].replace("Chart", "") : null, d.length && ra.firstDescendant(e, d[0]), !r) {
    const I = U0.find((U) => ra.firstDescendant(e, U));
    return Dt(
      s,
      "chart.unsupported-type",
      I ? `不支持的图表类型 ${I.replace("Chart", "")}：整图降级为不支持元素` : "图表无类型节点：整图降级为不支持元素"
    ), null;
  }
  r !== "bar" && r !== "line" && Dt(
    s,
    "chart.approximated",
    `图表类型 ${r} 暂无原生渲染，按单系列柱状近似`
  );
  const o = Number(ra.attribute(ra.firstDescendant(e, "defRPr"), "sz", "")), x = Number.isFinite(o) && o > 0 ? o / 100 : Ge, f = ra.firstDescendant(e, "varyColors"), y = f ? ra.attribute(f, "val", "1") !== "0" : !0, u = ra.childByName(n, "legend"), p = u ? {
    pos: ra.attribute(ra.firstDescendant(u, "legendPos"), "val", "r"),
    overlay: ra.attribute(ra.firstDescendant(u, "overlay"), "val", "0") === "1"
  } : null, A = [...ra.descendantsByName(e, "valAx")].map((I) => {
    const U = ra.firstDescendant(I, "numFmt"), D = ra.attribute(U, "sourceLinked", "1") === "1";
    return {
      axPos: ra.attribute(ra.childByName(I, "axPos"), "val", "l"),
      numFmt: U && !D ? ra.attribute(U, "formatCode", "") : "",
      majorGridlines: !!ra.firstDescendant(I, "majorGridlines")
    };
  }), w = !!(A[0] && A[0].majorGridlines), b = ra.firstDescendant(e, "title");
  if (b) {
    const I = ra.firstDescendant(b, "tx");
    if (I) {
      const D = ra.firstDescendant(I, "v");
      D && D.textContent && (l = D.textContent.trim());
    }
    const U = Number(ra.attribute(ra.firstDescendant(b, "defRPr"), "sz", ""));
    Number.isFinite(U) && U > 0 && (m = U / 100);
  }
  const L = ra.firstDescendant(e, "ser");
  if (L) {
    const I = ra.firstDescendant(L, "cat"), U = I ? ra.firstDescendant(I, "strCache") || ra.firstDescendant(I, "numCache") : null;
    U && (i = [...ra.descendantsByName(U, "pt")].map((D) => {
      var N, B;
      return ((B = (N = ra.firstDescendant(D, "v")) == null ? void 0 : N.textContent) == null ? void 0 : B.trim()) || "";
    }).filter((D) => D !== ""));
  }
  const v = /* @__PURE__ */ new Map();
  [...ra.descendantsByName(e, "valAx")].forEach((I, U) => {
    v.set(ra.attribute(ra.childByName(I, "axId"), "val", ""), U);
  });
  const T = [];
  let C = 0;
  for (const I of d) {
    const U = ra.firstDescendant(e, I), D = I.replace("Chart", ""), N = [...ra.descendantsByName(U, "axId")].map((aa) => ra.attribute(aa, "val", "")), B = N.length > 1 ? v.get(N[1]) ?? 0 : 0, _ = ra.attribute(ra.childByName(U, "marker"), "val", "1") !== "0", J = { type: D, axisIndex: B, seriesIndexes: [] };
    for (const aa of ra.descendantsByName(U, "ser")) {
      let Q = "";
      const pa = ra.firstDescendant(aa, "tx");
      if (pa) {
        const $ = ra.firstDescendant(pa, "strCache") || ra.firstDescendant(pa, "numCache"), z = $ ? ra.firstDescendant($, "pt") : null, G = z ? ra.firstDescendant(z, "v") : null;
        G && G.textContent && (Q = G.textContent.trim());
      }
      const Aa = ra.firstDescendant(aa, "val"), xa = Aa ? ra.firstDescendant(Aa, "numCache") || ra.firstDescendant(Aa, "strCache") : null, wa = xa && ((R = (q = ra.childByName(xa, "formatCode")) == null ? void 0 : q.textContent) == null ? void 0 : R.trim()) || "", V = xa ? [...ra.descendantsByName(xa, "pt")].map(($) => {
        const z = ra.firstDescendant($, "v"), G = Number(z == null ? void 0 : z.textContent);
        return Number.isFinite(G) ? G : 0;
      }) : [];
      if (!V.length) continue;
      const K = ra.parseFill(ra.childByName(aa, "spPr"), null, t, null), ya = {};
      for (const $ of ra.descendantsByName(aa, "dPt")) {
        const z = Number(ra.attribute(ra.childByName($, "idx"), "val", "")), G = ra.parseFill(ra.childByName($, "spPr"), null, t, null);
        Number.isInteger(z) && z >= 0 && G && G !== "none" && (ya[z] = G);
      }
      const ma = ra.childByName(aa, "marker");
      let h = ra.attribute(ra.firstDescendant(ma, "symbol"), "val", "");
      h || (h = _ ? "auto" : "none");
      const W = ra.childByName(aa, "dLbls") || ra.childByName(U, "dLbls"), Z = ($) => ra.attribute(ra.firstDescendant(W, $), "val", "0") === "1", j = W ? ra.childByName(W, "numFmt") : null, M = {
        showVal: Z("showVal"),
        showCatName: Z("showCatName"),
        showSerName: Z("showSerName"),
        pos: W ? ra.attribute(ra.childByName(W, "dLblPos"), "val", "") : "",
        numFmt: j ? ra.attribute(j, "formatCode", "") : ""
      };
      J.seriesIndexes.push(C), C += 1, c.push({
        name: Q,
        values: V,
        color: K && K !== "none" ? K : null,
        markerSymbol: h,
        showValues: M.showVal,
        labels: M,
        pointColors: ya,
        axisIndex: B,
        sourceNumFmt: wa
      });
    }
    J.seriesIndexes.length && T.push(J);
  }
  for (let I = 0; I < A.length; I += 1) {
    if (A[I].numFmt) continue;
    const U = c.find((D) => (D.axisIndex ?? 0) === I && D.sourceNumFmt);
    U && (A[I].numFmt = U.sourceNumFmt);
  }
  if (!c.length) return null;
  const S = ra.attribute(ra.firstDescendant(n, "autoTitleDeleted"), "val", "0") === "1";
  return !l && !S && c.length === 1 && c[0].name && (l = c[0].name), c.some((I) => I.values.some((U) => U < 0)) && Dt(
    s,
    "chart.negative-value",
    "系列含负值：值轴下限截到 0，负值柱/点静默变 0 高"
  ), {
    chartType: r,
    title: l,
    titlePt: m,
    basePt: x,
    // 配色与字体在**解析期**解析好：renderChart 拿不到 theme（渲染层不穿 theme 参数），
    // 而这两样都必须来自主题（此前是模块级硬编码，这也是颜色错在根上的原因）。
    palette: _0.map((I) => t == null ? void 0 : t[I]).filter(Boolean),
    fontFamily: ra.normalizeFontFamily([(g = (k = t == null ? void 0 : t.fonts) == null ? void 0 : k.minor) == null ? void 0 : g.latin, (E = (P = t == null ? void 0 : t.fonts) == null ? void 0 : P.minor) == null ? void 0 : E.eastAsian], !1),
    varyColors: y,
    legend: p,
    majorGridlines: w,
    categories: i,
    series: c,
    // R44：值轴数组（次轴 combo 有 2 个）+ 类型分组（combo 逐类型渲染的依据）
    axes: A,
    typeGroups: T
  };
}
function G0(a, t, s) {
  const n = {
    fontFamily: s,
    fontSize: t,
    bold: !1,
    italic: !1,
    letterSpacing: 0
  };
  let e = 0;
  for (const r of a.series)
    r.name && (e = Math.max(e, ra.measureStyledText(r.name, n)));
  return t * Xe + qt * 96 / 72 + e;
}
function re(a, t) {
  return t === "0%" ? `${Math.round(a * 100)}%` : t === "0.0%" ? `${(a * 100).toFixed(1)}%` : t === "0.00%" ? `${(a * 100).toFixed(2)}%` : t === "0" ? String(Math.round(a)) : t === "0.0" ? a.toFixed(1) : t === "0.00" ? a.toFixed(2) : yt(a);
}
function yt(a) {
  return a >= 1e4 ? (a / 1e3).toFixed(0) + "k" : a >= 1e3 ? (a / 1e3).toFixed(1) + "k" : String(Math.round(a * 10) / 10);
}
function X0(a) {
  var Z, j, M;
  const t = a.chart;
  if (!t) return "";
  const { x: s, y: n, width: e, height: r } = a, l = ($) => $ * 96 / 72, m = l(t.basePt || Ge), c = t.fontFamily || "Arial", i = (Z = t.palette) != null && Z.length ? t.palette : [ra.defaultTheme.accent1], d = {
    fontFamily: c,
    fontSize: m,
    bold: !1,
    italic: !1,
    letterSpacing: 0
  }, o = "#000000", x = l(T0), f = t.series, y = t.categories.length ? t.categories : f[0].values.map(($, z) => `${z + 1}`), u = Math.max(1, y.length), p = f.length, w = ((j = t.axes) != null && j.length ? t.axes : [{ axPos: "l", numFmt: "", majorGridlines: t.majorGridlines }]).map(($, z) => {
    const G = f.filter((oa) => (oa.axisIndex ?? 0) === z).flatMap((oa) => oa.values), O = Math.max(...G.length ? G : [0], 0), Y = V0(O), sa = Y * (Math.floor(O / Y + 1e-9) + 1), ta = Math.max(1, Math.round(sa / Y)), ca = [];
    for (let oa = 0; oa <= ta; oa += 1) ca.push(Y * oa);
    return {
      ax: $,
      chartMax: sa,
      tickValues: ca,
      format: (oa) => $.numFmt ? re(oa, $.numFmt) : yt(oa)
    };
  }), b = ($) => {
    const z = w[$] || w[0];
    return (G) => B + J - G / z.chartMax * J;
  }, L = l(F0), v = m * E0, T = w[0], C = Math.max(
    ...T.tickValues.map(($) => ra.measureStyledText(T.format($), d))
  ), S = w[1] || null, q = S ? Math.max(...S.tickValues.map(($) => ra.measureStyledText(S.format($), d))) : 0, R = t.title ? l(t.titlePt ?? S0) : 0, k = t.legend ? G0(t, m, c) : 0, g = !!(t.legend && t.legend.pos === "b" && !t.legend.overlay), P = m * I0 + C + v + L, E = S ? m * z0 + q + v + L : m * D0 + (t.legend && !g ? l(fn) + k : 0), I = t.title ? m * Kn + R * It + m * Qn : m * q0, U = g ? Z0 : ae, D = m * Jn + m * It + m * U + (g ? m * N0 + m * It : 0), N = s + P, B = n + I, _ = Math.max(10, e - P - E), J = Math.max(10, r - I - D), aa = b(0), Q = S ? b(1) : aa, pa = _ / u, Aa = ($) => N + pa * ($ + 0.5), xa = aa(0), wa = xa + m * Jn + m * nt, V = ($, z) => `font-family="${ra.escapeXml(c)}" font-size="${$.toFixed(2)}" fill="${o}"` + (z ? ` text-anchor="${z}"` : ""), K = [];
  if (t.majorGridlines)
    for (const $ of T.tickValues) {
      const z = aa($);
      K.push(
        `<line x1="${N.toFixed(2)}" y1="${z.toFixed(2)}" x2="${(N + _).toFixed(2)}" y2="${z.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
      );
    }
  for (const $ of T.tickValues) {
    const z = aa($);
    K.push(
      `<line x1="${N.toFixed(2)}" y1="${z.toFixed(2)}" x2="${(N - L).toFixed(2)}" y2="${z.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
    ), K.push(
      `<text x="${(N - L - v).toFixed(2)}" y="${(z + m * te).toFixed(2)}" ${V(m, "end")}>${ra.escapeXml(T.format($))}</text>`
    );
  }
  if (K.push(
    `<line x1="${N.toFixed(2)}" y1="${B.toFixed(2)}" x2="${N.toFixed(2)}" y2="${xa.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
  ), S) {
    if (S.ax.majorGridlines)
      for (const $ of S.tickValues) {
        const z = Q($);
        K.push(
          `<line x1="${N.toFixed(2)}" y1="${z.toFixed(2)}" x2="${(N + _).toFixed(2)}" y2="${z.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
        );
      }
    for (const $ of S.tickValues) {
      const z = Q($);
      K.push(
        `<line x1="${(N + _).toFixed(2)}" y1="${z.toFixed(2)}" x2="${(N + _ + L).toFixed(2)}" y2="${z.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
      ), K.push(
        `<text x="${(N + _ + L + v).toFixed(2)}" y="${(z + m * te).toFixed(2)}" ${V(m, "start")}>${ra.escapeXml(S.format($))}</text>`
      );
    }
    K.push(
      `<line x1="${(N + _).toFixed(2)}" y1="${B.toFixed(2)}" x2="${(N + _).toFixed(2)}" y2="${xa.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
    );
  }
  t.majorGridlines || K.push(
    `<line x1="${N.toFixed(2)}" y1="${xa.toFixed(2)}" x2="${(N + _).toFixed(2)}" y2="${xa.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
  );
  for (let $ = 0; $ <= u; $ += 1) {
    const z = N + pa * $;
    K.push(
      `<line x1="${z.toFixed(2)}" y1="${xa.toFixed(2)}" x2="${z.toFixed(2)}" y2="${(xa + L).toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
    );
  }
  for (let $ = 0; $ < u; $ += 1)
    K.push(
      `<text x="${Aa($).toFixed(2)}" y="${wa.toFixed(2)}" ${V(m, "middle")}>${ra.escapeXml(String(y[$]))}</text>`
    );
  const ya = (M = t.typeGroups) != null && M.length ? t.typeGroups : [{ type: t.chartType, axisIndex: 0, seriesIndexes: f.map(($, z) => z) }], ma = /* @__PURE__ */ new Map();
  for (const $ of ya) $.seriesIndexes.forEach((z, G) => ma.set(z, G));
  const h = ($, z) => {
    var sa;
    const G = f[$], O = (sa = G.pointColors) == null ? void 0 : sa[z];
    if (O) return O;
    if (G.color) return G.color;
    const Y = t.varyColors && p === 1 ? z : ma.get($) ?? $;
    return i[Y % i.length];
  }, W = ($, z, G, O) => {
    const Y = $.labels || { showVal: $.showValues, showCatName: !1, showSerName: !1 };
    if (!Y.showVal && !Y.showCatName && !Y.showSerName) return;
    const sa = Aa(G), ta = Y.numFmt ? re($.values[G] ?? 0, Y.numFmt) : yt($.values[G] ?? 0);
    if (!Y.showCatName && !Y.showSerName) {
      K.push(
        `<text x="${sa.toFixed(2)}" y="${(O + m * nt).toFixed(2)}" ${V(m, "middle")}>${ra.escapeXml(ta)}</text>`
      );
      return;
    }
    const ca = [
      Y.showSerName ? $.name : "",
      Y.showCatName ? String(y[G] ?? "") : ""
    ].filter(Boolean).join(", ") + (Y.showVal ? "," : ""), oa = O - m * (P0 + 0.269);
    if (Y.showVal && K.push(
      `<text x="${sa.toFixed(2)}" y="${oa.toFixed(2)}" ${V(m, "middle")}>${ra.escapeXml(ta)}</text>`
    ), ca) {
      const da = oa - m * O0;
      K.push(
        `<text x="${sa.toFixed(2)}" y="${da.toFixed(2)}" ${V(m, "middle")}>${ra.escapeXml(ca)}</text>`
      );
    }
  };
  for (const $ of ya) {
    const z = $.axisIndex === 1 && S ? Q : aa;
    if ($.type === "bar") {
      const G = pa / (1 + ne), O = G / $.seriesIndexes.length;
      for (let Y = 0; Y < u; Y += 1) {
        const sa = N + pa * Y + (pa - G) / 2;
        $.seriesIndexes.forEach((ta, ca) => {
          const oa = f[ta].values[Y] ?? 0, da = sa + ca * O, F = z(oa);
          K.push(
            `<rect x="${da.toFixed(2)}" y="${F.toFixed(2)}" width="${O.toFixed(2)}" height="${Math.max(0, xa - F).toFixed(2)}" fill="${h(ta, Y)}"/>`
          ), f[ta].labels ? W(f[ta], ta, Y, F) : f[ta].showValues && K.push(
            `<text x="${(da + O / 2).toFixed(2)}" y="${(F + m * nt).toFixed(2)}" ${V(m, "middle")}>${ra.escapeXml(yt(oa))}</text>`
          );
        });
      }
    } else if ($.type === "line") {
      const G = l(dn);
      for (const O of $.seriesIndexes) {
        const Y = f[O], sa = h(O, O), ta = Y.values.map((oa, da) => [Aa(da), z(oa)]), ca = ta.map((oa, da) => `${da === 0 ? "M" : "L"} ${oa[0].toFixed(2)} ${oa[1].toFixed(2)}`).join(" ");
        if (K.push(`<path d="${ca}" fill="none" stroke="${sa}" stroke-width="${G.toFixed(2)}" stroke-linejoin="round"/>`), Y.markerSymbol === "auto") {
          const oa = l(ee);
          for (const da of ta)
            K.push(
              `<rect x="${(da[0] - oa / 2).toFixed(2)}" y="${(da[1] - oa / 2).toFixed(2)}" width="${oa.toFixed(2)}" height="${oa.toFixed(2)}" fill="${sa}"/>`
            );
        } else if (Y.markerSymbol && Y.markerSymbol !== "none") {
          const oa = G * 1.6;
          for (const da of ta)
            K.push(`<circle cx="${da[0].toFixed(2)}" cy="${da[1].toFixed(2)}" r="${oa.toFixed(2)}" fill="${sa}"/>`);
        }
        if (Y.showValues)
          for (let oa = 0; oa < ta.length; oa += 1)
            K.push(
              `<text x="${ta[oa][0].toFixed(2)}" y="${(ta[oa][1] - m * B0).toFixed(2)}" ${V(m, "middle")}>${ra.escapeXml(yt(Y.values[oa]))}</text>`
            );
      }
    } else {
      const G = pa / (1 + ne);
      for (let O = 0; O < u; O += 1) {
        const Y = $.seriesIndexes[0] ?? 0, sa = f[Y].values[O] ?? 0, ta = Aa(O) - G / 2, ca = z(sa);
        K.push(
          `<rect x="${ta.toFixed(2)}" y="${ca.toFixed(2)}" width="${G.toFixed(2)}" height="${Math.max(0, xa - ca).toFixed(2)}" fill="${h(Y, O)}"/>`
        );
      }
    }
  }
  if (t.title) {
    const $ = n + m * Kn + R * nt;
    K.push(
      `<text x="${(s + e / 2).toFixed(2)}" y="${$.toFixed(2)}" text-anchor="middle" font-family="${ra.escapeXml(c)}" font-size="${R.toFixed(2)}" font-weight="700" fill="${o}">${ra.escapeXml(t.title)}</text>`
    );
  }
  if (t.legend && !t.legend.overlay) {
    const $ = f.filter((O) => O.name), z = m * Xe, G = m * It;
    if (g) {
      const O = l(qt), Y = l(fn), sa = $.map((F) => z + O + ra.measureStyledText(F.name, d)), ta = sa.reduce((F, X) => F + X, 0) + Y * ($.length - 1);
      let ca = s + e / 2 - ta / 2;
      const oa = n + r - m * ae - G, da = oa + G / 2;
      $.forEach((F, X) => {
        const na = h(f.indexOf(F), X);
        if (t.chartType === "line" || ya.some((ia) => ia.type === "line" && ia.seriesIndexes.includes(f.indexOf(F)))) {
          const ia = da;
          K.push(
            `<line x1="${ca.toFixed(2)}" y1="${ia.toFixed(2)}" x2="${(ca + z).toFixed(2)}" y2="${ia.toFixed(2)}" stroke="${na}" stroke-width="${l(dn).toFixed(2)}"/>`
          );
          const la = l(ee);
          K.push(
            `<rect x="${(ca + z / 2 - la / 2).toFixed(2)}" y="${(ia - la / 2).toFixed(2)}" width="${la.toFixed(2)}" height="${la.toFixed(2)}" fill="${na}"/>`
          );
        } else
          K.push(
            `<rect x="${ca.toFixed(2)}" y="${(da - m * se / 2).toFixed(2)}" width="${z.toFixed(2)}" height="${(m * se).toFixed(2)}" fill="${na}"/>`
          );
        K.push(
          `<text x="${(ca + z + l(qt)).toFixed(2)}" y="${(oa + m * nt).toFixed(2)}" ${V(m)}>${ra.escapeXml(F.name)}</text>`
        ), ca += sa[X] + Y;
      });
    } else {
      const O = N + _ + l(fn), Y = O + z + l(qt), ta = ((t.title ? n + I - m * Qn : n) + n + r) / 2 - G * $.length / 2;
      $.forEach((ca, oa) => {
        const da = h(f.indexOf(ca), oa), F = ta + G * (oa + 0.5);
        t.chartType === "line" ? K.push(
          `<line x1="${O.toFixed(2)}" y1="${F.toFixed(2)}" x2="${(O + z).toFixed(2)}" y2="${F.toFixed(2)}" stroke="${da}" stroke-width="${l(dn).toFixed(2)}"/>`
        ) : K.push(
          `<rect x="${O.toFixed(2)}" y="${(F - m * 0.42).toFixed(2)}" width="${z.toFixed(2)}" height="${(m * 0.84).toFixed(2)}" fill="${da}"/>`
        ), K.push(
          `<text x="${Y.toFixed(2)}" y="${(ta + G * oa + m * nt).toFixed(2)}" ${V(m)}>${ra.escapeXml(ca.name)}</text>`
        );
      });
    }
  }
  return `<g${ra.identityAttributes(a)}${ra.transformAttribute(a)} data-chart="${ra.escapeXml(t.chartType)}">${K.join("")}</g>`;
}
function V0(a) {
  if (a <= 0) return 1;
  const t = a / 6, s = 10 ** Math.floor(Math.log10(t)), n = t / s;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : 5) * s;
}
let ht = null;
function Y0(a) {
  if (!a || typeof a != "object")
    throw new Error("configureGeometry(next): next 必须是对象");
  ht = a;
}
function K0(a) {
  if (!ht || ht[a] === void 0 || ht[a] === null)
    throw new Error(
      `geometry 模块未注入依赖 ${a} —— 调用方必须先 configureGeometry({ ${a} })`
    );
  return ht[a];
}
const Mn = {
  get escapeXml() {
    return K0("escapeXml");
  }
};
function Pa(a) {
  const t = [];
  if (a.rotation && t.push(
    `rotate(${a.rotation} ${a.x + a.width / 2} ${a.y + a.height / 2})`
  ), a.flipH || a.flipV) {
    const s = a.flipH ? -1 : 1, n = a.flipV ? -1 : 1;
    t.push(
      `translate(${a.x + a.width / 2} ${a.y + a.height / 2}) scale(${s} ${n}) translate(${-a.x - a.width / 2} ${-a.y - a.height / 2})`
    );
  }
  return t.length ? ` transform="${t.join(" ")}"` : "";
}
function Q0(a) {
  return !!a.flipH == !!a.flipV ? "" : Pa({ ...a, rotation: 0, flipH: !0, flipV: !1 });
}
function le(a, t, s, n, e, r, l) {
  const m = t + n / 2, c = Math.min(n / 4, s * 0.5), i = a + s / 2;
  return e === "left" ? `<path d="M ${a + s} ${t} Q ${i} ${t} ${i} ${t + c} L ${i} ${m - c} Q ${i} ${m} ${a} ${m} Q ${i} ${m} ${i} ${m + c} L ${i} ${t + n - c} Q ${i} ${t + n} ${a + s} ${t + n}" fill="none" ${l}/>` : `<path d="M ${a} ${t} Q ${i} ${t} ${i} ${t + c} L ${i} ${m - c} Q ${i} ${m} ${a + s} ${m} Q ${i} ${m} ${i} ${m + c} L ${i} ${t + n - c} Q ${i} ${t + n} ${a} ${t + n}" fill="none" ${l}/>`;
}
function J0(a, t, s, n, e = 0.2) {
  const r = Math.min(s * e, n * 1.3);
  return `M ${a + r} ${t} L ${a + s} ${t} L ${a + s - r} ${t + n} L ${a} ${t + n} Z`;
}
function $n(a, t, s, n, e, r, l = 0) {
  const m = l;
  return r === "right" ? e === 1 ? `M ${a} ${t} H ${a + s - m} V ${t + n}` : `M ${a} ${t} H ${a + s / 2} V ${t + n} H ${a + s - m}` : r === "down" ? e === 1 ? `M ${a} ${t} V ${t + n - m} H ${a + s}` : `M ${a} ${t} V ${t + n / 2} H ${a + s} V ${t + n - m}` : r === "left" ? e === 1 ? `M ${a + s} ${t} H ${a + m} V ${t + n}` : `M ${a + s} ${t} H ${a + s / 2} V ${t + n} H ${a + m}` : e === 1 ? `M ${a} ${t + n} V ${t + m} H ${a + s}` : `M ${a} ${t + n} V ${t + n / 2} H ${a + s} V ${t + m}`;
}
function jn(a, t) {
  return Math.abs(a) > Math.abs(t) * 1.2 ? a >= 0 ? "right" : "left" : Math.abs(t) > Math.abs(a) * 1.2 ? t >= 0 ? "down" : "up" : a >= 0 ? "right" : "down";
}
function me(a, t, s, n, e, r, l, m = {}) {
  const c = l ? n * 0.86 : n, i = (f) => a + s * f, d = (f) => t + c * f, o = [
    `M ${i(0.08)} ${d(0.64)}`,
    `C ${i(-0.01)} ${d(0.58)} ${i(0)} ${d(0.44)} ${i(0.11)} ${d(0.4)}`,
    `C ${i(0.05)} ${d(0.29)} ${i(0.14)} ${d(0.17)} ${i(0.27)} ${d(0.2)}`,
    `C ${i(0.29)} ${d(0.07)} ${i(0.44)} ${d(0.02)} ${i(0.53)} ${d(0.14)}`,
    `C ${i(0.63)} ${d(0.03)} ${i(0.79)} ${d(0.08)} ${i(0.81)} ${d(0.22)}`,
    `C ${i(0.94)} ${d(0.17)} ${i(1.02)} ${d(0.3)} ${i(0.96)} ${d(0.41)}`,
    `C ${i(1.04)} ${d(0.49)} ${i(0.99)} ${d(0.64)} ${i(0.88)} ${d(0.65)}`,
    `C ${i(0.92)} ${d(0.78)} ${i(0.8)} ${d(0.89)} ${i(0.68)} ${d(0.82)}`,
    `C ${i(0.59)} ${d(0.96)} ${i(0.42)} ${d(0.97)} ${i(0.34)} ${d(0.84)}`,
    `C ${i(0.22)} ${d(0.93)} ${i(0.08)} ${d(0.84)} ${i(0.12)} ${d(0.73)}`,
    `C ${i(0.04)} ${d(0.75)} ${i(-0.01)} ${d(0.68)} ${i(0.08)} ${d(0.64)} Z`
  ].join(" ");
  let x = "";
  if (l) {
    const f = Math.max(0.18, Math.min(0.82, 0.5 + Number(m.adj1 || 0) / 1e5)), y = f < 0.5 ? -1 : 1, u = a + s * (f - y * 0.035), p = a + s * f;
    x = [
      `<ellipse cx="${u}" cy="${t + n * 0.875}" rx="${s * 0.052}" ry="${n * 0.052}" fill="${e}" ${r}/>`,
      `<ellipse cx="${p}" cy="${t + n * 0.965}" rx="${s * 0.03}" ry="${n * 0.03}" fill="${e}" ${r}/>`
    ].join("");
  }
  return `<path d="${o}" fill="${e}" ${r}/>${x}`;
}
function ar(a, t, s, n) {
  const e = a + s * 0.72;
  return `M ${a} ${t} H ${e} L ${a + s} ${t + n / 2} L ${e} ${t + n} H ${a} Z`;
}
function tr(a, t, s, n) {
  const e = a + s * 0.36, r = a + s * 0.72;
  return `M ${a} ${t} H ${r} L ${a + s} ${t + n / 2} L ${r} ${t + n} H ${a} L ${e} ${t + n / 2} Z`;
}
function nr(a, t, s, n, e = {}) {
  const r = Number.isFinite(e.adj1) ? e.adj1 : -20833, l = Number.isFinite(e.adj2) ? e.adj2 : 62500, m = Number.isFinite(e.adj3) ? e.adj3 : 16667, c = a + s * (0.5 + r / 1e5), i = t + n * (0.5 + l / 1e5), d = Math.min(s, n) * (m / 1e5), o = Math.min(s, n) * 0.16, x = t + n, f = a + s, y = i < t;
  if (i > x || !y && i >= t || y) {
    const b = Math.max(a + o, Math.min(f - o, c - d)), L = Math.max(b, Math.min(f - o, c + d));
    return y ? [
      `M ${b} ${t}`,
      `L ${c} ${i} L ${L} ${t}`,
      `H ${f - o} Q ${f} ${t} ${f} ${t + o}`,
      `V ${x - o} Q ${f} ${x} ${f - o} ${x}`,
      `H ${a + o} Q ${a} ${x} ${a} ${x - o}`,
      `V ${t + o} Q ${a} ${t} ${b} ${t} Z`
    ].join(" ") : [
      `M ${a + o} ${t}`,
      `H ${f - o} Q ${f} ${t} ${f} ${t + o}`,
      `V ${x - o} Q ${f} ${x} ${f - o} ${x}`,
      `H ${L} L ${c} ${Math.max(i, x)} L ${b} ${x}`,
      `H ${a + o} Q ${a} ${x} ${a} ${x - o}`,
      `V ${t + o} Q ${a} ${t} ${a + o} ${t} Z`
    ].join(" ");
  }
  const p = c > f ? f : a, A = Math.max(t + o, Math.min(x - o, i - d)), w = Math.max(A, Math.min(x - o, i + d));
  return [
    `M ${a + o} ${t}`,
    `H ${f - o} Q ${f} ${t} ${f} ${t + o}`,
    `V ${x - o} Q ${f} ${x} ${f - o} ${x}`,
    `H ${a + o} Q ${a} ${x} ${a} ${x - o}`,
    `V ${t + o} Q ${a} ${t} ${a + o} ${t} Z`,
    `M ${c} ${i} L ${p} ${A} L ${p} ${w} Z`
  ].join(" ");
}
function er(a, t, s, n) {
  return [
    `M ${a + s / 2} ${t + n}`,
    `C ${a + s * 0.38} ${t + n * 0.86} ${a} ${t + n * 0.62} ${a} ${t + n * 0.3}`,
    `C ${a} ${t + n * 0.08} ${a + s * 0.27} ${t - n * 0.02} ${a + s / 2} ${t + n * 0.22}`,
    `C ${a + s * 0.73} ${t - n * 0.02} ${a + s} ${t + n * 0.08} ${a + s} ${t + n * 0.3}`,
    `C ${a + s} ${t + n * 0.62} ${a + s * 0.62} ${t + n * 0.86} ${a + s / 2} ${t + n} Z`
  ].join(" ");
}
function sr(a, t, s, n, e = 5) {
  const r = a + s / 2, l = t + n / 2, m = s / 2, c = n / 2, i = m * 0.4, d = c * 0.4, o = [];
  for (let x = 0; x < e * 2; x += 1) {
    const f = -Math.PI / 2 + x * Math.PI / e, y = x % 2 === 0 ? m : i, u = x % 2 === 0 ? c : d;
    o.push(`${r + Math.cos(f) * y} ${l + Math.sin(f) * u}`);
  }
  return `M ${o.join(" L ")} Z`;
}
function rr(a, t, s, n) {
  return [
    `M ${a + s * (0.5 - 0.3 / 2)} ${t + n}`,
    `H ${a + s * (0.5 + 0.3 / 2)}`,
    `V ${t + n * 0.38}`,
    `H ${a + s * 0.72}`,
    `V ${t}`,
    `L ${a + s} ${t + n * 0.24}`,
    `L ${a + s * 0.72} ${t + n * 0.48}`,
    `H ${a + s * (0.5 + 0.3 / 2)}`,
    `V ${t + n * 0.38}`,
    `H ${a + s * (0.5 - 0.3 / 2)} Z`
  ].join(" ");
}
function ce(a, t) {
  const s = a.height * (t ? 0.86 : 1), n = a.width * (t ? 0.18 : a.width > s * 1.5 ? 0.12 : 0.15), e = s * 0.16;
  return {
    ...a,
    x: a.x + n,
    y: a.y + e,
    width: Math.max(1, a.width - n * 2),
    height: Math.max(1, s - e * 2),
    text: a.text ? {
      ...a.text,
      insetLeft: 0,
      insetRight: 0,
      insetTop: 0,
      insetBottom: 0
    } : null
  };
}
function kn(a) {
  const t = a.dash ? ` stroke-dasharray="${a.dash}"` : "";
  return `stroke="${Mn.escapeXml(a.color)}" stroke-width="${a.width}"${t}`;
}
const At = {
  shaftTrim: 0.99231,
  axial: 4.56333,
  // 箭尖 → 帽远端（含贝塞尔控制点，视口取外包）
  lateralHalf: 2.32104,
  // 侧向半宽（含贝塞尔控制点）
  // 原样抄自 PDF 的顶点表：**X = 侧向、Y = 轴向（原点 = 箭尖、向后为负）**。
  // 搬进 marker 空间时用 (X,Y) → (tipX + Y·sLen, tipY + X·sW)：
  // marker 的 **+x = 线的前进方向**，所以「向后」的 Y 必须映射到 −x。
  cmds: [
    ["M", 2.1819, -3.74038],
    ["L", 0, 0],
    ["L", -2.1819, -3.74038],
    ["C", -2.32102, -3.97891, -2.24047, -4.28507, -2.00193, -4.4242],
    ["C", -1.7634, -4.56333, -1.45724, -4.48278, -1.31811, -4.24424],
    ["L", 0.43189, -1.24424],
    ["L", -0.43189, -1.24424],
    ["L", 1.31811, -4.24424],
    ["C", 1.45727, -4.48278, 1.76342, -4.56333, 2.00193, -4.4242],
    ["C", 2.24047, -4.28507, 2.32104, -3.97891, 2.1819, -3.74038],
    ["Z"]
  ]
};
function lr(a, t, s, n) {
  const e = (r) => (Math.round(r * 1e4) / 1e4).toString();
  return At.cmds.map((r) => {
    let l = r[0];
    for (let m = 1; m < r.length; m += 2)
      l += ` ${e(s + r[m + 1] * t)} ${e(n + r[m] * a)}`;
    return l;
  }).join(" ");
}
function ie(a, t, s) {
  const n = Tt(a.w, 4), e = Tt(a.len, 5);
  if (a.type === "triangle" || a.type === "stealth" || a.type === "diamond" || a.type === "oval")
    return `<marker id="${s}" markerWidth="${e}" markerHeight="${n}" refX="${e}" refY="${n / 2}" orient="auto-start-reverse" markerUnits="strokeWidth"><path d="M 0 0 L ${e} ${n / 2} L 0 ${n} Z" fill="${Mn.escapeXml(t)}"/></marker>`;
  if (a.type === "arrow") {
    const r = Tt(a.w, 1), l = Tt(a.len, 1), m = 0.05, c = At.axial * l + m * 2, i = At.lateralHalf * 2 * r + m * 2, d = c - m, o = i / 2, x = d - At.shaftTrim * l, f = lr(r, l, d, o);
    return `<marker id="${s}" markerWidth="${c}" markerHeight="${i}" refX="${x}" refY="${o}" orient="auto-start-reverse" markerUnits="strokeWidth"><path d="${f}" fill="${Mn.escapeXml(t)}"/></marker>`;
  }
  return "";
}
const Tt = (a, t) => a === "sm" ? t * 0.6 : a === "lg" ? t * 1.5 : t;
function mr(a) {
  var s, n;
  const t = At.shaftTrim;
  return {
    start: ((s = a == null ? void 0 : a.headEnd) == null ? void 0 : s.type) === "arrow" ? t * a.width : 0,
    end: ((n = a == null ? void 0 : a.tailEnd) == null ? void 0 : n.type) === "arrow" ? t * a.width : 0
  };
}
function cr(a, t = "line") {
  const s = [], n = [];
  if (a.headEnd) {
    const e = `arrow-start-${t}`;
    s.push(ie(a.headEnd, a.color, e)), n.push(`marker-start="url(#${e})"`);
  }
  if (a.tailEnd) {
    const e = `arrow-end-${t}`;
    s.push(ie(a.tailEnd, a.color, e)), n.push(`marker-end="url(#${e})"`);
  }
  return {
    defs: s.length ? `<defs>${s.join("")}</defs>` : "",
    attributes: n.join(" ")
  };
}
let pt = null;
function ir(a) {
  if (!a || typeof a != "object")
    throw new Error("configureDefs(next): next 必须是对象");
  pt = a;
}
function it(a) {
  if (!pt || pt[a] === void 0 || pt[a] === null)
    throw new Error(
      `defs 模块未注入依赖 ${a} —— 调用方必须先 configureDefs({ ${a}, ... })`
    );
  return pt[a];
}
const La = {
  get attribute() {
    return it("attribute");
  },
  get colorFromContainer() {
    return it("colorFromContainer");
  },
  get descendantsByName() {
    return it("descendantsByName");
  },
  get escapeXml() {
    return it("escapeXml");
  },
  get firstDescendant() {
    return it("firstDescendant");
  }
}, or = 8, fr = {
  pct5: ["00000000", "00000010", "00000000", "00000000", "00000000", "00100000", "00000000", "00000000"],
  pct10: ["01000000", "00000000", "00000100", "00000000", "01000000", "00000000", "00000100", "00000000"],
  pct20: ["00000000", "01000100", "00000000", "00010001", "00000000", "01000100", "00000000", "00010001"],
  pct25: ["10001000", "00100010", "10001000", "00100010", "10001000", "00100010", "10001000", "00100010"],
  pct30: ["01010101", "00100010", "01010101", "10001000", "01010101", "00100010", "01010101", "10001000"],
  pct40: ["10001010", "01010101", "10101010", "01010101", "10101000", "01010101", "10101010", "01010101"],
  pct50: ["01010101", "10101010", "01010101", "10101010", "01010101", "10101010", "01010101", "10101010"],
  pct60: ["10101010", "11011101", "10101010", "01110111", "10101010", "11011101", "10101010", "01110111"],
  pct70: ["10111011", "11101110", "10111011", "11101110", "10111011", "11101110", "10111011", "11101110"],
  pct75: ["11111111", "11101110", "11111111", "10111011", "11111111", "11101110", "11111111", "10111011"],
  pct80: ["11111111", "11011111", "11111111", "11111101", "11111111", "11011111", "11111111", "11111101"],
  pct90: ["11111111", "11111111", "11110111", "11111111", "11111111", "11111111", "01111111", "11111111"],
  ltHorz: ["00000000", "00000000", "00000000", "11111111", "00000000", "00000000", "00000000", "11111111"],
  ltVert: ["01000100", "01000100", "01000100", "01000100", "01000100", "01000100", "01000100", "01000100"],
  ltDnDiag: ["00010001", "10001000", "01000100", "00100010", "00010001", "10001000", "01000100", "00100010"],
  ltUpDiag: ["10001000", "00010001", "00100010", "01000100", "10001000", "00010001", "00100010", "01000100"],
  dkHorz: ["11111111", "00000000", "00000000", "11111111", "11111111", "00000000", "00000000", "11111111"],
  dkVert: ["01100110", "01100110", "01100110", "01100110", "01100110", "01100110", "01100110", "01100110"],
  dkDnDiag: ["11001100", "01100110", "00110011", "10011001", "11001100", "01100110", "00110011", "10011001"],
  dkUpDiag: ["11001100", "10011001", "00110011", "01100110", "11001100", "10011001", "00110011", "01100110"],
  narHorz: ["00000000", "11111111", "00000000", "11111111", "00000000", "11111111", "00000000", "11111111"],
  narVert: ["10101010", "10101010", "10101010", "10101010", "10101010", "10101010", "10101010", "10101010"],
  dashHorz: ["00000000", "10000111", "00000000", "00000000", "00000000", "01111000", "00000000", "00000000"],
  dashVert: ["00000100", "01000000", "01000000", "01000000", "01000000", "00000100", "00000100", "00000100"],
  dashDnDiag: ["00000000", "00000000", "00000000", "00010001", "10001000", "01000100", "00100010", "00000000"],
  dashUpDiag: ["00000000", "00000000", "00000000", "10001000", "00010001", "00100010", "01000100", "00000000"],
  smConfetti: ["01000000", "00000100", "00100000", "00000001", "00001000", "10000000", "00010000", "00000010"],
  lgConfetti: ["00000110", "01100000", "01101100", "10001101", "10000001", "00011000", "11011000", "11000110"],
  smGrid: ["00100010", "00100010", "00100010", "11111111", "00100010", "00100010", "00100010", "11111111"],
  lgGrid: ["10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "11111111"],
  horzBrick: ["00000010", "11111111", "00100000", "00100000", "00100000", "11111111", "00000010", "00000010"],
  diagBrick: ["00000100", "00001100", "00010010", "00100001", "11000000", "10000000", "00000001", "00000010"],
  openDmnd: ["00010001", "00001010", "00000100", "00001010", "00010001", "10100000", "01000000", "10100000"],
  solidDmnd: ["11110111", "11100011", "11000001", "10000000", "00000000", "10000000", "11000001", "11100011"],
  dotGrid: ["00000000", "00100000", "00000000", "00100000", "00000000", "00100000", "00000000", "10101010"],
  weave: ["00010001", "10100010", "01000100", "00001010", "00010001", "10101000", "01000100", "00101010"],
  divot: ["00100000", "00010000", "00100000", "00000000", "00000001", "00000010", "00000001", "00000000"],
  shingle: ["00100100", "01000010", "10000001", "01100000", "00010000", "00001000", "00001000", "00011000"],
  sphere: ["01001100", "01111100", "01111100", "10111011", "11000100", "11000111", "11000111", "10111011"],
  wave: ["11000000", "00101001", "00000110", "00000000", "11000000", "00101001", "00000110", "00000000"],
  trellis: ["00110011", "11111111", "11001100", "11111111", "00110011", "11111111", "11001100", "11111111"],
  zigZag: ["00010010", "00100001", "11000000", "00001100", "00010010", "00100001", "11000000", "00001100"],
  cross: ["00000010", "11111111", "00000010", "00000010", "00000010", "00000010", "00000010", "00000010"],
  dnDiag: ["10000000", "01000000", "00100000", "00010000", "00001000", "00000100", "00000010", "00000001"],
  upDiag: ["00100000", "01000000", "10000000", "00000001", "00000010", "00000100", "00001000", "00010000"],
  wdDnDiag: ["00011100", "00001110", "00000111", "10000011", "11000001", "11100000", "01110000", "00111000"],
  wdUpDiag: ["00001110", "00011100", "00111000", "01110000", "11100000", "11000001", "10000011", "00000111"]
};
function dr() {
  return {
    gradient: /* @__PURE__ */ new Map(),
    gradientCounter: 0,
    duotone: /* @__PURE__ */ new Map(),
    lum: /* @__PURE__ */ new Map(),
    lumCounter: 0,
    shadow: /* @__PURE__ */ new Map(),
    shadowCounter: 0,
    reflection: /* @__PURE__ */ new Map(),
    reflectionCounter: 0,
    pattern: /* @__PURE__ */ new Map(),
    patternCounter: 0
  };
}
function xr(a, t) {
  if (!(t != null && t.dark) || !(t != null && t.light)) return null;
  const s = `${t.dark}|${t.light}`;
  if (a.duotone.has(s)) return a.duotone.get(s);
  const n = `duotone${a.duotone.size + 1}`;
  return a.duotone.set(s, n), a.duotone.set(n, t), n;
}
function yr(a, t) {
  if (!Number.isFinite(t)) return null;
  const s = t.toFixed(5);
  if (a.lum.has(s)) return a.lum.get(s);
  const n = `lum${++a.lumCounter}`;
  return a.lum.set(s, n), a.lum.set(n, t), n;
}
function oe(a, t, s, n) {
  if (!t) return null;
  const e = n && n.w > 0 ? n.w : 1, r = n && n.h > 0 ? n.h : 1, l = `${e.toFixed(2)}x${r.toFixed(2)}`, m = Ve(t) + "|" + JSON.stringify(s) + "|" + l;
  if (a.gradient.has(m)) return a.gradient.get(m);
  const c = `grad${++a.gradientCounter}`;
  return a.gradient.set(m, c), a.gradient.set(c, { gradient: t, theme: s, aspect: e / r }), c;
}
const ot = or * 96 / 72;
function fe(a, t, s) {
  if (!t) return null;
  const n = La.attribute(t, "prst", ""), e = fr[n];
  if (!e) return null;
  const r = La.firstDescendant(t, "fgClr"), l = La.firstDescendant(t, "bgClr"), m = r && La.colorFromContainer(r, s) || "#000000", c = l && La.colorFromContainer(l, s) || "#ffffff", i = `${n}|${m}|${c}`;
  if (a.pattern.has(i)) return a.pattern.get(i);
  const d = `patt${++a.patternCounter}`;
  return a.pattern.set(i, d), a.pattern.set(d, { tile: e, fg: m, bg: c }), d;
}
function hr(a) {
  const t = [], s = ot / 8, n = s.toFixed(6);
  for (const [e, r] of a.pattern.entries()) {
    if (typeof r == "string") continue;
    const { tile: l, fg: m, bg: c } = r;
    let i = "";
    for (let d = 0; d < 8; d += 1) {
      const o = l[d];
      for (let x = 0; x < 8; x += 1)
        o[x] === "1" && (i += `M${(x * s).toFixed(6)} ${(d * s).toFixed(6)}h${n}v${n}h-${n}z`);
    }
    t.push(
      `<pattern id="${e}" patternUnits="userSpaceOnUse" width="${ot}" height="${ot}"><rect width="${ot}" height="${ot}" fill="${La.escapeXml(c)}"/>` + (i ? `<path d="${i}" fill="${La.escapeXml(m)}"/>` : "") + "</pattern>"
    );
  }
  return t.join("");
}
function Ve(a) {
  if (!a) return "";
  const t = [a.localName];
  for (let s = 0; s < a.attributes.length; s += 1) {
    const n = a.attributes[s];
    t.push(`${n.name}=${n.value}`);
  }
  for (const s of a.children || [])
    s.nodeType === 1 && t.push(Ve(s));
  return t.join("/");
}
function pr(a, t) {
  const s = La.colorFromContainer(a, t) || "#000000";
  return /^#[0-9a-f]{8}$/i.test(s) ? s.slice(0, 7) : s;
}
function ur(a) {
  const t = [], s = ' color-interpolation="linearRGB"';
  for (const [n, e] of a.gradient.entries())
    if (typeof e != "string") {
      const { gradient: r, theme: l, aspect: m } = e, c = m > 0 ? m : 1, i = La.firstDescendant(r, "lin"), d = La.firstDescendant(r, "rad"), o = La.firstDescendant(r, "path"), x = o ? La.attribute(o, "path", "") : "", f = [], y = La.descendantsByName(r, "gs").map((p) => ({
        pos: Math.max(0, Math.min(100, Number(La.attribute(p, "pos", 0)) / 1e3)),
        gs: p
      }));
      y.sort((p, A) => p.pos - A.pos);
      for (const { pos: p, gs: A } of y) {
        const w = La.firstDescendant(A, "alpha"), b = w ? Math.max(0, Math.min(1, Number(La.attribute(w, "val", 1e5)) / 1e5)) : 1, L = pr(A, l), v = b < 1 ? ` stop-opacity="${b}"` : "";
        f.push(`<stop offset="${p}%" stop-color="${L}"${v}/>`);
      }
      let u = "";
      if (i) {
        const p = Number(La.attribute(i, "ang", 162e5)) / 6e4, A = La.attribute(i, "scaled", "0") === "1", w = p * Math.PI / 180, b = Math.cos(w), L = A ? Math.sin(w) * c : Math.sin(w), v = Math.hypot(b, L) || 1, T = b / v, C = L / v, S = c * T, q = C, R = Math.abs(S) + Math.abs(q), k = S * S + q * q, g = S * R / (2 * k), P = q * R / (2 * k), E = 0.5 - g, I = 0.5 - P, U = 0.5 + g, D = 0.5 + P;
        u = `<linearGradient${s} id="${n}" x1="${E.toFixed(6)}" y1="${I.toFixed(6)}" x2="${U.toFixed(6)}" y2="${D.toFixed(6)}">${f.join("")}</linearGradient>`;
      } else if (o && x === "circle") {
        const p = La.firstDescendant(o, "fillToRect"), A = p ? Math.max(0, Math.min(1, Number(La.attribute(p, "l", 0)) / 1e5)) : 0.5, w = p ? Math.max(0, Math.min(1, Number(La.attribute(p, "t", 0)) / 1e5)) : 0.5;
        u = `<radialGradient${s} id="${n}" cx="50%" cy="50%" r="70.7107%" fx="${(A * 100).toFixed(4)}%" fy="${(w * 100).toFixed(4)}%">${f.join("")}</radialGradient>`;
      } else d ? u = `<radialGradient${s} id="${n}" cx="50%" cy="50%" r="70%">${f.join("")}</radialGradient>` : u = `<linearGradient${s} id="${n}" x1="0%" y1="0%" x2="100%" y2="0%">${f.join("")}</linearGradient>`;
      t.push(u);
    }
  for (const [n, e] of a.duotone.entries()) {
    if (typeof e == "string") continue;
    const r = e.dark.slice(1), l = e.light.slice(1), m = [0, 2, 4].map((d) => parseInt(r.slice(d, d + 2), 16) / 255), i = [0, 2, 4].map((d) => parseInt(l.slice(d, d + 2), 16) / 255).map((d, o) => d - m[o]);
    t.push(`<filter id="${n}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"/><feColorMatrix type="matrix" values="${i[0]} 0 0 0 ${m[0]} 0 ${i[1]} 0 0 ${m[1]} 0 0 ${i[2]} 0 ${m[2]} 0 0 0 1 0"/></filter>`);
  }
  for (const [n, e] of a.lum.entries()) {
    if (typeof e == "string") continue;
    const r = Math.max(0, e);
    t.push(`<filter id="${n}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${r} 0 0 0 0 0 ${r} 0 0 0 0 0 ${r} 0 0 0 0 0 1 0"/></filter>`);
  }
  return t.length ? `<defs>${t.join("")}</defs>` : "";
}
function gr(a, t, s) {
  const n = `${t.dx.toFixed(3)}|${t.dy.toFixed(3)}|${t.blur.toFixed(3)}|${t.color}|${t.alpha.toFixed(4)}|${s.x.toFixed(2)},${s.y.toFixed(2)},${s.width.toFixed(2)},${s.height.toFixed(2)}`;
  if (a.shadow.has(n)) return a.shadow.get(n);
  const e = `shadow${++a.shadowCounter}`;
  return a.shadow.set(n, e), a.shadow.set(e, { shadow: t, region: s }), e;
}
function wr(a) {
  const t = [];
  for (const [s, n] of a.shadow.entries()) {
    if (typeof n == "string") continue;
    const { shadow: e, region: r } = n;
    t.push(
      `<filter id="${La.escapeXml(s)}" filterUnits="userSpaceOnUse" x="${r.x.toFixed(2)}" y="${r.y.toFixed(2)}" width="${r.width.toFixed(2)}" height="${r.height.toFixed(2)}" color-interpolation-filters="sRGB"><feDropShadow dx="${e.dx.toFixed(3)}" dy="${e.dy.toFixed(3)}" stdDeviation="${e.blur.toFixed(3)}" flood-color="${La.escapeXml(e.color)}" flood-opacity="${e.alpha.toFixed(4)}"/></filter>`
    );
  }
  return t.length ? `<defs>${t.join("")}</defs>` : "";
}
function Ar(a, t, s, n, e) {
  const r = `${t.startAlpha.toFixed(4)}|${t.endAlpha.toFixed(4)}|${t.lengthEm.toFixed(4)}|${t.blurPx.toFixed(3)}|${s.toFixed(2)}|${n.toFixed(2)}|${e.x.toFixed(2)},${e.y.toFixed(2)},${e.width.toFixed(2)},${e.height.toFixed(2)}`;
  if (a.reflection.has(r)) return a.reflection.get(r);
  const l = `refl${++a.reflectionCounter}`, m = { id: l, reflection: t, fontSize: s, axisY: n, region: e };
  return a.reflection.set(r, l), a.reflection.set(l, m), l;
}
function br(a) {
  const t = [];
  for (const [s, n] of a.reflection.entries()) {
    if (typeof n == "string") continue;
    const { id: e, reflection: r, axisY: l, region: m } = n, c = r.lengthEm * n.fontSize, i = (d) => d.toFixed(2);
    t.push(
      `<linearGradient id="reflGrad-${e}" gradientUnits="userSpaceOnUse" x1="0" y1="${i(l)}" x2="0" y2="${i(l + c)}"><stop offset="0" stop-color="#ffffff" stop-opacity="${r.startAlpha.toFixed(4)}"/><stop offset="1" stop-color="#ffffff" stop-opacity="${r.endAlpha.toFixed(4)}"/></linearGradient>`
    ), t.push(
      `<filter id="reflBlur-${e}" filterUnits="userSpaceOnUse" x="${i(m.x)}" y="${i(m.y)}" width="${i(m.width)}" height="${i(m.height)}" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${r.blurPx.toFixed(3)}"/></filter>`
    ), t.push(
      `<mask id="${e}" maskUnits="userSpaceOnUse" x="${i(m.x)}" y="${i(m.y)}" width="${i(m.width)}" height="${i(m.height)}"><rect x="${i(m.x)}" y="${i(m.y)}" width="${i(m.width)}" height="${i(m.height)}" fill="url(#reflGrad-${e})"/></mask>`
    );
  }
  return t.length ? `<defs>${t.join("")}</defs>` : "";
}
let ut = null;
function vr(a) {
  if (!a || typeof a != "object")
    throw new Error("configureShape(next): next 必须是对象");
  ut = a;
}
function de(a) {
  if (!ut || ut[a] === void 0 || ut[a] === null)
    throw new Error(
      `shape 模块未注入依赖 ${a} —— 调用方必须先 configureShape({ ${a}, ... })`
    );
  return ut[a];
}
const qa = {
  get escapeXml() {
    return de("escapeXml");
  },
  get renderText() {
    return de("renderText");
  }
};
function Oa(a) {
  const t = a.spid ? ` data-spid="${qa.escapeXml(a.spid)}"` : "", s = ` data-source="${qa.escapeXml(a.sourceLevel || "slide")}"`, n = a.type ? ` data-type="${qa.escapeXml(a.type)}"` : "", e = a.preset ? ` data-preset="${qa.escapeXml(a.preset)}"` : "", r = a.label ? ` data-label="${qa.escapeXml(a.label)}"` : "", l = a.progId ? ` data-progid="${qa.escapeXml(a.progId)}"` : "", m = a.oleFallback ? ' data-ole-fallback="true"' : "", c = a.placeholderType ? ` data-placeholder="${qa.escapeXml(a.placeholderType)}"` : "", i = a.fallback ? ' data-fallback="true"' : "";
  return `${t}${s}${n}${e}${r}${l}${m}${c}${i}`;
}
const Lr = { M: 2, L: 2, T: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, A: 7, Z: 0 };
function Rr(a) {
  const t = String(a).match(/[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g);
  if (!t) return null;
  let s = 1 / 0, n = 1 / 0, e = -1 / 0, r = -1 / 0;
  const l = (f, y) => {
    !Number.isFinite(f) || !Number.isFinite(y) || (f < s && (s = f), y < n && (n = y), f > e && (e = f), y > r && (r = y));
  };
  let m = 0, c = 0, i = 0, d = 0, o = null;
  const x = [];
  for (const f of t) {
    if (/^[A-Za-z]$/.test(f)) {
      o = f, x.length = 0, (o === "Z" || o === "z") && (m = i, c = d);
      continue;
    }
    if (!o) continue;
    x.push(Number(f));
    const y = o.toUpperCase(), u = Lr[y];
    if (u === void 0 || x.length < u) continue;
    const p = x.splice(0, u), A = o !== y, w = (L) => A ? m + L : L, b = (L) => A ? c + L : L;
    if (y === "M") {
      const L = w(p[0]), v = b(p[1]);
      l(L, v), m = L, c = v, i = L, d = v, o = A ? "l" : "L";
    } else if (y === "L" || y === "T") {
      const L = w(p[0]), v = b(p[1]);
      l(L, v), m = L, c = v;
    } else if (y === "H")
      m = w(p[0]), l(m, c);
    else if (y === "V")
      c = b(p[0]), l(m, c);
    else if (y === "C" || y === "S" || y === "Q") {
      for (let L = 0; L < u; L += 2) l(w(p[L]), b(p[L + 1]));
      m = w(p[u - 2]), c = b(p[u - 1]);
    } else if (y === "A") {
      const L = Math.abs(p[0]), v = Math.abs(p[1]), T = w(p[5]), C = b(p[6]);
      l(m - L, c - v), l(m + L, c + v), l(T - L, C - v), l(T + L, C + v), m = T, c = C;
    }
  }
  return Number.isFinite(s) ? { x0: s, y0: n, x1: e, y1: r } : null;
}
function Mr(a, t) {
  const { x: s, y: n, width: e, height: r } = t, l = { x0: s, y0: n, x1: s + e, y1: n + r }, m = (d, o = 0, x = 0) => {
    d && (d.x0 + o < l.x0 && (l.x0 = d.x0 + o), d.y0 + x < l.y0 && (l.y0 = d.y0 + x), d.x1 + o > l.x1 && (l.x1 = d.x1 + o), d.y1 + x > l.y1 && (l.y1 = d.y1 + x));
  }, c = (d, o) => {
    const x = new RegExp(`\\b${o}="(-?[\\d.eE+-]+)"`).exec(d);
    return x ? Number(x[1]) : null;
  }, i = String(a);
  for (const d of i.matchAll(/<path\b([^>]*)>/g)) {
    const o = d[1], x = /\bd="([^"]*)"/.exec(o);
    if (!x) continue;
    const f = /translate\(\s*(-?[\d.]+)[\s,]+(-?[\d.]+)/.exec(o);
    m(
      Rr(x[1]),
      f ? Number(f[1]) : 0,
      f ? Number(f[2]) : 0
    );
  }
  for (const d of i.matchAll(/<ellipse\b([^>]*)>/g)) {
    const o = d[1], x = c(o, "cx"), f = c(o, "cy"), y = c(o, "rx"), u = c(o, "ry");
    [x, f, y, u].some((p) => p === null) || m({ x0: x - y, y0: f - u, x1: x + y, y1: f + u });
  }
  for (const d of i.matchAll(/<line\b([^>]*)>/g)) {
    const o = d[1], x = [c(o, "x1"), c(o, "x2")], f = [c(o, "y1"), c(o, "y2")];
    x.some((y) => y === null) || f.some((y) => y === null) || m({
      x0: Math.min(x[0], x[1]),
      x1: Math.max(x[0], x[1]),
      y0: Math.min(f[0], f[1]),
      y1: Math.max(f[0], f[1])
    });
  }
  for (const d of i.matchAll(/<rect\b([^>]*)>/g)) {
    const o = d[1], x = c(o, "x"), f = c(o, "y"), y = c(o, "width"), u = c(o, "height");
    [x, f, y, u].some((p) => p === null) || m({ x0: x, y0: f, x1: x + y, y1: f + u });
  }
  return l;
}
const $r = /* @__PURE__ */ new Set(["rect", "ellipse", "line"]);
function jr(a, t) {
  var A;
  const s = Pa(a), n = qa.escapeXml(a.fill || "none"), e = kn(a.line), { x: r, y: l, width: m, height: c } = a;
  let i = "";
  const d = a.customGeometry ? Ne(a.customGeometry, m, c, {}) : null, o = a.customGeometry ? d ? { fill: d, stroke: d } : null : $r.has(a.preset) ? null : t0(a.preset, m, c, a.adjustments);
  if (o && (o.fill || o.stroke)) {
    const w = `translate(${r} ${l})`;
    o.fill ? o.fill === o.stroke ? i = `<path d="${o.fill}" transform="${w}" fill="${n}" ${e}/>` : i = `<path d="${o.fill}" transform="${w}" fill="${n}" ${e}/><path d="${o.stroke}" transform="${w}" fill="none" ${e}/>` : i = `<path d="${o.stroke}" transform="${w}" fill="none" ${e}/>`;
  } else if (a.preset === "ellipse")
    i = `<ellipse cx="${r + m / 2}" cy="${l + c / 2}" rx="${m / 2}" ry="${c / 2}" fill="${n}" ${e}/>`;
  else if (a.preset === "triangle")
    i = `<path d="M ${r + m / 2} ${l} L ${r} ${l + c} L ${r + m} ${l + c} Z" fill="${n}" ${e}/>`;
  else if (a.preset === "rtTriangle")
    i = `<path d="M ${r} ${l} L ${r + m} ${l + c} L ${r} ${l + c} Z" fill="${n}" ${e}/>`;
  else if (a.preset === "diamond")
    i = `<path d="M ${r + m / 2} ${l} L ${r + m} ${l + c / 2} L ${r + m / 2} ${l + c} L ${r} ${l + c / 2} Z" fill="${n}" ${e}/>`;
  else if (a.preset === "parallelogram" || a.preset === "flowChartInputOutput")
    i = `<path d="${J0(r, l, m, c)}" fill="${n}" ${e}/>`;
  else if (a.preset === "line")
    i = `<line x1="${r}" y1="${l}" x2="${r + m}" y2="${l + c}" ${e}/>`;
  else if (a.preset === "homePlate" || a.preset === "pentagon")
    i = `<path d="${ar(r, l, m, c)}" fill="${n}" ${e}/>`;
  else if (a.preset === "chevron")
    i = `<path d="${tr(r, l, m, c)}" fill="${n}" ${e}/>`;
  else if (a.preset === "wedgeRoundRectCallout" || a.preset === "wedgeRectCallout")
    i = `<path d="${nr(r, l, m, c, a.adjustments)}" fill="${n}" ${e}/>`;
  else if (a.preset === "heart")
    i = `<path d="${er(r, l, m, c)}" fill="${n}" ${e}/>`;
  else if (a.preset === "star5")
    i = `<path d="${sr(r, l, m, c)}" fill="${n}" ${e}/>`;
  else if (a.preset === "bentUpArrow")
    i = `<path d="${rr(r, l, m, c)}" fill="${n}" ${e}/>`;
  else if (a.preset === "rightArrow") {
    const w = m / Math.max(1, c) > 5, b = w ? 0.38 : 0.25, L = 1 - b, v = w ? r + m - Math.min(m * 0.2, c * 1.25) : r + m * 0.62;
    i = `<path d="M ${r} ${l + c * b} H ${v} V ${l} L ${r + m} ${l + c / 2} L ${v} ${l + c} V ${l + c * L} H ${r} Z" fill="${n}" ${e}/>`;
  } else if (a.preset === "leftArrow")
    i = `<path d="M ${r + m} ${l + c * 0.25} H ${r + m * 0.38} V ${l} L ${r} ${l + c / 2} L ${r + m * 0.38} ${l + c} V ${l + c * 0.75} H ${r + m} Z" fill="${n}" ${e}/>`;
  else if (a.preset === "downArrow")
    i = `<path d="M ${r + m * 0.25} ${l} H ${r + m * 0.75} V ${l + c * 0.62} H ${r + m} L ${r + m / 2} ${l + c} L ${r} ${l + c * 0.62} H ${r + m * 0.25} Z" fill="${n}" ${e}/>`;
  else if (a.preset === "upArrow")
    i = `<path d="M ${r + m * 0.25} ${l + c} H ${r + m * 0.75} V ${l + c * 0.38} H ${r + m} L ${r + m / 2} ${l} L ${r} ${l + c * 0.38} H ${r + m * 0.25} Z" fill="${n}" ${e}/>`;
  else if (a.preset === "leftBrace")
    i = le(r, l, m, c, "left", n, e);
  else if (a.preset === "rightBrace")
    i = le(r, l, m, c, "right", n, e);
  else if (a.preset === "bentConnector2") {
    const w = jn(m, c);
    i = `<path d="${$n(r, l, m, c, 1, w)}" fill="${n}" ${e}/>`;
  } else if (a.preset === "bentConnector3") {
    const w = jn(m, c);
    i = `<path d="${$n(r, l, m, c, 2, w)}" fill="${n}" ${e}/>`;
  } else if (a.preset === "straightConnector1")
    i = `<line x1="${r}" y1="${l}" x2="${r + m}" y2="${l + c}" ${e}/>`;
  else if (a.preset === "cloud")
    i = me(r, l, m, c, n, e, !1, a.adjustments);
  else if (a.preset === "cloudCallout")
    i = me(r, l, m, c, n, e, !0, a.adjustments);
  else {
    const w = a.preset === "roundRect" ? Math.min(m, c) * 0.12 : 0;
    i = `<rect x="${r}" y="${l}" width="${m}" height="${c}" rx="${w}" fill="${n}" ${e}/>`;
  }
  const x = a.preset === "cloud" ? ce(a, !1) : a.preset === "cloudCallout" ? ce(a, !0) : a;
  let f = i;
  if (a.shadow) {
    const w = a.shadow, b = Mr(i, a), L = w.blur * 3, v = (((A = a.line) == null ? void 0 : A.width) || 0) + 2, T = Math.min(b.x0, b.x0 + w.dx) - L - v, C = Math.min(b.y0, b.y0 + w.dy) - L - v, S = Math.max(b.x1, b.x1 + w.dx) + L + v, q = Math.max(b.y1, b.y1 + w.dy) + L + v;
    f = `<g filter="url(#${gr(t, w, {
      x: T,
      y: C,
      width: S - T,
      height: q - C
    })})">${i}</g>`;
  }
  const y = qa.renderText(x, t), u = Q0(a), p = u && y ? `<g${u}>${y}</g>` : y;
  return `<g${Oa(a)}${s}>${f}${p}</g>`;
}
const xe = ["info", "warn", "error"], kr = 2e3;
function Cr(a = {}) {
  const t = Number.isFinite(a.maxEvents) && a.maxEvents > 0 ? Math.floor(a.maxEvents) : kr, s = [];
  let n = 0;
  const e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  function l(d) {
    if (!d || typeof d != "object")
      throw new Error("diagnostics.add(entry): entry 必须是对象");
    const { code: o, severity: x = "info", message: f = "", strategy: y = "", scope: u = null } = d;
    if (typeof o != "string" || !o.trim())
      throw new Error("diagnostics.add(entry): code 必须是非空字符串");
    if (!xe.includes(x))
      throw new Error(
        `diagnostics.add(entry): severity 必须是 ${xe.join(" / ")}，收到 ${JSON.stringify(x)}`
      );
    return { code: o, severity: x, message: f, strategy: y, scope: u };
  }
  function m(d) {
    const o = l(d);
    return e.set(o.code, (e.get(o.code) || 0) + 1), r.set(o.severity, (r.get(o.severity) || 0) + 1), s.length >= t ? (n += 1, !1) : (s.push(o), !0);
  }
  function c() {
    return s.map((d) => ({ ...d, scope: d.scope ? { ...d.scope } : null }));
  }
  function i() {
    return {
      total: Array.from(r.values()).reduce((o, x) => o + x, 0),
      kept: s.length,
      truncated: n,
      bySeverity: Object.fromEntries(r),
      byCode: Object.fromEntries(e)
    };
  }
  return { add: m, list: c, summary: i, maxEvents: t };
}
const _r = 8 * 1024 * 1024;
function Sr(a, t, s = {}) {
  const n = Number.isFinite(s.maxBytes) && s.maxBytes >= 0 ? s.maxBytes : _r, e = /* @__PURE__ */ new Map();
  let r = 0;
  const l = { hits: 0, misses: 0, evictions: 0, parses: 0, transientReleases: 0 };
  let m = !1;
  function c() {
    if (m)
      throw new Error("PartCache 已 dispose：释放后不可再读（请检查文档生命周期）");
  }
  function i(p, A) {
    e.get(p) === A && (e.delete(p), e.set(p, A));
  }
  function d() {
    if (!(r <= n))
      for (const [p, A] of e) {
        if (r <= n) break;
        A.settled && (e.delete(p), r -= A.bytes, l.evictions += 1);
      }
  }
  function o(p, A = !0) {
    c();
    const w = a.file(p);
    return w ? w.async("string") : A ? Promise.reject(new Error(`PPTX 缺少必要文件：${p}`)) : Promise.resolve(null);
  }
  function x(p, A) {
    A.settled && e.get(p) === A && (e.delete(p), r -= A.bytes, l.transientReleases += 1);
  }
  function f(p, A = !0, w = {}) {
    c();
    const b = !!(w && w.transient), L = e.get(p);
    if (L)
      return l.hits += 1, L.settled && (b ? x(p, L) : i(p, L)), L.promise;
    l.misses += 1;
    const v = { promise: null, settled: !1, bytes: 0 };
    return v.promise = (async () => {
      const T = await o(p, A);
      if (!T) return null;
      const C = t(T);
      return l.parses += 1, v.bytes = T.length, r += v.bytes, v.settled = !0, b ? (x(p, v), C) : (i(p, v), d(), C);
    })(), e.set(p, v), v.promise;
  }
  function y() {
    m = !0, e.clear(), r = 0;
  }
  function u() {
    return {
      entries: e.size,
      bytes: r,
      maxBytes: n,
      hits: l.hits,
      misses: l.misses,
      evictions: l.evictions,
      transientReleases: l.transientReleases,
      parses: l.parses,
      disposed: m
    };
  }
  return { zip: a, readText: o, readXmlPart: f, dispose: y, stats: u };
}
let Ye = 0;
function Qa(a) {
  return (a == null ? void 0 : a.reason) instanceof Error ? a.reason : new DOMException("The operation was aborted", "AbortError");
}
async function Fr(a, t = {}) {
  const { width: s, height: n, scale: e = 1, signal: r, decorate: l, plate: m, layers: c } = t;
  if (!Number.isFinite(s) || !Number.isFinite(n) || s <= 0 || n <= 0)
    throw new TypeError("prepareFrame 需要有效的 width/height");
  if (!m && !c && typeof a != "string")
    throw new TypeError("prepareFrame 需要 svgMarkup 或 plate");
  if (r != null && r.aborted) throw Qa(r);
  const i = Math.max(1, Math.round(s * e)), d = Math.max(1, Math.round(n * e)), o = document.createElement("canvas");
  o.width = i, o.height = d;
  const x = o.getContext("2d");
  if (Array.isArray(c)) {
    for (const y of c) {
      if (r != null && r.aborted) throw Qa(r);
      if (y != null && y.canvas) {
        x.drawImage(y.canvas, 0, 0, i, d);
        continue;
      }
      if (typeof (y == null ? void 0 : y.markup) != "string")
        throw new TypeError("分层帧需要 markup 或已光栅的 canvas");
      const u = await Ut(y.markup, r);
      x.drawImage(u, 0, 0, i, d);
    }
    if (typeof l == "function") {
      if (r != null && r.aborted) throw Qa(r);
      await l(x, { width: i, height: d, scale: e });
    }
    return xn(o, i, d);
  }
  if (m) {
    if (x.drawImage(m, 0, 0, i, d), typeof l == "function") {
      if (r != null && r.aborted) throw Qa(r);
      await l(x, { width: i, height: d, scale: e });
    }
    return xn(o, i, d);
  }
  const f = await Ut(a, r);
  if (x.drawImage(f, 0, 0, i, d), typeof l == "function") {
    if (r != null && r.aborted) throw Qa(r);
    await l(x, { width: i, height: d, scale: e });
  }
  return xn(o, i, d);
}
async function Ut(a, t) {
  const s = URL.createObjectURL(new Blob([a], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const n = new Image();
    if (n.decoding = "async", await new Promise((e, r) => {
      const l = (c, i) => {
        t && t.removeEventListener("abort", m), c(i);
      }, m = () => l(r, Qa(t));
      n.onload = () => l(e), n.onerror = () => l(r, new Error("SVG 光栅化失败（解码或绘制错误）")), t && t.addEventListener("abort", m, { once: !0 }), n.src = s;
    }), t != null && t.aborted) throw Qa(t);
    return n;
  } finally {
    URL.revokeObjectURL(s);
  }
}
function xn(a, t, s) {
  const n = ++Ye;
  let e = !1;
  return {
    revision: n,
    source: a,
    width: t,
    height: s,
    release() {
      e || (e = !0, a.width = 0, a.height = 0);
    }
  };
}
function gc() {
  return Ye;
}
function Ke(a = {}) {
  const {
    baseUrl: t = typeof document < "u" ? document.baseURI : "",
    vendorDir: s = "vendor/",
    fontsDir: n = "fonts/"
  } = a;
  if (typeof t != "string" || t === "")
    throw new Error("createAssetResolver({ baseUrl }): baseUrl 必须是非空字符串（或运行于浏览器取 document.baseURI）");
  const e = new URL(s, t);
  return { baseUrl: t, vendorBase: e, font: (l) => new URL(`${n}${l}`, t).href };
}
const Er = "http://www.w3.org/2000/svg";
let Cn = null, yn = null;
function Ir(a) {
  if (!a || typeof a.font != "function" || !a.vendorBase)
    throw new Error("configureAssets(resolver): resolver 必须是 createAssetResolver() 的实例");
  Cn = a;
}
function st() {
  if (Cn) return Cn;
  if (!yn) {
    if (typeof document > "u")
      throw new Error(
        "ppt-sdk：当前环境没有 document 且未 configureAssets() —— 资产 URL（vendor/字体/Worker）无从确定，请先注入 createAssetResolver({ baseUrl })"
      );
    yn = Ke();
  }
  return yn;
}
function wc() {
  return st();
}
const Ac = {
  get baseUrl() {
    return st().baseUrl;
  },
  get vendorBase() {
    return st().vendorBase;
  },
  font(a) {
    return st().font(a);
  }
};
n0({
  normalizeFontFamily: rt,
  measureOfficeGlyph: Sa,
  vendorBase: () => st().vendorBase
});
const Qe = 914400, Je = 96, Dr = { width: 1280, height: 720 }, gt = {
  dk1: "#000000",
  lt1: "#ffffff",
  dk2: "#1f1f1f",
  lt2: "#eeeeee",
  tx1: "#000000",
  bg1: "#ffffff",
  tx2: "#1f1f1f",
  bg2: "#eeeeee",
  accent1: "#4472c4",
  accent2: "#ed7d31",
  accent3: "#a5a5a5",
  accent4: "#ffc000",
  accent5: "#5b9bd5",
  accent6: "#70ad47",
  hlink: "#0563c1",
  folHlink: "#954f72",
  fonts: {
    major: { latin: "Arial", eastAsian: "Songti SC", complex: "Arial" },
    minor: { latin: "Arial", eastAsian: "PingFang SC", complex: "Arial" }
  }
}, Tr = {
  black: "#000000",
  white: "#ffffff",
  red: "#ff0000",
  green: "#008000",
  blue: "#0000ff",
  yellow: "#ffff00",
  gray: "#808080",
  grey: "#808080",
  orange: "#ffa500",
  purple: "#800080"
};
C0({
  defaultTheme: gt,
  attribute: H,
  childByName: ea,
  descendantsByName: Ra,
  firstDescendant: fa,
  escapeXml: Ma,
  identityAttributes: Oa,
  measureStyledText: Ms,
  normalizeFontFamily: rt,
  parseFill: kt,
  transformAttribute: Pa
});
ir({
  attribute: H,
  colorFromContainer: Fa,
  descendantsByName: Ra,
  escapeXml: Ma,
  firstDescendant: fa
});
Y0({ escapeXml: Ma });
vr({
  escapeXml: Ma,
  renderText: bm
});
function ba(a) {
  return Number(a || 0) / Qe * Je;
}
function Wa(a) {
  return Number(a || 0) * Je / 72;
}
let rn = null;
function Br(a) {
  if (typeof a != "function")
    throw new Error("configureXmlParser(parse): parse 必须是 (xmlText) => Document 函数");
  rn = a;
}
function bc() {
  rn = null;
}
function as(a) {
  if (typeof DOMParser > "u")
    throw new Error(
      "ppt-sdk：当前环境没有 DOMParser（Worker / Node），无法解析 OOXML —— 请调用 configureXmlParser() 注入 XML 解析端口（如 @xmldom/xmldom 的 new DOMParser().parseFromString）"
    );
  const t = new DOMParser().parseFromString(a, "application/xml"), s = t.querySelector("parsererror");
  if (s)
    throw new Error(`XML 解析失败：${s.textContent.slice(0, 120)}`);
  return t;
}
function Pr(a) {
  return (rn || as)(a);
}
function $a(a) {
  return a ? Array.from(a.children || []) : [];
}
function Ua(a, t) {
  return $a(a).filter((s) => s.localName === t);
}
function ea(a, t) {
  return $a(a).find((s) => s.localName === t) || null;
}
function Ra(a, t) {
  return a ? Array.from(a.getElementsByTagNameNS("*", t)) : [];
}
function fa(a, t) {
  return Ra(a, t)[0] || null;
}
function H(a, t, s = null) {
  if (!a) return s;
  const n = a.getAttribute(t);
  if (n !== null) return n;
  const e = Array.from(a.attributes || []).find(
    (r) => r.localName === t || r.name === t
  );
  return e ? e.value : s;
}
function ja(a, t = !1) {
  return a == null ? t : a === "1" || a === "true" || a === "on";
}
function Ea(a, t, s = null) {
  if (!a) return s;
  const n = Array.from(a.attributes || []).find(
    (e) => e.localName === t && (e.prefix === "r" || e.name.startsWith("r:"))
  );
  return n ? n.value : s;
}
function ye(a) {
  const t = String(a).split(/[?#]/, 1)[0];
  let s = 0;
  for (const n of t.split("/"))
    n === ".." && (s += 1);
  return s;
}
function Or(a, t, s) {
  if (!t) return null;
  if (t.startsWith("/")) return t.slice(1);
  const n = a.split("/").length - 1;
  if (ye(t) > n)
    return s.diagnostics.add({
      code: "rels.target-escape",
      severity: "warn",
      scope: { part: a },
      message: `关系 Target 逃出包根（${ye(t)} 个 .. 超过 ${n} 层）：${t}`
    }), null;
  if (/%(?![0-9a-fA-F]{2})/.test(t))
    return s.diagnostics.add({
      code: "rels.target-invalid-uri",
      severity: "warn",
      scope: { part: a },
      message: `关系 Target 含非法百分号编码：${t}`
    }), null;
  const e = new URL(a, "https://pptx.local/");
  return new URL(t, e).pathname.slice(1);
}
function Wt(a) {
  const t = a.split("/"), s = t.pop();
  return `${t.join("/")}/_rels/${s}.rels`;
}
function Gt(a, t, s) {
  const n = /* @__PURE__ */ new Map();
  for (const e of Ra(a, "Relationship")) {
    const r = H(e, "Id"), l = H(e, "Target"), m = H(e, "TargetMode");
    if (r == null || r === "") {
      s.diagnostics.add({
        code: "rels.missing-id",
        severity: "warn",
        scope: { part: t },
        message: `关系缺 Id（Target=${l || "空"}）`
      });
      continue;
    }
    n.has(r) && s.diagnostics.add({
      code: "rels.duplicate-id",
      severity: "warn",
      scope: { part: t, element: r },
      message: `关系 Id 重复（${r}），后者覆盖前者（Target=${l}）`
    }), n.set(r, {
      id: r,
      type: H(e, "Type", ""),
      target: l,
      external: m === "External",
      path: m === "External" ? l : Or(t, l, s)
    });
  }
  return n;
}
function ts(a, t) {
  if (!a) return null;
  const s = a.localName;
  return s === "srgbClr" ? `#${H(a, "val", "000000")}` : s === "schemeClr" ? t[H(a, "val")] || null : s === "sysClr" ? `#${H(a, "lastClr", H(a, "val", "000000"))}` : s === "prstClr" && Tr[H(a, "val")] || null;
}
function Fa(a, t) {
  if (!a) return null;
  const s = ["srgbClr", "schemeClr", "sysClr", "prstClr"];
  for (const n of s) {
    const e = fa(a, n), r = mt(e, t);
    if (r) return r;
  }
  return null;
}
const Nr = 16;
function he(a) {
  if (typeof a != "string") return null;
  const t = /^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/.exec(a.trim());
  if (!t) return null;
  const s = parseInt(t[1], 16);
  return {
    r: s >> 16 & 255,
    g: s >> 8 & 255,
    b: s & 255,
    alpha: t[2] == null ? null : parseInt(t[2], 16)
  };
}
function ns(a, t) {
  if (!a) return null;
  const s = ea(a, "clrChange");
  if (!s) return null;
  const n = ea(s, "clrFrom"), e = ea(s, "clrTo");
  if (!n || !e) return null;
  const r = he(Fa(n, t)), l = he(Fa(e, t));
  if (!r || !l) return null;
  let m = l.alpha;
  if (m == null) {
    const c = Number(H(fa(e, "alpha"), "val", "100000"));
    m = Number.isFinite(c) ? Math.round(c / 1e5 * 255) : 255;
  }
  return {
    from: { r: r.r, g: r.g, b: r.b },
    to: { r: l.r, g: l.g, b: l.b, a: Math.max(0, Math.min(255, m)) },
    // 逐通道匹配容差。**必须实测反推**（见 calib/r64-clrchange/REPORT.md），
    // 不能凭感觉定：JPEG 有损压缩让「白底」并非全是精确 FFFFFF。
    tolerance: Nr
  };
}
function pe(a, t) {
  if (!a) return null;
  for (const s of $a(a)) {
    const n = s.localName;
    if (n === "solidFill" || n === "gradFill" || n === "pattFill" || n === "blipFill" || n === "grpFill") {
      const e = Fa(s, t);
      if (e) return e;
    }
  }
  return null;
}
async function es(a, t = null) {
  const s = a.zip, n = t && s.file(t) ? t : s.file("ppt/theme/theme1.xml") ? "ppt/theme/theme1.xml" : Object.keys(s.files).find((x) => /^ppt\/theme\/theme\d+\.xml$/.test(x));
  if (!n) return { ...gt, fillStyles: [], lineStyles: [] };
  const e = await a.readXmlPart(n), r = fa(e, "clrScheme"), l = { ...gt };
  for (const x of $a(r)) {
    const f = $a(x)[0], y = ts(f, l);
    y && (l[x.localName] = y);
  }
  l.bg1 = l.lt1, l.tx1 = l.dk1, l.bg2 = l.lt2, l.tx2 = l.dk2;
  const m = fa(e, "fontScheme"), c = (x, f) => {
    if (!x) return { ...f };
    const y = (u) => Ua(x, "font").find((p) => H(p, "script") === u);
    return {
      latin: H(ea(x, "latin"), "typeface", f.latin),
      eastAsian: H(ea(x, "ea"), "typeface", "") || H(y("Hans"), "typeface", f.eastAsian),
      complex: H(ea(x, "cs"), "typeface", f.complex)
    };
  };
  l.fonts = {
    major: c(ea(m, "majorFont"), gt.fonts.major),
    minor: c(ea(m, "minorFont"), gt.fonts.minor)
  };
  const i = fa(e, "fillStyleLst"), d = fa(e, "lnStyleLst"), o = fa(e, "effectStyleLst");
  return l.fillStyles = $a(i), l.lineStyles = Ua(d, "ln"), l.effectStyles = Ua(o, "effectStyle"), l;
}
function qr(a) {
  const t = fa(a, "sldSz");
  return t ? {
    width: ba(H(t, "cx")),
    height: ba(H(t, "cy"))
  } : Dr;
}
function Lt(a) {
  const t = (a == null ? void 0 : a.localName) === "xfrm" ? a : ea(a, "xfrm") || fa(a, "xfrm");
  if (!t) return null;
  const s = ea(t, "off"), n = ea(t, "ext");
  return !s || !n ? null : {
    x: ba(H(s, "x")),
    y: ba(H(s, "y")),
    width: ba(H(n, "cx")),
    height: ba(H(n, "cy")),
    rotation: Number(H(t, "rot", 0)) / 6e4,
    flipH: ja(H(t, "flipH")),
    flipV: ja(H(t, "flipV"))
  };
}
function kt(a, t, s, n, e) {
  var x;
  if (!a || ea(a, "noFill")) return "none";
  const r = ea(a, "solidFill");
  if (r) return Fa(r, s) || "none";
  const l = ea(a, "gradFill");
  if (l) {
    const f = oe(e, l, s, n);
    return f ? `url(#${f})` : "none";
  }
  const m = ea(a, "pattFill");
  if (m) {
    const f = e ? fe(e, m, s) : null;
    return f ? `url(#${f})` : "none";
  }
  const c = t ? fa(t, "fillRef") : null;
  if (!c) return "none";
  const i = Fa(c, s), d = Number(H(c, "idx", 0)), o = d > 0 ? (x = s.fillStyles) == null ? void 0 : x[d - 1] : null;
  if (o) {
    const f = { ...s, phClr: i || s.accent1 };
    if (o.localName === "gradFill") {
      const y = oe(e, o, f, n);
      return y ? `url(#${y})` : "none";
    }
    if (o.localName === "pattFill") {
      const y = e ? fe(e, o, f) : null;
      return y ? `url(#${y})` : "none";
    }
    return Fa(o, f) || i || "none";
  }
  return i || "none";
}
const Zr = {
  dash: [4, 3],
  dashDot: [4, 3, 1, 3],
  dot: [1, 3],
  lgDash: [8, 3],
  lgDashDot: [8, 3, 1, 3],
  lgDashDotDot: [8, 3, 1, 3, 1, 3],
  sysDash: [3, 1],
  sysDashDot: [3, 1, 1, 1],
  sysDashDotDot: [3, 1, 1, 1, 1, 1],
  sysDot: [1, 1]
};
function zr(a, t) {
  const s = Zr[a];
  return s ? s.map((n) => (n * t).toFixed(2)).join(" ") : null;
}
function ss(a, t, s) {
  var b;
  const n = a ? ea(a, "ln") : null;
  if (n && ea(n, "noFill"))
    return { color: "none", width: 0, dash: null, headEnd: null, tailEnd: null };
  const e = t ? fa(t, "lnRef") : null, r = Fa(e, s), l = Number(H(e, "idx", 0)), m = l > 0 ? (b = s.lineStyles) == null ? void 0 : b[l - 1] : null, c = { ...s, phClr: r || s.tx1 }, i = Fa(n, s) || Fa(m, c) || r;
  if (!i)
    return { color: "none", width: 0, dash: null, headEnd: null, tailEnd: null };
  const d = n || m, o = Math.max(0.7, ba(H(n, "w", H(m, "w", 9525)))), x = fa(d, "prstDash"), f = H(x, "val", "solid"), y = zr(f, o), u = fa(n, "headEnd"), p = fa(n, "tailEnd"), A = H(u, "type", "none"), w = H(p, "type", "none");
  return {
    color: i,
    width: o,
    dash: y,
    headEnd: A !== "none" ? { type: A, w: H(u, "w", "med"), len: H(u, "len", "med") } : null,
    tailEnd: w !== "none" ? { type: w, w: H(p, "w", "med"), len: H(p, "len", "med") } : null
  };
}
const Hr = 1 / 3;
function ue(a, t) {
  const s = fa(a, "outerShdw");
  if (!s) return null;
  const n = ba(H(s, "dist", 0)), e = ba(H(s, "blurRad", 0)), r = Number(H(s, "dir", 0)) / 6e4 * (Math.PI / 180), l = ["srgbClr", "schemeClr", "sysClr", "prstClr"].map((d) => fa(s, d)).find(Boolean), m = mt(l, t) || "#000000", i = /^#[0-9a-f]{8}$/i.test(m) ? parseInt(m.slice(7, 9), 16) / 255 : 1;
  return i <= 0 ? null : {
    dx: n * Math.cos(r),
    dy: n * Math.sin(r),
    blur: e * Hr,
    color: m.slice(0, 7),
    alpha: i
    // `sx`/`sy`/`kx`/`ky`（缩放/斜切阴影）语料里实测只有 sx=sy=100000、kx=ky=0
    // 这类恒等值，未实现；真遇到缩放/斜切阴影会退化成纯位移近似。
  };
}
function Ur(a, t, s) {
  var m;
  const n = a ? ea(a, "effectLst") : null;
  if (n) return ue(n, s);
  const e = t ? fa(t, "effectRef") : null;
  if (!e) return null;
  const r = Number(H(e, "idx", 0));
  if (!(r > 0)) return null;
  const l = (m = s.effectStyles) == null ? void 0 : m[r - 1];
  return l ? ue(l, s) : null;
}
function Wr(a, t) {
  if (!a) return null;
  const s = [["L", "left"], ["R", "right"], ["T", "top"], ["B", "bottom"]], n = {};
  let e = !1;
  for (const [r, l] of s) {
    const m = ea(a, `ln${r}`);
    if (!m) {
      n[l] = null;
      continue;
    }
    const c = Fa(m, t) || "#000000", i = Math.max(0.5, ba(H(m, "w", 9525)));
    n[l] = { color: c, width: i }, e = !0;
  }
  return e ? n : null;
}
function Gr(a) {
  return a ? ["serif", "sans-serif", "cursive", "fantasy", "monospace", "system-ui"].includes(a) ? a : `"${String(a).replaceAll('"', '\\"')}"` : null;
}
function hn(a, t, s) {
  var r, l;
  const n = String(a || "").toLowerCase(), e = n.startsWith("+mj-") ? (r = t.fonts) == null ? void 0 : r.major : (l = t.fonts) == null ? void 0 : l.minor;
  return !e || !n.startsWith("+m") ? a : n.endsWith("-ea") ? e.eastAsian : n.endsWith("-cs") ? e.complex : e[s] || e.latin;
}
const rs = ["黑体", "simhei", "heitisc", "stheitilight", "stheitimedium"];
function Bt(a) {
  return !!a && rs.includes(String(a).replaceAll(" ", "").toLowerCase());
}
function Xr(a) {
  const t = Number(a) / 100, s = Math.round(t / 224 / 0.125) * 0.125;
  return Wa(s);
}
function _n(a) {
  if (!a) return !1;
  const t = String(a).replaceAll(" ", "").toLowerCase();
  return t.startsWith("阿里巴巴普惠体") || t.startsWith("alibabapuhuiti");
}
function Vr(a, t = !1, s = !1) {
  if (!a) return { primary: [], generic: [] };
  const n = [], e = [], r = a.replaceAll(" ", "").toLowerCase();
  return r === "microsoftyahei" || r === "微软雅黑" ? (n.push("Microsoft YaHei"), e.push("PingFang SC", "Hiragino Sans GB", "Arial"), { primary: n, generic: e }) : r === "华文行楷" || r === "stxingkai" ? (n.push("华文行楷", "STXingkai", "KaiTi", "STKaiti", "Kaiti SC"), e.push("Songti SC", "STSong", "serif"), { primary: n, generic: e }) : ["宋体", "simsun", "stsong", "songtisc"].includes(r) ? (n.push(a, "SimSun", "Songti SC", "STSong"), e.push("serif"), { primary: n, generic: e }) : rs.includes(r) ? (n.push(a, "SimHei", et, "Heiti SC", "STHeiti"), e.push("PingFang SC", "Arial"), { primary: n, generic: e }) : ["仿宋", "fangsong", "stfangsong"].includes(r) ? (n.push(a, "FangSong", "STFangsong", "Songti SC", "STSong"), e.push("serif"), { primary: n, generic: e }) : ["楷体", "kaiti", "stkaiti", "kaitisc"].includes(r) ? (n.push(a, "KaiTi", "STKaiti", "Kaiti SC", "Songti SC"), e.push("serif"), { primary: n, generic: e }) : _n(a) ? (n.push(a, "Alibaba PuHuiTi"), n.push(s ? ls : "Calibri"), e.push("PingFang SC", "Hiragino Sans GB", "Arial"), { primary: n, generic: e }) : r === "腾讯体w7" || r === "tencentsansw7" ? (n.push("腾讯体 W7", "TencentSans W7", "腾讯体"), e.push("PingFang SC", "Arial"), { primary: n, generic: e }) : r === "腾讯体w3" || r === "tencentsansw3" ? (n.push("TencentSans W3", "腾讯体 W3", "TencentSans W7", "腾讯体 W7"), e.push("PingFang SC", "Arial"), { primary: n, generic: e }) : r === "方正少儿简体" ? (n.push("Microsoft YaHei"), e.push("PingFang SC", "Hiragino Sans GB", "Arial"), { primary: n, generic: e }) : (n.push(a), e.push("PingFang SC", "Hiragino Sans GB", "Arial"), { primary: n, generic: e });
}
const Yr = /* @__PURE__ */ new Set(["方正少儿简体"]);
function ge(a) {
  return !!a && Yr.has(String(a).replaceAll(" ", "").toLowerCase());
}
const ls = "Microsoft YaHei", Kr = rt(["Calibri"]), Qr = /[\u201C\u201D]/, Jr = /[\u2460-\u24FF]/, we = /[\u2160-\u217F]/, ms = /(^|,\s*)"?Times New Roman"?(\s*,|$)/;
function al(a) {
  const t = String(a || "");
  return !t || !ms.test(t) || /(^|,\s*)"Times"(\s*,|$)/.test(t) ? t : t.replace(
    /("?Times New Roman"?)(\s*,)?/,
    (s, n, e) => `${n}, "Times"${e || ""}`
  );
}
function rt(a, t = !1, s = null) {
  const n = !!(s && s.sameDeclaredFace), e = [], r = [], l = (c, i) => {
    i && !c.includes(i) && c.push(i);
  };
  for (const c of Array.isArray(a) ? a : [a]) {
    const i = Vr(c, t, n);
    for (const d of i.primary) l(e, d);
    for (const d of i.generic) l(r, d);
  }
  const m = [...e];
  l(m, ls);
  for (const c of r) l(m, c);
  return m.length || m.push("Arial"), m.map(Gr).join(", ");
}
const tl = [
  { weight: "400", name: "NotoSansMonoCJKsc-ASCII.woff2" },
  { weight: "700", name: "NotoSansMonoCJKsc-Bold-ASCII.woff2" }
], et = "Noto Sans Mono CJK SC";
let Xt = null;
function cs() {
  if (typeof document > "u" || Xt) return;
  const a = document.fonts;
  if (typeof FontFace != "function" || !a)
    throw new Error(
      `ppt-sdk：当前环境没有 CSS Font Loading API（FontFace / document.fonts），SimHei/黑体 的半宽 ASCII 回退字体（${et}）无法注册 —— 数字上的绝对定位高亮框会与字形错位。补法：① 用支持该 API 的浏览器；② 或在你自己的样式表里声明 @font-face { font-family: "${et}"; src: url("<你的 fonts/ 路径>/NotoSansMonoCJKsc-ASCII.woff2") format("woff2"); } （400/700 两个字重）`
    );
  Xt = tl.map(({ weight: t, name: s }) => {
    const n = st().font(s), e = new FontFace(
      et,
      `local("${et}"), url("${n}") format("woff2")`,
      { weight: t }
    );
    return document.fonts.add(e), { family: et, weight: t, url: n, face: e };
  });
}
function vc() {
  return Xt ? Xt.map(({ family: a, weight: t, url: s, face: n }) => ({
    family: a,
    weight: t,
    url: s,
    status: n.status
  })) : null;
}
function Ct(a) {
  return (Array.isArray(a) ? a : [a]).filter(Boolean);
}
function va(a, t, s, n = null) {
  const e = H(a, s, null);
  if (e !== null) return e;
  for (const r of Ct(t)) {
    const l = H(r, s, null);
    if (l !== null) return l;
  }
  return n;
}
function bt(a, t, s) {
  return fa(a, s) || Ct(t).map((n) => fa(n, s)).find(Boolean) || null;
}
const nl = {
  wingdings: {
    l: "●",
    // U+25CF BLACK CIRCLE
    m: "❖",
    // U+2756 BLACK DIAMOND MINUS WHITE X
    n: "▪",
    // U+25AA BLACK SMALL SQUARE
    o: "▫",
    // U+25AB WHITE SMALL SQUARE
    p: "■",
    // U+25A0 BLACK SQUARE
    q: "❑",
    // U+2751 LOWER RIGHT SHADOWED WHITE SQUARE
    r: "❒",
    // U+2752 UPPER RIGHT SHADOWED WHITE SQUARE
    u: "◆",
    // U+25C6 BLACK DIAMOND
    Ø: "❍"
    // U+274D SHADOWED WHITE CIRCLE
  },
  symbol: { "·": "•" }
  // U+2022 BULLET
};
function el(a, t) {
  if (t == null) return null;
  const s = nl[String(a || "").trim().toLowerCase()];
  return s && s[t] || null;
}
const sl = 2 / 3, rl = 6 / 7;
function lt(a, t, s, n = null, e = null) {
  const r = Ct(t), l = fa(a, "ea"), m = fa(a, "latin"), c = bt(null, r, "ea"), i = bt(null, r, "latin"), d = Number(va(a, r, "sz", 1800)), o = va(a, r, "kern", null), x = o === null ? null : Number(o), f = x !== null && (x === 0 || d < x), y = fa(a, "hlinkClick"), u = Ea(y, "id"), p = u && e ? e.get(u) : null, A = !!y, w = H(
    a,
    "u",
    va(null, r, "u", A ? "sng" : "none")
  ), b = hn(
    H(m, "typeface") || H(i, "typeface") || "+mn-lt",
    s,
    "latin"
  ), L = hn(
    H(l, "typeface") || H(c, "typeface") || "+mn-ea",
    s,
    "eastAsian"
  ), T = String(va(a, r, "hint", "") || "").toLowerCase() === "ea", C = !!b && !!L && b.replaceAll(" ", "").toLowerCase() === L.replaceAll(" ", "").toLowerCase(), S = String(
    va(a, r, "lang", "") || ""
  ), q = /^zh/i.test(S) && !C && _n(L), R = /^zh/i.test(S) && !_n(L), k = hn("+mn-lt", s, "latin"), g = ja(va(a, r, "b", "0")) || ge(b) || ge(L), P = ea(a, "ln");
  let E = null;
  if (P && !ea(P, "noFill")) {
    const aa = Fa(P, s), Q = H(P, "w", null);
    if (aa && Q != null) {
      const pa = Number(Q) / 12700;
      E = { width: Wa(Math.round(pa * 2) / 2), color: aa };
    }
  }
  const I = ea(ea(a, "effectLst"), "reflection");
  let U = null;
  if (I) {
    const aa = H(I, "blurRad", null), Q = H(I, "stA", null), pa = H(I, "endA", null), Aa = H(I, "endPos", null);
    aa != null && Q != null && pa != null && Aa != null && (U = {
      blurPx: Wa(Number(aa) / 12700) / 3,
      startAlpha: Number(Q) / 1e5,
      endAlpha: Number(pa) / 1e5,
      lengthEm: Number(Aa) / 1e5
    });
  }
  const D = Number(va(a, r, "baseline", "0")), N = d / 100, B = D !== 0 && Number.isFinite(D), _ = B ? -(D / 1e5) * N * rl : 0, J = B ? Math.max(1, Math.round(N * sl)) : N;
  return {
    fontSize: Wa(J),
    // 基线偏移（px，正 = 下移）。非 0 时渲染侧给该 <tspan> 写**绝对 y**，
    // 见 renderTextSegment 的 yOverride 注释（不能靠 dy —— dy 会累积到后续 tspan）。
    baselineShift: Wa(_),
    // 见上方 `kern` 注释：true ⇒ 渲染侧输出 `style="font-kerning:none"`，
    // 与度量侧（逐字形 advance 累加，本来就没有 kerning）对齐。
    kerningDisabled: f,
    // R36：zh-CN + 异名 + ea 缺失时弯引号用 Calibri 链（见上方 R36 注记）。
    // 消费点在 wrapStyledRuns 的 units 装配处：引号字符克隆 style 换 fontFamily。
    quoteFontFamily: q ? Kr : null,
    // R46：带圈字符用 ea 打头的链（判据见 ENCLOSED_SLOT_CHARS 处注记）。
    enclosedFontFamily: R ? rt([L, b, k], g, {
      sameDeclaredFace: C
    }) : null,
    // 同名字族时具体怎么排由 normalizedFontNames 的阿里巴巴普惠体分支负责（把 EA 替换
    // 字体提前进 primary），这里**不改变候选顺序** —— 顺序改动会波及所有同名字族。
    fontFamily: rt(
      T ? [L, b, k] : [b, k, L],
      g,
      { sameDeclaredFace: C }
    ),
    // `u="sng"` 下划线的度量按 **ea 声明的字体**取，而不是按字形最终落在哪一侧
    // （探针实测：latin=TNR + ea=微软雅黑 的纯 ASCII 空格 run 用的是微软雅黑度量）。
    // 所以这里单独存一条以 ea 侧打头的链给 underlineMetricsFor 用。
    underlineFamily: rt([L || b], g, {
      sameDeclaredFace: C
    }),
    // spc 与 sz 同属「1/100 pt」单位（ST_TextPoint，100 = 1pt），不是 1/1000。
    // 之前 /1000 会把字符间距缩到 1/10，spc=300（3pt）只渲成 0.3pt。
    letterSpacing: Wa(Number(va(a, r, "spc", 0)) / 100) + // 见 simheiAdvanceExtraPx：SimHei 族每字符 advance 比标称 em 宽 1/224 em，量化 1/8pt。
    // ⭐⭐ #116 / R60：门控**只有一条腿 —— run 生效 bold**。
    //   第三十四轮曾在此之上加一层「所属文本框(txBody)含汉字」，理由是「§6.25 实测
    //   文本框无汉字 → 无加值的 104 行」。**那条腿已被 Office 神谕证伪**：
    //   real-1 s7 同一形状 `＝（125×8）×（4×25）     ` 内，PDF span 按 size 逐字符分裂，
    //   与 XML 的 run `b` **逐字符一一对应** —— `＝（`/`125`/`）`（b 无）⇒ size 28.0000
    //   = 无加值；`×`/`8`/`（`/`4`（b=1）⇒ size 27.7241 = 有加值；`25`/`）`（b 无）⇒
    //   28.0000；结尾 5 个空格（b=1）⇒ 27.7241。全行 33 字符无一例外。
    //   另一条更直白的反例：real-1 s22 整形状 13 个 span 全为 27.7241/19.8029/47.5271
    //   (= 名义 × 0.99015)，而该形状 txBody **不含任何汉字**。
    //   ⇒ 「b≠1 就不加」（第三十四轮在 real-1 s12/s13 的观察）仍然成立，被保留；
    //     「txBody 无汉字就不加」不成立，删除。受影响面 = real-1 的 10 页（其余 5 册 0）。
    (g && (Bt(L) || Bt(b)) ? Xr(d) : 0),
    bold: g,
    // ⭐ #117 / R61：run 是否为「**合成**粗体」—— 声明了 b="1"，但所属字族**没有独立
    // 粗体面**，只能由 PowerPoint 描边合成。与上面 SimHei advance 加值同源同门控。
    // 只认 SimHei 族：只有它本轮有受控探针（6 个字号）+ 语料组内差分（9 组）双重实测。
    // DengXian 有真 `Dengb.ttf`（Office PDF 字体名 DengXian-Bold、span size 不变），
    // 实测抬升 **0.000**，是这条规则的零效应对照；宋体/楷体/仿宋虽同样无独立粗体面，
    // 但**未实测**，按「不许外推」一律不套。
    syntheticBold: g && (Bt(L) || Bt(b)),
    outline: E,
    reflection: U,
    italic: ja(va(a, r, "i", "0")),
    underline: w !== "none" || A,
    hyperlink: p != null && p.external ? p.target : null,
    color: (
      // ⭐ 第三十五轮（real-3 s20 / real-4 s43 / real-5 s53 三页逐像素实测）：
      // 带 hlinkClick 的 run，Office 渲染**主题 hlink 色**（0563C1），即使 run 自己
      // 带显式 solidFill（这些 run 全部声明了 EEECE1×lumMod25%，Office 仍渲蓝）。
      // 旧链序把 runFillColor 放在 theme.hlink 之前 ⇒ 这四页的链接被渲成灰黄
      // （Office 蓝像素 8~10 万 vs 我方 4~5 万）。故 hyperlink 时 theme.hlink 优先；
      // 主题未定义 hlink 时（theme.hlink = null）落到原有链序，行为不变。
      // run 自己的填充必须取直接子元素的 fill 节点（见 runFillColor 注释）；
      // fallback 链上的节点也是 rPr 类（defRPr），同样可能带 `a:ln`，同理处理。
      (A ? s.hlink : null) || pe(a, s) || r.map((aa) => pe(aa, s)).find(Boolean) || n || s.dk1
    )
  };
}
const Vt = 1.2;
function Yt(a, t, s, n) {
  const e = ll(a, t, s), r = fa(e, "spcPts");
  if (r) return Wa(Number(H(r, "val", 0)) / 100);
  const l = fa(e, "spcPct");
  return l ? Vt * n * Number(H(l, "val", 0)) / 1e5 : 0;
}
function ll(a, t, s) {
  return ea(a, s) || Ct(t).map((n) => ea(n, s)).find(Boolean) || null;
}
function is(a, t = []) {
  const s = ea(a, "lnSpc") || Ct(t).map((r) => ea(r, "lnSpc")).find(Boolean), n = fa(s, "spcPct");
  if (n)
    return {
      type: "percent",
      value: Number(H(n, "val", 1e5)) / 1e5,
      explicit: !0
    };
  const e = fa(s, "spcPts");
  return e ? {
    type: "points",
    value: Wa(Number(H(e, "val", 0)) / 100),
    explicit: !0
  } : { type: "percent", value: 1, explicit: !1 };
}
function Nn(a, t) {
  return (t == null ? void 0 : t.type) === "points" && t.value > 0 ? t.value : a * 1.2 * Math.max(0.1, (t == null ? void 0 : t.value) || 1);
}
function os(a) {
  return (a == null ? void 0 : a.type) === "points" && a.value > 0 ? null : Math.max(0.1, (a == null ? void 0 : a.value) || 1);
}
const ml = [
  ["microsoft yahei", 1.05811, 0.26172],
  ["msyh", 1.05811, 0.26172],
  ["simhei", 0.85938, 0.14062],
  ["simsun", 0.85938, 0.14062],
  ["songti sc", 0.86, 0.14],
  // Comic Sans MS：usWinAscent 2257 / usWinDescent 597 @ upem 2048（本机字体实测）。
  // 缺它时整族落到 DEFAULT（雅黑 1.3198em），而真实行框是 1.3936em ⇒ 每行矮 5.6%，
  // 多行段落在 anchor=ctr / spAutoFit 的框里表现为"行挤 + 垂直位置偏"。
  ["comic sans ms", 1.10205, 0.2915],
  ["kaiti", 0.85938, 0.14062],
  // 楷体 KaiTi — same 256-upem block as SimHei/SimSun
  ["fangsong", 0.85938, 0.14062],
  // 仿宋 FangSong
  ["等线", 0.81006, 0.23193],
  // DengXian
  ["dengxian", 0.81006, 0.23193],
  ["华文行楷", 0.761, 0.289],
  // STXingkai
  ["stxingkai", 0.761, 0.289],
  ["华文隶书", 0.752, 0.259],
  // STLiti
  ["stliti", 0.752, 0.259],
  ["华文新魏", 0.781, 0.236],
  // STXinwei
  ["stxinwei", 0.781, 0.236],
  ["华文琥珀", 0.798, 0.233],
  // STHupo
  ["sthupo", 0.798, 0.233],
  ["华文中宋", 0.912, 0.225],
  // STZhongsong
  ["stzhongsong", 0.912, 0.225],
  ["calibri", 0.95215, 0.26855],
  ["times new roman", 0.89111, 0.21631],
  ["arial", 0.90527, 0.21191],
  ["courier new", 0.83252, 0.30029],
  ["hiragino sans gb", 0.951, 0.211]
], cl = [1.05811, 0.26172];
function Sn(a) {
  const t = String(a || "").toLowerCase();
  let s = null, n = 1 / 0;
  for (const [e, r, l] of ml) {
    const m = t.indexOf(e);
    m >= 0 && m < n && (n = m, s = [r, l]);
  }
  return s || cl;
}
function Kt(a) {
  const [t, s] = Sn(a);
  return Vt * s / (t + s);
}
const il = 0.9, ol = {
  base: 0.9,
  auto: 0.9,
  ctr: 1,
  t: 1.0333
};
function fl(a) {
  return ol[a == null ? void 0 : a.fontAlign] ?? il;
}
const dl = { ctr: 1, t: 1.0333 };
function xl(a, t) {
  const s = t.lineSpacing, n = a.maxFontSize * Vt, e = (s == null ? void 0 : s.explicit) && s.type === "points" && s.value > n, r = (s == null ? void 0 : s.explicit) && s.type === "percent" && s.value > 1;
  if (e || r) {
    const u = e ? s.value / n : s.value;
    return a.maxFontSize * fl(t) * u;
  }
  const l = dl[t == null ? void 0 : t.fontAlign];
  if (l && !(s != null && s.explicit))
    return a.maxFontSize * l;
  const m = a.segments.length ? a.segments.map((u) => u.style) : t.runs.map((u) => u.style);
  let c = 0, i = 0, d = 0;
  for (const u of m) {
    const p = (u == null ? void 0 : u.fontSize) || a.maxFontSize;
    c = Math.max(c, p * Kt(u == null ? void 0 : u.fontFamily)), p >= a.maxFontSize - 0.01 && (i += 1, u != null && u.syntheticBold && (d += 1));
  }
  c || (c = a.maxFontSize * Kt(null));
  const o = i > 0 && d === i, x = a.maxFontSize * Vt - c, f = o ? (a.maxFontSize + 8) / 102 : 0;
  return (s == null ? void 0 : s.explicit) && s.type === "percent" && s.value < 1 ? x * s.value - f : x - f;
}
function Ae(a, t) {
  const s = (a == null ? void 0 : a.localName) === "txBody" ? a : ea(a, "txBody"), n = s ? ea(s, "lstStyle") : a;
  return ea(n, `lvl${Math.min(9, t + 1)}pPr`) || ea(n, "defPPr");
}
function yl(a, t, s = null, n = null, e = []) {
  const r = e.find((p) => (p == null ? void 0 : p.localName) === "txBody"), l = ea(a, "txBody") || r || null;
  if (!l) return null;
  const m = ea(l, "bodyPr"), c = e.map((p) => (p == null ? void 0 : p.localName) === "txBody" ? ea(p, "bodyPr") : null).filter(Boolean), i = Fa(
    s ? fa(s, "fontRef") : null,
    t
  ), d = [], o = Ua(l, "p").map((p) => {
    var B;
    const A = ea(p, "pPr"), w = Number(H(A, "lvl", 0)), b = ea(A, "defRPr"), L = ea(p, "endParaRPr"), v = e.map((_) => Ae(_, w)).filter(Boolean), T = Ae(l, w);
    T && v.unshift(T);
    const C = [
      b,
      ...v.map((_) => ea(_, "defRPr"))
    ].filter(Boolean), S = [];
    for (const _ of $a(p))
      if (_.localName === "r" || _.localName === "fld") {
        const J = ((B = ea(_, "t")) == null ? void 0 : B.textContent) || "";
        S.push({
          text: J,
          style: lt(
            ea(_, "rPr"),
            C,
            t,
            i,
            n
          )
        });
      } else _.localName === "br" && S.push({
        text: `
`,
        style: lt(
          ea(_, "rPr"),
          C,
          t,
          i,
          n
        )
      });
    (!S.length || S.every((_) => _.text === "")) && S.push({
      text: "",
      style: lt(
        null,
        [...C, L].filter(Boolean),
        t,
        i,
        n
      )
    });
    let q = null;
    const R = [A, ...v].filter(Boolean), k = R.map((_) => {
      const J = ea(_, "buChar");
      return J ? { charNode: J, owner: _ } : null;
    }).find(Boolean), g = (k == null ? void 0 : k.charNode) || null, P = R.map((_) => ea(_, "buAutoNum")).find(Boolean), E = R.map((_) => ea(_, "buNone")).find(Boolean), I = S.some((_) => _.text !== "" && _.text !== `
`);
    if (!E && g && I) {
      const _ = H(g, "char", "•"), J = k ? ea(k.owner, "buFont") : null;
      q = el(J ? H(J, "typeface", "") : "", _) || _;
    } else if (!E && P && I) {
      const _ = Number(H(P, "startAt", 1));
      d[w] = d[w] == null ? _ : d[w] + 1, d.length = w + 1;
      const J = d[w];
      q = H(P, "type", "arabicPeriod").includes("Paren") ? `${J})` : `${J}.`;
    }
    const U = R.map((_) => ea(_, "tabLst")).find(Boolean), D = U ? Ua(U, "tab").map((_) => ({
      pos: ba(Number(H(_, "pos", 0))),
      algn: H(_, "algn", "l")
    })) : [], N = Math.max(1, ...S.map((_) => _.style.fontSize));
    return {
      runs: S,
      tabs: D,
      align: va(A, v, "algn", "l"),
      // `a:fontAlgn` — see FONT_ALIGN_BASELINE_PER_LINE. Default is `base`, which is
      // the model this file has always implemented, so absent/auto/base all cost 0.
      fontAlign: va(A, v, "fontAlgn", "base"),
      latinLineBreak: ja(va(A, v, "latinLnBrk", "0")),
      eastAsianLineBreak: ja(va(A, v, "eaLnBrk", "1")),
      hangingPunct: ja(va(A, v, "hangingPunct", "1")),
      level: w,
      bullet: q,
      marginLeft: ba(va(A, v, "marL", w * 457200)),
      indent: ba(va(A, v, "indent", q ? -228600 : 0)),
      // ⭐ R47：段落**自身**的 `a:pPr` 是否声明了 `indent`（**不沿继承链**）。
      // Office 用它决定「行首手工半角空格」是被折进首行缩进还是当真字形排入，
      // 见 wrapStyledRuns 的判据。⚠️ 必须是「自身声明」而不是 `indent !== 0`：
      // real-4 的母版给正文带了 indent=711200，s28 目标段靠继承拿到 56pt 但
      // **自身未声明**，Office 照样把那个半角空格当字形排出来（实测）。
      indentDeclared: H(A, "indent", null) !== null,
      lineSpacing: is(A, v),
      spaceBefore: Yt(
        A,
        v,
        "spcBef",
        N
      ),
      spaceAfter: Yt(
        A,
        v,
        "spcAft",
        N
      )
    };
  }), x = bt(m, c, "normAutofit"), f = bt(m, c, "spAutoFit"), y = bt(m, c, "noAutofit"), u = x ? Math.max(0.01, Number(H(x, "fontScale", 1e5)) / 1e5) : 1;
  if (u !== 1)
    for (const p of o)
      for (const A of p.runs)
        A.style = { ...A.style, fontSize: A.style.fontSize * u };
  return {
    paragraphs: o,
    vertical: va(m, c, "vert", "horz"),
    wrap: va(m, c, "wrap", "square") !== "none",
    autoFit: x ? "normal" : f ? "shape" : y ? "none" : null,
    fontScale: u,
    anchor: va(m, c, "anchor", "t"),
    insetLeft: ba(va(m, c, "lIns", 91440)),
    insetRight: ba(va(m, c, "rIns", 91440)),
    insetTop: ba(va(m, c, "tIns", 45720)),
    insetBottom: ba(va(m, c, "bIns", 45720))
  };
}
function Na(a) {
  const t = fa(a, "cNvPr");
  return H(t, "id", null);
}
async function hl(a, t, s, n, e, r = {}) {
  const l = ea(a, "spPr"), m = Lt(l), c = r.inheritedShape ? Lt(ea(r.inheritedShape, "spPr")) : null, i = m || c;
  if (!i) return null;
  const d = ea(a, "style"), o = fa(l, "prstGeom"), x = o ? null : fa(l, "custGeom"), f = x ? ds(x) : null, y = f ? "custGeom" : H(o, "prst", "rect"), u = {};
  for (const b of Ra(o && ea(o, "avLst"), "gd")) {
    const L = H(b, "fmla", ""), v = Number(L.replace(/^val\s+/, ""));
    Number.isFinite(v) && (u[H(b, "name", "adj")] = v);
  }
  const p = yl(a, n, d, t, r.inheritedTextSources || []), A = fa(a, "cNvPr"), w = fa(l, "blipFill");
  if (w && t) {
    const b = await ps(l, t, s, n);
    if (b)
      return {
        type: "image",
        spid: Na(a),
        name: H(A, "name", "Shape"),
        ...i,
        src: b,
        opacity: fs(fa(w, "blip")),
        fallback: !1
      };
  }
  return {
    type: "shape",
    spid: Na(a),
    name: H(A, "name", "Shape"),
    placeholderType: r.placeholderType || null,
    ...i,
    preset: y,
    customGeometry: f,
    adjustments: u,
    fill: kt(l, d, n, { w: i.width, h: i.height }, e),
    line: ss(l, d, n),
    shadow: Ur(l, d, n),
    text: p,
    fallback: ![
      "rect",
      "roundRect",
      "ellipse",
      "triangle",
      "rtTriangle",
      "diamond",
      "line",
      "leftArrow",
      "rightArrow",
      "upArrow",
      "downArrow",
      "homePlate",
      "pentagon",
      "wedgeRoundRectCallout",
      "wedgeRectCallout",
      "chevron",
      "heart",
      "star5",
      "bentUpArrow",
      "parallelogram",
      "flowChartInputOutput",
      "leftBrace",
      "rightBrace",
      "bentConnector2",
      "bentConnector3",
      "straightConnector1",
      "cloud",
      "cloudCallout",
      // custGeom 已实现真实路径求值（见上面 parseShape 里的注释），不是回退。
      "custGeom"
    ].includes(y)
  };
}
function pl(a, t) {
  const s = ea(a, "spPr"), n = Lt(s);
  if (!n) return null;
  const e = fa(s, "prstGeom");
  return {
    type: "line",
    spid: Na(a),
    ...n,
    preset: H(e, "prst", "straightConnector1"),
    fill: "none",
    line: ss(s, ea(a, "style"), t),
    fallback: !1
  };
}
function fs(a) {
  let t = 1;
  const s = fa(a, "alphaModFix"), n = fa(a, "alphaMod"), e = fa(a, "alphaOff");
  return s && (t *= Number(H(s, "amt", 1e5)) / 1e5), n && (t *= Number(H(n, "amt", 1e5)) / 1e5), e && (t += Number(H(e, "amt", 0)) / 1e5), Math.max(0, Math.min(1, t));
}
function ds(a) {
  const t = (e) => $a(e).filter((r) => r.localName === "pt").map((r) => ({ x: H(r, "x", "0"), y: H(r, "y", "0") })), s = (e) => Ra(ea(a, e), "gd").map((r) => ({
    name: H(r, "name", ""),
    fmla: H(r, "fmla", "")
  })), n = Ra(ea(a, "pathLst"), "path").map((e) => {
    const r = [];
    for (const l of $a(e))
      switch (l.localName) {
        case "moveTo":
          r.push({ c: "M", pts: t(l) });
          break;
        case "lnTo":
          r.push({ c: "L", pts: t(l) });
          break;
        case "cubicBezTo":
          r.push({ c: "C", pts: t(l) });
          break;
        case "quadBezTo":
          r.push({ c: "Q", pts: t(l) });
          break;
        case "arcTo":
          r.push({
            c: "A",
            wR: H(l, "wR", "0"),
            hR: H(l, "hR", "0"),
            stAng: H(l, "stAng", "0"),
            swAng: H(l, "swAng", "0")
          });
          break;
        case "close":
          r.push({ c: "Z" });
          break;
      }
    return {
      w: Number(H(e, "w", "0")),
      h: Number(H(e, "h", "0")),
      cmds: r
    };
  });
  return { av: s("avLst"), gd: s("gdLst"), paths: n };
}
async function xs(a, t, s, n, e) {
  const r = ea(a, "spPr"), l = Lt(r);
  if (!l) return null;
  const m = hs(a, l, t, e), c = (() => {
    const b = fa(r, "custGeom");
    return b ? Ne(ds(b), l.width, l.height, {}) : null;
  })(), i = Na(a);
  (i == null || i === "") && e.diagnostics.add({
    code: "shape.missing-id",
    severity: "warn",
    scope: { part: "pic" },
    message: "图片 cNvPr 缺 id（spid 无法追踪）"
  });
  const d = fa(a, "blip"), o = Ea(d, "embed"), x = t.get(o);
  if (!x)
    return e.diagnostics.add({
      code: "media.dangling-embed",
      severity: "warn",
      scope: { part: o || null },
      message: `图片 r:embed 指向不存在的 rId：${o || "(空)"}`
    }), { type: "unsupported", ...l, label: "Missing image", fallback: !0 };
  if (x.external)
    return { type: "unsupported", ...l, label: "External image", fallback: !0 };
  const f = s.file(x.path);
  if (!f)
    return e.diagnostics.add({
      code: "media.file-missing",
      severity: "warn",
      scope: { part: x.path },
      message: `关系指向的媒体文件不存在：${x.path}`
    }), { type: "unsupported", ...l, label: "Missing image", fallback: !0 };
  const y = jt(x.path), u = await f.async("uint8array");
  if (vs(s, x.path, u), u.byteLength > Le)
    return e.diagnostics.add({
      code: "media.over-entry-budget",
      severity: "warn",
      scope: { part: x.path },
      message: `媒体 ${x.path} 解压后 ${u.byteLength} 字节 > 单文件预算 ${Le}`
    }), { type: "unsupported", ...l, label: "Image too large", fallback: !0 };
  if (e.mediaBudget.totalBytes += u.byteLength, e.mediaBudget.totalBytes > Re)
    return e.diagnostics.add({
      code: "media.over-total-budget",
      severity: "warn",
      scope: { part: x.path },
      message: `媒体累计 ${e.mediaBudget.totalBytes} 字节 > 总量预算 ${Re}`
    }), { type: "unsupported", ...l, label: "Image too large", fallback: !0 };
  const p = Math.max(256, Math.min(2048, Math.ceil(l.width * 4))), A = Math.max(256, Math.min(2048, Math.ceil(l.height * 4))), w = await We(
    u,
    y,
    p,
    A,
    l.width,
    ns(d, n),
    // 内嵌 PDF 渲染失败时 mediaToDataUrl 会**继续回退**并多半成功返回一张残缺图，
    // 只看 `src` 分辨不出来 ⇒ 让它把这条诊断报进 deck.diagnostics。
    (b) => e.diagnostics.add({
      ...b,
      severity: "warn",
      scope: { part: x.path }
    })
  );
  return w ? {
    type: "image",
    spid: Na(a),
    ...l,
    ...m ? { media: m } : {},
    src: w,
    opacity: fs(d),
    geometryPath: c,
    crop: (() => {
      const b = fa(a, "srcRect");
      if (!b) return null;
      const L = {
        left: Number(H(b, "l", 0)) / 1e5,
        top: Number(H(b, "t", 0)) / 1e5,
        right: Number(H(b, "r", 0)) / 1e5,
        bottom: Number(H(b, "b", 0)) / 1e5
      };
      return Object.values(L).some((v) => v > 0) ? L : null;
    })(),
    duotone: (() => {
      const b = fa(d, "duotone");
      if (!b) return null;
      const L = $a(b).map((v) => mt(v, n)).filter(Boolean);
      return L.length >= 2 ? { dark: L[0], light: L[1] } : null;
    })(),
    // a:lum bright（1/100000）：-100000 把抠像图压成纯黑剪影，不解析就会显示彩色原图。
    lumBrightness: (() => {
      const b = ea(d, "lum") || fa(d, "lum"), L = Number(H(b, "bright", NaN));
      return !Number.isFinite(L) || L === 0 ? null : Math.max(0, 1 + L / 1e5);
    })(),
    fallback: !1
  } : (e.diagnostics.add({
    code: "media.decode-failed",
    severity: "warn",
    scope: { part: x.path },
    message: `媒体解码失败：${x.path}（${y}）`
  }), {
    type: "unsupported",
    ...l,
    label: y.split("/").pop().toUpperCase(),
    fallback: !0
  });
}
function ys(a, t) {
  if (!a) return a;
  let s = parseInt(a.slice(0, 2), 16) / 255, n = parseInt(a.slice(2, 4), 16) / 255, e = parseInt(a.slice(4, 6), 16) / 255;
  const r = (d) => Math.max(0, Math.min(1, d)), l = (d) => d <= 0.04045 ? d / 12.92 : Math.pow((d + 0.055) / 1.055, 2.4), m = (d) => d <= 31308e-7 ? d * 12.92 : 1.055 * Math.pow(d, 1 / 2.4) - 0.055, c = (d, o, x) => {
    const f = Math.max(d, o, x), y = Math.min(d, o, x), u = (f + y) / 2;
    if (f === y) return [0, 0, u];
    const p = f - y, A = u > 0.5 ? p / (2 - f - y) : p / (f + y);
    let w;
    return f === d ? w = (o - x) / p + (o < x ? 6 : 0) : f === o ? w = (x - d) / p + 2 : w = (d - o) / p + 4, [w / 6, A, u];
  }, i = (d, o, x) => {
    if (o === 0) return [x, x, x];
    const f = (p, A, w) => {
      let b = w;
      return b < 0 && (b += 1), b > 1 && (b -= 1), b < 1 / 6 ? p + (A - p) * 6 * b : b < 1 / 2 ? A : b < 2 / 3 ? p + (A - p) * (2 / 3 - b) * 6 : p;
    }, y = x < 0.5 ? x * (1 + o) : x + o - x * o, u = 2 * x - y;
    return [
      f(u, y, d + 1 / 3),
      f(u, y, d),
      f(u, y, d - 1 / 3)
    ];
  };
  for (const [d, o] of t) {
    const x = o / 1e5;
    if (d === "tint")
      s = m(r(l(s) * x + (1 - x))), n = m(r(l(n) * x + (1 - x))), e = m(r(l(e) * x + (1 - x)));
    else if (d === "shade")
      s = m(r(l(s) * x)), n = m(r(l(n) * x)), e = m(r(l(e) * x));
    else if (d === "lumMod") {
      const [f, y, u] = c(s, n, e);
      [s, n, e] = i(f, y, r(u * x));
    } else if (d === "lumOff") {
      const [f, y, u] = c(s, n, e);
      [s, n, e] = i(f, y, r(u + x));
    } else if (d === "satMod") {
      const [f, y, u] = c(s, n, e);
      [s, n, e] = i(f, r(y * x), u);
    } else if (d === "gamma" || d === "invGamma") {
      const f = d === "gamma" ? m : l;
      s = f(r(s)), n = f(r(n)), e = f(r(e));
    }
  }
  return `#${[s, n, e].map((d) => Math.round(r(d) * 255).toString(16).padStart(2, "0")).join("")}`;
}
function mt(a, t) {
  if (!a) return null;
  const s = ts(a, t);
  if (!s) return null;
  const n = [];
  let e = 1;
  for (const c of $a(a)) {
    const i = c.localName, d = Number(H(c, "val", 0));
    i === "alpha" ? e = d / 1e5 : i === "alphaMod" ? e *= d / 1e5 : i === "alphaOff" ? e += d / 1e5 : i === "gamma" || i === "invGamma" ? n.push([i, 0]) : i && d && n.push([i, d]);
  }
  const r = n.length ? ys(s.slice(1), n) : s, l = Math.max(0, Math.min(1, e));
  if (l >= 0.999) return r;
  const m = Math.round(l * 255).toString(16).padStart(2, "0");
  return `${r.slice(0, 7)}${m}`;
}
async function ul(a, t) {
  const s = /* @__PURE__ */ new Map(), n = await a.readXmlPart("ppt/tableStyles.xml", !1);
  if (!n) return s;
  for (const e of Ra(n, "tblStyle")) {
    const r = H(e, "styleId");
    if (!r) continue;
    const l = {};
    for (const m of $a(e)) {
      const c = m.localName, i = ea(m, "tcStyle"), d = ea(m, "tcTxStyle"), o = i ? ea(i, "fill") : null, x = o ? ea(o, "solidFill") : null, f = x ? fa(x, "schemeClr") || fa(x, "srgbClr") : null;
      if (l[c] = {
        fill: f ? mt(f, t) : null,
        textColor: null,
        bold: !1
      }, d) {
        const y = fa(d, "fontRef"), u = y ? $a(y)[0] : null;
        l[c].textColor = u ? mt(u, t) : null;
        const p = fa(d, "schemeClr");
        p && (l[c].textColor = mt(p, t)), H(d, "b") === "on" && (l[c].bold = !0);
      }
    }
    s.set(r, l);
  }
  return s;
}
function gl(a, t) {
  var e;
  const s = ea(a, "txBody"), n = [];
  if (s) {
    const r = ea(s, "bodyPr"), l = [];
    for (const m of Ua(s, "p")) {
      const c = ea(m, "pPr"), i = Number(H(c, "lvl", 0)), d = ea(c, "defRPr"), o = ea(m, "endParaRPr"), x = d, f = [];
      for (const L of $a(m))
        if (L.localName === "r" || L.localName === "fld") {
          const v = ((e = ea(L, "t")) == null ? void 0 : e.textContent) || "";
          f.push({
            text: v,
            style: lt(
              ea(L, "rPr"),
              x,
              t,
              null,
              null
            )
          });
        } else L.localName === "br" && f.push({
          text: `
`,
          style: lt(
            ea(L, "rPr"),
            x,
            t,
            null,
            null
          )
        });
      f.length || f.push({
        text: "",
        style: lt(
          null,
          d || o,
          t,
          null,
          null
        )
      });
      let y = null;
      const u = ea(c, "buChar"), p = ea(c, "buAutoNum"), A = ea(c, "buNone"), w = f.some((L) => L.text !== "" && L.text !== `
`);
      if (!A && u && w)
        y = H(u, "char", "•");
      else if (!A && p && w) {
        const L = Number(H(p, "startAt", 1));
        l[i] = l[i] == null ? L : l[i] + 1, y = `${l[i]}.`;
      }
      const b = Math.max(1, ...f.map((L) => L.style.fontSize));
      n.push({
        runs: f,
        align: H(c, "algn", "l"),
        latinLineBreak: ja(H(c, "latinLnBrk", "0")),
        eastAsianLineBreak: ja(H(c, "eaLnBrk", "1")),
        hangingPunct: ja(H(c, "hangingPunct", "1")),
        level: i,
        bullet: y,
        marL: ba(H(c, "marL", 0)),
        indent: ba(H(c, "indent", 0)),
        // ⭐ R47：同上，「自身 pPr 是否声明 indent」。
        indentDeclared: H(c, "indent", null) !== null,
        lineSpacing: is(c),
        spaceBefore: Yt(
          c,
          [],
          "spcBef",
          b
        ),
        spaceAfter: Yt(
          c,
          [],
          "spcAft",
          b
        )
      });
    }
    return {
      paragraphs: n,
      wrap: H(r, "wrap", "square") !== "none",
      anchor: H(r, "anchor", "t"),
      insetLeft: ba(H(r, "lIns", 91440)),
      insetRight: ba(H(r, "rIns", 91440)),
      insetTop: ba(H(r, "tIns", 45720)),
      insetBottom: ba(H(r, "bIns", 45720))
    };
  }
  return null;
}
function wl(a, t, s, n, e, r) {
  if (!r) return null;
  const l = ja(H(e, "firstRow", "0")), m = ja(H(e, "lastRow", "0")), c = ja(H(e, "firstCol", "0")), i = ja(H(e, "lastCol", "0")), d = ja(H(e, "bandRow", "0")), o = ja(H(e, "bandCol", "0"));
  if (l && a === 0 && r.firstRow) return r.firstRow;
  if (m && a === s - 1 && r.lastRow) return r.lastRow;
  if (c && t === 0 && r.firstCol) return r.firstCol;
  if (i && t === n - 1 && r.lastCol) return r.lastCol;
  if (d && r.band1H) {
    const x = l ? a - 1 : a;
    if (x >= 0 && x % 2 === 0) return r.band1H;
  }
  if (d && r.band2H) {
    const x = l ? a - 1 : a;
    if (x >= 0 && x % 2 === 1) return r.band2H;
  }
  if (o && r.band1V) {
    const x = c ? t - 1 : t;
    if (x >= 0 && x % 2 === 0) return r.band1V;
  }
  return r.wholeTbl || null;
}
function Al(a, t, s, n) {
  const e = fa(a, "tbl");
  if (!e) return null;
  const r = ea(e, "tblGrid"), l = Ua(r, "gridCol").map(
    (A) => ba(H(A, "w", 914400))
  ), m = ea(e, "tblPr"), c = ja(H(m, "firstRow", "0")), i = ja(H(m, "bandRow", "0")), d = fa(m, "tableStyleId"), o = d ? d.textContent.trim() : null;
  let x = o && s && s.get(o) || null;
  if (!x && o === "{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}") {
    const A = t.accent1 || "#4472c4", w = t.lt1 || "#ffffff", b = { color: w, width: ba(12700) }, L = { color: w, width: ba(38100) }, v = { top: b, bottom: b, left: b, right: b };
    x = {
      // ⚠️ 每个区域都显式带上 `borders`（而不是只在 wholeTbl 上写、指望下游回落）：
      // 实测 R1/R2/R3（band 区域）**都有** 1pt 白线，而我方 `resolveCellStyle` 返回的
      // 是**匹配到的那个区域**，band1H/band2H 上若没有 borders 就会一条线都不画。
      // 每个区域各写一份，等价于「band 回落 wholeTbl」，且不依赖对样式 XML 细节的猜测。
      wholeTbl: { fill: "#ffffff", textColor: t.tx1 || "#000000", bold: !1, borders: v },
      firstRow: {
        fill: A,
        textColor: "#ffffff",
        bold: !0,
        borders: { ...v, bottom: L }
      },
      band1H: { fill: _e(A, 0.6), textColor: t.tx1 || "#000000", bold: !1, borders: v },
      band2H: { fill: _e(A, 0.8), textColor: t.tx1 || "#000000", bold: !1, borders: v }
    };
  }
  const f = Ua(e, "tr"), y = f.length, u = l.length, p = f.map((A, w) => {
    const b = ba(H(A, "h", 457200));
    let L = 0;
    const v = Ua(A, "tc").map((T) => {
      const C = H(T, "hMerge", "0"), S = H(T, "vMerge", "0"), q = C === "1" || C === "true", R = S === "1" || S === "true", k = ea(T, "tcPr"), g = Number(H(T, "gridSpan", "1")), P = Number(H(T, "rowSpan", "1")), E = l.slice(L, L + Math.max(1, g)).reduce((V, K) => V + K, 0), I = k ? kt(k, null, t, { w: E, h: b }, n) : "none", U = Wr(k, t), D = H(k, "anchor", "t"), N = gl(T, t), B = ba(H(k, "marL", 91440)), _ = ba(H(k, "marR", 91440)), J = ba(H(k, "marT", 45720)), aa = ba(H(k, "marB", 45720)), Q = wl(
        w,
        L,
        y,
        u,
        m,
        x
      ), pa = U || (Q == null ? void 0 : Q.borders) || null, Aa = I !== "none" ? I : Q != null && Q.fill ? Q.fill : "none", xa = Q != null && Q.textColor ? { color: Q.textColor, bold: Q.bold } : null, wa = L;
      return L += q ? 0 : g, {
        text: N,
        fill: Aa,
        anchor: D,
        col: wa,
        gridSpan: g,
        rowSpan: P,
        hMerge: q,
        vMerge: R,
        marL: B,
        marR: _,
        marT: J,
        marB: aa,
        borders: pa,
        styleOverride: xa
      };
    });
    return { height: b, cells: v };
  });
  return { columnWidths: l, rows: p, firstRow: c, bandRow: i, styleRegions: x, tableProperties: m };
}
const bl = [
  ["videoFile", "video"],
  ["audioFile", "audio"]
];
function vl(a, t) {
  const s = fa(a, "blip");
  if (!s) return null;
  const n = t.get(
    Ea(s, "embed") || Ea(s, "link")
  );
  return !n || n.external ? null : n.path;
}
function hs(a, t, s, n) {
  if (!a || !s || !t) return null;
  for (const [e, r] of bl) {
    const l = fa(a, e);
    if (!l) continue;
    const m = fa(a, "media"), c = m && Ea(m, "embed") || Ea(l, "link") || Ea(l, "embed"), i = s.get(c);
    return i ? i.external ? null : {
      kind: r,
      part: i.path,
      mime: jt(i.path),
      rect: {
        x: t.x,
        y: t.y,
        width: t.width,
        height: t.height
      },
      posterPart: vl(a, s)
    } : (n.diagnostics.add({
      code: "media.dangling-embed",
      severity: "warn",
      scope: { part: c || null },
      message: `媒体 r:link/r:embed 指向不存在的 rId：${c || "(空)"}`
    }), null);
  }
  return null;
}
function Ll(a) {
  const t = [], s = (n, e) => {
    if (!(!Array.isArray(n) || e > 8))
      for (const r of n)
        !r || typeof r != "object" || (r.media && t.push({ id: `m${t.length + 1}`, spid: r.spid ?? null, ...r.media }), Array.isArray(r.children) && s(r.children, e + 1), Array.isArray(r.elements) && s(r.elements, e + 1));
  };
  return s(a, 0), t;
}
function Rl(a, t) {
  const s = (a == null ? void 0 : a.documentElement) || a;
  if (!s || !t) return [];
  const n = [];
  for (const e of Ra(s, "sndTgt")) {
    const r = t.get(Ea(e, "embed"));
    if (!r || r.external) continue;
    const l = r.path;
    n.some((m) => m.part === l) || n.push({ part: l, mime: jt(l), name: H(e, "name", "") || null });
  }
  return n;
}
async function Ml(a, t, s, n, e, r, l) {
  const m = Lt(fa(a, "xfrm"));
  if (!m) return null;
  const c = hs(a, m, t, l), i = !!fa(a, "tbl"), d = !!fa(a, "chart"), o = Ra(a, "oleObj"), x = o[0] || null, f = o.find((p) => fa(p, "pic")) || null, y = !!x, u = H(x, "progId", "");
  if (y && t && s) {
    const p = f ? fa(f, "pic") : null;
    if (p) {
      const A = await xs(p, t, s, n, l);
      if ((A == null ? void 0 : A.type) === "image") {
        const w = kt(
          ea(p, "spPr"),
          null,
          n,
          { w: A.width, h: A.height },
          r
        );
        return {
          ...A,
          backgroundFill: w,
          spid: Na(a),
          progId: u,
          oleFallback: !0,
          fallback: !1
        };
      }
    }
  }
  if (i) {
    const p = Al(a, n, e, r);
    if (p)
      return {
        type: "table",
        spid: Na(a),
        ...m,
        table: p,
        fallback: !1
      };
  }
  if (d && t && s) {
    const p = fa(a, "chart"), A = Ea(p, "id"), w = t.get(A);
    if (w && !w.external) {
      const b = s.file(w.path);
      if (b) {
        const L = await b.async("text"), v = (rn || as)(L), T = W0(v.documentElement, n, l);
        if (T)
          return {
            type: "chart",
            spid: Na(a),
            ...m,
            chart: T,
            fallback: !1
          };
      }
    }
  }
  return {
    type: "unsupported",
    spid: Na(a),
    ...m,
    label: d ? "Chart" : "Graphic",
    hideFallback: y,
    fallback: !0,
    // R94：视频 / 音频的元数据随元素一起带出去（渲染不受影响）
    ...c ? { media: c } : {}
  };
}
async function ps(a, t, s, n = null) {
  if (!a) return null;
  const e = ea(a, "blipFill") || fa(a, "blipFill");
  if (!e) return null;
  const r = ea(e, "blip") || fa(e, "blip");
  if (!r) return null;
  const l = Ea(r, "embed"), m = t.get(l);
  if (!m || m.external) return null;
  const c = s.file(m.path);
  if (!c) return null;
  const i = jt(m.path), d = await c.async("uint8array");
  return vs(s, m.path, d), await We(d, i, 2048, 2048, 0, ns(r, n));
}
function pn(a, t) {
  if (!a) return null;
  for (const s of a.values())
    if (s.type && s.type.endsWith(t))
      return s;
  return null;
}
async function un(a, t, s, n, e, r) {
  const l = fa(a, "bg");
  if (!l) return null;
  const m = ea(l, "bgPr");
  if (m) {
    const i = await ps(m, s, n, t);
    return i ? { type: "image", value: i } : { type: "color", value: kt(m, null, t, e, r) || "#ffffff" };
  }
  const c = ea(l, "bgRef");
  return c ? { type: "color", value: Fa(c, t) || "#ffffff" } : null;
}
async function $l(a, t, s) {
  const n = {
    layoutDocument: null,
    layoutRelationships: /* @__PURE__ */ new Map(),
    masterDocument: null,
    masterRelationships: /* @__PURE__ */ new Map(),
    themePath: null
  }, e = pn(t, "/slideLayout");
  if (!e || (n.layoutDocument = await a.readXmlPart(e.path, !1), !n.layoutDocument)) return n;
  const r = await a.readXmlPart(Wt(e.path), !1);
  n.layoutRelationships = r ? Gt(r, e.path, s) : /* @__PURE__ */ new Map();
  const l = pn(n.layoutRelationships, "/slideMaster");
  if (!l || (n.masterDocument = await a.readXmlPart(l.path, !1), !n.masterDocument)) return n;
  const m = await a.readXmlPart(Wt(l.path), !1);
  n.masterRelationships = m ? Gt(m, l.path, s) : /* @__PURE__ */ new Map();
  const c = pn(n.masterRelationships, "/theme");
  return n.themePath = (c == null ? void 0 : c.path) || null, n;
}
async function jl(a, t, s, n, e, r, l) {
  const m = await un(t, s, n, a, r, l);
  if (m) return m;
  if (e.layoutDocument) {
    const c = await un(
      e.layoutDocument,
      s,
      e.layoutRelationships,
      a,
      r,
      l
    );
    if (c) return c;
  }
  if (e.masterDocument) {
    const c = await un(
      e.masterDocument,
      s,
      e.masterRelationships,
      a,
      r,
      l
    );
    if (c) return c;
  }
  return { type: "color", value: "#ffffff" };
}
function us(a) {
  const t = fa(a, "nvPr");
  return !!(t && fa(t, "ph"));
}
function Fn(a) {
  const t = fa(fa(a, "nvPr"), "ph");
  return t ? {
    type: H(t, "type", "body"),
    idx: H(t, "idx", null)
  } : null;
}
const kl = { ctrTitle: ["title"], title: ["ctrTitle"] };
function be(a, t) {
  if (!a || !t) return null;
  const s = Ra(a, "sp").filter(us);
  if (t.idx !== null) {
    const e = s.find((r) => {
      var l;
      return ((l = Fn(r)) == null ? void 0 : l.idx) === t.idx;
    });
    if (e) return e;
  }
  const n = [t.type, ...kl[t.type] || []];
  for (const e of n) {
    const r = s.find((l) => {
      var m;
      return ((m = Fn(l)) == null ? void 0 : m.type) === e;
    });
    if (r) return r;
  }
  return null;
}
function Cl(a, t) {
  const s = fa(a, "txStyles");
  return s ? t === "title" || t === "ctrTitle" ? ea(s, "titleStyle") : ["body", "obj", "subTitle"].includes(t) ? ea(s, "bodyStyle") : ea(s, "otherStyle") : null;
}
function gs(a, t) {
  const s = t.width / t.chExt.cx, n = t.height / t.chExt.cy;
  if (a.x !== void 0 && (a.x = t.x + (a.x - t.chOff.x) * s, a.y = t.y + (a.y - t.chOff.y) * n, a.width !== void 0 && (a.width *= s), a.height !== void 0 && (a.height *= n)), a.type === "group")
    for (const e of a.elements) gs(e, t);
}
const _l = /* @__PURE__ */ new Set(["shape", "line", "image", "chart", "group"]);
function ws(a) {
  return _l.has(a.type) ? a.type !== "group" || a.elements.every(ws) : !1;
}
function As(a, t) {
  if (a.x !== void 0 && a.width !== void 0 && t.flipH && (a.x = 2 * (t.x + t.width / 2) - a.x - a.width), a.y !== void 0 && a.height !== void 0 && t.flipV && (a.y = 2 * (t.y + t.height / 2) - a.y - a.height), t.flipH && (a.flipH = !a.flipH, a.rotation = -(a.rotation || 0)), t.flipV && (a.flipV = !a.flipV, a.rotation = -(a.rotation || 0)), a.type === "group")
    for (const s of a.elements) As(s, t);
}
async function Zt(a, t, s, n, e, r, l = {}, m) {
  const c = (a == null ? void 0 : a.localName) === "grpSp" ? a : fa(a, "spTree"), i = [], d = l.skipPlaceholders === !0;
  for (const o of $a(c)) {
    if (d && us(o) || Sl(o)) continue;
    if (o.localName === "grpSp") {
      const f = await Zt(
        o,
        t,
        s,
        n,
        e,
        r,
        { ...l, sourceLevel: l.sourceLevel || "slide" },
        m
      ), y = ea(o, "grpSpPr"), u = y ? ea(y, "xfrm") : null;
      if (u) {
        const p = Fl(u);
        if (p && p.chExt.cx > 0 && p.chExt.cy > 0) {
          for (const w of f)
            gs(w, p);
          const A = (p.flipH || p.flipV) && f.every(ws);
          if (A) for (const w of f) As(w, p);
          i.push({
            type: "group",
            spid: Na(o),
            sourceLevel: l.sourceLevel || "slide",
            x: p.x,
            y: p.y,
            width: p.width,
            height: p.height,
            rotation: p.rotation,
            // 烘焙过的 flip 已经落到子元素身上，组自己不能再翻一次。
            flipH: A ? !1 : p.flipH,
            flipV: A ? !1 : p.flipV,
            elements: f,
            fallback: !1
          });
          continue;
        }
      }
      i.push(...f);
      continue;
    }
    let x = null;
    if (o.localName === "sp") {
      const f = Fn(o), y = f ? be(l.placeholderLayoutDocument, f) : null, u = f ? be(l.placeholderMasterDocument, f) : null, A = [y, u].find(
        (b) => b && fa(b, "xfrm")
      ) || y || u, w = [
        y ? ea(y, "txBody") : null,
        u ? ea(u, "txBody") : null,
        f ? Cl(l.placeholderMasterDocument, f.type) : null
      ].filter(Boolean);
      x = await hl(o, t, s, n, r, {
        inheritedShape: A,
        inheritedTextSources: w,
        placeholderType: (f == null ? void 0 : f.type) || null,
        slideSize: l.slideSize
      });
    }
    o.localName === "pic" && (x = await xs(o, t, s, n, m)), o.localName === "cxnSp" && (x = pl(o, n)), o.localName === "graphicFrame" && (x = await Ml(o, t, s, n, e, r, m)), x && (x.sourceLevel = l.sourceLevel || "slide", i.push(x));
  }
  return i;
}
function Sl(a) {
  const t = fa(a, "cNvPr");
  if (!t) return !1;
  const s = String(H(t, "hidden", "0")).toLowerCase();
  return s === "1" || s === "true";
}
function Fl(a) {
  if (!a) return null;
  const t = ea(a, "off"), s = ea(a, "ext"), n = ea(a, "chOff"), e = ea(a, "chExt");
  return !t || !s ? null : {
    x: ba(H(t, "x", 0)),
    y: ba(H(t, "y", 0)),
    width: ba(H(s, "cx", 0)),
    height: ba(H(s, "cy", 0)),
    chOff: n ? { x: ba(H(n, "x", 0)), y: ba(H(n, "y", 0)) } : { x: 0, y: 0 },
    chExt: e ? { cx: ba(H(e, "cx", 1)), cy: ba(H(e, "cy", 1)) } : { cx: 1, cy: 1 },
    rotation: Number(H(a, "rot", 0)) / 6e4,
    flipH: ja(H(a, "flipH")),
    flipV: ja(H(a, "flipV"))
  };
}
function El(a) {
  const t = String(H(a, "path", "") || "").trim();
  if (!t) return null;
  const s = t.split(/[\s,]+/).filter(Boolean), n = [], e = [];
  let r = 0;
  for (; r < s.length; ) {
    const m = s[r];
    if (/^[MLml]$/.test(m)) {
      e.push(m.toUpperCase()), r += 1;
      continue;
    }
    if (/^[Zz]$/.test(m)) {
      r += 1;
      continue;
    }
    const c = Number(s[r]), i = Number(s[r + 1]);
    if (!n.length && !e.length && e.push("M"), !Number.isFinite(c) || !Number.isFinite(i)) return null;
    n.push({ x: c, y: i }), r += 2;
  }
  return e.find((m) => m !== "M" && m !== "L") || n.length < 2 ? null : n;
}
function Il(a, t = { delay: 0, repeat: 1 }) {
  var R, k;
  const s = fa(a, "spTgt"), n = H(s, "spid", null);
  if (!n) return null;
  const e = ea(s, "txEl"), r = e && ea(e, "pRg"), l = e && ea(e, "charRg"), m = r || l, c = m ? {
    kind: r ? "paragraph" : "character",
    start: Number(H(m, "st", 0)),
    end: Number(H(m, "end", H(m, "st", 0)))
  } : null, i = c ? `${n}:${c.kind}:${c.start}-${c.end}` : String(n), d = ea(a, "iterate"), o = ea(d, "tmAbs"), x = ea(d, "tmPct"), f = o ? Math.max(0, Number(H(o, "val", 0)) || 0) : null, y = d ? {
    type: H(d, "type", "lt"),
    // `tmPct` 是十万分比：10000 = 父时长的 10% = 相邻两个单元的起始间隔。
    // 0 视为「不迭代」——没有间隔就没有逐字效果，退化成整块播放。
    intervalRatio: Math.max(0, Number(H(x, "val", 0)) / 1e5),
    // ⭐ R122：`tmAbs` 是**绝对毫秒**（K1C2L2 slide1 spid9 / slide2 spid17 都是 200ms）。
    //   全库 82 份 pptx 里既有 7 处 iterate 全是 `type="lt"`+`tmPct`，这是首次出现的
    //   `type="wd"`+`tmAbs` 形态；只读 tmPct ⇒ intervalRatio=0 ⇒ hasIterate=false
    //   ⇒ 整块 1ms 出现（Office 真神谕已拍到「逐段出现」）。两者同在时 tmAbs 优先。
    ...f !== null ? { intervalMs: f } : {}
  } : null, u = fa(a, "animEffect");
  let p = 1;
  for (const g of Ra(a, "cTn")) {
    const P = Number(H(g, "dur", NaN));
    Number.isFinite(P) && (p = Math.max(p, P));
  }
  const A = {
    fromX: 0,
    toX: 0,
    fromY: 0,
    toY: 0,
    unresolved: []
  };
  let w = null;
  const b = [];
  for (const g of Ra(a, "anim")) {
    const P = (k = (R = fa(g, "attrName")) == null ? void 0 : R.textContent) == null ? void 0 : k.trim();
    if (!P) continue;
    const E = Ra(g, "tav").map((N) => H(N, "fmla", "")).filter(Boolean);
    if (E.length && /cos|sin|pi|\$/.test(E.join(" "))) {
      A.unresolved.push(`${P}: fmla=${E[0]}`);
      continue;
    }
    const I = Ra(g, "tav").map((N) => H(
      fa(N, "strVal") || fa(N, "fltVal") || fa(N, "boolVal"),
      "val",
      ""
    ));
    if (!I.length) continue;
    if (P === "ppt_x" || P === "ppt_y" || P === "ppt_w" || P === "ppt_h" || P === "style.rotation") {
      const N = { ppt_x: "X", ppt_y: "Y", ppt_w: "ScaleX", ppt_h: "ScaleY", "style.rotation": "Rotate" }[P];
      for (const [B, _] of [I[0], I.at(-1)].entries()) {
        const J = `${B === 0 ? "from" : "to"}${N}`;
        if (P === "style.rotation") {
          const Q = Number(_);
          if (!Number.isFinite(Q)) {
            A.unresolved.push(`${P}: ${_}`);
            continue;
          }
          w || (w = { fromScaleX: 1, toScaleX: 1, fromScaleY: 1, toScaleY: 1, fromRotate: 0, toRotate: 0 }), w[J] = Q;
          continue;
        }
        const aa = Bl(_, A.unresolved);
        P === "ppt_x" || P === "ppt_y" ? A[J] = aa === null ? 0 : aa : aa !== null && (w || (w = { fromScaleX: 1, toScaleX: 1, fromScaleY: 1, toScaleY: 1, fromRotate: 0, toRotate: 0 }), w[J] = aa);
      }
      continue;
    }
    const U = Ra(g, "tav").map((N) => ({
      // `tm` 是占该轨道时长的十万分比：tm=50000 → 50%。
      at: Number(H(N, "tm", 0)) / 1e5,
      value: H(
        fa(N, "strVal") || fa(N, "boolVal"),
        "val",
        ""
      )
    })).filter((N) => Number.isFinite(N.at) && (N.value === "visible" || N.value === "hidden"));
    if (!U.length) continue;
    const D = Ra(g, "cTn").map((N) => Number(H(N, "dur", NaN))).filter((N) => Number.isFinite(N) && N > 0);
    b.push({
      attrName: P,
      duration: D.length ? Math.max(...D) : 1,
      keyframes: U
    });
  }
  const L = fa(a, "animMotion");
  let v = null;
  if (L) {
    const g = El(L);
    g ? v = {
      // `relative` = 路径点就是**位移量**；`fixed` = 路径点是绝对位置，位移要减起点。
      relative: H(L, "pathEditMode", "relative") !== "fixed",
      points: g,
      accel: Math.min(1, Math.max(0, Number(H(a, "accel", 0)) || 0) / 1e5),
      decel: Math.min(1, Math.max(0, Number(H(a, "decel", 0)) || 0) / 1e5)
    } : A.unresolved.push(`animMotion path: ${H(L, "path", "")}`);
  }
  const T = fa(a, "cmd"), C = Dl(H(T, "cmd", "")), S = [], q = ea(a, "subTnLst");
  if (q && t.relationships)
    for (const g of Ra(q, "audio")) {
      const P = ea(g, "cMediaNode"), E = H(ea(P, "cTn"), "masterRel", null);
      for (const I of Ra(g, "sndTgt")) {
        const U = t.relationships.get(Ea(I, "embed"));
        if (!U || U.external) continue;
        const D = U.path;
        S.push({
          part: D,
          mime: jt(D),
          name: H(I, "name", "") || null,
          ...E ? { masterRel: E } : {}
        });
      }
    }
  return {
    spid: n,
    targetId: i,
    textRange: c,
    trigger: H(a, "nodeType", "clickEffect"),
    presetClass: H(a, "presetClass", "entr"),
    presetId: H(a, "presetID", "0"),
    presetSubtype: H(a, "presetSubtype", "0"),
    filter: H(u, "filter", ""),
    transition: H(u, "transition", ""),
    duration: p,
    iterate: y,
    delay: Math.max(0, Number(t.delay) || 0),
    repeat: Number.isFinite(t.repeat) ? t.repeat : 1,
    repeatIndefinite: t.repeat === Number.POSITIVE_INFINITY,
    motion: A,
    path: v,
    tracks: b,
    ...w ? { transform: w } : {},
    ...C ? { mediaCmd: C } : {},
    ...S.length ? { audio: S } : {}
  };
}
function Dl(a) {
  const t = String(a || "").trim();
  if (!t) return null;
  const s = /^playFrom\(\s*([\d.]+)\s*\)$/i.exec(t);
  return s ? { raw: t, action: "playFrom", seconds: Number(s[1]) } : /^togglePause$/i.test(t) ? { raw: t, action: "togglePause" } : /^play$/i.test(t) ? { raw: t, action: "play" } : /^pause$/i.test(t) ? { raw: t, action: "pause" } : /^stop$/i.test(t) ? { raw: t, action: "stop" } : { raw: t, action: "unknown" };
}
const Tl = { ppt_x: 0, ppt_y: 0, ppt_w: 1, ppt_h: 1 };
function Bl(a, t) {
  const s = String(a ?? "").trim();
  if (!s) return 0;
  let n = 0, e = 1, r = 0, l = !1;
  for (; r < s.length; ) {
    const m = s[r];
    if (m === "+") {
      e = 1, r += 1;
      continue;
    }
    if (m === "-") {
      e = -1, r += 1;
      continue;
    }
    const c = s.slice(r), i = c.match(/^#?ppt_[xywh]/i);
    if (i) {
      let o = Tl[i[0].replace(/^#/, "").toLowerCase()];
      r += i[0].length;
      const x = s.slice(r).match(/^\s*\/\s*(\d*\.?\d+)/);
      if (x) {
        const f = Number(x[1]);
        if (!f) return null;
        o /= f, r += x[0].length;
      }
      n += e * o, e = 1, l = !0;
      continue;
    }
    const d = c.match(/^\d*\.?\d+/);
    if (d) {
      n += e * Number(d[0]), r += d[0].length, e = 1, l = !0;
      continue;
    }
    return Array.isArray(t) && t.push(s), null;
  }
  return l ? n : null;
}
const Pl = /* @__PURE__ */ new Set(["clickEffect", "withEffect", "afterEffect", "clickPar"]);
function Ol(a) {
  const t = ea(a, "stCondLst");
  if (!t) return null;
  let s = null;
  for (const n of $a(t)) {
    const e = H(n, "delay");
    if (e == null || e === "" || e === "indefinite") continue;
    const r = Number(e);
    Number.isFinite(r) && (s = (s || 0) + r);
  }
  return s;
}
function Nl(a) {
  const t = H(a, "repeatCount");
  if (t == null || t === "") return null;
  if (t === "indefinite") return Number.POSITIVE_INFINITY;
  const s = Math.round(Number(t) / 1e3);
  return !Number.isFinite(s) || s < 1 ? null : Math.min(s, 10);
}
function ql(a, t) {
  let s = !1, n = 0, e = !1;
  const r = (m) => {
    if (m.localName === "cTn") {
      const c = ea(m, "stCondLst");
      if (c) {
        e = !0;
        for (const i of $a(c)) {
          const d = H(i, "delay");
          if (d == null || d === "") continue;
          if (d === "indefinite") {
            s = !0;
            continue;
          }
          const o = Number(d);
          Number.isFinite(o) && (n += o);
        }
      }
      return;
    }
    for (const c of $a(m)) r(c);
  };
  if (r(a), s || !e) return { trigger: "click", delay: 0 };
  const l = new Set((t || []).map((m) => m.trigger));
  return l.has("withEffect") ? { trigger: "with", delay: n } : l.has("afterEffect") ? { trigger: "after", delay: n } : { trigger: "auto", delay: n };
}
function En(a, t, s, n = !1) {
  if (a.localName === "cTn") {
    const e = { ...t }, r = Ol(a);
    r !== null && !n && (e.delay = (t.delay || 0) + r);
    const l = Nl(a);
    if (l !== null && (e.repeat = l), Pl.has(H(a, "nodeType", ""))) {
      const m = Il(a, e);
      m && s.push(m);
      return;
    }
    for (const m of $a(a)) En(m, e, s);
    return;
  }
  for (const e of $a(a)) En(e, t, s, n);
}
function Zl(a, t = null) {
  const s = fa(a, "timing");
  if (!s) return { steps: [], stepMeta: [], initialHidden: [], targets: [] };
  const n = Ra(s, "cTn").find(
    (i) => H(i, "nodeType") === "mainSeq"
  );
  if (!n) return { steps: [], stepMeta: [], initialHidden: [], targets: [] };
  const e = ea(n, "childTnLst"), r = [], l = [];
  for (const i of $a(e)) {
    const d = [];
    En(i, { delay: 0, repeat: 1, relationships: t }, d, !0), d.length && (r.push(d), l.push(ql(i, d)));
  }
  const m = Array.from(new Set(
    r.flat().filter((i) => i.presetClass === "entr").map((i) => i.targetId)
  )), c = Array.from(
    new Map(
      r.flat().map((i) => [
        i.targetId,
        { targetId: i.targetId, spid: i.spid, textRange: i.textRange }
      ])
    ).values()
  );
  return { steps: r, stepMeta: l, initialHidden: m, targets: c };
}
function zl(a) {
  const t = (i) => {
    var d, o;
    return ((o = (d = i.text) == null ? void 0 : d.paragraphs) == null ? void 0 : o.flatMap((x) => x.runs || []).map((x) => x.text).join("").trim()) || "";
  }, s = a.find((i) => i.type === "shape" && i.preset === "roundRect" && i.x < 80 && i.y < 80 && /#de0000|#ff0000/i.test(i.fill || "") && !t(i));
  if (!s || a.flatMap((i) => i.type === "group" ? [i, ...i.elements || []] : [i]).some((i) => t(i) && i.x < 300 && i.y < 100)) return null;
  const e = ["课前复习", "课中探究", "课堂拓展", "知识闯关", "课堂小结", "总结提升", "课文初读", "课文赏析"], l = a.flatMap((i) => i.type === "group" ? [i, ...i.elements || []] : [i]).find((i) => {
    const d = t(i);
    return d && d.length <= 12 && e.some((o) => d.includes(o));
  });
  if (!(l != null && l.text)) return null;
  const m = t(l), c = e.find((i) => m.includes(i)) || m;
  return c ? { header: s, source: l, label: c, sourceText: m } : null;
}
function Hl(a, t) {
  const { header: s, source: n, label: e, sourceText: r } = t, l = {
    ...n.text,
    paragraphs: n.text.paragraphs.map((m) => ({
      ...m,
      runs: m.runs.map((c) => ({
        ...c,
        text: c.text.replace(r, e),
        style: { ...c.style, color: "#ffffff", bold: !0 }
      }))
    })),
    insetLeft: 0,
    insetRight: 0,
    insetTop: 0,
    insetBottom: 0,
    anchor: "ctr"
  };
  a.push({
    ...n,
    spid: `${s.spid || "header"}-text`,
    x: s.x,
    y: s.y,
    width: s.width,
    height: s.height,
    text: l,
    fill: "none",
    line: { color: "none", width: 0, dash: null, headEnd: null, tailEnd: null },
    sourceLevel: "slide",
    fallback: !1
  });
}
async function ve(a, t, s, n, e, r) {
  var T;
  if (!r || !r.diagnostics || !r.compat || !r.mediaBudget)
    throw new Error("parseSlide(...): env 必须包含 { diagnostics, compat, mediaBudget }");
  const l = await a.readXmlPart(t, !0, { transient: !0 }), m = await a.readXmlPart(Wt(t), !1, { transient: !0 }), c = m ? Gt(m, t, r) : /* @__PURE__ */ new Map(), i = await $l(a, c, r), d = await es(a, i.themePath), o = await ul(a, d), x = [], f = l.documentElement, y = H(f, "showMasterSp", "1") !== "0", u = (T = i.layoutDocument) == null ? void 0 : T.documentElement, p = H(u, "showMasterSp", "1") !== "0";
  y && p && i.masterDocument && x.push(
    ...await Zt(
      i.masterDocument,
      i.masterRelationships,
      a.zip,
      d,
      o,
      e,
      { skipPlaceholders: !0, sourceLevel: "master" },
      r
    )
  ), i.layoutDocument && x.push(
    ...await Zt(
      i.layoutDocument,
      i.layoutRelationships,
      a.zip,
      d,
      o,
      e,
      { skipPlaceholders: !0, sourceLevel: "layout" },
      r
    )
  ), x.push(
    ...await Zt(l, c, a.zip, d, o, e, {
      sourceLevel: "slide",
      placeholderLayoutDocument: i.layoutDocument,
      placeholderMasterDocument: i.masterDocument,
      slideSize: s
    }, r)
  );
  const A = zl(x);
  if (A) {
    const C = r.compat.synthesizeSectionHeader === !0;
    r.diagnostics.add({
      code: "legacy.section-header-synthesis",
      severity: "info",
      scope: { slide: n, spid: A.header.spid ?? null, part: t },
      message: `红色头部（${A.header.x},${A.header.y} ${A.header.width}×${A.header.height}）无文字，页内出现章节词「${A.label}」`,
      strategy: C ? "synthesized" : "skipped"
    }), C && Hl(x, A);
  }
  const w = Zl(l, c), b = Ll(x), L = Rl(l, c), v = new Set(
    w.steps.flat().flatMap((C) => (C.audio || []).map((S) => S.part))
  );
  for (const C of L)
    v.has(C.part) || r.diagnostics.add({
      code: "animation.audio-unbound",
      severity: "info",
      scope: { slide: n, part: C.part },
      message: `动画音效 ${C.name || C.part} 不在 mainSeq 点击步内（交互序列或顶层媒体节点），不会随步起播`
    });
  return {
    index: n,
    path: t,
    width: s.width,
    height: s.height,
    background: await jl(
      a.zip,
      l,
      d,
      c,
      i,
      { w: s.width, h: s.height },
      e
    ),
    elements: x,
    animation: w,
    media: b,
    animationAudio: L,
    fallbackCount: x.filter((C) => C.fallback).length
  };
}
function Ul(a) {
  let t = 0;
  const s = /* @__PURE__ */ new Set(), n = (e, r) => {
    if (!(r > 12 || e == null)) {
      if (typeof e == "string") {
        e.length > 64 && e.startsWith("data:") && (t += e.length);
        return;
      }
      if (typeof e == "object" && !s.has(e)) {
        if (s.add(e), Array.isArray(e)) {
          for (const l of e) n(l, r + 1);
          return;
        }
        for (const l of Object.keys(e)) n(e[l], r + 1);
      }
    }
  };
  return n(a, 0), t;
}
const gn = {
  synthesizeSectionHeader: !1
}, Le = 8 * 1024 * 1024, Re = 64 * 1024 * 1024, Wl = 64 * 1024 * 1024;
function Gl(a) {
  const t = { ...gn };
  if (a == null) return t;
  if (typeof a != "object")
    throw new Error("parsePptx(file, { compat }): compat 必须是对象");
  for (const [s, n] of Object.entries(a)) {
    if (!(s in gn))
      throw new Error(`未知兼容策略开关 compat.${s}（可用：${Object.keys(gn).join(" / ")}）`);
    if (typeof n != "boolean")
      throw new Error(`compat.${s} 必须是布尔值，收到 ${JSON.stringify(n)}`);
    t[s] = n;
  }
  return t;
}
const Xl = "\0\0", Vl = (() => {
  const a = new Uint32Array(256);
  for (let t = 0; t < 256; t += 1) {
    let s = t;
    for (let n = 0; n < 8; n += 1)
      s = s & 1 ? 3988292384 ^ s >>> 1 : s >>> 1;
    a[t] = s >>> 0;
  }
  return a;
})();
function bs(a) {
  let t = 4294967295;
  for (let s = 0; s < a.length; s += 1)
    t = Vl[(t ^ a[s]) & 255] ^ t >>> 8;
  return (t ^ 4294967295) >>> 0;
}
const Yl = /(\.xml|\.rels)$/;
async function Kl(a) {
  const t = [];
  for (const s of Object.keys(a.files)) {
    const n = a.files[s];
    if (!n || n.dir || s == null) continue;
    const e = n._data, r = e && e.compression && typeof e.compression.magic == "string" ? e.compression.magic : null;
    if (!(!(r === Xl) && !Yl.test(s))) {
      if (r === null) {
        const m = await a.file(s).async("uint8array");
        if (m.length > 0)
          throw new Error(
            `无法判定 ZIP 条目「${s}」的压缩方式，且它非空（${m.length} 字节）：无法确认该用哪种校验，继续解析可能读到坏数据。校验依赖 ZipObject._data.compression.magic，请确认 JSZip 版本为 3.x（本仓库 public/vendor/jszip.min.js 为 3.10.1）。`
          );
        continue;
      }
      if (typeof e.crc32 != "number")
        throw new Error(
          `无法读取 ZIP 条目「${s}」的 CRC32：JSZip 内部结构不符合预期。请确认 JSZip 版本为 3.x（本仓库 public/vendor/jszip.min.js 为 3.10.1）。`
        );
      t.push({ name: s, crc32: e.crc32 >>> 0 });
    }
  }
  for (const s of t) {
    const n = await a.file(s.name).async("uint8array");
    if (bs(n) >>> 0 !== s.crc32)
      throw new Error(`Corrupted zip : CRC32 mismatch (${s.name})`);
  }
  return t.length;
}
function vs(a, t, s) {
  const n = a.file(t), e = n && n._data;
  if (!e || typeof e.crc32 != "number")
    throw new Error(
      `无法读取 ZIP 条目「${t}」的 CRC32，无法确认读到的数据是否完好：请确认 JSZip 版本为 3.x（本仓库 public/vendor/jszip.min.js 为 3.10.1）。`
    );
  if (bs(s) >>> 0 !== e.crc32 >>> 0)
    throw new Error(`Corrupted zip : CRC32 mismatch (${t})`);
}
async function Ls(a, t = {}) {
  const s = dr(), n = Cr(), e = Gl(t.compat), l = { diagnostics: n, compat: e, mediaBudget: { totalBytes: 0 } }, m = await JSZip.loadAsync(await a.arrayBuffer(), {
    // ⚠️ R2「畸形 ZIP 不静默成功」：唯一的静默点是「STORED + CRC 失配」——
    // STORED 没有校验和，改坏了会静默读到坏数据再渲染坏图；坏 zip 头 / 空文件 /
    // DEFLATE 篡改 / 缺必要文件本就抛错（DEFLATE 自带 Adler-32）。
    // ⭐ R87：原来是 `checkCRC32: true` 让 JSZip 统一校验，但它为算 CRC 会把
    // **整个 zip 全解压一遍**（含全部图片字节）而结果随即丢弃 —— 194 MB 课件
    // `t_parse` 2651 ms，关掉后 129 ms（R86 CPU profile：inflate 48% + 搬运 27%）。
    // ⇒ 关掉全局校验，改由紧随其后的 `verifyOpenIntegrity` 校验「所有 STORED +
    // 所有结构文件」（合计仅 1.5 MB 量级），图片等大件留到读取时由 verifyPartCrc32
    // 校验（那时字节已经解压好了，零额外解压）。保护等价于原设计，打开快 9.7×。
    checkCRC32: !1,
    createFolders: !1
  });
  await Kl(m);
  const c = Sr(m, Pr, { maxBytes: t.partCacheMaxBytes }), i = "ppt/presentation.xml", d = await c.readXmlPart(i), o = await c.readXmlPart(Wt(i)), x = Gt(o, i, l), f = await es(c), y = qr(d), p = Ra(d, "sldId").map((v) => x.get(Ea(v, "id"))).filter(Boolean).map((v) => v.path);
  if (!p.length)
    throw new Error("没有在 PPTX 中找到幻灯片");
  const A = async (v) => {
    const T = m.file(v);
    return T ? T.async("uint8array") : null;
  };
  if (t.lazy) {
    const v = /* @__PURE__ */ new Map();
    let T = 0, C = 0;
    const S = Number.isFinite(t.slideCacheMaxBytes) ? Math.max(0, t.slideCacheMaxBytes) : Wl, q = () => {
      for (; T > S && v.size > 1; ) {
        const E = v.keys().next().value, I = v.get(E);
        v.delete(E), T -= I.bytes, C += 1;
      }
    }, R = p.map((E, I) => ({
      index: I,
      path: E,
      width: y.width,
      height: y.height
    })), k = (E) => {
      if (E < 0 || E >= p.length)
        return Promise.reject(new Error(`getSlide(${E}) 越界：共 ${p.length} 页`));
      const I = v.get(E);
      if (I)
        return v.delete(E), v.set(E, I), I.promise;
      const U = { promise: null, bytes: 0 };
      return U.promise = ve(c, p[E], y, E, s, l).then((D) => (U.bytes = Ul(D), T += U.bytes, v.delete(E), v.set(E, U), q(), D)), v.set(E, U), U.promise;
    }, g = () => {
      v.clear(), T = 0, c.dispose();
    }, P = () => ({
      partCache: c.stats(),
      slides: v.size,
      slideBytes: T,
      slideEvictions: C,
      slideCacheMaxBytes: S
    });
    return {
      size: y,
      theme: f,
      slides: R,
      slideCount: p.length,
      getSlide: k,
      readPart: A,
      defs: s,
      diagnostics: n,
      compat: e,
      dispose: g,
      resourceStats: P
    };
  }
  const w = [];
  for (let v = 0; v < p.length; v += 1)
    Rm("busy", `正在解析第 ${v + 1}/${p.length} 页`), w.push(await ve(c, p[v], y, v, s, l)), await Jl();
  return { size: y, theme: f, slides: w, readPart: A, defs: s, diagnostics: n, compat: e, dispose: () => c.dispose(), resourceStats: () => ({ partCache: c.stats() }) };
}
let Qt = null;
function Ql(a) {
  if (typeof a != "function")
    throw new Error("configureYield(fn): fn 必须是 () => Promise");
  Qt = a;
}
function Lc() {
  Qt = null;
}
function Jl() {
  return Qt ? Qt() : typeof requestAnimationFrame == "function" ? new Promise((a) => requestAnimationFrame(a)) : Promise.resolve();
}
let Za = null, Jt = null;
function am(a) {
  if (typeof a != "function")
    throw new Error("configureMeasureContext(factory): factory 必须是 () => CanvasRenderingContext2D");
  Jt = a, Za = null;
}
function Rc() {
  Jt = null, Za = null;
}
function Rs() {
  if (!Za) {
    if (Jt) {
      if (Za = Jt(), !Za || typeof Za.measureText != "function")
        throw new Error("configureMeasureContext(factory): factory 必须返回带 measureText 的 2d context");
      return Za;
    }
    if (typeof document > "u")
      throw new Error(
        "ppt-sdk：当前环境没有 document 且未 configureMeasureContext() —— 文本度量无从进行，请注入度量端口（Worker 可用 OffscreenCanvas）"
      );
    cs(), Za = document.createElement("canvas").getContext("2d");
  }
  return Za;
}
function Ma(a) {
  return String(a).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}
function tm(a) {
  Rs().font = `${a.italic ? "italic " : ""}${a.bold ? "700 " : "400 "}${a.fontSize}px ${a.fontFamily}`;
}
function Ms(a, t) {
  tm(t);
  const s = Array.from(a);
  return Rs().measureText(a).width + Math.max(0, s.length - 1) * (t.letterSpacing || 0);
}
const Me = 0.125 / 0.75;
function Sa(a, t) {
  const s = Ms(a, t);
  return Math.round(s / Me) * Me;
}
function $e(a, t) {
  const s = Array.from(a);
  let n = 0;
  for (let e = 0; e < s.length; e += 1)
    n += Sa(s[e], t) + (t.letterSpacing || 0);
  return n;
}
const nm = ba(Qe);
function je(a, t, s = nm) {
  for (const n of a || [])
    if (n.pos > t) return n.pos;
  return (Math.floor(t / s) + 1) * s;
}
const em = /[，。、．：；？！）］｝〉》」』】”’…～·%℃,.\uFF0E\uFF5E\)\]}]/, sm = /[（［｛〈《「『【“‘(\[]/, rm = 0.75, lm = /[\u201C\u2018]/, mm = /\u2026/u;
function $s(a, t, s = {}) {
  const n = (R = o.length === 0) => {
    const k = R && Number.isFinite(s.firstLineMaxWidth) ? s.firstLineMaxWidth : t;
    return Math.max(1, k);
  }, e = s.wrap !== !1, r = s.latinLineBreak === !0, l = s.hangingPunct !== !1, m = em, c = sm, i = /[\x21-\x7E]/;
  let d = !0;
  const o = [];
  let x = [], f = 0, y = 0;
  const u = s.leadSpacesFolded !== !1;
  let p = [], A = 0, w = null;
  const b = () => {
    f = x.reduce((R, k) => R + k.width, 0);
  }, L = (R, k, g = {}) => {
    const P = Sa(R, k), E = x[x.length - 1];
    if (!g.forceNew && E && E.style === k)
      E.text += R, E.width += P + (k.letterSpacing || 0);
    else {
      const I = { text: R, style: k, width: P + (k.letterSpacing || 0) };
      g.startX != null && (I.x = g.startX), x.push(I);
    }
    b();
  }, v = () => {
    const R = x[x.length - 1];
    if (!R) return null;
    const k = Array.from(R.text);
    if (!k.length) return null;
    const g = k.pop(), P = Sa(g, R.style), E = k.length === 0;
    return R.width -= P + (R.style.letterSpacing || 0), R.text = k.join(""), E && x.pop(), b(), { character: g, style: R.style };
  }, T = () => x.reduce(
    (R, k) => R + Array.from(k.text).length,
    0
  ), C = () => {
    var k, g;
    const R = [];
    for (; x.length; ) {
      const P = x[x.length - 1], E = P.text.replace(/\s+$/u, "");
      if (E === P.text) break;
      const I = P.text.slice(E.length), U = P.width - $e(E, P.style);
      R.unshift({
        text: I,
        style: P.style,
        width: U,
        decorated: !!((k = P.style) != null && k.underline || (g = P.style) != null && g.strikeout),
        // 制表符段落：整段都是空白（`\t` 后跟带下划线的空格）时，`last.x` 是 tab 落点
        // 相对 textX 的偏移。留档时必须带上，否则下划线会从「可见文本右端」画起、
        // 丢掉 tab 跳过的距离（real-5 s6 段#1 就是它：本应 +480，实际丢成 0）。
        // 只整段空白时带：部分裁剪（trimmed 非空）时 .x 属于留在 segments 里的可见前缀。
        x: E ? void 0 : P.x
      }), P.width = $e(E, P.style), P.text = E, P.text || x.pop();
    }
    return b(), R;
  }, S = () => {
    const R = C();
    o.push({
      segments: x,
      width: f + y,
      leadingWidth: y,
      // ⭐ R47：绝大多数行为 null，别给每个段落挂一个空数组。
      leadingSpaces: p.length ? p : null,
      // 整行都没装饰就把留档丢掉，别给绝大多数段落挂一个空数组。
      trailingSpaces: R.some((k) => k.decorated) ? R : null,
      hungPunctAdvance: A
    }), A = 0, x = [], f = 0, y = 0, p = [], w = null;
  }, q = [];
  for (const R of a) {
    const k = R.style, g = k != null && k.quoteFontFamily ? { ...k, fontFamily: k.quoteFontFamily } : null, P = k != null && k.enclosedFontFamily ? { ...k, fontFamily: k.enclosedFontFamily } : null, E = k && we.test(R.text) && ms.test(k.fontFamily || "") ? { ...k, fontFamily: al(k.fontFamily) } : null;
    for (const I of Array.from(R.text))
      q.push({
        character: I,
        style: g && Qr.test(I) ? g : P && Jr.test(I) ? P : E && we.test(I) ? E : k
      });
  }
  for (let R = 0; R < q.length; R += 1) {
    const { character: k, style: g } = q[R];
    if (k === `
`) {
      S();
      continue;
    }
    if (k === "	" && s.tabs) {
      const ma = o.length === 0 && s.firstLineIndent || 0, h = ma + y + (w ?? f);
      let W = 0;
      for (let M = R + 1; M < q.length; M += 1) {
        const $ = q[M];
        if ($.character === "	" || $.character === `
`) break;
        W += Sa($.character, $.style) + ($.style.letterSpacing || 0);
      }
      let Z = je(s.tabs, h), j = Z - ma;
      j + W > n() && x.length && (S(), o[o.length - 1].tabEnded = !0, Z = je(s.tabs, 0), j = Z), w = j - y;
      continue;
    }
    if (!x.length && /\s/u.test(k)) {
      const ma = Sa(k, g) + (g.letterSpacing || 0);
      y += ma, !u && k === " " && p.push({ advance: ma, fontSize: g.fontSize || 0 });
      continue;
    }
    const E = Sa(k, g) + (g.letterSpacing || 0), I = x.length ? x[x.length - 1].text.slice(-1) : "", U = i.test(k), D = i.test(I), N = R + 1 < q.length && i.test(q[R + 1].character), B = lm.test(I) && U && !D;
    if (e && x.length && U && !D && N) {
      let ma = 0;
      for (let W = R; W < q.length; W += 1) {
        const Z = q[W];
        if (!i.test(Z.character)) break;
        ma += Sa(Z.character, Z.style) + (Z.style.letterSpacing || 0);
      }
      const h = n();
      if (d = ma <= h, y + f + ma > h) {
        let W = !1;
        if (B && T() > 1) {
          const Z = x[x.length - 1].style, j = Sa(I, Z) + (Z.letterSpacing || 0);
          if (ma + j <= h) {
            const M = v();
            M && (S(), L(M.character, M.style), W = !0);
          }
        }
        W || S();
      }
    }
    let _ = E;
    if (e && x.length && /\s/u.test(k) && (g.underline || g.strikeout)) {
      let ma = 0;
      for (let h = R; h < q.length && /\s/u.test(q[h].character); h += 1)
        ma += Sa(q[h].character, q[h].style);
      ma > 0 && (_ = ma);
    }
    const J = x.length && y + f + _ > n(), Q = d && !(J && d), pa = U && D && !r && Q, Aa = m.test(k) && !mm.test(k), xa = c.test(I), wa = x.length ? x[x.length - 1] : null, V = xa && wa ? Sa(I, wa.style) + (wa.style.letterSpacing || 0) >= rm * (wa.style.fontSize || g.fontSize || 0) : !1, K = U && D && !Q, ya = (Aa || xa) && !K;
    if (e && J && !pa)
      if (l) {
        if (xa && !K && V) {
          if (T() > 1) {
            const ma = v();
            if (ma) {
              S(), L(ma.character, ma.style), L(k, g);
              continue;
            }
          }
        } else if ((!ya || xa && !V) && (S(), /\s/u.test(k)))
          continue;
      } else {
        if (ya && T() > 1) {
          const ma = v();
          if (ma) {
            S(), L(ma.character, ma.style), L(k, g);
            continue;
          }
        }
        if (!ya && (S(), /\s/u.test(k)))
          continue;
      }
    w != null ? (A = 0, L(k, g, { forceNew: !0, startX: w }), w = null) : (A = J && l && Aa && !K ? E : 0, L(k, g));
  }
  return (x.length || !o.length) && S(), o;
}
const cm = new Map(Object.entries({
  "arial|r": [0.073242, 0.105957],
  "arial|b": [0.10498, 0.105957],
  "arial unicode ms|r": [0.049805, 0.100098],
  "calibri|r": [0.06543, 0.113281],
  "calibri|b": [0.06543, 0.113281],
  "courier new|r": [0.041016, 0.23291],
  "courier new|b": [0.100098, 0.23291],
  "dengxian|r": [0.049805, 0.178223],
  // 等线
  "dengxian|b": [0.058105, 0.203613],
  "fangsong|r": [0.046875, 0.085938],
  // 仿宋
  "georgia|r": [0.046875, 0.089355],
  "georgia|b": [0.058594, 0.088379],
  "heiti sc|r": [0.02, 0.133],
  "heiti sc|b": [0.02, 0.133],
  "helvetica|r": [0.049316, 0.075684],
  "helvetica|b": [0.049316, 0.075684],
  "hiragino sans gb|r": [0.05, 0.075],
  "hiragino sans gb|b": [0.05, 0.075],
  "kaiti|r": [0.046875, 0.085938],
  // 楷体
  "microsoft yahei|r": [0.062988, 0.086914],
  "microsoft yahei|b": [0.062988, 0.19873],
  "nsimsun|r": [0.046875, 0.085938],
  "simhei|r": [0.046875, 0.085938],
  // 黑体（无独立粗体面，合成加粗不改 post）
  "simsun|r": [0.046875, 0.085938],
  // 宋体
  "songti sc|b": [0.02, 0.133],
  "songti sc|r": [0.02, 0.133],
  "sthupo|r": [0.02, 0.133],
  // 华文琥珀
  "stliti|r": [0.02, 0.133],
  // 华文隶书
  "stxingkai|r": [0.02, 0.133],
  // 华文行楷
  "stxinwei|r": [0.02, 0.133],
  // 华文新魏
  "stzhongsong|r": [0.02, 0.133],
  // 华文中宋
  "tahoma|r": [0.063477, 0.083008],
  "tahoma|b": [0.098145, 0.070312],
  "times new roman|r": [0.048828, 0.108887],
  "times new roman|b": [0.095215, 0.108887],
  "trebuchet ms|r": [0.062012, 0.127441],
  "trebuchet ms|b": [0.097656, 0.127441],
  "verdana|r": [0.058594, 0.087891],
  "verdana|b": [0.103027, 0.067871]
}));
function ke(a) {
  return String(a || "").split(",").map((t) => t.trim().replace(/^["']|["']$/g, "").toLowerCase()).filter(Boolean);
}
function im(a) {
  const t = [
    ...ke(a == null ? void 0 : a.underlineFamily),
    ...ke(a == null ? void 0 : a.fontFamily)
  ];
  for (const s of t)
    for (const n of [`${s}|${a != null && a.bold ? "b" : "r"}`, `${s}|r`]) {
      const e = cm.get(n);
      if (e) return e;
    }
  return null;
}
const Pt = (a) => Number(Number(a).toFixed(3)), In = 0.75, Ce = 1 / In;
function js(a, t, s, n, e, r, l, m) {
  var x, f;
  const c = [];
  let i = s;
  for (let y = 0; y < a.segments.length; y += 1) {
    const u = a.segments[y], p = t[y], A = Array.from(u.text), w = r && r[y], b = w && w.length ? w[0] : i;
    let L;
    if (w && w.length) {
      const v = r[y + 1];
      L = v && v.length ? v[0] : w[w.length - 1] + Sa(A[A.length - 1] || " ", p) + (p.letterSpacing || 0);
    } else {
      const v = ((x = u.text.match(/\s/gu)) == null ? void 0 : x.length) || 0;
      L = b + u.width + l * v;
    }
    i = L, c.push({ x0: b, x1: L, style: p });
  }
  for (const y of a.trailingSpaces || []) {
    const u = y.x != null ? s + y.x : i, p = ((f = y.text.match(/\s/gu)) == null ? void 0 : f.length) || 0, A = u + y.width + l * p;
    i = A, y.decorated && c.push({ x0: u, x1: A, style: y.style });
  }
  const d = c.filter((y) => {
    var u;
    return (u = y.style) == null ? void 0 : u.underline;
  });
  if (!d.length) return { handled: !0, rects: "" };
  if (m) return { handled: !1, rects: "" };
  const o = [];
  for (const y of d) {
    const u = im(y.style);
    if (!u) return { handled: !1, rects: "" };
    const p = y.style.fontSize * In, A = Math.max(1, Math.round(u[0] * p)) * Ce, w = Math.round(u[1] * p), b = Math.round((n - e) * In + w), L = e + b * Ce;
    o.push(
      `<rect x="${Pt(y.x0)}" y="${Pt(L)}" width="${Pt(Math.max(0, y.x1 - y.x0))}" height="${Pt(A)}" fill="${Ma(y.style.color)}"/>`
    );
  }
  return { handled: !0, rects: o.join("") };
}
function qn(a, t = !1) {
  const s = [
    a.underline && !t ? "underline" : "",
    a.strikeout ? "line-through" : ""
  ].filter(Boolean).join(" "), n = a.outline ? ` stroke="${Ma(a.outline.color)}" stroke-width="${a.outline.width}" stroke-linejoin="round"` : "", e = a.kerningDisabled ? ' style="font-kerning:none"' : "";
  return `font-family="${Ma(a.fontFamily)}" font-size="${a.fontSize}" font-weight="${a.bold ? 700 : 400}" font-style="${a.italic ? "italic" : "normal"}" text-decoration="${s || "none"}" letter-spacing="${a.letterSpacing || 0}" fill="${Ma(a.color)}"${n}${e}`;
}
let zt = !0;
const om = /* @__PURE__ */ new Set(["http:", "https:", "mailto:", "tel:"]);
function fm(a) {
  if (!a) return !1;
  const t = a.trim();
  if (!t) return !1;
  if (t.startsWith("#") || t.startsWith("/") || t.startsWith("./") || t.startsWith("../"))
    return !0;
  const s = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return s ? om.has(s[1].toLowerCase() + ":") : !0;
}
function ks(a, t = a.style, s = null, n = !1, e = null) {
  let r = "";
  s && Array.from(a.text).length === s.length && (r = ` x="${s.map((i) => Number(i.toFixed(3))).join(" ")}"`);
  const l = e == null ? "" : ` y="${Number(e.toFixed(3))}"`, m = `<tspan${r}${l} ${qn(t, n)}>${Ma(a.text)}</tspan>`;
  if (!t.hyperlink || !zt) return m;
  const c = Ma(t.hyperlink);
  return fm(t.hyperlink) ? `<a href="${c}" xlink:href="${c}" target="_blank" rel="noopener noreferrer" style="cursor:pointer">${m}</a>` : m;
}
const dm = /[\u1100-\u11ff\u2e80-\u303f\u3040-\u30ff\u3100-\u312f\u3130-\u318f\u31c0-\u31ef\u3400-\u4dbf\u4e00-\u9fff\ua960-\ua97f\uac00-\ud7af\uf900-\ufaff\ufe10-\ufe19\ufe30-\ufe4f\uff00-\uff60\uffe0-\uffe6]/u;
function xm(a, t, s, n = 0) {
  const e = [];
  for (const A of a.segments) {
    const w = A.style, b = w.letterSpacing || 0;
    for (const L of Array.from(A.text))
      e.push({
        ch: L,
        // 用 Office 量化后的 advance：两端对齐要分摊的是
        // 「可用宽 − Office 眼里的自然宽」，Office 的自然宽就是量化后的字形宽
        // （见 measureOfficeGlyph 的说明与全量校验脚本）。用未量化的自然宽
        // 会让 δ 与 Office 有偏差，行内每个字的位置都会跟着飘。
        advance: Sa(L, w) + b,
        fontSize: w.fontSize || 0,
        wide: dm.test(L)
      });
  }
  if (e.length < 2) return null;
  const r = (a.leadingSpaces || []).map((A) => ({
    ch: " ",
    advance: A.advance,
    fontSize: A.fontSize,
    wide: !1
  })), l = r.length, m = r.reduce((A, w) => A + w.advance, 0);
  l && e.unshift(...r);
  const c = [];
  for (let A = 0; A < e.length - 1; A++)
    (e[A].wide || e[A + 1].wide) && c.push(A);
  if (!c.length) return null;
  const i = e.reduce((A, w) => A + w.advance, 0);
  let d = s + m - i + n;
  if (!(d > 0)) return null;
  const o = [];
  for (let A = 0; A < e.length - 1; A++)
    e[A].ch === " " && o.push(A);
  const x = new Array(e.length).fill(0);
  if (o.length) {
    const A = (b) => Math.max(0, 0.5 * e[b].fontSize - e[b].advance), w = o.slice().sort((b, L) => A(b) - A(L));
    for (let b = 0; b < w.length; b += 1) {
      const L = w[b], v = A(L), T = d / (w.length - b);
      if (T <= v) {
        for (let C = b; C < w.length; C += 1) x[w[C]] += T;
        d = 0;
        break;
      }
      x[L] += v, d -= v;
    }
  }
  if (d > 0) {
    const A = new Set(c);
    for (const b of o) A.add(b);
    const w = d / A.size;
    for (const b of A) x[b] += w;
  }
  const f = new Array(e.length).fill(0);
  f[0] = t - m;
  let y = f[0];
  for (let A = 0; A < e.length - 1; A++)
    y += e[A].advance + x[A], f[A + 1] = y;
  const u = [];
  let p = l;
  for (const A of a.segments) {
    const w = Array.from(A.text).length;
    u.push(f.slice(p, p + w)), p += w;
  }
  return u;
}
function Cs(a, t, s, n) {
  if (!((t.align === "dist" || t.align === "thaiDist" || t.align === "just") && !a.lastLine && !a.tabEnded)) return { attrs: "", perSegmentX: null, wordSpacing: 0 };
  let r = 0;
  t.hangingPunct !== !1 && a.hungPunctAdvance > 0 && a.width > n - s && (r = a.hungPunctAdvance);
  const l = Math.max(1, n - s);
  if (t.align === "just") {
    const m = xm(a, s, l, r);
    if (m) return { attrs: "", perSegmentX: m, wordSpacing: 0 };
    const c = a.segments.reduce(
      (i, d) => {
        var o;
        return i + (((o = d.text.match(/\s/gu)) == null ? void 0 : o.length) || 0);
      },
      0
    );
    if (c > 0) {
      const i = Math.max(0, l + r - a.width) / c;
      return { attrs: ` word-spacing="${i}"`, perSegmentX: null, wordSpacing: i };
    }
  }
  return { attrs: ` textLength="${l + r}" lengthAdjust="spacing"`, perSegmentX: null, wordSpacing: 0 };
}
function _s(a, t, s) {
  let n = s;
  return a.segments.forEach((e, r) => {
    if (e.x == null) return;
    n || (n = new Array(a.segments.length).fill(null));
    const l = [];
    let m = t + e.x;
    for (const c of Array.from(e.text))
      l.push(m), m += Sa(c, e.style) + (e.style.letterSpacing || 0);
    n[r] = l;
  }), n;
}
function Ss(a, t) {
  const s = a.segments.length ? a.segments.map((n) => n.style) : t.runs.map((n) => n.style);
  return Math.max(1, ...s.map((n) => (n == null ? void 0 : n.fontSize) || 1));
}
const ym = new Map(Object.entries({
  stxingkai: 1.091,
  // 华文行楷
  sthupo: 1.033,
  // 华文琥珀
  stliti: 1.059,
  // 华文隶书
  stxinwei: 1.036,
  // 华文新魏
  stzhongs: 1.325,
  // 华文中宋
  malgun: 1.0625
  // 맑은 고딕
}));
function hm(a) {
  for (const t of String((a == null ? void 0 : a.fontFamily) || "").split(",")) {
    const s = t.trim().replace(/^["']|["']$/g, "").toLowerCase(), n = ym.get(s);
    if (n) return n;
  }
  return 1;
}
const pm = [
  [4352, 4447],
  [11904, 42191],
  [43360, 43391],
  [44032, 55203],
  [63744, 64255],
  [65040, 65049],
  [65072, 65135],
  [65280, 65376],
  [65504, 65510],
  [127488, 127743],
  [131072, 262141]
];
function um(a) {
  const t = a.codePointAt(0);
  return pm.some(([s, n]) => t >= s && t <= n);
}
function gm(a, t) {
  const s = ((t == null ? void 0 : t.fontSize) || 0) * hm(t);
  return um(a) ? s : Math.min(s, Sa(a, t));
}
function wm(a) {
  const t = a.text, s = a.x + t.insetLeft, n = a.x + a.width - t.insetRight, e = a.y + t.insetTop, r = a.y + a.height - t.insetBottom, l = Math.max(1, r - e), m = t.paragraphs.flatMap((f) => {
    const y = [];
    f.bullet && y.push({ character: f.bullet, style: f.runs[0].style });
    for (const b of f.runs)
      for (const L of Array.from(b.text))
        y.push({ character: L, style: b.style, lineBreak: L === `
` });
    const u = [];
    let p = [], A = 0;
    const w = () => {
      p.length && (u.push({
        paragraph: f,
        units: p,
        width: Math.max(1, ...p.map((b) => b.style.fontSize)),
        extent: A
      }), p = [], A = 0);
    };
    for (const b of y) {
      if (b.lineBreak) {
        w();
        continue;
      }
      const L = gm(b.character, b.style), v = p.length && p.at(-1).style.letterSpacing || 0;
      p.length && A + v + L / 2 > l && w(), A += (p.length && p.at(-1).style.letterSpacing || 0) + L, p.push({ ...b, advance: L });
    }
    return w(), u.forEach((b, L) => {
      b.lastColumn = L === u.length - 1, b.pitch = Nn(b.width, f.lineSpacing);
    }), u;
  }), c = m.reduce((f, y, u) => f + (u < m.length - 1 ? y.pitch : y.width), 0);
  let i = n;
  t.anchor === "ctr" && (i = s + (Math.max(1, n - s) + c) / 2), t.anchor === "b" && (i = s + c);
  const d = t.vertical === "vert270", o = d ? [...m].reverse() : m, x = [];
  for (const f of o) {
    const y = i - f.width / 2;
    let u = e + f.paragraph.spaceBefore;
    const p = Math.max(0, l - f.extent - f.paragraph.spaceBefore - f.paragraph.spaceAfter);
    f.paragraph.align === "ctr" && (u += p / 2), f.paragraph.align === "r" && (u += p);
    for (const A of f.units) {
      const w = u + A.style.fontSize / 2;
      x.push(
        `<text xml:space="preserve" x="${y}" y="${w}" text-anchor="middle" dominant-baseline="central" ${qn(A.style)}>${Ma(A.character)}</text>`
      ), u += A.advance + (A.style.letterSpacing || 0);
    }
    i += (d ? 1 : -1) * f.pitch;
  }
  return x.join("");
}
function Am(a, t) {
  const s = a.segments.length ? a.segments.map((e) => e.style) : t.runs.map((e) => e.style);
  let n = 0;
  for (const e of s) {
    const r = (e == null ? void 0 : e.fontSize) || a.maxFontSize;
    n = Math.max(n, r * Sn(e == null ? void 0 : e.fontFamily)[1]);
  }
  return n || a.maxFontSize * Sn(null)[1];
}
function bm(a, t) {
  if (!a.text) return "";
  const s = a.text;
  if (s.vertical && s.vertical !== "horz") return wm(a);
  const n = Math.max(1, a.height - s.insetTop - s.insetBottom), e = [];
  let r = 0;
  s.paragraphs.forEach((f, y) => {
    const u = a.x + s.insetLeft + f.marginLeft, p = a.x + a.width - s.insetRight, A = Math.max(1, a.width - f.marginLeft), w = u + (f.bullet ? 0 : f.indent);
    typeof window < "u" && window.__pptSdkTraceWidth && (window.__pptSdkTraceWidthLog || (window.__pptSdkTraceWidthLog = [])).push({
      elemX: a.x,
      elemW: a.width,
      insetLeft: s.insetLeft,
      insetRight: s.insetRight,
      marginLeft: f.marginLeft,
      indent: f.indent,
      startX: u,
      rightX: p,
      maxWidth: A,
      firstLineMaxWidth: Math.max(1, p - w),
      text: f.runs.map((S) => S.text).join("").slice(0, 28)
    });
    const b = f.runs.map((S) => S.text).join(""), L = a.width > 400 && b.length <= 30 && /[：:]/u.test(b) && (b.match(/[\\u3400-\\u9fff]/gu) || []).length <= 10, v = $s(f.runs, A, {
      wrap: L ? !1 : s.wrap,
      latinLineBreak: f.latinLineBreak,
      eastAsianLineBreak: f.eastAsianLineBreak,
      hangingPunct: f.hangingPunct,
      firstLineMaxWidth: Math.max(1, A - (f.bullet ? 0 : f.indent)),
      tabs: f.tabs,
      firstLineIndent: f.bullet ? 0 : f.indent,
      // ⭐ R47：行首半角空格「折进缩进」还是「当真字形排入」，取决于段落**自身**
      // 有没有声明 `indent` —— 见 wrapStyledRuns 里的判据与 r52-real410312/REPORT.md §#106。
      leadSpacesFolded: f.indentDeclared === !0
    }).map((S, q, R) => {
      const k = Ss(S, f), g = Nn(k, f.lineSpacing);
      return {
        ...S,
        firstLine: q === 0,
        lastLine: q === R.length - 1,
        maxFontSize: k,
        height: g
      };
    }), T = y === 0 ? 0 : f.spaceBefore, C = f.spaceBefore + v.reduce((S, q) => S + q.height, 0) + f.spaceAfter;
    e.push({ paragraph: f, paragraphIndex: y, rows: v, startX: u, rightX: p, height: C, advanceBefore: T }), r += C;
  });
  const l = [...e].reverse().find((f) => f.rows.length);
  let m = r;
  if (l) {
    const f = l.rows[l.rows.length - 1], y = os(l.paragraph.lineSpacing);
    y !== null && y > 1 && (m -= f.height - (0.9 * y * f.maxFontSize + Am(f, l.paragraph)));
  }
  const c = s.autoFit === "shape" ? 0 : n - m;
  let i = a.y + s.insetTop;
  s.anchor === "ctr" && (i += c / 2), s.anchor === "b" && (i += c);
  const d = i, o = [];
  let x = 0;
  for (const f of e) {
    const { paragraph: y, paragraphIndex: u, rows: p, startX: A, rightX: w, advanceBefore: b } = f, L = [];
    i += b;
    for (const v of p) {
      const T = i + xl(v, y), C = A + (v.firstLine && !y.bullet ? y.indent : 0);
      let S = C;
      if (y.align === "ctr") {
        const q = x + (w - C - v.width) / 2;
        S = C + q, q < x && (x = q);
      }
      if (y.align === "r" && (S = w - v.width), v.firstLine && y.bullet) {
        const q = y.runs[0].style, R = A + y.indent;
        L.push(
          `<text xml:space="preserve" x="${R}" y="${T}" ${qn(q)}>${Ma(y.bullet)}</text>`
        );
      }
      {
        const q = S + v.leadingWidth, R = Cs(
          v,
          y,
          C + v.leadingWidth,
          w
        ), k = _s(v, q, R.perSegmentX), g = v.segments.map((N) => N.style), P = js(
          v,
          g,
          q,
          T,
          d,
          k,
          R.wordSpacing,
          /textLength/.test(R.attrs)
        );
        let E = 0;
        const I = v.segments.map((N, B) => {
          var aa;
          const _ = ((aa = N.style) == null ? void 0 : aa.baselineShift) || 0, J = _ === E ? null : T + _;
          return E = _, ks(
            N,
            void 0,
            (k == null ? void 0 : k[B]) || null,
            P.handled,
            J
          );
        }).join(""), U = `<text xml:space="preserve" x="${q}" y="${T}"${R.attrs}>${I}</text>`;
        L.push(`${P.rects}${U}`);
        const D = g.find((N) => N == null ? void 0 : N.reflection);
        if (D) {
          const N = D.reflection, B = N.lengthEm * D.fontSize, _ = N.blurPx, J = {
            x: q - _ * 3 - 2,
            y: T - _ * 3 - 2,
            width: v.width + _ * 6 + 4,
            height: B + _ * 6 + 4
          }, aa = Ar(t, N, D.fontSize, T, J), Q = `<text transform="translate(0 ${(2 * T).toFixed(3)}) scale(1 -1)" xml:space="preserve" x="${q}" y="${T}"${R.attrs}>${I}</text>`;
          L.push(
            `<g mask="url(#${aa})" filter="url(#reflBlur-${aa})">${Q}</g>`
          );
        }
      }
      i += v.height;
    }
    i += y.spaceAfter, o.push(`<g data-text-paragraph="${u}">${L.join("")}</g>`);
  }
  return o.join("");
}
function Fs(a, t, s = 0) {
  if (!a.text) return null;
  const n = a.text, e = { left: a.marL, right: a.marR, top: a.marT, bottom: a.marB }, r = [];
  let l = 0;
  for (const c of n.paragraphs) {
    const i = s + e.left + c.marL, d = s + t - e.right, o = Math.max(1, d - i), x = i + (c.bullet ? 0 : c.indent), f = $s(c.runs, o, {
      wrap: n.wrap,
      latinLineBreak: c.latinLineBreak,
      eastAsianLineBreak: c.eastAsianLineBreak,
      hangingPunct: c.hangingPunct,
      firstLineMaxWidth: Math.max(1, d - x),
      tabs: c.tabs,
      firstLineIndent: c.bullet ? 0 : c.indent,
      // ⭐ R47：同上（表格 cell 走同一判据）。
      leadSpacesFolded: c.indentDeclared === !0
    }).map((y, u, p) => {
      const A = Ss(y, c), w = Nn(A, c.lineSpacing);
      let b = 0;
      const L = y.segments.length ? y.segments.map((S) => S.style) : c.runs.map((S) => S.style);
      for (const S of L) {
        const q = (S == null ? void 0 : S.fontSize) || A;
        b = Math.max(b, q * Kt(S == null ? void 0 : S.fontFamily));
      }
      b || (b = A * Kt(null));
      const v = os(c.lineSpacing), T = v === null ? w : v > 1 ? 0.9 * v * A + b : Math.max(w, 0.9 * v * A + b), C = T - b;
      return {
        ...y,
        firstLine: u === 0,
        lastLine: u === p.length - 1,
        maxFontSize: A,
        baseline: C,
        endHeight: T,
        height: w
      };
    });
    r.push({ paragraph: c, rows: f, startX: i, rightX: d, height: 0 });
  }
  const m = [...r].reverse().find((c) => c.rows.length);
  m && (m.rows[m.rows.length - 1].height = m.rows[m.rows.length - 1].endHeight);
  for (const c of r)
    c.height = c.paragraph.spaceBefore + c.rows.reduce((i, d) => i + d.height, 0) + c.paragraph.spaceAfter, l += c.height;
  return { text: n, cellPadding: e, layouts: r, totalHeight: l };
}
function vm(a, t, s, n, e) {
  const r = Fs(a, n, t);
  if (!r) return "";
  const { text: l, cellPadding: m, layouts: c, totalHeight: i } = r, d = Math.max(1, e - m.top - m.bottom), o = a.anchor || l.anchor || "t";
  let x = s + m.top;
  o === "ctr" && (x += Math.max(0, (d - i) / 2)), o === "b" && (x += Math.max(0, d - i));
  const f = x, y = [];
  let u = 0;
  for (const p of c) {
    const { paragraph: A, rows: w, startX: b, rightX: L } = p;
    x += A.spaceBefore;
    for (const v of w) {
      const T = x + v.baseline, C = b + (v.firstLine && !A.bullet ? A.indent : 0);
      let S = C;
      if (A.align === "ctr") {
        const D = u + (L - C - v.width) / 2;
        S = C + D, D < u && (u = D);
      }
      A.align === "r" && (S = L - v.width);
      const q = a.styleOverride, R = Cs(
        v,
        A,
        C + v.leadingWidth,
        L
      ), k = v.segments.map((D) => q ? { ...D.style, color: q.color || D.style.color, bold: q.bold || D.style.bold } : D.style), g = S + v.leadingWidth, P = _s(v, g, R.perSegmentX), E = js(
        v,
        k,
        g,
        T,
        f,
        P,
        R.wordSpacing,
        /textLength/.test(R.attrs)
      );
      let I = 0;
      const U = v.segments.map((D, N) => {
        var J;
        const B = ((J = D.style || k[N]) == null ? void 0 : J.baselineShift) || 0, _ = B === I ? null : T + B;
        return I = B, ks(
          D,
          k[N],
          (P == null ? void 0 : P[N]) || null,
          E.handled,
          _
        );
      }).join("");
      y.push(`${E.rects}<text xml:space="preserve" x="${g}" y="${T}"${R.attrs}>${U}</text>`), x += v.height;
    }
    x += A.spaceAfter;
  }
  return y.join("");
}
function Lm(a) {
  const { x: t, y: s, width: n, height: e, table: r } = a, { columnWidths: l, rows: m } = r, c = l.slice(), i = m.reduce((C, S) => C + Math.max(0, S.height), 0), o = m.map((C) => {
    let S = C.height;
    for (const q of C.cells) {
      if (q.hMerge || q.vMerge) continue;
      const R = q.gridSpan || 1;
      let k = 0;
      for (let P = 0; P < R && q.col + P < c.length; P++)
        k += c[q.col + P];
      const g = Fs(q, k);
      if (g) {
        const P = g.cellPadding.top + g.cellPadding.bottom;
        S = Math.max(S, P + g.totalHeight);
      }
    }
    return { naturalHeight: S };
  }).map((C) => C.naturalHeight), x = o.reduce((C, S) => C + S, 0), f = e - x, y = o.map((C, S) => C > m[S].height + 1e-6), u = y.filter(Boolean).length, p = o.map((C, S) => {
    let q;
    return i > 0 && u > 0 && u < o.length ? q = y[S] ? 1 / u : 0 : i > 0 && u === 0 && f > 0 ? q = 0 : q = i > 0 ? m[S].height / i : 1 / Math.max(1, m.length), Math.max(m[S].height || 0, C + f * q);
  }), A = [], w = [];
  let b = s;
  const L = /* @__PURE__ */ new Set(), v = (C, S, q, R, k) => {
    const g = `${C}|${S}|${q}|${R}|${k.color}|${k.width}`;
    L.has(g) || (L.add(g), w.push(
      `<line x1="${C}" y1="${S}" x2="${q}" y2="${R}" stroke="${k.color}" stroke-width="${k.width}"/>`
    ));
  }, T = [t];
  for (const C of c) T.push(T[T.length - 1] + C);
  for (const [C, S] of m.entries()) {
    const q = p[C];
    for (const R of S.cells) {
      if (R.hMerge || R.vMerge) continue;
      const k = R.gridSpan || 1, g = R.rowSpan || 1;
      let P = 0;
      for (let B = 0; B < k && R.col + B < c.length; B++)
        P += c[R.col + B];
      const E = T[R.col] ?? T[T.length - 1], I = T[R.col + k] ?? T[T.length - 1];
      let U = q;
      if (g > 1) {
        U = 0;
        for (let B = 0; B < g && C + B < p.length; B++)
          U += p[C + B];
      }
      const D = R.fill || "none", N = R.borders;
      N ? (A.push(
        `<rect x="${E}" y="${b}" width="${P}" height="${U}" fill="${Ma(D)}"/>`
      ), N.top && v(E, b, E + P, b, N.top), N.bottom && v(E, b + U, E + P, b + U, N.bottom), N.left && v(E, b, E, b + U, N.left), N.right && v(I, b, I, b + U, N.right)) : A.push(
        `<rect x="${E}" y="${b}" width="${P}" height="${U}" fill="${Ma(D)}" stroke="#8f8f8f" stroke-width="0.7"/>`
      ), A.push(vm(R, E, b, P, U));
    }
    b += q;
  }
  return `<g${Oa(a)}>${A.join("")}${w.join("")}</g>`;
}
function _e(a, t) {
  const s = String(a).replace("#", "");
  return /^[0-9a-fA-F]{6}$/.test(s) ? ys(s, [["tint", Math.round((1 - t) * 1e5)]]) : a;
}
function Es(a, t) {
  if (a.type === "group") {
    const s = a.elements.map((n) => Es(n, t)).join("");
    return `<g${Oa(a)}${Pa(a)}>${s}</g>`;
  }
  if (a.type === "shape") return jr(a, t);
  if (a.type === "line") {
    const s = a.x, n = a.y, e = a.x + a.width, r = a.y + a.height, l = cr(a.line, a.spid || "line"), m = l.attributes ? ` ${l.attributes}` : "", c = mr(a.line), i = Math.hypot(a.width, a.height) || 1, d = a.width / i, o = a.height / i, x = s + d * c.start, f = n + o * c.start, y = e - d * c.end, u = r - o * c.end;
    let p;
    if (a.preset === "bentConnector2" || a.preset === "bentConnector3") {
      const A = a.preset === "bentConnector2" ? 1 : 2;
      p = `<path d="${$n(s, n, a.width, a.height, A, jn(a.width, a.height), c.end)}" fill="none" ${kn(a.line)}${m}/>`;
    } else
      p = `<line x1="${x}" y1="${f}" x2="${y}" y2="${u}" ${kn(a.line)}${m}/>`;
    return `<g${Oa(a)}${Pa(a)}>${l.defs}${p}</g>`;
  }
  if (a.type === "image") {
    const s = a.lumBrightness != null && a.lumBrightness !== 1 ? yr(t, a.lumBrightness) : null, n = s ? ` filter="url(#${s})"` : a.duotone ? ` filter="url(#${xr(t, a.duotone)})"` : "", e = a.opacity < 0.999 ? ` opacity="${a.opacity}"` : "", r = a.backgroundFill && a.backgroundFill !== "none" ? `<rect x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}" fill="${Ma(a.backgroundFill)}"/>` : "";
    if (a.geometryPath || a.crop) {
      const l = a.crop || { left: 0, top: 0, right: 0, bottom: 0 }, m = Math.max(1e-3, 1 - l.left - l.right), c = Math.max(1e-3, 1 - l.top - l.bottom), i = a.x - a.width * l.left / m, d = a.y - a.height * l.top / c, o = a.width / m, x = a.height / c, f = a.geometryPath ? `<path d="${a.geometryPath}" transform="translate(${a.x} ${a.y})"/>` : `<rect x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}"/>`, y = `crop-${a.sourceLevel || "slide"}-${a.spid || "image"}`;
      return `<g${Oa(a)}${Pa(a)}><defs><clipPath id="${Ma(y)}">${f}</clipPath></defs>${r}<image x="${i}" y="${d}" width="${o}" height="${x}" href="${a.src}" preserveAspectRatio="none" clip-path="url(#${Ma(y)})"${n}${e}/></g>`;
    }
    return r ? `<g${Oa(a)}${Pa(a)}>${r}<image x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}" href="${a.src}" preserveAspectRatio="none"${n}${e}/></g>` : `<image${Oa(a)} x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}" href="${a.src}" preserveAspectRatio="none"${n}${e}${Pa(a)}/>`;
  }
  return a.type === "table" ? Lm(a) : a.type === "chart" ? X0(a) : a.type === "unsupported" ? a.hideFallback ? `<g${Oa(a)}${Pa(a)} data-unsupported="${Ma(a.label || "Graphic")}" aria-hidden="true"></g>` : `<g${Oa(a)}${Pa(a)}><rect x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}" rx="6" fill="#f7f3e8" stroke="#b28a36" stroke-width="1" stroke-dasharray="7 5"/><text x="${a.x + a.width / 2}" y="${a.y + a.height / 2}" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="${Math.max(12, Math.min(24, a.height / 4))}" fill="#806324">${Ma(a.label)}</text></g>` : "";
}
function Dn(a, t, s = {}) {
  var c, i, d;
  cs();
  const n = zt;
  zt = s.hyperlinks !== !1;
  const e = a.elements.map((o) => Es(o, t)).join(""), r = ur(t) + wr(t) + br(t) + hr(t);
  let l;
  if (((c = a.background) == null ? void 0 : c.type) === "image")
    l = `<image width="${a.width}" height="${a.height}" href="${a.background.value}" preserveAspectRatio="xMidYMid slice"/>`;
  else if (((i = a.background) == null ? void 0 : i.type) === "gradient")
    l = `<rect width="100%" height="100%" fill="${Ma(a.background.value)}"/>`;
  else {
    const o = ((d = a.background) == null ? void 0 : d.value) || "#ffffff";
    l = `<rect width="100%" height="100%" fill="${Ma(o)}"/>`;
  }
  const m = `<svg xmlns="${Er}" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${a.width} ${a.height}" width="${a.width}" height="${a.height}" role="img" aria-label="Slide ${a.index + 1}">${r}${l}${e}</svg>`;
  return zt = n, m;
}
let Tn = null;
function Mc(a) {
  Tn = a;
}
function Rm(a, t) {
  Tn && Tn(a, t);
}
const Bn = 1, Mm = "Worker 里没有 DOMParser：请用 createWorkerHost({ installEnvironment }) 注入可移植 XML 解析端口（如 @xmldom/xmldom 的 DOMParser）";
function $c({ installEnvironment: a } = {}) {
  if (typeof self > "u" || typeof self.postMessage != "function")
    throw new Error("createWorkerHost()：只能在 Worker 里调用（需要 self 与 self.postMessage）");
  a && a({
    configureXmlParser: Br,
    configureMeasureContext: am,
    configureYield: Ql,
    configureAssets: Ir,
    createAssetResolver: Ke,
    configurePdfJs: L0,
    // 诊断用（只读）：内嵌 PDF 走的是注入实例还是 vendor、workerSrc 有没有配。
    pdfJsSource: He,
    pdfJsWorkerSrc: Ue
  });
  const t = /* @__PURE__ */ new Map();
  let s = 1;
  const n = { bytesIn: 0, bytesOut: 0, opens: 0, renders: 0, parseMs: 0, renderMs: 0 }, e = new TextEncoder(), r = (m) => {
    const c = t.get(m);
    if (!c)
      throw new Error(`docId=${m} 不存在（已 dispose 或从未 open）—— 当前打开的文档：${[...t.keys()].join(",") || "无"}`);
    return c;
  };
  async function l(m) {
    var c, i, d, o;
    switch (m.type) {
      case "open": {
        const x = m.buffer;
        if (!(x instanceof ArrayBuffer))
          throw new Error(`open：buffer 必须是 ArrayBuffer，收到 ${Object.prototype.toString.call(x)}`);
        if (typeof DOMParser > "u" && !a)
          throw new Error(Mm);
        const f = performance.now(), y = await Ls({ arrayBuffer: async () => x }, m.options || {}), u = performance.now() - f, p = s++;
        return t.set(p, { deck: y }), n.bytesIn += x.byteLength, n.opens += 1, n.parseMs += u, {
          type: "opened",
          docId: p,
          slideCount: y.slideCount ?? y.slides.length,
          size: y.size,
          parseMs: +u.toFixed(1)
        };
      }
      case "render": {
        const x = r(m.docId), f = m.index, y = x.deck.slides.length;
        if (!Number.isInteger(f) || f < 0 || f >= y)
          throw new Error(`render：index=${f} 越界（共 ${y} 页）`);
        const u = performance.now(), p = Dn(x.deck.slides[f], x.deck.defs);
        return n.renderMs += performance.now() - u, n.renders += 1, n.bytesOut += e.encode(p).length, { type: "rendered", docId: m.docId, index: f, svg: p };
      }
      case "stats": {
        const x = m.docId == null ? null : ((i = (c = r(m.docId).deck).resourceStats) == null ? void 0 : i.call(c)) ?? null;
        return {
          type: "stats",
          docId: m.docId ?? null,
          docs: t.size,
          ledger: n,
          docStats: x,
          // E0 前提靠它断言：Worker 里必须**真的**没有 DOM，否则测的是假环境
          environment: {
            document: typeof document,
            DOMParser: typeof DOMParser,
            OffscreenCanvas: typeof OffscreenCanvas
          }
        };
      }
      case "dispose":
        return (o = (d = r(m.docId).deck).dispose) == null || o.call(d), t.delete(m.docId), { type: "disposed", docId: m.docId, disposed: !0 };
      default:
        throw new Error(
          `未知消息类型 ${JSON.stringify(m.type)} —— 协议见 src/worker/host.js（支持 open / render / stats / dispose）`
        );
    }
  }
  return self.onmessage = async (m) => {
    const c = m.data || {}, { id: i } = c;
    try {
      if (c.version !== Bn)
        throw new Error(
          `协议版本不符：worker=${Bn} 消息=${JSON.stringify(c.version)} —— worker bundle 与 SDK 版本要一起升`
        );
      const d = await l(c);
      self.postMessage({ id: i, ...d });
    } catch (d) {
      self.postMessage({
        id: i,
        type: "error",
        docId: c.docId ?? null,
        message: String(d && d.message ? d.message : d)
      });
    }
  }, { docs: () => t.size, ledger: n };
}
const $m = (a) => a instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && a instanceof SharedArrayBuffer;
function jc({ url: a, worker: t, workerOptions: s } = {}) {
  const n = t || (a ? new Worker(a, { type: "module", ...s || {} }) : null);
  if (!n)
    throw new Error('createWorkerClient({ url | worker })：必须给 url 或已构造好的 worker（ESM worker 需 type:"module"）');
  const e = /* @__PURE__ */ new Map();
  let r = 1;
  const l = { toWorker: 0, fromWorker: 0, requests: 0, errors: 0 }, m = [], c = new TextEncoder();
  n.onmessage = (d) => {
    const o = d.data || {}, x = e.get(o.id);
    if (!x) {
      m.push(`未识别的响应 id=${JSON.stringify(o.id)} type=${JSON.stringify(o.type)}`);
      return;
    }
    e.delete(o.id), o.type === "rendered" && (l.fromWorker += c.encode(o.svg || "").length), o.type === "error" && (l.errors += 1), o.type === "error" ? x.reject(new Error(o.message || "Worker 返回未知错误")) : x.resolve(o);
  }, n.onerror = (d) => {
    const o = String(d && d.message || "worker error");
    for (const [, x] of e) x.reject(new Error(`Worker 失败：${o}`));
    e.clear();
  };
  function i(d, o = {}, x = 0) {
    const f = r++;
    return l.requests += 1, l.toWorker += x, new Promise((y, u) => {
      e.set(f, { resolve: y, reject: u }), n.postMessage({ id: f, type: d, version: Bn, ...o });
    });
  }
  return {
    /** 打开一个 deck。input 可以是 File / Blob / ArrayBuffer。 */
    async open(d, o = {}) {
      const x = $m(d) ? d : await d.arrayBuffer(), f = await i("open", { buffer: x, options: o }, x.byteLength);
      return { docId: f.docId, slideCount: f.slideCount, size: f.size, parseMs: f.parseMs };
    },
    /** 渲染指定页，返回 SVG 字符串（与主线程 renderSlideSvg 逐字节相同，见门禁 E2）。 */
    async renderSlide(d, o) {
      return (await i("render", { docId: d, index: o })).svg;
    },
    /** 账目快照：docs=Worker 里还开着的文档数，ledger=Worker 侧传输/耗时账目。 */
    async stats(d = null) {
      return i("stats", { docId: d });
    },
    async dispose(d) {
      return i("dispose", { docId: d });
    },
    /** 终止 Worker。调用后所有方法都会 reject（pending 被清空并失败）。 */
    close() {
      for (const [, d] of e) d.reject(new Error("Worker 已关闭"));
      e.clear(), n.terminate();
    },
    /** 主线程侧传输字节账目（与 Worker 侧 ledger 互为对照）。 */
    bytes() {
      return { ...l };
    },
    protocolErrors: m,
    request: i
  };
}
const Zn = 5e3, jm = 5e3, km = 10, Is = /* @__PURE__ */ new Set(["entr", "exit"]);
function Ds(a, t, s, n) {
  const e = (l, m, c) => {
    const i = 1 - l;
    return 3 * i * i * l * m + 3 * i * l * l * c + l * l * l;
  }, r = (l, m, c) => {
    const i = 1 - l;
    return 3 * i * i * m + 6 * i * l * (c - m) + 3 * l * l * (1 - c);
  };
  return (l) => {
    if (!(l > 0)) return 0;
    if (!(l < 1)) return 1;
    let m = l;
    for (let c = 0; c < 8; c += 1) {
      const i = e(m, a, s) - l;
      if (Math.abs(i) < 1e-7) break;
      const d = r(m, a, s);
      if (Math.abs(d) < 1e-7) break;
      m -= i / d;
    }
    return e(Math.min(1, Math.max(0, m)), t, n);
  };
}
const an = Ds(0, 0, 0.58, 1), Pn = Ds(0.42, 0, 1, 1), Xa = (a) => `${(a * 100).toFixed(4)}%`, Cm = {
  left: (a) => `inset(0 0 0 ${Xa(a)})`,
  right: (a) => `inset(0 ${Xa(a)} 0 0)`,
  up: (a) => `inset(${Xa(a)} 0 0 0)`,
  down: (a) => `inset(0 0 ${Xa(a)} 0)`
}, _m = { left: "right", right: "left", up: "down", down: "up" };
function tn(a, t, s = !0) {
  const n = String(a || ""), e = 1 - Math.min(1, Math.max(0, t));
  if (!n || n.includes("fade")) return null;
  if (n.startsWith("blinds")) return `inset(0 ${Xa(0.5 * e)} 0 ${Xa(0.5 * e)})`;
  if (n.startsWith("wipe(")) {
    const r = n.slice(5, -1), l = s && _m[r] || r, m = Cm[l];
    if (m) return m(e);
  }
  return null;
}
const za = 8, Ts = /^randombars?\((horizontal|vertical)\)/;
function Bs(a) {
  return Ts.test(String(a || "").trim().toLowerCase());
}
function Sm(a) {
  const t = String(a ?? "");
  let s = 2166136261;
  for (let n = 0; n < t.length; n += 1)
    s ^= t.charCodeAt(n), s = Math.imul(s, 16777619);
  return s >>> 0;
}
function Fm(a) {
  const t = Array.from({ length: za }, (e, r) => r);
  let s = Sm(a) || 1;
  const n = () => {
    s = s + 1831565813 >>> 0;
    let e = s;
    return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
  };
  for (let e = t.length - 1; e > 0; e -= 1) {
    const r = Math.floor(n() * (e + 1));
    [t[e], t[r]] = [t[r], t[e]];
  }
  return t;
}
function Ps(a, t, s) {
  const e = String(a || "").trim().toLowerCase().match(Ts);
  if (!e) return null;
  const r = Math.round(Math.min(1, Math.max(0, t)) * za);
  if (r >= za) return null;
  const l = e[1] === "vertical" ? "to right" : "to bottom", m = new Set(Fm(s ?? "").slice(0, Math.max(0, r))), c = [];
  for (let i = 0; i < za; i += 1) {
    const d = m.has(i) ? "#000" : "transparent";
    c.push(`${d} ${Xa(i / za)} ${Xa((i + 1) / za)}`);
  }
  return `linear-gradient(${l}, ${c.join(", ")})`;
}
function Va(a) {
  return Math.max(1, Math.min(Zn, Number(a == null ? void 0 : a.duration) || 500));
}
const Em = 3e4, Im = 1e4;
function nn(a) {
  const t = String(a || "");
  return t ? t.match(
    /\s*(?:[\p{Script=Han}\u3000-\u303F\uFF00-\uFFEF]|[A-Za-z0-9]+(?:[^\s\p{Script=Han}A-Za-z0-9]+)?|[^\s])\s*/gu
  ) || [t] : [];
}
function zn(a) {
  var t;
  return Math.max(1, Math.floor(Number((t = a == null ? void 0 : a.iterate) == null ? void 0 : t.unitCount) || 1));
}
function _t(a) {
  var n, e;
  const t = Number((n = a == null ? void 0 : a.iterate) == null ? void 0 : n.intervalMs);
  return Number.isFinite(t) && t > 0 ? Math.min(Im, t) : Math.max(0, Math.min(1, Number((e = a == null ? void 0 : a.iterate) == null ? void 0 : e.intervalRatio) || 0)) * Va(a);
}
function Rt(a) {
  return !!(a != null && a.iterate) && _t(a) > 0;
}
function ct(a) {
  const t = Va(a);
  if (!Rt(a)) return t * 1;
  const s = t + (zn(a) - 1) * _t(a);
  return Math.min(Em, Math.max(t, s));
}
function Os(a, t, s) {
  if (s !== 1 / 0 && !Number.isFinite(s)) return 0;
  const n = Va(a), e = Math.max(0, Math.floor(Number(t) || 0)) * _t(a);
  if (s === 1 / 0) return 1;
  const r = (s - e) / n;
  return r > 0 ? r >= 1 ? 1 : a.presetClass === "exit" ? 1 - Pn(r) : an(r) : 0;
}
function Mt(a) {
  const t = a == null ? void 0 : a.path;
  return t && Array.isArray(t.points) && t.points.length >= 2 ? t : null;
}
function Ns(a, t = 0, s = 0) {
  const n = Math.min(1, Math.max(0, Number(a) || 0));
  let e = Math.min(1, Math.max(0, Number(t) || 0)), r = Math.min(1, Math.max(0, Number(s) || 0));
  if (e + r > 1) {
    const m = 1 / (e + r);
    e *= m, r *= m;
  }
  const l = 1 / (1 - (e + r) / 2);
  if (e > 0 && n <= e) return Math.min(1, l * n * n / (2 * e));
  if (r > 0 && n >= 1 - r) {
    const m = n - (1 - r);
    return Math.min(1, l * (e / 2 + (1 - r - e) + (m - m * m / (2 * r))));
  }
  return Math.min(1, l * (e / 2 + (n - e)));
}
function qs(a, t) {
  const s = Mt(a);
  if (!s) return { x: 0, y: 0 };
  const n = s.points, e = s.relative ? { x: 0, y: 0 } : n[0], r = n.length - 1, l = Math.min(1, Math.max(0, Number(t) || 0)) * r, m = Math.min(r - 1, Math.floor(l)), c = l - m, i = n[m], d = n[m + 1];
  return {
    x: i.x - e.x + (d.x - i.x) * c,
    y: i.y - e.y + (d.y - i.y) * c
  };
}
function Se(a, t) {
  var e;
  const s = zn(a), n = [];
  for (let r = 0; r < s; r += 1)
    n.push(Os(a, r, t));
  return {
    type: ((e = a.iterate) == null ? void 0 : e.type) || "lt",
    intervalMs: _t(a),
    unitDurationMs: Va(a),
    unitCount: s,
    elapsedMs: t,
    unitProgress: n
  };
}
function $t(a) {
  return a != null && a.repeatIndefinite ? 1 : Math.max(1, Math.min(km, Math.floor(Number(a == null ? void 0 : a.repeat) || 1)));
}
function Zs(a) {
  return Math.max(0, Math.min(jm, Number(a == null ? void 0 : a.delay) || 0));
}
function Hn(a) {
  return ((a == null ? void 0 : a.tracks) || []).find((t) => t.attrName === "style.visibility") || null;
}
function St(a) {
  if (a != null && a.mediaCmd) return null;
  if ((a == null ? void 0 : a.presetClass) === "path")
    return Mt(a) ? null : "Unsupported motion path: animMotion has no usable path";
  if (!Hn(a) && !Is.has(a == null ? void 0 : a.presetClass))
    return `Unsupported preset class: ${(a == null ? void 0 : a.presetClass) || "unknown"}`;
  const t = (a == null ? void 0 : a.filter) || "";
  return t && !t.includes("fade") && tn(t, 1) === null && !Bs(t) ? `Unsupported animation filter: ${t}` : null;
}
function en(a) {
  const t = [];
  let s = 0;
  for (const n of a || []) {
    const e = ct(n) * $t(n), r = Zs(n), l = (n == null ? void 0 : n.trigger) === "afterEffect" && r === 0 ? s + r : r;
    t.push({ effect: n, start: l, end: l + e }), s = l + e;
  }
  return t;
}
function Dm(a) {
  const t = /* @__PURE__ */ new Map();
  for (const s of (a == null ? void 0 : a.targets) || []) t.set(s.targetId, !0);
  for (const s of (a == null ? void 0 : a.initialHidden) || []) t.set(s, !1);
  return t;
}
const Tm = Object.freeze({
  visible: !0,
  opacity: 1,
  clipPath: null,
  maskImage: null,
  translateX: 0,
  translateY: 0,
  scaleX: 1,
  scaleY: 1,
  rotate: 0
});
function Ga(a) {
  return { ...Tm, visible: a };
}
function Bm(a, t) {
  return St(a) ? a.presetClass === "entr" ? Ga(!0) : a.presetClass === "exit" ? t ? null : Ga(!1) : null : null;
}
function Pm(a, t) {
  if (a != null && a.mediaCmd || t < 0 || t !== 1 / 0 && !Number.isFinite(t)) return null;
  const s = Va(a), n = $t(a), e = ct(a) * n, r = (a == null ? void 0 : a.motion) || {}, l = Number(r.fromX) || 0, m = Number(r.fromY) || 0, c = Number(r.toX) || 0, i = Number(r.toY) || 0, d = (L) => ({
    translateX: l + (c - l) * L,
    translateY: m + (i - m) * L
  }), o = a == null ? void 0 : a.transform, x = (L) => o ? {
    scaleX: o.fromScaleX + (o.toScaleX - o.fromScaleX) * L,
    scaleY: o.fromScaleY + (o.toScaleY - o.fromScaleY) * L,
    rotate: o.fromRotate + (o.toRotate - o.fromRotate) * L
  } : { scaleX: 1, scaleY: 1, rotate: 0 };
  if (a.presetClass === "path") {
    const L = Mt(a);
    if (!L) return null;
    const v = ct(a), C = t >= v * n ? 1 : t % v / v, S = qs(a, Ns(C, L.accel, L.decel));
    return { ...Ga(!0), translateX: S.x, translateY: S.y };
  }
  const f = Hn(a);
  if (f && !Is.has(a.presetClass)) {
    const L = Math.max(1, Math.min(Zn, Number(f.duration) || s)), v = (f.keyframes || []).map((S) => ({ at: Math.min(1, Math.max(0, Number(S.at) || 0)), value: S.value })).sort((S, q) => S.at - q.at);
    if (!v.length) return null;
    if (t >= L * n)
      return { ...Ga(v.at(-1).value === "visible") };
    const T = t % L;
    let C = v[0].value;
    for (const S of v)
      S.at * L <= T + 1e-9 && (C = S.value);
    return { ...Ga(C === "visible") };
  }
  const y = a.presetClass === "entr", u = (a == null ? void 0 : a.filter) || "", p = u.includes("fade");
  if (Rt(a)) {
    const L = ct(a);
    if (t >= L * n)
      return {
        ...Ga(y),
        opacity: y ? 1 : 0,
        clipPath: null,
        maskImage: null,
        ...d(1),
        ...x(1),
        iterate: Se(a, 1 / 0)
      };
    const v = t % L / L, T = y ? an(v) : Pn(v);
    return {
      visible: !0,
      opacity: y ? T : 1 - T,
      clipPath: null,
      maskImage: null,
      ...d(T),
      ...x(T),
      iterate: Se(a, t)
    };
  }
  if (t >= e)
    return {
      ...Ga(y),
      opacity: y ? 1 : p ? 0 : 1,
      clipPath: null,
      maskImage: null,
      ...d(1),
      ...x(1)
    };
  const A = t % s / s, w = y ? an(A) : Pn(A), b = y ? w : 1 - w;
  return {
    visible: !0,
    opacity: p ? y ? w : 1 - w : 1,
    clipPath: tn(u, b, y),
    maskImage: Ps(u, b, a == null ? void 0 : a.targetId),
    ...d(w),
    ...x(w)
  };
}
function sn(a, t = {}) {
  if (!a || !Array.isArray(a.steps) || !Array.isArray(a.targets))
    throw new TypeError("sampleSlideAnimation requires parsed slide animation data");
  const s = Math.max(0, Math.min(a.steps.length, Math.floor(Number(t.step) || 0))), n = t.timeMs, e = !!t.ignoreExits, r = !!t.ignorePaths, l = /* @__PURE__ */ new Map();
  for (const c of a.targets)
    l.set(c.targetId, Ga(Dm(a).get(c.targetId) !== !1));
  const m = (c, i) => {
    if (St(c)) {
      const o = Bm(c, e);
      o && i >= 0 && l.set(c.targetId, o);
      return;
    }
    if (e && c.presetClass === "exit" || r && c.presetClass === "path") return;
    const d = Pm(c, i);
    d && l.set(c.targetId, d);
  };
  for (let c = 0; c < s; c += 1)
    for (const { effect: i } of en(a.steps[c])) m(i, 1 / 0);
  if (n !== void 0 && s < a.steps.length)
    for (const { effect: c, start: i } of en(a.steps[s]))
      m(c, Number(n) - i);
  return l;
}
function Om(a) {
  const t = Array.isArray(a == null ? void 0 : a.steps) ? a.steps : [], s = Array.isArray(a == null ? void 0 : a.stepMeta) ? a.stepMeta : [];
  return t.map((n, e) => {
    var l, m;
    const r = en(n);
    return {
      index: e,
      trigger: ((l = s[e]) == null ? void 0 : l.trigger) || "click",
      delay: Math.max(0, Number((m = s[e]) == null ? void 0 : m.delay) || 0),
      duration: r.reduce((c, i) => Math.max(c, i.end), 0),
      targetIds: Array.from(new Set((n || []).map((c) => c.targetId))),
      effects: (n || []).map((c, i) => {
        var d, o, x;
        return {
          targetId: c.targetId,
          spid: c.spid,
          trigger: c.trigger,
          // clickEffect / withEffect / afterEffect / clickPar
          presetClass: c.presetClass,
          presetId: c.presetId,
          filter: c.filter,
          // 相对**步起点**的延迟（步容器的那一份不在这里，见 `step.delay`）
          delay: Zs(c),
          duration: Va(c),
          totalMs: ct(c) * $t(c),
          start: ((d = r[i]) == null ? void 0 : d.start) ?? 0,
          repeat: $t(c),
          repeatIndefinite: !!c.repeatIndefinite,
          ...c.mediaCmd ? { mediaCmd: c.mediaCmd } : {},
          // ⭐ R122：逐单元间隔暴露给宿主。`unitCount` 由渲染层 DOM 粒度决定，
          //   无 DOM 的采样层按 1 算 ⇒ `duration`/`totalMs` 不含后续单元；
          //   宿主可按 `intervalMs × (文本单元数 − 1)` 估算步内喂帧时长。
          ...Rt(c) ? {
            iterate: {
              type: ((o = c.iterate) == null ? void 0 : o.type) || "lt",
              intervalMs: _t(c),
              unitDurationMs: Va(c),
              // R122：slideAnimation() 会用渲染产物回填真实单元数；宿主可据此核对步时长。
              unitCount: zn(c)
            }
          } : {},
          ...(x = c.audio) != null && x.length ? { audio: c.audio } : {},
          unsupported: St(c)
        };
      })
    };
  });
}
function Fe(a, t) {
  const s = Array.isArray(a == null ? void 0 : a.steps) ? a.steps : [];
  if (!Array.isArray(a == null ? void 0 : a.targets)) return !1;
  const n = s[t];
  if (!Array.isArray(n)) return !1;
  const e = [0, 1, 250, 500, 1e3, 2500, 1 / 0], r = (m) => JSON.stringify(
    Array.from(sn(a, { step: t, timeMs: m }).entries())
  ), l = r(e[0]);
  for (let m = 1; m < e.length; m += 1)
    if (r(e[m]) !== l) return !1;
  return !0;
}
function Nm(a, t, s = {}) {
  const n = Array.isArray(t) ? t : [];
  if (!n.length) return [];
  const { step: e = 0, timeMs: r = null, width: l = 0, height: m = 0 } = s, c = a && Array.isArray(a.steps) && Array.isArray(a.targets) ? sn(a, { step: e, timeMs: r }) : null;
  return n.filter((i) => {
    const d = c == null ? void 0 : c.get(String(i.spid));
    if (d && d.visible === !1) return !1;
    if (l > 0 && m > 0 && i.rect) {
      const { x: o = 0, y: x = 0, width: f = 0, height: y = 0 } = i.rect;
      if (o + f <= 0 || x + y <= 0 || o >= l || x >= m) return !1;
    }
    return !0;
  });
}
function kc(a) {
  const t = [];
  for (const [s, n] of ((a == null ? void 0 : a.steps) || []).entries())
    for (const e of n) {
      const r = St(e);
      r && t.push({ step: s, targetId: e.targetId, reason: r });
    }
  return t;
}
const qm = 2, Zm = 30, _a = {
  barRatio: 0.16,
  // 条高 / 媒体高
  barMin: 26,
  // 逻辑 px：小媒体上控件也要够大才点得到
  barMax: 56,
  minBarWidth: 180,
  // 视频：画面再窄也要一条点得到的条
  pad: 0.16,
  // 条内边距 / 条高
  btnRatio: 0.62,
  // 按钮边长 / 条高
  trackRatio: 0.16,
  // 进度条厚度 / 条高
  // R111：音频的条挂在图标**下方**、按「播放 + 一条能拖的进度条」定宽，
  // ⛔ 而且**不画喇叭按钮**：页面上那张喇叭是 PPT 自己的封面图，再画一个喇叭
  //    （哪怕是"静音"样式）就成了宿主报的「两个音频控件」。静音本来也是文档级的
  //    （`setMuted`），不差这一个重复入口。
  audioBarGap: 5,
  // 条与图标下沿的间距（slide 逻辑 px）
  audioBarMinHeight: 30,
  // 音频条高度下限：43px 的图标配 26px 的条太难点
  audioBarMinWidth: 132,
  // 音频条宽度下限：播放键 + 一条真能拖的进度条
  fadeMs: 200,
  // 淡入淡出
  // R109：进场展示窗口的长度 —— 亮这么久之后**只留悬停项**。
  // ⛔ 它不是「多久没动指针」：指针动一下**不**续期（否则一页 N 个媒体仍然 N 条一起亮）。
  autoHideMs: 2600,
  uiFps: 10
  // 音频在播 / 控件动画时的泵频（比视频的 30fps 低一个量级）
}, zm = {
  mp4: "video/mp4",
  m4v: "video/mp4",
  mov: "video/quicktime",
  m4a: "audio/mp4",
  wav: "audio/wav",
  mp3: "audio/mpeg",
  wmv: "video/x-ms-wmv",
  avi: "video/x-msvideo",
  mpg: "video/mpeg",
  webm: "video/webm",
  ogg: "audio/ogg"
};
function Ee(a, t) {
  if (t && t !== "application/octet-stream") return t;
  const s = String(a || "").split(".").pop().toLowerCase();
  return zm[s] || "";
}
function Hm(a, t = {}) {
  const s = t.readPart || (a == null ? void 0 : a.readPart), n = typeof t.onFrame == "function" ? t.onFrame : null, e = t.muted === !0, r = Math.max(1, Math.floor(t.maxPlates ?? qm)), l = Math.max(1, Math.floor(t.maxFps ?? Zm)), m = t.controls === "always" || t.controls === "never" ? t.controls : "auto", c = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  let o = -1, x = !1, f = e, y = !1, u = 0, p = null, A = null, w = null, b = 0, L = null, v = 0, T = 0;
  const C = /* @__PURE__ */ new Set();
  let S = null;
  const q = /* @__PURE__ */ new Set();
  function R(F) {
    if (q.has(F)) {
      q.delete(F);
      try {
        F.el.pause();
      } catch {
      }
      F.el.removeAttribute("src");
      try {
        F.el.load();
      } catch {
      }
      F.url && URL.revokeObjectURL(F.url);
    }
  }
  function k() {
    for (const F of Array.from(q)) R(F);
  }
  async function g({ part: F, mime: X } = {}) {
    if (x) return { ok: !1, reason: "disposed" };
    if (!F) return { ok: !1, reason: "missing part" };
    if (!s) return { ok: !1, reason: "no readPart" };
    let na;
    try {
      na = await s(F);
    } catch (ua) {
      return { ok: !1, reason: `readPart: ${(ua == null ? void 0 : ua.message) || ua}` };
    }
    if (!na) return { ok: !1, reason: "audio part missing" };
    const ia = URL.createObjectURL(new Blob([na], { type: Ee(F, X) || void 0 })), la = document.createElement("audio");
    la.preload = "auto", la.src = ia;
    const ha = { el: la, url: ia, part: F };
    q.add(ha), la.addEventListener("ended", () => R(ha), { once: !0 }), la.addEventListener("error", () => R(ha), { once: !0 });
    try {
      return await la.play(), { ok: !0, part: F };
    } catch (ua) {
      return R(ha), { ok: !1, reason: `play blocked: ${(ua == null ? void 0 : ua.name) || (ua == null ? void 0 : ua.message) || ua}` };
    }
  }
  const P = (F, X) => `${F}/${X}`, E = (F, X) => `${F}:${X}`, I = (F, X, na) => `${F}:${X}:step${na}`, U = /* @__PURE__ */ new Map(), D = Math.max(1, Math.floor(t.maxAnimatedPlates ?? 4));
  function N(F, X) {
    const na = P(F, X.id), ia = c.get(na);
    if (ia) return ia;
    const la = {
      id: X.id,
      slideIndex: F,
      kind: X.kind === "audio" ? "audio" : "video",
      part: X.part,
      mime: Ee(X.part, X.mime),
      rect: X.rect,
      posterPart: X.posterPart || null,
      phase: "idle",
      // idle | loading | ready | playing | paused | ended | unsupported
      unsupported: null,
      // "missing" | "codec" | "blocked" | "decode"
      el: null,
      url: null,
      posterImage: null,
      posterUrl: null,
      // none | pending | ready | broken（R105：让宿主语料里到底有没有封面**可自查**）
      posterState: X.posterPart ? "pending" : "none",
      // R105：最后一次**成功**画出去的视频帧。seek / 缓冲时 readyState 掉到 1，
      // 此刻既没有新帧又没有可用封面，用它顶住，别露出静态底盘（那是个黑块）。
      lastFrame: null,
      // 控件透明度。`null` = **还没画过** ⇒ 首帧直接取 `controlTarget()` 的值（不淡入）。
      // ⛔ 旧代码首帧恒为 1（为了「第一眼就在」）：音频改成只认悬停之后，静止页首帧
      //    会画出一条**本该不亮**的条，而宿主不重画就没人把它淡掉 ⇒ 页面上一直挂着
      //    两个音频控件（连报三轮的那个现象的最后一层）。
      // R109：淡入淡出按**墙上时钟**插值（`fadeFrom` → `ctlTarget`，见 `paintControls`），
      //   不再按「上一帧到这一帧的间隔」推进 —— 帧稀疏时（没有视频在播）间隔会被
      //   clamp 到 500ms ≫ fadeMs 200ms ⇒ 第一帧就一步走完，看起来是「啪一下消失」。
      ctlAlpha: null,
      ctlTarget: null,
      fadeFrom: 0,
      fadeStart: 0,
      geo: null
      // 最近一次绘制用的几何（命中判据复用它，杜绝第二个真源）
    };
    return c.set(na, la), la;
  }
  function B(F) {
    if (typeof document > "u") return !1;
    const X = document.createElement(F.kind === "audio" ? "audio" : "video");
    return F.mime ? X.canPlayType(F.mime) !== "" : "";
  }
  function _(F, X) {
    F.phase = "unsupported", F.unsupported = X, oa();
  }
  async function J(F) {
    if (F.phase !== "idle") return F;
    if (!s)
      return _(F, "missing"), F;
    if (!B(F))
      return _(F, "codec"), F;
    F.phase = "loading";
    let X = null;
    try {
      X = await s(F.part);
    } catch {
      X = null;
    }
    if (x) return F;
    if (!X || !X.length)
      return _(F, "missing"), F;
    const na = document.createElement(F.kind);
    na.preload = "auto", na.muted = f, na.playsInline = !0, na.src = F.url = URL.createObjectURL(new Blob([X], { type: F.mime || void 0 })), na.addEventListener("error", () => {
      _(F, "decode"), F.el = null;
    }), na.addEventListener("ended", () => {
      F.phase = "ended";
    });
    for (const ia of ["seeked", "canplay", "loadeddata"])
      na.addEventListener(ia, () => oa());
    if (F.el = na, F.posterPart)
      try {
        const ia = await s(F.posterPart);
        if (ia && !x) {
          F.posterUrl = URL.createObjectURL(new Blob([ia]));
          const la = new Image();
          la.onload = () => {
            F.posterState = "ready", oa();
          }, la.onerror = () => {
            F.posterState = "broken";
          }, F.posterImage = la, la.src = F.posterUrl;
        } else
          F.posterState = "broken";
      } catch {
        F.posterState = "broken";
      }
    return Aa(F), pa(), F;
  }
  function aa(F) {
    var X, na;
    if (xa(F), F.el) {
      try {
        F.el.pause();
      } catch {
      }
      F.el.removeAttribute("src"), (na = (X = F.el).load) == null || na.call(X), F.el = null;
    }
    F.url && (URL.revokeObjectURL(F.url), F.url = null), F.posterUrl && (URL.revokeObjectURL(F.posterUrl), F.posterUrl = null), F.posterImage = null, F.lastFrame = null, F.posterState = F.posterPart ? "pending" : "none", F.phase !== "unsupported" && (F.phase = "idle"), pa();
  }
  function Q() {
    const F = [];
    for (const X of d.get(o) || []) {
      const na = c.get(P(o, X.id));
      !na || !na.el || F.push({
        id: na.id,
        kind: na.kind,
        element: na.el,
        phase: na.phase,
        unsupported: na.unsupported,
        muted: !!na.el.muted
      });
    }
    return F;
  }
  function pa() {
    if (x) return;
    const F = Q();
    for (const X of Array.from(C))
      try {
        X(F);
      } catch {
      }
  }
  function Aa(F) {
    if (!(!S || !F.el || S.sources.has(F.el)))
      try {
        const X = S.ctx.createMediaElementSource(F.el);
        X.connect(S.gain), S.sources.set(F.el, X);
      } catch {
      }
  }
  function xa(F) {
    if (!S || !F.el) return;
    const X = S.sources.get(F.el);
    if (X) {
      try {
        X.disconnect();
      } catch {
      }
      S.sources.delete(F.el);
    }
  }
  function wa(F) {
    for (const X of c.values())
      if (!(X.kind !== F || X.phase !== "playing" || !X.el))
        return !0;
    return !1;
  }
  function V() {
    return wa("video");
  }
  function K() {
    return wa("audio");
  }
  function ya(F = ft()) {
    if (w || T > F) return !0;
    for (const X of c.values())
      if (Math.abs((X.ctlAlpha ?? 0) - (X.ctlTarget ?? 0)) > 0.01) return !0;
    return !1;
  }
  function ma() {
    return V() || K() || ya();
  }
  function h() {
    if (x) return;
    const F = ft(), X = V() ? 1e3 / l : 1e3 / _a.uiFps;
    if (F - u < X) {
      W();
      return;
    }
    u = F;
    const na = ma();
    if (na && n && n(), !na) {
      Z();
      return;
    }
    W();
  }
  function W() {
    if (y || x) return;
    y = !0;
    const F = () => {
      y = !1, h();
    };
    typeof requestAnimationFrame == "function" ? p = requestAnimationFrame(F) : p = setTimeout(F, 1e3 / l);
  }
  function Z() {
    y = !1, p != null && (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(p) : clearTimeout(p), p = null);
  }
  const j = () => {
    typeof document < "u" && document.hidden ? Z() : ma() && W();
  };
  typeof document < "u" && document.addEventListener && document.addEventListener("visibilitychange", j);
  function M(F) {
    return F.phase === "unsupported" && F.unsupported !== "blocked";
  }
  function $(F, X) {
    return M(F) ? 0 : m === "always" || w === F.id || A === F.id ? 1 : F.kind === "audio" ? 0 : X - b < _a.autoHideMs ? 1 : 0;
  }
  function z() {
    b = ft(), typeof setTimeout == "function" && (L != null && clearTimeout(L), L = setTimeout(() => {
      L = null, O();
    }, _a.autoHideMs));
  }
  function G() {
    L != null && (clearTimeout(L), L = null);
  }
  function O() {
    const F = ft();
    v = F, T = F + _a.fadeMs + 100, W();
  }
  function Y(F, X, { slideW: na, slideH: ia, scale: la, now: ha }) {
    if (m === "never") {
      X.geo = null;
      return;
    }
    const ua = $(X, ha);
    X.ctlAlpha == null ? (X.ctlAlpha = X.fadeFrom = X.ctlTarget = ua, X.fadeStart = 0) : ua !== X.ctlTarget && (X.ctlTarget = ua, X.fadeFrom = X.ctlAlpha, X.fadeStart = ua === 0 && v > 0 ? v : ha);
    const ga = Ha((ha - X.fadeStart) / _a.fadeMs, 0, 1);
    X.ctlAlpha = X.fadeFrom + (ua - X.fadeFrom) * ga, X.geo = Wm(X, na, ia), X.ctlAlpha > 0.01 ? Gm(F, X, X.geo, la, X.ctlAlpha) : M(X) && Km(F, X.geo, la);
  }
  function sa(F, X, na, ia = !0) {
    let la = null;
    for (const ha of d.get(F) || []) {
      const ua = c.get(P(F, ha.id));
      if (!ua || ia && ua.ctlAlpha < 0.05 || M(ua)) continue;
      !la && m !== "never" && ua.rect && wn(X, na, ua.rect) && (la = ua);
      const ga = ua.geo;
      if (!ga || X < ga.x || X > ga.x + ga.width || na < ga.y || na > ga.y + ga.height) continue;
      if (wn(X, na, ga.play)) return { entry: ua, part: "play" };
      if (ga.mute && wn(X, na, ga.mute)) return { entry: ua, part: "mute" };
      const tt = ga.play.x + ga.play.width + ga.pad / 2, Ya = (ga.mute ? ga.mute.x : ga.x + ga.width) - ga.pad / 2;
      return X >= tt && X <= Ya ? { entry: ua, part: "track", ratio: Ha((X - ga.track.x) / Math.max(1, ga.track.width), 0, 1) } : { entry: la || ua, part: null };
    }
    return la ? { entry: la, part: null } : null;
  }
  function ta(F, X) {
    const na = F.el, ia = na && Number.isFinite(na.duration) ? na.duration : 0;
    if (!(!na || !(ia > 0)))
      try {
        na.currentTime = Ha(X, 0, 1) * ia;
      } catch {
      }
  }
  async function ca(F) {
    F.phase === "playing" ? da.pause(F.id) : await da.play(F.id);
  }
  function oa() {
    x || (ma() ? W() : n && n());
  }
  const da = {
    /** R122：动画音效一次性起播（由 ppt-renderer 的 audioCommandsAt 驱动）。 */
    playSound: g,
    /** 切页 / dispose 时停掉并释放所有动画音效。 */
    stopSounds: k,
    /** 这一页有没有要画的视频（决定宿主能不能复用静态底盘）。 */
    hasVideo(F) {
      return (d.get(F) || []).some((na) => na.kind !== "audio");
    },
    /** 开一次控件展示窗口：由动画命令起播的媒体不是「翻页」，宿主需要显式叫一次。 */
    reveal() {
      x || z();
    },
    /** 缓存的底盘；step 给了就取该步的动画态底盘，没给就是静态底盘。 */
    plateFor(F, X, na = null) {
      return na != null ? U.get(I(F, X, na)) || null : i.get(E(F, X)) || null;
    },
    /** 登记这一页的媒体清单并切换「当前页」（离开的页会被停下）。 */
    setActive(F, X) {
      if (x) return;
      if (Array.isArray(X) && d.set(F, X), o !== -1 && o !== F) {
        A = null, w = null, k();
        for (const ia of c.values())
          if (ia.slideIndex === o && ia.el) {
            ia.el.pause(), ia.phase === "playing" && (ia.phase = "paused");
            try {
              ia.el.currentTime = 0;
            } catch {
            }
            ia.lastFrame = null;
          }
        Z();
      }
      const na = o !== F;
      o = F, na && (z(), pa());
    },
    /**
     * 在 `prepareFrame` 的 decorate 里调用：先把「还没画视频」的画面留一份底盘，
     * 再把媒体画上去。
     *
     * @param {boolean} [animated] 这一帧是**带动画状态**的（`animationStep` 生效了）。
     *   带动画的帧不烘底盘 —— 底盘的语义是「无动画的静态页」，拿动画帧去烘会让之后
     *   不带 `animationStep` 的静态重画也带着最后一次推进的动画状态（R106 之前
     *   这个方向的污染同样存在，只是被「命中底盘就丢 step」盖住了）。
     */
    async paintInto(F, { slideIndex: X, media: na, items: ia, width: la, height: ha, scale: ua, animated: ga, activate: tt, plateStep: Ya }) {
      if (x || !F) return;
      if (Array.isArray(na) && d.set(X, na), tt !== !1 && da.setActive(X, na), la > 0 && ha > 0) {
        const Ia = Ya == null ? null : I(X, ua, Ya), ka = E(X, ua), Ba = Ia ? U : i, Un = Ia || ka;
        if ((!ga || Ia) && !Ba.has(Un)) {
          const Et = document.createElement("canvas");
          Et.width = la, Et.height = ha, Et.getContext("2d").drawImage(F.canvas, 0, 0), Ba.set(Un, Et);
          const Us = Ia ? D : r;
          for (; Ba.size > Us; ) Ba.delete(Ba.keys().next().value);
        }
      }
      const ln = ua > 0 ? la / ua : la, mn = ua > 0 ? ha / ua : ha, Ft = ft(), Ka = Array.isArray(ia) ? ia : d.get(X) || [];
      for (const Ia of Ka) {
        const ka = N(X, Ia);
        if (ka.phase === "unsupported")
          De(ka) && Ot(F, ka.posterImage, ka.rect, ua);
        else {
          if (ka.phase === "idle" && await J(ka), x) return;
          const Ba = ka.el;
          Ba && ka.kind !== "audio" && (Ba.readyState >= 2 ? (Ot(F, Ba, ka.rect, ua), Um(ka, Ba, ua)) : De(ka) ? Ot(F, ka.posterImage, ka.rect, ua) : ka.lastFrame && Ot(F, ka.lastFrame, ka.rect, ua));
        }
        Y(F, ka, { slideW: ln, slideH: mn, scale: ua, now: Ft });
      }
    },
    /** 起播（幂等）。被自动播放策略拒绝是**常态**：落 `unsupported:"blocked"`，不抛。 */
    async play(F = null) {
      if (x) return;
      const X = /* @__PURE__ */ new Set();
      for (const na of d.get(o) || []) {
        if (F && na.id !== F) continue;
        if (!F && na.part) {
          if (X.has(na.part)) continue;
          X.add(na.part);
        }
        const ia = N(o, na);
        if (ia.phase === "unsupported") continue;
        ia.phase === "idle" && await J(ia);
        const la = ia.el;
        if (la) {
          la.muted = f;
          try {
            await la.play(), ia.phase = "playing", ia.unsupported = null;
          } catch {
            ia.phase = "paused", ia.unsupported = "blocked";
          }
        }
      }
      ma() ? W() : oa();
    },
    pause(F = null) {
      for (const X of c.values())
        F && X.id !== F || X.el && (X.el.pause(), X.phase === "playing" && (X.phase = "paused"));
      (!F || !V()) && Z(), oa();
    },
    seek(F, X) {
      const na = c.get(P(o, F));
      if (na != null && na.el && Number.isFinite(X))
        try {
          na.el.currentTime = Math.max(0, X);
        } catch {
        }
    },
    setMuted(F) {
      f = F !== !1;
      for (const X of c.values())
        X.el && (X.el.muted = f);
    },
    /** 白板 `PlaybackCapability` 要的那点状态；整页粒度（不传 id）。 */
    state(F = null) {
      const X = d.get(o) || [];
      let na = !1, ia = 0, la = 0, ha = null;
      for (const ua of X) {
        if (F && ua.id !== F) continue;
        const ga = c.get(P(o, ua.id));
        ga && (ga.phase === "playing" && (na = !0), ga.unsupported && !ha && (ha = ga.unsupported), ga.el && (ia = Math.max(ia, ga.el.currentTime || 0), la = Math.max(la, Number.isFinite(ga.el.duration) ? ga.el.duration : 0)));
      }
      return { playing: na, time: ia, duration: la, muted: f, unsupported: ha };
    },
    /** 给宿主枚举用（工具栏要不要显示播放按钮）。 */
    list(F = o) {
      return (d.get(F) || []).map((na) => {
        const ia = c.get(P(F, na.id));
        return {
          id: na.id,
          kind: na.kind,
          name: String(na.part || "").split("/").pop(),
          unsupported: (ia == null ? void 0 : ia.unsupported) || null,
          // R105：封面自查口。`none` = 这份 pptx 里这条媒体**根本没有**封面部件
          //（那就是「seek 期间只能靠上一帧顶着」的语料）；`pending` = 有但还没解码完；
          // `ready` = 能用；`broken` = 有部件但字节取不到 / 图解码失败。
          poster: (ia == null ? void 0 : ia.posterState) || (na.posterPart ? "pending" : "none")
        };
      });
    },
    /**
     * R104：翻页（或开文档）时**问一次**就拿到这一页的音频全貌。
     *
     * ⭐ 与 `elements()` / `onElements()` 的关键区别：`hasMedia` 取自**解析期的元数据**
     * （`slide.media`），**不依赖这一页画过没、也不依赖元素延迟建了没**。所以宿主可以在
     * 第一帧出来之前就决定「这个课件要不要开一路音频上行」。
     *
     * @param {number} slideIndex
     * @param {Array} [media] 这一页的媒体元数据；不传就用运行时已登记的清单
     *   （那要求这一页已经画过。**渲染器那层会自己传**，宿主直接调 `pageInfo(page)`
     *   不需要关心这个参数）
     * @returns {{slideIndex:number, hasMedia:boolean, kinds:string[], elements:Array, track:MediaStreamTrack|null}}
     *   · `hasMedia` —— 决策用：这一页有没有音视频（⇒ 要不要开上行实例）
     *   · `elements` —— 活元素句柄（**没画过这一页时为空**，元素仍是延迟建的）
     *   · `track`    —— 那条**文档级**的汇总轨；⛔ 翻页不换轨，跨页恒等同一条
     *     （换一条 = 宿主换一次上行 = renegotiation）。没建轨时为 `null`。
     */
    pageInfo(F, X = null) {
      var ha;
      const na = Array.isArray(X) ? X : d.get(F) || [];
      Array.isArray(X) && Number.isInteger(F) && d.set(F, X);
      const ia = [];
      for (const ua of na)
        ua && ua.kind && !ia.includes(ua.kind) && ia.push(ua.kind);
      const la = [];
      for (const ua of na) {
        const ga = c.get(P(F, ua.id));
        !ga || !ga.el || la.push({
          id: ga.id,
          kind: ga.kind,
          element: ga.el,
          phase: ga.phase,
          unsupported: ga.unsupported,
          muted: !!ga.el.muted
        });
      }
      return {
        slideIndex: F,
        hasMedia: na.length > 0,
        kinds: ia,
        elements: la,
        track: ((ha = S == null ? void 0 : S.handle) == null ? void 0 : ha.track) || null
      };
    },
    /**
     * R103：**当前页**的媒体元素句柄（`HTMLVideoElement` / `HTMLAudioElement`）。
     *
     * 与 `list()` 的区别：`list()` 是元数据（可序列化，Worker 里也能用），这里是**活
     * 的元素**（只有主线程有）。宿主想自己接 WebAudio / 接别的分析器，从这里拿。
     *
     * ⛔ 元素是**延迟**建的（第一次画到这一页才取字节），所以刚开文档时这里常常是
     * 空数组 —— 请订阅 `onElements()`，不要只调一次。
     */
    elements() {
      return Q();
    },
    /**
     * R103：元素集合变化时回调（延迟加载 / 翻页 / 销毁），返回退订函数。
     *
     * ⛔ 订阅**当场**就会给一份当前快照：宿主往往在文档打开后才订阅，而那一刻元素
     * 可能已经建好了；不补这一次，宿主就永远等不到它。
     *
     * ⛔ 销毁时同样会回调一次 `[]` —— 那正是宿主该拆 WebAudio 接管的时刻（漏了就是
     * 「文档关了声音还在」）。
     */
    onElements(F) {
      if (typeof F != "function") return () => {
      };
      C.add(F);
      try {
        F(Q());
      } catch {
      }
      return () => C.delete(F);
    },
    /**
     * R103：把**这一页所有素材的声音汇总成一条 `MediaStreamTrack`** 交出去。
     *
     * 宿主拿它去建一路 AudioPlayer（一个窗口一个实例，与素材数无关）。翻页不换轨：
     * 轨在文档级，页与页之间只是元素进出图，于是**不触发 renegotiation**。
     *
     * @param {object} [options]
     * @param {AudioContext} options.audioContext 宿主的上下文（**必须**与宿主上行用的是同一个）
     * @returns {{track: MediaStreamTrack|null, elements: () => Array, dispose: () => void}|null}
     *   `null` = 已销毁 / 没给上下文 / 环境没有 WebAudio。
     *
     * ⛔ 一个文档只有一条轨：重复调用返回**同一个** handle（多建一条会让宿主多开一个
     * 上行实例）。
     */
    createAudioTrack(F = {}) {
      const X = F.audioContext || F.context;
      if (x || !X || typeof X.createMediaStreamDestination != "function") return null;
      if (S) return S.handle;
      const na = X.createMediaStreamDestination(), ia = X.createGain();
      ia.gain.value = 1, ia.connect(na);
      const la = { ctx: X, gain: ia, dst: na, sources: /* @__PURE__ */ new Map(), handle: null };
      S = la, f = !1;
      for (const ha of c.values())
        ha.el && (ha.el.muted = !1, Aa(ha));
      return la.handle = {
        track: na.stream.getAudioTracks()[0] || null,
        elements: () => Q(),
        dispose() {
          if (S === la) {
            S = null;
            for (const ha of la.sources.values())
              try {
                ha.disconnect();
              } catch {
              }
            la.sources.clear();
            try {
              la.gain.disconnect(), la.dst.disconnect();
            } catch {
            }
            for (const ha of la.dst.stream.getTracks())
              try {
                ha.stop();
              } catch {
              }
            f = !0;
            for (const ha of c.values())
              ha.el && (ha.el.muted = !0);
          }
        }
      }, la.handle;
    },
    /**
     * R102：只读命中测试（**不改任何状态**），坐标与 `pointer` 同口径。
     *
     * 两个用处：① 宿主想知道「指针此刻压在控件上吗」以便换光标 / 决定要不要把这次
     * 手势让给控件；② 测试据此定位控件，**不必复制一份几何**（复制几何等于给「画的
     * 按钮」和「能点的按钮」开第二个真源）。没渲染过的页返回 null —— 控件还没画出来，
     * 自然也点不到。
     *
     * ⛔ R110：这里**只报「控件命中」**（`part` 非空），**不报「悬停命中」** ——
     *   媒体区（视频画面 / 喇叭图标）内任意一点都会让控件亮起，若这里也跟着返回非
     *   null，宿主换光标的逻辑（白板 `hitMediaControl`）会把**整个视频区**都变成手型，
     *   而且「落在视频上」会被当成「落在控件上」，宿主的点击 / 拖窗手势会被自己挡掉。
     *   想让控件亮起来请转 `pointer({ phase: "move" })`，那是悬停唯一的入口。
     */
    hitTest(F) {
      if (x || !F) return null;
      const { x: X, y: na } = F;
      if (!Number.isFinite(X) || !Number.isFinite(na)) return null;
      const ia = Number.isInteger(F.slideIndex) ? F.slideIndex : o, la = sa(ia, X, na);
      return !la || !la.part ? null : { id: la.entry.id, part: la.part, ...la.ratio != null ? { ratio: la.ratio } : {} };
    },
    /**
      * R102：宿主把指针事件转进来 —— 这是帧内控件**唯一**需要宿主配合的地方。
      *
    * R109：`move` 现在**必须**转（不只转 `down`）。控件在「进场展示窗口」过后只留
    * **悬停项**，而悬停只有 `move` 能建立 / 取消：
    *   · `move` 命中 ⇒ 那一条立刻满不透明，且**一直留着**（悬停不过期）；
    *   · `move` 没命中 ⇒ 上一次的悬停被清掉，那一条淡出；
    *   · `leave` ⇒ 立刻收起全部（**推荐**：指针移出画布时坐标已不可信，命中不到任何
    *     窗口，`move` 这条路发不出来 —— 它是唯一的补漏通道）。
    *
    * R110：**「命中」= 指针落在媒体 `rect` 内**（画面 / 喇叭图标的整块），不要求压在
    * 控件条上；压在 play / mute / track 上才算「控件命中」（`hitTest` 报的那层）。
      * ⛔ 不转 `move` 的宿主：控件会在进场 `autoHideMs` 之后收起且**叫不回来**，
      *    这种宿主请传 `controls: "always"`。
      *
      * @param {object} event
      * @param {number} event.x **slide 逻辑坐标**（与 `slide.media[].rect` 同口径，不是屏幕/画布像素）
      * @param {number} event.y
      *   ⛔ `leave` **不需要**坐标（指针已经离开画布，宿主拿不到也**不该编**一个）：
      *      只带 `phase` 即可，带了的会被忽略。其余三个 phase 缺坐标 ⇒ 直接返回 false。
      * @param {"down"|"move"|"up"|"leave"} [event.phase="down"]
      * @param {number} [event.slideIndex] 默认当前页
      * @returns {boolean} true = 被控件消费，宿主**不要**再把它当窗口手势 / 动画点击处理
      *   （`move` 只在正在拖动进度条时才返回 true，否则会吃掉宿主的拖窗手势）
      */
    pointer(F) {
      if (x) return !1;
      const X = (F == null ? void 0 : F.phase) || "down";
      if (X === "leave")
        return A = null, w = null, b = 0, G(), O(), !1;
      const na = F == null ? void 0 : F.x, ia = F == null ? void 0 : F.y;
      if (!Number.isFinite(na) || !Number.isFinite(ia)) return !1;
      const la = Number.isInteger(F == null ? void 0 : F.slideIndex) ? F.slideIndex : o, ha = sa(la, na, ia, X !== "move"), ua = A;
      if (A = ha ? ha.entry.id : null, ha && (ha.entry.ctlAlpha = 1), ua && ua !== A && O(), X === "move")
        return w && ha && ha.entry.id === w && ha.part === "track" ? (ta(ha.entry, ha.ratio), oa(), !0) : (ha && oa(), !1);
      if (X === "up") {
        const ga = !!w;
        return w = null, ga && oa(), ga;
      }
      return !ha || !ha.part ? !1 : (ha.part === "play" ? ca(ha.entry) : ha.part === "mute" ? da.setMuted(!f) : ha.part === "track" && (w = ha.entry.id, ta(ha.entry, ha.ratio)), oa(), !0);
    },
    dispose() {
      if (!x) {
        x = !0, k(), Z(), G(), T = 0, A = null, w = null, typeof document < "u" && document.removeEventListener && document.removeEventListener("visibilitychange", j), S && S.handle.dispose();
        for (const F of c.values()) aa(F);
        c.clear(), i.clear(), U.clear(), d.clear();
        for (const F of Array.from(C))
          try {
            F([]);
          } catch {
          }
        C.clear();
      }
    }
  };
  return da;
}
function Ot(a, t, s, n) {
  if (!(!t || !s || !(s.width > 0) || !(s.height > 0)))
    try {
      a.drawImage(
        t,
        s.x * n,
        s.y * n,
        s.width * n,
        s.height * n
      );
    } catch {
    }
}
const Ie = 2048;
function Um(a, t, s) {
  const n = a.rect;
  if (!n || !(n.width > 0) || !(n.height > 0) || !(s > 0)) return;
  const e = Math.min(Ie, Math.max(1, Math.round(n.width * s))), r = Math.min(Ie, Math.max(1, Math.round(n.height * s)));
  let l = a.lastFrame;
  l || (l = document.createElement("canvas"), a.lastFrame = l), (l.width !== e || l.height !== r) && (l.width = e, l.height = r);
  const m = l.getContext("2d");
  if (m)
    try {
      m.clearRect(0, 0, e, r), m.drawImage(t, 0, 0, e, r);
    } catch {
    }
}
function De(a) {
  const t = a.posterImage;
  return !!(t && t.complete && t.naturalWidth > 0 && t.naturalHeight > 0);
}
function ft() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function Ha(a, t, s) {
  return a < t ? t : a > s ? s : a;
}
function wn(a, t, s) {
  return a >= s.x && a <= s.x + s.width && t >= s.y && t <= s.y + s.height;
}
function Ht(a, t, s, n, e, r) {
  const l = Math.max(0, Math.min(r, n / 2, e / 2));
  a.beginPath(), a.moveTo(t + l, s), a.lineTo(t + n - l, s), a.quadraticCurveTo(t + n, s, t + n, s + l), a.lineTo(t + n, s + e - l), a.quadraticCurveTo(t + n, s + e, t + n - l, s + e), a.lineTo(t + l, s + e), a.quadraticCurveTo(t, s + e, t, s + e - l), a.lineTo(t, s + l), a.quadraticCurveTo(t, s, t + l, s), a.closePath();
}
function Wm(a, t, s) {
  const n = a.rect || {}, e = Math.max(1, n.width || 0), r = Math.max(1, n.height || 0), l = a.kind === "audio", m = l ? Ha(r * _a.barRatio, _a.audioBarMinHeight, _a.barMax) : Ha(r * _a.barRatio, _a.barMin, _a.barMax), c = m * _a.pad, i = m * _a.btnRatio, d = l ? Math.max(e, _a.audioBarMinWidth) : Math.max(e, _a.minBarWidth), o = l ? (n.y || 0) + r + _a.audioBarGap : (n.y || 0) + r - m, x = Ha((n.x || 0) + e / 2 - d / 2, 0, Math.max(0, t - d)), f = Ha(o, 0, Math.max(0, s - m)), y = { x: x + c, y: f + (m - i) / 2, width: i, height: i }, u = l ? null : { x: x + d - c - i, y: f + (m - i) / 2, width: i, height: i }, p = Math.max(1.5, m * _a.trackRatio), A = Math.max(p, c), w = l ? i * 0.28 : 0, b = (u ? u.x - c : x + d - c - w) - A, L = {
    x: y.x + i + A,
    y: f + (m - p) / 2,
    width: Math.max(4, b - (y.x + i + A)),
    height: p
  };
  return { x, y: f, width: d, height: m, pad: c, play: y, mute: u, track: L, knob: A };
}
function Gm(a, t, s, n, e) {
  const r = n > 0 ? n : 1;
  a.save(), a.globalAlpha = Ha(e, 0, 1), a.fillStyle = "rgba(18,18,18,0.62)", Ht(a, s.x * r, s.y * r, s.width * r, s.height * r, s.height * 0.22 * r), a.fill(), Vm(a, s.play, r, t.phase === "playing");
  const l = t.el, m = l && Number.isFinite(l.duration) ? l.duration : 0, c = m > 0 ? Ha((l.currentTime || 0) / m, 0, 1) : 0, i = s.track;
  a.fillStyle = "rgba(255,255,255,0.30)", Ht(a, i.x * r, i.y * r, i.width * r, i.height * r, i.height / 2 * r), a.fill(), c > 0 && (a.fillStyle = "#ffffff", Ht(a, i.x * r, i.y * r, i.width * c * r, i.height * r, i.height / 2 * r), a.fill()), a.beginPath(), a.arc(
    (i.x + i.width * c) * r,
    (i.y + i.height / 2) * r,
    s.knob * r,
    0,
    Math.PI * 2
  ), a.fillStyle = "#ffffff", a.fill(), s.mute && Ym(a, s.mute, r, Xm(t)), a.restore();
}
function Xm(a) {
  return a.el ? !!a.el.muted : !0;
}
function Vm(a, t, s, n) {
  const e = t.x * s, r = t.y * s, l = t.width * s, m = t.height * s;
  if (a.fillStyle = "#ffffff", n) {
    const c = l * 0.26, i = l * 0.2, d = e + (l - c * 2 - i) / 2;
    a.fillRect(d, r + m * 0.18, c, m * 0.64), a.fillRect(d + c + i, r + m * 0.18, c, m * 0.64);
    return;
  }
  a.beginPath(), a.moveTo(e + l * 0.28, r + m * 0.16), a.lineTo(e + l * 0.82, r + m * 0.5), a.lineTo(e + l * 0.28, r + m * 0.84), a.closePath(), a.fill();
}
const Te = {
  on: [
    "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
    "M16 9a5 5 0 0 1 0 6",
    "M19.364 18.364a9 9 0 0 0 0-12.728"
  ].join(" "),
  off: [
    "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
    "M22 9 16 15",
    "M16 9 22 15"
  ].join(" ")
};
let An = null;
function Be() {
  return An || (An = {
    on: new Path2D(Te.on),
    off: new Path2D(Te.off)
  }), An;
}
function Ym(a, t, s, n) {
  const e = t.width * s, r = t.height * s, l = Math.min(e, r), m = l / 24;
  a.save(), a.translate(t.x * s + (e - l) / 2, t.y * s + (r - l) / 2), a.scale(m, m), a.strokeStyle = "#ffffff", a.lineWidth = 2.2, a.lineCap = "round", a.lineJoin = "round", a.stroke(n ? Be().off : Be().on), a.restore();
}
function Km(a, t, s) {
  if (!t) return;
  const n = s > 0 ? s : 1, e = "Unplayable", r = Math.max(9, t.height * 0.34);
  a.save(), a.font = `${r}px sans-serif`, a.textBaseline = "middle";
  const l = r * 0.5, m = a.measureText(e).width + l * 2, c = r * 1.7;
  a.fillStyle = "rgba(18,18,18,0.72)", Ht(a, t.x * n, t.y * n, m * n, c * n, c * 0.2 * n), a.fill(), a.fillStyle = "rgba(255,255,255,0.85)", a.fillText(e, (t.x + l) * n, (t.y + c / 2) * n), a.restore();
}
function bn(a, t) {
  return t === a || a.contains(t);
}
function vn(a, t) {
  var r;
  const s = String(t.spid), n = '[data-source="slide"][data-spid]', e = (r = a.matches) != null && r.call(a, n) && a.getAttribute("data-spid") === s ? a : Array.from(a.querySelectorAll(n)).find((l) => l.getAttribute("data-spid") === s);
  return e ? !t.textRange || t.textRange.kind !== "paragraph" ? [e] : Array.from(e.querySelectorAll("[data-text-paragraph]")).filter((l) => {
    const m = Number(l.getAttribute("data-text-paragraph"));
    return m >= t.textRange.start && m <= t.textRange.end;
  }) : [];
}
function Qm(a) {
  const t = [];
  for (const s of a) {
    if (String(s.tagName || "").toLowerCase() === "text") {
      t.push(s);
      continue;
    }
    const n = Array.from(s.querySelectorAll("text"));
    n.length ? t.push(...n) : t.push(s);
  }
  return t;
}
function Jm(a) {
  const t = [];
  for (const s of a) {
    const n = String(s.tagName || "").toLowerCase() === "text" ? [s] : Array.from(s.querySelectorAll("text"));
    for (const e of n) {
      if (e.getAttribute("data-iterate-split") === "1") {
        t.push(...Array.from(e.querySelectorAll("tspan")));
        continue;
      }
      const r = Array.from(e.querySelectorAll("tspan")), l = r.length ? r.flatMap((m) => {
        const c = nn(m.textContent || "");
        return c.length <= 1 ? [m] : c.map((i) => {
          const d = m.cloneNode(!1);
          return d.textContent = i, d;
        });
      }) : nn(e.textContent || "").map((m) => {
        const c = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        return c.textContent = m, c;
      });
      e.replaceChildren(...l), e.setAttribute("data-iterate-split", "1"), t.push(...l);
    }
  }
  return t;
}
function Ln(a, t) {
  return t && t !== "lt" ? Jm(a) : Qm(a);
}
function ac(a, { step: t = 0, timeMs: s = null } = {}) {
  const n = Array.isArray(a == null ? void 0 : a.steps) ? a.steps : [], e = Math.max(0, Math.min(n.length, Math.floor(Number(t) || 0))), r = s != null && e < n.length ? [e] : [], l = [...Array(e).keys(), ...r], m = [];
  for (const c of l)
    for (const i of n[c] || [])
      i.mediaCmd && m.push({
        stepIndex: c,
        targetId: i.targetId,
        spid: i.spid,
        ...i.mediaCmd
      });
  return m;
}
function tc(a, { step: t = 0, timeMs: s = null } = {}) {
  const n = Array.isArray(a == null ? void 0 : a.steps) ? a.steps : [], e = Math.max(0, Math.min(n.length, Math.floor(Number(t) || 0))), r = s != null && e < n.length ? [e] : [], l = [...Array(e).keys(), ...r], m = [];
  for (const c of l)
    for (const i of n[c] || [])
      for (const d of i.audio || [])
        m.push({
          stepIndex: c,
          targetId: i.targetId,
          spid: i.spid,
          ...d
        });
  return m;
}
function nc(a = {}) {
  const { root: t, animation: s, width: n, height: e, onStateChange: r, onUnsupportedEffect: l, onMediaCommand: m } = a;
  if (!t || typeof t.querySelector != "function")
    throw new TypeError("createSlidePlayer requires an SVG root element");
  if (!s || !Array.isArray(s.steps) || !Array.isArray(s.targets))
    throw new TypeError("createSlidePlayer requires parsed slide animation data");
  if (!(Number(n) > 0) || !(Number(e) > 0))
    throw new TypeError("createSlidePlayer requires positive slide dimensions");
  const c = new Map((s.targets || []).map((V) => [V.targetId, V])), i = (s.steps || []).map(
    (V) => V.map((K) => {
      var h;
      if (!Rt(K)) return K;
      const ya = c.get(K.targetId) || K, ma = Ln(vn(t, ya), (h = K.iterate) == null ? void 0 : h.type);
      return ma.length > 1 ? { ...K, iterate: { ...K.iterate, unitCount: ma.length } } : K;
    })
  ), d = { ...s, steps: i }, o = s.steps.length;
  let x = 0, f = !1, y = !1, u = 0, p = !1, A = !1;
  const w = /* @__PURE__ */ new Set(), b = /* @__PURE__ */ new Set(), L = () => r == null ? void 0 : r({ currentStep: x, stepCount: o, busy: f }), v = (V) => !y && V === u;
  function T(V) {
    return new Promise((K) => {
      const ya = { resolve: K };
      ya.timer = setTimeout(() => {
        b.delete(ya), K();
      }, V), b.add(ya);
    });
  }
  function C() {
    for (const V of b)
      clearTimeout(V.timer), V.resolve();
    b.clear();
  }
  function S() {
    for (const V of w) V.cancel();
    w.clear();
  }
  function q(V, K) {
    for (const ya of V)
      bn(t, ya) && (ya.style.visibility = K ? "visible" : "hidden");
  }
  function R(V) {
    V.getAnimations().forEach((K) => K.cancel()), V.style.opacity = "", V.style.clipPath = "", V.style.maskImage = "", V.style.transform = "", V.style.translate = "", V.style.rotate = "", V.style.scale = "", V.style.transformBox = "", V.style.transformOrigin = "";
  }
  function k(V) {
    var K, ya;
    for (const ma of c.values()) {
      const h = vn(t, ma), W = V.get(ma.targetId);
      if (!W || !h.length) continue;
      const Z = Array.isArray((K = W.iterate) == null ? void 0 : K.unitProgress) ? W.iterate.unitProgress : null, j = Z ? Ln(h, (ya = W.iterate) == null ? void 0 : ya.type) : null;
      for (const M of h) {
        if (!bn(t, M)) continue;
        R(M);
        for (const Y of M.querySelectorAll("text, tspan"))
          Y.style.opacity !== "" && (Y.style.opacity = "");
        M.style.visibility = W.visible ? "visible" : "hidden", M.style.opacity = Z || W.opacity >= 1 ? "" : String(W.opacity), M.style.clipPath = W.clipPath || "", M.style.maskImage = W.maskImage || "", M.style.translate = W.translateX || W.translateY ? D(W.translateX, W.translateY) : "";
        const $ = Number(W.scaleX ?? 1), z = Number(W.scaleY ?? 1), G = Number(W.rotate ?? 0);
        if ($ !== 1 || z !== 1 || G !== 0) {
          const Y = N(M);
          Y ? M.style.transformOrigin = `${Y.x}px ${Y.y}px` : (M.style.transformBox = "fill-box", M.style.transformOrigin = "center");
        }
        M.style.scale = $ === 1 && z === 1 ? "" : `${$} ${z}`, M.style.rotate = G ? `${G}deg` : "";
      }
      if (j)
        for (let M = 0; M < j.length; M += 1) {
          const $ = Z[M] ?? 1;
          j[M].style.opacity = $ >= 1 ? "" : String($);
        }
    }
  }
  function g(V, { ignoreExits: K = !1, ignorePaths: ya = !1 } = {}) {
    k(
      sn(d, { step: V, ignoreExits: K, ignorePaths: ya })
    );
  }
  function P(V) {
    if (y) throw new Error("slide player already disposed");
    if (typeof V != "number" || !Number.isFinite(V))
      throw new TypeError("sampleAt requires a finite time in milliseconds");
    k(
      sn(d, {
        step: x,
        timeMs: V,
        ignoreExits: p,
        ignorePaths: A
      })
    );
  }
  function E() {
    y || (u += 1, C(), S(), f = !1, g(x, {
      ignoreExits: p,
      ignorePaths: A
    }), L());
  }
  function I(V, K = {}) {
    p = !!K.ignoreExits, A = !!K.ignorePaths, g(V, K), x = V, L();
  }
  function U(V, K = {}) {
    if (y) throw new Error("slide player already disposed");
    if (!Number.isInteger(V) || V < 0 || V > o)
      throw new RangeError(`step ${V} is out of range (0..${o})`);
    E(), I(V, K);
  }
  function D(V = 0, K = 0) {
    return `${V * Number(n)}px ${K * Number(e)}px`;
  }
  function N(V) {
    var ya, ma;
    try {
      const h = (ya = V.getBBox) == null ? void 0 : ya.call(V);
      if (h && h.width > 0 && h.height > 0)
        return { x: h.x + h.width / 2, y: h.y + h.height / 2 };
    } catch {
    }
    const K = (ma = V.querySelector) == null ? void 0 : ma.call(V, "clipPath rect, clipPath > rect");
    if (K) {
      const h = Number(K.getAttribute("x")) || 0, W = Number(K.getAttribute("y")) || 0, Z = Number(K.getAttribute("width")) || 0, j = Number(K.getAttribute("height")) || 0;
      if (Z > 0 && j > 0) return { x: h + Z / 2, y: W + j / 2 };
    }
    return null;
  }
  async function B(V, K) {
    const ya = await Promise.allSettled(V.map((h) => h.finished));
    if (V.forEach((h) => w.delete(h)), !v(K)) return !1;
    const ma = ya.find((h) => h.status === "rejected");
    if (ma) throw ma.reason;
    return !0;
  }
  async function _(V, K, { duration: ya, iterations: ma, token: h }) {
    const W = Math.max(1, Math.min(Zn, Number(K.duration) || ya)), Z = K.keyframes.map((M) => ({ at: Math.min(1, Math.max(0, M.at)), value: M.value })).sort((M, $) => M.at - $.at), j = Z.at(-1).value;
    for (let M = 0; M < ma; M += 1) {
      let $ = 0;
      for (const G of Z) {
        const O = Math.round(G.at * W);
        if (O > $ && (await T(O - $), $ = O), !v(h)) return;
        q(V, G.value === "visible");
      }
      const z = W - $;
      if (z > 0 && await T(z), !v(h)) return;
    }
    q(V, j === "visible");
  }
  function J(V, K) {
    for (const ya of V)
      bn(t, ya) && (ya.style.maskImage = K || "");
  }
  async function aa(V, K, { duration: ya, iterations: ma, token: h }) {
    const W = K.presetClass === "exit";
    for (let Z = 0; Z < ma; Z += 1) {
      let j = 0;
      for (let $ = 0; $ <= za; $ += 1) {
        const z = Math.round($ / za * ya);
        if (z > j && (await T(z - j), j = z), !v(h)) return;
        const G = an($ / za);
        J(V, Ps(K.filter, W ? 1 - G : G, K.targetId));
      }
      const M = ya - j;
      if (M > 0 && await T(M), !v(h)) return;
    }
  }
  function Q(V, K, { iterations: ya, token: ma }) {
    return new Promise((h) => {
      const W = ct(K), Z = Math.max(1, W * ya), j = performance.now();
      let M = 0;
      const $ = () => {
        for (const O of V) O.style.opacity = "";
      }, z = () => {
        M && cancelAnimationFrame(M), $(), h();
      }, G = (O) => {
        if (!v(ma)) {
          M && cancelAnimationFrame(M), $(), h();
          return;
        }
        const Y = Math.min(Z, O - j), sa = ya > 1 ? Y % W : Y;
        for (let ta = 0; ta < V.length; ta += 1) {
          const ca = Os(K, ta, sa);
          V[ta].style.opacity = ca >= 1 ? "" : String(ca);
        }
        if (Y >= Z) {
          z();
          return;
        }
        M = requestAnimationFrame(G);
      };
      M = requestAnimationFrame(G);
    });
  }
  async function pa(V, K) {
    var ca, oa;
    if (!v(K)) return;
    if (V.mediaCmd) {
      m == null || m({ stepIndex: x, targetId: V.targetId, spid: V.spid, ...V.mediaCmd });
      return;
    }
    const ya = c.get(V.targetId) || V, ma = vn(t, ya);
    if (!ma.length) return;
    const h = Va(V), W = $t(V), Z = V.motion || {};
    V.repeatIndefinite && (l == null || l({ effect: V, reason: "Indefinite repeat is not simulated; playing once" })), (ca = Z.unresolved) != null && ca.length && (l == null || l({ effect: V, reason: `Unresolved motion coordinate: ${Z.unresolved.join(", ")}` }));
    const j = (da, F, X) => {
      const na = da.animate(F, X);
      return w.add(na), na;
    }, M = (da) => {
      for (const F of da)
        w.delete(F), F.cancel();
    }, $ = St(V);
    if ($) {
      l == null || l({ effect: V, reason: $ }), V.presetClass === "entr" && q(ma, !0), V.presetClass === "exit" && q(ma, !1);
      return;
    }
    const z = Hn(V);
    if (z && V.presetClass !== "entr" && V.presetClass !== "exit") {
      await _(ma, z, { duration: h, iterations: W, token: K });
      return;
    }
    if (V.presetClass === "path" && Mt(V)) {
      const da = Mt(V), F = 24, X = [];
      for (let ia = 0; ia <= F; ia += 1) {
        const la = ia / F, ha = qs(V, Ns(la, da.accel, da.decel));
        X.push({ translate: D(ha.x, ha.y), offset: la });
      }
      const na = ma.map((ia) => j(ia, X, { duration: h, iterations: W, easing: "linear", fill: "forwards" }));
      if (!await B(na, K) || !v(K)) return;
      M(na);
      return;
    }
    const G = V.presetClass === "entr", O = V.filter || "", Y = O.includes("fade");
    q(ma, !0);
    const sa = Ln(ma, (oa = V.iterate) == null ? void 0 : oa.type);
    if (Rt(V) && sa.length > 1) {
      q(ma, !0);
      for (const da of sa) da.style.opacity = "0";
      if (await Q(sa, V, { iterations: W, token: K }), !v(K)) return;
      q(ma, G);
      return;
    }
    if (h <= 10 || G && V.presetId === "1") {
      q(ma, G), J(ma, null);
      return;
    }
    if (Bs(O)) {
      if (await aa(ma, V, { duration: h, iterations: W, token: K }), !v(K)) return;
      q(ma, G), J(ma, null);
      return;
    }
    const ta = ma.map((da) => {
      const F = getComputedStyle(da).opacity, X = tn(O, G ? 0 : 1, G) ?? "none", na = tn(O, G ? 1 : 0, G) ?? "none", ia = G ? [
        { opacity: Y ? 0 : F, translate: D(Z.fromX, Z.fromY), clipPath: X },
        { opacity: F, translate: D(Z.toX, Z.toY), clipPath: na }
      ] : [
        { opacity: F, translate: D(Z.fromX, Z.fromY), clipPath: X },
        { opacity: Y ? 0 : F, translate: D(Z.toX, Z.toY), clipPath: na }
      ];
      return j(da, ia, {
        duration: h,
        iterations: W,
        easing: G ? "ease-out" : "ease-in",
        fill: "forwards"
      });
    });
    await B(ta, K) && v(K) && (M(ta), q(ma, G));
  }
  async function Aa() {
    if (y) throw new Error("slide player already disposed");
    if (f || x >= o) return !1;
    const V = ++u;
    f = !0, L();
    const K = i[x] || [], ya = async ({ effect: ma, start: h }) => {
      h > 0 && await T(h), v(V) && await pa(ma, V);
    };
    try {
      return await Promise.all(en(K).map(ya)), v(V) ? (x += 1, g(x, {
        ignoreExits: p,
        ignorePaths: A
      }), L(), !0) : !1;
    } catch (ma) {
      if (v(V))
        throw u += 1, C(), S(), f = !1, L(), ma;
      return !1;
    } finally {
      v(V) && (f = !1, L());
    }
  }
  function xa() {
    U(o, { ignoreExits: !0, ignorePaths: !0 });
  }
  function wa() {
    y || (E(), y = !0);
  }
  return {
    get stepCount() {
      return o;
    },
    get currentStep() {
      return x;
    },
    get busy() {
      return f;
    },
    playStep: Aa,
    seekStep: U,
    sampleAt: P,
    showStatic: xa,
    cancel: E,
    dispose: wa
  };
}
const ec = Object.freeze({
  ArrowRight: "next",
  ArrowDown: "next",
  ArrowLeft: "prev",
  ArrowUp: "prev"
});
function sc(a, t = {}) {
  const { enabled: s = !0, targetIsEditable: n = !1, shouldHandle: e } = t;
  return !s || !a || typeof a.key != "string" || a.repeat || a.ctrlKey || a.metaKey || a.altKey || a.shiftKey || a.defaultPrevented || a.isComposing || a.keyCode === 229 || n || typeof e == "function" && !e() ? null : a.key;
}
function rc(a, t = {}) {
  const s = sc(a, t);
  return s ? ec[s] ?? null : null;
}
function lc(a) {
  if (!a || typeof a != "object") return !1;
  const t = a.nodeType === 3 ? a.parentElement : a;
  return t ? typeof t.closest == "function" ? !!t.closest("input, textarea, select, [contenteditable], [role='textbox']") : !!t.isContentEditable : !1;
}
function mc(a = {}) {
  const { target: t, enabled: s = !0, shouldHandle: n, onNext: e, onPrev: r } = a, l = t ?? (typeof document < "u" ? document : null);
  if (!l || typeof l.addEventListener != "function")
    throw new Error("[ppt-sdk] createKeyboardNavigation requires a DOM event target");
  let m = s;
  const c = (i) => {
    const d = rc(i, {
      enabled: m,
      targetIsEditable: lc(i.target),
      shouldHandle: n
    });
    d && (i.preventDefault(), d === "next" ? e == null || e() : r == null || r());
  };
  return l.addEventListener("keydown", c), {
    setEnabled(i) {
      m = !!i;
    },
    get enabled() {
      return m;
    },
    dispose() {
      l.removeEventListener("keydown", c);
    }
  };
}
function cc(a) {
  var e;
  const t = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), n = { line: t, word: s };
  if (!a || typeof DOMParser > "u") return n;
  try {
    const r = new DOMParser().parseFromString(a, "image/svg+xml");
    if (((e = r.documentElement) == null ? void 0 : e.localName) === "parsererror") return n;
    for (const l of r.querySelectorAll('[data-source="slide"][data-spid]')) {
      const m = l.getAttribute("data-spid");
      if (m === null) continue;
      const c = Array.from(l.querySelectorAll("text"));
      t.set(m, c.length);
      let i = 0;
      for (const d of c) {
        const o = Array.from(d.querySelectorAll("tspan"));
        if (o.length)
          for (const x of o) i += nn(x.textContent || "").length;
        else
          i += nn(d.textContent || "").length;
      }
      s.set(m, i);
    }
  } catch {
    return { line: /* @__PURE__ */ new Map(), word: /* @__PURE__ */ new Map() };
  }
  return n;
}
const ic = 2, zs = 24;
function Cc() {
  return { open: oc, createKeyboardNavigation: mc };
}
async function oc(a, t = {}) {
  var u, p, A;
  const s = t.signal;
  if (s != null && s.aborted) throw Nt(s);
  const n = await Ls(pc(a), {
    // 惰性解析：只建索引，页在 renderSlide 时才解析并缓存（并发去重）
    lazy: !0
  });
  if (s != null && s.aborted) throw Nt(s);
  const e = Math.max(0, Math.floor(n.slideCount ?? ((u = n.slides) == null ? void 0 : u.length) ?? 0)), r = ((p = n.size) == null ? void 0 : p.width) ?? 0, l = ((A = n.size) == null ? void 0 : A.height) ?? 0;
  if (e <= 0) throw new Error("PPTX 中没有幻灯片");
  if (!(r > 0) || !(l > 0)) throw new Error("PPTX 未声明页面尺寸");
  let m = !1;
  const c = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  let o = -1, x = null;
  const f = t.media === !1 || typeof document > "u" ? null : Hm(n, {
    onFrame: () => {
      x && x();
    },
    // R102：帧内控件。`never` = 一个像素都不画（宿主自己叠控件 / 要干净的导出图）
    controls: t.mediaControls === "always" || t.mediaControls === "never" ? t.mediaControls : "auto"
  });
  function y(w, b, L, v) {
    var R, k, g, P, E, I, U;
    const { animationStep: T, animationTimeMs: C } = v;
    if (T == null) return;
    const S = Math.max(0, Math.floor(Number(T) || 0));
    d.set(w, S);
    const q = C === void 0 ? null : C;
    for (const D of ac(b == null ? void 0 : b.animation, { step: S, timeMs: q })) {
      const N = `${w}:${D.stepIndex}:${D.spid}:${D.raw}`;
      if (i.has(N)) continue;
      i.set(N, !0);
      const B = L.find((_) => String(_.spid) === String(D.spid));
      if (!B) {
        (k = (R = n.diagnostics) == null ? void 0 : R.add) == null || k.call(R, {
          code: "media.command-target-missing",
          severity: "warn",
          scope: { slide: w, spid: D.spid },
          message: `媒体命令 ${D.raw} 找不到 spid=${D.spid} 对应的媒体`
        });
        continue;
      }
      if (D.action === "pause" || D.action === "stop") {
        f.pause(B.id), D.action === "stop" && f.seek(B.id, 0);
        continue;
      }
      if (D.action === "togglePause") {
        f.state(B.id).playing ? f.pause(B.id) : f.play(B.id);
        continue;
      }
      if (D.action === "play" || D.action === "playFrom") {
        (g = f.reveal) == null || g.call(f), Promise.resolve(f.play(B.id)).then(() => {
          D.action === "playFrom" && D.seconds > 0 && f.seek(B.id, D.seconds);
        });
        continue;
      }
      (E = (P = n.diagnostics) == null ? void 0 : P.add) == null || E.call(P, {
        code: "media.command-unsupported",
        severity: "warn",
        scope: { slide: w, spid: D.spid },
        message: `未支持的媒体命令 ${D.raw}`
      });
    }
    for (const D of tc(b == null ? void 0 : b.animation, { step: S, timeMs: q })) {
      const N = `${w}:${D.stepIndex}:audio:${D.part}`;
      if (!i.has(N)) {
        if (i.set(N, !0), typeof f.playSound != "function") {
          (U = (I = n.diagnostics) == null ? void 0 : I.add) == null || U.call(I, {
            code: "animation.audio-no-runtime",
            severity: "warn",
            scope: { slide: w, part: D.part },
            message: "媒体运行时不支持动画音效"
          });
          continue;
        }
        Promise.resolve(f.playSound(D)).then((B) => {
          var _, J;
          B && B.ok === !1 && ((J = (_ = n.diagnostics) == null ? void 0 : _.add) == null || J.call(_, {
            code: "animation.audio-play-failed",
            severity: "warn",
            scope: { slide: w, part: D.part },
            message: `动画音效起播失败：${B.reason}`
          }));
        }).catch((B) => {
          var _, J;
          (J = (_ = n.diagnostics) == null ? void 0 : _.add) == null || J.call(_, {
            code: "animation.audio-play-failed",
            severity: "warn",
            scope: { slide: w, part: D.part },
            message: String((B == null ? void 0 : B.message) || B)
          });
        });
      }
    }
  }
  return {
    slideCount: e,
    slideWidth: r,
    slideHeight: l,
    /**
     * 资源账目（R9.2「可观测账目放在实例上」）——透传引擎的 `resourceStats()`。
     *
     * 为什么薄适配层也要暴露：白板唯一能碰到的对象就是这个返回值，不暴露的话
     * 「换文档 / 关窗口之后 part 缓存到底有没有放掉」只能靠猜。它是 **只读诊断口**，
     * 不改变任何渲染语义；引擎没有该能力时返回 null（不抛错，诊断不该拖垮主流程）。
     */
    resourceStats() {
      var w;
      return ((w = n.resourceStats) == null ? void 0 : w.call(n)) ?? null;
    },
    /**
     * R94：媒体（视频 / 音频）。老契约没有这个字段，宿主判空即可（向后兼容）。
     *
     * 形状与白板 `PlaybackCapability` 对齐：`isPlaying()` ↔ `state().playing`、
     * `setPlaying(b)` ↔ `play()/pause()`。
     */
    media: f && {
      list: (w) => f.list(w),
      play: (w = null) => f.play(w),
      pause: (w = null) => f.pause(w),
      seek: (w, b) => f.seek(w, b),
      setMuted: (w) => f.setMuted(w),
      state: (w = null) => f.state(w),
      /**
       * R102：帧内控件的指针入口（可选）。宿主把点击/移动的 **slide 逻辑坐标** 转进来，
       * 返回 true = 被控件消费，宿主就别再把它当窗口手势或动画点击处理。
       * 不转也行 —— 控件照常显示，只是不能点（远端观看 / 纯展示场景）。
       */
      hitTest: (w) => f.hitTest(w),
      pointer: (w) => f.pointer(w),
      /**
       * R103：元素句柄与音频出口（可选）。宿主拿它们把 PPT 的声音接进自己的上行：
       *   · `elements()` —— 当前页活着的 `<video>` / `<audio>`（延迟建，配合 `onElements`）
       *   · `onElements(cb)` —— 元素集合变化（延迟加载 / 翻页 / 销毁）时回调，销毁时给 `[]`
       *   · `createAudioTrack({ audioContext })` —— 页内素材**汇总成一条轨**（一个窗口一个
       *     上行实例，翻页不换轨 ⇒ 不 renegotiation）
       */
      elements: () => f.elements(),
      onElements: (w) => f.onElements(w),
      createAudioTrack: (w) => f.createAudioTrack(w),
      /**
       * R104：翻页（或开文档）时**问一次**这一页的音频全貌
       * ⇒ `{ hasMedia, kinds, elements, track }`。
       *
       * ⭐ 与 `elements()` 的区别：`hasMedia` 取自**解析期元数据**，不依赖这一页画过没、
       * 也不依赖元素延迟建了没 —— 宿主可以**在第一帧出来之前**就决定要不要开音频上行，
       * 不必订阅 `onElements` 等元素冒出来。
       *
       * ⛔ `track` 恒等同一条（文档级），翻页不换轨 ⇒ 不 renegotiation。
       *
       * @param {number} index 页号（必填：渲染器不跟踪「当前页」）
       * @returns {Promise<{slideIndex:number,hasMedia:boolean,kinds:string[],elements:Array,track:MediaStreamTrack|null}>}
       */
      async pageInfo(w) {
        if (!Number.isInteger(w) || w < 0 || w >= e)
          throw new RangeError(`slide ${w} 越界：共 ${e} 页`);
        const b = await n.getSlide(w);
        return f.pageInfo(w, Array.isArray(b == null ? void 0 : b.media) ? b.media : []);
      }
    },
    /**
     * R94：引擎有新视频帧 ⇒ 请宿主重画当前页（返回退订函数）。
     *
     * 宿主接到后只要调一次「按当前页 + 当前比例再请求一次呈现」即可——
     * 白板的 `PaintLoop` 本来就会合并请求、只提交最新那份，30fps 照样稳。
     */
    onFrame(w) {
      return typeof w != "function" ? () => {
      } : (x = w, () => {
        x === w && (x = null);
      });
    },
    /**
     * 这一页的动画全貌（R107）：步数 + **每一步的触发元信息** + 初始隐藏对象 + 目标清单。
     *
     * 白板要「下一步」得先知道总步数；要知道「这一步该等用户点击还是 delay 到了自动
     * 推进」还得知道每步的触发类型 / 延迟 / 时长。这些都只有解析结果知道 —— 让调用方
     * 去猜「步数是不是等于形状数」或「是不是一律等点击」都会错。
     *
     * ⛔ `stepCount` 是老字段，位置与语义不变（宿主判空 / 取步数的老代码不受影响）。
     *
     * @returns {Promise<{stepCount:number, initialHidden:string[], targets:Array<object>,
     *   steps:Array<{index:number, trigger:string, delay:number, duration:number,
     *   targetIds:string[], effects:Array<object>}>}>}
     */
    async slideAnimation(w) {
      var C, S;
      if (m) throw new Error("ppt document already disposed");
      if (!Number.isInteger(w) || w < 0 || w >= e)
        throw new RangeError(`slide ${w} 越界：共 ${e} 页`);
      const b = await n.getSlide(w), L = b == null ? void 0 : b.animation, v = Array.isArray(L == null ? void 0 : L.steps) ? L.steps : [];
      let T = L;
      if (v.some((q) => q.some((R) => R == null ? void 0 : R.iterate)))
        try {
          const q = cc(Dn(b, n.defs));
          q.line.size && (T = {
            ...L,
            steps: v.map((R) => R.map((k) => {
              var E;
              const g = (E = k.iterate) != null && E.type && k.iterate.type !== "lt" ? q.word : q.line, P = k != null && k.iterate ? g.get(String(k.spid)) : 0;
              return P > 1 ? { ...k, iterate: { ...k.iterate, unitCount: P } } : k;
            }))
          });
        } catch (q) {
          (S = (C = n.diagnostics) == null ? void 0 : C.add) == null || S.call(C, {
            code: "animation.unit-count-probe-failed",
            severity: "warn",
            scope: { slide: w },
            message: `逐单元步时长探测失败：${String((q == null ? void 0 : q.message) || q)}`
          });
        }
      return {
        stepCount: v.length,
        initialHidden: Array.isArray(L == null ? void 0 : L.initialHidden) ? L.initialHidden : [],
        targets: Array.isArray(L == null ? void 0 : L.targets) ? L.targets : [],
        steps: Om(T)
      };
    },
    async renderSlide(w, b = {}) {
      if (m) throw new Error("ppt document already disposed");
      if (!Number.isInteger(w) || w < 0 || w >= e)
        throw new RangeError(`slide ${w} 越界：共 ${e} 页`);
      const { scale: L = 1, signal: v, animationStep: T, animationTimeMs: C, activate: S = !0 } = b;
      if (v != null && v.aborted) throw Nt(v);
      const q = await n.getSlide(w);
      if (m) throw new Error("ppt document already disposed");
      const R = Array.isArray(q.media) ? q.media : [];
      if (f && S) {
        f.setActive(w, R);
        const pa = T == null ? null : Math.max(0, Math.floor(Number(T) || 0)), Aa = d.get(w), xa = o !== w, wa = !xa && pa !== null && Aa !== void 0 && pa < Aa, V = pa === 0 && (xa || Aa !== void 0 && Aa > 0);
        if (o = w, wa || V)
          for (const K of i.keys()) {
            const ya = K.split(":");
            ya[0] === String(w) && Number(ya[1]) >= (pa ?? 0) && i.delete(K);
          }
        wa ? d.set(w, pa) : y(w, q, R, b);
      }
      const k = T != null, g = C != null, P = Number(C);
      if (g && (!Number.isFinite(P) || P < 0))
        throw new TypeError(`animationTimeMs 需要非负有限毫秒数，收到 ${String(C)}`);
      const E = k ? Math.max(0, Math.floor(Number(T) || 0)) : null, U = E !== null && (!g || Fe(q.animation, E)) ? E : null, D = f && R.length && (!k || U !== null) ? f.plateFor(w, L, U) : null, N = () => Dn(q, n.defs), B = k && g && !D && !Fe(q.animation, E);
      let _ = null;
      if (B) {
        Rn(c, w, L, q, T, P, N, r, l, !0);
        const pa = c.get(`${w}:${L}`);
        pa && (_ = await hc(pa, E, q.animation, v));
      }
      D && k && Rn(c, w, L, q, T, g ? P : null, N, r, l, !0);
      const J = _ || D ? null : k ? Rn(c, w, L, q, T, g ? P : null, N, r, l) : N();
      if (k && !g && c.has(`${w}:${L}`) && dc(c, w, L, q, n.diagnostics), v != null && v.aborted) throw Nt(v);
      const aa = f && R.length ? Nm(k ? q.animation : null, R, {
        step: Math.max(0, Math.floor(Number(T) || 0)),
        timeMs: g ? P : null,
        width: r,
        height: l
      }) : null, Q = f && R.length ? (pa, Aa) => f.paintInto(pa, {
        slideIndex: w,
        media: R,
        animated: k,
        ...Aa,
        activate: S,
        plateStep: U,
        ...aa ? { items: aa } : {}
      }) : void 0;
      return Fr(J, {
        width: r,
        height: l,
        scale: L,
        ...D ? { plate: D } : {},
        ..._ ? { layers: _ } : {},
        ...Q ? { decorate: Q } : {},
        ...v ? { signal: v } : {}
      });
    },
    dispose() {
      var w;
      m || (m = !0, x = null, f == null || f.dispose(), yc(c), (w = n.dispose) == null || w.call(n));
    }
  };
}
function Rn(a, t, s, n, e, r, l, m, c, i = !1) {
  const d = n == null ? void 0 : n.animation;
  if (!d || !Array.isArray(d.steps) || !d.steps.length)
    return l();
  const o = fc(a, t, s, n, d, l, m, c);
  if (!o) return l();
  const x = Math.max(0, Math.min(Math.floor(Number(e) || 0), o.player.stepCount));
  return o.player.seekStep(x), r !== null && o.player.sampleAt(r), i ? null : o.root.outerHTML;
}
function fc(a, t, s, n, e, r, l, m) {
  var f;
  const c = `${t}:${s}`, i = a.get(c);
  if (i) return i;
  const d = document.createElement("div");
  d.innerHTML = r();
  const o = d.firstElementChild;
  if (!o) return null;
  const x = {
    key: c,
    root: o,
    // 分层光栅的静态段缓存：key = `${step}:${segmentIndex}` → 已光栅的 canvas。
    // 只存静态段；动态段每帧重新解码。翻页/换比例时随 source 一起销毁。
    staticLayers: /* @__PURE__ */ new Map(),
    player: nc({
      root: o,
      animation: e,
      width: (n == null ? void 0 : n.width) ?? l,
      height: (n == null ? void 0 : n.height) ?? m
    })
  };
  for (a.set(c, x); a.size > ic; ) {
    const y = a.keys().next().value;
    (f = a.get(y)) == null || f.player.dispose(), a.delete(y);
  }
  return x;
}
function dc(a, t, s, n, e) {
  const r = `${t}:${s}`, l = a.get(r), m = n == null ? void 0 : n.animation;
  if (!l || !m || !Array.isArray(m.steps) || l.prewarmScheduled) return;
  l.prewarmScheduled = !0;
  const c = l.player.currentStep;
  let i = 0;
  const d = async () => {
    var x;
    if (l.prewarmAborted || i >= m.steps.length) {
      try {
        l.player.seekStep(c);
      } catch {
      }
      return;
    }
    const o = i;
    i += 1;
    try {
      l.player.seekStep(o), await xc(l, o, m) || (x = e == null ? void 0 : e.add) == null || x.call(e, {
        code: "animation.prewarm-skipped",
        severity: "warn",
        scope: { slide: t, step: o },
        message: `第 ${o} 步静态层无法预热（目标含嵌套节点或文本范围）`
      });
    } catch {
    }
    setTimeout(d, 0);
  };
  setTimeout(d, 0);
}
async function xc(a, t, s) {
  const n = `plan:${t}:${a.key}`, e = `plate:${t}:${a.key}`;
  if (a.staticLayers.has(e)) return !0;
  let r = a.staticLayers.get(n);
  if (!r) {
    if (r = Hs(a.root, s.steps[t]), !r) return !1;
    a.staticLayers.set(n, r);
  }
  const l = [];
  for (const u of r.segments) u.dyn || l.push(...u.nodes);
  const m = `markup:${n}`;
  let c = a.staticLayers.get(m);
  c || (c = On(r, { nodes: l }), a.staticLayers.set(m, c));
  const i = Number(a.key.split(":")[1]) || 1, d = Math.max(1, Number(a.root.getAttribute("width")) || 1), o = Math.max(1, Number(a.root.getAttribute("height")) || 1), x = await Ut(c), f = document.createElement("canvas");
  f.width = Math.round(d * i), f.height = Math.round(o * i), f.getContext("2d").drawImage(x, 0, 0, f.width, f.height), a.staticLayers.set(e, f);
  const y = Array.from(a.staticLayers.keys()).filter((u) => u.startsWith("plate:"));
  for (; y.length > zs; ) a.staticLayers.delete(y.shift());
  return !0;
}
function yc(a) {
  var t;
  for (const s of a.values())
    s.prewarmAborted = !0, s.player.dispose(), (t = s.staticLayers) == null || t.clear();
  a.clear();
}
async function hc(a, t, s, n) {
  const e = `plan:${t}:${a.key}`, r = `plate:${t}:${a.key}`;
  let l = a.staticLayers.get(e);
  if (!l) {
    if (l = Hs(a.root, s.steps[t]), !l) return null;
    a.staticLayers.set(e, l);
  }
  let m = a.staticLayers.get(r);
  if (!m) {
    const i = a.staticLayers.get(`markup:${e}`) || (() => {
      const u = [];
      for (const A of l.segments) A.dyn || u.push(...A.nodes);
      const p = On(l, { nodes: u });
      return a.staticLayers.set(`markup:${e}`, p), p;
    })(), d = Number(a.key.split(":")[1]) || 1, o = Math.max(1, Number(a.root.getAttribute("width")) || 1), x = Math.max(1, Number(a.root.getAttribute("height")) || 1), f = await Ut(i, n);
    m = document.createElement("canvas"), m.width = Math.round(o * d), m.height = Math.round(x * d), m.getContext("2d").drawImage(f, 0, 0, m.width, m.height), a.staticLayers.set(r, m);
    const y = Array.from(a.staticLayers.keys()).filter((u) => u.startsWith("plate:"));
    for (; y.length > zs; ) a.staticLayers.delete(y.shift());
  }
  const c = [];
  for (const i of l.segments)
    i.dyn && c.push(...i.nodes);
  return [
    { canvas: m },
    ...c.length ? [{ markup: On(l, { nodes: c }) }] : []
  ];
}
function Hs(a, t) {
  const s = /* @__PURE__ */ new Set();
  for (const c of t || []) {
    if (!/^\d+$/.test(String(c.targetId || ""))) return null;
    s.add(String(c.targetId));
  }
  if (!s.size) return null;
  const n = Array.from(a.children), e = (c) => {
    var i, d;
    return ((i = c == null ? void 0 : c.getAttribute) == null ? void 0 : i.call(c, "data-source")) === "slide" && s.has(String(((d = c.getAttribute) == null ? void 0 : d.call(c, "data-spid")) || ""));
  }, r = /* @__PURE__ */ new Set();
  for (const c of n)
    e(c) && r.add(String(c.getAttribute("data-spid")));
  if (r.size !== s.size) return null;
  const l = a.querySelector("defs"), m = [];
  for (const c of n) {
    const i = e(c), d = m.at(-1);
    d && d.dyn === i ? d.nodes.push(c) : m.push({ dyn: i, nodes: [c] });
  }
  return { root: a, defs: l, segments: m };
}
function On(a, t) {
  const s = "http://www.w3.org/2000/svg", n = document.implementation.createDocument(s, "svg", null), e = n.documentElement, { root: r, defs: l } = a;
  for (const m of ["viewBox", "width", "height"]) {
    const c = r.getAttribute(m);
    c && e.setAttribute(m, c);
  }
  e.setAttribute("xmlns", s), l && e.appendChild(n.importNode(l, !0));
  for (const m of t.nodes) e.appendChild(n.importNode(m, !0));
  return e.outerHTML;
}
function pc(a) {
  if (typeof Blob < "u" && a instanceof Blob) return a;
  if (a instanceof Uint8Array) return { arrayBuffer: async () => a };
  if (typeof ArrayBuffer < "u" && a instanceof ArrayBuffer) {
    const t = new Uint8Array(a);
    return { arrayBuffer: async () => t };
  }
  throw new TypeError("createPptRenderer().open 需要 Blob / File / ArrayBuffer / Uint8Array");
}
function Nt(a) {
  return (a == null ? void 0 : a.reason) instanceof Error ? a.reason : new DOMException("The operation was aborted", "AbortError");
}
export {
  ec as NAVIGATION_KEYS,
  Bn as PROTOCOL_VERSION,
  za as RANDOM_BAR_COUNT,
  Ns as accelDecelProgress,
  tc as audioCommandsAt,
  tn as clipForFilter,
  Ir as configureAssets,
  am as configureMeasureContext,
  L0 as configurePdfJs,
  Br as configureXmlParser,
  Ql as configureYield,
  Ke as createAssetResolver,
  mc as createKeyboardNavigation,
  Hm as createMediaRuntime,
  Cc as createPptRenderer,
  nc as createSlidePlayer,
  jc as createWorkerClient,
  $c as createWorkerHost,
  gc as currentFrameRevision,
  Ac as defaultAssetResolver,
  kc as describeUnsupportedEffects,
  ct as effectTotalMs,
  wc as getDefaultAssetResolver,
  vc as getSimHeiFallbackFonts,
  Rt as hasIterate,
  Bs as isRandomBar,
  _t as iterateIntervalMs,
  Os as iterateUnitProgress,
  Ps as maskForFilter,
  uc as mediaCapabilities,
  ac as mediaCommandsAt,
  Mt as motionPathOf,
  sc as navigationKeyGate,
  Ls as parsePptx,
  qs as pathPointAt,
  He as pdfJsSource,
  Ue as pdfJsWorkerSrc,
  Fr as prepareFrame,
  Dn as renderSlideSvg,
  Rc as resetMeasureContext,
  bc as resetXmlParser,
  Lc as resetYield,
  rc as resolveNavigationKey,
  sn as sampleSlideAnimation,
  Mc as setProgressHandler,
  en as stepTimeline
};
