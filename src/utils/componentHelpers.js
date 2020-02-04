import {List, Map} from 'immutable';

export function noop() { }

export function fire(actions, func, val) {
  return e => {
    let _func = actions[func];

    return actions && func && typeof _func === 'function' ? _func(val || e) : null;
  };
}

export function click(func, val) {
  return e => (func && typeof func === 'function' ? func(val || typeof val !== 'undefined' ? val : e) : null);
}

export function clickPrevent(func, val) {
  return e => {
    e.preventDefault();
    e.stopPropagation();
    click(func, val)(e);
  };
}

export function eventPrevent(func) {
  return e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    func(e);
  };
}

export function clickAction(...arr) {
  return e => {
    e.preventDefault();
    e.stopPropagation();
    const func = arr[0];

    if (func && typeof func === 'function') {
      return func(...arr.slice(1));
    }

    return null;
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
  return e => (func && typeof func === 'function' ? func(val || e) : null);
}

export function enter(func) {
  return e => {
    return func && typeof func === 'function' && e.keyCode === 13 ? func() : null;
  };
}

export function escape(func) {
  return keyCode => {
    return func && typeof func === 'function' && keyCode === 27 ? func() : null;
  };
}

export function state(func, key) {
  return e => (func && typeof func === 'function' ? func({[key]: e.target.value}) : null);
}

export function stateVal(func, key) {
  return val => (func && typeof func === 'function' ? func({[key]: val}) : null);
}

export function stateCheck(func, key) {
  return e => (func && typeof func === 'function' ? func({[key]: e.target.checked}) : null);
}

export function check(func) {
  return e => (func && typeof func === 'function' ? func(e.target.checked) : null);
}

export function stateNum(func, key) {
  return e => (func && typeof func === 'function' ? func({[key]: parseFloat(e.target.value)}) : null);
}

export function input(func, val) {
  return e => (func && typeof func === 'function' ? func(val || e.target.value) : null);
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
  return window.scrollY ?
    window.scrollY :
    window.pageYOffset ?
      window.pageYOffset :
      (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

/**
 * Return a new function wrapping a callback in an animation frame request
 * @param {function} callback the function to be called
 * @return {function} a function that can be called that will only trigger the callback when an animation frame is available
 */
export function raf(callback) {
  return e => window.requestAnimationFrame(() => callback(e));
}

export function innerHtml(html) {
  return {__html: html};
}

export function canUseDOM() {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export const isElementXPercentInViewport = function (el, percentVisible = 0) {
  if (!el) {
    return false;
  }

  let rect = el.getBoundingClientRect();
  let windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return !(
    Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / Number(-(rect.height / 1))) * 100) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  );
};

export function isScrolledIntoView(element, offset = 0, useDOM) {
  if (!useDOM || !element) {
    return false;
  }

  const elementTop = element.getBoundingClientRect().top - offset;
  const elementBottom = element.getBoundingClientRect().bottom + offset;
  return elementTop <= getWindowHeight(useDOM) && elementBottom >= 0;
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

export function isTouchDevice() {
  return canUseDOM ? 'ontouchstart' in document.documentElement : false;
}

export function prettyPercent(decimal) {
  if (!decimal) {
    return 0;
  }

  return Math.round((decimal * 100).toFixed(2));
}

export const handleScrollIntoView = selector => {
  return e => {
    e.preventDefault();

    const targetEl = document.querySelector(selector);

    if (!targetEl) {
      return;
    }

    targetEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
};

export const getTimeOfDay = () => {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return 'morning';
  }

  if (curHr < 17) {
    return 'afternoon';
  }

  return 'evening';
};

export const formatDateMMDDYYYY = dateStr => {
  if (!dateStr) {
    return null;
  }

  const date = new Date(dateStr);

  if (!date) {
    return null;
  }

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month < 9 ? `0${month}` : month}/${day}/${year}`;
};

export const centsToDollarString = (cents, prefix = '$') => {
  if (!cents) {
    return `${prefix ? prefix : ''}${twoDecimals(0)}`;
  }

  const dollars = cents / 100;

  return `${prefix ? prefix : ''}${twoDecimals(dollars)}`;
};

export function twoDecimals(value) {
  value = parseFloat(value);

  if (value === 0) {
    return '0.00';
  }

  return (Math.floor(value * 100) / 100).toFixed(2);
}

export const canUseWebP = () => {
  if (!canUseDOM()) {
    return false;
  }

  var elem = document.createElement('canvas');

  if (elem && elem.getContext && elem.getContext('2d')) {
    // Was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // Very old browser like IE 8, canvas not supported
  return false;
};
