import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {setConfig} from 'next/config';

import config from './next.config';

Enzyme.configure({adapter: new Adapter()});

setConfig(config.publicRuntimeConfig);

