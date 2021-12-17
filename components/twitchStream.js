// Twitch Embed를 이용하기 위해 twitch-stream 내부로 접근해야 하므로 Shadow DOM 사용 불가

class TwitchStream extends HTMLElement {
    constructor() {
        super();

        this.twitchEmbedID = uuidv4();
        this.channel = this.getAttribute('channel');
        this.isDarkMode = true;
        this.isChatOn = true;
        this.innerHTML = `
        <div class="control-bar">control-bar</div>
        <div class="twitch-embed" id="${this.twitchEmbedID}"></div>
        `;

        this.addStream();
    }

    setChannel(channel) {
        this.channel = channel;
    }
    addStream() {
        var embedOptions = {};
        embedOptions['width'] = '100%';
        embedOptions['height'] = '100%';
        embedOptions['channel'] = this.channel;
        embedOptions['parent'] = window.location.hostname;
        embedOptions['muted'] = true; // 테스트중 (임시)

        new Twitch.Embed(this.twitchEmbedID, embedOptions);
    }
    addDummyStream() {

    }
}

window.customElements.define('twitch-stream', TwitchStream);
