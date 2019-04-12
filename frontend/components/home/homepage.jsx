import React from 'react';
import { Link } from 'react-router-dom';
import HomepageSongs from './homepage_songs';
import SearchBar from '../search_bar';

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
        slideTexts[i % 2].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex = 1}
      slides[slideIndex-1].style.display = "block";
      slideTexts[(slideIndex-1) % 2].style.display = "block";
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
          <span className="mySlides w3-animate-right">
            <img src="/intro_pic_2.jpg" height="450" style={{display:"inline"}} width="60%" />
            <img src="/jazz-blues.jpeg" height="450" style={{ display: "inline" }} width="40%" />
          </span>
          <span className="mySlides w3-animate-right">
            <img src="/intro_pic_1.jpg" height="450" style={{ display: "inline" }} width="45%" />
            <img src="/band.jpeg" height="450" style={{ display: "inline" }} width="55%" />
          </span>

          <Link className="homepage-logo text" to="/">
            <h4>SOUNDWAVE</h4>
          </Link>
          <div className="homepage-signin text">
            <button className="homepage-signin-btn"
                onClick={() => this.props.openModal({ modal: "signin", email: "" })}>
              Sign in
            </button>
            <button className="homepage-create-btn"
                onClick={() => this.props.openModal({ modal: "signup", email: "" })}>
              Create account
            </button>
            <button className="homepage-demo-btn" onClick={this.handleDemo}>
              Demo
            </button>
          </div>
          <div className="slideText">
            <h1>What's next in music is first on Soundwave</h1>
            Post your first track and launch your career as an artist.
            Soundwave is a<br />
            platform where you can create, grow your audience, and make
            connections with other
            <br />
            artists.
          </div>
          <div className="slideText">
            <h1>Discover more with Soundwave</h1>
            Soundwave lets you listen to a variety of genres
            <br />
            The library of music is growing, contribute and share your music
            here!
            <br />
          </div>
        </div>
        <img
          className="search__icon homepage--search--icon"
          src="/sprite-sheet.png" />
        <SearchBar className="homepage-search-bar" />
        <div className="homepage__songs__title">
          Hear the best from the Soundwave community
        </div>
        <HomepageSongs />
      </div>
    );
  }
}

export default Homepage;
