const SingleEvaluation = ({ param }: any) => {
  return (
    <div className="flex flex-col  mb-10">
      <div>Evaluator&apos;s Name: {param.evaluator.name}</div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-justify border-slate-500 border-2">
        <div className="grid grid-cols-6 ">
          <div className="mb-2  col-span-4 ">
            <div className="grid grid-cols-4  ">
              <div className="mb-2 col-span-3 ">
                <label
                  className="block text-black text-sm  mb-2"
                  htmlFor="name"
                >
                  Demonstrate sound background knowledge and in-depth analysis
                  of problem domain after exsaustive study of research
                  literature. (PO1-PO2-PO12) (15%)
                </label>
              </div>
              <div className="m-2 col-span-1   ">
                <p className="text-center text-black text-sm">{param?.m1}</p>
              </div>
            </div>

            <hr className="border-slate-500 border-1" />
            <div className="grid grid-cols-4 ">
              <div className="mb-2 col-span-3 ">
                <label
                  className="block text-black text-sm  mb-2"
                  htmlFor="name"
                >
                  Appropriate solution approach (designing methods) and own
                  contributions. (PO3) (20%)
                </label>
              </div>
              <div className="m-2 col-span-1">
                <p className="text-center text-black text-sm">{param?.m2}</p>
              </div>
            </div>
            <hr className="border-slate-500 border-1" />
            <div className="grid grid-cols-4 ">
              <div className="mb-2 col-span-3 ">
                <label
                  className="block text-black text-sm  mb-2"
                  htmlFor="name"
                >
                  Conduct proper investigation through experiment and analysis
                  of data to arrive at valid conclusions. (PO4) (25%)
                </label>
              </div>
              <div className="m-2 col-span-1 ">
                <p className="text-center text-black text-sm">{param?.m3}</p>
              </div>
            </div>
            <hr className="border-slate-500 border-1 " />
            <div className="grid grid-cols-4 ">
              <div className="mb-2 col-span-3 ">
                <label
                  className="block text-black text-sm  mb-2"
                  htmlFor="name"
                >
                  Choose appropriate/modern tools or software for experiment of
                  analysis. (PO5) (10%)
                </label>
              </div>
              <div className="m-2 col-span-1 ">
                <p className="text-center text-black text-sm">{param?.m4}</p>
              </div>
            </div>
            <hr className="border-slate-500 border-1" />
            <div className="grid grid-cols-4 ">
              <div className="mb-2 col-span-3">
                <label
                  className="block text-black text-sm  mb-2"
                  htmlFor="name"
                >
                  Give clear and logical oral presentation and present written
                  final report (PO10) (20%)
                </label>
              </div>
              <div className="m-2 col-span-1 ">
                <p className="text-center text-black text-sm">{param?.m5}</p>
              </div>
            </div>
            <hr className="border-slate-500 border-1" />
            <div className="grid grid-cols-4 ">
              <div className="mb-2 col-span-3">
                <label
                  className="block text-black text-sm  mb-2"
                  htmlFor="name"
                >
                  Work has an impact on society and some vision or awareness for
                  environment and sustainability. (PO6-PO7-PO8) (10%)
                </label>
              </div>

              <div className="m-2 col-span-1 ">
                <p className="text-center text-black text-sm">{param?.m6}</p>
              </div>
            </div>
            <hr className="border-slate-500 border-1 " />
          </div>

          <div className="mb-2 ml-2 col-span-2 border-slate-500 border-2">
            <p className="text-center flex justify-center align-middle text-black text-sm m-2">{param?.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvaluation;
