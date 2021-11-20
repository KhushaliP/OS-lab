function isValidInputNumbers(requestSequence, head) {
    for (i = 0; i < requestSequence.length; ++i) {
      if (requestSequence[i] > 199 || requestSequence[i] < 0) {
        return false;
      }
    }
    if (head > 199 || head < 0) {
      return false;
    }
    return true;
  }
  
//CLOOK ALGORITHM
function clook_man(requestSequenceClook, headClook) {
    requestFinalOrderClook = [headClook];
    tmp = 0;
    //Ascending Order
    tmpAry = [];
    for(let i = 0; i < requestSequenceClook.length; ++i) {
      tmpAry.push(requestSequenceClook[i]);
    }
    requestSequenceClookSorted = tmpAry.sort(function (a, b) {
      return a - b;
    });
  
    for (i = 0; i < requestSequenceClookSorted.length; ++i) {
      if (requestSequenceClookSorted[i] > headClook) {
        tmp = i;
        break;
      }
    }
    for (i = tmp; i < requestSequenceClookSorted.length; ++i) {
      requestFinalOrderClook.push(requestSequenceClookSorted[i]);
    }
    for (i = 0; i < tmp; ++i) {
      requestFinalOrderClook.push(requestSequenceClookSorted[i]);
    }
    totalSeekCountClook =
        Math.abs(requestSequenceClookSorted[requestSequenceClookSorted.length - 1] -
            headClook +
            (Math.abs(requestSequenceClookSorted[requestSequenceClookSorted.length - 1] -
                requestSequenceClookSorted[0])) +
            (Math.abs(requestFinalOrderClook[requestFinalOrderClook.length - 1] -
                requestSequenceClookSorted[0])));
    return [totalSeekCountClook, requestFinalOrderClook];
  }
  
  function resetClookResult() {
    let ele = document.getElementById('clook_totalSeekCount');
    ele.innerText = '';
    ele = document.getElementById('clook_finalOrder');
    ele.innerText = '';
    ele = document.getElementById('clook_averageSeekCount');
    ele.innerText = '';
    ele = document.getElementById('chartContainer');
    ele.style.display = 'none';
    ele = document.getElementById('compareBtn');
    ele.style.display = 'none';
  }
  
  function clook_click() {
  
    let requestSequenceClook = document.getElementById("Sequence").value;
    let headClook = document.getElementById("Head").value;
    requestSequenceClook = requestSequenceClook
        .split(/ |,/)
        .filter(function (character) {
          return character !== "";
        });
    if (requestSequenceClook.length === 0) {
      alert(
          "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  
    for (i = 0; i < requestSequenceClook.length; ++i) {
      if (
          !Number.isInteger(+requestSequenceClook[i]) ||
          !(+requestSequenceClook[i] >= 0)
      ) {
        alert(
            "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
        );
        return;
      }
    }
    if (headClook.length === 0) {
      alert(
          "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
    if (
        !Number.isInteger(+headClook) || Number.isInteger(+headClook) < 0
    ) {
      alert(
          "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
    headClook = +headClook;
    requestSequenceClook = requestSequenceClook.toString()
        .split(/ |,/)
        .filter(function (character) {
          return character !== "";
        }).map(function(a){return +a;});
    if(!isValidInputNumbers(requestSequenceClook, headClook)) {
      alert(
          "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  
    const result = clook_man(requestSequenceClook, headClook);
    let ele = document.getElementById('clook_totalSeekCount');
    ele.innerText = result[0];
    ele = document.getElementById('clook_finalOrder');
    ele.innerText = '';
    for(h = 0; h < result[1].length; ++h) {
      if(h%6 === 0 && h !== result[1].length - 1) {
        ele.innerText += "\n";
      }
      if(h !== result[1].length - 1) {
        ele.innerText += result[1][h] + ", ";
        continue;
      }
      ele.innerText += result[1][h];
    }
    ele = document.getElementById('clook_averageSeekCount');
    ele.innerText = (result[0]/(result[1].length-1)).toFixed(2);
    ele = document.getElementById('chartContainer');
    ele.style.display = 'block';
  
    const ary = [];
    result[1].forEach(function(p) {
      ary.push({y: p});
    });
  
    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      animationDuration: 300 * (ary.length - 1),
      theme: "light2",
      zoomEnabled: true,
      title:{
        text: ""
      },
      axisY: {
        title: "Disk Numbers",
        titleFontColor: "rgb(0,0,0)"
      },
      data: [{
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: ary
      }]
    });
    chart.render();
    document.querySelector("#betweenButton").innerHTML = '<br> <div style="text-align: center">  <button type="button"  class="btn btn-outline-primary" id="compareBtn">COMPARE</button> </div>'+ '<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div id="chartContainer2"></div><div id="title"></div><div id="answers"></div></div></div></div>' ;
  
    let modal = document.getElementById("myModal");
  
    let btn = document.getElementById("compareBtn");
  
    let span = document.getElementsByClassName("close")[0];
  
    btn.onclick = function() {
      modal.style.display = "block";
      comparison_click_from_algo();
    }
  
    span.onclick = function() {
      modal.style.display = "none";
    }
  
  }