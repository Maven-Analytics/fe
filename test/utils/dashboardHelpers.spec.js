import expect from 'expect.js';
import {fromJS, List, Map} from 'immutable';

import * as dashboardHelpers from '../../src/utils/dashboardHelpers';

describe('Dashboard Helpers', () => {
  describe('getCourseProgress', () => {
    it('Should throw an error if enrollments is not an Immutable.List', () => {
      let enrollments = [{
        courseId: 12345
      }, {
        courseId: 6789
      }];

      expect(dashboardHelpers.getCourseProgress).withArgs(Map(), enrollments).to.throwError(/^enrollments must be a List/);
    });

    it('Should throw an error is the thinkific courses is not an Immutable.Map', () => {
      let enrollments = fromJS([{
        courseId: 12345
      }]);

      let course = {};

      expect(dashboardHelpers.getCourseProgress).withArgs(course, enrollments).to.throwError(/^course must be a Map/);
    });

    it('Should return undefined if the course is empty', () => {
      let course = Map();

      const progress = dashboardHelpers.getCourseProgress(course, fromJS([]));

      expect(progress).to.be(undefined);
    });

    it('Should return the formatted course if their are no enrollments', () => {
      let course = fromJS({
        var: 'test',
        thinkificCourseId: 1234
      });

      const progress = dashboardHelpers.getCourseProgress(course, fromJS([]));

      expect(progress.get('courseId')).to.be(1234);
      expect(progress.get('var')).to.be('test');
    });

    it('Should return undefined if the course does not have a thinkificCourseId', () => {
      let course = fromJS({
        var: 'test'
      });

      const progress = dashboardHelpers.getCourseProgress(course, fromJS([]));

      expect(progress).to.be(undefined);
    });

    it('Should return the formatted course if the enrollment is not found', () => {
      let course = fromJS({
        thinkificCourseId: '1234',
        title: 'Course Title'
      });

      let enrollments = fromJS([
        {
          courseId: 'ABC',
          percentage_completed: 0.89
        },
        {
          courseId: 'DEF'
        }
      ]);

      const progress = dashboardHelpers.getCourseProgress(course, enrollments);

      expect(progress.get('courseId')).to.be('1234');
      expect(progress.get('title')).to.be('Course Title');
      expect(progress.get('percentage_completed')).to.be(0);
    });

    it('Should return a properly formatted Map', () => {
      let course = fromJS({
        thinkificCourseId: '1234',
        title: 'Course Title'
      });

      let enrolllments = fromJS([
        {
          courseId: 'ABC'
        },
        {
          courseId: '1234',
          percentage_completed: 0.89
        }
      ]);

      const progress = dashboardHelpers.getCourseProgress(course, enrolllments);

      expect(progress.get('percentage_completed')).to.be(0.89);
      expect(progress.get('title')).to.be('Course Title');
      expect(progress.get('courseId')).to.be('1234');
    });
  });

  describe('getPathProgress', () => {
    it('Should throw an error if enrollments is not an Immutable.List', () => {
      let enrollments = [{
        courseId: 12345
      }, {
        courseId: 6789
      }];

      expect(dashboardHelpers.getPathProgress).withArgs(Map(), enrollments).to.throwError(/^enrollments must be a List/);
    });

    it('Should throw an error is the path is not an Immutable.Map', () => {
      let enrollments = fromJS([{
        courseId: 12345
      }]);

      let path = {};

      expect(dashboardHelpers.getPathProgress).withArgs(path, enrollments).to.throwError(/^path must be a Map/);
    });

    it('Should return undefined if path does not have courses', () => {
      let path = fromJS({
        id: '123'
      });

      let progress = dashboardHelpers.getPathProgress(path, List());

      expect(progress).to.be(undefined);
    });

    it('Should return undefined if path does not have courses', () => {
      let path = fromJS({
        id: '123'
      });

      let progress = dashboardHelpers.getPathProgress(path, List());

      expect(progress).to.be(undefined);
    });

    it('Should return the formatted path if the enrollmlents are empty', () => {
      let path = fromJS({
        id: '123',
        courses: [
          {
            thinkificCourseId: 1
          }
        ]
      });

      let progress = dashboardHelpers.getPathProgress(path, List());

      expect(progress.get('pathId')).to.be('123');
      expect(progress.get('percentage_completed')).to.be(0);
      expect(progress.get('path').equals(path)).to.be(true);
    });

    it('Should return the formatted path if the path does not have any courses', () => {
      let path = fromJS({
        id: '123',
        courses: []
      });

      let progress = dashboardHelpers.getPathProgress(path, List());

      expect(progress.get('pathId')).to.be('123');
      expect(progress.get('percentage_completed')).to.be(0);
      expect(progress.get('path').equals(path)).to.be(true);
    });

    it('Should return a percentage_completed of 0 if the path courses are not found in enrollments', () => {
      let path = fromJS({
        courses: [
          {
            thinkificCourseId: 1
          },
          {
            thinkificCourseId: 2
          },
          {
            thinkificCourseId: 3
          }
        ]
      });

      let enrollments = fromJS([
        {
          courseId: 6,
          percentage_completed: 0.56
        },
        {
          courseId: 7,
          percentage_completed: 0.2
        },
        {
          courseId: 8,
          percentage_completed: 0.3
        }
      ]);

      let progress = dashboardHelpers.getPathProgress(path, enrollments);

      expect(progress.get('percentage_completed')).to.be(0);
    });

    it('Should return a percentage_completed of 0 if the no enrollment progress has been made', () => {
      let path = fromJS({
        courses: [
          {
            thinkificCourseId: 1
          },
          {
            thinkificCourseId: 2
          },
          {
            thinkificCourseId: 3
          }
        ]
      });

      let enrollments = fromJS([
        {
          courseId: 1,
          percentage_completed: 0
        },
        {
          courseId: 2,
          percentage_completed: 0
        },
        {
          courseId: 3,
          percentage_completed: 0
        }
      ]);

      let progress = dashboardHelpers.getPathProgress(path, enrollments);

      expect(progress.get('percentage_completed')).to.be(0);
    });

    it('Should return a percentage_completed of .5/3 if one course is 50% done', () => {
      let path = fromJS({
        courses: [
          {
            thinkificCourseId: 1
          },
          {
            thinkificCourseId: 2
          },
          {
            thinkificCourseId: 3
          }
        ]
      });

      let enrollments = fromJS([
        {
          courseId: 1,
          percentage_completed: 0
        },
        {
          courseId: 2,
          percentage_completed: 0.5
        },
        {
          courseId: 3,
          percentage_completed: 0
        }
      ]);

      let progress = dashboardHelpers.getPathProgress(path, enrollments);

      expect(progress.get('percentage_completed')).to.be(0.5 / 3);
    });

    it('Should return a percentage_completed of 1/3 if two of the courses are 50% done', () => {
      let path = fromJS({
        courses: [
          {
            thinkificCourseId: 1
          },
          {
            thinkificCourseId: 2
          },
          {
            thinkificCourseId: 3
          }
        ]
      });

      let enrollments = fromJS([
        {
          courseId: 1,
          percentage_completed: 0.5
        },
        {
          courseId: 2,
          percentage_completed: 0.5
        },
        {
          courseId: 3,
          percentage_completed: 0
        }
      ]);

      let progress = dashboardHelpers.getPathProgress(path, enrollments);

      expect(progress.get('percentage_completed')).to.be(1 / 3);
    });

    it('Should return a percentage_completed of 1 if all 3 courses are completed', () => {
      let path = fromJS({
        courses: [
          {
            thinkificCourseId: 1
          },
          {
            thinkificCourseId: 2
          },
          {
            thinkificCourseId: 3
          }
        ]
      });

      let enrollments = fromJS([
        {
          courseId: 1,
          percentage_completed: 1
        },
        {
          courseId: 2,
          percentage_completed: 1
        },
        {
          courseId: 3,
          percentage_completed: 1
        }
      ]);

      let progress = dashboardHelpers.getPathProgress(path, enrollments);

      expect(progress.get('percentage_completed')).to.be(1);
    });

    it('Should set the completed flag & completed_at if all courses are completed', () => {
      let path = fromJS({
        courses: [
          {
            thinkificCourseId: 1
          },
          {
            thinkificCourseId: 2
          },
          {
            thinkificCourseId: 3
          }
        ]
      });

      let enrollments = fromJS([
        {
          courseId: 1,
          percentage_completed: 1,
          completed: true,
          completed_at: '2019-06-27T21:32:25.000Z'
        },
        {
          courseId: 2,
          percentage_completed: 1,
          completed: true,
          completed_at: new Date()
        },
        {
          courseId: 3,
          percentage_completed: 1
        }
      ]);

      let progress = dashboardHelpers.getPathProgress(path, enrollments);

      expect(progress.get('completed')).to.be(true);
      expect(progress.get('completed_at')).to.be('2019-06-27T21:32:25.000Z');
    });
  });

  describe('getMatchPercentage', () => {
    it('Should return the same Map if there recommended objects are not set', () => {

    });

    it('Should return the same Map if the recommended objects are empty', () => {

    });

    it('Should return the same Map if the id does not exist in the recommended objects', () => {

    });
  });
});
