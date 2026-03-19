import { pushGroup } from "./shared/processor.js";

export const createGroup = (name) => {
  pushGroup(name, []);
};