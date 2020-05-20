@extends('layouts.app')

<script src="{{ asset('js/pesajeInicialDespacho.js') }}"></script>
@section('content')


<div class="container">
    <div class="bs-example">
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/" >Home</a></li>
            </ol>
        </nav>
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-md-11">
        <div class="card">
        `<div class="card-header text-center h2">{{ __('Pesaje inicial despacho de productos') }}</div>
            <div class="card-body">
                <form action="" method="POST">
                    
                
                <div class="form-group row">
                            <label for="cliente" class="col-md-1 col-form-label text-md-left">Cliente</label>
                                <select name="cliente" id="cliente"  class="custom-select col-md-2 ">
                                    <option data-tokens=="0">Seleccione</option>                                                      
                                    <option data-tokens="julia"> julia</option>
                                    <option data-tokens="adasd"> asdasdsa</option>
                                    <option data-tokens="qweqeq"> qweqweqe</option>
                                    <option data-tokens="pedro"> pedro</option>
                                    <option data-tokens="fernando">fernando</option>
                                </select>
                        </div>
                <br>

    <div class="form-group row">
        <table class="table mt-2">
              @if ($errors->any())
              <div class="alert alert-danger">
                 {{$errors->first()}}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              @endif
            @if (session('error'))
                <div class="alert alert-danger" role="alert">
                     {{ session('error') }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                       <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            @endif

            @if (session('mensaje'))
            <div class="alert alert-success">
                {{session('mensaje')}}
            </div>
            @endif

            <thead>
              <tr>
                <th scope="col">Orden</th>
                <th scope="col">Fecha entrega</th>
                <th scope="col">Producto</th>
                <th scope="col">Cant. disponible</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </tbody>
          </table>
          <button type="submit" class="btn btn-outline-success btn-block col-sm-2 offset-10 mt-3">
                    Elegir orden
        </button>
    </div>

    <div class="form-group row mt-5">
        <label for="producto_id" class="col-md-1 col-form-label text-md-left">Producto</label>
        <input id="producto_id" type="text" class="form-control col-md-2 nombrejs"  name="producto_id" placeholder="Producto seleccionado" required>
    </div>

    <div class="form-group row mt-5">
        <label for="Transportista" class="col-md-1 col-form-label text-md-left">Transportista</label>
            <select name="Transportista" id="transportista_id"  class="custom-select col-md-2 ">
                <option data-tokens=="0">Seleccione</option>                                                      
                <option data-tokens="julia"> julia</option>
                <option data-tokens="adasd"> asdasdsa</option>
                <option data-tokens="qweqeq"> qweqweqe</option>
                <option data-tokens="pedro"> pedro</option>
                <option data-tokens="fernando">fernando</option>
            </select>

        <label for="patente" class="col-md-1 col-form-label text-md-right">Patente</label>
        <input id="patente" type="text" class="form-control col-md-2 patentejs"  name="patente" placeholder="abc123 / ab123ab" required>
    </div>

    <div class="form-group row mt-5">
        <label for="tara" class="col-md-1 col-form-label text-md-left">Peso vehiculo</label>
        <input id="tara" type="text" class="form-control col-md-2 border-left tarajs"  name="tara" placeholder="Tara" required>
    
        <button type="submit" class="btn btn-outline-success col-sm-2 offset-1">
                    Leer pesaje
        </button>
        
    </div>  
    <br>
    <br>  

                <div class="form-inline row">
                            <button class="btn btn-secondary col-sm-3">Cancelar</button>
                            <button class="btn btn-primary col-sm-3 offset-md-6">Guardar</button>
                </div>

                </form>
            </div>
        </div>
    </div>
</div>

@endsection