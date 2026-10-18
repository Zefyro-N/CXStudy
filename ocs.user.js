// ==UserScript==
// @name       				CXStudy 超星助手
// @version    				5.2.1-cxstudy.2
// @description				超星学习通专用助手：以真实速率推进视频/音频/文档任务点，章节测验自动作答（支持图片题）。基于 MIT 协议的 OCS 网课助手（https://github.com/ocsjs/ocsjs）衍生，仅保留超星学习通平台。
// @author     				enncy
// @license    				MIT
// @match      				*://*.chaoxing.com/*
// @match      				*://*.edu.cn/*
// @match      				*://*.org.cn/*
// @match      				*://*.xueyinonline.com/*
// @grant      				GM_info
// @grant      				GM_getTab
// @grant      				GM_saveTab
// @grant      				GM_setValue
// @grant      				GM_getValue
// @grant      				unsafeWindow
// @grant      				GM_listValues
// @grant      				GM_deleteValue
// @grant      				GM_notification
// @grant      				GM_xmlhttpRequest
// @grant      				GM_getResourceText
// @grant      				GM_setClipboard
// @grant      				GM_addValueChangeListener
// @grant      				GM_removeValueChangeListener
// @run-at     				document-start
// @namespace  				cxstudy
// @homepage   				https://github.com/Zefyro-N/CXStudy
// @source     				https://github.com/Zefyro-N/CXStudy
// @supportURL 				https://github.com/Zefyro-N/CXStudy/issues
// @updateURL  				https://raw.githubusercontent.com/Zefyro-N/CXStudy/main/ocs.user.js
// @downloadURL				https://raw.githubusercontent.com/Zefyro-N/CXStudy/main/ocs.user.js
// @connect    				ocsjs.com
// @connect    				opencode.ai
// @connect    				api.deepseek.com
// ==/UserScript==

// Copyright (c) 2022 enncy — OCS 网课助手 (https://github.com/ocsjs/ocsjs)
// 本脚本为其衍生的超星学习通专用分支，依 MIT 协议分发；完整许可证见仓库根目录 LICENSE 文件。

(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.OCS = {}));
})(this, function(exports2) {
  "use strict";
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function isObject$2(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var isObject_1 = isObject$2;
  var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal$1;
  var freeGlobal = _freeGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root$2 = freeGlobal || freeSelf || Function("return this")();
  var _root = root$2;
  var root$1 = _root;
  var now$1 = function() {
    return root$1.Date.now();
  };
  var now_1 = now$1;
  var reWhitespace = /\s/;
  function trimmedEndIndex$1(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {
    }
    return index;
  }
  var _trimmedEndIndex = trimmedEndIndex$1;
  var trimmedEndIndex = _trimmedEndIndex;
  var reTrimStart = /^\s+/;
  function baseTrim$1(string) {
    return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
  }
  var _baseTrim = baseTrim$1;
  var root = _root;
  var Symbol$3 = root.Symbol;
  var _Symbol = Symbol$3;
  var Symbol$2 = _Symbol;
  var objectProto$1 = Object.prototype;
  var hasOwnProperty = objectProto$1.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$1.toString;
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function getRawTag$1(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var _getRawTag = getRawTag$1;
  var objectProto = Object.prototype;
  var nativeObjectToString = objectProto.toString;
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }
  var _objectToString = objectToString$1;
  var Symbol$1 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
  function baseGetTag$1(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  var _baseGetTag = baseGetTag$1;
  function isObjectLike$1(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_1 = isObjectLike$1;
  var baseGetTag = _baseGetTag, isObjectLike = isObjectLike_1;
  var symbolTag = "[object Symbol]";
  function isSymbol$1(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  var isSymbol_1 = isSymbol$1;
  var baseTrim = _baseTrim, isObject$1 = isObject_1, isSymbol = isSymbol_1;
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber$1(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject$1(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject$1(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  var toNumber_1 = toNumber$1;
  var isObject = isObject_1, now = now_1, toNumber = toNumber_1;
  var FUNC_ERROR_TEXT = "Expected a function";
  var nativeMax = Math.max, nativeMin = Math.min;
  function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs, thisArg = lastThis;
      lastArgs = lastThis = void 0;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
      return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = void 0;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = void 0;
      return result;
    }
    function cancel() {
      if (timerId !== void 0) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush() {
      return timerId === void 0 ? result : trailingEdge(now());
    }
    function debounced() {
      var time = now(), isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === void 0) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === void 0) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  var debounce_1$1 = debounce;
  const CX_LOCKED_MODEL = "deepseek-v4.1-flash";
  const CX_PROVIDERS = {
    "opencode-go": {
      label: "opencode-go",
      url: "https://opencode.ai/inference/go/v1/chat/completions",
      extraHeaders: {
        "User-Agent": "ocs-cxstudy/1.0",
        "x-opencode-session": "${__session}"
      }
    },
    deepseek: {
      label: "deepseek 官方",
      url: "https://api.deepseek.com/chat/completions",
      extraHeaders: {}
    }
  };
  const SYSTEM_PROMPT = [
    "你是一个只负责给出答案的答题助手，服务对象是参加在线课程测验的学生。",
    "严格遵守以下规则：",
    "1. 只输出最终答案本身，不要输出解释、推理过程、题号、引号或其他任何前后缀。",
    "2. 单选题：输出正确选项的完整文字。若正确选项本身就是图片（选项写成 [图片N]），则改为输出该选项的图片标记，例如 [图片2]。",
    "3. 多选题：输出所有正确选项的完整文字，用英文逗号分隔；若选项是图片，则输出对应的图片标记，例如 [图片2],[图片4]。",
    "4. 判断题：只输出「正确」或「错误」两个词中的一个。",
    "5. 填空题：只输出答案文本。",
    "6. 不确定时给出你认为最可能的一个答案，不要提问、不要要求补充信息、不要拒绝作答。",
    "7. 题干或选项中的图片会写成 [图片N] 占位符，图片按 N 的顺序（[图片1]、[图片2]…）附在消息末尾，编号与占位符一一对应，请结合图片内容作答。",
    "8. 主观题（简答/名词解释/论述/计算）：给出可直接粘贴使用的完整答案。用「1. 2. 3.」或短横线分点作答；论述题要写出论点与理由，不要只给一句话。",
    "9. 涉及数学的内容一律写成纯文本：使用 Unicode 符号（∫ ∑ √ ≤ ≥ ≠ ± × ÷ ∞ ² ³ ₁ ₂ α β γ θ），上下标写成 x^2、a_n；禁止使用 LaTeX 语法（如 $...$、\\frac{}{}、\\sqrt{}）。"
  ].join("\n");
  function makeMessagesHandler(debug, vision) {
    return `return function (env) {
	var DEBUG = ${debug ? "true" : "false"};
	var VISION = ${vision ? "true" : "false"};
	try {
	var kindMap = { single: '单选题', multiple: '多选题', judgement: '判断题', completion: '填空题', line: '连线题', fill: '选词填空题', reader: '阅读理解题' };
	var kind = kindMap[env.type] || '题目';
	var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var images = (VISION && env.images && env.images.length) ? env.images.slice() : [];
	// 截图兜底生成的整图作为最后一张图附上（它没有对应的 [图片N] 占位符）。
	var hasShot = !!(VISION && env.screenshot);
	if (hasShot) { images = images.concat([env.screenshot]); }
	// 有图片时优先用带 [图片N] 占位符的文本，模型才知道图片对应题干还是某个选项
	var rawTitle = (images.length && env.suggestion_title) ? env.suggestion_title : (env.title || '');
	// 主观题标记：getQuestionType 把 4/5/6（简答/名词解释/论述）都映射成 completion，
	// 因此 cx.ts 用 @题型@ 前缀把原始类型带过来，这里解析出来并从题干中移除。
	var subjectKind = '';
	var mk = String(rawTitle).match(/^@([^@]{1,8})@/);
	if (mk) {
		subjectKind = mk[1];
		rawTitle = String(rawTitle).slice(mk[0].length);
		kind = subjectKind;
	}
	var rawOptions = (images.length && env.suggestion_options) ? env.suggestion_options : (env.options || '');
	var lines = String(rawOptions).split('\\n').map(function (s) { return s.trim(); }).filter(Boolean);
	var isChoice = env.type === 'single' || env.type === 'multiple' || env.type === 'judgement';
	if (isChoice && lines.length === 0) {
		console.warn('[CXStudy] 选择题未取到任何选项，本题必然答错。题型=' + env.type + '，题干=' + String(rawTitle).slice(0, 60));
	}
	var body = lines.length
		? '题干：' + rawTitle + '\\n选项：\\n' + lines.map(function (t, i) { return letters.charAt(i) + '. ' + t; }).join('\\n')
		: '题干：' + rawTitle;
	if (images.length) {
		body += '\\n\\n本题附带 ' + images.length + ' 张图片' + (hasShot ? '（其中没有对应 [图片N] 的最后一张，是题目区域的整图截图，仅供参考）' : '（按 [图片N] 顺序附后）') + '。';
	}
	var userText = '题型：' + kind + '\\n' + body + '\\n\\n答案：';
	var content;
	if (images.length) {
		content = [{ type: 'text', text: userText }];
		for (var i = 0; i < images.length; i++) {
			content.push({ type: 'image_url', image_url: { url: images[i] } });
		}
	} else {
		content = userText;
	}
	var msgs = [
		{ role: 'system', content: ${JSON.stringify(SYSTEM_PROMPT)} },
		{ role: 'user', content: content }
	];
	if (DEBUG) {
		// base64 图片会非常大，截断后再打印
		console.log('[CXStudy] 发送给模型的 prompt(前2000字符):', JSON.stringify(msgs).slice(0, 2000));
	}
	return msgs;
	} catch (e) {
		// 防御：构造 prompt 时的任何异常都不应让整道题直接失败。
		// 降级为纯文本 prompt（文字题仍可作答），并留下可排查的日志。
		console.warn('[CXStudy] 构造 prompt 失败，已降级为纯文本: ' + (e && e.message ? e.message : e));
		return [
			{ role: 'system', content: ${JSON.stringify(SYSTEM_PROMPT)} },
			{ role: 'user', content: '题型：题目\\n题干：' + String(env.title || '') + '\\n\\n答案：' }
		];
	}
};`;
  }
  function makeResponseHandler(debug) {
    return `return function (res) {
	var DEBUG = ${debug ? "true" : "false"};
	if (DEBUG) { console.log('[CXStudy] 模型原始响应:', JSON.stringify(res).slice(0, 2000)); }
	var ch = (res && res.choices && res.choices[0]) || {};
	var msg = ch.message || {};
	var text = String(msg.content || '').trim();
	if (!text) {
		var rs = String(msg.reasoning_content || '');
		var cand = rs.slice(-500).toUpperCase().match(/\\b([A-F])\\b/g);
		text = cand && cand.length ? cand[cand.length - 1] : '';
	}
	if (DEBUG) { console.log('[CXStudy] 解析出的答案:', JSON.stringify(text)); }
	return ['', text];
};`;
  }
  function buildModelAnswererWrappers(provider2, apiKey, debug = false, vision = false) {
    const key = String(apiKey || "").trim();
    if (!key)
      return [];
    const p = CX_PROVIDERS[provider2] || CX_PROVIDERS["opencode-go"];
    return [
      {
        name: p.label + " / " + CX_LOCKED_MODEL + (vision ? " / 图片题" : ""),
        homepage: p.url,
        url: p.url,
        method: "post",
        type: "GM_xmlhttpRequest",
        responseType: "json",
        headers: Object.assign(
          {
            Authorization: "Bearer " + key,
            "Content-Type": "application/json"
          },
          p.extraHeaders
        ),
        data: {
          model: CX_LOCKED_MODEL,
          messages: { handler: makeMessagesHandler(debug, vision) },
          max_tokens: 8192,
          temperature: 0,
          stream: false
        },
        handler: makeResponseHandler(debug)
      }
    ];
  }
  function hasModelConfigured(provider2, apiKey) {
    return buildModelAnswererWrappers(provider2, apiKey).length > 0;
  }
  async function testModelConnection(provider2, apiKey) {
    const key = String(apiKey || "").trim();
    if (!key)
      return { ok: false, message: "未填写 API Key" };
    const p = CX_PROVIDERS[provider2] || CX_PROVIDERS["opencode-go"];
    const session = "cxstudy-test-" + Date.now();
    const headers = Object.assign(
      { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      Object.fromEntries(
        Object.entries(p.extraHeaders).map(([k, v]) => [k, String(v).replace("${__session}", session)])
      )
    );
    try {
      const res = await new Promise((resolve, reject) => {
        const body = JSON.stringify({
          model: CX_LOCKED_MODEL,
          messages: [{ role: "user", content: "ping" }],
          max_tokens: 8,
          stream: false
        });
        GM_xmlhttpRequest({
          method: "POST",
          url: p.url,
          headers,
          data: body,
          responseType: "json",
          timeout: 25e3,
          onload: (r) => {
            if (r.status >= 200 && r.status < 300) {
              let parsed = r.response;
              if (typeof parsed === "string") {
                try {
                  parsed = JSON.parse(parsed);
                } catch {
                }
              }
              resolve(parsed);
            } else {
              const tail = r.responseText ? " " + String(r.responseText).slice(0, 180) : "";
              reject(new Error("HTTP " + r.status + tail));
            }
          },
          onerror: (r) => reject(new Error("网络错误" + (r && r.error ? "：" + r.error : ""))),
          ontimeout: () => reject(new Error("请求超时（25s）"))
        });
      });
      const model = res && res.model || CX_LOCKED_MODEL;
      return { ok: true, message: "连接正常：" + p.label + " / " + model };
    } catch (e) {
      const msg = String(e && e.message || e);
      if (/401|403|unauthor|invalid.*(key|token)|认证/i.test(msg)) {
        return { ok: false, message: "Key 无效或无权限（" + msg + "）" };
      }
      if (/404|not\s*found|model/i.test(msg)) {
        return { ok: false, message: "模型不可用，可能该 Key 没有此模型权限（" + msg + "）" };
      }
      return { ok: false, message: "连接失败：" + msg };
    }
  }
  const $ = {
    uuid() {
      return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    },
    random(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    },
    async sleep(period) {
      return new Promise((resolve) => {
        setTimeout(resolve, period);
      });
    },
    isInBrowser() {
      return typeof window !== "undefined" && typeof window.document !== "undefined";
    },
    elementToRawObject(el) {
      return {
        innerText: el == null ? void 0 : el.innerText,
        innerHTML: el == null ? void 0 : el.innerHTML,
        textContent: el == null ? void 0 : el.textContent
      };
    },
    onresize(el, handler) {
      const resize = debounce_1$1(() => {
        if (el.parentNode === null) {
          window.removeEventListener("resize", resize);
        } else {
          handler(el);
        }
      }, 200);
      resize();
      window.addEventListener("resize", resize);
    },
    isInTopWindow() {
      return self === top;
    },
    createCenteredPopupWindow(url, winName, opts) {
      const { width, height, scrollbars, resizable } = opts;
      const LeftPosition = screen.width ? (screen.width - width) / 2 : 0;
      const TopPosition = screen.height ? (screen.height - height) / 2 : 0;
      const settings = "height=" + height + ",width=" + width + ",top=" + TopPosition + ",left=" + LeftPosition + ",scrollbars=" + (scrollbars ? "yes" : "no") + ",resizable=" + (resizable ? "yes" : "no");
      return window.open(url, winName, settings);
    },
    transition: async (el, properties, duration_ms, val, options) => {
      return new Promise((resolve) => {
        const original_val = Reflect.get(el.style, properties) || "";
        el.style.transition = `${String(properties)} ${duration_ms}s ${(options == null ? void 0 : options.timing_function) || "ease-in-out"}`;
        Reflect.set(el.style, properties, val);
        el.addEventListener("transitionend", function handler() {
          el.removeEventListener("transitionend", handler);
          setTimeout(() => {
            Reflect.set(el.style, properties, original_val);
            setTimeout(() => {
              el.style.transition = "";
            }, duration_ms * 1e3);
          }, ((options == null ? void 0 : options.reset_ms) || 0) * 1e3);
          resolve();
        });
      });
    }
  };
  const $string = {
    humpToTarget(value, target) {
      return value.replace(/([A-Z])/g, target + "$1").toLowerCase().split(target).slice(1).join(target);
    }
  };
  class StringUtils {
    constructor(_text) {
      this._text = _text;
    }
    static nowrap(str, replace_str) {
      return (str == null ? void 0 : str.replace(/\n/g, replace_str)) || "";
    }
    nowrap(replace_str) {
      this._text = StringUtils.nowrap(this._text, replace_str);
      return this;
    }
    static nospace(str) {
      return (str == null ? void 0 : str.replace(/ +/g, " ")) || "";
    }
    nospace() {
      this._text = StringUtils.nospace(this._text);
      return this;
    }
    static noSpecialChar(str) {
      return (str == null ? void 0 : str.replace(/[^\w\s]/gi, "")) || "";
    }
    noSpecialChar() {
      this._text = StringUtils.noSpecialChar(this._text);
      return this;
    }
    static max(str, len) {
      return str.length > len ? str.substring(0, len) + "..." : str;
    }
    max(len) {
      this._text = StringUtils.max(this._text, len);
      return this;
    }
    static hide(str, start2, end, replacer = "*") {
      return str.substring(0, start2) + str.substring(start2, end).replace(/./g, replacer) + str.substring(end);
    }
    hide(start2, end, replacer = "*") {
      this._text = StringUtils.hide(this._text, start2, end, replacer);
      return this;
    }
    static of(text) {
      return new StringUtils(text);
    }
    toString() {
      return this._text;
    }
  }
  const $const = {
    TAB_UID: "_uid_",
    TAB_URLS: "_urls_",
    TAB_CURRENT_PANEL_NAME: "_current_panel_name_"
  };
  function domSearch(wrapper, root2 = window.document) {
    const obj = /* @__PURE__ */ Object.create({});
    Reflect.ownKeys(wrapper).forEach((key) => {
      const item = wrapper[key.toString()];
      Reflect.set(
        obj,
        key,
        typeof item === "string" ? root2.querySelector(item) : typeof item === "function" ? item(root2) : item.map((fun) => fun(root2))
      );
    });
    return obj;
  }
  function domSearchAll(wrapper, root2 = window.document) {
    const obj = /* @__PURE__ */ Object.create({});
    Reflect.ownKeys(wrapper).forEach((key) => {
      const item = wrapper[key.toString()];
      Reflect.set(
        obj,
        key,
        typeof item === "string" ? Array.from(root2.querySelectorAll(item)) : typeof item === "function" ? item(root2).filter(Boolean) : item.map((fun) => fun(root2))
      );
    });
    return obj;
  }
  var src = {
    compareTwoStrings,
    findBestMatch
  };
  function compareTwoStrings(first, second) {
    first = first.replace(/\s+/g, "");
    second = second.replace(/\s+/g, "");
    if (first === second)
      return 1;
    if (first.length < 2 || second.length < 2)
      return 0;
    let firstBigrams = /* @__PURE__ */ new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      const count2 = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
      firstBigrams.set(bigram, count2);
    }
    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count2 = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;
      if (count2 > 0) {
        firstBigrams.set(bigram, count2 - 1);
        intersectionSize++;
      }
    }
    return 2 * intersectionSize / (first.length + second.length - 2);
  }
  function findBestMatch(mainString, targetStrings) {
    if (!areArgsValid(mainString, targetStrings))
      throw new Error("Bad arguments: First argument should be a string, second should be an array of strings");
    const ratings = [];
    let bestMatchIndex = 0;
    for (let i = 0; i < targetStrings.length; i++) {
      const currentTargetString = targetStrings[i];
      const currentRating = compareTwoStrings(mainString, currentTargetString);
      ratings.push({ target: currentTargetString, rating: currentRating });
      if (currentRating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i;
      }
    }
    const bestMatch = ratings[bestMatchIndex];
    return { ratings, bestMatch, bestMatchIndex };
  }
  function areArgsValid(mainString, targetStrings) {
    if (typeof mainString !== "string")
      return false;
    if (!Array.isArray(targetStrings))
      return false;
    if (!targetStrings.length)
      return false;
    if (targetStrings.find(function(s) {
      return typeof s !== "string";
    }))
      return false;
    return true;
  }
  function clearString(str, ...exclude) {
    exclude.push(...["①②③④⑤⑥⑦⑧⑨"]);
    return str.trim().toLocaleLowerCase().replace(RegExp(`[^\\u2E80-\\u9FFFA-Za-z0-9${exclude.join("")}]*`, "g"), "");
  }
  function normalizeString(str) {
    return clearString(
      str.replace(/[，。！？；：""''、（）【】《》\s]/g, "").replace(/[,.\-!?;:'"()[\]<>]/g, "").replace(/[ａ-ｚＡ-Ｚ０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 65248)).replace(/％/g, "%")
    );
  }
  function answerNormalizedMatch(answers, options) {
    const _answers = answers.map(removeRedundant).map(normalizeString);
    const _options = options.map(removeRedundant).map(normalizeString);
    return _answers.length !== 0 ? _options.map((opt, i) => {
      let level = 0;
      if (opt) {
        for (const ans of _answers) {
          if (ans === opt) {
            level = 2;
            break;
          } else if (ans.includes(opt)) {
            level = 1;
          }
        }
      }
      return { opt, original: options[i], level };
    }).filter(({ level }) => level > 0).sort((a, b) => b.level - a.level).map(({ original }) => original) : [];
  }
  function answerSimilar(answers, options) {
    const _answers = answers.map(removeRedundant).map((a) => clearString(a));
    const _options = options.map(removeRedundant).map((o) => clearString(o));
    const similar = _answers.length !== 0 ? _options.map((option) => {
      if (option.trim() === "") {
        return { rating: 0, target: "" };
      }
      return src.findBestMatch(option, _answers).bestMatch;
    }) : _options.map(() => ({ rating: 0, target: "" }));
    return similar;
  }
  function answerSimilarWithGap(answers, options) {
    var _a, _b;
    const _answers = answers.map(removeRedundant).map((a) => clearString(a));
    const _options = options.map(removeRedundant).map((o) => clearString(o));
    if (_answers.length === 0) {
      return _options.map(() => ({ rating: 0, target: "", gap: 0 }));
    }
    const ratings = _options.map((option) => {
      if (option.trim() === "") {
        return { rating: 0, target: "" };
      }
      return src.findBestMatch(option, _answers).bestMatch;
    });
    const sortedRatings = [...ratings].sort((a, b) => b.rating - a.rating);
    const maxRating = (_b = (_a = sortedRatings[0]) == null ? void 0 : _a.rating) != null ? _b : 0;
    let secondRating = 0;
    for (let i = 1; i < sortedRatings.length; i++) {
      if (sortedRatings[i].rating < maxRating) {
        secondRating = sortedRatings[i].rating;
        break;
      }
    }
    return ratings.map((r) => ({
      ...r,
      gap: r.rating === maxRating ? maxRating - secondRating : 0
    }));
  }
  function answerExactMatch(answers, options) {
    const _answers = answers.map(removeRedundant);
    const _options = options.map(removeRedundant);
    const result = _answers.length !== 0 ? _options.filter((option) => {
      return _answers.find((answer) => answer.trim() === option.trim());
    }) : [];
    return result;
  }
  function removeRedundant(str) {
    return (str == null ? void 0 : str.trim().replace(/^[A-Z]{1}[^A-Za-z0-9⺀-鿿]+([A-Za-z0-9⺀-鿿]+)/, "$1").replace(/^[A-Z]{1}([⺀-鿿][A-Za-z0-9⺀-鿿]*)/, "$1")) || "";
  }
  function request(url, opts) {
    return new Promise((resolve, reject) => {
      try {
        const { responseType = "json", method = "get", type = "fetch", data = {}, headers = {} } = opts || {};
        const env = $.isInBrowser() ? "browser" : "node";
        if (type === "GM_xmlhttpRequest" && env === "browser") {
          if (typeof GM_xmlhttpRequest !== "undefined") {
            const contentType = headers["Content-Type"] || headers["content-type"];
            const requestData = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(data).toString() : Object.keys(data).length ? JSON.stringify(data) : void 0;
            GM_xmlhttpRequest({
              url,
              method: method.toUpperCase(),
              data: requestData,
              headers: Object.keys(headers).length ? headers : void 0,
              responseType: responseType === "json" ? "json" : void 0,
              onload: (response) => {
                if (opts.anyStatus) {
                  resolve({ status: response.status, responseText: response.responseText || "" });
                  return;
                }
                if (response.status === 200) {
                  if (responseType === "json") {
                    try {
                      resolve(JSON.parse(response.responseText));
                    } catch (error) {
                      reject(error);
                    }
                  } else {
                    resolve(response.responseText || "");
                  }
                } else {
                  reject(response.responseText);
                }
              },
              onerror: (err) => {
                console.error("GM_xmlhttpRequest error", err);
                reject(err);
              }
            });
          } else {
            reject(new Error("GM_xmlhttpRequest is not defined"));
          }
        } else {
          const fet = env === "node" ? require("node-fetch").default : fetch;
          fet(url, { body: method === "post" ? JSON.stringify(data) : void 0, method, headers }).then((response) => {
            if (opts.anyStatus) {
              response.text().then((text) => resolve({ status: response.status, responseText: text })).catch(reject);
              return;
            }
            if (responseType === "json") {
              response.json().then(resolve).catch(reject);
            } else {
              response.text().then(resolve).catch(reject);
            }
          }).catch((error) => {
            reject(new Error(error));
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  function defaultWorkTypeResolver(ctx) {
    function count2(selector) {
      let c = 0;
      for (const option of ctx.elements.options || []) {
        if ((option == null ? void 0 : option.querySelector(selector)) !== null) {
          c++;
        }
      }
      return c;
    }
    return count2('[type="radio"]') === 2 ? "judgement" : count2('[type="radio"]') > 2 ? "single" : count2('[type="checkbox"]') > 2 ? "multiple" : count2("textarea") >= 1 ? "completion" : void 0;
  }
  function isPlainAnswer(answer) {
    answer = answer.trim();
    if (answer.length > 8 || !/[A-Z]/.test(answer)) {
      return false;
    }
    const counter = {};
    let min = 0;
    for (let i = 0; i < answer.length; i++) {
      if (answer.charCodeAt(i) < min) {
        return false;
      }
      min = answer.charCodeAt(i);
      counter[min] = (counter[min] || 0) + 1;
    }
    for (const key in counter) {
      if (counter[key] !== 1) {
        return false;
      }
    }
    return true;
  }
  function resolvePlainAnswer(answer) {
    const resolve = answer.trim().replace(/[,，.。．、 #]/g, "").trim();
    if (isPlainAnswer(resolve)) {
      return resolve;
    }
  }
  function isProgramAnswer(answer) {
    const code = (answer != null ? answer : "").trim();
    if (!code)
      return false;
    if (!/[;|；]/.test(code))
      return false;
    let score = 0;
    const strong = [
      /#include\s*[<"]/,
      /#define\s+\w/,
      /#!\//,
      /\b(?:int|void|float|double|char|long|short)\s+main\s*\(/,
      /\bfunction\s+\w+\s*\(/,
      /\bdef\s+\w+\s*\(/,
      /\bpublic\s+(?:class|static|void|int|float|double|String|final)\b/,
      /\bprivate\s+(?:class|static|void|int|float|double|String|final)\b/,
      /\bprotected\s+(?:class|static|void|int|float|double|String|final)\b/,
      /\bprintf\s*\(/,
      /\bscanf\s*\(/,
      /\bcout\s*<</,
      /\bcin\s*>>/,
      /System\.out\./,
      /console\.log\s*\(/,
      /\bpackage\s+[\w.]+\s*;/,
      /\bimport\s+[\w.*]+\s*;/,
      /\bclass\s+\w+\s*\{/,
      /\bstruct\s+\w+\s*\{/
    ];
    for (const re of strong)
      if (re.test(code))
        score += 2;
    const medium = [
      /=>/,
      /->/,
      /::/,
      /\+\+/,
      /--/,
      /[+\-*/%]=/,
      /\bnew\s+\w+\s*\(/,
      /\bfor\s*\(/,
      /\bwhile\s*\(/,
      /\bif\s*\(/,
      /\bswitch\s*\(/,
      /\btypedef\s+/,
      /\b(?:int|float|double|char|void|bool|boolean|long|short|String|auto|const|let|var)\s+\w+/,
      /\bsizeof\s*\(/,
      /\bmalloc\s*\(/,
      /\bfree\s*\(/,
      /\bcout\b/,
      /\bcin\b/
    ];
    for (const re of medium)
      if (re.test(code))
        score += 1;
    if (/\{/.test(code) && /\}/.test(code))
      score += 1;
    if (/;/.test(code))
      score += 1;
    return score >= 2;
  }
  function splitAnswer(answer, separators = ["===", "#", "---", "###", "|", ";", "；"]) {
    answer = answer.trim();
    if (answer.length === 0) {
      return [];
    }
    separators = separators.length === 0 ? ["===", "#", "---", "###", "|", ";", "；"] : separators;
    separators = separators.filter((el) => el.trim().length > 0);
    if (isProgramAnswer(answer)) {
      separators = separators.filter((el) => el !== ";" && el !== "|" && el !== "；");
    }
    try {
      const json = JSON.parse(answer);
      if (Array.isArray(json)) {
        return json.map(String).map((el) => el.trim()).filter((el) => el.length > 0);
      }
    } catch {
      for (const sep of separators) {
        if (answer.split(sep).length > 1) {
          return answer.split(sep).map((el) => el.trim()).filter((el) => el.length > 0);
        }
      }
    }
    return [answer];
  }
  var lib = {};
  var start$1 = {};
  var interfaces = {};
  var common$1 = {};
  var events = { exports: {} };
  var R = typeof Reflect === "object" ? Reflect : null;
  var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };
  var ReflectOwnKeys;
  if (R && typeof R.ownKeys === "function") {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target);
    };
  }
  function ProcessEmitWarning(warning) {
    if (console && console.warn)
      console.warn(warning);
  }
  var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
    return value !== value;
  };
  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  events.exports = EventEmitter;
  events.exports.once = once;
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = void 0;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = void 0;
  var defaultMaxListeners = 10;
  function checkListener(listener) {
    if (typeof listener !== "function") {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }
  Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
      }
      defaultMaxListeners = arg;
    }
  });
  EventEmitter.init = function() {
    if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || void 0;
  };
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    }
    this._maxListeners = n;
    return this;
  };
  function _getMaxListeners(that) {
    if (that._maxListeners === void 0)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }
  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };
  EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++)
      args.push(arguments[i]);
    var doError = type === "error";
    var events2 = this._events;
    if (events2 !== void 0)
      doError = doError && events2.error === void 0;
    else if (!doError)
      return false;
    if (doError) {
      var er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        throw er;
      }
      var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
      err.context = er;
      throw err;
    }
    var handler = events2[type];
    if (handler === void 0)
      return false;
    if (typeof handler === "function") {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        ReflectApply(listeners[i], this, args);
    }
    return true;
  };
  function _addListener(target, type, listener, prepend) {
    var m;
    var events2;
    var existing;
    checkListener(listener);
    events2 = target._events;
    if (events2 === void 0) {
      events2 = target._events = /* @__PURE__ */ Object.create(null);
      target._eventsCount = 0;
    } else {
      if (events2.newListener !== void 0) {
        target.emit(
          "newListener",
          type,
          listener.listener ? listener.listener : listener
        );
        events2 = target._events;
      }
      existing = events2[type];
    }
    if (existing === void 0) {
      existing = events2[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === "function") {
        existing = events2[type] = prepend ? [listener, existing] : [existing, listener];
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
      m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        w.name = "MaxListenersExceededWarning";
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }
    return target;
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };
  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0)
        return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }
  function _onceWrap(target, type, listener) {
    var state2 = { fired: false, wrapFn: void 0, target, type, listener };
    var wrapped = onceWrapper.bind(state2);
    wrapped.listener = listener;
    state2.wrapFn = wrapped;
    return wrapped;
  }
  EventEmitter.prototype.once = function once2(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events2, position, i, originalListener;
    checkListener(listener);
    events2 = this._events;
    if (events2 === void 0)
      return this;
    list = events2[type];
    if (list === void 0)
      return this;
    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0)
        this._events = /* @__PURE__ */ Object.create(null);
      else {
        delete events2[type];
        if (events2.removeListener)
          this.emit("removeListener", type, list.listener || listener);
      }
    } else if (typeof list !== "function") {
      position = -1;
      for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }
      if (position < 0)
        return this;
      if (position === 0)
        list.shift();
      else {
        spliceOne(list, position);
      }
      if (list.length === 1)
        events2[type] = list[0];
      if (events2.removeListener !== void 0)
        this.emit("removeListener", type, originalListener || listener);
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events2, i;
    events2 = this._events;
    if (events2 === void 0)
      return this;
    if (events2.removeListener === void 0) {
      if (arguments.length === 0) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      } else if (events2[type] !== void 0) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else
          delete events2[type];
      }
      return this;
    }
    if (arguments.length === 0) {
      var keys = Object.keys(events2);
      var key;
      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        if (key === "removeListener")
          continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
      return this;
    }
    listeners = events2[type];
    if (typeof listeners === "function") {
      this.removeListener(type, listeners);
    } else if (listeners !== void 0) {
      for (i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(type, listeners[i]);
      }
    }
    return this;
  };
  function _listeners(target, type, unwrap) {
    var events2 = target._events;
    if (events2 === void 0)
      return [];
    var evlistener = events2[type];
    if (evlistener === void 0)
      return [];
    if (typeof evlistener === "function")
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }
  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };
  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };
  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };
  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events2 = this._events;
    if (events2 !== void 0) {
      var evlistener = events2[type];
      if (typeof evlistener === "function") {
        return 1;
      } else if (evlistener !== void 0) {
        return evlistener.length;
      }
    }
    return 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };
  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
      copy[i] = arr[i];
    return copy;
  }
  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
      list[index] = list[index + 1];
    list.pop();
  }
  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }
  function once(emitter, name) {
    return new Promise(function(resolve, reject) {
      function errorListener(err) {
        emitter.removeListener(name, resolver);
        reject(err);
      }
      function resolver() {
        if (typeof emitter.removeListener === "function") {
          emitter.removeListener("error", errorListener);
        }
        resolve([].slice.call(arguments));
      }
      eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
      if (name !== "error") {
        addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
      }
    });
  }
  function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === "function") {
      eventTargetAgnosticAddListener(emitter, "error", handler, flags);
    }
  }
  function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === "function") {
      if (flags.once) {
        emitter.once(name, listener);
      } else {
        emitter.on(name, listener);
      }
    } else if (typeof emitter.addEventListener === "function") {
      emitter.addEventListener(name, function wrapListener(arg) {
        if (flags.once) {
          emitter.removeEventListener(name, wrapListener);
        }
        listener(arg);
      });
    } else {
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
  }
  var __importDefault$2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(common$1, "__esModule", { value: true });
  common$1.CommonEventEmitter = void 0;
  const events_1$1 = __importDefault$2(events.exports);
  class CommonEventEmitter extends events_1$1.default {
    on(eventName, listener) {
      return super.on(eventName.toString(), listener);
    }
    once(eventName, listener) {
      return super.once(eventName.toString(), listener);
    }
    emit(eventName, ...args) {
      return super.emit(eventName.toString(), ...args);
    }
    off(eventName, listener) {
      return super.off(eventName.toString(), listener);
    }
  }
  common$1.CommonEventEmitter = CommonEventEmitter;
  var config$1 = {};
  Object.defineProperty(config$1, "__esModule", { value: true });
  var cors = {};
  var utils = {};
  var common = {};
  var store = {};
  var store_provider = {};
  var _const = {};
  Object.defineProperty(_const, "__esModule", { value: true });
  _const.$const = void 0;
  _const.$const = {
    TAB_UID: "_uid_",
    TAB_URLS: "_urls_",
    TAB_CURRENT_PANEL_NAME: "_current_panel_name_"
  };
  var __awaiter$3 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(store_provider, "__esModule", { value: true });
  store_provider.GMStoreProvider = store_provider.MemoryStoreProvider = store_provider.LocalStoreChangeEvent = void 0;
  const const_1$1 = _const;
  class LocalStoreChangeEvent extends Event {
    constructor() {
      super(...arguments);
      this.key = "";
    }
  }
  store_provider.LocalStoreChangeEvent = LocalStoreChangeEvent;
  class MemoryStoreProvider {
    get(key, defaultValue) {
      var _a;
      return (_a = Reflect.get(MemoryStoreProvider._source.store, key)) !== null && _a !== void 0 ? _a : defaultValue;
    }
    set(key, value) {
      var _a;
      const pre = Reflect.get(MemoryStoreProvider._source.store, key);
      Reflect.set(MemoryStoreProvider._source.store, key, value);
      (_a = MemoryStoreProvider.storeListeners.get(key)) === null || _a === void 0 ? void 0 : _a.forEach((lis) => lis(value, pre));
    }
    delete(key) {
      Reflect.deleteProperty(MemoryStoreProvider._source.store, key);
    }
    list() {
      return Object.keys(MemoryStoreProvider._source.store);
    }
    getTab(key) {
      return __awaiter$3(this, void 0, void 0, function* () {
        return Reflect.get(MemoryStoreProvider._source.tab, key);
      });
    }
    setTab(key, value) {
      var _a;
      return __awaiter$3(this, void 0, void 0, function* () {
        Reflect.set(MemoryStoreProvider._source.tab, key, value);
        (_a = MemoryStoreProvider.tabListeners.get(key)) === null || _a === void 0 ? void 0 : _a.forEach((lis) => lis(value, this.getTab(key)));
      });
    }
    addChangeListener(key, listener) {
      const listeners = MemoryStoreProvider.storeListeners.get(key) || [];
      listeners.push(listener);
      MemoryStoreProvider.storeListeners.set(key, listeners);
    }
    removeChangeListener(listener) {
      MemoryStoreProvider.tabListeners.forEach((lis, key) => {
        const index = lis.findIndex((l) => l === listener);
        if (index !== -1) {
          lis.splice(index, 1);
          MemoryStoreProvider.tabListeners.set(key, lis);
        }
      });
    }
    addTabChangeListener(key, listener) {
      const listeners = MemoryStoreProvider.tabListeners.get(key) || [];
      listeners.push(listener);
      MemoryStoreProvider.tabListeners.set(key, listeners);
    }
    removeTabChangeListener(key, listener) {
      const listeners = MemoryStoreProvider.tabListeners.get(key) || [];
      const index = listeners.findIndex((l) => l === listener);
      if (index !== -1) {
        listeners.splice(index, 1);
        MemoryStoreProvider.tabListeners.set(key, listeners);
      }
    }
  }
  MemoryStoreProvider._source = { store: {}, tab: {} };
  MemoryStoreProvider.storeListeners = /* @__PURE__ */ new Map();
  MemoryStoreProvider.tabListeners = /* @__PURE__ */ new Map();
  store_provider.MemoryStoreProvider = MemoryStoreProvider;
  class GMStoreProvider {
    constructor() {
      if (self === top && typeof globalThis.GM_listValues !== "undefined") {
        for (const val of GM_listValues()) {
          if (val.startsWith("_tab_change_")) {
            GM_deleteValue(val);
          }
        }
      }
    }
    getTabChangeHandleKey(tabUid, key) {
      return `_tab_change_${tabUid}_${key}`;
    }
    get(key, defaultValue) {
      return GM_getValue(key, defaultValue);
    }
    set(key, value) {
      GM_setValue(key, value);
    }
    delete(key) {
      GM_deleteValue(key);
    }
    list() {
      return GM_listValues();
    }
    getTab(key) {
      return new Promise((resolve, reject) => {
        GM_getTab((tab = {}) => resolve(Reflect.get(tab, key)));
      });
    }
    setTab(key, value) {
      return new Promise((resolve, reject) => {
        GM_getTab((tab = {}) => {
          Reflect.set(tab, key, value);
          GM_saveTab(tab);
          this.set(this.getTabChangeHandleKey(Reflect.get(tab, const_1$1.$const.TAB_UID), key), value);
          resolve();
        });
      });
    }
    addChangeListener(key, listener) {
      return GM_addValueChangeListener(key, (_, pre, curr, remote) => {
        listener(curr, pre, remote);
      });
    }
    removeChangeListener(listenerId) {
      if (typeof listenerId === "number") {
        GM_removeValueChangeListener(listenerId);
      }
    }
    addTabChangeListener(key, listener) {
      return __awaiter$3(this, void 0, void 0, function* () {
        const uid = yield this.getTab(const_1$1.$const.TAB_UID);
        return GM_addValueChangeListener(this.getTabChangeHandleKey(uid, key), (_, pre, curr) => {
          listener(curr, pre);
        });
      });
    }
    removeTabChangeListener(key, listener) {
      return this.removeChangeListener(listener);
    }
  }
  store_provider.GMStoreProvider = GMStoreProvider;
  (function(exports3) {
    Object.defineProperty(exports3, "__esModule", { value: true });
    exports3.$store = exports3.MemoryStoreProvider = exports3.GMStoreProvider = void 0;
    const store_provider_1 = store_provider;
    var store_provider_2 = store_provider;
    Object.defineProperty(exports3, "GMStoreProvider", { enumerable: true, get: function() {
      return store_provider_2.GMStoreProvider;
    } });
    Object.defineProperty(exports3, "MemoryStoreProvider", { enumerable: true, get: function() {
      return store_provider_2.MemoryStoreProvider;
    } });
    exports3.$store = typeof globalThis.unsafeWindow === "undefined" ? new store_provider_1.MemoryStoreProvider() : new store_provider_1.GMStoreProvider();
  })(store);
  (function(exports3) {
    var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __rest2 = commonjsGlobal && commonjsGlobal.__rest || function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports3, "__esModule", { value: true });
    exports3.resolveCustomElementName = exports3.$ = void 0;
    const debounce_12 = __importDefault2(debounce_1$1);
    const store_12 = store;
    exports3.$ = {
      createConfigProxy(script2) {
        var _a, _b;
        const proxy = new Proxy(script2.cfg, {
          set(target, propertyKey, value) {
            const key = exports3.$.namespaceKey(script2.namespace, propertyKey);
            store_12.$store.set(key, value);
            return Reflect.set(target, propertyKey, value);
          },
          get(target, propertyKey) {
            const value = store_12.$store.get(exports3.$.namespaceKey(script2.namespace, propertyKey));
            Reflect.set(target, propertyKey, value);
            return value;
          }
        });
        for (const key in script2.configs) {
          if (Object.prototype.hasOwnProperty.call(script2.configs, key)) {
            const element = Reflect.get(script2.configs, key);
            Reflect.set(proxy, key, store_12.$store.get(exports3.$.namespaceKey(script2.namespace, key), element.defaultValue));
          }
        }
        if (script2.namespace) {
          proxy.notes = (_b = (_a = script2.configs) === null || _a === void 0 ? void 0 : _a.notes) === null || _b === void 0 ? void 0 : _b.defaultValue;
        }
        return proxy;
      },
      getAllRawConfigs(scripts) {
        const object = {};
        for (const script2 of scripts) {
          for (const key in script2.configs) {
            if (Object.prototype.hasOwnProperty.call(script2.configs, key)) {
              const _a = script2.configs[key], element = __rest2(_a, ["label"]);
              Reflect.set(object, exports3.$.namespaceKey(script2.namespace, key), Object.assign({ label: exports3.$.namespaceKey(script2.namespace, key) }, element));
            }
          }
        }
        return object;
      },
      getMatchedScripts(projects, urls) {
        const scripts = [];
        for (const project2 of projects) {
          for (const key in project2.scripts) {
            if (Object.prototype.hasOwnProperty.call(project2.scripts, key)) {
              const script2 = project2.scripts[key];
              const script_matches_urls = script2.matches.map((u) => Array.isArray(u) ? u[1] : u);
              const script_excludes_urls = (script2.excludes || []).map((u) => Array.isArray(u) ? u[1] : u);
              if (project2.domains === void 0 || project2.domains.length === 0 || project2.domains.some((d) => urls.some((url) => new URL(url).origin.includes(d)))) {
                if (script_excludes_urls.some((u) => urls.some((url) => RegExp(u).test(url)))) {
                  continue;
                }
                if (script_matches_urls.some((u) => urls.some((url) => RegExp(u).test(url)))) {
                  scripts.push(script2);
                }
              }
            }
          }
        }
        return scripts;
      },
      namespaceKey(namespace, key) {
        return namespace ? namespace + "." + key.toString() : key.toString();
      },
      uuid() {
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === "x" ? r : r & 3 | 8;
          return v.toString(16);
        });
      },
      random(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
      },
      sleep(period) {
        return __awaiter2(this, void 0, void 0, function* () {
          return new Promise((resolve) => {
            setTimeout(resolve, period);
          });
        });
      },
      isInBrowser() {
        return typeof window !== "undefined" && typeof window.document !== "undefined";
      },
      onresize(el, handler) {
        const resize = (0, debounce_12.default)(() => {
          if (el.parentNode === null) {
            window.removeEventListener("resize", resize);
          } else {
            handler(el);
          }
        }, 200);
        resize();
        window.addEventListener("resize", resize);
      },
      loadCustomElements(elements2) {
        for (const element of elements2) {
          const name = resolveCustomElementName(element, "-");
          if (customElements.get(name) === void 0) {
            customElements.define(name, element);
          }
        }
      },
      isInTopWindow() {
        return self === top;
      },
      createCenteredPopupWindow(url, winName, opts) {
        const { width, height, scrollbars, resizable } = opts;
        const LeftPosition = screen.width ? (screen.width - width) / 2 : 0;
        const TopPosition = screen.height ? (screen.height - height) / 2 : 0;
        const settings = "height=" + height + ",width=" + width + ",top=" + TopPosition + ",left=" + LeftPosition + ",scrollbars=" + (scrollbars ? "yes" : "no") + ",resizable=" + (resizable ? "yes" : "no");
        return window.open(url, winName, settings);
      },
      waitForElement(selector, opts) {
        return this.waitFor(() => {
          return typeof selector === "function" ? selector() : document.querySelector(selector);
        }, opts);
      },
      waitFor(predicate, opts) {
        return new Promise((resolve, reject) => {
          let timeout;
          const interval = setInterval(() => {
            const result = predicate();
            if (result) {
              clearInterval(interval);
              timeout && clearTimeout(timeout);
              resolve(result);
            }
          }, (opts === null || opts === void 0 ? void 0 : opts.check_period_ms) || 1e3);
          if (opts === null || opts === void 0 ? void 0 : opts.timeout_seconds) {
            timeout = setTimeout(() => {
              clearInterval(interval);
              resolve(void 0);
            }, ((opts === null || opts === void 0 ? void 0 : opts.timeout_seconds) || 10) * 1e3);
          }
        });
      }
    };
    function resolveCustomElementName(el, target) {
      return el.name.replace(/([A-Z])/g, target + "$1").toLowerCase().split(target).slice(1).join(target);
    }
    exports3.resolveCustomElementName = resolveCustomElementName;
  })(common);
  var ui = {};
  var dom = {};
  Object.defineProperty(dom, "__esModule", { value: true });
  dom.enableElementTouchDraggable = dom.enableElementDraggable = dom.$$el = dom.$el = dom.h = void 0;
  const common_1$5 = common;
  function h(element, attrsOrChildren, childrenOrHandler) {
    let name = "";
    if (typeof element === "function") {
      name = (0, common_1$5.resolveCustomElementName)(element, "-");
    } else {
      name = element;
    }
    const el = document.createElement(name);
    if (attrsOrChildren) {
      if (Array.isArray(attrsOrChildren)) {
        for (const child of attrsOrChildren) {
          if (typeof child === "function") {
            el.append(document.createElement(child.name));
          } else {
            el.append(child);
          }
        }
      } else if (typeof attrsOrChildren === "string") {
        el.append(attrsOrChildren);
      } else {
        const attrs = attrsOrChildren;
        for (const key in attrs) {
          if (Object.prototype.hasOwnProperty.call(attrs, key)) {
            if (key === "style") {
              Object.assign(el.style, attrs[key]);
            } else {
              const value = attrs[key];
              Reflect.set(el, key, value);
            }
          }
        }
      }
    }
    if (childrenOrHandler) {
      if (typeof childrenOrHandler === "function") {
        childrenOrHandler.call(el, el);
      } else if (Array.isArray(childrenOrHandler)) {
        for (const child of childrenOrHandler) {
          if (typeof child === "function") {
            el.append(document.createElement(child.name));
          } else {
            el.append(child);
          }
        }
      } else if (typeof childrenOrHandler === "string") {
        el.append(childrenOrHandler);
      }
    }
    return el;
  }
  dom.h = h;
  function $el(selector, root2 = window.document) {
    const el = root2.querySelector(selector);
    return el === null ? void 0 : el;
  }
  dom.$el = $el;
  function $$el(selector, root2 = window.document) {
    return Array.from(root2.querySelectorAll(selector));
  }
  dom.$$el = $$el;
  function enableElementDraggable(header2, target, ondrag) {
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;
    header2.addEventListener("mousedown", dragMouseDown);
    function dragMouseDown(e) {
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
    }
    function elementDrag(e) {
      e.stopPropagation();
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      target.style.top = Math.max(target.offsetTop - pos2, 10) + "px";
      target.style.left = target.offsetLeft - pos1 + "px";
    }
    function closeDragElement() {
      ondrag === null || ondrag === void 0 ? void 0 : ondrag();
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }
  }
  dom.enableElementDraggable = enableElementDraggable;
  function enableElementTouchDraggable(header2, target, ondrag) {
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;
    header2.addEventListener("touchstart", dragTouchStart);
    function dragTouchStart(e) {
      e = e || window.event;
      const touch = e.touches[0];
      pos3 = touch.clientX;
      pos4 = touch.clientY;
      document.addEventListener("touchend", closeDragElement);
      document.addEventListener("touchcancel", closeDragElement);
      document.addEventListener("touchmove", elementDrag, { capture: true, passive: false });
    }
    function elementDrag(e) {
      e.stopPropagation();
      e.preventDefault();
      e = e || window.event;
      const touch = e.touches[0];
      pos1 = pos3 - touch.clientX;
      pos2 = pos4 - touch.clientY;
      pos3 = touch.clientX;
      pos4 = touch.clientY;
      target.style.top = Math.max(target.offsetTop - pos2, 10) + "px";
      target.style.left = target.offsetLeft - pos1 + "px";
    }
    function closeDragElement() {
      ondrag === null || ondrag === void 0 ? void 0 : ondrag();
      document.removeEventListener("touchend", closeDragElement);
      document.removeEventListener("touchcancel", closeDragElement);
      document.removeEventListener("touchmove", elementDrag, { capture: true });
    }
  }
  dom.enableElementTouchDraggable = enableElementTouchDraggable;
  var elements$1 = {};
  Object.defineProperty(elements$1, "__esModule", { value: true });
  elements$1.$elements = void 0;
  elements$1.$elements = {
    tooltipContainer: void 0,
    root: void 0,
    currentScriptPanel: void 0,
    wrapper: void 0
  };
  var tampermonkey = {};
  (function(exports3) {
    Object.defineProperty(exports3, "__esModule", { value: true });
    exports3.$gm = void 0;
    exports3.$gm = {
      unsafeWindow: typeof globalThis.unsafeWindow === "undefined" ? globalThis.window : globalThis.unsafeWindow,
      isInGMContext() {
        return typeof GM_info !== "undefined";
      },
      getInfos() {
        return typeof GM_info === "undefined" ? void 0 : GM_info;
      },
      getTab(callback) {
        return typeof GM_getTab === "undefined" ? void 0 : GM_getTab(callback);
      },
      notification(content, options) {
        var _a;
        const { onclick, ondone, important, duration = 30, silent = true, extraTitle = "" } = options || {};
        const { icon, name } = ((_a = exports3.$gm.getInfos()) === null || _a === void 0 ? void 0 : _a.script) || {};
        GM_notification({
          title: name + (extraTitle ? "-" + extraTitle : ""),
          text: content,
          image: icon || "",
          highlight: important,
          onclick,
          ondone,
          silent,
          timeout: duration * 1e3
        });
      },
      getMetadataFromScriptHead(key) {
        var _a, _b;
        const metadataString = (_a = this.getInfos()) === null || _a === void 0 ? void 0 : _a.scriptMetaStr;
        if (!metadataString) {
          return [];
        } else {
          const metadata = ((_b = metadataString.match(/\/\/\s+==UserScript==([\s\S]+)\/\/\s+==\/UserScript==/)) === null || _b === void 0 ? void 0 : _b[1]) || "";
          const metadataList = (metadata.match(/\/\/\s+@(.+?)\s+(.*?)(?:\n|$)/g) || []).map((line) => {
            const words = line.match(/[\S]+/g) || [];
            return {
              key: (words[1] || "").replace("@", ""),
              value: words.slice(2).join(" ")
            };
          });
          return metadataList.filter((l) => l.key === key).map((l) => l.value);
        }
      }
    };
  })(tampermonkey);
  Object.defineProperty(ui, "__esModule", { value: true });
  ui.$ui = void 0;
  const common_1$4 = common;
  const dom_1$6 = dom;
  const elements_1$2 = elements$1;
  const tampermonkey_1$1 = tampermonkey;
  function getPageZoom() {
    const zoom = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("zoom") || "1");
    return Number.isFinite(zoom) && zoom > 0 ? zoom : 1;
  }
  ui.$ui = {
    tooltip(target, position) {
      target.setAttribute("data-title", target.title);
      if (tampermonkey_1$1.$gm.isInGMContext()) {
        target.removeAttribute("title");
      }
      const container2 = () => elements_1$2.$elements.tooltipContainer;
      const isVisible = () => {
        var _a;
        return (_a = container2()) === null || _a === void 0 ? void 0 : _a.classList.contains("show");
      };
      let showTimer;
      let autoHideTimer;
      let lastTouchTime = 0;
      const computePlacement = () => {
        const el = container2();
        if (!el) {
          return;
        }
        const zoom = getPageZoom();
        const margin = 8;
        const rect = target.getBoundingClientRect();
        const tipRect = el.getBoundingClientRect();
        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;
        let placement = (position === null || position === void 0 ? void 0 : position.startsWith("top")) ? "top" : "bottom";
        const fits = placement === "bottom" ? rect.bottom + margin + tipRect.height <= vh - margin : rect.top - margin - tipRect.height >= margin;
        if (!fits) {
          placement = placement === "bottom" ? "top" : "bottom";
        }
        const top2 = placement === "bottom" ? rect.bottom + margin : rect.top - margin - tipRect.height;
        const align = (position === null || position === void 0 ? void 0 : position.endsWith("left")) ? "left" : (position === null || position === void 0 ? void 0 : position.endsWith("right")) ? "right" : "center";
        let left;
        if (align === "left") {
          left = rect.left;
        } else if (align === "right") {
          left = rect.right - tipRect.width;
        } else {
          left = rect.left + rect.width / 2 - tipRect.width / 2;
        }
        left = Math.max(margin, Math.min(left, vw - margin - tipRect.width));
        const arrowLeft = Math.max(6, Math.min(rect.left + rect.width / 2 - left - 4, tipRect.width - 14));
        el.classList.remove("tooltip-top", "tooltip-bottom");
        el.classList.add(placement === "bottom" ? "tooltip-bottom" : "tooltip-top");
        el.style.setProperty("--tooltip-arrow-left", arrowLeft + "px");
        el.style.top = top2 / zoom + "px";
        el.style.left = left / zoom + "px";
      };
      const onScrollOrResize = () => {
        if (!target.isConnected) {
          hide();
          return;
        }
        computePlacement();
      };
      const onDocumentMouseOver = (e) => {
        if (!target.contains(e.target)) {
          hide();
        }
      };
      const onDocumentTouchStart = (e) => {
        const el = container2();
        const path = e.composedPath();
        if (!path.includes(target) && !(el && path.includes(el))) {
          hide();
        }
      };
      const bindWhileVisible = () => {
        window.addEventListener("scroll", onScrollOrResize, true);
        window.addEventListener("resize", onScrollOrResize);
        document.addEventListener("mouseover", onDocumentMouseOver, true);
        document.addEventListener("touchstart", onDocumentTouchStart, true);
      };
      const unbindWhileVisible = () => {
        window.removeEventListener("scroll", onScrollOrResize, true);
        window.removeEventListener("resize", onScrollOrResize);
        document.removeEventListener("mouseover", onDocumentMouseOver, true);
        document.removeEventListener("touchstart", onDocumentTouchStart, true);
      };
      const show = () => {
        const el = container2();
        const dataTitle = target.getAttribute("data-title");
        if (!el || !dataTitle) {
          hide();
          return;
        }
        el.innerHTML = dataTitle.split("\n").join("<br>") || "";
        el.__owner = target;
        computePlacement();
        void el.offsetWidth;
        el.classList.add("show");
        bindWhileVisible();
      };
      function hide(owner) {
        const el = container2();
        if (!el) {
          return;
        }
        if (owner && el.__owner !== owner) {
          return;
        }
        el.classList.remove("show");
        el.__owner = void 0;
        clearTimeout(autoHideTimer);
        unbindWhileVisible();
      }
      target.addEventListener("mouseenter", () => {
        if (Date.now() - lastTouchTime < 500) {
          return;
        }
        clearTimeout(showTimer);
        showTimer = setTimeout(show, 100);
      });
      target.addEventListener("mouseleave", () => {
        clearTimeout(showTimer);
        hide(target);
      });
      target.addEventListener("click", show);
      target.addEventListener("blur", () => hide(target));
      target.addEventListener("touchstart", () => {
        var _a;
        lastTouchTime = Date.now();
        clearTimeout(autoHideTimer);
        if (isVisible() && ((_a = container2()) === null || _a === void 0 ? void 0 : _a.__owner) === target) {
          hide(target);
        } else {
          show();
          autoHideTimer = setTimeout(() => hide(target), 3e3);
        }
      });
      return target;
    },
    scriptPanel(script2, store2, opts) {
      var _a, _b, _c, _d;
      const scriptPanel = (0, dom_1$6.h)("script-panel-element", { name: script2.name });
      const notesExpandedKey = `_notes_expanded_${script2.fullName()}`;
      scriptPanel.setNotesExpanded(store2.get(notesExpandedKey, true));
      scriptPanel.notesHeader.addEventListener("click", () => {
        const expanded = !scriptPanel.isNotesExpanded();
        scriptPanel.setNotesExpanded(expanded);
        store2.set(notesExpandedKey, expanded);
      });
      scriptPanel.notesHeader.title = "点击收缩 / 展开";
      this.tooltip(scriptPanel.notesHeader);
      const updateNotesVisibility = (content) => {
        scriptPanel.notesContainer.style.display = (content === null || content === void 0 ? void 0 : content.trim()) ? "" : "none";
      };
      script2.onConfigChange("notes", (pre, curr) => {
        scriptPanel.notesBody.innerHTML = script2.cfg.notes || "";
        updateNotesVisibility(script2.cfg.notes);
      });
      script2.panel = scriptPanel;
      scriptPanel.notesBody.innerHTML = ((_b = (_a = script2.configs) === null || _a === void 0 ? void 0 : _a.notes) === null || _b === void 0 ? void 0 : _b.defaultValue) || "";
      updateNotesVisibility((_d = (_c = script2.configs) === null || _c === void 0 ? void 0 : _c.notes) === null || _d === void 0 ? void 0 : _d.defaultValue);
      let configs = /* @__PURE__ */ Object.create({});
      const elList = [];
      for (const key in script2.configs) {
        if (Object.prototype.hasOwnProperty.call(script2.configs, key)) {
          const cfg = script2.configs[key];
          if (cfg.separator) {
            elList.push(this.configsArea(this.configs(script2.namespace, store2, configs || {}, opts === null || opts === void 0 ? void 0 : opts.onload, script2)));
            elList.push((0, dom_1$6.h)("div", { className: "separator", style: { margin: "0px 8px" } }, cfg.separator));
            configs = /* @__PURE__ */ Object.create({});
          }
          configs[key] = cfg;
        }
      }
      if (Object.keys(configs).length > 0) {
        elList.push(this.configsArea(this.configs(script2.namespace, store2, configs || {}, opts === null || opts === void 0 ? void 0 : opts.onload, script2)));
      }
      scriptPanel.configsContainer.replaceChildren(...elList);
      return scriptPanel;
    },
    configsArea(configElements) {
      const configsContainer = (0, dom_1$6.h)("div", { className: "configs card" });
      const configsBody = (0, dom_1$6.h)("div", { className: "configs-body" });
      configsBody.append(...Object.entries(configElements).map(([key, el]) => el));
      configsContainer.append(configsBody);
      return configsContainer;
    },
    configs(namespace, store2, configs, onload, script2) {
      const resolveSlot = (slot) => typeof slot === "function" ? slot.call(script2, script2 === null || script2 === void 0 ? void 0 : script2.cfg) : slot;
      const elements2 = /* @__PURE__ */ Object.create({});
      for (const key in configs) {
        if (Object.prototype.hasOwnProperty.call(configs, key)) {
          const config2 = configs[key];
          if (config2.label !== void 0) {
            const element = (0, dom_1$6.h)("config-element", {
              key: common_1$4.$.namespaceKey(namespace, key),
              tag: config2.tag,
              sync: config2.sync,
              attrs: config2.attrs,
              _onload: function(el) {
                var _a;
                (_a = config2.onload) === null || _a === void 0 ? void 0 : _a.call(this, el);
                onload === null || onload === void 0 ? void 0 : onload(el);
              },
              defaultValue: config2.defaultValue,
              options: config2.options,
              showIf: config2.showIf,
              elementClassName: config2.elementClassName,
              labelClassName: config2.labelClassName,
              providerClassName: config2.providerClassName,
              enableForAttribute: config2.enableForAttribute,
              prefixSlot: resolveSlot(config2.prefixSlot),
              suffixSlot: resolveSlot(config2.suffixSlot)
            });
            element.store = store2;
            element.label.textContent = config2.label;
            elements2[key] = element;
          }
        }
      }
      return elements2;
    },
    notes(lines, tag = "ul") {
      return (0, dom_1$6.h)(tag, lines.map((line) => (0, dom_1$6.h)("li", Array.isArray(line) ? line.map((node) => typeof node === "string" ? (0, dom_1$6.h)("div", { innerHTML: node }) : node) : [typeof line === "string" ? (0, dom_1$6.h)("div", { innerHTML: line }) : line])));
    },
    copy(name, value) {
      return (0, dom_1$6.h)("span", "📄" + name, (btn) => {
        btn.className = "copy";
        btn.addEventListener("click", () => {
          btn.innerText = "已复制√";
          navigator.clipboard.writeText(value);
          setTimeout(() => {
            btn.innerText = "📄" + name;
          }, 500);
        });
      });
    },
    preventText(opts) {
      const { name, delay = 3, autoRemove = true, ondefault, onprevent } = opts;
      const span = (0, dom_1$6.h)("span", name);
      span.style.textDecoration = "underline";
      span.style.cursor = "pointer";
      span.onclick = () => {
        clearTimeout(id);
        if (autoRemove) {
          span.remove();
        }
        onprevent === null || onprevent === void 0 ? void 0 : onprevent(span);
      };
      const id = setTimeout(() => {
        if (autoRemove) {
          span.remove();
        }
        ondefault(span);
      }, delay * 1e3);
      return span;
    },
    space(children, options) {
      return (0, dom_1$6.h)("div", { className: "space" }, (div) => {
        var _a, _b, _c;
        for (let index = 0; index < children.length; index++) {
          const child = (0, dom_1$6.h)("span", { className: "space-item" }, [children[index]]);
          child.style.display = "inline-block";
          const x = (_a = options === null || options === void 0 ? void 0 : options.x) !== null && _a !== void 0 ? _a : 12;
          const y = (_b = options === null || options === void 0 ? void 0 : options.y) !== null && _b !== void 0 ? _b : 0;
          if (index > 0) {
            child.style.marginLeft = x / 2 + "px";
            child.style.marginRight = x / 2 + "px";
            child.style.marginTop = y / 2 + "px";
            child.style.marginBottom = y / 2 + "px";
          } else {
            child.style.marginRight = x / 2 + "px";
            child.style.marginBottom = y / 2 + "px";
          }
          div.append(child);
          if (index !== children.length - 1) {
            div.append((0, dom_1$6.h)("span", [(_c = options === null || options === void 0 ? void 0 : options.separator) !== null && _c !== void 0 ? _c : " "]));
          }
        }
      });
    },
    button(text, attrs, handler) {
      return (0, dom_1$6.h)("input", Object.assign({ type: "button" }, attrs), function(btn) {
        btn.value = text || "";
        btn.classList.add("base-style-button");
        handler === null || handler === void 0 ? void 0 : handler.apply(this, [btn]);
      });
    }
  };
  (function(exports3) {
    var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports4) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports4, p))
          __createBinding(exports4, m, p);
    };
    Object.defineProperty(exports3, "__esModule", { value: true });
    __exportStar(common, exports3);
    __exportStar(ui, exports3);
    __exportStar(dom, exports3);
    __exportStar(elements$1, exports3);
    __exportStar(tampermonkey, exports3);
    __exportStar(store, exports3);
    __exportStar(_const, exports3);
  })(utils);
  (function(exports3) {
    var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports3, "__esModule", { value: true });
    exports3.cors = exports3.CorsEventEmitter = void 0;
    const utils_12 = utils;
    const common_12 = common;
    const const_12 = _const;
    const store_12 = store;
    class CorsEventEmitter {
      constructor() {
        this.eventMap = /* @__PURE__ */ new Map();
      }
      eventKey(name) {
        return "cors.events." + name;
      }
      tempKey(...args) {
        return ["_temp_", ...args].join(".");
      }
      keyOfReturn(id) {
        return this.tempKey("event", id, "return");
      }
      keyOfArguments(id) {
        return this.tempKey("event", id, "arguments");
      }
      keyOfState(id) {
        return this.tempKey("event", id, "state");
      }
      emit(name, args = [], callback) {
        store_12.$store.getTab(const_12.$const.TAB_UID).then((uid) => {
          const id = common_12.$.uuid().replace(/-/g, "");
          const key = uid + "." + this.eventKey(name);
          store_12.$store.set(this.keyOfState(id), 0);
          store_12.$store.set(this.keyOfArguments(id), args);
          setTimeout(() => {
            const listenerId = store_12.$store.addChangeListener(this.keyOfState(id), () => {
              store_12.$store.removeChangeListener(listenerId);
              callback === null || callback === void 0 ? void 0 : callback(store_12.$store.get(this.keyOfReturn(id)));
              store_12.$store.delete(this.keyOfState(id));
              store_12.$store.delete(this.keyOfReturn(id));
              store_12.$store.delete(this.keyOfArguments(id));
            }) || 0;
            store_12.$store.set(key, (store_12.$store.get(key) ? String(store_12.$store.get(key)).split(",") : []).concat(id).join(","));
          }, 100);
        }).catch(console.error);
      }
      on(name, handler) {
        return new Promise((resolve) => {
          store_12.$store.getTab(const_12.$const.TAB_UID).then((uid) => {
            const key = uid + "." + this.eventKey(name);
            const originId = this.eventMap.get(key);
            if (originId) {
              resolve(originId);
            } else {
              const id = store_12.$store.addChangeListener(key, (curr, pre, remote) => __awaiter2(this, void 0, void 0, function* () {
                if (remote) {
                  if (curr === void 0) {
                    return;
                  }
                  const list = String(curr).split(",");
                  const id2 = list.pop();
                  if (id2) {
                    store_12.$store.set(this.keyOfReturn(id2), yield handler(store_12.$store.get(this.keyOfArguments(id2))));
                    setTimeout(() => {
                      store_12.$store.set(this.keyOfState(id2), 1);
                      store_12.$store.set(key, list.join(","));
                    }, 100);
                  }
                }
              })) || 0;
              this.eventMap.set(key, id);
              resolve(id);
            }
          }).catch(console.error);
        });
      }
      off(name) {
        const key = this.eventKey(name);
        const originId = this.eventMap.get(key);
        if (originId) {
          this.eventMap.delete(key);
          store_12.$store.removeChangeListener(originId);
        }
      }
      defineTopFunction(func) {
        if (utils_12.$gm.isInGMContext() === false) {
          return () => {
          };
        }
        const event_name = "_top_function_." + getFuncId(func);
        if (self === top) {
          exports3.cors.on(event_name, (args) => __awaiter2(this, void 0, void 0, function* () {
            return yield func(...args);
          }));
        }
        return (...args) => __awaiter2(this, void 0, void 0, function* () {
          if (self === top) {
            return yield func(...args);
          }
          const res = yield new Promise((resolve, reject) => {
            try {
              exports3.cors.emit(event_name, args, (val) => {
                resolve(val);
              });
            } catch (e) {
              reject(e);
            }
          });
          return res;
        });
      }
    }
    exports3.CorsEventEmitter = CorsEventEmitter;
    if (typeof GM_listValues !== "undefined" && self === top) {
      window.onload = () => {
        store_12.$store.list().forEach((key) => {
          if (/_temp_.event.[0-9a-z]{32}.(state|return|arguments)/.test(key)) {
            store_12.$store.delete(key);
          }
          if (/_top_function_.*/.test(key)) {
            store_12.$store.delete(key);
          }
          if (/[0-9a-z]{32}.cors.events/.test(key)) {
            store_12.$store.delete(key);
          }
        });
      };
    }
    exports3.cors = new CorsEventEmitter();
    function getFuncId(fn) {
      if (typeof fn !== "function") {
        throw new Error("first argument in defineTopFunction() is not Function!");
      }
      const str = fn.toString();
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash).toString(36).padStart(16, "0").slice(-16);
    }
  })(cors);
  var project = {};
  Object.defineProperty(project, "__esModule", { value: true });
  project.Project = void 0;
  class Project {
    constructor({ name, domains, scripts }) {
      this.name = name;
      this.domains = domains;
      for (const key in scripts) {
        if (Object.prototype.hasOwnProperty.call(scripts, key)) {
          const element = scripts[key];
          element.projectName = name;
        }
      }
      this.scripts = scripts;
    }
    static create(opts) {
      return new Project(opts);
    }
  }
  project.Project = Project;
  var script = {};
  var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(script, "__esModule", { value: true });
  script.Script = script.BaseScript = void 0;
  const common_1$3 = common;
  const start_1$1 = start$1;
  const store_1$1 = store;
  const common_2 = common$1;
  const events_1 = __importDefault$1(events.exports);
  class BaseScript extends common_2.CommonEventEmitter {
  }
  script.BaseScript = BaseScript;
  class Script extends BaseScript {
    get configs() {
      if (!this._resolvedConfigs) {
        this._resolvedConfigs = typeof this._configs === "function" ? this._configs() : this._configs;
      }
      return this._resolvedConfigs;
    }
    set configs(c) {
      this._configs = c;
    }
    constructor({ name, namespace, matches: matches2, excludes, configs, hideInPanel, onstart, onactive, oncomplete, onbeforeunload, onrender, onhistorychange, onhistorychanged, methods, priority }) {
      super();
      this.excludes = [];
      this.cfg = {};
      this.methods = /* @__PURE__ */ Object.create({});
      this.event = new events_1.default();
      this.name = name;
      this.namespace = namespace;
      this.matches = matches2;
      this.excludes = excludes;
      this._configs = configs;
      this.hideInPanel = hideInPanel;
      this.onstart = this.errorHandler(onstart);
      this.onactive = this.errorHandler(onactive);
      this.oncomplete = this.errorHandler(oncomplete);
      this.onbeforeunload = this.errorHandler(onbeforeunload);
      this.onrender = this.errorHandler(onrender);
      this.onhistorychange = this.errorHandler(onhistorychange);
      this.onhistorychanged = this.errorHandler(onhistorychanged);
      this.methods = (methods === null || methods === void 0 ? void 0 : methods.bind(this)()) || /* @__PURE__ */ Object.create({});
      this.priority = priority !== null && priority !== void 0 ? priority : 0;
      if (this.methods) {
        for (const key in methods) {
          if (Reflect.has(this.methods, key) && typeof this.methods[key] !== "function") {
            Reflect.set(this.methods, key, this.errorHandler(this.methods[key]));
          }
        }
      }
    }
    onConfigChange(key, handler) {
      const _key = common_1$3.$.namespaceKey(this.namespace, key.toString());
      return store_1$1.$store.addChangeListener(_key, (curr, pre, remote) => {
        handler(curr, pre, !!remote);
      });
    }
    offConfigChange(listener) {
      store_1$1.$store.removeChangeListener(listener);
    }
    fullName() {
      return this.projectName ? `${this.projectName}-${this.name}` : this.name;
    }
    withEvents() {
      return this;
    }
    hidePanel() {
      this.setPanelHidden(true);
    }
    showPanel() {
      this.setPanelHidden(false);
    }
    togglePanel() {
      this.setPanelHidden(!this.hideInPanel);
    }
    isPanelHidden() {
      return !!this.hideInPanel;
    }
    setPanelHidden(hidden) {
      this.hideInPanel = hidden;
      start_1$1.$win === null || start_1$1.$win === void 0 ? void 0 : start_1$1.$win.refreshPanel();
    }
    errorHandler(func) {
      return (...args) => {
        try {
          return func === null || func === void 0 ? void 0 : func.apply(this, args);
        } catch (err) {
          console.error(err);
          if (err instanceof Error) {
            this.emit("scripterror", err.message);
          } else {
            this.emit("scripterror", String(err));
          }
        }
      };
    }
  }
  script.Script = Script;
  (function(exports3) {
    var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports4) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports4, p))
          __createBinding(exports4, m, p);
    };
    Object.defineProperty(exports3, "__esModule", { value: true });
    __exportStar(common$1, exports3);
    __exportStar(config$1, exports3);
    __exportStar(cors, exports3);
    __exportStar(project, exports3);
    __exportStar(script, exports3);
    __exportStar(store_provider, exports3);
  })(interfaces);
  var customWindow = {};
  var elements = {};
  var config = {};
  var _interface = {};
  Object.defineProperty(_interface, "__esModule", { value: true });
  _interface.IElement = void 0;
  class IElement extends HTMLElement {
    connectedCallback() {
    }
    disconnectedCallback() {
    }
    adoptedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
  }
  _interface.IElement = IElement;
  Object.defineProperty(config, "__esModule", { value: true });
  config.ConfigElement = void 0;
  const ui_1 = ui;
  const dom_1$5 = dom;
  const interface_1$6 = _interface;
  class ConfigElement extends interface_1$6.IElement {
    constructor(store2) {
      super();
      this.label = (0, dom_1$5.h)("label");
      this.wrapper = (0, dom_1$5.h)("div", { className: "config-wrapper" });
      this.key = "";
      this.store = store2;
    }
    get value() {
      return this.store.get(this.key, this.defaultValue);
    }
    set value(value) {
      this.provider.value = value;
      this.store.set(this.key, value);
    }
    connectedCallback() {
      var _a, _b, _c;
      switch (this.tag) {
        case "select": {
          this.provider = (0, dom_1$5.h)("select");
          const value = this.store.get(this.key, this.defaultValue);
          for (const item of this.options || []) {
            const option = ui_1.$ui.tooltip((0, dom_1$5.h)("option"));
            if (Array.isArray(item)) {
              option.value = item[0];
              option.textContent = (_a = item[1]) !== null && _a !== void 0 ? _a : item[0];
              if (item[2]) {
                option.title = item[2];
              }
              if (String(item[0]) === String(value)) {
                option.selected = true;
                option.toggleAttribute("selected");
              }
              this.provider.add(option);
            } else {
              option.value = item.value;
              option.textContent = (_b = item.label) !== null && _b !== void 0 ? _b : item.value;
              if (item.title) {
                option.title = item.title;
              }
              if (String(item.value) === String(value)) {
                option.selected = true;
                option.toggleAttribute("selected");
              }
              this.provider.add(option);
            }
          }
          this.provider.onchange = () => {
            this.store.set(this.key, this.provider.value);
          };
          break;
        }
        case "textarea": {
          this.provider = (0, dom_1$5.h)("textarea");
          this.provider.value = this.store.get(this.key, this.defaultValue);
          this.provider.onchange = () => {
            this.store.set(this.key, this.provider.value);
          };
          break;
        }
        default: {
          this.provider = (0, dom_1$5.h)("input");
          if (["checkbox", "radio"].some((t) => {
            var _a2;
            return t === ((_a2 = this.attrs) === null || _a2 === void 0 ? void 0 : _a2.type);
          })) {
            this.provider.checked = this.store.get(this.key, this.defaultValue);
            const provider2 = this.provider;
            provider2.onchange = () => {
              this.store.set(this.key, provider2.checked);
            };
          } else {
            this.provider.value = this.store.get(this.key, this.defaultValue);
            this.provider.setAttribute("value", this.provider.value);
            this.provider.onchange = () => {
              const { min, max, type } = this.attrs || {};
              if (type === "number") {
                if (this.provider.value.trim() === "") {
                  this.provider.value = this.defaultValue;
                  this.store.set(this.key, this.defaultValue);
                  return;
                }
                const val = parseFloat(this.provider.value);
                const _min = min ? parseFloat(min) : void 0;
                const _max = max ? parseFloat(max) : void 0;
                if (_min && val < _min) {
                  this.provider.value = _min.toString();
                  this.store.set(this.key, parseFloat(this.provider.value));
                } else if (_max && val > _max) {
                  this.provider.value = _max.toString();
                  this.store.set(this.key, parseFloat(this.provider.value));
                } else {
                  this.store.set(this.key, val);
                }
              } else {
                this.store.set(this.key, this.provider.value);
              }
            };
          }
          break;
        }
      }
      if (this.enableForAttribute) {
        this.provider.setAttribute("id", this.key);
        this.label.setAttribute("for", this.key);
      }
      if (this.labelClassName) {
        this.label.className = this.labelClassName;
      }
      if (this.providerClassName) {
        this.provider.className = this.providerClassName;
      }
      if (this.elementClassName) {
        this.className = this.elementClassName;
      }
      if (this.prefixSlot !== void 0 || this.suffixSlot !== void 0) {
        const toNode = (slot, className) => typeof slot === "string" ? (0, dom_1$5.h)("span", { className, innerHTML: slot }) : slot;
        const children = [];
        if (this.prefixSlot !== void 0) {
          children.push(toNode(this.prefixSlot, "config-prefix"));
        }
        children.push(this.provider);
        if (this.suffixSlot !== void 0) {
          children.push(toNode(this.suffixSlot, "config-suffix"));
        }
        this.wrapper.replaceChildren((0, dom_1$5.h)("div", { className: "config-provider-container" }, children));
      } else {
        this.wrapper.replaceChildren(this.provider);
      }
      this.append(this.label, this.wrapper);
      for (const key in this.attrs) {
        if (key === "style") {
          Object.assign(this.provider.style, this.attrs[key]);
          continue;
        }
        if (Object.prototype.hasOwnProperty.call(this.attrs, key)) {
          Reflect.set(this.provider, key, Reflect.get(this.attrs, key));
        }
      }
      if (this.sync) {
        this.store.addChangeListener(this.key, (curr) => {
          this.provider.value = curr;
        });
      }
      ui_1.$ui.tooltip(this.provider);
      if (this.showIf) {
        let show_if = false;
        if (Array.isArray(this.showIf)) {
          if (typeof this.showIf[0] !== "string") {
            throw new Error("EUS Config.showIf first element must be a string");
          }
          const val = this.store.get(this.showIf[0], false) || false;
          const res = this.showIf[1].call(null, val, val, this.store);
          show_if = Boolean(res);
        } else {
          show_if = this.store.get(this.showIf, false) || false;
        }
        if (show_if) {
          this.style.display = "";
        } else {
          this.style.display = "none";
        }
        if (Array.isArray(this.showIf)) {
          if (typeof this.showIf[1] !== "function") {
            throw new Error("EUS Config.showIf second element must be a function");
          }
          this.store.addChangeListener(this.showIf[0], (curr, pre) => {
            if (this.isConnected) {
              if (this.showIf && Array.isArray(this.showIf)) {
                const res = this.showIf[1].call(null, curr, pre, this.store);
                if (res) {
                  this.style.display = "";
                } else {
                  this.style.display = "none";
                }
              }
            }
          });
        } else {
          this.store.addChangeListener(this.showIf, (curr) => {
            if (this.isConnected) {
              const res = Boolean(curr);
              if (res) {
                this.style.display = "";
              } else {
                this.style.display = "none";
              }
            }
          });
        }
      }
      (_c = this._onload) === null || _c === void 0 ? void 0 : _c.call(this.provider, this);
    }
  }
  config.ConfigElement = ConfigElement;
  var container = {};
  Object.defineProperty(container, "__esModule", { value: true });
  container.ContainerElement = void 0;
  const common_1$2 = common;
  const dom_1$4 = dom;
  const interface_1$5 = _interface;
  class ContainerElement extends interface_1$5.IElement {
    constructor() {
      super(...arguments);
      this.header = (0, dom_1$4.h)("header-element");
      this.body = (0, dom_1$4.h)("div", { className: "body", clientHeight: window.innerHeight / 2 });
      this.footer = (0, dom_1$4.h)("div", { className: "footer" });
    }
    connectedCallback() {
      this.append(this.header, this.body, this.footer);
      const stopScrollPropagation = (e) => e.stopPropagation();
      this.addEventListener("wheel", stopScrollPropagation);
      this.addEventListener("touchmove", stopScrollPropagation);
      common_1$2.$.onresize(this, (cont) => {
        cont.body.style.maxHeight = window.innerHeight - this.header.clientHeight - 64 + "px";
        cont.body.style.maxWidth = window.innerWidth - 50 + "px";
      });
    }
  }
  container.ContainerElement = ContainerElement;
  var dropdown = {};
  Object.defineProperty(dropdown, "__esModule", { value: true });
  dropdown.DropdownElement = void 0;
  const interface_1$4 = _interface;
  const dom_1$3 = dom;
  class DropdownElement extends interface_1$4.IElement {
    constructor() {
      super(...arguments);
      this.triggerElement = (0, dom_1$3.h)("button");
      this.content = (0, dom_1$3.h)("div", { className: "dropdown-content" });
      this.trigger = "hover";
      this.hideDelay = 50;
    }
    connectedCallback() {
      this.append(this.triggerElement, this.content);
      this.classList.add("dropdown");
      if (this.trigger === "click") {
        this.triggerElement.onclick = () => {
          this.content.classList.toggle("show");
        };
        this.removeDocumentClickHandler();
        this.documentClickHandler = (e) => {
          if (this.content.classList.contains("show") && e.composedPath().includes(this) === false) {
            this.content.classList.remove("show");
          }
        };
        document.addEventListener("click", this.documentClickHandler);
      } else {
        let hideTimer;
        const show = () => {
          if (hideTimer !== void 0) {
            clearTimeout(hideTimer);
            hideTimer = void 0;
          }
          this.content.classList.add("show");
        };
        const hide = () => {
          if (hideTimer !== void 0) {
            clearTimeout(hideTimer);
          }
          hideTimer = setTimeout(() => {
            this.content.classList.remove("show");
            hideTimer = void 0;
          }, this.hideDelay);
        };
        this.triggerElement.onmouseenter = show;
        this.triggerElement.onmouseleave = hide;
        this.content.onmouseenter = show;
        this.content.onmouseleave = hide;
      }
      this.content.onclick = () => {
        this.content.classList.remove("show");
      };
    }
    disconnectedCallback() {
      this.removeDocumentClickHandler();
    }
    removeDocumentClickHandler() {
      if (this.documentClickHandler) {
        document.removeEventListener("click", this.documentClickHandler);
        this.documentClickHandler = void 0;
      }
    }
  }
  dropdown.DropdownElement = DropdownElement;
  var header = {};
  Object.defineProperty(header, "__esModule", { value: true });
  header.HeaderElement = void 0;
  const interface_1$3 = _interface;
  class HeaderElement extends interface_1$3.IElement {
    connectedCallback() {
      this.append(this.visualSwitcher || "");
    }
  }
  header.HeaderElement = HeaderElement;
  var message = {};
  Object.defineProperty(message, "__esModule", { value: true });
  message.MessageElement = void 0;
  const dom_1$2 = dom;
  const interface_1$2 = _interface;
  class MessageElement extends interface_1$2.IElement {
    constructor() {
      super(...arguments);
      this.closer = (0, dom_1$2.h)("span", { className: "message-closer" }, "x");
      this.contentContainer = (0, dom_1$2.h)("span", { className: "message-content-container" });
      this.type = "info";
      this.content = "";
      this.closeable = true;
    }
    connectedCallback() {
      var _a;
      this.classList.add(this.type);
      if (typeof this.content === "string") {
        this.contentContainer.innerHTML = this.content;
      } else {
        this.contentContainer.append(this.content);
      }
      this.duration = Math.max((_a = this.duration) !== null && _a !== void 0 ? _a : 5, 0);
      this.append(this.contentContainer);
      if (this.closeable) {
        this.append(this.closer);
        this.closer.addEventListener("click", () => {
          var _a2;
          (_a2 = this.onClose) === null || _a2 === void 0 ? void 0 : _a2.call(this);
          this.remove();
        });
      }
      if (this.duration) {
        setTimeout(() => {
          var _a2;
          (_a2 = this.onClose) === null || _a2 === void 0 ? void 0 : _a2.call(this);
          this.remove();
        }, this.duration * 1e3);
      }
    }
  }
  message.MessageElement = MessageElement;
  var modal$1 = {};
  var __awaiter$2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(modal$1, "__esModule", { value: true });
  modal$1.ModalElement = void 0;
  const common_1$1 = common;
  const dom_1$1 = dom;
  const tampermonkey_1 = tampermonkey;
  const interface_1$1 = _interface;
  class ModalElement extends interface_1$1.IElement {
    constructor() {
      super(...arguments);
      this._title = (0, dom_1$1.h)("div", { className: "modal-title" });
      this.body = (0, dom_1$1.h)("div", { className: "modal-body" });
      this.footerContainer = (0, dom_1$1.h)("div", { className: "modal-footer" });
      this.modalInput = (0, dom_1$1.h)("input", { className: "modal-input" });
      this.modalInputType = "input";
      this.type = "alert";
      this.content = "";
      this.inputDefaultValue = "";
      this.placeholder = "";
      this.modalStyle = {};
    }
    connectedCallback() {
      var _a;
      this.classList.add(this.type);
      Object.assign(this.style, this.modalStyle || {});
      const profile = (0, dom_1$1.h)("div", {
        innerText: this.profile || "弹窗来自: OCS " + (((_a = tampermonkey_1.$gm.getInfos()) === null || _a === void 0 ? void 0 : _a.script.version) || ""),
        className: "modal-profile"
      });
      this._title.innerText = this.title;
      this.body.append(typeof this.content === "string" ? (0, dom_1$1.h)("div", { innerHTML: this.content }) : this.content);
      if (this.modalInputType === "textarea") {
        this.modalInput = (0, dom_1$1.h)("textarea", { className: "modal-input", style: { height: "100px" } });
      }
      this.modalInput.placeholder = this.placeholder || "";
      this.modalInput.value = this.inputDefaultValue || "";
      this.append(profile, this._title, this.body, this.footerContainer);
      this.style.width = (this.width || 400) + "px";
      if (this.footer === void 0) {
        this.footerContainer.append(this.modalInput);
        if (this.cancelButton === void 0) {
          this.cancelButton = (0, dom_1$1.h)("button", { className: "modal-cancel-button" });
          this.cancelButton.innerText = this.cancelButtonText || "取消";
          this.cancelButton.onclick = () => {
            var _a2, _b;
            (_a2 = this.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(this);
            (_b = this.onClose) === null || _b === void 0 ? void 0 : _b.call(this);
            this.remove();
          };
        }
        if (this.confirmButton === void 0) {
          this.confirmButton = (0, dom_1$1.h)("button", { className: "modal-confirm-button" });
          this.confirmButton.innerText = this.confirmButtonText || "确定";
          this.confirmButton.onclick = () => __awaiter$2(this, void 0, void 0, function* () {
            var _b, _c;
            if ((yield (_b = this.onConfirm) === null || _b === void 0 ? void 0 : _b.call(this, this.modalInput.value)) !== false) {
              this.remove();
              (_c = this.onClose) === null || _c === void 0 ? void 0 : _c.call(this, this.modalInput.value);
            }
          });
        }
        this.cancelButton && this.footerContainer.append(this.cancelButton);
        this.confirmButton && this.footerContainer.append(this.confirmButton);
        if (this.type === "simple") {
          this.footerContainer.remove();
        } else if (this.type === "prompt") {
          this.modalInput.focus();
        }
      } else {
        this.footerContainer.append(this.footer);
      }
      common_1$1.$.onresize(this.body, (modal2) => {
        this.body.style.maxHeight = window.innerHeight - 100 + "px";
        this.body.style.maxWidth = window.innerWidth - 50 + "px";
      });
    }
  }
  modal$1.ModalElement = ModalElement;
  var script_panel = {};
  Object.defineProperty(script_panel, "__esModule", { value: true });
  script_panel.ScriptPanelElement = void 0;
  const dom_1 = dom;
  const interface_1 = _interface;
  class ScriptPanelElement extends interface_1.IElement {
    constructor() {
      super(...arguments);
      this.separator = (0, dom_1.h)("div", { className: "separator" });
      this.notesContainer = (0, dom_1.h)("div", { className: "notes card" });
      this.notesHeader = (0, dom_1.h)("div", { className: "notes-header" });
      this.notesBody = (0, dom_1.h)("div", { className: "notes-body" });
      this.configsContainer = (0, dom_1.h)("div", { className: "configs-container card" });
      this.body = (0, dom_1.h)("div", { className: "script-panel-body" });
      this.lockWrapper = (0, dom_1.h)("div", { className: "lock-wrapper" });
    }
    connectedCallback() {
      this.separator.innerText = this.name || "";
      this.notesHeader.append((0, dom_1.h)("span", { className: "notes-title" }, [(0, dom_1.h)("span", { className: "notes-info-icon" }, "i"), "提示"]), (0, dom_1.h)("span", { className: "notes-collapse-icon" }, "▼"));
      this.notesContainer.append(this.notesHeader);
      this.notesContainer.append(this.notesBody);
      this.append(this.separator);
      this.append(this.notesContainer);
      this.append(this.configsContainer);
      this.append(this.body);
    }
    setNotesExpanded(expanded) {
      this.notesContainer.classList.toggle("collapsed", !expanded);
    }
    isNotesExpanded() {
      return !this.notesContainer.classList.contains("collapsed");
    }
  }
  script_panel.ScriptPanelElement = ScriptPanelElement;
  (function(exports3) {
    Object.defineProperty(exports3, "__esModule", { value: true });
    exports3.definedCustomElements = exports3.ScriptPanelElement = exports3.ModalElement = exports3.MessageElement = exports3.HeaderElement = exports3.ContainerElement = exports3.ConfigElement = void 0;
    const config_1 = config;
    const container_1 = container;
    const dropdown_1 = dropdown;
    const header_1 = header;
    const message_1 = message;
    const modal_1 = modal$1;
    const script_panel_1 = script_panel;
    var config_2 = config;
    Object.defineProperty(exports3, "ConfigElement", { enumerable: true, get: function() {
      return config_2.ConfigElement;
    } });
    var container_2 = container;
    Object.defineProperty(exports3, "ContainerElement", { enumerable: true, get: function() {
      return container_2.ContainerElement;
    } });
    var header_2 = header;
    Object.defineProperty(exports3, "HeaderElement", { enumerable: true, get: function() {
      return header_2.HeaderElement;
    } });
    var message_2 = message;
    Object.defineProperty(exports3, "MessageElement", { enumerable: true, get: function() {
      return message_2.MessageElement;
    } });
    var modal_2 = modal$1;
    Object.defineProperty(exports3, "ModalElement", { enumerable: true, get: function() {
      return modal_2.ModalElement;
    } });
    var script_panel_2 = script_panel;
    Object.defineProperty(exports3, "ScriptPanelElement", { enumerable: true, get: function() {
      return script_panel_2.ScriptPanelElement;
    } });
    exports3.definedCustomElements = [
      config_1.ConfigElement,
      container_1.ContainerElement,
      header_1.HeaderElement,
      modal_1.ModalElement,
      message_1.MessageElement,
      script_panel_1.ScriptPanelElement,
      dropdown_1.DropdownElement
    ];
  })(elements);
  var __awaiter$1 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __rest = commonjsGlobal && commonjsGlobal.__rest || function(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  Object.defineProperty(customWindow, "__esModule", { value: true });
  customWindow.modal = customWindow.CustomWindow = void 0;
  const _1 = interfaces;
  const elements_1$1 = elements;
  const utils_1 = utils;
  const start_1 = start$1;
  const minimizeSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>';
  const expandSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"/></svg>';
  class CustomWindow {
    constructor(projects, inputStoreProvider, config2) {
      this.messageContainer = (0, utils_1.h)("div", { className: "message-container" });
      this.menuBar = utils_1.$ui.tooltip(
        (0, utils_1.h)("div", { className: "header-menu-bar", title: "菜单栏-可拖动区域", style: { display: "flex", width: "100%" } }),
        "top"
      );
      this.extraMenuBar = (0, utils_1.h)("div", { className: "extra-menu-bar" });
      this.defaults = {
        urls: (urls) => urls && urls.length ? urls : [location.href],
        panelName: (name) => name || this.config.render.defaultPanelName || ""
      };
      this.projects = projects;
      this.inputStoreProvider = inputStoreProvider;
      this.config = config2;
      handleLowLevelBrowser();
      utils_1.$.loadCustomElements(elements_1$1.definedCustomElements);
      this.wrapper = (0, utils_1.h)("div");
      utils_1.$elements.tooltipContainer = (0, utils_1.h)("div", { className: "tooltip-container" });
      utils_1.$elements.wrapper = this.wrapper;
      this.root = this.wrapper.attachShadow({ mode: "closed" });
      utils_1.$elements.root = this.root;
      this.container = (0, utils_1.h)("container-element");
      this.root.append(this.container);
      const styles = config2.render.styles.map((s) => (0, utils_1.h)("style", s));
      this.container.append(...styles, this.messageContainer);
      new MutationObserver(() => this.layoutViewportTopMessages()).observe(this.messageContainer, { childList: true });
      const handlePosition = () => {
        const pos = config2.store.getPosition();
        if (pos.x > document.documentElement.clientWidth || pos.x < 0) {
          config2.store.setPosition(10, 10);
        }
        if (pos.y > document.documentElement.clientHeight || pos.y < 0) {
          config2.store.setPosition(10, 10);
        }
        this.container.style.left = pos.x + "px";
        this.container.style.top = pos.y + "px";
        const positionHandler = () => {
          config2.store.setPosition(this.container.offsetLeft, this.container.offsetTop);
        };
        (0, utils_1.enableElementDraggable)(this.menuBar, this.container, positionHandler);
        (0, utils_1.enableElementTouchDraggable)(this.menuBar, this.container, positionHandler);
      };
      const handleVisible = () => {
        window.addEventListener("click", (e) => {
          if (e.detail === Math.max(config2.render.switchPoint, 3)) {
            this.container.style.top = e.y + "px";
            this.container.style.left = e.x + "px";
            config2.store.setPosition(e.x, e.y);
            this.setVisual("normal");
          }
        });
      };
      const initCorsModalSystem = () => {
        _1.cors.on("modal", (args) => __awaiter$1(this, void 0, void 0, function* () {
          const [type, _attrs] = args || [];
          return new Promise((resolve, reject) => {
            const attrs = _attrs;
            attrs.onCancel = () => resolve("");
            attrs.onConfirm = resolve;
            attrs.onClose = resolve;
            modal(type, attrs);
          });
        }));
      };
      const initCorsMessageSystem = () => {
        _1.cors.on("message", (args) => __awaiter$1(this, void 0, void 0, function* () {
          const [type, attrs] = args || [];
          console.log("message", type, attrs);
          this.message(type, attrs);
        }));
      };
      const switchVisual = () => {
        this.setVisual(config2.store.getVisual() === "hidden" ? "normal" : "hidden");
      };
      window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === config2.render.switchKey) {
          e.stopPropagation();
          e.preventDefault();
          switchVisual();
        }
      }, { capture: true });
      _1.cors.on("switch-visual", () => {
        switchVisual();
      });
      handleVisible();
      this.setVisual(config2.store.getVisual());
      (() => __awaiter$1(this, void 0, void 0, function* () {
        const urls = yield config2.store.getRenderURLs();
        const currentPanelName = yield config2.store.getCurrentPanelName();
        yield this.rerender(this.defaults.urls(urls), this.defaults.panelName(currentPanelName));
      }))();
      initCorsModalSystem();
      initCorsMessageSystem();
      handlePosition();
      this.setFontSize(config2.render.fontsize);
    }
    rerender(urls, currentPanelName) {
      return __awaiter$1(this, void 0, void 0, function* () {
        this.initHeader(urls, currentPanelName);
        yield this.renderBody(currentPanelName);
      });
    }
    initHeader(urls, currentPanelName) {
      const title = this.config.render.title;
      const profile = utils_1.$ui.tooltip((0, utils_1.h)("div", { className: "profile", title: "菜单栏（可拖动区域）" }, (el) => {
        if (title instanceof HTMLElement) {
          el.append(title);
        } else {
          el.innerHTML = title || "无标题";
        }
      }));
      const scriptDropdowns = [];
      for (const project2 of this.projects) {
        const dropdown2 = (0, utils_1.h)("dropdown-element");
        let selected = false;
        const options = [];
        const scripts = utils_1.$.getMatchedScripts([project2], urls).filter((s) => !s.hideInPanel);
        if (scripts.length) {
          for (const key in project2.scripts) {
            if (Object.prototype.hasOwnProperty.call(project2.scripts, key)) {
              const script2 = project2.scripts[key];
              if (!script2.hideInPanel) {
                const optionSelected = isCurrentPanel(project2.name, script2, currentPanelName);
                const option = (0, utils_1.h)("div", { className: "dropdown-option" }, script2.name);
                if (optionSelected) {
                  option.classList.add("active");
                }
                if (selected !== true && optionSelected) {
                  selected = true;
                }
                option.onclick = () => __awaiter$1(this, void 0, void 0, function* () {
                  yield this.config.store.setCurrentPanelName(project2.name + "-" + script2.name);
                });
                options.push(option);
              }
            }
          }
          if (selected) {
            dropdown2.classList.add("active");
          }
          dropdown2.triggerElement = (0, utils_1.h)("div", { className: "dropdown-trigger-element" }, project2.name);
          dropdown2.content.append(...options);
          scriptDropdowns.push(dropdown2);
        }
      }
      const isMinimize = () => this.config.store.getVisual() === "minimize";
      const visualSwitcher = utils_1.$ui.tooltip((0, utils_1.h)("div", {
        className: "switch ",
        title: isMinimize() ? "点击展开窗口" : "点击最小化窗口",
        innerHTML: isMinimize() ? expandSvg : minimizeSvg,
        onclick: () => {
          this.setVisual(isMinimize() ? "normal" : "minimize");
          visualSwitcher.title = isMinimize() ? "点击展开窗口" : "点击最小化窗口";
          visualSwitcher.innerHTML = isMinimize() ? expandSvg : minimizeSvg;
        }
      }));
      this.container.header.visualSwitcher = visualSwitcher;
      this.container.header.replaceChildren();
      this.menuBar.replaceChildren(profile, ...scriptDropdowns, this.container.header.visualSwitcher || "");
      this.container.header.append((0, utils_1.h)("div", { style: { width: "100%" } }, [
        this.menuBar,
        (0, utils_1.h)("div", { style: { display: "flex", width: "100%" } }, [this.extraMenuBar])
      ]));
    }
    renderBody(currentPanelName) {
      var _a;
      return __awaiter$1(this, void 0, void 0, function* () {
        for (const project2 of this.projects) {
          for (const key in project2.scripts) {
            if (Object.prototype.hasOwnProperty.call(project2.scripts, key)) {
              const script2 = project2.scripts[key];
              if (isCurrentPanel(project2.name, script2, currentPanelName)) {
                const panel = utils_1.$ui.scriptPanel(script2, this.inputStoreProvider);
                script2.projectName = project2.name;
                script2.panel = panel;
                script2.header = this.container.header;
                utils_1.$elements.currentScriptPanel = panel;
                this.container.body.replaceChildren(panel);
                (_a = script2.onrender) === null || _a === void 0 ? void 0 : _a.call(script2, { panel, header: this.container.header });
                script2.emit("render", { panel, header: this.container.header });
              }
            }
          }
        }
      });
    }
    setFontSize(fontsize) {
      this.container.style.font = `${fontsize}px  Menlo, Monaco, Consolas, 'Courier New', monospace`;
    }
    setVisual(value) {
      this.container.className = "";
      if (value === "minimize") {
        this.container.classList.add("minimize");
      } else if (value === "hidden") {
        this.container.classList.add("hidden");
      } else {
        this.container.classList.add("normal");
      }
      this.config.store.setVisual(value);
    }
    changeRenderURLs(urls) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const currentPanelName = yield this.config.store.getCurrentPanelName();
        yield this.rerender(this.defaults.urls(urls), this.defaults.panelName(currentPanelName));
      });
    }
    changePanel(currentPanelName) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const urls = (yield this.config.store.getRenderURLs()) || [location.href];
        yield this.rerender(this.defaults.urls(urls), this.defaults.panelName(currentPanelName));
      });
    }
    refreshPanel() {
      return __awaiter$1(this, void 0, void 0, function* () {
        const urls = this.defaults.urls((yield this.config.store.getRenderURLs()) || [location.href]);
        let currentPanelName = this.defaults.panelName(yield this.config.store.getCurrentPanelName());
        const visibleScripts = utils_1.$.getMatchedScripts(this.projects, urls).filter((s) => !s.hideInPanel);
        const isCurrentVisible = visibleScripts.some((s) => isCurrentPanel(s.projectName, s, currentPanelName));
        if (!isCurrentVisible && visibleScripts.length > 0) {
          currentPanelName = visibleScripts[0].fullName();
        }
        yield this.rerender(urls, currentPanelName);
      });
    }
    pin(script2) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (script2.projectName) {
          yield this.config.store.setCurrentPanelName(`${script2.projectName}-${script2.name}`);
        } else if (script2.namespace) {
          yield this.config.store.setCurrentPanelName(script2.namespace);
        } else {
          console.warn("[ERROR]", `${script2.name} 无法置顶， projectName 与 namespace 都为 undefined`);
        }
      });
    }
    minimize() {
      this.setVisual("minimize");
    }
    normal() {
      this.setVisual("normal");
    }
    hidden() {
      this.setVisual("hidden");
    }
    message(type, attrs) {
      if (typeof attrs === "string") {
        attrs = { content: attrs };
      }
      const message2 = (0, utils_1.h)("message-element", Object.assign({ type }, attrs));
      this.messageContainer.append(message2);
      requestAnimationFrame(() => {
        const rect = message2.getBoundingClientRect();
        const outOfViewport = rect.left < 0 || rect.top < 0 || rect.right > window.innerWidth || rect.bottom > window.innerHeight;
        if (outOfViewport) {
          message2.classList.add("message-viewport-top");
          this.layoutViewportTopMessages();
        }
      });
      return message2;
    }
    layoutViewportTopMessages() {
      let top2 = 12;
      const gap = 8;
      const messages = this.messageContainer.querySelectorAll("message-element.message-viewport-top");
      for (const el of Array.from(messages)) {
        el.style.top = top2 + "px";
        top2 += el.offsetHeight + gap;
      }
    }
    menu(label, config2) {
      return __awaiter$1(this, void 0, void 0, function* () {
        this.extraMenuBar.style.display = "flex";
        const btn = (0, utils_1.h)("button", label);
        btn.addEventListener("click", () => {
          if (config2.scriptPanelLink) {
            this.pin(config2.scriptPanelLink).then(() => {
              this.normal();
            }).catch(console.error);
          }
        });
        if (config2.scriptPanelLink) {
          const full_name = (config2.scriptPanelLink.projectName ? config2.scriptPanelLink.projectName + " -> " : "") + config2.scriptPanelLink.name;
          btn.title = "快捷跳转：" + full_name;
          btn.setAttribute("data-name", (config2.scriptPanelLink.projectName + "-" + config2.scriptPanelLink.name).replace(/\s/g, "_"));
          btn.classList.add("script-panel-link");
        }
        this.extraMenuBar.append(utils_1.$ui.tooltip(btn));
        const name = yield utils_1.$store.getTab(utils_1.$const.TAB_CURRENT_PANEL_NAME);
        if (config2.scriptPanelLink) {
          if (isCurrentPanel(config2.scriptPanelLink.projectName, config2.scriptPanelLink, name)) {
            this.extraMenuBar.querySelectorAll(".script-panel-link").forEach((el) => el.classList.remove("active"));
            btn.classList.add("active");
          }
        }
        return btn;
      });
    }
    mount(parent) {
      parent.children[utils_1.$.random(0, parent.children.length - 1)].after(this.wrapper);
    }
  }
  customWindow.CustomWindow = CustomWindow;
  function isCurrentPanel(projectName, script2, currentPanelName) {
    return projectName + "-" + script2.name === currentPanelName || script2.namespace === currentPanelName;
  }
  function handleLowLevelBrowser() {
    if (typeof Element.prototype.replaceChildren === "undefined") {
      Element.prototype.replaceChildren = function(...nodes) {
        this.innerHTML = "";
        for (const node of nodes) {
          this.append(node);
        }
      };
    }
  }
  function modal(type, attrs, parent = (start_1.$win === null || start_1.$win === void 0 ? void 0 : start_1.$win.container) || utils_1.$elements.root || document.body) {
    const { maskCloseable = true, onConfirm, onCancel, onClose, notification: notify, notificationOptions, duration } = attrs, _attrs = __rest(attrs, ["maskCloseable", "onConfirm", "onCancel", "onClose", "notification", "notificationOptions", "duration"]);
    if (notify) {
      utils_1.$gm.notification(typeof _attrs.content === "string" ? _attrs.content : _attrs.content.textContent || "", notificationOptions);
    }
    const wrapper = (0, utils_1.h)("div", { className: "modal-wrapper" }, (wrapper2) => {
      const modal2 = (0, utils_1.h)("modal-element", Object.assign({
        onConfirm(val) {
          return __awaiter$1(this, void 0, void 0, function* () {
            const isClose = yield onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm.apply(modal2, [val]);
            if (isClose !== false) {
              wrapper2.remove();
            }
            return isClose;
          });
        },
        onCancel() {
          onCancel === null || onCancel === void 0 ? void 0 : onCancel.apply(modal2);
          wrapper2.remove();
        },
        onClose(val) {
          onClose === null || onClose === void 0 ? void 0 : onClose.apply(modal2, [val]);
          wrapper2.remove();
        },
        type
      }, _attrs));
      wrapper2.append(modal2);
      modal2.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      if (maskCloseable) {
        wrapper2.addEventListener("click", () => {
          onClose === null || onClose === void 0 ? void 0 : onClose.apply(modal2);
          wrapper2.remove();
        });
      }
    });
    if (duration) {
      setTimeout(() => {
        wrapper.remove();
      }, duration * 1e3);
    }
    parent.append(wrapper);
    return wrapper;
  }
  customWindow.modal = modal;
  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(start$1, "__esModule", { value: true });
  start$1.addFunctionEventListener = start$1.start = start$1.$win = void 0;
  const interfaces_1 = interfaces;
  const custom_window_1 = customWindow;
  const common_1 = common;
  const const_1 = _const;
  const elements_1 = elements$1;
  const store_1 = store;
  const debounce_1 = __importDefault(debounce_1$1);
  let mounted = false;
  function start(startConfig) {
    return __awaiter(this, void 0, void 0, function* () {
      startConfig.projects = startConfig.projects.map((p) => {
        for (const key in p.scripts) {
          if (Object.prototype.hasOwnProperty.call(p.scripts, key)) {
            p.scripts[key].cfg = common_1.$.createConfigProxy(p.scripts[key]);
          }
        }
        return p;
      });
      const scripts = common_1.$.getMatchedScripts(startConfig.projects, [location.href]).sort((a, b) => b.priority - a.priority);
      scripts.forEach((script2) => {
        var _a;
        script2.startConfig = startConfig;
        script2.emit("start", startConfig);
        (_a = script2.onstart) === null || _a === void 0 ? void 0 : _a.call(script2, startConfig);
      });
      const uid = yield store_1.$store.getTab(const_1.$const.TAB_UID);
      if (uid === void 0) {
        yield store_1.$store.setTab(const_1.$const.TAB_UID, common_1.$.uuid());
      }
      const urls = yield store_1.$store.getTab(const_1.$const.TAB_URLS);
      yield store_1.$store.setTab(const_1.$const.TAB_URLS, Array.from(new Set((urls || []).concat(location.href))));
      let active = false;
      if (document.readyState === "interactive") {
        active = true;
        mount(startConfig);
        scripts.forEach((script2) => {
          var _a;
          return (_a = script2.onactive) === null || _a === void 0 ? void 0 : _a.call(script2, startConfig);
        });
      } else if (document.readyState === "complete") {
        mount(startConfig);
        scripts.forEach((script2) => {
          var _a;
          return (_a = script2.onactive) === null || _a === void 0 ? void 0 : _a.call(script2, startConfig);
        });
        scripts.forEach((script2) => {
          var _a;
          return (_a = script2.oncomplete) === null || _a === void 0 ? void 0 : _a.call(script2, startConfig);
        });
      }
      document.addEventListener("readystatechange", () => {
        mount(startConfig);
        if (document.readyState === "interactive" && active === false) {
          scripts.forEach((script2) => {
            var _a;
            script2.emit("active", startConfig);
            (_a = script2.onactive) === null || _a === void 0 ? void 0 : _a.call(script2, startConfig);
          });
        }
        if (document.readyState === "complete") {
          scripts.forEach((script2) => {
            var _a;
            script2.emit("complete");
            (_a = script2.oncomplete) === null || _a === void 0 ? void 0 : _a.call(script2, startConfig);
          });
        }
      });
      window.addEventListener("hashchange", () => {
        scripts.forEach((script2) => {
          var _a;
          script2.emit("hashchange", startConfig);
          (_a = script2.onhashchange) === null || _a === void 0 ? void 0 : _a.call(script2, startConfig);
        });
      });
      history.pushState = addFunctionEventListener(history, "pushState");
      history.replaceState = addFunctionEventListener(history, "replaceState");
      window.addEventListener("pushState", () => {
        scripts.forEach((script2) => {
          var _a;
          script2.emit("historychange", "push", startConfig);
          (_a = script2.onhistorychange) === null || _a === void 0 ? void 0 : _a.call(script2, "push", startConfig);
        });
        const new_scripts = common_1.$.getMatchedScripts(startConfig.projects, [location.href]).sort((a, b) => b.priority - a.priority);
        new_scripts.forEach((ns) => {
          var _a;
          ns.emit("historychanged", "pushed", startConfig);
          (_a = ns.onhistorychanged) === null || _a === void 0 ? void 0 : _a.call(ns, "pushed", startConfig);
        });
      });
      window.addEventListener("replaceState", () => {
        scripts.forEach((script2) => {
          var _a;
          script2.emit("historychange", "replace", startConfig);
          (_a = script2.onhistorychange) === null || _a === void 0 ? void 0 : _a.call(script2, "replace", startConfig);
        });
        const new_scripts = common_1.$.getMatchedScripts(startConfig.projects, [location.href]).sort((a, b) => b.priority - a.priority);
        new_scripts.forEach((ns) => {
          var _a;
          ns.emit("historychanged", "replaced", startConfig);
          (_a = ns.onhistorychanged) === null || _a === void 0 ? void 0 : _a.call(ns, "replaced", startConfig);
        });
      });
      window.addEventListener("beforeunload", (e) => {
        var _a;
        let prevent;
        for (const script2 of scripts) {
          script2.emit("beforeunload");
          if ((_a = script2.onbeforeunload) === null || _a === void 0 ? void 0 : _a.call(script2, startConfig)) {
            prevent = true;
          }
        }
        if (prevent) {
          e.preventDefault();
          e.returnValue = true;
          return true;
        }
      });
    });
  }
  start$1.start = start;
  function addFunctionEventListener(obj, type) {
    const origin = obj[type];
    return function(...args) {
      const res = origin.apply(this, args);
      const e = new Event(type.toString());
      e.arguments = args;
      window.dispatchEvent(e);
      return res;
    };
  }
  start$1.addFunctionEventListener = addFunctionEventListener;
  function mount(startConfig) {
    return __awaiter(this, void 0, void 0, function* () {
      if (mounted === true) {
        return;
      }
      mounted = true;
      if (startConfig === void 0 || startConfig.renderConfig === void 0) {
        console.warn("the script will not have ui because the renderConfig is not defined.");
        return;
      }
      if (self !== top && startConfig.renderConfig) {
        window.addEventListener("keydown", (e) => {
          if (e.ctrlKey && e.key === "o") {
            e.stopPropagation();
            e.preventDefault();
            interfaces_1.cors.emit("switch-visual", []);
          }
        }, { capture: true });
      }
      if (self === top) {
        const { projects, renderConfig } = startConfig;
        if (typeof renderConfig.renderScript === "undefined") {
          console.warn("the script will not have ui because the RenderScript is not defined.");
          return;
        }
        const scripts = common_1.$.getMatchedScripts(projects, [location.href]).filter((s) => !!s.hideInPanel === false);
        if (scripts.length <= 0) {
          return;
        }
        const RenderScript2 = renderConfig.renderScript;
        const win = new custom_window_1.CustomWindow(startConfig.projects, store_1.$store, {
          render: {
            title: renderConfig.title,
            styles: renderConfig.styles,
            defaultPanelName: renderConfig.defaultPanelName,
            fontsize: RenderScript2.cfg.fontsize,
            switchPoint: RenderScript2.cfg.switchPoint,
            switchKey: "o"
          },
          store: {
            getPosition: () => {
              return { x: RenderScript2.cfg.x, y: RenderScript2.cfg.y };
            },
            setPosition: (x, y) => {
              RenderScript2.cfg.x = x;
              RenderScript2.cfg.y = y;
            },
            getVisual: () => {
              return RenderScript2.cfg.visual;
            },
            setVisual: (size) => {
              RenderScript2.cfg.visual = size;
            },
            getRenderURLs() {
              return __awaiter(this, void 0, void 0, function* () {
                return yield store_1.$store.getTab(const_1.$const.TAB_URLS);
              });
            },
            setRenderURLs(urls) {
              return __awaiter(this, void 0, void 0, function* () {
                return yield store_1.$store.setTab(const_1.$const.TAB_URLS, urls);
              });
            },
            getCurrentPanelName() {
              return __awaiter(this, void 0, void 0, function* () {
                return yield store_1.$store.getTab(const_1.$const.TAB_CURRENT_PANEL_NAME);
              });
            },
            setCurrentPanelName(name) {
              return __awaiter(this, void 0, void 0, function* () {
                return yield store_1.$store.setTab(const_1.$const.TAB_CURRENT_PANEL_NAME, name);
              });
            }
          }
        });
        RenderScript2.onConfigChange("fontsize", (fs) => {
          win.setFontSize(fs);
        });
        store_1.$store.addTabChangeListener(const_1.$const.TAB_URLS, (0, debounce_1.default)((curr, pre) => {
          if (JSON.stringify(curr) === JSON.stringify(pre)) {
            return;
          }
          win.changeRenderURLs(curr);
        }, 2e3));
        store_1.$store.addTabChangeListener(const_1.$const.TAB_CURRENT_PANEL_NAME, (curr, pre) => {
          if (curr === pre) {
            return;
          }
          win.changePanel(curr);
          updateMenusState(win, curr);
        });
        win.mount(startConfig.mountElement || document.body);
        elements_1.$elements.tooltipContainer && win.container.append(elements_1.$elements.tooltipContainer);
        start$1.$win = win;
      }
    });
  }
  function updateMenusState(win, name) {
    var _a;
    win.root.querySelectorAll(".extra-menu-bar .script-panel-link").forEach((el) => el.classList.remove("active"));
    (_a = win.root.querySelector('.extra-menu-bar [data-name="' + name.replace(/\s/g, "_") + '"]')) === null || _a === void 0 ? void 0 : _a.classList.add("active");
  }
  var render = {};
  (function(exports3) {
    Object.defineProperty(exports3, "__esModule", { value: true });
    exports3.$menu = exports3.$message = exports3.$modal = exports3.createRenderScript = void 0;
    const script_1 = script;
    const ui_12 = ui;
    const dom_12 = dom;
    const custom_window_12 = customWindow;
    const start_12 = start$1;
    const interfaces_12 = interfaces;
    const createRenderScript = (config2) => new script_1.Script({
      name: (config2 === null || config2 === void 0 ? void 0 : config2.name) || "窗口设置",
      matches: (config2 === null || config2 === void 0 ? void 0 : config2.matches) || [["所有", /.*/]],
      namespace: "render.panel",
      configs: {
        notes: {
          defaultValue: ui_12.$ui.notes([
            [
              "如果需要隐藏整个窗口，可以点击下方隐藏按钮，",
              "隐藏后可以快速三击屏幕中的任意地方",
              "来重新在鼠标位置显示窗口。"
            ],
            "窗口连续点击显示的次数可以自定义，默认为三次",
            ["窗口快捷键列表：", "ctrl + o : 隐藏/打开 面板"]
          ]).outerHTML
        },
        x: { defaultValue: window.innerWidth * 0.1 },
        y: { defaultValue: window.innerWidth * 0.1 },
        visual: { defaultValue: "normal" },
        firstCloseAlert: {
          defaultValue: true
        },
        fontsize: {
          label: "字体大小（像素）",
          attrs: { type: "number", min: 12, max: 24, step: 1 },
          defaultValue: 14
        },
        switchPoint: {
          label: "窗口显示连点（次数）",
          attrs: {
            type: "number",
            min: 3,
            max: 10,
            step: 1,
            title: "设置当连续点击屏幕 N 次时，可以进行面板的 隐藏/显示 切换，默认连续点击屏幕三下"
          },
          defaultValue: 3
        }
      },
      methods() {
        return {
          pin: (script2) => start_12.$win === null || start_12.$win === void 0 ? void 0 : start_12.$win.pin(script2),
          minimize: () => start_12.$win === null || start_12.$win === void 0 ? void 0 : start_12.$win.minimize(),
          setPosition: (x, y) => {
            if (start_12.$win) {
              start_12.$win.config.store.setPosition(x, y);
              start_12.$win.container.style.left = x + "px";
              start_12.$win.container.style.top = y + "px";
            }
          },
          normal: () => {
            start_12.$win === null || start_12.$win === void 0 ? void 0 : start_12.$win.normal();
          }
        };
      },
      onrender({ panel }) {
        const closeBtn = (0, dom_12.h)("button", { className: "base-style-button" }, "隐藏窗口");
        closeBtn.onclick = () => {
          if (this.cfg.firstCloseAlert) {
            exports3.$modal.confirm({
              content: ui_12.$ui.notes([
                "隐藏脚本页面后，快速点击页面三下（可以在悬浮窗设置中调整次数）即可重新显示脚本。如果三下无效，可以尝试删除脚本重新安装。",
                "请确认是否关闭。（此后不再显示此弹窗）"
              ]),
              onConfirm: () => {
                start_12.$win === null || start_12.$win === void 0 ? void 0 : start_12.$win.hidden();
                this.cfg.firstCloseAlert = false;
              }
            });
          } else {
            start_12.$win === null || start_12.$win === void 0 ? void 0 : start_12.$win.hidden();
          }
        };
        panel.body.replaceChildren((0, dom_12.h)("hr"), closeBtn);
      }
    });
    exports3.createRenderScript = createRenderScript;
    function _modal(type, attrs, parent) {
      if (self === top) {
        return (0, custom_window_12.modal)(type, attrs, parent);
      } else {
        interfaces_12.cors.emit("modal", [type, attrs], (args) => {
          var _a, _b, _c;
          if (args) {
            (_a = attrs.onConfirm) === null || _a === void 0 ? void 0 : _a.call(attrs, args);
          } else {
            (_b = attrs.onCancel) === null || _b === void 0 ? void 0 : _b.call(attrs);
          }
          (_c = attrs.onClose) === null || _c === void 0 ? void 0 : _c.call(attrs, args);
        });
      }
    }
    exports3.$modal = {
      confirm: (attrs, parent) => _modal("confirm", attrs, parent),
      alert: (attrs, parent) => _modal("alert", attrs, parent),
      prompt: (attrs, parent) => _modal("prompt", attrs, parent),
      simple: (attrs, parent) => _modal("simple", attrs, parent)
    };
    function _message(type, attrs) {
      if (self === top) {
        return start_12.$win === null || start_12.$win === void 0 ? void 0 : start_12.$win.message(type, attrs);
      } else {
        if (typeof attrs === "string") {
          attrs = { content: attrs };
        } else if (typeof attrs.content !== "string") {
          attrs.content = attrs.content.innerHTML;
        }
        interfaces_12.cors.emit("message", [type, attrs]);
      }
    }
    exports3.$message = {
      info: (attrs) => _message("info", attrs),
      success: (attrs) => _message("success", attrs),
      warn: (attrs) => _message("warn", attrs),
      error: (attrs) => _message("error", attrs)
    };
    function $menu(label, config2) {
      if (self !== top) {
        return;
      }
      return start_12.$win === null || start_12.$win === void 0 ? void 0 : start_12.$win.menu(label, config2);
    }
    exports3.$menu = $menu;
  })(render);
  (function(exports3) {
    var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports4) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports4, p))
          __createBinding(exports4, m, p);
    };
    Object.defineProperty(exports3, "__esModule", { value: true });
    exports3.start = void 0;
    var start_12 = start$1;
    Object.defineProperty(exports3, "start", { enumerable: true, get: function() {
      return start_12.start;
    } });
    __exportStar(utils, exports3);
    __exportStar(render, exports3);
    __exportStar(elements, exports3);
    __exportStar(interfaces, exports3);
  })(lib);
  function resolveSingle(answers, options, separators) {
    const allAnswer = answers.map((a) => splitAnswer(a, separators)).flat();
    const optionStrings = options.map(removeRedundant);
    const normalizedResult = answerNormalizedMatch(allAnswer, optionStrings);
    if (normalizedResult.length) {
      const index = optionStrings.findIndex((opt) => opt === normalizedResult[0]);
      if (index !== -1) {
        return { finish: true, option: options[index] };
      }
    }
    const ratings = answerSimilar(allAnswer, optionStrings);
    let bestIndex = -1;
    let bestRating = 0;
    ratings.forEach((r, i) => {
      if (r.rating > bestRating) {
        bestRating = r.rating;
        bestIndex = i;
      }
    });
    if (bestIndex !== -1 && bestRating > 0.6) {
      return {
        finish: true,
        option: options[bestIndex],
        ratings: ratings.map((r) => r.rating)
      };
    }
    for (const answer of allAnswer) {
      const ans = resolvePlainAnswer(StringUtils.nowrap(answer, "").trim());
      if (ans && ans.length === 1) {
        const index = ans.charCodeAt(0) - 65;
        if (optionStrings[index] !== void 0) {
          return { finish: true, option: options[index] };
        }
      }
    }
    if (allAnswer.length > 1) {
      const merged = allAnswer.join("");
      const r = resolveSingle([merged], options, separators);
      if (r.finish) {
        return r;
      }
    }
    return { finish: false, allAnswer, options: optionStrings };
  }
  function resolveMultiple(resultAnswers, options, separators) {
    const optionStrings = options.map(removeRedundant);
    const groups = [];
    for (let i = 0; i < resultAnswers.length; i++) {
      const answers = splitAnswer(resultAnswers[i].trim(), separators);
      const normalizedGroup = {
        options: [],
        answers: [],
        ratings: [],
        similarSum: 0,
        similarCount: 0
      };
      const normalizedOptions = answerNormalizedMatch(answers, optionStrings);
      for (const opt of normalizedOptions) {
        const idx = optionStrings.indexOf(opt);
        if (idx !== -1) {
          const matchedAns = answers.find((a) => {
            const na2 = normalizeString(removeRedundant(a));
            const no2 = normalizeString(removeRedundant(opt));
            return na2 === no2 || na2.includes(no2);
          });
          if (!matchedAns)
            continue;
          normalizedGroup.options.push(options[idx]);
          normalizedGroup.answers.push(matchedAns);
          const na = normalizeString(removeRedundant(matchedAns));
          const no = normalizeString(removeRedundant(opt));
          const rating = na === no ? 1 : 0.8;
          normalizedGroup.ratings.push(rating);
          normalizedGroup.similarSum += rating;
          normalizedGroup.similarCount += 1;
        }
      }
      const normalizedDisambiguated = disambiguateSimilarOptions(normalizedGroup.options, normalizedGroup.ratings);
      const normalizedKeptIndices = normalizedDisambiguated.map((opt) => normalizedGroup.options.indexOf(opt));
      normalizedGroup.options = normalizedDisambiguated;
      normalizedGroup.answers = normalizedKeptIndices.map((idx) => normalizedGroup.answers[idx]);
      normalizedGroup.ratings = normalizedKeptIndices.map((idx) => normalizedGroup.ratings[idx]);
      normalizedGroup.similarCount = normalizedGroup.options.length;
      normalizedGroup.similarSum = normalizedGroup.ratings.reduce((a, b) => a + b, 0);
      const ratingGroup = { options: [], answers: [], ratings: [], similarSum: 0, similarCount: 0 };
      const ratings = answerSimilarWithGap(answers, optionStrings);
      for (let j = 0; j < ratings.length; j++) {
        if (ratings[j].rating > 0.6) {
          ratingGroup.options.push(options[j]);
          ratingGroup.answers.push(ratings[j].target);
          ratingGroup.ratings.push(ratings[j].rating);
          ratingGroup.similarSum += ratings[j].rating;
          ratingGroup.similarCount += 1;
        }
      }
      const disambiguated = disambiguateSimilarOptions(ratingGroup.options, ratingGroup.ratings);
      const keptIndices = disambiguated.map((opt) => ratingGroup.options.indexOf(opt));
      ratingGroup.options = disambiguated;
      ratingGroup.answers = keptIndices.map((idx) => ratingGroup.answers[idx]);
      ratingGroup.ratings = keptIndices.map((idx) => ratingGroup.ratings[idx]);
      ratingGroup.similarCount = ratingGroup.options.length;
      ratingGroup.similarSum = ratingGroup.ratings.reduce((a, b) => a + b, 0);
      const best = [normalizedGroup, ratingGroup].sort(
        (a, b) => b.similarCount * 100 + b.similarSum - a.similarCount * 100 - a.similarSum
      )[0];
      groups[i] = best;
    }
    const sorted = groups.filter((g) => g.similarCount !== 0).sort((a, b) => {
      const bsc = b.similarCount * 100;
      const asc = a.similarCount * 100;
      return bsc + b.similarSum - asc - a.similarSum;
    });
    if (sorted[0]) {
      return { finish: true, options: sorted[0].options, groups: sorted };
    }
    const plainOptions = [];
    for (const answer of resultAnswers) {
      const ans = StringUtils.nowrap(answer, "").trim();
      if (resolvePlainAnswer(ans)) {
        for (const char of ans) {
          const index = char.charCodeAt(0) - 65;
          if (options[index] !== void 0) {
            plainOptions.push(options[index]);
          }
        }
      }
    }
    if (plainOptions.length) {
      return { finish: true, plainOptions: [...new Set(plainOptions)] };
    }
    return { finish: false };
  }
  function disambiguateSimilarOptions(options, ratings, threshold = 0.6) {
    if (options.length <= 1)
      return options;
    const normalized = options.map((o) => normalizeString(removeRedundant(o)));
    const eliminated = /* @__PURE__ */ new Set();
    for (let i = 0; i < options.length; i++) {
      if (eliminated.has(i))
        continue;
      for (let j = i + 1; j < options.length; j++) {
        if (eliminated.has(j))
          continue;
        const pairwise = src.findBestMatch(normalized[i], [normalized[j]]).bestMatch.rating;
        if (pairwise > threshold) {
          if (ratings[i] >= ratings[j]) {
            eliminated.add(j);
          } else {
            eliminated.add(i);
            break;
          }
        }
      }
    }
    return options.filter((_, i) => !eliminated.has(i));
  }
  const CORRECT_WORDS = ["是", "对", "正确", "确定", "√", "对的", "是的", "正确的", "true", "True", "T", "yes", "1"];
  const INCORRECT_WORDS = [
    "非",
    "否",
    "错",
    "错误",
    "×",
    "X",
    "错的",
    "不对",
    "不正确的",
    "不正确",
    "不是",
    "不是的",
    "false",
    "False",
    "F",
    "no",
    "0"
  ];
  function resolveJudgement(answerGroups, options) {
    for (const answers of answerGroups) {
      const answerShowCorrect = answers.find((a) => matches(a, CORRECT_WORDS));
      const answerShowIncorrect = answers.find((a) => matches(a, INCORRECT_WORDS));
      if (answerShowCorrect || answerShowIncorrect) {
        for (const option of options) {
          const textShowCorrect = matches(option, CORRECT_WORDS);
          const textShowIncorrect = matches(option, INCORRECT_WORDS);
          if (answerShowCorrect && textShowCorrect) {
            return { finish: true, option };
          }
          if (answerShowIncorrect && textShowIncorrect) {
            return { finish: true, option };
          }
        }
        return { finish: false };
      }
    }
    return { finish: false };
  }
  function matches(target, words) {
    return words.some(
      (word) => clearString(removeRedundant(word), "√", "×") === clearString(removeRedundant(target), "√", "×")
    );
  }
  function isJudgementOptions(options) {
    if (options.length !== 2)
      return false;
    const hasCorrect = options.some((opt) => matches(opt, CORRECT_WORDS));
    const hasIncorrect = options.some((opt) => matches(opt, INCORRECT_WORDS));
    return hasCorrect && hasIncorrect;
  }
  function resolveCompletion(answerGroups, blankCount, separators) {
    for (const answers of answerGroups) {
      let ans = answers.filter((a) => a);
      if (ans.length === 1) {
        ans = splitAnswer(ans[0], separators);
      }
      if (ans.length !== 0 && (ans.length === blankCount || blankCount === 1)) {
        if (ans.length === blankCount) {
          return { finish: true, answers: ans };
        } else if (blankCount === 1) {
          return { finish: true, answers: [ans.join(" ")] };
        }
      }
    }
    return { finish: false };
  }
  function createDefaultQuestionResolver(ctx, optionText) {
    const toText = (o, i) => optionText ? optionText(o, i) : o.innerText;
    return {
      async single(infos, options, handler) {
        const optionTexts = options.map((o, i) => toText(o, i));
        if (isJudgementOptions(optionTexts.map((o) => o.trim()))) {
          const answerGroups = infos.map((info) => info.results.map((res) => res.answer));
          const result2 = resolveJudgement(answerGroups, optionTexts);
          if (result2.finish && result2.option !== void 0) {
            const index = optionTexts.indexOf(result2.option);
            const opt = index !== -1 ? options[index] : options[0];
            await handler("judgement", result2.option, opt, ctx);
          }
          return result2;
        }
        const answers = infos.map((info) => info.results.map((res) => res.answer)).flat();
        const result = resolveSingle(answers, optionTexts, ctx.answerSeparators);
        if (result.finish && result.option !== void 0) {
          const index = optionTexts.indexOf(result.option);
          const opt = index !== -1 ? options[index] : options[0];
          await handler("single", result.option, opt, ctx);
        }
        return result;
      },
      async multiple(infos, options, handler) {
        var _a;
        const resultAnswers = infos.map((info) => info.results.map((res) => res.answer)).flat();
        const optionTexts = options.map((o, i) => toText(o, i));
        const result = resolveMultiple(resultAnswers, optionTexts, ctx.answerSeparators);
        const resolvedOptions = result.finish ? (_a = result.options) != null ? _a : result.plainOptions : void 0;
        if (result.finish && resolvedOptions) {
          for (const optText of resolvedOptions) {
            const index = optionTexts.indexOf(optText);
            const opt = index !== -1 ? options[index] : options[0];
            await handler("multiple", optText, opt, ctx);
          }
        }
        return result;
      },
      async judgement(infos, options, handler) {
        const answerGroups = infos.map((info) => info.results.map((res) => res.answer));
        const optionTexts = options.map((o, i) => toText(o, i));
        const result = resolveJudgement(answerGroups, optionTexts);
        if (result.finish && result.option !== void 0) {
          const index = optionTexts.indexOf(result.option);
          const opt = index !== -1 ? options[index] : options[0];
          await handler("judgement", result.option, opt, ctx);
        }
        return result;
      },
      async completion(infos, options, handler) {
        const answerGroups = infos.map((info) => info.results.map((res) => res.answer));
        const result = resolveCompletion(answerGroups, options.length, ctx.answerSeparators);
        if (result.finish && result.answers) {
          for (let i = 0; i < result.answers.length; i++) {
            await handler("completion", result.answers[i], options[i], ctx);
          }
        }
        return result;
      }
    };
  }
  const AnswerWrapperHandlerConfig = {
    timeout_seconds: 60
  };
  let __cxSessionId;
  function getOrCreateSessionId() {
    if (!__cxSessionId) {
      __cxSessionId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        return (c === "x" ? r : r & 3 | 8).toString(16);
      });
    }
    return __cxSessionId;
  }
  async function defaultAnswerWrapperHandler(answererWrappers, env) {
    const searchInfos = [];
    const temp = JSON.parse(JSON.stringify(answererWrappers));
    if (temp.length === 0) {
      throw new Error("题库配置不能为空，请配置后重新开始自动答题。");
    }
    if (env.title === void 0)
      env.title = "";
    if (env.options === void 0)
      env.options = "";
    if (env.type === void 0)
      env.type = "unknown";
    if (env.images === void 0)
      env.images = [];
    if (env.suggestion_title === void 0)
      env.suggestion_title = "";
    if (env.suggestion_options === void 0)
      env.suggestion_options = "";
    if (env.__session === void 0)
      env.__session = getOrCreateSessionId();
    await Promise.all(
      temp.map(async (wrapper) => {
        var _a;
        const {
          name = "未知题库",
          homepage = "#",
          method = "get",
          type = "fetch",
          contentType = "json",
          responseType = "json",
          headers = {},
          data: wrapperData = {},
          handler = "return (res)=> [JSON.stringify(res), undefined]"
        } = wrapper;
        if (method.toLocaleLowerCase() === "post") {
          if (!Object.keys(headers).some((k) => k.toLowerCase() === "content-type")) {
            headers["Content-Type"] = "application/json";
          }
        }
        try {
          let results = [];
          let requestData;
          let url;
          if (method.toLocaleLowerCase() === "get") {
            url = new URL(resolvePlaceHolder(wrapper.url, { encodeURI: true }));
            Object.keys(wrapperData).forEach((key) => {
              url.searchParams.set(key, resolvePlaceHolder(wrapperData[key]));
            });
            requestData = {};
          } else if (method.toLocaleLowerCase() === "post") {
            url = new URL(wrapper.url);
            const data = /* @__PURE__ */ Object.create({});
            Object.keys(wrapperData).forEach((key) => {
              if (typeof wrapperData[key] === "object" && Reflect.has(wrapperData[key], "handler")) {
                const handler2 = Function(Reflect.get(wrapperData[key], "handler"))();
                if (typeof handler2 !== "function") {
                  throw new Error("data 字段解析器必须返回一个函数");
                }
                const result = handler2(env);
                Reflect.set(data, key, result);
              } else {
                Reflect.set(data, key, resolvePlaceHolder(wrapperData[key]));
              }
            });
            requestData = data;
          } else {
            throw new Error("不支持的请求方式");
          }
          const responseData = await Promise.race([
            request(url.toString(), {
              method,
              responseType: responseType || contentType,
              data: requestData,
              type,
              headers: resolvePlaceHolder(JSON.parse(JSON.stringify(headers || {})))
            }),
            $.sleep(((_a = AnswerWrapperHandlerConfig.timeout_seconds) != null ? _a : 60) * 1e3)
          ]);
          if (responseData === void 0) {
            throw new Error("题库请求超时，可能是题库问题，或者请检查网络或者重试。");
          }
          const responseHandler = Function(handler)();
          if (typeof responseHandler !== "function") {
            throw new Error("handler 响应处理器必须返回一个函数");
          }
          const info = responseHandler(responseData);
          if (info && Array.isArray(info)) {
            if (info.every((item) => Array.isArray(item))) {
              results = results.concat(
                info.map((item) => ({
                  question: item[0],
                  answer: item[1],
                  extra_data: item[2] || {}
                }))
              );
            } else {
              results.push({
                question: info[0],
                answer: info[1],
                extra_data: info[2] || {}
              });
            }
          }
          searchInfos.push({
            url: wrapper.url,
            name,
            homepage,
            results,
            response: responseData,
            data: requestData
          });
        } catch (error) {
          console.error(error);
          searchInfos.push({
            url: wrapper.url,
            name,
            homepage,
            results: [],
            response: void 0,
            data: void 0,
            error: (error == null ? void 0 : error.message) || "题库连接失败"
          });
        }
      })
    );
    function resolvePlaceHolder(data, options) {
      if (typeof data === "string") {
        const matches2 = data.match(/\${(.*?)}/g) || [];
        matches2.forEach((placeHolder) => {
          const value = env[placeHolder.replace(/\${(.*)}/, "$1")];
          data = data.replace(placeHolder, (options == null ? void 0 : options.encodeURI) ? encodeURIComponent(value) : value);
        });
      } else if (typeof data === "object") {
        const keys = Object.keys(data);
        for (const key of keys) {
          data[key] = resolvePlaceHolder(data[key], options);
        }
      }
      return data;
    }
    return searchInfos;
  }
  class AnswerWrapperParser {
    static fromObject(json) {
      const aw = json;
      if (aw && Array.isArray(aw)) {
        if (aw.length) {
          for (let i = 0; i < aw.length; i++) {
            const item = aw[i];
            if (typeof item.name !== "string") {
              throw new Error(`第 ${i + 1} 个题库的 名字(name) 为空`);
            }
            if (typeof item.url !== "string") {
              throw new Error(`第 ${i + 1} 个题库的 接口地址(url) 为空`);
            }
            if (typeof item.handler !== "string") {
              throw new Error(`第 ${i + 1} 个题库的 解析器(handler) 为空`);
            }
            if (item.headers && typeof item.headers !== "object") {
              throw new Error(`第 ${i + 1} 个题库的 头部信息(header) 应为 对象 格式`);
            }
            if (item.data && typeof item.data !== "object") {
              throw new Error(`第 ${i + 1} 个题库的 提交数据(data) 应为 对象 格式`);
            }
            const contentTypes = ["json", "text"];
            if (item.contentType && contentTypes.every((i2) => i2 !== item.contentType)) {
              throw new Error(`第 ${i + 1} 个题库的 contentType 必须为以下选项中的一个  ${contentTypes.join(", ")}`);
            }
            const methods = ["post", "get"];
            if (item.method && methods.every((i2) => i2 !== item.method)) {
              throw new Error(`第 ${i + 1} 个题库的 method 必须为以下选项中的一个  ${methods.join(", ")}`);
            }
            const types = ["fetch", "GM_xmlhttpRequest"];
            if (item.type && types.every((i2) => i2 !== item.type)) {
              throw new Error(`第 ${i + 1} 个题库的 type 必须为以下选项中的一个  ${types.join(", ")}`);
            }
          }
          return aw;
        } else {
          throw new Error("题库为空！");
        }
      } else {
        throw new Error("题库配置格式错误！");
      }
    }
    static fromJSONString(json) {
      const raw = json.toString();
      try {
        return JSON.parse(raw);
      } catch {
        throw new Error(`格式错误，必须为：json字符串`);
      }
    }
    static fromBase64(base64) {
      return this.fromJSONString(Buffer.from(base64, "base64").toString("utf8"));
    }
    static from(value) {
      if (typeof value === "string") {
        if (/^\s*https?:\/\//.test(value)) {
          throw new Error("已不支持从链接加载题库配置，请直接粘贴题库配置内容，或使用「一键获取题库」功能。");
        }
        return this.fromJSONString(value);
      } else {
        return this.fromObject(value);
      }
    }
  }
  class OCSWorker extends lib.CommonEventEmitter {
    constructor(opts) {
      super();
      this.isRunning = false;
      this.isClose = false;
      this.isStop = false;
      this.totalQuestionCount = 0;
      this.opts = opts;
    }
    startRootObserver() {
      var _a, _b;
      const cfg = this.opts.rootObserver;
      if (!(cfg == null ? void 0 : cfg.enabled) || this.rootObserverTimer !== void 0) {
        return;
      }
      const interval = (_a = cfg.checkIntervalMs) != null ? _a : 1e3;
      const lostTimeout = (_b = cfg.lostTimeoutMs) != null ? _b : 1e3;
      this.rootObserverTimer = setInterval(() => {
        var _a2, _b2;
        if (this.isClose) {
          this.stopRootObserver();
          return;
        }
        const alive = typeof this.opts.root === "string" ? !!document.querySelector(this.opts.root) : this.opts.root.some((el) => el.isConnected);
        if (alive) {
          this.rootLostSince = void 0;
          return;
        }
        (_a2 = this.rootLostSince) != null ? _a2 : this.rootLostSince = Date.now();
        if (Date.now() - this.rootLostSince >= lostTimeout) {
          this.stopRootObserver();
          (_b2 = cfg.onRootLost) == null ? void 0 : _b2.call(cfg);
          if (!this.isClose) {
            lib.$message.warn({
              content: "⚠️ 题目元素已从页面消失（页面可能已跳转或刷新），答题程序已自动关闭。",
              duration: 0
            });
          }
          this.emit("close");
        }
      }, interval);
    }
    stopRootObserver() {
      if (this.rootObserverTimer !== void 0) {
        clearInterval(this.rootObserverTimer);
        this.rootObserverTimer = void 0;
      }
      this.rootLostSince = void 0;
    }
    async doWork(options) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      this.emit("start");
      this.isRunning = true;
      this.once("close", () => {
        this.isClose = true;
        this.stopRootObserver();
      });
      this.startRootObserver();
      this.on("stop", () => {
        this.isStop = true;
      });
      this.on("continuate", () => {
        this.isStop = false;
      });
      const questionRoots = typeof this.opts.root === "string" ? Array.from(document.querySelectorAll(this.opts.root)) : this.opts.root;
      this.totalQuestionCount += questionRoots.length;
      if (options == null ? void 0 : options.enable_debug) {
        console.debug("开始答题", this);
        console.debug("题目数量: ", questionRoots.length);
        console.debug("父节点列表: ", questionRoots);
      }
      const results = [];
      if (questionRoots.length === 0) {
        throw new Error("未找到任何题目，答题结束。");
      }
      for (const questionRoot of questionRoots) {
        const ctx = {
          searchInfos: [],
          root: questionRoot,
          elements: domSearchAll(this.opts.elements, questionRoot),
          type: void 0,
          answerSeparators: this.opts.answerSeparators
        };
        await ((_b = (_a = this.opts).onElementSearched) == null ? void 0 : _b.call(_a, ctx.elements, questionRoot));
        ctx.elements.title = (_c = ctx.elements.title) == null ? void 0 : _c.filter(Boolean);
        ctx.elements.options = (_d = ctx.elements.options) == null ? void 0 : _d.filter(Boolean);
        if (typeof this.opts.work === "object") {
          ctx.type = this.opts.work.type === void 0 ? defaultWorkTypeResolver(ctx) : typeof this.opts.work.type === "string" ? this.opts.work.type : this.opts.work.type(ctx);
        }
        results.push({
          requested: false,
          resolved: false,
          ctx
        });
        await ((_f = (_e = this.opts).onQuestionDetected) == null ? void 0 : _f.call(_e, results[results.length - 1], results));
      }
      if (options == null ? void 0 : options.enable_debug) {
        console.debug("上下文已初始化: ", results);
      }
      if (results.length > 0) {
        await ((_h = (_g = this.opts).onResultsInit) == null ? void 0 : _h.call(_g, results[0], 0, results));
      }
      const requestThread = async (index) => {
        var _a2, _b2, _c2, _d2, _e2;
        let error;
        const result = results[index];
        const ctx = result.ctx || {};
        if (this.isClose === true) {
          this.isRunning = false;
          return;
        }
        try {
          if (this.isStop) {
            await waitForContinuate(() => this.isStop);
          }
          result.searching = true;
          await ((_b2 = (_a2 = this.opts).onResultsUpdate) == null ? void 0 : _b2.call(_a2, result, index, results));
          ctx.searchInfos = [];
          if (options == null ? void 0 : options.enable_debug) {
            console.groupEnd();
            console.group(
              "开始搜题: ",
              (_c2 = ctx.elements.title) == null ? void 0 : _c2.map((t) => t == null ? void 0 : t.innerText).filter(Boolean).join(", ").slice(0, 20)
            );
            console.log("ctx", result.ctx);
          }
          ctx.searchInfos = await this.opts.answerer(ctx.elements, ctx) || [];
          ctx.searchInfos.forEach((info) => {
            info.results = info.results.map((ans) => {
              ans.answer = ans.answer ? ans.answer.trim() : "";
              return ans;
            });
          });
        } catch (err) {
          console.error("【ERROR】", err);
          error = String(err);
        }
        result.ctx = ctx;
        result.searching = false;
        result.requested = true;
        result.error = error;
        if (options == null ? void 0 : options.enable_debug) {
          console.log("搜题结果: ", ctx.searchInfos);
        }
        await ((_e2 = (_d2 = this.opts).onResultsUpdate) == null ? void 0 : _e2.call(_d2, results[index], index, results));
      };
      const waitForRequested = async (result) => {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if ((result == null ? void 0 : result.requested) === true) {
              clearInterval(interval);
              clearTimeout(timeout);
              resolve();
            }
          }, 200);
          const timeout = setTimeout(() => {
            clearInterval(interval);
            reject(new Error("答题超时！"));
          }, (AnswerWrapperHandlerConfig.timeout_seconds + 10) * 1e3);
        });
      };
      const resolverThread = async () => {
        var _a2, _b2, _c2, _d2;
        for (let index = 0; index < results.length; index++) {
          const result = results[index];
          let error;
          let res;
          if (this.isClose === true) {
            this.isRunning = false;
            return;
          }
          try {
            if (this.isStop) {
              await waitForContinuate(() => this.isStop);
            }
            await waitForRequested(result);
          } catch (err) {
          }
          try {
            if (result.ctx && result.ctx.searchInfos.length !== 0) {
              if (typeof this.opts.work === "object") {
                if (result.ctx.elements.options) {
                  if (result.ctx.type) {
                    const resolver = createDefaultQuestionResolver(
                      result.ctx,
                      this.opts.work.optionText
                    )[result.ctx.type];
                    const handler = this.opts.work.handler;
                    res = await resolver(result.ctx.searchInfos, result.ctx.elements.options, handler);
                  } else {
                    error = "题目类型解析失败, 请自行提供解析器, 或者忽略此题。";
                  }
                } else {
                  error = "elements.options 为空 ! 使用默认处理器, 必须提供题目选项的选择器。";
                }
              } else {
                const work = this.opts.work;
                res = await work(result.ctx);
              }
            } else {
              error = result.error || "搜索不到答案, 请重新运行, 或者忽略此题。";
            }
          } catch (err) {
            error = (err == null ? void 0 : err.message) || err;
          }
          result.error = error;
          result.result = res || { finish: false };
          result.resolved = true;
          if (options == null ? void 0 : options.enable_debug) {
            console.log(
              "答题完成: ",
              (_b2 = (_a2 = result.ctx) == null ? void 0 : _a2.elements.title) == null ? void 0 : _b2.map((t) => t == null ? void 0 : t.innerText).join(", ").slice(0, 20),
              result
            );
          }
          await ((_d2 = (_c2 = this.opts).onResultsUpdate) == null ? void 0 : _d2.call(_c2, result, index, results));
        }
      };
      const requestThreadHandler = async () => {
        const locks = [];
        const waitForLock = () => {
          return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
              if (locks.length > 0) {
                const lock = locks.shift();
                if (lock) {
                  resolve(lock);
                  clearInterval(interval);
                  clearTimeout(timeout);
                }
              }
            }, 100);
            const timeout = setTimeout(() => {
              clearInterval(interval);
              reject(new Error("获取线程锁超时！"));
            }, 3 * 60 * 1e3);
          });
        };
        const requestThreads = [];
        for (let index = 0; index < results.length; index++) {
          requestThreads.push(() => requestThread(index));
        }
        for (let index = 0; index < (this.opts.thread || 1); index++) {
          locks.push(index + 1);
        }
        let requestFinished = 0;
        const promises = [];
        for (let index = 0; index < (this.opts.thread || 1); index++) {
          promises.push(async () => {
            try {
              while (requestFinished < results.length && requestThreads.length > 0 && this.isClose === false) {
                const thread = requestThreads.shift();
                if (thread) {
                  const lock = await waitForLock();
                  await thread();
                  requestFinished++;
                  locks.push(lock);
                }
              }
            } catch (err) {
              console.error(err);
            }
          });
        }
        await Promise.all(promises.map((f) => f()));
      };
      await Promise.all([resolverThread(), requestThreadHandler()]);
      this.isRunning = false;
      return results;
    }
    uploadHandler(options) {
      var _a;
      const { results, type, callback } = options;
      if (type !== "nomove") {
        let finished = 0;
        for (const result of results) {
          if ((_a = result.result) == null ? void 0 : _a.finish) {
            finished++;
          }
        }
        const rate = results.length === 0 ? 0 : finished / results.length * 100;
        if (type === "force") {
          return callback(rate, true);
        } else {
          return callback(rate, type === "save" ? false : rate >= parseFloat(type.toString()));
        }
      }
    }
  }
  class CustomOCSWorker extends lib.CommonEventEmitter {
    constructor(opts) {
      super();
      this.isRunning = false;
      this.isClose = false;
      this.isStop = false;
      this.opts = opts;
    }
    async doWork(options) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      this.emit("start");
      this.isRunning = true;
      this.once("close", () => {
        this.isClose = true;
      });
      this.on("stop", () => {
        this.isStop = true;
      });
      this.on("continuate", () => {
        this.isStop = false;
      });
      const questions = await ((_b = (_a = this.opts).questions) == null ? void 0 : _b.call(_a));
      if (options == null ? void 0 : options.enable_debug) {
        console.debug("开始答题", this);
        console.debug("题目数量: ", this.opts.questions.length);
      }
      const results = [];
      for (let index = 0; index < questions.length; index++) {
        if (this.isClose === true) {
          this.isRunning = false;
          return;
        }
        if (this.isStop) {
          await waitForContinuate(() => this.isStop);
        }
        const question = questions[index];
        results[index] = {
          question: question.text,
          requested: false,
          resolved: false,
          searchInfos: [],
          type: question.type,
          finish: false,
          error: ""
        };
        try {
          const infos = await this.opts.answerer(question.text);
          results[index].searchInfos = infos.map((i) => ({
            name: i.name,
            homepage: i.homepage,
            results: i.results.map((r) => [r.question, r.answer, r.extra_data || {}]),
            error: i.error
          }));
          results[index].requested = true;
          (_d = (_c = this.opts).onResultsUpdate) == null ? void 0 : _d.call(_c, results[index], index, results);
          try {
            const resolved = await this.opts.resolver(infos);
            results[index].finish = resolved.finish;
            results[index].error = resolved.error;
            results[index].resolved = true;
          } catch (err) {
            results[index].finish = false;
            results[index].error = err instanceof Error ? err.message : String(err);
            results[index].resolved = true;
          }
          (_f = (_e = this.opts).onResultsUpdate) == null ? void 0 : _f.call(_e, results[index], index, results);
        } catch (err) {
          results[index].requested = true;
          results[index].resolved = false;
          results[index].finish = true;
          results[index].error = err instanceof Error ? err.message : String(err);
          (_h = (_g = this.opts).onResultsUpdate) == null ? void 0 : _h.call(_g, results[index], index, results);
        }
        await lib.$.sleep(this.opts.period);
      }
    }
  }
  async function waitForContinuate(isStopping) {
    if (isStopping()) {
      await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (isStopping() === false) {
            clearInterval(interval);
            resolve();
          }
        }, 200);
      });
    }
  }
  const RenderScript = lib.createRenderScript({
    name: "🖼️ 窗口设置"
  });
  function createRangeTooltip(input, defaultValue, transform) {
    input.addEventListener("change", () => {
      input.setAttribute("data-title", transform(input.value || input.getAttribute("value") || defaultValue));
    });
    input.setAttribute("data-title", transform(input.value || input.getAttribute("value") || defaultValue));
  }
  async function playMedia(playFunction) {
    const tryPlayMedia = () => {
      return new Promise((resolve, reject) => {
        try {
          const playRes = playFunction();
          if (playRes) {
            playRes.then(resolve).catch(reject);
          } else {
            resolve();
          }
        } catch (err) {
          reject(err);
        }
      });
    };
    try {
      await tryPlayMedia();
      return true;
    } catch (err) {
      console.error(err);
      if (String(err).includes(`failed because the user didn't interact with the document first`)) {
        lib.$modal.alert({
          content: "播放音视频失败，由于浏览器的用户隐私保护措施，如果要播放带有音量的视频，或者某些无法自动播放音视频的网站，您必须先点击一次页面上的任意位置脚本才能进行音视频的播放，后续无需重新点击。",
          onClose: async () => {
            await tryPlayMedia();
          }
        });
        return true;
      } else if (String(err).includes("The element has no supported sources")) {
        $console.error("当前视频无法播放。");
      } else {
        $console.error("播放视频时发生未知错误：" + String(err));
      }
      return false;
    }
  }
  function enableCopy(elements2) {
    function hackSelect(target) {
      if (target) {
        const _original_select = target.onselectstart;
        const _original_oncopy = target.oncopy;
        const _original_onpaste = target.onpaste;
        const _original_onkeydown = target.onkeydown;
        target.onselectstart = (e) => {
          _original_select == null ? void 0 : _original_select.apply(target, [e]);
          e.stopPropagation();
          e.returnValue = true;
          return true;
        };
        target.oncopy = (e) => {
          _original_oncopy == null ? void 0 : _original_oncopy.apply(target, [e]);
          e.stopPropagation();
          e.returnValue = true;
          return true;
        };
        target.onpaste = (e) => {
          _original_onpaste == null ? void 0 : _original_onpaste.apply(target, [e]);
          e.stopPropagation();
          e.returnValue = true;
          return true;
        };
        target.onkeydown = (e) => {
          _original_onkeydown == null ? void 0 : _original_onkeydown.apply(target, [e]);
          e.stopPropagation();
          e.returnValue = true;
          return true;
        };
      }
    }
    for (const el of elements2) {
      hackSelect(el);
    }
  }
  let popupWin;
  window.addEventListener("beforeunload", () => {
    popupWin == null ? void 0 : popupWin.close();
  });
  function createQuestionTitleExtra(question, ...left) {
    const btnAttrs = {
      className: "base-style-button-secondary",
      style: {
        padding: "0 4px",
        fontSize: "12px",
        height: "20px",
        lineHeight: "1",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }
    };
    const copyBtn = lib.$ui.button("复制题目", btnAttrs);
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(question);
      copyBtn.value = "已复制√";
      setTimeout(() => {
        copyBtn.value = "复制题目";
      }, 500);
    };
    const space = lib.$ui.space([...left, copyBtn], { x: 4 });
    space.style.marginTop = "6px";
    space.style.textAlign = "right";
    return lib.h("div", { style: { textAlign: "right" } }, [space]);
  }
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="vertical-align:middle;"><rect x="1.6" y="1.6" width="20.8" height="20.8" rx="5.6" fill="currentColor" opacity="0.14"/><path d="M6.6 12.6l3.3 3.3 7.5-7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const loadingSpinSvg = `<svg class="aw-spin" width="14" height="14" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="28" stroke-dashoffset="10" stroke-linecap="round"/></svg>`;
  function createAccordionCard(options) {
    var _a;
    const card = lib.h("div", {
      className: "accordion-card" + (options.className ? " " + options.className : "") + (options.expanded ? " expanded" : "")
    });
    const header2 = lib.h("div", { className: "accordion-card-header" }, [
      ...options.header,
      lib.h("span", { className: "accordion-card-spacer" }),
      ...(_a = options.headerTrailing) != null ? _a : [],
      lib.h("span", { className: "accordion-card-chevron", innerHTML: CHEVRON_SVG })
    ]);
    header2.onclick = () => card.classList.toggle("expanded");
    card.append(header2, lib.h("div", { className: "accordion-card-body" }, options.body));
    return card;
  }
  const CHEVRON_SVG = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  function createSteps(items) {
    const children = [];
    items.forEach((text, i) => {
      children.push(lib.h("span", { className: "aw-step" }, [lib.h("span", { className: "aw-step-num" }, String(i + 1)), text]));
      if (i < items.length - 1) {
        children.push(lib.h("span", { className: "aw-step-arrow" }, "→"));
      }
    });
    return lib.h("div", { className: "aw-steps" }, children);
  }
  const transformImgLinkOfQuestion = (question) => {
    const dom2 = new DOMParser().parseFromString(question, "text/html");
    for (const img of Array.from(dom2.querySelectorAll("img"))) {
      img.replaceWith(img.src);
    }
    return dom2.documentElement.innerHTML.replace(
      /https?:\/\/[^"'<\s一-鿿]+?\.(?:png|jpe?g|gif|bmp|webp|svg)(?:\?[^\s"'<>一-鿿]*)?(?:#[^\s"'<>一-鿿]*)?/g,
      (img) => `<img src="${img}" />`
    );
  };
  function copyText(text) {
    const t = text == null ? "" : String(text);
    try {
      if (typeof GM_setClipboard === "function") {
        GM_setClipboard(t, { type: "text", mimetype: "text/plain" });
        return true;
      }
    } catch {
    }
    try {
      navigator.clipboard.writeText(t);
      return true;
    } catch {
      return false;
    }
  }
  const ANSWER_BTN_ATTRS = {
    className: "base-style-button-secondary",
    style: {
      padding: "0 4px",
      fontSize: "12px",
      height: "20px",
      lineHeight: "1",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  };
  const normalizeQuestion = (question) => question.replace(/[^\p{L}\p{N}]/gu, "");
  class SearchInfosElement extends HTMLElement {
    constructor() {
      super(...arguments);
      this.infos = [];
      this.question = "";
    }
    connectedCallback() {
      const question = transformImgLinkOfQuestion(this.question || "无");
      const type_text = {
        single: "单选题",
        multiple: "多选题",
        judgement: "判断题",
        completion: "填空题"
      };
      const type_label = this.kindLabel || (this.type ? Reflect.get(type_text, this.type) : "");
      this.append(
        lib.h(
          "div",
          [
            lib.h("div", { className: "title-content" }, [
              ...question.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => lib.h("div", { innerHTML: l }))
            ]),
            createQuestionTitleExtra(
              this.question,
              ...type_label ? [lib.h("span", { className: "search-result-question-type" }, type_label)] : []
            )
          ],
          (div) => {
            div.className = "search-info-title";
          }
        )
      );
      this.append(
        ...this.infos.map((info) => {
          const homeLink = lib.$ui.tooltip(
            lib.h("a", { href: info.homepage, innerText: info.name, target: "_blank", title: "点击前往题库官网" })
          );
          homeLink.onclick = (e) => e.stopPropagation();
          return createAccordionCard({
            className: "search-info-details",
            expanded: true,
            header: [
              homeLink,
              ...info.error ? [] : [lib.h("span", { className: "text-secondary" }, ` 共 ${info.results.length} 个结果`)]
            ],
            body: (info.error ? [lib.h("span", { className: "error" }, [info.error || "网络错误或者未知错误"])] : []).concat([
              ...info.results.map((ans) => {
                const title = transformImgLinkOfQuestion(ans[0] || this.question || "无");
                const answer = transformImgLinkOfQuestion(ans[1] || "无");
                const isSameQuestion = normalizeQuestion(ans[0] || "") === normalizeQuestion(this.question || "");
                const extra_data = JSON.parse(JSON.stringify(ans[2] || {}));
                if (extra_data.cache) {
                  extra_data.tags = extra_data.tags || [];
                  extra_data.tags.push({
                    text: "缓存",
                    title: "此答案来自本地缓存（同一道题不重复请求模型）。\n- 清空缓存：通用 · 全局设置 · 答题缓存 · 管理缓存\n- 关闭缓存：通用 · 全局设置 · 答题缓存",
                    color: "gray"
                  });
                }
                const rawAnswer = ans[1] || "";
                const isLongAnswer = rawAnswer.length > 60 || rawAnswer.includes("\n");
                const copyAnswerBtn = lib.$ui.button("复制答案", ANSWER_BTN_ATTRS);
                copyAnswerBtn.onclick = () => {
                  const ok = copyText(rawAnswer);
                  copyAnswerBtn.value = ok ? "已复制√" : "复制失败";
                  setTimeout(() => copyAnswerBtn.value = "复制答案", 1e3);
                };
                return lib.h("div", { className: "search-result" }, [
                  ...isSameQuestion ? [] : [lib.h("div", { className: "question" }, [lib.h("span", { innerHTML: title })])],
                  lib.h("div", { className: "answer" }, [
                    lib.h("span", "答案："),
                    ...this.randomFilled ? [
                      lib.$ui.tooltip(
                        lib.h("span", {
                          className: "search-result-answer-tag red",
                          innerText: "⚠ 随机填入",
                          title: "模型未给出可用答案，此答案由脚本随机选择，很可能错误",
                          dataset: { title: "模型未给出可用答案，此答案由脚本随机选择，很可能错误" }
                        })
                      )
                    ] : [],
                    ...this.needsManual ? [
                      lib.$ui.tooltip(
                        lib.h("span", {
                          className: "search-result-answer-tag orange",
                          innerText: "需手动作答",
                          title: "该题未自动填入（可能是富文本编辑器或需要上传附件），请复制答案后手动作答",
                          dataset: { title: "该题未自动填入（可能是富文本编辑器或需要上传附件），请复制答案后手动作答" }
                        })
                      )
                    ] : [],
                    ...extra_data.tags ? extra_data.tags.map(
                      (tag) => lib.$ui.tooltip(
                        lib.h("span", {
                          className: "search-result-answer-tag " + tag.color,
                          innerHTML: tag.text,
                          title: tag.title,
                          dataset: { title: tag.title }
                        })
                      )
                    ) : [],
                    ...isLongAnswer ? [
                      lib.h(
                        "div",
                        { className: "answer-full", style: { width: "100%" } },
                        [lib.h("code", { innerHTML: answer })]
                      )
                    ] : splitAnswer(answer).map((a) => lib.h("code", { innerHTML: a })),
                    copyAnswerBtn
                  ])
                ]);
              })
            ])
          });
        })
      );
      $.onresize(this, (sr) => {
        sr.style.maxHeight = window.innerHeight / 2 + "px";
      });
    }
  }
  const state$2 = {
    console: {
      listenerIds: {
        logs: 0
      }
    }
  };
  function onDevtoolsOpen(callback) {
    let triggered = false;
    const trigger = () => {
      if (triggered)
        return;
      triggered = true;
      window.removeEventListener("keydown", onKeydown, true);
      clearInterval(timer);
      callback();
    };
    const onKeydown = (e) => {
      if (e.key === "F12" || (e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) {
        trigger();
      }
    };
    window.addEventListener("keydown", onKeydown, true);
    const probe = lib.h("div");
    Object.defineProperty(probe, "id", {
      get: () => {
        trigger();
        return "devtools-probe";
      }
    });
    const timer = setInterval(() => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      if (widthDiff > 160 || heightDiff > 160) {
        trigger();
      }
    }, 1e3);
  }
  const BackgroundProject = lib.Project.create({
    name: "其他",
    domains: [],
    scripts: {
      elementRegister: new lib.Script({
        name: "🔗 元素注册",
        hideInPanel: true,
        matches: [["所有页面", /.*/]],
        onstart() {
          lib.$.loadCustomElements([SearchInfosElement]);
        }
      }),
      console: new lib.Script({
        name: "📄 日志输出",
        matches: [["所有", /.*/]],
        namespace: "render.console",
        configs: {
          logs: {
            defaultValue: []
          }
        },
        onrender({ panel }) {
          const getTypeDesc = (type) => type === "info" ? "信息" : type === "error" ? "错误" : type === "warn" ? "警告" : type === "debug" ? "调试" : "日志";
          const createLog = (log) => {
            const date = new Date(log.time);
            const item = lib.h(
              "div",
              {
                title: "双击复制日志信息",
                className: "item"
              },
              [
                lib.h(
                  "span",
                  { className: "time" },
                  `${date.getHours().toFixed(0).padStart(2, "0")}:${date.getMinutes().toFixed(0).padStart(2, "0")} `
                ),
                lib.h("span", { className: log.type }, `[${getTypeDesc(log.type)}]`),
                lib.h("span", ":" + log.content)
              ]
            );
            item.addEventListener("dblclick", () => {
              navigator.clipboard.writeText(
                Object.keys(log).map((k) => `${k}: ${log[k]}`).join("\n")
              );
            });
            return item;
          };
          const showLogs = () => {
            const div2 = lib.h("div", { className: "card console" });
            const logs2 = this.cfg.logs.map((log) => createLog(log));
            if (logs2.length) {
              div2.replaceChildren(...logs2);
            } else {
              div2.replaceChildren(
                lib.h("div", "暂无任何日志", (div3) => {
                  div3.style.textAlign = "center";
                })
              );
            }
            return { div: div2, logs: logs2 };
          };
          const isScrollBottom = (div2) => {
            const { scrollHeight, scrollTop, clientHeight } = div2;
            return scrollTop + clientHeight + 50 > scrollHeight;
          };
          const { div, logs } = showLogs();
          this.offConfigChange(state$2.console.listenerIds.logs);
          state$2.console.listenerIds.logs = this.onConfigChange("logs", (logs2) => {
            const log = createLog(logs2[logs2.length - 1]);
            div.append(log);
            setTimeout(() => {
              if (isScrollBottom(div)) {
                log.scrollIntoView();
              }
            }, 10);
          });
          const show = () => {
            panel.body.replaceChildren(div);
            setTimeout(() => {
              var _a;
              (_a = logs[logs.length - 1]) == null ? void 0 : _a.scrollIntoView();
            }, 10);
          };
          show();
        }
      }),
      render: RenderScript,
      data: new lib.Script({
        name: "拓展数据",
        hideInPanel: true,
        matches: [["", /.*/]],
        namespace: "background.data",
        configs: {
          notes: {
            defaultValue: "这里是一些其他的应用或者拓展功能。"
          },
          localQuestionCaches: {
            defaultValue: []
          }
        },
        methods() {
          return {
            addQuestionCache: async (...questionCacheItems) => {
              const questionCaches = this.cfg.localQuestionCaches;
              for (const item of questionCacheItems) {
                if (questionCaches.find((c) => c.title === item.title && c.answer === item.answer) === void 0) {
                  questionCaches.unshift(item);
                }
              }
              questionCaches.splice(200);
              this.cfg.localQuestionCaches = questionCaches;
            },
            addQuestionCacheFromWorkResult(swr) {
              BackgroundProject.scripts.data.methods.addQuestionCache(
                ...swr.map(
                  (r) => r.searchInfos.map(
                    (i) => i.results.filter((res) => res[1]).map((res) => ({
                      title: r.question,
                      answer: res[1],
                      from: i.name.replace(/【题库缓存】/g, ""),
                      homepage: i.homepage || ""
                    })).flat()
                  ).flat()
                ).flat()
              );
            },
            searchAnswerInCaches: async (title, whenSearchEmpty) => {
              if (CommonProject.scripts.settings.cfg.enableQuestionCaches === false) {
                return await whenSearchEmpty();
              }
              let results = [];
              const caches = this.cfg.localQuestionCaches;
              for (const cache of caches) {
                if (cache.title.trim() === title.trim()) {
                  results.push({
                    name: cache.from,
                    homepage: cache.homepage,
                    results: [{ answer: cache.answer, question: cache.title, extra_data: { ai: cache.ai, cache: true } }]
                  });
                }
              }
              if (results.length === 0) {
                results = await whenSearchEmpty();
              }
              return results;
            },
            showQuestionCaches: () => {
              const questionCaches = this.cfg.localQuestionCaches;
              const list = questionCaches.map(
                (c) => lib.h(
                  "div",
                  {
                    className: "question-cache",
                    style: {
                      margin: "8px",
                      border: "1px solid lightgray",
                      borderRadius: "4px",
                      padding: "8px"
                    }
                  },
                  [
                    lib.h("div", { className: "title" }, [
                      lib.$ui.tooltip(
                        lib.h(
                          "span",
                          {
                            title: `来自：${c.from || "未知题库"}
主页：${c.homepage || "未知主页"}`,
                            style: { fontWeight: "bold" }
                          },
                          c.title
                        )
                      )
                    ]),
                    lib.h("div", { className: "answer", style: { marginTop: "6px" } }, c.answer)
                  ]
                )
              );
              const countEl = lib.h("span", ["当前缓存数量：" + questionCaches.length]);
              lib.$modal.simple({
                width: 800,
                content: lib.h("div", [
                  lib.h("div", { className: "notes card" }, [
                    lib.$ui.notes([
                      "题库缓存是将题库的题目和答案保存在内存，在重复使用时可以直接从内存获取，不需要再次请求题库。",
                      "以下是当前存储的题库，默认存储200题，当前页面关闭后会自动清除。"
                    ])
                  ]),
                  lib.h("div", { className: "card" }, [
                    lib.$ui.space(
                      [
                        countEl,
                        lib.$ui.button("清空题库缓存", {}, (btn) => {
                          btn.onclick = () => {
                            this.cfg.localQuestionCaches = [];
                            countEl.innerText = "当前缓存数量：0";
                            list.forEach((el) => el.remove());
                          };
                        })
                      ],
                      { separator: "|" }
                    )
                  ]),
                  lib.h(
                    "div",
                    questionCaches.length === 0 ? [lib.h("div", { style: { textAlign: "center" } }, "暂无题库缓存")] : list
                  )
                ])
              });
            }
          };
        }
      }),
      dev: new lib.Script({
        name: "🛠️ 开发者调试",
        namespace: "background.dev",
        matches: [["所有页面", /./]],
        onstart() {
          if (self !== top)
            return;
          const devScripts = [this, BackgroundProject.scripts.requestList];
          for (const script2 of devScripts) {
            script2.hidePanel();
          }
          onDevtoolsOpen(() => {
            for (const script2 of devScripts) {
              script2.showPanel();
            }
            lib.$message.info({ content: "检测到开发者工具已打开，已显示 开发者调试/请求记录 面板。", duration: 5 });
          });
        },
        configs: {
          notes: {
            defaultValue: "开发人员调试用。<br>注入OCS_CONTEXT全局变量。用户可忽略此页面。"
          },
          enable_answerer_debug: {
            defaultValue: true,
            label: "开启答题日志输出",
            attrs: { type: "checkbox" }
          }
        },
        onrender({ panel }) {
          const injectBtn = lib.h("button", { className: "base-style-button" }, "点击注入全局变量");
          injectBtn.addEventListener("click", () => {
            lib.$gm.unsafeWindow.OCS_CONTEXT = self;
          });
          const showTabDataBtn = lib.h("button", { className: "base-style-button" }, "显示Tab存储");
          lib.$gm.getTab((tab) => {
            const els = [];
            for (const key in tab) {
              if (Object.prototype.hasOwnProperty.call(tab, key)) {
                els.push(lib.h("div", [lib.h("b", key + " : "), lib.h("code", JSON.stringify(tab[key]))]));
              }
            }
            showTabDataBtn.addEventListener("click", () => {
              lib.$modal.simple({
                content: lib.h("div", els),
                width: window.document.documentElement.clientWidth / 2
              });
            });
          });
          panel.body.replaceChildren(lib.h("div", { className: "card" }, [lib.h("hr"), injectBtn, showTabDataBtn]));
        }
      }),
      errorHandle: new lib.Script({
        name: "全局错误捕获",
        matches: [["", /.*/]],
        hideInPanel: true,
        onstart() {
          const projects = definedProjects();
          for (const project2 of projects) {
            for (const key in project2.scripts) {
              if (Object.prototype.hasOwnProperty.call(project2.scripts, key)) {
                const script2 = project2.scripts[key];
                script2.on("scripterror", (err) => {
                  const msg = `[${project2.name} - ${script2.name}] : ${err}`;
                  console.error(msg);
                  $console.error(msg);
                });
              }
            }
          }
        }
      }),
      requestList: new lib.Script({
        name: "📄 请求记录",
        matches: [["", /.*/]],
        priority: 99,
        configs: {
          notes: {
            defaultValue: lib.$ui.notes([
              "开发人员请求调试记录页面，小白勿入，最多只记录最近的100个请求数据",
              "可打开F12控制台查看请求日志，或者下方的请求列表"
            ]).outerHTML
          },
          enable: {
            label: "开启请求记录",
            attrs: { type: "checkbox" },
            defaultValue: false
          },
          methodFilter: {
            label: "方法过滤",
            tag: "select",
            attrs: { placeholder: "选择选项" },
            options: [["none", "无"], ["GET"], ["POST"], ["OPTIONS"], ["HEAD"]],
            defaultValue: "none"
          },
          typeFilter: {
            label: "类型过滤",
            tag: "select",
            attrs: { placeholder: "选择选项" },
            options: [
              ["none", "无"],
              ["gmxhr", "油猴API请求（gmxhr）"],
              ["fetch", "普通请求（fetch）"]
            ],
            defaultValue: "none"
          },
          searchValue: {
            label: "内容搜索",
            attrs: { placeholder: "搜索 URL/请求体/响应" },
            defaultValue: ""
          },
          list: {
            defaultValue: []
          }
        },
        methods() {
          const render2 = (list) => {
            var _a, _b;
            (_a = this.panel) == null ? void 0 : _a.body.replaceChildren();
            (_b = this.panel) == null ? void 0 : _b.body.append(
              lib.h("div", { className: "card" }, [
                lib.h("div", { style: { padding: "8px 0px", textAlign: "end" } }, [
                  lib.h(
                    "button",
                    {
                      className: "base-style-button-secondary",
                      style: { marginRight: "12px" },
                      innerText: "🗑️清空记录"
                    },
                    (btn) => {
                      btn.onclick = () => {
                        this.cfg.list = [];
                        render2(this.cfg.list);
                      };
                    }
                  ),
                  lib.h("button", { className: "base-style-button", innerText: "🔍执行搜索" }, (btn) => {
                    btn.onclick = () => {
                      if (this.cfg.methodFilter === "none" && this.cfg.typeFilter === "none" && this.cfg.searchValue === "") {
                        render2(this.cfg.list);
                      } else {
                        const list2 = this.cfg.list.filter((item) => {
                          if (this.cfg.methodFilter !== "none" && item.method.toLowerCase() !== this.cfg.methodFilter.toLowerCase()) {
                            return false;
                          }
                          return true;
                        }).filter((item) => {
                          if (this.cfg.typeFilter !== "none" && item.type !== this.cfg.typeFilter) {
                            return false;
                          }
                          return true;
                        }).filter((item) => {
                          var _a2, _b2;
                          if (this.cfg.searchValue && item.url.includes(this.cfg.searchValue) || ((_a2 = item.data) == null ? void 0 : _a2.includes(this.cfg.searchValue)) || ((_b2 = item.response) == null ? void 0 : _b2.includes(this.cfg.searchValue))) {
                            return true;
                          }
                          return false;
                        });
                        render2(list2);
                      }
                    };
                  })
                ]),
                lib.h(
                  "div",
                  { style: { backgroundColor: "#292929", overflow: "auto", maxHeight: window.innerHeight / 2 + "px" } },
                  [
                    ...list.length === 0 ? [lib.h("div", { style: { color: "white", textAlign: "center" } }, "暂无数据")] : [],
                    ...list.map(
                      (item) => lib.h(
                        "div",
                        {
                          title: Object.entries(item).map(
                            ([key, val]) => key === "time" ? `${key} : ${new Date(val).toLocaleString().replace(/\//g, "-")}` : `${key} : ${val}`
                          ).join("\n"),
                          style: {
                            maxWidth: "800px",
                            padding: "4px 0px",
                            margin: "4px 0px",
                            textWrap: "nowrap"
                          }
                        },
                        [
                          lib.h("div", [
                            lib.h("span", { style: { marginRight: "8px" } }, new Date(item.time).toLocaleTimeString()),
                            lib.h(
                              "span",
                              {
                                style: {
                                  backgroundColor: "#2196f3a3",
                                  color: "#ececec",
                                  marginRight: "8px",
                                  padding: "0px 2px"
                                }
                              },
                              item.method
                            ),
                            lib.h(
                              "span",
                              { style: { color: item.response ? "#4eb74e" : "#eb6262", marginRight: "8px" } },
                              "●"
                            ),
                            lib.h(
                              "div",
                              { style: { display: "inline-block", color: "#ececec" } },
                              item.url ? item.url.length > 100 ? item.url.slice(0, 100) + "..." : item.url : "-"
                            )
                          ]),
                          lib.h(
                            "div",
                            { style: { overflow: "hidden", fontSize: "12px", color: "#8f8f8f" } },
                            item.data ? "data: " + item.data : ""
                          ),
                          lib.h(
                            "div",
                            { style: { overflow: "hidden", fontSize: "12px", color: "#8f8f8f" } },
                            item.response ? "resp: " + item.response : item.error ? "err : " + item.error : ""
                          )
                        ]
                      )
                    )
                  ]
                )
              ])
            );
          };
          return {
            render: render2
          };
        },
        onrender() {
          this.methods.render(this.cfg.list);
        },
        onstart() {
          if (lib.$gm.isInGMContext() === false) {
            return;
          }
          const gmRequest = GM_xmlhttpRequest;
          const originalFetch = fetch;
          const getId = () => Math.random().toString(16).slice(2);
          const addRecord = (item) => {
            this.cfg.list = [item, ...this.cfg.list];
            if (this.cfg.list.length > 100) {
              this.cfg.list = this.cfg.list.slice(0, 100);
            }
          };
          const setItem = (id, response, error) => {
            const list = JSON.parse(JSON.stringify(this.cfg.list));
            const index = list.findIndex((item) => item.id === id);
            if (index !== -1) {
              list[index].response = response;
              list[index].error = error;
            }
            this.cfg.list = list;
          };
          GM_xmlhttpRequest = (details) => {
            if (this.cfg.enable) {
              const id = getId();
              const data = {
                id,
                url: details.url,
                method: details.method || "unknown",
                type: "gmxhr",
                data: details.data,
                headers: details.headers,
                response: "",
                error: "",
                time: Date.now()
              };
              addRecord(data);
              const onload = details.onload;
              const onerror = details.onerror;
              details.onload = function(response) {
                setItem(id, response.responseText, "");
                data.response = details.responseType === "json" ? response.response : response.responseText;
                console.log("%c [请求成功]", "color: green; font-weight: bold", data.url, data);
                onload == null ? void 0 : onload.apply(this, [response]);
              };
              details.onerror = function(response) {
                setItem(id, "", response.error);
                data.error = response.error;
                console.log("%c [请求失败]", "color: red; font-weight: bold", data.url, data);
                onerror == null ? void 0 : onerror.apply(this, [response]);
              };
            }
            return gmRequest.apply(this, [details]);
          };
          fetch = (input, init) => {
            if (this.cfg.enable) {
              const id = getId();
              const data = {
                id,
                url: typeof input === "string" ? input : input instanceof URL ? input.href : input.url,
                method: (init == null ? void 0 : init.method) || "unknown",
                type: "fetch",
                data: init == null ? void 0 : init.body,
                headers: init == null ? void 0 : init.headers,
                response: "",
                error: "",
                time: Date.now()
              };
              addRecord(data);
              const res = originalFetch.apply(this, [input, init]);
              res.then((result) => {
                return result.clone().text();
              }).then((result) => {
                setItem(id, result, "");
                data.response = result;
                console.log("%c [请求成功]", "color: green; font-weight: bold", data.url, data);
              });
              res.catch((err) => {
                setItem(id, "", String(err));
                data.error = String(err);
                console.log("%c [请求失败]", "color: red; font-weight: bold", data.url, data);
              });
              return res;
            } else {
              return originalFetch.apply(this, [input, init]);
            }
          };
        }
      }),
      environmentDetect: new lib.Script({
        name: "🤖 环境检测",
        matches: [["所有页面", /.*/]],
        hideInPanel: true,
        oncomplete() {
          if (self !== top)
            return;
          const matches2 = CXProject.scripts.studyDispatcher.matches.map(
            (m) => Array.isArray(m) ? m[1] : m
          );
          const url = window.location.href;
          const match = matches2.some((regex) => {
            return typeof regex === "string" ? url.includes(regex) : regex.test(url);
          });
          if (!match) {
            return;
          }
          let messageElement;
          visibleDetect();
          function visibleDetect() {
            setTimeout(() => {
              if (!(messageElement == null ? void 0 : messageElement.isConnected))
                messageElement = void 0;
              if (document.visibilityState === "hidden" && !messageElement) {
                messageElement = lib.$message.warn({
                  content: "⚠️检测到浏览器最小化/切屏，脚本可能无法正常运行，请保持网课页面在前台！（如果您正在全屏游戏中可以忽略此警告）",
                  duration: 0
                });
              }
              visibleDetect();
            }, 1e3);
          }
        }
      }),
      menus: new lib.Script({
        name: "📁 菜单管理",
        hideInPanel: true,
        matches: [["所有页面", /.*/]],
        async oncomplete() {
          await lib.$menu("🔎", { scriptPanelLink: CommonProject.scripts.workResults });
          await lib.$menu("⚙️", { scriptPanelLink: CommonProject.scripts.settings });
          await lib.$menu("📄", { scriptPanelLink: BackgroundProject.scripts.console });
          const currentStudyScript = [
            [CXProject.scripts.studyDispatcher, CXProject.scripts.study],
            CXProject.scripts.work,
            CXProject.scripts.autoRead
          ].map((m) => {
            const url = window.location.href;
            const data = {
              matches: Array.isArray(m) ? m[0].matches : m.matches,
              target: Array.isArray(m) ? m[1] : m
            };
            if (data.matches.some((regexp) => {
              const r = Array.isArray(regexp) ? regexp[1] : regexp;
              return typeof r === "string" ? url.includes(r) : r.test(url);
            })) {
              return data.target;
            }
            return void 0;
          }).find((m) => m !== void 0);
          if (currentStudyScript) {
            await lib.$menu("🖥️", { scriptPanelLink: currentStudyScript });
            BackgroundProject.scripts.render.methods.pin(currentStudyScript);
          }
        }
      })
    }
  });
  const $console = new Proxy({}, {
    get(target, key) {
      return (...msg) => {
        var _a;
        let logs = BackgroundProject.scripts.console.cfg.logs;
        if (logs.length > 50) {
          logs = logs.slice(-50);
        }
        const stack_str = Error().stack || "";
        const stacks = (_a = stack_str.replace("Error", "").match(/at (.*) \(.+:\/\/.+:(.+):(.+)\)/g)) == null ? void 0 : _a.map((s) => {
          const match = s.match(/at (.*) \(.+:\/\/.+:(.+):(.+)\)/) || [];
          return [match[1], match[2], match[3]];
        });
        logs = logs.concat({
          type: key.toString(),
          content: msg.join(" "),
          time: Date.now(),
          stack: JSON.stringify([stack_str.split("\n")[0], ...stacks || []])
        });
        BackgroundProject.scripts.console.cfg.logs = logs;
      };
    }
  });
  ({
    label: "视频倍速",
    tag: "select",
    options: [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.5, 4, 6, 8, 16].map((rate) => [rate.toString(), rate + " x"]),
    defaultValue: "1"
  });
  const volume = {
    label: "音量调节",
    attrs: { type: "range", step: "0.05", min: "0", max: "1" },
    defaultValue: 0,
    onload() {
      createRangeTooltip(this, "0", (val) => `${parseFloat(val) * 100}%`);
    }
  };
  const workNotes = {
    defaultValue: lib.$ui.notes([
      "自动答题前请在 “通用-全局设置” 中设置题库配置。",
      "本项仅作为兜底，正常答题无需调整。",
      "⚠️禁止同时开多个作业/考试页面。"
    ]).outerHTML
  };
  const dropdownStyle = {
    labelClassName: "checkbox-label",
    providerClassName: "checkbox-input",
    enableForAttribute: true,
    onload(el) {
      const checked = this.checked;
      el.classList.toggle("checked", checked);
      this.addEventListener("change", () => {
        el.classList.toggle("checked", this.checked);
      });
    }
  };
  const IFRAME_CONTROL_EVENT = "ocs.iframe-work-control";
  let controlBar;
  let pauseBtn;
  let reloadBtn;
  function buildControlBar() {
    pauseBtn = lib.$ui.button("⏸暂停", { style: { padding: "0px 8px", fontSize: "12px", lineHeight: "20px" } });
    reloadBtn = lib.$ui.button("🔃重新答题", { style: { padding: "0px 8px", fontSize: "12px", lineHeight: "20px" } });
    pauseBtn.onclick = () => {
      lib.cors.emit(IFRAME_CONTROL_EVENT, [(pauseBtn == null ? void 0 : pauseBtn.dataset.paused) === "true" ? "continuate" : "stop"]);
    };
    reloadBtn.onclick = () => {
      lib.cors.emit(IFRAME_CONTROL_EVENT, ["reload"]);
    };
    const icon = lib.h("span", { className: "ocs-iframe-bar-tip" }, [
      lib.h("span", {
        innerHTML: logoSvg,
        style: { display: "inline-flex", alignItems: "center" }
      }),
      lib.h("div", { className: "tip-content" }, [
        lib.h("div", { style: { fontWeight: "bold", marginBottom: "4px" } }, "超星学习通 答题操作面板"),
        lib.h("div", "当前页面由 CXStudy 超星助手自动答题中，可进行以下操作："),
        lib.h("div", "⏸暂停/▶️继续：暂停或恢复自动答题"),
        lib.h("div", "🔃重新答题：刷新页面，重新开始自动答题")
      ])
    ]);
    return lib.h(
      "div",
      {
        style: {
          position: "fixed",
          top: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "999999",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "4px 10px",
          background: "#fff",
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)"
        }
      },
      [
        lib.h("style", {
          textContent: [
            ".ocs-iframe-bar-tip{position:relative;display:inline-flex;align-items:center;flex-shrink:0;cursor:help;}",
            ".ocs-iframe-bar-tip .tip-content{display:none;position:absolute;top:calc(100% + 8px);left:0;width:230px;padding:8px 10px;background:#303133;color:#fff;font-size:12px;line-height:1.7;border-radius:6px;box-shadow:0 2px 10px rgba(0,0,0,.2);z-index:1;}",
            ".ocs-iframe-bar-tip:hover .tip-content{display:block;}"
          ].join("\n")
        }),
        icon,
        pauseBtn,
        reloadBtn
      ]
    );
  }
  const IframeControlBar = {
    render: lib.cors.defineTopFunction((barState) => {
      const root2 = lib.$elements.root;
      if (!root2) {
        return;
      }
      if (!(controlBar == null ? void 0 : controlBar.isConnected)) {
        controlBar = buildControlBar();
        root2.append(controlBar);
      }
      if (pauseBtn) {
        pauseBtn.dataset.paused = String(barState.paused);
        pauseBtn.value = barState.paused ? "▶️继续" : "⏸️暂停";
        pauseBtn.disabled = barState.done;
      }
    }),
    remove: lib.cors.defineTopFunction(() => {
      controlBar == null ? void 0 : controlBar.remove();
      controlBar = void 0;
      pauseBtn = void 0;
      reloadBtn = void 0;
    })
  };
  function createIframeControlSession(options) {
    if (!options.enabled || self === top) {
      return void 0;
    }
    let stopMessage;
    lib.cors.on(IFRAME_CONTROL_EVENT, (args) => {
      var _a;
      const action = args[0];
      if (action === "reload") {
        location.reload();
        return;
      }
      options.paused.value = action === "stop";
      (_a = options.workerProvider()) == null ? void 0 : _a.emit(action);
      if (options.paused.value) {
        stopMessage = lib.$message.warn({ duration: 0, content: "暂停中..." });
      } else {
        stopMessage == null ? void 0 : stopMessage.remove();
      }
      IframeControlBar.render({ paused: options.paused.value, done: false });
    });
    return {
      activate: () => {
        IframeControlBar.render({ paused: options.paused.value, done: false });
      },
      finish: () => {
        IframeControlBar.render({ paused: false, done: true });
      },
      dispose: () => {
        stopMessage == null ? void 0 : stopMessage.remove();
        IframeControlBar.remove();
      }
    };
  }
  const STYLE_KEYS = [
    "display",
    "position",
    "overflow",
    "box-sizing",
    "width",
    "height",
    "min-width",
    "max-width",
    "margin",
    "padding",
    "border-top-width",
    "border-right-width",
    "border-bottom-width",
    "border-left-width",
    "border-style",
    "border-color",
    "border-radius",
    "background-color",
    "background-image",
    "background-size",
    "background-position",
    "background-repeat",
    "color",
    "font-family",
    "font-size",
    "font-style",
    "font-weight",
    "line-height",
    "letter-spacing",
    "text-align",
    "text-decoration",
    "text-indent",
    "vertical-align",
    "white-space",
    "word-break",
    "list-style-type",
    "list-style-position",
    "flex-direction",
    "flex-wrap",
    "justify-content",
    "align-items",
    "gap",
    "grid-template-columns"
  ];
  function inlineStyles(src2, dst) {
    let cs;
    try {
      cs = getComputedStyle(src2);
    } catch (e) {
      return;
    }
    const style = dst.style;
    if (style) {
      for (const k of STYLE_KEYS) {
        const v = cs.getPropertyValue(k);
        if (v && v !== "none" && v !== "normal" && v !== "auto") {
          try {
            style.setProperty(k, v);
          } catch (e) {
          }
        } else if (v) {
          try {
            style.setProperty(k, v);
          } catch (e) {
          }
        }
      }
    }
    const sChildren = src2.children;
    const dChildren = dst.children;
    const n = Math.min(sChildren.length, dChildren.length);
    for (let i = 0; i < n; i++) {
      inlineStyles(sChildren[i], dChildren[i]);
    }
  }
  async function captureElementAsDataUrl(el, toDataUrl, maxWidth = 900) {
    try {
      const w0 = el.offsetWidth || el.clientWidth;
      const h0 = el.offsetHeight || el.clientHeight;
      if (!w0 || !h0)
        return void 0;
      const scale = w0 > maxWidth ? maxWidth / w0 : 1;
      const w = Math.round(w0 * scale);
      const h2 = Math.round(h0 * scale);
      if (w < 8 || h2 < 8)
        return void 0;
      const clone = el.cloneNode(true);
      const srcImgs = Array.from(el.querySelectorAll("img"));
      const dstImgs = Array.from(clone.querySelectorAll("img"));
      for (let i = 0; i < Math.min(srcImgs.length, dstImgs.length); i++) {
        try {
          const dataUrl = await toDataUrl(srcImgs[i]);
          if (dataUrl && dataUrl.indexOf("data:") === 0) {
            dstImgs[i].setAttribute("src", dataUrl);
          } else {
            dstImgs[i].remove();
          }
        } catch (e) {
          dstImgs[i].remove();
        }
      }
      inlineStyles(el, clone);
      const xml = new XMLSerializer().serializeToString(clone);
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h2 + '" viewBox="0 0 ' + w0 + " " + h0 + '"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:' + w0 + "px;height:" + h0 + 'px;">' + xml + "</div></foreignObject></svg>";
      const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
      const img = await new Promise((resolve, reject) => {
        const im = new Image();
        im.onload = () => resolve(im);
        im.onerror = () => reject(new Error("SVG 渲染失败"));
        im.src = svgUrl;
      });
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h2;
      const ctx = canvas.getContext("2d");
      if (!ctx)
        return void 0;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h2);
      ctx.drawImage(img, 0, 0, w, h2);
      return canvas.toDataURL("image/png");
    } catch (e) {
      console.warn("[CXStudy] 截图失败，将按无截图降级：" + ((e == null ? void 0 : e.message) || e));
      return void 0;
    }
  }
  const FACE_SELECTORS = ["#fcqrimg", ".chapterVideoFaceMaskDiv"];
  const CAPTCHA_HINTS = [
    ['img[src*="captcha"]', "captcha 图片"],
    ['img[src*="validate"]', "validate 图片"],
    ["#yzmImg, .yzmImg, .yzm, .picCode, .refresh-code", "图形验证码（超星常用类名）"],
    ["#verifyCode, #validateCode, #captcha", "验证码元素 id"],
    ['input[name="validateCode"], input[name="verifyCode"], input[name="captcha"]', "验证码输入框"],
    [".verifyimg, .validateCode, .captcha", "验证码容器类名"],
    [".geetest_panel, .nc-container, .verify-slider, .slide-verify, .nc_scale", "滑块验证组件"]
  ];
  function queryAllDeep(selector) {
    const out = [];
    const seen = /* @__PURE__ */ new Set();
    const walk = (doc) => {
      if (!doc || seen.has(doc))
        return;
      seen.add(doc);
      try {
        out.push(...Array.from(doc.querySelectorAll(selector)));
      } catch (e) {
      }
      try {
        Array.from(doc.querySelectorAll("iframe")).forEach((f) => {
          try {
            if (f.contentWindow && f.contentWindow.document)
              walk(f.contentWindow.document);
          } catch (e) {
          }
        });
      } catch (e) {
      }
    };
    walk(document);
    return out;
  }
  function isExamPage() {
    return /\/exam\/(preview|test)/.test(location.href);
  }
  function cxWorkPreCheck() {
    const lines = [];
    let ok = true;
    const good = (s) => lines.push("✅ " + s);
    const bad = (s) => {
      lines.push("❌ " + s);
      ok = false;
    };
    const info = (s) => lines.push("ℹ️ " + s);
    const questionLi = queryAllDeep(".questionLi");
    const tiMu = queryAllDeep(".TiMu");
    const questionCount = questionLi.length || tiMu.length;
    if (questionCount > 0) {
      good(
        "检测到题目 " + questionCount + " 道" + (questionLi.length ? "（.questionLi，作业/考试）" : "（.TiMu，章节测验）")
      );
    } else {
      bad("未检测到题目容器（.questionLi / .TiMu）—— 可能尚未进入答题界面");
    }
    if (queryAllDeep(".testTit_status_complete").length > 0) {
      bad("页面标记为已完成（testTit_status_complete），没有可作答的题");
    }
    const hasFace = FACE_SELECTORS.some((sel) => queryAllDeep(sel).length > 0);
    if (hasFace)
      bad("检测到人脸识别：脚本不会绕过，必须先人工完成识别");
    let hasCaptcha = false;
    let captchaBy = "";
    for (const [sel, by] of CAPTCHA_HINTS) {
      if (queryAllDeep(sel).length > 0) {
        hasCaptcha = true;
        captchaBy = by;
        break;
      }
    }
    if (!hasCaptcha) {
      try {
        const txt = document.body && document.body.innerText || "";
        for (const w of ["请输入验证码", "人机验证", "拖动滑块", "完成验证", "验证码校验"]) {
          if (txt.indexOf(w) >= 0) {
            hasCaptcha = true;
            captchaBy = "文案「" + w + "」";
            break;
          }
        }
      } catch (e) {
      }
    }
    if (hasCaptcha)
      bad("检测到人机验证（" + captchaBy + "）：脚本不会识别或绕过");
    if (isExamPage()) {
      try {
        const txt = document.body && document.body.innerText || "";
        ["考生承诺", "诚信考试", "考试承诺书", "重考须知", "等待开始", "开考时间"].forEach((w) => {
          if (txt.indexOf(w) >= 0)
            info("页面文本含「" + w + "」，请确认你已经真正进入答题界面");
        });
      } catch (e) {
      }
    }
    try {
      const imgs = queryAllDeep(".questionLi img, .TiMu img");
      if (imgs.length > 0) {
        info("检测到题目图片 " + imgs.length + " 张；若正确率不理想，可开启「允许图片题」与「截图兜底」");
      }
    } catch (e) {
    }
    return { ok, lines, questionCount, hasFace, hasCaptcha };
  }
  function cxWorkGate(opts) {
    const cfg = opts.cfg || {};
    const { log, warn, confirm, notes } = opts.deps;
    const isExam = isExamPage();
    const typeName = isExam ? "考试" : "作业";
    if (!cfg.cxWorkEnabled) {
      log("[CXStudy] " + typeName + "自动作答未启用（默认关闭）→ 不启动。");
      warn("作业/考试自动作答默认关闭。如确有需要，请在「通用-全局设置」开启并确认责任声明。", 10);
      return;
    }
    if (!cfg.cxWorkConsent) {
      log("[CXStudy] 未确认责任声明 → 拒绝启动。");
      warn("请先在「通用-全局设置」勾选责任声明，才可使用作业/考试自动作答。", 10);
      return;
    }
    if (isExam && !cfg.cxExamEnabled) {
      log("[CXStudy] 考试需单独授权 → 拒绝启动。");
      warn("考试需单独授权：请在「通用-全局设置」勾选「考试单独授权」。", 10);
      return;
    }
    const pre = cxWorkPreCheck();
    log("[CXStudy] 预检结果（" + typeName + "）：\n" + pre.lines.join("\n"));
    if (pre.hasFace) {
      log("[CXStudy] 检测到人脸识别 → 停手，等人工完成。");
      warn("检测到人脸识别：脚本不会绕过，请人工完成后再手动开始。", 0);
      return;
    }
    if (pre.hasCaptcha) {
      log("[CXStudy] 检测到人机验证 → 停手。");
      warn("检测到人机验证：脚本不会识别或绕过，请人工通过后再手动开始。", 0);
      return;
    }
    if (!opts.interactive) {
      log("[CXStudy] 子 iframe 场景弹窗回调不可用 → 需你手动点击面板的开始按钮。");
      warn("子窗口场景无法弹确认框：请在脚本面板中手动点击开始。", 15);
      return;
    }
    confirm({
      content: notes([
        "【" + typeName + "】预检结果：",
        ...pre.lines,
        "",
        "⚠️ 风险提示：使用本功能的风险（含成绩与学术诚信后果）由你自己承担。",
        "本脚本不会绕过人脸识别与人机验证码 —— 出现时必须由你人工完成。",
        pre.ok ? "预检未发现阻断项。" : "预检发现异常项，建议不要开始。"
      ]),
      cancelButtonText: "取消（推荐）",
      confirmButtonText: pre.ok ? "开始作答" : "我确认，仍然开始",
      onConfirm() {
        log("[CXStudy] 用户已确认，开始作答。");
        opts.onStart();
      }
    });
  }
  function isNodeEnv$1() {
    var _a;
    return typeof process !== "undefined" && !!((_a = process.versions) == null ? void 0 : _a.node) && globalThis.GM_xmlhttpRequest === void 0;
  }
  const PNG_SIG = [137, 80, 78, 71, 13, 10, 26, 10];
  function dataUrlToBytes(dataUrl) {
    const m = dataUrl.match(/^data:[^;,]+.*?;base64,(.+)$/);
    if (!m)
      return void 0;
    if (typeof Buffer !== "undefined") {
      return new Uint8Array(Buffer.from(m[1], "base64"));
    }
    const bin = atob(m[1]);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++)
      bytes[i] = bin.charCodeAt(i);
    return bytes;
  }
  function bytesToDataUrl(bytes) {
    let b64;
    if (typeof Buffer !== "undefined") {
      b64 = Buffer.from(bytes).toString("base64");
    } else {
      let bin = "";
      const chunk = 32768;
      for (let i = 0; i < bytes.length; i += chunk) {
        bin += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
      }
      b64 = btoa(bin);
    }
    return `data:image/png;base64,${b64}`;
  }
  function readUint32BE(bytes, off) {
    return bytes[off] * 16777216 + (bytes[off + 1] << 16 | bytes[off + 2] << 8 | bytes[off + 3]) >>> 0;
  }
  function concatUint8(arrs) {
    let len = 0;
    for (const a of arrs)
      len += a.length;
    const out = new Uint8Array(len);
    let o = 0;
    for (const a of arrs) {
      out.set(a, o);
      o += a.length;
    }
    return out;
  }
  const CRC_TABLE = (() => {
    const table = new Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      table[n] = c >>> 0;
    }
    return table;
  })();
  function crc32(bytes) {
    let crc = 4294967295;
    for (let i = 0; i < bytes.length; i++) {
      crc = CRC_TABLE[(crc ^ bytes[i]) & 255] ^ crc >>> 8;
    }
    return (crc ^ 4294967295) >>> 0;
  }
  function getZlib() {
    try {
      const r = typeof require !== "undefined" ? require : null;
      if (!r)
        return null;
      const name = "zlib";
      return r(name);
    } catch {
      return null;
    }
  }
  function zlibInflate(data) {
    const zlib = getZlib();
    if (!zlib)
      throw new Error("zlib 不可用");
    const buf = zlib.inflateSync(Buffer.from(data));
    return new Uint8Array(buf);
  }
  function zlibDeflate(data) {
    const zlib = getZlib();
    if (!zlib)
      throw new Error("zlib 不可用");
    const buf = zlib.deflateSync(Buffer.from(data));
    return new Uint8Array(buf);
  }
  function getImageSize(dataUrl) {
    const bytes = dataUrlToBytes(dataUrl);
    if (!bytes || bytes.length < 26)
      return void 0;
    for (let i = 0; i < 8; i++)
      if (bytes[i] !== PNG_SIG[i])
        return void 0;
    const width = readUint32BE(bytes, 16);
    const height = readUint32BE(bytes, 20);
    const bitDepth = bytes[24];
    const colorType = bytes[25];
    const channels = colorType === 2 ? 3 : colorType === 6 ? 4 : colorType === 4 ? 2 : colorType === 0 ? 1 : 0;
    if (channels === 0)
      return void 0;
    if (bitDepth !== 8)
      return void 0;
    return { width, height, bitDepth, colorType, channels };
  }
  function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc)
      return a;
    if (pb <= pc)
      return b;
    return c;
  }
  function unfilterRow(filter, cur, prev, bpp) {
    const n = cur.length;
    switch (filter) {
      case 0:
        return;
      case 1:
        for (let x = bpp; x < n; x++)
          cur[x] = cur[x] + cur[x - bpp] & 255;
        return;
      case 2:
        for (let x = 0; x < n; x++)
          cur[x] = cur[x] + prev[x] & 255;
        return;
      case 3:
        for (let x = 0; x < n; x++) {
          const a = x >= bpp ? cur[x - bpp] : 0;
          const b = prev[x];
          cur[x] = cur[x] + Math.floor((a + b) / 2) & 255;
        }
        return;
      case 4:
        for (let x = 0; x < n; x++) {
          const a = x >= bpp ? cur[x - bpp] : 0;
          const b = prev[x];
          const c = x >= bpp ? prev[x - bpp] : 0;
          cur[x] = cur[x] + paeth(a, b, c) & 255;
        }
    }
  }
  function decodePng(bytes, info) {
    const idatChunks = [];
    let off = 8;
    while (off + 8 <= bytes.length) {
      const len = readUint32BE(bytes, off);
      const type = String.fromCharCode(bytes[off + 4], bytes[off + 5], bytes[off + 6], bytes[off + 7]);
      if (type === "IDAT") {
        idatChunks.push(bytes.subarray(off + 8, off + 8 + len));
      } else if (type === "IEND")
        break;
      off += 12 + len;
    }
    if (idatChunks.length === 0)
      return void 0;
    const idat = concatUint8(idatChunks);
    let inflated;
    try {
      inflated = zlibInflate(idat);
    } catch {
      return void 0;
    }
    const { width, height, channels } = info;
    const bpp = channels;
    const stride = width * bpp;
    const out = new Uint8Array(height * stride);
    let prev = new Uint8Array(stride);
    let src2 = 0;
    for (let y = 0; y < height; y++) {
      if (src2 + 1 + stride > inflated.length)
        break;
      const filter = inflated[src2++];
      const cur = out.subarray(y * stride, (y + 1) * stride);
      for (let x = 0; x < stride; x++)
        cur[x] = inflated[src2 + x];
      src2 += stride;
      unfilterRow(filter, cur, prev, bpp);
      prev = cur;
    }
    return out;
  }
  function resampleNearest(pixels, width, height, channels, scale) {
    const newW = width * scale;
    const newH = height * scale;
    const out = new Uint8Array(newH * newW * channels);
    const inStride = width * channels;
    const outStride = newW * channels;
    for (let y = 0; y < newH; y++) {
      const sy = Math.floor(y / scale);
      for (let x = 0; x < newW; x++) {
        const sx = Math.floor(x / scale);
        const inOff = sy * inStride + sx * channels;
        const outOff = y * outStride + x * channels;
        for (let c = 0; c < channels; c++)
          out[outOff + c] = pixels[inOff + c];
      }
    }
    return { pixels: out, width: newW, height: newH };
  }
  function makeChunk(type, data) {
    const chunk = new Uint8Array(4 + 4 + data.length + 4);
    const dv = new DataView(chunk.buffer);
    dv.setUint32(0, data.length);
    for (let i = 0; i < 4; i++)
      chunk[4 + i] = type.charCodeAt(i);
    chunk.set(data, 8);
    const crc = crc32(chunk.subarray(4, 8 + data.length));
    dv.setUint32(8 + data.length, crc);
    return chunk;
  }
  function encodePng(width, height, channels, pixels) {
    const bpp = channels;
    const stride = width * bpp;
    const raw = new Uint8Array(height * (1 + stride));
    let o = 0;
    for (let y = 0; y < height; y++) {
      raw[o++] = 0;
      for (let x = 0; x < stride; x++)
        raw[o++] = pixels[y * stride + x];
    }
    let compressed;
    try {
      compressed = zlibDeflate(raw);
    } catch {
      return void 0;
    }
    const sig = new Uint8Array(PNG_SIG);
    const ihdr = new Uint8Array(13);
    const dv = new DataView(ihdr.buffer);
    dv.setUint32(0, width);
    dv.setUint32(4, height);
    ihdr[8] = 8;
    ihdr[9] = channels === 4 ? 6 : channels === 3 ? 2 : channels === 2 ? 4 : 0;
    ihdr[10] = 0;
    ihdr[11] = 0;
    ihdr[12] = 0;
    return concatUint8([
      sig,
      makeChunk("IHDR", ihdr),
      makeChunk("IDAT", compressed),
      makeChunk("IEND", new Uint8Array(0))
    ]);
  }
  function upscalePngViaCodec(dataUrl, minDim) {
    const bytes = dataUrlToBytes(dataUrl);
    const info = getImageSize(dataUrl);
    if (!bytes || !info)
      return dataUrl;
    if (info.width >= minDim && info.height >= minDim)
      return dataUrl;
    const decoded = decodePng(bytes, info);
    if (!decoded)
      return dataUrl;
    const scale = Math.ceil(minDim / Math.min(info.width, info.height));
    const { pixels, width, height } = resampleNearest(decoded, info.width, info.height, info.channels, scale);
    const encoded = encodePng(width, height, info.channels, pixels);
    if (!encoded)
      return dataUrl;
    return bytesToDataUrl(encoded);
  }
  async function upscalePngViaCanvas(dataUrl, minDim) {
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("图片加载失败"));
      img.src = dataUrl;
    });
    const w = img.naturalWidth || img.width;
    const h2 = img.naturalHeight || img.height;
    if (w >= minDim && h2 >= minDim)
      return dataUrl;
    const scale = Math.ceil(minDim / Math.min(w, h2));
    const canvas = document.createElement("canvas");
    canvas.width = w * scale;
    canvas.height = h2 * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return dataUrl;
    ctx.drawImage(img, 0, 0, w * scale, h2 * scale);
    return canvas.toDataURL("image/png");
  }
  async function upscalePngDataUrl(dataUrl, minDim) {
    if (isNodeEnv$1())
      return upscalePngViaCodec(dataUrl, minDim);
    return upscalePngViaCanvas(dataUrl, minDim);
  }
  function isNodeEnv() {
    var _a;
    return typeof process !== "undefined" && !!((_a = process.versions) == null ? void 0 : _a.node) && globalThis.GM_xmlhttpRequest === void 0;
  }
  async function nodeFetchToBase64(url) {
    const fet = require("node-fetch").default || require("node-fetch");
    let referer = "";
    try {
      referer = new URL(url).origin + "/";
    } catch {
    }
    const res = await fet(url, {
      headers: {
        Referer: referer,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    if (!res.ok) {
      throw new Error(`图片下载失败 ${res.status}`);
    }
    const buffer = res.buffer ? res.buffer() : res.arrayBuffer();
    const buf = buffer instanceof Promise ? await buffer : buffer;
    const contentType = res.headers.get("content-type") || "image/png";
    return `data:${contentType};base64,${buf.toString("base64")}`;
  }
  const IMAGE_BASE64_CACHE_MAX = 200;
  const imageBase64Cache = /* @__PURE__ */ new Map();
  function imageToBase64(source) {
    const url = typeof source === "string" ? source : source.src;
    if (url && !url.startsWith("data:")) {
      const cached = imageBase64Cache.get(url);
      if (cached) {
        imageBase64Cache.delete(url);
        imageBase64Cache.set(url, cached);
        return Promise.resolve(cached);
      }
      return convertImageToBase64(source).then((b64) => {
        if (imageBase64Cache.size >= IMAGE_BASE64_CACHE_MAX) {
          imageBase64Cache.delete(imageBase64Cache.keys().next().value);
        }
        imageBase64Cache.set(url, b64);
        return b64;
      });
    }
    return convertImageToBase64(source);
  }
  function convertImageToBase64(source) {
    return new Promise((resolve, reject) => {
      if (typeof HTMLImageElement !== "undefined" && source instanceof HTMLImageElement) {
        if (source.src.startsWith("data:")) {
          resolve(source.src);
          return;
        }
        try {
          const canvas = document.createElement("canvas");
          canvas.width = source.naturalWidth;
          canvas.height = source.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(source, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          resolve(dataUrl);
          return;
        } catch {
        }
      }
      const url = typeof source === "string" ? source : source.src;
      if (url.startsWith("data:")) {
        resolve(url);
        return;
      }
      if (isNodeEnv()) {
        nodeFetchToBase64(url).then(resolve, reject);
        return;
      }
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } catch {
          gmXmlHttpRequestFallback(url, resolve, reject);
        }
      };
      img.onerror = () => {
        gmXmlHttpRequestFallback(url, resolve, reject);
      };
      img.src = url;
    });
  }
  function gmXmlHttpRequestFallback(url, resolve, reject) {
    if (typeof GM_xmlhttpRequest === "undefined") {
      reject(new Error("图片转 base64 失败"));
      return;
    }
    GM_xmlhttpRequest({
      url,
      method: "GET",
      responseType: "blob",
      onload: (response) => {
        const blob = response.response;
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      },
      onerror: reject
    });
  }
  function normalizeToPngDataUrl(dataUrl) {
    const m = dataUrl.match(/^data:[^;,]+.*?;base64,(.+)$/);
    return `data:image/png;base64,${m ? m[1] : dataUrl}`;
  }
  const MIN_IMAGE_DIMENSION = 14;
  async function createImageSuggestion(title, options, titleImages, optionImages) {
    const imageUrlRegex = /https?:\/\/[^\s一-鿿＀-￯]+?\.(?:png|jpe?g|gif|bmp|webp|svg)(?:\?[^\s一-鿿＀-￯]*)?/gi;
    const titleUrls = titleImages && titleImages.length ? titleImages.slice() : title.match(imageUrlRegex) || [];
    const optionUrls = optionImages && optionImages.length ? optionImages.slice() : (options == null ? void 0 : options.match(imageUrlRegex)) || [];
    if (titleUrls.length === 0 && optionUrls.length === 0)
      return void 0;
    const allUrls = [];
    const seen = /* @__PURE__ */ new Set();
    for (const url of [...titleUrls, ...optionUrls]) {
      if (!seen.has(url)) {
        seen.add(url);
        allUrls.push(url);
      }
    }
    const base64Map = /* @__PURE__ */ new Map();
    await Promise.all(
      allUrls.map(async (url) => {
        try {
          const base64 = await imageToBase64(url);
          base64Map.set(url, base64);
        } catch {
        }
      })
    );
    if (base64Map.size === 0)
      return void 0;
    const images = [];
    const urls = [];
    const placeholderMap = /* @__PURE__ */ new Map();
    for (const url of allUrls) {
      const base64 = base64Map.get(url);
      if (!base64)
        continue;
      let normalized = normalizeToPngDataUrl(base64);
      const size = getImageSize(normalized);
      if (size && (size.width < MIN_IMAGE_DIMENSION || size.height < MIN_IMAGE_DIMENSION)) {
        try {
          normalized = await upscalePngDataUrl(normalized, MIN_IMAGE_DIMENSION);
        } catch (e) {
          console.warn(`[imageOptimize] 图片 ${size.width}x${size.height} 放大失败，已跳过：${url}（${e == null ? void 0 : e.message}）`);
          continue;
        }
      }
      placeholderMap.set(url, ` [图片${images.length + 1}] `);
      images.push(normalized);
      urls.push(url);
    }
    if (images.length === 0)
      return void 0;
    let suggestionTitle = title;
    for (const [url, placeholder] of placeholderMap) {
      suggestionTitle = suggestionTitle.split(url).join(placeholder);
    }
    let suggestionOptions;
    if (options) {
      const hasOptionImages = optionUrls.some((url) => base64Map.has(url));
      if (hasOptionImages) {
        suggestionOptions = options;
        for (const [url, placeholder] of placeholderMap) {
          suggestionOptions = suggestionOptions.split(url).join(placeholder);
        }
      }
    }
    return {
      images,
      urls,
      suggestion_title: suggestionTitle,
      ...suggestionOptions !== void 0 ? { suggestion_options: suggestionOptions } : {}
    };
  }
  function dedupeLines(str) {
    const seen = /* @__PURE__ */ new Set();
    const result = [];
    for (const line of str.split("\n")) {
      if (!seen.has(line)) {
        seen.add(line);
        result.push(line);
      }
    }
    return result.join("\n");
  }
  async function buildAnswererEnv(params) {
    var _a;
    const rawOptions = Array.isArray(params.options) ? params.options.filter((o) => o != null && o !== "").join("\n") : (_a = params.options) != null ? _a : "";
    const options = dedupeLines(rawOptions);
    const env = {
      type: params.type || "unknown",
      title: params.title,
      options
    };
    let imageUrls = [];
    if (params.enableImageOptimize) {
      const suggestion = await createImageSuggestion(params.title, options, params.titleImages, params.optionsImages);
      if (suggestion) {
        env.images = suggestion.images;
        imageUrls = suggestion.urls;
        env.suggestion_title = suggestion.suggestion_title;
        if (suggestion.suggestion_options !== void 0) {
          env.suggestion_options = dedupeLines(suggestion.suggestion_options);
        }
      }
    }
    return { env, imageUrls };
  }
  const IMAGE_OPTIMIZE_PLACEHOLDERS = [`\${images}`, `\${suggestion_title}`, `\${suggestion_options}`];
  const IMAGE_ENV_REF_PATTERN = /(^|[^\w$])(images|suggestion_title|suggestion_options)(?![\w$])/;
  function isAnswererWrapperSupportImageOptimize(wrapper) {
    if (!wrapper || String(wrapper.method || "get").toLowerCase() !== "post") {
      return false;
    }
    for (const value of Object.values(wrapper.data || {})) {
      if (typeof value === "string") {
        if (IMAGE_OPTIMIZE_PLACEHOLDERS.some((placeholder) => value.includes(placeholder))) {
          return true;
        }
      } else if (value && typeof value === "object" && typeof value.handler === "string") {
        if (IMAGE_ENV_REF_PATTERN.test(value.handler)) {
          return true;
        }
      }
    }
    return false;
  }
  function isAnswererWrappersSupportImageOptimize(wrappers) {
    return wrappers.some(isAnswererWrapperSupportImageOptimize);
  }
  function createAnswererWrappersSignature(wrappers) {
    const content = JSON.stringify(wrappers);
    let hash = 2166136261;
    for (let i = 0; i < content.length; i++) {
      hash ^= content.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16);
  }
  const commonWorkRenderBindings = /* @__PURE__ */ new WeakMap();
  function bindCommonWorkRender(script2, render2) {
    const binding = commonWorkRenderBindings.get(script2);
    if (binding) {
      binding.current = render2;
      return;
    }
    const created = { current: render2 };
    commonWorkRenderBindings.set(script2, created);
    script2.on("render", () => created.current());
  }
  function commonWork(options) {
    if (options.mount_script)
      BackgroundProject.scripts.render.methods.pin(options.mount_script);
    CommonProject.scripts.settings.on("answerer-wrapper-change", async (curr, prev) => {
      $console.log("answerer-wrapper-change curr.length", curr.length);
      if (curr.length > 0) {
        state2.checkFailed = false;
        state2.startBtnPressed = false;
        await closeAnswerWrapperEmptyWarning();
        start2();
      }
    });
    let workOptions = CommonProject.scripts.settings.methods.getWorkOptions();
    const state2 = {
      worker: void 0,
      startBtnPressed: false,
      checkFailed: false,
      running: false,
      controlPanel: null,
      paused: false,
      resultPanel: null
    };
    const pausedAccessor = {
      get value() {
        return state2.paused;
      },
      set value(v) {
        state2.paused = v;
      }
    };
    const iframeControl = createIframeControlSession({
      enabled: options.iframe_control,
      workerProvider: () => state2.worker,
      paused: pausedAccessor
    });
    const createWorkControlPanel = () => {
      const { controlBtn, restartBtn, startBtn } = createWorkerControl({
        workerProvider: () => state2.worker,
        paused: pausedAccessor,
        onStart: async () => {
          state2.startBtnPressed = true;
          if (checkMessage instanceof lib.MessageElement) {
            checkMessage.remove();
          }
          await closeAnswerWrapperEmptyWarning();
          start2();
        },
        onRestart: async () => {
          var _a, _b;
          (_a = state2.worker) == null ? void 0 : _a.emit("close");
          state2.running = false;
          await ((_b = options.onRestart) == null ? void 0 : _b.call(options));
          start2();
        }
      });
      startBtn.style.flex = "1";
      startBtn.style.padding = "4px";
      restartBtn.style.flex = "1";
      restartBtn.style.padding = "4px";
      controlBtn.style.flex = "1";
      controlBtn.style.padding = "4px";
      const container2 = lib.h(
        "div",
        { className: "work-control-panel" },
        state2.running ? [controlBtn, restartBtn] : [startBtn]
      );
      state2.controlPanel = container2;
      return { container: container2, startBtn, restartBtn, controlBtn };
    };
    const renderPanelBody = () => {
      var _a, _b, _c, _d;
      const gotoSettingsBtn = lib.$ui.button("👉 前往设置题库配置", {
        className: "base-style-button",
        style: { flex: "1", padding: "4px" }
      });
      gotoSettingsBtn.onclick = () => {
        BackgroundProject.scripts.render.methods.pin(CommonProject.scripts.settings);
      };
      if (!((_a = state2.resultPanel) == null ? void 0 : _a.isConnected)) {
        state2.resultPanel = CommonProject.scripts.workResults.methods.createWorkResultsPanel();
      }
      (_d = (_c = (_b = options.mount_script) == null ? void 0 : _b.panel) == null ? void 0 : _c.body) == null ? void 0 : _d.replaceChildren(
        lib.h(
          "div",
          { style: { marginTop: "12px" } },
          state2.checkFailed ? [lib.h("hr"), lib.h("div", { style: { display: "flex" } }, [gotoSettingsBtn])] : [
            lib.h("hr"),
            state2.controlPanel || createWorkControlPanel().container,
            state2.resultPanel
          ]
        )
      );
    };
    if (options.mount_script)
      bindCommonWorkRender(options.mount_script, renderPanelBody);
    let checkMessage;
    if (workOptions.answererWrappers.length === 0) {
      state2.checkFailed = true;
      answerWrapperEmptyWarning(0);
    } else {
      cxWorkGate({
        cfg: CommonProject.scripts.settings.cfg,
        interactive: !iframeControl,
        onStart: () => {
          if (state2.startBtnPressed === false)
            start2();
        },
        deps: {
          log: (m) => $console.log(m),
          warn: (m, d) => {
            lib.$message.warn({ content: m, duration: d != null ? d : 10 });
          },
          confirm: (o) => {
            lib.$modal.confirm({
              maskCloseable: false,
              width: 620,
              content: o.content,
              cancelButtonText: o.cancelButtonText,
              confirmButtonText: o.confirmButtonText,
              onConfirm: o.onConfirm
            });
          },
          notes: (l) => lib.$ui.notes(l)
        }
      });
    }
    const start2 = async () => {
      var _a, _b;
      if (state2.running) {
        return;
      }
      if (state2.checkFailed) {
        return answerWrapperEmptyWarning(0);
      }
      workOptions = CommonProject.scripts.settings.methods.getWorkOptions();
      await ((_a = options.beforeRunning) == null ? void 0 : _a.call(options));
      state2.running = true;
      state2.worker = options.workerProvider(workOptions);
      if (state2.worker) {
        (_b = options.onWorkerCreated) == null ? void 0 : _b.call(options, state2.worker);
      }
      const { controlBtn } = createWorkControlPanel();
      renderPanelBody();
      iframeControl == null ? void 0 : iframeControl.activate();
      if (state2.worker) {
        const emitState = CommonEvents.emitWorkerStateChange;
        emitState("start");
        state2.worker.on("stop", () => emitState("stop"));
        state2.worker.on("continuate", () => emitState("start"));
        state2.worker.once("close", () => {
          emitState("close");
          iframeControl == null ? void 0 : iframeControl.dispose();
        });
        state2.worker.once("done", () => {
          state2.running = false;
          state2.controlPanel = null;
          state2.paused = false;
          controlBtn.disabled = true;
          emitState("done");
          iframeControl == null ? void 0 : iframeControl.finish();
        });
      }
    };
  }
  function createWorkerControl(options) {
    var _a;
    let stopMessage;
    const paused = (_a = options.paused) != null ? _a : { value: false };
    const startBtn = lib.$ui.button("▶️开始答题");
    const restartBtn = lib.$ui.button("🔃重新答题");
    const controlBtn = lib.$ui.button(paused.value ? "▶️继续" : "⏸暂停");
    startBtn.onclick = () => {
      startBtn.remove();
      options.onStart();
    };
    restartBtn.onclick = () => {
      stopMessage == null ? void 0 : stopMessage.remove();
      paused.value = false;
      options.onRestart();
    };
    controlBtn.onclick = () => {
      var _a2;
      paused.value = !paused.value;
      const worker = options.workerProvider();
      (_a2 = worker == null ? void 0 : worker.emit) == null ? void 0 : _a2.call(worker, paused.value ? "stop" : "continuate");
      controlBtn.value = paused.value ? "▶️继续" : "⏸️暂停";
      if (paused.value) {
        stopMessage = lib.$message.warn({ duration: 0, content: "暂停中..." });
      } else {
        stopMessage == null ? void 0 : stopMessage.remove();
      }
    };
    return { startBtn, restartBtn, controlBtn };
  }
  function extractTextWithImages(root2, opts) {
    const parts = [];
    const images = [];
    const walk = (node) => {
      var _a;
      if (node.nodeType === Node.TEXT_NODE) {
        parts.push(node.textContent || "");
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE)
        return;
      const el = node;
      if (el.tagName === "IMG") {
        const img = el;
        if ((opts == null ? void 0 : opts.imgFilter) && !opts.imgFilter(img))
          return;
        const url = img.src;
        if (url) {
          parts.push(` ${url} `);
          images.push(url);
        }
        return;
      }
      if (el.tagName === "BR") {
        parts.push("\n");
        return;
      }
      try {
        const view = (_a = el.ownerDocument) == null ? void 0 : _a.defaultView;
        if (view && el.isConnected && view.getComputedStyle(el).display === "none")
          return;
      } catch {
      }
      for (const child of Array.from(el.childNodes))
        walk(child);
    };
    walk(root2);
    return { text: parts.join(""), images };
  }
  function simplifyWorkResult(wr, titleTransform, index = 0) {
    var _a, _b, _c, _d, _e, _f;
    const question = (titleTransform == null ? void 0 : titleTransform(((_a = wr.ctx) == null ? void 0 : _a.elements.title) || [], index)) || ((_c = (_b = wr.ctx) == null ? void 0 : _b.elements.title) == null ? void 0 : _c.map((e) => e == null ? void 0 : e.innerText.trim()).filter(Boolean).join("<br>")) || "";
    return {
      requested: wr.requested,
      searching: wr.searching,
      resolved: wr.resolved,
      error: wr.error,
      type: (_d = wr.ctx) == null ? void 0 : _d.type,
      kindLabel: wr.cxKind,
      randomFilled: wr.cxRandomFilled === true,
      needsManual: wr.cxNeedsManual === true,
      question,
      finish: (_e = wr.result) == null ? void 0 : _e.finish,
      searchInfos: ((_f = wr.ctx) == null ? void 0 : _f.searchInfos.map((sr) => ({
        error: sr.error,
        name: sr.name,
        homepage: sr.homepage,
        results: sr.results.map((ans) => [ans.question, ans.answer, ans.extra_data || {}])
      }))) || []
    };
  }
  function updateDynamicResult(current, titleTransform) {
    return CommonProject.scripts.workResults.methods.append(simplifyWorkResult(current, titleTransform));
  }
  function removeRedundantWords(str, words) {
    for (const word of words.map((w) => w.trim())) {
      str = str.replace(word, "");
    }
    return str;
  }
  let answererWrapperUnsetMessage;
  const answerWrapperEmptyWarning = lib.cors.defineTopFunction((duration) => {
    const setting = lib.h("button", { className: "base-style-button-secondary" }, "通用-全局设置");
    setting.onclick = () => {
      BackgroundProject.scripts.render.methods.pin(CommonProject.scripts.settings);
      setTimeout(() => {
        var _a, _b;
        (_b = (_a = lib.$elements.root) == null ? void 0 : _a.querySelector('[value="点击配置"]')) == null ? void 0 : _b.click();
      }, 500);
    };
    answererWrapperUnsetMessage == null ? void 0 : answererWrapperUnsetMessage.remove();
    answererWrapperUnsetMessage = lib.$message.warn({
      content: lib.h("span", {}, ["你还没设置题库，无法自动答题，请切换到 ", setting, " 页面进行配置。"]),
      duration
    });
  });
  const closeAnswerWrapperEmptyWarning = lib.cors.defineTopFunction(() => {
    console.log(answererWrapperUnsetMessage);
    answererWrapperUnsetMessage == null ? void 0 : answererWrapperUnsetMessage.remove();
    answererWrapperUnsetMessage = void 0;
  });
  function createCommonAnswerer(options) {
    const normalize = (v) => {
      if (v == null)
        return { text: "" };
      return typeof v === "string" ? { text: v } : v;
    };
    const QUESTION_IMAGE_REGEX = /https?:\/\/[^\s]+?\.(?:png|jpe?g|gif|bmp|webp|svg)/i;
    let imageOptimizeOffWarned = false;
    let imageConvertFailWarned = false;
    return async (elements2, ctx) => {
      const titleResult = normalize(options.titleTransform(elements2, ctx));
      const title = titleResult.text;
      if (!title) {
        throw new Error("题目为空，请查看题目是否为空，或者忽略此题");
      }
      const titleImages = titleResult.images;
      return await BackgroundProject.scripts.data.methods.searchAnswerInCaches(title, async () => {
        var _a, _b, _c, _d, _e;
        await $.sleep(((_a = options.period) != null ? _a : 3) * 1e3);
        const optResult = normalize(
          options.optionsTransform ? options.optionsTransform(elements2, ctx) : ((_b = ctx.elements.options) != null ? _b : []).filter(Boolean).map((o) => o.innerText).join("\n")
        );
        const imageOptimizeOn = CommonProject.scripts.settings.cfg.imageOptimize || !!CommonProject.scripts.settings.cfg.cxModelVision;
        const questionHasImages = ((_c = titleImages == null ? void 0 : titleImages.length) != null ? _c : 0) + ((_e = (_d = optResult.images) == null ? void 0 : _d.length) != null ? _e : 0) > 0 || QUESTION_IMAGE_REGEX.test(title) || QUESTION_IMAGE_REGEX.test(optResult.text);
        if (questionHasImages && !imageOptimizeOn && !imageOptimizeOffWarned) {
          imageOptimizeOffWarned = true;
          lib.$message.warn({
            content: "检测到题目包含图片，但未开启「图片题优化」（通用-全局设置-高级设置中开启），图片题将无法搜题。",
            duration: 10
          });
        }
        const { env, imageUrls } = await buildAnswererEnv({
          type: ctx.type,
          title,
          options: optResult.text,
          titleImages,
          optionsImages: optResult.images,
          enableImageOptimize: imageOptimizeOn
        });
        if (questionHasImages && imageOptimizeOn && imageUrls.length === 0 && !imageConvertFailWarned) {
          imageConvertFailWarned = true;
          lib.$message.warn({
            content: "题目图片下载或转换失败（可能跨域受限），本题将按普通题目搜索，图片题可能无法匹配。",
            duration: 10
          });
        }
        if (CommonProject.scripts.settings.cfg.cxScreenshot) {
          const titleBlank = !title || title.replace(/[\s\[\]图片\d]/g, "").length < 2;
          const imagesLost = questionHasImages && imageUrls.length === 0;
          const mathChars = (title.match(/[√∑∫≠≤≥±∞∈∀∃⇒⇔αβγθλμσπΔΩ²³₁₂₃]/g) || []).length;
          const looksLikeFormula = /\\[a-zA-Z]{2,}|[\^_]\{?[0-9a-zA-Z]|<math/i.test(title) || mathChars >= 2;
          if (titleBlank || imagesLost || looksLikeFormula) {
            $console.log(
              "[CXStudy] 触发截图兜底（" + (titleBlank ? "题干文本为空" : imagesLost ? "图片转换失败" : "题干含公式") + "）"
            );
            const shot = await captureElementAsDataUrl(ctx.root, imageToBase64);
            if (shot) {
              env.screenshot = shot;
              $console.log("[CXStudy] 已生成题目截图 " + Math.round(shot.length / 1024) + " KB");
            } else {
              $console.warn("[CXStudy] 截图未生成，本题按无截图处理。");
            }
          }
        }
        const searchInfos = await defaultAnswerWrapperHandler(options.answererWrappers, env);
        if (imageUrls.length) {
          for (const info of searchInfos) {
            for (const res of info.results) {
              if (res.answer && res.answer.includes("[图片")) {
                res.answer = res.answer.replace(/\[图片(\d+)\]/g, (m, n) => {
                  var _a2;
                  return (_a2 = imageUrls[Number(n) - 1]) != null ? _a2 : m;
                });
              }
            }
          }
        }
        return searchInfos;
      });
    };
  }
  const EDGE_WIDTH = 100;
  const ICON_SIZE = 64;
  const SNAP_ANIMATION_MS = 250;
  const EDGE_CLASS = "edge-minimize";
  const SIDE_CLASSES = ["edge-left", "edge-right"];
  const SNAP_ANIM_CLASS = "edge-snapping";
  let snapping = false;
  let headerDragging = false;
  let dropZone;
  function getContainer() {
    var _a, _b;
    return (_b = (_a = lib.$elements.root) == null ? void 0 : _a.querySelector("container-element")) != null ? _b : void 0;
  }
  function updateEdgeMode() {
    const container2 = getContainer();
    if (!container2 || snapping)
      return;
    const render2 = BackgroundProject.scripts.render;
    const clientWidth = document.documentElement.clientWidth;
    const centerX = container2.offsetLeft + container2.offsetWidth / 2;
    const side = render2.cfg.visual !== "minimize" ? void 0 : centerX <= EDGE_WIDTH ? "left" : centerX >= clientWidth - EDGE_WIDTH ? "right" : void 0;
    if (side) {
      const snappedX = side === "left" ? 0 : clientWidth - ICON_SIZE;
      container2.classList.add(EDGE_CLASS);
      container2.classList.remove(...SIDE_CLASSES);
      container2.classList.add(`edge-${side}`);
      if (lib.$elements.tooltipContainer) {
        lib.$elements.tooltipContainer.style.display = "none";
      }
      if (container2.offsetLeft !== snappedX) {
        snapping = true;
        container2.classList.add(SNAP_ANIM_CLASS);
        render2.methods.setPosition(snappedX, container2.offsetTop);
        setTimeout(() => {
          container2.classList.remove(SNAP_ANIM_CLASS);
          snapping = false;
        }, SNAP_ANIMATION_MS);
      }
    } else {
      container2.classList.remove(EDGE_CLASS, ...SIDE_CLASSES);
    }
  }
  function ensureDropZone() {
    if (!dropZone && lib.$elements.root) {
      dropZone = lib.h("div", { className: "edge-drop-zone" }, [
        lib.h("span", { className: "edge-drop-zone-tip" }, "松手自动吸附")
      ]);
      lib.$elements.root.append(dropZone);
    }
    return dropZone;
  }
  function updateDropZone(clientX) {
    const zone = ensureDropZone();
    if (!zone)
      return;
    const clientWidth = document.documentElement.clientWidth;
    const side = BackgroundProject.scripts.render.cfg.visual !== "minimize" ? void 0 : clientX <= EDGE_WIDTH ? "left" : clientX >= clientWidth - EDGE_WIDTH ? "right" : void 0;
    zone.classList.toggle("show", !!side);
    zone.classList.toggle("zone-left", side === "left");
    zone.classList.toggle("zone-right", side === "right");
  }
  function hideDropZone() {
    dropZone == null ? void 0 : dropZone.classList.remove("show", "zone-left", "zone-right");
  }
  function ensurePanelInViewport(container2) {
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    const maxX = Math.max(clientWidth - container2.offsetWidth, 0);
    const maxY = Math.max(clientHeight - container2.offsetHeight, 10);
    const x = Math.min(Math.max(container2.offsetLeft, 0), maxX);
    const y = Math.min(Math.max(container2.offsetTop, 10), maxY);
    if (x !== container2.offsetLeft || y !== container2.offsetTop) {
      BackgroundProject.scripts.render.methods.setPosition(x, y);
    }
  }
  function enableIconDraggable(icon, container2) {
    icon.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const startTop = container2.offsetTop;
      const side = container2.classList.contains("edge-right") ? "right" : "left";
      let dragging = false;
      let exited = false;
      const onMove = (ev) => {
        if (!dragging && Math.hypot(ev.clientX - startX, ev.clientY - startY) > 6) {
          dragging = true;
        }
        if (!dragging)
          return;
        const clientWidth = document.documentElement.clientWidth;
        const outOfZone = side === "left" ? ev.clientX > EDGE_WIDTH + ICON_SIZE : ev.clientX < clientWidth - EDGE_WIDTH - ICON_SIZE;
        if (outOfZone && !exited) {
          exited = true;
          container2.classList.remove(EDGE_CLASS, ...SIDE_CLASSES);
        }
        if (exited) {
          container2.style.left = ev.clientX - ICON_SIZE / 2 + "px";
        }
        container2.style.top = Math.max(startTop + (ev.clientY - startY), 10) + "px";
      };
      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        if (dragging) {
          BackgroundProject.scripts.render.methods.setPosition(container2.offsetLeft, container2.offsetTop);
          updateEdgeMode();
        } else {
          BackgroundProject.scripts.render.methods.normal();
          requestAnimationFrame(() => ensurePanelInViewport(container2));
        }
      };
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    });
  }
  let inited = false;
  function initEdgeMinimize(retry = 3) {
    var _a;
    if (inited)
      return;
    const container2 = getContainer();
    if (!container2) {
      if (retry > 0) {
        setTimeout(() => initEdgeMinimize(retry - 1), 1e3);
      }
      return;
    }
    inited = true;
    const render2 = BackgroundProject.scripts.render;
    const edgeIcon = lib.h("div", {
      className: "edge-minimize-icon",
      innerHTML: logoSvg,
      title: "点击展开窗口，或沿边缘拖动"
    });
    container2.append(edgeIcon);
    enableIconDraggable(edgeIcon, container2);
    ensureDropZone();
    (_a = container2.querySelector("header-element")) == null ? void 0 : _a.addEventListener("pointerdown", () => {
      headerDragging = true;
    });
    document.addEventListener("pointermove", (e) => {
      if (headerDragging)
        updateDropZone(e.clientX);
    });
    document.addEventListener("pointerup", () => {
      if (headerDragging) {
        headerDragging = false;
        hideDropZone();
        updateEdgeMode();
      }
    });
    document.addEventListener("pointercancel", () => {
      headerDragging = false;
      hideDropZone();
    });
    render2.onConfigChange("visual", () => updateEdgeMode());
    render2.onConfigChange("x", () => updateEdgeMode());
    window.addEventListener("resize", () => updateEdgeMode());
    updateEdgeMode();
  }
  const TAB_WORK_RESULTS_KEY = "common.work-results.results";
  const CommonEvents = {
    emitAnswererChanged: lib.cors.defineTopFunction((curr, pre) => {
      CommonProject.scripts.settings.emit("answerer-wrapper-change", curr, pre);
    }),
    emitWorkerChanged: lib.cors.defineTopFunction((result) => {
      CommonProject.scripts.workResults.emit("work-current-result-change", result);
    }),
    emitWorkerStateChange: lib.cors.defineTopFunction((workerState) => {
      state$1.workResult.isWorkerWorking = workerState === "start";
      workerWorkingChangeListeners.forEach((listener) => listener());
      CommonProject.scripts.workResults.emit("work-state-change", workerState);
    })
  };
  const count = (results) => ({
    total: results.length,
    requested: results.filter((r) => r.requested).length,
    resolved: results.filter((r) => r.resolved).length
  });
  const cacheIfFinished = (result) => {
    if (CommonProject.scripts.settings.cfg.enableQuestionCaches === false) {
      return;
    }
    if (result.finish === true) {
      BackgroundProject.scripts.data.methods.addQuestionCacheFromWorkResult([result]);
    }
  };
  const workerWorkingChangeListeners = /* @__PURE__ */ new Set();
  const state$1 = {
    workResult: {
      isWorkerWorking: false,
      questionPositionSyncHandler: {
        cx: (index) => {
          var _a;
          const el = (_a = document.querySelectorAll('[id*="sigleQuestionDiv"], .questionLi')) == null ? void 0 : _a.item(index);
          if (el) {
            window.scrollTo({
              top: el.getBoundingClientRect().top + window.pageYOffset - 50,
              behavior: "smooth"
            });
          }
        }
      }
    },
    setting: {
      imageOptimizeMessage: void 0
    }
  };
  const CommonProject = lib.Project.create({
    name: "通用",
    domains: [],
    scripts: {
      settings: new lib.Script({
        name: "⚙️ 全局设置",
        matches: [["所有页面", /.*/]],
        namespace: "common.settings",
        configs: {
          notes: {
            defaultValue: lib.$ui.notes([
              "✨鼠标移动到按钮或者输入框，可以看到提示！",
              "① 总开关：关闭后不自动刷课、不自动答题（只想浏览课程时用）；面板手动「开始」仍可用。",
              "② 自动答题前，请在下方填写“模型提供商”与“模型 API Key”，并可点「测试连接」确认可用。",
              "③ 答题结果面板支持「复制答案」；填空题多空时按空逐个显示与复制。"
            ]).outerHTML
          },
          cxMasterSwitch: {
            label: "总开关（关闭后不自动刷课、不自动答题）",
            attrs: {
              type: "checkbox",
              title: "默认开启。关闭后，进入课程页不会自动开始刷课，也不会自动处理章节测验/作业/考试，方便你只是单纯浏览课程内容。\n注意：关闭后仍可在脚本面板上手动点击“开始”临时运行一次。"
            },
            defaultValue: true
          },
          answererWrappers: {
            defaultValue: []
          },
          disabledAnswererWrapperNames: {
            defaultValue: []
          },
          imageOptimizeWarnRecords: {
            defaultValue: []
          },
          cxModelProvider: {
            separator: "模型接入（本分支）",
            label: "提供商",
            tag: "select",
            options: Object.keys(CX_PROVIDERS).map((k) => [k, CX_PROVIDERS[k].label]),
            attrs: {
              title: "本分支只允许这两个提供商。模型固定为 " + CX_LOCKED_MODEL + "，不提供修改入口。"
            },
            defaultValue: "opencode-go"
          },
          cxModelDebug: {
            label: "调试：打印模型请求与响应",
            attrs: {
              type: "checkbox",
              title: "打开后每次答题会在控制台打印实际发送的 prompt（含题干与带标号的选项）以及模型的原始响应。用于核对选项是否真的带上了。"
            },
            defaultValue: false
          },
          cxModelVision: {
            label: "允许图片题（题目图片一起发给模型）",
            attrs: {
              type: "checkbox",
              title: "开启后：自动抓取题干与选项里的图片，转成 base64 一并发给模型。\n成本：DeepSeek 文档口径为单图最多占 384 tokens，与文本同价。\n适用：题干或选项是图片、纯文字答不出的题。\n本项会自动等效于开启上游的「图片题优化」，无需另外设置。"
            },
            defaultValue: false
          },
          cxScreenshot: {
            label: "题干/选项取不到时截图给模型",
            attrs: {
              type: "checkbox",
              title: "开启后：当题干文本为空、或题目图片转换失败时，把题目区域渲染成图片一并发给模型（需同时开启「允许图片题」）。\n已知限制：SVG 渲染不加载页面自定义字体，因此对「混淆字体」类题目可能仍然无效；复杂布局的还原是近似的。\n只在文本路径明显不够用时才截图，不做无条件截图。"
            },
            defaultValue: false
          },
          cxModelApiKey: {
            label: "模型 API Key",
            attrs: {
              type: "password",
              autocomplete: "off",
              spellcheck: false,
              title: "只保存在本地脚本存储中，不会写入任何文件；除所选提供商外不会发往任何地址。未填写时不会发出任何请求。\n安全边界（如实说明）：浏览器本地存储无法对“能访问本机或浏览器配置的人”保密，加密密钥若也存在本地等于自我安慰。有效的做法是——① 界面遮罩、不写日志 ② 不用时一键清除 ③ 使用“有额度上限、可随时吊销”的受限 Key。"
            },
            defaultValue: "",
            suffixSlot() {
              const mkBtn = (text, title, onclick) => {
                const b = lib.h("button", { className: "base-style-button-secondary", title }, text);
                b.onclick = onclick;
                return b;
              };
              const cfg = CommonProject.scripts.settings.cfg;
              return lib.h("div", { style: { display: "inline-flex", gap: "4px", flexWrap: "wrap" } }, [
                mkBtn("🔌 测试连接", "用最小请求验证“提供商 + Key”是否可用", async () => {
                  const res = await testModelConnection(cfg.cxModelProvider, cfg.cxModelApiKey);
                  if (res.ok) {
                    lib.$message.success({ content: res.message, duration: 8 });
                  } else {
                    lib.$modal.alert({
                      title: "⛔ 模型连接失败",
                      content: lib.$ui.notes([res.message, "请检查 Key 是否正确、是否有该模型权限、网络是否可达。"]),
                      confirmButtonText: "知道了"
                    });
                  }
                }),
                mkBtn("🗑 清除", "从本地存储中删除已保存的 API Key", () => {
                  cfg.cxModelApiKey = "";
                  lib.$message.success({ content: "已清除本地保存的 API Key", duration: 6 });
                })
              ]);
            }
          },
          cxWorkEnabled: {
            separator: "作业/考试自动作答（默认关闭）",
            label: "开启作业/考试自动作答",
            attrs: {
              type: "checkbox",
              title: "默认关闭。开启后仍不会自动开始：进入作业/考试页面会先弹出预检结果与风险提示，必须由你手动点「开始作答」。"
            },
            defaultValue: false
          },
          cxWorkConsent: {
            label: "责任声明：我已了解风险由我自己承担",
            attrs: {
              type: "checkbox",
              title: "勾选后方可启用作业/考试自动作答。你需要自行承担全部风险，包括但不限于：成绩判定、学术诚信处理（部分学校按作弊处理）、课程学习记录异常。"
            },
            defaultValue: false
          },
          cxExamEnabled: {
            label: "考试单独授权",
            attrs: {
              type: "checkbox",
              title: "考试风险显著高于作业（多数学校按学术不端处理），因此需单独授权。未勾选时遇到考试页面会直接拒绝作答。\n人脸识别与人机验证码不会因授权而放行 —— 出现即停手，必须人工完成。"
            },
            defaultValue: false
          },
          upload: {
            elementClassName: "config-details",
            showIf: "common.settings.advancedSettings",
            label: "章节测验提交阈值",
            tag: "select",
            defaultValue: 80,
            options: [
              [
                "save",
                "自动保存（不提交）",
                "答题结束后自动保存答案，但不会提交试卷。注意：如果开启了随机作答，保存后可能无法分辨答案是否正确。"
              ],
              [
                "nomove",
                "不保存也不提交",
                "答题结束后不进行任何保存或提交，等待时间过后自动进入下一节，适合测试脚本时使用。"
              ],
              ...[10, 20, 30, 40, 50, 60, 70, 80, 90].map((rate) => [
                rate,
                `搜到 ${rate}%的答案就自动提交`,
                `例如共100道题，只要有 ${rate} 道题搜索到答案，就会自动提交试卷（答案不一定正确）。`
              ]),
              ["100", "全部题目都搜到答案才提交", "所有题目都搜索到答案后才自动提交试卷（答案不一定正确）。"],
              [
                "force",
                "不管有没有答案都强制提交",
                "不管是否搜到答案、答案是否正确，答题结束后直接强制提交试卷。风险较高，如需开启请配合随机作答谨慎使用。"
              ]
            ],
            attrs: {
              title: "提交方式（提交率）：设置自动答题结束后如何保存/提交答案\n鼠标悬浮在选项上可以查看每个选项的具体解释。\n\n注意：提交率无法控制题库的正确率，题库搜索到的答案不一定正确。"
            }
          },
          "work-when-no-job": {
            defaultValue: false,
            label: "强制答题（仅超星）",
            attrs: {
              type: "checkbox",
              title: "当章节测试左上角并没有黄色任务点的时候依然进行答题（没有任务点说明此作业可能不计入总成绩，如果老师要求则可以开启）"
            }
          },
          advancedSettings: {
            ...dropdownStyle,
            defaultValue: false,
            label: "高级设置",
            attrs: { type: "checkbox", title: "请谨慎使用高级设置，可能会影响答题效果，小白在未理解的情况下谨慎调整。" }
          },
          thread: {
            showIf: "common.settings.advancedSettings",
            elementClassName: "config-details",
            label: "并发题目数",
            attrs: {
              type: "number",
              min: 1,
              step: 1,
              max: 3,
              title: "同一时间内答题线程工作的数量（例子：三个线程则代表一秒内同时搜索三道题），过多可能导致题库服务器压力过大，请适当调低。"
            },
            defaultValue: 1
          },
          imageOptimize: {
            showIf: "common.settings.advancedSettings",
            elementClassName: "config-details",
            label: "图片题优化",
            attrs: {
              type: "checkbox",
              title: "把题干/选项中的图片与题干文本一并提供给模型，用于解答图片题（防止防盗链等导致图片无法加载）。开启“允许图片题”时会自动等效开启本项，通常无需单独调整。"
            },
            defaultValue: true
          },
          answerWrapperHandlerTimeout: {
            showIf: "common.settings.advancedSettings",
            elementClassName: "config-details",
            label: "模型请求超时（秒）",
            attrs: {
              type: "number",
              min: 10,
              step: 1,
              max: 3 * 60,
              title: "搜题超时时间，单位为秒，超过这个时间直接放弃，进行下一题搜索。"
            },
            defaultValue: 120
          },
          stopSecondWhenFinish: {
            showIf: "common.settings.advancedSettings",
            elementClassName: "config-details",
            label: "交卷前停留（秒）",
            attrs: {
              type: "number",
              min: 3,
              step: 1,
              max: 9999,
              title: "自动答题脚本结束后暂停的时间（方便查看和检查）。"
            },
            defaultValue: 3
          },
          period: {
            showIf: "common.settings.advancedSettings",
            elementClassName: "config-details",
            label: "每题处理间隔（秒）",
            attrs: {
              type: "number",
              min: 1,
              step: 1,
              max: 60,
              title: "每道题的搜题间隔时间，不建议太低，避免增加服务器压力。"
            },
            defaultValue: 3
          },
          answerSeparators: {
            showIf: "common.settings.advancedSettings",
            elementClassName: "config-details",
            label: "答案分隔符",
            attrs: {
              title: "分隔答案的符号，例如：答案1#答案2#答案3，分隔符为 #， 使用英文逗号进行隔开 : ',' "
            },
            defaultValue: ["===", "#", "---", "###", "|", ";", "；"].join(","),
            onload(el) {
              el.addEventListener("change", () => {
                if (String(el.value).trim() === "") {
                  el.value = el.defaultValue;
                }
              });
            }
          },
          redundanceWordsText: {
            showIf: "common.settings.advancedSettings",
            elementClassName: "config-details",
            defaultValue: [
              "单选题(必考)",
              "填空题(必考)",
              "多选题(必考)",
              "(单选题)",
              "(多选题)",
              "(判断题)",
              "(填空题)",
              "【单选题】",
              "【多选题】",
              "【填空题】",
              "【判断题】",
              "【單選题】",
              "【多選题】",
              "【判斷题】",
              "【Single Choice】",
              "【Multiple Choice】",
              "【single choice】",
              "【multiple choice】",
              "【True or False】"
            ].join("\n"),
            label: "题目冗余字段自动删除",
            tag: "textarea",
            attrs: {
              title: "在搜题的时候自动删除多余的文字，以便提高搜题的准确度，每行一个。",
              style: { minWidth: "200px", minHeight: "50px" }
            },
            onload(el) {
              el.addEventListener("change", () => {
                if (String(el.value).trim() === "")
                  el.value = el.defaultValue;
              });
            }
          },
          notification: {
            elementClassName: "config-details",
            showIf: "common.settings.advancedSettings",
            separator: "其他设置",
            label: "系统通知",
            attrs: {
              title: "允许脚本发送系统通知，只有重要事情发生时会发送系统通知，尽量避免用户受到骚扰（在电脑屏幕右侧显示通知弹窗，例如脚本执行完毕，图形验证码，版本更新等通知）。"
            },
            tag: "select",
            defaultValue: "only-notify",
            suffixSlot: function() {
              const btn = lib.h("button", { className: "base-style-button-secondary" }, "📢测试通知");
              btn.onclick = () => {
                this.methods.notificationBySetting("这是一条测试通知");
              };
              return btn;
            },
            options: [
              ["only-notify", "只显示右下角通知"],
              ["notify-and-voice", "通知以及提示音（叮的一声）"],
              ["all", "通知，提示音，以及任务栏闪烁提示"],
              ["no-notify", "关闭系统通知"]
            ]
          },
          enableQuestionCaches: {
            elementClassName: "config-details",
            showIf: "common.settings.advancedSettings",
            label: "答题缓存（同一题不重复请求模型）",
            defaultValue: true,
            attrs: { type: "checkbox" },
            suffixSlot: function() {
              const btn = lib.h("button", { className: "base-style-button-secondary" }, "⚙️管理缓存");
              btn.onclick = () => {
                BackgroundProject.scripts.data.methods.showQuestionCaches();
              };
              return btn;
            }
          }
        },
        methods() {
          return {
            getWorkOptions: () => {
              const workOptions = JSON.parse(JSON.stringify(this.cfg));
              workOptions.answererWrappers = buildModelAnswererWrappers(
                this.cfg.cxModelProvider,
                this.cfg.cxModelApiKey,
                this.cfg.cxModelDebug === true,
                this.cfg.cxModelVision === true
              );
              return workOptions;
            },
            notificationBySetting: (content, opts) => {
              var _a;
              if (this.cfg.notification !== "no-notify") {
                lib.$gm.notification(content, {
                  extraTitle: opts == null ? void 0 : opts.extraTitle,
                  duration: (_a = opts == null ? void 0 : opts.duration) != null ? _a : 30,
                  important: this.cfg.notification === "all",
                  silent: this.cfg.notification === "only-notify"
                });
              }
            }
          };
        },
        oncomplete() {
          AnswerWrapperHandlerConfig.timeout_seconds = this.cfg.answerWrapperHandlerTimeout;
          this.onConfigChange("answerWrapperHandlerTimeout", (sec) => {
            AnswerWrapperHandlerConfig.timeout_seconds = sec;
          });
          const checkImageOptimizeCompatibility = () => {
            var _a;
            if (self !== top) {
              return;
            }
            const wrappers = this.cfg.answererWrappers || [];
            if (!this.cfg.imageOptimize || wrappers.length === 0 || isAnswererWrappersSupportImageOptimize(wrappers)) {
              (_a = state$1.setting.imageOptimizeMessage) == null ? void 0 : _a.remove();
              state$1.setting.imageOptimizeMessage = void 0;
              return;
            }
            const signature = createAnswererWrappersSignature(wrappers);
            if (this.cfg.imageOptimizeWarnRecords.includes(signature)) {
              return;
            }
            if (!state$1.setting.imageOptimizeMessage) {
              state$1.setting.imageOptimizeMessage = lib.$message.warn({
                content: lib.h("div", [
                  "当前题库配置暂不支持图片、公式等题目处理",
                  lib.h("br"),
                  "请前往题库配置源头获取新配置并重新配置题库，否则图片题优化功能无法生效。"
                ]),
                duration: 0,
                onClose: () => {
                  if (!this.cfg.imageOptimizeWarnRecords.includes(signature)) {
                    this.cfg.imageOptimizeWarnRecords = [...this.cfg.imageOptimizeWarnRecords, signature].slice(-50);
                  }
                  state$1.setting.imageOptimizeMessage = void 0;
                }
              });
            }
          };
          checkImageOptimizeCompatibility();
          this.onConfigChange("imageOptimize", () => checkImageOptimizeCompatibility());
          this.onConfigChange("answererWrappers", () => checkImageOptimizeCompatibility());
        }
      }).withEvents(),
      workResults: new lib.Script({
        name: "🔎 搜索结果",
        matches: [["所有页面", /.*/]],
        namespace: "common.work-results",
        configs: {
          notes: {
            defaultValue: lib.$ui.notes([
              "点击题目序号可定位到页面中的该题",
              "每题的答案都支持「复制答案」；填空题多空时按空逐个复制",
              "需要自动填入答题框时，点该题的「填入」按钮（作业/考试不会自动填入或提交）"
            ]).outerHTML
          },
          currentResultIndex: {
            defaultValue: 0
          },
          dynamicResults: {
            defaultValue: false
          },
          questionPositionSyncHandlerType: {
            defaultValue: void 0
          }
        },
        methods() {
          return {
            update: async (index, result) => {
              const data = await lib.$store.getTab(TAB_WORK_RESULTS_KEY) || [];
              const placeholder = {
                question: "",
                searchInfos: [],
                requested: false,
                resolved: false,
                type: void 0
              };
              while (data.length < index) {
                data.push(placeholder);
              }
              data[index] = result;
              await lib.$store.setTab(TAB_WORK_RESULTS_KEY, data);
              cacheIfFinished(result);
              CommonEvents.emitWorkerChanged(result);
            },
            fillAll: async (results) => {
              await lib.$store.setTab(TAB_WORK_RESULTS_KEY, results);
            },
            append: async (result) => {
              CommonProject.scripts.workResults.cfg.dynamicResults = true;
              const data = await lib.$store.getTab(TAB_WORK_RESULTS_KEY) || [];
              const index = result.question ? data.findIndex((r) => r.question === result.question) : -1;
              if (index >= 0) {
                data[index] = result;
              } else {
                data.push(result);
              }
              await lib.$store.setTab(TAB_WORK_RESULTS_KEY, data);
              cacheIfFinished(result);
              CommonEvents.emitWorkerChanged(result);
            },
            clearResults: () => {
              return lib.$store.setTab(TAB_WORK_RESULTS_KEY, []);
            },
            getResults() {
              return lib.$store.getTab(TAB_WORK_RESULTS_KEY) || void 0;
            },
            init(opts) {
              var _a;
              CommonProject.scripts.workResults.cfg.questionPositionSyncHandlerType = opts == null ? void 0 : opts.questionPositionSyncHandlerType;
              CommonProject.scripts.workResults.cfg.dynamicResults = (_a = opts == null ? void 0 : opts.dynamic) != null ? _a : false;
              CommonProject.scripts.workResults.methods.clearResults();
            },
            createWorkResultsPanel: (mount2) => {
              const container2 = mount2 || lib.h("div");
              container2.style.width = "400px";
              let scrollPercent = 0;
              const list = lib.$ui.tooltip(lib.h("div", { className: "work-result-list" }));
              list.onscroll = () => {
                scrollPercent = list.scrollTop / list.scrollHeight;
              };
              const setNumStyle = (result, num, index) => {
                var _a;
                if (result.searching) {
                  num.classList.add("searching");
                }
                if (result.requested) {
                  num.classList.add("requested");
                }
                if (index === this.cfg.currentResultIndex) {
                  num.classList.add("active");
                }
                if (result.finish) {
                  num.classList.add("finish");
                } else {
                  if (result.requested && result.resolved && (((_a = result.error) == null ? void 0 : _a.trim().length) !== 0 || result.searchInfos.length === 0 || result.finish === false)) {
                    num.classList.add("error");
                  }
                }
              };
              const render2 = debounce_1$1(async (first) => {
                let results = await CommonProject.scripts.workResults.methods.getResults();
                if (results == null ? void 0 : results.length) {
                  if (first) {
                    results = results.map((r) => {
                      r.searching = false;
                      return r;
                    });
                  }
                  const stats = count(results);
                  if (results[this.cfg.currentResultIndex] === void 0) {
                    this.cfg.currentResultIndex = 0;
                  }
                  const resultContainer = lib.h("div", { className: "work-result-container" });
                  const baseInfos = [
                    `已搜题: ${stats.requested}/${stats.total}`,
                    `已答题: ${stats.resolved}/${stats.total}`,
                    "⚪ 白色序号：等待处理中",
                    "🔵 蓝边序号：已完成搜索",
                    "🔵 蓝色序号：已搜索已答题",
                    "🔴 红色序号：搜索失败或没答案/不匹配等情况",
                    "",
                    "👉点击序号，查看搜索结果"
                  ];
                  const nums = results.map((result, index) => {
                    return lib.h("span", { className: "search-infos-num", innerText: (index + 1).toString() }, (num) => {
                      setNumStyle(result, num, index);
                      num.onclick = () => {
                        var _a, _b;
                        for (const n of nums) {
                          n.classList.remove("active");
                        }
                        num.classList.add("active");
                        this.cfg.currentResultIndex = index;
                        resultContainer.replaceChildren(createResult(result));
                        if (this.cfg.questionPositionSyncHandlerType) {
                          (_b = (_a = state$1.workResult.questionPositionSyncHandler)[this.cfg.questionPositionSyncHandlerType]) == null ? void 0 : _b.call(_a, index);
                        }
                      };
                    });
                  });
                  const helpIcon = lib.$ui.tooltip(
                    lib.h(
                      "span",
                      {
                        className: "search-infos-help",
                        title: baseInfos.join("\n")
                      },
                      "?"
                    )
                  );
                  list.replaceChildren(helpIcon, ...nums);
                  resultContainer.replaceChildren(createResult(results[this.cfg.currentResultIndex]));
                  container2.replaceChildren(list, resultContainer);
                  list.scrollTo({
                    top: scrollPercent * list.scrollHeight,
                    behavior: "auto"
                  });
                  if (this.cfg.dynamicResults && !state$1.workResult.isWorkerWorking) {
                    container2.append(
                      lib.h("div", { style: { textAlign: "right", marginTop: "8px" } }, [
                        lib.$ui.tooltip(
                          lib.$ui.button("清空搜索结果", { className: "base-style-button-secondary" }, (btn) => {
                            btn.title = "当前为动态答题模式（题目逐题加载，结果累积显示），不会自动清空搜索结果\n点击后清空搜索结果";
                            btn.onclick = () => {
                              var _a, _b, _c, _d;
                              this.methods.clearResults();
                              const { panel, header: header2 } = CXProject.scripts.work;
                              if (panel && header2) {
                                (_b = (_a = CXProject.scripts.work).onrender) == null ? void 0 : _b.call(_a, { panel, header: header2 });
                                (_d = (_c = CommonProject.scripts.workResults).onrender) == null ? void 0 : _d.call(_c, { panel, header: header2 });
                              }
                            };
                          })
                        )
                      ])
                    );
                  }
                } else {
                  container2.replaceChildren(
                    lib.h("div", { className: "alert-info-wrapper" }, [
                      lib.h("div", "暂无任何搜索结果~", (div) => {
                        div.style.marginTop = "12px";
                        div.className = "result-info no-answer";
                      })
                    ])
                  );
                }
              }, 100);
              const createResult = (result) => {
                if (result) {
                  return lib.h("div", [
                    createSearchResultAlertElement(result),
                    lib.h(SearchInfosElement, {
                      infos: result.searchInfos,
                      question: result.question,
                      type: result.type,
                      kindLabel: result.kindLabel,
                      randomFilled: result.randomFilled,
                      needsManual: result.needsManual
                    })
                  ]);
                } else {
                  return lib.h("div", "undefined");
                }
              };
              render2(true);
              lib.$store.addTabChangeListener(TAB_WORK_RESULTS_KEY, render2);
              workerWorkingChangeListeners.add(() => render2(false));
              return container2;
            }
          };
        },
        onrender({ panel }) {
          panel.body.replaceChildren(this.methods.createWorkResultsPanel());
        },
        oncomplete() {
          let working_msg;
          CommonProject.scripts.workResults.on("work-state-change", (workerState) => {
            if (workerState === "start") {
              working_msg == null ? void 0 : working_msg.remove();
              working_msg = lib.$message.info({ content: loadingSpinSvg + " 正在搜题中...", duration: 0 });
            } else {
              working_msg == null ? void 0 : working_msg.remove();
              working_msg = void 0;
            }
          });
          CommonProject.scripts.workResults.on("work-current-result-change", (cur) => {
            if (cur.searching) {
              if (working_msg)
                working_msg.innerHTML = loadingSpinSvg + ` 正在搜题 ${cur.question}`;
            }
          });
        }
      }).withEvents(),
      edgeMinimize: new lib.Script({
        name: "边缘最小化图标模式",
        matches: [["所有页面", /.*/]],
        hideInPanel: true,
        onactive() {
          if (self !== top) {
            return;
          }
          initEdgeMinimize();
        }
      }),
      hack: new lib.Script({
        name: "页面复制粘贴限制解除",
        matches: [["所有页面", /.*/]],
        hideInPanel: true,
        onactive() {
          enableCopy([document, document.body]);
        },
        oncomplete() {
          enableCopy([document, document.body]);
          insertCopyableStyle();
          setTimeout(() => {
            enableCopy([document, document.body]);
            insertCopyableStyle();
          }, 3e3);
        }
      }),
      disableDialog: new lib.Script({
        name: "禁止弹窗",
        matches: [["所有页面", /.*/]],
        hideInPanel: true,
        priority: 1,
        onstart() {
          function disableDialog(msg) {
            lib.$modal.alert({
              profile: "弹窗来自：" + location.origin,
              content: msg
            });
          }
          try {
            lib.$gm.unsafeWindow.alert = disableDialog;
            window.alert = disableDialog;
          } catch (e) {
            console.error(e);
          }
        }
      })
    }
  });
  function insertCopyableStyle() {
    const style = document.createElement("style");
    style.innerHTML = `
		html * {
		  -webkit-user-select: text !important;
		  -khtml-user-select: text !important;
		  -moz-user-select: text !important;
		  -ms-user-select: text !important;
		  user-select: text !important;
		}`;
    document.head.append(style);
  }
  const typeMismatchTexts = {
    single: "⚠️ 给出的答案和选项不匹配，可能是题库答案错误",
    multiple: "⚠️ 给出的答案和选项不匹配，可能是题库答案错误",
    judgement: "⚠️ 无法选择，可能是题库答案错误",
    completion: "⚠️ 给出的答案无法填入，可能是题库答案错误或者格式错误"
  };
  function createSearchResultAlertElement(result) {
    var _a;
    let info = null;
    let err = result.error || ((_a = result.searchInfos.find((i) => i.error)) == null ? void 0 : _a.error);
    if (result.requested === false && result.resolved === false) {
      info = lib.h("div", { className: "result-info unresolved" }, "等待搜索中... 🔍");
    } else if (err) {
      if (err == null ? void 0 : err.includes("is not valid JSON")) {
        err = "题库返回数据错误";
      } else if (err == null ? void 0 : err.includes("题库连接失败")) {
        err = "题库连接失败";
      }
      info = lib.h("div", { className: "result-info error" }, ["❌ " + err]);
    } else if (result.searchInfos.length === 0) {
      info = lib.h("div", { className: "result-info no-answer" }, "❌ 题库没搜索到答案");
    } else {
      const mismatchText = result.type && typeMismatchTexts[result.type] || typeMismatchTexts.single;
      info = result.finish ? null : result.resolved === false ? lib.h("div", { className: "result-info unresolved" }, "等待顺序答题中... ⏱️") : lib.h("div", { className: "result-info warn" }, mismatchText);
    }
    return lib.h("div", { className: "alert-info-wrapper" }, [info != null ? info : lib.h("div")]);
  }
  const refTableCache = /* @__PURE__ */ new Map();
  function unpackBits(packed, offset, count2, dims) {
    const bytesPerGlyph = dims / 8;
    const out = new Uint8Array(count2 * dims);
    for (let i = 0; i < count2; i++) {
      const pBase = offset + i * bytesPerGlyph;
      const oBase = i * dims;
      for (let b = 0; b < bytesPerGlyph; b++) {
        const byte = packed[pBase + b];
        for (let k = 0; k < 8; k++) {
          out[oBase + b * 8 + k] = byte >> 7 - k & 1;
        }
      }
    }
    return out;
  }
  function loadRefTable(url) {
    let cached = refTableCache.get(url);
    if (!cached) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3e4);
      cached = fetch(url, { signal: controller.signal }).then((r) => r.arrayBuffer()).then((buf) => {
        const dv = new DataView(buf);
        const magic = String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3));
        if (magic !== "FRB2") {
          throw new Error("[font-decrypt] 无效的特征表格式: " + magic);
        }
        const count2 = dv.getUint32(4, true);
        const threshold = dv.getUint32(8, true);
        const gc = dv.getUint32(12, true);
        const gf = dv.getUint32(16, true);
        const cps = new Uint32Array(count2);
        let off = 20;
        for (let i = 0; i < count2; i++, off += 4) {
          cps[i] = dv.getUint32(off, true);
        }
        const packed = new Uint8Array(buf);
        const coarse = unpackBits(packed, off, count2, gc * gc);
        off += count2 * gc * gc / 8;
        const fine = unpackBits(packed, off, count2, gf * gf);
        return { count: count2, cps, coarse, fine, gc, gf, threshold };
      });
      cached = cached.then((table) => {
        clearTimeout(timer);
        return table;
      }).catch((err) => {
        clearTimeout(timer);
        refTableCache.delete(url);
        throw err;
      });
      refTableCache.set(url, cached);
    }
    return cached;
  }
  const WORKER_TIMEOUT = 3e4;
  const WORKER_SOURCE = `
'use strict';
var RENDER = 360, SQ = 480, BASELINE = 384, SHORTLIST = 40, INK_THRESHOLD = 40;

var renderCv = null;
function getRenderCtx() {
	if (!renderCv) {
		renderCv = new OffscreenCanvas(SQ, SQ);
		renderCv.ctx = renderCv.getContext('2d', { willReadFrequently: true });
	}
	return renderCv.ctx;
}

var covCv = {};
function isCoveredByFont(fontFamily, ch) {
	var render = function (fallback) {
		var cv = covCv[fallback];
		if (!cv) {
			cv = new OffscreenCanvas(200, 200);
			cv.ctx = cv.getContext('2d', { willReadFrequently: true });
			covCv[fallback] = cv;
		}
		var ctx = cv.ctx;
		ctx.clearRect(0, 0, 200, 200);
		ctx.fillStyle = '#fff';
		ctx.font = '120px "' + fontFamily + '", ' + fallback;
		ctx.textBaseline = 'middle';
		ctx.fillText(ch, 10, 100);
		return ctx.getImageData(0, 0, 200, 200).data;
	};
	var a = render('serif');
	var b = render('sans-serif');
	var diff = 0;
	for (var i = 3; i < a.length; i += 4) {
		diff += Math.abs(a[i] - b[i]);
	}
	return diff < 1000;
}

function renderGlyph(fontFamily, ch, table) {
	var ctx = getRenderCtx();
	ctx.clearRect(0, 0, SQ, SQ);
	ctx.fillStyle = '#fff';
	ctx.font = RENDER + 'px "' + fontFamily + '"';
	ctx.textBaseline = 'alphabetic';
	var advance = ctx.measureText(ch).width;
	ctx.fillText(ch, (SQ - advance) / 2, BASELINE);
	var px = ctx.getImageData(0, 0, SQ, SQ).data;

	var hasInk = false;
	for (var i = 3; i < px.length; i += 4) {
		if (px[i] > INK_THRESHOLD) { hasInk = true; break; }
	}
	if (!hasInk) {
		return null;
	}

	var W = SQ + 1;
	var ii = new Uint32Array(W * W);
	for (var y = 0; y < SQ; y++) {
		var rowSum = 0;
		var srcRow = y * SQ * 4;
		var dstRow = (y + 1) * W;
		var upRow = y * W;
		for (var x = 0; x < SQ; x++) {
			rowSum += px[srcRow + x * 4 + 3];
			ii[dstRow + x + 1] = ii[upRow + x + 1] + rowSum;
		}
	}

	var box = function (n) {
		var b = SQ / n;
		var area = b * b;
		var out = new Uint8Array(n * n);
		for (var gy = 0; gy < n; gy++) {
			for (var gx = 0; gx < n; gx++) {
				var y0 = gy * b;
				var x0 = gx * b;
				var sum = ii[(y0 + b) * W + x0 + b] - ii[y0 * W + x0 + b] - ii[(y0 + b) * W + x0] + ii[y0 * W + x0];
				out[gy * n + gx] = sum / area > table.threshold ? 1 : 0;
			}
		}
		return out;
	};

	return { coarse: box(table.gc), fine: box(table.gf) };
}

function bitDistance(tableArr, idx, dims, q) {
	var s = 0;
	var base = idx * dims;
	for (var i = 0; i < dims; i++) {
		if (tableArr[base + i] !== q[i]) { s++; }
	}
	return s;
}

function crackChar(table, feat) {
	var count = table.count;
	var dists = new Float64Array(count);
	for (var i = 0; i < count; i++) {
		dists[i] = bitDistance(table.coarse, i, table.gc * table.gc, feat.coarse);
	}
	var sorted = Float64Array.from(dists);
	sorted.sort();
	var threshold = sorted[Math.min(SHORTLIST, count) - 1];
	var idx = [];
	for (var j = 0; j < count; j++) {
		if (dists[j] <= threshold) { idx.push(j); }
	}
	var bestI = -1, best = Infinity, second = Infinity;
	for (var k = 0; k < idx.length; k++) {
		var d = bitDistance(table.fine, idx[k], table.gf * table.gf, feat.fine);
		if (d < best) { second = best; best = d; bestI = idx[k]; }
		else if (d < second) { second = d; }
	}
	return {
		ch: String.fromCodePoint(table.cps[bestI]),
		margin: second > 0 ? 1 - best / second : 1
	};
}

self.onmessage = function (e) {
	var msg = e.data;
	(async function () {
		if (typeof FontFace === 'undefined' || typeof OffscreenCanvas === 'undefined' || !self.fonts) {
			throw new Error('worker env unsupported');
		}
		var family = 'font-decrypt-w-' + Math.random().toString(36).slice(2);
		var source = typeof msg.fontSource === 'string' ? 'url("' + msg.fontSource + '")' : msg.fontSource;
		var face = new FontFace(family, source, msg.fontWeight ? { weight: msg.fontWeight } : {});
		await face.load();
		self.fonts.add(face);
		var table = {
			count: msg.count, cps: msg.cps, coarse: msg.coarse, fine: msg.fine,
			gc: msg.gc, gf: msg.gf, threshold: msg.threshold
		};
		var map = {};
		var details = [];
		var uniq = msg.chars;
		for (var i = 0; i < uniq.length; i++) {
			var ch = uniq[i];
			if (!isCoveredByFont(family, ch)) { map[ch] = ch; continue; }
			var feat = renderGlyph(family, ch, table);
			if (!feat) { map[ch] = ch; continue; }
			var r = crackChar(table, feat);
			map[ch] = r.ch;
			details.push({ from: ch, to: r.ch, margin: +r.margin.toFixed(3) });
			self.postMessage({ type: 'progress', done: i + 1, total: uniq.length });
		}
		self.postMessage({ type: 'result', map: map, details: details });
	})().catch(function (err) {
		self.postMessage({ type: 'error', message: String((err && err.message) || err) });
	});
};
`;
  function crackFontInWorker(fontSource, chars, config2, table) {
    return new Promise((resolve) => {
      if (typeof Worker === "undefined" || typeof OffscreenCanvas === "undefined") {
        return resolve(null);
      }
      let worker;
      try {
        const url = URL.createObjectURL(new Blob([WORKER_SOURCE], { type: "application/javascript" }));
        worker = new Worker(url);
        URL.revokeObjectURL(url);
      } catch {
        return resolve(null);
      }
      let settled = false;
      const timer = setTimeout(() => done(null), WORKER_TIMEOUT);
      const done = (r) => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          worker.terminate();
          resolve(r);
        }
      };
      worker.onerror = () => done(null);
      worker.onmessage = (e) => {
        var _a;
        const msg = e.data;
        if (msg.type === "progress") {
          (_a = config2.onProgress) == null ? void 0 : _a.call(config2, msg.done, msg.total);
        } else if (msg.type === "result") {
          done({ map: msg.map, details: msg.details });
        } else if (msg.type === "error") {
          done(null);
        }
      };
      worker.postMessage({
        fontSource,
        chars,
        fontWeight: config2.fontWeight,
        count: table.count,
        cps: table.cps,
        coarse: table.coarse,
        fine: table.fine,
        gc: table.gc,
        gf: table.gf,
        threshold: table.threshold
      });
    });
  }
  const RENDER = 360;
  const SQ = 480;
  const BASELINE = 384;
  const SHORTLIST = 40;
  const INK_THRESHOLD = 40;
  let renderCanvas;
  function getRenderCanvas() {
    if (!renderCanvas) {
      const cv = document.createElement("canvas");
      cv.width = SQ;
      cv.height = SQ;
      renderCanvas = { cv, ctx: cv.getContext("2d", { willReadFrequently: true }) };
    }
    return renderCanvas;
  }
  function renderGlyph(fontFamily, ch, table) {
    const { ctx } = getRenderCanvas();
    ctx.clearRect(0, 0, SQ, SQ);
    ctx.fillStyle = "#fff";
    ctx.font = `${RENDER}px "${fontFamily}"`;
    ctx.textBaseline = "alphabetic";
    const advance = ctx.measureText(ch).width;
    ctx.fillText(ch, (SQ - advance) / 2, BASELINE);
    const px = ctx.getImageData(0, 0, SQ, SQ).data;
    let hasInk = false;
    for (let i = 3; i < px.length; i += 4) {
      if (px[i] > INK_THRESHOLD) {
        hasInk = true;
        break;
      }
    }
    if (!hasInk) {
      return null;
    }
    const W = SQ + 1;
    const ii = new Uint32Array(W * W);
    for (let y = 0; y < SQ; y++) {
      let rowSum = 0;
      const srcRow = y * SQ * 4;
      const dstRow = (y + 1) * W;
      const upRow = y * W;
      for (let x = 0; x < SQ; x++) {
        rowSum += px[srcRow + x * 4 + 3];
        ii[dstRow + x + 1] = ii[upRow + x + 1] + rowSum;
      }
    }
    const box = (n) => {
      const b = SQ / n;
      const area = b * b;
      const out = new Uint8Array(n * n);
      for (let gy = 0; gy < n; gy++) {
        for (let gx = 0; gx < n; gx++) {
          const y0 = gy * b;
          const x0 = gx * b;
          const sum = ii[(y0 + b) * W + x0 + b] - ii[y0 * W + x0 + b] - ii[(y0 + b) * W + x0] + ii[y0 * W + x0];
          out[gy * n + gx] = sum / area > table.threshold ? 1 : 0;
        }
      }
      return out;
    };
    return { coarse: box(table.gc), fine: box(table.gf) };
  }
  const coverageCanvasCache = {};
  function isCoveredByFont(fontFamily, ch) {
    const render2 = (fallback) => {
      var _a;
      const key = fontFamily + "|" + fallback;
      const cv = (_a = coverageCanvasCache[key]) != null ? _a : coverageCanvasCache[key] = (() => {
        const c = document.createElement("canvas");
        c.width = 200;
        c.height = 200;
        return c;
      })();
      const ctx = cv.getContext("2d", { willReadFrequently: true });
      ctx.clearRect(0, 0, 200, 200);
      ctx.fillStyle = "#fff";
      ctx.font = `120px "${fontFamily}", ${fallback}`;
      ctx.textBaseline = "middle";
      ctx.fillText(ch, 10, 100);
      return ctx.getImageData(0, 0, 200, 200).data;
    };
    const a = render2("serif");
    const b = render2("sans-serif");
    let diff = 0;
    for (let i = 3; i < a.length; i += 4) {
      diff += Math.abs(a[i] - b[i]);
    }
    return diff < 1e3;
  }
  function bitDistance(tableArr, idx, dims, q) {
    let s = 0;
    const base = idx * dims;
    for (let i = 0; i < dims; i++) {
      if (tableArr[base + i] !== q[i]) {
        s++;
      }
    }
    return s;
  }
  function crackChar(table, feat) {
    const { count: count2, cps, coarse, fine, gc, gf } = table;
    const dists = new Float64Array(count2);
    for (let i = 0; i < count2; i++) {
      dists[i] = bitDistance(coarse, i, gc * gc, feat.coarse);
    }
    const sorted = Float64Array.from(dists);
    sorted.sort();
    const threshold = sorted[Math.min(SHORTLIST, count2) - 1];
    const idx = [];
    for (let i = 0; i < count2; i++) {
      if (dists[i] <= threshold) {
        idx.push(i);
      }
    }
    let bestI = -1;
    let best = Infinity;
    let second = Infinity;
    for (let k = 0; k < idx.length; k++) {
      const i = idx[k];
      const d = bitDistance(fine, i, gf * gf, feat.fine);
      if (d < best) {
        second = best;
        best = d;
        bestI = i;
      } else if (d < second) {
        second = d;
      }
    }
    return {
      ch: String.fromCodePoint(cps[bestI]),
      best,
      second,
      margin: second > 0 ? 1 - best / second : 1
    };
  }
  async function crackFont(fontSource, chars, config2) {
    var _a;
    const table = await loadRefTable(config2.refTableUrl);
    const uniq = [...new Set(chars)].filter((c) => c.trim() !== "");
    if (config2.useWorker !== false) {
      const r = await crackFontInWorker(fontSource, uniq, config2, table);
      if (r) {
        return r;
      }
    }
    const family = "font-decrypt-" + Math.random().toString(36).slice(2);
    const source = typeof fontSource === "string" ? `url("${fontSource}")` : fontSource;
    const face = new FontFace(family, source, config2.fontWeight ? { weight: config2.fontWeight } : {});
    await Promise.race([
      face.load(),
      new Promise((resolve, reject) => setTimeout(() => reject(new Error("[font-decrypt] 字体加载超时")), 15e3))
    ]);
    document.fonts.add(face);
    const map = {};
    const details = [];
    for (let i = 0; i < uniq.length; i++) {
      const ch = uniq[i];
      if (!isCoveredByFont(family, ch)) {
        map[ch] = ch;
        continue;
      }
      const feat = renderGlyph(family, ch, table);
      if (!feat) {
        map[ch] = ch;
        continue;
      }
      const r = crackChar(table, feat);
      map[ch] = r.ch;
      details.push({ from: ch, to: r.ch, margin: +r.margin.toFixed(3) });
      (_a = config2.onProgress) == null ? void 0 : _a.call(config2, i + 1, uniq.length);
      if (i % 10 === 9) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
    return { map, details };
  }
  function decryptText(text, map) {
    return [...text].map((c) => {
      var _a;
      return (_a = map[c]) != null ? _a : c;
    }).join("");
  }
  function decryptElements(roots, map) {
    var _a;
    for (const root2 of Array.isArray(roots) ? roots : [roots]) {
      const walker = document.createTreeWalker(root2, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }
      for (const node of nodes) {
        node.nodeValue = decryptText((_a = node.nodeValue) != null ? _a : "", map);
      }
    }
  }
  function collectChars(roots) {
    var _a;
    let text = "";
    for (const root2 of Array.isArray(roots) ? roots : [roots]) {
      text += (_a = root2.textContent) != null ? _a : "";
    }
    return text;
  }
  function extractFontFromStyle(doc, fontFamilyMarker) {
    var _a, _b;
    const styleEl = Array.from(doc.head.querySelectorAll("style")).find((s) => {
      var _a2;
      return (_a2 = s.textContent) == null ? void 0 : _a2.includes(fontFamilyMarker);
    });
    const base64 = (_b = (_a = styleEl == null ? void 0 : styleEl.textContent) == null ? void 0 : _a.match(/base64,([\w\W]+?)['")]/)) == null ? void 0 : _b[1];
    if (!base64) {
      return void 0;
    }
    const raw = window.atob(base64);
    const buffer = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      buffer[i] = raw.charCodeAt(i);
    }
    return buffer.buffer;
  }
  async function waitForMedia(options) {
    var _a;
    const timeoutMs = (_a = options == null ? void 0 : options.timeout) != null ? _a : 3 * 60 * 1e3;
    const res = await new Promise((resolve, reject) => {
      let timeoutId;
      const interval = setInterval(() => {
        const video = ((options == null ? void 0 : options.root) || document).querySelector(
          `${(options == null ? void 0 : options.videoSelector) || "video"},${(options == null ? void 0 : options.audioSelector) || "audio"}`
        );
        if (video && (!(options == null ? void 0 : options.filter) || options.filter(video))) {
          clearInterval(interval);
          if (timeoutId !== void 0) {
            clearTimeout(timeoutId);
          }
          resolve(video);
        }
      }, 200);
      timeoutId = setTimeout(() => {
        clearInterval(interval);
        reject(new Error("视频/音频未找到，或者加载超时。"));
      }, timeoutMs);
    });
    return res;
  }
  function waitForElement(selector, opts) {
    return waitFor(() => {
      return typeof selector === "function" ? selector() : document.querySelector(selector);
    }, opts);
  }
  function waitFor(predicate, opts) {
    return new Promise((resolve, reject) => {
      let timeout;
      const interval = setInterval(() => {
        const result = predicate();
        if (result) {
          clearInterval(interval);
          timeout && clearTimeout(timeout);
          resolve(result);
        }
      }, (opts == null ? void 0 : opts.check_period_ms) || 1e3);
      if (opts == null ? void 0 : opts.timeout_seconds) {
        timeout = setTimeout(() => {
          clearInterval(interval);
          resolve(void 0);
        }, ((opts == null ? void 0 : opts.timeout_seconds) || 10) * 1e3);
      }
    });
  }
  function collectAccessibleDocuments(rootDoc) {
    const docs = [];
    const seen = /* @__PURE__ */ new Set();
    const walk = (d) => {
      if (!d || seen.has(d))
        return;
      seen.add(d);
      docs.push(d);
      for (const f of Array.from(d.querySelectorAll("iframe"))) {
        try {
          walk(f.contentDocument);
        } catch {
        }
      }
    };
    walk(rootDoc);
    return docs;
  }
  function searchVideoQuiz(root2) {
    for (const d of collectAccessibleDocuments(root2)) {
      const labels = Array.from(d.querySelectorAll(".ans-videoquiz-opt label"));
      const inputs = Array.from(d.querySelectorAll("input[name='ans-videoquiz-opt']"));
      const options = labels.length ? labels : inputs;
      const submit = d.querySelector("#videoquiz-submit, .ans-videoquiz-submit");
      if (!options.length && !submit)
        continue;
      const texts = options.map((o) => {
        var _a, _b;
        const holder = o.tagName === "INPUT" ? (_b = (_a = o.closest("label")) != null ? _a : o.parentElement) != null ? _b : o : o;
        return (holder.innerText || "").trim();
      });
      return { doc: d, container: d.querySelector(".ans-videoquiz"), submit, options, texts };
    }
    return void 0;
  }
  function findVideoQuiz(rootDoc) {
    var _a, _b;
    const roots = [rootDoc];
    try {
      const topDoc = (_b = (_a = rootDoc.defaultView) == null ? void 0 : _a.top) == null ? void 0 : _b.document;
      if (topDoc && topDoc !== rootDoc)
        roots.push(topDoc);
    } catch {
    }
    for (const root2 of roots) {
      const quiz = searchVideoQuiz(root2);
      if (quiz)
        return quiz;
    }
    return void 0;
  }
  function videoQuizKey(quiz) {
    return quiz.texts.join("|").slice(0, 300);
  }
  function clickVideoQuizOption(el) {
    var _a;
    if (el.tagName === "INPUT") {
      const input = el;
      input.checked = true;
      input.click();
      const view = (_a = input.ownerDocument) == null ? void 0 : _a.defaultView;
      if (view)
        input.dispatchEvent(new view.Event("change", { bubbles: true }));
    } else {
      el.click();
    }
  }
  function pickVideoQuizOptions(answerGroups, texts, multiple) {
    var _a, _b;
    const flat = answerGroups.flat();
    if (multiple) {
      const r2 = resolveMultiple(flat, texts);
      if (r2.finish)
        return (_b = (_a = r2.options) != null ? _a : r2.plainOptions) != null ? _b : [];
      return [];
    }
    if (isJudgementOptions(texts.map((t) => t.trim()))) {
      const r2 = resolveJudgement(answerGroups, texts);
      return r2.finish && r2.option ? [r2.option] : [];
    }
    const r = resolveSingle(flat, texts);
    return r.finish && r.option ? [r.option] : [];
  }
  function hideVideoQuiz(quiz) {
    var _a;
    (_a = quiz.container) == null ? void 0 : _a.remove();
    for (const com of Array.from(quiz.doc.querySelectorAll(".x-component-default"))) {
      com.style.display = "none";
    }
  }
  function optionInput(el) {
    if (el.tagName === "INPUT")
      return el;
    const inner = el.querySelector("input");
    return inner != null ? inner : void 0;
  }
  function isMultipleChoice(quiz) {
    return quiz.options.some((o) => {
      var _a;
      return ((_a = optionInput(o)) == null ? void 0 : _a.type) === "checkbox";
    });
  }
  function probeVideoQuizCandidates(rootDoc) {
    for (const d of collectAccessibleDocuments(rootDoc)) {
      let hits = [];
      try {
        hits = Array.from(
          d.querySelectorAll("[class*=videoquiz], [id*=videoquiz], [class*=ans-video], [name*=videoquiz]")
        ).slice(0, 3);
      } catch {
        continue;
      }
      if (hits.length) {
        const first = hits[0];
        return "发现 " + hits.length + " 个疑似元素；首个 <" + first.tagName.toLowerCase() + "> class=" + JSON.stringify(first.className) + " id=" + JSON.stringify(first.id) + " 文本=" + JSON.stringify((first.innerText || "").slice(0, 80)) + " HTML=" + (first.outerHTML || "").slice(0, 400);
      }
    }
    return void 0;
  }
  function readOptionMarks(quiz) {
    return quiz.options.map((o) => {
      var _a, _b;
      return (_b = (_a = optionInput(o)) == null ? void 0 : _a.getAttribute("value")) != null ? _b : "";
    }).join(",");
  }
  const CX_SECRET_REF_TABLE_URL = "https://cdn.ocsjs.com/resources/font/font_ref_cx.bin";
  let top$1 = globalThis.top;
  try {
    top$1.jobs = top$1.jobs || [];
    top$1.currentMedia = top$1.currentMedia || void 0;
  } catch {
  }
  const state = {
    study: {
      videojs: /* @__PURE__ */ Object.create({}),
      answererWrapperUnsetMessage: void 0
    }
  };
  const CXProject = lib.Project.create({
    name: "超星学习通",
    domains: [
      "chaoxing.com",
      "edu.cn",
      "org.cn",
      "xueyinonline.com",
      "hnsyu.net",
      "qutjxjy.cn",
      "ynny.cn",
      "hnvist.cn",
      "fjlecb.cn",
      "gdhkmooc.com",
      "cugbonline.cn",
      "zjelib.cn",
      "cqrspx.cn",
      "neauce.com",
      "zhihui-yun.com",
      "cqie.cn",
      "ccqmxx.com",
      "jxgmxy.com",
      "jnzyjsxy.cn",
      "smjyxy.cn",
      "sslibrary.com",
      "xuexi365.com"
    ],
    scripts: {
      env: new lib.Script({
        name: "环境准备脚本",
        matches: [["所有页面", /.*/]],
        hideInPanel: true,
        onstart() {
          try {
            let _self = self;
            let _try_count = 10;
            while (_self.parent !== void 0 && _try_count > 0) {
              if (_self.location.href.includes("/mycourse/studentstudy")) {
                top$1 = _self;
                console.log("[ocsjs] top change to " + top$1.location.href);
                break;
              } else {
                _try_count--;
                _self = _self.parent;
              }
            }
          } catch (e) {
            console.warn("[ocsjs] fail of find top");
            console.warn(e);
            top$1 = globalThis.top;
          }
        }
      }),
      guide: new lib.Script({
        name: "💡 使用提示",
        matches: [
          ["首页", "https://www.chaoxing.com"],
          ["旧版个人首页", "chaoxing.com/space/index"],
          ["新版个人首页", "chaoxing.com/base"],
          ["学习页面", "chaoxing.com/mycourse"],
          ["新版学习页面", "chaoxing.com/mooc2-ans/mycourse"]
        ],
        namespace: "cx.guide",
        configs: {
          notes: {
            defaultValue: createSteps(["登录网课平台", "进入任意视频、作业/考试界面", "等待脚本自动运行"]).outerHTML
          }
        },
        oncomplete() {
          if (["mycourse/studentstudy"].some((path) => location.href.includes(path))) {
            lib.$message.success("已进入学习页面，请等待自动运行...");
            return;
          }
          if (self !== top$1)
            return;
          lib.$message.info("请手动进入视频、作业、考试页面，脚本会自动运行。");
        },
        onrender({ panel }) {
          if (lib.$gm.isInGMContext()) {
            const gotoPanel = (scriptKey) => {
              const target = CXProject.scripts[scriptKey];
              target.projectName = CXProject.name;
              BackgroundProject.scripts.render.methods.pin(target);
            };
            panel.body.replaceChildren(
              lib.h("hr"),
              lib.$ui.button("👉 前往学习设置", {}, (btn) => {
                btn.style.marginRight = "12px";
                btn.onclick = () => gotoPanel("study");
              }),
              lib.$ui.button("👉 前往作业设置", {}, (btn) => {
                btn.onclick = () => gotoPanel("work");
              })
            );
          }
        }
      }),
      study: new lib.Script({
        name: "🖥️ 课程学习",
        namespace: "cx.new.study",
        matches: [
          ["任务点页面", "/knowledge/cards"],
          ["阅读任务点", "/readsvr/book/mooc"]
        ],
        configs: {
          notes: {
            defaultValue: lib.$ui.notes([
              ["任务点不是顺序执行，如果某一个任务没有动", "请查看是否有其他任务正在学习，耐心等待即可。"],
              "闯关模式下，前面的任务点没完成可能无法解锁后续章节。",
              "请勿凌晨刷课，部分学校课程可能会清空进度。"
            ]).outerHTML
          },
          volume,
          cxAllowFinishJob: {
            elementClassName: "config-details",
            showIf: "cx.new.study.enables",
            label: "文档/图片阅读自动完成",
            attrs: {
              type: "checkbox",
              title: "默认开启。该任务类型的阅读器位于跳域 iframe（pan-yz.chaoxing.com），脚本无法访问其 DOM，因此 finishJob() 是唯一可行的完成机制；且超星教师手册只对**视频**要求“观看一定时间”，文档无时间门槛。\n关掉后该任务点不会完成，闯关模式下会阻塞章节。"
            },
            defaultValue: true
          },
          videoQuizStrategy: {
            elementClassName: "config-details",
            showIf: "cx.new.study.enables",
            label: "视频内题目",
            tag: "select",
            options: [
              ["ai", "模型作答（答不出时随机）"],
              ["random", "随机作答（上游模式）"],
              ["ignore", "忽略"]
            ],
            attrs: {
              title: "视频有时会在学习过程中弹出题目。默认交给模型作答；模型给不出可用答案时按上游方式随机选一个并提交，避免弹题卡住播放。选“随机作答”则完全按上游方式（不请求模型）；选“忽略”则完全不动弹题。模型作答需先在「通用-全局设置」里配置 API Key。"
            },
            defaultValue: "ai"
          },
          mode: {
            label: "跳转模式",
            tag: "select",
            options: [
              ["next", "完成后跳转下一节", "完成小节后，自动点击下一节按钮"],
              ["job", "完成后跳转未完成任务点", "如果未找到任务点，则会直接结束脚本运行，目前处于试验阶段。"],
              ["manually", "完成后暂停，等待手动跳转", "适用于自己手动运行"]
            ],
            defaultValue: "next"
          },
          restudy: {
            label: "复习模式",
            attrs: { title: "已经完成的视频继续学习", type: "checkbox" },
            defaultValue: false
          },
          enables: {
            ...dropdownStyle,
            label: "高级设置",
            attrs: { type: "checkbox" },
            defaultValue: false
          },
          autoJumpToUnFinishJob: {
            elementClassName: "config-details",
            showIf: "cx.new.study.enables",
            label: "进页面自动跳到第一个未完成点",
            attrs: {
              type: "checkbox",
              title: "进入学习界面后自动前往未完成的任务点，如果关闭则从当前任务点往下学习 （积分课、智慧课程等课程 建议关闭）"
            },
            defaultValue: true
          },
          forceLearn: {
            elementClassName: "config-details",
            showIf: "cx.new.study.enables",
            label: "未完成任务点也学习",
            attrs: {
              title: "视频一般分为：非任务点、任务点、和已完成任务点，当遇到“非任务点”时需要开启此选项才会进行学习",
              type: "checkbox"
            },
            defaultValue: false
          },
          backToFirstWhenFinish: {
            elementClassName: "config-details",
            showIf: "cx.new.study.enables",
            label: "全部完成后从头复习",
            attrs: {
              type: "checkbox",
              title: "当章节已经学习完成至最后一章时，跳转到第一个章节重新开始学习。"
            },
            defaultValue: false
          },
          notifyWhenHasFaceRecognition: {
            elementClassName: "config-details",
            showIf: "cx.new.study.enables",
            label: "出现人脸识别时通知我",
            attrs: {
              type: "checkbox"
            },
            defaultValue: true
          },
          enableMedia: {
            elementClassName: "config-details",
            showIf: "cx.new.study.enables",
            label: "视频/音频自动播放",
            attrs: { type: "checkbox", title: "开启：音频和视频的自动播放" },
            defaultValue: true
          },
          enablePPT: {
            elementClassName: "config-details",
            showIf: "cx.new.study.enables",
            label: "PPT/书籍自动完成",
            attrs: { type: "checkbox", title: "开启：PPT/书籍自动翻阅" },
            defaultValue: true
          },
          enableChapterTest: {
            elementClassName: "config-details",
            showIf: "cx.new.study.enables",
            label: "章节测试自动答题",
            attrs: { type: "checkbox", title: "开启：章节测试自动答题" },
            defaultValue: true
          },
          cxRandomFallback: {
            elementClassName: "config-details",
            showIf: "cx.new.study.enables",
            label: "答不出时随机兜底",
            attrs: {
              type: "checkbox",
              title: "模型搜不到答案时的兜底：选择题随机选一项，填空题随机填入一个占位文案。\n作用：避免因存在未作答题目导致整份测验无法提交。\n代价：该题基本必然判错，并且会写进真实成绩。"
            },
            defaultValue: true
          },
          enableHyperlink: {
            elementClassName: "config-details",
            showIf: "cx.new.study.enables",
            label: "链接任务自动完成",
            attrs: { type: "checkbox", title: "开启：链接任务自动完成" },
            defaultValue: true
          }
        },
        onrender({ panel }) {
          if (!hasModelConfigured(
            CommonProject.scripts.settings.cfg.cxModelProvider,
            CommonProject.scripts.settings.cfg.cxModelApiKey
          )) {
            answerWrapperEmptyWarning(10);
          }
        },
        async onactive() {
          if (/\/readsvr\/book\/mooc/.test(location.href)) {
            if (document.querySelector("#reader")) {
              require(["reader"], (_reader) => {
                waitForElement(".readerPager").then(() => {
                  setTimeout(async () => {
                    var _a;
                    const jumper = document.querySelector("#pagejump");
                    if ((_reader == null ? void 0 : _reader.goPage) && jumper) {
                      const timing = parseInt(((_a = new URL(location.href).searchParams.get("timing")) == null ? void 0 : _a.toString()) || "60") + 3;
                      console.log(timing);
                      await $.sleep(timing * 1e3);
                      jumper.value = "5";
                      jumper.dispatchEvent(new Event("change"));
                      console.log("已跳转正文页");
                      await $.sleep(timing * 1e3);
                      jumper.value = "7";
                      jumper.dispatchEvent(new Event("change"));
                      console.log("已跳转封底页");
                      await $.sleep(timing * 1e3);
                      Array.from(document.querySelectorAll(".readerPager")).filter((el) => el.style.zIndex === "101")[0].click();
                      console.log("阅读完成");
                    }
                  }, 3e3);
                });
              });
            } else {
              $console.log("正在完成书籍/PPT...");
              setTimeout(() => {
                readweb.goto(epage);
              }, 5e3);
            }
            return;
          }
          if (/\/knowledge\/cards/.test(location.href)) {
            const updateMediaState = () => {
              if (top$1.currentMedia) {
                top$1.currentMedia.playbackRate = 1;
                top$1.currentMedia.volume = this.cfg.volume;
              }
            };
            this.onConfigChange("volume", updateMediaState);
            await study(this.cfg);
          }
        }
      }),
      work: new lib.Script({
        name: "✍️ 作业考试脚本",
        matches: [
          ["作业页面", "/mooc2/work/dowork"],
          ["考试整卷预览页面", "/mooc2/exam/preview"],
          ["作业完成界面", "/work/view"]
        ],
        namespace: "cx.new.work",
        configs: { notes: workNotes },
        async oncomplete() {
          if (isAutoStartDisabled()) {
            warnAutoStartDisabled("作答作业/考试");
            return;
          }
          if (location.href.includes("/work/view")) {
            return lib.$message.info("当前作业已提交、自动答题关闭");
          }
          const isExam = /\/exam\/preview/.test(location.href);
          commonWork({
            mount_script: this,
            workerProvider: (opts) => workOrExam(isExam ? "exam" : "work", { ...opts, preview_mode: true })
          });
        }
      }),
      mobilelearn: new lib.Script({
        name: "✍️ 任务列表",
        matches: [
          ["任务列表首页", "/page/active/stuActiveList"],
          ["随堂练习页面", "/page/quiz/stu/answerQuestion2"]
        ],
        namespace: "cx.new.mobilelearn",
        configs: { notes: workNotes },
        async oncomplete() {
          if (location.href.includes("/page/quiz/stu/answerQuestion2")) {
            await waitForElement(".left-question-list");
            await $.sleep(1e3);
            CORSUtils.pinWorkPanel();
            commonWork({
              iframe_control: true,
              workerProvider: (opts) => mobilelearn(opts)
            });
            return;
          }
          CommonEvents.emitWorkerStateChange("close");
        }
      }),
      autoRead: new lib.Script({
        name: "🖥️ 自动阅读",
        matches: [
          ["阅读页面", "/ztnodedetailcontroller/visitnodedetail"],
          ["课程目录", /chaoxing.com\/course\/\d+\.html/],
          ["课程目录", /chaoxing.com\/mooc-ans\/course\/\d+\.html/],
          ["积分课阅读课程目录", "/mooc-ans/zt/portal"]
        ],
        namespace: "cx.new.auto-read",
        configs: {
          notes: {
            defaultValue: lib.$ui.notes(["点击任意章节开始自动阅读", "阅读任务次日才会统计阅读时长"]).outerHTML
          },
          restartAfterFinish: {
            label: "无限阅读",
            attrs: { type: "checkbox", title: "阅读完成最后一章后从头第一章继续阅读" },
            defaultValue: false
          }
        },
        oncomplete() {
          if (isAutoStartDisabled()) {
            warnAutoStartDisabled("进入自动阅读");
            return;
          }
          BackgroundProject.scripts.render.methods.pin(this);
          lib.$message.info("请手动点击任意章节开始自动阅读");
          if (location.href.includes("/ztnodedetailcontroller/visitnodedetail") === false) {
            startAtFirst();
            return;
          }
          let top2 = 0;
          const interval = setInterval(() => {
            top2 += (document.documentElement.scrollHeight - window.innerHeight) / 60;
            window.scrollTo({
              behavior: "smooth",
              top: top2
            });
          }, 1e3);
          setTimeout(() => {
            clearInterval(interval);
            const next = lib.$el(".nodeItem.r i");
            if (next) {
              next.click();
            } else {
              if (this.cfg.restartAfterFinish) {
                setTimeout(() => startAtFirst(), 3e3);
                lib.$message.info({ content: "即将重新从头开始阅读", duration: 10 });
                $console.log("即将重新从头开始阅读");
              } else {
                lib.$message.success({ content: "阅读任务已完成", duration: 0 });
                $console.log("未检测到下一页");
              }
            }
          }, (60 + 3) * 1e3);
          function startAtFirst() {
            const texts = lib.$$el(".course_section .chapterText");
            if (texts.length) {
              texts[0].click();
            }
          }
        }
      }),
      pageRedirect: new lib.Script({
        name: "章节页面自动切换脚本",
        matches: [["课程任务页面", "pageHeader=0"]],
        hideInPanel: true,
        async oncomplete() {
          if (top$1 === window) {
            const a = document.querySelector('a[title="章节"]');
            if (a) {
              await $.sleep(1e3);
              a.click();
              lib.$message.info({
                content: "已经为您自动切换到章节列表页面，手动进入任意章节即可开始自动学习！"
              });
            }
          }
        }
      }),
      versionRedirect: new lib.Script({
        name: "版本切换脚本",
        matches: [
          ["", "mooc2=0"],
          ["", "mycourse/studentcourse"],
          ["", "work/getAllWork"],
          ["", "work/doHomeWorkNew"],
          ["", "exam/test\\?"]
        ],
        hideInPanel: true,
        async oncomplete() {
          if (top$1 === window) {
            lib.$message.warn({
              content: "CXStudy 超星助手不支持旧版超星, 即将切换到超星新版, 如有其他第三方插件请关闭, 可能有兼容问题导致频繁切换。",
              duration: 0
            });
            await $.sleep(2e3);
            await waitForFaceRecognition();
            const experience = document.querySelector(".experience");
            if (experience) {
              experience.click();
            } else {
              const newUrl = new URL(window.location.href);
              if (window.location.href.includes("mooc-ans/mycourse/studentstudy")) {
                newUrl.pathname = "/mycourse/studentstudy";
              }
              const params = newUrl.searchParams;
              let changed = false;
              if (params.get("mooc2") !== "1") {
                params.set("mooc2", "1");
                changed = true;
              }
              if (params.get("newMooc") !== "true") {
                params.set("newMooc", "true");
                changed = true;
              }
              if (changed)
                window.location.replace(newUrl);
            }
          }
        }
      }),
      examRedirect: new lib.Script({
        name: "考试整卷预览脚本",
        hideInPanel: true,
        matches: [
          ["新版考试页面", "exam-ans/exam/test/reVersionTestStartNew"],
          ["新版考试页面2", "mooc-ans/exam/test/reVersionTestStartNew"]
        ],
        configs: { notes: workNotes },
        oncomplete() {
          var _a, _b;
          if ((_b = (_a = lib.$gm.unsafeWindow.document.querySelector(".mark_info")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.includes("不允许整卷预览")) {
            lib.$message.warn({
              content: lib.$ui.notes([
                "由于当前考试禁止整卷预览，各题为独立新页面，只能一个个答题",
                "在考完前禁止手动切换题目，否则会导致重复答题！",
                "完成后或者开考前请手动删除搜索结果！",
                "想加快速度请更改通用-全局设置-高级设置-搜题间隔，设置为 1-3 秒即可。"
              ]),
              duration: 0
            });
            const isExam = /\/exam\/test/.test(location.href);
            const workOptions = CommonProject.scripts.settings.methods.getWorkOptions();
            BackgroundProject.scripts.render.methods.pin(this);
            commonWork({
              mount_script: this,
              start_delay_seconds: workOptions.period,
              workerProvider: (opts) => workOrExam(isExam ? "exam" : "work", { ...opts, preview_mode: false, thread: 1 })
            });
            return;
          }
          lib.$message.info({ content: "即将跳转到整卷预览页面进行考试。" });
          setTimeout(() => lib.$gm.unsafeWindow.topreview(), 3e3);
        }
      }),
      studyDispatcher: new lib.Script({
        name: "课程学习调度器",
        matches: [["课程学习页面", "/mycourse/studentstudy"]],
        namespace: "cx.new.study-dispatcher",
        hideInPanel: true,
        async oncomplete() {
          if (isAutoStartDisabled()) {
            warnAutoStartDisabled("跳转任务点");
            return;
          }
          let chapters = await CXAnalyses.waitForChapterInfos();
          const params = new URLSearchParams(window.location.href);
          const mooc = params.get("mooc2");
          if (mooc === null) {
            params.set("mooc2", "1");
            window.location.replace(decodeURIComponent(params.toString()));
            return;
          }
          if (CXProject.scripts.study.cfg.autoJumpToUnFinishJob) {
            chapters = chapters.filter((chapter) => chapter.unFinishCount !== 0);
            if (chapters.length === 0) {
              lib.$message.warn({ content: "页面任务点数量为空! 请刷新重试!" });
            } else {
              const params2 = new URLSearchParams(window.location.href);
              const courseId = params2.get("courseId");
              const classId = params2.get("clazzid");
              if (lib.$$el(`.posCatalog_active[id="cur${chapters[0].chapterId}"]`).length === 0) {
                lib.$gm.unsafeWindow.getTeacherAjax(courseId, classId, chapters[0].chapterId);
              }
              await $.sleep(1e3);
            }
          }
          await $.sleep(1e3);
          CXAnalyses.scrollToActiveChapter();
        }
      }),
      cxSecretFontRecognize: new lib.Script({
        name: "繁体字识别",
        hideInPanel: true,
        matches: [
          ["题目页面", "work/doHomeWorkNew"],
          ["考试整卷预览", "/mooc2/exam/preview"],
          ["作业", "/mooc2/work/dowork"]
        ],
        async oncomplete() {
          await decryptFontsWithRetry(document, 2e4);
        }
      }),
      jfkGuide: new lib.Script({
        name: "💡 积分课使用提示",
        matches: [["积分课页面", "/plaza"]],
        namespace: "cx.jfk.guide",
        configs: {
          notes: {
            defaultValue: createSteps(["进入课程", "开启复习模式，并关闭自动下一章", "课程完成后手动切换"]).outerHTML + lib.$ui.notes(["⚠️ 如果由脚本进行自动跳转会出现乱跳转的可能，请手动切换课程。"]).outerHTML
          }
        },
        oncomplete(...args) {
          BackgroundProject.scripts.render.methods.pin(this);
        }
      })
    }
  });
  function workOrExam(type = "work", {
    answererWrappers,
    period,
    thread,
    redundanceWordsText,
    answerSeparators,
    preview_mode
  }) {
    lib.$message.info(`开始${type === "work" ? "作业" : "考试"}`);
    if (preview_mode) {
      CommonProject.scripts.workResults.methods.init({
        questionPositionSyncHandlerType: "cx"
      });
    }
    const workOrExamQuestionTitleTransform = (titles) => {
      const is_multiple_question = titles.length > 1;
      const images = [];
      const optimizationTitle = titles.map((el, i) => {
        var _a, _b;
        if (el) {
          const titleCloneEl = el.cloneNode(true);
          const childNodes = titleCloneEl.childNodes;
          if (i === 0) {
            (_a = childNodes[0]) == null ? void 0 : _a.remove();
            (_b = childNodes[0]) == null ? void 0 : _b.remove();
          }
          const extracted = extractTextWithImages(titleCloneEl);
          images.push(...extracted.images);
          return extracted.text;
        }
        return "";
      }).join("\n");
      const text = removeRedundantWords(
        StringUtils.of(optimizationTitle).nowrap(is_multiple_question ? "\n" : " ").nospace().toString().trim(),
        redundanceWordsText.split("\n")
      );
      return { text, images };
    };
    const workOrExamQuestionTitleText = (titles) => workOrExamQuestionTitleTransform(titles).text;
    const worker = new OCSWorker({
      root: ".questionLi",
      elements: {
        title: (root2) => lib.$$el(
          !preview_mode ? [".splitS-left .mark_name", ".line_wid_half.fl,.line_wid_half.fr"].join(",") : [
            ":scope > h3",
            ":scope > div:not(.stem_answer,.mark_answer)",
            ":scope > p",
            ".line_wid_half.fl,.line_wid_half.fr"
          ].join(","),
          root2
        ).filter((e) => {
          var _a;
          return !!((_a = e.textContent) == null ? void 0 : _a.trim());
        }),
        options: ".answerBg .answer_p, .textDIV, .eidtDiv",
        type: type === "exam" ? 'input[name^="type"]' : 'input[id^="answertype"]',
        lineAnswerInput: ".line_answer input[name^=answer]",
        lineSelectBox: ".line_answer_ct .selectBox ",
        reading: ".reading_answer",
        filling: ".filling_answer"
      },
      thread: thread != null ? thread : 1,
      answerSeparators: answerSeparators.split(",").map((s) => s.trim()),
      answerer: createCommonAnswerer({
        titleTransform: (elements2, ctx) => {
          if (elements2.title) {
            return workOrExamQuestionTitleTransform(elements2.title);
          }
          return "";
        },
        optionsTransform: (elements2, ctx) => {
          var _a, _b;
          const typeInput = (_a = elements2.type) == null ? void 0 : _a[0];
          const type2 = (typeInput ? getQuestionType(parseInt(typeInput.value)) : void 0) || "unknown";
          ctx.type = type2;
          if (type2 === "completion")
            return "";
          const optResults = ((_b = ctx.elements.options) != null ? _b : []).filter(Boolean).map((o) => extractTextWithImages(o));
          return {
            text: optResults.map((r) => r.text).join("\n"),
            images: optResults.flatMap((r) => r.images)
          };
        },
        answererWrappers,
        period
      }),
      work: async (ctx) => {
        var _a, _b;
        const { elements: elements2, searchInfos } = ctx;
        const type2 = getQuestionType(
          parseInt(((_a = elements2.type.find((t) => {
            var _a2;
            return (_a2 = t.getAttribute("name")) == null ? void 0 : _a2.match(/type\d+/);
          })) == null ? void 0 : _a.getAttribute("value")) || "-1")
        );
        if (type2 && (type2 === "completion" || type2 === "multiple" || type2 === "judgement" || type2 === "single")) {
          const resolver = createDefaultQuestionResolver(ctx, (o) => extractTextWithImages(o).text)[type2];
          return await resolver(searchInfos, elements2.options, async (type3, answer, option) => {
            var _a2, _b2, _c;
            if (type3 === "judgement" || type3 === "single" || type3 === "multiple") {
              if ((option == null ? void 0 : option.parentElement) && lib.$$el('[class*="check_answer"]', option.parentElement).length === 0) {
                option.click();
                await $.sleep(500);
              }
            } else if (type3 === "completion" && answer.trim()) {
              const text = option == null ? void 0 : option.querySelector("textarea");
              const textareaFrame = option == null ? void 0 : option.querySelector("iframe");
              if (text) {
                text.value = answer;
              }
              if (textareaFrame == null ? void 0 : textareaFrame.contentDocument) {
                textareaFrame.contentDocument.body.innerHTML = answer;
              }
              if ((_a2 = option == null ? void 0 : option.parentElement) == null ? void 0 : _a2.parentElement) {
                (_c = lib.$el("[onclick*=saveQuestion]", (_b2 = option == null ? void 0 : option.parentElement) == null ? void 0 : _b2.parentElement)) == null ? void 0 : _c.click();
                await $.sleep(500);
              }
            }
          });
        } else if (type2 && type2 === "line") {
          for (const answers of searchInfos.map((info) => info.results.map((res) => res.answer))) {
            let ans = answers;
            if (ans.length === 1) {
              ans = splitAnswer(ans[0]);
            }
            if (ans.filter(Boolean).length !== 0 && elements2.lineAnswerInput && ans.filter(Boolean).length === elements2.lineSelectBox.length) {
              for (let index = 0; index < elements2.lineSelectBox.length; index++) {
                const box = elements2.lineSelectBox[index];
                if (ans[index]) {
                  (_b = lib.$el(`li[data=${ans[index]}] a`, box)) == null ? void 0 : _b.click();
                  await $.sleep(200);
                }
              }
              return { finish: true };
            }
          }
          return { finish: false };
        } else if (type2 && type2 === "fill") {
          return readerAndFillHandle(searchInfos, elements2.filling);
        } else if (type2 && type2 === "reader") {
          return readerAndFillHandle(searchInfos, elements2.reading);
        }
        return { finish: false };
      },
      onQuestionDetected(current) {
        if (preview_mode) {
          return;
        }
        updateDynamicResult(current, workOrExamQuestionTitleText);
      },
      async onResultsInit(_curr, _index, res) {
        if (!preview_mode) {
          return;
        }
        await CommonProject.scripts.workResults.methods.fillAll(
          res.map((r, i) => simplifyWorkResult(r, workOrExamQuestionTitleText, i))
        );
      },
      async onResultsUpdate(current, index, res) {
        if (!preview_mode) {
          updateDynamicResult(current, workOrExamQuestionTitleText);
          return;
        }
        await CommonProject.scripts.workResults.methods.update(
          index,
          simplifyWorkResult(current, workOrExamQuestionTitleText, index)
        );
      }
    });
    if (preview_mode) {
      worker.doWork({ enable_debug: BackgroundProject.scripts.dev.cfg.enable_answerer_debug }).then(() => {
        lib.$message.info({ content: "作业/考试完成，请自行检查后保存或提交。", duration: 0 });
        worker.emit("done");
      }).catch((err) => {
        console.error(err);
        lib.$message.error("答题程序发生错误 : " + err.message);
      });
    } else {
      const getNextBtn = () => document.querySelector('[onclick="getTheNextQuestion(1)"]');
      let next = getNextBtn();
      (async () => {
        while (next && worker.isClose === false) {
          await worker.doWork({ enable_debug: BackgroundProject.scripts.dev.cfg.enable_answerer_debug });
          lib.$message.info({ content: "已完成，即将下一题", duration: 0 });
          await $.sleep(3e3);
          next = getNextBtn();
          next == null ? void 0 : next.click();
          await $.sleep(1e3);
        }
        lib.$message.success({ content: "作业/考试完成，请自行检查后保存或提交。", duration: 0 });
        worker.emit("done");
        CommonProject.scripts.workResults.cfg.questionPositionSyncHandlerType = "cx";
      })();
    }
    return worker;
  }
  function mobilelearn(opts) {
    var _a;
    lib.$message.info(`开始作业随堂练习`);
    CommonProject.scripts.workResults.methods.init();
    function titleText(el) {
      const clone = el.cloneNode(true);
      return extractTextWithImages(clone).text;
    }
    const redundanceWords = opts.redundanceWordsText.split("\n").filter(Boolean);
    const titleTransform = (titles) => titles.filter((t) => t == null ? void 0 : t.innerText).map(
      (t) => t ? removeRedundantWords(StringUtils.of(titleText(t)).nowrap(" ").nospace().toString().trim(), redundanceWords) : ""
    ).join(",");
    const worker = new OCSWorker({
      root: ".question-item",
      elements: {
        title: ".question-name .html-content-box",
        options: ".option-result"
      },
      thread: (_a = opts.thread) != null ? _a : 1,
      answerSeparators: opts.answerSeparators.split(",").map((s) => s.trim()),
      answerer: createCommonAnswerer({
        titleTransform: (elements2, ctx) => {
          if (elements2.title) {
            return titleTransform(elements2.title);
          }
          return "";
        },
        answererWrappers: opts.answererWrappers,
        period: opts.period
      }),
      work: {
        type(ctx) {
          const cl = ctx.root.classList;
          return cl.contains("single-choice") ? "single" : cl.contains("multiple-choice") ? "multiple" : ctx.elements.options.length === 2 ? "judgement" : "completion";
        },
        async handler(type, answer, option, ctx) {
          var _a2, _b, _c;
          if (type === "judgement" || type === "single" || type === "multiple") {
            if (!(option == null ? void 0 : option.classList.contains("active"))) {
              option.click();
              await $.sleep(500);
            }
          } else if (type === "completion" && answer.trim()) {
            const text = option == null ? void 0 : option.querySelector("textarea");
            const textareaFrame = option == null ? void 0 : option.querySelector("iframe");
            if (text) {
              text.value = answer;
            }
            if (textareaFrame == null ? void 0 : textareaFrame.contentDocument) {
              textareaFrame.contentDocument.body.innerHTML = answer;
            }
            if ((_a2 = option == null ? void 0 : option.parentElement) == null ? void 0 : _a2.parentElement) {
              (_c = lib.$el("[onclick*=saveQuestion]", (_b = option == null ? void 0 : option.parentElement) == null ? void 0 : _b.parentElement)) == null ? void 0 : _c.click();
              await $.sleep(500);
            }
          }
        }
      },
      async onResultsInit(_curr, _index, res) {
        await CommonProject.scripts.workResults.methods.fillAll(
          res.map((r, i) => simplifyWorkResult(r, titleTransform, i))
        );
      },
      async onResultsUpdate(current, index, res) {
        await CommonProject.scripts.workResults.methods.update(index, simplifyWorkResult(current, titleTransform, index));
      }
    });
    worker.doWork({ enable_debug: BackgroundProject.scripts.dev.cfg.enable_answerer_debug }).then(() => {
      lib.$message.info({ content: "随堂练习完成，请自行检查后保存或提交。", duration: 0 });
      worker.emit("done");
    }).catch((err) => {
      console.error(err);
      lib.$message.error("答题程序发生错误 : " + err.message);
    });
    return worker;
  }
  async function decryptFontsWithRetry(doc, timeoutMs = 2e4) {
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
      let before = 0;
      try {
        before = doc.querySelectorAll(".font-cxsecret").length;
      } catch (e) {
        before = 0;
      }
      if (before > 0) {
        try {
          await mappingRecognize(doc);
        } catch (e) {
          $console.warn("[CXStudy] 字体解密抛出异常：" + (e == null ? void 0 : e.message));
        }
        let after = before;
        try {
          after = doc.querySelectorAll(".font-cxsecret").length;
        } catch (e) {
        }
        if (after < before) {
          $console.log("[CXStudy] 字体解密成功：解密前 " + before + " 个，剩余 " + after + " 个。");
        } else {
          $console.warn(
            "[CXStudy] 字体解密未生效：仍有 " + after + " 个 .font-cxsecret（题干可能是乱码；参照表 https://cdn.ocsjs.com/resources/font/font_ref_cx.bin 需可获取）"
          );
        }
        return after < before;
      }
      await $.sleep(500);
    }
    $console.log("[CXStudy] 等待 " + timeoutMs + "ms 仍无 .font-cxsecret 元素（该页可能本就未加密字体）。");
    return false;
  }
  async function mappingRecognize(doc = document) {
    const fontBuffer = extractFontFromStyle(doc, "font-cxsecret");
    if (!fontBuffer) {
      $console.log("未检测到加密文字。");
      return;
    }
    const fonts = CXAnalyses.getSecretFont(doc);
    if (fonts.length === 0) {
      return;
    }
    const t = Date.now();
    try {
      const { map, details } = await crackFont(fontBuffer, collectChars(fonts), {
        refTableUrl: CX_SECRET_REF_TABLE_URL,
        onProgress: (done, total) => console.log(`加密文字识别中 ${done}/${total}`)
      });
      const lowMargin = details.filter((d) => d.margin < 0.3);
      if (lowMargin.length > 0) {
        const msg = `有 ${lowMargin.length} 个字符识别置信度较低，可能存在误差`;
        $console.warn(msg);
        console.log(msg, lowMargin);
      }
      decryptElements(fonts, map);
      fonts.forEach((el) => el.classList.remove("font-cxsecret"));
      $console.info("文字解密完成，耗时 " + ((Date.now() - t) / 1e3).toFixed(1) + " 秒");
    } catch (err) {
      $console.error("加密文字识别失败：", String(err));
      lib.$message.error("加密文字识别失败：" + String(err));
    }
  }
  const CXAnalyses = {
    isInSpecialMode() {
      return Array.from((top$1 == null ? void 0 : top$1.document.querySelectorAll(".catalog_points_sa,.catalog_points_er")) || []).length !== 0;
    },
    async isStuckInBreakingMode() {
      if (this.isInSpecialMode()) {
        const chapter = top$1 == null ? void 0 : top$1.document.querySelector(".posCatalog_active");
        if (chapter) {
          const id = chapter.getAttribute("id");
          if (id) {
            const counter = await lib.$store.getTab("chapter_counter") || /* @__PURE__ */ Object.create({});
            let count2 = Reflect.get(counter, id);
            count2 = count2 ? count2 + 1 : 1;
            Reflect.set(counter, id, count2);
            let res = false;
            if (count2 >= 3) {
              Reflect.set(counter, id, 1);
              res = true;
            }
            await lib.$store.setTab("chapter_counter", counter);
            return res;
          }
        }
      }
      return false;
    },
    isInFinalTab() {
      const tabs = Array.from((top$1 == null ? void 0 : top$1.document.querySelectorAll(".prev_ul li")) || []);
      if (tabs.length === 0) {
        return true;
      }
      return tabs[tabs.length - 1].classList.contains("active");
    },
    isInFinalChapter() {
      var _a;
      return (_a = Array.from((top$1 == null ? void 0 : top$1.document.querySelectorAll(".posCatalog_select")) || []).pop()) == null ? void 0 : _a.classList.contains("posCatalog_active");
    },
    isFinishedAllChapters() {
      return this.getChapterInfos().every((chapter) => chapter.unFinishCount === 0);
    },
    getChapterInfos() {
      return Array.from((top$1 == null ? void 0 : top$1.document.querySelectorAll('[onclick^="getTeacherAjax"]')) || []).map((el) => {
        var _a, _b, _c;
        return {
          element: el,
          chapterId: (_b = (_a = el.getAttribute("onclick")) == null ? void 0 : _a.match(/\('(.*)','(.*)','(.*)'\)/)) == null ? void 0 : _b[3],
          unFinishCount: parseInt(((_c = el.parentElement.querySelector(".jobUnfinishCount")) == null ? void 0 : _c.value) || "0")
        };
      });
    },
    scrollToActiveChapter() {
      const activeChapter = top$1 == null ? void 0 : top$1.document.querySelector(".posCatalog_active");
      if (activeChapter) {
        activeChapter.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    waitForChapterInfos(timeout = 10) {
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          const res = this.getChapterInfos();
          if (res.length > 0) {
            clearInterval(interval);
            clearInterval(to);
            resolve(res);
          }
        }, 1e3);
        const to = setTimeout(() => {
          clearInterval(interval);
          resolve([]);
        }, timeout * 1e3);
      });
    },
    getSecretFont(doc = document) {
      return Array.from(doc.querySelectorAll(".font-cxsecret")).map((font) => {
        const after = font.querySelector(".after");
        return after === null ? font : after;
      });
    },
    isCurrentChapterFinished() {
      const job = top$1 == null ? void 0 : top$1.document.querySelector(".posCatalog_active");
      if (job) {
        if (job.querySelector(".icon_Completed") !== null) {
          return true;
        }
      }
      return false;
    }
  };
  async function study(opts) {
    var _a;
    await $.sleep(3e3);
    const searchedJobs = [];
    let searching = true;
    let attachmentCount = ((_a = lib.$gm.unsafeWindow.attachments) == null ? void 0 : _a.length) || 0;
    const wait_timeout = 3 + attachmentCount * 2;
    setTimeout(() => {
      searching = false;
    }, Math.min(wait_timeout, 10) * 1e3);
    const runJobs = async () => {
      if (isAutoStartDisabled()) {
        warnAutoStartDisabled("刷课");
        return;
      }
      const job = searchJob(opts, searchedJobs);
      if (job && job.func) {
        try {
          await job.func();
        } catch (e) {
          $console.error("未知错误", e);
        }
        await $.sleep(1e3);
        await runJobs();
      } else if (attachmentCount > 0) {
        attachmentCount--;
        await $.sleep(1e3);
        await runJobs();
      } else if (searching) {
        await $.sleep(1e3);
        await runJobs();
      }
    };
    await runJobs();
    top$1._preChapterId = "";
    const next = async () => {
      if (CXAnalyses.isInFinalTab()) {
        if (await CXAnalyses.isStuckInBreakingMode()) {
          return lib.$modal.alert({
            content: "检测到当前课程为闯关模式（有小旗帜图标）, 但是已经重复进入多次，应该是章节测试没有完成，或者其他情况导致，请手动完成章节测试，然后手动点击下一章。"
          });
        }
      }
      if (CXAnalyses.isInFinalChapter()) {
        let content = "";
        if (opts.backToFirstWhenFinish) {
          content = "已经抵达最后一个章节，10秒后返回第一个章节重新开始。";
          setTimeout(() => {
            var _a2;
            (_a2 = top$1 == null ? void 0 : top$1.document.querySelector(".posCatalog_name")) == null ? void 0 : _a2.click();
          }, 10 * 1e3);
          lib.$message.info({ content, duration: 30 });
        } else {
          if (CXAnalyses.isFinishedAllChapters()) {
            content = "全部任务点已完成！";
          } else {
            content = "已经抵达最后一个章节！但仍然有任务点未完成，请手动切换至未完成的章节。";
          }
          lib.$modal.alert({ content });
        }
        CommonProject.scripts.settings.methods.notificationBySetting(content, {
          duration: 0,
          extraTitle: "超星学习通学习脚本"
        });
        return;
      }
      if (CXProject.scripts.study.cfg.mode === "job") {
        if (CXAnalyses.isInFinalTab()) {
          const elements2 = CXAnalyses.getChapterInfos().filter((el) => {
            var _a2;
            return el.unFinishCount > 0 || ((_a2 = el.element.parentElement) == null ? void 0 : _a2.classList.contains("posCatalog_active"));
          }).map((el) => el.element.parentElement);
          if (elements2.length === 0) {
            const content = "全部任务点已完成！";
            lib.$modal.alert({ content });
            CommonProject.scripts.settings.methods.notificationBySetting(content, {
              duration: 0,
              extraTitle: "超星学习通学习脚本"
            });
            return;
          }
          let nextChapter = elements2[0];
          const currentIndex = elements2.findIndex((el) => el.classList.contains("posCatalog_active"));
          if (currentIndex !== -1 && currentIndex + 1 < elements2.length) {
            nextChapter = elements2[currentIndex + 1];
            CXAnalyses.scrollToActiveChapter();
            setTimeout(() => {
              var _a2;
              (_a2 = nextChapter.querySelector(".posCatalog_name")) == null ? void 0 : _a2.click();
            }, 1e3);
          }
        }
      } else if (CXProject.scripts.study.cfg.mode === "next") {
        const curCourseId = lib.$el("#curCourseId", top$1 == null ? void 0 : top$1.document);
        const curChapterId = lib.$el("#curChapterId", top$1 == null ? void 0 : top$1.document);
        const curClazzId = lib.$el("#curClazzId", top$1 == null ? void 0 : top$1.document);
        const count2 = lib.$$el("#prev_tab .prev_ul li", top$1 == null ? void 0 : top$1.document);
        if (curChapterId && curCourseId && curClazzId) {
          top$1._preChapterId = curChapterId.value;
          CXAnalyses.scrollToActiveChapter();
          await $.sleep(200);
          top$1 == null ? void 0 : top$1.PCount.next(count2.length.toString(), curChapterId.value, curCourseId.value, curClazzId.value, "");
        } else {
          $console.warn("参数错误，无法跳转下一章，请尝试手动切换。");
        }
      } else {
        $console.warn("未知的跳转模式，请联系作者反馈");
      }
    };
    if (CXProject.scripts.study.cfg.mode !== "manually") {
      const msg = "页面任务点已完成，即将跳转。";
      lib.$message.success({ content: msg });
      $console.info(msg);
      await $.sleep(5e3);
      next();
    } else {
      const msg = "页面任务点已完成，自动跳转已关闭，请手动跳转。";
      lib.$message.warn({ content: msg, duration: 0 });
      $console.warn(msg);
    }
  }
  function searchIFrame(root2) {
    var _a, _b;
    let list = Array.from(root2.querySelectorAll("iframe"));
    const result = [];
    while (list.length) {
      const frame = list.shift();
      try {
        if (frame && ((_a = frame == null ? void 0 : frame.contentWindow) == null ? void 0 : _a.document)) {
          result.push(frame);
          const frames = (_b = frame == null ? void 0 : frame.contentWindow) == null ? void 0 : _b.document.querySelectorAll("iframe");
          list = list.concat(Array.from(frames || []));
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    return result;
  }
  function searchJob(opts, searchedJobs) {
    const knowCardWin = lib.$gm.unsafeWindow;
    const searchJobElement = (root2) => {
      return domSearch(
        {
          videojs: "#video,#audio",
          chapterTest: ".TiMu",
          read: "#img.imglook",
          pptWithAudio: ".swiper-container",
          hyperlink: "#hyperlink",
          timereader: 'iframe[name="bookifame"][src*="timing"]'
        },
        root2.contentWindow.document
      );
    };
    const search = (root2) => {
      var _a, _b, _c, _d;
      const win = root2.contentWindow;
      const { videojs, read, chapterTest, hyperlink, pptWithAudio, timereader } = searchJobElement(root2);
      if (win && (videojs || read || chapterTest || hyperlink || pptWithAudio || timereader)) {
        const frame_data_str = ((_a = win.frameElement) == null ? void 0 : _a.getAttribute("data")) || ((_d = (_c = (_b = win.frameElement) == null ? void 0 : _b.contentWindow) == null ? void 0 : _c.parent.frameElement) == null ? void 0 : _d.getAttribute("data")) || "{}";
        const frame_data = JSON.parse(frame_data_str);
        const target_jobid = frame_data.jobid || frame_data._jobid;
        if (!target_jobid) {
          return;
        }
        const attachment = knowCardWin.attachments.find((attachment2) => {
          const attachment_jobid = attachment2.jobid || attachment2.property._jobid;
          if (!attachment_jobid) {
            return false;
          }
          return String(attachment_jobid) === String(target_jobid);
        });
        if (attachment && searchedJobs.find((job2) => job2.mid === attachment.property.mid) === void 0) {
          const { name, title, bookname, author } = attachment.property;
          const jobName = name || title || (bookname ? bookname + author : void 0) || "未知任务";
          const work_type = attachment.job ? "job" : attachment.isPassed ? "finished" : "not-job";
          let func;
          if (videojs) {
            if (!CXProject.scripts.study.cfg.enableMedia) {
              const msg = `音视频自动学习功能已被关闭（在上方菜单栏，超星学习通-课程学习中开启）。${jobName} 即将跳过`;
              lib.$message.warn({ content: msg, duration: 10 });
              $console.warn(msg);
            } else {
              if (work_type === "job" || work_type === "finished" && opts.restudy || work_type === "not-job" && opts.forceLearn) {
                func = () => {
                  const msg = `即将${work_type === "finished" && opts.restudy ? "重新" : work_type === "not-job" && opts.forceLearn ? "强制" : ""}播放 : ` + jobName;
                  lib.$message.info({ content: msg });
                  $console.log(msg);
                  const workOptions = CommonProject.scripts.settings.methods.getWorkOptions();
                  return JobRunner.media(opts, win.document, workOptions.answererWrappers);
                };
              }
            }
          } else if (chapterTest) {
            if (!CXProject.scripts.study.cfg.enableChapterTest) {
              const msg = `章节测试自动答题功能已被关闭（在上方菜单栏，超星学习通-课程学习中开启）。${jobName} 即将跳过`;
              lib.$message.warn({ content: msg, duration: 10 });
              $console.warn(msg);
            } else {
              const status = win.document.querySelector(".testTit_status");
              if (status == null ? void 0 : status.classList.contains("testTit_status_complete")) {
                const msg = `章节测试已完成 : ` + jobName;
                lib.$message.success({ content: msg });
                $console.log(msg);
              } else {
                if (work_type === "job" || work_type === "not-job" && CommonProject.scripts.settings.cfg["work-when-no-job"]) {
                  const workOptions = CommonProject.scripts.settings.methods.getWorkOptions();
                  if (workOptions.answererWrappers === void 0 || workOptions.answererWrappers.length === 0) {
                    answerWrapperEmptyWarning(0);
                  } else {
                    func = () => {
                      $console.log(`开始答题 : ` + jobName);
                      return JobRunner.chapter(root2, workOptions);
                    };
                  }
                }
                if (work_type === "not-job" && CommonProject.scripts.settings.cfg["work-when-no-job"] === false) {
                  const msg = `当前作业 ${jobName} 不是任务点，但待完成，如需开启自动答题请前往：通用-全局设置，开启强制答题。`;
                  lib.$message.warn({ content: msg });
                  $console.warn(msg);
                }
              }
            }
          } else if (read || pptWithAudio || timereader) {
            if (!CXProject.scripts.study.cfg.enablePPT) {
              const msg = `PPT/书籍阅读功能已被关闭（在上方菜单栏，超星学习通-课程学习中开启）。${jobName} 即将跳过`;
              lib.$message.warn({ content: msg, duration: 10 });
              $console.warn(msg);
            } else {
              if (attachment.job) {
                func = () => {
                  const msg = `正在学习 : ` + jobName;
                  lib.$message.info({ content: msg });
                  $console.log(msg);
                  if (read) {
                    return JobRunner.read(win);
                  } else if (timereader) {
                    return JobRunner.timereader(timereader);
                  } else {
                    return JobRunner.readPPTWithAudio(win);
                  }
                };
              }
            }
          } else if (hyperlink) {
            if (!CXProject.scripts.study.cfg.enableHyperlink) {
              const msg = `链接任务点已被关闭（在上方菜单栏，超星学习通-课程学习中开启）。${jobName} 即将跳过`;
              lib.$message.warn({ content: msg, duration: 10 });
              $console.warn(msg);
            } else {
              if (attachment.job) {
                func = () => {
                  const msg = `正在完成链接阅读任务 : ` + jobName;
                  lib.$message.info({ content: msg });
                  $console.log(msg);
                  return JobRunner.hyperlink(hyperlink);
                };
              }
            }
          }
          const job2 = {
            mid: attachment.property.mid,
            attachment,
            func
          };
          searchedJobs.push(job2);
          return job2;
        }
      }
    };
    let job;
    for (const iframe of searchIFrame(knowCardWin.document)) {
      job = search(iframe);
      if (job) {
        return job;
      }
    }
    return job;
  }
  function fixedVideoProgress() {
    if (state.study.videojs) {
      const { bar } = domSearch({ bar: ".vjs-control-bar" }, state.study.videojs);
      if (bar) {
        bar.style.opacity = "1";
      }
    }
  }
  const SUBJECTIVE_TYPES = {
    4: "简答",
    5: "名词解释",
    6: "论述",
    7: "计算"
  };
  function isAutoStartDisabled() {
    return CommonProject.scripts.settings.cfg.cxMasterSwitch === false;
  }
  function warnAutoStartDisabled(where) {
    $console.log("[CXStudy] 总开关已关闭 → 不自动" + where + "。需要运行请在面板上手动点击「开始」。");
  }
  const RANDOM_FILL_TEXTS = ["不会", "不知道", "不清楚", "不懂", "不会写"];
  const answeredVideoQuizzes = /* @__PURE__ */ new Set();
  const videoQuizHints = /* @__PURE__ */ new Set();
  const JobRunner = {
    async answerVideoQuiz(quiz, strategy, answererWrappers) {
      const { texts, options, submit } = quiz;
      $console.log(
        "[CXStudy] 检测到视频内弹题：选项 " + texts.length + " 个，提交按钮=" + (submit ? "有" : "无") + "，DOM 标记=[" + readOptionMarks(quiz) + "]"
      );
      if (!texts.length || !submit) {
        $console.warn("[CXStudy] 弹题结构不完整（选项或提交按钮缺失）→ 不处理，留给人工。");
        return false;
      }
      let picked = [];
      if (strategy === "ai") {
        picked = await JobRunner.pickVideoQuizByAI(quiz, answererWrappers);
      }
      if (!picked.length) {
        const idx = Math.floor(Math.random() * options.length);
        picked = texts[idx] !== void 0 ? [texts[idx]] : [];
        $console.log(
          "[CXStudy] " + (strategy === "ai" ? "模型未给出可用答案 → 按上游方式随机作答：" : "随机作答（上游模式）：") + picked.join("、")
        );
      }
      if (!picked.length) {
        $console.warn("[CXStudy] 无法确定要点击的选项 → 不处理，留给人工。");
        return false;
      }
      for (const text of picked) {
        const idx = texts.indexOf(text);
        if (idx >= 0)
          clickVideoQuizOption(options[idx]);
        await $.sleep(200);
      }
      submit.click();
      $console.log("[CXStudy] 视频内题目 → 已提交：" + picked.join("、"));
      return true;
    },
    async pickVideoQuizByAI(quiz, answererWrappers) {
      var _a;
      const { texts, options } = quiz;
      if (!answererWrappers || !answererWrappers.length) {
        $console.warn("[CXStudy] 未配置模型答题器 → 跳过模型作答。");
        return [];
      }
      let title = (((_a = quiz.container) == null ? void 0 : _a.innerText) || "").trim();
      for (const t of texts)
        title = title.split(t).join(" ");
      title = title.replace(/\s+/g, " ").trim() || "视频内题目";
      try {
        const { env } = await buildAnswererEnv({ type: "single", title, options: texts.join("\n") });
        const infos = await defaultAnswerWrapperHandler(answererWrappers, env);
        const answerGroups = infos.map((i) => i.results.map((r) => {
          var _a2;
          return String((_a2 = r.answer) != null ? _a2 : "");
        }).filter(Boolean)).filter((g) => g.length);
        $console.log("[CXStudy] 视频内题目模型答案: " + JSON.stringify(answerGroups.flat()));
        if (!answerGroups.length) {
          $console.warn("[CXStudy] 模型未返回答案。");
          return [];
        }
        const picked = pickVideoQuizOptions(answerGroups, texts, isMultipleChoice(quiz));
        if (!picked.length) {
          $console.warn("[CXStudy] 模型答案无法匹配到任何选项。答案=" + JSON.stringify(answerGroups.flat()));
        }
        return picked;
      } catch (e) {
        $console.warn("[CXStudy] 模型作答出错：" + (e == null ? void 0 : e.message));
        return [];
      }
    },
    async media(setting, doc, answererWrappers) {
      const { volume: volume2 = 0 } = setting;
      const playbackRate = 1;
      const media = await waitForMedia({ root: doc });
      const { videojs } = domSearch({ videojs: "#video,#audio" }, doc);
      if (!videojs || !media) {
        $console.error("视频检测不到，请尝试刷新或者手动切换下一章。");
        return;
      }
      state.study.videojs = videojs;
      top$1.currentMedia = media;
      fixedVideoProgress();
      const rawStrategy = setting.videoQuizStrategy;
      const videoQuizStrategy = rawStrategy === "ignore" || rawStrategy === "random" ? rawStrategy : "ai";
      if (rawStrategy !== videoQuizStrategy) {
        $console.warn("[CXStudy] 未识别的弹题策略「" + rawStrategy + "」→ 按模型作答处理。");
      }
      if (videoQuizStrategy !== "ignore") {
        $console.log(
          "[CXStudy] 视频内弹题策略=" + (videoQuizStrategy === "ai" ? "模型作答（失败则随机）" : "随机作答（上游模式）") + "，已开始监听。"
        );
        const loop = async () => {
          while (!media.ended) {
            try {
              const quiz = findVideoQuiz(doc);
              if (quiz) {
                const key = videoQuizKey(quiz);
                if (!answeredVideoQuizzes.has(key)) {
                  answeredVideoQuizzes.add(key);
                  const submitted = await JobRunner.answerVideoQuiz(quiz, videoQuizStrategy, answererWrappers);
                  if (submitted) {
                    await $.sleep(1e3);
                    hideVideoQuiz(quiz);
                  } else {
                    $console.warn("[CXStudy] 弹题未作答成功 → 保留弹题，请手动作答（不会重复尝试）。");
                    await $.sleep(3e3);
                  }
                }
              } else {
                const hint = probeVideoQuizCandidates(doc);
                if (hint && !videoQuizHints.has(hint)) {
                  videoQuizHints.add(hint);
                  $console.log("[CXStudy] 未按已知选择器找到弹题，但页面存在疑似元素 → " + hint);
                }
              }
            } catch (e) {
              $console.warn("[CXStudy] 弹题监听出错（已忽略，继续监听）：" + (e == null ? void 0 : e.message));
            }
            await $.sleep(2e3);
          }
        };
        loop().catch((e) => $console.warn("[CXStudy] 弹题监听已停止：" + (e == null ? void 0 : e.message)));
      }
      return new Promise((resolve, reject) => {
        const reloadInterval = setInterval(() => {
          const errorDiv = doc.querySelector(".vjs-modal-dialog-content");
          if (["视频文件损坏", "网络错误导致视频下载中途失败", "视频因格式不支持", "网络的问题无法加载"].some(
            (s) => errorDiv == null ? void 0 : errorDiv.innerText.includes(s)
          )) {
            $console.error("检测到视频加载失败，即将跳过视频。");
            lib.$message.error("检测到视频加载失败，即将跳过视频。");
            setTimeout(resolve, 3e3);
          }
        }, 3e3);
        const playFunction = async () => {
          if (hasFaceRecognition())
            await waitForFaceRecognition();
          if (hasNewFaceRecognition())
            await waitForNewFaceRecognition();
          if (media.ended === false) {
            await $.sleep(1e3);
            media.play();
            media.playbackRate = playbackRate;
          }
        };
        media.addEventListener("pause", playFunction);
        media.addEventListener("ended", () => {
          media.removeEventListener("pause", playFunction);
          $console.log("视频播放完毕");
          clearInterval(reloadInterval);
          resolve();
        });
        $console.log("视频开始播放");
        media.volume = volume2;
        setTimeout(() => {
          playMedia(() => media.play()).then(() => {
            media.playbackRate = playbackRate;
          }).catch(reject);
        }, 200);
      });
    },
    async read(win) {
      if (CXProject.scripts.study.cfg.cxAllowFinishJob !== false) {
        const finishJob = win.finishJob;
        if (typeof finishJob === "function") {
          $console.log("[CXStudy] 调用页面自身的 finishJob() 标记该任务点完成（默认行为，可在课程学习中关闭）。");
          try {
            finishJob();
          } catch (e) {
            $console.warn("[CXStudy] finishJob 调用失败：" + (e == null ? void 0 : e.message));
          }
        } else {
          $console.warn("[CXStudy] 该页面没有 finishJob，无法自动完成该任务点。");
        }
      } else {
        $console.warn(
          "[CXStudy] 已按你的设置禁用 finishJob。注意：阅读器在跳域 iframe 内，本项目无法用其他方式完成该任务点 → 它会保持未完成（闯关模式下会阻塞章节）。"
        );
      }
      await $.sleep(3e3);
    },
    async timereader(iframe) {
      var _a, _b;
      const src2 = ((_a = iframe.getAttribute("src")) == null ? void 0 : _a.toString()) || "";
      const timing = src2 ? parseInt(((_b = new URL(src2).searchParams.get("timing")) == null ? void 0 : _b.toString()) || "60") : 60;
      lib.$message.info({
        content: `正在学习长时阅读任务，请稍等，不要切换..（预计${(timing + 3) * 3}秒）`,
        duration: (timing + 3) * 3
      });
      await $.sleep((timing + 3) * 3 * 1e3);
      lib.$message.success("长时阅读任务完成！");
      await $.sleep(5e3);
    },
    async chapter(frame, {
      answererWrappers,
      period,
      upload,
      thread,
      stopSecondWhenFinish,
      redundanceWordsText,
      answerSeparators
    }) {
      var _a;
      if (answererWrappers === void 0 || answererWrappers.length === 0) {
        return answerWrapperEmptyWarning(0);
      }
      try {
        const quizDoc = (_a = frame.contentWindow) == null ? void 0 : _a.document;
        if (quizDoc) {
          await decryptFontsWithRetry(quizDoc, 15e3);
        }
      } catch (e) {
        $console.warn("[CXStudy] 章节测验字体解密失败，将按未解密文本继续：" + (e == null ? void 0 : e.message));
      }
      CommonEvents.emitWorkerStateChange("start");
      const visual_state = BackgroundProject.scripts.render.cfg.visual;
      const frameWindow = frame.contentWindow;
      const { TiMu } = domSearchAll({ TiMu: ".TiMu" }, frameWindow.document);
      CORSUtils.panelNormal();
      CommonProject.scripts.workResults.methods.init();
      CORSUtils.pinWorkPanel();
      const chapterTestTaskQuestionTitleTransform = (titles) => {
        const images = [];
        const removed = removeRedundantWords(
          titles.map((t) => {
            if (!t)
              return "";
            const extracted = extractTextWithImages(t);
            images.push(...extracted.images);
            return extracted.text;
          }).join(","),
          redundanceWordsText.split("\n")
        );
        const text = removed.trim().replace(/^\d+[。、.]/, "").replace(/（\d+\.\d+分）/, "").replace(/\(..题, \d+?分\)/, "").replace(/\(..题, \d+\.\d+分\)/, "").replace(/[[(【（](..题|名词解释|完形填空|阅读理解)[\])】）]/, "").trim();
        return { text, images };
      };
      const chapterTestTaskQuestionTitleText = (titles) => chapterTestTaskQuestionTitleTransform(titles).text;
      const worker = new OCSWorker({
        root: TiMu,
        elements: {
          title: [
            (root2) => lib.$el(".Zy_TItle .clearfix", root2),
            (root2) => lib.$el(".firstUlList", root2),
            (root2) => lib.$el(".secondUlList", root2)
          ],
          options: "ul li .after,ul li textarea,ul textarea,ul li label:not(.before),.textDIV,.eidtDiv,.answerBg .answer_p",
          type: 'input[id^="answertype"]',
          lineSelectBox: ".thirdUlList .dept_select"
        },
        thread: thread != null ? thread : 1,
        answerSeparators: answerSeparators.split(",").map((s) => s.trim()),
        answerer: createCommonAnswerer({
          titleTransform: (elements2, ctx) => {
            var _a2, _b;
            const base = chapterTestTaskQuestionTitleTransform(elements2.title);
            const raw = parseInt(((_b = (_a2 = elements2.type) == null ? void 0 : _a2[0]) == null ? void 0 : _b.value) || "-1");
            const kind = SUBJECTIVE_TYPES[raw];
            return kind ? { text: "@" + kind + "@" + base.text, images: base.images } : base;
          },
          optionsTransform: (elements2, ctx) => {
            var _a2, _b;
            const typeInput = (_a2 = elements2.type) == null ? void 0 : _a2[0];
            const type = (typeInput ? getQuestionType(parseInt(typeInput.value)) : void 0) || "unknown";
            ctx.type = type;
            if (type === "completion")
              return "";
            const optResults = ((_b = ctx.elements.options) != null ? _b : []).filter(Boolean).map((o) => extractTextWithImages(o));
            return { text: optResults.map((r) => r.text).join("\n"), images: optResults.flatMap((r) => r.images) };
          },
          answererWrappers,
          period
        }),
        work: async (ctx) => {
          var _a2;
          const { elements: elements2, searchInfos } = ctx;
          const typeInput = elements2.type[0];
          const type = typeInput ? getQuestionType(parseInt(typeInput.value)) : void 0;
          if (type && (type === "completion" || type === "multiple" || type === "judgement" || type === "single")) {
            const resolver = createDefaultQuestionResolver(ctx, (o) => extractTextWithImages(o).text)[type];
            const handler = (type2, answer, option, ctx2) => {
              var _a3, _b, _c, _d, _e, _f, _g, _h;
              if (type2 === "judgement" || type2 === "single" || type2 === "multiple") {
                const checked = ((_b = (_a3 = option == null ? void 0 : option.parentElement) == null ? void 0 : _a3.querySelector("label input")) == null ? void 0 : _b.getAttribute("checked")) === "checked" || ((_c = option == null ? void 0 : option.parentElement) == null ? void 0 : _c.getAttribute("aria-checked")) === "true";
                if (checked)
                  ;
                else {
                  option == null ? void 0 : option.click();
                }
              } else if (type2 === "completion" && answer.trim()) {
                const text = (_d = option == null ? void 0 : option.parentElement) == null ? void 0 : _d.querySelector("textarea");
                const textareaFrame = (_e = option == null ? void 0 : option.parentElement) == null ? void 0 : _e.querySelector("iframe");
                const editable = (_f = option == null ? void 0 : option.parentElement) == null ? void 0 : _f.querySelector('[contenteditable="true"]');
                if (text) {
                  text.value = answer;
                }
                if (textareaFrame == null ? void 0 : textareaFrame.contentDocument) {
                  textareaFrame.contentDocument.body.innerHTML = answer;
                }
                if (editable) {
                  editable.innerText = answer;
                }
                if ((_g = option == null ? void 0 : option.parentElement) == null ? void 0 : _g.parentElement) {
                  (_h = lib.$el("[onclick*=saveQuestion]", option.parentElement.parentElement)) == null ? void 0 : _h.click();
                }
              }
            };
            return await resolver(searchInfos, elements2.options, handler);
          } else if (type && type === "line") {
            const select = (el, opt_val) => {
              const selected = el.querySelector(`option[selected]`);
              const opt = el.querySelector(`option[value="${opt_val}"]`);
              selected == null ? void 0 : selected.removeAttribute("selected");
              if (opt) {
                opt.setAttribute("selected", "");
              }
            };
            for (const answers of searchInfos.map((info) => info.results.map((res) => res.answer))) {
              for (const ans of answers) {
                const splited_ans = splitAnswer(ans);
                if (splited_ans.length !== 0 && elements2.lineSelectBox.length === splited_ans.length) {
                  for (let index = 0; index < elements2.lineSelectBox.length; index++) {
                    const box = elements2.lineSelectBox[index];
                    if (splited_ans[index]) {
                      select(box, splited_ans[index]);
                      const text = (_a2 = box.parentElement) == null ? void 0 : _a2.querySelector(".chosen-single span");
                      if (text)
                        text.textContent = splited_ans[index];
                      await $.sleep(200);
                    }
                  }
                  return { finish: true };
                }
              }
            }
            return { finish: false };
          }
          return { finish: false };
        },
        async onResultsInit(_curr, _index, res) {
          await CommonProject.scripts.workResults.methods.fillAll(
            res.map((r, i) => simplifyWorkResult(r, chapterTestTaskQuestionTitleText, i))
          );
        },
        async onResultsUpdate(curr, index, res) {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          await CommonProject.scripts.workResults.methods.update(
            index,
            simplifyWorkResult(curr, chapterTestTaskQuestionTitleText, index)
          );
          if (((_a2 = curr.result) == null ? void 0 : _a2.finish) === false && curr.resolved === true) {
            const options = (((_c = (_b = curr.ctx) == null ? void 0 : _b.elements) == null ? void 0 : _c.options) || []).filter(Boolean);
            const typeInput = (_e = (_d = curr.ctx) == null ? void 0 : _d.elements) == null ? void 0 : _e.type[0];
            const rawType = typeInput ? parseInt(typeInput.value) : NaN;
            const type = typeInput ? getQuestionType(rawType) : void 0;
            if (SUBJECTIVE_TYPES[rawType])
              curr.cxKind = SUBJECTIVE_TYPES[rawType];
            if (!CXProject.scripts.study.cfg.cxRandomFallback) {
              $console.warn("[CXStudy] 本题未得到答案（type=" + type + "）→ 已关闭随机兜底，跳过该题。");
            } else if (type === "judgement" || type === "single" || type === "multiple") {
              const option = options[Math.floor(Math.random() * options.length)];
              $console.warn(
                "[CXStudy] 本题未得到答案（type=" + type + "）→ 随机兜底选择：" + (((_f = option == null ? void 0 : option.textContent) == null ? void 0 : _f.trim()) || "")
              );
              curr.cxRandomFilled = true;
              (_h = (_g = option == null ? void 0 : option.parentElement) == null ? void 0 : _g.querySelector("a,label")) == null ? void 0 : _h.click();
            } else if (type === "completion") {
              const text = RANDOM_FILL_TEXTS[Math.floor(Math.random() * RANDOM_FILL_TEXTS.length)];
              let wrote = 0;
              for (const option of options) {
                const textarea = (_i = option == null ? void 0 : option.parentElement) == null ? void 0 : _i.querySelector("textarea");
                const frame2 = (_j = option == null ? void 0 : option.parentElement) == null ? void 0 : _j.querySelector("iframe");
                if (textarea) {
                  textarea.value = text;
                  wrote++;
                }
                if (frame2 == null ? void 0 : frame2.contentDocument) {
                  frame2.contentDocument.body.innerHTML = text;
                  wrote++;
                }
                await $.sleep(200);
              }
              if (wrote > 0) {
                $console.warn("[CXStudy] 本题未得到答案（填空题）→ 随机兜底填入：" + text);
                curr.cxRandomFilled = true;
              } else {
                $console.warn(
                  "[CXStudy] 本题未得到答案，且未找到可写入的答题框（多为富文本编辑器的简答/论述题） → 该题需手动作答，答案见答题结果面板。"
                );
                curr.cxNeedsManual = true;
              }
            } else {
              $console.warn("[CXStudy] 本题未得到答案（type=" + type + "）→ 该题型不支持随机兜底，跳过。");
            }
          }
        },
        async onElementSearched(elements2) {
          const typeInput = elements2.type[0];
          const type = typeInput ? getQuestionType(parseInt(typeInput.value)) : void 0;
          if (type === "judgement") {
            elements2.options.forEach((option) => {
              var _a2;
              const opt = ((_a2 = option == null ? void 0 : option.textContent) == null ? void 0 : _a2.trim()) || "";
              if (opt.includes("对") || opt.includes("错"))
                ;
              else if (opt === "True") {
                option.textContent = "√";
              } else if (opt === "False") {
                option.textContent = "x";
              } else if (opt === "對") {
                option.textContent = "√";
              } else if (opt === "錯") {
                option.textContent = "x";
              } else {
                const ri = option.querySelector(".ri");
                const span = document.createElement("span");
                span.innerText = ri ? "√" : "×";
                option.appendChild(span);
              }
            });
          }
        }
      });
      const results = await worker.doWork({ enable_debug: BackgroundProject.scripts.dev.cfg.enable_answerer_debug });
      CommonEvents.emitWorkerStateChange("done");
      const msg = `答题完成，将等待 ${stopSecondWhenFinish} 秒后进行保存或提交。`;
      $console.info(msg);
      lib.$message.info({ content: msg, duration: stopSecondWhenFinish });
      await $.sleep(stopSecondWhenFinish * 1e3);
      await worker.uploadHandler({
        type: upload,
        results,
        async callback(finishedRate, uploadable) {
          const msg2 = `完成率 ${finishedRate.toFixed(2)}% :  ${uploadable ? "3秒后将自动提交" : "3秒后将自动保存"} `;
          $console.info(msg2);
          lib.$message.success({ content: msg2, duration: 3 });
          await $.sleep(3e3);
          if (uploadable) {
            frameWindow.btnBlueSubmit();
            const cap = detectCaptcha(frameWindow.document);
            if (cap.hit) {
              $console.warn("[CXStudy] 提交前检测到人机验证（" + cap.by + "）→ 本次不确认提交。");
              lib.$message.warn({
                content: "检测到人机验证，本次已放弃提交（不产生提交记录），请人工处理该测验。",
                duration: 0
              });
              try {
                top$1.$("#workpop").hide();
              } catch (e) {
              }
              return;
            }
            $console.warn("[CXStudy] 提交前门禁未命中，继续确认提交。");
            await $.sleep(3e3);
            frameWindow.submitCheckTimes();
            top$1.$("#workpop").hide();
          } else {
            frameWindow.alert = () => {
            };
            frameWindow.noSubmit();
          }
        }
      });
      if (visual_state === "minimize" && BackgroundProject.scripts.render.cfg.visual !== "minimize") {
        CORSUtils.panelMinimize();
      }
      worker.emit("done");
    },
    async readPPTWithAudio(win) {
      var _a;
      win.document.querySelectorAll("audio").forEach((audio) => {
        audio.addEventListener("play", () => {
          audio.muted = true;
        });
      });
      const len = win.document.querySelectorAll(".swiper-container .swiper-slide").length;
      for (let index = 0; index < len; index++) {
        (_a = win.swiperNext) == null ? void 0 : _a.call(win);
        await $.sleep(1e3);
      }
      await $.sleep(3e3);
    },
    async hyperlink(a) {
      const _click = a.onclick;
      a.onclick = () => false;
      a.click();
      a.onclick = _click;
      await $.sleep(3e3);
    }
  };
  function getQuestionType(val) {
    return val === 0 ? "single" : val === 1 ? "multiple" : val === 3 ? "judgement" : [2, 4, 5, 6, 7, 8, 9, 10].some((t) => t === val) ? "completion" : val === 11 ? "line" : val === 14 ? "fill" : val === 15 ? "reader" : void 0;
  }
  async function readerAndFillHandle(searchInfos, list) {
    var _a;
    for (const answers of searchInfos.map((info) => info.results.map((res) => res.answer))) {
      let ans = answers;
      if (ans.length === 1) {
        ans = splitAnswer(ans[0]);
      }
      if (ans.filter(Boolean).length !== 0 && list.length !== 0) {
        for (let index = 0; index < ans.length; index++) {
          const item = list[index];
          if (item) {
            (_a = lib.$el(`span.saveSingleSelect[data="${ans[index]}"]`, item)) == null ? void 0 : _a.click();
            await $.sleep(200);
          }
        }
        return { finish: true };
      }
    }
    return { finish: false };
  }
  function detectCaptcha(doc) {
    var _a;
    const topDoc = ((_a = lib.$gm.unsafeWindow.top) == null ? void 0 : _a.document) || doc;
    const hints = [
      ['img[src*="captcha"]', "captcha 图片"],
      ['img[src*="validate"]', "validate 图片"],
      ["#yzmImg, .yzmImg, .yzm, .picCode, .refresh-code", "图形验证码（超星常用类名）"],
      ["#verifyCode, #validateCode, #captcha", "验证码元素 id"],
      ['input[name="validateCode"], input[name="verifyCode"], input[name="captcha"]', "验证码输入框"],
      [".verifyimg, .validateCode, .captcha", "验证码容器类名"],
      [".geetest_panel, .nc-container, .verify-slider, .slide-verify, .nc_scale", "滑块验证组件"]
    ];
    for (const [sel, by] of hints) {
      try {
        if (doc.querySelector(sel))
          return { hit: true, by: by + " @frame" };
      } catch (e) {
      }
      try {
        if (topDoc.querySelector(sel))
          return { hit: true, by: by + " @top" };
      } catch (e) {
      }
    }
    try {
      const txt = (doc.body && doc.body.innerText || "") + " " + (topDoc.body && topDoc.body.innerText || "");
      for (const w of ["请输入验证码", "人机验证", "拖动滑块", "完成验证", "验证码校验"]) {
        if (txt.indexOf(w) >= 0)
          return { hit: true, by: "文案「" + w + "」" };
      }
    } catch (e) {
    }
    return { hit: false, by: "" };
  }
  try {
    lib.$gm.unsafeWindow.__cxstudyDetectCaptcha = detectCaptcha;
  } catch (e) {
  }
  function hasFaceRecognition() {
    const faces = lib.$$el("#fcqrimg", top$1 == null ? void 0 : top$1.document);
    let active = false;
    for (const face of faces) {
      const src2 = face.getAttribute("src");
      if (src2) {
        active = true;
        break;
      }
    }
    return active;
  }
  function hasNewFaceRecognition() {
    const faces = lib.$$el(".chapterVideoFaceMaskDiv", top$1 == null ? void 0 : top$1.document);
    let active = false;
    for (const face of faces) {
      if (face.style.display !== "none") {
        active = true;
        break;
      }
    }
    return active;
  }
  function waitForNewFaceRecognition() {
    let notified = false;
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const active = hasNewFaceRecognition();
        if (active) {
          if (!notified) {
            notified = true;
            const msg = "检测到人脸识别，请手动进行识别后脚本才会继续运行。";
            if (CXProject.scripts.study.cfg.notifyWhenHasFaceRecognition) {
              CommonProject.scripts.settings.methods.notificationBySetting(msg, { duration: 0 });
            }
            lib.$message.warn({ content: msg, duration: 0 });
            $console.warn(msg);
          }
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 3e3);
    });
  }
  function waitForFaceRecognition() {
    let notified = false;
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const active = hasFaceRecognition();
        if (active) {
          if (!notified) {
            notified = true;
            const msg = "检测到人脸识别，请手动进行识别后脚本才会继续运行。";
            if (CXProject.scripts.study.cfg.notifyWhenHasFaceRecognition) {
              CommonProject.scripts.settings.methods.notificationBySetting(msg, { duration: 0 });
            }
            lib.$message.warn({ content: msg, duration: 0 });
            $console.warn(msg);
          }
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 3e3);
    });
  }
  const CORSUtils = {
    pinWorkPanel: lib.cors.defineTopFunction(() => {
      BackgroundProject.scripts.render.methods.pin(CommonProject.scripts.workResults);
    }),
    panelNormal: lib.cors.defineTopFunction(() => {
      BackgroundProject.scripts.render.methods.normal();
    }),
    panelMinimize: lib.cors.defineTopFunction(() => {
      BackgroundProject.scripts.render.methods.minimize();
    })
  };
  const ANSWERER_CONNECT_MESSAGE_TYPE = "ocs-answerer-config";
  const ANSWERER_CONNECT_PROTOCOL_VERSION = 1;
  let provider;
  function setAnswererConfigProvider(p) {
    provider = void 0;
    if (p && p.name && p.connectUrl) {
      try {
        const url = new URL(p.connectUrl);
        if (url.protocol === "https:" || url.protocol === "http:") {
          provider = p;
        }
      } catch {
      }
    }
  }
  function getAnswererConfigProvider() {
    return provider;
  }
  function openAnswererConnect() {
    if (!provider)
      return null;
    const connectUrl = new URL(provider.connectUrl);
    connectUrl.searchParams.set("from", location.origin);
    const width = 980;
    const height = 720;
    const left = Math.max(0, (screen.width - width) / 2);
    const top2 = Math.max(0, (screen.height - height) / 2);
    return window.open(
      connectUrl.toString(),
      "ocs_answerer_connect",
      `width=${width},height=${height},left=${left},top=${top2}`
    );
  }
  function waitForAnswererConfig(win, timeoutMs = 10 * 6e4, isAborted) {
    if (!provider)
      return Promise.reject(new Error("未配置题库获取渠道"));
    const expectedOrigin = new URL(provider.connectUrl).origin;
    return new Promise((resolve, reject) => {
      let finished = false;
      const closeWin = () => {
        try {
          win.close();
        } catch {
        }
      };
      const cleanup = () => {
        finished = true;
        clearTimeout(timer);
        clearInterval(poller);
        window.removeEventListener("message", onMessage);
        window.removeEventListener("pagehide", closeWin);
      };
      const fail = (msg) => {
        if (!finished) {
          cleanup();
          reject(new Error(msg));
        }
      };
      const onMessage = async (e) => {
        if (finished || e.source !== win || e.origin !== expectedOrigin)
          return;
        const d = e.data;
        if (!d || d.type !== ANSWERER_CONNECT_MESSAGE_TYPE || d.version !== ANSWERER_CONNECT_PROTOCOL_VERSION) {
          return;
        }
        try {
          const aws = await AnswerWrapperParser.from(d.config);
          cleanup();
          resolve(aws);
        } catch (err) {
          cleanup();
          reject(err instanceof Error ? err : new Error(String(err)));
        }
      };
      const timer = setTimeout(() => fail("获取题库配置超时，请重试或使用手动配置。"), timeoutMs);
      const poller = setInterval(() => {
        if (win.closed) {
          fail("题库网站窗口已被关闭，请重试或使用手动配置。");
        } else if (isAborted == null ? void 0 : isAborted()) {
          closeWin();
          fail("题库配置弹窗已关闭，获取已取消。");
        }
      }, 1e3);
      window.addEventListener("message", onMessage);
      window.addEventListener("pagehide", closeWin);
    });
  }
  function definedProjects() {
    return [CXProject, CommonProject, BackgroundProject];
  }
  exports2.$ = $;
  exports2.$const = $const;
  exports2.$elements = lib.$elements;
  exports2.$store = lib.$store;
  exports2.$string = $string;
  exports2.AnswerWrapperHandlerConfig = AnswerWrapperHandlerConfig;
  exports2.AnswerWrapperParser = AnswerWrapperParser;
  exports2.BackgroundProject = BackgroundProject;
  exports2.CXProject = CXProject;
  exports2.CommonProject = CommonProject;
  exports2.CustomOCSWorker = CustomOCSWorker;
  exports2.OCSWorker = OCSWorker;
  exports2.RenderScript = RenderScript;
  exports2.StringUtils = StringUtils;
  exports2.answerExactMatch = answerExactMatch;
  exports2.answerNormalizedMatch = answerNormalizedMatch;
  exports2.answerSimilar = answerSimilar;
  exports2.answerSimilarWithGap = answerSimilarWithGap;
  exports2.clearString = clearString;
  exports2.createDefaultQuestionResolver = createDefaultQuestionResolver;
  exports2.defaultAnswerWrapperHandler = defaultAnswerWrapperHandler;
  exports2.defaultWorkTypeResolver = defaultWorkTypeResolver;
  exports2.definedProjects = definedProjects;
  exports2.disambiguateSimilarOptions = disambiguateSimilarOptions;
  exports2.domSearch = domSearch;
  exports2.domSearchAll = domSearchAll;
  exports2.getAnswererConfigProvider = getAnswererConfigProvider;
  exports2.isJudgementOptions = isJudgementOptions;
  exports2.isPlainAnswer = isPlainAnswer;
  exports2.isProgramAnswer = isProgramAnswer;
  exports2.logoSvg = logoSvg;
  exports2.normalizeString = normalizeString;
  exports2.openAnswererConnect = openAnswererConnect;
  exports2.removeRedundant = removeRedundant;
  exports2.request = request;
  exports2.resolveCompletion = resolveCompletion;
  exports2.resolveJudgement = resolveJudgement;
  exports2.resolveMultiple = resolveMultiple;
  exports2.resolvePlainAnswer = resolvePlainAnswer;
  exports2.resolveSingle = resolveSingle;
  exports2.setAnswererConfigProvider = setAnswererConfigProvider;
  exports2.splitAnswer = splitAnswer;
  exports2.start = lib.start;
  exports2.waitForAnswererConfig = waitForAnswererConfig;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});


const STYLE = `/** easy-us 基础样式（通过 node_modules 软链引入，相对路径保证 Easy LESS 免配置直接编译） */
/** ===== 主题主色（一键更换） ===== */
/** 主色 */
/** 主色 hover 变浅 */
/** 主色浅色变体（禁用态等） */
/** 激活态浅底 */
/** 极浅底（提示卡片、hover 背景） */
/** 主色边框/竖条 */
/** focus 光环 */
/** 默认字体 */
/** 输入框默认边距 */
ul,
ol {
  line-height: 26px;
  padding-left: 22px;
  margin: 0px;
}
a {
  color: #2b67ff;
}
hr {
  border-style: solid;
  border-color: #63636346;
  border-width: 0px;
  border-bottom: 1px solid #63636346;
  margin-block-start: 1em;
  margin-block-end: 1em;
}
.base-style-active-form-control {
  border: 1px solid #ffffff00;
}
.base-style-active-form-control:focus {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
}
.base-style-active-form-control:focus:not([type='checkbox'], [type='radio']) {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
  background-color: white !important;
}
.base-style-active-form-control:hover {
  background-color: #ebeef4;
}
.base-style-input {
  outline: none;
  border: 1px solid #ffffff00;
  padding: 2px 8px;
  margin: 0px;
  background-color: #eef2f7;
  border-radius: 8px;
  color: black;
}
.base-style-input::placeholder {
  color: #bababa;
}
.base-style-switch {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: fit-content;
  min-width: 48px;
  height: 20px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  transition: all 0.2s ease-in-out;
  width: auto;
  background: gainsboro;
}
.base-style-switch:checked {
  background: #2b67ff;
}
.base-style-switch:disabled {
  background-color: #f7f7f78b;
}
.base-style-switch:checked::before {
  transform: translate(24px, 0px);
}
.base-style-switch::before {
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 0 2px 4px #00230b33;
  width: 14px;
  height: 14px;
  content: '';
}
.base-style-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
}
.base-style-button:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
.base-style-button + .base-style-button {
  margin-left: 12px;
}
.base-style-button:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
.base-style-button.danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
}
.base-style-button.danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}
.base-style-button:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
.base-style-button:disabled:active {
  box-shadow: none;
}
.base-style-button-secondary {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
  color: #606266;
  background-color: white;
  border: 1px solid #dcdcdc;
}
.base-style-button-secondary:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
.base-style-button-secondary + .base-style-button-secondary {
  margin-left: 12px;
}
.base-style-button-secondary:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
.base-style-button-secondary.danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
}
.base-style-button-secondary.danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}
.base-style-button-secondary:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
.base-style-button-secondary:disabled:active {
  box-shadow: none;
}
.base-style-button-secondary:hover {
  color: #2b67ff;
  border-color: #c4d5ff;
  background-color: rgba(43, 103, 255, 0.06);
}
container-element.hidden {
  display: none;
}
container-element.minimize {
  min-width: unset;
}
container-element {
  position: fixed;
  top: 10%;
  left: 10%;
  z-index: 99999;
  text-align: left;
  min-width: 300px;
  width: max-content;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #636363;
  box-shadow: 0 0 24px -12px #3f3f3f;
  border-radius: 12px;
  letter-spacing: 0.5px;
  border: 1px solid #c1c1c1;
  background-color: #f5f5f5;
}
header-element {
  display: flex;
  align-items: center;
  border-radius: 12px 12px 0px 0px;
  user-select: none;
  padding-bottom: 0px;
}
header-element .extra-menu-bar {
  width: 100%;
  padding: 4px;
  padding-bottom: 4px;
  background-color: white;
  border-top: 1px solid #e8e8e8;
  /** 默认隐藏，一直到需要激活的时候再更改 */
  display: none;
}
header-element .extra-menu-bar .script-panel-link {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
  color: #606266;
  background-color: white;
  border: 1px solid #dcdcdc;
  padding-bottom: 2px;
  margin-bottom: 0px;
}
header-element .extra-menu-bar .script-panel-link:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
header-element .extra-menu-bar .script-panel-link + header-element .extra-menu-bar .script-panel-link {
  margin-left: 12px;
}
header-element .extra-menu-bar .script-panel-link:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
header-element .extra-menu-bar .script-panel-link.danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
}
header-element .extra-menu-bar .script-panel-link.danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}
header-element .extra-menu-bar .script-panel-link:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
header-element .extra-menu-bar .script-panel-link:disabled:active {
  box-shadow: none;
}
header-element .extra-menu-bar .script-panel-link:hover {
  color: #2b67ff;
  border-color: #c4d5ff;
  background-color: rgba(43, 103, 255, 0.06);
}
header-element .extra-menu-bar .script-panel-link.active {
  background-color: rgba(43, 103, 255, 0.1);
  border-color: #2b67ff;
  color: #2b67ff;
}
header-element .extra-menu-bar .script-panel-link + .script-panel-link {
  margin-left: 4px;
}
header-element .header-menu-bar {
  padding-top: 4px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #f5f7fa;
  align-items: center;
  gap: 0px;
}
header-element .profile {
  cursor: move;
  margin-right: 4px;
}
header-element .switch:hover {
  background-color: #e4e9f0;
}
header-element .close:hover {
  background-color: #ff000038;
}
header-element .switch,
header-element .close {
  cursor: pointer;
}
header-element .dropdown {
  line-height: 20px;
}
header-element .dropdown .dropdown-trigger-element {
  padding: 2px 12px;
  border: none;
  border-top: 1px solid #00000000;
  border-radius: 8px 8px 0px 0px;
  font-weight: 500;
  color: #606266;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
header-element .dropdown .dropdown-trigger-element:hover {
  background-color: #ffffff80;
  color: #2b67ff;
}
header-element .dropdown.active .dropdown-trigger-element {
  --tab-border: 1px;
  --tab-border-color: #e8ecf1;
  --tab-bg: #ffffff;
  --tab-radius-limit: 8px;
  --tab-radius-grad: #0000 calc(69% - var(--tab-border)), var(--tab-border-color) calc(69% - var(--tab-border) + 0.25px), var(--tab-border-color) 69%, var(--tab-bg) calc(69% + 0.25px);
  --radius-start: radial-gradient(circle at top left, var(--tab-radius-grad));
  --radius-end: radial-gradient(circle at top right, var(--tab-radius-grad));
  position: relative;
  color: #2b67ff;
  font-weight: 600;
  padding: 2px 11px;
  background-color: var(--tab-bg);
  border: var(--tab-border) solid var(--tab-border-color);
  border-bottom: none;
  border-radius: var(--tab-radius-limit) var(--tab-radius-limit) 0 0;
  box-shadow: 0 1px 0 var(--tab-bg);
}
header-element .dropdown.active .dropdown-trigger-element::before {
  content: '';
  z-index: 1;
  position: absolute;
  inset: auto calc(-1 * var(--tab-radius-limit)) -1px calc(-1 * var(--tab-radius-limit));
  height: calc(var(--tab-radius-limit) + var(--tab-border));
  transform: translate(0px, 1px);
  pointer-events: none;
  background-image: var(--radius-start), var(--radius-end), linear-gradient(var(--tab-bg), var(--tab-bg));
  background-size: var(--tab-radius-limit) var(--tab-radius-limit), var(--tab-radius-limit) var(--tab-radius-limit), 100% var(--tab-border);
  background-position: top left,
						top right,
						bottom left;
  background-repeat: no-repeat;
}
header-element .switch {
  border-radius: 8px;
  line-height: 20px;
  margin-left: auto;
  transition: background-color 0.2s ease;
}
header-element .switch,
header-element .close,
header-element .profile {
  display: inline-flex;
  align-items: center;
  padding: 0px 8px;
}
.logo {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.project-selector {
  display: flex;
  align-items: center;
}
.project-selector select {
  background: #ffffff00;
  border-radius: 4px;
  border: 1px solid #63636346;
  padding: 4px;
}
.project-selector.expand-all {
  display: none;
}
.body {
  overflow: auto;
  width: auto;
  height: 100%;
  overscroll-behavior: contain;
}
script-panel-element {
  display: block;
  background-color: white;
  border-radius: 0px 0px 12px 12px;
  padding: 0px 8px 12px 8px;
  overflow: auto;
}
script-panel-element .script-panel-body {
  padding: 0px 8px;
}
script-panel-element + script-panel-element {
  margin-top: 12px;
}
.card + .card {
  margin-top: 12px;
}
.card {
  background-color: white;
  border-radius: 10px;
  padding: 0px 8px;
}
.notes {
  background: rgba(43, 103, 255, 0.06);
  border-left: 4px solid rgba(43, 103, 255, 0.4);
  border-radius: 4px 10px 10px 4px;
  width: -webkit-fill-available;
  margin: 0px 8px;
  line-height: 26px;
  letter-spacing: 1px;
}
.notes .notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
}
.notes .notes-header .notes-title {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.notes .notes-header .notes-info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #2b67ff;
  color: white;
  font-size: 10px;
  font-weight: bold;
  font-style: italic;
  line-height: 1;
  user-select: none;
}
.notes .notes-collapse-icon {
  font-size: 12px;
  transition: transform 0.2s;
}
.notes.collapsed .notes-body {
  display: none;
}
.notes.collapsed .notes-collapse-icon {
  transform: rotate(-90deg);
}
.secondary {
  font-size: 12px;
  color: #8b8b8b;
}
.tooltip-container {
  z-index: 99999999999999;
  padding: 6px 10px;
  color: white;
  background: rgba(0, 0, 0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: fixed;
  white-space: normal;
  width: fit-content;
  max-width: 400px;
  height: auto;
  border-radius: 6px;
  line-height: 18px;
  touch-action: manipulation;
  /** 展开/收起动画：透明度 + 位移，方向随放置位置翻转 */
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
  /** 气泡尾巴：水平位置由 --tooltip-arrow-left 驱动，始终对准目标中心 */
  /** 气泡在目标下方，尾巴朝上 */
  /** 气泡在目标上方，尾巴朝下 */
}
.tooltip-container.tooltip-bottom {
  transform: translateY(-4px);
}
.tooltip-container.tooltip-top {
  transform: translateY(4px);
}
.tooltip-container.show {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.tooltip-container::before {
  content: '';
  position: absolute;
  left: var(--tooltip-arrow-left, 10px);
  width: 8px;
  height: 8px;
  background: inherit;
  transform: rotate(45deg);
}
.tooltip-container.tooltip-bottom::before {
  top: -4px;
}
.tooltip-container.tooltip-top::before {
  bottom: -4px;
}
/** 移动端（粗指针）适配：限宽并加大内边距 */
@media (pointer: coarse) {
  .tooltip-container {
    max-width: min(400px, 80vw);
    padding: 8px 12px;
  }
}
.configs-container.lock {
  filter: blur(1px);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.configs-container .lock-wrapper {
  cursor: not-allowed !important;
  border-radius: 4px;
  position: absolute;
  left: 0px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.configs-container .lock-message {
  background-color: #ffffff7d;
  border-radius: 4px;
  box-shadow: 0px 0px 12px #6a6a6a98;
  padding: 2px;
}
.configs {
  display: table;
  background: #e1e1e107;
  width: -webkit-fill-available;
}
.configs .configs-body {
  display: table-row-group;
}
.configs .configs-body config-element + config-element label {
  padding-top: 4px;
}
.configs .configs-body config-element + config-element .config-wrapper {
  padding-top: 4px;
}
.configs .configs-body config-element {
  width: 100%;
  display: table-row;
  line-height: 26px;
  /** 前后插槽容器：仅作布局，抵消 > * 规则带来的底色与圆角 */
}
.configs .configs-body config-element label {
  white-space: nowrap;
  color: #4e5969;
  display: table-cell;
  padding-right: 12px;
  text-align: left;
  vertical-align: top;
  margin-right: 12px;
}
.configs .configs-body config-element .config-wrapper {
  display: table-cell;
  vertical-align: middle;
  /** check box 的样式 */
}
.configs .configs-body config-element .config-wrapper select {
  outline: none;
  border: none;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  padding: 2px 8px;
  border: 1px solid #ffffff00;
}
.configs .configs-body config-element .config-wrapper select:focus {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
}
.configs .configs-body config-element .config-wrapper select:focus:not([type='checkbox'], [type='radio']) {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
  background-color: white !important;
}
.configs .configs-body config-element .config-wrapper select:hover {
  background-color: #ebeef4;
}
.configs .configs-body config-element .config-wrapper textarea {
  padding: 2px 8px;
  outline: none;
  border: none;
  border: 1px solid #ffffff00;
}
.configs .configs-body config-element .config-wrapper textarea:focus {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
}
.configs .configs-body config-element .config-wrapper textarea:focus:not([type='checkbox'], [type='radio']) {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
  background-color: white !important;
}
.configs .configs-body config-element .config-wrapper textarea:hover {
  background-color: #ebeef4;
}
.configs .configs-body config-element .config-wrapper input:not([type='button']) {
  outline: none;
  padding: 2px 8px;
  margin: 0px;
  background-color: #eef2f7;
  border-radius: 8px;
  color: black;
  border: 1px solid #ffffff00;
}
.configs .configs-body config-element .config-wrapper input:not([type='button'])::placeholder {
  color: #bababa;
}
.configs .configs-body config-element .config-wrapper input:not([type='button']):focus {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
}
.configs .configs-body config-element .config-wrapper input:not([type='button']):focus:not([type='checkbox'], [type='radio']) {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
  background-color: white !important;
}
.configs .configs-body config-element .config-wrapper input:not([type='button']):hover {
  background-color: #ebeef4;
}
.configs .configs-body config-element .config-wrapper input[type='range'] {
  padding: 0px;
}
.configs .configs-body config-element .config-wrapper input[type='button'] {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
  width: auto;
  padding: 4px 12px;
}
.configs .configs-body config-element .config-wrapper input[type='button']:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
.configs .configs-body config-element .config-wrapper input[type='button'] + .configs .configs-body config-element .config-wrapper input[type='button'] {
  margin-left: 12px;
}
.configs .configs-body config-element .config-wrapper input[type='button']:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
.configs .configs-body config-element .config-wrapper input[type='button'].danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
}
.configs .configs-body config-element .config-wrapper input[type='button'].danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}
.configs .configs-body config-element .config-wrapper input[type='button']:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
.configs .configs-body config-element .config-wrapper input[type='button']:disabled:active {
  box-shadow: none;
}
.configs .configs-body config-element .config-wrapper input[type='checkbox'] {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: fit-content;
  min-width: 48px;
  height: 20px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  transition: all 0.2s ease-in-out;
  width: auto;
  background: gainsboro;
}
.configs .configs-body config-element .config-wrapper input[type='checkbox']:checked {
  background: #2b67ff;
}
.configs .configs-body config-element .config-wrapper input[type='checkbox']:disabled {
  background-color: #f7f7f78b;
}
.configs .configs-body config-element .config-wrapper input[type='checkbox']:checked::before {
  transform: translate(24px, 0px);
}
.configs .configs-body config-element .config-wrapper input[type='checkbox']::before {
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 0 2px 4px #00230b33;
  width: 14px;
  height: 14px;
  content: '';
}
.configs .configs-body config-element .config-wrapper input:not([type='checkbox'], [type='radio'], [type='button']),
.configs .configs-body config-element .config-wrapper textarea,
.configs .configs-body config-element .config-wrapper select {
  width: -webkit-fill-available;
  font-size: inherit;
}
.configs .configs-body config-element .config-wrapper input[type='checkbox'],
.configs .configs-body config-element .config-wrapper input[type='radio'],
.configs .configs-body config-element .config-wrapper input[type='range'] {
  accent-color: #2b67ff;
}
.configs .configs-body config-element .config-wrapper > *:not(.tooltip) {
  background-color: #eef2f7;
  border-radius: 8px;
  color: black;
  float: right;
}
.configs .configs-body config-element .config-wrapper > .config-provider-container {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: transparent;
  border-radius: 0px;
  padding: 0px;
  /** 插槽中的按钮：去除下外边距保持垂直居中，禁止收缩 */
  /** 容器内的表单控件：恢复独立控件底色 */
}
.configs .configs-body config-element .config-wrapper > .config-provider-container .config-prefix,
.configs .configs-body config-element .config-wrapper > .config-provider-container .config-suffix {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  line-height: 20px;
  flex-shrink: 0;
}
.configs .configs-body config-element .config-wrapper > .config-provider-container .base-style-button,
.configs .configs-body config-element .config-wrapper > .config-provider-container .base-style-button-secondary {
  margin-bottom: 0px;
  white-space: nowrap;
  flex-shrink: 0;
}
.configs .configs-body config-element .config-wrapper > .config-provider-container > input:not([type='checkbox'], [type='radio'], [type='button']),
.configs .configs-body config-element .config-wrapper > .config-provider-container > select,
.configs .configs-body config-element .config-wrapper > .config-provider-container > textarea {
  width: auto;
  min-width: 60px;
  background-color: #eef2f7;
}
.configs .configs-body config-element .config-wrapper > *:disabled {
  cursor: not-allowed;
  background-color: #f7f7f78b;
}
.message-container {
  margin-bottom: 4px;
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0px);
  min-width: 300px;
  z-index: 2;
}
.message-container message-element {
  display: flex;
  border-radius: 8px;
  padding: 4px 12px;
  margin-bottom: 4px;
}
.message-container message-element .message-content-container {
  margin-right: 8px;
  flex: auto;
}
.message-container message-element .message-text {
  letter-spacing: 1px;
  font-weight: bold;
}
.message-container message-element .message-closer {
  width: 18px;
  min-width: 18px;
  cursor: pointer;
  background-color: #ffffffb3;
  color: #a1a1a1;
  border-radius: 100%;
  text-align: center;
  height: 18px;
  vertical-align: middle;
  font-size: 12px;
}
.message-container message-element.error {
  background-color: #ffe6e6;
  color: #c70208;
  border: 1px solid #ff6b6ded;
}
.message-container message-element.info {
  background-color: #d5e1ff;
  color: #002991;
  border: 1px solid #aac2ff;
}
.message-container message-element.success {
  background-color: #e8ffe0;
  color: #3e8d0d;
  border: 1px solid #6fd91d;
}
.message-container message-element.warn {
  background-color: #ffefc8;
  color: #9b7400;
  border: 1px solid #ffc107;
}
modal-element {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  border-radius: 14px;
  box-shadow: 0px 0px 24px -12px black;
  border: 1px solid #929292;
  height: fit-content;
  transform: translate(-50%, -50%);
  padding: 12px 18px 18px 18px;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  z-index: 99999999999;
  line-height: 24px;
}
modal-element .modal-profile {
  zoom: 0.9;
  color: #969696;
  user-select: none;
  margin-bottom: 4px;
}
modal-element .modal-title {
  font-size: 18px;
  font-weight: bold;
  user-select: none;
}
modal-element .modal-body {
  margin: 12px 0px;
  overflow: auto;
}
modal-element .modal-footer {
  display: flex;
  white-space: nowrap;
  justify-content: end;
  align-items: end;
}
modal-element .modal-footer > * + * {
  margin-left: 12px;
}
modal-element .modal-input {
  outline: none;
  padding: 2px 8px;
  margin: 0px;
  background-color: #eef2f7;
  border-radius: 8px;
  color: black;
  border: 1px solid #ffffff00;
  width: -webkit-fill-available;
}
modal-element .modal-input::placeholder {
  color: #bababa;
}
modal-element .modal-input:focus {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
}
modal-element .modal-input:focus:not([type='checkbox'], [type='radio']) {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
  background-color: white !important;
}
modal-element .modal-input:hover {
  background-color: #ebeef4;
}
modal-element .modal-cancel-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
  color: gray;
  background-color: white;
  border: 1px solid #dcdcdc;
}
modal-element .modal-cancel-button:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
modal-element .modal-cancel-button + modal-element .modal-cancel-button {
  margin-left: 12px;
}
modal-element .modal-cancel-button:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
modal-element .modal-cancel-button.danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
}
modal-element .modal-cancel-button.danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}
modal-element .modal-cancel-button:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
modal-element .modal-cancel-button:disabled:active {
  box-shadow: none;
}
modal-element .modal-confirm-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
}
modal-element .modal-confirm-button:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
modal-element .modal-confirm-button + modal-element .modal-confirm-button {
  margin-left: 12px;
}
modal-element .modal-confirm-button:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
modal-element .modal-confirm-button.danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
}
modal-element .modal-confirm-button.danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}
modal-element .modal-confirm-button:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
modal-element .modal-confirm-button:disabled:active {
  box-shadow: none;
}
modal-element.alert .modal-input,
modal-element.alert .modal-cancel-button {
  display: none;
}
modal-element.alert .modal-confirm-button {
  margin: 0;
}
modal-element.prompt .modal-input,
modal-element.prompt .modal-cancel-button,
modal-element.prompt .modal-confirm-button {
  display: block;
}
modal-element.confirm .modal-input {
  display: none;
}
.modal-wrapper {
  width: 100%;
  height: 100%;
  z-index: 9999;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9999999;
  background-color: rgba(0, 0, 0, 0.265);
  color: #636363;
  font: 14px Menlo, Monaco, Consolas, 'Courier New', monospace;
}
.pointer {
  cursor: pointer;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  padding: 4px 0px 8px 0px;
}
.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #63636346;
}
.separator:not(:empty)::before {
  margin-right: 0.25em;
}
.separator:not(:empty)::after {
  margin-left: 0.25em;
}
container-element.minimize .body,
container-element.minimize header-element .dropdown,
container-element.minimize .footer {
  display: none;
}
container-element.minimize header-element {
  border-radius: 12px;
  padding-bottom: 8px;
  box-shadow: 0px 0px 24px -12px black;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown.active .dropdown-trigger-element {
  color: #2b67ff;
}
.dropdown-trigger-element {
  cursor: pointer;
}
.dropdown-content {
  position: absolute;
  background-color: #ffffff;
  overflow: auto;
  box-shadow: 0 6px 16px 0 #00000014, 0 3px 6px -4px #0000001f;
  z-index: 1;
  border: 1px solid #e8ecf1;
  border-radius: 12px;
  padding: 4px;
  min-width: 120px;
  /** 下拉展开/收起动画：透明度 + 下滑 + 轻微缩放，让用户感知这是一个下拉框 */
  display: block;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
  transform-origin: top center;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
}
.dropdown-content.show {
  visibility: visible;
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
.dropdown-content {
  cursor: pointer;
  z-index: 999;
}
.dropdown-content .dropdown-option {
  padding: 4px 12px;
  white-space: nowrap;
  border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.dropdown-content .dropdown-option:hover {
  background-color: #f5f5f5;
}
.dropdown-content .dropdown-option.active {
  background-color: rgba(43, 103, 255, 0.1);
  color: #2b67ff;
  font-weight: 500;
}
.space {
  display: inline-flex;
}
.config-details {
  animation: fade-in 0.5s;
}
.config-details label {
  padding-left: 12px;
}
message-element {
  animation: show 0.5s;
}
script-panel-element > div,
script-panel-link,
container-element,
modal-element {
  animation: fade-in 0.3s;
}
@keyframes show {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.checkbox-label {
  display: inline-block !important;
  position: relative;
  cursor: pointer;
  font-size: 16px;
  color: #2c3e50;
}
/* 隐藏原始复选框 */
.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
/* 自定义按钮样式 */
.checkbox-label::after {
  content: '';
  display: inline-block;
  border-radius: 50%;
  transition: all 0.1s ease;
  position: relative;
  margin-left: 4px;
  vertical-align: middle;
}
/* 向下箭头（未选中状态） */
.checkbox-label::before {
  content: '🔽';
  position: absolute;
  width: 0;
  height: 0;
  right: 8px;
  transition: all 0.1s ease;
  z-index: 2;
}
/* 向上箭头（选中状态） */
.checked .checkbox-label::before {
  content: '🔼';
}
/** 气泡自适应：不可视气泡固定显示在屏幕正上方（从顶部向下滑出自身高度） */
message-element.message-viewport-top {
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  max-width: 90vw;
  animation: message-viewport-top-slide-down 0.25s ease;
  transition: top 0.2s ease;
}
@keyframes message-viewport-top-slide-down {
  from {
    transform: translateX(-50%) translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}
/** OCS 自定义样式 */
/**
 * OCS 自定义样式（已从 easy-us 样式中隔离）
 * 本文件仅包含与 easy-us/assets/css/style.css 不同或新增的自定义规则。
 */
/** ===== 主题变量（对齐 easy-us 主题，跟随 @primary 一键更换） ===== */
/** 注意：本文件依赖 easy-us/assets/less/style.less 中的主题变量，需在其之后编译（见 style.less） */
/** 主色 */
/** 按钮颜色 */
/** 焦点边框/阴影 */
/** ===== 通用 mixin ===== */
/** 输入控件焦点样式 */
/** 输入控件焦点样式（非 checkbox/radio 时填充白底） */
/** 按钮基础样式 */
/** 按钮状态样式（需在次级样式之前调用，保证次级 hover 覆盖默认 hover） */
/** 次级按钮样式（白底灰边） */
/** 标签配色 */
a {
  color: #2b67ff;
}
.base-style-active-form-control:focus {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
}
.base-style-active-form-control:focus:not([type='checkbox'], [type='radio']) {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
  background-color: white !important;
}
.base-style-switch:checked {
  background: #2b67ff;
}
/**
 * 注意：.base-style-button / .base-style-button-secondary 与 easy-us 中的 mixin 同名，
 * easy-us 调用 .base-style-button() 时会把同名规则集的【内部嵌套规则】一并展开，
 * 因此这两个类的状态规则必须保持扁平写法（单独定义），不能嵌套在类内部。
 */
.base-style-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
}
.base-style-button:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
.base-style-button:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
.base-style-button:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
.base-style-button-secondary {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
  color: #606266;
  background-color: white;
  border: 1px solid #dcdcdc;
}
.base-style-button-secondary:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
.base-style-button-secondary:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
.base-style-button-secondary:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
.base-style-button-secondary:hover {
  color: #2b67ff;
  border-color: #91b0ff;
  background-color: rgba(43, 103, 255, 0.06);
}
header-element .extra-menu-bar .script-panel-link {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
  color: #606266;
  background-color: white;
  border: 1px solid #dcdcdc;
  padding-bottom: 2px;
  margin-bottom: 0px;
}
header-element .extra-menu-bar .script-panel-link:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
header-element .extra-menu-bar .script-panel-link:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
header-element .extra-menu-bar .script-panel-link:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
header-element .extra-menu-bar .script-panel-link:hover {
  color: #2b67ff;
  border-color: #91b0ff;
  background-color: rgba(43, 103, 255, 0.06);
}
header-element .extra-menu-bar .script-panel-link.active {
  background-color: rgba(43, 103, 255, 0.1);
  border-color: #2b67ff;
  color: #2b67ff;
}
header-element .dropdown .dropdown-trigger-element:hover {
  background-color: #ffffff80;
  color: #2b67ff;
}
header-element .dropdown.active .dropdown-trigger-element {
  --tab-border: 1px;
  --tab-border-color: #e8ecf1;
  --tab-bg: #ffffff;
  --tab-radius-limit: 8px;
  --tab-radius-grad: #0000 calc(69% - var(--tab-border)), var(--tab-border-color) calc(69% - var(--tab-border) + 0.25px), var(--tab-border-color) 69%, var(--tab-bg) calc(69% + 0.25px);
  --radius-start: radial-gradient(circle at top left, var(--tab-radius-grad));
  --radius-end: radial-gradient(circle at top right, var(--tab-radius-grad));
  position: relative;
  color: #2b67ff;
  font-weight: 600;
  padding: 2px 11px;
  background-color: var(--tab-bg);
  border: var(--tab-border) solid var(--tab-border-color);
  border-bottom: none;
  border-radius: var(--tab-radius-limit) var(--tab-radius-limit) 0 0;
  box-shadow: 0 1px 0 var(--tab-bg);
}
.notes {
  background: rgba(43, 103, 255, 0.06);
  border-left: 4px solid rgba(43, 103, 255, 0.4);
  border-radius: 4px 10px 10px 4px;
  width: -webkit-fill-available;
  margin: 0px 8px;
  line-height: 26px;
  letter-spacing: 1px;
}
.notes .notes-header .notes-info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #2b67ff;
  color: white;
  font-size: 10px;
  font-weight: bold;
  font-style: italic;
  line-height: 1;
  user-select: none;
}
.configs .configs-body config-element .config-wrapper select:focus {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
}
.configs .configs-body config-element .config-wrapper select:focus:not([type='checkbox'], [type='radio']) {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
  background-color: white !important;
}
.configs .configs-body config-element .config-wrapper textarea:focus {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
}
.configs .configs-body config-element .config-wrapper textarea:focus:not([type='checkbox'], [type='radio']) {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
  background-color: white !important;
}
.configs .configs-body config-element .config-wrapper input:not([type='button']):focus {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
}
.configs .configs-body config-element .config-wrapper input:not([type='button']):focus:not([type='checkbox'], [type='radio']) {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
  background-color: white !important;
}
.configs .configs-body config-element .config-wrapper input[type='button'] {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
  width: auto;
  padding: 4px 12px;
}
.configs .configs-body config-element .config-wrapper input[type='button']:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
.configs .configs-body config-element .config-wrapper input[type='button']:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
.configs .configs-body config-element .config-wrapper input[type='button']:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
.configs .configs-body config-element .config-wrapper input[type='checkbox']:checked {
  background: #2b67ff;
}
.configs .configs-body config-element .config-wrapper input[type='checkbox'],
.configs .configs-body config-element .config-wrapper input[type='radio'],
.configs .configs-body config-element .config-wrapper input[type='range'] {
  accent-color: #2b67ff;
}
.message-container message-element.info {
  background-color: #d5e1ff;
  color: #002991;
  border: 1px solid #aac2ff;
}
modal-element .modal-input:focus {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
}
modal-element .modal-input:focus:not([type='checkbox'], [type='radio']) {
  border: 1px solid #2b67ff;
  box-shadow: 0px 0px 4px rgba(43, 103, 255, 0.32);
  background-color: white !important;
}
modal-element .modal-cancel-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
  color: gray;
  background-color: white;
  border: 1px solid #dcdcdc;
}
modal-element .modal-cancel-button:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
modal-element .modal-cancel-button:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
modal-element .modal-cancel-button:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
modal-element .modal-confirm-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  background-color: #2b67ff;
  border: 1px solid #2b67ff;
  color: white;
  cursor: pointer !important;
  transition: all 0.2s ease;
}
modal-element .modal-confirm-button:active {
  box-shadow: 0px 0px 8px rgba(43, 103, 255, 0.65);
}
modal-element .modal-confirm-button:hover {
  background-color: #5e8cff;
  border-color: #5e8cff;
}
modal-element .modal-confirm-button:disabled {
  background-color: #abc2ff;
  border-color: #abc2ff;
  color: white;
  cursor: not-allowed !important;
}
/** ===== 题库状态列表 ===== */
.answerer-status-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}
.answerer-status-list .answerer-status-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background-color: #fafafa;
}
.answerer-status-list .answerer-status-item .name {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.answerer-status-list .answerer-status-item .status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  flex-shrink: 0;
}
.answerer-status-list .answerer-status-item .status .latency {
  color: #8c8c8c;
}
.answerer-status-list .answerer-status-item .status .badge {
  padding: 2px 8px;
  border-radius: 10px;
}
.answerer-status-list .answerer-status-item .status .badge.success {
  color: #52c41a;
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
}
.answerer-status-list .answerer-status-item .status .badge.error {
  color: #ff4d4f;
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
}
.answerer-status-list .answerer-status-item .status .badge.timeout {
  color: #faad14;
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
}
.answerer-status-list .answerer-status-item .status .badge.disabled {
  color: #8c8c8c;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
}
.dropdown.active .dropdown-trigger-element {
  color: #2b67ff;
}
.dropdown-content .dropdown-option.active {
  background-color: rgba(43, 103, 255, 0.1);
  color: #2b67ff;
  font-weight: 500;
}
/** ===== 搜索结果样式（从 easy-us 迁移，仅 OCS 项目使用） ===== */
.search-infos-num {
  width: 26px;
  margin: 2px;
  height: 20px;
  border-radius: 4px;
  display: inline-block;
  background-color: white;
  text-align: center;
  cursor: pointer;
  border: 1px solid #b6b6b6;
}
.search-infos-num.requested {
  border: 1px solid #789eff;
  color: #789eff;
}
.search-infos-num.searching {
  border: 1px solid rgba(43, 103, 255, 0.4);
  border-radius: 4px;
  color: #2b67ff;
  animation: ocs-searching-pulse 1.2s ease-in-out infinite;
}
@keyframes ocs-searching-pulse {
  0%,
  100% {
    box-shadow: 0 0 3px 1px rgba(43, 103, 255, 0.55);
  }
  50% {
    box-shadow: 0 0 1px 0px rgba(43, 103, 255, 0.2);
  }
}
.search-infos-num.active {
  background-color: #2b67ff !important;
  color: white;
}
.search-infos-num.error {
  border: 1px solid #ff8789ed;
  background-color: #ff6b6ded;
  color: white;
}
.search-infos-num.finish {
  background-color: #789eff;
  border: 1px solid #789eff;
  color: white;
}
search-infos-element {
  display: block;
  overflow: auto;
}
search-infos-element .search-result .question {
  font-weight: bold;
  max-height: 200px;
  overflow: auto;
}
search-infos-element .search-result .answer {
  color: #7c7c7c;
}
search-infos-element .search-result .answer code {
  border-bottom: 1px solid #dcdcdc;
  padding: 2px 0px;
  border-radius: 2px;
  margin: 4px;
  line-height: 22px;
}
search-infos-element .search-result .answer code + code {
  margin-left: 4px;
}
search-infos-element .search-result .search-result-answer-tag {
  padding: 2px 6px;
  border-radius: 2px;
  font-size: 12px;
  cursor: pointer;
  margin-right: 6px;
}
search-infos-element .search-result .search-result-answer-tag + .search-result-answer-tag {
  margin-left: 4px;
}
search-infos-element .search-result .search-result-answer-tag.blue {
  color: #2b67ff;
  background-color: rgba(43, 103, 255, 0.08);
  border: 1px solid rgba(43, 103, 255, 0.4);
}
search-infos-element .search-result .search-result-answer-tag.green {
  color: #52c41a;
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
}
search-infos-element .search-result .search-result-answer-tag.gray {
  color: #595959;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
}
search-infos-element .search-result .search-result-answer-tag.red {
  color: #ff4d4f;
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
}
search-infos-element .search-result .search-result-answer-tag.yellow {
  color: #faad14;
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
}
search-infos-element .search-result-question-type {
  background-color: rgba(43, 103, 255, 0.08);
  border: 1px solid rgba(43, 103, 255, 0.4);
  color: #2b67ff;
  margin-right: 8px;
  padding: 0px 4px;
  border-radius: 4px;
}
search-infos-element .error {
  color: #ff6b6ded;
  display: inline-block;
  padding-left: 12px;
}
.work-result-list {
  max-height: 400px;
  overflow: auto;
  padding: 4px 0px;
}
.work-result-question-container {
  position: absolute;
  width: 400px;
  left: -100%;
  top: 0px;
  background: white;
  border: 1px solid #cbcbcb;
  border-radius: 4px;
  box-shadow: 0px 0px 12px #d1cfcf;
  padding: 12px;
}
.work-result-question-container .close-search-result {
  font-size: 12px;
  margin-left: 8px;
  text-decoration: underline;
  color: gray;
  cursor: pointer;
}
.search-info-title {
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 12px;
  line-height: 20px;
  overflow: auto;
}
.search-info-title .title-content {
  max-height: 200px;
  overflow: auto;
}
.alert-info-wrapper {
  margin-bottom: 8px;
  margin-top: 8px;
}
.alert-info-wrapper .result-info {
  padding: 6px;
  text-align: center;
  border-radius: 6px;
}
.alert-info-wrapper .unresolved,
.alert-info-wrapper .no-answer {
  color: #a1a1a1;
  background-color: #f7f7f7;
}
.alert-info-wrapper .warn {
  color: #d48806;
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
}
.alert-info-wrapper .error {
  color: #ff4d4f;
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
}
/** ===== 使用指南/控制台/Markdown 样式（从 easy-us 迁移，仅 OCS 项目使用） ===== */
.user-guide > li {
  padding: 4px 0px;
}
.copy,
.question-title-extra-btn {
  margin-left: 4px;
  padding: 2px 4px;
  border-radius: 2px;
  box-shadow: 0 0 4px #b1b1b1;
  cursor: pointer !important;
  font-weight: normal;
  font-size: 12px;
}
.console {
  max-height: 300px;
  max-width: 400px;
  overflow: auto;
  background-color: #292929;
  padding: 12px 6px;
  color: #ececec;
  font-size: 12px;
}
.console .item {
  padding: 3px 0px;
  border-radius: 2px;
}
.console .item .time {
  color: #757575;
}
.console .item .info {
  background-color: rgba(43, 103, 255, 0.64);
}
.console .item .warn {
  background-color: #ffc107db;
}
.console .item .error {
  background-color: #f36c71cc;
}
.console .item .debug,
.console .item .log {
  background-color: #9e9e9ec4;
}
.console *::selection {
  background-color: #ffffff6b;
}
.markdown {
  max-width: 400px;
  max-height: 50vh;
  overflow: auto;
}
.markdown code {
  padding: 2px 4px;
  background-color: #f0f0f0;
  border-radius: 6px;
  font-size: 12px;
}
.markdown blockquote {
  padding: 4px 4px 4px 12px;
  margin: 0px;
  color: #b5b5b5;
  border-left: #ababab 2px solid;
}
.markdown blockquote p {
  margin: 0px;
}
.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6,
.markdown p {
  margin: 8px 0px;
}
/** ===== 动画 ===== */
@keyframes show {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
/** ===== 边缘最小化图标模式 ===== */
container-element .edge-minimize-icon {
  display: none;
}
container-element.edge-minimize {
  min-width: unset;
  width: 64px;
}
container-element.edge-minimize header-element {
  display: none;
}
container-element.edge-minimize .message-container {
  left: 0;
  transform: none;
}
container-element.edge-minimize .edge-minimize-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  cursor: pointer;
  user-select: none;
}
container-element.edge-minimize .edge-minimize-icon svg {
  width: 42px;
  height: 42px;
}
container-element.edge-minimize.edge-left {
  border-radius: 0 12px 12px 0;
}
container-element.edge-minimize.edge-right {
  border-radius: 12px 0 0 12px;
}
/** ===== 吸附过渡动画（仅在程序化吸附时临时添加） ===== */
container-element.edge-snapping {
  transition: left 0.2s ease, top 0.2s ease;
}
/** ===== 边缘拖放高亮区域 ===== */
.edge-drop-zone {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 99998;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.edge-drop-zone .edge-drop-zone-tip {
  writing-mode: vertical-rl;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 6px;
  color: rgba(43, 103, 255, 0.9);
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
  user-select: none;
}
.edge-drop-zone.show {
  opacity: 1;
}
.edge-drop-zone.zone-left {
  left: 0;
  background: linear-gradient(to right, rgba(43, 103, 255, 0.25), transparent);
  border-right: 2px solid rgba(43, 103, 255, 0.6);
}
.edge-drop-zone.zone-right {
  right: 0;
  background: linear-gradient(to left, rgba(43, 103, 255, 0.25), transparent);
  border-left: 2px solid rgba(43, 103, 255, 0.6);
}
container-element .edge-minimize-icon {
  touch-action: none;
}
header-element .profile {
  gap: 8px;
}
modal-element .modal-cancel-button:hover {
  color: white;
}
/** ===== 题库配置弹窗组件（src/utils/ui.ts 配套样式） ===== */
/** ===== 通用口风琴卡片（下拉展开/收起列表组件） =====
 * 结构：.accordion-card > .accordion-card-header（点击整行展开/收起）+ .accordion-card-body
 * 状态：.expanded 展开（箭头旋转 + 详情区显示），由 JS 切换 class 驱动
 * 组件工厂：utils/ui.ts 的 createAccordionCard
 * 使用方：题库配置卡片（aw-card）、搜索结果下拉列表 
 */
.accordion-card {
  border: 1px solid #e3e8ee;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}
.accordion-card:hover {
  border-color: #b6c6dd;
  box-shadow: 0 2px 8px rgba(31, 35, 41, 0.08);
}
.accordion-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.accordion-card-header:hover {
  background-color: #f5f8fb;
}
.accordion-card-spacer {
  flex: 1;
}
.accordion-card-chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 20px;
  height: 20px;
  color: #9aa4b2;
  border-radius: 4px;
  transition: transform 0.2s ease;
  transform: rotate(-90deg);
}
.accordion-card.expanded .accordion-card-chevron {
  transform: rotate(0deg);
}
.accordion-card-body {
  display: none;
  border-top: 1px solid #eef2f7;
  background-color: #f8fafc;
  padding: 8px 12px;
  max-height: 300px;
  overflow: auto;
}
.accordion-card.expanded .accordion-card-body {
  display: block;
}
.aw-card-name {
  font-weight: 600;
  font-size: 14px;
  color: #1f2329;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: opacity 0.2s ease;
}
.aw-card.disabled .aw-card-name {
  opacity: 0.45;
}
.aw-card-badge {
  flex: none;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  line-height: 18px;
  color: #5a6b85;
  background-color: #eef2f7;
  border-radius: 999px;
  padding: 0 8px;
}
.aw-card-home {
  flex: none;
  text-decoration: none;
  font-size: 13px;
  line-height: 1;
}
.aw-card-home.no-home {
  opacity: 0.4;
  cursor: default;
}
.aw-card-status-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
}
.aw-card-status {
  flex: none;
  font-size: 11px;
  line-height: 18px;
  padding: 0 8px;
  border-radius: 999px;
  background-color: #eef2f7;
  color: #5a6b85;
  white-space: nowrap;
}
.aw-card-status.probing {
  color: #9aa4b2;
}
.aw-card-status.success {
  background-color: #e8f7ee;
  color: #2e7d4f;
}
.aw-card-status.error,
.aw-card-status.invalid {
  background-color: #fdeeee;
  color: #c0392b;
}
.aw-card-status.timeout {
  background-color: #fdf3e5;
  color: #b26a00;
}
.aw-card-status.disabled {
  background-color: #eef2f7;
  color: #8a94a6;
}
.aw-card-status.latency {
  background-color: #eef2f7;
  color: #5a6b85;
}
.aw-card-rows {
  list-style: none;
  padding: 0;
  margin: 0;
}
.aw-card-row {
  display: flex;
  align-items: flex-start;
  line-height: 22px;
  font-size: 13px;
}
.aw-card-label {
  flex: none;
  width: 64px;
  margin-right: 8px;
  color: #8a94a6;
}
.aw-card-value {
  word-break: break-all;
  color: #1f2329;
}
.aw-section-header {
  margin-top: 12px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.aw-section-copy {
  padding: 2px 8px;
  font-size: 12px;
  margin-left: auto;
}
.aw-connect-hero {
  text-align: center;
  padding: 20px 16px;
  background-color: #f6f8fb;
  border: 1px solid #eef2f7;
  border-radius: 12px;
  margin-bottom: 16px;
}
.aw-connect-hero-icon {
  font-size: 28px;
  line-height: 1;
  margin-bottom: 8px;
}
.aw-connect-hero-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2329;
  margin-bottom: 6px;
}
.aw-connect-hero-subtitle {
  font-size: 13px;
  color: #5a6b85;
  line-height: 18px;
}
.aw-connect-hero-extra {
  font-size: 13px;
  color: #5a6b85;
  line-height: 18px;
  margin-top: 6px;
}
.aw-connect-hero-extra b {
  color: #1f2329;
}
.aw-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  margin: 12px 0;
}
.aw-step {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #5a6b85;
}
.aw-step-num {
  flex: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #2b67ff;
  color: #fff;
  font-size: 11px;
  line-height: 16px;
  text-align: center;
}
.aw-step-arrow {
  color: #c1c9d4;
  font-size: 12px;
}
.aw-connect-status {
  display: none;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  margin-bottom: 12px;
}
.aw-connect-status.info {
  display: block;
  background-color: #eef4ff;
  border-color: #c9d9ff;
  color: #3f5de0;
}
.aw-connect-status.success {
  display: block;
  background-color: #e8f7ee;
  border-color: #b7e3c7;
  color: #2e7d4f;
}
.aw-connect-status.error {
  display: block;
  background-color: #fdeeee;
  border-color: #f5c6c6;
  color: #c0392b;
}
.aw-connect-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: #2b67ff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s ease, opacity 0.15s ease;
}
.aw-connect-btn:hover:not(:disabled) {
  background-color: #5e8cff;
}
.aw-connect-btn:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}
.aw-connect-btn.lg {
  padding: 8px 24px;
  font-size: 15px;
}
@keyframes ocs-spin {
  to {
    transform: rotate(360deg);
  }
}
.aw-spin {
  animation: ocs-spin 0.8s linear infinite;
  margin-right: 6px;
}
/** ===== 快捷菜单链接按钮（background.ts $menu 注册）淡入淡出动画 ===== */
.script-panel-link {
  animation: ocs-menu-fade-in 0.3s ease both;
  transition: opacity 0.25s ease, background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}
.script-panel-link:hover {
  opacity: 0.85;
}
.script-panel-link.active {
  transition: opacity 0.25s ease, background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
}
@keyframes ocs-menu-fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/** ===== 搜索结果面板：序号列表前的帮助图标（承载答题进度/序号解释提示） ===== */
.search-infos-help {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: 4px;
  border-radius: 50%;
  border: 1px solid #c1c9d4;
  color: #9aa4b2;
  font-weight: bold;
  cursor: help;
  user-select: none;
}
.search-infos-help:hover {
  border-color: #2b67ff;
  color: #2b67ff;
}
.work-control-panel {
  display: flex;
  margin: 12px 0px;
}
.text-secondary {
  color: #606266;
  font-size: 12px;
}
`;

/* eslint-disable no-undef, max-len */
/// <reference path="./global.d.ts" />

// 环境检测
if (
	[
		'GM_getTab',
		'GM_saveTab',
		'GM_setValue',
		'GM_getValue',
		'unsafeWindow',
		'GM_listValues',
		'GM_deleteValue',
		'GM_notification',
		'GM_xmlhttpRequest',
		'GM_getResourceText',
		'GM_addValueChangeListener',
		'GM_removeValueChangeListener'
	].some((api) => typeof Reflect.get(globalThis, api) === 'undefined')
) {
	alert(
		`CXStudy 超星助手需要完整的脚本管理器 API，当前管理器（${GM_info.scriptHandler}）不受支持。` +
			'请改用 Tampermonkey（油猴）或 ScriptCat（脚本猫）。'
	);
	return;
}

const { start, definedProjects, CommonProject, RenderScript, logoSvg } = OCS;

const infos = GM_info;

(function () {
	'use strict';

	const projects = definedProjects();

	// 运行脚本
	start({
		projects: projects,
		renderConfig: {
			renderScript: RenderScript,
			styles: [STYLE],
			defaultPanelName: CommonProject.scripts.settings.namespace,
			title: `${logoSvg} CXStudy 超星助手 <span style="font-size: 12px; color: #969696;">v${infos.script.version}</span>`
		}
	});
})();
