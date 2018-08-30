function getPlayerUrl(streamerID)
{
    var url = "https://player.twitch.tv/?channel=" + streamerID;
    return url;
}
function getChatUrl(streamerID)
{
    var url = "https://www.twitch.tv/embed/" + streamerID + "/chat";
    return url;
}
function getParentStreamerUnit(self)
{
    var currentNode = self;
    while(true)
    {
        currentNode = currentNode.parentNode;
        if(currentNode.className === "streamerUnit")
            return currentNode;
        else if(currentNode.tagName === "BODY")
            return 0;
    }
}
function modifyStreamerSet(self)
{
    var thisStreamerUnit = self.parentNode.parentNode;
    var targetStreamerSet = thisStreamerUnit.querySelector(".streamerSet");

    var streamerID = thisStreamerUnit.querySelector(".unitTopBar").querySelector(".textInput").value;

    targetStreamerSet.querySelector(".twitchPlayer").src = getPlayerUrl(streamerID);
    targetStreamerSet.querySelector(".twitchChat").src = getChatUrl(streamerID);
}
function toggleChat(self)
{
    var thisStreamerUnit = getParentStreamerUnit(self);
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
}
function removeStreamerUnit(self)
{
    targetNode = self.parentNode.parentNode;
    if(targetNode.className === "streamerUnit")
        targetNode.remove();
    else
        alert(targetNode + "is not streamerUnit");
}
function addUnit()
{
    fetch("streamerUnit_default.html")
    .then(function(response){
        response.text().then(function(text){
            $("#streamerUnitsHolder").append(text);
        })
    })
}

// Triggers buttonInput when press ENTER on textInput
function functionIfEnter(self, e)
{
    if(e.keyCode === 13)
        self.parentNode.querySelector(".buttonInput").click();
}