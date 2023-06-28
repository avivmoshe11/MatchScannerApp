import { useState } from 'react';
import '../../Styles/loginModal.css';
import '../../index.css';
import Joi from 'joi';
import { ReactComponent as Loader } from '../../Assets/images/loader.svg';
import { useDispatch } from 'react-redux';
import { userActions } from '../../Store/user-slice';
import { toast } from 'react-toastify';
import Input from '../Common/Input';
import services from '../../Services/index';
import functions from '../../Assets/functions/index';

const SignUpForm = ({ formHeaderText, buttonText, closeModal }) => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validate = (credentials) => {
    const schema = Joi.object({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(1024).required()
    });
    return schema.validate(credentials);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputs = e.target;
    const body = { email: inputs[0].value, password: inputs[1].value };
    const { error } = validate(body);

    if (error) {
      const errorsArr = [];
      for (const detail of error.details) {
        errorsArr.push(detail.message);
      }
      setErrors(errorsArr);
      setLoading(false);
      return;
    } else {
      setErrors([]);
    }

    try {
      let profileData = services.profiles.getProfileFromCookies();
      if (!profileData) {
        do {
          profileData = await services.profiles.createProfile({ userName: functions.generateGuestName() });
        } while (!profileData.profile);
        profileData = profileData.profile.id;
      }
      body['profile'] = profileData;
      const data = await services.users.createUser(body);
      if (data.error) {
        setErrors([data.error]);
        setLoading(false);
        return;
      }
      delete body['profile'];
      await services.users.loginUser(body);
      const user = await services.users.getUser();
      if (user) dispatch(userActions.updateState(user));
      const nameToToast = user.email.split('@')[0];
      toast(`Hey ${nameToToast.charAt(0).toUpperCase() + nameToToast.slice(1)}, good to see you 😎`);
      setLoading(false);
      closeModal();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signup-form ">
        <h3>{formHeaderText}</h3>
        <form noValidate onSubmit={submitForm}>
          <div className="inputs">
            <div className="inputBox">
              <Input type="text" required={true} />
              <span>Email</span>
              <i></i>
            </div>
            <div className="inputBox">
              <Input type="password" required={true} />
              <span>Password</span>
              <i></i>
            </div>
          </div>
          <button type="submit">{loading ? <Loader className="spinner" /> : buttonText}</button>
          {errors.length > 0 && (
            <div className="error">
              <span>{errors[0].replaceAll('"', '')}</span>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
