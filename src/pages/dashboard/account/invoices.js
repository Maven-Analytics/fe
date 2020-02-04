import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {List, Map} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import AccountInvoiceList from '#root/components/accountInvoiceList';
import AccountLayout from '#root/components/layout/account';
import withAuthSync from '#root/components/withAuthSync';

const myInvoiceQuery = gql`
query MyInvoices {
  myInvoices {
    id
    amount_paid
    created
    hosted_invoice_url
    invoice_pdf
    number
    plan_description
    plan_id
    plan_nickname
    status
  }
}
`;

const AccountInvoices = () => {
  const {data: {myInvoices = []} = {}, loading, fetchMore} = useQuery(myInvoiceQuery);

  return (
    <AccountLayout title="Invoice History" activeLink={3}>
      <AccountInvoiceList invoices={myInvoices}/>
    </AccountLayout>
  );
};

AccountInvoices.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

AccountInvoices.defaultProps = {
  user: Map(),
  recommendedPaths: List(),
  recommendedCourses: List()
};

export default withAuthSync(AccountInvoices);
