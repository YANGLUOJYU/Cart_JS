import React from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
    // 假設你的產品資料來源是productData
    const productData = [
        { id: '1', title: '產品1', price: 100, description: '這是產品1的描述' },
        { id: '2', title: '產品2', price: 200, description: '這是產品2的描述' },
        // 其他產品資料...
    ];

    return (
        <div>
            <h2>產品列表</h2>
            {productData.map(product => (
                <div key={product.id}>
                    <Link to={`/product/${product.id}`}>
                        <h3>{product.title}</h3>
                        <p>價格: {product.price}</p>
                        {/* 這裡可以顯示其他產品資訊 */}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
