// src/App.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthService } from "./appwrite/AppWriteService";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to Your App!</h1>
    </div>
  );
}

export default App;
