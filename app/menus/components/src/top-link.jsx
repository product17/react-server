var isNode = typeof module !== 'undefined' && module.exports,
    React = isNode ? require('react') : window.React,
    ReactDOM = isNode ? require('react') : window.ReactDOM;


var TopLink = React.createClass({
  getInitialState: function () {
    return {};
  },

  handleClick: function () {
    alert('You clicked on a top link!');
  },

  render: function() {
    var link = this.state.link ? this.state.link : this.props.link;

    // return <p>testing</p>;
    return (
      <li className='pull-left'>
        <a href={link.url}>{link.display_name}</a>
      </li>
    );
  },
});

if (isNode) {
  exports.TopLink = TopLink;
} else {
  // ReactDOM.render(<TopLink links={init_data.menu_links} />, document.getElementById('react-menu'));
}