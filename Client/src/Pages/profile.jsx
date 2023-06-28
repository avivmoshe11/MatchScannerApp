import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import services from '../Services/index';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  const handleProfileFetch = async () => {
    try {
      const data = await services.profiles.getProfileById(id);
      if (!data.error) setProfile(data.profile);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleProfileFetch();
  }, []);

  console.log(profile);
  return (
    <>
      <span>PROFILE SOON</span>
    </>
  );
};

export default Profile;
