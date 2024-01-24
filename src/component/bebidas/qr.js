import { Card, CardHeader, Col, Container, Row, Table } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';

import ProductsQr from '../componentProducts/ProductsQr';
import { db } from '../../data/firebase/firebase';
import { useParams } from 'react-router-dom';

const Qr = () => {
    const { evento, email } = useParams();
    const [ ordenes, setOrdenes ] = useState( [])
    const [ qr, setQr ] = useState(null)
    const [ products, setProducts ] = useState(null)


    useEffect(()=>{
      
      const obtenerOrdenes = async () =>{
        const userRefCartGet = collection(db, "orders");
        const q = query(userRefCartGet, where('user.email', '==', email), orderBy('date', 'desc'));
          
        try {
          const querySnapshot = await getDocs(q);
          const datos = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setOrdenes(datos);
        }catch (error) {
          console.error('Error al consultar los documentos:', error);
                  
        }

        const userRefCart = collection(db, "carts");
        const r = query(userRefCart, where('user.email', '==', email), orderBy('date', 'desc'), limit(1));
        
        try {
          const querySnapshot2 = await getDocs(r);
          const datos2 = querySnapshot2.docs[0];
          if (!querySnapshot2.empty) {
            
            setQr(datos2.data().qr);
          } else {
            setQr(null);
          }
        } catch (error) {
          console.error('Error al consultar los documentos:', error);
        }
      }
        
      obtenerOrdenes()
    },[])
      const changesProducts = (title, descuento, id) => {
        console.log(descuento)
        const updatedProducts = ordenes[0].product.map((product) => {
          if (product.title === title) {
            return {
              ...product,
              discount: descuento
            };
          }
          return product;
        });
        setOrdenes([
          {
            ...ordenes[0],
            product: updatedProducts
          }
        ]);
      };
      const changesProductsId = async (title, descuento, id) => {
        const updatedProducts = ordenes[0].product.map((product) => {
          if (product.title === title) {
            return {
              ...product,
              discount: descuento
            };
          }
          return product;
        });
        
        const orderRef = doc(db, "orders", id);
        const orderSnapshot = await getDoc(orderRef);
        
        if (orderSnapshot.exists()) {
          try {
            await updateDoc(orderRef, { product: updatedProducts });
            console.log("Productos actualizados en Firebase");
            
            setOrdenes([
              {
                ...ordenes[0],
                product: updatedProducts
              }
            ]);
            console.log(ordenes[0].product);
          } catch (error) {
            console.error("Error al actualizar los productos en Firebase:", error);
          }
        } else {
          console.log("El documento de la orden no existe en Firebase");
        }
      };
  return (
    <Container fluid={true} className="tables-wrapper">
        <Row>
          <Col sm="12">
             {ordenes.length > 0
                ?<Card>
              <CardHeader>
                <h5>{ ordenes[0].user.name }</h5>
                <span>
                  Tel: {ordenes[0].user.phone}<br></br>
                  emal: {ordenes[0].user.email}
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th scope="col" style={{color: 'black'}}>Imagen</th>
                      <th scope="col" style={{color: 'black'}}>Bebida</th>
                      <th scope="col" style={{color: 'black'}}>Cantidad</th>
                      <th scope="col" style={{color: 'black'}}>Estado</th>
                      <th scope="col" style={{color: 'black'}}># Orden</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    ordenes.map(x => {
                      return x.product.map((i, index) => (
                        <ProductsQr key={index} id={x.id} image={i.image} title={i.title} qty={i.qty} discount={i.discount} status={x.status}  changesProducts={changesProducts} changesProductsId={changesProductsId}/>
                      ));
                    })
                  }
                  </tbody>
                </Table>
              </div>
              
            </Card>
            : <p></p>
            }

          </Col>
        </Row>
    </Container>
  )
}

export default Qr