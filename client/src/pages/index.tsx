import axios from 'axios';
import { useState, useEffect, useContext } from 'react';

import Layout from '../components/layouts';
import Button from '../components/button/button';

function HomePage() {

  useEffect(() => {
    async function getUser() {
      try {
        const { token, tokenSecret } = (await axios.get('http://localhost:5001/', { withCredentials :true })).data;
        console.log({token}, {tokenSecret});
      } catch(error) {
        console.error(error);
      }
    }
    getUser();
  }, [])

  return (
      // <Button></Button>
      <div></div>
  )
}

export default Layout(HomePage);