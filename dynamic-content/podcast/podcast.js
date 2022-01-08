var podcast_id = getParameterByName('podcast_id')
fetch("https://api.govorenefekt.bg/v1/podcasts/" + podcast_id)
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
  var page_title = "Визитка: "+ data[0].title
  document.title = page_title
  date = data[0].first_release[0]
  console.log(date.toLocaleString('bg-BG'))
  var mainContainer = document.getElementById("LastTen");
    var div = document.createElement("div");
    if (data[0].rssfeed) {
      var rssfeed = `<a href="${data[0].rssfeed}">RSS feed</a></td>`
    } else {
      var rssfeed = "Няма данни за RSS feed</td>"
    }
    if (data[0].website) {
      if (data[0].website.indexOf("http://") == 0 || data[0].website.indexOf("https://") == 0) {
        var website = `<a href="${data[0].website}">Уебсайт</a></td>`
      }
      else{
        var website = `<a href="http://${data[0].website}">Уебсайт</a></td>`
      }

    } else {
      var website = "Няма данни за Уебсайт</td>"
    }
    if (data[0].cover) {
      var cover = `<img src="https://podcastalot.com/covers/${podcast_id}.jpg"></td>`
    } else {
      var cover = "Няма данни за обложка</td>"
    }
    var episode = `
    <table>
      <caption>${data[0].title}</caption>
      <tr>
        <td colspan = 3 style="text-align:center">${data[0].description||"Няма данни за описание"}</td>
      </tr>
      <tr>
        <td style="text-align:center">Категория: ${data[0].category||"Няма данни"}</td>
        <td style="text-align:center">${website}
        <td style="text-align:center">${rssfeed}
      </tr>
      <tr>
      <tr>
        <td style="text-align:center">Първи епизод: ${data[0].first_release[0].toLocaleString('bg-BG')||"Няма данни"}</td>
        <td style="text-align:center">Брой епизоди: ${data[0].episodes_count||"Няма данни"}</td>
        <td style="text-align:center">Последен епизод: ${data[0].last_release[0].toLocaleString('bg-BG')||"Няма данни"}</td>
      </tr>
      <tr>
        <td colspan = 3 style="text-align:center">${cover}
      </tr>
    </table>
    `;
    div.innerHTML = episode;
    mainContainer.appendChild(div);
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
