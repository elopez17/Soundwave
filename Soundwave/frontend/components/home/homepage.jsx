import React from 'react';
import { Link } from 'react-router-dom';

class Homepage extends React.Component {
  constructor(props){
    super(props);
    this.state = {id: null};
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentDidMount(){
    let slideIndex = 0;

    const carousel = () => {
      let i;
      let x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > x.length) {slideIndex = 1}
      x[slideIndex-1].style.display = "block";
      this.setState({id: setTimeout(carousel, 5000)}); // Change image every 2 seconds
    }
    carousel();
  }

  componentWillUnmount(){
    clearTimeout(this.state.id);
  }

  handleDemo(){
    this.props.login({
      email: 'demo@demo.com',
      username: 'demo',
      password: 'password123'
    }).then((res) => this.props.history.push(`/users/${res.user.id}`));
  }

  render() {
    return (
        <div className="homepage-content">
          <img className="mySlides w3-animate-right" src="/intro_pic_2.jpg" />
          <img className="mySlides w3-animate-right" src="/intro_pic_1.jpg" />
          <Link className="homepage-logo" to='/'><h4>SOUNDWAVE</h4></Link>
          <div className="homepage-signin">
            <button className="homepage-signin-btn" onClick={() => this.props.openModal({modal: 'signin', email: ''})}>Sign in</button>
            <button className="homepage-create-btn" onClick={() => this.props.openModal({modal: 'signup', email: ''})}>Create account</button>
            <button className="homepage-demo-btn" onClick={this.handleDemo}>Demo</button>
          </div>
        </div>
    );
  }
}

export default Homepage;
