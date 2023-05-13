
// ------------------------------------------------------requests>

const requestHeaders = {
    'Content-type': 'application/json'
}

async function loginRequest (loginBody) {
    const tokenRequest = await fetch ('http://localhost:3333/auth/login', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    })
    .then(async (res)=> {
        if(res.ok) {
            const responseJson = await res.json()
            const {isAdm, authToken} = responseJson
            console.log(isAdm)
            localStorage.setItem('token', JSON.stringify(authToken))
            localStorage.setItem('adm', JSON.stringify(isAdm))
            toast(green, 'Login Realizado')
            setTimeout(() => {
                redirect(isAdm)
              }, 1300)
            

        }
        else {
            const responseJson = await res.json()
            toast(red, responseJson.message)
        }
    })
    return tokenRequest
}

// ------------------------------------------------------<requests

const handleButtons = ()=>{
    const homeBtn=document.querySelector('.button1');
    const registerBtn=document.querySelector('.button2');
    const registerBtn2=document.querySelector('.modal__button2')

    homeBtn.addEventListener('click', (click)=>{
        location.replace('../../index.html')
        localStorage.removeItem('token')
        localStorage.removeItem('adm')
    })
    registerBtn.addEventListener('click', (click)=>{
        location.replace('../pages/register.html');
        localStorage.removeItem('token')
        localStorage.removeItem('adm')
    })
    registerBtn2.addEventListener('click', (click)=>{
        location.replace('../pages/register.html');
        localStorage.removeItem('token')
        localStorage.removeItem('adm')
    })
}

const handleLogin = async () => {
    const inputs = document.querySelectorAll('input')
    const button = document.querySelector('.modal__button1')
    const isAdm = localStorage.getItem('adm');

    let loginBody = {};
    let count = 0;

    button.addEventListener('click', async (event)=>{
        event.preventDefault()

        inputs.forEach(input=>{
            if(input.value.trim()===''){
                count++   
            }
            loginBody[input.name] = input.value
        })

        const token = await loginRequest(loginBody)
        if(count != 0){
            count = 0;
            return toast(red, 'Login não realizado')
        } else {
            
            return token
        }
    })
}

const redirect = async (info)=>{
    if (info==true) {
        location.replace("../pages/adminPage.html")
    }
    else if(info==false) {
        location.replace('../pages/userPage.html')
    }


}
// -------------------------------------------------------------toast>
const green='#36B37E';
const red= '#FF5630'

function toast(color, text) {
    const toastContainer = document.querySelector('.toast__container')
    const toastParagraph = document.querySelector('.toast__container > p')
  
    toastParagraph.innerText = text
  
    toastContainer.style = `background-color: ${color}; border-color: ${color}`
  
    toastContainer.classList.remove('hidden')
  }
// -------------------------------------------------------------<toast

handleLogin()
handleButtons()