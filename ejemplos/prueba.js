"hola"

function saluda(nombre){
    console.log("Hola " + nombre) // Es una expresión? NO.. es un statement
}

let miFuncion = saluda  // Es una expresión?  NO.. es un statement

miFuncion("Ivan")

function imprimirSaludo(generadorDeSaludo, nombre){
    console.log(generadorDeSaludo(nombre))
}

function generarSaludoDeBuenosDias(nombre){
    return "Buenos días " + nombre
}

function generarSaludoInformal(nombre){
    return "Hola " + nombre // Es una expresión?  NO.. es un statement
}

imprimirSaludo(generarSaludoDeBuenosDias, "Ivan")
imprimirSaludo(generarSaludoInformal, "Ivan")
// Una expresión es una porción de código que devuelve un valor
// let numero = 5+6 // Statement
//              ///    Expresión
// Expresión lambda (funciones flecha... realmente es el operador => el que se llama flecha)
// Es un trozo de código que devuelve una función (anónima) creada dentro de un statement

imprimirSaludo((nombre) => {
    return "Buenos días " + nombre
}, "Felipe")


imprimirSaludo((nombre) => { return "Buenos días " + nombre }, "Felipe")
imprimirSaludo( (nombre) => "Buenos días " + nombre , "Felipe")