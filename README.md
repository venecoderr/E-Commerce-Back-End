# E-Commerce Back-end

![Github license](https://img.shields.io/badge/license-none-blue.svg)

## Description

To test my newly acquired ORM and sequelize knowledge I built a basic yet really important CLI E-Commerce app, this app will create and allow you to manage a basic database for an e-commerce business including your stock of products and the list of categories and tags required to organize and display the product

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Questions](#questions)
- [Credits](#credits)
- [Walkthrough](#walkthrough)

## Installation

the 'npm i' command will take care of all installations needed

## Usage

Upon loading the server you will be able to use the following API endpoints:

- **/api/Categories**
- **/api/Products**
- **/api/Tags**

**GET** request to **ALL** endpoints will return all records in the database for that endpoint, use **/api/*endpoint*/:id** to get just one record from the database

**POST** request to **ALL** endpoints will create a new record in the database

    Use the following body examples for each request:

- **/Categories**

        {
            "category_name": "boomSticks"
        }

- **/Products**

        {
            "product_name": "White Russian",
            "price": 47.00,
            "stock": 12,
            "category_id": 6,  //Optional but recommended field
            "tagIds": [5, 7]   //Optional but recommended field
        }

- **/Tags**

        {
            "tag_name": "redWood"
        }

**PUT** request to **ALL** endpoints will updated an existing record using id

- use **/api/*endpoint*/:id** to select record to update
- refer to request body examples for field names to update

    Example: 
    A PUT request to **/api/products/3** with the following body
    
        {
            "price": "27.99"
        }

    Will update the price field on the record with the id 3 in the products table

**DELETE** request to **ALL** endpoints will delete an existing record using id

- use **/api/*endpoint*/:id** to select record to delete

## Tests

No test included at the moment

## Questions

For questions contact me at [Github](https://github.com/venecoderr) or [Email me](mailto:josefrm.55@gmail.com)

## Walkthrough

Demo video: https://drive.google.com/file/d/1uu3V_vaBdIL-xn3nmyDcDnnrRveFpdGO/view

