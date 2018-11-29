window.onload = function() {

  $("#stats").children().children().hide();
  $("#theory").children().children().hide();
  $("#facts").children().children().hide();
  $("#morefacts").children().children().hide();
  $("#moretheory").children().children().hide();

  //FORTUNE WHEEL

  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");

  var categories = [];
  categories.push({
    id: "berlinclubscene",
    x: 0,
    y: (Math.PI * 2) / 5,
    color: "#2CEBA3"
  });
  categories.push({
    id: "fromatob",
    x: (Math.PI * 2) / 5,
    y: (2 * (Math.PI * 2)) / 5,
    color: "#A32CEB"
  });
  categories.push({
    id: "eatingdrinking",
    x: (2 * (Math.PI * 2)) / 5,
    y: (3 * (Math.PI * 2)) / 5,
    color: "#2CD3EB"
  });
  categories.push({
    id: "kiezclichees",
    x: (3 * (Math.PI * 2)) / 5,
    y: (4 * (Math.PI * 2)) / 5,
    color: "#EB2CD3"
  });
  categories.push({
    id: "funfacts",
    x: (4 * (Math.PI * 2)) / 5,
    y: (5 * (Math.PI * 2)) / 5,
    color: "#2C74EB"
  });

  var wheel = {
    draw: function() {
      for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, category.x, category.y);
        ctx.fillStyle = category.color;
        ctx.fill();
      }
    }
  };

  wheel.draw();

  //Writes Category Text on Canvas

  var text = {
    draw: function() {
      ctx.save();
      ctx.translate(250, 250);
      ctx.rotate((36 * Math.PI) / 180);
      ctx.font = '28px "Dosis", serif';
      ctx.fillStyle = "white";
      ctx.fillText("H O W  M U C H", 40, 10);

      ctx.rotate((72 * Math.PI) / 180);
      ctx.font = '28px "Dosis", serif';
      ctx.fillStyle = "white";
      ctx.fillText(" O F  A N", 40, 10);

      ctx.rotate((72 * Math.PI) / 180);
      ctx.font = '28px "Dosis", serif';
      ctx.fillStyle = "white";
      ctx.fillText("ENGAGEMENT", 40, 10);

      ctx.rotate((72 * Math.PI) / 180);
      ctx.font = '28px "Dosis", serif';
      ctx.fillStyle = "white";
      ctx.fillText("E X P E R T", 40, 10);

      ctx.rotate((72 * Math.PI) / 180);
      ctx.font = '28px "Dosis", serif';
      ctx.fillStyle = "white";
      ctx.fillText(" A R E Y O U ?", 40, 10);

      ctx.restore();
    }
  };
  text.draw();

  //Spins Wheel

  var x = 10;
  var random;
  var totalRotation = 0;
  var selectedCategory;
  var countDown;


  function rotate() {
    ctx.clearRect(0, 0, 500, 500);
    ctx.translate(250, 250);
    ctx.rotate(Math.PI / x);
    totalRotation += Math.PI / x;
    ctx.translate(-250, -250);
    wheel.draw();
    text.draw();
    if (x <= random) {
      window.requestAnimationFrame(rotate);
      x += 0.2;
    } else {
      selectCategory();
    }
  }

  //Selects the category

  function selectCategory() {
    var remainderRotation = totalRotation % (Math.PI * 2);
    var sector = Math.PI * 2 - remainderRotation - Math.PI / 2 
    
    categories.forEach(function(cat) {
    if (sector < 0) {
      sector = Math.PI * 2 + sector}
     } )
    categories.forEach(function(cat) {
      if(sector > cat.x && sector < cat.y) {

    selectedCategory = cat.id
 
      }})
    
      printCategory();
    
    };
  

  function printCategory() {

    if (selectedCategory === "fromatob") {
      var randomIndex = Math.floor(Math.random() * $("#stats").children().length);
      selectedCategory = $("#stats").children().eq(randomIndex);
    }
    if (selectedCategory === "berlinclubscene") {
      var randomIndex = Math.floor(Math.random() * $("#theory").children().length);
      selectedCategory = $("#theory").children().eq(randomIndex);
    }
    if (selectedCategory === "eatingdrinking") {
      var randomIndex = Math.floor(Math.random() * $("#facts").children().length);
      selectedCategory = $("#facts").children().eq(randomIndex);
    }   
    if (selectedCategory === "funfacts") {
      var randomIndex = Math.floor(Math.random() * $("#morefacts").children().length);
      selectedCategory = $("#morefacts").children().eq(randomIndex);
    }
    if (selectedCategory === "kiezclichees") {
      var randomIndex = Math.floor(Math.random() * $("#moretheory").children().length);
      selectedCategory = $("#moretheory").children().eq(randomIndex);     
    } 

    selectedCategory.children().eq(i).show();

    // Counter
    $("#counter").html(4);

    countDown = setInterval(function() {

        if(parseFloat($("#counter").html()) === 0) {
        questionWrong(); } else {
          $("#counter").html(parseFloat($("#counter").html())-1)
        }
      },1500)
   
      nbOfRounds += 1
  }
 


  //Onclick SPIN button

  $("#spin").click(function() {
    $("#default-text").hide();
    totalRotation = 0;
    var audio = new Audio("NFF-incoming.wav");
    audio.play();
    random = Math.floor(Math.random() * 70 + 50);
    rotate();
    $("#spin").prop("disabled", true);
  });


