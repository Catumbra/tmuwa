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
function modifyStreamerSet(self)
{
    thisStreamerUnit = self.parentNode.parentNode;
    targetStreamerSet = thisStreamerUnit.querySelector(".streamerSet");

    streamerID = thisStreamerUnit.querySelector(".unitTopBar").querySelector(".textInput").value;

    targetStreamerSet.querySelector(".twitchPlayer").src = getPlayerUrl(streamerID);
    targetStreamerSet.querySelector(".twitchChat").src = getChatUrl(streamerID);
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
            $("#mainContents").append(text);
        })
    })
}