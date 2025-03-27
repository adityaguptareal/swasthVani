import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const[userName,setUserName] = useState(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  }
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
    try {
      const { data:{user},error } = await supabase.auth.getUser() 
      if(error){
        toast.error(`Error fetching user:${error.message}`);
        console.error(`Error fetching user:${error.message}`);
        navigate("/login");
        return
      }
      if (!user) {
        toast.error("No user found");
        console.error("No user found");
        navigate("/login");
        return
      }
      setUser(user);
      setUserName(user.email.split("@")[0]);
    
    } catch (error) {
      toast.error("Error fetching user:", error.message);
      console.error("Error fetching user:", error.message);
      navigate("/login");
    }
    }; 
    getUser(); 
  }, []);

  if (!user) return <p>Loading...</p>;
  // console.log( )

  return (
    <div>
      <h1>Welcome, {userName || "User"}!</h1>
      <button onClick={handleLogout} className="bg-red-500 p-4">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
