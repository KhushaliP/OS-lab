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

//FCFS ALGORITHM
function fcfs_man(requestSequenceFcfs, headFcfs) {
  requestFinalOrderFcfs = [headFcfs];
  for (i = 0; i < requestSequenceFcfs.length; ++i) {
    requestFinalOrderFcfs.push(requestSequenceFcfs[i]);
  }
  let totalSeekCountFcfs = Math.abs(requestSequenceFcfs[0] - headFcfs);
  for (i = 1; i < requestSequenceFcfs.length; ++i) {
    totalSeekCountFcfs += Math.abs(
      requestSequenceFcfs[i] - requestSequenceFcfs[i - 1]
    );
  }
  return [totalSeekCountFcfs, requestFinalOrderFcfs];
}

function resetFcfsResult() {
  let ele = document.getElementById("fcfs_totalSeekCount");
  ele.innerText = "";
  ele = document.getElementById("fcfs_finalOrder");
  ele.innerText = "";
  ele = document.getElementById("fcfs_averageSeekCount");
  ele.innerText = "";
  ele = document.getElementById("chartContainer");
  ele.style.display = "none";
  ele = document.getElementById("compareBtn");
  ele.style.display = "none";
}

function fcfs_click() {
  let requestSequenceFcfs = document.getElementById("Sequence").value;
  let headFcfs = document.getElementById("Head").value;
  requestSequenceFcfs = requestSequenceFcfs
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });
  if (requestSequenceFcfs.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  for (i = 0; i < requestSequenceFcfs.length; ++i) {
    if (
      !Number.isInteger(+requestSequenceFcfs[i]) ||
      !(+requestSequenceFcfs[i] >= 0)
    ) {
      alert(
        "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  }
  if (headFcfs.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  if (!Number.isInteger(+headFcfs) || Number.isInteger(+headFcfs) < 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  headFcfs = +headFcfs;
  requestSequenceFcfs = requestSequenceFcfs
    .toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    })
    .map(function (a) {
      return +a;
    });
  if (!isValidInputNumbers(requestSequenceFcfs, headFcfs)) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  const result = fcfs_man(requestSequenceFcfs, headFcfs);
  let ele = document.getElementById("fcfs_totalSeekCount");
  ele.innerText = result[0] + " ms";
  ele = document.getElementById("fcfs_finalOrder");
  ele.innerText = "";
  for (h = 0; h < result[1].length; ++h) {
    if (h % 6 === 0 && h !== result[1].length - 1) {
      ele.innerText += "\n";
    }
    if (h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }
  ele = document.getElementById("fcfs_averageSeekCount");
  ele.innerText = (result[0] / (result[1].length - 1)).toFixed(2);
  ele = document.getElementById("chartContainer");
  ele.style.display = "block";

  const ary = [];
  result[1].forEach(function (p) {
    ary.push({ y: p });
  });

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 300 * (ary.length - 1),
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: "FCFS Chart",
    },
    axisY: {
      title: "Disk Numbers",
      titleFontColor: "rgb(0,0,0)",
    },
    data: [
      {
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: ary,
      },
    ],
  });
  chart.render();
  document.querySelector("#betweenButton").innerHTML =
    '<br> <div style="text-align: center">  <button type="button"  class="btn btn-outline-primary" id="compareBtn">COMPARE</button> </div>' +
    '<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div id="chartContainer2"></div><div id="title"></div><div id="answers"></div></div></div></div>';

  let modal = document.getElementById("myModal");

  let btn = document.getElementById("compareBtn");

  let span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
    comparison_click_from_algo();
  };

  span.onclick = function () {
    modal.style.display = "none";
  };
}

//SSTF ALGORITHM
function sstf_man(requestSequenceSstf, headSstf) {
  const len = requestSequenceSstf.length;
  requestFinalOrderSstf = [headSstf];
  totalSeekCountSstf = 0;
  for (i = 0; i < len; ++i) {
    //requestSequenceSstf.slice()
    let tmp = [];
    for (j = 0; j < requestSequenceSstf.length; ++j) {
      tmp.push(
        Math.abs(
          requestFinalOrderSstf[requestFinalOrderSstf.length - 1] -
            requestSequenceSstf[j]
        )
      );
    }
    var minIndex = tmp.indexOf(Math.min.apply(null, tmp));
    totalSeekCountSstf += tmp[minIndex];
    requestFinalOrderSstf.push(requestSequenceSstf[minIndex]);
    requestSequenceSstf.splice(minIndex, 1);
  }
  return [totalSeekCountSstf, requestFinalOrderSstf];
}

