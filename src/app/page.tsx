import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full bg-no-repeat px-5 py-5 bg-cover bg-[url('./img/Home.jpg')]	">
      <div className="flex justify-between items-center py-4 bg-blue-900">
  <div className="flex-shrink-0 ml-10 cursor-pointer">
    <i className="fas fa-drafting-compass fa-2x text-orange-500"></i>
    <span className="ml-1 text-3xl text-blue-200 font-semibold">Welcome!</span>
  </div>
  <i className="fas fa-bars fa-2x visible md:invisible mr-10 md:mr-0 text-blue-200 cursor-pointer"></i>
  <ul className="hidden md:flex overflow-x-hidden mr-10 font-semibold">
    <li className="mr-6 p-1 border-b-2 border-orange-500">
      <a className="text-white hover:text-blue-300 " href="#">Home</a>
    </li>
    <li className="mr-6 p-1">
      <a className="text-white hover:text-blue-300" href="#">Published papers</a>
    </li>
    <li className="mr-6 p-1">
      <a className="text-white hover:text-blue-300" href="#">Log in</a>
    </li>
    <li className="mr-6 p-1">
      <a className="text-white hover:text-blue-300" href="#">Sign up</a>
    </li>
  </ul>
</div>
<div className="flex justify-center items-center h-screen text-3xl text-slate-300			">
  <i>“Innovation is the key to the future,<br></br> but basic research is the key to future innovation.”</i><br></br><br></br>
  – Jerome Isaac Friedman
</div>
      {/* <Link href={"/something"}>Go to Something</Link> */}
    </main>
  );
}
