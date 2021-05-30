import React, { useEffect } from 'react';

import AlertItem from './items/alert-item';

import styles from './../../pages/feed/feed.module.css';
import { useRouter } from 'next/router';
import { Modal } from '../modal/modal-component';
import AlertDetail from 'src/pages/feed/[id]';
import { GET_ALERT_LIST, SET_ALERT_LIST } from 'src/store/actions/list.actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/store/reducers';

export default function WantListFeed() {
  const router = useRouter();
  const dispatch = useDispatch();

  const alerts = Object.values(useSelector((state: AppState) => state.lists.alerts));

  useEffect(() => {
    getAlertList();
  }, []);

  async function getAlertList() {
    try {
      dispatch({type: GET_ALERT_LIST});
    } catch (error) {
    }
  }

  const goToAlertList = (e) => {
    e.preventDefault()
    router.push("account/lists/alerts");
  }

  return (
    <section>
      <h3><a onClick={goToAlertList}>Alert List</a></h3>
      <ul>
        {alerts && alerts.length ? alerts.map((item: any, i) => (
          <AlertItem key={item._id} item={item} ></AlertItem>
        )) : "No results"}
      </ul>

      <Modal isOpen={!!router.query.id}>
        <AlertDetail />
      </Modal>
    </section>
  )
}