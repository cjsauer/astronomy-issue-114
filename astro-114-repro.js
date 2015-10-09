// An Astro class used as a nested field in the User class below
UserProfile = Astronomy.createClass({
  name: 'UserProfile',
  /* No collection attribute */
  fields: {

    words: {
      type: 'array',
      nested: 'string',
      default() {
        return [];
      }
    }
  }
});

/*
 * An Astro wrapper around the accounts-password user collection
 */
User = Astronomy.createClass({
  name: 'User',
  // Use the built-in Accounts' user collection
  collection: Meteor.users,
  fields: {
    username: 'string',
    emails: 'array',
    createdAt: 'date',
    services: 'object',
    profile: {
      type: 'object',
      nested: 'UserProfile',
      default() {
        return {};
      }
    }
  },

  methods: {
    getWords() {
      let words = this.get('profile.words');
      return words;
    },

    addWord(word) {
      this.push('profile.words', word);
      this.save();
      return this;
    },

    removeWord(word) {
      let words = this.get('profile.words'),
          wordIndex = words.indexOf(word);
      if(wordIndex > -1) {
        words.splice(wordIndex, 1);

        // This does NOT work!
        this.set('profile.words', words);

        // This DOES work!
        // this.profile.words = words;
        this.save();
      }
      return this;
    }
  }
});


if(Meteor.isServer) {
  Meteor.users.remove({});
  let userId = Accounts.createUser({
    username: 'Test',
    password: 'password'
  });

  let user = User.findOne(userId);

  user = user.addWord('test');
  console.log("The array should contain one word:");
  console.log(user.getWords().length);

  user = user.removeWord('test');
  console.log("The array should contain ZERO words!");
  console.log(user.getWords().length);
}
