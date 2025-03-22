import Logo from '../../public/logo.png';
import Image from 'next/image';
export default function Nav() {
  return (
  
      

<nav className=" ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div>
      <a href="#" className="text-lg font-bold flex gap-3">
        <Image src={Logo} alt="logo" width={60} height={60}></Image>
        <h1 className='text-[#DA08C9] text-[24px] mt-4 block sm:block hidden'>SaveFromInsta</h1>

      </a>
    </div>
    <div></div>
    <div>
      <button className='px-4 py-3 rounded-[10px] bg-blue-300 text-white text-[18px]'>Lanuage</button>
    </div>

  
  </div>
</nav>

  
  );
  
}