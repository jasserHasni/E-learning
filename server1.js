require("dotenv").config();
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const multer = require("multer");
const cors = require("cors");
const app = express();
const PORT = 8082;

const mongoDB = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWD}@cluster0.zrsjpc9.mongodb.net/`;

console.log(process.env.MONGO_USERNAME);

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const documentSchema = new mongoose.Schema({
  institut: String,
  Matieres: Array,
  img: String,
  description: String,
  link: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  password: String,
  niveau: String,
});

const institutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  university: {
    type: String,
    required: true,
    enum: ["University A", "University B", "University C"], // replace with actual university names
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
});

const requestSchema = new mongoose.Schema({
  email: String,
  option2: String,
  option3: String,
  num: String,
  aut: String,
  status: {
    type: String,
    enum: ["accepted", "waiting", "not valid"],
    default: "waiting",
  },
});

const request1Schema = new mongoose.Schema({
  email: String,
  num: String,
  aut: String,
  seance: String,
  status: {
    type: String,
    enum: ["accepted", "waiting", "not valid"],
    default: "waiting",
  },
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  num: {
    type: String,
    required: true,
  },
  meet: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  linkdocs: {
    type: String,
    required: true,
  },
});

const Request = mongoose.model("Request", requestSchema);
const Request1 = mongoose.model("Request1", request1Schema);
const User = mongoose.model("User", userSchema);
const Document = mongoose.model("documents", documentSchema);
const Institut = mongoose.model("institut", institutSchema);
const Event = mongoose.model("Event", eventSchema);

const downloadsDir = path.join(__dirname, "downloads");
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, downloadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function checkUser(req, res, next) {
  if (req.cookies.userData) {
    res.locals.loggedIn = true;
    res.locals.userData = req.cookies.userData;
  } else {
    res.locals.loggedIn = false;
  }
  next();
}

app.use(checkUser);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/reaserch", (req, res) => {
  res.render("reaserch");
});

app.get("/courses", (req, res) => {
  res.render("courses");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/cards", (req, res) => {
  const userData = req.cookies.userData
    ? JSON.parse(req.cookies.userData)
    : null;

  if (!userData) {
    return res.redirect("/login");
  }
  res.render("cards");
});
app.get("/calendar", (req, res) => {
  const userData = req.cookies.userData
    ? JSON.parse(req.cookies.userData)
    : null;

  if (!userData) {
    return res.redirect("/login");
  }
  res.render("calendar");
});

app.get("/api/check-request-seances-status", async (req, res) => {
  const userData = req.cookies.userData;
  if (!userData) {
    res.redirect("/login");
    return;
  }

  const { email } = JSON.parse(userData);

  try {
    const request = await Request1.find({ email });

    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json({ error: "Request not found" });
    }
  } catch (err) {
    console.error("Error fetching request status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/check-request-status", async (req, res) => {
  const userData = req.cookies.userData;

  if (!userData) {
    return res.status(400).json({ error: "User data not found" });
  }

  const { email } = JSON.parse(userData);

  try {
    const request = await Request.find({ email });

    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json({ error: "Request not found" });
    }
  } catch (err) {
    console.error("Error fetching request status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/check-request-waiting", async (req, res) => {
  const userData = req.cookies.userData;

  if (!userData) {
    return res.status(400).json({ error: "User data not found" });
  }

  const { email } = JSON.parse(userData);

  try {
    const requests = await Request.findOne({ email, status: "waiting" });

    if (requests) {
      res.status(200).json({ hasRequest: true });
    } else {
      res.status(404).json({ hasRequest: false });
    }
  } catch (err) {
    console.error("Error fetching request status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/request/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await Request.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(request);
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/request1/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await Request1.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(request);
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/fetchrequests", async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/fetchrequests1", async (req, res) => {
  try {
    const requests = await Request1.find();
    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all events
app.get("/api/events/num/:num", async (req, res) => {
  const { num } = req.params; // Extract 'num' from URL parameters

  try {
    const event = await Event.find({ num }); // Search for event by 'num'
    if (!event) return res.status(404).json({ message: "Event not found" }); // Handle event not found
    res.json(event); // Respond with the found event
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
});

app.get("/api/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ message: "event not found" });
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving event", error });
  }
});

app.get("/api/events/", async (req, res) => {
  try {
    const event = await Event.find(); // Search for event by 'num'
    if (!event) return res.status(404).json({ message: "Event not found" }); // Handle event not found
    res.json(event); // Respond with the found event
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
});

app.delete("/api/events/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.put("/api/events/:id", async (req, res) => {
  try {
    const { title, start, end, num, meet, description, linkdocs } = req.body;

    const updatedEvent = {
      title,
      start,
      end,
      num,
      meet,
      description,
      linkdocs,
    };
    const updatedevent = await Event.findByIdAndUpdate(
      req.params.id,
      updatedEvent,
      { new: true }
    );

    if (!updatedevent) {
      return res.status(404).send({ message: "Event not found" });
    }

    res.status(200).send(updatedevent);
  } catch (error) {
    res.status(500).send({ message: "Error updating event", error });
  }
});
// Add a new event
app.post("/api/events", async (req, res) => {
  const { title, start, end, num, meet, description, linkdocs } = req.body;
  const newEvent = new Event({
    title,
    start,
    end,
    num,
    meet,
    description,
    linkdocs,
  });
  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get the single document by id
app.get("/admin/document/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).send({ message: "Document not found" });
    }
    res.status(200).send(document);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving document", error });
  }
});
// ------------------------------- //

app.get("/admin/document", async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).send(documents);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving documents", error });
  }
});

app.put("/admin/document/:id", upload.single("img"), async (req, res) => {
  try {
    const { institut, Matieres, description } = req.body;
    const updatedData = {
      institut,
      Matieres: Matieres.split(","),
      description,
    };
    if (req.file) {
      updatedData.img = req.file.path;
    }
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.status(200).send(updatedDocument);
  } catch (error) {
    res.status(500).send({ message: "Error updating document", error });
  }
});

app.delete("/admin/document/:id", async (req, res) => {
  await Document.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.post("/admin/document/insert", upload.single("img"), async (req, res) => {
  const { institut, Matieres, description, link } = req.body;

  const newDocument = new Document({
    institut,
    Matieres: Matieres.split(","), // Assuming Matieres is sent as a comma-separated string
    img: req.file ? req.file.path : "", // Using the uploaded file path
    description,
    link,
  });

  try {
    await newDocument.save();
    res.status(201).send(newDocument);
  } catch (error) {
    res.status(500).send({ message: "Error saving document", error });
  }
});
// ------------------------------- //
//          User Routes
// ------------------------------- //

app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users", error });
  }
});

app.get("/admin/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user", error });
  }
});

app.delete("/admin/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// ------------------------------- //
//          Institut Routes
// ------------------------------- //

app.get("/admin/institut", async (req, res) => {
  try {
    const instituts = await Institut.find();
    res.status(200).send(instituts);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving instituts", error });
  }
});

app.get("/admin/institut/:id", async (req, res) => {
  try {
    const institut = await Institut.findById(req.params.id);
    if (!institut) {
      return res.status(404).send({ message: "Institut not found" });
    }
    inst;
    res.status(200).send(institut);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving institut", error });
  }
});

app.post("/admin/institut/insert", async (req, res) => {
  const { name, university, location } = req.body;

  try {
    const newInstitut = new Institut({
      name,
      university,
      location,
    });

    await newInstitut.save();
    res.status(201).send(newInstitut);
  } catch (error) {
    res.status(500).send({ message: "Error saving institut", error });
  }
});

app.put("/admin/institut/:id", async (req, res) => {
  try {
    const { name, university, location } = req.body;
    const updatedData = {
      name,
      university,
      location,
    };

    const updatedInstitut = await Institut.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.status(200).send(updatedInstitut);
  } catch (error) {
    res.status(500).send({ message: "Error updating institut", error });
  }
});

app.delete("/admin/institut/:id", async (req, res) => {
  await Institut.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// ------------------------------- //
// Register and login routes
// ------------------------------- //

app.post("/register", async (req, res) => {
  const { name, email, number, password, password1, niveau } = req.body;

  if (password !== password1) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      number,
      password: hashedPassword,
      niveau,
    });

    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error saving user to database: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      console.log("Password match:", match);

      if (match) {
        res.cookie("userData", JSON.stringify(user), {
          maxAge: 3 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        res.redirect("/");
      } else {
        console.log("Incorrect password");
        res.redirect("/login");
      }
    } else {
      console.log("User not found");
      res.redirect("/login");
    }
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
});

app.post("/cards", upload.single("file"), async (req, res) => {
  const { option2, option3, num, aut } = req.body;
  console.log("Received body:", req.body);

  const userData = req.cookies.userData;

  if (!userData) {
    return res.status(401).send("User not authenticated");
  }

  const { email } = JSON.parse(userData);

  const newCard = new Request({
    email,
    option2,
    option3,
    num,
    aut,
  });

  try {
    await newCard.save();
    res.status(200).send("Demande enregistrée avec succès");
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).send("Error saving data: " + err.message);
  }
});

app.post("/calendar", upload.single("file"), async (req, res) => {
  const { num, aut, seance } = req.body;
  console.log("Received body:", req.body);

  const userData = req.cookies.userData;

  if (!userData) {
    return res.status(401).send("User not authenticated");
  }

  const { email } = JSON.parse(userData);

  const newCard = new Request1({
    email,
    num,
    aut,
    seance,
  });

  try {
    await newCard.save();
    res.status(200).send("Demande enregistrée avec succès");
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).send("Error saving data: " + err.message);
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("userData");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
