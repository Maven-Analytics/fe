import TagManager from 'react-gtm-module';
import accessConfig from '#root/utils/accessConfig';
import {canUseDOM} from '#root/utils/componentHelpers';
import {memo} from 'react';

const GtagScript = () => {
  if (!canUseDOM()) {
    return null;
  }

  console.log('DISABLE_GTAG: ', accessConfig('DISABLE_GTAG'));

  if (!accessConfig('DISABLE_GTAG', false)) {
    TagManager.initialize({
      gtmId: 'GTM-M5F3PPK'
    });
  }

  return null;
};

export default memo(GtagScript);
