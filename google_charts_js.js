google.load('visualization', '1.0', {'packages':['corechart']});
//google.setOnLoadCallback(drawMedsPieChart);

function drawMedsPieChart(data_to_display) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Day');
  data.addColumn('number', 'Number');

  data.addRows(data_to_display);

  // Set chart options
  var options = {'title':'Medicine by number of prescriptions, all time',
                 'width':700,
                 'height':400,
                 'legend':'none'
                };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.AnnotationChart(document.getElementById('chart1_div'));
  chart.draw(data, options);
}

function drawMedsPieChart1(data_to_display) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Day');
  data.addColumn('number', 'Number');
  data.addRows(data_to_display);

  // Set chart options
  var options = {'title':'Medicine by number of prescriptions, all time',
                 'width':700,
                 'height':400,
                 'legend':'none'
                };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.AnnotationChart(document.getElementById('chart2_div'));
  chart.draw(data, options);
}
function drawMedsPieChart2(data_to_display) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Day');
  data.addColumn('number', 'Number');

  data.addRows(data_to_display);

  // Set chart options
  var options = {'title':'Medicine by number of prescriptions, all time',
                 'width':700,
                 'height':400,
                 'legend':'none'
                };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.AnnotationChart(document.getElementById('chart2_div'));
  chart.draw(data, options);
}



var connectedLink2 = "http://serket.uk/badges/badgelist"

$.getJSON(connectedLink2, function showData(data){

  data = filterByDate(data);

  data = data.filter(datum => datum.dispenseDate.getMonth()===9);

  dataTrue = data.filter(datum => datum.statePattern);
  dataFalse = data.filter(datum => !datum.statePattern);
  // throw out everything with an illegitimate medicine name
  var dataHappyName = data.filter(datum => happyMedName(datum.medicineName));
  // extract the medicine names that make sense
  var happyNameList = unique(dataHappyName.map(datum => getMedName(datum.medicineName))).sort();
  // count up the number of times each medicine is prescribed
  var happyNameScore = happyNameList.map(name => howManyTimes(name, dataHappyName));

  // zip up the two arrays, sort them, unzips again
  var happyNameBoth = happyNameList.map((name, index) => [name, happyNameScore[index]]);

  allDispence = dispenceVsDay(data);
  trueDispence = dispenceVsDay(dataTrue);
  falseDispence = dispenceVsDay(dataFalse);
  dataToDispay = [allDispence, trueDispence, falseDispence];

  drawMedsPieChart(allDispence);
  drawMedsPieChart1(allDispence);
  drawMedsPieChart2(allDispence);

});
