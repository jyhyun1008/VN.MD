
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

if (ep) {
    
    document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" media="screen" href="./css/player.css">';

    var content = document.querySelector('.content');
    content.innerHTML = `<div id="player"><div id="title"><div id="mainTitle"></div><div id="subTitle"></div></div><div id="chr"></div><div id="lineBox"><div id="name" class="name">이름</div><div id="line"><div class="line" id="line1"></div><div class="line" id="line2"></div><div class="line" id="line3"></div></div></div><div id="controller"><div id="prev"><i class="bx bxs-chevron-left" ></i></div><div id="next"><i class='bx bxs-chevron-right' ></i></div><div id="mute"><i class='bx bxs-volume-mute' ></i></div><div id="raw"><i class="bx bx-clipboard" ></i></div></div></div>`;

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

    var url = "https://raw.githubusercontent.com/"+user+"/"+repo+"/main/ep/"+ep+".md";
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        var i=0; 
        var options; 
        var titleArray = []; 
        var subtitleArray = []; 
        var bgArray = []; 
        var bgmArray = [];
        var soundArray = []; 
        var effectArray = []; 
        var nameArray = []; 
        var lineArray = []; 
        var chrArray = []; 
        var chrFacialArray = []; 
        var chrEffectArray = [];

        code = play(out);
        console.log(code);
        eval(code);
        
        j = 0;
        function pageLoad(j, formerj) {
            var bgm = []; 
            var bg = document.querySelector("body"); 
            var name = document.querySelector("#name"); 
            var title = document.querySelector("#title"); 
            var mainTitle = document.querySelector("#mainTitle"); 
            var subTitle = document.querySelector("#subTitle"); 
            var chr = document.querySelector("#chr"); 
            var lineBox = document.querySelector("#lineBox");
            if (bgArray[j]) {
                bg.style.backgroundImage = "url(./assets/bg/"+bgArray[j]+".png)";
            } else {
                bg.style.backgroundImage = "none";
            }
            if (effectArray[j] && effectArray[j] != effectArray[formerj]) {
                effect(effectArray[j]);
            } else {
                none();
            }
            //bgm, sound
            if (bgmArray[j] && bgmArray[j] != bgmArray[formerj]) {
                bgmArray[formerj].pause(); bgmArray[j].play();
            } else if (!bgmArray[j]) {
                bgmArray[j] = new Audio(); bgmArray[formerj].pause();
            } if (soundArray[j]) {
                soundArray[j].loop = false; soundArray[j].play();
            }
            //TITLE
            if (titleArray[j]){
                title.style.display = "flex"; chr.style.display = "none"; lineBox.style.display = "none"; name.style.display = "none"; 
                mainTitle.innerHTML = titleArray[j]; subTitle.innerHTML = subtitleArray[j];
            } else {
                title.style.display = "none"; lineBox.style.display = "block";  name.style.display = "block";
                //PLACE
                if (!lineArray[j] && !chrArray[j]) {
                    name.innerHTML = nameArray[j]; 
                    chr.style.display = "none"; line.style.display = "none"; name.classList.remove("name"); name.classList.add("place");
                //LINE
                } if (chrArray[j]) {
                    chr.style.display = "block";
                    if (chrArray[j].length == 1) {
                        chr.innerHTML = "<img src=./assets/chr/"+chrArray[j][0]+"/"+chrFacialArray[j][0]+".png id=chr0>";
                        chr_eff('#chr0', chrEffectArray[j][0]);
                    } else if (chrArray[j].length == 2) {
                        chr.innerHTML = "<img src=./assets/chr/"+chrArray[j][0]+"/"+chrFacialArray[j][0]+".png id=chr1><img src=./assets/chr/"+chrArray[j][1]+"/"+chrFacialArray[j][1]+".png id=chr2>";
                        chr_eff('#chr1', chrEffectArray[j][0]);
                        chr_eff('#chr2', chrEffectArray[j][1]);
                    }
                } if (lineArray[j]) {
                    line.style.display = "block"; 
                    name.classList.add("name"); 
                    name.classList.remove("place"); 
                    name.innerHTML = nameArray[j]; 
                    line1.innerHTML = ""; line2.innerHTML = ""; line3.innerHTML = ""; 
                    setTimeout(() => {typeLine(lineArray[j][0], lineArray[j][1], lineArray[j][2]);}, 0);
                }
            }
        } 
        pageLoad(j, 0);
        
        raw.addEventListener("click", function(){ window.location.href = './md.html?ep='+ep;});

        document.documentElement.style.setProperty('--theme', `${options.theme}`);

        var typingBool = false;
        var confirm1 = false;

        this.document.body.addEventListener("keydown", function(event){
            switch(event.keyCode){
                case 37: //좌
                if (j > 0){
                    if (typingBool == false) {
                        j--;
                        pageLoad(j, j+1);
                    }
                }
                    break;
                case 38: //상
                if (j > 0){
                    if (typingBool == false) {
                        j--;
                        pageLoad(j, j+1);
                    }
                }
                    break;
                case 39: //우
                if (j < i){
                    if (typingBool == false) { //텍스트 로딩 후 버튼 눌렸을 때
                        confirm1 = false;
                        j++;
                        pageLoad(j, j-1);
                    } else {
                        confirm1 = true;
                    }
                }
                    break;
                case 40: //하
                if (j < i){
                    if (typingBool == false) { //텍스트 로딩 후 버튼 눌렸을 때
                        confirm1 = false;
                        j++;
                        pageLoad(j, j-1);
                    } else {
                        confirm1 = true;
                    }
                }
                    break;
                case 13: //엔터
                if (j < i){
                    if (typingBool == false) { //텍스트 로딩 후 버튼 눌렸을 때
                        confirm1 = false;
                        j++;
                        pageLoad(j, j-1);
                    } else {
                        confirm1 = true;
                    }
                }
                    break;
            }
        });

        next.addEventListener('click', (event) => {
            if (j < i){
                if (typingBool == false) { //텍스트 로딩 후 버튼 눌렸을 때
                    confirm1 = false;
                    j++;
                    pageLoad(j, j-1);
                } else {
                    confirm1 = true;
                }
            }
        });

        prev.addEventListener('click', (event) => {
            if (j > 0){
                if (typingBool == false) {
                    j--;
                    pageLoad(j, j+1);
                }
            }
        });
        
        function typeLine(l1, l2, l3){

            typingBool = true;
            var typingBool1 = true;
            var typingBool2 = false;
            var typingBool3 = false;
            var typingIdx=0; 
            
            line1Split=l1.split(""); // 한글자씩 자른다. 
            line2Split=l2.split("");
            line3Split=l3.split("");

            if(typingBool1==true){ 
                // 타이핑이 진행되지 않았다면 
                typingBool1=false;     
                line1.innerHTML = '';
                var tyInt1 = setInterval(typing1,50); // 반복동작 
            } 
                
            function typing1(){ 
                if(typingIdx<line1Split.length && typingIdx > -1){ 
                    // 타이핑될 텍스트 길이만큼 반복 
                    line1.innerHTML+=line1Split[typingIdx];
                    // 한글자씩 이어준다. 
                    typingIdx++; 
                    next.addEventListener('click', (event) => {
                            typingIdx = -1;
                            line1.innerHTML = l1;
                            if (line2Split[0] !== '') {
                                line2.innerHTML = l2;
                                if (line3Split[0] !== '') {
                                    line3.innerHTML = l3;
                                }
                            }
                    });
                } else if(typingIdx >= line1Split.length){ 
                    //끝나면 반복종료 
                    typingBool2=true;
                    typingIdx=0;
                    clearInterval(tyInt1); 
                    typeLine2(line2Split);
                } else {
                    clearInterval(tyInt1); 
                    typingIdx=0;
                    typingBool = false;
                }
            }  

            function typeLine2(line2Split){
                if(typingBool2==true){ 
                    // 타이핑이 진행되지 않았다면 
                    typingBool2=false;     
                    var tyInt2 = setInterval(typing2,50); // 반복동작 
                } 
                    
                function typing2(){ 
                    if(typingIdx <line2Split.length && typingIdx > -1){ 
                        // 타이핑될 텍스트 길이만큼 반복 
                        line2.innerHTML+=line2Split[typingIdx];
                        // 한글자씩 이어준다. 
                        typingIdx++; 
                        next.addEventListener('click', (event) => {
                                typingIdx = -1;
                                line2.innerHTML = l2;
                                if (line3Split[0] !== '') {
                                    line3.innerHTML = l3;
                                }
                        });
                    } else if(typingIdx >= line2Split.length){ 
                        //끝나면 반복종료 
                        typingBool3=true;
                        typingIdx=0;
                        clearInterval(tyInt2); 
                        typeLine3(line3Split);
                    } else {
                        clearInterval(tyInt2); 
                        typingIdx=0;
                        typingBool = false;
                    }
                }  
            }

            function typeLine3(line3Split){
                if(typingBool3==true){ 
                    // 타이핑이 진행되지 않았다면 
                    typingBool3=false;
                    var tyInt3 = setInterval(typing3,50); // 반복동작 
                } 
                    
                function typing3(){ 
                    if(typingIdx<line3Split.length){ 
                        // 타이핑될 텍스트 길이만큼 반복 
                        line3.innerHTML+=line3Split[typingIdx];
                        // 한글자씩 이어준다. 
                        typingIdx++; 
                        next.addEventListener('click', (event) => {
                                typingIdx = -1;
                                line3.innerHTML = l3;
                        });
                    } else{ 
                        //끝나면 반복종료 
                        clearInterval(tyInt3);
                        typingBool = false;
                        typingIdx=0;
                    } 
                }  
            }

        };
    })
    .catch(err => { throw err });

}

