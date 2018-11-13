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
    let slides = document.getElementsByClassName("mySlides");
    let slideTexts = document.getElementsByClassName("slideText");

    const carousel = () => {
      let i;
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slideTexts[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex = 1}
      slides[slideIndex-1].style.display = "block";
      slideTexts[slideIndex-1].style.display = "block";
      this.setState({id: setTimeout(carousel, 6000)});
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
      <div id="homepage-container">
        <div className="homepage-content">
          <img className="mySlides w3-animate-right" src="/intro_pic_2.jpg" />
          <img className="mySlides w3-animate-right" src="/intro_pic_1.jpg" />
          <Link className="homepage-logo" to='/'><h4>SOUNDWAVE</h4></Link>
          <div className="homepage-signin">
            <button className="homepage-signin-btn" onClick={() => this.props.openModal({modal: 'signin', email: ''})}>Sign in</button>
            <button className="homepage-create-btn" onClick={() => this.props.openModal({modal: 'signup', email: ''})}>Create account</button>
            <button className="homepage-demo-btn" onClick={this.handleDemo}>Demo</button>
          </div>
          <p className="slideText"><h1>What's next in music is first on Soundwave</h1>
Post your first track and launch your career as an artist. Soundwave is a<br></br>
platform where you can create, grow your audience, and make connections with other<br></br>
artists.</p>
          <p className="slideText"><h1>Discover more with Soundwave</h1>
            Soundwave lets you listen to a variety of genres<br></br>
            The library of music is growing, contribute and share your music here!<br></br></p>
        </div>
      </div>
    );
  }
}

export default Homepage;
