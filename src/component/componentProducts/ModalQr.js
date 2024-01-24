import { Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import React, { useState } from 'react';

import {QrScanner} from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const ModalQr = ({modal, toggle}) => {
    const history = useNavigate();
    const [ result, setResult ] = useState(null)

    function quitarDominio(url) {
      // Crear un objeto URL con la URL proporcionada
      let urlObj = new URL(url);
  
      // Obtener el pathname y search (si es necesario) de la URL
      let pathname = urlObj.pathname;
      let search = urlObj.search;
  
      // Concatenar el pathname y search para obtener la ruta completa
      let rutaCompleta = pathname + search;
  
      return rutaCompleta;
  }
  
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
                    onDecode={(result) => quitarDominio(result)}
                    onError={(error) => setResult(error?.message)}
                />
            </Col>
            </Row>
        </Container>
        </ModalBody>
    </Modal>
  )
}

export default ModalQr
