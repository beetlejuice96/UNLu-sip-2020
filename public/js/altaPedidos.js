var window = window ||{},
    document = document ||{},
    console = console || {};
document.addEventListener("DOMContentLoaded", function(event)
{

    //carga de select de productos
    productos = document.querySelector(".productos");
    cliente_id = document.querySelector(".cliente_id");
    cliente_id.addEventListener("change",function () {
        var id = cliente_id.value;
        axios.get('/getProductoCliente',{
            params:{
                id :id
            }
        })
            .then(function (res) {
                console.log(res.data);
                if (res.status == 200){
                    var i = 0;
                    console.log(res.data);
                    while (i< res.data['length']){
                        opcion = document.createElement("option");
                        opcion.value=res.data[i]['id'];
                        opcion.text=res.data[i]['descripcion'];
                        //console.log(res.data[i]['insumo_trazable_id']);
                        productos.appendChild(opcion);
                        i++;
                    }
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    })

//------CARGA DE TABLAS-------//

    var tablaInsumosNecesarios = document.querySelector(".insumosnecesarios");//TBODY
    var trinsumosnecesarios;//TR
    function limpiarTablaInsumosNecesarios(){
        new_tbody = document.createElement('tbody');
        new_tbody.className = 'insumosnecesarios';
        tablaInsumosNecesarios.parentNode.replaceChild(new_tbody,tablaInsumosNecesarios);
        tablaInsumosNecesarios = document.querySelector(".insumosnecesarios");
    };

    var tablaInsumosCliente = document.querySelector(".tablacliente");
    function limpiarTablaInsumosCliente(){
        new_tbody = document.createElement('tbody');
        new_tbody.className = 'tablacliente';
        tablaInsumosCliente.parentNode.replaceChild(new_tbody,tablaInsumosCliente);
        tablaInsumosCliente = document.querySelector(".tablacliente");
    };

    var tablaInsumosFabrica = document.querySelector(".tablafabrica");
    function limpiarTablaInsumosFabrica(){
        new_tbody = document.createElement('tbody');
        new_tbody.className = 'tablafabrica';
        tablaInsumosFabrica.parentNode.replaceChild(new_tbody,tablaInsumosFabrica);
        tablaInsumosFabrica = document.querySelector(".tablafabrica");
    };

    //tablaInsumosNecesarios = document.querySelector(".insumosnecesarios");
    productos.addEventListener("change",function () {
        var productoId = productos.value;
        var cantidad = document.querySelector('.cantidadjs').value;
        axios.get('/getFormulaProducto',{
            params:{
                id :productoId,
                cantidad :cantidad
            }
        })
            .then(function (res) {
                console.log(res.data);
                if (res.status == 200){
                    var i = 0;
                    console.log(res.data);
                    limpiarTablaInsumosNecesarios();
                    while (i< res.data.lenght){
                            filainsumos(i,res.data[i]['id_insumo'],res.data[i]['cantidad_requerida']);
                            if (!res.data[i].includes('lotes')){//checkear que ande esto, lo saque de un ejemplo en internet

                                filaclientes(i,0,res.data[i]['stock_cliente']);
                                filafabrica(i,0,res.data[i]['stock_fabrica']);

                            }else{
                                var j = 0;
                                var lote=null;
                                var bool=true;
                                while((j <= Object.Keys(res.data[i]['lotes']).lenght) &&(bool)){
                                    if (res.data[i]['lotes'][j].cantidad>=res.data[i]['cantidad_requerida']){
                                        lote = j;
                                        bool=false;
                                    }
                                    j++;
                                }
                                filaclientes((i,res.data[i]['lotes'][lote].nrolote,res.data[i]['lotes'][lote].cantidad))//si no funciona esta forma de acceder al objeto, avisar que deben enviarme un array.
                                filafabrica(i,0,0,0)//creo que la fabrica no maneja trazables entonces no deberia ir nada en esta.
                            }
                        i++;


                    }
                }
            })
            .catch(function (err) {
                console.log(err);
            });

            //cargarTablaCliente(productoId);
            //cargarTablaFabrica(productoId);

        //prueba para ver como carga


        /*filainsumos();
        filaclientes();
        filafabrica();*/





    });


    // implementar la matriz para cada tabla en cuanto tenga todos los datos para poder cargar.
    function filainsumos (i,id,insumo,cantidadNecesaria) {
        th = document.createElement("th");
        input_id = document.createElement('input');
        input_id.type = 'hidden';
        input_id.value = id;
        input_id.name ='insumos['+i+'][id_insumo_fila_insumos]';
        th.appendChild(input_id);
        th.appendChild(document.createTextNode(i.toString()));


        tddescripcion = document.createElement('td');
        input_name = document.createElement('input');
        input_name.type = 'hidden';
        input_name.value = insumo;
        input_name.name ='insumos['+i+'][descripcion_fila_insumos]';
        tddescripcion.appendChild(input_name);
        tddescripcion.appendChild(document.createTextNode(insumo.toString()));

        tdcantidadstock = document.createElement('td');
        input_cantidadstock = document.createElement('input');
        input_cantidadstock.type = 'hidden';
        input_cantidadstock.value = cantidadNecesaria;
        input_cantidadstock.name ='insumos['+i+'][cantidad_fila_insumos]';
        tdcantidadstock.appendChild(input_cantidadstock);
        tdcantidadstock.appendChild(document.createTextNode(cantidadNecesaria.toString()));

        tr = document.createElement('tr');
        tr.appendChild(th);
        tr.appendChild(tddescripcion);
        tr.appendChild(tdcantidadstock);

        tablaInsumosNecesarios.appendChild(tr);

    }

    function filaclientes (i,lote,catidadStock,cantidadUtilizar) {
        th = document.createElement("th");
        input_lote = document.createElement('input');
        input_lote.type = 'hidden';
        input_lote.value = lote;
        input_lote.name ='cliente['+i+'][lote_insumo_fila_clientes]';
        th.appendChild(input_lote);
        th.appendChild(document.createTextNode(lote.toString()));


        tdcatidadStock = document.createElement('td');
        input_catidadStock = document.createElement('input');
        input_catidadStock.type = 'hidden';
        input_catidadStock.value = catidadStock;
        input_catidadStock.name ='cliente['+i+'][cantidadStock_fila_clientes]';
        tddescripcion.appendChild(input_catidadStock);
        tddescripcion.appendChild(document.createTextNode(cantidadstock.toString()));

        tdcantidadUtilizar = document.createElement('td');
        input_cantidadUtilizar = document.createElement('input');
        input_cantidadUtilizar.type = 'hidden';
        input_cantidadUtilizar.value = cantidadUtilizar;
        input_cantidadUtilizar.name ='cliente['+i+'][cantidadUtilizar_fila_clientes]';
        tdcantidadUtilizar.appendChild(input_cantidadUtilizar);
        tdcantidadUtilizar.appendChild(document.createTextNode(cantidadUtilizar.toString()));

        tr1 = document.createElement('tr');
        tr1.appendChild(th);
        tr1.appendChild(tdcatidadStock);
        tr1.appendChild(tdcantidadUtilizar);

        tablaInsumosCliente.appendChild(tr1);
    }

    function filafabrica (i,lote,cantidadStockFabrica) {
        th = document.createElement("th");
        input_lote = document.createElement('input');
        input_lote.type = 'hidden';
        input_lote.value = lote;
        input_lote.name ='fabrica['+i+'][lote_insumo_fila_fabrica]';
        th.appendChild(input_lote);
        th.appendChild(document.createTextNode(lote.toString()));


        tdcantidadstockFabrica = document.createElement('td');
        input_cantidadstockFabrica = document.createElement('input');
        input_cantidadstockFabrica.type = 'hidden';
        input_cantidadstockFabrica.value = cantidadStockFabrica;
        input_cantidadstockFabrica.name ='fabrica['+i+'][cantidad_fila_fabrica]';
        tdcantidadstockFabrica.appendChild(input_cantidadstockFabrica);
        tdcantidadstockFabrica.appendChild(document.createTextNode(cantidadStockFabrica.toString()));

        tr2 = document.createElement('tr');
        tr2.appendChild(th);
        tr2.appendChild(tdcantidadstockFabrica);


        tablaInsumosFabrica.appendChild(tr2);

    }

   /* function cargarTablaCliente($id_producto) {
        var id_cliente = cliente_id.value;

        axios.get('/getClienteProdForm',{
            params:{
                id_prod :$id_producto,
                id_cliente: id_cliente
            }
        })
            .then(function (res) {
                console.log(res.data);
                if (res.status == 200){
                    var i = 0;
                    console.log(res.data);
                    limpiarTablaInsumosCliente()
                    while (i< res.data['length']){
                        //celda del id
                        th = document.createElement("th");
                        input_id = document.createElement('input');
                        input_id.type = 'hidden';
                        input_id.value = res.data[i]['insumo_id'];
                        input_id.name ='id';
                        th.appendChild(input_id);

                        //celda del insumo
                        tddescripcion = document.createElement('td');
                        input_name = document.createElement('input');
                        input_name.type = 'hidden';
                        input_name.value = res.data[i]['descripcion'];
                        input_name.name ='descripcion';
                        tddescripcion.appendChild(input_name);

                        //celda de la cantidad stock
                        tdcantidadstock = document.createElement('td');
                        input_cantidadstock = document.createElement('input');
                        input_cantidadstock.type = 'hidden';
                        input_cantidadstock.value = res.data[i]['cantidad'];
                        input_cantidadstock.name ='cantidad';
                        tdcantidadstock.appendChild(input_cantidadstock);

                        //CREO LA FILA
                        tr = document.createElement('tr');
                        tr.appendChild(th);
                        tr.appendChild(tddescripcion);
                        tr.appendChild(tdcantidadstock);

                        tablaInsumosCliente.appendChild(tr);
                        i++;
                    }
                }
            })
            .catch(function (err) {
                console.log(err);
            });

    }

    function cargarTablaFabrica($id_producto) {
        var id_cliente = cliente_id.value;

        axios.get('/getFabricaProdForm',{
            params:{
                id_prod :$id_producto,
                id_cliente: id_cliente
            }
        })
            .then(function (res) {
                console.log(res.data);
                if (res.status == 200){
                    var i = 0;
                    console.log(res.data);
                    limpiarTablaInsumosFabrica();
                    while (i< res.data['length']){
                        //celda del id
                        th = document.createElement("th");
                        input_id = document.createElement('input');
                        input_id.type = 'hidden';
                        input_id.value = res.data[i]['insumo_id'];
                        input_id.name ='id';
                        th.appendChild(input_id);

                        //celda del insumo
                        tddescripcion = document.createElement('td');
                        input_name = document.createElement('input');
                        input_name.type = 'hidden';
                        input_name.value = res.data[i]['descripcion'];
                        input_name.name ='descripcion';
                        tddescripcion.appendChild(input_name);

                        //celda de la cantidad stock
                        tdcantidadstock = document.createElement('td');
                        input_cantidadstock = document.createElement('input');
                        input_cantidadstock.type = 'hidden';
                        input_cantidadstock.value = res.data[i]['cantidad'];
                        input_cantidadstock.name ='cantidad';
                        tdcantidadstock.appendChild(input_cantidadstock);

                        //CREO LA FILA
                        tr = document.createElement('tr');
                        tr.appendChild(th);
                        tr.appendChild(tddescripcion);
                        tr.appendChild(tdcantidadstock);

                        tablaInsumosFabrica.appendChild(tr);
                        i++;
                    }
                }
            })
            .catch(function (err) {
                console.log(err);
            });

    };*/

});