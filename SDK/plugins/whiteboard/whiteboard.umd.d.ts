/**
 * TRTC Web SDK Whiteboard plugin (v0.2) — types for the **UMD** bundle
 * (`whiteboard.umd.js`).
 *
 * Declarations are identical to `whiteboard.esm.d.ts`: the UMD build exposes
 * the same namespace object (`module.exports = factory()`), so `default` is the
 * plugin class and `Whiteboard` is also available as a named export.
 *
 * Drawing overlay built on top of VideoMixer's canvas source capability,
 * with support for interactive whiteboard sessions:
 *
 *   - **host**: drives the shared canvas, mixes it into its own published
 *     video stream via VideoMixer, and broadcasts SEI ack frames.
 *   - **guest**: draws on a local preview canvas overlaid on the host's
 *     remote video element, and synchronizes strokes with the host through
 *     TRTC `customMessage` signaling.
 *
 * Role is **derived from `targetUser`**:
 *   - `targetUser` empty / undefined -> host
 *   - `targetUser` non-empty userId  -> guest of that host
 *
 * `mode` controls **interactivity only** (`'interactive' | 'viewing'`); both
 * host and guest can be either mode. Runtime role transitions (host↔guest)
 * are a future planned capability; the current version supports only
 * guest→guest target host switching via `updatePlugin('Whiteboard', { targetUser })`.
 *
 * Prerequisites:
 *   - host: VideoMixer must be started, and TRTC must be created with
 *     `enableSEI: true`.
 *   - guest: the host's remote video must be subscribed and rendered into
 *     the same `view` container before `startPlugin('Whiteboard', ...)`.
 *
 * @packageDocumentation
 */

/**
 * Drawing tool types supported by Whiteboard.
 */
export enum WhiteboardTool {
  Pointer      = 'pointer',
  Pen          = 'pen',
  Rect         = 'rect',
  Ellipse      = 'ellipse',
  Arrow        = 'arrow',
  Line         = 'line',
  Triangle     = 'triangle',
  Laser        = 'laser',
  EraserPath   = 'eraserPath',
  EraserObject = 'eraserObject',
  Text         = 'text',
}

/**
 * Whiteboard operating mode (controls interactivity, NOT role).
 *
 * - `'interactive'` (default): canvas listens to pointer events and is drawable.
 * - `'viewing'`: canvas does NOT listen to pointer events; remains visible only.
 *
 * Both host and guest can be either `'interactive'` or `'viewing'`.
 */
export type WhiteboardMode = 'interactive' | 'viewing';

/**
 * Eraser-object scope (host only).
 *
 * - `'self'` (default): host's eraserObject hit-test only deletes strokes
 *   owned by the host itself; clicks on guest strokes are treated as misses.
 * - `'all'`: host can object-erase any owner's stroke; guest-owned hits are
 *   broadcast as `UNDO_ACK` so all peers stay in sync.
 *
 * Guest is always treated as `'self'` regardless of this option (self-only
 * rule, see doc.md §6.2).
 */
export type EraserObjectScope = 'self' | 'all';

/**
 * Whiteboard plugin events.
 *
 * See doc.md §3.3.
 */
export enum WhiteboardEvent {
  /**
   * Host + Guest: the whiteboard became available — it now responds to
   * interaction and can be drawn on. See {@link WhiteboardAvailableReason}.
   */
  AVAILABLE               = 'available',
  /**
   * Host + Guest: the whiteboard became unavailable — interaction stops and
   * drawing is disabled. See {@link WhiteboardUnavailableReason}.
   */
  UNAVAILABLE             = 'unavailable',
  ERROR                   = 'error',
  /**
   * Host only: a window's content (image / video / PDF / PPT) failed to load —
   * too large, corrupt, unsupported, or unreachable. The window itself stays
   * and can still be annotated, it just has no backdrop. Kept separate from
   * `ERROR`: that one means the session is gone.
   */
  CONTENT_LOAD_ERROR      = 'content-load-error',
  /** Host + Guest: undo availability changed. */
  UNDO_STATE_CHANGED      = 'undo-state-changed',
  /** Host + Guest: redo availability changed. */
  REDO_STATE_CHANGED      = 'redo-state-changed',
  /**
   * Host + Guest: the current page changed.
   *
   * On host this is triggered by `updatePlugin({ page })` or by switching the
   * focused window; on guest it is triggered by the host's page sync (a guest
   * cannot turn pages on its own).
   */
  PAGE_STATE_CHANGED      = 'page-state-changed',
  /**
   * Host only: the window set changed (added, removed, moved / resized,
   * re-stacked, minimized / maximized, focus moved).
   */
  WINDOW_STATE_CHANGED    = 'window-state-changed',
  /**
   * Host only: the layer set changed (added, removed, selected, moved / resized
   * on release, re-stacked, switches, load state, playback, page index).
   */
  LAYER_STATE_CHANGED     = 'layer-state-changed',
}

/**
 * Reasons carried by `WhiteboardEvent.AVAILABLE`.
 * - `started`: a whiteboard session became active (host init done + SESSION_START
 *   broadcast; guest received SESSION_START — including a late one after a
 *   pre-session silence wait).
 * - `resume`: an already-started guest session recovered from a stalled state
 *   (ACK feedback loop STALLED → NORMAL/DEGRADED).
 */
export type WhiteboardAvailableReason = 'started' | 'resume';

/**
 * Reasons carried by `WhiteboardEvent.UNAVAILABLE`.
 * - `end`: the session ended (host stopped and broadcast SESSION_END; guest
 *   received SESSION_END from the host).
 * - `silence`: no SESSION_START within the handshake window, or the ACK
 *   feedback loop stalled on heartbeat silence.
 * - `queue-full`: the guest pending-ACK queue reached its hard cap.
 * - `ack-timeout`: the guest pending-ACK queue had no ACK within the timeout.
 * - `disabled`: guest only. The host turned the whiteboard off (`config.enable: false`).
 * - `host-lost`: guest only. The link to the host is down; the session is kept
 *   and recovers with `available(resume)`.
 * - `local-stop`: guest only. This guest stopped following the host — `stop()`,
 *   or `update({ targetUser })` switched away (`targetUser` names the old host).
 *   The session itself may still be running. Not emitted if `end` was already reported.
 */
export type WhiteboardUnavailableReason =
  'end' | 'silence' | 'queue-full' | 'ack-timeout' | 'disabled' | 'host-lost' | 'local-stop';

/** Payload carried by `AVAILABLE`. */
export interface WhiteboardAvailableInfo {
  /** Host's userId for a guest, `''` for the host. */
  targetUser: string;
  /** Why the whiteboard became available. */
  reason: WhiteboardAvailableReason;
}

/** Payload carried by `UNAVAILABLE`. */
export interface WhiteboardUnavailableInfo {
  /** Host's userId for a guest, `''` for the host. */
  targetUser: string;
  /** Why the whiteboard became unavailable. */
  reason: WhiteboardUnavailableReason;
}

/**
 * Reasons carried by `WhiteboardEvent.CONTENT_LOAD_ERROR`.
 *
 * - `invalid-url`:    the URL is malformed (not a full http(s) / blob address,
 *                     bad host, or a disallowed protocol); rejected before any
 *                     request is made.
 * - `file-too-large`: the file exceeds the size cap.
 * - `corrupt`:        the file is damaged or cannot be decoded.
 * - `unsupported`:    unsupported format, or the parser component (pdf.js /
 *                     the PPT SDK) is not deployed.
 * - `network`:        the resource could not be fetched (non-2xx, CORS, offline).
 * - `unknown`:        none of the above.
 */
export type WhiteboardContentLoadReason =
  | 'invalid-url' | 'file-too-large' | 'corrupt' | 'unsupported' | 'network' | 'unknown';

/** Payload carried by `CONTENT_LOAD_ERROR`. */
export interface WhiteboardContentLoadErrorInfo {
  /** Id of the window whose content failed to load; `'m'` for the main board. */
  winId: string;
  /** Content type: `'image' | 'video' | 'canvas' | 'pdf' | 'ppt'`. */
  contentType: string;
  /** Why loading failed. */
  reason: WhiteboardContentLoadReason;
  /** Raw English error text, for diagnostics. */
  message: string;
  /** Whether the plugin closed the window (toolbar-inserted windows that failed while loading). */
  windowClosed: boolean;
  /** Set when the failing content is a layer; `winId` is then the board it lives on. */
  layerId?: string;
  /** For layers: whether the plugin removed it (toolbar-inserted layers that failed while loading). */
  layerRemoved?: boolean;
}

/**
 * Whiteboard start options.
 *
 * Single unified options type for both host and guest. The role is derived
 * from `targetUser` at start time:
 *   - omitted / `''`        -> host
 *   - non-empty userId      -> guest of that host
 *
 * See doc.md §3.1 for the full per-field contract.
 */
export type WhiteboardTheme = 'light' | 'dark';

export type ToolBarPlacement = 'auto' | 'left' | 'right' | 'top' | 'bottom';

/** Fill mode for geometric shapes (rect / ellipse / triangle). */
export type FillMode = 'empty' | 'solid' | 'opacity';

/** Scope of `eraserObject` / `operation: 'clear'`. */
export type ClearScope = 'self' | 'all';

export type WhiteboardLanguage = 'zh-CN' | 'en';

export interface TextFontOption {
  label: string;
  value: string;
}

/**
 * Authoritative logical canvas info (size + host-only source id / zIndex /
 * base colour).
 *
 *   - **host**: replaces the VideoMixer-derived size and is broadcast in
 *     SESSION_START as authoritative; falls back to
 *     `_mixVideoConfig.canvasInfo` when omitted.
 *   - **guest**: `{ width, height }` lets `startPlugin` resolve without waiting
 *     for SESSION_START; omitted it waits up to 5 s and reports
 *     `unavailable(silence)` on timeout.
 *
 * `width` / `height` must be positive finite integers, otherwise
 * `INVALID_PARAMETER` is thrown.
 */
export interface WhiteboardCanvasInfo {
  width?: number;
  height?: number;
  /** Host only. VideoMixer canvas source id. Default `'whiteboard'`. */
  id?: string;
  /** Host only. VideoMixer canvas zIndex. Default `100`. */
  zIndex?: number;
  /**
   * Host only. Canvas base colour. Sets both the VideoMixer mix background
   * (what remote peers see) and the local `.trtc-wb` background, so the two
   * ends stay visually consistent. `null` restores the theme default.
   */
  canvasColor?: string | null;
}

