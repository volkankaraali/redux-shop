import { Chip, Chips, Container, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrency } from '../../redux/shops/shopsSlice';
import { BsCurrencyEuro } from "react-icons/bs";
import { BiLira } from "react-icons/bi";
import { useSelector } from 'react-redux';

function Currency() {
    const dispatch = useDispatch();
    const [inputCurrency, setInputCurrency] = useState("tl")

    const money = useSelector(state => state.shops.money)
    const currency = useSelector(state => state.shops.currency)

    useEffect(() => {
        dispatch(setCurrency(inputCurrency))
    }, [inputCurrency, dispatch])

    return (
        <div className='currency'>
            <Container>
                <div className='personWrapper flex justify-around'>
                    <div className={`trPerson p-4  ${inputCurrency !== "tl" && "opacity-20"}`}>
                        <BiLira className='text-lime-500 text-8xl' />
                        <Text weight={500} size="md" align='center'>
                            Turkish Lira
                        </Text>
                    </div>
                    <Chips className='personButton' color="lime" spacing="sm" value={inputCurrency} onChange={setInputCurrency} >
                        <Chip className='test' value="tl">TL</Chip>
                        <Chip value="eur">EUR</Chip>
                    </Chips>
                    <div className={`p-4 ${inputCurrency !== "eur" && "opacity-20"}`}>
                        <BsCurrencyEuro className='text-lime-500  text-8xl' />

                        <Text weight={500} size="md" align='center'>
                            Euro
                        </Text>
                    </div>
                </div>
                <div className='bg-lime-400 text-center'>
                    <Text weight={500} size="md" align='center'>
                        You have {money.toLocaleString()}{currency === "tl" ? "₺" : "€"}
                    </Text>
                </div>
            </Container>
        </div>
    )
}

export default Currency
