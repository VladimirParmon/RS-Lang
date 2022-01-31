import { addFooter } from "../../utils/misc";
import { Page } from "../router";

export const statsPage: Page = {
  render: () => (`
    <h1>Hello Stats blyad</h1>
  `),
  afterRender: () => {
    addFooter();
  }
}