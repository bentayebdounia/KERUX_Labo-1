const {app , BrowserWindow, Menu, ipcMain} = require('electron')
const fs = require("fs");
const path = require("path");

const {PosPrinter} = require('electron-pos-printer')

let win



const creatWindow = () => {
  
  const win = new BrowserWindow ({
    minWidth: 1300,
    minHeight: 800,
    width : 1000 ,
    height : 700,
    icon: './icon/logo-kerux-food-.png',
    title: "KERUX",

    webPreferences: {
     nodeIntegration:false,
      
      //preload: path.join( __dirname, './test/preload.js'),
      
      contextIsolation: false
    },
  })
  
  //win.loadFile('./login/login.html')
  win.loadURL("http://localhost:3000/login")
  win.webContents.openDevTools()
  
   
  
}


app.whenReady().then( () => {
    creatWindow()
})
app.on('window-all-closed', function() {
    app.quit()
})

app.on('activate', function() {
    if(win === null){
        creatWindow()
    }
})

ipcMain.on('print' , (event, arg) => {
    const data = JSON.parse(arg)
    //printer
    PosPrinter.print( data, {
      printerName: 'XPC-80',
      silent: true,
      preview: true
    }
).catch(error => console.error(error))
  })

