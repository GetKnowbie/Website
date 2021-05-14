var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/parser/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/parser/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.deprecate = exports.isObjectLike = exports.isDate = exports.isBuffer = exports.haveBuffer = exports.isBigUInt64Array = exports.isBigInt64Array = exports.isUint8Array = exports.randomBytes = exports.normalizedFunctionString = void 0;
    var buffer_1 = require("buffer");
    function normalizedFunctionString(fn) {
      return fn.toString().replace("function(", "function (");
    }
    exports.normalizedFunctionString = normalizedFunctionString;
    var isReactNative = typeof global.navigator === "object" && global.navigator.product === "ReactNative";
    var insecureWarning = isReactNative ? "BSON: For React Native please polyfill crypto.getRandomValues, e.g. using: https://www.npmjs.com/package/react-native-get-random-values." : "BSON: No cryptographic implementation for random bytes present, falling back to a less secure implementation.";
    var insecureRandomBytes = function insecureRandomBytes2(size) {
      console.warn(insecureWarning);
      var result = buffer_1.Buffer.alloc(size);
      for (var i = 0; i < size; ++i)
        result[i] = Math.floor(Math.random() * 256);
      return result;
    };
    var detectRandomBytes = function() {
      if (typeof window !== "undefined") {
        var target_1 = window.crypto || window.msCrypto;
        if (target_1 && target_1.getRandomValues) {
          return function(size) {
            return target_1.getRandomValues(buffer_1.Buffer.alloc(size));
          };
        }
      }
      if (typeof global !== "undefined" && global.crypto && global.crypto.getRandomValues) {
        return function(size) {
          return global.crypto.getRandomValues(buffer_1.Buffer.alloc(size));
        };
      }
      var requiredRandomBytes;
      try {
        requiredRandomBytes = require("crypto").randomBytes;
      } catch (e) {
      }
      return requiredRandomBytes || insecureRandomBytes;
    };
    exports.randomBytes = detectRandomBytes();
    function isUint8Array(value) {
      return Object.prototype.toString.call(value) === "[object Uint8Array]";
    }
    exports.isUint8Array = isUint8Array;
    function isBigInt64Array(value) {
      return Object.prototype.toString.call(value) === "[object BigInt64Array]";
    }
    exports.isBigInt64Array = isBigInt64Array;
    function isBigUInt64Array(value) {
      return Object.prototype.toString.call(value) === "[object BigUint64Array]";
    }
    exports.isBigUInt64Array = isBigUInt64Array;
    function haveBuffer() {
      return typeof global !== "undefined" && typeof global.Buffer !== "undefined";
    }
    exports.haveBuffer = haveBuffer;
    function isBuffer(value) {
      var _a;
      return typeof value === "object" && ((_a = value === null || value === void 0 ? void 0 : value.constructor) === null || _a === void 0 ? void 0 : _a.name) === "Buffer";
    }
    exports.isBuffer = isBuffer;
    function isDate(d) {
      return isObjectLike(d) && Object.prototype.toString.call(d) === "[object Date]";
    }
    exports.isDate = isDate;
    function isObjectLike(candidate) {
      return typeof candidate === "object" && candidate !== null;
    }
    exports.isObjectLike = isObjectLike;
    function deprecate(fn, message) {
      if (typeof window === "undefined" && typeof self === "undefined") {
        return require("util").deprecate(fn, message);
      }
      var warned = false;
      function deprecated() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!warned) {
          console.warn(message);
          warned = true;
        }
        return fn.apply(this, args);
      }
      return deprecated;
    }
    exports.deprecate = deprecate;
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/ensure_buffer.js
var require_ensure_buffer = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/ensure_buffer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.ensureBuffer = void 0;
    var buffer_1 = require("buffer");
    var utils_1 = require_utils();
    function ensureBuffer(potentialBuffer) {
      if (utils_1.isBuffer(potentialBuffer)) {
        return potentialBuffer;
      }
      if (ArrayBuffer.isView(potentialBuffer)) {
        return buffer_1.Buffer.from(potentialBuffer.buffer);
      }
      if (potentialBuffer instanceof ArrayBuffer) {
        return buffer_1.Buffer.from(potentialBuffer);
      }
      throw new TypeError("Must use either Buffer or TypedArray");
    }
    exports.ensureBuffer = ensureBuffer;
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/uuid_utils.js
var require_uuid_utils = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/uuid_utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.bufferToUuidHexString = exports.uuidHexStringToBuffer = exports.uuidValidateString = void 0;
    var buffer_1 = require("buffer");
    var VALIDATION_REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|[0-9a-f]{12}4[0-9a-f]{3}[89ab][0-9a-f]{15})$/i;
    var uuidValidateString = function(str) {
      return typeof str === "string" && VALIDATION_REGEX.test(str);
    };
    exports.uuidValidateString = uuidValidateString;
    var uuidHexStringToBuffer = function(hexString) {
      if (!exports.uuidValidateString(hexString)) {
        throw new TypeError('UUID string representations must be a 32 or 36 character hex string (dashes excluded/included). Format: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" or "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".');
      }
      var sanitizedHexString = hexString.replace(/-/g, "");
      return buffer_1.Buffer.from(sanitizedHexString, "hex");
    };
    exports.uuidHexStringToBuffer = uuidHexStringToBuffer;
    var bufferToUuidHexString = function(buffer, includeDashes) {
      if (includeDashes === void 0) {
        includeDashes = true;
      }
      return includeDashes ? buffer.toString("hex", 0, 4) + "-" + buffer.toString("hex", 4, 6) + "-" + buffer.toString("hex", 6, 8) + "-" + buffer.toString("hex", 8, 10) + "-" + buffer.toString("hex", 10, 16) : buffer.toString("hex");
    };
    exports.bufferToUuidHexString = bufferToUuidHexString;
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/uuid.js
var require_uuid = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/uuid.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.UUID = void 0;
    var buffer_1 = require("buffer");
    var ensure_buffer_1 = require_ensure_buffer();
    var binary_1 = require_binary();
    var uuid_utils_1 = require_uuid_utils();
    var utils_1 = require_utils();
    var BYTE_LENGTH = 16;
    var kId = Symbol("id");
    var UUID = function() {
      function UUID2(input) {
        if (typeof input === "undefined") {
          this.id = UUID2.generate();
        } else if (input instanceof UUID2) {
          this[kId] = buffer_1.Buffer.from(input.id);
          this.__id = input.__id;
        } else if ((buffer_1.Buffer.isBuffer(input) || ArrayBuffer.isView(input)) && input.byteLength === BYTE_LENGTH) {
          this.id = ensure_buffer_1.ensureBuffer(input);
        } else if (typeof input === "string") {
          this.id = uuid_utils_1.uuidHexStringToBuffer(input);
        } else {
          throw new TypeError("Argument passed in UUID constructor must be a UUID, a 16 byte Buffer or a 32/36 character hex string (dashes excluded/included, format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).");
        }
      }
      Object.defineProperty(UUID2.prototype, "id", {
        get: function() {
          return this[kId];
        },
        set: function(value) {
          this[kId] = value;
          if (UUID2.cacheHexString) {
            this.__id = uuid_utils_1.bufferToUuidHexString(value);
          }
        },
        enumerable: false,
        configurable: true
      });
      UUID2.prototype.toHexString = function(includeDashes) {
        if (includeDashes === void 0) {
          includeDashes = true;
        }
        if (UUID2.cacheHexString && this.__id) {
          return this.__id;
        }
        var uuidHexString = uuid_utils_1.bufferToUuidHexString(this.id, includeDashes);
        if (UUID2.cacheHexString) {
          this.__id = uuidHexString;
        }
        return uuidHexString;
      };
      UUID2.prototype.toString = function(encoding) {
        return encoding ? this.id.toString(encoding) : this.toHexString();
      };
      UUID2.prototype.toJSON = function() {
        return this.toHexString();
      };
      UUID2.prototype.equals = function(otherId) {
        if (!otherId) {
          return false;
        }
        if (otherId instanceof UUID2) {
          return otherId.id.equals(this.id);
        }
        try {
          return new UUID2(otherId).id.equals(this.id);
        } catch (_a) {
          return false;
        }
      };
      UUID2.prototype.toBinary = function() {
        return new binary_1.Binary(this.id, binary_1.Binary.SUBTYPE_UUID);
      };
      UUID2.generate = function() {
        var bytes = utils_1.randomBytes(BYTE_LENGTH);
        bytes[6] = bytes[6] & 15 | 64;
        bytes[8] = bytes[8] & 63 | 128;
        return buffer_1.Buffer.from(bytes);
      };
      UUID2.isValid = function(input) {
        if (!input) {
          return false;
        }
        if (input instanceof UUID2) {
          return true;
        }
        if (typeof input === "string") {
          return uuid_utils_1.uuidValidateString(input);
        }
        if (buffer_1.Buffer.isBuffer(input)) {
          if (input.length !== BYTE_LENGTH) {
            return false;
          }
          try {
            return parseInt(input[6].toString(16)[0], 10) === binary_1.Binary.SUBTYPE_UUID;
          } catch (_a) {
            return false;
          }
        }
        return false;
      };
      UUID2.createFromHexString = function(hexString) {
        var buffer = uuid_utils_1.uuidHexStringToBuffer(hexString);
        return new UUID2(buffer);
      };
      UUID2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      UUID2.prototype.inspect = function() {
        return 'new UUID("' + this.toHexString() + '")';
      };
      return UUID2;
    }();
    exports.UUID = UUID;
    Object.defineProperty(UUID.prototype, "_bsontype", {value: "UUID"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/binary.js
var require_binary = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/binary.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Binary = void 0;
    var buffer_1 = require("buffer");
    var ensure_buffer_1 = require_ensure_buffer();
    var uuid_utils_1 = require_uuid_utils();
    var uuid_1 = require_uuid();
    var Binary = function() {
      function Binary2(buffer, subType) {
        if (!(this instanceof Binary2))
          return new Binary2(buffer, subType);
        if (!(buffer == null) && !(typeof buffer === "string") && !ArrayBuffer.isView(buffer) && !(buffer instanceof ArrayBuffer) && !Array.isArray(buffer)) {
          throw new TypeError("Binary can only be constructed from string, Buffer, TypedArray, or Array<number>");
        }
        this.sub_type = subType !== null && subType !== void 0 ? subType : Binary2.BSON_BINARY_SUBTYPE_DEFAULT;
        if (buffer == null) {
          this.buffer = buffer_1.Buffer.alloc(Binary2.BUFFER_SIZE);
          this.position = 0;
        } else {
          if (typeof buffer === "string") {
            this.buffer = buffer_1.Buffer.from(buffer, "binary");
          } else if (Array.isArray(buffer)) {
            this.buffer = buffer_1.Buffer.from(buffer);
          } else {
            this.buffer = ensure_buffer_1.ensureBuffer(buffer);
          }
          this.position = this.buffer.byteLength;
        }
      }
      Binary2.prototype.put = function(byteValue) {
        if (typeof byteValue === "string" && byteValue.length !== 1) {
          throw new TypeError("only accepts single character String");
        } else if (typeof byteValue !== "number" && byteValue.length !== 1)
          throw new TypeError("only accepts single character Uint8Array or Array");
        var decodedByte;
        if (typeof byteValue === "string") {
          decodedByte = byteValue.charCodeAt(0);
        } else if (typeof byteValue === "number") {
          decodedByte = byteValue;
        } else {
          decodedByte = byteValue[0];
        }
        if (decodedByte < 0 || decodedByte > 255) {
          throw new TypeError("only accepts number in a valid unsigned byte range 0-255");
        }
        if (this.buffer.length > this.position) {
          this.buffer[this.position++] = decodedByte;
        } else {
          var buffer = buffer_1.Buffer.alloc(Binary2.BUFFER_SIZE + this.buffer.length);
          this.buffer.copy(buffer, 0, 0, this.buffer.length);
          this.buffer = buffer;
          this.buffer[this.position++] = decodedByte;
        }
      };
      Binary2.prototype.write = function(sequence, offset) {
        offset = typeof offset === "number" ? offset : this.position;
        if (this.buffer.length < offset + sequence.length) {
          var buffer = buffer_1.Buffer.alloc(this.buffer.length + sequence.length);
          this.buffer.copy(buffer, 0, 0, this.buffer.length);
          this.buffer = buffer;
        }
        if (ArrayBuffer.isView(sequence)) {
          this.buffer.set(ensure_buffer_1.ensureBuffer(sequence), offset);
          this.position = offset + sequence.byteLength > this.position ? offset + sequence.length : this.position;
        } else if (typeof sequence === "string") {
          this.buffer.write(sequence, offset, sequence.length, "binary");
          this.position = offset + sequence.length > this.position ? offset + sequence.length : this.position;
        }
      };
      Binary2.prototype.read = function(position, length) {
        length = length && length > 0 ? length : this.position;
        return this.buffer.slice(position, position + length);
      };
      Binary2.prototype.value = function(asRaw) {
        asRaw = !!asRaw;
        if (asRaw && this.buffer.length === this.position) {
          return this.buffer;
        }
        if (asRaw) {
          return this.buffer.slice(0, this.position);
        }
        return this.buffer.toString("binary", 0, this.position);
      };
      Binary2.prototype.length = function() {
        return this.position;
      };
      Binary2.prototype.toJSON = function() {
        return this.buffer.toString("base64");
      };
      Binary2.prototype.toString = function(format2) {
        return this.buffer.toString(format2);
      };
      Binary2.prototype.toExtendedJSON = function(options2) {
        options2 = options2 || {};
        var base64String = this.buffer.toString("base64");
        var subType = Number(this.sub_type).toString(16);
        if (options2.legacy) {
          return {
            $binary: base64String,
            $type: subType.length === 1 ? "0" + subType : subType
          };
        }
        return {
          $binary: {
            base64: base64String,
            subType: subType.length === 1 ? "0" + subType : subType
          }
        };
      };
      Binary2.prototype.toUUID = function() {
        if (this.sub_type === Binary2.SUBTYPE_UUID) {
          return new uuid_1.UUID(this.buffer.slice(0, this.position));
        }
        throw new Error('Binary sub_type "' + this.sub_type + '" is not supported for converting to UUID. Only "' + Binary2.SUBTYPE_UUID + '" is currently supported.');
      };
      Binary2.fromExtendedJSON = function(doc, options2) {
        options2 = options2 || {};
        var data;
        var type;
        if ("$binary" in doc) {
          if (options2.legacy && typeof doc.$binary === "string" && "$type" in doc) {
            type = doc.$type ? parseInt(doc.$type, 16) : 0;
            data = buffer_1.Buffer.from(doc.$binary, "base64");
          } else {
            if (typeof doc.$binary !== "string") {
              type = doc.$binary.subType ? parseInt(doc.$binary.subType, 16) : 0;
              data = buffer_1.Buffer.from(doc.$binary.base64, "base64");
            }
          }
        } else if ("$uuid" in doc) {
          type = 4;
          data = uuid_utils_1.uuidHexStringToBuffer(doc.$uuid);
        }
        if (!data) {
          throw new TypeError("Unexpected Binary Extended JSON format " + JSON.stringify(doc));
        }
        return new Binary2(data, type);
      };
      Binary2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      Binary2.prototype.inspect = function() {
        var asBuffer = this.value(true);
        return 'new Binary(Buffer.from("' + asBuffer.toString("hex") + '", "hex"), ' + this.sub_type + ")";
      };
      Binary2.BSON_BINARY_SUBTYPE_DEFAULT = 0;
      Binary2.BUFFER_SIZE = 256;
      Binary2.SUBTYPE_DEFAULT = 0;
      Binary2.SUBTYPE_FUNCTION = 1;
      Binary2.SUBTYPE_BYTE_ARRAY = 2;
      Binary2.SUBTYPE_UUID_OLD = 3;
      Binary2.SUBTYPE_UUID = 4;
      Binary2.SUBTYPE_MD5 = 5;
      Binary2.SUBTYPE_USER_DEFINED = 128;
      return Binary2;
    }();
    exports.Binary = Binary;
    Object.defineProperty(Binary.prototype, "_bsontype", {value: "Binary"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/code.js
var require_code = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Code = void 0;
    var Code = function() {
      function Code2(code, scope) {
        if (!(this instanceof Code2))
          return new Code2(code, scope);
        this.code = code;
        this.scope = scope;
      }
      Code2.prototype.toJSON = function() {
        return {code: this.code, scope: this.scope};
      };
      Code2.prototype.toExtendedJSON = function() {
        if (this.scope) {
          return {$code: this.code, $scope: this.scope};
        }
        return {$code: this.code};
      };
      Code2.fromExtendedJSON = function(doc) {
        return new Code2(doc.$code, doc.$scope);
      };
      Code2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      Code2.prototype.inspect = function() {
        var codeJson = this.toJSON();
        return 'new Code("' + codeJson.code + '"' + (codeJson.scope ? ", " + JSON.stringify(codeJson.scope) : "") + ")";
      };
      return Code2;
    }();
    exports.Code = Code;
    Object.defineProperty(Code.prototype, "_bsontype", {value: "Code"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/db_ref.js
var require_db_ref = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/db_ref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.DBRef = exports.isDBRefLike = void 0;
    var utils_1 = require_utils();
    function isDBRefLike(value) {
      return utils_1.isObjectLike(value) && value["$id"] != null && value["$ref"] != null;
    }
    exports.isDBRefLike = isDBRefLike;
    var DBRef = function() {
      function DBRef2(collection, oid, db, fields) {
        if (!(this instanceof DBRef2))
          return new DBRef2(collection, oid, db, fields);
        var parts = collection.split(".");
        if (parts.length === 2) {
          db = parts.shift();
          collection = parts.shift();
        }
        this.collection = collection;
        this.oid = oid;
        this.db = db;
        this.fields = fields || {};
      }
      Object.defineProperty(DBRef2.prototype, "namespace", {
        get: function() {
          return this.collection;
        },
        set: function(value) {
          this.collection = value;
        },
        enumerable: false,
        configurable: true
      });
      DBRef2.prototype.toJSON = function() {
        var o = Object.assign({
          $ref: this.collection,
          $id: this.oid
        }, this.fields);
        if (this.db != null)
          o.$db = this.db;
        return o;
      };
      DBRef2.prototype.toExtendedJSON = function(options2) {
        options2 = options2 || {};
        var o = {
          $ref: this.collection,
          $id: this.oid
        };
        if (options2.legacy) {
          return o;
        }
        if (this.db)
          o.$db = this.db;
        o = Object.assign(o, this.fields);
        return o;
      };
      DBRef2.fromExtendedJSON = function(doc) {
        var copy = Object.assign({}, doc);
        delete copy.$ref;
        delete copy.$id;
        delete copy.$db;
        return new DBRef2(doc.$ref, doc.$id, doc.$db, copy);
      };
      DBRef2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      DBRef2.prototype.inspect = function() {
        var oid = this.oid === void 0 || this.oid.toString === void 0 ? this.oid : this.oid.toString();
        return 'new DBRef("' + this.namespace + '", new ObjectId("' + oid + '")' + (this.db ? ', "' + this.db + '"' : "") + ")";
      };
      return DBRef2;
    }();
    exports.DBRef = DBRef;
    Object.defineProperty(DBRef.prototype, "_bsontype", {value: "DBRef"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/long.js
var require_long = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/long.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Long = void 0;
    var utils_1 = require_utils();
    var wasm = void 0;
    try {
      wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
    } catch (_a) {
    }
    var TWO_PWR_16_DBL = 1 << 16;
    var TWO_PWR_24_DBL = 1 << 24;
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
    var INT_CACHE = {};
    var UINT_CACHE = {};
    var Long = function() {
      function Long2(low, high, unsigned) {
        if (low === void 0) {
          low = 0;
        }
        if (high === void 0) {
          high = 0;
        }
        if (!(this instanceof Long2))
          return new Long2(low, high, unsigned);
        this.low = low | 0;
        this.high = high | 0;
        this.unsigned = !!unsigned;
        Object.defineProperty(this, "__isLong__", {
          value: true,
          configurable: false,
          writable: false,
          enumerable: false
        });
      }
      Long2.fromBits = function(lowBits, highBits, unsigned) {
        return new Long2(lowBits, highBits, unsigned);
      };
      Long2.fromInt = function(value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
          value >>>= 0;
          if (cache = 0 <= value && value < 256) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
              return cachedObj;
          }
          obj = Long2.fromBits(value, (value | 0) < 0 ? -1 : 0, true);
          if (cache)
            UINT_CACHE[value] = obj;
          return obj;
        } else {
          value |= 0;
          if (cache = -128 <= value && value < 128) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
              return cachedObj;
          }
          obj = Long2.fromBits(value, value < 0 ? -1 : 0, false);
          if (cache)
            INT_CACHE[value] = obj;
          return obj;
        }
      };
      Long2.fromNumber = function(value, unsigned) {
        if (isNaN(value))
          return unsigned ? Long2.UZERO : Long2.ZERO;
        if (unsigned) {
          if (value < 0)
            return Long2.UZERO;
          if (value >= TWO_PWR_64_DBL)
            return Long2.MAX_UNSIGNED_VALUE;
        } else {
          if (value <= -TWO_PWR_63_DBL)
            return Long2.MIN_VALUE;
          if (value + 1 >= TWO_PWR_63_DBL)
            return Long2.MAX_VALUE;
        }
        if (value < 0)
          return Long2.fromNumber(-value, unsigned).neg();
        return Long2.fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
      };
      Long2.fromBigInt = function(value, unsigned) {
        return Long2.fromString(value.toString(), unsigned);
      };
      Long2.fromString = function(str, unsigned, radix) {
        if (str.length === 0)
          throw Error("empty string");
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
          return Long2.ZERO;
        if (typeof unsigned === "number") {
          radix = unsigned, unsigned = false;
        } else {
          unsigned = !!unsigned;
        }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
          throw RangeError("radix");
        var p;
        if ((p = str.indexOf("-")) > 0)
          throw Error("interior hyphen");
        else if (p === 0) {
          return Long2.fromString(str.substring(1), unsigned, radix).neg();
        }
        var radixToPower = Long2.fromNumber(Math.pow(radix, 8));
        var result = Long2.ZERO;
        for (var i = 0; i < str.length; i += 8) {
          var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
          if (size < 8) {
            var power = Long2.fromNumber(Math.pow(radix, size));
            result = result.mul(power).add(Long2.fromNumber(value));
          } else {
            result = result.mul(radixToPower);
            result = result.add(Long2.fromNumber(value));
          }
        }
        result.unsigned = unsigned;
        return result;
      };
      Long2.fromBytes = function(bytes, unsigned, le) {
        return le ? Long2.fromBytesLE(bytes, unsigned) : Long2.fromBytesBE(bytes, unsigned);
      };
      Long2.fromBytesLE = function(bytes, unsigned) {
        return new Long2(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
      };
      Long2.fromBytesBE = function(bytes, unsigned) {
        return new Long2(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
      };
      Long2.isLong = function(value) {
        return utils_1.isObjectLike(value) && value["__isLong__"] === true;
      };
      Long2.fromValue = function(val, unsigned) {
        if (typeof val === "number")
          return Long2.fromNumber(val, unsigned);
        if (typeof val === "string")
          return Long2.fromString(val, unsigned);
        return Long2.fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
      };
      Long2.prototype.add = function(addend) {
        if (!Long2.isLong(addend))
          addend = Long2.fromValue(addend);
        var a48 = this.high >>> 16;
        var a32 = this.high & 65535;
        var a16 = this.low >>> 16;
        var a00 = this.low & 65535;
        var b48 = addend.high >>> 16;
        var b32 = addend.high & 65535;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 65535;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 65535;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c48 += a48 + b48;
        c48 &= 65535;
        return Long2.fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
      };
      Long2.prototype.and = function(other) {
        if (!Long2.isLong(other))
          other = Long2.fromValue(other);
        return Long2.fromBits(this.low & other.low, this.high & other.high, this.unsigned);
      };
      Long2.prototype.compare = function(other) {
        if (!Long2.isLong(other))
          other = Long2.fromValue(other);
        if (this.eq(other))
          return 0;
        var thisNeg = this.isNegative(), otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
          return -1;
        if (!thisNeg && otherNeg)
          return 1;
        if (!this.unsigned)
          return this.sub(other).isNegative() ? -1 : 1;
        return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
      };
      Long2.prototype.comp = function(other) {
        return this.compare(other);
      };
      Long2.prototype.divide = function(divisor) {
        if (!Long2.isLong(divisor))
          divisor = Long2.fromValue(divisor);
        if (divisor.isZero())
          throw Error("division by zero");
        if (wasm) {
          if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
            return this;
          }
          var low = (this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, divisor.low, divisor.high);
          return Long2.fromBits(low, wasm.get_high(), this.unsigned);
        }
        if (this.isZero())
          return this.unsigned ? Long2.UZERO : Long2.ZERO;
        var approx, rem, res;
        if (!this.unsigned) {
          if (this.eq(Long2.MIN_VALUE)) {
            if (divisor.eq(Long2.ONE) || divisor.eq(Long2.NEG_ONE))
              return Long2.MIN_VALUE;
            else if (divisor.eq(Long2.MIN_VALUE))
              return Long2.ONE;
            else {
              var halfThis = this.shr(1);
              approx = halfThis.div(divisor).shl(1);
              if (approx.eq(Long2.ZERO)) {
                return divisor.isNegative() ? Long2.ONE : Long2.NEG_ONE;
              } else {
                rem = this.sub(divisor.mul(approx));
                res = approx.add(rem.div(divisor));
                return res;
              }
            }
          } else if (divisor.eq(Long2.MIN_VALUE))
            return this.unsigned ? Long2.UZERO : Long2.ZERO;
          if (this.isNegative()) {
            if (divisor.isNegative())
              return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
          } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
          res = Long2.ZERO;
        } else {
          if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
          if (divisor.gt(this))
            return Long2.UZERO;
          if (divisor.gt(this.shru(1)))
            return Long2.UONE;
          res = Long2.UZERO;
        }
        rem = this;
        while (rem.gte(divisor)) {
          approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
          var log2 = Math.ceil(Math.log(approx) / Math.LN2);
          var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
          var approxRes = Long2.fromNumber(approx);
          var approxRem = approxRes.mul(divisor);
          while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = Long2.fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
          }
          if (approxRes.isZero())
            approxRes = Long2.ONE;
          res = res.add(approxRes);
          rem = rem.sub(approxRem);
        }
        return res;
      };
      Long2.prototype.div = function(divisor) {
        return this.divide(divisor);
      };
      Long2.prototype.equals = function(other) {
        if (!Long2.isLong(other))
          other = Long2.fromValue(other);
        if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
          return false;
        return this.high === other.high && this.low === other.low;
      };
      Long2.prototype.eq = function(other) {
        return this.equals(other);
      };
      Long2.prototype.getHighBits = function() {
        return this.high;
      };
      Long2.prototype.getHighBitsUnsigned = function() {
        return this.high >>> 0;
      };
      Long2.prototype.getLowBits = function() {
        return this.low;
      };
      Long2.prototype.getLowBitsUnsigned = function() {
        return this.low >>> 0;
      };
      Long2.prototype.getNumBitsAbs = function() {
        if (this.isNegative()) {
          return this.eq(Long2.MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        }
        var val = this.high !== 0 ? this.high : this.low;
        var bit;
        for (bit = 31; bit > 0; bit--)
          if ((val & 1 << bit) !== 0)
            break;
        return this.high !== 0 ? bit + 33 : bit + 1;
      };
      Long2.prototype.greaterThan = function(other) {
        return this.comp(other) > 0;
      };
      Long2.prototype.gt = function(other) {
        return this.greaterThan(other);
      };
      Long2.prototype.greaterThanOrEqual = function(other) {
        return this.comp(other) >= 0;
      };
      Long2.prototype.gte = function(other) {
        return this.greaterThanOrEqual(other);
      };
      Long2.prototype.ge = function(other) {
        return this.greaterThanOrEqual(other);
      };
      Long2.prototype.isEven = function() {
        return (this.low & 1) === 0;
      };
      Long2.prototype.isNegative = function() {
        return !this.unsigned && this.high < 0;
      };
      Long2.prototype.isOdd = function() {
        return (this.low & 1) === 1;
      };
      Long2.prototype.isPositive = function() {
        return this.unsigned || this.high >= 0;
      };
      Long2.prototype.isZero = function() {
        return this.high === 0 && this.low === 0;
      };
      Long2.prototype.lessThan = function(other) {
        return this.comp(other) < 0;
      };
      Long2.prototype.lt = function(other) {
        return this.lessThan(other);
      };
      Long2.prototype.lessThanOrEqual = function(other) {
        return this.comp(other) <= 0;
      };
      Long2.prototype.lte = function(other) {
        return this.lessThanOrEqual(other);
      };
      Long2.prototype.modulo = function(divisor) {
        if (!Long2.isLong(divisor))
          divisor = Long2.fromValue(divisor);
        if (wasm) {
          var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, divisor.low, divisor.high);
          return Long2.fromBits(low, wasm.get_high(), this.unsigned);
        }
        return this.sub(this.div(divisor).mul(divisor));
      };
      Long2.prototype.mod = function(divisor) {
        return this.modulo(divisor);
      };
      Long2.prototype.rem = function(divisor) {
        return this.modulo(divisor);
      };
      Long2.prototype.multiply = function(multiplier) {
        if (this.isZero())
          return Long2.ZERO;
        if (!Long2.isLong(multiplier))
          multiplier = Long2.fromValue(multiplier);
        if (wasm) {
          var low = wasm.mul(this.low, this.high, multiplier.low, multiplier.high);
          return Long2.fromBits(low, wasm.get_high(), this.unsigned);
        }
        if (multiplier.isZero())
          return Long2.ZERO;
        if (this.eq(Long2.MIN_VALUE))
          return multiplier.isOdd() ? Long2.MIN_VALUE : Long2.ZERO;
        if (multiplier.eq(Long2.MIN_VALUE))
          return this.isOdd() ? Long2.MIN_VALUE : Long2.ZERO;
        if (this.isNegative()) {
          if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
          else
            return this.neg().mul(multiplier).neg();
        } else if (multiplier.isNegative())
          return this.mul(multiplier.neg()).neg();
        if (this.lt(Long2.TWO_PWR_24) && multiplier.lt(Long2.TWO_PWR_24))
          return Long2.fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
        var a48 = this.high >>> 16;
        var a32 = this.high & 65535;
        var a16 = this.low >>> 16;
        var a00 = this.low & 65535;
        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 65535;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 65535;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 65535;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 65535;
        return Long2.fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
      };
      Long2.prototype.mul = function(multiplier) {
        return this.multiply(multiplier);
      };
      Long2.prototype.negate = function() {
        if (!this.unsigned && this.eq(Long2.MIN_VALUE))
          return Long2.MIN_VALUE;
        return this.not().add(Long2.ONE);
      };
      Long2.prototype.neg = function() {
        return this.negate();
      };
      Long2.prototype.not = function() {
        return Long2.fromBits(~this.low, ~this.high, this.unsigned);
      };
      Long2.prototype.notEquals = function(other) {
        return !this.equals(other);
      };
      Long2.prototype.neq = function(other) {
        return this.notEquals(other);
      };
      Long2.prototype.ne = function(other) {
        return this.notEquals(other);
      };
      Long2.prototype.or = function(other) {
        if (!Long2.isLong(other))
          other = Long2.fromValue(other);
        return Long2.fromBits(this.low | other.low, this.high | other.high, this.unsigned);
      };
      Long2.prototype.shiftLeft = function(numBits) {
        if (Long2.isLong(numBits))
          numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
          return this;
        else if (numBits < 32)
          return Long2.fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
        else
          return Long2.fromBits(0, this.low << numBits - 32, this.unsigned);
      };
      Long2.prototype.shl = function(numBits) {
        return this.shiftLeft(numBits);
      };
      Long2.prototype.shiftRight = function(numBits) {
        if (Long2.isLong(numBits))
          numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
          return this;
        else if (numBits < 32)
          return Long2.fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
        else
          return Long2.fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
      };
      Long2.prototype.shr = function(numBits) {
        return this.shiftRight(numBits);
      };
      Long2.prototype.shiftRightUnsigned = function(numBits) {
        if (Long2.isLong(numBits))
          numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
          return this;
        else {
          var high = this.high;
          if (numBits < 32) {
            var low = this.low;
            return Long2.fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
          } else if (numBits === 32)
            return Long2.fromBits(high, 0, this.unsigned);
          else
            return Long2.fromBits(high >>> numBits - 32, 0, this.unsigned);
        }
      };
      Long2.prototype.shr_u = function(numBits) {
        return this.shiftRightUnsigned(numBits);
      };
      Long2.prototype.shru = function(numBits) {
        return this.shiftRightUnsigned(numBits);
      };
      Long2.prototype.subtract = function(subtrahend) {
        if (!Long2.isLong(subtrahend))
          subtrahend = Long2.fromValue(subtrahend);
        return this.add(subtrahend.neg());
      };
      Long2.prototype.sub = function(subtrahend) {
        return this.subtract(subtrahend);
      };
      Long2.prototype.toInt = function() {
        return this.unsigned ? this.low >>> 0 : this.low;
      };
      Long2.prototype.toNumber = function() {
        if (this.unsigned)
          return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
      };
      Long2.prototype.toBigInt = function() {
        return BigInt(this.toString());
      };
      Long2.prototype.toBytes = function(le) {
        return le ? this.toBytesLE() : this.toBytesBE();
      };
      Long2.prototype.toBytesLE = function() {
        var hi = this.high, lo = this.low;
        return [
          lo & 255,
          lo >>> 8 & 255,
          lo >>> 16 & 255,
          lo >>> 24,
          hi & 255,
          hi >>> 8 & 255,
          hi >>> 16 & 255,
          hi >>> 24
        ];
      };
      Long2.prototype.toBytesBE = function() {
        var hi = this.high, lo = this.low;
        return [
          hi >>> 24,
          hi >>> 16 & 255,
          hi >>> 8 & 255,
          hi & 255,
          lo >>> 24,
          lo >>> 16 & 255,
          lo >>> 8 & 255,
          lo & 255
        ];
      };
      Long2.prototype.toSigned = function() {
        if (!this.unsigned)
          return this;
        return Long2.fromBits(this.low, this.high, false);
      };
      Long2.prototype.toString = function(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
          throw RangeError("radix");
        if (this.isZero())
          return "0";
        if (this.isNegative()) {
          if (this.eq(Long2.MIN_VALUE)) {
            var radixLong = Long2.fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
          } else
            return "-" + this.neg().toString(radix);
        }
        var radixToPower = Long2.fromNumber(Math.pow(radix, 6), this.unsigned);
        var rem = this;
        var result = "";
        while (true) {
          var remDiv = rem.div(radixToPower);
          var intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0;
          var digits = intval.toString(radix);
          rem = remDiv;
          if (rem.isZero()) {
            return digits + result;
          } else {
            while (digits.length < 6)
              digits = "0" + digits;
            result = "" + digits + result;
          }
        }
      };
      Long2.prototype.toUnsigned = function() {
        if (this.unsigned)
          return this;
        return Long2.fromBits(this.low, this.high, true);
      };
      Long2.prototype.xor = function(other) {
        if (!Long2.isLong(other))
          other = Long2.fromValue(other);
        return Long2.fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
      };
      Long2.prototype.eqz = function() {
        return this.isZero();
      };
      Long2.prototype.le = function(other) {
        return this.lessThanOrEqual(other);
      };
      Long2.prototype.toExtendedJSON = function(options2) {
        if (options2 && options2.relaxed)
          return this.toNumber();
        return {$numberLong: this.toString()};
      };
      Long2.fromExtendedJSON = function(doc, options2) {
        var result = Long2.fromString(doc.$numberLong);
        return options2 && options2.relaxed ? result.toNumber() : result;
      };
      Long2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      Long2.prototype.inspect = function() {
        return 'new Long("' + this.toString() + '")';
      };
      Long2.TWO_PWR_24 = Long2.fromInt(TWO_PWR_24_DBL);
      Long2.MAX_UNSIGNED_VALUE = Long2.fromBits(4294967295 | 0, 4294967295 | 0, true);
      Long2.ZERO = Long2.fromInt(0);
      Long2.UZERO = Long2.fromInt(0, true);
      Long2.ONE = Long2.fromInt(1);
      Long2.UONE = Long2.fromInt(1, true);
      Long2.NEG_ONE = Long2.fromInt(-1);
      Long2.MAX_VALUE = Long2.fromBits(4294967295 | 0, 2147483647 | 0, false);
      Long2.MIN_VALUE = Long2.fromBits(0, 2147483648 | 0, false);
      return Long2;
    }();
    exports.Long = Long;
    Object.defineProperty(Long.prototype, "__isLong__", {value: true});
    Object.defineProperty(Long.prototype, "_bsontype", {value: "Long"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/decimal128.js
var require_decimal128 = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/decimal128.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Decimal128 = void 0;
    var buffer_1 = require("buffer");
    var long_1 = require_long();
    var PARSE_STRING_REGEXP = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/;
    var PARSE_INF_REGEXP = /^(\+|-)?(Infinity|inf)$/i;
    var PARSE_NAN_REGEXP = /^(\+|-)?NaN$/i;
    var EXPONENT_MAX = 6111;
    var EXPONENT_MIN = -6176;
    var EXPONENT_BIAS = 6176;
    var MAX_DIGITS = 34;
    var NAN_BUFFER = [
      124,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ].reverse();
    var INF_NEGATIVE_BUFFER = [
      248,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ].reverse();
    var INF_POSITIVE_BUFFER = [
      120,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ].reverse();
    var EXPONENT_REGEX = /^([-+])?(\d+)?$/;
    var COMBINATION_MASK = 31;
    var EXPONENT_MASK = 16383;
    var COMBINATION_INFINITY = 30;
    var COMBINATION_NAN = 31;
    function isDigit(value) {
      return !isNaN(parseInt(value, 10));
    }
    function divideu128(value) {
      var DIVISOR = long_1.Long.fromNumber(1e3 * 1e3 * 1e3);
      var _rem = long_1.Long.fromNumber(0);
      if (!value.parts[0] && !value.parts[1] && !value.parts[2] && !value.parts[3]) {
        return {quotient: value, rem: _rem};
      }
      for (var i = 0; i <= 3; i++) {
        _rem = _rem.shiftLeft(32);
        _rem = _rem.add(new long_1.Long(value.parts[i], 0));
        value.parts[i] = _rem.div(DIVISOR).low;
        _rem = _rem.modulo(DIVISOR);
      }
      return {quotient: value, rem: _rem};
    }
    function multiply64x2(left, right) {
      if (!left && !right) {
        return {high: long_1.Long.fromNumber(0), low: long_1.Long.fromNumber(0)};
      }
      var leftHigh = left.shiftRightUnsigned(32);
      var leftLow = new long_1.Long(left.getLowBits(), 0);
      var rightHigh = right.shiftRightUnsigned(32);
      var rightLow = new long_1.Long(right.getLowBits(), 0);
      var productHigh = leftHigh.multiply(rightHigh);
      var productMid = leftHigh.multiply(rightLow);
      var productMid2 = leftLow.multiply(rightHigh);
      var productLow = leftLow.multiply(rightLow);
      productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
      productMid = new long_1.Long(productMid.getLowBits(), 0).add(productMid2).add(productLow.shiftRightUnsigned(32));
      productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
      productLow = productMid.shiftLeft(32).add(new long_1.Long(productLow.getLowBits(), 0));
      return {high: productHigh, low: productLow};
    }
    function lessThan(left, right) {
      var uhleft = left.high >>> 0;
      var uhright = right.high >>> 0;
      if (uhleft < uhright) {
        return true;
      } else if (uhleft === uhright) {
        var ulleft = left.low >>> 0;
        var ulright = right.low >>> 0;
        if (ulleft < ulright)
          return true;
      }
      return false;
    }
    function invalidErr(string, message) {
      throw new TypeError('"' + string + '" is not a valid Decimal128 string - ' + message);
    }
    var Decimal128 = function() {
      function Decimal1282(bytes) {
        if (!(this instanceof Decimal1282))
          return new Decimal1282(bytes);
        this.bytes = bytes;
      }
      Decimal1282.fromString = function(representation) {
        var isNegative = false;
        var sawRadix = false;
        var foundNonZero = false;
        var significantDigits = 0;
        var nDigitsRead = 0;
        var nDigits = 0;
        var radixPosition = 0;
        var firstNonZero = 0;
        var digits = [0];
        var nDigitsStored = 0;
        var digitsInsert = 0;
        var firstDigit = 0;
        var lastDigit = 0;
        var exponent = 0;
        var i = 0;
        var significandHigh = new long_1.Long(0, 0);
        var significandLow = new long_1.Long(0, 0);
        var biasedExponent = 0;
        var index2 = 0;
        if (representation.length >= 7e3) {
          throw new TypeError("" + representation + " not a valid Decimal128 string");
        }
        var stringMatch = representation.match(PARSE_STRING_REGEXP);
        var infMatch = representation.match(PARSE_INF_REGEXP);
        var nanMatch = representation.match(PARSE_NAN_REGEXP);
        if (!stringMatch && !infMatch && !nanMatch || representation.length === 0) {
          throw new TypeError("" + representation + " not a valid Decimal128 string");
        }
        if (stringMatch) {
          var unsignedNumber = stringMatch[2];
          var e = stringMatch[4];
          var expSign = stringMatch[5];
          var expNumber = stringMatch[6];
          if (e && expNumber === void 0)
            invalidErr(representation, "missing exponent power");
          if (e && unsignedNumber === void 0)
            invalidErr(representation, "missing exponent base");
          if (e === void 0 && (expSign || expNumber)) {
            invalidErr(representation, "missing e before exponent");
          }
        }
        if (representation[index2] === "+" || representation[index2] === "-") {
          isNegative = representation[index2++] === "-";
        }
        if (!isDigit(representation[index2]) && representation[index2] !== ".") {
          if (representation[index2] === "i" || representation[index2] === "I") {
            return new Decimal1282(buffer_1.Buffer.from(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
          } else if (representation[index2] === "N") {
            return new Decimal1282(buffer_1.Buffer.from(NAN_BUFFER));
          }
        }
        while (isDigit(representation[index2]) || representation[index2] === ".") {
          if (representation[index2] === ".") {
            if (sawRadix)
              invalidErr(representation, "contains multiple periods");
            sawRadix = true;
            index2 = index2 + 1;
            continue;
          }
          if (nDigitsStored < 34) {
            if (representation[index2] !== "0" || foundNonZero) {
              if (!foundNonZero) {
                firstNonZero = nDigitsRead;
              }
              foundNonZero = true;
              digits[digitsInsert++] = parseInt(representation[index2], 10);
              nDigitsStored = nDigitsStored + 1;
            }
          }
          if (foundNonZero)
            nDigits = nDigits + 1;
          if (sawRadix)
            radixPosition = radixPosition + 1;
          nDigitsRead = nDigitsRead + 1;
          index2 = index2 + 1;
        }
        if (sawRadix && !nDigitsRead)
          throw new TypeError("" + representation + " not a valid Decimal128 string");
        if (representation[index2] === "e" || representation[index2] === "E") {
          var match = representation.substr(++index2).match(EXPONENT_REGEX);
          if (!match || !match[2])
            return new Decimal1282(buffer_1.Buffer.from(NAN_BUFFER));
          exponent = parseInt(match[0], 10);
          index2 = index2 + match[0].length;
        }
        if (representation[index2])
          return new Decimal1282(buffer_1.Buffer.from(NAN_BUFFER));
        firstDigit = 0;
        if (!nDigitsStored) {
          firstDigit = 0;
          lastDigit = 0;
          digits[0] = 0;
          nDigits = 1;
          nDigitsStored = 1;
          significantDigits = 0;
        } else {
          lastDigit = nDigitsStored - 1;
          significantDigits = nDigits;
          if (significantDigits !== 1) {
            while (representation[firstNonZero + significantDigits - 1] === "0") {
              significantDigits = significantDigits - 1;
            }
          }
        }
        if (exponent <= radixPosition && radixPosition - exponent > 1 << 14) {
          exponent = EXPONENT_MIN;
        } else {
          exponent = exponent - radixPosition;
        }
        while (exponent > EXPONENT_MAX) {
          lastDigit = lastDigit + 1;
          if (lastDigit - firstDigit > MAX_DIGITS) {
            var digitsString = digits.join("");
            if (digitsString.match(/^0+$/)) {
              exponent = EXPONENT_MAX;
              break;
            }
            invalidErr(representation, "overflow");
          }
          exponent = exponent - 1;
        }
        while (exponent < EXPONENT_MIN || nDigitsStored < nDigits) {
          if (lastDigit === 0 && significantDigits < nDigitsStored) {
            exponent = EXPONENT_MIN;
            significantDigits = 0;
            break;
          }
          if (nDigitsStored < nDigits) {
            nDigits = nDigits - 1;
          } else {
            lastDigit = lastDigit - 1;
          }
          if (exponent < EXPONENT_MAX) {
            exponent = exponent + 1;
          } else {
            var digitsString = digits.join("");
            if (digitsString.match(/^0+$/)) {
              exponent = EXPONENT_MAX;
              break;
            }
            invalidErr(representation, "overflow");
          }
        }
        if (lastDigit - firstDigit + 1 < significantDigits) {
          var endOfString = nDigitsRead;
          if (sawRadix) {
            firstNonZero = firstNonZero + 1;
            endOfString = endOfString + 1;
          }
          if (isNegative) {
            firstNonZero = firstNonZero + 1;
            endOfString = endOfString + 1;
          }
          var roundDigit = parseInt(representation[firstNonZero + lastDigit + 1], 10);
          var roundBit = 0;
          if (roundDigit >= 5) {
            roundBit = 1;
            if (roundDigit === 5) {
              roundBit = digits[lastDigit] % 2 === 1 ? 1 : 0;
              for (i = firstNonZero + lastDigit + 2; i < endOfString; i++) {
                if (parseInt(representation[i], 10)) {
                  roundBit = 1;
                  break;
                }
              }
            }
          }
          if (roundBit) {
            var dIdx = lastDigit;
            for (; dIdx >= 0; dIdx--) {
              if (++digits[dIdx] > 9) {
                digits[dIdx] = 0;
                if (dIdx === 0) {
                  if (exponent < EXPONENT_MAX) {
                    exponent = exponent + 1;
                    digits[dIdx] = 1;
                  } else {
                    return new Decimal1282(buffer_1.Buffer.from(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
                  }
                }
              }
            }
          }
        }
        significandHigh = long_1.Long.fromNumber(0);
        significandLow = long_1.Long.fromNumber(0);
        if (significantDigits === 0) {
          significandHigh = long_1.Long.fromNumber(0);
          significandLow = long_1.Long.fromNumber(0);
        } else if (lastDigit - firstDigit < 17) {
          var dIdx = firstDigit;
          significandLow = long_1.Long.fromNumber(digits[dIdx++]);
          significandHigh = new long_1.Long(0, 0);
          for (; dIdx <= lastDigit; dIdx++) {
            significandLow = significandLow.multiply(long_1.Long.fromNumber(10));
            significandLow = significandLow.add(long_1.Long.fromNumber(digits[dIdx]));
          }
        } else {
          var dIdx = firstDigit;
          significandHigh = long_1.Long.fromNumber(digits[dIdx++]);
          for (; dIdx <= lastDigit - 17; dIdx++) {
            significandHigh = significandHigh.multiply(long_1.Long.fromNumber(10));
            significandHigh = significandHigh.add(long_1.Long.fromNumber(digits[dIdx]));
          }
          significandLow = long_1.Long.fromNumber(digits[dIdx++]);
          for (; dIdx <= lastDigit; dIdx++) {
            significandLow = significandLow.multiply(long_1.Long.fromNumber(10));
            significandLow = significandLow.add(long_1.Long.fromNumber(digits[dIdx]));
          }
        }
        var significand = multiply64x2(significandHigh, long_1.Long.fromString("100000000000000000"));
        significand.low = significand.low.add(significandLow);
        if (lessThan(significand.low, significandLow)) {
          significand.high = significand.high.add(long_1.Long.fromNumber(1));
        }
        biasedExponent = exponent + EXPONENT_BIAS;
        var dec = {low: long_1.Long.fromNumber(0), high: long_1.Long.fromNumber(0)};
        if (significand.high.shiftRightUnsigned(49).and(long_1.Long.fromNumber(1)).equals(long_1.Long.fromNumber(1))) {
          dec.high = dec.high.or(long_1.Long.fromNumber(3).shiftLeft(61));
          dec.high = dec.high.or(long_1.Long.fromNumber(biasedExponent).and(long_1.Long.fromNumber(16383).shiftLeft(47)));
          dec.high = dec.high.or(significand.high.and(long_1.Long.fromNumber(140737488355327)));
        } else {
          dec.high = dec.high.or(long_1.Long.fromNumber(biasedExponent & 16383).shiftLeft(49));
          dec.high = dec.high.or(significand.high.and(long_1.Long.fromNumber(562949953421311)));
        }
        dec.low = significand.low;
        if (isNegative) {
          dec.high = dec.high.or(long_1.Long.fromString("9223372036854775808"));
        }
        var buffer = buffer_1.Buffer.alloc(16);
        index2 = 0;
        buffer[index2++] = dec.low.low & 255;
        buffer[index2++] = dec.low.low >> 8 & 255;
        buffer[index2++] = dec.low.low >> 16 & 255;
        buffer[index2++] = dec.low.low >> 24 & 255;
        buffer[index2++] = dec.low.high & 255;
        buffer[index2++] = dec.low.high >> 8 & 255;
        buffer[index2++] = dec.low.high >> 16 & 255;
        buffer[index2++] = dec.low.high >> 24 & 255;
        buffer[index2++] = dec.high.low & 255;
        buffer[index2++] = dec.high.low >> 8 & 255;
        buffer[index2++] = dec.high.low >> 16 & 255;
        buffer[index2++] = dec.high.low >> 24 & 255;
        buffer[index2++] = dec.high.high & 255;
        buffer[index2++] = dec.high.high >> 8 & 255;
        buffer[index2++] = dec.high.high >> 16 & 255;
        buffer[index2++] = dec.high.high >> 24 & 255;
        return new Decimal1282(buffer);
      };
      Decimal1282.prototype.toString = function() {
        var biased_exponent;
        var significand_digits = 0;
        var significand = new Array(36);
        for (var i = 0; i < significand.length; i++)
          significand[i] = 0;
        var index2 = 0;
        var is_zero = false;
        var significand_msb;
        var significand128 = {parts: [0, 0, 0, 0]};
        var j, k;
        var string = [];
        index2 = 0;
        var buffer = this.bytes;
        var low = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
        var midl = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
        var midh = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
        var high = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
        index2 = 0;
        var dec = {
          low: new long_1.Long(low, midl),
          high: new long_1.Long(midh, high)
        };
        if (dec.high.lessThan(long_1.Long.ZERO)) {
          string.push("-");
        }
        var combination = high >> 26 & COMBINATION_MASK;
        if (combination >> 3 === 3) {
          if (combination === COMBINATION_INFINITY) {
            return string.join("") + "Infinity";
          } else if (combination === COMBINATION_NAN) {
            return "NaN";
          } else {
            biased_exponent = high >> 15 & EXPONENT_MASK;
            significand_msb = 8 + (high >> 14 & 1);
          }
        } else {
          significand_msb = high >> 14 & 7;
          biased_exponent = high >> 17 & EXPONENT_MASK;
        }
        var exponent = biased_exponent - EXPONENT_BIAS;
        significand128.parts[0] = (high & 16383) + ((significand_msb & 15) << 14);
        significand128.parts[1] = midh;
        significand128.parts[2] = midl;
        significand128.parts[3] = low;
        if (significand128.parts[0] === 0 && significand128.parts[1] === 0 && significand128.parts[2] === 0 && significand128.parts[3] === 0) {
          is_zero = true;
        } else {
          for (k = 3; k >= 0; k--) {
            var least_digits = 0;
            var result = divideu128(significand128);
            significand128 = result.quotient;
            least_digits = result.rem.low;
            if (!least_digits)
              continue;
            for (j = 8; j >= 0; j--) {
              significand[k * 9 + j] = least_digits % 10;
              least_digits = Math.floor(least_digits / 10);
            }
          }
        }
        if (is_zero) {
          significand_digits = 1;
          significand[index2] = 0;
        } else {
          significand_digits = 36;
          while (!significand[index2]) {
            significand_digits = significand_digits - 1;
            index2 = index2 + 1;
          }
        }
        var scientific_exponent = significand_digits - 1 + exponent;
        if (scientific_exponent >= 34 || scientific_exponent <= -7 || exponent > 0) {
          if (significand_digits > 34) {
            string.push("" + 0);
            if (exponent > 0)
              string.push("E+" + exponent);
            else if (exponent < 0)
              string.push("E" + exponent);
            return string.join("");
          }
          string.push("" + significand[index2++]);
          significand_digits = significand_digits - 1;
          if (significand_digits) {
            string.push(".");
          }
          for (var i = 0; i < significand_digits; i++) {
            string.push("" + significand[index2++]);
          }
          string.push("E");
          if (scientific_exponent > 0) {
            string.push("+" + scientific_exponent);
          } else {
            string.push("" + scientific_exponent);
          }
        } else {
          if (exponent >= 0) {
            for (var i = 0; i < significand_digits; i++) {
              string.push("" + significand[index2++]);
            }
          } else {
            var radix_position = significand_digits + exponent;
            if (radix_position > 0) {
              for (var i = 0; i < radix_position; i++) {
                string.push("" + significand[index2++]);
              }
            } else {
              string.push("0");
            }
            string.push(".");
            while (radix_position++ < 0) {
              string.push("0");
            }
            for (var i = 0; i < significand_digits - Math.max(radix_position - 1, 0); i++) {
              string.push("" + significand[index2++]);
            }
          }
        }
        return string.join("");
      };
      Decimal1282.prototype.toJSON = function() {
        return {$numberDecimal: this.toString()};
      };
      Decimal1282.prototype.toExtendedJSON = function() {
        return {$numberDecimal: this.toString()};
      };
      Decimal1282.fromExtendedJSON = function(doc) {
        return Decimal1282.fromString(doc.$numberDecimal);
      };
      Decimal1282.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      Decimal1282.prototype.inspect = function() {
        return 'Decimal128.fromString("' + this.toString() + '")';
      };
      return Decimal1282;
    }();
    exports.Decimal128 = Decimal128;
    Object.defineProperty(Decimal128.prototype, "_bsontype", {value: "Decimal128"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/double.js
var require_double = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/double.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Double = void 0;
    var Double = function() {
      function Double2(value) {
        if (!(this instanceof Double2))
          return new Double2(value);
        if (value instanceof Number) {
          value = value.valueOf();
        }
        this.value = +value;
      }
      Double2.prototype.valueOf = function() {
        return this.value;
      };
      Double2.prototype.toJSON = function() {
        return this.value;
      };
      Double2.prototype.toExtendedJSON = function(options2) {
        if (options2 && (options2.legacy || options2.relaxed && isFinite(this.value))) {
          return this.value;
        }
        if (Object.is(Math.sign(this.value), -0)) {
          return {$numberDouble: "-" + this.value.toFixed(1)};
        }
        var $numberDouble;
        if (Number.isInteger(this.value)) {
          $numberDouble = this.value.toFixed(1);
          if ($numberDouble.length >= 13) {
            $numberDouble = this.value.toExponential(13).toUpperCase();
          }
        } else {
          $numberDouble = this.value.toString();
        }
        return {$numberDouble};
      };
      Double2.fromExtendedJSON = function(doc, options2) {
        var doubleValue = parseFloat(doc.$numberDouble);
        return options2 && options2.relaxed ? doubleValue : new Double2(doubleValue);
      };
      Double2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      Double2.prototype.inspect = function() {
        var eJSON = this.toExtendedJSON();
        return "new Double(" + eJSON.$numberDouble + ")";
      };
      return Double2;
    }();
    exports.Double = Double;
    Object.defineProperty(Double.prototype, "_bsontype", {value: "Double"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/int_32.js
var require_int_32 = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/int_32.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Int32 = void 0;
    var Int32 = function() {
      function Int322(value) {
        if (!(this instanceof Int322))
          return new Int322(value);
        if (value instanceof Number) {
          value = value.valueOf();
        }
        this.value = +value;
      }
      Int322.prototype.valueOf = function() {
        return this.value;
      };
      Int322.prototype.toJSON = function() {
        return this.value;
      };
      Int322.prototype.toExtendedJSON = function(options2) {
        if (options2 && (options2.relaxed || options2.legacy))
          return this.value;
        return {$numberInt: this.value.toString()};
      };
      Int322.fromExtendedJSON = function(doc, options2) {
        return options2 && options2.relaxed ? parseInt(doc.$numberInt, 10) : new Int322(doc.$numberInt);
      };
      Int322.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      Int322.prototype.inspect = function() {
        return "new Int32(" + this.valueOf() + ")";
      };
      return Int322;
    }();
    exports.Int32 = Int32;
    Object.defineProperty(Int32.prototype, "_bsontype", {value: "Int32"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/max_key.js
var require_max_key = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/max_key.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.MaxKey = void 0;
    var MaxKey = function() {
      function MaxKey2() {
        if (!(this instanceof MaxKey2))
          return new MaxKey2();
      }
      MaxKey2.prototype.toExtendedJSON = function() {
        return {$maxKey: 1};
      };
      MaxKey2.fromExtendedJSON = function() {
        return new MaxKey2();
      };
      MaxKey2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      MaxKey2.prototype.inspect = function() {
        return "new MaxKey()";
      };
      return MaxKey2;
    }();
    exports.MaxKey = MaxKey;
    Object.defineProperty(MaxKey.prototype, "_bsontype", {value: "MaxKey"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/min_key.js
var require_min_key = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/min_key.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.MinKey = void 0;
    var MinKey = function() {
      function MinKey2() {
        if (!(this instanceof MinKey2))
          return new MinKey2();
      }
      MinKey2.prototype.toExtendedJSON = function() {
        return {$minKey: 1};
      };
      MinKey2.fromExtendedJSON = function() {
        return new MinKey2();
      };
      MinKey2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      MinKey2.prototype.inspect = function() {
        return "new MinKey()";
      };
      return MinKey2;
    }();
    exports.MinKey = MinKey;
    Object.defineProperty(MinKey.prototype, "_bsontype", {value: "MinKey"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/objectid.js
var require_objectid = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/objectid.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.ObjectId = void 0;
    var buffer_1 = require("buffer");
    var ensure_buffer_1 = require_ensure_buffer();
    var utils_1 = require_utils();
    var PROCESS_UNIQUE = utils_1.randomBytes(5);
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    var hexTable = [];
    for (var i_1 = 0; i_1 < 256; i_1++) {
      hexTable[i_1] = (i_1 <= 15 ? "0" : "") + i_1.toString(16);
    }
    var decodeLookup = [];
    var i = 0;
    while (i < 10)
      decodeLookup[48 + i] = i++;
    while (i < 16)
      decodeLookup[65 - 10 + i] = decodeLookup[97 - 10 + i] = i++;
    var kId = Symbol("id");
    var ObjectId = function() {
      function ObjectId2(id) {
        if (!(this instanceof ObjectId2))
          return new ObjectId2(id);
        if (id instanceof ObjectId2) {
          this[kId] = id.id;
          this.__id = id.__id;
        }
        if (typeof id === "object" && id && "id" in id) {
          if ("toHexString" in id && typeof id.toHexString === "function") {
            this[kId] = buffer_1.Buffer.from(id.toHexString(), "hex");
          } else {
            this[kId] = typeof id.id === "string" ? buffer_1.Buffer.from(id.id) : id.id;
          }
        }
        if (id == null || typeof id === "number") {
          this[kId] = ObjectId2.generate(typeof id === "number" ? id : void 0);
          if (ObjectId2.cacheHexString) {
            this.__id = this.id.toString("hex");
          }
        }
        if (ArrayBuffer.isView(id) && id.byteLength === 12) {
          this[kId] = ensure_buffer_1.ensureBuffer(id);
        }
        if (typeof id === "string") {
          if (id.length === 12) {
            var bytes = buffer_1.Buffer.from(id);
            if (bytes.byteLength === 12) {
              this[kId] = bytes;
            }
          } else if (id.length === 24 && checkForHexRegExp.test(id)) {
            this[kId] = buffer_1.Buffer.from(id, "hex");
          } else {
            throw new TypeError("Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters");
          }
        }
        if (ObjectId2.cacheHexString) {
          this.__id = this.id.toString("hex");
        }
      }
      Object.defineProperty(ObjectId2.prototype, "id", {
        get: function() {
          return this[kId];
        },
        set: function(value) {
          this[kId] = value;
          if (ObjectId2.cacheHexString) {
            this.__id = value.toString("hex");
          }
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ObjectId2.prototype, "generationTime", {
        get: function() {
          return this.id.readInt32BE(0);
        },
        set: function(value) {
          this.id.writeUInt32BE(value, 0);
        },
        enumerable: false,
        configurable: true
      });
      ObjectId2.prototype.toHexString = function() {
        if (ObjectId2.cacheHexString && this.__id) {
          return this.__id;
        }
        var hexString = this.id.toString("hex");
        if (ObjectId2.cacheHexString && !this.__id) {
          this.__id = hexString;
        }
        return hexString;
      };
      ObjectId2.getInc = function() {
        return ObjectId2.index = (ObjectId2.index + 1) % 16777215;
      };
      ObjectId2.generate = function(time) {
        if (typeof time !== "number") {
          time = ~~(Date.now() / 1e3);
        }
        var inc = ObjectId2.getInc();
        var buffer = buffer_1.Buffer.alloc(12);
        buffer.writeUInt32BE(time, 0);
        buffer[4] = PROCESS_UNIQUE[0];
        buffer[5] = PROCESS_UNIQUE[1];
        buffer[6] = PROCESS_UNIQUE[2];
        buffer[7] = PROCESS_UNIQUE[3];
        buffer[8] = PROCESS_UNIQUE[4];
        buffer[11] = inc & 255;
        buffer[10] = inc >> 8 & 255;
        buffer[9] = inc >> 16 & 255;
        return buffer;
      };
      ObjectId2.prototype.toString = function(format2) {
        if (format2)
          return this.id.toString(format2);
        return this.toHexString();
      };
      ObjectId2.prototype.toJSON = function() {
        return this.toHexString();
      };
      ObjectId2.prototype.equals = function(otherId) {
        if (otherId === void 0 || otherId === null) {
          return false;
        }
        if (otherId instanceof ObjectId2) {
          return this.toString() === otherId.toString();
        }
        if (typeof otherId === "string" && ObjectId2.isValid(otherId) && otherId.length === 12 && buffer_1.Buffer.isBuffer(this.id)) {
          return otherId === this.id.toString("binary");
        }
        if (typeof otherId === "string" && ObjectId2.isValid(otherId) && otherId.length === 24) {
          return otherId.toLowerCase() === this.toHexString();
        }
        if (typeof otherId === "string" && ObjectId2.isValid(otherId) && otherId.length === 12) {
          return buffer_1.Buffer.from(otherId).equals(this.id);
        }
        if (typeof otherId === "object" && "toHexString" in otherId && typeof otherId.toHexString === "function") {
          return otherId.toHexString() === this.toHexString();
        }
        return false;
      };
      ObjectId2.prototype.getTimestamp = function() {
        var timestamp = new Date();
        var time = this.id.readUInt32BE(0);
        timestamp.setTime(Math.floor(time) * 1e3);
        return timestamp;
      };
      ObjectId2.createPk = function() {
        return new ObjectId2();
      };
      ObjectId2.createFromTime = function(time) {
        var buffer = buffer_1.Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        buffer.writeUInt32BE(time, 0);
        return new ObjectId2(buffer);
      };
      ObjectId2.createFromHexString = function(hexString) {
        if (typeof hexString === "undefined" || hexString != null && hexString.length !== 24) {
          throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
        }
        return new ObjectId2(buffer_1.Buffer.from(hexString, "hex"));
      };
      ObjectId2.isValid = function(id) {
        if (id == null)
          return false;
        if (typeof id === "number") {
          return true;
        }
        if (typeof id === "string") {
          return id.length === 12 || id.length === 24 && checkForHexRegExp.test(id);
        }
        if (id instanceof ObjectId2) {
          return true;
        }
        if (buffer_1.Buffer.isBuffer(id) && id.length === 12) {
          return true;
        }
        if (typeof id === "object" && "toHexString" in id && typeof id.toHexString === "function") {
          if (typeof id.id === "string") {
            return id.id.length === 12;
          }
          return id.toHexString().length === 24 && checkForHexRegExp.test(id.id.toString("hex"));
        }
        return false;
      };
      ObjectId2.prototype.toExtendedJSON = function() {
        if (this.toHexString)
          return {$oid: this.toHexString()};
        return {$oid: this.toString("hex")};
      };
      ObjectId2.fromExtendedJSON = function(doc) {
        return new ObjectId2(doc.$oid);
      };
      ObjectId2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      ObjectId2.prototype.inspect = function() {
        return 'new ObjectId("' + this.toHexString() + '")';
      };
      ObjectId2.index = ~~(Math.random() * 16777215);
      return ObjectId2;
    }();
    exports.ObjectId = ObjectId;
    Object.defineProperty(ObjectId.prototype, "generate", {
      value: utils_1.deprecate(function(time) {
        return ObjectId.generate(time);
      }, "Please use the static `ObjectId.generate(time)` instead")
    });
    Object.defineProperty(ObjectId.prototype, "getInc", {
      value: utils_1.deprecate(function() {
        return ObjectId.getInc();
      }, "Please use the static `ObjectId.getInc()` instead")
    });
    Object.defineProperty(ObjectId.prototype, "get_inc", {
      value: utils_1.deprecate(function() {
        return ObjectId.getInc();
      }, "Please use the static `ObjectId.getInc()` instead")
    });
    Object.defineProperty(ObjectId, "get_inc", {
      value: utils_1.deprecate(function() {
        return ObjectId.getInc();
      }, "Please use the static `ObjectId.getInc()` instead")
    });
    Object.defineProperty(ObjectId.prototype, "_bsontype", {value: "ObjectID"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/regexp.js
var require_regexp = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/regexp.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.BSONRegExp = void 0;
    function alphabetize(str) {
      return str.split("").sort().join("");
    }
    var BSONRegExp = function() {
      function BSONRegExp2(pattern, options2) {
        if (!(this instanceof BSONRegExp2))
          return new BSONRegExp2(pattern, options2);
        this.pattern = pattern;
        this.options = options2 !== null && options2 !== void 0 ? options2 : "";
        alphabetize(this.options);
        for (var i = 0; i < this.options.length; i++) {
          if (!(this.options[i] === "i" || this.options[i] === "m" || this.options[i] === "x" || this.options[i] === "l" || this.options[i] === "s" || this.options[i] === "u")) {
            throw new Error("The regular expression option [" + this.options[i] + "] is not supported");
          }
        }
      }
      BSONRegExp2.parseOptions = function(options2) {
        return options2 ? options2.split("").sort().join("") : "";
      };
      BSONRegExp2.prototype.toExtendedJSON = function(options2) {
        options2 = options2 || {};
        if (options2.legacy) {
          return {$regex: this.pattern, $options: this.options};
        }
        return {$regularExpression: {pattern: this.pattern, options: this.options}};
      };
      BSONRegExp2.fromExtendedJSON = function(doc) {
        if ("$regex" in doc) {
          if (typeof doc.$regex !== "string") {
            if (doc.$regex._bsontype === "BSONRegExp") {
              return doc;
            }
          } else {
            return new BSONRegExp2(doc.$regex, BSONRegExp2.parseOptions(doc.$options));
          }
        }
        if ("$regularExpression" in doc) {
          return new BSONRegExp2(doc.$regularExpression.pattern, BSONRegExp2.parseOptions(doc.$regularExpression.options));
        }
        throw new TypeError("Unexpected BSONRegExp EJSON object form: " + JSON.stringify(doc));
      };
      return BSONRegExp2;
    }();
    exports.BSONRegExp = BSONRegExp;
    Object.defineProperty(BSONRegExp.prototype, "_bsontype", {value: "BSONRegExp"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/symbol.js
var require_symbol = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/symbol.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.BSONSymbol = void 0;
    var BSONSymbol = function() {
      function BSONSymbol2(value) {
        if (!(this instanceof BSONSymbol2))
          return new BSONSymbol2(value);
        this.value = value;
      }
      BSONSymbol2.prototype.valueOf = function() {
        return this.value;
      };
      BSONSymbol2.prototype.toString = function() {
        return this.value;
      };
      BSONSymbol2.prototype.inspect = function() {
        return 'new BSONSymbol("' + this.value + '")';
      };
      BSONSymbol2.prototype.toJSON = function() {
        return this.value;
      };
      BSONSymbol2.prototype.toExtendedJSON = function() {
        return {$symbol: this.value};
      };
      BSONSymbol2.fromExtendedJSON = function(doc) {
        return new BSONSymbol2(doc.$symbol);
      };
      BSONSymbol2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      return BSONSymbol2;
    }();
    exports.BSONSymbol = BSONSymbol;
    Object.defineProperty(BSONSymbol.prototype, "_bsontype", {value: "Symbol"});
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/timestamp.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Timestamp = exports.LongWithoutOverridesClass = void 0;
    var long_1 = require_long();
    exports.LongWithoutOverridesClass = long_1.Long;
    var Timestamp = function(_super) {
      __extends(Timestamp2, _super);
      function Timestamp2(low, high) {
        var _this = this;
        if (!(_this instanceof Timestamp2))
          return new Timestamp2(low, high);
        if (long_1.Long.isLong(low)) {
          _this = _super.call(this, low.low, low.high, true) || this;
        } else {
          _this = _super.call(this, low, high, true) || this;
        }
        Object.defineProperty(_this, "_bsontype", {
          value: "Timestamp",
          writable: false,
          configurable: false,
          enumerable: false
        });
        return _this;
      }
      Timestamp2.prototype.toJSON = function() {
        return {
          $timestamp: this.toString()
        };
      };
      Timestamp2.fromInt = function(value) {
        return new Timestamp2(long_1.Long.fromInt(value, true));
      };
      Timestamp2.fromNumber = function(value) {
        return new Timestamp2(long_1.Long.fromNumber(value, true));
      };
      Timestamp2.fromBits = function(lowBits, highBits) {
        return new Timestamp2(lowBits, highBits);
      };
      Timestamp2.fromString = function(str, optRadix) {
        return new Timestamp2(long_1.Long.fromString(str, true, optRadix));
      };
      Timestamp2.prototype.toExtendedJSON = function() {
        return {$timestamp: {t: this.high >>> 0, i: this.low >>> 0}};
      };
      Timestamp2.fromExtendedJSON = function(doc) {
        return new Timestamp2(doc.$timestamp.i, doc.$timestamp.t);
      };
      Timestamp2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return this.inspect();
      };
      Timestamp2.prototype.inspect = function() {
        return "new Timestamp(" + this.getLowBits().toString() + ", " + this.getHighBits().toString() + ")";
      };
      Timestamp2.MAX_VALUE = long_1.Long.MAX_UNSIGNED_VALUE;
      return Timestamp2;
    }(exports.LongWithoutOverridesClass);
    exports.Timestamp = Timestamp;
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/extended_json.js
var require_extended_json = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/extended_json.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.EJSON = exports.isBSONType = void 0;
    var binary_1 = require_binary();
    var code_1 = require_code();
    var db_ref_1 = require_db_ref();
    var decimal128_1 = require_decimal128();
    var double_1 = require_double();
    var int_32_1 = require_int_32();
    var long_1 = require_long();
    var max_key_1 = require_max_key();
    var min_key_1 = require_min_key();
    var objectid_1 = require_objectid();
    var utils_1 = require_utils();
    var regexp_1 = require_regexp();
    var symbol_1 = require_symbol();
    var timestamp_1 = require_timestamp();
    function isBSONType(value) {
      return utils_1.isObjectLike(value) && Reflect.has(value, "_bsontype") && typeof value._bsontype === "string";
    }
    exports.isBSONType = isBSONType;
    var BSON_INT32_MAX = 2147483647;
    var BSON_INT32_MIN = -2147483648;
    var BSON_INT64_MAX = 9223372036854776e3;
    var BSON_INT64_MIN = -9223372036854776e3;
    var keysToCodecs = {
      $oid: objectid_1.ObjectId,
      $binary: binary_1.Binary,
      $uuid: binary_1.Binary,
      $symbol: symbol_1.BSONSymbol,
      $numberInt: int_32_1.Int32,
      $numberDecimal: decimal128_1.Decimal128,
      $numberDouble: double_1.Double,
      $numberLong: long_1.Long,
      $minKey: min_key_1.MinKey,
      $maxKey: max_key_1.MaxKey,
      $regex: regexp_1.BSONRegExp,
      $regularExpression: regexp_1.BSONRegExp,
      $timestamp: timestamp_1.Timestamp
    };
    function deserializeValue(value, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      if (typeof value === "number") {
        if (options2.relaxed || options2.legacy) {
          return value;
        }
        if (Math.floor(value) === value) {
          if (value >= BSON_INT32_MIN && value <= BSON_INT32_MAX)
            return new int_32_1.Int32(value);
          if (value >= BSON_INT64_MIN && value <= BSON_INT64_MAX)
            return long_1.Long.fromNumber(value);
        }
        return new double_1.Double(value);
      }
      if (value == null || typeof value !== "object")
        return value;
      if (value.$undefined)
        return null;
      var keys = Object.keys(value).filter(function(k) {
        return k.startsWith("$") && value[k] != null;
      });
      for (var i = 0; i < keys.length; i++) {
        var c = keysToCodecs[keys[i]];
        if (c)
          return c.fromExtendedJSON(value, options2);
      }
      if (value.$date != null) {
        var d = value.$date;
        var date = new Date();
        if (options2.legacy) {
          if (typeof d === "number")
            date.setTime(d);
          else if (typeof d === "string")
            date.setTime(Date.parse(d));
        } else {
          if (typeof d === "string")
            date.setTime(Date.parse(d));
          else if (long_1.Long.isLong(d))
            date.setTime(d.toNumber());
          else if (typeof d === "number" && options2.relaxed)
            date.setTime(d);
        }
        return date;
      }
      if (value.$code != null) {
        var copy = Object.assign({}, value);
        if (value.$scope) {
          copy.$scope = deserializeValue(value.$scope);
        }
        return code_1.Code.fromExtendedJSON(value);
      }
      if (value.$ref != null || value.$dbPointer != null) {
        var v = value.$ref ? value : value.$dbPointer;
        if (v instanceof db_ref_1.DBRef)
          return v;
        var dollarKeys = Object.keys(v).filter(function(k) {
          return k.startsWith("$");
        });
        var valid_1 = true;
        dollarKeys.forEach(function(k) {
          if (["$ref", "$id", "$db"].indexOf(k) === -1)
            valid_1 = false;
        });
        if (valid_1)
          return db_ref_1.DBRef.fromExtendedJSON(v);
      }
      return value;
    }
    function serializeArray(array, options2) {
      return array.map(function(v) {
        return serializeValue(v, options2);
      });
    }
    function getISOString(date) {
      var isoStr = date.toISOString();
      return date.getUTCMilliseconds() !== 0 ? isoStr : isoStr.slice(0, -5) + "Z";
    }
    function serializeValue(value, options2) {
      if (Array.isArray(value))
        return serializeArray(value, options2);
      if (value === void 0)
        return null;
      if (value instanceof Date) {
        var dateNum = value.getTime(), inRange = dateNum > -1 && dateNum < 2534023188e5;
        if (options2.legacy) {
          return options2.relaxed && inRange ? {$date: value.getTime()} : {$date: getISOString(value)};
        }
        return options2.relaxed && inRange ? {$date: getISOString(value)} : {$date: {$numberLong: value.getTime().toString()}};
      }
      if (typeof value === "number" && !options2.relaxed) {
        if (Math.floor(value) === value) {
          var int32Range = value >= BSON_INT32_MIN && value <= BSON_INT32_MAX, int64Range = value >= BSON_INT64_MIN && value <= BSON_INT64_MAX;
          if (int32Range)
            return {$numberInt: value.toString()};
          if (int64Range)
            return {$numberLong: value.toString()};
        }
        return {$numberDouble: value.toString()};
      }
      if (value instanceof RegExp) {
        var flags = value.flags;
        if (flags === void 0) {
          var match = value.toString().match(/[gimuy]*$/);
          if (match) {
            flags = match[0];
          }
        }
        var rx = new regexp_1.BSONRegExp(value.source, flags);
        return rx.toExtendedJSON(options2);
      }
      if (value != null && typeof value === "object")
        return serializeDocument(value, options2);
      return value;
    }
    var BSON_TYPE_MAPPINGS = {
      Binary: function(o) {
        return new binary_1.Binary(o.value(), o.sub_type);
      },
      Code: function(o) {
        return new code_1.Code(o.code, o.scope);
      },
      DBRef: function(o) {
        return new db_ref_1.DBRef(o.collection || o.namespace, o.oid, o.db, o.fields);
      },
      Decimal128: function(o) {
        return new decimal128_1.Decimal128(o.bytes);
      },
      Double: function(o) {
        return new double_1.Double(o.value);
      },
      Int32: function(o) {
        return new int_32_1.Int32(o.value);
      },
      Long: function(o) {
        return long_1.Long.fromBits(o.low != null ? o.low : o.low_, o.low != null ? o.high : o.high_, o.low != null ? o.unsigned : o.unsigned_);
      },
      MaxKey: function() {
        return new max_key_1.MaxKey();
      },
      MinKey: function() {
        return new min_key_1.MinKey();
      },
      ObjectID: function(o) {
        return new objectid_1.ObjectId(o);
      },
      ObjectId: function(o) {
        return new objectid_1.ObjectId(o);
      },
      BSONRegExp: function(o) {
        return new regexp_1.BSONRegExp(o.pattern, o.options);
      },
      Symbol: function(o) {
        return new symbol_1.BSONSymbol(o.value);
      },
      Timestamp: function(o) {
        return timestamp_1.Timestamp.fromBits(o.low, o.high);
      }
    };
    function serializeDocument(doc, options2) {
      if (doc == null || typeof doc !== "object")
        throw new Error("not an object instance");
      var bsontype = doc._bsontype;
      if (typeof bsontype === "undefined") {
        var _doc = {};
        for (var name in doc) {
          _doc[name] = serializeValue(doc[name], options2);
        }
        return _doc;
      } else if (isBSONType(doc)) {
        var outDoc = doc;
        if (typeof outDoc.toExtendedJSON !== "function") {
          var mapper = BSON_TYPE_MAPPINGS[doc._bsontype];
          if (!mapper) {
            throw new TypeError("Unrecognized or invalid _bsontype: " + doc._bsontype);
          }
          outDoc = mapper(outDoc);
        }
        if (bsontype === "Code" && outDoc.scope) {
          outDoc = new code_1.Code(outDoc.code, serializeValue(outDoc.scope, options2));
        } else if (bsontype === "DBRef" && outDoc.oid) {
          outDoc = new db_ref_1.DBRef(outDoc.collection, serializeValue(outDoc.oid, options2), outDoc.db, outDoc.fields);
        }
        return outDoc.toExtendedJSON(options2);
      } else {
        throw new Error("_bsontype must be a string, but was: " + typeof bsontype);
      }
    }
    var EJSON;
    (function(EJSON2) {
      function parse(text, options2) {
        var finalOptions = Object.assign({}, {relaxed: true, legacy: false}, options2);
        if (typeof finalOptions.relaxed === "boolean")
          finalOptions.strict = !finalOptions.relaxed;
        if (typeof finalOptions.strict === "boolean")
          finalOptions.relaxed = !finalOptions.strict;
        return JSON.parse(text, function(_key, value) {
          return deserializeValue(value, finalOptions);
        });
      }
      EJSON2.parse = parse;
      function stringify(value, replacer, space, options2) {
        if (space != null && typeof space === "object") {
          options2 = space;
          space = 0;
        }
        if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
          options2 = replacer;
          replacer = void 0;
          space = 0;
        }
        options2 = Object.assign({}, {relaxed: true, legacy: false}, options2);
        var doc = serializeValue(value, options2);
        return JSON.stringify(doc, replacer, space);
      }
      EJSON2.stringify = stringify;
      function serialize(value, options2) {
        options2 = options2 || {};
        return JSON.parse(stringify(value, options2));
      }
      EJSON2.serialize = serialize;
      function deserialize(ejson, options2) {
        options2 = options2 || {};
        return parse(JSON.stringify(ejson), options2);
      }
      EJSON2.deserialize = deserialize;
    })(EJSON = exports.EJSON || (exports.EJSON = {}));
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/map.js
var require_map = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/map.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Map = void 0;
    var bsonMap;
    exports.Map = bsonMap;
    var check = function(potentialGlobal) {
      return potentialGlobal && potentialGlobal.Math == Math && potentialGlobal;
    };
    function getGlobal() {
      return check(typeof globalThis === "object" && globalThis) || check(typeof window === "object" && window) || check(typeof self === "object" && self) || check(typeof global === "object" && global) || Function("return this")();
    }
    var bsonGlobal = getGlobal();
    if (Object.prototype.hasOwnProperty.call(bsonGlobal, "Map")) {
      exports.Map = bsonMap = bsonGlobal.Map;
    } else {
      exports.Map = bsonMap = function() {
        function Map2(array) {
          if (array === void 0) {
            array = [];
          }
          this._keys = [];
          this._values = {};
          for (var i = 0; i < array.length; i++) {
            if (array[i] == null)
              continue;
            var entry = array[i];
            var key = entry[0];
            var value = entry[1];
            this._keys.push(key);
            this._values[key] = {v: value, i: this._keys.length - 1};
          }
        }
        Map2.prototype.clear = function() {
          this._keys = [];
          this._values = {};
        };
        Map2.prototype.delete = function(key) {
          var value = this._values[key];
          if (value == null)
            return false;
          delete this._values[key];
          this._keys.splice(value.i, 1);
          return true;
        };
        Map2.prototype.entries = function() {
          var _this = this;
          var index2 = 0;
          return {
            next: function() {
              var key = _this._keys[index2++];
              return {
                value: key !== void 0 ? [key, _this._values[key].v] : void 0,
                done: key !== void 0 ? false : true
              };
            }
          };
        };
        Map2.prototype.forEach = function(callback, self2) {
          self2 = self2 || this;
          for (var i = 0; i < this._keys.length; i++) {
            var key = this._keys[i];
            callback.call(self2, this._values[key].v, key, self2);
          }
        };
        Map2.prototype.get = function(key) {
          return this._values[key] ? this._values[key].v : void 0;
        };
        Map2.prototype.has = function(key) {
          return this._values[key] != null;
        };
        Map2.prototype.keys = function() {
          var _this = this;
          var index2 = 0;
          return {
            next: function() {
              var key = _this._keys[index2++];
              return {
                value: key !== void 0 ? key : void 0,
                done: key !== void 0 ? false : true
              };
            }
          };
        };
        Map2.prototype.set = function(key, value) {
          if (this._values[key]) {
            this._values[key].v = value;
            return this;
          }
          this._keys.push(key);
          this._values[key] = {v: value, i: this._keys.length - 1};
          return this;
        };
        Map2.prototype.values = function() {
          var _this = this;
          var index2 = 0;
          return {
            next: function() {
              var key = _this._keys[index2++];
              return {
                value: key !== void 0 ? _this._values[key].v : void 0,
                done: key !== void 0 ? false : true
              };
            }
          };
        };
        Object.defineProperty(Map2.prototype, "size", {
          get: function() {
            return this._keys.length;
          },
          enumerable: false,
          configurable: true
        });
        return Map2;
      }();
    }
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.BSON_BINARY_SUBTYPE_USER_DEFINED = exports.BSON_BINARY_SUBTYPE_MD5 = exports.BSON_BINARY_SUBTYPE_UUID_NEW = exports.BSON_BINARY_SUBTYPE_UUID = exports.BSON_BINARY_SUBTYPE_BYTE_ARRAY = exports.BSON_BINARY_SUBTYPE_FUNCTION = exports.BSON_BINARY_SUBTYPE_DEFAULT = exports.BSON_DATA_MAX_KEY = exports.BSON_DATA_MIN_KEY = exports.BSON_DATA_DECIMAL128 = exports.BSON_DATA_LONG = exports.BSON_DATA_TIMESTAMP = exports.BSON_DATA_INT = exports.BSON_DATA_CODE_W_SCOPE = exports.BSON_DATA_SYMBOL = exports.BSON_DATA_CODE = exports.BSON_DATA_DBPOINTER = exports.BSON_DATA_REGEXP = exports.BSON_DATA_NULL = exports.BSON_DATA_DATE = exports.BSON_DATA_BOOLEAN = exports.BSON_DATA_OID = exports.BSON_DATA_UNDEFINED = exports.BSON_DATA_BINARY = exports.BSON_DATA_ARRAY = exports.BSON_DATA_OBJECT = exports.BSON_DATA_STRING = exports.BSON_DATA_NUMBER = exports.JS_INT_MIN = exports.JS_INT_MAX = exports.BSON_INT64_MIN = exports.BSON_INT64_MAX = exports.BSON_INT32_MIN = exports.BSON_INT32_MAX = void 0;
    exports.BSON_INT32_MAX = 2147483647;
    exports.BSON_INT32_MIN = -2147483648;
    exports.BSON_INT64_MAX = Math.pow(2, 63) - 1;
    exports.BSON_INT64_MIN = -Math.pow(2, 63);
    exports.JS_INT_MAX = Math.pow(2, 53);
    exports.JS_INT_MIN = -Math.pow(2, 53);
    exports.BSON_DATA_NUMBER = 1;
    exports.BSON_DATA_STRING = 2;
    exports.BSON_DATA_OBJECT = 3;
    exports.BSON_DATA_ARRAY = 4;
    exports.BSON_DATA_BINARY = 5;
    exports.BSON_DATA_UNDEFINED = 6;
    exports.BSON_DATA_OID = 7;
    exports.BSON_DATA_BOOLEAN = 8;
    exports.BSON_DATA_DATE = 9;
    exports.BSON_DATA_NULL = 10;
    exports.BSON_DATA_REGEXP = 11;
    exports.BSON_DATA_DBPOINTER = 12;
    exports.BSON_DATA_CODE = 13;
    exports.BSON_DATA_SYMBOL = 14;
    exports.BSON_DATA_CODE_W_SCOPE = 15;
    exports.BSON_DATA_INT = 16;
    exports.BSON_DATA_TIMESTAMP = 17;
    exports.BSON_DATA_LONG = 18;
    exports.BSON_DATA_DECIMAL128 = 19;
    exports.BSON_DATA_MIN_KEY = 255;
    exports.BSON_DATA_MAX_KEY = 127;
    exports.BSON_BINARY_SUBTYPE_DEFAULT = 0;
    exports.BSON_BINARY_SUBTYPE_FUNCTION = 1;
    exports.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2;
    exports.BSON_BINARY_SUBTYPE_UUID = 3;
    exports.BSON_BINARY_SUBTYPE_UUID_NEW = 4;
    exports.BSON_BINARY_SUBTYPE_MD5 = 5;
    exports.BSON_BINARY_SUBTYPE_USER_DEFINED = 128;
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/parser/calculate_size.js
var require_calculate_size = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/parser/calculate_size.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.calculateObjectSize = void 0;
    var buffer_1 = require("buffer");
    var binary_1 = require_binary();
    var constants = require_constants();
    var utils_1 = require_utils();
    function calculateObjectSize(object, serializeFunctions, ignoreUndefined) {
      var totalLength = 4 + 1;
      if (Array.isArray(object)) {
        for (var i = 0; i < object.length; i++) {
          totalLength += calculateElement(i.toString(), object[i], serializeFunctions, true, ignoreUndefined);
        }
      } else {
        if (object.toBSON) {
          object = object.toBSON();
        }
        for (var key in object) {
          totalLength += calculateElement(key, object[key], serializeFunctions, false, ignoreUndefined);
        }
      }
      return totalLength;
    }
    exports.calculateObjectSize = calculateObjectSize;
    function calculateElement(name, value, serializeFunctions, isArray, ignoreUndefined) {
      if (serializeFunctions === void 0) {
        serializeFunctions = false;
      }
      if (isArray === void 0) {
        isArray = false;
      }
      if (ignoreUndefined === void 0) {
        ignoreUndefined = false;
      }
      if (value && value.toBSON) {
        value = value.toBSON();
      }
      switch (typeof value) {
        case "string":
          return 1 + buffer_1.Buffer.byteLength(name, "utf8") + 1 + 4 + buffer_1.Buffer.byteLength(value, "utf8") + 1;
        case "number":
          if (Math.floor(value) === value && value >= constants.JS_INT_MIN && value <= constants.JS_INT_MAX) {
            if (value >= constants.BSON_INT32_MIN && value <= constants.BSON_INT32_MAX) {
              return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + (4 + 1);
            } else {
              return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + (8 + 1);
            }
          } else {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + (8 + 1);
          }
        case "undefined":
          if (isArray || !ignoreUndefined)
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + 1;
          return 0;
        case "boolean":
          return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + (1 + 1);
        case "object":
          if (value == null || value["_bsontype"] === "MinKey" || value["_bsontype"] === "MaxKey") {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + 1;
          } else if (value["_bsontype"] === "ObjectId" || value["_bsontype"] === "ObjectID") {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + (12 + 1);
          } else if (value instanceof Date || utils_1.isDate(value)) {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + (8 + 1);
          } else if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer) {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + (1 + 4 + 1) + value.byteLength;
          } else if (value["_bsontype"] === "Long" || value["_bsontype"] === "Double" || value["_bsontype"] === "Timestamp") {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + (8 + 1);
          } else if (value["_bsontype"] === "Decimal128") {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + (16 + 1);
          } else if (value["_bsontype"] === "Code") {
            if (value.scope != null && Object.keys(value.scope).length > 0) {
              return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + 1 + 4 + 4 + buffer_1.Buffer.byteLength(value.code.toString(), "utf8") + 1 + calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined);
            } else {
              return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + 1 + 4 + buffer_1.Buffer.byteLength(value.code.toString(), "utf8") + 1;
            }
          } else if (value["_bsontype"] === "Binary") {
            if (value.sub_type === binary_1.Binary.SUBTYPE_BYTE_ARRAY) {
              return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + (value.position + 1 + 4 + 1 + 4);
            } else {
              return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + (value.position + 1 + 4 + 1);
            }
          } else if (value["_bsontype"] === "Symbol") {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + buffer_1.Buffer.byteLength(value.value, "utf8") + 4 + 1 + 1;
          } else if (value["_bsontype"] === "DBRef") {
            var ordered_values = Object.assign({
              $ref: value.collection,
              $id: value.oid
            }, value.fields);
            if (value.db != null) {
              ordered_values["$db"] = value.db;
            }
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + 1 + calculateObjectSize(ordered_values, serializeFunctions, ignoreUndefined);
          } else if (value instanceof RegExp || Object.prototype.toString.call(value) === "[object RegExp]") {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + 1 + buffer_1.Buffer.byteLength(value.source, "utf8") + 1 + (value.global ? 1 : 0) + (value.ignoreCase ? 1 : 0) + (value.multiline ? 1 : 0) + 1;
          } else if (value["_bsontype"] === "BSONRegExp") {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + 1 + buffer_1.Buffer.byteLength(value.pattern, "utf8") + 1 + buffer_1.Buffer.byteLength(value.options, "utf8") + 1;
          } else {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + calculateObjectSize(value, serializeFunctions, ignoreUndefined) + 1;
          }
        case "function":
          if (value instanceof RegExp || Object.prototype.toString.call(value) === "[object RegExp]" || String.call(value) === "[object RegExp]") {
            return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + 1 + buffer_1.Buffer.byteLength(value.source, "utf8") + 1 + (value.global ? 1 : 0) + (value.ignoreCase ? 1 : 0) + (value.multiline ? 1 : 0) + 1;
          } else {
            if (serializeFunctions && value.scope != null && Object.keys(value.scope).length > 0) {
              return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + 1 + 4 + 4 + buffer_1.Buffer.byteLength(utils_1.normalizedFunctionString(value), "utf8") + 1 + calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined);
            } else if (serializeFunctions) {
              return (name != null ? buffer_1.Buffer.byteLength(name, "utf8") + 1 : 0) + 1 + 4 + buffer_1.Buffer.byteLength(utils_1.normalizedFunctionString(value), "utf8") + 1;
            }
          }
      }
      return 0;
    }
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/validate_utf8.js
var require_validate_utf8 = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/validate_utf8.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.validateUtf8 = void 0;
    var FIRST_BIT = 128;
    var FIRST_TWO_BITS = 192;
    var FIRST_THREE_BITS = 224;
    var FIRST_FOUR_BITS = 240;
    var FIRST_FIVE_BITS = 248;
    var TWO_BIT_CHAR = 192;
    var THREE_BIT_CHAR = 224;
    var FOUR_BIT_CHAR = 240;
    var CONTINUING_CHAR = 128;
    function validateUtf8(bytes, start, end) {
      var continuation = 0;
      for (var i = start; i < end; i += 1) {
        var byte = bytes[i];
        if (continuation) {
          if ((byte & FIRST_TWO_BITS) !== CONTINUING_CHAR) {
            return false;
          }
          continuation -= 1;
        } else if (byte & FIRST_BIT) {
          if ((byte & FIRST_THREE_BITS) === TWO_BIT_CHAR) {
            continuation = 1;
          } else if ((byte & FIRST_FOUR_BITS) === THREE_BIT_CHAR) {
            continuation = 2;
          } else if ((byte & FIRST_FIVE_BITS) === FOUR_BIT_CHAR) {
            continuation = 3;
          } else {
            return false;
          }
        }
      }
      return !continuation;
    }
    exports.validateUtf8 = validateUtf8;
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/parser/deserializer.js
var require_deserializer = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/parser/deserializer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.deserialize = void 0;
    var buffer_1 = require("buffer");
    var binary_1 = require_binary();
    var code_1 = require_code();
    var constants = require_constants();
    var db_ref_1 = require_db_ref();
    var decimal128_1 = require_decimal128();
    var double_1 = require_double();
    var int_32_1 = require_int_32();
    var long_1 = require_long();
    var max_key_1 = require_max_key();
    var min_key_1 = require_min_key();
    var objectid_1 = require_objectid();
    var regexp_1 = require_regexp();
    var symbol_1 = require_symbol();
    var timestamp_1 = require_timestamp();
    var validate_utf8_1 = require_validate_utf8();
    var JS_INT_MAX_LONG = long_1.Long.fromNumber(constants.JS_INT_MAX);
    var JS_INT_MIN_LONG = long_1.Long.fromNumber(constants.JS_INT_MIN);
    var functionCache = {};
    function deserialize(buffer, options2, isArray) {
      options2 = options2 == null ? {} : options2;
      var index2 = options2 && options2.index ? options2.index : 0;
      var size = buffer[index2] | buffer[index2 + 1] << 8 | buffer[index2 + 2] << 16 | buffer[index2 + 3] << 24;
      if (size < 5) {
        throw new Error("bson size must be >= 5, is " + size);
      }
      if (options2.allowObjectSmallerThanBufferSize && buffer.length < size) {
        throw new Error("buffer length " + buffer.length + " must be >= bson size " + size);
      }
      if (!options2.allowObjectSmallerThanBufferSize && buffer.length !== size) {
        throw new Error("buffer length " + buffer.length + " must === bson size " + size);
      }
      if (size + index2 > buffer.byteLength) {
        throw new Error("(bson size " + size + " + options.index " + index2 + " must be <= buffer length " + buffer.byteLength + ")");
      }
      if (buffer[index2 + size - 1] !== 0) {
        throw new Error("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
      }
      return deserializeObject(buffer, index2, options2, isArray);
    }
    exports.deserialize = deserialize;
    function deserializeObject(buffer, index2, options2, isArray) {
      if (isArray === void 0) {
        isArray = false;
      }
      var evalFunctions = options2["evalFunctions"] == null ? false : options2["evalFunctions"];
      var cacheFunctions = options2["cacheFunctions"] == null ? false : options2["cacheFunctions"];
      var fieldsAsRaw = options2["fieldsAsRaw"] == null ? null : options2["fieldsAsRaw"];
      var raw = options2["raw"] == null ? false : options2["raw"];
      var bsonRegExp = typeof options2["bsonRegExp"] === "boolean" ? options2["bsonRegExp"] : false;
      var promoteBuffers = options2["promoteBuffers"] == null ? false : options2["promoteBuffers"];
      var promoteLongs = options2["promoteLongs"] == null ? true : options2["promoteLongs"];
      var promoteValues = options2["promoteValues"] == null ? true : options2["promoteValues"];
      var startIndex = index2;
      if (buffer.length < 5)
        throw new Error("corrupt bson message < 5 bytes long");
      var size = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
      if (size < 5 || size > buffer.length)
        throw new Error("corrupt bson message");
      var object = isArray ? [] : {};
      var arrayIndex = 0;
      var done = false;
      while (!done) {
        var elementType = buffer[index2++];
        if (elementType === 0)
          break;
        var i = index2;
        while (buffer[i] !== 0 && i < buffer.length) {
          i++;
        }
        if (i >= buffer.byteLength)
          throw new Error("Bad BSON Document: illegal CString");
        var name = isArray ? arrayIndex++ : buffer.toString("utf8", index2, i);
        index2 = i + 1;
        if (elementType === constants.BSON_DATA_STRING) {
          var stringSize = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          if (stringSize <= 0 || stringSize > buffer.length - index2 || buffer[index2 + stringSize - 1] !== 0)
            throw new Error("bad string length in bson");
          if (!validate_utf8_1.validateUtf8(buffer, index2, index2 + stringSize - 1)) {
            throw new Error("Invalid UTF-8 string in BSON document");
          }
          var s2 = buffer.toString("utf8", index2, index2 + stringSize - 1);
          object[name] = s2;
          index2 = index2 + stringSize;
        } else if (elementType === constants.BSON_DATA_OID) {
          var oid = buffer_1.Buffer.alloc(12);
          buffer.copy(oid, 0, index2, index2 + 12);
          object[name] = new objectid_1.ObjectId(oid);
          index2 = index2 + 12;
        } else if (elementType === constants.BSON_DATA_INT && promoteValues === false) {
          object[name] = new int_32_1.Int32(buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24);
        } else if (elementType === constants.BSON_DATA_INT) {
          object[name] = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
        } else if (elementType === constants.BSON_DATA_NUMBER && promoteValues === false) {
          object[name] = new double_1.Double(buffer.readDoubleLE(index2));
          index2 = index2 + 8;
        } else if (elementType === constants.BSON_DATA_NUMBER) {
          object[name] = buffer.readDoubleLE(index2);
          index2 = index2 + 8;
        } else if (elementType === constants.BSON_DATA_DATE) {
          var lowBits = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          var highBits = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          object[name] = new Date(new long_1.Long(lowBits, highBits).toNumber());
        } else if (elementType === constants.BSON_DATA_BOOLEAN) {
          if (buffer[index2] !== 0 && buffer[index2] !== 1)
            throw new Error("illegal boolean type value");
          object[name] = buffer[index2++] === 1;
        } else if (elementType === constants.BSON_DATA_OBJECT) {
          var _index = index2;
          var objectSize = buffer[index2] | buffer[index2 + 1] << 8 | buffer[index2 + 2] << 16 | buffer[index2 + 3] << 24;
          if (objectSize <= 0 || objectSize > buffer.length - index2)
            throw new Error("bad embedded document length in bson");
          if (raw) {
            object[name] = buffer.slice(index2, index2 + objectSize);
          } else {
            object[name] = deserializeObject(buffer, _index, options2, false);
          }
          index2 = index2 + objectSize;
        } else if (elementType === constants.BSON_DATA_ARRAY) {
          var _index = index2;
          var objectSize = buffer[index2] | buffer[index2 + 1] << 8 | buffer[index2 + 2] << 16 | buffer[index2 + 3] << 24;
          var arrayOptions = options2;
          var stopIndex = index2 + objectSize;
          if (fieldsAsRaw && fieldsAsRaw[name]) {
            arrayOptions = {};
            for (var n in options2) {
              arrayOptions[n] = options2[n];
            }
            arrayOptions["raw"] = true;
          }
          object[name] = deserializeObject(buffer, _index, arrayOptions, true);
          index2 = index2 + objectSize;
          if (buffer[index2 - 1] !== 0)
            throw new Error("invalid array terminator byte");
          if (index2 !== stopIndex)
            throw new Error("corrupted array bson");
        } else if (elementType === constants.BSON_DATA_UNDEFINED) {
          object[name] = void 0;
        } else if (elementType === constants.BSON_DATA_NULL) {
          object[name] = null;
        } else if (elementType === constants.BSON_DATA_LONG) {
          var lowBits = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          var highBits = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          var long = new long_1.Long(lowBits, highBits);
          if (promoteLongs && promoteValues === true) {
            object[name] = long.lessThanOrEqual(JS_INT_MAX_LONG) && long.greaterThanOrEqual(JS_INT_MIN_LONG) ? long.toNumber() : long;
          } else {
            object[name] = long;
          }
        } else if (elementType === constants.BSON_DATA_DECIMAL128) {
          var bytes = buffer_1.Buffer.alloc(16);
          buffer.copy(bytes, 0, index2, index2 + 16);
          index2 = index2 + 16;
          var decimal128 = new decimal128_1.Decimal128(bytes);
          if ("toObject" in decimal128 && typeof decimal128.toObject === "function") {
            object[name] = decimal128.toObject();
          } else {
            object[name] = decimal128;
          }
        } else if (elementType === constants.BSON_DATA_BINARY) {
          var binarySize = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          var totalBinarySize = binarySize;
          var subType = buffer[index2++];
          if (binarySize < 0)
            throw new Error("Negative binary type element size found");
          if (binarySize > buffer.byteLength)
            throw new Error("Binary type size larger than document size");
          if (buffer["slice"] != null) {
            if (subType === binary_1.Binary.SUBTYPE_BYTE_ARRAY) {
              binarySize = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
              if (binarySize < 0)
                throw new Error("Negative binary type element size found for subtype 0x02");
              if (binarySize > totalBinarySize - 4)
                throw new Error("Binary type with subtype 0x02 contains too long binary size");
              if (binarySize < totalBinarySize - 4)
                throw new Error("Binary type with subtype 0x02 contains too short binary size");
            }
            if (promoteBuffers && promoteValues) {
              object[name] = buffer.slice(index2, index2 + binarySize);
            } else {
              object[name] = new binary_1.Binary(buffer.slice(index2, index2 + binarySize), subType);
            }
          } else {
            var _buffer = buffer_1.Buffer.alloc(binarySize);
            if (subType === binary_1.Binary.SUBTYPE_BYTE_ARRAY) {
              binarySize = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
              if (binarySize < 0)
                throw new Error("Negative binary type element size found for subtype 0x02");
              if (binarySize > totalBinarySize - 4)
                throw new Error("Binary type with subtype 0x02 contains too long binary size");
              if (binarySize < totalBinarySize - 4)
                throw new Error("Binary type with subtype 0x02 contains too short binary size");
            }
            for (i = 0; i < binarySize; i++) {
              _buffer[i] = buffer[index2 + i];
            }
            if (promoteBuffers && promoteValues) {
              object[name] = _buffer;
            } else {
              object[name] = new binary_1.Binary(_buffer, subType);
            }
          }
          index2 = index2 + binarySize;
        } else if (elementType === constants.BSON_DATA_REGEXP && bsonRegExp === false) {
          i = index2;
          while (buffer[i] !== 0 && i < buffer.length) {
            i++;
          }
          if (i >= buffer.length)
            throw new Error("Bad BSON Document: illegal CString");
          var source = buffer.toString("utf8", index2, i);
          index2 = i + 1;
          i = index2;
          while (buffer[i] !== 0 && i < buffer.length) {
            i++;
          }
          if (i >= buffer.length)
            throw new Error("Bad BSON Document: illegal CString");
          var regExpOptions = buffer.toString("utf8", index2, i);
          index2 = i + 1;
          var optionsArray = new Array(regExpOptions.length);
          for (i = 0; i < regExpOptions.length; i++) {
            switch (regExpOptions[i]) {
              case "m":
                optionsArray[i] = "m";
                break;
              case "s":
                optionsArray[i] = "g";
                break;
              case "i":
                optionsArray[i] = "i";
                break;
            }
          }
          object[name] = new RegExp(source, optionsArray.join(""));
        } else if (elementType === constants.BSON_DATA_REGEXP && bsonRegExp === true) {
          i = index2;
          while (buffer[i] !== 0 && i < buffer.length) {
            i++;
          }
          if (i >= buffer.length)
            throw new Error("Bad BSON Document: illegal CString");
          var source = buffer.toString("utf8", index2, i);
          index2 = i + 1;
          i = index2;
          while (buffer[i] !== 0 && i < buffer.length) {
            i++;
          }
          if (i >= buffer.length)
            throw new Error("Bad BSON Document: illegal CString");
          var regExpOptions = buffer.toString("utf8", index2, i);
          index2 = i + 1;
          object[name] = new regexp_1.BSONRegExp(source, regExpOptions);
        } else if (elementType === constants.BSON_DATA_SYMBOL) {
          var stringSize = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          if (stringSize <= 0 || stringSize > buffer.length - index2 || buffer[index2 + stringSize - 1] !== 0)
            throw new Error("bad string length in bson");
          var symbol = buffer.toString("utf8", index2, index2 + stringSize - 1);
          object[name] = promoteValues ? symbol : new symbol_1.BSONSymbol(symbol);
          index2 = index2 + stringSize;
        } else if (elementType === constants.BSON_DATA_TIMESTAMP) {
          var lowBits = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          var highBits = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          object[name] = new timestamp_1.Timestamp(lowBits, highBits);
        } else if (elementType === constants.BSON_DATA_MIN_KEY) {
          object[name] = new min_key_1.MinKey();
        } else if (elementType === constants.BSON_DATA_MAX_KEY) {
          object[name] = new max_key_1.MaxKey();
        } else if (elementType === constants.BSON_DATA_CODE) {
          var stringSize = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          if (stringSize <= 0 || stringSize > buffer.length - index2 || buffer[index2 + stringSize - 1] !== 0)
            throw new Error("bad string length in bson");
          var functionString = buffer.toString("utf8", index2, index2 + stringSize - 1);
          if (evalFunctions) {
            if (cacheFunctions) {
              object[name] = isolateEval(functionString, functionCache, object);
            } else {
              object[name] = isolateEval(functionString);
            }
          } else {
            object[name] = new code_1.Code(functionString);
          }
          index2 = index2 + stringSize;
        } else if (elementType === constants.BSON_DATA_CODE_W_SCOPE) {
          var totalSize = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          if (totalSize < 4 + 4 + 4 + 1) {
            throw new Error("code_w_scope total size shorter minimum expected length");
          }
          var stringSize = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          if (stringSize <= 0 || stringSize > buffer.length - index2 || buffer[index2 + stringSize - 1] !== 0)
            throw new Error("bad string length in bson");
          var functionString = buffer.toString("utf8", index2, index2 + stringSize - 1);
          index2 = index2 + stringSize;
          var _index = index2;
          var objectSize = buffer[index2] | buffer[index2 + 1] << 8 | buffer[index2 + 2] << 16 | buffer[index2 + 3] << 24;
          var scopeObject = deserializeObject(buffer, _index, options2, false);
          index2 = index2 + objectSize;
          if (totalSize < 4 + 4 + objectSize + stringSize) {
            throw new Error("code_w_scope total size is too short, truncating scope");
          }
          if (totalSize > 4 + 4 + objectSize + stringSize) {
            throw new Error("code_w_scope total size is too long, clips outer document");
          }
          if (evalFunctions) {
            if (cacheFunctions) {
              object[name] = isolateEval(functionString, functionCache, object);
            } else {
              object[name] = isolateEval(functionString);
            }
            object[name].scope = scopeObject;
          } else {
            object[name] = new code_1.Code(functionString, scopeObject);
          }
        } else if (elementType === constants.BSON_DATA_DBPOINTER) {
          var stringSize = buffer[index2++] | buffer[index2++] << 8 | buffer[index2++] << 16 | buffer[index2++] << 24;
          if (stringSize <= 0 || stringSize > buffer.length - index2 || buffer[index2 + stringSize - 1] !== 0)
            throw new Error("bad string length in bson");
          if (!validate_utf8_1.validateUtf8(buffer, index2, index2 + stringSize - 1)) {
            throw new Error("Invalid UTF-8 string in BSON document");
          }
          var namespace = buffer.toString("utf8", index2, index2 + stringSize - 1);
          index2 = index2 + stringSize;
          var oidBuffer = buffer_1.Buffer.alloc(12);
          buffer.copy(oidBuffer, 0, index2, index2 + 12);
          var oid = new objectid_1.ObjectId(oidBuffer);
          index2 = index2 + 12;
          object[name] = new db_ref_1.DBRef(namespace, oid);
        } else {
          throw new Error("Detected unknown BSON type " + elementType.toString(16) + ' for fieldname "' + name + '"');
        }
      }
      if (size !== index2 - startIndex) {
        if (isArray)
          throw new Error("corrupt array bson");
        throw new Error("corrupt object bson");
      }
      var dollarKeys = Object.keys(object).filter(function(k) {
        return k.startsWith("$");
      });
      var valid = true;
      dollarKeys.forEach(function(k) {
        if (["$ref", "$id", "$db"].indexOf(k) === -1)
          valid = false;
      });
      if (!valid)
        return object;
      if (db_ref_1.isDBRefLike(object)) {
        var copy = Object.assign({}, object);
        delete copy.$ref;
        delete copy.$id;
        delete copy.$db;
        return new db_ref_1.DBRef(object.$ref, object.$id, object.$db, copy);
      }
      return object;
    }
    function isolateEval(functionString, functionCache2, object) {
      if (!functionCache2)
        return new Function(functionString);
      if (functionCache2[functionString] == null) {
        functionCache2[functionString] = new Function(functionString);
      }
      return functionCache2[functionString].bind(object);
    }
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/float_parser.js
var require_float_parser = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/float_parser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.writeIEEE754 = exports.readIEEE754 = void 0;
    function readIEEE754(buffer, offset, endian, mLen, nBytes) {
      var e;
      var m;
      var bBE = endian === "big";
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = bBE ? 0 : nBytes - 1;
      var d = bBE ? 1 : -1;
      var s2 = buffer[offset + i];
      i += d;
      e = s2 & (1 << -nBits) - 1;
      s2 >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8)
        ;
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8)
        ;
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s2 ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s2 ? -1 : 1) * m * Math.pow(2, e - mLen);
    }
    exports.readIEEE754 = readIEEE754;
    function writeIEEE754(buffer, value, offset, endian, mLen, nBytes) {
      var e;
      var m;
      var c;
      var bBE = endian === "big";
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = bBE ? nBytes - 1 : 0;
      var d = bBE ? -1 : 1;
      var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      if (isNaN(value))
        m = 0;
      while (mLen >= 8) {
        buffer[offset + i] = m & 255;
        i += d;
        m /= 256;
        mLen -= 8;
      }
      e = e << mLen | m;
      if (isNaN(value))
        e += 8;
      eLen += mLen;
      while (eLen > 0) {
        buffer[offset + i] = e & 255;
        i += d;
        e /= 256;
        eLen -= 8;
      }
      buffer[offset + i - d] |= s2 * 128;
    }
    exports.writeIEEE754 = writeIEEE754;
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/parser/serializer.js
var require_serializer = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/parser/serializer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.serializeInto = void 0;
    var binary_1 = require_binary();
    var constants = require_constants();
    var ensure_buffer_1 = require_ensure_buffer();
    var extended_json_1 = require_extended_json();
    var float_parser_1 = require_float_parser();
    var long_1 = require_long();
    var map_1 = require_map();
    var utils_1 = require_utils();
    var regexp = /\x00/;
    var ignoreKeys = new Set(["$db", "$ref", "$id", "$clusterTime"]);
    function isRegExp(d) {
      return Object.prototype.toString.call(d) === "[object RegExp]";
    }
    function serializeString(buffer, key, value, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_STRING;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes + 1;
      buffer[index2 - 1] = 0;
      var size = buffer.write(value, index2 + 4, void 0, "utf8");
      buffer[index2 + 3] = size + 1 >> 24 & 255;
      buffer[index2 + 2] = size + 1 >> 16 & 255;
      buffer[index2 + 1] = size + 1 >> 8 & 255;
      buffer[index2] = size + 1 & 255;
      index2 = index2 + 4 + size;
      buffer[index2++] = 0;
      return index2;
    }
    function serializeNumber(buffer, key, value, index2, isArray) {
      if (Number.isInteger(value) && value >= constants.BSON_INT32_MIN && value <= constants.BSON_INT32_MAX) {
        buffer[index2++] = constants.BSON_DATA_INT;
        var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
        index2 = index2 + numberOfWrittenBytes;
        buffer[index2++] = 0;
        buffer[index2++] = value & 255;
        buffer[index2++] = value >> 8 & 255;
        buffer[index2++] = value >> 16 & 255;
        buffer[index2++] = value >> 24 & 255;
      } else {
        buffer[index2++] = constants.BSON_DATA_NUMBER;
        var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
        index2 = index2 + numberOfWrittenBytes;
        buffer[index2++] = 0;
        float_parser_1.writeIEEE754(buffer, value, index2, "little", 52, 8);
        index2 = index2 + 8;
      }
      return index2;
    }
    function serializeNull(buffer, key, _, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_NULL;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      return index2;
    }
    function serializeBoolean(buffer, key, value, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_BOOLEAN;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      buffer[index2++] = value ? 1 : 0;
      return index2;
    }
    function serializeDate(buffer, key, value, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_DATE;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      var dateInMilis = long_1.Long.fromNumber(value.getTime());
      var lowBits = dateInMilis.getLowBits();
      var highBits = dateInMilis.getHighBits();
      buffer[index2++] = lowBits & 255;
      buffer[index2++] = lowBits >> 8 & 255;
      buffer[index2++] = lowBits >> 16 & 255;
      buffer[index2++] = lowBits >> 24 & 255;
      buffer[index2++] = highBits & 255;
      buffer[index2++] = highBits >> 8 & 255;
      buffer[index2++] = highBits >> 16 & 255;
      buffer[index2++] = highBits >> 24 & 255;
      return index2;
    }
    function serializeRegExp(buffer, key, value, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_REGEXP;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      if (value.source && value.source.match(regexp) != null) {
        throw Error("value " + value.source + " must not contain null bytes");
      }
      index2 = index2 + buffer.write(value.source, index2, void 0, "utf8");
      buffer[index2++] = 0;
      if (value.ignoreCase)
        buffer[index2++] = 105;
      if (value.global)
        buffer[index2++] = 115;
      if (value.multiline)
        buffer[index2++] = 109;
      buffer[index2++] = 0;
      return index2;
    }
    function serializeBSONRegExp(buffer, key, value, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_REGEXP;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      if (value.pattern.match(regexp) != null) {
        throw Error("pattern " + value.pattern + " must not contain null bytes");
      }
      index2 = index2 + buffer.write(value.pattern, index2, void 0, "utf8");
      buffer[index2++] = 0;
      index2 = index2 + buffer.write(value.options.split("").sort().join(""), index2, void 0, "utf8");
      buffer[index2++] = 0;
      return index2;
    }
    function serializeMinMax(buffer, key, value, index2, isArray) {
      if (value === null) {
        buffer[index2++] = constants.BSON_DATA_NULL;
      } else if (value._bsontype === "MinKey") {
        buffer[index2++] = constants.BSON_DATA_MIN_KEY;
      } else {
        buffer[index2++] = constants.BSON_DATA_MAX_KEY;
      }
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      return index2;
    }
    function serializeObjectId(buffer, key, value, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_OID;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      if (typeof value.id === "string") {
        buffer.write(value.id, index2, void 0, "binary");
      } else if (value.id && value.id.copy) {
        value.id.copy(buffer, index2, 0, 12);
      } else {
        throw new TypeError("object [" + JSON.stringify(value) + "] is not a valid ObjectId");
      }
      return index2 + 12;
    }
    function serializeBuffer(buffer, key, value, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_BINARY;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      var size = value.length;
      buffer[index2++] = size & 255;
      buffer[index2++] = size >> 8 & 255;
      buffer[index2++] = size >> 16 & 255;
      buffer[index2++] = size >> 24 & 255;
      buffer[index2++] = constants.BSON_BINARY_SUBTYPE_DEFAULT;
      buffer.set(ensure_buffer_1.ensureBuffer(value), index2);
      index2 = index2 + size;
      return index2;
    }
    function serializeObject(buffer, key, value, index2, checkKeys, depth, serializeFunctions, ignoreUndefined, isArray, path) {
      if (checkKeys === void 0) {
        checkKeys = false;
      }
      if (depth === void 0) {
        depth = 0;
      }
      if (serializeFunctions === void 0) {
        serializeFunctions = false;
      }
      if (ignoreUndefined === void 0) {
        ignoreUndefined = true;
      }
      if (isArray === void 0) {
        isArray = false;
      }
      if (path === void 0) {
        path = [];
      }
      for (var i = 0; i < path.length; i++) {
        if (path[i] === value)
          throw new Error("cyclic dependency detected");
      }
      path.push(value);
      buffer[index2++] = Array.isArray(value) ? constants.BSON_DATA_ARRAY : constants.BSON_DATA_OBJECT;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      var endIndex = serializeInto(buffer, value, checkKeys, index2, depth + 1, serializeFunctions, ignoreUndefined, path);
      path.pop();
      return endIndex;
    }
    function serializeDecimal128(buffer, key, value, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_DECIMAL128;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      value.bytes.copy(buffer, index2, 0, 16);
      return index2 + 16;
    }
    function serializeLong(buffer, key, value, index2, isArray) {
      buffer[index2++] = value._bsontype === "Long" ? constants.BSON_DATA_LONG : constants.BSON_DATA_TIMESTAMP;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      var lowBits = value.getLowBits();
      var highBits = value.getHighBits();
      buffer[index2++] = lowBits & 255;
      buffer[index2++] = lowBits >> 8 & 255;
      buffer[index2++] = lowBits >> 16 & 255;
      buffer[index2++] = lowBits >> 24 & 255;
      buffer[index2++] = highBits & 255;
      buffer[index2++] = highBits >> 8 & 255;
      buffer[index2++] = highBits >> 16 & 255;
      buffer[index2++] = highBits >> 24 & 255;
      return index2;
    }
    function serializeInt32(buffer, key, value, index2, isArray) {
      value = value.valueOf();
      buffer[index2++] = constants.BSON_DATA_INT;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      buffer[index2++] = value & 255;
      buffer[index2++] = value >> 8 & 255;
      buffer[index2++] = value >> 16 & 255;
      buffer[index2++] = value >> 24 & 255;
      return index2;
    }
    function serializeDouble(buffer, key, value, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_NUMBER;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      float_parser_1.writeIEEE754(buffer, value.value, index2, "little", 52, 8);
      index2 = index2 + 8;
      return index2;
    }
    function serializeFunction(buffer, key, value, index2, _checkKeys, _depth, isArray) {
      if (_checkKeys === void 0) {
        _checkKeys = false;
      }
      if (_depth === void 0) {
        _depth = 0;
      }
      buffer[index2++] = constants.BSON_DATA_CODE;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      var functionString = utils_1.normalizedFunctionString(value);
      var size = buffer.write(functionString, index2 + 4, void 0, "utf8") + 1;
      buffer[index2] = size & 255;
      buffer[index2 + 1] = size >> 8 & 255;
      buffer[index2 + 2] = size >> 16 & 255;
      buffer[index2 + 3] = size >> 24 & 255;
      index2 = index2 + 4 + size - 1;
      buffer[index2++] = 0;
      return index2;
    }
    function serializeCode(buffer, key, value, index2, checkKeys, depth, serializeFunctions, ignoreUndefined, isArray) {
      if (checkKeys === void 0) {
        checkKeys = false;
      }
      if (depth === void 0) {
        depth = 0;
      }
      if (serializeFunctions === void 0) {
        serializeFunctions = false;
      }
      if (ignoreUndefined === void 0) {
        ignoreUndefined = true;
      }
      if (isArray === void 0) {
        isArray = false;
      }
      if (value.scope && typeof value.scope === "object") {
        buffer[index2++] = constants.BSON_DATA_CODE_W_SCOPE;
        var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
        index2 = index2 + numberOfWrittenBytes;
        buffer[index2++] = 0;
        var startIndex = index2;
        var functionString = typeof value.code === "string" ? value.code : value.code.toString();
        index2 = index2 + 4;
        var codeSize = buffer.write(functionString, index2 + 4, void 0, "utf8") + 1;
        buffer[index2] = codeSize & 255;
        buffer[index2 + 1] = codeSize >> 8 & 255;
        buffer[index2 + 2] = codeSize >> 16 & 255;
        buffer[index2 + 3] = codeSize >> 24 & 255;
        buffer[index2 + 4 + codeSize - 1] = 0;
        index2 = index2 + codeSize + 4;
        var endIndex = serializeInto(buffer, value.scope, checkKeys, index2, depth + 1, serializeFunctions, ignoreUndefined);
        index2 = endIndex - 1;
        var totalSize = endIndex - startIndex;
        buffer[startIndex++] = totalSize & 255;
        buffer[startIndex++] = totalSize >> 8 & 255;
        buffer[startIndex++] = totalSize >> 16 & 255;
        buffer[startIndex++] = totalSize >> 24 & 255;
        buffer[index2++] = 0;
      } else {
        buffer[index2++] = constants.BSON_DATA_CODE;
        var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
        index2 = index2 + numberOfWrittenBytes;
        buffer[index2++] = 0;
        var functionString = value.code.toString();
        var size = buffer.write(functionString, index2 + 4, void 0, "utf8") + 1;
        buffer[index2] = size & 255;
        buffer[index2 + 1] = size >> 8 & 255;
        buffer[index2 + 2] = size >> 16 & 255;
        buffer[index2 + 3] = size >> 24 & 255;
        index2 = index2 + 4 + size - 1;
        buffer[index2++] = 0;
      }
      return index2;
    }
    function serializeBinary(buffer, key, value, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_BINARY;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      var data = value.value(true);
      var size = value.position;
      if (value.sub_type === binary_1.Binary.SUBTYPE_BYTE_ARRAY)
        size = size + 4;
      buffer[index2++] = size & 255;
      buffer[index2++] = size >> 8 & 255;
      buffer[index2++] = size >> 16 & 255;
      buffer[index2++] = size >> 24 & 255;
      buffer[index2++] = value.sub_type;
      if (value.sub_type === binary_1.Binary.SUBTYPE_BYTE_ARRAY) {
        size = size - 4;
        buffer[index2++] = size & 255;
        buffer[index2++] = size >> 8 & 255;
        buffer[index2++] = size >> 16 & 255;
        buffer[index2++] = size >> 24 & 255;
      }
      buffer.set(data, index2);
      index2 = index2 + value.position;
      return index2;
    }
    function serializeSymbol(buffer, key, value, index2, isArray) {
      buffer[index2++] = constants.BSON_DATA_SYMBOL;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      var size = buffer.write(value.value, index2 + 4, void 0, "utf8") + 1;
      buffer[index2] = size & 255;
      buffer[index2 + 1] = size >> 8 & 255;
      buffer[index2 + 2] = size >> 16 & 255;
      buffer[index2 + 3] = size >> 24 & 255;
      index2 = index2 + 4 + size - 1;
      buffer[index2++] = 0;
      return index2;
    }
    function serializeDBRef(buffer, key, value, index2, depth, serializeFunctions, isArray) {
      buffer[index2++] = constants.BSON_DATA_OBJECT;
      var numberOfWrittenBytes = !isArray ? buffer.write(key, index2, void 0, "utf8") : buffer.write(key, index2, void 0, "ascii");
      index2 = index2 + numberOfWrittenBytes;
      buffer[index2++] = 0;
      var startIndex = index2;
      var output = {
        $ref: value.collection || value.namespace,
        $id: value.oid
      };
      if (value.db != null) {
        output.$db = value.db;
      }
      output = Object.assign(output, value.fields);
      var endIndex = serializeInto(buffer, output, false, index2, depth + 1, serializeFunctions);
      var size = endIndex - startIndex;
      buffer[startIndex++] = size & 255;
      buffer[startIndex++] = size >> 8 & 255;
      buffer[startIndex++] = size >> 16 & 255;
      buffer[startIndex++] = size >> 24 & 255;
      return endIndex;
    }
    function serializeInto(buffer, object, checkKeys, startingIndex, depth, serializeFunctions, ignoreUndefined, path) {
      if (checkKeys === void 0) {
        checkKeys = false;
      }
      if (startingIndex === void 0) {
        startingIndex = 0;
      }
      if (depth === void 0) {
        depth = 0;
      }
      if (serializeFunctions === void 0) {
        serializeFunctions = false;
      }
      if (ignoreUndefined === void 0) {
        ignoreUndefined = true;
      }
      if (path === void 0) {
        path = [];
      }
      startingIndex = startingIndex || 0;
      path = path || [];
      path.push(object);
      var index2 = startingIndex + 4;
      if (Array.isArray(object)) {
        for (var i = 0; i < object.length; i++) {
          var key = "" + i;
          var value = object[i];
          if (value && value.toBSON) {
            if (typeof value.toBSON !== "function")
              throw new TypeError("toBSON is not a function");
            value = value.toBSON();
          }
          if (typeof value === "string") {
            index2 = serializeString(buffer, key, value, index2, true);
          } else if (typeof value === "number") {
            index2 = serializeNumber(buffer, key, value, index2, true);
          } else if (typeof value === "bigint") {
            throw new TypeError("Unsupported type BigInt, please use Decimal128");
          } else if (typeof value === "boolean") {
            index2 = serializeBoolean(buffer, key, value, index2, true);
          } else if (value instanceof Date || utils_1.isDate(value)) {
            index2 = serializeDate(buffer, key, value, index2, true);
          } else if (value === void 0) {
            index2 = serializeNull(buffer, key, value, index2, true);
          } else if (value === null) {
            index2 = serializeNull(buffer, key, value, index2, true);
          } else if (value["_bsontype"] === "ObjectId" || value["_bsontype"] === "ObjectID") {
            index2 = serializeObjectId(buffer, key, value, index2, true);
          } else if (utils_1.isBuffer(value) || utils_1.isUint8Array(value)) {
            index2 = serializeBuffer(buffer, key, value, index2, true);
          } else if (value instanceof RegExp || isRegExp(value)) {
            index2 = serializeRegExp(buffer, key, value, index2, true);
          } else if (typeof value === "object" && value["_bsontype"] == null) {
            index2 = serializeObject(buffer, key, value, index2, checkKeys, depth, serializeFunctions, ignoreUndefined, true, path);
          } else if (typeof value === "object" && extended_json_1.isBSONType(value) && value._bsontype === "Decimal128") {
            index2 = serializeDecimal128(buffer, key, value, index2, true);
          } else if (value["_bsontype"] === "Long" || value["_bsontype"] === "Timestamp") {
            index2 = serializeLong(buffer, key, value, index2, true);
          } else if (value["_bsontype"] === "Double") {
            index2 = serializeDouble(buffer, key, value, index2, true);
          } else if (typeof value === "function" && serializeFunctions) {
            index2 = serializeFunction(buffer, key, value, index2, checkKeys, depth, true);
          } else if (value["_bsontype"] === "Code") {
            index2 = serializeCode(buffer, key, value, index2, checkKeys, depth, serializeFunctions, ignoreUndefined, true);
          } else if (value["_bsontype"] === "Binary") {
            index2 = serializeBinary(buffer, key, value, index2, true);
          } else if (value["_bsontype"] === "Symbol") {
            index2 = serializeSymbol(buffer, key, value, index2, true);
          } else if (value["_bsontype"] === "DBRef") {
            index2 = serializeDBRef(buffer, key, value, index2, depth, serializeFunctions, true);
          } else if (value["_bsontype"] === "BSONRegExp") {
            index2 = serializeBSONRegExp(buffer, key, value, index2, true);
          } else if (value["_bsontype"] === "Int32") {
            index2 = serializeInt32(buffer, key, value, index2, true);
          } else if (value["_bsontype"] === "MinKey" || value["_bsontype"] === "MaxKey") {
            index2 = serializeMinMax(buffer, key, value, index2, true);
          } else if (typeof value["_bsontype"] !== "undefined") {
            throw new TypeError("Unrecognized or invalid _bsontype: " + value["_bsontype"]);
          }
        }
      } else if (object instanceof map_1.Map) {
        var iterator = object.entries();
        var done = false;
        while (!done) {
          var entry = iterator.next();
          done = !!entry.done;
          if (done)
            continue;
          var key = entry.value[0];
          var value = entry.value[1];
          var type = typeof value;
          if (typeof key === "string" && !ignoreKeys.has(key)) {
            if (key.match(regexp) != null) {
              throw Error("key " + key + " must not contain null bytes");
            }
            if (checkKeys) {
              if (key[0] === "$") {
                throw Error("key " + key + " must not start with '$'");
              } else if (~key.indexOf(".")) {
                throw Error("key " + key + " must not contain '.'");
              }
            }
          }
          if (type === "string") {
            index2 = serializeString(buffer, key, value, index2);
          } else if (type === "number") {
            index2 = serializeNumber(buffer, key, value, index2);
          } else if (type === "bigint" || utils_1.isBigInt64Array(value) || utils_1.isBigUInt64Array(value)) {
            throw new TypeError("Unsupported type BigInt, please use Decimal128");
          } else if (type === "boolean") {
            index2 = serializeBoolean(buffer, key, value, index2);
          } else if (value instanceof Date || utils_1.isDate(value)) {
            index2 = serializeDate(buffer, key, value, index2);
          } else if (value === null || value === void 0 && ignoreUndefined === false) {
            index2 = serializeNull(buffer, key, value, index2);
          } else if (value["_bsontype"] === "ObjectId" || value["_bsontype"] === "ObjectID") {
            index2 = serializeObjectId(buffer, key, value, index2);
          } else if (utils_1.isBuffer(value) || utils_1.isUint8Array(value)) {
            index2 = serializeBuffer(buffer, key, value, index2);
          } else if (value instanceof RegExp || isRegExp(value)) {
            index2 = serializeRegExp(buffer, key, value, index2);
          } else if (type === "object" && value["_bsontype"] == null) {
            index2 = serializeObject(buffer, key, value, index2, checkKeys, depth, serializeFunctions, ignoreUndefined, false, path);
          } else if (type === "object" && value["_bsontype"] === "Decimal128") {
            index2 = serializeDecimal128(buffer, key, value, index2);
          } else if (value["_bsontype"] === "Long" || value["_bsontype"] === "Timestamp") {
            index2 = serializeLong(buffer, key, value, index2);
          } else if (value["_bsontype"] === "Double") {
            index2 = serializeDouble(buffer, key, value, index2);
          } else if (value["_bsontype"] === "Code") {
            index2 = serializeCode(buffer, key, value, index2, checkKeys, depth, serializeFunctions, ignoreUndefined);
          } else if (typeof value === "function" && serializeFunctions) {
            index2 = serializeFunction(buffer, key, value, index2, checkKeys, depth, serializeFunctions);
          } else if (value["_bsontype"] === "Binary") {
            index2 = serializeBinary(buffer, key, value, index2);
          } else if (value["_bsontype"] === "Symbol") {
            index2 = serializeSymbol(buffer, key, value, index2);
          } else if (value["_bsontype"] === "DBRef") {
            index2 = serializeDBRef(buffer, key, value, index2, depth, serializeFunctions);
          } else if (value["_bsontype"] === "BSONRegExp") {
            index2 = serializeBSONRegExp(buffer, key, value, index2);
          } else if (value["_bsontype"] === "Int32") {
            index2 = serializeInt32(buffer, key, value, index2);
          } else if (value["_bsontype"] === "MinKey" || value["_bsontype"] === "MaxKey") {
            index2 = serializeMinMax(buffer, key, value, index2);
          } else if (typeof value["_bsontype"] !== "undefined") {
            throw new TypeError("Unrecognized or invalid _bsontype: " + value["_bsontype"]);
          }
        }
      } else {
        if (object.toBSON) {
          if (typeof object.toBSON !== "function")
            throw new TypeError("toBSON is not a function");
          object = object.toBSON();
          if (object != null && typeof object !== "object")
            throw new TypeError("toBSON function did not return an object");
        }
        for (var key in object) {
          var value = object[key];
          if (value && value.toBSON) {
            if (typeof value.toBSON !== "function")
              throw new TypeError("toBSON is not a function");
            value = value.toBSON();
          }
          var type = typeof value;
          if (typeof key === "string" && !ignoreKeys.has(key)) {
            if (key.match(regexp) != null) {
              throw Error("key " + key + " must not contain null bytes");
            }
            if (checkKeys) {
              if (key[0] === "$") {
                throw Error("key " + key + " must not start with '$'");
              } else if (~key.indexOf(".")) {
                throw Error("key " + key + " must not contain '.'");
              }
            }
          }
          if (type === "string") {
            index2 = serializeString(buffer, key, value, index2);
          } else if (type === "number") {
            index2 = serializeNumber(buffer, key, value, index2);
          } else if (type === "bigint") {
            throw new TypeError("Unsupported type BigInt, please use Decimal128");
          } else if (type === "boolean") {
            index2 = serializeBoolean(buffer, key, value, index2);
          } else if (value instanceof Date || utils_1.isDate(value)) {
            index2 = serializeDate(buffer, key, value, index2);
          } else if (value === void 0) {
            if (ignoreUndefined === false)
              index2 = serializeNull(buffer, key, value, index2);
          } else if (value === null) {
            index2 = serializeNull(buffer, key, value, index2);
          } else if (value["_bsontype"] === "ObjectId" || value["_bsontype"] === "ObjectID") {
            index2 = serializeObjectId(buffer, key, value, index2);
          } else if (utils_1.isBuffer(value) || utils_1.isUint8Array(value)) {
            index2 = serializeBuffer(buffer, key, value, index2);
          } else if (value instanceof RegExp || isRegExp(value)) {
            index2 = serializeRegExp(buffer, key, value, index2);
          } else if (type === "object" && value["_bsontype"] == null) {
            index2 = serializeObject(buffer, key, value, index2, checkKeys, depth, serializeFunctions, ignoreUndefined, false, path);
          } else if (type === "object" && value["_bsontype"] === "Decimal128") {
            index2 = serializeDecimal128(buffer, key, value, index2);
          } else if (value["_bsontype"] === "Long" || value["_bsontype"] === "Timestamp") {
            index2 = serializeLong(buffer, key, value, index2);
          } else if (value["_bsontype"] === "Double") {
            index2 = serializeDouble(buffer, key, value, index2);
          } else if (value["_bsontype"] === "Code") {
            index2 = serializeCode(buffer, key, value, index2, checkKeys, depth, serializeFunctions, ignoreUndefined);
          } else if (typeof value === "function" && serializeFunctions) {
            index2 = serializeFunction(buffer, key, value, index2, checkKeys, depth, serializeFunctions);
          } else if (value["_bsontype"] === "Binary") {
            index2 = serializeBinary(buffer, key, value, index2);
          } else if (value["_bsontype"] === "Symbol") {
            index2 = serializeSymbol(buffer, key, value, index2);
          } else if (value["_bsontype"] === "DBRef") {
            index2 = serializeDBRef(buffer, key, value, index2, depth, serializeFunctions);
          } else if (value["_bsontype"] === "BSONRegExp") {
            index2 = serializeBSONRegExp(buffer, key, value, index2);
          } else if (value["_bsontype"] === "Int32") {
            index2 = serializeInt32(buffer, key, value, index2);
          } else if (value["_bsontype"] === "MinKey" || value["_bsontype"] === "MaxKey") {
            index2 = serializeMinMax(buffer, key, value, index2);
          } else if (typeof value["_bsontype"] !== "undefined") {
            throw new TypeError("Unrecognized or invalid _bsontype: " + value["_bsontype"]);
          }
        }
      }
      path.pop();
      buffer[index2++] = 0;
      var size = index2 - startingIndex;
      buffer[startingIndex++] = size & 255;
      buffer[startingIndex++] = size >> 8 & 255;
      buffer[startingIndex++] = size >> 16 & 255;
      buffer[startingIndex++] = size >> 24 & 255;
      return index2;
    }
    exports.serializeInto = serializeInto;
  }
});

// node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/bson.js
var require_bson = __commonJS({
  "node_modules/.pnpm/bson@4.3.0/node_modules/bson/lib/bson.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.ObjectID = exports.Decimal128 = exports.BSONRegExp = exports.MaxKey = exports.MinKey = exports.Int32 = exports.Double = exports.Timestamp = exports.Long = exports.UUID = exports.ObjectId = exports.Binary = exports.DBRef = exports.BSONSymbol = exports.Map = exports.Code = exports.LongWithoutOverridesClass = exports.EJSON = exports.BSON_INT64_MIN = exports.BSON_INT64_MAX = exports.BSON_INT32_MIN = exports.BSON_INT32_MAX = exports.BSON_DATA_UNDEFINED = exports.BSON_DATA_TIMESTAMP = exports.BSON_DATA_SYMBOL = exports.BSON_DATA_STRING = exports.BSON_DATA_REGEXP = exports.BSON_DATA_OID = exports.BSON_DATA_OBJECT = exports.BSON_DATA_NUMBER = exports.BSON_DATA_NULL = exports.BSON_DATA_MIN_KEY = exports.BSON_DATA_MAX_KEY = exports.BSON_DATA_LONG = exports.BSON_DATA_INT = exports.BSON_DATA_DECIMAL128 = exports.BSON_DATA_DBPOINTER = exports.BSON_DATA_DATE = exports.BSON_DATA_CODE_W_SCOPE = exports.BSON_DATA_CODE = exports.BSON_DATA_BOOLEAN = exports.BSON_DATA_BINARY = exports.BSON_DATA_ARRAY = exports.BSON_BINARY_SUBTYPE_UUID_NEW = exports.BSON_BINARY_SUBTYPE_UUID = exports.BSON_BINARY_SUBTYPE_USER_DEFINED = exports.BSON_BINARY_SUBTYPE_MD5 = exports.BSON_BINARY_SUBTYPE_FUNCTION = exports.BSON_BINARY_SUBTYPE_DEFAULT = exports.BSON_BINARY_SUBTYPE_BYTE_ARRAY = void 0;
    exports.deserializeStream = exports.calculateObjectSize = exports.deserialize = exports.serializeWithBufferAndIndex = exports.serialize = exports.setInternalBufferSize = void 0;
    var buffer_1 = require("buffer");
    var binary_1 = require_binary();
    Object.defineProperty(exports, "Binary", {enumerable: true, get: function() {
      return binary_1.Binary;
    }});
    var code_1 = require_code();
    Object.defineProperty(exports, "Code", {enumerable: true, get: function() {
      return code_1.Code;
    }});
    var db_ref_1 = require_db_ref();
    Object.defineProperty(exports, "DBRef", {enumerable: true, get: function() {
      return db_ref_1.DBRef;
    }});
    var decimal128_1 = require_decimal128();
    Object.defineProperty(exports, "Decimal128", {enumerable: true, get: function() {
      return decimal128_1.Decimal128;
    }});
    var double_1 = require_double();
    Object.defineProperty(exports, "Double", {enumerable: true, get: function() {
      return double_1.Double;
    }});
    var ensure_buffer_1 = require_ensure_buffer();
    var extended_json_1 = require_extended_json();
    var int_32_1 = require_int_32();
    Object.defineProperty(exports, "Int32", {enumerable: true, get: function() {
      return int_32_1.Int32;
    }});
    var long_1 = require_long();
    Object.defineProperty(exports, "Long", {enumerable: true, get: function() {
      return long_1.Long;
    }});
    var map_1 = require_map();
    Object.defineProperty(exports, "Map", {enumerable: true, get: function() {
      return map_1.Map;
    }});
    var max_key_1 = require_max_key();
    Object.defineProperty(exports, "MaxKey", {enumerable: true, get: function() {
      return max_key_1.MaxKey;
    }});
    var min_key_1 = require_min_key();
    Object.defineProperty(exports, "MinKey", {enumerable: true, get: function() {
      return min_key_1.MinKey;
    }});
    var objectid_1 = require_objectid();
    Object.defineProperty(exports, "ObjectId", {enumerable: true, get: function() {
      return objectid_1.ObjectId;
    }});
    Object.defineProperty(exports, "ObjectID", {enumerable: true, get: function() {
      return objectid_1.ObjectId;
    }});
    var calculate_size_1 = require_calculate_size();
    var deserializer_1 = require_deserializer();
    var serializer_1 = require_serializer();
    var regexp_1 = require_regexp();
    Object.defineProperty(exports, "BSONRegExp", {enumerable: true, get: function() {
      return regexp_1.BSONRegExp;
    }});
    var symbol_1 = require_symbol();
    Object.defineProperty(exports, "BSONSymbol", {enumerable: true, get: function() {
      return symbol_1.BSONSymbol;
    }});
    var timestamp_1 = require_timestamp();
    Object.defineProperty(exports, "Timestamp", {enumerable: true, get: function() {
      return timestamp_1.Timestamp;
    }});
    var uuid_1 = require_uuid();
    Object.defineProperty(exports, "UUID", {enumerable: true, get: function() {
      return uuid_1.UUID;
    }});
    var constants_1 = require_constants();
    Object.defineProperty(exports, "BSON_BINARY_SUBTYPE_BYTE_ARRAY", {enumerable: true, get: function() {
      return constants_1.BSON_BINARY_SUBTYPE_BYTE_ARRAY;
    }});
    Object.defineProperty(exports, "BSON_BINARY_SUBTYPE_DEFAULT", {enumerable: true, get: function() {
      return constants_1.BSON_BINARY_SUBTYPE_DEFAULT;
    }});
    Object.defineProperty(exports, "BSON_BINARY_SUBTYPE_FUNCTION", {enumerable: true, get: function() {
      return constants_1.BSON_BINARY_SUBTYPE_FUNCTION;
    }});
    Object.defineProperty(exports, "BSON_BINARY_SUBTYPE_MD5", {enumerable: true, get: function() {
      return constants_1.BSON_BINARY_SUBTYPE_MD5;
    }});
    Object.defineProperty(exports, "BSON_BINARY_SUBTYPE_USER_DEFINED", {enumerable: true, get: function() {
      return constants_1.BSON_BINARY_SUBTYPE_USER_DEFINED;
    }});
    Object.defineProperty(exports, "BSON_BINARY_SUBTYPE_UUID", {enumerable: true, get: function() {
      return constants_1.BSON_BINARY_SUBTYPE_UUID;
    }});
    Object.defineProperty(exports, "BSON_BINARY_SUBTYPE_UUID_NEW", {enumerable: true, get: function() {
      return constants_1.BSON_BINARY_SUBTYPE_UUID_NEW;
    }});
    Object.defineProperty(exports, "BSON_DATA_ARRAY", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_ARRAY;
    }});
    Object.defineProperty(exports, "BSON_DATA_BINARY", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_BINARY;
    }});
    Object.defineProperty(exports, "BSON_DATA_BOOLEAN", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_BOOLEAN;
    }});
    Object.defineProperty(exports, "BSON_DATA_CODE", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_CODE;
    }});
    Object.defineProperty(exports, "BSON_DATA_CODE_W_SCOPE", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_CODE_W_SCOPE;
    }});
    Object.defineProperty(exports, "BSON_DATA_DATE", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_DATE;
    }});
    Object.defineProperty(exports, "BSON_DATA_DBPOINTER", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_DBPOINTER;
    }});
    Object.defineProperty(exports, "BSON_DATA_DECIMAL128", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_DECIMAL128;
    }});
    Object.defineProperty(exports, "BSON_DATA_INT", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_INT;
    }});
    Object.defineProperty(exports, "BSON_DATA_LONG", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_LONG;
    }});
    Object.defineProperty(exports, "BSON_DATA_MAX_KEY", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_MAX_KEY;
    }});
    Object.defineProperty(exports, "BSON_DATA_MIN_KEY", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_MIN_KEY;
    }});
    Object.defineProperty(exports, "BSON_DATA_NULL", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_NULL;
    }});
    Object.defineProperty(exports, "BSON_DATA_NUMBER", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_NUMBER;
    }});
    Object.defineProperty(exports, "BSON_DATA_OBJECT", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_OBJECT;
    }});
    Object.defineProperty(exports, "BSON_DATA_OID", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_OID;
    }});
    Object.defineProperty(exports, "BSON_DATA_REGEXP", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_REGEXP;
    }});
    Object.defineProperty(exports, "BSON_DATA_STRING", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_STRING;
    }});
    Object.defineProperty(exports, "BSON_DATA_SYMBOL", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_SYMBOL;
    }});
    Object.defineProperty(exports, "BSON_DATA_TIMESTAMP", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_TIMESTAMP;
    }});
    Object.defineProperty(exports, "BSON_DATA_UNDEFINED", {enumerable: true, get: function() {
      return constants_1.BSON_DATA_UNDEFINED;
    }});
    Object.defineProperty(exports, "BSON_INT32_MAX", {enumerable: true, get: function() {
      return constants_1.BSON_INT32_MAX;
    }});
    Object.defineProperty(exports, "BSON_INT32_MIN", {enumerable: true, get: function() {
      return constants_1.BSON_INT32_MIN;
    }});
    Object.defineProperty(exports, "BSON_INT64_MAX", {enumerable: true, get: function() {
      return constants_1.BSON_INT64_MAX;
    }});
    Object.defineProperty(exports, "BSON_INT64_MIN", {enumerable: true, get: function() {
      return constants_1.BSON_INT64_MIN;
    }});
    var extended_json_2 = require_extended_json();
    Object.defineProperty(exports, "EJSON", {enumerable: true, get: function() {
      return extended_json_2.EJSON;
    }});
    var timestamp_2 = require_timestamp();
    Object.defineProperty(exports, "LongWithoutOverridesClass", {enumerable: true, get: function() {
      return timestamp_2.LongWithoutOverridesClass;
    }});
    var MAXSIZE = 1024 * 1024 * 17;
    var buffer = buffer_1.Buffer.alloc(MAXSIZE);
    function setInternalBufferSize(size) {
      if (buffer.length < size) {
        buffer = buffer_1.Buffer.alloc(size);
      }
    }
    exports.setInternalBufferSize = setInternalBufferSize;
    function serialize(object, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      var checkKeys = typeof options2.checkKeys === "boolean" ? options2.checkKeys : false;
      var serializeFunctions = typeof options2.serializeFunctions === "boolean" ? options2.serializeFunctions : false;
      var ignoreUndefined = typeof options2.ignoreUndefined === "boolean" ? options2.ignoreUndefined : true;
      var minInternalBufferSize = typeof options2.minInternalBufferSize === "number" ? options2.minInternalBufferSize : MAXSIZE;
      if (buffer.length < minInternalBufferSize) {
        buffer = buffer_1.Buffer.alloc(minInternalBufferSize);
      }
      var serializationIndex = serializer_1.serializeInto(buffer, object, checkKeys, 0, 0, serializeFunctions, ignoreUndefined, []);
      var finishedBuffer = buffer_1.Buffer.alloc(serializationIndex);
      buffer.copy(finishedBuffer, 0, 0, finishedBuffer.length);
      return finishedBuffer;
    }
    exports.serialize = serialize;
    function serializeWithBufferAndIndex(object, finalBuffer, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      var checkKeys = typeof options2.checkKeys === "boolean" ? options2.checkKeys : false;
      var serializeFunctions = typeof options2.serializeFunctions === "boolean" ? options2.serializeFunctions : false;
      var ignoreUndefined = typeof options2.ignoreUndefined === "boolean" ? options2.ignoreUndefined : true;
      var startIndex = typeof options2.index === "number" ? options2.index : 0;
      var serializationIndex = serializer_1.serializeInto(buffer, object, checkKeys, 0, 0, serializeFunctions, ignoreUndefined);
      buffer.copy(finalBuffer, startIndex, 0, serializationIndex);
      return startIndex + serializationIndex - 1;
    }
    exports.serializeWithBufferAndIndex = serializeWithBufferAndIndex;
    function deserialize(buffer2, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return deserializer_1.deserialize(ensure_buffer_1.ensureBuffer(buffer2), options2);
    }
    exports.deserialize = deserialize;
    function calculateObjectSize(object, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      options2 = options2 || {};
      var serializeFunctions = typeof options2.serializeFunctions === "boolean" ? options2.serializeFunctions : false;
      var ignoreUndefined = typeof options2.ignoreUndefined === "boolean" ? options2.ignoreUndefined : true;
      return calculate_size_1.calculateObjectSize(object, serializeFunctions, ignoreUndefined);
    }
    exports.calculateObjectSize = calculateObjectSize;
    function deserializeStream(data, startIndex, numberOfDocuments, documents, docStartIndex, options2) {
      var internalOptions = Object.assign({allowObjectSmallerThanBufferSize: true, index: 0}, options2);
      var bufferData = ensure_buffer_1.ensureBuffer(data);
      var index2 = startIndex;
      for (var i = 0; i < numberOfDocuments; i++) {
        var size = bufferData[index2] | bufferData[index2 + 1] << 8 | bufferData[index2 + 2] << 16 | bufferData[index2 + 3] << 24;
        internalOptions.index = index2;
        documents[docStartIndex + i] = deserializer_1.deserialize(bufferData, internalOptions);
        index2 = index2 + size;
      }
      return index2;
    }
    exports.deserializeStream = deserializeStream;
    var BSON = {
      Binary: binary_1.Binary,
      Code: code_1.Code,
      DBRef: db_ref_1.DBRef,
      Decimal128: decimal128_1.Decimal128,
      Double: double_1.Double,
      Int32: int_32_1.Int32,
      Long: long_1.Long,
      UUID: uuid_1.UUID,
      Map: map_1.Map,
      MaxKey: max_key_1.MaxKey,
      MinKey: min_key_1.MinKey,
      ObjectId: objectid_1.ObjectId,
      ObjectID: objectid_1.ObjectId,
      BSONRegExp: regexp_1.BSONRegExp,
      BSONSymbol: symbol_1.BSONSymbol,
      Timestamp: timestamp_1.Timestamp,
      EJSON: extended_json_1.EJSON,
      setInternalBufferSize,
      serialize,
      serializeWithBufferAndIndex,
      deserialize,
      calculateObjectSize,
      deserializeStream
    };
    exports.default = BSON;
  }
});

