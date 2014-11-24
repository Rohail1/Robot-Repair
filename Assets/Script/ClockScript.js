#pragma strict
import UnityEngine.UI;

var textvar:Text;
textvar = GetComponent.<Text>();
textvar.material.color = Color.black;
var isPause : boolean = false;
var startTime : float;
var timeRemaining : float;

function Start () {

	startTime = 5.0;

}

function Update () {
	
	if(isPause)
	{
		DoCountDown();
		
	}

}

function DoCountDown()
{

	

}

function PauseClock()
{

	isPause = true;
}

function UnPauseClock()
{
	isPause = false;

}

function ShowTime()
{

	
}
function TimesUp()
{

	

}