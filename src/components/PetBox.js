import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { createCart, updateCart,listCarts ,listPetBox } from './Service';

function PetBox() {
    const [petboxs, setPetBox] = useState([]);
    const [total , setTotal] =useState();
    const uid = sessionStorage.getItem("userId");
    const [userId, setUserId] = useState("");
    const [allCart, setAllCart] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchPetBox();
    }, []);
    const fetchPetBox = async () => {
        setUserId(uid);
        listPetBox().then((response) => {
            // console.log("~~~"+response);
            setPetBox(response);
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
      const cart = (id, name,photo, price,qty) => {
        getAllcart();
        if (confirm(`你確定要加入 [${name}] 到購物車裡嗎?`)) {//eslint-disable-line
            const cart = { userId, id, name,photo, price, qty };
            const cartItem = allCart.find((item) => item.id == id);
            if (userId) {
                if (cartItem) {
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
                        petboxs.map(
                            petbox =>
                                <tr key={petbox.petboxId}>
                                    <td> {petbox.petboxId}</td>
                                    <td> {petbox.name}</td>
                                    <td> <img src={petbox.photo} width="150" height="130" alt='petbox'></img></td>
                                    <td> {petbox.price}</td>
                                    <td> {petbox.count}</td>
                                    <td><input type="number" id="tentacles" onChange={handleTotal} name="tentacles" min="1" max={petbox.count}/></td>
                                    <td align="center"><button id="cart" onClick={()=>cart(petbox.petboxId,petbox.name,petbox.photo,petbox.price,total)}>加入購物車</button></td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    )
};

export default PetBox;