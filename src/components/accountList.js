import * as PropTypes from 'prop-types';
import React from 'react';

import {innerHtml} from '#root/utils/componentHelpers';

export const AccountListLink = ({isBtn, href, external, children}) => {
  const classList = [];
  if (isBtn) {
    classList.push('btn btn--default');
  }

  let linkProps = {};

  if (external) {
    linkProps = {
      ...linkProps,
      rel: 'noopener noreferrer',
      target: '_blank'
    };
  }

  return <a className={classList.join(' ')} href={href} {...linkProps}>{children}</a>;
};

AccountListLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  external: PropTypes.bool,
  isBtn: PropTypes.bool,
  href: PropTypes.string
};

const AccountList = ({columns, columnClassList, data, disabled, showHeader, title}) => {
  const classList = ['account-list'];

  if (disabled) {
    classList.push('disabled');
  }

  return (
    <div className={classList.join(' ')}>
      {title ? <h4 className="account-list__title">{title}</h4> : null}
      {showHeader ? (
        <div className="account-list__header">
          <div className="row">
            {columns.map((col, index) => {
              return (
                <div key={index} className={columnClassList[index]}>
                  <p className="account-list__header-label">{col.label}</p>
                </div>
              );
            })}
          </div>
        </div>
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
