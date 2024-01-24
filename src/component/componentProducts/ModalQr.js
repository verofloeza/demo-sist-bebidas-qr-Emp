import { Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import React, { useState } from 'react';

import {QrScanner} from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const ModalQr = ({modal, toggle}) => {
    const history = useNavigate();
    const [ result, setResult ] = useState(null)

    // Función para cambiar el dominio de la URL
  const cambiarDominio = (urlOriginal, nuevoDominio) => {
    // Reemplazar el dominio actual con el nuevo dominio
    return urlOriginal.replace(/^https:\/\/[^\/]+/, `https://${nuevoDominio}`);
  };

  // Función que se ejecuta cada vez que se decodifica un nuevo QR
  const handleDecode = (result) => {
    alert(result)
    // // Extraer la parte de la URL después de 'https://demo-sist-bebidas-qr-emp.vercel.app/ordenes/'
    // const parteDespuesDeOrdenes = result.substring('https://demo-sist-bebidas-qr-emp.vercel.app/ordenes/'.length);

    // // Construir la nueva URL
    // const nuevaUrl = `/ordenes/${parteDespuesDeOrdenes}`;

    // // Redireccionar a la nueva URL
    // navigate(nuevaUrl);
  };

  // Función que se ejecuta en caso de error en el escaneo
  const handleError = (error) => {
    setResult(error?.message);
  };
    
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <h4>Escaneo de qr</h4>
      </ModalHeader>
      <ModalBody  style={{display: "flex", justifyContent: "center", alignItems: "center", }}>
        <Container>
          <Row>
          
            <Col sm='12' >
                <QrScanner
                   onDecode={handleDecode}
                   onError={handleError}
                />
            </Col>
            </Row>
        </Container>
        </ModalBody>
    </Modal>
  )
}

export default ModalQr
