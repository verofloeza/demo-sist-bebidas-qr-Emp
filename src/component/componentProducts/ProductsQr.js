import { Button, Input, InputGroup, InputGroupText } from 'reactstrap'
import React, { useEffect, useState } from 'react'

import SweetAlert from "sweetalert2";

const ProductsQr = ({id, image, title, qty, discount, changesProducts, changesProductsId, status}) => {
  const [ cant, setCant ] = useState(0)
  const [ descuento, setDescuento ] = useState(0);

  useEffect(()=>{
    discount ? setCant((qty - discount)) : setCant(qty)
    discount ? setDescuento(discount) : setDescuento(0)
  },[])


  const aumentar = () => {
    if (parseInt(cant)  < qty) {
      setDescuento((parseInt(descuento) - 1));
      setCant((parseInt(cant) + 1));
      changesProducts(title, (parseInt(descuento) - 1), id)
      console.log('descuento', (descuento  - 1) )
    } 
  }
  
  const disminuir = () => {
    
    if (cant  > 0) {
      setDescuento((descuento  + 1));
      setCant((parseInt(cant) - 1));
      changesProducts(title, (parseInt(descuento)  + 1), id)

      console.log('descuento', (descuento  + 1) )
    }
  }

  const cambiarCant = (e) => {
    if(e.target.value > cant){
      Displayalert()
      setCant(cant)
    }
    setCant(e.target.value)
  }

  const Displayalert = () => {
    SweetAlert.fire({
      title: "Error en la cantidad",
      text: "La cantidad no puede ser mayor a la cantidad comprada",
      icon: "error",
    });
  }

  const DisplayalertButton = () => {
    changesProductsId(title, descuento, id)
        SweetAlert.fire("Cantidades modificadas!");
    // SweetAlert.fire({
    //   title: "Estás seguro de modificar la cantidad?",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonText: "Ok",
    //   cancelButtonText: "cancelar",
    //   reverseButtons: true,
    // }).then((result) => {
    //   if (result.value) {
    //     changesProductsId(title, descuento, id)
    //     SweetAlert.fire("Cantidades modificadas!");
    //   } else {
    //     SweetAlert.fire("No se realizaron los cambios!");
    //   }
    // });
  }
  return (
    <>
        {
          status === 1
          ? <tr>
                    <td><img className='files-gallery-item img-fluid' alt="img" src={image} width={50} /></td>
                  <td>{title}</td>
                  <td>
                    <div style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                      <InputGroup className="mb-3" style={{width: '150px'}}>
                                    <div addontype="prepend" className="input-group-prepend">
                                      <InputGroupText onClick={disminuir} style={{ cursor: 'pointer' }}>
                                        <h3>-</h3>
                                      </InputGroupText>
                                    </div>
                                    <Input className="form-control" type="text"  value={cant} style={{textAlign: 'center'}} onChange={(e)=>cambiarCant(e)} />
                                    <div addontype="append" className="input-group-prepend">
                                      <InputGroupText onClick={aumentar} style={{ cursor: 'pointer' }}>
                                      <h3>+</h3> 
                                      </InputGroupText>
                                    </div>
                                  </InputGroup>
                    </div>
                      
                  </td>
                  <td>
                    <Button color="warning" className="sweet-6" name="alertWarning" onClick={DisplayalertButton}>
                              Confirmar
                            </Button>
                  </td>
                  <th scope="row">{id}</th>
            </tr>
          : ''
        }
        
    </>
    
  )
}

export default ProductsQr