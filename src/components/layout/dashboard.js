import {isImmutable} from 'immutable';
import {DashboardHeader, Loader, MaIcon} from 'maven-ui';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

import CheckoutHeader from '#root/components/sections/checkoutHeader';
import CopyrightFooter from '#root/components/sections/copyrightFooter';
import {actions as stateActions} from '#root/redux/ducks/state';
import {selectors as userSelectors} from '#root/redux/ducks/user';

import {getTimeOfDay} from '../../utils/componentHelpers';
import BaseLayout from './base';
import {Routes} from '#root/routes';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const dashboardLinks = [
  {
    title: 'Dashboard',
    url: Routes.Dashboard
  },
  {
    title: 'Learning Paths',
    url: Routes.DashboardPaths
  },
  {
    title: 'Courses',
    url: Routes.DashboardCourses
  },
  {
    title: 'Credentials',
    url: Routes.DashboardCredentials
  }
];

const mySubscriptionsQuery = gql`
  query MySubscriptions {
    mySubscriptions {
      id
      canceled_at
      current_period_end
      current_period_start
      plan_id
      status
    }
  }
`;

const ErrorBanner = styled.div`
  background-color: ${props => props.theme.outrageousOrange};
  color: #fff;
  font-size: 1.4rem;
  padding: 2.2rem 0;

  a:not(.btn) {
    color: #fff;
    font-weight: 700;
    text-decoration: underline;
  }
`;

const DashboardLayout = ({children, title, activeLink, showWelcome, sidebar: Sidebar, loading}) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  const {data: {mySubscriptions = []} = {mySubscriptions: []}} = useQuery(mySubscriptionsQuery);

  const pastDueSubscriptions = mySubscriptions.filter(s => s.status === 'past_due');

  useEffect(() => {
    dispatch(
      stateActions.setProductSort({
        key: 'percentage_completed',
        order: 'DESC'
      })
    );
  }, []);

  return (
    <BaseLayout header={CheckoutHeader} footer={CopyrightFooter} mainClass="layout-dashboard" hideModals={['mobileMenu']}>
      {/* @TODO: Show alert if the user is enrolled, but all enrollments are expired */}
      <div className="layout-dashboard__wrap">
        <DashboardHeader
          activeLink={activeLink}
          links={dashboardLinks}
          title={title}
          welcome={showWelcome && isImmutable(user) ? `Good ${getTimeOfDay()}, ${user.get('first_name')}` : null}
        />
        {pastDueSubscriptions && pastDueSubscriptions.length ? (
          <ErrorBanner>
            <div className="container">
              <MaIcon icon="exclamation-circle" style={{marginRight: 13}} />
              Unfortunately, there was an error with your payment method. Please <Link href={Routes.AccountBilling}>click here</Link> to update your
              default payment card and resume your subscription.
            </div>
          </ErrorBanner>
        ) : null}
        <div className="container">
          <div className={['layout-dashboard__container', Sidebar ? 'has-sidebar' : ''].join(' ')}>
            {Sidebar ? (
              <aside className="layout-dashboard__sidebar">
                <Sidebar />
              </aside>
            ) : null}
            <div className="layout-dashboard__content">
              {loading ? <Loader width={100} height={100} loading={loading} align="top-center" /> : children}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  activeLink: PropTypes.number.isRequired,
  user: ImmutablePropTypes.map,
  showWelcome: PropTypes.bool,
  loading: PropTypes.bool,
  sidebar: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

DashboardLayout.defaultProps = {
  showWelcome: false,
  sidebar: null,
  loading: false
};

export default DashboardLayout;
