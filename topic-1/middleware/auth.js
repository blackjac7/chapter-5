const { getTokenFromHeaders, verifyToken } = require("../helpers/auth");
const { getProfile } = require("../usecase/auth");

exports.authMiddleware = (roles) => async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return next({
            message: "Please login first",
            statusCode: 401,
        });
    }

    try {
        const token = getTokenFromHeaders(req.headers);

        const decoded = verifyToken(token);

        const user = await getProfile(decoded?.id);

        if (!roles.includes(user?.role)) {
            return next({
                message: "Forbidden",
                statusCode: 403,
            });
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};
