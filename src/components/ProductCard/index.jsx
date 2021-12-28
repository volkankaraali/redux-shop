import { Text } from '@mantine/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { addProduct, selectBasket, sellProduct } from '../../redux/basket/basketSlice';

function ProductCard({ product }) {
    const dispatch = useDispatch();

    const [number, setNumber] = useState(1)

    const currency = useSelector(state => state.shops.currency)

    const handleChange = (e) => {
        setNumber(e.target.value)
    }
    const sellItem = () => {
        //console.log(input);
        dispatch(sellProduct({ product, number, currency }))
        setNumber(1)
    }
    const buyItem = () => {
        //console.log(input);
        dispatch(addProduct({ product, number, currency }))
        setNumber(1)

    }

    const basket = useSelector(selectBasket)
    const displayBill = useSelector(state => state.basket.displayBill)

    let productInBasket = basket.find(item => item.product.id === product.id && item.currency === currency ? item : false);
    //console.log(productInBasket);
    return (
        <div className={`card h-64 rounded shadow-md ${displayBill && "opacity-30"}`}>
            <div className='card-image h-32'>
                <img className='h-full w-full object-contain' src={product.img} alt="" />
            </div>
            <div className='card-body h-32 p-5'>
                <Text align='center' size="md">{product.name}</Text>
                <Text weight={500} align='center' size="md">{currency === "tl" ? `${product.price.tl}₺` : `${product.price.eur}€`}  </Text>
                <div className='flex justify-center'>
                    <button onClick={sellItem} disabled={(productInBasket === undefined || displayBill === true) && true} className="bg-red-200 w-14 px-2 rounded hover:bg-red-300 disabled:opacity-30 ">-</button>
                    <input type="number" min="1" value={number} onChange={handleChange} className='w-11 mx-3 px-2' />
                    <button onClick={buyItem} disabled={displayBill && true} className='bg-green-200 w-14 px-2 rounded hover:bg-green-300'>+</button>
                </div>
                <div className='my-1'>
                    {productInBasket && <Text weight={300} color={"lime"} align='center' size="xs"> <b>{productInBasket.number}</b> piece{productInBasket.number > 1 && 's'} in the market. </Text>}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