/** Tool group: current drawing tool plus its style. Partially updatable. */
export interface WhiteboardToolOptions {
  /** Default `WhiteboardTool.Pointer` (select only). */
  name?: WhiteboardTool;
  /**
   * Default host `'#f44336'`; guest derives a colour from its `userId` (stable across sessions,
   * avoids the host colour, readable on both light and dark boards), picked from
   * `ui.toolBar.colors` when set. The guest default is added to the colour panel's recent list.
   */
  color?: string;
  /** Default `3`. Range `[1, 100]`. In laser `'hover'` mode it also sets the glow dot size. */
  lineWidth?: number;
  /** Laser fade-out (ms), `'press'` mode only. Default `1000`. Range `[100, 10000]`. */
  laserFadeDuration?: number;
  /**
   * Laser trigger mode. Default `'hover'`.
   * - `'hover'`: a glow dot follows the pointer over the board; no trail, no fade; disappears as soon as the pointer leaves.
   * - `'press'`: renders only while pressed; the trail fades out over `laserFadeDuration`.
   * Touch / pen: the dot starts at the canvas center, jumps to the touch point, follows the drag, and stays where it was lifted.
   */
  laserMode?: 'hover' | 'press';
  fillMode?: FillMode;
  /** Used when `fillMode === 'opacity'`. Default `0.4`. Range `[0, 1]`. */
  fillOpacity?: number;
  /** Font size for the text tool. Default `24`. Range `[8, 200]`. */
  fontSize?: number;
  /** Text colour; defaults to `color`. Only affects text created afterwards. */
  fontColor?: string;
  eraserObjectScope?: EraserObjectScope;
  /** Scope of `operation: 'clear'`. Default `'self'`. */
  clearScope?: ClearScope;
}

export interface WhiteboardWindowConfig {
  autoRect?: boolean;
  autoFocus?: boolean;
  autoPin?: boolean;
  autoMax?: boolean;
  enableDraw?: boolean;
  enablePageBar?: boolean;
  enableResize?: boolean;
  enableMin?: boolean;
  enableMax?: boolean;
  enablePin?: boolean;
}

/** Runtime config group. */
export interface WhiteboardConfig {
  /**
   * Display + interaction switch, hot-updatable.
   *   - **host (global, default `true`)**: `false` hides the local preview,
   *     ignores interaction, removes the canvas from VideoMixer and pauses
   *     window media; guests receive `unavailable(disabled)`.
   *   - **guest (local, default `true`)**: only hides / freezes this side.
   */
  enable?: boolean;
  /** Whether the canvas reacts to pointer events. Default `true`. */
  interactive?: boolean;
  /** Host-side real-time rendering of guest pen strokes. Default `false`. */
  hostDrawGuestPreview?: boolean;
  enablePageBar?: boolean;
  enableWindowBox?: boolean;
  maxWindows?: number;
  maxPages?: number;
  /**
   * Host only. Max layers **per page** (each page of each board counts on its
   * own). Integer in `[1, 50]`, default `20`. Hot-updatable; lowering it never
   * removes existing layers.
   */
  maxLayers?: number;
  enableEvictWindow?: boolean;
  window?: WhiteboardWindowConfig;
  debug?: boolean;
  /**
   * Experimental: PPT window "advance one step per click". Default `false`.
   * Keep it off until the upstream ppt-sdk security issues are fixed.
   */
  pptAnimation?: boolean;
  language?: WhiteboardLanguage;
  /** Fixed at start; passing it to `update()` throws `INVALID_OPERATION`. */
  cmdId?: number;
  seiAckRepeatFrames?: number;
  signalSendRate?: number;
  signalByteBudget?: number;
  strokeSampleRate?: number;
}

/** Apps menu item. `board` inserts a sub-whiteboard window, `snapshot` downloads one frame. */
export type ToolbarAppKind = 'board' | 'image' | 'video' | 'pdf' | 'ppt' | 'snapshot';

/**
 * Whether each Apps menu item is shown (all `true` by default).
 *
 * Intersected with capability: an item stays hidden when the current role cannot use it
 * (guest cannot insert windows) or when PDF / PPT dependencies are unavailable,
 * even if it is set to `true`.
 */
export interface ToolbarAppsMenuConfig {
  board?: boolean;
  image?: boolean;
  video?: boolean;
  pdf?: boolean;
  ppt?: boolean;
  snapshot?: boolean;
}

/** Toolbar menu visibility. Only the Apps menu is supported for now. */
export interface ToolbarMenusConfig {
  apps?: ToolbarAppsMenuConfig;
}

/** Built-in UI config. `textBar` / `window` are host only; `toolBar` is both. */
export interface WhiteboardUIConfig {
  theme?: WhiteboardTheme;
  textBar?: {
    enable?: boolean;
    colors?: string[];
    fonts?: TextFontOption[];
  };
  window?: Record<string, never>;
  toolBar?: {
    enable?: boolean;
    colors?: string[];
    placement?: ToolBarPlacement;
    menus?: ToolbarMenusConfig;
  };
}

export interface WhiteboardStartOptions {
  /**
   * Container element (or its id selector) for the whiteboard canvas
   * (host: dual-canvas; guest: previewCanvas overlay).
   *
   * When omitted the session still starts (signalling works, engines
   * initialise) but interaction and the overlay are deferred until
   * `updatePlugin({ view })`.
   */
  view?: HTMLElement | string;

  /**
   * Specifies which host this whiteboard interacts with at start time.
   *   - omitted / `''` -> current role = host
   *   - non-empty userId -> current role = guest of that host
   *
   * Runtime `targetUser` updates support guest→guest host switching only.
   * Host↔guest role transitions are a future planned capability; until then,
   * stop and restart the plugin to change role.
   */
  targetUser?: string;

  /** Display name broadcast to remote peers. Falls back to userId. */
  userName?: string;

  canvasInfo?: WhiteboardCanvasInfo;

  tool?: WhiteboardToolOptions;

  config?: WhiteboardConfig;

  ui?: WhiteboardUIConfig;
}

