import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {List, Map, isImmutable} from 'immutable';
import Link from 'next/link';

import RichText from '../components/richText';
import ImageContentful from '../components/imageContentful';
import MaIcon from '../components/maIcon';
import ProductMeta from '../components/productMeta';
import ProductMetaItem from '../components/productMetaItem';
import DifficultyMeter from '../components/difficultyMeter';
import ParallaxBg from '../components/parallaxBg';
import {innerHtml} from '../utils/componentHelpers';

const BrochureHero = ({
  image,
  className,
  eyelash,
  title,
  description,
  hours,
  skills,
  tools,
  difficulty,
  badge,
  paths,
  video,
  thumbnail,
  onVideoClick,
  meta,
  colClasses,
  linkHref,
  linkContent,
  onLinkClick,
  backgroundSources,
  backgroundSrc
}) => {
  const classList = ['brochure-hero'];

  if (className) {
    classList.push(className);
  }

  return (
    <div className={classList.join(' ')}>
      <ParallaxBg
        className="brochure-hero__bg"
        placeholderColor="#252525"
        overlay
        sources={backgroundSources}
        src={backgroundSrc}
      />
      <div className="brochure-hero__inner">
        <div className="container container--lg">
          <div className="row">
            <div className={colClasses[0]}>
              {eyelash ? <p className="brochure-hero__eyelash">{eyelash}</p> : null}
              <h1 dangerouslySetInnerHTML={innerHtml(title)} />
              {isImmutable(description) ? (
                <div className="brochure-hero__description">
                  <RichText content={description} />
                </div>
              ) : (
                <div className="brochure-hero__description" dangerouslySetInnerHTML={innerHtml(description)} />
              )}
              {linkHref ? (
                <Link href={linkHref}>
                  <a className="brochure-hero__link" onClick={onLinkClick}>
                    {linkContent}
                  </a>
                </Link>
              ) : null}
            </div>
            <div className={colClasses[1]}>
              <div className={['brochure-hero__video', video ? '' : 'no-video'].filter(c => c !== '').join(' ')}>
                {image ? image : null}
                {thumbnail ? <ImageContentful image={thumbnail} /> : thumbnail}
                {video ? (
                  <button onClick={onVideoClick} aria-label="Play Video">
                    <MaIcon icon="play-triangle" />
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
                    <div className="brochure-hero__pills">
                      {skills.map(skill => (
                        <div key={skill} className="brochure-hero__pill">{skill}</div>
                      ))}
                    </div>
                  </ProductMetaItem>
                  <ProductMetaItem label="Tools">
                    <div className="brochure-hero__pills">
                      {tools.map(tool => (
                        <div key={tool} className="brochure-hero__pill">{tool}</div>
                      ))}
                    </div>
                  </ProductMetaItem>
                  <ProductMetaItem label="Difficulty">
                    <DifficultyMeter difficulty={difficulty} startingHeight={14} diff={6} />
                  </ProductMetaItem>
                  <ProductMetaItem label="Credentials">
                    <ImageContentful image={badge} modifier="badge" />
                  </ProductMetaItem>
                  <ProductMetaItem label="Paths">
                    <div className="paths">
                      {paths.map(path => (
                        <ImageContentful key={path.get('id')} image={path.get('badge')} modifier="badge" />
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

BrochureHero.propTypes = {
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
  linkContent: PropTypes.node,
  image: PropTypes.node,
  backgroundSources: PropTypes.array,
  backgroundSrc: PropTypes.string
};

BrochureHero.defaultProps = {
  skills: List(),
  description: Map(),
  tools: List(),
  badge: Map(),
  paths: List(),
  meta: true,
  colClasses: ['col-md-6 col-lg-7', 'col-md-6 col-lg-5']
};

export default BrochureHero;
