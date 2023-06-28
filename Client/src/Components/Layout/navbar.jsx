import { useEffect, useState } from 'react';
import '../../Styles/navbar.css';
import { useGlobalContext } from '../../Context/sidebar.context';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../Assets/images/logo (1).svg';
import { useLocation } from 'react-router-dom';
import LoginSignUpModal from '../Home/loginSignUpModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userActions } from '../../Store/user-slice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import services from '../../Services/index';

const Nav = () => {
  //false by default - see in useContext file
  const { openSidebar } = useGlobalContext();

  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const [color, setColor] = useState(false);
  const [width, setWidth] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const loggedUser = useSelector((state) => state.user);
  const nameToToast = loggedUser?.email?.split('@')[0];

  useEffect(() => {
    document.querySelector('.progress-bar').setAttribute('style', `width: ${width}%`);
  }, [width]);

  const scrollHandler = () => {
    changeColor();
    let body = document.body,
      html = document.documentElement;
    let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const scrollCalc = Math.round((window.scrollY / (height - window.innerHeight)) * 100);
    setWidth(scrollCalc);
  };

  //show the modal - need redux here and in sidebar
  const handleModalVisibility = () => setModalVisible((state) => (state = !state));

  const handleLogOut = async () => {
    try {
      const data = await services.users.logoutUser();
      dispatch(userActions.updateState({ id: null, email: null, profile: null }));
    } catch (err) {
      console.log(err);
    }
  };

  const changeColor = () => {
    //5rem = 80 px ==> size of the navbar
    if (window.scrollY >= 180) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener('scroll', scrollHandler);

  return (
    <>
      <nav className={pathname == '/' ? (color ? 'navContainer nav-color' : 'navContainer') : 'navContainer nav-color'}>
        <div className="nav-center">
          <div className="nav-logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <button type="button" className="nav-toggle" onClick={openSidebar}>
              <FaBars />
            </button>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="link">link1</Link>
            </li>
            <li>
              <Link to="/">link2</Link>
            </li>
          </ul>
          <ul className="nav-links">
            {loggedUser.id == null ? (
              <>
                <li>
                  <Link to="/" id="loginModal" onClick={handleModalVisibility}>
                    log in / log out
                  </Link>
                </li>
                <li>
                  <Link to="profile" id="profile" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <AccountCircleIcon /> Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li style={{ color: 'white', fontWeight: '400' }}>Welcome back {nameToToast.charAt(0).toUpperCase() + nameToToast.slice(1)}</li>
                <li>
                  <Link
                    // to="createUser"
                    id="loginModal"
                    className="sign-up"
                    onClick={handleLogOut}
                  >
                    logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-background">
            <div className="progress-bar"></div>
          </div>
        </div>
      </nav>
      {modalVisible && <LoginSignUpModal closeModal={handleModalVisibility} />}
    </>
  );
};
export default Nav;
