var startCont = document.getElementById("startCont");
var introCont = document.getElementById("introCont");
var draftCont = document.getElementById("draftCont");
var draftPoolCont = document.getElementById("draftPoolCont");

var draftSummary = [];
var leftOff = 0;
var showAmount = 0;
var leftOffShow = 0;
var offeredArr = [];
var knicksPicks = [];
var signedArr = [];
var broadFASigned = [];
var tradedFor = [];
var tradedAway = [];
var tradesNav = 0;
var potentialTrades = [];
var currkind = "all";
var preDraftTrade;
var filteredFA = [];
var starters = [];
var wins = 0;
var tradeUp = false;
var runs = 0;
var formerKnicksCount = 0;
var rosterHistory = [];
// 0: roster, 1: wins, 2: tradeUp, 3: # of broadFA, 4: # of teamFA

var historyTradeUp = false;
var historyBroadFA = 0;
var historyTeamFA = 0;




console.log(runs);

// str_runs = localStorage.getItem("runs");
// //get a numeric value from str_count, put it in count
// if (str_runs == null || str_runs == "null"){
//   runs = 0;
// } else {
//   runs = parseInt(str_runs);
// }

if (localStorage.getItem("badgesStored")) {
  badges = JSON.parse(localStorage.getItem("badgesStored"));
}

if (localStorage.getItem("rosterHistory")) {
  rosterHistory = JSON.parse(localStorage.getItem("rosterHistory"));
}




function getSalary() {
  var total = 0;
  for (let i = 0; i < roster.length; i++) {
    total += roster[i].sal;
  }
  // console.log("Roster Salary = " + total);
}

function startPressed() {
  startCont.classList.add("slide-out-left");
  setTimeout(function(){
    startCont.style.display = "none";
    introCont.style.display = "block";
  }, 500);

  for (let i = 0; i < draftPlayers.length; i++) {
    draftPlayers[i].rank = i;
    console.log(i + " " + draftPlayers[i].lastName);
  }
  filterFreeAgents();
}

function badgesPressed() {
  startCont.style.display = "none";
  badgesCont.style.display = "block";
  generateBadges();
}

function historyPressed() {
  startCont.style.display = "none";
  historyCont.style.display = "block";
  generateHistory();
}

function badgesBack() {
  startCont.style.display = "block";
  badgesCont.style.display = "none";
}

function historyBack() {
  startCont.style.display = "block";
  historyCont.style.display = "none";
}

function generateBadges() {
  var root = document.getElementById("badgesShelf");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  var row = document.createElement("div");
  row.classList.add("row", "text-center");
  for (let i = 0; i < badges.length; i++) {
    if (badges[i].won) {
      var col = document.createElement("div");
      col.classList.add("col-6", "col-md-3");
      var img = document.createElement("img");
      img.classList.add("badgeImg");
      img.setAttribute("src", badges[i].img);
      var title = document.createElement("p");
      title.classList.add("badgeTitle");
      title.innerHTML = badges[i].title;
      var desc = document.createElement("p");
      desc.classList.add("badgeDesc");
      desc.innerHTML = badges[i].desc;
      col.appendChild(img);
          col.appendChild(title);
              col.appendChild(desc);
                  row.appendChild(col);

    } else {
      continue;
    }
  }
  for (let i = 0; i < badges.length; i++) {
    if (!badges[i].won) {
      var col = document.createElement("div");
      col.classList.add("col-6", "col-md-3");
      var img = document.createElement("img");
      img.classList.add("badgeImg");
      img.setAttribute("src", "nobadge.png");
      var title = document.createElement("p");
      title.classList.add("badgeTitle");
      title.innerHTML = "????";
      col.appendChild(img);
      col.appendChild(title);
      row.appendChild(col);
    } else {
      continue;
    }
  }
  root.appendChild(row);
}

function checkBadges() {
  if (wins >= 30) {
    badges[badges.indexOf(thirtyPlus)].won = true;
  }
  if (wins >= 40) {
    badges[badges.indexOf(fortyPlus)].won = true;
  }
  if (wins >= 50) {
    badges[badges.indexOf(fiftyPlus)].won = true;
  }
  if (tradeUp) {
    badges[badges.indexOf(movingUp)].won = true;
  }
  if (broadFASigned.length === 0 && tradedFor.length === 0) {
    badges[badges.indexOf(runItBack)].won = true;
  }
  if (runs === 10) {
    badges[badges.indexOf(tenRuns)].won = true;
  }
  if (runs === 25) {
    badges[badges.indexOf(twentyFiveRuns)].won = true;
  }
  if (runs === 50) {
    badges[badges.indexOf(fiftyRuns)].won = true;
  }
  if (runs === 100) {
    badges[badges.indexOf(hundredRuns)].won = true;
  }
  if (fired) {
    badges[badges.indexOf(fired)].won = true;
  }
  if (roster.length > 15) {
    badges[badges.indexOf(fullHouse)].won = true;
  }
  if (roster.length < 10) {
    badges[badges.indexOf(tightCircle)].won = true;
  }
  console.log(badges);
  localStorage.setItem("badgesStored", JSON.stringify(badges));

}

function badgeAlert(badge) {

  var root = document.getElementById("badgePop");
  var row = document.createElement("div");
  row.classList.add("row", "text-center", "slide-in-top");

  var imgCol = document.createElement("div");
  imgCol.classList.add("col-12");

  var img = document.createElement("img");
  img.classList.add("badgePopImg");
  img.setAttribute("src", badge.img);

  imgCol.appendChild(img);

  var pCol = document.createElement("div");
  pCol.classList.add("col-12");

  var p = document.createElement("div");
  p.classList.add("badgePopText");
  p.innerHTML = "NEW BADGE!"

  pCol.appendChild(p);
  row.appendChild(imgCol);
  row.appendChild(pCol);
  root.appendChild(row);

  setTimeout(function(){
    row.classList.remove("slide-in-top");
    row.classList.add("fade-out-bck");
  }, 1500);

  setTimeout(function(){
    root.removeChild(row);
  }, 2100);

}

function filterFreeAgents() {
  for (var i = 0; i < broadFA.length; i++) {
    if (broadFA[i].cTotal > 0) {
      filteredFA.push(broadFA[i]);
    }
  }
}

function introPressed() {
  introCont.style.display = "none";
  draftCont.style.display = "block";
  document.body.style.backgroundImage = "url('paperWhite.jpg')";
  displayPreDraftTrade();
  // draftSim();
}

function draftDone() {
  draftBar.classList.add("slide-out-left");
  draftLogo.classList.add("slide-out-right");
  draftPoolCont.classList.add("slide-out-left");
  setTimeout(function(){
      document.body.style.backgroundImage = "url('paper.jpg')";
      document.getElementById("draftCont").style.display = "none";
      document.getElementById("teamCont").style.display = "block";
      if (knicksPicks.length === 3) {
        if (preDraftTrade === "Spurs") {
          knicksPicks[0].sal = 3193200;
          knicksPicks[1].sal = 1000000;
          knicksPicks[2].sal = 1000000;
        } else {
          knicksPicks[0].sal = 3033500;
          knicksPicks[1].sal = 1000000;
          knicksPicks[2].sal = 1000000;
        }
      } else {
        knicksPicks[0].sal = 2241600;
        knicksPicks[1].sal = 2042600;
        knicksPicks[2].sal = 1000000;
        knicksPicks[3].sal = 1000000;
      }
      generateRoster();
      updateCapBar();
      faNav();
  }, 500);


}

function teamDone() {
  teamCont.classList.add("slide-out-left");
  setTimeout(function(){
    document.getElementById("teamCont").style.display = "none";
    document.getElementById("faCont").style.display = "block";
  }, 500);
  generateRoster2();
  updateCapBar2();
  fa2Nav();
}

