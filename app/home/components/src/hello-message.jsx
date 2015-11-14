var isNode = typeof module !== 'undefined' && module.exports,
    React = isNode ? require('react') : window.React,
    ReactDOM = isNode ? require('react') : window.ReactDOM;

var HelloMessage = React.createClass({
  getInitialState: function () {
    return {};
  },

  handleClick: function () {
    alert('You clicked!');
  },

  render: function() {
    var name = this.state.name ? this.state.name : this.props.name;
    return <div onClick={this.handleClick}>Hello {name}</div>;
  },
});

if (isNode) {
  exports.HelloMessage = HelloMessage;
} else {
  ReactDOM.render(<HelloMessage name={init_data.name} />, document.getElementById('react-root'));
}