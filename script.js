const radioButton = document.querySelector('.radio--outer')
const planSubs = document.querySelectorAll('.plan--subscription')
const steps = document.querySelectorAll('.step--number')
const main = document.querySelector('main')
const plans = document.querySelectorAll('.plan--group')
const button = document.querySelector('button')
const planTitle = document.querySelectorAll('.plan--title')
const changePlan = document.querySelector('.summary--change')
const summaryPriceAmount = document.querySelectorAll('.summary--price-amount')
const totalPrice = document.querySelectorAll('.total--price')
const serviceInput = document.querySelectorAll("input[type='checkbox']")
const customizables = document.querySelectorAll('.customizable')
const largerStorages = document.querySelectorAll('.larger-storage')
const onlineServices = document.querySelectorAll('.online-service')
const nextBtn = document.querySelector('.btn--next')
const backBtn = document.querySelector('.btn--back')
const OS = document.querySelectorAll('.service-price-OS')
const LS = document.querySelectorAll('.service-price-LS')
const CP = document.querySelectorAll('.service-price-CP')

let custom = []
let largerStore = []
let onServce = []

let planAmount = 0
let addOnsAmount = 0
let subType = 'yearly'
let planCategory = ''


function removeActive(targets){
    targets.forEach(target =>{
        target.classList.remove('active')
    })

}

function getPlan(targets){
    if(subType == 'monthly'){
        if(targets.contains('arcade')){
            planAmount = 9
            planCategory = 'Arcade'
        }else if(targets.contains('advance')){
            planAmount = 12
            planCategory = 'Advanced'
        }else{
            planAmount = 15
            planCategory = 'Pro'
        }
    }else{
        if(targets.contains('arcade')){
            planAmount = 90
            planCategory = 'Arcade'
        }else if(targets.contains('advance')){
            planAmount = 120
            planCategory = 'Advanced'
        }else{
            planAmount = 150
            planCategory = 'Pro'
        }
    }
    
}

function updatePlan(){
    if(subType == 'yearly'){
        planAmount *= 10
        console.log(planAmount)
    }else{
        planAmount /= 10
        console.log(planAmount)
    }
}

function updateSummaryPrice(){
    summaryPriceAmount.forEach(amount =>{
        amount.innerText = planAmount
    })
}

function updateTotalPrice(){
    let totalAmount = planAmount + addOnsAmount
    totalPrice.forEach(total => {
        total.innerText = totalAmount
    })
}

function updateAddOns(){
    if(subType == 'yearly'){
        addOnsAmount *= 10
        console.log(addOnsAmount)
    }else{
        addOnsAmount /= 10
        console.log(addOnsAmount)
    }
}

function convertTime(item, amount){

    OS.forEach(os => {
        if(onServce[1] != undefined){
            os.innerText = onServce[1]        }
        
    })
    CP.forEach(cp => {
        if(custom[1] != undefined){
            cp.innerText = custom[1]
        }
        
    })
    LS.forEach(ls => {
        if(largerStore[1] != undefined){
            ls.innerText = largerStore[1]
        }
       
    })

    if(item != undefined){
        if(subType == 'yearly'){
        item.innerText = amount
        console.log('worked')
    }
        else{
        item.innerText = amount/10
        console.log('divided')
    }
    }else{
        return
    }
}

nextBtn.addEventListener('click', () => {
    let oldClass = main.className
    main.className = ''
    removeActive(steps)
    if(nextBtn.innerText === 'Confirm'){
        main.className = ''
        main.classList.add('done')
    }else{
        if(oldClass === "step-1"){
            oldClass = oldClass.slice(0, -1)
            main.classList.add(oldClass + 2)
            nextBtn.innerText = "Next Step"
            steps.forEach(step => {
                if(step.innerText == 2){
                    console.log(step)
                    step.classList.add('active')
                }
            })
        }else if(oldClass == "step-2"){
            oldClass = oldClass.slice(0, -1)
            main.classList.add(oldClass + 3)
            steps.forEach(step => {
                if(step.innerText == 3){
                    step.classList.add('active')
                    console.log(step)
                }
            })
        }else if(oldClass == "step-3"){
            oldClass = oldClass.slice(0, -1)
            main.classList.add(oldClass + 4)
            nextBtn.innerText = "Confirm"
            steps.forEach(step => {
                console.log(step)
                if(step.innerText == 4){
                    step.classList.add('active')
                }
            })
        }
        else{
            oldClass = oldClass.slice(0, -1)
            main.classList.add(oldClass + 1)
        }
    }

})

