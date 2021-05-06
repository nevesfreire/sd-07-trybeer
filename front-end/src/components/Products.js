import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchProductList } from '../services/api';

function Products() {
    const zero = 0;
    const history = useHistory();
    const [productList, setProductList] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);

    useEffect(() => {
        async function didMount() {
            const user = JSON.parse(localStorage.getItem('user'));
            let list = []
            if (!user) history.push('/login');
            list = await fetchProductList();
            setProductList(list);
        }
        didMount();
    }, [history])

    const generateTotal = () => {

        const total = productList.reduce((acc, item) => {
            let sum = 0;
            if (item.quantity) {
                sum = parseFloat(item.quantity) * parseFloat(item.price)
                return acc + sum
            }
            return acc;
        }, 0)
        setValorTotal(total);
        return total;
    }

    const generateProducts = () => {
        return (<div>
            {productList.length === zero
                ? (<h3>Carregando...</h3>)
                : productList.map((item, index) => (
                    <div
                        key={index}
                    >
                        <img
                            data-testid={`${index}-product-img`}
                            src={item.url_image}
                            alt="bebida da lista"
                            width="50px"
                        />
                        <h3
                            data-testid={`${index}-product-name`}
                        >
                            {item.name}
                        </h3>
                        <button
                            type="button"
                            data-testid={`${index}-product-plus`}
                            onClick={() => {
                                const list = [...productList]
                                list[index].quantity = list[index].quantity ?
                                    list[index].quantity + 1 : 1;
                                setProductList(list)
                                localStorage.setItem('productList', productList);
                                generateTotal()
                            }}
                        >
                            &uArr;
              </button>
                        <button
                            type="button"
                            data-testid={`${index}-product-minus`}

                            onClick={() => {
                                const list = [...productList]
                                list[index].quantity = list[index].quantity && list[index].quantity > 0 ?
                                    list[index].quantity - 1 : 0;
                                setProductList(list)
                                localStorage.setItem('productList', productList);
                                generateTotal();
                            }}
                        >

                            &dArr;
              </button>
                        <h3
                            data-testid="0-product-qtd"
                        >
                            {productList[index].quantity || 0}
                        </h3>
                    </div>
                ))}
    )
            <button
                data-testid="checkout-bottom-btn"
                onClick={() => history.push('/checkout')}
                disabled={valorTotal === 0}

            >
                Ver Carrinho:
            <p
                    data-testid="checkout-bottom-btn-value"
                >
                    R${valorTotal}
                </p>
            </button>
        </div>)
    }

    return (
        generateProducts()
    );
}

export default Products;
