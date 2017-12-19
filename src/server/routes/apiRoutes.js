import allLearners from '../../client/data/mergeHelper.js';
const router = require('express').Router();

router.use('/leaners', (req, res) => {
  res.json(allLearners);
});

module.exports = router;
