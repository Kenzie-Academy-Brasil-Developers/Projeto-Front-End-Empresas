
// --------------------------------------------------requests>
const baseUrl = 'http://localhost:3333'
const token = localStorage.getItem('token')
const tokenReal2 = token.replace(/"/g, '')

const reqHeaders = {
    'Authorization': `Bearer ${tokenReal2}`
}
const patchHeaders = {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${tokenReal2}`

}
const getAllDeptsByCompany = async (id)=>{
    const allDepts = await fetch (`http://localhost:3333/departments/readByCompany/${id}`, {
        method: 'GET',
        headers: reqHeaders
    })
    .then( res =>{
        if(res.ok){
            return res.json()
        } else {
            throw new Error('Not Found')
        }
    })
    return allDepts
}
const getAllDepts = async ()=>{
    const allDepts = await fetch (`http://localhost:3333/departments/readAll`, {
        method: 'GET',
        headers: reqHeaders
    })
    .then( res =>{
        if(res.ok){
            return res.json()
        } else {
            throw new Error('Not Found')
        }
    })
    return allDepts
}
const getAllEmployees = async ()=>{
    const allEmployees = await fetch (`http://localhost:3333/employees/readAll`, {
        method: 'GET',
        headers: reqHeaders
    })
    .then( res =>{
        if(res.ok){
            return res.json()
        } else {
            throw new Error('Not Found')
        }
    })
    return allEmployees
}
const outOfWork = async ()=>{
    const employees = await fetch (`http://localhost:3333/employees/outOfWork`, {
        method: 'GET',
        headers: reqHeaders
    })
    .then(async res =>{
        if(res.ok){
            return res.json()
            
        } else {
            throw new Error('Not Found')
        }
    })
    return employees
}
const getAllCompanies = async () => {
    const allCompanies = await fetch (`http://localhost:3333/companies/readAll`, {
        method: "GET"
    })
    .then(response=>{
        if(response.ok) {
            return response.json()
        }else {
            throw new Error('Not Found');
        }
    })
    return allCompanies;
}
const getADept=async (id)=>{
    const dept = await fetch (`http://localhost:3333/departments/readById/${id}`, {
        method: 'GET',
        headers: patchHeaders
    })
    .then( res =>{
        if(res.ok){
            return res.json()
        } else {
            throw new Error('Not Found')
        }
    })
    return dept
}
const postDept = async (body)=>{
    const newDept = await fetch (`http://localhost:3333/departments/create`, {
        method: "POST",
        headers: patchHeaders,
        body: JSON.stringify(body)
    })
    .then(response=>{
        if(response.ok) {
            
            return response.json()
        }else {
            toast(red, response.message);
        }
    })
    return newDept;
}
const delDepts = async (id)=>{
    const delDept = await fetch (`http://localhost:3333/departments/delete/${id}`, {
        method: 'DELETE',
        headers: patchHeaders
    })
    .then( res =>{
        if(res.ok){
            toast(green, 'Departamento Excluído')
            setTimeout(() => {
                location.reload()
              }, 1300)
            return res.json()
        } else {
            throw new Error('Not Found')
        }
    })
    return delDept
}
const delEmployee = async (id)=>{
    const delEmp = await fetch (`http://localhost:3333/employees/deleteEmployee/${id}`, {
        method: 'DELETE',
        headers: patchHeaders
    })
    .then( res =>{
        if(res.ok){
            return res.json()
        } else {
            throw new Error('Not Found')
        }
    })
    return delEmp
}
const dismissEmployee = async (id)=>{
    const delE = await fetch (`http://localhost:3333/employees/dismissEmployee/${id}`, {
        method: 'PATCH',
        headers: patchHeaders,
    })
    .then( res =>{
        if(res.ok){
            return res.json()

        } else {
            throw new Error('Not Found')
        }
    })
    return delE
}
const hire = async (id, body)=>{
    const hireE = await fetch (`http://localhost:3333/employees/hireEmployee/${id}`, {
        method: 'PATCH',
        headers: patchHeaders,
        body:JSON.stringify(body)

    })
    .then( res =>{
        if(res.ok){
            return res.json()
        } else {
            throw new Error('Not Found')
        }
    })
    return hireE
}  
const updateDept=async(id, body)=>{
    const dept = await fetch (`http://localhost:3333/departments/update/${id}`, {
        method: 'PATCH',
        headers: patchHeaders,
        body: JSON.stringify(body)
    })
    .then( res =>{
        if(res.ok){
            return res.json()
        } else {
            throw new Error('Not Found')
        }
    })
    return dept
} 
const updateEmployee=async(id, body)=>{
    const employee = await fetch (`http://localhost:3333/employees/updateEmployee/${id}`, {
        method: 'PATCH',
        headers: patchHeaders,
        body: JSON.stringify(body)
    })
    .then( res =>{
        if(res.ok){
            return res.json()
        } else {
            throw new Error('Not Found')
        }
    })
    return employee
} 
// ----------------------------------------------------<requests
// ------------------------------------------------------render>

