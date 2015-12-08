// @ifdef IS_NODE
var React = require('react');
// @endif

var FormImage = React.createClass({

  getInitialState: function () {
    return {};
  },

  niceName: function (name) {
    return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/_/g, ' ');
  },

  render: function() {

    var field_info  = this.state.field_info ? this.state.field_info : this.props.field_info,
        label       = this.niceName(field_info.name),
        renderImage = false,
        imageClass  = ' ';

    if (field_info.value.link) {
      imageClass += 'col-xs-9 flush-right';

      renderImage = (
        <div className='col-xs-3 flush'>
          <img src={'/' + field_info.value.link} className='img-responsive img-thumbnail' />
        </div>
      );
    }

    return (
      <div>
        {renderImage}
        <div className={field_info.wrapper_class + imageClass}>
          <label for={field_info.name}>{label}</label>
          <input name={field_info.name} className={field_info.field_class} type="file" value='' placeholder={label} />
        </div>
        <div className='clearfix'></div>
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = FormImage;
// @endif
