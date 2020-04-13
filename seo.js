const request = require('request');
const cheerio = require('cheerio');

let options = {
  url: 'https://jbee.io/',
  // url: 'https://velog.io/',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
  },
};

request(options, (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html);

    let title = $('title');
    // title = v.replaceAll(title, '\t', '')
    // title = v.replaceAll(title, '\r\n', '')
    // title = v.trim(title)
    // console.log(title.text());
    let ogUrl = $("meta[property='og:url']").attr('content');
    let ogType = $("meta[property='og:type']").attr('content');
    let ogTitle = $("meta[property='og:title']").attr('content');
    let ogDesc = $("meta[property='og:description']").attr('content');
    let ogImage = $("meta[property='og:image']").attr('content');
    console.log(ogUrl);
    console.log(ogType);
    console.log(ogTitle);
    console.log(ogDesc);
    console.log(ogImage);

    let canonical = $("link[rel='canonical']").attr('href');
    console.log(canonical);

    let aList = $('a');
    aList.each(function (i, elem) {
      // console.log(i);
      // console.log(elem);
      console.log($(aList[i]).attr('href'));
    });

    return title;
  } else {
    console.log(error);
    console.log(response.statusCode);
    return error;
  }
});

/*
1. 한 페이지당 h1 태그가 사용되었는지
2. h1 태그가 한번만 사용되었는지
3. og 태그가 다 잘 채워져 있는지.open graph
4. meta description 태그가 잘 채워져 있는지.
5. broken link 몇개인지
6. canonical 태그가 각 페이지마다 사용되었는지
7. 전체 웹사이트 로딩속도 평균

타이틀 보여주기


title
utf8 <meta charset="utf-8">
<meta name="robots" content="index,follow">

*/
