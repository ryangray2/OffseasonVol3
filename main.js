
var user = nyk;
var capNumber = 122000000;
var teamChoices = [nyk, lal];
var leftOff = 0;
var draftSummary = [];
var twoNav = 0;
var threeNav = 0;

var tradedFor = [];
var tradedAway =[];
var drafted = [];
var signed = [];
var cutArr = [];

var wins = 0;
var losses = 0;
var starters = [];
var mleRemaining = 10264000;

function getPics() {
  for (let i = 0; i < freeAgents.length; i++) {
    let currFA = freeAgents[i];
    for (let j = 0; j < pics.length; j++) {
      let faName = currFA.name.toLowerCase();
      if (pics[j].name == faName) {
        freeAgents[i].img = "https://cdn.nba.com/headshots/nba/latest/1040x760/" + pics[j].id + ".png";
        // console.log(freeAgents[i]);
      }
    }
  }
  for (let i = 0; i < knickRoster.length; i++) {
    let currFA = knickRoster[i];
    for (let j = 0; j < pics.length; j++) {
      let faName = currFA.name.toLowerCase();
      if (pics[j].name == faName) {
        knickRoster[i].img = "https://cdn.nba.com/headshots/nba/latest/1040x760/" + pics[j].id + ".png";
        // console.log(knickRoster[i]);
      }
    }
  }
  for (let i = 0; i < knickFA.length; i++) {
    let currFA = knickFA[i];
    for (let j = 0; j < pics.length; j++) {
      let faName = currFA.name.toLowerCase();
      if (pics[j].name == faName) {
        knickFA[i].img = "https://cdn.nba.com/headshots/nba/latest/1040x760/" + pics[j].id + ".png";
        // console.log(knickFA[i]);
      }
    }
  }
  for (let i = 0; i < knicksTrades.length; i++) {
    console.log("something");
    for (let k = 0; k < knicksTrades[i].receivePlayer.length; k++) {
          console.log(knicksTrades[i]);
      let currFA = knicksTrades[i].receivePlayer[k];
      for (let j = 0; j < pics.length; j++) {
        let faName = currFA.name.toLowerCase();
        if (pics[j].name == faName) {
          knicksTrades[i].receivePlayer[k].img = "https://cdn.nba.com/headshots/nba/latest/1040x760/" + pics[j].id + ".png";
          console.log(knicksTrades[i].receivePlayer[k]);
        }
      }
    }
  }
}

getPics();

function getCapRoom(team) {
  var total = 0;
  for (let i = 0; i < user.roster.length; i++) {
    if (user.roster[i].mle) {
      continue;
    }
    total += user.roster[i].sal;
    // console.log(user.roster[i].name + " " + total);
  }
  total += user.deadCap;
  // console.log("cap space: " + (capNumber - total));
  return capNumber - total;
}

function getMLE() {
  var total = 0;
  for (let i = 0; i < user.roster.length; i++) {
    if (user.roster[i].mle) {
      total += user.roster[i].sal;
    }
  }
  mleRemaining -= total;
  return mleRemaining;
}

function start() {
  document.getElementById("startCont").style.display = "none";
  // document.getElementById("teamSelectCont").style.display = "block";
  // document.body.style.background = "linear-gradient(73deg, rgba(58,106,252,1) 27%, rgba(16,75,255,1) 100%)";
  populateTeamSelect();
  assignRanks();
  teamSelectPressed(nyk);
}

function populateTeamSelect() {
  var root = document.getElementById("teamSelectRow")
  for (let i = 0; i < teamChoices.length; i++) {
    var col = document.createElement("div");
    col.classList.add("col-6", "col-md-4");
    col.addEventListener('click', function() {
      teamSelectPressed(teamChoices[i]);
    });

    var cont = document.createElement("div");
    cont.classList.add("container", "teamCont");

    var img = document.createElement("img");
    img.setAttribute("src", teamChoices[i].logo);
    img.classList.add("selectLogo");

    var p = document.createElement("p");
    p.classList.add("teamSelectName");
    p.innerHTML = teamChoices[i].city.toUpperCase() + " " + teamChoices[i].name.toUpperCase();


    cont.appendChild(img);
    cont.appendChild(p);
    col.appendChild(cont);
    root.appendChild(col);
  }
}

function teamSelectPressed(team) {
  user = team;
  console.log(team.city);
  console.log(team.roster[0]);
  document.getElementById("teamSelectCont").style.display = "none";
  document.getElementById("draftGateCont").style.display = "block";
  document.body.style.background = "linear-gradient(118deg, rgb(112, 6, 42) 37%, rgb(255, 55, 55) 100%)";
  document.body.style.height = "100%";
    document.getElementById("topBar").style.display = "block";
  document.getElementById("teamClock").setAttribute("src", user.logo);
}

function enterDraft() {
  document.getElementById("draftGateCont").style.display = "none";
  document.getElementById("draftCont").style.display = "block";
  simDraft();
}


function numberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function assignRanks() {
  for (let i = 0; i < draftPlayers.length; i++) {
    draftPlayers[i].rank = i;
  }
}

var showAmount = 0;
var startShow = 0;
function simDraft() {
  showAmount = 0;
  startShow = leftOff;
  for (let i = leftOff; i < draftOrder.length; i++) {
    if (i === draftOrder.length - 1) {
      endDraft();
    }
    if (draftOrder[i].name === user.name) {
      leftOff = i + 1;
      yourTurnDraft();
      break;
    }
    var pick = numberBetween(0, 2);
    if (draftPlayers[0].rank + 2 < draftPlayers[pick].rank) {
      pick = 0;
    }

    draftSummary.push([draftOrder[i], draftPlayers[pick]]);
    draftPlayers.splice(pick, 1);
    showAmount++;
  }
  console.log(draftSummary);
}

function showDraft() {
  document.getElementById("boardCont").style.display = "none";
  document.getElementById("draftTop").style.display = "none";
  document.getElementById("showDraft").style.display = "block";
  i = startShow;
  var j = 0;
  while (i < showAmount) {
   (function (i, j) {
     setTimeout(function() {
       if (i == showAmount - 1) {
          document.getElementById("showDraft").style.display = "none";
            document.getElementById("draftTop").style.display = "block";
          generateDraftBoard();
       } else {
         // console.log(draftSummary);
         // console.log(draftSummary[i][0]);
         // console.log(draftSummary[i][1]);
         document.getElementById("showLogo").setAttribute("src", draftSummary[i][0].logo);
         document.getElementById("showPick").innerHTML = draftSummary[i][1].pos + " - " + draftSummary[i][1].name;
         document.getElementById("simImg").setAttribute("src", draftSummary[i][1].img);
       }
     }, 250 * j)
   }) (i++, j++)
  }
}

