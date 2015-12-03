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

  renderImage: function () {
    if (user.user_image.link) {
      return (
        <img className='img-circle img-responsive text-center' alt='user image' src={'/' + user.user_image.link} />
      );
    } else {
      return false;
    }
  },

  render: function() {
    var user = this.state.user ? this.state.user : this.props.user;

    return (
      <div className='col-sm-6 col-sm-offset-3 text-center'>
        {renderImage()}
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