function resetSstfResult() {
  let ele = document.getElementById("sstf_totalSeekCount");
  ele.innerText = "";
  ele = document.getElementById("sstf_finalOrder");
  ele.innerText = "";
  ele = document.getElementById("sstf_averageSeekCount");
  ele.innerText = "";
  ele = document.getElementById("chartContainer");
  ele.style.display = "none";
  ele = document.getElementById("compareBtn");
  ele.style.display = "none";
}

function sstf_click() {
  let requestSequenceSstf = document.getElementById("Sequence").value;
  let headSstf = document.getElementById("Head").value;
  requestSequenceSstf = requestSequenceSstf
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });
  if (requestSequenceSstf.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  for (i = 0; i < requestSequenceSstf.length; ++i) {
    if (
      !Number.isInteger(+requestSequenceSstf[i]) ||
      !(+requestSequenceSstf[i] >= 0)
    ) {
      alert(
        "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  }
  if (headSstf.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  if (!Number.isInteger(+headSstf) || Number.isInteger(+headSstf) < 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  headSstf = +headSstf;
  requestSequenceSstf = requestSequenceSstf
    .toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    })
    .map(function (a) {
      return +a;
    });
  if (!isValidInputNumbers(requestSequenceSstf, headSstf)) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  const result = sstf_man(requestSequenceSstf, headSstf);
  let ele = document.getElementById("sstf_totalSeekCount");
  ele.innerText = result[0] + " ms";
  ele = document.getElementById("sstf_finalOrder");
  ele.innerText = "";
  for (h = 0; h < result[1].length; ++h) {
    if (h % 6 === 0 && h !== result[1].length - 1) {
      ele.innerText += "\n";
    }
    if (h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }
  ele = document.getElementById("sstf_averageSeekCount");
  ele.innerText = (result[0] / (result[1].length - 1)).toFixed(2);
  ele = document.getElementById("chartContainer");
  ele.style.display = "block";

  const ary = [];
  result[1].forEach(function (p) {
    ary.push({ y: p });
  });

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 300 * (ary.length - 1),
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: "SSTF Chart",
    },
    axisY: {
      title: "Disk Numbers",
      titleFontColor: "rgb(0,0,0)",
    },
    data: [
      {
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: ary,
      },
    ],
  });
  chart.render();
  document.querySelector("#betweenButton").innerHTML =
    '<br> <div style="text-align: center">  <button type="button" class="btn btn-outline-primary" id="compareBtn">COMPARE</button> </div>' +
    '<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div id="chartContainer2"></div><div id="title"></div><div id="answers"></div></div></div></div>';

  let modal = document.getElementById("myModal");

  let btn = document.getElementById("compareBtn");

  let span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
    comparison_click_from_algo();
  };

  span.onclick = function () {
    modal.style.display = "none";
  };
}

//SCAN ALGORITHM
function scan_man(requestSequenceScan, headScan) {
  requestFinalOrderScan = [headScan];
  tmp = 0;
  //Ascending Order
  tmpAry = [];
  for (let i = 0; i < requestSequenceScan.length; ++i) {
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
  totalSeekCountScan = Math.abs(
    headScan + requestFinalOrderScan[requestFinalOrderScan.length - 1]
  );
  return [totalSeekCountScan, requestFinalOrderScan];
}

function resetScanResult() {
  let ele = document.getElementById("scan_totalSeekCount");
  ele.innerText = "";
  ele = document.getElementById("scan_finalOrder");
  ele.innerText = "";
  ele = document.getElementById("scan_averageSeekCount");
  ele.innerText = "";
  ele = document.getElementById("chartContainer");
  ele.style.display = "none";
  ele = document.getElementById("compareBtn");
  ele.style.display = "none";
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
  if (!Number.isInteger(+headScan) || Number.isInteger(+headScan) < 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  headScan = +headScan;
  requestSequenceScan = requestSequenceScan
    .toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    })
    .map(function (a) {
      return +a;
    });
  if (!isValidInputNumbers(requestSequenceScan, headScan)) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  const result = scan_man(requestSequenceScan, headScan);
  let ele = document.getElementById("scan_totalSeekCount");
  ele.innerText = result[0] + " ms";
  ele = document.getElementById("scan_finalOrder");
  ele.innerText = "";
  for (h = 0; h < result[1].length; ++h) {
    if (h % 6 === 0 && h !== result[1].length - 1) {
      ele.innerText += "\n";
    }
    if (h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }
  ele = document.getElementById("scan_averageSeekCount");
  ele.innerText = (result[0] / (result[1].length - 1)).toFixed(2);
  ele = document.getElementById("chartContainer");
  ele.style.display = "block";

  const ary = [];
  result[1].forEach(function (p) {
    ary.push({ y: p });
  });

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 300 * (ary.length - 1),
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: "SCAN Chart",
    },
    axisY: {
      title: "Disk Numbers",
      titleFontColor: "rgb(0,0,0)",
    },
    data: [
      {
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: ary,
      },
    ],
  });
  chart.render();
  document.querySelector("#betweenButton").innerHTML =
    '<br> <div style="text-align: center">  <button type="button"  class="btn btn-outline-primary" id="compareBtn">COMPARE</button> </div>' +
    '<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div id="chartContainer2"></div><div id="title"></div><div id="answers"></div></div></div></div>';

  let modal = document.getElementById("myModal");

  let btn = document.getElementById("compareBtn");

  let span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
    comparison_click_from_algo();
  };

  span.onclick = function () {
    modal.style.display = "none";
  };
}

