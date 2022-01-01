function createAudioPlayer() {
  var audioPlayer;
  var trackList;
  var trackListLen;
  var currentTrack = 0;
  var informationDiv;
  var progressbar;
  var progressbarWidth;
  var progressmeter;

  return {
    init: init,
  };

  function toggle() {
    if (audioPlayer.duration > 0 && !audioPlayer.paused) {
       audioPlayer.pause();
    } else {
       audioPlayer.play();
    }
  }

  function stop() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

  function seeking(e) {
    var percent = e.offsetX / progressbarWidth;
    audioPlayer.currentTime = percent * audioPlayer.duration;
  }

  function displayTime(seconds) {
    var minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds - minutes * 60);
    return minutes+":"+seconds;
  }

  function updateTime() {
        informationDiv.innerHTML = displayTime(audioPlayer.currentTime) + ' / '
         + displayTime(audioPlayer.duration);
    var percent = audioPlayer.currentTime / audioPlayer.duration;
    progressmeter.style.width = (percent * progressbarWidth) + 'px';
  }

  function playCurrentTrack() {
    audioPlayer.pause();
    audioPlayer.src = trackList[currentTrack].src;
    audioPlayer.load();
    audioPlayer.play();
    updateTime();
  }

  function init(playerElement) {
    trackList = JSON.parse(playerElement.textContent);
    trackListLen = trackList.length;
    audioPlayer = new Audio();

    audioPlayer.addEventListener('timeupdate', function() {
      updateTime();
    });
    audioPlayer.addEventListener('loadedmetadata', function() {
      updateTime();
    });
    audioPlayer.addEventListener('pause', function() {
      toggleButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"> </i>';
    });
    audioPlayer.addEventListener('playing', function() {
      toggleButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"> </i>';
    });

    audioPlayer.src = trackList[currentTrack].src;

    var stopButton = document.createElement('button');
    stopButton.innerHTML = '<i class="fa fa-stop" aria-hidden="true"> </i>';
    stopButton.ariaLabel = 'Stop';
    stopButton.className = 'controls';
    stopButton.onclick = stop;

    var toggleButton = document.createElement('button');
    toggleButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"> </i>';
    toggleButton.ariaLabel = 'Toggle';
    toggleButton.className = 'controls';
    toggleButton.onclick = toggle;

    var speedRate = document.createElement('select');
    speedRate.className = 'controls';
    var array = ["0.50","0.75","1.00","1.25","1.50","1.75","2.00","2.25","2.50","2.75","3.00"];
    for (var i = 0; i < array.length; i++) {
      var option = document.createElement("option");
      option.value = array[i];
      option.text = array[i] + 'x';
      speedRate.value = "1.00"
      speedRate.appendChild(option);
    }
    speedRate.addEventListener('change', function() {
      var x = speedRate.selectedIndex;
      audioPlayer.playbackRate = document.getElementsByTagName("option")[x].value;
    })

    var episodeCover = document.createElement('div');
    episodeCover.className = "audio-player-cover";
    episodeCover.style.backgroundImage = 'url('+trackList[currentTrack].cover+')';

    var breakRow = document.createElement('div');
    breakRow.className = 'break';

    informationDiv = document.createElement('div');
    informationDiv.className = 'audio-player-info';

    progressbar = document.createElement('div');
    progressbar.className = 'audio-player-progressbar';
    progressbar.addEventListener('click', seeking);
    progressmeter = document.createElement('div');
    progressmeter.className = 'audio-player-progressmeter';
    progressbar.append(progressmeter);

    playerElement.innerHTML = '';
    playerElement.append(toggleButton);
    playerElement.append(stopButton);
    playerElement.append(progressbar);
    playerElement.append(speedRate);
    playerElement.append(informationDiv);
    progressbarWidth = progressbar.offsetWidth;
  }
}

fetch('https://api.govorenefekt.bg/v1/episodes/random-pod')
.then(function (response) {
  return response.json();
})
.then(function (data) {
  appendData(data);
})
.catch(function (err) {
  console.log('error: ' + err);
});
function appendData(data) {
  var mainContainer = document.getElementById("player");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    var episode = `
    <div class="wrapper">
      <div class="cover" style="background-image: url('${data[i].image}');"></div>
      <div class="podtitle">${data[i].podcast_name}: ${data[i].title}</div>
      <div class="player">
        <div class="audio-player">
          [
            {
              "title": "${data[i].title}",
              "src": "${data[i].audio}"
            }
          ]
        </div>
      </div>
      <div class="footer">powered by <a href="https://govorenefekt.com">govorenefekt.com</div>
    </div>
    `;
    div.innerHTML = episode;
    mainContainer.appendChild(div);
    var audioPlayers = document.querySelectorAll('.audio-player');
    for(var i=0; i<audioPlayers.length; i++) {
      var player = createAudioPlayer();
      player.init(audioPlayers[i]);
    }
  }
}
