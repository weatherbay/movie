import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import Genrebox from '../../views/LandingPage/Sections/CheckBox';
import { genre } from '../../views/LandingPage/Sections/Datas';
import SearchFeature from '../../views/LandingPage/Sections/SearchFeature';

const { Meta } = Card;


function LandingPage() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")

    const [Filters, setFilters] = useState({
        genre: []
    })

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
            filters: Filters,
            searchTerm: SearchTerms
        }

        getProducts(variables)

    })

    const getProducts = (variables) => {
        Axios.post('/api/movie/getProducts', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProducts([...Products, ...response.data.movies])
                    } else {
                        setProducts(response.data.movies)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;
        let limit = Limit

        const variables = {
            skip: skip,
            limit: limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }
        getProducts(variables)
        setSkip(skip)
        setLimit(limit)
    }


    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/movie/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`N${product.price}`}
                    
                />
            </Card>
        </Col>
    })


    const showFilteredResults = (filtersresult) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filtersresult

        }
        getProducts(variables)
        setSkip(0)
        

    }

 

    

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

    
        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProducts(variables)
    }


    return (
        <div style={{ width: '70%', margin: '3rem auto',backgroundImage:"url(../../../../public/bgimg/header-bg.jpg)" }}>
            <div style={{ textAlign: 'center' }}>
                <button className="bg-primary"><b>DEMO</b></button>
                <h2>  2021 MOVIES TO SEE...  <Icon type="fire" />  </h2>
            </div>


            {/* Filter  */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <Genrebox
                        list={genre}
                        handleFilters={filters => handleFilters(filters, "genre")}
                    />
                </Col>
                
                
                
            </Row>


            {/* Search  */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>


            {Products.length === undefined || Products.length === 0  ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }
            <br /><br />

            {Products.length === undefined || Products.length === 0?'':PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }


        </div>
    )
}


export default LandingPage
