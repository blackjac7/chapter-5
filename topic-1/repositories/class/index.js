const { classes } = require("../../models");

exports.getAllClasses = async () => {
    const options = {
        include: ["students"],
    };

    const data = await classes.findAll(options);

    return data;
};

exports.getClassById = async (id) => {
    const options = {
        include: ["students"],
    };

    const data = await classes.findByPk(id, options);

    return data;
};

exports.getClassByName = async (name) => {
    const options = {
        where: { name },
    };

    const data = await classes.findOne(options);

    return data;
};

exports.createClass = async (payload) => {
    const data = await classes.create(payload);

    return data;
};

exports.updateClass = async (id, payload) => {
    const options = { where: { id }, returning: true };

    const data = await classes.update(payload, options);

    return data[1][0];
};

exports.deleteClass = async (id) => {
    const options = { where: { id } };

    const data = await classes.destroy(options);

    return data;
};
