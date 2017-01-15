var flag = 0;
function progressBar()
{
  var pbar= document.getElementById("progress1");
  console.log(pbar);
  pbar.value += 1;
  if (pbar.value == 100){flag = 1;}
  pbar.getElementsByTagName('span')[0].innerHTML = pbar.value+10;
  console.log(pbar.value);
}
//document.addEventListener("loadstart",progressBar,false);
var interval = setInterval(function(){
  progressBar();
  if (flag == 1)
  {
    clearInterval(interval);
  }
},50);
