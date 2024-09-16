import Inbox from './inbox/inbox';
import { NAVBAR } from '@/global/constants';

export default function Home() {
  return (
    <>
      <Inbox activeNav={NAVBAR.All_TICKET} />
    </>
  );
}
