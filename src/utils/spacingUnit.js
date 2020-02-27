const baseSize = 1.5;

const spacingUnit = {
  default: `${baseSize}rem`,
  xxs: `${baseSize / 8}rem`, // 1.8px
  xs: `${baseSize / 4}rem`, // 3.75px
  sm: `${baseSize / 3}rem`, // 5px
  half: `${baseSize / 2}rem`, // 7.5px
  ss: `${baseSize / 1.66}rem`, // ~ 10px
  msm: `${baseSize / 1.33}rem`, // ~ 20px
  md: `${baseSize * 1.33}rem`, // ~ 20px
  mdl: `${baseSize * 1.6}rem`, // ~ 24px
  l: `${baseSize * 2}rem`, // 30px
  lmm: `${baseSize * 2.33333333}rem`, // ~35px
  lml: `${baseSize * 2.66}rem`, // ~ 40px
  ll: `${baseSize * 3}rem`, // ~ 45px
  xlx: `${baseSize * 3.33333}rem`, // ~ 50px
  xl: `${baseSize * 4}rem`, // ~ 60px
  xll: `${baseSize * 5}rem`, // 75px
  xxl: `${baseSize * 8}rem`, // 120px
  xxxl: `${baseSize * 10}rem` // 150px
};

export default spacingUnit;
