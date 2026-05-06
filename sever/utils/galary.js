const path = require("path");
require("dotenv").config();

const getFilename = (filename) => {
  let modifilename = new Date().valueOf() + "_" + filename;
  modifilename = modifilename.replace(/\s/g, "_");
  return modifilename;
};

const getsavepath = (filename) =>
  path.join(__dirname, "../public/images/") + filename;

const getimglink = (filename) => process.env.IMG_PATH + filename;

const saveimg = async (req, res, next) => {
  let filename = req.files.file.name;
  filename = getFilename(filename);
  let filepath = getsavepath(filename);
  await req.files.file.mv(filepath);
  let imglink = getimglink(filename);
  req.img = imglink;
  next();
};
module.exports = { saveimg };
