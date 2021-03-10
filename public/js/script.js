const weatherForm = document.querySelector('form');
const p = document.querySelector('#message-1');
const p1 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e =>{
    e.preventDefault();

    p.textContent = 'loading...';
    p1.textContent = ''

    fetch(`/weather?address=${weatherForm[0].value}`).then((response)=>{
        response.json().then((data)=>{

            if(data.error){
                p.textContent = 'Error : ' + data.error
                return console.log('error : ', data.error);
            }
            console.log('data : ',data);

            p.textContent = 'Location : ' + data.location

            p1.textContent = 'Forecast : ' + data.forecast
        })
    })
})