Channels = new Mongo.Collection('channels');

Channel = Astronomy.createClass({
  name: 'Channel',
  collection: Channels,
  fields: {

    /* The title of the Channel */
    title: 'string',
  }
});
