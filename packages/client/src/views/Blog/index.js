import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BlogLanding from '../../containers/BlogLanding';
import Pagination from '../../components/Pagination';
import { fetchBlogs } from '../../state/ducks/blogs';

const Blog = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useSelector((store) => store.blogs);

  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    dispatch(fetchBlogs(pageNumber));
  };

  useEffect(() => {
    dispatch(fetchBlogs(1));
  }, [dispatch]);

  return (
    <main className='posts-listing'>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <BlogLanding data={data} loading={loading} />
          {!loading && data.count > 5 && (
            <div className='col-md-12'>
              <Pagination
                activePage={page}
                countPerPage={5}
                count={data.count}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Blog;
