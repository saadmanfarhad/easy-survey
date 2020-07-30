import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="row nav-wrapper">
          <div className="col s12">
            <a href="/" className="brand-logo">
              Easy Survey
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="badges.html">Sign In with Google</a>
              </li>
              <li>
                <a href="collapsible.html">Sign In with Facebook</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
