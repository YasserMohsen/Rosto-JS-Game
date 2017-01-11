function moveElement(e)
{
	var newx=e.clientX;
	console.log(newx)

	if (newx >271 && newx < 964)
	{
		pic.style.left=e.clientX+"px";
	}
	

}
var pic= document.getElementById("img3");
document.addEventListener("mousemove", moveElement, false);