//CSCAN ALGORITHM
function cscan_man(requestSequenceCscan, headCscan) {
  requestFinalOrderCscan = [headCscan];
  tmp = 0;
  //Descending Order
  tmpAry = [];
  for (let i = 0; i < requestSequenceCscan.length; ++i) {
    tmpAry.push(requestSequenceCscan[i]);
  }
  requestSequenceCscanSorted = tmpAry.sort(function (a, b) {
    return b - a;
  });

  for (i = 0; i < requestSequenceCscanSorted.length; ++i) {
    if (headCscan > requestSequenceCscanSorted[i]) {
      tmp = i;
      break;
    }
  }
  for (i = tmp - 1; i >= 0; --i) {
    requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);
  }
  if (requestFinalOrderCscan[requestFinalOrderCscan.length - 1] !== 199) {
    requestFinalOrderCscan.push(199);
  }
  for (i = requestSequenceCscanSorted.length - 1; i >= tmp; --i) {
    if (
      i === requestSequenceCscanSorted.length - 1 &&
      requestSequenceCscanSorted[i] !== 0
    ) {
      requestFinalOrderCscan.push(0);
    }
    requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);
  }
  totalSeekCountCscan = Math.abs(
    199 -
      headCscan +
      199 +
      requestFinalOrderCscan[requestFinalOrderCscan.length - 1]
  );
  return [totalSeekCountCscan, requestFinalOrderCscan];
}

function resetCscanResult() {
  let ele = document.getElementById("cscan_totalSeekCount");
  ele.innerText = "";
  ele = document.getElementById("cscan_finalOrder");
  ele.innerText = "";
  ele = document.getElementById("cscan_averageSeekCount");
  ele.innerText = "";
  ele = document.getElementById("chartContainer");
  ele.style.display = "none";
  ele = document.getElementById("compareBtn");
  ele.style.display = "none";
}

function cscan_click() {
  let requestSequenceCscan = document.getElementById("Sequence").value;
  let headCscan = document.getElementById("Head").value;
  requestSequenceCscan = requestSequenceCscan
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });
  if (requestSequenceCscan.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  for (i = 0; i < requestSequenceCscan.length; ++i) {
    if (
      !Number.isInteger(+requestSequenceCscan[i]) ||
      !(+requestSequenceCscan[i] >= 0)
    ) {
      alert(
        "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  }
  if (headCscan.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  if (!Number.isInteger(+headCscan) || Number.isInteger(+headCscan) < 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  headCscan = +headCscan;
  requestSequenceCscan = requestSequenceCscan
    .toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    })
    .map(function (a) {
      return +a;
    });
  if (!isValidInputNumbers(requestSequenceCscan, headCscan)) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  const result = cscan_man(requestSequenceCscan, headCscan);
  let ele = document.getElementById("cscan_totalSeekCount");
  ele.innerText = result[0];
  ele = document.getElementById("cscan_finalOrder");
  ele.innerText = "";
  for (h = 0; h < result[1].length; ++h) {
    if (h % 6 === 0 && h !== result[1].length - 1) {
      ele.innerText += "\n";
    }
    if (h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }
  ele = document.getElementById("cscan_averageSeekCount");
  ele.innerText = (result[0] / (result[1].length - 1)).toFixed(2);
  ele = document.getElementById("chartContainer");
  ele.style.display = "block";

  const ary = [];
  result[1].forEach(function (p) {
    ary.push({ y: p });
  });

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 300 * (ary.length - 1),
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: "CSCAN Chart",
    },
    axisY: {
      title: "Disk Numbers",
      titleFontColor: "rgb(0,0,0)",
    },
    data: [
      {
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: ary,
      },
    ],
  });
  chart.render();
  document.querySelector("#betweenButton").innerHTML =
    '<br> <div style="text-align: center">  <button type="button"  class="btn btn-outline-primary" id="compareBtn">COMPARE</button> </div>' +
    '<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div id="chartContainer2"></div><div id="title"></div><div id="answers"></div></div></div></div>';

  let modal = document.getElementById("myModal");

  let btn = document.getElementById("compareBtn");

  let span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
    comparison_click_from_algo();
  };

  span.onclick = function () {
    modal.style.display = "none";
  };
}

