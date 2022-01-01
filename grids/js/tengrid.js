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
      <div class="player">player</div>
      <div class="footer">powered by <a href="https://govorenefekt.com">govorenefekt.com</div>
    </div>
    `;
    div.innerHTML = episode;
    mainContainer.appendChild(div);
  }
}
