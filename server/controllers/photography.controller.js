import db from '../models/index.js';

const Photography = db.photography;
const Op = db.Sequelize.Op;

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
// Create a new Photo entry
export const create = (req, res) => {
    //Validate request
    if (!req.body.title) {
        res.status(400)/send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Photo entry
    const photography = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        published: req.body.published ? req.body.published : false,
    };

    // Save Photo to database
    Photography.create(photography)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating Photo."
        });
    });
};

// Retrieve all Photos from the database
export const findAll = (req, res) => {

    const page = req.query.page;
    const size = req.query.size;
    var order = req.query.order ? req.query.order : null;
    if (order && order == "rand") {
        order = db.connection.random();
    } else {
        order = ['id', order];
    }

    const { limit, offset } = getPagination(page, size);

    Photography.findAndCountAll({
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
            message: err.message || "An error occurred while retrieving Photos"
        })
    })
};

// Finds a single Photo via id
export const findOne = (req, res) => {
    const id = req.params.id;

    Photography.findByPk(id)
    .then(data => {
        res.json({
            data: data,
        });
    })
    .catch(err => {
        res.status.send({
            message: err.message || "Error retrieving Photo with id=" + id
        });
    });
};

// Update a Photo by the id in request
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

// Find all published Photos
export const findAllPublished = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    Photography.findAndCountAll({ where: { published: true }, limit, offset })
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