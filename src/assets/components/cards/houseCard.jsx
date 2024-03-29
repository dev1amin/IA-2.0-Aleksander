import './selectCard.css'
import { Stats } from '../stats/stats'
import { useState, useEffect } from 'react';

import Modal from '../modal/modal';
import { render } from 'react-dom';

export function HouseCard({ data, setShowModal, currentHouse, setCurrentHouse, vipAccess, currentSupplier, setCurrentSupplier }) {

    const [RealsBet, setRealsBet] = useState(null);

    useEffect(() => {
    }, [RealsBet])

    function formatBigNumber(number) {
        if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M';
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(0) + 'K';
        } else {
            return number.toString();
        }
    }

 

    const handleCardClick = () => {

        if (vipAccess) {
            if (data.suppliers.some(supplier => supplier.name === currentSupplier)) {

                setCurrentHouse(data.casino)

            }
            else {
                setCurrentSupplier(data.suppliers[0].name)
                setCurrentHouse(data.casino)

            }

        } else {
            if (data.casino != currentHouse) {
                setShowModal(true);
            }
        }

    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (currentHouse != data.casino) {
            setRealsBet(false)
        } else {
            setRealsBet(true)
        }
    }, [currentHouse, currentSupplier])

    return (
        <>
            <div
                className={RealsBet ? "houseCard selectCard card-enabled" : "houseCard selectCardBlocked card-enabled"}
                onClick={handleCardClick}
            >
                <div className={RealsBet ? "sc-content" : "sc-content-blocked"}>
                    <img
                        src={data.image}
                        className={RealsBet ? "image RealsBet-image" : "image-blocked"}
                    />
                    <div className={RealsBet ? "houseData" : "houseData lowopacity"}>
                        <Stats
                            title={'Pagamento'}
                            value={`R$ ${formatBigNumber(data.revenue * 0.2)}`}
                        />
    
                        <Stats
                            title={'Faturamento'}
                            value={`R$ ${formatBigNumber(data.revenue)}`}
                        />
    
                        <Stats
                            title={'Jogadores'}
                            value={formatBigNumber(data.players)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
