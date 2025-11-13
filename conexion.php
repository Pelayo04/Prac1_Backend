<?php
//Datos de conexion
$servidor = "localhost"; //IP del server
$usuario = "root"; //Usuario MySQL
$contrasenia = ""; //Contraseña usuario
$bd = "PrograWeb"; //Nombre de la bd

//Crear conexion
$conexion = new mysqli($servidor, $usuario, $contrasenia, $bd);
//Verificar conexion
if($conexion->connect_error){
    die("Error em la conexion".$conexion->connect_error);
}
echo "Conexion exitosa";

//Consulta sencilla
$sql = "SELECT id, nombre, precio FROM productos";
$resultado = $conexion->query($sql);

//Verifica si hay resultados
if($resultado->num_rows>0){
    //Mostrar datos
    while($fila=$resultado->fetch_assoc()){
        echo "ID: ".$fila["id"]."-Nombre: ".$fila["nombre"]."-Precio: ".$fila["precio"]."<br>";
    }
}else{
    echo "No hay productos";
}
//Cerrar la conexion
$conexion->close();
?>