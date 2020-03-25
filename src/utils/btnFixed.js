const btnFixed = (width, height, radius) => {
  return {
    alignItems: 'center',
    borderRadius: radius,
    display: 'inline-flex',
    justifyContent: 'center',
    height: height,
    minWidth: 0,
    width: width
  };
};

export default btnFixed;
