const totalFlexiones = (cantidad) =>{
    let flexiones = cantidad
    let total = 0
    for(i = 0; i < cantidad; i++){
        total += flexiones
        flexiones--
    }
    console.log(total)
}
totalFlexiones(15)