import React from 'react';

import Gallery from '../gallery/Gallery.jsx';
import Footer from '../footer/Footer.jsx';

const Main = ({
    data,
    outfitsLoader,
    loading,
    singleResult,
    setSingleResult,
    activeItem,
    setActiveItem,
    reload,
    onLike,
    onDislike,
    onUnlike,
    onProductTypeSelected }
) => {

    return (
        <main>
            <Gallery
                data={data}
                outfitsLoader={outfitsLoader}
                loading={loading}
                singleResult={singleResult}
                setSingleResult={setSingleResult}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                reload={reload}
                onLike={onLike}
                onDislike={onDislike}
                onUnlike={onUnlike}
                onProductTypeSelected={onProductTypeSelected}
            />
            <Footer />
        </main>);
};

export default Main;