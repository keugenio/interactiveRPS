  $(document).ready(function() {
// ****************** vars **************  
  // from the players point of view, they are the player and the other player is the opponent
  // but from the database view, they gameName is either player1 or player2
  var player={
    name:"",
    gameName:"",
    move:"",
    score:0
  }
  var opponent={
    name:"", 
    move:"",
    score:0
  }
  var currentConnections = 0;
// ********* Initialize Firebase *************
  var config = {
    apiKey: "AIzaSyCXjK89bdutQm3GC-q_bEl9lRJogBjN7rw",
    authDomain: "interactiverps-d3fd7.firebaseapp.com",
    databaseURL: "https://interactiverps-d3fd7.firebaseio.com",
    projectId: "interactiverps-d3fd7",
    storageBucket: "interactiverps-d3fd7.appspot.com",
    messagingSenderId: "418919948222"
  };

  firebase.initializeApp(config);
// **************** db shortcuts ****************//
  var database = firebase.database();
  var connectionsRef = database.ref("/connections"); 
  var connectedRef = database.ref(".info/connected");
  var rps = database.ref("/rps");
  var gameStart = database.ref("/rps/gameStart"); ;
  var opponentPointer = null;
// **************** game start *********
  toggleButtons(false);
  if (!player.name){
    $('#editPlayerName').modal('toggle');  // prompt screen to enter name if none
  }
//********* sign-in and check current connections *********
  connectedRef.on("value", function(snap) {
      if (snap.val()) {
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
        currentConnections ++;
      }
  });
  connectionsRef.on("value", function(snap) { // When first loaded or when the connections list changes
    currentConnections = snap.numChildren()
    if(currentConnections==2){
      toggleButtons(true);
    } else {
      toggleButtons(false)
    }
  });
  connectionsRef.on("child_removed", function(){
    opponentPointer.remove();
    $("#opponentName").html("waiting for opponent");
    toggleButtons(false);
  })
// ************ mouse events ***********
      $(document).on("mouseenter", ".playbutton", function() {
        $(this).css({border: '1 solid #f37736'}).animate({                
            borderWidth: 4
        }, 250);      
      });
      $(document).on("mouseleave", ".playbutton", function() {
       $(this).animate({   
          borderWidth: 0
        }, 250);
      });  
// *************** information Window events ********
      $("#infoBtn").on("click", function(){
           $("#info").fadeToggle();
      });
      $("#infoWindowCloseBtn").on("click", function(){
           $("#info").fadeToggle();
      });
      $(document).mouseup(function(e){
          // if the information div is open, toggle it close
          var container = $("#info");
          // if the target of the click isn't the container nor a descendant of the container
          if (!container.is(e.target) && container.has(e.target).length === 0) 
          {
              container.hide();
          }
       });    
// ************** submit local player move***********
  $(".playbutton").on("click", function(){
      player.move = $(this).attr("data-value")
      var playerMove = {
        playerMove: player.move,
      }; 
      // Upload player move to the database
      if (player.gameName == "player1"){
        database.ref("/rps/player1").update(playerMove);    
      } else {
        database.ref("/rps/player2").update(playerMove);
    }
    
    toggleButtons(false);

    if (opponent.move !== "")
      evaluate("from button");
    else {
      $("#messageBoard").html("waiting on opponent");
      $("#rockIcon").css("display", "block");
    }


  });
// ************ Player Name submission *********** 
  $("#playerForm").on("submit", function(){
    // update local player name, playScreen, check if local player is player 1 or player 2 and push to firebase
    event.preventDefault();
    player.name = this.elements.playerNameInput.value;
    $("#playerName").html(player.name);

    if (currentConnections == 1){
        player.gameName = "player1";
        $("#opponentName").html("not logged in yet");       
    } else{
        player.gameName = "player2";
        opponentPointer = database.ref("/rps/player1");
        opponentPointer.once("value", function(snapshot){
          opponent.name = snapshot.val().playerName;
          opponent.score = snapshot.val().playerScore;
          opponent.move = snapshot.val().playerMove;          
        })

        $("#opponentName").html(opponent.name);
        gameStart.set({ // 2nd player initiates game  
          gameStarted:true

        });      
        toggleButtons(true);         
    }

    database.ref("/rps/"+ player.gameName).set({
        playerName:player.name,
        playerMove:"",
        playerScore:0,
    });
    $('#editPlayerName').modal('toggle');
  });
// ************ listen for player 1 updates ********
  database.ref("/rps/player1").on("value", function(snapshot){
    if (player.gameName != "player1" && player.gameName != ""){
      opponent.name = snapshot.val().playerName;
      opponent.score = snapshot.val().playerScore;
      opponent.move = snapshot.val().playerMove;
      $("#opponentName").html(opponent.name);
      opponentPointer = database.ref("/rps/player1");

      if (player.move != "" && opponent.move != ""){
        evaluate("from player1");
      }
      else{
        $("#messageBoard").html("waiting on opponent");
        $("#rockIcon").css("display", "block");
      }
    }
  });
// ************ listen for player 2 updates ********
  database.ref("/rps/player2").on("value", function(snapshot){
    if (player.gameName != "player2" && player.gameName != ""){
      opponent.name = snapshot.val().playerName;
      opponent.score = snapshot.val().playerScore;
      opponent.move = snapshot.val().playerMove;
      $("#opponentName").html(opponent.name);
      opponentPointer = database.ref("/rps/player2"); 

      if (player.move != "" && opponent.move != ""){
        evaluate("from player2");
      }  
      else{
        $("#messageBoard").html("waiting on opponent");
        $("#rockIcon").css("display", "block");
      }
    }
  });
// *************** functions *******************
  function toggleButtons(aBoolean){
    var allPlayButtons=document.getElementsByClassName("playbutton"); 
    for (var i = 0; i < document.getElementsByClassName("playbutton").length; i++) {
      if (aBoolean)
        $(allPlayButtons[i]).css("display", "block");
      else
        $(allPlayButtons[i]).css("display", "none");
    }
  }

  function evaluate(msg){
    alert("time to evaluate! " + msg);
  }
}); //document ready