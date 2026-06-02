/**
 * Demo Base Helpers
 * Optional utilities to reduce boilerplate in enterRoom/exitRoom patterns.
 * Demos can continue using their own enterRoom/exitRoom functions,
 * or opt-in to these helpers for standard flows.
 */

/**
 * Standard enter room helper with built-in reporting and link refresh.
 * @param {Object} trtc - TRTC instance
 * @param {Object} options - Optional hooks and extra room params
 * @param {Function} [options.beforeEnter] - async (params, trtc) => {}
 * @param {Function} [options.afterEnter] - async (params, trtc) => {}
 * @param {string} [options.scene] - TRTC scene type
 * @param {string} [options.role] - TRTC role type
 */
async function demoEnterRoom(trtc, options = {}) {
  try {
    const { sdkAppId, sdkSecretKey, userId, roomId, userSig } = initParams();
    const enterOptions = { roomId, sdkAppId, userId, userSig };
    if (options.scene) enterOptions.scene = options.scene;
    if (options.role) enterOptions.role = options.role;

    if (options.beforeEnter) await options.beforeEnter({ sdkAppId, sdkSecretKey, userId, roomId, userSig }, trtc);
    await trtc.enterRoom(enterOptions);
    if (options.afterEnter) await options.afterEnter({ sdkAppId, sdkSecretKey, userId, roomId, userSig }, trtc);

    switchButtonStatus('enter-btn', 'exit-btn', true);
    reportSuccessEvent('enterRoom', sdkAppId);
    refreshLink({ sdkAppId, sdkSecretKey, roomId });
  } catch (error) {
    reportFailedEvent({ name: 'enterRoom', roomId: 0, error });
    throw error;
  }
}

/**
 * Standard exit room helper with built-in reporting and link cleanup.
 * @param {Object} trtc - TRTC instance
 * @param {Object} options - Optional hooks
 * @param {Function} [options.beforeExit] - async (trtc) => {}
 * @param {Function} [options.afterExit] - async (trtc) => {}
 */
async function demoExitRoom(trtc, options = {}) {
  try {
    if (options.beforeExit) await options.beforeExit(trtc);
    await trtc.exitRoom();
    if (options.afterExit) await options.afterExit(trtc);

    switchButtonStatus('enter-btn', 'exit-btn', false);
    cleanShareLink();
    reportSuccessEvent('exitRoom', 0);
  } catch (error) {
    reportFailedEvent({ name: 'exitRoom', roomId: 0, error });
    throw error;
  }
}

/**
 * Bind the standard REMOTE_VIDEO_AVAILABLE event to a view element.
 * @param {Object} trtc - TRTC instance
 * @param {string} [viewId='remote-video-view'] - DOM element id for rendering
 */
function bindRemoteVideo(trtc, viewId = 'remote-video-view') {
  trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
    trtc.startRemoteVideo({ userId, streamType, view: viewId });
  });
}
