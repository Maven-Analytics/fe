import expect from 'expect.js';
import {fromJS, List, Map} from 'immutable';

import * as filterHelpers from '../../src/utils/filterHelpers';

describe('filterHelpers', () => {
  describe('getActiveFilters', () => {
    it('Should return an empty list if there are no active filters', () => {
      const filters = fromJS([
        {
          key: 'tools',
          options: [
            'Tool 1'
          ],
          active: []
        },
        {
          key: 'author',
          options: ['author 1', 'author 2'],
          active: []
        }
      ]);

      const activeFilters = filterHelpers.getActiveFilters(filters);

      expect(List.isList(activeFilters)).to.be(true);
      expect(activeFilters.count()).to.be(0);
    });

    it('Should concat the active filters', () => {
      const filters = fromJS([
        {
          key: 'tools',
          options: [
            'Tool 1'
          ],
          active: ['Tool 1']
        },
        {
          key: 'author',
          options: ['author 1', 'author 2'],
          active: ['author 1']
        }
      ]);

      const activeFilters = filterHelpers.getActiveFilters(filters);

      expect(activeFilters.count()).to.be(2);
      expect(activeFilters.getIn([0, 'key'])).to.be('tools');
      expect(activeFilters.getIn([0, 'active', 0])).to.be('Tool 1');
    });
  });

  describe('courseHasFilter', () => {
    it('Should return false if the course does not have the filter', () => {
      const activeFilter = fromJS({
        key: 'tools',
        active: ['Tool 13']
      });

      const course = fromJS({
        tools: ['tool 1', 'tool 2']
      });

      const res = filterHelpers.courseHasFilter(activeFilter, course);

      expect(res).to.be(false);
    });

    it('Should return true if the has the filter in different case', () => {
      const activeFilter = fromJS({
        key: 'tools',
        active: ['tool 1']
      });

      const course = fromJS({
        tools: ['Tool 1', 'tool 2']
      });

      const res = filterHelpers.courseHasFilter(activeFilter, course);

      expect(res).to.be(true);
    });

    it('Should return true if the query is in different case', () => {
      const activeFilter = fromJS({
        key: 'tools',
        active: ['ToOl 1']
      });

      const course = fromJS({
        tools: ['tooL 1', 'tool 2']
      });

      const res = filterHelpers.courseHasFilter(activeFilter, course);

      expect(res).to.be(true);
    });

    it('Should return true if the course has the filter in a list', () => {
      const activeFilter = fromJS({
        key: 'tools',
        active: ['Tool 2']
      });

      const course = fromJS({
        tools: ['tool 1', 'Tool 2']
      });

      const res = filterHelpers.courseHasFilter(activeFilter, course);

      expect(res).to.be(true);
    });

    it('Should return true if the course has the filter in a string', () => {
      const activeFilter = fromJS({
        key: 'length',
        active: ['1']
      });

      const course = fromJS({
        length: '1'
      });

      const res = filterHelpers.courseHasFilter(activeFilter, course);

      expect(res).to.be(true);
    });

    it('Should return true if the key is a deep key and exists', () => {
      const activeFilter = fromJS({
        key: ['author', 'id'],
        active: ['12345lksdf']
      });

      const course = fromJS({
        author: {
          id: '12345lksdf'
        }
      });

      const res = filterHelpers.courseHasFilter(activeFilter, course);

      expect(res).to.be(true);
    });

    it('Should return false if the key is a deep key and does not exist', () => {
      const activeFilter = fromJS({
        key: ['author', 'id'],
        active: ['12345lksdf']
      });

      const course = fromJS({
        author: {
          id: '123abc'
        }
      });

      const res = filterHelpers.courseHasFilter(activeFilter, course);

      expect(res).to.be(false);
    });
  });

  describe('getFilteredCourses', () => {
    it('Should return only 1 if 1 course has both filters', () => {
      const filters = fromJS([
        {
          key: 'tools',
          id: 'tools',
          options: [
            'Tool 1',
            'Tool 2'
          ],
          active: ['tool 2']
        },
        {
          key: ['author', 'id'],
          id: 'author',
          active: ['123abc']
        }
      ]);

      const courses = fromJS([
        {
          tools: ['tool 1']
        },
        {
          tools: ['Tool 2'],
          author: {
            id: '123abc'
          }
        },
        {
          author: {
            name: 'Author'
          }
        },
        {
          author: {
            id: '123abc'
          }
        }
      ]);

      const filteredCourses = filterHelpers.getFilteredCourses(filters, courses);

      expect(filteredCourses.count()).to.be(1);
    });

    it('Should return 0 if both courses only have 1 filter', () => {
      const filters = fromJS([
        {
          key: 'tools',
          id: 'tools',
          options: [
            'Tool 1',
            'Tool 2'
          ],
          active: ['tool 2']
        },
        {
          key: ['author', 'id'],
          id: 'author',
          active: ['123abc']
        }
      ]);

      const courses = fromJS([
        {
          tools: ['tool 1']
        },
        {
          tools: ['Tool 2']
        },
        {
          author: {
            name: 'Author'
          }
        },
        {
          author: {
            id: '123abc'
          }
        }
      ]);

      const filteredCourses = filterHelpers.getFilteredCourses(filters, courses);

      expect(filteredCourses.count()).to.be(0);
    });

    it('Should return 1 if one courses only has all 3 filter', () => {
      const filters = fromJS([
        {
          key: 'tools',
          id: 'tools',
          options: [
            'Tool 1',
            'Tool 2'
          ],
          active: ['tool 1', 'tool 2']
        },
        {
          key: ['author', 'id'],
          id: 'author',
          active: ['123abc']
        }
      ]);

      const courses = fromJS([
        {
          tools: ['tool 1']
        },
        {
          tools: ['Tool 2']
        },
        {
          tools: ['Tool 1', 'Tool 2'],
          author: {
            name: 'Author'
          }
        },
        {
          author: {
            id: '123abc'
          }
        }
      ]);

      const filteredCourses = filterHelpers.getFilteredCourses(filters, courses);

      expect(filteredCourses.count()).to.be(0);
    });
  });

  describe('setFiltersFromQuery', () => {
    it('Should return the same filters if the query does not contain any corresponding ids', () => {
      const query = fromJS({
        key1: ['a', 'b']
      });

      const filters = fromJS([
        {
          id: 1
        },
        {
          id: 2
        }
      ]);

      const res = filterHelpers.setFiltersFromQuery(query, filters);

      expect(res.equals(filters)).to.be(true);
    });

    it('Should return the filters with the acitve set', () => {
      const query = fromJS({
        key2: ['a', 'b']
      });

      const filters = fromJS([
        {
          id: 'key1'
        },
        {
          id: 'key2'
        }
      ]);

      const res = filterHelpers.setFiltersFromQuery(query, filters);

      expect(res.getIn([1, 'active']).toJS()).to.have.length(2);
    });

    it('Should return the filters with the active set if it only has one value', () => {
      const query = fromJS({
        key2: 'a'
      });

      const filters = fromJS([
        {
          id: 'key1'
        },
        {
          id: 'key2'
        }
      ]);

      const res = filterHelpers.setFiltersFromQuery(query, filters);

      expect(res.getIn([1, 'active']).toJS()).to.have.length(1);
    });
  });
});
