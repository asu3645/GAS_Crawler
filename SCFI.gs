function GetScfiIndex(){
  const content = UrlFetchApp.fetch("https://en.sse.net.cn/currentIndex?indexName=scfi");
  var data = JSON.parse(content.getContentText()).data;
  var responseText = 'SCFI指數\n';
  responseText += '航線\\日期　' + ConvertIndexDate(data.lastDate) + ' 　' + ConvertIndexDate(data.currentDate);

  data.lineDataList.forEach(function(info){
    var country = '';
    var prevIdx = 0;
    var currIdx = 0;
    var upsNdowns = '';  

    switch(info.properties.lineName_EN){
      case 'Comprehensive Index':
        country = '綜合指';
        break;
      case 'Europe (Base port)':
        country = '歐洲　';
        break;
      case 'Mediterranean (Base port)':
        country = '地中海';
        break;
      case 'USWC (Base port)':
        country = '美西　';
        break;
      case 'USEC (Base port)':
        country = '美東　';
        break;
      default:
        return;
    }

    if(info.lastContent != null)
      prevIdx = info.lastContent.toFixed(1);
    else
      prevIdx = 'N/A';

    if(info.currentContent != null)
      currIdx = info.currentContent.toFixed(1);
    else
      currIdx = 'N/A';

    if(info.absolute != null)
      isUps = info.absolute > 0 ? '↑' : '↓';
    else
      isUps = ' ';

    responseText += '\n' + isUps + country + '　'　+ prevIdx + '\t' + currIdx
  });

  SendLine(responseText, 'SCFI', false, 'https://www.sse.net.cn/index/indexImg?name=scfi&type=english')
  //SendLine('SCSFI(歐洲航線)', sendTarget, 'https://www.sse.net.cn/index/indexImg?name=scsfi&type=euquery_en')
  //SendLine('SCSFI(美西航線)', sendTarget, 'https://www.sse.net.cn/index/indexImg?name=scsfi&type=uswcquery_en')
}

function GetScsfiIndex(){
  const content = UrlFetchApp.fetch("https://en.sse.net.cn/currentIndex?indexName=scsfi");
  var data = JSON.parse(content.getContentText()).data;
  var sendTarget = 'SCFI';

  var responseText = 'SCSFI指數\n'
  responseText += '　　　　' + ConvertIndexDate(data.lastDate) + ' 　　' + ConvertIndexDate(data.currentDate);

  data.lineDataList.forEach(function(info){
    var country = '';
    var prevIdx = 0;
    var currIdx = 0;
    var percent = '';
    var upsNdowns = '';  

    switch(info.properties.lineName_EN){
      case 'Index of Europe service (basic ports)':
        country = '歐洲　';
        break;
      case 'Index of American West Coast service (basic ports)':
        country = '美西　';
        break;
      default:
        return;
    }

    prevIdx = info.lastContent.toFixed(1);
    currIdx = info.currentContent.toFixed(1);
    percent = (info.percentage > 0 ? '+' : '') + info.percentage + '%';
    isUps = info.absolute > 0 ? '↑' : '↓';

    responseText += '\n' + country + '　'　+ prevIdx + '\t' + currIdx + '\n(' + percent + ')';
  });
  SendLine(responseText, sendTarget);
  SendLine('SCSFI(歐洲航線)', sendTarget, false, 'https://www.sse.net.cn/index/indexImg?name=scsfi&type=euquery_en');
  SendLine('SCSFI(美西航線)', sendTarget, false, 'https://www.sse.net.cn/index/indexImg?name=scsfi&type=uswcquery_en');
}

function ConvertIndexDate(date){
  var split = date.split('-');
  return split[1] + '-' + split[2];
}
