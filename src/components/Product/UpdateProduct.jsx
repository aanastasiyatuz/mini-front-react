import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { mainContext } from '../../contexts/MainContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProductUpdate = () => {
    const { productToEdit, saveProduct, editProduct } = useContext(mainContext)
    const { id } = useParams()
    const [inpTitle, setInpTitle] = useState('');
    const [inpDescription, setInpDescription] = useState('');
    const [inpPrice, setInpPrice] = useState('');
    const [selectedFile, setSelectedFile] = useState(productToEdit.image);
    const navigate = useNavigate();

    const notify = (errors) => {
        for (let [field, error] of Object.entries(errors)) {
            toast.error(`${field}: ${error}`, {
                icon: false, theme: "dark"
            });
        }
    }

    useEffect(() => {
        editProduct(id)
    }, [])

    useEffect(() => {
        setInpTitle(productToEdit.title);
        setInpPrice(productToEdit.price);
        setInpDescription(productToEdit.desc);
        setSelectedFile(productToEdit.image);
    }, [productToEdit])

    async function handleClick() {
        let form_data = {}
        form_data.id = id
        form_data.title = inpTitle
        form_data.desc = inpDescription
        form_data.price = inpPrice
        if (typeof selectedFile !== "string") {
            form_data.image = selectedFile
        }

        let updated = false
        try {
            await saveProduct(form_data)
            updated = true
        } catch (e) {
            if (e.response.status == 401) {
                navigate('/login')
            } else {
                notify(e.response.data)
            }
        }

        if (updated) {
            navigate(`/product/${id}`)
        }
    }

    return (
        <>
            {inpTitle ? (
                <div className="d-flex justify-content-center mt-4" style={{ 'width': '100%' }}>
                    <div className="d-flex justify-content-between align-items-start" style={{'width':'95%'}}>
                        <div className='d-flex align-items-center justify-content-center' style={{ 'width': '25%' }}>
                            <img src={productToEdit.image} style={{ 'width': '100%' }} alt="..." />
                        </div>
                        <div className="card" style={{ 'width': '60%' }}>
                            <div className='d-flex flex-column align-items-start p-4' style={{'height':'100%'}}>
                                <h2>Update product</h2>
                                <div className='mb-3'>
                                </div>
                                <div className="mb-3">
                                    <input value={inpTitle} onChange={(e) => setInpTitle(e.target.value)} type="text" className="form-control" placeholder="title" />
                                </div>
                                <div className="mb-3">
                                    <input value={inpDescription} onChange={(e) => setInpDescription(e.target.value)} type="text" className="form-control" placeholder="description" />
                                </div>
                                <div className="mb-3">
                                    <input value={inpPrice} onChange={(e) => setInpPrice(e.target.value)} type="text" className="form-control" placeholder="price" />
                                </div>
                                <div className="mb-3">
                                    <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="form-control" />
                                </div>
                                <button onClick={handleClick} className="btn btn-light" style={{ "width": "100%" }}>Update</button>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (null)}
        </>
    );
};

export default ProductUpdate;