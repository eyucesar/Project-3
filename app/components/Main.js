// Include React
var React = require("react");

// Here we include all of the sub-components
var Story = require("./Story");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this story state variable
  // counterMain is a dummy value. When hearts/flags are updated, 
  // this is set so that the main component renders again

  getInitialState: function() {
    return { story: [], heartsMain: 0, flagsMain: 0};
  },


  // The moment the page renders get the Stories
  componentDidMount: function() {
    // Get the latest stories.
    console.log("in didmount");
    helpers.getStories().then(function(response) {
      console.log("response = ", response.data);
      if (response !== this.state.story) {
        console.log("story", response.data);
        this.setState({ story: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if the heart or flag counters are updated)...
  componentDidUpdate: function(prevProps, prevState) {

    if ( (this.state.heartsMain !== prevState.heartsMain) || (this.state.flagsMain !== prevState.flagsMain) ) {
    // Get the latest stories.
    console.log("in didmount");
    helpers.getStories().then(function(response) {
      console.log("response = ", response.data);
      if (response !== this.state.story) {
        console.log("story", response.data);
        this.setState({ story: response.data });
      }
    }.bind(this));
  }

    
  },

  // This function allows childrens to update the parent. To re-render after heart counter is clicked
  setHeartCounter: function(count) {
    console.log("in set counter");
    this.setState({heartsMain: count});
  },

  // This function allows childrens to update the parent. To re-render after flag counter is clicked
  setFlagCounter: function(count) {
    console.log("in set counter");
    this.setState({flagsMain: count});
  },

  // Here we render the function
  render: function() {
    return (
        
        <Story story={this.state.story} setHeartCounter={this.setHeartCounter} setFlagCounter={this.setFlagCounter}/>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
