import React from 'react';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import routes from '../../../routes.js';
import images from '../../../images.js';
import './customer-link.scss';

export default function CustomerLink({ linkProps = {}, imgProps = {} }) {
  const { className: linkClass, ...linkOptionsRest } = linkProps;
  const { className: imgClass, ...imgOptionsRest } = imgProps;

  return (
    <SoftLink
      {...linkOptionsRest}
      className={`customer-link-btn ${linkClass || ''}`}
      to={routes.profile.to}
    >
      <img
        {...imgOptionsRest}
        className={imgClass}
        alt="profile"
        src={images.user}
      />
    </SoftLink>
  );
}
