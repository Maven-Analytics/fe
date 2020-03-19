import {memo} from 'react';
import TagManager from 'react-gtm-module';

import {canUseDOM} from '#root/utils/componentHelpers';
import {env} from '#root/constants';

const DISABLE_GTAG = env.DISABLE_GTAG;

const GtagScript = () => {
  if (!canUseDOM()) {
    return null;
  }

  if (!DISABLE_GTAG) {
    TagManager.initialize({
      gtmId: 'GTM-M5F3PPK'
    });
  }

  return null;
};

export default memo(GtagScript);
