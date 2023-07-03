const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  try {
    const resultUpload = path.join(avatarsDir, `${id}_${originalname}`);
    const result = await Jimp.read(tmpUpload);

    await result.resize(250, 250).writeAsync(tmpUpload);
    await fs.rename(tmpUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", `${id}_${originalname}`);

    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
