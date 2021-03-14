import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Button from './../../components/button/button';

import Layout from './../../components/layouts';
import styles from './../../styles/pages/register-login.module.scss';
import { CHECK_FOR_LOGGED_IN_USER, SET_USER } from '../../store/actions/user.actions';
import { AppState } from '../../store/reducers';

function LoginPage() {
  const router = useRouter();
  const user = useSelector((state: AppState) => state.user);
  const [form, setForm] = useState({email: undefined, password: undefined});
  const [forgotPassword, setForgotPassword] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.username) router.push('/')
  }, [user])

  async function login() {
    dispatch({type: CHECK_FOR_LOGGED_IN_USER, loading: true});
    try {
      if(form.email) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {username: form.email, password: form.password}, { withCredentials: true });
          if (res.status === 200) router.push('/');
          dispatch({type: SET_USER, ...res.data.user, loading: false });
        } catch(error) {
          setError(true);
        }
      } else {
        
      }
    } catch(error) {
      console.error({error});
    }
  }

  const updateForm = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: value,  
    } as any);
  }

  async function sendResetEmail() {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot_password`, {email: form.email});
  }
 

  return (
    <section className={styles.registerLoginPage}>
      <div className={styles.content}>
        <h2>Login</h2> 
        { error ? (
          <p>Your password or email is incorrect<br></br>Try again or reset your password.</p>
          ): null }
        <form>
          <div>
            <input onChange={updateForm} placeholder="Email" name="email" type="email"/>
          </div>
          <div>
            <input disabled={forgotPassword} onChange={updateForm} placeholder="Password" name="password" type="password"/>
            <a onClick={() => setForgotPassword(!forgotPassword)}>Forgot Password?</a>
          </div>
          { !forgotPassword ? (
            <Button onClick={() => login()} text="Log In"></Button>
            ) : (
            <Button onClick={() => sendResetEmail()} text="Send Reset Email"></Button>
          )}
        </form>
        <p>Don't Have an Account? <a className="underline" onClick={() => router.push('/register')}>Register</a></p>
      </div>
    </section>
  )
}

export default Layout(LoginPage);