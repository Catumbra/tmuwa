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
    targetStreamerSet = self.parentNode.parentNode.querySelector('.streamerSet');
    targetIframes = targetStreamerSet.querySelectorAll('iframe');

     streamerID = self.parentNode.querySelector('input').value;

    targetIframes[0].src = getPlayerUrl(streamerID);
    targetIframes[1].src = getChatUrl(streamerID);
}