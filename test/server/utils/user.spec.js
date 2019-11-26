const UserUtils = require('../../../server/utils/user');

describe('UserUtils', () => {
  describe('userExpired', () => {
    it('Should return false if the user has no enrollments', () => {
      const enrollments = [];

      const res = UserUtils.userExpired(enrollments);
      expect(res).toBeFalsy();
    });

    it('Should return false if the user has no expired enrollments and expiry_date is null', () => {
      const enrollments = [
        {
          expired: false,
          expiry_date: null
        }
      ];

      const res = UserUtils.userExpired(enrollments);
      expect(res).toBeFalsy();
    });

    it('Should return false if the enrollment is not expired, but has en expiry date in the future', () => {
      const enrollments = [
        {
          expired: false,
          expiry_date: new Date().getTime() + 10000
        }
      ];

      const res = UserUtils.userExpired(enrollments);
      expect(res).toBeFalsy();
    });

    it('Should return true if the enrollment is expired, but the expiry_date is not null', () => {
      const enrollments = [
        {
          expired: true,
          expiry_date: null
        }
      ];

      const res = UserUtils.userExpired(enrollments);
      expect(res).toBeTruthy();
    });

    it('Should return true if one of the multiple enrollments is expired, but the expiry_date is not null', () => {
      const enrollments = [
        {
          expired: false,
          expiry_date: null
        },
        {
          expired: true,
          expiry_date: null
        },
        {
          expired: false,
          expiry_date: null
        }
      ];

      const res = UserUtils.userExpired(enrollments);
      expect(res).toBeTruthy();
    });

    it('Should return true if the enrollment is not expired, but the expiry_date is in the past', () => {
      const enrollments = [
        {
          expired: false,
          expiry_date: new Date().getTime() - 1000
        }
      ];

      const res = UserUtils.userExpired(enrollments);
      expect(res).toBeTruthy();
    });
  });

  describe('userIsFreeTrial', () => {
    it('Should return false if the user has no enrollments', () => {
      const enrollments = [];

      const res = UserUtils.userIsFreeTrial(enrollments);
      expect(res).toBeFalsy();
    });

    it('Should return false if the user has enrollments where none are free trials', () => {
      const enrollments = [
        {
          is_free_trial: false
        }
      ];

      const res = UserUtils.userIsFreeTrial(enrollments);
      expect(res).toBeFalsy();
    });

    it('Should return true if the only enrollment is a free trial', () => {
      const enrollments = [
        {
          is_free_trial: true
        }
      ];

      const res = UserUtils.userIsFreeTrial(enrollments);
      expect(res).toBeTruthy();
    });

    it('Should return true if one of the enrollments is_free_trial', () => {
      const enrollments = [
        {
          is_free_trial: false
        },
        {
          is_free_trial: true
        },
        {
          is_free_trial: false
        }
      ];

      const res = UserUtils.userIsFreeTrial(enrollments);
      expect(res).toBeTruthy();
    });
  });
});
