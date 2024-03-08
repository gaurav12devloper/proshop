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
import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product'; // component
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarausel';
const HomeScreen = () => {

  //{orginal-name: rename-variable} like {data: products}
  const { pageNumber,keyword } = useParams(); // get the pageNumber from the url
  const { data, isLoading, error } = useGetProductsQuery({pageNumber, keyword}); // 

  return (
    <> 
    { !keyword && (
      <ProductCarousel />
    )}
    {
      keyword && (
        <Link to='/' className='btn btn-light mb-4'>Go Back</Link>
      )}
    { isLoading ? (<Loader />)
     : error ? (<message variant='danger'>{error?.data?. Message || error.error} </message>) : 
     (
      <>
      <h1>Latest Products</h1>
        <Row>
            { data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))} 
        </Row>
        <Paginate pages={data.pages} page={data.page} keyword={keyword? keyword: ''} />
        </>
     )}
    </>
  )
}

export default HomeScreen;