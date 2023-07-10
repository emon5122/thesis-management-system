const List = () => {
    return (
      <div className="h-screen">
      <div
        className="m-auto pt-20
       w-full max-w-xs"
      >
        <form className="pl-10">
          <div className="mb-4">
            <label
              className="block text-white  text-sm font-bold mb-2"
              htmlFor="username"
            >
              Student name
            </label>
            <input
              className="shadow appearance-none border rounded w-60 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userid"
              type="text"
             
            />
            <label
             className="block text-white  text-sm font-bold mb-2"
              htmlFor="userid"
            >
              Student Id
            </label>
            <input
              className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userid"
              type="text"
              
            />
            <button 
                            className="mb-3 inline-block w-60 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.2),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            Submit
                          </button>
          </div>
        </form>
        </div>
        
  <table className='m-auto border-2 '>
    <thead >
      <tr className="text-white">
        <th className='px-8 m-1 bg-cyan-700'>Student Name</th>
        <th className='px-8 m-1 bg-cyan-700'>Student Id</th>
      </tr>
    </thead>
    <tbody >
      
    <tr className="text-white border-t-2 mb-2">
        <td className="text-lg text-center">Fabiha Khan</td>
        <td className="text-center px-8 ">19303004</td>
        
      </tr>
      <tr className="text-white border-t-2 mb-2">
        <td className="text-lg text-center">Fabiha Khan</td>
        <td className="text-center px-8 ">19303004</td>
        
      </tr>
      <tr className="text-white border-t-2 mb-2">
        <td className="text-lg text-center">Fabiha Khan</td>
        <td className="text-center px-8 ">19303004</td>
        
      </tr>
      <tr className="text-white border-t-2 mb-2">
        <td className="text-lg text-center">Fabiha Khan</td>
        <td className="text-center px-8 ">19303004</td>
        
      </tr>
      
      <tr className="text-white border-t-2 mb-2">
        <td className="text-lg text-center">Fabiha Khan</td>
        <td className="text-center px-8 ">19303004</td>
        
      </tr>
      </tbody>
      
      </table>
      </div>
      
      
    );
  };
  
  export default List;