// node_modules/.pnpm/node-fetch@2.6.1/node_modules/node-fetch/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/node-fetch@2.6.1/node_modules/node-fetch/lib/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var Stream2 = _interopDefault(require("stream"));
    var http2 = _interopDefault(require("http"));
    var Url = _interopDefault(require("url"));
    var https2 = _interopDefault(require("https"));
    var zlib2 = _interopDefault(require("zlib"));
    var Readable2 = Stream2.Readable;
    var BUFFER = Symbol("buffer");
    var TYPE = Symbol("type");
    var Blob2 = class {
      constructor() {
        this[TYPE] = "";
        const blobParts = arguments[0];
        const options2 = arguments[1];
        const buffers = [];
        let size = 0;
        if (blobParts) {
          const a = blobParts;
          const length = Number(a.length);
          for (let i = 0; i < length; i++) {
            const element = a[i];
            let buffer;
            if (element instanceof Buffer) {
              buffer = element;
            } else if (ArrayBuffer.isView(element)) {
              buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
            } else if (element instanceof ArrayBuffer) {
              buffer = Buffer.from(element);
            } else if (element instanceof Blob2) {
              buffer = element[BUFFER];
            } else {
              buffer = Buffer.from(typeof element === "string" ? element : String(element));
            }
            size += buffer.length;
            buffers.push(buffer);
          }
        }
        this[BUFFER] = Buffer.concat(buffers);
        let type = options2 && options2.type !== void 0 && String(options2.type).toLowerCase();
        if (type && !/[^\u0020-\u007E]/.test(type)) {
          this[TYPE] = type;
        }
      }
      get size() {
        return this[BUFFER].length;
      }
      get type() {
        return this[TYPE];
      }
      text() {
        return Promise.resolve(this[BUFFER].toString());
      }
      arrayBuffer() {
        const buf = this[BUFFER];
        const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        return Promise.resolve(ab);
      }
      stream() {
        const readable2 = new Readable2();
        readable2._read = function() {
        };
        readable2.push(this[BUFFER]);
        readable2.push(null);
        return readable2;
      }
      toString() {
        return "[object Blob]";
      }
      slice() {
        const size = this.size;
        const start = arguments[0];
        const end = arguments[1];
        let relativeStart, relativeEnd;
        if (start === void 0) {
          relativeStart = 0;
        } else if (start < 0) {
          relativeStart = Math.max(size + start, 0);
        } else {
          relativeStart = Math.min(start, size);
        }
        if (end === void 0) {
          relativeEnd = size;
        } else if (end < 0) {
          relativeEnd = Math.max(size + end, 0);
        } else {
          relativeEnd = Math.min(end, size);
        }
        const span = Math.max(relativeEnd - relativeStart, 0);
        const buffer = this[BUFFER];
        const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
        const blob = new Blob2([], {type: arguments[2]});
        blob[BUFFER] = slicedBuffer;
        return blob;
      }
    };
    Object.defineProperties(Blob2.prototype, {
      size: {enumerable: true},
      type: {enumerable: true},
      slice: {enumerable: true}
    });
    Object.defineProperty(Blob2.prototype, Symbol.toStringTag, {
      value: "Blob",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function FetchError2(message, type, systemError) {
      Error.call(this, message);
      this.message = message;
      this.type = type;
      if (systemError) {
        this.code = this.errno = systemError.code;
      }
      Error.captureStackTrace(this, this.constructor);
    }
    FetchError2.prototype = Object.create(Error.prototype);
    FetchError2.prototype.constructor = FetchError2;
    FetchError2.prototype.name = "FetchError";
    var convert;
    try {
      convert = require("encoding").convert;
    } catch (e) {
    }
    var INTERNALS2 = Symbol("Body internals");
    var PassThrough2 = Stream2.PassThrough;
    function Body2(body) {
      var _this = this;
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$size = _ref.size;
      let size = _ref$size === void 0 ? 0 : _ref$size;
      var _ref$timeout = _ref.timeout;
      let timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
      if (body == null) {
        body = null;
      } else if (isURLSearchParams(body)) {
        body = Buffer.from(body.toString());
      } else if (isBlob2(body))
        ;
      else if (Buffer.isBuffer(body))
        ;
      else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
        body = Buffer.from(body);
      } else if (ArrayBuffer.isView(body)) {
        body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
      } else if (body instanceof Stream2)
        ;
      else {
        body = Buffer.from(String(body));
      }
      this[INTERNALS2] = {
        body,
        disturbed: false,
        error: null
      };
      this.size = size;
      this.timeout = timeout;
      if (body instanceof Stream2) {
        body.on("error", function(err) {
          const error3 = err.name === "AbortError" ? err : new FetchError2(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, "system", err);
          _this[INTERNALS2].error = error3;
        });
      }
    }
    Body2.prototype = {
      get body() {
        return this[INTERNALS2].body;
      },
      get bodyUsed() {
        return this[INTERNALS2].disturbed;
      },
      arrayBuffer() {
        return consumeBody2.call(this).then(function(buf) {
          return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        });
      },
      blob() {
        let ct = this.headers && this.headers.get("content-type") || "";
        return consumeBody2.call(this).then(function(buf) {
          return Object.assign(new Blob2([], {
            type: ct.toLowerCase()
          }), {
            [BUFFER]: buf
          });
        });
      },
      json() {
        var _this2 = this;
        return consumeBody2.call(this).then(function(buffer) {
          try {
            return JSON.parse(buffer.toString());
          } catch (err) {
            return Body2.Promise.reject(new FetchError2(`invalid json response body at ${_this2.url} reason: ${err.message}`, "invalid-json"));
          }
        });
      },
      text() {
        return consumeBody2.call(this).then(function(buffer) {
          return buffer.toString();
        });
      },
      buffer() {
        return consumeBody2.call(this);
      },
      textConverted() {
        var _this3 = this;
        return consumeBody2.call(this).then(function(buffer) {
          return convertBody(buffer, _this3.headers);
        });
      }
    };
    Object.defineProperties(Body2.prototype, {
      body: {enumerable: true},
      bodyUsed: {enumerable: true},
      arrayBuffer: {enumerable: true},
      blob: {enumerable: true},
      json: {enumerable: true},
      text: {enumerable: true}
    });
    Body2.mixIn = function(proto) {
      for (const name of Object.getOwnPropertyNames(Body2.prototype)) {
        if (!(name in proto)) {
          const desc = Object.getOwnPropertyDescriptor(Body2.prototype, name);
          Object.defineProperty(proto, name, desc);
        }
      }
    };
    function consumeBody2() {
      var _this4 = this;
      if (this[INTERNALS2].disturbed) {
        return Body2.Promise.reject(new TypeError(`body used already for: ${this.url}`));
      }
      this[INTERNALS2].disturbed = true;
      if (this[INTERNALS2].error) {
        return Body2.Promise.reject(this[INTERNALS2].error);
      }
      let body = this.body;
      if (body === null) {
        return Body2.Promise.resolve(Buffer.alloc(0));
      }
      if (isBlob2(body)) {
        body = body.stream();
      }
      if (Buffer.isBuffer(body)) {
        return Body2.Promise.resolve(body);
      }
      if (!(body instanceof Stream2)) {
        return Body2.Promise.resolve(Buffer.alloc(0));
      }
      let accum = [];
      let accumBytes = 0;
      let abort = false;
      return new Body2.Promise(function(resolve2, reject) {
        let resTimeout;
        if (_this4.timeout) {
          resTimeout = setTimeout(function() {
            abort = true;
            reject(new FetchError2(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, "body-timeout"));
          }, _this4.timeout);
        }
        body.on("error", function(err) {
          if (err.name === "AbortError") {
            abort = true;
            reject(err);
          } else {
            reject(new FetchError2(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, "system", err));
          }
        });
        body.on("data", function(chunk) {
          if (abort || chunk === null) {
            return;
          }
          if (_this4.size && accumBytes + chunk.length > _this4.size) {
            abort = true;
            reject(new FetchError2(`content size at ${_this4.url} over limit: ${_this4.size}`, "max-size"));
            return;
          }
          accumBytes += chunk.length;
          accum.push(chunk);
        });
        body.on("end", function() {
          if (abort) {
            return;
          }
          clearTimeout(resTimeout);
          try {
            resolve2(Buffer.concat(accum, accumBytes));
          } catch (err) {
            reject(new FetchError2(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, "system", err));
          }
        });
      });
    }
    function convertBody(buffer, headers) {
      if (typeof convert !== "function") {
        throw new Error("The package `encoding` must be installed to use the textConverted() function");
      }
      const ct = headers.get("content-type");
      let charset = "utf-8";
      let res, str;
      if (ct) {
        res = /charset=([^;]*)/i.exec(ct);
      }
      str = buffer.slice(0, 1024).toString();
      if (!res && str) {
        res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
      }
      if (!res && str) {
        res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
        if (!res) {
          res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
          if (res) {
            res.pop();
          }
        }
        if (res) {
          res = /charset=(.*)/i.exec(res.pop());
        }
      }
      if (!res && str) {
        res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
      }
      if (res) {
        charset = res.pop();
        if (charset === "gb2312" || charset === "gbk") {
          charset = "gb18030";
        }
      }
      return convert(buffer, "UTF-8", charset).toString();
    }
    function isURLSearchParams(obj) {
      if (typeof obj !== "object" || typeof obj.append !== "function" || typeof obj.delete !== "function" || typeof obj.get !== "function" || typeof obj.getAll !== "function" || typeof obj.has !== "function" || typeof obj.set !== "function") {
        return false;
      }
      return obj.constructor.name === "URLSearchParams" || Object.prototype.toString.call(obj) === "[object URLSearchParams]" || typeof obj.sort === "function";
    }
    function isBlob2(obj) {
      return typeof obj === "object" && typeof obj.arrayBuffer === "function" && typeof obj.type === "string" && typeof obj.stream === "function" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
    }
    function clone2(instance) {
      let p1, p2;
      let body = instance.body;
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof Stream2 && typeof body.getBoundary !== "function") {
        p1 = new PassThrough2();
        p2 = new PassThrough2();
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS2].body = p1;
        body = p2;
      }
      return body;
    }
    function extractContentType2(body) {
      if (body === null) {
        return null;
      } else if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      } else if (isURLSearchParams(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      } else if (isBlob2(body)) {
        return body.type || null;
      } else if (Buffer.isBuffer(body)) {
        return null;
      } else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
        return null;
      } else if (ArrayBuffer.isView(body)) {
        return null;
      } else if (typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${body.getBoundary()}`;
      } else if (body instanceof Stream2) {
        return null;
      } else {
        return "text/plain;charset=UTF-8";
      }
    }
    function getTotalBytes2(instance) {
      const body = instance.body;
      if (body === null) {
        return 0;
      } else if (isBlob2(body)) {
        return body.size;
      } else if (Buffer.isBuffer(body)) {
        return body.length;
      } else if (body && typeof body.getLengthSync === "function") {
        if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || body.hasKnownLength && body.hasKnownLength()) {
          return body.getLengthSync();
        }
        return null;
      } else {
        return null;
      }
    }
    function writeToStream2(dest, instance) {
      const body = instance.body;
      if (body === null) {
        dest.end();
      } else if (isBlob2(body)) {
        body.stream().pipe(dest);
      } else if (Buffer.isBuffer(body)) {
        dest.write(body);
        dest.end();
      } else {
        body.pipe(dest);
      }
    }
    Body2.Promise = global.Promise;
    var invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
    var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
    function validateName(name) {
      name = `${name}`;
      if (invalidTokenRegex.test(name) || name === "") {
        throw new TypeError(`${name} is not a legal HTTP header name`);
      }
    }
    function validateValue(value) {
      value = `${value}`;
      if (invalidHeaderCharRegex.test(value)) {
        throw new TypeError(`${value} is not a legal HTTP header value`);
      }
    }
    function find(map, name) {
      name = name.toLowerCase();
      for (const key in map) {
        if (key.toLowerCase() === name) {
          return key;
        }
      }
      return void 0;
    }
    var MAP = Symbol("map");
    var Headers2 = class {
      constructor() {
        let init2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
        this[MAP] = Object.create(null);
        if (init2 instanceof Headers2) {
          const rawHeaders = init2.raw();
          const headerNames = Object.keys(rawHeaders);
          for (const headerName of headerNames) {
            for (const value of rawHeaders[headerName]) {
              this.append(headerName, value);
            }
          }
          return;
        }
        if (init2 == null)
          ;
        else if (typeof init2 === "object") {
          const method = init2[Symbol.iterator];
          if (method != null) {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            const pairs = [];
            for (const pair of init2) {
              if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
                throw new TypeError("Each header pair must be iterable");
              }
              pairs.push(Array.from(pair));
            }
            for (const pair of pairs) {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              this.append(pair[0], pair[1]);
            }
          } else {
            for (const key of Object.keys(init2)) {
              const value = init2[key];
              this.append(key, value);
            }
          }
        } else {
          throw new TypeError("Provided initializer must be an object");
        }
      }
      get(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key === void 0) {
          return null;
        }
        return this[MAP][key].join(", ");
      }
      forEach(callback) {
        let thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
        let pairs = getHeaders(this);
        let i = 0;
        while (i < pairs.length) {
          var _pairs$i = pairs[i];
          const name = _pairs$i[0], value = _pairs$i[1];
          callback.call(thisArg, value, name, this);
          pairs = getHeaders(this);
          i++;
        }
      }
      set(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        this[MAP][key !== void 0 ? key : name] = [value];
      }
      append(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        if (key !== void 0) {
          this[MAP][key].push(value);
        } else {
          this[MAP][name] = [value];
        }
      }
      has(name) {
        name = `${name}`;
        validateName(name);
        return find(this[MAP], name) !== void 0;
      }
      delete(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key !== void 0) {
          delete this[MAP][key];
        }
      }
      raw() {
        return this[MAP];
      }
      keys() {
        return createHeadersIterator(this, "key");
      }
      values() {
        return createHeadersIterator(this, "value");
      }
      [Symbol.iterator]() {
        return createHeadersIterator(this, "key+value");
      }
    };
    Headers2.prototype.entries = Headers2.prototype[Symbol.iterator];
    Object.defineProperty(Headers2.prototype, Symbol.toStringTag, {
      value: "Headers",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Headers2.prototype, {
      get: {enumerable: true},
      forEach: {enumerable: true},
      set: {enumerable: true},
      append: {enumerable: true},
      has: {enumerable: true},
      delete: {enumerable: true},
      keys: {enumerable: true},
      values: {enumerable: true},
      entries: {enumerable: true}
    });
    function getHeaders(headers) {
      let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
      const keys = Object.keys(headers[MAP]).sort();
      return keys.map(kind === "key" ? function(k) {
        return k.toLowerCase();
      } : kind === "value" ? function(k) {
        return headers[MAP][k].join(", ");
      } : function(k) {
        return [k.toLowerCase(), headers[MAP][k].join(", ")];
      });
    }
    var INTERNAL = Symbol("internal");
    function createHeadersIterator(target, kind) {
      const iterator = Object.create(HeadersIteratorPrototype);
      iterator[INTERNAL] = {
        target,
        kind,
        index: 0
      };
      return iterator;
    }
    var HeadersIteratorPrototype = Object.setPrototypeOf({
      next() {
        if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
          throw new TypeError("Value of `this` is not a HeadersIterator");
        }
        var _INTERNAL = this[INTERNAL];
        const target = _INTERNAL.target, kind = _INTERNAL.kind, index2 = _INTERNAL.index;
        const values = getHeaders(target, kind);
        const len = values.length;
        if (index2 >= len) {
          return {
            value: void 0,
            done: true
          };
        }
        this[INTERNAL].index = index2 + 1;
        return {
          value: values[index2],
          done: false
        };
      }
    }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
    Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
      value: "HeadersIterator",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function exportNodeCompatibleHeaders(headers) {
      const obj = Object.assign({__proto__: null}, headers[MAP]);
      const hostHeaderKey = find(headers[MAP], "Host");
      if (hostHeaderKey !== void 0) {
        obj[hostHeaderKey] = obj[hostHeaderKey][0];
      }
      return obj;
    }
    function createHeadersLenient(obj) {
      const headers = new Headers2();
      for (const name of Object.keys(obj)) {
        if (invalidTokenRegex.test(name)) {
          continue;
        }
        if (Array.isArray(obj[name])) {
          for (const val of obj[name]) {
            if (invalidHeaderCharRegex.test(val)) {
              continue;
            }
            if (headers[MAP][name] === void 0) {
              headers[MAP][name] = [val];
            } else {
              headers[MAP][name].push(val);
            }
          }
        } else if (!invalidHeaderCharRegex.test(obj[name])) {
          headers[MAP][name] = [obj[name]];
        }
      }
      return headers;
    }
    var INTERNALS$12 = Symbol("Response internals");
    var STATUS_CODES = http2.STATUS_CODES;
    var Response3 = class {
      constructor() {
        let body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        Body2.call(this, body, opts);
        const status = opts.status || 200;
        const headers = new Headers2(opts.headers);
        if (body != null && !headers.has("Content-Type")) {
          const contentType = extractContentType2(body);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$12] = {
          url: opts.url,
          status,
          statusText: opts.statusText || STATUS_CODES[status],
          headers,
          counter: opts.counter
        };
      }
      get url() {
        return this[INTERNALS$12].url || "";
      }
      get status() {
        return this[INTERNALS$12].status;
      }
      get ok() {
        return this[INTERNALS$12].status >= 200 && this[INTERNALS$12].status < 300;
      }
      get redirected() {
        return this[INTERNALS$12].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$12].statusText;
      }
      get headers() {
        return this[INTERNALS$12].headers;
      }
      clone() {
        return new Response3(clone2(this), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected
        });
      }
    };
    Body2.mixIn(Response3.prototype);
    Object.defineProperties(Response3.prototype, {
      url: {enumerable: true},
      status: {enumerable: true},
      ok: {enumerable: true},
      redirected: {enumerable: true},
      statusText: {enumerable: true},
      headers: {enumerable: true},
      clone: {enumerable: true}
    });
    Object.defineProperty(Response3.prototype, Symbol.toStringTag, {
      value: "Response",
      writable: false,
      enumerable: false,
      configurable: true
    });
    var INTERNALS$22 = Symbol("Request internals");
    var parse_url = Url.parse;
    var format_url = Url.format;
    var streamDestructionSupported = "destroy" in Stream2.Readable.prototype;
    function isRequest2(input) {
      return typeof input === "object" && typeof input[INTERNALS$22] === "object";
    }
    function isAbortSignal2(signal) {
      const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
      return !!(proto && proto.constructor.name === "AbortSignal");
    }
    var Request2 = class {
      constructor(input) {
        let init2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        let parsedURL;
        if (!isRequest2(input)) {
          if (input && input.href) {
            parsedURL = parse_url(input.href);
          } else {
            parsedURL = parse_url(`${input}`);
          }
          input = {};
        } else {
          parsedURL = parse_url(input.url);
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest2(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        let inputBody = init2.body != null ? init2.body : isRequest2(input) && input.body !== null ? clone2(input) : null;
        Body2.call(this, inputBody, {
          timeout: init2.timeout || input.timeout || 0,
          size: init2.size || input.size || 0
        });
        const headers = new Headers2(init2.headers || input.headers || {});
        if (inputBody != null && !headers.has("Content-Type")) {
          const contentType = extractContentType2(inputBody);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        let signal = isRequest2(input) ? input.signal : null;
        if ("signal" in init2)
          signal = init2.signal;
        if (signal != null && !isAbortSignal2(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal");
        }
        this[INTERNALS$22] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal
        };
        this.follow = init2.follow !== void 0 ? init2.follow : input.follow !== void 0 ? input.follow : 20;
        this.compress = init2.compress !== void 0 ? init2.compress : input.compress !== void 0 ? input.compress : true;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
      }
      get method() {
        return this[INTERNALS$22].method;
      }
      get url() {
        return format_url(this[INTERNALS$22].parsedURL);
      }
      get headers() {
        return this[INTERNALS$22].headers;
      }
      get redirect() {
        return this[INTERNALS$22].redirect;
      }
      get signal() {
        return this[INTERNALS$22].signal;
      }
      clone() {
        return new Request2(this);
      }
    };
    Body2.mixIn(Request2.prototype);
    Object.defineProperty(Request2.prototype, Symbol.toStringTag, {
      value: "Request",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Request2.prototype, {
      method: {enumerable: true},
      url: {enumerable: true},
      headers: {enumerable: true},
      redirect: {enumerable: true},
      clone: {enumerable: true},
      signal: {enumerable: true}
    });
    function getNodeRequestOptions2(request) {
      const parsedURL = request[INTERNALS$22].parsedURL;
      const headers = new Headers2(request[INTERNALS$22].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      if (!parsedURL.protocol || !parsedURL.hostname) {
        throw new TypeError("Only absolute URLs are supported");
      }
      if (!/^https?:$/.test(parsedURL.protocol)) {
        throw new TypeError("Only HTTP(S) protocols are supported");
      }
      if (request.signal && request.body instanceof Stream2.Readable && !streamDestructionSupported) {
        throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
      }
      let contentLengthValue = null;
      if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body != null) {
        const totalBytes = getTotalBytes2(request);
        if (typeof totalBytes === "number") {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate");
      }
      let agent = request.agent;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      return Object.assign({}, parsedURL, {
        method: request.method,
        headers: exportNodeCompatibleHeaders(headers),
        agent
      });
    }
    function AbortError2(message) {
      Error.call(this, message);
      this.type = "aborted";
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
    }
    AbortError2.prototype = Object.create(Error.prototype);
    AbortError2.prototype.constructor = AbortError2;
    AbortError2.prototype.name = "AbortError";
    var PassThrough$1 = Stream2.PassThrough;
    var resolve_url = Url.resolve;
    function fetch3(url, opts) {
      if (!fetch3.Promise) {
        throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
      }
      Body2.Promise = fetch3.Promise;
      return new fetch3.Promise(function(resolve2, reject) {
        const request = new Request2(url, opts);
        const options2 = getNodeRequestOptions2(request);
        const send = (options2.protocol === "https:" ? https2 : http2).request;
        const signal = request.signal;
        let response = null;
        const abort = function abort2() {
          let error3 = new AbortError2("The user aborted a request.");
          reject(error3);
          if (request.body && request.body instanceof Stream2.Readable) {
            request.body.destroy(error3);
          }
          if (!response || !response.body)
            return;
          response.body.emit("error", error3);
        };
        if (signal && signal.aborted) {
          abort();
          return;
        }
        const abortAndFinalize = function abortAndFinalize2() {
          abort();
          finalize();
        };
        const req = send(options2);
        let reqTimeout;
        if (signal) {
          signal.addEventListener("abort", abortAndFinalize);
        }
        function finalize() {
          req.abort();
          if (signal)
            signal.removeEventListener("abort", abortAndFinalize);
          clearTimeout(reqTimeout);
        }
        if (request.timeout) {
          req.once("socket", function(socket) {
            reqTimeout = setTimeout(function() {
              reject(new FetchError2(`network timeout at: ${request.url}`, "request-timeout"));
              finalize();
            }, request.timeout);
          });
        }
        req.on("error", function(err) {
          reject(new FetchError2(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
          finalize();
        });
        req.on("response", function(res) {
          clearTimeout(reqTimeout);
          const headers = createHeadersLenient(res.headers);
          if (fetch3.isRedirect(res.statusCode)) {
            const location = headers.get("Location");
            const locationURL = location === null ? null : resolve_url(request.url, location);
            switch (request.redirect) {
              case "error":
                reject(new FetchError2(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
                finalize();
                return;
              case "manual":
                if (locationURL !== null) {
                  try {
                    headers.set("Location", locationURL);
                  } catch (err) {
                    reject(err);
                  }
                }
                break;
              case "follow":
                if (locationURL === null) {
                  break;
                }
                if (request.counter >= request.follow) {
                  reject(new FetchError2(`maximum redirect reached at: ${request.url}`, "max-redirect"));
                  finalize();
                  return;
                }
                const requestOpts = {
                  headers: new Headers2(request.headers),
                  follow: request.follow,
                  counter: request.counter + 1,
                  agent: request.agent,
                  compress: request.compress,
                  method: request.method,
                  body: request.body,
                  signal: request.signal,
                  timeout: request.timeout,
                  size: request.size
                };
                if (res.statusCode !== 303 && request.body && getTotalBytes2(request) === null) {
                  reject(new FetchError2("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
                  finalize();
                  return;
                }
                if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === "POST") {
                  requestOpts.method = "GET";
                  requestOpts.body = void 0;
                  requestOpts.headers.delete("content-length");
                }
                resolve2(fetch3(new Request2(locationURL, requestOpts)));
                finalize();
                return;
            }
          }
          res.once("end", function() {
            if (signal)
              signal.removeEventListener("abort", abortAndFinalize);
          });
          let body = res.pipe(new PassThrough$1());
          const response_options = {
            url: request.url,
            status: res.statusCode,
            statusText: res.statusMessage,
            headers,
            size: request.size,
            timeout: request.timeout,
            counter: request.counter
          };
          const codings = headers.get("Content-Encoding");
          if (!request.compress || request.method === "HEAD" || codings === null || res.statusCode === 204 || res.statusCode === 304) {
            response = new Response3(body, response_options);
            resolve2(response);
            return;
          }
          const zlibOptions = {
            flush: zlib2.Z_SYNC_FLUSH,
            finishFlush: zlib2.Z_SYNC_FLUSH
          };
          if (codings == "gzip" || codings == "x-gzip") {
            body = body.pipe(zlib2.createGunzip(zlibOptions));
            response = new Response3(body, response_options);
            resolve2(response);
            return;
          }
          if (codings == "deflate" || codings == "x-deflate") {
            const raw = res.pipe(new PassThrough$1());
            raw.once("data", function(chunk) {
              if ((chunk[0] & 15) === 8) {
                body = body.pipe(zlib2.createInflate());
              } else {
                body = body.pipe(zlib2.createInflateRaw());
              }
              response = new Response3(body, response_options);
              resolve2(response);
            });
            return;
          }
          if (codings == "br" && typeof zlib2.createBrotliDecompress === "function") {
            body = body.pipe(zlib2.createBrotliDecompress());
            response = new Response3(body, response_options);
            resolve2(response);
            return;
          }
          response = new Response3(body, response_options);
          resolve2(response);
        });
        writeToStream2(req, request);
      });
    }
    fetch3.isRedirect = function(code) {
      return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
    };
    fetch3.Promise = global.Promise;
    module2.exports = exports = fetch3;
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = exports;
    exports.Headers = Headers2;
    exports.Request = Request2;
    exports.Response = Response3;
    exports.FetchError = FetchError2;
  }
});

// node_modules/.pnpm/event-target-shim@5.0.1/node_modules/event-target-shim/dist/event-target-shim.js
var require_event_target_shim = __commonJS({
  "node_modules/.pnpm/event-target-shim@5.0.1/node_modules/event-target-shim/dist/event-target-shim.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var privateData = new WeakMap();
    var wrappers = new WeakMap();
    function pd(event) {
      const retv = privateData.get(event);
      console.assert(retv != null, "'this' is expected an Event object, but got", event);
      return retv;
    }
    function setCancelFlag(data) {
      if (data.passiveListener != null) {
        if (typeof console !== "undefined" && typeof console.error === "function") {
          console.error("Unable to preventDefault inside passive event listener invocation.", data.passiveListener);
        }
        return;
      }
      if (!data.event.cancelable) {
        return;
      }
      data.canceled = true;
      if (typeof data.event.preventDefault === "function") {
        data.event.preventDefault();
      }
    }
    function Event(eventTarget, event) {
      privateData.set(this, {
        eventTarget,
        event,
        eventPhase: 2,
        currentTarget: eventTarget,
        canceled: false,
        stopped: false,
        immediateStopped: false,
        passiveListener: null,
        timeStamp: event.timeStamp || Date.now()
      });
      Object.defineProperty(this, "isTrusted", {value: false, enumerable: true});
      const keys = Object.keys(event);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in this)) {
          Object.defineProperty(this, key, defineRedirectDescriptor(key));
        }
      }
    }
    Event.prototype = {
      get type() {
        return pd(this).event.type;
      },
      get target() {
        return pd(this).eventTarget;
      },
      get currentTarget() {
        return pd(this).currentTarget;
      },
      composedPath() {
        const currentTarget = pd(this).currentTarget;
        if (currentTarget == null) {
          return [];
        }
        return [currentTarget];
      },
      get NONE() {
        return 0;
      },
      get CAPTURING_PHASE() {
        return 1;
      },
      get AT_TARGET() {
        return 2;
      },
      get BUBBLING_PHASE() {
        return 3;
      },
      get eventPhase() {
        return pd(this).eventPhase;
      },
      stopPropagation() {
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.stopPropagation === "function") {
          data.event.stopPropagation();
        }
      },
      stopImmediatePropagation() {
        const data = pd(this);
        data.stopped = true;
        data.immediateStopped = true;
        if (typeof data.event.stopImmediatePropagation === "function") {
          data.event.stopImmediatePropagation();
        }
      },
      get bubbles() {
        return Boolean(pd(this).event.bubbles);
      },
      get cancelable() {
        return Boolean(pd(this).event.cancelable);
      },
      preventDefault() {
        setCancelFlag(pd(this));
      },
      get defaultPrevented() {
        return pd(this).canceled;
      },
      get composed() {
        return Boolean(pd(this).event.composed);
      },
      get timeStamp() {
        return pd(this).timeStamp;
      },
      get srcElement() {
        return pd(this).eventTarget;
      },
      get cancelBubble() {
        return pd(this).stopped;
      },
      set cancelBubble(value) {
        if (!value) {
          return;
        }
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.cancelBubble === "boolean") {
          data.event.cancelBubble = true;
        }
      },
      get returnValue() {
        return !pd(this).canceled;
      },
      set returnValue(value) {
        if (!value) {
          setCancelFlag(pd(this));
        }
      },
      initEvent() {
      }
    };
    Object.defineProperty(Event.prototype, "constructor", {
      value: Event,
      configurable: true,
      writable: true
    });
    if (typeof window !== "undefined" && typeof window.Event !== "undefined") {
      Object.setPrototypeOf(Event.prototype, window.Event.prototype);
      wrappers.set(window.Event.prototype, Event);
    }
    function defineRedirectDescriptor(key) {
      return {
        get() {
          return pd(this).event[key];
        },
        set(value) {
          pd(this).event[key] = value;
        },
        configurable: true,
        enumerable: true
      };
    }
    function defineCallDescriptor(key) {
      return {
        value() {
          const event = pd(this).event;
          return event[key].apply(event, arguments);
        },
        configurable: true,
        enumerable: true
      };
    }
    function defineWrapper(BaseEvent, proto) {
      const keys = Object.keys(proto);
      if (keys.length === 0) {
        return BaseEvent;
      }
      function CustomEvent(eventTarget, event) {
        BaseEvent.call(this, eventTarget, event);
      }
      CustomEvent.prototype = Object.create(BaseEvent.prototype, {
        constructor: {value: CustomEvent, configurable: true, writable: true}
      });
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in BaseEvent.prototype)) {
          const descriptor = Object.getOwnPropertyDescriptor(proto, key);
          const isFunc = typeof descriptor.value === "function";
          Object.defineProperty(CustomEvent.prototype, key, isFunc ? defineCallDescriptor(key) : defineRedirectDescriptor(key));
        }
      }
      return CustomEvent;
    }
    function getWrapper(proto) {
      if (proto == null || proto === Object.prototype) {
        return Event;
      }
      let wrapper = wrappers.get(proto);
      if (wrapper == null) {
        wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
        wrappers.set(proto, wrapper);
      }
      return wrapper;
    }
    function wrapEvent(eventTarget, event) {
      const Wrapper = getWrapper(Object.getPrototypeOf(event));
      return new Wrapper(eventTarget, event);
    }
    function isStopped(event) {
      return pd(event).immediateStopped;
    }
    function setEventPhase(event, eventPhase) {
      pd(event).eventPhase = eventPhase;
    }
    function setCurrentTarget(event, currentTarget) {
      pd(event).currentTarget = currentTarget;
    }
    function setPassiveListener(event, passiveListener) {
      pd(event).passiveListener = passiveListener;
    }
    var listenersMap = new WeakMap();
    var CAPTURE = 1;
    var BUBBLE = 2;
    var ATTRIBUTE = 3;
    function isObject(x) {
      return x !== null && typeof x === "object";
    }
    function getListeners(eventTarget) {
      const listeners = listenersMap.get(eventTarget);
      if (listeners == null) {
        throw new TypeError("'this' is expected an EventTarget object, but got another value.");
      }
      return listeners;
    }
    function defineEventAttributeDescriptor(eventName) {
      return {
        get() {
          const listeners = getListeners(this);
          let node = listeners.get(eventName);
          while (node != null) {
            if (node.listenerType === ATTRIBUTE) {
              return node.listener;
            }
            node = node.next;
          }
          return null;
        },
        set(listener) {
          if (typeof listener !== "function" && !isObject(listener)) {
            listener = null;
          }
          const listeners = getListeners(this);
          let prev = null;
          let node = listeners.get(eventName);
          while (node != null) {
            if (node.listenerType === ATTRIBUTE) {
              if (prev !== null) {
                prev.next = node.next;
              } else if (node.next !== null) {
                listeners.set(eventName, node.next);
              } else {
                listeners.delete(eventName);
              }
            } else {
              prev = node;
            }
            node = node.next;
          }
          if (listener !== null) {
            const newNode = {
              listener,
              listenerType: ATTRIBUTE,
              passive: false,
              once: false,
              next: null
            };
            if (prev === null) {
              listeners.set(eventName, newNode);
            } else {
              prev.next = newNode;
            }
          }
        },
        configurable: true,
        enumerable: true
      };
    }
    function defineEventAttribute(eventTargetPrototype, eventName) {
      Object.defineProperty(eventTargetPrototype, `on${eventName}`, defineEventAttributeDescriptor(eventName));
    }
    function defineCustomEventTarget(eventNames) {
      function CustomEventTarget() {
        EventTarget.call(this);
      }
      CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
        constructor: {
          value: CustomEventTarget,
          configurable: true,
          writable: true
        }
      });
      for (let i = 0; i < eventNames.length; ++i) {
        defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
      }
      return CustomEventTarget;
    }
    function EventTarget() {
      if (this instanceof EventTarget) {
        listenersMap.set(this, new Map());
        return;
      }
      if (arguments.length === 1 && Array.isArray(arguments[0])) {
        return defineCustomEventTarget(arguments[0]);
      }
      if (arguments.length > 0) {
        const types2 = new Array(arguments.length);
        for (let i = 0; i < arguments.length; ++i) {
          types2[i] = arguments[i];
        }
        return defineCustomEventTarget(types2);
      }
      throw new TypeError("Cannot call a class as a function");
    }
    EventTarget.prototype = {
      addEventListener(eventName, listener, options2) {
        if (listener == null) {
          return;
        }
        if (typeof listener !== "function" && !isObject(listener)) {
          throw new TypeError("'listener' should be a function or an object.");
        }
        const listeners = getListeners(this);
        const optionsIsObj = isObject(options2);
        const capture = optionsIsObj ? Boolean(options2.capture) : Boolean(options2);
        const listenerType = capture ? CAPTURE : BUBBLE;
        const newNode = {
          listener,
          listenerType,
          passive: optionsIsObj && Boolean(options2.passive),
          once: optionsIsObj && Boolean(options2.once),
          next: null
        };
        let node = listeners.get(eventName);
        if (node === void 0) {
          listeners.set(eventName, newNode);
          return;
        }
        let prev = null;
        while (node != null) {
          if (node.listener === listener && node.listenerType === listenerType) {
            return;
          }
          prev = node;
          node = node.next;
        }
        prev.next = newNode;
      },
      removeEventListener(eventName, listener, options2) {
        if (listener == null) {
          return;
        }
        const listeners = getListeners(this);
        const capture = isObject(options2) ? Boolean(options2.capture) : Boolean(options2);
        const listenerType = capture ? CAPTURE : BUBBLE;
        let prev = null;
        let node = listeners.get(eventName);
        while (node != null) {
          if (node.listener === listener && node.listenerType === listenerType) {
            if (prev !== null) {
              prev.next = node.next;
            } else if (node.next !== null) {
              listeners.set(eventName, node.next);
            } else {
              listeners.delete(eventName);
            }
            return;
          }
          prev = node;
          node = node.next;
        }
      },
      dispatchEvent(event) {
        if (event == null || typeof event.type !== "string") {
          throw new TypeError('"event.type" should be a string.');
        }
        const listeners = getListeners(this);
        const eventName = event.type;
        let node = listeners.get(eventName);
        if (node == null) {
          return true;
        }
        const wrappedEvent = wrapEvent(this, event);
        let prev = null;
        while (node != null) {
          if (node.once) {
            if (prev !== null) {
              prev.next = node.next;
            } else if (node.next !== null) {
              listeners.set(eventName, node.next);
            } else {
              listeners.delete(eventName);
            }
          } else {
            prev = node;
          }
          setPassiveListener(wrappedEvent, node.passive ? node.listener : null);
          if (typeof node.listener === "function") {
            try {
              node.listener.call(this, wrappedEvent);
            } catch (err) {
              if (typeof console !== "undefined" && typeof console.error === "function") {
                console.error(err);
              }
            }
          } else if (node.listenerType !== ATTRIBUTE && typeof node.listener.handleEvent === "function") {
            node.listener.handleEvent(wrappedEvent);
          }
          if (isStopped(wrappedEvent)) {
            break;
          }
          node = node.next;
        }
        setPassiveListener(wrappedEvent, null);
        setEventPhase(wrappedEvent, 0);
        setCurrentTarget(wrappedEvent, null);
        return !wrappedEvent.defaultPrevented;
      }
    };
    Object.defineProperty(EventTarget.prototype, "constructor", {
      value: EventTarget,
      configurable: true,
      writable: true
    });
    if (typeof window !== "undefined" && typeof window.EventTarget !== "undefined") {
      Object.setPrototypeOf(EventTarget.prototype, window.EventTarget.prototype);
    }
    exports.defineEventAttribute = defineEventAttribute;
    exports.EventTarget = EventTarget;
    exports.default = EventTarget;
    module2.exports = EventTarget;
    module2.exports.EventTarget = module2.exports["default"] = EventTarget;
    module2.exports.defineEventAttribute = defineEventAttribute;
  }
});

// node_modules/.pnpm/abort-controller@3.0.0/node_modules/abort-controller/dist/abort-controller.js
var require_abort_controller = __commonJS({
  "node_modules/.pnpm/abort-controller@3.0.0/node_modules/abort-controller/dist/abort-controller.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var eventTargetShim = require_event_target_shim();
    var AbortSignal = class extends eventTargetShim.EventTarget {
      constructor() {
        super();
        throw new TypeError("AbortSignal cannot be constructed directly");
      }
      get aborted() {
        const aborted = abortedFlags.get(this);
        if (typeof aborted !== "boolean") {
          throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
        }
        return aborted;
      }
    };
    eventTargetShim.defineEventAttribute(AbortSignal.prototype, "abort");
    function createAbortSignal() {
      const signal = Object.create(AbortSignal.prototype);
      eventTargetShim.EventTarget.call(signal);
      abortedFlags.set(signal, false);
      return signal;
    }
    function abortSignal(signal) {
      if (abortedFlags.get(signal) !== false) {
        return;
      }
      abortedFlags.set(signal, true);
      signal.dispatchEvent({type: "abort"});
    }
    var abortedFlags = new WeakMap();
    Object.defineProperties(AbortSignal.prototype, {
      aborted: {enumerable: true}
    });
    if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
      Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortSignal"
      });
    }
    var AbortController = class {
      constructor() {
        signals.set(this, createAbortSignal());
      }
      get signal() {
        return getSignal(this);
      }
      abort() {
        abortSignal(getSignal(this));
      }
    };
    var signals = new WeakMap();
    function getSignal(controller) {
      const signal = signals.get(controller);
      if (signal == null) {
        throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`);
      }
      return signal;
    }
    Object.defineProperties(AbortController.prototype, {
      signal: {enumerable: true},
      abort: {enumerable: true}
    });
    if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
      Object.defineProperty(AbortController.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortController"
      });
    }
    exports.AbortController = AbortController;
    exports.AbortSignal = AbortSignal;
    exports.default = AbortController;
    module2.exports = AbortController;
    module2.exports.AbortController = module2.exports["default"] = AbortController;
    module2.exports.AbortSignal = AbortSignal;
  }
});

