import React from 'react'
import PropTypes from 'prop-types'

const MaIcon = ({ icon, className, ...props }) => {
  const classList = [`maicon maicon-${icon}`]

  if (className) {
    classList.push(className)
  }

  return <i className={classList.join(' ')} {...props} />
}

MaIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default MaIcon
