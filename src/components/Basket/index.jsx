import { Container, SimpleGrid, Table, Text, Alert } from '@mantine/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectBasket, deleleteProductInBasket, clearBasket, setDisplayBasket, setDisplayBill } from '../../redux/basket/basketSlice';


import { MdDeleteForever } from "react-icons/md";
import { BsFillBasketFill } from "react-icons/bs";

import Bill from '../Bill';

function Basket() {
    const dispatch = useDispatch();


    const displayBasket = useSelector(state => state.basket.displayBasket)
    const displayBill = useSelector(state => state.basket.displayBill)

    const basket = useSelector(selectBasket)


    const deleteItem = (item) => {
        dispatch(deleleteProductInBasket(item))
    }

    const tlTotalPrice = () => {
        let totalPrice = 0
        basket.map(item => item.currency === "tl" ? totalPrice += item.number * item.product.price.tl : false)
        return totalPrice
    }

    const eurTotalPrice = () => {
        let totalPrice = 0
        basket.map(item => item.currency === "eur" ? totalPrice += item.number * item.product.price.eur : false)
        return totalPrice
    }

    const clearToBasket = () => {
        dispatch(clearBasket())
    }

    const calculateBill = () => {
        if (window.confirm("Billing?")) {
            dispatch(setDisplayBasket(false))
            dispatch(setDisplayBill(true))
        }

    }




    return (
        <div id='basket' className='basket bg-gray-100 py-5'>
            <Container>


                {
                    displayBasket && (

                        <>
                            <div className="flex justify-center ">
                                <Text weight={500} size="md" className='mr-2'>
                                    Basket
                                </Text>
                                <BsFillBasketFill className='my-auto' />
                            </div>
                            <SimpleGrid id="basketList" cols={2} spacing="0" breakpoints={[
                                { maxWidth: 1024, cols: 3, spacing: 'sm' },
                                { maxWidth: 768, cols: 2, spacing: 'sm' },
                                { maxWidth: 375, cols: 1, spacing: 'sm' },
                            ]}>

                                <div className='trBasket p-3'>
                                    <Text weight={500} align='center' size="md">Turkis Lira</Text>

                                    <Table highlightOnHover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Pieces</th>
                                                <th>Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {basket.map(item => {
                                                if (item.currency === "tl") {
                                                    return (
                                                        <tr key={item.product.id}>
                                                            <td>{item.product.name}</td>
                                                            <td>{item.number}</td>
                                                            <td>{item.product.price.tl}₺</td>
                                                            <td> <button onClick={() => deleteItem(item)} className=""><MdDeleteForever className='text-xl hover:text-red-500' /></button></td>
                                                        </tr>
                                                    )
                                                } else return false
                                            })}

                                        </tbody>
                                        {
                                            tlTotalPrice() > 0 && (
                                                <tfoot>
                                                    <tr>
                                                        <th>total</th>
                                                        <th></th>
                                                        <th>{tlTotalPrice().toLocaleString() + "₺"}</th>
                                                        <th></th>
                                                    </tr>
                                                </tfoot>
                                            )
                                        }
                                    </Table>
                                    {
                                        basket.findIndex(item => item.currency === "tl") === -1 ?
                                            (
                                                <Alert color="red" className='mt-2' >
                                                    <Text weight={500} size="xs" >Product has not been added yet.</Text>
                                                </Alert>
                                            ) : false
                                    }
                                </div>

                                <div className='eurBasket p-3'>
                                    <Text weight={500} align='center' size="md">Euro</Text>

                                    <Table highlightOnHover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Pieces</th>
                                                <th>Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {basket.map(item => {
                                                if (item.currency === "eur") {
                                                    return (
                                                        <tr key={item.product.id}>
                                                            <td>{item.product.name}</td>
                                                            <td>{item.number}</td>
                                                            <td>{item.product.price.eur}€</td>
                                                            <td> <button onClick={() => deleteItem(item)} className=""><MdDeleteForever className='text-xl hover:text-red-500' /></button></td>
                                                        </tr>
                                                    )
                                                } else return false
                                            })}
                                        </tbody>
                                        {
                                            eurTotalPrice() > 0 && (
                                                <tfoot>
                                                    <tr>
                                                        <th>total</th>
                                                        <th></th>
                                                        <th>{eurTotalPrice().toLocaleString() + "€"}</th>
                                                        <th></th>
                                                    </tr>
                                                </tfoot>
                                            )
                                        }

                                    </Table>
                                    {
                                        basket.findIndex(item => item.currency === "eur") === -1 ?
                                            (
                                                <Alert color="red" className='mt-2' >
                                                    <Text weight={500} size="xs" >Product has not been added yet.</Text>
                                                </Alert>
                                            ) : false
                                    }
                                </div>

                            </SimpleGrid>
                            <div className='flex justify-evenly'>

                                <button disabled={basket.length <= 0 && true} className="py-1 px-3 bg-lime-400 rounded disabled:opacity-30 " onClick={calculateBill}>Take Bill</button>
                                <button disabled={basket.length === 0 && true} className='py-1 px-3 bg-red-400 rounded hover:bg-red-500 disabled:opacity-30' onClick={clearToBasket}>Clear Basket</button>

                            </div>


                        </>

                    )
                }

                {

                    displayBill && <Bill tlPrice={tlTotalPrice} eurPrice={eurTotalPrice} clearBasket={clearToBasket} />
                }

            </Container >
        </div >
    )
}

export default Basket
