import Logo from '../../public/logo.png';
import Image from 'next/image';
export default function Nav() {
  return (
  
      

<nav className=" ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div>
      <a href="#" className="text-lg font-bold flex gap-3">
        <Image src={Logo} alt="logo" width={60} height={60}></Image>
        <h1 className='text-[#DA08C9] md:text-[24px] text-[20px] mt-4 '>SaveFromInsta</h1>

      </a>
    </div>
    <div></div>
    <div>
      
    </div>

  
  </div>
</nav>

  
  );
  
}