import './../styles/stylesheet.scss';
import  UserContextProvider, { UserContext } from '../contexts/user.context';
import RecordContextProvider from '../contexts/record/record.context';

export default function OtherApp({ Component, pageProps }) {

  return (
    <UserContextProvider>
      <RecordContextProvider>
        <Component {...pageProps} />
      </RecordContextProvider>
    </UserContextProvider>
  )
}