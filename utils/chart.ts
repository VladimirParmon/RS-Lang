import Chart from 'chart.js/auto';
import { wholePackage } from './storage';

export async function createChart() {
  const canvasDays = document.getElementById('chartDays')! as HTMLCanvasElement;
  const contextDays = canvasDays.getContext('2d')!;
  const canvasWords = document.getElementById('chartWords')! as HTMLCanvasElement;
  const contextWords = canvasWords.getContext('2d')!;

  drawCharts();
  
  function drawCharts() {
    let yValuesDays: number[] = []; //общее кол слов за все дни
    let yValuesWords: number[] = []; //сколько именно в этот день
    let xValue: string[] = [];
    enum Months {
      'января' = 1,
      'февраля' = 2,
      'марта' = 3,
      'апреля' = 4,
      'мая' = 5,
      'июня' = 6,
      'июля' = 7,
      'августа' = 8,
      'сентября' = 9,
      'октября' = 10,
      'ноября' = 11,
      'декабря' = 12,
    }

    let acc = 0;
    for (let key in wholePackage) {
      acc += wholePackage[key].new;
      yValuesDays.push(acc);
      yValuesWords.push(wholePackage[key].new);
      const dateSpan = key.split('-');
      const monthNum = Number(dateSpan[1]);
      const dayNum = Number(dateSpan[0]);
      const month = Months[monthNum];
      const prettyDate = dateSpan[0] + ' ' + month;
      xValue.push(prettyDate);
    }

    const targetDate = new Date();
    for (let i = 1; i < 5; i++) {
      targetDate.setDate(targetDate.getDate() + 1);
      const dd = targetDate.getDate();
      const mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
      const dateString = dd + ' ' + Months[mm];
      xValue.push(dateString);
    }

    const myChart = new Chart(contextDays, {
      type: 'line',
      data : {
        labels: xValue,
        datasets: [{
          label: 'Прирост слов по дням',
          data: yValuesDays,
          fill: false,
          backgroundColor: "#a9a9a9",
          borderColor: "#474554",
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        color: '#000',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              font: {
                size: 24,
                family: 'Roboto, sans-serif'
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: "#000"
            }
          },
          y: {
            ticks: {
              color: "#000"
            }
          }
        }
      }
    });

    const myChart2 = new Chart(contextWords, {
      type: 'bar',
      data: {
          labels: xValue,
          datasets: [{
              label: 'Количество новых слов',
              data: yValuesWords,
              backgroundColor: [
                'rgba(197, 194, 213, 0.8)',
                'rgb(255, 189, 168, 0.8)',
                'rgba(148, 181, 174, 0.8)'
              ],
              borderColor: [
                'rgba(197, 194, 213, 1)',
                'rgb(255, 189, 168, 1)',
                'rgba(148, 181, 174, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        color: '#000',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              font: {
                size: 24,
                family: 'Roboto, sans-serif'
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: "#000"
            }
          },
          y: {
            ticks: {
              color: "#000"
            }
          }
        }
      }
  });
  }
}
