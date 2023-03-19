import hasScroll from "./hasScroll.js";
import setLocalStorage from "./saveLocalStorage.js";

export default function initProperties() {
  const formControls = document.forms.controls;
  const button = document.querySelector(".btn");
  const clearBtn = document.querySelector(".clear");
  const css = document.querySelector(".css");

  formControls.addEventListener("input", handleInput);

  clearBtn.addEventListener("click", () => {
    localStorage.clear();
    button.style = "";
    showCSS();
    checkCssScroll();
  });

  function handleInput(event) {
    const { name, value } = event.target;
    setProperties(name, value);
  }

  function setProperties(name, value) {
    const properties = {
      text() {
        button.innerText = value;
      },
      height() {
        if (!+value) {
          button.style[name] = "";
          return;
        }
        button.style[name] = value + "px";
      },
      width() {
        if (!+value) {
          button.style[name] = "";
          return;
        }
        button.style[name] = value + "px";
      },
      padding() {
        button.style.paddingInline = value * 2.5 + "px";
        button.style.paddingBlock = value + "px";
      },
      borderRadius() {
        button.style[name] = value + "px";
      },
      default() {
        button.style[name] = value;
      },
    };
    (properties[name] || properties.default)();
    showCSS();
    checkCssScroll();
    setLocalStorage(name, value);
  }

  function checkCssScroll() {
    const cssScroll = document.querySelector(".css-scroll");
    const bool = hasScroll(formControls);

    if (bool) {
      cssScroll.style.paddingInlineEnd = 0.5 + "rem";
    }
  }

  function showCSS() {
    let styles = button.style.cssText.split(";").filter(Boolean);
    styles = styles.map((style) => putStylePattern(style));
    css.innerHTML = styles.join("<br>");
  }

  function putStylePattern(style) {
    const [prop, val] = style.split(": ");
    const property = `<span class="token property">${prop.trim()}</span>`;
    const colon = `<span class="token punctuation">:</span>`;
    const value = `<span class="token value">${val}</span>`;
    const semicolon = `<span class="token punctuation">;</span>`;
    return property + colon + value + semicolon;
  }

  function setValues() {
    const properties = Object.keys(localStorage);
    properties.forEach((property) => {
      setProperties(property, localStorage[property]);
      formControls.elements[property].value = localStorage[property];
    });
  }
  setValues();
}
