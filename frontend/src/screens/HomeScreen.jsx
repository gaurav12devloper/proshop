/* import {useEffect, useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product'; // component
//\\import products from '../products'; // data
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

export default HomeScreen */

import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product'; // component
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import Loader from '../components/Loader';
import Message from '../components/Message';
const HomeScreen = () => {

  //{orginal-name: rename-variable} like {data: products}
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <> 
    { isLoading ? (<Loader />)
     : error ? (<message variant='danger'>{error?.data?. Message || error.error} </message>) : 
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

export default HomeScreen;