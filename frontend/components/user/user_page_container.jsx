import React from 'react';
import { connect } from 'react-redux';

const msp = (state) => ({});

const mdp = (dispatch) => ({});

class UserPageContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div className="user-show-page">
        USERPAGE

      </div>
    );
  }

}

export default connect(msp,mdp)(UserPageContainer);
