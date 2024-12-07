import {
  Platform
} from "./chunk-K2NDXIF7.js";
import {
  Meta
} from "./chunk-S5ZL5BTY.js";
import {
  HttpParams
} from "./chunk-GD65ZJVJ.js";
import {
  DOCUMENT
} from "./chunk-UHKNILCW.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  InputFlags,
  NgModule,
  NgZone,
  Optional,
  Output,
  computed,
  effect,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  untracked,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵinject,
  ɵɵlistener,
  ɵɵstyleProp
} from "./chunk-AR45BFXM.js";
import "./chunk-VBAVZQQR.js";
import {
  __spreadValues
} from "./chunk-UIX7UNZW.js";

// node_modules/@angular/cdk/fesm2022/clipboard.mjs
var PendingCopy = class {
  constructor(text, _document) {
    this._document = _document;
    const textarea = this._textarea = this._document.createElement("textarea");
    const styles = textarea.style;
    styles.position = "fixed";
    styles.top = styles.opacity = "0";
    styles.left = "-999em";
    textarea.setAttribute("aria-hidden", "true");
    textarea.value = text;
    textarea.readOnly = true;
    (this._document.fullscreenElement || this._document.body).appendChild(textarea);
  }
  /** Finishes copying the text. */
  copy() {
    const textarea = this._textarea;
    let successful = false;
    try {
      if (textarea) {
        const currentFocus = this._document.activeElement;
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        successful = this._document.execCommand("copy");
        if (currentFocus) {
          currentFocus.focus();
        }
      }
    } catch {
    }
    return successful;
  }
  /** Cleans up DOM changes used to perform the copy operation. */
  destroy() {
    const textarea = this._textarea;
    if (textarea) {
      textarea.remove();
      this._textarea = void 0;
    }
  }
};
var _Clipboard = class _Clipboard {
  constructor(document2) {
    this._document = document2;
  }
  /**
   * Copies the provided text into the user's clipboard.
   *
   * @param text The string to copy.
   * @returns Whether the operation was successful.
   */
  copy(text) {
    const pendingCopy = this.beginCopy(text);
    const successful = pendingCopy.copy();
    pendingCopy.destroy();
    return successful;
  }
  /**
   * Prepares a string to be copied later. This is useful for large strings
   * which take too long to successfully render and be copied in the same tick.
   *
   * The caller must call `destroy` on the returned `PendingCopy`.
   *
   * @param text The string to copy.
   * @returns the pending copy operation.
   */
  beginCopy(text) {
    return new PendingCopy(text, this._document);
  }
};
_Clipboard.ɵfac = function Clipboard_Factory(t) {
  return new (t || _Clipboard)(ɵɵinject(DOCUMENT));
};
_Clipboard.ɵprov = ɵɵdefineInjectable({
  token: _Clipboard,
  factory: _Clipboard.ɵfac,
  providedIn: "root"
});
var Clipboard = _Clipboard;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Clipboard, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var CDK_COPY_TO_CLIPBOARD_CONFIG = new InjectionToken("CDK_COPY_TO_CLIPBOARD_CONFIG");
var _CdkCopyToClipboard = class _CdkCopyToClipboard {
  constructor(_clipboard, _ngZone, config) {
    this._clipboard = _clipboard;
    this._ngZone = _ngZone;
    this.text = "";
    this.attempts = 1;
    this.copied = new EventEmitter();
    this._pending = /* @__PURE__ */ new Set();
    if (config && config.attempts != null) {
      this.attempts = config.attempts;
    }
  }
  /** Copies the current text to the clipboard. */
  copy(attempts = this.attempts) {
    if (attempts > 1) {
      let remainingAttempts = attempts;
      const pending = this._clipboard.beginCopy(this.text);
      this._pending.add(pending);
      const attempt = () => {
        const successful = pending.copy();
        if (!successful && --remainingAttempts && !this._destroyed) {
          this._currentTimeout = this._ngZone.runOutsideAngular(() => setTimeout(attempt, 1));
        } else {
          this._currentTimeout = null;
          this._pending.delete(pending);
          pending.destroy();
          this.copied.emit(successful);
        }
      };
      attempt();
    } else {
      this.copied.emit(this._clipboard.copy(this.text));
    }
  }
  ngOnDestroy() {
    if (this._currentTimeout) {
      clearTimeout(this._currentTimeout);
    }
    this._pending.forEach((copy) => copy.destroy());
    this._pending.clear();
    this._destroyed = true;
  }
};
_CdkCopyToClipboard.ɵfac = function CdkCopyToClipboard_Factory(t) {
  return new (t || _CdkCopyToClipboard)(ɵɵdirectiveInject(Clipboard), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(CDK_COPY_TO_CLIPBOARD_CONFIG, 8));
};
_CdkCopyToClipboard.ɵdir = ɵɵdefineDirective({
  type: _CdkCopyToClipboard,
  selectors: [["", "cdkCopyToClipboard", ""]],
  hostBindings: function CdkCopyToClipboard_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function CdkCopyToClipboard_click_HostBindingHandler() {
        return ctx.copy();
      });
    }
  },
  inputs: {
    text: [InputFlags.None, "cdkCopyToClipboard", "text"],
    attempts: [InputFlags.None, "cdkCopyToClipboardAttempts", "attempts"]
  },
  outputs: {
    copied: "cdkCopyToClipboardCopied"
  },
  standalone: true
});
var CdkCopyToClipboard = _CdkCopyToClipboard;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkCopyToClipboard, [{
    type: Directive,
    args: [{
      selector: "[cdkCopyToClipboard]",
      host: {
        "(click)": "copy()"
      },
      standalone: true
    }]
  }], () => [{
    type: Clipboard
  }, {
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CDK_COPY_TO_CLIPBOARD_CONFIG]
    }]
  }], {
    text: [{
      type: Input,
      args: ["cdkCopyToClipboard"]
    }],
    attempts: [{
      type: Input,
      args: ["cdkCopyToClipboardAttempts"]
    }],
    copied: [{
      type: Output,
      args: ["cdkCopyToClipboardCopied"]
    }]
  });
})();
var _ClipboardModule = class _ClipboardModule {
};
_ClipboardModule.ɵfac = function ClipboardModule_Factory(t) {
  return new (t || _ClipboardModule)();
};
_ClipboardModule.ɵmod = ɵɵdefineNgModule({
  type: _ClipboardModule,
  imports: [CdkCopyToClipboard],
  exports: [CdkCopyToClipboard]
});
_ClipboardModule.ɵinj = ɵɵdefineInjector({});
var ClipboardModule = _ClipboardModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClipboardModule, [{
    type: NgModule,
    args: [{
      imports: [CdkCopyToClipboard],
      exports: [CdkCopyToClipboard]
    }]
  }], null, null);
})();

