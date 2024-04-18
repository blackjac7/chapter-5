const classRepo = require("../../repositories/class");
const redisRepo = require("../../helpers/redis");

exports.getAllClasses = async () => {
    // Fetch all classes
    const data = await classRepo.getAllClasses();

    if (!data || data.length === 0) {
        throw { statusCode: 404, message: "No classes found" };
    }

    return data;
};

exports.getClassById = async (id) => {
    // Check if the class exists in the cache
    const key = `class-${id}`;
    let data = await redisRepo.getFromCache(key);

    if (!data) {
        // Fetch the class from the database
        data = await classRepo.getClassById(id);

        if (!data) {
            throw { statusCode: 404, message: `Class with id ${id} not found` };
        }

        // Save the fetched data to the cache
        await redisRepo.saveToCache(key, data, 60 * 2);
    }

    return data;
};

exports.createClass = async (payload) => {
    // Check if a class with the same name already exists
    const existingClassByName = await classRepo.getClassByName(payload.name);

    if (existingClassByName) {
        throw {
            statusCode: 400,
            message: `Class with name ${payload.name} already exists`,
        };
    }

    // Create the class
    const data = await classRepo.createClass(payload);

    if (!data) {
        throw { statusCode: 500, message: "Failed to create class" };
    }

    // Save the newly created class to the cache
    const key = `class-${data.id}`;
    await redisRepo.saveToCache(key, data, 60 * 2);

    return data;
};

exports.updateClass = async (id, payload) => {
    // Check if a class with the given id exists
    const existingClassById = await classRepo.getClassById(id);

    if (!existingClassById) {
        throw { statusCode: 404, message: `Class with id ${id} not found` };
    }

    // Check if a class with the same name already exists
    const existingClassByName = await classRepo.getClassByName(payload.name);

    if (existingClassByName && existingClassByName.id !== id) {
        throw {
            statusCode: 400,
            message: `Class with name ${payload.name} already exists`,
        };
    }

    // Update the class
    const data = await classRepo.updateClass(id, payload);

    if (!data) {
        throw {
            statusCode: 500,
            message: `Failed to update class with id ${id}`,
        };
    }

    // Save the updated class to the cache
    const key = `class-${id}`;
    await redisRepo.saveToCache(key, data, 60 * 2);

    return data;
};

exports.deleteClass = async (id) => {
    // Check if the class exists
    const existingClassById = await classRepo.getClassById(id);

    if (!existingClassById) {
        throw { statusCode: 404, message: `Class with id ${id} not found` };
    }

    // Delete the class
    const data = await classRepo.deleteClass(id);

    if (!data) {
        throw {
            statusCode: 500,
            message: `Failed to delete class with id ${id}`,
        };
    }

    // Remove the class from the cache
    const key = `class-${id}`;
    await redisRepo.removeFromCache(key);

    return data;
};
