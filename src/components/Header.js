function Header (props) {
    return (
      <header className="header root__section">
        <img src={props.logo} alt="Логатип проекта" className="header__logo"/>
      </header>
    );
}

export default Header;