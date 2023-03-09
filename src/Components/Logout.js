import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('selectedClient');
    navigate('/');
  };

  return (
    <div>
      <h1>
        <span className='user_name'> </span>
        <button
          style={{
            position: 'absolute',
            top: 22,
            right: 10,
            color: 'white',
            backgroundColor: 'black',
            padding: '0px 0px',
            borderRadius: '5px',
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </h1>
    </div>
  );
};

export default Logout;
