let httpRequest;
function makeRequest() {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ');
    return false;
  }
  httpRequest.onreadystatechange = alertContents;
  httpRequest.open(
    'GET',
    'localhost'
    // 'https://vmtp91r6k6.execute-api.us-east-2.amazonaws.com/seo/'
  );
  httpRequest.setRequestHeader(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  httpRequest.send();
}

function alertContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    console.log(httpRequest);
    if (httpRequest.status === 200) {
      alert(httpRequest.responseText);
    } else {
      alert('request에 뭔가 문제가 있어요.');
    }
  }
}
const changeUI = () => {
  let ress = [
    { name: 'h1', r: 1 },
    { name: 'os', r: 'ok' },
  ];

  var element = document.getElementById('resList');
  element.innerHTML = '';
  for (let i in ress) {
    console.log(i);
    element.innerHTML += `<p>${ress[i].name}: ${ress[i].r}</p>`;
  }
};

const getRes = () => {
  // makeRequest();

  changeUI();
};
