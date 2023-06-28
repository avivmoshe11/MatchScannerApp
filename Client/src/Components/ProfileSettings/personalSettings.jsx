import Input from '../Common/Input';

const PersonalSettings = () => {
  return (
    <>
      <form method="post" className="settings-form">
        <div className="container-settings">
          <span className="username-set label-input">Username: </span>
          <Input />
        </div>
        <div className="container-settings">
          <span className="fullname-set label-input">Full name: </span>
          <Input />
        </div>
        <div className="container-settings">
          <span className="age-set label-input">Age: </span>
          <Input />
        </div>
        <div className="container-settings">
          <span className="country-set label-input">Country: </span>
          <Input />
        </div>
      </form>
    </>
  );
};

export default PersonalSettings;
