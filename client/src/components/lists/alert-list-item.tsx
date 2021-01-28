import { useState } from "react";
import { OtherHttp } from "../../http";
import styles from './list-item.module.scss';


export default function ListItem(alert) {
  const { price, notes } = alert.item;

  const http = new OtherHttp();
  const [form, setForm] = useState({ price, notes });

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    } as any);
  }

  async function updateAlert(alert) {
    try {
      await http.instance.post('/user/alerts/update', { item: {...alert.item, ...form} });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <li>
      <a target="_blank" href={`https://www.discogs.com/sell/release/${alert.item.id}?price1=&price2=${alert.price}&currency=USD`}>
        <img style={{ width: '40px' }} src={alert.item.cover} />
        <div>
          <p>{alert.item.artist}</p>
          <p className={styles.title}>{ alert.item.title }</p>
        </div>
      </a>

      <div>
        <input name="notes" onChange={updateForm} defaultValue={alert.item.notes} type="text" />
      </div>
      
      <div>
        <input name="price" onChange={updateForm} defaultValue={alert.item.price} type="text" />
      </div>

      <a onClick={() => updateAlert(alert)}>Update</a>
      <a onClick={() => alert.onDelete(alert)}>Delete</a>
    </li>
  )
}