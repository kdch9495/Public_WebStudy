// npm install --save axios : 고객 추가 form 설치

import React from "react";
import { post } from 'axios';

class CustomerAdd extends React.Component {

    // 생성자 정의
    constructor(props) {
        super(props);
        // 변수값 초기화
        this.state = {
            file: null, //bytes형태의 data
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' //보내고자 하는 파일의 이름(파일명
        }
    }

    handleFormSubmit = (e) => { // 내부적으로 event 변수를 전달받음
        e.preventDefault() // 데이터가 서버로 전달될 때 오류 방지
        this.addCustomer()
            // 이후에 서버로부터 reposne가 왔을 때 콘솔창 출력
            .then((response) => {
                console.log(response.data);
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        window.location.reload();
    }

    handleFileChange = (e) => {
        // set.setState를 이용해 State에 있는 file 값을 변경
        this.setState({
            file: e.target.files[0],  //e.target: event가 발생한 inpurt값 자체
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value; // userName을 변경된 값으로 적용
        this.setState(nextState); // nextState를 이용해 현재 State값을 갱신 
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        // const formData = new URLSearchParams(); // FormData 안될때 이걸로 해보기
        formData.append('image', this.state.file); // this.state.file이라는 byte데이터를 image라는 이름으로 보냄
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        // 파일이 포함된 데이터를 서버로 전송하고자 할때는 웹 표준에 맞는 header값을 추가해주기
        const config = {
            headers: {
                'content-type': 'multipart/form-data' // 전달하고자 하는 파일에 FormData가 포함되고 있을 때 설정
            }
        }
        return post(url, formData, config);
    }

    render() {
        return(
            // 고객추가 버튼을 눌렀을때 handleFormSubmit 함수 실행
            // this.handleFormSubmit이 addCustomer 함수를 불러옴
            // 생년월일: 생년월일을 보여주는 design 창으로 수정할 것
            // name="file을 이용하여 해당 data를 가져옴
            <form onSubmit={this.handleFormSubmit}> 
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/> 
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

// 외부 라이브러리에서 사용 가능하게 export 해주기
export default CustomerAdd;