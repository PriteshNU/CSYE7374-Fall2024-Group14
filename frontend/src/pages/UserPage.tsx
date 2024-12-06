import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import * as UserService from "../services/user-service";
import User from "../models/UserModel";
import Sidebar from "../components/Sidebar";
// To render user details where user can view, edit and save user details
const UserPage = () => {
  const [user, setUser] = useState<User | null>(null); // User or null as initial state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await UserService.getUser(); // Fetch a single user
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const category = () => {};

  return (
    <div className="flex flex-row h-screen">
      <Sidebar category={category} />
      <div className="w-screen">
        {user ? <UserCard user={user} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default UserPage;
