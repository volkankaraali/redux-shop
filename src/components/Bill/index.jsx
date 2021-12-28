import { Container, SimpleGrid, Table, Text } from '@mantine/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBasket, setDisplayBasket, setDisplayBill } from '../../redux/basket/basketSlice'
import { BiSad, BiSmile } from "react-icons/bi";

import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';

import download from 'downloadjs';


function Bill({ tlPrice, eurPrice, clearBasket }) {
    const dispatch = useDispatch()

    const basket = useSelector(selectBasket)
    const totalMoney = useSelector(state => state.shops.money)




    const tlRemain = totalMoney - tlPrice()
    const eurRemain = totalMoney - eurPrice()
    console.log(tlRemain);

    const remaingMoneyHappy = () => {
        return <div className='text-center'>

            <Text color={"lime"} weight={500} size="sm">
                You still have money. <BiSmile className='inline-block text-xl' />
            </Text>
        </div>
    }
    const remaingMoneySad = () => {
        return <div className='text-center'>

            <Text color={"red"} weight={500} size="sm">
                Sorry. You can't buy them. You must give back some of them.<BiSad className='inline-block text-xl' />
            </Text>

        </div>
    }


    const downloadBill = () => {
        const bill = document.getElementById("bill")
        htmlToImage.toPng(bill).then(function (dataUrl) {
            const img = new Image();
            img.src = dataUrl;
            //document.body.appendChild(img)
            download(dataUrl, "bill.png")
        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }

    const clear = () => {
        clearBasket();
        dispatch(setDisplayBasket(true))
        dispatch(setDisplayBill(false))
    }

    console.log();
    return (
        <div className='bill'>
            <Container id="bill">
                <Text weight={500} align='center' size="md">Your Bill</Text>

                <SimpleGrid cols={2} spacing="0" breakpoints={[
                    { maxWidth: 1024, cols: 3, spacing: 'sm' },
                    { maxWidth: 768, cols: 2, spacing: 'sm' },
                    { maxWidth: 375, cols: 1, spacing: 'sm' },
                ]} >
                    <div className='trBill p-3'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Pieces</th>
                                    <th>Price (₺)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {basket.map(item => {
                                    if (item.currency === "tl") {
                                        return (
                                            <tr key={item.product.id}>
                                                <td>{item.product.name}</td>
                                                <td>{item.number}</td>
                                                <td>{item.product.price.tl}</td>
                                            </tr>
                                        )
                                    } else return false
                                })}

                            </tbody>

                            {
                                tlRemain !== totalMoney &&
                                <tfoot>
                                    <tr>
                                        <th>Total </th>
                                        <th></th>
                                        <th>{tlPrice().toLocaleString()}</th>
                                    </tr>
                                    <tr>
                                        <th>Your Money </th>
                                        <th></th>
                                        <th>{totalMoney.toLocaleString()}</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th><span className={`${tlRemain > 0 ? "text-green-500" : "text-red-500"}`}>{tlRemain.toLocaleString()}₺</span></th>
                                    </tr>
                                </tfoot>
                            }

                        </Table>
                        {
                            tlRemain === totalMoney ? <Text weight={500} size="sm">
                                You didn't buy anything.
                            </Text> : (tlRemain > 0 ? remaingMoneyHappy() : remaingMoneySad())
                        }
                    </div>

                    <div className='eurBill p-3'>
                        <Table >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Pieces</th>
                                    <th>Price (€)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {basket.map(item => {
                                    if (item.currency === "eur") {
                                        return (
                                            <tr key={item.product.id}>
                                                <td>{item.product.name}</td>
                                                <td>{item.number}</td>
                                                <td>{item.product.price.eur}</td>
                                            </tr>
                                        )
                                    } else return false
                                })}
                            </tbody>
                            {
                                eurRemain !== totalMoney &&
                                <tfoot>
                                    <tr>
                                        <th>Total </th>
                                        <th></th>
                                        <th>{eurPrice().toLocaleString()}</th>
                                    </tr>
                                    <tr>
                                        <th>Your Money </th>
                                        <th></th>
                                        <th>{totalMoney.toLocaleString()}</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th><span className={`${eurRemain > 0 ? "text-green-500" : "text-red-500"}`}>{eurRemain.toLocaleString()}€</span></th>
                                    </tr>
                                </tfoot>
                            }

                        </Table>
                        {
                            eurRemain === totalMoney ? <Text weight={500} size="sm">
                                You didn't buy anything.
                            </Text> : (eurRemain > 0 ? remaingMoneyHappy() : remaingMoneySad())
                        }

                    </div>
                </SimpleGrid>
            </Container>

            <div className='flex justify-evenly'>
                <button className='py-1 px-3 bg-lime-400 rounded' onClick={downloadBill}>Download png</button>
                <button className='py-1 px-3 bg-red-500 rounded ' onClick={clear}>Clear</button>
            </div>
        </div >
    )
}

export default Bill
