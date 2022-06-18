// npm install --save axios : 고객 추가 form 설치

import React from "react";
import { post } from 'axios';

// Material UI Madal design 구현
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'; // text 입력란 lib
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

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
            fileName: '', //보내고자 하는 파일의 이름(파일명
            open: false
        }
    }

    handleFormSubmit = (e) => { // 내부적으로 event 변수를 전달받음
        e.preventDefault() // 데이터가 서버로 전달될 때 오류 방지
        this.addCustomer()
            // 이후에 서버로부터 reposne가 왔을 때 콘솔창 출력
            .then((response) => {
                console.log(response.data);
                // 안된다 지금 ㅠㅠ
                this.props.stateRefresh(); // 고객을 추가한 이후에 서버로부터 응답을 받고나서 고객목록을 불러오기 위해 이곳에 위치함
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
        // window.location.reload(); // this.props.stateRefresh()이거 안되는거 일단 대체함
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

    // 고객 추가 버튼을 눌렀을 때, 고객 추가 modal 팝업창이 뜨도록 할 때 사용하는 함수
    handleClickOpen = () => { // = () => {} 바인딩 처리 : 동빈나유튜브: React 기초이론 학습하기
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기 
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/> 
                        <TextField label="성별" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
        /* 
        material-ui modal 적용하지 않고 그냥 했을 때 !
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
        */
    }
}

// 외부 라이브러리에서 사용 가능하게 export 해주기
// export default CustomerAdd; // 이게 default
export default withStyles(styles)(CustomerAdd); // 스타일을 적용였을 때