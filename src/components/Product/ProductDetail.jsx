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
            <div className="d-flex justify-content-center mt-4" style={{ 'width': '100%' }}>
                <div className="d-flex justify-content-between" style={{ 'width': '95%' }}>
                    <div className='d-flex align-items-center justify-content-center' style={{ 'width': '25%' }}>
                        <img src={exactproduct.image} style={{ 'width': '100%' }} alt="..." />
                    </div>
                    <div className="card p-3" style={{ 'width': '60%' }}>
                        <div className='d-flex flex-column justify-content-between' style={{ 'height': '100%' }}>
                            <div className="card-body">
                                <p className="card-title">Title:</p>
                                <h1 className="card-title">{exactproduct.title}</h1>
                                <p className="card-title">Description:</p>
                                <h3 className="card-text">{exactproduct.desc}</h3>
                                <p className="card-title">Price: </p>
                                <h3 className="card-text"><small>${exactproduct.price}</small></h3>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center" style={{'width':'100%'}}>
                            {exactproduct.is_staff && (
                                <div className="d-flex justify-content-between align-items-center mt-2" style={{'width':'95%'}}>
                                    <button onClick={() => handleDelete(id)} className="btn btn-outline-danger" style={{ 'width': '49%' }}>Delete</button>
                                    <Link to={`/product-update/${id}`} style={{ 'width': '49%' }}><button onClick={() => getExactProductData(id)} className="btn btn-outline-success" style={{ 'width': '100%' }}>Edit</button></Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* 
                <div className="d-flex justify-content-between" style={{ 'width': '95%' }}>
                    <div className='d-flex align-items-center justify-content-center' style={{ 'width': '25%' }}>
                        <img src={exactproduct.image} style={{ 'width': '100%' }} alt="..." />
                    </div>
                    <div className="card text-bg-secondary mb-4" style={{ 'width': '100%' }}>
                        <div className="row g-0 p-2">
                            <div className="col-md-8">
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    } else { return (null) }

};

export default ProductDetail;