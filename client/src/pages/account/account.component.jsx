import React, { useState, useContext, useEffect } from 'react';

import './account.styles.scss';
import { createUser, signinUser } from '../../services/users';
import { UserContext } from '../../contexts/user.context';
import { ThemeContext } from '../../contexts/theme.context';


const Account = ({
  setShowModal,
  showModal,
  setLoggedIn,
  setSignedUp,
  setLoggedOut
}) => {
  const { user, setUser } = useContext(UserContext);
  const [signingUp, setSigningUp] = useState(false);

  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const [newInput, setNewInput] = useState({
    fullName: '',
    email: '',
    password: '',
    categories: ['Favorites']
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
    setSigningUp(!signingUp);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUser(newInput);
      setSignedUp(true);
      setLoggedIn(true);
      setShowModal(!showModal);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await signinUser(input);
      setUser(response);
      setLoggedIn(true);
      setShowModal(!showModal);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = (e) => {
    if (e.target.className === 'mod-container') {
      setShowModal(false);
    }
  };

  const close = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem('jwt-token', null);
    setLoggedOut(true);
    setShowModal(!showModal);
  };
  const { theme } = useContext(ThemeContext);

  return (
    <div className='mod-container' onClick={closeModal}>
      {!user && (
        <>
          <div style={{ background: theme.snacks }} className='forms'>
            <div className='no-account'>
              <p>No account?</p>
            </div>
            <button style={{ background: theme.loginBtn }} onClick={handleSignup} className='signup-button'>
              SIGNUP
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
                <button style={{ background: theme.loginBtn }} className='login'>REGISTER</button>
              </form>
            )}

            <form onSubmit={handleSignin}>
              <input
                name='email'
                placeholder='email'
                type='text'
                disabled={signingUp}
                value={input.email}
                onChange={handleChange}
              />
              <input
                name='password'
                placeholder='password'
                type='password'
                disabled={signingUp}
                value={input.password}
                onChange={handleChange}
              />

              <button style={{ background: theme.loginBtn }} disabled={signingUp} className='login'>
                LOGIN
              </button>
            </form>
          </div>
        </>
      )}
      {user && (
        <div style={{ background: theme.background }} className='forms'>
          <button  style={{ background: theme.loginBtn }} className='logout' onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
