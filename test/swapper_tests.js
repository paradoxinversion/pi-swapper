const chai = require("chai");

const expect = chai.expect;
const Swapper = require("../swapper");

describe("Swapper", function () {
  const testData = {
    person: ["Andrew", "Sarah", "Bruce", "Lisa"],
    place: ["City Hall", "Junior College", "Grocery Store", "Post Office"],
    thing: ["Letter", "Book", "Key", "Bag"],
    "sg:noun": ["person", "place", "thing"],
  };
  before(function (done) {
    this.swapper = new Swapper(testData);
    done();
  });

  describe("buildRegex()", function () {
    it("should return a regex string based on the keys found in json data", function () {
      expect(this.swapper.buildRegex(this.testData).toString()).to.eql(
        /\[(person|place|thing|noun)\d\]/gi.toString()
      );
    });
  });

  describe("getSwapitem()", function () {
    it("returns a random swap item given a specific category", function () {
      expect(this.swapper.getSwapItem("person")).to.be.oneOf([
        "Andrew",
        "Sarah",
        "Bruce",
        "Lisa",
      ]);
      expect(() => this.swapper.getSwapItem("persona", testData)).to.throw();
    });
  });

  describe("returnUniqueIdentifiers()", function () {
    it("removes an array of identifiers with duplicates removed", function () {
      expect(
        this.swapper.returnUniqueIdentifiers(["person1", "person2", "person1"])
      ).to.eql(["person1", "person2"]);
    });
  });

  describe("stripIdentifier()", function () {
    const swapCategories = "person|place|thing|noun";

    it("removes the number from a given identifier, returning only the category", function () {
      expect(this.swapper.stripIdentifier("person1", swapCategories)).to.eql(
        "person"
      );
      expect(this.swapper.stripIdentifier("thing1", swapCategories)).to.eql(
        "thing"
      );
    });
  });

  describe("doSwap()", function () {
    it("replaces identifiers with items from a swap list", function () {
      expect(
        this.swapper.doSwap("[Person1] is happy", { person: ["Bob"] })
      ).to.not.contain("[Person1]");
    });
  });
});
