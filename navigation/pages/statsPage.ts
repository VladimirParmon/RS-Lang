
import { createChart } from '../../utils/chart';
import { addFooter } from '../../utils/misc';
import { rewriteWholePackage, statistics } from '../../utils/storage';
import { Page } from '../router';

export const statsPage: Page = {
  render: async () => {
    const today = new Date();
    const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

    let percentage = (statistics.totalRight *  100) / (statistics.totalRight + statistics.totalWrong);
    if (!percentage) percentage = 0;
    return `
    <div id="wrapper-stats">
      <div id="wrapper-stats-circles">
        <div class="statsCircles"><span id="newWords">${statistics.new}</span><div class="statsCirclesInner"></div></div>
        <div class="statsCircles"><span id="learntWordsStats">${statistics.learnt}</span><div class="statsCirclesInner"></div></div>
        <div class="statsCircles"><span id="percentage">${percentage.toFixed(0)}%</span><div class="statsCirclesInner"></div></div>
        <div class="statsCircles"><span id="longestSeries">${statistics.inARowMax}</span><div class="statsCirclesInner"></div></div>
      </div>
      <div id="wrapper-stats-charts">
        <div id="chartDaysWrapper">
          <canvas id="chartDays"></canvas>
        </div>
        <div id="chartWordsWrapper">
          <canvas id="chartWords"></canvas>
        </div>
      </div>
    </div>
    `
  },
  afterRender: () => {
    addFooter();
    rewriteWholePackage();
    createChart();
  }
};
