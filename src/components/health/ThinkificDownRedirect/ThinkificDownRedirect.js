import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {selectors as stateSelectors} from '#root/redux/ducks/state';
import {Routes} from '#root/routes';
import {canUseDOM} from '#root/utils/componentHelpers';

const ThinkificDownRedirect = ({children}) => {
  if (!canUseDOM()) {
    return children;
  }

  const router = useRouter();
  const state = useSelector(stateSelectors.getState);
  const loading = useSelector(loadingSelectors.getLoading(['THINKIFIC_HEALTH']));
  const healthy = state.getIn(['health', 'thinkific']);

  useEffect(() => {
    if (!healthy && !loading) {
      router.push(Routes.Error);
    }
  }, [healthy, loading]);

  return children;
};

export default ThinkificDownRedirect;
