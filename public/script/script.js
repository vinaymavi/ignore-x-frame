window.onload = function(){
    addListener()
}
const AJAX_URL = "/process_get"

// Function

function addListener(){
    document.querySelector('#render-site').addEventListener("click",()=>{
        const url = document.querySelector("#enter-url-field").value;
        if(isValidateUrl(url)){
            updateIframe(url);
            displayUrl(url);
        }else{
            console.log("Not a valid URL.")
        }
    });
    document.querySelector('#copy-url').addEventListener("click",copyUrl);
}
function isValidateUrl(url){
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

function updateIframe(url){
    document.querySelector('#iframe').src = `${AJAX_URL}?url=${url}`;
}

function displayUrl(url){
    document.querySelector('#genrated-url').value = `${window.location.origin}${AJAX_URL}?url=${url}`;
}

function copyUrl(){
    navigator.clipboard.writeText(document.querySelector('#genrated-url').value).then(()=>{
        console.log("Text copied successfully.");
    })
}