import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchComments } from '../../state/ducks/blogs';
import PostComment from '../../components/PostComment';
import Pagination from '../../components/Pagination';

const PostComments = ({ postId, slug }) => {
  const [page, setPage] = useState(1);
  const { data, loading } = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(postId, page));
  }, [dispatch, page, postId]);

  if (loading) {
    return 'Loading';
  }

  const reFatch = () => {
    dispatch(fetchComments(postId, page));
  };

  return (
    <div className='post-comments'>
      <header>
        <h3 className='h6'>
          Post Comments
          <span className='no-of-comments'>({data.count})</span>
        </h3>
      </header>
      {Array.isArray(data.comments) &&
        data.comments.map((comment) => (
          <PostComment
            key={comment._id}
            commentId={comment._id}
            userId={comment.user._id}
            name={comment.user.name}
            date={comment.updatedAt}
            description={comment.body}
            reFatch={reFatch}
            slug={slug}
          />
        ))}
      {!loading && data.count > 10 && (
        <Pagination
          activePage={page}
          countPerPage={10}
          count={data.count}
          onChange={(pageNumber) => setPage(pageNumber)}
        />
      )}
    </div>
  );
};

export default PostComments;
