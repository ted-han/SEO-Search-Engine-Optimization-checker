// Selector
const seoInput = document.querySelector('.seo-input');
const seoButton = document.querySelector('.seo-button');
const seoList = document.querySelector('.seo-list');

// Event Listeners
seoButton.addEventListener('click', startAnalysis);

// Functions
function startAnalysis(e) {
  e.preventDefault();
  let url = seoInput.value;
  if (!url) {
    return;
  }
  makeRequest(seoInput.value);
}

function addSeoList(data) {
  const seoListText = document.createElement('div');
  seoListText.innerText = 'SEO List';
  seoList.appendChild(seoListText);

  for (let v of data) {
    let resContainer = document.createElement('div');
    resContainer.classList.add('res-container');

    let resTitle = document.createElement('div');
    resTitle.innerText = v.title;
    resTitle.classList.add('res-title');
    resContainer.appendChild(resTitle);

    let resDesc = document.createElement('div');
    resDesc.innerText = v.desc;
    resDesc.classList.add('res-desc');
    resContainer.appendChild(resDesc);

    seoList.appendChild(resContainer);
  }
}

function removeAllChild(node) {
  // 현재 있는 노드 삭제
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

let httpRequest;
function makeRequest(url) {
  console.log(`Start: ${url}`);
  httpRequest = new XMLHttpRequest();
  removeAllChild(seoList);
  if (!httpRequest) {
    alert('XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ');
    return false;
  }
  httpRequest.onreadystatechange = alertContents;
  httpRequest.open(
    'POST',
    'https://vmtp91r6k6.execute-api.us-east-2.amazonaws.com/seo/'
  );
  httpRequest.setRequestHeader(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  httpRequest.send(JSON.stringify({ urlName: url }));
}

function alertContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    console.log(httpRequest);
    if (httpRequest.status === 200) {
      console.log(httpRequest.responseText);
      console.log(JSON.parse(httpRequest.responseText));

      // 임시로 아래 temp 사용
      let obj = {
        h1: 'NO',
        'meta description': 'GOOD',
        canonical: 'canonical OK',
      };
      let result = Object.keys(obj).map(function (key) {
        return { title: key, desc: obj[key] };
      });
      result.push({ title: '', desc: '' });

      addSeoList(result);
    } else {
      alert('request에 뭔가 문제가 있어요.');
    }
  }
}
