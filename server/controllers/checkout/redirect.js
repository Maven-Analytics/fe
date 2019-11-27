const axios = require('axios');

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

const port = process.env.PORT || 5000;

module.exports = async (request, h) => {
  try {
    const planId = request.query.planId;

    let user = null;

    if (request.auth.token) {
      user = await getUser(request.auth.token);
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

function getUser(token) {
  return axios.get(`http://localhost:${port}/api/v1/me`, {
    headers: {
      Authorization: token
    }
  })
    .then(res => res.data.data.user);
}
