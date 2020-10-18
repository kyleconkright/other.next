import axios from 'axios';
import { useState, useContext, useEffect } from 'react';

import Layout from '../components/layouts';
import Button from '../components/button/button';
import { UserContext } from '../contexts/user.context';

function HomePage() {

  const { user } = useContext(UserContext)
  const tokens = { token: user?.token, tokenSecret: user?.tokenSecret }
  
  const [wantList, setWantList] = useState([]);

  useEffect(() => {}, [user])

  async function getWantList() {
    const { wants } = (await axios.post('http://localhost:5001/account/wants', { tokens, user })).data;
    setWantList(wants);
  }

  async function removeItem(id) {
    const { data } = await axios.post('http://localhost:5001/account/wants/remove', { tokens, user: user.username, id });
  }

  return (
    <div id="content">
      
      <div>
        { wantList.map(item => <img key={item.id} style={{width: '200px'}} onClick={() => removeItem(item.id)} src={item.basic_information.cover_image} />) }
      </div>
    </div>
  )
}

export default Layout(HomePage);