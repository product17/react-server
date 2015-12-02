var isNode = typeof module !== 'undefined' && module.exports,
    React = isNode ? require('react') : window.React,
    ReactDOM = isNode ? require('react') : window.ReactDOM;

if (isNode) {
  var _       = require('lodash'),
      TopLink = require('./top-link').TopLink;
}


var TopMenu = React.createClass({
  getInitialState: function () {
    return {};
  },

  render: function() {
    var links = this.state.links ? this.state.links : this.props.links;
    var logo = this.state.logo ? this.state.logo : this.props.logo;
    var user = this.state.user ? this.state.user : this.props.user;

    var link_list = _.map(links, function (item, i) {
      return <TopLink key={i} link={item} />
    });

    return (
      <nav className='navbar'>
        <div className='container-fluid'>
          <a className='logo pull-left' href='/'>
            <img src={logo.url} />
          </a>
          <ul className='nav navbar-nav'>
            {link_list}
          </ul>
          <p>{user.display_name}</p>
        </div>
      </nav>
    );
  },
});

if (isNode) {
  exports.TopMenu = TopMenu;
} else {
  // ReactDOM.render(<TopMenu links={init_data.menu_links} />, document.getElementById('react-menu'));
}