//LOOK ALGORITHM
function look_man(requestSequenceLook, headLook) {
  requestFinalOrderLook = [headLook];
  tmp = 0;
  //Ascending Order
  tmpAry = [];
  for (let i = 0; i < requestSequenceLook.length; ++i) {
    tmpAry.push(requestSequenceLook[i]);
  }
  requestSequenceLookSorted = tmpAry.sort(function (a, b) {
    return a - b;
  });

  for (i = 0; i < requestSequenceLookSorted.length; ++i) {
    if (requestSequenceLookSorted[i] > headLook) {
      tmp = i;
      break;
    }
  }
  for (i = tmp; i < requestSequenceLookSorted.length; ++i) {
    requestFinalOrderLook.push(requestSequenceLookSorted[i]);
  }
  for (i = tmp - 1; i >= 0; --i) {
    requestFinalOrderLook.push(requestSequenceLookSorted[i]);
  }
  totalSeekCountLook = Math.abs(
    requestSequenceLookSorted[requestSequenceLookSorted.length - 1] -
      headLook +
      Math.abs(
        requestSequenceLookSorted[requestSequenceLookSorted.length - 1] -
          requestSequenceLookSorted[0]
      )
  );
  return [totalSeekCountLook, requestFinalOrderLook];
}

function resetLookResult() {
  let ele = document.getElementById("look_totalSeekCount");
  ele.innerText = "";
  ele = document.getElementById("look_finalOrder");
  ele.innerText = "";
  ele = document.getElementById("look_averageSeekCount");
  ele.innerText = "";
  ele = document.getElementById("chartContainer");
  ele.style.display = "none";
  ele = document.getElementById("compareBtn");
  ele.style.display = "none";
}

function look_click() {
  let requestSequenceLook = document.getElementById("Sequence").value;
  let headLook = document.getElementById("Head").value;
  requestSequenceLook = requestSequenceLook
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });
  if (requestSequenceLook.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  for (i = 0; i < requestSequenceLook.length; ++i) {
    if (
      !Number.isInteger(+requestSequenceLook[i]) ||
      !(+requestSequenceLook[i] >= 0)
    ) {
      alert(
        "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  }
  if (headLook.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  if (!Number.isInteger(+headLook) || Number.isInteger(+headLook) < 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  headLook = +headLook;
  requestSequenceLook = requestSequenceLook
    .toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    })
    .map(function (a) {
      return +a;
    });
  if (!isValidInputNumbers(requestSequenceLook, headLook)) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  const result = look_man(requestSequenceLook, headLook);
  let ele = document.getElementById("look_totalSeekCount");
  ele.innerText = result[0] + " ms";
  ele = document.getElementById("look_finalOrder");
  ele.innerText = "";
  for (h = 0; h < result[1].length; ++h) {
    if (h % 6 === 0 && h !== result[1].length - 1) {
      ele.innerText += "\n";
    }
    if (h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }
  ele = document.getElementById("look_averageSeekCount");
  ele.innerText = (result[0] / (result[1].length - 1)).toFixed(2);
  ele = document.getElementById("chartContainer");
  ele.style.display = "block";

  const ary = [];
  result[1].forEach(function (p) {
    ary.push({ y: p });
  });

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 300 * (ary.length - 1),
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: "LOOK Chart",
    },
    axisY: {
      title: "Disk Numbers",
      titleFontColor: "rgb(0,0,0)",
    },
    data: [
      {
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: ary,
      },
    ],
  });
  chart.render();
  document.querySelector("#betweenButton").innerHTML =
    '<br> <div style="text-align: center">  <button type="button"  class="btn btn-outline-primary" id="compareBtn">COMPARE</button> </div>' +
    '<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div id="chartContainer2"></div><div id="title"></div><div id="answers"></div></div></div></div>';

  let modal = document.getElementById("myModal");

  let btn = document.getElementById("compareBtn");

  let span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
    comparison_click_from_algo();
  };

  span.onclick = function () {
    modal.style.display = "none";
  };
}

