import { NAVBAR } from '@/global/constants';
import Inbox from './inbox/inbox';

export default function Home() {
  return (
    <>
      <Inbox activeNav={NAVBAR.All_TICKET} />
    </>
  );
}
