import React from 'react';
import {API_URL} from '../../config';
import Loading from '../common/Loading';
import {handleResponse, renderChangePercent} from '../../helpers';
import './Detail.css';

class Detail extends React.Component {
    state = {
        currency: {},
        loading: false,
        error: null
    }

   componentDidMount() {
    const {id} = this.props.match.params;
    this.fetchCurrency(id);
   }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.fetchCurrency(nextProps.match.params.id)
        }
    }

    async fetchCurrency(currencyId) {
        try {
            this.setState({
                loading: true
            })
            const data = await fetch(`${API_URL}/cryptocurrencies/${currencyId}`);
            const currency = await handleResponse(data);
            this.setState({
                loading: false,
                error: null,
                currency
            })
        }   catch(err) {
                this.setState({
                loading: false,
                error: err.errorMessage
            })
        }
    }

    render() {
        const {loading, error, currency} = this.state;
        if (loading) {
            return (
                <div className='loading-container'>
                    <Loading/>
                </div>
            )
        }
        if (error) {
            return (
                <div className='error'>
                    {error}}
                </div>
            )
        }
        return (
            <div className='Detail'>
                <h1 className='Detail-heading'>
                    {currency.name} ({currency.symbol})
                </h1>
                <div className='Detail-container'>
                    <div className='Detail-item'>
                        Price <span className='Detail-value'>$ {currency.price}</span>
                    </div>
                    <div className='Detail-item'>
                        Rank <span className='Detail-value'>{currency.rank}</span>
                    </div>
                    <div className='Detail-item'>
                        24h Change 
                        <span className='Detail-value'>{renderChangePercent(currency.percentChange24h)}</span>
                    </div>
                    <div className='Detail-item'>
                        <span className='Detail-title'>Market Cap</span>
                        <span className='Detail-dollar'>$</span>
                        {currency.marketCap}
                    </div>
                    <div className='Detail-item'>
                        <span className='Detail-title'>24h Volume</span>
                        <span className='Detail-dollar'></span>
                        {currency.volume24h}
                    </div>
                    <div className='Detail-item'>
                        <span className='Detail-title'>Total Supply</span>
                        {currency.totalSupply }
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;