//CLOOK ALGORITHM
function clook_man(requestSequenceClook, headClook) {
  requestFinalOrderClook = [headClook];
  tmp = 0;
  //Ascending Order
  tmpAry = [];
  for (let i = 0; i < requestSequenceClook.length; ++i) {
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
  totalSeekCountClook = Math.abs(
    requestSequenceClookSorted[requestSequenceClookSorted.length - 1] -
      headClook +
      Math.abs(
        requestSequenceClookSorted[requestSequenceClookSorted.length - 1] -
          requestSequenceClookSorted[0]
      ) +
      Math.abs(
        requestFinalOrderClook[requestFinalOrderClook.length - 1] -
          requestSequenceClookSorted[0]
      )
  );
  return [totalSeekCountClook, requestFinalOrderClook];
}

function resetClookResult() {
  let ele = document.getElementById("clook_totalSeekCount");
  ele.innerText = "";
  ele = document.getElementById("clook_finalOrder");
  ele.innerText = "";
  ele = document.getElementById("clook_averageSeekCount");
  ele.innerText = "";
  ele = document.getElementById("chartContainer");
  ele.style.display = "none";

  ele = document.getElementById("compareBtn");
  ele.style.display = "none";
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
  if (!Number.isInteger(+headClook) || Number.isInteger(+headClook) < 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  headClook = +headClook;
  requestSequenceClook = requestSequenceClook
    .toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    })
    .map(function (a) {
      return +a;
    });
  if (!isValidInputNumbers(requestSequenceClook, headClook)) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  const result = clook_man(requestSequenceClook, headClook);
  let ele = document.getElementById("clook_totalSeekCount");
  ele.innerText = result[0];
  ele = document.getElementById("clook_finalOrder");
  ele.innerText = "";
  for (h = 0; h < result[1].length; ++h) {
    if (h % 6 === 0 && h !== result[1].length - 1) {
      ele.innerText += "\n";
    }
    if (h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }
  ele = document.getElementById("clook_averageSeekCount");
  ele.innerText = (result[0] / (result[1].length - 1)).toFixed(2);
  ele = document.getElementById("chartContainer");
  ele.style.display = "block";

  const ary = [];
  result[1].forEach(function (p) {
    ary.push({ y: p });
  });

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 300 * (ary.length - 1),
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: "CLOOK Chart",
    },
    axisY: {
      title: "Disk Numbers",
      titleFontColor: "rgb(0,0,0)",
    },
    data: [
      {
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: ary,
      },
    ],
  });
  chart.render();
  document.querySelector("#betweenButton").innerHTML =
    '<br> <div style="text-align: center">  <button type="button"  class="btn btn-outline-primary" id="compareBtn">COMPARE</button> </div>' +
    '<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div id="chartContainer2"></div><div id="title"></div><div id="answers"></div></div></div></div>';

  let modal = document.getElementById("myModal");

  let btn = document.getElementById("compareBtn");

  let span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
    comparison_click_from_algo();
  };

  span.onclick = function () {
    modal.style.display = "none";
  };
}

//LIFO ALGORITHM
function lifo_man(requestSequenceLifo, headLifo) {
  requestFinalOrderLifo = [headLifo];
  for (i = requestSequenceLifo.length - 1; i >= 0; --i) {
    requestFinalOrderLifo.push(requestSequenceLifo[i]);
  }
  totalSeekCountLifo = 0;
  for (i = 0; i < requestFinalOrderLifo.length - 1; ++i) {
    totalSeekCountLifo += Math.abs(
      requestFinalOrderLifo[i] - requestFinalOrderLifo[i + 1]
    );
  }
  return [totalSeekCountLifo, requestFinalOrderLifo];
}

function resetLifoResult() {
  let ele = document.getElementById("lifo_totalSeekCount");
  ele.innerText = "";
  ele = document.getElementById("lifo_finalOrder");
  ele.innerText = "";
  ele = document.getElementById("lifo_averageSeekCount");
  ele.innerText = "";
  ele = document.getElementById("chartContainer");
  ele.style.display = "none";
  ele = document.getElementById("compareBtn");
  ele.style.display = "none";
}

function lifo_click() {
  let requestSequenceLifo = document.getElementById("Sequence").value;
  let headLifo = document.getElementById("Head").value;
  requestSequenceLifo = requestSequenceLifo
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });
  if (requestSequenceLifo.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  for (i = 0; i < requestSequenceLifo.length; ++i) {
    if (
      !Number.isInteger(+requestSequenceLifo[i]) ||
      !(+requestSequenceLifo[i] >= 0)
    ) {
      alert(
        "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  }
  if (headLifo.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  if (!Number.isInteger(+headLifo) || Number.isInteger(+headLifo) < 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  headLifo = +headLifo;
  requestSequenceLifo = requestSequenceLifo
    .toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    })
    .map(function (a) {
      return +a;
    });
  if (!isValidInputNumbers(requestSequenceLifo, headLifo)) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  const result = lifo_man(requestSequenceLifo, headLifo);
  let ele = document.getElementById("lifo_totalSeekCount");
  ele.innerText = result[0];
  ele = document.getElementById("lifo_finalOrder");
  ele.innerText = "";
  for (h = 0; h < result[1].length; ++h) {
    if (h % 6 === 0 && h !== result[1].length - 1) {
      ele.innerText += "\n";
    }
    if (h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }
  ele = document.getElementById("lifo_averageSeekCount");
  ele.innerText = (result[0] / (result[1].length - 1)).toFixed(2);
  ele = document.getElementById("chartContainer");
  ele.style.display = "block";

  const ary = [];
  result[1].forEach(function (p) {
    ary.push({ y: p });
  });

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 300 * (ary.length - 1),
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: "LIFO Chart",
    },
    axisY: {
      title: "Disk Numbers",
      titleFontColor: "rgb(0,0,0)",
    },
    data: [
      {
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: ary,
      },
    ],
  });
  chart.render();
  document.querySelector("#betweenButton").innerHTML =
    '<br> <div style="text-align: center">  <button type="button"  class="btn btn-outline-primary" id="compareBtn">COMPARE</button> </div>' +
    '<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div id="chartContainer2"></div><div id="title"></div><div id="answers"></div></div></div></div>';

  let modal = document.getElementById("myModal");

  let btn = document.getElementById("compareBtn");

  let span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
    comparison_click_from_algo();
  };

  span.onclick = function () {
    modal.style.display = "none";
  };
}

