import React, {Component} from 'react';

import { ExcercisesContext } from '../contexts/ExcercisesContext';

class Workout extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return 'hi me';
  }
} 

export default props => (
  <ExcercisesContext.Consumer>
    {contextProps => <Workout {...props} {...contextProps} />}
  </ExcercisesContext.Consumer>
);