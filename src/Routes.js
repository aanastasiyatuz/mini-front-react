import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ProductList from './components/Product/ProductList';
import CreateProduct from './components/Product/CreateProduct';
import UpdateProduct from './components/Product/UpdateProduct';
import ProductDetail from './components/Product/ProductDetail';
import Layout from './Header';

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout></Layout>}>
                    <Route path="/register" element={<Register></Register>} />
                    <Route path="/login" element={<Login></Login>} />
                    <Route path="/shop" element={<ProductList></ProductList>} />
                    <Route path="/new" element={<CreateProduct></CreateProduct>} />
                    <Route path="/product/:id" element={<ProductDetail></ProductDetail>} />
                    <Route path="/product-update/:id" element={<UpdateProduct></UpdateProduct>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;