const { deserialize } = require('v8')
const db = require('../config/db')  //Acceso a la BD
const path = require ('path') //Maneja de rutas

//Definir las acciones(metodos) con la entidad "persona"
const obtenerTodas = async (req, res) => {
  try{
    const sql ="SELECT * FROM personas"
    const [rows] = await db.query(sql) //deserializando
    res.json(rows)
  }catch(e){
    console.error(e)
    res.status(500).json({error: 'Error en la conexion'})
  }
}
//req => require (peticion/solicitud)
//req.params :parametro URL
//req.body   :parametro JSON
//req,file   : Envia un archivo binario
const crear = async (req, res) => {
  try{
    //1. Recibir los datos del formulario (texto)
    const  {apellidos, nombres, dni, telefono } = req.body
    //2. Recibir la fotografia
    //const fotografia = req.file ? `/uploads/${req.file.filename}` : null;
    const fotografia ='nuevafoto.png'

    //3.

    //4.Guardar un nuevo registro
    const [result] = await db.query("INSERT INTO personas (apellidos, nombres, dni, telefono, fotografia) VALUES (?,?,?,?,?)", 
      [apellidos, nombres, dni, telefono, fotografia])

      res.status(201).json({
        id: result.insertId,
        message: 'Registro Correcto'
      })

  }catch(e){
    console.error(e)
    if (e.code === "ER_DUP_ENTRY"){
      return res.status(400).json({error:'DNI esta duplicado'})
     }
  res.status(500).json({error: 'Error en el proceso registrado'})
  }
}
const crearTest = async (req,res) =>{
  res.status(201).json({
    test:"correcto"
  })
}

const actualizar = async(req,re) =>{
  //...
}

const eliminar = async(req,re) =>{
  //...
}

//Antes de Finalizar el controlados exporta

module.exports = {
  obtenerTodas,
  crear,
  actualizar,
  eliminar
}