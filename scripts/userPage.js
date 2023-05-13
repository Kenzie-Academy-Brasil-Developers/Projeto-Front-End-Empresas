// -----------------------------------------------------requests>
const token = localStorage.getItem('token')
const tokenReal = token.replace(/"/g, '')

const patchHeaders = {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${tokenReal}`

}

export const profile = async () => {
    const profile = await fetch (`http://localhost:3333/employees/profile`, {
        method: "GET", 
        headers: patchHeaders
    })
    .then(async res=>{
        if(res.ok) {
            const responseJson=await res.json()
            const {id, name, email, company_id, department_id}=responseJson
            localStorage.setItem('id', JSON.stringify(id))
            localStorage.setItem('name', JSON.stringify(name))
            localStorage.setItem('email', JSON.stringify(email))
            localStorage.setItem('company_id', JSON.stringify(company_id))
            localStorage.setItem('department_id', JSON.stringify(department_id))

        }else {
            throw new Error('Not Found');
        }
    })
    return profile;
}

export const getCompany = async (id) => {
    const company = await fetch (`http://localhost:3333/companies/readById/${id}`, {
        method: "GET",
        headers: patchHeaders
    })
    .then(response=>{
        if(response.ok) {
            return response.json()
        }else {
            throw new Error('Not Found');
        }
    })
    return company;
}
export const getDept = async (id) => {
    const dept = await fetch (`http://localhost:3333/departments/readById/${id}`, {
        method: "GET",
        headers: patchHeaders
    })
    .then(response=>{
        if(response.ok) {
            return response.json()
        }else {
            throw new Error('Not Found');
        }
    })
    return dept;
}
await profile()
// --------------------------------------------------------<requests
async function renderInfo (){
    const section1=document.querySelector('.section1')
    const section2=document.querySelector('.section2')
    const nameLS=localStorage.getItem('name')
    const emailLS=localStorage.getItem('email')

    const name=document.createElement('p')
    name.className='name'
    name.innerText=nameLS.replace(/"/g, '', )

    const email=document.createElement('p')
    email.className='email'
    email.innerText=emailLS.replace(/"/g, '', )

    section1.append(name, email)

}

async function renderCompInfo(){
    const container=document.querySelector('.section2')
    const eContainer=document.querySelector('.eContainer')
    const company_id=localStorage.getItem('company_id')
    const dept_id=localStorage.getItem('department_id')
    const compIdReal=company_id.replace(/"/g,'')
    const deptIdReal=dept_id.replace(/"/g,'')
    const company=await getCompany(compIdReal)
    const deptId=await getDept(deptIdReal)
    const {employees}=company

    const header=document.createElement('div')
    header.className='section2Header'
    
    const compName=document.createElement('p')
    compName.className='compName'
    compName.innerText=`${company.name} -`

    const dept=document.createElement('p')
    dept.className='dept'
    dept.innerHTML=deptId.name

    employees.forEach(employee => {
        const eDiv=document.createElement('div')
        eDiv.className='eDiv'
        const eName=document.createElement('p')
        eName.innerHTML=employee.name
        eName.className='eName'

        eDiv.append(eName)
        eContainer.append(eDiv)
    })


    
    



    container.append(header)
    header.append(compName, dept)

}

const logout = () =>{
    const btn = document.querySelector('.button1')

    btn.addEventListener('click', (e)=>{
        localStorage.removeItem('token')
        localStorage.removeItem('adm')
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('company_id')
        localStorage.removeItem('department_id')
        toast(green, 'Deslogado')
        setTimeout(() => {
            location.replace('/pages/homePage.html')
          }, 1300)
        
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
renderCompInfo()
renderInfo()
logout()