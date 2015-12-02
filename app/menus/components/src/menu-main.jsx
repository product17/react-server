// @ifdef IS_NODE
'use strict';

var React     = require('react'),
    _         = require('lodash');
// @endif


var MenuMain = React.createClass({
  getInitialState: function () {
    return {};
  },

  render: function() {
    var menu = this.state.menu ? this.state.menu : this.props.menu;

    return (
      <nav className='navbar'>
        <div className='container'>
          <div className='col-xs-3'>
            <a className='logo pull-left' href={menu.logo.url}>
              <img src={menu.logo.img_url} alt={menu.logo.alt_text} />
            </a>
          </div>

          <div className='col-xs-6'>
            <h1 className='text-center breadcrumb-loc'>
              <a className='home-loc' href={menu.breadcrumb.home.url}>{menu.breadcrumb.home.text}</a> | <span className='current-loc'>{menu.breadcrumb.current.text}</span>
            </h1>
          </div>

          <div className='col-xs-3 topics'>
            <h3 className='topic-label text-right'>{menu.topics.label} <i className='fa fa-bars'></i></h3>
          </div>
        </div>
      </nav>
    );
  },
});

// @ifdef IS_NODE
module.exports = MenuMain;
// @endif