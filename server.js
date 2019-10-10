const express = require("express");
const mongoose = require("mongoose");

// dbpassword = 0m1XcnvrjNXaTGeL

const connection = mongoose.connect("mongodb+srv://admin:0m1XcnvrjNXaTGeL@cluster0-ldmtn.mongodb.net/student_db?retryWrites=true&w=majority", { useNewUrlParser: true });
connection.then(() => console.log("Database is fired!"));
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        trim: true
    },
    studentPin: {
        type: String,
        required: true,
        trim: true
    },
    studentName: String,
    studentMail: String,
    studentGender: String,
    studentHall: String,
    studentRoom: String
});

const StudentLog = mongoose.model("StudentLog", studentSchema);

//Sample data to Push to the database
//StudentLog.create({ studentId: "10654320", studentPin: "00000", studentName: "Mary Jane", studentMail: "mjane@gmail.com", studentGender: "F", studentHall: "", studentRoom: "" });

app.get("/", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    let id = req.body.studentId;
    let pin = req.body.studentPin;

    /*let otherdata = {
        name: req.body.studentName,
        email: req.body.studentMail,
        gender: req.body.studentGender,
        hall: "",
        room: ""
    }*/

    //Look through DB and verify student Id and Pin
    StudentLog.findOne({
        studentId: id,
        studentPin: pin
    }, (err, doc) => {
        if (doc) {
            return res.status(200).render("bookRoom", { data: doc })
        } else if (err) {
            console.log(err);
            res.status(500).render("505");
        } else {
            return res.status(400).render("login");
        }

    });

});

//Send post request of the booked room
app.post("bookRoom", (req, res) => {

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Web server running! http://localhost:3000");
});