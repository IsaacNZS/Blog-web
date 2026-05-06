const bcrypt = require("bcryptjs");

const Encoder = {
  encode: (password) => bcrypt.hashSync(password, 10),
  compare: (password, hash) => bcrypt.compareSync(password, hash),
};

module.exports = {
  Encoder,
};