function faDone() {
  document.getElementById("faCont").style.display = "none";
  // document.getElementById("faCont").style.display = "block";
  document.getElementById("summary").style.display = "block";
  generateSummary();
    getRecord();
  if (wins >= 30) {
    if (!badges[0].won) {
      badges[0].won = true;
      badgeAlert(thirtyPlus);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }
  }
  if (wins >= 40) {
    if (!badges[1].won) {
      badges[1].won = true;
      badgeAlert(fortyPlus);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }
  }
  if (wins >= 50) {
    if (!badges[2].won) {
      badges[2].won = true;
      badgeAlert(fiftyPlus);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }
  }
  if (broadFASigned.length === 0 && tradedFor.length === 0) {
    if (!badges[4].won) {
      badges[4].won = true;
      badgeAlert(runItBack);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }
  }
  rosterHistory.push([roster, wins, historyTradeUp, historyBroadFA, historyTeamFA]);
  if (rosterHistory.length === 10) {
    if (!badges[5].won) {
      badges[5].won = true;
      badgeAlert(tenRuns);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }
  }
  if (rosterHistory.length === 25) {
    if (!badges[6].won) {
      badges[6].won = true;
      badgeAlert(twentyFiveRuns);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }
  }
  if (rosterHistory.length === 50) {
    if (!badges[7].won) {
      badges[7].won = true;
      badgeAlert(fiftyRuns);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }
  }
  if (rosterHistory.length === 100) {
    if (!badges[8].won) {
      badges[8].won = true;
      badgeAlert(hundredRuns);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }
  }
  if (roster.length > 15) {
    if (!badges[10].won) {
      badges[10].won = true;
      badgeAlert(fullHouse);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }
  }
  if (roster.length < 10) {
    if (!badges[11].won) {
      badges[11].won = true;
      badgeAlert(tightCircle);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }
  }
  console.log(getCapRoom());
  if (getCapRoom() > 40000000) {
    if (!badges[13].won) {
      badges[13].won = true;
      badgeAlert(hoarder);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }
  }
  // localStorage.setItem("runs", runs);

  localStorage.setItem("rosterHistory", JSON.stringify(rosterHistory));
  // checkBadges();
}

function displayPreDraftTrade() {
  var num = (Math.floor(Math.random() * 100));
  if (num >= 75) {
    preDraftTrade = "Spurs";

    document.getElementById("preLogo").src = spurs.logo;
    document.getElementById("preDraftDisplay").innerHTML = "The Spurs would like to move back in the draft. Are you interested in trading picks 19 and 21 for pick 12?";
  } else {
    preDraftTrade = "Pacers";

    document.getElementById("preLogo").src = pacers.logo;
    document.getElementById("preDraftDisplay").innerHTML = "The Pacers would like to move back in the draft. Are you interested in trading picks 19 and 21 for pick 13?";
  }
}

function preYesTrade() {
    tradeUp = true;
    historyTradeUp = true;
    //// badge
    console.log(badges);
    if (!badges[3].won) {
      badges[3].won = true;
      badgeAlert(movingUp);
      localStorage.setItem("badgesStored", JSON.stringify(badges));
    }


    if (preDraftTrade === "Spurs") {
      draftOrder[11] = knicks;
      draftOrder[18] = spurs;
      draftOrder[20] = spurs;
    }
    if (preDraftTrade === "Pacers") {
      draftOrder[12] = knicks;
      draftOrder[18] = pacers;
      draftOrder[20] = pacers;
    }

    document.getElementById("pre").style.display = "none";
    document.getElementById("draftBar").style.display = "flex";
    draftSim();

}

function preNoTrade() {
  document.getElementById("pre").style.display = "none";
  document.getElementById("draftBar").style.display = "flex";
  draftSim();
}

function getStarters() {

  var g = 0;
  var f = 0;
  var c = 0;

  for (let i = 0; i < roster.length; i++) {
    if (starters.length === 5) {
      break;
    }
    if (roster[i].pos === "PG" || roster[i].pos === "SG" || roster[i].pos === "G") {
      if (g < 4) {
        starters.push(roster[i]);
        g++;
      } else {
        continue;
      }
    }
    if (roster[i].pos === "PF" || roster[i].pos === "SF" || roster[i].pos === "F") {
      if (f < 4) {
        starters.push(roster[i]);
        f++;
      } else {
        continue;
      }
    }
    if (roster[i].pos === "C") {
      if (c < 1) {
        starters.push(roster[i]);
        c++;
      } else {
        continue;
      }
    }
  }
}

