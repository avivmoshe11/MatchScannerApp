import '../Styles/createUser.css';

const CreateUser = () => {
  return (
    <div className="createUser-container">
      <h2> create new account</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" />
        </div>
        <button className="btn-user btn" type="submit">
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
