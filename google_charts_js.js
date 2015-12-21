google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(drawMedsPieChart);

function drawMedsPieChart(data_to_display) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('number', 'Score');
  data.addRows(data_to_display);

  // Set chart options
  var options = {'title':'Meds',
                 'width':700,
                 'height':700,
                 'legend':'none'
                };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}


var connectedLink2 = "http://serket.uk/badges/badgelist"

$.getJSON(connectedLink2, function showData(data){

  data = filterByDate(data);
  var data = data.filter(datum => datum.dispenseDate.getMonth()===8);
  // throw out everything with an illegitimate medicine name

  var dataHappyName = data.filter(datum => happyMedName(datum.medicineName));
  console.log("Length of HappyName data: ", dataHappyName.length);

  // extract the medicine names that make sense
  var happyNameList = unique(dataHappyName.map(datum => getMedName(datum.medicineName))).sort();


  // count up the number of times each medicine is prescribed
  var happyNameScore = happyNameList.map(name => howManyTimes(name, dataHappyName));

  // zip up the two arrays, sort them, unzips again
  var happyNameBoth = happyNameList.map((name, index) => [name, happyNameScore[index]]);
  drawMedsPieChart(happyNameBoth)
});
