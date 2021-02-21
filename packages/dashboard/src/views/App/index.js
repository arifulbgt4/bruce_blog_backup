import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { me } from '../../api/api';
import { setCurrentUser, logOutUser } from '../../state/ducks/authentication';
import Fallback from '../../components/fallback';
import AdminRoute from '../../components/adminRoute';
import Layout from '../../container/layout';

const Login = lazy(() => import('../Signin'));
const Profile = lazy(() => import('../Profile/Profile'));
const PostList = lazy(() => import('../PostList'));
const CreatePost = lazy(() => import('../CreatePost'));
const UpdatePost = lazy(() => import('../UpdatePost'));
const EditorRequest = lazy(() => import('../EditorRequest'));
const Category = lazy(() => import('../Category'));
const Comments = lazy(() => import('../Comments'));
const Users = lazy(() => import('../Users'));
const NotFound = lazy(() => import('../../container/pages/404'));

const App = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, data } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuth() {
      try {
        setLoading(true);
        if (!localStorage.jwtToken) {
          setLoading(false);
          return;
        }
        const res = await me(localStorage.jwtToken);
        const user = res?.data;
        if (user) {
          dispatch(setCurrentUser({ token: localStorage.jwtToken }));
          setLoading(false);
          return;
        }
        setLoading(false);
        dispatch(logOutUser());
      } catch (error) {
        console.log(error);
        dispatch(logOutUser());
        setLoading(false);
      }
    }

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return <Fallback />;
  }

  return (
    <Router>
      <Layout>
        <Suspense fallback={<Fallback />}>
          <Switch>
            {/* <Route exact path='/admin' component={Login} /> */}
            {/* <AdminRoute
            path='/admin'
            component={Admin}
            role={data?.role}
            isAuthenticated={isAuthenticated}
          /> */}
            <AdminRoute
              exact
              path='/'
              component={Profile}
              role={data?.role}
              isAuthenticated={isAuthenticated}
            />
            <AdminRoute
              exact
              path='/post/list'
              component={PostList}
              role={data?.role}
              isAuthenticated={isAuthenticated}
            />
            <AdminRoute
              exact
              path='/post/create'
              component={CreatePost}
              role={data?.role}
              isAuthenticated={isAuthenticated}
            />
            <AdminRoute
              exact
              path='/post/update/:slug'
              component={UpdatePost}
              role={data?.role}
              isAuthenticated={isAuthenticated}
            />
            <AdminRoute
              exact
              path='/request'
              component={EditorRequest}
              role={data?.role}
              isAuthenticated={isAuthenticated}
              admin
            />
            <AdminRoute
              exact
              path='/category'
              component={Category}
              role={data?.role}
              isAuthenticated={isAuthenticated}
              admin
            />
            <AdminRoute
              exact
              path='/users/list'
              component={Users}
              role={data?.role}
              isAuthenticated={isAuthenticated}
              admin
            />
            <AdminRoute
              exact
              path='/post/comments/:slug/:postId'
              component={Comments}
              admin
            />
            <Route exact path='/signin' component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
