const crypto = require("crypto");
const path = require("path");
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { uploader } = require("../../helpers/cloudinary");
const {
    getFromCache,
    saveToCache,
    removeFromCache,
} = require("../../helpers/redis");

exports.getUserById = async (id) => {
    const keyID = `user:${id}`;
    const cacheData = await getFromCache(keyID);

    if (cacheData) {
        return cacheData;
    }

    const data = await User.findByPk(id);

    if (!data) {
        throw { statusCode: 404, message: `User with id ${id} not found` };
    }

    await saveToCache(keyID, data, 300);

    return data;
};

exports.getUserByEmail = async (email) => {
    const keyEmail = `user:${email}`;
    const cacheData = await getFromCache(keyEmail);

    if (cacheData) {
        return cacheData;
    }

    const options = {
        where: { email },
    };
    const data = await User.findOne(options);

    await saveToCache(keyEmail, data, 300);

    // bisa juga menggunakan cara ini mengembalikan data dengan dataValues
    // return data.dataValues;
    return data;
};

exports.createUser = async (payload) => {
    payload.password = await bcrypt.hash(payload.password, 10);

    if (payload.photo) {
        const { photo } = payload;

        photo.publicId = crypto.randomBytes(16).toString("hex");

        photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

        const imageUpload = await uploader(photo);
        payload.photo = imageUpload.secure_url;
    }

    const data = await User.create(payload);

    const keyID = `user:${data.id}`;
    await saveToCache(keyID, data, 300);

    const keyEmail = `user:${data.email}`;
    await saveToCache(keyEmail, data, 300);

    return data;
};
