import { useRef } from "camunda-modeler-plugin-helpers/react";

const dummyDiv = document.createElement('div');

export default () => {
  const reference = useRef(dummyDiv);
  return reference;
}