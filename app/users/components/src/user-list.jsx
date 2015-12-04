// @ifdef IS_NODE
var React         = require('react'),
    _             = require('lodash');
// @endif

var UserList = React.createClass({
  getInitialState: function () {
    return {};
  },

  renderUser: function (user, key) {
    return (
      <div className='well'>
        <h4>Name: {user.display_name}</h4>
        <p>Email: {user.email}</p>
        <a href={'/author/details/' + user._id} className='btn btn-primary'>Details</a>
        <a href={'/admin/user/edit/' + user._id} className='btn btn-success'>Edit</a>
      </div>
    );
  },

  renderPageLink: function (page, active) {
    return (
      <li key={page} className={active}>
        <a href={'?p=' + page}>{page}</a>
      </li>
    );
  },

  renderPagination: function (page, count, num) {

    var start = ((page - 2) >= 0) ? page - 2 : 0,
        links = [];

    for (var i = start, len = start + 5; i < len; i++) {
      if (i === page) {
        links.push(this.renderPageLink(i, 'active'));
      } else {
        links.push(this.renderPageLink(i, ''));
      }
    }

    return (
      <nav>
        <ul className="pagination pull-right">
          <li className={page - 1 < 0 ? 'disabled' : ''}>
            <a href={page - 1 < 0 ? '#' : '?p=' + (page - 1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {links}
          <li>
            <a href={'?p=' + page + 1} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  },

  render: function() {
    var user_list = this.state.user_list ? this.state.user_list : this.props.user_list;
    var current_page = this.state.current_page ? this.state.current_page : this.props.current_page;

    var users = _.map(user_list.data, this.renderUser);

    return (
      <div className='col-sm-6 col-sm-offset-3'>
        {users}
        {this.renderPagination(current_page, user_list.count, user_list.data.length)}
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = UserList;
// @endif
