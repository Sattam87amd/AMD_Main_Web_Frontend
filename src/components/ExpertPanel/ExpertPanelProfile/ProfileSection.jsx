'use client';

const ProfileSection = () => {
    return (
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold">Profile</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <div className="flex items-center space-x-4">
            <img src="/profile.jpg" alt="Profile" className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="text-lg font-semibold">Ayaan Raje</h3>
              <p className="text-gray-500">India</p>
            </div>
            <button className="ml-auto border px-4 py-1 rounded">Edit ✏️</button>
          </div>
          
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input type="text" value="Wajiha" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input type="text" value="Jafri" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Mobile Number</label>
              <input type="text" value="+919124245630" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" value="wajiha2007@gmail.com" className="w-full border rounded px-3 py-2" />
            </div>
          </div>
  
          <button className="mt-6 w-full bg-black text-white py-2 rounded">Save</button>
        </div>
      </div>
    );
  };
  
  export default ProfileSection;
  