Nested = Astronomy.createClass({
  name: 'Nested',
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

Parents = new Mongo.Collection('parents');
Parent = Astronomy.createClass({
  name: 'Parent',
  // Use the built-in Accounts' user collection
  collection: Parents,
  fields: {
    children: {
      type: 'object',
      nested: 'Nested',
      default() {
        return {};
      }
    }
  },

  methods: {
    getWords() {
      let words = this.get('children.words');
      return words;
    },

    addWord(word) {
      this.push('children.words', word);
      this.save();
      return this;
    },

    removeWord(word) {
      let words = this.get('children.words'),
          wordIndex = words.indexOf(word);
      if(wordIndex > -1) {
        words.splice(wordIndex, 1);

        // This does NOT work!
        this.set('children.words', words);

        // This DOES work!
        // this.children.words = words;
        this.save();
      }
      return this;
    }
  }
});


if(Meteor.isServer) {
  let parent = new Parent();
  parent.save();

  parent = parent.addWord('test');
  console.log("The array should contain one word:");
  console.log(parent.getWords().length);

  parent = parent.removeWord('test');
  console.log("The array should contain ZERO words!");
  console.log(parent.getWords().length);
}
