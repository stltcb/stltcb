function grabLyrics() {
  
  var lines = [];
var verses = [];
var heading = '';
var song = {
    heading: '',
    initial: '',
    slides: []
};
var linesObj = {
    lines: []
};
var lst = document.getElementsByClassName('ui-tabs-panel ui-corner-bottom ui-widget-content')[0].innerText.split('\n\n');
for(var i=0; i<lst.length; i++) {
    var line = '"' + lst[i] + '"';
    lines.push(line.replace(/\n/g,'\\n'));
    const lines2 = lst[i].split('\n');
    const lns = { lines: [] };
    for(var j=0; j<lines2.length;j++) {
        const ln = lines2[j];
        if(ln.trim() != ''){
            lns.lines.push(ln);
            if (song.initial === '' && ln.indexOf('||') >= 0) {
              //song.initial = ln.substring(ln.indexOf('||'), ln.lastIndexOf('||'));
                song.initial = ln.split('||')[1];
            }
        }
    }
    if(i===0) {
        song.heading = lns.lines[0];
    }
    song.slides.push(lns);
}
  var textArea = document.createElement("textarea");
  textArea.value = lines.join(",\n");
  textArea.value = JSON.stringify(song);
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  alert(song.heading);
}
