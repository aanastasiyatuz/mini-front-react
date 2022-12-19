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

    useEffect(() => {
        editProduct(id)
    }, [])

    useEffect(() => {
        setInpTitle(productToEdit.title);
        setInpPrice(productToEdit.price);
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
                        <div style={{ "width": "100vw", "height": "100vh", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                        <div className="card" style={{ "width": "50vw" }}>
                            <div className='card-body'>
                                <h2>Update product</h2>
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
            ) : (null)}
        </>
    );
};

export default ProductUpdate;