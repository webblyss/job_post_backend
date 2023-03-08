const express = require("express");
const router = express.Router()
const JobPosting = require("./module")
const JobApplication = require("./applymodule");
const multer = require('multer');


// POST ALL JOBS
router.post('/postJob', async (req, res) => {
    try {
      const newJobPosting = new JobPosting({
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        salary: req.body.salary,
        description: req.body.description,
        requirements: req.body.requirements,
        responsibilities: req.body.responsibilities
      });
  
      const savedJobPosting = await newJobPosting.save();
      res.status(201).json(savedJobPosting);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
//   GET ALL JOB POST
  router.get('/', async (req, res) => {
    try {
      const jobPostings = await JobPosting.find();
      res.json(jobPostings);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });





//   APPLY FOR JOBS

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('File format not supported.'), false);
  }
};
const upload = multer({ storage, fileFilter });

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const newJobApplication = new JobApplication({
      name: req.body.name,
      email: req.body.email,
      resume: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      },
      coverLetter: req.body.coverLetter,
      jobPosting: req.body.jobPosting
    });
    const savedJobApplication = await newJobApplication.save();
    res.status(201).json(savedJobApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


  module.exports = router;
