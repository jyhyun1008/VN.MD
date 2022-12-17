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
var line1 = documnet.querySelector('#line1');
var line2 = documnet.querySelector('#line2');
var line3 = documnet.querySelector('#line3');

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

    var i = 0;

    var options;
    var title = [];
    var subtitle = [];

    var bgArray = [];
    var nameArray = [];
    var lineArray = [];
    var chrArray = [];
    var chrFacialArray = [];
    var chrEffectArray = []
    var bgmArray = [];
    var soundArray = [];

    //---
    md = md.replace(/[\-]{3}/g, 'i++;');

    //options
    md = md.replace(/^\s*\n\`\`\`/gm, 'options =');
    md = md.replace(/^\`\`\`\s*\n/gm, ';');

    //bgm
    md = md.replace(/[\`bgm\=]{1}([^\`]+)[\`]{1}/g, 'bgmArray[i] = "$1"');

    //sound
    md = md.replace(/[\`sound\=]{1}([^\`]+)[\`]{1}/g, 'soundArray[i] = "$1"');

    //bg
    md = md.replace(/[\`bg\=]{1}([^\`]+)[\`]{1}/g, 'bgArray[i] = "$1"');

    //name
    md = md.replace(/\n[\#]{3}(.+)/g, 'nameArray[i] = "$1";');

    //line1
    md = md.replace(/\n\>(.+)\n\>(.+)\n\>(.+)/gm, 'lineArray[i] = [`$1`, `$2`, `$3`];');
    md = md.replace(/\n\>(.+)\n\>(.+)/gm, 'lineArray[i] = [`$1`, `$2`];');
    md = md.replace(/\n\>(.+)/gm, 'lineArray[i] = [`$1`];');

    //character
    md = md.replace(/\`(.+)\;(.+)\;(.+)\`\s\`(.+)\;(.+)\;(.+)\`\s\`(.+)\;(.+)\;(.+)\`/gm, 'chrArray[i] = [options.chr.$1, options.chr.$4, options.chr.$7]; chrFacialArray[i] = [options.facial.$2, options.facial.$5, options.facial.$8]; chrEffectArray = [options.facial.$3, options.facial.$6, options.facial.$9];');
    md = md.replace(/\`(.+)\;(.+)\;(.+)\`\s\`(.+)\;(.+)\;(.+)\`/gm, 'chrArray[i] = [options.chr.$1, options.chr.$4]; chrFacialArray[i] = [options.facial.$2, options.facial.$5]; chrEffectArray = [options.facial.$3, options.facial.$6];');
    md = md.replace(/\`(.+)\;(.+)\;(.+)\`/gm, 'chrArray[i] = [options.chr.$1]; chrFacialArray[i] = [options.facial.$2]; chrEffectArray = [options.facial.$3];');

    //subtitle
    md = md.replace(/\n[\#]{2}(.+)/g, 'subtitle[i] = "$1";');

    //title
    md = md.replace(/\n[\#]{1}(.+)/g, 'title[i] = "$1";');

    return eval(md);
}