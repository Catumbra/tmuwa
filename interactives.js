$(document).ready(function() {
    addUnit();
    getAndWriteVersion();
})

var streamerUnitController = {
    getPlayerUrl: function(streamerID) {
        var url = "https://player.twitch.tv/?channel=" + streamerID;
        return url;
    },
    getChatUrl: function(streamerID) {
        var url = "https://www.twitch.tv/embed/" + streamerID + "/chat";
        return url;
    },
    getParentStreamerUnit: function(self) {
        var currentNode = self;
        while(true)
        {
            currentNode = currentNode.parentNode;
            if(currentNode.className === "streamerUnit")
                return currentNode;
            else if(currentNode.tagName === "BODY")
                return 0;
        }
    },
    modifyStreamerSet: function(self) {
        var thisStreamerUnit = self.parentNode.parentNode;
        var targetStreamerSet = thisStreamerUnit.querySelector(".streamerSet");

        var streamerID = thisStreamerUnit.querySelector(".unitTopBar").querySelector(".textInput").value;

        targetStreamerSet.querySelector(".twitchPlayer").src = this.getPlayerUrl(streamerID);
        targetStreamerSet.querySelector(".twitchChat").src = this.getChatUrl(streamerID);
    },
    toggleChat: function(self) {
        var thisStreamerUnit = this.getParentStreamerUnit(self);
        var thisStreamerSet = thisStreamerUnit.querySelector(".streamerSet");
        var targetChatNode = thisStreamerSet.querySelector(".twitchChat");
        if(window.getComputedStyle(targetChatNode).getPropertyValue('display') === 'none')
        {
            targetChatNode.style.display = 'inline';
            thisStreamerSet.style.gridTemplateColumns = '1fr 350px';
        }
        else
        {
            targetChatNode.style.display = 'none';
            thisStreamerSet.style.gridTemplateColumns = '1fr';
        }
    },
    removeStreamerUnit: function(self) {
        targetNode = self.parentNode.parentNode;
        if(targetNode.className === "streamerUnit")
            targetNode.remove();
        else
            alert(targetNode + "is not streamerUnit");
    },
    // Triggers buttonInput when press ENTER on textInput
    functionIfEnter: function(self, e) {
        if(e.keyCode === 13)
            self.parentNode.querySelector(".buttonInput").click();
    }
};

function addUnit()
{
    fetch("streamerUnit_default.html")
    .then(function(response){
        response.text().then(function(text){
            $("#streamerUnitsHolder").append(text);
        })
    })
}

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