import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../add.css';
import {
    listBuys,
    deleteBuy,
    listCarts,
    deleteCart,
    createOrder,
    deleteAllBuy
} from "./Service";
import { useNavigate } from "react-router-dom";
export default function PayPage() {
    const [checkbox, setCheckbox] = useState("");
    const [carts, setCarts] = useState([]);
    const [buys, setBuys] = useState([]);
    const uid = sessionStorage.getItem("userId");
    const navigate = useNavigate()
    useEffect(() => {
        fetchPay();
    }, [])

    const fetchPay = () => {
        listBuys(uid).then((response) => {
            setBuys(response.data)
            console.log(buys);
        }).catch((error) => {
            console.log(error)
        })
    }
    const getAllCarts = () => {
        listCarts(uid)
            .then((response) => {
                setCarts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const check = () => {
        for (var i = 0, t = 0; i < buys.length; i++) {
            if (buys[i].checkbox) t = t + buys[i].price * buys[i].quantity;
        }
    };

    const checkA = (e) => {
        setCheckbox(e.target.checked);
        for (var i = 0, t = 0; i < buys.length; i++) {
            buys[i].checkbox = e.target.checked;
            if (buys[i].checkbox) t = t + buys[i].price * buys[i].quantity;
        }
    };

    const payD = (buyId) => {
        if (!window.confirm(`確定要移除這項商品嗎?`)) {
            fetchPay()
        } else {
            deleteBuy(buyId)
                .then((response) => {
                    console.log("移除成功")
                    fetchPay()
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const CheckOut = () => {
        const updatedCart = carts.filter(
            (cartItem) => !buys.some((buy) => buy.id === cartItem.id)
        );
        for (const cartItem of carts) {
            if (
                !updatedCart.some(
                    (updatedItem) => updatedItem.cartId === cartItem.cartId
                )
            ) {
                deleteCart(cartItem.cartId)
                    .then(() => {
                        getAllCarts();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
        //   console.log(buys);
        //   if (buys.length === 0) {
        //     alert("請到購物車選擇要購買的商品");
        //     navigate("/cart");
        //   } else {
        createOrder(buys)
            .then((response) => {
                navigate("/order");
            })
            .catch((error) => {
                console.log(error);
            });
        //   }
    }
    const deleteAllC = () => {
        const a = buys.filter((pay) => pay.checkbox).map((pay) => pay.buyId);
        console.log(a);

        if (a.length === 0) {
            alert("請勾選想要刪除的商品");
        } else {
            if (!window.confirm("確定要刪除這些商品嗎?")) {
                getAllCarts();
            } else {
                deleteAllBuy(a)
                    .then((response) => {
                        fetchPay()
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                setCheckbox(false);
                console.log(carts);
            }
        }
    };
    const calculateTotal = () => {
        const totalAmount = buys.reduce((total, pay) => {
            return total + (pay.qty * pay.price);
        }, 0); // 初始总金额为0

        return totalAmount;
    };
    return (
        <div>
            <br />
            <h1 style={{ textAlign: "center" }}><b>付款頁面</b></h1>
            <table className="table table-striped" class="table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                id="fname1"
                                name="fname1"
                                checked={checkbox}
                                onChange={(e) => checkA(e)}
                                style={{ display: "block", margin: "0 auto" }}
                            />
                        </th>
                        <th><b>商品編號</b></th>
                        <th><b>名稱</b></th>
                        <th><b>價格</b></th>
                        <th><b>數量</b></th>
                        <th><b>移除</b></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        buys.map(
                            (pay) =>
                                <tr key={pay.buyId}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="fname"
                                            name="fname"
                                            checked={pay.checkbox}
                                            onChange={(e) => {
                                                pay.checkbox = e.target.checked;
                                                check();
                                            }}
                                            style={{ display: "block", margin: "0 auto" }}
                                        />
                                    </td>
                                    <td>{pay.id}</td>
                                    <td>{pay.name}</td>
                                    <td>{pay.price}</td>
                                    <td>{pay.qty}</td>
                                    <td><button class="Btn" style={{ margin: "0 auto" }}
                                        onClick={() => payD(pay.buyId)}>移除</button></td>
                                </tr>
                        )
                    }
                    <tr>
                        <p>
                            <b>總經額:<td>{calculateTotal()}</td></b>
                            <label></label>
                            <td><button class="Btn" onClick={() => CheckOut()}>付款</button></td>
                            <td><button class="Btn2" onClick={() => deleteAllC()}>勾選移除</button></td>
                        </p>
                    </tr>
                </tbody>

            </table>
        </div>
    )
}