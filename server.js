'use strict';

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const riotKey = "RGAPI-1dc6209f-eb56-4912-8256-e86241247540";

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.get("/eid", async (req, res) => {
    const name = req.query.name;
  
    await axios.get("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + encodeURI(name), {
      headers: {"X-Riot-Token": riotKey},
    })
        .then((response) => {
          console.log(response.data.id);
          axios.get("https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/" + encodeURI(response.data.id), {
            headers: {"X-Riot-Token": riotKey},
          })
              .then((response) => {
                console.log(response.data);
                res.send(response.data);
              })
              .catch((error) => {
                console.log(error.message);
                res.send(error.message);
              });
        })
        .catch((error) => {
          console.log(error.message);
          res.send(error.message);
        });
  });
// async function getInfo(eid){
//     const info = '';
//     await axios.get('https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/' + encodeURI(eid), {
//             headers:{'X-Riot-Token': 'RGAPI-27005fbf-01a5-45ea-bb00-218f51912675'}
//         })
//         .then(response => (info = response.data))
//         .catch(error => (console.log(error.message)))
//         return info;
        
// }
app.listen(PORT, HOST);