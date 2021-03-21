import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';

import Button from './../../components/button/button';
import withLayout from '../../components/layouts';
import withAccountLayout from './accountLayout';
import { AppState } from '../../store/reducers';
import { UPDATE_USER } from '../../store/actions/user.actions';

import styles from './account.module.scss';

function SettingsPage() {
  const user = useSelector((state: AppState) => state.user);
  const [form, setForm] = useState({email: undefined, password: undefined, phone: undefined});

  const dispatch = useDispatch();
  const router = useRouter();

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
    console.log({name}, {value}, {form});
  }

  async function loginToDiscogs() {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/discogs`);
  }

  return (
    <div id={styles.accountSettings}>
      <h3>Settings</h3>
      <div id={styles.discogsSync}>
      { user.discogs?.token && user.discogs?.tokenSecret ? (
            <p>You are synced to Discogs with username <b>{user.discogs.username}</b></p>
        ) : (
          !user.loading ? (
            <Fragment>
              <p>This site is meant to work with <a className="underline" href="http://www.discogs.com" target="_blank">Discogs</a>.<br></br>Sync your account for the full experience.</p>
              <Button text="Sync Discogs" onClick={loginToDiscogs}></Button>
            </Fragment>
          ) : ''
        )}
      </div>
      <form>
        <div>
          <label htmlFor="username">
            Email Address
            <input onChange={updateForm} disabled name="username" placeholder="Email" defaultValue={user.username} type="text" />
          </label>
        </div>
        <div>
          <label htmlFor="phone">
            Phone Number
            <input onChange={updateForm} name="phone" placeholder="Phone Number" defaultValue={user.phone} type="text" />
          </label>
        </div>
        <Button onClick={() => updateSettings()} text="Save"></Button>
      </form>
    </div>
  );  
}

export default withLayout(withAccountLayout(SettingsPage));
