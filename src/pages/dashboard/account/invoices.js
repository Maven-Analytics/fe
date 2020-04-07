import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {List, Map} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {AccountList} from 'maven-ui';

import AccountLayout from '#root/components/layout/account';
import withAuthSync from '#root/components/withAuthSync';
import {planIds} from '#root/constants';
import {centsToDollarString, formatDateMMDDYYYY} from '#root/utils/componentHelpers';

const myInvoiceQuery = gql`
  query MyInvoices {
    myInvoices {
      id
      amount_due
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
  const {data: {myInvoices = []} = {myInvoices: []}} = useQuery(myInvoiceQuery);

  return (
    <AccountLayout title="Invoice History" activeLink={3}>
      <div className="account-invoices">
        <AccountList
          columns={[
            {
              // eslint-disable-next-line react/display-name
              renderItem: invoice => (
                <a href={invoice.hosted_invoice_url} rel="noopener noreferrer" target="_blank">
                  {invoice.number}
                </a>
              ),
              label: 'Invoice #'
            },
            {
              renderItem: invoice => planIds[invoice.plan_id] || invoice.plan_name || invoice.plan_description,
              label: 'Subscription'
            },
            {
              renderItem: invoice => formatDateMMDDYYYY(invoice.created),
              label: 'Date'
            },
            {
              renderItem: invoice => invoice.status,
              label: 'Status'
            },
            {
              renderItem: invoice => centsToDollarString(invoice.amount_due),
              label: 'Amount Due'
            },
            {
              renderItem: invoice => centsToDollarString(invoice.amount_paid),
              label: 'Amount Paid'
            },
            {
              // eslint-disable-next-line react/display-name
              renderItem: invoice => (
                <a className="btn btn--default" href={invoice.hosted_invoice_url} rel="noopener noreferrer" target="_blank">
                  View Invoice
                </a>
              ),
              itemClass: 'link',
              label: ''
            }
          ]}
          columnClassList={['col-sm-2', 'col-sm-3', 'col-sm-2', 'col-sm-1', 'col-sm-2', 'col-sm-1', 'col-12']}
          data={myInvoices}
        />
      </div>
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