function generateDraftBoard() {
  var root = document.getElementById("boardCont");
  root.style.display = "block";
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  for (let i = 0; i < draftPlayers.length; i++) {
    var row = document.createElement("div");
    row.classList.add("row", "prospectRow");


    if (draftSummary.length > 30) {
      var roundtext = "Round 2";
    } else {
      var roundtext = "Round 1";
    }

    var pickText = "Pick " + (draftSummary.length + 1) % 30;
    document.getElementById("roundpicktext").innerHTML = roundtext + " " + pickText;

    var nameCol = document.createElement("div");
    nameCol.classList.add("col-md-12", "col-12", "draftName");
    nameCol.innerHTML = draftPlayers[i].name;

    var posCol = document.createElement("div");
    posCol.classList.add("col-md-1", "col-2", "draftStats");
    posCol.innerHTML = draftPlayers[i].pos;

    var ageCol = document.createElement("div");
    ageCol.classList.add("col-md-1", "col-2", "draftStats");
    ageCol.innerHTML = draftPlayers[i].age;

    var schoolCol = document.createElement("div");
    schoolCol.classList.add("col-md-3", "col-4", "draftStats");
    schoolCol.innerHTML = draftPlayers[i].school;

    var heightCol = document.createElement("div");
    // heightCol.classList.add("col-md-1", "col-xs-2", "d-none", "d-md-block");
        heightCol.classList.add("col-md-1", "col-2", "draftStats");
    heightCol.innerHTML = draftPlayers[i].height;

    var weightCol = document.createElement("div");
    weightCol.classList.add("col-md-1", "col-2", "draftStats");
    weightCol.innerHTML = draftPlayers[i].weight;

    row.appendChild(nameCol);
    row.appendChild(posCol);
    row.appendChild(ageCol);
    row.appendChild(schoolCol);
    row.appendChild(heightCol);
    row.appendChild(weightCol);

    var secondRow = document.createElement("div");
    secondRow.classList.add("row", "text-center", "drop");
    secondRow.setAttribute("id", "play" + i + "nice");
    secondRow.style.transition = "all 0.25s ease-out 0s";
    secondRow.style.height = "1px";

    var imgCol = document.createElement("div");
    imgCol.classList.add("col-4")

    var img = document.createElement("img");
    img.setAttribute("src", draftPlayers[i].img);
    img.classList.add("dropPic");
    img.setAttribute("id", "play" + i + "img");
    img.style.opacity = "0";
    img.style.display = "none";

    imgCol.appendChild(img);

    var buttonCol = document.createElement("div");
    buttonCol.classList.add("col-8");


    var button = document.createElement("button");
    button.classList.add("button-59");
    button.innerHTML = "DRAFT " + draftPlayers[i].name.toUpperCase();
    button.setAttribute("id", "play" + i + "but");
    button.style.display = "none";
    button.style.opacity = "0";
    button.style.marginTop = "4vh";
    button.addEventListener('click', function() {
      draftPlayer(draftPlayers[i]);
    });

    buttonCol.appendChild(button);

    secondRow.appendChild(imgCol);
    secondRow.appendChild(buttonCol);

    // if (draftPlayers[i].blurb) {
      var blurbCol = document.createElement("div");
      blurbCol.classList.add("col-12");

      var p = document.createElement("p");
      if (draftPlayers[i].hasOwnProperty("blurb")) {
        p.innerHTML = draftPlayers[i].blurb;
      } else {
        p.innerHTML = "";
      }
      p.classList.add("blurb");
      p.style.opacity = "0";
      p.style.display = "none";
      p.setAttribute("id", "play" + i + "p");

      blurbCol.appendChild(p);
      secondRow.appendChild(blurbCol);


    row.addEventListener('click', function() {
      if (document.getElementById("play" + i + "nice").style.height === "15vh" || document.getElementById("play" + i + "nice").style.height === "37vh") {
        document.getElementById("play" + i + "nice").style.height = "1px";
        document.getElementById("play" + i + "but").style.opacity = "0";
        document.getElementById("play" + i + "img").style.opacity = "0";
        document.getElementById("play" + i + "p").style.opacity = "0";
        setTimeout(function() {
          document.getElementById("play" + i + "but").style.display = "none";
          document.getElementById("play" + i + "img").style.display = "none";
          document.getElementById("play" + i + "p").style.display = "none";
        }, 250)
      } else {
        if (draftPlayers[i].hasOwnProperty("blurb")) {
          document.getElementById("play" + i + "nice").style.height = "37vh";
        } else {
          document.getElementById("play" + i + "nice").style.height = "15vh";
        }
        document.getElementById("play" + i + "but").style.display = "inline";
        document.getElementById("play" + i + "img").style.display = "inline";
        document.getElementById("play" + i + "p").style.display = "inline";

          document.getElementById("play" + i + "but").style.opacity = "1";
          document.getElementById("play" + i + "img").style.opacity = "1";
          document.getElementById("play" + i + "p").style.opacity = "1";

      }

    });

    var imgCol = document.createElement("div");
    imgCol.classList.add("col-md-1", "col-2", "draftStats");
    imgCol.innerHTML = draftPlayers[i].age;

    root.appendChild(row);
    root.appendChild(secondRow);
  }
}

function yourTurnDraft() {
  showDraft();
  // generateDraftBoard();
}

function draftPlayer(player) {
  if (draftSummary.length < 31) {
      player.sal = rookieScale[draftSummary.length];
  } else {
    player.sal = 1000000;
  }

  user.roster.push(player);

  var index = draftPlayers.indexOf(player);
  draftPlayers.splice(index, 1);

  draftSummary.push([user, player]);
  drafted.push(player);

  simDraft();
}

function endDraft() {
  document.getElementById("draftCont").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  document.body.style.background = "linear-gradient(344deg, rgba(191,207,227,1) 36%, rgba(255,246,241,1) 100%)";
  document.getElementById("topBar").style.color = "#0c6fa3";
  updateCapDisplay();
  updateMLEDisplay();
  yourFaNav();
}

