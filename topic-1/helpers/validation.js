exports.validateClass = (payload) => {
    if (!payload.name || typeof payload.name !== "string") {
        throw {
            statusCode: 400,
            message: "Class name is required and must be a string",
        };
    }
};

exports.validateStudent = (payload, method) => {
    // For PUT method, name and class_id are required and must be of correct type
    if (method === "PUT" || method === "POST") {
        if (!payload.name || typeof payload.name !== "string") {
            throw {
                statusCode: 400,
                message: "Student name is required and must be a string",
            };
        }
        if (!payload.class_id || typeof payload.class_id !== "number") {
            throw {
                statusCode: 400,
                message: "Student class_id is required and must be a number",
            };
        }
    }

    // For PATCH method, if name or class_id are provided, they must be of correct type
    if (method === "PATCH") {
        if (payload.name !== undefined && typeof payload.name !== "string") {
            throw {
                statusCode: 400,
                message: "Student name must be a string",
            };
        }
        if (
            payload.class_id !== undefined &&
            typeof payload.class_id !== "number"
        ) {
            throw {
                statusCode: 400,
                message: "Student class_id must be a number",
            };
        }
    }
};
