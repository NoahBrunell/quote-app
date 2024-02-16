import { db } from "@/utils/db";

type PageByIdProps = {
    params: {
        id: number
    }
}

export default function pageById({params}: PageByIdProps) {

    const onSubmit = async (data: FormData) => {
        "use server"
        console.log('onSubmit');
        
        db.query('UPDATE quotes SET author = $1, quote = $2 WHERE id = $3', [data.get('author'), data.get('quote'), params.id])
    }

  return (
    <div className="min-h-screen bg-slate-800 flex flex-col justify-center items-center">
    <div className="bg-gray-900 p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-white">{params.id}</h1>
        <a href="../" className="text-blue-500 mb-4 hover:text-blue-400">Back</a>
        <form className="flex flex-col items-center" action={onSubmit}>
            <label htmlFor="author" className="mb-2 text-white">Author</label>
            <input className="border p-2 mb-4 w-64 bg-gray-800 text-white" type="text" name="author"/>
            <label htmlFor="quote" className="mb-2 text-white">Quote</label>
            <input className="border p-2 mb-4 w-64 bg-gray-800 text-white" type="text" name="quote" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
        </form>
    </div>
    </div>



    // <div>
    //     <h1 className="text-4xl font-bold">{params.id}</h1>
    //     <a href="../">Back</a>
    //     <br />
    //     <form className="flex flex-col justify-around items-center" action={onSubmit}>
    //         <label htmlFor="author">Author</label>
    //         <input className="border" type="text" name="author"/>
    //         <label htmlFor="quote">Quote</label>
    //         <input className="border" type="text" name="quote" />
    //         <button type="submit">Save</button>
    //     </form>
    // </div>
  )
}
