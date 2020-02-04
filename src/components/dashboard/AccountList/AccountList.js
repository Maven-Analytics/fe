import * as PropTypes from 'prop-types';
import React from 'react';

import AccountListHeader from './AccountListHeader';

const AccountList = ({columns, columnClassList, data, disabled, showHeader, title}) => {
  const classList = ['account-list'];

  if (disabled) {
    classList.push('disabled');
  }

  return (
    <div className={classList.join(' ')}>
      {title ? <h4 className="account-list__title">{title}</h4> : null}
      {showHeader ? (
        <AccountListHeader
          columns={columns.map(c => c.label)}
          columnClasses={columnClassList}
        />
      ) : null}

      <div className="account-list__items">
        {data.map(item => {
          if (!item) {
            return null;
          }

          return (
            <div key={item.id} className="account-list__item">
              <div className="row">
                {columns.map((col, index) => {
                  return (
                    <div key={index} className={columnClassList[index]}>
                      <div className={['account-list__item__block', col.itemClass ? col.itemClass : ''].join(' ')}>
                        {col.label ? <span className="label">{col.label}</span> : null}
                        <span className="value">
                          {col.renderItem ? col.renderItem(item) : null}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {item.children ? item.children : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

AccountList.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    itemClass: PropTypes.string,
    renderItem: PropTypes.func.isRequired
  })),
  columnClassList: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  showHeader: PropTypes.bool,
  title: PropTypes.string
};

AccountList.defaultProps = {
  showHeader: true
};

export default AccountList;
