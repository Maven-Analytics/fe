import * as PropTypes from 'prop-types';
import React from 'react';

import {planIds} from '#root/constants';
import {centsToDollarString, formatDateMMDDYYYY} from '#root/utils/componentHelpers';

import AccountList, {AccountListLink} from './accountList';

const InvoiceLink = ({isBtn, href, external, children}) => {
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

InvoiceLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  external: PropTypes.bool,
  isBtn: PropTypes.bool,
  href: PropTypes.string
};

const AccountInvoiceList = ({invoices}) => {
  return (
    <div className="account-invoice-list">
      <AccountList
        columns={[
          {
            // eslint-disable-next-line react/display-name
            renderItem: invoice => <AccountListLink external href={invoice.hosted_invoice_url}>{invoice.number}</AccountListLink>,
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
            renderItem: invoice => <AccountListLink isBtn external href={invoice.hosted_invoice_url}>View Invoice</AccountListLink>,
            itemClass: 'link',
            label: ''
          }
        ]}
        columnClassList={['col-sm-3', 'col-sm-4', 'col-sm-2', 'col-sm-1', 'col-sm-2', 'col-12']}
        data={invoices.map(i => {
          return {
            ...i
          };
        })}
      />
    </div>
  );
};

// Const AccountInvoiceList = ({invoices}) => {
//   return (
//     <div className="account-invoice-list">
//       <div className="account-invoice-list__header">
//         <div className="row">
//           <div className="col-sm-3">
//             <p className="account-invoice-list__header-label">Invoice #</p>
//           </div>
//           <div className="col-sm-4">
//             <p className="account-invoice-list__header-label">Subscription</p>
//           </div>
//           <div className="col-sm-2">
//             <p className="account-invoice-list__header-label">Date</p>
//           </div>
//           <div className="col-sm-1">
//             <p className="account-invoice-list__header-label">Status</p>
//           </div>
//           <div className="col-sm-2">
//             <p className="account-invoice-list__header-label">Amount</p>
//           </div>
//         </div>
//       </div>
//       {invoices.map(invoice => {
//         const {hosted_invoice_url: href} = invoice;

//         return (
//           <div className="account-invoice-list__item" key={invoice.id}>
//             <div className="row">
//               <div className="col-sm-3">
//                 <div className="account-invoice-list__item__block">
//                   <span className="label">Invoice #</span>
//                   <span className="value">
//                     <InvoiceLink href={href}>{invoice.number}</InvoiceLink>
//                   </span>
//                 </div>
//               </div>
//               <div className="col-sm-4">
//                 <div className="account-invoice-list__item__block">
//                   <span className="label">Subscription</span>
//                   <span className="value">{planIds[invoice.plan_id] || invoice.plan_name || invoice.plan_description}</span>
//                 </div>
//               </div>
//               <div className="col-sm-2">
//                 <div className="account-invoice-list__item__block">
//                   <span className="label">Date</span>
//                   <span className="value">{formatDateMMDDYYYY(invoice.created)}</span>
//                 </div>
//               </div>
//               <div className="col-sm-1">
//                 <div className="account-invoice-list__item__block">
//                   <span className="label">Status</span>
//                   <span className="value status">{invoice.status}</span>
//                 </div>
//               </div>
//               <div className="col-sm-1">
//                 <div className="account-invoice-list__item__block">
//                   <span className="label">Amount</span>
//                   <span className="value">{centsToDollarString(invoice.amount_paid)}</span>
//                 </div>
//               </div>
//             </div>
//             <div className="account-invoice-list__item__block link">
//               <span className="value">
//                 <InvoiceLink isBtn href={href}>View Invoice</InvoiceLink>
//               </span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

AccountInvoiceList.propTypes = {
  invoices: PropTypes.arrayOf(PropTypes.object)
};

export default AccountInvoiceList;
