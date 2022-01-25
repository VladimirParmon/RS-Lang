import { listener } from "./navigation/listener";
import { router } from "./navigation/router";
import { getWords } from "./utils/api";

listener();
router('book')