class TwitchStream extends HTMLElement {
    constructor() {
        super();
        
        // twitch-embed properties
        this.twitchEmbedID = uuidv4();
        this.channel = 'undefined'; // default stream
        this.theme = 'dark'; // light
        // this.layout = 'video-with-chat'; // video
        this.innerHTML = `
        <div class="control-bar">
            <input type='text' class='channelTextBox' onclick='this.select();'></input>
            <button class='channelBtn btn-style-gray'>GO</button>
            <button class='closeBtn btn-style-transparent'>
                <ion-icon name="close" style="font-size: 20px;"></ion-icon>
            </button>
        </div>
        <div class="twitch-embed" id="${this.twitchEmbedID}"></div>
        `;
    }

    render() {
        this.getElementsByClassName('channelTextBox')[0].value = this.channel;
        this.removeEmbed();
        this.addEmbed();
    }

    // Callback methods
    connectedCallback() {
        // Add Event Listener (Close Button)
        this.getElementsByClassName('channelTextBox')[0].addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.setChannel();
            }
        });
        this.getElementsByClassName('channelBtn')[0].addEventListener('click', this.setChannel);
        this.getElementsByClassName('closeBtn')[0].addEventListener('click', this.removeStream);

        this.render();
    }
    disconnectedCallback() {
        // Remove event listeners
        this.getElementsByClassName('channelTextBox')[0].removeEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.setChannel();
            }
        });
        this.getElementsByClassName('channelBtn')[0].removeEventListener('click', this.setChannel);
        this.getElementsByClassName('closeBtn')[0].removeEventListener('click', this.removeStream);

        // Relocate Streams
        setStreamLayout();
    }
    static get observedAttributes() {
        return ['channel']
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.channel = this.getAttribute('channel');
        this.render();
    }
    
    setChannel() {
        this.closest("twitch-stream").setAttribute('channel', this.closest("twitch-stream").getElementsByClassName('channelTextBox')[0].value);
    }
    removeEmbed() {
        document.getElementById(this.twitchEmbedID).innerHTML = '';
    }
    addEmbed() {
        var embedOptions = {
            width: '100%',
            height: '100%',
            channel: this.channel,
            theme: this.theme,
            // layout: this.layout,
            parent: window.location.hostname,
            // muted: true
        }

        new Twitch.Embed(this.twitchEmbedID, embedOptions);
    }
    removeStream() {
        // Remove Twitch Stream
        this.closest("twitch-stream").remove();
    }
}

window.customElements.define('twitch-stream', TwitchStream);