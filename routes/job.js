const express = require('express');
const router = express.Router();

const {
  createJob,
  getJob,
  getJobs,
  deleteJob,
  updateJob,
} = require('../controllers/job');

router
  .get('/', getJobs)
  .get('/:id', getJob)
  .post('/', createJob)
  .delete('/:id', deleteJob)
  .patch('/:id', updateJob);

module.exports = router;