async function depCards() {
    const container = document.querySelector('.section1')
    const companies = await getAllCompanies()
    const depts = await getAllDepts()
    container.innerHTML='';

    depts.forEach((element) => {
        const div = document.createElement('div')
        div.className = 'dept__div'

        const text__div = document.createElement('div')
        text__div.className = 'text__div'

        const name = document.createElement('h3')
        name.className = 'dept__name'
        name.innerHTML=element.name
       

        const description = document.createElement('p')
        description.className = 'dept__description'
        description.innerHTML=element.description

        const companyId = document.createElement('p')
        companyId.className = element.company_id


        let elCompId = document.createElement('p')
        elCompId = companies.find(i=>i.id == companyId.className)
        elCompId.className = 'hide';

        const company = document.createElement('p')
        company.innerHTML=elCompId.name

        const div2 = document.createElement('div')
        div2.className='imgs__div'
// -------------------------------------------------------------------eye
        const eye = document.createElement('img')
        eye.id=element.id
        eye.className='eye'
        eye.src='/assets/Eye.svg'
        eye.addEventListener('click',async ()=>{
            localStorage.setItem('deptID', element.id)
            openModalDeptInfo()
            renderDeptInfo(eye.id)
            selectDeptUser()
            hireBtn(element.id)

        })
// --------------------------------------------------------------------------pencil>
        const pencil = document.createElement('img')
        pencil.className='pencil'
        pencil.src='/assets/pencil.svg'
        pencil.id=element.id
        pencil.addEventListener('click', async ()=>{
            openUpDModal()
            upDept(pencil.id)
        })
        
        const bin = document.createElement('img')
        bin.id=element.id
        bin.className='bin'
        bin.src='/assets/bin.svg'
        bin.addEventListener('click', ()=>{
            openModalDelDept()
            localStorage.setItem('dept', bin.id)
            console.log(bin.id)
        })

        container.append(div)
        div.append(text__div, div2)
        text__div.append(name, description, company)
        div2.append(eye, pencil, bin)

        return div
    });
}
async function depFilterCards(filter) {
    const container = document.querySelector('.section1')
    const companies = await getAllCompanies()
    const depts = await getAllDeptsByCompany(filter)
    container.innerHTML='';

    depts.forEach((element) => {
        const div = document.createElement('div')
        div.className = 'dept__div'

        const text__div = document.createElement('div')
        text__div.className = 'text__div'

        const name = document.createElement('h3')
        name.className = 'dept__name'
        name.innerHTML=element.name
       

        const description = document.createElement('p')
        description.className = 'dept__description'
        description.innerHTML=element.description

        const companyId = document.createElement('p')
        companyId.className = element.company_id


        let elCompId = document.createElement('p')
        elCompId = companies.find(i=>i.id == companyId.className)
        elCompId.className = 'hide';

        const company = document.createElement('p')
        company.innerHTML=elCompId.name
        company.classname='dept__company'

        const div2 = document.createElement('div')
        div2.className='imgs__div'

        const eye = document.createElement('img')
        eye.className='eye'
        eye.src='/assets/Eye.svg'

        const pencil = document.createElement('img')
        pencil.className='pencil'
        pencil.src='/assets/pencil.svg'

        const bin = document.createElement('img')
        bin.className='bin'
        bin.src='/assets/bin.svg'

        container.append(div)
        div.append(text__div, div2)
        text__div.append(name, description, company)
        div2.append(eye, pencil, bin)

        return div
    });
}
async function userCards() {
    const container = document.querySelector('.section2')
    const users = await getAllEmployees()
    const companies = await getAllCompanies()

    localStorage.removeItem('delUserId')
    container.innerHTML='';

    users.forEach((element) => {
        const div = document.createElement('div')
            div.className = 'dept__div'

        const text__div = document.createElement('div')
            text__div.className = 'text__div'

        const name = document.createElement('h3')
            name.className = 'user__name'
            name.innerHTML=element.name

        const div2 = document.createElement('div')
            div2.className='imgs__div'
// ------------------------------------------------------------------------------pencil2
        const pencil = document.createElement('img')
            pencil.className='pencil'
            pencil.src='/assets/pencil.svg'
            pencil.id=element.id
            pencil.addEventListener('click', async ()=>{
                openUpEModal()
                upEmp(pencil.id)
            })
// -------------------------------------------------------------------------------bin2

        const bin = document.createElement('img')
            bin.className='bin2'
            bin.id=element.id
            bin.src='/assets/bin.svg'
            bin.addEventListener('click', async ()=>{
                openModalDelUser(bin.id)
                // localStorage.setItem('delUserId', bin.id)
            })

        container.append(div)
            div.append(text__div, div2)
            text__div.append(name)
            div2.append(pencil, bin)

        return div
    });
}
async function renderDeptInfo (id) {

    const container=document.querySelector('.deptInfoDiv')
    const userContainer=document.querySelector('.userDeptInfo')
    const dept= await getADept(id)
    const {employees}=dept
    selectDeptUser()

    container.innerHTML='';
    userContainer.innerHTML='';


    const name=document.createElement('p')
    name.className='deptInfoName'
    name.innerHTML=dept.name

    const descr=document.createElement('p')
    descr.className='deptInfoDescr'
    descr.innerHTML=dept.description

    const comp=document.createElement('p')
    comp.className='deptInfoComp'
    comp.innerHTML=dept.company.name

    const xdiv=document.createElement('div')
    xdiv.className='xContainer'
    xdiv.addEventListener('click', ()=>{
        closeModalDept()
    })
    const x=document.createElement('p')
    x.innerHTML='X'
    x.className='x'
    x.addEventListener('click', ()=>{
        closeModalDept()
    })

    container.append(name, descr, comp, xdiv)
    xdiv.append(x)

    employees.forEach((employee) =>{
        const uDiv=document.createElement('div')
        uDiv.className='userInfoDiv'

        const eName=document.createElement('p')
        eName.className='deptInfoEName'
        eName.innerHTML=employee.name

        const ecomp=document.createElement('p')
        ecomp.className='deptInfoEComp'
        ecomp.innerHTML=dept.company.name
// ---------------------------------------------------------------------------------button
        const eBtn=document.createElement('button')
        eBtn.id=employee.id
        eBtn.className='deptInfoEBtn'
        eBtn.innerHTML='Desligar'
        eBtn.addEventListener('click',async ()=>{
            dismissEmployee(eBtn.id)
            renderDeptInfo(dept.id)
            toast(green,'Usuário Demitido')
            setTimeout(() => {
                location.reload()
            }, 1300)
        })

        userContainer.append(uDiv)
        uDiv.append(eName, ecomp, eBtn)
    })
}

