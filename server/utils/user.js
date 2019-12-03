const axios = require('axios');

module.exports = {
  runSync,
  getUserById,
  userExpired,
  userIsFreeTrial,
  userEnrolled
};

const SYNC_TIME = 300000; // 5 mins

async function runSync(user, forceSync) {
  if (shouldSync(user) || forceSync) {
    await syncUser(user);
  }

  return user;
}

function syncUser(user) {
  return axios
    .post(`${process.env.HOST_WEBHOOKS}/v1/sync/${user.email}`)
    .catch(err => {
      console.log(`Error syncing user ${user.id}`, err.message);
      // Console.log(err);
      return err;
    });
}

function shouldSync(user) {
  if (!user) {
    return false;
  }

  const {last_sync} = user;

  if (!last_sync) {
    return true;
  }

  const lastSync = new Date(last_sync);
  const now = new Date();

  return now.getTime() - lastSync.getTime() > SYNC_TIME;
}

function getUserById(id) {
  return axios.get(`${process.env.HOST_API}/api/v1/user/${id}`)
    .then(res => res.data.data[0]);
}

function userEnrolled(enrollments) {
  // If their are no enrollments, the user is not enrolled
  if (!enrollments || !enrollments.length) {
    return false;
  }

  return enrollments.reduce((enrolled, enrollment) => {
    const hasExpirted = Boolean(enrollment.expiry_date);
    const expiryDate = new Date(enrollment.expiry_date).getTime();
    const now = new Date().getTime();

    if (enrollment.expired || (hasExpirted && now > expiryDate)) {
      enrolled = false;
    }

    return enrolled;
  }, true);
}

function userExpired(enrollments) {
  return enrollments.reduce((expired, enrollment) => {
    const hasExpirted = Boolean(enrollment.expiry_date);
    const expiryDate = new Date(enrollment.expiry_date).getTime();
    const now = new Date().getTime();

    if (enrollment.expired || (hasExpirted && now > expiryDate)) {
      expired = true;
    }

    return expired;
  }, false);
}

function userIsFreeTrial(enrollments) {
  return enrollments.reduce((isFreeTrial, enrollment) => {
    if (enrollment.is_free_trial) {
      isFreeTrial = true;
    }

    return isFreeTrial;
  }, false);
}
