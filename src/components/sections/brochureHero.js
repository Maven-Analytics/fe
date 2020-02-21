import {isImmutable, List, Map} from 'immutable';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import DifficultyMeter from '#root/components/difficultyMeter';
import ImageContentful from '#root/components/imageContentful';
import MaIcon from '#root/components/maIcon';
import ParallaxBg from '#root/components/parallaxBg';
import ProductMeta from '#root/components/productMeta';
import ProductMetaItem from '#root/components/productMetaItem';
import {innerHtml} from '#root/utils/componentHelpers';

import Markdown from '../markdown';

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
  backgroundSrc,
  imageOverflow
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
              <div className="brochure-hero__description">
                {description && description !== '' ? <Markdown content={description} /> : null}
              </div>
              {linkHref ? (
                <Link href={linkHref}>
                  <a className="brochure-hero__link" onClick={onLinkClick}>
                    {linkContent}
                  </a>
                </Link>
              ) : null}
            </div>
            <div className={colClasses[1]}>
              <div
                className={['brochure-hero__video', video || imageOverflow === false ? '' : 'no-video']
                  .filter(c => c !== '')
                  .join(' ')}
              >
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
                  <ProductMetaItem label="Course Hours">{hours} hours</ProductMetaItem>
                  <ProductMetaItem label="Skills Learned">
                    <div className="brochure-hero__pills">
                      {skills.map(skill => (
                        <div key={skill} className="brochure-hero__pill">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </ProductMetaItem>
                  <ProductMetaItem label="Tools">
                    <div className="brochure-hero__pills">
                      {tools.map(tool => (
                        <div key={tool} className="brochure-hero__pill">
                          {tool}
                        </div>
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
  description: PropTypes.string,
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
  backgroundSrc: PropTypes.string,
  imageOverflow: PropTypes.bool
};

BrochureHero.defaultProps = {
  skills: List(),
  description: null,
  tools: List(),
  badge: Map(),
  paths: List(),
  meta: true,
  colClasses: ['col-md-6 col-lg-7', 'col-md-6 col-lg-5'],
  imageOverflow: true
};

export default BrochureHero;
