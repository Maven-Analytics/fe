import * as PropTypes from 'prop-types';
import React from 'react';

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

const AccountList = ({columns, columnClassList, data, disabled, title}) => {
  const classList = ['account-list'];

  if (disabled) {
    classList.push('disabled');
  }

  return (
    <div className={classList.join(' ')}>
      {title ? <h4 className="account-list__title">{title}</h4> : null}
      <div className="account-list__header">
        <div className="row">
          {columns.map((col, index) => {
            return (
              <div key={col.label} className={columnClassList[index]}>
                <p className="account-list__header-label">{col.label}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="account-list__items">
        {data.map(item => {
          return (
            <div key={item.id} className="account-list__item">
              <div className="row">
                {columns.map((col, index) => {
                  if (!col.accessor) {
                    return null;
                  }

                  const value = typeof col.accessor === 'function' ? col.accessor(item) : item[col.accessor];
                  const text = item[col.textAccessor];

                  return (
                    <div key={col.accessor} className={columnClassList[index]}>
                      <div className="account-list__item__block">
                        <span className="label">{col.label}</span>
                        <span className="value">
                          {col.isLink ? (
                            <AccountListLink external={col.isLinkExternal} href={value}>
                              {text}
                            </AccountListLink>
                          ) : value}
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
    accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    isLink: PropTypes.bool,
    isLinkExternal: PropTypes.bool,
    label: PropTypes.string.isRequired,
    textAccessor: PropTypes.string
  })),
  columnClassList: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  title: PropTypes.string
};

export default AccountList;
