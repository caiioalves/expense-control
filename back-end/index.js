const express = require('express');
const app = express();
const connection = require('./db/connection');
const cors = require('cors');
const UsersRoute = require('./routes/UsersRoute');
const WalletRoute = require('./routes/WalletRoute');

const port = process.env.PORT || 3001

app.use(express.json());
app.use(cors());

app.use('/user', UsersRoute);
app.use('/wallet', WalletRoute )

connection.sync().then(() => {
  app.listen(port, () => { console.log('O servidor está rodando'); })
}).catch((error) => console.log(error))
