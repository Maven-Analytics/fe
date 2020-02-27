import PropTypes from 'prop-types';
import readTimeEstimage from 'read-time-estimate';
import {Remarkable} from 'remarkable';

const md = new Remarkable({
  html: true
});

const ReadTime = ({content, isMarkdown}) => {
  if (!content) {
    return null;
  }

  if (isMarkdown) {
    content = md.render(content);
  }

  const {humanizedDuration} = readTimeEstimage(content);

  return humanizedDuration;
};

ReadTime.propTypes = {
  content: PropTypes.string,
  isMarkdown: PropTypes.bool
};

export default ReadTime;