function resetComparisonResult() {
  let ele = document.getElementById("chartContainer");
  ele.style.display = "none";
  ele = document.getElementById("comaprisonAnswers");
  ele.style.display = "none";
}

function comparison_click() {
  let requestSequenceComparison = document.getElementById("Sequence").value;
  let headComparison = document.getElementById("Head").value;
  requestSequenceComparison = requestSequenceComparison
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });
  if (requestSequenceComparison.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  for (i = 0; i < requestSequenceComparison.length; ++i) {
    if (
      !Number.isInteger(+requestSequenceComparison[i]) ||
      !(+requestSequenceComparison[i] >= 0)
    ) {
      alert(
        "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  }
  if (headComparison.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  if (
    !Number.isInteger(+headComparison) ||
    Number.isInteger(+headComparison) < 0
  ) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  headComparison = +headComparison;
  requestSequenceComparison = requestSequenceComparison
    .toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    })
    .map(function (a) {
      return +a;
    });
  if (!isValidInputNumbers(requestSequenceComparison, headComparison)) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  ary = [];
  bry = [[]];
  cry = [];

  requestSequenceFcfs = requestSequenceComparison.slice();
  requestSequenceSstf = requestSequenceComparison.slice();
  requestSequenceScan = requestSequenceComparison.slice();
  requestSequenceCscan = requestSequenceComparison.slice();
  requestSequenceLook = requestSequenceComparison.slice();
  requestSequenceClook = requestSequenceComparison.slice();
  requestSequenceLifo = requestSequenceComparison.slice();

  resultFcfs = fcfs_man(requestSequenceFcfs, headComparison);
  resultSstf = sstf_man(requestSequenceSstf, headComparison);
  resultScan = scan_man(requestSequenceScan, headComparison);
  resultCscan = cscan_man(requestSequenceCscan, headComparison);
  resultLook = look_man(requestSequenceLook, headComparison);
  resultClook = clook_man(requestSequenceClook, headComparison);
  resultLifo = lifo_man(requestSequenceLifo, headComparison);

  cry.push(["FCFS", resultFcfs[0]]);
  cry.push(["SSTF", resultSstf[0]]);
  cry.push(["SCAN", resultScan[0]]);
  cry.push(["CSCAN", resultCscan[0]]);
  cry.push(["LOOK", resultLook[0]]);
  cry.push(["CLOOK", resultClook[0]]);
  cry.push(["LIFO", resultLifo[0]]);

  minimumTotalSeekCount = cry[0][1];
  for (m = 1; m < 7; ++m) {
    if (cry[m][1] < minimumTotalSeekCount) {
      minimumTotalSeekCount = cry[m][1];
    }
  }
  algorithmsHavingLeastTotalSeekCount = [];
  for (n = 0; n < 7; ++n) {
    if (cry[n][1] === minimumTotalSeekCount) {
      algorithmsHavingLeastTotalSeekCount.push(cry[n][0]);
    }
  }

  let conclusion =
    "<br>Conclusion:-".fontcolor("#DA4727").fontsize(4) +
    "<br>Fastest Algorithm:" +
    "<br>" +
    "Algorithm/s having least Total Seek Time is/are:<br>" +
    algorithmsHavingLeastTotalSeekCount.toString().fontcolor("#5789ff") +
    "<br><br>" +
    "Minimum Total Seek Time: " +
    minimumTotalSeekCount.toString().fontcolor("#5789ff") +
    " ms".fontcolor("#5789ff") +
    "<br><br>";
  let title = "Total Seek Time:-<br>".fontcolor("#DA4727").fontsize(4);
  let ans =
    "FCFS - " +
    resultFcfs[0].toString().fontcolor("#5789ff") +
    " ms".fontcolor("#5789ff") +
    "<br>";
  ans +=
    "SSTF - " +
    resultSstf[0].toString().fontcolor("#5789ff") +
    " ms".fontcolor("#5789ff") +
    "<br>";
  ans +=
    "SCAN - " +
    resultScan[0].toString().fontcolor("#5789ff") +
    " ms".fontcolor("#5789ff") +
    "<br>";
  ans +=
    "CSCAN - " +
    resultCscan[0].toString().fontcolor("#5789ff") +
    " ms".fontcolor("#5789ff") +
    "<br>";
  ans +=
    "LOOK - " +
    resultLook[0].toString().fontcolor("#5789ff") +
    " ms".fontcolor("#5789ff") +
    "<br>";
  ans +=
    "CLOOK - " +
    resultClook[0].toString().fontcolor("#5789ff") +
    " ms".fontcolor("#5789ff") +
    "<br>";
  //ans += 'LIFO - ' + resultLifo[0].toString().fontcolor('#5789ff') + ' ms'.fontcolor('#5789ff') + '<br>';

  ary.push(resultFcfs[1]);
  ary.push(resultSstf[1]);
  ary.push(resultScan[1]);
  ary.push(resultCscan[1]);
  ary.push(resultLook[1]);
  ary.push(resultClook[1]);
  ary.push(resultLifo[1]);
  i = 0;
  ary.forEach(function (p) {
    p.forEach(function (q) {
      bry[i].push({ y: q });
    });
    if (i !== 6) {
      bry.push([]);
      ++i;
    }
  });

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 5000,
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: "Chart",
    },
    axisY: {
      title: "Disk Numbers",
      titleFontColor: "rgb(0,0,0)",
    },
    legend: {
      cursor: "pointer",
      fontSize: 16,
      itemclick: function (e) {
        if (
          typeof e.dataSeries.visible === "undefined" ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
      //itemclick: toggleDataSeries
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "line",
        //lineColor: "#85ff6e",
        indexLabelFontSize: 16,
        name: "FCFS",
        showInLegend: true,
        dataPoints: bry[0],
      },
      {
        type: "line",
        //lineColor: "#0b3bfc",
        indexLabelFontSize: 16,
        name: "SSTF",
        showInLegend: true,
        dataPoints: bry[1],
      },
      {
        type: "line",
        //lineColor: "#ff6cfb",
        indexLabelFontSize: 16,
        name: "SCAN",
        showInLegend: true,
        dataPoints: bry[2],
      },
      {
        type: "line",
        //lineColor: "#ff413f",
        indexLabelFontSize: 16,
        name: "CSCAN",
        showInLegend: true,
        dataPoints: bry[3],
      },
      {
        type: "line",
        //lineColor: "#ff9b04",
        indexLabelFontSize: 16,
        name: "LOOK",
        showInLegend: true,
        dataPoints: bry[4],
      },
      {
        type: "line",
        //lineColor: "#a800f7",
        indexLabelFontSize: 16,
        name: "CLOOK",
        showInLegend: true,
        dataPoints: bry[5],
      },
      // {
      //   type: "line",
      //   //lineColor: "#00ffdd",
      //   indexLabelFontSize: 16,
      //   name: "LIFO",
      //   showInLegend: true,
      //   dataPoints: bry[6],
      // },
    ],
  });
  chart.render();
  document.getElementById("comaprisonAnswers").innerHTML =
    title + ans + conclusion;
  document.getElementById("comaprisonAnswers").style.display = "block";
  document.getElementById("chartContainer").style.display = "block";
}

