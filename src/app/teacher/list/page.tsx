const List = () => {
  return (
    <div
      className="m-auto py-20
     w-full max-w-xs"
    >
      <form>
        <div className="mb-4">
          <label
            className="block text-white text-center text-lg font-bold mb-2"
            htmlFor="username"
          >
            Student name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userid"
            type="text"
           
          />
          <label
           className="block text-white text-center text-lg font-bold mb-2"
            htmlFor="userid"
          >
            Student Id
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userid"
            type="text"
            
          />
        </div>
      </form>
    </div>
  );
};

export default List;
