import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  receiveSongErrors,
  clearSongErrors
} from '../../actions/song_actions';

const mapStateToProps = state => ({
  sessionId: state.session.id,
  errors: state.errors.songs,
});

const mapDispatchToProps = dispatch => ({
  receiveSongErrors: errors => dispatch(receiveSongErrors(errors)),
  clearSongErrors: () => dispatch(clearSongErrors())
});

class SongUploadContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      genre: null,
      photo: null,
      photoURL: null,
      audio: null,
    };
    this.fileInput = React.createRef();
    this.uploadBox = React.createRef();
    this.getFile = this.getFile.bind(this);
    this.clickInput = this.clickInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  photoErrors(){
    if (this.props.errors.photo) {
      return <div className="song_photo_errors">{this.props.errors.photo}</div>
    } else {
      return null;
    }
  }

  titleErrors(){
    if (this.props.errors.name) {
      return <div className="song_title_errors">{this.props.errors.name}</div>;
    } else {
      return null;
    }
  }

  genreErrors(){
    if (this.props.errors.genre) {
      return <div className="song_genre_errors">{this.props.errors.genre}</div>;
    } else {
      return null;
    }
  }

  getFile(e){
    e.stopPropagation();
    const file = e.currentTarget.files[0];
    if (file){
      if (file.type === "audio/mp3") {
        let name = file.name;
        if (name.endsWith(".mp3")){
          name = name.slice(0, name.length - 4);
        }
        this.setState({ audio: file, name: name });
      } else if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.onloadend = () => (
          this.setState({
            photoURL: reader.result,
            photo: file
          })
        );
        reader.readAsDataURL(file);
      }
    }
  }

  clickInput(e){
    e.stopPropagation();
    this.fileInput.current.click();
  }

  handleChange(field){
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleCancel() {
    this.setState({
      name: "",
      genre: null,
      photo: null,
      photoURL: null,
      audio: null
    });
  }

  handleSubmit(){
    let errors = {};
    let flag = false;

    if (this.state.name.length < 1) {
      errors.name = "Enter a title";
      flag = true;
    }
    if (!this.state.genre || this.state.genre === "blank") {
      errors.genre = "Select a genre";
      flag = true;
    }
    if (!this.state.photo) {
      errors.photo = "Upload a photo";
      flag = true;
    }
    if (flag) {
      this.props.receiveSongErrors(errors);
      return;
    } else {
      this.props.clearSongErrors();
    }
    const formData = new FormData();
    formData.append('song[user_id]', this.props.sessionId);
    formData.append('song[name]', this.state.name);
    formData.append('song[genre]', this.state.genre);
    formData.append('song[photo]', this.state.photo);
    formData.append('song[audio]', this.state.audio);
    $.ajax({
      url: `/api/songs`,
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false
    }).then(() => this.props.history.push(`/users/${this.props.sessionId}`));
  }

  songPhoto(){
    if (this.state.photoURL){
      let style = {
        width: "100%",
        height: "100%",
        position: "relative",
        bottom: "16px"
      };
      return <img style={style} src={this.state.photoURL} />;
    }
    return null;
  }

  renderSongForm(){
    if (this.state.audio) {
      this.uploadBox.current.style.margin = "50px auto"
      return (
      <div className="song_form text">
        <div className="blue_bar"></div><div className="orange_bar"></div>
        <div className="song_basic_info">Basic info</div>
        <div className="song_form_grid">
          <div className="song_form_img">
            <label className="song_form_upload_img">Upload image <span style={{color:"#f50"}}>*</span>
              <input onChange={this.getFile} type="file" style={{ display:'none'}} accept="image/*" />
            </label>
            {this.songPhoto()}
          </div>
          {this.photoErrors()}
          <div className="song_form_title">Title <span style={{color:"#f50"}}>*</span></div>
          <input className="song_form_input" onChange={this.handleChange("name")} type="text" value={this.state.name}/>
          {this.titleErrors()}
          <div className="song_form_genre">Genre <span style={{color:"#f50"}}>*</span></div>
          <select className="song_form_select" onChange={this.handleChange("genre")}>
            <option value="blank">---</option>
            <option value="blues">Blues</option>
            <option value="electronic">Electronic</option>
            <option value="hip-hop">Hip-Hop</option>
            <option value="jazz">Jazz</option>
            <option value="lo-fi">Lo-Fi</option>
            <option value="piano">Piano</option>
            <option value="pop">Pop</option>
            <option value="rap">Rap</option>
            <option value="rock">Rock</option>
            <option value="r&b">R&B</option>
          </select>
          {this.genreErrors()}
        </div>
        <div className="song_form_end">
          <div className="song_form_required"><span style={{ color: "#f50" }}>*</span> Required fields</div>
          <div className="song_form_cancel" onClick={this.handleCancel}>Cancel</div>
          <div className="song_form_save" onClick={this.handleSubmit}>Save</div>
        </div>
      </div>);
    } else {
      return null;
    }
  }

  render(){
    return (
    <div className="song_upload_page">
      <div ref={this.uploadBox} className="upload_box">
        <img className="soundwave_img" src="/soundwave.png"/>
        <div className="upload_text text">Supported file type: mp3</div>
        <div onClick={this.clickInput} className="upload_btn text">choose file to upload
          <input ref={this.fileInput} onChange={this.getFile} type="file" style={{display:'none'}} accept="audio/mp3" />
        </div>
      </div>
      {this.renderSongForm()}
    </div>);
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongUploadContainer));