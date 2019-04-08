import { postSin, getSin } from "./request";
import { textareaIsEmpty, clearTextarea } from "./utils";

export function onDOMContentLoaded() {
  getSin().then(sin => {
    document.getElementById("sinText").placeholder = sin.content;
  });
}

export function onSinFormSubmit(event) {
  event.preventDefault();

  const nodeName = event.target.nodeName;

  if (nodeName != "BUTTON") return;

  const form = event.target.form;
  const textarea = form.elements["sinText"];
  const target = event.target.id;

  const body = {};

  switch (target) {
    case "forgiveBtn":
      if (textareaIsEmpty(textarea)) {
        console.error("Textarea is empty");
        return false;
      }
      body["content"] = textarea.value;
      postSin(body).then(res => {
        console.log(res);
      });
      break;
    case "nextSin":
      clearTextarea(textarea);
      getSin().then(sin => {
        textarea.placeholder = sin.content;
      });
      break;
    default:
      console.error("Unexpected submit event");
  }
}
