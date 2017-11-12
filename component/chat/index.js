import React, { Component } from 'react';
// import './chat.css';
import firebase from '../../firebase';
import Message from './Message';
import ChatBox from './Chatbox'

const firebaseDb = firebase.database();
const messageRef = firebaseDb.ref('messages');

export default class Chat extends Component {
  constructor(props) {
    super(props);

    // method を使えるようにbind
    this.onTextChange = this.onTextChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      text: '',
      user_name: '',
      profile_image: '',
      messages: []
    }
  }

  // 現状のDBの内容の取得とセット
  componentWillMount() {
    messageRef.on(
      'child_added', (snapshot) => {
        const m = snapshot.val();
        let msgs = this.state.messages;

        msgs.push({
          'text': m.text,
          'user_name': m.user_name,
          'profile_image': m.profile_image
        });

        this.setState({
          messages: msgs
        });
      }
    )
  }

  onTextChange(e) {
    // 現状の保持データのアップデート(追加)
    if (e.target.name == 'user_name') {
      this.setState({
        "user_name": e.target.value,
      });
    } else if (e.target.name == 'profile_image') {
      this.setState({
        "profile_image": e.target.value,
      });
    } else if (e.target.name == "text") {
      this.setState({
        "text": e.target.value,
      });
    }
  }

  onButtonClick(e) {
    if (this.state.user_name == "") {
      alert('user_name empty');
      return
    } else if (this.state.text == "") {
      alert('text empty')
      return
    }

    // Submit to firebaseDb
    messageRef.push({
      "user_name": this.state.user_name,
      "profile_image": this.state.profile_image,
      "text": this.state.text
    })
  }

  render() {
    return (
      <div className="Chat">
        <div className="ChatHeader">
          <h2>Chat</h2>
        </div>
        <div className="ChatBody">
          <div className="MessageList">
            {
              this.state.messages.map((m, i) => {
                return <Message key={i} message={m} />
              })
            }
          </div>
          <ChatBox onTextChange={this.onTextChange} onButtonClick={this.onButtonClick} />
        </div>
      </div>
    );
  }
}
