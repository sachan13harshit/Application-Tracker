const Resume = require("../models/resumeModel");

const addResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  if (!req.body.role) {
    return res.status(400).json({ message: "No role mentioned." });
  }

  const user = req.user;
  try {
    const newResume = new Resume({
      userId: user._id,
      fileName: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
      role: req.body.role,
    });
    await newResume.save();
    res.status(200).json({ message: "Resume successfully uploaded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const displayResume = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const resumes = await Resume.find({ userId: req.user._id }).select("role");
    res.status(200).json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getResume = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const { resumeId } = req.query;
    const matchedResume = await Resume.findOne({
      _id: resumeId,
      userId: req.user._id,
    });

    if (!matchedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.setHeader("Content-Type", matchedResume.contentType);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${matchedResume.fileName}"`
    );
    res.status(200).send(matchedResume.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteResume = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const { resumeId } = req.query;
    const result = await Resume.deleteOne({
      _id: resumeId,
      userId: req.user._id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Resume not found or you do not have permission to delete this resume.",
      });
    }

    res.status(200).json({ message: "Resume successfully deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addResume, displayResume, getResume, deleteResume };