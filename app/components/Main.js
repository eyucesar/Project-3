// include react
var React = require("react");
// include sub component
var Story = require("./Story");
// helper functions for making AJAX requests to our API
var helpers = require("./utils/helpers");
// creating the main component
var Main = React.createClass({

  getInitialState: function() {
    return { story: [], heartsMain: 0, flagsMain: 0};
  },
  // the moment the page renders, get the stories
  componentDidMount: function() {
    // get the stories
    helpers.getStories().then(function(response) {
      if (response !== this.state.story) {
        this.setState({ story: response.data });
      }
    }.bind(this));
  },
  // if the component changes (i.e. if the heart or flag counters are updated)
  componentDidUpdate: function(prevProps, prevState) {
    if ((this.state.heartsMain !== prevState.heartsMain) || (this.state.flagsMain !== prevState.flagsMain)) {
      // get the latest stories
      helpers.getStories().then(function(response) {
        if (response !== this.state.story) {
          this.setState({ story: response.data });
        }
      }.bind(this));
    }
  },
  // allow children to update the parent, re-render after heart counter is clicked
  setHeartCounter: function(count) {
    this.setState({heartsMain: count});
  },
  // allow children to update the parent, re-render after flag counter is clicked
  setFlagCounter: function(count) {
    this.setState({flagsMain: count});
  },
  // render the function
  render: function() {
    return (
        <Story story={this.state.story} setHeartCounter={this.setHeartCounter} setFlagCounter={this.setFlagCounter}/>
    );
  }
});

// export the component
module.exports = Main;
