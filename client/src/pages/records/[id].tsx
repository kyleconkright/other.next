import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import withLayout from "../../components/layouts";
import { GET_RECORD } from "../../store/actions/record.actions";
import { AppState } from "../../store/reducers";
import styles from "./record.module.scss";

function Record(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const record = useSelector((state: AppState) => state.record);

  useEffect(() => {
    if(user.username && router.query.id) {
      dispatch({ type: GET_RECORD, id: router.query.id });
    }
  }, [user])

  return (
    <div id={styles.recordContent}>
      <div>
        <a className={'underline'} onClick={() => router.back()}>Back</a>
      </div>

      { record.loading ? 'loading' : (
        <Fragment>
          {/* <h3>{ record.artists ? record.artists[0].name : null }</h3> */}
          <h2>{ record.title }</h2>
        </Fragment>
      ) }
      
      {/* <p className={styles.title}>{ record.basic_information.title }</p>
      <img key={record.id} style={{width: '140px'}} src={ record.basic_information.cover_image } /> */}

    </div>
  
  )
}

export default withLayout(Record);