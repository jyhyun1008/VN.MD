//----- 배경 이펙트 -----

function grayScale(){
  bg.style.filter = "grayscale(90%)";
  if ( document.querySelector('#chr0') ){ document.querySelector('#chr0').style.filter = "grayscale(90%)"; }
  if ( document.querySelector('#chr1') ){ document.querySelector('#chr1').style.filter = "grayscale(90%)"; }
  if ( document.querySelector('#chr2') ){ document.querySelector('#chr2').style.filter = "grayscale(90%)"; }
}

function blur(){
  bg.style.filter = "blur(5px)";
  if ( document.querySelector('#chr0') ){ document.querySelector('#chr0').style.filter = "blur(5px)"; }
  if ( document.querySelector('#chr1') ){ document.querySelector('#chr1').style.filter = "blur(5px)"; }
  if ( document.querySelector('#chr2') ){ document.querySelector('#chr2').style.filter = "blur(5px)"; }
}

function sepia(){
  bg.style.filter = "sepia(80%)";
  if ( document.querySelector('#chr0') ){ document.querySelector('#chr0').style.filter = "sepia(80%)"; }
  if ( document.querySelector('#chr1') ){ document.querySelector('#chr1').style.filter = "sepia(80%)"; }
  if ( document.querySelector('#chr2') ){ document.querySelector('#chr2').style.filter = "sepia(80%)"; }
}

function none(){
  bg.style.filter = "none";
  if ( document.querySelector('#chr0') ){ document.querySelector('#chr0').style.filter = "none"; }
  if ( document.querySelector('#chr1') ){ document.querySelector('#chr1').style.filter = "none"; }
  if ( document.querySelector('#chr2') ){ document.querySelector('#chr2').style.filter = "none"; }
}

//

function effect(effectArray) {
  switch(effectArray) {
    case 'gray':
      grayScale();
      break;
    case 'blur':
      blur();
      break;
    case 'sepia':
      sepia();
      break;
    default:
      none();
  }
}

//----- 캐릭터 이펙트(주로 애니메이션) -----

function moveToCenter(chrId){
  var start = null;
  var startP = document.querySelector(chrId).style.left;
  var endP = 50*vw - 200;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    document.querySelector(chrId).style.left = (startP + (endP - startP) * progress/1000) + 'px';
    console.log(progress);
    if (progress < 1000) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

function moveToRight(chrId){
  var start = null;
  var startP = document.querySelector(chrId).style.left;
  var endP = 100*vw;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    document.querySelector(chrId).style.left = (startP + (endP - startP) * progress/1000) + 'px';
    if (progress < 1000) {
      window.requestAnimationFrame(step);
    } 
  }
  window.requestAnimationFrame(step);
}

function moveToleft(chrId){
  var start = null;
  var startP = document.querySelector(chrId).style.left;
  var endP = -400;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    document.querySelector(chrId).style.left = (startP + (endP - startP) * progress/1000) + 'px';
    if (progress < 1000) {
      window.requestAnimationFrame(step);
    } 
  }
  window.requestAnimationFrame(step);
}

function passToRight(chrId){
  var start = null;
  var startP = -400;
  var endP = 100*vw;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    document.querySelector(chrId).style.left = (startP + (endP - startP) * progress/1000) + 'px';
    if (progress < 1000) {
      window.requestAnimationFrame(step);
    } 
  }
  window.requestAnimationFrame(step);
}

function passToLeft(chrId){
  var start = null;
  var startP = 100*vw;
  var endP = -400;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    document.querySelector(chrId).style.left = (startP + (endP - startP) * progress/1000) + 'px';
    if (progress < 1000) {
      window.requestAnimationFrame(step);
    } 
  }
  window.requestAnimationFrame(step);
}

  function jump(chrId){
    var start = null;
    var startP = document.querySelector(chrId).style.top;
    var speed = 10;
    
    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      document.querySelector(chrId).style.top = (document.querySelector(chrId).style.top + (speed - g)) + 'px';
      g++;
      console.log(document.querySelector(chrId).style.top, progress, g);
      if (document.querySelector(chrId).style.top > startP) {
        window.requestAnimationFrame(step);
      } else {
        document.querySelector(chrId).style.top = startP;
      }
    }
    var g = 0;
    window.requestAnimationFrame(step);
  }
  
  //

function chr_eff(chrId, effect){
  var Origin = {
    top: document.querySelector(chrId).style.top,
    left: document.querySelector(chrId).style.left
  };
  switch(effect) {
    case 'moveToCenter':
      moveToCenter(chrId);
      break;
    case 'moveToLeft':
      moveToLeft(chrId);
      break;
    case 'moveToRight':
      moveToRight(chrId);
      break;
    case 'passToLeft':
      moveToLeft(chrId);
      break;
    case 'passToRight':
      moveToRight(chrId);
      break;
    case 'jump':
      jump(chrId);
      break;
    default:
      document.querySelector(chrId).style.top = Origin.top;
      document.querySelector(chrId).style.left = Origin.left;
  }
}
