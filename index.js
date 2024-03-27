const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();

const port = 8000;

app.use(users.urlencoded({ extended : false}));

app.use((req,res,next)=>{
  console.log(req.url);
  // return res.end("Aagya ji");
  next();
})

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul> 
    `;
  res.send(html);
});

//Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" });
  });

app.listen(port, () => console.log("listeing"));
