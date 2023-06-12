require('dotenv').config();

// Question 1: Install and Set Up Mongoose
// Require mongoose amd then connecct it to the .env
// variable MONGO_RUI
// MONGO_URI is set to the Atlas DB URL (see tutorial)
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Question 2: Create a Model
// Each schema maps to a MongoDB collection, building 
// block for models/
// Creating a person schema with a name, age, and food 
// and setting a mongoose model to a variable
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model("Person", personSchema);

// Question 3: Create and Save a Record of a Model
// Create a new person model and save it
// done() is a callback function that tells us we can 
// proceed after completing an async operation
const createAndSavePerson = (done) => {
  let nickDimartino = new Person({
    name: "Nick DiMartino",
    age: 25,
    favoriteFoods: ["PB", "Eggs", "Sweet Taters"]
  });

  nickDimartino.save((err, data) => {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

// Question 4: Create Many Recods with model.create()
// Create many instances of the model Person
const arrayOfPeople = [
  { name: "a", age: 1, favoriteFoods: ["a"] },
  { name: "a", age: 1, favoriteFoods: ["a"] },
  { name: "a", age: 1, favoriteFoods: ["a"] },
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) {
      return console.log(err);
    }
    done(null, people);
  });
};

// Question 5: Use model.find() to Search Your Database
// find() accept a query document (JSON object) as the
// first arg and a callback as the second
// Returns array of matches
// Find all the people with the given name personName
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) {
      return console.log(err);
    }
    done(null, people);
  });
};

// Question 6: Use model.findOne() to Return a Single 
// Matching Document from Your Database
// similar to find() but returns one document instead
// of an array
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, people) => {
    if (err) {
      return console.log(err);
    }
    done(null, people);
  });
};

// Question 7: Use model.findById() to Search Your Databse by _id
// MongoDB adds the _id field and sets it to an 
// alphanumeric key when saving a document
// finds the model matching the id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, people) => {
    if (err) {
      return console.log(err);
    }
    done(null, people);
  });
};

// Question 8: Perform Classic Updates by Running Find, 
// Edit, then Save
// this is the old way of doing this
// finds matches based on the search criteria, and 
// bulk-edits
// does not return updated document, only status msg
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) {
      return console.log(err);
    }

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) {
        return console.log(err);
      }
      done(null, updatedPerson);
    });
  });
};

// Question 9: Perform New Updates on a Document Using
// model.findOneAndUpdate()
// finds a model element (document) by ID and updates it
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);
  });
};

// Question 10: Delete One Document Using model.findByIdAndRemove()
// finds a document by _id and removes it
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) {
      return console.log(err);
    }
    done(null, removedDoc);
  });
};

// Question 11: Delete Many Documents with model.remove()
// deletes all documents meeting match criteria
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, removedName) => {
    if (err) {
      console.log(err);
    }
    done(null, removedName);
  });
};

// Question 12: Chain Search Query Helplers to Narrow
// Seartch Results
// finds documents with the string "burrito"
// sorts by name in ascending order
// limits results to 2 documents
// hide the age element of the documents
// then executes the done() function
const queryChain = (done) => {
  const favoriteFood = "burrito";
  Person.find({ favoriteFoods: favoriteFood })
    .sort({ name: 'asc' })
    .limit(2)
    .select({ age: 0 })
    .exec(function(err, searchResult) {
      if (err) {
        console.log(err);
      }
      done(err, searchResult);
    });
}

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
