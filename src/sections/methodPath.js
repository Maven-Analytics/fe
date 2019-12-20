import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Image from '../components/image';
import MethodHeader from '../components/methodHeader';

class MethodPath extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      pathStyle: {
        strokeDashoffset: 0,
        strokeDasharray: 0
      },
      circle: {
        x: 0,
        y: 0
      }
    };

    this.elStart = createRef();
    this.elEnd = createRef();
    this.path = createRef();
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (!this.elEnd || !this.elEnd.current || !this.elStart || !this.elStart.current || !this.path || !this.path.current) {
      return;
    }

    const {current: elStart} = this.elStart;
    const {current: elEnd} = this.elEnd;
    const {current: path} = this.path;

    const windowBottom = window.scrollY + window.innerHeight;
    const startY = elStart.offsetTop + 200; // Start when bottom of the screen is at the start el + 50
    let endY = elEnd.offsetTop + (elEnd.offsetHeight / 2); // End when the line reaches the middle of the last item

    // If endY is 0, progress is set to Infinity, make sure that doens't happen
    if (!endY) {
      endY = windowBottom;
    }

    const progress = (windowBottom - startY) / endY;
    const pathLength = path.getTotalLength();
    const drawLength = pathLength * progress;

    const points = path.getPointAtLength(progress > 0 && drawLength && drawLength !== Infinity ? drawLength : 6.4);

    this.setState({
      progress,
      pathStyle: {
        strokeDashoffset: pathLength - drawLength,
        strokeDasharray: pathLength
      },
      circle: {
        x: points.x,
        y: points.y
      }
    });
  }

  render() {
    const {items} = this.props;
    const {pathStyle, circle} = this.state;

    return (
      <div className="method-path">
        <div className="method-path__container">
          <MethodHeader />
          <div ref={this.elStart} className="method-path__items">
            <div className="method-path__items-bg">
              <svg width="725px" height="1938px" viewBox="0 0 725 1938" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{overflow: 'visible'}}>
                <defs>
                  <linearGradient id="pathStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F6FDA5" />
                    <stop offset="100%" stopColor="#23E3D7" />
                  </linearGradient>
                </defs>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path ref={this.path} stroke="#F0F0F0" strokeWidth="5" d="M582,0 L582,3.88046875 C582,28.7332825 561.852814,48.8804688 537,48.8804688 L48,48.8804688 C23.1471863,48.8804688 3,69.027655 3,93.8804688 L3,113.480469 L3,543.480469 C3,568.333282 23.1471863,588.480469 48,588.480469 L677,588.480469 C701.852814,588.480469 722,608.627655 722,633.480469 L722,1148.48047 C722,1173.33328 701.852814,1193.48047 677,1193.48047 L48,1193.48047 C23.1471863,1193.48047 3,1213.62766 3,1238.48047 L3,1744.48047 C3,1769.33328 23.1471863,1789.48047 48,1789.48047 L677,1789.48047 C701.852814,1789.48047 722,1809.62766 722,1834.48047 L722,1937.48047"></path>
                  {pathStyle.strokeDasharray ? <path style={pathStyle} stroke="url(#pathStrokeGradient)" strokeWidth="5" d="M582,0 L582,3.88046875 C582,28.7332825 561.852814,48.8804688 537,48.8804688 L48,48.8804688 C23.1471863,48.8804688 3,69.027655 3,93.8804688 L3,113.480469 L3,543.480469 C3,568.333282 23.1471863,588.480469 48,588.480469 L677,588.480469 C701.852814,588.480469 722,608.627655 722,633.480469 L722,1148.48047 C722,1173.33328 701.852814,1193.48047 677,1193.48047 L48,1193.48047 C23.1471863,1193.48047 3,1213.62766 3,1238.48047 L3,1744.48047 C3,1769.33328 23.1471863,1789.48047 48,1789.48047 L677,1789.48047 C701.852814,1789.48047 722,1809.62766 722,1834.48047 L722,1937.48047"></path> : null}
                  {circle.x && circle.y ? <circle id="app-walkthrough-circle" strokeOpacity=".48" stroke="#F6FDA5" strokeWidth="8" fill="#23E3D7" cx={circle.x} cy={circle.y} r="6"></circle> : null}
                </g>
              </svg>
            </div>
            <div className="method-path__items-inner">
              {items.map((item, index) => (
                <div key={index} ref={index === items.length - 1 ? this.elEnd : null} style={{height: item.sectionHeight}} className="method-path-item">
                  <div className="method-path-item__content">
                    <span className="method-path-item__step">{index + 1}</span>
                    <div className="method-path-item__content-inner">
                      <p className="method-path-item__title">{item.title}</p>
                      <p className="method-path-item__description">{item.description}</p>
                      <Link href={item.linkHref}><a className="btn btn--md btn--primary-solid">{item.linkTitle}</a></Link>
                    </div>
                  </div>
                  <div className="method-path-item__image">
                    <Image
                      src={item.img}
                      preload
                      wrapStyle={{
                        paddingBottom: `${item.height / item.width * 100}%`
                      }}
                      style={{
                        width: '100%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div >
    );
  }
}

MethodPath.propTypes = {
  items: PropTypes.array.isRequired
};

export default MethodPath;
