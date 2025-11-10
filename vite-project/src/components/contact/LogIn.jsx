import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.name === username);
    if (!user) {
      alert('שם המשתמש לא קיים');
      return;
    }

    alert('התחברת בהצלחה!');
    onLogin(user);
  };

  return (
    <div className="auth-container">
      <h2 className='title'>Log In</h2>
      <input
        type="text"
        placeholder="user name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;




// import { useState } from 'react';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     const users = JSON.parse(localStorage.getItem('users')) || {};
//     if (!users[username]) {
//       alert('שם המשתמש לא קיים');
//       return;
//     }

//     if (users[username].password !== password) {
//       alert('סיסמה שגויה');
//       return;
//     }

//     alert('התחברת בהצלחה!');
//     localStorage.setItem('currentUser', username);
//     onLogin(username);
//   };

//   return (
//     <div className="auth-container">
//       <h2>התחברות</h2>
//       <input
//         type="text"
//         placeholder="שם משתמש"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="סיסמה"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>התחברות</button>
//     </div>
//   );
// };

// export default Login;
