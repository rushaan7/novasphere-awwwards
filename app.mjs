import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import homeData from "./app/data/home.js";
import footerData from "./app/data/footer.js";
import portfolioData from "./app/data/portfolio.js";
import aboutData from "./app/data/about.js";
import contactData from "./app/data/contact.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 9001;

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("pages/home", {
    template: "home",
    home: homeData,
    footer: footerData
  });
});

app.get("/about", (req, res) => {
  res.render("pages/about", {
    template: "about",
    about: aboutData,
    footer: footerData
  });
});

app.get("/contact", (req, res) => {
  res.render("pages/contact", {
    template: "contact",
    contact: contactData,
    footer: footerData
  });
});

app.get("/portfolio", (req, res) => {
  res.render("pages/portfolio", {
    template: "portfolio",
    portfolio: portfolioData,
    footer: footerData
  });
});

app.get("/work/:id", (req, res) => {
  res.render("pages/work", {
    template: "work",
    id: req.params.id,
    footer: footerData
  });
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
