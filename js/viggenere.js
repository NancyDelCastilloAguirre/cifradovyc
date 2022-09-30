//va,so a ocupar parte del cesar
const abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];

//llave
let key = "";

//bienvenidoa interpretar codigo
$(document).ready(function(){
    //vamos a hacer una funcion para poder descifrar con viggenere
    $('#ci').click(function(){

        //para cifrar vamos a utilizar una funcion de modulo la cual es y= (x+z)mod27  z clave, x letras, y cifrado


        //vamso a traer los datos de la llave
         key = document.getElementById('llave').value;
        //debemos verificar la llave
        key = key.replace(/ /g, '');


        //vamso a traer los datos de la llave
        let mess = document.getElementById('mess').value;
        //debemos verificar la llave
        mess = mess.replace(/ /g, '');

        let newMess = "";
        let keyCompleta = "";

        //para aplicar el algoritmo debemso crear una funcion que se encargue par a revisar las condiones del mismo

        if(revision(mess, key)){

            //vamos primero por aplicar y obtenre la posicion de la longitud del mensaje y emparejarlo contra la llave

            for(var i = 0; i< mess.length; i++){
                //emparejo con la posicon del caracter obteniendo el numero de dicha posisicon
                keyCompleta +=key.charAt((i%Number(key.length)));
            }
            alert("1er paso cifrar con la llave: " + keyCompleta);

            //twngo que volver a recorrer el mensaje para pbtener caracteres y posiciones
            for(var i=0; i < mess.length; i++){
                //obtenr la picion de la letra
                let charr = mess.charAt(i);
                //debemos crear una funcion para obtener la funion de ese caracter
                let posm = getPosicion(charr);

                //tambien aplicado a la llave 
                charr = keyCompleta.charAt(i);

                //obtengo la posicion
                let posk = getPosicion(charr);

                //tenemos que ejecutar el cifrado 
                let newValores = cifrado(posm, posk);

                newMess += abc[newValores];
            }
            //imprimir el resultado
            document.getElementById('rs').value = newMess;
        }else{
            //no se cumple 
            alert("No sirve llevale")
        }
    });

    //decifrar
    $('#de').click(function(){

        //para cifrar vamos a utilizar una funcion de modulo la cual es y= (x+z)mod27  z clave, x letras, y cifrado

        //vamso a traer los datos de la llave
        let key = document.getElementById('llave').value;
        //debemos verificar la llave
        key = key.replace(/ /g, '');


        //vamso a traer los datos de la llave
        let mess = document.getElementById('mess').value;
        //debemos verificar la llave
        mess = mess.replace(/ /g, '');

        let newMess = "";
        let keyCompleta = "";

        //para aplicar el algoritmo debemso crear una funcion que se encargue par a revisar las condiones del mismo

        if(revision(mess, key)){

            //vamos primero por aplicar y obtenre la posicion de la longitud del mensaje y emparejarlo contra la llave

            for(var i = 0; i< mess.length; i++){
                //emparejo con la posicon del caracter obteniendo el numero de dicha posisicon
                keyCompleta +=key.charAt((i%Number(key.length)));
            }
            alert(keyCompleta);

            //twngo que volver a recorrer el mensaje para pbtener caracteres y posiciones
            for(var i=0; i < mess.length; i++){
                //obtenr la picion de la letra
                let charr = mess.charAt(i);
                //debemos crear una funcion par aobtener la funion de ese caracter
                let posm = getPosicion(charr);

                //tambien aplicado a la llave 
                charr = keyCompleta.charAt(i);

                //obtengo la posicion
                let posk = getPosicion(charr);

                //tenemos que ejecutar el cifrado 
                let newValores = descifrar(posm, posk);

                newMess += abc[newValores];
            }
            //imprimir el resultado
            document.getElementById('rs').value = newMess;
            
            
        }else{
            //no se cumple 
            alert("No sirve llevale");
        }
    });
})

//funcion de cambio o de cifrado
function cifrado(posm, posk){
    //tengo que aplicar la formula
    let y = (posm + posk)%27;
    return y;
    
}

//funcion de descifrado o descifrar
function descifrar(posm, posk){
    let val = 0;
    if((posm-posk) <= 0){
        //todo bien 
        val = (posm - posk)%27
    }else{
        val = (posm - posk +27)%27
    }
    return val;
}



//la funcon de la posicion
function getPosicion(letra){
    let posicion = abc.indexOf(letra);
    return posicion;

}

//la funcion de la revison
function revision(mess, desp){
    //primero hay que validar l aentrada de mis datos a apartir de una expresion regular

    const expresion = /^([a-zñ?]+([]*[a-zñ?]?['-]?[a-zñ?]+)*)$/;

    var aceptado = true;

    //evaluar ala expresion
    if(!expresion.test(mess)){
        alert("el texto que ingreso no ha sido aceptado ingrese solo minusculas  y evite numeros y simbolos");
        aceptado= false;
    }

    if(!expresion.test(desp)){
        alert("la clave ingresa es incorrecta no cumple con las normas de solo minusculas y no usar numeros y/o simbolos");
        aceptado= false;
    }
    if(desp.length > mess.length){
        alert("la clave no puede ser mayor que el mensaje");
        aceptado=false;
    }
    return aceptado;
}