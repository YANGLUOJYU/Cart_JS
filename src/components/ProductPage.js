import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/productcart/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Product Page</h3>
      <table className="table table-hover" cellPadding="2" cellSpacing="2" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Photo</th>
            <th>Introduction</th>
            <th>Price</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td><img src={`http://localhost:8080/${product.photo}`} width="150" alt="Product" /></td>
              <td>{product.introduction}</td>
              <td>{product.price}</td>
              <td align="center"><a href={`/cart/buy/${product.id}`} className="btn btn-primary">加入購物車</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductPage;
