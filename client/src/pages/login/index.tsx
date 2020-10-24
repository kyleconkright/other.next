import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Button from './../../components/button/button';

import Layout from './../../components/layouts';
import styles from './../../styles/pages/register-login.module.scss';
import { UserContext } from '../../contexts/user.context';

function LoginPage() {
  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);
  const [form, setForm] = useState({email: undefined, password: undefined});

  useEffect(() => {
    if (user.username) router.push('/')
  }, [user])

  async function login() {
    dispatch({type: 'SET', isLoading: true});
    try {
      if(form.email) {
        const res = await axios.post('http://localhost:5001/auth/login', {username: form.email, password: form.password}, { withCredentials: true });
        if (res.status === 200) router.push('/');
        dispatch({type: 'SET', user: {...res.data.user, isLoading: false}});
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