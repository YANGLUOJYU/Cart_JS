import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const ProductCatalogue = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // 從後端獲取產品目錄資料
    // fetch('/api/products')
    //   .then(response => response.json())
    //   .then(data => setProducts(data));
       setProducts([{id:1,"image":"./pet.jpg",    "name":"爬蟲動物","stock":20},
                    {id:2,"image":"./feed.jpg","name":"飼料","stock":30},
                    {id:3,"image":"./terrarium.jpg", "name":"飼養箱","stock":40}])
  }, []);
  function link_href(id){
    if(id==1){
      navigate('/animal')
    }else{
      if(id==2){
        navigate('/feed')
      }else{
        navigate('/PetBox')
      }
    }
  }


  return (
    <Container>
      {/* <h1>產品目錄</h1> */}
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4}>
            <Card>
            <Card.Img variant="top" src={product.image} width={100} height={250}></Card.Img>
              <Card.Body>
                <Card.Title><a onClick={()=>link_href(product.id)}>
                  {product.name}</a></Card.Title>
                <Card.Text>庫存總數：{product.stock}</Card.Text>
                {/* 其他產品詳細資訊 */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductCatalogue;