/**
 * Description of content embedded in a window.
 *
 * The content is drawn **below** the sub-board's strokes, as the backdrop being
 * annotated. It is fitted with `contain` (uniform scale, centered) into the
 * sub-board's logical canvas, so a window whose `rect` has the same aspect ratio
 * as the content shows it filling the window exactly — which is precisely what
 * `window.add.autoRect` does by default.
 *
 * ── Cross-origin restriction (image / video) ───────────────────────────────
 * Images and videos are always loaded with `crossOrigin="anonymous"`, so
 * **cross-origin servers must send `Access-Control-Allow-Origin`**. Without it
 * the load fails and the window simply stays empty (with a console warning).
 *
 * This is not negotiable: cross-origin content without CORS marks the canvas as
 * tainted once drawn, and `captureStream()` then throws — **the whole whiteboard
 * stops publishing**. One empty window is an acceptable price; a dead stream is
 * not. For resources you do not control, fetch them into a `Blob` first (same
 * origin, no restriction).
 *
 * PDFs do not take this path: the bytes are fetched first and rasterized by the
 * plugin, so no cross-origin bitmap ever touches the canvas. A cross-origin URL
 * still needs CORS headers, otherwise the file cannot be fetched at all.
 */
export interface WhiteboardProviderOptions {
  /**
   * Content type.
   *
   * Required rather than inferred from `source`: URL extensions are unreliable
   * (query strings, extension-less CDNs, `blob:`), and guessing wrong loads a
   * video as an image, which shows up as a permanently blank window.
   */
  type: 'image' | 'video' | 'canvas' | 'pdf';

  /**
   * Content source:
   *   - `'image'` / `'video'`: URL string, or a `Blob` / `File` (converted to a
   *     same-origin blob URL)
   *   - `'canvas'`: an `HTMLCanvasElement` instance
   *   - `'pdf'`: URL string, `Blob` / `File`, or raw bytes (`ArrayBuffer` /
   *     `Uint8Array`)
   *
   * When bytes are given, the PDF engine **transfers** them to its worker and
   * the caller's copy becomes detached — make your own copy first if you need
   * to reuse them.
   *
   * A canvas passed in is **moved** into the window DOM (an element can only
   * have one parent) but stays yours: the whiteboard only reads its pixels and
   * merely unmounts it when the window is destroyed. Keep drawing into it and
   * the result shows up live in the window and in the published stream.
   */
  source: string | Blob | HTMLCanvasElement | ArrayBuffer | Uint8Array;

  /** Video: start playing once loaded. Default `false`. */
  autoplay?: boolean;

  /** Video: loop playback. Default `false`. */
  loop?: boolean;

  /**
   * Video: muted, and **no audio graph is built**. Default `false`.
   *
   * The semantics are "I want a silent video": the element is muted, no
   * AudioPlayer instance is occupied, and remote users hear nothing. That also
   * makes it the most reliable autoplay configuration — browsers only
   * unconditionally allow muted media.
   *
   * ⚠️ For muting **during playback** use `audio.muted` instead: it goes through
   * a GainNode, the uplink track stays live, and unmuting is instantaneous.
   * This field tears the whole graph down; restoring it needs a new instance
   * and a renegotiation.
   */
  muted?: boolean;

  /**
   * Video: audio graph. Enabled by default and mixed into the uplink, so remote
   * users hear the window video's sound.
   *
   * ⚠️ **Prerequisite**: the app must have called
   * `trtc.registerPlugin(AudioPlayer)`. Without it the plugin degrades to a
   * muted video plus one warning; the window and its picture are unaffected.
   *
   * ⚠️ **Autoplay**: unmuted video is subject to the browser's autoplay policy.
   * Adding content from a button callback is safe; adding it at page load may
   * leave it frozen on the first frame.
   */
  audio?: {
    /** Build the audio graph. Default `true`. `false` is equivalent to `muted: true`. */
    enable?: boolean;
    /** Mix into the uplink. Default `true`. When `false` only the host hears it locally. */
    publish?: boolean;
    /** Volume in `[0, 1]`. Default `1`. Applies locally and on the uplink alike. */
    volume?: number;
    /** Mute (gain to zero; the uplink track stays live). Default `false`. */
    muted?: boolean;
  };

  /**
   * Total page count of multi-page content. Only meaningful for
   * `type: 'canvas'` — a PDF knows its own page count.
   *
   * Defaults to the window's current page count. Pass it explicitly when the two
   * differ; a value that is too small stops paging early.
   */
  pageCount?: number;

  /**
   * Whether the page count is fixed by the content itself (e.g. a PPT whose
   * page count comes from the document). Only meaningful for `type: 'canvas'`
   * — a PDF is always fixed and needs no declaration.
   *
   * Default `false` (free): the page count is declared by `pageCount` and
   * whiteboard pages may be added / removed. When `true` (fixed), whiteboard
   * pages are 1:1 bound to content pages (no standalone page add / remove),
   * and replacing the content follows "delete the window, create a new one"
   * instead of in-place replacement.
   */
  fixedPageCount?: boolean;

  /**
   * Optional. Overrides the root URL of the PDF `cmaps/`, `standard_fonts/`,
   * `wasm/` and `iccs/` directories.
   *
   * Omit it to use the copy shipped under `${assetsPath}/whiteboard/` with the
   * SDK assets; normal integrations do not need it. Missing pieces cause absent
   * glyphs in PDFs without embedded fonts, or blank pages for JPX/JBIG2 images.
   */
  assetBaseUrl?: string;

  /** Optional. Overrides the PDF worker script URL; it must match the pdf.js version in the SDK assets. */
  workerSrc?: string;

  /**
   * PDF render scale, in "pixels per content unit". Default `1`.
   *
   * It changes the **raster resolution**, not the window's display size:
   * enlarging a window stretches the picture, so raise this value and re-set
   * the provider to keep it sharp.
   */
  renderScale?: number;

