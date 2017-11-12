import React from 'react';

export default class Message extends React.Component {
  render() {
    return (
      <div className="Message">
        <img className="Message__img" src={this.props.message.profile_image} />
        <div className="Message__body">
          <p className="Message__body__name">@{this.props.message.user_name}</p>
          <p className="Message__body__text">{this.props.message.text}</p>
        </div>
      </div>
    );
  }
}
