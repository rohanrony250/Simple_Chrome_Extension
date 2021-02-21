const input = document.getElementById('input-id')
const submitbutton = document.getElementById('submit-button')
const errtext = document.getElementById('error-text')
const boolvalue = document.getElementById('bool-val')

submitbutton.addEventListener('click',(e) =>
{
    e.preventDefault()
    const userinput = input.value
    fetchres(userinput)
    .then((data) =>
    {    
        displayresult(data)        
    })
    .catch((error) =>
    {
        console.log(error)
    })

})

displayresult = (data) =>
{
    
            if(data === 'Not found')
            {
                boolvalue.classList.add('d-none')    
                errtext.classList.remove('d-none')
                   errtext.innerHTML = 
                    `
                        <p class='alert alert-danger text-center'>
                            Entered ID does not exist, please try again with numerical ID's from 1-5
                        </p>
                    
                    `
                
            }
            else
            {
                errtext.classList.add('d-none')
                boolvalue.classList.remove('d-none')
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    var activeTab = tabs[0]
                    chrome.tabs.sendMessage(activeTab.id, data.test_num);
                  });
                
                boolvalue.innerHTML =
                `
                    <p class='alert alert-primary display-5 text-center'>
                        BOOLEAN FLAG OF ID: ${data.bool_flag}
                    </p>
                
                `
                
            }


        
}






const fetchres = async(inputval) =>
{
    const url = `https://602e7c2c4410730017c50b9d.mockapi.io/js_ext_task/${inputval}`
    const res = await fetch(url)
    const data = await res.json()
    return data
}



   
