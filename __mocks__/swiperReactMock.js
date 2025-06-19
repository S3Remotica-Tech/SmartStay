import React from 'react';
import PropTypes from 'prop-types';

export const Swiper = ({ children }) => <div>{children}</div>;
export const SwiperSlide = ({ children }) => <div>{children}</div>;
Swiper.propTypes = {
  children: PropTypes.func.isRequired,
};

SwiperSlide.propTypes = {
  children: PropTypes.node.isRequired,
};


