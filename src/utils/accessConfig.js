import getConfig from 'next/config';

export const {publicRuntimeConfig} = getConfig && typeof getConfig === 'function' && getConfig() ? getConfig() : {publicRuntimeConfig: {}};

const cache = {};

const accessConfig = (key, defaultValue) => {
  if (!(key in publicRuntimeConfig)) {
    if (defaultValue) {
      return defaultValue;
    }

    throw new Error(`${key} not found in publicRuntimeConfig!`);
  }

  if (cache[key]) {
    return cache[key];
  }

  cache[key] = publicRuntimeConfig[key];

  return publicRuntimeConfig[key];
};

export default accessConfig;
