var isNode = typeof module !== 'undefined' && module.exports,
    React = isNode ? require('react') : window.React,
    ReactDOM = isNode ? require('react') : window.ReactDOM;

// @ifdef IS_NODE
if (isNode) {
  var UserFragmnet  = require('./user-fragment').UserFragmnet,
      _             = require('lodash');
}
// @endif

var UserList = React.createClass({
  getInitialState: function () {
    return {};
  },

  render: function() {
    var users = this.state.users ? this.state.users : this.props.users;

    return (
      <div>{users}</div>
    );
  },
});


// @ifdef IS_NODE
exports.UserList = UserList;
// @endif
