import { useState } from 'react';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!username || !password) {
      alert('נא למלא שם משתמש וסיסמה');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.name === username)) {
      alert('שם המשתמש כבר קיים');
      return;
    }

    const newUser = { name: username, notes: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('נרשמת בהצלחה!');
    onRegister(newUser);
  };

  return (
    <div className="auth-container">
      <h2 className='title'>Sign Up</h2>
      <input
        type="text"
        placeholder="user name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Sign Up</button>
    </div>
  );
};

export default Register;



// import { useState } from 'react';

// const Register = ({ onRegister }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = () => {
//     if (!username || !password) {
//       alert('נא למלא שם משתמש וסיסמה');
//       return;
//     }

//     const users = JSON.parse(localStorage.getItem('users')) || {};
//     if (users[username]) {
//       alert('שם המשתמש כבר קיים');
//       return;
//     }

//     users[username] = { password };
//     localStorage.setItem('users', JSON.stringify(users));

//     alert('נרשמת בהצלחה!');
//     onRegister(username);
//   };

//   return (
//     <div className="auth-container">
//       <h2>הרשמה</h2>
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
//       <button onClick={handleRegister}>הרשמה</button>
//     </div>
//   );
// };

// export default Register;
