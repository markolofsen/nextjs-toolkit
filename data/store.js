import { action, observable } from 'mobx'

class Store {
  @observable isServer = false
  @observable serverInitTime = 0
  @observable serverInited = false

  @observable isClient = false
  @observable clientInitTime = 0
  @observable clientInited = false

  @observable isAuth = false
  @observable name = "name-default"
  @observable age = 0
  @observable list = []

  @observable now = ""


  @observable leftMenu = true
  @observable mainTitle = 'Main'

  constructor() {
    console.log("new Store with: ", arguments)
  }

  @action init = async (isServer, storeData) => {
    if (isServer && this.serverInited) {
      console.log("init Store[server] error: already inited")
      return
    }
    if (!isServer && this.clientInited) {
      console.log("init Store[client] error: already inited")
      return
    }
    console.log("init Store with: isServer = ", isServer)
    console.log("init Store with: storeData = ", storeData)
    if (isServer) {
      this.isServer = true
      this.isClient = false
      this.serverInitTime = Date.now()
      this.serverInited = true
      //TODO: init data on server
      this.name = "MyName"
      this.age = 16

    }
    else {
      this.isServer = false
      this.isClient = true
      this.clientInitTime = Date.now()
      this.clientInited = true
      this.name = storeData.name
      this.age = storeData.age

    }
  }

  @action setAuth = () => {
    this.isAuth = true
  }

  @action unsetAuth = () => {
    this.isAuth = false
  }

  @action loadMoreList = (more) => {
    this.list = this.list.concat(more)
  }

  @action delayAdd = (num) => {
    setTimeout(() => {
      this.age += num
    }, 3000)
  }

  @action startClock = () => {
    setInterval(() => {
      this.now = "" + new Date().toLocaleTimeString()
    }, 1000)
  }



  @action leftMenuToggle = () => {
    this.leftMenu = !this.leftMenu
  }
}

const store = new Store()

export default store
