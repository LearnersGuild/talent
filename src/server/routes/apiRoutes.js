import allLearners from '../../client/data/mergeHelper.js';
const router = require('express').Router();

router.use('/learners', (req, res) => {
  res.json(allLearners);
});

module.exports = router;
