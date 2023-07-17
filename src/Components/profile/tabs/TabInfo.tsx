"use client"
const TabInfo =({user}:any)=>{
    return(            <div>
        <div className="border-2 border-dashed border-white shadow-lg p-6">
          <div className="flex justify-center text-4xl font-serif text-white  shadow-md mb-4">
            About Me
          </div>
          <div className="flex flex-col font-serif text-white gap-2">
            <div className="grid grid-cols-6">
              <div className="col-span-2 capitalize">NAME</div>
              <div className="col-span-1">{":"}</div>
              <div className="col-span-3">{user?.name}</div>
            </div>
            <hr />
            <div className="grid grid-cols-6">
              <div className="col-span-2">EMAIL</div>
              <div className="col-span-1">{":"}</div>
              <div className="col-span-3">{user?.email}</div>
            </div>
            <hr />
            <div className="grid grid-cols-6">
              <div className="col-span-2">ROLE</div>
              <div className="col-span-1">{":"}</div>
              <div className="col-span-3">{user?.role}</div>
            </div>
          </div>
        </div>
      </div>)
}
export default TabInfo