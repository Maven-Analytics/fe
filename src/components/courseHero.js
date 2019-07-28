import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {List, Map, isImmutable} from 'immutable';
import Link from 'next/link';

import RichText from './richText';
import ImageContentful from './imageContentful';
import MaIcon from './maIcon';
import ProductMeta from './productMeta';
import ProductMetaItem from './productMetaItem';
import DifficultyMeter from './difficultyMeter';
import ParallaxBg from './parallaxBg';
import {innerHtml} from '../utils/componentHelpers';

const CourseHero = ({className, eyelash, title, description, hours, skills, tools, difficulty, badge, paths, video, thumbnail, onVideoClick, meta, colClasses, linkHref, linkContent, onLinkClick}) => {
  const classList = ['course-hero'];

  if (className) {
    classList.push(className);
  }

  return (
    <div className={classList.join(' ')}>
      <ParallaxBg
        className="course-hero__bg"
        placeholderColor="#252525"
        src="/static/img/home-hero-mobile.jpg"
        srcSet="
          /static/img/home-hero-mobile.webp 1000w,
          /static/img/home-hero-mobile.jpg 1000w,
          /static/img/home-hero-desktop.webp 2307w,
          /static/img/home-hero-desktop.jpg 2307w
        "
      />
      <div className="course-hero__inner">
        <div className="container container--lg">
          <div className="row">
            <div className={colClasses[0]}>
              {eyelash ? <p className="course-hero__eyelash">{eyelash}</p> : null}
              <h1 dangerouslySetInnerHTML={innerHtml(title)}/>
              {isImmutable(description) ? (
                <div className="course-hero__description">
                  <RichText content={description}/>
                </div>
              ) : (
                <div className="course-hero__description" dangerouslySetInnerHTML={innerHtml(description)}/>
              )}
              {linkHref ? (
                <Link href={linkHref}>
                  <a className="course-hero__link" onClick={onLinkClick}>
                    {linkContent}
                  </a>
                </Link>
              ) : null}
            </div>
            <div className={colClasses[1]}>
              <div className="course-hero__video">
                <ImageContentful image={thumbnail}/>
                {video ? (
                  <button onClick={onVideoClick} aria-label="Play Video">
                    <MaIcon icon="play-triangle"/>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          {meta ? (
            <div className="row">
              <div className="col-12">
                <ProductMeta className="product-meta--course-detail">
                  <ProductMetaItem label="Course Hours">
                    {hours} hours
                  </ProductMetaItem>
                  <ProductMetaItem label="Skills Learned">
                    <div className="course-hero__pills">
                      {skills.map(skill => (
                        <div key={skill} className="course-hero__pill">{skill}</div>
                      ))}
                    </div>
                  </ProductMetaItem>
                  <ProductMetaItem label="Tools">
                    <div className="course-hero__pills">
                      {tools.map(tool => (
                        <div key={tool} className="course-hero__pill">{tool}</div>
                      ))}
                    </div>
                  </ProductMetaItem>
                  <ProductMetaItem label="Difficulty">
                    <DifficultyMeter difficulty={difficulty} startingHeight={14} diff={6}/>
                  </ProductMetaItem>
                  <ProductMetaItem label="Credentials">
                    <ImageContentful image={badge} modifier="badge"/>
                  </ProductMetaItem>
                  <ProductMetaItem label="Paths">
                    <div className="paths">
                      {paths.map(path => (
                        <ImageContentful key={path.get('id')} image={path.get('badge')} modifier="badge"/>
                      ))}
                    </div>
                  </ProductMetaItem>
                </ProductMeta>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

CourseHero.propTypes = {
  className: PropTypes.string,
  eyelash: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, ImmutablePropTypes.map]),
  hours: PropTypes.number,
  skills: ImmutablePropTypes.list,
  tools: ImmutablePropTypes.list,
  difficulty: PropTypes.number,
  badge: ImmutablePropTypes.map,
  paths: ImmutablePropTypes.list,
  video: PropTypes.string,
  thumbnail: ImmutablePropTypes.map,
  onVideoClick: PropTypes.func,
  meta: PropTypes.bool,
  colClasses: PropTypes.array,
  linkHref: PropTypes.string,
  onLinkClick: PropTypes.func,
  linkContent: PropTypes.node
};

CourseHero.defaultProps = {
  skills: List(),
  description: Map(),
  tools: List(),
  badge: Map(),
  paths: List(),
  meta: true,
  colClasses: ['col-md-6 col-lg-7', 'col-md-6 col-lg-5']
};

export default CourseHero;
