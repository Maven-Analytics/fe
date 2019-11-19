import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import {Controller, Scene} from 'react-scrollmagic';
import Link from 'next/link';
import gsap from 'gsap';

import Image from '../components/image';
import MethodHeader from '../components/methodHeader';
import Scroller from '../components/scroller';
import TrackVisibility from '../components/trackVisibility';

class MethodPath extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      pathStyle: {},
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
    // This.init();

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (!this.elEnd.current) {
      return;
    }

    const {current: elStart} = this.elStart;
    const {current: elEnd} = this.elEnd;
    const {current: path} = this.path;

    const windowBottom = window.scrollY + window.innerHeight;
    const startY = elStart.offsetTop + (window.innerHeight / 2); // Start when the middle of the window is at the top of the line
    const endY = elEnd.offsetTop + (elEnd.offsetHeight / 2); // End when the line reaches the middle of the last item

    const progress = (windowBottom - startY) / endY;
    const pathLength = path.getTotalLength();
    const drawLength = pathLength * progress;

    const points = path.getPointAtLength(drawLength);

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
              <svg width="725px" height="1938px" viewBox="0 0 725 1938" version="1.1" style={{overflow: 'visible'}} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="pathStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F6FDA5" />
                    <stop offset="100%" stopColor="#23E3D7" />
                  </linearGradient>
                </defs>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="Home-Copy" transform="translate(-138.000000, -1924.000000)" >
                    <path ref={this.path} stroke="#F0F0F0" strokeWidth="5" d="M720,1924.51953 L720,1928.4 C720,1953.25281 699.852814,1973.4 675,1973.4 L186,1973.4 C161.147186,1973.4 141,1993.54719 141,2018.4 L141,2038 L141,2468 C141,2492.85281 161.147186,2513 186,2513 L815,2513 C839.852814,2513 860,2533.14719 860,2558 L860,3073 C860,3097.85281 839.852814,3118 815,3118 L186,3118 C161.147186,3118 141,3138.14719 141,3163 L141,3669 C141,3693.85281 161.147186,3714 186,3714 L815,3714 C839.852814,3714 860,3734.14719 860,3759 L860,3862" id="Master-path"></path>
                    <path style={pathStyle} stroke="url(#pathStrokeGradient)" strokeWidth="5" d="M720,1924.51953 L720,1928.4 C720,1953.25281 699.852814,1973.4 675,1973.4 L186,1973.4 C161.147186,1973.4 141,1993.54719 141,2018.4 L141,2038 L141,2468 C141,2492.85281 161.147186,2513 186,2513 L815,2513 C839.852814,2513 860,2533.14719 860,2558 L860,3073 C860,3097.85281 839.852814,3118 815,3118 L186,3118 C161.147186,3118 141,3138.14719 141,3163 L141,3669 C141,3693.85281 161.147186,3714 186,3714 L815,3714 C839.852814,3714 860,3734.14719 860,3759 L860,3862" id="Master-path"></path>
                    <circle id="app-walkthrough-circle" strokeOpacity=".48" stroke="#F6FDA5" strokeWidth="8" fill="#23E3D7" cx={circle.x} cy={circle.y} r="6"></circle>
                  </g>
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
