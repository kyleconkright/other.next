import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import withLayout from "../../../../components/layouts";
import styles from './../../../../styles/pages/register-login.module.scss';
import Button from './../../../../components/button/button';

function ResetPasswordPage() {
  const [password, setPassword] = useState();
  const router = useRouter();

  async function savePassword() {
    console.log({ password });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/update_password`, { token: router.query.token, password });
      if (res.status === 200) router.push('/login')
    } catch (error) {
      throw new Error(error);
    }
  }

  const updateForm = (event) => {
    const password = event.target.value;
    setPassword(password);
  }

  return (
    <section className={styles.registerLoginPage}>
      <div className={styles.content}>
        <h2>
          Reset Password
        </h2>
        <form>
          <div>
            <input onChange={updateForm} placeholder="New Password" name="password" type="text" />
          </div>
          <Button onClick={() => savePassword()} text="Update Password"></Button>
        </form>
      </div>
    </section>
  );
}

export default withLayout(ResetPasswordPage);
