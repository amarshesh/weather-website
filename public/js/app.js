// we are going to fetch the data form the browser via fetch api 
//  this api need not to be uploaded  since it is already built in to node
 const totalinput = document.querySelector('form')
 const output = document.querySelector('input')
 const messageOne =document.querySelector('#message1')
 const messageTwo =document.querySelector('#message2')



totalinput.addEventListener('submit', (e)=>
{     e.preventDefault()

       const location2=output.value
       messageOne.textContent='loading your request hold on a sec....'
       messageTwo.textContent= ''
    fetch('/weather?address='+location2).then((response)=>

{
    response.json().then((data)=>{
       if (data.error){
         messageOne.textContent=data.error
  }else{
    messageOne.textContent=data.place
    messageTwo.textContent=data.condition
  }

    }) 
})
  
})
