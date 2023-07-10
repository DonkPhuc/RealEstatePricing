const valuation = require("../controllers/valuation.ts");

const router = require("express").Router();

router.post("/valuation", valuation.getValuation);

module.exports = router;
