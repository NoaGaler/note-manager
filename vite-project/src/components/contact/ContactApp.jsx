import { useState, useEffect } from 'react'
import Register from './Register'
import Login from './Login'
import './ContactApp.css'


function ContactApp(props) {

  const [authMode, setAuthMode] = useState(null); // null / 'login' / 'register'


  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  const handleLogout = () => {
    if (!props.currentUser) return;
    const usersString = localStorage.getItem('users');
    const users = usersString ? JSON.parse(usersString) : [];
    const updatedUsers = users.map(u =>
      u.name === props.currentUser.name ? props.currentUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    props.setCurrentUser({});
    props.setIsConnected(false);
  };
  if (!props.currentUser || !props.currentUser.name) {
    return (
     
      <div className="auth-container">
  {!authMode && (
    <>
      <h2 className='title'> Welcome 😊</h2>
      <button onClick={() => setAuthMode('login')}>Log In</button>
      <button onClick={() => setAuthMode('register')}>Sign Up</button>
    </>
  )}

  {authMode === 'login' && (
    <>
      <Login onLogin={(user) => {
        props.setCurrentUser(user);
        props.setIsConnected(true);
      }} />
      <button className='back-button' onClick={() => setAuthMode(null)}>⬅ Back</button>
    </>
  )}

  {authMode === 'register' && (
    <>
      <Register onRegister={(user) => {
        props.setCurrentUser(user);
        props.setIsConnected(true);
      }} />
      <button className='back-button' onClick={() => setAuthMode(null)}>⬅ Back</button>
    </>
  )}
</div>

    );
  }

  return (

    <>
      {props.currentUser &&
        <div className='logOutDiv'>
          <button onClick={handleLogout}>Log Out</button>
        </div >}

    </>
  );

}

export default ContactApp;




// import { useState, useEffect } from 'react'
// import Register from './Register'
// import Login from './Login'
// import './ContactApp.css'

// function ContactApp(props) {
//   const users = JSON.parse(localStorage.getItem('users')) || [];


//   const handleLogout = () => {

//     if (!props.currentUser) return;

//     const usersString = localStorage.getItem('users');
//     const users = usersString ? JSON.parse(usersString) : [];

//     const updatedUsers = users.map(u =>
//       u.name === props.currentUser.name ? props.currentUser : u
//     );

//     localStorage.setItem('users', JSON.stringify(updatedUsers));

//     props.setCurrentUser({});
//     props.setIsConnected(false);

//   };

//   if (!props.currentUser || !props.currentUser.name) {
//     return (
//       <div>
//         <Register onRegister={(user) => {
//           props.setCurrentUser(user);
//           props.setIsConnected(true);
//         }
//         } />
//         <Login onLogin={(user) => {
//           props.setCurrentUser(user);
//           props.setIsConnected(true);
//         }
//         } />
//       </div>
//     );
//   }

//   return (

//     <>
//       {props.currentUser &&
//         <div className='logOutDiv'>
//           <button onClick={handleLogout}>התנתקות</button>
//         </div >}

//     </>
//   );

// }

// export default ContactApp;





