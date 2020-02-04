import * as PropTypes from 'prop-types';
import React, {memo} from 'react';

const AccountListHeader = ({className, columns, columnClasses}) => (
  <div className={className}>
    <div className="row">
      {columns.map((col, index) => {
        return (
          <div key={index} className={columnClasses[index]}>
            <p className="account-list__header-label">{col.label}</p>
          </div>
        );
      })}
    </div>
  </div>
);

AccountListHeader.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array,
  columnClasses: PropTypes.arrayOf(PropTypes.string)
};

AccountListHeader.defaultProps = {
  className: 'account-list__header'
};

export default memo(AccountListHeader);
