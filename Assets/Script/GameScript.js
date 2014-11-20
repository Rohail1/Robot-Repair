

var cols : int = 4; // no of cols
var rows : int = 4; // no of rows
var totalCards : int = cols*rows; //total cards
var matchesNeededToWin :int = totalCards*0.5; //matches needed to win must be equal to half of the cards
var matchesMade:int = 0; // initially zero
var cardW : int = 100; // card width
var cardH : int = 100; // card height
var aCards: Array; // we will store all the cards in the array
var aGrids: Array; // array to make up a grid
var aCardFlipped : ArrayList; //all the cards flipped must be in arraylist
var playerCanClick : boolean; // we will use this boolean flag to controls players clicks..
var playerHasWon : boolean = false; //initial status 


function Start () {
		
		playerCanClick = true;
		aCards = new Array();
		aGrids = new Array();
		aCardFlipped = new ArrayList();
		BuildDeck();
		for(var i = 0;i<rows;i++)
		{
			aGrids[i] = new Array();
			for(var j = 0;j<cols;j++)
			{
				var someNum : int = Random.Range(0, aCards.length);
				aGrids[i][j] = aCards[someNum];
				aCards.RemoveAt(someNum);
			}
		}
		
}

var CustomSkin :GUISkin;

function OnGUI () {
	
		GUILayout.BeginArea(Rect(0,0,Screen.width,Screen.height));
		GUILayout.BeginHorizontal();
		BuildGrid();
		GUILayout.EndHorizontal();
		if(playerHasWon)
		{
			BuildWinPrompt();
		}
		GUILayout.EndArea();
		
}

function BuildGrid()
{
		
		GUILayout.BeginVertical();
		GUILayout.FlexibleSpace();
		for(var i =0;i<rows;i++)
		{
			GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
			for(var j = 0;j<cols;j++)
			{
			
				var card : Object = aGrids[i][j];
				var img : String;
				if(card.isMatched)
				{
					img = "blank";
				}
				else
				{		
					if(card.isFaceUp)
					{
						img = card.img;
						
					}
					else
					{
						img = "wrench";
					}
				}
				GUI.enabled = !card.isMatched;
				if(GUILayout.Button(Resources.Load(img),GUILayout.Width(cardW)))
				{
						if(playerCanClick)
						{
						FlipCardFaceUp(card);
						}
						GUI.enabled = true;
						
				}
				
			}
			GUILayout.FlexibleSpace();
			GUILayout.EndHorizontal();
		}
		GUILayout.FlexibleSpace();
		GUILayout.EndVertical();
}

function BuildDeck()
{

		var totalRobots : int = 4;
		var card: Object;
		var Id : int = 0;
		for(var i = 0;i<totalRobots;i++)
		{
			var aRobotParts : Array = ["Head","Arm","Leg"];
			for(var j=0;j<2;j++)
			{
				var someNum : int = Random.Range(0,aRobotParts.length);
				var missingParts : String = aRobotParts[someNum];
				aRobotParts.RemoveAt(someNum);
				card = new Card("robot"+(i+1)+"Missing"+missingParts,Id);
				aCards.Add(card);
				card = new Card("robot"+(i+1)+missingParts,Id);			
				aCards.Add(card);
				Id++;

			}
		}
			

}

function FlipCardFaceUp(card:Card)
{

		card.isFaceUp = true;
		if (aCardFlipped.IndexOf(card) < 0)
		{
			aCardFlipped.Add(card);
		
			if(aCardFlipped.Count == 2)
			{
			
				playerCanClick = false;
				yield WaitForSeconds(1);
				if(aCardFlipped[0].Id == aCardFlipped[1].Id )
				{
					aCardFlipped[0].isMatched = true;
					aCardFlipped[1].isMatched = true;
					matchesMade++;
					if(matchesMade >= matchesNeededToWin)
					{
						playerHasWon = true;
					}
				}
				else
				{
		
					aCardFlipped[0].isFaceUp = false;
					aCardFlipped[1].isFaceUp = false;
				}				
				aCardFlipped = new ArrayList();
				playerCanClick = true;
			}
		}
}

function BuildWinPrompt()
{
		GUI.enabled = true;
		var winPromptW : int = 120;
		var winPromptH : int = 100;
		var halfScreenWidth : float = Screen.width/2;
		var halfScreenHeight : float = Screen.height/2;
		var halfPromptW = winPromptW/2;
		var halfPromptH = winPromptH/2;
	
		GUI.BeginGroup(Rect(halfScreenWidth-halfPromptW,halfScreenHeight-halfPromptH,winPromptW,winPromptH));
			GUI.Box(Rect(0,0,winPromptW,winPromptH),"You Won the Game");
			if(GUI.Button(Rect(20,40,90,20),"Play Again ?"))
			{
				Application.LoadLevel("title");
			}
		GUI.EndGroup();	
	
	
}

class Card extends System.Object
{
		var isFaceUp : boolean = false;
		var isMatched : boolean = false;
		var img:String;
		var Id : int;
		
		function Card(img : String, Id:int)
		{
			this.img = img;
			this.Id = Id;
		}
}