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

    var link_list = _.map(links, function (item, i) {
      return <TopLink key={i} link={item} />
    });

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <ul className='nav navbar-nav'>
            {link_list}
          </ul>
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