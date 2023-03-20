const db = require("../models");
// const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! email is already in use!"
      });
      return;
    }
  });

  next();
};

// checkRolesExisted = (req, res, next) => {
//   if (req.body.roles) {
//     for (let i = 0; i < req.body.roles.length; i++) {
//       if (!ROLES.includes(req.body.roles[i])) {
//         res.status(400).send({
//           message: "Failed! Role does not exist = " + req.body.roles[i]
//         });
//         return;
//       }
//     }
//   }
  
//   next();
// };

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;