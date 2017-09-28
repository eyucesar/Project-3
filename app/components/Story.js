// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

var Story = React.createClass({
  render: function() {
    return (
      
    <div className="row">
      {this.props.story.map((search, i) => {
        
          return (
       
          <div key={i}>
           <div className="card blue-grey darken-1 col s12 m4" id="test">
            <div className="card-content white-text">
              <span className="card-title">{search.title}</span>
              <p id="char">{search.longVersion}</p>
              <a className="story" id="expand" href="#">read story</a>
            </div>
            <div className="card-action">
              <span className="date">{search.date}</span>
              <i className="fa fa-exclamation-circle" id="flag" aria-hidden="true" title="mark inappropriate"><span id="flagCounter">&nbsp;&nbsp;0</span></i>
              <i className="fa fa-heart fa-lg" id="heart" aria-hidden="true" title="like story"><span id="heartCounter"> 0</span></i>
              <img className="author" src="css/ebru.jpg" alt="user_image" title="eyucesar"/>
            </div>
          </div>
        </div>
        ); // return 


      })}
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Story;
