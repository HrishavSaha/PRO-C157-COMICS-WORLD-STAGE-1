AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" },
    selectedItemTitle: { default: "", type: "string" }
  },
  init: function () {
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
    this.handleMouseClickEvents();
  },

  handleComicsListState: function (color, opacity, debugMessage) {
    const id = this.el.getAttribute("id");
    const title = this.el.getAttribute("data-title");
    const comicsId = ["amazing-spider-man", "avengers-infinity", "captain-america-iron-man", "secret-wars"];
    if (comicsId.includes(id)) {
      const comicsContainer = document.querySelector("#comics-container");
      comicsContainer.setAttribute("cursor-listener", {
        selectedItemId: id,
        selectedItemTitle: title
      });
      console.log(debugMessage)
      this.el.firstChild.setAttribute("material", {
        color: color,
        opacity: opacity,
      });
    }
    if(this.el.getAttribute('id') == 'comics-container'){
      console.log(this.data.selectedItemId)
      console.log(this.data.selectedItemTitle)
    }
  },
  viewSelectedCard: function(bool, debugMessage){
    var comicsContainer = document.querySelector("#comics-container")
    comicsContainer.setAttribute("visible", bool)
    comicsContainer.setAttribute('tour', {state: 'view'})
    console.log(debugMessage)
  },
  handleMouseEnterEvents: function () {
    var color = 'orange'
    var opacity = 1
    var debugMessage = 'enter'
    // Mouse Enter Events
    this.el.addEventListener("mouseenter", () => {
      this.handleComicsListState(color, opacity, debugMessage);
    });
  },
  handleMouseLeaveEvents: function () {
    var color = 'red'
    var opacity = 0.4
    var debugMessage = 'leave'
    // Mouse Leave Events
    this.el.addEventListener("mouseleave", () => {
      this.handleComicsListState(color, opacity, debugMessage);
    });
  },
  handleMouseClickEvents: function () {
    var debugMessage = 'clicked'
    // Mouse Enter Events
    this.el.addEventListener("click", () => {
      this.viewSelectedCard('false', debugMessage)
    });
  }
});