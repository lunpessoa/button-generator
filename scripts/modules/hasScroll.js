export default function hasScroll(element) {
  if (!element) return;
  return element.scrollHeight > element.clientHeight;
}
