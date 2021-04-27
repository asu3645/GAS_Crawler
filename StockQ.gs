function GetStockQCurrancy() {
  var date = new Date();
  if(!(new Date().getDay() > 0 && new Date().getDay() < 6)){
   return; 
  }
  if(!(new Date().getHours() > 8 && new Date().getHours() < 16)){
    return;
  }
  
  var cheerio = cheeriogasify.require('cheerio'),
      response = UrlFetchApp.fetch("http://m.stockq.org/currency.php"),
      $ = cheerio.load(response.getContentText());
  var msg = "貨幣　匯率　漲跌　比例";
  msg += GetStock($('td:contains("美元/台幣")').eq(1).siblings(), "美元/台幣");
  msg += GetStock($('td:contains("美元/日圓")').eq(1).siblings(), "美元/日圓");
  msg += GetStock($('td:contains("歐元/美元")').eq(1).siblings(), "歐元/美元");
  msg += GetStock($('td:contains("澳幣/美元")').eq(1).siblings(), "澳幣/美元");
  
  SendLine(msg, "stockQ",true);
}

function GetStock(Data, Curr){
  Curr = Curr.replace(/[幣元圓]/g,'');
  return "\n" + Curr + " " + Data.eq(0).html() + " " + Data.eq(1).children().html() + " " + Data.eq(2).children().html();
}

