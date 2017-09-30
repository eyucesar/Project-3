// Include React
var React = require("react");

//library to convert mongoDB date isoDate format
var moment = require("moment");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

var Story = React.createClass({

  // getInitialState: function(){
  //       return {
  //           expanded: 'passive'
  //       };
  // },
  // handleClick: function(){
  //       if (this.state.expanded === 'passive'){
  //           this.setState({expanded: 'active'});
  //       } else {
  //           this.setState({expanded: 'passive'});
  //       }
  //   },

  render: function() {
    return (
      
    // <div className="row" className={this.state.expanded} onClick={this.handleClick}>
    <div className="row">
      {this.props.story.map((card, i) => {
        
          return (
       
          <div key={i}>
           <div className="card blue-grey darken-1 col s12 m4">
            <div className="card-content white-text">
              <span className="card-title">{card.title}</span>
              <p>{card.longVersion}</p>
              <a className="story" id="expand" href="#">read story</a>
            </div>
            <div className="card-action">
              <span className="date">{moment(card.date).format('ll')}</span>
              <i className="fa fa-exclamation-circle" id="flag" aria-hidden="true" title="mark inappropriate"><span id="flagCounter">&nbsp;&nbsp;{card.flags}</span></i>
              <i className="fa fa-heart fa-lg" id="heart" aria-hidden="true" title="like story"><span id="heartCounter"> {card.hearts}</span></i>
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
