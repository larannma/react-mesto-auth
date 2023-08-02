import * as Auth from '../Auth.js';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

function Login () {
	const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        // нужно проверить, есть ли у данных JWT
        // сбросьте стейт, затем в колбэке установите
        // стейт loggedIn родительского App как true,
        // затем перенаправьте его в /diary
      })
      .catch(err => console.log(err));
  }
	
	return (
		<section className="login root_section">
			<h2 className="login__title">Вход</h2>
			<form className="login__form">
				<div className="login__properies">
					<input onChange={handleChange} value={formValue.email} className="login__text" id="email-input" name="email" placeholder="Email" type="email"></input>
					<input onChange={handleChange} value={formValue.password} className="login__text" id="password-input" name="password" placeholder="Пароль" type="text"></input>
				</div>
				<button onClick={handleSubmit} type="submit" className="login__button">Войти</button>
			</form>
    </section>
    )
}

export default Login;