const fontLink = document.createElement('link');
fontLink.setAttribute('rel', 'stylesheet');
fontLink.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap');
document.head.appendChild(fontLink);
const template = document.createElement('template');

template.innerHTML = `
  <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
    background-color: white;
    color: var(--dark-grey);
    letter-spacing: -0.4px;
  }

  :host {
    --dark-grey: #333333;
    --medium-grey: #636363;
    --light-grey: #eeeeee;
    --ash: #f4f4f4;
    --primary-color: #2b72fb;
    --border: 1px solid var(--light-grey);
    --shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: inherit;
  }

  .btn {
    display: block;
    background-color: var(--primary-color);
    color: white;
    text-align: center;
    padding: 0.6rem 1.4rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 5px;
  }

  .icon {
    padding: 0.5rem;
    background-color: var(--light-grey);
    border-radius: 10px;
  }

  .logo {
    margin-right: 1.5rem;
  }

  #nav-menu {
    border-bottom: var(--border);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1600px;
    margin: 0 auto;
    column-gap: 2rem;
    height: 90px;
    padding: 1.2rem 3rem;
  }

  .menu {
    position: relative;
    background: white;
  }

  .menu-bar .nav-link {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.6px;
    padding: 0.3rem;
    min-width: 60px;
    margin: 0 0.6rem;
  }

  .menu-bar .nav-link:hover,
  .dropdown-link:hover {
    color: var(--primary-color);
  }

  .nav-start,
  .nav-end,
  .menu-bar,
  .right-container,
  .right-container .search {
    display: flex;
    align-items: center;
  }

  .dropdown {
    display: flex;
    flex-direction: column;
    min-width: 230px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    top: 36px;
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    transform: scale(0.97) translateX(-5px);
    transition: 0.1s ease-in-out;
    box-shadow: var(--shadow);
  }

  .dropdown.active {
    visibility: visible;
    opacity: 1;
    transform: scale(1) translateX(5px);
  }

  .dropdown ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.2rem;
    font-size: 0.95rem;
  }

  .dropdown-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.15rem;
  }

  .dropdown-link {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-radius: 7px;
    transition: 0.1s ease-in-out;
  }

  .right-container {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }

  .right-container .search {
    position: relative;
  }

  .right-container img {
    border-radius: 50%;
  }

  .search input {
    background-color: var(--ash);
    border: none;
    border-radius: 6px;
    padding: 0.7rem;
    padding-left: 2.4rem;
    font-size: 16px;
    width: 100%;
    border: var(--border);
  }

  .search .bx-search {
    position: absolute;
    left: 10px;
    top: 50%;
    font-size: 1.3rem;
    transform: translateY(-50%);
    opacity: 0.6;
  }

  .lang-switch {
    margin-left: 1.3em;
  }

  .lang-switch:hover {
    cursor: pointer;
  }

  #hamburger {
    display: none;
    padding: 0.1rem;
    margin-left: 1rem;
    font-size: 1.9rem;
  }

  @media (max-width: 1100px) {
    #hamburger {
      display: block;
    }

    .container {
      padding: 1.2rem;
    }

    .menu {
      display: none;
      position: absolute;
      top: 87px;
      left: 0;
      min-height: 100vh;
      width: 100vw;
    }

    .menu-bar li:first-child ul:nth-child(1) {
      border-right: none;
      border-bottom: var(--border);
    }

    .dropdown {
      display: none;
      min-width: 100%;
      border: none !important;
      border-radius: 5px;
      position: static;
      top: 0;
      left: 0;
      visibility: visible;
      opacity: 1;
      transform: none;
      box-shadow: none;
    }

    .menu.show,
    .dropdown.active {
      display: block;
    }

    .dropdown ul {
      padding-left: 0.3rem;
    }

    .menu-bar {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      row-gap: 1rem;
      padding: 1rem;
    }

    .menu-bar .nav-link {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-weight: 600;
      font-size: 1.2rem;
      margin: 0;
    }

    .menu-bar li:first-child .dropdown {
      min-width: 100%;
    }

    .menu-bar > li:not(:last-child) {
      padding-bottom: 0.5rem;
      border-bottom: var(--border);
    }
  }

  @media (max-width: 600px) {
    .right-container {
      display: none;
    }
  }
  </style>
  <header id="nav-menu">
      <div class="container">
        <div class="nav-start">
          <!-- logo -->
          <a class="logo" href="https://trtc.io/document/35078?platform=web&product=rtcengine">
            <img
              src="../../assets/headLogo.avif"
              width="150px"
              alt="Inc Logo"
            />
          </a>
          <nav class="menu">
            <ul class="menu-bar">
              <!-- basic features -->
              <li>
                <button class="nav-link dropdown-btn" data-dropdown="dropdown1">
                  Basic Features
                  <img src='../../icons/chevron-down.svg' width='16px' height='16px' id="arrow1" alt='Arrow icon'>
                </button>
                <div id="dropdown1" class="dropdown">
                  <ul>
                    <li>
                      <a class="dropdown-link" href="../../basic-features/screen-sharing/index.html">
                        Screen Sharing
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-link" href="../../basic-features/live-streaming/index.html">
                        Live Streaming
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-link" href="../../basic-features/media-device/index.html">
                        Media Device
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-link" href="../../basic-features/audio-volume/index.html">
                        Audio Volume
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-link" href="../../basic-features/set-encoding-profile/index.html">
                        Set Encoding Profile
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <!-- advance features -->
              <li>
                <button class="nav-link dropdown-btn" data-dropdown="dropdown2">
                  Advance Features
                  <img src='../../icons/chevron-down.svg' width='16px' height='16px' id="arrow2" alt='Arrow icon'>
                </button>
                <div id="dropdown2" class="dropdown">
                  <ul>
                    <li>
                      <a class="dropdown-link" href="../../advance-features/enable-audio-mixer/index.html"
                        >Enable Audio Mixer</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-link" href="../../advance-features/enable-watermark/index.html"
                        >Enable Watermark</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-link" href="../../advance-features/data-messages/index.html"
                        >Data Messages</a
                      >
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div class="nav-end">
          <!-- search -->
          <!-- <div class="right-container">
      <form class="search">
        <input type="search" name="search" placeholder="Search" />
        <img
          src="../../icons/search.svg"
          width="16px"
          height="16px"
          class="bx-search"
          alt="Arrow icon"
        />
      </form>
    </div> -->
          <!-- hamburger button -->
          <button id="hamburger">
            <img src='../../icons/menu.svg' width='32px' height='32px' alt='Menu icon'>
          </button>
          <!-- switch language -->
          <!-- <span class="lang-switch">En/中</span> -->
        </div>
      </div>
  </header>
`;

