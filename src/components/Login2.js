import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
            if (!response.ok) {
                throw new Error("Request failed");
            }
            //使用 response.text() 來讀取後端返回的文本數據，然後再使用 JSON.parse() 解析這個文本數據
            const text = await response.text();
            // 如果 text 為空，則處理登入失敗情況
            if (!text) {
                alert("帳號或是密碼有誤 請重新輸入");
            }
            const data = JSON.parse(text);
            if (data !== null) {
                // 將 userId,userName 存入 sessionStorage
                sessionStorage.setItem("userId", data.id);
                sessionStorage.setItem("userName", data.username);
                console.log(data);
            } else {
                alert("帳號或密碼有誤 請重新登入");
            }
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5" style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Card style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: "0.6",
                fontSize: "30px",
                minWidth: "500px",
                maxWidth: "1000px",
            }}>
                <div className="row justify-content-center"
                    style={{
                        fontSize: "20px"
                    }}>
                    <div className="col-md-8">
                        <h1 style={{
                            fontSize: "30px",
                            bottom: "40px",
                        }}>帳戶登入</h1>
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
                                    required
                                />
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
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                            <p style={{ fontSize: "18px", left: "5px" }}>沒有帳戶嗎 ?
                                <a href="/register" style={{ fontSize: "15px", left: "5px" }}>立即註冊</a>
                            </p>
                            <a href="/" style={{ fontSize: "15px", left: "5px" }}>忘記密碼</a>
                        </form>
                    </div>
                </div></Card>
        </div>
    );
};

export default Login;
