// @ifdef IS_NODE
var React         = require('react'),
    _             = require('lodash');
// @endif

var UserList = React.createClass({

  getInitialState: function () {
    return {};
  },

  render: function() {
    var user = this.state.user ? this.state.user : this.props.user;

    return (
      <div className='col-sm-6 col-sm-offset-3'>
        <div className='well'>
          <h4>Name: {user.display_name}</h4>
          <p>Email: {user.email}</p>
          <a href={'/user/edit/' + user._id}></a>
        </div>
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = UserList;
// @endif
