const Job = require('../models/job');

const createJob = async (req, res, next) => {
  try {
    const body = req.body;
    const jobFields = {
      ...body,
      skills: body.skills.split(',').map(curr => curr.trim()),
    };
    log(jobFields);
    const job = new Job(jobFields);
    await job.save();
    res.status(201).json({ data: job, message: 'job created succesfully' });
  } catch (err) {
    next(err);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().select('-__v');
    res.status(200).json({
      data: jobs,
      message: 'all jobs fetched succesfully',
      result: jobs?.length || 0,
    });
  } catch (err) {
    next(err);
  }
};

const getJob = async (req, res, next) => {
  try {
    const id = req.params.id;
    const job = await Job.findById(id).select('-__v');
    res.status(200).json({ data: job, message: 'job fetched succesfully' });
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const id = req.params.id;
    const job = await Job.findByIdAndDelete(id);
    res.status(202).json({ data: job, message: 'job deleted succesfully' });
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const id = req.params.id;
    let jobFields = req.body;
    if (jobFields.skills)
      jobFields = {
        ...jobFields,
        skills: jobFields.skills.split(',').map(curr => curr.trim()),
      };
    const job = await Job.findByIdAndUpdate(id, jobFields, {
      runValidators: true,
      new: true,
    });
    res.status(202).json({ data: job, message: 'job updated succesfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createJob, getJobs, getJob, deleteJob, updateJob };
