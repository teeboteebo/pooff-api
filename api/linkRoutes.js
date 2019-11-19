const express = require("express");
const Link = require("../schemas/Link");

const router = express.Router();

router.get("/api/links/:link", async (req, res) => {
  const link = await Link.findOne({ link: req.params.link });
  console.log(link);
  if (link) {
    await res.status(200).send(link);
  } else {
    res.send({ error: "No link found" });
  }
});

module.exports = router;