// ------------------------------------------------------<render
// ---------------------------------------------------------select>


async function select() {
    const companies = await getAllCompanies()
    const select = document.querySelector('select')

    companies.forEach(i=>{
        const option = document.createElement('option')

        option.value=i.id;
        option.innerText=i.name;
        option.className='opt'

        select.appendChild(option)
    })
}
async function select2() {
    const select2 = document.querySelector('.company_id')
    const companies = await getAllCompanies()

    companies.forEach(i=>{
        const option = document.createElement('option')

        option.value=i.id;
        option.innerText=i.name;
        option.className='company_id'
        

        select2.appendChild(option)
        
    })
}
async function selectDeptUser(){
    const select=document.querySelector('.deptInfoSelect')
    const users= await outOfWork()

    select.innerHTML='';
    select.value='todos';

    users.forEach(info =>{
        const option=document.createElement('option')
        option.innerText=info.name
        option.value=info.id

        select.append(option)
    })
}
async function selectClick () {
    const select = document.querySelector('select')
    const container = document.querySelector('.section1')

    select.addEventListener ('change', async () => {
        container.innerHTML='';
        
        if (select.value=='todos') {
            depCards()
        } 
        else {
            const func = await getAllDeptsByCompany(select.value)

            depFilterCards(select.value)
        }
        
    })
}

await select2()
await select()
// ------------------------------------------------------------<select
// -----------------------------------------------create-delete>
async function hireBtn (id){
    const select=document.querySelector('.deptInfoSelect')
    const button=document.querySelector('.deptInfoBtn')
    const container=document.querySelector('.userDeptInfo')
    const body={'department_id': `${id}`}
    const deptId=localStorage.getItem('deptID')

    button.addEventListener('click', async ()=>{
        if(select.value=='todos'){
            toast(red, 'Selecione um usuário')
        } else {
            hire(select.value, body)
            localStorage.removeItem('deptID')
            renderDeptInfo(deptId)
            select.innerHTML='';
            select.value='todos';
            toast(green, 'Usuário Contratado')
            setTimeout(() => {
                location.reload()
              }, 1300)
        }
    })
}

async function filter(value) {
    const depts = await getAllDepts(value)
}

async function delDepartment (){
    const button = document.querySelector('.delDeptBtn')
    const id = localStorage.getItem('dept')
    const modal=document.querySelector('.modalDelDept')

    button.addEventListener('click', async ()=>{
        delDepts(id)
        toast(green, 'Departamento Excluído')
        setTimeout(() => {
            location.reload()
        }, 1300)

        
    })
}

