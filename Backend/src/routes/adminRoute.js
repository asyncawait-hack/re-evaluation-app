const express = require("express");
const { addAdminStudent } = require("../controllers/adminStudentController.js");
const { addQuestionPaperController } = require("../controllers/addQuestionPaper.js");
const uploader = require('../middlewares/multerMiddlewares');
const adminRouter = express.Router();

adminRouter.post("/addStudent", addAdminStudent);
// adminRouter.post("/add-question-paper", uploader.single('questionPdf'),addQuestionPaperController);
adminRouter.post("/add-question-paper", (req,res)=>{
    console.log("Requset body : ",req.body);
    console.log("Hello doston!!")
});
module.exports = adminRouter;
