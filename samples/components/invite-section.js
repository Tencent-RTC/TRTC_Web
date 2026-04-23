const inviteSectionTemplate = document.createElement('template');

inviteSectionTemplate.innerHTML = `
  <section>
    <h3></h3>
    <div>
      <span class="note"></span>
      <div class="copy">
        <div class="invite-actions">
          <button id="invite-btn" class="invite-action-btn" data-clipboard-target="#invite-url" title="Copy invite link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
          <button id="invite-open-btn" class="invite-action-btn" title="Open invite link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </button>
        </div>
        <input id="invite-url" class="invite-input" readonly />
      </div>
    </div>
  </section>
`;

class InviteSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const clone = inviteSectionTemplate.content.cloneNode(true);
        const titleAttr = this.getAttribute('data-title') || this.getAttribute('title');
        const noteAttr = this.getAttribute('data-note') || this.getAttribute('note');
        const title = titleAttr || t('invite.defaultTitle');
        const note = noteAttr || t('invite.defaultNote');
        clone.querySelector('h3').textContent = title;
        clone.querySelector('.note').textContent = note;
        this.appendChild(clone);
    }
}

window.customElements.define('invite-section', InviteSection);
