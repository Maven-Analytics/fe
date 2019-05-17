import {TimelineMax as Timeline, Power1} from 'gsap';

export const DEFAULT_VIEW_ANIMATION_TIME = 0.3;

export const DEFAULT_VIEW_ANIMATION_FROM = {
  position: 'absolute',
  y: 10, display: 'none',
  autoAlpha: 0,
  delay: 0,
  ease: Power1.easeIn
};

const defaultTimeline = node => {
  const timeline = new Timeline({paused: true});
  const view = node.querySelector('.view');

  if (!view) {
    return;
  }

  timeline.from(view, DEFAULT_VIEW_ANIMATION_TIME, DEFAULT_VIEW_ANIMATION_FROM);

  return timeline;
};

export const enter = (timeline, node, appears) => {
  const delay = appears ? 0 : 0.5;
  let t = timeline ? timeline(node, delay) : defaultTimeline(node, delay);

  if (!t) {
    return Promise.resolve();
  }

  Promise.resolve()
    .then(() => window.requestAnimationFrame(() => t.play()));
};

export const exit = node => {
  const timeline = new Timeline({paused: true});

  timeline.to(node, 0.1, {autoAlpha: 0, ease: Power1.easeOut});
  timeline.play();
};
