 
const uuid = require('uuid');
const mailService = require('./mail-service'); 
const DB = require('../db/index'); 
const UserDto = require('../dtos/user-dto'); 
const ApiErr = require('../exeptions/api-error');
const S3 = require('aws-sdk/clients/s3') 
const path = require('path');
const serviceFunction = require("../service_functions")
const config = require('config');  
const url_api = config.get('Server.URL.ACTIVATIOLINK'); 
const url_client = config.get('Server.URL.CLIENT'); 

// const randomNumberRange = require('random-number-range');
 
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const isEmptyObject = (obj) => {
  for (var i in obj) { 
      if (obj.hasOwnProperty(i)) {
          return false;
      }
  }
  return true;
}

class UserService {

  async registration (login, password,res, cookies) {
    try {
      const condidate = await DB.searchInTables('users_list_registration',{ login });
      if(condidate) {
        throw ApiErr.BadRequest(`Пользователь с почтовым адресом ${login} уже существует`);
      } else {
        const hashPassword = await bcrypt.hash(password, random(1,10)); 
        let result = {}
        const activationLink = uuid.v4(); 
 
        const user = await DB.addInTables('users',{ login, email:login, password : hashPassword, isActivated: false, activationLink, }); 
     
        result = { 
          ...serviceFunction.removeEmpty(user, 'Users'),   
          ...serviceFunction.removeEmpty(serviceFunction.getObjkey(user,'AuthInfos',false), 'AuthInfos'),  
          ...serviceFunction.removeEmpty(user.Profiles,'Profiles'),   
        }; 
    
        const tokens = tokenService.generateToken({ login: serviceFunction.removeEmpty(serviceFunction.getObjkey(user,'AuthInfos',false), 'AuthInfos').login, userId: serviceFunction.removeEmpty(user,'Users').id }) 
     
        const update_token = await DB.updateModelTables(serviceFunction.getObjkey(user,'AuthInfos',false),{
          id: serviceFunction.removeEmpty(condidate, 'AuthInfos').id,
          refreshToken: tokens.refreshToken,
          accessToken: tokens.accessToken
        })

        result.accessToken = update_token.accessToken
        result.refreshToken = update_token.refreshToken
    
        mailService.sendAcnivationMail(res,login,`${url_api}api/activate/${activationLink}`); 
   
        return { 
          user: result 
        }
      }
    } catch(e) {
      throw ApiErr.BadRequest(e.message)
    }
  }

  async login(login, password) {
    try { 
      const condidate = await DB.searchInTables('user_info',{ login });
      let result = {}
      if(!condidate) {
        throw ApiErr.BadRequest(`Пользователь не найден необходимо: `);
      } else {
        
        const isPassEquals = await bcrypt.compare(password,condidate.password);

        if(!isPassEquals) {
          throw ApiErr.BadRequest(`Неверный пароль повторите ввод: `);
        }
  
        result = {  
          ...serviceFunction.removeEmpty(condidate, 'AuthInfos'),  
          ...serviceFunction.removeEmpty(serviceFunction.getObjkey(condidate,'Profiles',false), 'Profiles'),  
        };  
 
        const tokens = tokenService.generateToken({ login: result.login, userId: result.id }) 
 
        const update_token = await DB.updateModelTables(condidate,{
          id: result.id,
          refreshToken: tokens.refreshToken,
          accessToken: tokens.accessToken
        })
 
        let pages = []

        serviceFunction.getObjkey(serviceFunction.getObjkey(condidate,'Profiles',false),'Pages',false).map((item) => {
          pages.push(serviceFunction.removeEmpty(item, 'Pages'))
        })

        result.pages = pages;
        result.accessToken = update_token.accessToken
        result.refreshToken = update_token.refreshToken

        return { user: result }
      }
    } catch(e) {
      throw ApiErr.BadRequest(e.message)
    } 
  }

  async forgot(email) {
    try {
      const condidate = await DB.searchInTables('users',{ email });
      if(!condidate) {
        throw ApiErr.BadRequest(`Пользователь не зарегистрирован: `);
      } else {
        const spliting = uuid.v4();
        var newForgotPass = spliting.split('-')[0];  
        const hashPassword = await bcrypt.hash(newForgotPass, random(1,10)); 
        mailService.sendForgotPass(email, newForgotPass);
        await DB.updateModelTables(condidate,{ password: hashPassword }); 
 
        return { msg: 'Новый пароль отправлен на почту, если не пришло проверьте спам.' }
        // return { ...data } $2b$07$S0/wDQCQSjwpkpnGJyv3YeZki4fVdG7eOa6.j.Ep66hpAokWQS1oq
      }
    } catch(e) { 
      throw ApiErr.BadRequest(e.message)
    } 
  }
 
  async addMoney(email, sum) {
    try { 
      const condidate = await DB.searchInTables('users',{ email }); 
      if(condidate) {
        const userDto = new UserDto(condidate);   
        await DB.updateModelTables(condidate,{ balancePartner: Number(userDto.balancePartner) + Number(sum) }); 
        return { 
          user: userDto
        }
      } else { 
        throw ApiErr.BadRequest(`Пользователь не найден`);
      }
    } catch(e) {
      throw ApiErr.BadRequest(e.message)
    } 
  }
 
