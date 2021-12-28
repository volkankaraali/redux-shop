import { Affix, Transition } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks';
import React from 'react'
import { BsFillBasketFill, BsFillArrowUpCircleFill, BsArrowUpShort } from "react-icons/bs";

function ScrollButtons() {
    const [scroll, scrollTo] = useWindowScroll();
    const basket = document.getElementById("basket")
    return (
        <div>
            <Affix position={{ bottom: 20, right: 10 }} >
                <Transition transition="slide-up" mounted={scroll.y > 100}>
                    {(transitionStyles) => (
                        <button

                            className='p-2 bg-lime-500 rounded-full'
                            onClick={() => basket.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })}
                        >
                            <BsFillBasketFill />
                        </button>
                    )}
                </Transition>
            </Affix>
            <Affix position={{ bottom: 60, right: 10 }} >
                <Transition transition="slide-up" mounted={scroll.y > 100}>
                    {(transitionStyles) => (
                        <button

                            className='p-2 bg-lime-500 rounded-full'
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            <BsArrowUpShort />
                        </button>
                    )}
                </Transition>
            </Affix>
        </div>
    )
}

export default ScrollButtons
