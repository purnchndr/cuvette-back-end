const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Full Time', 'Part Time', 'Remote', 'Contract', 'Internship'],
    required: true,
  },
  remote: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

// const a = {
//   "name": "test job",
//   "logo": "https://logo.com",
//   "position": "SDE2",
//   "salary": 10000000,
//   "jobType": "Remote",
//   "remote": "true",
//   "description": "This is SDE job",
//   "about": "This is test job",
//   "skills": "Java, SQL, Node, React, Javascript",
//   "information": "WE need to fill this job immediately"
// }