function updateCapDisplay() {
  document.getElementById("capSpaceText").innerHTML = "Cap Space: $" + addCommas(getCapRoom());
}

function updateMLEDisplay() {
  document.getElementById("mleText").innerHTML = "MLE Remaining: $" + addCommas(getMLE());
}

function yourFaNav() {
  document.getElementById("yourFaNavCont").classList.add("fade-in-bottom");
  document.getElementById("faNavCont").classList.remove("fade-in-bottom");
  document.getElementById("rosterNavCont").classList.remove("fade-in-bottom");
  document.getElementById("tradeNavCont").classList.remove("fade-in-bottom");

  document.getElementById("yourFaNavCont").style.display = "block";
  document.getElementById("faNavCont").style.display = "none";
  document.getElementById("rosterNavCont").style.display = "none";
  document.getElementById("tradeNavCont").style.display = "none";

  document.getElementById("yourFAnav").classList.add("currNav");
  document.getElementById("FAnav").classList.remove("currNav");
  document.getElementById("tradenav").classList.remove("currNav");
  document.getElementById("rosternav").classList.remove("currNav");

  generateYourFa();
}

function faNav() {
  document.getElementById("yourFaNavCont").classList.remove("fade-in-bottom");
  document.getElementById("faNavCont").classList.add("fade-in-bottom");
  document.getElementById("rosterNavCont").classList.remove("fade-in-bottom");
  document.getElementById("tradeNavCont").classList.remove("fade-in-bottom");

  document.getElementById("yourFaNavCont").style.display = "none";
  document.getElementById("faNavCont").style.display = "block";
  document.getElementById("rosterNavCont").style.display = "none";
  document.getElementById("tradeNavCont").style.display = "none";

  document.getElementById("yourFAnav").classList.remove("currNav");
  document.getElementById("FAnav").classList.add("currNav");
  document.getElementById("tradenav").classList.remove("currNav");
  document.getElementById("rosternav").classList.remove("currNav");

  generateFa();
}

function rosterNav() {
  document.getElementById("yourFaNavCont").classList.remove("fade-in-bottom");
  document.getElementById("faNavCont").classList.remove("fade-in-bottom");
  document.getElementById("rosterNavCont").classList.add("fade-in-bottom");
  document.getElementById("tradeNavCont").classList.remove("fade-in-bottom");

  document.getElementById("yourFaNavCont").style.display = "none";
  document.getElementById("faNavCont").style.display = "none";
  document.getElementById("rosterNavCont").style.display = "block";
  document.getElementById("tradeNavCont").style.display = "none";

  document.getElementById("yourFAnav").classList.remove("currNav");
  document.getElementById("FAnav").classList.remove("currNav");
  document.getElementById("tradenav").classList.remove("currNav");
  document.getElementById("rosternav").classList.add("currNav");


  generateRoster();
}

function tradeNav() {
  document.getElementById("yourFaNavCont").classList.remove("fade-in-bottom");
  document.getElementById("faNavCont").classList.remove("fade-in-bottom");
  document.getElementById("rosterNavCont").classList.remove("fade-in-bottom");
  document.getElementById("tradeNavCont").classList.add("fade-in-bottom");

  document.getElementById("yourFaNavCont").style.display = "none";
  document.getElementById("faNavCont").style.display = "none";
  document.getElementById("rosterNavCont").style.display = "none";
  document.getElementById("tradeNavCont").style.display = "block";

  document.getElementById("yourFAnav").classList.remove("currNav");
  document.getElementById("FAnav").classList.remove("currNav");
  document.getElementById("tradenav").classList.add("currNav");
  document.getElementById("rosternav").classList.remove("currNav");

  generateTrades(0);
}

function twoRight() {
  twoNav++;
  generateTrades(twoNav);
}

function twoLeft() {
  twoNav--;
  generateTrades(twoNav);
}

function threeRight() {
  threeNav++;
  generateDraftTrades(threeNav);
}

function threeLeft() {
  threeNav--;
  generateDraftTrades(threeNav);
}

function generateYourFa() {
  var root = document.getElementById("yourFaNavCont");
  root.style.display = "block";
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  for (let i = 0; i < user.fa.length; i++) {
    var row = document.createElement("div");
    row.classList.add("row", "text-center", "faRow");

    var imgCol = document.createElement("div");
    imgCol.classList.add("col-12");

    var img = document.createElement("img");
    img.setAttribute("src", user.fa[i].img);
    img.classList.add("yourFaImg");

    imgCol.appendChild(img);
    row.appendChild(imgCol);

    var nameCol = document.createElement("div");
    nameCol.classList.add("col-12");

    var name = document.createElement("p");
    name.classList.add("faName");
    name.innerHTML = user.fa[i].name;

    nameCol.appendChild(name);
    row.appendChild(nameCol);

    var salCol = document.createElement("div");
    salCol.classList.add("col-12");

    var sal = document.createElement("p");
    sal.classList.add("faSal");
    if (user.fa[i].years === 1) {
      sal.innerHTML = "$" + addCommas(user.fa[i].sal * user.fa[i].years) + "/" + user.fa[i].years + " yr.";
    } else {
      sal.innerHTML = "$" + addCommas(user.fa[i].sal * user.fa[i].years) + "/" + user.fa[i].years + " yrs.";
    }


    salCol.appendChild(sal);
    row.appendChild(salCol);

    var butCol = document.createElement("div");
    butCol.classList.add("col-12");

    var but = document.createElement("button");
    but.innerHTML = "SIGN";
    but.classList.add("button-38", "signBut");
    but.addEventListener('click', function() {
      signYourFa(user.fa[i]);
    });

    butCol.appendChild(but);
    row.appendChild(butCol);
    root.appendChild(row);
  }
}

function signYourFa(player) {
  user.roster.push(player);
  var index = user.fa.indexOf(player);
  user.fa.splice(index, 1);
  signed.push(player);
  generateYourFa();
  updateCapDisplay();
}

function signFa(player) {

  var num = numberBetween(0,100);
  if (num <= player.odds) {
    user.roster.push(player);
    var index = freeAgents.indexOf(player);
    freeAgents.splice(index, 1);
    signed.push(player);
    generateFa();
    updateCapDisplay();
    popUp(player, true);
  } else {
    var index = freeAgents.indexOf(player);
    freeAgents.splice(index, 1);
    generateFa();
    popUp(player, false);
  }
}

