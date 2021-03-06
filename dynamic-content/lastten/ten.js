fetch('https://api.govorenefekt.bg/v1/episodes/last-ten')
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
  var mainContainer = document.getElementById("LastTen");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    var episode = `
    <table>
      <caption><a href="https://podcastalot.com/info/?podcast_id=${data[i].podcast_id}">${data[i].podcast_name}</caption>
      <tr>
        <td colspan = 3 style="text-align:center">${data[i].title}</td>
      </tr>
      <tr>
        <td style="text-align:center"><a href="${data[i].link}">Линк към епизода</a></td>
        <td style="text-align:center">${data[i].pubdate}</a></td>
        <td style="text-align:center">Време: ${data[i].duration}</td>
      </tr>
      <tr>
        <td colspan = 3>
          <iframe src="https://podcastalot.com/playa/${data[i].geid}" height="50px" width="100%" style="width: 1px; min-width: 100%;" frameborder="0" scrolling="no" loading="lazy"></iframe>
        </td>
      </tr>
    </table>
    `;
    div.innerHTML = episode;
    mainContainer.appendChild(div);
  }
}
