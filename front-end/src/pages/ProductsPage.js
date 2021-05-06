import React from 'react';
import Products from '../components/Products';
import MenuTop from '../components/MenuTop';

function ProductsPage() {
    return (
        <div className="form-page">
            <MenuTop title="Products" />
            <Products />
        </div>
    );
}

export default ProductsPage;
