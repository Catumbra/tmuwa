// uuid 생성기 코드
function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

// twitch-stream 갯수
function countStreams() {
    var streamsContainer = document.getElementById('streams-container');
    var count = streamsContainer.getElementsByTagName('twitch-stream').length;
    return count;
}

// twitch-stream 레이아웃 자동 변경
// TODO 주변 환경에 따라 자동으로 레이아웃 계산하는 알고리즘 추가
function setStreamLayout() {
    var nStreams = countStreams();
    var container = document.getElementById("streams-container");
    if (document.getElementById('welcome') != null) {
        document.getElementById('welcome').remove();
    } else if (nStreams == 0) {
        // twitch-stream이 하나도 없을 시 welcome 페이지 추가 /ᐠ｡ꞈ｡ᐟ\\
        container.innerHTML = `
        <div id="welcome">
            <h1>Project tmuwa</h1>
            <h2>press 'Add Stream' button to add stream. ¯\\_(ツ)_/¯</h2>
        </div>
        `;
    } else {
        container.style.gridTemplateColumns = `repeat(${nStreams}, 1fr)`;
    }
}

function addStream() {
    var container = document.getElementById("streams-container");
    container.appendChild(new TwitchStream());

    setStreamLayout();
}