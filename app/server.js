let express = require('express');
let path = require('path');
let app = express();
const typeorm = require('typeorm');
require('dotenv').config()



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const connectionObject = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [require('./entities/user')],
  synchronize: true
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.post('/update-profile', async (req, res) => {
  const userObj = req.body
  console.log(userObj);
  const connection = await typeorm.createConnection(connectionObject);
  const repo = connection.getRepository('user')
  await repo.save(userObj)
  await connection.close()
  res.status(200).send(userObj)
})

app.get('/get-profile', async (req, res) => {
  let response = {};
  const connection = await typeorm.createConnection(connectionObject);
  const repo = connection.getRepository('user')
  const user = await repo.findOne({ id: 1 })
  connection.close()
  res.send(user)
});

app.get('/env', function (req, res) {
  res.status(200).send(process.env.TEST)
})

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
