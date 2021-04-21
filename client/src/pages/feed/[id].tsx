import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { OtherHttp } from "../../http";
import { AppState } from "src/store/reducers";
import { GET_ALERT_LIST } from "src/store/actions/list.actions";

import Button from './../../components/button/button';

import styles from './alert-detail.module.scss';

function AlertDetail(props) {
  const http = new OtherHttp();
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;
  const alert = useSelector((state: AppState) => state.lists.alerts[id as string]);
  const [form, setForm] = useState({ notes: alert?.details.notes, price: alert?.price });

  useEffect(() => {
    getAlertList();
  }, []);

  async function getAlertList() {
    try {
      dispatch({ type: GET_ALERT_LIST });
    } catch (error) {
      console.error(error);
    }
  }

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    } as any);
  }

  const onlyNumbers = (e) => {
    const key = e.keyCode;
    if (((key < 47 && key !== 37 && key !== 39) || key > 57) && key !== 8) e.preventDefault();
  }

  async function updateAlert() {
    try {
      const res = await http.instance.post('/user/alerts/update', { item: { ...alert.item, ...form } });
      if (res.status === 200) router.push('./')
      dispatch({ type: GET_ALERT_LIST });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    alert ? (
      <div id={styles.alertDetail}>
        <h3>{alert.item.title}</h3>
        <h4>{alert.item.artist}</h4>

        <a className="underline" target="_blank" href={`https://www.discogs.com/sell/release/${alert.item.id}`}>Check listings on Discogs</a>

        <form>
          <div>
            <label htmlFor="wantprice">
              Price you want to pay
            <input onKeyDown={onlyNumbers} onChange={updateForm} name="price" placeholder="e.g. 20" defaultValue={alert.price} type="text" />
            </label>
          </div>
          <div>
            <label htmlFor="notes">
              Notes
            <input onChange={updateForm} name="notes" placeholder="Notes" defaultValue={alert.details.notes} type="text" />
            </label>
          </div>
          <Button onClick={() => updateAlert()} text="Save"></Button>
        </form>

      </div>
    ) : (
      <p>Loading</p>
    ) 
  )
}

export default AlertDetail;