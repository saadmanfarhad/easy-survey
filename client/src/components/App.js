import React, { Component, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

// class App extends Component {
//   // useEffect(() => {
//   //   this.props.fetchUser();
//   // });
//   componentDidMount() {
//     console.log('Did mount');
//     this.props.fetchUser();
//   }
//
//   render() {
//     return (
//       <div className="container">
//         <BrowserRouter>
//           <div>
//             <Header />
//             <Route exact path="/" component={Landing} />
//             <Route exact path="/surveys" component={Dashboard} />
//             <Route path="/surveys/new" component={SurveyNew} />
//           </div>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchUser());
  }, [dispatch]);

  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App;


// export default connect(
//   null,
//   actions
// )(App);
