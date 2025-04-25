'use strict';
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    floatchart();
  }, 500);
});

function convertToRupiah (amount) {
  var rupiah = '';
  var separator;
  var number_string = amount.toString().replace(/[^,\d]/g, '').toString();
  var split = number_string.split(',');
  var sisa = split[0].length % 3;
  var rupiah = split[0].substr(0, sisa);
  var ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }
  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return 'Rp. ' + rupiah;
}

function floatchart() {
  (function () {
    var options = {
      chart: {
        height: 450,
        type: 'donut',
        toolbar: {
          show: false
        }
      },
      dataLables: {
        enabled: true,
        formatter: function(val) {
          return val + ' Tiket'
        }
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
                formatter: function (val) {
                  return val + ' Tiket'
                }
              },
              total: {
                show: true,
                showAlways: false,
                label: 'Total Tiket',
                formatter: function (w) {
                  var total = 0;
                  for (var i = 0; i < w.globals.series.length; i++) {
                    total += w.globals.series[i];
                  }
                  return total + ' Tiket';
                }
              }
            }
          }
        }
      },
      colors: ['#ff7172', '#13c2c2', '#a370f7', '#1890ff', '#fd9843'],
      series: [857, 54, 47, 0, 300],
      labels: ['Presale 1 (Rp 85.000)', 'Presale 2 (Rp 105.000)', 'Presale 3 (Rp 130.000)', 'OTS (Rp 0)', 'Free Tiket (Team & Sponsor)'],
    };
    var chart = new ApexCharts(document.querySelector('#visitor-chart'), options);
    chart.render();
  })();

  (function () {
    var options = {
      chart: {
        height: 450,
        type: 'donut',
        toolbar: {
          show: false
        }
      },
      dataLables: {
        enabled: true,
        formatter: function (val) {
          return convertToRupiah(val);
        }
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
                formatter: function (val) {
                  return convertToRupiah(val);
                }
              },
              total: {
                show: true,
                showAlways: false,
                label: 'Total Pendapatan',
                formatter: function (w) {
                  var total = 0;
                  for (var i = 0; i < w.globals.series.length; i++) {
                    total += w.globals.series[i];
                  }
                  return convertToRupiah(total);
                }
              }
            }
          }
        }
      },
      colors: ['#ff7172', '#13c2c2', '#a370f7', '#1890ff', '#fd9843'],
      series: [72845000, 5670000, 6110000, 0, 0],
      labels: ['Presale 1', 'Presale 2', 'Presale 3', 'OTS', 'Free Tiket (Team & Sponsor)'],
    };
    var chart = new ApexCharts(document.querySelector('#income-overview-chart'), options);
    chart.render();
  })();
}
