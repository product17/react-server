var isNode = typeof module !== 'undefined' && module.exports,
    React = isNode ? require('react') : window.React,
    ReactDOM = isNode ? require('react') : window.ReactDOM;

var HelloMessage = React.createClass({
  getInitialState: function () {
    return {};
  },

  render: function() {
    var user = this.state.user ? this.state.user : this.props.user;
    return <div onClick={this.handleClick}>Hello {user.name}</div>;
  },
});

if (isNode) {
  exports.HelloMessage = HelloMessage;
} else {
  ReactDOM.render(<HelloMessage name={init_data.name} />, document.getElementById('react-root'));
}