function getStartersUniv(rost) {

  rost.sort(function(a, b){return b.ws-a.ws});

  var g = 0;
  var f = 0;
  var c = 0;
  var start = [];

  for (let i = 0; i < rost.length; i++) {
    if (start.length === 5) {
      break;
    }
    if (rost[i].pos === "PG" || rost[i].pos === "SG" || rost[i].pos === "G") {
      if (g < 4) {
        start.push(rost[i]);
        g++;
      } else {
        continue;
      }
    }
    if (rost[i].pos === "PF" || rost[i].pos === "SF" || rost[i].pos === "F") {
      if (f < 4) {
        start.push(rost[i]);
        f++;
      } else {
        continue;
      }
    }
    if (rost[i].pos === "C") {
      if (c < 1) {
        start.push(rost[i]);
        c++;
      } else {
        continue;
      }
    }
  }
  return start;
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function generateHistory() {

  var root = document.getElementById("historyShelf");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  rosterHistory.reverse();

  var allTimeWins = 0;
  var allTimeTradeUps = 0;
  var allTimeBroadFA = 0;
  var allTimeTeamFA = 0;


  for (let k = 0; k < rosterHistory.length; k++) {
    allTimeWins += rosterHistory[k][1];
    if (rosterHistory[k][2]) {
      allTimeTradeUps += 1;
    }
    allTimeBroadFA += rosterHistory[k][3];
    allTimeTeamFA += rosterHistory[k][4];
  }

  var rowRecord = document.createElement("div");
  rowRecord.classList.add("row", "text-center");


  var colRecord = document.createElement("div");
  colRecord.classList.add("col-12");


  var pRecord = document.createElement("p");
  pRecord.classList.add('allTimeRecord');
  pRecord.innerHTML = "TOTAL RECORD: " + allTimeWins + " - " + ((rosterHistory.length * 82) - allTimeWins);

  var colOther = document.createElement("div");
  colOther.classList.add("otherCol");
  colOther.classList.add("col-12");

  var pPerc = document.createElement("p");
  // pPerc.classList.add('');
  var percentage = round(((allTimeWins / (rosterHistory.length * 82)) * 100), 2);
  pPerc.innerHTML = "Win Percentage: " + percentage + "%";

  var pTU = document.createElement("p");
  // pPerc.classList.add('');
  var tupercentage = round(((allTimeTradeUps / rosterHistory.length) * 100), 2);
  pTU.innerHTML = "You trade up in the draft " + tupercentage + "% of the time.";

  var pBF = document.createElement("p");
  // pPerc.classList.add('');
  var averageBF = round((allTimeBroadFA / rosterHistory.length), 2);
  pBF.innerHTML = "You sign an average of " + averageBF + " (non-Knicks) free agents per sim.";

  var pTF = document.createElement("p");
  // pPerc.classList.add('');
  var averageTF = round((allTimeTeamFA / rosterHistory.length), 2);
  pTF.innerHTML = "You re-sign an average of " + averageTF + " Knicks free agents per sim.";

  if (rosterHistory.length > 0) {
    colOther.appendChild(pPerc);
    colOther.appendChild(pTU);
    colOther.appendChild(pBF);
    colOther.appendChild(pTF);
  }

  colRecord.appendChild(pRecord);
  rowRecord.appendChild(colRecord);
  rowRecord.appendChild(colOther);
  root.appendChild(rowRecord);

  for (let j = 0; j < rosterHistory.length; j++) {

    var rowRecord = document.createElement("div");
    rowRecord.classList.add("row", "text-center");

    var colRecord = document.createElement("div");
    colRecord.classList.add("col-12");

    var pRecord = document.createElement("p");
    pRecord.classList.add('historyRecord');
    pRecord.innerHTML = rosterHistory[j][1] + " - " + (82 - rosterHistory[j][1]);

    colRecord.appendChild(pRecord);
    rowRecord.appendChild(colRecord);
    root.appendChild(rowRecord);

    var star = getStartersUniv(rosterHistory[j][0]);
    console.log(star);

    var rowS = document.createElement("div");
    rowS.classList.add("row", "text-center");

    for (let i = 0; i < 3; i++) {

      var imgCol2 = document.createElement("div");
      imgCol2.classList.add("col-4", "col-md-4", "starter");

      var img = document.createElement("img");
      img.setAttribute("src", star[i].img);
      img.classList.add("starterImg");

      imgCol2.appendChild(img);
      rowS.appendChild(imgCol2);
    }

    var rowSt = document.createElement("div");
    rowSt.classList.add("row", "text-center");
    rowSt.style.borderBottom = "2px solid white";
    rowSt.style.paddingBottom = "20px";


    for (let i = 3; i < 5; i++) {


      var imgCol = document.createElement("div");
      imgCol.classList.add("col-2", "col-md-2");

      var imgCol2 = document.createElement("div");
      imgCol2.classList.add("col-4", "col-md-4", "starter");

      var img = document.createElement("img");
      img.setAttribute("src", star[i].img);
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
    root.appendChild(rowS);
    root.appendChild(rowSt);
  }

}

function generateSRoster() {
  // var root = document.getElementById("sRoster");
  // while (root.firstChild) {
  //   root.removeChild(root.firstChild);
  // }


  var test = document.getElementById("sOffense");

  roster.sort(function(a, b){return b.ws-a.ws});

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

  for (let i = 0; i < roster.length; i++) {

    if (starters.includes(roster[i])) {
      continue;
    }

    var row2 = document.createElement("div");
    row2.classList.add("row");

    var posCol2 = document.createElement("div");
    posCol2.classList.add("col-3", "col-md-2");

    var posP2 = document.createElement("p");
    posP2.classList.add("rosterPos");
    posP2.style.marginBottom = "0px";
    posP2.innerHTML = roster[i].pos;
    posCol2.appendChild(posP2);
    row2.appendChild(posCol2);

    var nameCol2 = document.createElement("div");
    nameCol2.classList.add("col-9", "col-md-8");

    var nameP2 = document.createElement("p");
    nameP2.classList.add("rosterName");
    nameP2.style.marginBottom = "0px";
    nameP2.innerHTML = roster[i].firstName + " " + roster[i].lastName;
    nameCol2.appendChild(nameP2);
    row2.appendChild(nameCol2);



    test.appendChild(row2);
  }
}

// function getRecord() {
//   var here = document.getElementById("summaryHead");
//   var wins = 0;
//   for (let i = 0; i < roster.length; i++) {
//     if (roster[i].hasOwnProperty("ws")) {
//       wins += roster[i].ws;
//     }
//   }
//   wins *= 1.138;
//   // wins += 3;
//   wins = Math.round(wins);
//
//   losses = 82 - wins;
//
//   here.innerHTML = wins + " - " + losses;
// }

function getRecord() {
  var here = document.getElementById("summaryHead");
  roster.sort(function(a, b){return b.ws-a.ws});
  for (let i = 0; i < 8; i++) {
    if (roster[i].hasOwnProperty('ws')) {
      wins += roster[i].ws;
    }
  }
  wins *= 1.17;
  wins *= 1.138;
  wins = Math.round(wins);

  losses = 82 - wins;

  here.innerHTML = wins + " - " + losses;
}


function generateSummary() {
  document.getElementById("sCap").innerHTML = "CAP SPACE: $" + addCommas(getCapRoom());
  generateSRoster();
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
      if (tradedFor[i].hasOwnProperty("firstName")) {
        p.innerHTML = tradedFor[i].firstName + " " +  tradedFor[i].lastName;
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
  }
  var root3 = document.getElementById("signed");
  while (root3.firstChild) {
    root3.removeChild(root3.firstChild);
  }
  if (signedArr.length != 0) {
    for (var i = 0; i < signedArr.length; i++) {
      var row = document.createElement("div");
      row.classList.add("row");
      var col = document.createElement("div");
      col.classList.add("col-12");
      var p = document.createElement("div");
      p.classList.add("sumP");
      p.innerHTML = "<b>" + signedArr[i].firstName + " " + signedArr[i].lastName + "</b><br /> (" + signedArr[i].cYears + " yr./$" + signedArr[i].cTotal + " mil)";

      col.appendChild(p);
      row.appendChild(col);
      root3.appendChild(row);
    }
  } else{
    document.getElementById("sHead").style.display = "none";
  }
  var root4 = document.getElementById("drafted");
  while (root4.firstChild) {
    root4.removeChild(root4.firstChild);
  }
  if (knicksPicks.length != 0) {
    for (var i = 0; i < knicksPicks.length; i++) {
        var row = document.createElement("div");
        row.classList.add("row");
        var col = document.createElement("div");
        col.classList.add("col-12");
        var p = document.createElement("div");
        p.classList.add("sumP");
        p.innerHTML = knicksPicks[i].pos + " " + knicksPicks[i].firstName + " " + knicksPicks[i].lastName;

        col.appendChild(p);
        row.appendChild(col);
        root4.appendChild(row);
    }
  }

}

function sMoves() {
  document.getElementById("sMoves").style.display = "flex";
  document.getElementById("sRoster").style.display = "none";
}

function sRoster() {
  document.getElementById("sMoves").style.display = "none";
  document.getElementById("sRoster").style.display = "block";

}

function generateRoster2() {
  var root = document.getElementById("roster2NavCont");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  var row = document.createElement("div");
  row.classList.add("row");

  var posCol = document.createElement("div");
  posCol.classList.add("col-3");

  var posP = document.createElement("p");
  posP.classList.add("rosterHead");
  posP.innerHTML = "POS";
  posCol.appendChild(posP);
  row.appendChild(posCol);

  var nameCol = document.createElement("div");
  nameCol.classList.add("col-5", "col-md-5");

  var nameP = document.createElement("p");
  nameP.classList.add("rosterHead");
  nameP.innerHTML = "NAME";
  nameCol.appendChild(nameP);
  row.appendChild(nameCol);

  var saveCol = document.createElement("div");
  saveCol.classList.add("col-4", "col-md-4");

  var saveP = document.createElement("p");
  saveP.classList.add("rosterHead");
  saveP.innerHTML = "SALARY";
  saveCol.appendChild(saveP);
  row.appendChild(saveCol);

  // var chCol = document.createElement("div");
  // chCol.classList.add("col-3", "col-md-3");
  //
  // var chP = document.createElement("p");
  // chP.classList.add("rosterHead");
  // chP.innerHTML = "CUT";
  // chCol.appendChild(chP);
  // row.appendChild(chCol);

  row.style.borderBottom = "1px solid #125740";

  root.appendChild(row);

  for (let i = 0; i < roster.length; i++) {
    var row2 = document.createElement("div");
    row2.classList.add("row");

    var posCol2 = document.createElement("div");
    posCol2.classList.add("col-3");

    var posP2 = document.createElement("p");
    posP2.classList.add("rosterPos");
    posP2.innerHTML = roster[i].pos;
    posCol2.appendChild(posP2);
    row2.appendChild(posCol2);

    var nameCol2 = document.createElement("div");
    nameCol2.classList.add("col-5", "col-md-5");

    var nameP2 = document.createElement("p");
    nameP2.classList.add("rosterName");
    nameP2.innerHTML = roster[i].firstName + " " + roster[i].lastName;
    nameCol2.appendChild(nameP2);
    row2.appendChild(nameCol2);
    root.appendChild(row2);

    var penCol = document.createElement("div");
    penCol.classList.add("col-4", "col-md-4");

    var penP = document.createElement("p");
    penP.classList.add("rosterName");
    var num = roster[i].sal;
    penP.innerHTML = "$" + addCommas(num);
    penCol.appendChild(penP);
    row2.appendChild(penCol);
  }
}


function generateRoster() {
  var root = document.getElementById("rosterNavCont");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  var row = document.createElement("div");
  row.classList.add("row");

  var posCol = document.createElement("div");
  posCol.classList.add("col-3");

  var posP = document.createElement("p");
  posP.classList.add("rosterHead");
  posP.innerHTML = "POS";
  posCol.appendChild(posP);
  row.appendChild(posCol);

  var nameCol = document.createElement("div");
  nameCol.classList.add("col-5", "col-md-5");

  var nameP = document.createElement("p");
  nameP.classList.add("rosterHead");
  nameP.innerHTML = "NAME";
  nameCol.appendChild(nameP);
  row.appendChild(nameCol);

  var saveCol = document.createElement("div");
  saveCol.classList.add("col-4", "col-md-4");

  var saveP = document.createElement("p");
  saveP.classList.add("rosterHead");
  saveP.innerHTML = "SALARY";
  saveCol.appendChild(saveP);
  row.appendChild(saveCol);

  // var chCol = document.createElement("div");
  // chCol.classList.add("col-3", "col-md-3");
  //
  // var chP = document.createElement("p");
  // chP.classList.add("rosterHead");
  // chP.innerHTML = "CUT";
  // chCol.appendChild(chP);
  // row.appendChild(chCol);

  row.style.borderBottom = "1px solid #125740";

  root.appendChild(row);

  for (let i = 0; i < roster.length; i++) {
    var row2 = document.createElement("div");
    row2.classList.add("row");

    var posCol2 = document.createElement("div");
    posCol2.classList.add("col-3");

    var posP2 = document.createElement("p");
    posP2.classList.add("rosterPos");
    posP2.innerHTML = roster[i].pos;
    posCol2.appendChild(posP2);
    row2.appendChild(posCol2);

    var nameCol2 = document.createElement("div");
    nameCol2.classList.add("col-5", "col-md-5");

    var nameP2 = document.createElement("p");
    nameP2.classList.add("rosterName");
    nameP2.innerHTML = roster[i].firstName + " " + roster[i].lastName;
    nameCol2.appendChild(nameP2);
    row2.appendChild(nameCol2);
    root.appendChild(row2);

    var penCol = document.createElement("div");
    penCol.classList.add("col-4", "col-md-4");

    var penP = document.createElement("p");
    penP.classList.add("rosterName");
    var num = roster[i].sal;
    penP.innerHTML = "$" + addCommas(num);
    penCol.appendChild(penP);
    row2.appendChild(penCol);
  }
}

function faNav() {
  document.getElementById("rosterNavCont").style.display = "none";
  document.getElementById("faNavCont").style.display = "block";
  generateTeamFA();
  updateCapBar();
}

function rosterNav() {
  document.getElementById("rosterNavCont").style.display = "block";
  document.getElementById("faNavCont").style.display = "none";
  updateCapBar();
}

function fa2Nav() {
  document.getElementById("roster2NavCont").style.display = "none";
  document.getElementById("trade2NavCont").style.display = "none";
  document.getElementById("fa2NavCont").style.display = "block";
  document.getElementById("broadSort").style.display = "block";
    document.getElementById("dropdownMenuButton").style.display = "block";
  currKind = "all";
  generateBroadFA(currKind);
  updateCapBar2();
}

function roster2Nav() {
  document.getElementById("roster2NavCont").style.display = "block";
  document.getElementById("trade2NavCont").style.display = "none";
  document.getElementById("fa2NavCont").style.display = "none";
  document.getElementById("broadSort").style.display = "none";
      document.getElementById("dropdownMenuButton").style.display = "none";
  generateRoster2();
  updateCapBar2();
}

function trade2Nav() {
  document.getElementById("roster2NavCont").style.display = "none";
  document.getElementById("trade2NavCont").style.display = "block";
  document.getElementById("fa2NavCont").style.display = "none";
  document.getElementById("broadSort").style.display = "none";
      document.getElementById("dropdownMenuButton").style.display = "none";
  updateCapBar2();
  generateTradePlayers()
}

function draftSim() {
  showAmount = 0;
  for (let i = leftOff; i < draftOrder.length; i++) {
    showAmount++;
    if (draftOrder[i].name === "Knicks") {
        showDraft();
      leftOff = i + 1;

      for (let i = 0; i < draftSummary.length; i++) {
        // console.log(draftSummary[i][0].city + " " + draftSummary[i][0].name);
        // console.log(draftSummary[i][1].pos + " - " + draftSummary[i][1].firstName + " " + draftSummary[i][1].lastName);
      }
      break;
    }
    var player = getPick(draftOrder[i], i);
    draftSummary.push([draftOrder[i], player]);
    // console.log(draftOrder[i].city + " " + draftOrder[i].name + ": " + player.firstName + " " + player.lastName);
  }

  generateDraftPool();
}

function generateDraftPool() {
  var root = document.getElementById("draftPoolCont");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  for (let i = 0; i < draftPlayers.length; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    row.style.borderBottom = "1px solid #282520";

    var posCol = document.createElement("div");
    posCol.classList.add("col-md-1", "col-2");

    var posP = document.createElement("p");
    posP.classList.add("draftPos");
    posP.innerHTML = draftPlayers[i].pos;
    posCol.appendChild(posP);
    row.appendChild(posCol);

    var nameCol = document.createElement("div");
    nameCol.classList.add("col-md-4", "col-6");

    var nameP = document.createElement("p");
    nameP.classList.add("draftName");
    nameP.innerHTML = draftPlayers[i].firstName + " " + draftPlayers[i].lastName;

    if (draftPlayers[i].hasOwnProperty("note")) {
      var icn = document.createElement("i");
      icn.classList.add("fa", "fa-sticky-note");
      icn.addEventListener("click", function(){ notePopDraft(draftPlayers[i]); });
      nameP.innerHTML = draftPlayers[i].firstName + " " + draftPlayers[i].lastName + " ";
      nameP.appendChild(icn);
    }

    nameCol.appendChild(nameP);
    row.appendChild(nameCol);

    var schoolCol = document.createElement("div");
    schoolCol.classList.add("col-md-4", "col-0", "d-none", "d-md-block");

    var schoolP = document.createElement("p");
    schoolP.classList.add("draftSchool");
    schoolP.innerHTML = draftPlayers[i].team;
    schoolCol.appendChild(schoolP);
    row.appendChild(schoolCol);

    var cutCol = document.createElement("div");
    cutCol.classList.add("col-2", "col-md-2");

    var cutButton = document.createElement("button");
    cutButton.classList.add("draftPlayerButton", "btn");
    cutButton.addEventListener('click', function() {
      draftPlayer(draftPlayers[i]);
    });

    var icon = document.createElement("i");
    icon.classList.add("fa", "fa-plus-circle", "fa-lg");
    icon.setAttribute("aria-hidden", "true");
    icon.style.color = "green";

    cutButton.appendChild(icon);
    cutCol.appendChild(cutButton);
    row.appendChild(cutCol);

  root.appendChild(row);
  }
}

function notePopDraft(player) {
  var root = document.getElementById("notePop");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.classList.remove("slide-in-left");

  var imgRow = document.createElement("div");
  imgRow.classList.add("row", "text-center");

  var imgCol = document.createElement("div");
  imgCol.classList.add("col-12", "noteImgCol");


  var img = document.createElement("img");
  img.classList.add("noteImg");
  img.setAttribute("src", player.img);

  imgCol.appendChild(img);
  imgRow.appendChild(imgCol);

  var topRow = document.createElement("div");
  topRow.classList.add("row", "text-center");


  var nameCol = document.createElement("div");
  nameCol.classList.add("col-12");

  var fn = document.createElement("h1");
  fn.classList.add("noteName");
  fn.innerHTML = player.firstName;

  var ln = document.createElement("h1");
  ln.classList.add("noteName");
  ln.innerHTML = player.lastName;
  ln.style.marginTop = "-3vh";

  nameCol.appendChild(fn);
  nameCol.appendChild(ln);
  topRow.appendChild(nameCol);

  var noteRow = document.createElement("div");
  noteRow.classList.add("row", "text-center");

  var dCol = document.createElement("div");
  dCol.classList.add("col-0", "col-md-1");

  var noteCol = document.createElement("div");
  noteCol.classList.add("col-12", "col-md-10");

  var d2Col = document.createElement("div");
  d2Col.classList.add("col-0", "col-md-1");

  var note = document.createElement("p");
  note.classList.add("note");
  note.innerHTML = player.note;

  noteCol.appendChild(note);
  noteRow.appendChild(dCol);
  noteRow.appendChild(noteCol);
  noteRow.appendChild(d2Col);

  var noteAuthorRow = document.createElement("div");
  noteAuthorRow.classList.add("row", "text-center");

  var noteAuthorCol = document.createElement("div");
  noteAuthorCol.classList.add("col-12");

  var noteAuthor = document.createElement("p");
  noteAuthor.classList.add("noteAuthor");
  noteAuthor.innerHTML = player.noteAuthor;

  noteAuthorCol.appendChild(noteAuthor);
  noteAuthorRow.appendChild(noteAuthorCol);

  var buttonRow = document.createElement("div");
  buttonRow.classList.add("row", "text-center");

  var buttonCol = document.createElement("div");
  buttonCol.classList.add("col-12");

  var button = document.createElement("button");
  button.innerHTML = "BACK";
  button.addEventListener("click", function(){ noteBack(); });
  button.classList.add('bttn-slant', 'bttn-md', 'bttn-danger', 'butt');

  buttonCol.appendChild(button);
  buttonRow.appendChild(buttonCol);

  root.appendChild(imgRow);
  root.appendChild(topRow);
  root.appendChild(noteRow);
  root.appendChild(noteAuthorRow);
  root.appendChild(buttonRow);

  root.classList.add("slide-in-left");
  root.style.display = "block";
}

function noteBack() {
  document.getElementById("notePop").style.display = "none";

}

function getPick(team, place) {
  var num = Math.floor(Math.random() * 3);

  if (place > 4) {
    // console.log("rank " + draftPlayers[0].rank + " place " + place);
    if (draftPlayers[0].rank + 2 < place) {

      var pick = draftPlayers[0];
    } else {
      var pick = draftPlayers[num];
    }
  } else {
    var pick = draftPlayers[0];
  }
  var index = draftPlayers.indexOf(pick);
  draftPlayers.splice(index, 1);
  return pick;
}

function draftPlayer(player) {
  var index = draftPlayers.indexOf(player);
  draftPlayers.splice(index, 1);
  knicksPicks.push(player);
  roster.push(player);
  draftSummary.push([knicks, player]);
  // for (let i = 0; i < roster.length; i++) {
  //   console.log(roster[i].firstName + " " + roster[i].lastName);
  // }
  if (leftOff < 58) {
    draftSim();
  } else {
    draftPoolCont.style.display = "none";
    draftDone();
  }
}

// function generateBroadFA(kind) {
//   currKind = kind;
//   var tempArray = [];
//   var amount = filteredFA.length;
//
//   if (kind === "G") {
//     var count = 0;
//     while (count < amount) {
//       if (filteredFA[count].pos === "PG" || filteredFA[count].pos === "SG") {
//         tempArray.push(filteredFA[count]);
//       }
//       count++;
//     }
//     amount = tempArray.length;
//   } else if (kind === "F") {
//       var count = 0;
//       while (count < amount) {
//         if (filteredFA[count].pos === "PF" || filteredFA[count].pos === "SF") {
//           tempArray.push(filteredFA[count]);
//         }
//         count++;
//       }
//       amount = tempArray.length;
//   } else if (kind === "C") {
//       var count = 0;
//       while (count < amount) {
//         if (filteredFA[count].pos === "C") {
//           tempArray.push(filteredFA[count]);
//         }
//         count++;
//       }
//       amount = tempArray.length;
//   } else {
//       tempArray = filteredFA;
//   }
//   var root = document.getElementById("fa2NavCont");
//   while (root.firstChild) {
//     root.removeChild(root.firstChild);
//   }
//   for (let i = 0; i < tempArray.length; i++) {
//     var ovr = document.createElement("div");
//     ovr.classList.add("ovr");
// //// PICTURE
//     var imgrow = document.createElement("div");
//     imgrow.classList.add("row", "text-center");
//
//     var imgcol = document.createElement("div");
//     imgcol.classList.add("col-12");
//
//     var img = document.createElement("img");
//     img.setAttribute("src", tempArray[i].img);
//     img.classList.add("faImg");
//
//     imgcol.appendChild(img);
//     imgrow.appendChild(imgcol);
//     ovr.appendChild(imgrow);
// ////
//     var row = document.createElement("div");
//     row.classList.add("row", "text-center");
//
//     var nameCol = document.createElement("div");
//     nameCol.classList.add("col-12");
//
//     var nameP = document.createElement("p");
//     nameP.classList.add("faName");
//     nameP.innerHTML = tempArray[i].firstName.toUpperCase() + " " + tempArray[i].lastName.toUpperCase();
//     nameCol.appendChild(nameP);
//     row.appendChild(nameCol);
//
//
//         // var dumCol = document.createElement("div");
//         // dumCol.classList.add("col-3");
//         //     row.appendChild(dumCol);
//
//     var posCol = document.createElement("div");
//     posCol.classList.add("col-12");
//
//     var posP = document.createElement("p");
//     posP.classList.add("faPos");
//     posP.innerHTML = tempArray[i].pos + "  /  Age: " + tempArray[i].age;
//     posCol.appendChild(posP);
//     row.appendChild(posCol);
//
//     // var ageCol = document.createElement("div");
//     // ageCol.classList.add("col-3");
//     //
//     // var ageP = document.createElement("p");
//     // ageP.classList.add("faAge");
//     // ageP.innerHTML = teamFA[i].age;
//     // ageCol.appendChild(ageP);
//     // row.appendChild(ageCol);
//
//
//     var priceCol = document.createElement("div");
//     priceCol.classList.add("col-12");
//
//     var priceP = document.createElement("p");
//     priceP.classList.add("faPrice");
//     priceP.innerHTML = tempArray[i].cYears + " yr./$" + tempArray[i].cTotal + "M";
//     priceCol.appendChild(priceP);
//     row.appendChild(priceCol);
//
//
//     if (!offeredArr.includes(tempArray[i]) && (tempArray[i].cTotal * 1000000) / tempArray[i].cYears <= getCapRoom()) {
//       var signCol = document.createElement("div");
//       signCol.classList.add("col-12");
//
//       var signButton = document.createElement("button");
//       signButton.classList.add("signButton", "bttn-slant", "bttn-md", "bttn-success", "butt");
//       signButton.innerHTML = "SIGN";
//       signButton.addEventListener('click', function() {
//         signBroadFA(tempArray[i]);
//       });
//       signCol.appendChild(signButton);
//       row.appendChild(signCol);
//     }
//
//     if (offeredArr.includes(tempArray[i])) {
//       row.style.opacity = ".5";
//     }
//     if ((tempArray[i].cTotal * 1000000) / tempArray[i].cYears > getCapRoom()) {
//         row.style.opacity = ".5";
//     }
//     var hr = document.createElement("hr");
//     ovr.appendChild(row)
//     root.appendChild(ovr);
//     root.appendChild(hr);
//
//   }
// }

function generateBroadFA(kind) {
  currKind = kind;
  var tempArray = [];
  var amount = filteredFA.length;

  if (kind === "G") {
    var count = 0;
    while (count < amount) {
      if (filteredFA[count].pos === "PG" || filteredFA[count].pos === "SG") {
        tempArray.push(filteredFA[count]);
      }
      count++;
    }
    amount = tempArray.length;
  } else if (kind === "F") {
      var count = 0;
      while (count < amount) {
        if (filteredFA[count].pos === "PF" || filteredFA[count].pos === "SF") {
          tempArray.push(filteredFA[count]);
        }
        count++;
      }
      amount = tempArray.length;
  } else if (kind === "C") {
      var count = 0;
      while (count < amount) {
        if (filteredFA[count].pos === "C") {
          tempArray.push(filteredFA[count]);
        }
        count++;
      }
      amount = tempArray.length;
  } else {
      tempArray = filteredFA;
  }
  var root = document.getElementById("fa2NavCont");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  for (let i = 0; i < tempArray.length; i++) {
    var ovr = document.createElement("div");
    ovr.classList.add("ovr");
//// PICTURE
    var imgrow = document.createElement("div");
    imgrow.classList.add("row", "text-center");

    var imgcol = document.createElement("div");
    imgcol.classList.add("col-12");

    var img = document.createElement("img");
    img.setAttribute("src", tempArray[i].img);
    img.classList.add("faImg");

    imgcol.appendChild(img);
    imgrow.appendChild(imgcol);
    ovr.appendChild(imgrow);
////
    var row = document.createElement("div");
    row.classList.add("row", "text-center");

    var nameCol = document.createElement("div");
    nameCol.classList.add("col-12");

    var nameP = document.createElement("p");
    nameP.classList.add("faName");
    nameP.innerHTML = tempArray[i].firstName.toUpperCase() + " " + tempArray[i].lastName.toUpperCase();
    if (tempArray[i].hasOwnProperty("note")) {
      var icn = document.createElement("i");
      icn.classList.add("fa", "fa-sticky-note");
      icn.addEventListener("click", function(){ notePopBroad(tempArray[i]); });
      nameP.innerHTML = tempArray[i].firstName + " " + tempArray[i].lastName + " ";
      nameP.appendChild(icn);
    }
    nameCol.appendChild(nameP);
    row.appendChild(nameCol);




        // var dumCol = document.createElement("div");
        // dumCol.classList.add("col-3");
        //     row.appendChild(dumCol);

    var posCol = document.createElement("div");
    posCol.classList.add("col-12");

    var posP = document.createElement("p");
    posP.classList.add("faPos");
    posP.innerHTML = tempArray[i].pos + "  /  Age: " + tempArray[i].age;
    posCol.appendChild(posP);
    row.appendChild(posCol);

    // var ageCol = document.createElement("div");
    // ageCol.classList.add("col-3");
    //
    // var ageP = document.createElement("p");
    // ageP.classList.add("faAge");
    // ageP.innerHTML = teamFA[i].age;
    // ageCol.appendChild(ageP);
    // row.appendChild(ageCol);


    var priceCol = document.createElement("div");
    priceCol.classList.add("col-12");

    var priceP = document.createElement("p");
    priceP.classList.add("faPrice");
    priceP.innerHTML = tempArray[i].cYears + " yr./$" + tempArray[i].cTotal + "M";
    priceCol.appendChild(priceP);
    row.appendChild(priceCol);


    if (!offeredArr.includes(tempArray[i]) && (tempArray[i].cTotal * 1000000) / tempArray[i].cYears <= getCapRoom()) {
      var signCol = document.createElement("div");
      signCol.classList.add("col-12");

      var signButton = document.createElement("button");
      signButton.classList.add("signButton", "bttn-slant", "bttn-md", "bttn-success", "butt");
      signButton.innerHTML = "SIGN";
      signButton.addEventListener('click', function() {
        signBroadFA(tempArray[i]);
      });
      signCol.appendChild(signButton);
      row.appendChild(signCol);
    }

    if (offeredArr.includes(tempArray[i])) {
        continue;
    }
    if ((tempArray[i].cTotal * 1000000) / tempArray[i].cYears > getCapRoom()) {
        continue;
    }
    var hr = document.createElement("hr");
    ovr.appendChild(row)
    root.appendChild(ovr);
    root.appendChild(hr);

  }

  for (let i = 0; i < tempArray.length; i++) {
    var ovr = document.createElement("div");
    ovr.classList.add("ovr");
//// PICTURE
    var imgrow = document.createElement("div");
    imgrow.classList.add("row", "text-center");

    var imgcol = document.createElement("div");
    imgcol.classList.add("col-12");

    var img = document.createElement("img");
    img.setAttribute("src", tempArray[i].img);
    img.classList.add("faImg");

    imgcol.appendChild(img);
    imgrow.appendChild(imgcol);
    ovr.appendChild(imgrow);
////
    var row = document.createElement("div");
    row.classList.add("row", "text-center");

    var nameCol = document.createElement("div");
    nameCol.classList.add("col-12");

    var nameP = document.createElement("p");
    nameP.classList.add("faName");
    nameP.innerHTML = tempArray[i].firstName.toUpperCase() + " " + tempArray[i].lastName.toUpperCase();
    nameCol.appendChild(nameP);
    row.appendChild(nameCol);


        // var dumCol = document.createElement("div");
        // dumCol.classList.add("col-3");
        //     row.appendChild(dumCol);

    var posCol = document.createElement("div");
    posCol.classList.add("col-12");

    var posP = document.createElement("p");
    posP.classList.add("faPos");
    posP.innerHTML = tempArray[i].pos + "  /  Age: " + tempArray[i].age;
    posCol.appendChild(posP);
    row.appendChild(posCol);

    // var ageCol = document.createElement("div");
    // ageCol.classList.add("col-3");
    //
    // var ageP = document.createElement("p");
    // ageP.classList.add("faAge");
    // ageP.innerHTML = teamFA[i].age;
    // ageCol.appendChild(ageP);
    // row.appendChild(ageCol);


    var priceCol = document.createElement("div");
    priceCol.classList.add("col-12");

    var priceP = document.createElement("p");
    priceP.classList.add("faPrice");
    priceP.innerHTML = tempArray[i].cYears + " yr./$" + tempArray[i].cTotal + "M";
    priceCol.appendChild(priceP);
    row.appendChild(priceCol);

    if (!offeredArr.includes(tempArray[i]) && (tempArray[i].cTotal * 1000000) / tempArray[i].cYears <= getCapRoom()) {
      continue;
    }
    if (offeredArr.includes(tempArray[i])) {
      row.style.opacity = ".5";
    }
    if ((tempArray[i].cTotal * 1000000) / tempArray[i].cYears > getCapRoom()) {
        row.style.opacity = ".5";
    }
    var hr = document.createElement("hr");
    ovr.appendChild(row)
    root.appendChild(ovr);
    root.appendChild(hr);
  }
}

function notePopBroad(player) {
  var root = document.getElementById("notePop");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.classList.remove("slide-in-left");

  var imgRow = document.createElement("div");
  imgRow.classList.add("row", "text-center");

  var imgCol = document.createElement("div");
  imgCol.classList.add("col-12", "noteImgCol");


  var img = document.createElement("img");
  img.classList.add("noteImg");
  img.setAttribute("src", player.img);

  imgCol.appendChild(img);
  imgRow.appendChild(imgCol);

  var topRow = document.createElement("div");
  topRow.classList.add("row", "text-center");


  var nameCol = document.createElement("div");
  nameCol.classList.add("col-12");

  var fn = document.createElement("h1");
  fn.classList.add("noteName");
  fn.innerHTML = player.firstName;

  var ln = document.createElement("h1");
  ln.classList.add("noteName");
  ln.innerHTML = player.lastName;
  ln.style.marginTop = "-3vh";

  nameCol.appendChild(fn);
  nameCol.appendChild(ln);
  topRow.appendChild(nameCol);

  var noteRow = document.createElement("div");
  noteRow.classList.add("row", "text-center");

  var dCol = document.createElement("div");
  dCol.classList.add("col-0", "col-md-1");

  var noteCol = document.createElement("div");
  noteCol.classList.add("col-12", "col-md-10");

  var d2Col = document.createElement("div");
  d2Col.classList.add("col-0", "col-md-1");

  var note = document.createElement("p");
  note.classList.add("note");
  note.innerHTML = player.note;

  noteCol.appendChild(note);
  noteRow.appendChild(dCol);
  noteRow.appendChild(noteCol);
  noteRow.appendChild(d2Col);

  var noteAuthorRow = document.createElement("div");
  noteAuthorRow.classList.add("row", "text-center");

  var noteAuthorCol = document.createElement("div");
  noteAuthorCol.classList.add("col-12");

  var noteAuthor = document.createElement("p");
  noteAuthor.classList.add("noteAuthor");
  noteAuthor.innerHTML = player.noteAuthor;

  noteAuthorCol.appendChild(noteAuthor);
  noteAuthorRow.appendChild(noteAuthorCol);

  var buttonRow = document.createElement("div");
  buttonRow.classList.add("row", "text-center");

  var buttonCol = document.createElement("div");
  buttonCol.classList.add("col-12");

  var button = document.createElement("button");
  button.innerHTML = "BACK";
  button.addEventListener("click", function(){ noteBack(); });
  button.classList.add('bttn-slant', 'bttn-md', 'bttn-danger', 'butt');

  buttonCol.appendChild(button);
  buttonRow.appendChild(buttonCol);

  root.appendChild(imgRow);
  root.appendChild(topRow);
  root.appendChild(noteRow);
  root.appendChild(noteAuthorRow);
  root.appendChild(buttonRow);

  root.classList.add("slide-in-left");
  root.style.display = "block";
}


function generateTeamFA() {
  var root = document.getElementById("faNavCont");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  for (let i = 0; i < teamFA.length; i++) {
    var ovr = document.createElement("div");
    ovr.classList.add("ovr");
//// PICTURE
    var imgrow = document.createElement("div");
    imgrow.classList.add("row", "text-center");

    var imgcol = document.createElement("div");
    imgcol.classList.add("col-12");

    var img = document.createElement("img");
    img.setAttribute("src", teamFA[i].img);
    img.classList.add("faImg");

    imgcol.appendChild(img);
    imgrow.appendChild(imgcol);
    ovr.appendChild(imgrow);
////
    var row = document.createElement("div");
    row.classList.add("row", "text-center");

    var nameCol = document.createElement("div");
    nameCol.classList.add("col-12");

    var nameP = document.createElement("p");
    nameP.classList.add("faName");
    nameP.innerHTML = teamFA[i].firstName.toUpperCase() + " " + teamFA[i].lastName.toUpperCase();
    if (teamFA[i].hasOwnProperty("note")) {
      var icn = document.createElement("i");
      icn.classList.add("fa", "fa-sticky-note");
      icn.addEventListener("click", function(){ notePopBroad(teamFA[i]); });
      nameP.innerHTML = teamFA[i].firstName.toUpperCase() + " " + teamFA[i].lastName.toUpperCase() + " ";
      nameP.appendChild(icn);
    }
    nameCol.appendChild(nameP);
    row.appendChild(nameCol);


        // var dumCol = document.createElement("div");
        // dumCol.classList.add("col-3");
        //     row.appendChild(dumCol);

    var posCol = document.createElement("div");
    posCol.classList.add("col-12");

    var posP = document.createElement("p");
    posP.classList.add("faPos");
    posP.innerHTML = teamFA[i].pos + "  /  Age: " + teamFA[i].age;
    posCol.appendChild(posP);
    row.appendChild(posCol);

    // var ageCol = document.createElement("div");
    // ageCol.classList.add("col-3");
    //
    // var ageP = document.createElement("p");
    // ageP.classList.add("faAge");
    // ageP.innerHTML = teamFA[i].age;
    // ageCol.appendChild(ageP);
    // row.appendChild(ageCol);


    var priceCol = document.createElement("div");
    priceCol.classList.add("col-12");

    var priceP = document.createElement("p");
    priceP.classList.add("faPrice");
    priceP.innerHTML = teamFA[i].cYears + " yr./$" + teamFA[i].cTotal + "M";
    priceCol.appendChild(priceP);
    row.appendChild(priceCol);


    if (!offeredArr.includes(teamFA[i])) {
      var signCol = document.createElement("div");
      signCol.classList.add("col-12");

      var signButton = document.createElement("button");
      signButton.classList.add("signButton", "bttn-slant", "bttn-md", "bttn-success", "butt");
      signButton.innerHTML = "SIGN";
      signButton.addEventListener('click', function() {
        signTeamFA(teamFA[i]);
      });
      signCol.appendChild(signButton);
      row.appendChild(signCol);
    }

    if (offeredArr.includes(teamFA[i])) {
      row.style.opacity = ".5";
    }
    var hr = document.createElement("hr");

    ovr.appendChild(row);
    root.appendChild(ovr);
    root.appendChild(hr);
  }
}

function fired() {

    if (!badges[9].won) {
    badges[9].won = true;
    badgeAlert(terminated);
    localStorage.setItem("badgesStored", JSON.stringify(badges));
  }

  document.getElementById("teamCont").classList.add("fade-out-bck");
  setTimeout(function(){
    document.getElementById("teamCont").style.display = "none";
 }, 1200);
 setTimeout(function(){
   document.getElementById("newsCont").style.display = "block";
 }, 1100);
 setTimeout(function(){
   document.getElementById("restartRow").style.display = "block";
 }, 1500);
}

function signTeamFA(player) {

  if (player.lastName === "Payton") {
    fired();
    return;
  }

  player.sal = Math.floor((player.cTotal * 1000000) / player.cYears);
  if (player.sal <= getCapRoom()) {
      roster.push(player);
      signedArr.push(player);
      historyTeamFA += 1;
      offeredArr.push(player);

      updateCapBar();
      generateTeamFA();
      generateRoster();
  }
}



function restart() {
  location.reload();
}

function signBroadFA(player) {
  player.sal = Math.floor((player.cTotal * 1000000) / player.cYears);
  if (player.sal <= getCapRoom()) {
    var num = (Math.floor(Math.random() * 100));
    if (player.interest >= num) {
      popUp(player, true);
      roster.push(player);
      signedArr.push(player);
      broadFASigned.push(player);
      historyBroadFA += 1;
      offeredArr.push(player);

      if (formerKnicks.includes(player)) {
        formerKnicksCount++;
        if (formerKnicksCount === 3) {
          if (!badges[12].won) {
            badges[12].won = true;
            badgeAlert(oakaak);
            localStorage.setItem("badgesStored", JSON.stringify(badges));
          }
        }
      }

      updateCapBar2();
      generateBroadFA(currKind);
      generateRoster2();
    } else {
      popUp(player, false);

      offeredArr.push(player);
      generateBroadFA(currKind);
    }
  }
}

function popUp(guy, yes) {


  var pop = document.getElementById("signPop");
  pop.classList.add("slide-in-right");
  // pop.style.position = "element(#" + guy.name.replace(/\s+/g, '') + ")";
  pop.style.display = "block";
  if (yes) {
    pop.innerHTML = guy.firstName + " " + guy.lastName + " Accepts!";
  }
  else {
    pop.innerHTML = guy.firstName + " " + guy.lastName + " has decided to sign elsewhere";
  }
  setTimeout(function(){
     pop.classList.add("slide-out-right");
 }, 2000);
  setTimeout(function(){
     pop.style.display = "none";
     pop.classList.remove("slide-in-right");
     pop.classList.remove("slide-out-right");
 }, 2500);
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

function getSalaryHit() {
  var totalSalary = 0;
  for (let i = 0; i < roster.length; i++) {
    // console.log(roster[i].sal);
    totalSalary += roster[i].sal;
  }
  // console.log(totalSalary);
  return totalSalary;
}

function getCapRoom() {
  var salaryNum = getSalaryHit();
  // console.log(salaryNum);
  // console.log(salaryNum + deadCap);
  var capRoom = Math.floor(salaryCap - (salaryNum + deadCap));
  return capRoom;
}

function updateCapBar() {
  sumCap = addCommas(getCapRoom());
  document.getElementById("capSpaceText").innerHTML = "Cap Space: $" + addCommas(getCapRoom());
}

function updateCapBar2() {
  sumCap = addCommas(getCapRoom());
  document.getElementById("capSpaceText2").innerHTML = "Cap Space: $" + addCommas(getCapRoom());
}

function generateTradePlayers() {

  var root = document.getElementById("trades");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
    document.getElementById("tradeDesc").style.display = "block";
    document.getElementById("acceptBack").style.display = "none";
  for (let i = 0; i < roster.length; i++) {
    if (signedArr.includes(roster[i]) || knicksPicks.includes(roster[i]) || tradedFor.includes(roster[i])) {
      continue;
    } else {
      var row = document.createElement("div");
      row.classList.add("row", "text-center");
      row.addEventListener('click', function() {
        tradesNav = 0;
        getTrades(roster[i]);
        generateTrades(tradesNav);
      });

      var dCol = document.createElement("div");
      dCol.classList.add("col-0", "col-lg-3");

      var nameCol = document.createElement("div");
      nameCol.classList.add("col-12", "col-lg-6");

      var nameP = document.createElement("p");
      nameP.classList.add("tradePromptName");
      nameP.innerHTML = roster[i].firstName.toUpperCase() + " " + roster[i].lastName.toUpperCase();

      nameCol.appendChild(nameP);

      var d2Col = document.createElement("div");
      d2Col.classList.add("col-0", "col-lg-3");

      row.appendChild(dCol);
      row.appendChild(nameCol);
      row.appendChild(d2Col);
      root.appendChild(row);
    }
  }
}

function checkTrade(g, r) {
  var receiveSalary = 0;
  var giveSalary = 0;
  for (let i = 0; i < r.length; i++) {
    if (r[i].hasOwnProperty("firstName")) {
      receiveSalary += r[i].sal;
    }
  }
  for (let j = 0; j < g.length; j++) {
    if (g[j].hasOwnProperty("firstName")) {
      giveSalary += g[j].sal;
    }
  }
  if ((receiveSalary - giveSalary) <= getCapRoom()) {
    return true;
  } else if (receiveSalary <= giveSalary * 1.25) {
    return true;
  } else {
    return false;
  }
}

function getTrades(player) {
  potentialTrades = [];
  for (let i = 0; i < trades.length; i++) {
    if (trades[i].give.includes(player)) {
      var valid = checkTrade(trades[i].give, trades[i].receive);

      for (let j = 0; j < trades[i].give.length; j++) {
        if (!roster.includes(trades[i].give[j]) && trades[i].give[j].hasOwnProperty('firstName')) {

          valid = false;
        }
        if (!knicksChoices.includes(trades[i].give[j]) && !trades[i].give[j].hasOwnProperty('firstName')) {
          valid = false;
        }
      }
      if (valid) {
        potentialTrades.push(trades[i]);
      }
    }
  }


}

function tradeBack() {
  trade2Nav();
}

function acceptOffer() {
  for (let k = 0; k < potentialTrades[tradesNav].receive.length; k++) {
    if (potentialTrades[tradesNav].receive[k].hasOwnProperty("firstName")) {
      roster.push(potentialTrades[tradesNav].receive[k]);
      tradedFor.push(potentialTrades[tradesNav].receive[k]);
    } else if (potentialTrades[tradesNav].receive[k].hasOwnProperty("name")) {
      tradedFor.push(potentialTrades[tradesNav].receive[k]);
    } else {
      tradedFor.push(potentialTrades[tradesNav].receive[k]);
    }
  }
  for (let j = 0; j < potentialTrades[tradesNav].give.length; j++) {
    if (potentialTrades[tradesNav].give[j].hasOwnProperty("firstName")) {
      tradedAway.push(potentialTrades[tradesNav].give[j]);
      var index = roster.indexOf(potentialTrades[tradesNav].give[j]);
      roster.splice(index, 1);
    } else if (potentialTrades[tradesNav].give[j].hasOwnProperty("name")) {
      tradedAway.push(potentialTrades[tradesNav].give[j]);
      var index = knicksChoices.indexOf(potentialTrades[tradesNav].give[j]);
      knicksChoices.splice(index, 1);
    } else {
      tradedAway.push(potentialTrades[tradesNav].give[j]);
    }
  }
  roster2Nav();
}



function generateTrades(num) {
  var root = document.getElementById("trades");
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  if (potentialTrades.length > 0) {
    document.getElementById("acceptBack").style.display = "flex";
  }
  document.getElementById("tradeDesc").style.display = "none";
  ////

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



   if (num != potentialTrades.length - 1 &&  potentialTrades.length > 0) {

    var rightButton = document.createElement("button");
    rightButton.setAttribute("onclick", "tradesRight()");
    rightButton.classList.add('bttn-slant', 'bttn-md', 'butt');
    rightButton.innerHTML = "NEXT";
    rightButton.style.paddingRight = "5px";
    rightButton.style.paddingLeft = "5px";

    rbutcol.appendChild(rightButton);

  }
  if (num != 0) {

    var leftButton = document.createElement("button");
    leftButton.setAttribute("onclick", "tradesLeft()");
    leftButton.classList.add('bttn-slant', 'bttn-md', 'butt');
    leftButton.innerHTML = "PREVIOUS";
    leftButton.style.paddingRight = "5px";
    leftButton.style.paddingLeft = "5px";

    lbutcol.appendChild(leftButton);

  }

  if (potentialTrades.length === 0) {
    var row = document.createElement("div");
    row.classList.add("row", "text-center");

    var col1 = document.createElement("div");
    col1.classList.add("col-12");

    var p = document.createElement("p");
    p.classList.add("tradeName");
    p.innerHTML = "No offers for this player";

    col1.appendChild(p)
    row.appendChild(col1);
    root.appendChild(row);
    return;
  }


  buttonRow.appendChild(r1);
    buttonRow.appendChild(lbutcol);
  buttonRow.appendChild(rbutcol);
    buttonRow.appendChild(r2);

  root.appendChild(buttonRow);
  var row = document.createElement("div");
  row.classList.add("row", "text-center", "trade");

  var col1 = document.createElement("div");
  col1.classList.add("col-6");

  var col2 = document.createElement("div");
  col2.classList.add("col-6");

  var img = document.createElement("img");
  img.setAttribute("src", knicks.logo);
  img.classList.add("tradeLogo");

  var img2 = document.createElement("img");
  img2.setAttribute("src", potentialTrades[num].team.logo);
  // console.log(darnoldTradeArr[num].team.logo)
  img2.classList.add("tradeLogo");

  col1.appendChild(img);
  col2.appendChild(img2);

  for (let k = 0; k < potentialTrades[num].receive.length; k++) {
    var p = document.createElement("p");
    p.classList.add("tradeName");
    if (potentialTrades[num].receive[k].hasOwnProperty("firstName")) {
      p.innerHTML = potentialTrades[num].receive[k].firstName + " " +  potentialTrades[num].receive[k].lastName;
      if (potentialTrades[num].receive[k].hasOwnProperty("note")) {
        var icn = document.createElement("i");
        icn.classList.add("fa", "fa-sticky-note");
        icn.addEventListener("click", function(){ notePopBroad(potentialTrades[num].receive[k]); });
        p.innerHTML = potentialTrades[num].receive[k].firstName + " " + potentialTrades[num].receive[k].lastName + " ";
        p.appendChild(icn);
      }
    } else if (potentialTrades[num].receive[k].hasOwnProperty("name")) {
      p.innerHTML = potentialTrades[num].receive[k].name;
    } else {
      p.innerHTML = potentialTrades[num].receive[k];
    }
    col1.appendChild(p);
  }
  for (let j = 0; j < potentialTrades[num].give.length; j++) {
    var p = document.createElement("p");
    p.classList.add("tradeName");
    if (potentialTrades[num].give[j].hasOwnProperty("firstName")) {
      p.innerHTML = potentialTrades[num].give[j].firstName + " " +  potentialTrades[num].give[j].lastName;
    } else if (potentialTrades[num].give[j].hasOwnProperty("name")){
      p.innerHTML = potentialTrades[num].give[j].name;
    } else {
      p.innerHTML = potentialTrades[num].give[j];
    }
    col2.appendChild(p);
  }
  row.appendChild(col1);
  row.appendChild(col2);
  root.appendChild(row);


}

function tradesRight(player) {
  tradesNav++;
  // console.log(darnoldNav);
  generateTrades(tradesNav);
}

function tradesLeft(player) {
  tradesNav--;
  generateTrades(tradesNav);
}

function showDraft() {
  document.getElementById("showDraftCont").style.display = "block";
  document.getElementById("draftPoolCont").style.display = "none";


  var j = 0;
  var i = leftOff;

  while (i <= draftSummary.length) {
   (function (i, j) {
     setTimeout(function() {
       if (i === draftSummary.length ) {
          document.getElementById("showDraftCont").style.display = "none";
          document.getElementById("draftPoolCont").style.display = "block";
          document.getElementById("barTeam").innerHTML = knicks.name;
          if (i >= 30) {
            document.getElementById("barRound").innerHTML = "Rd: 2";
          } else {
            document.getElementById("barRound").innerHTML = "Rd: 1";
          }
          document.getElementById("barPick").innerHTML = "P: " + ((i % 30) + 1);
       } else {
         document.getElementById("barTeam").innerHTML = draftSummary[i][0].name;
         if (i >= 30) {
           document.getElementById("barRound").innerHTML = "Rd: 2";
         } else {
           document.getElementById("barRound").innerHTML = "Rd: 1";
         }
         document.getElementById("barPick").innerHTML = "P: " + ((i % 30) + 1);
         document.getElementById("showDraftTeam").innerHTML = draftSummary[i][0].city + " " + draftSummary[i][0].name;
         document.getElementById("showDraftName").innerHTML = draftSummary[i][1].pos + " - " + draftSummary[i][1].firstName + " " + draftSummary[i][1].lastName;
       }
     }, 250 * j)
   }) (i++, j++)
  }
  // for (let i = 0; i <= draftSummary.length; i++, j++) {
  //   (function (i, j) {
  //     setTimeout(function() {
  //       if (i === draftSummary.length) {
  //         document.getElementById("showDraftCont").style.display = "none";
  //       } else {
  //         document.getElementById("showDraftTeam").innerHTML = draftSummary[i][0].city + " " + draftSummary[i][0].name;
  //         document.getElementById("showDraftName").innerHTML = draftSummary[i][1].pos + " - " + draftSummary[i][1].firstName + " " + draftSummary[i][1].lastName;
  //       }
  //     }, 250 * j)
  //   })
  // }
}
