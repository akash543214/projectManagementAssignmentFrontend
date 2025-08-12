import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyUserlogin } from '../BackendApi/authApi';
import { login } from "../store/authSlice";
//import Header from './Header/Header.tsx';
import LoadingCircle from '../assets/LoadingCircle';

function App() {
  
    const navigate = useNavigate();

  useEffect(() => {
  document.documentElement.classList.add("dark");
}, []);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const verifyLogin = async () => {
    try {
      const res = await verifyUserlogin();
      if (res?.success === true) {
        dispatch(login(res.data));
      }
    } catch (err) {

      console.log(err);
     navigate("/login")

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  if (loading) {
    return (
      <LoadingCircle />
    );
  }

  return (
   <>
      <Outlet />
    </>
  );
}

export default App;
