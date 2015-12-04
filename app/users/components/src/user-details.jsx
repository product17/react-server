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

  renderImage: function (user) {
    console.log(user)
    if (user.user_image && user.user_image.small) {
      return (
        <img className='img-circle img-responsive img-center' alt='user image' src={'/' + user.user_image.small} />
      );
    } else {
      return false;
    }
  },

  render: function() {
    var user = this.state.user ? this.state.user : this.props.user;

    return (
      <div className='col-sm-6 col-sm-offset-3 text-center'>
        {this.renderImage(user)}
        <h4>{user.display_name}</h4>
        {this.fieldRender('bio')}
        <a href={'mailto:' + user.email}>{user.email}</a>
        {this.fieldRender('web_site')}
        {this.fieldRender('twitter')}
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = UserList;
// @endif
