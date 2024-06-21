import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/login', formData);
      Cookies.set('token', response.data.token);
      window.location.href = '/profile';
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="uk-container uk-container-small uk-margin-large-top uk-padding-medium">
      <h1 className="uk-text-center">Login</h1>
      <form onSubmit={handleSubmit} className="uk-form-stacked">
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="username">Username</label>
          <div className="uk-form-controls">
            <input className="uk-input" id="username" type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="password">Password</label>
          <div className="uk-form-controls">
            <input className="uk-input" id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
        </div>
        {error && <p className="uk-text-danger">{error}</p>}
        <div className="uk-margin">
          <button type="submit" className="uk-button uk-button-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