function resetComparisonResultFromAlgo() {
  let ele = document.getElementById("chartContainer2");
  ele.style.display = "none";
}

function comparison_click_from_algo() {
  let requestSequenceComparison = document.getElementById("Sequence").value;
  let headComparison = document.getElementById("Head").value;
  requestSequenceComparison = requestSequenceComparison
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });
  if (requestSequenceComparison.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  for (i = 0; i < requestSequenceComparison.length; ++i) {
    if (
      !Number.isInteger(+requestSequenceComparison[i]) ||
      !(+requestSequenceComparison[i] >= 0)
    ) {
      alert(
        "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  }
  if (headComparison.length === 0) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  if (
    !Number.isInteger(+headComparison) ||
    Number.isInteger(+headComparison) < 0
  ) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  headComparison = +headComparison;
  requestSequenceComparison = requestSequenceComparison
    .toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    })
    .map(function (a) {
      return +a;
    });
  if (!isValidInputNumbers(requestSequenceComparison, headComparison)) {
    alert(
      "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  ary = [];
  bry = [[]];
  cry = [];

  requestSequenceFcfs = requestSequenceComparison.slice();
  requestSequenceSstf = requestSequenceComparison.slice();
  requestSequenceScan = requestSequenceComparison.slice();
  requestSequenceCscan = requestSequenceComparison.slice();
  requestSequenceLook = requestSequenceComparison.slice();
  requestSequenceClook = requestSequenceComparison.slice();
  requestSequenceLifo = requestSequenceComparison.slice();

  resultFcfs = fcfs_man(requestSequenceFcfs, headComparison);
  resultSstf = sstf_man(requestSequenceSstf, headComparison);
  resultScan = scan_man(requestSequenceScan, headComparison);
  resultCscan = cscan_man(requestSequenceCscan, headComparison);
  resultLook = look_man(requestSequenceLook, headComparison);
  resultClook = clook_man(requestSequenceClook, headComparison);
  resultLifo = lifo_man(requestSequenceLifo, headComparison);

  let title = "Total Seek Time";
  ans = "FCFS - " + resultFcfs[0] + "\n";
  ans += "SSTF - " + resultSstf[0] + "\n";
  ans += "SCAN - " + resultScan[0] + "\n";
  ans += "CSCAN - " + resultCscan[0] + "\n";
  ans += "LOOK - " + resultLook[0] + "\n";
  ans += "CLOOK - " + resultClook[0] + "\n";
  ans += "LIFO - " + resultLifo[0] + "\n";

  cry.push(["FCFS", resultFcfs[0]]);
  cry.push(["SSTF", resultSstf[0]]);
  cry.push(["SCAN", resultScan[0]]);
  cry.push(["CSCAN", resultCscan[0]]);
  cry.push(["LOOK", resultLook[0]]);
  cry.push(["CLOOK", resultClook[0]]);
  cry.push(["LIFO", resultLifo[0]]);

  minimumTotalSeekCount = cry[0][1];
  for (m = 1; m < 7; ++m) {
    if (cry[m][1] < minimumTotalSeekCount) {
      minimumTotalSeekCount = cry[m][1];
    }
  }
  algorithmsHavingLeastTotalSeekCount = [];
  for (n = 0; n < 7; ++n) {
    if (cry[n][1] === minimumTotalSeekCount) {
      algorithmsHavingLeastTotalSeekCount.push(cry[n][0]);
    }
  }
  ary.push(resultFcfs[1]);
  ary.push(resultSstf[1]);
  ary.push(resultScan[1]);
  ary.push(resultCscan[1]);
  ary.push(resultLook[1]);
  ary.push(resultClook[1]);
  ary.push(resultLifo[1]);
  i = 0;
  ary.forEach(function (p) {
    p.forEach(function (q) {
      bry[i].push({ y: q });
    });
    if (i !== 6) {
      bry.push([]);
      ++i;
    }
  });

  const chart = new CanvasJS.Chart("chartContainer2", {
    animationEnabled: true,
    animationDuration: 5000,
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: "COMPARISON Chart",
    },
    axisY: {
      title: "Disk Numbers",
      titleFontColor: "rgb(0,0,0)",
    },
    legend: {
      cursor: "pointer",
      fontSize: 16,
      itemclick: function (e) {
        if (
          typeof e.dataSeries.visible === "undefined" ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
      //itemclick: toggleDataSeries
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "line",
        //lineColor: "#85ff6e",
        indexLabelFontSize: 16,
        name: "FCFS",
        showInLegend: true,
        dataPoints: bry[0],
      },
      {
        type: "line",
        //lineColor: "#0b3bfc",
        indexLabelFontSize: 16,
        name: "SSTF",
        showInLegend: true,
        dataPoints: bry[1],
      },
      {
        type: "line",
        //lineColor: "#ff6cfb",
        indexLabelFontSize: 16,
        name: "SCAN",
        showInLegend: true,
        dataPoints: bry[2],
      },
      {
        type: "line",
        //lineColor: "#ff413f",
        indexLabelFontSize: 16,
        name: "CSCAN",
        showInLegend: true,
        dataPoints: bry[3],
      },
      {
        type: "line",
        //lineColor: "#ff9b04",
        indexLabelFontSize: 16,
        name: "LOOK",
        showInLegend: true,
        dataPoints: bry[4],
      },
      {
        type: "line",
        //lineColor: "#a800f7",
        indexLabelFontSize: 16,
        name: "CLOOK",
        showInLegend: true,
        dataPoints: bry[5],
      },
      // {
      //   type: "line",
      //   //lineColor: "#00ffdd",
      //   indexLabelFontSize: 16,
      //   name: "LIFO",
      //   showInLegend: true,
      //   dataPoints: bry[6],
      // }
    ],
  });
  chart.render();
  document.getElementById("chartContainer2").style.display = "block";
  document.getElementById("title").innerText = title;
  document.getElementById("title").style.display = "block";
  document.getElementById("answers").innerText = ans;
  document.getElementById("answers").style.display = "block";
}
