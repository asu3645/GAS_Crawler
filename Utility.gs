function doGet(e){
  try
  {
    if(e != undefined)
    {
      var actionName = e.parameter.action;
      switch(actionName){
        case "stockq":
          GetStockQCurrancy();
          break;
        case "gasolinestat":
          GetgasolinePrice();
          break;
        case "GetScfiIndex":
          GetScfiIndex();
          break;
        default:
          return;
      }
      console.log("Exec : " + actionName);
      return true;
    }
  }
  catch(e)
  {
     
  }
}

function SendLine(msg, Group, AddNewLine, imgUrl = ''){
  var token = "";
  switch(Group){
    case "stockQ":
      token = "A";
      break;
    case "Family":
      token = "B";
      break;
    case "Me":
      token = "C";
      break;
    case "SCFI":
      token = "D";
      break;
  }
  
  var req = {
        'headers': {
            'Authorization': 'Bearer ' + token,
        },
        'method': 'post',
        'payload': {
          'notificationDisabled':false
        }
  };
  if(AddNewLine)
    req.payload.message = '\n' + msg;
  else
    req.payload.message = msg;

  if(imgUrl.trim() != ''){
    req.payload.imageThumbnail = imgUrl;
    req.payload.imageFullsize = imgUrl;
  }


 UrlFetchApp.fetch('https://notify-api.line.me/api/notify', req); 
}