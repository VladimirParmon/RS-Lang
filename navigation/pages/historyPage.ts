import { addFooter } from "../../utils/misc";
import { Page } from "../router";

export const historyPage: Page = {
  render: () => (`
    <h1>Hello History blyad</h1>
  `),
  afterRender: () => {
    addFooter();
  }
}