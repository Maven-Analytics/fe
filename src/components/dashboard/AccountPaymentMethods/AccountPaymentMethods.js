import * as PropTypes from 'prop-types';
import React, {useState} from 'react';

import AddCard from '#root/components/shared/AddCard';

import AccountList from '../AccountList';

export const AccountPaymentMethods = ({paymentMethods}) => {
  const [view, setView] = useState('list');
  const [loading, setLoading] = useState(false);

  const handleComplete = paymentMethod => {
    console.log(paymentMethod);
    setLoading(false);
  };

  if (view === 'list') {
    return (
      <AccountList
        columns={[
          {renderItem: paymentMethod => `${paymentMethod.brand} ending in ${paymentMethod.last4}`, label: ''},
          // eslint-disable-next-line react/display-name
          {renderItem: paymentMethod => (
            <>
              Expires on <strong>{paymentMethod.exp_month}/{paymentMethod.exp_year}</strong>
            </>
          ), label: ''},
          {
            // eslint-disable-next-line react/display-name
            renderItem: () => (
              <span style={{textAlign: 'right'}}>
                <button
                  className="btn btn--sm btn--default"
                  onClick={() => setView('edit')}
                  style={{paddingBottom: 0, paddingTop: 0}}
                >
                  Edit
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
      />
    );
  }

  return (
    <AccountList
      columns={[
        {
          // eslint-disable-next-line react/display-name
          renderItem: () => (
            <AddCard
              loading={loading}
              onCancel={() => setView('list')}
              onComplete={handleComplete}
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
  paymentMethods: PropTypes.array
};

export default AccountPaymentMethods;
