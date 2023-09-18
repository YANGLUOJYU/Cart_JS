import React from 'react';

function OrderList() {
    // 假設這裡有一個orders陣列用來儲存訂單資料
    const orders = [
        { id: 1, customer: '客戶A', total: 1000 },
        { id: 2, customer: '客戶B', total: 2000 },
        { id: 3, customer: '客戶C', total: 1500 },
    ];

    return (
        <div className="container">
            <h2>訂單列表</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">訂單編號</th>
                        <th scope="col">客戶名稱</th>
                        <th scope="col">總金額</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
