import { FC, useMemo, useState } from "react";
import { IProduct } from "../../types/company"
import { MoreButton } from "../more_button"
import { ProductCard } from "../product_card/product_card"

interface IProps {
    products: IProduct[] | undefined;
}

export const ProductList: FC<IProps> = ({ products }) => {
    const [showAllActive, toggleAllActive] = useState(false)
    const [showAllInactive, toggleAllInactive] = useState(false)
    const activeProducts = useMemo(() => {
        return products?.filter(products => products.active)
    }, [products])
    const inactiveProducts = useMemo(() => {
        return products?.filter(products => !products.active)
    }, [products])
    return (
        <div className="p-4">
            <p className="text-2xl font-medium mb-3 pl-1">Active</p>
            <div className="grid grid-cols-2 gap-2">
                {
                    activeProducts?.slice(0, showAllActive ? undefined : 2).map((product, index) => {
                        return <ProductCard key={'product' + index} product={product} />
                    })
                }
            </div>
            {(products && products.length > 2) && <MoreButton label={`${showAllActive ? 'Show less' : `Show all (${activeProducts?.length})`}`} onClick={toggleAllActive.bind(true, !showAllActive)} />}
            <p className="text-2xl font-medium mb-3 mt-10 pl-1">Inactive</p>
            <div className="grid grid-cols-2 gap-2">
                {
                    inactiveProducts?.slice(0, showAllInactive ? undefined : 4).map((product, index) => {
                        return <ProductCard key={'product' + index} product={product} />
                    })
                }
            </div>
            {(products && products.length > 4) && <MoreButton label={`${showAllInactive ? 'Show less' : `Show all (${inactiveProducts?.length})`}`} onClick={toggleAllInactive.bind(true, !showAllInactive)} />}
        </div>
    )
}