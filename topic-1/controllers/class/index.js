const classUsecase = require("../../usecase/class");
const { validateClass } = require("../../helpers/validation");

exports.getAllClasses = async (req, res, next) => {
    try {
        const data = await classUsecase.getAllClasses();

        res.status(200).json({
            message: "Classes retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getClassById = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (!id) {
            throw { statusCode: 400, message: "Invalid class id" };
        }

        const data = await classUsecase.getClassById(id);

        res.status(200).json({
            message: "Class retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createClass = async (req, res, next) => {
    try {
        const payload = req.body;

        if (!payload) {
            throw { statusCode: 400, message: "Invalid payload" };
        }

        validateClass(payload);

        const data = await classUsecase.createClass(payload);

        res.status(201).json({
            message: "Class created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateClass = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const payload = req.body;

        if (!id || !payload) {
            throw { statusCode: 400, message: "Invalid class id or payload" };
        }

        validateClass(payload);

        const data = await classUsecase.updateClass(id, payload);

        res.status(200).json({
            message: "Class updated successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteClass = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (!id) {
            throw { statusCode: 400, message: "Invalid student id" };
        }

        const data = await classUsecase.deleteClass(id);

        res.status(200).json({
            message: "Class deleted successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};
