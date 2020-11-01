import { useRouter } from "next/router";
import { useContext } from "react";

import withLayout from "../../components/layouts";
import styles from "./record.module.scss";

function Record(props) {
  const router = useRouter();

  // TODO: Add redux

  return (
    <div id={styles.recordContent}>
      <div>
        <a className={'underline'} onClick={() => router.back()}>Back</a>
      </div>
      {/* {router.query.id} */}
      {/* <h2>{ record.basic_information.artists[0].name }</h2>
      <p className={styles.title}>{ record.basic_information.title }</p>
      <img key={record.id} style={{width: '140px'}} src={ record.basic_information.cover_image } /> */}

    </div>
  )
}

export default withLayout(Record);