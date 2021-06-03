import db from '../models/index.js';

const Product = db.products;


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

// CONTROLLERS
// Create a new Product entry
export const create = (req, res) => {
    //Validate request
    console.log(req.body);
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const product = new Product(req.body);
    product.save()
        .then(data => {
            // res.json(data);
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
    const page = req.query.page;
    const size = req.query.size;
    const { limit, offset } = getPagination(page, size);
    let query = {}
    let options = {
        limit: limit,
        offset: offset,
        select: 'title description image typeTable',
        sort: {updated: -1},
        populate: 'title'
    }
    Product.paginate(query, options)
        .then(data => {
            const response = getPagingData(data, page, limit);
            console.log(response);
            res.json(response);
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
    var order = req.query.order ? req.query.order : "ASC";
    if (order == "rand") {
        order = db.connection.random();
    } else {
        order = ['id', order];
    }

    const { limit, offset } = getPagination(page, size);

    Product.findAndCountAll({
        where: {
            typeTable: type
        },
        order: [order,],
        limit,
        offset,
    })
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

    let query = {published: 'true'}
    let options = {
        limit: limit,
        offset: offset,
        select: 'title description image',
        sort: {updated: -1},
        populate: 'title'
    }
    Product.paginate(query, options)
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Photos."
        });
    });
};

// Finds a single Product via id
export const findOne = (req, res) => {
    const typeTable = req.params.typeTable;
    //TODO
    Product.findOne({typeTable: typeTable})
    .then(entry => {
        Product.findByPk(1, {include: entry.dataValues['typeTable']})
        .then((data) => {
            res.json({
                data: data,
            });
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving Product with id=" + id
        });
    });
};

/*
    Need to rewrite the code that comes after this line to work with the new database design.
    It's still all the old Photography only model
*/

// Update a Product by the id in request
export const update = (req, res) => {
    const id = req.params.id;

    Photography.update(req.body, {
        where: {id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Photo was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Photo with id=${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Photo with id=" + id
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