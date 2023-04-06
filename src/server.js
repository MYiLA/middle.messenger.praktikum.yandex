'use strict';
import { commonSettings } from './common/settings';

const express = require('express');

const app = express();
const PORT = commonSettings.port;
// TODO: почитать про dirname и правильно настроить commonSettings.serverDir https://nodejs.org/api/modules.html#modules_dirname
app.use(express.static(commonSettings.serverDir));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
}); 
