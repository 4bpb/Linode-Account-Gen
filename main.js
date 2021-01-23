const fetch = require('node-fetch');
const queryString = require('query-string');

let password = 'password1234'
let username ='Username1234'
let email = 'blakebein+'+1234+'@gmail.com'
let parsed = queryString.stringify(email);

let stringedemail = (queryString.stringify({email:email}))

let url = queryString.stringifyUrl({url: 'https://login.linode.com/signup?', query: {promo: 'NETCHUCK1006020', email: email}});


function main(url,password,username,stringedemail){


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
      console.log('Generated Cookies')
      let headers = res.headers.raw()['set-cookie']

      signUp(headers,url,password,username,stringedemail)
    } else {
      console.log('Error Generating Cookies')
      main(url,password,username,stringedemail)
    }
  })






    
}



function signUp(headers,url,email,password,username,stringedemail){
  let stringifyemail = queryString.stringify({email: email})
  let stringifypass = queryString.stringify({password: password})
  let stringifyusername = queryString.stringify({username: username})
  console.log(stringifypass)
  let payload = stringifyemail+'&'+stringifyusername+'&'+stringifypass+'&'+'submit=Continue'

  console.log(payload)

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
      body: stringifyemail+'&'+stringifyusername+'&'+stringifypass+'&'+'submit=Continue'
  })    
  .then(res => {
    if(res.status===302){
      console.log('Generated Account')

    } else if (res.status!=302){
      console.log('Error Generating Account')
      let headers = res.headers.raw()['set-cookie']
      console.log(res.status)

      //signUp(headers,url,password,username,stringedemail)
    }
  })
  
}







main(url,password,username,stringedemail)



