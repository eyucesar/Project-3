// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

var Story = React.createClass({
  render: function() {
    return (
      <div className="card blue-grey darken-1 col s12 m4" id="test">
        <div className="card-content white-text">
            <span className="card-title">Story Title</span>
            <p id="char">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat....</p>
            <a className="story" id="expand" href="#">read story</a>
          </div>
          <div className="card-action">
            <span className="date">Sep 19, 2017</span>
            <i className="fa fa-exclamation-circle" id="flag" aria-hidden="true" title="mark inappropriate"><span id="flagCounter">&nbsp;&nbsp;0</span></i>
            <i className="fa fa-heart fa-lg" id="heart" aria-hidden="true" title="like story"><span id="heartCounter"> 0</span></i>
            <img className="author" src="css/ebru.jpg" alt="user_image" title="eyucesar"/>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Story;
