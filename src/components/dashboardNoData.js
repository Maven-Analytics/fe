import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const DashboardNoData = ({btnUrl, btnText, text, title, btnClass, children, className, imgWidth}) => {
  const classList = ['dashboard-no-data'];

  if (className) {
    classList.push(className);
  }

  return (
    <div className={classList.join(' ')}>
      {children ? (
        <div className="dashboard-no-data__image" style={{maxWidth: imgWidth}}>
          {children}
        </div>
      ) : null}
      <p className="title">{title}</p>
      {text ? <p className="text">{text}</p> : null}
      {btnUrl ? (
        <Link href={btnUrl}>
          <a className={btnClass}>{btnText}</a>
        </Link>
      ) : null}
    </div>
  );
};

DashboardNoData.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  btnUrl: PropTypes.string,
  btnText: PropTypes.string,
  btnClass: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  imgWidth: PropTypes.number
};

DashboardNoData.defaultProps = {
  btnClass: 'btn btn--primary-solid',
  imgWidth: 328
};

export default DashboardNoData;
