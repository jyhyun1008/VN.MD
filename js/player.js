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



if (!ep) {
    window.location.href = './';
} else {
    var url = "https://raw.githubusercontent.com/jyhyun1008/VN.MD/main/ep/"+ep+".md";
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        console.log(play(out));
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
    inputText = inputText.replace(/\`(.+)\;\s(.+)\;\s(.+)\`\s\`(.+)\;\s(.+)\;\s(.+)\`\s\`(.+)\;\s(.+)\;\s(.+)\`/gm, 'chrArray[i] = [options.chr.$1, options.chr.$4, options.chr.$7]; chrFacialArray[i] = [options.facial.$2, options.facial.$5, options.facial.$8]; chrEffectArray = [options.facial.$3, options.facial.$6, options.facial.$9];');
    inputText = inputText.replace(/\`(.+)\;\s(.+)\;\s(.+)\`\s\`(.+)\;\s(.+)\;\s(.+)\`/gm, 'chrArray[i] = [options.chr.$1, options.chr.$4]; chrFacialArray[i] = [options.facial.$2, options.facial.$5]; chrEffectArray = [options.facial.$3, options.facial.$6];');
    inputText = inputText.replace(/\`(.+)\;\s(.+)\;\s(.+)\`/gm, 'chrArray[i] = [options.chr.$1]; chrFacialArray[i] = [options.facial.$2]; chrEffectArray = [options.facial.$3];');

    //subtitle
    inputText = inputText.replace(/\n[\#]{2}(.+)/g, 'subtitle[i] = "$1";');

    //title
    inputText = inputText.replace(/\n[\#]{1}(.+)/g, 'title[i] = "$1";');

    //주석
    inputText = inputText.replace(/\n[\/]{2}(.+)/g, '');

    inputText = 'var i=0; var options; var title = []; var subtitle = []; var bgArray = []; var nameArray = []; var lineArray = []; var chrArray = []; var chrFacialArray = []; var chrEffectArray = [];var bgmArray = []; var soundArray = [];' + inputText

    return eval(inputText);
}