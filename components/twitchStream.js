const template = document.createElement('template');
template.innerHTML = `
    <style>
        #twitch-embed {
            height: 100%;
        }
    </style>
    <div class="control-bar"></div>
    <div id="twitch-embed"></div>
`;

class TwitchStream extends HTMLElement {
    constructor() {
        super();

        // this.attachShadow({mode: 'open'});
        // this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.channel = this.getAttribute('channel');
        this.isDarkMode = true;
        this.isChatOn = true;
        this.innerHTML = `
        <style>
            #twitch-embed {
                height: 100%;
            }
        </style>
        <div class="control-bar"></div>
        <div id="twitch-embed"></div>
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

        new Twitch.Embed("twitch-embed", embedOptions);
        // new Twitch.Embed("twitch-embed", {
        //     width: "100%",
        //     height: "100%",
        //     channel: "jungtaejune",
        //     parent: window.location.hostname
        // });
    }
    addDummyStream() {

    }
}

window.customElements.define('twitch-stream', TwitchStream);

