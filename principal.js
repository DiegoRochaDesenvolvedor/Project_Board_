//const express = require('express');
import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const directory = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(directory));
app.use(express.static(directory + '/view'));

app.get('/principal',function(req,res){
    res.sendFile(directory + '/view/project.html');
})

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
})