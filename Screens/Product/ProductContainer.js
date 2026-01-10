import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import { Surface, Text, TextInput, Searchbar } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import ProductList from './ProductList'
import SearchedProduct from "./SearchedProduct";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";


const data = require('../../assets/data/products.json')
const productCategories = require('../../assets/data/categories.json')
var { height, width } = Dimensions.get('window')
const ProductContainer = () => {

    const [products, setProducts] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState(false);
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState(-1);
    const [initialState, setInitialState] = useState([])
    const [productsCtg, setProductsCtg] = useState([])
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        setCategories(productCategories)
        setActive(-1)
        setInitialState(data);
        setProductsCtg(data)
        console.log('ProductContainer init:', { productsLength: data.length, categoriesLength: productCategories.length })

        return () => {
            setProducts([])
            setProductsFiltered([]);
            setFocus(false);
            setCategories([])
            setActive(-1)
            setInitialState([]);
            setProductsCtg([])
            setKeyword('')
        }
    }, [])

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }
    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    const changeCtg = (ctg) => {
        if (ctg === "all") {
            setProductsCtg(initialState)
            setActive(-1)
        } else {
            const filtered = products.filter((i) => i.category.$oid === ctg)
            console.log('changeCtg', ctg, '->', filtered.length)
            setProductsCtg(filtered)
            const idx = productCategories.findIndex(c => c._id.$oid === ctg)
            setActive(idx)
        }
    };

    return (
        <Surface width="100%" style={{ flex: 1, width: '100%' }}>

            <Searchbar
                placeholder="Search"
                onChangeText={(text) => { searchProduct(text); setKeyword(text); setFocus(true); }}
                value={keyword}

                onClearIconPress={onBlur}

            />
            {focus === true ? (
                <SearchedProduct
                    productsFiltered={productsFiltered}
                />
            ) : (

                <ScrollView>
                    <View>
                        <Banner />
                    </View>
                    <View >
                        <CategoryFilter
                            categories={categories}
                            categoryFilter={changeCtg}
                            productsCtg={productsCtg}
                            active={active}
                            setActive={setActive}
                        />
                    </View>
                    {productsCtg.length > 0 ? (
                        <View style={styles.listContainer}>
                            {productsCtg.map((item) => {
                                return (
                                    <ProductList

                                        key={item._id && item._id.$oid ? item._id.$oid : item.id}
                                        item={item}
                                    />
                                )
                            })}
                        </View>
                    ) : (
                        <View style={[styles.center, { height: height / 2 }]}>
                            <Text>No products found</Text>
                        </View>
                    )}
                </ScrollView>



            )}




        </Surface>
    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    listContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductContainer;