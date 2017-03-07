
var videoList = [""];
var currentVid = 1;
var info = document.getElementById("info");
var pc = document.getElementById("pc");
var user_text = document.getElementById("user_text");
var user_add =  document.getElementById("user_add");
var listArea =  document.getElementById("listArea");
var urlRequired = "https://www.youtube.com/watch?v=";
var hasplayed = 0;  /// This value just keeps track of whether the player has worked.  Its main purpose is to prevent the add button from triggering auto play after the first video.

function startVideo(){
  player.loadVideoById(videoList[currentVid]);
  info.style.height = 0;
  pc.style.height =  "30vh";
}

/////Refresh ListArea
function refresh(current){
    var li = document.createElement("LI");
    var t = document.createTextNode(videoList[current]);
    li.appendChild(t);
    listArea.appendChild(li);
    li.className = "entry";
  
    li.onclick = function(){
      let thisvideoID = videoList[current].slice(32);
      currentVid = current;
      console.log(current);
      startVideo();
      highlightActiveEntry()
    }
}

//// Button for adding new videos to playlist
user_add.onclick = function(){
  if(user_text.value.slice(0,32) === urlRequired || user_text.value.slice(0,-11) === "https://youtu.be/"){
    videoList.push(user_text.value.slice(-11));
    refresh(videoList.length - 1);
    user_text.value = "";
    
    if(currentVid === 1 && hasplayed === 0){  /////// checks if its the first time
      startVideo();
  }
}
  else {
    console.log("EE - Not a valid Youtube URL");  ///////report error if invalid

//// visually hints which video is currently playing
function highlightActiveEntry(){
  let activeEntry = document.getElementsByClassName("entry")[currentVid -1];
}


















/////////////borrowed youtube code






// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoList[0].slice(32),
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    player.setPlaybackRate(1);
    event.target.playVideo();
}
// when video ends, load next video

function onPlayerStateChange(event) {
    switch(event.data) {
        case YT.PlayerState.ENDED:
            currentVid = currentVid + 1;
            console.log(currentVid);
            startVideo()
            highlightActiveEntry()
            break;
        case YT.PlayerState.PLAYING:
            hasplayed = 1;
            break;
    }
}