// quiz
  $(".answerSet input").on("click", function() {
    if ($(this).parent().hasClass("correct")) {
      questionRight();
    } else {
      questionWrong();
    }
  });

  var scoreStorage = 0;
  var nbOfRounds = 0;

  var i = 0;
  
  function questionRight() {
    $("#pointWrap").children().eq(i).addClass("greenpoint");
    selectedCategory.children().eq(i).hide();
    gameOver();
    i += 1;
    selectedCategory.children().eq(i).show();
    $("#counter").html(4);
    var audio = new Audio("NFF-valid.wav");
    audio.play();
    scoreStorage += 1;
    $("#total").html("Total Score: " + scoreStorage)
  }
  
  function questionWrong() {
    $("#pointWrap").children().eq(i).addClass("redpoint");
    selectedCategory.children().eq(i).hide();
    gameOver();
        i += 1;
    selectedCategory.children().eq(i).show();
    $("#counter").html(4);
    var audio = new Audio("NFF-lose.wav");
    audio.play();
  }

  function gameOver() {
   
    if(i === 2) {
      clearInterval(countDown);
      
      window.setTimeout(function() { 

      var counterRed = 0;
      var counterGreen = 0;
      var points = $(".points")

      for(var j = 0; j < points.length; j++ ) {
        if(points.eq(j).hasClass("redpoint")) {
        counterRed += 1
      } else if (points.eq(j).hasClass("greenpoint")) {
        counterGreen += 1
      } }

      // if(counterRed === 0) {
      //   alert("YOU ARE AN ENGAGEMENT EXPERT! ALL ANSWERS CORRECT!")
      // } else if (counterRed === 1) {
      //   alert("GOOD JOB. ONLY 1 FALSE");
      //   scoreStorage += 4;
      // } else if (counterRed === 2) {
      //   alert("YOU CAN DO BETTER!");
      //   scoreStorage += 3;
      // } else if (counterRed === 3) {
      //   alert("OH NO, ALL WRONG!");
      //   scoreStorage += 2;
      // };

      if (nbOfRounds === 3) {
        alert("DONE! You scored " + scoreStorage + " points");
        setTimeout(function() {
          location.reload()
        },1500)
      }


    $("#spin").prop('disabled', false);
    $("#default-text").hide();
    x=10;
    ctx.resetTransform();
    wheel.draw();
    text.draw();
    i = 0;



    for(var o = 0; o < 3; o++) {
      $("#pointWrap").children().eq(o).removeClass("greenpoint");
      $("#pointWrap").children().eq(o).removeClass("redpoint");
    }
    $("#counter").html(" ");
    $("#default-text").html("SO MUCH FUN! <br> SPIN AGAIN!").show();

    } , 800)

    selectedCategory.remove();
   

  }
  

  }


  
};





  
   

  






  

  

