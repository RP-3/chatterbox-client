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

App.init = function(){
  App.test();
};

App.Models.Message = Backbone.Model.extend({
  urlRoot: "https://api.parse.com/1/classes/chatterbox"
});

App.Collections.Messages = Backbone.Collection.extend({
  model: App.Models.Message
});

App.Views.Message = Backbone.View.extend({
  tagName: "li",

  //template: App.Helpers.template("messageTemplate"),
  template: _.template( $("#messageTemplate").html() ),
  //template: _.template("<a><%= username %></a><%= text %> <%= roomname %>"),

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

// var kale = new App.Models.Message({});
// kale.fetch({data:{order:'-createdAt'}});

App.fetchTest = function(){

  var kale = new App.Collections.Messages({});
  kale.url = 'https://api.parse.com/1/classes/chatterbox';
  kale.fetch({
    complete: function(data){
      kaleview = new App.Views.Messages({ collection: kale });
      console.log(data);
    }
  });

  //var lentil = kale.toJSON()[0].results;
  //var kaleCollection = new App.Collections.Messages({collection: kale.toJSON()[0].results});
}

App.test = function(){
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

  var messagesView = new App.Views.Messages({ collection: messageCollection });
};
