const Student = require("../model/student");
const newStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
    console.log(student, "studddd");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllStudent = async (req, res) => {
  try {
    const { sortBy = "name", order = "desc", limit = 10, page = 1 } = req.query;
    const parseLimit = parseInt(limit);
    const parsePage = parseInt(page);
    // for pagination logic
    const skip = (parsePage - 1) * parseLimit;
    const totalStudent = await Student.countDocuments();
    const student = await Student.find({})
      .sort({
        [sortBy]: order === "desc" ? -1 : 1,
      })
      .skip(skip)
      .limit(parseLimit);
    res.status(200).json({
      message: "Student fetched successfully",
      student,
      totalStudent,
      page: parsePage,
      limit: parseLimit,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).send({ error: "student not found" });
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!student) {
      res.status(400).json({ error: "student not found" });
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      res.status(400).json({ message: "student not found" });
    }
    res.status(200).send({ message: "student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  newStudent,
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
