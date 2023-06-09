import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { createComment } from '../../../api';

const AddComment = ({ slug }) => {
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  const { register, handleSubmit, errors, reset } = useForm();
  const onsubmit = async (e) => {
    try {
      setLoading(true);
      await createComment(slug, e, localStorage.jwtToken);
      reset();
      setTimeout(() => setLoading(false), 100);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    isAuthenticated && (
      <div className='add-comment'>
        <header>
          <h3 className='h6'>Leave a reply</h3>
        </header>
        <form onSubmit={handleSubmit(onsubmit)} className='commenting-form'>
          <div className='row'>
            <div className='form-group col-md-12'>
              <textarea
                name='body'
                id='usercomment'
                placeholder='Type your comment'
                className='form-control'
                ref={register({
                  required: true,
                })}
              ></textarea>
              {errors.body && errors.body.type === 'required' && (
                <span className='text-danger'>Please enter your comment</span>
              )}
            </div>
            <div className='form-group col-md-12'>
              <button
                disabled={loading}
                type='submit'
                className='btn btn-secondary'
              >
                {loading && <i className='fa fa-spinner fa-pulse fa-fw'></i>}
                Submit Comment
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default AddComment;