function signFaMLE(player) {
  var num = numberBetween(0,100);
  if (num <= player.odds) {
  user.roster.push(player);
  player.mle = true;
  var index = freeAgents.indexOf(player);
  freeAgents.splice(index, 1);
  signed.push(player);
  generateFa();
  updateCapDisplay();
  updateMLEDisplay();
      popUp(player, true);
} else {
  var index = freeAgents.indexOf(player);
  freeAgents.splice(index, 1);
  generateFa();
      popUp(player, false);
  }
}

function popUp(guy, accepted) {
  var pop = document.getElementById("popUp");
  console.log(pop);
  var popInfo = document.getElementById("popInfo");

  pop.classList.add("fade-in-bottom");
  pop.style.display = "block";
  if (accepted) {
    popInfo.innerHTML = guy.name + " accepts!";
  } else {
    popInfo.innerHTML = guy.name + " declines.";
  }
}

function closePop() {

    var pop = document.getElementById("popUp");
    pop.classList.remove("fade-in-bottom");
    pop.style.display = "none";
}

function addCommas(num) {
  var neg = false;
  if (num < 0) {
    neg = true;
  }
  var n = num.toFixed(0);
  var str = n.toString();
  if (neg) {
    str = str.substr(1);
  }
  var count = 0;
  var newStr = "";
  for (var i = str.length - 1; i > -1; i--) {
    if (count == 2) {
      var additive = "," + str[i];
      newStr = additive.concat(newStr);
      count = 0;
      continue;
    } else {
      newStr = str[i].concat(newStr);
    }
    count++;
  }
  if (newStr[0] == ",") {
    newStr = newStr.substring(1);
  }
  if (neg) {
    newStr = "-" + newStr;
  }
  return newStr;
}

function generateFa() {
  var root = document.getElementById("faNavCont");
  root.style.display = "block";
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  for (let i = 0; i < freeAgents.length; i++) {
  if (((mleRemaining - freeAgents[i].sal) >= 0 || (getCapRoom(user) - freeAgents[i].sal) >= 0)) {
    freeAgents[i].afford = true;
  } else {
      freeAgents[i].afford = false;
  }
  }

freeAgents.sort(function(x, y) { return y.afford - x.afford });

  for (let i = 0; i < freeAgents.length; i++) {
    if (freeAgents[i].sal === 0) {
      continue;
    }
    var row = document.createElement("div");
    row.classList.add("faRow");
    row.classList.add("row", "text-center");

    var imgCol = document.createElement("div");
    imgCol.classList.add("col-12");

    var img = document.createElement("img");
    img.setAttribute("src", freeAgents[i].img);
    img.classList.add("yourFaImg");

    imgCol.appendChild(img);
    row.appendChild(imgCol);

    var nameCol = document.createElement("div");
    nameCol.classList.add("col-12");

    var name = document.createElement("p");
    name.classList.add("faName");
    name.innerHTML = freeAgents[i].name;

    nameCol.appendChild(name);
    row.appendChild(nameCol);

    var salCol = document.createElement("div");
    salCol.classList.add("col-12");

    var sal = document.createElement("p");
    sal.classList.add("faSal");
    if (freeAgents[i].years === 1) {
      sal.innerHTML = "$" + addCommas(freeAgents[i].sal * freeAgents[i].years) + "/" + freeAgents[i].years + " yr.";
    } else {
      sal.innerHTML = "$" + addCommas(freeAgents[i].sal * freeAgents[i].years) + "/" + freeAgents[i].years + " yrs.";
    }

    salCol.appendChild(sal);
    row.appendChild(salCol);

    if ((getCapRoom(user) - freeAgents[i].sal) >= 0) {
      var butCol = document.createElement("div");
      butCol.classList.add("col-12");

      var but = document.createElement("button");
      but.innerHTML = "SIGN";
      but.classList.add("button-38", "signBut");
      but.addEventListener('click', function() {
        signFa(freeAgents[i]);
      });

      butCol.appendChild(but);
      row.appendChild(butCol);
    }
    if ((mleRemaining - freeAgents[i].sal) >= 0) {
      var mlebutCol = document.createElement("div");
      mlebutCol.classList.add("col-12");

      var mlebut = document.createElement("button");
      mlebut.innerHTML = "USE MLE";
      mlebut.classList.add("button-38", "signBut");
      mlebut.addEventListener('click', function() {
        signFaMLE(freeAgents[i]);
      });

      mlebutCol.appendChild(mlebut);
      row.appendChild(mlebutCol);
    }
    if ((mleRemaining - freeAgents[i].sal) < 0 && (getCapRoom(user) - freeAgents[i].sal) < 0) {
      row.style.opacity = ".5";
    }


    root.appendChild(row);
  }
}

