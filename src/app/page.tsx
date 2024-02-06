import { getData, saveData, updateData, deleteData} from '@/utils/handleDatabase'
import Image from "next/image";
import { revalidateTag } from 'next/cache';

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
          {data.map((data)=>{
            return (
              <>
                <h1 className='text-white text-2xl'><span className='italic font-light'>"{data.quote}"</span> - {data.author}</h1>
                <br />
              </>
            )
          })}
        </div>

        <div className='flex flex-col items-center mt-20'>
          <form action={create}>
            <h1 className='text-white font-bold text-xl'>create</h1>
            <input type="text" name='author' placeholder='author' />
            <input type="text" name='quote' placeholder='quote' />
            <button type='submit' className='text-white'>Save Quote</button>
          </form>
          <br />
          <form action={update}>
            <h1 className='text-white font-bold text-xl'>update</h1>
            <input type="text" name='update-id' placeholder='id' />
            <input type="text" name='update-author' placeholder='updated author' />
            <input type="text" name='update-quote' placeholder='updated quote' />
            <button type='submit' className='text-white'>Update Quote</button>
          </form>
          <br />
          <form action={deleteQuote}>
            <h1 className='text-white font-bold text-xl'>delete</h1>
            <input type="text" name='delete-id' placeholder='delete id' />
            <button type='submit' className='text-white'>Delete Quote</button>
          </form>
        </div>
      </div>
    </>
  );
}
