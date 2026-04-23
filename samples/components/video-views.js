const videoViewsTemplate = document.createElement('template');

// Inject global video constraint style to prevent horizontal scrollbar in iframe
if (!document.getElementById('video-views-style')) {
    const style = document.createElement('style');
    style.id = 'video-views-style';
    style.textContent = `
        .video-container {
            max-width: 100%;
            overflow: hidden;
        }
        .video-sub-container {
            max-width: 100%;
            box-sizing: border-box;
        }
        .video-view {
            max-width: 100%;
            overflow: hidden;
        }
        .video-view video {
            max-width: 100%;
            height: auto;
        }
        body.in-iframe main {
            overflow-x: hidden;
        }
    `;
    document.head.appendChild(style);
}

videoViewsTemplate.innerHTML = `
  <div class="video-container">
    <div class="video-sub-container" id="video-local-container">
      <h2></h2>
      <div class="video-view"></div>
    </div>
    <div class="video-sub-container" id="video-remote-container">
      <h2></h2>
      <div class="video-view"></div>
    </div>
  </div>
`;

class VideoViews extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.style.width = '100%';
        const clone = videoViewsTemplate.content.cloneNode(true);

        const localTitle = this.getAttribute('local-title') || t('video.localVideo');
        const remoteTitle = this.getAttribute('remote-title') || t('video.remoteVideo');
        const localId = this.getAttribute('local-id') || 'local-video-view';
        const remoteId = this.getAttribute('remote-id') || 'remote-video-view';

        const localContainer = clone.getElementById('video-local-container');
        localContainer.querySelector('h2').textContent = localTitle;
        localContainer.querySelector('h2').classList.add('local-title');
        localContainer.querySelector('.video-view').id = localId;
        localContainer.removeAttribute('id');

        const remoteContainer = clone.getElementById('video-remote-container');
        remoteContainer.querySelector('h2').textContent = remoteTitle;
        remoteContainer.querySelector('h2').classList.add('remote-title');
        remoteContainer.querySelector('.video-view').id = remoteId;
        remoteContainer.removeAttribute('id');

        this.appendChild(clone);
    }
}

window.customElements.define('video-views', VideoViews);
