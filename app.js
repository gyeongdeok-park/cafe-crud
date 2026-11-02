
const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// 메인 페이지
app.get("/", (req, res) => {
  res.redirect("/menus");
});

// 메뉴 조회
app.get("/menus", async (req, res) => {
  try {
    const [menus] = await db.query(
      "SELECT * FROM menus ORDER BY id ASC"
    );
    res.render("menus", { menus });
  } catch (err) {
    console.error(err);
    res.status(500).send("조회 오류");
  }
});

// 메뉴 추가
app.post("/menus/add", async (req, res) => {
  try {
    const { name, price, category } = req.body;

    await db.query(
      "INSERT INTO menus (name, price, category) VALUES (?, ?, ?)",
      [name, price, category]
    );

    res.redirect("/menus");
  } catch (err) {
    console.error(err);
    res.status(500).send("추가 오류");
  }
});

// 메뉴 수정
app.post("/menus/update/:id", async (req, res) => {
  try {
    const { name, price, category } = req.body;

    await db.query(
      "UPDATE menus SET name=?, price=?, category=? WHERE id=?",
      [name, price, category, req.params.id]
    );

    res.redirect("/menus");
  } catch (err) {
    console.error(err);
    res.status(500).send("수정 오류");
  }
});

// 메뉴 삭제
app.post("/menus/delete/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM menus WHERE id=?",
      [req.params.id]
    );

    res.redirect("/menus");
  } catch (err) {
    console.error(err);
    res.status(500).send("삭제 오류");
  }
});


async function startServer() {
  try {
    // MySQL 연결 확인
    await db.query("SELECT 1");

    console.log("MySQL 연결 성공!");

    app.listen(PORT, () => {
      console.log(`서버 실행: http://localhost:${PORT}/menus`);
    });

  } catch (err) {
    console.error("MySQL 연결 실패:", err.message);
    process.exit(1);
  }
}

startServer();


