// @ifdef IS_NODE
'use strict';

var React     = require('react'),
    _         = require('lodash');
// @endif


var MenuFooter = React.createClass({
  getInitialState: function () {
    return {};
  },

  renderLinks: function (links) {
    return _.map(links, function (link, key) {
      return (
        <li>
          <a key={key} href='/test'>wat</a>
        </li>
      );
    });
  },

  render: function() {
    var menu = this.state.menu ? this.state.menu : this.props.menu;

    return (
      <nav className='navbar'>
        <div className='container'>
          <div className='col-sm-9'>
            <div>
            </div>

            <div>
              <ul>
                {this.renderLinks(menu.info_links)}
              </ul>
            </div>

            <p>© Copyright 2015 Concur Technologies, Inc. All rights reserved. | <a href='/policy'>Privacy Policy</a></p>
          </div>
        </div>
      </nav>
    );
  },
});

// @ifdef IS_NODE
module.exports = MenuFooter;
// @endif