class HeaderNav extends HTMLElement {
  constructor() {
    super();
    const _shadowRoot = this.attachShadow({ mode: 'open' });
    _shadowRoot.appendChild(template.content.cloneNode(true));
    const _dropdownBtn = _shadowRoot.querySelectorAll(".dropdown-btn");
    const _dropdown = _shadowRoot.querySelectorAll(".dropdown");
    const _hamburgerBtn = _shadowRoot.getElementById("hamburger");
    const _navMenu = _shadowRoot.querySelector(".menu");
    const _links = _shadowRoot.querySelectorAll(".dropdown a");
    const _arrow1 = _shadowRoot.querySelector('#arrow1');
    const _arrow2 = _shadowRoot.querySelector('#arrow2');

    _dropdownBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const dropdownIndex = e.currentTarget.dataset.dropdown;

        // change the active arrow's direction from pointing down to pointing up
        const activeArrow = dropdownIndex === 'dropdown1' ? _arrow1 : _arrow2;
        const inactiveArrow = dropdownIndex === 'dropdown1' ? _arrow2 : _arrow1;
        activeArrow.src = activeArrow.src.includes('chevron-up.svg') ? '../../icons/chevron-down.svg' : '../../icons/chevron-up.svg';
        inactiveArrow.src = '../../icons/chevron-down.svg';

        const dropdownElement = _shadowRoot.getElementById(dropdownIndex);
        dropdownElement.classList.toggle("active");
        _dropdown.forEach((drop) => {
          if (drop.id !== btn.dataset["dropdown"]) {
            drop.classList.remove("active");
          }
        });
        e.stopPropagation();
      });
    });

    // close dropdown menu when the dropdown links are clicked
    _links.forEach((link) => {
      link.addEventListener("click", () => {
        closeDropdownMenu(_shadowRoot);
        _navMenu.classList.toggle("show");
      })
    });

    // close dropdown menu when you click on the document body
    document.documentElement.addEventListener("click", () => {
      closeDropdownMenu(_shadowRoot);
    });

    // close dropdown when Esc is pressed
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDropdownMenu(_shadowRoot);
      }
    });

    _hamburgerBtn.addEventListener("click", () => _navMenu.classList.toggle("show"));
  }
}

function closeDropdownMenu(shadowRoot) {
  // change all the arrow's direction from pointing up to pointing down
  shadowRoot.getElementById('arrow1').src = '../../icons/chevron-down.svg';
  shadowRoot.getElementById('arrow2').src = '../../icons/chevron-down.svg';
  const dropdown = shadowRoot.querySelectorAll(".dropdown")
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

window.customElements.define('header-nav', HeaderNav);