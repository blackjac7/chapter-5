const { register, login, getProfile } = require("../../usecase/auth");

exports.register = async (req, res, next) => {
    try {
        const { email, password, name } = req?.body;
        const photo = req?.files?.photo;

        if (email == "" || !email) {
            return next({
                message: "Email must be filled",
                statusCode: 400,
            });
        }
        if (password == "" || !password) {
            return next({
                message: "Password must be filled",
                statusCode: 400,
            });
        }
        if (name == "" || !name) {
            return next({
                message: "Name must be filled",
                statusCode: 400,
            });
        }

        const data = await register({
            email,
            password,
            name,
            photo,
        });

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const payload = req.body;

        if (payload.email == "" || !payload.email) {
            return next({
                message: "Email must be filled",
                statusCode: 400,
            });
        }
        if (payload.password == "" || !payload.password) {
            return next({
                message: "Password must be filled",
                statusCode: 400,
            });
        }

        const data = await login(payload);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.profile = async (req, res, next) => {
    try {
        const data = await getProfile(req.user.id);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
