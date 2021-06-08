import db from '../models/index.js';

const Product = db.Product;


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

    // add product._id to tableObject in the request body
    req.body.tableObject.productId = product._id

    // after we received data, query collections by the name of <typeTable> based on local <db> storage
    const collectionObject = getCollectionModel(req.body.typeTable);
    //TODO validation for non-existent model


    product.save()
        .then(data => {
            if (collectionObject) {
                // create document in mongoDB based on the query, e.g. mongoModel returned 'Photo'
                const newProduct = new collectionObject(req.body.tableObject);
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





// Retrieve all Product from the database
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

// Retrieve all Product of a specified type from the database
export const findAllType = (req, res) => {
    const page = req.query.page;
    const size = req.query.size;
    const type = req.params.type;
    // var order = req.query.order ? req.query.order : "ASC";
    // if (order == "rand") {
    //     order = db.connection.random();
    // } else {
    //     order = ['id', order];
    // }

    //TODO type, as we have only 1 type for now
    const { limit, offset } = getPagination(page, size);

    Product.find({typeTable: type}).skip(offset).limit(limit)
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.json(response);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving Products"
        })
    })
};

// Find all published Photos
export const findAllPublished = (req, res) => {
    const { page, size } = req.query;
    const type = req.params.type;
    const { limit, offset } = getPagination(page, size);
    //TODO type
    Product.find({published: 'true'}).skip(offset).limit(limit)
    .then(data => {
        const response = getPagingData(data, page, limit);
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Photos."
        });
    });
};

// Finds a single Product via id
// Finds a single Product via id
export const findOne =  (req, res) => {
    const id = req.params.id;
    console.log(id)
    Product.findById(id).lean().exec((err, data) => {
        if (err) {
            res.status(500).send({
                message: err || "Error retrieving Product with id=" + id
            });
        }else {
            const collectionObject = getCollectionModel(data.typeTable);
            if (collectionObject) {
                collectionObject.findOne({productId: data._id}).lean().exec((err, doc) => {
                    if (err) {
                        res.status(500).send({
                            message: err || "Error collection object with id= " + id
                        });
                    }else {
                        data.type = doc;
                        res.json({
                            data: data
                        })
                    }
                })
            }

        }
    })
};

/*
    Need to rewrite the code that comes after this line to work with the new database design.
    It's still all the old Photography only model
*/

// Update a Product by the id in request
export const update = (req, res) => {
    const id = req.params.id

    Product.findOneAndUpdate(
        {_id: id},
        {$set : req.body.updatedFields},
        { returnOriginal: false },
    )
        .then((document) => {
            console.log(document)
            console.log(`typeTable of the object ${id} is ${document.typeTable}`)

            //TODO
            const collectionObject = getCollectionModel(document.typeTable)
            if(req.body.image) {
                collectionObject.findOneAndUpdate({productId: document._id}, req.body)
                    .then((data) => {
                        console.log(data);
                        res.json({data: data})
                    })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: err.message || "Error updating Product with id=" + id
            });
        });
};

// Delete a Photo by the id in the request
export const deleteOne = (req, res) => {
    const id = req.params.id;

    Photography.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Photo was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete Photo with id=${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error deleting Photo with id=" + id
        });
    });
};

// Delete all Photos from the database
export const deleteAll = (req, res) => {
    Photography.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Photos were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while removing all Photos."
        });
    });
};