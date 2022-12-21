
function grayScale(){
  bg.style.filter = "grayscale(90%)";
  document.querySelector('#chr0').style.filter = "grayscale(90%)";
  document.querySelector('#chr1').style.filter = "grayscale(90%)";
  document.querySelector('#chr2').style.filter = "grayscale(90%)";
}

function blur(){
  bg.style.filter = "blur(5px)";
  document.querySelector('#chr0').style.filter = "blur(5px)";
  document.querySelector('#chr1').style.filter = "blur(5px)";
  document.querySelector('#chr2').style.filter = "blur(5px)";
}

function sepia(){
  bg.style.filter = "sepia(80%)";
  document.querySelector('#chr0').style.filter = "sepia(80%)";
  document.querySelector('#chr1').style.filter = "sepia(80%)";
  document.querySelector('#chr2').style.filter = "sepia(80%)";
}

function none(){
  bg.style.filter = "none";
  document.querySelector('#chr0').style.filter = "none";
  document.querySelector('#chr1').style.filter = "none";
  document.querySelector('#chr2').style.filter = "none";
}