  /**
   * PDF page background. Default white. Pass `'transparent'` to let the
   * whiteboard content underneath show through.
   */
  pageBackground?: string;

  /** Password for an encrypted PDF. */
  password?: string;

  /**
   * Page-turn hook for an external canvas. `pageIndex` is 0-based; only
   * meaningful for `type: 'canvas'`.
   *
   * **Required for multi-page canvas**: each window page holds its own strokes
   * and the content is paged too. Without the hook, turning to page 2 leaves the
   * backdrop on page 1 — page 2's annotations land on page 1's content.
   *
   * Just re-render the requested page into the given canvas; the whiteboard
   * reads pixels from that same element every frame. Return a `Promise` for
   * async rendering and the whiteboard composes one more frame after it
   * resolves. Do not provide it for single-page content (plain image / video).
   */
  gotoPage?: (pageIndex: number) => void | Promise<void>;
}

/**
 * Whiteboard update options.
 *
 * See doc.md §3.2 for the field-by-field semantics on host vs guest.
 */
export interface WhiteboardUpdateOptions {
  /**
   * Switch interaction target (guest→guest only in the current version).
   *   - guest + non-empty userId -> re-point this guest at a different host
   *   - host + non-empty userId  -> throws `INVALID_OPERATION`
   *   - guest + `''`            -> throws `INVALID_OPERATION`
   *
   * Host↔guest runtime role transitions are a future planned capability;
   * stop and restart the plugin if you need to change role today.
   */
  targetUser?: string;

  /**
   * Hot-updatable container.
   *   - new element / selector -> **move** the canvas to that container
   *   - `null`                 -> detach it from the DOM (session stays alive)
   *   - omitted                -> keep the current container
   */
  view?: HTMLElement | string | null;

  /**
   * Canvas info update.
   *   - host: `id` triggers `removeCanvasSource(old) -> addCanvasSource(new)`;
   *     `zIndex` triggers a hot update.
   *   - guest: with a `targetUser` switch it lets `updatePlugin` resolve
   *     without waiting for the new host's SESSION_START; stand-alone it
   *     resizes the overlay for the current host.
   */
  canvasInfo?: WhiteboardCanvasInfo;

  /** Tool group — supports per-field partial update. */
  tool?: WhiteboardToolOptions;

  /** Runtime config group. `config.cmdId` is frozen at start(). */
  config?: WhiteboardConfig;

  /** Built-in UI config; hot-updatable. */
  ui?: WhiteboardUIConfig;

  /**
   * Imperative action triggered by this update call.
   *   - `'undo'`  — host: `engine.undo()`; guest: `guestController.undo()`.
   *   - `'redo'`  — symmetric redo path.
   *   - `'clear'` — host: clear-all broadcast; guest: clear self.
   *
   * Runs AFTER tool / config / canvasInfo changes within the same call.
   */
  operation?: 'undo' | 'redo' | 'clear';

  /**
   * **Host only.** Turn / add / remove pages.
   *
   * The four operation fields are mutually exclusive, in priority order
   * `add > remove > goto > step`. Runs after `window` and before `operation`.
   */
  page?: {
    /** Insert a page after the current one and jump to it. At the page limit it only warns. */
    add?: boolean;
    /** Remove a page. `true` removes the current one; a number removes that page. Never removes the last page. */
    remove?: boolean | number;
    /** Jump to a page (0-based). Out-of-range values are clamped. */
    goto?: number;
    /** Relative paging: `1` next, `-1` previous. Clamped at the first / last page. */
    step?: number;
    /** Target window id; defaults to the focused window. Paging an unfocused window does not steal focus. */
    winId?: string;
  };

