import React, { useEffect , useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Inventary = () => {
    const [products , setProduct] = useState([]);


    const getallProducts = async ()=> {
        try {
            const response  = await axios.get('http://localhost:8080/api/v1/product/get-all-product')
           const {products} = response?.data
           setProduct(products)
        } catch (error) {
            console.log(error)
        
        }
    }

    useEffect(()=>{
        getallProducts();
    },[])
  return (
    <div className='container-fluid w-75'>
 
    <div className='row'>
            <h1 className='text-start'>All Product list</h1>
            <div className='d-flex flex-wrap'>

            {
                products?.map(p=>{
                    return(
                        <>
                        <div class="card m-3" style={{width: "18rem"}} key={p._id}> 
                            <div className=''>
                            <img src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p> 
                            </div>
                            </div>
                            </div>

                       
                        </>
                    )
                })
            }
            </div>
    </div>
</div>  )
}

export default Inventary