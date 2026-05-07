const supabase = require("../utils/supabase");
require("dotenv").config();

const saveimg = async (req, res, next) => {
  try {
    const file = req.files.file;

    const filename = Date.now() + "_" + file.name;

    const { data, error } = await supabase.storage
      .from("img")
      .upload(filename, file.data, {
        contentType: file.mimetype,
      });

    if (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
      return;
    }

    const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/img/${filename}`;

    req.img = imageUrl;

    next();
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Upload Fail",
    });
  }
};

module.exports = { saveimg };
