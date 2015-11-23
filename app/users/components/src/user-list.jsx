// @ifdef IS_NODE
var UserFragmnet  = require('./user-fragment').UserFragmnet,
    React         = require('react'),
    _             = require('lodash');
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
module.exports = UserList;
// @endif
