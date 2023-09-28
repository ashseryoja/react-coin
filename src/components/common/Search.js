import React from 'react';
import {withRouter} from 'react-router-dom';
import Loading from './Loading';
import {API_URL} from '../../config';
import {handleResponse} from '../../helpers';
import './Search.css';

class Search extends React.Component {
    state = {
      searchQuery: '',
      loading: false,
      searchResults: []
    }

    handleChange = async (event) => {
        const {value} = event.target;
        this.setState({
            searchQuery: value
        })
        if (!value) {
            return
        }
        this.setState({
            loading: true
        })
        const result = await fetch(`${API_URL}/autocomplete?searchQuery=${value}`);
        const searchResults = await handleResponse(result);
        this.setState({
            loading: false,
            searchResults
        })
    }

    handleRedirect = (currencyId) => {
        this.setState({
            searchQuery: '',
            searchResults: []
        })
        this.props.history.push(`/currency/${currencyId}`)
    }

    renderSearchResults() {
        const {searchResults, searchQuery, loading} = this.state;
        if (!searchQuery) {
            return;
        }
        return searchResults.length ? (
            <div className='Search-result-container'>
                {searchResults.map(result => (
                    <div 
                      className='Search-result' 
                      onClick={() => this.handleRedirect(result.id)}
                      key={result.id}
                    >
                      {result.name} ({result.symbol})
                    </div>
                ))}
            </div>
        ) : !loading ? (
            <div className='Search-result-container'>
                <div className='Search-no-result'>
                    No results found
                </div>
            </div>
        ) : null
    }

    render() {
        const {loading, searchQuery} = this.state;
        return (
            <div className='Search'>
                <span className='Search-icon'/>
                <input onChange={this.handleChange} 
                       type='text' 
                       value={searchQuery}
                       className='Search-input' 
                       placeholder='Currency name'/>
                {loading && 
                <div className='Search-loading'>
                    <Loading width='12px' height='12px'/>
                </div> 
                }
                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search);