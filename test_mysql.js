
const db = require("./db");

async function test() {
  try {
    const [rows] = await db.query("SELECT * FROM menus");
    console.table(rows);
    console.log("MySQL 연결 성공!");
  } catch (err) {
    console.error("MySQL 연결 실패:", err.message);
  } finally {
    await db.end();
  }
}

test();

