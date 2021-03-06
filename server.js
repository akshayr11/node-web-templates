const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
	const now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile("server.log", log + "\n", err => {
		if (err) {
			console.log(err);
		}
	});
	next();
});
// app.use((req, res, next) => {
// 	res.render("maintainance.hbs");
// });
app.get("/", (req, res) => {
	res.render("home.hbs", {
		pageTitle: "Home Page",
		message: "Welcome to my website!",
		currentYear: new Date().getFullYear()
	});
});
app.get("/about", (req, res) => {
	res.render("about.hbs", {
		pageTitle: "About Page",
		currentYear: new Date().getFullYear()
	});
});
app.get("/bad", (req, res) => {
	res.send({ errorMessage: "Unable to find the page" });
});
app.listen(port, () => {
	console.log(`Server is up at port ${port}`);
});
