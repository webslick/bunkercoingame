const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();   
const config = require('config'); 
const  Schedule  =  require ( 'node-schedule' ) ;
const cookieParser = require('cookie-parser');  
const PORT = config.get('Server.port') || 4000;
const router = require('./routers/router'); 
const SESSION = require('./db/index');
const TGAPI = require ('./tg_api/index'); 
const errorMiddleware = require('./middelwares/error-middleware');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 100000 }));
app.use(bodyParser.json({limit: '500mb'}));

app.use(cors({
    credentials: true, 
      // origin: 'https://bitbunkercoin.ru/', // RELEASE
    origin: 'http://localhost:3000',
    methods: "GET, POST, PATCH, DELETE, OPTIONS",
  },
  {
    headers: {
      'access-control-allow-credentials': true,
      'access-control-allow-headers': "Origin, X-Requested-With, Content-Type, Accept",
      'access-control-allow-methods': "GET, POST, PATCH, DELETE, OPTIONS",
      'access-control-allow-origin': '*'
    }
  }
));
 
app.use(express.json());
app.use(cookieParser()); 

app.use('/api',router);
app.use(errorMiddleware);

if (process.env.NODE_ENV === 'production') {
  app.use('/',express.static(path.join(__dirname,'..','client','build')))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'..','client','build','index.html'))
  })
}
 
app.listen(PORT,async()=>{ 
  var ADMINSETTINGS = await SESSION.getAdminItems(); 
  Schedule.scheduleJob('0 */1 * * *' , async () => {  
    ADMINSETTINGS = await SESSION.getAdminItems();

    if(ADMINSETTINGS.total_coin_mine >= (ADMINSETTINGS.count_coin_all / 10000000) * (+ADMINSETTINGS.halving_count + 1)) {
      console.log('HALVING!'); 
      await SESSION.updateModelTables(ADMINSETTINGS.condidate,{ halving_count:  JSON.stringify((+ADMINSETTINGS.halving_count + 1)), halving_earn: (+ADMINSETTINGS.halving_earn / 2) }); 
    }
  });
 
  if(ADMINSETTINGS?.toogle_status_bot) {
    console.log('TELEGRAMM BOT CONECTION!');  
    TGAPI.initialBotListner(ADMINSETTINGS); 
  } else { 
    console.log('TELEGRAMM BOT NO CONECTION...!');
  } 

  console.log(`Start server ${PORT} on port`);
  console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
  
  // console.log('GLOBAL_UNIQUE_SESSIONS',SESSION.GLOBAL_UNIQUE_SESSIONS);
  // console.log('LOCAL_USER_SESSIONS',SESSION.LOCAL_USER_SESSIONS);
});
