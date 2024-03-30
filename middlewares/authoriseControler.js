const fs = require("fs");

const authorizationController = (req, res, next) => {
  const filePath = path.resolve(__dirname, "../permission.json");
  const allRoles = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  if (
    req.body.role &&
    allRoles[req.body.role] &&
    allRoles[req.body.role].permittedMethod.includes(req.method) &&
    allRoles[req.body.role].permittedRoutes.includes(req.url)
  ) {
    next();
  } else {
    res.status(403).send({ isError: true, Msg: "You are not authorized" });
  }
};

module.exports = {
  authorizationController,
};
