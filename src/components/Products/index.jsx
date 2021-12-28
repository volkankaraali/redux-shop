import { Container, SimpleGrid } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/shops/shopsSlice'
import ProductCard from '../ProductCard'


function Products() {


    const products = useSelector(selectProducts)


    return (
        <div className='products my-5'>
            <Container>
                <SimpleGrid cols={4}
                    breakpoints={[
                        { maxWidth: 1024, cols: 3, spacing: 'sm' },
                        { maxWidth: 768, cols: 2, spacing: 'sm' },
                        { maxWidth: 375, cols: 1, spacing: 'sm' },
                    ]}>

                    {
                        products.map(item => <ProductCard key={item.id} product={item} />)
                    }

                </SimpleGrid>
            </Container>
        </div>
    )
}

export default Products
