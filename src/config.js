import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig && typeof getConfig === 'function' && getConfig() ? getConfig() : {publicRuntimeConfig: {}};

export default publicRuntimeConfig;
