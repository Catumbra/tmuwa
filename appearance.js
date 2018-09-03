// Getting version values and put them inside footer
function getAndWriteVersion() 
{
    fetch('version').then(function(response) {
        response.text().then(function(text) {
            var targetPTag = document.querySelector("#versionParagraph");
            var items = text.split('\n');
            targetPTag.innerHTML = items[0];
            targetPTag.setAttribute("title", "Last Update: " + items[1].replace("###### ", ""));
        })
    });
}

// Run when page is loaded
window.onload = function() {
    addUnit();
    getAndWriteVersion();
}