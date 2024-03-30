const jwt = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
    try {
        let token = req.headers?.authorization?.split(" ")[1] || req.cookies.token;
        if (!token) {
            throw new Error("Token not found");
        }

        jwt.verify(token, process.env.secretKey, (err, decoded) => {
            if (err) {
                let refToken = req.headers?.refresh?.split(" ")[1] || req.cookies.refreshToken;
                if (!refToken) {
                    throw new Error("Refresh token not found");
                }

                jwt.verify(refToken, process.env.JWT_SECRET, (refreshErr, refreshDecoded) => {
                    if (refreshErr) {
                        throw new Error("Refresh token verification failed");
                    }

                    const newToken = jwt.sign(
                        { name: refreshDecoded.name, role: refreshDecoded.role, email: refreshDecoded.email },
                        process.env.secretKey,
                        { expiresIn: "1d" }
                    );
                    res.cookie("token", newToken);
                    req.body.name = refreshDecoded.name;
                    req.body.role = refreshDecoded.role;
                    req.body.email = refreshDecoded.email;
                    next();
                });
            } else {
                req.body.name = decoded.name;
                req.body.role = decoded.role;
                req.body.email = decoded.email;
                next();
            }
        });
    } catch (error) {
        console.error("Token validation error:", error);
        res.status(401).send({ isError: true, Msg: "Token Error" });
    }
};

module.exports = { tokenValidator };
