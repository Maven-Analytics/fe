import {memo} from 'react';
import TagManager from 'react-gtm-module';

import accessConfig from '#root/utils/accessConfig';
import {canUseDOM} from '#root/utils/componentHelpers';

const GtagScript = () => {
  if (!canUseDOM()) {
    return null;
  }

  if (!accessConfig('DISABLE_GTAG', false)) {
    TagManager.initialize({
      gtmId: 'GTM-M5F3PPK'
    });
  }

  return null;
};

export default memo(GtagScript);
