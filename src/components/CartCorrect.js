import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../add.css';
import {
    listCarts, deleteCart, createBuy,
    listBuys,
    deleteAllCart
} from './Service';
import { useNavigate } from "react-router-dom";



function CartCorrect() {
    const [checkbox, setCheckbox] = useState("");
    const [carts, setCarts] = useState([]);
    const [buys, setBuys] = useState([]);
    const uid = sessionStorage.getItem("userId");
    const navigate = useNavigate();
    useEffect(() => {
        getAllCarts();
    }, []);

    const getAllCarts = () => {

        listCarts(uid)
            .then((response) => {
                setCarts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAllBuys = () => {
        listBuys(uid)
            .then((response) => {
                setBuys(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const check = () => {
        for (var i = 0, t = 0; i < carts.length; i++) {
            if (carts[i].checkbox) t = t + carts[i].price * carts[i].quantity;
        }
    };

    const checkA = (e) => {
        setCheckbox(e.target.checked);
        for (var i = 0, t = 0; i < carts.length; i++) {
            carts[i].checkbox = e.target.checked;
            if (carts[i].checkbox) t = t + carts[i].price * carts[i].quantity;
        }
    };
    const calculateTotal = () => {
        // 使用reduce函数累加每个购物车项的总金额
        const totalAmount = carts.reduce((total, cart) => {
            // 将每个购物车项的总金额累加到total中
            return total + (cart.qty * cart.price);
        }, 0); // 初始总金额为0

        return totalAmount;
    };
    const pay = () => {
        const a = carts.filter((cart) => cart.checkbox);
        console.log(a);
        if (a.length === 0) {
            alert("請選擇要購買的購物車項目");
            return;
        }
        // getAllBuys();
        // if (carts.length !== null) {
        //     deleteAllCart()
        // }
        createBuy(a)
            .then((response) => {
                getAllBuys();
                // if (carts.length !== null) {
                //     deleteAllCart();
                    navigate("/pay");
                // }
            })
            .catch((error) => {
                console.log(error);
            });
        deleteAllCart(a)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteC = (cartId, name) => {
        if (!window.confirm(`確定要刪除 ${name} 這項商品嗎?`)) {
            getAllCarts();
        } else {
            deleteCart(cartId)
                .then((response) => {
                    getAllCarts();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const deleteAllC = () => {
        const a = carts.filter((cart) => cart.checkbox).map((cart) => cart.cartId);
        console.log(a);

        if (a.length === 0) {
            alert("請勾選想要刪除的商品");
        } else {
            if (!window.confirm("確定要刪除這些商品嗎?")) {
                getAllCarts();
            } else {
                deleteAllCart(a)
                    .then((response) => {
                        getAllCarts();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                setCheckbox(false);
                console.log(carts);
            }
        }
    };

    return (
        <div className="container">


            <table className="table table-striped" class="table">
                <thead>
                    <tr>
                        <th scope="col" style={{ width: "15%" }}>
                            <input
                                type="checkbox"
                                id="fname1"
                                name="fname1"
                                checked={checkbox}
                                onChange={(e) => checkA(e)}
                                style={{ display: "block", margin: "0 auto" }}
                            />
                        </th>
                        <th> 產品編號</th>
                        <th> 產品名稱</th>
                        <th> 產品圖片</th>
                        <th> 購買數量</th>
                        <th> 產品價格</th>
                        <th> 修改訂單</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        carts.map(
                            (cart) =>
                                <tr key={cart.cartId}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="fname"
                                            name="fname"
                                            checked={cart.checkbox}
                                            onChange={(e) => {
                                                cart.checkbox = e.target.checked;
                                                check();
                                            }}
                                            style={{ display: "block", margin: "0 auto" }}
                                        />
                                    </td>
                                    <td> {cart.id}</td>
                                    <td> {cart.name}</td>
                                    <td> <img src={cart.photo} width="150" height="130" alt='petbox'></img></td>
                                    <td>{cart.qty}</td>
                                    <td>{cart.price}</td>
                                    <td><button class="Btn2" onClick={() => deleteC(cart.cartId, cart.name)}>刪除</button></td>
                                </tr>
                        )
                    }
                    <tr>
                        <p>
                            <b>總經額:<td>{calculateTotal()}</td></b>
                            <label></label>
                            <td><button class="Btn" onClick={() => pay()}>勾選下單</button></td>
                            <td><button class="Btn2" onClick={() => deleteAllC()}>勾選移除</button></td>
                        </p>
                    </tr>

                </tbody>
            </table>
        </div >

    )
}
export default CartCorrect