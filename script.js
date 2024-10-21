let isColor1 = true;

document.getElementById('buttonColor').addEventListener('click', function()
{
	if (isColor1)
	{
		document.body.style.backgroundColor = 'red';
	}
	else
	{
		document.body.style.backgroundColor = 'white';
	}
	isColor1 = !isColor1;
	alert("Has cambiado el color de la web");
});