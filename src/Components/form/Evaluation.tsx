import { Button } from "@mui/material";
const Evaluation = ({ id }: { id: string }) => {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="grid grid-cols-6 border-yellow-800 border-2">
        <div className="mb-2  col-span-4 border-blue-800 border-2">
            <div className="grid grid-cols-4 border-blue-800 border-2 ">
          <div className="mb-2 col-span-3 ">
            <label className="block text-black text-sm  mb-2" htmlFor="name">
              Demonstrate sound background knowledge and in-depth analysis of
              problem domain after exsaustive study of research literature.
              (PO1-PO2-PO12) (15%)
            </label>
          </div>
          <div className="m-2 col-span-1   ">
            <input
              className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="number"
            />
          </div>
          </div>
        
        <hr className="bg-black" />
        <div className="grid grid-cols-4 border-blue-800 border-2">
          <div className="mb-2 col-span-3 ">
            <label className="block text-black text-sm  mb-2" htmlFor="name">
              Appropriate solution approach (designing methods) and own
              contributions. (PO3) (20%)
            </label>
          </div>
          <div className="m-2 col-span-1">
            <input
              className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="number"
            />
          </div>
        </div>
        <hr className="bg-black" />
        <div className="grid grid-cols-4 border-blue-800 border-2">
          <div className="mb-2 col-span-3 ">
            <label className="block text-black text-sm  mb-2" htmlFor="name">
              Conduct proper investigation through experiment and analysis of
              data to arrive at valid conclusions. (PO4) (25%) (PO1-PO2-PO12)
              (15%)
            </label>
          </div>
          <div className="m-2 col-span-1 ">
            <input
              className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="number"
            />
          </div>
        </div>
        <hr className="bg-black " />
        <div className="grid grid-cols-4 border-blue-800 border-2">
          <div className="mb-2 col-span-3 ">
            <label className="block text-black text-sm  mb-2" htmlFor="name">
              Choose appropriate/modern tools or software for experiment of
              analysis. (PO5) (10%)
            </label>
          </div>
          <div className="m-2 col-span-1 ">
            <input
              className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="number"
            />
          </div>
        </div>
        <hr className="bg-black" />
        <div className="grid grid-cols-4 border-blue-800 border-2">
          <div className="mb-2 col-span-3">
            <label className="block text-black text-sm  mb-2" htmlFor="name">
              Give clear and logical oral presentation and present written final
              report (PO10) (20%)
            </label>
          </div>
          <div className="m-2 col-span-1 ">
            <input
              className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="number"
            />
          </div>
        </div>
        <hr className="bg-black" />
        <div className="grid grid-cols-4 border-blue-800 border-2">
          <div className="mb-2 col-span-3">
            <label className="block text-black text-sm  mb-2" htmlFor="name">
              Work has an impact on society and some vision or awareness for
              environment and sustainability. (PO6-PO7-PO8) (10%)
            </label>
          </div>
          <div className="m-2 col-span-1 ">
            <input
              className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="number"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-2 col-span-2 border-orange-800 border-2">
      </div>
      </div>
    </form>
  );
};

export default Evaluation;
