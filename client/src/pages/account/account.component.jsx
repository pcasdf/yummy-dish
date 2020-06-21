import React, { useState, useContext, useEffect } from 'react';
import { createUser, signinUser } from '../../services/users';
import './account.styles.scss';
import { UserContext } from '../../contexts/user.context';

const Account = ({setShowModal, showModal}) => {
  const { user, setUser } = useContext(UserContext);

  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const [newInput, setNewInput] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [signup, setSignup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewInput({ ...newInput, [name]: value });
  };

  const handleSignup = () => {
    setSignup(!signup);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUser(newInput);
      console.log(user);
      setShowModal(!showModal)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const user = await signinUser(input);
      console.log(user);
      setUser(user);
      setShowModal(!showModal)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='forms'>
      <div className='no-account'>
        <p>No account?</p>
      </div>
      <button onClick={handleSignup} className='signup-button'>
        Signup
      </button>

      {signup && (
        <form onSubmit={handleSignupSubmit}>
          <input
            name='fullName'
            placeholder='Your name'
            type='text'
            value={newInput.fullName}
            onChange={handleNewChange}
          />
          <input
            name='email'
            placeholder='email'
            type='text'
            value={newInput.email}
            onChange={handleNewChange}
          />
          <input
            name='password'
            placeholder='password'
            type='password'
            value={newInput.password}
            onChange={handleNewChange}
          />
          <button className='login'>Signup</button>
        </form>
      )}

      <form onSubmit={handleSignin}>
        <input
          name='email'
          placeholder='email'
          type='text'
          value={input.email}
          onChange={handleChange}
        />
        <input
          name='password'
          placeholder='password'
          type='password'
          value={input.password}
          onChange={handleChange}
        />
        <button className='login'>Login</button>
      </form>
    </div>
  );
};

export default Account;
