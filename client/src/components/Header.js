import React, { Component } from 'react';
import { useSelector, connect } from 'react-redux';

// class Header extends Component {
const Header = () => {
  const auth = useSelector(state => state.auth);
  console.log(auth);

  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <>
            <li>
              <a href="/auth/google">Sign In with Google</a>
            </li>
            <li>
              <a href="/auth/facebook">Sign In with Facebook</a>
            </li>
          </>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  // render() {
    // console.log(this.props);
    return (
      <nav>
        <div className="row nav-wrapper">
          <div className="col s12">
            <a href="/" className="brand-logo">
              Easy Survey
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {renderContent()}
            </ul>
          </div>
        </div>
      </nav>
    );
  // }
}

// function mapStateToProps({ auth }) {
//   return { auth };
// }

// export default connect(mapStateToProps)(Header);
export default Header;
