// @ifdef IS_NODE
var React         = require('react'),
    _             = require('lodash');
// @endif

var UserList = React.createClass({

  getInitialState: function () {
    return {};
  },

  fieldRender: function (propName) {
    
    var display = (propName.charAt(0).toUpperCase() + propName.slice(1)).replace(/_/g, ' ');

    if (this.props.user[propName]) {
      return (
        <p>{display}: {this.props.user[propName]}</p>
      );
    }
    return false;
  },

  render: function() {
    var user = this.state.user ? this.state.user : this.props.user;


    return (
      <div className='col-sm-6 col-sm-offset-3 text-center'>
        <img className='img-circle img-responsive text-center' alt='user image' src={'/' + user.user_image.link} />
        <h4>Name: {user.display_name}</h4>
        <p>Email: {user.email}</p>
        {this.fieldRender('web_site')}
        {this.fieldRender('twitter')}
        {this.fieldRender('bio')}
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = UserList;
// @endif
