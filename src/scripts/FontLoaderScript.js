import * as FontFaceObserver from 'fontfaceobserver';

import {canUseDOM} from '#root/utils/componentHelpers';

const FontLoaderScript = () => {
  if (!canUseDOM()) {
    return null;
  }

  if (document.body.classList.contains('icons-loaded')) {
    return null;
  }

  const icons = [new FontFaceObserver('maicon')];

  const iconPromises = icons.map(icon => icon.load());

  Promise.all(iconPromises).then(() => {
    document.body.classList.add('icons-loaded');
  });

  return null;
};

export default FontLoaderScript;
