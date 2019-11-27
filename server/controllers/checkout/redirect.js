const axios = require('axios');

const {getServerUri} = require('../../utils/serverUtils');

const plans = [
  {
    id: 1,
    checkoutUrl: 'https://courses.mavenanalytics.io/enroll/471038',
    noTrialUrl: 'https://courses.mavenanalytics.io/enroll/597115'
  },
  {
    id: 2,
    checkoutUrl: 'https://courses.mavenanalytics.io/enroll/471038?price_id=516246',
    noTrialUrl: 'https://courses.mavenanalytics.io/enroll/597115?price_id=631228'
  }
];

module.exports = async request => {
  try {
    const planId = request.query.planId;

    let user = null;

    if (request.auth.token) {
      user = await getUser(request);
    }

    // Const checkout = await getCheckout(request.params.token);
    return {
      success: true,
      data: {
        checkoutUrl: getCheckoutUrl(planId, user)
      }
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

function getCheckoutUrl(planId, user) {
  const plan = plans.find(p => p.id === planId);

  return user && user.expired ? plan.noTrialUrl : plan.checkoutUrl;
}

function getUser(request) {
  console.log(request.auth.token);
  return axios.get(`${getServerUri(request)}/api/v1/me`, {
    headers: {
      Authorization: request.auth.token
    }
  })
    .then(res => res.data.data ? res.data.data.user : null);
}