async function createDept () {
    const inputs = document.querySelectorAll('#modalCreateDept__input')
    const button = document.querySelector('.modalCreateDept__button')
    const modal=document.querySelector('.modalCreateDept')
    let count=0;
    let body={};

    button.addEventListener('click', async (e)=>{
        e.preventDefault()

        inputs.forEach(input=>{
            if(input.value.trim()==''){
                count++
            }
            body[input.className] = input.value
        })
        console.log(body)
        
        const newDept = await postDept(body)

        if(count!=0){
            count=0;
            return alert('aa')
        } else{
            modal.close()
            depCards()
            toast(green, 'Departamento Criado')
            setTimeout(() => {
                location.reload()
              }, 1300)
            return newDept

        }
    
})
}
async function upDept(idd){
    const button=document.querySelector('.upDBtn')
    const inputs=document.querySelectorAll('.upDInput')
    let body={}
    let count=0
console.log(inputs)
    button.addEventListener('click', async(e)=>{
        e.preventDefault()
console.log('clc')
        inputs.forEach(input=>{
            if(input.value.trim()===''){
                count++   
            }
            body[input.name]=input.value
        })
        const update=await updateDept(idd, body)
        if(count != 0){
            count = 0;
            return alert('aa')
        } else {
            toast(green, 'Departamento Atualizado')
            setTimeout(() => {
                location.reload()
              }, 1300)
            return update
        }
    })
}
async function upEmp(idd){
    const button=document.querySelector('.upEBtn')
    const inputs=document.querySelectorAll('.upEInput')
    let body={}
    let count=0

    button.addEventListener('click', async(e)=>{
        e.preventDefault()

        inputs.forEach(input=>{
            if(input.value.trim()===''){
                count++   
            }
            body[input.name]=input.value
        })
        if(count != 0){
            count = 0;
            return alert('aa')
        } else {
        const update=await updateEmployee(idd, body)
            toast(green, 'Usuário Atualizado')
            setTimeout(() => {
                location.reload()
            }, 1300)
            return update
        }
    })
}
await userCards()
await depCards()
await createDept()
await userCards()
// ----------------------------------------------<create-delete
// -------------------------------------------------------------modal>
async function openModalDeptInfo(){
    const modal=document.querySelector('.modalDeptInfo')

    modal.showModal()

}
async function openModalDelDept (){
    const modal = document.querySelector('.modalDelDept')
    modal.showModal()
    closeModalDelDept()
    delDepartment()

}
async function openModalDelUser(id){
    localStorage.setItem('delUserId', id)
    const modal=document.querySelector('.delUserModal')
    modal.showModal()
    closeModalDelUser()
    
}
async function closeModalDelUser(){
    const button=document.querySelector('.delUserBtn')
    const modal=document.querySelector('.delUserModal')
    const button2=document.querySelector('.delUserX')
    const id=localStorage.getItem('delUserId')
    console.log(id)
    button.addEventListener('click',async ()=>{
        delEmployee(id)
        toast(green, 'Usuário Excluído')
        setTimeout(() => {
            location.reload()
        }, 1300)
    })
    button2.addEventListener('click',()=>{
        modal.close()
    })
}
function openModal1() {
    const modal = document.querySelector('.modalCreateDept')
    const button = document.querySelector('.create__button')

    button.addEventListener('click', ()=>{
        modal.showModal()
        closeModal()
    })
}
function closeModal(){
    const button = document.querySelector('.closeModal')
    const modal1 = document.querySelector('.modalCreateDept')
    const button2 = document.querySelector('.modalCreateDept__button')

    button.addEventListener('click', ()=>{
        modal1.close()
    })
}
function closeModalDept(){
    const container=document.querySelector('.modalDeptInfo')

    container.close()
}
function closeModalDelDept () {
    const button = document.querySelector('.closeModalDelDept')
    const modal = document.querySelector('.modalDelDept')

    button.addEventListener('click',()=>{
        modal.close()
        localStorage.removeItem('dept')
    })
}
async function openUpDModal(){
    const modal=document.querySelector('.upDModal')
    modal.showModal()
    closeUpDmodal()
}
async function openUpEModal(){
    const modal=document.querySelector('.upEModal')
    modal.showModal()
    closeUpEmodal()
}
async function closeUpDmodal(){
    const modal=document.querySelector('.upDModal')
    const button=document.querySelector('.upDX')
    button.addEventListener('click', ()=>{
        modal.close()
    })
}
async function closeUpEmodal(){
    const modal=document.querySelector('.upEModal')
    const button=document.querySelector('.upEX')
    button.addEventListener('click', ()=>{
        modal.close()
    })
}
// -------------------------------------------------------------<modal
const logout = ()=>{
    const button = document.querySelector('.button1')

    button.addEventListener('click', (e)=>{
        localStorage.removeItem('token', 'adm')
        localStorage.removeItem('adm')
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
// -------------------------------------------------------functionCall>
selectClick()
logout()
openModal1()

