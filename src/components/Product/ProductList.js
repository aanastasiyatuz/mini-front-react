import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mainContext } from '../../contexts/MainContext';

const ProductsList = () => {
    const { products, getProductsData, deleteProduct, getproductData } = useContext(mainContext)
    const navigate = useNavigate();

    useEffect(() => {
        getProductsData()
    }, [])

    const handleDelete = async (id) => {
        await deleteProduct(id)
        getProductsData()
    }

    return (
        <div>
            <div>
                <div className="d-flex justify-content-center mt-4">
                    <div className="d-flex flex-column">
                        {products.map(product => (
                            <div key={`product-${product.id}`} className="card text-bg-secondary mb-4" style={{ 'width': '540px' }}>
                                <div className="row g-0 p-2">
                                    <div className="col-md-4" onClick={() => navigate(`/product/${product.id}`)}>
                                        <img src={product.images[0].image} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8" onClick={() => navigate(`/product/${product.id}`)}>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text">{product.desc}</p>
                                            <p className="card-text"><small>${product.price}</small></p>
                                        </div>
                                    </div>
                                    {product.is_staff && (
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <button onClick={() => handleDelete(product.id)} className="btn btn-outline-danger mb-2" style={{ 'width': '49%' }}>Delete</button>
                                            <Link to={`/product-update/${product.id}`} style={{ 'width': '49%' }}><button onClick={() => getproductData(product.id)} className="btn btn-outline-success mb-2" style={{ 'width': '100%' }}>Edit</button></Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductsList;