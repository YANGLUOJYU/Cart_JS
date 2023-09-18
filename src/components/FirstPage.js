import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, useNavigate, BrowserRouter, Link } from
    'react-router-dom';
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../add.css'

import Register from './Register';
import PetFeed from './Feedx';
import Animal from './Animal';
import PetBox from './PetBox';
import App1 from './Photo';
import Order from './Order'
import CartCorrect from './CartCorrect';
import Login from './Login2';
import UserDataList from './UserData';
import PayPage from './PayPage';

function FirstPage() {
    const uid = sessionStorage.getItem("userId");
    const uName = sessionStorage.getItem("userName");

    const onLogout = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userName");
        window.location.reload();
    };

    return (
        <div class="bg-img">
            <div className="container">
                <Router>
                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand className="fs-5">爬蟲網店</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/">首頁</Nav.Link>
                                    <Nav.Link href="/order">訂單查詢</Nav.Link>
                                    <NavDropdown title="種類選項" id="basic-nav-dropdown">
                                        {/* <NavDropdown.Item href="#action/3.1">種類選項</NavDropdown.Item> */}
                                        <NavDropdown.Item href="/animal">
                                            爬蟲動物
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/feed">寵物飼料</NavDropdown.Item>
                                        <NavDropdown.Item href="/PetBox">
                                            飼養箱
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <>
                                        {uid ? (
                                            <Nav.Link href="/userdata" className="nav-link">
                                                <>歡迎, {uName}！</><button className="btn btn-link" onClick={onLogout}>登出</button>
                                            </Nav.Link>
                                        ) : (
                                            <Nav.Link href="/login">帳戶登入</Nav.Link>
                                        )}
                                    </>

                                    <Nav.Link href="/cart"><h6><img src={"./cart.jpg"}
                                        style={{
                                            width: "25px",
                                            height: "25px"
                                        }}></img>購物車</h6></Nav.Link>
                                    <Nav.Link href="/pay">結帳</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>

                        </Container>
                    </Navbar>

                    <Routes>
                        <Route path='/' element={<App1 />} />
                        <Route path='/order' element={<Order />} />
                        <Route path='/animal' element={<Animal />} />
                        <Route path='/feed' element={<PetFeed />} />
                        <Route path='/PetBox' element={<PetBox />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/cart' element={<CartCorrect />} />
                        <Route path='/userdata' element={<UserDataList />} />
                        <Route path='/pay' element={<PayPage />} />
                    </Routes>

                </Router>

            </div>
            {/* <footer className='container'>
                <div>Footer</div>
            </footer> */}
        </div>
    )
}
export default FirstPage;