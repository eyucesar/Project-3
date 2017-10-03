// Include React
var React = require("react");

//library to convert mongoDB date isoDate format
var moment = require("moment");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

var Story = React.createClass({

  getInitialState: function(){
        return {
            expanded: [], 
            hearts: 0, 
            flags: 0
        };
  },
  handleClick: function(i, e){
    e.preventDefault();
    var newstate = this.state.expanded;
    if (this.state.expanded[i] === 'passive') {
        newstate[i] = 'active';
    } else {
        newstate[i] = 'passive';
    }
    this.setState({expanded: newstate});
  },

  handleHeartClick: function(i) {
    var hearts = parseInt(this.props.story[i].hearts) + 1;
    console.log("in handleHeartClick ", this.props.story[i]._id, " ", hearts);
    helpers.updateHearts(this.props.story[i]._id, hearts).then(function (h) {
      console.log("Posted to MongoDB", h.data);
      
    });
    this.setState({hearts: hearts});
    this.props.setHeartCounter(hearts);
  },

  handleFlagClick: function(i) {
    var flags = parseInt(this.props.story[i].flags) + 1;
    console.log("in handleFlagClick ", this.props.story[i]._id, " ", flags);
    helpers.updateFlags(this.props.story[i]._id, flags).then(function (h) {
      console.log("Posted to MongoDB", h.data);
      
    });
    this.setState({flags: flags});
    this.props.setFlagCounter(flags);
  },

  render: function() {
    console.log(this.state.expanded);
    return (
      
    <div>
      {this.props.story.map((card, i) => {
          
          return (
       
          <div key={i} className={this.state.expanded[i]}>
           <div className="card blue-grey darken-1 col s12 m4">
            <div className="card-content white-text">
              <span className="card-title">{card.title}</span>
              <p>{card.longVersion}</p>
              <a className="story" id="expand" onClick={(e) => this.handleClick(i, e)} href="#">read story</a>
            </div>
            <div className="card-action">
              <span className="date">{moment(card.date).format('ll')}</span>
              <i onClick={() => this.handleFlagClick(i)}className="fa fa-exclamation-circle" id="flag" aria-hidden="true" title="mark inappropriate"><button id="flagCounter" onClick={() => this.handleFlagClick(i)}>{card.flags}</button></i>
              <i onClick={() => this.handleHeartClick(i)}className="fa fa-heart fa-lg" id="heart" aria-hidden="true" title="like story"><button id="heartCounter" onClick={() => this.handleHeartClick(i)}>{card.hearts}</button></i>
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