function generateRoster() {
    var root = document.getElementById("rosterNavCont");
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }

    user.roster.sort(function(a,b) {return (a.sal < b.sal) ? 1 : ((b.sal < a.sal) ? -1 : 0);} );

    var noterow = document.createElement("div");
    noterow.classList.add("row", "text-center");

    var noteCol = document.createElement("div");
    noteCol.classList.add("col-12");

    var noteP = document.createElement("p");
    noteP.innerHTML = "TESTING";

    // noteCol.appendChild(noteP);
    // noterow.appendChild(noteCol);
    // root.appendChild(noterow);


    var row = document.createElement("div");
    row.classList.add("row");

    // var chCol = document.createElement("div");
    // chCol.classList.add("col-3", "col-md-3");
    //
    //
    // var chP = document.createElement("p");
    // chP.classList.add("rosterHead");
    // chCol.appendChild(chP);
    // row.appendChild(chCol);



    var nameCol = document.createElement("div");
    nameCol.classList.add("col-4", "col-md-4");

    var nameP = document.createElement("p");
    nameP.classList.add("rosterHead");
    nameP.innerHTML = "NAME";
    nameCol.appendChild(nameP);
    row.appendChild(nameCol);

    var posCol = document.createElement("div");
    posCol.classList.add("col-2");

    var posP = document.createElement("p");
    posP.classList.add("rosterHead");
    posP.innerHTML = "POS";
    posCol.appendChild(posP);
    row.appendChild(posCol);

    var saveCol = document.createElement("div");
    saveCol.classList.add("col-3", "col-md-3");

    var saveP = document.createElement("p");
    saveP.classList.add("rosterHead");
    saveP.innerHTML = "SALARY";
    saveCol.appendChild(saveP);
    row.appendChild(saveCol);


    var cutCol = document.createElement("div");
    cutCol.classList.add("col-3", "col-md-3");

    var cutP = document.createElement("p");
    cutP.classList.add("rosterHead");
    cutP.innerHTML = "CUT";
    cutCol.appendChild(cutP);
    row.appendChild(cutCol);



    // var chP = document.createElement("p");
    // chP.classList.add("rosterHead");
    // chP.innerHTML = "CUT";
    // chCol.appendChild(chP);
    // row.appendChild(chCol);


    row.style.borderBottom = "1px solid rgb(48 176 251)";

    root.appendChild(row);

    for (let i = 0; i < user.roster.length; i++) {
      var row2 = document.createElement("div");
      row2.classList.add("row");


      var nameCol2 = document.createElement("div");
      nameCol2.classList.add("col-4", "col-md-4");

      var nameP2 = document.createElement("p");
      nameP2.classList.add("rosterName");
      nameP2.innerHTML = user.roster[i].name;
      nameCol2.appendChild(nameP2);
      row2.appendChild(nameCol2);

      var posCol2 = document.createElement("div");
      posCol2.classList.add("col-2");

      var posP2 = document.createElement("p");
      posP2.classList.add("rosterName");
      posP2.innerHTML = user.roster[i].pos;
      posCol2.appendChild(posP2);
      row2.appendChild(posCol2);

       var penCol = document.createElement("div");
       penCol.classList.add("col-3", "col-md-3");

       var penP = document.createElement("p");
       penP.classList.add("rosterName");
       var num = user.roster[i].sal;
       penP.innerHTML = "$" + addCommas(num);
       penCol.appendChild(penP);
       row2.appendChild(penCol);



      if (!signed.includes(user.roster[i]) && user.roster[i].guaranteed === false) {


        console.log(user.roster[i].name);
        // var penCol = document.createElement("div");
        // penCol.classList.add("col-3", "col-md-3");
        //
        // var penP = document.createElement("p");
        // penP.classList.add("rosterName");
        // var num = activeRoster[i].salary - activeRoster[i].capPenalty;
        // if (num < 0) {
        //   penP.style.color = "#ca5656";
        // }
        // penP.innerHTML = "$" + addCommas(num);
        // penCol.appendChild(penP);
        // row2.appendChild(penCol);


        var cutCol = document.createElement("div");
        cutCol.classList.add("col-3");
   ///<i class="fa fa-minus-circle" aria-hidden="true"></i>
        var cutButton = document.createElement("button");
        cutButton.classList.add("rosterCut", "btn");

        cutButton.addEventListener('click', function() {
          cutPlayer(user.roster[i]);
        });

        var icon = document.createElement("i");
        icon.classList.add("fa", "fa-minus-circle", "fa-lg");
        icon.setAttribute("aria-hidden", "true");

        cutButton.appendChild(icon);
        cutCol.appendChild(cutButton);
        row2.appendChild(cutCol);
      }
      root.appendChild(row2);
    }
}

function cutPlayer(guy) {
  cutArr.push(guy);
  const index = user.roster.indexOf(guy);
  user.roster.splice(index, 1);
  updateCapDisplay(); // fix
  generateRoster();
}

function generateSummary() {
  document.getElementById("sCap").innerHTML = "CAP SPACE: $" + addCommas(getCapRoom());
   // generateSRoster();
   var root = document.getElementById("tradedFor");
   while (root.firstChild) {
     root.removeChild(root.firstChild);
   }

   if (tradedFor.length != 0) {
     for (var i = 0; i < tradedFor.length; i++) {
       var row = document.createElement("div");
       row.classList.add("row");
       var col = document.createElement("div");
       col.classList.add("col-12");
       var p = document.createElement("div");
       p.classList.add("sumP");
       if (tradedFor[i].hasOwnProperty("name")) {
         p.innerHTML = tradedFor[i].name;
       } else if (tradedFor[i].hasOwnProperty("name")){
         p.innerHTML = tradedFor[i].name;
       } else {
         p.innerHTML = tradedFor[i];
       }

       col.appendChild(p);
       row.appendChild(col);
       root.appendChild(row);
     }
   } else {
     document.getElementById("tfHead").style.display = "none";
     document.getElementById("tradeForCol").classList.remove("sumCol");
   }
   var root2 = document.getElementById("tradedAway");
   while (root2.firstChild) {
     root2.removeChild(root2.firstChild);
   }
   if (tradedAway.length != 0) {
     for (var i = 0; i < tradedAway.length; i++) {
       var row = document.createElement("div");
       row.classList.add("row");
       var col = document.createElement("div");
       col.classList.add("col-12");
       var p = document.createElement("div");
       p.classList.add("sumP");
       if (tradedAway[i].hasOwnProperty("firstName")) {
         p.innerHTML = tradedAway[i].firstName + " " +  tradedAway[i].lastName;
       } else if (tradedAway[i].hasOwnProperty("name")){
         p.innerHTML = tradedAway[i].name;
       } else {
         p.innerHTML = tradedAway[i];
       }

       col.appendChild(p);
       row.appendChild(col);
       root2.appendChild(row);
     }
   } else {
     document.getElementById("taHead").style.display = "none";
     document.getElementById("tradeAwayCol").classList.remove("sumCol");
   }
   var root3 = document.getElementById("signed");
   while (root3.firstChild) {
     root3.removeChild(root3.firstChild);
   }
   if (signed.length != 0) {
     console.log("signed array = " + signed.length);
     for (var i = 0; i < signed.length; i++) {
       var row = document.createElement("div");
       row.classList.add("row");
       var col = document.createElement("div");
       col.classList.add("col-12");
       var p = document.createElement("div");
       p.classList.add("sumP");
       p.innerHTML = "<b>" + signed[i].name + "</b><br /> (" + signed[i].years + " yr./$" + signed[i].sal + " mil)";

       col.appendChild(p);
       row.appendChild(col);
       root3.appendChild(row);
     }
   } else{
     document.getElementById("sHead").style.display = "none";
     document.getElementById("signCol").classList.remove("sumCol");
   }
   var root4 = document.getElementById("drafted");
   while (root4.firstChild) {
     root4.removeChild(root4.firstChild);
   }
   if (drafted.length != 0) {
     for (var i = 0; i < drafted.length; i++) {
         var row = document.createElement("div");
         row.classList.add("row");
         var col = document.createElement("div");
         col.classList.add("col-12");
         var p = document.createElement("div");
         p.classList.add("sumP");
         p.innerHTML = drafted[i].pos + " " + drafted[i].name;

         col.appendChild(p);
         row.appendChild(col);
         root4.appendChild(row);
     }
   }
}

