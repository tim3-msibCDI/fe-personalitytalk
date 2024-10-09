import Countlist from '@/app/components/user/about/countlist';
import Founder from '@/app/components/user/about/founder';
import Mitra from '@/app/components/user/about/mitra';
import Profile from '@/app/components/user/about/profile';
import Psikologlist from '@/app/components/user/about/psikologlist';

export default function About() {
  return (
    <>
      <Profile />
      <Countlist />
      <Founder />
      <Psikologlist />
      <Mitra />
    </>
  );
}