// node_modules/ngx-sharebuttons/fesm2022/ngx-sharebuttons.mjs
function getValidUrl(url) {
  const isValidUrl = /^(http|https):\/\//.test(url);
  if (isValidUrl) {
    return url;
  }
  console.warn(`[ShareButtons]: Sharing link '${url}' is invalid!`);
  return null;
}
function printPage() {
  return document.defaultView.print();
}
function copyToClipboard({
  params,
  data,
  clipboard,
  uiState
}) {
  clipboard.copy(params.url);
  uiState.set({
    icon: data.successIcon,
    text: data.successText,
    disabled: true
  });
  setTimeout(() => {
    uiState.set({
      icon: data.icon,
      text: data.text,
      disabled: false
    });
  }, data.delay);
}
var SHARE_BUTTONS_CONFIG = new InjectionToken("SHARE_BUTTONS_CONFIG", {
  providedIn: "root",
  factory: () => DEFAULT_OPTIONS
});
var SHARE_ICONS = new InjectionToken("SHARE_ICONS");
function provideShareButtonsOptions(...providers) {
  return providers;
}
function withConfig(options) {
  return {
    provide: SHARE_BUTTONS_CONFIG,
    useValue: __spreadValues(__spreadValues({}, DEFAULT_OPTIONS), options)
  };
}
var IShareButton = class {
};
var SharerMethods;
(function(SharerMethods2) {
  SharerMethods2["Anchor"] = "anchor";
  SharerMethods2["Window"] = "window";
})(SharerMethods || (SharerMethods = {}));
var DEFAULT_OPTIONS = {
  sharerMethod: SharerMethods.Anchor,
  theme: "default",
  windowWidth: 800,
  windowHeight: 500,
  moreButtonIcon: ["fas", "ellipsis-h"],
  lessButtonIcon: ["fas", "minus"],
  moreButtonAriaLabel: "Show more share buttons",
  lessButtonAriaLabel: "Show less share buttons"
};
var linkInDescription = {
  description: (p) => {
    return p.description ? `${p.description}\r
${p.url}` : p.url;
  }
};
var facebookParams = {
  type: "facebook",
  text: "Facebook",
  ariaLabel: "Share on Facebook",
  icon: ["fab", "facebook-f"],
  color: "#4267B2",
  share: {
    desktop: "https://facebook.com/sharer/sharer.php"
  },
  params: {
    url: "u"
  }
};
var xParams = {
  type: "x",
  text: "X",
  ariaLabel: "Post on X",
  icon: ["fab", "x-twitter"],
  color: "#000",
  share: {
    desktop: "https://x.com/intent/post"
  },
  params: {
    url: "url",
    description: "text",
    tags: "hashtags",
    via: "via"
  }
};
var linkedInParams = {
  type: "linkedin",
  text: "LinkedIn",
  ariaLabel: "Share on LinkedIn",
  icon: ["fab", "linkedin-in"],
  color: "#0a66c2",
  share: {
    desktop: "https://www.linkedin.com/sharing/share-offsite"
  },
  params: {
    url: "url"
  }
};
var pinterestParams = {
  type: "pinterest",
  text: "Pinterest",
  ariaLabel: "Share on Pinterest",
  icon: ["fab", "pinterest-p"],
  color: "#e60023",
  share: {
    desktop: "https://pinterest.com/pin/create/button/"
  },
  params: {
    url: "url",
    description: "description",
    image: "media"
  }
};
var redditParams = {
  type: "reddit",
  text: "Reddit",
  ariaLabel: "Share on Reddit",
  icon: ["fab", "reddit-alien"],
  color: "#FF4006",
  share: {
    desktop: "https://www.reddit.com/submit"
  },
  params: {
    url: "url",
    title: "title"
  }
};
var tumblrParams = {
  type: "tumblr",
  text: "Tumblr",
  ariaLabel: "Share on Tumblr",
  icon: ["fab", "tumblr"],
  color: "#36465D",
  share: {
    desktop: "https://tumblr.com/widgets/share/tool"
  },
  params: {
    url: "canonicalUrl",
    description: "caption",
    tags: "tags"
  }
};
var mixParams = {
  type: "mix",
  text: "Mix",
  ariaLabel: "Share on Mix",
  icon: ["fab", "mix"],
  color: "#eb4924",
  share: {
    desktop: "https://mix.com/add"
  },
  params: {
    url: "url"
  }
};
var viberParams = {
  type: "viber",
  text: "Viber",
  ariaLabel: "Share on Viber",
  icon: ["fab", "viber"],
  color: "#665ca7",
  share: {
    android: "viber://forward",
    ios: "viber://forward"
  },
  params: {
    description: "text"
  },
  paramsFunc: linkInDescription,
  requiredParams: {
    description: true
  }
};
var vkParams = {
  type: "vk",
  text: "VKontakte",
  ariaLabel: "Share on VKontakte",
  icon: ["fab", "vk"],
  color: "#4C75A3",
  share: {
    desktop: "https://vk.com/share.php"
  },
  params: {
    url: "url"
  }
};
var telegramParams = {
  type: "telegram",
  text: "Telegram",
  ariaLabel: "Share on Telegram",
  icon: ["fab", "telegram-plane"],
  color: "#0088cc",
  share: {
    desktop: "https://t.me/share/url"
  },
  params: {
    url: "url",
    description: "text"
  }
};
var messengerParams = {
  type: "messenger",
  text: "Messenger",
  ariaLabel: "Share on Messenger",
  icon: ["fab", "facebook-messenger"],
  color: "#168AFF",
  share: {
    desktop: "https://www.facebook.com/dialog/send",
    android: "fb-messenger://share/",
    ios: "fb-messenger://share/"
  },
  params: {
    url: "link",
    appId: "app_id",
    redirectUrl: "redirect_uri"
  }
};
var whatsappParams = {
  type: "whatsapp",
  text: "WhatsApp",
  ariaLabel: "Share on WhatsApp",
  icon: ["fab", "whatsapp"],
  color: "#25D366",
  share: {
    desktop: "https://api.whatsapp.com/send",
    android: "whatsapp://send",
    ios: "https://api.whatsapp.com/send"
  },
  params: {
    url: "link",
    description: "text"
  },
  requiredParams: {
    description: true
  },
  paramsFunc: linkInDescription
};
var xingParams = {
  type: "xing",
  text: "Xing",
  ariaLabel: "Share on Xing",
  icon: ["fab", "xing"],
  color: "#006567",
  share: {
    desktop: "https://www.xing.com/spi/shares/new"
  },
  params: {
    url: "url"
  }
};
var lineParams = {
  type: "line",
  text: "Line",
  ariaLabel: "Share on Line",
  icon: ["fab", "line"],
  color: "#00b900",
  share: {
    desktop: "https://social-plugins.line.me/lineit/share"
  },
  params: {
    url: "url"
  }
};
var smsParams = {
  type: "sms",
  text: "SMS",
  ariaLabel: "Share link via SMS",
  icon: ["fas", "sms"],
  color: "#20c16c",
  share: {
    desktop: "sms:",
    ios: "sms:&"
  },
  params: {
    description: "body"
  },
  paramsFunc: linkInDescription,
  requiredParams: {
    description: true
  }
};
var emailParams = {
  type: "email",
  text: "Email",
  ariaLabel: "Share link via email",
  icon: ["fas", "envelope"],
  color: "#FF961C",
  share: {
    desktop: "mailto:"
  },
  params: {
    title: "subject",
    description: "body"
  },
  paramsFunc: linkInDescription,
  requiredParams: {
    description: true
  }
};
var printerParams = {
  type: "print",
  text: "Print",
  ariaLabel: "Print page",
  icon: ["fas", "print"],
  color: "#765AA2",
  func: printPage
};
var copyParams = {
  type: "copy",
  text: "Copy link",
  ariaLabel: "Copy link",
  icon: ["fas", "link"],
  color: "#607D8B",
  data: {
    text: "Copy link",
    icon: ["fas", "link"],
    successText: "Copied",
    successIcon: ["fas", "check"],
    delay: 2e3
  },
  func: copyToClipboard
};
var SHARE_BUTTONS = {
  facebook: facebookParams,
  x: xParams,
  linkedin: linkedInParams,
  pinterest: pinterestParams,
  reddit: redditParams,
  tumblr: tumblrParams,
  mix: mixParams,
  viber: viberParams,
  vk: vkParams,
  telegram: telegramParams,
  messenger: messengerParams,
  whatsapp: whatsappParams,
  xing: xingParams,
  line: lineParams,
  sms: smsParams,
  email: emailParams,
  print: printerParams,
  copy: copyParams
};
var _ShareService = class _ShareService {
  constructor() {
    this.document = inject(DOCUMENT);
    this.icons = inject(SHARE_ICONS, {
      optional: true
    });
    this.meta = inject(Meta);
    this.platform = inject(Platform);
    this.clipboard = inject(Clipboard);
  }
  /**
   * Get meta tag content
   */
  getMetaTagContent(key) {
    const metaUsingProperty = this.meta.getTag(`property="${key}"`);
    const metaUsingName = this.meta.getTag(`name="${key}"`);
    return (metaUsingProperty || metaUsingName)?.getAttribute("content") ?? null;
  }
  getComputedUrl(url) {
    return getValidUrl(url || this.getMetaTagContent("og:url") || this.document.location.href);
  }
  getComputedParams(params) {
    if (params.url) {
      return {
        title: params.title,
        description: params.description,
        image: params.image,
        tags: params.tags,
        via: params.via,
        url: this.getComputedUrl(params.url),
        appId: params.appId || this.getMetaTagContent("fb:app_id"),
        redirectUrl: params.redirectUrl || this.document.location.href
      };
    }
    return {
      title: params.title || this.getMetaTagContent("og:title"),
      description: params.description || this.getMetaTagContent("og:description"),
      image: params.image || this.getMetaTagContent("og:image"),
      tags: params.tags,
      via: params.via,
      url: this.getComputedUrl(params.url),
      appId: params.appId || this.getMetaTagContent("fb:app_id"),
      redirectUrl: params.redirectUrl || this.document.location.href
    };
  }
  getComputedUrlParams(shareButton, params) {
    const computedParams = this.getComputedParams(params);
    return Object.entries(shareButton.params).reduce((params2, [key, realKey]) => {
      if (shareButton.requiredParams && shareButton.requiredParams[key] || computedParams[key]) {
        const resolver = shareButton.paramsFunc?.[key];
        params2[realKey] = resolver ? resolver(computedParams) : computedParams[key];
      }
      return params2;
    }, {});
  }
  getShareButtonInstance(name, props) {
    const button = props ? __spreadValues(__spreadValues({}, SHARE_BUTTONS[name]), props) : SHARE_BUTTONS[name];
    if (button) {
      return button;
    }
    throw new Error(`[ShareButtons]: The share button '${button}' does not exist!`);
  }
  share(shareButton, options) {
    let sharerLink;
    if (this.platform.IOS && shareButton.share.ios) {
      sharerLink = shareButton.share.ios;
    } else if (this.platform.ANDROID && shareButton.share.android) {
      sharerLink = shareButton.share.android;
    } else {
      sharerLink = shareButton.share.desktop;
    }
    const params = this.getComputedUrlParams(shareButton, options.params);
    if (sharerLink) {
      switch (options.method) {
        case SharerMethods.Anchor:
          this.openViaAnchor({
            params,
            url: sharerLink,
            target: options.target
          }, options.debug);
          break;
        case SharerMethods.Window:
          this.openViaWindow({
            params,
            url: sharerLink,
            target: options.target
          }, options.windowOptions, options.debug);
          break;
      }
    }
  }
  open(options) {
    const button = this.getShareButtonInstance(options.name, options.props);
    this.openInstance(options, button);
  }
  openInstance(options, button) {
    if (button.share) {
      this.share(button, options);
    } else {
      button.func({
        params: this.getComputedParams(options.params),
        data: button.data,
        clipboard: this.clipboard,
        uiState: options.uiState
      });
    }
  }
  openViaWindow(args, windowOptions, debug) {
    const finalUrl = `${args.url}?${new HttpParams({
      fromObject: args.params
    }).toString()}`;
    if (debug) {
      console.log("[SHARE BUTTONS]: open link via window", finalUrl);
    }
    const windowRef = windowOptions?.windowObj || this.document.defaultView;
    const openWindow = windowRef?.[windowOptions?.openFunc] || this.document.defaultView.open;
    openWindow(finalUrl, args.target ?? "_blank", `width=${windowOptions?.width || 800}, height=${windowOptions?.height || 500}`);
    windowRef.opener ??= null;
  }
  openViaAnchor(args, debug) {
    const finalUrl = `${args.url}?${new HttpParams({
      fromObject: args.params
    }).toString()}`;
    if (debug) {
      console.log("[SHARE BUTTONS]: open link via anchor", finalUrl);
    }
    const linkElement = this.document.createElement("a");
    linkElement.setAttribute("target", args.target ?? "_blank");
    linkElement.setAttribute("rel", "noopener noreferrer");
    linkElement.href = finalUrl;
    linkElement.click();
    linkElement.remove();
  }
};
_ShareService.ɵfac = function ShareService_Factory(t) {
  return new (t || _ShareService)();
};
_ShareService.ɵprov = ɵɵdefineInjectable({
  token: _ShareService,
  factory: _ShareService.ɵfac,
  providedIn: "root"
});
var ShareService = _ShareService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShareService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var SHARE_BUTTONS_PROP = new InjectionToken("SHARE_BUTTONS_PROP", {
  providedIn: "root",
  factory: () => SHARE_BUTTONS
});
function customShareButton(key, button) {
  SHARE_BUTTONS[key] = __spreadValues(__spreadValues({}, SHARE_BUTTONS[key]), button);
  return {
    provide: SHARE_BUTTONS_PROP,
    useValue: SHARE_BUTTONS
  };
}
var _ShareButtonDirective = class _ShareButtonDirective {
  constructor() {
    this.shareButtonsProps = inject(SHARE_BUTTONS_PROP);
    this.options = inject(SHARE_BUTTONS_CONFIG);
    this.shareService = inject(ShareService);
    this.nativeElement = inject(ElementRef).nativeElement;
    this.uiState = signal({});
    this.color = computed(() => this.shareButtonInstance().color);
    this.text = computed(() => this.uiState().text);
    this.icon = computed(() => this.uiState().icon);
    this.disabled = computed(() => this.uiState().disabled);
    this.shareButton = input.required();
    this.shareButtonInstance = computed(() => {
      const key = this.shareButton();
      const button = this.shareButtonsProps[key];
      if (button) {
        return button;
      }
      throw new Error(`[ShareButtons]: The share button '${button}' does not exist!`);
    });
    this.title = input();
    this.description = input();
    this.image = input();
    this.tags = input();
    this.redirectUrl = input();
    this.url = input();
    this.opened = output();
    effect(() => {
      const button = this.shareButtonInstance();
      untracked(() => {
        this.uiState.set({
          icon: button.icon,
          text: button.text,
          disabled: false
        });
      });
    });
    effect(() => {
      this.nativeElement.toggleAttribute("disabled", this.uiState().disabled);
    });
  }
  /**
   * Share the link
   */
  share() {
    this.shareService.openInstance({
      params: {
        url: this.url(),
        title: this.title(),
        description: this.description(),
        image: this.image(),
        tags: this.tags(),
        redirectUrl: this.redirectUrl()
      },
      target: this.options.sharerTarget,
      debug: this.options.debug,
      method: this.options.sharerMethod,
      uiState: this.uiState
    }, this.shareButtonInstance());
    this.opened.emit(this.shareButton());
  }
};
_ShareButtonDirective.ɵfac = function ShareButtonDirective_Factory(t) {
  return new (t || _ShareButtonDirective)();
};
_ShareButtonDirective.ɵdir = ɵɵdefineDirective({
  type: _ShareButtonDirective,
  selectors: [["", "shareButton", ""]],
  hostVars: 3,
  hostBindings: function ShareButtonDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function ShareButtonDirective_click_HostBindingHandler() {
        return ctx.share();
      });
    }
    if (rf & 2) {
      ɵɵattribute("aria-label", ctx.shareButtonInstance().ariaLabel);
      ɵɵstyleProp("--button-color", ctx.color());
    }
  },
  inputs: {
    shareButton: [InputFlags.SignalBased, "shareButton"],
    title: [InputFlags.SignalBased, "title"],
    description: [InputFlags.SignalBased, "description"],
    image: [InputFlags.SignalBased, "image"],
    tags: [InputFlags.SignalBased, "tags"],
    redirectUrl: [InputFlags.SignalBased, "redirectUrl"],
    url: [InputFlags.SignalBased, "url"]
  },
  outputs: {
    opened: "opened"
  },
  exportAs: ["shareButton"],
  standalone: true
});
var ShareButtonDirective = _ShareButtonDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShareButtonDirective, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[shareButton]",
      exportAs: "shareButton",
      host: {
        "[style.--button-color]": "color()",
        "[attr.aria-label]": "shareButtonInstance().ariaLabel",
        "(click)": "share()"
      }
    }]
  }], () => [], null);
})();
export {
  DEFAULT_OPTIONS,
  IShareButton,
  SHARE_BUTTONS,
  SHARE_BUTTONS_CONFIG,
  SHARE_BUTTONS_PROP,
  SHARE_ICONS,
  ShareButtonDirective,
  ShareService,
  SharerMethods,
  copyParams,
  customShareButton,
  emailParams,
  facebookParams,
  lineParams,
  linkedInParams,
  messengerParams,
  mixParams,
  pinterestParams,
  printerParams,
  provideShareButtonsOptions,
  redditParams,
  smsParams,
  telegramParams,
  tumblrParams,
  viberParams,
  vkParams,
  whatsappParams,
  withConfig,
  xParams,
  xingParams
};
//# sourceMappingURL=ngx-sharebuttons.js.map
