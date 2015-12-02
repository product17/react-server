// @ifdef IS_NODE
var React         = require('react'),
    _             = require('lodash');
// @endif

var UserList = React.createClass({
  getInitialState: function () {
    return {};
  },

  renderUser: function (user, key) {
    return (
      <div className='well'>
        <h4>Name: {user.display_name}</h4>
        <p>Email: {user.email}</p>
        <a href={'/author/details/' + user._id}>Details</a>
      </div>
    );
  },

  render: function() {
    var user_list = this.state.user_list ? this.state.user_list : this.props.user_list;

    var users = _.map(user_list, this.renderUser);

    return (
      <div className='col-sm-6 col-sm-offset-3'>
        {users}
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = UserList;
// @endif
