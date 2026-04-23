const paramsFormTemplate = document.createElement('template');

// Inject global params-form styles (shared across all demos)
if (!document.getElementById('params-form-style')) {
    const style = document.createElement('style');
    style.id = 'params-form-style';
    style.textContent = `
        .step-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background-color: #1c66e5;
            color: #ffffff;
            font-size: 0.75rem;
            font-weight: 700;
            margin-right: 8px;
            vertical-align: middle;
        }

        /* Configuration form layout */
        params-form .input-list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 8px;
        }

        params-form .input-group {
            flex-basis: calc(50% - 4px);
            min-width: 0;
            display: flex;
        }

        params-form .input-group label {
            width: 6rem;
            flex-shrink: 0;
            font-size: 0.85rem;
            font-family: "Oxygen";
            background-color: #f2f5fc;
            padding: 8px;
            border: 1px solid #ced4da;
            border-right: none;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }

        params-form .form-control {
            width: auto;
            min-width: 0;
            flex: 1;
            padding: 8px;
            border: 1px solid #ced4da;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            color: #4f586b;
        }

        params-form .input-group:has(.toggle-password-btn) .form-control {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: none;
        }

        params-form .toggle-password-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            padding: 0;
            border: 1px solid #ced4da;
            border-left: none;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            background: #fff;
            cursor: pointer;
            font-size: 0.85rem;
            color: #4f586b;
            flex-shrink: 0;
        }

        params-form .toggle-password-btn:hover {
            background-color: #f2f5fc;
        }

        /* Collapsible Configuration */
        .collapsible-header {
            cursor: pointer;
            user-select: none;
            display: flex;
            align-items: center;
        }

        .collapse-icon {
            margin-left: auto;
            font-size: 0.7rem;
            transition: transform 0.25s ease;
        }

        .collapsed .collapse-icon {
            transform: rotate(-90deg);
        }

        .collapsible-content {
            overflow: hidden;
            transition: max-height 0.3s ease, opacity 0.3s ease;
            max-height: 500px;
            opacity: 1;
        }

        .collapsed .collapsible-content {
            max-height: 0;
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}

paramsFormTemplate.innerHTML = `
  <section>
    <h3 class="collapsible-header"><span class="step-badge">1</span><span data-i18n="params.configuration">Configuration</span><span class="collapse-icon">▼</span></h3>
    <div class="collapsible-content">
    <span class="note"
      ><span data-i18n="params.getFrom">Get SDKAppId and SDKSecretKey from</span>
      <a
        target="_top"
        href="https://console.trtc.io/?quickclaim=engine_trial"
        data-i18n-href="params.trtcConsoleHref"
        data-i18n="params.trtcConsole"
      >TRTC Console</a
      >
    </span>
    <span class="warning"
      ><span data-i18n="params.warning">Note: This demo is for demonstration purposes only. Before official
      launch, please migrate SDKSecretKey and the UserSig calculation code
      to your own backend server to avoid unauthorized traffic use caused
      by the key leakage.</span>
      <a target="_top" href="https://trtc.io/document/35166"
        data-i18n-href="params.learnMoreHref"
        data-i18n="params.learnMore"
      >Learn More</a
      ></span
    >
    <div class="input-list">
      <div class="input-group">
        <label for="sdk-app-id" data-i18n="params.sdkAppId">SDKAppId</label>
        <input
          id="sdk-app-id"
          type="text"
          inputmode="numeric"
          class="form-control"
          data-i18n-placeholder="params.sdkAppId"
          placeholder="SDKAppId"
        />
      </div>
      <div class="input-group">
        <label for="sdk-secret-key" data-i18n="params.sdkSecretKey">SDKSecretKey</label>
        <input
          id="sdk-secret-key"
          type="password"
          class="form-control"
          data-i18n-placeholder="params.sdkSecretKey"
          placeholder="SDKSecretKey"
        />
        <button type="button" class="toggle-password-btn" data-i18n-title="params.showHide" title="Show/Hide">👁</button>
      </div>
    </div>
    <div class="input-list">
      <div class="input-group">
        <label for="user-id" data-i18n="params.userId">UserId</label>
        <input id="user-id" type="text" class="form-control" />
      </div>
      <div class="input-group">
        <label for="room-id" data-i18n="params.roomId">RoomId</label>
        <input id="room-id" type="text" inputmode="numeric" class="form-control" />
      </div>
    </div>
    </div>
  </section>
`;

class ParamsForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.appendChild(paramsFormTemplate.content.cloneNode(true));
        const header = this.querySelector('.collapsible-header');
        header.addEventListener('click', () => this.toggleCollapse());

        const toggleBtn = this.querySelector('.toggle-password-btn');
        const secretKeyInput = this.querySelector('#sdk-secret-key');
        toggleBtn.addEventListener('click', () => {
            const isPassword = secretKeyInput.type === 'password';
            secretKeyInput.type = isPassword ? 'text' : 'password';
            toggleBtn.textContent = isPassword ? '🙈' : '👁';
        });
    }

    toggleCollapse() {
        this.classList.toggle('collapsed');
    }

    collapse() {
        this.classList.add('collapsed');
    }

    expand() {
        this.classList.remove('collapsed');
    }
}

window.customElements.define('params-form', ParamsForm);
