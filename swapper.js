const NoIdentifierError = require("./error/NoIdentifierError");

function Swapper(swapList) {
  this.swapList = swapList;
  this.swapCategories = "";
  this.swapGroups = [];
  this.swapKey = new Object(null);

  this.getSwapCategoriesAndGroups = function () {
    try {
      const swapGroups = [];
      const swapCategories = Object.keys(this.swapList)
        .map((swapCategory) => {
          if (swapCategory.startsWith("sg:", 0)) {
            this.swapGroups.push(swapCategory.slice(3, swapCategory.length));
            return swapCategory.slice(3, swapCategory.length);
          }
          return swapCategory;
        })
        .join("|");
      this.swapCategories = swapCategories;
      return { swapCategories, swapGroups };
    } catch (e) {
      throw e;
    }
  };

  /**
   * Takes a swap list JSON object and returns a regex that will match categories in the string to swap.
   * if the JSON has the properties "A", "B", and "C" should this should return "A|B|C"
   * @returns {Object} A new RegExp
   */
  this.buildRegex = function () {
    return new RegExp("\\[(" + this.swapCategories + ")\\d\\]", "gi");
  };
  /**
   * Function to find and return only Unique Identifiers in an Array
   * Identifiers should come into this function as IdentifierX
   * @param {Array} uniqueIdentifierArray an Array of Identifiers
   * @returns {Array} an Array of Unique Identifiers
   * @throws {NoIdentifierError} There must be an array of Identifiers passed to the function
   */
  this.returnUniqueIdentifiers = function (uniqueIdentifierArray) {
    let processedIdentifiers = [];
    try {
      if (uniqueIdentifierArray === null || uniqueIdentifierArray === []) {
        throw new NoIdentifierError();
      } else {
        uniqueIdentifierArray.forEach(function (element) {
          if (!processedIdentifiers.includes(element)) {
            processedIdentifiers.push(element);
          }
        });
        return processedIdentifiers;
      }
    } catch (e) {
      console.log(e.name, e.message);
      throw e;
    }
  };
  /**
   * Returns a given identifier without brackets or variables
   * @param {String} identifier The identifier string
   * @returns {String} The stripped identifier (lower case)
   */
  this.stripIdentifier = function (identifier) {
    const arr = this.swapCategories
      .split("|")
      .map((category) => {
        return category + "\\d";
      })
      .join("|");
    const regExp = new RegExp(arr, "gi");

    const stripped = identifier.match(regExp)[0].toLowerCase();
    return stripped.slice(0, stripped.length - 1);
  };

  /**
   * Function to return a random item from a given Category
   * @param {String} swapCategory the category to choose from. It must exist in the JSON data.
   * @returns {String} the substition
   */
  this.getSwapItem = function (swapCategory) {
    let swap_value_index = Math.floor(
      Math.random() * this.swapList[swapCategory].length
    );
    return this.swapList[swapCategory][swap_value_index];
  };

  this.doSwap = function (inputStr) {
    try {
      const swapCategoryRegex = this.buildRegex(swapList);
      let swapIdentifiers = this.returnUniqueIdentifiers(
        inputStr.match(swapCategoryRegex)
      );
      const swapKey = {};
      if (swapIdentifiers instanceof NoIdentifierError) {
        throw swapIdentifiers;
      } else {
        swapIdentifiers.forEach((fullIdentifier) => {
          const strippedIdentifier = this.stripIdentifier(
            fullIdentifier,
            this.swapCategories
          );
          if (this.swapGroups.includes(strippedIdentifier)) {
            let randomSwapCategoryIndex = Math.floor(
              Math.random() * swapList[`sg:${strippedIdentifier}`].length
            );
            const category =
              swapList[`sg:${strippedIdentifier}`][randomSwapCategoryIndex];
            swapKey[fullIdentifier] = this.getSwapItem(category, swapList);
          } else {
            swapKey[fullIdentifier] = this.getSwapItem(
              strippedIdentifier,
              swapList
            );
          }
        });
      }
      debugger;
      const finalString = inputStr.replace(swapCategoryRegex, function (match) {
        return swapKey[match];
      });
      return finalString;
    } catch (e) {
      const error = new Error(
        "Something went wrong getting unique identifiers. Make sure you have at least one [IdentifierNameX] where IdentifierName is a key in swap-list.json and X is an integer."
      );
      error.message = e.message;
      error.stack = e.stack;
      throw error;
    }
  };

  this.getSwapCategoriesAndGroups();
}

module.exports = Swapper;
