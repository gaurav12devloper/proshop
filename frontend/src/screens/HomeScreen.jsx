import {useEffect, useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product'; // component
//import products from '../products'; // data
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products'); // fetch data from the backend
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
        <h1>Latest Products</h1>
        <Row>
            { products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))} 
        </Row>
    </>
  )
}

export default HomeScreen

/* import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product'; // component
import { useGetProdcutsQuery } from '../slices/productsApiSlice.js';
const HomeScreen = () => {
  
  const { data: products, isLoading, error } = useGetProdcutsQuery();
  return (
    <> 
    { isLoading ? (<h2>Loading ...</h2>)
     : error ? (<div>error?.data?.message || error.error </div>) : 
     (
      <>
      <h1>Latest Products</h1>
        <Row>
            { products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))} 
        </Row>
        </>
     )}
    </>
  )
}

export default HomeScreen; */