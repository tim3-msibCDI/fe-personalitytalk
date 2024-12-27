import Countlist from "@/components/user/about/countlist";
import Founder from "@/components/user/about/founder";
import Mitra from "@/components/user/about/mitra";
import Profile from "@/components/user/about/profile";
import Psikologlist from "@/components/user/about/psikologlist";


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
