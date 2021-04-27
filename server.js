'use strict';

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { response } = require('express');
const riotKey = "RGAPI-901f9d47-ee06-4c2e-b0ba-c855be77023c";

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
    const waitingMatches = getMatches(result[0].puuid);

    
    try{
      const tier = await waitingTier;
      const matches = await waitingMatches;
      
      if(tier.length == 0){
        result.push("unranked")
      } else{
        result.push(tier);
      }
      result.push(matches);
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
    async function getMatches(puuid){
      let matchesResult = [];
      let matchesWaiting = [];
      let match = [];
      
      const matches = await axios.get("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + encodeURI(puuid) + "/ids?start=0&count=10", {
        headers: {"X-Riot-Token": riotKey},
      })

      for(var i = 0;i < matches.data.length; i++){
        matchesWaiting[i] = getMatch(matches.data[i]);
        console.log(match[i]);
      }

      try{
        for(var i = 0;i < matchesWaiting.length; i++){
          matchesResult[i] = await matchesWaiting[i];
        }

      } catch(e){
        console.log('failed!');
        console.error(e);
        res.send(e.message);
      }

      if(0){
      // let waitingMatch0 = null;
            // let waitingMatch1 = null;
            // let waitingMatch2 = null;
            // let waitingMatch3 = null;
            // let waitingMatch4 = null;
            // let waitingMatch5 = null;
            // let waitingMatch6 = null;
            // let waitingMatch7 = null;
            // let waitingMatch8 = null;
            // let waitingMatch9 = null;
            // let waitingMatch10 = null;
            // let waitingMatch11 = null;
            // let waitingMatch12 = null;
            // let waitingMatch13 = null;
            // let waitingMatch14 = null;
            // let waitingMatch15 = null;
            // let waitingMatch16 = null;
            // let waitingMatch17 = null;
            // let waitingMatch18 = null;
            // let waitingMatch19 = null;

            // let match0 = null;
            // let match1 = null;
            // let match2 = null;
            // let match3 = null;
            // let match4 = null;
            // let match5 = null;
            // let match6 = null;
            // let match7 = null;
            // let match8 = null;
            // let match9 = null;
            // let match10 = null;
            // let match11 = null;
            // let match12 = null;
            // let match13 = null;
            // let match14 = null;
            // let match15 = null;
            // let match16 = null;
            // let match17 = null;
            // let match18 = null;
            // let match19 = null;

            // if(matches.data[0] != null){
            //   waitingMatch0 = getMatch(matches.data[0]);
            // }
            // if(matches.data[1] != null){
            //   waitingMatch1 = getMatch(matches.data[1]);
            // }
            // if(matches.data[2] != null){
            //   waitingMatch2 = getMatch(matches.data[2]);
            // }
            // if(matches.data[3] != null){
            //   waitingMatch3 = getMatch(matches.data[3]);
            // }
            // if(matches.data[4] != null){
            //   waitingMatch4 = getMatch(matches.data[4]);
            // }
            // if(matches.data[5] != null){
            //   waitingMatch5 = getMatch(matches.data[5]);
            // }
            // if(matches.data[6] != null){
            //   waitingMatch6 = getMatch(matches.data[6]);
            // }
            // if(matches.data[7] != null){
            //   waitingMatch7 = getMatch(matches.data[7]);
            // }
            // if(matches.data[8] != null){
            //   waitingMatch8 = getMatch(matches.data[8]);
            // }
            // if(matches.data[9] != null){
            //   waitingMatch9 = getMatch(matches.data[9]);
            // }
            // if(matches.data[10] != null){
            //   waitingMatch10 = getMatch(matches.data[10]);
            // }
            // if(matches.data[11] != null){
            //   waitingMatch11 = getMatch(matches.data[11]);
            // }
            // if(matches.data[12] != null){
            //   waitingMatch12 = getMatch(matches.data[12]);
            // }
            // if(matches.data[13] != null){
            //   waitingMatch13 = getMatch(matches.data[13]);
            // }
            // if(matches.data[14] != null){
            //   waitingMatch14 = getMatch(matches.data[14]);
            // }
            // if(matches.data[15] != null){
            //   waitingMatch15 = getMatch(matches.data[15]);
            // }
            // if(matches.data[16] != null){
            //   waitingMatch16 = getMatch(matches.data[16]);
            // }
            // if(matches.data[17] != null){
            //   waitingMatch17 = getMatch(matches.data[17]);
            // }
            // if(matches.data[18] != null){
            //   waitingMatch18 = getMatch(matches.data[18]);
            // }
            // if(matches.data[19] != null){
            //   waitingMatch19 = getMatch(matches.data[19]);
            // }

            // try{
            //   if(matches.data[0] != null){
            //     match0 = await waitingMatch0;
            //     matchesResult[0] = match0;
            //   }
            //   if(matches.data[1] != null){
            //     match1 = await waitingMatch1;
            //     matchesResult[1] = match1;
            //   }
            //   if(matches.data[2] != null){
            //     match2 = await waitingMatch2;
            //     matchesResult[2] = match2;
            //   }
            //   if(matches.data[3] != null){
            //     match3 = await waitingMatch3;
            //     matchesResult[3] = match3;
            //   }
            //   if(matches.data[4] != null){
            //     match4 = await waitingMatch4;
            //     matchesResult[4] = match4;
            //   }
            //   if(matches.data[5] != null){
            //     match5 = await waitingMatch5;
            //     matchesResult[5] = match5;
            //   }
            //   if(matches.data[6] != null){
            //     match6 = await waitingMatch6;
            //     matchesResult[6] = match6;
            //   }
            //   if(matches.data[7] != null){
            //     match7 = await waitingMatch7;
            //     matchesResult[7] = match7;
            //   }
            //   if(matches.data[8] != null){
            //     match8 = await waitingMatch8;
            //     matchesResult[8] = match8;
            //   }
            //   if(matches.data[9] != null){
            //     match9 = await waitingMatch9;
            //     matchesResult[9] = match9;
            //   }
            //   if(matches.data[10] != null){
            //     match10 = await waitingMatch10;
            //     matchesResult[10] = match10;
            //   }
            //   if(matches.data[11] != null){
            //     match11 = await waitingMatch11;
            //     matchesResult[11] = match11;
            //   }
            //   if(matches.data[12] != null){
            //     match12 = await waitingMatch12;
            //     matchesResult[12] = match12;
            //   }
            //   if(matches.data[13] != null){
            //     match13 = await waitingMatch13;
            //     matchesResult[13] = match13;
            //   }
            //   if(matches.data[14] != null){
            //     match14 = await waitingMatch14;
            //     matchesResult[14] = match14;
            //   }
            //   if(matches.data[15] != null){
            //     match15 = await waitingMatch15;
            //     matchesResult[15] = match15;
            //   }
            //   if(matches.data[16] != null){
            //     match16 = await waitingMatch16;
            //     matchesResult[16] = match16;
            //   }
            //   if(matches.data[17] != null){
            //     match17 = await waitingMatch17;
            //     matchesResult[17] = match17;
            //   }
            //   if(matches.data[18] != null){
            //     match18 = await waitingMatch18;
            //     matchesResult[18] = match18;
            //   }
            //   if(matches.data[19] != null){
            //     match19 = await waitingMatch19;
            //     matchesResult[19] = match19;
            //   }
            // } catch(e){
            //   console.log('failed!');
            //   console.error(e);
            //   res.send(e.message);
            // }
      }

      return matchesResult;
    };
    async function getMatch(matchId){
      let match = await axios.get("https://asia.api.riotgames.com/lol/match/v5/matches/" + encodeURI(matchId), {
        headers: {"X-Riot-Token": riotKey},
      })
      return match.data;
    };
  });
app.listen(PORT, HOST);