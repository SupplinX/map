import { useState } from "react"

export default function useFilterValues() {
    const [industriesIds, setIndustriesIds] = useState<number[]>([])
    const toggleIndustry = (id: number) => {
        const idsCopy = [...industriesIds]
        const checkIfInArray = idsCopy.indexOf(id)
        if (checkIfInArray !== -1) {
            idsCopy.splice(checkIfInArray, 1)
            setIndustriesIds(idsCopy)
        } else setIndustriesIds(industriesIds => [...industriesIds, id])
    }
    const [productsIds, setProductsIds] = useState<number[]>([])
    const toggleProduct = (id: number) => {
        const idsCopy = [...productsIds]
        const checkIfInArray = idsCopy.indexOf(id)
        if (checkIfInArray !== -1) {
            idsCopy.splice(checkIfInArray, 1)
            setProductsIds(idsCopy)
        } else setProductsIds(productsIds => [...productsIds, id])
    }
    const [needsIds, setNeedsIds] = useState<number[]>([])
    const toggleNeed = (id: number) => {
        const idsCopy = [...needsIds]
        const checkIfInArray = idsCopy.indexOf(id)
        if (checkIfInArray !== -1) {
            idsCopy.splice(checkIfInArray, 1)
            setNeedsIds(idsCopy)
        } else setNeedsIds(needsIds => [...needsIds, id])
    }

    return { toggleIndustry, industriesIds, productsIds, toggleProduct, needsIds, toggleNeed }
}