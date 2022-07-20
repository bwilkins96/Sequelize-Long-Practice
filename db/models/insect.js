'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Insect.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isTitleCased() {
          let words = this.name.split(" ");

          words.forEach( word => {
            let correct = word[0].toUpperCase() + word.slice(1).toLowerCase();

            if (word !== correct) {throw new Error("Name must be properly capitalized")}
          })
        }
      }
    },
    description: DataTypes.STRING,
    territory: DataTypes.STRING,
    fact: {
      type:DataTypes.STRING,
      validate: {
        lessThan241() {
          if (this.fact.length > 240) {throw new Error('must be <= 240 characters')}
        }
      }
    },
    millimeters: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'Insect',
  });
  return Insect;
};
