import { createContext, useEffect, useReducer, useState } from 'react';
import recordReducer from '../../reducers/record/record.reducer';

export const RecordContext = createContext({
  record: {id: null, basic_information: null}, dispatchCurrentRecord: (record: any) => {}});

const RecordContextProvider = props => {
  const [record, dispatchCurrentRecord] = useReducer(recordReducer, {});

  return (
    <RecordContext.Provider value={{record, dispatchCurrentRecord}}>
      { props.children }
    </RecordContext.Provider>
  );
}

export default RecordContextProvider;
