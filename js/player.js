function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}
  
var qs = getQueryStringObject();
var ep = qs.ep;

var bg = document.querySelector('body');
var title = document.querySelector('#title');
var mainTitle = document.querySelector('#mainTitle');
var subTitle = document.querySelector('#subTitle');

var chr = document.querySelector('#chr');
var lineBox = document.querySelector('#lineBox');
var name = document.querySelector('#name');

var line = document.querySelector('#line');
var line1 = document.querySelector('#line1');
var line2 = document.querySelector('#line2');
var line3 = document.querySelector('#line3');

var prev = document.querySelector('#prev');
var next = document.querySelector('#next');
var mute = document.querySelector('#mute');
var raw = document.querySelector('#raw');

var vh = window.innerHeight * 0.01;
var vw = window.innerWidth *0.01;

if (!ep) {
    window.location.href = './';
} else {
    var url = "https://raw.githubusercontent.com/jyhyun1008/VN.MD/main/ep/"+ep+".md";
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        code = play(out);
        console.log(code);
        eval(code);
    })
    .catch(err => { throw err });
}

function play(inputText){

    //---
    inputText = inputText.replace(/[\-]{3}/g, 'i++;');

    //options
    inputText = inputText.replace(/^\s*\n\`\`\`/gm, 'options =');
    inputText = inputText.replace(/^\`\`\`\s*\n/gm, ';');

    //bgm
    inputText = inputText.replace(/\`bgm\=([^\`]+)[\`]{1}/g, 'bgmArray[i] = "$1";');

    //sound
    inputText = inputText.replace(/\`sound\=([^\`]+)[\`]{1}/g, 'soundArray[i] = "$1";');

    //bg
    inputText = inputText.replace(/\`bg\=([^\`]+)[\`]{1}/g, 'bgArray[i] = "$1";');

    //name
    inputText = inputText.replace(/\n[\#]{3}(.+)/g, 'nameArray[i] = "$1";');

    //line1
    inputText = inputText.replace(/\n\>(.+)\n\>(.+)\n\>(.+)/gm, 'lineArray[i] = [`$1`, `$2`, `$3`];');
    inputText = inputText.replace(/\n\>(.+)\n\>(.+)/gm, 'lineArray[i] = [`$1`, `$2`];');
    inputText = inputText.replace(/\n\>(.+)/gm, 'lineArray[i] = [`$1`];');

    //character
    inputText = inputText.replace(/\`(.+)\;\s(.+)\;\s(.+)\`\s\`(.+)\;\s(.+)\;\s(.+)\`/gm, 'chrArray[i] = [options.chr.$1, options.chr.$4]; chrFacialArray[i] = [options.facial.$2, options.facial.$5]; chrEffectArray = [options.facial.$3, options.facial.$6];');
    inputText = inputText.replace(/\`(.+)\;\s(.+)\;\s(.+)\`/gm, 'chrArray[i] = [options.chr.$1]; chrFacialArray[i] = [options.facial.$2]; chrEffectArray = [options.facial.$3];');

    //subtitle
    inputText = inputText.replace(/\n[\#]{2}(.+)/g, 'subtitleArray[i] = "$1";');

    //title
    inputText = inputText.replace(/\n[\#]{1}(.+)/g, 'titleArray[i] = "$1";');

    //주석
    inputText = inputText.replace(/\n[\/]{2}(.+)/g, '');

    inputText = 'var i=0; var options; var titleArray = []; var subtitleArray = []; var bgArray = []; var nameArray = []; var lineArray = []; var chrArray = []; var chrFacialArray = []; var chrEffectArray = [];var bgmArray = []; var soundArray = [];' + inputText + ''

    inputText += 'j = 0;'+
                'function pageLoad(j) {'+
                    'if (bgArray[j]) {'+
                        'bg.style.backgroundImage = url(bgArray[j]);'+
                    '}'+
                    //bgm, sound
                    //TITLE
                    'if (titleArray[i]){'+
                        'title.style.display = "block"; chr.style.display = "none"; lineBox.style.display = "none"; mainTitle.innerHTML = titleArray[i]; subTitle.innerHTML = subtitleArray[i];'+
                    '} else {' +
                        'title.style.display = "none"; lineBox.style.display = "block";'+
                    '}'+
                    //PLACE
                    'if (!lineArray[j] && !chrArray[j]) {'+
                        'name.innerHTML = nameArray[j]; chr.style.display = "none"; line.style.display = "none"; name.style.top = 380 - 50*vh; name.style.left = 150;'+
                    //LINE
                    '} if (chrArray[j]) {'+
                        'chr.style.display = "block";'+
                        'if (chrArray[j].length == 1) {'+
                            'chr.innerHTML = "<img src=`./assets/chr/"+chrArray[j][0]+"/"+chrFacialArray[j][0]+".png` id=`chr0`>";'
                        '} else if (chrArray[j].length == 1) {'+
                            'chr.innerHTML = "<img src=`./assets/chr/"+chrArray[j][0]+"/"+chrFacialArray[j][0]+".png` id=`chr1`><img src=`./assets/chr/"+chrArray[j][1]+"/"+chrFacialArray[j][1]+".png` id=`chr2`>";'+
                        '}'+
                    '} if (lineArray[j]) {'+
                        'line.style.display = "block";  name.style.top = 0; name.style.left = 50; line1.innerHTML = lineArray[j][0]; line2.innerHTML = lineArray[j][1]; line3.innerHTML = lineArray[j][2];'+
                    '}'+
                '} '+
                'pageLoad(j);'+
                'next.addEventListener("click", function(){j++; pageLoad(j);})'+
                ''

    return inputText;
}
