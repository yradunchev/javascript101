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
      <caption>${data[i].podcast_name}</caption>
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
          <audio controls style="width: 100%;">
            <source src="${data[i].audio}" type="audio/mpeg">
            Вашuият браузър неподдържа audio елемент. <a href="${data[i].audio}">Кликнете тук за да чуете епизода</a>
          </audio>
        </td>
      </tr>
    </table>
    `;
    div.innerHTML = episode;
    mainContainer.appendChild(div);
  }
}
