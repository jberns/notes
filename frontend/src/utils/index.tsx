export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const setCaretToEnd = (element: Element) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);

  //@ts-ignore
  element.focus();
};

export const getCaretCoordinates = (fromStart = true) => {
  let x = 0;
  let y = 0;

  let selection = window.getSelection();
  let range = selection?.getRangeAt(0).cloneRange();
  range?.collapse(false);

  let rect = range?.getClientRects()[0];
  if (rect) {
    x = rect.left;
    y = rect.top;
  }

  return { x, y };
};
