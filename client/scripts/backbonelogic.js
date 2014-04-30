var _ = _;
var $ = $;
var Backbone = Backbone;

var App = {
  Models: {},
  Collections: {},
  Views: {},
  Helpers: {}
};

App.Helpers.template = function(id){
  return _.template( $("#" + id).html() );
};

App.init = function(){};

App.Models.Message = Backbone.Model.extend({});

App.Collections.Messages = Backbone.Collection.extend({
  model: App.Models.Message
});

App.Views.Message = Backbone.View.extend({
  tagName: "li",

  // template: App.Helpers.template("messageTemplate"),
  // template: _.template( $("#messageTemplate").html() ),
  template: _.template("<a><%= username %></a><%= text %> <%= roomname %>"),

  render: function(){
    var template = this.template(this.model.toJSON());
    this.$el.html(template);
    return this;
  }

});

App.Views.Messages = Backbone.View.extend({
  tagName: "ul",

  render: function(){
    this.collection.each(this.addOne, this);
    return this;
  },

  addOne: function(message){
    var messageView = new App.Views.Message({model: message});
    this.$el.append(messageView.render().el);
  }

});

//EVERYTHING ABOVE THIS IS A CONSTRUCTOR, EVERYTHING BELOW IS AN INSTANCE



var messageCollection = new App.Collections.Messages([

  {
    text: "sup y'all",
    roomname: "hilton",
    username: "snop doggy dawg"
  },
  {
    text: "sugdsdfall",
    roomname: "hifdssdfton",
    username: "snsdfsdffdsfdswg"
  },
  {
    text: "Good morning, sir",
    roomname: "221B",
    username: "Sherlock"
  }
]);







































