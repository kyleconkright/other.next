import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import withLayout from "../../../components/layouts";

function ActivatePage() {
  const router = useRouter();

  useEffect(() => {
    if(router.query.token) {
      activateAccount();
    }
  }, [router])

  async function activateAccount() {
    try {
      const res = await axios.post(`${process.env.CLIENT_URL}/auth/activate`, {token: router.query.token});
      if (res.status === 200) router.push('/login')
    } catch(error) {
      throw new Error(error);
    }
  }

  return (
    <h2>Reset Password</h2>
  );
}

export default withLayout(ActivatePage);