  /**
   * **Host only.** Window management.
   *
   * `rect` is always in **main canvas logical coordinates** (the space defined by
   * `canvasInfo.width/height`) — that is why the host's local preview and the
   * published picture agree without any sync step.
   *
   * Fields apply in sequence (not mutually exclusive); `remove` runs last. Runs
   * before `page` / `operation`.
   */
  window?: {
    /**
     * Add a window. **Every field is optional.**
     *
     * When `id` is omitted the plugin generates `w1`, `w2`, … (skipping taken
     * ones); an explicit id must match `[A-Za-z0-9_-]{1,64}` and must not be the
     * reserved `'m'` (main board).
     *
     * Nothing is created at the window limit or on a duplicate id — it only warns.
     */
    add?: {
      /** Generated by the plugin when omitted. Only worth setting when you need a stable handle. */
      id?: string;
      /**
       * Position and size in main canvas logical coordinates. Defaults to
       * automatic layout (cascaded, so windows never fully cover each other).
       *
       * **When all four fields are omitted**, the plugin corrects the rect once
       * the content has loaded: an A4 portrait PDF opens as a portrait window
       * with the content filling it exactly. Providing any single field (even
       * just `width`) means the caller owns the size and no correction happens.
       */
      rect?: { x?: number; y?: number; width?: number; height?: number };
      /**
       * Let the plugin decide the window rect. Default `true`.
       *
       * `true`: start from the cascaded slot and **correct it once the content
       * (provider) has loaded** — a PDF fills the main canvas height, an image or
       * video takes its real size (long edge capped at the canvas). This removes
       * the "open it, then drag it bigger" step. Correction only happens while
       * neither the caller nor the user has touched the size.
       *
       * `false`: the rect is the caller's. A given `rect` is used as-is and never
       * corrected; with no `rect` the window still gets a default slot (it has to
       * land somewhere) but is likewise never changed because of content.
       *
       * ⚠️ Relationship with `rect`: providing any `rect` field means the caller
       * owns the size, and then no correction happens regardless of `autoRect`.
       */
      autoRect?: boolean;
      /**
       * Focus the new window immediately. Default `true`.
       *
       * Keep the default: a new window is stacked on top anyway, and if focus
       * does not follow, drawing on the topmost area lands in the window hidden
       * underneath — which the user cannot see and therefore cannot diagnose.
       *
       * Pass `false` for background creation, e.g. pre-loading the next slide
       * without interrupting the current explanation.
       */
      autoActive?: boolean;
      /**
       * Whether the sub-board accepts strokes. Default `true`.
       *
       * Differs from `config.interactive`: that is the **whole whiteboard** master
       * switch (off means neither the main board nor any window reacts to the
       * pointer); this is a per-window switch for "display only, do not annotate".
       *
       * `false` affects **drawing only**: the host does not start a stroke in that
       * window's content area (and does not pass it through to what is below);
       * guest strokes addressed to it are dropped; content still renders and the
       * content-area cursor reverts to `default`.
       *
       * It does **not** affect other interactions: the window can still be
       * focused, dragged / resized, paged and selected — read-only is not absent.
       */
      enableDraw?: boolean;
      /** Show this window's own page bar. Default `true`. Off does not affect the `page` API group. */
      enablePageBar?: boolean;
      /** Name shown in the title bar. Defaults to the `id`. */
      name?: string;
      /** Relative stacking order between windows; larger sits on top. Defaults to topmost. */
      zIndex?: number;
      /** Initial page count. Default `1`. */
      pages?: number;
      /**
       * Content embedded in the window (image / video / PDF / external canvas),
       * used as the annotation backdrop.
       *
       * **Prefer setting it at creation time**: the caller does not have to hold a
       * winId to fill the window later, and the plugin can size the window to the
       * content's aspect ratio. Omit for a plain whiteboard window.
       */
      provider?: WhiteboardProviderOptions;
    };
    /**
     * Remove a window. `true` removes the **focused** one (a no-op with a
     * warning when the main board has focus). Focus moves back to the main board
     * if it was on the removed window.
     */
    remove?: string | true;
    /**
     * Change position / size; only pass the fields you want to change. `id` may
     * be omitted to target the focused window.
     *
     * This never changes the sub-board's logical resolution — it doubles as the
     * coordinate-normalization basis, so changing it would displace every
     * existing stroke in that window. Scaling affects display and compositing
     * only.
     *
     * ⚠️ Passing any geometry field marks the size as caller-owned: that window
     * is never auto-corrected to the content ratio afterwards.
     */
    update?: {
      id?: string;
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      /** Rename the title bar. Use it to follow the file name when swapping content. */
      name?: string;
      /** Whether the sub-board accepts strokes. Same semantics as `add.enableDraw`. */
      enableDraw?: boolean;
      /** Show this window's own page bar. */
      enablePageBar?: boolean;
    };
    /** Focus a window (and raise it). Pass `'m'` to return to the main board. */
    focus?: string;
    /** Minimize: excluded from compositing and input, data fully retained. `true` targets the focused window. */
    minimize?: string | true;
    /** Un-minimize. */
    unminimize?: string | true;
    /** Maximize to the main canvas size. */
    maximize?: string | true;
    /** Restore the pre-maximize rect. */
    restore?: string | true;
    /** Raise to the top. */
    toFront?: string | true;
    /**
     * Manage embedded content **after** the window exists: set / replace / remove
     * the backdrop, and control video playback.
     *
     * ⚠️ **Prefer `add.provider`.** Creating an empty window and filling it later
     * forces the caller to keep a winId, and the plugin can no longer size the
     * window to the content ratio (the first layout already fixed the size).
     * This field is mainly for **replacing** existing content and for playback
     * control.
     *
     * `id` may be omitted to target the focused window. Like the other window
     * operations it runs in the `window` phase, after `add`, so
     * `{ add: {...}, provider: {...} }` legitimately targets the window just
     * created.
     */
    provider?: {
      /** Target window id. Defaults to the focused window. */
      id?: string;
      /** Set / replace content. Wins over `remove` when both are given. */
      set?: WhiteboardProviderOptions;
      /** Remove content. The window stays as a blank, annotatable sub-board. */
      remove?: boolean;
      /** Video playback control. Ignored for non-video content. */
      play?: boolean;
      /**
       * Hot-update of video audio: volume / mute / uplink mixing. Ignored for
       * non-video content.
       *
       * Differs from `set.audio`: `set` rebuilds the content (a different video),
       * this tunes **existing** content without rebuilding the graph or
       * triggering a renegotiation. Always use this to mute during playback.
       */
      audio?: {
        /** Mix into the uplink. When `false` only the host hears it locally. */
        publish?: boolean;
        /** Volume in `[0, 1]`. Applies locally and on the uplink alike. */
        volume?: number;
        /** Mute (gain to zero; the uplink track stays live). */
        muted?: boolean;
      };
    };
  };
  /**
   * Host only. Layers: images / videos embedded in a page of a board (main
   * board or a window), drawn below that page's strokes. Order inside the
   * group: `add` -> `update` -> `provider` -> `focus` -> `remove`; across
   * groups: `window` -> `layer` -> `page` -> `operation`.
   */
  layer?: WhiteboardLayerOptions;
}

/** Layer content type. */
export type WhiteboardLayerContentType = 'image' | 'video';

