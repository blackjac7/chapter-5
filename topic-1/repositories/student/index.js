const crypto = require("crypto");
const path = require("path");
const { student } = require("../../models");
const { uploader } = require("../../helpers/cloudinary");

exports.getAllStudents = async () => {
    const options = {
        include: ["class"],
    };

    const data = await student.findAll(options);

    return data;
};

exports.getStudentById = async (id) => {
    const options = {
        include: ["class"],
    };

    const data = await student.findByPk(id, options);

    return data;
};

exports.getStudentByName = async (name) => {
    const options = {
        where: { name },
    };

    const data = await student.findOne(options);

    return data;
};

exports.createStudent = async (payload) => {
    if (payload.photo) {
        const { photo } = payload;

        photo.publicId = crypto.randomBytes(16).toString("hex");

        photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

        const imageUpload = await uploader(photo);
        payload.photo = imageUpload.secure_url;
    }

    const data = await student.create(payload);

    return data;
};

exports.updateStudent = async (id, payload) => {
    const options = { where: { id }, returning: true };

    const data = await student.update(payload, options);

    return data[1][0];
};

exports.deleteStudent = async (id) => {
    const options = { where: { id } };

    const data = await student.destroy(options);

    return data;
};
