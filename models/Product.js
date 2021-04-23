// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model 
// Columns that need to be added ID, Name, Price, Stock.... 
Product.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 10,
      validate:{
        isNumeric: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "id"
          // references replace the need for foreign keys
        }
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
