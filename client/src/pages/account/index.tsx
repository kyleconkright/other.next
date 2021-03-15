import Button from './../../components/button/button';
import withLayout from '../../components/layouts';
import withAccountLayout from './accountLayout';
import { AppState } from '../../store/reducers';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { UPDATE_USER } from '../../store/actions/user.actions';

function SettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const [form, setForm] = useState({email: undefined, password: undefined, phone: undefined});

  async function updateSettings() {
    try {
      dispatch({type: UPDATE_USER,  user: { ...form, id: user._id }});
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
    <div id="content">
      <h3>Settings</h3>
      <form>
        <div className="number">
          <p>{ user.phone }</p>
          <input onChange={updateForm} name="phone" placeholder="Phone Number" type="text" />
        </div>
        <Button onClick={() => updateSettings()} text="Save"></Button>
      </form>
    </div>
  );  
}

export default withLayout(withAccountLayout(SettingsPage));
