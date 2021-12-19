// TODO 트위치 스트림 remove 하는 기능, 버튼 이벤트 리스너 추가 및 제거
class TwitchStream extends HTMLElement {
    constructor() {
        super();

        this.twitchEmbedID = uuidv4();
        this.channel = this.getAttribute('channel');
        this.isDarkMode = true;
        this.isChatOn = true;
        this.innerHTML = `
        <div class="control-bar">
            <button>Close</button>
        </div>
        <div class="twitch-embed" id="${this.twitchEmbedID}"></div>
        `;

        if (this.channel == null) {
            this.addDummyStream();
        } else {
            this.addStream();
        }

        // var btn_DEBUG = document.createElement("button");
        // btn_DEBUG.innerText = "DEBUG";
        // btn_DEBUG.setAttribute("onClick", this.removeStream());
        // this.getElementsByClassName("control-bar")[0].appendChild(btn_DEBUG);
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
        // TODO channel 입력하는 란 추가, 입력시 twitch-embed로 변환하는 기능
        var dummyStreamHTML = `
        <div style="background-color: #18181a; height: 100%; width: 100%;">

        </div>
        `;
        this.getElementsByClassName("twitch-embed")[0].innerHTML = dummyStreamHTML;
    }
    removeStream() {
        this.remove();
    }
}

window.customElements.define('twitch-stream', TwitchStream);