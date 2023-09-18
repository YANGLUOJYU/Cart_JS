import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Card } from "react-bootstrap";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    // const [inputErrorName, setInputErrorName] = useState("");
    const [inputErrorPassword, setInputErrorPassword] = useState("");
    const [inputErrorEmail, setInputErrorEmail] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    // const handleMailChange = (event) => {
    //     setMail(event.target.value);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputErrorPassword || inputErrorEmail) {
            alert("還有必要的欄位沒填!")
        }else{
            try {
                const response = await axios.post("http://localhost:8080/register", {
                    email,
                    username,
                    password
                });
                alert(response.data);
                console.log(response.data);
                if (response.data === "User registered successfully") {
                    navigate('/login');
                }

                // 在這裡處理登入成功後的操作，例如導向其他頁面
            } catch (error) {
                console.error(error.response.data);
            }
        }

    };

    // const handleKeyUpName = (e) => {
    //     const value = e.target.value;

    //     if (value.length < 2) {
    //         setInputErrorName("請輸入至少兩個字元");
    //     } else {
    //         setInputErrorName("");
    //     }
    // };

    const handleKeyUpPassword = (e) => {
        const value = e.target.value;
        const passwordPattern = /^[A-Za-z0-9._%+-]{8,12}$/
        if (passwordPattern.test(value)) {
            setInputErrorPassword("");
        } else {
            setInputErrorPassword("請輸入含有英文字母的密碼");
        }
    };

    const handleKeyUpEmail = (e) => {
        const value = e.target.value;
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        if (emailPattern.test(value)) {
            // console.log("fsaf"+value);
            setInputErrorEmail("");
        } else {
            setInputErrorEmail("請輸入Email");
        }
    };

    return (
        <div className="container mt-5">
            <Card style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                opacity: "0.6",
                fontSize: "30px",
            }}>
                <div className="row justify-content-center"
                    style={{
                        fontSize: "20px"
                    }}>
                    <div className="col-md-4">
                        <h1 style={{
                            fontSize: "30px",
                            position: "center",
                            bottom: "40px",

                        }}>註冊帳戶</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    帳戶:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    // onKeyUp={(e) => handleKeyUpName(e)}
                                    required
                                />
                                {/* <label style={{ color: "red" }}>{inputErrorName}</label> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    密碼:
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onKeyUp={(e) => handleKeyUpPassword(e)}
                                    required
                                /><label style={{ color: "red" }}>{inputErrorPassword}</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    電子信箱:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onKeyUp={(e) => handleKeyUpEmail(e)}
                                    required
                                /><label style={{ color: "red" }}>{inputErrorEmail}</label>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                註冊
                            </button>
                        </form>
                    </div>
                </div></Card>
        </div>
        // </body>
    );
}
export default Register