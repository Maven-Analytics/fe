import TagManager from 'react-gtm-module';

import accessConfig from '#root/utils/accessConfig';
import {canUseDOM} from '#root/utils/componentHelpers';

const GtagScript = () => {
  if (!accessConfig('DISABLE_GTAG', false) && canUseDOM()) {
    TagManager.initialize({
      gtmId: 'GTM-M5F3PPK'
    });
  }

  return null;
};

export default GtagScript;