// node_modules/.pnpm/realm-web@1.2.1/node_modules/realm-web/dist/bundle.cjs.js
var require_bundle_cjs = __commonJS({
  "node_modules/.pnpm/realm-web@1.2.1/node_modules/realm-web/dist/bundle.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var util = require("util");
    var bson = require_bson();
    var fetch3 = require_lib();
    var NodeAbortController = require_abort_controller();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : {"default": e};
    }
    function _interopNamespace(e) {
      if (e && e.__esModule) {
        return e;
      } else {
        var n = Object.create(null);
        if (e) {
          Object.keys(e).forEach(function(k) {
            if (k !== "default") {
              var d = Object.getOwnPropertyDescriptor(e, k);
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: function() {
                  return e[k];
                }
              });
            }
          });
        }
        n["default"] = e;
        return Object.freeze(n);
      }
    }
    var bson__namespace = /* @__PURE__ */ _interopNamespace(bson);
    var fetch__default = /* @__PURE__ */ _interopDefaultLegacy(fetch3);
    var NodeAbortController__default = /* @__PURE__ */ _interopDefaultLegacy(NodeAbortController);
    var environment = null;
    function setEnvironment(e) {
      environment = e;
    }
    function getEnvironment() {
      if (environment) {
        return environment;
      } else {
        throw new Error("Cannot get environment before it's set");
      }
    }
    var PrefixedStorage = class {
      constructor(storage, keyPart) {
        this.storage = storage;
        this.keyPart = keyPart;
      }
      get(key) {
        return this.storage.get(this.keyPart + PrefixedStorage.PART_SEPARATOR + key);
      }
      set(key, value) {
        return this.storage.set(this.keyPart + PrefixedStorage.PART_SEPARATOR + key, value);
      }
      remove(key) {
        return this.storage.remove(this.keyPart + PrefixedStorage.PART_SEPARATOR + key);
      }
      prefix(keyPart) {
        return new PrefixedStorage(this, keyPart);
      }
      clear(prefix = "") {
        return this.storage.clear(this.keyPart + PrefixedStorage.PART_SEPARATOR + prefix);
      }
      addListener(listener) {
        return this.storage.addListener(listener);
      }
      removeListener(listener) {
        return this.storage.addListener(listener);
      }
    };
    PrefixedStorage.PART_SEPARATOR = ":";
    var MemoryStorage = class {
      constructor() {
        this.storage = {};
        this.listeners = new Set();
      }
      get(key) {
        if (key in this.storage) {
          return this.storage[key];
        } else {
          return null;
        }
      }
      set(key, value) {
        this.storage[key] = value;
        this.fireListeners();
      }
      remove(key) {
        delete this.storage[key];
        this.fireListeners();
      }
      prefix(keyPart) {
        return new PrefixedStorage(this, keyPart);
      }
      clear(prefix) {
        for (const key of Object.keys(this.storage)) {
          if (!prefix || key.startsWith(prefix)) {
            delete this.storage[key];
          }
        }
        this.fireListeners();
      }
      addListener(listener) {
        return this.listeners.add(listener);
      }
      removeListener(listener) {
        return this.listeners.delete(listener);
      }
      fireListeners() {
        this.listeners.forEach((listener) => listener());
      }
    };
    var DefaultNetworkTransport = class {
      constructor() {
        if (!DefaultNetworkTransport.fetch) {
          throw new Error("DefaultNetworkTransport.fetch must be set before it's used");
        }
        if (!DefaultNetworkTransport.AbortController) {
          throw new Error("DefaultNetworkTransport.AbortController must be set before it's used");
        }
      }
      fetchWithCallbacks(request, handler) {
        this.fetch(request).then(async (response) => {
          const decodedBody = await response.text();
          const responseHeaders = {};
          response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
          });
          return {
            statusCode: response.status,
            headers: responseHeaders,
            body: decodedBody
          };
        }).then((r) => handler.onSuccess(r)).catch((e) => handler.onError(e));
      }
      async fetch(request) {
        const {timeoutMs, url, ...rest} = request;
        const {signal, cancelTimeout} = this.createTimeoutSignal(timeoutMs);
        try {
          return await DefaultNetworkTransport.fetch(url, {
            signal,
            ...rest
          });
        } finally {
          cancelTimeout();
        }
      }
      createTimeoutSignal(timeoutMs) {
        if (typeof timeoutMs === "number") {
          const controller = new DefaultNetworkTransport.AbortController();
          const timeout = setTimeout(() => {
            controller.abort();
          }, timeoutMs);
          return {
            signal: controller.signal,
            cancelTimeout: () => {
              clearTimeout(timeout);
            }
          };
        } else {
          return {
            signal: void 0,
            cancelTimeout: () => {
            }
          };
        }
      }
    };
    DefaultNetworkTransport.DEFAULT_HEADERS = {
      "Content-Type": "application/json"
    };
    DefaultNetworkTransport.fetch = fetch__default["default"];
    DefaultNetworkTransport.AbortController = NodeAbortController__default["default"];
    var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    function createCommonjsModule(fn, basedir, module3) {
      return module3 = {
        path: basedir,
        exports: {},
        require: function(path, base) {
          return commonjsRequire(path, base === void 0 || base === null ? module3.path : base);
        }
      }, fn(module3, module3.exports), module3.exports;
    }
    function commonjsRequire() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }
    var base64 = createCommonjsModule(function(module3, exports2) {
      (function(global2, factory) {
        module3.exports = factory(global2);
      })(typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : commonjsGlobal, function(global2) {
        global2 = global2 || {};
        var _Base64 = global2.Base64;
        var version = "2.6.4";
        var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var b64tab = function(bin) {
          var t = {};
          for (var i = 0, l = bin.length; i < l; i++)
            t[bin.charAt(i)] = i;
          return t;
        }(b64chars);
        var fromCharCode = String.fromCharCode;
        var cb_utob = function(c) {
          if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63);
          } else {
            var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
            return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63);
          }
        };
        var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
        var utob = function(u) {
          return u.replace(re_utob, cb_utob);
        };
        var cb_encode = function(ccc) {
          var padlen = [0, 2, 1][ccc.length % 3], ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0), chars2 = [
            b64chars.charAt(ord >>> 18),
            b64chars.charAt(ord >>> 12 & 63),
            padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63),
            padlen >= 1 ? "=" : b64chars.charAt(ord & 63)
          ];
          return chars2.join("");
        };
        var btoa = global2.btoa && typeof global2.btoa == "function" ? function(b) {
          return global2.btoa(b);
        } : function(b) {
          if (b.match(/[^\x00-\xFF]/))
            throw new RangeError("The string contains invalid characters.");
          return b.replace(/[\s\S]{1,3}/g, cb_encode);
        };
        var _encode = function(u) {
          return btoa(utob(String(u)));
        };
        var mkUriSafe = function(b64) {
          return b64.replace(/[+\/]/g, function(m0) {
            return m0 == "+" ? "-" : "_";
          }).replace(/=/g, "");
        };
        var encode = function(u, urisafe) {
          return urisafe ? mkUriSafe(_encode(u)) : _encode(u);
        };
        var encodeURI2 = function(u) {
          return encode(u, true);
        };
        var fromUint8Array;
        if (global2.Uint8Array)
          fromUint8Array = function(a, urisafe) {
            var b64 = "";
            for (var i = 0, l = a.length; i < l; i += 3) {
              var a0 = a[i], a1 = a[i + 1], a2 = a[i + 2];
              var ord = a0 << 16 | a1 << 8 | a2;
              b64 += b64chars.charAt(ord >>> 18) + b64chars.charAt(ord >>> 12 & 63) + (typeof a1 != "undefined" ? b64chars.charAt(ord >>> 6 & 63) : "=") + (typeof a2 != "undefined" ? b64chars.charAt(ord & 63) : "=");
            }
            return urisafe ? mkUriSafe(b64) : b64;
          };
        var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
        var cb_btou = function(cccc) {
          switch (cccc.length) {
            case 4:
              var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
              return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320);
            case 3:
              return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
            default:
              return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
          }
        };
        var btou = function(b) {
          return b.replace(re_btou, cb_btou);
        };
        var cb_decode = function(cccc) {
          var len = cccc.length, padlen = len % 4, n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0), chars2 = [
            fromCharCode(n >>> 16),
            fromCharCode(n >>> 8 & 255),
            fromCharCode(n & 255)
          ];
          chars2.length -= [0, 0, 2, 1][padlen];
          return chars2.join("");
        };
        var _atob = global2.atob && typeof global2.atob == "function" ? function(a) {
          return global2.atob(a);
        } : function(a) {
          return a.replace(/\S{1,4}/g, cb_decode);
        };
        var atob = function(a) {
          return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ""));
        };
        var _decode = function(a) {
          return btou(_atob(a));
        };
        var _fromURI = function(a) {
          return String(a).replace(/[-_]/g, function(m0) {
            return m0 == "-" ? "+" : "/";
          }).replace(/[^A-Za-z0-9\+\/]/g, "");
        };
        var decode = function(a) {
          return _decode(_fromURI(a));
        };
        var toUint8Array;
        if (global2.Uint8Array)
          toUint8Array = function(a) {
            return Uint8Array.from(atob(_fromURI(a)), function(c) {
              return c.charCodeAt(0);
            });
          };
        var noConflict = function() {
          var Base642 = global2.Base64;
          global2.Base64 = _Base64;
          return Base642;
        };
        global2.Base64 = {
          VERSION: version,
          atob,
          btoa,
          fromBase64: decode,
          toBase64: encode,
          utob,
          encode,
          encodeURI: encodeURI2,
          btou,
          decode,
          noConflict,
          fromUint8Array,
          toUint8Array
        };
        if (typeof Object.defineProperty === "function") {
          var noEnum = function(v) {
            return {value: v, enumerable: false, writable: true, configurable: true};
          };
          global2.Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", noEnum(function() {
              return decode(this);
            }));
            Object.defineProperty(String.prototype, "toBase64", noEnum(function(urisafe) {
              return encode(this, urisafe);
            }));
            Object.defineProperty(String.prototype, "toBase64URI", noEnum(function() {
              return encode(this, true);
            }));
          };
        }
        if (global2["Meteor"]) {
          Base64 = global2.Base64;
        }
        if (module3.exports) {
          module3.exports.Base64 = global2.Base64;
        }
        return {Base64: global2.Base64};
      });
    });
    var SERIALIZATION_OPTIONS = {
      relaxed: false
    };
    function serialize(obj) {
      return bson.EJSON.serialize(obj, SERIALIZATION_OPTIONS);
    }
    function deserialize(obj) {
      if (Array.isArray(obj)) {
        return obj.map((doc) => bson.EJSON.deserialize(doc));
      } else {
        return bson.EJSON.deserialize(obj);
      }
    }
    var UserType;
    (function(UserType2) {
      UserType2["Normal"] = "normal";
      UserType2["Server"] = "server";
    })(UserType || (UserType = {}));
    var DataKey;
    (function(DataKey2) {
      DataKey2["NAME"] = "name";
      DataKey2["EMAIL"] = "email";
      DataKey2["PICTURE"] = "picture";
      DataKey2["FIRST_NAME"] = "first_name";
      DataKey2["LAST_NAME"] = "last_name";
      DataKey2["GENDER"] = "gender";
      DataKey2["BIRTHDAY"] = "birthday";
      DataKey2["MIN_AGE"] = "min_age";
      DataKey2["MAX_AGE"] = "max_age";
    })(DataKey || (DataKey = {}));
    var DATA_MAPPING = {
      [DataKey.NAME]: "name",
      [DataKey.EMAIL]: "email",
      [DataKey.PICTURE]: "pictureUrl",
      [DataKey.FIRST_NAME]: "firstName",
      [DataKey.LAST_NAME]: "lastName",
      [DataKey.GENDER]: "gender",
      [DataKey.BIRTHDAY]: "birthday",
      [DataKey.MIN_AGE]: "minAge",
      [DataKey.MAX_AGE]: "maxAge"
    };
    var UserProfile = class {
      constructor(response) {
        this.type = UserType.Normal;
        this.identities = [];
        if (typeof response === "object" && response !== null) {
          const {type, identities, data} = response;
          if (typeof type === "string") {
            this.type = type;
          } else {
            throw new Error("Expected 'type' in the response body");
          }
          if (Array.isArray(identities)) {
            this.identities = identities.map((identity) => {
              return {
                id: identity.id,
                providerType: identity["provider_type"]
              };
            });
          } else {
            throw new Error("Expected 'identities' in the response body");
          }
          if (typeof data === "object" && data !== null) {
            const mappedData = Object.fromEntries(Object.entries(data).map(([key, value]) => {
              if (key in DATA_MAPPING) {
                return [DATA_MAPPING[key], value];
              } else {
                return [key, value];
              }
            }));
            this.data = deserialize(mappedData);
          } else {
            throw new Error("Expected 'data' in the response body");
          }
        } else {
          this.data = {};
        }
      }
    };
    var ACCESS_TOKEN_STORAGE_KEY = "accessToken";
    var REFRESH_TOKEN_STORAGE_KEY = "refreshToken";
    var PROFILE_STORAGE_KEY = "profile";
    var PROVIDER_TYPE_STORAGE_KEY = "providerType";
    var UserStorage = class extends PrefixedStorage {
      constructor(storage, userId) {
        super(storage, `user(${userId})`);
      }
      get accessToken() {
        return this.get(ACCESS_TOKEN_STORAGE_KEY);
      }
      set accessToken(value) {
        if (value === null) {
          this.remove(ACCESS_TOKEN_STORAGE_KEY);
        } else {
          this.set(ACCESS_TOKEN_STORAGE_KEY, value);
        }
      }
      get refreshToken() {
        return this.get(REFRESH_TOKEN_STORAGE_KEY);
      }
      set refreshToken(value) {
        if (value === null) {
          this.remove(REFRESH_TOKEN_STORAGE_KEY);
        } else {
          this.set(REFRESH_TOKEN_STORAGE_KEY, value);
        }
      }
      get profile() {
        const value = this.get(PROFILE_STORAGE_KEY);
        if (value) {
          const profile = new UserProfile();
          Object.assign(profile, JSON.parse(value));
          return profile;
        }
      }
      set profile(value) {
        if (value) {
          this.set(PROFILE_STORAGE_KEY, JSON.stringify(value));
        } else {
          this.remove(PROFILE_STORAGE_KEY);
        }
      }
      get providerType() {
        const value = this.get(PROVIDER_TYPE_STORAGE_KEY);
        if (value) {
          return value;
        }
      }
      set providerType(value) {
        if (value) {
          this.set(PROVIDER_TYPE_STORAGE_KEY, value);
        } else {
          this.remove(PROVIDER_TYPE_STORAGE_KEY);
        }
      }
    };
    function removeKeysWithUndefinedValues(obj) {
      return Object.fromEntries(Object.entries(obj).filter((entry) => typeof entry[1] !== "undefined"));
    }
    function generateRandomString(length, alphabet) {
      let result = "";
      for (let i = 0; i < length; i++) {
        result += alphabet[Math.floor(Math.random() * alphabet.length)];
      }
      return result;
    }
    function encodeQueryString(params, prefixed = true) {
      const cleanedParams = removeKeysWithUndefinedValues(params);
      const prefix = prefixed && Object.keys(cleanedParams).length > 0 ? "?" : "";
      return prefix + Object.entries(cleanedParams).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&");
    }
    function decodeQueryString(str) {
      const cleanStr = str[0] === "?" ? str.substr(1) : str;
      return Object.fromEntries(cleanStr.split("&").filter((s2) => s2.length > 0).map((kvp) => kvp.split("=")).map(([k, v]) => [k, decodeURIComponent(v)]));
    }
    var RESERVED_NAMES = [
      "inspect",
      "callFunction",
      "callFunctionStreaming",
      ...Object.getOwnPropertyNames(Object.prototype)
    ];
    function cleanArgs(args) {
      for (const arg of args) {
        if (typeof arg === "object") {
          for (const [key, value] of Object.entries(arg)) {
            if (value === void 0) {
              delete arg[key];
            }
          }
        }
      }
      return args;
    }
    function cleanArgsAndSerialize(args) {
      const cleaned = cleanArgs(args);
      return cleaned.map((arg) => typeof arg === "object" ? serialize(arg) : arg);
    }
    var FunctionsFactory = class {
      constructor(fetcher, config = {}) {
        this.fetcher = fetcher;
        this.serviceName = config.serviceName;
        this.argsTransformation = config.argsTransformation || cleanArgsAndSerialize;
      }
      static create(fetcher, config = {}) {
        const factory = new FunctionsFactory(fetcher, config);
        return new Proxy(factory, {
          get(target, p, receiver) {
            if (typeof p === "string" && RESERVED_NAMES.indexOf(p) === -1) {
              return target.callFunction.bind(target, p);
            } else {
              const prop = Reflect.get(target, p, receiver);
              return typeof prop === "function" ? prop.bind(target) : prop;
            }
          }
        });
      }
      async callFunction(name, ...args) {
        const body = {
          name,
          arguments: this.argsTransformation ? this.argsTransformation(args) : args
        };
        if (this.serviceName) {
          body.service = this.serviceName;
        }
        const appRoute = this.fetcher.appRoute;
        return this.fetcher.fetchJSON({
          method: "POST",
          path: appRoute.functionsCall().path,
          body
        });
      }
      callFunctionStreaming(name, ...args) {
        const body = {
          name,
          arguments: this.argsTransformation ? this.argsTransformation(args) : args
        };
        if (this.serviceName) {
          body.service = this.serviceName;
        }
        const appRoute = this.fetcher.appRoute;
        const qs = encodeQueryString({
          ["baas_request"]: Base64.encode(JSON.stringify(body))
        });
        return this.fetcher.fetchStream({
          method: "GET",
          path: appRoute.functionsCall().path + qs
        });
      }
    };
    var EmailPasswordAuth = class {
      constructor(fetcher, providerName = "local-userpass") {
        this.fetcher = fetcher;
        this.providerName = providerName;
      }
      async registerUser(email, password) {
        const appRoute = this.fetcher.appRoute;
        await this.fetcher.fetchJSON({
          method: "POST",
          path: appRoute.emailPasswordAuth(this.providerName).register().path,
          body: {email, password}
        });
      }
      async confirmUser(token, tokenId) {
        const appRoute = this.fetcher.appRoute;
        await this.fetcher.fetchJSON({
          method: "POST",
          path: appRoute.emailPasswordAuth(this.providerName).confirm().path,
          body: {token, tokenId}
        });
      }
      async resendConfirmationEmail(email) {
        const appRoute = this.fetcher.appRoute;
        await this.fetcher.fetchJSON({
          method: "POST",
          path: appRoute.emailPasswordAuth(this.providerName).confirmSend().path,
          body: {email}
        });
      }
      async resetPassword(token, tokenId, password) {
        const appRoute = this.fetcher.appRoute;
        await this.fetcher.fetchJSON({
          method: "POST",
          path: appRoute.emailPasswordAuth(this.providerName).reset().path,
          body: {token, tokenId, password}
        });
      }
      async sendResetPasswordEmail(email) {
        const appRoute = this.fetcher.appRoute;
        await this.fetcher.fetchJSON({
          method: "POST",
          path: appRoute.emailPasswordAuth(this.providerName).resetSend().path,
          body: {email}
        });
      }
      async callResetPasswordFunction(email, password, ...args) {
        const appRoute = this.fetcher.appRoute;
        await this.fetcher.fetchJSON({
          method: "POST",
          path: appRoute.emailPasswordAuth(this.providerName).resetCall().path,
          body: {email, password, arguments: args}
        });
      }
    };
    function api() {
      return {
        path: "/api/client/v2.0",
        app(appId) {
          return {
            path: this.path + `/app/${appId}`,
            location() {
              return {
                path: this.path + "/location"
              };
            },
            authProvider(providerName) {
              return {
                path: this.path + `/auth/providers/${providerName}`,
                login() {
                  return {path: this.path + "/login"};
                }
              };
            },
            emailPasswordAuth(providerName) {
              const authProviderRoutes = this.authProvider(providerName);
              return {
                ...authProviderRoutes,
                register() {
                  return {path: this.path + "/register"};
                },
                confirm() {
                  return {path: this.path + "/confirm"};
                },
                confirmSend() {
                  return {path: this.path + "/confirm/send"};
                },
                reset() {
                  return {path: this.path + "/reset"};
                },
                resetSend() {
                  return {path: this.path + "/reset/send"};
                },
                resetCall() {
                  return {path: this.path + "/reset/call"};
                }
              };
            },
            functionsCall() {
              return {
                path: this.path + "/functions/call"
              };
            }
          };
        },
        auth() {
          return {
            path: this.path + "/auth",
            apiKeys() {
              return {
                path: this.path + "/api_keys",
                key(id) {
                  return {
                    path: this.path + `/${id}`,
                    enable() {
                      return {path: this.path + "/enable"};
                    },
                    disable() {
                      return {path: this.path + "/disable"};
                    }
                  };
                }
              };
            },
            profile() {
              return {path: this.path + "/profile"};
            },
            session() {
              return {path: this.path + "/session"};
            }
          };
        }
      };
    }
    var routes = {api};
    var ApiKeyAuth = class {
      constructor(fetcher, providerName = "api-key") {
        this.fetcher = fetcher;
      }
      create(name) {
        return this.fetcher.fetchJSON({
          method: "POST",
          body: {name},
          path: routes.api().auth().apiKeys().path,
          tokenType: "refresh"
        });
      }
      fetch(keyId) {
        return this.fetcher.fetchJSON({
          method: "GET",
          path: routes.api().auth().apiKeys().key(keyId).path,
          tokenType: "refresh"
        });
      }
      fetchAll() {
        return this.fetcher.fetchJSON({
          method: "GET",
          tokenType: "refresh",
          path: routes.api().auth().apiKeys().path
        });
      }
      async delete(keyId) {
        await this.fetcher.fetchJSON({
          method: "DELETE",
          path: routes.api().auth().apiKeys().key(keyId).path,
          tokenType: "refresh"
        });
      }
      async enable(keyId) {
        await this.fetcher.fetchJSON({
          method: "PUT",
          path: routes.api().auth().apiKeys().key(keyId).enable().path,
          tokenType: "refresh"
        });
      }
      async disable(keyId) {
        await this.fetcher.fetchJSON({
          method: "PUT",
          path: routes.api().auth().apiKeys().key(keyId).disable().path,
          tokenType: "refresh"
        });
      }
    };
    var WatchError = class extends Error {
      constructor({message, code}) {
        super(message);
        this.name = "WatchError";
        this.code = code;
      }
    };
    var WatchStreamState;
    (function(WatchStreamState2) {
      WatchStreamState2["NEED_DATA"] = "NEED_DATA";
      WatchStreamState2["HAVE_EVENT"] = "HAVE_EVENT";
      WatchStreamState2["HAVE_ERROR"] = "HAVE_ERROR";
    })(WatchStreamState || (WatchStreamState = {}));
    var WatchStream = class {
      constructor() {
        this._state = WatchStreamState.NEED_DATA;
        this._error = null;
        this._textDecoder = new (getEnvironment()).TextDecoder();
        this._buffer = "";
        this._bufferOffset = 0;
        this._eventType = "";
        this._dataBuffer = "";
      }
      feedBuffer(buffer) {
        this.assertState(WatchStreamState.NEED_DATA);
        this._buffer += this._textDecoder.decode(buffer, {stream: true});
        this.advanceBufferState();
      }
      feedLine(line) {
        this.assertState(WatchStreamState.NEED_DATA);
        if (line.endsWith("\n"))
          line = line.substr(0, line.length - 1);
        if (line.endsWith("\r"))
          line = line.substr(0, line.length - 1);
        if (line.length === 0) {
          if (this._dataBuffer.length === 0) {
            this._eventType = "";
            return;
          }
          if (this._dataBuffer.endsWith("\n"))
            this._dataBuffer = this._dataBuffer.substr(0, this._dataBuffer.length - 1);
          this.feedSse({
            data: this._dataBuffer,
            eventType: this._eventType
          });
          this._dataBuffer = "";
          this._eventType = "";
        }
        if (line[0] === ":")
          return;
        const colon = line.indexOf(":");
        const field = line.substr(0, colon);
        let value = colon === -1 ? "" : line.substr(colon + 1);
        if (value.startsWith(" "))
          value = value.substr(1);
        if (field === "event") {
          this._eventType = value;
        } else if (field === "data") {
          this._dataBuffer += value;
          this._dataBuffer += "\n";
        } else
          ;
      }
      feedSse(sse) {
        this.assertState(WatchStreamState.NEED_DATA);
        const firstPercentIndex = sse.data.indexOf("%");
        if (firstPercentIndex !== -1) {
          let buffer = "";
          let start = 0;
          for (let percentIndex = firstPercentIndex; percentIndex !== -1; percentIndex = sse.data.indexOf("%", start)) {
            buffer += sse.data.substr(start, percentIndex - start);
            const encoded = sse.data.substr(percentIndex, 3);
            if (encoded === "%25") {
              buffer += "%";
            } else if (encoded === "%0A") {
              buffer += "\n";
            } else if (encoded === "%0D") {
              buffer += "\r";
            } else {
              buffer += encoded;
            }
            start = percentIndex + encoded.length;
          }
          buffer += sse.data.substr(start);
          sse.data = buffer;
        }
        if (!sse.eventType || sse.eventType === "message") {
          try {
            const parsed = bson.EJSON.parse(sse.data);
            if (typeof parsed === "object") {
              this._nextEvent = parsed;
              this._state = WatchStreamState.HAVE_EVENT;
              return;
            }
          } catch {
          }
          this._state = WatchStreamState.HAVE_ERROR;
          this._error = new WatchError({
            message: "server returned malformed event: " + sse.data,
            code: "bad bson parse"
          });
        } else if (sse.eventType === "error") {
          this._state = WatchStreamState.HAVE_ERROR;
          this._error = new WatchError({
            message: sse.data,
            code: "unknown"
          });
          try {
            const {error_code: errorCode, error: error3} = bson.EJSON.parse(sse.data);
            if (typeof errorCode !== "string")
              return;
            if (typeof error3 !== "string")
              return;
            this._error = new WatchError({
              message: error3,
              code: errorCode
            });
          } catch {
            return;
          }
        } else
          ;
      }
      get state() {
        return this._state;
      }
      nextEvent() {
        this.assertState(WatchStreamState.HAVE_EVENT);
        const out = this._nextEvent;
        this._state = WatchStreamState.NEED_DATA;
        this.advanceBufferState();
        return out;
      }
      get error() {
        return this._error;
      }
      advanceBufferState() {
        this.assertState(WatchStreamState.NEED_DATA);
        while (this.state === WatchStreamState.NEED_DATA) {
          if (this._bufferOffset === this._buffer.length) {
            this._buffer = "";
            this._bufferOffset = 0;
            return;
          }
          const nextNewlineIndex = this._buffer.indexOf("\n", this._bufferOffset);
          if (nextNewlineIndex === -1) {
            if (this._bufferOffset !== 0) {
              this._buffer = this._buffer.substr(this._bufferOffset, this._buffer.length - this._bufferOffset);
              this._bufferOffset = 0;
            }
            return;
          }
          this.feedLine(this._buffer.substr(this._bufferOffset, nextNewlineIndex - this._bufferOffset));
          this._bufferOffset = nextNewlineIndex + 1;
        }
      }
      assertState(state) {
        if (this._state !== state) {
          throw Error(`Expected WatchStream to be in state ${state}, but in state ${this._state}`);
        }
      }
    };
    var MongoDBCollection = class {
      constructor(fetcher, serviceName, databaseName, collectionName) {
        this.functions = FunctionsFactory.create(fetcher, {
          serviceName
        });
        this.databaseName = databaseName;
        this.collectionName = collectionName;
        this.serviceName = serviceName;
        this.fetcher = fetcher;
      }
      find(filter = {}, options2 = {}) {
        return this.functions.find({
          database: this.databaseName,
          collection: this.collectionName,
          query: filter,
          project: options2.projection,
          sort: options2.sort,
          limit: options2.limit
        });
      }
      findOne(filter = {}, options2 = {}) {
        return this.functions.findOne({
          database: this.databaseName,
          collection: this.collectionName,
          query: filter,
          project: options2.projection,
          sort: options2.sort
        });
      }
      findOneAndUpdate(filter = {}, update, options2 = {}) {
        return this.functions.findOneAndUpdate({
          database: this.databaseName,
          collection: this.collectionName,
          filter,
          update,
          sort: options2.sort,
          projection: options2.projection,
          upsert: options2.upsert,
          returnNewDocument: options2.returnNewDocument
        });
      }
      findOneAndReplace(filter = {}, replacement, options2 = {}) {
        return this.functions.findOneAndReplace({
          database: this.databaseName,
          collection: this.collectionName,
          filter,
          update: replacement,
          sort: options2.sort,
          projection: options2.projection,
          upsert: options2.upsert,
          returnNewDocument: options2.returnNewDocument
        });
      }
      findOneAndDelete(filter = {}, options2 = {}) {
        return this.functions.findOneAndReplace({
          database: this.databaseName,
          collection: this.collectionName,
          filter,
          sort: options2.sort,
          projection: options2.projection
        });
      }
      aggregate(pipeline2) {
        return this.functions.aggregate({
          database: this.databaseName,
          collection: this.collectionName,
          pipeline: pipeline2
        });
      }
      count(filter = {}, options2 = {}) {
        return this.functions.count({
          database: this.databaseName,
          collection: this.collectionName,
          query: filter,
          limit: options2.limit
        });
      }
      insertOne(document2) {
        return this.functions.insertOne({
          database: this.databaseName,
          collection: this.collectionName,
          document: document2
        });
      }
      insertMany(documents) {
        return this.functions.insertMany({
          database: this.databaseName,
          collection: this.collectionName,
          documents
        });
      }
      deleteOne(filter = {}) {
        return this.functions.deleteOne({
          database: this.databaseName,
          collection: this.collectionName,
          query: filter
        });
      }
      deleteMany(filter = {}) {
        return this.functions.deleteMany({
          database: this.databaseName,
          collection: this.collectionName,
          query: filter
        });
      }
      updateOne(filter, update, options2 = {}) {
        return this.functions.updateOne({
          database: this.databaseName,
          collection: this.collectionName,
          query: filter,
          update,
          upsert: options2.upsert
        });
      }
      updateMany(filter, update, options2 = {}) {
        return this.functions.updateMany({
          database: this.databaseName,
          collection: this.collectionName,
          query: filter,
          update,
          upsert: options2.upsert
        });
      }
      async *watch({ids, filter} = {}) {
        const iterator = await this.functions.callFunctionStreaming("watch", {
          database: this.databaseName,
          collection: this.collectionName,
          ids,
          filter
        });
        const watchStream = new WatchStream();
        for await (const chunk of iterator) {
          if (!chunk)
            continue;
          watchStream.feedBuffer(chunk);
          while (watchStream.state == WatchStreamState.HAVE_EVENT) {
            yield watchStream.nextEvent();
          }
          if (watchStream.state == WatchStreamState.HAVE_ERROR)
            throw watchStream.error;
        }
      }
    };
    function createCollection(fetcher, serviceName, databaseName, collectionName) {
      return new MongoDBCollection(fetcher, serviceName, databaseName, collectionName);
    }
    function createDatabase(fetcher, serviceName, databaseName) {
      return {
        collection: createCollection.bind(null, fetcher, serviceName, databaseName)
      };
    }
    function createService(fetcher, serviceName = "mongo-db") {
      return {db: createDatabase.bind(null, fetcher, serviceName)};
    }
    var DEFAULT_DEVICE_ID = "000000000000000000000000";
    (function(UserState) {
      UserState["Active"] = "active";
      UserState["LoggedOut"] = "logged-out";
      UserState["Removed"] = "removed";
    })(exports.UserState || (exports.UserState = {}));
    (function(UserType2) {
      UserType2["Normal"] = "normal";
      UserType2["Server"] = "server";
    })(exports.UserType || (exports.UserType = {}));
    var User = class {
      constructor(parameters) {
        this.app = parameters.app;
        this.id = parameters.id;
        this.storage = new UserStorage(this.app.storage, this.id);
        if ("accessToken" in parameters && "refreshToken" in parameters && "providerType" in parameters) {
          this._accessToken = parameters.accessToken;
          this._refreshToken = parameters.refreshToken;
          this.providerType = parameters.providerType;
          this.storage.accessToken = parameters.accessToken;
          this.storage.refreshToken = parameters.refreshToken;
          this.storage.providerType = parameters.providerType;
        } else {
          this._accessToken = this.storage.accessToken;
          this._refreshToken = this.storage.refreshToken;
          const providerType = this.storage.providerType;
          this._profile = this.storage.profile;
          if (providerType) {
            this.providerType = providerType;
          } else {
            throw new Error("Storage is missing a provider type");
          }
        }
        this.fetcher = this.app.fetcher.clone({
          userContext: {currentUser: this}
        });
        this.apiKeys = new ApiKeyAuth(this.fetcher);
        this.functions = FunctionsFactory.create(this.fetcher);
      }
      get accessToken() {
        return this._accessToken;
      }
      set accessToken(token) {
        this._accessToken = token;
        this.storage.accessToken = token;
      }
      get refreshToken() {
        return this._refreshToken;
      }
      set refreshToken(token) {
        this._refreshToken = token;
        this.storage.refreshToken = token;
      }
      get state() {
        if (this.id in this.app.allUsers) {
          return this.refreshToken === null ? exports.UserState.LoggedOut : exports.UserState.Active;
        } else {
          return exports.UserState.Removed;
        }
      }
      get isLoggedIn() {
        return this.state === exports.UserState.Active;
      }
      get customData() {
        if (this.accessToken) {
          const decodedToken = this.decodeAccessToken();
          return decodedToken.userData;
        } else {
          throw new Error("Cannot read custom data without an access token");
        }
      }
      get profile() {
        if (this._profile) {
          return this._profile.data;
        } else {
          throw new Error("A profile was never fetched for this user");
        }
      }
      get identities() {
        if (this._profile) {
          return this._profile.identities;
        } else {
          throw new Error("A profile was never fetched for this user");
        }
      }
      get deviceId() {
        if (this.accessToken) {
          const payload = this.accessToken.split(".")[1];
          if (payload) {
            const parsedPayload = JSON.parse(base64.Base64.decode(payload));
            const deviceId = parsedPayload["baas_device_id"];
            if (typeof deviceId === "string" && deviceId !== DEFAULT_DEVICE_ID) {
              return deviceId;
            }
          }
        }
        return null;
      }
      async refreshProfile() {
        const response = await this.fetcher.fetchJSON({
          method: "GET",
          path: routes.api().auth().profile().path
        });
        this._profile = new UserProfile(response);
        this.storage.profile = this._profile;
      }
      async logOut() {
        try {
          if (this._refreshToken !== null) {
            await this.fetcher.fetchJSON({
              method: "DELETE",
              path: routes.api().auth().session().path,
              tokenType: "refresh"
            });
          }
        } finally {
          this.accessToken = null;
          this.refreshToken = null;
        }
      }
      async linkCredentials(credentials) {
        const response = await this.app.authenticator.authenticate(credentials, this);
        if (this.id !== response.userId) {
          const details = `got user id ${response.userId} expected ${this.id}`;
          throw new Error(`Link response ment for another user (${details})`);
        }
        this.accessToken = response.accessToken;
        await this.refreshProfile();
      }
      async refreshAccessToken() {
        const response = await this.fetcher.fetchJSON({
          method: "POST",
          path: routes.api().auth().session().path,
          tokenType: "refresh"
        });
        const {access_token: accessToken} = response;
        if (typeof accessToken === "string") {
          this.accessToken = accessToken;
        } else {
          throw new Error("Expected an 'access_token' in the response");
        }
      }
      async refreshCustomData() {
        await this.refreshAccessToken();
        return this.customData;
      }
      callFunction(name, ...args) {
        return this.functions.callFunction(name, ...args);
      }
      toJSON() {
        return {
          id: this.id,
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
          profile: this._profile,
          state: this.state,
          customData: this.customData
        };
      }
      push(serviceName = "") {
        throw new Error("Not yet implemented");
      }
      mongoClient(serviceName) {
        return createService(this.fetcher, serviceName);
      }
      decodeAccessToken() {
        if (this.accessToken) {
          const parts = this.accessToken.split(".");
          if (parts.length !== 3) {
            throw new Error("Expected an access token with three parts");
          }
          const encodedPayload = parts[1];
          const decodedPayload = base64.Base64.decode(encodedPayload);
          const parsedPayload = JSON.parse(decodedPayload);
          const {exp: expires, iat: issuedAt, sub: subject, user_data: userData = {}} = parsedPayload;
          if (typeof expires !== "number") {
            throw new Error("Failed to decode access token 'exp'");
          } else if (typeof issuedAt !== "number") {
            throw new Error("Failed to decode access token 'iat'");
          }
          return {expires, issuedAt, subject, userData};
        } else {
          throw new Error("Missing an access token");
        }
      }
    };
    var Credentials = class {
      constructor(providerName, providerType, payload) {
        this.providerName = providerName;
        this.providerType = providerType;
        this.payload = payload;
      }
      static anonymous() {
        return new Credentials("anon-user", "anon-user", {});
      }
      static userApiKey(key) {
        return new Credentials("api-key", "api-key", {key});
      }
      static serverApiKey(key) {
        return new Credentials("api-key", "api-key", {key});
      }
      static apiKey(key) {
        return new Credentials("api-key", "api-key", {key});
      }
      static emailPassword(email, password) {
        return new Credentials("local-userpass", "local-userpass", {
          username: email,
          password
        });
      }
      static function(payload) {
        return new Credentials("custom-function", "custom-function", payload);
      }
      static jwt(token) {
        return new Credentials("custom-token", "custom-token", {
          token
        });
      }
      static google(payload) {
        return new Credentials("oauth2-google", "oauth2-google", Credentials.derivePayload(payload));
      }
      static derivePayload(payload) {
        if (typeof payload === "string") {
          if (payload.includes("://")) {
            return this.derivePayload({redirectUrl: payload});
          } else if (payload.startsWith("4/")) {
            return this.derivePayload({authCode: payload});
          } else if (payload.startsWith("ey")) {
            return this.derivePayload({idToken: payload});
          } else {
            throw new Error(`Unexpected payload: ${payload}`);
          }
        } else if (Object.keys(payload).length === 1) {
          if ("authCode" in payload || "redirectUrl" in payload) {
            return payload;
          } else if ("idToken" in payload) {
            return {id_token: payload.idToken};
          } else {
            throw new Error("Unexpected payload: " + JSON.stringify(payload));
          }
        } else {
          throw new Error("Expected only one property in payload, got " + JSON.stringify(payload));
        }
      }
      static facebook(redirectUrlOrAccessToken) {
        return new Credentials("oauth2-facebook", "oauth2-facebook", redirectUrlOrAccessToken.includes("://") ? {redirectUrl: redirectUrlOrAccessToken} : {accessToken: redirectUrlOrAccessToken});
      }
      static apple(redirectUrlOrIdToken) {
        return new Credentials("oauth2-apple", "oauth2-apple", redirectUrlOrIdToken.includes("://") ? {redirectUrl: redirectUrlOrIdToken} : {
          id_token: redirectUrlOrIdToken
        });
      }
    };
    var USER_IDS_STORAGE_KEY = "userIds";
    var DEVICE_ID_STORAGE_KEY = "deviceId";
    var AppStorage = class extends PrefixedStorage {
      constructor(storage, appId) {
        super(storage, `app(${appId})`);
      }
      getUserIds() {
        const userIdsString = this.get(USER_IDS_STORAGE_KEY);
        const userIds = userIdsString ? JSON.parse(userIdsString) : [];
        if (Array.isArray(userIds)) {
          return [...new Set(userIds)];
        } else {
          throw new Error("Expected the user ids to be an array");
        }
      }
      setUserIds(userIds, mergeWithExisting) {
        if (mergeWithExisting) {
          const existingIds = this.getUserIds();
          for (const id of existingIds) {
            if (userIds.indexOf(id) === -1) {
              userIds.push(id);
            }
          }
        }
        this.set(USER_IDS_STORAGE_KEY, JSON.stringify(userIds));
      }
      removeUserId(userId) {
        const existingIds = this.getUserIds();
        const userIds = existingIds.filter((id) => id !== userId);
        this.setUserIds(userIds, false);
      }
      getDeviceId() {
        return this.get(DEVICE_ID_STORAGE_KEY);
      }
      setDeviceId(deviceId) {
        this.set(DEVICE_ID_STORAGE_KEY, deviceId);
      }
    };
    var LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
    var CLOSE_CHECK_INTERVAL = 100;
    var REDIRECT_HASH_TO_RESULT = {
      _stitch_client_app_id: "appId",
      _baas_client_app_id: "appId",
      _stitch_ua: "userAuth",
      _baas_ua: "userAuth",
      _stitch_link: "link",
      _baas_link: "link",
      _stitch_error: "error",
      _baas_error: "error",
      _stitch_state: "state",
      _baas_state: "state"
    };
    var OAuth2Helper = class {
      constructor(storage, openWindow = getEnvironment().openWindow) {
        this.storage = storage.prefix("oauth2");
        this.openWindow = openWindow;
      }
      static parseRedirectLocation(queryString) {
        const params = decodeQueryString(queryString);
        const result = {};
        for (const [p, r] of Object.entries(REDIRECT_HASH_TO_RESULT)) {
          const value = params[p];
          if (value) {
            result[r] = value;
          }
        }
        return result;
      }
      static handleRedirect(queryString, storage = getEnvironment().defaultStorage) {
        const result = OAuth2Helper.parseRedirectLocation(queryString);
        const {state, error: error3} = result;
        if (typeof state === "string") {
          const oauth2Storage = storage.prefix("oauth2");
          const stateStorage = OAuth2Helper.getStateStorage(oauth2Storage, state);
          stateStorage.set("result", JSON.stringify(result));
        } else if (error3) {
          throw new Error(`Failed to handle OAuth 2.0 redirect: ${error3}`);
        } else {
          throw new Error("Failed to handle OAuth 2.0 redirect.");
        }
      }
      static decodeAuthInfo(authInfo) {
        const parts = (authInfo || "").split("$");
        if (parts.length === 4) {
          const [accessToken, refreshToken, userId, deviceId] = parts;
          return {accessToken, refreshToken, userId, deviceId};
        } else {
          throw new Error("Failed to decode 'authInfo' into ids and tokens");
        }
      }
      static getStateStorage(storage, state) {
        return storage.prefix(`state(${state})`);
      }
      openWindowAndWaitForRedirect(url, state) {
        const stateStorage = OAuth2Helper.getStateStorage(this.storage, state);
        return new Promise((resolve2, reject) => {
          let redirectWindow = null;
          let windowClosedInterval;
          const handleStorageUpdate = () => {
            const result = stateStorage.get("result");
            if (result) {
              const parsedResult = JSON.parse(result);
              stateStorage.removeListener(handleStorageUpdate);
              stateStorage.clear();
              try {
                if (redirectWindow) {
                  clearInterval(windowClosedInterval);
                  redirectWindow.close();
                }
              } catch (err) {
                console.warn(`Failed closing redirect window: ${err}`);
              } finally {
                resolve2(parsedResult);
              }
            }
          };
          stateStorage.addListener(handleStorageUpdate);
          redirectWindow = this.openWindow(url);
          windowClosedInterval = setInterval(() => {
            if (!redirectWindow) {
              clearInterval(windowClosedInterval);
            } else if (redirectWindow.closed) {
              clearInterval(windowClosedInterval);
              stateStorage.removeListener(handleStorageUpdate);
              const err = new Error("Window closed");
              reject(err);
            }
          }, CLOSE_CHECK_INTERVAL);
        });
      }
      generateState() {
        return generateRandomString(12, LOWERCASE_LETTERS);
      }
    };
    var REDIRECT_LOCATION_HEADER = "x-baas-location";
    var Authenticator = class {
      constructor(fetcher, storage, getDeviceInformation) {
        this.fetcher = fetcher;
        this.oauth2 = new OAuth2Helper(storage);
        this.getDeviceInformation = getDeviceInformation;
      }
      async authenticate(credentials, linkingUser) {
        const deviceInformation = this.getDeviceInformation();
        const isLinking = typeof linkingUser === "object";
        if (credentials.providerType.startsWith("oauth2") && typeof credentials.payload.redirectUrl === "string") {
          const state = this.oauth2.generateState();
          const url = await this.getLogInUrl(credentials, isLinking, {
            state,
            redirect: credentials.payload.redirectUrl,
            providerRedirectHeader: isLinking ? true : void 0,
            device: !isLinking ? deviceInformation.encode() : void 0
          });
          if (isLinking) {
            const response = await this.fetcher.fetch({
              method: "GET",
              url,
              tokenType: isLinking ? "access" : "none",
              user: linkingUser,
              mode: "cors",
              credentials: "include"
            });
            const redirectUrl = response.headers.get(REDIRECT_LOCATION_HEADER);
            if (redirectUrl) {
              return this.openWindowAndWaitForAuthResponse(redirectUrl, state);
            } else {
              throw new Error(`Missing ${REDIRECT_LOCATION_HEADER} header`);
            }
          } else {
            return this.openWindowAndWaitForAuthResponse(url, state);
          }
        } else {
          const logInUrl = await this.getLogInUrl(credentials, isLinking);
          const response = await this.fetcher.fetchJSON({
            method: "POST",
            url: logInUrl,
            body: {
              ...credentials.payload,
              options: {
                device: deviceInformation.toJSON()
              }
            },
            tokenType: isLinking ? "access" : "none",
            user: linkingUser
          });
          const {user_id: userId, access_token: accessToken, refresh_token: refreshToken = null, device_id: deviceId} = response;
          if (typeof userId !== "string") {
            throw new Error("Expected a user id in the response");
          }
          if (typeof accessToken !== "string") {
            throw new Error("Expected an access token in the response");
          }
          return {userId, accessToken, refreshToken, deviceId};
        }
      }
      async getLogInUrl(credentials, link = false, extraQueryParams = {}) {
        const appRoute = this.fetcher.appRoute;
        const loginRoute = appRoute.authProvider(credentials.providerName).login();
        const qs = encodeQueryString({
          link: link ? "true" : void 0,
          ...extraQueryParams
        });
        const locationUrl = await this.fetcher.locationUrl;
        return locationUrl + loginRoute.path + qs;
      }
      async openWindowAndWaitForAuthResponse(redirectUrl, state) {
        const redirectResult = await this.oauth2.openWindowAndWaitForRedirect(redirectUrl, state);
        return OAuth2Helper.decodeAuthInfo(redirectResult.userAuth);
      }
    };
    var MongoDBRealmError = class extends Error {
      constructor(method, url, statusCode, statusText, error3, errorCode, link) {
        const summary = statusText ? `status ${statusCode} ${statusText}` : `status ${statusCode}`;
        if (typeof error3 === "string") {
          super(`Request failed (${method} ${url}): ${error3} (${summary})`);
        } else {
          super(`Request failed (${method} ${url}): (${summary})`);
        }
        this.method = method;
        this.url = url;
        this.statusText = statusText;
        this.statusCode = statusCode;
        this.error = error3;
        this.errorCode = errorCode;
        this.link = link;
      }
      static async fromRequestAndResponse(request, response) {
        var _a;
        const {url, method} = request;
        const {status, statusText} = response;
        if ((_a = response.headers.get("content-type")) === null || _a === void 0 ? void 0 : _a.startsWith("application/json")) {
          const body = await response.json();
          const error3 = body.error || "No message";
          const errorCode = body.error_code;
          const link = body.link;
          return new MongoDBRealmError(method, url, status, statusText, error3, errorCode, link);
        } else {
          return new MongoDBRealmError(method, url, status, statusText);
        }
      }
    };
    function asyncIteratorFromResponseBody(body) {
      if (typeof body !== "object" || body === null) {
        throw new Error("Expected a non-null object");
      } else if (Symbol.asyncIterator in body) {
        return body;
      } else if ("getReader" in body) {
        const stream = body;
        return {
          [Symbol.asyncIterator]() {
            const reader = stream.getReader();
            return {
              next() {
                return reader.read();
              },
              async return() {
                await reader.cancel();
                return {done: true, value: null};
              }
            };
          }
        };
      } else {
        throw new Error("Expected an AsyncIterable or a ReadableStream");
      }
    }
    var Fetcher = class {
      constructor({appId, transport, userContext, locationUrlContext}) {
        this.appId = appId;
        this.transport = transport;
        this.userContext = userContext;
        this.locationUrlContext = locationUrlContext;
      }
      static buildAuthorizationHeader(user, tokenType) {
        if (!user || tokenType === "none") {
          return {};
        } else if (tokenType === "access") {
          return {Authorization: `Bearer ${user.accessToken}`};
        } else if (tokenType === "refresh") {
          return {Authorization: `Bearer ${user.refreshToken}`};
        } else {
          throw new Error(`Unexpected token type (${tokenType})`);
        }
      }
      static buildBody(body) {
        if (!body) {
          return;
        } else if (typeof body === "object" && body !== null) {
          return JSON.stringify(serialize(body));
        } else if (typeof body === "string") {
          return body;
        } else {
          console.log("body is", body);
          throw new Error("Unexpected type of body");
        }
      }
      static buildJsonHeader(body) {
        if (body && body.length > 0) {
          return {"Content-Type": "application/json"};
        } else {
          return {};
        }
      }
      clone(config) {
        return new Fetcher({
          appId: this.appId,
          transport: this.transport,
          userContext: this.userContext,
          locationUrlContext: this.locationUrlContext,
          ...config
        });
      }
      async fetch(request) {
        const {path, url, tokenType = "access", user = this.userContext.currentUser, ...restOfRequest} = request;
        if (typeof path === "string" && typeof url === "string") {
          throw new Error("Use of 'url' and 'path' mutually exclusive");
        } else if (typeof path === "string") {
          const url2 = await this.locationUrlContext.locationUrl + path;
          return this.fetch({...request, path: void 0, url: url2});
        } else if (typeof url === "string") {
          const response = await this.transport.fetch({
            ...restOfRequest,
            url,
            headers: {
              ...Fetcher.buildAuthorizationHeader(user, tokenType),
              ...request.headers
            }
          });
          if (response.ok) {
            return response;
          } else if (user && response.status === 401 && tokenType === "access") {
            await user.refreshAccessToken();
            return this.fetch({...request, user});
          } else {
            if (user && response.status === 401 && tokenType === "refresh") {
              user.accessToken = null;
              user.refreshToken = null;
            }
            throw await MongoDBRealmError.fromRequestAndResponse(request, response);
          }
        } else {
          throw new Error("Expected either 'url' or 'path'");
        }
      }
      async fetchJSON(request) {
        const {body} = request;
        const serializedBody = Fetcher.buildBody(body);
        const contentTypeHeaders = Fetcher.buildJsonHeader(serializedBody);
        const response = await this.fetch({
          ...request,
          body: serializedBody,
          headers: {
            Accept: "application/json",
            ...contentTypeHeaders,
            ...request.headers
          }
        });
        const contentType = response.headers.get("content-type");
        if (contentType === null || contentType === void 0 ? void 0 : contentType.startsWith("application/json")) {
          const responseBody = await response.json();
          return deserialize(responseBody);
        } else if (contentType === null) {
          return null;
        } else {
          throw new Error(`Expected JSON response, got "${contentType}"`);
        }
      }
      async fetchStream(request) {
        const {body} = await this.fetch({
          ...request,
          headers: {
            Accept: "text/event-stream",
            ...request.headers
          }
        });
        return asyncIteratorFromResponseBody(body);
      }
      get appRoute() {
        return routes.api().app(this.appId);
      }
      get locationUrl() {
        return this.locationUrlContext.locationUrl;
      }
    };
    var DEVICE_ID_STORAGE_KEY$1 = "deviceId";
    var DeviceFields;
    (function(DeviceFields2) {
      DeviceFields2["DEVICE_ID"] = "deviceId";
      DeviceFields2["APP_ID"] = "appId";
      DeviceFields2["APP_VERSION"] = "appVersion";
      DeviceFields2["PLATFORM"] = "platform";
      DeviceFields2["PLATFORM_VERSION"] = "platformVersion";
      DeviceFields2["SDK_VERSION"] = "sdkVersion";
    })(DeviceFields || (DeviceFields = {}));
    var DeviceInformation = class {
      constructor({appId, appVersion, deviceId}) {
        this.sdkVersion = "1.2.1";
        const environment2 = getEnvironment();
        this.platform = environment2.platform;
        this.platformVersion = environment2.platformVersion;
        this.appId = appId;
        this.appVersion = appVersion;
        this.deviceId = deviceId;
      }
      encode() {
        const obj = removeKeysWithUndefinedValues(this);
        return base64.Base64.encode(JSON.stringify(obj));
      }
      toJSON() {
        return removeKeysWithUndefinedValues(this);
      }
    };
    var DEFAULT_BASE_URL = "https://stitch.mongodb.com";
    var App2 = class {
      constructor(idOrConfiguration) {
        this.users = [];
        this._locationUrl = null;
        const configuration = typeof idOrConfiguration === "string" ? {id: idOrConfiguration} : idOrConfiguration;
        if (typeof configuration === "object" && typeof configuration.id === "string") {
          this.id = configuration.id;
        } else {
          throw new Error("Missing a MongoDB Realm app-id");
        }
        this.baseUrl = configuration.baseUrl || DEFAULT_BASE_URL;
        this.localApp = configuration.app;
        const {storage, transport = new DefaultNetworkTransport()} = configuration;
        this.fetcher = new Fetcher({
          appId: this.id,
          userContext: this,
          locationUrlContext: this,
          transport
        });
        this.emailPasswordAuth = new EmailPasswordAuth(this.fetcher);
        const baseStorage = storage || getEnvironment().defaultStorage;
        this.storage = new AppStorage(baseStorage, this.id);
        this.authenticator = new Authenticator(this.fetcher, baseStorage, () => this.deviceInformation);
        try {
          this.hydrate();
        } catch (err) {
          this.storage.clear();
          console.warn("Realm app hydration failed:", err.message);
        }
      }
      static getApp(id) {
        if (id in App2.appCache) {
          return App2.appCache[id];
        } else {
          const instance = new App2(id);
          App2.appCache[id] = instance;
          return instance;
        }
      }
      switchUser(nextUser) {
        const index2 = this.users.findIndex((u) => u === nextUser);
        if (index2 === -1) {
          throw new Error("The user was never logged into this app");
        }
        const [user] = this.users.splice(index2, 1);
        this.users.unshift(user);
      }
      async logIn(credentials, fetchProfile = true) {
        const response = await this.authenticator.authenticate(credentials);
        const user = this.createOrUpdateUser(response, credentials.providerType);
        this.switchUser(user);
        if (fetchProfile) {
          await user.refreshProfile();
        }
        this.storage.setUserIds(this.users.map((u) => u.id), true);
        const deviceId = response.deviceId;
        if (deviceId && deviceId !== "000000000000000000000000") {
          this.storage.set(DEVICE_ID_STORAGE_KEY$1, deviceId);
        }
        return user;
      }
      async removeUser(user) {
        const index2 = this.users.findIndex((u) => u === user);
        if (index2 === -1) {
          throw new Error("The user was never logged into this app");
        }
        this.users.splice(index2, 1);
        await user.logOut();
        this.storage.remove(`user(${user.id}):profile`);
        this.storage.removeUserId(user.id);
      }
      get currentUser() {
        const activeUsers = this.users.filter((user) => user.state === exports.UserState.Active);
        if (activeUsers.length === 0) {
          return null;
        } else {
          return activeUsers[0];
        }
      }
      get allUsers() {
        return Object.fromEntries(this.users.map((user) => [user.id, user]));
      }
      get locationUrl() {
        if (!this._locationUrl) {
          const path = routes.api().app(this.id).location().path;
          this._locationUrl = this.fetcher.fetchJSON({
            method: "GET",
            url: this.baseUrl + path,
            tokenType: "none"
          }).then(({hostname}) => {
            if (typeof hostname !== "string") {
              throw new Error("Expected response to contain a 'hostname'");
            } else {
              return hostname;
            }
          }).catch((err) => {
            this._locationUrl = null;
            throw err;
          });
        }
        return this._locationUrl;
      }
      get deviceInformation() {
        const deviceIdStr = this.storage.getDeviceId();
        const deviceId = typeof deviceIdStr === "string" && deviceIdStr !== "000000000000000000000000" ? new bson.ObjectId(deviceIdStr) : void 0;
        return new DeviceInformation({
          appId: this.localApp ? this.localApp.name : void 0,
          appVersion: this.localApp ? this.localApp.version : void 0,
          deviceId
        });
      }
      createOrUpdateUser(response, providerType) {
        const existingUser = this.users.find((u) => u.id === response.userId);
        if (existingUser) {
          existingUser.accessToken = response.accessToken;
          existingUser.refreshToken = response.refreshToken;
          return existingUser;
        } else {
          if (!response.refreshToken) {
            throw new Error("No refresh token in response from server");
          }
          const user = new User({
            app: this,
            id: response.userId,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            providerType
          });
          this.users.unshift(user);
          return user;
        }
      }
      hydrate() {
        const userIds = this.storage.getUserIds();
        this.users = userIds.map((id) => new User({app: this, id}));
      }
    };
    App2.appCache = {};
    App2.Credentials = Credentials;
    function getApp(id) {
      return App2.getApp(id);
    }
    var environment$1 = {
      defaultStorage: new MemoryStorage(),
      openWindow: (url) => {
        console.log(`Please open this URL: ${url}`);
        return null;
      },
      platform: process.release.name || "node",
      platformVersion: process.versions.node,
      TextDecoder: util.TextDecoder
    };
    setEnvironment(environment$1);
    function handleAuthRedirect() {
      throw new Error("Handling OAuth 2.0 redirects is not supported outside a browser");
    }
    exports.BSON = bson__namespace;
    exports.App = App2;
    exports.Credentials = Credentials;
    exports.DEFAULT_BASE_URL = DEFAULT_BASE_URL;
    exports.MongoDBRealmError = MongoDBRealmError;
    exports.User = User;
    exports.getApp = getApp;
    exports.getEnvironment = getEnvironment;
    exports.handleAuthRedirect = handleAuthRedirect;
    exports.setEnvironment = setEnvironment;
  }
});

