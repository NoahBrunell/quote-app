import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-gray-800 w-screen h-screen">
        <div className="mb-20 h-12 w-screen bg-slate-600 flex justify-center items-center">
          <a className="border px-4 py-1 rounded-md mr-20 text-white" href="">HOME</a>
          <a className="border px-4 py-1 rounded-md text-white" href="">ADD</a>
          <a className="border px-4 py-1 rounded-md ml-20 text-white" href="">RANDOM</a>
        </div>
        <form className="w-[80vw] h-[40vh] bg-slate-700 mx-auto rounded-sm flex flex-col justify-around items-center" action="">
          <h1 className="text-4xl text-white font-bold">Add quote</h1>
          <label className="px-6 py-2 rounded-lg border text-white" htmlFor="">Author<input className="ml-2 " type="text" /></label>
          <label className="px-6 py-2 rounded-lg border text-white flex flex-col items-center" htmlFor="">Quote<textarea></textarea></label>
          
        </form>
      </div>
    </>
  );
}
