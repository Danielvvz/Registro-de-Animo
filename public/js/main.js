const global = {
  fillCanvas: function fillCanvas($canvas, logs) {
    var hourAvg = Array.from({ length: 24 }, () => { return [] });
    for (const log of logs) {
      const hour = moment(log.timestamp).format('H');
      hourAvg[hour].push(log.level);
    }
    hourAvg = hourAvg.map(function (value) {
      if (value.length) {
        let average = (array) => array.reduce((a, b) => a + b) / array.length;
        value = average(value);
      } else {
        value = null;
      }
      return value;
    });
    // Fill canvas
    new Chart($canvas[0].getContext('2d'), {
      type: 'line',
      data: {
        labels: Array.from({ length: 24 }, (value, index) => {
          return index;
        }),
        datasets: [{
          label: moment().format('YYYY-MM-DD'),
          data: hourAvg,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 10
            }
          }]
        }
      }
    });
  }
};

(function() {
  $(function() {
    M.AutoInit();
  });
})();