function advance() {
  document.getElementById("sumCont").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
  generateSummary();
  generateSRoster();
  getRecord();
}

function checkTradeAssets(trade) {
  if (trade.pickText.length > 0) {
            console.log(trade)
    for (let i = 0; i < trade.pickText.length; i++) {
      var pick = trade.pickText[i];
      if (!user.picks.includes(pick)) {

        return false;
      }
    }
  }
  if (trade.receivePlayer.length > 0) {
    for (let i = 0; i < trade.receivePlayer.length; i++) {
      if (user.roster.includes(trade.receivePlayer[i])) {
        return false;
      }
    }
  }
  if (trade.givePlayer.length > 0) {
    for (let i = 0; i < trade.givePlayer.length; i++) {
      if (!user.roster.includes(trade.givePlayer[i])) {
        return false;
      }
    }
  }
  return true;

}

function generateTrades(num) {
  console.log("regular trades");
  var root = document.getElementById("tradeNavCont");
  console.log(num)
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  for (let i = 0; i < user.trades.length; i++) {
    if (checkTradeAssets(user.trades[i])) {
      continue;
    } else {
      user.trades.splice(i, 1);
      i -= 1;
    }
  }

  if (user.trades.length === 0) {
    var buttonRow = document.createElement("div");
    buttonRow.classList.add("row", "text-center");
    var r1 = document.createElement("div");
    r1.classList.add("col-12");
    var p = document.createElement("p");
    p.classList.add("notradeP");
    p.innerHTML = "NO OFFERS FOUND";
    r1.appendChild(p);
    buttonRow.appendChild(r1);
    root.appendChild(buttonRow);
    return;
  }


  var buttonRow = document.createElement("div");
  buttonRow.classList.add("row", "text-center");
  var r1 = document.createElement("div");
  r1.classList.add("col-0", "col-md-3");
  var rbutcol = document.createElement("div");
  rbutcol.classList.add("col-6","col-md-3");
  var lbutcol = document.createElement("div");
  lbutcol.classList.add("col-6", "col-md-3");
  var r2 = document.createElement("div");
  r2.classList.add("col-0", "col-md-3");

  if (num != user.trades.length - 1) {

    var rightButton = document.createElement("button");
    rightButton.setAttribute("onclick", "twoRight()");
    rightButton.classList.add('bttn-md', 'butt', 'tradeButts', "button-38", "advance");
    rightButton.style.marginTop = "10px";
    rightButton.innerHTML = "NEXT";

    rbutcol.appendChild(rightButton);

  }
  if (num != 0) {

    var leftButton = document.createElement("button");
    leftButton.setAttribute("onclick", "twoLeft()");
    leftButton.innerHTML = "PREVIOUS";
    leftButton.style.marginTop = "10px";
    leftButton.classList.add( 'bttn-md', 'butt', 'tradeButts', "button-38", "advance");

    lbutcol.appendChild(leftButton);

  }
    buttonRow.appendChild(r1);
    buttonRow.appendChild(lbutcol);
  buttonRow.appendChild(rbutcol);
    buttonRow.appendChild(r2);

      root.appendChild(buttonRow);

  var row = document.createElement("div");
  row.classList.add("row", "text-center");
  row.style.marginTop = "10px";

  var col1 = document.createElement("div");
  col1.classList.add("col-5", "tradecont");

  var dumcol = document.createElement("div");
  dumcol.classList.add("col-2");

  var col2 = document.createElement("div");
  col2.classList.add("col-5", "tradecont");

  var img = document.createElement("img");
  img.setAttribute("src", user.logo);
  img.classList.add("tradeLogo");

  var otherLogo = "";

  for (let ot = 0; ot < teams.length; ot++) {
    console.log(user.trades[num]);
    if (teams[ot].name === user.trades[num].otherTeam) {
      otherLogo = teams[ot].logo;
    }
  }

  var img2 = document.createElement("img");
  img2.setAttribute("src", otherLogo);
  // console.log(user.trades[num].team.logo)
  img2.classList.add("tradeLogo");

  col1.appendChild(img);
  col2.appendChild(img2);

  for (let k = 0; k < user.trades[num].receiveText.length; k++) {
    var p = document.createElement("p");
    p.innerHTML = user.trades[num].receiveText[k];
    p.classList.add("tradeP");
    col1.appendChild(p);
  }
  for (let j = 0; j < user.trades[num].giveText.length; j++) {
    var p = document.createElement("p");
    p.innerHTML = user.trades[num].giveText[j];
    p.classList.add("tradeP");
    col2.appendChild(p);
  }
  row.appendChild(col1);
    row.appendChild(dumcol);
  row.appendChild(col2);

  var row2 = document.createElement("div");
  row2.classList.add("row", "text-center");
  row2.style.marginTop = "10px";

  var col12 = document.createElement("div");
  col12.classList.add("col-12");

  var p = document.createElement("p");
  p.fontSize = "20px !important";

  // if (getCapRamis() < 0) {
  //   p.innerHTML = "Cap Space Change: " + addCommas(getCapRamis());
  //   p.style.color ="#ffa2a2";
  // } else {
  //   p.innerHTML = "Cap Space Change: +" + addCommas(getCapRamis());
  // }


  col12.appendChild(p);
  row2.appendChild(col12);

  root.appendChild(row);
  root.appendChild(row2);

  var acceptRow = document.createElement("div");
  acceptRow.classList.add("row", "text-center");

  var acceptCol = document.createElement("div");
  acceptCol.classList.add("col-12", "text-center");

  var acceptButton = document.createElement("button");
  acceptButton.classList.add("tradeAcceptButt", "button-38", "signBut");
  acceptButton.innerHTML = "ACCEPT";

  acceptButton.addEventListener('click', function() {
    acceptTrade(user.trades[num]);
  });
  acceptCol.appendChild(acceptButton);
  acceptRow.appendChild(acceptCol);
  root.appendChild(acceptRow);


}

