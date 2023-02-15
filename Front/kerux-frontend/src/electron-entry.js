"use strict";

const {app , BrowserWindow, ipcMain} = require('electron')
//const fs = require("fs");
const path = require("path");

//const {PosPrinter} = require('electron-pos-printer')

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
      
      preload: path.join( __dirname, 'preload.js'),
      enableRemoteModule: false,
      contextIsolation: true
    },
  })
  
  win.loadFile('./login/login.html')
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

//-------------------- print function -----------------

// List of all options at -

const printOptions = {
  silent: true,
  printBackground: true,
  isDefault: true,
  color: true,
  landscape: false,
  pagesPerSheet: 0,
  pageRanges: [{
    from: 0,
    to: 1
  }],
  width: 55,
  height: 20,
  preview: false,
  collate: false,
  copies: 1,
  
};
//handle print
ipcMain.handle("printComponent", async (event, url) => {
  const win = new BrowserWindow({show: false});

  win.webContents.on("did-finish-load", () => {
    win.webContents.print(printOptions, (success, failureReason) => {
      console.log("Print Initiated in Main...");
      if (!success) console.log(failureReason);
    });
  });

  await win.loadURL(url);
  return "shown print dialog";
});