  async setOutMoney(email, obj) {
    try { 
      const condidate = await DB.searchInTables('users',{ email }); 
      if(condidate) { 
        var t = await DB.updateModelTables(condidate,{ history: JSON.stringify(obj) }); 
        const newUserDto = new UserDto(t); 
        return { 
          user: newUserDto
        }
      } else { 
        throw ApiErr.BadRequest(`Пользователь не найден`);
      }
    } catch(e) {
      throw ApiErr.BadRequest(e.message)
    } 
  }

 
  async setPageInfo(pageInfo, pageId) {
   
    try { 
      const {
        photo, 
        initialDeath, 
        birthlocation,
        deathlocation,
        nationality,
        career,
        pagelink,
        secondhalf,
        children,
        education,
        birthdate,
        deathdate, 
        epity,
        media,
      } = pageInfo

 
      const page = await DB.searchInTables('page_id', pageId ); 
     
      if(page) { 
        var newpage = await DB.updateModelTables(page, { 
          photo, 
          initialDeath,
          birthlocation,
          deathlocation,
          nationality,
          career,
          secondhalf, 
          children: JSON.stringify(children),
          education,
          birthdate,
          deathdate, 
          epity,  
          pagelink,
          media: JSON.stringify(media) 
        }); 
        const newPageDto = new PageDto(newpage);  
        return { 
          page: newPageDto
        }
      } else { 
        throw ApiErr.BadRequest(`Данной страницы не существует`);
      }
    } catch(e) {
      throw ApiErr.BadRequest(e.message)
    } 
  }
 
  async getPageInfo(pageId) {
   
    try { 
     
      const page = await DB.searchInTables('page_id', pageId ); 
 
      if(page) { 
        const newPageDto = new PageDto(page);  
        return { ...newPageDto }
      } else { 
        throw ApiErr.BadRequest(`Данной страницы не существует`);
      }
    } catch(e) {
      throw ApiErr.BadRequest(e.message)
    } 
  }
 
  async deletePage(pageId) {
   
    try {  
      const page = await DB.searchInTables('page_id', pageId ); 
      const bucketParams = { Bucket: '430133e2-5ac8175c-9526-49bf-adaa-a31193a1248c' } // <--- заменить
      if(page) {  

        await this.emptyS3Directory (bucketParams, `${pageId}`)  
 

        await DB.removeInTables(page) 
        return true
      } else { 
        throw ApiErr.BadRequest(`Данной страницы не существует`);
      }
    } catch(e) {
      throw ApiErr.BadRequest(e.message)
    } 
  }
 
  async decMoney(email, sum) {
    try { 
      const condidate = await DB.searchInTables('users',{ email }); 
      if(condidate) {
        const userDto = new UserDto(condidate);   
        const newDTO = await DB.updateModelTables(condidate,{ balancePartner: Number(userDto.balancePartner) - Number(sum) }); 
        const newUserDto = new UserDto(newDTO); 
        return { 
          user: newUserDto
        }
      } else { 
        throw ApiErr.BadRequest(`Пользователь не найден`);
      }
    } catch(e) {
      throw ApiErr.BadRequest(e.message)
    } 
  }
 
  async writePayProductsUsers (obj) { 
    try {
      const condidate = await DB.searchInTables('users', { id: obj.id } );
      if(condidate) {  
        await DB.updateModelTables(condidate,{ isProductPay: obj }); 
      } else {
        throw ApiErr.BadRequest(`Пользователя с данным ${obj.id} не существует`);
      }
    } catch(e) {
      throw ApiErr.BadRequest(e.message);
    }
  } 
 
  async getUserInfo(userId) { 
 
    let result = {}
   
    const user = await DB.searchInTables('user_id', userId ); 
 
    result = {  
      ...serviceFunction.removeEmpty(user, 'Profiles'),    
    };  
    console.log(result,'&&&&&')
    return { user: result } 
  }
 
  async getAppInfo() { 
 
    try {
     
      const condidate = await DB.searchInTables('user_admin',{ id: 1 });
 
      let result = {}
 
      if(!condidate) {
        throw ApiErr.BadRequest(`Пользователь не найден`);
      } else {
     
        result = {  
          ...serviceFunction.removeEmpty(condidate, 'Admin_users'),   
        };  
 
        return { 
          chanels: result.chanels,
          halving_count: result.halving_count,
          halving_earn: result.halving_earn,
          count_coin_all: result.count_coin_all,
          total_coin_mine: result.total_coin_mine,
          bonus: result.bonus,
          task_main: result.task_main,
          tasks: result.tasks,
        }
      }
   
    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Пользователь не найден необходимо пройти регистрацию: `);
    }
    
  }
 
  generateNumArr(min,max,count,norepeat,win,sort) {  

    var numbers = [];   
    var n, p;
    var lock = false 
    let maxcount = 0;
    let resultArr = []

    if(count > max) { maxcount = max } else { maxcount = count }

    for (let i = 0; i < maxcount; i++) {

      do {
        if(win && !lock) { 
          if(win > max) {
            numbers.push(max);
          } else {
            numbers.push(win);
          }
          lock = true
          break;  
        } else {
          n = randomNumberRange({ min, max }) 
          if(norepeat){ 
            p = numbers.includes(n);
            if(!p){
              numbers.push(n);
            }
          } else {
            p = false;
            numbers.push(n);
          }
        }
      }
      while(p);
    }

    if(sort) {
      resultArr = numbers.sort((a, b) => a - b);
    } else {
      resultArr = numbers
    }
    
    return resultArr
  }  
 
  async getRandomNumbers(generateInfo) { 
    try {  
      const { 
        min,
        max,
        count,
        norepeat, 
        win,
        sort
      } = generateInfo 
     
      return this.generateNumArr(min, max, count, norepeat, win, sort);

    } catch(e) {
      throw ApiErr.BadRequest(e.message)
    } 
  } 
}

module.exports = new UserService();
