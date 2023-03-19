import hasScroll from "./modules/hasScroll.js";
import initProperties from "./modules/setProperties.js";
import initCopyClipboard from "./modules/copyClipboard.js";

function init() {
  checkControlsScroll();
  initProperties();
  initCopyClipboard();
}
init();

function checkControlsScroll() {
  const formControls = document.forms.controls;
  const bool = hasScroll(formControls);

  if (bool) {
    formControls.style.paddingInlineEnd = 0.5 + "rem";
  }
}
