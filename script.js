const API_URL = "https://script.google.com/macros/s/AKfycbztKkex8iPog80fYaXnBo-QovgUQeayUhFSVh4KRpGdb8Ssi8p6QZuf-zoD7rKdJqxIVA/exec";

async function loadData(){
  const status = document.getElementById('status');

  try{
    const res = await fetch(`${API_URL}?action=getAll`);
    const data = await res.json();
    console.log(data);

    status.innerHTML = "✅ Connected to Google Sheets (" + data.links.length + " links)";

    renderLinks(data.links || []);

  }catch(err){
    console.error(err);
    status.innerHTML = "❌ Failed connect API";
  }
}

function renderLinks(links){
  const container = document.getElementById('links');

  if(!links.length){
    container.innerHTML = "No links found";
    return;
  }

  container.innerHTML = "";

  links.forEach(link=>{
    const a = document.createElement('a');
    a.href = link.url;
    a.target = "_blank";
    a.className = "link";
    a.innerHTML = `${link.icon || "🔗"} ${link.nama}`;
    container.appendChild(a);
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

loadData();
