// @ifdef IS_NODE
'use strict';

var React     = require('react'),
    _         = require('lodash');
// @endif


var MenuFooter = React.createClass({
  getInitialState: function () {
    return {};
  },

  renderSocial: function (list) {
    return _.map(list, function (item, key) {
      return (
        <li>
          <a key={key + item.network} href={item.url} className={item.network} target='_blank'><i className={'fa fa-' + item.network}></i></a>
        </li>
      );
    });
  },

  renderLinks: function (links) {
    return _.map(links, function (link, key) {
      return (
        <li>
          <a key={key} href={link.url}>{link.text}</a>
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
            <div className='footer-social'>
              <ul>
                {this.renderSocial(menu.social)}
              </ul>
            </div>

            <div className='footer-info'>
              <ul>
                {this.renderLinks(menu.info_links)}
              </ul>
            </div>

            <p className='footer-copyright'>{menu.copyright.text} | <a href={menu.copyright.url} target='_blank'>{menu.copyright.link_text}</a></p>
          </div>

          <div className='col-sm-3 footer-country-selector text-right'>
            <a href='/blah'>{menu.country_selector.text} <i className='fa fa-chevron-right'></i></a>
          </div>
        </div>
      </nav>
    );
  },
});

// @ifdef IS_NODE
module.exports = MenuFooter;
// @endif