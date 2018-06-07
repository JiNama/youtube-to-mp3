const fs = require('fs');
const ytdl = require('ytdl-core');

function emptyPlaceholder() {
  document.getElementById('textbox').placeholder = "";
}

function bringitbackYo() {
  document.getElementById('textbox').placeholder = "https://www.youtube.com/watch?v=wxPe2X0rx5Y";
}

function convert() {
  var text = document.getElementById('textbox').value;
  if (text == null || text == "") {
    alert('You must enter a valid YouTube link.');
  } else if (validateYouTubeUrl(text) == false) {
    alert('You must enter a valid YouTube link.');
  } else {
    var title = "";
    ytdl.getInfo(text, function(err, info) {
      if (err) throw err;
      title = info.title;
      ytdl(text, {
        quality: 'highestaudio',
        filter: 'audioonly'
      }).pipe(fs.createWriteStream(title + '.mp3'));
    });
  }
}

//Function credit to Manik Arora (https://stackoverflow.com/questions/28735459/how-to-validate-youtube-url-in-client-side-in-text-box)
function validateYouTubeUrl(inputURL) {
  var url = inputURL;
  if (url != undefined || url != '') {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return true;
    } else {
      return false;
    }
  }
}