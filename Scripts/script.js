$(document).ready(function() {
    addUnit();
})

var streamerUnitController = {
    getStreamerID: function(self) {
        var streamerID = this.getParentStreamerUnit(self).querySelector(".streamerIDBox").value;
        return streamerID;
    },
    getPlayerUrl: function(streamerID) {
        var url = "https://player.twitch.tv/?channel=" + streamerID + "&parent=" + window.location.hostname + "&darkpopout";
        return url;
    },
    getChatUrl: function(streamerID) {
        var url = "https://www.twitch.tv/embed/" + streamerID + "/chat?parent=" + window.location.hostname + "&darkpopout";
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
    loadStreamerSet: function(self) {
        var targetStreamerSet = this.getParentStreamerUnit(self).querySelector(".streamerSet");
        var streamerID = this.getStreamerID(self);

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
        targetNode = this.getParentStreamerUnit(self);
        if(targetNode.className === "streamerUnit")
            targetNode.remove();
        else
            alert(targetNode + "is not streamerUnit");
    },
    // Triggers buttonLoadUnit when press ENTER on streamerIDBox
    functionIfEnter: function(self, e) {
        if(e.keyCode === 13)
            this.getParentStreamerUnit(self).querySelector(".buttonLoadUnit").click();
    }
}

function addUnit()
{
    fetch("Documents/streamerUnit_default.html")
    .then(function(response){
        response.text().then(function(text){
            $("#streamerUnitsHolder").append(text);
        })
    })
}

function toggleStreamerSet_alignment()
{
    var currentMode = $("#SS_alignment").attr("href").split('/')[2];
    if (currentMode == 'horizontal.css')
        $("#SS_alignment").attr("href", "Styles/StreamerSet_alignment/vertical.css");
    else if (currentMode == 'vertical.css')
        $("#SS_alignment").attr("href", "Styles/StreamerSet_alignment/horizontal.css");
}
