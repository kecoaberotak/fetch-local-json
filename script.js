// Fetch data dari json
async function loadData(){
  const response = await fetch('data/pizza.json');
  const dataMenu = await response.json();
  return dataMenu.menu;
};

// tampil sesuai navbar
const navMenu = document.querySelector('.nav-menu');
const menuTitle = document.querySelector('.menu-title');

navMenu.addEventListener('click', async function(e){
  const kategori = e.target.getAttribute('id');

  if(kategori === 'all-menu'){
    menuTitle.textContent = 'All Menu';
  }else menuTitle.textContent = kategori.charAt(0).toUpperCase() + kategori.slice(1);

  let menu = [];

  try {
    menu = await loadData();
  } catch(e){
    console.log('Error!');
    console.log(e);
  }

  updateUI(menu, kategori);
});


// UI
function updateUI(menus, kategori){
  const containerMenu = document.querySelector('#daftar-menu');
  let cards = '';

  menus.forEach(menu => { 
    if(menu.kategori === kategori){
      cards += showCard(menu);
    }else if (kategori === 'all-menu'){
      cards += showCard(menu);
    }
  });

  containerMenu.innerHTML = cards;
};

function showCard(menu){
  return `<div class="col-md-4 mt-3">
            <div class="card">
              <img src="img/menu/${menu.gambar}" class="cag-top">
              <div class="card-body">
                <h5 class="card-title">${menu.nama}</h5>
                <p class="card-text">${menu.deskripsi}</p>
                <h5>Rp ${menu.harga}</h5>
                <a href="#" class="btn btn-primary">Pesan Sekarang</a>
              </div>
            </div>
          </div>`
}
