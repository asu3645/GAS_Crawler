function GetgasolinePrice() {
  var msg = "";
  var cheerio = cheeriogasify.require('cheerio'),
      response = UrlFetchApp.fetch("https://www.cpc.com.tw/Default.aspx"),
      $ = cheerio.load(response.getContentText(),{decodeEntities: false});
  
  var CPCannounce = $('.name').eq(0).html();
  var PriceStat = $('.sys').html();
  var OtherAnnounce = $('.rate').children().html();
  
  var cpc = $('[id=cpc]').eq(0);//中油
  var fpg = $('[id=cpc]').eq(1);//台塑
  
  msg += CPCannounce + PriceStat;
  msg += "\n" + OtherAnnounce;
  
  SendLine(msg, "Me",true)
}
