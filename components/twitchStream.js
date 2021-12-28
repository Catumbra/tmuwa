// Shadow DOM을 사용하는 방안 검토 - event 발생시 this의 혼란(this.twitchEmbdeID 사용 불가)

class TwitchStream extends HTMLElement {
    constructor() {
        super();
        
        // twitch-embed properties
        this.twitchEmbedID = uuidv4();
        this.channel = 'undefined';
        this.isDarkMode = true;
        this.isChatOn = true;
        this.innerHTML = `
        <div class="control-bar">
            <button>Close</button>
        </div>
        <div class="twitch-embed" id="${this.twitchEmbedID}"></div>
        `;
    }

    render() {
        this.removeEmbed();
        if (this.channel == null) {
            this.addDummyEmbed();
        } else {
            this.addEmbed();
        }
    }

    connectedCallback() {
        // Add Event Listener (Close Button)
        this.getElementsByClassName('control-bar')[0].getElementsByTagName('button')[0].addEventListener('click', this.removeStream);

        this.render();
    }
    disconnectedCallback() {
        // Remove event listeners
        this.closest("twitch-stream").getElementsByClassName('control-bar')[0].getElementsByTagName('button')[0].removeEventListener('click', this.removeStream);

        // Relocate Streams
        setStreamLayout();
    }
    static get observedAttributes() {
        return ['channel']
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.channel = this.getAttribute('channel');
        this.render()
    }
    
    setChannel(channel) {
        this.channel = channel;
    }
    removeEmbed() {
        document.getElementById(this.twitchEmbedID).innerHTML = '';
    }
    addEmbed() {
        var embedOptions = {};
        embedOptions['width'] = '100%';
        embedOptions['height'] = '100%';
        embedOptions['channel'] = this.channel;
        embedOptions['parent'] = window.location.hostname;
        embedOptions['muted'] = true; // 테스트중 (임시)

        new Twitch.Embed(this.twitchEmbedID, embedOptions);
    }
    addDummyEmbed() {
        // TODO channel 입력하는 란 추가, 입력시 twitch-embed로 변환하는 기능
        var dummyStreamHTML = `
        <div style="background-color: #18181a; height: 100%; width: 100%;">
            <input type="text"></input>
            <button>GO</button>
        </div>
        `;
        this.getElementsByClassName("twitch-embed")[0].innerHTML = dummyStreamHTML;
    }
    removeStream() {
        // Remove Twitch Stream
        this.closest("twitch-stream").remove();
    }
}

window.customElements.define('twitch-stream', TwitchStream);