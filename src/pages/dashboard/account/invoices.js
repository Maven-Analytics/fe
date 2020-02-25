import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {List, Map} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import AccountList, {AccountListLink} from '#root/components/dashboard/AccountList';
import AccountLayout from '#root/components/layout/account';
import withAuthSync from '#root/components/withAuthSync';
import {planIds} from '#root/constants';
import {centsToDollarString, formatDateMMDDYYYY} from '#root/utils/componentHelpers';

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
  const {data: {myInvoices = []} = {}} = useQuery(myInvoiceQuery);

  return (
    <AccountLayout title="Invoice History" activeLink={3}>
      <div className="account-invoices">
        <AccountList
          columns={[
            {
              // eslint-disable-next-line react/display-name
              renderItem: invoice => (
                <AccountListLink external href={invoice.hosted_invoice_url}>
                  {invoice.number}
                </AccountListLink>
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
              renderItem: invoice => centsToDollarString(invoice.amount_paid),
              label: 'Amount'
            },
            {
              // eslint-disable-next-line react/display-name
              renderItem: invoice => (
                <AccountListLink isBtn external href={invoice.hosted_invoice_url}>
                  View Invoice
                </AccountListLink>
              ),
              itemClass: 'link',
              label: ''
            }
          ]}
          columnClassList={['col-sm-3', 'col-sm-4', 'col-sm-2', 'col-sm-1', 'col-sm-2', 'col-12']}
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
