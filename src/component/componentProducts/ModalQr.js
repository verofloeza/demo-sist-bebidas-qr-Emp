import { Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import React, { useState } from 'react';

import {QrScanner} from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const ModalQr = ({modal, toggle}) => {
    const history = useNavigate();
    const [ result, setResult ] = useState(null)

  // Función que se ejecuta cada vez que se decodifica un nuevo QR
  const handleDecode = (result) => {

    const parteDespuesDeOrdenes = result.substring(45);
    alert(parteDespuesDeOrdenes)
    // Redireccionar a la nueva URL
    history(`../${parteDespuesDeOrdenes}`);
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
