import { useState } from 'react';
import '../../Styles/loginModal.css';
import LoginForm from './loginForm';
import SignUpForm from './signupForm';

const LoginSignUpModal = ({ closeModal }) => {
  const [signupVis, setSignupVis] = useState(true);

  const [formHeaderText, setFormHeaderText] = useState('Create Account');
  const [buttonText, setButtonText] = useState('Sign Up');

  const handleFormsSwap = () => {
    if (signupVis) {
      setTimeout(() => setFormHeaderText('Sign in'), 250);
      setTimeout(() => setButtonText('Sign In'), 250);
    } else {
      setTimeout(() => setFormHeaderText('Create Account'), 250);
      setTimeout(() => setButtonText('Sign Up'), 250);
    }
    setSignupVis(!signupVis);
  };

  return (
    <>
      <div className="blur-bg" onClick={closeModal}></div>
      <div className="loginModal">
        {/* the fix: */}
        <div className={signupVis ? 'modal-data ' : 'modal-data'}>
          <div className={signupVis ? 'rtContainer revert-a ' : 'rtContainer '}>
            <div className="rotating-message ">
              {signupVis && (
                <>
                  <h3>Welcome Back!</h3>
                  <h5>
                    Already have an account?
                    <br /> Well just sign back in!
                  </h5>
                  <button onClick={handleFormsSwap}>Sign In</button>
                </>
              )}
              {!signupVis && (
                <>
                  <h3>Hello, Friend!</h3>
                  <h5>We highly recommend you signing up to unlock the full experience!</h5>
                  <button onClick={handleFormsSwap}>Sign Up</button>
                </>
              )}
            </div>
          </div>
          <div className={signupVis ? 'signup-form revert-b' : 'signup-form'}>
            {signupVis && <SignUpForm formHeaderText={formHeaderText} buttonText={buttonText} closeModal={closeModal} />}

            {!signupVis && <LoginForm formHeaderText={formHeaderText} buttonText={buttonText} closeModal={closeModal} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUpModal;
