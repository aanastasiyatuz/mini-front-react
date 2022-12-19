import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { mainContext } from '../../contexts/MainContext';

const ProductDetail = () => {
    const { exactproduct,
        getExactProductData,
        deleteProduct,
        getProductsData
    } = useContext(mainContext)
    const navigate = useNavigate();

    const { id } = useParams()

    useEffect(() => {
        getExactProductData(id)
    }, [])

    const handleDelete = async (id) => {
        deleteProduct(id)
        navigate('/shop')
    }

    if (exactproduct.title) {
        return (
            <div>
                <div className="d-flex justify-content-center mt-4">
                    <div className="d-flex flex-column">
                        <div key={exactproduct.id} className="card text-bg-secondary " style={{ 'width': '540px', 'marginBottom': '40px' }}>
                            <div className="row g-0 p-2">
                                <div className="col-md-4">
                                    <img src={exactproduct.images[0].image} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{exactproduct.title}</h5>
                                        <p className="card-text">{exactproduct.desc}</p>
                                        <p className="card-text"><small>${exactproduct.price}</small></p>
                                    </div>
                                </div>
                                {exactproduct.is_staff && (
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <button onClick={() => handleDelete(id)} className="btn btn-outline-danger" style={{ 'width': '49%' }}>Delete</button>
                                        <Link to={`/product-update/${id}`} style={{ 'width': '49%' }}><button onClick={() => getExactProductData(id)} className="btn btn-outline-success" style={{ 'width': '100%' }}>Edit</button></Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else { return (null) }

};

export default ProductDetail;