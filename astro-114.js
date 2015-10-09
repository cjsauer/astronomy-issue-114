if(Meteor.isServer) {
  Meteor.users.remove({});
  Channel.remove({});
  let userId = Accounts.createUser({
    username: 'Test',
    password: 'password'
  });

  let user = User.findOne(userId);

  let channel = new Channel({
    title: 'My Channel'
  });
  channel.save();

  user = user.subscribeTo(channel);
  console.log("The array should contain one channel:");
  console.log(user.getSubscriptions().count());

  user = user.unsubscribeFrom(channel);
  console.log("The array should contain ZERO channels!");
  console.log(user.getSubscriptions().count());
}
