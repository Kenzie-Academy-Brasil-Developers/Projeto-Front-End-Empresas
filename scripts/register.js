// ---------------------------------------------------requests>
const requestHeaders = {
    'Content-type': 'application/json'
}

async function newUser (body) {
    const newUser = await fetch ('http://localhost:3333/employees/create', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(body)
    })
    .then(async (res)=>{
        if(res.ok){
                toast(green, 'Cadastrado')
                setTimeout(() => {
                    location.replace('/pages/login.html')
                  }, 1300)
            
           return res.json()
        } else {
            toast(red, 'Nome ou e-mail já cadastrado')
        }
    })
    return newUser
}


// ---------------------------------------------------<requests
const handleButtons=()=>{
    const homeBtn=document.querySelector('.button1');
    const loginBtn=document.querySelector('.button2');
    const backBtn=document.querySelector('.modal__button2');

    homeBtn.addEventListener('click', (click)=>{
        location.replace('/pages/homePage.html')
        localStorage.removeItem('token')
        localStorage.removeItem('adm')
    })
    loginBtn.addEventListener('click', (click)=>{
        location.replace('/pages/login.html');
    })
    backBtn.addEventListener('click', (click)=>{
        location.replace('/pages/homePage.html');
    })
}

async function handleRegister (){
    const inputs=document.querySelectorAll(".input")
    const button=document.querySelector('.modal__button1')

    let body={};
    let count=0;
    button.addEventListener('click', async (e)=>{
        e.preventDefault()

        inputs.forEach(input=>{
            if(input.value.trim()===''){
                count++   
            }
            body[input.name] = input.value
        })
        
        if(count != 0){
            count = 0;
            toast(red, 'Preencha todos os campos')
        } else {
            newUser(body)
            
        }
    })
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




// ------------------------------------------------------functioncall
handleButtons()
handleRegister()