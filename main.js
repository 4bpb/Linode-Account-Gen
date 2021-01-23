const fetch = require('node-fetch');
const queryString = require('query-string');
var qs = require('qs');
var assert = require('assert');
var log = require('./logger')

let password = 'placeholder'





function tasks(tasks){
  let y = 0
  log('Script live','init',false)
  while(tasks>=y){
    let email = 'placeholder+'+getRandomInt(9999999)+'@gmail.com'
    let username ='placeholder'+getRandomInt(9999)
    let url = queryString.stringifyUrl({url: 'https://login.linode.com/signup?', query: {promo: 'NETCHUCK1006020', email: email}});
    main(url,email,password,username,y)
    y++
  }

}




function main(url,email,password,username,y){

  fetch(url, {
      headers: {
          'Host': 'login.linode.com',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'sec-gpc': '1',
          'sec-fetch-site': 'same-site',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-user': '?1',
          'sec-fetch-dest': 'document',
          'referer': 'https://www.linode.com/',
          'accept-language': 'en-US,en;q=0.9'

      }
  })
  
  .then(res => {
    if(res.status===200){
      log('Generated Cookies   Task: '+y,'ok',false)
      let headers = res.headers.raw()['set-cookie']

      signUp(headers,url,email,password,username,y)
    } else {
      log('Error Generating Cookies   Task: '+y,'err',false)
      main(url,email,password,username,y)
    }
  })






    
}



function signUp(headers,url,email,password,username,y){



  fetch('https://login.linode.com/signup', {
      method: 'POST',
      headers: {
          'Host': 'login.linode.com',
          'cache-control': 'max-age=0',
          'upgrade-insecure-requests': '1',
          'origin': 'https://login.linode.com',
          'content-type': 'application/x-www-form-urlencoded',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'sec-gpc': '1',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-user': '?1',
          'sec-fetch-dest': 'document',
          'referer': url,
          'accept-language': 'en-US,en;q=0.9',
          'Cookie': headers
      },
      body: qs.stringify({email: email, username:username, password: password})+'&'+'submit=Continue'
  })  
  .then(res => {
    if(res.status===200){
      log('Generated Account   Task: '+y,'ok',false)

    } else if (res.status===429){
      log('Error Generating Account[BANNED]   Task: '+y,'err',false)


      signUp(headers,url,email,password,username,y)
    }
  })

  
}



function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}





tasks(1)
