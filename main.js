//----global variables-------
var onGoing = false;
var temp;
var needBreak;
var resume;
var pause_min;
var pause_sec;
$(document).ready(function(){


//-----work div-----
  $(".work .plus h1").click(function(){
    var minutes = parseInt($(".work .number h1").text());
    if( $(".work #number").text() < 60){
      var newMinutes = minutes + 1;
      $(".work #number").text(minutes + 1);
      if(!onGoing){
        if(newMinutes < 10) $("#display h1").text("0" + newMinutes);
        else $("#display h1").text(newMinutes);
      }



    }
  });

  $(".work .minus h1").click(function(){
    var minutes = parseInt($(".work #number").text());
    if( $(".work #number").text() > 1){
      var newMinutes = minutes - 1;
      $(".work #number").text(minutes - 1);
      if(!onGoing){
        if(newMinutes < 10) $("#display h1").text("0" + newMinutes);
        else $("#display h1").text(newMinutes);
      }



    }
  });

//-----break div-----
  $(".break .plus h1").click(function(){
    var minutes = parseInt($(".break #number").text());
    if( $(".break #number").text() < 60){
      $(".break #number").text(minutes + 1);
    }
  });

  $(".break .minus h1").click(function(){
    var minutes = parseInt($(".break #number").text());
    if( $(".break #number").text() > 1){
      $(".break #number").text(minutes - 1);
    }
  });

  //----------button------------
  $("#buttons #start").click(function(){
    if(!onGoing){
      var minutes = parseInt($("#display h1").text());
      needBreak = true;
      setCountDown(minutes,0);
    }

  });
  $("#buttons #pause").click(function(){
    pause();
  });

  $("#buttons #reset").click(function(){
    console.log("in");
    onGoing = false;
    needBreak = true;
    resume = false;
    pause_min = undefined;
    pause_sec = undefined;
    clearInterval(temp);
    var minutes = $(".work .number").text();
    if(minutes < 10) $("#display h1").text("0" + minutes);
    else $("#display h1").text( minutes);

  });

});









//----------------function------------------
var setCountDown = function(minutes,seconds){
  if(onGoing){
    //do something when pressing pause
  }else{
    var date = new Date();
    var begin = Math.floor(date.getTime()/1000);
    var goThrough;
    onGoing = true;
    temp = setInterval(function(){
      goThrough = counting(begin,minutes,seconds);
      if(goThrough == minutes*60 + seconds) {
        clearInterval(temp);
        $("#display h1").text("Time's Up!");
        setTimeout(function(){
          $("#display h1").text(minutes);
        },1000);
        onGoing = false;
        //Break time count down after the main coundown finish.
        if(needBreak){
          needBreak = false;
          setTimeout(function(){
            $("#display h1").text(minutes);
          },1000);
          var break_min = parseInt($(".break .number").text());
          setCountDown(break_min, 0);
        }


        return;
      }
    },1000);
  }
};

var pause = function(){
  if(onGoing){
    var time = $("#display h1").text();
    var minReg = /^\d{2}/;
    var secReg = /\d{2}$/
    pause_min = parseInt(minReg.exec(time)[0]);
    pause_sec = parseInt(secReg.exec(time)[0]);
    clearInterval(temp);
    onGoing = false;
    resume = true;
  }else if(resume){
    resume = false;
    setCountDown(pause_min, pause_sec);
  }

};

var counting = function(begin,minutes,seconds){
  var date = new Date();
  var goThrough = Math.floor(date.getTime()/1000) - begin;
  showRemainingTime(goThrough, minutes, seconds)
  return goThrough;
};



var showRemainingTime = function(goThrough, minutes, seconds){
  var remain = (minutes*60 + seconds) - goThrough;
  var min = Math.floor(remain / 60);
  var sec = remain % 60;
  if(min < 10){
    if(min == 0) min = "00";
    else min = "0" + min;
  }
  if(sec < 10){
    if(sec == 0) sec = "00";
    else sec = "0" + sec;
  }
  $("#display h1").text(min + " : " + sec);
};
