import '../Styles/profileSetup.css';
import ProfileEditIntro from '../Components/ProfileSettings/profileEditIntro';
import SettingsList from '../Components/ProfileSettings/settingsList';

const ProfileSetup = () => {
  return (
    <>
      <div className="profile-settings-container">
        <ProfileEditIntro />
        <SettingsList />
      </div>
    </>
  );
};

export default ProfileSetup;
