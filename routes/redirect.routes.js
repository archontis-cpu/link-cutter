const { Router } = require("express");
const Link = require("../models/Link");

const router = Router();

router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks++;
      await link.save();

      return res.redirect(link.from);
    }

    res.status(400).json("Cannot find link");
  } catch (error) {
    res.status(500).json({
      message: "Something wrong happened when get link with given code",
    });
  }
});

module.exports = router;
