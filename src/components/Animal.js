import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { createCart, listAnimal, updateCart,listCarts } from './Service';
import { clear } from '@testing-library/user-event/dist/clear';

export default function Animal() {
    const [animals, setAnimals] = useState([]);
    const [total, setTotal] = useState();
    const uid = sessionStorage.getItem("userId");
    const [userId, setUserId] = useState("");
    const [allCart, setAllCart] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchAnimal();
    }, []);
    const fetchAnimal = async () => {
        setUserId(uid);
        listAnimal().then((response) => {
            // console.log("~~~"+response);
            setAnimals(response);
        })
    };
    const getAllcart = () =>{
        listCarts(uid)
          .then((response) => {
            setAllCart(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

    const cart = (id, name,photo,price,qty) => {

        if (confirm(`你確定要加入 [${name}] 到購物車裡嗎?`)) {//eslint-disable-line
            const cart = { userId, id, name, photo, price, qty };
            const cartItem = allCart.find((item) => item.id===id);
            if (userId) {
                if (cartItem) {
                    getAllcart();
                    updateCart(cartItem.cartId, cartItem).then((response) => {
                        console.log(cart);
                    }).catch(error => {
                        console.log(error)
                    })
                }else{
                    createCart(id, cart).then((response)=>{
                        console.log(cart);
                    }).catch((error)=>{
                        console.log(error);
                    })
                alert("加入購物車成功");
                }
            }else{
                alert("請先登入在購買商品")
                navigate("/login")
            }
        }
};

    const handleTotal = (event) => {
        setTotal(event.target.value)
    }

    return (
        <div className="container">


            <table className="table table-striped" class="table">
                <thead>
                    <tr>
                        <th> 產品編號</th>
                        <th> 產品名稱</th>
                        <th> 產品圖片</th>
                        <th> 產品價格</th>
                        <th> 商品數量</th>
                        <th> 購買數量</th>
                        <th> 購買</th>
                    </tr>
                </thead>
                <tbody class="body">
                    {
                        animals.map(
                            animal =>
                                <tr key={animal.animalId}>
                                    <td> {animal.animalId}</td>
                                    <td> {animal.name}</td>
                                    <td> <img src={animal.photo} width="150" height="130" alt='animal'></img></td>
                                    <td> {animal.price}</td>
                                    <td> {animal.count}</td>
                                    <td><input type="number" id="tentacles" onChange={handleTotal} name="tentacles" min="1" max={animal.count} /></td>
                                    <td align="center"><button id="cart" onClick={() => cart(animal.animalId, animal.name,animal.photo,animal.price, total)}>加入購物車</button></td>
                                </tr>
                        )
                    }

                </tbody>
            </table>
        </div>

    )
};