// .svelte-kit/vercel/entry.js
__markAsModule(exports);
__export(exports, {
  default: () => entry_default
});

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.107_svelte@3.37.0/node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      fulfil(null);
      return;
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    let data;
    if (!isNaN(length)) {
      data = new Uint8Array(length);
      let i = 0;
      req.on("data", (chunk) => {
        data.set(chunk, i);
        i += chunk.length;
      });
    } else {
      if (h["transfer-encoding"] === void 0) {
        fulfil(null);
        return;
      }
      data = new Uint8Array(0);
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      const [type] = h["content-type"].split(/;\s*/);
      if (type === "application/octet-stream") {
        fulfil(data);
      }
      const decoder = new TextDecoder(h["content-encoding"] || "utf-8");
      fulfil(decoder.decode(data));
    });
  });
}

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.107_svelte@3.37.0/node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var {Readable} = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const {size} = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], {type: String(type).toLowerCase()});
    Object.assign(wm.get(blob), {size: span, parts: blobParts});
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: {enumerable: true},
  type: {enumerable: true},
  slice: {enumerable: true}
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error3 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error3;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const {buffer, byteOffset, byteLength} = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: {enumerable: true},
  bodyUsed: {enumerable: true},
  arrayBuffer: {enumerable: true},
  blob: {enumerable: true},
  json: {enumerable: true},
  text: {enumerable: true}
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let {body} = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    if (error3 instanceof FetchBaseError) {
      throw error3;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error3.message}`, "system", error3);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let {body} = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({highWaterMark});
    p2 = new import_stream.PassThrough({highWaterMark});
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const {body} = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, {body}) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_HTTP_TOKEN"});
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_CHAR"});
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = {enumerable: true};
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  url: {enumerable: true},
  status: {enumerable: true},
  ok: {enumerable: true},
  redirected: {enumerable: true},
  statusText: {enumerable: true},
  headers: {enumerable: true},
  clone: {enumerable: true}
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: {enumerable: true},
  url: {enumerable: true},
  headers: {enumerable: true},
  redirect: {enumerable: true},
  clone: {enumerable: true},
  signal: {enumerable: true}
});
var getNodeRequestOptions = (request) => {
  const {parsedURL} = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let {agent} = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response2(data, {headers: {"Content-Type": data.typeFull}});
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const {signal} = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error3) {
                reject(error3);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
        reject(error3);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
          reject(error3);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error3) => {
              reject(error3);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error3) => {
              reject(error3);
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
globalThis.fetch = fetch2;
globalThis.Response = Response2;
globalThis.Request = Request;
globalThis.Headers = Headers;

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.107_svelte@3.37.0/node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update, subscribe: subscribe2};
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error3,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error3) {
    error3.stack = options2.get_stack(error3);
  }
  if (branch) {
    branch.forEach(({node, loaded, fetched, uses_credentials}) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({node}) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = {head: "", html: "", css: {code: "", map: null}};
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"></script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
      throw new Error(`Failed to serialize session data: ${error4.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${branch.map(({node}) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		</script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({url, body: body2, json}) => {
    return body2 ? `<script type="svelte-data" url="${url}" body="${hash(body2)}">${json}</script>` : `<script type="svelte-data" url="${url}">${json}</script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({head, body})
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error3) {
  if (!error3)
    return null;
  let serialized = try_serialize(error3);
  if (!serialized) {
    const {name, message, stack} = error3;
    serialized = try_serialize({name, message, stack});
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error3 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return {status: 500, error: error3};
    }
    return {status, error: error3};
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path) {
  const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error3
}) {
  const {module: module2} = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url)) {
          response = await fetch(url, opts);
        } else {
          const [path, search] = url.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = {...opts.headers};
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: {...context}
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error3;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({request, options: options2, state, $session, status, error: error3}) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error3
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error3,
      branch,
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return {
      status: 500,
      headers: {},
      body: error4.stack
    };
  }
}
async function respond$1({request, options: options2, state, $session, route}) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error3;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({status, error: error3} = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error3 = e;
          }
          if (error3) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error3
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error3
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error3,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({...request, params});
    if (response) {
      if (typeof response !== "object") {
        return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
      }
      let {status = 200, body, headers = {}} = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
        return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
      }
      if (body instanceof Uint8Array && type !== "application/octet-stream") {
        return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
      }
      let normalized_body;
      if (typeof body === "object" && (!type || type === "application/json")) {
        headers = {...headers, "content-type": "application/json"};
        normalized_body = JSON.stringify(body);
      } else {
        normalized_body = body;
      }
      return {status, body: normalized_body, headers};
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
};
function parse_body(req) {
  const raw = req.rawBody;
  if (!raw)
    return raw;
  const [type, ...directives] = req.headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const {data, append} = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const {data, append} = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !incoming.path.split("/").pop().includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers: lowercase_keys(incoming.headers),
        body: parse_body(incoming),
        params: null,
        locals: {}
      },
      render: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: {ssr: false, router: true, hydrate: true},
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// node_modules/.pnpm/svelte@3.37.0/node_modules/svelte/internal/index.mjs
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
var tasks = new Set();
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
var resolved_promise = Promise.resolve();
var seen_callbacks = new Set();
var outroing = new Set();
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({$$});
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, {$$slots = {}, context = new Map()} = {}) => {
      on_destroy = [];
      const result = {title: "", head: "", css: new Set()};
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: "open"});
    }
    connectedCallback() {
      const {on_mount} = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop2;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

// .svelte-kit/output/server/app.js
var Realm = __toModule(require_bundle_cjs());

// node_modules/.pnpm/svelte@3.37.0/node_modules/svelte/store/index.mjs
var subscriber_queue2 = [];
function readable(value, start) {
  return {
    subscribe: writable2(value, start).subscribe
  };
}
function writable2(value, start = noop2) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue2.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue2.length; i += 2) {
            subscriber_queue2[i][0](subscriber_queue2[i + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update, subscribe: subscribe2};
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop2;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop2;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}

// .svelte-kit/output/server/app.js
var css = {
  code: "#svelte-announcer.svelte-1y31lbn{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n</script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>#svelte-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}</style>"],"names":[],"mappings":"AAqDO,gCAAiB,CAAC,SAAS,QAAQ,CAAC,KAAK,CAAC,CAAC,IAAI,CAAC,CAAC,KAAK,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,kBAAkB,MAAM,GAAG,CAAC,CAAC,UAAU,MAAM,GAAG,CAAC,CAAC,SAAS,MAAM,CAAC,YAAY,MAAM,CAAC,MAAM,GAAG,CAAC,OAAO,GAAG,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {stores} = $$props;
  let {page} = $$props;
  let {components} = $$props;
  let {props_0 = null} = $$props;
  let {props_1 = null} = $$props;
  let {props_2 = null} = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1y31lbn"}">${navigated ? `${escape2(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({head, body}) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.ico" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
function init(settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-d2d21ade.js",
      css: ["/./_app/assets/start-b97461fb.css"],
      js: ["/./_app/start-d2d21ade.js", "/./_app/chunks/vendor-f9dbeb3a.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error22) => String(error22),
    handle_error: (error22) => {
      console.error(error22.stack);
      error22.stack = options.get_stack(error22);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{"file": "apple-app-site-association", "size": 200, "type": null}, {"file": "favicon.ico", "size": 105561, "type": "image/vnd.microsoft.icon"}, {"file": "logo.svg", "size": 13656, "type": "image/svg+xml"}, {"file": "robots.txt", "size": 67, "type": "text/plain"}],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({request, render: render2}) => render2(request))
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error2;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  })
};
var metadata_lookup = {"src/routes/__layout.svelte": {"entry": "/./_app/pages/__layout.svelte-9f52d27c.js", "css": ["/./_app/assets/pages/__layout.svelte-8c92d901.css"], "js": ["/./_app/pages/__layout.svelte-9f52d27c.js", "/./_app/chunks/vendor-f9dbeb3a.js", "/./_app/chunks/i18n-6b7f9f71.js"], "styles": null}, ".svelte-kit/build/components/error.svelte": {"entry": "/./_app/error.svelte-be4967ce.js", "css": [], "js": ["/./_app/error.svelte-be4967ce.js", "/./_app/chunks/vendor-f9dbeb3a.js"], "styles": null}, "src/routes/index.svelte": {"entry": "/./_app/pages/index.svelte-75f8d4d0.js", "css": [], "js": ["/./_app/pages/index.svelte-75f8d4d0.js", "/./_app/chunks/vendor-f9dbeb3a.js", "/./_app/chunks/i18n-6b7f9f71.js"], "styles": null}};
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({paths: {"base": "", "assets": "/."}});
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({...request, host}, options, {prerender});
}
var coming_soon = "Coming soon!";
var header_intro1 = "Innovative tools designed to help restaurants";
var header_intro2 = "optimize";
var header_intro3 = "their #1 profit generator.";
var body_paragraph1 = "Restaurants face unique challenges that require creative solutions. Meet Knowbie, a virtual training\n            solution designed specifically for restaurants to increase staff training participation and impact.";
var body_paragraph2 = "At Knowbie, we see you, we get you, we built this for you.";
var tell_me_more = "Tell me more";
var enter_email = "Enter your email";
var enLabels = {
  coming_soon,
  header_intro1,
  header_intro2,
  header_intro3,
  body_paragraph1,
  body_paragraph2,
  tell_me_more,
  enter_email
};
var labelsStore = writable2(enLabels);
var EN_LOCALE = "en";
var FR_LOCALE = "fr";
var currentLocale = writable2(EN_LOCALE);
var OBJECT_PROPERTY_SEPARATOR = ".";
var crawlLabelsToFindRequestedTranslation = (currentLabels, translationKey) => {
  const pathToFollowInLabels = translationKey.split(OBJECT_PROPERTY_SEPARATOR);
  let currentPositionInLabels = currentLabels;
  for (let i = 0; i < pathToFollowInLabels.length; i++) {
    currentPositionInLabels = currentPositionInLabels[pathToFollowInLabels[i]];
    if (!currentPositionInLabels) {
      return translationKey;
    }
  }
  return currentPositionInLabels;
};
var i18n = derived(labelsStore, (labelsForCurrentLocale) => {
  return (translationKey) => {
    if (!translationKey.includes(OBJECT_PROPERTY_SEPARATOR)) {
      return labelsForCurrentLocale[translationKey] || translationKey;
    }
    return crawlLabelsToFindRequestedTranslation(labelsForCurrentLocale, translationKey);
  };
});
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isfr;
  let $currentLocale, $$unsubscribe_currentLocale;
  $$unsubscribe_currentLocale = subscribe(currentLocale, (value) => $currentLocale = value);
  isfr = $currentLocale === FR_LOCALE;
  $$unsubscribe_currentLocale();
  return `<nav class="${"flex flex-row p-10 align-middle  justify-center"}">
    <img class="${"h-7 pr-2"}" src="${"../logo.svg"}" alt="${"logo"}">
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    <div class="${"flex-grow"}"></div>
    <button class="${" pt-1 flex flex-col align-middle  justify-center px-1 font-extrabold"}"><div class="${["text-xs", (!isfr ? "purple-text" : "") + " " + (isfr ? "light-text" : "")].join(" ").trim()}">EN</div>
        <div class="${["mx-2 w-1 h-1 rounded-full bg-transparent", !isfr ? "purple-bg" : ""].join(" ").trim()}"></div></button>
    <button class="${"pt-1 flex flex-col align-middle  justify-center  px-1"}"><div class="${[
    "text-xs font-extrabold",
    (isfr ? "purple-text" : "") + " " + (!isfr ? "light-text" : "")
  ].join(" ").trim()}">FR</div>
        <div class="${["mx-2 w-1 h-1 rounded-full bg-transparent", isfr ? "purple-bg" : ""].join(" ").trim()}"></div></button>
    <a href="${"mailto:crystal@getknowbie.com"}" class="${"ml-5 pt-2 h-7 justify-self-en text-center self-end uppercase font-bold text-xs red-text"}">Contact us</a>

    
    <svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-7 w-4 pt-1 pl-1 stroke-current red-text"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}"><path fill-rule="${"evenodd"}" d="${"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"}" clip-rule="${"evenodd"}"></path></svg></nav>

<main>${slots.default ? slots.default({}) : ``}</main>`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load({error: error22, status}) {
  return {props: {error: error22, status}};
}
var Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {status} = $$props;
  let {error: error22} = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  return `<h1>${escape2(status)}</h1>

<p>${escape2(error22.message)}</p>


${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error2,
  load
});
var app = writable2(new Realm.App({id: "web-xoujr"}));
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let $$unsubscribe_app;
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  $$unsubscribe_app = subscribe(app, (value) => value);
  let email = "";
  $i18n("authenticationError");
  $$unsubscribe_i18n();
  $$unsubscribe_app();
  return `<main><div class="${"flex flex-col h-screen w-auto my-20 items-center space-y-3.5 w-auto mx1"}">
        <p class="${"fontp1 uppercase p-2 text-xs coming-soon-text tracking-widest pt-10"}">${escape2($i18n("coming_soon"))}</p>
        <p class="${"fontp0 font-extrabold px-5 purple-text text-3xl text-center w-auto"}">${escape2($i18n("header_intro1"))}
            <span class="${"font-bold red-text"}">${escape2($i18n("header_intro2"))}</span>
            ${escape2($i18n("header_intro3"))}</p>

        <div class="${"h-6"}"></div>

        <p class="${"fontp1 mx-auto text-center w-11/12 purple-text-secondary"}">${escape2($i18n("body_paragraph1"))}</p>



        <p class="${"fontp1 mx-auto text-center w-11/12 purple-text-secondary pb-9"}">${escape2($i18n("body_paragraph2"))}</p>

        <form class="${"flex flex-col space-y-3 md:space-y-0  md:flex-row  align-middle content-center justify-center text-center  p-2 mx-auto  space-x-3"}"><input id="${"email"}" class="${"w-60 self-center appearance-none text-xs  border rounded-full py-3 px-3 text-grey-darkest mx-2"}" type="${"email"}" required${add_attribute("placeholder", $i18n("enter_email"), 0)}${add_attribute("value", email, 1)}>
            <button type="${"submit"}" class="${"self-center text-xs px-4 py-3 rounded-full text-white red-button"}">${escape2($i18n("tell_me_more"))}</button></form></div>
</main>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});

// .svelte-kit/vercel/entry.js
var entry_default = async (req, res) => {
  const {pathname, searchParams} = new URL(req.url || "", "http://localhost");
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: await getRawBody(req)
  });
  if (rendered) {
    const {status, headers, body} = rendered;
    return res.writeHead(status, headers).end(body);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
