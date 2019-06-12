const axios = require('axios');

module.exports = {
  runSync
};

const SYNC_TIME = 300000; // 5 mins

async function runSync(user) {
  if (shouldSync(user)) {
    await syncUser(user);
  }

  return user;
}

function syncUser(user) {
  return axios
    .post(`${process.env.HOST_WEBHOOKS}/v1/sync/${user.email}`)
    .catch(err => {
      console.log(`Error syncing user ${user.id}`);
      console.log(err);
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
