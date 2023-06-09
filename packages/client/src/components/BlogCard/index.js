import React from 'react';
import { Link } from 'react-router-dom';
import { stripHtml } from 'string-strip-html';

import dateFormat from '../../utils/dateFormat';
import Skeleton from '../../components/Skeleton';

const BlogCard = (props) => {
  const {
    thumbnail,
    date,
    category,
    title,
    description,
    name,
    postDate,
    comment,
    slug,
  } = props;

  const body = stripHtml(description, {
    stripTogetherWithTheirContents: [
      'script', // default
      'style', // default
      'xml', // default
      'pre', // <-- custom-added
    ],
  }).result;

  return (
    <>
      {thumbnail && (
        <div className='post-thumbnail'>
          <Link to={`/blog/post/${slug}`}>
            <img src={thumbnail} alt='...' className='img-fluid' />
          </Link>
        </div>
      )}

      <div className='post-details'>
        <div className='post-meta d-flex justify-content-between'>
          <div className='date meta-last'>{dateFormat(date)}</div>
          <div className='category'>
            <Link to='#'>{category.name}</Link>
          </div>
        </div>
        <Link className='d-block' to={`/blog/post/${slug}`}>
          <h3 className='h4'>{title}</h3>
        </Link>
        <p>{body}</p>
        <div className='post-footer d-flex align-items-center'>
          <Link to='#' className='author d-flex align-items-center flex-wrap'>
            <div className='avatar'>
              <i className='fa fa-user-circle fa-2x' aria-hidden='true'></i>
            </div>
            <div className='title'>
              <span>{name}</span>
            </div>
          </Link>
          <div className='date'>
            <i className='icon-clock' /> {dateFormat(postDate)}
          </div>
          <div className='comments meta-last'>
            <i className='icon-comment' />
            {comment}
          </div>
        </div>
      </div>
    </>
  );
};

export const Fallback = () => {
  return (
    <>
      <div className='post-thumbnail'>
        <Skeleton width='100%' height={200} bottom={10} />
      </div>
      <div className='post-details'>
        <h3 className='h4'>
          <Skeleton width='60%' height={10} />
        </h3>
        <Skeleton width='50%' height={10} />
        <Skeleton width='45%' height={10} />
      </div>
    </>
  );
};

export default BlogCard;
