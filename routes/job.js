const express = require('express');
const router = express.Router();
const { authUser } = require('../auth/auth');

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
  .post('/', authUser, createJob)
  .delete('/:id', authUser, deleteJob)
  .patch('/:id', authUser, updateJob);

module.exports = router;
