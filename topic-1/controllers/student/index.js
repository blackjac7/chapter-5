const studentUsecase = require("../../usecase/student");
const { validateStudent } = require("../../helpers/validation");

exports.getAllStudents = async (req, res, next) => {
    try {
        const data = await studentUsecase.getAllStudents();

        res.status(200).json({
            message: "Students retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getStudentById = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (!id) {
            throw { statusCode: 400, message: "Invalid student id" };
        }

        const data = await studentUsecase.getStudentById(id);

        res.status(200).json({
            message: "Student retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createStudent = async (req, res, next) => {
    try {
        let payload = req.body;
        const photo = req?.files?.photo;
        payload.class_id = +payload.class_id;

        if (!payload) {
            throw { statusCode: 400, message: "Invalid payload" };
        }

        payload = {
            ...payload,
            photo,
        };

        validateStudent(payload, req.method);

        const data = await studentUsecase.createStudent(payload);

        res.status(201).json({
            message: "Student created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateStudent = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const payload = req.body;

        if (!id || !payload) {
            throw { statusCode: 400, message: "Invalid student id or payload" };
        }

        validateStudent(payload, req.method);

        const data = await studentUsecase.updateStudent(id, payload);

        res.status(200).json({
            message: "Student updated successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteStudent = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (!id) {
            throw { statusCode: 400, message: "Invalid student id" };
        }

        const data = await studentUsecase.deleteStudent(id);

        res.status(200).json({
            message: "Student deleted successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};