/** Layer content. */
export interface WhiteboardLayerContentOptions {
  type: WhiteboardLayerContentType;
  /** http / https / blob URL, or a Blob / File. Cross-origin URLs need CORS. */
  source: string | Blob | File;
  /** Video only. Starts when the layer first appears on the current page of a shown board. Default `false`. */
  autoplay?: boolean;
  /** Video only. Default `false`. */
  loop?: boolean;
  /** Video only: `true` builds no audio graph. Default `false`. */
  muted?: boolean;
  /** Video only. Requires the AudioPlayer plugin; instance id is `trtc-wb-audio-layer-${layerId}`. */
  audio?: { enable?: boolean; publish?: boolean; volume?: number; muted?: boolean };
}

export interface WhiteboardLayerAddOptions {
  provider: WhiteboardLayerContentOptions;
  /** Defaults to `l1`, `l2`, ... Pattern `[A-Za-z0-9_-]{1,64}`. Duplicate ids throw. */
  id?: string;
  /** Target board: `'m'` = main board, otherwise a window id. Defaults to the focused board. */
  winId?: string;
  /** Target page, 0-based. Defaults to the board's current page; never turns the page. */
  pageIndex?: number;
  /**
   * Board logical coordinates. Giving `width` or `height` takes over sizing
   * (disables `autoRect`); the content aspect ratio is always kept.
   */
  rect?: { x?: number; y?: number; width?: number; height?: number };
  /** Size to the content once loaded, never larger than the board. Default `true`. */
  autoRect?: boolean;
  /** Stacking among layers of the same page; larger is on top. Defaults to the top. */
  zIndex?: number;
  /** Select after adding (pointer tool, focused board, current page only). Default `false`. */
  autoSelect?: boolean;
  /** Default `true`. `false` = not selectable, clicks pass through. */
  enableSelect?: boolean;
  /** Default `true`. `false` = cannot be dragged (API moves still apply). */
  enableMove?: boolean;
  /** Default `true`. `false` = no resize handles (API resizes still apply). */
  enableResize?: boolean;
}

export type WhiteboardLayerOrder = 'front' | 'forward' | 'backward' | 'back';

export interface WhiteboardLayerUpdateOptions {
  /** Defaults to the selected layer. */
  id?: string;
  x?: number;
  y?: number;
  /** Aspect ratio is kept: one side derives the other; both sides act as a bounding box. */
  width?: number;
  height?: number;
  zIndex?: number;
  /** Wins over `zIndex`. */
  order?: WhiteboardLayerOrder;
  enableSelect?: boolean;
  enableMove?: boolean;
  enableResize?: boolean;
}

export interface WhiteboardLayerProviderOptions {
  /** Defaults to the selected layer. */
  id?: string;
  /** Replace the content. */
  set?: WhiteboardLayerContentOptions;
  /** Video play / pause; ignored for images. `true` is ignored while the layer is not on the current page of a shown board. */
  play?: boolean;
  audio?: { publish?: boolean; volume?: number; muted?: boolean };
}

export interface WhiteboardLayerOptions {
  add?: WhiteboardLayerAddOptions;
  update?: WhiteboardLayerUpdateOptions;
  provider?: WhiteboardLayerProviderOptions;
  /** Select a layer (activating its board and page first), or `null` to deselect. */
  focus?: string | null;
  /** Remove a layer; `true` = the selected one. Runs last. */
  remove?: string | true;
}

/** Payload carried by `PAGE_STATE_CHANGED`. */
export interface WhiteboardPageStateInfo {
  /** Current page index, 0-based. */
  index: number;
  /** Total page count; at least `1`. */
  total: number;
}

/**
 * Snapshot of a single window. `rect` is the **window rect** in main canvas
 * logical coordinates — not the content rect.
 */
export interface WhiteboardWindowInfo {
  id: string;
  /**
   * Window rect (main canvas logical coordinates). Content is actually drawn in
   * its **content area**, which is derived from this rect with `cover` and may
   * extend beyond it.
   */
  rect: { x: number; y: number; width: number; height: number };
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  /** This window's current page index and page count. */
  pageIndex: number;
  pageTotal: number;
  /** Whether the sub-board accepts strokes. */
  enableDraw: boolean;
  /** Whether this window's own page bar is shown. */
  enablePageBar: boolean;
}

/**
 * Payload carried by `WINDOW_STATE_CHANGED` (host only).
 *
 * Every change ships the **full** window list: the window count is capped (≤20)
 * so the full-list cost is negligible, whereas a delta would force the app to
 * keep its own mirror that can fall out of sync.
 */
export interface WhiteboardWindowStateInfo {
  /** Id of the focused window; `'m'` for the main board. */
  focused: string;
  /** All windows, ascending by stacking order (later ones on top). Excludes the main board. */
  windows: WhiteboardWindowInfo[];
}

/** A single layer in `LAYER_STATE_CHANGED`. */
export interface WhiteboardLayerInfo {
  id: string;
  /** Board the layer lives on; `'m'` for the main board. */
  winId: string;
  /** Page index (0-based); changes when pages are added / removed before it. */
  pageIndex: number;
  type: WhiteboardLayerContentType;
  /** Board logical coordinates. */
  rect: { x: number; y: number; width: number; height: number };
  zIndex: number;
  state: 'loading' | 'ready' | 'error';
  /** Always `false` for images. */
  playing: boolean;
  enableSelect: boolean;
  enableMove: boolean;
  enableResize: boolean;
}

/** Payload carried by `LAYER_STATE_CHANGED` (host only). Not emitted during a drag / resize, only on release. */
export interface WhiteboardLayerStateInfo {
  /** The only selected layer's id; `null` when no layer is selected or several elements are. */
  selected: string | null;
  /** Ids of all selected layers (including a single selection). Text elements are not listed. */
  selectedIds: string[];
  /** All layers, in creation order (not stacking order). */
  layers: WhiteboardLayerInfo[];
}

