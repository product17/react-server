var isNode = typeof module !== 'undefined' && module.exports,
    React = isNode ? require('react') : window.React,
    ReactDOM = isNode ? require('react') : window.ReactDOM;

/*if (isNode) {
  var _             = require('lodash'),
      UserFragmnet  = require('./user-fragment').UserFragmnet;
}*/

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

if (isNode) {
  exports.UserList = UserList;
} else {
  console.log(client_data);
  /*ReactDOM.render(<UserList users={client_data.users} />, document.getElementById('react-root'));*/
}
