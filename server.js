'use strict';

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { response } = require('express');
const riotKey = "RGAPI-877660af-9286-438c-996d-2d3ae95c1d02";

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.get("/", async (req, res) => {
    let result = [];

    try{
      const eid = await userInfo(req.query.name);
      result.push(eid);
    
    } catch(e){
      console.log('failed!');
      console.error(e);
      res.send(e.message);
    }

    const waitingTier = getTier(result[0].id);


    
    try{
      const tier = await waitingTier;
      
      if(tier.length == 0){
        result.push("unranked")
      } else{
        result.push(tier);
      }
      
    } catch(e){
      console.log('failed!');
      console.error(e);
      res.send(e.message);
    }

    res.send(result);


    async function userInfo(name){
      let id = await axios.get("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + encodeURI(name), {
        headers: {"X-Riot-Token": riotKey},
      })
      return id.data;
    };
    async function getTier(id){
      let tier = await axios.get("https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/" + encodeURI(id), {
        headers: {"X-Riot-Token": riotKey},
      })
      return tier.data;
    };
  });
app.listen(PORT, HOST);