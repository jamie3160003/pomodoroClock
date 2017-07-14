//----global variables-------
var onGoing = false;
var temp;
var pause_min;
var pause_sec;
$(document).ready(function(){


//-----work div-----
  $(".work .plus h1").click(function(){
    var minutes = parseInt($(".work .number h1").text());
    if( $(".work .number h1").text() < 60){
      var newMinutes = minutes + 1;
      if(newMinutes < 10) $("#display h1").text("0" + newMinutes);
      else $("#display h1").text(newMinutes);
      $(".work .number h1").text(minutes + 1);

    }
  });

  $(".work .minus h1").click(function(){
    var minutes = parseInt($(".work .number h1").text());
    if( $(".work .number h1").text() > 0){
      var newMinutes = minutes - 1;
      if(newMinutes < 10) $("#display h1").text("0" + newMinutes);
      else $("#display h1").text(newMinutes);
      $(".work .number h1").text(minutes - 1);

    }
  });

//-----break div-----
  $(".break .plus h1").click(function(){
    var minutes = parseInt($(".break .number h1").text());
    if( $(".break .number h1").text() < 60){
      $(".break .number h1").text(minutes + 1);
    }
  });

  $(".break .minus h1").click(function(){
    var minutes = parseInt($(".break .number h1").text());
    if( $(".break .number h1").text() > 0){
      $(".break .number h1").text(minutes - 1);
    }
  });

  //----------button------------
  $("#buttons #start").click(function(){
    var minutes = parseInt($("#display h1").text());
    setCountDown(minutes);
  });
  $("#buttons #pause").click(function(){
    pause();
  });
});







//----------------function------------------
var setCountDown = function(minutes){
  if(onGoing){
    //do something when pressing pause
  }else{
    var date = new Date();
    var begin = Math.floor(date.getTime()/1000);
    var goThrough;
    onGoing = true;
    temp = setInterval(function(){
      goThrough = counting(begin,minutes);
      if(goThrough == minutes*60) {
        clearInterval(temp);
        $("#display h1").text("Time's Up!");
        setTimeout(function(){
          $("#display h1").text(minutes);
        },1000);
        onGoing = false;
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
    pause_min = minReg.exec(time)[0];
    pause_sec = secReg.exec(time)[0];


  }
  //do nothing when the timer hasn't been set.
};

var counting = function(begin,minutes){
  var date = new Date();
  var goThrough = Math.floor(date.getTime()/1000) - begin;
  showRemainingTime(goThrough,minutes)
  return goThrough;
};



var showRemainingTime = function(goThrough, minutes){
  var remain = minutes*60 - goThrough;
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
