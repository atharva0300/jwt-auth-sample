
const button = document.getElementById('btn-post');

function postRequest(){
    alert('hello')

    
    axios.get('http://localhost:5000/api/login')
    .then(response => {
        console.log(response.data)
    }, err => {
        console.log('You got an error : ' , err)
    })
}