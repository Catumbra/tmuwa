const template = document.createElement('template');
template.innerHTML = fetch("../Documents/streamerUnit_defaul.html")
    .then((response) => response.text())
    .then((html) => html)
    .catch((error) => console.log("error:", error));

class StreamerUnit extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.innerHTML = `Hello, World!`;
    }
}
window.customElements.define('streamer-unit', StreamerUnit);