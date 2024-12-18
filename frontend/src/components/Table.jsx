// import react
import { useEffect, useState } from "react";

// import api
import api from "../services/apiService";

// import css
import "../sass/styles.scss"
import "../css/table.css";
import icon from "../css/icon";

function Table({ setUserId }) {
    // * Show Table *
    // define state
    const [users, setUsers] = useState([]); // users
    const [page, setPage] = useState(1); // current page
    const [pageCount, setPageCount] = useState(0); // total page
    const [limit, setLimit] = useState(30); // limit per page
    const [pageIndex, setPageIndex] = useState(0); // index of page

    const resetPage = () => {
        setPage(1);
        setPageIndex(0);
    }

    // fetch users
    const fetch = async () => {
        await api.getAllusers()
            .then(res => {
                setUsers(res);
                setPageCount(Math.ceil(res.length / limit));
            });
    }

    // fetch
    useEffect(() => {
        fetch(); // call fetchUsers
    }, []);

    // loop page
    const pagesArray = [...Array(pageCount + 1).keys()].slice(1);

    // handle on page change
    const handleOnLimitChange = ((newLimit) => {
        resetPage();
        setLimit(newLimit);
        setPageCount(Math.ceil(users.length / newLimit));
    });

    // * Search in Table *
    const handleSearch = async (e) => {
        const value = e.target.value;
        if (!value) return fetch();
        await api.searchUser(value)
            .then(res => {
                setUsers(res);
                resetPage();
                setPageCount(Math.ceil(res.length / limit));
            })
    }

    return (
        <div>
            {/* search bar */}
            <div id="search-bar" className="my-2" >
                <input className="border-0 " type="text" placeholder="ค้นหาเจ้าของ" onChange={(e) => handleSearch(e)} />
                {icon.search}
            </div>

            {/* table */}
            <table>
                <thead>
                    <tr>
                        <td className="text-center">Operation</td>
                        <td className="ps-2">HN เจ้าของ</td>
                        <td className="ps-2">ชิ่อเจ้าของ</td>
                        <td className="ps-2">เบอร์ติดต่อ</td>
                        <td className="ps-2">อีเมล</td>
                    </tr>
                </thead>
                <tbody >
                    {
                        users.slice(limit * (page - 1), limit * page).map((user, index) => {
                            return (
                                <tr className="border border-1" key={index}>
                                    <td className="border border-1">
                                        <div className="d-flex justify-content-center edit"
                                            onClick={() => setUserId(user._id)}
                                        >
                                            {icon.edit}
                                        </div>
                                    </td>
                                    <td className="ps-2 border border-1">{user.hn}</td>
                                    <td className="ps-2 border border-1">
                                        <span className="text-primary" style={{ cursor: "pointer" }}
                                            onClick={() => setUserId(user._id)}
                                        >
                                            {user.firstname} {user.lastname}
                                        </span>
                                    </td>
                                    <td className="ps-2 border border-1">{user.phone}</td>
                                    <td className="ps-2 border border-1">{user.email}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr className="border border-1">
                        <td>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <div >
                                        Page {page} of {pageCount}
                                        <span className="ms-2"></span>
                                        ({users.length} items)
                                        <span className="ms-2"></span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className={page === 1 ? 'pe-none btn btn-light btn-sm p-1 ms-2 me-3 rounded-circle' : 'btn btn-dark btn-sm p-1 ms-2 me-3 rounded-circle'}
                                        onClick={() => {
                                            setPage(page - 1);
                                            page === 1 ? setPageIndex(0) : pageIndex !== 0 ? page <= pageCount - 6 && setPageIndex(pageIndex - 1) : null;
                                        }}>
                                        {icon.angle_left}
                                    </div>
                                    <div>
                                        {
                                            pagesArray.slice(pageIndex, pageIndex + 5).map((number) => {
                                                return (
                                                    <button
                                                        className={page === number ? 'page-btn rounded-3 pe-none mx-2' : 'page-btn btn-light mx-2'}
                                                        key={number} type="button"
                                                        onClick={() => {
                                                            setPage(number);
                                                        }} >
                                                        {number}
                                                    </button>
                                                )
                                            })
                                        }
                                        {
                                            pageCount > 5 && (
                                                pagesArray.slice(pageCount === 6 ? pageCount - 1 : pageCount - 2, pageCount).map((number) => {
                                                    return (
                                                        <button
                                                            className={page === number ? 'page-btn rounded-3 pe-none mx-2' : 'page-btn btn-light mx-2'}
                                                            key={number} type="button"
                                                            onClick={() => {
                                                                setPage(number);
                                                                pageCount === 6 ? null : (page === pageCount - 1 || pageCount - 2 ? setPageIndex(pageCount - 7) : null);
                                                            }} >
                                                            {number}
                                                        </button>
                                                    )
                                                })
                                            )
                                        }
                                    </div>
                                    <div className={page === pageCount || pageCount === 0 ? 'pe-none btn btn-light btn-sm p-1 ms-2 me-3 rounded-circle' : 'btn btn-dark btn-sm p-1 ms-2 me-3 rounded-circle'}
                                        onClick={() => {
                                            setPage(page + 1);
                                            pageIndex < pageCount - 7 ? (page >= 5 && page < pageCount - 2 && setPageIndex(pageIndex + 1)) : null;
                                        }}>
                                        {icon.angle_right}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div > Page size:</div>
                                    <select
                                        title="select-page-size"
                                        className="ms-2 select-page-size"
                                        value={limit}
                                        onChange={(e) => {
                                            handleOnLimitChange(e.target.value);
                                        }}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="30">30</option>
                                        <option value="60">60</option>
                                        <option value="120">120</option>
                                    </select>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>

    )
}

export default Table