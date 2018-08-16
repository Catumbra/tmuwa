// Getting version values and put them inside footer
fetch('version').then(function(response) {
    response.text().then(function(text) {
        var targetPTag = document.querySelector("#versionParagraph");
        var items = text.split('\n');
        targetPTag.innerHTML = items[0];
        targetPTag.setAttribute("title", "Last Update: " + items[1].replace("###### ", ""));
    })
});