function play(inputText){

    //아무것도 아닌것
    inputText = inputText.replace(/\n[^(\`|\*\s|\d\.\s|\#|\<|\>|\-)](.+)\n/g, '\n\n');

    //---
    inputText = inputText.replace(/[\-]{3}/g, 'i++;');

    //options
    inputText = inputText.replace(/^\s*\n\`\`\`/gm, 'options =');
    inputText = inputText.replace(/^\`\`\`\s*\n/gm, ';');

    //bgm
    inputText = inputText.replace(/\`bgm\=([^\`]+)[\`]{1}/g, 'bgmArray[i] = new Audio("./assets/bgm/$1.mp3");');
    inputText = inputText.replace(/\<\!\-\-bgm\-\-\>/g, 'bgmArray[i] = bgmArray[i-1];');

    //sound
    inputText = inputText.replace(/\`sound\=([^\`]+)[\`]{1}/g, 'soundArray[i] = new Audio("./assets/sound/$1.mp3");');

    //bg
    inputText = inputText.replace(/\`bg\=([^\`]+)[\`]{1}/g, 'bgArray[i] = "$1";');
    inputText = inputText.replace(/\<\!\-\-bg\-\-\>/g, 'bgArray[i] = bgArray[i-1];');
    
    //effect
    inputText = inputText.replace(/\`eff\=([^\`]+)[\`]{1}/g, 'effectArray[i] = "$1";');
    inputText = inputText.replace(/\<\!\-\-eff\-\-\>/g, 'effectArray[i] = effectArray[i-1];');

    //name
    inputText = inputText.replace(/\n[\#]{3}(.+)/g, 'nameArray[i] = "$1";');

    //line1
    inputText = inputText.replace(/\n\>(.+)\n\n\>(.+)\n\n\>(.+)/gm, 'lineArray[i] = [`$1`, `$2`, `$3`];');
    inputText = inputText.replace(/\n\>(.+)\n\n\>(.+)/gm, 'lineArray[i] = [`$1`, `$2`, ``];');
    inputText = inputText.replace(/\n\>(.+)/gm, 'lineArray[i] = [`$1`, ``, ``];');

    //character
    inputText = inputText.replace(/\`(.+)\;\s(.+)\;\s(.+)\`\s\`(.+)\;\s(.+)\;\s(.+)\`/gm, 'chrArray[i] = [options.chr.$1, options.chr.$4]; chrFacialArray[i] = [options.facial.$2, options.facial.$5]; chrEffectArray[i] = [options.effect.$3, options.effect.$6];');
    inputText = inputText.replace(/\`(.+)\;\s(.+)\;\s(.+)\`/gm, 'chrArray[i] = [options.chr.$1]; chrFacialArray[i] = [options.facial.$2]; chrEffectArray[i] = [options.effect.$3];');
    inputText = inputText.replace(/\<\!\-\-chr\-\-\>/g, 'chrArray[i] = chrArray[i-1]; chrFacialArray[i] = chrFacialArray[i-1]; chrEffectArray[i] = chrEffectArray[i-1];');

    //subtitle
    inputText = inputText.replace(/\n[\#]{2}(.+)/g, 'subtitleArray[i] = "$1";');

    //title
    inputText = inputText.replace(/\n[\#]{1}(.+)/g, 'titleArray[i] = "$1";');

    //주석
    inputText = inputText.replace(/\n[\/]{2}(.+)/g, '');

    return inputText;
}
