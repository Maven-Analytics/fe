import {Routes} from '../routes';

export const ssoRedirect = (token, returnTo = `${window.location.origin}/${Routes.Dashboard}`) => {
  window.location = `https://mavenanalytics.thinkific.com/api/sso/v2/sso/jwt?jwt=${token}&return_to=${returnTo}`;
};
