// import react
import { useEffect, useState } from "react";

// import api
import api from "../services/apiService";

// import css
import "../css/table.css";
import icon from "../css/icon";

function Table() {
    // define state
    const [users, setUsers] = useState([]); // users
    const [page, setPage] = useState(1); // current page
    const [pageCount, setPageCount] = useState(0); // total page
    const [limit, setLimit] = useState(30); // limit per page
    const [pageIndex, setPageIndex] = useState(0); // index of page

    // fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await api.getAllusers();
            setUsers(users);
            setPageCount(Math.ceil(users.length / limit));
        }

        fetchUsers(); // call fetchUsers
    }, [limit, page]);

    // loop page
    const pagesArray = [...Array(pageCount + 1).keys()].slice(1);

    // handle on page change
    const handleOnLimitChange = ((newLimit) => {
        setPage(1);
        setPageIndex(0);
        setLimit(newLimit);
    });

    useEffect(() => {
        console.log("PageIndex", pageIndex);
    }, [pageIndex]);

    return (
        <div>
            <div id="search-bar" className="my-4" >
                <input type="text" placeholder="ค้นหาเจ้าของ" />
                {icon.search}
            </div>

            <table>
                <thead>
                    <tr>
                        <td className="text-center">Operation</td>
                        <td className="pl-2">HN เจ้าของ</td>
                        <td className="pl-2">ชิ่อเจ้าของ</td>
                        <td className="pl-2">เบอร์ติดต่อ</td>
                        <td className="pl-2">อีเมล</td>
                    </tr>
                </thead>
                <tbody >
                    {
                        users.slice(limit * (page - 1), limit * page).map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td><div className="flex justify-center">{icon.edit}</div></td>
                                    <td className="pl-2">{user.hn}</td>
                                    <td className="pl-2">{user.firstname} {user.lastname}</td>
                                    <td className="pl-2">{user.phone}</td>
                                    <td className="pl-2">{user.email}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <div className="select-none" style={{ width: '240px' }}>
                                        Page {page} of {pageCount}
                                        <span className="ml-2"></span>
                                        ({users.length} items)
                                        <span className="mr-2"></span>
                                    </div>
                                    <div className={page === 1 ? 'pointer-events-none p-1 ml-2 mr-3' : 'rounded-full bg-slate-900 p-1 ml-2 mr-3 cursor-pointer hover:opacity-90 select-none'}
                                        onClick={() => {
                                            setPage(page - 1);
                                            page === 1 ? setPageIndex(0) : pageIndex !== 0 ? page <= pageCount - 6 && setPageIndex(pageIndex - 1) : null;
                                        }}>
                                        {icon.angle_left}
                                    </div>
                                    <div className="select-none" style={{ width: '240px' }}>
                                        {
                                            pagesArray.slice(pageIndex, pageIndex + 5).map((number) => {
                                                return (
                                                    <button
                                                        className={page === number ? 'bg-blue-700 mx-1 w-5 rounded text-white pointer-events-none' : 'mx-1 hover:text-red-500 hover:underline w-5'}
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
                                                            className={page === number ? 'bg-blue-700 mx-1 w-5 rounded text-white pointer-events-none' : 'mx-1 hover:text-red-500 hover:underline w-5'}
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
                                    <div className={page === pageCount ? 'pointer-events-none p-1 ml-2 mr-3' : 'rounded-full bg-slate-900 p-1 ml-2 mr-3 cursor-pointer hover:opacity-90 select-none'}
                                        onClick={() => {
                                            setPage(page + 1);
                                            pageIndex < pageCount - 7 ? (page >= 5 && page < pageCount - 2 && setPageIndex(pageIndex + 1)) : null;
                                        }}>
                                        {icon.angle_right}
                                    </div>
                                </div>
                                <div className="select-none">
                                    Page size:
                                    <select
                                        className="ml-2 outline-none border rounded"
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