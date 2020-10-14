import { useRouter } from 'next/router'
import { useState } from 'react';
import axios from 'axios';

import Button from './../../components/button/button';

import Layout from './../../components/layouts';
import styles from './../../styles/pages/register-login.module.scss';

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({email: undefined, password: undefined});

  async function login() {
    try {
      if(user.email) {
        const res = await axios.post('http://localhost:5001/auth/login', {username: user.email, password: user.password}, { withCredentials: true });
        if (res.status === 200) router.push('/');
        console.log(res);
        setUser(res.data.user);
      } else {
        alert('add user');
      }
    } catch(error) {
      console.error(error);
    }
  }

  const updateUser = (event) => {
    const {name, value} = event.target;
    setUser({
      ...user,
      [name]: value,  
    } as any);
  }

  return (
    <section className={styles.registerLoginPage}>
      <h2>
        Login Page
      </h2> 
      <div className={styles.content}>
        <form>
          <div>
            <input onChange={updateUser} placeholder="Email" name="email" type="email"/>
          </div>
          <div>
            <input onChange={updateUser} placeholder="Password" name="password" type="password"/>
          </div>
         <Button onClick={() => login()} text="Log In"></Button>
        </form>
        <p>Don't Have an Account? <a className="underline" onClick={() => router.push('/register')}>Register</a></p>
      </div>
    </section>
  )
}

export default Layout(LoginPage);