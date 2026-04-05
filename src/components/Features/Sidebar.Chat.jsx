import React from "react";
import Avatar from "../../assets/avatar.png";
function Sidebar() {
  const users = [
    { id: 1, name: "Marvin McKinney" },
    { id: 2, name: "John Doe" },
  ];

  return (
    <div className="space-y-8 rounded-2xl  flex flex-col items-center w-100 p-4 bg-white">
      <h2 className="text-2xl font-bold poppins-medium">Messages</h2>

      {users.map((user) => (
        <div
          key={user.id}
          className=" space-x-4 h-10 flex items-center space-y-2  w-full cursor-pointer hover:bg-gray-200 rounded-2xl "
        >
          <div className="rounded-full w-10 ">
            <img src={Avatar} />
          </div>
          <p className="">
            {user.avatar}
            <span className="poppins-medium">{user.name}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
