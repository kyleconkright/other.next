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

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.username) router.push('/')
  }, [user])

  async function login() {
    dispatch({type: CHECK_FOR_LOGGED_IN_USER, loading: true});
    try {
      if(form.email) {
        const res = await axios.post('http://localhost:5001/auth/login', {username: form.email, password: form.password}, { withCredentials: true });
        if (res.status === 200) router.push('/');
        dispatch({type: SET_USER, ...res.data.user, loading: false });
      } else {
        alert('add user');
      }
    } catch(error) {
      console.error(error);
    }
  }

  const updateForm = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: value,  
    } as any);
  }
 

  return (
    <section className={styles.registerLoginPage}>
      <div className={styles.content}>
        <h2>
          Login Page
        </h2> 
        <form>
          <div>
            <input onChange={updateForm} placeholder="Email" name="email" type="email"/>
          </div>
          <div>
            <input onChange={updateForm} placeholder="Password" name="password" type="password"/>
          </div>
         <Button onClick={() => login()} text="Log In"></Button>
        </form>
        <p>Don't Have an Account? <a className="underline" onClick={() => router.push('/register')}>Register</a></p>
      </div>
    </section>
  )
}

export default Layout(LoginPage);