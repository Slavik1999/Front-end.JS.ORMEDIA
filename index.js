var temperature = {
  Germany: 90,
  Italy: 40,
  Belarus: 20,
  Russia: 10
};

Name = obj => {
  for (val in obj) {
    console.log(val, obj[val]);
  }
};

Name(temperature);

function srTemperature(temperature) {
  var sumTemperature = 0;
  var iter = 0;

  for (var val in temperature) {
    sumTemperature = sumTemperature + temperature[val];
    iter++;
  }

  var srTemperature = Math.floor(sumTemperature / iter);
  return srTemperature;
}

alert("Средняя температура всех стран: " + srTemperature(temperature));

function maxTemperature(temperature) {
  var allTemperature = new Array();

  for (var val in temperature) {
    allTemperature.push(temperature[val]);
  }

  max = Math.max.apply(null, allTemperature);
  return max;
}

alert("Максимальная температура в странах: " + maxTemperature(temperature));
