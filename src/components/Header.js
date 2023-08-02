function Header (props) {
    return (
      <header className="header root__section">
        <img src={props.logo} alt="Логатип проекта" className="header__logo"/>
        <a href="/sign-up" className="header__direction">Регистрация</a>
      </header>
    );
}

export default Header;