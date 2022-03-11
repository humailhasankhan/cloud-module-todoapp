const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5050;

//middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client", "build")));
// required to serve SPA on heroku production without routing problems; it will skip only 'api' calls
if (process.env.NODE_ENV === "production") {
  app.get(/^((?!(api)).)*$/, (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

//ROUTES

//get all Todos

app.get("/api/todos", async (req, res) => {
  response.header("Access-Control-Allow-Origin", "*");
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/api/todos/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a todo

app.post("/api/todos", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/api/todos/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/api/todos/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
