import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../routes/useAuth';

import OAuth from './oAuth';
import axios from 'axios';
import Cookies from 'js-cookie';
import Dashboard from './DashboardContainer';
import DashboardContainer from './DashboardContainer';

const Login = () => {
  // react hooks
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();
  // console.log('auth in Loginin Component', auth)
  const history = useHistory();
  const fortuneCookie = Cookies.get('fortuneCookie');
  //useEffect
  //check fortunate cookie
  //yes=>fetch /verifytoken
  // useEffect(() => {
  //   let mounted = true;
  //   if (mounted) {
  //     oauthLogin();
  //   }
  //   return () => {
  //     mounted = false;
  //   };
  // });

  // const oauthLogin = async () => {
  //   try {
  //     const res = await axios.get(`/auth/login`);
  //     console.log('res==>', res);

  //     if (fortuneCookie === res.data.fortune) {
  //       console.log('i wanna go to dashboard!!');
  //       history.push('/dashBoard');
  //     }
  //   } catch (error) {
  //     // if (error.response.status === 401) {
  //     //   history.push('/');
  //     // }
  //     console.log('Error in authLogin: ', error.response);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/user/login', { username, password });
      console.log('res==>', res);

      console.log('res.data ===> ', res.data);
      auth.login(res.data.id, res.data.email, () => history.push('/dashboard'));
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/');
      }
      console.log(
        'Error in handleSubmit of Login component: ',
        error.response.data.err
      );
    }
  };

  return (
    <div className='outer-wrapper'>
      <div className='recent-posts'>
        <p align='left'>
          Get interview insights while you manage <br />
          every step in your job search, from application to offer.
        </p>
      </div>
      <OAuth />
      <div className='login-wrapper'>
        <h1>Log in:</h1>
        <form onSubmit={handleSubmit}>
          <>
            <p>Email</p>
            <input
              value={username}
              type='email'
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </>
          <>
            <p>Password</p>
            <input
              password={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
          <div className='loginButtonWrapper'>
            <button className='loginButton'>Log in</button>
            <p>or</p>
            <Link to='/signup'>
              <button className='signupButton'>Sign up</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
