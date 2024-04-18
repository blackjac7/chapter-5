const jwt = require("jsonwebtoken");

exports.getTokenFromHeaders = (headers) => {
    const { authorization } = headers;
    const splitToken = authorization.split(" ");

    if (splitToken.length !== 2) {
        throw { statusCode: 401, message: "Unauthorized" };
    }

    if (splitToken[0] !== "Bearer") {
        throw { statusCode: 401, message: "Unauthorized" };
    }

    const token = splitToken[1];

    return token;
};

exports.verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
};
