var connectedLink2 = "http://serket.uk/badges/badgelist"

function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}

$.getJSON(connectedLink2, function showData(data){

  console.log("Length of data: ", data.length);

  // throw out everything without a date

  var dataWithDate = data.filter(datum => datum.dispenseDate);
  console.log("Length of WithDate data: ", dataWithDate.length);

  data = dataWithDate;

  // throw out everything with an illegitimate medicine name

  function happyMedName(name) {
    if (!name) return false;
    var words = [];
    words = name.split(" ").map(word => word.toLowerCase());
    var hasMG = words.reduce(((acc, word) => (acc || word.match(/mc?g/g))), false);
    return (words.length > 2) && hasMG;
  }

  var dataHappyName = data.filter(datum => happyMedName(datum.medicineName));
  console.log("Length of HappyName data: ", dataHappyName.length);

  // extract the medicine names that make sense

  function getMedName(fullName) {
    if (fullName === "") return "";
    return fullName.toLowerCase().split(" ")[0]
  }

  var happyNameList = unique(dataHappyName.map(datum => getMedName(datum.medicineName))).sort();
  console.log("number of HappyNames: ", happyNameList.length);

  // count up the number of times each medicine is prescribed

  function howManyTimes(medName, data) {
    return data.reduce(((acc, datum) => acc + (getMedName(datum.medicineName) == medName ? 1 : 0)), 0);
  }

  var happyNameScore = happyNameList.map(name => howManyTimes(name, dataHappyName));

  // zip up the two arrays, sort them, unzips again

  var happyNameBoth = happyNameList.map((name, index) => [name, happyNameScore[index]]);

  var sortedBoth = happyNameBoth.sort((a, b) => (b[1] - a[1]));

  var sortedNames = sortedBoth.map(pair => pair[0]);
  var sortedScores = sortedBoth.map(pair => pair[1]);

  // console.log(sortedNames);
  // console.log(sortedScores);


  var dispenseDateTimes = dataHappyName.map(datum => new Date(datum.dispenseDate));

  console.log(dispenseDateTimes.map(day => day.getMonth()));


});
