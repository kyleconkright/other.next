import axios from 'axios';
import { useState, useEffect, useContext } from 'react';

import Layout from '../components/layouts';
import Button from '../components/button/button';

function HomePage() {

  const [tokens, setTokens] = useState({token: undefined, tokenSecret: undefined});
  const [user, setUser] = useState({username: undefined, id: undefined});
  const [wantList, setWantList] = useState([]);

  useEffect(() => {
    async function getUser() {
      try {
        const { token, tokenSecret, username, id } = (await axios.get('http://localhost:5001/', { withCredentials :true })).data;
        console.log({token}, {tokenSecret}, {username}, {id});
        setTokens({token, tokenSecret});
        setUser({username, id});
      } catch(error) {
        console.error(error);
      }
    }
    getUser();
  }, [])

  async function getWantList() {
    const { wants } = (await axios.post('http://localhost:5001/account/wants', { tokens, user })).data;
    console.log(wants);
    setWantList(wants);
  }

  async function removeItem(id) {
    const { data } = await axios.post('http://localhost:5001/account/wants/remove', { tokens, user, id });
    console.log(data);
  }

  return (
    <div>
      <Button text="Get Want List" onClick={getWantList}></Button>
      <div>
        { wantList.map(item => <img key={item.id} style={{width: '200px'}} onClick={() => removeItem(item.id)} src={item.basic_information.cover_image} />) }
      </div>
    </div>
  )
}

export default Layout(HomePage);