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

//SCAN ALGORITHM
function scan_man(requestSequenceScan, headScan) {
    requestFinalOrderScan = [headScan];
    tmp = 0;
    //Ascending Order
    tmpAry = [];
    for(let i = 0; i < requestSequenceScan.length; ++i) {
      tmpAry.push(requestSequenceScan[i]);
    }
    requestSequenceScanSorted = tmpAry.sort(function (a, b) {
      return a - b;
    });
  
    for (i = 0; i < requestSequenceScanSorted.length; ++i) {
      if (headScan < requestSequenceScanSorted[i]) {
        tmp = i;
        break;
      }
    }
    for (i = tmp - 1; i >= 0; --i) {
      requestFinalOrderScan.push(requestSequenceScanSorted[i]);
    }
    if (requestFinalOrderScan[requestFinalOrderScan.length - 1] !== 0) {
      requestFinalOrderScan.push(0);
    }
    for (i = tmp; i < requestSequenceScanSorted.length; ++i) {
      requestFinalOrderScan.push(requestSequenceScanSorted[i]);
    }
    totalSeekCountScan =
        Math.abs(headScan + requestFinalOrderScan[requestFinalOrderScan.length - 1]);
    return [totalSeekCountScan, requestFinalOrderScan];
  }
  
  function resetScanResult() {
    let ele = document.getElementById('scan_totalSeekCount');
    ele.innerText = '';
    ele = document.getElementById('scan_finalOrder');
    ele.innerText = '';
    ele = document.getElementById('scan_averageSeekCount');
    ele.innerText = '';
    ele = document.getElementById('chartContainer');
    ele.style.display = 'none';
    ele = document.getElementById('compareBtn');
    ele.style.display = 'none';
  }
  
  function scan_click() {
  
    let requestSequenceScan = document.getElementById("Sequence").value;
    let headScan = document.getElementById("Head").value;
    requestSequenceScan = requestSequenceScan
        .split(/ |,/)
        .filter(function (character) {
          return character !== "";
        });
    if (requestSequenceScan.length === 0) {
      alert(
          "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  
    for (i = 0; i < requestSequenceScan.length; ++i) {
      if (
          !Number.isInteger(+requestSequenceScan[i]) ||
          !(+requestSequenceScan[i] >= 0)
      ) {
        alert(
            "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
        );
        return;
      }
    }
    if (headScan.length === 0) {
      alert(
          "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
    if (
        !Number.isInteger(+headScan) || Number.isInteger(+headScan) < 0
    ) {
      alert(
          "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
    headScan = +headScan;
    requestSequenceScan = requestSequenceScan.toString()
        .split(/ |,/)
        .filter(function (character) {
          return character !== "";
        }).map(function(a){return +a;});
    if(!isValidInputNumbers(requestSequenceScan, headScan)) {
      alert(
          "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  
    const result = scan_man(requestSequenceScan, headScan);
    let ele = document.getElementById('scan_totalSeekCount');
    ele.innerText = result[0];
    ele = document.getElementById('scan_finalOrder');
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
    ele = document.getElementById('scan_averageSeekCount');
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