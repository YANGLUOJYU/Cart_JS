import React, { useState, useEffect } from 'react';
import { listOrders } from './Service';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Order.css';

function Order() {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState([]);
    const uid = sessionStorage.getItem("userId");
    const uName = sessionStorage.getItem("userName");

    useEffect(() => {
        fetchOrders();
    }, [])


    const fetchSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        fetchOrders();
    }

    const fetchOrders = async () => {
        listOrders(uid).then((response) => {
            const filterOrder = response.data.filter(t => t.name.includes(search))
            setOrders(filterOrder);

        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container">
            <form className="d-flex">
                <input className="form-control me-2"
                    type="text" placeholder="產品名稱 ( 如果想查全部訂單，請直接按查詢 )"
                    value={search}
                    aria-label="Search"
                    onChange={(e) =>
                        setSearch(e.target.value)} />
                <button onClick={(e) => {
                    if (search.trim() === "") {
                        alert("請輸入有效的產品關鍵字");
                    } else {
                        fetchSearch(e);
                    }
                }}>搜尋</button>
                {/* <button className="btn btn-outline-success" type="submit" onClick={fetchOrderId}>搜尋</button> */}
            </form>


            <table className="table table-striped" class="table">
                <thead>
                    <tr>
                        <th> 產品編號</th>
                        <th> 產品名稱</th>
                        <th> 購買客戶</th>
                        <th> 購買日期</th>
                        {/* <th> 產品價格</th> */}
                        <th> 購買數量</th>
                        <th> 金額</th>
                        {/* <th> 按鈕</th> */}
                    </tr>
                </thead>
                {orders.length > 0 ? (
                    <tbody class="body">
                        {orders.map((order) => (
                            <tr key={order.id.pid + order.id.orderId}>
                                <td> {order.id}</td>
                                <td> {order.name}</td>
                                <td> {uName}</td>
                                <td> {order.orderDate}</td>
                                <td> {order.quantity}</td>
                                <td> ${order.price*order.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody class="body">
                        <tr>
                            <td colSpan="6"><b>目前沒有該筆資料匯入</b></td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    )

}

export default Order