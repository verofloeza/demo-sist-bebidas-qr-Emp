import OrdenesBebidas from "../component/bebidas/ordenesBebidas";
import Qr from "../component/bebidas/qr";
import React from "react";

export const routes = [
    { path:`${process.env.PUBLIC_URL}/ordenes`, Component: <OrdenesBebidas/> }, 
    { path:`${process.env.PUBLIC_URL}/qr/:evento/:email`, Component: <Qr/> },
]

