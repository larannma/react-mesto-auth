function Login () {
	return (
		<section className="login root_section">
			<h2 className="login__title">Вход</h2>
			<form className="login__form">
				<div className="login__properies">
					<input className="login__text" id="email-input" name="email" placeholder="Email" type="email"></input>
					<input className="login__text" id="password-input" name="password" placeholder="Пароль" type="text"></input>
				</div>
				<button className="login__button">Войти</button>
			</form>
    </section>
    )
}

export default Login;