import * as PropTypes from 'prop-types';
import React from 'react';

import {planIds} from '#root/constants';
import {centsToDollarString, formatDateMMDDYYYY} from '#root/utils/componentHelpers';

const InvoiceLink = ({isBtn, href, children}) => {
  const classList = [];
  if (isBtn) {
    classList.push('btn btn--default');
  }

  return <a className={classList.join(' ')} href={href} rel="noopener noreferrer" target="_blank">{children}</a>;
};

InvoiceLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  isBtn: PropTypes.bool,
  href: PropTypes.string
};

const AccountInvoiceList = ({invoices}) => {
  return (
    <div className="account-invoice-list">
      <div className="account-invoice-list__header">
        <div className="row">
          <div className="col-sm-3">
            <p className="account-invoice-list__header-label">Invoice #</p>
          </div>
          <div className="col-sm-4">
            <p className="account-invoice-list__header-label">Subscription</p>
          </div>
          <div className="col-sm-2">
            <p className="account-invoice-list__header-label">Date</p>
          </div>
          <div className="col-sm-1">
            <p className="account-invoice-list__header-label">Status</p>
          </div>
          <div className="col-sm-2">
            <p className="account-invoice-list__header-label">Amount</p>
          </div>
        </div>
      </div>
      {invoices.map(invoice => {
        const {hosted_invoice_url: href} = invoice;

        return (
          <div className="account-invoice-list__item" key={invoice.id}>
            <div className="row">
              <div className="col-sm-3">
                <div className="account-invoice-list__item__block">
                  <span className="label">Invoice #</span>
                  <span className="value">
                    <InvoiceLink href={href}>{invoice.number}</InvoiceLink>
                  </span>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="account-invoice-list__item__block">
                  <span className="label">Subscription</span>
                  <span className="value">{planIds[invoice.plan_id] || invoice.plan_name || invoice.plan_description}</span>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="account-invoice-list__item__block">
                  <span className="label">Date</span>
                  <span className="value">{formatDateMMDDYYYY(invoice.created)}</span>
                </div>
              </div>
              <div className="col-sm-1">
                <div className="account-invoice-list__item__block">
                  <span className="label">Status</span>
                  <span className="value status">{invoice.status}</span>
                </div>
              </div>
              <div className="col-sm-1">
                <div className="account-invoice-list__item__block">
                  <span className="label">Amount</span>
                  <span className="value">{centsToDollarString(invoice.amount_paid)}</span>
                </div>
              </div>
            </div>
            <div className="account-invoice-list__item__block link">
              <span className="value">
                <InvoiceLink isBtn href={href}>View Invoice</InvoiceLink>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

AccountInvoiceList.propTypes = {
  invoices: PropTypes.arrayOf(PropTypes.object)
};

export default AccountInvoiceList;
