AFRAME.registerComponent("tour", {
  schema: {
    state: {type: 'string', default: 'comics'}
  },
  init: function () {
    comicsContainer = this.el;
    this.createCards()
  },
  update: function(){
    var state = this.data.state
    if(state == 'view'){
      this.showView()
    }else if(state == 'comics'){
      //Empty for now
    }
  },
  createCards: function () {
    const comics = [
      {
        "id": "amazing-spider-man",
        "title": "The Amazing Spider Man",
        "url": "./assets/thumbnails/amazing_spider_man.jpg"
      },
      {
        "id": "avengers-infinity",
        "title": "Avengers Infinity",
        "url": "./assets/thumbnails/avengers_infinity.jpg"
      },
      {
        "id": "captain-america-iron-man",
        "title": "Captain America and Iron Man",
        "url": "./assets/thumbnails/captain_america_iron_man.png"
      },
      {
        "id": "secret-wars",
        "title": "Secret Wars",
        "url": "./assets/thumbnails/secret_wars.jpg"
      }
    ]
    
    let prevoiusXPosition = -60;

    for (var item of comics) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Main Element
      var mainEl = this.createMain(position, item.id, item.title)
      // Border Element
      mainEl.appendChild(this.createBorder(item.id))
      // Thumbnail Element
      mainEl.appendChild(this.createThumbnail(item))
      // Title Text Element
      mainEl.appendChild(this.createTitle(-20, item))
      
      comicsContainer.appendChild(mainEl);
    }
  },
  
  createMain: function (pos, id, title) {
    var main = document.createElement('a-entity')

    main.setAttribute('position', {x: pos.x, y: pos.y, z: pos.z})
    main.setAttribute('id', id)
    main.setAttribute('cursor-listener', {})
    main.setAttribute('data-title', title)
    
    return main
  },

  createBorder: function (id) {
    var border = document.createElement('a-entity')

    border.setAttribute('id', id)
    border.setAttribute('geometry', {primitive: 'ring', radiusInner: 9, radiusOuter: 10})
    border.setAttribute('material', {opacity: 0.4, color: 'red'})

    return border
  },
  
  createThumbnail: function (item) {
    var thumbnail = document.createElement('a-entity')

    thumbnail.setAttribute('id', item.id)
    thumbnail.setAttribute('geometry', {primitive: 'circle', radius: 9})
    thumbnail.setAttribute('material', {src: item.url})

    return thumbnail
  },
  
  createTitle: function (yOffset, item) {
    var title = document.createElement('a-entity')

    title.setAttribute('position', {x: 0, y: yOffset, z: 0})
    title.setAttribute('text', {font: 'exo2bold', align: 'center', width: 30, color: '#000', value: item.title})

    return title
  },
  showView: function(place){
    var selectedCard = comicsContainer.getAttribute("cursor-listener").selectedItemId
    var title = comicsContainer.getAttribute("cursor-listener").selectedItemTitle
    var mainContainer = document.querySelector('#main-container')
    var imagePath = `./assets/360_images/${selectedCard}/page_0.jpg`
    var appSubtitle = document.querySelector('#app-subtitle')
    var subtitle = `Welcome to ${title}`
    mainContainer.setAttribute('material', {src: imagePath, color: 'white'})
    appSubtitle.setAttribute('text', {value: subtitle})
    console.log(`TOUR ${selectedCard} STARTED`)
  }
});
