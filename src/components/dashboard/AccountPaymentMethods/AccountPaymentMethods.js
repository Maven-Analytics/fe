import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as PropTypes from 'prop-types';
import React, {useState} from 'react';

import AddCard from '#root/components/shared/AddCard';
import Pill from '#root/components/shared/Pill/Pill';

import AccountList from '../AccountList';

const paymentMethodAddMutation = gql`
mutation PaymentMethodAdd($paymentMethod: String!) {
  paymentMethodAdd(paymentMethod: $paymentMethod) {
    id
  }
}
`;

const paymentMethodUpdateMutation = gql`
mutation PaymentMethodUpdate($paymentMethod: String!, $defaultMethod: Boolean!) {
  paymentMethodUpdate(paymentMethod: $paymentMethod, defaultMethod: $defaultMethod) {
    id
  }
}
`;

const paymentMethodRemoveMutation = gql`
mutation PaymentMethodRemove($paymentMethod: String!) {
  paymentMethodRemove(paymentMethod: $paymentMethod) {
    id
  }
}
`;

export const AccountPaymentMethods = ({fetching, paymentMethods, refetch}) => {
  const [view, setView] = useState('list');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [addPaymentMethod, {error: addError}] = useMutation(paymentMethodAddMutation);
  const [updatePaymentMethod] = useMutation(paymentMethodUpdateMutation);
  const [removePaymentMethod] = useMutation(paymentMethodRemoveMutation);

  const handleRemove = async paymentMethod => {
    setLoading(true);

    await removePaymentMethod({
      variables: {paymentMethod}
    });

    await refetch();

    setLoading(false);
  };

  const handleUpdate = async paymentMethod => {
    setLoading(true);

    await updatePaymentMethod({
      variables: {
        defaultMethod: true,
        paymentMethod
      }
    });

    await refetch();

    setLoading(false);
  };

  const handleComplete = async paymentMethod => {
    try {
      await addPaymentMethod({
        variables: {
          paymentMethod: paymentMethod.id
        }
      });

      await refetch();

      setLoading(false);

      setView('list');
    } catch (error) {
      setLoading(false);
    }
  };

  if (view === 'list') {
    return (
      <AccountList
        columns={[
          {
            // eslint-disable-next-line react/display-name
            renderItem: paymentMethod => (
              <span style={{alignItems: 'center', display: 'flex'}}>
                {paymentMethod.brand} ending in {paymentMethod.last4} {paymentMethod.default ? <Pill className="pinned" style={{fontSize: '0.9rem', verticalAlign: 'middle'}}>Default</Pill> : null}
              </span>
            ),
            label: ''
          },
          // eslint-disable-next-line react/display-name
          {renderItem: paymentMethod => (
            <>
              Expires on <strong>{paymentMethod.exp_month}/{paymentMethod.exp_year}</strong>
            </>
          ), label: ''},
          {
            // eslint-disable-next-line react/display-name
            renderItem: paymentMethod => (
              <span>
                {/* eslint-disable-next-line no-negated-condition */}
                {!paymentMethod.default ? (
                  <button
                    className="btn btn--sm btn--default"
                    disabled={paymentMethod.default || loading || fetching}
                    onClick={() => handleUpdate(paymentMethod.id)}
                  >
                  Set as Default
                  </button>
                ) : null}

                <button
                  className="btn btn--sm btn--default"
                  disabled={paymentMethod.default || loading || fetching}
                  onClick={() => handleRemove(paymentMethod.id)}
                >
                  Remove
                </button>
              </span>
            ),
            itemClass: 'buttons',
            label: ''
          }
        ]}
        columnClassList={['col-sm-4', 'col-sm-4', 'col-sm-4']}
        data={paymentMethods}
        showHeader={false}
        title="Credit Cards"
      >
        <>
          <button
            className="btn btn--sm btn--default"
            onClick={() => setView('edit')}
          >
            Add New Card
          </button>
        </>
      </AccountList>
    );
  }

  return (
    <AccountList
      columns={[
        {
          // eslint-disable-next-line react/display-name
          renderItem: () => (
            <AddCard
              error={error || addError}
              loading={loading}
              onCancel={() => setView('list')}
              onComplete={handleComplete}
              setError={setError}
              setLoading={setLoading}
            />
          ),
          itemClass: 'card',
          label: ''
        }
      ]}
      columnClassList={['col-12']}
      data={[{id: 1}]}
      showHeader={false}
      title="Credit Cards"
    />
  );
};

AccountPaymentMethods.propTypes = {
  fetching: PropTypes.bool,
  paymentMethods: PropTypes.array,
  refetch: PropTypes.func.isRequired
};

export default AccountPaymentMethods;
