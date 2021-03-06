import React, { useState } from "react";
import { useSelector } from 'react-redux';

import { Fragment } from "react";
import styles from './list-item.module.css';
import axios from 'axios';
import { AppState } from "../../store/reducers";
import { OtherHttp } from "../../http";

export default function WantListItem(alert) {
  const user = useSelector((state: AppState) => state.user);

  const [form, setForm] = useState({ price: '', notes: '' });

  const otherHttp = new OtherHttp();

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    } as any);
  }

  function setAlert() {
    if(!user.phone) return window.alert('you need a phone number on your account')
    try {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/alerts/create`, { item: alert.item, notes: form.notes, id: user._id, maxPrice: form.price })
    } catch(err) {
      console.error(err);
    }
  }

  function removeFromWantlist() {
    otherHttp.instance.post(`${process.env.NEXT_PUBLIC_API_URL}/account/wants/remove`, { id: alert.item.id })
  }

  return (
    <li className={styles.listItem}>
      <a className={styles.releaseInfo}>
        <img style={{ width: '40px', height: '40px' }} src={alert.item.basic_information.thumb} />
        <div>
          <p>{alert.item.artist}</p>
          <p className={styles.title}>{ alert.item.title }</p>
        </div>
      </a>

      <div className={styles.notes}>
        <input name="notes" onChange={updateForm} defaultValue={alert.item.notes} type="text" />
      </div>
      
      <div className={styles.price}>
        <input name="price" onChange={updateForm} defaultValue={alert.item.price} type="text" />
      </div>

      <div className={styles.update}>
          <Fragment>
            <a onClick={() => setAlert()}>Create Notification</a>&nbsp;/&nbsp; 
            <a onClick={() => removeFromWantlist()}>Remove</a>&nbsp;
          </Fragment>
      </div>
      
    </li>
  )
}
