import db from '../models/index.js';
const Product = db.product;


// HELPERS
const getPagination = (page, size) => {
    const limit = size ? +size : 9;
    const offset = page ? page * limit : 0;

    return { limit, offset };
}

const getPagingData = (input, page, limit) => {
    const { count: totalItems, rows: data } = input;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, data, totalPages, currentPage };
}

/**
 * Helper method to query collections in mongo to find the right one by the name
 * @param collectionName
 */
const getCollectionModel = (collectionName) => {
    for (const [key, value] of Object.entries(db)) {
        if (key == collectionName) {
            return value;
        }
    }
}


/**
 * Request body
 *
 * {
 *  title <string>,
 *  description <string>,
 *  published(optional) <string>,
 *  typeTable <string>,
 *  tableObject : {<object>}
 * }
 *
 */
export const create = (req, res) => {

    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        published: (req.body.published) ? req.body.published : 'false',
        typeTable: req.body.typeTable,
        image: req.body.image,
    })

    // after we received data, query collections by the name of <typeTable> based on local <db> storage
    const collectionObject = getCollectionModel(req.body.typeTable);
    //TODO validation for non-existent model
    if (!collectionObject) {
        res.status(500).send({message: 'Collection specified does not exist'})
        return;
    }

    product.save()
        .then(data => {
            if (collectionObject) {
                // create document in mongoDB based on the query, e.g. mongoModel returned 'Photo'
                // add product._id to tableObject in the request body
                req.body.typeData.productId = product._id
                const newProduct = new collectionObject(req.body.typeData);
                newProduct.save()
            }
            res.send({
                message: "Product was created successfully"
            })
        }).catch(err => {
            console.log({ message: err.message})
            res.status(500).send({ message: err.message});
    });
};


/**
 * Retrieve all Product from the database
 * @param req
 * @param res
 */
export const findAll = (req, res) => {
    console.log('FIND ALL HAD BEEN CALLED')
    const page = req.query.page;
    const size = req.query.size;
    const { limit, offset } = getPagination(page, size);
    console.log(`Limit is ${limit}, and offset is ${offset}`)
        Product.find().skip(offset).limit(limit)
        .then(data => {
            //const response = getPagingData(data, page, limit);
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving Products"
            })
        })
};


/**
 * Retrieve all Product of a specified type from the database
 * @param req
 * @param res
 */
export const findAllType = (req, res) => {
    const page = req.query.page;
    const size = req.query.size;
    const { limit, offset } = getPagination(page, size);


    //TODO type, as we have only 1 type for now
    const type = req.params.type;
    const modelEnum = Product.schema.paths.typeTable.enumValues
    //check if the type sent to the server supposed to exist in mongo
    if (!modelEnum.includes(type)) {
        res.status(500).send({
            message: `Object of type \'${type}'\ does not exist`
        })
    }else {
        Product.find({typeTable: type}).skip(offset).limit(limit)
          .then(data => {
              console.log(data)
              res.json(data);
          })
          .catch(err => {
              res.status(500).send({
                  message: err.message || "An error occurred while retrieving Products of this type"
              })
          })
    }
};

/**
 * Returns
 * @param req
 * @param res
 */
export const getTypes = (req, res) => {
    res.send(Product.schema.paths.typeTable.enumValues);
}


/**
 * Finds all products based on its <published> status
 * @param req
 * @param res
 */
export const findAllPublished = (req, res) => {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    //TODO type?
    //const type = req.params.type;
    Product.find({published: 'true'}).skip(offset).limit(limit)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving published products."
        });
    });
};


/**
 * Finds a single product based on id
 * @param req
 * @param res
 * @return Product document with <typeData> which includes data about its foreign key
 */
export const findOne =  (req, res) => {
    const id = req.params.id;

    Product.findById(id).lean().exec((err, data) => {
        if (err) {
            res.status(500).send({
                message: err || "Error retrieving Product with id=" + id
            });
        }else {
            if (data){
                const collectionObject = getCollectionModel(data.typeTable);
                if (collectionObject) {
                    collectionObject.findOne({productId: data._id}).lean().exec((err, doc) => {
                        if (err) {
                            res.status(500).send({
                                message: err || "Error collection object with id= " + id
                            });
                        }else {
                            data.typeData = doc;
                            res.json({
                                data: data
                            })
                        }
                    })
                }
            }else {
                res.status(404).send({
                    message: err || `Product ${id} not found`
                });
            }
        }
    })
};


/*
    Need to rewrite the code that comes after this line to work with the new database design.
    It's still all the old Photography only model
*/


/**
 * Update product based on id
 * @param req
 * @param res
 * @return Product with the key <typeData> which includes data about its foreign key
 */
export const update = (req, res) => {
    const id = req.params.id

    Product.findOneAndUpdate({_id: id}, req.body, { new: true },).lean().exec((err, document) => {
        if (err) {
            res.status(500).send({
                message: err || "Error retrieving Product with id=" + id
            });
        }else {
            const collectionObject = getCollectionModel(document.typeTable)
            //due to the nature of method, mongo document changes it's original id
            // > we need to change  corresponding typeTable object's productId as well
            collectionObject.findOneAndUpdate(id, {productId: document._id}).lean().exec((err, doc) =>
            {
                if (err) {
                    res.status(500).send({
                        message: err || "Error collection object with id= " + id
                    });
                } else {
                    document.typeData = doc;
                    res.json({
                        data: document
                    })
                }
            })
        }
    })
};


/**
 * Delete a Photo by the id in the request
 * @param req
 * @param res
 */
export const deleteOne = (req, res) => {
    const id = req.params.id;
    Product.findOneAndDelete({_id: id})
      .then((document) =>{
          console.log(document)
          const collectionObject = getCollectionModel(document.typeTable)
          collectionObject.deleteOne({productId: id})
            .then(() => {
                res.send({
                    message: `Object with id=${id} and its corresponding typeObject=${document.typeTable} have been deleted`
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message: err || `Error occurred deleting object with productId = ${id} `
                })
            })
        })
      .catch((err) => {
          res.status(500).send({
              message: err || `Error occurred deleting object with id = ${id} `
          })
      })
};


