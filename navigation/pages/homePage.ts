import { Page } from "../router";

export const homePage: Page = {
  render: () => (`
  <div id="wrapperHome">
    <div id="logoWrapper">
      <h1 id="logo"><span>R</span><span>S</span><span> Lang</span></h1>
    </div>
    <div id="homeNextPage">
      <span>Еще никогда не было так просто выучить новый язык</span>
      <span><b>Узнать больше</b></span>
      <span>▽</span>
    </div>
  </div>
  `),
  afterRender: () => {
  }
}