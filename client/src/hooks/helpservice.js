 import moment from 'moment'
 
 export const decimal = (n) => 
  new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 2 }).format(n);
 
 export const NowBDformat = moment(moment().add(7, 'hours').format("YYYY-MM-DD HH:mm"))
 
export const convertSeconds = (time) => {
  const milliseconds = time%1000;
  const seconds     = Math.floor((time % (1000 * 60)) / 1000); 
  const minutes     = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const hours       = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const days        = Math.floor(time / (1000 * 60 * 60 * 24));
 
  return {
    seconds,
    minutes,
    hours,
    days,
  }
}

export const differentsTimeOff = (now,last) => {
  return convertSeconds(moment(last).diff(now));
}

export const convertTimeBd = (time) => {
  return moment(time).subtract(7,'hours').format("YYYY-MM-DD HH:mm");
}

export const getWorkedRig = (arr) => {
  let result =[];
  let worked = 0;
  let off = 0;
  for(var i = 0; i < arr.length; i++){
    arr[i].status === 'on' ? worked++ : off++  ;
  }
  result.push(worked);
  result.push(arr.length);
  return result;
}


export const sortStatusCards = (cards) => {
  const offCardsArray = [];
  const onCardsArray = [];
  cards.map(card => {
    if (card.status === "on") {
      onCardsArray.push({
        id: card.id,
        offline_time: convertTimeBd(card.offline_time),
        last_update: convertTimeBd(card.last_update),
        online_time: convertTimeBd(card.online_time),
        answer_last: [{
          type: "lastupdate",
          count:differentsTimeOff(convertTimeBd(card.online_time))
        }, {
          type: "on",
          count:differentsTimeOff(convertTimeBd(card.online_time))
        }, {
          type: "off",
          count:differentsTimeOff(convertTimeBd(card.online_time))
        }]
      });
    } else {
      offCardsArray.push({
        id: card.id,
        offline_time: convertTimeBd(card.offline_time),
        last_update: convertTimeBd(card.last_update),
        online_time: convertTimeBd(card.online_time),
        answer_last: [{
          type: "lastupdate",
          count:differentsTimeOff(convertTimeBd(card.offline_time))
        }, {
          type: "on",
          count:differentsTimeOff(convertTimeBd(card.offline_time))
        }, {
          type: "off",
          diff:differentsTimeOff(convertTimeBd(card.offline_time)),
          time: NowBDformat //формат для базы плюс семь нормально отображается в базе
        }]
      });
    }
  });
  return {
    offCardsArray,
    onCardsArray
  }
}

// export const proccesingArrTimeToCards = (rigs,config,fun) => {
//   let last_update = null;
//   let offline_time = null;
//   let answer = {}
//   rigs.map(async (item,i) => {
//     if (config.toogle_total_temp === "true") {
//       item.temp_arr = generationTempArr(config.toogle_total_temp,config.total_temp_min,config.total_temp_max);
//     } else {
//       item.temp_arr = generationTempArr(config.toogle_total_temp,item.temp_min,item.temp_max);
//     }

//     if(item.status === 'off') {
//       last_update = moment(item.last_online).subtract(getRndInteger(1,3),'minutes');
//       offline_time = NowBDformat;
//       answer = {
//         temp_arr: rigs[i].temp_arr.toString(),
//         last_update, // время запроса карте минус пару минут
//         offline_time,
//         last_online: moment(item.offline_time).subtract(getRndInteger(1,3),'minutes')
//       }
//     } else {
//       last_update = moment(NowBDformat).subtract(getRndInteger(1,3),'minutes');
//       answer = {
//         temp_arr: rigs[i].temp_arr.toString(),
//         last_update,
//         online_time: NowBDformat,
//         last_offline: moment(item.last_online).subtract(getRndInteger(2,5),'minutes')
//       }
//     }
    
//     await axios.put(`/api/putRig?id=${i+1}`, answer)
//   })

//   return rigs;
// }


export const getIOSSaveDateObj = (dateString) => {
  console.log('@!',dateString )

  if(dateString.indexOf('-') > 0) {
   
      var arr = dateString.split(/[- :]/); 
      var date = new Date(arr[0], arr[1]-1, arr[2]);  
  } else {
  
      var arr = dateString.split(/[. :]/);
      var date = new Date(arr[0], arr[1]-1, arr[2]);   
  }
  
  return date;
}