import {Link, useNavigate} from 'react-router-dom'
import {LogOut, MoreHorizontal} from 'react-feather'
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../data/firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

import SweetAlert from "sweetalert2";
import { signOut } from 'firebase/auth';

const Header = (props) => {
    const history = useNavigate();
    const [navmenu,setNavmenu] = useState(false);
    const [ user, setUser ] = useState(null)

    useEffect(()=>{
      const checkFirebaseAuth = () => {
          const unsubscribe = auth.onAuthStateChanged( async(user) => {
  
              if (!user) {
                  history(`./`);
              }else{
                setUser(user)
                const userRef = collection(db, 'Users');
                const q = query(userRef, where('email', '==', user.email));
        
                try {
                  const querySnapshot = await getDocs(q);
                  if (!querySnapshot.empty) {
                    const datos = querySnapshot.docs[0]
                    if(datos.data().role === 'cliente'){
                      Displayalert()
                      history(`./`);
                    }
                  }else{
                    console.log(user)
                  }
                } catch (error) {
                console.error('Error al consultar los documentos:', error);
                }
              }
          });
          
          return () => unsubscribe();
          };
          
          checkFirebaseAuth();
      }, [])

    
    function handleSignOut() {
      signOut(auth)
        .then(() => {
          history(`./`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    const Displayalert = () => {
      SweetAlert.fire({
        title: "Login",
        text: "No tiene permisos para operar",
        icon: "error",
      });
    }

    const Navmenuhideandshow = () => {
      if(navmenu){
        setNavmenu(!navmenu)
        document.querySelector('.nav-menus').classList.add('open')
      }
      else{
        setNavmenu(!navmenu)
        document.querySelector('.nav-menus').classList.remove('open')
      }
    }

    


    return (
        <div className="page-main-header">
        <div className="main-header-right">
          <div className="main-header-left text-center">
            <div className="logo-wrapper"><Link to="/ordenes"><img src={require("../../../assets/images/logo/logo-sist-bebidas.png")} alt="Sist de bebidas" width='50'/></Link></div>
          </div>
          <div className="main-header-left text-center">
            <Link to='/ordenes'><i className="fa fa-qrcode" style={{fontSize: 30}}></i></Link>
          </div>
          <div className="nav-right col pull-right right-menu">
            <ul className="nav-menus">
              <li></li>
              <li> <span className="media user-header">{ user ? user.email : ''}</span></li>
              <li onClick={handleSignOut}><LogOut/>Logout</li>
            </ul>
            
            <div className="d-lg-none mobile-toggle pull-right" onClick={Navmenuhideandshow}><MoreHorizontal/></div>
          </div>
          <script id="result-template" type="text/x-handlebars-template">
            <div className="ProfileCard u-cf">                        
            <div className="ProfileCard-avatar"><i className="pe-7s-home"></i></div>
            <div className="ProfileCard-details">
            <div className="ProfileCard-realName"></div>
            </div>
            </div>
          </script>
          <script id="empty-template" type="text/x-handlebars-template"><div className="EmptyMessage">Your search turned up 0 results. This most likely means the backend is down, yikes!</div></script>
        </div>
      </div>
    );
}

export default Header;