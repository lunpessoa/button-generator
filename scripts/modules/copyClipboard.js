export default function initCopyClipboard() {
  copyClipboard();
}

function copyClipboard() {
  const copy = document.querySelector(".copy");

  const events = ["click", "touchstart"];

  events.forEach((e) => copy.addEventListener(e, handleClick));

  function handleClick(event) {
    event.preventDefault();
    const button = document.querySelector(".btn");
    let styles = button.style.cssText;
    navigator.clipboard
      .writeText(styles)
      .then(() => alert("Copied to clipboard"));
  }
}
