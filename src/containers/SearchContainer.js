import React, { Fragment, useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';

import SearchCard from '../components/SearchCard';
import data from '../datas/data2.json';

import {useLocation, useHistory} from "react-router";
import logo from '../logo.png';

import './SearchContainer.css';


const { Search } = Input;


const SearchContainer = () => {
    const history = useHistory();
    const location = useLocation();

    const Search_Query = location.state.Query;

    const [Items, setItems] = useState([]);
    const [PrintItems, setPrintItems] = useState([]);

    const [Query, setQuery] = useState('');

    const [ResultCnt, setResultCnt] = useState(0);

    const handleQuery = (e) => {
        setQuery(e.target.value);
    };

    const handleResultCnt = () => {
        setResultCnt(ResultCnt + 5);
    };

    useEffect(() => {
        console.log(Items.slice(undefined, ResultCnt > Items.length ? Items.length : ResultCnt));
        setPrintItems(Items.slice(undefined, ResultCnt > Items.length ? Items.length : ResultCnt));
    }, [Items]);

    useEffect(() => {
        setPrintItems(Items.slice(undefined, ResultCnt > Items.length ? Items.length : ResultCnt));
    }, [ResultCnt]);

    useEffect(() => {
        let items = [];

        for (var i = 0; i < data.length; i++) {
            if (String(data[i]['Material']).indexOf(Search_Query.toUpperCase()) != -1) items.push(data[i]);
            else if (String(data[i]['Description1']).indexOf(Search_Query.toUpperCase()) != -1) items.push(data[i]);
            else if (String(data[i]['Description2']).indexOf(Search_Query.toUpperCase()) != -1) items.push(data[i]);
            else if (String(data[i]['Description3']).indexOf(Search_Query.toUpperCase()) != -1) items.push(data[i]);
            else if (String(data[i]['Description4']).indexOf(Search_Query.toUpperCase()) != -1) items.push(data[i]);
            else if (String(data[i]['Description5']).indexOf(Search_Query.toUpperCase()) != -1) items.push(data[i]);
            else if (String(data[i]['Description6']).indexOf(Search_Query.toUpperCase()) != -1) items.push(data[i]);
            else if (String(data[i]['Old??Mat??Num']).indexOf(Search_Query.toUpperCase()) != -1) items.push(data[i]);
            else if (String(data[i]['Mfr??part??number']).indexOf(Search_Query.toUpperCase()) != -1) items.push(data[i]);
        }

        setResultCnt(5);
        setItems(items);  
    }, [Search_Query]);


    return (
        <Fragment>
            <div className="SearchApp">
                <div className="LeftSide">
                    <Link to='/'>
                        <img
                            src={ logo }
                            className="SubLogo"
                            alt='AdSearch'
                        />
                    </Link>
                </div>
                <div className="MiddleSide">
                    <div className="SubSearchBar">
                        <Search
                            size='large'
                            placeholder={Search_Query !== "" ? Search_Query : "AdSearch ??????"}
                            onSearch={() => {history.push({
                                pathname: "/search",
                                state: {Query: Query}
                            })}}
                            onChange={handleQuery}
                            style={{ width: 1200 }}
                        />
                    </div>
                    <div className="ResultBox">
                        <div>
                            <h1>?????? ?????? {Items.length}???</h1>
                        </div>
                        <div style={{ alignItems: 'center', justifyContent: 'center', width: 1200 }}>
                            {Items.length > 0 ? 
                            PrintItems.map((data) => {
                                return <SearchCard data={data} query={Search_Query} />
                            })
                            : <div className="NoDataView">
                                <h3><strong>{Search_Query}</strong>???(???) ????????? ??????????????? ????????????.</h3>
                                <ul>
                                    <li>?????? ????????? ????????? ???????????? ???????????????.</li>
                                    <li>?????? ???????????? ????????? ?????????.</li>
                                </ul>
                            </div>}
                        
                        </div>
                    </div>
                    <div>
                    {Items.length > ResultCnt ?
                    <Button block onClick={handleResultCnt} style={{marginBottom: 15}}>
                        ??? ????????????
                    </Button>
                    : ""}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default SearchContainer;