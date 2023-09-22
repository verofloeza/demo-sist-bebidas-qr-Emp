import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import React, { useState } from 'react'

import { Fragment } from 'react'
import ModalQr from '../componentProducts/ModalQr'

const OrdenesBebidas = () => {
  const [ modal, setModal ] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5>Bebidas</h5>
              </CardHeader>
              <CardBody style={{flex:1, flexDirection: 'row', alignContent: 'center', alignItems: 'center',}}>
                <div>
                  <Button onClick={toggle} className='btn btn-primary btn-lg'><i className="fa fa-qrcode"></i> Scanear QR</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ModalQr modal={modal} toggle={toggle} />
    </Fragment>
  )
}

export default OrdenesBebidas
