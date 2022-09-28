let button = document.getElementById('btn');

button.addEventListener('click', ()=> {
    const height = parseInt(document.getElementById('height').value)
    const weight = parseInt(document.getElementById('weight').value)
    const result = document.getElementById('output');

    let height_stat = true , weight_stat=true;

    if(isNaN(height) || (height<=0) || height === '') {document.getElementById('height_err').innerHTML = 'ERROR';}
    else { document.getElementById('height_err').innerHTML='';}

    if(isNaN(weight) || (weight<=0) || weight === ''){ document.getElementById('weight_err').innerHTML = 'ERROR';}
    else {document.getElementById('weight_err').innerHTML='';}

    if(height_stat && weight_stat){
        const bmi = (weight / ((height*height)/10000)).toFixed(2); //two decimal point
        
        if(bmi < 18.5) {
            result.innerHTML= 'Under Weight, BMI : ' + bmi;
        }
        else if (bmi >= 18.5 && bmi < 25){
            result.innerHTML= 'Healthy, BMI : ' + bmi;
        }
        else if (bmi >= 25 && bmi < 30) {
            result.innerHTML= 'Over Weight, BMI : ' + bmi;
        }
        else if (bmi > 30) {
            result.innerHTML= 'Obese, BMI : ' + bmi;
        }else{
            result.innerHTML= ' ERROR ';
        }
        
    } else {
        alert('Error heee');
        result.innerHTML = '';
    }

});