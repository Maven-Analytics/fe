import expect from 'expect.js';
import {fromJS, List, Map} from 'immutable';

import * as filterHelpers from '../../src/utils/filterHelpers';

describe('filterHelpers', () => {
  describe('getActiveFilters', () => {
    it('Should return an empty map if there are no active filters', () => {
      const filters = fromJS({
        tools: {
          key: 'tools',
          options: [
            'Tool 1'
          ],
          active: []
        },
        instructor: {
          key: 'author',
          options: ['author 1', 'author 2'],
          active: []
        }
      });

      const activeFilters = filterHelpers.getActiveFilters(filters);

      expect(Map.isMap(activeFilters)).to.be(true);
      expect(activeFilters.count()).to.be(0);
    });

    it('Should concat the active filters', () => {
      const filters = fromJS({
        tools: {
          key: 'tools',
          options: [
            'Tool 1'
          ],
          active: ['Tool 1']
        },
        instructor: {
          key: 'author',
          options: ['author 1', 'author 2'],
          active: ['author 1']
        }
      });

      const activeFilters = filterHelpers.getActiveFilters(filters);

      expect(activeFilters.count()).to.be(2);
      expect(activeFilters.getIn(['tools', 'key'])).to.be('tools');
      expect(activeFilters.getIn(['tools', 'active', 0])).to.be('Tool 1');
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

    it('Should return true if the course has any of the filters', () => {
      const activeFilter = fromJS({
        key: ['skills'],
        active: ['Excel', 'Data Analysis']
      });

      const course = fromJS({
        skills: ['Excel', 'MySql']
      });

      const res = filterHelpers.courseHasFilter(activeFilter, course);

      expect(res).to.be(true);
    });
  });

  describe('courseHasFilters', () => {
    it('Should return all 3 courses that have any of the filters', () => {
      const filters = fromJS({
        skills: {
          key: ['skills'],
          active: ['Excel', 'Data Analysis']
        }
      });

      const courses = fromJS([
        {
          skills: ['Excel']
        },
        {
          skills: ['Excel', 'Data Analysis'],
          author: {
            name: 'Author'
          }
        },
        {
          skills: ['Data Analysis']
        }
      ]);

      const res0 = filterHelpers.courseHasFilters(filters, courses.get(0));
      const res1 = filterHelpers.courseHasFilters(filters, courses.get(1));
      const res2 = filterHelpers.courseHasFilters(filters, courses.get(2));

      expect(res0).to.be(true);
      expect(res1).to.be(true);
      expect(res2).to.be(true);
    });
  });

  describe('getFilteredCourses', () => {
    it('Should return 2 courses if 2 courses have any of the filters', () => {
      const filters = fromJS({
        tools: {
          key: 'tools',
          id: 'tools',
          options: [
            'Tool 1',
            'Tool 2'
          ],
          active: ['tool 2']
        },
        instructor: {
          key: ['author', 'id'],
          id: 'author',
          active: ['123abc']
        }
      });

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

      expect(filteredCourses.count()).to.be(2);
    });

    it('Should return both courses only have 1 filter', () => {
      const filters = fromJS({
        tools: {
          key: 'tools',
          id: 'tools',
          options: [
            'Tool 1',
            'Tool 2'
          ],
          active: ['tool 2']
        },
        instructor: {
          key: ['author', 'id'],
          id: 'author',
          active: ['123abc']
        }
      });

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

      expect(filteredCourses.count()).to.be(2);
    });

    it('Should return 4 if all 4 courses have any of the 3 filters', () => {
      const filters = fromJS({
        tools: {
          key: 'tools',
          id: 'tools',
          options: [
            'Tool 1',
            'Tool 2'
          ],
          active: ['tool 1', 'tool 2']
        },
        instructor: {
          key: ['author', 'id'],
          id: 'author',
          active: ['123abc']
        }
      });

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
            id: '123'
          }
        },
        {
          author: {
            id: '123abc'
          }
        }
      ]);

      const filteredCourses = filterHelpers.getFilteredCourses(filters, courses);

      expect(filteredCourses.count()).to.be(4);
    });
  });

  describe('setFiltersFromQuery', () => {
    it('Should return the same filters if the query does not contain any corresponding ids', () => {
      const query = fromJS({
        key1: ['a', 'b']
      });

      const filters = fromJS({
        key2: {
          id: 1,
          active: []
        },
        key3: {
          id: 2,
          active: []
        }
      });

      const res = filterHelpers.setFiltersFromQuery(query, filters);

      expect(res.equals(filters)).to.be(true);
    });

    it('Should return the filters with the active set', () => {
      const query = fromJS({
        key2: ['a', 'b']
      });

      const filters = fromJS({
        key1: {
          id: 'key1'
        },
        key2: {
          id: 'key2'
        }
      });

      const res = filterHelpers.setFiltersFromQuery(query, filters);

      expect(res.getIn(['key2', 'active']).toJS()).to.have.length(2);
    });

    it('Should return the filters with the active set if it only has one value', () => {
      const query = fromJS({
        key2: 'a'
      });

      const filters = fromJS({
        key1: {
          id: 'key1'
        },
        key2: {
          id: 'key2'
        }
      });

      const res = filterHelpers.setFiltersFromQuery(query, filters);

      expect(res.getIn(['key2', 'active']).toJS()).to.have.length(1);
    });

    it('Should remove the filter from the active filters if the query is empty', () => {
      const query = fromJS({});

      const filters = fromJS({
        key1: {
          id: 'key1',
          active: ['value1']
        },
        key2: {
          id: 'key2'
        }
      });

      const res = filterHelpers.setFiltersFromQuery(query, filters);

      expect(res.getIn(['key1', 'active']).toJS()).to.have.length(0);
    });
  });
});
