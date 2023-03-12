const {app , BrowserWindow, Menu} = require('electron');//utilizamos somente para importar o app e nao a biblioteca toda


app.on('ready',()=>{
    console.log('aplicacao iniciada...')
    let mainWindow = new BrowserWindow({
        width: 800,
        height:800,
        icon:'icon/icon.ico'
    });//com o browserWindow é possivel criar a janela.
    
    // let mainMenu = Menu.buildFromTemplate([])
    //Menu.setApplicationMenu(null);// para tirar o menu superior
    //mainWindow.webContents.openDevTools()
    mainWindow.loadURL(`file://${__dirname}/view/index.html`); // o dirname pega o caminho da pasta ate o html para abrir na janela

});// quando o app estiver ready ele rodara a função
app.on('window-all-closed',()=>{
    app.quit();
})//quando a janela for fechada ele da quit na aplicacao
//