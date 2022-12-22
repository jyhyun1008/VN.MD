//----- 배경 이펙트 -----

function grayScale(){
  bg.style.filter = "grayscale(90%)";
  if ( document.querySelector('#chr0') ){ document.querySelector('#chr0').style.filter = "grayscale(90%)"; };
  if ( document.querySelector('#chr1') ){ document.querySelector('#chr1').style.filter = "grayscale(90%)"; };
  if ( document.querySelector('#chr2') ){ document.querySelector('#chr2').style.filter = "grayscale(90%)"; };
}

function blur(){
  bg.style.filter = "blur(5px)";
  if ( document.querySelector('#chr0') ){ document.querySelector('#chr0').style.filter = "blur(5px)"; };
  if ( document.querySelector('#chr1') ){ document.querySelector('#chr1').style.filter = "blur(5px)"; };
  if ( document.querySelector('#chr2') ){ document.querySelector('#chr2').style.filter = "blur(5px)"; };
}

function sepia(){
  bg.style.filter = "sepia(80%)";
  if ( document.querySelector('#chr0') ){ document.querySelector('#chr0').style.filter = "sepia(80%)"; };
  if ( document.querySelector('#chr1') ){ document.querySelector('#chr1').style.filter = "sepia(80%)"; };
  if ( document.querySelector('#chr2') ){ document.querySelector('#chr2').style.filter = "sepia(80%)"; };
}

function none(){
  bg.style.filter = "none";
  if ( document.querySelector('#chr0') ){ document.querySelector('#chr0').style.filter = "none"; };
  if ( document.querySelector('#chr1') ){ document.querySelector('#chr1').style.filter = "none"; };
  if ( document.querySelector('#chr2') ){ document.querySelector('#chr2').style.filter = "none"; };
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
  const startP = document.querySelector(chrId).offsetLeft;
  const endP = 50*vw - 200;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    document.querySelector(chrId).style.left = (startP + (endP - startP) * progress/500) + 'px';
    if (progress < 500) {
      window.requestAnimationFrame(step);
    } 
  }
  window.requestAnimationFrame(step);
}

function moveToRight(chrId){
  var start = null;
  const startP = document.querySelector(chrId).offsetLeft;
  const endP = 100*vw;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    document.querySelector(chrId).style.left = (startP + (endP - startP) * progress/500) + 'px';
    if (progress < 500) {
      window.requestAnimationFrame(step);
    } 
  }
  window.requestAnimationFrame(step);
}

function moveToleft(chrId){
  var start = null;
  const startP = document.querySelector(chrId).offsetLeft;
  const endP = -400;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    document.querySelector(chrId).style.left = (startP + (endP - startP) * progress/500) + 'px';
    if (progress < 500) {
      window.requestAnimationFrame(step);
    } 
  }
  window.requestAnimationFrame(step);
}

function passToRight(chrId){
  var start = null;
  const startP = -400;
  const endP = 100*vw;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    document.querySelector(chrId).style.left = (startP + (endP - startP) * progress/500) + 'px';
    if (progress < 500) {
      window.requestAnimationFrame(step);
    } 
  }
  window.requestAnimationFrame(step);
}

function passToLeft(chrId){
  var start = null;
  const startP = 100*vw;
  const endP = -400;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    document.querySelector(chrId).style.left = (startP + (endP - startP) * progress/500) + 'px';
    if (progress < 500) {
      window.requestAnimationFrame(step);
    } 
  }
  window.requestAnimationFrame(step);
}

  function jump(chrId){
    const startP = document.querySelector(chrId).offsetTop;
    var speed = 10;
    
    var g = 0;
    
    function step(timestamp) {
      document.querySelector(chrId).style.top = (document.querySelector(chrId).offsetTop - (speed - g)) + 'px';
      g++;
      if (document.querySelector(chrId).offsetTop < startP) {
        window.requestAnimationFrame(step);
      } else {
        document.querySelector(chrId).style.top = startP;
      }
    }
    window.requestAnimationFrame(step);
  }
  
  //

function chr_eff(chrId, effect){
  var Origin = {
    top: document.querySelector(chrId).offsetTop,
    left: document.querySelector(chrId).offsetLeft
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