backBtn.addEventListener('click', () => {
    let oldClass = main.className
    main.className = ''
    removeActive(steps)
    if(oldClass == "step-2"){
        oldClass = oldClass.slice(0, -1)
        main.classList.add(oldClass + 1)
        steps.forEach(step => {
            console.log(step)
            if(step.innerText == 1){
                step.classList.add('active')
            }
        })
    }else if(oldClass == "step-3"){
        oldClass = oldClass.slice(0, -1)
        main.classList.add(oldClass + 2)
        steps.forEach(step => {
            console.log(step)
            if(step.innerText == 2){
                step.classList.add('active')
            }
        })
    }
    else{
        oldClass = oldClass.slice(0, -1)
        main.classList.add(oldClass + 3)
        nextBtn.innerText = "Next Step"
        steps.forEach(step => {
            console.log(step)
            if(step.innerText == 3){
                step.classList.add('active')
            }
        })
    }

})


radioButton.addEventListener('click', () => {
    planSubs.forEach(planSub => {
        if(planSub.classList.contains('yearly')){
            planSub.classList.remove('yearly')
            planSub.classList.add('monthly')
            subType = 'monthly'

        }
        else{
            planSub.classList.add('yearly')
            planSub.classList.remove('monthly')
            subType = 'yearly'

        }     
    })
    convertTime(custom[0], custom[1])
    convertTime(largerStore[0], largerStore[1])
    convertTime(onServce[0], onServce[1])
    updateAddOns()
    updatePlan()
    updateSummaryPrice()
    updateTotalPrice()
})

plans.forEach(plan => {
    plan.addEventListener('click', () =>{
        removeActive(plans)
        getPlan(plan.classList)
        document.querySelector('.summary-plan-title').innerText = planCategory
        console.log(planAmount)
        updateSummaryPrice()
        updateTotalPrice()
        plan.classList.add('active')
    })
})

steps.forEach( step => {
    step.addEventListener('click', () => {
        removeActive(steps)
        step.classList.add('active')
        switch(step.innerText){
            case '1':
                console.log(step.innerText)
                main.classList.remove(...main.classList);
                main.classList.add('step-1')
                button.innerText = 'Next Step'
                break
            case '2':
                console.log(step.innerText)
                main.classList.remove(...main.classList);
                main.classList.add('step-2')
                button.innerText = 'Next Step'
                break
            case '3':
                console.log(step.innerText)
                main.classList.remove(...main.classList);
                main.classList.add('step-3')
                button.innerText = 'Next Step'
                break
            case '4':
                console.log(step.innerText)
                main.classList.remove(...main.classList);
                main.classList.add('step-4')
                button.innerText = 'Confirm'
                break
            default:
                console.log('Amazing')
        }
    })
})

serviceInput.forEach(input => {
    input.addEventListener('click', () =>{
        if(input.checked){
            if(input.name == 'customizable'){
                customizables.forEach(customizable => {
                    convertTime(customizable, 20)
                    custom[0] = customizable
                    custom[1] = 20
                })
                addOnsAmount += 20
            }else if(input.name === 'larger-storage'){
                largerStorages.forEach(largerStorage => {
                    convertTime(largerStorage, 20)
                    largerStore[0] = largerStorage
                    largerStore[1] = 20
                })
                addOnsAmount += 20
            }else{
                
                onlineServices.forEach(onlineService => {
                    convertTime(onlineService, 10)
                    onServce[0] = onlineService
                    onServce[1] = 10
                })
                addOnsAmount += 10
            }
        }else{
            if(input.name == 'customizable'){
                customizables.forEach(customizable => {
                    customizable.innerText = ''
                    custom[0] = customizable
                    custom[1] = ''
                })

                addOnsAmount -= 20
            }else if(input.name === 'larger-storage'){
                largerStorages.forEach(largerStorage => {
                    largerStorage.innerText = ''
                    largerStore[0] = largerStorage
                    largerStore[1] = ''
                })
                addOnsAmount -= 20
            }else{
                onlineServices.forEach(onlineService => {
                    onlineService.innerText = ''
                    onServce[0] = onlineService
                    onServce[1] = ''
                })
                addOnsAmount -= 10
            }
            OS.forEach(os => {
                if(onServce[1] != undefined){
                    os.innerText = onServce[1]        }
                
            })
            CP.forEach(cp => {
                if(custom[1] != undefined){
                    cp.innerText = custom[1]
                }
                
            })
            LS.forEach(ls => {
                if(largerStore[1] != undefined){
                    ls.innerText = largerStore[1]
                }
            
            })
            
        }
        updateTotalPrice()
    })
    
})

changePlan.addEventListener('click', () => {
    main.className = ''
    main.classList.add('step-2')
    removeActive(steps)
    document.querySelector('.select--plan').classList.add('active')
})
