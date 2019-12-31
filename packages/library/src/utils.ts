export function getTagValue(rootEl: Element, query: any,  defaultValue: any) {
  let el: Element;
  if (query === null) {
    el = rootEl;
  } else {
    el = rootEl.querySelector(query);
  }

  const val = (el)? el.textContent? el.textContent : defaultValue : defaultValue;
  return val;
}

export function getAttributeValue(rootEl: Element, query: any, attrName: any, defaultValue: any) {
  let el: Element;

  if (query === null) {
    el = rootEl;
  } else {
    el = rootEl.querySelector(query);
  }

  let val = defaultValue;

  if (el) {
    if (el.attributes) {
      if (el.attributes[attrName]) {
        val = el.attributes[attrName].value;
      }
    }
  }
  return val;
}
