import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Heading from '../../components/heading/heading';
import { login } from '../../api';
import { setCurrentUser } from '../../state/ducks/authentication';

// eslint-disable-next-line import/no-extraneous-dependencies
import { AuthWrapper } from './style';

const Signin = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      let data = {
        email: e.username,
        password: e.password,
      };
      setIsLoading(true);
      const {
        data: { token },
      } = await login(data);
      dispatch(setCurrentUser({ token }));
      setIsLoading(false);
      history.push('/');
    } catch (error) {
      setErrors(error.response?.data.errors);
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <AuthWrapper>
      <div className='auth-contents'>
        <Form
          name='login'
          form={form}
          onFinish={handleSubmit}
          layout='vertical'
        >
          <Heading as='h3'>
            Sign in to <span className='color-secondary'>Dashboard</span>
          </Heading>
          <Form.Item
            name='username'
            rules={[{ message: 'Please input your email!', required: true }]}
            label='Email Address'
            validateStatus={errors?.email ? 'error' : ''}
            help={errors?.email ? errors.email : ''}
          >
            <Input placeholder='Email Address' />
          </Form.Item>
          <Form.Item
            name='password'
            label='Password'
            rules={[{ message: 'Please input your password!', required: true }]}
            validateStatus={errors?.password ? 'error' : ''}
            help={errors?.password ? errors.password : ''}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>
          {/* <div className='auth-form-action'>
            <NavLink className='forgot-pass-link' to='/forgotPassword'>
              Forgot password?
            </NavLink>
          </div> */}
          <Form.Item>
            <Button
              className='btn-signin'
              htmlType='submit'
              type='primary'
              size='large'
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default Signin;
