

function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}

function happyMedName(name) {
  if (!name) return false;
  var words = [];
  words = name.split(" ").map(word => word.toLowerCase());
  var hasMG = words.reduce(((acc, word) => (acc || word.match(/mc?g/g))), false);
  return (words.length > 2) && hasMG;
}

function howManyTimes(medName, data) {
  return data.reduce(((acc, datum) => acc + (getMedName(datum.medicineName) == medName ? 1 : 0)), 0);
}

function getMedName(fullName) {
  if (fullName === "") return "";
  return fullName.toLowerCase().split(" ")[0]
}

function filterByDate(data) {
  var dataWithDate = data.filter(datum => datum.dispenseDate);
  return dataWithJsDate = dataWithDate.map(function(obj){
    obj.dispenseDate = new Date(obj.dispenseDate);
    return obj;
  });

};
