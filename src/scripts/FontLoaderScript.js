import * as FontFaceObserver from 'fontfaceobserver';
import {memo, useEffect} from 'react';

import {canUseDOM} from '#root/utils/componentHelpers';

const FontLoaderScript = () => {
  if (!canUseDOM()) {
    return null;
  }

  useEffect(() => {
    const icons = [new FontFaceObserver('maicon')];

    const iconPromises = icons.map(icon => icon.load(null, 5000));

    Promise.all(iconPromises).then(() => {
      document.body.classList.add('icons-loaded');
    });
  }, []);

  return null;
};

export default memo(FontLoaderScript);
