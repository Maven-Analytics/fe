import {List, Map} from 'immutable';

export function noop() {}

export function fire(actions, func, val) {
  return e => {
    let _func = actions[func];

    return (actions && func && typeof _func === 'function') ? _func(val || e) : null;
  };
}

export function click(func, val) {
  return e => (func && typeof func === 'function') ? func(val || typeof val !== 'undefined' ? val : e) : null;
}

export function clickPrevent(func, val) {
  return e => {
    e.preventDefault();
    e.stopPropagation();
    click(func, val)(e);
  };
}

export function imageLoaded(func, val) {
  return e => {
    if (func && typeof func === 'function') {
      func(val || typeof val !== 'undefined' ? val : e);
    }
  };
}

export function key(func, val) {
  return e => (func && typeof func === 'function') ? func(val || e) : null;
}

export function enter(func) {
  return e => {
    return (func && typeof func === 'function' && e.keyCode === 13) ? func() : null;
  };
}

export function escape(func) {
  return keyCode => {
    return (func && typeof func === 'function' && keyCode === 27) ? func() : null;
  };
}

export function state(func, key) {
  return e => (func && typeof func === 'function') ? func({[key]: e.target.value}) : null;
}

export function input(func, val) {
  return e => (func && typeof func === 'function') ? func(val || e.target.value) : null;
}

export function ref(target) {
  return e => {
    this[target] = e;
  };
}

export function isLoading(fetch, status) {
  return status.getIn([fetch, 'loading']);
}

export function topPosition(element) {
  if (!element) {
    return 0;
  }

  return element.offsetTop + topPosition(element.offsetParent);
}

export function absolutePosition(element) {
  const bodyRect = document.body.getBoundingClientRect();
  const clientRect = element.getBoundingClientRect();

  return {
    top: clientRect.top - bodyRect.top,
    left: clientRect.left - bodyRect.top
  };
}

export function intToList(int, properties = List()) {
  let list = List();

  for (let x = 1; x <= int; x++) {
    let obj = Map();

    if (properties && !properties.count()) {
      obj = x;
    } else {
      obj = properties.reduce((map, property) => {
        return map.set(property, x);
      }, Map());
    }

    list = list.push(obj);
  }

  return list;
}

export function camelCase(str) {
  return str
    .replace(/\s(.)/g, later => later.toUpperCase())
    .replace(/\s/g, '')
    .replace(/^(.)/, first => first.toLowerCase());
}

/**
 * Get how far a user has scrolled down a page
 * @return {Number} Y coordinate for how far a user has scrolled down a page
 */
export function getCurrentScrollY() {
  return window.scrollY ? window.scrollY : window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

/**
 * Return a new function wrapping a callback in an animation frame request
 * @param {function} callback the function to be called
 * @return {function} a function that can be called that will only trigger the callback when an animation frame is available
 */
export function raf(callback) {
  return e => window.requestAnimationFrame(() => callback(e));
}

export function canUseDOM() {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export function isScrolledIntoView(element, offset = 0, useDOM) {
  if (!useDOM) {
    return false;
  }

  const rect = element.getBoundingClientRect();

  // const elementTop = element.getBoundingClientRect().top - offset;
  // const elementBottom = element.getBoundingClientRect().bottom + offset;

  const windowHeight = getWindowHeight(useDOM);
  const clientHeight = document.documentElement.clientHeight;

  const inView = (
    rect.top - offset >= 0 &&
    rect.bottom <= (windowHeight || clientHeight) &&
    Boolean(element.offsetParent) // Ensures it has a parent that is visible
  );

  return inView;

  // return elementTop <= getWindowHeight(useDOM) && elementBottom >= 0;
}

export function getNodeHeight(useDOM, node) {
  if (!useDOM) {
    return 0;
  }

  if (!node) {
    return getWindowHeight(useDOM);
  }

  return node.clientHeight;
}

export function getWindowHeight(useDOM) {
  if (!useDOM) {
    return 0;
  }

  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName('body')[0];

  return w.innerHeight || e.clientHeight || g.clientHeight;
}
