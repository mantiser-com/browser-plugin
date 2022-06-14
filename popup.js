let sendButton = document.getElementById("send");
let statusText = document.getElementById("status");

let apiKey = ""
let urlToSend =""

chrome.storage.sync.get("mantiserApi", ({ mantiserApi }) => {
  apiKey = mantiserApi;
});
chrome.tabs.getSelected(null, function(tab) {
  urlToSend = tab.url;
})
//chrome.storage.sync.get("color", ({ color }) => {
//  changeColor.style.backgroundColor = color;
//});

// When the button is clicked, inject setPageBackgroundColor into current page
sendButton.addEventListener("click", async () => {
    // Send the pages to mantier
    const object = { url: urlToSend };
    const response = await fetch('https://mantiser.com/api/shoot', {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
  });
  const responseText =  await response.text();
  
  if (response.ok){
    statusText.textContent = "The pages is saved at mantiser "+ urlToSend;
  }
  else{
    statusText.textContent = "We got an error check your key and options";
  }
  console.log(responseText); // logs 'OK'



});

