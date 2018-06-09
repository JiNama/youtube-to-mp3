const fs = require('fs');
const ytdl = require('ytdl-core');
var path = "";

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

    //ALL YTDL STUFF
    ytdl.getInfo(text, function(err, info) {
      if (err) throw err;
      title = info.title;
      ytdl(text, {
        quality: 'highestaudio',
        filter: 'audioonly'
      }).pipe(fs.createWriteStream(path + "/" + title + '.aac'));
      var song = ytdl(text);
      song.on('progress', (chunk, downloaded, downloadlength) => {
        console.log(downloaded / downloadlength);
      });
      song.on('end', () => {
        console.log('done');
      });
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

function clicked() {
  document.getElementById('set').style.animation = 'settingsslide 1s';
  document.getElementById('blur').style.animation = 'bluring 1s';
  setTimeout(() => {
    document.getElementById('set').style.left = '60%';
    document.getElementById('blur').style.filter = 'blur(3px)';
  }, 900);
  document.getElementById('downloadInputBox').value = path;
}

function closeitboi() {
  document.getElementById('set').style.animation = 'settingsslideback 1s';
  document.getElementById('blur').style.animation = 'bluringback 1s';
  setTimeout(() => {
    document.getElementById('set').style.left = '100%';
    document.getElementById('blur').style.filter = 'blur(0px)';
  }, 900);
}

window.onload = function() {
  document.getElementById('musicUploader').addEventListener('change', function(e) {
    if (this.value != '') {
      e.preventDefault();
      e.stopPropagation();
      path = this.files[0].path;
      document.getElementById('downloadInputBox').value = this.files[0].path;
      var dl = fs.createWriteStream('downloadlocation.txt');
      dl.write(path);
    }
  });
  fs.readFile('downloadlocation.txt', 'utf8', (err, data) => {
    if (err) throw err;
    if (data == '' || data == null) {
      path = __dirname + "\\downloads";
    } else {
      path = data;
    }
  })
}