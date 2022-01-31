import { addFooter } from "../../utils/misc";
import { Page } from "../router";

export const commentsPage: Page = {
  render: () => (`
    <h1>Hello Comments blyad</h1>
  `),
  afterRender: () => {
    addFooter();
  }
}