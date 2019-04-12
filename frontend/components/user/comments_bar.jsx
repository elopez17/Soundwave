import React from 'react';
import { connect } from 'react-redux';
import {
  fetchCommentsFromSong,
  postComment
} from '../../actions/comment_actions';
import { fetchUsers } from '../../actions/user_actions';

const mapStateToProps = (state) => ({
  comments: state.entities.comments,
  users: state.entities.users,
  player: state.ui.player,
  sessionId: state.session.id,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCommentsFromSong: (songId) => dispatch(fetchCommentsFromSong(songId)),
  fetchUsers: (userIds) => dispatch(fetchUsers(userIds)),
  postComment: (comment) => dispatch(postComment(comment)),
});

class CommentsBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      body: ""
    };
    this.getComment = this.getComment.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this._isMounted = false;
  }

  componentDidMount(){
    this._isMounted = true;
    this.updateComments();
  }
  
  componentWillUnmount(){
    this._isMounted = false;
  }

  updateComments(){
    this.props.fetchCommentsFromSong(this.props.songId)
      .then(res => {
        let userIds = [];
        let id = null;
        for (let i = 0; i < this.props.commentIds.length; i++) {
          id = this.props.commentIds[i];
          if (!this.props.users[res.comments[id].user_id]) {
            userIds.push(res.comments[id].user_id);
          }
        }
        if (userIds.length > 0) {
          this.props.fetchUsers(userIds);
        }
      });
  }

  findComment(second){
    let result = {author: null, body: null}
    let ids = this.props.commentIds;
    let comments = this.props.comments;

    for (let i = 0; i < ids.length; i++){
      if (!comments[ids[i]]) {
        continue;
      }
      if (comments[ids[i]].song_timestamp > second) {
        return result;
      }
      if (comments[ids[i]].song_timestamp > (second - 5)) {
        result.author = this.props.users[comments[ids[i]].user_id].username;
        result.body = comments[ids[i]].body;
      }
    }
    return result;
  }

  getComment(e){
    this.setState({ body: e.target.value });
  }

  keyPress(time){
    return (e) => {
      if (e.keyCode === 13 && this.state.body.length > 0){
        let comment = {
          body: this.state.body,
          user_id: this.props.sessionId,
          song_id: this.props.songId,
          song_timestamp: time
        };
        this.props.postComment(comment).then(res => this.updateComments())
        this.setState({body: ""});
      }
    };
  }

  render(){
    if (this.props.playing === false || !this._isMounted){
      return null;
    }
    let second = this.props.player.played * this.props.player.duration;
    let comment = this.findComment(second);
    return (
    <div className="comments_bar">
     <span className="comments_bar_author text">{comment.author}</span>
     <span className="comments_bar_body text">{comment.body}</span>
     <div className="comments_bar_input_background">
      <span className="comments_bar_square"></span>
      <input className="comments_bar_input" onKeyDown={this.keyPress(second)} onChange={this.getComment} type="text" placeholder="Write a comment" value={this.state.body} />
     </div>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsBar);