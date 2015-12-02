// @ifdef IS_NODE
'use strict';

var React     = require('react'),
    _         = require('lodash');
// @endif


var MenuSap = React.createClass({
  getInitialState: function () {
    return {};
  },

  render: function() {
    var menu = this.state.menu ? this.state.menu : this.props.menu;

    return (
      <nav className='navbar'>
        <div className='container'>
          <div className='col-xs-9'>
            <a className='logo pull-left' href={menu.logo.url} target='_blank'>
              <img src={menu.logo.img_url} alt={menu.logo.alt_text} />
            </a>
            <div className='pull-left learn-link'>
              <h5>{menu.learn.label}</h5>
              <a href={menu.learn.url} target='_blank'>{menu.learn.link_text} <i className='fa fa-chevron-right'></i></a>
            </div>
          </div>

          <div className='col-sm-3 about-link text-right'>
            <a href={menu.about.url} target='_blank'>{menu.about.text} <i className='fa fa-chevron-right'></i></a>
          </div>
        </div>
      </nav>
    );
  },
});

// @ifdef IS_NODE
module.exports = MenuSap;
// @endif