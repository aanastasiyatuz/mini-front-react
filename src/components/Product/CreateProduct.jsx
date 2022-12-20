import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainContext } from '../../contexts/MainContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = () => {
    const [inpTitle, setInpTitle] = useState('');
    const [inpDescription, setInpDescription] = useState('');
    const [inpPrice, setInpPrice] = useState('');
    const [selectedFile, setSelectedFile] = useState({});
    let { addProduct, exactproduct } = useContext(mainContext)
    const navigate = useNavigate();

    const notify = (errors) => {
        for (let [field, error] of Object.entries(errors)) {
            toast.error(`${field}: ${error}`, {
                icon: false, theme: "dark"
            });
        }
    }

    async function handleClick() {
        const newObj = {}
        newObj['title'] = inpTitle
        newObj['desc'] = inpDescription
        newObj['image'] = selectedFile
        newObj['category'] = 1
        newObj['price'] = inpPrice

        let created = false
        let res
        try {
            res = await addProduct(newObj)
            created = true
        } catch (e) {
            if (e.response.status == 401) {
                navigate('/login')
            } else {
                notify(e.response.data)
            }
        }
        if (created) {
            navigate(`/product/${res.id}`)
        }
    }

    return (
        <div className='d-flex align-items-center justify-content-center mt-5' >
            <div className="card" style={{ "width": "50%" }}>
                <div className='card-body'>
                    <h2>Create product</h2>
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
                    <button onClick={handleClick} className="btn btn-light" style={{ "width": "100%" }}>Create</button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default AddProduct;