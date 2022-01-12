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

// streams-container의 너비 높이 측정
function getXY(element) {
    var x = element.clientWidth;
    var y = element.clientHeight;

    return [x, y];
}

// twitch-stream 레이아웃 자동 변경
function setStreamLayout() {
    var nStreams = countStreams();
    var container = document.getElementById("streams-container");
    if (document.getElementById('welcome') != null) {
        // welcome page가 이미 존재할때 제거
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
        // twitch-stream이 존재할 때 레이아웃 배치
        var a = 1;
        while (nStreams > a**2) {
            a++;
        }

        var x = container.clientWidth;
        var y = container.clientHeight;
        if (x >= y) {
            container.style.gridAutoFlow = 'row';
            container.style.gridTemplateRows = '';
            container.style.gridTemplateColumns = `repeat(${a}, 1fr)`;
        } else {
            container.style.gridAutoFlow = 'column';
            container.style.gridTemplateColumns ='';
            container.style.gridTemplateRows = `repeat(${a}, 1fr)`;
        }
        console.log(a);
    }
}

function addStream() {
    var container = document.getElementById("streams-container");
    container.appendChild(new TwitchStream());

    setStreamLayout();
}