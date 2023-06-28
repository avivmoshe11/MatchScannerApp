import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Layout/navbar';
import Sidebar from './Components/Layout/sidebar';
import Footer from './Components/Layout/footer';
import Home from './Pages/home';
import Profile from './Pages/profile';
import ProfileSetup from './Pages/profileSetup';
import LinkPageTest from './Pages/link';
import CreateUser from './Pages/createUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from './Store/user-slice';
import functions from './Assets/functions/index';
import services from './Services/index';

function App() {
  const dispatch = useDispatch();

  const initiateApp = async () => {
    try {
      const user = await services.users.getUser();
      if (user.error) throw new Error();
      dispatch(userActions.updateState(user));
    } catch {
      let profile = services.profiles.getProfileFromCookies();
      if (profile) {
        dispatch(userActions.updateState({ user: {}, profile: profile }));
      } else {
        try {
          await services.profiles.createProfile({
            userName: functions.generateGuestName()
          });
          profile = services.profiles.getProfileFromCookies();
          dispatch(userActions.updateState({ user: {}, profile: profile }));
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  useEffect(() => {
    initiateApp();
  }, []);

  return (
    <div className="min-vh-100">
      <ToastContainer />
      <header>
        <Navbar />
        <Sidebar />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="link" element={<LinkPageTest />} />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="profileSetup" element={<ProfileSetup />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
