import { getData, saveData, updateData, deleteData} from '@/utils/handleDatabase'
import Image from "next/image";
import { revalidateTag } from 'next/cache';
import { handleClientScriptLoad } from 'next/script';

export default async function Home() {
  const data = await getData()
  console.log(data);

  const create = async (formData:FormData) => {
    "use server"
    const quote = formData.get("quote") as string
    const author = formData.get("author") as string
    const data = await saveData(quote, author)
    console.log(data);
    revalidateTag("quote")
  }

  const update = async (formData:FormData) => {
    "use server"
    const quote = formData.get("update-quote") as string
    const author = formData.get("update-author") as string
    const id = formData.get("update-id") as string
    const data = await updateData(id, author, quote)
    console.log(data);
    revalidateTag("quote")

  }

  const deleteQuote = async (formData:FormData) => {
    "use server"
    const id = formData.get("delete-id") as string
    const data = await deleteData(id)
    console.log(data);
    revalidateTag("quote")

  }
  
  
  return (
    <>
      <div className="bg-gray-800 w-screen h-screen">
        <div className="mb-20 h-12 w-screen bg-slate-600 flex justify-center items-center">
        </div>

        <div className='flex flex-col items-center w-screen my-10'>
        <div className='flex flex-col items-center mt-20'>
          <form action={create}>
            <h1 className='text-white font-bold text-xl'>create</h1>
            <input type="text" name='author' placeholder='author' />
            <input type="text" name='quote' placeholder='quote' />
            <button type='submit' className='text-white'>Save Quote</button>
          </form>
          <br />
        </div>
          {data.map((data)=>{
            return (
              <>
                <div id={data.id} className='flex items-center'>
                  <h1 className='text-white text-2xl'><span className='italic font-light'>"{data.quote}"</span> - {data.author}</h1>
                  <form action="">
                    <a href={"/quotes/" + data.id}><img className='w-6 h-6 ml-2' src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" alt="" /></a>
                  </form>
                  <form className='flex items-center' action={deleteQuote}>
                    <button className='ml-2'>
                      <svg name='id'xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                    <input type="hidden" name='delete-id' value={data.id} />
                  </form>
                </div>
                <br />
              </>
            )
          })}
        </div>

        
      </div>
    </>
  );
}