function generateDraftTrades(num) {
  document.getElementById("draftTradeNavCont").style.display = "block";
  var root = document.getElementById("draftTradeNavCont");
  console.log("draft trades");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  for (let i = 0; i < user.draftTrades.length; i++) {
    if (checkTradeAssets(user.draftTrades[i])) {
      continue;
    } else {
      user.draftTrades.splice(i, 1);
      i -= 1;
    }
  }

  if (user.draftTrades.length === 0) {
    return;
  }


  var buttonRow = document.createElement("div");
  buttonRow.classList.add("row", "text-center");
  var r1 = document.createElement("div");
  r1.classList.add("col-0", "col-md-3");
  var rbutcol = document.createElement("div");
  rbutcol.classList.add("col-6","col-md-3");
  var lbutcol = document.createElement("div");
  lbutcol.classList.add("col-6", "col-md-3");
  var r2 = document.createElement("div");
  r2.classList.add("col-0", "col-md-3");

  if (num != user.draftTrades.length - 1) {

    var rightButton = document.createElement("button");
    rightButton.setAttribute("onclick", "threeRight()");
    rightButton.classList.add('bttn-md', 'butt', 'tradeButts', "button-59");
    rightButton.style.marginTop = "10px";
    rightButton.innerHTML = "NEXT";

    rbutcol.appendChild(rightButton);

  }
  if (num != 0) {

    var leftButton = document.createElement("button");
    leftButton.setAttribute("onclick", "threeLeft()");
    leftButton.innerHTML = "PREVIOUS";
    leftButton.style.marginTop = "10px";
    leftButton.classList.add( 'bttn-md', 'butt', 'tradeButts', "button-59");

    lbutcol.appendChild(leftButton);

  }
    buttonRow.appendChild(r1);
    buttonRow.appendChild(lbutcol);
  buttonRow.appendChild(rbutcol);
    buttonRow.appendChild(r2);

      root.appendChild(buttonRow);

  var row = document.createElement("div");
  row.classList.add("row", "text-center");
  row.style.marginTop = "10px";

  var col1 = document.createElement("div");
  col1.classList.add("col-5", "tradecont");

  var dumcol = document.createElement("div");
  dumcol.classList.add("col-2");

  var col2 = document.createElement("div");
  col2.classList.add("col-5", "tradecont");

  var img = document.createElement("img");
  img.setAttribute("src", user.logo);
  img.classList.add("tradeLogo");

  var otherLogo = "";

  for (let ot = 0; ot < teams.length; ot++) {
    console.log(num);
    console.log(user.draftTrades[num]);
    if (teams[ot].name === user.draftTrades[num].otherTeam) {
      otherLogo = teams[ot].logo;
    }
  }

  var img2 = document.createElement("img");
  img2.setAttribute("src", otherLogo);
  // console.log(user.trades[num].team.logo)
  img2.classList.add("tradeLogo");

  col1.appendChild(img);
  col2.appendChild(img2);

  for (let k = 0; k < user.draftTrades[num].receiveText.length; k++) {
    var p = document.createElement("p");
    p.innerHTML = user.draftTrades[num].receiveText[k];
    p.classList.add("drafttradeP");
    col1.appendChild(p);
  }
  for (let j = 0; j < user.draftTrades[num].giveText.length; j++) {
    var p = document.createElement("p");
    p.innerHTML = user.draftTrades[num].giveText[j];
    p.classList.add("drafttradeP");
    col2.appendChild(p);
  }
  row.appendChild(col1);
    row.appendChild(dumcol);
  row.appendChild(col2);

  var row2 = document.createElement("div");
  row2.classList.add("row", "text-center");
  row2.style.marginTop = "10px";

  var col12 = document.createElement("div");
  col12.classList.add("col-12");

  var p = document.createElement("p");
  p.fontSize = "20px !important";

  // if (getCapRamis() < 0) {
  //   p.innerHTML = "Cap Space Change: " + addCommas(getCapRamis());
  //   p.style.color ="#ffa2a2";
  // } else {
  //   p.innerHTML = "Cap Space Change: +" + addCommas(getCapRamis());
  // }


  col12.appendChild(p);
  row2.appendChild(col12);

  root.appendChild(row);
  root.appendChild(row2);

  var acceptRow = document.createElement("div");
  acceptRow.classList.add("row", "text-center");

  var acceptCol = document.createElement("div");
  acceptCol.classList.add("col-12", "text-center");

  var acceptButton = document.createElement("button");
  acceptButton.classList.add("tradeAcceptButt", "button-59");
  acceptButton.innerHTML = "ACCEPT";

  acceptButton.addEventListener('click', function() {
    acceptDraftTrade(user.draftTrades[num]);
  });
  acceptCol.appendChild(acceptButton);
  acceptRow.appendChild(acceptCol);
  root.appendChild(acceptRow);

  var homeRow = document.createElement("div");
  homeRow.classList.add("row", "text-center");

  var homeCol = document.createElement("div");
  homeCol.classList.add("col-12", "text-center");

  var homeButton = document.createElement("button");
  homeButton.classList.add("tradeAcceptButt", "button-59");
  homeButton.innerHTML = "BACK TO DRAFT";

  homeButton.addEventListener('click', function() {
    document.getElementById("draftHeader").style.display = "block";
    document.getElementById("draftTradeNavCont").style.display = "none";
  });
  homeCol.appendChild(homeButton);
  homeRow.appendChild(homeCol);
  root.appendChild(homeRow);
}

function exploreTrades() {
  document.getElementById("draftHeader").style.display = "none";
  generateDraftTrades(0);
}

function acceptTrade(trade) {
  // for (var i = 0; i < trade.giveIndex.length; i++) {
  //   draftOrder[twoTradeArr[twoNav].giveIndex[i][0]][trade.giveIndex[i][1]] = trade.team;
  //
  // }
  // for (var i = 0; i < trade.receiveIndex.length; i++) {
  //   draftOrder[trade.receiveIndex[i][0]][trade.receiveIndex[i][1]] = yourTeam;
  //
  // }
  for (var i = 0; i < trade.pickText.length; i++) {
    const index2 =  user.picks.indexOf(trade.pickText[i]);
    user.picks.splice(index2, 1);
  }
  for (var i = 0; i < trade.receiveText.length; i++) {
    tradedFor.push(trade.receiveText[i]);
  }
  for (var i = 0; i < trade.giveText.length; i++) {
    tradedAway.push(trade.giveText[i]);
  }
  for (var i = 0; i < trade.givePlayer.length; i++) {
    const index2 =  user.roster.indexOf(trade.givePlayer[i]);
    user.roster.splice(index2, 1);
  }
  for (var i = 0; i < trade.receivePlayer.length; i++) {
    user.roster.push(trade.receivePlayer[i]);
    if (freeAgents.includes(trade.receivePlayer[i])) {
      const index2 =  freeAgents.indexOf(trade.receivePlayer[i]);
      freeAgents.splice(index2, 1);
    }
  }

  console.log("trades: " + user.trades);

  generateTrades(0);
  updateCapDisplay();
  rosterNav();
}

