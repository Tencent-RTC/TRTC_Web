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
  return (function a(t, e, n) {
    function s(m, c) {
      if (!e[m]) {
        if (!t[m]) {
          var i = typeof require == "function" && require;
          if (!c && i) return i(m, !0);
          if (l) return l(m, !0);
          var d = new Error("Cannot find module '" + m + "'");
          throw d.code = "MODULE_NOT_FOUND", d;
        }
        var o = e[m] = { exports: {} };
        t[m][0].call(o.exports, function(x) {
          var f = t[m][1][x];
          return s(f || x);
        }, o, o.exports, a, t, e, n);
      }
      return e[m].exports;
    }
    for (var l = typeof require == "function" && require, r = 0; r < n.length; r++) s(n[r]);
    return s;
  })({ 1: [function(a, t, e) {
    var n = a("./utils"), s = a("./support"), l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    e.encode = function(r) {
      for (var m, c, i, d, o, x, f, y = [], u = 0, h = r.length, g = h, v = n.getTypeOf(r) !== "string"; u < r.length; ) g = h - u, i = v ? (m = r[u++], c = u < h ? r[u++] : 0, u < h ? r[u++] : 0) : (m = r.charCodeAt(u++), c = u < h ? r.charCodeAt(u++) : 0, u < h ? r.charCodeAt(u++) : 0), d = m >> 2, o = (3 & m) << 4 | c >> 4, x = 1 < g ? (15 & c) << 2 | i >> 6 : 64, f = 2 < g ? 63 & i : 64, y.push(l.charAt(d) + l.charAt(o) + l.charAt(x) + l.charAt(f));
      return y.join("");
    }, e.decode = function(r) {
      var m, c, i, d, o, x, f = 0, y = 0, u = "data:";
      if (r.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
      var h, g = 3 * (r = r.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
      if (r.charAt(r.length - 1) === l.charAt(64) && g--, r.charAt(r.length - 2) === l.charAt(64) && g--, g % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
      for (h = s.uint8array ? new Uint8Array(0 | g) : new Array(0 | g); f < r.length; ) m = l.indexOf(r.charAt(f++)) << 2 | (d = l.indexOf(r.charAt(f++))) >> 4, c = (15 & d) << 4 | (o = l.indexOf(r.charAt(f++))) >> 2, i = (3 & o) << 6 | (x = l.indexOf(r.charAt(f++))), h[y++] = m, o !== 64 && (h[y++] = c), x !== 64 && (h[y++] = i);
      return h;
    };
  }, { "./support": 30, "./utils": 32 }], 2: [function(a, t, e) {
    var n = a("./external"), s = a("./stream/DataWorker"), l = a("./stream/Crc32Probe"), r = a("./stream/DataLengthProbe");
    function m(c, i, d, o, x) {
      this.compressedSize = c, this.uncompressedSize = i, this.crc32 = d, this.compression = o, this.compressedContent = x;
    }
    m.prototype = { getContentWorker: function() {
      var c = new s(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new r("data_length")), i = this;
      return c.on("end", function() {
        if (this.streamInfo.data_length !== i.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
      }), c;
    }, getCompressedWorker: function() {
      return new s(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
    } }, m.createWorkerFrom = function(c, i, d) {
      return c.pipe(new l()).pipe(new r("uncompressedSize")).pipe(i.compressWorker(d)).pipe(new r("compressedSize")).withStreamInfo("compression", i);
    }, t.exports = m;
  }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(a, t, e) {
    var n = a("./stream/GenericWorker");
    e.STORE = { magic: "\0\0", compressWorker: function() {
      return new n("STORE compression");
    }, uncompressWorker: function() {
      return new n("STORE decompression");
    } }, e.DEFLATE = a("./flate");
  }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(a, t, e) {
    var n = a("./utils"), s = (function() {
      for (var l, r = [], m = 0; m < 256; m++) {
        l = m;
        for (var c = 0; c < 8; c++) l = 1 & l ? 3988292384 ^ l >>> 1 : l >>> 1;
        r[m] = l;
      }
      return r;
    })();
    t.exports = function(l, r) {
      return l !== void 0 && l.length ? n.getTypeOf(l) !== "string" ? (function(m, c, i, d) {
        var o = s, x = d + i;
        m ^= -1;
        for (var f = d; f < x; f++) m = m >>> 8 ^ o[255 & (m ^ c[f])];
        return -1 ^ m;
      })(0 | r, l, l.length, 0) : (function(m, c, i, d) {
        var o = s, x = d + i;
        m ^= -1;
        for (var f = d; f < x; f++) m = m >>> 8 ^ o[255 & (m ^ c.charCodeAt(f))];
        return -1 ^ m;
      })(0 | r, l, l.length, 0) : 0;
    };
  }, { "./utils": 32 }], 5: [function(a, t, e) {
    e.base64 = !1, e.binary = !1, e.dir = !1, e.createFolders = !0, e.date = null, e.compression = null, e.compressionOptions = null, e.comment = null, e.unixPermissions = null, e.dosPermissions = null;
  }, {}], 6: [function(a, t, e) {
    var n = null;
    n = typeof Promise < "u" ? Promise : a("lie"), t.exports = { Promise: n };
  }, { lie: 37 }], 7: [function(a, t, e) {
    var n = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", s = a("pako"), l = a("./utils"), r = a("./stream/GenericWorker"), m = n ? "uint8array" : "array";
    function c(i, d) {
      r.call(this, "FlateWorker/" + i), this._pako = null, this._pakoAction = i, this._pakoOptions = d, this.meta = {};
    }
    e.magic = "\b\0", l.inherits(c, r), c.prototype.processChunk = function(i) {
      this.meta = i.meta, this._pako === null && this._createPako(), this._pako.push(l.transformTo(m, i.data), !1);
    }, c.prototype.flush = function() {
      r.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
    }, c.prototype.cleanUp = function() {
      r.prototype.cleanUp.call(this), this._pako = null;
    }, c.prototype._createPako = function() {
      this._pako = new s[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
      var i = this;
      this._pako.onData = function(d) {
        i.push({ data: d, meta: i.meta });
      };
    }, e.compressWorker = function(i) {
      return new c("Deflate", i);
    }, e.uncompressWorker = function() {
      return new c("Inflate", {});
    };
  }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(a, t, e) {
    function n(o, x) {
      var f, y = "";
      for (f = 0; f < x; f++) y += String.fromCharCode(255 & o), o >>>= 8;
      return y;
    }
    function s(o, x, f, y, u, h) {
      var g, v, A = o.file, j = o.compression, $ = h !== m.utf8encode, k = l.transformTo("string", h(A.name)), S = l.transformTo("string", m.utf8encode(A.name)), E = A.comment, X = l.transformTo("string", h(E)), _ = l.transformTo("string", m.utf8encode(E)), C = S.length !== A.name.length, w = _.length !== E.length, q = "", T = "", I = "", U = A.dir, N = A.date, z = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
      x && !f || (z.crc32 = o.crc32, z.compressedSize = o.compressedSize, z.uncompressedSize = o.uncompressedSize);
      var P = 0;
      x && (P |= 8), $ || !C && !w || (P |= 2048);
      var F = 0, J = 0;
      U && (F |= 16), u === "UNIX" ? (J = 798, F |= (function(Y, fa) {
        var da = Y;
        return Y || (da = fa ? 16893 : 33204), (65535 & da) << 16;
      })(A.unixPermissions, U)) : (J = 20, F |= (function(Y) {
        return 63 & (Y || 0);
      })(A.dosPermissions)), g = N.getUTCHours(), g <<= 6, g |= N.getUTCMinutes(), g <<= 5, g |= N.getUTCSeconds() / 2, v = N.getUTCFullYear() - 1980, v <<= 4, v |= N.getUTCMonth() + 1, v <<= 5, v |= N.getUTCDate(), C && (T = n(1, 1) + n(c(k), 4) + S, q += "up" + n(T.length, 2) + T), w && (I = n(1, 1) + n(c(X), 4) + _, q += "uc" + n(I.length, 2) + I);
      var K = "";
      return K += `
\0`, K += n(P, 2), K += j.magic, K += n(g, 2), K += n(v, 2), K += n(z.crc32, 4), K += n(z.compressedSize, 4), K += n(z.uncompressedSize, 4), K += n(k.length, 2), K += n(q.length, 2), { fileRecord: i.LOCAL_FILE_HEADER + K + k + q, dirRecord: i.CENTRAL_FILE_HEADER + n(J, 2) + K + n(X.length, 2) + "\0\0\0\0" + n(F, 4) + n(y, 4) + k + q + X };
    }
    var l = a("../utils"), r = a("../stream/GenericWorker"), m = a("../utf8"), c = a("../crc32"), i = a("../signature");
    function d(o, x, f, y) {
      r.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = x, this.zipPlatform = f, this.encodeFileName = y, this.streamFiles = o, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
    }
    l.inherits(d, r), d.prototype.push = function(o) {
      var x = o.meta.percent || 0, f = this.entriesCount, y = this._sources.length;
      this.accumulate ? this.contentBuffer.push(o) : (this.bytesWritten += o.data.length, r.prototype.push.call(this, { data: o.data, meta: { currentFile: this.currentFile, percent: f ? (x + 100 * (f - y - 1)) / f : 100 } }));
    }, d.prototype.openedSource = function(o) {
      this.currentSourceOffset = this.bytesWritten, this.currentFile = o.file.name;
      var x = this.streamFiles && !o.file.dir;
      if (x) {
        var f = s(o, x, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        this.push({ data: f.fileRecord, meta: { percent: 0 } });
      } else this.accumulate = !0;
    }, d.prototype.closedSource = function(o) {
      this.accumulate = !1;
      var x = this.streamFiles && !o.file.dir, f = s(o, x, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
      if (this.dirRecords.push(f.dirRecord), x) this.push({ data: (function(y) {
        return i.DATA_DESCRIPTOR + n(y.crc32, 4) + n(y.compressedSize, 4) + n(y.uncompressedSize, 4);
      })(o), meta: { percent: 100 } });
      else for (this.push({ data: f.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
      this.currentFile = null;
    }, d.prototype.flush = function() {
      for (var o = this.bytesWritten, x = 0; x < this.dirRecords.length; x++) this.push({ data: this.dirRecords[x], meta: { percent: 100 } });
      var f = this.bytesWritten - o, y = (function(u, h, g, v, A) {
        var j = l.transformTo("string", A(v));
        return i.CENTRAL_DIRECTORY_END + "\0\0\0\0" + n(u, 2) + n(u, 2) + n(h, 4) + n(g, 4) + n(j.length, 2) + j;
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
      return !!r.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
    }, d.prototype.error = function(o) {
      var x = this._sources;
      if (!r.prototype.error.call(this, o)) return !1;
      for (var f = 0; f < x.length; f++) try {
        x[f].error(o);
      } catch {
      }
      return !0;
    }, d.prototype.lock = function() {
      r.prototype.lock.call(this);
      for (var o = this._sources, x = 0; x < o.length; x++) o[x].lock();
    }, t.exports = d;
  }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(a, t, e) {
    var n = a("../compressions"), s = a("./ZipFileWorker");
    e.generateWorker = function(l, r, m) {
      var c = new s(r.streamFiles, m, r.platform, r.encodeFileName), i = 0;
      try {
        l.forEach(function(d, o) {
          i++;
          var x = (function(h, g) {
            var v = h || g, A = n[v];
            if (!A) throw new Error(v + " is not a valid compression method !");
            return A;
          })(o.options.compression, r.compression), f = o.options.compressionOptions || r.compressionOptions || {}, y = o.dir, u = o.date;
          o._compressWorker(x, f).withStreamInfo("file", { name: d, dir: y, date: u, comment: o.comment || "", unixPermissions: o.unixPermissions, dosPermissions: o.dosPermissions }).pipe(c);
        }), c.entriesCount = i;
      } catch (d) {
        c.error(d);
      }
      return c;
    };
  }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(a, t, e) {
    function n() {
      if (!(this instanceof n)) return new n();
      if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
      this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
        var s = new n();
        for (var l in this) typeof this[l] != "function" && (s[l] = this[l]);
        return s;
      };
    }
    (n.prototype = a("./object")).loadAsync = a("./load"), n.support = a("./support"), n.defaults = a("./defaults"), n.version = "3.10.1", n.loadAsync = function(s, l) {
      return new n().loadAsync(s, l);
    }, n.external = a("./external"), t.exports = n;
  }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(a, t, e) {
    var n = a("./utils"), s = a("./external"), l = a("./utf8"), r = a("./zipEntries"), m = a("./stream/Crc32Probe"), c = a("./nodejsUtils");
    function i(d) {
      return new s.Promise(function(o, x) {
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
      return o = n.extend(o || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: l.utf8decode }), c.isNode && c.isStream(d) ? s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : n.prepareContent("the loaded zip file", d, !0, o.optimizedBinaryString, o.base64).then(function(f) {
        var y = new r(o);
        return y.load(f), y;
      }).then(function(f) {
        var y = [s.Promise.resolve(f)], u = f.files;
        if (o.checkCRC32) for (var h = 0; h < u.length; h++) y.push(i(u[h]));
        return s.Promise.all(y);
      }).then(function(f) {
        for (var y = f.shift(), u = y.files, h = 0; h < u.length; h++) {
          var g = u[h], v = g.fileNameStr, A = n.resolve(g.fileNameStr);
          x.file(A, g.decompressed, { binary: !0, optimizedBinaryString: !0, date: g.date, dir: g.dir, comment: g.fileCommentStr.length ? g.fileCommentStr : null, unixPermissions: g.unixPermissions, dosPermissions: g.dosPermissions, createFolders: o.createFolders }), g.dir || (x.file(A).unsafeOriginalName = v);
        }
        return y.zipComment.length && (x.comment = y.zipComment), x;
      });
    };
  }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(a, t, e) {
    var n = a("../utils"), s = a("../stream/GenericWorker");
    function l(r, m) {
      s.call(this, "Nodejs stream input adapter for " + r), this._upstreamEnded = !1, this._bindStream(m);
    }
    n.inherits(l, s), l.prototype._bindStream = function(r) {
      var m = this;
      (this._stream = r).pause(), r.on("data", function(c) {
        m.push({ data: c, meta: { percent: 0 } });
      }).on("error", function(c) {
        m.isPaused ? this.generatedError = c : m.error(c);
      }).on("end", function() {
        m.isPaused ? m._upstreamEnded = !0 : m.end();
      });
    }, l.prototype.pause = function() {
      return !!s.prototype.pause.call(this) && (this._stream.pause(), !0);
    }, l.prototype.resume = function() {
      return !!s.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
    }, t.exports = l;
  }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(a, t, e) {
    var n = a("readable-stream").Readable;
    function s(l, r, m) {
      n.call(this, r), this._helper = l;
      var c = this;
      l.on("data", function(i, d) {
        c.push(i) || c._helper.pause(), m && m(d);
      }).on("error", function(i) {
        c.emit("error", i);
      }).on("end", function() {
        c.push(null);
      });
    }
    a("../utils").inherits(s, n), s.prototype._read = function() {
      this._helper.resume();
    }, t.exports = s;
  }, { "../utils": 32, "readable-stream": 16 }], 14: [function(a, t, e) {
    t.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(n, s) {
      if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(n, s);
      if (typeof n == "number") throw new Error('The "data" argument must not be a number');
      return new Buffer(n, s);
    }, allocBuffer: function(n) {
      if (Buffer.alloc) return Buffer.alloc(n);
      var s = new Buffer(n);
      return s.fill(0), s;
    }, isBuffer: function(n) {
      return Buffer.isBuffer(n);
    }, isStream: function(n) {
      return n && typeof n.on == "function" && typeof n.pause == "function" && typeof n.resume == "function";
    } };
  }, {}], 15: [function(a, t, e) {
    function n(A, j, $) {
      var k, S = l.getTypeOf(j), E = l.extend($ || {}, c);
      E.date = E.date || /* @__PURE__ */ new Date(), E.compression !== null && (E.compression = E.compression.toUpperCase()), typeof E.unixPermissions == "string" && (E.unixPermissions = parseInt(E.unixPermissions, 8)), E.unixPermissions && 16384 & E.unixPermissions && (E.dir = !0), E.dosPermissions && 16 & E.dosPermissions && (E.dir = !0), E.dir && (A = u(A)), E.createFolders && (k = y(A)) && h.call(this, k, !0);
      var X = S === "string" && E.binary === !1 && E.base64 === !1;
      $ && $.binary !== void 0 || (E.binary = !X), (j instanceof i && j.uncompressedSize === 0 || E.dir || !j || j.length === 0) && (E.base64 = !1, E.binary = !0, j = "", E.compression = "STORE", S = "string");
      var _ = null;
      _ = j instanceof i || j instanceof r ? j : x.isNode && x.isStream(j) ? new f(A, j) : l.prepareContent(A, j, E.binary, E.optimizedBinaryString, E.base64);
      var C = new d(A, _, E);
      this.files[A] = C;
    }
    var s = a("./utf8"), l = a("./utils"), r = a("./stream/GenericWorker"), m = a("./stream/StreamHelper"), c = a("./defaults"), i = a("./compressedObject"), d = a("./zipObject"), o = a("./generate"), x = a("./nodejsUtils"), f = a("./nodejs/NodejsStreamInputAdapter"), y = function(A) {
      A.slice(-1) === "/" && (A = A.substring(0, A.length - 1));
      var j = A.lastIndexOf("/");
      return 0 < j ? A.substring(0, j) : "";
    }, u = function(A) {
      return A.slice(-1) !== "/" && (A += "/"), A;
    }, h = function(A, j) {
      return j = j !== void 0 ? j : c.createFolders, A = u(A), this.files[A] || n.call(this, A, null, { dir: !0, createFolders: j }), this.files[A];
    };
    function g(A) {
      return Object.prototype.toString.call(A) === "[object RegExp]";
    }
    var v = { load: function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    }, forEach: function(A) {
      var j, $, k;
      for (j in this.files) k = this.files[j], ($ = j.slice(this.root.length, j.length)) && j.slice(0, this.root.length) === this.root && A($, k);
    }, filter: function(A) {
      var j = [];
      return this.forEach(function($, k) {
        A($, k) && j.push(k);
      }), j;
    }, file: function(A, j, $) {
      if (arguments.length !== 1) return A = this.root + A, n.call(this, A, j, $), this;
      if (g(A)) {
        var k = A;
        return this.filter(function(E, X) {
          return !X.dir && k.test(E);
        });
      }
      var S = this.files[this.root + A];
      return S && !S.dir ? S : null;
    }, folder: function(A) {
      if (!A) return this;
      if (g(A)) return this.filter(function(S, E) {
        return E.dir && A.test(S);
      });
      var j = this.root + A, $ = h.call(this, j), k = this.clone();
      return k.root = $.name, k;
    }, remove: function(A) {
      A = this.root + A;
      var j = this.files[A];
      if (j || (A.slice(-1) !== "/" && (A += "/"), j = this.files[A]), j && !j.dir) delete this.files[A];
      else for (var $ = this.filter(function(S, E) {
        return E.name.slice(0, A.length) === A;
      }), k = 0; k < $.length; k++) delete this.files[$[k].name];
      return this;
    }, generate: function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    }, generateInternalStream: function(A) {
      var j, $ = {};
      try {
        if (($ = l.extend(A || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: s.utf8encode })).type = $.type.toLowerCase(), $.compression = $.compression.toUpperCase(), $.type === "binarystring" && ($.type = "string"), !$.type) throw new Error("No output type specified.");
        l.checkSupport($.type), $.platform !== "darwin" && $.platform !== "freebsd" && $.platform !== "linux" && $.platform !== "sunos" || ($.platform = "UNIX"), $.platform === "win32" && ($.platform = "DOS");
        var k = $.comment || this.comment || "";
        j = o.generateWorker(this, $, k);
      } catch (S) {
        (j = new r("error")).error(S);
      }
      return new m(j, $.type || "string", $.mimeType);
    }, generateAsync: function(A, j) {
      return this.generateInternalStream(A).accumulate(j);
    }, generateNodeStream: function(A, j) {
      return (A = A || {}).type || (A.type = "nodebuffer"), this.generateInternalStream(A).toNodejsStream(j);
    } };
    t.exports = v;
  }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(a, t, e) {
    t.exports = a("stream");
  }, { stream: void 0 }], 17: [function(a, t, e) {
    var n = a("./DataReader");
    function s(l) {
      n.call(this, l);
      for (var r = 0; r < this.data.length; r++) l[r] = 255 & l[r];
    }
    a("../utils").inherits(s, n), s.prototype.byteAt = function(l) {
      return this.data[this.zero + l];
    }, s.prototype.lastIndexOfSignature = function(l) {
      for (var r = l.charCodeAt(0), m = l.charCodeAt(1), c = l.charCodeAt(2), i = l.charCodeAt(3), d = this.length - 4; 0 <= d; --d) if (this.data[d] === r && this.data[d + 1] === m && this.data[d + 2] === c && this.data[d + 3] === i) return d - this.zero;
      return -1;
    }, s.prototype.readAndCheckSignature = function(l) {
      var r = l.charCodeAt(0), m = l.charCodeAt(1), c = l.charCodeAt(2), i = l.charCodeAt(3), d = this.readData(4);
      return r === d[0] && m === d[1] && c === d[2] && i === d[3];
    }, s.prototype.readData = function(l) {
      if (this.checkOffset(l), l === 0) return [];
      var r = this.data.slice(this.zero + this.index, this.zero + this.index + l);
      return this.index += l, r;
    }, t.exports = s;
  }, { "../utils": 32, "./DataReader": 18 }], 18: [function(a, t, e) {
    var n = a("../utils");
    function s(l) {
      this.data = l, this.length = l.length, this.index = 0, this.zero = 0;
    }
    s.prototype = { checkOffset: function(l) {
      this.checkIndex(this.index + l);
    }, checkIndex: function(l) {
      if (this.length < this.zero + l || l < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + l + "). Corrupted zip ?");
    }, setIndex: function(l) {
      this.checkIndex(l), this.index = l;
    }, skip: function(l) {
      this.setIndex(this.index + l);
    }, byteAt: function() {
    }, readInt: function(l) {
      var r, m = 0;
      for (this.checkOffset(l), r = this.index + l - 1; r >= this.index; r--) m = (m << 8) + this.byteAt(r);
      return this.index += l, m;
    }, readString: function(l) {
      return n.transformTo("string", this.readData(l));
    }, readData: function() {
    }, lastIndexOfSignature: function() {
    }, readAndCheckSignature: function() {
    }, readDate: function() {
      var l = this.readInt(4);
      return new Date(Date.UTC(1980 + (l >> 25 & 127), (l >> 21 & 15) - 1, l >> 16 & 31, l >> 11 & 31, l >> 5 & 63, (31 & l) << 1));
    } }, t.exports = s;
  }, { "../utils": 32 }], 19: [function(a, t, e) {
    var n = a("./Uint8ArrayReader");
    function s(l) {
      n.call(this, l);
    }
    a("../utils").inherits(s, n), s.prototype.readData = function(l) {
      this.checkOffset(l);
      var r = this.data.slice(this.zero + this.index, this.zero + this.index + l);
      return this.index += l, r;
    }, t.exports = s;
  }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(a, t, e) {
    var n = a("./DataReader");
    function s(l) {
      n.call(this, l);
    }
    a("../utils").inherits(s, n), s.prototype.byteAt = function(l) {
      return this.data.charCodeAt(this.zero + l);
    }, s.prototype.lastIndexOfSignature = function(l) {
      return this.data.lastIndexOf(l) - this.zero;
    }, s.prototype.readAndCheckSignature = function(l) {
      return l === this.readData(4);
    }, s.prototype.readData = function(l) {
      this.checkOffset(l);
      var r = this.data.slice(this.zero + this.index, this.zero + this.index + l);
      return this.index += l, r;
    }, t.exports = s;
  }, { "../utils": 32, "./DataReader": 18 }], 21: [function(a, t, e) {
    var n = a("./ArrayReader");
    function s(l) {
      n.call(this, l);
    }
    a("../utils").inherits(s, n), s.prototype.readData = function(l) {
      if (this.checkOffset(l), l === 0) return new Uint8Array(0);
      var r = this.data.subarray(this.zero + this.index, this.zero + this.index + l);
      return this.index += l, r;
    }, t.exports = s;
  }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(a, t, e) {
    var n = a("../utils"), s = a("../support"), l = a("./ArrayReader"), r = a("./StringReader"), m = a("./NodeBufferReader"), c = a("./Uint8ArrayReader");
    t.exports = function(i) {
      var d = n.getTypeOf(i);
      return n.checkSupport(d), d !== "string" || s.uint8array ? d === "nodebuffer" ? new m(i) : s.uint8array ? new c(n.transformTo("uint8array", i)) : new l(n.transformTo("array", i)) : new r(i);
    };
  }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(a, t, e) {
    e.LOCAL_FILE_HEADER = "PK", e.CENTRAL_FILE_HEADER = "PK", e.CENTRAL_DIRECTORY_END = "PK", e.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", e.ZIP64_CENTRAL_DIRECTORY_END = "PK", e.DATA_DESCRIPTOR = "PK\x07\b";
  }, {}], 24: [function(a, t, e) {
    var n = a("./GenericWorker"), s = a("../utils");
    function l(r) {
      n.call(this, "ConvertWorker to " + r), this.destType = r;
    }
    s.inherits(l, n), l.prototype.processChunk = function(r) {
      this.push({ data: s.transformTo(this.destType, r.data), meta: r.meta });
    }, t.exports = l;
  }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(a, t, e) {
    var n = a("./GenericWorker"), s = a("../crc32");
    function l() {
      n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
    }
    a("../utils").inherits(l, n), l.prototype.processChunk = function(r) {
      this.streamInfo.crc32 = s(r.data, this.streamInfo.crc32 || 0), this.push(r);
    }, t.exports = l;
  }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(a, t, e) {
    var n = a("../utils"), s = a("./GenericWorker");
    function l(r) {
      s.call(this, "DataLengthProbe for " + r), this.propName = r, this.withStreamInfo(r, 0);
    }
    n.inherits(l, s), l.prototype.processChunk = function(r) {
      if (r) {
        var m = this.streamInfo[this.propName] || 0;
        this.streamInfo[this.propName] = m + r.data.length;
      }
      s.prototype.processChunk.call(this, r);
    }, t.exports = l;
  }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(a, t, e) {
    var n = a("../utils"), s = a("./GenericWorker");
    function l(r) {
      s.call(this, "DataWorker");
      var m = this;
      this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, r.then(function(c) {
        m.dataIsReady = !0, m.data = c, m.max = c && c.length || 0, m.type = n.getTypeOf(c), m.isPaused || m._tickAndRepeat();
      }, function(c) {
        m.error(c);
      });
    }
    n.inherits(l, s), l.prototype.cleanUp = function() {
      s.prototype.cleanUp.call(this), this.data = null;
    }, l.prototype.resume = function() {
      return !!s.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, n.delay(this._tickAndRepeat, [], this)), !0);
    }, l.prototype._tickAndRepeat = function() {
      this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
    }, l.prototype._tick = function() {
      if (this.isPaused || this.isFinished) return !1;
      var r = null, m = Math.min(this.max, this.index + 16384);
      if (this.index >= this.max) return this.end();
      switch (this.type) {
        case "string":
          r = this.data.substring(this.index, m);
          break;
        case "uint8array":
          r = this.data.subarray(this.index, m);
          break;
        case "array":
        case "nodebuffer":
          r = this.data.slice(this.index, m);
      }
      return this.index = m, this.push({ data: r, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
    }, t.exports = l;
  }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(a, t, e) {
    function n(s) {
      this.name = s || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
    }
    n.prototype = { push: function(s) {
      this.emit("data", s);
    }, end: function() {
      if (this.isFinished) return !1;
      this.flush();
      try {
        this.emit("end"), this.cleanUp(), this.isFinished = !0;
      } catch (s) {
        this.emit("error", s);
      }
      return !0;
    }, error: function(s) {
      return !this.isFinished && (this.isPaused ? this.generatedError = s : (this.isFinished = !0, this.emit("error", s), this.previous && this.previous.error(s), this.cleanUp()), !0);
    }, on: function(s, l) {
      return this._listeners[s].push(l), this;
    }, cleanUp: function() {
      this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
    }, emit: function(s, l) {
      if (this._listeners[s]) for (var r = 0; r < this._listeners[s].length; r++) this._listeners[s][r].call(this, l);
    }, pipe: function(s) {
      return s.registerPrevious(this);
    }, registerPrevious: function(s) {
      if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
      this.streamInfo = s.streamInfo, this.mergeStreamInfo(), this.previous = s;
      var l = this;
      return s.on("data", function(r) {
        l.processChunk(r);
      }), s.on("end", function() {
        l.end();
      }), s.on("error", function(r) {
        l.error(r);
      }), this;
    }, pause: function() {
      return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
    }, resume: function() {
      if (!this.isPaused || this.isFinished) return !1;
      var s = this.isPaused = !1;
      return this.generatedError && (this.error(this.generatedError), s = !0), this.previous && this.previous.resume(), !s;
    }, flush: function() {
    }, processChunk: function(s) {
      this.push(s);
    }, withStreamInfo: function(s, l) {
      return this.extraStreamInfo[s] = l, this.mergeStreamInfo(), this;
    }, mergeStreamInfo: function() {
      for (var s in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, s) && (this.streamInfo[s] = this.extraStreamInfo[s]);
    }, lock: function() {
      if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
      this.isLocked = !0, this.previous && this.previous.lock();
    }, toString: function() {
      var s = "Worker " + this.name;
      return this.previous ? this.previous + " -> " + s : s;
    } }, t.exports = n;
  }, {}], 29: [function(a, t, e) {
    var n = a("../utils"), s = a("./ConvertWorker"), l = a("./GenericWorker"), r = a("../base64"), m = a("../support"), c = a("../external"), i = null;
    if (m.nodestream) try {
      i = a("../nodejs/NodejsStreamOutputAdapter");
    } catch {
    }
    function d(x, f) {
      return new c.Promise(function(y, u) {
        var h = [], g = x._internalType, v = x._outputType, A = x._mimeType;
        x.on("data", function(j, $) {
          h.push(j), f && f($);
        }).on("error", function(j) {
          h = [], u(j);
        }).on("end", function() {
          try {
            var j = (function($, k, S) {
              switch ($) {
                case "blob":
                  return n.newBlob(n.transformTo("arraybuffer", k), S);
                case "base64":
                  return r.encode(k);
                default:
                  return n.transformTo($, k);
              }
            })(v, (function($, k) {
              var S, E = 0, X = null, _ = 0;
              for (S = 0; S < k.length; S++) _ += k[S].length;
              switch ($) {
                case "string":
                  return k.join("");
                case "array":
                  return Array.prototype.concat.apply([], k);
                case "uint8array":
                  for (X = new Uint8Array(_), S = 0; S < k.length; S++) X.set(k[S], E), E += k[S].length;
                  return X;
                case "nodebuffer":
                  return Buffer.concat(k);
                default:
                  throw new Error("concat : unsupported type '" + $ + "'");
              }
            })(g, h), A);
            y(j);
          } catch ($) {
            u($);
          }
          h = [];
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
        this._internalType = u, this._outputType = f, this._mimeType = y, n.checkSupport(u), this._worker = x.pipe(new s(u)), x.lock();
      } catch (h) {
        this._worker = new l("error"), this._worker.error(h);
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
  }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(a, t, e) {
    if (e.base64 = !0, e.array = !0, e.string = !0, e.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", e.nodebuffer = typeof Buffer < "u", e.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") e.blob = !1;
    else {
      var n = new ArrayBuffer(0);
      try {
        e.blob = new Blob([n], { type: "application/zip" }).size === 0;
      } catch {
        try {
          var s = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
          s.append(n), e.blob = s.getBlob("application/zip").size === 0;
        } catch {
          e.blob = !1;
        }
      }
    }
    try {
      e.nodestream = !!a("readable-stream").Readable;
    } catch {
      e.nodestream = !1;
    }
  }, { "readable-stream": 16 }], 31: [function(a, t, e) {
    for (var n = a("./utils"), s = a("./support"), l = a("./nodejsUtils"), r = a("./stream/GenericWorker"), m = new Array(256), c = 0; c < 256; c++) m[c] = 252 <= c ? 6 : 248 <= c ? 5 : 240 <= c ? 4 : 224 <= c ? 3 : 192 <= c ? 2 : 1;
    m[254] = m[254] = 1;
    function i() {
      r.call(this, "utf-8 decode"), this.leftOver = null;
    }
    function d() {
      r.call(this, "utf-8 encode");
    }
    e.utf8encode = function(o) {
      return s.nodebuffer ? l.newBufferFrom(o, "utf-8") : (function(x) {
        var f, y, u, h, g, v = x.length, A = 0;
        for (h = 0; h < v; h++) (64512 & (y = x.charCodeAt(h))) == 55296 && h + 1 < v && (64512 & (u = x.charCodeAt(h + 1))) == 56320 && (y = 65536 + (y - 55296 << 10) + (u - 56320), h++), A += y < 128 ? 1 : y < 2048 ? 2 : y < 65536 ? 3 : 4;
        for (f = s.uint8array ? new Uint8Array(A) : new Array(A), h = g = 0; g < A; h++) (64512 & (y = x.charCodeAt(h))) == 55296 && h + 1 < v && (64512 & (u = x.charCodeAt(h + 1))) == 56320 && (y = 65536 + (y - 55296 << 10) + (u - 56320), h++), y < 128 ? f[g++] = y : (y < 2048 ? f[g++] = 192 | y >>> 6 : (y < 65536 ? f[g++] = 224 | y >>> 12 : (f[g++] = 240 | y >>> 18, f[g++] = 128 | y >>> 12 & 63), f[g++] = 128 | y >>> 6 & 63), f[g++] = 128 | 63 & y);
        return f;
      })(o);
    }, e.utf8decode = function(o) {
      return s.nodebuffer ? n.transformTo("nodebuffer", o).toString("utf-8") : (function(x) {
        var f, y, u, h, g = x.length, v = new Array(2 * g);
        for (f = y = 0; f < g; ) if ((u = x[f++]) < 128) v[y++] = u;
        else if (4 < (h = m[u])) v[y++] = 65533, f += h - 1;
        else {
          for (u &= h === 2 ? 31 : h === 3 ? 15 : 7; 1 < h && f < g; ) u = u << 6 | 63 & x[f++], h--;
          1 < h ? v[y++] = 65533 : u < 65536 ? v[y++] = u : (u -= 65536, v[y++] = 55296 | u >> 10 & 1023, v[y++] = 56320 | 1023 & u);
        }
        return v.length !== y && (v.subarray ? v = v.subarray(0, y) : v.length = y), n.applyFromCharCode(v);
      })(o = n.transformTo(s.uint8array ? "uint8array" : "array", o));
    }, n.inherits(i, r), i.prototype.processChunk = function(o) {
      var x = n.transformTo(s.uint8array ? "uint8array" : "array", o.data);
      if (this.leftOver && this.leftOver.length) {
        if (s.uint8array) {
          var f = x;
          (x = new Uint8Array(f.length + this.leftOver.length)).set(this.leftOver, 0), x.set(f, this.leftOver.length);
        } else x = this.leftOver.concat(x);
        this.leftOver = null;
      }
      var y = (function(h, g) {
        var v;
        for ((g = g || h.length) > h.length && (g = h.length), v = g - 1; 0 <= v && (192 & h[v]) == 128; ) v--;
        return v < 0 || v === 0 ? g : v + m[h[v]] > g ? v : g;
      })(x), u = x;
      y !== x.length && (s.uint8array ? (u = x.subarray(0, y), this.leftOver = x.subarray(y, x.length)) : (u = x.slice(0, y), this.leftOver = x.slice(y, x.length))), this.push({ data: e.utf8decode(u), meta: o.meta });
    }, i.prototype.flush = function() {
      this.leftOver && this.leftOver.length && (this.push({ data: e.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
    }, e.Utf8DecodeWorker = i, n.inherits(d, r), d.prototype.processChunk = function(o) {
      this.push({ data: e.utf8encode(o.data), meta: o.meta });
    }, e.Utf8EncodeWorker = d;
  }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(a, t, e) {
    var n = a("./support"), s = a("./base64"), l = a("./nodejsUtils"), r = a("./external");
    function m(f) {
      return f;
    }
    function c(f, y) {
      for (var u = 0; u < f.length; ++u) y[u] = 255 & f.charCodeAt(u);
      return y;
    }
    a("setimmediate"), e.newBlob = function(f, y) {
      e.checkSupport("blob");
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
      var h = [], g = 0, v = f.length;
      if (v <= u) return String.fromCharCode.apply(null, f);
      for (; g < v; ) y === "array" || y === "nodebuffer" ? h.push(String.fromCharCode.apply(null, f.slice(g, Math.min(g + u, v)))) : h.push(String.fromCharCode.apply(null, f.subarray(g, Math.min(g + u, v)))), g += u;
      return h.join("");
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
        return n.nodebuffer && String.fromCharCode.apply(null, l.allocBuffer(1)).length === 1;
      } catch {
        return !1;
      }
    })() } };
    function d(f) {
      var y = 65536, u = e.getTypeOf(f), h = !0;
      if (u === "uint8array" ? h = i.applyCanBeUsed.uint8array : u === "nodebuffer" && (h = i.applyCanBeUsed.nodebuffer), h) for (; 1 < y; ) try {
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
    e.applyFromCharCode = d;
    var x = {};
    x.string = { string: m, array: function(f) {
      return c(f, new Array(f.length));
    }, arraybuffer: function(f) {
      return x.string.uint8array(f).buffer;
    }, uint8array: function(f) {
      return c(f, new Uint8Array(f.length));
    }, nodebuffer: function(f) {
      return c(f, l.allocBuffer(f.length));
    } }, x.array = { string: d, array: m, arraybuffer: function(f) {
      return new Uint8Array(f).buffer;
    }, uint8array: function(f) {
      return new Uint8Array(f);
    }, nodebuffer: function(f) {
      return l.newBufferFrom(f);
    } }, x.arraybuffer = { string: function(f) {
      return d(new Uint8Array(f));
    }, array: function(f) {
      return o(new Uint8Array(f), new Array(f.byteLength));
    }, arraybuffer: m, uint8array: function(f) {
      return new Uint8Array(f);
    }, nodebuffer: function(f) {
      return l.newBufferFrom(new Uint8Array(f));
    } }, x.uint8array = { string: d, array: function(f) {
      return o(f, new Array(f.length));
    }, arraybuffer: function(f) {
      return f.buffer;
    }, uint8array: m, nodebuffer: function(f) {
      return l.newBufferFrom(f);
    } }, x.nodebuffer = { string: d, array: function(f) {
      return o(f, new Array(f.length));
    }, arraybuffer: function(f) {
      return x.nodebuffer.uint8array(f).buffer;
    }, uint8array: function(f) {
      return o(f, new Uint8Array(f.length));
    }, nodebuffer: m }, e.transformTo = function(f, y) {
      if (y = y || "", !f) return y;
      e.checkSupport(f);
      var u = e.getTypeOf(y);
      return x[u][f](y);
    }, e.resolve = function(f) {
      for (var y = f.split("/"), u = [], h = 0; h < y.length; h++) {
        var g = y[h];
        g === "." || g === "" && h !== 0 && h !== y.length - 1 || (g === ".." ? u.pop() : u.push(g));
      }
      return u.join("/");
    }, e.getTypeOf = function(f) {
      return typeof f == "string" ? "string" : Object.prototype.toString.call(f) === "[object Array]" ? "array" : n.nodebuffer && l.isBuffer(f) ? "nodebuffer" : n.uint8array && f instanceof Uint8Array ? "uint8array" : n.arraybuffer && f instanceof ArrayBuffer ? "arraybuffer" : void 0;
    }, e.checkSupport = function(f) {
      if (!n[f.toLowerCase()]) throw new Error(f + " is not supported by this platform");
    }, e.MAX_VALUE_16BITS = 65535, e.MAX_VALUE_32BITS = -1, e.pretty = function(f) {
      var y, u, h = "";
      for (u = 0; u < (f || "").length; u++) h += "\\x" + ((y = f.charCodeAt(u)) < 16 ? "0" : "") + y.toString(16).toUpperCase();
      return h;
    }, e.delay = function(f, y, u) {
      setImmediate(function() {
        f.apply(u || null, y || []);
      });
    }, e.inherits = function(f, y) {
      function u() {
      }
      u.prototype = y.prototype, f.prototype = new u();
    }, e.extend = function() {
      var f, y, u = {};
      for (f = 0; f < arguments.length; f++) for (y in arguments[f]) Object.prototype.hasOwnProperty.call(arguments[f], y) && u[y] === void 0 && (u[y] = arguments[f][y]);
      return u;
    }, e.prepareContent = function(f, y, u, h, g) {
      return r.Promise.resolve(y).then(function(v) {
        return n.blob && (v instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(v)) !== -1) && typeof FileReader < "u" ? new r.Promise(function(A, j) {
          var $ = new FileReader();
          $.onload = function(k) {
            A(k.target.result);
          }, $.onerror = function(k) {
            j(k.target.error);
          }, $.readAsArrayBuffer(v);
        }) : v;
      }).then(function(v) {
        var A = e.getTypeOf(v);
        return A ? (A === "arraybuffer" ? v = e.transformTo("uint8array", v) : A === "string" && (g ? v = s.decode(v) : u && h !== !0 && (v = (function(j) {
          return c(j, n.uint8array ? new Uint8Array(j.length) : new Array(j.length));
        })(v))), v) : r.Promise.reject(new Error("Can't read the data of '" + f + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
      });
    };
  }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(a, t, e) {
    var n = a("./reader/readerFor"), s = a("./utils"), l = a("./signature"), r = a("./zipEntry"), m = a("./support");
    function c(i) {
      this.files = [], this.loadOptions = i;
    }
    c.prototype = { checkSignature: function(i) {
      if (!this.reader.readAndCheckSignature(i)) {
        this.reader.index -= 4;
        var d = this.reader.readString(4);
        throw new Error("Corrupted zip or bug: unexpected signature (" + s.pretty(d) + ", expected " + s.pretty(i) + ")");
      }
    }, isSignature: function(i, d) {
      var o = this.reader.index;
      this.reader.setIndex(i);
      var x = this.reader.readString(4) === d;
      return this.reader.setIndex(o), x;
    }, readBlockEndOfCentral: function() {
      this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
      var i = this.reader.readData(this.zipCommentLength), d = m.uint8array ? "uint8array" : "array", o = s.transformTo(d, i);
      this.zipComment = this.loadOptions.decodeFileName(o);
    }, readBlockZip64EndOfCentral: function() {
      this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
      for (var i, d, o, x = this.zip64EndOfCentralSize - 44; 0 < x; ) i = this.reader.readInt(2), d = this.reader.readInt(4), o = this.reader.readData(d), this.zip64ExtensibleData[i] = { id: i, length: d, value: o };
    }, readBlockZip64EndOfCentralLocator: function() {
      if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
    }, readLocalFiles: function() {
      var i, d;
      for (i = 0; i < this.files.length; i++) d = this.files[i], this.reader.setIndex(d.localHeaderOffset), this.checkSignature(l.LOCAL_FILE_HEADER), d.readLocalPart(this.reader), d.handleUTF8(), d.processAttributes();
    }, readCentralDir: function() {
      var i;
      for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(l.CENTRAL_FILE_HEADER); ) (i = new r({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(i);
      if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
    }, readEndOfCentral: function() {
      var i = this.reader.lastIndexOfSignature(l.CENTRAL_DIRECTORY_END);
      if (i < 0) throw this.isSignature(0, l.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
      this.reader.setIndex(i);
      var d = i;
      if (this.checkSignature(l.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
        if (this.zip64 = !0, (i = this.reader.lastIndexOfSignature(l.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
        if (this.reader.setIndex(i), this.checkSignature(l.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, l.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(l.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(l.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
      }
      var o = this.centralDirOffset + this.centralDirSize;
      this.zip64 && (o += 20, o += 12 + this.zip64EndOfCentralSize);
      var x = d - o;
      if (0 < x) this.isSignature(d, l.CENTRAL_FILE_HEADER) || (this.reader.zero = x);
      else if (x < 0) throw new Error("Corrupted zip: missing " + Math.abs(x) + " bytes.");
    }, prepareReader: function(i) {
      this.reader = n(i);
    }, load: function(i) {
      this.prepareReader(i), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
    } }, t.exports = c;
  }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(a, t, e) {
    var n = a("./reader/readerFor"), s = a("./utils"), l = a("./compressedObject"), r = a("./crc32"), m = a("./utf8"), c = a("./compressions"), i = a("./support");
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
      })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
      this.decompressed = new l(this.compressedSize, this.uncompressedSize, this.crc32, x, o.readData(this.compressedSize));
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
        this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = o.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = o.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = o.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = o.readInt(4));
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
          var f = s.transformTo(o, this.fileName);
          this.fileNameStr = this.loadOptions.decodeFileName(f);
        }
        var y = this.findExtraFieldUnicodeComment();
        if (y !== null) this.fileCommentStr = y;
        else {
          var u = s.transformTo(o, this.fileComment);
          this.fileCommentStr = this.loadOptions.decodeFileName(u);
        }
      }
    }, findExtraFieldUnicodePath: function() {
      var o = this.extraFields[28789];
      if (o) {
        var x = n(o.value);
        return x.readInt(1) !== 1 || r(this.fileName) !== x.readInt(4) ? null : m.utf8decode(x.readData(o.length - 5));
      }
      return null;
    }, findExtraFieldUnicodeComment: function() {
      var o = this.extraFields[25461];
      if (o) {
        var x = n(o.value);
        return x.readInt(1) !== 1 || r(this.fileComment) !== x.readInt(4) ? null : m.utf8decode(x.readData(o.length - 5));
      }
      return null;
    } }, t.exports = d;
  }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(a, t, e) {
    function n(x, f, y) {
      this.name = x, this.dir = y.dir, this.date = y.date, this.comment = y.comment, this.unixPermissions = y.unixPermissions, this.dosPermissions = y.dosPermissions, this._data = f, this._dataBinary = y.binary, this.options = { compression: y.compression, compressionOptions: y.compressionOptions };
    }
    var s = a("./stream/StreamHelper"), l = a("./stream/DataWorker"), r = a("./utf8"), m = a("./compressedObject"), c = a("./stream/GenericWorker");
    n.prototype = { internalStream: function(x) {
      var f = null, y = "string";
      try {
        if (!x) throw new Error("No output type specified.");
        var u = (y = x.toLowerCase()) === "string" || y === "text";
        y !== "binarystring" && y !== "text" || (y = "string"), f = this._decompressWorker();
        var h = !this._dataBinary;
        h && !u && (f = f.pipe(new r.Utf8EncodeWorker())), !h && u && (f = f.pipe(new r.Utf8DecodeWorker()));
      } catch (g) {
        (f = new c("error")).error(g);
      }
      return new s(f, y, "");
    }, async: function(x, f) {
      return this.internalStream(x).accumulate(f);
    }, nodeStream: function(x, f) {
      return this.internalStream(x || "nodebuffer").toNodejsStream(f);
    }, _compressWorker: function(x, f) {
      if (this._data instanceof m && this._data.compression.magic === x.magic) return this._data.getCompressedWorker();
      var y = this._decompressWorker();
      return this._dataBinary || (y = y.pipe(new r.Utf8EncodeWorker())), m.createWorkerFrom(y, x, f);
    }, _decompressWorker: function() {
      return this._data instanceof m ? this._data.getContentWorker() : this._data instanceof c ? this._data : new l(this._data);
    } };
    for (var i = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], d = function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    }, o = 0; o < i.length; o++) n.prototype[i[o]] = d;
    t.exports = n;
  }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(a, t, e) {
    (function(n) {
      var s, l, r = n.MutationObserver || n.WebKitMutationObserver;
      if (r) {
        var m = 0, c = new r(x), i = n.document.createTextNode("");
        c.observe(i, { characterData: !0 }), s = function() {
          i.data = m = ++m % 2;
        };
      } else if (n.setImmediate || n.MessageChannel === void 0) s = "document" in n && "onreadystatechange" in n.document.createElement("script") ? function() {
        var f = n.document.createElement("script");
        f.onreadystatechange = function() {
          x(), f.onreadystatechange = null, f.parentNode.removeChild(f), f = null;
        }, n.document.documentElement.appendChild(f);
      } : function() {
        setTimeout(x, 0);
      };
      else {
        var d = new n.MessageChannel();
        d.port1.onmessage = x, s = function() {
          d.port2.postMessage(0);
        };
      }
      var o = [];
      function x() {
        var f, y;
        l = !0;
        for (var u = o.length; u; ) {
          for (y = o, o = [], f = -1; ++f < u; ) y[f]();
          u = o.length;
        }
        l = !1;
      }
      t.exports = function(f) {
        o.push(f) !== 1 || l || s();
      };
    }).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
  }, {}], 37: [function(a, t, e) {
    var n = a("immediate");
    function s() {
    }
    var l = {}, r = ["REJECTED"], m = ["FULFILLED"], c = ["PENDING"];
    function i(u) {
      if (typeof u != "function") throw new TypeError("resolver must be a function");
      this.state = c, this.queue = [], this.outcome = void 0, u !== s && f(this, u);
    }
    function d(u, h, g) {
      this.promise = u, typeof h == "function" && (this.onFulfilled = h, this.callFulfilled = this.otherCallFulfilled), typeof g == "function" && (this.onRejected = g, this.callRejected = this.otherCallRejected);
    }
    function o(u, h, g) {
      n(function() {
        var v;
        try {
          v = h(g);
        } catch (A) {
          return l.reject(u, A);
        }
        v === u ? l.reject(u, new TypeError("Cannot resolve promise with itself")) : l.resolve(u, v);
      });
    }
    function x(u) {
      var h = u && u.then;
      if (u && (typeof u == "object" || typeof u == "function") && typeof h == "function") return function() {
        h.apply(u, arguments);
      };
    }
    function f(u, h) {
      var g = !1;
      function v($) {
        g || (g = !0, l.reject(u, $));
      }
      function A($) {
        g || (g = !0, l.resolve(u, $));
      }
      var j = y(function() {
        h(A, v);
      });
      j.status === "error" && v(j.value);
    }
    function y(u, h) {
      var g = {};
      try {
        g.value = u(h), g.status = "success";
      } catch (v) {
        g.status = "error", g.value = v;
      }
      return g;
    }
    (t.exports = i).prototype.finally = function(u) {
      if (typeof u != "function") return this;
      var h = this.constructor;
      return this.then(function(g) {
        return h.resolve(u()).then(function() {
          return g;
        });
      }, function(g) {
        return h.resolve(u()).then(function() {
          throw g;
        });
      });
    }, i.prototype.catch = function(u) {
      return this.then(null, u);
    }, i.prototype.then = function(u, h) {
      if (typeof u != "function" && this.state === m || typeof h != "function" && this.state === r) return this;
      var g = new this.constructor(s);
      return this.state !== c ? o(g, this.state === m ? u : h, this.outcome) : this.queue.push(new d(g, u, h)), g;
    }, d.prototype.callFulfilled = function(u) {
      l.resolve(this.promise, u);
    }, d.prototype.otherCallFulfilled = function(u) {
      o(this.promise, this.onFulfilled, u);
    }, d.prototype.callRejected = function(u) {
      l.reject(this.promise, u);
    }, d.prototype.otherCallRejected = function(u) {
      o(this.promise, this.onRejected, u);
    }, l.resolve = function(u, h) {
      var g = y(x, h);
      if (g.status === "error") return l.reject(u, g.value);
      var v = g.value;
      if (v) f(u, v);
      else {
        u.state = m, u.outcome = h;
        for (var A = -1, j = u.queue.length; ++A < j; ) u.queue[A].callFulfilled(h);
      }
      return u;
    }, l.reject = function(u, h) {
      u.state = r, u.outcome = h;
      for (var g = -1, v = u.queue.length; ++g < v; ) u.queue[g].callRejected(h);
      return u;
    }, i.resolve = function(u) {
      return u instanceof this ? u : l.resolve(new this(s), u);
    }, i.reject = function(u) {
      var h = new this(s);
      return l.reject(h, u);
    }, i.all = function(u) {
      var h = this;
      if (Object.prototype.toString.call(u) !== "[object Array]") return this.reject(new TypeError("must be an array"));
      var g = u.length, v = !1;
      if (!g) return this.resolve([]);
      for (var A = new Array(g), j = 0, $ = -1, k = new this(s); ++$ < g; ) S(u[$], $);
      return k;
      function S(E, X) {
        h.resolve(E).then(function(_) {
          A[X] = _, ++j !== g || v || (v = !0, l.resolve(k, A));
        }, function(_) {
          v || (v = !0, l.reject(k, _));
        });
      }
    }, i.race = function(u) {
      var h = this;
      if (Object.prototype.toString.call(u) !== "[object Array]") return this.reject(new TypeError("must be an array"));
      var g = u.length, v = !1;
      if (!g) return this.resolve([]);
      for (var A = -1, j = new this(s); ++A < g; ) $ = u[A], h.resolve($).then(function(k) {
        v || (v = !0, l.resolve(j, k));
      }, function(k) {
        v || (v = !0, l.reject(j, k));
      });
      var $;
      return j;
    };
  }, { immediate: 36 }], 38: [function(a, t, e) {
    var n = {};
    (0, a("./lib/utils/common").assign)(n, a("./lib/deflate"), a("./lib/inflate"), a("./lib/zlib/constants")), t.exports = n;
  }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(a, t, e) {
    var n = a("./zlib/deflate"), s = a("./utils/common"), l = a("./utils/strings"), r = a("./zlib/messages"), m = a("./zlib/zstream"), c = Object.prototype.toString, i = 0, d = -1, o = 0, x = 8;
    function f(u) {
      if (!(this instanceof f)) return new f(u);
      this.options = s.assign({ level: d, method: x, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: o, to: "" }, u || {});
      var h = this.options;
      h.raw && 0 < h.windowBits ? h.windowBits = -h.windowBits : h.gzip && 0 < h.windowBits && h.windowBits < 16 && (h.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new m(), this.strm.avail_out = 0;
      var g = n.deflateInit2(this.strm, h.level, h.method, h.windowBits, h.memLevel, h.strategy);
      if (g !== i) throw new Error(r[g]);
      if (h.header && n.deflateSetHeader(this.strm, h.header), h.dictionary) {
        var v;
        if (v = typeof h.dictionary == "string" ? l.string2buf(h.dictionary) : c.call(h.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(h.dictionary) : h.dictionary, (g = n.deflateSetDictionary(this.strm, v)) !== i) throw new Error(r[g]);
        this._dict_set = !0;
      }
    }
    function y(u, h) {
      var g = new f(h);
      if (g.push(u, !0), g.err) throw g.msg || r[g.err];
      return g.result;
    }
    f.prototype.push = function(u, h) {
      var g, v, A = this.strm, j = this.options.chunkSize;
      if (this.ended) return !1;
      v = h === ~~h ? h : h === !0 ? 4 : 0, typeof u == "string" ? A.input = l.string2buf(u) : c.call(u) === "[object ArrayBuffer]" ? A.input = new Uint8Array(u) : A.input = u, A.next_in = 0, A.avail_in = A.input.length;
      do {
        if (A.avail_out === 0 && (A.output = new s.Buf8(j), A.next_out = 0, A.avail_out = j), (g = n.deflate(A, v)) !== 1 && g !== i) return this.onEnd(g), !(this.ended = !0);
        A.avail_out !== 0 && (A.avail_in !== 0 || v !== 4 && v !== 2) || (this.options.to === "string" ? this.onData(l.buf2binstring(s.shrinkBuf(A.output, A.next_out))) : this.onData(s.shrinkBuf(A.output, A.next_out)));
      } while ((0 < A.avail_in || A.avail_out === 0) && g !== 1);
      return v === 4 ? (g = n.deflateEnd(this.strm), this.onEnd(g), this.ended = !0, g === i) : v !== 2 || (this.onEnd(i), !(A.avail_out = 0));
    }, f.prototype.onData = function(u) {
      this.chunks.push(u);
    }, f.prototype.onEnd = function(u) {
      u === i && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = u, this.msg = this.strm.msg;
    }, e.Deflate = f, e.deflate = y, e.deflateRaw = function(u, h) {
      return (h = h || {}).raw = !0, y(u, h);
    }, e.gzip = function(u, h) {
      return (h = h || {}).gzip = !0, y(u, h);
    };
  }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(a, t, e) {
    var n = a("./zlib/inflate"), s = a("./utils/common"), l = a("./utils/strings"), r = a("./zlib/constants"), m = a("./zlib/messages"), c = a("./zlib/zstream"), i = a("./zlib/gzheader"), d = Object.prototype.toString;
    function o(f) {
      if (!(this instanceof o)) return new o(f);
      this.options = s.assign({ chunkSize: 16384, windowBits: 0, to: "" }, f || {});
      var y = this.options;
      y.raw && 0 <= y.windowBits && y.windowBits < 16 && (y.windowBits = -y.windowBits, y.windowBits === 0 && (y.windowBits = -15)), !(0 <= y.windowBits && y.windowBits < 16) || f && f.windowBits || (y.windowBits += 32), 15 < y.windowBits && y.windowBits < 48 && (15 & y.windowBits) == 0 && (y.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new c(), this.strm.avail_out = 0;
      var u = n.inflateInit2(this.strm, y.windowBits);
      if (u !== r.Z_OK) throw new Error(m[u]);
      this.header = new i(), n.inflateGetHeader(this.strm, this.header);
    }
    function x(f, y) {
      var u = new o(y);
      if (u.push(f, !0), u.err) throw u.msg || m[u.err];
      return u.result;
    }
    o.prototype.push = function(f, y) {
      var u, h, g, v, A, j, $ = this.strm, k = this.options.chunkSize, S = this.options.dictionary, E = !1;
      if (this.ended) return !1;
      h = y === ~~y ? y : y === !0 ? r.Z_FINISH : r.Z_NO_FLUSH, typeof f == "string" ? $.input = l.binstring2buf(f) : d.call(f) === "[object ArrayBuffer]" ? $.input = new Uint8Array(f) : $.input = f, $.next_in = 0, $.avail_in = $.input.length;
      do {
        if ($.avail_out === 0 && ($.output = new s.Buf8(k), $.next_out = 0, $.avail_out = k), (u = n.inflate($, r.Z_NO_FLUSH)) === r.Z_NEED_DICT && S && (j = typeof S == "string" ? l.string2buf(S) : d.call(S) === "[object ArrayBuffer]" ? new Uint8Array(S) : S, u = n.inflateSetDictionary(this.strm, j)), u === r.Z_BUF_ERROR && E === !0 && (u = r.Z_OK, E = !1), u !== r.Z_STREAM_END && u !== r.Z_OK) return this.onEnd(u), !(this.ended = !0);
        $.next_out && ($.avail_out !== 0 && u !== r.Z_STREAM_END && ($.avail_in !== 0 || h !== r.Z_FINISH && h !== r.Z_SYNC_FLUSH) || (this.options.to === "string" ? (g = l.utf8border($.output, $.next_out), v = $.next_out - g, A = l.buf2string($.output, g), $.next_out = v, $.avail_out = k - v, v && s.arraySet($.output, $.output, g, v, 0), this.onData(A)) : this.onData(s.shrinkBuf($.output, $.next_out)))), $.avail_in === 0 && $.avail_out === 0 && (E = !0);
      } while ((0 < $.avail_in || $.avail_out === 0) && u !== r.Z_STREAM_END);
      return u === r.Z_STREAM_END && (h = r.Z_FINISH), h === r.Z_FINISH ? (u = n.inflateEnd(this.strm), this.onEnd(u), this.ended = !0, u === r.Z_OK) : h !== r.Z_SYNC_FLUSH || (this.onEnd(r.Z_OK), !($.avail_out = 0));
    }, o.prototype.onData = function(f) {
      this.chunks.push(f);
    }, o.prototype.onEnd = function(f) {
      f === r.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = f, this.msg = this.strm.msg;
    }, e.Inflate = o, e.inflate = x, e.inflateRaw = function(f, y) {
      return (y = y || {}).raw = !0, x(f, y);
    }, e.ungzip = x;
  }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(a, t, e) {
    var n = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
    e.assign = function(r) {
      for (var m = Array.prototype.slice.call(arguments, 1); m.length; ) {
        var c = m.shift();
        if (c) {
          if (typeof c != "object") throw new TypeError(c + "must be non-object");
          for (var i in c) c.hasOwnProperty(i) && (r[i] = c[i]);
        }
      }
      return r;
    }, e.shrinkBuf = function(r, m) {
      return r.length === m ? r : r.subarray ? r.subarray(0, m) : (r.length = m, r);
    };
    var s = { arraySet: function(r, m, c, i, d) {
      if (m.subarray && r.subarray) r.set(m.subarray(c, c + i), d);
      else for (var o = 0; o < i; o++) r[d + o] = m[c + o];
    }, flattenChunks: function(r) {
      var m, c, i, d, o, x;
      for (m = i = 0, c = r.length; m < c; m++) i += r[m].length;
      for (x = new Uint8Array(i), m = d = 0, c = r.length; m < c; m++) o = r[m], x.set(o, d), d += o.length;
      return x;
    } }, l = { arraySet: function(r, m, c, i, d) {
      for (var o = 0; o < i; o++) r[d + o] = m[c + o];
    }, flattenChunks: function(r) {
      return [].concat.apply([], r);
    } };
    e.setTyped = function(r) {
      r ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, s)) : (e.Buf8 = Array, e.Buf16 = Array, e.Buf32 = Array, e.assign(e, l));
    }, e.setTyped(n);
  }, {}], 42: [function(a, t, e) {
    var n = a("./common"), s = !0, l = !0;
    try {
      String.fromCharCode.apply(null, [0]);
    } catch {
      s = !1;
    }
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch {
      l = !1;
    }
    for (var r = new n.Buf8(256), m = 0; m < 256; m++) r[m] = 252 <= m ? 6 : 248 <= m ? 5 : 240 <= m ? 4 : 224 <= m ? 3 : 192 <= m ? 2 : 1;
    function c(i, d) {
      if (d < 65537 && (i.subarray && l || !i.subarray && s)) return String.fromCharCode.apply(null, n.shrinkBuf(i, d));
      for (var o = "", x = 0; x < d; x++) o += String.fromCharCode(i[x]);
      return o;
    }
    r[254] = r[254] = 1, e.string2buf = function(i) {
      var d, o, x, f, y, u = i.length, h = 0;
      for (f = 0; f < u; f++) (64512 & (o = i.charCodeAt(f))) == 55296 && f + 1 < u && (64512 & (x = i.charCodeAt(f + 1))) == 56320 && (o = 65536 + (o - 55296 << 10) + (x - 56320), f++), h += o < 128 ? 1 : o < 2048 ? 2 : o < 65536 ? 3 : 4;
      for (d = new n.Buf8(h), f = y = 0; y < h; f++) (64512 & (o = i.charCodeAt(f))) == 55296 && f + 1 < u && (64512 & (x = i.charCodeAt(f + 1))) == 56320 && (o = 65536 + (o - 55296 << 10) + (x - 56320), f++), o < 128 ? d[y++] = o : (o < 2048 ? d[y++] = 192 | o >>> 6 : (o < 65536 ? d[y++] = 224 | o >>> 12 : (d[y++] = 240 | o >>> 18, d[y++] = 128 | o >>> 12 & 63), d[y++] = 128 | o >>> 6 & 63), d[y++] = 128 | 63 & o);
      return d;
    }, e.buf2binstring = function(i) {
      return c(i, i.length);
    }, e.binstring2buf = function(i) {
      for (var d = new n.Buf8(i.length), o = 0, x = d.length; o < x; o++) d[o] = i.charCodeAt(o);
      return d;
    }, e.buf2string = function(i, d) {
      var o, x, f, y, u = d || i.length, h = new Array(2 * u);
      for (o = x = 0; o < u; ) if ((f = i[o++]) < 128) h[x++] = f;
      else if (4 < (y = r[f])) h[x++] = 65533, o += y - 1;
      else {
        for (f &= y === 2 ? 31 : y === 3 ? 15 : 7; 1 < y && o < u; ) f = f << 6 | 63 & i[o++], y--;
        1 < y ? h[x++] = 65533 : f < 65536 ? h[x++] = f : (f -= 65536, h[x++] = 55296 | f >> 10 & 1023, h[x++] = 56320 | 1023 & f);
      }
      return c(h, x);
    }, e.utf8border = function(i, d) {
      var o;
      for ((d = d || i.length) > i.length && (d = i.length), o = d - 1; 0 <= o && (192 & i[o]) == 128; ) o--;
      return o < 0 || o === 0 ? d : o + r[i[o]] > d ? o : d;
    };
  }, { "./common": 41 }], 43: [function(a, t, e) {
    t.exports = function(n, s, l, r) {
      for (var m = 65535 & n | 0, c = n >>> 16 & 65535 | 0, i = 0; l !== 0; ) {
        for (l -= i = 2e3 < l ? 2e3 : l; c = c + (m = m + s[r++] | 0) | 0, --i; ) ;
        m %= 65521, c %= 65521;
      }
      return m | c << 16 | 0;
    };
  }, {}], 44: [function(a, t, e) {
    t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
  }, {}], 45: [function(a, t, e) {
    var n = (function() {
      for (var s, l = [], r = 0; r < 256; r++) {
        s = r;
        for (var m = 0; m < 8; m++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
        l[r] = s;
      }
      return l;
    })();
    t.exports = function(s, l, r, m) {
      var c = n, i = m + r;
      s ^= -1;
      for (var d = m; d < i; d++) s = s >>> 8 ^ c[255 & (s ^ l[d])];
      return -1 ^ s;
    };
  }, {}], 46: [function(a, t, e) {
    var n, s = a("../utils/common"), l = a("./trees"), r = a("./adler32"), m = a("./crc32"), c = a("./messages"), i = 0, d = 4, o = 0, x = -2, f = -1, y = 4, u = 2, h = 8, g = 9, v = 286, A = 30, j = 19, $ = 2 * v + 1, k = 15, S = 3, E = 258, X = E + S + 1, _ = 42, C = 113, w = 1, q = 2, T = 3, I = 4;
    function U(p, G) {
      return p.msg = c[G], G;
    }
    function N(p) {
      return (p << 1) - (4 < p ? 9 : 0);
    }
    function z(p) {
      for (var G = p.length; 0 <= --G; ) p[G] = 0;
    }
    function P(p) {
      var G = p.state, R = G.pending;
      R > p.avail_out && (R = p.avail_out), R !== 0 && (s.arraySet(p.output, G.pending_buf, G.pending_out, R, p.next_out), p.next_out += R, G.pending_out += R, p.total_out += R, p.avail_out -= R, G.pending -= R, G.pending === 0 && (G.pending_out = 0));
    }
    function F(p, G) {
      l._tr_flush_block(p, 0 <= p.block_start ? p.block_start : -1, p.strstart - p.block_start, G), p.block_start = p.strstart, P(p.strm);
    }
    function J(p, G) {
      p.pending_buf[p.pending++] = G;
    }
    function K(p, G) {
      p.pending_buf[p.pending++] = G >>> 8 & 255, p.pending_buf[p.pending++] = 255 & G;
    }
    function Y(p, G) {
      var R, b, L = p.max_chain_length, M = p.strstart, B = p.prev_length, O = p.nice_match, D = p.strstart > p.w_size - X ? p.strstart - (p.w_size - X) : 0, H = p.window, aa = p.w_mask, V = p.prev, sa = p.strstart + E, la = H[M + B - 1], ra = H[M + B];
      p.prev_length >= p.good_match && (L >>= 2), O > p.lookahead && (O = p.lookahead);
      do
        if (H[(R = G) + B] === ra && H[R + B - 1] === la && H[R] === H[M] && H[++R] === H[M + 1]) {
          M += 2, R++;
          do
            ;
          while (H[++M] === H[++R] && H[++M] === H[++R] && H[++M] === H[++R] && H[++M] === H[++R] && H[++M] === H[++R] && H[++M] === H[++R] && H[++M] === H[++R] && H[++M] === H[++R] && M < sa);
          if (b = E - (sa - M), M = sa - E, B < b) {
            if (p.match_start = G, O <= (B = b)) break;
            la = H[M + B - 1], ra = H[M + B];
          }
        }
      while ((G = V[G & aa]) > D && --L != 0);
      return B <= p.lookahead ? B : p.lookahead;
    }
    function fa(p) {
      var G, R, b, L, M, B, O, D, H, aa, V = p.w_size;
      do {
        if (L = p.window_size - p.lookahead - p.strstart, p.strstart >= V + (V - X)) {
          for (s.arraySet(p.window, p.window, V, V, 0), p.match_start -= V, p.strstart -= V, p.block_start -= V, G = R = p.hash_size; b = p.head[--G], p.head[G] = V <= b ? b - V : 0, --R; ) ;
          for (G = R = V; b = p.prev[--G], p.prev[G] = V <= b ? b - V : 0, --R; ) ;
          L += V;
        }
        if (p.strm.avail_in === 0) break;
        if (B = p.strm, O = p.window, D = p.strstart + p.lookahead, H = L, aa = void 0, aa = B.avail_in, H < aa && (aa = H), R = aa === 0 ? 0 : (B.avail_in -= aa, s.arraySet(O, B.input, B.next_in, aa, D), B.state.wrap === 1 ? B.adler = r(B.adler, O, aa, D) : B.state.wrap === 2 && (B.adler = m(B.adler, O, aa, D)), B.next_in += aa, B.total_in += aa, aa), p.lookahead += R, p.lookahead + p.insert >= S) for (M = p.strstart - p.insert, p.ins_h = p.window[M], p.ins_h = (p.ins_h << p.hash_shift ^ p.window[M + 1]) & p.hash_mask; p.insert && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[M + S - 1]) & p.hash_mask, p.prev[M & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = M, M++, p.insert--, !(p.lookahead + p.insert < S)); ) ;
      } while (p.lookahead < X && p.strm.avail_in !== 0);
    }
    function da(p, G) {
      for (var R, b; ; ) {
        if (p.lookahead < X) {
          if (fa(p), p.lookahead < X && G === i) return w;
          if (p.lookahead === 0) break;
        }
        if (R = 0, p.lookahead >= S && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + S - 1]) & p.hash_mask, R = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart), R !== 0 && p.strstart - R <= p.w_size - X && (p.match_length = Y(p, R)), p.match_length >= S) if (b = l._tr_tally(p, p.strstart - p.match_start, p.match_length - S), p.lookahead -= p.match_length, p.match_length <= p.max_lazy_match && p.lookahead >= S) {
          for (p.match_length--; p.strstart++, p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + S - 1]) & p.hash_mask, R = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart, --p.match_length != 0; ) ;
          p.strstart++;
        } else p.strstart += p.match_length, p.match_length = 0, p.ins_h = p.window[p.strstart], p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + 1]) & p.hash_mask;
        else b = l._tr_tally(p, 0, p.window[p.strstart]), p.lookahead--, p.strstart++;
        if (b && (F(p, !1), p.strm.avail_out === 0)) return w;
      }
      return p.insert = p.strstart < S - 1 ? p.strstart : S - 1, G === d ? (F(p, !0), p.strm.avail_out === 0 ? T : I) : p.last_lit && (F(p, !1), p.strm.avail_out === 0) ? w : q;
    }
    function W(p, G) {
      for (var R, b, L; ; ) {
        if (p.lookahead < X) {
          if (fa(p), p.lookahead < X && G === i) return w;
          if (p.lookahead === 0) break;
        }
        if (R = 0, p.lookahead >= S && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + S - 1]) & p.hash_mask, R = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart), p.prev_length = p.match_length, p.prev_match = p.match_start, p.match_length = S - 1, R !== 0 && p.prev_length < p.max_lazy_match && p.strstart - R <= p.w_size - X && (p.match_length = Y(p, R), p.match_length <= 5 && (p.strategy === 1 || p.match_length === S && 4096 < p.strstart - p.match_start) && (p.match_length = S - 1)), p.prev_length >= S && p.match_length <= p.prev_length) {
          for (L = p.strstart + p.lookahead - S, b = l._tr_tally(p, p.strstart - 1 - p.prev_match, p.prev_length - S), p.lookahead -= p.prev_length - 1, p.prev_length -= 2; ++p.strstart <= L && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + S - 1]) & p.hash_mask, R = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart), --p.prev_length != 0; ) ;
          if (p.match_available = 0, p.match_length = S - 1, p.strstart++, b && (F(p, !1), p.strm.avail_out === 0)) return w;
        } else if (p.match_available) {
          if ((b = l._tr_tally(p, 0, p.window[p.strstart - 1])) && F(p, !1), p.strstart++, p.lookahead--, p.strm.avail_out === 0) return w;
        } else p.match_available = 1, p.strstart++, p.lookahead--;
      }
      return p.match_available && (b = l._tr_tally(p, 0, p.window[p.strstart - 1]), p.match_available = 0), p.insert = p.strstart < S - 1 ? p.strstart : S - 1, G === d ? (F(p, !0), p.strm.avail_out === 0 ? T : I) : p.last_lit && (F(p, !1), p.strm.avail_out === 0) ? w : q;
    }
    function ta(p, G, R, b, L) {
      this.good_length = p, this.max_lazy = G, this.nice_length = R, this.max_chain = b, this.func = L;
    }
    function ma() {
      this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = h, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new s.Buf16(2 * $), this.dyn_dtree = new s.Buf16(2 * (2 * A + 1)), this.bl_tree = new s.Buf16(2 * (2 * j + 1)), z(this.dyn_ltree), z(this.dyn_dtree), z(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new s.Buf16(k + 1), this.heap = new s.Buf16(2 * v + 1), z(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new s.Buf16(2 * v + 1), z(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
    }
    function Q(p) {
      var G;
      return p && p.state ? (p.total_in = p.total_out = 0, p.data_type = u, (G = p.state).pending = 0, G.pending_out = 0, G.wrap < 0 && (G.wrap = -G.wrap), G.status = G.wrap ? _ : C, p.adler = G.wrap === 2 ? 0 : 1, G.last_flush = i, l._tr_init(G), o) : U(p, x);
    }
    function oa(p) {
      var G = Q(p);
      return G === o && (function(R) {
        R.window_size = 2 * R.w_size, z(R.head), R.max_lazy_match = n[R.level].max_lazy, R.good_match = n[R.level].good_length, R.nice_match = n[R.level].nice_length, R.max_chain_length = n[R.level].max_chain, R.strstart = 0, R.block_start = 0, R.lookahead = 0, R.insert = 0, R.match_length = R.prev_length = S - 1, R.match_available = 0, R.ins_h = 0;
      })(p.state), G;
    }
    function ia(p, G, R, b, L, M) {
      if (!p) return x;
      var B = 1;
      if (G === f && (G = 6), b < 0 ? (B = 0, b = -b) : 15 < b && (B = 2, b -= 16), L < 1 || g < L || R !== h || b < 8 || 15 < b || G < 0 || 9 < G || M < 0 || y < M) return U(p, x);
      b === 8 && (b = 9);
      var O = new ma();
      return (p.state = O).strm = p, O.wrap = B, O.gzhead = null, O.w_bits = b, O.w_size = 1 << O.w_bits, O.w_mask = O.w_size - 1, O.hash_bits = L + 7, O.hash_size = 1 << O.hash_bits, O.hash_mask = O.hash_size - 1, O.hash_shift = ~~((O.hash_bits + S - 1) / S), O.window = new s.Buf8(2 * O.w_size), O.head = new s.Buf16(O.hash_size), O.prev = new s.Buf16(O.w_size), O.lit_bufsize = 1 << L + 6, O.pending_buf_size = 4 * O.lit_bufsize, O.pending_buf = new s.Buf8(O.pending_buf_size), O.d_buf = 1 * O.lit_bufsize, O.l_buf = 3 * O.lit_bufsize, O.level = G, O.strategy = M, O.method = R, oa(p);
    }
    n = [new ta(0, 0, 0, 0, function(p, G) {
      var R = 65535;
      for (R > p.pending_buf_size - 5 && (R = p.pending_buf_size - 5); ; ) {
        if (p.lookahead <= 1) {
          if (fa(p), p.lookahead === 0 && G === i) return w;
          if (p.lookahead === 0) break;
        }
        p.strstart += p.lookahead, p.lookahead = 0;
        var b = p.block_start + R;
        if ((p.strstart === 0 || p.strstart >= b) && (p.lookahead = p.strstart - b, p.strstart = b, F(p, !1), p.strm.avail_out === 0) || p.strstart - p.block_start >= p.w_size - X && (F(p, !1), p.strm.avail_out === 0)) return w;
      }
      return p.insert = 0, G === d ? (F(p, !0), p.strm.avail_out === 0 ? T : I) : (p.strstart > p.block_start && (F(p, !1), p.strm.avail_out), w);
    }), new ta(4, 4, 8, 4, da), new ta(4, 5, 16, 8, da), new ta(4, 6, 32, 32, da), new ta(4, 4, 16, 16, W), new ta(8, 16, 32, 32, W), new ta(8, 16, 128, 128, W), new ta(8, 32, 128, 256, W), new ta(32, 128, 258, 1024, W), new ta(32, 258, 258, 4096, W)], e.deflateInit = function(p, G) {
      return ia(p, G, h, 15, 8, 0);
    }, e.deflateInit2 = ia, e.deflateReset = oa, e.deflateResetKeep = Q, e.deflateSetHeader = function(p, G) {
      return p && p.state ? p.state.wrap !== 2 ? x : (p.state.gzhead = G, o) : x;
    }, e.deflate = function(p, G) {
      var R, b, L, M;
      if (!p || !p.state || 5 < G || G < 0) return p ? U(p, x) : x;
      if (b = p.state, !p.output || !p.input && p.avail_in !== 0 || b.status === 666 && G !== d) return U(p, p.avail_out === 0 ? -5 : x);
      if (b.strm = p, R = b.last_flush, b.last_flush = G, b.status === _) if (b.wrap === 2) p.adler = 0, J(b, 31), J(b, 139), J(b, 8), b.gzhead ? (J(b, (b.gzhead.text ? 1 : 0) + (b.gzhead.hcrc ? 2 : 0) + (b.gzhead.extra ? 4 : 0) + (b.gzhead.name ? 8 : 0) + (b.gzhead.comment ? 16 : 0)), J(b, 255 & b.gzhead.time), J(b, b.gzhead.time >> 8 & 255), J(b, b.gzhead.time >> 16 & 255), J(b, b.gzhead.time >> 24 & 255), J(b, b.level === 9 ? 2 : 2 <= b.strategy || b.level < 2 ? 4 : 0), J(b, 255 & b.gzhead.os), b.gzhead.extra && b.gzhead.extra.length && (J(b, 255 & b.gzhead.extra.length), J(b, b.gzhead.extra.length >> 8 & 255)), b.gzhead.hcrc && (p.adler = m(p.adler, b.pending_buf, b.pending, 0)), b.gzindex = 0, b.status = 69) : (J(b, 0), J(b, 0), J(b, 0), J(b, 0), J(b, 0), J(b, b.level === 9 ? 2 : 2 <= b.strategy || b.level < 2 ? 4 : 0), J(b, 3), b.status = C);
      else {
        var B = h + (b.w_bits - 8 << 4) << 8;
        B |= (2 <= b.strategy || b.level < 2 ? 0 : b.level < 6 ? 1 : b.level === 6 ? 2 : 3) << 6, b.strstart !== 0 && (B |= 32), B += 31 - B % 31, b.status = C, K(b, B), b.strstart !== 0 && (K(b, p.adler >>> 16), K(b, 65535 & p.adler)), p.adler = 1;
      }
      if (b.status === 69) if (b.gzhead.extra) {
        for (L = b.pending; b.gzindex < (65535 & b.gzhead.extra.length) && (b.pending !== b.pending_buf_size || (b.gzhead.hcrc && b.pending > L && (p.adler = m(p.adler, b.pending_buf, b.pending - L, L)), P(p), L = b.pending, b.pending !== b.pending_buf_size)); ) J(b, 255 & b.gzhead.extra[b.gzindex]), b.gzindex++;
        b.gzhead.hcrc && b.pending > L && (p.adler = m(p.adler, b.pending_buf, b.pending - L, L)), b.gzindex === b.gzhead.extra.length && (b.gzindex = 0, b.status = 73);
      } else b.status = 73;
      if (b.status === 73) if (b.gzhead.name) {
        L = b.pending;
        do {
          if (b.pending === b.pending_buf_size && (b.gzhead.hcrc && b.pending > L && (p.adler = m(p.adler, b.pending_buf, b.pending - L, L)), P(p), L = b.pending, b.pending === b.pending_buf_size)) {
            M = 1;
            break;
          }
          M = b.gzindex < b.gzhead.name.length ? 255 & b.gzhead.name.charCodeAt(b.gzindex++) : 0, J(b, M);
        } while (M !== 0);
        b.gzhead.hcrc && b.pending > L && (p.adler = m(p.adler, b.pending_buf, b.pending - L, L)), M === 0 && (b.gzindex = 0, b.status = 91);
      } else b.status = 91;
      if (b.status === 91) if (b.gzhead.comment) {
        L = b.pending;
        do {
          if (b.pending === b.pending_buf_size && (b.gzhead.hcrc && b.pending > L && (p.adler = m(p.adler, b.pending_buf, b.pending - L, L)), P(p), L = b.pending, b.pending === b.pending_buf_size)) {
            M = 1;
            break;
          }
          M = b.gzindex < b.gzhead.comment.length ? 255 & b.gzhead.comment.charCodeAt(b.gzindex++) : 0, J(b, M);
        } while (M !== 0);
        b.gzhead.hcrc && b.pending > L && (p.adler = m(p.adler, b.pending_buf, b.pending - L, L)), M === 0 && (b.status = 103);
      } else b.status = 103;
      if (b.status === 103 && (b.gzhead.hcrc ? (b.pending + 2 > b.pending_buf_size && P(p), b.pending + 2 <= b.pending_buf_size && (J(b, 255 & p.adler), J(b, p.adler >> 8 & 255), p.adler = 0, b.status = C)) : b.status = C), b.pending !== 0) {
        if (P(p), p.avail_out === 0) return b.last_flush = -1, o;
      } else if (p.avail_in === 0 && N(G) <= N(R) && G !== d) return U(p, -5);
      if (b.status === 666 && p.avail_in !== 0) return U(p, -5);
      if (p.avail_in !== 0 || b.lookahead !== 0 || G !== i && b.status !== 666) {
        var O = b.strategy === 2 ? (function(D, H) {
          for (var aa; ; ) {
            if (D.lookahead === 0 && (fa(D), D.lookahead === 0)) {
              if (H === i) return w;
              break;
            }
            if (D.match_length = 0, aa = l._tr_tally(D, 0, D.window[D.strstart]), D.lookahead--, D.strstart++, aa && (F(D, !1), D.strm.avail_out === 0)) return w;
          }
          return D.insert = 0, H === d ? (F(D, !0), D.strm.avail_out === 0 ? T : I) : D.last_lit && (F(D, !1), D.strm.avail_out === 0) ? w : q;
        })(b, G) : b.strategy === 3 ? (function(D, H) {
          for (var aa, V, sa, la, ra = D.window; ; ) {
            if (D.lookahead <= E) {
              if (fa(D), D.lookahead <= E && H === i) return w;
              if (D.lookahead === 0) break;
            }
            if (D.match_length = 0, D.lookahead >= S && 0 < D.strstart && (V = ra[sa = D.strstart - 1]) === ra[++sa] && V === ra[++sa] && V === ra[++sa]) {
              la = D.strstart + E;
              do
                ;
              while (V === ra[++sa] && V === ra[++sa] && V === ra[++sa] && V === ra[++sa] && V === ra[++sa] && V === ra[++sa] && V === ra[++sa] && V === ra[++sa] && sa < la);
              D.match_length = E - (la - sa), D.match_length > D.lookahead && (D.match_length = D.lookahead);
            }
            if (D.match_length >= S ? (aa = l._tr_tally(D, 1, D.match_length - S), D.lookahead -= D.match_length, D.strstart += D.match_length, D.match_length = 0) : (aa = l._tr_tally(D, 0, D.window[D.strstart]), D.lookahead--, D.strstart++), aa && (F(D, !1), D.strm.avail_out === 0)) return w;
          }
          return D.insert = 0, H === d ? (F(D, !0), D.strm.avail_out === 0 ? T : I) : D.last_lit && (F(D, !1), D.strm.avail_out === 0) ? w : q;
        })(b, G) : n[b.level].func(b, G);
        if (O !== T && O !== I || (b.status = 666), O === w || O === T) return p.avail_out === 0 && (b.last_flush = -1), o;
        if (O === q && (G === 1 ? l._tr_align(b) : G !== 5 && (l._tr_stored_block(b, 0, 0, !1), G === 3 && (z(b.head), b.lookahead === 0 && (b.strstart = 0, b.block_start = 0, b.insert = 0))), P(p), p.avail_out === 0)) return b.last_flush = -1, o;
      }
      return G !== d ? o : b.wrap <= 0 ? 1 : (b.wrap === 2 ? (J(b, 255 & p.adler), J(b, p.adler >> 8 & 255), J(b, p.adler >> 16 & 255), J(b, p.adler >> 24 & 255), J(b, 255 & p.total_in), J(b, p.total_in >> 8 & 255), J(b, p.total_in >> 16 & 255), J(b, p.total_in >> 24 & 255)) : (K(b, p.adler >>> 16), K(b, 65535 & p.adler)), P(p), 0 < b.wrap && (b.wrap = -b.wrap), b.pending !== 0 ? o : 1);
    }, e.deflateEnd = function(p) {
      var G;
      return p && p.state ? (G = p.state.status) !== _ && G !== 69 && G !== 73 && G !== 91 && G !== 103 && G !== C && G !== 666 ? U(p, x) : (p.state = null, G === C ? U(p, -3) : o) : x;
    }, e.deflateSetDictionary = function(p, G) {
      var R, b, L, M, B, O, D, H, aa = G.length;
      if (!p || !p.state || (M = (R = p.state).wrap) === 2 || M === 1 && R.status !== _ || R.lookahead) return x;
      for (M === 1 && (p.adler = r(p.adler, G, aa, 0)), R.wrap = 0, aa >= R.w_size && (M === 0 && (z(R.head), R.strstart = 0, R.block_start = 0, R.insert = 0), H = new s.Buf8(R.w_size), s.arraySet(H, G, aa - R.w_size, R.w_size, 0), G = H, aa = R.w_size), B = p.avail_in, O = p.next_in, D = p.input, p.avail_in = aa, p.next_in = 0, p.input = G, fa(R); R.lookahead >= S; ) {
        for (b = R.strstart, L = R.lookahead - (S - 1); R.ins_h = (R.ins_h << R.hash_shift ^ R.window[b + S - 1]) & R.hash_mask, R.prev[b & R.w_mask] = R.head[R.ins_h], R.head[R.ins_h] = b, b++, --L; ) ;
        R.strstart = b, R.lookahead = S - 1, fa(R);
      }
      return R.strstart += R.lookahead, R.block_start = R.strstart, R.insert = R.lookahead, R.lookahead = 0, R.match_length = R.prev_length = S - 1, R.match_available = 0, p.next_in = O, p.input = D, p.avail_in = B, R.wrap = M, o;
    }, e.deflateInfo = "pako deflate (from Nodeca project)";
  }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(a, t, e) {
    t.exports = function() {
      this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
    };
  }, {}], 48: [function(a, t, e) {
    t.exports = function(n, s) {
      var l, r, m, c, i, d, o, x, f, y, u, h, g, v, A, j, $, k, S, E, X, _, C, w, q;
      l = n.state, r = n.next_in, w = n.input, m = r + (n.avail_in - 5), c = n.next_out, q = n.output, i = c - (s - n.avail_out), d = c + (n.avail_out - 257), o = l.dmax, x = l.wsize, f = l.whave, y = l.wnext, u = l.window, h = l.hold, g = l.bits, v = l.lencode, A = l.distcode, j = (1 << l.lenbits) - 1, $ = (1 << l.distbits) - 1;
      a: do {
        g < 15 && (h += w[r++] << g, g += 8, h += w[r++] << g, g += 8), k = v[h & j];
        t: for (; ; ) {
          if (h >>>= S = k >>> 24, g -= S, (S = k >>> 16 & 255) === 0) q[c++] = 65535 & k;
          else {
            if (!(16 & S)) {
              if ((64 & S) == 0) {
                k = v[(65535 & k) + (h & (1 << S) - 1)];
                continue t;
              }
              if (32 & S) {
                l.mode = 12;
                break a;
              }
              n.msg = "invalid literal/length code", l.mode = 30;
              break a;
            }
            E = 65535 & k, (S &= 15) && (g < S && (h += w[r++] << g, g += 8), E += h & (1 << S) - 1, h >>>= S, g -= S), g < 15 && (h += w[r++] << g, g += 8, h += w[r++] << g, g += 8), k = A[h & $];
            n: for (; ; ) {
              if (h >>>= S = k >>> 24, g -= S, !(16 & (S = k >>> 16 & 255))) {
                if ((64 & S) == 0) {
                  k = A[(65535 & k) + (h & (1 << S) - 1)];
                  continue n;
                }
                n.msg = "invalid distance code", l.mode = 30;
                break a;
              }
              if (X = 65535 & k, g < (S &= 15) && (h += w[r++] << g, (g += 8) < S && (h += w[r++] << g, g += 8)), o < (X += h & (1 << S) - 1)) {
                n.msg = "invalid distance too far back", l.mode = 30;
                break a;
              }
              if (h >>>= S, g -= S, (S = c - i) < X) {
                if (f < (S = X - S) && l.sane) {
                  n.msg = "invalid distance too far back", l.mode = 30;
                  break a;
                }
                if (C = u, (_ = 0) === y) {
                  if (_ += x - S, S < E) {
                    for (E -= S; q[c++] = u[_++], --S; ) ;
                    _ = c - X, C = q;
                  }
                } else if (y < S) {
                  if (_ += x + y - S, (S -= y) < E) {
                    for (E -= S; q[c++] = u[_++], --S; ) ;
                    if (_ = 0, y < E) {
                      for (E -= S = y; q[c++] = u[_++], --S; ) ;
                      _ = c - X, C = q;
                    }
                  }
                } else if (_ += y - S, S < E) {
                  for (E -= S; q[c++] = u[_++], --S; ) ;
                  _ = c - X, C = q;
                }
                for (; 2 < E; ) q[c++] = C[_++], q[c++] = C[_++], q[c++] = C[_++], E -= 3;
                E && (q[c++] = C[_++], 1 < E && (q[c++] = C[_++]));
              } else {
                for (_ = c - X; q[c++] = q[_++], q[c++] = q[_++], q[c++] = q[_++], 2 < (E -= 3); ) ;
                E && (q[c++] = q[_++], 1 < E && (q[c++] = q[_++]));
              }
              break;
            }
          }
          break;
        }
      } while (r < m && c < d);
      r -= E = g >> 3, h &= (1 << (g -= E << 3)) - 1, n.next_in = r, n.next_out = c, n.avail_in = r < m ? m - r + 5 : 5 - (r - m), n.avail_out = c < d ? d - c + 257 : 257 - (c - d), l.hold = h, l.bits = g;
    };
  }, {}], 49: [function(a, t, e) {
    var n = a("../utils/common"), s = a("./adler32"), l = a("./crc32"), r = a("./inffast"), m = a("./inftrees"), c = 1, i = 2, d = 0, o = -2, x = 1, f = 852, y = 592;
    function u(_) {
      return (_ >>> 24 & 255) + (_ >>> 8 & 65280) + ((65280 & _) << 8) + ((255 & _) << 24);
    }
    function h() {
      this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new n.Buf16(320), this.work = new n.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    function g(_) {
      var C;
      return _ && _.state ? (C = _.state, _.total_in = _.total_out = C.total = 0, _.msg = "", C.wrap && (_.adler = 1 & C.wrap), C.mode = x, C.last = 0, C.havedict = 0, C.dmax = 32768, C.head = null, C.hold = 0, C.bits = 0, C.lencode = C.lendyn = new n.Buf32(f), C.distcode = C.distdyn = new n.Buf32(y), C.sane = 1, C.back = -1, d) : o;
    }
    function v(_) {
      var C;
      return _ && _.state ? ((C = _.state).wsize = 0, C.whave = 0, C.wnext = 0, g(_)) : o;
    }
    function A(_, C) {
      var w, q;
      return _ && _.state ? (q = _.state, C < 0 ? (w = 0, C = -C) : (w = 1 + (C >> 4), C < 48 && (C &= 15)), C && (C < 8 || 15 < C) ? o : (q.window !== null && q.wbits !== C && (q.window = null), q.wrap = w, q.wbits = C, v(_))) : o;
    }
    function j(_, C) {
      var w, q;
      return _ ? (q = new h(), (_.state = q).window = null, (w = A(_, C)) !== d && (_.state = null), w) : o;
    }
    var $, k, S = !0;
    function E(_) {
      if (S) {
        var C;
        for ($ = new n.Buf32(512), k = new n.Buf32(32), C = 0; C < 144; ) _.lens[C++] = 8;
        for (; C < 256; ) _.lens[C++] = 9;
        for (; C < 280; ) _.lens[C++] = 7;
        for (; C < 288; ) _.lens[C++] = 8;
        for (m(c, _.lens, 0, 288, $, 0, _.work, { bits: 9 }), C = 0; C < 32; ) _.lens[C++] = 5;
        m(i, _.lens, 0, 32, k, 0, _.work, { bits: 5 }), S = !1;
      }
      _.lencode = $, _.lenbits = 9, _.distcode = k, _.distbits = 5;
    }
    function X(_, C, w, q) {
      var T, I = _.state;
      return I.window === null && (I.wsize = 1 << I.wbits, I.wnext = 0, I.whave = 0, I.window = new n.Buf8(I.wsize)), q >= I.wsize ? (n.arraySet(I.window, C, w - I.wsize, I.wsize, 0), I.wnext = 0, I.whave = I.wsize) : (q < (T = I.wsize - I.wnext) && (T = q), n.arraySet(I.window, C, w - q, T, I.wnext), (q -= T) ? (n.arraySet(I.window, C, w - q, q, 0), I.wnext = q, I.whave = I.wsize) : (I.wnext += T, I.wnext === I.wsize && (I.wnext = 0), I.whave < I.wsize && (I.whave += T))), 0;
    }
    e.inflateReset = v, e.inflateReset2 = A, e.inflateResetKeep = g, e.inflateInit = function(_) {
      return j(_, 15);
    }, e.inflateInit2 = j, e.inflate = function(_, C) {
      var w, q, T, I, U, N, z, P, F, J, K, Y, fa, da, W, ta, ma, Q, oa, ia, p, G, R, b, L = 0, M = new n.Buf8(4), B = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      if (!_ || !_.state || !_.output || !_.input && _.avail_in !== 0) return o;
      (w = _.state).mode === 12 && (w.mode = 13), U = _.next_out, T = _.output, z = _.avail_out, I = _.next_in, q = _.input, N = _.avail_in, P = w.hold, F = w.bits, J = N, K = z, G = d;
      a: for (; ; ) switch (w.mode) {
        case x:
          if (w.wrap === 0) {
            w.mode = 13;
            break;
          }
          for (; F < 16; ) {
            if (N === 0) break a;
            N--, P += q[I++] << F, F += 8;
          }
          if (2 & w.wrap && P === 35615) {
            M[w.check = 0] = 255 & P, M[1] = P >>> 8 & 255, w.check = l(w.check, M, 2, 0), F = P = 0, w.mode = 2;
            break;
          }
          if (w.flags = 0, w.head && (w.head.done = !1), !(1 & w.wrap) || (((255 & P) << 8) + (P >> 8)) % 31) {
            _.msg = "incorrect header check", w.mode = 30;
            break;
          }
          if ((15 & P) != 8) {
            _.msg = "unknown compression method", w.mode = 30;
            break;
          }
          if (F -= 4, p = 8 + (15 & (P >>>= 4)), w.wbits === 0) w.wbits = p;
          else if (p > w.wbits) {
            _.msg = "invalid window size", w.mode = 30;
            break;
          }
          w.dmax = 1 << p, _.adler = w.check = 1, w.mode = 512 & P ? 10 : 12, F = P = 0;
          break;
        case 2:
          for (; F < 16; ) {
            if (N === 0) break a;
            N--, P += q[I++] << F, F += 8;
          }
          if (w.flags = P, (255 & w.flags) != 8) {
            _.msg = "unknown compression method", w.mode = 30;
            break;
          }
          if (57344 & w.flags) {
            _.msg = "unknown header flags set", w.mode = 30;
            break;
          }
          w.head && (w.head.text = P >> 8 & 1), 512 & w.flags && (M[0] = 255 & P, M[1] = P >>> 8 & 255, w.check = l(w.check, M, 2, 0)), F = P = 0, w.mode = 3;
        case 3:
          for (; F < 32; ) {
            if (N === 0) break a;
            N--, P += q[I++] << F, F += 8;
          }
          w.head && (w.head.time = P), 512 & w.flags && (M[0] = 255 & P, M[1] = P >>> 8 & 255, M[2] = P >>> 16 & 255, M[3] = P >>> 24 & 255, w.check = l(w.check, M, 4, 0)), F = P = 0, w.mode = 4;
        case 4:
          for (; F < 16; ) {
            if (N === 0) break a;
            N--, P += q[I++] << F, F += 8;
          }
          w.head && (w.head.xflags = 255 & P, w.head.os = P >> 8), 512 & w.flags && (M[0] = 255 & P, M[1] = P >>> 8 & 255, w.check = l(w.check, M, 2, 0)), F = P = 0, w.mode = 5;
        case 5:
          if (1024 & w.flags) {
            for (; F < 16; ) {
              if (N === 0) break a;
              N--, P += q[I++] << F, F += 8;
            }
            w.length = P, w.head && (w.head.extra_len = P), 512 & w.flags && (M[0] = 255 & P, M[1] = P >>> 8 & 255, w.check = l(w.check, M, 2, 0)), F = P = 0;
          } else w.head && (w.head.extra = null);
          w.mode = 6;
        case 6:
          if (1024 & w.flags && (N < (Y = w.length) && (Y = N), Y && (w.head && (p = w.head.extra_len - w.length, w.head.extra || (w.head.extra = new Array(w.head.extra_len)), n.arraySet(w.head.extra, q, I, Y, p)), 512 & w.flags && (w.check = l(w.check, q, Y, I)), N -= Y, I += Y, w.length -= Y), w.length)) break a;
          w.length = 0, w.mode = 7;
        case 7:
          if (2048 & w.flags) {
            if (N === 0) break a;
            for (Y = 0; p = q[I + Y++], w.head && p && w.length < 65536 && (w.head.name += String.fromCharCode(p)), p && Y < N; ) ;
            if (512 & w.flags && (w.check = l(w.check, q, Y, I)), N -= Y, I += Y, p) break a;
          } else w.head && (w.head.name = null);
          w.length = 0, w.mode = 8;
        case 8:
          if (4096 & w.flags) {
            if (N === 0) break a;
            for (Y = 0; p = q[I + Y++], w.head && p && w.length < 65536 && (w.head.comment += String.fromCharCode(p)), p && Y < N; ) ;
            if (512 & w.flags && (w.check = l(w.check, q, Y, I)), N -= Y, I += Y, p) break a;
          } else w.head && (w.head.comment = null);
          w.mode = 9;
        case 9:
          if (512 & w.flags) {
            for (; F < 16; ) {
              if (N === 0) break a;
              N--, P += q[I++] << F, F += 8;
            }
            if (P !== (65535 & w.check)) {
              _.msg = "header crc mismatch", w.mode = 30;
              break;
            }
            F = P = 0;
          }
          w.head && (w.head.hcrc = w.flags >> 9 & 1, w.head.done = !0), _.adler = w.check = 0, w.mode = 12;
          break;
        case 10:
          for (; F < 32; ) {
            if (N === 0) break a;
            N--, P += q[I++] << F, F += 8;
          }
          _.adler = w.check = u(P), F = P = 0, w.mode = 11;
        case 11:
          if (w.havedict === 0) return _.next_out = U, _.avail_out = z, _.next_in = I, _.avail_in = N, w.hold = P, w.bits = F, 2;
          _.adler = w.check = 1, w.mode = 12;
        case 12:
          if (C === 5 || C === 6) break a;
        case 13:
          if (w.last) {
            P >>>= 7 & F, F -= 7 & F, w.mode = 27;
            break;
          }
          for (; F < 3; ) {
            if (N === 0) break a;
            N--, P += q[I++] << F, F += 8;
          }
          switch (w.last = 1 & P, F -= 1, 3 & (P >>>= 1)) {
            case 0:
              w.mode = 14;
              break;
            case 1:
              if (E(w), w.mode = 20, C !== 6) break;
              P >>>= 2, F -= 2;
              break a;
            case 2:
              w.mode = 17;
              break;
            case 3:
              _.msg = "invalid block type", w.mode = 30;
          }
          P >>>= 2, F -= 2;
          break;
        case 14:
          for (P >>>= 7 & F, F -= 7 & F; F < 32; ) {
            if (N === 0) break a;
            N--, P += q[I++] << F, F += 8;
          }
          if ((65535 & P) != (P >>> 16 ^ 65535)) {
            _.msg = "invalid stored block lengths", w.mode = 30;
            break;
          }
          if (w.length = 65535 & P, F = P = 0, w.mode = 15, C === 6) break a;
        case 15:
          w.mode = 16;
        case 16:
          if (Y = w.length) {
            if (N < Y && (Y = N), z < Y && (Y = z), Y === 0) break a;
            n.arraySet(T, q, I, Y, U), N -= Y, I += Y, z -= Y, U += Y, w.length -= Y;
            break;
          }
          w.mode = 12;
          break;
        case 17:
          for (; F < 14; ) {
            if (N === 0) break a;
            N--, P += q[I++] << F, F += 8;
          }
          if (w.nlen = 257 + (31 & P), P >>>= 5, F -= 5, w.ndist = 1 + (31 & P), P >>>= 5, F -= 5, w.ncode = 4 + (15 & P), P >>>= 4, F -= 4, 286 < w.nlen || 30 < w.ndist) {
            _.msg = "too many length or distance symbols", w.mode = 30;
            break;
          }
          w.have = 0, w.mode = 18;
        case 18:
          for (; w.have < w.ncode; ) {
            for (; F < 3; ) {
              if (N === 0) break a;
              N--, P += q[I++] << F, F += 8;
            }
            w.lens[B[w.have++]] = 7 & P, P >>>= 3, F -= 3;
          }
          for (; w.have < 19; ) w.lens[B[w.have++]] = 0;
          if (w.lencode = w.lendyn, w.lenbits = 7, R = { bits: w.lenbits }, G = m(0, w.lens, 0, 19, w.lencode, 0, w.work, R), w.lenbits = R.bits, G) {
            _.msg = "invalid code lengths set", w.mode = 30;
            break;
          }
          w.have = 0, w.mode = 19;
        case 19:
          for (; w.have < w.nlen + w.ndist; ) {
            for (; ta = (L = w.lencode[P & (1 << w.lenbits) - 1]) >>> 16 & 255, ma = 65535 & L, !((W = L >>> 24) <= F); ) {
              if (N === 0) break a;
              N--, P += q[I++] << F, F += 8;
            }
            if (ma < 16) P >>>= W, F -= W, w.lens[w.have++] = ma;
            else {
              if (ma === 16) {
                for (b = W + 2; F < b; ) {
                  if (N === 0) break a;
                  N--, P += q[I++] << F, F += 8;
                }
                if (P >>>= W, F -= W, w.have === 0) {
                  _.msg = "invalid bit length repeat", w.mode = 30;
                  break;
                }
                p = w.lens[w.have - 1], Y = 3 + (3 & P), P >>>= 2, F -= 2;
              } else if (ma === 17) {
                for (b = W + 3; F < b; ) {
                  if (N === 0) break a;
                  N--, P += q[I++] << F, F += 8;
                }
                F -= W, p = 0, Y = 3 + (7 & (P >>>= W)), P >>>= 3, F -= 3;
              } else {
                for (b = W + 7; F < b; ) {
                  if (N === 0) break a;
                  N--, P += q[I++] << F, F += 8;
                }
                F -= W, p = 0, Y = 11 + (127 & (P >>>= W)), P >>>= 7, F -= 7;
              }
              if (w.have + Y > w.nlen + w.ndist) {
                _.msg = "invalid bit length repeat", w.mode = 30;
                break;
              }
              for (; Y--; ) w.lens[w.have++] = p;
            }
          }
          if (w.mode === 30) break;
          if (w.lens[256] === 0) {
            _.msg = "invalid code -- missing end-of-block", w.mode = 30;
            break;
          }
          if (w.lenbits = 9, R = { bits: w.lenbits }, G = m(c, w.lens, 0, w.nlen, w.lencode, 0, w.work, R), w.lenbits = R.bits, G) {
            _.msg = "invalid literal/lengths set", w.mode = 30;
            break;
          }
          if (w.distbits = 6, w.distcode = w.distdyn, R = { bits: w.distbits }, G = m(i, w.lens, w.nlen, w.ndist, w.distcode, 0, w.work, R), w.distbits = R.bits, G) {
            _.msg = "invalid distances set", w.mode = 30;
            break;
          }
          if (w.mode = 20, C === 6) break a;
        case 20:
          w.mode = 21;
        case 21:
          if (6 <= N && 258 <= z) {
            _.next_out = U, _.avail_out = z, _.next_in = I, _.avail_in = N, w.hold = P, w.bits = F, r(_, K), U = _.next_out, T = _.output, z = _.avail_out, I = _.next_in, q = _.input, N = _.avail_in, P = w.hold, F = w.bits, w.mode === 12 && (w.back = -1);
            break;
          }
          for (w.back = 0; ta = (L = w.lencode[P & (1 << w.lenbits) - 1]) >>> 16 & 255, ma = 65535 & L, !((W = L >>> 24) <= F); ) {
            if (N === 0) break a;
            N--, P += q[I++] << F, F += 8;
          }
          if (ta && (240 & ta) == 0) {
            for (Q = W, oa = ta, ia = ma; ta = (L = w.lencode[ia + ((P & (1 << Q + oa) - 1) >> Q)]) >>> 16 & 255, ma = 65535 & L, !(Q + (W = L >>> 24) <= F); ) {
              if (N === 0) break a;
              N--, P += q[I++] << F, F += 8;
            }
            P >>>= Q, F -= Q, w.back += Q;
          }
          if (P >>>= W, F -= W, w.back += W, w.length = ma, ta === 0) {
            w.mode = 26;
            break;
          }
          if (32 & ta) {
            w.back = -1, w.mode = 12;
            break;
          }
          if (64 & ta) {
            _.msg = "invalid literal/length code", w.mode = 30;
            break;
          }
          w.extra = 15 & ta, w.mode = 22;
        case 22:
          if (w.extra) {
            for (b = w.extra; F < b; ) {
              if (N === 0) break a;
              N--, P += q[I++] << F, F += 8;
            }
            w.length += P & (1 << w.extra) - 1, P >>>= w.extra, F -= w.extra, w.back += w.extra;
          }
          w.was = w.length, w.mode = 23;
        case 23:
          for (; ta = (L = w.distcode[P & (1 << w.distbits) - 1]) >>> 16 & 255, ma = 65535 & L, !((W = L >>> 24) <= F); ) {
            if (N === 0) break a;
            N--, P += q[I++] << F, F += 8;
          }
          if ((240 & ta) == 0) {
            for (Q = W, oa = ta, ia = ma; ta = (L = w.distcode[ia + ((P & (1 << Q + oa) - 1) >> Q)]) >>> 16 & 255, ma = 65535 & L, !(Q + (W = L >>> 24) <= F); ) {
              if (N === 0) break a;
              N--, P += q[I++] << F, F += 8;
            }
            P >>>= Q, F -= Q, w.back += Q;
          }
          if (P >>>= W, F -= W, w.back += W, 64 & ta) {
            _.msg = "invalid distance code", w.mode = 30;
            break;
          }
          w.offset = ma, w.extra = 15 & ta, w.mode = 24;
        case 24:
          if (w.extra) {
            for (b = w.extra; F < b; ) {
              if (N === 0) break a;
              N--, P += q[I++] << F, F += 8;
            }
            w.offset += P & (1 << w.extra) - 1, P >>>= w.extra, F -= w.extra, w.back += w.extra;
          }
          if (w.offset > w.dmax) {
            _.msg = "invalid distance too far back", w.mode = 30;
            break;
          }
          w.mode = 25;
        case 25:
          if (z === 0) break a;
          if (Y = K - z, w.offset > Y) {
            if ((Y = w.offset - Y) > w.whave && w.sane) {
              _.msg = "invalid distance too far back", w.mode = 30;
              break;
            }
            fa = Y > w.wnext ? (Y -= w.wnext, w.wsize - Y) : w.wnext - Y, Y > w.length && (Y = w.length), da = w.window;
          } else da = T, fa = U - w.offset, Y = w.length;
          for (z < Y && (Y = z), z -= Y, w.length -= Y; T[U++] = da[fa++], --Y; ) ;
          w.length === 0 && (w.mode = 21);
          break;
        case 26:
          if (z === 0) break a;
          T[U++] = w.length, z--, w.mode = 21;
          break;
        case 27:
          if (w.wrap) {
            for (; F < 32; ) {
              if (N === 0) break a;
              N--, P |= q[I++] << F, F += 8;
            }
            if (K -= z, _.total_out += K, w.total += K, K && (_.adler = w.check = w.flags ? l(w.check, T, K, U - K) : s(w.check, T, K, U - K)), K = z, (w.flags ? P : u(P)) !== w.check) {
              _.msg = "incorrect data check", w.mode = 30;
              break;
            }
            F = P = 0;
          }
          w.mode = 28;
        case 28:
          if (w.wrap && w.flags) {
            for (; F < 32; ) {
              if (N === 0) break a;
              N--, P += q[I++] << F, F += 8;
            }
            if (P !== (4294967295 & w.total)) {
              _.msg = "incorrect length check", w.mode = 30;
              break;
            }
            F = P = 0;
          }
          w.mode = 29;
        case 29:
          G = 1;
          break a;
        case 30:
          G = -3;
          break a;
        case 31:
          return -4;
        case 32:
        default:
          return o;
      }
      return _.next_out = U, _.avail_out = z, _.next_in = I, _.avail_in = N, w.hold = P, w.bits = F, (w.wsize || K !== _.avail_out && w.mode < 30 && (w.mode < 27 || C !== 4)) && X(_, _.output, _.next_out, K - _.avail_out) ? (w.mode = 31, -4) : (J -= _.avail_in, K -= _.avail_out, _.total_in += J, _.total_out += K, w.total += K, w.wrap && K && (_.adler = w.check = w.flags ? l(w.check, T, K, _.next_out - K) : s(w.check, T, K, _.next_out - K)), _.data_type = w.bits + (w.last ? 64 : 0) + (w.mode === 12 ? 128 : 0) + (w.mode === 20 || w.mode === 15 ? 256 : 0), (J == 0 && K === 0 || C === 4) && G === d && (G = -5), G);
    }, e.inflateEnd = function(_) {
      if (!_ || !_.state) return o;
      var C = _.state;
      return C.window && (C.window = null), _.state = null, d;
    }, e.inflateGetHeader = function(_, C) {
      var w;
      return _ && _.state ? (2 & (w = _.state).wrap) == 0 ? o : ((w.head = C).done = !1, d) : o;
    }, e.inflateSetDictionary = function(_, C) {
      var w, q = C.length;
      return _ && _.state ? (w = _.state).wrap !== 0 && w.mode !== 11 ? o : w.mode === 11 && s(1, C, q, 0) !== w.check ? -3 : X(_, C, q, q) ? (w.mode = 31, -4) : (w.havedict = 1, d) : o;
    }, e.inflateInfo = "pako inflate (from Nodeca project)";
  }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(a, t, e) {
    var n = a("../utils/common"), s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], l = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], r = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], m = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
    t.exports = function(c, i, d, o, x, f, y, u) {
      var h, g, v, A, j, $, k, S, E, X = u.bits, _ = 0, C = 0, w = 0, q = 0, T = 0, I = 0, U = 0, N = 0, z = 0, P = 0, F = null, J = 0, K = new n.Buf16(16), Y = new n.Buf16(16), fa = null, da = 0;
      for (_ = 0; _ <= 15; _++) K[_] = 0;
      for (C = 0; C < o; C++) K[i[d + C]]++;
      for (T = X, q = 15; 1 <= q && K[q] === 0; q--) ;
      if (q < T && (T = q), q === 0) return x[f++] = 20971520, x[f++] = 20971520, u.bits = 1, 0;
      for (w = 1; w < q && K[w] === 0; w++) ;
      for (T < w && (T = w), _ = N = 1; _ <= 15; _++) if (N <<= 1, (N -= K[_]) < 0) return -1;
      if (0 < N && (c === 0 || q !== 1)) return -1;
      for (Y[1] = 0, _ = 1; _ < 15; _++) Y[_ + 1] = Y[_] + K[_];
      for (C = 0; C < o; C++) i[d + C] !== 0 && (y[Y[i[d + C]]++] = C);
      if ($ = c === 0 ? (F = fa = y, 19) : c === 1 ? (F = s, J -= 257, fa = l, da -= 257, 256) : (F = r, fa = m, -1), _ = w, j = f, U = C = P = 0, v = -1, A = (z = 1 << (I = T)) - 1, c === 1 && 852 < z || c === 2 && 592 < z) return 1;
      for (; ; ) {
        for (k = _ - U, E = y[C] < $ ? (S = 0, y[C]) : y[C] > $ ? (S = fa[da + y[C]], F[J + y[C]]) : (S = 96, 0), h = 1 << _ - U, w = g = 1 << I; x[j + (P >> U) + (g -= h)] = k << 24 | S << 16 | E | 0, g !== 0; ) ;
        for (h = 1 << _ - 1; P & h; ) h >>= 1;
        if (h !== 0 ? (P &= h - 1, P += h) : P = 0, C++, --K[_] == 0) {
          if (_ === q) break;
          _ = i[d + y[C]];
        }
        if (T < _ && (P & A) !== v) {
          for (U === 0 && (U = T), j += w, N = 1 << (I = _ - U); I + U < q && !((N -= K[I + U]) <= 0); ) I++, N <<= 1;
          if (z += 1 << I, c === 1 && 852 < z || c === 2 && 592 < z) return 1;
          x[v = P & A] = T << 24 | I << 16 | j - f | 0;
        }
      }
      return P !== 0 && (x[j + P] = _ - U << 24 | 64 << 16 | 0), u.bits = T, 0;
    };
  }, { "../utils/common": 41 }], 51: [function(a, t, e) {
    t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
  }, {}], 52: [function(a, t, e) {
    var n = a("../utils/common"), s = 0, l = 1;
    function r(L) {
      for (var M = L.length; 0 <= --M; ) L[M] = 0;
    }
    var m = 0, c = 29, i = 256, d = i + 1 + c, o = 30, x = 19, f = 2 * d + 1, y = 15, u = 16, h = 7, g = 256, v = 16, A = 17, j = 18, $ = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], S = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], E = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], X = new Array(2 * (d + 2));
    r(X);
    var _ = new Array(2 * o);
    r(_);
    var C = new Array(512);
    r(C);
    var w = new Array(256);
    r(w);
    var q = new Array(c);
    r(q);
    var T, I, U, N = new Array(o);
    function z(L, M, B, O, D) {
      this.static_tree = L, this.extra_bits = M, this.extra_base = B, this.elems = O, this.max_length = D, this.has_stree = L && L.length;
    }
    function P(L, M) {
      this.dyn_tree = L, this.max_code = 0, this.stat_desc = M;
    }
    function F(L) {
      return L < 256 ? C[L] : C[256 + (L >>> 7)];
    }
    function J(L, M) {
      L.pending_buf[L.pending++] = 255 & M, L.pending_buf[L.pending++] = M >>> 8 & 255;
    }
    function K(L, M, B) {
      L.bi_valid > u - B ? (L.bi_buf |= M << L.bi_valid & 65535, J(L, L.bi_buf), L.bi_buf = M >> u - L.bi_valid, L.bi_valid += B - u) : (L.bi_buf |= M << L.bi_valid & 65535, L.bi_valid += B);
    }
    function Y(L, M, B) {
      K(L, B[2 * M], B[2 * M + 1]);
    }
    function fa(L, M) {
      for (var B = 0; B |= 1 & L, L >>>= 1, B <<= 1, 0 < --M; ) ;
      return B >>> 1;
    }
    function da(L, M, B) {
      var O, D, H = new Array(y + 1), aa = 0;
      for (O = 1; O <= y; O++) H[O] = aa = aa + B[O - 1] << 1;
      for (D = 0; D <= M; D++) {
        var V = L[2 * D + 1];
        V !== 0 && (L[2 * D] = fa(H[V]++, V));
      }
    }
    function W(L) {
      var M;
      for (M = 0; M < d; M++) L.dyn_ltree[2 * M] = 0;
      for (M = 0; M < o; M++) L.dyn_dtree[2 * M] = 0;
      for (M = 0; M < x; M++) L.bl_tree[2 * M] = 0;
      L.dyn_ltree[2 * g] = 1, L.opt_len = L.static_len = 0, L.last_lit = L.matches = 0;
    }
    function ta(L) {
      8 < L.bi_valid ? J(L, L.bi_buf) : 0 < L.bi_valid && (L.pending_buf[L.pending++] = L.bi_buf), L.bi_buf = 0, L.bi_valid = 0;
    }
    function ma(L, M, B, O) {
      var D = 2 * M, H = 2 * B;
      return L[D] < L[H] || L[D] === L[H] && O[M] <= O[B];
    }
    function Q(L, M, B) {
      for (var O = L.heap[B], D = B << 1; D <= L.heap_len && (D < L.heap_len && ma(M, L.heap[D + 1], L.heap[D], L.depth) && D++, !ma(M, O, L.heap[D], L.depth)); ) L.heap[B] = L.heap[D], B = D, D <<= 1;
      L.heap[B] = O;
    }
    function oa(L, M, B) {
      var O, D, H, aa, V = 0;
      if (L.last_lit !== 0) for (; O = L.pending_buf[L.d_buf + 2 * V] << 8 | L.pending_buf[L.d_buf + 2 * V + 1], D = L.pending_buf[L.l_buf + V], V++, O === 0 ? Y(L, D, M) : (Y(L, (H = w[D]) + i + 1, M), (aa = $[H]) !== 0 && K(L, D -= q[H], aa), Y(L, H = F(--O), B), (aa = k[H]) !== 0 && K(L, O -= N[H], aa)), V < L.last_lit; ) ;
      Y(L, g, M);
    }
    function ia(L, M) {
      var B, O, D, H = M.dyn_tree, aa = M.stat_desc.static_tree, V = M.stat_desc.has_stree, sa = M.stat_desc.elems, la = -1;
      for (L.heap_len = 0, L.heap_max = f, B = 0; B < sa; B++) H[2 * B] !== 0 ? (L.heap[++L.heap_len] = la = B, L.depth[B] = 0) : H[2 * B + 1] = 0;
      for (; L.heap_len < 2; ) H[2 * (D = L.heap[++L.heap_len] = la < 2 ? ++la : 0)] = 1, L.depth[D] = 0, L.opt_len--, V && (L.static_len -= aa[2 * D + 1]);
      for (M.max_code = la, B = L.heap_len >> 1; 1 <= B; B--) Q(L, H, B);
      for (D = sa; B = L.heap[1], L.heap[1] = L.heap[L.heap_len--], Q(L, H, 1), O = L.heap[1], L.heap[--L.heap_max] = B, L.heap[--L.heap_max] = O, H[2 * D] = H[2 * B] + H[2 * O], L.depth[D] = (L.depth[B] >= L.depth[O] ? L.depth[B] : L.depth[O]) + 1, H[2 * B + 1] = H[2 * O + 1] = D, L.heap[1] = D++, Q(L, H, 1), 2 <= L.heap_len; ) ;
      L.heap[--L.heap_max] = L.heap[1], (function(ra, ya) {
        var $a, Ra, ja, ha, bt, Xt, Da = ya.dyn_tree, jn = ya.max_code, $s = ya.stat_desc.static_tree, js = ya.stat_desc.has_stree, _s = ya.stat_desc.extra_bits, _n = ya.stat_desc.extra_base, at = ya.stat_desc.max_length, vt = 0;
        for (ha = 0; ha <= y; ha++) ra.bl_count[ha] = 0;
        for (Da[2 * ra.heap[ra.heap_max] + 1] = 0, $a = ra.heap_max + 1; $a < f; $a++) at < (ha = Da[2 * Da[2 * (Ra = ra.heap[$a]) + 1] + 1] + 1) && (ha = at, vt++), Da[2 * Ra + 1] = ha, jn < Ra || (ra.bl_count[ha]++, bt = 0, _n <= Ra && (bt = _s[Ra - _n]), Xt = Da[2 * Ra], ra.opt_len += Xt * (ha + bt), js && (ra.static_len += Xt * ($s[2 * Ra + 1] + bt)));
        if (vt !== 0) {
          do {
            for (ha = at - 1; ra.bl_count[ha] === 0; ) ha--;
            ra.bl_count[ha]--, ra.bl_count[ha + 1] += 2, ra.bl_count[at]--, vt -= 2;
          } while (0 < vt);
          for (ha = at; ha !== 0; ha--) for (Ra = ra.bl_count[ha]; Ra !== 0; ) jn < (ja = ra.heap[--$a]) || (Da[2 * ja + 1] !== ha && (ra.opt_len += (ha - Da[2 * ja + 1]) * Da[2 * ja], Da[2 * ja + 1] = ha), Ra--);
        }
      })(L, M), da(H, la, L.bl_count);
    }
    function p(L, M, B) {
      var O, D, H = -1, aa = M[1], V = 0, sa = 7, la = 4;
      for (aa === 0 && (sa = 138, la = 3), M[2 * (B + 1) + 1] = 65535, O = 0; O <= B; O++) D = aa, aa = M[2 * (O + 1) + 1], ++V < sa && D === aa || (V < la ? L.bl_tree[2 * D] += V : D !== 0 ? (D !== H && L.bl_tree[2 * D]++, L.bl_tree[2 * v]++) : V <= 10 ? L.bl_tree[2 * A]++ : L.bl_tree[2 * j]++, H = D, la = (V = 0) === aa ? (sa = 138, 3) : D === aa ? (sa = 6, 3) : (sa = 7, 4));
    }
    function G(L, M, B) {
      var O, D, H = -1, aa = M[1], V = 0, sa = 7, la = 4;
      for (aa === 0 && (sa = 138, la = 3), O = 0; O <= B; O++) if (D = aa, aa = M[2 * (O + 1) + 1], !(++V < sa && D === aa)) {
        if (V < la) for (; Y(L, D, L.bl_tree), --V != 0; ) ;
        else D !== 0 ? (D !== H && (Y(L, D, L.bl_tree), V--), Y(L, v, L.bl_tree), K(L, V - 3, 2)) : V <= 10 ? (Y(L, A, L.bl_tree), K(L, V - 3, 3)) : (Y(L, j, L.bl_tree), K(L, V - 11, 7));
        H = D, la = (V = 0) === aa ? (sa = 138, 3) : D === aa ? (sa = 6, 3) : (sa = 7, 4);
      }
    }
    r(N);
    var R = !1;
    function b(L, M, B, O) {
      K(L, (m << 1) + (O ? 1 : 0), 3), (function(D, H, aa, V) {
        ta(D), J(D, aa), J(D, ~aa), n.arraySet(D.pending_buf, D.window, H, aa, D.pending), D.pending += aa;
      })(L, M, B);
    }
    e._tr_init = function(L) {
      R || ((function() {
        var M, B, O, D, H, aa = new Array(y + 1);
        for (D = O = 0; D < c - 1; D++) for (q[D] = O, M = 0; M < 1 << $[D]; M++) w[O++] = D;
        for (w[O - 1] = D, D = H = 0; D < 16; D++) for (N[D] = H, M = 0; M < 1 << k[D]; M++) C[H++] = D;
        for (H >>= 7; D < o; D++) for (N[D] = H << 7, M = 0; M < 1 << k[D] - 7; M++) C[256 + H++] = D;
        for (B = 0; B <= y; B++) aa[B] = 0;
        for (M = 0; M <= 143; ) X[2 * M + 1] = 8, M++, aa[8]++;
        for (; M <= 255; ) X[2 * M + 1] = 9, M++, aa[9]++;
        for (; M <= 279; ) X[2 * M + 1] = 7, M++, aa[7]++;
        for (; M <= 287; ) X[2 * M + 1] = 8, M++, aa[8]++;
        for (da(X, d + 1, aa), M = 0; M < o; M++) _[2 * M + 1] = 5, _[2 * M] = fa(M, 5);
        T = new z(X, $, i + 1, d, y), I = new z(_, k, 0, o, y), U = new z(new Array(0), S, 0, x, h);
      })(), R = !0), L.l_desc = new P(L.dyn_ltree, T), L.d_desc = new P(L.dyn_dtree, I), L.bl_desc = new P(L.bl_tree, U), L.bi_buf = 0, L.bi_valid = 0, W(L);
    }, e._tr_stored_block = b, e._tr_flush_block = function(L, M, B, O) {
      var D, H, aa = 0;
      0 < L.level ? (L.strm.data_type === 2 && (L.strm.data_type = (function(V) {
        var sa, la = 4093624447;
        for (sa = 0; sa <= 31; sa++, la >>>= 1) if (1 & la && V.dyn_ltree[2 * sa] !== 0) return s;
        if (V.dyn_ltree[18] !== 0 || V.dyn_ltree[20] !== 0 || V.dyn_ltree[26] !== 0) return l;
        for (sa = 32; sa < i; sa++) if (V.dyn_ltree[2 * sa] !== 0) return l;
        return s;
      })(L)), ia(L, L.l_desc), ia(L, L.d_desc), aa = (function(V) {
        var sa;
        for (p(V, V.dyn_ltree, V.l_desc.max_code), p(V, V.dyn_dtree, V.d_desc.max_code), ia(V, V.bl_desc), sa = x - 1; 3 <= sa && V.bl_tree[2 * E[sa] + 1] === 0; sa--) ;
        return V.opt_len += 3 * (sa + 1) + 5 + 5 + 4, sa;
      })(L), D = L.opt_len + 3 + 7 >>> 3, (H = L.static_len + 3 + 7 >>> 3) <= D && (D = H)) : D = H = B + 5, B + 4 <= D && M !== -1 ? b(L, M, B, O) : L.strategy === 4 || H === D ? (K(L, 2 + (O ? 1 : 0), 3), oa(L, X, _)) : (K(L, 4 + (O ? 1 : 0), 3), (function(V, sa, la, ra) {
        var ya;
        for (K(V, sa - 257, 5), K(V, la - 1, 5), K(V, ra - 4, 4), ya = 0; ya < ra; ya++) K(V, V.bl_tree[2 * E[ya] + 1], 3);
        G(V, V.dyn_ltree, sa - 1), G(V, V.dyn_dtree, la - 1);
      })(L, L.l_desc.max_code + 1, L.d_desc.max_code + 1, aa + 1), oa(L, L.dyn_ltree, L.dyn_dtree)), W(L), O && ta(L);
    }, e._tr_tally = function(L, M, B) {
      return L.pending_buf[L.d_buf + 2 * L.last_lit] = M >>> 8 & 255, L.pending_buf[L.d_buf + 2 * L.last_lit + 1] = 255 & M, L.pending_buf[L.l_buf + L.last_lit] = 255 & B, L.last_lit++, M === 0 ? L.dyn_ltree[2 * B]++ : (L.matches++, M--, L.dyn_ltree[2 * (w[B] + i + 1)]++, L.dyn_dtree[2 * F(M)]++), L.last_lit === L.lit_bufsize - 1;
    }, e._tr_align = function(L) {
      K(L, 2, 3), Y(L, g, X), (function(M) {
        M.bi_valid === 16 ? (J(M, M.bi_buf), M.bi_buf = 0, M.bi_valid = 0) : 8 <= M.bi_valid && (M.pending_buf[M.pending++] = 255 & M.bi_buf, M.bi_buf >>= 8, M.bi_valid -= 8);
      })(L);
    };
  }, { "../utils/common": 41 }], 53: [function(a, t, e) {
    t.exports = function() {
      this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    };
  }, {}], 54: [function(a, t, e) {
    (function(n) {
      (function(s, l) {
        if (!s.setImmediate) {
          var r, m, c, i, d = 1, o = {}, x = !1, f = s.document, y = Object.getPrototypeOf && Object.getPrototypeOf(s);
          y = y && y.setTimeout ? y : s, r = {}.toString.call(s.process) === "[object process]" ? function(v) {
            process.nextTick(function() {
              h(v);
            });
          } : (function() {
            if (s.postMessage && !s.importScripts) {
              var v = !0, A = s.onmessage;
              return s.onmessage = function() {
                v = !1;
              }, s.postMessage("", "*"), s.onmessage = A, v;
            }
          })() ? (i = "setImmediate$" + Math.random() + "$", s.addEventListener ? s.addEventListener("message", g, !1) : s.attachEvent("onmessage", g), function(v) {
            s.postMessage(i + v, "*");
          }) : s.MessageChannel ? ((c = new MessageChannel()).port1.onmessage = function(v) {
            h(v.data);
          }, function(v) {
            c.port2.postMessage(v);
          }) : f && "onreadystatechange" in f.createElement("script") ? (m = f.documentElement, function(v) {
            var A = f.createElement("script");
            A.onreadystatechange = function() {
              h(v), A.onreadystatechange = null, m.removeChild(A), A = null;
            }, m.appendChild(A);
          }) : function(v) {
            setTimeout(h, 0, v);
          }, y.setImmediate = function(v) {
            typeof v != "function" && (v = new Function("" + v));
            for (var A = new Array(arguments.length - 1), j = 0; j < A.length; j++) A[j] = arguments[j + 1];
            var $ = { callback: v, args: A };
            return o[d] = $, r(d), d++;
          }, y.clearImmediate = u;
        }
        function u(v) {
          delete o[v];
        }
        function h(v) {
          if (x) setTimeout(h, 0, v);
          else {
            var A = o[v];
            if (A) {
              x = !0;
              try {
                (function(j) {
                  var $ = j.callback, k = j.args;
                  switch (k.length) {
                    case 0:
                      $();
                      break;
                    case 1:
                      $(k[0]);
                      break;
                    case 2:
                      $(k[0], k[1]);
                      break;
                    case 3:
                      $(k[0], k[1], k[2]);
                      break;
                    default:
                      $.apply(l, k);
                  }
                })(A);
              } finally {
                u(v), x = !1;
              }
            }
          }
        }
        function g(v) {
          v.source === s && typeof v.data == "string" && v.data.indexOf(i) === 0 && h(+v.data.slice(i.length));
        }
      })(typeof self > "u" ? n === void 0 ? this : n : self);
    }).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
  }, {}] }, {}, [10])(10);
});
const Cs = /* @__PURE__ */ JSON.parse('{"accentBorderCallout1":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 112500"},{"name":"adj4","fmla":"val -38333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]}]}]},"accentBorderCallout2":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 112500"},{"name":"adj6","fmla":"val -46667"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]}]}]},"accentBorderCallout3":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 100000"},{"name":"adj6","fmla":"val -16667"},{"name":"adj7","fmla":"val 112963"},{"name":"adj8","fmla":"val -8333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"},{"name":"y4","fmla":"*/ h adj7 100000"},{"name":"x4","fmla":"*/ w adj8 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]}]}]},"accentCallout1":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 112500"},{"name":"adj4","fmla":"val -38333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]}]}]},"accentCallout2":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 112500"},{"name":"adj6","fmla":"val -46667"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]}]}]},"accentCallout3":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 100000"},{"name":"adj6","fmla":"val -16667"},{"name":"adj7","fmla":"val 112963"},{"name":"adj8","fmla":"val -8333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"},{"name":"y4","fmla":"*/ h adj7 100000"},{"name":"x4","fmla":"*/ w adj8 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"Z"},{"c":"L","pts":[{"x":"x1","y":"b"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]}]}]},"actionButtonBackPrevious":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g11","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g11","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g11","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonBeginning":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1 8"},{"name":"g15","fmla":"*/ g13 1 4"},{"name":"g16","fmla":"+- g11 g14 0"},{"name":"g17","fmla":"+- g11 g15 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g17","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g16","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"L","pts":[{"x":"g16","y":"g10"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g17","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g16","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"L","pts":[{"x":"g16","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g17","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g16","y":"g9"}]},{"c":"L","pts":[{"x":"g16","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonBlank":{"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonDocument":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"dx1","fmla":"*/ ss 9 32"},{"name":"g11","fmla":"+- hc 0 dx1"},{"name":"g12","fmla":"+- hc dx1 0"},{"name":"g13","fmla":"*/ ss 3 16"},{"name":"g14","fmla":"+- g12 0 g13"},{"name":"g15","fmla":"+- g9 g13 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g14","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g15"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g14","y":"g9"}]},{"c":"L","pts":[{"x":"g14","y":"g15"}]},{"c":"L","pts":[{"x":"g12","y":"g15"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g14","y":"g9"}]},{"c":"L","pts":[{"x":"g14","y":"g15"}]},{"c":"L","pts":[{"x":"g12","y":"g15"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g14","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g15"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g12","y":"g15"}]},{"c":"L","pts":[{"x":"g14","y":"g15"}]},{"c":"L","pts":[{"x":"g14","y":"g9"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonEnd":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 3 4"},{"name":"g15","fmla":"*/ g13 7 8"},{"name":"g16","fmla":"+- g11 g14 0"},{"name":"g17","fmla":"+- g11 g15 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g16","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g17","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g17","y":"g10"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g16","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g17","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g17","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g16","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g17","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g9"}]},{"c":"L","pts":[{"x":"g12","y":"g10"}]},{"c":"L","pts":[{"x":"g17","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonForwardNext":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g12","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g12","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g12","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"g10"}]},{"c":"L","pts":[{"x":"g11","y":"g9"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonHelp":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1 7"},{"name":"g15","fmla":"*/ g13 3 14"},{"name":"g16","fmla":"*/ g13 2 7"},{"name":"g19","fmla":"*/ g13 3 7"},{"name":"g20","fmla":"*/ g13 4 7"},{"name":"g21","fmla":"*/ g13 17 28"},{"name":"g23","fmla":"*/ g13 21 28"},{"name":"g24","fmla":"*/ g13 11 14"},{"name":"g27","fmla":"+- g9 g16 0"},{"name":"g29","fmla":"+- g9 g21 0"},{"name":"g30","fmla":"+- g9 g23 0"},{"name":"g31","fmla":"+- g9 g24 0"},{"name":"g33","fmla":"+- g11 g15 0"},{"name":"g36","fmla":"+- g11 g19 0"},{"name":"g37","fmla":"+- g11 g20 0"},{"name":"g41","fmla":"*/ g13 1 14"},{"name":"g42","fmla":"*/ g13 3 28"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g33","y":"g27"}]},{"c":"A","wR":"g16","hR":"g16","stAng":"cd2","swAng":"cd2"},{"c":"A","wR":"g14","hR":"g15","stAng":"0","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g29"}]},{"c":"A","wR":"g14","hR":"g15","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"g14","hR":"g14","stAng":"0","swAng":"-10800000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g31"}]},{"c":"A","wR":"g42","hR":"g42","stAng":"3cd4","swAng":"21600000"},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g33","y":"g27"}]},{"c":"A","wR":"g16","hR":"g16","stAng":"cd2","swAng":"cd2"},{"c":"A","wR":"g14","hR":"g15","stAng":"0","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g29"}]},{"c":"A","wR":"g14","hR":"g15","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"g14","hR":"g14","stAng":"0","swAng":"-10800000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g31"}]},{"c":"A","wR":"g42","hR":"g42","stAng":"3cd4","swAng":"21600000"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g33","y":"g27"}]},{"c":"A","wR":"g16","hR":"g16","stAng":"cd2","swAng":"cd2"},{"c":"A","wR":"g14","hR":"g15","stAng":"0","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g30"}]},{"c":"L","pts":[{"x":"g36","y":"g29"}]},{"c":"A","wR":"g14","hR":"g15","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"g41","hR":"g42","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"g14","hR":"g14","stAng":"0","swAng":"-10800000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g31"}]},{"c":"A","wR":"g42","hR":"g42","stAng":"3cd4","swAng":"21600000"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonHome":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1 16"},{"name":"g15","fmla":"*/ g13 1 8"},{"name":"g16","fmla":"*/ g13 3 16"},{"name":"g17","fmla":"*/ g13 5 16"},{"name":"g18","fmla":"*/ g13 7 16"},{"name":"g19","fmla":"*/ g13 9 16"},{"name":"g20","fmla":"*/ g13 11 16"},{"name":"g21","fmla":"*/ g13 3 4"},{"name":"g22","fmla":"*/ g13 13 16"},{"name":"g23","fmla":"*/ g13 7 8"},{"name":"g24","fmla":"+- g9 g14 0"},{"name":"g25","fmla":"+- g9 g16 0"},{"name":"g26","fmla":"+- g9 g17 0"},{"name":"g27","fmla":"+- g9 g21 0"},{"name":"g28","fmla":"+- g11 g15 0"},{"name":"g29","fmla":"+- g11 g18 0"},{"name":"g30","fmla":"+- g11 g19 0"},{"name":"g31","fmla":"+- g11 g20 0"},{"name":"g32","fmla":"+- g11 g22 0"},{"name":"g33","fmla":"+- g11 g23 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"vc"}]},{"c":"L","pts":[{"x":"g28","y":"vc"}]},{"c":"L","pts":[{"x":"g28","y":"g10"}]},{"c":"L","pts":[{"x":"g33","y":"g10"}]},{"c":"L","pts":[{"x":"g33","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"vc"}]},{"c":"L","pts":[{"x":"g32","y":"g26"}]},{"c":"L","pts":[{"x":"g32","y":"g24"}]},{"c":"L","pts":[{"x":"g31","y":"g24"}]},{"c":"L","pts":[{"x":"g31","y":"g25"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g32","y":"g26"}]},{"c":"L","pts":[{"x":"g32","y":"g24"}]},{"c":"L","pts":[{"x":"g31","y":"g24"}]},{"c":"L","pts":[{"x":"g31","y":"g25"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g28","y":"vc"}]},{"c":"L","pts":[{"x":"g28","y":"g10"}]},{"c":"L","pts":[{"x":"g29","y":"g10"}]},{"c":"L","pts":[{"x":"g29","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g10"}]},{"c":"L","pts":[{"x":"g33","y":"g10"}]},{"c":"L","pts":[{"x":"g33","y":"vc"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"L","pts":[{"x":"g11","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"vc"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g29","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g10"}]},{"c":"L","pts":[{"x":"g29","y":"g10"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"L","pts":[{"x":"g31","y":"g25"}]},{"c":"L","pts":[{"x":"g31","y":"g24"}]},{"c":"L","pts":[{"x":"g32","y":"g24"}]},{"c":"L","pts":[{"x":"g32","y":"g26"}]},{"c":"L","pts":[{"x":"g12","y":"vc"}]},{"c":"L","pts":[{"x":"g33","y":"vc"}]},{"c":"L","pts":[{"x":"g33","y":"g10"}]},{"c":"L","pts":[{"x":"g28","y":"g10"}]},{"c":"L","pts":[{"x":"g28","y":"vc"}]},{"c":"L","pts":[{"x":"g11","y":"vc"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g31","y":"g25"}]},{"c":"L","pts":[{"x":"g32","y":"g26"}]},{"c":"M","pts":[{"x":"g33","y":"vc"}]},{"c":"L","pts":[{"x":"g28","y":"vc"}]},{"c":"M","pts":[{"x":"g29","y":"g10"}]},{"c":"L","pts":[{"x":"g29","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g27"}]},{"c":"L","pts":[{"x":"g30","y":"g10"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonInformation":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1 32"},{"name":"g17","fmla":"*/ g13 5 16"},{"name":"g18","fmla":"*/ g13 3 8"},{"name":"g19","fmla":"*/ g13 13 32"},{"name":"g20","fmla":"*/ g13 19 32"},{"name":"g22","fmla":"*/ g13 11 16"},{"name":"g23","fmla":"*/ g13 13 16"},{"name":"g24","fmla":"*/ g13 7 8"},{"name":"g25","fmla":"+- g9 g14 0"},{"name":"g28","fmla":"+- g9 g17 0"},{"name":"g29","fmla":"+- g9 g18 0"},{"name":"g30","fmla":"+- g9 g23 0"},{"name":"g31","fmla":"+- g9 g24 0"},{"name":"g32","fmla":"+- g11 g17 0"},{"name":"g34","fmla":"+- g11 g19 0"},{"name":"g35","fmla":"+- g11 g20 0"},{"name":"g37","fmla":"+- g11 g22 0"},{"name":"g38","fmla":"*/ g13 3 32"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"A","wR":"dx2","hR":"dx2","stAng":"3cd4","swAng":"21600000"},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"A","wR":"dx2","hR":"dx2","stAng":"3cd4","swAng":"21600000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g25"}]},{"c":"A","wR":"g38","hR":"g38","stAng":"3cd4","swAng":"21600000"},{"c":"M","pts":[{"x":"g32","y":"g28"}]},{"c":"L","pts":[{"x":"g32","y":"g29"}]},{"c":"L","pts":[{"x":"g34","y":"g29"}]},{"c":"L","pts":[{"x":"g34","y":"g30"}]},{"c":"L","pts":[{"x":"g32","y":"g30"}]},{"c":"L","pts":[{"x":"g32","y":"g31"}]},{"c":"L","pts":[{"x":"g37","y":"g31"}]},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g35","y":"g30"}]},{"c":"L","pts":[{"x":"g35","y":"g28"}]},{"c":"Z"}]},{"fill":"lighten","stroke":"false","cmds":[{"c":"M","pts":[{"x":"hc","y":"g25"}]},{"c":"A","wR":"g38","hR":"g38","stAng":"3cd4","swAng":"21600000"},{"c":"M","pts":[{"x":"g32","y":"g28"}]},{"c":"L","pts":[{"x":"g35","y":"g28"}]},{"c":"L","pts":[{"x":"g35","y":"g30"}]},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g37","y":"g31"}]},{"c":"L","pts":[{"x":"g32","y":"g31"}]},{"c":"L","pts":[{"x":"g32","y":"g30"}]},{"c":"L","pts":[{"x":"g34","y":"g30"}]},{"c":"L","pts":[{"x":"g34","y":"g29"}]},{"c":"L","pts":[{"x":"g32","y":"g29"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"hc","y":"g9"}]},{"c":"A","wR":"dx2","hR":"dx2","stAng":"3cd4","swAng":"21600000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"g25"}]},{"c":"A","wR":"g38","hR":"g38","stAng":"3cd4","swAng":"21600000"},{"c":"M","pts":[{"x":"g32","y":"g28"}]},{"c":"L","pts":[{"x":"g35","y":"g28"}]},{"c":"L","pts":[{"x":"g35","y":"g30"}]},{"c":"L","pts":[{"x":"g37","y":"g30"}]},{"c":"L","pts":[{"x":"g37","y":"g31"}]},{"c":"L","pts":[{"x":"g32","y":"g31"}]},{"c":"L","pts":[{"x":"g32","y":"g30"}]},{"c":"L","pts":[{"x":"g34","y":"g30"}]},{"c":"L","pts":[{"x":"g34","y":"g29"}]},{"c":"L","pts":[{"x":"g32","y":"g29"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonMovie":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1455 21600"},{"name":"g15","fmla":"*/ g13 1905 21600"},{"name":"g16","fmla":"*/ g13 2325 21600"},{"name":"g17","fmla":"*/ g13 16155 21600"},{"name":"g18","fmla":"*/ g13 17010 21600"},{"name":"g19","fmla":"*/ g13 19335 21600"},{"name":"g20","fmla":"*/ g13 19725 21600"},{"name":"g21","fmla":"*/ g13 20595 21600"},{"name":"g22","fmla":"*/ g13 5280 21600"},{"name":"g23","fmla":"*/ g13 5730 21600"},{"name":"g24","fmla":"*/ g13 6630 21600"},{"name":"g25","fmla":"*/ g13 7492 21600"},{"name":"g26","fmla":"*/ g13 9067 21600"},{"name":"g27","fmla":"*/ g13 9555 21600"},{"name":"g28","fmla":"*/ g13 13342 21600"},{"name":"g29","fmla":"*/ g13 14580 21600"},{"name":"g30","fmla":"*/ g13 15592 21600"},{"name":"g31","fmla":"+- g11 g14 0"},{"name":"g32","fmla":"+- g11 g15 0"},{"name":"g33","fmla":"+- g11 g16 0"},{"name":"g34","fmla":"+- g11 g17 0"},{"name":"g35","fmla":"+- g11 g18 0"},{"name":"g36","fmla":"+- g11 g19 0"},{"name":"g37","fmla":"+- g11 g20 0"},{"name":"g38","fmla":"+- g11 g21 0"},{"name":"g39","fmla":"+- g9 g22 0"},{"name":"g40","fmla":"+- g9 g23 0"},{"name":"g41","fmla":"+- g9 g24 0"},{"name":"g42","fmla":"+- g9 g25 0"},{"name":"g43","fmla":"+- g9 g26 0"},{"name":"g44","fmla":"+- g9 g27 0"},{"name":"g45","fmla":"+- g9 g28 0"},{"name":"g46","fmla":"+- g9 g29 0"},{"name":"g47","fmla":"+- g9 g30 0"},{"name":"g48","fmla":"+- g9 g31 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g11","y":"g39"}]},{"c":"L","pts":[{"x":"g11","y":"g44"}]},{"c":"L","pts":[{"x":"g31","y":"g44"}]},{"c":"L","pts":[{"x":"g32","y":"g43"}]},{"c":"L","pts":[{"x":"g33","y":"g43"}]},{"c":"L","pts":[{"x":"g33","y":"g47"}]},{"c":"L","pts":[{"x":"g35","y":"g47"}]},{"c":"L","pts":[{"x":"g35","y":"g45"}]},{"c":"L","pts":[{"x":"g36","y":"g45"}]},{"c":"L","pts":[{"x":"g38","y":"g46"}]},{"c":"L","pts":[{"x":"g12","y":"g46"}]},{"c":"L","pts":[{"x":"g12","y":"g41"}]},{"c":"L","pts":[{"x":"g38","y":"g41"}]},{"c":"L","pts":[{"x":"g37","y":"g42"}]},{"c":"L","pts":[{"x":"g35","y":"g42"}]},{"c":"L","pts":[{"x":"g35","y":"g41"}]},{"c":"L","pts":[{"x":"g34","y":"g40"}]},{"c":"L","pts":[{"x":"g32","y":"g40"}]},{"c":"L","pts":[{"x":"g31","y":"g39"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g11","y":"g39"}]},{"c":"L","pts":[{"x":"g11","y":"g44"}]},{"c":"L","pts":[{"x":"g31","y":"g44"}]},{"c":"L","pts":[{"x":"g32","y":"g43"}]},{"c":"L","pts":[{"x":"g33","y":"g43"}]},{"c":"L","pts":[{"x":"g33","y":"g47"}]},{"c":"L","pts":[{"x":"g35","y":"g47"}]},{"c":"L","pts":[{"x":"g35","y":"g45"}]},{"c":"L","pts":[{"x":"g36","y":"g45"}]},{"c":"L","pts":[{"x":"g38","y":"g46"}]},{"c":"L","pts":[{"x":"g12","y":"g46"}]},{"c":"L","pts":[{"x":"g12","y":"g41"}]},{"c":"L","pts":[{"x":"g38","y":"g41"}]},{"c":"L","pts":[{"x":"g37","y":"g42"}]},{"c":"L","pts":[{"x":"g35","y":"g42"}]},{"c":"L","pts":[{"x":"g35","y":"g41"}]},{"c":"L","pts":[{"x":"g34","y":"g40"}]},{"c":"L","pts":[{"x":"g32","y":"g40"}]},{"c":"L","pts":[{"x":"g31","y":"g39"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g11","y":"g39"}]},{"c":"L","pts":[{"x":"g31","y":"g39"}]},{"c":"L","pts":[{"x":"g32","y":"g40"}]},{"c":"L","pts":[{"x":"g34","y":"g40"}]},{"c":"L","pts":[{"x":"g35","y":"g41"}]},{"c":"L","pts":[{"x":"g35","y":"g42"}]},{"c":"L","pts":[{"x":"g37","y":"g42"}]},{"c":"L","pts":[{"x":"g38","y":"g41"}]},{"c":"L","pts":[{"x":"g12","y":"g41"}]},{"c":"L","pts":[{"x":"g12","y":"g46"}]},{"c":"L","pts":[{"x":"g38","y":"g46"}]},{"c":"L","pts":[{"x":"g36","y":"g45"}]},{"c":"L","pts":[{"x":"g35","y":"g45"}]},{"c":"L","pts":[{"x":"g35","y":"g47"}]},{"c":"L","pts":[{"x":"g33","y":"g47"}]},{"c":"L","pts":[{"x":"g33","y":"g43"}]},{"c":"L","pts":[{"x":"g32","y":"g43"}]},{"c":"L","pts":[{"x":"g31","y":"g44"}]},{"c":"L","pts":[{"x":"g11","y":"g44"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonReturn":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 7 8"},{"name":"g15","fmla":"*/ g13 3 4"},{"name":"g16","fmla":"*/ g13 5 8"},{"name":"g17","fmla":"*/ g13 3 8"},{"name":"g18","fmla":"*/ g13 1 4"},{"name":"g19","fmla":"+- g9 g15 0"},{"name":"g20","fmla":"+- g9 g16 0"},{"name":"g21","fmla":"+- g9 g18 0"},{"name":"g22","fmla":"+- g11 g14 0"},{"name":"g23","fmla":"+- g11 g15 0"},{"name":"g24","fmla":"+- g11 g16 0"},{"name":"g25","fmla":"+- g11 g17 0"},{"name":"g26","fmla":"+- g11 g18 0"},{"name":"g27","fmla":"*/ g13 1 8"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g12","y":"g21"}]},{"c":"L","pts":[{"x":"g23","y":"g9"}]},{"c":"L","pts":[{"x":"hc","y":"g21"}]},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"L","pts":[{"x":"g24","y":"g20"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"g25","y":"g19"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"g26","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g20"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"cd2","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"g10"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g22","y":"g21"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g12","y":"g21"}]},{"c":"L","pts":[{"x":"g23","y":"g9"}]},{"c":"L","pts":[{"x":"hc","y":"g21"}]},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"L","pts":[{"x":"g24","y":"g20"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"g25","y":"g19"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"g26","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g20"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"cd2","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"g10"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g22","y":"g21"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g12","y":"g21"}]},{"c":"L","pts":[{"x":"g22","y":"g21"}]},{"c":"L","pts":[{"x":"g22","y":"g20"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"g25","y":"g10"}]},{"c":"A","wR":"g17","hR":"g17","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g26","y":"g21"}]},{"c":"L","pts":[{"x":"g26","y":"g20"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"cd2","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"g19"}]},{"c":"A","wR":"g27","hR":"g27","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"L","pts":[{"x":"hc","y":"g21"}]},{"c":"L","pts":[{"x":"g23","y":"g9"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"actionButtonSound":{"gd":[{"name":"dx2","fmla":"*/ ss 3 8"},{"name":"g9","fmla":"+- vc 0 dx2"},{"name":"g10","fmla":"+- vc dx2 0"},{"name":"g11","fmla":"+- hc 0 dx2"},{"name":"g12","fmla":"+- hc dx2 0"},{"name":"g13","fmla":"*/ ss 3 4"},{"name":"g14","fmla":"*/ g13 1 8"},{"name":"g15","fmla":"*/ g13 5 16"},{"name":"g16","fmla":"*/ g13 5 8"},{"name":"g17","fmla":"*/ g13 11 16"},{"name":"g18","fmla":"*/ g13 3 4"},{"name":"g19","fmla":"*/ g13 7 8"},{"name":"g20","fmla":"+- g9 g14 0"},{"name":"g21","fmla":"+- g9 g15 0"},{"name":"g22","fmla":"+- g9 g17 0"},{"name":"g23","fmla":"+- g9 g19 0"},{"name":"g24","fmla":"+- g11 g15 0"},{"name":"g25","fmla":"+- g11 g16 0"},{"name":"g26","fmla":"+- g11 g18 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g22"}]},{"c":"L","pts":[{"x":"g24","y":"g22"}]},{"c":"L","pts":[{"x":"g25","y":"g10"}]},{"c":"L","pts":[{"x":"g25","y":"g9"}]},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g11","y":"g22"}]},{"c":"L","pts":[{"x":"g24","y":"g22"}]},{"c":"L","pts":[{"x":"g25","y":"g10"}]},{"c":"L","pts":[{"x":"g25","y":"g9"}]},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"g11","y":"g21"}]},{"c":"L","pts":[{"x":"g24","y":"g21"}]},{"c":"L","pts":[{"x":"g25","y":"g9"}]},{"c":"L","pts":[{"x":"g25","y":"g10"}]},{"c":"L","pts":[{"x":"g24","y":"g22"}]},{"c":"L","pts":[{"x":"g11","y":"g22"}]},{"c":"Z"},{"c":"M","pts":[{"x":"g26","y":"g21"}]},{"c":"L","pts":[{"x":"g12","y":"g20"}]},{"c":"M","pts":[{"x":"g26","y":"vc"}]},{"c":"L","pts":[{"x":"g12","y":"vc"}]},{"c":"M","pts":[{"x":"g26","y":"g22"}]},{"c":"L","pts":[{"x":"g12","y":"g23"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"arc":{"av":[{"name":"adj1","fmla":"val 16200000"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"stAng","fmla":"pin 0 adj1 21599999"},{"name":"enAng","fmla":"pin 0 adj2 21599999"},{"name":"sw11","fmla":"+- enAng 0 stAng"},{"name":"sw12","fmla":"+- sw11 21600000 0"},{"name":"swAng","fmla":"?: sw11 sw11 sw12"},{"name":"wt1","fmla":"sin wd2 stAng"},{"name":"ht1","fmla":"cos hd2 stAng"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"wt2","fmla":"sin wd2 enAng"},{"name":"ht2","fmla":"cos hd2 enAng"},{"name":"dx2","fmla":"cat2 wd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 hd2 ht2 wt2"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"sw0","fmla":"+- 21600000 0 stAng"},{"name":"da1","fmla":"+- swAng 0 sw0"},{"name":"g1","fmla":"max x1 x2"},{"name":"ir","fmla":"?: da1 r g1"},{"name":"sw1","fmla":"+- cd4 0 stAng"},{"name":"sw2","fmla":"+- 27000000 0 stAng"},{"name":"sw3","fmla":"?: sw1 sw1 sw2"},{"name":"da2","fmla":"+- swAng 0 sw3"},{"name":"g5","fmla":"max y1 y2"},{"name":"ib","fmla":"?: da2 b g5"},{"name":"sw4","fmla":"+- cd2 0 stAng"},{"name":"sw5","fmla":"+- 32400000 0 stAng"},{"name":"sw6","fmla":"?: sw4 sw4 sw5"},{"name":"da3","fmla":"+- swAng 0 sw6"},{"name":"g9","fmla":"min x1 x2"},{"name":"il","fmla":"?: da3 l g9"},{"name":"sw7","fmla":"+- 3cd4 0 stAng"},{"name":"sw8","fmla":"+- 37800000 0 stAng"},{"name":"sw9","fmla":"?: sw7 sw7 sw8"},{"name":"da4","fmla":"+- swAng 0 sw9"},{"name":"g13","fmla":"min y1 y2"},{"name":"it","fmla":"?: da4 t g13"},{"name":"cang1","fmla":"+- stAng 0 cd4"},{"name":"cang2","fmla":"+- enAng cd4 0"},{"name":"cang3","fmla":"+/ cang1 cang2 2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"},{"c":"L","pts":[{"x":"hc","y":"vc"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"}]}]},"bentArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 43750"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"a3","fmla":"pin 0 adj3 50000"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw2","fmla":"*/ ss a2 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"dh2","fmla":"+- aw2 0 th2"},{"name":"ah","fmla":"*/ ss a3 100000"},{"name":"bw","fmla":"+- r 0 ah"},{"name":"bh","fmla":"+- b 0 dh2"},{"name":"bs","fmla":"min bw bh"},{"name":"maxAdj4","fmla":"*/ 100000 bs ss"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"bd","fmla":"*/ ss a4 100000"},{"name":"bd3","fmla":"+- bd 0 th"},{"name":"bd2","fmla":"max bd3 0"},{"name":"x3","fmla":"+- th bd2 0"},{"name":"x4","fmla":"+- r 0 ah"},{"name":"y3","fmla":"+- dh2 th 0"},{"name":"y4","fmla":"+- y3 dh2 0"},{"name":"y5","fmla":"+- dh2 bd 0"},{"name":"y6","fmla":"+- y3 bd2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"y5"}]},{"c":"A","wR":"bd","hR":"bd","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x4","y":"dh2"}]},{"c":"L","pts":[{"x":"x4","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"aw2"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"A","wR":"bd2","hR":"bd2","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"th","y":"b"}]},{"c":"Z"}]}]},"bentConnector2":{"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"bentConnector3":{"av":[{"name":"adj1","fmla":"val 50000"}],"gd":[{"name":"x1","fmla":"*/ w adj1 100000"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"bentConnector4":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"x1","fmla":"*/ w adj1 100000"},{"name":"x2","fmla":"+/ x1 r 2"},{"name":"y2","fmla":"*/ h adj2 100000"},{"name":"y1","fmla":"+/ t y2 2"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"bentConnector5":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 50000"}],"gd":[{"name":"x1","fmla":"*/ w adj1 100000"},{"name":"x3","fmla":"*/ w adj3 100000"},{"name":"x2","fmla":"+/ x1 x3 2"},{"name":"y2","fmla":"*/ h adj2 100000"},{"name":"y1","fmla":"+/ t y2 2"},{"name":"y3","fmla":"+/ b y2 2"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"bentUpArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"a3","fmla":"pin 0 adj3 50000"},{"name":"y1","fmla":"*/ ss a3 100000"},{"name":"dx1","fmla":"*/ ss a2 50000"},{"name":"x1","fmla":"+- r 0 dx1"},{"name":"dx3","fmla":"*/ ss a2 100000"},{"name":"x3","fmla":"+- r 0 dx3"},{"name":"dx2","fmla":"*/ ss a1 200000"},{"name":"x2","fmla":"+- x3 0 dx2"},{"name":"x4","fmla":"+- x3 dx2 0"},{"name":"dy2","fmla":"*/ ss a1 100000"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"x0","fmla":"*/ x4 1 2"},{"name":"y3","fmla":"+/ y2 b 2"},{"name":"y15","fmla":"+/ y1 b 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"bevel":{"av":[{"name":"adj","fmla":"val 12500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"x1","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"}]},{"fill":"lightenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]},{"fill":"lighten","stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"darken","stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x1","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"M","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]}]}]},"blockArc":{"av":[{"name":"adj1","fmla":"val 10800000"},{"name":"adj2","fmla":"val 0"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"stAng","fmla":"pin 0 adj1 21599999"},{"name":"istAng","fmla":"pin 0 adj2 21599999"},{"name":"a3","fmla":"pin 0 adj3 50000"},{"name":"sw11","fmla":"+- istAng 0 stAng"},{"name":"sw12","fmla":"+- sw11 21600000 0"},{"name":"swAng","fmla":"?: sw11 sw11 sw12"},{"name":"iswAng","fmla":"+- 0 0 swAng"},{"name":"wt1","fmla":"sin wd2 stAng"},{"name":"ht1","fmla":"cos hd2 stAng"},{"name":"wt3","fmla":"sin wd2 istAng"},{"name":"ht3","fmla":"cos hd2 istAng"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"dx3","fmla":"cat2 wd2 ht3 wt3"},{"name":"dy3","fmla":"sat2 hd2 ht3 wt3"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"x3","fmla":"+- hc dx3 0"},{"name":"y3","fmla":"+- vc dy3 0"},{"name":"dr","fmla":"*/ ss a3 100000"},{"name":"iwd2","fmla":"+- wd2 0 dr"},{"name":"ihd2","fmla":"+- hd2 0 dr"},{"name":"wt2","fmla":"sin iwd2 istAng"},{"name":"ht2","fmla":"cos ihd2 istAng"},{"name":"wt4","fmla":"sin iwd2 stAng"},{"name":"ht4","fmla":"cos ihd2 stAng"},{"name":"dx2","fmla":"cat2 iwd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 ihd2 ht2 wt2"},{"name":"dx4","fmla":"cat2 iwd2 ht4 wt4"},{"name":"dy4","fmla":"sat2 ihd2 ht4 wt4"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"x4","fmla":"+- hc dx4 0"},{"name":"y4","fmla":"+- vc dy4 0"},{"name":"sw0","fmla":"+- 21600000 0 stAng"},{"name":"da1","fmla":"+- swAng 0 sw0"},{"name":"g1","fmla":"max x1 x2"},{"name":"g2","fmla":"max x3 x4"},{"name":"g3","fmla":"max g1 g2"},{"name":"ir","fmla":"?: da1 r g3"},{"name":"sw1","fmla":"+- cd4 0 stAng"},{"name":"sw2","fmla":"+- 27000000 0 stAng"},{"name":"sw3","fmla":"?: sw1 sw1 sw2"},{"name":"da2","fmla":"+- swAng 0 sw3"},{"name":"g5","fmla":"max y1 y2"},{"name":"g6","fmla":"max y3 y4"},{"name":"g7","fmla":"max g5 g6"},{"name":"ib","fmla":"?: da2 b g7"},{"name":"sw4","fmla":"+- cd2 0 stAng"},{"name":"sw5","fmla":"+- 32400000 0 stAng"},{"name":"sw6","fmla":"?: sw4 sw4 sw5"},{"name":"da3","fmla":"+- swAng 0 sw6"},{"name":"g9","fmla":"min x1 x2"},{"name":"g10","fmla":"min x3 x4"},{"name":"g11","fmla":"min g9 g10"},{"name":"il","fmla":"?: da3 l g11"},{"name":"sw7","fmla":"+- 3cd4 0 stAng"},{"name":"sw8","fmla":"+- 37800000 0 stAng"},{"name":"sw9","fmla":"?: sw7 sw7 sw8"},{"name":"da4","fmla":"+- swAng 0 sw9"},{"name":"g13","fmla":"min y1 y2"},{"name":"g14","fmla":"min y3 y4"},{"name":"g15","fmla":"min g13 g14"},{"name":"it","fmla":"?: da4 t g15"},{"name":"x5","fmla":"+/ x1 x4 2"},{"name":"y5","fmla":"+/ y1 y4 2"},{"name":"x6","fmla":"+/ x3 x2 2"},{"name":"y6","fmla":"+/ y3 y2 2"},{"name":"cang1","fmla":"+- stAng 0 cd4"},{"name":"cang2","fmla":"+- istAng cd4 0"},{"name":"cang3","fmla":"+/ cang1 cang2 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"istAng","swAng":"iswAng"},{"c":"Z"}]}]},"borderCallout1":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 112500"},{"name":"adj4","fmla":"val -38333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]}]}]},"borderCallout2":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 112500"},{"name":"adj6","fmla":"val -46667"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]}]}]},"borderCallout3":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 100000"},{"name":"adj6","fmla":"val -16667"},{"name":"adj7","fmla":"val 112963"},{"name":"adj8","fmla":"val -8333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"},{"name":"y4","fmla":"*/ h adj7 100000"},{"name":"x4","fmla":"*/ w adj8 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]}]}]},"bracePair":{"av":[{"name":"adj","fmla":"val 8333"}],"gd":[{"name":"a","fmla":"pin 0 adj 25000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"*/ ss a 50000"},{"name":"x3","fmla":"+- r 0 x2"},{"name":"x4","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- vc 0 x1"},{"name":"y3","fmla":"+- vc x1 0"},{"name":"y4","fmla":"+- b 0 x1"},{"name":"it","fmla":"*/ x1 29289 100000"},{"name":"il","fmla":"+- x1 it 0"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 it"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"x2","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"-5400000"},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"-5400000"},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x2","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"-5400000"},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"M","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"-5400000"},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"}]}]},"bracketPair":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"},{"name":"il","fmla":"*/ x1 29289 100000"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"M","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"}]}]},"callout1":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 112500"},{"name":"adj4","fmla":"val -38333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]}]}]},"callout2":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 112500"},{"name":"adj6","fmla":"val -46667"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]}]}]},"callout3":{"av":[{"name":"adj1","fmla":"val 18750"},{"name":"adj2","fmla":"val -8333"},{"name":"adj3","fmla":"val 18750"},{"name":"adj4","fmla":"val -16667"},{"name":"adj5","fmla":"val 100000"},{"name":"adj6","fmla":"val -16667"},{"name":"adj7","fmla":"val 112963"},{"name":"adj8","fmla":"val -8333"}],"gd":[{"name":"y1","fmla":"*/ h adj1 100000"},{"name":"x1","fmla":"*/ w adj2 100000"},{"name":"y2","fmla":"*/ h adj3 100000"},{"name":"x2","fmla":"*/ w adj4 100000"},{"name":"y3","fmla":"*/ h adj5 100000"},{"name":"x3","fmla":"*/ w adj6 100000"},{"name":"y4","fmla":"*/ h adj7 100000"},{"name":"x4","fmla":"*/ w adj8 100000"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]}]}]},"can":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 h ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"y1","fmla":"*/ ss a 200000"},{"name":"y2","fmla":"+- y1 y1 0"},{"name":"y3","fmla":"+- b 0 y1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"-10800000"},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd2"},{"c":"Z"}]},{"fill":"lighten","stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"cd2"},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd2"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"r","y":"y1"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd2"},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"cd2"},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd2"},{"c":"L","pts":[{"x":"l","y":"y1"}]}]}]},"chartPlus":{"paths":[{"w":10,"h":10,"fill":"none","cmds":[{"c":"M","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"10"}]},{"c":"M","pts":[{"x":"0","y":"5"}]},{"c":"L","pts":[{"x":"10","y":"5"}]}]},{"w":10,"h":10,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"0","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"0"}]},{"c":"Z"}]}]},"chartStar":{"paths":[{"w":10,"h":10,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"10","y":"10"}]},{"c":"M","pts":[{"x":"0","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"0"}]},{"c":"M","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"10"}]}]},{"w":10,"h":10,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"0","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"0"}]},{"c":"Z"}]}]},"chartX":{"paths":[{"w":10,"h":10,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"10","y":"10"}]},{"c":"M","pts":[{"x":"0","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"0"}]}]},{"w":10,"h":10,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"0","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"10"}]},{"c":"L","pts":[{"x":"10","y":"0"}]},{"c":"Z"}]}]},"chevron":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"maxAdj","fmla":"*/ 100000 w ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"x3","fmla":"*/ x2 1 2"},{"name":"dx","fmla":"+- x2 0 x1"},{"name":"il","fmla":"?: dx x1 l"},{"name":"ir","fmla":"?: dx x2 r"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"vc"}]},{"c":"Z"}]}]},"chord":{"av":[{"name":"adj1","fmla":"val 2700000"},{"name":"adj2","fmla":"val 16200000"}],"gd":[{"name":"stAng","fmla":"pin 0 adj1 21599999"},{"name":"enAng","fmla":"pin 0 adj2 21599999"},{"name":"sw1","fmla":"+- enAng 0 stAng"},{"name":"sw2","fmla":"+- sw1 21600000 0"},{"name":"swAng","fmla":"?: sw1 sw1 sw2"},{"name":"wt1","fmla":"sin wd2 stAng"},{"name":"ht1","fmla":"cos hd2 stAng"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"wt2","fmla":"sin wd2 enAng"},{"name":"ht2","fmla":"cos hd2 enAng"},{"name":"dx2","fmla":"cat2 wd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 hd2 ht2 wt2"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"x3","fmla":"+/ x1 x2 2"},{"name":"y3","fmla":"+/ y1 y2 2"},{"name":"midAng0","fmla":"*/ swAng 1 2"},{"name":"midAng","fmla":"+- stAng midAng0 cd2"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"},{"c":"Z"}]}]},"circularArrow":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val 1142319"},{"name":"adj3","fmla":"val 20457681"},{"name":"adj4","fmla":"val 10800000"},{"name":"adj5","fmla":"val 12500"}],"gd":[{"name":"a5","fmla":"pin 0 adj5 25000"},{"name":"maxAdj1","fmla":"*/ a5 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"enAng","fmla":"pin 1 adj3 21599999"},{"name":"stAng","fmla":"pin 0 adj4 21599999"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"thh","fmla":"*/ ss a5 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"rw1","fmla":"+- wd2 th2 thh"},{"name":"rh1","fmla":"+- hd2 th2 thh"},{"name":"rw2","fmla":"+- rw1 0 th"},{"name":"rh2","fmla":"+- rh1 0 th"},{"name":"rw3","fmla":"+- rw2 th2 0"},{"name":"rh3","fmla":"+- rh2 th2 0"},{"name":"wtH","fmla":"sin rw3 enAng"},{"name":"htH","fmla":"cos rh3 enAng"},{"name":"dxH","fmla":"cat2 rw3 htH wtH"},{"name":"dyH","fmla":"sat2 rh3 htH wtH"},{"name":"xH","fmla":"+- hc dxH 0"},{"name":"yH","fmla":"+- vc dyH 0"},{"name":"rI","fmla":"min rw2 rh2"},{"name":"u1","fmla":"*/ dxH dxH 1"},{"name":"u2","fmla":"*/ dyH dyH 1"},{"name":"u3","fmla":"*/ rI rI 1"},{"name":"u4","fmla":"+- u1 0 u3"},{"name":"u5","fmla":"+- u2 0 u3"},{"name":"u6","fmla":"*/ u4 u5 u1"},{"name":"u7","fmla":"*/ u6 1 u2"},{"name":"u8","fmla":"+- 1 0 u7"},{"name":"u9","fmla":"sqrt u8"},{"name":"u10","fmla":"*/ u4 1 dxH"},{"name":"u11","fmla":"*/ u10 1 dyH"},{"name":"u12","fmla":"+/ 1 u9 u11"},{"name":"u13","fmla":"at2 1 u12"},{"name":"u14","fmla":"+- u13 21600000 0"},{"name":"u15","fmla":"?: u13 u13 u14"},{"name":"u16","fmla":"+- u15 0 enAng"},{"name":"u17","fmla":"+- u16 21600000 0"},{"name":"u18","fmla":"?: u16 u16 u17"},{"name":"u19","fmla":"+- u18 0 cd2"},{"name":"u20","fmla":"+- u18 0 21600000"},{"name":"u21","fmla":"?: u19 u20 u18"},{"name":"maxAng","fmla":"abs u21"},{"name":"aAng","fmla":"pin 0 adj2 maxAng"},{"name":"ptAng","fmla":"+- enAng aAng 0"},{"name":"wtA","fmla":"sin rw3 ptAng"},{"name":"htA","fmla":"cos rh3 ptAng"},{"name":"dxA","fmla":"cat2 rw3 htA wtA"},{"name":"dyA","fmla":"sat2 rh3 htA wtA"},{"name":"xA","fmla":"+- hc dxA 0"},{"name":"yA","fmla":"+- vc dyA 0"},{"name":"wtE","fmla":"sin rw1 stAng"},{"name":"htE","fmla":"cos rh1 stAng"},{"name":"dxE","fmla":"cat2 rw1 htE wtE"},{"name":"dyE","fmla":"sat2 rh1 htE wtE"},{"name":"xE","fmla":"+- hc dxE 0"},{"name":"yE","fmla":"+- vc dyE 0"},{"name":"dxG","fmla":"cos thh ptAng"},{"name":"dyG","fmla":"sin thh ptAng"},{"name":"xG","fmla":"+- xH dxG 0"},{"name":"yG","fmla":"+- yH dyG 0"},{"name":"dxB","fmla":"cos thh ptAng"},{"name":"dyB","fmla":"sin thh ptAng"},{"name":"xB","fmla":"+- xH 0 dxB 0"},{"name":"yB","fmla":"+- yH 0 dyB 0"},{"name":"sx1","fmla":"+- xB 0 hc"},{"name":"sy1","fmla":"+- yB 0 vc"},{"name":"sx2","fmla":"+- xG 0 hc"},{"name":"sy2","fmla":"+- yG 0 vc"},{"name":"rO","fmla":"min rw1 rh1"},{"name":"x1O","fmla":"*/ sx1 rO rw1"},{"name":"y1O","fmla":"*/ sy1 rO rh1"},{"name":"x2O","fmla":"*/ sx2 rO rw1"},{"name":"y2O","fmla":"*/ sy2 rO rh1"},{"name":"dxO","fmla":"+- x2O 0 x1O"},{"name":"dyO","fmla":"+- y2O 0 y1O"},{"name":"dO","fmla":"mod dxO dyO 0"},{"name":"q1","fmla":"*/ x1O y2O 1"},{"name":"q2","fmla":"*/ x2O y1O 1"},{"name":"DO","fmla":"+- q1 0 q2"},{"name":"q3","fmla":"*/ rO rO 1"},{"name":"q4","fmla":"*/ dO dO 1"},{"name":"q5","fmla":"*/ q3 q4 1"},{"name":"q6","fmla":"*/ DO DO 1"},{"name":"q7","fmla":"+- q5 0 q6"},{"name":"q8","fmla":"max q7 0"},{"name":"sdelO","fmla":"sqrt q8"},{"name":"ndyO","fmla":"*/ dyO -1 1"},{"name":"sdyO","fmla":"?: ndyO -1 1"},{"name":"q9","fmla":"*/ sdyO dxO 1"},{"name":"q10","fmla":"*/ q9 sdelO 1"},{"name":"q11","fmla":"*/ DO dyO 1"},{"name":"dxF1","fmla":"+/ q11 q10 q4"},{"name":"q12","fmla":"+- q11 0 q10"},{"name":"dxF2","fmla":"*/ q12 1 q4"},{"name":"adyO","fmla":"abs dyO"},{"name":"q13","fmla":"*/ adyO sdelO 1"},{"name":"q14","fmla":"*/ DO dxO -1"},{"name":"dyF1","fmla":"+/ q14 q13 q4"},{"name":"q15","fmla":"+- q14 0 q13"},{"name":"dyF2","fmla":"*/ q15 1 q4"},{"name":"q16","fmla":"+- x2O 0 dxF1"},{"name":"q17","fmla":"+- x2O 0 dxF2"},{"name":"q18","fmla":"+- y2O 0 dyF1"},{"name":"q19","fmla":"+- y2O 0 dyF2"},{"name":"q20","fmla":"mod q16 q18 0"},{"name":"q21","fmla":"mod q17 q19 0"},{"name":"q22","fmla":"+- q21 0 q20"},{"name":"dxF","fmla":"?: q22 dxF1 dxF2"},{"name":"dyF","fmla":"?: q22 dyF1 dyF2"},{"name":"sdxF","fmla":"*/ dxF rw1 rO"},{"name":"sdyF","fmla":"*/ dyF rh1 rO"},{"name":"xF","fmla":"+- hc sdxF 0"},{"name":"yF","fmla":"+- vc sdyF 0"},{"name":"x1I","fmla":"*/ sx1 rI rw2"},{"name":"y1I","fmla":"*/ sy1 rI rh2"},{"name":"x2I","fmla":"*/ sx2 rI rw2"},{"name":"y2I","fmla":"*/ sy2 rI rh2"},{"name":"dxI","fmla":"+- x2I 0 x1I"},{"name":"dyI","fmla":"+- y2I 0 y1I"},{"name":"dI","fmla":"mod dxI dyI 0"},{"name":"v1","fmla":"*/ x1I y2I 1"},{"name":"v2","fmla":"*/ x2I y1I 1"},{"name":"DI","fmla":"+- v1 0 v2"},{"name":"v3","fmla":"*/ rI rI 1"},{"name":"v4","fmla":"*/ dI dI 1"},{"name":"v5","fmla":"*/ v3 v4 1"},{"name":"v6","fmla":"*/ DI DI 1"},{"name":"v7","fmla":"+- v5 0 v6"},{"name":"v8","fmla":"max v7 0"},{"name":"sdelI","fmla":"sqrt v8"},{"name":"v9","fmla":"*/ sdyO dxI 1"},{"name":"v10","fmla":"*/ v9 sdelI 1"},{"name":"v11","fmla":"*/ DI dyI 1"},{"name":"dxC1","fmla":"+/ v11 v10 v4"},{"name":"v12","fmla":"+- v11 0 v10"},{"name":"dxC2","fmla":"*/ v12 1 v4"},{"name":"adyI","fmla":"abs dyI"},{"name":"v13","fmla":"*/ adyI sdelI 1"},{"name":"v14","fmla":"*/ DI dxI -1"},{"name":"dyC1","fmla":"+/ v14 v13 v4"},{"name":"v15","fmla":"+- v14 0 v13"},{"name":"dyC2","fmla":"*/ v15 1 v4"},{"name":"v16","fmla":"+- x1I 0 dxC1"},{"name":"v17","fmla":"+- x1I 0 dxC2"},{"name":"v18","fmla":"+- y1I 0 dyC1"},{"name":"v19","fmla":"+- y1I 0 dyC2"},{"name":"v20","fmla":"mod v16 v18 0"},{"name":"v21","fmla":"mod v17 v19 0"},{"name":"v22","fmla":"+- v21 0 v20"},{"name":"dxC","fmla":"?: v22 dxC1 dxC2"},{"name":"dyC","fmla":"?: v22 dyC1 dyC2"},{"name":"sdxC","fmla":"*/ dxC rw2 rI"},{"name":"sdyC","fmla":"*/ dyC rh2 rI"},{"name":"xC","fmla":"+- hc sdxC 0"},{"name":"yC","fmla":"+- vc sdyC 0"},{"name":"ist0","fmla":"at2 sdxC sdyC"},{"name":"ist1","fmla":"+- ist0 21600000 0"},{"name":"istAng","fmla":"?: ist0 ist0 ist1"},{"name":"isw1","fmla":"+- stAng 0 istAng"},{"name":"isw2","fmla":"+- isw1 0 21600000"},{"name":"iswAng","fmla":"?: isw1 isw2 isw1"},{"name":"p1","fmla":"+- xF 0 xC"},{"name":"p2","fmla":"+- yF 0 yC"},{"name":"p3","fmla":"mod p1 p2 0"},{"name":"p4","fmla":"*/ p3 1 2"},{"name":"p5","fmla":"+- p4 0 thh"},{"name":"xGp","fmla":"?: p5 xF xG"},{"name":"yGp","fmla":"?: p5 yF yG"},{"name":"xBp","fmla":"?: p5 xC xB"},{"name":"yBp","fmla":"?: p5 yC yB"},{"name":"en0","fmla":"at2 sdxF sdyF"},{"name":"en1","fmla":"+- en0 21600000 0"},{"name":"en2","fmla":"?: en0 en0 en1"},{"name":"sw0","fmla":"+- en2 0 stAng"},{"name":"sw1","fmla":"+- sw0 21600000 0"},{"name":"swAng","fmla":"?: sw0 sw0 sw1"},{"name":"wtI","fmla":"sin rw3 stAng"},{"name":"htI","fmla":"cos rh3 stAng"},{"name":"dxI","fmla":"cat2 rw3 htI wtI"},{"name":"dyI","fmla":"sat2 rh3 htI wtI"},{"name":"xI","fmla":"+- hc dxI 0"},{"name":"yI","fmla":"+- vc dyI 0"},{"name":"aI","fmla":"+- stAng 0 cd4"},{"name":"aA","fmla":"+- ptAng cd4 0"},{"name":"aB","fmla":"+- ptAng cd2 0"},{"name":"idx","fmla":"cos rw1 2700000"},{"name":"idy","fmla":"sin rh1 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xE","y":"yE"}]},{"c":"A","wR":"rw1","hR":"rh1","stAng":"stAng","swAng":"swAng"},{"c":"L","pts":[{"x":"xGp","y":"yGp"}]},{"c":"L","pts":[{"x":"xA","y":"yA"}]},{"c":"L","pts":[{"x":"xBp","y":"yBp"}]},{"c":"L","pts":[{"x":"xC","y":"yC"}]},{"c":"A","wR":"rw2","hR":"rh2","stAng":"istAng","swAng":"iswAng"},{"c":"Z"}]}]},"cloud":{"gd":[{"name":"il","fmla":"*/ w 2977 21600"},{"name":"it","fmla":"*/ h 3262 21600"},{"name":"ir","fmla":"*/ w 17087 21600"},{"name":"ib","fmla":"*/ h 17337 21600"},{"name":"g27","fmla":"*/ w 67 21600"},{"name":"g28","fmla":"*/ h 21577 21600"},{"name":"g29","fmla":"*/ w 21582 21600"},{"name":"g30","fmla":"*/ h 1235 21600"}],"paths":[{"w":43200,"h":43200,"cmds":[{"c":"M","pts":[{"x":"3900","y":"14370"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"-11429249","swAng":"7426832"},{"c":"A","wR":"5333","hR":"7267","stAng":"-8646143","swAng":"5396714"},{"c":"A","wR":"4365","hR":"5945","stAng":"-8748475","swAng":"5983381"},{"c":"A","wR":"4857","hR":"6595","stAng":"-7859164","swAng":"7034504"},{"c":"A","wR":"5333","hR":"7273","stAng":"-4722533","swAng":"6541615"},{"c":"A","wR":"6775","hR":"9220","stAng":"-2776035","swAng":"7816140"},{"c":"A","wR":"5785","hR":"7867","stAng":"37501","swAng":"6842000"},{"c":"A","wR":"6752","hR":"9215","stAng":"1347096","swAng":"6910353"},{"c":"A","wR":"7720","hR":"10543","stAng":"3974558","swAng":"4542661"},{"c":"A","wR":"4360","hR":"5918","stAng":"-16496525","swAng":"8804134"},{"c":"A","wR":"4345","hR":"5945","stAng":"-14809710","swAng":"9151131"},{"c":"Z"}]},{"w":43200,"h":43200,"fill":"none","cmds":[{"c":"M","pts":[{"x":"4693","y":"26177"}]},{"c":"A","wR":"4345","hR":"5945","stAng":"5204520","swAng":"1585770"},{"c":"M","pts":[{"x":"6928","y":"34899"}]},{"c":"A","wR":"4360","hR":"5918","stAng":"4416628","swAng":"686848"},{"c":"M","pts":[{"x":"16478","y":"39090"}]},{"c":"A","wR":"6752","hR":"9215","stAng":"8257449","swAng":"844866"},{"c":"M","pts":[{"x":"28827","y":"34751"}]},{"c":"A","wR":"6752","hR":"9215","stAng":"387196","swAng":"959901"},{"c":"M","pts":[{"x":"34129","y":"22954"}]},{"c":"A","wR":"5785","hR":"7867","stAng":"-4217541","swAng":"4255042"},{"c":"M","pts":[{"x":"41798","y":"15354"}]},{"c":"A","wR":"5333","hR":"7273","stAng":"1819082","swAng":"1665090"},{"c":"M","pts":[{"x":"38324","y":"5426"}]},{"c":"A","wR":"4857","hR":"6595","stAng":"-824660","swAng":"891534"},{"c":"M","pts":[{"x":"29078","y":"3952"}]},{"c":"A","wR":"4857","hR":"6595","stAng":"-8950887","swAng":"1091722"},{"c":"M","pts":[{"x":"22141","y":"4720"}]},{"c":"A","wR":"4365","hR":"5945","stAng":"-9809656","swAng":"1061181"},{"c":"M","pts":[{"x":"14000","y":"5192"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"-4002417","swAng":"739161"},{"c":"M","pts":[{"x":"4127","y":"15789"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"9459261","swAng":"711490"}]}]},"cloudCallout":{"av":[{"name":"adj1","fmla":"val -20833"},{"name":"adj2","fmla":"val 62500"}],"gd":[{"name":"dxPos","fmla":"*/ w adj1 100000"},{"name":"dyPos","fmla":"*/ h adj2 100000"},{"name":"xPos","fmla":"+- hc dxPos 0"},{"name":"yPos","fmla":"+- vc dyPos 0"},{"name":"ht","fmla":"cat2 hd2 dxPos dyPos"},{"name":"wt","fmla":"sat2 wd2 dxPos dyPos"},{"name":"g2","fmla":"cat2 wd2 ht wt"},{"name":"g3","fmla":"sat2 hd2 ht wt"},{"name":"g4","fmla":"+- hc g2 0"},{"name":"g5","fmla":"+- vc g3 0"},{"name":"g6","fmla":"+- g4 0 xPos"},{"name":"g7","fmla":"+- g5 0 yPos"},{"name":"g8","fmla":"mod g6 g7 0"},{"name":"g9","fmla":"*/ ss 6600 21600"},{"name":"g10","fmla":"+- g8 0 g9"},{"name":"g11","fmla":"*/ g10 1 3"},{"name":"g12","fmla":"*/ ss 1800 21600"},{"name":"g13","fmla":"+- g11 g12 0"},{"name":"g14","fmla":"*/ g13 g6 g8"},{"name":"g15","fmla":"*/ g13 g7 g8"},{"name":"g16","fmla":"+- g14 xPos 0"},{"name":"g17","fmla":"+- g15 yPos 0"},{"name":"g18","fmla":"*/ ss 4800 21600"},{"name":"g19","fmla":"*/ g11 2 1"},{"name":"g20","fmla":"+- g18 g19 0"},{"name":"g21","fmla":"*/ g20 g6 g8"},{"name":"g22","fmla":"*/ g20 g7 g8"},{"name":"g23","fmla":"+- g21 xPos 0"},{"name":"g24","fmla":"+- g22 yPos 0"},{"name":"g25","fmla":"*/ ss 1200 21600"},{"name":"g26","fmla":"*/ ss 600 21600"},{"name":"x23","fmla":"+- xPos g26 0"},{"name":"x24","fmla":"+- g16 g25 0"},{"name":"x25","fmla":"+- g23 g12 0"},{"name":"il","fmla":"*/ w 2977 21600"},{"name":"it","fmla":"*/ h 3262 21600"},{"name":"ir","fmla":"*/ w 17087 21600"},{"name":"ib","fmla":"*/ h 17337 21600"},{"name":"g27","fmla":"*/ w 67 21600"},{"name":"g28","fmla":"*/ h 21577 21600"},{"name":"g29","fmla":"*/ w 21582 21600"},{"name":"g30","fmla":"*/ h 1235 21600"},{"name":"pang","fmla":"at2 dxPos dyPos"}],"paths":[{"w":43200,"h":43200,"cmds":[{"c":"M","pts":[{"x":"3900","y":"14370"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"-11429249","swAng":"7426832"},{"c":"A","wR":"5333","hR":"7267","stAng":"-8646143","swAng":"5396714"},{"c":"A","wR":"4365","hR":"5945","stAng":"-8748475","swAng":"5983381"},{"c":"A","wR":"4857","hR":"6595","stAng":"-7859164","swAng":"7034504"},{"c":"A","wR":"5333","hR":"7273","stAng":"-4722533","swAng":"6541615"},{"c":"A","wR":"6775","hR":"9220","stAng":"-2776035","swAng":"7816140"},{"c":"A","wR":"5785","hR":"7867","stAng":"37501","swAng":"6842000"},{"c":"A","wR":"6752","hR":"9215","stAng":"1347096","swAng":"6910353"},{"c":"A","wR":"7720","hR":"10543","stAng":"3974558","swAng":"4542661"},{"c":"A","wR":"4360","hR":"5918","stAng":"-16496525","swAng":"8804134"},{"c":"A","wR":"4345","hR":"5945","stAng":"-14809710","swAng":"9151131"},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x23","y":"yPos"}]},{"c":"A","wR":"g26","hR":"g26","stAng":"0","swAng":"21600000"},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x24","y":"g17"}]},{"c":"A","wR":"g25","hR":"g25","stAng":"0","swAng":"21600000"},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x25","y":"g24"}]},{"c":"A","wR":"g12","hR":"g12","stAng":"0","swAng":"21600000"},{"c":"Z"}]},{"w":43200,"h":43200,"fill":"none","cmds":[{"c":"M","pts":[{"x":"4693","y":"26177"}]},{"c":"A","wR":"4345","hR":"5945","stAng":"5204520","swAng":"1585770"},{"c":"M","pts":[{"x":"6928","y":"34899"}]},{"c":"A","wR":"4360","hR":"5918","stAng":"4416628","swAng":"686848"},{"c":"M","pts":[{"x":"16478","y":"39090"}]},{"c":"A","wR":"6752","hR":"9215","stAng":"8257449","swAng":"844866"},{"c":"M","pts":[{"x":"28827","y":"34751"}]},{"c":"A","wR":"6752","hR":"9215","stAng":"387196","swAng":"959901"},{"c":"M","pts":[{"x":"34129","y":"22954"}]},{"c":"A","wR":"5785","hR":"7867","stAng":"-4217541","swAng":"4255042"},{"c":"M","pts":[{"x":"41798","y":"15354"}]},{"c":"A","wR":"5333","hR":"7273","stAng":"1819082","swAng":"1665090"},{"c":"M","pts":[{"x":"38324","y":"5426"}]},{"c":"A","wR":"4857","hR":"6595","stAng":"-824660","swAng":"891534"},{"c":"M","pts":[{"x":"29078","y":"3952"}]},{"c":"A","wR":"4857","hR":"6595","stAng":"-8950887","swAng":"1091722"},{"c":"M","pts":[{"x":"22141","y":"4720"}]},{"c":"A","wR":"4365","hR":"5945","stAng":"-9809656","swAng":"1061181"},{"c":"M","pts":[{"x":"14000","y":"5192"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"-4002417","swAng":"739161"},{"c":"M","pts":[{"x":"4127","y":"15789"}]},{"c":"A","wR":"6753","hR":"9190","stAng":"9459261","swAng":"711490"}]}]},"corner":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj1","fmla":"*/ 100000 h ss"},{"name":"maxAdj2","fmla":"*/ 100000 w ss"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"x1","fmla":"*/ ss a2 100000"},{"name":"dy1","fmla":"*/ ss a1 100000"},{"name":"y1","fmla":"+- b 0 dy1"},{"name":"cx1","fmla":"*/ x1 1 2"},{"name":"cy1","fmla":"+/ y1 b 2"},{"name":"d","fmla":"+- w 0 h"},{"name":"it","fmla":"?: d y1 t"},{"name":"ir","fmla":"?: d r x1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"cornerTabs":{"gd":[{"name":"md","fmla":"mod w h 0"},{"name":"dx","fmla":"*/ 1 md 20"},{"name":"y1","fmla":"+- 0 b dx"},{"name":"x1","fmla":"+- 0 r dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"dx","y":"t"}]},{"c":"L","pts":[{"x":"l","y":"dx"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"dx","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"dx"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"Z"}]}]},"cube":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 0 adj 100000"},{"name":"y1","fmla":"*/ ss a 100000"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y2","fmla":"*/ y4 1 2"},{"name":"y3","fmla":"+/ y1 b 2"},{"name":"x4","fmla":"+- r 0 y1"},{"name":"x2","fmla":"*/ x4 1 2"},{"name":"x3","fmla":"+/ y1 r 2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"Z"}]},{"fill":"lightenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"y1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"y1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"M","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]}]}]},"curvedConnector2":{"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"wd2","y":"t"},{"x":"r","y":"hd2"},{"x":"r","y":"b"}]}]}]},"curvedConnector3":{"av":[{"name":"adj1","fmla":"val 50000"}],"gd":[{"name":"x2","fmla":"*/ w adj1 100000"},{"name":"x1","fmla":"+/ l x2 2"},{"name":"x3","fmla":"+/ r x2 2"},{"name":"y3","fmla":"*/ h 3 4"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"x1","y":"t"},{"x":"x2","y":"hd4"},{"x":"x2","y":"vc"}]},{"c":"C","pts":[{"x":"x2","y":"y3"},{"x":"x3","y":"b"},{"x":"r","y":"b"}]}]}]},"curvedConnector4":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"x2","fmla":"*/ w adj1 100000"},{"name":"x1","fmla":"+/ l x2 2"},{"name":"x3","fmla":"+/ r x2 2"},{"name":"x4","fmla":"+/ x2 x3 2"},{"name":"x5","fmla":"+/ x3 r 2"},{"name":"y4","fmla":"*/ h adj2 100000"},{"name":"y1","fmla":"+/ t y4 2"},{"name":"y2","fmla":"+/ t y1 2"},{"name":"y3","fmla":"+/ y1 y4 2"},{"name":"y5","fmla":"+/ b y4 2"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"x1","y":"t"},{"x":"x2","y":"y2"},{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x2","y":"y3"},{"x":"x4","y":"y4"},{"x":"x3","y":"y4"}]},{"c":"C","pts":[{"x":"x5","y":"y4"},{"x":"r","y":"y5"},{"x":"r","y":"b"}]}]}]},"curvedConnector5":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 50000"}],"gd":[{"name":"x3","fmla":"*/ w adj1 100000"},{"name":"x6","fmla":"*/ w adj3 100000"},{"name":"x1","fmla":"+/ x3 x6 2"},{"name":"x2","fmla":"+/ l x3 2"},{"name":"x4","fmla":"+/ x3 x1 2"},{"name":"x5","fmla":"+/ x6 x1 2"},{"name":"x7","fmla":"+/ x6 r 2"},{"name":"y4","fmla":"*/ h adj2 100000"},{"name":"y1","fmla":"+/ t y4 2"},{"name":"y2","fmla":"+/ t y1 2"},{"name":"y3","fmla":"+/ y1 y4 2"},{"name":"y5","fmla":"+/ b y4 2"},{"name":"y6","fmla":"+/ y5 y4 2"},{"name":"y7","fmla":"+/ y5 b 2"}],"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"x2","y":"t"},{"x":"x3","y":"y2"},{"x":"x3","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y3"},{"x":"x4","y":"y4"},{"x":"x1","y":"y4"}]},{"c":"C","pts":[{"x":"x5","y":"y4"},{"x":"x6","y":"y6"},{"x":"x6","y":"y5"}]},{"c":"C","pts":[{"x":"x6","y":"y7"},{"x":"x7","y":"b"},{"x":"r","y":"b"}]}]}]},"curvedDownArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw","fmla":"*/ ss a2 100000"},{"name":"q1","fmla":"+/ th aw 4"},{"name":"wR","fmla":"+- wd2 0 q1"},{"name":"q7","fmla":"*/ wR 2 1"},{"name":"q8","fmla":"*/ q7 q7 1"},{"name":"q9","fmla":"*/ th th 1"},{"name":"q10","fmla":"+- q8 0 q9"},{"name":"q11","fmla":"sqrt q10"},{"name":"idy","fmla":"*/ q11 h q7"},{"name":"maxAdj3","fmla":"*/ 100000 idy ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"ah","fmla":"*/ ss adj3 100000"},{"name":"x3","fmla":"+- wR th 0"},{"name":"q2","fmla":"*/ h h 1"},{"name":"q3","fmla":"*/ ah ah 1"},{"name":"q4","fmla":"+- q2 0 q3"},{"name":"q5","fmla":"sqrt q4"},{"name":"dx","fmla":"*/ q5 wR h"},{"name":"x5","fmla":"+- wR dx 0"},{"name":"x7","fmla":"+- x3 dx 0"},{"name":"q6","fmla":"+- aw 0 th"},{"name":"dh","fmla":"*/ q6 1 2"},{"name":"x4","fmla":"+- x5 0 dh"},{"name":"x8","fmla":"+- x7 dh 0"},{"name":"aw2","fmla":"*/ aw 1 2"},{"name":"x6","fmla":"+- r 0 aw2"},{"name":"y1","fmla":"+- b 0 ah"},{"name":"swAng","fmla":"at2 ah dx"},{"name":"mswAng","fmla":"+- 0 0 swAng"},{"name":"iy","fmla":"+- b 0 idy"},{"name":"ix","fmla":"+/ wR x3 2"},{"name":"q12","fmla":"*/ th 1 2"},{"name":"dang2","fmla":"at2 idy q12"},{"name":"stAng","fmla":"+- 3cd4 swAng 0"},{"name":"stAng2","fmla":"+- 3cd4 0 dang2"},{"name":"swAng2","fmla":"+- dang2 0 cd4"},{"name":"swAng3","fmla":"+- cd4 dang2 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"x6","y":"b"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng","swAng":"mswAng"},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"wR","hR":"h","stAng":"3cd4","swAng":"swAng"},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"ix","y":"iy"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng2","swAng":"swAng2"},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd2","swAng":"swAng3"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"ix","y":"iy"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng2","swAng":"swAng2"},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"wR","hR":"h","stAng":"3cd4","swAng":"swAng"},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"x6","y":"b"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng","swAng":"mswAng"}]}]},"curvedLeftArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"a1","fmla":"pin 0 adj1 a2"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw","fmla":"*/ ss a2 100000"},{"name":"q1","fmla":"+/ th aw 4"},{"name":"hR","fmla":"+- hd2 0 q1"},{"name":"q7","fmla":"*/ hR 2 1"},{"name":"q8","fmla":"*/ q7 q7 1"},{"name":"q9","fmla":"*/ th th 1"},{"name":"q10","fmla":"+- q8 0 q9"},{"name":"q11","fmla":"sqrt q10"},{"name":"idx","fmla":"*/ q11 w q7"},{"name":"maxAdj3","fmla":"*/ 100000 idx ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"ah","fmla":"*/ ss a3 100000"},{"name":"y3","fmla":"+- hR th 0"},{"name":"q2","fmla":"*/ w w 1"},{"name":"q3","fmla":"*/ ah ah 1"},{"name":"q4","fmla":"+- q2 0 q3"},{"name":"q5","fmla":"sqrt q4"},{"name":"dy","fmla":"*/ q5 hR w"},{"name":"y5","fmla":"+- hR dy 0"},{"name":"y7","fmla":"+- y3 dy 0"},{"name":"q6","fmla":"+- aw 0 th"},{"name":"dh","fmla":"*/ q6 1 2"},{"name":"y4","fmla":"+- y5 0 dh"},{"name":"y8","fmla":"+- y7 dh 0"},{"name":"aw2","fmla":"*/ aw 1 2"},{"name":"y6","fmla":"+- b 0 aw2"},{"name":"x1","fmla":"+- l ah 0"},{"name":"swAng","fmla":"at2 ah dy"},{"name":"mswAng","fmla":"+- 0 0 swAng"},{"name":"ix","fmla":"+- l idx 0"},{"name":"iy","fmla":"+/ hR y3 2"},{"name":"q12","fmla":"*/ th 1 2"},{"name":"dang2","fmla":"at2 idx q12"},{"name":"swAng2","fmla":"+- dang2 0 swAng"},{"name":"swAng3","fmla":"+- swAng dang2 0"},{"name":"stAng3","fmla":"+- 0 0 dang2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"y6"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"A","wR":"w","hR":"hR","stAng":"swAng","swAng":"swAng2"},{"c":"A","wR":"w","hR":"hR","stAng":"stAng3","swAng":"swAng3"},{"c":"L","pts":[{"x":"x1","y":"y8"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"y3"}]},{"c":"A","wR":"w","hR":"hR","stAng":"0","swAng":"-5400000"},{"c":"L","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"w","hR":"hR","stAng":"3cd4","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"r","y":"y3"}]},{"c":"A","wR":"w","hR":"hR","stAng":"0","swAng":"-5400000"},{"c":"L","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"w","hR":"hR","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"A","wR":"w","hR":"hR","stAng":"0","swAng":"swAng"},{"c":"L","pts":[{"x":"x1","y":"y8"}]},{"c":"L","pts":[{"x":"l","y":"y6"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"A","wR":"w","hR":"hR","stAng":"swAng","swAng":"swAng2"}]}]},"curvedRightArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"a1","fmla":"pin 0 adj1 a2"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw","fmla":"*/ ss a2 100000"},{"name":"q1","fmla":"+/ th aw 4"},{"name":"hR","fmla":"+- hd2 0 q1"},{"name":"q7","fmla":"*/ hR 2 1"},{"name":"q8","fmla":"*/ q7 q7 1"},{"name":"q9","fmla":"*/ th th 1"},{"name":"q10","fmla":"+- q8 0 q9"},{"name":"q11","fmla":"sqrt q10"},{"name":"idx","fmla":"*/ q11 w q7"},{"name":"maxAdj3","fmla":"*/ 100000 idx ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"ah","fmla":"*/ ss a3 100000"},{"name":"y3","fmla":"+- hR th 0"},{"name":"q2","fmla":"*/ w w 1"},{"name":"q3","fmla":"*/ ah ah 1"},{"name":"q4","fmla":"+- q2 0 q3"},{"name":"q5","fmla":"sqrt q4"},{"name":"dy","fmla":"*/ q5 hR w"},{"name":"y5","fmla":"+- hR dy 0"},{"name":"y7","fmla":"+- y3 dy 0"},{"name":"q6","fmla":"+- aw 0 th"},{"name":"dh","fmla":"*/ q6 1 2"},{"name":"y4","fmla":"+- y5 0 dh"},{"name":"y8","fmla":"+- y7 dh 0"},{"name":"aw2","fmla":"*/ aw 1 2"},{"name":"y6","fmla":"+- b 0 aw2"},{"name":"x1","fmla":"+- r 0 ah"},{"name":"swAng","fmla":"at2 ah dy"},{"name":"stAng","fmla":"+- cd2 0 swAng"},{"name":"mswAng","fmla":"+- 0 0 swAng"},{"name":"ix","fmla":"+- r 0 idx"},{"name":"iy","fmla":"+/ hR y3 2"},{"name":"q12","fmla":"*/ th 1 2"},{"name":"dang2","fmla":"at2 idx q12"},{"name":"swAng2","fmla":"+- dang2 0 cd4"},{"name":"swAng3","fmla":"+- cd4 dang2 0"},{"name":"stAng3","fmla":"+- cd2 0 dang2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"hR"}]},{"c":"A","wR":"w","hR":"hR","stAng":"cd2","swAng":"mswAng"},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"r","y":"y6"}]},{"c":"L","pts":[{"x":"x1","y":"y8"}]},{"c":"L","pts":[{"x":"x1","y":"y7"}]},{"c":"A","wR":"w","hR":"hR","stAng":"stAng","swAng":"swAng"},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"th"}]},{"c":"A","wR":"w","hR":"hR","stAng":"3cd4","swAng":"swAng2"},{"c":"A","wR":"w","hR":"hR","stAng":"stAng3","swAng":"swAng3"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"hR"}]},{"c":"A","wR":"w","hR":"hR","stAng":"cd2","swAng":"mswAng"},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"r","y":"y6"}]},{"c":"L","pts":[{"x":"x1","y":"y8"}]},{"c":"L","pts":[{"x":"x1","y":"y7"}]},{"c":"A","wR":"w","hR":"hR","stAng":"stAng","swAng":"swAng"},{"c":"L","pts":[{"x":"l","y":"hR"}]},{"c":"A","wR":"w","hR":"hR","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"th"}]},{"c":"A","wR":"w","hR":"hR","stAng":"3cd4","swAng":"swAng2"}]}]},"curvedUpArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw","fmla":"*/ ss a2 100000"},{"name":"q1","fmla":"+/ th aw 4"},{"name":"wR","fmla":"+- wd2 0 q1"},{"name":"q7","fmla":"*/ wR 2 1"},{"name":"q8","fmla":"*/ q7 q7 1"},{"name":"q9","fmla":"*/ th th 1"},{"name":"q10","fmla":"+- q8 0 q9"},{"name":"q11","fmla":"sqrt q10"},{"name":"idy","fmla":"*/ q11 h q7"},{"name":"maxAdj3","fmla":"*/ 100000 idy ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"ah","fmla":"*/ ss adj3 100000"},{"name":"x3","fmla":"+- wR th 0"},{"name":"q2","fmla":"*/ h h 1"},{"name":"q3","fmla":"*/ ah ah 1"},{"name":"q4","fmla":"+- q2 0 q3"},{"name":"q5","fmla":"sqrt q4"},{"name":"dx","fmla":"*/ q5 wR h"},{"name":"x5","fmla":"+- wR dx 0"},{"name":"x7","fmla":"+- x3 dx 0"},{"name":"q6","fmla":"+- aw 0 th"},{"name":"dh","fmla":"*/ q6 1 2"},{"name":"x4","fmla":"+- x5 0 dh"},{"name":"x8","fmla":"+- x7 dh 0"},{"name":"aw2","fmla":"*/ aw 1 2"},{"name":"x6","fmla":"+- r 0 aw2"},{"name":"y1","fmla":"+- t ah 0"},{"name":"swAng","fmla":"at2 ah dx"},{"name":"mswAng","fmla":"+- 0 0 swAng"},{"name":"iy","fmla":"+- t idy 0"},{"name":"ix","fmla":"+/ wR x3 2"},{"name":"q12","fmla":"*/ th 1 2"},{"name":"dang2","fmla":"at2 idy q12"},{"name":"swAng2","fmla":"+- dang2 0 swAng"},{"name":"mswAng2","fmla":"+- 0 0 swAng2"},{"name":"stAng3","fmla":"+- cd4 0 swAng"},{"name":"swAng3","fmla":"+- swAng dang2 0"},{"name":"stAng2","fmla":"+- cd4 0 dang2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"x6","y":"t"}]},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng3","swAng":"swAng3"},{"c":"A","wR":"wR","hR":"h","stAng":"stAng2","swAng":"swAng2"},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"wR","y":"b"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"th","y":"t"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd2","swAng":"-5400000"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"ix","y":"iy"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng2","swAng":"swAng2"},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x6","y":"t"}]},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"A","wR":"wR","hR":"h","stAng":"stAng3","swAng":"swAng"},{"c":"L","pts":[{"x":"wR","y":"b"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"th","y":"t"}]},{"c":"A","wR":"wR","hR":"h","stAng":"cd2","swAng":"-5400000"}]}]},"decagon":{"av":[{"name":"vf","fmla":"val 105146"}],"gd":[{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"dx1","fmla":"cos wd2 2160000"},{"name":"dx2","fmla":"cos wd2 4320000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"dy1","fmla":"sin shd2 4320000"},{"name":"dy2","fmla":"sin shd2 2160000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y4","fmla":"+- vc dy1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"Z"}]}]},"diagStripe":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 100000"},{"name":"x2","fmla":"*/ w a 100000"},{"name":"x1","fmla":"*/ x2 1 2"},{"name":"x3","fmla":"+/ x2 r 2"},{"name":"y2","fmla":"*/ h a 100000"},{"name":"y1","fmla":"*/ y2 1 2"},{"name":"y3","fmla":"+/ y2 b 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"diamond":{"gd":[{"name":"ir","fmla":"*/ w 3 4"},{"name":"ib","fmla":"*/ h 3 4"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"Z"}]}]},"dodecagon":{"gd":[{"name":"x1","fmla":"*/ w 2894 21600"},{"name":"x2","fmla":"*/ w 7906 21600"},{"name":"x3","fmla":"*/ w 13694 21600"},{"name":"x4","fmla":"*/ w 18706 21600"},{"name":"y1","fmla":"*/ h 2894 21600"},{"name":"y2","fmla":"*/ h 7906 21600"},{"name":"y3","fmla":"*/ h 13694 21600"},{"name":"y4","fmla":"*/ h 18706 21600"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"l","y":"y3"}]},{"c":"Z"}]}]},"donut":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dr","fmla":"*/ ss a 100000"},{"name":"iwd2","fmla":"+- wd2 0 dr"},{"name":"ihd2","fmla":"+- hd2 0 dr"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"},{"c":"M","pts":[{"x":"dr","y":"vc"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"cd2","swAng":"-5400000"},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"0","swAng":"-5400000"},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"3cd4","swAng":"-5400000"},{"c":"Z"}]}]},"doubleWave":{"av":[{"name":"adj1","fmla":"val 6250"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 12500"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"dx1","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs dx1"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx8","fmla":"?: of2 of2 0"},{"name":"x8","fmla":"+- r 0 dx8"},{"name":"dx3","fmla":"+/ dx2 x8 6"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"dx4","fmla":"+/ dx2 x8 3"},{"name":"x4","fmla":"+- x2 dx4 0"},{"name":"x5","fmla":"+/ x2 x8 2"},{"name":"x6","fmla":"+- x5 dx3 0"},{"name":"x7","fmla":"+/ x6 x8 2"},{"name":"x9","fmla":"+- l dx8 0"},{"name":"x15","fmla":"+- r dx2 0"},{"name":"x10","fmla":"+- x9 dx3 0"},{"name":"x11","fmla":"+- x9 dx4 0"},{"name":"x12","fmla":"+/ x9 x15 2"},{"name":"x13","fmla":"+- x12 dx3 0"},{"name":"x14","fmla":"+/ x13 x15 2"},{"name":"x16","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc dx1 0"},{"name":"il","fmla":"max x2 x9"},{"name":"ir","fmla":"min x8 x15"},{"name":"it","fmla":"*/ h a1 50000"},{"name":"ib","fmla":"+- b 0 it"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y2"},{"x":"x4","y":"y3"},{"x":"x5","y":"y1"}]},{"c":"C","pts":[{"x":"x6","y":"y2"},{"x":"x7","y":"y3"},{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"x15","y":"y4"}]},{"c":"C","pts":[{"x":"x14","y":"y6"},{"x":"x13","y":"y5"},{"x":"x12","y":"y4"}]},{"c":"C","pts":[{"x":"x11","y":"y6"},{"x":"x10","y":"y5"},{"x":"x9","y":"y4"}]},{"c":"Z"}]}]},"downArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 h ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dy1","fmla":"*/ ss a2 100000"},{"name":"y1","fmla":"+- b 0 dy1"},{"name":"dx1","fmla":"*/ w a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"dy2","fmla":"*/ x1 dy1 wd2"},{"name":"y2","fmla":"+- y1 dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"Z"}]}]},"downArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 64977"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 100000 h ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss h"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dx1","fmla":"*/ ss a2 100000"},{"name":"dx2","fmla":"*/ ss a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"dy3","fmla":"*/ ss a3 100000"},{"name":"y3","fmla":"+- b 0 dy3"},{"name":"y2","fmla":"*/ h a4 100000"},{"name":"y1","fmla":"*/ y2 1 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"Z"}]}]},"ellipse":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"ellipseRibbon":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 12500"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 25000 adj2 75000"},{"name":"q10","fmla":"+- 100000 0 a1"},{"name":"q11","fmla":"*/ q10 1 2"},{"name":"q12","fmla":"+- a1 0 q11"},{"name":"minAdj3","fmla":"max 0 q12"},{"name":"a3","fmla":"pin minAdj3 adj3 a1"},{"name":"dx2","fmla":"*/ w a2 200000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- x2 wd8 0"},{"name":"x4","fmla":"+- r 0 x3"},{"name":"x5","fmla":"+- r 0 x2"},{"name":"x6","fmla":"+- r 0 wd8"},{"name":"dy1","fmla":"*/ h a3 100000"},{"name":"f1","fmla":"*/ 4 dy1 w"},{"name":"q1","fmla":"*/ x3 x3 w"},{"name":"q2","fmla":"+- x3 0 q1"},{"name":"y1","fmla":"*/ f1 q2 1"},{"name":"cx1","fmla":"*/ x3 1 2"},{"name":"cy1","fmla":"*/ f1 cx1 1"},{"name":"cx2","fmla":"+- r 0 cx1"},{"name":"q1","fmla":"*/ h a1 100000"},{"name":"dy3","fmla":"+- q1 0 dy1"},{"name":"q3","fmla":"*/ x2 x2 w"},{"name":"q4","fmla":"+- x2 0 q3"},{"name":"q5","fmla":"*/ f1 q4 1"},{"name":"y3","fmla":"+- q5 dy3 0"},{"name":"q6","fmla":"+- dy1 dy3 y3"},{"name":"q7","fmla":"+- q6 dy1 0"},{"name":"cy3","fmla":"+- q7 dy3 0"},{"name":"rh","fmla":"+- b 0 q1"},{"name":"q8","fmla":"*/ dy1 14 16"},{"name":"y2","fmla":"+/ q8 rh 2"},{"name":"y5","fmla":"+- q5 rh 0"},{"name":"y6","fmla":"+- y3 rh 0"},{"name":"cx4","fmla":"*/ x2 1 2"},{"name":"q9","fmla":"*/ f1 cx4 1"},{"name":"cy4","fmla":"+- q9 rh 0"},{"name":"cx5","fmla":"+- r 0 cx4"},{"name":"cy6","fmla":"+- cy3 rh 0"},{"name":"y7","fmla":"+- y1 dy3 0"},{"name":"cy7","fmla":"+- q1 q1 y7"},{"name":"y8","fmla":"+- b 0 dy1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"Q","pts":[{"x":"cx1","y":"cy1"},{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"Q","pts":[{"x":"cx2","y":"cy1"},{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"rh"}]},{"c":"Q","pts":[{"x":"cx5","y":"cy4"},{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"x5","y":"y6"}]},{"c":"Q","pts":[{"x":"hc","y":"cy6"},{"x":"x2","y":"y6"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"Q","pts":[{"x":"cx4","y":"cy4"},{"x":"l","y":"rh"}]},{"c":"L","pts":[{"x":"wd8","y":"y2"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x3","y":"y7"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y7"}]},{"c":"Q","pts":[{"x":"hc","y":"cy7"},{"x":"x3","y":"y7"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"Q","pts":[{"x":"cx1","y":"cy1"},{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"Q","pts":[{"x":"cx2","y":"cy1"},{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"rh"}]},{"c":"Q","pts":[{"x":"cx5","y":"cy4"},{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"x5","y":"y6"}]},{"c":"Q","pts":[{"x":"hc","y":"cy6"},{"x":"x2","y":"y6"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"Q","pts":[{"x":"cx4","y":"cy4"},{"x":"l","y":"rh"}]},{"c":"L","pts":[{"x":"wd8","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x2","y":"y5"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"M","pts":[{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x5","y":"y5"}]},{"c":"M","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y7"}]},{"c":"M","pts":[{"x":"x4","y":"y7"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]}]}]},"ellipseRibbon2":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 12500"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 25000 adj2 75000"},{"name":"q10","fmla":"+- 100000 0 a1"},{"name":"q11","fmla":"*/ q10 1 2"},{"name":"q12","fmla":"+- a1 0 q11"},{"name":"minAdj3","fmla":"max 0 q12"},{"name":"a3","fmla":"pin minAdj3 adj3 a1"},{"name":"dx2","fmla":"*/ w a2 200000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- x2 wd8 0"},{"name":"x4","fmla":"+- r 0 x3"},{"name":"x5","fmla":"+- r 0 x2"},{"name":"x6","fmla":"+- r 0 wd8"},{"name":"dy1","fmla":"*/ h a3 100000"},{"name":"f1","fmla":"*/ 4 dy1 w"},{"name":"q1","fmla":"*/ x3 x3 w"},{"name":"q2","fmla":"+- x3 0 q1"},{"name":"u1","fmla":"*/ f1 q2 1"},{"name":"y1","fmla":"+- b 0 u1"},{"name":"cx1","fmla":"*/ x3 1 2"},{"name":"cu1","fmla":"*/ f1 cx1 1"},{"name":"cy1","fmla":"+- b 0 cu1"},{"name":"cx2","fmla":"+- r 0 cx1"},{"name":"q1","fmla":"*/ h a1 100000"},{"name":"dy3","fmla":"+- q1 0 dy1"},{"name":"q3","fmla":"*/ x2 x2 w"},{"name":"q4","fmla":"+- x2 0 q3"},{"name":"q5","fmla":"*/ f1 q4 1"},{"name":"u3","fmla":"+- q5 dy3 0"},{"name":"y3","fmla":"+- b 0 u3"},{"name":"q6","fmla":"+- dy1 dy3 u3"},{"name":"q7","fmla":"+- q6 dy1 0"},{"name":"cu3","fmla":"+- q7 dy3 0"},{"name":"cy3","fmla":"+- b 0 cu3"},{"name":"rh","fmla":"+- b 0 q1"},{"name":"q8","fmla":"*/ dy1 14 16"},{"name":"u2","fmla":"+/ q8 rh 2"},{"name":"y2","fmla":"+- b 0 u2"},{"name":"u5","fmla":"+- q5 rh 0"},{"name":"y5","fmla":"+- b 0 u5"},{"name":"u6","fmla":"+- u3 rh 0"},{"name":"y6","fmla":"+- b 0 u6"},{"name":"cx4","fmla":"*/ x2 1 2"},{"name":"q9","fmla":"*/ f1 cx4 1"},{"name":"cu4","fmla":"+- q9 rh 0"},{"name":"cy4","fmla":"+- b 0 cu4"},{"name":"cx5","fmla":"+- r 0 cx4"},{"name":"cu6","fmla":"+- cu3 rh 0"},{"name":"cy6","fmla":"+- b 0 cu6"},{"name":"u7","fmla":"+- u1 dy3 0"},{"name":"y7","fmla":"+- b 0 u7"},{"name":"cu7","fmla":"+- q1 q1 u7"},{"name":"cy7","fmla":"+- b 0 cu7"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"Q","pts":[{"x":"cx1","y":"cy1"},{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"Q","pts":[{"x":"cx2","y":"cy1"},{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"q1"}]},{"c":"Q","pts":[{"x":"cx5","y":"cy4"},{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"x5","y":"y6"}]},{"c":"Q","pts":[{"x":"hc","y":"cy6"},{"x":"x2","y":"y6"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"Q","pts":[{"x":"cx4","y":"cy4"},{"x":"l","y":"q1"}]},{"c":"L","pts":[{"x":"wd8","y":"y2"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x3","y":"y7"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y7"}]},{"c":"Q","pts":[{"x":"hc","y":"cy7"},{"x":"x3","y":"y7"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"wd8","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"q1"}]},{"c":"Q","pts":[{"x":"cx4","y":"cy4"},{"x":"x2","y":"y5"}]},{"c":"L","pts":[{"x":"x2","y":"y6"}]},{"c":"Q","pts":[{"x":"hc","y":"cy6"},{"x":"x5","y":"y6"}]},{"c":"L","pts":[{"x":"x5","y":"y5"}]},{"c":"Q","pts":[{"x":"cx5","y":"cy4"},{"x":"r","y":"q1"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Q","pts":[{"x":"cx2","y":"cy1"},{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x5","y":"y3"}]},{"c":"Q","pts":[{"x":"hc","y":"cy3"},{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"Q","pts":[{"x":"cx1","y":"cy1"},{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"M","pts":[{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"x5","y":"y3"}]},{"c":"M","pts":[{"x":"x3","y":"y7"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"M","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x4","y":"y7"}]}]}]},"flowChartAlternateProcess":{"gd":[{"name":"x2","fmla":"+- r 0 ssd6"},{"name":"y2","fmla":"+- b 0 ssd6"},{"name":"il","fmla":"*/ ssd6 29289 100000"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"ssd6"}]},{"c":"A","wR":"ssd6","hR":"ssd6","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"ssd6","hR":"ssd6","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"ssd6","hR":"ssd6","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"ssd6","y":"b"}]},{"c":"A","wR":"ssd6","hR":"ssd6","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"flowChartCollate":{"gd":[{"name":"ir","fmla":"*/ w 3 4"},{"name":"ib","fmla":"*/ h 3 4"}],"paths":[{"w":2,"h":2,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"2","y":"2"}]},{"c":"L","pts":[{"x":"0","y":"2"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"Z"}]}]},"flowChartConnector":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"flowChartDecision":{"gd":[{"name":"ir","fmla":"*/ w 3 4"},{"name":"ib","fmla":"*/ h 3 4"}],"paths":[{"w":2,"h":2,"cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]}]},"flowChartDelay":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"flowChartDisplay":{"gd":[{"name":"x2","fmla":"*/ w 5 6"}],"paths":[{"w":6,"h":6,"cmds":[{"c":"M","pts":[{"x":"0","y":"3"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"A","wR":"1","hR":"3","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"1","y":"6"}]},{"c":"Z"}]}]},"flowChartDocument":{"gd":[{"name":"y1","fmla":"*/ h 17322 21600"},{"name":"y2","fmla":"*/ h 20172 21600"}],"paths":[{"w":21600,"h":21600,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"17322"}]},{"c":"C","pts":[{"x":"10800","y":"17322"},{"x":"10800","y":"23922"},{"x":"0","y":"20172"}]},{"c":"Z"}]}]},"flowChartExtract":{"gd":[{"name":"x2","fmla":"*/ w 3 4"}],"paths":[{"w":2,"h":2,"cmds":[{"c":"M","pts":[{"x":"0","y":"2"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"2"}]},{"c":"Z"}]}]},"flowChartInputOutput":{"gd":[{"name":"x3","fmla":"*/ w 2 5"},{"name":"x4","fmla":"*/ w 3 5"},{"name":"x5","fmla":"*/ w 4 5"},{"name":"x6","fmla":"*/ w 9 10"}],"paths":[{"w":5,"h":5,"cmds":[{"c":"M","pts":[{"x":"0","y":"5"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"4","y":"5"}]},{"c":"Z"}]}]},"flowChartInternalStorage":{"paths":[{"w":1,"h":1,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"0","y":"1"}]},{"c":"Z"}]},{"w":8,"h":8,"fill":"none","cmds":[{"c":"M","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"8"}]},{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"8","y":"1"}]}]},{"w":1,"h":1,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"0","y":"1"}]},{"c":"Z"}]}]},"flowChartMagneticDisk":{"gd":[{"name":"y3","fmla":"*/ h 5 6"}],"paths":[{"w":6,"h":6,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"A","wR":"3","hR":"1","stAng":"cd2","swAng":"cd2"},{"c":"L","pts":[{"x":"6","y":"5"}]},{"c":"A","wR":"3","hR":"1","stAng":"0","swAng":"cd2"},{"c":"Z"}]},{"w":6,"h":6,"fill":"none","cmds":[{"c":"M","pts":[{"x":"6","y":"1"}]},{"c":"A","wR":"3","hR":"1","stAng":"0","swAng":"cd2"}]},{"w":6,"h":6,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"A","wR":"3","hR":"1","stAng":"cd2","swAng":"cd2"},{"c":"L","pts":[{"x":"6","y":"5"}]},{"c":"A","wR":"3","hR":"1","stAng":"0","swAng":"cd2"},{"c":"Z"}]}]},"flowChartMagneticDrum":{"gd":[{"name":"x2","fmla":"*/ w 2 3"}],"paths":[{"w":6,"h":6,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"A","wR":"1","hR":"3","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"1","y":"6"}]},{"c":"A","wR":"1","hR":"3","stAng":"cd4","swAng":"cd2"},{"c":"Z"}]},{"w":6,"h":6,"fill":"none","cmds":[{"c":"M","pts":[{"x":"5","y":"6"}]},{"c":"A","wR":"1","hR":"3","stAng":"cd4","swAng":"cd2"}]},{"w":6,"h":6,"fill":"none","cmds":[{"c":"M","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"A","wR":"1","hR":"3","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"1","y":"6"}]},{"c":"A","wR":"1","hR":"3","stAng":"cd4","swAng":"cd2"},{"c":"Z"}]}]},"flowChartMagneticTape":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"},{"name":"ang1","fmla":"at2 w h"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"hc","y":"b"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"ang1"},{"c":"L","pts":[{"x":"r","y":"ib"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"flowChartManualInput":{"paths":[{"w":5,"h":5,"cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"5"}]},{"c":"L","pts":[{"x":"0","y":"5"}]},{"c":"Z"}]}]},"flowChartManualOperation":{"gd":[{"name":"x3","fmla":"*/ w 4 5"},{"name":"x4","fmla":"*/ w 9 10"}],"paths":[{"w":5,"h":5,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"4","y":"5"}]},{"c":"L","pts":[{"x":"1","y":"5"}]},{"c":"Z"}]}]},"flowChartMerge":{"gd":[{"name":"x2","fmla":"*/ w 3 4"}],"paths":[{"w":2,"h":2,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]}]},"flowChartMultidocument":{"gd":[{"name":"y2","fmla":"*/ h 3675 21600"},{"name":"y8","fmla":"*/ h 20782 21600"},{"name":"x3","fmla":"*/ w 9298 21600"},{"name":"x4","fmla":"*/ w 12286 21600"},{"name":"x5","fmla":"*/ w 18595 21600"}],"paths":[{"w":21600,"h":21600,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"20782"}]},{"c":"C","pts":[{"x":"9298","y":"23542"},{"x":"9298","y":"18022"},{"x":"18595","y":"18022"}]},{"c":"L","pts":[{"x":"18595","y":"3675"}]},{"c":"L","pts":[{"x":"0","y":"3675"}]},{"c":"Z"},{"c":"M","pts":[{"x":"1532","y":"3675"}]},{"c":"L","pts":[{"x":"1532","y":"1815"}]},{"c":"L","pts":[{"x":"20000","y":"1815"}]},{"c":"L","pts":[{"x":"20000","y":"16252"}]},{"c":"C","pts":[{"x":"19298","y":"16252"},{"x":"18595","y":"16352"},{"x":"18595","y":"16352"}]},{"c":"L","pts":[{"x":"18595","y":"3675"}]},{"c":"Z"},{"c":"M","pts":[{"x":"2972","y":"1815"}]},{"c":"L","pts":[{"x":"2972","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"14392"}]},{"c":"C","pts":[{"x":"20800","y":"14392"},{"x":"20000","y":"14467"},{"x":"20000","y":"14467"}]},{"c":"L","pts":[{"x":"20000","y":"1815"}]},{"c":"Z"}]},{"w":21600,"h":21600,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"3675"}]},{"c":"L","pts":[{"x":"18595","y":"3675"}]},{"c":"L","pts":[{"x":"18595","y":"18022"}]},{"c":"C","pts":[{"x":"9298","y":"18022"},{"x":"9298","y":"23542"},{"x":"0","y":"20782"}]},{"c":"Z"},{"c":"M","pts":[{"x":"1532","y":"3675"}]},{"c":"L","pts":[{"x":"1532","y":"1815"}]},{"c":"L","pts":[{"x":"20000","y":"1815"}]},{"c":"L","pts":[{"x":"20000","y":"16252"}]},{"c":"C","pts":[{"x":"19298","y":"16252"},{"x":"18595","y":"16352"},{"x":"18595","y":"16352"}]},{"c":"M","pts":[{"x":"2972","y":"1815"}]},{"c":"L","pts":[{"x":"2972","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"0"}]},{"c":"L","pts":[{"x":"21600","y":"14392"}]},{"c":"C","pts":[{"x":"20800","y":"14392"},{"x":"20000","y":"14467"},{"x":"20000","y":"14467"}]}]},{"w":21600,"h":21600,"fill":"none","stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"20782"}]},{"c":"C","pts":[{"x":"9298","y":"23542"},{"x":"9298","y":"18022"},{"x":"18595","y":"18022"}]},{"c":"L","pts":[{"x":"18595","y":"16352"}]},{"c":"C","pts":[{"x":"18595","y":"16352"},{"x":"19298","y":"16252"},{"x":"20000","y":"16252"}]},{"c":"L","pts":[{"x":"20000","y":"14467"}]},{"c":"C","pts":[{"x":"20000","y":"14467"},{"x":"20800","y":"14392"},{"x":"21600","y":"14392"}]},{"c":"L","pts":[{"x":"21600","y":"0"}]},{"c":"L","pts":[{"x":"2972","y":"0"}]},{"c":"L","pts":[{"x":"2972","y":"1815"}]},{"c":"L","pts":[{"x":"1532","y":"1815"}]},{"c":"L","pts":[{"x":"1532","y":"3675"}]},{"c":"L","pts":[{"x":"0","y":"3675"}]},{"c":"Z"}]}]},"flowChartOfflineStorage":{"gd":[{"name":"x4","fmla":"*/ w 3 4"}],"paths":[{"w":2,"h":2,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]},{"w":5,"h":5,"fill":"none","cmds":[{"c":"M","pts":[{"x":"2","y":"4"}]},{"c":"L","pts":[{"x":"3","y":"4"}]}]},{"w":2,"h":2,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]}]},"flowChartOffpageConnector":{"gd":[{"name":"y1","fmla":"*/ h 4 5"}],"paths":[{"w":10,"h":10,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"10","y":"0"}]},{"c":"L","pts":[{"x":"10","y":"8"}]},{"c":"L","pts":[{"x":"5","y":"10"}]},{"c":"L","pts":[{"x":"0","y":"8"}]},{"c":"Z"}]}]},"flowChartOnlineStorage":{"gd":[{"name":"x2","fmla":"*/ w 5 6"}],"paths":[{"w":6,"h":6,"cmds":[{"c":"M","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"6","y":"0"}]},{"c":"A","wR":"1","hR":"3","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"1","y":"6"}]},{"c":"A","wR":"1","hR":"3","stAng":"cd4","swAng":"cd2"},{"c":"Z"}]}]},"flowChartOr":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"flowChartPredefinedProcess":{"gd":[{"name":"x2","fmla":"*/ w 7 8"}],"paths":[{"w":1,"h":1,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"0","y":"1"}]},{"c":"Z"}]},{"w":8,"h":8,"fill":"none","cmds":[{"c":"M","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"8"}]},{"c":"M","pts":[{"x":"7","y":"0"}]},{"c":"L","pts":[{"x":"7","y":"8"}]}]},{"w":1,"h":1,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"0","y":"1"}]},{"c":"Z"}]}]},"flowChartPreparation":{"gd":[{"name":"x2","fmla":"*/ w 4 5"}],"paths":[{"w":10,"h":10,"cmds":[{"c":"M","pts":[{"x":"0","y":"5"}]},{"c":"L","pts":[{"x":"2","y":"0"}]},{"c":"L","pts":[{"x":"8","y":"0"}]},{"c":"L","pts":[{"x":"10","y":"5"}]},{"c":"L","pts":[{"x":"8","y":"10"}]},{"c":"L","pts":[{"x":"2","y":"10"}]},{"c":"Z"}]}]},"flowChartProcess":{"paths":[{"w":1,"h":1,"cmds":[{"c":"M","pts":[{"x":"0","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"1","y":"1"}]},{"c":"L","pts":[{"x":"0","y":"1"}]},{"c":"Z"}]}]},"flowChartPunchedCard":{"paths":[{"w":5,"h":5,"cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"0"}]},{"c":"L","pts":[{"x":"5","y":"5"}]},{"c":"L","pts":[{"x":"0","y":"5"}]},{"c":"Z"}]}]},"flowChartPunchedTape":{"gd":[{"name":"y2","fmla":"*/ h 9 10"},{"name":"ib","fmla":"*/ h 4 5"}],"paths":[{"w":20,"h":20,"cmds":[{"c":"M","pts":[{"x":"0","y":"2"}]},{"c":"A","wR":"5","hR":"2","stAng":"cd2","swAng":"-10800000"},{"c":"A","wR":"5","hR":"2","stAng":"cd2","swAng":"cd2"},{"c":"L","pts":[{"x":"20","y":"18"}]},{"c":"A","wR":"5","hR":"2","stAng":"0","swAng":"-10800000"},{"c":"A","wR":"5","hR":"2","stAng":"0","swAng":"cd2"},{"c":"Z"}]}]},"flowChartSort":{"gd":[{"name":"ir","fmla":"*/ w 3 4"},{"name":"ib","fmla":"*/ h 3 4"}],"paths":[{"w":2,"h":2,"stroke":"false","cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]},{"w":2,"h":2,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"2","y":"1"}]}]},{"w":2,"h":2,"fill":"none","cmds":[{"c":"M","pts":[{"x":"0","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"0"}]},{"c":"L","pts":[{"x":"2","y":"1"}]},{"c":"L","pts":[{"x":"1","y":"2"}]},{"c":"Z"}]}]},"flowChartSummingJunction":{"gd":[{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"il","y":"it"}]},{"c":"L","pts":[{"x":"ir","y":"ib"}]},{"c":"M","pts":[{"x":"ir","y":"it"}]},{"c":"L","pts":[{"x":"il","y":"ib"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"flowChartTerminator":{"gd":[{"name":"il","fmla":"*/ w 1018 21600"},{"name":"ir","fmla":"*/ w 20582 21600"},{"name":"it","fmla":"*/ h 3163 21600"},{"name":"ib","fmla":"*/ h 18437 21600"}],"paths":[{"w":21600,"h":21600,"cmds":[{"c":"M","pts":[{"x":"3475","y":"0"}]},{"c":"L","pts":[{"x":"18125","y":"0"}]},{"c":"A","wR":"3475","hR":"10800","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"3475","y":"21600"}]},{"c":"A","wR":"3475","hR":"10800","stAng":"cd4","swAng":"cd2"},{"c":"Z"}]}]},"foldedCorner":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dy2","fmla":"*/ ss a 100000"},{"name":"dy1","fmla":"*/ dy2 1 5"},{"name":"x1","fmla":"+- r 0 dy2"},{"name":"x2","fmla":"+- x1 dy1 0"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"y1","fmla":"+- y2 dy1 0"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]}]},"frame":{"av":[{"name":"adj1","fmla":"val 12500"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"x1","fmla":"*/ ss a1 100000"},{"name":"x4","fmla":"+- r 0 x1"},{"name":"y4","fmla":"+- b 0 x1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x1","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"x1"}]},{"c":"Z"}]}]},"funnel":{"gd":[{"name":"d","fmla":"*/ ss 1 20"},{"name":"rw2","fmla":"+- wd2 0 d"},{"name":"rh2","fmla":"+- hd4 0 d"},{"name":"t1","fmla":"cos wd2 480000"},{"name":"t2","fmla":"sin hd4 480000"},{"name":"da","fmla":"at2 t1 t2"},{"name":"2da","fmla":"*/ da 2 1"},{"name":"stAng1","fmla":"+- cd2 0 da"},{"name":"swAng1","fmla":"+- cd2 2da 0"},{"name":"swAng3","fmla":"+- cd2 0 2da"},{"name":"rw3","fmla":"*/ wd2 1 4"},{"name":"rh3","fmla":"*/ hd4 1 4"},{"name":"ct1","fmla":"cos hd4 stAng1"},{"name":"st1","fmla":"sin wd2 stAng1"},{"name":"m1","fmla":"mod ct1 st1 0"},{"name":"n1","fmla":"*/ wd2 hd4 m1"},{"name":"dx1","fmla":"cos n1 stAng1"},{"name":"dy1","fmla":"sin n1 stAng1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- hd4 dy1 0"},{"name":"ct3","fmla":"cos rh3 da"},{"name":"st3","fmla":"sin rw3 da"},{"name":"m3","fmla":"mod ct3 st3 0"},{"name":"n3","fmla":"*/ rw3 rh3 m3"},{"name":"dx3","fmla":"cos n3 da"},{"name":"dy3","fmla":"sin n3 da"},{"name":"x3","fmla":"+- hc dx3 0"},{"name":"vc3","fmla":"+- b 0 rh3"},{"name":"y2","fmla":"+- vc3 dy3 0"},{"name":"x2","fmla":"+- wd2 0 rw2"},{"name":"cd","fmla":"*/ cd2 2 1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd4","stAng":"stAng1","swAng":"swAng1"},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"A","wR":"rw3","hR":"rh3","stAng":"da","swAng":"swAng3"},{"c":"Z"},{"c":"M","pts":[{"x":"x2","y":"hd4"}]},{"c":"A","wR":"rw2","hR":"rh2","stAng":"cd2","swAng":"-21600000"},{"c":"Z"}]}]},"gear6":{"av":[{"name":"adj1","fmla":"val 15000"},{"name":"adj2","fmla":"val 3526"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 20000"},{"name":"a2","fmla":"pin 0 adj2 5358"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"lFD","fmla":"*/ ss a2 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"l2","fmla":"*/ lFD 1 2"},{"name":"l3","fmla":"+- th2 l2 0"},{"name":"rh","fmla":"+- hd2 0 th"},{"name":"rw","fmla":"+- wd2 0 th"},{"name":"dr","fmla":"+- rw 0 rh"},{"name":"maxr","fmla":"?: dr rh rw"},{"name":"ha","fmla":"at2 maxr l3"},{"name":"aA1","fmla":"+- 19800000 0 ha"},{"name":"aD1","fmla":"+- 19800000 ha 0"},{"name":"ta11","fmla":"cos rw aA1"},{"name":"ta12","fmla":"sin rh aA1"},{"name":"bA1","fmla":"at2 ta11 ta12"},{"name":"cta1","fmla":"cos rh bA1"},{"name":"sta1","fmla":"sin rw bA1"},{"name":"ma1","fmla":"mod cta1 sta1 0"},{"name":"na1","fmla":"*/ rw rh ma1"},{"name":"dxa1","fmla":"cos na1 bA1"},{"name":"dya1","fmla":"sin na1 bA1"},{"name":"xA1","fmla":"+- hc dxa1 0"},{"name":"yA1","fmla":"+- vc dya1 0"},{"name":"td11","fmla":"cos rw aD1"},{"name":"td12","fmla":"sin rh aD1"},{"name":"bD1","fmla":"at2 td11 td12"},{"name":"ctd1","fmla":"cos rh bD1"},{"name":"std1","fmla":"sin rw bD1"},{"name":"md1","fmla":"mod ctd1 std1 0"},{"name":"nd1","fmla":"*/ rw rh md1"},{"name":"dxd1","fmla":"cos nd1 bD1"},{"name":"dyd1","fmla":"sin nd1 bD1"},{"name":"xD1","fmla":"+- hc dxd1 0"},{"name":"yD1","fmla":"+- vc dyd1 0"},{"name":"xAD1","fmla":"+- xA1 0 xD1"},{"name":"yAD1","fmla":"+- yA1 0 yD1"},{"name":"lAD1","fmla":"mod xAD1 yAD1 0"},{"name":"a1","fmla":"at2 yAD1 xAD1"},{"name":"dxF1","fmla":"sin lFD a1"},{"name":"dyF1","fmla":"cos lFD a1"},{"name":"xF1","fmla":"+- xD1 dxF1 0"},{"name":"yF1","fmla":"+- yD1 dyF1 0"},{"name":"xE1","fmla":"+- xA1 0 dxF1"},{"name":"yE1","fmla":"+- yA1 0 dyF1"},{"name":"yC1t","fmla":"sin th a1"},{"name":"xC1t","fmla":"cos th a1"},{"name":"yC1","fmla":"+- yF1 yC1t 0"},{"name":"xC1","fmla":"+- xF1 0 xC1t"},{"name":"yB1","fmla":"+- yE1 yC1t 0"},{"name":"xB1","fmla":"+- xE1 0 xC1t"},{"name":"aD6","fmla":"+- 3cd4 ha 0"},{"name":"td61","fmla":"cos rw aD6"},{"name":"td62","fmla":"sin rh aD6"},{"name":"bD6","fmla":"at2 td61 td62"},{"name":"ctd6","fmla":"cos rh bD6"},{"name":"std6","fmla":"sin rw bD6"},{"name":"md6","fmla":"mod ctd6 std6 0"},{"name":"nd6","fmla":"*/ rw rh md6"},{"name":"dxd6","fmla":"cos nd6 bD6"},{"name":"dyd6","fmla":"sin nd6 bD6"},{"name":"xD6","fmla":"+- hc dxd6 0"},{"name":"yD6","fmla":"+- vc dyd6 0"},{"name":"xA6","fmla":"+- hc 0 dxd6"},{"name":"xF6","fmla":"+- xD6 0 lFD"},{"name":"xE6","fmla":"+- xA6 lFD 0"},{"name":"yC6","fmla":"+- yD6 0 th"},{"name":"swAng1","fmla":"+- bA1 0 bD6"},{"name":"aA2","fmla":"+- 1800000 0 ha"},{"name":"aD2","fmla":"+- 1800000 ha 0"},{"name":"ta21","fmla":"cos rw aA2"},{"name":"ta22","fmla":"sin rh aA2"},{"name":"bA2","fmla":"at2 ta21 ta22"},{"name":"yA2","fmla":"+- h 0 yD1"},{"name":"td21","fmla":"cos rw aD2"},{"name":"td22","fmla":"sin rh aD2"},{"name":"bD2","fmla":"at2 td21 td22"},{"name":"yD2","fmla":"+- h 0 yA1"},{"name":"yC2","fmla":"+- h 0 yB1"},{"name":"yB2","fmla":"+- h 0 yC1"},{"name":"xB2","fmla":"val xC1"},{"name":"swAng2","fmla":"+- bA2 0 bD1"},{"name":"aD3","fmla":"+- cd4 ha 0"},{"name":"td31","fmla":"cos rw aD3"},{"name":"td32","fmla":"sin rh aD3"},{"name":"bD3","fmla":"at2 td31 td32"},{"name":"yD3","fmla":"+- h 0 yD6"},{"name":"yB3","fmla":"+- h 0 yC6"},{"name":"aD4","fmla":"+- 9000000 ha 0"},{"name":"td41","fmla":"cos rw aD4"},{"name":"td42","fmla":"sin rh aD4"},{"name":"bD4","fmla":"at2 td41 td42"},{"name":"xD4","fmla":"+- w 0 xD1"},{"name":"xC4","fmla":"+- w 0 xC1"},{"name":"xB4","fmla":"+- w 0 xB1"},{"name":"aD5","fmla":"+- 12600000 ha 0"},{"name":"td51","fmla":"cos rw aD5"},{"name":"td52","fmla":"sin rh aD5"},{"name":"bD5","fmla":"at2 td51 td52"},{"name":"xD5","fmla":"+- w 0 xA1"},{"name":"xC5","fmla":"+- w 0 xB1"},{"name":"xB5","fmla":"+- w 0 xC1"},{"name":"xCxn1","fmla":"+/ xB1 xC1 2"},{"name":"yCxn1","fmla":"+/ yB1 yC1 2"},{"name":"yCxn2","fmla":"+- b 0 yCxn1"},{"name":"xCxn4","fmla":"+/ r 0 xCxn1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xA1","y":"yA1"}]},{"c":"L","pts":[{"x":"xB1","y":"yB1"}]},{"c":"L","pts":[{"x":"xC1","y":"yC1"}]},{"c":"L","pts":[{"x":"xD1","y":"yD1"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD1","swAng":"swAng2"},{"c":"L","pts":[{"x":"xC1","y":"yB2"}]},{"c":"L","pts":[{"x":"xB1","y":"yC2"}]},{"c":"L","pts":[{"x":"xA1","y":"yD2"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD2","swAng":"swAng1"},{"c":"L","pts":[{"x":"xF6","y":"yB3"}]},{"c":"L","pts":[{"x":"xE6","y":"yB3"}]},{"c":"L","pts":[{"x":"xA6","y":"yD3"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD3","swAng":"swAng1"},{"c":"L","pts":[{"x":"xB4","y":"yC2"}]},{"c":"L","pts":[{"x":"xC4","y":"yB2"}]},{"c":"L","pts":[{"x":"xD4","y":"yA2"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD4","swAng":"swAng2"},{"c":"L","pts":[{"x":"xB5","y":"yC1"}]},{"c":"L","pts":[{"x":"xC5","y":"yB1"}]},{"c":"L","pts":[{"x":"xD5","y":"yA1"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD5","swAng":"swAng1"},{"c":"L","pts":[{"x":"xE6","y":"yC6"}]},{"c":"L","pts":[{"x":"xF6","y":"yC6"}]},{"c":"L","pts":[{"x":"xD6","y":"yD6"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD6","swAng":"swAng1"},{"c":"Z"}]}]},"gear9":{"av":[{"name":"adj1","fmla":"val 10000"},{"name":"adj2","fmla":"val 1763"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 20000"},{"name":"a2","fmla":"pin 0 adj2 2679"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"lFD","fmla":"*/ ss a2 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"l2","fmla":"*/ lFD 1 2"},{"name":"l3","fmla":"+- th2 l2 0"},{"name":"rh","fmla":"+- hd2 0 th"},{"name":"rw","fmla":"+- wd2 0 th"},{"name":"dr","fmla":"+- rw 0 rh"},{"name":"maxr","fmla":"?: dr rh rw"},{"name":"ha","fmla":"at2 maxr l3"},{"name":"aA1","fmla":"+- 18600000 0 ha"},{"name":"aD1","fmla":"+- 18600000 ha 0"},{"name":"ta11","fmla":"cos rw aA1"},{"name":"ta12","fmla":"sin rh aA1"},{"name":"bA1","fmla":"at2 ta11 ta12"},{"name":"cta1","fmla":"cos rh bA1"},{"name":"sta1","fmla":"sin rw bA1"},{"name":"ma1","fmla":"mod cta1 sta1 0"},{"name":"na1","fmla":"*/ rw rh ma1"},{"name":"dxa1","fmla":"cos na1 bA1"},{"name":"dya1","fmla":"sin na1 bA1"},{"name":"xA1","fmla":"+- hc dxa1 0"},{"name":"yA1","fmla":"+- vc dya1 0"},{"name":"td11","fmla":"cos rw aD1"},{"name":"td12","fmla":"sin rh aD1"},{"name":"bD1","fmla":"at2 td11 td12"},{"name":"ctd1","fmla":"cos rh bD1"},{"name":"std1","fmla":"sin rw bD1"},{"name":"md1","fmla":"mod ctd1 std1 0"},{"name":"nd1","fmla":"*/ rw rh md1"},{"name":"dxd1","fmla":"cos nd1 bD1"},{"name":"dyd1","fmla":"sin nd1 bD1"},{"name":"xD1","fmla":"+- hc dxd1 0"},{"name":"yD1","fmla":"+- vc dyd1 0"},{"name":"xAD1","fmla":"+- xA1 0 xD1"},{"name":"yAD1","fmla":"+- yA1 0 yD1"},{"name":"lAD1","fmla":"mod xAD1 yAD1 0"},{"name":"a1","fmla":"at2 yAD1 xAD1"},{"name":"dxF1","fmla":"sin lFD a1"},{"name":"dyF1","fmla":"cos lFD a1"},{"name":"xF1","fmla":"+- xD1 dxF1 0"},{"name":"yF1","fmla":"+- yD1 dyF1 0"},{"name":"xE1","fmla":"+- xA1 0 dxF1"},{"name":"yE1","fmla":"+- yA1 0 dyF1"},{"name":"yC1t","fmla":"sin th a1"},{"name":"xC1t","fmla":"cos th a1"},{"name":"yC1","fmla":"+- yF1 yC1t 0"},{"name":"xC1","fmla":"+- xF1 0 xC1t"},{"name":"yB1","fmla":"+- yE1 yC1t 0"},{"name":"xB1","fmla":"+- xE1 0 xC1t"},{"name":"aA2","fmla":"+- 21000000 0 ha"},{"name":"aD2","fmla":"+- 21000000 ha 0"},{"name":"ta21","fmla":"cos rw aA2"},{"name":"ta22","fmla":"sin rh aA2"},{"name":"bA2","fmla":"at2 ta21 ta22"},{"name":"cta2","fmla":"cos rh bA2"},{"name":"sta2","fmla":"sin rw bA2"},{"name":"ma2","fmla":"mod cta2 sta2 0"},{"name":"na2","fmla":"*/ rw rh ma2"},{"name":"dxa2","fmla":"cos na2 bA2"},{"name":"dya2","fmla":"sin na2 bA2"},{"name":"xA2","fmla":"+- hc dxa2 0"},{"name":"yA2","fmla":"+- vc dya2 0"},{"name":"td21","fmla":"cos rw aD2"},{"name":"td22","fmla":"sin rh aD2"},{"name":"bD2","fmla":"at2 td21 td22"},{"name":"ctd2","fmla":"cos rh bD2"},{"name":"std2","fmla":"sin rw bD2"},{"name":"md2","fmla":"mod ctd2 std2 0"},{"name":"nd2","fmla":"*/ rw rh md2"},{"name":"dxd2","fmla":"cos nd2 bD2"},{"name":"dyd2","fmla":"sin nd2 bD2"},{"name":"xD2","fmla":"+- hc dxd2 0"},{"name":"yD2","fmla":"+- vc dyd2 0"},{"name":"xAD2","fmla":"+- xA2 0 xD2"},{"name":"yAD2","fmla":"+- yA2 0 yD2"},{"name":"lAD2","fmla":"mod xAD2 yAD2 0"},{"name":"a2","fmla":"at2 yAD2 xAD2"},{"name":"dxF2","fmla":"sin lFD a2"},{"name":"dyF2","fmla":"cos lFD a2"},{"name":"xF2","fmla":"+- xD2 dxF2 0"},{"name":"yF2","fmla":"+- yD2 dyF2 0"},{"name":"xE2","fmla":"+- xA2 0 dxF2"},{"name":"yE2","fmla":"+- yA2 0 dyF2"},{"name":"yC2t","fmla":"sin th a2"},{"name":"xC2t","fmla":"cos th a2"},{"name":"yC2","fmla":"+- yF2 yC2t 0"},{"name":"xC2","fmla":"+- xF2 0 xC2t"},{"name":"yB2","fmla":"+- yE2 yC2t 0"},{"name":"xB2","fmla":"+- xE2 0 xC2t"},{"name":"swAng1","fmla":"+- bA2 0 bD1"},{"name":"aA3","fmla":"+- 1800000 0 ha"},{"name":"aD3","fmla":"+- 1800000 ha 0"},{"name":"ta31","fmla":"cos rw aA3"},{"name":"ta32","fmla":"sin rh aA3"},{"name":"bA3","fmla":"at2 ta31 ta32"},{"name":"cta3","fmla":"cos rh bA3"},{"name":"sta3","fmla":"sin rw bA3"},{"name":"ma3","fmla":"mod cta3 sta3 0"},{"name":"na3","fmla":"*/ rw rh ma3"},{"name":"dxa3","fmla":"cos na3 bA3"},{"name":"dya3","fmla":"sin na3 bA3"},{"name":"xA3","fmla":"+- hc dxa3 0"},{"name":"yA3","fmla":"+- vc dya3 0"},{"name":"td31","fmla":"cos rw aD3"},{"name":"td32","fmla":"sin rh aD3"},{"name":"bD3","fmla":"at2 td31 td32"},{"name":"ctd3","fmla":"cos rh bD3"},{"name":"std3","fmla":"sin rw bD3"},{"name":"md3","fmla":"mod ctd3 std3 0"},{"name":"nd3","fmla":"*/ rw rh md3"},{"name":"dxd3","fmla":"cos nd3 bD3"},{"name":"dyd3","fmla":"sin nd3 bD3"},{"name":"xD3","fmla":"+- hc dxd3 0"},{"name":"yD3","fmla":"+- vc dyd3 0"},{"name":"xAD3","fmla":"+- xA3 0 xD3"},{"name":"yAD3","fmla":"+- yA3 0 yD3"},{"name":"lAD3","fmla":"mod xAD3 yAD3 0"},{"name":"a3","fmla":"at2 yAD3 xAD3"},{"name":"dxF3","fmla":"sin lFD a3"},{"name":"dyF3","fmla":"cos lFD a3"},{"name":"xF3","fmla":"+- xD3 dxF3 0"},{"name":"yF3","fmla":"+- yD3 dyF3 0"},{"name":"xE3","fmla":"+- xA3 0 dxF3"},{"name":"yE3","fmla":"+- yA3 0 dyF3"},{"name":"yC3t","fmla":"sin th a3"},{"name":"xC3t","fmla":"cos th a3"},{"name":"yC3","fmla":"+- yF3 yC3t 0"},{"name":"xC3","fmla":"+- xF3 0 xC3t"},{"name":"yB3","fmla":"+- yE3 yC3t 0"},{"name":"xB3","fmla":"+- xE3 0 xC3t"},{"name":"swAng2","fmla":"+- bA3 0 bD2"},{"name":"aA4","fmla":"+- 4200000 0 ha"},{"name":"aD4","fmla":"+- 4200000 ha 0"},{"name":"ta41","fmla":"cos rw aA4"},{"name":"ta42","fmla":"sin rh aA4"},{"name":"bA4","fmla":"at2 ta41 ta42"},{"name":"cta4","fmla":"cos rh bA4"},{"name":"sta4","fmla":"sin rw bA4"},{"name":"ma4","fmla":"mod cta4 sta4 0"},{"name":"na4","fmla":"*/ rw rh ma4"},{"name":"dxa4","fmla":"cos na4 bA4"},{"name":"dya4","fmla":"sin na4 bA4"},{"name":"xA4","fmla":"+- hc dxa4 0"},{"name":"yA4","fmla":"+- vc dya4 0"},{"name":"td41","fmla":"cos rw aD4"},{"name":"td42","fmla":"sin rh aD4"},{"name":"bD4","fmla":"at2 td41 td42"},{"name":"ctd4","fmla":"cos rh bD4"},{"name":"std4","fmla":"sin rw bD4"},{"name":"md4","fmla":"mod ctd4 std4 0"},{"name":"nd4","fmla":"*/ rw rh md4"},{"name":"dxd4","fmla":"cos nd4 bD4"},{"name":"dyd4","fmla":"sin nd4 bD4"},{"name":"xD4","fmla":"+- hc dxd4 0"},{"name":"yD4","fmla":"+- vc dyd4 0"},{"name":"xAD4","fmla":"+- xA4 0 xD4"},{"name":"yAD4","fmla":"+- yA4 0 yD4"},{"name":"lAD4","fmla":"mod xAD4 yAD4 0"},{"name":"a4","fmla":"at2 yAD4 xAD4"},{"name":"dxF4","fmla":"sin lFD a4"},{"name":"dyF4","fmla":"cos lFD a4"},{"name":"xF4","fmla":"+- xD4 dxF4 0"},{"name":"yF4","fmla":"+- yD4 dyF4 0"},{"name":"xE4","fmla":"+- xA4 0 dxF4"},{"name":"yE4","fmla":"+- yA4 0 dyF4"},{"name":"yC4t","fmla":"sin th a4"},{"name":"xC4t","fmla":"cos th a4"},{"name":"yC4","fmla":"+- yF4 yC4t 0"},{"name":"xC4","fmla":"+- xF4 0 xC4t"},{"name":"yB4","fmla":"+- yE4 yC4t 0"},{"name":"xB4","fmla":"+- xE4 0 xC4t"},{"name":"swAng3","fmla":"+- bA4 0 bD3"},{"name":"aA5","fmla":"+- 6600000 0 ha"},{"name":"aD5","fmla":"+- 6600000 ha 0"},{"name":"ta51","fmla":"cos rw aA5"},{"name":"ta52","fmla":"sin rh aA5"},{"name":"bA5","fmla":"at2 ta51 ta52"},{"name":"td51","fmla":"cos rw aD5"},{"name":"td52","fmla":"sin rh aD5"},{"name":"bD5","fmla":"at2 td51 td52"},{"name":"xD5","fmla":"+- w 0 xA4"},{"name":"xC5","fmla":"+- w 0 xB4"},{"name":"xB5","fmla":"+- w 0 xC4"},{"name":"swAng4","fmla":"+- bA5 0 bD4"},{"name":"aD6","fmla":"+- 9000000 ha 0"},{"name":"td61","fmla":"cos rw aD6"},{"name":"td62","fmla":"sin rh aD6"},{"name":"bD6","fmla":"at2 td61 td62"},{"name":"xD6","fmla":"+- w 0 xA3"},{"name":"xC6","fmla":"+- w 0 xB3"},{"name":"xB6","fmla":"+- w 0 xC3"},{"name":"aD7","fmla":"+- 11400000 ha 0"},{"name":"td71","fmla":"cos rw aD7"},{"name":"td72","fmla":"sin rh aD7"},{"name":"bD7","fmla":"at2 td71 td72"},{"name":"xD7","fmla":"+- w 0 xA2"},{"name":"xC7","fmla":"+- w 0 xB2"},{"name":"xB7","fmla":"+- w 0 xC2"},{"name":"aD8","fmla":"+- 13800000 ha 0"},{"name":"td81","fmla":"cos rw aD8"},{"name":"td82","fmla":"sin rh aD8"},{"name":"bD8","fmla":"at2 td81 td82"},{"name":"xA8","fmla":"+- w 0 xD1"},{"name":"xD8","fmla":"+- w 0 xA1"},{"name":"xC8","fmla":"+- w 0 xB1"},{"name":"xB8","fmla":"+- w 0 xC1"},{"name":"aA9","fmla":"+- 3cd4 0 ha"},{"name":"aD9","fmla":"+- 3cd4 ha 0"},{"name":"td91","fmla":"cos rw aD9"},{"name":"td92","fmla":"sin rh aD9"},{"name":"bD9","fmla":"at2 td91 td92"},{"name":"ctd9","fmla":"cos rh bD9"},{"name":"std9","fmla":"sin rw bD9"},{"name":"md9","fmla":"mod ctd9 std9 0"},{"name":"nd9","fmla":"*/ rw rh md9"},{"name":"dxd9","fmla":"cos nd9 bD9"},{"name":"dyd9","fmla":"sin nd9 bD9"},{"name":"xD9","fmla":"+- hc dxd9 0"},{"name":"yD9","fmla":"+- vc dyd9 0"},{"name":"ta91","fmla":"cos rw aA9"},{"name":"ta92","fmla":"sin rh aA9"},{"name":"bA9","fmla":"at2 ta91 ta92"},{"name":"xA9","fmla":"+- hc 0 dxd9"},{"name":"xF9","fmla":"+- xD9 0 lFD"},{"name":"xE9","fmla":"+- xA9 lFD 0"},{"name":"yC9","fmla":"+- yD9 0 th"},{"name":"swAng5","fmla":"+- bA9 0 bD8"},{"name":"xCxn1","fmla":"+/ xB1 xC1 2"},{"name":"yCxn1","fmla":"+/ yB1 yC1 2"},{"name":"xCxn2","fmla":"+/ xB2 xC2 2"},{"name":"yCxn2","fmla":"+/ yB2 yC2 2"},{"name":"xCxn3","fmla":"+/ xB3 xC3 2"},{"name":"yCxn3","fmla":"+/ yB3 yC3 2"},{"name":"xCxn4","fmla":"+/ xB4 xC4 2"},{"name":"yCxn4","fmla":"+/ yB4 yC4 2"},{"name":"xCxn5","fmla":"+/ r 0 xCxn4"},{"name":"xCxn6","fmla":"+/ r 0 xCxn3"},{"name":"xCxn7","fmla":"+/ r 0 xCxn2"},{"name":"xCxn8","fmla":"+/ r 0 xCxn1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xA1","y":"yA1"}]},{"c":"L","pts":[{"x":"xB1","y":"yB1"}]},{"c":"L","pts":[{"x":"xC1","y":"yC1"}]},{"c":"L","pts":[{"x":"xD1","y":"yD1"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD1","swAng":"swAng1"},{"c":"L","pts":[{"x":"xB2","y":"yB2"}]},{"c":"L","pts":[{"x":"xC2","y":"yC2"}]},{"c":"L","pts":[{"x":"xD2","y":"yD2"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD2","swAng":"swAng2"},{"c":"L","pts":[{"x":"xB3","y":"yB3"}]},{"c":"L","pts":[{"x":"xC3","y":"yC3"}]},{"c":"L","pts":[{"x":"xD3","y":"yD3"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD3","swAng":"swAng3"},{"c":"L","pts":[{"x":"xB4","y":"yB4"}]},{"c":"L","pts":[{"x":"xC4","y":"yC4"}]},{"c":"L","pts":[{"x":"xD4","y":"yD4"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD4","swAng":"swAng4"},{"c":"L","pts":[{"x":"xB5","y":"yC4"}]},{"c":"L","pts":[{"x":"xC5","y":"yB4"}]},{"c":"L","pts":[{"x":"xD5","y":"yA4"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD5","swAng":"swAng3"},{"c":"L","pts":[{"x":"xB6","y":"yC3"}]},{"c":"L","pts":[{"x":"xC6","y":"yB3"}]},{"c":"L","pts":[{"x":"xD6","y":"yA3"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD6","swAng":"swAng2"},{"c":"L","pts":[{"x":"xB7","y":"yC2"}]},{"c":"L","pts":[{"x":"xC7","y":"yB2"}]},{"c":"L","pts":[{"x":"xD7","y":"yA2"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD7","swAng":"swAng1"},{"c":"L","pts":[{"x":"xB8","y":"yC1"}]},{"c":"L","pts":[{"x":"xC8","y":"yB1"}]},{"c":"L","pts":[{"x":"xD8","y":"yA1"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD8","swAng":"swAng5"},{"c":"L","pts":[{"x":"xE9","y":"yC9"}]},{"c":"L","pts":[{"x":"xF9","y":"yC9"}]},{"c":"L","pts":[{"x":"xD9","y":"yD9"}]},{"c":"A","wR":"rw","hR":"rh","stAng":"bD9","swAng":"swAng5"},{"c":"Z"}]}]},"halfFrame":{"av":[{"name":"adj1","fmla":"val 33333"},{"name":"adj2","fmla":"val 33333"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"x1","fmla":"*/ ss a2 100000"},{"name":"g1","fmla":"*/ h x1 w"},{"name":"g2","fmla":"+- h 0 g1"},{"name":"maxAdj1","fmla":"*/ 100000 g2 ss"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"y1","fmla":"*/ ss a1 100000"},{"name":"dx2","fmla":"*/ y1 w h"},{"name":"x2","fmla":"+- r 0 dx2"},{"name":"dy2","fmla":"*/ x1 h w"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"cx1","fmla":"*/ x1 1 2"},{"name":"cy1","fmla":"+/ y2 b 2"},{"name":"cx2","fmla":"+/ x2 r 2"},{"name":"cy2","fmla":"*/ y1 1 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"heart":{"gd":[{"name":"dx1","fmla":"*/ w 49 48"},{"name":"dx2","fmla":"*/ w 10 48"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- t 0 hd3"},{"name":"il","fmla":"*/ w 1 6"},{"name":"ir","fmla":"*/ w 5 6"},{"name":"ib","fmla":"*/ h 2 3"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"hc","y":"hd4"}]},{"c":"C","pts":[{"x":"x3","y":"y1"},{"x":"x4","y":"hd4"},{"x":"hc","y":"b"}]},{"c":"C","pts":[{"x":"x1","y":"hd4"},{"x":"x2","y":"y1"},{"x":"hc","y":"hd4"}]},{"c":"Z"}]}]},"heptagon":{"av":[{"name":"hf","fmla":"val 102572"},{"name":"vf","fmla":"val 105210"}],"gd":[{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"svc","fmla":"*/ vc  vf 100000"},{"name":"dx1","fmla":"*/ swd2 97493 100000"},{"name":"dx2","fmla":"*/ swd2 78183 100000"},{"name":"dx3","fmla":"*/ swd2 43388 100000"},{"name":"dy1","fmla":"*/ shd2 62349 100000"},{"name":"dy2","fmla":"*/ shd2 22252 100000"},{"name":"dy3","fmla":"*/ shd2 90097 100000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc dx3 0"},{"name":"x5","fmla":"+- hc dx2 0"},{"name":"x6","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- svc 0 dy1"},{"name":"y2","fmla":"+- svc dy2 0"},{"name":"y3","fmla":"+- svc dy3 0"},{"name":"ib","fmla":"+- b 0 y1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"Z"}]}]},"hexagon":{"av":[{"name":"adj","fmla":"val 25000"},{"name":"vf","fmla":"val 115470"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 w ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"dy1","fmla":"sin shd2 3600000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"q1","fmla":"*/ maxAdj -1 2"},{"name":"q2","fmla":"+- a q1 0"},{"name":"q3","fmla":"?: q2 4 2"},{"name":"q4","fmla":"?: q2 3 2"},{"name":"q5","fmla":"?: q2 q1 0"},{"name":"q6","fmla":"+/ a q5 q1"},{"name":"q7","fmla":"*/ q6 q4 -1"},{"name":"q8","fmla":"+- q3 q7 0"},{"name":"il","fmla":"*/ w q8 24"},{"name":"it","fmla":"*/ h q8 24"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 it"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"}]}]},"homePlate":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"maxAdj","fmla":"*/ 100000 w ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"dx1","fmla":"*/ ss a 100000"},{"name":"x1","fmla":"+- r 0 dx1"},{"name":"ir","fmla":"+/ x1 r 2"},{"name":"x2","fmla":"*/ x1 1 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"horizontalScroll":{"av":[{"name":"adj","fmla":"val 12500"}],"gd":[{"name":"a","fmla":"pin 0 adj 25000"},{"name":"ch","fmla":"*/ ss a 100000"},{"name":"ch2","fmla":"*/ ch 1 2"},{"name":"ch4","fmla":"*/ ch 1 4"},{"name":"y3","fmla":"+- ch ch2 0"},{"name":"y4","fmla":"+- ch ch 0"},{"name":"y6","fmla":"+- b 0 ch"},{"name":"y7","fmla":"+- b 0 ch2"},{"name":"y5","fmla":"+- y6 0 ch2"},{"name":"x3","fmla":"+- r 0 ch"},{"name":"x4","fmla":"+- r 0 ch2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x4","y":"ch2"}]},{"c":"A","wR":"ch4","hR":"ch4","stAng":"0","swAng":"cd2"},{"c":"L","pts":[{"x":"x3","y":"ch"}]},{"c":"L","pts":[{"x":"ch2","y":"ch"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"l","y":"y7"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd2","swAng":"-10800000"},{"c":"L","pts":[{"x":"ch","y":"y6"}]},{"c":"L","pts":[{"x":"x4","y":"y6"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"Z"},{"c":"M","pts":[{"x":"ch2","y":"y4"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"0","swAng":"-10800000"},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"ch2","y":"y4"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"0","swAng":"-10800000"},{"c":"Z"},{"c":"M","pts":[{"x":"x4","y":"ch"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-16200000"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd2","swAng":"-10800000"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"y3"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"ch"}]},{"c":"L","pts":[{"x":"x3","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd2","swAng":"cd2"},{"c":"L","pts":[{"x":"r","y":"y5"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"ch","y":"y6"}]},{"c":"L","pts":[{"x":"ch","y":"y7"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd2"},{"c":"Z"},{"c":"M","pts":[{"x":"x3","y":"ch"}]},{"c":"L","pts":[{"x":"x4","y":"ch"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"M","pts":[{"x":"x4","y":"ch"}]},{"c":"L","pts":[{"x":"x4","y":"ch2"}]},{"c":"A","wR":"ch4","hR":"ch4","stAng":"0","swAng":"cd2"},{"c":"M","pts":[{"x":"ch2","y":"y4"}]},{"c":"L","pts":[{"x":"ch2","y":"y3"}]},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd2","swAng":"cd2"},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd2"},{"c":"M","pts":[{"x":"ch","y":"y3"}]},{"c":"L","pts":[{"x":"ch","y":"y6"}]}]}]},"irregularSeal1":{"gd":[{"name":"x5","fmla":"*/ w 4627 21600"},{"name":"x12","fmla":"*/ w 8485 21600"},{"name":"x21","fmla":"*/ w 16702 21600"},{"name":"x24","fmla":"*/ w 14522 21600"},{"name":"y3","fmla":"*/ h 6320 21600"},{"name":"y6","fmla":"*/ h 8615 21600"},{"name":"y9","fmla":"*/ h 13937 21600"},{"name":"y18","fmla":"*/ h 13290 21600"}],"paths":[{"w":21600,"h":21600,"cmds":[{"c":"M","pts":[{"x":"10800","y":"5800"}]},{"c":"L","pts":[{"x":"14522","y":"0"}]},{"c":"L","pts":[{"x":"14155","y":"5325"}]},{"c":"L","pts":[{"x":"18380","y":"4457"}]},{"c":"L","pts":[{"x":"16702","y":"7315"}]},{"c":"L","pts":[{"x":"21097","y":"8137"}]},{"c":"L","pts":[{"x":"17607","y":"10475"}]},{"c":"L","pts":[{"x":"21600","y":"13290"}]},{"c":"L","pts":[{"x":"16837","y":"12942"}]},{"c":"L","pts":[{"x":"18145","y":"18095"}]},{"c":"L","pts":[{"x":"14020","y":"14457"}]},{"c":"L","pts":[{"x":"13247","y":"19737"}]},{"c":"L","pts":[{"x":"10532","y":"14935"}]},{"c":"L","pts":[{"x":"8485","y":"21600"}]},{"c":"L","pts":[{"x":"7715","y":"15627"}]},{"c":"L","pts":[{"x":"4762","y":"17617"}]},{"c":"L","pts":[{"x":"5667","y":"13937"}]},{"c":"L","pts":[{"x":"135","y":"14587"}]},{"c":"L","pts":[{"x":"3722","y":"11775"}]},{"c":"L","pts":[{"x":"0","y":"8615"}]},{"c":"L","pts":[{"x":"4627","y":"7617"}]},{"c":"L","pts":[{"x":"370","y":"2295"}]},{"c":"L","pts":[{"x":"7312","y":"6320"}]},{"c":"L","pts":[{"x":"8352","y":"2295"}]},{"c":"Z"}]}]},"irregularSeal2":{"gd":[{"name":"x2","fmla":"*/ w 9722 21600"},{"name":"x5","fmla":"*/ w 5372 21600"},{"name":"x16","fmla":"*/ w 11612 21600"},{"name":"x19","fmla":"*/ w 14640 21600"},{"name":"y2","fmla":"*/ h 1887 21600"},{"name":"y3","fmla":"*/ h 6382 21600"},{"name":"y8","fmla":"*/ h 12877 21600"},{"name":"y14","fmla":"*/ h 19712 21600"},{"name":"y16","fmla":"*/ h 18842 21600"},{"name":"y17","fmla":"*/ h 15935 21600"},{"name":"y24","fmla":"*/ h 6645 21600"}],"paths":[{"w":21600,"h":21600,"cmds":[{"c":"M","pts":[{"x":"11462","y":"4342"}]},{"c":"L","pts":[{"x":"14790","y":"0"}]},{"c":"L","pts":[{"x":"14525","y":"5777"}]},{"c":"L","pts":[{"x":"18007","y":"3172"}]},{"c":"L","pts":[{"x":"16380","y":"6532"}]},{"c":"L","pts":[{"x":"21600","y":"6645"}]},{"c":"L","pts":[{"x":"16985","y":"9402"}]},{"c":"L","pts":[{"x":"18270","y":"11290"}]},{"c":"L","pts":[{"x":"16380","y":"12310"}]},{"c":"L","pts":[{"x":"18877","y":"15632"}]},{"c":"L","pts":[{"x":"14640","y":"14350"}]},{"c":"L","pts":[{"x":"14942","y":"17370"}]},{"c":"L","pts":[{"x":"12180","y":"15935"}]},{"c":"L","pts":[{"x":"11612","y":"18842"}]},{"c":"L","pts":[{"x":"9872","y":"17370"}]},{"c":"L","pts":[{"x":"8700","y":"19712"}]},{"c":"L","pts":[{"x":"7527","y":"18125"}]},{"c":"L","pts":[{"x":"4917","y":"21600"}]},{"c":"L","pts":[{"x":"4805","y":"18240"}]},{"c":"L","pts":[{"x":"1285","y":"17825"}]},{"c":"L","pts":[{"x":"3330","y":"15370"}]},{"c":"L","pts":[{"x":"0","y":"12877"}]},{"c":"L","pts":[{"x":"3935","y":"11592"}]},{"c":"L","pts":[{"x":"1172","y":"8270"}]},{"c":"L","pts":[{"x":"5372","y":"7817"}]},{"c":"L","pts":[{"x":"4502","y":"3625"}]},{"c":"L","pts":[{"x":"8550","y":"6382"}]},{"c":"L","pts":[{"x":"9722","y":"1887"}]},{"c":"Z"}]}]},"leftArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 w ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- l dx2 0"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"dx1","fmla":"*/ y1 dx2 hd2"},{"name":"x1","fmla":"+- x2  0 dx1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"Z"}]}]},"leftArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 64977"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 100000 w ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss w"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dy1","fmla":"*/ ss a2 100000"},{"name":"dy2","fmla":"*/ ss a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"x1","fmla":"*/ ss a3 100000"},{"name":"dx2","fmla":"*/ w a4 100000"},{"name":"x2","fmla":"+- r 0 dx2"},{"name":"x3","fmla":"+/ x2 r 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"Z"}]}]},"leftBrace":{"av":[{"name":"adj1","fmla":"val 8333"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 100000"},{"name":"q1","fmla":"+- 100000 0 a2"},{"name":"q2","fmla":"min q1 a2"},{"name":"q3","fmla":"*/ q2 1 2"},{"name":"maxAdj1","fmla":"*/ q3 h ss"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"y1","fmla":"*/ ss a1 100000"},{"name":"y3","fmla":"*/ h a2 100000"},{"name":"y4","fmla":"+- y3 y1 0"},{"name":"dx1","fmla":"cos wd2 2700000"},{"name":"dy1","fmla":"sin y1 2700000"},{"name":"il","fmla":"+- r 0 dx1"},{"name":"it","fmla":"+- y1 0 dy1"},{"name":"ib","fmla":"+- b dy1 y1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"hc","y":"y4"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"-5400000"},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"y1"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"hc","y":"y4"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"-5400000"},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"y1"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"cd4"}]}]},"leftBracket":{"av":[{"name":"adj","fmla":"val 8333"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 h ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"y1","fmla":"*/ ss a 100000"},{"name":"y2","fmla":"+- b 0 y1"},{"name":"dx1","fmla":"cos w 2700000"},{"name":"dy1","fmla":"sin y1 2700000"},{"name":"il","fmla":"+- r 0 dx1"},{"name":"it","fmla":"+- y1 0 dy1"},{"name":"ib","fmla":"+- b dy1 y1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"A","wR":"w","hR":"y1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"w","hR":"y1","stAng":"cd2","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"A","wR":"w","hR":"y1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"w","hR":"y1","stAng":"cd2","swAng":"cd4"}]}]},"leftCircularArrow":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val -1142319"},{"name":"adj3","fmla":"val 1142319"},{"name":"adj4","fmla":"val 10800000"},{"name":"adj5","fmla":"val 12500"}],"gd":[{"name":"a5","fmla":"pin 0 adj5 25000"},{"name":"maxAdj1","fmla":"*/ a5 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"enAng","fmla":"pin 1 adj3 21599999"},{"name":"stAng","fmla":"pin 0 adj4 21599999"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"thh","fmla":"*/ ss a5 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"rw1","fmla":"+- wd2 th2 thh"},{"name":"rh1","fmla":"+- hd2 th2 thh"},{"name":"rw2","fmla":"+- rw1 0 th"},{"name":"rh2","fmla":"+- rh1 0 th"},{"name":"rw3","fmla":"+- rw2 th2 0"},{"name":"rh3","fmla":"+- rh2 th2 0"},{"name":"wtH","fmla":"sin rw3 enAng"},{"name":"htH","fmla":"cos rh3 enAng"},{"name":"dxH","fmla":"cat2 rw3 htH wtH"},{"name":"dyH","fmla":"sat2 rh3 htH wtH"},{"name":"xH","fmla":"+- hc dxH 0"},{"name":"yH","fmla":"+- vc dyH 0"},{"name":"rI","fmla":"min rw2 rh2"},{"name":"u1","fmla":"*/ dxH dxH 1"},{"name":"u2","fmla":"*/ dyH dyH 1"},{"name":"u3","fmla":"*/ rI rI 1"},{"name":"u4","fmla":"+- u1 0 u3"},{"name":"u5","fmla":"+- u2 0 u3"},{"name":"u6","fmla":"*/ u4 u5 u1"},{"name":"u7","fmla":"*/ u6 1 u2"},{"name":"u8","fmla":"+- 1 0 u7"},{"name":"u9","fmla":"sqrt u8"},{"name":"u10","fmla":"*/ u4 1 dxH"},{"name":"u11","fmla":"*/ u10 1 dyH"},{"name":"u12","fmla":"+/ 1 u9 u11"},{"name":"u13","fmla":"at2 1 u12"},{"name":"u14","fmla":"+- u13 21600000 0"},{"name":"u15","fmla":"?: u13 u13 u14"},{"name":"u16","fmla":"+- u15 0 enAng"},{"name":"u17","fmla":"+- u16 21600000 0"},{"name":"u18","fmla":"?: u16 u16 u17"},{"name":"u19","fmla":"+- u18 0 cd2"},{"name":"u20","fmla":"+- u18 0 21600000"},{"name":"u21","fmla":"?: u19 u20 u18"},{"name":"u22","fmla":"abs u21"},{"name":"minAng","fmla":"*/ u22 -1 1"},{"name":"u23","fmla":"abs adj2"},{"name":"a2","fmla":"*/ u23 -1 1"},{"name":"aAng","fmla":"pin minAng a2 0"},{"name":"ptAng","fmla":"+- enAng aAng 0"},{"name":"wtA","fmla":"sin rw3 ptAng"},{"name":"htA","fmla":"cos rh3 ptAng"},{"name":"dxA","fmla":"cat2 rw3 htA wtA"},{"name":"dyA","fmla":"sat2 rh3 htA wtA"},{"name":"xA","fmla":"+- hc dxA 0"},{"name":"yA","fmla":"+- vc dyA 0"},{"name":"wtE","fmla":"sin rw1 stAng"},{"name":"htE","fmla":"cos rh1 stAng"},{"name":"dxE","fmla":"cat2 rw1 htE wtE"},{"name":"dyE","fmla":"sat2 rh1 htE wtE"},{"name":"xE","fmla":"+- hc dxE 0"},{"name":"yE","fmla":"+- vc dyE 0"},{"name":"wtD","fmla":"sin rw2 stAng"},{"name":"htD","fmla":"cos rh2 stAng"},{"name":"dxD","fmla":"cat2 rw2 htD wtD"},{"name":"dyD","fmla":"sat2 rh2 htD wtD"},{"name":"xD","fmla":"+- hc dxD 0"},{"name":"yD","fmla":"+- vc dyD 0"},{"name":"dxG","fmla":"cos thh ptAng"},{"name":"dyG","fmla":"sin thh ptAng"},{"name":"xG","fmla":"+- xH dxG 0"},{"name":"yG","fmla":"+- yH dyG 0"},{"name":"dxB","fmla":"cos thh ptAng"},{"name":"dyB","fmla":"sin thh ptAng"},{"name":"xB","fmla":"+- xH 0 dxB 0"},{"name":"yB","fmla":"+- yH 0 dyB 0"},{"name":"sx1","fmla":"+- xB 0 hc"},{"name":"sy1","fmla":"+- yB 0 vc"},{"name":"sx2","fmla":"+- xG 0 hc"},{"name":"sy2","fmla":"+- yG 0 vc"},{"name":"rO","fmla":"min rw1 rh1"},{"name":"x1O","fmla":"*/ sx1 rO rw1"},{"name":"y1O","fmla":"*/ sy1 rO rh1"},{"name":"x2O","fmla":"*/ sx2 rO rw1"},{"name":"y2O","fmla":"*/ sy2 rO rh1"},{"name":"dxO","fmla":"+- x2O 0 x1O"},{"name":"dyO","fmla":"+- y2O 0 y1O"},{"name":"dO","fmla":"mod dxO dyO 0"},{"name":"q1","fmla":"*/ x1O y2O 1"},{"name":"q2","fmla":"*/ x2O y1O 1"},{"name":"DO","fmla":"+- q1 0 q2"},{"name":"q3","fmla":"*/ rO rO 1"},{"name":"q4","fmla":"*/ dO dO 1"},{"name":"q5","fmla":"*/ q3 q4 1"},{"name":"q6","fmla":"*/ DO DO 1"},{"name":"q7","fmla":"+- q5 0 q6"},{"name":"q8","fmla":"max q7 0"},{"name":"sdelO","fmla":"sqrt q8"},{"name":"ndyO","fmla":"*/ dyO -1 1"},{"name":"sdyO","fmla":"?: ndyO -1 1"},{"name":"q9","fmla":"*/ sdyO dxO 1"},{"name":"q10","fmla":"*/ q9 sdelO 1"},{"name":"q11","fmla":"*/ DO dyO 1"},{"name":"dxF1","fmla":"+/ q11 q10 q4"},{"name":"q12","fmla":"+- q11 0 q10"},{"name":"dxF2","fmla":"*/ q12 1 q4"},{"name":"adyO","fmla":"abs dyO"},{"name":"q13","fmla":"*/ adyO sdelO 1"},{"name":"q14","fmla":"*/ DO dxO -1"},{"name":"dyF1","fmla":"+/ q14 q13 q4"},{"name":"q15","fmla":"+- q14 0 q13"},{"name":"dyF2","fmla":"*/ q15 1 q4"},{"name":"q16","fmla":"+- x2O 0 dxF1"},{"name":"q17","fmla":"+- x2O 0 dxF2"},{"name":"q18","fmla":"+- y2O 0 dyF1"},{"name":"q19","fmla":"+- y2O 0 dyF2"},{"name":"q20","fmla":"mod q16 q18 0"},{"name":"q21","fmla":"mod q17 q19 0"},{"name":"q22","fmla":"+- q21 0 q20"},{"name":"dxF","fmla":"?: q22 dxF1 dxF2"},{"name":"dyF","fmla":"?: q22 dyF1 dyF2"},{"name":"sdxF","fmla":"*/ dxF rw1 rO"},{"name":"sdyF","fmla":"*/ dyF rh1 rO"},{"name":"xF","fmla":"+- hc sdxF 0"},{"name":"yF","fmla":"+- vc sdyF 0"},{"name":"x1I","fmla":"*/ sx1 rI rw2"},{"name":"y1I","fmla":"*/ sy1 rI rh2"},{"name":"x2I","fmla":"*/ sx2 rI rw2"},{"name":"y2I","fmla":"*/ sy2 rI rh2"},{"name":"dxI","fmla":"+- x2I 0 x1I"},{"name":"dyI","fmla":"+- y2I 0 y1I"},{"name":"dI","fmla":"mod dxI dyI 0"},{"name":"v1","fmla":"*/ x1I y2I 1"},{"name":"v2","fmla":"*/ x2I y1I 1"},{"name":"DI","fmla":"+- v1 0 v2"},{"name":"v3","fmla":"*/ rI rI 1"},{"name":"v4","fmla":"*/ dI dI 1"},{"name":"v5","fmla":"*/ v3 v4 1"},{"name":"v6","fmla":"*/ DI DI 1"},{"name":"v7","fmla":"+- v5 0 v6"},{"name":"v8","fmla":"max v7 0"},{"name":"sdelI","fmla":"sqrt v8"},{"name":"v9","fmla":"*/ sdyO dxI 1"},{"name":"v10","fmla":"*/ v9 sdelI 1"},{"name":"v11","fmla":"*/ DI dyI 1"},{"name":"dxC1","fmla":"+/ v11 v10 v4"},{"name":"v12","fmla":"+- v11 0 v10"},{"name":"dxC2","fmla":"*/ v12 1 v4"},{"name":"adyI","fmla":"abs dyI"},{"name":"v13","fmla":"*/ adyI sdelI 1"},{"name":"v14","fmla":"*/ DI dxI -1"},{"name":"dyC1","fmla":"+/ v14 v13 v4"},{"name":"v15","fmla":"+- v14 0 v13"},{"name":"dyC2","fmla":"*/ v15 1 v4"},{"name":"v16","fmla":"+- x1I 0 dxC1"},{"name":"v17","fmla":"+- x1I 0 dxC2"},{"name":"v18","fmla":"+- y1I 0 dyC1"},{"name":"v19","fmla":"+- y1I 0 dyC2"},{"name":"v20","fmla":"mod v16 v18 0"},{"name":"v21","fmla":"mod v17 v19 0"},{"name":"v22","fmla":"+- v21 0 v20"},{"name":"dxC","fmla":"?: v22 dxC1 dxC2"},{"name":"dyC","fmla":"?: v22 dyC1 dyC2"},{"name":"sdxC","fmla":"*/ dxC rw2 rI"},{"name":"sdyC","fmla":"*/ dyC rh2 rI"},{"name":"xC","fmla":"+- hc sdxC 0"},{"name":"yC","fmla":"+- vc sdyC 0"},{"name":"ist0","fmla":"at2 sdxC sdyC"},{"name":"ist1","fmla":"+- ist0 21600000 0"},{"name":"istAng0","fmla":"?: ist0 ist0 ist1"},{"name":"isw1","fmla":"+- stAng 0 istAng0"},{"name":"isw2","fmla":"+- isw1 21600000 0"},{"name":"iswAng0","fmla":"?: isw1 isw1 isw2"},{"name":"istAng","fmla":"+- istAng0 iswAng0 0"},{"name":"iswAng","fmla":"+- 0 0 iswAng0"},{"name":"p1","fmla":"+- xF 0 xC"},{"name":"p2","fmla":"+- yF 0 yC"},{"name":"p3","fmla":"mod p1 p2 0"},{"name":"p4","fmla":"*/ p3 1 2"},{"name":"p5","fmla":"+- p4 0 thh"},{"name":"xGp","fmla":"?: p5 xF xG"},{"name":"yGp","fmla":"?: p5 yF yG"},{"name":"xBp","fmla":"?: p5 xC xB"},{"name":"yBp","fmla":"?: p5 yC yB"},{"name":"en0","fmla":"at2 sdxF sdyF"},{"name":"en1","fmla":"+- en0 21600000 0"},{"name":"en2","fmla":"?: en0 en0 en1"},{"name":"sw0","fmla":"+- en2 0 stAng"},{"name":"sw1","fmla":"+- sw0 0 21600000"},{"name":"swAng","fmla":"?: sw0 sw1 sw0"},{"name":"stAng0","fmla":"+- stAng swAng 0"},{"name":"swAng0","fmla":"+- 0 0 swAng"},{"name":"wtI","fmla":"sin rw3 stAng"},{"name":"htI","fmla":"cos rh3 stAng"},{"name":"dxI","fmla":"cat2 rw3 htI wtI"},{"name":"dyI","fmla":"sat2 rh3 htI wtI"},{"name":"xI","fmla":"+- hc dxI 0"},{"name":"yI","fmla":"+- vc dyI 0"},{"name":"aI","fmla":"+- stAng cd4 0"},{"name":"aA","fmla":"+- ptAng 0 cd4"},{"name":"aB","fmla":"+- ptAng cd2 0"},{"name":"idx","fmla":"cos rw1 2700000"},{"name":"idy","fmla":"sin rh1 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xE","y":"yE"}]},{"c":"L","pts":[{"x":"xD","y":"yD"}]},{"c":"A","wR":"rw2","hR":"rh2","stAng":"istAng","swAng":"iswAng"},{"c":"L","pts":[{"x":"xBp","y":"yBp"}]},{"c":"L","pts":[{"x":"xA","y":"yA"}]},{"c":"L","pts":[{"x":"xGp","y":"yGp"}]},{"c":"L","pts":[{"x":"xF","y":"yF"}]},{"c":"A","wR":"rw1","hR":"rh1","stAng":"stAng0","swAng":"swAng0"},{"c":"Z"}]}]},"leftRightArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"x2","fmla":"*/ ss a2 100000"},{"name":"x3","fmla":"+- r 0 x2"},{"name":"dy","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- vc 0 dy"},{"name":"y2","fmla":"+- vc dy 0"},{"name":"dx1","fmla":"*/ y1 x2 hd2"},{"name":"x1","fmla":"+- x2 0 dx1"},{"name":"x4","fmla":"+- x3 dx1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"Z"}]}]},"leftRightArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 48123"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 50000 w ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss wd2"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dy1","fmla":"*/ ss a2 100000"},{"name":"dy2","fmla":"*/ ss a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"x1","fmla":"*/ ss a3 100000"},{"name":"x4","fmla":"+- r 0 x1"},{"name":"dx2","fmla":"*/ w a4 200000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"Z"}]}]},"leftRightCircularArrow":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val 1142319"},{"name":"adj3","fmla":"val 20457681"},{"name":"adj4","fmla":"val 11942319"},{"name":"adj5","fmla":"val 12500"}],"gd":[{"name":"a5","fmla":"pin 0 adj5 25000"},{"name":"maxAdj1","fmla":"*/ a5 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"enAng","fmla":"pin 1 adj3 21599999"},{"name":"stAng","fmla":"pin 0 adj4 21599999"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"thh","fmla":"*/ ss a5 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"rw1","fmla":"+- wd2 th2 thh"},{"name":"rh1","fmla":"+- hd2 th2 thh"},{"name":"rw2","fmla":"+- rw1 0 th"},{"name":"rh2","fmla":"+- rh1 0 th"},{"name":"rw3","fmla":"+- rw2 th2 0"},{"name":"rh3","fmla":"+- rh2 th2 0"},{"name":"wtH","fmla":"sin rw3 enAng"},{"name":"htH","fmla":"cos rh3 enAng"},{"name":"dxH","fmla":"cat2 rw3 htH wtH"},{"name":"dyH","fmla":"sat2 rh3 htH wtH"},{"name":"xH","fmla":"+- hc dxH 0"},{"name":"yH","fmla":"+- vc dyH 0"},{"name":"rI","fmla":"min rw2 rh2"},{"name":"u1","fmla":"*/ dxH dxH 1"},{"name":"u2","fmla":"*/ dyH dyH 1"},{"name":"u3","fmla":"*/ rI rI 1"},{"name":"u4","fmla":"+- u1 0 u3"},{"name":"u5","fmla":"+- u2 0 u3"},{"name":"u6","fmla":"*/ u4 u5 u1"},{"name":"u7","fmla":"*/ u6 1 u2"},{"name":"u8","fmla":"+- 1 0 u7"},{"name":"u9","fmla":"sqrt u8"},{"name":"u10","fmla":"*/ u4 1 dxH"},{"name":"u11","fmla":"*/ u10 1 dyH"},{"name":"u12","fmla":"+/ 1 u9 u11"},{"name":"u13","fmla":"at2 1 u12"},{"name":"u14","fmla":"+- u13 21600000 0"},{"name":"u15","fmla":"?: u13 u13 u14"},{"name":"u16","fmla":"+- u15 0 enAng"},{"name":"u17","fmla":"+- u16 21600000 0"},{"name":"u18","fmla":"?: u16 u16 u17"},{"name":"u19","fmla":"+- u18 0 cd2"},{"name":"u20","fmla":"+- u18 0 21600000"},{"name":"u21","fmla":"?: u19 u20 u18"},{"name":"maxAng","fmla":"abs u21"},{"name":"aAng","fmla":"pin 0 adj2 maxAng"},{"name":"ptAng","fmla":"+- enAng aAng 0"},{"name":"wtA","fmla":"sin rw3 ptAng"},{"name":"htA","fmla":"cos rh3 ptAng"},{"name":"dxA","fmla":"cat2 rw3 htA wtA"},{"name":"dyA","fmla":"sat2 rh3 htA wtA"},{"name":"xA","fmla":"+- hc dxA 0"},{"name":"yA","fmla":"+- vc dyA 0"},{"name":"dxG","fmla":"cos thh ptAng"},{"name":"dyG","fmla":"sin thh ptAng"},{"name":"xG","fmla":"+- xH dxG 0"},{"name":"yG","fmla":"+- yH dyG 0"},{"name":"dxB","fmla":"cos thh ptAng"},{"name":"dyB","fmla":"sin thh ptAng"},{"name":"xB","fmla":"+- xH 0 dxB 0"},{"name":"yB","fmla":"+- yH 0 dyB 0"},{"name":"sx1","fmla":"+- xB 0 hc"},{"name":"sy1","fmla":"+- yB 0 vc"},{"name":"sx2","fmla":"+- xG 0 hc"},{"name":"sy2","fmla":"+- yG 0 vc"},{"name":"rO","fmla":"min rw1 rh1"},{"name":"x1O","fmla":"*/ sx1 rO rw1"},{"name":"y1O","fmla":"*/ sy1 rO rh1"},{"name":"x2O","fmla":"*/ sx2 rO rw1"},{"name":"y2O","fmla":"*/ sy2 rO rh1"},{"name":"dxO","fmla":"+- x2O 0 x1O"},{"name":"dyO","fmla":"+- y2O 0 y1O"},{"name":"dO","fmla":"mod dxO dyO 0"},{"name":"q1","fmla":"*/ x1O y2O 1"},{"name":"q2","fmla":"*/ x2O y1O 1"},{"name":"DO","fmla":"+- q1 0 q2"},{"name":"q3","fmla":"*/ rO rO 1"},{"name":"q4","fmla":"*/ dO dO 1"},{"name":"q5","fmla":"*/ q3 q4 1"},{"name":"q6","fmla":"*/ DO DO 1"},{"name":"q7","fmla":"+- q5 0 q6"},{"name":"q8","fmla":"max q7 0"},{"name":"sdelO","fmla":"sqrt q8"},{"name":"ndyO","fmla":"*/ dyO -1 1"},{"name":"sdyO","fmla":"?: ndyO -1 1"},{"name":"q9","fmla":"*/ sdyO dxO 1"},{"name":"q10","fmla":"*/ q9 sdelO 1"},{"name":"q11","fmla":"*/ DO dyO 1"},{"name":"dxF1","fmla":"+/ q11 q10 q4"},{"name":"q12","fmla":"+- q11 0 q10"},{"name":"dxF2","fmla":"*/ q12 1 q4"},{"name":"adyO","fmla":"abs dyO"},{"name":"q13","fmla":"*/ adyO sdelO 1"},{"name":"q14","fmla":"*/ DO dxO -1"},{"name":"dyF1","fmla":"+/ q14 q13 q4"},{"name":"q15","fmla":"+- q14 0 q13"},{"name":"dyF2","fmla":"*/ q15 1 q4"},{"name":"q16","fmla":"+- x2O 0 dxF1"},{"name":"q17","fmla":"+- x2O 0 dxF2"},{"name":"q18","fmla":"+- y2O 0 dyF1"},{"name":"q19","fmla":"+- y2O 0 dyF2"},{"name":"q20","fmla":"mod q16 q18 0"},{"name":"q21","fmla":"mod q17 q19 0"},{"name":"q22","fmla":"+- q21 0 q20"},{"name":"dxF","fmla":"?: q22 dxF1 dxF2"},{"name":"dyF","fmla":"?: q22 dyF1 dyF2"},{"name":"sdxF","fmla":"*/ dxF rw1 rO"},{"name":"sdyF","fmla":"*/ dyF rh1 rO"},{"name":"xF","fmla":"+- hc sdxF 0"},{"name":"yF","fmla":"+- vc sdyF 0"},{"name":"x1I","fmla":"*/ sx1 rI rw2"},{"name":"y1I","fmla":"*/ sy1 rI rh2"},{"name":"x2I","fmla":"*/ sx2 rI rw2"},{"name":"y2I","fmla":"*/ sy2 rI rh2"},{"name":"dxI","fmla":"+- x2I 0 x1I"},{"name":"dyI","fmla":"+- y2I 0 y1I"},{"name":"dI","fmla":"mod dxI dyI 0"},{"name":"v1","fmla":"*/ x1I y2I 1"},{"name":"v2","fmla":"*/ x2I y1I 1"},{"name":"DI","fmla":"+- v1 0 v2"},{"name":"v3","fmla":"*/ rI rI 1"},{"name":"v4","fmla":"*/ dI dI 1"},{"name":"v5","fmla":"*/ v3 v4 1"},{"name":"v6","fmla":"*/ DI DI 1"},{"name":"v7","fmla":"+- v5 0 v6"},{"name":"v8","fmla":"max v7 0"},{"name":"sdelI","fmla":"sqrt v8"},{"name":"v9","fmla":"*/ sdyO dxI 1"},{"name":"v10","fmla":"*/ v9 sdelI 1"},{"name":"v11","fmla":"*/ DI dyI 1"},{"name":"dxC1","fmla":"+/ v11 v10 v4"},{"name":"v12","fmla":"+- v11 0 v10"},{"name":"dxC2","fmla":"*/ v12 1 v4"},{"name":"adyI","fmla":"abs dyI"},{"name":"v13","fmla":"*/ adyI sdelI 1"},{"name":"v14","fmla":"*/ DI dxI -1"},{"name":"dyC1","fmla":"+/ v14 v13 v4"},{"name":"v15","fmla":"+- v14 0 v13"},{"name":"dyC2","fmla":"*/ v15 1 v4"},{"name":"v16","fmla":"+- x1I 0 dxC1"},{"name":"v17","fmla":"+- x1I 0 dxC2"},{"name":"v18","fmla":"+- y1I 0 dyC1"},{"name":"v19","fmla":"+- y1I 0 dyC2"},{"name":"v20","fmla":"mod v16 v18 0"},{"name":"v21","fmla":"mod v17 v19 0"},{"name":"v22","fmla":"+- v21 0 v20"},{"name":"dxC","fmla":"?: v22 dxC1 dxC2"},{"name":"dyC","fmla":"?: v22 dyC1 dyC2"},{"name":"sdxC","fmla":"*/ dxC rw2 rI"},{"name":"sdyC","fmla":"*/ dyC rh2 rI"},{"name":"xC","fmla":"+- hc sdxC 0"},{"name":"yC","fmla":"+- vc sdyC 0"},{"name":"wtI","fmla":"sin rw3 stAng"},{"name":"htI","fmla":"cos rh3 stAng"},{"name":"dxI","fmla":"cat2 rw3 htI wtI"},{"name":"dyI","fmla":"sat2 rh3 htI wtI"},{"name":"xI","fmla":"+- hc dxI 0"},{"name":"yI","fmla":"+- vc dyI 0"},{"name":"lptAng","fmla":"+- stAng 0 aAng"},{"name":"wtL","fmla":"sin rw3 lptAng"},{"name":"htL","fmla":"cos rh3 lptAng"},{"name":"dxL","fmla":"cat2 rw3 htL wtL"},{"name":"dyL","fmla":"sat2 rh3 htL wtL"},{"name":"xL","fmla":"+- hc dxL 0"},{"name":"yL","fmla":"+- vc dyL 0"},{"name":"dxK","fmla":"cos thh lptAng"},{"name":"dyK","fmla":"sin thh lptAng"},{"name":"xK","fmla":"+- xI dxK 0"},{"name":"yK","fmla":"+- yI dyK 0"},{"name":"dxJ","fmla":"cos thh lptAng"},{"name":"dyJ","fmla":"sin thh lptAng"},{"name":"xJ","fmla":"+- xI 0 dxJ 0"},{"name":"yJ","fmla":"+- yI 0 dyJ 0"},{"name":"p1","fmla":"+- xF 0 xC"},{"name":"p2","fmla":"+- yF 0 yC"},{"name":"p3","fmla":"mod p1 p2 0"},{"name":"p4","fmla":"*/ p3 1 2"},{"name":"p5","fmla":"+- p4 0 thh"},{"name":"xGp","fmla":"?: p5 xF xG"},{"name":"yGp","fmla":"?: p5 yF yG"},{"name":"xBp","fmla":"?: p5 xC xB"},{"name":"yBp","fmla":"?: p5 yC yB"},{"name":"en0","fmla":"at2 sdxF sdyF"},{"name":"en1","fmla":"+- en0 21600000 0"},{"name":"en2","fmla":"?: en0 en0 en1"},{"name":"od0","fmla":"+- en2 0 enAng"},{"name":"od1","fmla":"+- od0 21600000 0"},{"name":"od2","fmla":"?: od0 od0 od1"},{"name":"st0","fmla":"+- stAng 0 od2"},{"name":"st1","fmla":"+- st0 21600000 0"},{"name":"st2","fmla":"?: st0 st0 st1"},{"name":"sw0","fmla":"+- en2 0 st2"},{"name":"sw1","fmla":"+- sw0 21600000 0"},{"name":"swAng","fmla":"?: sw0 sw0 sw1"},{"name":"ist0","fmla":"at2 sdxC sdyC"},{"name":"ist1","fmla":"+- ist0 21600000 0"},{"name":"istAng","fmla":"?: ist0 ist0 ist1"},{"name":"id0","fmla":"+- istAng 0 enAng"},{"name":"id1","fmla":"+- id0 0 21600000"},{"name":"id2","fmla":"?: id0 id1 id0"},{"name":"ien0","fmla":"+- stAng 0 id2"},{"name":"ien1","fmla":"+- ien0 0 21600000"},{"name":"ien2","fmla":"?: ien1 ien1 ien0"},{"name":"isw1","fmla":"+- ien2 0 istAng"},{"name":"isw2","fmla":"+- isw1 0 21600000"},{"name":"iswAng","fmla":"?: isw1 isw2 isw1"},{"name":"wtE","fmla":"sin rw1 st2"},{"name":"htE","fmla":"cos rh1 st2"},{"name":"dxE","fmla":"cat2 rw1 htE wtE"},{"name":"dyE","fmla":"sat2 rh1 htE wtE"},{"name":"xE","fmla":"+- hc dxE 0"},{"name":"yE","fmla":"+- vc dyE 0"},{"name":"wtD","fmla":"sin rw2 ien2"},{"name":"htD","fmla":"cos rh2 ien2"},{"name":"dxD","fmla":"cat2 rw2 htD wtD"},{"name":"dyD","fmla":"sat2 rh2 htD wtD"},{"name":"xD","fmla":"+- hc dxD 0"},{"name":"yD","fmla":"+- vc dyD 0"},{"name":"xKp","fmla":"?: p5 xE xK"},{"name":"yKp","fmla":"?: p5 yE yK"},{"name":"xJp","fmla":"?: p5 xD xJ"},{"name":"yJp","fmla":"?: p5 yD yJ"},{"name":"aL","fmla":"+- lptAng 0 cd4"},{"name":"aA","fmla":"+- ptAng cd4 0"},{"name":"aB","fmla":"+- ptAng cd2 0"},{"name":"aJ","fmla":"+- lptAng cd2 0"},{"name":"idx","fmla":"cos rw1 2700000"},{"name":"idy","fmla":"sin rh1 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xL","y":"yL"}]},{"c":"L","pts":[{"x":"xKp","y":"yKp"}]},{"c":"L","pts":[{"x":"xE","y":"yE"}]},{"c":"A","wR":"rw1","hR":"rh1","stAng":"st2","swAng":"swAng"},{"c":"L","pts":[{"x":"xGp","y":"yGp"}]},{"c":"L","pts":[{"x":"xA","y":"yA"}]},{"c":"L","pts":[{"x":"xBp","y":"yBp"}]},{"c":"L","pts":[{"x":"xC","y":"yC"}]},{"c":"A","wR":"rw2","hR":"rh2","stAng":"istAng","swAng":"iswAng"},{"c":"L","pts":[{"x":"xJp","y":"yJp"}]},{"c":"Z"}]}]},"leftRightRibbon":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"},{"name":"adj3","fmla":"val 16667"}],"gd":[{"name":"a3","fmla":"pin 0 adj3 33333"},{"name":"maxAdj1","fmla":"+- 100000 0 a3"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"w1","fmla":"+- wd2 0 wd32"},{"name":"maxAdj2","fmla":"*/ 100000 w1 ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"x1","fmla":"*/ ss a2 100000"},{"name":"x4","fmla":"+- r 0 x1"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"dy2","fmla":"*/ h a3 -200000"},{"name":"ly1","fmla":"+- vc dy2 dy1"},{"name":"ry4","fmla":"+- vc dy1 dy2"},{"name":"ly2","fmla":"+- ly1 dy1 0"},{"name":"ry3","fmla":"+- b 0 ly2"},{"name":"ly4","fmla":"*/ ly2 2 1"},{"name":"ry1","fmla":"+- b 0 ly4"},{"name":"ly3","fmla":"+- ly4 0 ly1"},{"name":"ry2","fmla":"+- b 0 ly3"},{"name":"hR","fmla":"*/ a3 ss 400000"},{"name":"x2","fmla":"+- hc 0 wd32"},{"name":"x3","fmla":"+- hc wd32 0"},{"name":"y1","fmla":"+- ly1 hR 0"},{"name":"y2","fmla":"+- ry2 0 hR"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"ly2"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"ly1"}]},{"c":"L","pts":[{"x":"hc","y":"ly1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x4","y":"ry2"}]},{"c":"L","pts":[{"x":"x4","y":"ry1"}]},{"c":"L","pts":[{"x":"r","y":"ry3"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"L","pts":[{"x":"x4","y":"ry4"}]},{"c":"L","pts":[{"x":"hc","y":"ry4"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"ly3"}]},{"c":"L","pts":[{"x":"x1","y":"ly3"}]},{"c":"L","pts":[{"x":"x1","y":"ly4"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x3","y":"ry2"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"ly2"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"ly1"}]},{"c":"L","pts":[{"x":"hc","y":"ly1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x4","y":"ry2"}]},{"c":"L","pts":[{"x":"x4","y":"ry1"}]},{"c":"L","pts":[{"x":"r","y":"ry3"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"L","pts":[{"x":"x4","y":"ry4"}]},{"c":"L","pts":[{"x":"hc","y":"ry4"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"ly3"}]},{"c":"L","pts":[{"x":"x1","y":"ly3"}]},{"c":"L","pts":[{"x":"x1","y":"ly4"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"ry2"}]},{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"ly3"}]}]}]},"leftRightUpArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"q1","fmla":"+- 100000 0 maxAdj1"},{"name":"maxAdj3","fmla":"*/ q1 1 2"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"x1","fmla":"*/ ss a3 100000"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x5","fmla":"+- hc dx2 0"},{"name":"dx3","fmla":"*/ ss a1 200000"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc dx3 0"},{"name":"x6","fmla":"+- r 0 x1"},{"name":"dy2","fmla":"*/ ss a2 50000"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"y4","fmla":"+- b 0 dx2"},{"name":"y3","fmla":"+- y4 0 dx3"},{"name":"y5","fmla":"+- y4 dx3 0"},{"name":"il","fmla":"*/ dx3 x1 dx2"},{"name":"ir","fmla":"+- r 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x5","y":"x1"}]},{"c":"L","pts":[{"x":"x4","y":"x1"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x6","y":"y3"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x6","y":"b"}]},{"c":"L","pts":[{"x":"x6","y":"y5"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"Z"}]}]},"leftUpArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"+- 100000 0 maxAdj1"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"x1","fmla":"*/ ss a3 100000"},{"name":"dx2","fmla":"*/ ss a2 50000"},{"name":"x2","fmla":"+- r 0 dx2"},{"name":"y2","fmla":"+- b 0 dx2"},{"name":"dx4","fmla":"*/ ss a2 100000"},{"name":"x4","fmla":"+- r 0 dx4"},{"name":"y4","fmla":"+- b 0 dx4"},{"name":"dx3","fmla":"*/ ss a1 200000"},{"name":"x3","fmla":"+- x4 0 dx3"},{"name":"x5","fmla":"+- x4 dx3 0"},{"name":"y3","fmla":"+- y4 0 dx3"},{"name":"y5","fmla":"+- y4 dx3 0"},{"name":"il","fmla":"*/ dx3 x1 dx4"},{"name":"cx1","fmla":"+/ x1 x5 2"},{"name":"cy1","fmla":"+/ x1 y5 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"x4","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"x1"}]},{"c":"L","pts":[{"x":"x5","y":"x1"}]},{"c":"L","pts":[{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"Z"}]}]},"lightningBolt":{"gd":[{"name":"x1","fmla":"*/ w 5022 21600"},{"name":"x3","fmla":"*/ w 8472 21600"},{"name":"x4","fmla":"*/ w 8757 21600"},{"name":"x5","fmla":"*/ w 10012 21600"},{"name":"x8","fmla":"*/ w 12860 21600"},{"name":"x9","fmla":"*/ w 13917 21600"},{"name":"x11","fmla":"*/ w 16577 21600"},{"name":"y1","fmla":"*/ h 3890 21600"},{"name":"y2","fmla":"*/ h 6080 21600"},{"name":"y4","fmla":"*/ h 7437 21600"},{"name":"y6","fmla":"*/ h 9705 21600"},{"name":"y7","fmla":"*/ h 12007 21600"},{"name":"y10","fmla":"*/ h 14277 21600"},{"name":"y11","fmla":"*/ h 14915 21600"}],"paths":[{"w":21600,"h":21600,"cmds":[{"c":"M","pts":[{"x":"8472","y":"0"}]},{"c":"L","pts":[{"x":"12860","y":"6080"}]},{"c":"L","pts":[{"x":"11050","y":"6797"}]},{"c":"L","pts":[{"x":"16577","y":"12007"}]},{"c":"L","pts":[{"x":"14767","y":"12877"}]},{"c":"L","pts":[{"x":"21600","y":"21600"}]},{"c":"L","pts":[{"x":"10012","y":"14915"}]},{"c":"L","pts":[{"x":"12222","y":"13987"}]},{"c":"L","pts":[{"x":"5022","y":"9705"}]},{"c":"L","pts":[{"x":"7602","y":"8382"}]},{"c":"L","pts":[{"x":"0","y":"3890"}]},{"c":"Z"}]}]},"line":{"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"lineInv":{"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]}]},"mathDivide":{"av":[{"name":"adj1","fmla":"val 23520"},{"name":"adj2","fmla":"val 5880"},{"name":"adj3","fmla":"val 11760"}],"gd":[{"name":"a1","fmla":"pin 1000 adj1 36745"},{"name":"ma1","fmla":"+- 0 0 a1"},{"name":"ma3h","fmla":"+/ 73490 ma1 4"},{"name":"ma3w","fmla":"*/ 36745 w h"},{"name":"maxAdj3","fmla":"min ma3h ma3w"},{"name":"a3","fmla":"pin 1000 adj3 maxAdj3"},{"name":"m4a3","fmla":"*/ -4 a3 1"},{"name":"maxAdj2","fmla":"+- 73490 m4a3 a1"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"yg","fmla":"*/ h a2 100000"},{"name":"rad","fmla":"*/ h a3 100000"},{"name":"dx1","fmla":"*/ w 73490 200000"},{"name":"y3","fmla":"+- vc 0 dy1"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"a","fmla":"+- yg rad 0"},{"name":"y2","fmla":"+- y3 0 a"},{"name":"y1","fmla":"+- y2 0 rad"},{"name":"y5","fmla":"+- b 0 y1"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x3","fmla":"+- hc dx1 0"},{"name":"x2","fmla":"+- hc 0 rad"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"hc","y":"y1"}]},{"c":"A","wR":"rad","hR":"rad","stAng":"3cd4","swAng":"21600000"},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"y5"}]},{"c":"A","wR":"rad","hR":"rad","stAng":"cd4","swAng":"21600000"},{"c":"Z"},{"c":"M","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"Z"}]}]},"mathEqual":{"av":[{"name":"adj1","fmla":"val 23520"},{"name":"adj2","fmla":"val 11760"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 36745"},{"name":"2a1","fmla":"*/ a1 2 1"},{"name":"mAdj2","fmla":"+- 100000 0 2a1"},{"name":"a2","fmla":"pin 0 adj2 mAdj2"},{"name":"dy1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ h a2 200000"},{"name":"dx1","fmla":"*/ w 73490 200000"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y1","fmla":"+- y2 0 dy1"},{"name":"y4","fmla":"+- y3 dy1 0"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"yC1","fmla":"+/ y1 y2 2"},{"name":"yC2","fmla":"+/ y3 y4 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"Z"}]}]},"mathMinus":{"av":[{"name":"adj1","fmla":"val 23520"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"dx1","fmla":"*/ w 73490 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"}]}]},"mathMultiply":{"av":[{"name":"adj1","fmla":"val 23520"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 51965"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"a","fmla":"at2 w h"},{"name":"sa","fmla":"sin 1 a"},{"name":"ca","fmla":"cos 1 a"},{"name":"ta","fmla":"tan 1 a"},{"name":"dl","fmla":"mod w h 0"},{"name":"rw","fmla":"*/ dl 51965 100000"},{"name":"lM","fmla":"+- dl 0 rw"},{"name":"xM","fmla":"*/ ca lM 2"},{"name":"yM","fmla":"*/ sa lM 2"},{"name":"dxAM","fmla":"*/ sa th 2"},{"name":"dyAM","fmla":"*/ ca th 2"},{"name":"xA","fmla":"+- xM 0 dxAM"},{"name":"yA","fmla":"+- yM dyAM 0"},{"name":"xB","fmla":"+- xM dxAM 0"},{"name":"yB","fmla":"+- yM 0 dyAM"},{"name":"xBC","fmla":"+- hc 0 xB"},{"name":"yBC","fmla":"*/ xBC ta 1"},{"name":"yC","fmla":"+- yBC yB 0"},{"name":"xD","fmla":"+- r 0 xB"},{"name":"xE","fmla":"+- r 0 xA"},{"name":"yFE","fmla":"+- vc 0 yA"},{"name":"xFE","fmla":"*/ yFE 1 ta"},{"name":"xF","fmla":"+- xE 0 xFE"},{"name":"xL","fmla":"+- xA xFE 0"},{"name":"yG","fmla":"+- b 0 yA"},{"name":"yH","fmla":"+- b 0 yB"},{"name":"yI","fmla":"+- b 0 yC"},{"name":"xC2","fmla":"+- r 0 xM"},{"name":"yC3","fmla":"+- b 0 yM"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xA","y":"yA"}]},{"c":"L","pts":[{"x":"xB","y":"yB"}]},{"c":"L","pts":[{"x":"hc","y":"yC"}]},{"c":"L","pts":[{"x":"xD","y":"yB"}]},{"c":"L","pts":[{"x":"xE","y":"yA"}]},{"c":"L","pts":[{"x":"xF","y":"vc"}]},{"c":"L","pts":[{"x":"xE","y":"yG"}]},{"c":"L","pts":[{"x":"xD","y":"yH"}]},{"c":"L","pts":[{"x":"hc","y":"yI"}]},{"c":"L","pts":[{"x":"xB","y":"yH"}]},{"c":"L","pts":[{"x":"xA","y":"yG"}]},{"c":"L","pts":[{"x":"xL","y":"vc"}]},{"c":"Z"}]}]},"mathNotEqual":{"av":[{"name":"adj1","fmla":"val 23520"},{"name":"adj2","fmla":"val 6600000"},{"name":"adj3","fmla":"val 11760"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"crAng","fmla":"pin 4200000 adj2 6600000"},{"name":"2a1","fmla":"*/ a1 2 1"},{"name":"maxAdj3","fmla":"+- 100000 0 2a1"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"dy1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ h a3 200000"},{"name":"dx1","fmla":"*/ w 73490 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x8","fmla":"+- hc dx1 0"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y1","fmla":"+- y2 0 dy1"},{"name":"y4","fmla":"+- y3 dy1 0"},{"name":"cadj2","fmla":"+- crAng 0 cd4"},{"name":"xadj2","fmla":"tan hd2 cadj2"},{"name":"len","fmla":"mod xadj2 hd2 0"},{"name":"bhw","fmla":"*/ len dy1 hd2"},{"name":"bhw2","fmla":"*/ bhw 1 2"},{"name":"x7","fmla":"+- hc xadj2 bhw2"},{"name":"dx67","fmla":"*/ xadj2 y1 hd2"},{"name":"x6","fmla":"+- x7 0 dx67"},{"name":"dx57","fmla":"*/ xadj2 y2 hd2"},{"name":"x5","fmla":"+- x7 0 dx57"},{"name":"dx47","fmla":"*/ xadj2 y3 hd2"},{"name":"x4","fmla":"+- x7 0 dx47"},{"name":"dx37","fmla":"*/ xadj2 y4 hd2"},{"name":"x3","fmla":"+- x7 0 dx37"},{"name":"dx27","fmla":"*/ xadj2 2 1"},{"name":"x2","fmla":"+- x7 0 dx27"},{"name":"rx7","fmla":"+- x7 bhw 0"},{"name":"rx6","fmla":"+- x6 bhw 0"},{"name":"rx5","fmla":"+- x5 bhw 0"},{"name":"rx4","fmla":"+- x4 bhw 0"},{"name":"rx3","fmla":"+- x3 bhw 0"},{"name":"rx2","fmla":"+- x2 bhw 0"},{"name":"dx7","fmla":"*/ dy1 hd2 len"},{"name":"rxt","fmla":"+- x7 dx7 0"},{"name":"lxt","fmla":"+- rx7 0 dx7"},{"name":"rx","fmla":"?: cadj2 rxt rx7"},{"name":"lx","fmla":"?: cadj2 x7 lxt"},{"name":"dy3","fmla":"*/ dy1 xadj2 len"},{"name":"dy4","fmla":"+- 0 0 dy3"},{"name":"ry","fmla":"?: cadj2 dy3 t"},{"name":"ly","fmla":"?: cadj2 t dy4"},{"name":"dlx","fmla":"+- w 0 rx"},{"name":"drx","fmla":"+- w 0 lx"},{"name":"dly","fmla":"+- h 0 ry"},{"name":"dry","fmla":"+- h 0 ly"},{"name":"xC1","fmla":"+/ rx lx 2"},{"name":"xC2","fmla":"+/ drx dlx 2"},{"name":"yC1","fmla":"+/ ry ly 2"},{"name":"yC2","fmla":"+/ y1 y2 2"},{"name":"yC3","fmla":"+/ y3 y4 2"},{"name":"yC4","fmla":"+/ dry dly 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x6","y":"y1"}]},{"c":"L","pts":[{"x":"lx","y":"ly"}]},{"c":"L","pts":[{"x":"rx","y":"ry"}]},{"c":"L","pts":[{"x":"rx6","y":"y1"}]},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"x8","y":"y2"}]},{"c":"L","pts":[{"x":"rx5","y":"y2"}]},{"c":"L","pts":[{"x":"rx4","y":"y3"}]},{"c":"L","pts":[{"x":"x8","y":"y3"}]},{"c":"L","pts":[{"x":"x8","y":"y4"}]},{"c":"L","pts":[{"x":"rx3","y":"y4"}]},{"c":"L","pts":[{"x":"drx","y":"dry"}]},{"c":"L","pts":[{"x":"dlx","y":"dly"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"}]}]},"mathPlus":{"av":[{"name":"adj1","fmla":"val 23520"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 73490"},{"name":"dx1","fmla":"*/ w 73490 200000"},{"name":"dy1","fmla":"*/ h 73490 200000"},{"name":"dx2","fmla":"*/ ss a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dx2"},{"name":"y3","fmla":"+- vc dx2 0"},{"name":"y4","fmla":"+- vc dy1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"Z"}]}]},"moon":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 87500"},{"name":"g0","fmla":"*/ ss a 100000"},{"name":"g0w","fmla":"*/ g0 w ss"},{"name":"g1","fmla":"+- ss 0 g0"},{"name":"g2","fmla":"*/ g0 g0 g1"},{"name":"g3","fmla":"*/ ss ss g1"},{"name":"g4","fmla":"*/ g3 2 1"},{"name":"g5","fmla":"+- g4 0 g2"},{"name":"g6","fmla":"+- g5 0 g0"},{"name":"g6w","fmla":"*/ g6 w ss"},{"name":"g7","fmla":"*/ g5 1 2"},{"name":"g8","fmla":"+- g7 0 g0"},{"name":"dy1","fmla":"*/ g8 hd2 ss"},{"name":"g10h","fmla":"+- vc 0 dy1"},{"name":"g11h","fmla":"+- vc dy1 0"},{"name":"g12","fmla":"*/ g0 9598 32768"},{"name":"g12w","fmla":"*/ g12 w ss"},{"name":"g13","fmla":"+- ss 0 g12"},{"name":"q1","fmla":"*/ ss ss 1"},{"name":"q2","fmla":"*/ g13 g13 1"},{"name":"q3","fmla":"+- q1 0 q2"},{"name":"q4","fmla":"sqrt q3"},{"name":"dy4","fmla":"*/ q4 hd2 ss"},{"name":"g15h","fmla":"+- vc 0 dy4"},{"name":"g16h","fmla":"+- vc dy4 0"},{"name":"g17w","fmla":"+- g6w 0 g0w"},{"name":"g18w","fmla":"*/ g17w 1 2"},{"name":"dx2p","fmla":"+- g0w g18w w"},{"name":"dx2","fmla":"*/ dx2p -1 1"},{"name":"dy2","fmla":"*/ hd2 -1 1"},{"name":"stAng1","fmla":"at2 dx2 dy2"},{"name":"enAngp1","fmla":"at2 dx2 hd2"},{"name":"enAng1","fmla":"+- enAngp1 0 21600000"},{"name":"swAng1","fmla":"+- enAng1 0 stAng1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"r","y":"b"}]},{"c":"A","wR":"w","hR":"hd2","stAng":"cd4","swAng":"cd2"},{"c":"A","wR":"g18w","hR":"dy1","stAng":"stAng1","swAng":"swAng1"},{"c":"Z"}]}]},"nonIsoscelesTrapezoid":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 w ss"},{"name":"a1","fmla":"pin 0 adj1 maxAdj"},{"name":"a2","fmla":"pin 0 adj2 maxAdj"},{"name":"x1","fmla":"*/ ss a1 200000"},{"name":"x2","fmla":"*/ ss a1 100000"},{"name":"dx3","fmla":"*/ ss a2 100000"},{"name":"x3","fmla":"+- r 0 dx3"},{"name":"x4","fmla":"+/ r x3 2"},{"name":"il","fmla":"*/ wd3 a1 maxAdj"},{"name":"adjm","fmla":"max a1 a2"},{"name":"it","fmla":"*/ hd3 adjm maxAdj"},{"name":"irt","fmla":"*/ wd3 a2 maxAdj"},{"name":"ir","fmla":"+- r 0 irt"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"noSmoking":{"av":[{"name":"adj","fmla":"val 18750"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dr","fmla":"*/ ss a 100000"},{"name":"iwd2","fmla":"+- wd2 0 dr"},{"name":"ihd2","fmla":"+- hd2 0 dr"},{"name":"ang","fmla":"at2 w h"},{"name":"ct","fmla":"cos ihd2 ang"},{"name":"st","fmla":"sin iwd2 ang"},{"name":"m","fmla":"mod ct st 0"},{"name":"n","fmla":"*/ iwd2 ihd2 m"},{"name":"drd2","fmla":"*/ dr 1 2"},{"name":"dang","fmla":"at2 n drd2"},{"name":"2dang","fmla":"*/ dang 2 1"},{"name":"swAng","fmla":"+- -10800000 2dang 0"},{"name":"t3","fmla":"at2 w h"},{"name":"stAng1","fmla":"+- t3 0 dang"},{"name":"stAng2","fmla":"+- stAng1 0 cd2"},{"name":"ct1","fmla":"cos ihd2 stAng1"},{"name":"st1","fmla":"sin iwd2 stAng1"},{"name":"m1","fmla":"mod ct1 st1 0"},{"name":"n1","fmla":"*/ iwd2 ihd2 m1"},{"name":"dx1","fmla":"cos n1 stAng1"},{"name":"dy1","fmla":"sin n1 stAng1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"x2","fmla":"+- hc 0 dx1"},{"name":"y2","fmla":"+- vc 0 dy1"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"3cd4","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"},{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"stAng1","swAng":"swAng"},{"c":"Z"},{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"stAng2","swAng":"swAng"},{"c":"Z"}]}]},"notchedRightArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 w ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- r 0 dx2"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"x1","fmla":"*/ dy1 dx2 hd2"},{"name":"x3","fmla":"+- r 0 x1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"vc"}]},{"c":"Z"}]}]},"octagon":{"av":[{"name":"adj","fmla":"val 29289"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"},{"name":"il","fmla":"*/ x1 1 2"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"x1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"Z"}]}]},"parallelogram":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"maxAdj","fmla":"*/ 100000 w ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"x1","fmla":"*/ ss a 200000"},{"name":"x2","fmla":"*/ ss a 100000"},{"name":"x6","fmla":"+- r 0 x1"},{"name":"x5","fmla":"+- r 0 x2"},{"name":"x3","fmla":"*/ x5 1 2"},{"name":"x4","fmla":"+- r 0 x3"},{"name":"il","fmla":"*/ wd2 a maxAdj"},{"name":"q1","fmla":"*/ 5 a maxAdj"},{"name":"q2","fmla":"+/ 1 q1 12"},{"name":"il","fmla":"*/ q2 w 1"},{"name":"it","fmla":"*/ q2 h 1"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 it"},{"name":"q3","fmla":"*/ h hc x2"},{"name":"y1","fmla":"pin 0 q3 h"},{"name":"y2","fmla":"+- b 0 y1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x5","y":"b"}]},{"c":"Z"}]}]},"pentagon":{"av":[{"name":"hf","fmla":"val 105146"},{"name":"vf","fmla":"val 110557"}],"gd":[{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"svc","fmla":"*/ vc  vf 100000"},{"name":"dx1","fmla":"cos swd2 1080000"},{"name":"dx2","fmla":"cos swd2 18360000"},{"name":"dy1","fmla":"sin shd2 1080000"},{"name":"dy2","fmla":"sin shd2 18360000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- svc 0 dy1"},{"name":"y2","fmla":"+- svc 0 dy2"},{"name":"it","fmla":"*/ y1 dx2 dx1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"Z"}]}]},"pie":{"av":[{"name":"adj1","fmla":"val 0"},{"name":"adj2","fmla":"val 16200000"}],"gd":[{"name":"stAng","fmla":"pin 0 adj1 21599999"},{"name":"enAng","fmla":"pin 0 adj2 21599999"},{"name":"sw1","fmla":"+- enAng 0 stAng"},{"name":"sw2","fmla":"+- sw1 21600000 0"},{"name":"swAng","fmla":"?: sw1 sw1 sw2"},{"name":"wt1","fmla":"sin wd2 stAng"},{"name":"ht1","fmla":"cos hd2 stAng"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"wt2","fmla":"sin wd2 enAng"},{"name":"ht2","fmla":"cos hd2 enAng"},{"name":"dx2","fmla":"cat2 wd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 hd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"},{"c":"L","pts":[{"x":"hc","y":"vc"}]},{"c":"Z"}]}]},"pieWedge":{"gd":[{"name":"g1","fmla":"cos w 13500000"},{"name":"g2","fmla":"sin h 13500000"},{"name":"x1","fmla":"+- r g1 0"},{"name":"y1","fmla":"+- b g2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"A","wR":"w","hR":"h","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"plaque":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"},{"name":"il","fmla":"*/ x1 70711 100000"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"-5400000"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"-5400000"},{"c":"Z"}]}]},"plaqueTabs":{"gd":[{"name":"md","fmla":"mod w h 0"},{"name":"dx","fmla":"*/ 1 md 20"},{"name":"y1","fmla":"+- 0 b dx"},{"name":"x1","fmla":"+- 0 r dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"dx","y":"t"}]},{"c":"A","wR":"dx","hR":"dx","stAng":"0","swAng":"cd4"},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"dx","hR":"dx","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"dx"}]},{"c":"A","wR":"dx","hR":"dx","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"b"}]},{"c":"A","wR":"dx","hR":"dx","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"plus":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"},{"name":"d","fmla":"+- w 0 h"},{"name":"il","fmla":"?: d l x1"},{"name":"ir","fmla":"?: d r x2"},{"name":"it","fmla":"?: d x1 t"},{"name":"ib","fmla":"?: d y2 b"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"x1"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"r","y":"x1"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"Z"}]}]},"quadArrow":{"av":[{"name":"adj1","fmla":"val 22500"},{"name":"adj2","fmla":"val 22500"},{"name":"adj3","fmla":"val 22500"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"q1","fmla":"+- 100000 0 maxAdj1"},{"name":"maxAdj3","fmla":"*/ q1 1 2"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"x1","fmla":"*/ ss a3 100000"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x5","fmla":"+- hc dx2 0"},{"name":"dx3","fmla":"*/ ss a1 200000"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc dx3 0"},{"name":"x6","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- vc 0 dx2"},{"name":"y5","fmla":"+- vc dx2 0"},{"name":"y3","fmla":"+- vc 0 dx3"},{"name":"y4","fmla":"+- vc dx3 0"},{"name":"y6","fmla":"+- b 0 x1"},{"name":"il","fmla":"*/ dx3 x1 dx2"},{"name":"ir","fmla":"+- r 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"x1"}]},{"c":"L","pts":[{"x":"x2","y":"x1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x5","y":"x1"}]},{"c":"L","pts":[{"x":"x4","y":"x1"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"x6","y":"y3"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x6","y":"y5"}]},{"c":"L","pts":[{"x":"x6","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y6"}]},{"c":"L","pts":[{"x":"x5","y":"y6"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y6"}]},{"c":"L","pts":[{"x":"x3","y":"y6"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"Z"}]}]},"quadArrowCallout":{"av":[{"name":"adj1","fmla":"val 18515"},{"name":"adj2","fmla":"val 18515"},{"name":"adj3","fmla":"val 18515"},{"name":"adj4","fmla":"val 48123"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"+- 50000 0 a2"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 2 1"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin a1 adj4 maxAdj4"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"dx3","fmla":"*/ ss a1 200000"},{"name":"ah","fmla":"*/ ss a3 100000"},{"name":"dx1","fmla":"*/ w a4 200000"},{"name":"dy1","fmla":"*/ h a4 200000"},{"name":"x8","fmla":"+- r 0 ah"},{"name":"x2","fmla":"+- hc 0 dx1"},{"name":"x7","fmla":"+- hc dx1 0"},{"name":"x3","fmla":"+- hc 0 dx2"},{"name":"x6","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc 0 dx3"},{"name":"x5","fmla":"+- hc dx3 0"},{"name":"y8","fmla":"+- b 0 ah"},{"name":"y2","fmla":"+- vc 0 dy1"},{"name":"y7","fmla":"+- vc dy1 0"},{"name":"y3","fmla":"+- vc 0 dx2"},{"name":"y6","fmla":"+- vc dx2 0"},{"name":"y4","fmla":"+- vc 0 dx3"},{"name":"y5","fmla":"+- vc dx3 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"ah","y":"y3"}]},{"c":"L","pts":[{"x":"ah","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"ah"}]},{"c":"L","pts":[{"x":"x3","y":"ah"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x6","y":"ah"}]},{"c":"L","pts":[{"x":"x5","y":"ah"}]},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"L","pts":[{"x":"x7","y":"y2"}]},{"c":"L","pts":[{"x":"x7","y":"y4"}]},{"c":"L","pts":[{"x":"x8","y":"y4"}]},{"c":"L","pts":[{"x":"x8","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x8","y":"y6"}]},{"c":"L","pts":[{"x":"x8","y":"y5"}]},{"c":"L","pts":[{"x":"x7","y":"y5"}]},{"c":"L","pts":[{"x":"x7","y":"y7"}]},{"c":"L","pts":[{"x":"x5","y":"y7"}]},{"c":"L","pts":[{"x":"x5","y":"y8"}]},{"c":"L","pts":[{"x":"x6","y":"y8"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"x3","y":"y8"}]},{"c":"L","pts":[{"x":"x4","y":"y8"}]},{"c":"L","pts":[{"x":"x4","y":"y7"}]},{"c":"L","pts":[{"x":"x2","y":"y7"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"L","pts":[{"x":"ah","y":"y5"}]},{"c":"L","pts":[{"x":"ah","y":"y6"}]},{"c":"Z"}]}]},"rect":{"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"ribbon":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 33333"},{"name":"a2","fmla":"pin 25000 adj2 75000"},{"name":"x10","fmla":"+- r 0 wd8"},{"name":"dx2","fmla":"*/ w a2 200000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x9","fmla":"+- hc dx2 0"},{"name":"x3","fmla":"+- x2 wd32 0"},{"name":"x8","fmla":"+- x9 0 wd32"},{"name":"x5","fmla":"+- x2 wd8 0"},{"name":"x6","fmla":"+- x9 0 wd8"},{"name":"x4","fmla":"+- x5 0 wd32"},{"name":"x7","fmla":"+- x6 wd32 0"},{"name":"y1","fmla":"*/ h a1 200000"},{"name":"y2","fmla":"*/ h a1 100000"},{"name":"y4","fmla":"+- b 0 y2"},{"name":"y3","fmla":"*/ y4 1 2"},{"name":"hR","fmla":"*/ h a1 400000"},{"name":"y5","fmla":"+- b 0 hR"},{"name":"y6","fmla":"+- y2 0 hR"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"t"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x8","y":"y2"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x10","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y5"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"wd8","y":"y3"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x5","y":"hR"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x6","y":"hR"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd2","swAng":"-5400000"},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"t"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x8","y":"y2"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"x10","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y5"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x3","y":"b"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"wd8","y":"y3"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x5","y":"hR"}]},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"M","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"x6","y":"hR"}]},{"c":"M","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y6"}]},{"c":"M","pts":[{"x":"x9","y":"y6"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]}]}]},"ribbon2":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 33333"},{"name":"a2","fmla":"pin 25000 adj2 75000"},{"name":"x10","fmla":"+- r 0 wd8"},{"name":"dx2","fmla":"*/ w a2 200000"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x9","fmla":"+- hc dx2 0"},{"name":"x3","fmla":"+- x2 wd32 0"},{"name":"x8","fmla":"+- x9 0 wd32"},{"name":"x5","fmla":"+- x2 wd8 0"},{"name":"x6","fmla":"+- x9 0 wd8"},{"name":"x4","fmla":"+- x5 0 wd32"},{"name":"x7","fmla":"+- x6 wd32 0"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- b 0 dy1"},{"name":"dy2","fmla":"*/ h a1 100000"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"y4","fmla":"+- t dy2 0"},{"name":"y3","fmla":"+/ y4 b 2"},{"name":"hR","fmla":"*/ h a1 400000"},{"name":"y6","fmla":"+- b 0 hR"},{"name":"y7","fmla":"+- y1 0 hR"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x4","y":"b"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x8","y":"y2"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x10","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"hR"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"-5400000"},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"wd8","y":"y3"}]},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x5","y":"y6"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"0","swAng":"-5400000"},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x6","y":"y6"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"wd8","y":"y3"}]},{"c":"L","pts":[{"x":"l","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"hR"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x8","y":"t"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x10","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x7","y":"b"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"A","wR":"wd32","hR":"hR","stAng":"3cd4","swAng":"cd2"},{"c":"Z"},{"c":"M","pts":[{"x":"x5","y":"y2"}]},{"c":"L","pts":[{"x":"x5","y":"y6"}]},{"c":"M","pts":[{"x":"x6","y":"y6"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"M","pts":[{"x":"x2","y":"y7"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"M","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"x9","y":"y7"}]}]}]},"rightArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 w ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dx1","fmla":"*/ ss a2 100000"},{"name":"x1","fmla":"+- r 0 dx1"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"dx2","fmla":"*/ y1 dx1 hd2"},{"name":"x2","fmla":"+- x1 dx2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"Z"}]}]},"rightArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 64977"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 100000 w ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss w"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dy1","fmla":"*/ ss a2 100000"},{"name":"dy2","fmla":"*/ ss a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"dx3","fmla":"*/ ss a3 100000"},{"name":"x3","fmla":"+- r 0 dx3"},{"name":"x2","fmla":"*/ w a4 100000"},{"name":"x1","fmla":"*/ x2 1 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"rightBrace":{"av":[{"name":"adj1","fmla":"val 8333"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 100000"},{"name":"q1","fmla":"+- 100000 0 a2"},{"name":"q2","fmla":"min q1 a2"},{"name":"q3","fmla":"*/ q2 1 2"},{"name":"maxAdj1","fmla":"*/ q3 h ss"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"y1","fmla":"*/ ss a1 100000"},{"name":"y3","fmla":"*/ h a2 100000"},{"name":"y2","fmla":"+- y3 0 y1"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"dx1","fmla":"cos wd2 2700000"},{"name":"dy1","fmla":"sin y1 2700000"},{"name":"ir","fmla":"+- l dx1 0"},{"name":"it","fmla":"+- y1 0 dy1"},{"name":"ib","fmla":"+- b dy1 y1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"hc","y":"y2"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"-5400000"},{"c":"A","wR":"wd2","hR":"y1","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"y4"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"hc","y":"y2"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"cd2","swAng":"-5400000"},{"c":"A","wR":"wd2","hR":"y1","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"hc","y":"y4"}]},{"c":"A","wR":"wd2","hR":"y1","stAng":"0","swAng":"cd4"}]}]},"rightBracket":{"av":[{"name":"adj","fmla":"val 8333"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 h ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"y1","fmla":"*/ ss a 100000"},{"name":"y2","fmla":"+- b 0 y1"},{"name":"dx1","fmla":"cos w 2700000"},{"name":"dy1","fmla":"sin y1 2700000"},{"name":"ir","fmla":"+- l dx1 0"},{"name":"it","fmla":"+- y1 0 dy1"},{"name":"ib","fmla":"+- b dy1 y1"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"w","hR":"y1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"w","hR":"y1","stAng":"0","swAng":"cd4"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"w","hR":"y1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"w","hR":"y1","stAng":"0","swAng":"cd4"}]}]},"round1Rect":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"*/ ss a 100000"},{"name":"x1","fmla":"+- r 0 dx1"},{"name":"idx","fmla":"*/ dx1 29289 100000"},{"name":"ir","fmla":"+- r 0 idx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"A","wR":"dx1","hR":"dx1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"round2DiagRect":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"x1","fmla":"*/ ss a1 100000"},{"name":"y1","fmla":"+- b 0 x1"},{"name":"a","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- r 0 a"},{"name":"y2","fmla":"+- b 0 a"},{"name":"dx1","fmla":"*/ x1 29289 100000"},{"name":"dx2","fmla":"*/ a 29289 100000"},{"name":"d","fmla":"+- dx1 0 dx2"},{"name":"dx","fmla":"?: d dx1 dx2"},{"name":"ir","fmla":"+- r 0 dx"},{"name":"ib","fmla":"+- b 0 dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"a","hR":"a","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"a","y":"b"}]},{"c":"A","wR":"a","hR":"a","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"Z"}]}]},"round2SameRect":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"tx1","fmla":"*/ ss a1 100000"},{"name":"tx2","fmla":"+- r 0 tx1"},{"name":"bx1","fmla":"*/ ss a2 100000"},{"name":"bx2","fmla":"+- r 0 bx1"},{"name":"by1","fmla":"+- b 0 bx1"},{"name":"d","fmla":"+- tx1 0 bx1"},{"name":"tdx","fmla":"*/ tx1 29289 100000"},{"name":"bdx","fmla":"*/ bx1 29289 100000"},{"name":"il","fmla":"?: d tdx bdx"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 bdx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"tx1","y":"t"}]},{"c":"L","pts":[{"x":"tx2","y":"t"}]},{"c":"A","wR":"tx1","hR":"tx1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"by1"}]},{"c":"A","wR":"bx1","hR":"bx1","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"bx1","y":"b"}]},{"c":"A","wR":"bx1","hR":"bx1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"tx1"}]},{"c":"A","wR":"tx1","hR":"tx1","stAng":"cd2","swAng":"cd4"},{"c":"Z"}]}]},"roundRect":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"x1","fmla":"*/ ss a 100000"},{"name":"x2","fmla":"+- r 0 x1"},{"name":"y2","fmla":"+- b 0 x1"},{"name":"il","fmla":"*/ x1 29289 100000"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"rtTriangle":{"gd":[{"name":"it","fmla":"*/ h 7 12"},{"name":"ir","fmla":"*/ w 7 12"},{"name":"ib","fmla":"*/ h 11 12"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"smileyFace":{"av":[{"name":"adj","fmla":"val 4653"}],"gd":[{"name":"a","fmla":"pin -4653 adj 4653"},{"name":"x1","fmla":"*/ w 4969 21699"},{"name":"x2","fmla":"*/ w 6215 21600"},{"name":"x3","fmla":"*/ w 13135 21600"},{"name":"x4","fmla":"*/ w 16640 21600"},{"name":"y1","fmla":"*/ h 7570 21600"},{"name":"y3","fmla":"*/ h 16515 21600"},{"name":"dy2","fmla":"*/ h a 100000"},{"name":"y2","fmla":"+- y3 0 dy2"},{"name":"y4","fmla":"+- y3 dy2 0"},{"name":"dy3","fmla":"*/ h a 50000"},{"name":"y5","fmla":"+- y4 dy3 0"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"},{"name":"wR","fmla":"*/ w 1125 21600"},{"name":"hR","fmla":"*/ h 1125 21600"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"21600000"},{"c":"Z"}]},{"fill":"darkenLess","cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"A","wR":"wR","hR":"hR","stAng":"cd2","swAng":"21600000"},{"c":"M","pts":[{"x":"x3","y":"y1"}]},{"c":"A","wR":"wR","hR":"hR","stAng":"cd2","swAng":"21600000"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"x1","y":"y2"}]},{"c":"Q","pts":[{"x":"hc","y":"y5"},{"x":"x4","y":"y2"}]}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"21600000"},{"c":"Z"}]}]},"snip1Rect":{"av":[{"name":"adj","fmla":"val 16667"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"*/ ss a 100000"},{"name":"x1","fmla":"+- r 0 dx1"},{"name":"it","fmla":"*/ dx1 1 2"},{"name":"ir","fmla":"+/ x1 r 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"dx1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"snip2DiagRect":{"av":[{"name":"adj1","fmla":"val 0"},{"name":"adj2","fmla":"val 16667"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"lx1","fmla":"*/ ss a1 100000"},{"name":"lx2","fmla":"+- r 0 lx1"},{"name":"ly1","fmla":"+- b 0 lx1"},{"name":"rx1","fmla":"*/ ss a2 100000"},{"name":"rx2","fmla":"+- r 0 rx1"},{"name":"ry1","fmla":"+- b 0 rx1"},{"name":"d","fmla":"+- lx1 0 rx1"},{"name":"dx","fmla":"?: d lx1 rx1"},{"name":"il","fmla":"*/ dx 1 2"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"lx1","y":"t"}]},{"c":"L","pts":[{"x":"rx2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"rx1"}]},{"c":"L","pts":[{"x":"r","y":"ly1"}]},{"c":"L","pts":[{"x":"lx2","y":"b"}]},{"c":"L","pts":[{"x":"rx1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"ry1"}]},{"c":"L","pts":[{"x":"l","y":"lx1"}]},{"c":"Z"}]}]},"snip2SameRect":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"tx1","fmla":"*/ ss a1 100000"},{"name":"tx2","fmla":"+- r 0 tx1"},{"name":"bx1","fmla":"*/ ss a2 100000"},{"name":"bx2","fmla":"+- r 0 bx1"},{"name":"by1","fmla":"+- b 0 bx1"},{"name":"d","fmla":"+- tx1 0 bx1"},{"name":"dx","fmla":"?: d tx1 bx1"},{"name":"il","fmla":"*/ dx 1 2"},{"name":"ir","fmla":"+- r 0 il"},{"name":"it","fmla":"*/ tx1 1 2"},{"name":"ib","fmla":"+/ by1 b 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"tx1","y":"t"}]},{"c":"L","pts":[{"x":"tx2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"tx1"}]},{"c":"L","pts":[{"x":"r","y":"by1"}]},{"c":"L","pts":[{"x":"bx2","y":"b"}]},{"c":"L","pts":[{"x":"bx1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"by1"}]},{"c":"L","pts":[{"x":"l","y":"tx1"}]},{"c":"Z"}]}]},"snipRoundRect":{"av":[{"name":"adj1","fmla":"val 16667"},{"name":"adj2","fmla":"val 16667"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 50000"},{"name":"a2","fmla":"pin 0 adj2 50000"},{"name":"x1","fmla":"*/ ss a1 100000"},{"name":"dx2","fmla":"*/ ss a2 100000"},{"name":"x2","fmla":"+- r 0 dx2"},{"name":"il","fmla":"*/ x1 29289 100000"},{"name":"ir","fmla":"+/ x2 r 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"dx2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"x1"}]},{"c":"A","wR":"x1","hR":"x1","stAng":"cd2","swAng":"cd4"},{"c":"Z"}]}]},"squareTabs":{"gd":[{"name":"md","fmla":"mod w h 0"},{"name":"dx","fmla":"*/ 1 md 20"},{"name":"y1","fmla":"+- 0 b dx"},{"name":"x1","fmla":"+- 0 r dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"dx","y":"t"}]},{"c":"L","pts":[{"x":"dx","y":"dx"}]},{"c":"L","pts":[{"x":"l","y":"dx"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"dx","y":"y1"}]},{"c":"L","pts":[{"x":"dx","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"dx"}]},{"c":"L","pts":[{"x":"x1","y":"dx"}]},{"c":"Z"}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"Z"}]}]},"star10":{"av":[{"name":"adj","fmla":"val 42533"},{"name":"hf","fmla":"val 105146"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"dx1","fmla":"*/ swd2 95106 100000"},{"name":"dx2","fmla":"*/ swd2 58779 100000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"dy1","fmla":"*/ hd2 80902 100000"},{"name":"dy2","fmla":"*/ hd2 30902 100000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ swd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 80902 100000"},{"name":"sdx2","fmla":"*/ iwd2 30902 100000"},{"name":"sdy1","fmla":"*/ ihd2 95106 100000"},{"name":"sdy2","fmla":"*/ ihd2 58779 100000"},{"name":"sx1","fmla":"+- hc 0 iwd2"},{"name":"sx2","fmla":"+- hc 0 sdx1"},{"name":"sx3","fmla":"+- hc 0 sdx2"},{"name":"sx4","fmla":"+- hc sdx2 0"},{"name":"sx5","fmla":"+- hc sdx1 0"},{"name":"sx6","fmla":"+- hc iwd2 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc sdy2 0"},{"name":"sy4","fmla":"+- vc sdy1 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"sx2","y":"sy2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx4","y":"sy1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"sx5","y":"sy2"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"sx6","y":"vc"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"sx5","y":"sy3"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"sx4","y":"sy4"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx3","y":"sy4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"sx2","y":"sy3"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"sx1","y":"vc"}]},{"c":"Z"}]}]},"star12":{"av":[{"name":"adj","fmla":"val 37500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"cos wd2 1800000"},{"name":"dy1","fmla":"sin hd2 3600000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x3","fmla":"*/ w 3 4"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y3","fmla":"*/ h 3 4"},{"name":"y4","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"cos iwd2 900000"},{"name":"sdx2","fmla":"cos iwd2 2700000"},{"name":"sdx3","fmla":"cos iwd2 4500000"},{"name":"sdy1","fmla":"sin ihd2 4500000"},{"name":"sdy2","fmla":"sin ihd2 2700000"},{"name":"sdy3","fmla":"sin ihd2 900000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc 0 sdx3"},{"name":"sx4","fmla":"+- hc sdx3 0"},{"name":"sx5","fmla":"+- hc sdx2 0"},{"name":"sx6","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc 0 sdy3"},{"name":"sy4","fmla":"+- vc sdy3 0"},{"name":"sy5","fmla":"+- vc sdy2 0"},{"name":"sy6","fmla":"+- vc sdy1 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy3"}]},{"c":"L","pts":[{"x":"x1","y":"hd4"}]},{"c":"L","pts":[{"x":"sx2","y":"sy2"}]},{"c":"L","pts":[{"x":"wd4","y":"y1"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx4","y":"sy1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"sx5","y":"sy2"}]},{"c":"L","pts":[{"x":"x4","y":"hd4"}]},{"c":"L","pts":[{"x":"sx6","y":"sy3"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx6","y":"sy4"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"sx5","y":"sy5"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"sx4","y":"sy6"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx3","y":"sy6"}]},{"c":"L","pts":[{"x":"wd4","y":"y4"}]},{"c":"L","pts":[{"x":"sx2","y":"sy5"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"sx1","y":"sy4"}]},{"c":"Z"}]}]},"star16":{"av":[{"name":"adj","fmla":"val 37500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"*/ wd2 92388 100000"},{"name":"dx2","fmla":"*/ wd2 70711 100000"},{"name":"dx3","fmla":"*/ wd2 38268 100000"},{"name":"dy1","fmla":"*/ hd2 92388 100000"},{"name":"dy2","fmla":"*/ hd2 70711 100000"},{"name":"dy3","fmla":"*/ hd2 38268 100000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc dx3 0"},{"name":"x5","fmla":"+- hc dx2 0"},{"name":"x6","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc 0 dy3"},{"name":"y4","fmla":"+- vc dy3 0"},{"name":"y5","fmla":"+- vc dy2 0"},{"name":"y6","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 98079 100000"},{"name":"sdx2","fmla":"*/ iwd2 83147 100000"},{"name":"sdx3","fmla":"*/ iwd2 55557 100000"},{"name":"sdx4","fmla":"*/ iwd2 19509 100000"},{"name":"sdy1","fmla":"*/ ihd2 98079 100000"},{"name":"sdy2","fmla":"*/ ihd2 83147 100000"},{"name":"sdy3","fmla":"*/ ihd2 55557 100000"},{"name":"sdy4","fmla":"*/ ihd2 19509 100000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc 0 sdx3"},{"name":"sx4","fmla":"+- hc 0 sdx4"},{"name":"sx5","fmla":"+- hc sdx4 0"},{"name":"sx6","fmla":"+- hc sdx3 0"},{"name":"sx7","fmla":"+- hc sdx2 0"},{"name":"sx8","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc 0 sdy3"},{"name":"sy4","fmla":"+- vc 0 sdy4"},{"name":"sy5","fmla":"+- vc sdy4 0"},{"name":"sy6","fmla":"+- vc sdy3 0"},{"name":"sy7","fmla":"+- vc sdy2 0"},{"name":"sy8","fmla":"+- vc sdy1 0"},{"name":"idx","fmla":"cos iwd2 2700000"},{"name":"idy","fmla":"sin ihd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"ib","fmla":"+- vc idy 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy4"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"sx2","y":"sy3"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"sx3","y":"sy2"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"sx4","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx5","y":"sy1"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"sx6","y":"sy2"}]},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"L","pts":[{"x":"sx7","y":"sy3"}]},{"c":"L","pts":[{"x":"x6","y":"y3"}]},{"c":"L","pts":[{"x":"sx8","y":"sy4"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx8","y":"sy5"}]},{"c":"L","pts":[{"x":"x6","y":"y4"}]},{"c":"L","pts":[{"x":"sx7","y":"sy6"}]},{"c":"L","pts":[{"x":"x5","y":"y5"}]},{"c":"L","pts":[{"x":"sx6","y":"sy7"}]},{"c":"L","pts":[{"x":"x4","y":"y6"}]},{"c":"L","pts":[{"x":"sx5","y":"sy8"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx4","y":"sy8"}]},{"c":"L","pts":[{"x":"x3","y":"y6"}]},{"c":"L","pts":[{"x":"sx3","y":"sy7"}]},{"c":"L","pts":[{"x":"x2","y":"y5"}]},{"c":"L","pts":[{"x":"sx2","y":"sy6"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"sx1","y":"sy5"}]},{"c":"Z"}]}]},"star24":{"av":[{"name":"adj","fmla":"val 37500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"cos wd2 900000"},{"name":"dx2","fmla":"cos wd2 1800000"},{"name":"dx3","fmla":"cos wd2 2700000"},{"name":"dx4","fmla":"val wd4"},{"name":"dx5","fmla":"cos wd2 4500000"},{"name":"dy1","fmla":"sin hd2 4500000"},{"name":"dy2","fmla":"sin hd2 3600000"},{"name":"dy3","fmla":"sin hd2 2700000"},{"name":"dy4","fmla":"val hd4"},{"name":"dy5","fmla":"sin hd2 900000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc 0 dx4"},{"name":"x5","fmla":"+- hc 0 dx5"},{"name":"x6","fmla":"+- hc dx5 0"},{"name":"x7","fmla":"+- hc dx4 0"},{"name":"x8","fmla":"+- hc dx3 0"},{"name":"x9","fmla":"+- hc dx2 0"},{"name":"x10","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc 0 dy3"},{"name":"y4","fmla":"+- vc 0 dy4"},{"name":"y5","fmla":"+- vc 0 dy5"},{"name":"y6","fmla":"+- vc dy5 0"},{"name":"y7","fmla":"+- vc dy4 0"},{"name":"y8","fmla":"+- vc dy3 0"},{"name":"y9","fmla":"+- vc dy2 0"},{"name":"y10","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 99144 100000"},{"name":"sdx2","fmla":"*/ iwd2 92388 100000"},{"name":"sdx3","fmla":"*/ iwd2 79335 100000"},{"name":"sdx4","fmla":"*/ iwd2 60876 100000"},{"name":"sdx5","fmla":"*/ iwd2 38268 100000"},{"name":"sdx6","fmla":"*/ iwd2 13053 100000"},{"name":"sdy1","fmla":"*/ ihd2 99144 100000"},{"name":"sdy2","fmla":"*/ ihd2 92388 100000"},{"name":"sdy3","fmla":"*/ ihd2 79335 100000"},{"name":"sdy4","fmla":"*/ ihd2 60876 100000"},{"name":"sdy5","fmla":"*/ ihd2 38268 100000"},{"name":"sdy6","fmla":"*/ ihd2 13053 100000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc 0 sdx3"},{"name":"sx4","fmla":"+- hc 0 sdx4"},{"name":"sx5","fmla":"+- hc 0 sdx5"},{"name":"sx6","fmla":"+- hc 0 sdx6"},{"name":"sx7","fmla":"+- hc sdx6 0"},{"name":"sx8","fmla":"+- hc sdx5 0"},{"name":"sx9","fmla":"+- hc sdx4 0"},{"name":"sx10","fmla":"+- hc sdx3 0"},{"name":"sx11","fmla":"+- hc sdx2 0"},{"name":"sx12","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc 0 sdy3"},{"name":"sy4","fmla":"+- vc 0 sdy4"},{"name":"sy5","fmla":"+- vc 0 sdy5"},{"name":"sy6","fmla":"+- vc 0 sdy6"},{"name":"sy7","fmla":"+- vc sdy6 0"},{"name":"sy8","fmla":"+- vc sdy5 0"},{"name":"sy9","fmla":"+- vc sdy4 0"},{"name":"sy10","fmla":"+- vc sdy3 0"},{"name":"sy11","fmla":"+- vc sdy2 0"},{"name":"sy12","fmla":"+- vc sdy1 0"},{"name":"idx","fmla":"cos iwd2 2700000"},{"name":"idy","fmla":"sin ihd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"ib","fmla":"+- vc idy 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy6"}]},{"c":"L","pts":[{"x":"x1","y":"y5"}]},{"c":"L","pts":[{"x":"sx2","y":"sy5"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"sx3","y":"sy4"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"sx4","y":"sy3"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"L","pts":[{"x":"sx5","y":"sy2"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"L","pts":[{"x":"sx6","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx7","y":"sy1"}]},{"c":"L","pts":[{"x":"x6","y":"y1"}]},{"c":"L","pts":[{"x":"sx8","y":"sy2"}]},{"c":"L","pts":[{"x":"x7","y":"y2"}]},{"c":"L","pts":[{"x":"sx9","y":"sy3"}]},{"c":"L","pts":[{"x":"x8","y":"y3"}]},{"c":"L","pts":[{"x":"sx10","y":"sy4"}]},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"sx11","y":"sy5"}]},{"c":"L","pts":[{"x":"x10","y":"y5"}]},{"c":"L","pts":[{"x":"sx12","y":"sy6"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx12","y":"sy7"}]},{"c":"L","pts":[{"x":"x10","y":"y6"}]},{"c":"L","pts":[{"x":"sx11","y":"sy8"}]},{"c":"L","pts":[{"x":"x9","y":"y7"}]},{"c":"L","pts":[{"x":"sx10","y":"sy9"}]},{"c":"L","pts":[{"x":"x8","y":"y8"}]},{"c":"L","pts":[{"x":"sx9","y":"sy10"}]},{"c":"L","pts":[{"x":"x7","y":"y9"}]},{"c":"L","pts":[{"x":"sx8","y":"sy11"}]},{"c":"L","pts":[{"x":"x6","y":"y10"}]},{"c":"L","pts":[{"x":"sx7","y":"sy12"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx6","y":"sy12"}]},{"c":"L","pts":[{"x":"x5","y":"y10"}]},{"c":"L","pts":[{"x":"sx5","y":"sy11"}]},{"c":"L","pts":[{"x":"x4","y":"y9"}]},{"c":"L","pts":[{"x":"sx4","y":"sy10"}]},{"c":"L","pts":[{"x":"x3","y":"y8"}]},{"c":"L","pts":[{"x":"sx3","y":"sy9"}]},{"c":"L","pts":[{"x":"x2","y":"y7"}]},{"c":"L","pts":[{"x":"sx2","y":"sy8"}]},{"c":"L","pts":[{"x":"x1","y":"y6"}]},{"c":"L","pts":[{"x":"sx1","y":"sy7"}]},{"c":"Z"}]}]},"star32":{"av":[{"name":"adj","fmla":"val 37500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"*/ wd2 98079 100000"},{"name":"dx2","fmla":"*/ wd2 92388 100000"},{"name":"dx3","fmla":"*/ wd2 83147 100000"},{"name":"dx4","fmla":"cos wd2 2700000"},{"name":"dx5","fmla":"*/ wd2 55557 100000"},{"name":"dx6","fmla":"*/ wd2 38268 100000"},{"name":"dx7","fmla":"*/ wd2 19509 100000"},{"name":"dy1","fmla":"*/ hd2 98079 100000"},{"name":"dy2","fmla":"*/ hd2 92388 100000"},{"name":"dy3","fmla":"*/ hd2 83147 100000"},{"name":"dy4","fmla":"sin hd2 2700000"},{"name":"dy5","fmla":"*/ hd2 55557 100000"},{"name":"dy6","fmla":"*/ hd2 38268 100000"},{"name":"dy7","fmla":"*/ hd2 19509 100000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc 0 dx4"},{"name":"x5","fmla":"+- hc 0 dx5"},{"name":"x6","fmla":"+- hc 0 dx6"},{"name":"x7","fmla":"+- hc 0 dx7"},{"name":"x8","fmla":"+- hc dx7 0"},{"name":"x9","fmla":"+- hc dx6 0"},{"name":"x10","fmla":"+- hc dx5 0"},{"name":"x11","fmla":"+- hc dx4 0"},{"name":"x12","fmla":"+- hc dx3 0"},{"name":"x13","fmla":"+- hc dx2 0"},{"name":"x14","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc 0 dy3"},{"name":"y4","fmla":"+- vc 0 dy4"},{"name":"y5","fmla":"+- vc 0 dy5"},{"name":"y6","fmla":"+- vc 0 dy6"},{"name":"y7","fmla":"+- vc 0 dy7"},{"name":"y8","fmla":"+- vc dy7 0"},{"name":"y9","fmla":"+- vc dy6 0"},{"name":"y10","fmla":"+- vc dy5 0"},{"name":"y11","fmla":"+- vc dy4 0"},{"name":"y12","fmla":"+- vc dy3 0"},{"name":"y13","fmla":"+- vc dy2 0"},{"name":"y14","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 99518 100000"},{"name":"sdx2","fmla":"*/ iwd2 95694 100000"},{"name":"sdx3","fmla":"*/ iwd2 88192 100000"},{"name":"sdx4","fmla":"*/ iwd2 77301 100000"},{"name":"sdx5","fmla":"*/ iwd2 63439 100000"},{"name":"sdx6","fmla":"*/ iwd2 47140 100000"},{"name":"sdx7","fmla":"*/ iwd2 29028 100000"},{"name":"sdx8","fmla":"*/ iwd2 9802 100000"},{"name":"sdy1","fmla":"*/ ihd2 99518 100000"},{"name":"sdy2","fmla":"*/ ihd2 95694 100000"},{"name":"sdy3","fmla":"*/ ihd2 88192 100000"},{"name":"sdy4","fmla":"*/ ihd2 77301 100000"},{"name":"sdy5","fmla":"*/ ihd2 63439 100000"},{"name":"sdy6","fmla":"*/ ihd2 47140 100000"},{"name":"sdy7","fmla":"*/ ihd2 29028 100000"},{"name":"sdy8","fmla":"*/ ihd2 9802 100000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc 0 sdx3"},{"name":"sx4","fmla":"+- hc 0 sdx4"},{"name":"sx5","fmla":"+- hc 0 sdx5"},{"name":"sx6","fmla":"+- hc 0 sdx6"},{"name":"sx7","fmla":"+- hc 0 sdx7"},{"name":"sx8","fmla":"+- hc 0 sdx8"},{"name":"sx9","fmla":"+- hc sdx8 0"},{"name":"sx10","fmla":"+- hc sdx7 0"},{"name":"sx11","fmla":"+- hc sdx6 0"},{"name":"sx12","fmla":"+- hc sdx5 0"},{"name":"sx13","fmla":"+- hc sdx4 0"},{"name":"sx14","fmla":"+- hc sdx3 0"},{"name":"sx15","fmla":"+- hc sdx2 0"},{"name":"sx16","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc 0 sdy3"},{"name":"sy4","fmla":"+- vc 0 sdy4"},{"name":"sy5","fmla":"+- vc 0 sdy5"},{"name":"sy6","fmla":"+- vc 0 sdy6"},{"name":"sy7","fmla":"+- vc 0 sdy7"},{"name":"sy8","fmla":"+- vc 0 sdy8"},{"name":"sy9","fmla":"+- vc sdy8 0"},{"name":"sy10","fmla":"+- vc sdy7 0"},{"name":"sy11","fmla":"+- vc sdy6 0"},{"name":"sy12","fmla":"+- vc sdy5 0"},{"name":"sy13","fmla":"+- vc sdy4 0"},{"name":"sy14","fmla":"+- vc sdy3 0"},{"name":"sy15","fmla":"+- vc sdy2 0"},{"name":"sy16","fmla":"+- vc sdy1 0"},{"name":"idx","fmla":"cos iwd2 2700000"},{"name":"idy","fmla":"sin ihd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"ib","fmla":"+- vc idy 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy8"}]},{"c":"L","pts":[{"x":"x1","y":"y7"}]},{"c":"L","pts":[{"x":"sx2","y":"sy7"}]},{"c":"L","pts":[{"x":"x2","y":"y6"}]},{"c":"L","pts":[{"x":"sx3","y":"sy6"}]},{"c":"L","pts":[{"x":"x3","y":"y5"}]},{"c":"L","pts":[{"x":"sx4","y":"sy5"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"sx5","y":"sy4"}]},{"c":"L","pts":[{"x":"x5","y":"y3"}]},{"c":"L","pts":[{"x":"sx6","y":"sy3"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"sx7","y":"sy2"}]},{"c":"L","pts":[{"x":"x7","y":"y1"}]},{"c":"L","pts":[{"x":"sx8","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx9","y":"sy1"}]},{"c":"L","pts":[{"x":"x8","y":"y1"}]},{"c":"L","pts":[{"x":"sx10","y":"sy2"}]},{"c":"L","pts":[{"x":"x9","y":"y2"}]},{"c":"L","pts":[{"x":"sx11","y":"sy3"}]},{"c":"L","pts":[{"x":"x10","y":"y3"}]},{"c":"L","pts":[{"x":"sx12","y":"sy4"}]},{"c":"L","pts":[{"x":"x11","y":"y4"}]},{"c":"L","pts":[{"x":"sx13","y":"sy5"}]},{"c":"L","pts":[{"x":"x12","y":"y5"}]},{"c":"L","pts":[{"x":"sx14","y":"sy6"}]},{"c":"L","pts":[{"x":"x13","y":"y6"}]},{"c":"L","pts":[{"x":"sx15","y":"sy7"}]},{"c":"L","pts":[{"x":"x14","y":"y7"}]},{"c":"L","pts":[{"x":"sx16","y":"sy8"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx16","y":"sy9"}]},{"c":"L","pts":[{"x":"x14","y":"y8"}]},{"c":"L","pts":[{"x":"sx15","y":"sy10"}]},{"c":"L","pts":[{"x":"x13","y":"y9"}]},{"c":"L","pts":[{"x":"sx14","y":"sy11"}]},{"c":"L","pts":[{"x":"x12","y":"y10"}]},{"c":"L","pts":[{"x":"sx13","y":"sy12"}]},{"c":"L","pts":[{"x":"x11","y":"y11"}]},{"c":"L","pts":[{"x":"sx12","y":"sy13"}]},{"c":"L","pts":[{"x":"x10","y":"y12"}]},{"c":"L","pts":[{"x":"sx11","y":"sy14"}]},{"c":"L","pts":[{"x":"x9","y":"y13"}]},{"c":"L","pts":[{"x":"sx10","y":"sy15"}]},{"c":"L","pts":[{"x":"x8","y":"y14"}]},{"c":"L","pts":[{"x":"sx9","y":"sy16"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx8","y":"sy16"}]},{"c":"L","pts":[{"x":"x7","y":"y14"}]},{"c":"L","pts":[{"x":"sx7","y":"sy15"}]},{"c":"L","pts":[{"x":"x6","y":"y13"}]},{"c":"L","pts":[{"x":"sx6","y":"sy14"}]},{"c":"L","pts":[{"x":"x5","y":"y12"}]},{"c":"L","pts":[{"x":"sx5","y":"sy13"}]},{"c":"L","pts":[{"x":"x4","y":"y11"}]},{"c":"L","pts":[{"x":"sx4","y":"sy12"}]},{"c":"L","pts":[{"x":"x3","y":"y10"}]},{"c":"L","pts":[{"x":"sx3","y":"sy11"}]},{"c":"L","pts":[{"x":"x2","y":"y9"}]},{"c":"L","pts":[{"x":"sx2","y":"sy10"}]},{"c":"L","pts":[{"x":"x1","y":"y8"}]},{"c":"L","pts":[{"x":"sx1","y":"sy9"}]},{"c":"Z"}]}]},"star4":{"av":[{"name":"adj","fmla":"val 12500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx","fmla":"cos iwd2 2700000"},{"name":"sdy","fmla":"sin ihd2 2700000"},{"name":"sx1","fmla":"+- hc 0 sdx"},{"name":"sx2","fmla":"+- hc sdx 0"},{"name":"sy1","fmla":"+- vc 0 sdy"},{"name":"sy2","fmla":"+- vc sdy 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx2","y":"sy1"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx2","y":"sy2"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx1","y":"sy2"}]},{"c":"Z"}]}]},"star5":{"av":[{"name":"adj","fmla":"val 19098"},{"name":"hf","fmla":"val 105146"},{"name":"vf","fmla":"val 110557"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"svc","fmla":"*/ vc  vf 100000"},{"name":"dx1","fmla":"cos swd2 1080000"},{"name":"dx2","fmla":"cos swd2 18360000"},{"name":"dy1","fmla":"sin shd2 1080000"},{"name":"dy2","fmla":"sin shd2 18360000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- svc 0 dy1"},{"name":"y2","fmla":"+- svc 0 dy2"},{"name":"iwd2","fmla":"*/ swd2 a 50000"},{"name":"ihd2","fmla":"*/ shd2 a 50000"},{"name":"sdx1","fmla":"cos iwd2 20520000"},{"name":"sdx2","fmla":"cos iwd2 3240000"},{"name":"sdy1","fmla":"sin ihd2 3240000"},{"name":"sdy2","fmla":"sin ihd2 20520000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc sdx2 0"},{"name":"sx4","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- svc 0 sdy1"},{"name":"sy2","fmla":"+- svc 0 sdy2"},{"name":"sy3","fmla":"+- svc ihd2 0"},{"name":"yAdj","fmla":"+- svc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"sx2","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"sx4","y":"sy2"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"hc","y":"sy3"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"sx1","y":"sy2"}]},{"c":"Z"}]}]},"star6":{"av":[{"name":"adj","fmla":"val 28868"},{"name":"hf","fmla":"val 115470"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"dx1","fmla":"cos swd2 1800000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"y2","fmla":"+- vc hd4 0"},{"name":"iwd2","fmla":"*/ swd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx2","fmla":"*/ iwd2 1 2"},{"name":"sx1","fmla":"+- hc 0 iwd2"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc sdx2 0"},{"name":"sx4","fmla":"+- hc iwd2 0"},{"name":"sdy1","fmla":"sin ihd2 3600000"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc sdy1 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"hd4"}]},{"c":"L","pts":[{"x":"sx2","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"x2","y":"hd4"}]},{"c":"L","pts":[{"x":"sx4","y":"vc"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"sx3","y":"sy2"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx2","y":"sy2"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"sx1","y":"vc"}]},{"c":"Z"}]}]},"star7":{"av":[{"name":"adj","fmla":"val 34601"},{"name":"hf","fmla":"val 102572"},{"name":"vf","fmla":"val 105210"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"swd2","fmla":"*/ wd2 hf 100000"},{"name":"shd2","fmla":"*/ hd2 vf 100000"},{"name":"svc","fmla":"*/ vc  vf 100000"},{"name":"dx1","fmla":"*/ swd2 97493 100000"},{"name":"dx2","fmla":"*/ swd2 78183 100000"},{"name":"dx3","fmla":"*/ swd2 43388 100000"},{"name":"dy1","fmla":"*/ shd2 62349 100000"},{"name":"dy2","fmla":"*/ shd2 22252 100000"},{"name":"dy3","fmla":"*/ shd2 90097 100000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc 0 dx3"},{"name":"x4","fmla":"+- hc dx3 0"},{"name":"x5","fmla":"+- hc dx2 0"},{"name":"x6","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- svc 0 dy1"},{"name":"y2","fmla":"+- svc dy2 0"},{"name":"y3","fmla":"+- svc dy3 0"},{"name":"iwd2","fmla":"*/ swd2 a 50000"},{"name":"ihd2","fmla":"*/ shd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 97493 100000"},{"name":"sdx2","fmla":"*/ iwd2 78183 100000"},{"name":"sdx3","fmla":"*/ iwd2 43388 100000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc 0 sdx3"},{"name":"sx4","fmla":"+- hc sdx3 0"},{"name":"sx5","fmla":"+- hc sdx2 0"},{"name":"sx6","fmla":"+- hc sdx1 0"},{"name":"sdy1","fmla":"*/ ihd2 90097 100000"},{"name":"sdy2","fmla":"*/ ihd2 22252 100000"},{"name":"sdy3","fmla":"*/ ihd2 62349 100000"},{"name":"sy1","fmla":"+- svc 0 sdy1"},{"name":"sy2","fmla":"+- svc 0 sdy2"},{"name":"sy3","fmla":"+- svc sdy3 0"},{"name":"sy4","fmla":"+- svc ihd2 0"},{"name":"yAdj","fmla":"+- svc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"sx1","y":"sy2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx4","y":"sy1"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"L","pts":[{"x":"sx6","y":"sy2"}]},{"c":"L","pts":[{"x":"x6","y":"y2"}]},{"c":"L","pts":[{"x":"sx5","y":"sy3"}]},{"c":"L","pts":[{"x":"x4","y":"y3"}]},{"c":"L","pts":[{"x":"hc","y":"sy4"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"sx2","y":"sy3"}]},{"c":"Z"}]}]},"star8":{"av":[{"name":"adj","fmla":"val 37500"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dx1","fmla":"cos wd2 2700000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"dy1","fmla":"sin hd2 2700000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"iwd2","fmla":"*/ wd2 a 50000"},{"name":"ihd2","fmla":"*/ hd2 a 50000"},{"name":"sdx1","fmla":"*/ iwd2 92388 100000"},{"name":"sdx2","fmla":"*/ iwd2 38268 100000"},{"name":"sdy1","fmla":"*/ ihd2 92388 100000"},{"name":"sdy2","fmla":"*/ ihd2 38268 100000"},{"name":"sx1","fmla":"+- hc 0 sdx1"},{"name":"sx2","fmla":"+- hc 0 sdx2"},{"name":"sx3","fmla":"+- hc sdx2 0"},{"name":"sx4","fmla":"+- hc sdx1 0"},{"name":"sy1","fmla":"+- vc 0 sdy1"},{"name":"sy2","fmla":"+- vc 0 sdy2"},{"name":"sy3","fmla":"+- vc sdy2 0"},{"name":"sy4","fmla":"+- vc sdy1 0"},{"name":"yAdj","fmla":"+- vc 0 ihd2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"sx1","y":"sy2"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"sx2","y":"sy1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"sx3","y":"sy1"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"sx4","y":"sy2"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"sx4","y":"sy3"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"sx3","y":"sy4"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"sx2","y":"sy4"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"L","pts":[{"x":"sx1","y":"sy3"}]},{"c":"Z"}]}]},"straightConnector1":{"paths":[{"fill":"none","cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"stripedRightArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 84375 w ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"x4","fmla":"*/ ss 5 32"},{"name":"dx5","fmla":"*/ ss a2 100000"},{"name":"x5","fmla":"+- r 0 dx5"},{"name":"dy1","fmla":"*/ h a1 200000"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"y2","fmla":"+- vc dy1 0"},{"name":"dx6","fmla":"*/ dy1 dx5 hd2"},{"name":"x6","fmla":"+- r 0 dx6"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"ssd32","y":"y1"}]},{"c":"L","pts":[{"x":"ssd32","y":"y2"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"ssd16","y":"y1"}]},{"c":"L","pts":[{"x":"ssd8","y":"y1"}]},{"c":"L","pts":[{"x":"ssd8","y":"y2"}]},{"c":"L","pts":[{"x":"ssd16","y":"y2"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x5","y":"y1"}]},{"c":"L","pts":[{"x":"x5","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x5","y":"b"}]},{"c":"L","pts":[{"x":"x5","y":"y2"}]},{"c":"L","pts":[{"x":"x4","y":"y2"}]},{"c":"Z"}]}]},"sun":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 12500 adj 46875"},{"name":"g0","fmla":"+- 50000 0 a"},{"name":"g1","fmla":"*/ g0 30274 32768"},{"name":"g2","fmla":"*/ g0 12540 32768"},{"name":"g3","fmla":"+- g1 50000 0"},{"name":"g4","fmla":"+- g2 50000 0"},{"name":"g5","fmla":"+- 50000 0 g1"},{"name":"g6","fmla":"+- 50000 0 g2"},{"name":"g7","fmla":"*/ g0 23170 32768"},{"name":"g8","fmla":"+- 50000 g7 0"},{"name":"g9","fmla":"+- 50000 0 g7"},{"name":"g10","fmla":"*/ g5 3 4"},{"name":"g11","fmla":"*/ g6 3 4"},{"name":"g12","fmla":"+- g10 3662 0"},{"name":"g13","fmla":"+- g11 3662 0"},{"name":"g14","fmla":"+- g11 12500 0"},{"name":"g15","fmla":"+- 100000 0 g10"},{"name":"g16","fmla":"+- 100000 0 g12"},{"name":"g17","fmla":"+- 100000 0 g13"},{"name":"g18","fmla":"+- 100000 0 g14"},{"name":"ox1","fmla":"*/ w 18436 21600"},{"name":"oy1","fmla":"*/ h 3163 21600"},{"name":"ox2","fmla":"*/ w 3163 21600"},{"name":"oy2","fmla":"*/ h 18436 21600"},{"name":"x8","fmla":"*/ w g8 100000"},{"name":"x9","fmla":"*/ w g9 100000"},{"name":"x10","fmla":"*/ w g10 100000"},{"name":"x12","fmla":"*/ w g12 100000"},{"name":"x13","fmla":"*/ w g13 100000"},{"name":"x14","fmla":"*/ w g14 100000"},{"name":"x15","fmla":"*/ w g15 100000"},{"name":"x16","fmla":"*/ w g16 100000"},{"name":"x17","fmla":"*/ w g17 100000"},{"name":"x18","fmla":"*/ w g18 100000"},{"name":"x19","fmla":"*/ w a 100000"},{"name":"wR","fmla":"*/ w g0 100000"},{"name":"hR","fmla":"*/ h g0 100000"},{"name":"y8","fmla":"*/ h g8 100000"},{"name":"y9","fmla":"*/ h g9 100000"},{"name":"y10","fmla":"*/ h g10 100000"},{"name":"y12","fmla":"*/ h g12 100000"},{"name":"y13","fmla":"*/ h g13 100000"},{"name":"y14","fmla":"*/ h g14 100000"},{"name":"y15","fmla":"*/ h g15 100000"},{"name":"y16","fmla":"*/ h g16 100000"},{"name":"y17","fmla":"*/ h g17 100000"},{"name":"y18","fmla":"*/ h g18 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"r","y":"vc"}]},{"c":"L","pts":[{"x":"x15","y":"y18"}]},{"c":"L","pts":[{"x":"x15","y":"y14"}]},{"c":"Z"},{"c":"M","pts":[{"x":"ox1","y":"oy1"}]},{"c":"L","pts":[{"x":"x16","y":"y13"}]},{"c":"L","pts":[{"x":"x17","y":"y12"}]},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x18","y":"y10"}]},{"c":"L","pts":[{"x":"x14","y":"y10"}]},{"c":"Z"},{"c":"M","pts":[{"x":"ox2","y":"oy1"}]},{"c":"L","pts":[{"x":"x13","y":"y12"}]},{"c":"L","pts":[{"x":"x12","y":"y13"}]},{"c":"Z"},{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"x10","y":"y14"}]},{"c":"L","pts":[{"x":"x10","y":"y18"}]},{"c":"Z"},{"c":"M","pts":[{"x":"ox2","y":"oy2"}]},{"c":"L","pts":[{"x":"x12","y":"y17"}]},{"c":"L","pts":[{"x":"x13","y":"y16"}]},{"c":"Z"},{"c":"M","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"x14","y":"y15"}]},{"c":"L","pts":[{"x":"x18","y":"y15"}]},{"c":"Z"},{"c":"M","pts":[{"x":"ox1","y":"oy2"}]},{"c":"L","pts":[{"x":"x17","y":"y16"}]},{"c":"L","pts":[{"x":"x16","y":"y17"}]},{"c":"Z"},{"c":"M","pts":[{"x":"x19","y":"vc"}]},{"c":"A","wR":"wR","hR":"hR","stAng":"cd2","swAng":"21600000"},{"c":"Z"}]}]},"swooshArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 16667"}],"gd":[{"name":"a1","fmla":"pin 1 adj1 75000"},{"name":"maxAdj2","fmla":"*/ 70000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"ad1","fmla":"*/ h a1 100000"},{"name":"ad2","fmla":"*/ ss a2 100000"},{"name":"xB","fmla":"+- r 0 ad2"},{"name":"yB","fmla":"+- t ssd8 0"},{"name":"alfa","fmla":"*/ cd4 1 14"},{"name":"dx0","fmla":"tan ssd8 alfa"},{"name":"xC","fmla":"+- xB 0 dx0"},{"name":"dx1","fmla":"tan ad1 alfa"},{"name":"yF","fmla":"+- yB ad1 0"},{"name":"xF","fmla":"+- xB dx1 0"},{"name":"xE","fmla":"+- xF dx0 0"},{"name":"yE","fmla":"+- yF ssd8 0"},{"name":"dy2","fmla":"+- yE 0 t"},{"name":"dy22","fmla":"*/ dy2 1 2"},{"name":"dy3","fmla":"*/ h 1 20"},{"name":"yD","fmla":"+- t dy22 dy3"},{"name":"dy4","fmla":"*/ hd6 1 1"},{"name":"yP1","fmla":"+- hd6 dy4 0"},{"name":"xP1","fmla":"val wd6"},{"name":"dy5","fmla":"*/ hd6 1 2"},{"name":"yP2","fmla":"+- yF dy5 0"},{"name":"xP2","fmla":"val wd4"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"Q","pts":[{"x":"xP1","y":"yP1"},{"x":"xB","y":"yB"}]},{"c":"L","pts":[{"x":"xC","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"yD"}]},{"c":"L","pts":[{"x":"xE","y":"yE"}]},{"c":"L","pts":[{"x":"xF","y":"yF"}]},{"c":"Q","pts":[{"x":"xP2","y":"yP2"},{"x":"l","y":"b"}]},{"c":"Z"}]}]},"teardrop":{"av":[{"name":"adj","fmla":"val 100000"}],"gd":[{"name":"a","fmla":"pin 0 adj 200000"},{"name":"r2","fmla":"sqrt 2"},{"name":"tw","fmla":"*/ wd2 r2 1"},{"name":"th","fmla":"*/ hd2 r2 1"},{"name":"sw","fmla":"*/ tw a 100000"},{"name":"sh","fmla":"*/ th a 100000"},{"name":"dx1","fmla":"cos sw 2700000"},{"name":"dy1","fmla":"sin sh 2700000"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc 0 dy1"},{"name":"x2","fmla":"+/ hc x1 2"},{"name":"y2","fmla":"+/ vc y1 2"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd2","swAng":"cd4"},{"c":"Q","pts":[{"x":"x2","y":"t"},{"x":"x1","y":"y1"}]},{"c":"Q","pts":[{"x":"r","y":"y2"},{"x":"r","y":"vc"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"wd2","hR":"hd2","stAng":"cd4","swAng":"cd4"},{"c":"Z"}]}]},"trapezoid":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"maxAdj","fmla":"*/ 50000 w ss"},{"name":"a","fmla":"pin 0 adj maxAdj"},{"name":"x1","fmla":"*/ ss a 200000"},{"name":"x2","fmla":"*/ ss a 100000"},{"name":"x3","fmla":"+- r 0 x2"},{"name":"x4","fmla":"+- r 0 x1"},{"name":"il","fmla":"*/ wd3 a maxAdj"},{"name":"it","fmla":"*/ hd3 a maxAdj"},{"name":"ir","fmla":"+- r 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"x3","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"triangle":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 100000"},{"name":"x1","fmla":"*/ w a 200000"},{"name":"x2","fmla":"*/ w a 100000"},{"name":"x3","fmla":"+- x1 wd2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"Z"}]}]},"upArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 64977"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 100000 h ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss h"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dx1","fmla":"*/ ss a2 100000"},{"name":"dx2","fmla":"*/ ss a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"*/ ss a3 100000"},{"name":"dy2","fmla":"*/ h a4 100000"},{"name":"y2","fmla":"+- b 0 dy2"},{"name":"y3","fmla":"+/ y2 b 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"Z"}]}]},"upDownArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 h ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"y2","fmla":"*/ ss a2 100000"},{"name":"y3","fmla":"+- b 0 y2"},{"name":"dx1","fmla":"*/ w a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"dy1","fmla":"*/ x1 y2 wd2"},{"name":"y1","fmla":"+- y2 0 dy1"},{"name":"y4","fmla":"+- y3 dy1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y3"}]},{"c":"L","pts":[{"x":"x1","y":"y2"}]},{"c":"Z"}]}]},"upDownArrowCallout":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 48123"}],"gd":[{"name":"maxAdj2","fmla":"*/ 50000 w ss"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"maxAdj3","fmla":"*/ 50000 h ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q2","fmla":"*/ a3 ss hd2"},{"name":"maxAdj4","fmla":"+- 100000 0 q2"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"dx1","fmla":"*/ ss a2 100000"},{"name":"dx2","fmla":"*/ ss a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc 0 dx2"},{"name":"x3","fmla":"+- hc dx2 0"},{"name":"x4","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"*/ ss a3 100000"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"dy2","fmla":"*/ h a4 200000"},{"name":"y2","fmla":"+- vc 0 dy2"},{"name":"y3","fmla":"+- vc dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y2"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"x4","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y1"}]},{"c":"L","pts":[{"x":"x3","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y3"}]},{"c":"L","pts":[{"x":"x3","y":"y4"}]},{"c":"L","pts":[{"x":"x4","y":"y4"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"x1","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y4"}]},{"c":"L","pts":[{"x":"x2","y":"y3"}]},{"c":"L","pts":[{"x":"l","y":"y3"}]},{"c":"Z"}]}]},"uturnArrow":{"av":[{"name":"adj1","fmla":"val 25000"},{"name":"adj2","fmla":"val 25000"},{"name":"adj3","fmla":"val 25000"},{"name":"adj4","fmla":"val 43750"},{"name":"adj5","fmla":"val 75000"}],"gd":[{"name":"a2","fmla":"pin 0 adj2 25000"},{"name":"maxAdj1","fmla":"*/ a2 2 1"},{"name":"a1","fmla":"pin 0 adj1 maxAdj1"},{"name":"q2","fmla":"*/ a1 ss h"},{"name":"q3","fmla":"+- 100000 0 q2"},{"name":"maxAdj3","fmla":"*/ q3 h ss"},{"name":"a3","fmla":"pin 0 adj3 maxAdj3"},{"name":"q1","fmla":"+- a3 a1 0"},{"name":"minAdj5","fmla":"*/ q1 ss h"},{"name":"a5","fmla":"pin minAdj5 adj5 100000"},{"name":"th","fmla":"*/ ss a1 100000"},{"name":"aw2","fmla":"*/ ss a2 100000"},{"name":"th2","fmla":"*/ th 1 2"},{"name":"dh2","fmla":"+- aw2 0 th2"},{"name":"y5","fmla":"*/ h a5 100000"},{"name":"ah","fmla":"*/ ss a3 100000"},{"name":"y4","fmla":"+- y5 0 ah"},{"name":"x9","fmla":"+- r 0 dh2"},{"name":"bw","fmla":"*/ x9 1 2"},{"name":"bs","fmla":"min bw y4"},{"name":"maxAdj4","fmla":"*/ bs 100000 ss"},{"name":"a4","fmla":"pin 0 adj4 maxAdj4"},{"name":"bd","fmla":"*/ ss a4 100000"},{"name":"bd3","fmla":"+- bd 0 th"},{"name":"bd2","fmla":"max bd3 0"},{"name":"x3","fmla":"+- th bd2 0"},{"name":"x8","fmla":"+- r 0 aw2"},{"name":"x6","fmla":"+- x8 0 aw2"},{"name":"x7","fmla":"+- x6 dh2 0"},{"name":"x4","fmla":"+- x9 0 bd"},{"name":"x5","fmla":"+- x7 0 bd2"},{"name":"cx","fmla":"+/ th x7 2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"bd"}]},{"c":"A","wR":"bd","hR":"bd","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x4","y":"t"}]},{"c":"A","wR":"bd","hR":"bd","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"x9","y":"y4"}]},{"c":"L","pts":[{"x":"r","y":"y4"}]},{"c":"L","pts":[{"x":"x8","y":"y5"}]},{"c":"L","pts":[{"x":"x6","y":"y4"}]},{"c":"L","pts":[{"x":"x7","y":"y4"}]},{"c":"L","pts":[{"x":"x7","y":"x3"}]},{"c":"A","wR":"bd2","hR":"bd2","stAng":"0","swAng":"-5400000"},{"c":"L","pts":[{"x":"x3","y":"th"}]},{"c":"A","wR":"bd2","hR":"bd2","stAng":"3cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"th","y":"b"}]},{"c":"Z"}]}]},"verticalScroll":{"av":[{"name":"adj","fmla":"val 12500"}],"gd":[{"name":"a","fmla":"pin 0 adj 25000"},{"name":"ch","fmla":"*/ ss a 100000"},{"name":"ch2","fmla":"*/ ch 1 2"},{"name":"ch4","fmla":"*/ ch 1 4"},{"name":"x3","fmla":"+- ch ch2 0"},{"name":"x4","fmla":"+- ch ch 0"},{"name":"x6","fmla":"+- r 0 ch"},{"name":"x7","fmla":"+- r 0 ch2"},{"name":"x5","fmla":"+- x6 0 ch2"},{"name":"y3","fmla":"+- b 0 ch"},{"name":"y4","fmla":"+- b 0 ch2"}],"paths":[{"stroke":"false","cmds":[{"c":"M","pts":[{"x":"ch2","y":"b"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"ch2","y":"y4"}]},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd4","swAng":"-10800000"},{"c":"L","pts":[{"x":"ch","y":"y3"}]},{"c":"L","pts":[{"x":"ch","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x7","y":"t"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x6","y":"ch"}]},{"c":"L","pts":[{"x":"x6","y":"y4"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"Z"},{"c":"M","pts":[{"x":"x4","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd4","swAng":"cd2"},{"c":"Z"}]},{"fill":"darkenLess","stroke":"false","cmds":[{"c":"M","pts":[{"x":"x4","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd4","swAng":"cd2"},{"c":"Z"},{"c":"M","pts":[{"x":"ch","y":"y4"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"3cd4"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"3cd4","swAng":"cd2"},{"c":"Z"}]},{"fill":"none","cmds":[{"c":"M","pts":[{"x":"ch","y":"y3"}]},{"c":"L","pts":[{"x":"ch","y":"ch2"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x7","y":"t"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x6","y":"ch"}]},{"c":"L","pts":[{"x":"x6","y":"y4"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"ch2","y":"b"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"cd2"},{"c":"Z"},{"c":"M","pts":[{"x":"x3","y":"t"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"3cd4","swAng":"cd2"},{"c":"A","wR":"ch4","hR":"ch4","stAng":"cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"x4","y":"ch2"}]},{"c":"M","pts":[{"x":"x6","y":"ch"}]},{"c":"L","pts":[{"x":"x3","y":"ch"}]},{"c":"M","pts":[{"x":"ch2","y":"y3"}]},{"c":"A","wR":"ch4","hR":"ch4","stAng":"3cd4","swAng":"cd2"},{"c":"L","pts":[{"x":"ch","y":"y4"}]},{"c":"M","pts":[{"x":"ch2","y":"b"}]},{"c":"A","wR":"ch2","hR":"ch2","stAng":"cd4","swAng":"-5400000"},{"c":"L","pts":[{"x":"ch","y":"y3"}]}]}]},"wave":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 20000"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"dx1","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs dx1"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx5","fmla":"?: of2 of2 0"},{"name":"x5","fmla":"+- r 0 dx5"},{"name":"dx3","fmla":"+/ dx2 x5 3"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"x4","fmla":"+/ x3 x5 2"},{"name":"x6","fmla":"+- l dx5 0"},{"name":"x10","fmla":"+- r dx2 0"},{"name":"x7","fmla":"+- x6 dx3 0"},{"name":"x8","fmla":"+/ x7 x10 2"},{"name":"x9","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc dx1 0"},{"name":"xAdj2","fmla":"+- hc 0 dx1"},{"name":"il","fmla":"max x2 x6"},{"name":"ir","fmla":"min x5 x10"},{"name":"it","fmla":"*/ h a1 50000"},{"name":"ib","fmla":"+- b 0 it"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y2"},{"x":"x4","y":"y3"},{"x":"x5","y":"y1"}]},{"c":"L","pts":[{"x":"x10","y":"y4"}]},{"c":"C","pts":[{"x":"x8","y":"y6"},{"x":"x7","y":"y5"},{"x":"x6","y":"y4"}]},{"c":"Z"}]}]},"wedgeEllipseCallout":{"av":[{"name":"adj1","fmla":"val -20833"},{"name":"adj2","fmla":"val 62500"}],"gd":[{"name":"dxPos","fmla":"*/ w adj1 100000"},{"name":"dyPos","fmla":"*/ h adj2 100000"},{"name":"xPos","fmla":"+- hc dxPos 0"},{"name":"yPos","fmla":"+- vc dyPos 0"},{"name":"sdx","fmla":"*/ dxPos h 1"},{"name":"sdy","fmla":"*/ dyPos w 1"},{"name":"pang","fmla":"at2 sdx sdy"},{"name":"stAng","fmla":"+- pang 660000 0"},{"name":"enAng","fmla":"+- pang 0 660000"},{"name":"dx1","fmla":"cos wd2 stAng"},{"name":"dy1","fmla":"sin hd2 stAng"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"dx2","fmla":"cos wd2 enAng"},{"name":"dy2","fmla":"sin hd2 enAng"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"stAng1","fmla":"at2 dx1 dy1"},{"name":"enAng1","fmla":"at2 dx2 dy2"},{"name":"swAng1","fmla":"+- enAng1 0 stAng1"},{"name":"swAng2","fmla":"+- swAng1 21600000 0"},{"name":"swAng","fmla":"?: swAng1 swAng1 swAng2"},{"name":"idx","fmla":"cos wd2 2700000"},{"name":"idy","fmla":"sin hd2 2700000"},{"name":"il","fmla":"+- hc 0 idx"},{"name":"ir","fmla":"+- hc idx 0"},{"name":"it","fmla":"+- vc 0 idy"},{"name":"ib","fmla":"+- vc idy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"xPos","y":"yPos"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng1","swAng":"swAng"},{"c":"Z"}]}]},"wedgeRectCallout":{"av":[{"name":"adj1","fmla":"val -20833"},{"name":"adj2","fmla":"val 62500"}],"gd":[{"name":"dxPos","fmla":"*/ w adj1 100000"},{"name":"dyPos","fmla":"*/ h adj2 100000"},{"name":"xPos","fmla":"+- hc dxPos 0"},{"name":"yPos","fmla":"+- vc dyPos 0"},{"name":"dx","fmla":"+- xPos 0 hc"},{"name":"dy","fmla":"+- yPos 0 vc"},{"name":"dq","fmla":"*/ dxPos h w"},{"name":"ady","fmla":"abs dyPos"},{"name":"adq","fmla":"abs dq"},{"name":"dz","fmla":"+- ady 0 adq"},{"name":"xg1","fmla":"?: dxPos 7 2"},{"name":"xg2","fmla":"?: dxPos 10 5"},{"name":"x1","fmla":"*/ w xg1 12"},{"name":"x2","fmla":"*/ w xg2 12"},{"name":"yg1","fmla":"?: dyPos 7 2"},{"name":"yg2","fmla":"?: dyPos 10 5"},{"name":"y1","fmla":"*/ h yg1 12"},{"name":"y2","fmla":"*/ h yg2 12"},{"name":"t1","fmla":"?: dxPos l xPos"},{"name":"xl","fmla":"?: dz l t1"},{"name":"t2","fmla":"?: dyPos x1 xPos"},{"name":"xt","fmla":"?: dz t2 x1"},{"name":"t3","fmla":"?: dxPos xPos r"},{"name":"xr","fmla":"?: dz r t3"},{"name":"t4","fmla":"?: dyPos xPos x1"},{"name":"xb","fmla":"?: dz t4 x1"},{"name":"t5","fmla":"?: dxPos y1 yPos"},{"name":"yl","fmla":"?: dz y1 t5"},{"name":"t6","fmla":"?: dyPos t yPos"},{"name":"yt","fmla":"?: dz t6 t"},{"name":"t7","fmla":"?: dxPos yPos y1"},{"name":"yr","fmla":"?: dz y1 t7"},{"name":"t8","fmla":"?: dyPos yPos b"},{"name":"yb","fmla":"?: dz t8 b"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"xt","y":"yt"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"xr","y":"yr"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"xb","y":"yb"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"xl","y":"yl"}]},{"c":"L","pts":[{"x":"l","y":"y1"}]},{"c":"Z"}]}]},"wedgeRoundRectCallout":{"av":[{"name":"adj1","fmla":"val -20833"},{"name":"adj2","fmla":"val 62500"},{"name":"adj3","fmla":"val 16667"}],"gd":[{"name":"dxPos","fmla":"*/ w adj1 100000"},{"name":"dyPos","fmla":"*/ h adj2 100000"},{"name":"xPos","fmla":"+- hc dxPos 0"},{"name":"yPos","fmla":"+- vc dyPos 0"},{"name":"dq","fmla":"*/ dxPos h w"},{"name":"ady","fmla":"abs dyPos"},{"name":"adq","fmla":"abs dq"},{"name":"dz","fmla":"+- ady 0 adq"},{"name":"xg1","fmla":"?: dxPos 7 2"},{"name":"xg2","fmla":"?: dxPos 10 5"},{"name":"x1","fmla":"*/ w xg1 12"},{"name":"x2","fmla":"*/ w xg2 12"},{"name":"yg1","fmla":"?: dyPos 7 2"},{"name":"yg2","fmla":"?: dyPos 10 5"},{"name":"y1","fmla":"*/ h yg1 12"},{"name":"y2","fmla":"*/ h yg2 12"},{"name":"t1","fmla":"?: dxPos l xPos"},{"name":"xl","fmla":"?: dz l t1"},{"name":"t2","fmla":"?: dyPos x1 xPos"},{"name":"xt","fmla":"?: dz t2 x1"},{"name":"t3","fmla":"?: dxPos xPos r"},{"name":"xr","fmla":"?: dz r t3"},{"name":"t4","fmla":"?: dyPos xPos x1"},{"name":"xb","fmla":"?: dz t4 x1"},{"name":"t5","fmla":"?: dxPos y1 yPos"},{"name":"yl","fmla":"?: dz y1 t5"},{"name":"t6","fmla":"?: dyPos t yPos"},{"name":"yt","fmla":"?: dz t6 t"},{"name":"t7","fmla":"?: dxPos yPos y1"},{"name":"yr","fmla":"?: dz y1 t7"},{"name":"t8","fmla":"?: dyPos yPos b"},{"name":"yb","fmla":"?: dz t8 b"},{"name":"u1","fmla":"*/ ss adj3 100000"},{"name":"u2","fmla":"+- r 0 u1"},{"name":"v2","fmla":"+- b 0 u1"},{"name":"il","fmla":"*/ u1 29289 100000"},{"name":"ir","fmla":"+- r 0 il"},{"name":"ib","fmla":"+- b 0 il"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"u1"}]},{"c":"A","wR":"u1","hR":"u1","stAng":"cd2","swAng":"cd4"},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"xt","y":"yt"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"u2","y":"t"}]},{"c":"A","wR":"u1","hR":"u1","stAng":"3cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"xr","y":"yr"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"v2"}]},{"c":"A","wR":"u1","hR":"u1","stAng":"0","swAng":"cd4"},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"xb","y":"yb"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"u1","y":"b"}]},{"c":"A","wR":"u1","hR":"u1","stAng":"cd4","swAng":"cd4"},{"c":"L","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"xl","y":"yl"}]},{"c":"L","pts":[{"x":"l","y":"y1"}]},{"c":"Z"}]}]},"textArchDown":{"av":[{"name":"adj","fmla":"val 0"}],"gd":[{"name":"adval","fmla":"pin 0 adj 21599999"},{"name":"v1","fmla":"+- 10800000 0 adval"},{"name":"v2","fmla":"+- 32400000 0 adval"},{"name":"nv1","fmla":"+- 0 0 v1"},{"name":"stAng","fmla":"?: nv1 v2 v1"},{"name":"w1","fmla":"+- 5400000 0 adval"},{"name":"w2","fmla":"+- 16200000 0 adval"},{"name":"d1","fmla":"+- adval 0 stAng"},{"name":"d2","fmla":"+- d1 0 21600000"},{"name":"v3","fmla":"+- 0 0 10800000"},{"name":"c2","fmla":"?: w2 d1 d2"},{"name":"c1","fmla":"?: v1 d2 c2"},{"name":"c0","fmla":"?: w1 d1 c1"},{"name":"swAng","fmla":"?: stAng c0 v3"},{"name":"wt1","fmla":"sin wd2 adj"},{"name":"ht1","fmla":"cos hd2 adj"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"wt2","fmla":"sin wd2 stAng"},{"name":"ht2","fmla":"cos hd2 stAng"},{"name":"dx2","fmla":"cat2 wd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 hd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"}]}]},"textArchDownPour":{"av":[{"name":"adj1","fmla":"val 0"},{"name":"adj2","fmla":"val 25000"}],"gd":[{"name":"adval","fmla":"pin 0 adj1 21599999"},{"name":"v1","fmla":"+- 10800000 0 adval"},{"name":"v2","fmla":"+- 32400000 0 adval"},{"name":"nv1","fmla":"+- 0 0 v1"},{"name":"stAng","fmla":"?: nv1 v2 v1"},{"name":"w1","fmla":"+- 5400000 0 adval"},{"name":"w2","fmla":"+- 16200000 0 adval"},{"name":"d1","fmla":"+- adval 0 stAng"},{"name":"d2","fmla":"+- d1 0 21600000"},{"name":"v3","fmla":"+- 0 0 10800000"},{"name":"c2","fmla":"?: w2 d1 d2"},{"name":"c1","fmla":"?: v1 d2 c2"},{"name":"c0","fmla":"?: w1 d1 c1"},{"name":"swAng","fmla":"?: stAng c0 v3"},{"name":"wt1","fmla":"sin wd2 stAng"},{"name":"ht1","fmla":"cos hd2 stAng"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"adval2","fmla":"pin 0 adj2 99000"},{"name":"ratio","fmla":"*/ adval2 1 100000"},{"name":"iwd2","fmla":"*/ wd2 ratio 1"},{"name":"ihd2","fmla":"*/ hd2 ratio 1"},{"name":"wt2","fmla":"sin iwd2 adval"},{"name":"ht2","fmla":"cos ihd2 adval"},{"name":"dx2","fmla":"cat2 iwd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 ihd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"wt3","fmla":"sin iwd2 stAng"},{"name":"ht3","fmla":"cos ihd2 stAng"},{"name":"dx3","fmla":"cat2 iwd2 ht3 wt3"},{"name":"dy3","fmla":"sat2 ihd2 ht3 wt3"},{"name":"x3","fmla":"+- hc dx3 0"},{"name":"y3","fmla":"+- vc dy3 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x3","y":"y3"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"stAng","swAng":"swAng"}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stAng","swAng":"swAng"}]}]},"textArchUp":{"av":[{"name":"adj","fmla":"val cd2"}],"gd":[{"name":"adval","fmla":"pin 0 adj 21599999"},{"name":"v1","fmla":"+- 10800000 0 adval"},{"name":"v2","fmla":"+- 32400000 0 adval"},{"name":"end","fmla":"?: v1 v1 v2"},{"name":"w1","fmla":"+- 5400000 0 adval"},{"name":"w2","fmla":"+- 16200000 0 adval"},{"name":"d1","fmla":"+- end 0 adval"},{"name":"d2","fmla":"+- 21600000 d1 0"},{"name":"c2","fmla":"?: w2 d1 d2"},{"name":"c1","fmla":"?: v1 d2 c2"},{"name":"swAng","fmla":"?: w1 d1 c1"},{"name":"wt1","fmla":"sin wd2 adj"},{"name":"ht1","fmla":"cos hd2 adj"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"adval","swAng":"swAng"}]}]},"textArchUpPour":{"av":[{"name":"adj1","fmla":"val cd2"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"adval","fmla":"pin 0 adj1 21599999"},{"name":"v1","fmla":"+- 10800000 0 adval"},{"name":"v2","fmla":"+- 32400000 0 adval"},{"name":"end","fmla":"?: v1 v1 v2"},{"name":"w1","fmla":"+- 5400000 0 adval"},{"name":"w2","fmla":"+- 16200000 0 adval"},{"name":"d1","fmla":"+- end 0 adval"},{"name":"d2","fmla":"+- 21600000 d1 0"},{"name":"c2","fmla":"?: w2 d1 d2"},{"name":"c1","fmla":"?: v1 d2 c2"},{"name":"swAng","fmla":"?: w1 d1 c1"},{"name":"wt1","fmla":"sin wd2 adval"},{"name":"ht1","fmla":"cos hd2 adval"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"adval2","fmla":"pin 0 adj2 99000"},{"name":"ratio","fmla":"*/ adval2 1 100000"},{"name":"iwd2","fmla":"*/ wd2 ratio 1"},{"name":"ihd2","fmla":"*/ hd2 ratio 1"},{"name":"wt2","fmla":"sin iwd2 adval"},{"name":"ht2","fmla":"cos ihd2 adval"},{"name":"dx2","fmla":"cat2 iwd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 ihd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"adval","swAng":"swAng"}]},{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"adval","swAng":"swAng"}]}]},"textButton":{"av":[{"name":"adj","fmla":"val 10800000"}],"gd":[{"name":"adval","fmla":"pin 0 adj 21599999"},{"name":"bot","fmla":"+- 5400000 0 adval"},{"name":"lef","fmla":"+- 10800000 0 adval"},{"name":"top","fmla":"+- 16200000 0 adval"},{"name":"rig","fmla":"+- 21600000 0 adval"},{"name":"c3","fmla":"?: top adval 0"},{"name":"c2","fmla":"?: lef 10800000 c3"},{"name":"c1","fmla":"?: bot rig c2"},{"name":"stAng","fmla":"?: adval c1 0"},{"name":"w1","fmla":"+- 21600000 0 stAng"},{"name":"stAngB","fmla":"?: stAng w1 0"},{"name":"td1","fmla":"*/ bot 2 1"},{"name":"td2","fmla":"*/ top 2 1"},{"name":"ntd2","fmla":"+- 0 0 td2"},{"name":"w2","fmla":"+- 0 0 10800000"},{"name":"c6","fmla":"?: top ntd2 w2"},{"name":"c5","fmla":"?: lef 10800000 c6"},{"name":"c4","fmla":"?: bot td1 c5"},{"name":"v1","fmla":"?: adval c4 10800000"},{"name":"swAngT","fmla":"+- 0 0 v1"},{"name":"stT","fmla":"?: lef stAngB stAng"},{"name":"stB","fmla":"?: lef stAng stAngB"},{"name":"swT","fmla":"?: lef v1 swAngT"},{"name":"swB","fmla":"?: lef swAngT v1"},{"name":"wt1","fmla":"sin wd2 stT"},{"name":"ht1","fmla":"cos hd2 stT"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"wt2","fmla":"sin wd2 stB"},{"name":"ht2","fmla":"cos hd2 stB"},{"name":"dx2","fmla":"cat2 wd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 hd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"wt3","fmla":"sin wd2 adj"},{"name":"ht3","fmla":"cos hd2 adj"},{"name":"dx3","fmla":"cat2 wd2 ht3 wt3"},{"name":"dy3","fmla":"sat2 hd2 ht3 wt3"},{"name":"x3","fmla":"+- hc dx3 0"},{"name":"y3","fmla":"+- vc dy3 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stT","swAng":"swT"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"vc"}]},{"c":"L","pts":[{"x":"r","y":"vc"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stB","swAng":"swB"}]}]},"textButtonPour":{"av":[{"name":"adj1","fmla":"val cd2"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"adval","fmla":"pin 0 adj1 21599999"},{"name":"bot","fmla":"+- 5400000 0 adval"},{"name":"lef","fmla":"+- 10800000 0 adval"},{"name":"top","fmla":"+- 16200000 0 adval"},{"name":"rig","fmla":"+- 21600000 0 adval"},{"name":"c3","fmla":"?: top adval 0"},{"name":"c2","fmla":"?: lef 10800000 c3"},{"name":"c1","fmla":"?: bot rig c2"},{"name":"stAng","fmla":"?: adval c1 0"},{"name":"w1","fmla":"+- 21600000 0 stAng"},{"name":"stAngB","fmla":"?: stAng w1 0"},{"name":"td1","fmla":"*/ bot 2 1"},{"name":"td2","fmla":"*/ top 2 1"},{"name":"ntd2","fmla":"+- 0 0 td2"},{"name":"w2","fmla":"+- 0 0 10800000"},{"name":"c6","fmla":"?: top ntd2 w2"},{"name":"c5","fmla":"?: lef 10800000 c6"},{"name":"c4","fmla":"?: bot td1 c5"},{"name":"v1","fmla":"?: adval c4 10800000"},{"name":"swAngT","fmla":"+- 0 0 v1"},{"name":"stT","fmla":"?: lef stAngB stAng"},{"name":"stB","fmla":"?: lef stAng stAngB"},{"name":"swT","fmla":"?: lef v1 swAngT"},{"name":"swB","fmla":"?: lef swAngT v1"},{"name":"wt1","fmla":"sin wd2 stT"},{"name":"ht1","fmla":"cos hd2 stT"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"wt6","fmla":"sin wd2 stB"},{"name":"ht6","fmla":"cos hd2 stB"},{"name":"dx6","fmla":"cat2 wd2 ht6 wt6"},{"name":"dy6","fmla":"sat2 hd2 ht6 wt6"},{"name":"x6","fmla":"+- hc dx6 0"},{"name":"y6","fmla":"+- vc dy6 0"},{"name":"adval2","fmla":"pin 40000 adj2 99000"},{"name":"ratio","fmla":"*/ adval2 1 100000"},{"name":"iwd2","fmla":"*/ wd2 ratio 1"},{"name":"ihd2","fmla":"*/ hd2 ratio 1"},{"name":"wt2","fmla":"sin iwd2 stT"},{"name":"ht2","fmla":"cos ihd2 stT"},{"name":"dx2","fmla":"cat2 iwd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 ihd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"},{"name":"wt5","fmla":"sin iwd2 stB"},{"name":"ht5","fmla":"cos ihd2 stB"},{"name":"dx5","fmla":"cat2 iwd2 ht5 wt5"},{"name":"dy5","fmla":"sat2 ihd2 ht5 wt5"},{"name":"x5","fmla":"+- hc dx5 0"},{"name":"y5","fmla":"+- vc dy5 0"},{"name":"d1","fmla":"+- hd2 0 ihd2"},{"name":"d12","fmla":"*/ d1 1 2"},{"name":"yu","fmla":"+- vc 0 d12"},{"name":"yd","fmla":"+- vc d12 0"},{"name":"v1","fmla":"*/ d12 d12 1"},{"name":"v2","fmla":"*/ ihd2 ihd2 1"},{"name":"v3","fmla":"*/ v1 1 v2"},{"name":"v4","fmla":"+- 1 0 v3"},{"name":"v5","fmla":"*/ iwd2 iwd2 1"},{"name":"v6","fmla":"*/ v4 v5 1"},{"name":"v7","fmla":"sqrt v6"},{"name":"xl","fmla":"+- hc 0 v7"},{"name":"xr","fmla":"+- hc v7 0"},{"name":"wtadj","fmla":"sin iwd2 adj1"},{"name":"htadj","fmla":"cos ihd2 adj1"},{"name":"dxadj","fmla":"cat2 iwd2 htadj wtadj"},{"name":"dyadj","fmla":"sat2 ihd2 htadj wtadj"},{"name":"xadj","fmla":"+- hc dxadj 0"},{"name":"yadj","fmla":"+- vc dyadj 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stT","swAng":"swT"}]},{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"stT","swAng":"swT"}]},{"cmds":[{"c":"M","pts":[{"x":"xl","y":"yu"}]},{"c":"L","pts":[{"x":"xr","y":"yu"}]}]},{"cmds":[{"c":"M","pts":[{"x":"xl","y":"yd"}]},{"c":"L","pts":[{"x":"xr","y":"yd"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x5","y":"y5"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"stB","swAng":"swB"}]},{"cmds":[{"c":"M","pts":[{"x":"x6","y":"y6"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"stB","swAng":"swB"}]}]},"textCanDown":{"av":[{"name":"adj","fmla":"val 14286"}],"gd":[{"name":"a","fmla":"pin 0 adj 33333"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y0","fmla":"+- t dy 0"},{"name":"y1","fmla":"+- b 0 dy"},{"name":"ncd2","fmla":"*/ cd2 -1 1"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"A","wR":"wd2","hR":"dy","stAng":"cd2","swAng":"ncd2"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"dy","stAng":"cd2","swAng":"ncd2"}]}]},"textCanUp":{"av":[{"name":"adj","fmla":"val 85714"}],"gd":[{"name":"a","fmla":"pin 66667 adj 100000"},{"name":"dy1","fmla":"*/ a h 100000"},{"name":"dy","fmla":"+- h 0 dy1"},{"name":"y0","fmla":"+- t dy1 0"},{"name":"y1","fmla":"+- t dy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"dy","stAng":"cd2","swAng":"cd2"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"A","wR":"wd2","hR":"dy","stAng":"cd2","swAng":"cd2"}]}]},"textCascadeDown":{"av":[{"name":"adj","fmla":"val 44444"}],"gd":[{"name":"a","fmla":"pin 28570 adj 100000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"dy2","fmla":"+- h 0 dy"},{"name":"dy3","fmla":"*/ dy2 1 4"},{"name":"y2","fmla":"+- t dy3 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textCascadeUp":{"av":[{"name":"adj","fmla":"val 44444"}],"gd":[{"name":"a","fmla":"pin 28570 adj 100000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"dy2","fmla":"+- h 0 dy"},{"name":"dy3","fmla":"*/ dy2 1 4"},{"name":"y2","fmla":"+- t dy3 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]}]}]},"textChevron":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"y","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t b y"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"hc","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textChevronInverted":{"av":[{"name":"adj","fmla":"val 75000"}],"gd":[{"name":"a","fmla":"pin 50000 adj 100000"},{"name":"y","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- b 0 y"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"hc","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y"}]}]}]},"textCircle":{"av":[{"name":"adj","fmla":"val 10800000"}],"gd":[{"name":"adval","fmla":"pin 0 adj 21599999"},{"name":"d0","fmla":"+- adval 0 10800000"},{"name":"d1","fmla":"+- 10800000 0 adval"},{"name":"d2","fmla":"+- 21600000 0 adval"},{"name":"d3","fmla":"?: d1 d1 10799999"},{"name":"d4","fmla":"?: d0 d2 d3"},{"name":"swAng","fmla":"*/ d4 2 1"},{"name":"wt1","fmla":"sin wd2 adj"},{"name":"ht1","fmla":"cos hd2 adj"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"adval","swAng":"swAng"}]}]},"textCirclePour":{"av":[{"name":"adj1","fmla":"val cd2"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"adval","fmla":"pin 0 adj1 21599999"},{"name":"d0","fmla":"+- adval 0 10800000"},{"name":"d1","fmla":"+- 10800000 0 adval"},{"name":"d2","fmla":"+- 21600000 0 adval"},{"name":"d3","fmla":"?: d1 d1 10799999"},{"name":"d4","fmla":"?: d0 d2 d3"},{"name":"swAng","fmla":"*/ d4 2 1"},{"name":"wt1","fmla":"sin wd2 adval"},{"name":"ht1","fmla":"cos hd2 adval"},{"name":"dx1","fmla":"cat2 wd2 ht1 wt1"},{"name":"dy1","fmla":"sat2 hd2 ht1 wt1"},{"name":"x1","fmla":"+- hc dx1 0"},{"name":"y1","fmla":"+- vc dy1 0"},{"name":"adval2","fmla":"pin 0 adj2 99000"},{"name":"ratio","fmla":"*/ adval2 1 100000"},{"name":"iwd2","fmla":"*/ wd2 ratio 1"},{"name":"ihd2","fmla":"*/ hd2 ratio 1"},{"name":"wt2","fmla":"sin iwd2 adval"},{"name":"ht2","fmla":"cos ihd2 adval"},{"name":"dx2","fmla":"cat2 iwd2 ht2 wt2"},{"name":"dy2","fmla":"sat2 ihd2 ht2 wt2"},{"name":"x2","fmla":"+- hc dx2 0"},{"name":"y2","fmla":"+- vc dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"y1"}]},{"c":"A","wR":"wd2","hR":"hd2","stAng":"adval","swAng":"swAng"}]},{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y2"}]},{"c":"A","wR":"iwd2","hR":"ihd2","stAng":"adval","swAng":"swAng"}]}]},"textCurveDown":{"av":[{"name":"adj","fmla":"val 45977"}],"gd":[{"name":"a","fmla":"pin 0 adj 56338"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"gd1","fmla":"*/ dy 3 4"},{"name":"gd2","fmla":"*/ dy 5 4"},{"name":"gd3","fmla":"*/ dy 3 8"},{"name":"gd4","fmla":"*/ dy 1 8"},{"name":"gd5","fmla":"+- h 0 gd3"},{"name":"gd6","fmla":"+- gd4 h 0"},{"name":"y0","fmla":"+- t dy 0"},{"name":"y1","fmla":"+- t gd1 0"},{"name":"y2","fmla":"+- t gd2 0"},{"name":"y3","fmla":"+- t gd3 0"},{"name":"y4","fmla":"+- t gd4 0"},{"name":"y5","fmla":"+- t gd5 0"},{"name":"y6","fmla":"+- t gd6 0"},{"name":"x1","fmla":"+- l wd3 0"},{"name":"x2","fmla":"+- r 0 wd3"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"x1","y":"y1"},{"x":"x2","y":"y2"},{"x":"r","y":"y0"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y5"}]},{"c":"C","pts":[{"x":"x1","y":"y6"},{"x":"x2","y":"y6"},{"x":"r","y":"y5"}]}]}]},"textCurveUp":{"av":[{"name":"adj","fmla":"val 45977"}],"gd":[{"name":"a","fmla":"pin 0 adj 56338"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"gd1","fmla":"*/ dy 3 4"},{"name":"gd2","fmla":"*/ dy 5 4"},{"name":"gd3","fmla":"*/ dy 3 8"},{"name":"gd4","fmla":"*/ dy 1 8"},{"name":"gd5","fmla":"+- h 0 gd3"},{"name":"gd6","fmla":"+- gd4 h 0"},{"name":"y0","fmla":"+- t dy 0"},{"name":"y1","fmla":"+- t gd1 0"},{"name":"y2","fmla":"+- t gd2 0"},{"name":"y3","fmla":"+- t gd3 0"},{"name":"y4","fmla":"+- t gd4 0"},{"name":"y5","fmla":"+- t gd5 0"},{"name":"y6","fmla":"+- t gd6 0"},{"name":"x1","fmla":"+- l wd3 0"},{"name":"x2","fmla":"+- r 0 wd3"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y0"}]},{"c":"C","pts":[{"x":"x1","y":"y2"},{"x":"x2","y":"y1"},{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y5"}]},{"c":"C","pts":[{"x":"x1","y":"y6"},{"x":"x2","y":"y6"},{"x":"r","y":"y5"}]}]}]},"textDeflate":{"av":[{"name":"adj","fmla":"val 18750"}],"gd":[{"name":"a","fmla":"pin 0 adj 37500"},{"name":"dy","fmla":"*/ a ss 100000"},{"name":"gd0","fmla":"*/ dy 4 3"},{"name":"gd1","fmla":"+- h 0 gd0"},{"name":"adjY","fmla":"+- t dy 0"},{"name":"y0","fmla":"+- t gd0 0"},{"name":"y1","fmla":"+- t gd1 0"},{"name":"x0","fmla":"+- l wd3 0"},{"name":"x1","fmla":"+- r 0 wd3"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"C","pts":[{"x":"x0","y":"y0"},{"x":"x1","y":"y0"},{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"C","pts":[{"x":"x0","y":"y1"},{"x":"x1","y":"y1"},{"x":"r","y":"b"}]}]}]},"textDeflateBottom":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 6250 adj 100000"},{"name":"dy","fmla":"*/ a ss 100000"},{"name":"dy2","fmla":"+- h 0 dy"},{"name":"y1","fmla":"+- t dy 0"},{"name":"cp","fmla":"+- y1 0 dy2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"Q","pts":[{"x":"hc","y":"cp"},{"x":"r","y":"b"}]}]}]},"textDeflateInflate":{"av":[{"name":"adj","fmla":"val 35000"}],"gd":[{"name":"a","fmla":"pin 5000 adj 95000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"del","fmla":"*/ h 5 100"},{"name":"dh1","fmla":"*/ h 45 100"},{"name":"dh2","fmla":"*/ h 55 100"},{"name":"yh","fmla":"+- dy 0 del"},{"name":"yl","fmla":"+- dy del 0"},{"name":"y3","fmla":"+- yh yh dh1"},{"name":"y4","fmla":"+- yl yl dh2"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"dh1"}]},{"c":"Q","pts":[{"x":"hc","y":"y3"},{"x":"r","y":"dh1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"dh2"}]},{"c":"Q","pts":[{"x":"hc","y":"y4"},{"x":"r","y":"dh2"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textDeflateInflateDeflate":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 3000 adj 47000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"del","fmla":"*/ h 3 100"},{"name":"ey1","fmla":"*/ h 30 100"},{"name":"ey2","fmla":"*/ h 36 100"},{"name":"ey3","fmla":"*/ h 63 100"},{"name":"ey4","fmla":"*/ h 70 100"},{"name":"by","fmla":"+- b 0 dy"},{"name":"yh1","fmla":"+- dy 0 del"},{"name":"yl1","fmla":"+- dy del 0"},{"name":"yh2","fmla":"+- by 0 del"},{"name":"yl2","fmla":"+- by del 0"},{"name":"y1","fmla":"+- yh1 yh1 ey1"},{"name":"y2","fmla":"+- yl1 yl1 ey2"},{"name":"y3","fmla":"+- yh2 yh2 ey3"},{"name":"y4","fmla":"+- yl2 yl2 ey4"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"ey1"}]},{"c":"Q","pts":[{"x":"hc","y":"y1"},{"x":"r","y":"ey1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"ey2"}]},{"c":"Q","pts":[{"x":"hc","y":"y2"},{"x":"r","y":"ey2"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"ey3"}]},{"c":"Q","pts":[{"x":"hc","y":"y3"},{"x":"r","y":"ey3"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"ey4"}]},{"c":"Q","pts":[{"x":"hc","y":"y4"},{"x":"r","y":"ey4"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textDeflateTop":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 93750"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"cp","fmla":"+- y1 dy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"Q","pts":[{"x":"hc","y":"cp"},{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textDoubleWave1":{"av":[{"name":"adj1","fmla":"val 6250"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 12500"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"of","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs of"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx8","fmla":"?: of2 of2 0"},{"name":"x8","fmla":"+- r 0 dx8"},{"name":"dx3","fmla":"+/ dx2 x8 6"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"dx4","fmla":"+/ dx2 x8 3"},{"name":"x4","fmla":"+- x2 dx4 0"},{"name":"x5","fmla":"+/ x2 x8 2"},{"name":"x6","fmla":"+- x5 dx3 0"},{"name":"x7","fmla":"+/ x6 x8 2"},{"name":"x9","fmla":"+- l dx8 0"},{"name":"x15","fmla":"+- r dx2 0"},{"name":"x10","fmla":"+- x9 dx3 0"},{"name":"x11","fmla":"+- x9 dx4 0"},{"name":"x12","fmla":"+/ x9 x15 2"},{"name":"x13","fmla":"+- x12 dx3 0"},{"name":"x14","fmla":"+/ x13 x15 2"},{"name":"x16","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc of 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y2"},{"x":"x4","y":"y3"},{"x":"x5","y":"y1"}]},{"c":"C","pts":[{"x":"x6","y":"y2"},{"x":"x7","y":"y3"},{"x":"x8","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x9","y":"y4"}]},{"c":"C","pts":[{"x":"x10","y":"y5"},{"x":"x11","y":"y6"},{"x":"x12","y":"y4"}]},{"c":"C","pts":[{"x":"x13","y":"y5"},{"x":"x14","y":"y6"},{"x":"x15","y":"y4"}]}]}]},"textFadeDown":{"av":[{"name":"adj","fmla":"val 33333"}],"gd":[{"name":"a","fmla":"pin 0 adj 49999"},{"name":"dx","fmla":"*/ a w 100000"},{"name":"x1","fmla":"+- l dx 0"},{"name":"x2","fmla":"+- r 0 dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]}]}]},"textFadeLeft":{"av":[{"name":"adj","fmla":"val 33333"}],"gd":[{"name":"a","fmla":"pin 0 adj 49999"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"y2","fmla":"+- b 0 dy"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textFadeRight":{"av":[{"name":"adj","fmla":"val 33333"}],"gd":[{"name":"a","fmla":"pin 0 adj 49999"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"y2","fmla":"+- b 0 dy"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]}]},"textFadeUp":{"av":[{"name":"adj","fmla":"val 33333"}],"gd":[{"name":"a","fmla":"pin 0 adj 49999"},{"name":"dx","fmla":"*/ a w 100000"},{"name":"x1","fmla":"+- l dx 0"},{"name":"x2","fmla":"+- r 0 dx"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textInflate":{"av":[{"name":"adj","fmla":"val 18750"}],"gd":[{"name":"a","fmla":"pin 0 adj 20000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"gd","fmla":"*/ dy 1 3"},{"name":"gd0","fmla":"+- 0 0 gd"},{"name":"gd1","fmla":"+- h 0 gd0"},{"name":"ty","fmla":"+- t dy 0"},{"name":"by","fmla":"+- b 0 dy"},{"name":"y0","fmla":"+- t gd0 0"},{"name":"y1","fmla":"+- t gd1 0"},{"name":"x0","fmla":"+- l wd3 0"},{"name":"x1","fmla":"+- r 0 wd3"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"ty"}]},{"c":"C","pts":[{"x":"x0","y":"y0"},{"x":"x1","y":"y0"},{"x":"r","y":"ty"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"by"}]},{"c":"C","pts":[{"x":"x0","y":"y1"},{"x":"x1","y":"y1"},{"x":"r","y":"by"}]}]}]},"textInflateBottom":{"av":[{"name":"adj","fmla":"val 60000"}],"gd":[{"name":"a","fmla":"pin 60000 adj 100000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"ty","fmla":"+- t dy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"ty"}]},{"c":"Q","pts":[{"x":"hc","y":"b"},{"x":"r","y":"ty"}]}]}]},"textInflateTop":{"av":[{"name":"adj","fmla":"val 40000"}],"gd":[{"name":"a","fmla":"pin 0 adj 50000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"ty","fmla":"+- t dy 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"ty"}]},{"c":"Q","pts":[{"x":"hc","y":"t"},{"x":"r","y":"ty"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textPlain":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 30000 adj 70000"},{"name":"mid","fmla":"*/ a w 100000"},{"name":"midDir","fmla":"+- mid 0 hc"},{"name":"dl","fmla":"+- mid 0 l"},{"name":"dr","fmla":"+- r 0 mid"},{"name":"dl2","fmla":"*/ dl 2 1"},{"name":"dr2","fmla":"*/ dr 2 1"},{"name":"dx","fmla":"?: midDir dr2 dl2"},{"name":"xr","fmla":"+- l dx 0"},{"name":"xl","fmla":"+- r 0 dx"},{"name":"tlx","fmla":"?: midDir l xl"},{"name":"trx","fmla":"?: midDir xr r"},{"name":"blx","fmla":"?: midDir xl l"},{"name":"brx","fmla":"?: midDir r xr"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"tlx","y":"t"}]},{"c":"L","pts":[{"x":"trx","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"blx","y":"b"}]},{"c":"L","pts":[{"x":"brx","y":"b"}]}]}]},"textRingInside":{"av":[{"name":"adj","fmla":"val 60000"}],"gd":[{"name":"a","fmla":"pin 50000 adj 99000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y","fmla":"+- t dy 0"},{"name":"r","fmla":"*/ dy 1 2"},{"name":"y1","fmla":"+- t r 0"},{"name":"y2","fmla":"+- b 0 r"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"r","stAng":"10800000","swAng":"21599999"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"A","wR":"wd2","hR":"r","stAng":"10800000","swAng":"21599999"}]}]},"textRingOutside":{"av":[{"name":"adj","fmla":"val 60000"}],"gd":[{"name":"a","fmla":"pin 50000 adj 99000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y","fmla":"+- t dy 0"},{"name":"r","fmla":"*/ dy 1 2"},{"name":"y1","fmla":"+- t r 0"},{"name":"y2","fmla":"+- b 0 r"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"A","wR":"wd2","hR":"r","stAng":"10800000","swAng":"-21599999"}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"A","wR":"wd2","hR":"r","stAng":"10800000","swAng":"-21599999"}]}]},"textSlantDown":{"av":[{"name":"adj","fmla":"val 44445"}],"gd":[{"name":"a","fmla":"pin 28569 adj 100000"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"y2","fmla":"+- b 0 dy"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textSlantUp":{"av":[{"name":"adj","fmla":"val 55555"}],"gd":[{"name":"a","fmla":"pin 0 adj 71431"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"y1","fmla":"+- t dy 0"},{"name":"y2","fmla":"+- b 0 dy"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]}]},"textStop":{"av":[{"name":"adj","fmla":"val 25000"}],"gd":[{"name":"a","fmla":"pin 14286 adj 50000"},{"name":"dx","fmla":"*/ w 1 3"},{"name":"dy","fmla":"*/ a h 100000"},{"name":"x1","fmla":"+- l dx 0"},{"name":"x2","fmla":"+- r 0 dx"},{"name":"y1","fmla":"+- t dy 0"},{"name":"y2","fmla":"+- b 0 dy"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"t"}]},{"c":"L","pts":[{"x":"x2","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y2"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y2"}]}]}]},"textTriangle":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 100000"},{"name":"y","fmla":"*/ a h 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"y"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"b"}]}]}]},"textTriangleInverted":{"av":[{"name":"adj","fmla":"val 50000"}],"gd":[{"name":"a","fmla":"pin 0 adj 100000"},{"name":"y","fmla":"*/ a h 100000"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"t"}]},{"c":"L","pts":[{"x":"r","y":"t"}]}]},{"cmds":[{"c":"M","pts":[{"x":"l","y":"y"}]},{"c":"L","pts":[{"x":"hc","y":"b"}]},{"c":"L","pts":[{"x":"r","y":"y"}]}]}]},"textWave1":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 20000"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"of","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs of"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx5","fmla":"?: of2 of2 0"},{"name":"x5","fmla":"+- r 0 dx5"},{"name":"dx3","fmla":"+/ dx2 x5 3"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"x4","fmla":"+/ x3 x5 2"},{"name":"x6","fmla":"+- l dx5 0"},{"name":"x10","fmla":"+- r dx2 0"},{"name":"x7","fmla":"+- x6 dx3 0"},{"name":"x8","fmla":"+/ x7 x10 2"},{"name":"x9","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc of 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y2"},{"x":"x4","y":"y3"},{"x":"x5","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x6","y":"y4"}]},{"c":"C","pts":[{"x":"x7","y":"y5"},{"x":"x8","y":"y6"},{"x":"x10","y":"y4"}]}]}]},"textWave2":{"av":[{"name":"adj1","fmla":"val 12500"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 20000"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"of","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs of"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx5","fmla":"?: of2 of2 0"},{"name":"x5","fmla":"+- r 0 dx5"},{"name":"dx3","fmla":"+/ dx2 x5 3"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"x4","fmla":"+/ x3 x5 2"},{"name":"x6","fmla":"+- l dx5 0"},{"name":"x10","fmla":"+- r dx2 0"},{"name":"x7","fmla":"+- x6 dx3 0"},{"name":"x8","fmla":"+/ x7 x10 2"},{"name":"x9","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc of 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y3"},{"x":"x4","y":"y2"},{"x":"x5","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x6","y":"y4"}]},{"c":"C","pts":[{"x":"x7","y":"y6"},{"x":"x8","y":"y5"},{"x":"x10","y":"y4"}]}]}]},"textWave4":{"av":[{"name":"adj1","fmla":"val 6250"},{"name":"adj2","fmla":"val 0"}],"gd":[{"name":"a1","fmla":"pin 0 adj1 12500"},{"name":"a2","fmla":"pin -10000 adj2 10000"},{"name":"y1","fmla":"*/ h a1 100000"},{"name":"dy2","fmla":"*/ y1 10 3"},{"name":"y2","fmla":"+- y1 0 dy2"},{"name":"y3","fmla":"+- y1 dy2 0"},{"name":"y4","fmla":"+- b 0 y1"},{"name":"y5","fmla":"+- y4 0 dy2"},{"name":"y6","fmla":"+- y4 dy2 0"},{"name":"of","fmla":"*/ w a2 100000"},{"name":"of2","fmla":"*/ w a2 50000"},{"name":"x1","fmla":"abs of"},{"name":"dx2","fmla":"?: of2 0 of2"},{"name":"x2","fmla":"+- l 0 dx2"},{"name":"dx8","fmla":"?: of2 of2 0"},{"name":"x8","fmla":"+- r 0 dx8"},{"name":"dx3","fmla":"+/ dx2 x8 6"},{"name":"x3","fmla":"+- x2 dx3 0"},{"name":"dx4","fmla":"+/ dx2 x8 3"},{"name":"x4","fmla":"+- x2 dx4 0"},{"name":"x5","fmla":"+/ x2 x8 2"},{"name":"x6","fmla":"+- x5 dx3 0"},{"name":"x7","fmla":"+/ x6 x8 2"},{"name":"x9","fmla":"+- l dx8 0"},{"name":"x15","fmla":"+- r dx2 0"},{"name":"x10","fmla":"+- x9 dx3 0"},{"name":"x11","fmla":"+- x9 dx4 0"},{"name":"x12","fmla":"+/ x9 x15 2"},{"name":"x13","fmla":"+- x12 dx3 0"},{"name":"x14","fmla":"+/ x13 x15 2"},{"name":"x16","fmla":"+- r 0 x1"},{"name":"xAdj","fmla":"+- hc of 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"x2","y":"y1"}]},{"c":"C","pts":[{"x":"x3","y":"y3"},{"x":"x4","y":"y2"},{"x":"x5","y":"y1"}]},{"c":"C","pts":[{"x":"x6","y":"y3"},{"x":"x7","y":"y2"},{"x":"x8","y":"y1"}]}]},{"cmds":[{"c":"M","pts":[{"x":"x9","y":"y4"}]},{"c":"C","pts":[{"x":"x10","y":"y6"},{"x":"x11","y":"y5"},{"x":"x12","y":"y4"}]},{"c":"C","pts":[{"x":"x13","y":"y6"},{"x":"x14","y":"y5"},{"x":"x15","y":"y4"}]}]}]},"upArrow":{"av":[{"name":"adj1","fmla":"val 50000"},{"name":"adj2","fmla":"val 50000"}],"gd":[{"name":"maxAdj2","fmla":"*/ 100000 h ss"},{"name":"a1","fmla":"pin 0 adj1 100000"},{"name":"a2","fmla":"pin 0 adj2 maxAdj2"},{"name":"dy1","fmla":"*/ ss a2 100000"},{"name":"y1","fmla":"+- t dy1 0"},{"name":"dx1","fmla":"*/ w a1 200000"},{"name":"x1","fmla":"+- hc 0 dx1"},{"name":"x2","fmla":"+- hc dx1 0"},{"name":"dy2","fmla":"*/ x1 dy1 wd2"},{"name":"y2","fmla":"+- y1 dy2 0"}],"paths":[{"cmds":[{"c":"M","pts":[{"x":"l","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"y1"}]},{"c":"L","pts":[{"x":"x1","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"b"}]},{"c":"L","pts":[{"x":"x2","y":"y1"}]},{"c":"L","pts":[{"x":"r","y":"y1"}]},{"c":"L","pts":[{"x":"hc","y":"t"}]},{"c":"Z"}]}]}}'), ks = {
  shapes: Cs
}, Ca = 6e4, ft = Math.PI / 180, Ss = {
  cd2: 180 * Ca,
  cd4: 90 * Ca,
  cd8: 45 * Ca,
  "3cd4": 270 * Ca,
  "3cd8": 135 * Ca,
  "5cd8": 225 * Ca,
  "7cd8": 315 * Ca
}, Fs = { dy: "dy1" }, Es = ks.shapes;
function Is(a, t, e) {
  return a < t ? t : a > e ? e : a;
}
function Ds(a, t) {
  const e = Math.min(a, t);
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
    ss: e,
    ...Ss
  };
}
function Ts(a, t) {
  const e = /^(wd|hd|ssd)(\d+)$/.exec(a);
  if (!e) return;
  const n = Number(e[2]);
  return !Number.isFinite(n) || n === 0 ? void 0 : (e[1] === "wd" ? t.w : e[1] === "hd" ? t.h : t.ss) / n;
}
function za(a, t) {
  if (a == null) return 0;
  const e = String(a).trim();
  if (e === "") return 0;
  const n = Number(e);
  if (Number.isFinite(n)) return n;
  let s = e;
  if (!Object.prototype.hasOwnProperty.call(t, s)) {
    const r = Fs[s];
    r && Object.prototype.hasOwnProperty.call(t, r) && (s = r);
  }
  if (Object.prototype.hasOwnProperty.call(t, s)) return t[s];
  const l = Ts(s, t);
  return l === void 0 ? 0 : l;
}
function Cn(a, t) {
  const e = String(a || "").trim().split(/\s+/), n = e[0], s = (r) => za(e[r], t), l = (r) => r / Ca * ft;
  switch (n) {
    case "val":
      return s(1);
    case "*/":
      return s(1) * s(2) / (s(3) || 1);
    case "+-":
      return s(1) + s(2) - s(3);
    case "+/":
      return (s(1) + s(2)) / (s(3) || 1);
    case "?:":
      return s(1) > 0 ? s(2) : s(3);
    case "abs":
      return Math.abs(s(1));
    case "at2":
      return Math.atan2(s(2), s(1)) / ft * Ca;
    case "cos":
      return s(1) * Math.cos(l(s(2)));
    case "sin":
      return s(1) * Math.sin(l(s(2)));
    case "tan":
      return s(1) * Math.tan(l(s(2)));
    case "cat2":
      return s(1) * Math.cos(Math.atan2(s(3), s(2)));
    case "sat2":
      return s(1) * Math.sin(Math.atan2(s(3), s(2)));
    case "max":
      return Math.max(s(1), s(2));
    case "min":
      return Math.min(s(1), s(2));
    case "mod":
      return Math.sqrt(s(1) ** 2 + s(2) ** 2 + s(3) ** 2);
    case "pin":
      return Is(s(2), s(1), s(3));
    case "sqrt":
      return Math.sqrt(Math.max(0, s(1)));
    default:
      return 0;
  }
}
function Ae(a, t, e, n) {
  const s = Ds(t, e);
  for (const l of a.av || []) {
    const r = n ? n[l.name] : void 0;
    s[l.name] = typeof r == "number" && Number.isFinite(r) ? r : Cn(l.fmla, s);
  }
  for (const l of a.gd || [])
    s[l.name] = Cn(l.fmla, s);
  return s;
}
function ba(a) {
  return Number.isFinite(a) ? String(Math.round(a * 1e3) / 1e3) : "0";
}
function Bs(a, t, e, n, s) {
  const l = za(t.wR, e), r = za(t.hR, e), m = l * n, c = r * s, i = za(t.stAng, e) / Ca * ft, d = za(t.swAng, e) / Ca * ft, o = (X) => Math.atan2(l * Math.sin(X), r * Math.cos(X)), x = l === 0 || r === 0, f = x ? i : o(i), y = x ? d : o(i + d) - f, u = x ? 0 : Math.round((d - y) / (2 * Math.PI)), h = y + u * 2 * Math.PI, g = a.x - m * Math.cos(f), v = a.y - c * Math.sin(f), A = Math.abs(m), j = Math.abs(c), $ = Math.max(1, Math.ceil(Math.abs(h) / Math.PI - 1e-9)), k = h / $;
  let S = "", E = f;
  for (let X = 0; X < $; X += 1) {
    E += k;
    const _ = g + m * Math.cos(E), C = v + c * Math.sin(E), w = Math.abs(k / ft) > 180 ? 1 : 0, q = k > 0 ? 1 : 0;
    S += ` A ${ba(A)} ${ba(j)} 0 ${w} ${q} ${ba(_)} ${ba(C)}`;
  }
  return {
    data: S,
    end: { x: g + m * Math.cos(E), y: v + c * Math.sin(E) }
  };
}
function be(a, t, e, n) {
  const s = a.w ? e / a.w : 1, l = a.h ? n / a.h : 1, r = (d) => ({
    x: za(d.x, t) * s,
    y: za(d.y, t) * l
  });
  let m = "", c = { x: 0, y: 0 }, i = !1;
  for (const d of a.cmds || [])
    switch (d.c) {
      case "M": {
        const o = r(d.pts[0]);
        c = o, i = !0, m += `${m ? " " : ""}M ${ba(o.x)} ${ba(o.y)}`;
        break;
      }
      case "L": {
        for (const o of d.pts) {
          const x = r(o);
          c = x, m += ` L ${ba(x.x)} ${ba(x.y)}`;
        }
        break;
      }
      case "C": {
        for (let o = 0; o + 2 < d.pts.length; o += 3) {
          const x = r(d.pts[o]), f = r(d.pts[o + 1]), y = r(d.pts[o + 2]);
          c = y, m += ` C ${ba(x.x)} ${ba(x.y)} ${ba(f.x)} ${ba(f.y)} ${ba(y.x)} ${ba(y.y)}`;
        }
        break;
      }
      case "Q": {
        for (let o = 0; o + 1 < d.pts.length; o += 2) {
          const x = r(d.pts[o]), f = r(d.pts[o + 1]);
          c = f, m += ` Q ${ba(x.x)} ${ba(x.y)} ${ba(f.x)} ${ba(f.y)}`;
        }
        break;
      }
      case "A": {
        if (!i) break;
        const o = Bs(c, d, t, s, l);
        c = o.end, m += o.data;
        break;
      }
      case "Z":
        m += " Z";
        break;
    }
  return m.trim();
}
function Ps(a, t, e, n) {
  const s = Es[a];
  if (!s || !s.paths || s.paths.length === 0) return null;
  const l = Ae(s, t, e, n);
  let r = "", m = "";
  for (const c of s.paths) {
    const i = be(c, l, t, e);
    if (!i) continue;
    const d = c.stroke !== "false" && c.stroke !== "none", o = c.fill !== "none";
    d && (m += `${m ? " " : ""}${i}`), o && (r += `${r ? " " : ""}${i}`);
  }
  return { fill: r, stroke: m };
}
function ve(a, t, e, n) {
  if (!a || !a.paths || a.paths.length === 0) return null;
  const s = Ae(a, t, e, n);
  let l = "";
  for (const r of a.paths) {
    const m = be(r, s, t, e);
    m && (l += `${l ? " " : ""}${m}`);
  }
  return l || null;
}
function Ut(a) {
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
    wmf: "image/x-wmf"
  }[t] || "application/octet-stream";
}
let st = null;
function Os(a) {
  if (!a || typeof a != "object")
    throw new Error("configureMedia(next): next 必须是对象");
  st = a;
}
function Vt(a) {
  if (!st || st[a] === void 0 || st[a] === null)
    throw new Error(
      `media 模块未注入依赖 ${a} —— 调用方必须先 configureMedia({ ${a}, ... })`
    );
  return st[a];
}
const yt = {
  get normalizeFontFamily() {
    return Vt("normalizeFontFamily");
  },
  get measureOfficeGlyph() {
    return Vt("measureOfficeGlyph");
  },
  // ⚠️ vendorBase 允许是 **thunk**（R9.1）：引擎顶层不再建 AssetResolver，
  // 注入方给的是 `() => ensureAssets().vendorBase`，取值时才决定 URL。
  // 另两项（normalizeFontFamily / measureOfficeGlyph）本身就是函数，走原样返回。
  get vendorBase() {
    const a = Vt("vendorBase");
    return typeof a == "function" ? a() : a;
  }
};
async function Ns(a, t) {
  return new Promise((e, n) => {
    const s = new FileReader();
    s.onload = () => e(s.result), s.onerror = () => n(s.error), s.readAsDataURL(new Blob([a], { type: t }));
  });
}
let Le = 0, Re = 0;
function qs() {
  return {
    name: "utif",
    requests: Le,
    unavailable: Re,
    available: typeof globalThis.UTIF < "u"
  };
}
function Zs(a, t, e) {
  if (Le += 1, typeof UTIF > "u")
    return Re += 1, null;
  try {
    const n = a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength), s = UTIF.decode(n), l = s == null ? void 0 : s[0];
    if (!l || (UTIF.decodeImage(n, l, s), !l.width || !l.height)) return null;
    const r = UTIF.toRGBA8(l), m = Math.min(1, t / l.width, e / l.height), c = Math.max(1, Math.round(l.width * m)), i = Math.max(1, Math.round(l.height * m)), d = document.createElement("canvas");
    d.width = c, d.height = i;
    const o = d.getContext("2d", { alpha: !0 });
    if (c === l.width && i === l.height) {
      const x = o.createImageData(c, i);
      x.data.set(r), o.putImageData(x, 0, 0);
    } else {
      const x = document.createElement("canvas");
      x.width = l.width, x.height = l.height;
      const f = x.getContext("2d", { alpha: !0 }), y = f.createImageData(l.width, l.height);
      y.data.set(r), f.putImageData(y, 0, 0), o.drawImage(x, 0, 0, c, i);
    }
    return d.toDataURL("image/png");
  } catch (n) {
    return console.warn("TIFF 转换失败", n), null;
  }
}
const zs = [215, 205, 198, 154];
function kn(a) {
  return a === 134 || a === 128 ? new TextDecoder("gb18030") : a === 136 ? new TextDecoder("big5") : a === 129 ? new TextDecoder("shift_jis") : new TextDecoder("windows-1252");
}
function Hs(a) {
  const t = new DataView(a.buffer, a.byteOffset, a.byteLength);
  let e = 0, n = null;
  if (a.length > 22 && zs.every((m, c) => a[c] === m) && (n = {
    left: t.getInt16(6, !0),
    top: t.getInt16(8, !0),
    right: t.getInt16(10, !0),
    bottom: t.getInt16(12, !0)
  }, e = 22), a.length < e + 18) return null;
  const s = t.getUint16(e + 2, !0), l = [];
  let r = e + s * 2;
  for (; r + 6 <= a.length; ) {
    const m = t.getUint32(r, !0), c = t.getUint16(r + 4, !0);
    if (m < 3 || (l.push({
      func: c,
      data: a.subarray(r + 6, r + m * 2)
    }), c === 0)) break;
    r += m * 2;
  }
  return { records: l, placeable: n };
}
function Sn(a, t) {
  const e = a[t], n = a[t + 1];
  return `#${[a[t + 2], n, e].map((l) => l.toString(16).padStart(2, "0")).join("")}`;
}
function Us(a, t) {
  const e = /[A-Za-z0-9]/;
  let n = 0;
  for (const s of a) n += (e.test(s) ? 0.5 : 1) * t;
  return { width: n, ascent: t, descent: t * 0.25 };
}
function Ws(a) {
  var x, f, y, u;
  const t = Hs(a);
  if (!t) return null;
  const e = (h, g) => h.getInt16(g, !0), n = {
    windowOrg: [0, 0],
    windowExt: null,
    textAlign: 0,
    textColor: "#000000",
    position: [0, 0],
    objects: [],
    lines: [],
    texts: []
  }, s = (h) => String(h).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  for (const { func: h, data: g } of t.records) {
    const v = new DataView(g.buffer, g.byteOffset, g.byteLength);
    switch (h) {
      case 523:
        n.windowOrg = [e(v, 0), e(v, 2)];
        break;
      case 524:
        n.windowExt = [v.getUint16(0, !0), v.getUint16(2, !0)];
        break;
      case 521:
        n.textColor = Sn(g, 0);
        break;
      case 302:
        n.textAlign = v.getUint16(0, !0);
        break;
      case 762: {
        n.objects.push({
          kind: "pen",
          width: Math.abs(v.getInt16(2, !0)) || 1,
          color: Sn(g, 6)
        });
        break;
      }
      case 763: {
        const A = v.getInt16(0, !0), j = g.subarray(18, 50), $ = j.indexOf(0), k = kn(g[13]);
        n.objects.push({
          kind: "font",
          height: Math.abs(A),
          weight: v.getUint16(8, !0),
          italic: g[10],
          underline: g[11],
          strikeout: g[12],
          charset: g[13],
          face: k.decode(j.subarray(0, $ < 0 ? j.length : $)).trim()
        });
        break;
      }
      case 301:
        n.currentObject = n.objects[v.getUint16(0, !0)] || null;
        break;
      case 296:
        break;
      case 532:
        n.position = [e(v, 2), e(v, 0)];
        break;
      case 531: {
        const [A, j] = n.position, $ = e(v, 2), k = e(v, 0), S = ((x = n.currentObject) == null ? void 0 : x.kind) === "pen" ? n.currentObject : { width: 1, color: "#000000" };
        n.lines.push({ x1: A, y1: j, x2: $, y2: k, width: S.width, color: S.color }), n.position = [$, k];
        break;
      }
      case 1313: {
        const A = v.getUint16(0, !0), j = g.subarray(2, 2 + A), $ = e(v, 2 + A + A % 2), k = e(v, 4 + A + A % 2);
        n.texts.push({
          x: k,
          y: $,
          text: new TextDecoder("windows-1252").decode(j),
          font: ((f = n.currentObject) == null ? void 0 : f.kind) === "font" ? n.currentObject : { height: 100, weight: 400, face: "Times New Roman" },
          color: n.textColor
        });
        break;
      }
      case 2610: {
        const A = e(v, 0), j = e(v, 2), $ = v.getUint16(4, !0), k = v.getUint16(6, !0);
        let S = 8;
        k & 6 && (S += 8);
        const E = kn(
          ((y = n.currentObject) == null ? void 0 : y.kind) === "font" ? n.currentObject.charset ?? 1 : 1
        ).decode(g.subarray(S, S + $));
        n.texts.push({
          x: j,
          y: A,
          text: E,
          font: ((u = n.currentObject) == null ? void 0 : u.kind) === "font" ? n.currentObject : { height: 100, weight: 400, face: "Times New Roman" },
          color: n.textColor
        });
        break;
      }
    }
  }
  if (!n.lines.length && !n.texts.length) return null;
  let l = 1 / 0, r = 1 / 0, m = -1 / 0, c = -1 / 0;
  for (const h of n.lines)
    l = Math.min(l, h.x1, h.x2), m = Math.max(m, h.x1, h.x2), r = Math.min(r, h.y1, h.y2), c = Math.max(c, h.y1, h.y2);
  for (const h of n.texts) {
    const g = h.font.height || 100, v = Us(h.text, g), A = h.x - v.width * 0.1;
    l = Math.min(l, A), m = Math.max(m, A + v.width * 1.2), r = Math.min(r, h.y - v.ascent), c = Math.max(c, h.y + v.descent);
  }
  if (!Number.isFinite(l)) return null;
  const i = (m - l) * 0.04 + 1, d = (c - r) * 0.04 + 1;
  l -= i, r -= d, m += i, c += d;
  const o = [
    ...n.lines.map((h) => `<line x1="${h.x1}" y1="${h.y1}" x2="${h.x2}" y2="${h.y2}" stroke="${h.color}" stroke-width="${h.width}"/>`),
    ...n.texts.map((h) => {
      const g = h.font, v = g.weight >= 700 ? "700" : "400", A = yt.normalizeFontFamily(g.face || "Times New Roman", g.weight >= 700);
      return `<text x="${h.x}" y="${h.y}" font-family="${s(A)}" font-size="${g.height}" font-weight="${v}" font-style="${g.italic ? "italic" : "normal"}"${g.underline || g.strikeout ? ` text-decoration="${[g.underline ? "underline" : "", g.strikeout ? "line-through" : ""].filter(Boolean).join(" ")}"` : ""} fill="${h.color}">${s(h.text)}</text>`;
    })
  ].join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${l} ${r} ${m - l} ${c - r}" preserveAspectRatio="none">${o}</svg>`;
}
function Gs(a) {
  try {
    const t = Ws(a);
    if (!t) return null;
    const e = new TextEncoder().encode(t);
    let n = "";
    for (const s of e) n += String.fromCharCode(s);
    return `data:image/svg+xml;base64,${btoa(n)}`;
  } catch (t) {
    return console.warn("WMF 解析失败", t), null;
  }
}
function Xs(a) {
  if (a.length < 88 || a[0] !== 1 || a[40] !== 32 || a[41] !== 69 || a[42] !== 77 || a[43] !== 70) return null;
  const t = new DataView(a.buffer, a.byteOffset, a.byteLength), e = t.getUint32(4, !0), n = [
    t.getInt32(8, !0),
    t.getInt32(12, !0),
    t.getInt32(16, !0),
    t.getInt32(20, !0)
  ], s = [
    t.getInt32(24, !0),
    t.getInt32(28, !0),
    t.getInt32(32, !0),
    t.getInt32(36, !0)
  ], l = [t.getInt32(72, !0), t.getInt32(76, !0)], r = [t.getInt32(80, !0), t.getInt32(84, !0)];
  let m = null;
  if (r[0] > 0 && r[1] > 0 && s[2] > s[0] && s[3] > s[1]) {
    const d = l[0] / r[0], o = l[1] / r[1];
    m = [
      s[0] / 100 * d,
      s[1] / 100 * o,
      s[2] / 100 * d,
      s[3] / 100 * o
    ];
  }
  const c = [];
  let i = e;
  for (; i + 8 <= a.length; ) {
    const d = t.getUint32(i, !0), o = t.getUint32(i + 4, !0);
    if (o < 8 || i + o > a.length || (c.push({ type: d, data: a.subarray(i, i + o) }), d === 14)) break;
    i += o;
  }
  return { records: c, bounds: n, frame: m };
}
function Yt(a, t) {
  const e = a[t], n = a[t + 1], s = a[t + 2];
  return `#${[e, n, s].map((l) => l.toString(16).padStart(2, "0")).join("")}`;
}
function Vs(a, t) {
  let e = "";
  for (let s = 0; s < a.length; s += 32768)
    e += String.fromCharCode.apply(null, a.subarray(s, s + 32768));
  return `data:${t};base64,${btoa(e)}`;
}
function Ys(a, t) {
  const e = new DataView(a.buffer, a.byteOffset, a.byteLength), n = e.getInt16(t + 4, !0), s = e.getInt16(t + 6, !0), l = e.getUint16(t + 10, !0), r = 1 << l, m = new Uint8Array(40 + r * 4), c = new DataView(m.buffer);
  c.setUint32(0, 40, !0), c.setInt32(4, n, !0), c.setInt32(8, s, !0), c.setUint16(12, 1, !0), c.setUint16(14, l, !0), c.setUint32(32, r, !0);
  for (let i = 0; i < r; i += 1) {
    const d = t + 12 + i * 3;
    if (d + 3 > a.length) break;
    m[40 + i * 4] = a[d], m[40 + i * 4 + 1] = a[d + 1], m[40 + i * 4 + 2] = a[d + 2];
  }
  return m;
}
const Qs = { 4: "image/jpeg", 5: "image/png" };
function Ks(a, t, e, n, s) {
  if (t + e > a.length || n + s > a.length) return null;
  const l = new DataView(a.buffer, a.byteOffset, a.byteLength), r = l.getUint32(t, !0), m = l.getUint32(t + 16, !0), c = Qs[m];
  let i, d;
  if (c)
    i = null, d = a.subarray(n, n + s);
  else if (r === 12)
    i = Ys(a, t), d = a.subarray(n, n + s);
  else if (r >= 40)
    i = a.subarray(t, t + e), d = a.subarray(n, n + s);
  else
    return null;
  const o = new Uint8Array((i ? 14 + i.length : 0) + d.length);
  if (i) {
    o[0] = 66, o[1] = 77;
    const x = new DataView(o.buffer);
    x.setUint32(2, o.length, !0), x.setUint32(10, 14 + i.length, !0), o.set(i, 14), o.set(d, 14 + i.length);
  } else
    o.set(d, 0);
  return { url: Vs(o, c || "image/bmp") };
}
const Js = 136, a0 = 238;
function t0(a, t = 0) {
  var w, q;
  const e = Xs(a);
  if (!e) return null;
  const n = e.frame ? e.frame[2] - e.frame[0] : 0, s = n > 1 && t > 0 ? t / n : 0, l = {
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
  }, r = [], m = () => ({
    position: [...l.position],
    textAlign: l.textAlign,
    textColor: l.textColor,
    pen: { ...l.pen },
    brush: { ...l.brush },
    font: l.font
  }), c = (T) => {
    T && (l.position = [...T.position], l.textAlign = T.textAlign, l.textColor = T.textColor, l.pen = { ...T.pen }, l.brush = { ...T.brush }, l.font = T.font);
  }, i = (T) => {
    T === 5 && (l.brush = { color: "#000000", style: 1 }), T === 8 && (l.pen = { width: 1, color: "#000000", style: 5 });
  };
  for (const { type: T, data: I } of e.records) {
    const U = new DataView(I.buffer, I.byteOffset, I.byteLength), N = (z) => U.getInt32(z, !0);
    switch (T) {
      case 9:
      // EMR_SETWINDOWEXTEX — MM_TEXT 下忽略
      case 10:
      // EMR_SETWINDOWORGEX
      case 13:
      // EMR_SETBRUSHORGEX
      case 30:
      // EMR_INTERSECTCLIPRECT
      case 18:
        T === 18 && (l.bkMode = U.getUint32(8, !0));
        break;
      case 14:
        break;
      case 22:
        l.textAlign = U.getUint32(8, !0);
        break;
      case 24:
        l.textColor = Yt(I, 8);
        break;
      case 25:
        break;
      case 33:
        r.push(m());
        break;
      case 34: {
        const z = N(8);
        if (z < 0) {
          const P = r.length + z;
          P >= 0 && (c(r[P]), r.length = P);
        }
        break;
      }
      case 37: {
        const z = U.getUint32(8, !0);
        if (l.objects.has(z)) {
          const P = l.objects.get(z);
          P.kind === "pen" ? l.pen = P : P.kind === "brush" ? l.brush = P : P.kind === "font" && (l.font = P);
        } else
          i(z);
        break;
      }
      case 38: {
        const z = U.getUint32(12, !0);
        l.objects.set(U.getUint32(8, !0), {
          kind: "pen",
          style: z,
          width: Math.abs(N(16)) || 1,
          color: Yt(I, 24)
        });
        break;
      }
      case 39: {
        const z = U.getUint32(12, !0);
        l.objects.set(U.getUint32(8, !0), {
          kind: "brush",
          style: z,
          color: Yt(I, 16)
        });
        break;
      }
      case 40:
        l.objects.delete(U.getUint32(8, !0));
        break;
      case 27:
        l.position = [N(8), N(12)];
        break;
      case 54: {
        const [z, P] = l.position, F = N(8), J = N(12);
        l.pen.style !== 5 && l.lines.push({ x1: z, y1: P, x2: F, y2: J, width: l.pen.width, color: l.pen.color }), l.position = [F, J];
        break;
      }
      case 82: {
        const z = N(12), P = N(28), F = ((q = (w = I.subarray(40, 104)).decode) == null ? void 0 : q.call(w)) ?? new TextDecoder("utf-16le").decode(I.subarray(40, 104));
        l.objects.set(U.getUint32(8, !0), {
          kind: "font",
          height: z < 0 ? -z : Math.round(z * 0.86),
          weight: P,
          italic: I[32],
          underline: I[33],
          strikeout: I[34],
          face: F.split("\0")[0].trim()
        });
        break;
      }
      case 84: {
        const z = U.getUint32(44, !0), P = U.getUint32(48, !0), F = U.getUint32(52, !0), J = U.getUint32(72, !0), K = N(36), Y = N(40);
        if (z === 0 || P + z * 2 > I.length) break;
        const fa = new TextDecoder("utf-16le").decode(
          I.subarray(P, P + z * 2)
        );
        let da = 0, W = null;
        if (J && J + z * 4 <= I.length) {
          W = [];
          for (let ia = 0; ia < z; ia += 1) {
            const p = N(J + ia * 4);
            W.push(p), da += Math.abs(p);
          }
        }
        F & 2 && l.fills.push({
          x: N(56),
          y: N(60),
          w: N(64) - N(56),
          h: N(68) - N(60),
          color: "#ffffff"
        });
        const ta = l.font || { height: 12, weight: 400, face: "Times New Roman" }, ma = (l.textAlign & 1) === 1, Q = ma ? l.position[0] : K, oa = ma ? l.position[1] : Y;
        l.texts.push({
          x: Q,
          y: oa,
          text: fa,
          font: ta,
          color: l.textColor,
          dxs: W || [],
          align: l.textAlign
        }), ma && (l.position = [Q + (da || 0), oa]);
        break;
      }
      case 81: {
        const z = N(24), P = N(28), F = N(72), J = N(76), K = U.getUint32(48, !0);
        if (F <= 0 || J <= 0) break;
        l.bitmaps.push({
          x: z,
          y: P,
          w: F,
          h: J,
          data: I,
          offBmi: K,
          cbBmi: U.getUint32(52, !0),
          offBits: U.getUint32(56, !0),
          cbBits: U.getUint32(60, !0),
          rop3: U.getUint32(68, !0) >>> 16
        });
        break;
      }
      case 76: {
        const z = U.getUint32(40, !0), P = N(24), F = N(28), J = N(32), K = N(36);
        if (J > 0 && K > 0) {
          let Y = null;
          z === 66 ? Y = "#000000" : z === 16711778 ? Y = "#ffffff" : z === 15728673 && (Y = l.brush && l.brush.style !== 1 ? l.brush.color || "#ffffff" : null), Y && l.fills.push({ x: P, y: F, w: J, h: K, color: Y });
        }
        break;
      }
    }
  }
  if (!l.lines.length && !l.texts.length && !l.fills.length && !l.bitmaps.length) return null;
  const d = l.bitmaps.map((T) => {
    T.rop3 !== Js && T.rop3 !== a0 && typeof window < "u" && (window.__pptSdkEmfBitmapLog || (window.__pptSdkEmfBitmapLog = [])).push(`rop3=0x${T.rop3.toString(16)}`);
    const I = Ks(T.data, T.offBmi, T.cbBmi, T.offBits, T.cbBits);
    return I ? `<image x="${T.x}" y="${T.y}" width="${T.w}" height="${T.h}" href="${I.url}" preserveAspectRatio="none"/>` : "";
  }), o = (T) => String(T).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"), x = (T) => yt.normalizeFontFamily(T.face || "Times New Roman", T.weight >= 700), f = (T) => s > 0 ? {
    fontFamily: x(T.font),
    fontSize: T.font.height * s,
    bold: T.font.weight >= 700,
    italic: !!T.font.italic
  } : null, y = (T, I, U) => {
    const N = T.text.charCodeAt(U), z = N >= 55296 && N <= 57343;
    return I && !z ? yt.measureOfficeGlyph(T.text[U], I) / s : Math.abs(T.dxs[U] || 0);
  };
  for (const T of l.texts) {
    const I = f(T), U = T.text.length, N = new Array(U);
    N[0] = T.x;
    for (let z = 0; z < U - 1; z += 1)
      N[z + 1] = N[z] + y(T, I, z);
    T.positions = N, T.advanceTotal = U > 1 ? N[U - 1] - N[0] + y(T, I, U - 2) : 0;
  }
  const u = /* @__PURE__ */ new Map();
  for (const T of l.texts)
    T.text.length < 2 || !T.advanceTotal || (u.has(T.y) || u.set(T.y, []), u.get(T.y).push(T));
  for (const T of u.values()) {
    if (T.length < 2) continue;
    T.sort((U, N) => U.x - N.x);
    let I = null;
    for (const U of T) {
      if (I !== null && Math.abs(U.x - I) <= 1) {
        const N = I - U.x;
        U.x += N;
        for (let z = 0; z < U.positions.length; z += 1) U.positions[z] += N;
      }
      I = U.x + U.advanceTotal;
    }
  }
  const h = [
    // 位图（STRETCHDIBITS）排在填充/线条/文字之前：GDI 按记录顺序绘制，
    // 而这些位图是作为底图贴上去的（image5.emf 里它们之后只有一条 NOP 的 BITBLT）。
    ...d,
    ...l.fills.filter((T) => T.color).map((T) => `<rect x="${T.x}" y="${T.y}" width="${T.w}" height="${T.h}" fill="${T.color}"/>`),
    ...l.lines.map((T) => `<line x1="${T.x1}" y1="${T.y1}" x2="${T.x2}" y2="${T.y2}" stroke="${T.color}" stroke-width="${T.width}"/>`),
    ...l.texts.map((T) => {
      const I = T.font;
      T.align & 6;
      const U = T.align & 24, N = U === 24 || U === 8 ? T.y : T.y + I.height * 0.8, z = [
        `x="${T.x}"`,
        `y="${N}"`,
        `font-family="${o(x(I))}"`,
        `font-size="${I.height}"`,
        `font-weight="${I.weight >= 700 ? "700" : "400"}"`,
        `font-style="${I.italic ? "italic" : "normal"}"`,
        `fill="${T.color}"`
      ];
      (I.underline || I.strikeout) && z.push(`text-decoration="${[I.underline ? "underline" : "", I.strikeout ? "line-through" : ""].filter(Boolean).join(" ")}"`);
      const P = T.dxs;
      if (T.positions && P && P.length === T.text.length && P.some((F) => F !== 0)) {
        const F = [];
        for (let J = 0; J < T.text.length; J += 1)
          F.push(`<tspan x="${T.positions[J]}">${o(T.text[J])}</tspan>`);
        return `<text ${z.join(" ")}>${F.join("")}</text>`;
      }
      if (P && P.length > 0) {
        const F = P.reduce((J, K) => J + Math.abs(K), 0);
        F > 0 && z.push(`textLength="${F}" lengthAdjust="spacing"`);
      }
      return `<text ${z.join(" ")}>${o(T.text)}</text>`;
    })
  ].join(""), [g, v, A, j] = e.bounds;
  let $ = Math.min(g, A), k = Math.min(v, j), S = Math.max(g, A), E = Math.max(v, j);
  if (e.frame) {
    const [T, I, U, N] = e.frame;
    U - T >= 1 && N - I >= 1 && ($ = T, k = I, S = U, E = N);
  }
  const X = S - $, _ = E - k;
  for (const T of l.lines)
    $ = Math.min($, T.x1, T.x2), S = Math.max(S, T.x1, T.x2), k = Math.min(k, T.y1, T.y2), E = Math.max(E, T.y1, T.y2);
  if (S - $ < 1 || E - k < 1) return null;
  const C = Math.max((S - $) / X, (E - k) / _) - 1;
  return C > 0.01 && typeof window < "u" && (window.__pptSdkEmfSpillLog || (window.__pptSdkEmfSpillLog = [])).push(Math.round(C * 1e3) / 10), `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${$} ${k} ${S - $} ${E - k}" preserveAspectRatio="none">${h}</svg>`;
}
function n0(a, t = 0) {
  try {
    const e = t0(a, t);
    if (!e) return null;
    const n = new TextEncoder().encode(e);
    let s = "";
    for (const l of n) s += String.fromCharCode(l);
    return `data:image/svg+xml;base64,${btoa(s)}`;
  } catch (e) {
    return console.warn("EMF 解析失败", e), null;
  }
}
function Fn(a, t, e = !1) {
  if (e) {
    for (let n = a.length - t.length; n >= 0; n -= 1) {
      let s = !0;
      for (let l = 0; l < t.length; l += 1)
        if (a[n + l] !== t[l]) {
          s = !1;
          break;
        }
      if (s) return n;
    }
    return -1;
  }
  for (let n = 0; n <= a.length - t.length; n += 1) {
    let s = !0;
    for (let l = 0; l < t.length; l += 1)
      if (a[n + l] !== t[l]) {
        s = !1;
        break;
      }
    if (s) return n;
  }
  return -1;
}
const e0 = Symbol("optional-capability-unavailable");
function s0({ name: a, load: t }) {
  if (!a.trim())
    throw new Error("createOptionalCapability: name 必须是非空字符串");
  if (typeof t != "function")
    throw new Error(`createOptionalCapability(${a}): load 必须是函数`);
  let e = "idle", n = null, s = null, l = 0, r = 0, m = null;
  function c() {
    return e === "ready" ? Promise.resolve(n) : s || (l += 1, e = "loading", s = (async () => {
      const o = await t();
      return o === e0 ? (e = "idle", s = null, null) : (n = o, e = "ready", s = null, n);
    })().catch((o) => {
      throw s = null, e = "idle", r += 1, m = o instanceof Error ? o.message : String(o), o;
    }), s);
  }
  function i() {
    return {
      name: a,
      state: e,
      attempts: l,
      failures: r,
      unavailable: e === "idle" && l > 0 && r === 0,
      lastError: m
    };
  }
  function d() {
    e = "idle", n = null, s = null, l = 0, r = 0, m = null;
  }
  return {
    get: c,
    stats: i,
    reset: d,
    get state() {
      return e;
    }
  };
}
function l0(a) {
  const t = [37, 80, 68, 70, 45], e = [37, 37, 69, 79, 70], n = Fn(a, t), s = Fn(a, e, !0);
  return n < 0 || s <= n ? null : a.slice(n, s + e.length);
}
const Me = s0({
  name: "pdfjs",
  load: async () => {
    const a = await import(
      /* @vite-ignore */
      new URL("pdf.min.mjs", yt.vendorBase).href
    );
    return a.GlobalWorkerOptions.workerSrc = new URL(
      "pdf.worker.min.mjs",
      yt.vendorBase
    ).href, a;
  }
});
let Ha = null;
function r0(a) {
  if (!a || typeof a != "object" || typeof a.getDocument != "function")
    throw new Error("configurePdfJs(pdfjs): 必须是 pdf.js 模块对象（需要 getDocument()）");
  Ha = a;
}
function $e() {
  return Ha ? "injected" : "vendor";
}
function je() {
  if (!Ha) return "(vendor 路径，由引擎自己设置)";
  const a = Ha.GlobalWorkerOptions && Ha.GlobalWorkerOptions.workerSrc;
  return a ? String(a) : "(未设置)";
}
function m0() {
  return Ha || Me.get();
}
function c0() {
  return Me.stats();
}
async function i0(a, t, e) {
  const l = await (await m0()).getDocument({ data: a }).promise;
  try {
    const r = await l.getPage(1), m = r.getViewport({ scale: 1 }), c = Math.max(
      0.1,
      Math.min(t / m.width, e / m.height)
    ), i = r.getViewport({ scale: c }), d = document.createElement("canvas");
    d.width = Math.max(1, Math.ceil(i.width)), d.height = Math.max(1, Math.ceil(i.height));
    const o = d.getContext("2d", { alpha: !0 });
    return await r.render({
      canvasContext: o,
      viewport: i,
      background: "rgba(0,0,0,0)"
    }).promise, d.toDataURL("image/png");
  } finally {
    await l.destroy();
  }
}
function Nm() {
  return [c0(), qs()];
}
function o0(a) {
  return new Promise((t, e) => {
    const n = new Image();
    n.onload = () => t(n), n.onerror = () => e(new Error(
      `clrChange: 图片解码失败 len=${String(a).length} head=${String(a).slice(0, 60)}`
    )), n.src = a;
  });
}
function En(a) {
  return Number.isFinite(a) && a > 0;
}
async function f0(a, t) {
  if (typeof a != "string" || !t || !t.from || !t.to || typeof document > "u") return null;
  const e = await o0(a), n = e.naturalWidth || e.width, s = e.naturalHeight || e.height;
  if (!En(n) || !En(s)) return null;
  const l = document.createElement("canvas");
  l.width = n, l.height = s;
  const r = l.getContext("2d", { willReadFrequently: !0 });
  if (!r) return null;
  r.drawImage(e, 0, 0);
  const m = r.getImageData(0, 0, n, s), c = m.data, { from: i, to: d } = t, o = Number.isFinite(t.tolerance) ? Math.max(0, t.tolerance) : 0;
  for (let x = 0; x < c.length; x += 4)
    Math.abs(c[x] - i.r) <= o && Math.abs(c[x + 1] - i.g) <= o && Math.abs(c[x + 2] - i.b) <= o && (c[x] = d.r, c[x + 1] = d.g, c[x + 2] = d.b, c[x + 3] = d.a);
  return r.putImageData(m, 0, 0), l.toDataURL("image/png");
}
async function _e(a, t, e = 2048, n = 2048, s = 0, l = null, r = null) {
  if (t === "image/tiff" || t === "image/x-tiff")
    return Zs(a, e, n);
  if (t === "image/x-emf" || t === "image/x-wmf") {
    if (t === "image/x-wmf") {
      const o = Gs(a);
      if (o) return o;
    }
    if (t === "image/x-emf") {
      const o = n0(a, s);
      if (o) return o;
      const x = l0(a);
      if (x)
        try {
          return await i0(x, e, n);
        } catch (f) {
          console.warn("EMF 内嵌 PDF 渲染失败，回退到 GDI 解析", f), r && r({
            code: "media.embedded-pdf-fallback",
            message: `EMF 内嵌 PDF 渲染失败，已回退 GDI 解析（pdf.js 来源=${$e()}、workerSrc=${je()}）：${String(f && f.message || f).slice(0, 200)}`
          });
        }
    }
    if (typeof EmfConverter > "u") return null;
    const d = a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength);
    try {
      return await (t === "image/x-emf" ? EmfConverter.convertEmfToDataUrl : EmfConverter.convertWmfToDataUrl)(d, e, n, { dpiScale: 2 });
    } catch (o) {
      return console.warn(`${t} 转换失败`, o), null;
    }
  }
  const m = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/bmp"], i = m.includes(t) || t === "image/svg+xml" ? await Ns(a, t) : null;
  if (!i || !l || !m.includes(t)) return i;
  try {
    return await f0(i, l) || i;
  } catch (d) {
    return console.warn("clrChange 应用失败，回退到原图", d), i;
  }
}
let lt = null;
function d0(a) {
  if (!a || typeof a != "object")
    throw new Error("configureChart(next): next 必须是对象");
  lt = a;
}
function _a(a) {
  if (!lt || lt[a] === void 0 || lt[a] === null)
    throw new Error(
      `chart 模块未注入依赖 ${a} —— 调用方必须先 configureChart({ ${a}, ... })`
    );
  return lt[a];
}
const ea = {
  get attribute() {
    return _a("attribute");
  },
  get childByName() {
    return _a("childByName");
  },
  get descendantsByName() {
    return _a("descendantsByName");
  },
  get firstDescendant() {
    return _a("firstDescendant");
  },
  get escapeXml() {
    return _a("escapeXml");
  },
  get identityAttributes() {
    return _a("identityAttributes");
  },
  get measureStyledText() {
    return _a("measureStyledText");
  },
  get normalizeFontFamily() {
    return _a("normalizeFontFamily");
  },
  get parseFill() {
    return _a("parseFill");
  },
  get transformAttribute() {
    return _a("transformAttribute");
  },
  get defaultTheme() {
    return _a("defaultTheme");
  }
}, x0 = ["accent1", "accent2", "accent3", "accent4", "accent5", "accent6"], Ce = 18, y0 = 22, h0 = 5.72, p0 = 0.6256, u0 = 0.3611, g0 = 0.6111, In = 0.4222, Dn = 0.9361, Tn = 0.6222, Bn = 0.3722, Qt = 15.65, ke = 1.0667, kt = 2.01, Ga = 0.952, Lt = 1.221, Pn = 0.295, On = 1.5, Kt = 2.25, w0 = 0.75, A0 = 1 / 3, b0 = 0.2, v0 = 1.211, Nn = 6.8, L0 = 0.472, R0 = 0.8889, M0 = 0.5444, $0 = 0.3722, qn = 0.55, j0 = ["barChart", "lineChart", "pieChart", "areaChart", "doughnutChart"], _0 = ["radarChart", "scatterChart", "ofPieChart", "bubbleChart", "stockChart", "surfaceChart"];
function Rt(a, t, e) {
  a && a.diagnostics && typeof a.diagnostics.add == "function" && a.diagnostics.add({ code: t, severity: "warn", message: e });
}
function C0(a, t, e) {
  var X, _, C, w, q, T;
  if (!a) return null;
  const n = ea.firstDescendant(a, "chart"), s = n || a;
  let l = null, r = "", m = null;
  const c = [];
  let i = [];
  const d = j0.filter((I) => ea.firstDescendant(s, I));
  if (d.length > 1 && Rt(
    e,
    "chart.combo",
    `组合图：同时出现 ${d.map((I) => I.replace("Chart", "")).join("/")}`
  ), l = d.length ? d[0].replace("Chart", "") : null, d.length && ea.firstDescendant(s, d[0]), !l) {
    const I = _0.find((U) => ea.firstDescendant(s, U));
    return Rt(
      e,
      "chart.unsupported-type",
      I ? `不支持的图表类型 ${I.replace("Chart", "")}：整图降级为不支持元素` : "图表无类型节点：整图降级为不支持元素"
    ), null;
  }
  l !== "bar" && l !== "line" && Rt(
    e,
    "chart.approximated",
    `图表类型 ${l} 暂无原生渲染，按单系列柱状近似`
  );
  const o = Number(ea.attribute(ea.firstDescendant(s, "defRPr"), "sz", "")), x = Number.isFinite(o) && o > 0 ? o / 100 : Ce, f = ea.firstDescendant(s, "varyColors"), y = f ? ea.attribute(f, "val", "1") !== "0" : !0, u = ea.childByName(n, "legend"), h = u ? {
    pos: ea.attribute(ea.firstDescendant(u, "legendPos"), "val", "r"),
    overlay: ea.attribute(ea.firstDescendant(u, "overlay"), "val", "0") === "1"
  } : null, g = [...ea.descendantsByName(s, "valAx")].map((I) => {
    const U = ea.firstDescendant(I, "numFmt"), N = ea.attribute(U, "sourceLinked", "1") === "1";
    return {
      axPos: ea.attribute(ea.childByName(I, "axPos"), "val", "l"),
      numFmt: U && !N ? ea.attribute(U, "formatCode", "") : "",
      majorGridlines: !!ea.firstDescendant(I, "majorGridlines")
    };
  }), v = !!(g[0] && g[0].majorGridlines), A = ea.firstDescendant(s, "title");
  if (A) {
    const I = ea.firstDescendant(A, "tx");
    if (I) {
      const N = ea.firstDescendant(I, "v");
      N && N.textContent && (r = N.textContent.trim());
    }
    const U = Number(ea.attribute(ea.firstDescendant(A, "defRPr"), "sz", ""));
    Number.isFinite(U) && U > 0 && (m = U / 100);
  }
  const j = ea.firstDescendant(s, "ser");
  if (j) {
    const I = ea.firstDescendant(j, "cat"), U = I ? ea.firstDescendant(I, "strCache") || ea.firstDescendant(I, "numCache") : null;
    U && (i = [...ea.descendantsByName(U, "pt")].map((N) => {
      var z, P;
      return ((P = (z = ea.firstDescendant(N, "v")) == null ? void 0 : z.textContent) == null ? void 0 : P.trim()) || "";
    }).filter((N) => N !== ""));
  }
  const $ = /* @__PURE__ */ new Map();
  [...ea.descendantsByName(s, "valAx")].forEach((I, U) => {
    $.set(ea.attribute(ea.childByName(I, "axId"), "val", ""), U);
  });
  const k = [];
  let S = 0;
  for (const I of d) {
    const U = ea.firstDescendant(s, I), N = I.replace("Chart", ""), z = [...ea.descendantsByName(U, "axId")].map((K) => ea.attribute(K, "val", "")), P = z.length > 1 ? $.get(z[1]) ?? 0 : 0, F = ea.attribute(ea.childByName(U, "marker"), "val", "1") !== "0", J = { type: N, axisIndex: P, seriesIndexes: [] };
    for (const K of ea.descendantsByName(U, "ser")) {
      let Y = "";
      const fa = ea.firstDescendant(K, "tx");
      if (fa) {
        const M = ea.firstDescendant(fa, "strCache") || ea.firstDescendant(fa, "numCache"), B = M ? ea.firstDescendant(M, "pt") : null, O = B ? ea.firstDescendant(B, "v") : null;
        O && O.textContent && (Y = O.textContent.trim());
      }
      const da = ea.firstDescendant(K, "val"), W = da ? ea.firstDescendant(da, "numCache") || ea.firstDescendant(da, "strCache") : null, ta = W && ((_ = (X = ea.childByName(W, "formatCode")) == null ? void 0 : X.textContent) == null ? void 0 : _.trim()) || "", ma = W ? [...ea.descendantsByName(W, "pt")].map((M) => {
        const B = ea.firstDescendant(M, "v"), O = Number(B == null ? void 0 : B.textContent);
        return Number.isFinite(O) ? O : 0;
      }) : [];
      if (!ma.length) continue;
      const Q = ea.parseFill(ea.childByName(K, "spPr"), null, t, null), oa = {};
      for (const M of ea.descendantsByName(K, "dPt")) {
        const B = Number(ea.attribute(ea.childByName(M, "idx"), "val", "")), O = ea.parseFill(ea.childByName(M, "spPr"), null, t, null);
        Number.isInteger(B) && B >= 0 && O && O !== "none" && (oa[B] = O);
      }
      const ia = ea.childByName(K, "marker");
      let p = ea.attribute(ea.firstDescendant(ia, "symbol"), "val", "");
      p || (p = F ? "auto" : "none");
      const G = ea.childByName(K, "dLbls") || ea.childByName(U, "dLbls"), R = (M) => ea.attribute(ea.firstDescendant(G, M), "val", "0") === "1", b = G ? ea.childByName(G, "numFmt") : null, L = {
        showVal: R("showVal"),
        showCatName: R("showCatName"),
        showSerName: R("showSerName"),
        pos: G ? ea.attribute(ea.childByName(G, "dLblPos"), "val", "") : "",
        numFmt: b ? ea.attribute(b, "formatCode", "") : ""
      };
      J.seriesIndexes.push(S), S += 1, c.push({
        name: Y,
        values: ma,
        color: Q && Q !== "none" ? Q : null,
        markerSymbol: p,
        showValues: L.showVal,
        labels: L,
        pointColors: oa,
        axisIndex: P,
        sourceNumFmt: ta
      });
    }
    J.seriesIndexes.length && k.push(J);
  }
  for (let I = 0; I < g.length; I += 1) {
    if (g[I].numFmt) continue;
    const U = c.find((N) => (N.axisIndex ?? 0) === I && N.sourceNumFmt);
    U && (g[I].numFmt = U.sourceNumFmt);
  }
  if (!c.length) return null;
  const E = ea.attribute(ea.firstDescendant(n, "autoTitleDeleted"), "val", "0") === "1";
  return !r && !E && c.length === 1 && c[0].name && (r = c[0].name), c.some((I) => I.values.some((U) => U < 0)) && Rt(
    e,
    "chart.negative-value",
    "系列含负值：值轴下限截到 0，负值柱/点静默变 0 高"
  ), {
    chartType: l,
    title: r,
    titlePt: m,
    basePt: x,
    // 配色与字体在**解析期**解析好：renderChart 拿不到 theme（渲染层不穿 theme 参数），
    // 而这两样都必须来自主题（此前是模块级硬编码，这也是颜色错在根上的原因）。
    palette: x0.map((I) => t == null ? void 0 : t[I]).filter(Boolean),
    fontFamily: ea.normalizeFontFamily([(w = (C = t == null ? void 0 : t.fonts) == null ? void 0 : C.minor) == null ? void 0 : w.latin, (T = (q = t == null ? void 0 : t.fonts) == null ? void 0 : q.minor) == null ? void 0 : T.eastAsian], !1),
    varyColors: y,
    legend: h,
    majorGridlines: v,
    categories: i,
    series: c,
    // R44：值轴数组（次轴 combo 有 2 个）+ 类型分组（combo 逐类型渲染的依据）
    axes: g,
    typeGroups: k
  };
}
function k0(a, t, e) {
  const n = {
    fontFamily: e,
    fontSize: t,
    bold: !1,
    italic: !1,
    letterSpacing: 0
  };
  let s = 0;
  for (const l of a.series)
    l.name && (s = Math.max(s, ea.measureStyledText(l.name, n)));
  return t * ke + kt * 96 / 72 + s;
}
function Zn(a, t) {
  return t === "0%" ? `${Math.round(a * 100)}%` : t === "0.0%" ? `${(a * 100).toFixed(1)}%` : t === "0.00%" ? `${(a * 100).toFixed(2)}%` : t === "0" ? String(Math.round(a)) : t === "0.0" ? a.toFixed(1) : t === "0.00" ? a.toFixed(2) : rt(a);
}
function rt(a) {
  return a >= 1e4 ? (a / 1e3).toFixed(0) + "k" : a >= 1e3 ? (a / 1e3).toFixed(1) + "k" : String(Math.round(a * 10) / 10);
}
function S0(a) {
  var R, b, L;
  const t = a.chart;
  if (!t) return "";
  const { x: e, y: n, width: s, height: l } = a, r = (M) => M * 96 / 72, m = r(t.basePt || Ce), c = t.fontFamily || "Arial", i = (R = t.palette) != null && R.length ? t.palette : [ea.defaultTheme.accent1], d = {
    fontFamily: c,
    fontSize: m,
    bold: !1,
    italic: !1,
    letterSpacing: 0
  }, o = "#000000", x = r(w0), f = t.series, y = t.categories.length ? t.categories : f[0].values.map((M, B) => `${B + 1}`), u = Math.max(1, y.length), h = f.length, v = ((b = t.axes) != null && b.length ? t.axes : [{ axPos: "l", numFmt: "", majorGridlines: t.majorGridlines }]).map((M, B) => {
    const O = f.filter((la) => (la.axisIndex ?? 0) === B).flatMap((la) => la.values), D = Math.max(...O.length ? O : [0], 0), H = F0(D), aa = H * (Math.floor(D / H + 1e-9) + 1), V = Math.max(1, Math.round(aa / H)), sa = [];
    for (let la = 0; la <= V; la += 1) sa.push(H * la);
    return {
      ax: M,
      chartMax: aa,
      tickValues: sa,
      format: (la) => M.numFmt ? Zn(la, M.numFmt) : rt(la)
    };
  }), A = (M) => {
    const B = v[M] || v[0];
    return (O) => P + J - O / B.chartMax * J;
  }, j = r(h0), $ = m * p0, k = v[0], S = Math.max(
    ...k.tickValues.map((M) => ea.measureStyledText(k.format(M), d))
  ), E = v[1] || null, X = E ? Math.max(...E.tickValues.map((M) => ea.measureStyledText(E.format(M), d))) : 0, _ = t.title ? r(t.titlePt ?? y0) : 0, C = t.legend ? k0(t, m, c) : 0, w = !!(t.legend && t.legend.pos === "b" && !t.legend.overlay), q = m * u0 + S + $ + j, T = E ? m * $0 + X + $ + j : m * g0 + (t.legend && !w ? r(Qt) + C : 0), I = t.title ? m * In + _ * Lt + m * Dn : m * R0, U = w ? M0 : Bn, N = m * Tn + m * Lt + m * U + (w ? m * L0 + m * Lt : 0), z = e + q, P = n + I, F = Math.max(10, s - q - T), J = Math.max(10, l - I - N), K = A(0), Y = E ? A(1) : K, fa = F / u, da = (M) => z + fa * (M + 0.5), W = K(0), ta = W + m * Tn + m * Ga, ma = (M, B) => `font-family="${ea.escapeXml(c)}" font-size="${M.toFixed(2)}" fill="${o}"` + (B ? ` text-anchor="${B}"` : ""), Q = [];
  if (t.majorGridlines)
    for (const M of k.tickValues) {
      const B = K(M);
      Q.push(
        `<line x1="${z.toFixed(2)}" y1="${B.toFixed(2)}" x2="${(z + F).toFixed(2)}" y2="${B.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
      );
    }
  for (const M of k.tickValues) {
    const B = K(M);
    Q.push(
      `<line x1="${z.toFixed(2)}" y1="${B.toFixed(2)}" x2="${(z - j).toFixed(2)}" y2="${B.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
    ), Q.push(
      `<text x="${(z - j - $).toFixed(2)}" y="${(B + m * Pn).toFixed(2)}" ${ma(m, "end")}>${ea.escapeXml(k.format(M))}</text>`
    );
  }
  if (Q.push(
    `<line x1="${z.toFixed(2)}" y1="${P.toFixed(2)}" x2="${z.toFixed(2)}" y2="${W.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
  ), E) {
    if (E.ax.majorGridlines)
      for (const M of E.tickValues) {
        const B = Y(M);
        Q.push(
          `<line x1="${z.toFixed(2)}" y1="${B.toFixed(2)}" x2="${(z + F).toFixed(2)}" y2="${B.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
        );
      }
    for (const M of E.tickValues) {
      const B = Y(M);
      Q.push(
        `<line x1="${(z + F).toFixed(2)}" y1="${B.toFixed(2)}" x2="${(z + F + j).toFixed(2)}" y2="${B.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
      ), Q.push(
        `<text x="${(z + F + j + $).toFixed(2)}" y="${(B + m * Pn).toFixed(2)}" ${ma(m, "start")}>${ea.escapeXml(E.format(M))}</text>`
      );
    }
    Q.push(
      `<line x1="${(z + F).toFixed(2)}" y1="${P.toFixed(2)}" x2="${(z + F).toFixed(2)}" y2="${W.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
    );
  }
  t.majorGridlines || Q.push(
    `<line x1="${z.toFixed(2)}" y1="${W.toFixed(2)}" x2="${(z + F).toFixed(2)}" y2="${W.toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
  );
  for (let M = 0; M <= u; M += 1) {
    const B = z + fa * M;
    Q.push(
      `<line x1="${B.toFixed(2)}" y1="${W.toFixed(2)}" x2="${B.toFixed(2)}" y2="${(W + j).toFixed(2)}" stroke="${o}" stroke-width="${x.toFixed(2)}"/>`
    );
  }
  for (let M = 0; M < u; M += 1)
    Q.push(
      `<text x="${da(M).toFixed(2)}" y="${ta.toFixed(2)}" ${ma(m, "middle")}>${ea.escapeXml(String(y[M]))}</text>`
    );
  const oa = (L = t.typeGroups) != null && L.length ? t.typeGroups : [{ type: t.chartType, axisIndex: 0, seriesIndexes: f.map((M, B) => B) }], ia = /* @__PURE__ */ new Map();
  for (const M of oa) M.seriesIndexes.forEach((B, O) => ia.set(B, O));
  const p = (M, B) => {
    var aa;
    const O = f[M], D = (aa = O.pointColors) == null ? void 0 : aa[B];
    if (D) return D;
    if (O.color) return O.color;
    const H = t.varyColors && h === 1 ? B : ia.get(M) ?? M;
    return i[H % i.length];
  }, G = (M, B, O, D) => {
    const H = M.labels || { showVal: M.showValues, showCatName: !1, showSerName: !1 };
    if (!H.showVal && !H.showCatName && !H.showSerName) return;
    const aa = da(O), V = H.numFmt ? Zn(M.values[O] ?? 0, H.numFmt) : rt(M.values[O] ?? 0);
    if (!H.showCatName && !H.showSerName) {
      Q.push(
        `<text x="${aa.toFixed(2)}" y="${(D + m * Ga).toFixed(2)}" ${ma(m, "middle")}>${ea.escapeXml(V)}</text>`
      );
      return;
    }
    const sa = [
      H.showSerName ? M.name : "",
      H.showCatName ? String(y[O] ?? "") : ""
    ].filter(Boolean).join(", ") + (H.showVal ? "," : ""), la = D - m * (b0 + 0.269);
    if (H.showVal && Q.push(
      `<text x="${aa.toFixed(2)}" y="${la.toFixed(2)}" ${ma(m, "middle")}>${ea.escapeXml(V)}</text>`
    ), sa) {
      const ra = la - m * v0;
      Q.push(
        `<text x="${aa.toFixed(2)}" y="${ra.toFixed(2)}" ${ma(m, "middle")}>${ea.escapeXml(sa)}</text>`
      );
    }
  };
  for (const M of oa) {
    const B = M.axisIndex === 1 && E ? Y : K;
    if (M.type === "bar") {
      const O = fa / (1 + On), D = O / M.seriesIndexes.length;
      for (let H = 0; H < u; H += 1) {
        const aa = z + fa * H + (fa - O) / 2;
        M.seriesIndexes.forEach((V, sa) => {
          const la = f[V].values[H] ?? 0, ra = aa + sa * D, ya = B(la);
          Q.push(
            `<rect x="${ra.toFixed(2)}" y="${ya.toFixed(2)}" width="${D.toFixed(2)}" height="${Math.max(0, W - ya).toFixed(2)}" fill="${p(V, H)}"/>`
          ), f[V].labels ? G(f[V], V, H, ya) : f[V].showValues && Q.push(
            `<text x="${(ra + D / 2).toFixed(2)}" y="${(ya + m * Ga).toFixed(2)}" ${ma(m, "middle")}>${ea.escapeXml(rt(la))}</text>`
          );
        });
      }
    } else if (M.type === "line") {
      const O = r(Kt);
      for (const D of M.seriesIndexes) {
        const H = f[D], aa = p(D, D), V = H.values.map((la, ra) => [da(ra), B(la)]), sa = V.map((la, ra) => `${ra === 0 ? "M" : "L"} ${la[0].toFixed(2)} ${la[1].toFixed(2)}`).join(" ");
        if (Q.push(`<path d="${sa}" fill="none" stroke="${aa}" stroke-width="${O.toFixed(2)}" stroke-linejoin="round"/>`), H.markerSymbol === "auto") {
          const la = r(Nn);
          for (const ra of V)
            Q.push(
              `<rect x="${(ra[0] - la / 2).toFixed(2)}" y="${(ra[1] - la / 2).toFixed(2)}" width="${la.toFixed(2)}" height="${la.toFixed(2)}" fill="${aa}"/>`
            );
        } else if (H.markerSymbol && H.markerSymbol !== "none") {
          const la = O * 1.6;
          for (const ra of V)
            Q.push(`<circle cx="${ra[0].toFixed(2)}" cy="${ra[1].toFixed(2)}" r="${la.toFixed(2)}" fill="${aa}"/>`);
        }
        if (H.showValues)
          for (let la = 0; la < V.length; la += 1)
            Q.push(
              `<text x="${V[la][0].toFixed(2)}" y="${(V[la][1] - m * A0).toFixed(2)}" ${ma(m, "middle")}>${ea.escapeXml(rt(H.values[la]))}</text>`
            );
      }
    } else {
      const O = fa / (1 + On);
      for (let D = 0; D < u; D += 1) {
        const H = M.seriesIndexes[0] ?? 0, aa = f[H].values[D] ?? 0, V = da(D) - O / 2, sa = B(aa);
        Q.push(
          `<rect x="${V.toFixed(2)}" y="${sa.toFixed(2)}" width="${O.toFixed(2)}" height="${Math.max(0, W - sa).toFixed(2)}" fill="${p(H, D)}"/>`
        );
      }
    }
  }
  if (t.title) {
    const M = n + m * In + _ * Ga;
    Q.push(
      `<text x="${(e + s / 2).toFixed(2)}" y="${M.toFixed(2)}" text-anchor="middle" font-family="${ea.escapeXml(c)}" font-size="${_.toFixed(2)}" font-weight="700" fill="${o}">${ea.escapeXml(t.title)}</text>`
    );
  }
  if (t.legend && !t.legend.overlay) {
    const M = f.filter((D) => D.name), B = m * ke, O = m * Lt;
    if (w) {
      const D = r(kt), H = r(Qt), aa = M.map((ya) => B + D + ea.measureStyledText(ya.name, d)), V = aa.reduce((ya, $a) => ya + $a, 0) + H * (M.length - 1);
      let sa = e + s / 2 - V / 2;
      const la = n + l - m * Bn - O, ra = la + O / 2;
      M.forEach((ya, $a) => {
        const Ra = p(f.indexOf(ya), $a);
        if (t.chartType === "line" || oa.some((ja) => ja.type === "line" && ja.seriesIndexes.includes(f.indexOf(ya)))) {
          const ja = ra;
          Q.push(
            `<line x1="${sa.toFixed(2)}" y1="${ja.toFixed(2)}" x2="${(sa + B).toFixed(2)}" y2="${ja.toFixed(2)}" stroke="${Ra}" stroke-width="${r(Kt).toFixed(2)}"/>`
          );
          const ha = r(Nn);
          Q.push(
            `<rect x="${(sa + B / 2 - ha / 2).toFixed(2)}" y="${(ja - ha / 2).toFixed(2)}" width="${ha.toFixed(2)}" height="${ha.toFixed(2)}" fill="${Ra}"/>`
          );
        } else
          Q.push(
            `<rect x="${sa.toFixed(2)}" y="${(ra - m * qn / 2).toFixed(2)}" width="${B.toFixed(2)}" height="${(m * qn).toFixed(2)}" fill="${Ra}"/>`
          );
        Q.push(
          `<text x="${(sa + B + r(kt)).toFixed(2)}" y="${(la + m * Ga).toFixed(2)}" ${ma(m)}>${ea.escapeXml(ya.name)}</text>`
        ), sa += aa[$a] + H;
      });
    } else {
      const D = z + F + r(Qt), H = D + B + r(kt), V = ((t.title ? n + I - m * Dn : n) + n + l) / 2 - O * M.length / 2;
      M.forEach((sa, la) => {
        const ra = p(f.indexOf(sa), la), ya = V + O * (la + 0.5);
        t.chartType === "line" ? Q.push(
          `<line x1="${D.toFixed(2)}" y1="${ya.toFixed(2)}" x2="${(D + B).toFixed(2)}" y2="${ya.toFixed(2)}" stroke="${ra}" stroke-width="${r(Kt).toFixed(2)}"/>`
        ) : Q.push(
          `<rect x="${D.toFixed(2)}" y="${(ya - m * 0.42).toFixed(2)}" width="${B.toFixed(2)}" height="${(m * 0.84).toFixed(2)}" fill="${ra}"/>`
        ), Q.push(
          `<text x="${H.toFixed(2)}" y="${(V + O * la + m * Ga).toFixed(2)}" ${ma(m)}>${ea.escapeXml(sa.name)}</text>`
        );
      });
    }
  }
  return `<g${ea.identityAttributes(a)}${ea.transformAttribute(a)} data-chart="${ea.escapeXml(t.chartType)}">${Q.join("")}</g>`;
}
function F0(a) {
  if (a <= 0) return 1;
  const t = a / 6, e = 10 ** Math.floor(Math.log10(t)), n = t / e;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : 5) * e;
}
let mt = null;
function E0(a) {
  if (!a || typeof a != "object")
    throw new Error("configureGeometry(next): next 必须是对象");
  mt = a;
}
function I0(a) {
  if (!mt || mt[a] === void 0 || mt[a] === null)
    throw new Error(
      `geometry 模块未注入依赖 ${a} —— 调用方必须先 configureGeometry({ ${a} })`
    );
  return mt[a];
}
const cn = {
  get escapeXml() {
    return I0("escapeXml");
  }
};
function ka(a) {
  const t = [];
  if (a.rotation && t.push(
    `rotate(${a.rotation} ${a.x + a.width / 2} ${a.y + a.height / 2})`
  ), a.flipH || a.flipV) {
    const e = a.flipH ? -1 : 1, n = a.flipV ? -1 : 1;
    t.push(
      `translate(${a.x + a.width / 2} ${a.y + a.height / 2}) scale(${e} ${n}) translate(${-a.x - a.width / 2} ${-a.y - a.height / 2})`
    );
  }
  return t.length ? ` transform="${t.join(" ")}"` : "";
}
function D0(a) {
  return !!a.flipH == !!a.flipV ? "" : ka({ ...a, rotation: 0, flipH: !0, flipV: !1 });
}
function zn(a, t, e, n, s, l, r) {
  const m = t + n / 2, c = Math.min(n / 4, e * 0.5), i = a + e / 2;
  return s === "left" ? `<path d="M ${a + e} ${t} Q ${i} ${t} ${i} ${t + c} L ${i} ${m - c} Q ${i} ${m} ${a} ${m} Q ${i} ${m} ${i} ${m + c} L ${i} ${t + n - c} Q ${i} ${t + n} ${a + e} ${t + n}" fill="none" ${r}/>` : `<path d="M ${a} ${t} Q ${i} ${t} ${i} ${t + c} L ${i} ${m - c} Q ${i} ${m} ${a + e} ${m} Q ${i} ${m} ${i} ${m + c} L ${i} ${t + n - c} Q ${i} ${t + n} ${a} ${t + n}" fill="none" ${r}/>`;
}
function T0(a, t, e, n, s = 0.2) {
  const l = Math.min(e * s, n * 1.3);
  return `M ${a + l} ${t} L ${a + e} ${t} L ${a + e - l} ${t + n} L ${a} ${t + n} Z`;
}
function on(a, t, e, n, s, l, r = 0) {
  const m = r;
  return l === "right" ? s === 1 ? `M ${a} ${t} H ${a + e - m} V ${t + n}` : `M ${a} ${t} H ${a + e / 2} V ${t + n} H ${a + e - m}` : l === "down" ? s === 1 ? `M ${a} ${t} V ${t + n - m} H ${a + e}` : `M ${a} ${t} V ${t + n / 2} H ${a + e} V ${t + n - m}` : l === "left" ? s === 1 ? `M ${a + e} ${t} H ${a + m} V ${t + n}` : `M ${a + e} ${t} H ${a + e / 2} V ${t + n} H ${a + m}` : s === 1 ? `M ${a} ${t + n} V ${t + m} H ${a + e}` : `M ${a} ${t + n} V ${t + n / 2} H ${a + e} V ${t + m}`;
}
function fn(a, t) {
  return Math.abs(a) > Math.abs(t) * 1.2 ? a >= 0 ? "right" : "left" : Math.abs(t) > Math.abs(a) * 1.2 ? t >= 0 ? "down" : "up" : a >= 0 ? "right" : "down";
}
function Hn(a, t, e, n, s, l, r, m = {}) {
  const c = r ? n * 0.86 : n, i = (f) => a + e * f, d = (f) => t + c * f, o = [
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
  if (r) {
    const f = Math.max(0.18, Math.min(0.82, 0.5 + Number(m.adj1 || 0) / 1e5)), y = f < 0.5 ? -1 : 1, u = a + e * (f - y * 0.035), h = a + e * f;
    x = [
      `<ellipse cx="${u}" cy="${t + n * 0.875}" rx="${e * 0.052}" ry="${n * 0.052}" fill="${s}" ${l}/>`,
      `<ellipse cx="${h}" cy="${t + n * 0.965}" rx="${e * 0.03}" ry="${n * 0.03}" fill="${s}" ${l}/>`
    ].join("");
  }
  return `<path d="${o}" fill="${s}" ${l}/>${x}`;
}
function B0(a, t, e, n) {
  const s = a + e * 0.72;
  return `M ${a} ${t} H ${s} L ${a + e} ${t + n / 2} L ${s} ${t + n} H ${a} Z`;
}
function P0(a, t, e, n) {
  const s = a + e * 0.36, l = a + e * 0.72;
  return `M ${a} ${t} H ${l} L ${a + e} ${t + n / 2} L ${l} ${t + n} H ${a} L ${s} ${t + n / 2} Z`;
}
function O0(a, t, e, n, s = {}) {
  const l = Number.isFinite(s.adj1) ? s.adj1 : -20833, r = Number.isFinite(s.adj2) ? s.adj2 : 62500, m = Number.isFinite(s.adj3) ? s.adj3 : 16667, c = a + e * (0.5 + l / 1e5), i = t + n * (0.5 + r / 1e5), d = Math.min(e, n) * (m / 1e5), o = Math.min(e, n) * 0.16, x = t + n, f = a + e, y = i < t;
  if (i > x || !y && i >= t || y) {
    const A = Math.max(a + o, Math.min(f - o, c - d)), j = Math.max(A, Math.min(f - o, c + d));
    return y ? [
      `M ${A} ${t}`,
      `L ${c} ${i} L ${j} ${t}`,
      `H ${f - o} Q ${f} ${t} ${f} ${t + o}`,
      `V ${x - o} Q ${f} ${x} ${f - o} ${x}`,
      `H ${a + o} Q ${a} ${x} ${a} ${x - o}`,
      `V ${t + o} Q ${a} ${t} ${A} ${t} Z`
    ].join(" ") : [
      `M ${a + o} ${t}`,
      `H ${f - o} Q ${f} ${t} ${f} ${t + o}`,
      `V ${x - o} Q ${f} ${x} ${f - o} ${x}`,
      `H ${j} L ${c} ${Math.max(i, x)} L ${A} ${x}`,
      `H ${a + o} Q ${a} ${x} ${a} ${x - o}`,
      `V ${t + o} Q ${a} ${t} ${a + o} ${t} Z`
    ].join(" ");
  }
  const h = c > f ? f : a, g = Math.max(t + o, Math.min(x - o, i - d)), v = Math.max(g, Math.min(x - o, i + d));
  return [
    `M ${a + o} ${t}`,
    `H ${f - o} Q ${f} ${t} ${f} ${t + o}`,
    `V ${x - o} Q ${f} ${x} ${f - o} ${x}`,
    `H ${a + o} Q ${a} ${x} ${a} ${x - o}`,
    `V ${t + o} Q ${a} ${t} ${a + o} ${t} Z`,
    `M ${c} ${i} L ${h} ${g} L ${h} ${v} Z`
  ].join(" ");
}
function N0(a, t, e, n) {
  return [
    `M ${a + e / 2} ${t + n}`,
    `C ${a + e * 0.38} ${t + n * 0.86} ${a} ${t + n * 0.62} ${a} ${t + n * 0.3}`,
    `C ${a} ${t + n * 0.08} ${a + e * 0.27} ${t - n * 0.02} ${a + e / 2} ${t + n * 0.22}`,
    `C ${a + e * 0.73} ${t - n * 0.02} ${a + e} ${t + n * 0.08} ${a + e} ${t + n * 0.3}`,
    `C ${a + e} ${t + n * 0.62} ${a + e * 0.62} ${t + n * 0.86} ${a + e / 2} ${t + n} Z`
  ].join(" ");
}
function q0(a, t, e, n, s = 5) {
  const l = a + e / 2, r = t + n / 2, m = e / 2, c = n / 2, i = m * 0.4, d = c * 0.4, o = [];
  for (let x = 0; x < s * 2; x += 1) {
    const f = -Math.PI / 2 + x * Math.PI / s, y = x % 2 === 0 ? m : i, u = x % 2 === 0 ? c : d;
    o.push(`${l + Math.cos(f) * y} ${r + Math.sin(f) * u}`);
  }
  return `M ${o.join(" L ")} Z`;
}
function Z0(a, t, e, n) {
  return [
    `M ${a + e * (0.5 - 0.3 / 2)} ${t + n}`,
    `H ${a + e * (0.5 + 0.3 / 2)}`,
    `V ${t + n * 0.38}`,
    `H ${a + e * 0.72}`,
    `V ${t}`,
    `L ${a + e} ${t + n * 0.24}`,
    `L ${a + e * 0.72} ${t + n * 0.48}`,
    `H ${a + e * (0.5 + 0.3 / 2)}`,
    `V ${t + n * 0.38}`,
    `H ${a + e * (0.5 - 0.3 / 2)} Z`
  ].join(" ");
}
function Un(a, t) {
  const e = a.height * (t ? 0.86 : 1), n = a.width * (t ? 0.18 : a.width > e * 1.5 ? 0.12 : 0.15), s = e * 0.16;
  return {
    ...a,
    x: a.x + n,
    y: a.y + s,
    width: Math.max(1, a.width - n * 2),
    height: Math.max(1, e - s * 2),
    text: a.text ? {
      ...a.text,
      insetLeft: 0,
      insetRight: 0,
      insetTop: 0,
      insetBottom: 0
    } : null
  };
}
function dn(a) {
  const t = a.dash ? ` stroke-dasharray="${a.dash}"` : "";
  return `stroke="${cn.escapeXml(a.color)}" stroke-width="${a.width}"${t}`;
}
const dt = {
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
function z0(a, t, e, n) {
  const s = (l) => (Math.round(l * 1e4) / 1e4).toString();
  return dt.cmds.map((l) => {
    let r = l[0];
    for (let m = 1; m < l.length; m += 2)
      r += ` ${s(e + l[m + 1] * t)} ${s(n + l[m] * a)}`;
    return r;
  }).join(" ");
}
function Wn(a, t, e) {
  const n = Mt(a.w, 4), s = Mt(a.len, 5);
  if (a.type === "triangle" || a.type === "stealth" || a.type === "diamond" || a.type === "oval")
    return `<marker id="${e}" markerWidth="${s}" markerHeight="${n}" refX="${s}" refY="${n / 2}" orient="auto-start-reverse" markerUnits="strokeWidth"><path d="M 0 0 L ${s} ${n / 2} L 0 ${n} Z" fill="${cn.escapeXml(t)}"/></marker>`;
  if (a.type === "arrow") {
    const l = Mt(a.w, 1), r = Mt(a.len, 1), m = 0.05, c = dt.axial * r + m * 2, i = dt.lateralHalf * 2 * l + m * 2, d = c - m, o = i / 2, x = d - dt.shaftTrim * r, f = z0(l, r, d, o);
    return `<marker id="${e}" markerWidth="${c}" markerHeight="${i}" refX="${x}" refY="${o}" orient="auto-start-reverse" markerUnits="strokeWidth"><path d="${f}" fill="${cn.escapeXml(t)}"/></marker>`;
  }
  return "";
}
const Mt = (a, t) => a === "sm" ? t * 0.6 : a === "lg" ? t * 1.5 : t;
function H0(a) {
  var e, n;
  const t = dt.shaftTrim;
  return {
    start: ((e = a == null ? void 0 : a.headEnd) == null ? void 0 : e.type) === "arrow" ? t * a.width : 0,
    end: ((n = a == null ? void 0 : a.tailEnd) == null ? void 0 : n.type) === "arrow" ? t * a.width : 0
  };
}
function U0(a, t = "line") {
  const e = [], n = [];
  if (a.headEnd) {
    const s = `arrow-start-${t}`;
    e.push(Wn(a.headEnd, a.color, s)), n.push(`marker-start="url(#${s})"`);
  }
  if (a.tailEnd) {
    const s = `arrow-end-${t}`;
    e.push(Wn(a.tailEnd, a.color, s)), n.push(`marker-end="url(#${s})"`);
  }
  return {
    defs: e.length ? `<defs>${e.join("")}</defs>` : "",
    attributes: n.join(" ")
  };
}
let ct = null;
function W0(a) {
  if (!a || typeof a != "object")
    throw new Error("configureDefs(next): next 必须是对象");
  ct = a;
}
function tt(a) {
  if (!ct || ct[a] === void 0 || ct[a] === null)
    throw new Error(
      `defs 模块未注入依赖 ${a} —— 调用方必须先 configureDefs({ ${a}, ... })`
    );
  return ct[a];
}
const ua = {
  get attribute() {
    return tt("attribute");
  },
  get colorFromContainer() {
    return tt("colorFromContainer");
  },
  get descendantsByName() {
    return tt("descendantsByName");
  },
  get escapeXml() {
    return tt("escapeXml");
  },
  get firstDescendant() {
    return tt("firstDescendant");
  }
}, G0 = 8, X0 = {
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
function V0() {
  return {
    gradient: /* @__PURE__ */ new Map(),
    gradientCounter: 0,
    duotone: /* @__PURE__ */ new Map(),
    shadow: /* @__PURE__ */ new Map(),
    shadowCounter: 0,
    reflection: /* @__PURE__ */ new Map(),
    reflectionCounter: 0,
    pattern: /* @__PURE__ */ new Map(),
    patternCounter: 0
  };
}
function Y0(a, t) {
  if (!(t != null && t.dark) || !(t != null && t.light)) return null;
  const e = `${t.dark}|${t.light}`;
  if (a.duotone.has(e)) return a.duotone.get(e);
  const n = `duotone${a.duotone.size + 1}`;
  return a.duotone.set(e, n), a.duotone.set(n, t), n;
}
function Gn(a, t, e, n) {
  if (!t) return null;
  const s = n && n.w > 0 ? n.w : 1, l = n && n.h > 0 ? n.h : 1, r = `${s.toFixed(2)}x${l.toFixed(2)}`, m = Se(t) + "|" + JSON.stringify(e) + "|" + r;
  if (a.gradient.has(m)) return a.gradient.get(m);
  const c = `grad${++a.gradientCounter}`;
  return a.gradient.set(m, c), a.gradient.set(c, { gradient: t, theme: e, aspect: s / l }), c;
}
const nt = G0 * 96 / 72;
function Xn(a, t, e) {
  if (!t) return null;
  const n = ua.attribute(t, "prst", ""), s = X0[n];
  if (!s) return null;
  const l = ua.firstDescendant(t, "fgClr"), r = ua.firstDescendant(t, "bgClr"), m = l && ua.colorFromContainer(l, e) || "#000000", c = r && ua.colorFromContainer(r, e) || "#ffffff", i = `${n}|${m}|${c}`;
  if (a.pattern.has(i)) return a.pattern.get(i);
  const d = `patt${++a.patternCounter}`;
  return a.pattern.set(i, d), a.pattern.set(d, { tile: s, fg: m, bg: c }), d;
}
function Q0(a) {
  const t = [], e = nt / 8, n = e.toFixed(6);
  for (const [s, l] of a.pattern.entries()) {
    if (typeof l == "string") continue;
    const { tile: r, fg: m, bg: c } = l;
    let i = "";
    for (let d = 0; d < 8; d += 1) {
      const o = r[d];
      for (let x = 0; x < 8; x += 1)
        o[x] === "1" && (i += `M${(x * e).toFixed(6)} ${(d * e).toFixed(6)}h${n}v${n}h-${n}z`);
    }
    t.push(
      `<pattern id="${s}" patternUnits="userSpaceOnUse" width="${nt}" height="${nt}"><rect width="${nt}" height="${nt}" fill="${ua.escapeXml(c)}"/>` + (i ? `<path d="${i}" fill="${ua.escapeXml(m)}"/>` : "") + "</pattern>"
    );
  }
  return t.join("");
}
function Se(a) {
  if (!a) return "";
  const t = [a.localName];
  for (let e = 0; e < a.attributes.length; e += 1) {
    const n = a.attributes[e];
    t.push(`${n.name}=${n.value}`);
  }
  for (const e of a.children || [])
    e.nodeType === 1 && t.push(Se(e));
  return t.join("/");
}
function K0(a, t) {
  const e = ua.colorFromContainer(a, t) || "#000000";
  return /^#[0-9a-f]{8}$/i.test(e) ? e.slice(0, 7) : e;
}
function J0(a) {
  const t = [], e = ' color-interpolation="linearRGB"';
  for (const [n, s] of a.gradient.entries())
    if (typeof s != "string") {
      const { gradient: l, theme: r, aspect: m } = s, c = m > 0 ? m : 1, i = ua.firstDescendant(l, "lin"), d = ua.firstDescendant(l, "rad"), o = ua.firstDescendant(l, "path"), x = o ? ua.attribute(o, "path", "") : "", f = [], y = ua.descendantsByName(l, "gs").map((h) => ({
        pos: Math.max(0, Math.min(100, Number(ua.attribute(h, "pos", 0)) / 1e3)),
        gs: h
      }));
      y.sort((h, g) => h.pos - g.pos);
      for (const { pos: h, gs: g } of y) {
        const v = ua.firstDescendant(g, "alpha"), A = v ? Math.max(0, Math.min(1, Number(ua.attribute(v, "val", 1e5)) / 1e5)) : 1, j = K0(g, r), $ = A < 1 ? ` stop-opacity="${A}"` : "";
        f.push(`<stop offset="${h}%" stop-color="${j}"${$}/>`);
      }
      let u = "";
      if (i) {
        const h = Number(ua.attribute(i, "ang", 162e5)) / 6e4, g = ua.attribute(i, "scaled", "0") === "1", v = h * Math.PI / 180, A = Math.cos(v), j = g ? Math.sin(v) * c : Math.sin(v), $ = Math.hypot(A, j) || 1, k = A / $, S = j / $, E = c * k, X = S, _ = Math.abs(E) + Math.abs(X), C = E * E + X * X, w = E * _ / (2 * C), q = X * _ / (2 * C), T = 0.5 - w, I = 0.5 - q, U = 0.5 + w, N = 0.5 + q;
        u = `<linearGradient${e} id="${n}" x1="${T.toFixed(6)}" y1="${I.toFixed(6)}" x2="${U.toFixed(6)}" y2="${N.toFixed(6)}">${f.join("")}</linearGradient>`;
      } else if (o && x === "circle") {
        const h = ua.firstDescendant(o, "fillToRect"), g = h ? Math.max(0, Math.min(1, Number(ua.attribute(h, "l", 0)) / 1e5)) : 0.5, v = h ? Math.max(0, Math.min(1, Number(ua.attribute(h, "t", 0)) / 1e5)) : 0.5;
        u = `<radialGradient${e} id="${n}" cx="50%" cy="50%" r="70.7107%" fx="${(g * 100).toFixed(4)}%" fy="${(v * 100).toFixed(4)}%">${f.join("")}</radialGradient>`;
      } else d ? u = `<radialGradient${e} id="${n}" cx="50%" cy="50%" r="70%">${f.join("")}</radialGradient>` : u = `<linearGradient${e} id="${n}" x1="0%" y1="0%" x2="100%" y2="0%">${f.join("")}</linearGradient>`;
      t.push(u);
    }
  for (const [n, s] of a.duotone.entries()) {
    if (typeof s == "string") continue;
    const l = s.dark.slice(1), r = s.light.slice(1), m = [0, 2, 4].map((d) => parseInt(l.slice(d, d + 2), 16) / 255), i = [0, 2, 4].map((d) => parseInt(r.slice(d, d + 2), 16) / 255).map((d, o) => d - m[o]);
    t.push(`<filter id="${n}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"/><feColorMatrix type="matrix" values="${i[0]} 0 0 0 ${m[0]} 0 ${i[1]} 0 0 ${m[1]} 0 0 ${i[2]} 0 ${m[2]} 0 0 0 1 0"/></filter>`);
  }
  return t.length ? `<defs>${t.join("")}</defs>` : "";
}
function al(a, t, e) {
  const n = `${t.dx.toFixed(3)}|${t.dy.toFixed(3)}|${t.blur.toFixed(3)}|${t.color}|${t.alpha.toFixed(4)}|${e.x.toFixed(2)},${e.y.toFixed(2)},${e.width.toFixed(2)},${e.height.toFixed(2)}`;
  if (a.shadow.has(n)) return a.shadow.get(n);
  const s = `shadow${++a.shadowCounter}`;
  return a.shadow.set(n, s), a.shadow.set(s, { shadow: t, region: e }), s;
}
function tl(a) {
  const t = [];
  for (const [e, n] of a.shadow.entries()) {
    if (typeof n == "string") continue;
    const { shadow: s, region: l } = n;
    t.push(
      `<filter id="${ua.escapeXml(e)}" filterUnits="userSpaceOnUse" x="${l.x.toFixed(2)}" y="${l.y.toFixed(2)}" width="${l.width.toFixed(2)}" height="${l.height.toFixed(2)}" color-interpolation-filters="sRGB"><feDropShadow dx="${s.dx.toFixed(3)}" dy="${s.dy.toFixed(3)}" stdDeviation="${s.blur.toFixed(3)}" flood-color="${ua.escapeXml(s.color)}" flood-opacity="${s.alpha.toFixed(4)}"/></filter>`
    );
  }
  return t.length ? `<defs>${t.join("")}</defs>` : "";
}
function nl(a, t, e, n, s) {
  const l = `${t.startAlpha.toFixed(4)}|${t.endAlpha.toFixed(4)}|${t.lengthEm.toFixed(4)}|${t.blurPx.toFixed(3)}|${e.toFixed(2)}|${n.toFixed(2)}|${s.x.toFixed(2)},${s.y.toFixed(2)},${s.width.toFixed(2)},${s.height.toFixed(2)}`;
  if (a.reflection.has(l)) return a.reflection.get(l);
  const r = `refl${++a.reflectionCounter}`, m = { id: r, reflection: t, fontSize: e, axisY: n, region: s };
  return a.reflection.set(l, r), a.reflection.set(r, m), r;
}
function el(a) {
  const t = [];
  for (const [e, n] of a.reflection.entries()) {
    if (typeof n == "string") continue;
    const { id: s, reflection: l, axisY: r, region: m } = n, c = l.lengthEm * n.fontSize, i = (d) => d.toFixed(2);
    t.push(
      `<linearGradient id="reflGrad-${s}" gradientUnits="userSpaceOnUse" x1="0" y1="${i(r)}" x2="0" y2="${i(r + c)}"><stop offset="0" stop-color="#ffffff" stop-opacity="${l.startAlpha.toFixed(4)}"/><stop offset="1" stop-color="#ffffff" stop-opacity="${l.endAlpha.toFixed(4)}"/></linearGradient>`
    ), t.push(
      `<filter id="reflBlur-${s}" filterUnits="userSpaceOnUse" x="${i(m.x)}" y="${i(m.y)}" width="${i(m.width)}" height="${i(m.height)}" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${l.blurPx.toFixed(3)}"/></filter>`
    ), t.push(
      `<mask id="${s}" maskUnits="userSpaceOnUse" x="${i(m.x)}" y="${i(m.y)}" width="${i(m.width)}" height="${i(m.height)}"><rect x="${i(m.x)}" y="${i(m.y)}" width="${i(m.width)}" height="${i(m.height)}" fill="url(#reflGrad-${s})"/></mask>`
    );
  }
  return t.length ? `<defs>${t.join("")}</defs>` : "";
}
let it = null;
function sl(a) {
  if (!a || typeof a != "object")
    throw new Error("configureShape(next): next 必须是对象");
  it = a;
}
function Vn(a) {
  if (!it || it[a] === void 0 || it[a] === null)
    throw new Error(
      `shape 模块未注入依赖 ${a} —— 调用方必须先 configureShape({ ${a}, ... })`
    );
  return it[a];
}
const Ta = {
  get escapeXml() {
    return Vn("escapeXml");
  },
  get renderText() {
    return Vn("renderText");
  }
};
function Sa(a) {
  const t = a.spid ? ` data-spid="${Ta.escapeXml(a.spid)}"` : "", e = ` data-source="${Ta.escapeXml(a.sourceLevel || "slide")}"`, n = a.type ? ` data-type="${Ta.escapeXml(a.type)}"` : "", s = a.preset ? ` data-preset="${Ta.escapeXml(a.preset)}"` : "", l = a.label ? ` data-label="${Ta.escapeXml(a.label)}"` : "", r = a.progId ? ` data-progid="${Ta.escapeXml(a.progId)}"` : "", m = a.oleFallback ? ' data-ole-fallback="true"' : "", c = a.placeholderType ? ` data-placeholder="${Ta.escapeXml(a.placeholderType)}"` : "", i = a.fallback ? ' data-fallback="true"' : "";
  return `${t}${e}${n}${s}${l}${r}${m}${c}${i}`;
}
const ll = { M: 2, L: 2, T: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, A: 7, Z: 0 };
function rl(a) {
  const t = String(a).match(/[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g);
  if (!t) return null;
  let e = 1 / 0, n = 1 / 0, s = -1 / 0, l = -1 / 0;
  const r = (f, y) => {
    !Number.isFinite(f) || !Number.isFinite(y) || (f < e && (e = f), y < n && (n = y), f > s && (s = f), y > l && (l = y));
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
    const y = o.toUpperCase(), u = ll[y];
    if (u === void 0 || x.length < u) continue;
    const h = x.splice(0, u), g = o !== y, v = (j) => g ? m + j : j, A = (j) => g ? c + j : j;
    if (y === "M") {
      const j = v(h[0]), $ = A(h[1]);
      r(j, $), m = j, c = $, i = j, d = $, o = g ? "l" : "L";
    } else if (y === "L" || y === "T") {
      const j = v(h[0]), $ = A(h[1]);
      r(j, $), m = j, c = $;
    } else if (y === "H")
      m = v(h[0]), r(m, c);
    else if (y === "V")
      c = A(h[0]), r(m, c);
    else if (y === "C" || y === "S" || y === "Q") {
      for (let j = 0; j < u; j += 2) r(v(h[j]), A(h[j + 1]));
      m = v(h[u - 2]), c = A(h[u - 1]);
    } else if (y === "A") {
      const j = Math.abs(h[0]), $ = Math.abs(h[1]), k = v(h[5]), S = A(h[6]);
      r(m - j, c - $), r(m + j, c + $), r(k - j, S - $), r(k + j, S + $), m = k, c = S;
    }
  }
  return Number.isFinite(e) ? { x0: e, y0: n, x1: s, y1: l } : null;
}
function ml(a, t) {
  const { x: e, y: n, width: s, height: l } = t, r = { x0: e, y0: n, x1: e + s, y1: n + l }, m = (d, o = 0, x = 0) => {
    d && (d.x0 + o < r.x0 && (r.x0 = d.x0 + o), d.y0 + x < r.y0 && (r.y0 = d.y0 + x), d.x1 + o > r.x1 && (r.x1 = d.x1 + o), d.y1 + x > r.y1 && (r.y1 = d.y1 + x));
  }, c = (d, o) => {
    const x = new RegExp(`\\b${o}="(-?[\\d.eE+-]+)"`).exec(d);
    return x ? Number(x[1]) : null;
  }, i = String(a);
  for (const d of i.matchAll(/<path\b([^>]*)>/g)) {
    const o = d[1], x = /\bd="([^"]*)"/.exec(o);
    if (!x) continue;
    const f = /translate\(\s*(-?[\d.]+)[\s,]+(-?[\d.]+)/.exec(o);
    m(
      rl(x[1]),
      f ? Number(f[1]) : 0,
      f ? Number(f[2]) : 0
    );
  }
  for (const d of i.matchAll(/<ellipse\b([^>]*)>/g)) {
    const o = d[1], x = c(o, "cx"), f = c(o, "cy"), y = c(o, "rx"), u = c(o, "ry");
    [x, f, y, u].some((h) => h === null) || m({ x0: x - y, y0: f - u, x1: x + y, y1: f + u });
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
    [x, f, y, u].some((h) => h === null) || m({ x0: x, y0: f, x1: x + y, y1: f + u });
  }
  return r;
}
const cl = /* @__PURE__ */ new Set(["rect", "ellipse", "line"]);
function il(a, t) {
  var g;
  const e = ka(a), n = Ta.escapeXml(a.fill || "none"), s = dn(a.line), { x: l, y: r, width: m, height: c } = a;
  let i = "";
  const d = a.customGeometry ? ve(a.customGeometry, m, c, {}) : null, o = a.customGeometry ? d ? { fill: d, stroke: d } : null : cl.has(a.preset) ? null : Ps(a.preset, m, c, a.adjustments);
  if (o && (o.fill || o.stroke)) {
    const v = `translate(${l} ${r})`;
    o.fill ? o.fill === o.stroke ? i = `<path d="${o.fill}" transform="${v}" fill="${n}" ${s}/>` : i = `<path d="${o.fill}" transform="${v}" fill="${n}" ${s}/><path d="${o.stroke}" transform="${v}" fill="none" ${s}/>` : i = `<path d="${o.stroke}" transform="${v}" fill="none" ${s}/>`;
  } else if (a.preset === "ellipse")
    i = `<ellipse cx="${l + m / 2}" cy="${r + c / 2}" rx="${m / 2}" ry="${c / 2}" fill="${n}" ${s}/>`;
  else if (a.preset === "triangle")
    i = `<path d="M ${l + m / 2} ${r} L ${l} ${r + c} L ${l + m} ${r + c} Z" fill="${n}" ${s}/>`;
  else if (a.preset === "rtTriangle")
    i = `<path d="M ${l} ${r} L ${l + m} ${r + c} L ${l} ${r + c} Z" fill="${n}" ${s}/>`;
  else if (a.preset === "diamond")
    i = `<path d="M ${l + m / 2} ${r} L ${l + m} ${r + c / 2} L ${l + m / 2} ${r + c} L ${l} ${r + c / 2} Z" fill="${n}" ${s}/>`;
  else if (a.preset === "parallelogram" || a.preset === "flowChartInputOutput")
    i = `<path d="${T0(l, r, m, c)}" fill="${n}" ${s}/>`;
  else if (a.preset === "line")
    i = `<line x1="${l}" y1="${r}" x2="${l + m}" y2="${r + c}" ${s}/>`;
  else if (a.preset === "homePlate" || a.preset === "pentagon")
    i = `<path d="${B0(l, r, m, c)}" fill="${n}" ${s}/>`;
  else if (a.preset === "chevron")
    i = `<path d="${P0(l, r, m, c)}" fill="${n}" ${s}/>`;
  else if (a.preset === "wedgeRoundRectCallout" || a.preset === "wedgeRectCallout")
    i = `<path d="${O0(l, r, m, c, a.adjustments)}" fill="${n}" ${s}/>`;
  else if (a.preset === "heart")
    i = `<path d="${N0(l, r, m, c)}" fill="${n}" ${s}/>`;
  else if (a.preset === "star5")
    i = `<path d="${q0(l, r, m, c)}" fill="${n}" ${s}/>`;
  else if (a.preset === "bentUpArrow")
    i = `<path d="${Z0(l, r, m, c)}" fill="${n}" ${s}/>`;
  else if (a.preset === "rightArrow") {
    const v = m / Math.max(1, c) > 5, A = v ? 0.38 : 0.25, j = 1 - A, $ = v ? l + m - Math.min(m * 0.2, c * 1.25) : l + m * 0.62;
    i = `<path d="M ${l} ${r + c * A} H ${$} V ${r} L ${l + m} ${r + c / 2} L ${$} ${r + c} V ${r + c * j} H ${l} Z" fill="${n}" ${s}/>`;
  } else if (a.preset === "leftArrow")
    i = `<path d="M ${l + m} ${r + c * 0.25} H ${l + m * 0.38} V ${r} L ${l} ${r + c / 2} L ${l + m * 0.38} ${r + c} V ${r + c * 0.75} H ${l + m} Z" fill="${n}" ${s}/>`;
  else if (a.preset === "downArrow")
    i = `<path d="M ${l + m * 0.25} ${r} H ${l + m * 0.75} V ${r + c * 0.62} H ${l + m} L ${l + m / 2} ${r + c} L ${l} ${r + c * 0.62} H ${l + m * 0.25} Z" fill="${n}" ${s}/>`;
  else if (a.preset === "upArrow")
    i = `<path d="M ${l + m * 0.25} ${r + c} H ${l + m * 0.75} V ${r + c * 0.38} H ${l + m} L ${l + m / 2} ${r} L ${l} ${r + c * 0.38} H ${l + m * 0.25} Z" fill="${n}" ${s}/>`;
  else if (a.preset === "leftBrace")
    i = zn(l, r, m, c, "left", n, s);
  else if (a.preset === "rightBrace")
    i = zn(l, r, m, c, "right", n, s);
  else if (a.preset === "bentConnector2") {
    const v = fn(m, c);
    i = `<path d="${on(l, r, m, c, 1, v)}" fill="${n}" ${s}/>`;
  } else if (a.preset === "bentConnector3") {
    const v = fn(m, c);
    i = `<path d="${on(l, r, m, c, 2, v)}" fill="${n}" ${s}/>`;
  } else if (a.preset === "straightConnector1")
    i = `<line x1="${l}" y1="${r}" x2="${l + m}" y2="${r + c}" ${s}/>`;
  else if (a.preset === "cloud")
    i = Hn(l, r, m, c, n, s, !1, a.adjustments);
  else if (a.preset === "cloudCallout")
    i = Hn(l, r, m, c, n, s, !0, a.adjustments);
  else {
    const v = a.preset === "roundRect" ? Math.min(m, c) * 0.12 : 0;
    i = `<rect x="${l}" y="${r}" width="${m}" height="${c}" rx="${v}" fill="${n}" ${s}/>`;
  }
  const x = a.preset === "cloud" ? Un(a, !1) : a.preset === "cloudCallout" ? Un(a, !0) : a;
  let f = i;
  if (a.shadow) {
    const v = a.shadow, A = ml(i, a), j = v.blur * 3, $ = (((g = a.line) == null ? void 0 : g.width) || 0) + 2, k = Math.min(A.x0, A.x0 + v.dx) - j - $, S = Math.min(A.y0, A.y0 + v.dy) - j - $, E = Math.max(A.x1, A.x1 + v.dx) + j + $, X = Math.max(A.y1, A.y1 + v.dy) + j + $;
    f = `<g filter="url(#${al(t, v, {
      x: k,
      y: S,
      width: E - k,
      height: X - S
    })})">${i}</g>`;
  }
  const y = Ta.renderText(x, t), u = D0(a), h = u && y ? `<g${u}>${y}</g>` : y;
  return `<g${Sa(a)}${e}>${f}${h}</g>`;
}
const Yn = ["info", "warn", "error"], ol = 2e3;
function fl(a = {}) {
  const t = Number.isFinite(a.maxEvents) && a.maxEvents > 0 ? Math.floor(a.maxEvents) : ol, e = [];
  let n = 0;
  const s = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  function r(d) {
    if (!d || typeof d != "object")
      throw new Error("diagnostics.add(entry): entry 必须是对象");
    const { code: o, severity: x = "info", message: f = "", strategy: y = "", scope: u = null } = d;
    if (typeof o != "string" || !o.trim())
      throw new Error("diagnostics.add(entry): code 必须是非空字符串");
    if (!Yn.includes(x))
      throw new Error(
        `diagnostics.add(entry): severity 必须是 ${Yn.join(" / ")}，收到 ${JSON.stringify(x)}`
      );
    return { code: o, severity: x, message: f, strategy: y, scope: u };
  }
  function m(d) {
    const o = r(d);
    return s.set(o.code, (s.get(o.code) || 0) + 1), l.set(o.severity, (l.get(o.severity) || 0) + 1), e.length >= t ? (n += 1, !1) : (e.push(o), !0);
  }
  function c() {
    return e.map((d) => ({ ...d, scope: d.scope ? { ...d.scope } : null }));
  }
  function i() {
    return {
      total: Array.from(l.values()).reduce((o, x) => o + x, 0),
      kept: e.length,
      truncated: n,
      bySeverity: Object.fromEntries(l),
      byCode: Object.fromEntries(s)
    };
  }
  return { add: m, list: c, summary: i, maxEvents: t };
}
const dl = 8 * 1024 * 1024;
function xl(a, t, e = {}) {
  const n = Number.isFinite(e.maxBytes) && e.maxBytes >= 0 ? e.maxBytes : dl, s = /* @__PURE__ */ new Map();
  let l = 0;
  const r = { hits: 0, misses: 0, evictions: 0, parses: 0, transientReleases: 0 };
  let m = !1;
  function c() {
    if (m)
      throw new Error("PartCache 已 dispose：释放后不可再读（请检查文档生命周期）");
  }
  function i(h, g) {
    s.get(h) === g && (s.delete(h), s.set(h, g));
  }
  function d() {
    if (!(l <= n))
      for (const [h, g] of s) {
        if (l <= n) break;
        g.settled && (s.delete(h), l -= g.bytes, r.evictions += 1);
      }
  }
  function o(h, g = !0) {
    c();
    const v = a.file(h);
    return v ? v.async("string") : g ? Promise.reject(new Error(`PPTX 缺少必要文件：${h}`)) : Promise.resolve(null);
  }
  function x(h, g) {
    g.settled && s.get(h) === g && (s.delete(h), l -= g.bytes, r.transientReleases += 1);
  }
  function f(h, g = !0, v = {}) {
    c();
    const A = !!(v && v.transient), j = s.get(h);
    if (j)
      return r.hits += 1, j.settled && (A ? x(h, j) : i(h, j)), j.promise;
    r.misses += 1;
    const $ = { promise: null, settled: !1, bytes: 0 };
    return $.promise = (async () => {
      const k = await o(h, g);
      if (!k) return null;
      const S = t(k);
      return r.parses += 1, $.bytes = k.length, l += $.bytes, $.settled = !0, A ? (x(h, $), S) : (i(h, $), d(), S);
    })(), s.set(h, $), $.promise;
  }
  function y() {
    m = !0, s.clear(), l = 0;
  }
  function u() {
    return {
      entries: s.size,
      bytes: l,
      maxBytes: n,
      hits: r.hits,
      misses: r.misses,
      evictions: r.evictions,
      transientReleases: r.transientReleases,
      parses: r.parses,
      disposed: m
    };
  }
  return { zip: a, readText: o, readXmlPart: f, dispose: y, stats: u };
}
let Fe = 0;
function et(a) {
  return (a == null ? void 0 : a.reason) instanceof Error ? a.reason : new DOMException("The operation was aborted", "AbortError");
}
async function yl(a, t = {}) {
  const { width: e, height: n, scale: s = 1, signal: l, decorate: r, plate: m } = t;
  if (!Number.isFinite(e) || !Number.isFinite(n) || e <= 0 || n <= 0)
    throw new TypeError("prepareFrame 需要有效的 width/height");
  if (!m && typeof a != "string")
    throw new TypeError("prepareFrame 需要 svgMarkup 或 plate");
  if (l != null && l.aborted) throw et(l);
  const c = Math.max(1, Math.round(e * s)), i = Math.max(1, Math.round(n * s)), d = document.createElement("canvas");
  d.width = c, d.height = i;
  const o = d.getContext("2d");
  if (m) {
    if (o.drawImage(m, 0, 0, c, i), typeof r == "function") {
      if (l != null && l.aborted) throw et(l);
      await r(o, { width: c, height: i, scale: s });
    }
    return Qn(d, c, i);
  }
  const x = URL.createObjectURL(new Blob([a], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const f = new Image();
    if (f.decoding = "async", await new Promise((y, u) => {
      const h = (v, A) => {
        l && l.removeEventListener("abort", g), v(A);
      }, g = () => h(u, et(l));
      f.onload = () => h(y), f.onerror = () => h(u, new Error("SVG 光栅化失败（解码或绘制错误）")), l && l.addEventListener("abort", g, { once: !0 }), f.src = x;
    }), l != null && l.aborted) throw et(l);
    o.drawImage(f, 0, 0, c, i);
  } finally {
    URL.revokeObjectURL(x);
  }
  if (typeof r == "function") {
    if (l != null && l.aborted) throw et(l);
    await r(o, { width: c, height: i, scale: s });
  }
  return Qn(d, c, i);
}
function Qn(a, t, e) {
  const n = ++Fe;
  let s = !1;
  return {
    revision: n,
    source: a,
    width: t,
    height: e,
    release() {
      s || (s = !0, a.width = 0, a.height = 0);
    }
  };
}
function qm() {
  return Fe;
}
function Ee(a = {}) {
  const {
    baseUrl: t = typeof document < "u" ? document.baseURI : "",
    vendorDir: e = "vendor/",
    fontsDir: n = "fonts/"
  } = a;
  if (typeof t != "string" || t === "")
    throw new Error("createAssetResolver({ baseUrl }): baseUrl 必须是非空字符串（或运行于浏览器取 document.baseURI）");
  const s = new URL(e, t);
  return { baseUrl: t, vendorBase: s, font: (r) => new URL(`${n}${r}`, t).href };
}
const hl = "http://www.w3.org/2000/svg";
let xn = null, Jt = null;
function pl(a) {
  if (!a || typeof a.font != "function" || !a.vendorBase)
    throw new Error("configureAssets(resolver): resolver 必须是 createAssetResolver() 的实例");
  xn = a;
}
function Va() {
  if (xn) return xn;
  if (!Jt) {
    if (typeof document > "u")
      throw new Error(
        "ppt-sdk：当前环境没有 document 且未 configureAssets() —— 资产 URL（vendor/字体/Worker）无从确定，请先注入 createAssetResolver({ baseUrl })"
      );
    Jt = Ee();
  }
  return Jt;
}
function Zm() {
  return Va();
}
const zm = {
  get baseUrl() {
    return Va().baseUrl;
  },
  get vendorBase() {
    return Va().vendorBase;
  },
  font(a) {
    return Va().font(a);
  }
};
Os({
  normalizeFontFamily: Ya,
  measureOfficeGlyph: La,
  vendorBase: () => Va().vendorBase
});
const Ie = 914400, De = 96, ul = { width: 1280, height: 720 }, ot = {
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
}, gl = {
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
d0({
  defaultTheme: ot,
  attribute: Z,
  childByName: na,
  descendantsByName: va,
  firstDescendant: ca,
  escapeXml: ga,
  identityAttributes: Sa,
  measureStyledText: ms,
  normalizeFontFamily: Ya,
  parseFill: gt,
  transformAttribute: ka
});
W0({
  attribute: Z,
  colorFromContainer: Ma,
  descendantsByName: va,
  escapeXml: ga,
  firstDescendant: ca
});
E0({ escapeXml: ga });
sl({
  escapeXml: ga,
  renderText: tm
});
function xa(a) {
  return Number(a || 0) / Ie * De;
}
function Na(a) {
  return Number(a || 0) * De / 72;
}
let Wt = null;
function wl(a) {
  if (typeof a != "function")
    throw new Error("configureXmlParser(parse): parse 必须是 (xmlText) => Document 函数");
  Wt = a;
}
function Hm() {
  Wt = null;
}
function Te(a) {
  if (typeof DOMParser > "u")
    throw new Error(
      "ppt-sdk：当前环境没有 DOMParser（Worker / Node），无法解析 OOXML —— 请调用 configureXmlParser() 注入 XML 解析端口（如 @xmldom/xmldom 的 new DOMParser().parseFromString）"
    );
  const t = new DOMParser().parseFromString(a, "application/xml"), e = t.querySelector("parsererror");
  if (e)
    throw new Error(`XML 解析失败：${e.textContent.slice(0, 120)}`);
  return t;
}
function Al(a) {
  return (Wt || Te)(a);
}
function wa(a) {
  return a ? Array.from(a.children || []) : [];
}
function Oa(a, t) {
  return wa(a).filter((e) => e.localName === t);
}
function na(a, t) {
  return wa(a).find((e) => e.localName === t) || null;
}
function va(a, t) {
  return a ? Array.from(a.getElementsByTagNameNS("*", t)) : [];
}
function ca(a, t) {
  return va(a, t)[0] || null;
}
function Z(a, t, e = null) {
  if (!a) return e;
  const n = a.getAttribute(t);
  if (n !== null) return n;
  const s = Array.from(a.attributes || []).find(
    (l) => l.localName === t || l.name === t
  );
  return s ? s.value : e;
}
function Aa(a, t = !1) {
  return a == null ? t : a === "1" || a === "true" || a === "on";
}
function Ia(a, t, e = null) {
  if (!a) return e;
  const n = Array.from(a.attributes || []).find(
    (s) => s.localName === t && (s.prefix === "r" || s.name.startsWith("r:"))
  );
  return n ? n.value : e;
}
function Kn(a) {
  const t = String(a).split(/[?#]/, 1)[0];
  let e = 0;
  for (const n of t.split("/"))
    n === ".." && (e += 1);
  return e;
}
function bl(a, t, e) {
  if (!t) return null;
  if (t.startsWith("/")) return t.slice(1);
  const n = a.split("/").length - 1;
  if (Kn(t) > n)
    return e.diagnostics.add({
      code: "rels.target-escape",
      severity: "warn",
      scope: { part: a },
      message: `关系 Target 逃出包根（${Kn(t)} 个 .. 超过 ${n} 层）：${t}`
    }), null;
  if (/%(?![0-9a-fA-F]{2})/.test(t))
    return e.diagnostics.add({
      code: "rels.target-invalid-uri",
      severity: "warn",
      scope: { part: a },
      message: `关系 Target 含非法百分号编码：${t}`
    }), null;
  const s = new URL(a, "https://pptx.local/");
  return new URL(t, s).pathname.slice(1);
}
function It(a) {
  const t = a.split("/"), e = t.pop();
  return `${t.join("/")}/_rels/${e}.rels`;
}
function Dt(a, t, e) {
  const n = /* @__PURE__ */ new Map();
  for (const s of va(a, "Relationship")) {
    const l = Z(s, "Id"), r = Z(s, "Target"), m = Z(s, "TargetMode");
    if (l == null || l === "") {
      e.diagnostics.add({
        code: "rels.missing-id",
        severity: "warn",
        scope: { part: t },
        message: `关系缺 Id（Target=${r || "空"}）`
      });
      continue;
    }
    n.has(l) && e.diagnostics.add({
      code: "rels.duplicate-id",
      severity: "warn",
      scope: { part: t, element: l },
      message: `关系 Id 重复（${l}），后者覆盖前者（Target=${r}）`
    }), n.set(l, {
      id: l,
      type: Z(s, "Type", ""),
      target: r,
      external: m === "External",
      path: m === "External" ? r : bl(t, r, e)
    });
  }
  return n;
}
function Be(a, t) {
  if (!a) return null;
  const e = a.localName;
  return e === "srgbClr" ? `#${Z(a, "val", "000000")}` : e === "schemeClr" ? t[Z(a, "val")] || null : e === "sysClr" ? `#${Z(a, "lastClr", Z(a, "val", "000000"))}` : e === "prstClr" && gl[Z(a, "val")] || null;
}
function Ma(a, t) {
  if (!a) return null;
  const e = ["srgbClr", "schemeClr", "sysClr", "prstClr"];
  for (const n of e) {
    const s = ca(a, n), l = Ka(s, t);
    if (l) return l;
  }
  return null;
}
const vl = 16;
function Jn(a) {
  if (typeof a != "string") return null;
  const t = /^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/.exec(a.trim());
  if (!t) return null;
  const e = parseInt(t[1], 16);
  return {
    r: e >> 16 & 255,
    g: e >> 8 & 255,
    b: e & 255,
    alpha: t[2] == null ? null : parseInt(t[2], 16)
  };
}
function Pe(a, t) {
  if (!a) return null;
  const e = na(a, "clrChange");
  if (!e) return null;
  const n = na(e, "clrFrom"), s = na(e, "clrTo");
  if (!n || !s) return null;
  const l = Jn(Ma(n, t)), r = Jn(Ma(s, t));
  if (!l || !r) return null;
  let m = r.alpha;
  if (m == null) {
    const c = Number(Z(ca(s, "alpha"), "val", "100000"));
    m = Number.isFinite(c) ? Math.round(c / 1e5 * 255) : 255;
  }
  return {
    from: { r: l.r, g: l.g, b: l.b },
    to: { r: r.r, g: r.g, b: r.b, a: Math.max(0, Math.min(255, m)) },
    // 逐通道匹配容差。**必须实测反推**（见 calib/r64-clrchange/REPORT.md），
    // 不能凭感觉定：JPEG 有损压缩让「白底」并非全是精确 FFFFFF。
    tolerance: vl
  };
}
function ae(a, t) {
  if (!a) return null;
  for (const e of wa(a)) {
    const n = e.localName;
    if (n === "solidFill" || n === "gradFill" || n === "pattFill" || n === "blipFill" || n === "grpFill") {
      const s = Ma(e, t);
      if (s) return s;
    }
  }
  return null;
}
async function Oe(a, t = null) {
  const e = a.zip, n = t && e.file(t) ? t : e.file("ppt/theme/theme1.xml") ? "ppt/theme/theme1.xml" : Object.keys(e.files).find((x) => /^ppt\/theme\/theme\d+\.xml$/.test(x));
  if (!n) return { ...ot, fillStyles: [], lineStyles: [] };
  const s = await a.readXmlPart(n), l = ca(s, "clrScheme"), r = { ...ot };
  for (const x of wa(l)) {
    const f = wa(x)[0], y = Be(f, r);
    y && (r[x.localName] = y);
  }
  r.bg1 = r.lt1, r.tx1 = r.dk1, r.bg2 = r.lt2, r.tx2 = r.dk2;
  const m = ca(s, "fontScheme"), c = (x, f) => {
    if (!x) return { ...f };
    const y = (u) => Oa(x, "font").find((h) => Z(h, "script") === u);
    return {
      latin: Z(na(x, "latin"), "typeface", f.latin),
      eastAsian: Z(na(x, "ea"), "typeface", "") || Z(y("Hans"), "typeface", f.eastAsian),
      complex: Z(na(x, "cs"), "typeface", f.complex)
    };
  };
  r.fonts = {
    major: c(na(m, "majorFont"), ot.fonts.major),
    minor: c(na(m, "minorFont"), ot.fonts.minor)
  };
  const i = ca(s, "fillStyleLst"), d = ca(s, "lnStyleLst"), o = ca(s, "effectStyleLst");
  return r.fillStyles = wa(i), r.lineStyles = Oa(d, "ln"), r.effectStyles = Oa(o, "effectStyle"), r;
}
function Ll(a) {
  const t = ca(a, "sldSz");
  return t ? {
    width: xa(Z(t, "cx")),
    height: xa(Z(t, "cy"))
  } : ul;
}
function ht(a) {
  const t = (a == null ? void 0 : a.localName) === "xfrm" ? a : na(a, "xfrm") || ca(a, "xfrm");
  if (!t) return null;
  const e = na(t, "off"), n = na(t, "ext");
  return !e || !n ? null : {
    x: xa(Z(e, "x")),
    y: xa(Z(e, "y")),
    width: xa(Z(n, "cx")),
    height: xa(Z(n, "cy")),
    rotation: Number(Z(t, "rot", 0)) / 6e4,
    flipH: Aa(Z(t, "flipH")),
    flipV: Aa(Z(t, "flipV"))
  };
}
function gt(a, t, e, n, s) {
  var x;
  if (!a || na(a, "noFill")) return "none";
  const l = na(a, "solidFill");
  if (l) return Ma(l, e) || "none";
  const r = na(a, "gradFill");
  if (r) {
    const f = Gn(s, r, e, n);
    return f ? `url(#${f})` : "none";
  }
  const m = na(a, "pattFill");
  if (m) {
    const f = s ? Xn(s, m, e) : null;
    return f ? `url(#${f})` : "none";
  }
  const c = t ? ca(t, "fillRef") : null;
  if (!c) return "none";
  const i = Ma(c, e), d = Number(Z(c, "idx", 0)), o = d > 0 ? (x = e.fillStyles) == null ? void 0 : x[d - 1] : null;
  if (o) {
    const f = { ...e, phClr: i || e.accent1 };
    if (o.localName === "gradFill") {
      const y = Gn(s, o, f, n);
      return y ? `url(#${y})` : "none";
    }
    if (o.localName === "pattFill") {
      const y = s ? Xn(s, o, f) : null;
      return y ? `url(#${y})` : "none";
    }
    return Ma(o, f) || i || "none";
  }
  return i || "none";
}
const Rl = {
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
function Ml(a, t) {
  const e = Rl[a];
  return e ? e.map((n) => (n * t).toFixed(2)).join(" ") : null;
}
function Ne(a, t, e) {
  var A;
  const n = a ? na(a, "ln") : null;
  if (n && na(n, "noFill"))
    return { color: "none", width: 0, dash: null, headEnd: null, tailEnd: null };
  const s = t ? ca(t, "lnRef") : null, l = Ma(s, e), r = Number(Z(s, "idx", 0)), m = r > 0 ? (A = e.lineStyles) == null ? void 0 : A[r - 1] : null, c = { ...e, phClr: l || e.tx1 }, i = Ma(n, e) || Ma(m, c) || l;
  if (!i)
    return { color: "none", width: 0, dash: null, headEnd: null, tailEnd: null };
  const d = n || m, o = Math.max(0.7, xa(Z(n, "w", Z(m, "w", 9525)))), x = ca(d, "prstDash"), f = Z(x, "val", "solid"), y = Ml(f, o), u = ca(n, "headEnd"), h = ca(n, "tailEnd"), g = Z(u, "type", "none"), v = Z(h, "type", "none");
  return {
    color: i,
    width: o,
    dash: y,
    headEnd: g !== "none" ? { type: g, w: Z(u, "w", "med"), len: Z(u, "len", "med") } : null,
    tailEnd: v !== "none" ? { type: v, w: Z(h, "w", "med"), len: Z(h, "len", "med") } : null
  };
}
const $l = 1 / 3;
function te(a, t) {
  const e = ca(a, "outerShdw");
  if (!e) return null;
  const n = xa(Z(e, "dist", 0)), s = xa(Z(e, "blurRad", 0)), l = Number(Z(e, "dir", 0)) / 6e4 * (Math.PI / 180), r = ["srgbClr", "schemeClr", "sysClr", "prstClr"].map((d) => ca(e, d)).find(Boolean), m = Ka(r, t) || "#000000", i = /^#[0-9a-f]{8}$/i.test(m) ? parseInt(m.slice(7, 9), 16) / 255 : 1;
  return i <= 0 ? null : {
    dx: n * Math.cos(l),
    dy: n * Math.sin(l),
    blur: s * $l,
    color: m.slice(0, 7),
    alpha: i
    // `sx`/`sy`/`kx`/`ky`（缩放/斜切阴影）语料里实测只有 sx=sy=100000、kx=ky=0
    // 这类恒等值，未实现；真遇到缩放/斜切阴影会退化成纯位移近似。
  };
}
function jl(a, t, e) {
  var m;
  const n = a ? na(a, "effectLst") : null;
  if (n) return te(n, e);
  const s = t ? ca(t, "effectRef") : null;
  if (!s) return null;
  const l = Number(Z(s, "idx", 0));
  if (!(l > 0)) return null;
  const r = (m = e.effectStyles) == null ? void 0 : m[l - 1];
  return r ? te(r, e) : null;
}
function _l(a, t) {
  if (!a) return null;
  const e = [["L", "left"], ["R", "right"], ["T", "top"], ["B", "bottom"]], n = {};
  let s = !1;
  for (const [l, r] of e) {
    const m = na(a, `ln${l}`);
    if (!m) {
      n[r] = null;
      continue;
    }
    const c = Ma(m, t) || "#000000", i = Math.max(0.5, xa(Z(m, "w", 9525)));
    n[r] = { color: c, width: i }, s = !0;
  }
  return s ? n : null;
}
function Cl(a) {
  return a ? ["serif", "sans-serif", "cursive", "fantasy", "monospace", "system-ui"].includes(a) ? a : `"${String(a).replaceAll('"', '\\"')}"` : null;
}
function an(a, t, e) {
  var l, r;
  const n = String(a || "").toLowerCase(), s = n.startsWith("+mj-") ? (l = t.fonts) == null ? void 0 : l.major : (r = t.fonts) == null ? void 0 : r.minor;
  return !s || !n.startsWith("+m") ? a : n.endsWith("-ea") ? s.eastAsian : n.endsWith("-cs") ? s.complex : s[e] || s.latin;
}
const qe = ["黑体", "simhei", "heitisc", "stheitilight", "stheitimedium"];
function $t(a) {
  return !!a && qe.includes(String(a).replaceAll(" ", "").toLowerCase());
}
function kl(a) {
  const t = Number(a) / 100, e = Math.round(t / 224 / 0.125) * 0.125;
  return Na(e);
}
function yn(a) {
  if (!a) return !1;
  const t = String(a).replaceAll(" ", "").toLowerCase();
  return t.startsWith("阿里巴巴普惠体") || t.startsWith("alibabapuhuiti");
}
function Sl(a, t = !1, e = !1) {
  if (!a) return { primary: [], generic: [] };
  const n = [], s = [], l = a.replaceAll(" ", "").toLowerCase();
  return l === "microsoftyahei" || l === "微软雅黑" ? (n.push("Microsoft YaHei"), s.push("PingFang SC", "Hiragino Sans GB", "Arial"), { primary: n, generic: s }) : l === "华文行楷" || l === "stxingkai" ? (n.push("华文行楷", "STXingkai", "KaiTi", "STKaiti", "Kaiti SC"), s.push("Songti SC", "STSong", "serif"), { primary: n, generic: s }) : ["宋体", "simsun", "stsong", "songtisc"].includes(l) ? (n.push(a, "SimSun", "Songti SC", "STSong"), s.push("serif"), { primary: n, generic: s }) : qe.includes(l) ? (n.push(a, "SimHei", Xa, "Heiti SC", "STHeiti"), s.push("PingFang SC", "Arial"), { primary: n, generic: s }) : ["仿宋", "fangsong", "stfangsong"].includes(l) ? (n.push(a, "FangSong", "STFangsong", "Songti SC", "STSong"), s.push("serif"), { primary: n, generic: s }) : ["楷体", "kaiti", "stkaiti", "kaitisc"].includes(l) ? (n.push(a, "KaiTi", "STKaiti", "Kaiti SC", "Songti SC"), s.push("serif"), { primary: n, generic: s }) : yn(a) ? (n.push(a, "Alibaba PuHuiTi"), n.push(e ? Ze : "Calibri"), s.push("PingFang SC", "Hiragino Sans GB", "Arial"), { primary: n, generic: s }) : l === "腾讯体w7" || l === "tencentsansw7" ? (n.push("腾讯体 W7", "TencentSans W7", "腾讯体"), s.push("PingFang SC", "Arial"), { primary: n, generic: s }) : l === "腾讯体w3" || l === "tencentsansw3" ? (n.push("TencentSans W3", "腾讯体 W3", "TencentSans W7", "腾讯体 W7"), s.push("PingFang SC", "Arial"), { primary: n, generic: s }) : l === "方正少儿简体" ? (n.push("Microsoft YaHei"), s.push("PingFang SC", "Hiragino Sans GB", "Arial"), { primary: n, generic: s }) : (n.push(a), s.push("PingFang SC", "Hiragino Sans GB", "Arial"), { primary: n, generic: s });
}
const Fl = /* @__PURE__ */ new Set(["方正少儿简体"]);
function ne(a) {
  return !!a && Fl.has(String(a).replaceAll(" ", "").toLowerCase());
}
const Ze = "Microsoft YaHei", El = Ya(["Calibri"]), Il = /[\u201C\u201D]/, Dl = /[\u2460-\u24FF]/, ee = /[\u2160-\u217F]/, ze = /(^|,\s*)"?Times New Roman"?(\s*,|$)/;
function Tl(a) {
  const t = String(a || "");
  return !t || !ze.test(t) || /(^|,\s*)"Times"(\s*,|$)/.test(t) ? t : t.replace(
    /("?Times New Roman"?)(\s*,)?/,
    (e, n, s) => `${n}, "Times"${s || ""}`
  );
}
function Ya(a, t = !1, e = null) {
  const n = !!(e && e.sameDeclaredFace), s = [], l = [], r = (c, i) => {
    i && !c.includes(i) && c.push(i);
  };
  for (const c of Array.isArray(a) ? a : [a]) {
    const i = Sl(c, t, n);
    for (const d of i.primary) r(s, d);
    for (const d of i.generic) r(l, d);
  }
  const m = [...s];
  r(m, Ze);
  for (const c of l) r(m, c);
  return m.length || m.push("Arial"), m.map(Cl).join(", ");
}
const Bl = [
  { weight: "400", name: "NotoSansMonoCJKsc-ASCII.woff2" },
  { weight: "700", name: "NotoSansMonoCJKsc-Bold-ASCII.woff2" }
], Xa = "Noto Sans Mono CJK SC";
let Tt = null;
function He() {
  if (typeof document > "u" || Tt) return;
  const a = document.fonts;
  if (typeof FontFace != "function" || !a)
    throw new Error(
      `ppt-sdk：当前环境没有 CSS Font Loading API（FontFace / document.fonts），SimHei/黑体 的半宽 ASCII 回退字体（${Xa}）无法注册 —— 数字上的绝对定位高亮框会与字形错位。补法：① 用支持该 API 的浏览器；② 或在你自己的样式表里声明 @font-face { font-family: "${Xa}"; src: url("<你的 fonts/ 路径>/NotoSansMonoCJKsc-ASCII.woff2") format("woff2"); } （400/700 两个字重）`
    );
  Tt = Bl.map(({ weight: t, name: e }) => {
    const n = Va().font(e), s = new FontFace(
      Xa,
      `local("${Xa}"), url("${n}") format("woff2")`,
      { weight: t }
    );
    return document.fonts.add(s), { family: Xa, weight: t, url: n, face: s };
  });
}
function Um() {
  return Tt ? Tt.map(({ family: a, weight: t, url: e, face: n }) => ({
    family: a,
    weight: t,
    url: e,
    status: n.status
  })) : null;
}
function wt(a) {
  return (Array.isArray(a) ? a : [a]).filter(Boolean);
}
function pa(a, t, e, n = null) {
  const s = Z(a, e, null);
  if (s !== null) return s;
  for (const l of wt(t)) {
    const r = Z(l, e, null);
    if (r !== null) return r;
  }
  return n;
}
function xt(a, t, e) {
  return ca(a, e) || wt(t).map((n) => ca(n, e)).find(Boolean) || null;
}
const Pl = {
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
function Ol(a, t) {
  if (t == null) return null;
  const e = Pl[String(a || "").trim().toLowerCase()];
  return e && e[t] || null;
}
const Nl = 2 / 3, ql = 6 / 7;
function Qa(a, t, e, n = null, s = null) {
  const l = wt(t), r = ca(a, "ea"), m = ca(a, "latin"), c = xt(null, l, "ea"), i = xt(null, l, "latin"), d = Number(pa(a, l, "sz", 1800)), o = pa(a, l, "kern", null), x = o === null ? null : Number(o), f = x !== null && (x === 0 || d < x), y = ca(a, "hlinkClick"), u = Ia(y, "id"), h = u && s ? s.get(u) : null, g = !!y, v = Z(
    a,
    "u",
    pa(null, l, "u", g ? "sng" : "none")
  ), A = an(
    Z(m, "typeface") || Z(i, "typeface") || "+mn-lt",
    e,
    "latin"
  ), j = an(
    Z(r, "typeface") || Z(c, "typeface") || "+mn-ea",
    e,
    "eastAsian"
  ), k = String(pa(a, l, "hint", "") || "").toLowerCase() === "ea", S = !!A && !!j && A.replaceAll(" ", "").toLowerCase() === j.replaceAll(" ", "").toLowerCase(), E = String(
    pa(a, l, "lang", "") || ""
  ), X = /^zh/i.test(E) && !S && yn(j), _ = /^zh/i.test(E) && !yn(j), C = an("+mn-lt", e, "latin"), w = Aa(pa(a, l, "b", "0")) || ne(A) || ne(j), q = na(a, "ln");
  let T = null;
  if (q && !na(q, "noFill")) {
    const K = Ma(q, e), Y = Z(q, "w", null);
    if (K && Y != null) {
      const fa = Number(Y) / 12700;
      T = { width: Na(Math.round(fa * 2) / 2), color: K };
    }
  }
  const I = na(na(a, "effectLst"), "reflection");
  let U = null;
  if (I) {
    const K = Z(I, "blurRad", null), Y = Z(I, "stA", null), fa = Z(I, "endA", null), da = Z(I, "endPos", null);
    K != null && Y != null && fa != null && da != null && (U = {
      blurPx: Na(Number(K) / 12700) / 3,
      startAlpha: Number(Y) / 1e5,
      endAlpha: Number(fa) / 1e5,
      lengthEm: Number(da) / 1e5
    });
  }
  const N = Number(pa(a, l, "baseline", "0")), z = d / 100, P = N !== 0 && Number.isFinite(N), F = P ? -(N / 1e5) * z * ql : 0, J = P ? Math.max(1, Math.round(z * Nl)) : z;
  return {
    fontSize: Na(J),
    // 基线偏移（px，正 = 下移）。非 0 时渲染侧给该 <tspan> 写**绝对 y**，
    // 见 renderTextSegment 的 yOverride 注释（不能靠 dy —— dy 会累积到后续 tspan）。
    baselineShift: Na(F),
    // 见上方 `kern` 注释：true ⇒ 渲染侧输出 `style="font-kerning:none"`，
    // 与度量侧（逐字形 advance 累加，本来就没有 kerning）对齐。
    kerningDisabled: f,
    // R36：zh-CN + 异名 + ea 缺失时弯引号用 Calibri 链（见上方 R36 注记）。
    // 消费点在 wrapStyledRuns 的 units 装配处：引号字符克隆 style 换 fontFamily。
    quoteFontFamily: X ? El : null,
    // R46：带圈字符用 ea 打头的链（判据见 ENCLOSED_SLOT_CHARS 处注记）。
    enclosedFontFamily: _ ? Ya([j, A, C], w, {
      sameDeclaredFace: S
    }) : null,
    // 同名字族时具体怎么排由 normalizedFontNames 的阿里巴巴普惠体分支负责（把 EA 替换
    // 字体提前进 primary），这里**不改变候选顺序** —— 顺序改动会波及所有同名字族。
    fontFamily: Ya(
      k ? [j, A, C] : [A, C, j],
      w,
      { sameDeclaredFace: S }
    ),
    // `u="sng"` 下划线的度量按 **ea 声明的字体**取，而不是按字形最终落在哪一侧
    // （探针实测：latin=TNR + ea=微软雅黑 的纯 ASCII 空格 run 用的是微软雅黑度量）。
    // 所以这里单独存一条以 ea 侧打头的链给 underlineMetricsFor 用。
    underlineFamily: Ya([j || A], w, {
      sameDeclaredFace: S
    }),
    // spc 与 sz 同属「1/100 pt」单位（ST_TextPoint，100 = 1pt），不是 1/1000。
    // 之前 /1000 会把字符间距缩到 1/10，spc=300（3pt）只渲成 0.3pt。
    letterSpacing: Na(Number(pa(a, l, "spc", 0)) / 100) + // 见 simheiAdvanceExtraPx：SimHei 族每字符 advance 比标称 em 宽 1/224 em，量化 1/8pt。
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
    (w && ($t(j) || $t(A)) ? kl(d) : 0),
    bold: w,
    // ⭐ #117 / R61：run 是否为「**合成**粗体」—— 声明了 b="1"，但所属字族**没有独立
    // 粗体面**，只能由 PowerPoint 描边合成。与上面 SimHei advance 加值同源同门控。
    // 只认 SimHei 族：只有它本轮有受控探针（6 个字号）+ 语料组内差分（9 组）双重实测。
    // DengXian 有真 `Dengb.ttf`（Office PDF 字体名 DengXian-Bold、span size 不变），
    // 实测抬升 **0.000**，是这条规则的零效应对照；宋体/楷体/仿宋虽同样无独立粗体面，
    // 但**未实测**，按「不许外推」一律不套。
    syntheticBold: w && ($t(j) || $t(A)),
    outline: T,
    reflection: U,
    italic: Aa(pa(a, l, "i", "0")),
    underline: v !== "none" || g,
    hyperlink: h != null && h.external ? h.target : null,
    color: (
      // ⭐ 第三十五轮（real-3 s20 / real-4 s43 / real-5 s53 三页逐像素实测）：
      // 带 hlinkClick 的 run，Office 渲染**主题 hlink 色**（0563C1），即使 run 自己
      // 带显式 solidFill（这些 run 全部声明了 EEECE1×lumMod25%，Office 仍渲蓝）。
      // 旧链序把 runFillColor 放在 theme.hlink 之前 ⇒ 这四页的链接被渲成灰黄
      // （Office 蓝像素 8~10 万 vs 我方 4~5 万）。故 hyperlink 时 theme.hlink 优先；
      // 主题未定义 hlink 时（theme.hlink = null）落到原有链序，行为不变。
      // run 自己的填充必须取直接子元素的 fill 节点（见 runFillColor 注释）；
      // fallback 链上的节点也是 rPr 类（defRPr），同样可能带 `a:ln`，同理处理。
      (g ? e.hlink : null) || ae(a, e) || l.map((K) => ae(K, e)).find(Boolean) || n || e.dk1
    )
  };
}
const vn = 1.2;
function Bt(a, t, e, n) {
  const s = Zl(a, t, e), l = ca(s, "spcPts");
  if (l) return Na(Number(Z(l, "val", 0)) / 100);
  const r = ca(s, "spcPct");
  return r ? vn * n * Number(Z(r, "val", 0)) / 1e5 : 0;
}
function Zl(a, t, e) {
  return na(a, e) || wt(t).map((n) => na(n, e)).find(Boolean) || null;
}
function Ue(a, t = []) {
  const e = na(a, "lnSpc") || wt(t).map((l) => na(l, "lnSpc")).find(Boolean), n = ca(e, "spcPct");
  if (n)
    return {
      type: "percent",
      value: Number(Z(n, "val", 1e5)) / 1e5,
      explicit: !0
    };
  const s = ca(e, "spcPts");
  return s ? {
    type: "points",
    value: Na(Number(Z(s, "val", 0)) / 100),
    explicit: !0
  } : { type: "percent", value: 1, explicit: !1 };
}
function Ln(a, t) {
  return (t == null ? void 0 : t.type) === "points" && t.value > 0 ? t.value : a * 1.2 * Math.max(0.1, (t == null ? void 0 : t.value) || 1);
}
function We(a) {
  return (a == null ? void 0 : a.type) === "points" && a.value > 0 ? null : Math.max(0.1, (a == null ? void 0 : a.value) || 1);
}
const zl = [
  ["microsoft yahei", 1.05811, 0.26172],
  ["msyh", 1.05811, 0.26172],
  ["simhei", 0.85938, 0.14062],
  ["simsun", 0.85938, 0.14062],
  ["songti sc", 0.86, 0.14],
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
], Hl = [1.05811, 0.26172];
function hn(a) {
  const t = String(a || "").toLowerCase();
  let e = null, n = 1 / 0;
  for (const [s, l, r] of zl) {
    const m = t.indexOf(s);
    m >= 0 && m < n && (n = m, e = [l, r]);
  }
  return e || Hl;
}
function Pt(a) {
  const [t, e] = hn(a);
  return vn * e / (t + e);
}
const Ul = 0.9, Wl = {
  base: 0.9,
  auto: 0.9,
  ctr: 1,
  t: 1.0333
};
function Gl(a) {
  return Wl[a == null ? void 0 : a.fontAlign] ?? Ul;
}
const Xl = { ctr: 1, t: 1.0333 };
function Vl(a, t) {
  const e = t.lineSpacing;
  if ((e == null ? void 0 : e.explicit) && e.type === "percent" && e.value > 1)
    return a.maxFontSize * Gl(t) * e.value;
  const s = Xl[t == null ? void 0 : t.fontAlign];
  if (s && !(e != null && e.explicit))
    return a.maxFontSize * s;
  const l = a.segments.length ? a.segments.map((f) => f.style) : t.runs.map((f) => f.style);
  let r = 0, m = 0, c = 0;
  for (const f of l) {
    const y = (f == null ? void 0 : f.fontSize) || a.maxFontSize;
    r = Math.max(r, y * Pt(f == null ? void 0 : f.fontFamily)), y >= a.maxFontSize - 0.01 && (m += 1, f != null && f.syntheticBold && (c += 1));
  }
  r || (r = a.maxFontSize * Pt(null));
  const i = m > 0 && c === m, d = a.maxFontSize * vn - r, o = i ? (a.maxFontSize + 8) / 102 : 0;
  return (e == null ? void 0 : e.explicit) && e.type === "percent" && e.value < 1 ? d * e.value - o : d - o;
}
function se(a, t) {
  const e = (a == null ? void 0 : a.localName) === "txBody" ? a : na(a, "txBody"), n = e ? na(e, "lstStyle") : a;
  return na(n, `lvl${Math.min(9, t + 1)}pPr`) || na(n, "defPPr");
}
function Yl(a, t, e = null, n = null, s = []) {
  const l = s.find((h) => (h == null ? void 0 : h.localName) === "txBody"), r = na(a, "txBody") || l || null;
  if (!r) return null;
  const m = na(r, "bodyPr"), c = s.map((h) => (h == null ? void 0 : h.localName) === "txBody" ? na(h, "bodyPr") : null).filter(Boolean), i = Ma(
    e ? ca(e, "fontRef") : null,
    t
  ), d = [], o = Oa(r, "p").map((h) => {
    var P;
    const g = na(h, "pPr"), v = Number(Z(g, "lvl", 0)), A = na(g, "defRPr"), j = na(h, "endParaRPr"), $ = s.map((F) => se(F, v)).filter(Boolean), k = se(r, v);
    k && $.unshift(k);
    const S = [
      A,
      ...$.map((F) => na(F, "defRPr"))
    ].filter(Boolean), E = [];
    for (const F of wa(h))
      if (F.localName === "r" || F.localName === "fld") {
        const J = ((P = na(F, "t")) == null ? void 0 : P.textContent) || "";
        E.push({
          text: J,
          style: Qa(
            na(F, "rPr"),
            S,
            t,
            i,
            n
          )
        });
      } else F.localName === "br" && E.push({
        text: `
`,
        style: Qa(
          na(F, "rPr"),
          S,
          t,
          i,
          n
        )
      });
    (!E.length || E.every((F) => F.text === "")) && E.push({
      text: "",
      style: Qa(
        null,
        [...S, j].filter(Boolean),
        t,
        i,
        n
      )
    });
    let X = null;
    const _ = [g, ...$].filter(Boolean), C = _.map((F) => {
      const J = na(F, "buChar");
      return J ? { charNode: J, owner: F } : null;
    }).find(Boolean), w = (C == null ? void 0 : C.charNode) || null, q = _.map((F) => na(F, "buAutoNum")).find(Boolean), T = _.map((F) => na(F, "buNone")).find(Boolean), I = E.some((F) => F.text !== "" && F.text !== `
`);
    if (!T && w && I) {
      const F = Z(w, "char", "•"), J = C ? na(C.owner, "buFont") : null;
      X = Ol(J ? Z(J, "typeface", "") : "", F) || F;
    } else if (!T && q && I) {
      const F = Number(Z(q, "startAt", 1));
      d[v] = d[v] == null ? F : d[v] + 1, d.length = v + 1;
      const J = d[v];
      X = Z(q, "type", "arabicPeriod").includes("Paren") ? `${J})` : `${J}.`;
    }
    const U = _.map((F) => na(F, "tabLst")).find(Boolean), N = U ? Oa(U, "tab").map((F) => ({
      pos: xa(Number(Z(F, "pos", 0))),
      algn: Z(F, "algn", "l")
    })) : [], z = Math.max(1, ...E.map((F) => F.style.fontSize));
    return {
      runs: E,
      tabs: N,
      align: pa(g, $, "algn", "l"),
      // `a:fontAlgn` — see FONT_ALIGN_BASELINE_PER_LINE. Default is `base`, which is
      // the model this file has always implemented, so absent/auto/base all cost 0.
      fontAlign: pa(g, $, "fontAlgn", "base"),
      latinLineBreak: Aa(pa(g, $, "latinLnBrk", "0")),
      eastAsianLineBreak: Aa(pa(g, $, "eaLnBrk", "1")),
      hangingPunct: Aa(pa(g, $, "hangingPunct", "1")),
      level: v,
      bullet: X,
      marginLeft: xa(pa(g, $, "marL", v * 457200)),
      indent: xa(pa(g, $, "indent", X ? -228600 : 0)),
      // ⭐ R47：段落**自身**的 `a:pPr` 是否声明了 `indent`（**不沿继承链**）。
      // Office 用它决定「行首手工半角空格」是被折进首行缩进还是当真字形排入，
      // 见 wrapStyledRuns 的判据。⚠️ 必须是「自身声明」而不是 `indent !== 0`：
      // real-4 的母版给正文带了 indent=711200，s28 目标段靠继承拿到 56pt 但
      // **自身未声明**，Office 照样把那个半角空格当字形排出来（实测）。
      indentDeclared: Z(g, "indent", null) !== null,
      lineSpacing: Ue(g, $),
      spaceBefore: Bt(
        g,
        $,
        "spcBef",
        z
      ),
      spaceAfter: Bt(
        g,
        $,
        "spcAft",
        z
      )
    };
  }), x = xt(m, c, "normAutofit"), f = xt(m, c, "spAutoFit"), y = xt(m, c, "noAutofit"), u = x ? Math.max(0.01, Number(Z(x, "fontScale", 1e5)) / 1e5) : 1;
  if (u !== 1)
    for (const h of o)
      for (const g of h.runs)
        g.style = { ...g.style, fontSize: g.style.fontSize * u };
  return {
    paragraphs: o,
    vertical: pa(m, c, "vert", "horz"),
    wrap: pa(m, c, "wrap", "square") !== "none",
    autoFit: x ? "normal" : f ? "shape" : y ? "none" : null,
    fontScale: u,
    anchor: pa(m, c, "anchor", "t"),
    insetLeft: xa(pa(m, c, "lIns", 91440)),
    insetRight: xa(pa(m, c, "rIns", 91440)),
    insetTop: xa(pa(m, c, "tIns", 45720)),
    insetBottom: xa(pa(m, c, "bIns", 45720))
  };
}
function Ea(a) {
  const t = ca(a, "cNvPr");
  return Z(t, "id", null);
}
async function Ql(a, t, e, n, s, l = {}) {
  const r = na(a, "spPr"), m = ht(r), c = l.inheritedShape ? ht(na(l.inheritedShape, "spPr")) : null, i = m || c;
  if (!i) return null;
  const d = na(a, "style"), o = ca(r, "prstGeom"), x = o ? null : ca(r, "custGeom"), f = x ? Xe(x) : null, y = f ? "custGeom" : Z(o, "prst", "rect"), u = {};
  for (const A of va(o && na(o, "avLst"), "gd")) {
    const j = Z(A, "fmla", ""), $ = Number(j.replace(/^val\s+/, ""));
    Number.isFinite($) && (u[Z(A, "name", "adj")] = $);
  }
  const h = Yl(a, n, d, t, l.inheritedTextSources || []), g = ca(a, "cNvPr"), v = ca(r, "blipFill");
  if (v && t) {
    const A = await Ke(r, t, e, n);
    if (A)
      return {
        type: "image",
        spid: Ea(a),
        name: Z(g, "name", "Shape"),
        ...i,
        src: A,
        opacity: Ge(ca(v, "blip")),
        fallback: !1
      };
  }
  return {
    type: "shape",
    spid: Ea(a),
    name: Z(g, "name", "Shape"),
    placeholderType: l.placeholderType || null,
    ...i,
    preset: y,
    customGeometry: f,
    adjustments: u,
    fill: gt(r, d, n, { w: i.width, h: i.height }, s),
    line: Ne(r, d, n),
    shadow: jl(r, d, n),
    text: h,
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
function Kl(a, t) {
  const e = na(a, "spPr"), n = ht(e);
  if (!n) return null;
  const s = ca(e, "prstGeom");
  return {
    type: "line",
    spid: Ea(a),
    ...n,
    preset: Z(s, "prst", "straightConnector1"),
    fill: "none",
    line: Ne(e, na(a, "style"), t),
    fallback: !1
  };
}
function Ge(a) {
  let t = 1;
  const e = ca(a, "alphaModFix"), n = ca(a, "alphaMod"), s = ca(a, "alphaOff");
  return e && (t *= Number(Z(e, "amt", 1e5)) / 1e5), n && (t *= Number(Z(n, "amt", 1e5)) / 1e5), s && (t += Number(Z(s, "amt", 0)) / 1e5), Math.max(0, Math.min(1, t));
}
function Xe(a) {
  const t = (s) => wa(s).filter((l) => l.localName === "pt").map((l) => ({ x: Z(l, "x", "0"), y: Z(l, "y", "0") })), e = (s) => va(na(a, s), "gd").map((l) => ({
    name: Z(l, "name", ""),
    fmla: Z(l, "fmla", "")
  })), n = va(na(a, "pathLst"), "path").map((s) => {
    const l = [];
    for (const r of wa(s))
      switch (r.localName) {
        case "moveTo":
          l.push({ c: "M", pts: t(r) });
          break;
        case "lnTo":
          l.push({ c: "L", pts: t(r) });
          break;
        case "cubicBezTo":
          l.push({ c: "C", pts: t(r) });
          break;
        case "quadBezTo":
          l.push({ c: "Q", pts: t(r) });
          break;
        case "arcTo":
          l.push({
            c: "A",
            wR: Z(r, "wR", "0"),
            hR: Z(r, "hR", "0"),
            stAng: Z(r, "stAng", "0"),
            swAng: Z(r, "swAng", "0")
          });
          break;
        case "close":
          l.push({ c: "Z" });
          break;
      }
    return {
      w: Number(Z(s, "w", "0")),
      h: Number(Z(s, "h", "0")),
      cmds: l
    };
  });
  return { av: e("avLst"), gd: e("gdLst"), paths: n };
}
async function Ve(a, t, e, n, s) {
  const l = na(a, "spPr"), r = ht(l);
  if (!r) return null;
  const m = Qe(a, r, t, s), c = (() => {
    const A = ca(l, "custGeom");
    return A ? ve(Xe(A), r.width, r.height, {}) : null;
  })(), i = Ea(a);
  (i == null || i === "") && s.diagnostics.add({
    code: "shape.missing-id",
    severity: "warn",
    scope: { part: "pic" },
    message: "图片 cNvPr 缺 id（spid 无法追踪）"
  });
  const d = ca(a, "blip"), o = Ia(d, "embed"), x = t.get(o);
  if (!x)
    return s.diagnostics.add({
      code: "media.dangling-embed",
      severity: "warn",
      scope: { part: o || null },
      message: `图片 r:embed 指向不存在的 rId：${o || "(空)"}`
    }), { type: "unsupported", ...r, label: "Missing image", fallback: !0 };
  if (x.external)
    return { type: "unsupported", ...r, label: "External image", fallback: !0 };
  const f = e.file(x.path);
  if (!f)
    return s.diagnostics.add({
      code: "media.file-missing",
      severity: "warn",
      scope: { part: x.path },
      message: `关系指向的媒体文件不存在：${x.path}`
    }), { type: "unsupported", ...r, label: "Missing image", fallback: !0 };
  const y = Ut(x.path), u = await f.async("uint8array");
  if (ss(e, x.path, u), u.byteLength > me)
    return s.diagnostics.add({
      code: "media.over-entry-budget",
      severity: "warn",
      scope: { part: x.path },
      message: `媒体 ${x.path} 解压后 ${u.byteLength} 字节 > 单文件预算 ${me}`
    }), { type: "unsupported", ...r, label: "Image too large", fallback: !0 };
  if (s.mediaBudget.totalBytes += u.byteLength, s.mediaBudget.totalBytes > ce)
    return s.diagnostics.add({
      code: "media.over-total-budget",
      severity: "warn",
      scope: { part: x.path },
      message: `媒体累计 ${s.mediaBudget.totalBytes} 字节 > 总量预算 ${ce}`
    }), { type: "unsupported", ...r, label: "Image too large", fallback: !0 };
  const h = Math.max(256, Math.min(2048, Math.ceil(r.width * 4))), g = Math.max(256, Math.min(2048, Math.ceil(r.height * 4))), v = await _e(
    u,
    y,
    h,
    g,
    r.width,
    Pe(d, n),
    // 内嵌 PDF 渲染失败时 mediaToDataUrl 会**继续回退**并多半成功返回一张残缺图，
    // 只看 `src` 分辨不出来 ⇒ 让它把这条诊断报进 deck.diagnostics。
    (A) => s.diagnostics.add({
      ...A,
      severity: "warn",
      scope: { part: x.path }
    })
  );
  return v ? {
    type: "image",
    spid: Ea(a),
    ...r,
    ...m ? { media: m } : {},
    src: v,
    opacity: Ge(d),
    geometryPath: c,
    crop: (() => {
      const A = ca(a, "srcRect");
      if (!A) return null;
      const j = {
        left: Number(Z(A, "l", 0)) / 1e5,
        top: Number(Z(A, "t", 0)) / 1e5,
        right: Number(Z(A, "r", 0)) / 1e5,
        bottom: Number(Z(A, "b", 0)) / 1e5
      };
      return Object.values(j).some(($) => $ > 0) ? j : null;
    })(),
    duotone: (() => {
      const A = ca(d, "duotone");
      if (!A) return null;
      const j = wa(A).map(($) => Ka($, n)).filter(Boolean);
      return j.length >= 2 ? { dark: j[0], light: j[1] } : null;
    })(),
    fallback: !1
  } : (s.diagnostics.add({
    code: "media.decode-failed",
    severity: "warn",
    scope: { part: x.path },
    message: `媒体解码失败：${x.path}（${y}）`
  }), {
    type: "unsupported",
    ...r,
    label: y.split("/").pop().toUpperCase(),
    fallback: !0
  });
}
function Ye(a, t) {
  if (!a) return a;
  let e = parseInt(a.slice(0, 2), 16) / 255, n = parseInt(a.slice(2, 4), 16) / 255, s = parseInt(a.slice(4, 6), 16) / 255;
  const l = (d) => Math.max(0, Math.min(1, d)), r = (d) => d <= 0.04045 ? d / 12.92 : Math.pow((d + 0.055) / 1.055, 2.4), m = (d) => d <= 31308e-7 ? d * 12.92 : 1.055 * Math.pow(d, 1 / 2.4) - 0.055, c = (d, o, x) => {
    const f = Math.max(d, o, x), y = Math.min(d, o, x), u = (f + y) / 2;
    if (f === y) return [0, 0, u];
    const h = f - y, g = u > 0.5 ? h / (2 - f - y) : h / (f + y);
    let v;
    return f === d ? v = (o - x) / h + (o < x ? 6 : 0) : f === o ? v = (x - d) / h + 2 : v = (d - o) / h + 4, [v / 6, g, u];
  }, i = (d, o, x) => {
    if (o === 0) return [x, x, x];
    const f = (h, g, v) => {
      let A = v;
      return A < 0 && (A += 1), A > 1 && (A -= 1), A < 1 / 6 ? h + (g - h) * 6 * A : A < 1 / 2 ? g : A < 2 / 3 ? h + (g - h) * (2 / 3 - A) * 6 : h;
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
      e = m(l(r(e) * x + (1 - x))), n = m(l(r(n) * x + (1 - x))), s = m(l(r(s) * x + (1 - x)));
    else if (d === "shade")
      e = m(l(r(e) * x)), n = m(l(r(n) * x)), s = m(l(r(s) * x));
    else if (d === "lumMod") {
      const [f, y, u] = c(e, n, s);
      [e, n, s] = i(f, y, l(u * x));
    } else if (d === "lumOff") {
      const [f, y, u] = c(e, n, s);
      [e, n, s] = i(f, y, l(u + x));
    } else if (d === "satMod") {
      const [f, y, u] = c(e, n, s);
      [e, n, s] = i(f, l(y * x), u);
    } else if (d === "gamma" || d === "invGamma") {
      const f = d === "gamma" ? m : r;
      e = f(l(e)), n = f(l(n)), s = f(l(s));
    }
  }
  return `#${[e, n, s].map((d) => Math.round(l(d) * 255).toString(16).padStart(2, "0")).join("")}`;
}
function Ka(a, t) {
  if (!a) return null;
  const e = Be(a, t);
  if (!e) return null;
  const n = [];
  let s = 1;
  for (const c of wa(a)) {
    const i = c.localName, d = Number(Z(c, "val", 0));
    i === "alpha" ? s = d / 1e5 : i === "alphaMod" ? s *= d / 1e5 : i === "alphaOff" ? s += d / 1e5 : i === "gamma" || i === "invGamma" ? n.push([i, 0]) : i && d && n.push([i, d]);
  }
  const l = n.length ? Ye(e.slice(1), n) : e, r = Math.max(0, Math.min(1, s));
  if (r >= 0.999) return l;
  const m = Math.round(r * 255).toString(16).padStart(2, "0");
  return `${l.slice(0, 7)}${m}`;
}
async function Jl(a, t) {
  const e = /* @__PURE__ */ new Map(), n = await a.readXmlPart("ppt/tableStyles.xml", !1);
  if (!n) return e;
  for (const s of va(n, "tblStyle")) {
    const l = Z(s, "styleId");
    if (!l) continue;
    const r = {};
    for (const m of wa(s)) {
      const c = m.localName, i = na(m, "tcStyle"), d = na(m, "tcTxStyle"), o = i ? na(i, "fill") : null, x = o ? na(o, "solidFill") : null, f = x ? ca(x, "schemeClr") || ca(x, "srgbClr") : null;
      if (r[c] = {
        fill: f ? Ka(f, t) : null,
        textColor: null,
        bold: !1
      }, d) {
        const y = ca(d, "fontRef"), u = y ? wa(y)[0] : null;
        r[c].textColor = u ? Ka(u, t) : null;
        const h = ca(d, "schemeClr");
        h && (r[c].textColor = Ka(h, t)), Z(d, "b") === "on" && (r[c].bold = !0);
      }
    }
    e.set(l, r);
  }
  return e;
}
function ar(a, t) {
  var s;
  const e = na(a, "txBody"), n = [];
  if (e) {
    const l = na(e, "bodyPr"), r = [];
    for (const m of Oa(e, "p")) {
      const c = na(m, "pPr"), i = Number(Z(c, "lvl", 0)), d = na(c, "defRPr"), o = na(m, "endParaRPr"), x = d, f = [];
      for (const j of wa(m))
        if (j.localName === "r" || j.localName === "fld") {
          const $ = ((s = na(j, "t")) == null ? void 0 : s.textContent) || "";
          f.push({
            text: $,
            style: Qa(
              na(j, "rPr"),
              x,
              t,
              null,
              null
            )
          });
        } else j.localName === "br" && f.push({
          text: `
`,
          style: Qa(
            na(j, "rPr"),
            x,
            t,
            null,
            null
          )
        });
      f.length || f.push({
        text: "",
        style: Qa(
          null,
          d || o,
          t,
          null,
          null
        )
      });
      let y = null;
      const u = na(c, "buChar"), h = na(c, "buAutoNum"), g = na(c, "buNone"), v = f.some((j) => j.text !== "" && j.text !== `
`);
      if (!g && u && v)
        y = Z(u, "char", "•");
      else if (!g && h && v) {
        const j = Number(Z(h, "startAt", 1));
        r[i] = r[i] == null ? j : r[i] + 1, y = `${r[i]}.`;
      }
      const A = Math.max(1, ...f.map((j) => j.style.fontSize));
      n.push({
        runs: f,
        align: Z(c, "algn", "l"),
        latinLineBreak: Aa(Z(c, "latinLnBrk", "0")),
        eastAsianLineBreak: Aa(Z(c, "eaLnBrk", "1")),
        hangingPunct: Aa(Z(c, "hangingPunct", "1")),
        level: i,
        bullet: y,
        marL: xa(Z(c, "marL", 0)),
        indent: xa(Z(c, "indent", 0)),
        // ⭐ R47：同上，「自身 pPr 是否声明 indent」。
        indentDeclared: Z(c, "indent", null) !== null,
        lineSpacing: Ue(c),
        spaceBefore: Bt(
          c,
          [],
          "spcBef",
          A
        ),
        spaceAfter: Bt(
          c,
          [],
          "spcAft",
          A
        )
      });
    }
    return {
      paragraphs: n,
      wrap: Z(l, "wrap", "square") !== "none",
      anchor: Z(l, "anchor", "t"),
      insetLeft: xa(Z(l, "lIns", 91440)),
      insetRight: xa(Z(l, "rIns", 91440)),
      insetTop: xa(Z(l, "tIns", 45720)),
      insetBottom: xa(Z(l, "bIns", 45720))
    };
  }
  return null;
}
function tr(a, t, e, n, s, l) {
  if (!l) return null;
  const r = Aa(Z(s, "firstRow", "0")), m = Aa(Z(s, "lastRow", "0")), c = Aa(Z(s, "firstCol", "0")), i = Aa(Z(s, "lastCol", "0")), d = Aa(Z(s, "bandRow", "0")), o = Aa(Z(s, "bandCol", "0"));
  if (r && a === 0 && l.firstRow) return l.firstRow;
  if (m && a === e - 1 && l.lastRow) return l.lastRow;
  if (c && t === 0 && l.firstCol) return l.firstCol;
  if (i && t === n - 1 && l.lastCol) return l.lastCol;
  if (d && l.band1H) {
    const x = r ? a - 1 : a;
    if (x >= 0 && x % 2 === 0) return l.band1H;
  }
  if (d && l.band2H) {
    const x = r ? a - 1 : a;
    if (x >= 0 && x % 2 === 1) return l.band2H;
  }
  if (o && l.band1V) {
    const x = c ? t - 1 : t;
    if (x >= 0 && x % 2 === 0) return l.band1V;
  }
  return l.wholeTbl || null;
}
function nr(a, t, e, n) {
  const s = ca(a, "tbl");
  if (!s) return null;
  const l = na(s, "tblGrid"), r = Oa(l, "gridCol").map(
    (g) => xa(Z(g, "w", 914400))
  ), m = na(s, "tblPr"), c = Aa(Z(m, "firstRow", "0")), i = Aa(Z(m, "bandRow", "0")), d = ca(m, "tableStyleId"), o = d ? d.textContent.trim() : null;
  let x = o && e && e.get(o) || null;
  if (!x && o === "{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}") {
    const g = t.accent1 || "#4472c4", v = t.lt1 || "#ffffff", A = { color: v, width: xa(12700) }, j = { color: v, width: xa(38100) }, $ = { top: A, bottom: A, left: A, right: A };
    x = {
      // ⚠️ 每个区域都显式带上 `borders`（而不是只在 wholeTbl 上写、指望下游回落）：
      // 实测 R1/R2/R3（band 区域）**都有** 1pt 白线，而我方 `resolveCellStyle` 返回的
      // 是**匹配到的那个区域**，band1H/band2H 上若没有 borders 就会一条线都不画。
      // 每个区域各写一份，等价于「band 回落 wholeTbl」，且不依赖对样式 XML 细节的猜测。
      wholeTbl: { fill: "#ffffff", textColor: t.tx1 || "#000000", bold: !1, borders: $ },
      firstRow: {
        fill: g,
        textColor: "#ffffff",
        bold: !0,
        borders: { ...$, bottom: j }
      },
      band1H: { fill: ye(g, 0.6), textColor: t.tx1 || "#000000", bold: !1, borders: $ },
      band2H: { fill: ye(g, 0.8), textColor: t.tx1 || "#000000", bold: !1, borders: $ }
    };
  }
  const f = Oa(s, "tr"), y = f.length, u = r.length, h = f.map((g, v) => {
    const A = xa(Z(g, "h", 457200));
    let j = 0;
    const $ = Oa(g, "tc").map((k) => {
      const S = Z(k, "hMerge", "0"), E = Z(k, "vMerge", "0"), X = S === "1" || S === "true", _ = E === "1" || E === "true", C = na(k, "tcPr"), w = Number(Z(k, "gridSpan", "1")), q = Number(Z(k, "rowSpan", "1")), T = r.slice(j, j + Math.max(1, w)).reduce((ma, Q) => ma + Q, 0), I = C ? gt(C, null, t, { w: T, h: A }, n) : "none", U = _l(C, t), N = Z(C, "anchor", "t"), z = ar(k, t), P = xa(Z(C, "marL", 91440)), F = xa(Z(C, "marR", 91440)), J = xa(Z(C, "marT", 45720)), K = xa(Z(C, "marB", 45720)), Y = tr(
        v,
        j,
        y,
        u,
        m,
        x
      ), fa = U || (Y == null ? void 0 : Y.borders) || null, da = I !== "none" ? I : Y != null && Y.fill ? Y.fill : "none", W = Y != null && Y.textColor ? { color: Y.textColor, bold: Y.bold } : null, ta = j;
      return j += X ? 0 : w, {
        text: z,
        fill: da,
        anchor: N,
        col: ta,
        gridSpan: w,
        rowSpan: q,
        hMerge: X,
        vMerge: _,
        marL: P,
        marR: F,
        marT: J,
        marB: K,
        borders: fa,
        styleOverride: W
      };
    });
    return { height: A, cells: $ };
  });
  return { columnWidths: r, rows: h, firstRow: c, bandRow: i, styleRegions: x, tableProperties: m };
}
const er = [
  ["videoFile", "video"],
  ["audioFile", "audio"]
];
function sr(a, t) {
  const e = ca(a, "blip");
  if (!e) return null;
  const n = t.get(
    Ia(e, "embed") || Ia(e, "link")
  );
  return !n || n.external ? null : n.path;
}
function Qe(a, t, e, n) {
  if (!a || !e || !t) return null;
  for (const [s, l] of er) {
    const r = ca(a, s);
    if (!r) continue;
    const m = Ia(r, "link") || Ia(r, "embed"), c = e.get(m);
    return c ? c.external ? null : {
      kind: l,
      part: c.path,
      mime: Ut(c.path),
      rect: {
        x: t.x,
        y: t.y,
        width: t.width,
        height: t.height
      },
      posterPart: sr(a, e)
    } : (n.diagnostics.add({
      code: "media.dangling-embed",
      severity: "warn",
      scope: { part: m || null },
      message: `媒体 r:link/r:embed 指向不存在的 rId：${m || "(空)"}`
    }), null);
  }
  return null;
}
function lr(a) {
  const t = [], e = (n, s) => {
    if (!(!Array.isArray(n) || s > 8))
      for (const l of n)
        !l || typeof l != "object" || (l.media && t.push({ id: `m${t.length + 1}`, ...l.media }), Array.isArray(l.children) && e(l.children, s + 1), Array.isArray(l.elements) && e(l.elements, s + 1));
  };
  return e(a, 0), t;
}
function rr(a, t) {
  const e = (a == null ? void 0 : a.documentElement) || a;
  if (!e || !t) return [];
  const n = [];
  for (const s of va(e, "sndTgt")) {
    const l = t.get(Ia(s, "embed"));
    if (!l || l.external) continue;
    const r = l.path;
    n.some((m) => m.part === r) || n.push({ part: r, mime: Ut(r), name: Z(s, "name", "") || null });
  }
  return n;
}
async function mr(a, t, e, n, s, l, r) {
  const m = ht(ca(a, "xfrm"));
  if (!m) return null;
  const c = Qe(a, m, t, r), i = !!ca(a, "tbl"), d = !!ca(a, "chart"), o = va(a, "oleObj"), x = o[0] || null, f = o.find((h) => ca(h, "pic")) || null, y = !!x, u = Z(x, "progId", "");
  if (y && t && e) {
    const h = f ? ca(f, "pic") : null;
    if (h) {
      const g = await Ve(h, t, e, n, r);
      if ((g == null ? void 0 : g.type) === "image") {
        const v = gt(
          na(h, "spPr"),
          null,
          n,
          { w: g.width, h: g.height },
          l
        );
        return {
          ...g,
          backgroundFill: v,
          spid: Ea(a),
          progId: u,
          oleFallback: !0,
          fallback: !1
        };
      }
    }
  }
  if (i) {
    const h = nr(a, n, s, l);
    if (h)
      return {
        type: "table",
        spid: Ea(a),
        ...m,
        table: h,
        fallback: !1
      };
  }
  if (d && t && e) {
    const h = ca(a, "chart"), g = Ia(h, "id"), v = t.get(g);
    if (v && !v.external) {
      const A = e.file(v.path);
      if (A) {
        const j = await A.async("text"), $ = (Wt || Te)(j), k = C0($.documentElement, n, r);
        if (k)
          return {
            type: "chart",
            spid: Ea(a),
            ...m,
            chart: k,
            fallback: !1
          };
      }
    }
  }
  return {
    type: "unsupported",
    spid: Ea(a),
    ...m,
    label: d ? "Chart" : "Graphic",
    hideFallback: y,
    fallback: !0,
    // R94：视频 / 音频的元数据随元素一起带出去（渲染不受影响）
    ...c ? { media: c } : {}
  };
}
async function Ke(a, t, e, n = null) {
  if (!a) return null;
  const s = na(a, "blipFill") || ca(a, "blipFill");
  if (!s) return null;
  const l = na(s, "blip") || ca(s, "blip");
  if (!l) return null;
  const r = Ia(l, "embed"), m = t.get(r);
  if (!m || m.external) return null;
  const c = e.file(m.path);
  if (!c) return null;
  const i = Ut(m.path), d = await c.async("uint8array");
  return ss(e, m.path, d), await _e(d, i, 2048, 2048, 0, Pe(l, n));
}
function tn(a, t) {
  if (!a) return null;
  for (const e of a.values())
    if (e.type && e.type.endsWith(t))
      return e;
  return null;
}
async function nn(a, t, e, n, s, l) {
  const r = ca(a, "bg");
  if (!r) return null;
  const m = na(r, "bgPr");
  if (m) {
    const i = await Ke(m, e, n, t);
    return i ? { type: "image", value: i } : { type: "color", value: gt(m, null, t, s, l) || "#ffffff" };
  }
  const c = na(r, "bgRef");
  return c ? { type: "color", value: Ma(c, t) || "#ffffff" } : null;
}
async function cr(a, t, e) {
  const n = {
    layoutDocument: null,
    layoutRelationships: /* @__PURE__ */ new Map(),
    masterDocument: null,
    masterRelationships: /* @__PURE__ */ new Map(),
    themePath: null
  }, s = tn(t, "/slideLayout");
  if (!s || (n.layoutDocument = await a.readXmlPart(s.path, !1), !n.layoutDocument)) return n;
  const l = await a.readXmlPart(It(s.path), !1);
  n.layoutRelationships = l ? Dt(l, s.path, e) : /* @__PURE__ */ new Map();
  const r = tn(n.layoutRelationships, "/slideMaster");
  if (!r || (n.masterDocument = await a.readXmlPart(r.path, !1), !n.masterDocument)) return n;
  const m = await a.readXmlPart(It(r.path), !1);
  n.masterRelationships = m ? Dt(m, r.path, e) : /* @__PURE__ */ new Map();
  const c = tn(n.masterRelationships, "/theme");
  return n.themePath = (c == null ? void 0 : c.path) || null, n;
}
async function ir(a, t, e, n, s, l, r) {
  const m = await nn(t, e, n, a, l, r);
  if (m) return m;
  if (s.layoutDocument) {
    const c = await nn(
      s.layoutDocument,
      e,
      s.layoutRelationships,
      a,
      l,
      r
    );
    if (c) return c;
  }
  if (s.masterDocument) {
    const c = await nn(
      s.masterDocument,
      e,
      s.masterRelationships,
      a,
      l,
      r
    );
    if (c) return c;
  }
  return { type: "color", value: "#ffffff" };
}
function Je(a) {
  const t = ca(a, "nvPr");
  return !!(t && ca(t, "ph"));
}
function pn(a) {
  const t = ca(ca(a, "nvPr"), "ph");
  return t ? {
    type: Z(t, "type", "body"),
    idx: Z(t, "idx", null)
  } : null;
}
const or = { ctrTitle: ["title"], title: ["ctrTitle"] };
function le(a, t) {
  if (!a || !t) return null;
  const e = va(a, "sp").filter(Je);
  if (t.idx !== null) {
    const s = e.find((l) => {
      var r;
      return ((r = pn(l)) == null ? void 0 : r.idx) === t.idx;
    });
    if (s) return s;
  }
  const n = [t.type, ...or[t.type] || []];
  for (const s of n) {
    const l = e.find((r) => {
      var m;
      return ((m = pn(r)) == null ? void 0 : m.type) === s;
    });
    if (l) return l;
  }
  return null;
}
function fr(a, t) {
  const e = ca(a, "txStyles");
  return e ? t === "title" || t === "ctrTitle" ? na(e, "titleStyle") : ["body", "obj", "subTitle"].includes(t) ? na(e, "bodyStyle") : na(e, "otherStyle") : null;
}
function as(a, t) {
  const e = t.width / t.chExt.cx, n = t.height / t.chExt.cy;
  if (a.x !== void 0 && (a.x = t.x + (a.x - t.chOff.x) * e, a.y = t.y + (a.y - t.chOff.y) * n, a.width !== void 0 && (a.width *= e), a.height !== void 0 && (a.height *= n)), a.type === "group")
    for (const s of a.elements) as(s, t);
}
const dr = /* @__PURE__ */ new Set(["shape", "line", "image", "chart", "group"]);
function ts(a) {
  return dr.has(a.type) ? a.type !== "group" || a.elements.every(ts) : !1;
}
function ns(a, t) {
  if (a.x !== void 0 && a.width !== void 0 && t.flipH && (a.x = 2 * (t.x + t.width / 2) - a.x - a.width), a.y !== void 0 && a.height !== void 0 && t.flipV && (a.y = 2 * (t.y + t.height / 2) - a.y - a.height), t.flipH && (a.flipH = !a.flipH, a.rotation = -(a.rotation || 0)), t.flipV && (a.flipV = !a.flipV, a.rotation = -(a.rotation || 0)), a.type === "group")
    for (const e of a.elements) ns(e, t);
}
async function St(a, t, e, n, s, l, r = {}, m) {
  const c = (a == null ? void 0 : a.localName) === "grpSp" ? a : ca(a, "spTree"), i = [], d = r.skipPlaceholders === !0;
  for (const o of wa(c)) {
    if (d && Je(o)) continue;
    if (o.localName === "grpSp") {
      const f = await St(
        o,
        t,
        e,
        n,
        s,
        l,
        { ...r, sourceLevel: r.sourceLevel || "slide" },
        m
      ), y = na(o, "grpSpPr"), u = y ? na(y, "xfrm") : null;
      if (u) {
        const h = xr(u);
        if (h && h.chExt.cx > 0 && h.chExt.cy > 0) {
          for (const v of f)
            as(v, h);
          const g = (h.flipH || h.flipV) && f.every(ts);
          if (g) for (const v of f) ns(v, h);
          i.push({
            type: "group",
            spid: Ea(o),
            sourceLevel: r.sourceLevel || "slide",
            x: h.x,
            y: h.y,
            width: h.width,
            height: h.height,
            rotation: h.rotation,
            // 烘焙过的 flip 已经落到子元素身上，组自己不能再翻一次。
            flipH: g ? !1 : h.flipH,
            flipV: g ? !1 : h.flipV,
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
      const f = pn(o), y = f ? le(r.placeholderLayoutDocument, f) : null, u = f ? le(r.placeholderMasterDocument, f) : null, g = [y, u].find(
        (A) => A && ca(A, "xfrm")
      ) || y || u, v = [
        y ? na(y, "txBody") : null,
        u ? na(u, "txBody") : null,
        f ? fr(r.placeholderMasterDocument, f.type) : null
      ].filter(Boolean);
      x = await Ql(o, t, e, n, l, {
        inheritedShape: g,
        inheritedTextSources: v,
        placeholderType: (f == null ? void 0 : f.type) || null,
        slideSize: r.slideSize
      });
    }
    o.localName === "pic" && (x = await Ve(o, t, e, n, m)), o.localName === "cxnSp" && (x = Kl(o, n)), o.localName === "graphicFrame" && (x = await mr(o, t, e, n, s, l, m)), x && (x.sourceLevel = r.sourceLevel || "slide", i.push(x));
  }
  return i;
}
function xr(a) {
  if (!a) return null;
  const t = na(a, "off"), e = na(a, "ext"), n = na(a, "chOff"), s = na(a, "chExt");
  return !t || !e ? null : {
    x: xa(Z(t, "x", 0)),
    y: xa(Z(t, "y", 0)),
    width: xa(Z(e, "cx", 0)),
    height: xa(Z(e, "cy", 0)),
    chOff: n ? { x: xa(Z(n, "x", 0)), y: xa(Z(n, "y", 0)) } : { x: 0, y: 0 },
    chExt: s ? { cx: xa(Z(s, "cx", 1)), cy: xa(Z(s, "cy", 1)) } : { cx: 1, cy: 1 },
    rotation: Number(Z(a, "rot", 0)) / 6e4,
    flipH: Aa(Z(a, "flipH")),
    flipV: Aa(Z(a, "flipV"))
  };
}
function yr(a) {
  const t = String(Z(a, "path", "") || "").trim();
  if (!t) return null;
  const e = t.split(/[\s,]+/).filter(Boolean), n = [], s = [];
  let l = 0;
  for (; l < e.length; ) {
    const m = e[l];
    if (/^[MLml]$/.test(m)) {
      s.push(m.toUpperCase()), l += 1;
      continue;
    }
    if (/^[Zz]$/.test(m)) {
      l += 1;
      continue;
    }
    const c = Number(e[l]), i = Number(e[l + 1]);
    if (!n.length && !s.length && s.push("M"), !Number.isFinite(c) || !Number.isFinite(i)) return null;
    n.push({ x: c, y: i }), l += 2;
  }
  return s.find((m) => m !== "M" && m !== "L") || n.length < 2 ? null : n;
}
function hr(a, t = { delay: 0, repeat: 1 }) {
  var v, A;
  const e = ca(a, "spTgt"), n = Z(e, "spid", null);
  if (!n) return null;
  const s = na(e, "txEl"), l = s && na(s, "pRg"), r = s && na(s, "charRg"), m = l || r, c = m ? {
    kind: l ? "paragraph" : "character",
    start: Number(Z(m, "st", 0)),
    end: Number(Z(m, "end", Z(m, "st", 0)))
  } : null, i = c ? `${n}:${c.kind}:${c.start}-${c.end}` : String(n), d = na(a, "iterate"), o = d ? {
    type: Z(d, "type", "lt"),
    // `tmPct` 是十万分比：10000 = 父时长的 10% = 相邻两个单元的起始间隔。
    // 0 视为「不迭代」——没有间隔就没有逐字效果，退化成整块播放。
    intervalRatio: Math.max(0, Number(Z(na(d, "tmPct"), "val", 0)) / 1e5)
  } : null, x = ca(a, "animEffect");
  let f = 1;
  for (const j of va(a, "cTn")) {
    const $ = Number(Z(j, "dur", NaN));
    Number.isFinite($) && (f = Math.max(f, $));
  }
  const y = {
    fromX: 0,
    toX: 0,
    fromY: 0,
    toY: 0,
    unresolved: []
  }, u = [];
  for (const j of va(a, "anim")) {
    const $ = (A = (v = ca(j, "attrName")) == null ? void 0 : v.textContent) == null ? void 0 : A.trim();
    if (!$) continue;
    if ($ === "ppt_x" || $ === "ppt_y") {
      const E = va(j, "strVal").map((_) => Z(_, "val", ""));
      if (!E.length) continue;
      const X = $ === "ppt_x" ? "X" : "Y";
      for (const [_, C] of [E[0], E.at(-1)].entries()) {
        const w = ur(C, y.unresolved);
        y[`${_ === 0 ? "from" : "to"}${X}`] = w === null ? 0 : w;
      }
      continue;
    }
    const k = va(j, "tav").map((E) => ({
      // `tm` 是占该轨道时长的十万分比：tm=50000 → 50%。
      at: Number(Z(E, "tm", 0)) / 1e5,
      value: Z(
        ca(E, "strVal") || ca(E, "boolVal"),
        "val",
        ""
      )
    })).filter((E) => Number.isFinite(E.at) && (E.value === "visible" || E.value === "hidden"));
    if (!k.length) continue;
    const S = va(j, "cTn").map((E) => Number(Z(E, "dur", NaN))).filter((E) => Number.isFinite(E) && E > 0);
    u.push({
      attrName: $,
      duration: S.length ? Math.max(...S) : 1,
      keyframes: k
    });
  }
  const h = ca(a, "animMotion");
  let g = null;
  if (h) {
    const j = yr(h);
    j ? g = {
      // `relative` = 路径点就是**位移量**；`fixed` = 路径点是绝对位置，位移要减起点。
      relative: Z(h, "pathEditMode", "relative") !== "fixed",
      points: j,
      accel: Math.min(1, Math.max(0, Number(Z(a, "accel", 0)) || 0) / 1e5),
      decel: Math.min(1, Math.max(0, Number(Z(a, "decel", 0)) || 0) / 1e5)
    } : y.unresolved.push(`animMotion path: ${Z(h, "path", "")}`);
  }
  return {
    spid: n,
    targetId: i,
    textRange: c,
    trigger: Z(a, "nodeType", "clickEffect"),
    presetClass: Z(a, "presetClass", "entr"),
    presetId: Z(a, "presetID", "0"),
    presetSubtype: Z(a, "presetSubtype", "0"),
    filter: Z(x, "filter", ""),
    transition: Z(x, "transition", ""),
    duration: f,
    iterate: o,
    delay: Math.max(0, Number(t.delay) || 0),
    repeat: Number.isFinite(t.repeat) ? t.repeat : 1,
    repeatIndefinite: t.repeat === Number.POSITIVE_INFINITY,
    motion: y,
    path: g,
    tracks: u
  };
}
const pr = { ppt_x: 0, ppt_y: 0, ppt_w: 1, ppt_h: 1 };
function ur(a, t) {
  const e = String(a ?? "").trim();
  if (!e) return 0;
  let n = 0, s = 1, l = 0, r = !1;
  for (; l < e.length; ) {
    const m = e[l];
    if (m === "+") {
      s = 1, l += 1;
      continue;
    }
    if (m === "-") {
      s = -1, l += 1;
      continue;
    }
    const c = e.slice(l), i = c.match(/^#ppt_[xywh]/i);
    if (i) {
      let o = pr[i[0].slice(1).toLowerCase()];
      l += i[0].length;
      const x = e.slice(l).match(/^\s*\/\s*(\d*\.?\d+)/);
      if (x) {
        const f = Number(x[1]);
        if (!f) return null;
        o /= f, l += x[0].length;
      }
      n += s * o, s = 1, r = !0;
      continue;
    }
    const d = c.match(/^\d*\.?\d+/);
    if (d) {
      n += s * Number(d[0]), l += d[0].length, s = 1, r = !0;
      continue;
    }
    return Array.isArray(t) && t.push(e), null;
  }
  return r ? n : null;
}
const gr = /* @__PURE__ */ new Set(["clickEffect", "withEffect", "afterEffect", "clickPar"]);
function wr(a) {
  const t = na(a, "stCondLst");
  if (!t) return null;
  let e = null;
  for (const n of wa(t)) {
    const s = Z(n, "delay");
    if (s == null || s === "" || s === "indefinite") continue;
    const l = Number(s);
    Number.isFinite(l) && (e = (e || 0) + l);
  }
  return e;
}
function Ar(a) {
  const t = Z(a, "repeatCount");
  if (t == null || t === "") return null;
  if (t === "indefinite") return Number.POSITIVE_INFINITY;
  const e = Math.round(Number(t) / 1e3);
  return !Number.isFinite(e) || e < 1 ? null : Math.min(e, 10);
}
function br(a, t) {
  let e = !1, n = 0, s = !1;
  const l = (m) => {
    if (m.localName === "cTn") {
      const c = na(m, "stCondLst");
      if (c) {
        s = !0;
        for (const i of wa(c)) {
          const d = Z(i, "delay");
          if (d == null || d === "") continue;
          if (d === "indefinite") {
            e = !0;
            continue;
          }
          const o = Number(d);
          Number.isFinite(o) && (n += o);
        }
      }
      return;
    }
    for (const c of wa(m)) l(c);
  };
  if (l(a), e || !s) return { trigger: "click", delay: 0 };
  const r = new Set((t || []).map((m) => m.trigger));
  return r.has("withEffect") ? { trigger: "with", delay: n } : r.has("afterEffect") ? { trigger: "after", delay: n } : { trigger: "auto", delay: n };
}
function un(a, t, e, n = !1) {
  if (a.localName === "cTn") {
    const s = { ...t }, l = wr(a);
    l !== null && !n && (s.delay = (t.delay || 0) + l);
    const r = Ar(a);
    if (r !== null && (s.repeat = r), gr.has(Z(a, "nodeType", ""))) {
      const m = hr(a, s);
      m && e.push(m);
      return;
    }
    for (const m of wa(a)) un(m, s, e);
    return;
  }
  for (const s of wa(a)) un(s, t, e, n);
}
function vr(a) {
  const t = ca(a, "timing");
  if (!t) return { steps: [], stepMeta: [], initialHidden: [], targets: [] };
  const e = va(t, "cTn").find(
    (c) => Z(c, "nodeType") === "mainSeq"
  );
  if (!e) return { steps: [], stepMeta: [], initialHidden: [], targets: [] };
  const n = na(e, "childTnLst"), s = [], l = [];
  for (const c of wa(n)) {
    const i = [];
    un(c, { delay: 0, repeat: 1 }, i, !0), i.length && (s.push(i), l.push(br(c, i)));
  }
  const r = Array.from(new Set(
    s.flat().filter((c) => c.presetClass === "entr").map((c) => c.targetId)
  )), m = Array.from(
    new Map(
      s.flat().map((c) => [
        c.targetId,
        { targetId: c.targetId, spid: c.spid, textRange: c.textRange }
      ])
    ).values()
  );
  return { steps: s, stepMeta: l, initialHidden: r, targets: m };
}
function Lr(a) {
  const t = (i) => {
    var d, o;
    return ((o = (d = i.text) == null ? void 0 : d.paragraphs) == null ? void 0 : o.flatMap((x) => x.runs || []).map((x) => x.text).join("").trim()) || "";
  }, e = a.find((i) => i.type === "shape" && i.preset === "roundRect" && i.x < 80 && i.y < 80 && /#de0000|#ff0000/i.test(i.fill || "") && !t(i));
  if (!e || a.flatMap((i) => i.type === "group" ? [i, ...i.elements || []] : [i]).some((i) => t(i) && i.x < 300 && i.y < 100)) return null;
  const s = ["课前复习", "课中探究", "课堂拓展", "知识闯关", "课堂小结", "总结提升", "课文初读", "课文赏析"], r = a.flatMap((i) => i.type === "group" ? [i, ...i.elements || []] : [i]).find((i) => {
    const d = t(i);
    return d && d.length <= 12 && s.some((o) => d.includes(o));
  });
  if (!(r != null && r.text)) return null;
  const m = t(r), c = s.find((i) => m.includes(i)) || m;
  return c ? { header: e, source: r, label: c, sourceText: m } : null;
}
function Rr(a, t) {
  const { header: e, source: n, label: s, sourceText: l } = t, r = {
    ...n.text,
    paragraphs: n.text.paragraphs.map((m) => ({
      ...m,
      runs: m.runs.map((c) => ({
        ...c,
        text: c.text.replace(l, s),
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
    spid: `${e.spid || "header"}-text`,
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height,
    text: r,
    fill: "none",
    line: { color: "none", width: 0, dash: null, headEnd: null, tailEnd: null },
    sourceLevel: "slide",
    fallback: !1
  });
}
async function re(a, t, e, n, s, l) {
  var $;
  if (!l || !l.diagnostics || !l.compat || !l.mediaBudget)
    throw new Error("parseSlide(...): env 必须包含 { diagnostics, compat, mediaBudget }");
  const r = await a.readXmlPart(t, !0, { transient: !0 }), m = await a.readXmlPart(It(t), !1, { transient: !0 }), c = m ? Dt(m, t, l) : /* @__PURE__ */ new Map(), i = await cr(a, c, l), d = await Oe(a, i.themePath), o = await Jl(a, d), x = [], f = r.documentElement, y = Z(f, "showMasterSp", "1") !== "0", u = ($ = i.layoutDocument) == null ? void 0 : $.documentElement, h = Z(u, "showMasterSp", "1") !== "0";
  y && h && i.masterDocument && x.push(
    ...await St(
      i.masterDocument,
      i.masterRelationships,
      a.zip,
      d,
      o,
      s,
      { skipPlaceholders: !0, sourceLevel: "master" },
      l
    )
  ), i.layoutDocument && x.push(
    ...await St(
      i.layoutDocument,
      i.layoutRelationships,
      a.zip,
      d,
      o,
      s,
      { skipPlaceholders: !0, sourceLevel: "layout" },
      l
    )
  ), x.push(
    ...await St(r, c, a.zip, d, o, s, {
      sourceLevel: "slide",
      placeholderLayoutDocument: i.layoutDocument,
      placeholderMasterDocument: i.masterDocument,
      slideSize: e
    }, l)
  );
  const g = Lr(x);
  if (g) {
    const k = l.compat.synthesizeSectionHeader === !0;
    l.diagnostics.add({
      code: "legacy.section-header-synthesis",
      severity: "info",
      scope: { slide: n, spid: g.header.spid ?? null, part: t },
      message: `红色头部（${g.header.x},${g.header.y} ${g.header.width}×${g.header.height}）无文字，页内出现章节词「${g.label}」`,
      strategy: k ? "synthesized" : "skipped"
    }), k && Rr(x, g);
  }
  const v = vr(r), A = lr(x), j = rr(r, c);
  return {
    index: n,
    path: t,
    width: e.width,
    height: e.height,
    background: await ir(
      a.zip,
      r,
      d,
      c,
      i,
      { w: e.width, h: e.height },
      s
    ),
    elements: x,
    animation: v,
    media: A,
    animationAudio: j,
    fallbackCount: x.filter((k) => k.fallback).length
  };
}
function Mr(a) {
  let t = 0;
  const e = /* @__PURE__ */ new Set(), n = (s, l) => {
    if (!(l > 12 || s == null)) {
      if (typeof s == "string") {
        s.length > 64 && s.startsWith("data:") && (t += s.length);
        return;
      }
      if (typeof s == "object" && !e.has(s)) {
        if (e.add(s), Array.isArray(s)) {
          for (const r of s) n(r, l + 1);
          return;
        }
        for (const r of Object.keys(s)) n(s[r], l + 1);
      }
    }
  };
  return n(a, 0), t;
}
const en = {
  synthesizeSectionHeader: !1
}, me = 8 * 1024 * 1024, ce = 64 * 1024 * 1024, $r = 64 * 1024 * 1024;
function jr(a) {
  const t = { ...en };
  if (a == null) return t;
  if (typeof a != "object")
    throw new Error("parsePptx(file, { compat }): compat 必须是对象");
  for (const [e, n] of Object.entries(a)) {
    if (!(e in en))
      throw new Error(`未知兼容策略开关 compat.${e}（可用：${Object.keys(en).join(" / ")}）`);
    if (typeof n != "boolean")
      throw new Error(`compat.${e} 必须是布尔值，收到 ${JSON.stringify(n)}`);
    t[e] = n;
  }
  return t;
}
const _r = "\0\0", Cr = (() => {
  const a = new Uint32Array(256);
  for (let t = 0; t < 256; t += 1) {
    let e = t;
    for (let n = 0; n < 8; n += 1)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    a[t] = e >>> 0;
  }
  return a;
})();
function es(a) {
  let t = 4294967295;
  for (let e = 0; e < a.length; e += 1)
    t = Cr[(t ^ a[e]) & 255] ^ t >>> 8;
  return (t ^ 4294967295) >>> 0;
}
const kr = /(\.xml|\.rels)$/;
async function Sr(a) {
  const t = [];
  for (const e of Object.keys(a.files)) {
    const n = a.files[e];
    if (!n || n.dir || e == null) continue;
    const s = n._data, l = s && s.compression && typeof s.compression.magic == "string" ? s.compression.magic : null;
    if (!(!(l === _r) && !kr.test(e))) {
      if (l === null) {
        const m = await a.file(e).async("uint8array");
        if (m.length > 0)
          throw new Error(
            `无法判定 ZIP 条目「${e}」的压缩方式，且它非空（${m.length} 字节）：无法确认该用哪种校验，继续解析可能读到坏数据。校验依赖 ZipObject._data.compression.magic，请确认 JSZip 版本为 3.x（本仓库 public/vendor/jszip.min.js 为 3.10.1）。`
          );
        continue;
      }
      if (typeof s.crc32 != "number")
        throw new Error(
          `无法读取 ZIP 条目「${e}」的 CRC32：JSZip 内部结构不符合预期。请确认 JSZip 版本为 3.x（本仓库 public/vendor/jszip.min.js 为 3.10.1）。`
        );
      t.push({ name: e, crc32: s.crc32 >>> 0 });
    }
  }
  for (const e of t) {
    const n = await a.file(e.name).async("uint8array");
    if (es(n) >>> 0 !== e.crc32)
      throw new Error(`Corrupted zip : CRC32 mismatch (${e.name})`);
  }
  return t.length;
}
function ss(a, t, e) {
  const n = a.file(t), s = n && n._data;
  if (!s || typeof s.crc32 != "number")
    throw new Error(
      `无法读取 ZIP 条目「${t}」的 CRC32，无法确认读到的数据是否完好：请确认 JSZip 版本为 3.x（本仓库 public/vendor/jszip.min.js 为 3.10.1）。`
    );
  if (es(e) >>> 0 !== s.crc32 >>> 0)
    throw new Error(`Corrupted zip : CRC32 mismatch (${t})`);
}
async function ls(a, t = {}) {
  const e = V0(), n = fl(), s = jr(t.compat), r = { diagnostics: n, compat: s, mediaBudget: { totalBytes: 0 } }, m = await JSZip.loadAsync(await a.arrayBuffer(), {
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
  await Sr(m);
  const c = xl(m, Al, { maxBytes: t.partCacheMaxBytes }), i = "ppt/presentation.xml", d = await c.readXmlPart(i), o = await c.readXmlPart(It(i)), x = Dt(o, i, r), f = await Oe(c), y = Ll(d), h = va(d, "sldId").map(($) => x.get(Ia($, "id"))).filter(Boolean).map(($) => $.path);
  if (!h.length)
    throw new Error("没有在 PPTX 中找到幻灯片");
  const g = async ($) => {
    const k = m.file($);
    return k ? k.async("uint8array") : null;
  };
  if (t.lazy) {
    const $ = /* @__PURE__ */ new Map();
    let k = 0, S = 0;
    const E = Number.isFinite(t.slideCacheMaxBytes) ? Math.max(0, t.slideCacheMaxBytes) : $r, X = () => {
      for (; k > E && $.size > 1; ) {
        const T = $.keys().next().value, I = $.get(T);
        $.delete(T), k -= I.bytes, S += 1;
      }
    }, _ = h.map((T, I) => ({
      index: I,
      path: T,
      width: y.width,
      height: y.height
    })), C = (T) => {
      if (T < 0 || T >= h.length)
        return Promise.reject(new Error(`getSlide(${T}) 越界：共 ${h.length} 页`));
      const I = $.get(T);
      if (I)
        return $.delete(T), $.set(T, I), I.promise;
      const U = { promise: null, bytes: 0 };
      return U.promise = re(c, h[T], y, T, e, r).then((N) => (U.bytes = Mr(N), k += U.bytes, $.delete(T), $.set(T, U), X(), N)), $.set(T, U), U.promise;
    }, w = () => {
      $.clear(), k = 0, c.dispose();
    }, q = () => ({
      partCache: c.stats(),
      slides: $.size,
      slideBytes: k,
      slideEvictions: S,
      slideCacheMaxBytes: E
    });
    return {
      size: y,
      theme: f,
      slides: _,
      slideCount: h.length,
      getSlide: C,
      readPart: g,
      defs: e,
      diagnostics: n,
      compat: s,
      dispose: w,
      resourceStats: q
    };
  }
  const v = [];
  for (let $ = 0; $ < h.length; $ += 1)
    sm("busy", `正在解析第 ${$ + 1}/${h.length} 页`), v.push(await re(c, h[$], y, $, e, r)), await Er();
  return { size: y, theme: f, slides: v, readPart: g, defs: e, diagnostics: n, compat: s, dispose: () => c.dispose(), resourceStats: () => ({ partCache: c.stats() }) };
}
let Ot = null;
function Fr(a) {
  if (typeof a != "function")
    throw new Error("configureYield(fn): fn 必须是 () => Promise");
  Ot = a;
}
function Wm() {
  Ot = null;
}
function Er() {
  return Ot ? Ot() : typeof requestAnimationFrame == "function" ? new Promise((a) => requestAnimationFrame(a)) : Promise.resolve();
}
let Ba = null, Nt = null;
function Ir(a) {
  if (typeof a != "function")
    throw new Error("configureMeasureContext(factory): factory 必须是 () => CanvasRenderingContext2D");
  Nt = a, Ba = null;
}
function Gm() {
  Nt = null, Ba = null;
}
function rs() {
  if (!Ba) {
    if (Nt) {
      if (Ba = Nt(), !Ba || typeof Ba.measureText != "function")
        throw new Error("configureMeasureContext(factory): factory 必须返回带 measureText 的 2d context");
      return Ba;
    }
    if (typeof document > "u")
      throw new Error(
        "ppt-sdk：当前环境没有 document 且未 configureMeasureContext() —— 文本度量无从进行，请注入度量端口（Worker 可用 OffscreenCanvas）"
      );
    He(), Ba = document.createElement("canvas").getContext("2d");
  }
  return Ba;
}
function ga(a) {
  return String(a).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}
function Dr(a) {
  rs().font = `${a.italic ? "italic " : ""}${a.bold ? "700 " : "400 "}${a.fontSize}px ${a.fontFamily}`;
}
function ms(a, t) {
  Dr(t);
  const e = Array.from(a);
  return rs().measureText(a).width + Math.max(0, e.length - 1) * (t.letterSpacing || 0);
}
const ie = 0.125 / 0.75;
function La(a, t) {
  const e = ms(a, t);
  return Math.round(e / ie) * ie;
}
function oe(a, t) {
  const e = Array.from(a);
  let n = 0;
  for (let s = 0; s < e.length; s += 1)
    n += La(e[s], t) + (t.letterSpacing || 0);
  return n;
}
const Tr = xa(Ie);
function fe(a, t, e = Tr) {
  for (const n of a || [])
    if (n.pos > t) return n.pos;
  return (Math.floor(t / e) + 1) * e;
}
const Br = /[，。、．：；？！）］｝〉》」』】”’…～·%℃,.\uFF0E\uFF5E\)\]}]/, Pr = /[（［｛〈《「『【“‘(\[]/, Or = 0.75, Nr = /[\u201C\u2018]/, qr = /\u2026/u;
function cs(a, t, e = {}) {
  const n = (_ = o.length === 0) => {
    const C = _ && Number.isFinite(e.firstLineMaxWidth) ? e.firstLineMaxWidth : t;
    return Math.max(1, C);
  }, s = e.wrap !== !1, l = e.latinLineBreak === !0, r = e.hangingPunct !== !1, m = Br, c = Pr, i = /[\x21-\x7E]/;
  let d = !0;
  const o = [];
  let x = [], f = 0, y = 0;
  const u = e.leadSpacesFolded !== !1;
  let h = [], g = 0, v = null;
  const A = () => {
    f = x.reduce((_, C) => _ + C.width, 0);
  }, j = (_, C, w = {}) => {
    const q = La(_, C), T = x[x.length - 1];
    if (!w.forceNew && T && T.style === C)
      T.text += _, T.width += q + (C.letterSpacing || 0);
    else {
      const I = { text: _, style: C, width: q + (C.letterSpacing || 0) };
      w.startX != null && (I.x = w.startX), x.push(I);
    }
    A();
  }, $ = () => {
    const _ = x[x.length - 1];
    if (!_) return null;
    const C = Array.from(_.text);
    if (!C.length) return null;
    const w = C.pop(), q = La(w, _.style), T = C.length === 0;
    return _.width -= q + (_.style.letterSpacing || 0), _.text = C.join(""), T && x.pop(), A(), { character: w, style: _.style };
  }, k = () => x.reduce(
    (_, C) => _ + Array.from(C.text).length,
    0
  ), S = () => {
    var C, w;
    const _ = [];
    for (; x.length; ) {
      const q = x[x.length - 1], T = q.text.replace(/\s+$/u, "");
      if (T === q.text) break;
      const I = q.text.slice(T.length), U = q.width - oe(T, q.style);
      _.unshift({
        text: I,
        style: q.style,
        width: U,
        decorated: !!((C = q.style) != null && C.underline || (w = q.style) != null && w.strikeout),
        // 制表符段落：整段都是空白（`\t` 后跟带下划线的空格）时，`last.x` 是 tab 落点
        // 相对 textX 的偏移。留档时必须带上，否则下划线会从「可见文本右端」画起、
        // 丢掉 tab 跳过的距离（real-5 s6 段#1 就是它：本应 +480，实际丢成 0）。
        // 只整段空白时带：部分裁剪（trimmed 非空）时 .x 属于留在 segments 里的可见前缀。
        x: T ? void 0 : q.x
      }), q.width = oe(T, q.style), q.text = T, q.text || x.pop();
    }
    return A(), _;
  }, E = () => {
    const _ = S();
    o.push({
      segments: x,
      width: f + y,
      leadingWidth: y,
      // ⭐ R47：绝大多数行为 null，别给每个段落挂一个空数组。
      leadingSpaces: h.length ? h : null,
      // 整行都没装饰就把留档丢掉，别给绝大多数段落挂一个空数组。
      trailingSpaces: _.some((C) => C.decorated) ? _ : null,
      hungPunctAdvance: g
    }), g = 0, x = [], f = 0, y = 0, h = [], v = null;
  }, X = [];
  for (const _ of a) {
    const C = _.style, w = C != null && C.quoteFontFamily ? { ...C, fontFamily: C.quoteFontFamily } : null, q = C != null && C.enclosedFontFamily ? { ...C, fontFamily: C.enclosedFontFamily } : null, T = C && ee.test(_.text) && ze.test(C.fontFamily || "") ? { ...C, fontFamily: Tl(C.fontFamily) } : null;
    for (const I of Array.from(_.text))
      X.push({
        character: I,
        style: w && Il.test(I) ? w : q && Dl.test(I) ? q : T && ee.test(I) ? T : C
      });
  }
  for (let _ = 0; _ < X.length; _ += 1) {
    const { character: C, style: w } = X[_];
    if (C === `
`) {
      E();
      continue;
    }
    if (C === "	" && e.tabs) {
      const ia = o.length === 0 && e.firstLineIndent || 0, p = ia + y + (v ?? f);
      let G = 0;
      for (let L = _ + 1; L < X.length; L += 1) {
        const M = X[L];
        if (M.character === "	" || M.character === `
`) break;
        G += La(M.character, M.style) + (M.style.letterSpacing || 0);
      }
      let R = fe(e.tabs, p), b = R - ia;
      b + G > n() && x.length && (E(), o[o.length - 1].tabEnded = !0, R = fe(e.tabs, 0), b = R), v = b - y;
      continue;
    }
    if (!x.length && /\s/u.test(C)) {
      const ia = La(C, w) + (w.letterSpacing || 0);
      y += ia, !u && C === " " && h.push({ advance: ia, fontSize: w.fontSize || 0 });
      continue;
    }
    const T = La(C, w) + (w.letterSpacing || 0), I = x.length ? x[x.length - 1].text.slice(-1) : "", U = i.test(C), N = i.test(I), z = _ + 1 < X.length && i.test(X[_ + 1].character), P = Nr.test(I) && U && !N;
    if (s && x.length && U && !N && z) {
      let ia = 0;
      for (let G = _; G < X.length; G += 1) {
        const R = X[G];
        if (!i.test(R.character)) break;
        ia += La(R.character, R.style) + (R.style.letterSpacing || 0);
      }
      const p = n();
      if (d = ia <= p, y + f + ia > p) {
        let G = !1;
        if (P && k() > 1) {
          const R = x[x.length - 1].style, b = La(I, R) + (R.letterSpacing || 0);
          if (ia + b <= p) {
            const L = $();
            L && (E(), j(L.character, L.style), G = !0);
          }
        }
        G || E();
      }
    }
    let F = T;
    if (s && x.length && /\s/u.test(C) && (w.underline || w.strikeout)) {
      let ia = 0;
      for (let p = _; p < X.length && /\s/u.test(X[p].character); p += 1)
        ia += La(X[p].character, X[p].style);
      ia > 0 && (F = ia);
    }
    const J = x.length && y + f + F > n(), Y = d && !(J && d), fa = U && N && !l && Y, da = m.test(C) && !qr.test(C), W = c.test(I), ta = x.length ? x[x.length - 1] : null, ma = W && ta ? La(I, ta.style) + (ta.style.letterSpacing || 0) >= Or * (ta.style.fontSize || w.fontSize || 0) : !1, Q = U && N && !Y, oa = (da || W) && !Q;
    if (s && J && !fa)
      if (r) {
        if (W && !Q && ma) {
          if (k() > 1) {
            const ia = $();
            if (ia) {
              E(), j(ia.character, ia.style), j(C, w);
              continue;
            }
          }
        } else if ((!oa || W && !ma) && (E(), /\s/u.test(C)))
          continue;
      } else {
        if (oa && k() > 1) {
          const ia = $();
          if (ia) {
            E(), j(ia.character, ia.style), j(C, w);
            continue;
          }
        }
        if (!oa && (E(), /\s/u.test(C)))
          continue;
      }
    v != null ? (g = 0, j(C, w, { forceNew: !0, startX: v }), v = null) : (g = J && r && da && !Q ? T : 0, j(C, w));
  }
  return (x.length || !o.length) && E(), o;
}
const Zr = new Map(Object.entries({
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
function de(a) {
  return String(a || "").split(",").map((t) => t.trim().replace(/^["']|["']$/g, "").toLowerCase()).filter(Boolean);
}
function zr(a) {
  const t = [
    ...de(a == null ? void 0 : a.underlineFamily),
    ...de(a == null ? void 0 : a.fontFamily)
  ];
  for (const e of t)
    for (const n of [`${e}|${a != null && a.bold ? "b" : "r"}`, `${e}|r`]) {
      const s = Zr.get(n);
      if (s) return s;
    }
  return null;
}
const jt = (a) => Number(Number(a).toFixed(3)), gn = 0.75, xe = 1 / gn;
function is(a, t, e, n, s, l, r, m) {
  var x, f;
  const c = [];
  let i = e;
  for (let y = 0; y < a.segments.length; y += 1) {
    const u = a.segments[y], h = t[y], g = Array.from(u.text), v = l && l[y], A = v && v.length ? v[0] : i;
    let j;
    if (v && v.length) {
      const $ = l[y + 1];
      j = $ && $.length ? $[0] : v[v.length - 1] + La(g[g.length - 1] || " ", h) + (h.letterSpacing || 0);
    } else {
      const $ = ((x = u.text.match(/\s/gu)) == null ? void 0 : x.length) || 0;
      j = A + u.width + r * $;
    }
    i = j, c.push({ x0: A, x1: j, style: h });
  }
  for (const y of a.trailingSpaces || []) {
    const u = y.x != null ? e + y.x : i, h = ((f = y.text.match(/\s/gu)) == null ? void 0 : f.length) || 0, g = u + y.width + r * h;
    i = g, y.decorated && c.push({ x0: u, x1: g, style: y.style });
  }
  const d = c.filter((y) => {
    var u;
    return (u = y.style) == null ? void 0 : u.underline;
  });
  if (!d.length) return { handled: !0, rects: "" };
  if (m) return { handled: !1, rects: "" };
  const o = [];
  for (const y of d) {
    const u = zr(y.style);
    if (!u) return { handled: !1, rects: "" };
    const h = y.style.fontSize * gn, g = Math.max(1, Math.round(u[0] * h)) * xe, v = Math.round(u[1] * h), A = Math.round((n - s) * gn + v), j = s + A * xe;
    o.push(
      `<rect x="${jt(y.x0)}" y="${jt(j)}" width="${jt(Math.max(0, y.x1 - y.x0))}" height="${jt(g)}" fill="${ga(y.style.color)}"/>`
    );
  }
  return { handled: !0, rects: o.join("") };
}
function Rn(a, t = !1) {
  const e = [
    a.underline && !t ? "underline" : "",
    a.strikeout ? "line-through" : ""
  ].filter(Boolean).join(" "), n = a.outline ? ` stroke="${ga(a.outline.color)}" stroke-width="${a.outline.width}" stroke-linejoin="round"` : "", s = a.kerningDisabled ? ' style="font-kerning:none"' : "";
  return `font-family="${ga(a.fontFamily)}" font-size="${a.fontSize}" font-weight="${a.bold ? 700 : 400}" font-style="${a.italic ? "italic" : "normal"}" text-decoration="${e || "none"}" letter-spacing="${a.letterSpacing || 0}" fill="${ga(a.color)}"${n}${s}`;
}
let Ft = !0;
const Hr = /* @__PURE__ */ new Set(["http:", "https:", "mailto:", "tel:"]);
function Ur(a) {
  if (!a) return !1;
  const t = a.trim();
  if (!t) return !1;
  if (t.startsWith("#") || t.startsWith("/") || t.startsWith("./") || t.startsWith("../"))
    return !0;
  const e = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return e ? Hr.has(e[1].toLowerCase() + ":") : !0;
}
function os(a, t = a.style, e = null, n = !1, s = null) {
  let l = "";
  e && Array.from(a.text).length === e.length && (l = ` x="${e.map((i) => Number(i.toFixed(3))).join(" ")}"`);
  const r = s == null ? "" : ` y="${Number(s.toFixed(3))}"`, m = `<tspan${l}${r} ${Rn(t, n)}>${ga(a.text)}</tspan>`;
  if (!t.hyperlink || !Ft) return m;
  const c = ga(t.hyperlink);
  return Ur(t.hyperlink) ? `<a href="${c}" xlink:href="${c}" target="_blank" rel="noopener noreferrer" style="cursor:pointer">${m}</a>` : m;
}
const Wr = /[\u1100-\u11ff\u2e80-\u303f\u3040-\u30ff\u3100-\u312f\u3130-\u318f\u31c0-\u31ef\u3400-\u4dbf\u4e00-\u9fff\ua960-\ua97f\uac00-\ud7af\uf900-\ufaff\ufe10-\ufe19\ufe30-\ufe4f\uff00-\uff60\uffe0-\uffe6]/u;
function Gr(a, t, e, n = 0) {
  const s = [];
  for (const g of a.segments) {
    const v = g.style, A = v.letterSpacing || 0;
    for (const j of Array.from(g.text))
      s.push({
        ch: j,
        // 用 Office 量化后的 advance：两端对齐要分摊的是
        // 「可用宽 − Office 眼里的自然宽」，Office 的自然宽就是量化后的字形宽
        // （见 measureOfficeGlyph 的说明与全量校验脚本）。用未量化的自然宽
        // 会让 δ 与 Office 有偏差，行内每个字的位置都会跟着飘。
        advance: La(j, v) + A,
        fontSize: v.fontSize || 0,
        wide: Wr.test(j)
      });
  }
  if (s.length < 2) return null;
  const l = (a.leadingSpaces || []).map((g) => ({
    ch: " ",
    advance: g.advance,
    fontSize: g.fontSize,
    wide: !1
  })), r = l.length, m = l.reduce((g, v) => g + v.advance, 0);
  r && s.unshift(...l);
  const c = [];
  for (let g = 0; g < s.length - 1; g++)
    (s[g].wide || s[g + 1].wide) && c.push(g);
  if (!c.length) return null;
  const i = s.reduce((g, v) => g + v.advance, 0);
  let d = e + m - i + n;
  if (!(d > 0)) return null;
  const o = [];
  for (let g = 0; g < s.length - 1; g++)
    s[g].ch === " " && o.push(g);
  const x = new Array(s.length).fill(0);
  if (o.length) {
    const g = (A) => Math.max(0, 0.5 * s[A].fontSize - s[A].advance), v = o.slice().sort((A, j) => g(A) - g(j));
    for (let A = 0; A < v.length; A += 1) {
      const j = v[A], $ = g(j), k = d / (v.length - A);
      if (k <= $) {
        for (let S = A; S < v.length; S += 1) x[v[S]] += k;
        d = 0;
        break;
      }
      x[j] += $, d -= $;
    }
  }
  if (d > 0) {
    const g = new Set(c);
    for (const A of o) g.add(A);
    const v = d / g.size;
    for (const A of g) x[A] += v;
  }
  const f = new Array(s.length).fill(0);
  f[0] = t - m;
  let y = f[0];
  for (let g = 0; g < s.length - 1; g++)
    y += s[g].advance + x[g], f[g + 1] = y;
  const u = [];
  let h = r;
  for (const g of a.segments) {
    const v = Array.from(g.text).length;
    u.push(f.slice(h, h + v)), h += v;
  }
  return u;
}
function fs(a, t, e, n) {
  if (!((t.align === "dist" || t.align === "thaiDist" || t.align === "just") && !a.lastLine && !a.tabEnded)) return { attrs: "", perSegmentX: null, wordSpacing: 0 };
  let l = 0;
  t.hangingPunct !== !1 && a.hungPunctAdvance > 0 && a.width > n - e && (l = a.hungPunctAdvance);
  const r = Math.max(1, n - e);
  if (t.align === "just") {
    const m = Gr(a, e, r, l);
    if (m) return { attrs: "", perSegmentX: m, wordSpacing: 0 };
    const c = a.segments.reduce(
      (i, d) => {
        var o;
        return i + (((o = d.text.match(/\s/gu)) == null ? void 0 : o.length) || 0);
      },
      0
    );
    if (c > 0) {
      const i = Math.max(0, r + l - a.width) / c;
      return { attrs: ` word-spacing="${i}"`, perSegmentX: null, wordSpacing: i };
    }
  }
  return { attrs: ` textLength="${r + l}" lengthAdjust="spacing"`, perSegmentX: null, wordSpacing: 0 };
}
function ds(a, t, e) {
  let n = e;
  return a.segments.forEach((s, l) => {
    if (s.x == null) return;
    n || (n = new Array(a.segments.length).fill(null));
    const r = [];
    let m = t + s.x;
    for (const c of Array.from(s.text))
      r.push(m), m += La(c, s.style) + (s.style.letterSpacing || 0);
    n[l] = r;
  }), n;
}
function xs(a, t) {
  const e = a.segments.length ? a.segments.map((n) => n.style) : t.runs.map((n) => n.style);
  return Math.max(1, ...e.map((n) => (n == null ? void 0 : n.fontSize) || 1));
}
const Xr = new Map(Object.entries({
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
function Vr(a) {
  for (const t of String((a == null ? void 0 : a.fontFamily) || "").split(",")) {
    const e = t.trim().replace(/^["']|["']$/g, "").toLowerCase(), n = Xr.get(e);
    if (n) return n;
  }
  return 1;
}
const Yr = [
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
function Qr(a) {
  const t = a.codePointAt(0);
  return Yr.some(([e, n]) => t >= e && t <= n);
}
function Kr(a, t) {
  const e = ((t == null ? void 0 : t.fontSize) || 0) * Vr(t);
  return Qr(a) ? e : Math.min(e, La(a, t));
}
function Jr(a) {
  const t = a.text, e = a.x + t.insetLeft, n = a.x + a.width - t.insetRight, s = a.y + t.insetTop, l = a.y + a.height - t.insetBottom, r = Math.max(1, l - s), m = t.paragraphs.flatMap((f) => {
    const y = [];
    f.bullet && y.push({ character: f.bullet, style: f.runs[0].style });
    for (const A of f.runs)
      for (const j of Array.from(A.text))
        y.push({ character: j, style: A.style, lineBreak: j === `
` });
    const u = [];
    let h = [], g = 0;
    const v = () => {
      h.length && (u.push({
        paragraph: f,
        units: h,
        width: Math.max(1, ...h.map((A) => A.style.fontSize)),
        extent: g
      }), h = [], g = 0);
    };
    for (const A of y) {
      if (A.lineBreak) {
        v();
        continue;
      }
      const j = Kr(A.character, A.style), $ = h.length && h.at(-1).style.letterSpacing || 0;
      h.length && g + $ + j / 2 > r && v(), g += (h.length && h.at(-1).style.letterSpacing || 0) + j, h.push({ ...A, advance: j });
    }
    return v(), u.forEach((A, j) => {
      A.lastColumn = j === u.length - 1, A.pitch = Ln(A.width, f.lineSpacing);
    }), u;
  }), c = m.reduce((f, y, u) => f + (u < m.length - 1 ? y.pitch : y.width), 0);
  let i = n;
  t.anchor === "ctr" && (i = e + (Math.max(1, n - e) + c) / 2), t.anchor === "b" && (i = e + c);
  const d = t.vertical === "vert270", o = d ? [...m].reverse() : m, x = [];
  for (const f of o) {
    const y = i - f.width / 2;
    let u = s + f.paragraph.spaceBefore;
    const h = Math.max(0, r - f.extent - f.paragraph.spaceBefore - f.paragraph.spaceAfter);
    f.paragraph.align === "ctr" && (u += h / 2), f.paragraph.align === "r" && (u += h);
    for (const g of f.units) {
      const v = u + g.style.fontSize / 2;
      x.push(
        `<text xml:space="preserve" x="${y}" y="${v}" text-anchor="middle" dominant-baseline="central" ${Rn(g.style)}>${ga(g.character)}</text>`
      ), u += g.advance + (g.style.letterSpacing || 0);
    }
    i += (d ? 1 : -1) * f.pitch;
  }
  return x.join("");
}
function am(a, t) {
  const e = a.segments.length ? a.segments.map((s) => s.style) : t.runs.map((s) => s.style);
  let n = 0;
  for (const s of e) {
    const l = (s == null ? void 0 : s.fontSize) || a.maxFontSize;
    n = Math.max(n, l * hn(s == null ? void 0 : s.fontFamily)[1]);
  }
  return n || a.maxFontSize * hn(null)[1];
}
function tm(a, t) {
  if (!a.text) return "";
  const e = a.text;
  if (e.vertical && e.vertical !== "horz") return Jr(a);
  const n = Math.max(1, a.height - e.insetTop - e.insetBottom), s = [];
  let l = 0;
  e.paragraphs.forEach((f, y) => {
    const u = a.x + e.insetLeft + f.marginLeft, h = a.x + a.width - e.insetRight, g = Math.max(1, h - u), v = u + (f.bullet ? 0 : f.indent);
    typeof window < "u" && window.__pptSdkTraceWidth && (window.__pptSdkTraceWidthLog || (window.__pptSdkTraceWidthLog = [])).push({
      elemX: a.x,
      elemW: a.width,
      insetLeft: e.insetLeft,
      insetRight: e.insetRight,
      marginLeft: f.marginLeft,
      indent: f.indent,
      startX: u,
      rightX: h,
      maxWidth: g,
      firstLineMaxWidth: Math.max(1, h - v),
      text: f.runs.map((E) => E.text).join("").slice(0, 28)
    });
    const A = f.runs.map((E) => E.text).join(""), j = a.width > 400 && A.length <= 30 && /[：:]/u.test(A) && (A.match(/[\\u3400-\\u9fff]/gu) || []).length <= 10, $ = cs(f.runs, g, {
      wrap: j ? !1 : e.wrap,
      latinLineBreak: f.latinLineBreak,
      eastAsianLineBreak: f.eastAsianLineBreak,
      hangingPunct: f.hangingPunct,
      firstLineMaxWidth: Math.max(1, h - v),
      tabs: f.tabs,
      firstLineIndent: f.bullet ? 0 : f.indent,
      // ⭐ R47：行首半角空格「折进缩进」还是「当真字形排入」，取决于段落**自身**
      // 有没有声明 `indent` —— 见 wrapStyledRuns 里的判据与 r52-real410312/REPORT.md §#106。
      leadSpacesFolded: f.indentDeclared === !0
    }).map((E, X, _) => {
      const C = xs(E, f), w = Ln(C, f.lineSpacing);
      return {
        ...E,
        firstLine: X === 0,
        lastLine: X === _.length - 1,
        maxFontSize: C,
        height: w
      };
    }), k = y === 0 ? 0 : f.spaceBefore, S = f.spaceBefore + $.reduce((E, X) => E + X.height, 0) + f.spaceAfter;
    s.push({ paragraph: f, paragraphIndex: y, rows: $, startX: u, rightX: h, height: S, advanceBefore: k }), l += S;
  });
  const r = [...s].reverse().find((f) => f.rows.length);
  let m = l;
  if (r) {
    const f = r.rows[r.rows.length - 1], y = We(r.paragraph.lineSpacing);
    y !== null && y > 1 && (m -= f.height - (0.9 * y * f.maxFontSize + am(f, r.paragraph)));
  }
  const c = e.autoFit === "shape" ? 0 : n - m;
  let i = a.y + e.insetTop;
  e.anchor === "ctr" && (i += c / 2), e.anchor === "b" && (i += c);
  const d = i, o = [];
  let x = 0;
  for (const f of s) {
    const { paragraph: y, paragraphIndex: u, rows: h, startX: g, rightX: v, advanceBefore: A } = f, j = [];
    i += A;
    for (const $ of h) {
      const k = i + Vl($, y), S = g + ($.firstLine && !y.bullet ? y.indent : 0);
      let E = S;
      if (y.align === "ctr") {
        const X = x + (v - S - $.width) / 2;
        E = S + X, X < x && (x = X);
      }
      if (y.align === "r" && (E = v - $.width), $.firstLine && y.bullet) {
        const X = y.runs[0].style, _ = g + y.indent;
        j.push(
          `<text xml:space="preserve" x="${_}" y="${k}" ${Rn(X)}>${ga(y.bullet)}</text>`
        );
      }
      {
        const X = E + $.leadingWidth, _ = fs(
          $,
          y,
          S + $.leadingWidth,
          v
        ), C = ds($, X, _.perSegmentX), w = $.segments.map((z) => z.style), q = is(
          $,
          w,
          X,
          k,
          d,
          C,
          _.wordSpacing,
          /textLength/.test(_.attrs)
        );
        let T = 0;
        const I = $.segments.map((z, P) => {
          var K;
          const F = ((K = z.style) == null ? void 0 : K.baselineShift) || 0, J = F === T ? null : k + F;
          return T = F, os(
            z,
            void 0,
            (C == null ? void 0 : C[P]) || null,
            q.handled,
            J
          );
        }).join(""), U = `<text xml:space="preserve" x="${X}" y="${k}"${_.attrs}>${I}</text>`;
        j.push(`${q.rects}${U}`);
        const N = w.find((z) => z == null ? void 0 : z.reflection);
        if (N) {
          const z = N.reflection, P = z.lengthEm * N.fontSize, F = z.blurPx, J = {
            x: X - F * 3 - 2,
            y: k - F * 3 - 2,
            width: $.width + F * 6 + 4,
            height: P + F * 6 + 4
          }, K = nl(t, z, N.fontSize, k, J), Y = `<text transform="translate(0 ${(2 * k).toFixed(3)}) scale(1 -1)" xml:space="preserve" x="${X}" y="${k}"${_.attrs}>${I}</text>`;
          j.push(
            `<g mask="url(#${K})" filter="url(#reflBlur-${K})">${Y}</g>`
          );
        }
      }
      i += $.height;
    }
    i += y.spaceAfter, o.push(`<g data-text-paragraph="${u}">${j.join("")}</g>`);
  }
  return o.join("");
}
function ys(a, t, e = 0) {
  if (!a.text) return null;
  const n = a.text, s = { left: a.marL, right: a.marR, top: a.marT, bottom: a.marB }, l = [];
  let r = 0;
  for (const c of n.paragraphs) {
    const i = e + s.left + c.marL, d = e + t - s.right, o = Math.max(1, d - i), x = i + (c.bullet ? 0 : c.indent), f = cs(c.runs, o, {
      wrap: n.wrap,
      latinLineBreak: c.latinLineBreak,
      eastAsianLineBreak: c.eastAsianLineBreak,
      hangingPunct: c.hangingPunct,
      firstLineMaxWidth: Math.max(1, d - x),
      tabs: c.tabs,
      firstLineIndent: c.bullet ? 0 : c.indent,
      // ⭐ R47：同上（表格 cell 走同一判据）。
      leadSpacesFolded: c.indentDeclared === !0
    }).map((y, u, h) => {
      const g = xs(y, c), v = Ln(g, c.lineSpacing);
      let A = 0;
      const j = y.segments.length ? y.segments.map((E) => E.style) : c.runs.map((E) => E.style);
      for (const E of j) {
        const X = (E == null ? void 0 : E.fontSize) || g;
        A = Math.max(A, X * Pt(E == null ? void 0 : E.fontFamily));
      }
      A || (A = g * Pt(null));
      const $ = We(c.lineSpacing), k = $ === null ? v : $ > 1 ? 0.9 * $ * g + A : Math.max(v, 0.9 * $ * g + A), S = k - A;
      return {
        ...y,
        firstLine: u === 0,
        lastLine: u === h.length - 1,
        maxFontSize: g,
        baseline: S,
        endHeight: k,
        height: v
      };
    });
    l.push({ paragraph: c, rows: f, startX: i, rightX: d, height: 0 });
  }
  const m = [...l].reverse().find((c) => c.rows.length);
  m && (m.rows[m.rows.length - 1].height = m.rows[m.rows.length - 1].endHeight);
  for (const c of l)
    c.height = c.paragraph.spaceBefore + c.rows.reduce((i, d) => i + d.height, 0) + c.paragraph.spaceAfter, r += c.height;
  return { text: n, cellPadding: s, layouts: l, totalHeight: r };
}
function nm(a, t, e, n, s) {
  const l = ys(a, n, t);
  if (!l) return "";
  const { text: r, cellPadding: m, layouts: c, totalHeight: i } = l, d = Math.max(1, s - m.top - m.bottom), o = a.anchor || r.anchor || "t";
  let x = e + m.top;
  o === "ctr" && (x += Math.max(0, (d - i) / 2)), o === "b" && (x += Math.max(0, d - i));
  const f = x, y = [];
  let u = 0;
  for (const h of c) {
    const { paragraph: g, rows: v, startX: A, rightX: j } = h;
    x += g.spaceBefore;
    for (const $ of v) {
      const k = x + $.baseline, S = A + ($.firstLine && !g.bullet ? g.indent : 0);
      let E = S;
      if (g.align === "ctr") {
        const N = u + (j - S - $.width) / 2;
        E = S + N, N < u && (u = N);
      }
      g.align === "r" && (E = j - $.width);
      const X = a.styleOverride, _ = fs(
        $,
        g,
        S + $.leadingWidth,
        j
      ), C = $.segments.map((N) => X ? { ...N.style, color: X.color || N.style.color, bold: X.bold || N.style.bold } : N.style), w = E + $.leadingWidth, q = ds($, w, _.perSegmentX), T = is(
        $,
        C,
        w,
        k,
        f,
        q,
        _.wordSpacing,
        /textLength/.test(_.attrs)
      );
      let I = 0;
      const U = $.segments.map((N, z) => {
        var J;
        const P = ((J = N.style || C[z]) == null ? void 0 : J.baselineShift) || 0, F = P === I ? null : k + P;
        return I = P, os(
          N,
          C[z],
          (q == null ? void 0 : q[z]) || null,
          T.handled,
          F
        );
      }).join("");
      y.push(`${T.rects}<text xml:space="preserve" x="${w}" y="${k}"${_.attrs}>${U}</text>`), x += $.height;
    }
    x += g.spaceAfter;
  }
  return y.join("");
}
function em(a) {
  const { x: t, y: e, width: n, height: s, table: l } = a, { columnWidths: r, rows: m } = l, c = r.slice(), i = m.reduce((S, E) => S + Math.max(0, E.height), 0), o = m.map((S) => {
    let E = S.height;
    for (const X of S.cells) {
      if (X.hMerge || X.vMerge) continue;
      const _ = X.gridSpan || 1;
      let C = 0;
      for (let q = 0; q < _ && X.col + q < c.length; q++)
        C += c[X.col + q];
      const w = ys(X, C);
      if (w) {
        const q = w.cellPadding.top + w.cellPadding.bottom;
        E = Math.max(E, q + w.totalHeight);
      }
    }
    return { naturalHeight: E };
  }).map((S) => S.naturalHeight), x = o.reduce((S, E) => S + E, 0), f = s - x, y = o.map((S, E) => S > m[E].height + 1e-6), u = y.filter(Boolean).length, h = o.map((S, E) => {
    let X;
    return i > 0 && u > 0 && u < o.length ? X = y[E] ? 1 / u : 0 : i > 0 && u === 0 && f > 0 ? X = 0 : X = i > 0 ? m[E].height / i : 1 / Math.max(1, m.length), Math.max(m[E].height || 0, S + f * X);
  }), g = [], v = [];
  let A = e;
  const j = /* @__PURE__ */ new Set(), $ = (S, E, X, _, C) => {
    const w = `${S}|${E}|${X}|${_}|${C.color}|${C.width}`;
    j.has(w) || (j.add(w), v.push(
      `<line x1="${S}" y1="${E}" x2="${X}" y2="${_}" stroke="${C.color}" stroke-width="${C.width}"/>`
    ));
  }, k = [t];
  for (const S of c) k.push(k[k.length - 1] + S);
  for (const [S, E] of m.entries()) {
    const X = h[S];
    for (const _ of E.cells) {
      if (_.hMerge || _.vMerge) continue;
      const C = _.gridSpan || 1, w = _.rowSpan || 1;
      let q = 0;
      for (let P = 0; P < C && _.col + P < c.length; P++)
        q += c[_.col + P];
      const T = k[_.col] ?? k[k.length - 1], I = k[_.col + C] ?? k[k.length - 1];
      let U = X;
      if (w > 1) {
        U = 0;
        for (let P = 0; P < w && S + P < h.length; P++)
          U += h[S + P];
      }
      const N = _.fill || "none", z = _.borders;
      z ? (g.push(
        `<rect x="${T}" y="${A}" width="${q}" height="${U}" fill="${ga(N)}"/>`
      ), z.top && $(T, A, T + q, A, z.top), z.bottom && $(T, A + U, T + q, A + U, z.bottom), z.left && $(T, A, T, A + U, z.left), z.right && $(I, A, I, A + U, z.right)) : g.push(
        `<rect x="${T}" y="${A}" width="${q}" height="${U}" fill="${ga(N)}" stroke="#8f8f8f" stroke-width="0.7"/>`
      ), g.push(nm(_, T, A, q, U));
    }
    A += X;
  }
  return `<g${Sa(a)}>${g.join("")}${v.join("")}</g>`;
}
function ye(a, t) {
  const e = String(a).replace("#", "");
  return /^[0-9a-fA-F]{6}$/.test(e) ? Ye(e, [["tint", Math.round((1 - t) * 1e5)]]) : a;
}
function hs(a, t) {
  if (a.type === "group") {
    const e = a.elements.map((n) => hs(n, t)).join("");
    return `<g${Sa(a)}${ka(a)}>${e}</g>`;
  }
  if (a.type === "shape") return il(a, t);
  if (a.type === "line") {
    const e = a.x, n = a.y, s = a.x + a.width, l = a.y + a.height, r = U0(a.line, a.spid || "line"), m = r.attributes ? ` ${r.attributes}` : "", c = H0(a.line), i = Math.hypot(a.width, a.height) || 1, d = a.width / i, o = a.height / i, x = e + d * c.start, f = n + o * c.start, y = s - d * c.end, u = l - o * c.end;
    let h;
    if (a.preset === "bentConnector2" || a.preset === "bentConnector3") {
      const g = a.preset === "bentConnector2" ? 1 : 2;
      h = `<path d="${on(e, n, a.width, a.height, g, fn(a.width, a.height), c.end)}" fill="none" ${dn(a.line)}${m}/>`;
    } else
      h = `<line x1="${x}" y1="${f}" x2="${y}" y2="${u}" ${dn(a.line)}${m}/>`;
    return `<g${Sa(a)}${ka(a)}>${r.defs}${h}</g>`;
  }
  if (a.type === "image") {
    const e = a.duotone ? ` filter="url(#${Y0(t, a.duotone)})"` : "", n = a.opacity < 0.999 ? ` opacity="${a.opacity}"` : "", s = a.backgroundFill && a.backgroundFill !== "none" ? `<rect x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}" fill="${ga(a.backgroundFill)}"/>` : "";
    if (a.geometryPath || a.crop) {
      const l = a.crop || { left: 0, top: 0, right: 0, bottom: 0 }, r = Math.max(1e-3, 1 - l.left - l.right), m = Math.max(1e-3, 1 - l.top - l.bottom), c = a.x - a.width * l.left / r, i = a.y - a.height * l.top / m, d = a.width / r, o = a.height / m, x = a.geometryPath ? `<path d="${a.geometryPath}" transform="translate(${a.x} ${a.y})"/>` : `<rect x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}"/>`, f = `crop-${a.sourceLevel || "slide"}-${a.spid || "image"}`;
      return `<g${Sa(a)}${ka(a)}><defs><clipPath id="${ga(f)}">${x}</clipPath></defs>${s}<image x="${c}" y="${i}" width="${d}" height="${o}" href="${a.src}" preserveAspectRatio="none" clip-path="url(#${ga(f)})"${e}${n}/></g>`;
    }
    return s ? `<g${Sa(a)}${ka(a)}>${s}<image x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}" href="${a.src}" preserveAspectRatio="none"${e}${n}/></g>` : `<image${Sa(a)} x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}" href="${a.src}" preserveAspectRatio="none"${e}${n}${ka(a)}/>`;
  }
  return a.type === "table" ? em(a) : a.type === "chart" ? S0(a) : a.type === "unsupported" ? a.hideFallback ? `<g${Sa(a)}${ka(a)} data-unsupported="${ga(a.label || "Graphic")}" aria-hidden="true"></g>` : `<g${Sa(a)}${ka(a)}><rect x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}" rx="6" fill="#f7f3e8" stroke="#b28a36" stroke-width="1" stroke-dasharray="7 5"/><text x="${a.x + a.width / 2}" y="${a.y + a.height / 2}" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="${Math.max(12, Math.min(24, a.height / 4))}" fill="#806324">${ga(a.label)}</text></g>` : "";
}
function ps(a, t, e = {}) {
  var c, i, d;
  He();
  const n = Ft;
  Ft = e.hyperlinks !== !1;
  const s = a.elements.map((o) => hs(o, t)).join(""), l = J0(t) + tl(t) + el(t) + Q0(t);
  let r;
  if (((c = a.background) == null ? void 0 : c.type) === "image")
    r = `<image width="${a.width}" height="${a.height}" href="${a.background.value}" preserveAspectRatio="xMidYMid slice"/>`;
  else if (((i = a.background) == null ? void 0 : i.type) === "gradient")
    r = `<rect width="100%" height="100%" fill="${ga(a.background.value)}"/>`;
  else {
    const o = ((d = a.background) == null ? void 0 : d.value) || "#ffffff";
    r = `<rect width="100%" height="100%" fill="${ga(o)}"/>`;
  }
  const m = `<svg xmlns="${hl}" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${a.width} ${a.height}" width="${a.width}" height="${a.height}" role="img" aria-label="Slide ${a.index + 1}">${l}${r}${s}</svg>`;
  return Ft = n, m;
}
let wn = null;
function Xm(a) {
  wn = a;
}
function sm(a, t) {
  wn && wn(a, t);
}
const An = 1, lm = "Worker 里没有 DOMParser：请用 createWorkerHost({ installEnvironment }) 注入可移植 XML 解析端口（如 @xmldom/xmldom 的 DOMParser）";
function Vm({ installEnvironment: a } = {}) {
  if (typeof self > "u" || typeof self.postMessage != "function")
    throw new Error("createWorkerHost()：只能在 Worker 里调用（需要 self 与 self.postMessage）");
  a && a({
    configureXmlParser: wl,
    configureMeasureContext: Ir,
    configureYield: Fr,
    configureAssets: pl,
    createAssetResolver: Ee,
    configurePdfJs: r0,
    // 诊断用（只读）：内嵌 PDF 走的是注入实例还是 vendor、workerSrc 有没有配。
    pdfJsSource: $e,
    pdfJsWorkerSrc: je
  });
  const t = /* @__PURE__ */ new Map();
  let e = 1;
  const n = { bytesIn: 0, bytesOut: 0, opens: 0, renders: 0, parseMs: 0, renderMs: 0 }, s = new TextEncoder(), l = (m) => {
    const c = t.get(m);
    if (!c)
      throw new Error(`docId=${m} 不存在（已 dispose 或从未 open）—— 当前打开的文档：${[...t.keys()].join(",") || "无"}`);
    return c;
  };
  async function r(m) {
    var c, i, d, o;
    switch (m.type) {
      case "open": {
        const x = m.buffer;
        if (!(x instanceof ArrayBuffer))
          throw new Error(`open：buffer 必须是 ArrayBuffer，收到 ${Object.prototype.toString.call(x)}`);
        if (typeof DOMParser > "u" && !a)
          throw new Error(lm);
        const f = performance.now(), y = await ls({ arrayBuffer: async () => x }, m.options || {}), u = performance.now() - f, h = e++;
        return t.set(h, { deck: y }), n.bytesIn += x.byteLength, n.opens += 1, n.parseMs += u, {
          type: "opened",
          docId: h,
          slideCount: y.slideCount ?? y.slides.length,
          size: y.size,
          parseMs: +u.toFixed(1)
        };
      }
      case "render": {
        const x = l(m.docId), f = m.index, y = x.deck.slides.length;
        if (!Number.isInteger(f) || f < 0 || f >= y)
          throw new Error(`render：index=${f} 越界（共 ${y} 页）`);
        const u = performance.now(), h = ps(x.deck.slides[f], x.deck.defs);
        return n.renderMs += performance.now() - u, n.renders += 1, n.bytesOut += s.encode(h).length, { type: "rendered", docId: m.docId, index: f, svg: h };
      }
      case "stats": {
        const x = m.docId == null ? null : ((i = (c = l(m.docId).deck).resourceStats) == null ? void 0 : i.call(c)) ?? null;
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
        return (o = (d = l(m.docId).deck).dispose) == null || o.call(d), t.delete(m.docId), { type: "disposed", docId: m.docId, disposed: !0 };
      default:
        throw new Error(
          `未知消息类型 ${JSON.stringify(m.type)} —— 协议见 src/worker/host.js（支持 open / render / stats / dispose）`
        );
    }
  }
  return self.onmessage = async (m) => {
    const c = m.data || {}, { id: i } = c;
    try {
      if (c.version !== An)
        throw new Error(
          `协议版本不符：worker=${An} 消息=${JSON.stringify(c.version)} —— worker bundle 与 SDK 版本要一起升`
        );
      const d = await r(c);
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
const rm = (a) => a instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && a instanceof SharedArrayBuffer;
function Ym({ url: a, worker: t, workerOptions: e } = {}) {
  const n = t || (a ? new Worker(a, { type: "module", ...e || {} }) : null);
  if (!n)
    throw new Error('createWorkerClient({ url | worker })：必须给 url 或已构造好的 worker（ESM worker 需 type:"module"）');
  const s = /* @__PURE__ */ new Map();
  let l = 1;
  const r = { toWorker: 0, fromWorker: 0, requests: 0, errors: 0 }, m = [], c = new TextEncoder();
  n.onmessage = (d) => {
    const o = d.data || {}, x = s.get(o.id);
    if (!x) {
      m.push(`未识别的响应 id=${JSON.stringify(o.id)} type=${JSON.stringify(o.type)}`);
      return;
    }
    s.delete(o.id), o.type === "rendered" && (r.fromWorker += c.encode(o.svg || "").length), o.type === "error" && (r.errors += 1), o.type === "error" ? x.reject(new Error(o.message || "Worker 返回未知错误")) : x.resolve(o);
  }, n.onerror = (d) => {
    const o = String(d && d.message || "worker error");
    for (const [, x] of s) x.reject(new Error(`Worker 失败：${o}`));
    s.clear();
  };
  function i(d, o = {}, x = 0) {
    const f = l++;
    return r.requests += 1, r.toWorker += x, new Promise((y, u) => {
      s.set(f, { resolve: y, reject: u }), n.postMessage({ id: f, type: d, version: An, ...o });
    });
  }
  return {
    /** 打开一个 deck。input 可以是 File / Blob / ArrayBuffer。 */
    async open(d, o = {}) {
      const x = rm(d) ? d : await d.arrayBuffer(), f = await i("open", { buffer: x, options: o }, x.byteLength);
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
      for (const [, d] of s) d.reject(new Error("Worker 已关闭"));
      s.clear(), n.terminate();
    },
    /** 主线程侧传输字节账目（与 Worker 侧 ledger 互为对照）。 */
    bytes() {
      return { ...r };
    },
    protocolErrors: m,
    request: i
  };
}
const Mn = 5e3, mm = 5e3, cm = 10, us = /* @__PURE__ */ new Set(["entr", "exit"]);
function gs(a, t, e, n) {
  const s = (r, m, c) => {
    const i = 1 - r;
    return 3 * i * i * r * m + 3 * i * r * r * c + r * r * r;
  }, l = (r, m, c) => {
    const i = 1 - r;
    return 3 * i * i * m + 6 * i * r * (c - m) + 3 * r * r * (1 - c);
  };
  return (r) => {
    if (!(r > 0)) return 0;
    if (!(r < 1)) return 1;
    let m = r;
    for (let c = 0; c < 8; c += 1) {
      const i = s(m, a, e) - r;
      if (Math.abs(i) < 1e-7) break;
      const d = l(m, a, e);
      if (Math.abs(d) < 1e-7) break;
      m -= i / d;
    }
    return s(Math.min(1, Math.max(0, m)), t, n);
  };
}
const qt = gs(0, 0, 0.58, 1), bn = gs(0.42, 0, 1, 1), Za = (a) => `${(a * 100).toFixed(4)}%`, im = {
  left: (a) => `inset(0 0 0 ${Za(a)})`,
  right: (a) => `inset(0 ${Za(a)} 0 0)`,
  up: (a) => `inset(${Za(a)} 0 0 0)`,
  down: (a) => `inset(0 0 ${Za(a)} 0)`
}, om = { left: "right", right: "left", up: "down", down: "up" };
function Zt(a, t, e = !0) {
  const n = String(a || ""), s = 1 - Math.min(1, Math.max(0, t));
  if (!n || n.includes("fade")) return null;
  if (n.startsWith("blinds")) return `inset(0 ${Za(0.5 * s)} 0 ${Za(0.5 * s)})`;
  if (n.startsWith("wipe(")) {
    const l = n.slice(5, -1), r = e && om[l] || l, m = im[r];
    if (m) return m(s);
  }
  return null;
}
const Pa = 8, ws = /^randombars?\((horizontal|vertical)\)/;
function As(a) {
  return ws.test(String(a || "").trim().toLowerCase());
}
function fm(a) {
  const t = String(a ?? "");
  let e = 2166136261;
  for (let n = 0; n < t.length; n += 1)
    e ^= t.charCodeAt(n), e = Math.imul(e, 16777619);
  return e >>> 0;
}
function dm(a) {
  const t = Array.from({ length: Pa }, (s, l) => l);
  let e = fm(a) || 1;
  const n = () => {
    e = e + 1831565813 >>> 0;
    let s = e;
    return s = Math.imul(s ^ s >>> 15, s | 1), s ^= s + Math.imul(s ^ s >>> 7, s | 61), ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
  for (let s = t.length - 1; s > 0; s -= 1) {
    const l = Math.floor(n() * (s + 1));
    [t[s], t[l]] = [t[l], t[s]];
  }
  return t;
}
function bs(a, t, e) {
  const s = String(a || "").trim().toLowerCase().match(ws);
  if (!s) return null;
  const l = Math.round(Math.min(1, Math.max(0, t)) * Pa);
  if (l >= Pa) return null;
  const r = s[1] === "vertical" ? "to right" : "to bottom", m = new Set(dm(e ?? "").slice(0, Math.max(0, l))), c = [];
  for (let i = 0; i < Pa; i += 1) {
    const d = m.has(i) ? "#000" : "transparent";
    c.push(`${d} ${Za(i / Pa)} ${Za((i + 1) / Pa)}`);
  }
  return `linear-gradient(${r}, ${c.join(", ")})`;
}
function Wa(a) {
  return Math.max(1, Math.min(Mn, Number(a == null ? void 0 : a.duration) || 500));
}
const xm = 3e4;
function vs(a) {
  var t;
  return Math.max(1, Math.floor(Number((t = a == null ? void 0 : a.iterate) == null ? void 0 : t.unitCount) || 1));
}
function Gt(a) {
  var e;
  return Math.max(0, Math.min(1, Number((e = a == null ? void 0 : a.iterate) == null ? void 0 : e.intervalRatio) || 0)) * Wa(a);
}
function zt(a) {
  return !!(a != null && a.iterate) && Gt(a) > 0;
}
function Ja(a) {
  const t = Wa(a);
  if (!zt(a)) return t * 1;
  const e = t + (vs(a) - 1) * Gt(a);
  return Math.min(xm, Math.max(t, e));
}
function ym(a, t, e) {
  if (e !== 1 / 0 && !Number.isFinite(e)) return 0;
  const n = Wa(a), s = Math.max(0, Math.floor(Number(t) || 0)) * Gt(a);
  if (e === 1 / 0) return 1;
  const l = (e - s) / n;
  return l > 0 ? l >= 1 ? 1 : a.presetClass === "exit" ? 1 - bn(l) : qt(l) : 0;
}
function pt(a) {
  const t = a == null ? void 0 : a.path;
  return t && Array.isArray(t.points) && t.points.length >= 2 ? t : null;
}
function Ls(a, t = 0, e = 0) {
  const n = Math.min(1, Math.max(0, Number(a) || 0));
  let s = Math.min(1, Math.max(0, Number(t) || 0)), l = Math.min(1, Math.max(0, Number(e) || 0));
  if (s + l > 1) {
    const m = 1 / (s + l);
    s *= m, l *= m;
  }
  const r = 1 / (1 - (s + l) / 2);
  if (s > 0 && n <= s) return Math.min(1, r * n * n / (2 * s));
  if (l > 0 && n >= 1 - l) {
    const m = n - (1 - l);
    return Math.min(1, r * (s / 2 + (1 - l - s) + (m - m * m / (2 * l))));
  }
  return Math.min(1, r * (s / 2 + (n - s)));
}
function Rs(a, t) {
  const e = pt(a);
  if (!e) return { x: 0, y: 0 };
  const n = e.points, s = e.relative ? { x: 0, y: 0 } : n[0], l = n.length - 1, r = Math.min(1, Math.max(0, Number(t) || 0)) * l, m = Math.min(l - 1, Math.floor(r)), c = r - m, i = n[m], d = n[m + 1];
  return {
    x: i.x - s.x + (d.x - i.x) * c,
    y: i.y - s.y + (d.y - i.y) * c
  };
}
function he(a, t) {
  var e;
  return {
    type: ((e = a.iterate) == null ? void 0 : e.type) || "lt",
    intervalMs: Gt(a),
    unitDurationMs: Wa(a),
    unitCount: vs(a),
    elapsedMs: t
  };
}
function ut(a) {
  return a != null && a.repeatIndefinite ? 1 : Math.max(1, Math.min(cm, Math.floor(Number(a == null ? void 0 : a.repeat) || 1)));
}
function Ms(a) {
  return Math.max(0, Math.min(mm, Number(a == null ? void 0 : a.delay) || 0));
}
function $n(a) {
  return ((a == null ? void 0 : a.tracks) || []).find((t) => t.attrName === "style.visibility") || null;
}
function At(a) {
  if ((a == null ? void 0 : a.presetClass) === "path")
    return pt(a) ? null : "Unsupported motion path: animMotion has no usable path";
  if (!$n(a) && !us.has(a == null ? void 0 : a.presetClass))
    return `Unsupported preset class: ${(a == null ? void 0 : a.presetClass) || "unknown"}`;
  const t = (a == null ? void 0 : a.filter) || "";
  return t && !t.includes("fade") && Zt(t, 1) === null && !As(t) ? `Unsupported animation filter: ${t}` : null;
}
function Ht(a) {
  const t = [];
  let e = 0;
  for (const n of a || []) {
    const s = Ja(n) * ut(n), l = Ms(n), r = (n == null ? void 0 : n.trigger) === "afterEffect" ? e + l : l;
    t.push({ effect: n, start: r, end: r + s }), e = r + s;
  }
  return t;
}
function hm(a) {
  const t = /* @__PURE__ */ new Map();
  for (const e of (a == null ? void 0 : a.targets) || []) t.set(e.targetId, !0);
  for (const e of (a == null ? void 0 : a.initialHidden) || []) t.set(e, !1);
  return t;
}
const pm = Object.freeze({
  visible: !0,
  opacity: 1,
  clipPath: null,
  maskImage: null,
  translateX: 0,
  translateY: 0
});
function qa(a) {
  return { ...pm, visible: a };
}
function um(a, t) {
  return At(a) ? a.presetClass === "entr" ? qa(!0) : a.presetClass === "exit" ? t ? null : qa(!1) : null : null;
}
function gm(a, t) {
  if (t < 0 || t !== 1 / 0 && !Number.isFinite(t)) return null;
  const e = Wa(a), n = ut(a), s = Ja(a) * n, l = (a == null ? void 0 : a.motion) || {}, r = Number(l.fromX) || 0, m = Number(l.fromY) || 0, c = Number(l.toX) || 0, i = Number(l.toY) || 0, d = (v) => ({
    translateX: r + (c - r) * v,
    translateY: m + (i - m) * v
  });
  if (a.presetClass === "path") {
    const v = pt(a);
    if (!v) return null;
    const A = Ja(a), $ = t >= A * n ? 1 : t % A / A, k = Rs(a, Ls($, v.accel, v.decel));
    return { ...qa(!0), translateX: k.x, translateY: k.y };
  }
  const o = $n(a);
  if (o && !us.has(a.presetClass)) {
    const v = Math.max(1, Math.min(Mn, Number(o.duration) || e)), A = (o.keyframes || []).map((k) => ({ at: Math.min(1, Math.max(0, Number(k.at) || 0)), value: k.value })).sort((k, S) => k.at - S.at);
    if (!A.length) return null;
    if (t >= v * n)
      return { ...qa(A.at(-1).value === "visible") };
    const j = t % v;
    let $ = A[0].value;
    for (const k of A)
      k.at * v <= j + 1e-9 && ($ = k.value);
    return { ...qa($ === "visible") };
  }
  const x = a.presetClass === "entr", f = (a == null ? void 0 : a.filter) || "", y = f.includes("fade");
  if (zt(a)) {
    const v = Ja(a);
    if (t >= v * n)
      return {
        ...qa(x),
        opacity: x ? 1 : 0,
        clipPath: null,
        maskImage: null,
        ...d(1),
        iterate: he(a, 1 / 0)
      };
    const A = t % v / v, j = x ? qt(A) : bn(A);
    return {
      visible: !0,
      opacity: x ? j : 1 - j,
      clipPath: null,
      maskImage: null,
      ...d(j),
      iterate: he(a, t)
    };
  }
  if (t >= s)
    return {
      ...qa(x),
      opacity: x ? 1 : y ? 0 : 1,
      clipPath: null,
      maskImage: null,
      ...d(1)
    };
  const u = t % e / e, h = x ? qt(u) : bn(u), g = x ? h : 1 - h;
  return {
    visible: !0,
    opacity: y ? x ? h : 1 - h : 1,
    clipPath: Zt(f, g, x),
    maskImage: bs(f, g, a == null ? void 0 : a.targetId),
    ...d(h)
  };
}
function pe(a, t = {}) {
  if (!a || !Array.isArray(a.steps) || !Array.isArray(a.targets))
    throw new TypeError("sampleSlideAnimation requires parsed slide animation data");
  const e = Math.max(0, Math.min(a.steps.length, Math.floor(Number(t.step) || 0))), n = t.timeMs, s = !!t.ignoreExits, l = !!t.ignorePaths, r = /* @__PURE__ */ new Map();
  for (const c of a.targets)
    r.set(c.targetId, qa(hm(a).get(c.targetId) !== !1));
  const m = (c, i) => {
    if (At(c)) {
      const o = um(c, s);
      o && i >= 0 && r.set(c.targetId, o);
      return;
    }
    if (s && c.presetClass === "exit" || l && c.presetClass === "path") return;
    const d = gm(c, i);
    d && r.set(c.targetId, d);
  };
  for (let c = 0; c < e; c += 1)
    for (const { effect: i } of Ht(a.steps[c])) m(i, 1 / 0);
  if (n !== void 0 && e < a.steps.length)
    for (const { effect: c, start: i } of Ht(a.steps[e]))
      m(c, Number(n) - i);
  return r;
}
function wm(a) {
  const t = Array.isArray(a == null ? void 0 : a.steps) ? a.steps : [], e = Array.isArray(a == null ? void 0 : a.stepMeta) ? a.stepMeta : [];
  return t.map((n, s) => {
    var r, m;
    const l = Ht(n);
    return {
      index: s,
      trigger: ((r = e[s]) == null ? void 0 : r.trigger) || "click",
      delay: Math.max(0, Number((m = e[s]) == null ? void 0 : m.delay) || 0),
      duration: l.reduce((c, i) => Math.max(c, i.end), 0),
      targetIds: Array.from(new Set((n || []).map((c) => c.targetId))),
      effects: (n || []).map((c, i) => {
        var d;
        return {
          targetId: c.targetId,
          spid: c.spid,
          trigger: c.trigger,
          // clickEffect / withEffect / afterEffect / clickPar
          presetClass: c.presetClass,
          presetId: c.presetId,
          filter: c.filter,
          // 相对**步起点**的延迟（步容器的那一份不在这里，见 `step.delay`）
          delay: Ms(c),
          duration: Wa(c),
          totalMs: Ja(c) * ut(c),
          start: ((d = l[i]) == null ? void 0 : d.start) ?? 0,
          repeat: ut(c),
          repeatIndefinite: !!c.repeatIndefinite,
          unsupported: At(c)
        };
      })
    };
  });
}
function Qm(a) {
  const t = [];
  for (const [e, n] of ((a == null ? void 0 : a.steps) || []).entries())
    for (const s of n) {
      const l = At(s);
      l && t.push({ step: e, targetId: s.targetId, reason: l });
    }
  return t;
}
const Am = 2, bm = 30, Fa = {
  barRatio: 0.16,
  // 条高 / 媒体高
  barMin: 26,
  // 逻辑 px：小媒体上控件也要够大才点得到
  barMax: 56,
  minBarWidth: 180,
  // 音频往往只有一个小喇叭图标 ⇒ 给控件条一个可点的最小宽度
  pad: 0.16,
  // 条内边距 / 条高
  btnRatio: 0.62,
  // 按钮边长 / 条高
  trackRatio: 0.16,
  // 进度条厚度 / 条高
  fadeMs: 200,
  // 淡入淡出
  autoHideMs: 2600,
  // 播放中无交互多久淡出（PowerPoint 同款手感）
  uiFps: 10
  // 音频在播 / 控件动画时的泵频（比视频的 30fps 低一个量级）
}, vm = {
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
function Lm(a, t) {
  if (t && t !== "application/octet-stream") return t;
  const e = String(a || "").split(".").pop().toLowerCase();
  return vm[e] || "";
}
function Rm(a, t = {}) {
  const e = t.readPart || (a == null ? void 0 : a.readPart), n = typeof t.onFrame == "function" ? t.onFrame : null, s = t.muted !== !1, l = Math.max(1, Math.floor(t.maxPlates ?? Am)), r = Math.max(1, Math.floor(t.maxFps ?? bm)), m = t.controls === "always" || t.controls === "never" ? t.controls : "auto", c = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  let o = -1, x = !1, f = s, y = !1, u = 0, h = null, g = !1, v = 0, A = null, j = null;
  const $ = /* @__PURE__ */ new Set();
  let k = null;
  const S = (R, b) => `${R}/${b}`, E = (R, b) => `${R}:${b}`;
  function X(R, b) {
    const L = S(R, b.id), M = c.get(L);
    if (M) return M;
    const B = {
      id: b.id,
      slideIndex: R,
      kind: b.kind === "audio" ? "audio" : "video",
      part: b.part,
      mime: Lm(b.part, b.mime),
      rect: b.rect,
      posterPart: b.posterPart || null,
      phase: "idle",
      // idle | loading | ready | playing | paused | ended | unsupported
      unsupported: null,
      // "missing" | "codec" | "blocked" | "decode"
      el: null,
      url: null,
      posterImage: null,
      posterUrl: null,
      // none | pending | ready | broken（R105：让宿主语料里到底有没有封面**可自查**）
      posterState: b.posterPart ? "pending" : "none",
      // R105：最后一次**成功**画出去的视频帧。seek / 缓冲时 readyState 掉到 1，
      // 此刻既没有新帧又没有可用封面，用它顶住，别露出静态底盘（那是个黑块）。
      lastFrame: null,
      // R102：控件。首帧直接给目标值（不淡入），避免「第一眼没控件」的闪烁。
      ctlAlpha: 1,
      ctlTarget: 1,
      lastPaintAt: 0,
      geo: null
      // 最近一次绘制用的几何（命中判据复用它，杜绝第二个真源）
    };
    return c.set(L, B), B;
  }
  function _(R) {
    if (typeof document > "u") return !1;
    const b = document.createElement(R.kind === "audio" ? "audio" : "video");
    return R.mime ? b.canPlayType(R.mime) !== "" : "";
  }
  async function C(R) {
    if (R.phase !== "idle") return R;
    if (!e)
      return R.phase = "unsupported", R.unsupported = "missing", R;
    if (!_(R))
      return R.phase = "unsupported", R.unsupported = "codec", R;
    R.phase = "loading";
    let b = null;
    try {
      b = await e(R.part);
    } catch {
      b = null;
    }
    if (x) return R;
    if (!b || !b.length)
      return R.phase = "unsupported", R.unsupported = "missing", R;
    const L = document.createElement(R.kind);
    L.preload = "auto", L.muted = f, L.playsInline = !0, L.src = R.url = URL.createObjectURL(new Blob([b], { type: R.mime || void 0 })), L.addEventListener("error", () => {
      R.phase = "unsupported", R.unsupported = "decode", R.el = null;
    }), L.addEventListener("ended", () => {
      R.phase = "ended";
    });
    for (const M of ["seeked", "canplay", "loadeddata"])
      L.addEventListener(M, () => p());
    if (R.el = L, R.posterPart)
      try {
        const M = await e(R.posterPart);
        if (M && !x) {
          R.posterUrl = URL.createObjectURL(new Blob([M]));
          const B = new Image();
          B.onload = () => {
            R.posterState = "ready", p();
          }, B.onerror = () => {
            R.posterState = "broken";
          }, R.posterImage = B, B.src = R.posterUrl;
        } else
          R.posterState = "broken";
      } catch {
        R.posterState = "broken";
      }
    return I(R), T(), R;
  }
  function w(R) {
    var b, L;
    if (U(R), R.el) {
      try {
        R.el.pause();
      } catch {
      }
      R.el.removeAttribute("src"), (L = (b = R.el).load) == null || L.call(b), R.el = null;
    }
    R.url && (URL.revokeObjectURL(R.url), R.url = null), R.posterUrl && (URL.revokeObjectURL(R.posterUrl), R.posterUrl = null), R.posterImage = null, R.lastFrame = null, R.posterState = R.posterPart ? "pending" : "none", R.phase !== "unsupported" && (R.phase = "idle"), T();
  }
  function q() {
    const R = [];
    for (const b of d.get(o) || []) {
      const L = c.get(S(o, b.id));
      !L || !L.el || R.push({
        id: L.id,
        kind: L.kind,
        element: L.el,
        phase: L.phase,
        unsupported: L.unsupported,
        muted: !!L.el.muted
      });
    }
    return R;
  }
  function T() {
    if (x) return;
    const R = q();
    for (const b of Array.from($))
      try {
        b(R);
      } catch {
      }
  }
  function I(R) {
    if (!(!k || !R.el || k.sources.has(R.el)))
      try {
        const b = k.ctx.createMediaElementSource(R.el);
        b.connect(k.gain), k.sources.set(R.el, b);
      } catch {
      }
  }
  function U(R) {
    if (!k || !R.el) return;
    const b = k.sources.get(R.el);
    if (b) {
      try {
        b.disconnect();
      } catch {
      }
      k.sources.delete(R.el);
    }
  }
  function N(R) {
    for (const b of c.values())
      if (!(b.kind !== R || b.phase !== "playing" || !b.el))
        return !0;
    return !1;
  }
  function z() {
    return N("video");
  }
  function P() {
    return N("audio");
  }
  function F() {
    if (j) return !0;
    for (const R of c.values())
      if (Math.abs((R.ctlAlpha ?? 0) - (R.ctlTarget ?? 0)) > 0.01) return !0;
    return !1;
  }
  function J() {
    return z() || P() || F();
  }
  function K() {
    if (x) return;
    const R = sn(), b = z() ? 1e3 / r : 1e3 / Fa.uiFps;
    if (R - u < b) {
      Y();
      return;
    }
    u = R;
    const L = J();
    if (L && n && n(), !L) {
      fa();
      return;
    }
    Y();
  }
  function Y() {
    if (y || x) return;
    y = !0;
    const R = () => {
      y = !1, K();
    };
    typeof requestAnimationFrame == "function" ? h = requestAnimationFrame(R) : h = setTimeout(R, 1e3 / r);
  }
  function fa() {
    y = !1, h != null && (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(h) : clearTimeout(h), h = null);
  }
  const da = () => {
    typeof document < "u" && document.hidden ? fa() : J() && Y();
  };
  typeof document < "u" && document.addEventListener && document.addEventListener("visibilitychange", da);
  function W(R) {
    return R.phase === "unsupported" && R.unsupported !== "blocked";
  }
  function ta(R, b) {
    if (W(R)) return 0;
    if (m === "always" || !g || j === R.id) return 1;
    const L = b - v < Fa.autoHideMs;
    return A === R.id && L ? 1 : R.phase === "playing" && !L ? 0 : 1;
  }
  function ma(R, b, { slideW: L, slideH: M, scale: B, now: O }) {
    if (m === "never") {
      b.geo = null;
      return;
    }
    const D = b.lastPaintAt ? Math.min(O - b.lastPaintAt, 500) : 0;
    b.lastPaintAt = O;
    const H = ta(b, O);
    b.ctlTarget = H, b.ctlAlpha = D > 0 ? $m(b.ctlAlpha, H, D / Fa.fadeMs) : H, b.geo = jm(b, L, M), b.ctlAlpha > 0.01 ? _m(R, b, b.geo, B, b.ctlAlpha) : W(b) && Fm(R, b.geo, B);
  }
  function Q(R, b, L, M = !0) {
    for (const B of d.get(R) || []) {
      const O = c.get(S(R, B.id));
      if (!O || !O.geo || M && O.ctlAlpha < 0.05) continue;
      const D = O.geo;
      if (b < D.x || b > D.x + D.width || L < D.y || L > D.y + D.height) continue;
      if (we(b, L, D.play)) return { entry: O, part: "play" };
      if (we(b, L, D.mute)) return { entry: O, part: "mute" };
      const H = D.play.x + D.play.width + D.pad / 2, aa = D.mute.x - D.pad / 2;
      return b >= H && b <= aa ? { entry: O, part: "track", ratio: Ua((b - D.track.x) / Math.max(1, D.track.width), 0, 1) } : null;
    }
    return null;
  }
  function oa(R, b) {
    const L = R.el, M = L && Number.isFinite(L.duration) ? L.duration : 0;
    if (!(!L || !(M > 0)))
      try {
        L.currentTime = Ua(b, 0, 1) * M;
      } catch {
      }
  }
  async function ia(R) {
    R.phase === "playing" ? G.pause(R.id) : await G.play(R.id);
  }
  function p() {
    x || (J() ? Y() : n && n());
  }
  const G = {
    /** 这一页有没有要画的视频（决定宿主能不能复用静态底盘）。 */
    hasVideo(R) {
      return (d.get(R) || []).some((L) => L.kind !== "audio");
    },
    /** 缓存的静态底盘；没有返回 null（宿主就照常走完整 SVG 光栅）。 */
    plateFor(R, b) {
      return i.get(E(R, b)) || null;
    },
    /** 登记这一页的媒体清单并切换「当前页」（离开的页会被停下）。 */
    setActive(R, b) {
      if (x) return;
      if (Array.isArray(b) && d.set(R, b), o !== -1 && o !== R) {
        A = null, j = null;
        for (const M of c.values())
          M.slideIndex === o && M.el && (M.el.pause(), M.phase === "playing" && (M.phase = "paused"));
        fa();
      }
      const L = o !== R;
      o = R, L && T();
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
    async paintInto(R, { slideIndex: b, media: L, width: M, height: B, scale: O, animated: D }) {
      if (x || !R) return;
      Array.isArray(L) && d.set(b, L), G.setActive(b, L);
      const H = E(b, O);
      if (!D && !i.has(H) && M > 0 && B > 0) {
        const la = document.createElement("canvas");
        for (la.width = M, la.height = B, la.getContext("2d").drawImage(R.canvas, 0, 0), i.set(H, la); i.size > l; ) {
          const ra = i.keys().next().value;
          i.delete(ra);
        }
      }
      const aa = O > 0 ? M / O : M, V = O > 0 ? B / O : B, sa = sn();
      for (const la of d.get(b) || []) {
        const ra = X(b, la);
        if (ra.phase === "unsupported")
          ge(ra) && _t(R, ra.posterImage, ra.rect, O);
        else {
          if (ra.phase === "idle" && await C(ra), x) return;
          const ya = ra.el;
          ya && ra.kind !== "audio" && (ya.readyState >= 2 ? (_t(R, ya, ra.rect, O), Mm(ra, ya, O)) : ge(ra) ? _t(R, ra.posterImage, ra.rect, O) : ra.lastFrame && _t(R, ra.lastFrame, ra.rect, O));
        }
        ma(R, ra, { slideW: aa, slideH: V, scale: O, now: sa });
      }
    },
    /** 起播（幂等）。被自动播放策略拒绝是**常态**：落 `unsupported:"blocked"`，不抛。 */
    async play(R = null) {
      if (!x) {
        for (const b of d.get(o) || []) {
          if (R && b.id !== R) continue;
          const L = X(o, b);
          if (L.phase === "unsupported") continue;
          L.phase === "idle" && await C(L);
          const M = L.el;
          if (M) {
            M.muted = f;
            try {
              await M.play(), L.phase = "playing", L.unsupported = null;
            } catch {
              L.phase = "paused", L.unsupported = "blocked";
            }
          }
        }
        J() ? Y() : p();
      }
    },
    pause(R = null) {
      for (const b of c.values())
        R && b.id !== R || b.el && (b.el.pause(), b.phase === "playing" && (b.phase = "paused"));
      (!R || !z()) && fa(), p();
    },
    seek(R, b) {
      const L = c.get(S(o, R));
      if (L != null && L.el && Number.isFinite(b))
        try {
          L.el.currentTime = Math.max(0, b);
        } catch {
        }
    },
    setMuted(R) {
      f = R !== !1;
      for (const b of c.values())
        b.el && (b.el.muted = f);
    },
    /** 白板 `PlaybackCapability` 要的那点状态；整页粒度（不传 id）。 */
    state(R = null) {
      const b = d.get(o) || [];
      let L = !1, M = 0, B = 0, O = null;
      for (const D of b) {
        if (R && D.id !== R) continue;
        const H = c.get(S(o, D.id));
        H && (H.phase === "playing" && (L = !0), H.unsupported && !O && (O = H.unsupported), H.el && (M = Math.max(M, H.el.currentTime || 0), B = Math.max(B, Number.isFinite(H.el.duration) ? H.el.duration : 0)));
      }
      return { playing: L, time: M, duration: B, muted: f, unsupported: O };
    },
    /** 给宿主枚举用（工具栏要不要显示播放按钮）。 */
    list(R = o) {
      return (d.get(R) || []).map((L) => {
        const M = c.get(S(R, L.id));
        return {
          id: L.id,
          kind: L.kind,
          name: String(L.part || "").split("/").pop(),
          unsupported: (M == null ? void 0 : M.unsupported) || null,
          // R105：封面自查口。`none` = 这份 pptx 里这条媒体**根本没有**封面部件
          //（那就是「seek 期间只能靠上一帧顶着」的语料）；`pending` = 有但还没解码完；
          // `ready` = 能用；`broken` = 有部件但字节取不到 / 图解码失败。
          poster: (M == null ? void 0 : M.posterState) || (L.posterPart ? "pending" : "none")
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
    pageInfo(R, b = null) {
      var O;
      const L = Array.isArray(b) ? b : d.get(R) || [];
      Array.isArray(b) && Number.isInteger(R) && d.set(R, b);
      const M = [];
      for (const D of L)
        D && D.kind && !M.includes(D.kind) && M.push(D.kind);
      const B = [];
      for (const D of L) {
        const H = c.get(S(R, D.id));
        !H || !H.el || B.push({
          id: H.id,
          kind: H.kind,
          element: H.el,
          phase: H.phase,
          unsupported: H.unsupported,
          muted: !!H.el.muted
        });
      }
      return {
        slideIndex: R,
        hasMedia: L.length > 0,
        kinds: M,
        elements: B,
        track: ((O = k == null ? void 0 : k.handle) == null ? void 0 : O.track) || null
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
      return q();
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
    onElements(R) {
      if (typeof R != "function") return () => {
      };
      $.add(R);
      try {
        R(q());
      } catch {
      }
      return () => $.delete(R);
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
    createAudioTrack(R = {}) {
      const b = R.audioContext || R.context;
      if (x || !b || typeof b.createMediaStreamDestination != "function") return null;
      if (k) return k.handle;
      const L = b.createMediaStreamDestination(), M = b.createGain();
      M.gain.value = 1, M.connect(L);
      const B = { ctx: b, gain: M, dst: L, sources: /* @__PURE__ */ new Map(), handle: null };
      k = B, f = !1;
      for (const O of c.values())
        O.el && (O.el.muted = !1, I(O));
      return B.handle = {
        track: L.stream.getAudioTracks()[0] || null,
        elements: () => q(),
        dispose() {
          if (k === B) {
            k = null;
            for (const O of B.sources.values())
              try {
                O.disconnect();
              } catch {
              }
            B.sources.clear();
            try {
              B.gain.disconnect(), B.dst.disconnect();
            } catch {
            }
            for (const O of B.dst.stream.getTracks())
              try {
                O.stop();
              } catch {
              }
            f = !0;
            for (const O of c.values())
              O.el && (O.el.muted = !0);
          }
        }
      }, B.handle;
    },
    /**
     * R102：只读命中测试（**不改任何状态**），坐标与 `pointer` 同口径。
     *
     * 两个用处：① 宿主想知道「指针此刻压在控件上吗」以便换光标 / 决定要不要把这次
     * 手势让给控件；② 测试据此定位控件，**不必复制一份几何**（复制几何等于给「画的
     * 按钮」和「能点的按钮」开第二个真源）。没渲染过的页返回 null —— 控件还没画出来，
     * 自然也点不到。
     */
    hitTest(R) {
      if (x || !R) return null;
      const { x: b, y: L } = R;
      if (!Number.isFinite(b) || !Number.isFinite(L)) return null;
      const M = Number.isInteger(R.slideIndex) ? R.slideIndex : o, B = Q(M, b, L);
      return B ? { id: B.entry.id, part: B.part, ...B.ratio != null ? { ratio: B.ratio } : {} } : null;
    },
    /**
     * R102：宿主把指针事件转进来 —— 这是帧内控件**唯一**需要宿主配合的地方。
     *
     * @param {object} event
     * @param {number} event.x **slide 逻辑坐标**（与 `slide.media[].rect` 同口径，不是屏幕/画布像素）
     * @param {number} event.y
     * @param {"down"|"move"|"up"|"leave"} [event.phase="down"]
     * @param {number} [event.slideIndex] 默认当前页
     * @returns {boolean} true = 被控件消费，宿主**不要**再把它当窗口手势 / 动画点击处理
     *   （`move` 只在正在拖动进度条时才返回 true，否则会吃掉宿主的拖窗手势）
     */
    pointer(R) {
      if (x) return !1;
      const b = R == null ? void 0 : R.x, L = R == null ? void 0 : R.y;
      if (!Number.isFinite(b) || !Number.isFinite(L)) return !1;
      const M = (R == null ? void 0 : R.phase) || "down", B = Number.isInteger(R == null ? void 0 : R.slideIndex) ? R.slideIndex : o;
      if (g = !0, v = sn(), M === "leave")
        return A = null, j = null, p(), !1;
      const O = Q(B, b, L, M !== "move");
      if (A = O ? O.entry.id : null, O && (O.entry.ctlAlpha = 1), M === "move")
        return j && O && O.entry.id === j && O.part === "track" ? (oa(O.entry, O.ratio), p(), !0) : (O && p(), !1);
      if (M === "up") {
        const D = !!j;
        return j = null, D && p(), D;
      }
      return O ? (O.part === "play" ? ia(O.entry) : O.part === "mute" ? G.setMuted(!f) : O.part === "track" && (j = O.entry.id, oa(O.entry, O.ratio)), p(), !0) : !1;
    },
    dispose() {
      if (!x) {
        x = !0, fa(), A = null, j = null, g = !1, typeof document < "u" && document.removeEventListener && document.removeEventListener("visibilitychange", da), k && k.handle.dispose();
        for (const R of c.values()) w(R);
        c.clear(), i.clear(), d.clear();
        for (const R of Array.from($))
          try {
            R([]);
          } catch {
          }
        $.clear();
      }
    }
  };
  return G;
}
function _t(a, t, e, n) {
  if (!(!t || !e || !(e.width > 0) || !(e.height > 0)))
    try {
      a.drawImage(
        t,
        e.x * n,
        e.y * n,
        e.width * n,
        e.height * n
      );
    } catch {
    }
}
const ue = 2048;
function Mm(a, t, e) {
  const n = a.rect;
  if (!n || !(n.width > 0) || !(n.height > 0) || !(e > 0)) return;
  const s = Math.min(ue, Math.max(1, Math.round(n.width * e))), l = Math.min(ue, Math.max(1, Math.round(n.height * e)));
  let r = a.lastFrame;
  r || (r = document.createElement("canvas"), a.lastFrame = r), (r.width !== s || r.height !== l) && (r.width = s, r.height = l);
  const m = r.getContext("2d");
  if (m)
    try {
      m.clearRect(0, 0, s, l), m.drawImage(t, 0, 0, s, l);
    } catch {
    }
}
function ge(a) {
  const t = a.posterImage;
  return !!(t && t.complete && t.naturalWidth > 0 && t.naturalHeight > 0);
}
function sn() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function Ua(a, t, e) {
  return a < t ? t : a > e ? e : a;
}
function $m(a, t, e) {
  if (a === t) return t;
  const n = t - a;
  return Math.abs(n) <= e ? t : a + Math.sign(n) * e;
}
function we(a, t, e) {
  return a >= e.x && a <= e.x + e.width && t >= e.y && t <= e.y + e.height;
}
function Et(a, t, e, n, s, l) {
  const r = Math.max(0, Math.min(l, n / 2, s / 2));
  a.beginPath(), a.moveTo(t + r, e), a.lineTo(t + n - r, e), a.quadraticCurveTo(t + n, e, t + n, e + r), a.lineTo(t + n, e + s - r), a.quadraticCurveTo(t + n, e + s, t + n - r, e + s), a.lineTo(t + r, e + s), a.quadraticCurveTo(t, e + s, t, e + s - r), a.lineTo(t, e + r), a.quadraticCurveTo(t, e, t + r, e), a.closePath();
}
function jm(a, t, e) {
  const n = a.rect || {}, s = Math.max(1, n.width || 0), l = Math.max(1, n.height || 0), r = Ua(l * Fa.barRatio, Fa.barMin, Fa.barMax), m = Math.max(s, Fa.minBarWidth), c = a.kind === "audio" ? (n.y || 0) + l / 2 - r / 2 : (n.y || 0) + l - r, i = Ua((n.x || 0) + s / 2 - m / 2, 0, Math.max(0, t - m)), d = Ua(c, 0, Math.max(0, e - r)), o = r * Fa.pad, x = r * Fa.btnRatio, f = { x: i + o, y: d + (r - x) / 2, width: x, height: x }, y = { x: i + m - o - x, y: d + (r - x) / 2, width: x, height: x }, u = Math.max(1.5, r * Fa.trackRatio), h = {
    x: f.x + x + o,
    y: d + (r - u) / 2,
    width: Math.max(4, y.x - o - (f.x + x + o)),
    height: u
  };
  return { x: i, y: d, width: m, height: r, pad: o, play: f, mute: y, track: h };
}
function _m(a, t, e, n, s) {
  const l = n > 0 ? n : 1;
  a.save(), a.globalAlpha = Ua(s, 0, 1), a.fillStyle = "rgba(18,18,18,0.62)", Et(a, e.x * l, e.y * l, e.width * l, e.height * l, e.height * 0.22 * l), a.fill(), km(a, e.play, l, t.phase === "playing");
  const r = t.el, m = r && Number.isFinite(r.duration) ? r.duration : 0, c = m > 0 ? Ua((r.currentTime || 0) / m, 0, 1) : 0, i = e.track;
  a.fillStyle = "rgba(255,255,255,0.30)", Et(a, i.x * l, i.y * l, i.width * l, i.height * l, i.height / 2 * l), a.fill(), c > 0 && (a.fillStyle = "#ffffff", Et(a, i.x * l, i.y * l, i.width * c * l, i.height * l, i.height / 2 * l), a.fill()), a.beginPath(), a.arc(
    (i.x + i.width * c) * l,
    (i.y + i.height / 2) * l,
    Math.max(i.height, e.height * 0.16) * l,
    0,
    Math.PI * 2
  ), a.fillStyle = "#ffffff", a.fill(), Sm(a, e.mute, l, Cm(t)), a.restore();
}
function Cm(a) {
  return a.el ? !!a.el.muted : !0;
}
function km(a, t, e, n) {
  const s = t.x * e, l = t.y * e, r = t.width * e, m = t.height * e;
  if (a.fillStyle = "#ffffff", n) {
    const c = r * 0.26, i = r * 0.2, d = s + (r - c * 2 - i) / 2;
    a.fillRect(d, l + m * 0.18, c, m * 0.64), a.fillRect(d + c + i, l + m * 0.18, c, m * 0.64);
    return;
  }
  a.beginPath(), a.moveTo(s + r * 0.28, l + m * 0.16), a.lineTo(s + r * 0.82, l + m * 0.5), a.lineTo(s + r * 0.28, l + m * 0.84), a.closePath(), a.fill();
}
function Sm(a, t, e, n) {
  const s = t.x * e, l = t.y * e, r = t.width * e, m = t.height * e;
  a.fillStyle = "#ffffff";
  const c = s + r * 0.18, i = l + m * 0.34, d = r * 0.14, o = m * 0.32;
  a.beginPath(), a.moveTo(c, i), a.lineTo(c + d, i), a.lineTo(c + d + r * 0.2, l + m * 0.16), a.lineTo(c + d + r * 0.2, l + m * 0.84), a.lineTo(c + d, i + o), a.lineTo(c, i + o), a.closePath(), a.fill(), a.strokeStyle = "#ffffff", a.lineWidth = Math.max(1, r * 0.07), n ? (a.beginPath(), a.moveTo(s + r * 0.6, l + m * 0.3), a.lineTo(s + r * 0.9, l + m * 0.7), a.stroke()) : (a.beginPath(), a.arc(s + r * 0.56, l + m * 0.5, r * 0.18, -Math.PI / 3, Math.PI / 3), a.stroke());
}
function Fm(a, t, e) {
  if (!t) return;
  const n = e > 0 ? e : 1, s = "Unplayable", l = Math.max(9, t.height * 0.34);
  a.save(), a.font = `${l}px sans-serif`, a.textBaseline = "middle";
  const r = l * 0.5, m = a.measureText(s).width + r * 2, c = l * 1.7;
  a.fillStyle = "rgba(18,18,18,0.72)", Et(a, t.x * n, t.y * n, m * n, c * n, c * 0.2 * n), a.fill(), a.fillStyle = "rgba(255,255,255,0.85)", a.fillText(s, (t.x + r) * n, (t.y + c / 2) * n), a.restore();
}
function ln(a, t) {
  return t === a || a.contains(t);
}
function rn(a, t) {
  var l;
  const e = String(t.spid), n = '[data-source="slide"][data-spid]', s = (l = a.matches) != null && l.call(a, n) && a.getAttribute("data-spid") === e ? a : Array.from(a.querySelectorAll(n)).find((r) => r.getAttribute("data-spid") === e);
  return s ? !t.textRange || t.textRange.kind !== "paragraph" ? [s] : Array.from(s.querySelectorAll("[data-text-paragraph]")).filter((r) => {
    const m = Number(r.getAttribute("data-text-paragraph"));
    return m >= t.textRange.start && m <= t.textRange.end;
  }) : [];
}
function mn(a) {
  const t = [];
  for (const e of a) {
    if (String(e.tagName || "").toLowerCase() === "text") {
      t.push(e);
      continue;
    }
    const n = Array.from(e.querySelectorAll("text"));
    n.length ? t.push(...n) : t.push(e);
  }
  return t;
}
function Em(a = {}) {
  const { root: t, animation: e, width: n, height: s, onStateChange: l, onUnsupportedEffect: r } = a;
  if (!t || typeof t.querySelector != "function")
    throw new TypeError("createSlidePlayer requires an SVG root element");
  if (!e || !Array.isArray(e.steps) || !Array.isArray(e.targets))
    throw new TypeError("createSlidePlayer requires parsed slide animation data");
  if (!(Number(n) > 0) || !(Number(s) > 0))
    throw new TypeError("createSlidePlayer requires positive slide dimensions");
  const m = new Map((e.targets || []).map((W) => [W.targetId, W])), c = (e.steps || []).map(
    (W) => W.map((ta) => {
      if (!zt(ta)) return ta;
      const ma = m.get(ta.targetId) || ta, Q = mn(rn(t, ma));
      return Q.length > 1 ? { ...ta, iterate: { ...ta.iterate, unitCount: Q.length } } : ta;
    })
  ), i = { ...e, steps: c }, d = e.steps.length;
  let o = 0, x = !1, f = !1, y = 0, u = !1, h = !1;
  const g = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Set(), A = () => l == null ? void 0 : l({ currentStep: o, stepCount: d, busy: x }), j = (W) => !f && W === y;
  function $(W) {
    return new Promise((ta) => {
      const ma = { resolve: ta };
      ma.timer = setTimeout(() => {
        v.delete(ma), ta();
      }, W), v.add(ma);
    });
  }
  function k() {
    for (const W of v)
      clearTimeout(W.timer), W.resolve();
    v.clear();
  }
  function S() {
    for (const W of g) W.cancel();
    g.clear();
  }
  function E(W, ta) {
    for (const ma of W)
      ln(t, ma) && (ma.style.visibility = ta ? "visible" : "hidden");
  }
  function X(W) {
    W.getAnimations().forEach((ta) => ta.cancel()), W.style.opacity = "", W.style.clipPath = "", W.style.maskImage = "", W.style.transform = "", W.style.translate = "", W.style.rotate = "", W.style.scale = "";
  }
  function _(W) {
    for (const ta of m.values()) {
      const ma = rn(t, ta), Q = W.get(ta.targetId);
      if (!(!Q || !ma.length)) {
        for (const oa of ma)
          if (ln(t, oa)) {
            X(oa);
            for (const ia of oa.querySelectorAll("text"))
              ia.style.opacity !== "" && (ia.style.opacity = "");
            oa.style.visibility = Q.visible ? "visible" : "hidden", oa.style.opacity = Q.opacity >= 1 ? "" : String(Q.opacity), oa.style.clipPath = Q.clipPath || "", oa.style.maskImage = Q.maskImage || "", oa.style.translate = Q.translateX || Q.translateY ? U(Q.translateX, Q.translateY) : "";
          }
      }
    }
  }
  function C(W, { ignoreExits: ta = !1, ignorePaths: ma = !1 } = {}) {
    _(
      pe(i, { step: W, ignoreExits: ta, ignorePaths: ma })
    );
  }
  function w(W) {
    if (f) throw new Error("slide player already disposed");
    if (typeof W != "number" || !Number.isFinite(W))
      throw new TypeError("sampleAt requires a finite time in milliseconds");
    _(
      pe(i, {
        step: o,
        timeMs: W,
        ignoreExits: u,
        ignorePaths: h
      })
    );
  }
  function q() {
    f || (y += 1, k(), S(), x = !1, C(o, {
      ignoreExits: u,
      ignorePaths: h
    }), A());
  }
  function T(W, ta = {}) {
    u = !!ta.ignoreExits, h = !!ta.ignorePaths, C(W, ta), o = W, A();
  }
  function I(W, ta = {}) {
    if (f) throw new Error("slide player already disposed");
    if (!Number.isInteger(W) || W < 0 || W > d)
      throw new RangeError(`step ${W} is out of range (0..${d})`);
    q(), T(W, ta);
  }
  function U(W = 0, ta = 0) {
    return `${W * Number(n)}px ${ta * Number(s)}px`;
  }
  async function N(W, ta) {
    const ma = await Promise.allSettled(W.map((oa) => oa.finished));
    if (W.forEach((oa) => g.delete(oa)), !j(ta)) return !1;
    const Q = ma.find((oa) => oa.status === "rejected");
    if (Q) throw Q.reason;
    return !0;
  }
  async function z(W, ta, { duration: ma, iterations: Q, token: oa }) {
    const ia = Math.max(1, Math.min(Mn, Number(ta.duration) || ma)), p = ta.keyframes.map((R) => ({ at: Math.min(1, Math.max(0, R.at)), value: R.value })).sort((R, b) => R.at - b.at), G = p.at(-1).value;
    for (let R = 0; R < Q; R += 1) {
      let b = 0;
      for (const M of p) {
        const B = Math.round(M.at * ia);
        if (B > b && (await $(B - b), b = B), !j(oa)) return;
        E(W, M.value === "visible");
      }
      const L = ia - b;
      if (L > 0 && await $(L), !j(oa)) return;
    }
    E(W, G === "visible");
  }
  function P(W, ta) {
    for (const ma of W)
      ln(t, ma) && (ma.style.maskImage = ta || "");
  }
  async function F(W, ta, { duration: ma, iterations: Q, token: oa }) {
    const ia = ta.presetClass === "exit";
    for (let p = 0; p < Q; p += 1) {
      let G = 0;
      for (let b = 0; b <= Pa; b += 1) {
        const L = Math.round(b / Pa * ma);
        if (L > G && (await $(L - G), G = L), !j(oa)) return;
        const M = qt(b / Pa);
        P(W, bs(ta.filter, ia ? 1 - M : M, ta.targetId));
      }
      const R = ma - G;
      if (R > 0 && await $(R), !j(oa)) return;
    }
  }
  function J(W, ta, { iterations: ma, token: Q }) {
    return new Promise((oa) => {
      const ia = Ja(ta), p = Math.max(1, ia * ma), G = performance.now();
      let R = 0;
      const b = () => {
        for (const B of W) B.style.opacity = "";
      }, L = () => {
        R && cancelAnimationFrame(R), b(), oa();
      }, M = (B) => {
        if (!j(Q)) {
          R && cancelAnimationFrame(R), b(), oa();
          return;
        }
        const O = Math.min(p, B - G), D = ma > 1 ? O % ia : O;
        for (let H = 0; H < W.length; H += 1) {
          const aa = ym(ta, H, D);
          W[H].style.opacity = aa >= 1 ? "" : String(aa);
        }
        if (O >= p) {
          L();
          return;
        }
        R = requestAnimationFrame(M);
      };
      R = requestAnimationFrame(M);
    });
  }
  async function K(W, ta) {
    var H;
    if (!j(ta)) return;
    const ma = m.get(W.targetId) || W, Q = rn(t, ma);
    if (!Q.length) return;
    const oa = Wa(W), ia = ut(W), p = W.motion || {};
    W.repeatIndefinite && (r == null || r({ effect: W, reason: "Indefinite repeat is not simulated; playing once" })), (H = p.unresolved) != null && H.length && (r == null || r({ effect: W, reason: `Unresolved motion coordinate: ${p.unresolved.join(", ")}` }));
    const G = (aa, V, sa) => {
      const la = aa.animate(V, sa);
      return g.add(la), la;
    }, R = (aa) => {
      for (const V of aa)
        g.delete(V), V.cancel();
    }, b = At(W);
    if (b) {
      r == null || r({ effect: W, reason: b }), W.presetClass === "entr" && E(Q, !0), W.presetClass === "exit" && E(Q, !1);
      return;
    }
    const L = $n(W);
    if (L && W.presetClass !== "entr" && W.presetClass !== "exit") {
      await z(Q, L, { duration: oa, iterations: ia, token: ta });
      return;
    }
    if (W.presetClass === "path" && pt(W)) {
      const aa = pt(W), V = 24, sa = [];
      for (let ra = 0; ra <= V; ra += 1) {
        const ya = ra / V, $a = Rs(W, Ls(ya, aa.accel, aa.decel));
        sa.push({ translate: U($a.x, $a.y), offset: ya });
      }
      const la = Q.map((ra) => G(ra, sa, { duration: oa, iterations: ia, easing: "linear", fill: "forwards" }));
      if (!await N(la, ta) || !j(ta)) return;
      R(la);
      return;
    }
    const M = W.presetClass === "entr", B = W.filter || "", O = B.includes("fade");
    if (E(Q, !0), oa <= 10 || M && W.presetId === "1") {
      E(Q, M), P(Q, null);
      return;
    }
    if (As(B)) {
      if (await F(Q, W, { duration: oa, iterations: ia, token: ta }), !j(ta)) return;
      E(Q, M), P(Q, null);
      return;
    }
    if (zt(W) && mn(Q).length > 1) {
      const aa = mn(Q);
      E(Q, !0);
      for (const V of aa) V.style.opacity = "0";
      if (await J(aa, W, { iterations: ia, token: ta }), !j(ta)) return;
      E(Q, M);
      return;
    }
    const D = Q.map((aa) => {
      const V = getComputedStyle(aa).opacity, sa = Zt(B, M ? 0 : 1, M) ?? "none", la = Zt(B, M ? 1 : 0, M) ?? "none", ra = M ? [
        { opacity: O ? 0 : V, translate: U(p.fromX, p.fromY), clipPath: sa },
        { opacity: V, translate: U(p.toX, p.toY), clipPath: la }
      ] : [
        { opacity: V, translate: U(p.fromX, p.fromY), clipPath: sa },
        { opacity: O ? 0 : V, translate: U(p.toX, p.toY), clipPath: la }
      ];
      return G(aa, ra, {
        duration: oa,
        iterations: ia,
        easing: M ? "ease-out" : "ease-in",
        fill: "forwards"
      });
    });
    await N(D, ta) && j(ta) && (R(D), E(Q, M));
  }
  async function Y() {
    if (f) throw new Error("slide player already disposed");
    if (x || o >= d) return !1;
    const W = ++y;
    x = !0, A();
    const ta = c[o] || [], ma = async ({ effect: Q, start: oa }) => {
      oa > 0 && await $(oa), j(W) && await K(Q, W);
    };
    try {
      return await Promise.all(Ht(ta).map(ma)), j(W) ? (o += 1, C(o, {
        ignoreExits: u,
        ignorePaths: h
      }), A(), !0) : !1;
    } catch (Q) {
      if (j(W))
        throw y += 1, k(), S(), x = !1, A(), Q;
      return !1;
    } finally {
      j(W) && (x = !1, A());
    }
  }
  function fa() {
    I(d, { ignoreExits: !0, ignorePaths: !0 });
  }
  function da() {
    f || (q(), f = !0);
  }
  return {
    get stepCount() {
      return d;
    },
    get currentStep() {
      return o;
    },
    get busy() {
      return x;
    },
    playStep: Y,
    seekStep: I,
    sampleAt: w,
    showStatic: fa,
    cancel: q,
    dispose: da
  };
}
const Im = 2;
function Km() {
  return { open: Dm };
}
async function Dm(a, t = {}) {
  var o, x, f;
  const e = t.signal;
  if (e != null && e.aborted) throw Ct(e);
  const n = await ls(Om(a), {
    // 惰性解析：只建索引，页在 renderSlide 时才解析并缓存（并发去重）
    lazy: !0
  });
  if (e != null && e.aborted) throw Ct(e);
  const s = Math.max(0, Math.floor(n.slideCount ?? ((o = n.slides) == null ? void 0 : o.length) ?? 0)), l = ((x = n.size) == null ? void 0 : x.width) ?? 0, r = ((f = n.size) == null ? void 0 : f.height) ?? 0;
  if (s <= 0) throw new Error("PPTX 中没有幻灯片");
  if (!(l > 0) || !(r > 0)) throw new Error("PPTX 未声明页面尺寸");
  let m = !1;
  const c = /* @__PURE__ */ new Map();
  let i = null;
  const d = t.media === !1 || typeof document > "u" ? null : Rm(n, {
    onFrame: () => {
      i && i();
    },
    // R102：帧内控件。`never` = 一个像素都不画（宿主自己叠控件 / 要干净的导出图）
    controls: t.mediaControls === "always" || t.mediaControls === "never" ? t.mediaControls : "auto"
  });
  return {
    slideCount: s,
    slideWidth: l,
    slideHeight: r,
    /**
     * 资源账目（R9.2「可观测账目放在实例上」）——透传引擎的 `resourceStats()`。
     *
     * 为什么薄适配层也要暴露：白板唯一能碰到的对象就是这个返回值，不暴露的话
     * 「换文档 / 关窗口之后 part 缓存到底有没有放掉」只能靠猜。它是 **只读诊断口**，
     * 不改变任何渲染语义；引擎没有该能力时返回 null（不抛错，诊断不该拖垮主流程）。
     */
    resourceStats() {
      var y;
      return ((y = n.resourceStats) == null ? void 0 : y.call(n)) ?? null;
    },
    /**
     * R94：媒体（视频 / 音频）。老契约没有这个字段，宿主判空即可（向后兼容）。
     *
     * 形状与白板 `PlaybackCapability` 对齐：`isPlaying()` ↔ `state().playing`、
     * `setPlaying(b)` ↔ `play()/pause()`。
     */
    media: d && {
      list: (y) => d.list(y),
      play: (y = null) => d.play(y),
      pause: (y = null) => d.pause(y),
      seek: (y, u) => d.seek(y, u),
      setMuted: (y) => d.setMuted(y),
      state: (y = null) => d.state(y),
      /**
       * R102：帧内控件的指针入口（可选）。宿主把点击/移动的 **slide 逻辑坐标** 转进来，
       * 返回 true = 被控件消费，宿主就别再把它当窗口手势或动画点击处理。
       * 不转也行 —— 控件照常显示，只是不能点（远端观看 / 纯展示场景）。
       */
      hitTest: (y) => d.hitTest(y),
      pointer: (y) => d.pointer(y),
      /**
       * R103：元素句柄与音频出口（可选）。宿主拿它们把 PPT 的声音接进自己的上行：
       *   · `elements()` —— 当前页活着的 `<video>` / `<audio>`（延迟建，配合 `onElements`）
       *   · `onElements(cb)` —— 元素集合变化（延迟加载 / 翻页 / 销毁）时回调，销毁时给 `[]`
       *   · `createAudioTrack({ audioContext })` —— 页内素材**汇总成一条轨**（一个窗口一个
       *     上行实例，翻页不换轨 ⇒ 不 renegotiation）
       */
      elements: () => d.elements(),
      onElements: (y) => d.onElements(y),
      createAudioTrack: (y) => d.createAudioTrack(y),
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
      async pageInfo(y) {
        if (!Number.isInteger(y) || y < 0 || y >= s)
          throw new RangeError(`slide ${y} 越界：共 ${s} 页`);
        const u = await n.getSlide(y);
        return d.pageInfo(y, Array.isArray(u == null ? void 0 : u.media) ? u.media : []);
      }
    },
    /**
     * R94：引擎有新视频帧 ⇒ 请宿主重画当前页（返回退订函数）。
     *
     * 宿主接到后只要调一次「按当前页 + 当前比例再请求一次呈现」即可——
     * 白板的 `PaintLoop` 本来就会合并请求、只提交最新那份，30fps 照样稳。
     */
    onFrame(y) {
      return typeof y != "function" ? () => {
      } : (i = y, () => {
        i === y && (i = null);
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
    async slideAnimation(y) {
      if (m) throw new Error("ppt document already disposed");
      if (!Number.isInteger(y) || y < 0 || y >= s)
        throw new RangeError(`slide ${y} 越界：共 ${s} 页`);
      const u = await n.getSlide(y), h = u == null ? void 0 : u.animation;
      return {
        stepCount: (Array.isArray(h == null ? void 0 : h.steps) ? h.steps : []).length,
        initialHidden: Array.isArray(h == null ? void 0 : h.initialHidden) ? h.initialHidden : [],
        targets: Array.isArray(h == null ? void 0 : h.targets) ? h.targets : [],
        steps: wm(h)
      };
    },
    async renderSlide(y, u = {}) {
      if (m) throw new Error("ppt document already disposed");
      if (!Number.isInteger(y) || y < 0 || y >= s)
        throw new RangeError(`slide ${y} 越界：共 ${s} 页`);
      const { scale: h = 1, signal: g, animationStep: v, animationTimeMs: A } = u;
      if (g != null && g.aborted) throw Ct(g);
      const j = await n.getSlide(y);
      if (m) throw new Error("ppt document already disposed");
      const $ = Array.isArray(j.media) ? j.media : [], k = v != null, S = A != null, E = Number(A);
      if (S && (!Number.isFinite(E) || E < 0))
        throw new TypeError(`animationTimeMs 需要非负有限毫秒数，收到 ${String(A)}`);
      const X = d && $.length && !k ? d.plateFor(y, h) : null, _ = () => ps(j, n.defs), C = k ? Tm(c, y, h, j, v, S ? E : null, _, l, r) : X ? null : _();
      if (g != null && g.aborted) throw Ct(g);
      const w = d && $.length ? (q, T) => d.paintInto(q, { slideIndex: y, media: $, animated: k, ...T }) : void 0;
      return yl(C, {
        width: l,
        height: r,
        scale: h,
        ...X ? { plate: X } : {},
        ...w ? { decorate: w } : {},
        ...g ? { signal: g } : {}
      });
    },
    dispose() {
      var y;
      m || (m = !0, i = null, d == null || d.dispose(), Pm(c), (y = n.dispose) == null || y.call(n));
    }
  };
}
function Tm(a, t, e, n, s, l, r, m, c) {
  const i = n == null ? void 0 : n.animation;
  if (!i || !Array.isArray(i.steps) || !i.steps.length)
    return r();
  const d = Bm(a, t, e, n, i, r, m, c);
  if (!d) return r();
  const o = Math.max(0, Math.min(Math.floor(Number(s) || 0), d.player.stepCount));
  return d.player.seekStep(o), l !== null && d.player.sampleAt(l), d.root.outerHTML;
}
function Bm(a, t, e, n, s, l, r, m) {
  var f;
  const c = `${t}:${e}`, i = a.get(c);
  if (i) return i;
  const d = document.createElement("div");
  d.innerHTML = l();
  const o = d.firstElementChild;
  if (!o) return null;
  const x = {
    key: c,
    root: o,
    player: Em({
      root: o,
      animation: s,
      width: (n == null ? void 0 : n.width) ?? r,
      height: (n == null ? void 0 : n.height) ?? m
    })
  };
  for (a.set(c, x); a.size > Im; ) {
    const y = a.keys().next().value;
    (f = a.get(y)) == null || f.player.dispose(), a.delete(y);
  }
  return x;
}
function Pm(a) {
  for (const t of a.values()) t.player.dispose();
  a.clear();
}
function Om(a) {
  if (typeof Blob < "u" && a instanceof Blob) return a;
  if (a instanceof Uint8Array) return { arrayBuffer: async () => a };
  if (typeof ArrayBuffer < "u" && a instanceof ArrayBuffer) {
    const t = new Uint8Array(a);
    return { arrayBuffer: async () => t };
  }
  throw new TypeError("createPptRenderer().open 需要 Blob / File / ArrayBuffer / Uint8Array");
}
function Ct(a) {
  return (a == null ? void 0 : a.reason) instanceof Error ? a.reason : new DOMException("The operation was aborted", "AbortError");
}
export {
  An as PROTOCOL_VERSION,
  Pa as RANDOM_BAR_COUNT,
  Ls as accelDecelProgress,
  Zt as clipForFilter,
  pl as configureAssets,
  Ir as configureMeasureContext,
  r0 as configurePdfJs,
  wl as configureXmlParser,
  Fr as configureYield,
  Ee as createAssetResolver,
  Rm as createMediaRuntime,
  Km as createPptRenderer,
  Em as createSlidePlayer,
  Ym as createWorkerClient,
  Vm as createWorkerHost,
  qm as currentFrameRevision,
  zm as defaultAssetResolver,
  Qm as describeUnsupportedEffects,
  Ja as effectTotalMs,
  Zm as getDefaultAssetResolver,
  Um as getSimHeiFallbackFonts,
  zt as hasIterate,
  As as isRandomBar,
  Gt as iterateIntervalMs,
  ym as iterateUnitProgress,
  bs as maskForFilter,
  Nm as mediaCapabilities,
  pt as motionPathOf,
  ls as parsePptx,
  Rs as pathPointAt,
  $e as pdfJsSource,
  je as pdfJsWorkerSrc,
  yl as prepareFrame,
  ps as renderSlideSvg,
  Gm as resetMeasureContext,
  Hm as resetXmlParser,
  Wm as resetYield,
  pe as sampleSlideAnimation,
  Xm as setProgressHandler,
  Ht as stepTimeline
};
