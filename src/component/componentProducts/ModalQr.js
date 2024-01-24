import { Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import React, { useState } from 'react';

import {QrScanner} from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const ModalQr = ({modal, toggle}) => {
    const history = useNavigate();
    const [ result, setResult ] = useState(null)

    function cambiarDominio(result, nuevoDominio) {
      // Reemplazar el dominio actual con el nuevo dominio
      let nuevaUrl = result.replace(/^https:\/\/[^/]+/, `https://${nuevoDominio}`);
  
      return nuevaUrl;
  }
  
  // Ejemplo de uso
  let nuevoDominio = "demo-sist-bebidas-qr-emp.vercel.app";
  
  let urlModificada = cambiarDominio(urlOriginal, nuevoDominio);
    
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
                    onDecode={(result) => history(urlModificada )}
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
