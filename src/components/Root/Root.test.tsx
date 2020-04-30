import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Root } from './index';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<Root />);
});
