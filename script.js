  var menuToggle = document.getElementById('menuToggle');
  var navegacaoPrincipal = document.getElementById('mainnav');

  function buildMarquee(){
    var track = document.getElementById('marqueeTrack');
    if(!track){ return; }

    var itens = [
      { icon: 'icon-hat', texto: 'FORRÓ' },
      { icon: 'icon-horseshoe', texto: 'PISEIRO' },
      { icon: 'icon-guitar', texto: 'SERESTA' },
      { icon: 'icon-star', texto: 'ARROCHA' },
      { icon: 'icon-boot', texto: 'SERTANEJO' },
      { icon: 'icon-lasso', texto: 'CAVALGADA' }
    ];

    var baseWidth = itens.reduce(function(total, item){
      return total + (item.texto.length * 9 + 70);
    }, 0);

    var neededCopies = Math.max(3, Math.ceil((window.innerWidth * 2.5) / baseWidth) + 1);
    var content = [];

    for(var i = 0; i < neededCopies; i++){
      itens.forEach(function(item){
        content.push('<span><svg width="15" height="15"><use href="#' + item.icon + '"/></svg>' + item.texto + '</span>');
      });
    }

    track.innerHTML = content.join('');
  }

  buildMarquee();
  window.addEventListener('resize', buildMarquee);

  menuToggle.addEventListener('click', function(){
    var isOpen = navegacaoPrincipal.classList.toggle('aberto');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navegacaoPrincipal.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ navegacaoPrincipal.classList.remove('aberto'); menuToggle.setAttribute('aria-expanded','false'); });
  });

  document.querySelectorAll('.item-pergunta').forEach(function(item){
    var q = item.querySelector('.pergunta');
    var a = item.querySelector('.resposta');
    if(item.classList.contains('aberto')){ a.style.maxHeight = a.scrollHeight + 'px'; }
    q.addEventListener('click', function(){
      var willOpen = !item.classList.contains('aberto');
      document.querySelectorAll('.item-pergunta').forEach(function(other){
        other.classList.remove('aberto');
        other.querySelector('.pergunta').setAttribute('aria-expanded','false');
        other.querySelector('.resposta').style.maxHeight = null;
      });
      if(willOpen){
        item.classList.add('aberto');
        q.setAttribute('aria-expanded','true');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  if('IntersectionObserver' in window){
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('em-visao');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold:.14});
    document.querySelectorAll('.revelar').forEach(function(el){ revealObserver.observe(el); });
  } else {
    document.querySelectorAll('.revelar').forEach(function(el){ el.classList.add('em-visao'); });
  }

  var videoPrincipal = document.getElementById('videoPrincipal');
  var cartoesVideo = document.querySelectorAll('.cartao-video');
  var videoEmDestaque = {
    id: 'TD_JfWv5b54',
    titulo: 'Vídeo principal do Thieguinho e Banda Cavalo Bravo',
    artista: 'Thieguinho'
  };

  cartoesVideo.forEach(function(cartao){
    cartao.addEventListener('click', function(){
      var videoSelecionado = {
        id: cartao.dataset.videoId,
        titulo: cartao.dataset.videoTitulo,
        artista: cartao.dataset.videoArtista
      };
      var tituloAtual = cartao.querySelector('h4');
      var artistaAtual = cartao.querySelector('.artista-video');
      var miniaturaAtual = cartao.querySelector('.miniatura-video');

      cartao.dataset.videoId = videoEmDestaque.id;
      cartao.dataset.videoTitulo = videoEmDestaque.titulo;
      cartao.dataset.videoArtista = videoEmDestaque.artista;
      tituloAtual.textContent = videoEmDestaque.titulo;
      artistaAtual.lastChild.nodeValue = videoEmDestaque.artista;
      miniaturaAtual.src = 'https://img.youtube.com/vi/' + videoEmDestaque.id + '/hqdefault.jpg';
      miniaturaAtual.alt = 'Thumbnail do vídeo ' + videoEmDestaque.titulo;
      videoPrincipal.src = 'https://www.youtube.com/embed/' + videoSelecionado.id;
      videoPrincipal.title = videoSelecionado.titulo;
      videoEmDestaque = videoSelecionado;
    });
  });

  var verMais = document.getElementById('verMaisBtn');
  var bioText = document.getElementById('bioText');
  verMais.addEventListener('click', function(){
    var expandido = bioText.classList.toggle('expandido');
    verMais.classList.toggle('aberto', expandido);
    verMais.firstChild.textContent = expandido ? 'Ver menos ' : 'Ver mais ';
  });
