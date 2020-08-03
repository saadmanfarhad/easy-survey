import React, { Component, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
const Landing = () => <h2>Landing</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

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
