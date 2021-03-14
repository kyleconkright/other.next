import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Button from './../../components/button/button';
import { UserContext } from '../../contexts/user.context';

import Layout from './../../components/layouts';
import styles from './../../styles/pages/register-login.module.scss';


function RegisterPage() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({email: undefined, password: undefined});
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user.username) router.push('/')
  }, [user])

  async function register() {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { user: form }, { withCredentials: true });
      if (res.status === 200){
        setMessage(res.data.message);
        setForm({email: undefined, password: undefined});
      };
    } catch(error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.message);
      };
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
          Create an Account
        </h2>
        { message !== '' ? (
          <p>{ message }</p>
          ): null }
        <form>
          <div>
            <input onChange={updateForm} placeholder="Email" name="email" type="email"/>
          </div>
          <div>
            <input onChange={updateForm} placeholder="Password" name="password" type="password"/>
          </div>
         <Button onClick={() => register()} text="Register"></Button>
        </form>
        <p>Already Have an Account? <a className="underline" onClick={() => router.push('/login')}>Log In</a></p>
      </div>
    </section>
  )
}

export default Layout(RegisterPage);