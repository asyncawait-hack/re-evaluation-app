const { registerStudent } = require("../services/studentRegisterService");

async function createStudent(req, res) {
    console.log(req.body);
    try {
        const response = await registerStudent(req.body);
        console.log("here in studentregistercontroller.js")
        console.log(response)
        return res.json({
            message: "successfully resistered the user",
            Success: true,
            data: response,
            statusCode: 201,
            error: {}
        })
    } catch (error) {
        console.log("error from studentregistrationcontroller.js")
        console.log("error message is -> ", error.reason)
        res.json({
            message: error.reason,
            Success: false,
            data: {},
            error: error,
            statusCode: error.statusCode
        })
    }

}

module.exports = {
    createStudent
}