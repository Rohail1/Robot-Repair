#pragma strict
import UnityEngine.UI;

var textvar:Text;
textvar = GetComponent.<Text>();
textvar.material.color = Color.black;
var isPause : boolean = false;
var startTime : float;
var timeRemaining : float;
var percentage : float;
var clockBG : Texture2D;
var clockFG : Texture2D;
var clockFGMaxWidth : float;
var rightSide : Texture2D;
var leftSide : Texture2D;
var back : Texture2D;
var blocker : Texture2D;
var shiny : Texture2D;
var finished : Texture2D;
var pieClockX : int = 100;
var pieClockY : int = 50;
var pieClockWidth : int = 64;
var pieClockHeight : int = 64;
var pieClockHalfWidth : float = pieClockWidth*0.5;
var pieClockHalfHeight : float = pieClockHeight * 0.5;


function Start () {
	
	startTime = 120.0;
	clockFGMaxWidth = clockFG.width;
}

function Update () {
	
	if(!isPause)
	{
		DoCountDown();
		
	}

}

function OnGUI()
{
		var isHalfWayThere : boolean = percentage < 50;
		var clock: Rect = Rect(pieClockX,pieClockY,pieClockWidth,pieClockHeight);
		var rot : float = (percentage/100) * 360;
		var centerPoint : Vector2 = Vector2(pieClockX+pieClockHalfWidth,pieClockY+pieClockHalfHeight);
		var startMatrix : Matrix4x4 = GUI.matrix;
		GUI.DrawTexture(clock,back,ScaleMode.StretchToFill,true,0);
		if(isHalfWayThere)
		{
				GUIUtility.RotateAroundPivot(-rot-180,centerPoint);
				GUI.DrawTexture(clock,leftSide,ScaleMode.StretchToFill,true,0);
				GUI.matrix = startMatrix;
				GUI.DrawTexture(clock,blocker,ScaleMode.StretchToFill,true,0);		
		}
		else
		{
				GUIUtility.RotateAroundPivot(-rot,centerPoint);
				GUI.DrawTexture(clock,rightSide,ScaleMode.StretchToFill,true,0);
				GUI.matrix = startMatrix;
				GUI.DrawTexture(clock,leftSide,ScaleMode.StretchToFill,true,0);
		}
		if(percentage < 0)
		{
			GUI.DrawTexture(clock,finished,ScaleMode.StretchToFill,true,0);	
		}
		GUI.DrawTexture(clock,shiny,ScaleMode.StretchToFill,true,0);
		var newBarWidth : float = (percentage/100) * clockFGMaxWidth;
		var gap:int = 90;
		GUI.BeginGroup(Rect(Screen.width- clockBG.width - 20,90, clockBG.width, clockBG.height));
		GUI.DrawTexture(Rect(0,0, clockBG.width, clockBG.height),clockBG);
		GUI.BeginGroup(Rect(5,6,newBarWidth, clockFG.height ));
		GUI.DrawTexture(Rect(0,0, clockFG.width, clockFG.height), clockFG);
		GUI.EndGroup();
		GUI.EndGroup();
}

function DoCountDown()
{

			timeRemaining = startTime - Time.time;
			percentage = (timeRemaining / startTime)*100;
			if(timeRemaining < 0)
			{
				timeRemaining = 0;
				isPause = true;
				TimesUp();
			}
			ShowTime();
//			Debug.Log("Time Remaining : " + timeRemaining);
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
		var minutes : int;
		var seconds : int;
		var timeStr : String;
		minutes = timeRemaining/60;
		seconds = timeRemaining % 60;
		timeStr = minutes.ToString() + " : ";
		timeStr += seconds.ToString("D2");
		textvar.text = timeStr;
	
}
function TimesUp()
{

//			Debug.Log("Times Up");
}