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
  var chart = new google.visualization.AnnotationChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}




var connectedLink2 = "http://serket.uk/badges/badgelist"

$.getJSON(connectedLink2, function showData(data){

  data = filterByDate(data);
  var start  = new Date(2015, 10, 0);
  var end    = new Date(2015, 10, 30);
  var range = moment.range(start , end);

  data = data.filter(datum => range.contains(datum.dispenseDate));

  //data = data.filter(datum => datum.dispenseDate.getMonth()===10);
  dataTrue = data.filter(datum => datum.statePattern);
  dataFalse = data.filter(datum => !datum.statePattern);

  scoreAccuracy = function(data){
    dispenseDates = unique(data.map(datum => datum.dispenseDate))

  };

  var dispenseDates = unique(data.map(datum => datum.dispenseDate))

  var dateScore = dispenseDates.map(name => howManyTimesDate(name.getDate(), data))

  var salesTime = dispenseDates.map((datum, index) => [datum, dateScore[index]]);
  drawMedsPieChart(salesTime)

});


// // throw out everything with an illegitimate medicine name
// var dataHappyName = data.filter(datum => happyMedName(datum.medicineName));
// // extract the medicine names that make sense
// var happyNameList = unique(dataHappyName.map(datum => getMedName(datum.medicineName))).sort();
// // count up the number of times each medicine is prescribed
// var happyNameScore = happyNameList.map(name => howManyTimes(name, dataHappyName));
//
// // zip up the two arrays, sort them, unzips again
// var happyNameBoth = happyNameList.map((name, index) => [name, happyNameScore[index]]);
