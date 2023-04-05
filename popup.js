document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('scrape-button').addEventListener('click', scrapeWebsite);
});

function scrapeWebsite() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'scrape' }, function (response) {
      createPreviewFile(response.data); 
    });
  });
}



function createPreviewFile(data) {
  const imagesList = data.images.map((img) => `<li><img src="${img}" style="object-fit: fit; object-position: center;" /></li>`).join('');
  const previewData = `
<html> <head> <title>${data.title}</title> <style> :root { --main-color: #f5f5f5; }
header, section, summary {
display: block;
}

body, h1, ul, li {
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
margin: 24px;
padding: 16xp;
}

body {
background-color: #1c1c1c;
color: var(--main-color);
}

h1 {
font-size: 48px;
margin: 40px ;
text-align: center;
color: var(--main-color);
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}



ul {
list-style: none;
margin: 0;
padding: 0px;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-gap: 8px;
justify-content: center;
}

li {
margin-bottom: 24px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
border-radius: 8px;
overflow: hidden;
transition: box-shadow 0.3s ease-in-out;
display: flex;
padding: 4px;
justify-content: center;
background-color: #2a2a2a;
}

li:hover {
box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.5);
}

img {
max-width: 100%;
height: 200px;
object-fit: cover;
border-radius: 8px;
}

.caption {
padding: 20px;
background-color: #1c1c1c;
color: var(--main-color);
text-align: center;
border-radius: 0 0 8px 8px;
}

.title {
font-size: 24px;
margin: 0 0 10px 0;
color: var(--main-color);
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.description {
font-size: 18px;
margin: 0;
color: #ccc;
}
</style>

</head> <body> <header> <h1>${data.title}</h1> </header> <section> <ul> ${imagesList} </ul> </section> </body> </html>

`;
  chrome.tabs.create({ url: 'data:text/html;charset=utf-8,' + encodeURIComponent(previewData), active: true });
}