/**
 * Whiteboard Plugin Class.
 *
 * Extends `EventEmitter`-style API: `on / off / once / removeAllListeners`
 * follow the eventemitter3 conventions used across other TRTC plugins
 * (Chorus, etc.). Listener payloads are typed via overloads below.
 */
export default class Whiteboard {
  static Name: string;

  /**
   * Public event name enum:
   * `Whiteboard.EVENT.AVAILABLE`, `Whiteboard.EVENT.UNAVAILABLE`, …
   */
  static EVENT: typeof WhiteboardEvent;

  /**
   * Start the whiteboard plugin.
   *
   * Role is derived from `options.targetUser`:
   *   - omitted / `''`     -> host (requires VideoMixer active and `enableSEI: true`)
   *   - non-empty userId   -> guest of that host
   */
  start(options: WhiteboardStartOptions): Promise<void>;

  /**
   * Update plugin state at runtime. See doc.md §3.2.
   *
   * Notable transitions:
   *   - guest `update({ targetUser: 'xxx' })` -> switch to another host
   *   - `update({ mode })`                    -> toggle interactivity in place
   *
   * Host↔guest runtime role transitions are future planned and currently
   * throw `INVALID_OPERATION`. Passing `cmdId` also throws `INVALID_OPERATION`
   * because cmdId is fixed at start time.
   */
  update(options?: WhiteboardUpdateOptions): Promise<void>;

  /**
   * Stop the whiteboard plugin. As host, broadcasts `SESSION_END`, removes
   * the canvas source from VideoMixer and tears down listeners. As guest,
   * tears down preview canvas / op stack and stops listening.
   */
  stop(): Promise<void>;

  // ─── EventEmitter surface (typed overloads) ───────────────────────────────

  /** Subscribe to `AVAILABLE` (host + guest). */
  on(event: WhiteboardEvent.AVAILABLE                | 'available',                 handler: (info: WhiteboardAvailableInfo) => void): this;
  /** Subscribe to `UNAVAILABLE` (host + guest). */
  on(event: WhiteboardEvent.UNAVAILABLE              | 'unavailable',               handler: (info: WhiteboardUnavailableInfo) => void): this;
  /** Subscribe to `ERROR`. */
  on(event: WhiteboardEvent.ERROR                    | 'error',                     handler: (err: Error) => void): this;
  /** Subscribe to `CONTENT_LOAD_ERROR` (host only). */
  on(event: WhiteboardEvent.CONTENT_LOAD_ERROR       | 'content-load-error',        handler: (info: WhiteboardContentLoadErrorInfo) => void): this;
  /** Subscribe to `UNDO_STATE_CHANGED` (host + guest). */
  on(event: WhiteboardEvent.UNDO_STATE_CHANGED       | 'undo-state-changed',        handler: (info: { available: boolean }) => void): this;
  /** Subscribe to `REDO_STATE_CHANGED` (host + guest). */
  on(event: WhiteboardEvent.REDO_STATE_CHANGED       | 'redo-state-changed',        handler: (info: { available: boolean }) => void): this;
  /** Subscribe to `PAGE_STATE_CHANGED` (host + guest). */
  on(event: WhiteboardEvent.PAGE_STATE_CHANGED       | 'page-state-changed',        handler: (info: WhiteboardPageStateInfo) => void): this;
  /** Subscribe to `WINDOW_STATE_CHANGED` (host only). */
  on(event: WhiteboardEvent.WINDOW_STATE_CHANGED     | 'window-state-changed',      handler: (info: WhiteboardWindowStateInfo) => void): this;
  /** Subscribe to `LAYER_STATE_CHANGED` (host only). */
  on(event: WhiteboardEvent.LAYER_STATE_CHANGED      | 'layer-state-changed',       handler: (info: WhiteboardLayerStateInfo) => void): this;

  /** Subscribe-once helpers (same overloads as `on`). */
  once(event: WhiteboardEvent.AVAILABLE              | 'available',                 handler: (info: WhiteboardAvailableInfo) => void): this;
  once(event: WhiteboardEvent.UNAVAILABLE            | 'unavailable',               handler: (info: WhiteboardUnavailableInfo) => void): this;
  once(event: WhiteboardEvent.ERROR                  | 'error',                     handler: (err: Error) => void): this;
  once(event: WhiteboardEvent.CONTENT_LOAD_ERROR     | 'content-load-error',        handler: (info: WhiteboardContentLoadErrorInfo) => void): this;
  once(event: WhiteboardEvent.UNDO_STATE_CHANGED     | 'undo-state-changed',        handler: (info: { available: boolean }) => void): this;
  once(event: WhiteboardEvent.REDO_STATE_CHANGED     | 'redo-state-changed',        handler: (info: { available: boolean }) => void): this;
  once(event: WhiteboardEvent.PAGE_STATE_CHANGED     | 'page-state-changed',        handler: (info: WhiteboardPageStateInfo) => void): this;
  once(event: WhiteboardEvent.WINDOW_STATE_CHANGED   | 'window-state-changed',      handler: (info: WhiteboardWindowStateInfo) => void): this;
  once(event: WhiteboardEvent.LAYER_STATE_CHANGED    | 'layer-state-changed',       handler: (info: WhiteboardLayerStateInfo) => void): this;

  /** Unsubscribe a previously registered handler. Pass no `handler` to remove all for the event. */
  off(event: WhiteboardEvent | `${WhiteboardEvent}`, handler?: (...args: any[]) => void): this;

  /** Remove all listeners (optionally for a specific event). */
  removeAllListeners(event?: WhiteboardEvent | `${WhiteboardEvent}`): this;
}

export { Whiteboard };
