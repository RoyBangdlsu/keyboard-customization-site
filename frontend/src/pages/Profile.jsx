import { useEffect, useState } from "react";



function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p className="text-center mt-10 text-xl">No user found. Please log in.</p>;
  }

  return (
    <div className="p-8 bg-white shadow-xl rounded-lg w-1/3 mx-auto border border-gray-200 mt-10">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="text-lg"><strong>Name:</strong> {user.name}</p>
      <p className="text-lg"><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default Profile;