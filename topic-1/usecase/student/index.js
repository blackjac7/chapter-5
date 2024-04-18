const studentRepo = require("../../repositories/student");
const redisRepo = require("../../helpers/redis");

exports.getAllStudents = async () => {
    // Fetch all students
    const data = await studentRepo.getAllStudents();

    if (!data || data.length === 0) {
        throw { statusCode: 404, message: "No students found" };
    }

    return data;
};

exports.getStudentById = async (id) => {
    // Check if the student exists in the cache
    const key = `student-${id}`;
    let data = await redisRepo.getFromCache(key);

    if (!data) {
        // Fetch the student from the database
        data = await studentRepo.getStudentById(id);

        if (!data) {
            throw {
                statusCode: 404,
                message: `Student with id ${id} not found`,
            };
        }

        // Save the fetched data to the cache
        await redisRepo.saveToCache(key, data, 60 * 2);
    }

    return data;
};

exports.createStudent = async (payload) => {
    // Create the student
    const data = await studentRepo.createStudent(payload);

    if (!data) {
        throw { statusCode: 500, message: "Failed to create student" };
    }

    // Save the newly created student to the cache
    const key = `student-${data.id}`;
    await redisRepo.saveToCache(key, data, 60 * 2);

    return data;
};

exports.updateStudent = async (id, payload) => {
    // Check if a student with the given id exists
    const existingStudent = await studentRepo.getStudentById(id);

    if (!existingStudent) {
        throw { statusCode: 404, message: `Student with id ${id} not found` };
    }

    // Update the student
    const data = await studentRepo.updateStudent(id, payload);

    if (!data) {
        throw {
            statusCode: 500,
            message: `Failed to update student with id ${id}`,
        };
    }

    // Save the updated student to the cache
    const key = `student-${id}`;
    await redisRepo.saveToCache(key, data, 60 * 2);

    return data;
};

exports.deleteStudent = async (id) => {
    // Check if a student with the given id exists
    const existingStudent = await studentRepo.getStudentById(id);

    if (!existingStudent) {
        throw { statusCode: 404, message: `Student with id ${id} not found` };
    }

    // Delete the student
    const data = await studentRepo.deleteStudent(id);

    if (!data) {
        throw {
            statusCode: 500,
            message: `Failed to delete student with id ${id}`,
        };
    }

    // Delete the student from the cache
    const key = `student-${id}`;
    await redisRepo.removeFromCache(key);

    return data;
};
