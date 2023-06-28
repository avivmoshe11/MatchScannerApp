import '../Styles/home.css';
import { Link } from 'react-router-dom';
import SupportedGames from '../Components/Home/supportedGames';
import LiveStats from '../Components/Home/liveStats';

const Home = () => {
  return (
    <div className="homepage">
      <div className="full-screen-section hero">
        <div className="hero-banner">
          <h1>home page</h1>
          <p>video here soon....</p>
          <Link to="link" type="button" className="btn home-btn">
            btn
          </Link>
        </div>
      </div>
      <div className="full-screen-section images-section">
        <SupportedGames />
      </div>
      <div className="full-screen-section live-stats-section">
        <LiveStats />
      </div>
    </div>
  );
};

export default Home;
