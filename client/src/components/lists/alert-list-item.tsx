import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { OtherHttp } from "../../http";
import styles from './list-item.module.css';


export default function AlertListItem(alert) {
  const { price, notes } = alert.item;

  const http = new OtherHttp();
  const [form, setForm] = useState({ price, notes });
  const [editMode, setEditMode] = useState(false);
  
  const disabled = !editMode ? true : null;

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    } as any);
  }

  async function updateAlert(alert) {
    try {
      const res = await http.instance.post('/user/alerts/update', { item: {...alert.item, ...form} });
      if (res.status === 200) setEditMode(false)
    } catch (error) {
      console.error(error);
    }
  }

  function toggleEditMode() {
    const mode = !editMode;
    setEditMode(mode);
  }

  return (
    <li className={styles.listItem}>
      <a className={styles.releaseInfo} onClick={() => toggleEditMode()}>
        <input checked={editMode} readOnly type="checkbox"></input>
        <img className="cover" style={{ width: '40px', height: '40px' }} src={alert.item.cover} />
        <div>
          <p>{alert.item.artist}</p>
          <p className={styles.title}>{ alert.item.title }</p>
        </div>
      </a>

      <div className={styles.notes}>
        <input className="editInput" disabled={disabled} name="notes" onChange={updateForm} defaultValue={alert.details ? alert.details.notes : alert.item.notes} type="text" />
      </div>
      
      <div className={styles.price}>
        <input className="editInput" disabled={disabled} name="price" onChange={updateForm} defaultValue={alert.item.price} type="text" />
      </div>

      <div className={styles.update}>
        { editMode ? (
          <Fragment>
            <a onClick={() => updateAlert(alert)}>Update</a>&nbsp;/&nbsp; 
            <a onClick={() => alert.onDelete(alert)}>Delete</a>&nbsp;
            <a className={styles.go} target="_blank" href={`https://www.discogs.com/sell/release/${alert.item.id}?price1=&price2=${alert.price}&currency=USD`}>&#10149;</a>
          </Fragment>
        ) : '' }
      </div>
      
    </li>
  )
}