function acceptDraftTrade(trade) {
  var otTeam;
  for (var i = 0; i < teams.length; i++) {
    if (teams[i].name === trade.otherTeam) {
      otTeam = teams[i];
    }
  }

  for (var i = 0; i < trade.giveIndex.length; i++) {
    draftOrder[trade.giveIndex[i]] = otTeam;

  }
  for (var i = 0; i < trade.receiveIndex.length; i++) {
    draftOrder[trade.receiveIndex[i]] = user;

  }
  for (var i = 0; i < trade.pickText.length; i++) {
    const index2 =  user.picks.indexOf(trade.pickText[i]);
    user.picks.splice(index2, 1);
  }
  for (var i = 0; i < trade.receiveText.length; i++) {
    tradedFor.push(trade.receiveText[i]);
  }
  for (var i = 0; i < trade.giveText.length; i++) {
    tradedAway.push(trade.giveText[i]);
  }
  for (var i = 0; i < trade.givePlayer.length; i++) {
    const index2 =  user.roster.indexOf(trade.givePlayer[i]);
    user.roster.splice(index2, 1);
  }
  for (var i = 0; i < trade.receivePlayer.length; i++) {
    user.roster.push(trade.receivePlayer[i]);
  }

  draftTradeDone();
  updateCapDisplay();
}

function draftTradeDone() {
    document.getElementById("draftHeader").style.display = "block";
    document.getElementById("draftTradeNavCont").style.display = "none";
    document.getElementById("exploreButton").style.display = "none";
}

function sMoves() {
  document.getElementById("sMoves").style.display = "flex";
  document.getElementById("sRoster").style.display = "none";
}

function sRoster() {
  document.getElementById("sMoves").style.display = "none";
  document.getElementById("sRoster").style.display = "block";
}

function getRecord() {
  var here = document.getElementById("recordP");
  user.roster.sort(function(a, b){return b.wA-a.wA});
  for (let i = 0; i < 8; i++) {
    if (user.roster[i].hasOwnProperty('wA')) {
      wins += user.roster[i].wA;
    }
  }
  wins *= 1.14;
  // wins *= 1.138;
  wins = Math.round(wins);

  losses = 82 - wins;

  here.innerHTML = wins + " - " + losses;
  console.log(wins + " - " + losses)
}

function getStarters() {

  var g = 0;
  var f = 0;
  var c = 0;

  for (let i = 0; i < user.roster.length; i++) {
    if (starters.length === 5) {
      break;
    }
    if (user.roster[i].pos === "PG" || user.roster[i].pos === "SG" || user.roster[i].pos === "G") {
      if (g < 4) {
        starters.push(user.roster[i]);
        g++;
      } else {
        continue;
      }
    }
    if (user.roster[i].pos === "PF" || user.roster[i].pos === "SF" || user.roster[i].pos === "F") {
      if (f < 4) {
        starters.push(user.roster[i]);
        f++;
      } else {
        continue;
      }
    }
    if (user.roster[i].pos === "C") {
      if (c < 1) {
        starters.push(user.roster[i]);
        c++;
      } else {
        continue;
      }
    }
  }
}

function generateSRoster() {
  // var root = document.getElementById("sRoster");
  // while (root.firstChild) {
  //   root.removeChild(root.firstChild);
  // }


  var test = document.getElementById("sOffense");

  user.roster.sort(function(a, b){return b.wA-a.wA});

  getStarters();

  var rowS = document.createElement("div");
  rowS.classList.add("row", "text-center");

  for (let i = 0; i < 3; i++) {

    var imgCol2 = document.createElement("div");
    imgCol2.classList.add("col-4", "col-md-4", "starter");

    var img = document.createElement("img");
    img.setAttribute("src", starters[i].img);
    img.classList.add("starterImg");

    imgCol2.appendChild(img);
    rowS.appendChild(imgCol2);

  }
  test.appendChild(rowS);

  var rowSt = document.createElement("div");
  rowSt.classList.add("row", "text-center");
  rowSt.style.marginBottom = "10px";

  for (let i = 3; i < 5; i++) {


    var imgCol = document.createElement("div");
    imgCol.classList.add("col-2", "col-md-2");

    var imgCol2 = document.createElement("div");
    imgCol2.classList.add("col-4", "col-md-4", "starter");

    var img = document.createElement("img");
    img.setAttribute("src", starters[i].img);
    img.classList.add("starterImg");


    imgCol2.appendChild(img);

    if (i === 3) {
      rowSt.appendChild(imgCol);
      rowSt.appendChild(imgCol2);
    } else {
      rowSt.appendChild(imgCol2);
      rowSt.appendChild(imgCol);

    }

  }
  test.appendChild(rowSt);

  for (let i = 0; i < user.roster.length; i++) {

    if (starters.includes(user.roster[i])) {
      continue;
    }

    var row2 = document.createElement("div");
    row2.classList.add("row");

    var posCol2 = document.createElement("div");
    posCol2.classList.add("col-3", "col-md-2");

    var posP2 = document.createElement("p");
    posP2.classList.add("rosterPos");
    posP2.style.marginBottom = "0px";
    posP2.innerHTML = user.roster[i].pos;
    posCol2.appendChild(posP2);
    row2.appendChild(posCol2);

    var nameCol2 = document.createElement("div");
    nameCol2.classList.add("col-9", "col-md-8");

    var nameP2 = document.createElement("p");
    nameP2.classList.add("rosterName");
    nameP2.style.marginBottom = "0px";
    nameP2.innerHTML = user.roster[i].name;
    nameCol2.appendChild(nameP2);
    row2.appendChild(nameCol2);



    test.appendChild(row2);
  }
}

function restart() {
  location.reload();
}
