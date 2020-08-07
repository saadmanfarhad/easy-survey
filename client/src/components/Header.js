import React, { Component } from 'react';
import { useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

// class Header extends Component {
const Header = () => {
  const auth = useSelector(state => state.auth);

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
          <>
            <li>
              <Payments />
            </li>
            <li style={{ margin: '0 10px' }}>Credits: {auth.credits}</li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </>
        );
    }
  };

  // render() {
  // console.log(this.props);
  return (
    <nav>
      <div className="row nav-wrapper teal">
        <div className="col s12">
          <Link to={auth ? `/surveys` : `/`} className="brand-logo">
            Easy Survey
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderContent()}
          </ul>
        </div>
      </div>
    </nav>
  );
  // }
};

// function mapStateToProps({ auth }) {
//   return { auth };
// }

// export default connect(mapStateToProps)(Header);
export default Header;
