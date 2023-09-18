import React, { useEffect, useState } from 'react';

function UserDataList() {
    const [userdatas, setUserData] = useState([]);
    useEffect(() => {
        fetchUserData();
    },[]
    )

    const fetchUserData = async () => {
        // listUserData().then((response) => {
        //     setUserData(response);
        // }).catch(error => {
        //     console.log(error);
        // })
    }
    return (
        <div className="container">


        <table className="table table-striped" class="table">
            <tbody class="body">
                {
                    userdatas.map(
                        userdata =>
                            <tr key={userdata.id}>
                                <label> 用戶名稱:{userdata.user}</label>
                                <label> 年齡:{userdata.age}</label>
                                <label> 性別:{userdata.sex}{userdata.sex == 1 ? '男' : '女'}</label>
                                <label> 電子郵件:{userdata.email}</label>
                                <label> 電話:{userdata.phone}</label><br/>
                            </tr>
                    )
                }

            </tbody>
        </table>
    </div>
        
    )
}export default UserDataList