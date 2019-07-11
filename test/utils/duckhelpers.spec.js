import expect from 'expect.js';
import {fromJS, List, Map} from 'immutable';

import * as duckHelpers from '../../src/utils/duckHelpers';

describe('Duck Helpers', () => {
  describe('stateMerge', () => {
    it('Should merge the state', () => {
      const state = fromJS([
        {id: '1'},
        {id: '2'},
        {id: '3'},
        {id: '4'}
      ]);

      const newData = [
        {id: '2', title: 'Title 2'},
        {id: '5', title: 'Title 5'}
      ];

      const merged = duckHelpers.stateMerge(state, newData);

      expect(merged.count()).to.be(5);
      expect(merged.get(0).get('id')).to.be('1');
      expect(merged.get(1).get('id')).to.be('2');
      expect(merged.get(1).get('title')).to.be('Title 2');
      expect(merged.get(4).get('id')).to.be('5');
      expect(merged.get(4).get('title')).to.be('Title 5');
    });
  });
});
